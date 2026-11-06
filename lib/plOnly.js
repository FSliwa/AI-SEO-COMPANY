// Strony tylko po polsku (T1a; BL-01, SA-05, TS-06). Czysty ESM bez importów: sitemapa
// (lib/sitemapEntries.js), przełącznik języka (Header.jsx) i stopka (Footer.jsx) biorą listę
// stąd, żeby nie rozjechała się w trzech miejscach jak przed 5.11.2026.
//
// Zasada dla każdej strony tylko-PL: w i18n/routing.js wpis jako zwykły string (slug EN =
// slug PL), strona woła notFound() dla 'en' (lib/stronaPl.js) -> adres /en/... = 404 wprost,
// bez 307/308 (inaczej łatka T1 utrwala 308 -> 404). Adres EN nie trafia do sitemapy,
// hreflang i nawigacji EN.
//
// Artykuły jednojęzyczne obsługuje lib/blogPosts.js (plOnly / enOnly), nie ten plik.

export const PL_ONLY = new Set(['/sprawdz-widocznosc-w-ai', '/zmiana-agencji-seo']);

// Całe gałęzie tylko-PL. Prefiks bez końcowego '/' obejmuje sam adres i wszystko pod nim
// ('/porownania' i '/porownania/x'); prefiks zakończony '/' obejmuje tylko podstrony
// ('/pozycjonowanie-w-ai/' -> spoke'i huba GEO, a sam hub /pozycjonowanie-w-ai ma wersję EN).
export const PL_ONLY_PREFIX = ['/porownania', '/szablony', '/narzedzia', '/pozycjonowanie-wizytowki-google', '/pozycjonowanie-w-ai/', '/raporty-ai'];

// Dokąd prowadzi przełącznik EN ze strony tylko-PL (zamiast 404).
export const EN_ZAMIENNIK = {
  '/sprawdz-widocznosc-w-ai': '/pozycjonowanie-w-ai',
  '/zmiana-agencji-seo': '/cennik-pozycjonowania',
  // Porównania (Integracja 5.11.2026; brief huba p. 10, brief P1 p. 15, CB-15): odpowiednik usługi
  // zamiast strony głównej. Klucze routingu PL - Link z locale='en' daje /en/seo-pricing itd.
  '/porownania': '/cennik-pozycjonowania',
  '/porownania/pozycjonowanie-za-efekt-czy-abonament': '/cennik-pozycjonowania',
  '/porownania/seo-vs-geo': '/pozycjonowanie-w-ai',
  '/porownania/seo-czy-google-ads': '/pozycjonowanie-stron-internetowych',
  '/porownania/jak-wybrac-agencje-seo': '/cennik-pozycjonowania',
};

function bezKotwicy(sciezka) {
  if (typeof sciezka !== 'string') return '';
  const s = sciezka.split('#')[0].split('?')[0];
  return s.length > 1 ? s.replace(/\/+$/, '') : s;
}

/** Czy strona istnieje tylko po polsku: tylkoPl('/porownania/x') === true, tylkoPl('/pozycjonowanie-w-ai') === false. */
export function tylkoPl(sciezka) {
  const s = bezKotwicy(sciezka);
  if (PL_ONLY.has(s)) return true;
  return PL_ONLY_PREFIX.some((p) => (p.endsWith('/') ? s.startsWith(p) : s === p || s.startsWith(`${p}/`)));
}

/**
 * Cel przełącznika EN (klucz z i18n/routing.js, Link z locale='en' go lokalizuje):
 * odpowiednik z EN_ZAMIENNIK, spoke huba GEO -> hub GEO, reszta stron tylko-PL -> strona główna.
 * Dla strony, która ma wersję EN, zwraca ją bez zmian.
 */
export function celPrzelacznikaEn(sciezka) {
  const s = bezKotwicy(sciezka);
  if (!tylkoPl(s)) return s;
  return EN_ZAMIENNIK[s] ?? (s.startsWith('/pozycjonowanie-w-ai/') ? '/pozycjonowanie-w-ai' : '/');
}
