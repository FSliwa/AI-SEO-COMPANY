'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function ProjektowanieStronPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <section style={{ paddingTop: '200px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Projektowanie &amp; Web Design
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              Nowoczesne Strony.<br />Wysoka Konwersja.
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#86868B', 
              lineHeight: 1.5, 
              maxWidth: '650px', 
              margin: '0 auto 3rem auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Tworzymy błyskawiczne i piękne strony w technologii Next.js. Budujemy wizerunek B2B, który zachwyca i sprzedaje.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                Wyceń Projekt
              </a>
              <a href="/#portfolio" style={{ display: 'inline-block', background: 'rgba(0,0,0,0.05)', color: '#1D1D1F', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                Zobacz Realizacje
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Standardy Jakości.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Czym wyróżniają się nasze realizacje?
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Technologia Next.js.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Architektura serwerowa zapewniająca natychmiastowe ładowanie, idealna dla wskaźników Core Web Vitals i pozycjonowania.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>High-End UX/UI.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Minimalistyczne interfejsy zaprojektowane z myślą o użytkowniku końcowym i maksymalizacji sprzedaży B2B.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>SEO Ready.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Zoptymalizowana struktura semantyczna HTML, gotowa na wdrożenie zaawansowanych kampanii od pierwszego dnia.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
