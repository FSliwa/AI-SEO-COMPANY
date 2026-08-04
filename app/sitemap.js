import { routing } from '../i18n/routing';
import { blogPosts } from '../lib/blogPosts';

export default function sitemap() {
  const baseUrl = 'https://www.ai-seo-company.pl';
  const currentDate = new Date().toISOString();

  const allRoutes = [];
  const seen = new Set();

  const push = (url, changeFrequency, priority) => {
    if (seen.has(url)) return;
    seen.add(url);
    allRoutes.push({ url, lastModified: currentDate, changeFrequency, priority });
  };

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

  // blogPosts is the source of truth for articles. routing.pathnames only carries
  // the posts that needed a localised slug, so deriving article URLs from it alone
  // silently drops every new one — keep both sources in play.
  blogPosts.forEach(post => {
    const mapped = routing.pathnames[post.slug];
    push(`${baseUrl}${(mapped && mapped.pl) || post.slug}`, 'weekly', 0.7);

    // Polish-only posts have no English page to advertise.
    if (!post.plOnly) {
      push(`${baseUrl}/en${(mapped && mapped.en) || post.slug}`, 'weekly', 0.7);
    }
  });

  return allRoutes;
}
