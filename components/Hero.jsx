'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal } from './ScrollReveal';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="hero" id="hero">
      {/* Background Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
      >
        <source src="/Black hole AI SEO COMPANY.mp4" type="video/mp4" />
      </video>

      {/* Subtle Starfield Background */}
      <div className="hero-stars-bg"></div>

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      {/* Hero Typography SVG Graphic */}
      <div style={{ 
        position: 'absolute', 
        top: '15%', 
        left: '50%', 
        transform: 'translateX(-50%)', 
        width: '95%', 
        maxWidth: '1400px', 
        zIndex: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center' 
      }}>
        <Reveal delay={0.2} style={{ width: '100%' }}>
          <img 
            src="/hero-text.svg" 
            alt="seo i strony internetowe które budują sprzedaż" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              display: 'block',
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))'
            }} 
          />
        </Reveal>
      </div>

      {/* Bottom-left: Our Partners (KOTA Style) */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '2.5rem', opacity: 0.85, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          STANIAX
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          ASE-BOT
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          MADAME THAI
        </span>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 500, letterSpacing: '0.05em', fontSize: '0.9rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          IRENEUSZ KOZERA
        </span>
      </div>
    </section>
  );
}
