import { routing } from '../i18n/routing';
import { blogPosts } from './blogPosts';
import { LASTMOD } from './lastmod';
import { tylkoPl } from './plOnly';
import { czyOpublikowana, opublikowaneSciezki } from './publikacja';

// T0.7 (plan SEO z filmu): logika sitemapy przeniesiona z app/sitemap.js bez zmian
// w regulach lastmod. app/sitemaps/sitemap.js dzieli wpisy na segmenty (generateSitemaps),
// a app/sitemap.xml/route.js wystawia indeks pod starym adresem /sitemap.xml
// (ten adres jest zgloszony w GSC, w robots.txt i czyta go scripts/indexnow.mjs).
// Daty lastmod (i OBOWIAZEK ich aktualizacji przy kazdym wdrozeniu): lib/lastmod.js.
// Strony tylko po polsku (adres EN = 404, poza sitemapa EN): lib/plOnly.js.
// Bramka publikacji (nowe strony z PLAN-v2): lib/publikacja.js - nieopublikowana strona
// nie trafia do sitemapy; z NEXT_PUBLIC_PODGLAD_PARTII=1 (tylko lokalny build) trafiaja wszystkie zbudowane.

import { sciezkaEn } from './stronyEn';
export const BASE_URL = 'https://www.ai-seo-company.pl';
// Realne daty zamiast chwili requestu (audyt 24.08); tylko fallback dla tras bez wpisu w LASTMOD.
const STATIC_LASTMOD = '2026-08-24';

// Segmenty = typ tresci x jezyk (EN osobno: pokrycie indeksu wersji EN widac w GSC). Kolejnosc = kolejnosc w indeksie.
// Pusty segment nie trafia do indeksu (generateSitemaps zwraca tylko niepuste).
// Segmenty porownania i narzedzia-szablony sa zadeklarowane z gory: dopoki nie maja
// ani jednego URL-a, nie pojawiaja sie w indeksie; pierwsza strona = nowa sitemapa.
export const SEGMENTY = ['strony-pl', 'strony-en', 'blog-pl', 'blog-en', 'ai-pl', 'ai-en', 'porownania', 'narzedzia-szablony'];

function segmentOf(url) {
  const path = url.slice(BASE_URL.length) || '/';
  const en = path === '/en' || path.startsWith('/en/');
  const bezJezyka = en ? (path.slice(3) || '/') : path;
  // Typy z planu v1 (rozdz. 6) - strony tylko PL, wiec bez sufiksu jezyka.
  // Wersje EN (od 9.11.2026) w tych samych segmentach co PL: /en/comparisons, /en/tools.
  if (/^\/(porownania|comparisons)(\/|$)/.test(bezJezyka)) return 'porownania';
  if (/^\/(narzedzia|szablony|tools)(\/|$)/.test(bezJezyka)) return 'narzedzia-szablony';
  if (en && bezJezyka.startsWith('/ai-search-optimization/')) return 'ai-en';
  // Spoke'i huba GEO (A2 /pozycjonowanie-w-ai/chatgpt i kolejne): wlasny segment, zeby bramka
  // ">= 80% partii zaindeksowane" byla mierzalna. Sam hub zostaje w strony-pl / strony-en.
  if (!en && bezJezyka.startsWith('/pozycjonowanie-w-ai/')) return 'ai-pl';
  const typ = bezJezyka === '/blog' || bezJezyka.startsWith('/blog/') ? 'blog' : 'strony';
  return `${typ}-${en ? 'en' : 'pl'}`;
}

// Wpisy dotychczasowego sitemap() z polem `segment`: 61 URL-i 4.11.2026, od 5.11.2026
// 59 (bez /blog/biblioteka i /en/blog/library, SA-12) + opublikowane strony z lib/publikacja.js.
export function wszystkieWpisy() {
  const allRoutes = [];
  const seen = new Set();

  const push = (url, changeFrequency, priority, lastModified = STATIC_LASTMOD) => {
    if (seen.has(url)) return;
    seen.add(url);
    allRoutes.push({ url, lastModified: LASTMOD[url] ?? lastModified, changeFrequency, priority, segment: segmentOf(url) });
  };

  // Artykuly PIERWSZE (dedup `seen` blokuje wpis z petli pathnames) - regula z 26.08.
  blogPosts.forEach(post => {
    const mapped = routing.pathnames[post.slug];
    // Artykul z rejestru publikacji (np. B1) wpisany do blogPosts przed swoja partia: bez sitemapy.
    if (!czyOpublikowana((mapped && mapped.pl) || post.slug)) return;
    if (!post.enOnly) {
      push(`${BASE_URL}${(mapped && mapped.pl) || post.slug}`, 'weekly', 0.7, post.date || STATIC_LASTMOD);
    }
    if (!post.plOnly) {
      push(`${BASE_URL}/en${(mapped && mapped.en) || post.slug}`, 'weekly', 0.7, post.date || STATIC_LASTMOD);
    }
  });

  Object.keys(routing.pathnames).forEach(route => {
    // Klucze dynamiczne ('/porownania/[slug]', '/pozycjonowanie-w-ai/[slug]', '/narzedzia/[slug]')
    // NIE sa adresami - bez tej linii do sitemapy trafilby literalny "[slug]" (404).
    // Ich adresy dopisuje petla po rejestrze publikacji nizej.
    if (route.includes('[')) return;
    // Strona z planu przed swoja partia (np. /narzedzia, /pozycjonowanie-wizytowki-google) = 404.
    if (!czyOpublikowana(route)) return;
    const changeFrequency = route === '/' || route.startsWith('/blog') ? 'weekly' : 'monthly';
    const priority = route === '/' ? 1.0 : route.startsWith('/blog/') ? 0.7 : 0.85;
    const enSlug = routing.pathnames[route].en || route;
    if (!tylkoPl(route)) push(`${BASE_URL}/en${enSlug === '/' ? '' : enSlug}`, changeFrequency, priority);
    const plSlug = routing.pathnames[route].pl || route;
    push(`${BASE_URL}${plSlug === '/' ? '/' : plSlug}`, changeFrequency, priority);
  });

  // Nowe strony z PLAN-v2 (wszystkie tylko PL, wiec bez wpisu EN): opublikowane wpisy rejestru
  // lib/publikacja.js, w tym adresy tras [slug]. Dedup `seen` chroni przed dubletem tras
  // statycznych z petli wyzej (np. /porownania). lastmod = LASTMOD[url], a do czasu wpisu
  // STATIC_LASTMOD - date wdrozenia kazdej nowo opublikowanej strony dopisuje sie w lib/lastmod.js.
  opublikowaneSciezki().forEach(p => {
    push(`${BASE_URL}${p}`, 'monthly', 0.8);
    const en = sciezkaEn(p);
    if (en) push(`${BASE_URL}/en${en}`, 'monthly', 0.8);
  });

  return allRoutes;
}

export function wpisySegmentu(id) {
  return wszystkieWpisy()
    .filter(w => w.segment === id)
    .map(({ segment, ...wpis }) => wpis);
}

export function niepusteSegmenty() {
  const wpisy = wszystkieWpisy();
  return SEGMENTY
    .map(id => {
      const daty = wpisy.filter(w => w.segment === id).map(w => w.lastModified).sort();
      return { id, liczba: daty.length, lastmod: daty[daty.length - 1] };
    })
    .filter(s => s.liczba > 0);
}
