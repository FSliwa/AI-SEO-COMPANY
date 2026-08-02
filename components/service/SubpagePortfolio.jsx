'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';

export default function SubpagePortfolio({ title = "Nasze realizacje", subtitle = "Zobacz wyniki naszej pracy", cases = [], layout = "horizontal" }) {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const lang = useLocale();

  if (!cases || cases.length === 0) return null;

  const scrollPrev = () => {
    const el = document.getElementById("subpage-portfolio-carousel");
    if (el) {
      el.scrollBy({ left: -480, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    const el = document.getElementById("subpage-portfolio-carousel");
    if (el) {
      el.scrollBy({ left: 480, behavior: 'smooth' });
    }
  };

  return (
    <section style={{ padding: '8rem 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1240px' }}>
        <Reveal>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', marginBottom: '3.5rem', width: '100%' }}>
            <div style={{ maxWidth: '780px' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'inline-flex' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> NASZE REALIZACJE
              </div>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', 
                fontWeight: 700, 
                color: '#1D1D1F', 
                letterSpacing: '-0.04em',
                marginBottom: '1rem',
                lineHeight: 1.15
              }}>
                {title}
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '1.25rem', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                {subtitle}
              </p>
            </div>

            {/* Navigation Arrows (Apple Circular Style matching WhyUs) */}
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexShrink: 0, marginBottom: '0.5rem' }}>
              <button 
                onClick={scrollPrev}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#E8E8ED',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#DCDCE0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#E8E8ED'}
                aria-label="Poprzedni slajd"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button 
                onClick={scrollNext}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#E8E8ED',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#DCDCE0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#E8E8ED'}
                aria-label="Następny slajd"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
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
            paddingTop: '0',
            paddingBottom: '3.5rem',
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
          
          {cases.map((c, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
            <RevealItem 
              key={idx} 
              style={{
                flex: layout === 'vertical' ? (isExpanded ? '0 0 min(90vw, 800px)' : '0 0 min(85vw, 400px)') : '0 0 min(85vw, 1100px)',
                transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease',
                minHeight: layout === 'vertical' ? '600px' : 'auto',
                scrollSnapAlign: 'center',
                background: '#000000', 
                borderRadius: '36px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: layout === 'vertical' 
                  ? '0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 10px 20px -5px rgba(0, 0, 0, 0.1)'
                  : '0 20px 40px -10px rgba(0, 0, 0, 0.12), 0 8px 16px -4px rgba(0, 0, 0, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                position: 'relative'
              }}
            >
              {layout === 'vertical' ? (
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '2.5rem', position: 'relative', zIndex: 1, minHeight: '600px' }}>
                  {/* Full Background Image */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: -1, overflow: 'hidden' }}>
                    <Image 
                      src={lang === 'pl' ? c.image : (c.imageEn || c.image)} 
                      alt={lang === 'pl' ? (c.imgAlt || c.title) : (c.imgAltEn || c.titleEn || c.imgAlt || c.title)}
                      title={lang === 'pl' ? (c.imgTitle || c.title) : (c.imgTitleEn || c.titleEn || c.imgTitle || c.title)}
                      fill
                      style={{ objectFit: 'cover', display: 'block', transition: 'transform 0.7s ease' }} 
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.15) 45%, rgba(0,0,0,0.85) 100%)' }} />
                  </div>

                  {/* Top Text */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', opacity: 0.9, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                      {lang === 'pl' ? c.tag : (c.tagEn || c.tag)}
                    </div>
                    <h3 style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      {lang === 'pl' ? c.title : (c.titleEn || c.title)}
                    </h3>
                  </div>

                  {/* Expanded Content */}
                  <div style={{ 
                    marginTop: '2rem',
                    opacity: isExpanded ? 1 : 0,
                    height: isExpanded ? 'auto' : 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.4s ease',
                    color: '#FFFFFF'
                  }}>
                    <p 
                      style={{ fontSize: '1.1rem', lineHeight: 1.6, opacity: 0.9, maxWidth: '500px' }}
                      dangerouslySetInnerHTML={{ __html: lang === 'pl' ? c.description : (c.descriptionEn || c.description) }}
                    />
                    
                    {c.metric2 && (
                      <div style={{ marginTop: '2rem' }}>
                        <div style={{ fontSize: '0.9rem', color: '#FFFFFF', opacity: 0.8, fontWeight: 500, marginBottom: '0.25rem' }}>
                          {lang === 'pl' ? c.metric2Label : (c.metric2LabelEn || c.metric2Label)}
                        </div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>{c.metric2}</div>
                      </div>
                    )}
                  </div>

                  {/* Bottom Content */}
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.9, fontWeight: 500, marginBottom: '0.25rem' }}>
                        {lang === 'pl' ? c.metricLabel : (c.metricLabelEn || c.metricLabel)}
                      </div>
                      <div style={{ fontSize: '3rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {c.metric}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      style={{ 
                        width: '36px', height: '36px', borderRadius: '50%', 
                        background: 'rgba(255,255,255,0.25)', 
                        backdropFilter: 'blur(10px)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        border: 'none', cursor: 'pointer', outline: 'none'
                      }}
                      aria-label={isExpanded ? "Zwiń szczegóły" : "Rozwiń szczegóły"}
                    >
                      <svg 
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              ) : (
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
                        {lang === 'pl' ? c.tag : (c.tagEn || c.tag)}
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
                      {lang === 'pl' ? c.title : (c.titleEn || c.title)}
                    </h3>
                    <p 
                      style={{ color: '#86868B', fontSize: '1.15rem', lineHeight: 1.6, marginBottom: '3rem', maxWidth: '500px', flex: 1 }}
                      dangerouslySetInnerHTML={{ __html: lang === 'pl' ? c.description : (c.descriptionEn || c.description) }}
                    />
                    
                    <div style={{ display: 'flex', gap: '3rem', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem' }}>
                      <div>
                        <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{c.metric}</div>
                        <div style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                          {lang === 'pl' ? c.metricLabel : (c.metricLabelEn || c.metricLabel)}
                        </div>
                      </div>
                      {c.metric2 && (
                        <div>
                          <div style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em' }}>{c.metric2}</div>
                          <div style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                            {lang === 'pl' ? c.metric2Label : (c.metric2LabelEn || c.metric2Label)}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Image Side */}
                  <div className="portfolio-image-wrapper" style={{ 
                    width: '45%', 
                    position: 'relative', 
                    overflow: 'hidden', 
                    background: c.gradient || 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <Image 
                      src={c.image} 
                      alt={lang === 'pl' ? (c.imgAlt || c.title || 'Realizacja SEO') : (c.imgAltEn || c.titleEn || c.imgAlt || c.title || 'SEO Case Study')}
                      title={lang === 'pl' ? (c.imgTitle || c.title) : (c.imgTitleEn || c.titleEn || c.imgTitle || c.title)}
                      fill
                      style={{ objectFit: 'cover', display: 'block', position: 'relative', zIndex: 2 }}
                    />
                    
                    {/* Futuristic Fallback Visual Grid & Glowing Orb */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, overflow: 'hidden' }}>
                      <div style={{
                        position: 'absolute',
                        top: '15%',
                        left: '15%',
                        width: '70%',
                        height: '70%',
                        background: 'radial-gradient(circle, rgba(99,102,241,0.4) 0%, rgba(0,0,0,0) 70%)',
                        filter: 'blur(35px)'
                      }} />
                      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.2 }}>
                        <defs>
                          <pattern id={`card-grid-${idx}`} width="36" height="36" patternUnits="userSpaceOnUse">
                            <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#FFFFFF" strokeWidth="1"/>
                          </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill={`url(#card-grid-${idx})`} />
                      </svg>
                    </div>
                  </div>
                </div>
              )}
            </RevealItem>
            );
          })}
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
          {lang === 'pl' ? 'Zobacz pełne portfolio wyników' : 'View full portfolio of results'}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
      </Reveal>
    </section>
  );
}
