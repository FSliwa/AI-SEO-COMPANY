// Walidator sitemap (scripts/sitemap/waliduj.mjs): reguły protokołu i schemat XSD (jeśli jest xmllint).
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { walidujIndeks, walidujUrlset, walidujXsd } from './waliduj.mjs';

const naglowek = '<?xml version="1.0" encoding="UTF-8"?>\n';
const urlset = (wnetrze) => `${naglowek}<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${wnetrze}</urlset>\n`;
const poprawny = urlset('<url>\n<loc>https://www.ai-seo-company.pl/</loc>\n<lastmod>2026-11-11</lastmod>\n</url>\n<url>\n<loc>https://www.ai-seo-company.pl/nowa</loc>\n</url>\n');

test('poprawny urlset (także wpis bez lastmod) przechodzi reguły i XSD', () => {
  assert.deepEqual(walidujUrlset(poprawny), []);
  const xsd = walidujXsd(poprawny, 'sitemap.xsd');
  if (xsd !== null) assert.deepEqual(xsd, []);
});

test('błędy: zła data, duplikat, obcy host, nieucieczony &, kolejność', () => {
  const zly = urlset([
    '<url><loc>https://www.ai-seo-company.pl/a</loc><lastmod>2026-13-01</lastmod></url>',
    '<url><loc>https://www.ai-seo-company.pl/a</loc></url>',
    '<url><loc>https://inna.pl/b</loc></url>',
    '<url><loc>https://www.ai-seo-company.pl/c?x=1&y=2</loc></url>',
    '<url><lastmod>2026-11-01</lastmod><loc>https://www.ai-seo-company.pl/d</loc></url>',
  ].join('\n'));
  const b = walidujUrlset(zly).join('\n');
  assert.match(b, /nie jest datą W3C/);
  assert.match(b, /duplikat/);
  assert.match(b, /inny host/);
  assert.match(b, /nieucieczony znak &/);
  assert.match(b, /kolejność/);
  const xsd = walidujXsd(zly, 'sitemap.xsd');
  if (xsd !== null) assert.ok(xsd.length > 0);
});

test('indeks: loc + opcjonalny lastmod', () => {
  const idx = `${naglowek}<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n<sitemap><loc>https://www.ai-seo-company.pl/sitemaps/sitemap/strony-pl.xml</loc><lastmod>2026-11-11</lastmod></sitemap>\n<sitemap><loc>https://www.ai-seo-company.pl/sitemaps/sitemap/nowy.xml</loc></sitemap>\n</sitemapindex>\n`;
  assert.deepEqual(walidujIndeks(idx), []);
  const xsd = walidujXsd(idx, 'siteindex.xsd');
  if (xsd !== null) assert.deepEqual(xsd, []);
  assert.match(walidujIndeks(idx.replace('2026-11-11', 'wczoraj')).join(), /W3C/);
});
