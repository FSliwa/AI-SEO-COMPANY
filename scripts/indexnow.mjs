// IndexNow: zgłoszenie zmienionych adresów do Bing (i innych wyszukiwarek IndexNow)
// zaraz po wdrożeniu produkcyjnym. Etap 0 planu z filmu (T0.4), 4.11.2026.
//
// Klucz IndexNow jest publiczny z założenia: leży w public/4741be50b9cf74fd0720fcdf60f9e624.txt i każdy może go
// odczytać. Wyszukiwarka sprawdza, czy plik pod keyLocation zawiera ten sam klucz.
//
// Użycie (po wdrożeniu, gdy nowe treści są już na produkcji):
//   node scripts/indexnow.mjs https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai https://www.ai-seo-company.pl/pozycjonowanie-w-ai
//   node scripts/indexnow.mjs --lastmod 2026-11-05   (wszystkie adresy z sitemapy z tym lastmod)
// Bez flagi --wyslij skrypt tylko wypisuje listę (próba na sucho).

const HOST = 'www.ai-seo-company.pl';
const KEY = '4741be50b9cf74fd0720fcdf60f9e624';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const args = process.argv.slice(2);
const wyslij = args.includes('--wyslij');
let urls = args.filter((a) => a.startsWith('https://'));

// /sitemap.xml jest od T0.7 indeksem (<sitemapindex>) - schodzimy do sitemap segmentow.
// Zwykla sitemapa (<urlset>) dziala jak wczesniej. SITEMAP_URL tylko do testu lokalnego.
async function wpisyZSitemapy(adres, glebokosc = 0) {
  const xml = await (await fetch(adres)).text();
  if (xml.includes('<sitemapindex') && glebokosc === 0) {
    const dzieci = [...xml.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return (await Promise.all(dzieci.map((d) => wpisyZSitemapy(process.env.SITEMAP_BASE ? d.replace(`https://${HOST}`, process.env.SITEMAP_BASE) : d, 1)))).flat();
  }
  return [...xml.matchAll(/<url>\s*<loc>([^<]+)<\/loc>\s*<lastmod>([^<]+)<\/lastmod>/g)].map(([, loc, lastmod]) => ({ loc, lastmod }));
}

const i = args.indexOf('--lastmod');
if (i !== -1) {
  const dzien = args[i + 1];
  const wpisy = await wpisyZSitemapy(process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`);
  for (const { loc, lastmod } of wpisy) if (lastmod.startsWith(dzien)) urls.push(loc);
}

urls = [...new Set(urls)].filter((u) => new URL(u).host === HOST);
if (!urls.length) {
  console.error('Brak adresów do zgłoszenia.');
  process.exit(2);
}
console.log(urls.join('\n'));

const plik = await fetch(KEY_LOCATION);
if (!plik.ok || (await plik.text()).trim() !== KEY) {
  console.error(`Plik klucza ${KEY_LOCATION} nie odpowiada kluczowi. Najpierw wdrożenie.`);
  process.exit(3);
}

if (!wyslij) {
  console.log(`\nPróba na sucho: ${urls.length} adresów. Dodaj --wyslij, żeby zgłosić.`);
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList: urls }),
});
console.log(`IndexNow: HTTP ${res.status}`);
process.exit(res.ok ? 0 : 1);
