import { routing } from '../i18n/routing';
import { blogPosts } from '../lib/blogPosts';

// 14.10.2026: lastmod = dzien (UTC) wdrozenia produkcyjnego z ostatnia istotna
// zmiana danej strony (GitHub Deployments, srodowisko Production). Wczesniej
// wszystkie strony statyczne mialy 2026-08-24, a artykuly date publikacji,
// choc tresc zmieniala sie 01.09-26.09; piec artykulow mialo lastmod sprzed
// powstania strony. Google uzywa lastmod tylko wtedy, gdy jest konsekwentnie
// i sprawdzalnie zgodny z prawda - dotyczy to calej sitemapy, nie wpisu.
//
// OBOWIAZEK: kazde wdrozenie, ktore zmienia tresc, linki, obrazy, dane
// strukturalne, title, description, canonical lub hreflang konkretnej strony,
// musi zaktualizowac jej wpis (data wdrozenia, nie commita). Nie licza sie:
// CSS, aria-label, atrybuty sledzenia oraz elementy wspolne calego serwisu
// (Header, Footer, baner, Organization/WebSite w layout, blok Contact).
// Klucz = pelny URL dokladnie jak w push() ('/' na koncu tylko dla strony
// glownej PL). Pol date w lib/blogPosts.js nie ruszac - zasilaja
// datePublished/dateModified i widoczna date.
const LASTMOD = {
  // Stan na 14.10.2026 = daty ostatnich istotnych zmian, ktore SA na
  // produkcji. Przy wdrozeniu zmienic na dzien (UTC) tego wdrozenia:
  // - mailchimp: gdy wejda poprawki SEO z 14.10 (JSON-LD artykulu: autor
  //   z @id, image, BreadcrumbList); dzis 26.09 = e3c3d49 (dane strukturalne);
  // - '/', '/en': gdy wejdzie nowa zapowiedz bloga i portfolio z lokalnych
  //   zmian (czas czytania zamiast tagu i daty, link do wszystkich wpisow);
  // - how-much-...-pricing: gdy wejda ceny EUR 450/590 z lokalnych zmian.
  'https://www.ai-seo-company.pl/blog/mailchimp-vs-getresponse': '2026-09-26',
  'https://www.ai-seo-company.pl/': '2026-09-24',
  'https://www.ai-seo-company.pl/en': '2026-09-24',
  'https://www.ai-seo-company.pl/en/blog/how-much-does-a-business-website-cost-pricing': '2026-09-26',

  // e3c3d49 (26.09): podstrony EN (OUR WORK, EUR, Strategy & SEO) i
  // mainEntityOfPage/BreadcrumbList 8 artykulow EN (osmy, how-much-...-
  // pricing, ma pozniejsza zmiane - wyzej).
  'https://www.ai-seo-company.pl/en/seo-services': '2026-09-26',
  'https://www.ai-seo-company.pl/en/seo-audit': '2026-09-26',
  'https://www.ai-seo-company.pl/en/local-seo-warsaw': '2026-09-26',
  'https://www.ai-seo-company.pl/en/seo-pricing': '2026-09-26',
  'https://www.ai-seo-company.pl/en/web-design': '2026-09-26',
  'https://www.ai-seo-company.pl/en/about-us': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/seo-competitor-analysis-step-by-step-guide': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/how-to-get-google-reviews': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/canonical-tag-seo-guide-2026': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/b2b-link-building-strategies-checklist': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/local-seo-for-companies': '2026-09-26',
  'https://www.ai-seo-company.pl/en/blog/how-much-does-seo-cost-pricing-packages-2026': '2026-09-26',

  // 5277fe6, b6437fe, 10c3673 (24.09): cennik, hero i FAQ landingow,
  // tekst o czasie odpowiedzi w artykulach ('/' i '/en' maja pozniejsza
  // zmiane - wyzej).
  'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych': '2026-09-24',
  'https://www.ai-seo-company.pl/audyt-seo': '2026-09-24',
  'https://www.ai-seo-company.pl/seo-lokalne-warszawa': '2026-09-24',
  'https://www.ai-seo-company.pl/cennik-pozycjonowania': '2026-09-24',
  'https://www.ai-seo-company.pl/projektowanie-stron-internetowych': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/wyniki-wdrozen-seo-2026': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/storytelling-marki': '2026-09-24',
  'https://www.ai-seo-company.pl/en/blog/brand-storytelling-patterns': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/audyt-techniczny-seo': '2026-09-24',
  'https://www.ai-seo-company.pl/en/blog/technical-seo-audit-checklist': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/rodo-na-stronie-internetowej': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/analiza-luk-contentowych': '2026-09-24',
  'https://www.ai-seo-company.pl/en/blog/content-gap-analysis': '2026-09-24',
  'https://www.ai-seo-company.pl/blog/audyt-ux-strony': '2026-09-24',
  'https://www.ai-seo-company.pl/en/blog/ux-audit-guide': '2026-09-24',

  // 247bf6f (wdrozenie 22.09): akapit o gclid i aisc_attr w polityce cookies.
  'https://www.ai-seo-company.pl/cookies': '2026-09-22',
  'https://www.ai-seo-company.pl/en/cookies': '2026-09-22',

  // f926b0d z 38861a8 (02.09): meta description EN bloga, link i meta
  // description w dwoch artykulach PL.
  'https://www.ai-seo-company.pl/en/blog': '2026-09-02',
  'https://www.ai-seo-company.pl/en/blog/library': '2026-09-02',
  'https://www.ai-seo-company.pl/blog/analiza-konkurencji-seo-przewodnik': '2026-09-02',
  'https://www.ai-seo-company.pl/blog/ile-kosztuje-strona-www-dla-firmy-ceny': '2026-09-02',

  // 4a12a78 (01.09): AboutAuthor, listy bloga, usuniety tekst generatora,
  // ArticleSchema z author @id.
  'https://www.ai-seo-company.pl/o-nas': '2026-09-01',
  'https://www.ai-seo-company.pl/blog': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/biblioteka': '2026-09-01',
  'https://www.ai-seo-company.pl/en/blog/seo-for-saas-startups-playbook': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026': '2026-09-01',
  'https://www.ai-seo-company.pl/en/blog/multi-location-seo-scale-local-visibility': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik': '2026-09-01',
  'https://www.ai-seo-company.pl/en/blog/best-marketing-attribution-tools-for-2026': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/vwo-vs-optimizely-porownanie': '2026-09-01',
  'https://www.ai-seo-company.pl/en/blog/vwo-vs-optimizely-porownanie': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/jak-pozyskiwac-opinie-google-poradnik': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google': '2026-09-01',
  'https://www.ai-seo-company.pl/blog/seo-lokalne-dla-firm-w-warszawie': '2026-09-01',

  // a844ac6 (25.08): x-default regulaminu.
  'https://www.ai-seo-company.pl/regulamin': '2026-08-25',
  'https://www.ai-seo-company.pl/en/terms': '2026-08-25',
};

export default function sitemap() {
  const baseUrl = 'https://www.ai-seo-company.pl';
  // Realne daty zamiast chwili requestu: identyczny, dynamiczny lastmod
  // na 49 wpisach czynil sygnal bezwartosciowym dla Google (audyt 24.08).
  // Od 14.10.2026 tylko fallback dla tras bez wpisu w LASTMOD.
  const STATIC_LASTMOD = '2026-08-24';

  const allRoutes = [];
  const seen = new Set();

  const push = (url, changeFrequency, priority, lastModified = STATIC_LASTMOD) => {
    if (seen.has(url)) return;
    seen.add(url);
    // Wpis z LASTMOD ma pierwszenstwo takze przed post.date artykulow.
    allRoutes.push({ url, lastModified: LASTMOD[url] ?? lastModified, changeFrequency, priority });
  };

  // Artykuly ida PIERWSZE: dedup `seen` musi zablokowac wpis z petli pathnames
  // (statyczny lastmod), a nie odwrotnie - inaczej kazdy artykul ze
  // zlokalizowanym slugiem tracil realna date publikacji (regresja z 26.08).
  // blogPosts is the source of truth for articles. routing.pathnames only carries
  // the posts that needed a localised slug, so deriving article URLs from it alone
  // silently drops every new one — keep both sources in play.
  blogPosts.forEach(post => {
    const mapped = routing.pathnames[post.slug];

    // English-only posts have no Polish page to advertise. Listing one anyway
    // put a URL in the sitemap whose canonical pointed at the English version,
    // which reads as a contradiction: "index this" plus "no, index that".
    if (!post.enOnly) {
      push(`${baseUrl}${(mapped && mapped.pl) || post.slug}`, 'weekly', 0.7, post.date || STATIC_LASTMOD);
    }

    // Polish-only posts have no English page to advertise.
    if (!post.plOnly) {
      push(`${baseUrl}/en${(mapped && mapped.en) || post.slug}`, 'weekly', 0.7, post.date || STATIC_LASTMOD);
    }
  });

  // Static pages, plus any article that needed a localised slug
  Object.keys(routing.pathnames).forEach(route => {
    const changeFrequency = route === '/' || route.startsWith('/blog') ? 'weekly' : 'monthly';
    const priority = route === '/' ? 1.0 : route.startsWith('/blog/') ? 0.7 : 0.85;

    // The English home page canonicalises to /en, so do not emit /en/ here —
    // that URL 308-redirects and would put a non-canonical address in the sitemap.
    const enSlug = routing.pathnames[route].en || route;
    push(`${baseUrl}/en${enSlug === '/' ? '' : enSlug}`, changeFrequency, priority);

    const plSlug = routing.pathnames[route].pl || route;
    push(`${baseUrl}${plSlug === '/' ? '/' : plSlug}`, changeFrequency, priority);
  });

  return allRoutes;
}
