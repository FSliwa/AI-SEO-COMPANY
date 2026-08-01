'use client';

import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';

export default function Hero() {
  const lang = useLocale();
  const t = useTranslations('hero');

  return (
    <section className="hero" id="hero" style={{ position: 'relative', width: '100%', minHeight: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#0F172A' }}>
      {/* H1 moved to the main visual element */}

      {/* Background Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
        preload="metadata"
        poster="/black-hole-poster.webp"
      >
        <source src="/black-hole-ai-seo-company.webm" type="video/webm" />
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
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}
        >
          <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', color: 'transparent', zIndex: -10, top: 0, left: 0, pointerEvents: 'none', margin: 0, padding: 0 }}>
            {lang === 'en' 
              ? <><strong>SEO and Search Optimization Services, Content in Marketing Agency</strong></>
              : 'Agencja SEO Warszawa - strony i pozycjonowanie, które budują sprzedaż'}
          </h1>
          <div style={{ margin: 0, padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <motion.img 
              src={lang === 'en' ? '/seo-and-search-optimization-services-content-in-marketing-agency-en.svg' : '/agencja-seo-warszawa-hero-text.svg'} 
              alt={lang === 'en' 
                ? 'SEO and Search Optimization Services, Content in Marketing Agency' 
                : 'Agencja SEO Warszawa - strony i pozycjonowanie, które budują sprzedaż'} 
              title={lang === 'en' 
                ? 'SEO and Search Optimization Services, Content in Marketing Agency' 
                : 'Agencja SEO Warszawa - Skuteczne Pozycjonowanie Stron'}
              width={1600}
              height={294}
              fetchPriority="high"
              style={{ 
                width: '100%', 
                height: 'auto', 
                maxHeight: '75vh',
                objectFit: 'contain',
                display: 'block',
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.65)) drop-shadow(0 0 30px rgba(216,90,48,0.3))'
              }} 
            />
          </div>
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
