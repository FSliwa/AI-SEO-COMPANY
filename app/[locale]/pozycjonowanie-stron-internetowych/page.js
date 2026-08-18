export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Optimization Services & Digital Marketing for Agencies' : 'Pozycjonowanie Stron Internetowych | SEO dla Firm B2B',
  description: locale === 'en' ? 'SEO optimization service and search engine marketing for B2B companies and agencies. Content marketing strategy and SEO digital marketing for growth. Your search engine optimisation agency.' : 'Kompleksowe pozycjonowanie stron internetowych. Skuteczne pozycjonowanie stron i pełna optymalizacja SEO — zdobywamy najwyższe pozycje w Google.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-services' : 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
      'x-default': 'https://www.ai-seo-company.pl/en/seo-services',
      'en': 'https://www.ai-seo-company.pl/en/seo-services'
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PozycjonowanieClient from '@/components/PozycjonowanieClient';

const faqData = [
  {
    question: 'Ile trwa pozycjonowanie stron internetowych?',
    questionEn: 'How long does website optimization take?',
    answer: 'Pierwsze efekty wzrostu widoczności pojawiają się po 4-8 tygodniach od optymalizacji technicznej. Ustabilizowane wysokie pozycje na konkurencyjne frazy kluczowe buduje się zazwyczaj w horyzoncie 3 do 6 miesięcy.',
    answerEn: 'The first effects of visibility growth appear 4-8 weeks after technical optimization. Stabilized high rankings for competitive keywords are typically built over a 3 to 6 month horizon.'
  },
  {
    question: 'Czym różni się pozycjonowanie z AI od tradycyjnego SEO?',
    questionEn: 'How does AI-driven strategy differ from traditional methods?',
    answer: 'Analizujemy zapytania użytkowników w kontekście intencji wyszukiwania (Search Intent) oraz wyszukiwania semantycznego (LLM Search), optymalizując treści pod kątem tradycyjnego Google oraz wyszukiwarek AI (ChatGPT, Perplexity).',
    answerEn: 'We analyze user queries in the context of Search Intent and semantic search (LLM Search), optimizing content for both traditional Google and AI search engines (ChatGPT, Perplexity).'
  },
  {
    question: 'Czy pozycjonowanie stron gwarantuje pozycję nr 1 w Google?',
    questionEn: 'Do you guarantee the #1 position on Google search?',
    answer: 'Żadna uczciwa agencja nie gwarantuje statycznej pozycji nr 1 ze względu na zmienność algorytmów Google. Gwarantujemy natomiast stały wzrost widoczności, jakościowego ruchu oraz optymalizację współczynnika konwersji (CRO).',
    answerEn: 'No honest agency guarantees a static #1 position due to the volatility of Google\'s algorithms. However, we guarantee steady growth in visibility, quality traffic, and conversion rate optimization (CRO).'
  },
  {
    question: 'Czym różni się pozycjonowanie od marketingu cyfrowego?',
    questionEn: 'What is the difference between SEO and digital marketing?',
    answer: 'Marketing cyfrowy to całość działań w kanałach online — reklama płatna, social media, e-mail, treści. Pozycjonowanie jest jednym z tych kanałów i odpowiada wyłącznie za widoczność w wynikach wyszukiwania. Różnica praktyczna dotyczy horyzontu: reklama przestaje przynosić kliknięcia w dniu wyłączenia budżetu, a pozycje zbudowane organicznie pracują dalej. Dlatego traktujemy oba kanały jako uzupełniające się, a nie konkurencyjne.',
    answerEn: 'Digital marketing covers everything you do in online channels — paid ads, social, e-mail, content. SEO is one of those channels and answers only for visibility in search results. The practical difference is the horizon: paid stops delivering clicks the day the budget stops, while positions built organically keep working. That is why we treat SEO and digital marketing as complementary rather than competing, and why a plan combining search engine optimization and marketing usually beats either one on its own.'
  },
  {
    question: 'Czy pozycjonowanie ma sens bez pozostałych działań marketingowych?',
    questionEn: 'Does SEO make sense without the rest of your marketing?',
    answer: 'Ma, ale wolniej. Ruch z wyszukiwarki trafia na stronę, która musi go przekonać — jeśli oferta, dowody społeczne i ścieżka kontaktu są słabe, wyższa pozycja podniesie liczbę wizyt, a nie liczbę zapytań. Dlatego przy każdym wdrożeniu patrzymy również na konwersję, a nie wyłącznie na pozycje.',
    answerEn: 'It does, but more slowly. Search traffic lands on a page that still has to convince — if the offer, the proof and the contact path are weak, a higher position raises visits rather than enquiries. Good SEO and marketing therefore get planned together: we look at conversion alongside rankings on every engagement, because seo marketing digital work only pays off when the page can close.'
  },
  {
    question: 'Czym właściwie jest SEO i skąd bierze się ta nazwa?',
    questionEn: 'What exactly is SEO, and where does the name come from?',
    answer: 'SEO to skrót od search engine optimization, czyli optymalizacji pod wyszukiwarki. Obejmuje trzy obszary: techniczny (czy wyszukiwarka może stronę zaindeksować i szybko wczytać), treściowy (czy strona odpowiada na intencję zapytania) oraz autorytet (czy inne serwisy się na nią powołują). Pominięcie któregokolwiek z nich zatrzymuje efekt pozostałych dwóch.',
    answerEn: 'The acronym stands for search engine optimisation. SEO covers three areas: the technical one — whether a search engine can index and quickly load the page; the content one — whether the page answers the intent behind the query; and authority — whether other sites cite it. Skipping any of the three caps what the other two can achieve. Put plainly: there is no shortcut in SEO. Search engine optimization compounds, which is why we plan in quarters rather than weeks.'
  },
  {
    question: 'Czy współpracujecie z zespołami in-house i innymi agencjami?',
    questionEn: 'Do you work with in-house teams and other agencies?',
    answer: 'Tak, w obu układach. Zespołom in-house zwykle przejmujemy część techniczną — audyt, architekturę informacji, poprawki wydajnościowe — a redakcja i kampanie zostają po ich stronie. Agencjom kreatywnym i mediowym dostarczamy warstwę wyszukiwarkową w modelu white-label, bez kontaktu z ich klientem końcowym. W obu przypadkach zakres i podział odpowiedzialności ustalamy na piśmie przed startem.',
    answerEn: 'Yes, in both setups. For in-house teams we usually take over the technical side — audits, information architecture and SEO services they have no spare capacity for — while editorial work and campaigns stay with them. For creative and media agencies we supply the search layer white-label, with no contact with their end client. Either way the scope and the split of responsibilities are agreed in writing before we start. Most partners who come to us already run digital marketing. SEO is simply the layer that makes everything else compound instead of resetting each time a budget stops.'
  }
];

const portfolioCases = [
  {
    tag: 'SKALOWANIE SPRZEDAŻY',
    tagEn: 'SALES SCALING',
    title: 'Model Skalowania Leadów i Zapytań',
    titleEn: 'Lead and Inquiry Scaling Model',
    description: 'Strategiczna architektura informacji dla branż inżynieryjnych, usługowych i e-commerce. Model budowania wysokiej autorytatywności domeny od podstaw.',
    descriptionEn: 'As a top search optimization agency, we build strategic information architecture for engineering, services, and e-commerce. A model for building high domain authority from scratch.',
    image: '/images/content-marketing-unsplash-1693648793394-0b76b7eb042e.jpg',
    imageEn: '/images/search-engine-marketing-seo-optimization-agency.jpg',
    imgAlt: 'content marketing',
    imgAltEn: 'search optimization agency team',
    imgTitle: 'content marketing',
    imgTitleEn: 'search optimization agency results',
    metric: '+362%',
    metricLabel: 'Wzrost leadów organicznych',
    metricLabelEn: 'Organic leads growth',
    metric2: '+520%',
    metric2Label: 'Wzrost ruchu komercyjnego',
    metric2LabelEn: 'Commercial traffic growth'
  },
  {
    tag: 'MODEL E-COMMERCE',
    tagEn: 'E-COMMERCE MODEL',
    title: 'Struktura Klastrowa w Fashion',
    titleEn: 'Cluster Structure in Fashion',
    description: 'Strategia Topic Clusters dla sklepu internetowego. Model eliminujący kanibalizację słów kluczowych i obniżający koszt pozyskania klienta (CAC).',
    descriptionEn: 'Topic Clusters strategy for an online store powered by our seo optimization service. A model eliminating keyword cannibalization and lowering Customer Acquisition Cost (CAC).',
    image: '/images/unsplash-1533134486753-c833f0ed4866.jpg',
    imageEn: '/images/content-in-marketing-seo-agency.jpg',
    imgAltEn: 'Content in marketing strategy for SEO company growth',
    imgTitleEn: 'SEO company content marketing optimization results',
    metric: '-58%',
    metricLabel: 'Obniżenie kosztu pozyskania (CAC)',
    metricLabelEn: 'CAC Reduction',
    metric2: '+310%',
    metric2Label: 'Wzrost przychodu z SEO',
    metric2LabelEn: 'SEO Revenue Growth'
  },
  {
    tag: 'MODEL LOCAL B2C',
    tagEn: 'LOCAL B2C MODEL',
    title: 'Skalowanie Podstron Geolokalizacyjnych',
    titleEn: 'Scaling Geolocation Subpages',
    description: 'Model pozycji dla sieci wielooddziałowych na ponad 20 miast w Polsce dzięki zoptymalizowanej strukturze podstron oraz wizytówek profilu Google.',
    descriptionEn: 'Ranking model for multi-branch networks across 20+ cities in Poland thanks to optimized subpage structures and Google Business Profiles.',
    image: '/images/unsplash-1710438399422-2fca27686bcd.jpg',
    imageEn: '/images/seo-for-agencies.jpg',
    imgAltEn: 'search engine marketing and local seo optimization for agencies',
    imgTitleEn: 'search engine marketing strategies for agencies businesses',
    metric: '+280%',
    metricLabel: 'Wzrost zapytań lokalnych',
    metricLabelEn: 'Local Inquiries Growth',
    metric2: '+410%',
    metric2Label: 'Wyświetleń w Google Maps',
    metric2LabelEn: 'Google Maps Impressions'
  },
  {
    tag: 'MODEL SAAS TECH',
    tagEn: 'SAAS TECH MODEL',
    title: 'Optymalizacja Pod Zapytania BOFU',
    titleEn: 'BOFU Query Optimization',
    description: 'Pozycjonowanie trudnych fraz kluczowych o najwyższym inteńcie zakupowym na rynku globalnym, napędzające wzrost stałych przychodów subskrypcyjnych.',
    descriptionEn: 'Positioning highly competitive keywords with the highest purchase intent globally, driving steady MRR growth.',
    image: '/images/unsplash-1557264322-b44d383a2906.jpg',
    imageEn: '/images/search-engine-optimisation-seo-and-digital-marketing-services.jpg',
    imgAltEn: 'Search engine optimisation and digital marketing SEO services dashboard',
    imgTitleEn: 'Search engine optimisation SEO digital marketing services results',
    metric: '+140%',
    metricLabel: 'Skok przychodów (MRR)',
    metricLabelEn: 'MRR Jump',
    metric2: '-35%',
    metric2Label: 'Spadek współczynnika odrzuceń',
    metric2LabelEn: 'Bounce Rate Decrease'
  },
  {
    tag: 'MODEL FINTECH',
    tagEn: 'FINTECH MODEL',
    title: 'Mapowanie Intencji i Lejka Konwersji',
    titleEn: 'Intent Mapping & Conversion Funnel',
    description: 'Precyzyjna architektura treści odpowiadająca na zapytania użytkowników na każdym etapie decyzji finansowej, zmniejszająca koszty konwersji.',
    descriptionEn: 'Precise content architecture answering user queries at every stage of the financial decision, reducing conversion costs.',
    image: '/images/unsplash-1678366633407-7f49da199a42.jpg',
    metric: '-48%',
    metricLabel: 'Redukcja kosztu konwersji',
    metricLabelEn: 'Conversion Cost Reduction',
    metric2: '+290%',
    metric2Label: 'Nowych kont organicznie',
    metric2LabelEn: 'New Organic Accounts'
  },
  {
    tag: 'MODEL LOGISTICS & RETAIL',
    tagEn: 'LOGISTICS & RETAIL MODEL',
    title: 'Wielojęzyczna Struktura SEO',
    titleEn: 'Multilingual SEO Structure',
    description: 'Wielojęzyczny audyt techniczny oraz rozbudowa klastrów treści generująca wysoki popyt na rynkach europejskich.',
    descriptionEn: 'Multilingual technical audit and content cluster expansion generating high demand in European markets through our search engine marketing.',
    image: '/images/unsplash-1526289034009-0240ddb68ce3.jpg',
    metric: '+380%',
    metricLabel: 'Zapytań ofertowych i sprzedaży',
    metricLabelEn: 'Inquiries and Sales',
    metric2: '+540%',
    metric2Label: 'Ruchu z rynków zagranicznych',
    metric2LabelEn: 'Foreign Market Traffic'
  },
  {
    tag: 'MODEL PREMIUM',
    tagEn: 'PREMIUM MODEL',
    title: 'Budowanie Autorytetu i Digital PR',
    titleEn: 'Authority Building & Digital PR',
    description: 'Strategia pozyskiwania wartościowych odnośników editorialnych i budowania autorytetu domeny w segmentach marek premium.',
    descriptionEn: 'Strategy for acquiring valuable editorial links and building domain authority in premium brand segments.',
    image: '/images/unsplash-1567095751004-aa51a2690368.jpg',
    metric: '+180%',
    metricLabel: 'Wzrost autorytetu domeny (DR)',
    metricLabelEn: 'Domain Authority (DR) Growth',
    metric2: '+320%',
    metric2Label: 'Ogólnej widoczności fraz',
    metric2LabelEn: 'Overall Keyword Visibility'
  }
];

const carouselItems = [
  {
    number: '01 / WIDOCZNOŚĆ',
    numberEn: '01 / VISIBILITY',
    metric: '+362%',
    title: 'Wzrost ruchu komercyjnego',
    titleEn: 'Commercial Traffic Growth',
    description: 'Błyskawiczne skalowanie ruchu z zapytań o najwyższej intencji zakupowej w modelu wyszukiwania semantycznego.',
    descriptionEn: 'Rapid scaling of traffic from high-intent purchase queries using semantic search models.',
    width: 'min(85vw, 480px)',
    minHeight: '380px'
  },
  {
    number: '02 / STRATEGIA',
    numberEn: '02 / STRATEGY',
    metric: 'TOP 3',
    title: 'Kluczowe frazy branżowe',
    titleEn: 'Key Industry Phrases',
    description: 'Wprowadzamy Twoje flagowe produkty i usługi na podium wyników organicznych wyszukiwarki Google.',
    descriptionEn: 'We bring your flagship products and services to the podium of organic Google search results.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 / ARCHITEKTURA',
    numberEn: '03 / ARCHITECTURE',
    metric: '100%',
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
    metric: 'High DR',
    title: 'Jakościowy Link Building',
    titleEn: 'Quality Link Building',
    description: 'Pozyskujemy editorialne odnośniki z najbardziej cenionych polskich i zagranicznych portali biznesowych.',
    descriptionEn: 'We acquire editorial links from the most respected Polish and foreign business portals.',
    width: 'min(75vw, 360px)'
  }
];

export default async function PozycjonowanieStronPage({ params }) {
  const { locale } = await params;
  return (
    <>
      <Header />
      <PozycjonowanieClient faqData={faqData} portfolioCases={portfolioCases} carouselItems={carouselItems} />
      <Footer />
    </>
  );
}
