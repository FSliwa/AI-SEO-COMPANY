import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';
import { STRONY_EN } from '../lib/stronyEn';
import { STRONY_DE, DE_AKTYWNE } from '../lib/stronyDe';

// Wersja niemiecka (18.11.2026): przy DE_AKTYWNE = false (domyślnie, lib/stronyDe.js) routing jest
// IDENTYCZNY jak przed dodaniem DE (te same locales i pathnames), więc /de = 404 i HTML PL/EN bez zmian.
// Przy podglądzie (NEXT_PUBLIC_PODGLAD_DE=1) dochodzi locale 'de' i klucz 'de' w wpisach stron z
// lib/stronyDe.js; trasy [slug] dostają szablon DE. Klucz bez wpisu 'de' next-intl zamienia na
// szablon PL, dlatego middleware.js odrzuca (404) każdy adres /de/... spoza lib/stronyDe.js.
const SZABLONY_DE = {
  '/porownania/[slug]': '/vergleiche/[slug]',
  '/pozycjonowanie-w-ai/[slug]': '/ki-suchoptimierung/[slug]',
  '/narzedzia/[slug]': '/tools/[slug]',
};
function dodajDe(pathnames) {
  if (!DE_AKTYWNE) return pathnames;
  const wynik = {};
  for (const [klucz, wpis] of Object.entries(pathnames)) {
    const de = STRONY_DE[klucz]?.de ?? SZABLONY_DE[klucz];
    // Ścieżka '/' jest zwykłym stringiem (wszystkie języki), reszta to obiekty {pl, en}.
    wynik[klucz] = de && typeof wpis === 'object' ? { ...wpis, de } : wpis;
  }
  // Strony bez polskiego odpowiednika: klucz = ścieżka DE; pl/en wskazują tę samą ścieżkę,
  // a strona woła notFound() dla locale innego niż 'de'.
  for (const [klucz, w] of Object.entries(STRONY_DE)) {
    if (w.tylkoDe && !wynik[klucz]) wynik[klucz] = { pl: klucz, en: klucz, de: w.de };
  }
  return wynik;
}

export const routing = defineRouting({
  locales: DE_AKTYWNE ? ['pl', 'en', 'de'] : ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
  localeDetection: false,
  // T9 (TS-11, 5.11.2026): bez ciasteczka NEXT_LOCALE. Przy localeDetection: false nic go nie
  // czytalo, a Set-Cookie w kazdej odpowiedzi HTML utrudnial cache i byl zbednym ciasteczkiem.
  localeCookie: false,
  // Hreflang wylacznie w HTML (alternates w metadata) - naglowek Link:
  // z middleware dublowal deklaracje. W next-intl v4 opcja zyje tutaj,
  // nie w drugim argumencie createMiddleware.
  alternateLinks: false,
  pathnames: dodajDe({
    '/': '/',
    '/pozycjonowanie-stron-internetowych': {
      pl: '/pozycjonowanie-stron-internetowych',
      en: '/seo-services'
    },
    '/audyt-seo': {
      pl: '/audyt-seo',
      en: '/seo-audit'
    },
    '/seo-lokalne-warszawa': {
      pl: '/seo-lokalne-warszawa',
      en: '/local-seo-warsaw'
    },
    '/cennik-pozycjonowania': {
      pl: '/cennik-pozycjonowania',
      en: '/seo-pricing'
    },
    '/projektowanie-stron-internetowych': {
      pl: '/projektowanie-stron-internetowych',
      en: '/web-design'
    },
    '/pozycjonowanie-w-ai': {
      pl: '/pozycjonowanie-w-ai',
      en: '/ai-search-optimization'
    },
    // Nowe strony z PLAN-v2 i darmowe narzędzia: od 9.11.2026 także po angielsku. Ścieżki EN
    // w jednym miejscu (lib/stronyEn.js) i tu jako pary pl/en. Strony spod tras [slug] mają
    // jawne klucze (inny slug EN); next-intl tłumaczy adres EN na wewnętrzny adres PL, więc
    // strona [slug] zawsze dostaje slug PL i locale. Strony bez wpisu EN (zarezerwowane adresy)
    // trafiają w szablon [slug] i dają 404 (dynamicParams = false).
    ...Object.fromEntries(Object.entries(STRONY_EN).map(([pl, { en }]) => [pl, { pl, en }])),
    '/porownania/[slug]': { pl: '/porownania/[slug]', en: '/comparisons/[slug]' },
    '/pozycjonowanie-w-ai/[slug]': { pl: '/pozycjonowanie-w-ai/[slug]', en: '/ai-search-optimization/[slug]' },
    '/narzedzia/[slug]': { pl: '/narzedzia/[slug]', en: '/tools/[slug]' },
    '/panel-klienta': {
      pl: '/panel-klienta',
      en: '/client-portal'
    },
    '/o-nas': {
      pl: '/o-nas',
      en: '/about-us'
    },
    '/regulamin': {
      pl: '/regulamin',
      en: '/terms'
    },
    '/cookies': {
      pl: '/cookies',
      en: '/cookies'
    },
    '/blog': {
      pl: '/blog',
      en: '/blog'
    },
    '/blog/jak-pozyskiwac-opinie-google-poradnik': {
      pl: '/blog/jak-pozyskiwac-opinie-google-poradnik',
      en: '/blog/how-to-get-google-reviews'
    },
    '/blog/seo-lokalne-dla-firm-w-warszawie': {
      pl: '/blog/seo-lokalne-dla-firm-w-warszawie',
      en: '/blog/local-seo-for-companies'
    },
    '/blog/core-web-vitals-a-pozycje-google': {
      pl: '/blog/core-web-vitals-a-pozycje-google',
      en: '/blog/core-web-vitals-google-rankings'
    },
    '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': {
      pl: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026',
      en: '/blog/canonical-tag-seo-guide-2026'
    },
    '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026': {
      pl: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
      en: '/blog/how-much-does-seo-cost-pricing-packages-2026'
    },
    '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': {
      pl: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista',
      en: '/blog/b2b-link-building-strategies-checklist'
    },
    '/blog/ile-kosztuje-strona-www-dla-firmy-ceny': {
      pl: '/blog/ile-kosztuje-strona-www-dla-firmy-ceny',
      en: '/blog/how-much-does-a-business-website-cost-pricing'
    },
    '/blog/analiza-konkurencji-seo-przewodnik': {
      pl: '/blog/analiza-konkurencji-seo-przewodnik',
      en: '/blog/seo-competitor-analysis-step-by-step-guide'
    },
    '/blog/content-gap-analysis': {
      pl: '/blog/analiza-luk-contentowych',
      en: '/blog/content-gap-analysis'
    },
    '/blog/technical-seo-audit-checklist': {
      pl: '/blog/audyt-techniczny-seo',
      en: '/blog/technical-seo-audit-checklist'
    },
    '/blog/audyt-ux-strony': {
      pl: '/blog/audyt-ux-strony',
      en: '/blog/ux-audit-guide'
    },
    '/blog/brand-storytelling-patterns': {
      pl: '/blog/storytelling-marki',
      en: '/blog/brand-storytelling-patterns'
    },
    '/blog/vwo-vs-optimizely-porownanie': {
      pl: '/blog/vwo-vs-optimizely-porownanie',
      en: '/blog/vwo-vs-optimizely-comparison'
    }
  })
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
