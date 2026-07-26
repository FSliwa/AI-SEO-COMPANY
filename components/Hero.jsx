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

      {/* KOTA 1:1 Hero Typography & Integrated Subtitle Row */}
      <div style={{ 
        position: 'absolute', 
        top: '20%', 
        left: '0', 
        width: '100%', 
        zIndex: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '0px',
        padding: '0 8vw' // Increased base padding for tighter clustering
      }}>
        {/* Line 1: SEO i */}
        <Reveal delay={0.2} style={{ 
          fontSize: 'clamp(5rem, 15vw, 17rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.8, 
          letterSpacing: '-0.06em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          paddingLeft: '0' 
        }}>
          seo i
        </Reveal>

        {/* Line 2: strony internetowe */}
        <Reveal delay={0.3} style={{ 
          fontSize: 'clamp(3.5rem, 10vw, 12rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 700, 
          lineHeight: 0.8, 
          letterSpacing: '-0.06em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          whiteSpace: 'nowrap',
          display: 'flex',
          justifyContent: 'center', 
          paddingRight: '10vw' // Shifted left to match "against"
        }}>
          strony internetowe
        </Reveal>

        {/* Line 3 Row: które budują sprzedaż + Subtitle Paragraph */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'flex-start', // Don't space-between, use margins
          width: '100%',
          marginTop: '2vh'
        }}>
          {/* Left: które budują sprzedaż */}
          <Reveal delay={0.4} style={{ 
            fontSize: 'clamp(3rem, 8vw, 9.5rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 700, 
            lineHeight: 0.8, 
            letterSpacing: '-0.06em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            color: 'var(--color-cta)',
            flexShrink: 0,
            paddingLeft: '2vw' // Slight indent like "boring"
          }}>
            które budują sprzedaż
          </Reveal>

          {/* Right: Subtitle paragraph */}
          <Reveal delay={0.5} style={{
            width: '280px', 
            minWidth: '220px',
            textAlign: 'left', 
            flexShrink: 0,
            marginLeft: 'auto', // Pushes to the right
            marginRight: '5vw', // But keeps it away from the edge
            transform: 'translateY(15%)' 
          }}>
            <p style={{ fontSize: '0.92rem', color: '#F1F5F9', fontWeight: 500, lineHeight: '1.65', margin: 0 }}>
              {lang === 'pl' 
                ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>masowo wybierana przez klientów.</strong></>
                : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 700 }}>converts customers at scale.</strong></>
              }
            </p>
          </Reveal>
        </div>
      </div>

      {/* Bottom-left: Our Partners (KOTA Style) */}
      <div style={{ position: 'absolute', bottom: '2.5rem', left: '3vw', zIndex: 5, display: 'flex', alignItems: 'center', gap: '3rem', opacity: 0.7 }}>
        {/* Digital Agency Network */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ width: '24px', height: '24px', borderRadius: '50%', background: '#FFFFFF', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.5rem', fontWeight: 800 }}>DAN</div>
          <div style={{ fontSize: '0.6rem', color: '#FFFFFF', lineHeight: 1.1, textTransform: 'uppercase', fontWeight: 600, letterSpacing: '0.05em' }}>Digital Agency<br/>Network</div>
        </div>
        {/* Clutch */}
        <span style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 700, letterSpacing: '-0.02em', fontFamily: 'system-ui' }}>Clutch</span>
        {/* AWWWARDS */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <span style={{ fontSize: '1rem', color: '#FFFFFF', fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>AWWWARDS.</span>
          <span style={{ fontSize: '0.45rem', color: '#FFFFFF', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '2px' }}>Honorable Mention</span>
        </div>
        {/* FWA */}
        <span style={{ fontSize: '1.2rem', color: '#FFFFFF', fontWeight: 800, fontStyle: 'italic', letterSpacing: '-0.05em' }}>FWA</span>
      </div>
    </section>
  );
}
