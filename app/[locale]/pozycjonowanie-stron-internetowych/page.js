export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Search Engine Marketing, SEO Optimization & Optimisation Agency' : 'Pozycjonowanie Stron Internetowych | SEO dla Firm B2B',
  description: locale === 'en' ? 'Top SEO optimization and search engine marketing agency. We offer expert search engine optimisation, SEO digital marketing, and content in marketing services.' : 'Kompleksowe pozycjonowanie stron internetowych. Oferujemy skuteczne pozycjonowanie stron i pełną optymalizację SEO, zdobywając dla Ciebie najwyższe',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/seo-services' : 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
      'x-default': 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
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
  }
];

const portfolioCases = [
  {
    tag: 'SKALOWANIE SPRZEDAŻY',
    tagEn: 'SALES SCALING',
    title: 'Model Skalowania Leadów i Zapytań',
    titleEn: 'Lead and Inquiry Scaling Model',
    description: 'Strategiczna architektura informacji dla branż inżynieryjnych, usługowych i e-commerce. Model budowania wysokiej autorytatywności domeny od podstaw.',
    descriptionEn: 'As a top <strong>search optimization agency</strong>, we build strategic information architecture for engineering, services, and e-commerce. A model for building high domain authority from scratch.',
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
    descriptionEn: 'Topic Clusters strategy for an online store powered by our <strong>seo optimization service</strong>. A model eliminating keyword cannibalization and lowering Customer Acquisition Cost (CAC).',
    image: '/images/unsplash-1533134486753-c833f0ed4866.jpg',
    imageEn: '/images/search-optimization-agency-seo-digital-marketing.jpg',
    imgAltEn: 'seo optimization agency growth chart',
    imgTitleEn: 'seo optimization agency performance metrics',
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
    imageEn: '/images/seo-search-engine-optimization-services.jpg',
    imgAltEn: 'search engine marketing and local seo optimization',
    imgTitleEn: 'search engine marketing strategies for businesses',
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
    imageEn: '/images/search-engine-optimisation-seo-digital-marketing.jpg',
    imgAltEn: 'search engine optimisation seo and digital marketing seo',
    imgTitleEn: 'search engine optimisation seo digital marketing expert team working',
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
    descriptionEn: 'Multilingual technical audit and content cluster expansion generating high demand in European markets through our <strong>search engine marketing</strong>.',
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
