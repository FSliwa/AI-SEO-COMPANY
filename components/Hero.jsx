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

      {/* KOTA 1:1 Hero Typography & Integrated Subtitle Row */}
      <div style={{ 
        position: 'absolute', 
        top: '15%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        padding: '0 3vw', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.5vh' 
      }}>
        {/* Line 1: SEO i (Left 0 like KOTA's 'rebel') */}
        <span style={{ 
          fontSize: 'clamp(4.8rem, 13.5vw, 16.5rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.92, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '0'
        }}>
          SEO i
        </span>

        {/* Line 2: strony internetowe (Indented 18vw like KOTA's 'against') */}
        <span style={{ 
          fontSize: 'clamp(3.5rem, 9.2vw, 11.5rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.92, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '18vw'
        }}>
          strony internetowe
        </span>

        {/* Line 3 Row: które budują sprzedaż + Subtitle Paragraph (Locked side-by-side like KOTA!) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'flex-end', 
          justifyContent: 'space-between', 
          width: '100%',
          marginTop: '0.5vh'
        }}>
          {/* Left: które budują sprzedaż (Left 0, aligned with Line 1 like KOTA's 'boring') */}
          <span className="highlight" style={{ 
            fontSize: 'clamp(3rem, 7.2vw, 9rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.92, 
            letterSpacing: '-0.04em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            paddingLeft: '0'
          }}>
            które budują sprzedaż
          </span>

          {/* Right: Subtitle paragraph (Locked to Line 3's bottom-right, exactly like KOTA!) */}
          <div style={{ 
            maxWidth: '320px', 
            textAlign: 'left', 
            paddingBottom: '0.4rem',
            paddingRight: '1vw',
            flexShrink: 0
          }}>
            <p style={{ fontSize: '0.92rem', color: '#F1F5F9', fontWeight: 400, lineHeight: '1.65', margin: 0 }}>
              {lang === 'pl' 
                ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>masowo wybierana przez klientów.</strong></>
                : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>converts customers at scale.</strong></>
              }
            </p>
          </div>
        </div>
      </div>

      {/* Bottom-left: Award-style badges like KOTA's Clutch/Awwwards row */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '2rem', fontWeight: 800, fontFamily: "'Space Grotesk', system-ui", color: '#38BDF8' }}>+8 113%</span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8', maxWidth: '90px', lineHeight: 1.3 }}>Google Search Growth</span>
        </div>
        <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.2)' }}></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.05em' }}>★★★★★</span>
          <span style={{ fontSize: '0.7rem', color: '#94A3B8', lineHeight: 1.3 }}>4.9/5 Clients</span>
        </div>
        <div style={{ width: '1px', height: '28px', background: 'rgba(255,255,255,0.2)' }}></div>
        <span style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.05em', fontWeight: 600 }}>AWWWARDS</span>
        <span style={{ fontSize: '0.75rem', color: '#94A3B8', letterSpacing: '0.05em', fontWeight: 600 }}>CLUTCH</span>
      </div>
    </section>
  );
}
