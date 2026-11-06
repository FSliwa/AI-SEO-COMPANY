import { niepusteSegmenty, wpisySegmentu } from '@/lib/sitemapEntries';

// T0.7: sitemapy segmentowane (playbook 4.2: diagnoza pokrycia indeksu per sekcja w GSC).
// Adresy: /sitemaps/sitemap/strony-pl.xml, /sitemaps/sitemap/strony-en.xml, /sitemaps/sitemap/blog-pl.xml,
// /sitemaps/sitemap/blog-en.xml. Plik NIE moze lezec w app/sitemap.js: Next 16 zglasza wtedy
// "Conflicting route and metadata at /sitemap.xml" z trasa indeksu (sprawdzone buildem 4.11.2026).
// Indeks pod /sitemap.xml: app/sitemap.xml/route.js. Reguly lastmod: lib/sitemapEntries.js.
export async function generateSitemaps() {
  return niepusteSegmenty().map(({ id }) => ({ id }));
}

// Next 16: id przychodzi jako Promise<string>.
export default async function sitemap({ id }) {
  return wpisySegmentu(await id);
}
