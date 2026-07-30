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
          <h1 className="sr-only">
            Agencja SEO Warszawa - strony i pozycjonowanie, które budują sprzedaż
          </h1>
          
          <motion.img 
            src="/hero-text.svg" 
            alt="seo i strony internetowe które budują sprzedaż" 
            style={{ 
              width: '100%', 
              height: 'auto', 
              maxHeight: '75vh',
              objectFit: 'contain',
              display: 'block',
              filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 30px rgba(216,90,48,0.3))'
            }} 
            animate={{ 
              y: [0, -12, 0],
              scale: [1, 1.012, 1],
              filter: [
                'drop-shadow(0 15px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(216,90,48,0.2))',
                'drop-shadow(0 25px 45px rgba(0,0,0,0.7)) drop-shadow(0 0 40px rgba(216,90,48,0.4))',
                'drop-shadow(0 15px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 20px rgba(216,90,48,0.2))'
              ]
            }}
            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
          />
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
