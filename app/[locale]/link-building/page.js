// Strona usługi: link building (18.11.2026, zadanie nowa-en). PL /link-building, EN /en/link-building-services.
// Fraza główna PL „link building” (720), EN „link building services” (US 1900 / GB 2400): seo/frazy-pl.csv i frazy-en.csv.
// Odróżnienie od artykułu /blog/link-building-b2b-dla-marketerow-strategie-i-checklista (fraza „link building b2b”,
// poradnik z metodami): tu usługa, zakres w pakietach, ceny i pomiar; artykuł jest linkowany z treści.
// Za bramką publikacji (lib/publikacja.js) i z wpisem w lib/stronyEn.js: wpisy do dodania są w
// ai-seo-prace/airslate/nowa-en/REJESTR.md (strona pisze title i opis z rejestru, nie z tego pliku).
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import LinkBuildingClient from '@/components/LinkBuildingClient';
import LinkbuildingAgenturDe from '@/components/de/LinkbuildingAgenturDe';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';

const SCIEZKA = '/link-building';
const BASE = 'https://www.ai-seo-company.pl';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const wpis = wpisPublikacji(SCIEZKA);
  return metadataStronyPl({
    locale,
    sciezka: SCIEZKA,
    title: wpis.tytul,
    description: wpis.opis,
    ogType: 'website',
  });
}

// FAQ: te same 6 pytań w obu językach (pytania z autosugestii Google: „what is link building”, „link building
// services cost”, „link building co to”, „link building cena”). id = kotwice pytań, idEn = angielskie.
const faqPl = [
  {
    id: 'link-building-co-to',
    question: 'Link building co to jest i czy nadal działa?',
    answer: 'Link building to pozyskiwanie linków z innych stron do Twojej. Google podaje, że używa linków jako sygnału przy ocenie trafności stron i do znajdowania nowych stron, więc linki z wiarygodnych, tematycznie bliskich serwisów nadal mają znaczenie. Zmieniło się to, które linki są warte zachodu: liczy się jakość i kontekst, a nie liczba.',
  },
  {
    id: 'link-building-cena',
    question: 'Ile kosztuje link building?',
    answer: 'U nas link building jest częścią pakietów SEO: SEO Standard od 1 900 zł netto miesięcznie obejmuje 2 linki miesięcznie, SEO Premium za 2 500 zł netto miesięcznie obejmuje 4 linki miesięcznie. Większe programy digital PR wyceniamy indywidualnie, po rozmowie o branży i celu.',
  },
  {
    id: 'ile-linkow-miesiecznie',
    question: 'Ile linków dostanę w miesiącu i czy gwarantujecie pozycję?',
    answer: 'Dokładnie tyle, ile stoi w pakiecie: 2 linki w SEO Standard i 4 w SEO Premium. Nie gwarantujemy pozycji nr 1, bo o pozycjach decyduje algorytm Google. Zobowiązujemy się do zakresu prac, raportu miesięcznego i dostępu do panelu klienta.',
  },
  {
    id: 'czy-kupujecie-linki',
    question: 'Czy kupujecie linki albo używacie sieci PBN?',
    answer: 'Nie kupujemy linków w sieciach PBN ani w katalogach masowych; publikacje płatne oznaczamy atrybutem rel=„sponsored”. Nasz proces to audyt, zasób wart linkowania, outreach do redakcji i partnerów, publikacja i raport. Zasady Google definiują kupowanie i sprzedaż linków w celu wpływania na pozycje jako spam linkowy; płatne umieszczenia są dozwolone w reklamie i sponsoringu tylko z atrybutem rel=„sponsored” albo rel=„nofollow”.',
  },
  {
    id: 'jak-sprawdzic-jakosc-linkow',
    question: 'Jak sprawdzić jakość linków do mojej strony?',
    answer: 'Zacznij od pięciu pytań o każde źródło: czy jest z tej samej branży, czy ma prawdziwy ruch, czy link stoi w treści, czy tekst linku jest naturalny i czy profil serwisu jest redakcyjny, a nie z sieci linków. Pierwszy przegląd profilu linków robimy w audycie SEO, a ogólny obraz autorytetu domeny pokaże nasze bezpłatne narzędzie.',
  },
  {
    id: 'kiedy-linki-daja-efekt',
    question: 'Po jakim czasie linki dają efekt?',
    answer: 'Google podaje, że niektóre zmiany działają po kilku godzinach, a inne po kilku miesiącach, i zaleca odczekać kilka tygodni przed oceną efektów. Na bardzo konkurencyjne frazy ogólnopolskie ustabilizowane wysokie pozycje buduje się zazwyczaj w horyzoncie 3 do 6 miesięcy, a link jest tylko jednym z elementów tej pracy obok audytu, treści i poprawek technicznych.',
  },
];

const faqEn = [
  {
    id: 'link-building-co-to',
    idEn: 'what-is-link-building',
    question: 'What is link building and does it still work?',
    answer: 'Link building is earning links from other websites to yours. Google says it uses links as a signal when determining the relevancy of pages and to find new pages to crawl, so links from credible, topically close sites still matter. What has changed is which links are worth the effort: quality and context count, not volume.',
  },
  {
    id: 'link-building-cena',
    idEn: 'how-much-do-link-building-services-cost',
    question: 'How much do link building services cost?',
    answer: 'With us link building is part of the SEO packages: SEO Standard from €450 net a month includes 2 links a month, and SEO Premium at €590 net a month includes 4 links a month. Larger digital PR programs are quoted individually after a conversation about your industry and goal.',
  },
  {
    id: 'ile-linkow-miesiecznie',
    idEn: 'how-many-links-per-month',
    question: 'How many links will I get a month, and do you guarantee a ranking?',
    answer: 'Exactly what the package says: 2 links in SEO Standard and 4 in SEO Premium. We do not guarantee position 1, because Google’s algorithm decides the rankings. We commit to the scope of work, a monthly report and access to the client portal.',
  },
  {
    id: 'czy-kupujecie-linki',
    idEn: 'do-you-buy-links-or-use-pbns',
    question: 'Do you buy links or use PBN networks?',
    answer: 'We do not buy links in PBN networks or mass directories; paid placements are marked rel="sponsored". Our process is an audit, a linkable asset, outreach to editors and partners, publication and a report. Google’s policies define buying or selling links to affect rankings as link spam; paid placements are allowed for advertising or sponsorship only with a rel="sponsored" or rel="nofollow" attribute.',
  },
  {
    id: 'jak-sprawdzic-jakosc-linkow',
    idEn: 'how-to-check-link-quality',
    question: 'How do I check the quality of links to my site?',
    answer: 'Ask five questions about each source: is it from the same industry, does it have real traffic, does the link sit in the body of the text, is the anchor text natural, and is the site editorial rather than part of a link network. We run the first link profile review in the SEO audit, and our free tool gives a general picture of domain authority.',
  },
  {
    id: 'kiedy-linki-daja-efekt',
    idEn: 'how-long-until-links-have-an-effect',
    question: 'How long until links have an effect?',
    answer: 'Google says some changes take effect within a few hours and others take several months, and advises waiting a few weeks before judging results. For very competitive national keywords stable high positions are usually built over 3 to 6 months, and a link is only one element of that work, next to the audit, content and technical fixes.',
  },
];

// Service JSON-LD: nazwa i opis po języku; oferta = pakiety z cennika (PLN dla PL, EUR dla EN jak na stronie cennika).
function serviceLd(en) {
  const url = en ? `${BASE}/en/link-building-services` : `${BASE}/link-building`;
  const waluta = en ? 'EUR' : 'PLN';
  const oferta = (nazwa, cena) => ({
    '@type': 'Offer',
    name: nazwa,
    priceCurrency: waluta,
    price: cena,
    availability: 'https://schema.org/InStock',
    url,
    priceSpecification: { '@type': 'UnitPriceSpecification', priceCurrency: waluta, price: cena, unitCode: 'MON', valueAddedTaxIncluded: false },
  });
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: en ? 'Link building services' : 'Link building',
    description: en
      ? 'Link building inside SEO packages: audit, linkable asset, outreach to editors and partners, publication and monthly reporting. 2 links a month in SEO Standard, 4 in SEO Premium.'
      : 'Link building w pakietach SEO: audyt, zasób wart linkowania, outreach do redakcji i partnerów, publikacja i raport miesięczny. 2 linki miesięcznie w SEO Standard, 4 w SEO Premium.',
    serviceType: en ? 'Link building' : 'Link building',
    url,
    inLanguage: en ? 'en' : 'pl',
    provider: { '@id': `${BASE}/#organization` },
    areaServed: { '@type': 'AdministrativeArea', name: en ? 'Poland and abroad' : 'Polska i zagranica' },
    availableLanguage: ['pl', 'en'],
    offers: [
      oferta(en ? 'SEO Standard (2 links a month)' : 'SEO Standard (2 linki miesięcznie)', en ? 450 : 1900),
      oferta(en ? 'SEO Premium (4 links a month)' : 'SEO Premium (4 linki miesięcznie)', en ? 590 : 2500),
    ],
  };
}

export default async function LinkBuildingPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  if (locale === 'de') return <LinkbuildingAgenturDe />;
  const en = locale === 'en';
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceLd(en)) }} />
      <Header />
      <Breadcrumbs pl="Link building" en="Link building services" />
      <LinkBuildingClient faqData={en ? faqEn : faqPl} />
      <Footer />
    </>
  );
}
