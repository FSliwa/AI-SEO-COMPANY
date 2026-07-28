'use client';

import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function SubpagePortfolio({ title = "Nasze realizacje", subtitle = "Zobacz wyniki naszej pracy", cases = [] }) {
  if (!cases || cases.length === 0) return null;

  return (
    <section style={{ padding: '6rem 0' }}>
      <div className="container">
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ 
              fontSize: 'clamp(2rem, 4vw, 3rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              letterSpacing: '-0.02em',
              marginBottom: '1rem'
            }}>
              {title}
            </h2>
            <p style={{ color: '#86868B', fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto' }}>
              {subtitle}
            </p>
          </div>
        </Reveal>

        <RevealStagger delay={0.2} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          {cases.map((c, idx) => (
            <RevealItem key={idx} style={{ 
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px', 
              overflow: 'hidden',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ height: '240px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={c.image} 
                  alt={c.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div style={{ padding: '2rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.5rem' }}>
                  {c.tag}
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1rem', letterSpacing: '-0.01em' }}>
                  {c.title}
                </h3>
                <p style={{ color: '#515154', fontSize: '1rem', lineHeight: 1.6, marginBottom: '2rem', flex: 1 }}>
                  {c.description}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #E5E5EA', paddingTop: '1.5rem' }}>
                  <div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em' }}>{c.metric}</div>
                    <div style={{ fontSize: '0.85rem', color: '#86868B' }}>{c.metricLabel}</div>
                  </div>
                  {c.metric2 && (
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em' }}>{c.metric2}</div>
                      <div style={{ fontSize: '0.85rem', color: '#86868B' }}>{c.metric2Label}</div>
                    </div>
                  )}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
