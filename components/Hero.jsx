'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="hero" id="hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {/* H1 moved to the main visual element */}

      {/* Background Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
        preload="metadata"
      >
        <source src="/black-hole-ai-seo-company.mp4" type="video/mp4" />
      </video>

      {/* Subtle Starfield Background */}
      <div className="hero-stars-bg"></div>

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      {/* Enlarged & Responsive Hero Typography SVG Graphic with Floating Animation */}
      <div style={{ 
        position: 'absolute', 
        top: '46%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)', 
        width: '98vw', 
        maxWidth: '2400px', 
        maxHeight: '88vh',
        zIndex: 4, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        padding: '0 0.5vw',
        pointerEvents: 'none'
      }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}
        >
          <h1 style={{ 
            margin: 0, 
            padding: '0 20px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center',
            fontSize: 'clamp(2.5rem, 6vw, 6rem)',
            fontWeight: 800,
            lineHeight: 1.1,
            color: '#FFFFFF',
            textShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 20px rgba(216,90,48,0.3)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            <span style={{ fontSize: 'clamp(1rem, 2vw, 2rem)', fontWeight: 600, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Agencja SEO Warszawa
            </span>
            Strony i Pozycjonowanie,<br/>które budują sprzedaż
          </h1>
        </motion.div>
      </div>

      {/* Bottom-left: Our Partners (KOTA Style) */}
      <motion.div 
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 0.85, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8, ease: 'easeOut' }}
        className="hero-partners-row" 
        style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}
      >
        <span className="hero-partner-item" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          STANIAX
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          ASE-BOT
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          MADAME THAI
        </span>
        <span className="hero-partner-item" style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 500, letterSpacing: '0.05em', fontSize: '0.9rem', color: '#FFFFFF', whiteSpace: 'nowrap', transition: 'all 0.3s ease', cursor: 'default' }}>
          IRENEUSZ KOZERA
        </span>
      </motion.div>
    </section>
  );
}
