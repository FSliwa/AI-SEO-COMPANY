// IndexNow: ręczne zgłoszenie adresów do Bing (i innych wyszukiwarek IndexNow). Etap 0 planu z filmu
// (T0.4), 4.11.2026. Od 11.11.2026 zgłoszenie po każdym wydaniu robi samo cron Vercel
// (app/api/cron/indexnow/route.js, scripts/sitemap/README.md); ten skrypt zostaje do zgłoszeń ręcznych.
// Klucz, host i wysyłka: scripts/sitemap/indexnow-klient.mjs (wspólne z cronem).
//
// Użycie (po wdrożeniu, gdy nowe treści są już na produkcji):
//   node scripts/indexnow.mjs https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai https://www.ai-seo-company.pl/pozycjonowanie-w-ai
//   node scripts/indexnow.mjs --lastmod 2026-11-05   (wszystkie adresy z sitemapy produkcji z tym lastmod)
//   node scripts/indexnow.mjs --wydanie              (adresy z ostatniego wydania: lib/lastmod.json -> _wydanie)
// Bez flagi --wyslij skrypt tylko wypisuje listę (próba na sucho).
import { readFileSync } from 'node:fs';
import { HOST, KEY, KEY_LOCATION, adresySerwisu, zglos } from './sitemap/indexnow-klient.mjs';

const args = process.argv.slice(2);
const wyslij = args.includes('--wyslij');
let urls = args.filter((a) => a.startsWith('https://'));

// /sitemap.xml jest od T0.7 indeksem (<sitemapindex>) - schodzimy do sitemap segmentów.
// Zwykła sitemapa (<urlset>) działa jak wcześniej. SITEMAP_URL / SITEMAP_BASE tylko do testu lokalnego.
async function wpisyZSitemapy(adres, glebokosc = 0) {
  const xml = await (await fetch(adres)).text();
  if (xml.includes('<sitemapindex') && glebokosc === 0) {
    const dzieci = [...xml.matchAll(/<sitemap>\s*<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    return (await Promise.all(dzieci.map((d) => wpisyZSitemapy(process.env.SITEMAP_BASE ? d.replace(`https://${HOST}`, process.env.SITEMAP_BASE) : d, 1)))).flat();
  }
  // <lastmod> jest opcjonalny (adres bez wpisu w lib/lastmod.json nie ma daty).
  return [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, blok]) => ({
    loc: (/<loc>([^<]+)<\/loc>/.exec(blok) || [])[1],
    lastmod: (/<lastmod>([^<]+)<\/lastmod>/.exec(blok) || [])[1] || '',
  }));
}

const i = args.indexOf('--lastmod');
if (i !== -1) {
  const dzien = args[i + 1];
  const wpisy = await wpisyZSitemapy(process.env.SITEMAP_URL || `https://${HOST}/sitemap.xml`);
  for (const { loc, lastmod } of wpisy) if (lastmod.startsWith(dzien)) urls.push(loc);
}

if (args.includes('--wydanie')) {
  const { _wydanie: w } = JSON.parse(readFileSync(new URL('../lib/lastmod.json', import.meta.url), 'utf8'));
  console.error(`Wydanie ${w?.data ?? 'brak'}: ${w?.zmienione?.length ?? 0} zmienionych, ${w?.usuniete?.length ?? 0} usuniętych.`);
  urls.push(...(w?.zmienione || []), ...(w?.usuniete || []));
}

urls = adresySerwisu(urls);
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

const wynik = await zglos(urls);
console.log(`IndexNow: HTTP ${wynik.status} (${wynik.zgloszono} adresów)`);
process.exit(wynik.ok ? 0 : 1);
