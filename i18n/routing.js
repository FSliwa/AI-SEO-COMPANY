import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pl', 'en'],
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
  pathnames: {
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
    // Strony tylko po polsku (T1a, BL-01): zwykly string = slug EN taki sam jak PL, wiec
    // /en/... trafia do strony, ktora robi notFound() -> 404 wprost, bez 307/308 na nieistniejacy
    // slug EN. Lista stron tylko-PL: lib/plOnly.js.
    '/sprawdz-widocznosc-w-ai': '/sprawdz-widocznosc-w-ai',
    '/zmiana-agencji-seo': '/zmiana-agencji-seo',
    // Nowe strony z PLAN-v2 (tylko PL, za bramka publikacji lib/publikacja.js). Klucze z '['
    // nie trafiaja do sitemapy - jej adresy bierze lib/sitemapEntries.js z rejestru publikacji.
    '/porownania': '/porownania',
    '/porownania/[slug]': '/porownania/[slug]',
    '/pozycjonowanie-w-ai/[slug]': '/pozycjonowanie-w-ai/[slug]',
    '/pozycjonowanie-wizytowki-google': '/pozycjonowanie-wizytowki-google',
    '/narzedzia': '/narzedzia',
    '/narzedzia/[slug]': '/narzedzia/[slug]',
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
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
