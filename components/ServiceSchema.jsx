'use client';

import { useLocale } from 'next-intl';

const BASE = 'https://www.ai-seo-company.pl';

// Strony uslugowe publikowaly konkretne ceny, ale nie deklarowaly maszynowo ani
// jakiej uslugi dotycza, ani dla jakiego obszaru, ani za ile - w calym serwisie
// nie bylo ani jednego wezla Service, Offer czy Product. To nie generuje wyniku
// rozszerzonego, ale jest podstawowym budulcem grafu encji i tym, co czytaja
// wyszukiwarki oparte na modelach jezykowych.
//
// offers wypelniamy WYLACZNIE tam, gdzie kwota jest widoczna na stronie - dane
// strukturalne maja odpowiadac tresci, wiec strona bez cennika nie deklaruje ceny.
const USLUGI = {
  'audyt-seo': {
    pl: { name: 'Audyt SEO', desc: 'Kompleksowy audyt SEO strony: analiza techniczna, indeksacja, Core Web Vitals, struktura nagłówków, frazy kluczowe i wytyczne UX.' },
    en: { name: 'SEO audit', desc: 'Comprehensive SEO audit: technical analysis, indexing, Core Web Vitals, heading structure, keyword research and UX guidelines.' },
    typ: 'SEO audit',
    url: { pl: `${BASE}/audyt-seo`, en: `${BASE}/en/seo-audit` },
    cena: null,
  },
  'pozycjonowanie': {
    pl: { name: 'Pozycjonowanie stron internetowych', desc: 'Profesjonalne pozycjonowanie stron internetowych dla firm B2B: optymalizacja techniczna, treść, link building i raportowanie.' },
    en: { name: 'Search engine optimization', desc: 'Professional search engine optimization for B2B companies: technical optimisation, content, link building and reporting.' },
    typ: 'Search engine optimization',
    url: { pl: `${BASE}/pozycjonowanie-stron-internetowych`, en: `${BASE}/en/seo-services` },
    cena: 1900,
  },
  'cennik': {
    pl: { name: 'Pakiety pozycjonowania stron', desc: 'Cennik pozycjonowania stron: abonamentowe pakiety SEO Standard i SEO Premium z miesięczną subskrypcją i możliwością rezygnacji.' },
    en: { name: 'SEO packages', desc: 'SEO pricing: Standard and Premium subscription packages with monthly billing and cancellation at any time.' },
    typ: 'Search engine optimization',
    url: { pl: `${BASE}/cennik-pozycjonowania`, en: `${BASE}/en/seo-pricing` },
    cena: 1900,
  },
  'seo-lokalne': {
    pl: { name: 'SEO lokalne w Warszawie', desc: 'Pozycjonowanie lokalne: optymalizacja Wizytówki Google, spójność NAP, strategia opinii i widoczność w Mapach Google.' },
    en: { name: 'Local SEO in Warsaw', desc: 'Local SEO: Google Business Profile optimisation, NAP consistency, review strategy and Google Maps visibility.' },
    typ: 'Local SEO',
    url: { pl: `${BASE}/seo-lokalne-warszawa`, en: `${BASE}/en/local-seo-warsaw` },
    cena: 1900,
  },
  'web-design': {
    pl: { name: 'Projektowanie stron internetowych', desc: 'Projektowanie i wdrażanie stron internetowych: indywidualny projekt UX/UI, wersja mobilna i optymalizacja pod konwersję.' },
    en: { name: 'Web design', desc: 'Web design and development: bespoke UX/UI, responsive layouts and conversion optimisation.' },
    typ: 'Web design',
    url: { pl: `${BASE}/projektowanie-stron-internetowych`, en: `${BASE}/en/web-design` },
    cena: 1900,
  },
};

export default function ServiceSchema({ variant }) {
  const lang = useLocale();
  const isEn = lang === 'en';
  const u = USLUGI[variant];
  if (!u) return null;

  const t = isEn ? u.en : u.pl;
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${u.url[isEn ? 'en' : 'pl']}#service`,
    name: t.name,
    description: t.desc,
    serviceType: u.typ,
    url: u.url[isEn ? 'en' : 'pl'],
    provider: { '@id': `${BASE}/#organization` },
    areaServed: isEn
      ? { '@type': 'AdministrativeArea', name: 'Warsaw and Poland' }
      : { '@type': 'AdministrativeArea', name: 'Warszawa i Polska' },
    availableLanguage: ['pl', 'en'],
  };

  if (u.cena) {
    jsonLd.offers = {
      '@type': 'Offer',
      priceCurrency: 'PLN',
      price: u.cena,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'PLN',
        price: u.cena,
        minPrice: u.cena,
        unitCode: 'MON',
        valueAddedTaxIncluded: false,
      },
      availability: 'https://schema.org/InStock',
      url: u.url[isEn ? 'en' : 'pl'],
    };
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
