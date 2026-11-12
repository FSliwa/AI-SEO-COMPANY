// node --test "scripts/sitemap/*.test.mjs" (npm run test:sitemap). Bez sieci i bez buildu.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { odcisk, roznice } from './odcisk.mjs';

const ld = (o, attrs = '') => `<script type="application/ld+json"${attrs}>${JSON.stringify(o)}</script>`;
const strona = ({ title = 'Tytuł', head = '', main = '', przed = '', jsonld = '' } = {}) => `<!DOCTYPE html><html lang="pl"><head><title>${title}</title>
<meta name="description" content="Opis strony"/><link rel="canonical" href="https://www.ai-seo-company.pl/x"/>${head}</head><body>
${jsonld}<main>${przed}<header id="header"><nav><a href="/menu">Menu</a></nav></header>
<div id="menu-glowne"><a href="/oferta">Oferta</a></div>
<h1>Nagłówek</h1><p class="byline">Opracował: Filip · aktualizacja: <time dateTime="2026-11-06">6 listopada 2026</time></p>
<p>Akapit treści — z myślnikiem i&nbsp;twardą spacją.</p><a href="/kontakt">Kontakt</a>
<img src="/obraz.webp" alt="Wykres pozycji"/><img src="/tlo.webp" alt=""/>
${main}<section class="contact"><p>Zadzwoń 123</p></section><footer class="footer"><a href="/rodo">RODO</a></footer></main></body></html>`;

const baza = odcisk(strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }));

test('zmiana samej daty (podpis, JSON-LD) nie zmienia odcisku', () => {
  const html = strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-12', datePublished: '2026-08-01' }) })
    .replace('2026-11-06">6 listopada', '2026-11-12">12 listopada');
  const o = odcisk(html);
  assert.equal(o.h, baza.h);
  assert.equal(o.ht, baza.ht);
});

test('typografia (– zamiast —, zwykła spacja zamiast &nbsp;) nie zmienia odcisku', () => {
  const o = odcisk(strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }).replace('—', '–').replace('i&nbsp;twardą', 'i twardą'));
  assert.equal(o.h, baza.h);
});

test('elementy wspólne (nagłówek, menu, stopka, kontakt, data-lastmod="pomin") nie zmieniają odcisku', () => {
  const html = strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) })
    .replace('<a href="/menu">Menu</a>', '<a href="/nowe-menu">Nowe menu</a>')
    .replace('<a href="/oferta">Oferta</a>', '<a href="/oferta">Oferta</a><a href="/en/tools">Tools</a>')
    .replace('Zadzwoń 123', 'Zadzwoń 456')
    .replace('<a href="/rodo">RODO</a>', '<a href="/cookies">Cookies</a>')
    .replace('<h1>', '<div data-lastmod="pomin"><p>Baner promocji do 30.11</p><a href="/promo">x</a></div><h1>');
  const o = odcisk(html + ld({ '@type': 'Organization', name: 'x' }, ' data-lastmod="pomin"'));
  assert.equal(o.h, baza.h);
});

test('JSON-LD WebSite z layoutu nie liczy się', () => {
  const html = strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) + ld({ '@graph': [{ '@type': 'WebSite', name: 'Nowa nazwa' }] }) });
  assert.equal(odcisk(html).h, baza.h);
});

test('nowy akapit w <main> zmienia h i ht', () => {
  const o = odcisk(strona({ main: '<p>Nowy akapit.</p>', jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }));
  assert.notEqual(o.h, baza.h);
  assert.notEqual(o.ht, baza.ht);
  assert.deepEqual(roznice(baza, o), ['tekst']);
});

test('nowy cel linku przy tym samym tekście: inny h, ten sam ht', () => {
  const o = odcisk(strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }).replace('href="/kontakt"', 'href="/kontakt-nowy"'));
  assert.notEqual(o.h, baza.h);
  assert.equal(o.ht, baza.ht);
  assert.deepEqual(roznice(baza, o), ['linki']);
});

test('zmiana ceny w JSON-LD: inny h, ten sam ht', () => {
  const o = odcisk(strona({ jsonld: ld({ '@type': 'Article', headline: 'A', offers: { price: 990 }, dateModified: '2026-11-06', datePublished: '2026-08-01' }) }));
  assert.notEqual(o.h, baza.h);
  assert.equal(o.ht, baza.ht);
  assert.deepEqual(roznice(baza, o), ['ld']);
});

test('obraz dekoracyjny (alt="") podmieniony: ten sam odcisk; obraz z opisem: inny h', () => {
  const html = strona({ jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) });
  assert.equal(odcisk(html.replace('/tlo.webp', '/tlo-v2.webp')).h, baza.h);
  const o = odcisk(html.replace('/obraz.webp', '/obraz-v2.webp'));
  assert.notEqual(o.h, baza.h);
  assert.deepEqual(roznice(baza, o), ['obrazy']);
});

test('zmiana hreflang: inny h, ten sam ht', () => {
  const o = odcisk(strona({ head: '<link rel="alternate" hreflang="en" href="https://www.ai-seo-company.pl/en/x"/>', jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }));
  assert.notEqual(o.h, baza.h);
  assert.equal(o.ht, baza.ht);
  assert.deepEqual(roznice(baza, o), ['glowa']);
});

test('zmiana title zmienia h i ht', () => {
  const o = odcisk(strona({ title: 'Nowy tytuł', jsonld: ld({ '@type': 'Article', headline: 'A', dateModified: '2026-11-06', datePublished: '2026-08-01' }) }));
  assert.notEqual(o.h, baza.h);
  assert.notEqual(o.ht, baza.ht);
});
