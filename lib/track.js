// Jedno wejście dla zdarzeń niestandardowych GA4 / Google Ads. Bez gtag
// (blokada skryptów, SSR) nic się nie dzieje. gtag rozsyła każde zdarzenie do
// obu właściwości GA4 i do tagu Ads, bo wszystkie trzy są skonfigurowane
// w app/[locale]/layout.js.
export function track(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, { page_type: pageType(window.location.pathname), ...params });
}

// 4.11.2026 (etap 0 planu z filmu, T0.1): typ strony przy kazdym zdarzeniu, zeby
// leady z organic liczyc per szablon (usluga / porownanie / narzedzie / blog...).
// W GA4 trzeba zarejestrowac wymiar niestandardowy „page_type” (zakres: zdarzenie),
// inaczej parametr jest zbierany, ale nie widac go w raportach.
// Klucze to sciezki PL i EN z i18n/routing.js; nowe szablony dopisywac tutaj.
const PAGE_TYPES = [
  [/^\/(en\/?)?$/, 'home'],
  [/^(\/en)?\/(cennik-pozycjonowania|seo-pricing)(\/|$)/, 'cennik'],
  [/^(\/en)?\/(pozycjonowanie-w-ai|ai-search-optimization)(\/|$)/, 'geo'],
  // PLAN-v2 6.0 (5.11.2026): szablony do pobrania pod /narzedzia/ (S1, S2) PRZED regula narzedzi,
  // inaczej dostalyby 'narzedzie'; raporty AI (PR-A) jako osobny typ.
  [/^(\/en)?\/narzedzia\/(raport-seo|umowa-na-pozycjonowanie)(\/|$)/, 'szablon'],
  [/^(\/en)?\/raporty-ai(\/|$)/, 'raport'],
  [/^(\/en)?\/(sprawdz-widocznosc-w-ai|ai-visibility-check|narzedzia|tools)(\/|$)/, 'narzedzie'],
  [/^(\/en)?\/(porownania|comparisons)(\/|$)/, 'porownanie'],
  [/^(\/en)?\/(szablony|templates)(\/|$)/, 'szablon'],
  [/^(\/en)?\/blog\/.+/, 'blog'],
  [/^(\/en)?\/blog\/?$/, 'blog_lista'],
  [/^(\/en)?\/(pozycjonowanie-stron-internetowych|seo-services|audyt-seo|seo-audit|seo-lokalne-warszawa|local-seo-warsaw|projektowanie-stron-internetowych|web-design|pozycjonowanie-wizytowki-google)(\/|$)/, 'usluga'],
  [/^(\/en)?\/(panel-klienta|client-portal)(\/|$)/, 'panel'],
  [/^(\/en)?\/(zmiana-agencji-seo|changing-seo-agency)(\/|$)/, 'poradnik'],
];

export function pageType(pathname = '') {
  for (const [re, type] of PAGE_TYPES) if (re.test(pathname)) return type;
  return 'inne';
}

// Zdarzenie DOM, którym przyciski „Wybierz" w cenniku przekazują pakiet do
// formularza kontaktowego (components/AnalyticsEvents.jsx -> Contact.jsx).
export const PRESELECT_PLAN_EVENT = 'aiseo:preselect-plan';
