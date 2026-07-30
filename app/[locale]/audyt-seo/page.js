export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: 'Audyt SEO | Analiza i optymalizacja | AI SEO COMPANY',
  description: 'Kompleksowy audyt SEO. Znajdziemy błędy techniczne na Twojej stronie i przygotujemy strategię, która natychmiast poprawi Twoje pozycje w Google.',
  alternates: {
    canonical: `/${locale}/audyt-seo`,
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AudytClient from '@/components/AudytClient';

const faqAudyt = [
  {
    question: 'Co zawiera profesjonalny audyt SEO?',
    answer: 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.'
  },
  {
    question: 'Ile trwa przygotowanie audytu SEO?',
    answer: 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.'
  }
];

const auditCarouselItems = [
  {
    number: '01 / PRĘDKOŚĆ',
    metric: '99 / 100',
    title: 'PageSpeed & Core Web Vitals',
    description: 'Eliminujemy blokujący kod JavaScript i optymalizujemy renderowanie obrazów WebP/AVIF.',
    width: 'min(85vw, 460px)'
  },
  {
    number: '02 / INDEKSACJA',
    metric: '0 Błędów',
    title: 'Optymalizacja Crawl Budget',
    description: 'Usuwamy pętle przekierowań, zduplikowane tagi canonical oraz podstrony ze statusem 404.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 / SEMANTYKA',
    metric: 'HTML5',
    title: 'Hierarchia Nagłówków & Schema',
    description: 'Układamy poprawną strukturę H1-H3 oraz wdrażamy mikrodane Schema.org.',
    width: 'min(80vw, 410px)'
  },
  {
    number: '04 / WYDAJNOŚĆ',
    metric: '< 0.5s',
    title: 'Czas Odpowiedzi Serwera (TTFB)',
    description: 'Wskazujemy rekomendacje serwerowe i wdrażamy szybki bufor Caching/CDN.',
    width: 'min(75vw, 360px)'
  }
];

const auditPortfolioCases = [
  {
    tag: 'PROBLEM 01 / INDEKSACJA',
    title: 'Wyciek Crawl Budget i Błędy 404',
    description: 'Wykryto ponad 20 000 zduplikowanych adresów URL oraz pętli przekierowań konsumujących budżet indeksowania. Eliminuje to kluczowe produkty z wyników wyszukiwania.',
    image: '/images/unsplash-1599422314077-f4dfdaa4cd09.jpg',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '-95%',
    metricLabel: 'Redukcja błędów',
    metric2: '+45%',
    metric2Label: 'Zaindeksowanych stron'
  },
  {
    tag: 'PROBLEM 02 / SPEED & CWV',
    title: 'Wolne Ładowanie LCP (8.2s)',
    description: 'Zablokowany wątek główny przez niezoptymalizowany JavaScript oraz brak kompresji obrazów Next-Gen, powodujący ucieczkę 60% użytkowników mobilnych.',
    image: '/images/unsplash-1541356665065-22676f35dd40.jpg',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '1.2s',
    metricLabel: 'Docelowy czas LCP',
    metric2: '0.00',
    metric2Label: 'Przesunięć CLS'
  },
  {
    tag: 'PROBLEM 03 / DANE STRUKTURALNE',
    title: 'Brak Mikrodanych Schema.org',
    description: 'Brak oznaczeń semantycznych dla wyszukiwarek AI i Google (Rich Snippets), uniemożliwiający wyświetlanie ocen, cen i dostępności w wynikach Search.',
    image: '/images/unsplash-1597773150796-e5c14ebecbf5.jpg',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '100%',
    metricLabel: 'Pokrycia Schema',
    metric2: '+35%',
    metric2Label: 'Wzrost CTR'
  },
  {
    tag: 'PROBLEM 04 / TOKSYCZNE LINKI',
    title: 'Ryzyko Filtrów Algorytmicznych',
    description: 'Wykrycie masowych przyrostów spamu i toksycznych domen odsyłających z filtrem depozycjonującym. Konieczność wdrożenia procedury Disavow Tool.',
    image: '/images/unsplash-1602536052359-ef94c21c5948.jpg',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: '0',
    metricLabel: 'Toksycznych linków',
    metric2: '100%',
    metric2Label: 'Bezpieczny profil'
  },
  {
    tag: 'PROBLEM 05 / KANIBALIZACJA',
    title: 'Duplikacja i Wewnętrzne Rywalizacje',
    description: 'Wielokrotne podstrony rywalizujące o te same frazy kluczowe. Wykryto brak tagów kanonicznych (rel="canonical") oraz błędne parametry filtrowania.',
    image: '/images/unsplash-1608501821300-4f99e58bba77.jpg',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: 'TOP 3',
    metricLabel: 'Dla głównych fraz',
    metric2: '100%',
    metric2Label: 'Czystość kanoniczna'
  },
  {
    tag: 'PROBLEM 06 / SEMANTYKA HTML',
    title: 'Błędna Hierarchia Nagłówków H1-H3',
    description: 'Niewłaściwa struktura semantyczna HTML, brak opisów alternatywnych ALT w obrazach i puste tagi meta title uniemożliwiające zrozumienie intencji zapytania.',
    image: '/images/unsplash-1694852860772-ec8598c72c15.jpg',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '100/100',
    metricLabel: 'Wskaźnik SEO',
    metric2: '+80%',
    metric2Label: 'Widoczności fraz'
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
