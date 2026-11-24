// Pakiet P3 - Fala 3 (24.11.2026):
// PL: /seo-dla-firm-produkcyjnych-b2b
// EN: /en/manufacturing-industrial-seo
// DE: /de/seo-fuer-industrie-und-produktion
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import BranzaSeoClient from '@/components/BranzaSeoClient';
import BrancheSeoDe from '@/components/de/BrancheSeoDe';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { CENY } from '@/lib/narzedziaLiczby';
import { BRANZE_SEO } from '@/lib/branzeSeo';

const KLUCZ = 'produkcja';
const D = BRANZE_SEO[KLUCZ];
const SCIEZKA = D.sciezka;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis?.tytul ?? D.defaultTitlePl,
    description: wpis?.opis ?? D.defaultDescPl,
    ogType: 'website',
  });
}

function buildServiceSchema(locale) {
  const en = locale === 'en';
  const url = en
    ? `https://www.ai-seo-company.pl/en${D.enPath}`
    : `https://www.ai-seo-company.pl${SCIEZKA}`;
  const currency = en ? 'EUR' : 'PLN';
  const pStandard = en ? CENY.seoStandard.eur : CENY.seoStandard.pln;
  const pBooster = en ? CENY.boosterPack.eur : CENY.boosterPack.pln;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: en ? D.serviceNameEn : D.serviceNamePl,
    description: en ? D.serviceDescEn : D.defaultDescPl,
    serviceType: D.serviceType,
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: [
      { '@type': 'Country', name: en ? 'Poland' : 'Polska' },
      { '@type': 'Country', name: en ? 'Germany' : 'Niemcy' },
      { '@type': 'Country', name: en ? 'Austria' : 'Austria' },
      { '@type': 'Country', name: en ? 'Switzerland' : 'Szwajcaria' },
    ],
    availableLanguage: ['pl', 'en', 'de'],
    offers: [
      {
        '@type': 'Offer',
        name: en ? 'SEO Standard (Industrial B2B Manufacturer)' : 'SEO Standard (producent przemysłowy B2B)',
        priceCurrency: currency,
        price: pStandard,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: currency,
          price: pStandard,
          minPrice: pStandard,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: en ? 'Booster Pack (Custom Next.js Industrial Site + SEO)' : 'Booster Pack (nowy serwis producenta w Next.js + SEO)',
        priceCurrency: currency,
        price: pBooster,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: currency,
          price: pBooster,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };
}

export default async function SeoDlaFirmProdukcyjnychB2bPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  if (locale === 'de') return <BrancheSeoDe kluczBranzy={KLUCZ} />;

  const schema = buildServiceSchema(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <Breadcrumbs pl={D.breadcrumbs.pl} en={D.breadcrumbs.en} de={D.breadcrumbs.de} />
      <BranzaSeoClient kluczBranzy={KLUCZ} />
      <Footer />
    </>
  );
}
