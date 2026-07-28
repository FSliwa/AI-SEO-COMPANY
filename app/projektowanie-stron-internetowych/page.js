export const metadata = {
  title: 'Projektowanie Stron Internetowych | Nowoczesny Web Design — AI SEO COMPANY',
  description: 'Tworzymy ultraszybkie i piękne wizualnie strony na Next.js (Headless). Skoncentrowane na maksymalizacji UX i konwersji.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

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
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Hero Banner - Apple Style */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> WEBDESIGN &amp; DEVELOPMENT
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
                <a href="/#portfolio" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', color: '#1D1D1F', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  Zobacz Realizacje
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Standards Section - Apple Bento Grid Style */}
        <section style={{ padding: '80px 0 100px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Standardy Inżynierii Web
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Czym wyróżniają się interfejsy i architektura kodowana przez AI SEO COMPANY.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Technologia Next.js</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Architektura serwerowa (SSR) i statyczna (SSG) zapewniająca natychmiastowe ładowanie, idealna dla perfekcyjnych wyników Core Web Vitals i bezkompromisowego pozycjonowania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>High-End UX/UI</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Minimalistyczne interfejsy zaprojektowane z myślą o użytkowniku końcowym i maksymalizacji sprzedaży B2B. Wykorzystujemy zasady symetrii i subtelnych mikroanimacji.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>FILAR 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>SEO Ready Architecture</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Zoptymalizowana struktura semantyczna HTML5 i danych strukturalnych (Schema.org), gotowa na wdrożenie zaawansowanych kampanii od pierwszego dnia od uruchomienia.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Apple Interactive Carousel Section for Web Design */}
        <ServiceCarousel 
          tag="STANDARDY INTERFEJSU & UX"
          title="Inżynieria Nowoczesnych Stron"
          subtitle="Zobacz parametry techniczne i projektowe wyróżniające nasze realizacje serwisów internetowych."
          items={webDesignCarouselItems}
        />

        <Pricing />

        {/* Unique Design Process & Standards Section */}
        <section style={{ padding: '80px 0 120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> KROKI PROJEKTOWE
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Od Koncepcji do Kodowania
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Przejrzysty proces realizacji Twojego projektu webowego.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Figma Design &amp; Makiety</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Projektowanie unikalnego wireframe'u oraz interaktywnych makiet UX w programie Figma z pełnym uwzględnieniem identyfikacji wizualnej marki.</p>
              </RevealItem>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wdrożenie Kodowe &amp; CRO</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Kodowanie czystego, semantycznego komponentu w Next.js oraz przetestowanie ścieżek konwersji klienta pod kątem najwyższego wskaźnika CTR.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
