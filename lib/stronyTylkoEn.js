// Strony tylko po angielsku pod trasami narzędzi (18.11.2026, partia 2, p2-audyt-przyklad).
// Czysty ESM bez importów: czytają go i18n/routing.js, lib/sitemapEntries.js, app/llms.txt/route.js,
// components/Header.jsx i trasa app/[locale]/narzedzia/[slug]/page.js.
//
// Po co osobny rejestr, a nie lib/stronyEn.js: wpis w STRONY_EN oznacza „strona PL ma wersję EN”
// (hreflang pl/en, adres PL w sitemapie, przełącznik języka, llms.txt, middleware). Tu strona PL
// NIE istnieje: adres PL tej ścieżki = 404 (trasa [slug] ma dynamicParams = false i nie generuje
// parametru locale 'pl'), w sitemapie jest tylko adres EN, canonical wskazuje sam adres EN,
// hreflang: en + x-default (bez pl), a przełącznik PL z tej strony prowadzi do huba /narzedzia.
//
// Klucz = ścieżka wewnętrzna jak w i18n/routing.js (klucz routingu); en = ścieżka bez prefiksu /en.
// Powód EN-only: w danych fraz (seo/frazy-pl.csv) nie ma polskiego odpowiednika „przykładowy audyt SEO”
// z wolumenem, a /audyt-seo i /narzedzia/audyt-seo pokrywają polskie frazy audytowe.

export const TYLKO_EN = {
  '/narzedzia/seo-audit-example': {
    en: '/tools/seo-audit-example',
    opublikowana: true,
    segment: 'narzedzia-szablony',
    tytul: 'SEO audit example: a real 95/100 report, rule by rule',
    opis: 'SEO audit example: a real report from our free audit of ai-seo-company.pl. Score 95/100, 25 pages, 49 rules, 3 warnings, fixes and the SEO audit format.',
  },
};

const bezKotwicy = (s) => {
  if (typeof s !== 'string') return '';
  const t = s.split('#')[0].split('?')[0];
  return t.length > 1 ? t.replace(/\/+$/, '') : t;
};

/** Wpis strony tylko-EN (klucz routingu) albo null. */
export function wpisTylkoEn(sciezka) {
  return TYLKO_EN[bezKotwicy(sciezka)] ?? null;
}

/** Czy ścieżka to strona tylko po angielsku (opublikowana albo nie). */
export function tylkoEn(sciezka) {
  return Boolean(wpisTylkoEn(sciezka));
}

/** Czy strona tylko-EN jest publiczna (bramka: flaga opublikowana). */
export function opublikowanaTylkoEn(sciezka) {
  return Boolean(wpisTylkoEn(sciezka)?.opublikowana);
}

/** Klucze opublikowanych stron tylko-EN. */
export function opublikowaneTylkoEn() {
  return Object.keys(TYLKO_EN).filter((k) => TYLKO_EN[k].opublikowana);
}
