import { BASE_URL, locXml, niepusteSegmenty } from '@/lib/sitemapEntries';

// Indeks sitemap pod dotychczasowym adresem /sitemap.xml. generateSitemaps w Next 16
// NIE tworzy indeksu, a bez tej trasy /sitemap.xml zwracałby 404 (adres zgłoszony w GSC,
// w robots.txt i w scripts/indexnow.mjs). Statyczny przy buildzie jak reszta serwisu.
// lastmod segmentu = najnowszy lastmod jego wpisów; segment bez dat dostaje wpis bez <lastmod>.
// Walidacja (protokół sitemaps.org + XSD): node scripts/sitemap/waliduj.mjs <origin>.
export const dynamic = 'force-static';

export function GET() {
  const pozycje = niepusteSegmenty()
    .map(({ id, lastmod }) => `<sitemap><loc>${locXml(`${BASE_URL}/sitemaps/sitemap/${id}.xml`)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ''}</sitemap>`)
    .join('\n');
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pozycje}\n</sitemapindex>\n`;
  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
