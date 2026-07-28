'use client';

import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function SubpagePortfolio({ title = "Nasze realizacje", subtitle = "Zobacz wyniki naszej pracy", cases = [] }) {
  if (!cases || cases.length === 0) return null;

  return (
    <section style={{ padding: '8rem 0', background: 'linear-gradient(to bottom, var(--color-bg-surface) 75%, #ffffff 100%)', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        <Reveal>
          <div className="section-header center" style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'inline-flex' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> NASZE REALIZACJE
            </div>
            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              letterSpacing: '-0.04em',
              marginBottom: '1rem'
            }}>
              {title}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              {subtitle}
            </p>
          </div>
        </Reveal>
      </div>

      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="subpage-portfolio-carousel"
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            gap: '2rem',
            paddingBottom: '2rem',
            paddingLeft: 'calc(50vw - min(42.5vw, 600px))',
            paddingRight: 'calc(50vw - min(42.5vw, 600px))',
            scrollPaddingLeft: 'calc(50vw - min(42.5vw, 600px))'
          }}
        >
          <style jsx>{`
            #subpage-portfolio-carousel::-webkit-scrollbar { display: none; }
            @media (max-width: 900px) {
              .portfolio-card-inner {
                flex-direction: column !important;
              }
              .portfolio-image-wrapper {
                height: 300px !important;
                width: 100% !important;
              }
            }
          `}</style>
          
          {cases.map((c, idx) => (
            <RevealItem 
              key={idx} 
              style={{
                flex: '0 0 min(85vw, 1100px)',
                scrollSnapAlign: 'center',
                background: '#000000', 
                borderRadius: '36px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
              }}
            >
              <div className="portfolio-card-inner" style={{ display: 'flex', width: '100%', height: '100%' }}>
                {/* Content Side */}
                <div style={{ flex: '1', padding: '4rem 3.5rem', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '2rem' }}>
                    <div style={{ 
                      color: 'var(--color-primary)', 
                      fontSize: '0.85rem', 
                      fontWeight: 700, 
                      letterSpacing: '0.05em',
                      textTransform: 'uppercase'
                    }}>
                      {c.tag}
                    </div>
                    <div style={{ 
                      color: '#FFFFFF', 
                      fontSize: '5rem', 
                      fontWeight: 700, 
                      opacity: 0.1, 
                      lineHeight: 0.8,
                      fontFamily: "'Space Grotesk', sans-serif"
                    }}>
                      0{idx + 1}
                    </div>
                  </div>
                  
                  <h3 style={{ color: '#FFFFFF', fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 600, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                    {c.title}
                  </h3>
                  <p style={{ color: '#86868B', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px', flex: 1 }}>
                    {c.description}
                  </p>
                  
                  <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                    <div>
                      <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{c.metric}</div>
                      <div style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>{c.metricLabel}</div>
                    </div>
                    {c.metric2 && (
                      <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{c.metric2}</div>
                        <div style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>{c.metric2Label}</div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Image Side */}
                <div className="portfolio-image-wrapper" style={{ width: '45%', position: 'relative', overflow: 'hidden' }}>
                  <img 
                    src={c.image} 
                    alt={c.title} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>

      <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem', padding: '0 2rem' }}>
        <a 
          href="/#portfolio" 
          className="btn" 
          style={{ 
            padding: '1.1rem 2.5rem', 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            borderRadius: '50px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: '#1D1D1F',
            color: '#FFFFFF',
            textDecoration: 'none',
            boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 15px 40px rgba(0,0,0,0.15)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
          }}
        >
          Zobacz pełne portfolio wyników
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
