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

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      {/* KOTA 1:1 Exact Hero Layout */}
      <div style={{ 
        position: 'absolute', 
        top: '18%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0px',
        padding: '0' 
      }}>
        {/* Line 1: SEO i (rebel) */}
        <Reveal delay={0.2} style={{ 
          fontSize: 'clamp(5.5rem, 14vw, 16.5rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.82, 
          letterSpacing: '-0.05em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '4vw' 
        }}>
          seo i
        </Reveal>

        {/* Line 2: strony internetowe (against) */}
        <Reveal delay={0.3} style={{ 
          fontSize: 'clamp(5.5rem, 14vw, 16.5rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.82, 
          letterSpacing: '-0.05em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: 'flex-start', 
          paddingLeft: '22vw' 
        }}>
          strony internetowe
        </Reveal>

        {/* Line 3 Row: które budują sprzedaż + Subtitle Paragraph (boring) */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start', 
          width: '100%',
          marginTop: '0px',
          paddingLeft: '4vw'
        }}>
          {/* Left: które budują sprzedaż */}
          <Reveal delay={0.4} style={{ 
            fontSize: 'clamp(5.5rem, 14vw, 16.5rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 700, 
            lineHeight: 0.82, 
            letterSpacing: '-0.05em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            color: 'var(--color-cta)',
            flexShrink: 0
          }}>
            które budują sprzedaż
          </Reveal>

          {/* Right: Subtitle paragraph (placed next to Line 3 just like KOTA) */}
          <Reveal delay={0.5} style={{
            width: '320px', 
            minWidth: '240px',
            textAlign: 'left', 
            flexShrink: 0,
            marginLeft: '4vw', 
            transform: 'translateY(10%)' 
          }}>
            <p style={{ fontSize: '1rem', color: '#F1F5F9', fontWeight: 500, lineHeight: '1.55', margin: 0 }}>
              {lang === 'pl' 
                ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>masowo wybierana przez klientów.</strong></>
                : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>converts customers at scale.</strong></>
              }
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom-left: Our Partners (KOTA Style) */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '2.5rem', opacity: 0.85, flexWrap: 'wrap' }}>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.1rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          STANIAX
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          ASE-BOT
        </span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '0.95rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          MADAME THAI
        </span>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 500, letterSpacing: '0.05em', fontSize: '0.9rem', color: '#FFFFFF', whiteSpace: 'nowrap' }}>
          IRENEUSZ KOZERA
        </span>
      </div>
    </section>
  );
}
