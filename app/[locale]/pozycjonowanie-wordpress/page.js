// E1b (22.11.2026): /pozycjonowanie-wordpress (PL), /en/wordpress-seo-services (EN), /de/wordpress-seo-agentur (DE).
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import WordpressSeoClient from '@/components/WordpressSeoClient';
import WordpressSeoDe from '@/components/de/WordpressSeoDe';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { CENY } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/pozycjonowanie-wordpress';
const DEFAULT_TITLE = 'Pozycjonowanie WordPress: szybkość, technika i AI SEO';
const DEFAULT_DESC = 'Pozycjonowanie stron na WordPressie: odchudzanie wtyczek pod LCP/INP, indeksacja tagów, czyste JSON-LD, dostęp botów AI i pakiety od 1 900 zł.';

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
    ? 'https://www.ai-seo-company.pl/en/wordpress-seo-services'
    : 'https://www.ai-seo-company.pl/pozycjonowanie-wordpress';
  const currency = en ? 'EUR' : 'PLN';
  const pStandard = en ? CENY.seoStandard.eur : CENY.seoStandard.pln;
  const pBooster = en ? CENY.boosterPack.eur : CENY.boosterPack.pln;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: en ? 'WordPress SEO services' : 'Pozycjonowanie stron na WordPressie (WordPress SEO)',
    description: en
      ? 'Technical WordPress SEO: plugin bloat cleanup for LCP and INP, taxonomy indexing, conflict-free JSON-LD, AI crawler readiness and monthly retainers.'
      : DEFAULT_DESC,
    serviceType: 'WordPress SEO',
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: { '@type': 'AdministrativeArea', name: en ? 'Warsaw, Poland and European Union' : 'Warszawa i Polska' },
    availableLanguage: ['pl', 'en', 'de'],
    offers: [
      {
        '@type': 'Offer',
        name: en ? 'SEO Standard for WordPress' : 'SEO Standard dla WordPressa',
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
        name: en ? 'Booster Pack (Next.js migration + full SEO)' : 'Booster Pack (migracja z WordPressa na Next.js + SEO)',
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

export default async function PozycjonowanieWordpressPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);
  if (locale === 'de') return <WordpressSeoDe />;

  const schema = buildServiceSchema(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <Breadcrumbs pl="Pozycjonowanie WordPress" en="WordPress SEO services" />
      <WordpressSeoClient />
      <Footer />
    </>
  );
}
