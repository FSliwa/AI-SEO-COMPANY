export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') return metadataDe('/pozycjonowanie-stron-internetowych', { languages: { pl: 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych', en: 'https://www.ai-seo-company.pl/en/seo-services' } });
  return {
  title: locale === 'en' ? 'SEO Optimization Services & Digital Marketing for Agencies' : 'Profesjonalne Pozycjonowanie Stron Internetowych | SEO B2B',
  description: locale === 'en' ? 'SEO optimization service, search engine and digital marketing for companies and agencies. Content strategy, growth. Your optimisation agency.' : 'Profesjonalne pozycjonowanie stron internetowych dla firm B2B. Skuteczne pozycjonowanie stron i pełna optymalizacja SEO - zdobywamy pozycje w Google.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-services' : 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
      'x-default': 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
      'en': 'https://www.ai-seo-company.pl/en/seo-services',
      ...hreflangDe('/pozycjonowanie-stron-internetowych')
    }
  },
};
}

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import PozycjonowanieClient from '@/components/PozycjonowanieClient';
import ServiceSchema from '@/components/ServiceSchema';
import SeoFuerUnternehmenDe from '@/components/de/SeoFuerUnternehmenDe';
import { metadataDe, hreflangDe } from '@/lib/stronyDe';

// 5.11.2026 (PS1; PLAN-v2 6.20, OP-08, MSA-18, BL-03, OP-04) - strona chroniona: tylko DODAWANIE w wersji
// PL (answer); answerEn bez zmian. Nowe pytanie ma tylkoPl: true (PozycjonowanieClient odfiltrowuje je na /en).
// Stałe id pytania o czas pozycjonowania: kotwica z frazy.csv (dawniej #faq, nie istniała).
const faqData = [
  {
    id: 'jak-dlugo-trwa-pozycjonowanie',
    idEn: 'how-long-does-seo-take',
    question: 'Ile trwa pozycjonowanie stron internetowych?',
    questionEn: 'How long does website optimization take?',
    answer: 'Pierwsze efekty wzrostu widoczności pojawiają się po 4-8 tygodniach od optymalizacji technicznej. Dla uzgodnionych fraz lokalnych naszym celem jest TOP 3 w 2-3 miesiące, z postępem widocznym co tydzień w panelu klienta; jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł. Na bardzo konkurencyjne frazy ogólnopolskie ustabilizowane wysokie pozycje buduje się zazwyczaj w horyzoncie 3 do 6 miesięcy. Przykład z naszych wdrożeń: świeżo uruchomiona strona firmy wdrażającej normy ISO miała w pierwszych 18 dniach (5-22.08.2026) 296 wyświetleń w Google przy średniej pozycji 34,6 (Google Search Console). Pozostałe dane opisujemy w raporcie <a href="/blog/wyniki-wdrozen-seo-2026" style="text-decoration:underline">wyniki wdrożeń SEO w 2026</a>.',
    answerEn: 'The first effects of visibility growth appear 4-8 weeks after technical optimization. For agreed local keywords our goal is a TOP 3 within 2-3 months, with progress visible weekly in the client portal; if we miss it after 3 months, the next month is on us. For highly competitive national keywords, stabilized high rankings are typically built over a 3 to 6 month horizon. We compare these timeframes with Google\u2019s statements and our client data in our article on how long SEO takes.'
  },
  {
    question: 'Czym różni się pozycjonowanie z AI od tradycyjnego SEO?',
    questionEn: 'How does AI-driven strategy differ from traditional methods?',
    answer: 'Analizujemy zapytania użytkowników w kontekście intencji wyszukiwania (Search Intent) oraz wyszukiwania semantycznego (LLM Search), optymalizując treści pod kątem tradycyjnego Google oraz wyszukiwarek AI (ChatGPT, Perplexity). Zakres, ceny i metodę cotygodniowego pomiaru w ChatGPT, Gemini i Perplexity opisujemy na stronie o <a href="/pozycjonowanie-w-ai" style="text-decoration:underline">pozycjonowaniu w AI (GEO)</a>.',
    answerEn: 'We analyze user queries in the context of Search Intent and semantic search (LLM Search), optimizing content for both traditional Google and AI search engines (ChatGPT, Perplexity).'
  },
  {
    question: 'Czy pozycjonowanie stron gwarantuje pozycję nr 1 w Google?',
    questionEn: 'Do you guarantee the #1 position on Google search?',
    answer: 'Nie. Żadna uczciwa agencja nie gwarantuje pozycji nr 1, bo o wynikach decyduje algorytm Google, nie my - a każdy, kto to obiecuje, sprzedaje Ci pewność, której nie ma. Deklarujemy to, co jest po naszej stronie: zakres prac, terminy, panel klienta z danymi na bieżąco, comiesięczny raport pokazujący, co zrobiliśmy i jak zmieniła się widoczność, oraz cel TOP 3 dla uzgodnionych fraz lokalnych w 2-3 miesiące. Jeśli go nie osiągniemy, kolejny miesiąc pracujemy za 0 zł (<a href="/cennik-pozycjonowania#cel-top-3" style="text-decoration:underline">zasady celu TOP 3</a>).',
    answerEn: 'No. No honest agency guarantees the #1 position, because Google\'s algorithm decides the rankings, not us - anyone promising otherwise is selling you a certainty that does not exist. What we do commit to is what is on our side: the scope of work, the deadlines, a client portal with live data, a monthly report showing what we did and how visibility changed, and a TOP 3 goal for agreed local keywords within 2-3 months. If we miss it, the next month is on us (<a href="/en/seo-pricing#cel-top-3" style="text-decoration:underline">TOP 3 goal rules</a>).'
  },
  {
    question: 'Czym różni się pozycjonowanie od marketingu cyfrowego?',
    questionEn: 'What is the difference between SEO and digital marketing?',
    answer: 'Marketing cyfrowy to całość działań w kanałach online - reklama płatna, social media, e-mail, treści. Pozycjonowanie jest jednym z tych kanałów i odpowiada wyłącznie za widoczność w wynikach wyszukiwania. Różnica praktyczna dotyczy horyzontu: reklama przestaje przynosić kliknięcia w dniu wyłączenia budżetu, a pozycje zbudowane organicznie pracują dalej. Dlatego traktujemy oba kanały jako uzupełniające się, a nie konkurencyjne - przy łączeniu kanałów warto też zadbać o <a href="/blog/konfiguracja-zdarzen-gtm-ga4-poradnik" style="text-decoration:underline">poprawną konfigurację zdarzeń GTM i GA4</a> oraz dobór narzędzi e-mail marketingu (<a href="/blog/mailchimp-vs-getresponse" style="text-decoration:underline">porównanie Mailchimp vs GetResponse</a>).',
    answerEn: 'Digital marketing covers everything you do in online channels - paid ads, social, e-mail, content. SEO is one of those channels and answers only for visibility in search results. The practical difference is the horizon: paid stops delivering clicks the day the budget stops, while positions built organically keep working. That is why we treat SEO and digital marketing as complementary rather than competing, and why a plan combining search engine optimization, clean multi-touch tracking (<a href="/en/blog/best-marketing-attribution-tools-for-2026" style="text-decoration:underline">best marketing attribution tools for 2026</a>) and marketing usually beats either one on its own.'
  },
  {
    question: 'Czy pozycjonowanie ma sens bez pozostałych działań marketingowych?',
    questionEn: 'Does SEO make sense without the rest of your marketing?',
    answer: 'Ma, ale wolniej. Ruch z wyszukiwarki trafia na stronę, która musi go przekonać - jeśli oferta, dowody społeczne i ścieżka kontaktu są słabe, wyższa pozycja podniesie liczbę wizyt, a nie liczbę zapytań. Dlatego przy każdym wdrożeniu patrzymy również na konwersję, a nie wyłącznie na pozycje.',
    answerEn: 'It does, but more slowly. Search traffic lands on a page that still has to convince - if the offer, the proof and the contact path are weak, a higher position raises visits rather than enquiries. Good SEO and marketing therefore get planned together: we look at conversion alongside rankings on every engagement, because seo marketing digital work only pays off when the page can close.'
  },
  {
    question: 'Czym właściwie jest SEO i skąd bierze się ta nazwa?',
    questionEn: 'What exactly is SEO, and where does the name come from?',
    answer: 'SEO to skrót od search engine optimization, czyli optymalizacji pod wyszukiwarki. Obejmuje trzy obszary: techniczny (czy wyszukiwarka może stronę zaindeksować i szybko wczytać), treściowy (czy strona odpowiada na intencję zapytania) oraz autorytet (czy inne serwisy się na nią powołują). Pominięcie któregokolwiek z nich zatrzymuje efekt pozostałych dwóch.',
    answerEn: 'The acronym stands for search engine optimisation. SEO covers three areas: the technical one - whether a search engine can index and quickly load the page; the content one - whether the page answers the intent behind the query; and authority - whether other sites cite it. Skipping any of the three caps what the other two can achieve. Put plainly: there is no shortcut in SEO. Search engine optimization compounds, which is why we plan in quarters rather than weeks.'
  },
  {
    question: 'Czy współpracujecie z zespołami in-house i innymi agencjami?',
    questionEn: 'Do you work with in-house teams and other agencies?',
    answer: 'Tak, w obu układach. Zespołom in-house zwykle przejmujemy część techniczną - audyt, architekturę informacji, poprawki wydajnościowe - a redakcja i kampanie zostają po ich stronie. Agencjom kreatywnym i mediowym dostarczamy warstwę wyszukiwarkową w modelu white-label, bez kontaktu z ich klientem końcowym. W obu przypadkach zakres i podział odpowiedzialności ustalamy na piśmie przed startem. Jeśli przejmujemy stronę po innej agencji, zaczynamy od checklisty z poradnika <a href="/zmiana-agencji-seo" style="text-decoration:underline">jak zmienić agencję SEO bez utraty pozycji</a>.',
    answerEn: 'Yes, in both setups. For in-house teams we usually take over the technical side - audits, information architecture and SEO services they have no spare capacity for - while editorial work and campaigns stay with them. For creative and media agencies we supply the search layer white-label, with no contact with their end client. Either way the scope and the split of responsibilities are agreed in writing before we start. Most partners who come to us already run digital marketing. SEO is simply the layer that makes everything else compound instead of resetting each time a budget stops.'
  },
  {
    // Nowe (PS1, OP-08): 49 słów + link 10; „seo dla małych firm” 70/mies. (frazy.csv, 4.11.2026).
    // Zakres SEO Standard = Pricing.jsx i FAQ cennika „Czym różnią się pakiety…”.
    id: 'czy-pozycjonowanie-ma-sens-dla-malej-firmy',
    tylkoPl: true,
    question: 'Czy pozycjonowanie ma sens dla małej firmy?',
    answer: 'Tak, jeśli klienci szukają Twojej usługi w Google. Mała firma zwykle zaczyna od SEO lokalnego i wizytówki Google, bo to najszybsze źródło pierwszych zapytań. SEO dla małych firm prowadzimy w pakiecie Standard: do 20 fraz, 2 treści i 2 linki miesięcznie, od 1 900 zł netto, z umową miesięczną (<a href="/cennik-pozycjonowania" style="text-decoration:underline">cennik pozycjonowania</a>).',
  }
];

// 5.11.2026 (ALT; OP-16): wszystkie 7 obrazów to tła bez związku z treścią karty, a alt PL był kopią
// H3 albo frazą („content marketing”). decorative: true = w PL alt="" i bez title (SubpagePortfolio.jsx).
// Nazwy plików i alty EN (imgAltEn, frazy strażnika /en/seo-services) bez zmian.
const portfolioCases = [
  {
    tag: 'SKALOWANIE SPRZEDAŻY',
    tagEn: 'SALES SCALING',
    title: 'Model Skalowania Leadów i Zapytań',
    titleEn: 'Lead and Inquiry Scaling Model',
    description: 'Strategiczna architektura informacji dla branż inżynieryjnych i usługowych. Model budowania autorytetu domeny od podstaw.',
    descriptionEn: 'As a search optimization agency for B2B companies with a client portal, we build strategic information architecture for engineering and service companies through our seo optimization service and search engine marketing work. A model for building domain authority from scratch.',
    image: '/images/content-marketing-unsplash-1693648793394-0b76b7eb042e.jpg',
    decorative: true,
    imageEn: '/images/search-engine-marketing-seo-optimization-agency.jpg',
    imgAlt: 'content marketing',
    imgAltEn: 'search optimization agency team',
    imgTitle: 'content marketing',
    imgTitleEn: 'search optimization agency results',
    metric: 'Leady',
    metricEn: 'Leads',
    metricLabel: 'Co mierzymy: zapytania z ruchu organicznego',
    metricLabelEn: 'What we track: enquiries from organic traffic',
    metric2: 'Ruch',
    metric2En: 'Traffic',
    metric2Label: 'Co mierzymy: kliknięcia w zapytaniach komercyjnych',
    metric2LabelEn: 'What we track: clicks on commercial queries'
  },
  {
    tag: 'MODEL LOCAL B2C',
    tagEn: 'LOCAL B2C MODEL',
    title: 'Wizytówki i strony lokalne dla sieci oddziałów',
    titleEn: 'Business Profiles and Local Pages for Branch Networks',
    description: 'Model dla firm z kilkoma oddziałami: osobna strona tylko dla lokalizacji z unikalną treścią (zespół, realizacje, dojazd, lokalne FAQ) i zweryfikowana wizytówka każdego oddziału. Nie tworzymy stron miejskich z podmienioną nazwą miasta.',
    descriptionEn: 'A model for companies with several branches: a separate page only for locations with unique content (team, projects, directions, local FAQ) and a verified profile for each branch. We do not create city pages with only the city name swapped.',
    image: '/images/unsplash-1710438399422-2fca27686bcd.jpg',
    decorative: true,
    imageEn: '/images/seo-for-agencies.jpg',
    imgAltEn: 'search engine marketing and local seo optimization for agencies',
    imgTitleEn: 'search engine marketing strategies for agencies businesses',
    metric: 'Wizytówka',
    metricEn: 'Profile',
    metricLabel: 'Zweryfikowana dla każdego oddziału',
    metricLabelEn: 'Verified for every branch',
    metric2: 'Treść',
    metric2En: 'Content',
    metric2Label: 'Unikalna dla każdej lokalizacji',
    metric2LabelEn: 'Unique to every location'
  },
  {
    tag: 'MODEL SAAS TECH',
    tagEn: 'SAAS TECH MODEL',
    title: 'Optymalizacja Pod Zapytania BOFU',
    titleEn: 'BOFU Query Optimization',
    description: 'Pozycjonowanie trudnych fraz kluczowych o najwyższej intencji zakupowej na rynku globalnym, napędzające wzrost stałych przychodów subskrypcyjnych.',
    descriptionEn: 'Positioning highly competitive keywords with the highest purchase intent globally, driving steady MRR growth.',
    image: '/images/unsplash-1557264322-b44d383a2906.jpg',
    decorative: true,
    imageEn: '/images/search-engine-optimisation-seo-and-digital-marketing-services.jpg',
    imgAltEn: 'Search engine optimisation and digital marketing SEO services dashboard',
    imgTitleEn: 'Search engine optimisation SEO digital marketing services results',
    metric: 'BOFU',
    metricEn: 'BOFU',
    metricLabel: 'Zapytania o najwyższej intencji zakupowej',
    metricLabelEn: 'Queries with the highest purchase intent',
    metric2: 'Przychód',
    metric2En: 'Revenue',
    metric2Label: 'Co mierzymy: subskrypcje z fraz BOFU',
    metric2LabelEn: 'What we track: subscriptions from BOFU queries'
  },
  {
    tag: 'MODEL PREMIUM',
    tagEn: 'PREMIUM MODEL',
    title: 'Budowanie Autorytetu i Digital PR',
    titleEn: 'Authority Building & Digital PR',
    description: 'Strategia pozyskiwania wartościowych odnośników editorialnych i budowania autorytetu domeny w segmentach marek premium.',
    descriptionEn: 'Strategy for acquiring valuable editorial links and building domain authority in premium brand segments.',
    image: '/images/unsplash-1567095751004-aa51a2690368.jpg',
    decorative: true,
    metric: 'Linki',
    metricEn: 'Links',
    metricLabel: 'Odnośniki redakcyjne, bez kupowania miejsc',
    metricLabelEn: 'Editorial links, no paid placements',
    metric2: 'Widoczność',
    metric2En: 'Visibility',
    metric2Label: 'Mierzona w Search Console',
    metric2LabelEn: 'Measured in Search Console'
  }
];

const carouselItems = [
  {
    number: '01 / WIDOCZNOŚĆ',
    numberEn: '01 / VISIBILITY',
    metric: 'Scenariusz',
    metricEn: 'Scenario',
    title: 'Ruch z zapytań komercyjnych (model)',
    titleEn: 'Commercial Traffic (model)',
    description: 'Model skalowania ruchu z zapytań o najwyższej intencji zakupowej w wyszukiwaniu semantycznym; liczby ustalamy dopiero po audycie, a wyniki mierzymy w Search Console.',
    descriptionEn: 'A model for scaling traffic from high-intent purchase queries using semantic search; we set numbers only after an audit and measure results in Search Console.',
    width: 'min(85vw, 480px)',
    minHeight: '380px'
  },
  {
    number: '02 / STRATEGIA',
    numberEn: '02 / STRATEGY',
    metric: 'TOP 3',
    title: 'Kluczowe frazy branżowe',
    titleEn: 'Key Industry Phrases',
    description: 'Wprowadzamy Twoje flagowe produkty i usługi na podium wyników organicznych wyszukiwarki Google - w 2-3 miesiące.',
    descriptionEn: 'We bring your flagship products and services to the podium of organic Google search results - within 2-3 months.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 / ARCHITEKTURA',
    numberEn: '03 / ARCHITECTURE',
    metric: 'Klastry',
    metricEn: 'Clusters',
    title: 'Topic Clusters & Authority',
    titleEn: 'Topic Clusters & Authority',
    description: 'Tworzymy klastry tematyczne odpowiadające na pytania użytkowników, budując autorytet domeny.',
    descriptionEn: 'We create topic clusters answering user questions, building domain authority.',
    width: 'min(80vw, 420px)',
    minHeight: '370px'
  },
  {
    number: '04 / AUTORYTET',
    numberEn: '04 / AUTHORITY',
    metric: 'Wysoki autorytet',
    metricEn: 'High authority',
    title: 'Jakościowy Link Building',
    titleEn: 'Quality Link Building',
    description: 'Pozyskujemy editorialne odnośniki z najbardziej cenionych polskich i zagranicznych portali biznesowych.',
    descriptionEn: 'We acquire editorial links from the most respected Polish and foreign business portals.',
    width: 'min(75vw, 360px)'
  }
];

export default async function PozycjonowanieStronPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <SeoFuerUnternehmenDe />;
  return (
    <>
      <ServiceSchema variant="pozycjonowanie" />
      <Header />
      <Breadcrumbs pl="Pozycjonowanie Stron Internetowych" en="SEO Services" />
      <PozycjonowanieClient faqData={faqData} portfolioCases={portfolioCases} carouselItems={carouselItems} />
      <Footer />
    </>
  );
}
