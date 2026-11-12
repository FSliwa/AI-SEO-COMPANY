// Dane strukturalne dla darmowych narzedzi (sprawdzarka AI, kolejne z planu
// z 4.11.2026). WebApplication z ofertą 0 zł: opisuje narzędzie jako produkt
// AI SEO COMPANY i wiąże je z encją firmy (provider), bez obiecywania
// wyniku rozszerzonego. Treść musi zgadzać się z tym, co widać na stronie.
// 12.11.2026 (S1-poprawki Z-05): opcjonalne featureList (tablica tekstów, te same fakty co na stronie)
// i screenshot ({ url, width, height }, url względny albo pełny). Bez AggregateRating (brak prawdziwych
// opinii) i bez HowTo. CollectionPageSchema: hub /narzedzia (ItemList jako mainEntity, wzór Ahrefs).
const BASE = 'https://www.ai-seo-company.pl';

const pelnyUrl = (u) => (typeof u === 'string' && u.startsWith('/') ? `${BASE}${u}` : u);

function JsonLd({ dane }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(dane).replace(/</g, '\\u003c') }}
    />
  );
}

export default function WebAppSchema({ name, description, url, category = 'BusinessApplication', language = 'pl', featureList, screenshot }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name,
    description,
    url,
    applicationCategory: category,
    operatingSystem: 'Web',
    inLanguage: language,
    isAccessibleForFree: true,
    offers: { '@type': 'Offer', price: 0, priceCurrency: 'PLN' },
    provider: { '@id': `${BASE}/#organization` },
  };
  if (Array.isArray(featureList) && featureList.length) jsonLd.featureList = featureList;
  if (screenshot?.url) {
    jsonLd.screenshot = { '@type': 'ImageObject', url: pelnyUrl(screenshot.url), ...(screenshot.width ? { width: screenshot.width } : {}), ...(screenshot.height ? { height: screenshot.height } : {}) };
  }
  return <JsonLd dane={jsonLd} />;
}

/**
 * Hub narzędzi: CollectionPage z ItemList w mainEntity.
 *   <CollectionPageSchema url="https://www.ai-seo-company.pl/narzedzia" name={h1} description={meta} language="pl"
 *     elementy={[{ name, url, description? }]} />   url elementów względny ('/narzedzia/audyt-seo') albo pełny.
 */
export function CollectionPageSchema({ url, name, description, language = 'pl', elementy = [] }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${url}#strona`,
    name,
    ...(description ? { description } : {}),
    url,
    inLanguage: language,
    isPartOf: { '@id': `${BASE}/#website` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: elementy.length,
      itemListElement: elementy.map((e, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: pelnyUrl(e.url),
        name: e.name,
        ...(e.description ? { description: e.description } : {}),
        // Miniatura wyniku karty huba (lib/narzedziaObrazy.js, 12.11.2026); szablony jej nie mają.
        ...(e.image ? { image: pelnyUrl(e.image) } : {}),
      })),
    },
  };
  return <JsonLd dane={jsonLd} />;
}
