// Teksty zgód darmowych narzędzi. ZGODA_NEWSLETTER musi być identyczna z ZGODA_NEWSLETTER
// w panelu (repo panelu: lib/newsletter.ts), bo panel zapisuje ją jako dowód zgody (art. 7 ust. 1 RODO).
export const ZGODA_NEWSLETTER = {
  wersja: '2026-11-09',
  tekst: 'Chcę dostawać newsletter AI SEO COMPANY (porady SEO i widoczności w AI, nowe narzędzia). Zgoda jest dobrowolna, wynik narzędzia dostanę także bez niej. Mogę ją wycofać jednym kliknięciem w każdej wiadomości.',
};

// Odbiorcy danych per narzędzie (ta sama lista co w stopce maila z wynikiem, panel: lib/narzedzia/email.ts).
export const ODBIORCY = {
  audyt_seo: 'dostawcy poczty (Resend) i pomiaru szybkości (Google PageSpeed Insights)',
  autorytet: 'dostawcy poczty (Resend) i danych o linkach (Ahrefs)',
  widocznosc_ai: 'dostawcy poczty (Resend) i modeli AI (DataForSEO, Anthropic)',
  makieta: 'dostawcy poczty (Resend), modelu AI (Anthropic) i zrzutów ekranu (Microlink)',
  kalkulator: 'dostawca poczty (Resend)',
};

// Wersja EN (9.11.2026): identyczna z wersją EN zgody w panelu (lib/newsletter.ts). Ta sama wersja
// i data co PL, tekst po angielsku. Wybór po języku strony: patrz BramkaEmail.jsx.
export const ZGODA_NEWSLETTER_EN = {
  wersja: '2026-11-09',
  tekst: 'I want to receive the AI SEO COMPANY newsletter (SEO and AI visibility tips, new tools). Consent is voluntary, and I will get the tool result without it. I can withdraw it with one click in any email.',
};

export const ODBIORCY_EN = {
  audyt_seo: 'email provider (Resend) and page speed measurement provider (Google PageSpeed Insights)',
  autorytet: 'email provider (Resend) and backlink data provider (Ahrefs)',
  widocznosc_ai: 'email provider (Resend) and AI model providers (DataForSEO, Anthropic)',
  makieta: 'email provider (Resend), AI model provider (Anthropic) and screenshot provider (Microlink)',
  kalkulator: 'email provider (Resend)',
};
