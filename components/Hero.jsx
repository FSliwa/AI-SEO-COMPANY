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
        <source src="/black-hole-ai-seo-company.webm" type="video/webm" media="(min-width: 768px)" />
        <source src="/black-hole-ai-seo-company.mp4" type="video/mp4" media="(min-width: 768px)" />
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
        <div
          className="hero-lcp-image"
          style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', position: 'relative' }}
        >
          {/* Aspect-locked stage: matches the SVG viewBox (1440x810) exactly, so the
              H1 can be positioned in SVG coordinates as percentages and keeps the
              same placement relative to the artwork at every screen resolution. */}
          <div className="hero-art">
            {/* Two-tone like the SVG's own paragraphs: lead sentence in the accent
                colour, the remainder in white. Wording is unchanged. */}
            <h1 className={`hero-seo-h1${lang === 'pl' ? ' hero-seo-h1-pl' : ''}`}>
              {lang === 'en' ? (
                <>
                  Premium SEO & Marketing Agency for Companies.{' '}
                  <span className="hero-seo-h1-rest">
                    Recognized among leading search engine optimisation companies for advanced optimization & sustainable growth
                  </span>
                </>
              ) : (
                <>
                  Kompleksowa Agencja SEO i Marketingowa z Warszawy.{' '}
                  <span className="hero-seo-h1-rest">
                    Twój projekt i strony to nasz priorytet — skuteczne pozycjonowanie napędzające wzrost
                  </span>
                </>
              )}
            </h1>
            <img
              className="hero-art-img"
              src={lang === 'en' ? '/seo-for-companies.svg' : '/agencja-marketingowa-agencja-seo-pozycjonowanie-stron-projekt-strony-wzrost.svg'}
              alt={lang === 'en'
                ? 'SEO for companies'
                : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie Stron i Projektowanie'}
              title={lang === 'en'
                ? 'SEO for companies'
                : 'Agencja SEO i Marketingowa Warszawa – Pozycjonowanie Stron i Projektowanie'}
              width={1440}
              height={810}
              fetchPriority="high"
            />
          </div>
        </div>
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
