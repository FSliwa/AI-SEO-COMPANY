'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

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

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      {/* Full-Viewport Title — OUTSIDE the container, staggered like KOTA */}
      <div style={{ position: 'absolute', top: '38%', left: '0', transform: 'translateY(-50%)', width: '100%', zIndex: 4, padding: '0 3vw', display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: 'clamp(3.5rem, 9.5vw, 11rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          paddingLeft: '0'
        }}>
          branding i
        </span>
        <span style={{ 
          fontSize: 'clamp(3.5rem, 9.5vw, 11rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          paddingLeft: '22vw'
        }}>
          strony internetowe
        </span>
        <span className="highlight" style={{ 
          fontSize: 'clamp(3rem, 8vw, 9.5rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          textTransform: 'lowercase',
          paddingLeft: '8vw'
        }}>
          które budują sprzedaż
        </span>
      </div>

      {/* Bottom elements in container for proper margins */}
      <div className="container" style={{ position: 'relative', zIndex: 4, height: '100%', width: '100%' }}>

        {/* Bottom Left: Case Study — like KOTA's bottom-left logos */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '0', maxWidth: '380px' }}>
          <span className="preview-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>GOOGLING CASE STUDY</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: "'Space Grotesk', system-ui", color: '#38BDF8', lineHeight: 1.1, marginBottom: '0.25rem' }}>+8 113.8%</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>{t.caseTitle}</div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
            {t.caseDesc}
          </p>
        </div>

        {/* Bottom Right: Subtitle — like KOTA's "A global branding agency..." */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '0', maxWidth: '340px', textAlign: 'left' }}>
          <p style={{ fontSize: '1rem', color: '#E2E8F0', fontWeight: 400, lineHeight: '1.6', margin: 0 }}>
            {t.subtitle}
          </p>
        </div>

      </div>
    </section>
  );
}
