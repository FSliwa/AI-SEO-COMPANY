// BlogCTA per klaster (BC1; PLAN-v2 5.2 nr 29, 6.25 wiersz „BlogCTA”, 9.4; CS-04 z korektą).
// 5.11.2026: do tej pory wszystkie artykuły kończyły się tym samym przyciskiem do #kontakt
// (data-cta="blog_cta"), więc lejek nie miał kroku MOFU, a w GA4 nie dało się rozróżnić
// klastrów. Teraz wpis w lib/blogPosts.js dostaje pole `cta: '<klaster>'` i BlogCTA linkuje
// do strony z tego samego klastra z data-cta="blog_cta_<klaster>". Wpis bez pola zostaje przy
// formularzu kontaktowym (data-cta="blog_cta_kontakt").
//
// Czysty ESM bez aliasu @/ (komponent kliencki BlogCTA, testy w node). Cele z rejestru
// publikacji przechodzą przez hrefJesliOpublikowana (reguła 6.0: link tylko do strony,
// która zwraca 200).
//
// Pomiar (9.4): baza = cta_click z cta_location=blog_cta (W1–W2), po zmianie suma
// cta_click z cta_location=blog_cta_* i generate_lead z landing page /blog/*; wynik W13.
// Kliknięcie w link wewnętrzny z data-cta^="blog_cta_" wysyła cta_click z link_url
// (components/AnalyticsEvents.jsx, gałąź przed warunkiem kotwicy kontaktu).

import { hrefJesliOpublikowana, SPRAWDZARKA_DZIALA } from './publikacja.js';
import { tylkoPl } from './plOnly.js';

// T0.2 (klucze DataForSEO w panelu): dopóki sprawdzarka zwraca 503, klaster `ai` nie może
// do niej prowadzić. Po T0.2 (Filip) flaga w lib/publikacja.js = true - wtedy `ai` -> /sprawdz-widocznosc-w-ai.
// Integracja 5.11.2026: jedna flaga dla serwisu (tu tylko reeksport).
export { SPRAWDZARKA_DZIALA };

// Cele CTA. Teksty tylko z faktami, które stoją na stronie docelowej (ceny i terminy jak
// w cenniku, audycie, hubie GEO i panelu na 5.11.2026). EN = wersja na /en; cel tylko-PL
// nie ma tekstów EN - na /en zastępuje go `zamiennikEn`.
const CELE = {
  hubAi: {
    href: '/pozycjonowanie-w-ai',
    titlePl: 'Chcesz, żeby ChatGPT polecał Twoją firmę?',
    textPl: 'Pozycjonowanie w AI: pracujemy nad tym, żeby Twoja firma pojawiała się w odpowiedziach ChatGPT, Gemini i Google, i mierzymy to co tydzień w panelu klienta.',
    labelPl: 'Zobacz pozycjonowanie w AI',
    titleEn: 'Want ChatGPT to recommend your company?',
    textEn: 'AI search optimization: we work on getting your company into ChatGPT, Gemini and Google answers and measure it every week in the client portal.',
    labelEn: 'See AI search optimization',
  },
  // A5 (partia 2, W5) - aktywny dopiero po publikacji w lib/publikacja.js.
  audytAi: {
    href: '/pozycjonowanie-w-ai/audyt-widocznosci',
    titlePl: 'Sprawdź, jak AI widzi Twoją firmę',
    textPl: 'Audyt widoczności w AI za 990 zł netto: 30 pytań Twoich klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI Google, źródła cytowań i plan na 90 dni.',
    labelPl: 'Zobacz audyt widoczności w AI',
    zamiennikEn: 'hubAi',
  },
  sprawdzarka: {
    href: '/sprawdz-widocznosc-w-ai',
    titlePl: 'Czy ChatGPT poleca Twoją firmę?',
    textPl: 'Bezpłatna sprawdzarka widoczności w AI zadaje ChatGPT i Gemini pytania Twoich klientów i pokazuje, czy wymieniają Twoją firmę.',
    labelPl: 'Sprawdź, czy ChatGPT poleca Twoją firmę',
    zamiennikEn: 'hubAi',
  },
  audyt: {
    href: '/audyt-seo',
    titlePl: 'Chcesz to sprawdzić na swojej stronie?',
    textPl: 'Audyt SEO w 3–5 dni roboczych: każdy błąd z priorytetem i instrukcją naprawy dla programisty. Jako osobna usługa od 1 490 zł netto.',
    labelPl: 'Zobacz audyt SEO',
    titleEn: 'Want this checked on your site?',
    textEn: 'SEO audit: every issue with a priority and a fix instruction your developer can follow.',
    labelEn: 'See the SEO audit',
  },
  ceny: {
    href: '/cennik-pozycjonowania',
    titlePl: 'Ile kosztowałoby pozycjonowanie Twojej strony?',
    textPl: 'Jawny cennik: SEO Standard od 1 900 zł netto miesięcznie, umowa na miesiąc, bez ukrytych opłat.',
    labelPl: 'Zobacz cennik pozycjonowania',
    titleEn: 'How much would SEO cost for your site?',
    textEn: 'Transparent SEO pricing: monthly plans and no hidden fees.',
    labelEn: 'See SEO pricing',
  },
  lokalne: {
    href: '/seo-lokalne-warszawa',
    titlePl: 'Chcesz być wyżej w Mapach Google?',
    textPl: 'Pozycjonowanie lokalne w Warszawie: Profil Firmy w Google, opinie i strony usług dla klientów z okolicy.',
    labelPl: 'Zobacz pozycjonowanie lokalne',
    titleEn: 'Want to rank higher in Google Maps?',
    textEn: 'Local SEO in Warsaw: Google Business Profile, reviews and service pages for customers nearby.',
    labelEn: 'See local SEO in Warsaw',
  },
  // L1 (partia 2, W5) - tylko dla artykułu o opiniach, po publikacji L1.
  wizytowka: {
    href: '/pozycjonowanie-wizytowki-google',
    titlePl: 'Chcesz, żeby wizytówka Google przyciągała klientów?',
    textPl: 'Pozycjonowanie wizytówki Google: kategorie, opinie, posty i pomiar pozycji w Mapach, z jawną ceną i umową miesięczną.',
    labelPl: 'Zobacz pozycjonowanie wizytówki Google',
    zamiennikEn: 'lokalne',
  },
  web: {
    href: '/projektowanie-stron-internetowych',
    titlePl: 'Planujesz nową stronę albo przebudowę?',
    textPl: 'Projektujemy szybkie strony na Next.js z SEO od pierwszego dnia, gotowe do pozycjonowania i pomiaru konwersji.',
    labelPl: 'Zobacz projektowanie stron',
    titleEn: 'Planning a new website or a rebuild?',
    textEn: 'We build fast Next.js websites with SEO in place from day one, ready for rankings and conversion tracking.',
    labelEn: 'See web design',
  },
  analityka: {
    href: '/panel-klienta',
    titlePl: 'Chcesz widzieć wyniki bez czekania na raport?',
    textPl: 'Panel klienta: dane z Google, zapytania, dziennik prac i zmiany na stronie codziennie. Demo otworzysz bez logowania.',
    labelPl: 'Zobacz demo panelu klienta',
    titleEn: 'Want to see results without waiting for a report?',
    textEn: 'Client portal: Google data, enquiries, a work log and site changes every day. Open the demo without logging in.',
    labelEn: 'See the client portal demo',
  },
};

// Klaster ai (korekta CS-04): W2 hub GEO -> po W5 A5 -> po T0.2 sprawdzarka.
function celAi() {
  if (SPRAWDZARKA_DZIALA) return CELE.sprawdzarka;
  return hrefJesliOpublikowana(CELE.audytAi.href) ? CELE.audytAi : CELE.hubAi;
}

/**
 * Klaster -> cel CTA (stan na dziś, z bramką publikacji).
 * Pola: href, titlePl, textPl, labelPl, labelEn (+ titleEn, textEn dla celów z wersją EN).
 */
export const KLASTRY_CTA = {
  ai: celAi(),
  audyt: CELE.audyt,
  ceny: CELE.ceny,
  lokalne: CELE.lokalne,
  web: CELE.web,
  analityka: CELE.analityka,
};

// Wyjątki per wpis w obrębie klastra (data-cta bez zmian, inny cel).
// Artykuł o opiniach prowadzi do L1 dopiero po jej publikacji (CS-04: „po W5 opinie -> L1”).
const WYJATKI = {
  '/blog/jak-pozyskiwac-opinie-google-poradnik': () => (hrefJesliOpublikowana(CELE.wizytowka.href) ? CELE.wizytowka : null),
};

/**
 * Mapa slug -> klaster (CS-04, RAPORT content-strategy 6.1). Źródło dla pola `cta`
 * w lib/blogPosts.js (wpisuje Integracja). Wpisy bez klastra (mailchimp, vwo, artykuły
 * tylko EN) zostają przy formularzu kontaktowym. B1 dostaje `cta: 'ai'` przy publikacji
 * partii 3 (do tego czasu strona przekazuje klaster propem).
 */
export const KLASTER_WPISU = {
  '/blog/wyniki-wdrozen-seo-2026': 'ceny',
  '/blog/brand-storytelling-patterns': 'web',
  '/blog/technical-seo-audit-checklist': 'audyt',
  '/blog/rodo-na-stronie-internetowej': 'web',
  '/blog/content-gap-analysis': 'audyt',
  '/blog/audyt-ux-strony': 'web',
  '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik': 'analityka',
  '/blog/analiza-konkurencji-seo-przewodnik': 'audyt',
  '/blog/ile-kosztuje-strona-www-dla-firmy-ceny': 'web',
  '/blog/jak-pozyskiwac-opinie-google-poradnik': 'lokalne',
  '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': 'audyt',
  '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': 'ceny',
  '/blog/core-web-vitals-a-pozycje-google': 'web',
  '/blog/seo-lokalne-dla-firm-w-warszawie': 'lokalne',
  '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026': 'ceny',
  '/blog/bing-webmaster-tools-indexnow-chatgpt': 'ai',
  // bez klastra (#kontakt): mailchimp-vs-getresponse, vwo-vs-optimizely-porownanie,
  // seo-for-saas-startups-playbook, multi-location-seo-scale-local-visibility,
  // best-marketing-attribution-tools-for-2026
};

/**
 * CTA dla wpisu: { klaster, href, title, text, label } albo null (= formularz kontaktowy).
 * Na /en cel tylko-PL zastępuje jego `zamiennikEn`; bez tekstów EN -> null.
 */
export function ctaDlaWpisu(klaster, slug, lang = 'pl') {
  if (!klaster || !KLASTRY_CTA[klaster]) return null;
  let cel = (WYJATKI[slug] && WYJATKI[slug]()) || KLASTRY_CTA[klaster];
  const en = lang === 'en';
  if (en && tylkoPl(cel.href)) cel = cel.zamiennikEn ? CELE[cel.zamiennikEn] : null;
  if (!cel || (en && !cel.labelEn)) return null;
  return {
    klaster,
    href: cel.href,
    title: en ? cel.titleEn : cel.titlePl,
    text: en ? cel.textEn : cel.textPl,
    label: en ? cel.labelEn : cel.labelPl,
  };
}
