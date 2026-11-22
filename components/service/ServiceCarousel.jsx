'use client';

import { useState, useRef } from 'react';
import { Reveal } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';
import { zachowaniePrzewijania } from '@/lib/ruch';

export default function ServiceCarousel({ tag, title, subtitle, items }) {
  const lang = useLocale();
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
    containerRef.current.scrollBy({ left: -420, behavior: zachowaniePrzewijania() });
  };

  const scrollNext = () => {
    if (!containerRef.current) return;
    containerRef.current.scrollBy({ left: 420, behavior: zachowaniePrzewijania() });
  };

  return (
    <section style={{ padding: '80px 0 100px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="container" style={{ margin: '0 auto' }}>
        {/* Header with Navigation Controls */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-end', 
          marginBottom: '3.5rem',
          flexWrap: 'wrap',
          gap: '1.5rem'
        }}>
          <div>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', marginBottom: '1rem', display: 'inline-flex', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
                <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {tag}
              </div>
              <h2 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 500, color: 'var(--w-tusz)', letterSpacing: '-0.04em', lineHeight: 1.08 }}>
                {title}
              </h2>
              {subtitle && (
                <p style={{ fontSize: '1.15rem', color: 'var(--w-tusz-2)', marginTop: '0.75rem', fontWeight: 400, maxWidth: '650px' }}>
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
                background: 'var(--w-karta)',
                border: '1px solid var(--w-linia)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                opacity: activeIndex === 0 ? 0.4 : 1,
                boxShadow: 'none',
                transition: 'border-color 0.2s ease, opacity 0.2s ease'
              }}
              aria-label={lang === 'pl' ? 'Poprzedni slajd' : 'Previous slide'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--w-tusz)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                background: 'var(--w-karta)',
                border: '1px solid var(--w-linia)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === items.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === items.length - 1 ? 0.4 : 1,
                boxShadow: 'none',
                transition: 'border-color 0.2s ease, opacity 0.2s ease'
              }}
              aria-label={lang === 'pl' ? 'Następny slajd' : 'Next slide'}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--w-tusz)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
            gap: '20px', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            paddingBottom: '2rem',
            paddingLeft: 'max(1.25rem, calc((100vw - var(--container-width)) / 2 + 1.5rem))',
            paddingRight: 'max(1.25rem, calc((100vw - var(--container-width)) / 2 + 1.5rem))',
            scrollPaddingLeft: 'max(1.25rem, calc((100vw - var(--container-width)) / 2 + 1.5rem))'
          }}
        >
          <style jsx>{`
            #service-carousel-scroll::-webkit-scrollbar { display: none; }
          `}</style>
          
          {items.map((item, idx) => {
            const flexBasis = item.width || 'min(84vw, 390px)';
            const minHeight = item.minHeight || '330px';

            return (
              <div 
                key={idx}
                className="service-carousel-card"
                style={{
                  flex: `0 0 ${flexBasis}`,
                  scrollSnapAlign: 'start',
                  background: 'var(--w-karta)',
                  borderRadius: '24px',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: 'none',
                  border: '1px solid var(--w-linia)',
                  minHeight: minHeight,
                  position: 'relative'
                }}
              >
                <div>
                  {item.number && (
                    <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.8rem', fontWeight: 500, color: 'var(--w-pomarancz-tekst)', marginBottom: '1rem', letterSpacing: '0.14em' }}>
                      {lang === 'pl' ? item.number : (item.numberEn || item.number)}
                    </div>
                  )}
                  {item.metric && (
                    <div style={{ fontSize: '2.35rem', fontWeight: 600, color: 'var(--w-tusz)', marginBottom: '0.75rem', letterSpacing: '-0.035em' }}>
                      {lang === 'pl' ? item.metric : (item.metricEn || item.metric)}
                    </div>
                  )}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 600, color: 'var(--w-tusz)', letterSpacing: '-0.025em', marginBottom: '0.85rem', lineHeight: 1.22 }}>
                    {lang === 'pl' ? item.title : (item.titleEn || item.title)}
                  </h3>
                  <p style={{ color: 'var(--w-tusz-2)', fontSize: '1.02rem', lineHeight: 1.6, margin: 0 }}>
                    {lang === 'pl' ? item.description : (item.descriptionEn || item.description)}
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
