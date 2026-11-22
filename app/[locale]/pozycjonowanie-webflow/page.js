// E1b (22.11.2026): /pozycjonowanie-webflow (PL), /en/webflow-seo-services (EN), /de/webflow-seo-agentur (DE).
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WebflowSeoClient from '@/components/WebflowSeoClient';
import WebflowSeoDe from '@/components/de/WebflowSeoDe';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { CENY } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/pozycjonowanie-webflow';
const DEFAULT_TITLE = 'Pozycjonowanie Webflow: audyt CMS, hreflang i AI SEO';
const DEFAULT_DESC = 'Pozycjonowanie stron na Webflow: obejście płaskich URL kolekcji CMS, konfiguracja hreflang, dane JSON-LD, dostęp botów AI i pakiety od 1 900 zł.';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis?.tytul ?? DEFAULT_TITLE,
    description: wpis?.opis ?? DEFAULT_DESC,
    ogType: 'website',
  });
}

function buildServiceSchema(locale) {
  const en = locale === 'en';
  const url = en
    ? 'https://www.ai-seo-company.pl/en/webflow-seo-services'
    : 'https://www.ai-seo-company.pl/pozycjonowanie-webflow';
  const currency = en ? 'EUR' : 'PLN';
  const pStandard = en ? CENY.seoStandard.eur : CENY.seoStandard.pln;
  const pBooster = en ? CENY.boosterPack.eur : CENY.boosterPack.pln;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: en ? 'Webflow SEO services' : 'Pozycjonowanie stron na Webflow (Webflow SEO)',
    description: en
      ? 'Webflow SEO services for B2B and SaaS: CMS collection architecture, Localization hreflang, Custom Code JSON-LD, AI crawler readiness and monthly retainers.'
      : DEFAULT_DESC,
    serviceType: 'Webflow SEO',
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: { '@type': 'AdministrativeArea', name: en ? 'Warsaw, Poland and European Union' : 'Warszawa i Polska' },
    availableLanguage: ['pl', 'en', 'de'],
    offers: [
      {
        '@type': 'Offer',
        name: en ? 'SEO Standard for Webflow' : 'SEO Standard dla Webflow',
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
        name: en ? 'Booster Pack (Next.js migration + full SEO)' : 'Booster Pack (migracja z Webflow na Next.js + SEO)',
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

export default async function PozycjonowanieWebflowPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  if (locale === 'de') return <WebflowSeoDe />;

  const schema = buildServiceSchema(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <Breadcrumbs pl="Pozycjonowanie Webflow" en="Webflow SEO services" />
      <WebflowSeoClient />
      <Footer />
    </>
  );
}
