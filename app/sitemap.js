export default function sitemap() {
  const baseUrl = 'https://www.ai-seo-company.pl';
  const currentDate = new Date().toISOString();

  const routes = [
    '',
    '/pozycjonowanie-stron-internetowych',
    '/audyt-seo',
    '/projektowanie-stron-internetowych',
    '/seo-lokalne-warszawa',
    '/blog',
    '/blog/biblioteka',
    '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista',
    '/blog/core-web-vitals-a-pozycje-google',
    '/blog/seo-lokalne-dla-firm-w-warszawie',
    '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
    '/cennik-pozycjonowania',
    '/o-nas',
    '/cookies'
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: route === '' || route.startsWith('/blog') ? 'weekly' : 'monthly',
    priority: route === '' ? 1.0 : route.startsWith('/blog/') ? 0.7 : 0.85,
  }));
}
