export const metadata = {
  title: 'Projektowanie Stron Internetowych | Web Design dla Firm',
  description: 'Tworzymy ultraszybkie i piękne wizualnie strony na Next.js (Headless). Skoncentrowane na maksymalizacji UX i konwersji.',
  alternates: {
    canonical: '/projektowanie-stron-internetowych',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjektowanieClient from '@/components/ProjektowanieClient';

const faqWebDesign = [
  {
    question: 'Dlaczego strony w Next.js ładują się szybciej niż WordPress?',
    answer: 'Next.js wykorzystuje mechanizmy statycznego generowania (SSG) oraz renderowania po stronie serwera (SSR). Zamiast każdorazowo składać stronę z zapytań do bazy danych jak w WordPress, serwuje gotowe pliki prosto do przeglądarki klienta.'
  },
  {
    question: 'Czy po zmianie strony nie spadną mi pozycje w Google?',
    answer: 'Przeprowadzamy bezpieczne migracje z zachowaniem struktury adresów URL lub tworzymy mapę przekierowań 301. Gwarantuje to zachowanie dotychczasowej widoczności, a nowa, szybsza architektura często wręcz podbija aktualne pozycje.'
  },
  {
    question: 'Czy zajmujecie się także identyfikacją wizualną (logo)?',
    answer: 'Tak. Nasze projekty zaczynamy często od całkowitego re-brandingu marki, włączając w to projektowanie księgi znaku, typografii i systemu kolorystycznego, by strona idealnie pasowała do nowego wizerunku.'
  }
];

const webDesignPortfolioCases = [
  {
    tag: 'SZYBKOŚĆ I WYDAJNOŚĆ',
    title: 'Błyskawiczne Ładowanie Strony',
    description: 'Każda sekunda ładowania to utrata klientów. Projektujemy strony, które ładują się natychmiastowo, co drastycznie zmniejsza współczynnik odrzuceń i buduje zaufanie od pierwszego kliknięcia.',
    image: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '0.3s',
    metricLabel: 'Czas reakcji',
    metric2: '100/100',
    metric2Label: 'Ocena w Google'
  },
  {
    tag: 'SPÓJNY WIZERUNEK MARKI',
    title: 'Skalowalny System Projektowy',
    description: 'Nie tworzymy przypadkowych układów. Budujemy spójny system wizualny (Design System), dzięki któremu Twoja marka wygląda niezwykle profesjonalnie i wzbudza autorytet w segmencie B2B.',
    image: 'https://images.unsplash.com/photo-1566410824233-a8011929225c?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '100%',
    metricLabel: 'Spójność interfejsu',
    metric2: 'Premium',
    metric2Label: 'Odbiór marki'
  },
  {
    tag: 'BEZPIECZEŃSTWO',
    title: 'Niezawodna Architektura Bez Wtyczek',
    description: 'Zapomnij o dziurawych systemach, ciągłych aktualizacjach i awariach. Nasze nowoczesne podejście oddziela treść od kodu, zapewniając pełną odporność na ataki i gwarantując bezawaryjne działanie.',
    image: 'https://images.unsplash.com/photo-1678366633407-7f49da199a42?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '99.99%',
    metricLabel: 'Dostępność 24/7',
    metric2: 'Zero',
    metric2Label: 'Awarii i wirusów'
  },
  {
    tag: 'DOSTĘPNOŚĆ',
    title: 'Zgodność ze Standardami WCAG',
    description: 'Twoja strona będzie przyjazna dla każdego. Tworzymy serwisy, które są czytelne, responsywne i spełniają restrykcyjne wymogi prawne dotyczące dostępności cyfrowej dla instytucji i korporacji.',
    image: 'https://images.unsplash.com/photo-1709377058964-929af7f2d02f?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: 'WCAG 2.1',
    metricLabel: 'Pełna zgodność',
    metric2: '100%',
    metric2Label: 'Czytelność'
  },
  {
    tag: 'ANIMACJE',
    title: 'Płynne i Nowoczesne Interakcje',
    description: 'Przykuwamy uwagę użytkowników subtelnymi, prestiżowymi animacjami, które ułatwiają nawigację i prowadzą klienta prosto do celu, bez zbędnego obciążania transferu danych.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: '+45%',
    metricLabel: 'Więcej czasu na stronie',
    metric2: 'Premium',
    metric2Label: 'Doświadczenie UX'
  },
  {
    tag: 'OPTYMALIZACJA KONWERSJI (CRO)',
    title: 'Architektura Nakierowana na Sprzedaż',
    description: 'Projektowanie stron internetowych to dla nas inżynieria sprzedaży. Precyzyjnie planujemy układ elementów i wezwania do akcji (CTA), aby zminimalizować porzucenia i zmaksymalizować ilość leadów B2B.',
    image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '+120%',
    metricLabel: 'Wzrost zapytań',
    metric2: '-35%',
    metric2Label: 'Odrzucań'
  }
];

const webDesignCarouselItems = [
  {
    number: '01 / WYDAJNOŚĆ',
    metric: '< 0.5s',
    title: 'Błyskawiczne Ładowanie',
    description: 'Szybkość działania, która zachwyca użytkowników i zapewnia najwyższe oceny od Google.',
    width: 'min(85vw, 470px)',
    minHeight: '370px'
  },
  {
    number: '02 / UŻYTKOWNIK',
    metric: 'UX Premium',
    title: 'Zaufanie i Autorytet',
    description: 'Projektujemy przejrzyste strony B2B, w których profesjonalny układ buduje wizerunek niezawodnego partnera biznesowego.',
    width: 'min(75vw, 360px)'
  },
  {
    number: '03 / BEZPIECZEŃSTWO',
    metric: '100%',
    title: 'Brak Awarji',
    description: 'Bezpieczna technologia, która eliminuje ryzyko włamań znane z przestarzałych systemów szablonowych.',
    width: 'min(80vw, 430px)',
    minHeight: '380px'
  },
  {
    number: '04 / SEO READY',
    metric: 'Zysk',
    title: 'Więcej Zapytań',
    description: 'Gotowa technicznie infrastruktura pozycjonująca, która generuje organiczne zapytania do Twojej firmy.',
    width: 'min(75vw, 370px)'
  }
];

export default function ProjektowanieStronPage() {
  return (
    <>
      <Header />
      <ProjektowanieClient faqData={faqWebDesign} portfolioCases={webDesignPortfolioCases} carouselItems={webDesignCarouselItems} />
      <Footer />
    </>
  );
}
