import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed',
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
    '/o-nas': {
      pl: '/o-nas',
      en: '/about-us'
    },
    '/cookies': {
      pl: '/cookies',
      en: '/cookies'
    },
    '/blog': {
      pl: '/blog',
      en: '/blog'
    },
    '/blog/biblioteka': {
      pl: '/blog/biblioteka',
      en: '/blog/library'
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
    }
  }
});

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
