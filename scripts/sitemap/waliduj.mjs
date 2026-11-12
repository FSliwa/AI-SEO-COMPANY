// Walidacja sitemap według protokołu sitemaps.org 0.9 (https://www.sitemaps.org/protocol.html).
// Bez zależności: reguły protokołu sprawdzane w kodzie, a jeśli w systemie jest xmllint (macOS: tak),
// dodatkowo walidacja schematem XSD z scripts/sitemap/xsd/ (przepisane schematy sitemaps.org).
//
// Użycie: node scripts/sitemap/waliduj.mjs [origin]
//   origin domyślnie https://www.ai-seo-company.pl; lokalnie np. http://127.0.0.1:3217
//   (adresy w sitemapie zostają produkcyjne, pobieranie idzie na origin).
import { execFileSync } from 'node:child_process';
import { mkdtempSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PROD, naOrigin, pobierz, dekodujXml } from './wspolne.mjs';

const NS = 'http://www.sitemaps.org/schemas/sitemap/0.9';
const MAX_URL = 50000;
const MAX_BAJTOW = 50 * 1024 * 1024;
// W3C Datetime (profil ISO 8601 z protokołu): RRRR, RRRR-MM, RRRR-MM-DD albo z godziną i strefą.
const W3C = /^\d{4}(-(0[1-9]|1[0-2])(-(0[1-9]|[12]\d|3[01])(T([01]\d|2[0-3]):[0-5]\d(:[0-5]\d(\.\d+)?)?(Z|[+-]([01]\d|2[0-3]):[0-5]\d))?)?)?$/;
const CHANGEFREQ = new Set(['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']);
const XSD = join(dirname(fileURLToPath(import.meta.url)), 'xsd');

function wspolne(xml, korzen, bledy) {
  if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) bledy.push('brak deklaracji <?xml version="1.0" encoding="UTF-8"?> na początku pliku');
  if (Buffer.byteLength(xml, 'utf8') > MAX_BAJTOW) bledy.push('plik większy niż 50 MB (protokół: limit przed kompresją)');
  const otwarcie = new RegExp(`<${korzen}\\s+xmlns="([^"]+)"[^>]*>`).exec(xml);
  if (!otwarcie) bledy.push(`brak elementu głównego <${korzen} xmlns="...">`);
  else if (otwarcie[1] !== NS) bledy.push(`przestrzeń nazw ${otwarcie[1]} zamiast ${NS}`);
  if (!new RegExp(`</${korzen}>\\s*$`).test(xml)) bledy.push(`brak zamknięcia </${korzen}> na końcu pliku`);
  // Nieucieczone znaki: & poza encjami i < w treści elementów.
  if (/&(?!(amp|lt|gt|quot|apos|#\d+|#x[0-9a-f]+);)/i.test(xml)) bledy.push('nieucieczony znak & (protokół wymaga encji &amp;)');
}

function sprawdzLoc(loc, host, bledy, gdzie) {
  if (!loc) return bledy.push(`${gdzie}: pusty <loc>`);
  if (loc.length < 12 || loc.length > 2048) bledy.push(`${gdzie}: <loc> ma ${loc.length} znaków (dozwolone 12-2048)`);
  let u;
  try {
    u = new URL(loc);
  } catch {
    return bledy.push(`${gdzie}: <loc> nie jest bezwzględnym adresem URL: ${loc}`);
  }
  if (!/^https?:$/.test(u.protocol)) bledy.push(`${gdzie}: protokół ${u.protocol} w ${loc}`);
  if (host && u.host !== host) bledy.push(`${gdzie}: inny host niż sitemapa (${u.host}): ${loc}`);
  if (u.hash) bledy.push(`${gdzie}: fragment # w ${loc}`);
}

/** Błędy pliku <urlset>; pusta lista = poprawny. */
export function walidujUrlset(xml, { host = new URL(PROD).host } = {}) {
  const bledy = [];
  wspolne(xml, 'urlset', bledy);
  const bloki = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map((m) => m[1]);
  if (!bloki.length) bledy.push('<urlset> bez ani jednego <url> (schemat wymaga co najmniej jednego)');
  if (bloki.length > MAX_URL) bledy.push(`${bloki.length} adresów (limit 50 000)`);
  const reszta = xml.replace(/<url>[\s\S]*?<\/url>/g, '').replace(/<\?xml[^>]*\?>/, '').replace(/<\/?urlset[^>]*>/g, '').trim();
  if (reszta) bledy.push(`nieznana treść poza <url>: ${reszta.slice(0, 80)}`);
  const widziane = new Set();
  bloki.forEach((b, i) => {
    const gdzie = `url #${i + 1}`;
    const elementy = [...b.matchAll(/<([a-zA-Z:]+)>([^<]*)<\/\1>/g)].map((m) => [m[1], m[2]]);
    const kolejnosc = elementy.map(([n]) => n);
    const dozwolone = ['loc', 'lastmod', 'changefreq', 'priority'];
    for (const n of kolejnosc) if (!dozwolone.includes(n)) bledy.push(`${gdzie}: nieznany element <${n}>`);
    const idx = kolejnosc.filter((n) => dozwolone.includes(n)).map((n) => dozwolone.indexOf(n));
    if (idx.some((v, k) => k && v <= idx[k - 1])) bledy.push(`${gdzie}: kolejność lub powtórzenie elementów (${kolejnosc.join(', ')}), schemat: loc, lastmod, changefreq, priority`);
    const pola = Object.fromEntries(elementy.map(([n, v]) => [n, dekodujXml(v.trim())]));
    if (kolejnosc[0] !== 'loc') bledy.push(`${gdzie}: pierwszy element musi być <loc>`);
    sprawdzLoc(pola.loc, host, bledy, gdzie);
    if (pola.loc && widziane.has(pola.loc)) bledy.push(`${gdzie}: duplikat ${pola.loc}`);
    widziane.add(pola.loc);
    if ('lastmod' in pola && !W3C.test(pola.lastmod)) bledy.push(`${gdzie}: <lastmod> ${pola.lastmod} nie jest datą W3C`);
    if ('changefreq' in pola && !CHANGEFREQ.has(pola.changefreq)) bledy.push(`${gdzie}: <changefreq> ${pola.changefreq}`);
    if ('priority' in pola && !(/^(0(\.\d+)?|1(\.0+)?)$/.test(pola.priority))) bledy.push(`${gdzie}: <priority> ${pola.priority} poza 0.0-1.0`);
  });
  return bledy;
}

/** Błędy indeksu <sitemapindex>; pusta lista = poprawny. */
export function walidujIndeks(xml, { host = new URL(PROD).host } = {}) {
  const bledy = [];
  wspolne(xml, 'sitemapindex', bledy);
  const bloki = [...xml.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)].map((m) => m[1]);
  if (!bloki.length) bledy.push('<sitemapindex> bez ani jednego <sitemap>');
  if (bloki.length > MAX_URL) bledy.push(`${bloki.length} sitemap w indeksie (limit 50 000)`);
  const reszta = xml.replace(/<sitemap>[\s\S]*?<\/sitemap>/g, '').replace(/<\?xml[^>]*\?>/, '').replace(/<\/?sitemapindex[^>]*>/g, '').trim();
  if (reszta) bledy.push(`nieznana treść poza <sitemap>: ${reszta.slice(0, 80)}`);
  bloki.forEach((b, i) => {
    const gdzie = `sitemap #${i + 1}`;
    const elementy = [...b.matchAll(/<([a-zA-Z:]+)>([^<]*)<\/\1>/g)].map((m) => [m[1], dekodujXml(m[2].trim())]);
    const nazwy = elementy.map(([n]) => n).join(',');
    if (nazwy !== 'loc' && nazwy !== 'loc,lastmod') bledy.push(`${gdzie}: elementy ${nazwy} (schemat: loc, opcjonalnie lastmod)`);
    const pola = Object.fromEntries(elementy);
    sprawdzLoc(pola.loc, host, bledy, gdzie);
    if ('lastmod' in pola && !W3C.test(pola.lastmod)) bledy.push(`${gdzie}: <lastmod> ${pola.lastmod} nie jest datą W3C`);
  });
  return bledy;
}

/** Walidacja schematem XSD przez xmllint; null = xmllint niedostępny. */
export function walidujXsd(xml, schemat) {
  const plikXsd = join(XSD, schemat);
  if (!existsSync(plikXsd)) return null;
  try {
    execFileSync('xmllint', ['--version'], { stdio: 'ignore' });
  } catch {
    return null;
  }
  const kat = mkdtempSync(join(tmpdir(), 'sitemapa-'));
  const plik = join(kat, 'sitemap.xml');
  writeFileSync(plik, xml);
  try {
    execFileSync('xmllint', ['--noout', '--nonet', '--schema', plikXsd, plik], { stdio: 'pipe' });
    return [];
  } catch (e) {
    return String(e.stderr || e.message).split('\n').filter((l) => l && !/validates$/.test(l)).map((l) => l.replace(plik, 'sitemap.xml'));
  } finally {
    rmSync(kat, { recursive: true, force: true });
  }
}

/** Pełna walidacja sitemapy spod `origin`: indeks, każdy segment, lastmod indeksu = max segmentu. */
export async function walidujSerwis(origin) {
  const bledy = [];
  const idx = await pobierz(`${origin}/sitemap.xml`);
  if (idx.status !== 200) return [`/sitemap.xml: HTTP ${idx.status}`];
  const typ = idx.headers.get('content-type') || '';
  if (!/xml/.test(typ)) bledy.push(`/sitemap.xml: Content-Type ${typ}`);
  for (const b of walidujIndeks(idx.body)) bledy.push(`/sitemap.xml: ${b}`);
  for (const b of walidujXsd(idx.body, 'siteindex.xsd') || []) bledy.push(`/sitemap.xml (XSD): ${b}`);
  let adresow = 0;
  for (const [, blok] of idx.body.matchAll(/<sitemap>([\s\S]*?)<\/sitemap>/g)) {
    const loc = dekodujXml((/<loc>([^<]*)<\/loc>/.exec(blok) || [])[1] || '');
    const lastmodIdx = (/<lastmod>([^<]*)<\/lastmod>/.exec(blok) || [])[1];
    const nazwa = loc.replace(PROD, '');
    const r = await pobierz(naOrigin(loc, origin));
    if (r.status !== 200) {
      bledy.push(`${nazwa}: HTTP ${r.status}`);
      continue;
    }
    for (const b of walidujUrlset(r.body)) bledy.push(`${nazwa}: ${b}`);
    for (const b of walidujXsd(r.body, 'sitemap.xsd') || []) bledy.push(`${nazwa} (XSD): ${b}`);
    const daty = [...r.body.matchAll(/<lastmod>([^<]*)<\/lastmod>/g)].map((m) => m[1]).sort();
    adresow += [...r.body.matchAll(/<url>/g)].length;
    const max = daty[daty.length - 1];
    if ((max || null) !== (lastmodIdx || null)) bledy.push(`${nazwa}: lastmod w indeksie ${lastmodIdx} ≠ najnowszy lastmod segmentu ${max}`);
  }
  return { bledy, adresow, xsd: walidujXsd('<?xml version="1.0" encoding="UTF-8"?>\n<x/>', 'sitemap.xsd') !== null };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const origin = process.argv[2] || PROD;
  const wynik = await walidujSerwis(origin);
  const bledy = Array.isArray(wynik) ? wynik : wynik.bledy;
  if (bledy.length) {
    console.error(`Sitemapa NIEPOPRAWNA (${bledy.length}):\n- ${bledy.join('\n- ')}`);
    process.exit(1);
  }
  console.log(`Sitemapa poprawna: ${wynik.adresow} adresów, protokół sitemaps.org 0.9${wynik.xsd ? ' + schemat XSD (xmllint)' : ' (xmllint niedostępny: bez XSD)'}.`);
}
