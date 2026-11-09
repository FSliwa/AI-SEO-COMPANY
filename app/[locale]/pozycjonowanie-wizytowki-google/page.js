// L1 /pozycjonowanie-wizytowki-google (PLAN-v2 6.6, partia 2 / W5, makieta 07; 5.11.2026).
// Brief: skille/content-brief-ai-uslugi/brief-L1-pozycjonowanie-wizytowki-google.md
// z korektami po weryfikacji CB-01 (H2 o ChatGPT), CB-02 (akapit #cena, podpis źródła,
// nazwa Offer), CB-06 (klaster fraz), CB-16 i AV-08 (drugi przedział cen z Perplexity).
//
// Strona za bramką publikacji (lib/publikacja.js, partia 2): wersja PL = 404 do opublikowana: true.
// 9.11.2026: wersja EN /en/google-business-profile-optimization (lib/stronyEn.js): tytuł i opis EN
// z wpisu stronyEn, FAQ i JSON-LD Service po angielsku (ServiceSchema nie ma EN dla 'wizytowka').
// Title i meta z rejestru publikacji (= PLAN-v2 6.6, 59 i 128 zn.), żeby llms.txt, nawigacja
// i <title> nie mogły się rozjechać. Okruszki 2-poziomowe (Strona główna › bieżąca).
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import ServiceSchema from '@/components/ServiceSchema';
import WizytowkaClient from '@/components/WizytowkaClient';
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { wpisPublikacji } from '@/lib/publikacja';
import { hrefWJezyku } from '@/lib/linkiEn';

const SCIEZKA = '/pozycjonowanie-wizytowki-google';

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

// FAQ z briefu L1 (6 pytań, gotowe teksty). Stałe id = kotwice pytań (AppleFaq otwiera
// pytanie z #id); id nie trafiają do JSON-LD. Pytanie 6 porównuje wizytówkę ze STRONĄ,
// nie z SEO lokalnym: /seo-lokalne-warszawa dostaje własne pytanie o wizytówkę (CB-16, PLAN 5.5).
// Fakty o opiniach: zasady treści Map Google (fałszywe zaangażowanie, zakaz korzyści za opinię)
// i Pomoc Profilu Firmy o ograniczeniach profilu - linki w sekcji Źródła, odczyt 5.11.2026.
const faqData = [
  {
    id: 'czy-wizytowka-google-jest-platna',
    question: 'Czy wizytówka Google jest płatna?',
    answer: 'Nie. Profil Firmy w Google zakładasz i prowadzisz bezpłatnie, a Google nie sprzedaje wyższych miejsc w bezpłatnych wynikach Map. Płatne są tylko reklamy oznaczone jako sponsorowane. Płacąc za pozycjonowanie wizytówki, płacisz za pracę: kategorie i usługi, zdjęcia, posty, odpowiedzi na opinie i pomiar pozycji.',
  },
  {
    id: 'jak-poprawic-widocznosc-wizytowki-google',
    question: 'Jak poprawić widoczność wizytówki Google?',
    answer: 'Najszybciej działa trafność: właściwa kategoria główna, kategorie dodatkowe, pełna lista usług z opisami i prawdziwe godziny otwarcia. Potem rozpoznawalność: stały napływ opinii z odpowiedzią w ciągu 48 godzin, posty co najmniej dwa razy w miesiącu, nowe zdjęcia i te same dane firmy w katalogach. Odległości od klienta nie zmienisz.',
  },
  {
    id: 'ile-trwa-pozycjonowanie-wizytowki-google',
    question: 'Ile trwa pozycjonowanie wizytówki Google?',
    answer: 'Zmiany kategorii i usług Google zwykle uwzględnia w ciągu kilku tygodni, dlatego pierwszy pomiar siatką robimy przed zmianami, a kolejne co 14 dni. Opinie i wzmianki budują pozycję miesiącami. Dla uzgodnionych fraz lokalnych celem jest TOP 3 w ciągu 2–3 miesięcy.',
  },
  {
    id: 'wizytowka-firmy-bez-lokalu',
    question: 'Czy można pozycjonować wizytówkę firmy bez lokalu?',
    answer: 'Tak. Firma, która dojeżdża do klientów, ukrywa adres i ustawia obszar obsługi. Pozycja w Mapach nadal zależy od odległości od adresu podanego przy weryfikacji, więc mierzymy ją siatką wokół tego punktu, a zasięg poza nim wzmacniamy stroną opisującą obszar działania.',
  },
  {
    id: 'czy-mozna-kupic-opinie-google',
    question: 'Czy można kupić opinie w Google?',
    answer: 'Nie warto i nie wolno. Zasady Google zakazują fałszywych opinii i nagradzania klientów za ich wystawienie, a naruszenia kończą się usuwaniem opinii i ograniczeniami profilu. Działa proces: prośba o opinię po każdej usłudze z bezpośrednim linkiem i odpowiedź na każdą opinię. Opisujemy go w <a href="/blog/jak-pozyskiwac-opinie-google-poradnik" style="text-decoration:underline">poradniku o opiniach Google</a>.',
  },
  {
    id: 'wizytowka-a-pozycjonowanie-strony',
    question: 'Czym różni się pozycjonowanie wizytówki od pozycjonowania strony?',
    answer: 'Pozycjonowanie wizytówki dotyczy Profilu Firmy w Mapach i w pakiecie lokalnym. Pozycjonowanie strony dotyczy wyników organicznych pod mapą: podstron usług, treści, danych strukturalnych i linków. Firma, która ma oba, zwykle wygrywa z firmą, która ma tylko wizytówkę, bo strona wzmacnia rozpoznawalność profilu.',
  },
];

// Wersja EN FAQ: te same 6 pytań, kolejność i fakty; idEn = angielskie kotwice pytań
// (linki #is-google-business-profile-free i #business-without-a-storefront w WizytowkaClient).
const faqDataEn = [
  {
    id: 'czy-wizytowka-google-jest-platna',
    idEn: 'is-google-business-profile-free',
    question: 'Is a Google Business Profile paid?',
    answer: 'No. You create and run a Google Business Profile for free, and Google does not sell higher positions in the free Maps results. Only ads labeled as sponsored are paid. When you pay for Business Profile optimization, you pay for work: categories and services, photos, posts, replies to reviews and ranking measurement.',
  },
  {
    id: 'jak-poprawic-widocznosc-wizytowki-google',
    idEn: 'how-to-improve-google-business-profile-visibility',
    question: 'How can I improve my Google Business Profile visibility?',
    answer: 'Relevance works fastest: the right primary category, secondary categories, a full list of services with descriptions and real opening hours. Then prominence: a steady flow of reviews answered within 48 hours, posts at least twice a month, new photos and the same business details across directories. You cannot change the distance from the customer.',
  },
  {
    id: 'ile-trwa-pozycjonowanie-wizytowki-google',
    idEn: 'how-long-does-google-business-profile-optimization-take',
    question: 'How long does Google Business Profile optimization take?',
    answer: 'Google usually picks up changes to categories and services within a few weeks, which is why we run the first grid measurement before the changes and the next ones every 14 days. Reviews and mentions build your ranking over months. For the agreed local keywords, the goal is TOP 3 within 2–3 months.',
  },
  {
    id: 'wizytowka-firmy-bez-lokalu',
    idEn: 'business-without-a-storefront',
    question: 'Can I optimize a profile for a business without a storefront?',
    answer: 'Yes. A business that travels to its customers hides its address and sets a service area. Its position in Maps still depends on the distance from the address given at verification, so we measure it with a grid around that point and strengthen reach beyond it with a page describing the service area.',
  },
  {
    id: 'czy-mozna-kupic-opinie-google',
    idEn: 'can-you-buy-google-reviews',
    question: 'Can you buy Google reviews?',
    answer: `You should not, and you may not. Google’s policies prohibit fake reviews and rewarding customers for leaving them, and violations end with reviews being removed and the profile being restricted. What works is a process: a review request after every job with a direct link, and a reply to every review. We describe it in our <a href="${hrefWJezyku('/blog/jak-pozyskiwac-opinie-google-poradnik', 'en')}" style="text-decoration:underline">guide to Google reviews</a>.`,
  },
  {
    id: 'wizytowka-a-pozycjonowanie-strony',
    idEn: 'business-profile-vs-website-seo',
    question: 'How does Business Profile optimization differ from website SEO?',
    answer: 'Business Profile optimization concerns your profile in Maps and in the local pack. Website SEO concerns the organic results below the map: service pages, content, structured data and links. A business that has both usually beats one that only has a profile, because the website strengthens the profile’s prominence.',
  },
];

// Service JSON-LD po angielsku: ServiceSchema ma wariant 'wizytowka' tylko dla PL (tylkoPl), więc EN
// dostaje własny węzeł; PL dalej przez <ServiceSchema variant="wizytowka" />. Kwota jak w sekcji pricing: PLN.
const URL_EN = 'https://www.ai-seo-company.pl/en/google-business-profile-optimization';
const serviceEn = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  '@id': `${URL_EN}#service`,
  name: 'Google Business Profile optimization',
  description: 'Google Business Profile optimization: categories, services, reviews, posts and ranking measurement in Google Maps from 49 points every 14 days in the client portal.',
  serviceType: 'Google Business Profile optimization',
  url: URL_EN,
  inLanguage: 'en',
  provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
  areaServed: { '@type': 'AdministrativeArea', name: 'Warsaw and Poland' },
  availableLanguage: ['pl', 'en'],
  offers: [
    {
      '@type': 'Offer',
      name: 'SEO Standard with Business Profile management',
      priceCurrency: 'EUR',
      price: 450,
      availability: 'https://schema.org/InStock',
      url: URL_EN,
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        priceCurrency: 'EUR',
        price: 450,
        unitCode: 'MON',
        valueAddedTaxIncluded: false,
      },
    },
  ],
};

export default async function PozycjonowanieWizytowkiPage({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);
  return (
    <>
      {/* Service + Offer „SEO Standard z prowadzeniem wizytówki” 1 900 PLN/mies. (CB-02);
          ta sama kwota jest widoczna w sekcji #cena. FAQPage generuje AppleFaq, BreadcrumbList Breadcrumbs. */}
      {locale === 'en'
        ? <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceEn) }} />
        : <ServiceSchema variant="wizytowka" />}
      <Header />
      <Breadcrumbs pl="Pozycjonowanie wizytówki Google" en="Google Business Profile optimization" />
      <WizytowkaClient faqData={locale === 'en' ? faqDataEn : faqData} />
      <Footer />
    </>
  );
}
