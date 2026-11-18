// /copywriting-seo (PL) i /en/seo-copywriting (EN): copywriting SEO jako część pakietów pozycjonowania.
// 18.11.2026, zadanie airSlate "nowa-copywriting" (fraza "copywriting seo", PL 880; EN "SEO copywriting").
// Strona za bramką publikacji (lib/publikacja.js) i z wpisem EN w lib/stronyEn.js: oba wpisy dodaje
// integrator wg REJESTR.md (ai-seo-prace/airslate/nowa-copywriting/). Do tego czasu strona = 404.
// Wzorzec: app/[locale]/pozycjonowanie-wizytowki-google/page.js. Okruszki 2-poziomowe.
// Oferta: copywriting nie jest sprzedawany osobno, treści są w pakietach SEO (opis w lib/copywritingSeo.js).
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import CopywritingSeoClient from '@/components/CopywritingSeoClient';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { PL, SCIEZKA, TITLE, DESCRIPTION } from '@/lib/copywritingSeo';
import { EN } from '@/lib/copywritingSeo.en';

const URL_PL = `https://www.ai-seo-company.pl${SCIEZKA}`;
const URL_EN = 'https://www.ai-seo-company.pl/en/seo-copywriting';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  // Tytuł i opis EN pochodzą z wpisu w lib/stronyEn.js (metadataStronyPl), tu tylko PL.
  return metadataStronyPl({ locale, sciezka: SCIEZKA, title: TITLE, description: DESCRIPTION, ogType: 'website' });
}

// Service + Offer: kwoty jak w widocznej tabeli pakietów (netto, miesięcznie).
function serviceSchema(locale) {
  const en = locale === 'en';
  const D = en ? EN : PL;
  const url = en ? URL_EN : URL_PL;
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: D.service.name,
    description: D.service.description,
    serviceType: D.service.serviceType,
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: { '@type': 'AdministrativeArea', name: en ? 'Warsaw and Poland' : 'Warszawa i cała Polska' },
    availableLanguage: ['pl', 'en'],
    offers: D.service.oferty.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      priceCurrency: o.currency,
      price: o.price,
      availability: 'https://schema.org/InStock',
      url,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: o.currency,
        price: o.price,
        unitCode: 'MON',
        valueAddedTaxIncluded: false,
      },
    })),
  };
}

export default async function CopywritingSeoPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema(locale)) }} />
      <Header />
      <Breadcrumbs pl={PL.breadcrumb} en={EN.breadcrumb} />
      <CopywritingSeoClient />
      <Footer />
    </>
  );
}
