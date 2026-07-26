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

      <div className="container" style={{ position: 'relative', zIndex: 4, height: '100%', width: '100%' }}>
        
        {/* Massive Centered Title (KOTA 'rebel against boring' style) */}
        <div style={{ position: 'absolute', top: '45%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', textAlign: 'center' }}>
          <h1 style={{ 
            fontSize: 'clamp(4rem, 9vw, 9rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.95, 
            letterSpacing: '-0.05em', 
            color: '#FFFFFF', 
            textTransform: 'lowercase',
            margin: 0
          }}>
             branding<br/>i strony internetowe<br/>
             <span className="highlight" style={{ fontSize: 'clamp(3rem, 7vw, 7rem)' }}>które budują sprzedaż</span>
          </h1>
        </div>

        {/* Bottom Left: Case Study */}
        <div style={{ position: 'absolute', bottom: '2rem', left: '0', maxWidth: '380px' }}>
          <div style={{ background: 'transparent', padding: '0', border: 'none', color: '#FFFFFF' }}>
             <span className="preview-badge" style={{ marginBottom: '1rem', display: 'inline-block' }}>GOOGLING CASE STUDY</span>
             <div style={{ fontSize: '3rem', fontWeight: 800, fontFamily: "'Space Grotesk', system-ui", color: '#38BDF8', lineHeight: 1.1, marginBottom: '0.5rem' }}>+8 113.8%</div>
             <div style={{ fontWeight: 700, fontSize: '1.25rem', marginBottom: '0.75rem' }}>{t.caseTitle}</div>
             <p style={{ fontSize: '0.95rem', color: '#CBD5E1', lineHeight: '1.6' }}>
               {t.caseDesc}
             </p>
          </div>
        </div>

        {/* Bottom Right: Subtitle & CTA */}
        <div style={{ position: 'absolute', bottom: '2rem', right: '0', maxWidth: '380px', textAlign: 'left' }}>
          <p style={{ fontSize: '1.1rem', color: '#FFFFFF', fontWeight: 500, lineHeight: '1.6', marginBottom: '2rem' }}>
            {t.subtitle}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.1rem', borderRadius: '40px' }}>
              {t.btnPrimary} →
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
