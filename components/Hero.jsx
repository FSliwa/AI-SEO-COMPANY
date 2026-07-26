'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal } from './ScrollReveal';

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

      {/* Subtle Starfield Background */}
      <div className="hero-stars-bg"></div>

      {/* Hero Badge Tag */}
      <Reveal delay={0.1} style={{ position: 'absolute', top: '5%', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 4 }}>
        <div className="section-tag hero-badge-tag">
          <span className="asterisk">✳</span> {t.tag}
        </div>
      </Reveal>

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      {/* KOTA 1:1 Hero Typography & Integrated Subtitle Row */}
      <div style={{ 
        position: 'absolute', 
        top: '12%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        padding: '0 3vw', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0px' 
      }}>
        {/* Line 1: SEO i */}
        <Reveal delay={0.2} style={{ 
          fontSize: 'clamp(3rem, 14vw, 15rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.85, 
          letterSpacing: '-0.06em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap'
        }}>
          SEO i
        </Reveal>

        {/* Line 2: strony internetowe */}
        <Reveal delay={0.3} style={{ 
          fontSize: 'clamp(2.5rem, 9.5vw, 10rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.85, 
          letterSpacing: '-0.06em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '18vw'
        }}>
          strony internetowe
        </Reveal>

        {/* Line 3 Row: które budują sprzedaż + Subtitle Paragraph */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          width: '100%',
          marginTop: '0px'
        }}>
          {/* Left: które budują sprzedaż */}
          <Reveal delay={0.4} style={{ 
            fontSize: 'clamp(2rem, 7.5vw, 8.5rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 700, 
            lineHeight: 0.85, 
            letterSpacing: '-0.06em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            color: 'var(--color-cta)',
            flexShrink: 1
          }}>
            które budują sprzedaż
          </Reveal>

          {/* Right: Subtitle paragraph */}
          <Reveal delay={0.5} style={{
            width: '300px', 
            minWidth: '240px',
            textAlign: 'left', 
            paddingRight: '1vw',
            flexShrink: 0,
            transform: 'translateY(10%)' /* Slight nudge down to perfectly match KOTA's visual center */
          }}>
            <p style={{ fontSize: '0.92rem', color: '#F1F5F9', fontWeight: 400, lineHeight: '1.65', margin: 0 }}>
              {lang === 'pl' 
                ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>masowo wybierana przez klientów.</strong></>
                : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>converts customers at scale.</strong></>
              }
            </p>
          </Reveal>
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
