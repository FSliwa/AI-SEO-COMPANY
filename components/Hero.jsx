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

      {/* KOTA 1:1 Hero Typography & Subtitle Layout */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        padding: '0 max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0.8vh' 
      }}>
        {/* Line 1: SEO i (Starts at Left 0) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ 
            fontSize: 'clamp(4.5rem, 12.5vw, 14.5rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.92, 
            letterSpacing: '-0.04em', 
            color: '#FFFFFF', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap'
          }}>
            SEO i
          </span>
        </div>

        {/* Line 2: strony internetowe (Indented Left ~18vw, like KOTA's "against") */}
        <div style={{ display: 'flex', paddingLeft: '18vw' }}>
          <span style={{ 
            fontSize: 'clamp(3rem, 7.5vw, 9.5rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.92, 
            letterSpacing: '-0.04em', 
            color: '#FFFFFF', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap'
          }}>
            strony internetowe
          </span>
        </div>

        {/* Line 3 Row: które budują sprzedaż (Left 0) + Subtitle (Right) side-by-side */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          width: '100%',
          marginTop: '0.5vh',
          flexWrap: 'nowrap',
          gap: '2rem'
        }}>
          {/* Left: które budują sprzedaż (Starts at Left 0, same as Line 1) */}
          <span className="highlight" style={{ 
            fontSize: 'clamp(2.2rem, 4.8vw, 6rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.95, 
            letterSpacing: '-0.04em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            flexShrink: 0
          }}>
            które budują sprzedaż
          </span>

          {/* Right: Subtitle paragraph (Aligned with Line 3, right edge) */}
          <div style={{ maxWidth: '320px', textAlign: 'left', paddingBottom: '0.4rem', flexShrink: 1 }}>
            <p style={{ fontSize: '0.88rem', color: '#CBD5E1', fontWeight: 400, lineHeight: '1.6', margin: 0 }}>
              {lang === 'pl' 
                ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>masowo wybierana przez klientów.</strong></>
                : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>converts customers at scale.</strong></>
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
