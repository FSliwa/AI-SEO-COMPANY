import { routing } from '../i18n/routing';

export default function sitemap() {
  const baseUrl = 'https://www.ai-seo-company.pl';
  const currentDate = new Date().toISOString();

  // We use the keys from routing.pathnames as our base routes
  const routes = Object.keys(routing.pathnames);

  const allRoutes = [];
  
  routes.forEach(route => {
    // English version
    const enSlug = routing.pathnames[route].en || route;
    allRoutes.push({
      url: `${baseUrl}/en${enSlug === '/' ? '' : enSlug}`,
      lastModified: currentDate,
      changeFrequency: route === '/' || route.startsWith('/blog') ? 'weekly' : 'monthly',
      priority: route === '/' ? 1.0 : route.startsWith('/blog/') ? 0.7 : 0.85,
    });
    // Polish version
    const plSlug = routing.pathnames[route].pl || route;
    allRoutes.push({
      url: `${baseUrl}${plSlug === '/' ? '' : plSlug}`,
      lastModified: currentDate,
      changeFrequency: route === '/' || route.startsWith('/blog') ? 'weekly' : 'monthly',
      priority: route === '/' ? 1.0 : route.startsWith('/blog/') ? 0.7 : 0.85,
    });
  });

  return allRoutes;
}
