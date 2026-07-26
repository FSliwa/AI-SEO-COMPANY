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

      {/* Full-Viewport Title — staggered like KOTA */}
      <div style={{ position: 'absolute', top: '28%', left: '0', width: '100%', zIndex: 4, padding: '0 3vw', display: 'flex', flexDirection: 'column' }}>
        <span style={{ 
          fontSize: 'clamp(4rem, 13vw, 15rem)', 
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
          fontSize: 'clamp(3rem, 8.5vw, 10rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          paddingLeft: '25vw'
        }}>
          strony internetowe
        </span>
        <span className="highlight" style={{ 
          fontSize: 'clamp(3rem, 9vw, 10.5rem)', 
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

      {/* Right-side subtitle — at same height as last title line, like KOTA's "A global branding agency..." */}
      <div style={{ position: 'absolute', top: '63%', right: '3vw', maxWidth: '300px', textAlign: 'left', zIndex: 5 }}>
        <p style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 400, lineHeight: '1.65', margin: 0 }}>
          {lang === 'pl' 
            ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>masowo wybierana przez klientów.</strong></>
            : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>converts customers at scale.</strong></>
          }
        </p>
      </div>

      {/* Bottom-left: Case Study badges */}
      <div className="container" style={{ position: 'relative', zIndex: 4, height: '100%', width: '100%' }}>
        <div style={{ position: 'absolute', bottom: '2rem', left: '0', maxWidth: '380px' }}>
          <span className="preview-badge" style={{ marginBottom: '0.75rem', display: 'inline-block' }}>GOOGLING CASE STUDY</span>
          <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: "'Space Grotesk', system-ui", color: '#38BDF8', lineHeight: 1.1, marginBottom: '0.25rem' }}>+8 113.8%</div>
          <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '0.5rem' }}>{t.caseTitle}</div>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5', margin: 0 }}>
            {t.caseDesc}
          </p>
        </div>
      </div>
    </section>
  );
}
