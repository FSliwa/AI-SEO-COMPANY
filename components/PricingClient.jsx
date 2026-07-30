'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function PricingClient() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '40px', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> TRANSPARENTNA WYCENA
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              Ile Kosztuje Pozycjonowanie Stron? <br />
              <span style={{ color: 'var(--color-cta)' }}>Cennik 2026</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
              Brak ukrytych opłat i skomplikowanych umów. Płać za mierzalne wyniki i stały rozwój widoczności w wyszukiwarkach.
            </p>
          </Reveal>
        </div>
      </section>

      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
