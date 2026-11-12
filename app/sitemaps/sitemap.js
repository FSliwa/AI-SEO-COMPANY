import { niepusteSegmenty, wpisySegmentu } from '@/lib/sitemapEntries';

// T0.7: sitemapy segmentowane (playbook 4.2: diagnoza pokrycia indeksu per sekcja w GSC).
// Adresy: /sitemaps/sitemap/<segment>.xml (lista segmentów: SEGMENTY w lib/sitemapEntries.js).
// Plik NIE może leżeć w app/sitemap.js: Next 16 zgłasza wtedy "Conflicting route and metadata
// at /sitemap.xml" z trasą indeksu (sprawdzone buildem 4.11.2026).
// Indeks pod /sitemap.xml: app/sitemap.xml/route.js. Wpisy i daty: lib/sitemapEntries.js,
// lib/lastmod.json (npm run wydanie, scripts/sitemap/README.md). Wpis bez daty = bez <lastmod>.
export async function generateSitemaps() {
  return niepusteSegmenty().map(({ id }) => ({ id }));
}

// Next 16: id przychodzi jako Promise<string>.
export default async function sitemap({ id }) {
  return wpisySegmentu(await id);
}
