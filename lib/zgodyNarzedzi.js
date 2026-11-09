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
