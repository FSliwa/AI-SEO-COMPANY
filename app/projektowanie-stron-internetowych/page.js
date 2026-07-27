'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Portfolio from '@/components/Portfolio';
import { Reveal } from '@/components/ScrollReveal';

export default function ProjektowanieStronPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '180px', paddingBottom: '60px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(168, 85, 247, 0.16) 0%, rgba(3, 7, 18, 0) 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1.25rem' }}>
              <span className="asterisk">✳</span> WEB DESIGN & UX
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
              Projektowanie Stron Internetowych <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #A855F7 0%, #D85A30 50%, #FF7A59 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>w Warszawie</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Tworzymy szybkie, nowoczesne strony WWW, które łączą unikalny branding z zaawansowaną architekturą pod pozycjonowanie w Google.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              Wyceń Nową Stronę →
            </a>
          </Reveal>
        </div>
      </section>

      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
