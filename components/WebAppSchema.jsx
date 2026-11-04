// Dane strukturalne dla darmowych narzedzi (sprawdzarka AI, kolejne z planu
// z 4.11.2026). WebApplication z ofertą 0 zł: opisuje narzędzie jako produkt
// AI SEO COMPANY i wiąże je z encją firmy (provider), bez obiecywania
// wyniku rozszerzonego. Treść musi zgadzać się z tym, co widać na stronie.
const BASE = 'https://www.ai-seo-company.pl';

export default function WebAppSchema({ name, description, url, category = 'BusinessApplication', language = 'pl' }) {
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
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
