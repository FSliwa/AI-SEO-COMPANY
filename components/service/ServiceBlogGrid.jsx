'use client';

import { useTranslations, useLocale } from 'next-intl';
import Image from 'next/image';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function ServiceBlogGrid({ tag, title, subtitle, heroItem, items }) {
  const lang = useLocale();

  return (
    <section style={{ padding: '90px 0', backgroundColor: '#F5F5F7' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        <Reveal>
          <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'inline-flex' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
          </div>
          <h2 style={{ 
            fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', 
            fontWeight: 700, 
            color: '#1D1D1F', 
            marginBottom: '1rem',
            letterSpacing: '-0.04em',
            lineHeight: 1.15
          }}>
            {title}
          </h2>
          {subtitle && (
            <p style={{ fontSize: '1.15rem', color: '#6E6E73', marginBottom: '2.5rem', fontWeight: 500, maxWidth: '650px' }}>
              {subtitle}
            </p>
          )}
        </Reveal>

        {/* Featured Hero Card (Same as Blog page) */}
        {heroItem && (
          <Reveal delay={0.1}>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
              backgroundColor: '#FFFFFF', 
              borderRadius: '28px', 
              overflow: 'hidden',
              marginBottom: '2rem',
              boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
              border: '1px solid rgba(0,0,0,0.05)'
            }}>
              <div style={{ height: '340px', width: '100%', position: 'relative' }}>
                <Image 
                  src={heroItem.image} 
                  alt={heroItem.title} 
                  fill
                  style={{ objectFit: 'cover' }} 
                />
              </div>
              <div style={{ padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.75rem' }}>
                  {heroItem.category}
                </div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', lineHeight: 1.25, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  {heroItem.title}
                </h3>
                <p style={{ color: '#6E6E73', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
                  {heroItem.description}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 500 }}>
                  {heroItem.date}
                </div>
              </div>
            </div>
          </Reveal>
        )}

        {/* 3 Bento Cards Grid (Same as Blog page) */}
        <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
          {items.map((item, idx) => (
            <RevealItem key={idx}>
              <div style={{ 
                backgroundColor: '#FFFFFF', 
                borderRadius: '24px', 
                overflow: 'hidden', 
                height: '100%',
                display: 'flex', 
                flexDirection: 'column',
                boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)'
              }}>
                <div style={{ height: '210px', width: '100%', position: 'relative' }}>
                  <Image 
                    src={item.image} 
                    alt={item.title} 
                    fill
                    style={{ objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '2rem 1.75rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.6rem' }}>
                      {item.category}
                    </div>
                    <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#1D1D1F', lineHeight: 1.3, letterSpacing: '-0.01em', marginBottom: '0.75rem' }}>
                      {item.title}
                    </h3>
                    <p style={{ color: '#6E6E73', fontSize: '0.95rem', lineHeight: 1.55, margin: 0 }}>
                      {item.description}
                    </p>
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#86868B', fontWeight: 500, marginTop: '1.5rem' }}>
                    {item.date}
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
