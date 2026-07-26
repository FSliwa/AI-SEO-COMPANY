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

      {/* KOTA 1:1 Hero Typography — Huge Font Sizes & Matching Indents */}
      <div style={{ 
        position: 'absolute', 
        top: '15%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        padding: '0 2vw', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.2vh' 
      }}>
        {/* Line 1: SEO i (Indented 10vw from left like KOTA's 'rebel') */}
        <span style={{ 
          fontSize: 'clamp(4.5rem, 11.5vw, 14rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.92, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '10vw'
        }}>
          SEO i
        </span>

        {/* Line 2: strony internetowe (Indented 26vw like KOTA's 'against') */}
        <span style={{ 
          fontSize: 'clamp(4.5rem, 11.5vw, 14rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.92, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '26vw'
        }}>
          strony internetowe
        </span>

        {/* Line 3: które budują sprzedaż (Indented 10vw, aligned with Line 1 like KOTA's 'boring') */}
        <span className="highlight" style={{ 
          fontSize: 'clamp(4.5rem, 11.5vw, 14rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.92, 
          letterSpacing: '-0.04em', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '10vw'
        }}>
          które budują sprzedaż
        </span>
      </div>

      {/* Right-side Subtitle Paragraph — Positioned at top 63% / right 4vw (directly adjacent to line 3 like KOTA) */}
      <div style={{ 
        position: 'absolute', 
        top: '63%', 
        right: '4vw', 
        maxWidth: '320px', 
        textAlign: 'left', 
        zIndex: 5 
      }}>
        <p style={{ fontSize: '0.95rem', color: '#F1F5F9', fontWeight: 400, lineHeight: '1.65', margin: 0 }}>
          {lang === 'pl' 
            ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>masowo wybierana przez klientów.</strong></>
            : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>converts customers at scale.</strong></>
          }
        </p>
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
