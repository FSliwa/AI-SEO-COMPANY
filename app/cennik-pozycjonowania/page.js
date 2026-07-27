'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function CennikPage() {
  return (
    <main style={{ background: '#F8FAFC', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '170px', paddingBottom: '40px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.08) 0%, rgba(248, 250, 252, 0) 80%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '100px', 
              background: '#FFFFFF', 
              border: '1px solid rgba(216, 90, 48, 0.25)', 
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.08)', 
              color: '#D85A30', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              marginBottom: '1.5rem' 
            }}>
              <span className="asterisk">✳</span> TRANSPARENTNA WYCENA
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#0F172A', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Ile Kosztuje Pozycjonowanie Stron? <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #D85A30 0%, #7C3AED 50%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Cennik 2026</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
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
