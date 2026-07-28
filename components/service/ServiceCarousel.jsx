'use client';

import { useState, useRef } from 'react';
import { Reveal } from '@/components/ScrollReveal';

export default function ServiceCarousel({ tag, title, subtitle, items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const scrollPosition = container.scrollLeft;
    const firstCard = container.querySelector('.service-carousel-card');
    const cardWidth = firstCard ? firstCard.offsetWidth + 24 : 360;
    const newIndex = Math.round(scrollPosition / cardWidth);
    setActiveIndex(Math.max(0, Math.min(newIndex, items.length - 1)));
  };

  const scrollPrev = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
  };

  const scrollNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
  };

  return (
    <section style={{ padding: '80px 0 100px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
        {/* Header with Navigation Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '3rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'inline-flex' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15 }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{ fontSize: '1.15rem', color: '#6E6E73', marginTop: '0.75rem', fontWeight: 500, maxWidth: '650px' }}>
                  {subtitle}
                </p>
              )}
            </Reveal>
          </div>

          {/* Nav buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
            <button 
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                opacity: activeIndex === 0 ? 0.4 : 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              aria-label="Poprzedni slajd"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button 
              onClick={scrollNext}
              disabled={activeIndex === items.length - 1}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FFFFFF',
                border: '1px solid rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === items.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === items.length - 1 ? 0.4 : 1,
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                transition: 'all 0.2s ease'
              }}
              aria-label="Następny slajd"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Width Edge-to-Edge Carousel Wrapper (Like Homepage WhyUs) */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          id="service-carousel-scroll"
          style={{ 
            display: 'flex', 
            gap: '24px', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            paddingBottom: '2rem',
            paddingLeft: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)',
            paddingRight: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)',
            scrollPaddingLeft: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)'
          }}
        >
          <style jsx>{`
            #service-carousel-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          
          {items.map((item, idx) => {
            // Vary card width and height per item to give dynamic Apple bento feel
            const flexBasis = item.width || (idx === 0 ? 'min(85vw, 460px)' : idx % 2 === 1 ? 'min(75vw, 360px)' : 'min(80vw, 410px)');
            const minHeight = item.minHeight || (idx === 0 ? '360px' : '340px');

            return (
              <div 
                key={idx}
                className="service-carousel-card"
                style={{
                  flex: `0 0 ${flexBasis}`,
                  scrollSnapAlign: 'start',
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  padding: '2.75rem 2.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.03)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  minHeight: minHeight,
                  position: 'relative'
                }}
              >
                <div>
                  {item.number && (
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>
                      {item.number}
                    </div>
                  )}
                  {item.metric && (
                    <div style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '0.75rem', letterSpacing: '-0.04em' }}>
                      {item.metric}
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.45rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.25 }}>
                    {item.title}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
