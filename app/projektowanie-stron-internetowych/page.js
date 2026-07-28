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
    tag: 'REBRANDING & UX',
    title: 'Nowa tożsamość wizualna kancelarii',
    description: 'Zaprojektowaliśmy minimalistyczną, budującą zaufanie stronę dla wiodącej kancelarii prawniczej. Wdrożenie na Next.js obniżyło czas ładowania i zwiększyło współczynnik interakcji.',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&w=800&q=80',
    metric: '+120%',
    metricLabel: 'Współczynnik zapytań',
    metric2: '0.4s',
    metric2Label: 'Czas ładowania LCP'
  },
  {
    tag: 'B2B TECH PLATFORM',
    title: 'Portal technologiczny SaaS',
    description: 'Całkowita przebudowa interfejsu (UX/UI) dla firmy z branży oprogramowania medycznego. Stworzyliśmy system projektowy oparty na architekturze headless.',
    image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80',
    metric: '100/100',
    metricLabel: 'Core Web Vitals',
    metric2: '-40%',
    metric2Label: 'Odrzuceń'
  }
];

const webDesignBlogData = {
  heroItem: {
    category: 'ARCHITEKTURA HEADLESS',
    title: 'Dlaczego korporacje przechodzą z WordPress na Next.js?',
    description: 'Analiza kosztów utrzymania, bezpieczeństwa i szybkości. Dowiedz się, dlaczego Headless CMS to przyszłość profesjonalnego web designu w modelu B2B.',
    date: '28 Lipca 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    slug: '/blog'
  },
  items: [
    {
      category: 'UX / UI DESIGN',
      title: 'Zasady symetrii w budowaniu konwersji na stronach usługowych',
      description: 'Jak subtelne mikrozmiany w układzie wizualnym potrafią podnieść współczynnik zapytań o kilkadziesiąt procent.',
      date: '24 Lipca 2026',
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80',
      slug: '/blog'
    },
    {
      category: 'OPTYMALIZACJA MOBILNA',
      title: 'Mobile First Indexing: Co projektanci stron robią źle',
      description: 'Przegląd najczęstszych błędów w wersjach responsywnych, które blokują pozycjonowanie Twojej strony.',
      date: '20 Lipca 2026',
      image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80',
      slug: '/blog'
    },
    {
      category: 'BRANDING',
      title: 'Czy kolor ma znaczenie w procesie decyzyjnym B2B?',
      description: 'Psychologia kolorów w interfejsach biznesowych i ich bezpośredni wpływ na odczucie prestiżu oraz zaufanie.',
      date: '16 Lipca 2026',
      image: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80',
      slug: '/blog'
    }
  ]
};

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
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
        
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
                color: '#1D1D1F', 
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
                <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
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
        <section style={{ padding: '120px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Standardy Inżynierii Web
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Czym wyróżniają się interfejsy i architektura kodowana przez AI SEO COMPANY.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Technologia Next.js</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Architektura serwerowa (SSR) i statyczna (SSG) zapewniająca natychmiastowe ładowanie, idealna dla perfekcyjnych wyników Core Web Vitals i pozycjonowania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>High-End UX/UI</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Minimalistyczne interfejsy zaprojektowane z myślą o użytkowniku końcowym i maksymalizacji sprzedaży B2B. Wykorzystujemy zasady symetrii.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>SEO Ready</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Zoptymalizowana struktura semantyczna HTML5 i danych strukturalnych (Schema.org), gotowa na wdrożenie zaawansowanych kampanii od pierwszego dnia.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Process Section */}
        <section style={{ padding: '0 0 120px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                KROKI PROJEKTOWE
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Od Koncepcji do Kodowania
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Przejrzysty proces realizacji Twojego projektu webowego.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Figma Design &amp; Makiety</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Projektowanie unikalnego wireframe'u oraz interaktywnych makiet UX w programie Figma z pełnym uwzględnieniem identyfikacji wizualnej marki.</p>
              </RevealItem>
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wdrożenie Kodowe &amp; CRO</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Kodowanie czystego, semantycznego komponentu w Next.js oraz przetestowanie ścieżek konwersji klienta pod kątem najwyższego wskaźnika CTR.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Odkryj nowości naszych klientów" 
          subtitle="Projekty łączące niesamowitą estetykę z maksymalizacją zapytań."
          cases={webDesignPortfolioCases} 
        />

        {/* Pricing */}
        <Pricing />

        {/* Blog Grid */}
        <ServiceBlogGrid 
          tag="TRENDS & INSIGHTS"
          title="Wiedza o Projektowaniu"
          subtitle="Dowiedz się, jak budować zaufanie marki i sprzedawać w świecie cyfrowym."
          heroItem={webDesignBlogData.heroItem}
          items={webDesignBlogData.items}
        />

        {/* FAQ Section */}
        <AppleFaq faqData={faqWebDesign} title="Najczęstsze pytania" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
