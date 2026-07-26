import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Make sure to add RESEND_API_KEY in .env.local
const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key_for_build');

export async function POST(request) {
  try {
    const { name, email, service, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Brak wymaganych pól formularza.' },
        { status: 400 }
      );
    }

    // fallback to onboarding@resend.dev if RESEND_FROM_EMAIL is not set. 
    // Usually you need a verified domain in Resend to send from it.
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';
    
    // The recipient is the business owner
    const toEmail = process.env.RESEND_TO_EMAIL || 'f.sliwa@ai-signals-company.pl';

    const { data, error } = await resend.emails.send({
      from: `AI SEO COMPANY <${fromEmail}>`,
      to: [toEmail],
      replyTo: email,
      subject: `[Formularz Wyceny] Nowe zapytanie od: ${name}`,
      html: `
        <h2>Nowe zapytanie ze strony AI SEO COMPANY</h2>
        <p><strong>Imię i Nazwisko:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Pakiet:</strong> ${service || 'Brak (Indywidualny)'}</p>
        <br />
        <p><strong>Wiadomość:</strong></p>
        <p style="white-space: pre-wrap; background: #f4f4f5; padding: 16px; border-radius: 8px;">${message}</p>
      `,
    });

    if (error) {
      console.error('Błąd z API Resend:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
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
