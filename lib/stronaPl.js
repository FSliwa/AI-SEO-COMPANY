// Wzorzec nowych stron tylko po polsku za bramką publikacji (TS-03, PLAN-v2 6.0).
// TYLKO serwer (page.js): importuje notFound z next/navigation i lib/blogPosts.js.
//
// Strona statyczna (np. app/[locale]/porownania/page.js):
//   const SCIEZKA = '/porownania';
//   export async function generateMetadata({ params }) {
//     const { locale } = await params;
//     return metadataStronyPl({ locale, sciezka: SCIEZKA, title: '…', description: '…', ogType: 'website' });
//   }
//   export default async function Page({ params }) {
//     const { locale } = await params;
//     wymagajStronyPl(locale, SCIEZKA);
//     return <…Client />;
//   }
//
// Trasa [slug] (np. app/[locale]/porownania/[slug]/page.js):
//   export const dynamicParams = false;
//   export function generateStaticParams() { return parametryPl('/porownania/', porownania.map(p => p.slug)); }
//   ...metadataStronyPl({ locale, sciezka: `/porownania/${slug}`, ... }) i wymagajStronyPl(locale, `/porownania/${slug}`).
// Kształt { locale: 'pl', slug } jest obowiązkowy: samo { slug } daje 0 wygenerowanych ścieżek i 404 (TS-03).
// i18n/routing.js: wpis jako zwykły string (slug EN = slug PL), więc /en/… = 404 wprost.
import { notFound } from 'next/navigation';
import { DEFAULT_ROBOTS } from './blogPosts';
import { czyOpublikowana } from './publikacja';

const BASE = 'https://www.ai-seo-company.pl';

// Ten sam obraz co w app/[locale]/layout.js: openGraph strony zastępuje cały openGraph
// layoutu, więc bez tego strona straciłaby og:image i og:site_name.
const OBRAZ_DOMYSLNY = {
  url: `${BASE}/og-image.jpg`,
  width: 1024,
  height: 1024,
  alt: 'AI SEO COMPANY | Agencja SEO Warszawa',
};

function obrazOg(obraz) {
  if (!obraz) return OBRAZ_DOMYSLNY;
  if (typeof obraz === 'string') return { url: obraz.startsWith('http') ? obraz : `${BASE}${obraz}` };
  return { ...obraz, url: obraz.url.startsWith('http') ? obraz.url : `${BASE}${obraz.url}` };
}

/**
 * Metadane strony tylko-PL. Zwraca {} dla locale !== 'pl' i dla strony nieopublikowanej
 * (strona i tak woła notFound()). Canonical BEZ alternates.languages (hreflang): strona ma
 * jedną wersję językową. robots = DEFAULT_ROBOTS (w Next 16 robots: undefined kasuje regułę layoutu).
 * obraz: ścieżka ('/obrazy/x.jpg'), pełny URL albo { url, width, height, alt }; domyślnie og-image serwisu.
 */
export function metadataStronyPl({ locale, sciezka, title, description, ogType = 'article', obraz }) {
  if (locale !== 'pl' || !czyOpublikowana(sciezka)) return {};
  const url = `${BASE}${sciezka}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    robots: DEFAULT_ROBOTS,
    openGraph: {
      title,
      description,
      url,
      type: ogType,
      locale: 'pl_PL',
      siteName: 'AI SEO COMPANY',
      images: [obrazOg(obraz)],
    },
  };
}

/** notFound() (404) dla wersji EN i dla strony przed jej partią. Wołać na początku komponentu strony. */
export function wymagajStronyPl(locale, sciezka) {
  if (locale !== 'pl' || !czyOpublikowana(sciezka)) notFound();
}

/**
 * generateStaticParams tras [slug]: tylko opublikowane slugi, zawsze w kształcie { locale: 'pl', slug }.
 * parametryPl('/porownania/', ['seo-vs-geo', 'seo-czy-google-ads']) -> [{ locale: 'pl', slug: 'seo-vs-geo' }]
 * (przy fladze P3 = false). Trasa eksportuje też dynamicParams = false.
 */
export function parametryPl(prefiks, slugi) {
  const p = prefiks.endsWith('/') ? prefiks : `${prefiks}/`;
  return slugi.filter((s) => czyOpublikowana(p + s)).map((slug) => ({ locale: 'pl', slug }));
}
