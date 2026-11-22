// F8 (22.11.2026): /pozycjonowanie-stron-mazowsze (PL) i /en/local-seo-mazovia (EN).
// Dla locale === 'de' strona nie istnieje -> notFound().
import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import MazowszeClient from '@/components/MazowszeClient';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { CENY } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/pozycjonowanie-stron-mazowsze';
const DEFAULT_TITLE = 'Pozycjonowanie stron Mazowsze: SEO dla firm z regionu';
const DEFAULT_DESC = 'Pozycjonowanie stron i Map Google dla firm z Mazowsza: Radom, Płock, Siedlce, Pruszków, Piaseczno i korytarze A2/S7/S8. Pakiety od 1 900 zł netto.';

const MIASTA_MAZOWSZA = [
  'Województwo mazowieckie',
  'Radom',
  'Płock',
  'Siedlce',
  'Pruszków',
  'Legionowo',
  'Piaseczno',
  'Otwock',
  'Ciechanów',
  'Mińsk Mazowiecki',
  'Grodzisk Mazowiecki',
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') return {};
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
    ? 'https://www.ai-seo-company.pl/en/local-seo-mazovia'
    : 'https://www.ai-seo-company.pl/pozycjonowanie-stron-mazowsze';
  const currency = en ? 'EUR' : 'PLN';
  const pStandard = en ? CENY.seoStandard.eur : CENY.seoStandard.pln;

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: en ? 'Regional B2B and local SEO in Mazovia' : 'Pozycjonowanie stron i Map Google na Mazowszu',
    description: en
      ? 'Regional B2B and Google Maps SEO across the Mazovian Voivodeship (Radom, Płock, Siedlce, Pruszków, Piaseczno and A2/S7/S8 corridors).'
      : DEFAULT_DESC,
    serviceType: 'Regional and Local SEO',
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: MIASTA_MAZOWSZA.map((m, idx) => ({
      '@type': idx === 0 ? 'AdministrativeArea' : 'City',
      name: m,
    })),
    availableLanguage: ['pl', 'en'],
    offers: [
      {
        '@type': 'Offer',
        name: en ? 'SEO Standard (Regional Website + Business Profile)' : 'SEO Standard (strona + Profil Firmy w Google)',
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
    ],
  };
}

export default async function PozycjonowanieMazowszePage({ params }) {
  const { locale } = await params;
  if (locale === 'de') notFound();
  wymagajStronyPl(locale, SCIEZKA);
  setRequestLocale(locale);

  const schema = buildServiceSchema(locale);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Header />
      <Breadcrumbs pl="Pozycjonowanie stron Mazowsze" en="Local & B2B SEO Mazovia" />
      <MazowszeClient />
      <Footer />
    </>
  );
}
