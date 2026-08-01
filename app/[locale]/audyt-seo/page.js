export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Audit | SEO Consultancy & Search Engine Optimization Consultants' : 'Audyt SEO | Analiza i Optymalizacja SEO',
  description: locale === 'en' ? 'Looking for a search engine optimisation consultancy or seo consultancy? We offer comprehensive seo keyword analysis and SEO audit from top search engine optimization consultants. Improve your Google rankings.' : 'Kompleksowy audyt SEO. Znajdziemy błędy techniczne i wdrożymy skuteczną optymalizację SEO, która natychmiast poprawi pozycje Twojej strony w Google.',
  alternates: {
    canonical: locale === 'en' ? `/en/seo-audit` : `/pl/audyt-seo`,
    languages: {
      'pl': `/pl/audyt-seo`,
      'en': `/en/seo-audit`
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudytClient from '@/components/AudytClient';

const faqAudyt = [
  {
    question: 'Co zawiera profesjonalny audyt SEO?',
    questionEn: 'What does a professional SEO audit include?',
    answer: 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.',
    answerEn: 'An SEO audit covers over 50 checkpoints, including Core Web Vitals analysis, Google indexing, heading and URL structure, backlink profile, keyword research, and UX/CRO guidelines.'
  },
  {
    question: 'Ile trwa przygotowanie audytu SEO?',
    questionEn: 'How long does it take to prepare an SEO audit?',
    answer: 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.',
    answerEn: 'The standard completion time for a comprehensive SEO audit is 3 to 5 business days. After generating the report, we conduct a detailed consultation.'
  }
];

const auditCarouselItems = [
  {
    number: '01 / PRĘDKOŚĆ',
    numberEn: '01 / SPEED',
    metric: '99 / 100',
    title: 'PageSpeed & Core Web Vitals',
    titleEn: 'PageSpeed & Core Web Vitals',
    description: 'Usuwamy render-blocking JavaScript i wdrażamy kompresję zdjęć Next-Gen (WebP/AVIF).',
    descriptionEn: 'We eliminate render-blocking JavaScript and optimize WebP/AVIF image rendering.',
    width: 'min(85vw, 460px)'
  },
  {
    number: '02 / INDEKSACJA',
    numberEn: '02 / INDEXING',
    metric: '0 Błędów',
    metricEn: '0 Errors',
    title: 'Optymalizacja Crawl Budget',
    titleEn: 'Crawl Budget Optimization',
    description: 'Usuwamy pętle przekierowań, zduplikowane tagi canonical oraz podstrony ze statusem 404.',
    descriptionEn: 'We remove redirect loops, duplicated canonical tags, and 404 status subpages.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 / SEMANTYKA',
    numberEn: '03 / SEMANTICS',
    metric: 'HTML5',
    title: 'Hierarchia Nagłówków & Schema',
    titleEn: 'Heading Hierarchy & Schema',
    description: 'Układamy poprawną strukturę H1-H3 oraz wdrażamy mikrodane Schema.org.',
    descriptionEn: 'We structure proper H1-H3 hierarchy and implement Schema.org microdata.',
    width: 'min(80vw, 410px)'
  },
  {
    number: '04 / WYDAJNOŚĆ',
    numberEn: '04 / PERFORMANCE',
    metric: '< 0.5s',
    title: 'Czas Odpowiedzi Serwera (TTFB)',
    titleEn: 'Server Response Time (TTFB)',
    description: 'Wskazujemy rekomendacje serwerowe i wdrażamy szybki bufor Caching/CDN.',
    descriptionEn: 'We provide server recommendations and implement fast Caching/CDN buffers.',
    width: 'min(75vw, 360px)'
  }
];

const auditPortfolioCases = [
  {
    tag: 'PROBLEM 01 / INDEKSACJA',
    tagEn: 'PROBLEM 01 / INDEXING',
    title: 'Wyciek Crawl Budget i Błędy 404',
    titleEn: 'Crawl Budget Leak and 404 Errors',
    description: 'Wykryto ponad 20 000 zduplikowanych adresów URL oraz pętli przekierowań konsumujących budżet indeksowania. Eliminuje to kluczowe produkty z wyników wyszukiwania.',
    descriptionEn: 'Detected over 20,000 duplicated URLs and redirect loops consuming the indexing budget. This eliminates key products from search results.',
    image: '/images/audyt-seo-optymalizacja.jpg',
    imgAlt: 'Profesjonalny audyt SEO',
    imgTitle: 'Profesjonalny audyt SEO',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '-95%',
    metricLabel: 'Redukcja błędów',
    metricLabelEn: 'Error reduction',
    metric2: '+45%',
    metric2Label: 'Zaindeksowanych stron',
    metric2LabelEn: 'Indexed pages'
  },
  {
    tag: 'PROBLEM 02 / SPEED & CWV',
    tagEn: 'PROBLEM 02 / SPEED & CWV',
    title: 'Wolne Ładowanie LCP (8.2s)',
    titleEn: 'Slow LCP Loading (8.2s)',
    description: 'Zablokowany wątek główny przez niezoptymalizowany JavaScript oraz brak kompresji obrazów Next-Gen, powodujący ucieczkę 60% użytkowników mobilnych.',
    descriptionEn: 'Main thread blocked by unoptimized JavaScript and lack of Next-Gen image compression, causing 60% of mobile users to bounce.',
    image: '/images/unsplash-1541356665065-22676f35dd40.jpg',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '1.2s',
    metricLabel: 'Docelowy czas LCP',
    metricLabelEn: 'Target LCP time',
    metric2: '0.00',
    metric2Label: 'Przesunięć CLS',
    metric2LabelEn: 'CLS shifts'
  },
  {
    tag: 'PROBLEM 03 / DANE STRUKTURALNE',
    tagEn: 'PROBLEM 03 / STRUCTURED DATA',
    title: 'Brak Mikrodanych Schema.org',
    titleEn: 'Missing Schema.org Microdata',
    description: 'Brak oznaczeń semantycznych dla wyszukiwarek AI i Google (Rich Snippets), uniemożliwiający wyświetlanie ocen, cen i dostępności w wynikach Search.',
    descriptionEn: 'Lack of semantic markup for AI search engines and Google (Rich Snippets), preventing ratings, prices, and availability from showing in Search results.',
    image: '/images/unsplash-1597773150796-e5c14ebecbf5.jpg',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '100%',
    metricLabel: 'Pokrycia Schema',
    metricLabelEn: 'Schema coverage',
    metric2: '+35%',
    metric2Label: 'Wzrost CTR',
    metric2LabelEn: 'CTR increase'
  },
  {
    tag: 'PROBLEM 04 / TOKSYCZNE LINKI',
    tagEn: 'PROBLEM 04 / TOXIC LINKS',
    title: 'Ryzyko Filtrów Algorytmicznych',
    titleEn: 'Algorithmic Filter Risk',
    description: 'Wykrycie masowych przyrostów spamu i toksycznych domen odsyłających z filtrem depozycjonującym. Konieczność wdrożenia procedury Disavow Tool.',
    descriptionEn: 'Detection of massive spam spikes and toxic referring domains with a demotion filter. Necessitates implementing the Disavow Tool procedure.',
    image: '/images/unsplash-1602536052359-ef94c21c5948.jpg',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: '0',
    metricLabel: 'Toksycznych linków',
    metricLabelEn: 'Toxic links',
    metric2: '100%',
    metric2Label: 'Bezpieczny profil',
    metric2LabelEn: 'Safe profile'
  },
  {
    tag: 'PROBLEM 05 / KANIBALIZACJA',
    tagEn: 'PROBLEM 05 / CANNIBALIZATION',
    title: 'Duplikacja i Wewnętrzne Rywalizacje',
    titleEn: 'Duplication and Internal Competition',
    description: 'Wielokrotne podstrony rywalizujące o te same frazy kluczowe. Wykryto brak tagów kanonicznych (rel="canonical") oraz błędne parametry filtrowania.',
    descriptionEn: 'Multiple subpages competing for the same keywords. Missing canonical tags (rel="canonical") and incorrect filtering parameters detected.',
    image: '/images/unsplash-1608501821300-4f99e58bba77.jpg',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: 'TOP 3',
    metricLabel: 'Dla głównych fraz',
    metricLabelEn: 'For main keywords',
    metric2: '100%',
    metric2Label: 'Czystość kanoniczna',
    metric2LabelEn: 'Canonical purity'
  },
  {
    tag: 'PROBLEM 06 / SEMANTYKA HTML',
    tagEn: 'PROBLEM 06 / HTML SEMANTICS',
    title: 'Błędna Hierarchia Nagłówków H1-H3',
    titleEn: 'Incorrect H1-H3 Heading Hierarchy',
    description: 'Niewłaściwa struktura semantyczna HTML, brak opisów alternatywnych ALT w obrazach i puste tagi meta title uniemożliwiające zrozumienie intencji zapytania.',
    descriptionEn: 'Improper HTML semantic structure, missing ALT text in images, and empty meta title tags preventing the understanding of query intent.',
    image: '/images/unsplash-1694852860772-ec8598c72c15.jpg',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '100/100',
    metricLabel: 'Wskaźnik SEO',
    metricLabelEn: 'SEO Score',
    metric2: '+80%',
    metric2Label: 'Widoczności fraz',
    metric2LabelEn: 'Keyword visibility'
  }
];

export default function AudytSeoPage() {
  return (
    <>
      <Header />
      <AudytClient faqData={faqAudyt} portfolioCases={auditPortfolioCases} carouselItems={auditCarouselItems} />
      <Footer />
    </>
  );
}
