'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function CennikPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '180px', paddingBottom: '40px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.16) 0%, rgba(3, 7, 18, 0) 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1.25rem', justifyContent: 'center', display: 'flex' }}>
              <span className="asterisk">✳</span> TRANSPARENTNA WYCENA
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#FFFFFF', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Ile Kosztuje Pozycjonowanie Stron? <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #FF7A59 0%, #D85A30 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Cennik 2026</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
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
