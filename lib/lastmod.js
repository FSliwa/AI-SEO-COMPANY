// Daty stron: cienka warstwa nad lib/lastmod.json (jedyne źródło dat od 11.11.2026).
// DATY USTAWIA `npm run wydanie` (scripts/sitemap/wydanie.mjs), NIE EDYTOWAĆ RĘCZNIE ani tego
// pliku, ani lib/lastmod.json. Procedura wydania, reguły odcisku treści i historia dat sprzed
// automatu: scripts/sitemap/README.md.
//
// Bez importów poza JSON-em: czyta go także components/Byline.jsx (komponent kliencki), więc
// import nie wciąga lib/blogPosts.js do bundla klienta.
//
// Każdy adres ma trzy daty (RRRR-MM-DD, Europe/Warsaw):
//   lastmod  - ostatnia istotna zmiana strony: tekst, linki, obrazy z opisem, JSON-LD, title,
//              description, canonical, hreflang (sitemapa, IndexNow);
//   tresc    - ostatnia zmiana tekstu lub tytułu (zawsze <= lastmod), do podpisu „aktualizacja”
//              i JSON-LD dateModified, gdy konsumenci przejdą na dataTresci();
//   pierwszy - dzień pierwszej publikacji (jeśli znany), do datePublished nowych stron.
// Nie liczą się elementy wspólne całego serwisu (Header, Footer, Contact, baner, JSON-LD WebSite
// z layoutu, wszystko z atrybutem data-lastmod="pomin"), daty, CSS i typografia.
// Klucz = pełny URL dokładnie jak w sitemapie ('/' na końcu tylko dla strony głównej PL).
import dane from './lastmod.json';

const ADRESY = dane.adresy;

/** Ostatnie wydanie: { data, zmienione: [url], usuniete: [url] } (cron IndexNow). */
export const WYDANIE = dane._wydanie;

/** url -> lastmod (zgodność wstecz: sitemapa, Byline, dateModified w artykułach). */
export const LASTMOD = Object.fromEntries(Object.entries(ADRESY).map(([url, d]) => [url, d.lastmod]));

/** { lastmod, tresc, pierwszy? } albo null dla adresu bez wpisu (np. strona przed wydaniem). */
export function datyStrony(url) {
  return ADRESY[url] ?? null;
}

/** Data ostatniej zmiany treści (podpis, dateModified) albo undefined. */
export function dataTresci(url) {
  const d = ADRESY[url];
  return d ? d.tresc || d.lastmod : undefined;
}

/** Dzień pierwszej publikacji albo undefined. */
export function pierwszaPublikacja(url) {
  return ADRESY[url]?.pierwszy;
}
