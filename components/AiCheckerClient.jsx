'use client';

import { useState, useRef, useEffect } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { track } from '@/lib/track';
import { PANEL_DEMO_URL } from '@/lib/panel';
import AppleFaq from '@/components/service/AppleFaq';
import WebAppSchema from '@/components/WebAppSchema';
import Contact from '@/components/Contact';
import Byline from '@/components/Byline';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { polaAtrybucji } from '@/lib/attribution';

// Sprawdzarka „Czy ChatGPT poleca Twoją firmę?” (zadanie 2.3). Pytania zadaje panel
// (panel.ai-seo-company.pl/api/ai-check: DataForSEO, limit 3 na IP na dobę, raport e-mailem).
const API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/ai-check`;
const LABELS = { chat_gpt: 'ChatGPT', gemini: 'Gemini' };

// 5.11.2026 (PLAN-v2 6.17 A3b, MSA-03 po korekcie): tryb zapasowy. Panel zwraca 503, gdy
// sprawdzarka jest wyłączona (brak kluczy albo budżetu DataForSEO; curl 4–5.11.2026), i wtedy
// wpisane dane przepadały. Teraz przy 5xx albo braku odpowiedzi (wyjątek fetch, np. CORS przy
// awarii panelu) te same dane idą jako lead przez /api/contact (mail + arkusz zgłoszeń),
// a Filip zadaje pytania ręcznie w 24 h robocze. Przy 400, 403 i 429 (walidacja, zły Origin,
// limit 3 firmy na IP na dobę) zostaje komunikat panelu: bez wysyłki i bez zdarzenia, żeby
// limit nie zamieniał się w ręczne sprawdzenia. Wyłączenie trybu: kryterium stopu PLAN-v2 9.5.
const KOMUNIKAT_ZAPASOWY = 'Sprawdzarka jest chwilowo niedostępna. Pytania zadamy ręcznie i wynik wyślemy na podany e-mail w ciągu 24 godzin roboczych.';

// LW1 (PLAN-v2 6.0, 6.2, 6.10): linki do nowych stron tylko przez bramkę publikacji. Zdanie
// opisuje stronę, której przed publikacją nie ma, więc bez celu znika całe (nie zostaje tekst).
const HREF_P2 = hrefJesliOpublikowana('/porownania/seo-vs-geo');
const HREF_N1 = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');

// 4.11.2026 (etap 0 planu z filmu, A3): strona miała 292 słowa i 1 link wewnętrzny.
// Treść opisuje dokładnie to, co robi panel (lib/ai-checker.ts: 3 pytania × ChatGPT
// z wyszukiwaniem + Gemini, wykrycie nazwy albo domeny, limit 3 firmy na IP na dobę).
// Frazy: „widoczność w ai” 90/mies., „ai visibility” 110 (Google Ads przez DataForSEO, 4.11.2026).
const KROKI = [
  ['Trzy pytania jak od klienta', 'Z branży i miasta układamy trzy pytania, np. „Jaką firmę z branży stolarz polecasz w mieście Warszawa? Podaj kilka nazw.”'],
  ['Dwa modele, sześć odpowiedzi', 'Każde pytanie zadajemy ChatGPT z wyszukiwaniem w sieci ustawionym na Twoje miasto oraz Gemini. Razem to sześć odpowiedzi.'],
  ['Szukamy Twojej firmy', 'W każdej odpowiedzi sprawdzamy, czy pada nazwa firmy albo adres strony, i zapisujemy źródła, na które powołuje się model.'],
];
const WYNIK = [
  ['0 z 6', 'Modele nie łączą Twojej firmy z branżą i miastem. Częste przyczyny: słaba wizytówka Google, mało opinii, brak firmy w katalogach i zestawieniach, strona bez jasnego opisu usług i lokalizacji.'],
  ['1–3 z 6', 'Firma pojawia się, ale nie w każdym pytaniu ani w każdym modelu. Zobacz źródła w odpowiedziach: to strony, na których warto mieć wzmiankę.'],
  ['4–6 z 6', 'Modele wymieniają Twoją firmę. Sprawdzaj to regularnie, bo odpowiedzi zmieniają się z dnia na dzień.'],
];
const FAQ = [
  { question: 'Czy sprawdzarka widoczności w AI jest darmowa?', answer: 'Tak. Zapytania do modeli opłacamy my, a Ty podajesz e-mail, na który wysyłamy pełny wynik. Z jednego adresu IP można sprawdzić 3 firmy na dobę.' },
  { question: 'Dlaczego wynik różni się od tego, co widzę w ChatGPT?', answer: 'Pytamy przez API modeli, z wyszukiwaniem ustawionym na Twoje miasto. Aplikacja ChatGPT uwzględnia też historię rozmów, ustawienia i lokalizację użytkownika, a odpowiedzi zmieniają się z dnia na dzień. Traktuj wynik jako próbkę, nie jako stały ranking.' },
  { question: 'Które modele sprawdzacie?', answer: 'W darmowym sprawdzeniu: ChatGPT z wyszukiwaniem w sieci i Gemini. W audycie widoczności w AI i w panelu klienta dochodzą Perplexity i przegląd AI w wynikach Google, a pytań jest 30.' },
  // A3b: tryb zapasowy wysyła zgłoszenie przez /api/contact, które zapisuje je też w arkuszu (LEADS_WEBHOOK_URL).
  { question: 'Co dzieje się z moimi danymi?', answer: 'Używamy ich tylko do przygotowania i wysłania wyniku oraz do odpowiedzi na Twoje pytania. Usuwamy je po 60 dniach. Odbiorcy to dostawcy poczty i pomiarów: Resend i DataForSEO. Gdy sprawdzarka jest chwilowo niedostępna, zgłoszenie trafia też do naszego arkusza zgłoszeń w Google, z którego wykonujemy sprawdzenie ręcznie.' },
  { question: 'Jak zwiększyć widoczność w AI?', answer: 'Zacznij od wizytówki Google i opinii, potem zadbaj o wzmianki w źródłach, które modele cytują w Twojej branży, i o jasne odpowiedzi na pytania klientów na stronie. Sprawdź też, czy robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot.' },
];

const field = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };
const label = { display: 'block', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' };
const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };

export default function AiCheckerClient() {
  const [state, setState] = useState({ status: 'idle', error: null, result: null });
  // A3b: czas montażu dla elapsed_ms w trybie zapasowym (/api/contact odrzuca < 3 s jako bota).
  // useRef + efekt zamiast useRef(Date.now()): reguła react-hooks/purity nie pozwala wołać
  // Date.now() w renderze; efekt montażu daje ten sam moment (formularz działa dopiero po hydratacji).
  const wejscie = useRef(0);
  useEffect(() => { wejscie.current = Date.now(); }, []);

  // A3b: lead przez /api/contact zamiast błędu. Adres www tylko w message: klucz `website`
  // to w /api/contact pole-pułapka (zgłoszenie z nim zostałoby po cichu odrzucone), więc pod
  // `website` idzie nasza pułapka `nick` - bot, który ją wypełni, zostanie odrzucony tak samo.
  async function trybZapasowy(body) {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...polaAtrybucji(),
          name: body.company,
          email: body.email,
          service: 'ai_check',
          message: `Sprawdzarka AI (tryb zapasowy). Branża: ${body.industry}; miasto: ${body.city}; www: ${body.website || '–'}`,
          website: body.nick,
          elapsed_ms: Date.now() - wejscie.current,
          submitted_at: new Date().toISOString(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.success) {
        // Odrzucone po cichu (pułapka, tempo): bot widzi potwierdzenie, ale bez zdarzenia.
        if (!data.rejected) track('generate_lead', { event_category: 'AI Check', plan: 'ai_check_fallback', currency: 'PLN', value: 100 });
        setState({ status: 'queued', error: null, result: null });
        return;
      }
      setState({ status: 'error', error: data.error || 'Sprawdzarka jest chwilowo niedostępna. Napisz do nas: kontakt@ai-seo-company.pl.', result: null });
    } catch {
      setState({ status: 'error', error: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.', result: null });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      company: String(fd.get('company') || ''),
      industry: String(fd.get('industry') || ''),
      city: String(fd.get('city') || ''),
      website: String(fd.get('website') || ''),
      email: String(fd.get('email') || ''),
      consent: fd.get('consent') === 'on',
      nick: String(fd.get('nick') || ''),
    };
    setState({ status: 'loading', error: null, result: null });
    track('ai_check_start', { city: body.city });
    let res;
    try {
      res = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    } catch {
      // A3b: panel nie odpowiedział (sieć, CORS przy awarii) - tryb zapasowy.
      await trybZapasowy(body);
      return;
    }
    if (res.status >= 500) {
      await trybZapasowy(body);
      return;
    }
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) {
      setState({ status: 'error', error: data.error || 'Nie udało się sprawdzić. Spróbuj za chwilę.', result: null });
      return;
    }
    // Lead z adresem e-mail: liczy się w GA4 jako zapytanie (bez konwersji Google Ads).
    track('generate_lead', { event_category: 'AI Check', plan: 'ai_check', currency: 'PLN', value: 100 });
    setState({ status: 'done', error: null, result: data });
  }

  const r = state.result;
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Sprawdź widoczność w AI" en="AI Visibility Check" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Bezpłatne sprawdzenie
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' }}>
              Czy ChatGPT poleca Twoją firmę?
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto' }}>
              Zadamy ChatGPT (z wyszukiwaniem z Twojego miasta) i Gemini trzy pytania, które zadają klienci szukający firmy z Twojej branży. W około 30 sekund zobaczysz, czy w odpowiedziach pada Twoja firma. Pełny wynik wyślemy też e-mailem.
            </p>
            {/* LW1 (PLAN-v2 6.0): autor i data = LASTMOD strony (lib/lastmod.js). */}
            <Byline sciezka="/sprawdz-widocznosc-w-ai" style={{ margin: '1rem 0 0' }} />
          </Reveal>

          {/* A3b: potwierdzenie trybu zapasowego. Region live stale w DOM (pusty nie zajmuje
              miejsca), bo region wstawiony razem z treścią bywa nieogłoszony (jak w Contact.jsx). */}
          <div role="status" aria-live="polite">
            {state.status === 'queued' && (
              <div style={{ ...card, textAlign: 'center' }}>
                <p style={{ margin: 0, fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 600, color: 'var(--color-text-dark)' }}>{KOMUNIKAT_ZAPASOWY}</p>
              </div>
            )}
          </div>

          {state.status !== 'done' && state.status !== 'queued' && (
            <Reveal>
              <form onSubmit={onSubmit} style={{ ...card, display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
                <div>
                  <label htmlFor="ac-company" style={label}>Nazwa firmy</label>
                  <input id="ac-company" name="company" required minLength={2} maxLength={100} placeholder="np. Stolarnia Kowalski" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-industry" style={label}>Branża albo usługa</label>
                  <input id="ac-industry" name="industry" required minLength={2} maxLength={60} placeholder="np. stolarz, dentysta, księgowa" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-city" style={label}>Miasto</label>
                  <input id="ac-city" name="city" required minLength={2} maxLength={60} placeholder="np. Warszawa" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-website" style={label}>Strona www (opcjonalnie)</label>
                  <input id="ac-website" name="website" maxLength={200} placeholder="np. firma.pl" style={field} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="ac-email" style={label}>E-mail (wyślemy pełny wynik)</label>
                  <input id="ac-email" name="email" type="email" required maxLength={200} placeholder="ty@firma.pl" style={field} />
                </div>
                {/* Pole-pułapka dla botów: ukryte dla ludzi i czytników ekranu. */}
                <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <label style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
                  <input type="checkbox" name="consent" required style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
                  <span>
                    Zgadzam się na przetwarzanie podanych danych przez AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa), żeby przygotować i wysłać wynik oraz odpowiedzieć na moje pytania. Dane usuwamy po 60 dniach. Odbiorcy: dostawcy poczty i pomiarów (Resend, DataForSEO). Szczegóły w <Link href="/cookies" style={{ textDecoration: 'underline' }}>polityce prywatności</Link>.
                  </span>
                </label>
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                  <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta="ai_check_submit">
                    {state.status === 'loading' ? 'Pytamy ChatGPT i Gemini… (do 40 s)' : 'Sprawdź za darmo'}
                  </button>
                  {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
                </div>
              </form>
            </Reveal>
          )}

          {state.status === 'done' && r && (
            <div style={{ display: 'grid', gap: '1.5rem' }} aria-live="polite">
              <div style={{ ...card, textAlign: 'center' }}>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Twoja firma pojawia się w</p>
                <p style={{ margin: '0.25rem 0', fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: 800, color: r.mentioned > 0 ? '#047857' : '#b3261e' }}>
                  {r.mentioned} z {r.total}
                </p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>odpowiedzi ChatGPT i Gemini. Pełny wynik wysłaliśmy e-mailem.</p>
              </div>
              <ul style={{ ...card, listStyle: 'none', margin: 0, display: 'grid', gap: '1rem' }}>
                {r.rows.map((row, i) => (
                  <li key={i} style={{ borderTop: i ? '1px solid rgba(15,23,42,0.08)' : 'none', paddingTop: i ? '1rem' : 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-dark)' }}>{LABELS[row.engine] || row.engine}: {row.prompt}</p>
                    <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: row.mentioned ? '#047857' : '#b3261e' }}>{row.mentioned ? 'Firma wymieniona' : 'Firma niewymieniona'}</p>
                    <p style={{ margin: '0.25rem 0 0', lineHeight: 1.55, color: 'var(--color-text-main)' }}>{row.excerpt || row.answer}</p>
                    {row.sources?.length > 0 && <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Źródła: {row.sources.join(', ')}</p>}
                  </li>
                ))}
              </ul>
              <div style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>
                  Chcesz wiedzieć, jak to zmienić? W audycie sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google, pokazujemy, kogo modele polecają zamiast Ciebie i z jakich stron korzystają.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href="/pozycjonowanie-w-ai" className="btn btn-primary" data-cta="ai_check_offer">Audyt AI: 990 zł netto</Link>
                  <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="ai_check_demo">Zobacz demo panelu</a>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Odpowiedzi pochodzą z API modeli i mogą różnić się od tego, co ktoś zobaczy w aplikacji. Zmieniają się z dnia na dzień.
              </p>
            </div>
          )}

          <section aria-labelledby="ac-jak" style={{ marginTop: '4rem' }}>
            <h2 id="ac-jak" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>Jak działa sprawdzarka widoczności w AI</h2>
            <ol style={{ ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              {KROKI.map(([h, p]) => (
                <li key={h}><strong style={{ color: 'var(--color-text-dark)' }}>{h}.</strong> {p}</li>
              ))}
            </ol>
          </section>

          <section aria-labelledby="ac-wynik" style={{ marginTop: '3rem' }}>
            <h2 id="ac-wynik" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>Jak czytać wynik</h2>
            <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
              {WYNIK.map(([h, p]) => (
                <div key={h} style={{ ...card, padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.6rem', fontWeight: 800, margin: '0 0 0.5rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)' }}>{p}</p>
                </div>
              ))}
            </div>
          </section>

          <section aria-labelledby="ac-co-dalej" style={{ marginTop: '3rem' }}>
            <h2 id="ac-co-dalej" style={{ fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.25rem' }}>Co zrobić, gdy ChatGPT nie poleca Twojej firmy</h2>
            <ul style={{ ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '0.85rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
              {/* LW1, link 26 (on-page-seo RAPORT rozdz. 4): dopisek o SEO lokalnym. */}
              <li>Uzupełnij wizytówkę Google i zbieraj opinie po każdej usłudze, bo to podstawa <Link href="/seo-lokalne-warszawa" style={{ textDecoration: 'underline' }}>SEO lokalnego</Link>. Proces krok po kroku opisujemy w poradniku <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ textDecoration: 'underline' }}>jak pozyskiwać opinie Google</Link>.</li>
              <li>Zadbaj o wzmianki w katalogach i zestawieniach, które modele cytują w Twojej branży. Ich adresy są w wyniku, w polu „Źródła”.</li>
              <li>
                Opisz na stronie usługi, miasto i obszar działania prostymi zdaniami, które da się zacytować bez kontekstu.
                {HREF_P2 && <> Takie opisy pomagają i w Google, i w odpowiedziach modeli: co działa w obu, pokazujemy w porównaniu <Link href={HREF_P2} style={{ textDecoration: 'underline' }}>SEO a GEO</Link>.</>}
              </li>
              <li>
                Sprawdź, czy plik robots.txt nie blokuje botów OAI-SearchBot i PerplexityBot. Blokada wyklucza stronę z cytowań tych narzędzi.
                {HREF_N1 && <> Dostęp botów AI do strony sprawdza też nasz bezpłatny <Link href={HREF_N1} style={{ textDecoration: 'underline' }}>generator llms.txt</Link>.</>}
              </li>
              <li>Mierz zmiany regularnie. W <Link href="/pozycjonowanie-w-ai" style={{ textDecoration: 'underline' }}>pozycjonowaniu w AI</Link> sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google co tydzień, a wynik widać w <Link href="/panel-klienta" style={{ textDecoration: 'underline' }}>panelu klienta</Link>.</li>
            </ul>
          </section>
        </div>
      </section>
      <AppleFaq faqData={FAQ} title="Pytania o widoczność w AI" />
      {/* A3b (BL-02): formularz kontaktowy, jak GeoPageClient.jsx. Wcześniej „Wyceń projekt”
          (#kontakt) w nagłówku i stopce nie miał tu celu i wyprowadzał na stronę główną. */}
      <Contact />
      <WebAppSchema
        name="Sprawdzarka widoczności w AI"
        description="Bezpłatne narzędzie: zadaje ChatGPT i Gemini trzy pytania klientów z Twojej branży i miasta i pokazuje, czy wymieniają Twoją firmę."
        url="https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai"
      />
      <Footer />
    </main>
  );
}
