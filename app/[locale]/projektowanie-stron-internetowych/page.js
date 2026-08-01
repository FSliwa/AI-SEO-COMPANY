export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Web Design and Development | AI SEO COMPANY' : 'Projektowanie Stron Internetowych | Web Design dla Firm',
  description: locale === 'en' ? 'We create intuitive and visually stunning Headless websites based on Next.js. Laser-focused on maximizing ROI and UX.' : 'Profesjonalne projektowanie stron internetowych. Tworzymy ultraszybkie i piękne wizualnie strony na Next.js (Headless), skoncentrowane na maksymalizacji konwersji i UX.',
  alternates: {
    canonical: locale === 'en' ? `/en/web-design` : `/pl/projektowanie-stron-internetowych`,
    languages: {
      'pl': `/pl/projektowanie-stron-internetowych`,
      'en': `/en/web-design`
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProjektowanieClient from '@/components/ProjektowanieClient';

const faqWebDesign = [
  {
    question: 'Dlaczego strony w Next.js ładują się szybciej niż WordPress?',
    questionEn: 'Why do Next.js websites load faster than WordPress?',
    answer: 'Next.js wykorzystuje mechanizmy statycznego generowania (SSG) oraz renderowania po stronie serwera (SSR). Zamiast każdorazowo składać stronę z zapytań do bazy danych jak w WordPress, serwuje gotowe pliki prosto do przeglądarki klienta.',
    answerEn: 'Next.js uses Static Site Generation (SSG) and Server-Side Rendering (SSR). Instead of rebuilding the page from database queries every time like WordPress, it serves ready files straight to the client\'s browser.'
  },
  {
    question: 'Czy po zmianie strony nie spadną mi pozycje w Google?',
    questionEn: 'Will my Google rankings drop after changing the website?',
    answer: 'Przeprowadzamy bezpieczne migracje z zachowaniem struktury adresów URL lub tworzymy mapę przekierowań 301. Gwarantuje to zachowanie dotychczasowej widoczności, a nowa, szybsza architektura często wręcz podbija aktualne pozycje.',
    answerEn: 'We conduct safe migrations maintaining URL structures or creating a 301 redirect map. This guarantees maintaining current visibility, and the new, faster architecture often boosts current positions.'
  },
  {
    question: 'Czy zajmujecie się także identyfikacją wizualną (logo)?',
    questionEn: 'Do you also design visual identities (logos)?',
    answer: 'Tak. Nasze projekty zaczynamy często od całkowitego re-brandingu marki, włączając w to projektowanie księgi znaku, typografii i systemu kolorystycznego, by strona idealnie pasowała do nowego wizerunku.',
    answerEn: 'Yes. We often start our projects with a complete brand re-branding, including designing brand books, typography, and color systems so the website perfectly matches the new image.'
  }
];

const webDesignPortfolioCases = [
  {
    tag: 'SZYBKOŚĆ I WYDAJNOŚĆ',
    tagEn: 'SPEED & PERFORMANCE',
    title: 'Błyskawiczne Ładowanie Strony',
    titleEn: 'Lightning Fast Page Loading',
    description: 'Każda sekunda ładowania to utrata klientów. Projektujemy strony, które ładują się natychmiastowo, co drastycznie zmniejsza współczynnik odrzuceń i buduje zaufanie od pierwszego kliknięcia.',
    descriptionEn: 'Every second of loading means lost customers. We design sites that load instantly, drastically reducing bounce rates and building trust from the first click.',
    image: '/images/projektowanie-stron-internetowych-wydajnosc.jpg',
    imgAlt: 'Projektowanie stron internetowych - szybkość',
    imgTitle: 'Projektowanie stron internetowych - szybkość',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '0.3s',
    metricLabel: 'Czas reakcji',
    metricLabelEn: 'Response Time',
    metric2: '100/100',
    metric2Label: 'Ocena w Google',
    metric2LabelEn: 'Google Score'
  },
  {
    tag: 'SPÓJNY WIZERUNEK MARKI',
    tagEn: 'CONSISTENT BRAND IMAGE',
    title: 'Skalowalny System Projektowy',
    titleEn: 'Scalable Design System',
    description: 'Nie tworzymy przypadkowych układów. Budujemy spójny system wizualny (Design System), dzięki któremu Twoja marka wygląda niezwykle profesjonalnie i wzbudza autorytet w Twojej branży – zarówno w B2B, jak i e-commerce B2C.',
    descriptionEn: 'We don\'t create random layouts. We build a cohesive visual system (Design System) that makes your brand look highly professional and builds authority in your industry – in both B2B and B2C e-commerce.',
    image: '/images/unsplash-1566410824233-a8011929225c.jpg',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '100%',
    metricLabel: 'Spójność interfejsu',
    metricLabelEn: 'Interface Consistency',
    metric2: 'Premium',
    metric2Label: 'Odbiór marki',
    metric2LabelEn: 'Brand Perception'
  },
  {
    tag: 'BEZPIECZEŃSTWO',
    tagEn: 'SECURITY',
    title: 'Niezawodna Architektura Bez Wtyczek',
    titleEn: 'Reliable Architecture Without Plugins',
    description: 'Zapomnij o dziurawych systemach, ciągłych aktualizacjach i awariach. Nasze nowoczesne podejście oddziela treść od kodu, zapewniając pełną odporność na ataki i gwarantując bezawaryjne działanie.',
    descriptionEn: 'Forget about leaky systems, constant updates, and failures. Our modern approach separates content from code, ensuring full resistance to attacks and guaranteeing trouble-free operation.',
    image: '/images/unsplash-1678366633407-7f49da199a42.jpg',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '99.99%',
    metricLabel: 'Dostępność 24/7',
    metricLabelEn: 'Uptime 24/7',
    metric2: 'Zero',
    metric2Label: 'Awarii i wirusów',
    metric2LabelEn: 'Crashes & Viruses'
  },
  {
    tag: 'DOSTĘPNOŚĆ',
    tagEn: 'ACCESSIBILITY',
    title: 'Zgodność ze Standardami WCAG',
    titleEn: 'WCAG Standard Compliance',
    description: 'Twoja strona będzie przyjazna dla każdego. Tworzymy serwisy, które są czytelne, responsywne i spełniają restrykcyjne wymogi prawne dotyczące dostępności cyfrowej dla instytucji i korporacji.',
    descriptionEn: 'Your site will be friendly to everyone. We create services that are legible, responsive, and meet strict legal requirements for digital accessibility for institutions and corporations.',
    image: '/images/unsplash-1709377058964-929af7f2d02f.jpg',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: 'WCAG 2.1',
    metricLabel: 'Pełna zgodność',
    metricLabelEn: 'Full Compliance',
    metric2: '100%',
    metric2Label: 'Czytelność',
    metric2LabelEn: 'Readability'
  },
  {
    tag: 'ANIMACJE',
    tagEn: 'ANIMATIONS',
    title: 'Płynne i Nowoczesne Interakcje',
    titleEn: 'Fluid and Modern Interactions',
    description: 'Przykuwamy uwagę użytkowników subtelnymi, prestiżowymi animacjami, które ułatwiają nawigację i prowadzą klienta prosto do celu, bez zbędnego obciążania transferu danych.',
    descriptionEn: 'We grab users\' attention with subtle, prestigious animations that facilitate navigation and guide the customer straight to the goal, without unnecessarily burdening data transfer.',
    image: '/images/unsplash-1578662996442-48f60103fc96.jpg',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: '+45%',
    metricLabel: 'Więcej czasu na stronie',
    metricLabelEn: 'More time on site',
    metric2: 'Premium',
    metric2Label: 'Doświadczenie UX',
    metric2LabelEn: 'UX Experience'
  },
  {
    tag: 'OPTYMALIZACJA KONWERSJI (CRO)',
    tagEn: 'CONVERSION OPTIMIZATION (CRO)',
    title: 'Architektura Nakierowana na Sprzedaż',
    titleEn: 'Sales-Oriented Architecture',
    description: 'Projektowanie stron internetowych to dla nas inżynieria sprzedaży. Precyzyjnie planujemy układ elementów i wezwania do akcji (CTA), aby zminimalizować porzucenia i zmaksymalizować sprzedaż oraz ilość zapytań ofertowych.',
    descriptionEn: 'Website design is sales engineering for us. We precisely plan the layout of elements and calls to action (CTA) to minimize abandonment and maximize sales and inquiries.',
    image: '/images/unsplash-1585314062340-f1a5a7c9328d.jpg',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '+120%',
    metricLabel: 'Wzrost zapytań',
    metricLabelEn: 'Inquiry Growth',
    metric2: '-35%',
    metric2Label: 'Odrzucań',
    metric2LabelEn: 'Bounce Rate'
  }
];

const webDesignCarouselItems = [
  {
    number: '01 / WYDAJNOŚĆ',
    numberEn: '01 / PERFORMANCE',
    metric: '< 0.5s',
    title: 'Błyskawiczne Ładowanie',
    titleEn: 'Lightning Fast Loading',
    description: 'Szybkość działania, która zachwyca użytkowników i zapewnia najwyższe oceny od Google.',
    descriptionEn: 'Operating speed that delights users and ensures the highest ratings from Google.',
    width: 'min(85vw, 470px)',
    minHeight: '370px'
  },
  {
    number: '02 / UŻYTKOWNIK',
    numberEn: '02 / USER',
    metric: 'UX Premium',
    title: 'Zaufanie i Autorytet',
    titleEn: 'Trust and Authority',
    description: 'Projektujemy przejrzyste strony B2B, w których profesjonalny układ buduje wizerunek niezawodnego partnera biznesowego.',
    descriptionEn: 'We design clear B2B websites where professional layout builds the image of a reliable business partner.',
    width: 'min(75vw, 360px)'
  },
  {
    number: '03 / BEZPIECZEŃSTWO',
    numberEn: '03 / SECURITY',
    metric: '100%',
    title: 'Brak Awarji',
    titleEn: 'No Crashes',
    description: 'Bezpieczna technologia, która eliminuje ryzyko włamań znane z przestarzałych systemów szablonowych.',
    descriptionEn: 'Secure technology that eliminates the risk of hacks known from outdated template systems.',
    width: 'min(80vw, 430px)',
    minHeight: '380px'
  },
  {
    number: '04 / SEO READY',
    numberEn: '04 / SEO READY',
    metric: 'Zysk',
    metricEn: 'Profit',
    title: 'Więcej Zapytań',
    titleEn: 'More Inquiries',
    description: 'Gotowa technicznie infrastruktura pozycjonująca, która generuje organiczne zapytania do Twojej firmy.',
    descriptionEn: 'Technically ready SEO infrastructure that generates organic inquiries for your company.',
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
