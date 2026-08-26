import { routing } from '../i18n/routing';
import { blogPosts } from '../lib/blogPosts';

export default function sitemap() {
  const baseUrl = 'https://www.ai-seo-company.pl';
  // Realne daty zamiast chwili requestu: identyczny, dynamiczny lastmod
  // na 49 wpisach czynil sygnal bezwartosciowym dla Google (audyt 24.08).
  const STATIC_LASTMOD = '2026-08-24';

  const allRoutes = [];
  const seen = new Set();

  const push = (url, changeFrequency, priority, lastModified = STATIC_LASTMOD) => {
    if (seen.has(url)) return;
    seen.add(url);
    allRoutes.push({ url, lastModified, changeFrequency, priority });
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
