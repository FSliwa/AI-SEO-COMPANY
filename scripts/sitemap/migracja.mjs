// Jednorazowa migracja: obiekt LASTMOD z dawnego lib/lastmod.js -> lib/lastmod.json.
// Uruchomiona 11.11.2026; zostaje w repo jako zapis, skąd wzięły się daty startowe.
//
// Użycie: node scripts/sitemap/migracja.mjs [--z-pliku <stary lastmod.js>] [--baza <origin>] [--sucho]
//   --z-pliku  domyślnie `git show HEAD:lib/lastmod.js` (wersja sprzed migracji)
//   --baza     skąd brać HTML do dat tresc/pierwszy (domyślnie produkcja)
//   --sucho    tylko wypisuje wynik, bez zapisu lib/lastmod.json
//
// Reguły (projekt: audyt sitemapy 11.11.2026, 3.8):
// - lastmod = wartość z LASTMOD, z korektą 15 adresów EN za nowych (KOREKTY niżej: na produkcji
//   zmieniło się tam 11.11 tylko menu nagłówka, a nagłówek jest elementem wspólnym). Żadna data
//   nie przesuwa się do przodu, więc nic nie dostaje „dzisiaj” bez zmiany treści;
// - tresc = data z podpisu (<time> w p.byline) albo JSON-LD dateModified strony, jeśli wcześniejsza
//   niż lastmod; inaczej tresc = lastmod;
// - pierwszy = JSON-LD datePublished strony (artykuły, porównania, szablony), jeśli jest.
import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { argumenty, czytajSitemape, naOrigin, pobierz, PROD, rownolegle } from './wspolne.mjs';
import { serializuj, wpis } from './daty.mjs';

const { flagi, wartosci } = argumenty(process.argv.slice(2));
const KATALOG = process.cwd();
const BAZA = wartosci.baza || PROD;

// Weryfikacja odciskiem trzech wdrożeń (4.11, 6.11, 11.11): realna ostatnia zmiana tych adresów.
const P = 'https://www.ai-seo-company.pl';
export const KOREKTY = {
  ...Object.fromEntries([
    'b2b-link-building-strategies-checklist', 'best-marketing-attribution-tools-for-2026', 'brand-storytelling-patterns',
    'content-gap-analysis', 'core-web-vitals-google-rankings', 'how-much-does-a-business-website-cost-pricing',
    'how-to-get-google-reviews', 'multi-location-seo-scale-local-visibility', 'seo-competitor-analysis-step-by-step-guide',
    'seo-for-saas-startups-playbook', 'technical-seo-audit-checklist', 'ux-audit-guide', 'vwo-vs-optimizely-porownanie',
  ].map((s) => [`${P}/en/blog/${s}`, '2026-11-06'])),
  [`${P}/en/blog/canonical-tag-seo-guide-2026`]: '2026-09-26',
  [`${P}/en/client-portal`]: '2026-11-04',
};

async function staryLastmod() {
  const zrodlo = wartosci['z-pliku']
    ? readFileSync(wartosci['z-pliku'], 'utf8')
    : execFileSync('git', ['show', 'HEAD:lib/lastmod.js'], { cwd: KATALOG, encoding: 'utf8' });
  const kat = mkdtempSync(join(tmpdir(), 'lastmod-'));
  try {
    const plik = join(kat, 'stary.mjs');
    writeFileSync(plik, zrodlo);
    return (await import(plik)).LASTMOD;
  } finally {
    rmSync(kat, { recursive: true, force: true });
  }
}

/** Daty z HTML-a strony: podpis (<time> w p.byline), dateModified i datePublished z JSON-LD strony. */
export function datyZHtml(html) {
  const byline = /<p\b[^>]*class="[^"]*\bbyline\b[^"]*"[^>]*>[\s\S]*?<time[^>]*dateTime="(\d{4}-\d{2}-\d{2})/i.exec(html)
    || /<p\b[^>]*class="[^"]*\bbyline\b[^"]*"[^>]*>[\s\S]*?<time[^>]*datetime="(\d{4}-\d{2}-\d{2})/i.exec(html);
  const zmiany = [];
  const publikacje = [];
  for (const [, atrybuty, json] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/application\/ld\+json/i.test(atrybuty)) continue;
    let j;
    try {
      j = JSON.parse(json);
    } catch {
      continue;
    }
    if (Array.isArray(j?.['@graph']) && j['@graph'].some((x) => x?.['@type'] === 'WebSite')) continue;
    const zbierz = (x) => {
      if (Array.isArray(x)) return x.forEach(zbierz);
      if (!x || typeof x !== 'object') return;
      if (typeof x.dateModified === 'string') zmiany.push(x.dateModified.slice(0, 10));
      if (typeof x.datePublished === 'string') publikacje.push(x.datePublished.slice(0, 10));
      Object.values(x).forEach(zbierz);
    };
    zbierz(j);
  }
  return { podpis: byline?.[1], dateModified: zmiany.sort().pop(), datePublished: publikacje.sort()[0] };
}

const LASTMOD = await staryLastmod();
const prod = await czytajSitemape(BAZA);
if (prod.status !== 200) throw new Error(`${BAZA}/sitemap.xml: HTTP ${prod.status}`);

const adresy = {};
const raport = [];
const urls = Object.keys(LASTMOD).sort();
await rownolegle(urls, async (url) => {
  const lastmod = KOREKTY[url] ?? LASTMOD[url];
  const r = await pobierz(naOrigin(url, BAZA));
  const d = r.status === 200 ? datyZHtml(r.body) : {};
  const kandydat = d.podpis || d.dateModified;
  const tresc = kandydat && kandydat < lastmod ? kandydat : lastmod;
  const pierwszy = d.datePublished && d.datePublished <= lastmod ? d.datePublished : undefined;
  adresy[url] = wpis(lastmod, tresc, pierwszy);
  raport.push({ url, status: r.status, stary: LASTMOD[url], ...adresy[url], korekta: KOREKTY[url] ? 'audyt 11.11' : '' });
});

// Kontrole: każdy adres z sitemapy bazy ma wpis, żadna data nie jest nowsza niż w sitemapie bazy.
const bledy = [];
for (const [url, lm] of prod.wpisy) {
  if (!adresy[url]) bledy.push(`brak wpisu dla ${url} (sitemapa bazy: ${lm})`);
  else if (lm && adresy[url].lastmod > lm) bledy.push(`${url}: ${adresy[url].lastmod} nowsze niż sitemapa bazy ${lm}`);
}
for (const url of Object.keys(adresy)) if (!prod.wpisy.has(url)) console.warn(`uwaga: ${url} jest w LASTMOD, ale nie w sitemapie bazy`);

raport.sort((a, b) => a.url.localeCompare(b.url));
const zmienioneLastmod = raport.filter((r) => r.lastmod !== r.stary);
const innaTresc = raport.filter((r) => r.tresc !== r.lastmod);
console.log(`Migracja: ${raport.length} adresów z LASTMOD, sitemapa bazy: ${prod.wpisy.size}.`);
console.log(`lastmod skorygowane (audyt 11.11): ${zmienioneLastmod.length}`);
for (const r of zmienioneLastmod) console.log(`  ${r.url}: ${r.stary} -> ${r.lastmod}`);
console.log(`tresc wcześniejsza niż lastmod: ${innaTresc.length}; z datą pierwszej publikacji: ${raport.filter((r) => r.pierwszy).length}`);
if (bledy.length) {
  console.error(`BŁĘDY:\n- ${bledy.join('\n- ')}`);
  process.exit(1);
}
if (wartosci.raport) writeFileSync(wartosci.raport, JSON.stringify(raport, null, 1));
const tekst = serializuj({ wydanie: { data: null, zmienione: [], usuniete: [] }, adresy });
if (flagi.has('sucho')) {
  console.log('\n--sucho: lib/lastmod.json bez zmian.');
} else {
  writeFileSync(join(KATALOG, 'lib', 'lastmod.json'), tekst);
  console.log('\nZapisano lib/lastmod.json.');
}
