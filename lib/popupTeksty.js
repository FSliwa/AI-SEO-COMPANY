// Teksty ofert popupu z lead magnetem (12.11.2026): PL i EN. Mapa stron i wyzwalaczy: lib/popupOferty.js.
// Ten plik importuje wyłącznie components/NewsletterPopup.jsx (ładowany dynamicznie), więc teksty nie
// obciążają kodu wczytywanego na każdej stronie.
//
// Liczby stron PDF policzone z public/pliki 12.11.2026 (PL i EN mają tyle samo stron); liczby punktów
// i części z kart szablonów (lib/szablony/<slug>.js, pole karta.opis). Po zmianie PDF albo karty
// szablonu poprawić tutaj. Adresy CTA narzędzi = ścieżki PL i EN z lib/stronyEn.js.

// Szablony PDF w popupie: id = `plik` w panelu.
export const SZABLONY_POPUPU = {
  'checklista-seo': {
    pl: { nazwa: 'Checklista SEO', naglowek: 'Checklista SEO: 50 punktów w PDF (6 stron)', korzysc: 'Technika, on-page, SEO lokalne, gotowość na AI i pomiar: każdy punkt z priorytetem i sposobem sprawdzenia.' },
    en: { nazwa: 'SEO checklist', naglowek: 'SEO checklist: 50 checks in a 6-page PDF', korzysc: 'Technical basics, on-page, local SEO, AI readiness and measurement, each with a priority and a way to verify it.' },
  },
  'analiza-konkurencji': {
    pl: { nazwa: 'Szablon analizy konkurencji SEO', naglowek: 'Szablon analizy konkurencji SEO: 5 konkurentów, PDF na 6 stronach', korzysc: 'Porównasz konkurentów w Google, Mapach i odpowiedziach AI, razem z linkami i ofertą, w prostej skali 0–2.' },
    en: { nazwa: 'SEO competitor analysis template', naglowek: 'SEO competitor analysis template: 5 competitors in a 6-page PDF', korzysc: 'Compare competitors in Google, Maps and AI answers, plus backlinks and pricing, on a simple 0–2 scale.' },
  },
  'content-plan': {
    pl: { nazwa: 'Content plan: szablon', naglowek: 'Content plan: kalendarz publikacji na 3 miesiące (PDF, 5 stron)', korzysc: 'Backlog tematów z oceną i karta pomiaru w Search Console: wiesz, co pisać dalej i co już działa.' },
    en: { nazwa: 'Content calendar template', naglowek: 'Content calendar template: 3 months of publishing (5-page PDF)', korzysc: 'A scored topic backlog and a Search Console results sheet: you know what to write next and what already works.' },
  },
  'brief-copywritera': {
    pl: { nazwa: 'Brief dla copywritera', naglowek: 'Brief dla copywritera: 10 części, PDF na 5 stronach', korzysc: 'Fraza i intencja, analiza TOP 5, konspekt i checklista odbioru: tekst SEO bez kolejnych rund poprawek.' },
    en: { nazwa: 'Content brief template', naglowek: 'Content brief template: 10 parts in a 5-page PDF', korzysc: 'Keyword and intent, top-5 analysis, outline and a review checklist: SEO copy without round after round of edits.' },
  },
  'brief-strony': {
    pl: { nazwa: 'Brief strony internetowej', naglowek: 'Brief strony internetowej: 12 części, PDF na 6 stronach', korzysc: 'Cele, mapa strony, treści, funkcje i SEO w jednym dokumencie, więc wyceny od wykonawców da się porównać.' },
    en: { nazwa: 'Website brief template', naglowek: 'Website brief template: 12 sections in a 6-page PDF', korzysc: 'Goals, sitemap, content, features and SEO in one document, so the quotes you get are comparable.' },
  },
  'wizytowka-google': {
    pl: { nazwa: 'Checklista wizytówki Google', naglowek: 'Checklista wizytówki Google: 40 punktów, PDF na 6 stronach', korzysc: 'Od weryfikacji po opinie i spójność NAP, z kartą danych firmy i dziennikiem miesięcznym.' },
    en: { nazwa: 'Local SEO checklist', naglowek: 'Local SEO checklist: 40 checks in a 6-page PDF', korzysc: 'From verification to reviews and NAP consistency, with a business details sheet and a monthly log.' },
  },
  'zapytanie-ofertowe-seo': {
    pl: { nazwa: 'Zapytanie ofertowe na SEO', naglowek: 'Zapytanie ofertowe na SEO: 12 pytań do agencji, PDF na 6 stronach', korzysc: 'Wyślesz kilku agencjom ten sam wzór i porównasz ich oferty w jednej tabeli ocen.' },
    en: { nazwa: 'SEO RFP template', naglowek: 'SEO RFP template: 12 questions for agencies in a 6-page PDF', korzysc: 'Send several agencies the same brief and compare their proposals in one scoring sheet.' },
  },
  'strategia-seo': {
    pl: { nazwa: 'Szablon strategii SEO', naglowek: 'Szablon strategii SEO: plan na 12 miesięcy, PDF na 6 stronach', korzysc: 'Cele, klastry fraz, treści, technika, linki, widoczność w AI i budżet w jednym dokumencie.' },
    en: { nazwa: 'SEO strategy template', naglowek: 'SEO strategy template: a 12-month plan in a 6-page PDF', korzysc: 'Goals, keyword clusters, content, technical SEO, links, AI visibility and budget in one document.' },
  },
};

// CTA do darmowych narzędzi (bez formularza).
export const NARZEDZIA_POPUPU = {
  'narzedzie-audyt-seo': {
    pl: { href: '/narzedzia/audyt-seo', naglowek: 'Sprawdź swoją stronę: darmowy audyt SEO z oceną 1–100', korzysc: 'Dostajesz listę błędów z priorytetami: technika, treść, szybkość i dostęp botów AI. Bez rejestracji.', przycisk: 'Zrób darmowy audyt SEO' },
    en: { href: '/en/tools/free-seo-audit', naglowek: 'Check your website: a free SEO audit with a 1–100 score', korzysc: 'You get a prioritized list of errors: technical SEO, content, speed and AI bot access. No sign-up.', przycisk: 'Run the free SEO audit' },
  },
  'narzedzie-widocznosc-ai': {
    pl: { href: '/sprawdz-widocznosc-w-ai', naglowek: 'Czy ChatGPT poleca Twoją firmę? Sprawdź za darmo', korzysc: 'Zadajemy ChatGPT, Gemini, Perplexity i przeglądom AI Google pytania Twoich klientów i pokazujemy, czy padnie Twoja nazwa.', przycisk: 'Sprawdź widoczność w AI' },
    en: { href: '/en/ai-visibility-check', naglowek: 'Does ChatGPT recommend your business? Check for free', korzysc: 'We ask ChatGPT, Gemini, Perplexity and Google AI Overviews your customers’ questions and show whether they name you.', przycisk: 'Check AI visibility' },
  },
};

/** Teksty oferty z lib/popupOferty.js w jej języku: { naglowek, korzysc, nazwa? , href?, przycisk? } albo null. */
export function tekstyOferty(oferta) {
  const zrodlo = oferta?.typ === 'link' ? NARZEDZIA_POPUPU : SZABLONY_POPUPU;
  return zrodlo[oferta?.id]?.[oferta.lang] ?? null;
}
