import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure to add RESEND_API_KEY in .env.local or Vercel Environment Variables
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól formularza.' },
        { status: 400 }
      );
    }

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

    const { data, error } = await resend.emails.send({
      from: `AI SEO COMPANY <${fromEmail}>`,
      to: toEmails,
      replyTo: email,
      subject: `[Formularz Wyceny] Nowe zapytanie od: ${name}`,
      html: `
        <h2>Nowe zapytanie ze strony AI SEO COMPANY</h2>
        <p><strong>Imię i Nazwisko:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Pakiet:</strong> ${service || 'Brak (Indywidualny)'}</p>
        <br />
        <p><strong>Wiadomość:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f5; padding: 16px; border-radius: 8px;">${message || "—"}</p>
      `,
    });

    if (error) {
      console.error('Błąd z API Resend:', error);
      return NextResponse.json(
        { error: `Nie udało się wysłać wiadomości (${error.message || 'błąd API'}). Skontaktuj się bezpośrednio: kontakt@ai-seo-company.pl` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Błąd podczas przetwarzania zapytania:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd serwera. Spróbuj ponownie później.' },
      { status: 500 }
    );
  }
}
