import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure to add RESEND_API_KEY in .env.local or Vercel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

// --- Antyspam -------------------------------------------------------------
// Każde zgłoszenie, które przejdzie tę trasę, staje się w Google Ads konwersją
// główną o wartości 1 000 zł (tag w Contact.jsx). Bez filtra pierwszy bot
// byłby pierwszą „konwersją” w koncie z zerem prawdziwych — i uczyłby
// licytację. Trzy tanie bramki, bez zewnętrznych usług:
// 1) honeypot `website` (pole poza ekranem) — boty wypełniają wszystko;
// 2) czas od wyrenderowania formularza < 3 s — człowiek tyle nie zdąży;
// 3) higiena e-maila + domeny tymczasowe + limit 3 zgłoszenia / 10 min / IP.
// Honeypot i tempo zwracają 200 { success, rejected } — bot widzi „sukces”,
// a klient NIE odpala konwersji (Contact.jsx sprawdza `rejected`).
// Cloudflare Turnstile świadomie pominięty: wymaga kluczy w Vercel.
const MIN_ELAPSED_MS = 3000;
const DISPOSABLE = ['mailinator.com', 'tempmail.com', 'temp-mail.org', 'guerrillamail.com', '10minutemail.com', 'yopmail.com', 'sharklasers.com', 'trashmail.com', 'getnada.com', 'dispostable.com'];
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i;
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 3;
// Pamięć instancji serverless — wystarcza na Vercel, bo zimny start i tak
// zeruje licznik rzadziej niż okno 10 min; nie jest to twarda ochrona.
const rate = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const hits = (rate.get(ip) || []).filter((t) => now - t < RATE_WINDOW_MS);
  hits.push(now);
  rate.set(ip, hits);
  if (rate.size > 5000) rate.clear();
  return hits.length > RATE_MAX;
}

// Pola atrybucji przepuszczane do maila i arkusza — tylko znaki bezpieczne,
// żeby gclid z reklamy nie mógł wstrzyknąć HTML-a do powiadomienia.
const ATTR_FIELDS = ['lead_id', 'submitted_at', 'page_path', 'landing_path', 'first_seen', 'gclid', 'gbraid', 'wbraid', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const safe = (v, max = 200) => String(v ?? '').replace(/[<>"'`]/g, '').slice(0, max);
const esc = (v) => String(v ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, service, message } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól formularza.' },
        { status: 400 }
      );
    }

    // Ciche odrzucenia (bot dostaje 200, konwersja nie odpala).
    if (typeof body.website === 'string' && body.website.trim() !== '') {
      return NextResponse.json({ success: true, rejected: true, reason: 'honeypot' }, { headers: { 'X-Lead-Status': 'rejected' } });
    }
    if (Number.isFinite(body.elapsed_ms) && body.elapsed_ms >= 0 && body.elapsed_ms < MIN_ELAPSED_MS) {
      return NextResponse.json({ success: true, rejected: true, reason: 'too_fast' }, { headers: { 'X-Lead-Status': 'rejected' } });
    }

    const emailNorm = String(email).trim().toLowerCase();
    if (!EMAIL_RE.test(emailNorm) || DISPOSABLE.includes(emailNorm.split('@')[1])) {
      return NextResponse.json({ error: 'Podaj poprawny, stały adres e-mail.' }, { status: 400 });
    }
    const ip = (request.headers.get('x-forwarded-for') || '').split(',')[0].trim() || 'unknown';
    if (rateLimited(ip)) {
      return NextResponse.json({ error: 'Zbyt wiele zgłoszeń. Spróbuj ponownie za kilka minut.' }, { status: 429 });
    }

    const attr = Object.fromEntries(ATTR_FIELDS.map((k) => [k, safe(body[k])]));
    const leadId = attr.lead_id || `srv-${Date.now().toString(36)}`;

    // Default to kontakt@ai-seo-company.pl for sending notifications.
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'kontakt@ai-seo-company.pl';

    // Notifications go to every address in this list. RESEND_TO_EMAIL overrides
    // the primary inbox, RESEND_TO_EMAIL_CC the additional ones; both accept a
    // comma-separated list. Kept as two variables rather than one so that setting
    // RESEND_TO_EMAIL in the hosting environment cannot silently drop the second
    // recipient. Deduplicated, so the same address listed twice still gets one copy.
    const primaryTo = process.env.RESEND_TO_EMAIL || 'f.sliwa@ai-signals-company.pl';
    const additionalTo = process.env.RESEND_TO_EMAIL_CC || 'filipsliwa.business.contact@gmail.com';

    const toEmails = [...new Set(
      [primaryTo, additionalTo]
        .flatMap(entry => entry.split(','))
        .map(address => address.trim())
        .filter(Boolean)
    )];

    // Blok maszynowy pod import konwersji offline do Google Ads (arkusz
    // „Leady PL-Search”: Google Click ID + czas + wartość). Klucz=wartość w
    // jednej linii, żeby dało się go skopiować bez ręcznego przepisywania.
    const leadData = `LEAD_DATA: lead_id=${leadId}; email=${emailNorm}; submitted_at=${attr.submitted_at}; gclid=${attr.gclid}; gbraid=${attr.gbraid}; wbraid=${attr.wbraid}; landing_path=${attr.landing_path}; first_seen=${attr.first_seen}; page_path=${attr.page_path}; utm_source=${attr.utm_source}; utm_medium=${attr.utm_medium}; utm_campaign=${attr.utm_campaign}; utm_term=${attr.utm_term}; utm_content=${attr.utm_content}`;
    const source = attr.gclid || attr.gbraid || attr.wbraid ? 'Google Ads (klik z reklamy)' : (attr.utm_source ? `utm: ${attr.utm_source}/${attr.utm_medium}` : 'organiczne / bezpośrednie');

    const { data, error } = await resend.emails.send({
      from: `AI SEO COMPANY <${fromEmail}>`,
      to: toEmails,
      replyTo: emailNorm,
      subject: `[Formularz Wyceny] Nowe zapytanie od: ${safe(name, 80)} · ${leadId.slice(0, 8)}`,
      html: `
        <h2>Nowe zapytanie ze strony AI SEO COMPANY</h2>
        <p><strong>Imię i Nazwisko:</strong> ${esc(name)}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${esc(emailNorm)}">${esc(emailNorm)}</a></p>
        <p><strong>Pakiet:</strong> ${esc(service || 'Brak (Indywidualny)')}</p>
        <p><strong>Źródło:</strong> ${esc(source)}${attr.landing_path ? ` · wejście: ${esc(attr.landing_path)}` : ''}</p>
        <br />
        <p><strong>Wiadomość:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f5; padding: 16px; border-radius: 8px;">${esc(message || '—')}</p>
        <br />
        <p style="font-family: monospace; font-size: 12px; color: #6E6E73; word-break: break-all;">${esc(leadData)}</p>
      `,
    });

    if (error) {
      console.error('Błąd z API Resend:', error);
      return NextResponse.json(
        { error: `Nie udało się wysłać wiadomości (${error.message || 'błąd API'}). Skontaktuj się bezpośrednio: kontakt@ai-seo-company.pl` },
        { status: 500 }
      );
    }

    // Opcjonalny wiersz w arkuszu leadów (Apps Script / Make webhook, env
    // LEADS_WEBHOOK_URL). Best effort: błąd arkusza nie może zepsuć zgłoszenia.
    if (process.env.LEADS_WEBHOOK_URL) {
      try {
        await fetch(process.env.LEADS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...attr, lead_id: leadId, name: safe(name, 120), email: emailNorm, service: safe(service, 40), status: 'new' }),
        });
      } catch (e) {
        console.error('Webhook arkusza leadów:', e);
      }
    }

    return NextResponse.json({ success: true, lead_id: leadId, id: data && data.id });
  } catch (error) {
    console.error('Błąd podczas przetwarzania zapytania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
