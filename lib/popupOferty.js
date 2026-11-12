// Popup z lead magnetem dopasowanym do treści strony (12.11.2026, zgoda właściciela 12.11.2026).
// Czysty ESM bez importów: czyta go loader (components/NewsletterPopupLoader.jsx), sam popup
// (components/NewsletterPopup.jsx) i test w node. Tu jest JEDYNE miejsce, które decyduje:
//   - na których stronach popup może się pojawić i z jaką ofertą (ofertaDlaSciezki),
//   - jakie wyzwalacze działają na danej stronie (exit intent, przewinięcie, telefon).
//
// Oferty typu 'szablon' wysyłają PDF przez panel (/api/szablony, pole `plik` = id z repo panelu
// lib/szablony.ts, tak samo jak lib/szablony/<slug>.js). Oferty typu 'link' to CTA do darmowego
// narzędzia (bez formularza). Teksty PL/EN: lib/popupTeksty.js.
//
// Zasada doboru: lista dozwolonych stron. Strona, której tu nie ma, nie dostaje popupu - w tym
// narzędzia i szablony (/narzedzia/*, /en/tools/*), /sprawdz-widocznosc-w-ai, kontakt, polityka
// prywatności i cookies, regulamin, panel klienta, 404 (dodatkowo loader sprawdza meta noindex).

// Klucz localStorage: pamięta wyłącznie decyzję samego użytkownika o tym popupie (zamknął albo
// wysłał formularz) i jej czas. Bez identyfikatorów i danych osobowych, nie służy do śledzenia
// ani nie jest wysyłany na serwer, więc jest niezbędny do działania usługi, o którą prosi
// użytkownik (nie pokazywać ponownie), a nie cookie analityczne/marketingowe.
export const KLUCZ_POPUPU = 'aiseo:popup-oferta';
export const PRZERWA_PO_ZAMKNIECIU_DNI = 14;
export const MIN_CZAS_NA_STRONIE_MS = 10_000;
export const PROG_TELEFONU_PX = 768;

// Wyzwalacze: exit = kursor wychodzi górą okna (tylko desktop z myszą); scroll = ułamek przewinięcia
// na desktopie; telefon = ułamek przewinięcia dla wysuwanego paska na telefonie (< 768 px), null = brak.
const BLOG = { exit: true, scroll: 0.6, telefon: 0.55 };
const TYLKO_EXIT = { exit: true, scroll: null, telefon: null };

// Teksty ofert (nagłówki, korzyści, adresy CTA) leżą w lib/popupTeksty.js: ładuje je dopiero popup
// (dynamiczny import), więc w kodzie wczytywanym na każdej stronie zostaje tylko ta mapa (ok. 2 KB gzip).
// Id szablonu = `plik` w panelu; id z prefiksem 'narzedzie-' = CTA do darmowego narzędzia (link).

// Wpisy bloga: klucz = slug w adresie (PL i EN mogą się różnić), wartość = [id oferty, języki,
// w których wpis jest pełnym artykułem]. Strony-cienie („English translation is currently
// unavailable”) nie dostają popupu. Tematy wg lib/blogPosts.js (tagPl/tagEn) 12.11.2026:
//   link building -> analiza konkurencji (nie ma checklisty link buildingu; szablon ma tabelę
//   linków konkurentów), technika -> checklista SEO, treści -> content plan / brief copywritera,
//   lokalne -> checklista wizytówki, ceny SEO -> zapytanie ofertowe, AI/GEO -> narzędzie AI,
//   reszta -> checklista SEO (domyślna).
const PL = ['pl'];
const EN = ['en'];
const OBA = ['pl', 'en'];
const BLOG_WPISY = {
  // Techniczne SEO i wydajność
  'audyt-techniczny-seo': ['checklista-seo', PL],
  'technical-seo-audit-checklist': ['checklista-seo', EN],
  'tag-kanoniczny-seo-jak-wdrozyc-w-2026': ['checklista-seo', PL],
  'canonical-tag-seo-guide-2026': ['checklista-seo', EN],
  'core-web-vitals-a-pozycje-google': ['checklista-seo', PL],
  'core-web-vitals-google-rankings': ['checklista-seo', EN],
  // Treści
  'analiza-luk-contentowych': ['content-plan', PL],
  'content-gap-analysis': ['content-plan', EN],
  'storytelling-marki': ['brief-copywritera', PL],
  'brand-storytelling-patterns': ['brief-copywritera', EN],
  // Analiza konkurencji i link building
  'analiza-konkurencji-seo-przewodnik': ['analiza-konkurencji', PL],
  'seo-competitor-analysis-step-by-step-guide': ['analiza-konkurencji', EN],
  'link-building-b2b-dla-marketerow-strategie-i-checklista': ['analiza-konkurencji', PL],
  'b2b-link-building-strategies-checklist': ['analiza-konkurencji', EN],
  // SEO lokalne i wizytówka
  'seo-lokalne-dla-firm-w-warszawie': ['wizytowka-google', PL],
  'local-seo-for-companies': ['wizytowka-google', EN],
  'jak-pozyskiwac-opinie-google-poradnik': ['wizytowka-google', PL],
  'how-to-get-google-reviews': ['wizytowka-google', EN],
  'multi-location-seo-scale-local-visibility': ['wizytowka-google', EN],
  // Ceny i wybór wykonawcy
  'ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026': ['zapytanie-ofertowe-seo', PL],
  'how-much-does-seo-cost-pricing-packages-2026': ['zapytanie-ofertowe-seo', EN],
  'ile-kosztuje-strona-www-dla-firmy-ceny': ['brief-strony', PL],
  'how-much-does-a-business-website-cost-pricing': ['brief-strony', EN],
  'audyt-ux-strony': ['brief-strony', PL],
  'ux-audit-guide': ['brief-strony', EN],
  // Strategia
  'seo-for-saas-startups-playbook': ['strategia-seo', EN],
  'wyniki-wdrozen-seo-2026': ['checklista-seo', PL],
  // AI i GEO (wpis za bramką publikacji; 404 odcina meta noindex w loaderze)
  'bing-webmaster-tools-indexnow-chatgpt': ['narzedzie-widocznosc-ai', OBA],
  // Pozostałe tematy (RODO, analityka, CRO, e-mail marketing) -> domyślna checklista SEO
  'rodo-na-stronie-internetowej': ['checklista-seo', PL],
  'konfiguracja-zdarzen-gtm-ga4-poradnik': ['checklista-seo', PL],
  'vwo-vs-optimizely-porownanie': ['checklista-seo', OBA],
  'mailchimp-vs-getresponse': ['checklista-seo', PL],
  'best-marketing-attribution-tools-for-2026': ['checklista-seo', EN],
};

// Strony usług i porównań: [wzorzec ścieżki bez prefiksu /en, id oferty, wyzwalacze].
const STRONY = [
  // Porównania i zmiana agencji: ktoś wybiera wykonawcę -> wzór zapytania ofertowego.
  [/^\/(porownania|comparisons)\/[a-z0-9-]+$/, 'zapytanie-ofertowe-seo', TYLKO_EXIT],
  [/^\/(zmiana-agencji-seo|switching-seo-agency)$/, 'zapytanie-ofertowe-seo', TYLKO_EXIT],
  // Cennik: tylko exit intent.
  [/^\/(cennik-pozycjonowania|seo-pricing)$/, 'zapytanie-ofertowe-seo', TYLKO_EXIT],
  // Strona główna i usługi: CTA do darmowego narzędzia (exit intent, na telefonie nic).
  [/^\/?$/, 'narzedzie-audyt-seo', TYLKO_EXIT],
  [/^\/(pozycjonowanie-stron-internetowych|seo-services)$/, 'narzedzie-audyt-seo', TYLKO_EXIT],
  [/^\/(seo-lokalne-warszawa|local-seo-warsaw)$/, 'narzedzie-audyt-seo', TYLKO_EXIT],
  [/^\/(pozycjonowanie-wizytowki-google|google-business-profile-optimization)$/, 'narzedzie-audyt-seo', TYLKO_EXIT],
  [/^\/(projektowanie-stron-internetowych|web-design)$/, 'narzedzie-audyt-seo', TYLKO_EXIT],
  [/^\/(pozycjonowanie-w-ai|ai-search-optimization)(\/[a-z0-9-]+)?$/, 'narzedzie-widocznosc-ai', TYLKO_EXIT],
];

// Nigdy (sprawdzane przed wszystkim innym; lista dozwolonych i tak ich nie obejmuje, ale wzorce
// zostają jawnie, żeby przyszła reguła STRONY ich nie złapała).
const NIGDY = [
  /^\/(narzedzia|tools)(\/|$)/,
  /^\/(sprawdz-widocznosc-w-ai|ai-visibility-check)(\/|$)/,
  /^\/(kontakt|contact)(\/|$)/,
  /^\/(cookies|polityka-prywatnosci|privacy-policy|regulamin|terms)(\/|$)/,
  /^\/(panel-klienta|client-portal|panel)(\/|$)/,
  /^\/(audyt-seo|seo-audit)(\/|$)/,
];

function zbudujOferte(id, lang, wyzwalacze) {
  return id.startsWith('narzedzie-') ? { id, typ: 'link', lang, wyzwalacze } : { id, typ: 'szablon', plik: id, lang, wyzwalacze };
}

/** Ścieżka adresu (window.location.pathname) -> oferta popupu albo null (bez popupu). */
export function ofertaDlaSciezki(pathname = '') {
  let p = String(pathname || '/').split(/[?#]/)[0];
  try {
    p = decodeURI(p);
  } catch {
    // zostaje surowa ścieżka
  }
  if (p.length > 1) p = p.replace(/\/+$/, '');
  const en = p === '/en' || p.startsWith('/en/');
  const lang = en ? 'en' : 'pl';
  const reszta = en ? p.slice(3) || '/' : p;
  if (NIGDY.some((re) => re.test(reszta))) return null;
  const blog = reszta.match(/^\/blog\/([a-z0-9-]+)$/);
  if (blog) {
    const wpis = BLOG_WPISY[blog[1]];
    if (!wpis || !wpis[1].includes(lang)) return null;
    // Wpis o AI kieruje do narzędzia; na telefonie też jako pasek (to wpis bloga).
    return zbudujOferte(wpis[0], lang, BLOG);
  }
  for (const [re, id, wyzwalacze] of STRONY) if (re.test(reszta)) return zbudujOferte(id, lang, wyzwalacze);
  return null;
}

/** Stan z localStorage: null (można pokazać) albo powód wstrzymania. Błąd dostępu = nie pokazujemy. */
export function powodWstrzymania(teraz = Date.now(), magazyn = typeof window !== 'undefined' ? window.localStorage : null) {
  try {
    if (!magazyn) return 'brak-magazynu';
    const surowy = magazyn.getItem(KLUCZ_POPUPU);
    if (!surowy) return null;
    const stan = JSON.parse(surowy);
    if (stan?.wyslano) return 'wyslano';
    if (typeof stan?.zamknieto === 'number' && teraz - stan.zamknieto < PRZERWA_PO_ZAMKNIECIU_DNI * 864e5) return 'zamknieto';
    return null;
  } catch {
    // Prywatne okno, zablokowane dane strony albo zepsuty wpis: lepiej nie pokazać niż pokazywać za często.
    return 'blad-magazynu';
  }
}

/** Zapis decyzji użytkownika: 'zamknieto' (przerwa 14 dni) albo 'wyslano' (nigdy więcej). */
export function zapiszDecyzje(rodzaj, teraz = Date.now()) {
  try {
    window.localStorage.setItem(KLUCZ_POPUPU, JSON.stringify(rodzaj === 'wyslano' ? { wyslano: teraz } : { zamknieto: teraz }));
  } catch {
    // Bez magazynu popup i tak pokaże się najwyżej raz na odsłonę.
  }
}
