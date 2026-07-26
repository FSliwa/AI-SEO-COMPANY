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
      <div style={{ position: 'absolute', top: '22%', left: '0', width: '100%', zIndex: 4, padding: '0 max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem))', display: 'flex', flexDirection: 'column', gap: '0.2vw' }}>
        <span style={{ 
          fontSize: 'clamp(4.5rem, 13.5vw, 15rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          paddingLeft: '0',
          whiteSpace: 'nowrap'
        }}>
          SEO i
        </span>
        <span style={{ 
          fontSize: 'clamp(2.5rem, 6.8vw, 8.2rem)', 
          fontFamily: "'Space Grotesk', system-ui, sans-serif", 
          fontWeight: 800, 
          lineHeight: 0.95, 
          letterSpacing: '-0.04em', 
          color: '#FFFFFF', 
          textTransform: 'lowercase',
          paddingLeft: '22vw',
          whiteSpace: 'nowrap'
        }}>
          strony internetowe
        </span>
        <div style={{ display: 'flex', alignItems: 'center', paddingLeft: '8vw' }}>
          <span className="highlight" style={{ 
            fontSize: 'clamp(2.2rem, 5.8vw, 7.2rem)', 
            fontFamily: "'Space Grotesk', system-ui, sans-serif", 
            fontWeight: 800, 
            lineHeight: 0.95, 
            letterSpacing: '-0.04em', 
            textTransform: 'lowercase',
            whiteSpace: 'nowrap',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4em'
          }}>
            ktore 
            {/* KOTA circular thumbnail preview badge */}
            <span style={{ 
              display: 'inline-block', 
              width: '0.8em', 
              height: '0.8em', 
              borderRadius: '50%', 
              backgroundImage: 'url("https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=300&q=80")', 
              backgroundSize: 'cover', 
              border: '2px solid rgba(255,255,255,0.8)',
              boxShadow: '0 0 15px rgba(56,189,248,0.5)',
              verticalAlign: 'middle'
            }}></span>
            budują sprzedaż
          </span>
        </div>
      </div>

      {/* Right-side subtitle — at same height as last title line, like KOTA's "A global branding agency..." */}
      <div style={{ position: 'absolute', top: '68%', right: '3vw', maxWidth: '300px', textAlign: 'left', zIndex: 5 }}>
        <p style={{ fontSize: '0.9rem', color: '#CBD5E1', fontWeight: 400, lineHeight: '1.65', margin: 0 }}>
          {lang === 'pl' 
            ? <>Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>masowo wybierana przez klientów.</strong></>
            : <>We combine brand strategy, cutting-edge UI/UX design, and advanced SEO so your company stands out, gets trusted, and <strong style={{ color: '#FFFFFF', fontWeight: 600 }}>converts customers at scale.</strong></>
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
