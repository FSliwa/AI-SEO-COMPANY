import { routing } from '../i18n/routing';
import { blogPosts } from './blogPosts';
import { LASTMOD } from './lastmod';
import { STRONY_NARZEDZI } from './narzedzia';
import { tylkoPl } from './plOnly';
import { porownania } from './porownania';
import { czyOpublikowana, opublikowaneSciezki } from './publikacja';
import { PREFIKS as PREFIKS_AI, pytaniaAi } from './pytaniaAi';
import { sciezkaEn } from './stronyEn';

// Wpisy sitemapy. app/sitemaps/sitemap.js dzieli je na segmenty (generateSitemaps),
// a app/sitemap.xml/route.js wystawia indeks pod adresem /sitemap.xml (zgłoszony w GSC, w robots.txt,
// czyta go scripts/indexnow.mjs). Wszystko statyczne przy buildzie.
// Daty: lib/lastmod.json przez lib/lastmod.js, ustawia je `npm run wydanie` (scripts/sitemap/README.md).
// Adres bez wpisu dostaje sitemapę BEZ <lastmod> (wcześniej fallback 2026-08-24, czyli data sprzed
// powstania nowych stron); `npm run lastmod:sprawdz` traktuje brak wpisu jako błąd.
// changefreq i priority usunięte 11.11.2026: Google ignoruje oba pola, Bing ignoruje priority.
// Strony tylko po polsku (adres EN = 404, poza sitemapą EN): lib/plOnly.js.
// Bramka publikacji: lib/publikacja.js - nieopublikowana strona nie trafia do sitemapy;
// z NEXT_PUBLIC_PODGLAD_PARTII=1 (tylko lokalny build) trafiają wszystkie zbudowane.

export const BASE_URL = 'https://www.ai-seo-company.pl';

// Segmenty = typ treści x język (EN osobno: pokrycie indeksu wersji EN widać w GSC). Kolejność = kolejność w indeksie.
// Pusty segment nie trafia do indeksu (generateSitemaps zwraca tylko niepuste).
// Segmenty porownania i narzedzia-szablony mają PL i EN razem (adresy segmentów zgłoszone
// w GSC i BWT; rozdzielenie = decyzja przy migracji, audyt sitemapy 11.11.2026, 1.8).
export const SEGMENTY = ['strony-pl', 'strony-en', 'blog-pl', 'blog-en', 'ai-pl', 'ai-en', 'porownania', 'narzedzia-szablony'];

// Trasy [slug] i ich rejestry treści: ta sama lista slugów, z której generateStaticParams
// (parametryPl w lib/stronaPl.js) buduje strony. Nowy wpis w rejestrze (np. szablon w lib/szablony,
// który trafia do STRONY_NARZEDZI) = nowy adres w sitemapie bez drugiego wpisu w lib/publikacja.js.
const REJESTRY_SLUGOW = [
  ['/porownania/', () => porownania.map((p) => p.slug)],
  [PREFIKS_AI, () => pytaniaAi.map((p) => p.slug)],
  ['/narzedzia/', () => STRONY_NARZEDZI.map((s) => s.slug)],
];

function segmentOf(url) {
  const path = url.slice(BASE_URL.length) || '/';
  const en = path === '/en' || path.startsWith('/en/');
  const bezJezyka = en ? (path.slice(3) || '/') : path;
  if (/^\/(porownania|comparisons)(\/|$)/.test(bezJezyka)) return 'porownania';
  if (/^\/(narzedzia|szablony|tools)(\/|$)/.test(bezJezyka)) return 'narzedzia-szablony';
  if (en && bezJezyka.startsWith('/ai-search-optimization/')) return 'ai-en';
  // Spoke'i huba GEO: własny segment (bramka „>= 80% partii zaindeksowane” mierzalna).
  // Sam hub zostaje w strony-pl / strony-en.
  if (!en && bezJezyka.startsWith('/pozycjonowanie-w-ai/')) return 'ai-pl';
  const typ = bezJezyka === '/blog' || bezJezyka.startsWith('/blog/') ? 'blog' : 'strony';
  return `${typ}-${en ? 'en' : 'pl'}`;
}

/** Wszystkie adresy sitemapy: [{ url, lastModified?, segment }] w stałej kolejności. */
export function wszystkieWpisy() {
  const allRoutes = [];
  const seen = new Set();

  const push = (url) => {
    if (seen.has(url)) return;
    seen.add(url);
    const wpis = { url, segment: segmentOf(url) };
    if (LASTMOD[url]) wpis.lastModified = LASTMOD[url];
    allRoutes.push(wpis);
  };

  // Artykuły PIERWSZE (dedup `seen` blokuje wpis z pętli pathnames) - reguła z 26.08.
  blogPosts.forEach((post) => {
    const mapped = routing.pathnames[post.slug];
    // Artykuł z rejestru publikacji (np. B1) wpisany do blogPosts przed swoją partią: bez sitemapy.
    if (!czyOpublikowana((mapped && mapped.pl) || post.slug)) return;
    if (!post.enOnly) push(`${BASE_URL}${(mapped && mapped.pl) || post.slug}`);
    if (!post.plOnly) push(`${BASE_URL}/en${(mapped && mapped.en) || post.slug}`);
  });

  Object.keys(routing.pathnames).forEach((route) => {
    // Klucze dynamiczne ('/porownania/[slug]' itd.) NIE są adresami - bez tej linii do sitemapy
    // trafiłby literalny "[slug]" (404). Ich adresy dopisują pętle po rejestrach niżej.
    if (route.includes('[')) return;
    if (!czyOpublikowana(route)) return;
    const enSlug = routing.pathnames[route].en || route;
    if (!tylkoPl(route)) push(`${BASE_URL}/en${enSlug === '/' ? '' : enSlug}`);
    const plSlug = routing.pathnames[route].pl || route;
    push(`${BASE_URL}${plSlug === '/' ? '/' : plSlug}`);
  });

  // Opublikowane wpisy rejestru lib/publikacja.js (także adresy tras [slug]) z wersjami EN
  // z lib/stronyEn.js. Dedup `seen` chroni przed dubletem tras statycznych z pętli wyżej.
  const zSciezki = (p) => {
    push(`${BASE_URL}${p}`);
    const en = sciezkaEn(p);
    if (en) push(`${BASE_URL}/en${en}`);
  };
  opublikowaneSciezki().forEach(zSciezki);

  // Slugi z rejestrów treści spoza lib/publikacja.js (ścieżka spoza rejestru publikacji jest
  // opublikowana z definicji, więc generateStaticParams ją buduje).
  for (const [prefiks, slugi] of REJESTRY_SLUGOW) {
    slugi().map((s) => `${prefiks}${s}`).filter((p) => czyOpublikowana(p)).sort().forEach(zSciezki);
  }

  return allRoutes;
}

// <loc> w XML: adres zakodowany procentowo (znaki spoza ASCII) i z encjami XML (protokół sitemaps.org).
export const locXml = (url) => encodeURI(decodeURI(url)).replace(/&/g, '&amp;').replace(/'/g, '&apos;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function wpisySegmentu(id) {
  return wszystkieWpisy()
    .filter((w) => w.segment === id)
    .map(({ segment, url, ...wpis }) => ({ url: locXml(url), ...wpis }));
}

/** Niepuste segmenty: [{ id, liczba, lastmod }]; lastmod = najnowszy lastmod wpisów (albo undefined). */
export function niepusteSegmenty() {
  const wpisy = wszystkieWpisy();
  return SEGMENTY
    .map((id) => {
      const zSegmentu = wpisy.filter((w) => w.segment === id);
      const daty = zSegmentu.map((w) => w.lastModified).filter(Boolean).sort();
      return { id, liczba: zSegmentu.length, lastmod: daty[daty.length - 1] };
    })
    .filter((s) => s.liczba > 0);
}
