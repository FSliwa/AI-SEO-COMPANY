'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function SeoLokalnePage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> LOKALNA WIDOCZNOŚĆ WARSZAWA
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              SEO Lokalne Warszawa <br />
              <span style={{ color: 'var(--color-cta)' }}>&amp; Mapy Google</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Pozyskuj klientów szukających Twoich usług w Warszawie i okolicach. Optymalizujemy wizytówki Google Profil Firmy oraz stronę pod frazy geolokalizowane.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              Zwiększ Widoczność w Warszawie →
            </a>
          </Reveal>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
