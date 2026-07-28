export const metadata = {
  title: 'Projektowanie Stron Internetowych | Nowoczesny Web Design — AI SEO COMPANY',
  description: 'Tworzymy ultraszybkie i piękne wizualnie strony na Next.js (Headless). Skoncentrowane na maksymalizacji UX i konwersji.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import ServiceBlogGrid from '@/components/service/ServiceBlogGrid';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

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
    tag: 'MODEL HEADLESS ARCHITECTURE',
    title: 'Model Headless CMS & Next.js App Router',
    description: 'Rozdzielenie warstwy prezentacji od logiki biznesowej. Wykorzystanie Next.js React Server Components, ISR (Incremental Static Regeneration) oraz mikroserwisowego CMS dla natychmiastowego ładowania.',
    image: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '0.3s',
    metricLabel: 'Czas odpowiedzi (TTFB)',
    metric2: '100/100',
    metric2Label: 'Score Google Lighthouse'
  },
  {
    tag: 'MODEL DESIGN SYSTEM & ATOMIC',
    title: 'System Projektowy i Architektura Atomowa',
    description: 'Skalowalny system komponentów oparty na metodologii Atomic Design. Tworzenie spójnych tokenów projektowych (CSS variables, typografia, spacing, dark mode), eliminujące dług technologiczny.',
    image: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '100%',
    metricLabel: 'Spójność interfejsu (UI)',
    metric2: '-60%',
    metric2Label: 'Czas wdrażania zmian'
  },
  {
    tag: 'MODEL SPEED & PERFORMANCE',
    title: 'Optymalizacja Edge Rendering & Hydration',
    description: 'Serwerowe renderowanie na krawędzi sieci (Vercel Edge Functions), selektywne nawadnianie komponentów (Selective Hydration) oraz bezstratna kompresja mediów w formacie AVIF/WebP.',
    image: 'https://images.unsplash.com/photo-1633167606207-d840b5070fc2?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '0.4s',
    metricLabel: 'Największe wyrenderowanie LCP',
    metric2: '0.00',
    metric2Label: 'Przesunięć układowych CLS'
  },
  {
    tag: 'MODEL ACCESSIBILITY & A11Y',
    title: 'Standardy Dostępności WCAG 2.1 AA & Semantic DOM',
    description: 'Pełna zgodność ze standardami WCAG 2.1 AA i bezbłędna semantyka HTML5. Optymalizacja nawigacji klawiaturą, atrybuty ARIA i podwyższony kontrast dla czytników ekranowych.',
    image: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #EA580C 100%)',
    metric: '100%',
    metricLabel: 'Zgodność z WCAG 2.1 AA',
    metric2: '100/100',
    metric2Label: 'Wskaźnik Accessibility'
  },
  {
    tag: 'MODEL ANIMATION & RIVE',
    title: 'Interakcje WebGL, Framer Motion & Rive',
    description: 'Immersyjne micro-interakcje z wykorzystaniem akcelerowanych sprzętowo animacji GPU, realizowane bez obciążania głównego wątku przeglądarki (Main Thread).',
    image: 'https://images.unsplash.com/photo-1638803042985-75e160cf34c4?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 50%, #0F172A 100%)',
    metric: '60 FPS',
    metricLabel: 'Płynność animacji GPU',
    metric2: '+45%',
    metric2Label: 'Czas spędzony na stronie'
  },
  {
    tag: 'MODEL SECURITY & JAMSTACK',
    title: 'Architektura Jamstack & Zero Trust Security',
    description: 'Eliminacja podatności monolitów CMS (brak tradycyjnej bazy danych na froncie, serwowanie statycznych plików z CDN). Pełna ochrona przed atakami DDoS, SQL Injection oraz XSS.',
    image: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #311B92 0%, #4A148C 50%, #880E4F 100%)',
    metric: '99.99%',
    metricLabel: 'Dostępność Uptime',
    metric2: 'Zero',
    metric2Label: 'Luki w bezpieczeństwie'
  },
  {
    tag: 'MODEL CRO & CONVERSION',
    title: 'Architektura Zorientowana na Konwersję (CRO)',
    description: 'Precyzyjnie zaprojektowane ścieżki użytkownika (User Journey), strategiczne rozmieszczenie akcentów CTA, układy F-Shape i eliminacja barier w procesie ofertowym.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%)',
    metric: '+120%',
    metricLabel: 'Współczynnik zapytań (CRO)',
    metric2: '-35%',
    metric2Label: 'Współczynnik odrzuceń'
  }
];

const webDesignCarouselItems = [
  {
    number: '01 — WYDAJNOŚĆ',
    metric: '< 0.5s',
    title: 'Błyskawiczne Ładowanie LCP',
    description: 'Statyczne i serwerowe renderowanie Next.js gwarantuje natychmiastowe otwieranie strony na urządzeniach mobilnych.',
    width: 'min(85vw, 470px)',
    minHeight: '370px'
  },
  {
    number: '02 — UŻYTKOWNIK',
    metric: 'UX Premium',
    title: 'Intuicyjny Interfejs B2B',
    description: 'Projektujemy makietę w oparciu o czystą symetrię, czytelną typografię oraz architekturę nastawioną na cel sprzedażowy.',
    width: 'min(75vw, 360px)'
  },
  {
    number: '03 — BEZPIECZEŃSTWO',
    metric: '100%',
    title: 'Architektura Headless',
    description: 'Separacja warstwy wizualnej od bazy danych całkowicie eliminuje podatności na ataki hakerskie i awarie systemowe.',
    width: 'min(80vw, 430px)',
    minHeight: '380px'
  },
  {
    number: '04 — SEO READY',
    metric: 'Schema.org',
    title: 'Czysty Kod i Mikrodane',
    description: 'Semantyczna struktura HTML5 pozbawiona zbędnego kodu spowalniającego gotowa na natychmiastowe pozycjonowanie.',
    width: 'min(75vw, 370px)'
  }
];

export default function ProjektowanieStronPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner - Apple Style */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                WEBDESIGN &amp; DEVELOPMENT
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: 'var(--color-text-main)', 
                marginBottom: '1.5rem', 
                letterSpacing: '-0.04em'
              }}>
                Nowoczesne Strony<br />Wysoka Konwersja
              </h1>
              <p style={{ 
                fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
                color: '#6E6E73', 
                lineHeight: 1.5, 
                maxWidth: '650px', 
                margin: '0 auto 3rem auto',
                fontWeight: 500,
                letterSpacing: '-0.01em'
              }}>
                Tworzymy błyskawiczne i piękne witryny w technologii Next.js. Budujemy wizerunek marek B2B, który zachwyca estetów i sprzedaje bez kompromisów.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                  Wyceń Projekt
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Carousel */}
        <ServiceCarousel 
          tag="STANDARDY INTERFEJSU & UX"
          title="Inżynieria Nowoczesnych Stron"
          subtitle="Zobacz parametry techniczne i projektowe wyróżniające nasze realizacje serwisów internetowych."
          items={webDesignCarouselItems}
        />

        {/* Standards Section - Apple Bento Grid Style */}
        <section style={{ padding: '120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Standardy Inżynierii Web
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Czym wyróżniają się interfejsy i architektura kodowana przez AI SEO COMPANY.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Technologia Next.js</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Architektura serwerowa (SSR) i statyczna (SSG) zapewniająca natychmiastowe ładowanie, idealna dla perfekcyjnych wyników Core Web Vitals i pozycjonowania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>High-End UX/UI</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Minimalistyczne interfejsy zaprojektowane z myślą o użytkowniku końcowym i maksymalizacji sprzedaży B2B. Wykorzystujemy zasady symetrii.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>SEO Ready</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Zoptymalizowana struktura semantyczna HTML5 i danych strukturalnych (Schema.org), gotowa na wdrożenie zaawansowanych kampanii od pierwszego dnia.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Process Section */}
        <section style={{ padding: '0 0 120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                KROKI PROJEKTOWE
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Od Koncepcji do Kodowania
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Przejrzysty proces realizacji Twojego projektu webowego.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Figma Design &amp; Makiety</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Projektowanie unikalnego wireframe'u oraz interaktywnych makiet UX w programie Figma z pełnym uwzględnieniem identyfikacji wizualnej marki.</p>
              </RevealItem>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wdrożenie Kodowe &amp; CRO</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Kodowanie czystego, semantycznego komponentu w Next.js oraz przetestowanie ścieżek konwersji klienta pod kątem najwyższego wskaźnika CTR.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Standardy Architektury Web Design" 
          subtitle="Nowoczesne wzorce projektowe łączące estetykę z maksymalizacją zapytań"
          cases={webDesignPortfolioCases} 
          layout="vertical"
        />

        {/* Pricing */}
        <Pricing />

        {/* FAQ Section */}
        <AppleFaq faqData={faqWebDesign} title="Najczęstsze pytania" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
