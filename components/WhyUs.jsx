'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

const whyUsCards = [
  {
    id: 1,
    tag: 'TRUST & CONVERSION',
    metric: '81%',
    text: 'klientów musi zaufać marce, zanim podejmie decyzję o zakupie.',
    detail: 'Projektujemy interfejsy i architekturę informacji, które od pierwszej sekundy budują wiarygodność i prowadzą użytkownika do zakupu.',
    visual: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.25) 0%, rgba(0,0,0,0) 70%)'
  },
  {
    id: 2,
    tag: 'BRAND RECOGNITION',
    metric: '+80%',
    text: 'wzrostu rozpoznawalności dzięki spójnemu systemowi wizualnemu.',
    detail: 'Tworzymy wyróżniającą się identyfikację marki i nowoczesny design, który zostaje w pamięci odbiorców na długo.',
    visual: 'radial-gradient(circle at 50% 50%, rgba(56, 189, 248, 0.25) 0%, rgba(0,0,0,0) 70%)'
  },
  {
    id: 3,
    tag: 'REVENUE IMPACT',
    metric: '+23%',
    text: 'średniego przychodu więcej przy jednolitej komunikacji SEO & Web.',
    detail: 'Łączymy analitykę, optymalizację pod kątem wyszukiwarek (SEO) i UX, przekładając ruch w sieci bezpośrednio na wyniki finansowe.',
    visual: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, rgba(0,0,0,0) 70%)'
  }
];

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.whyus-apple-card');
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index) => {
    const container = document.getElementById('whyus-carousel');
    if (container) {
      const cards = container.querySelectorAll('.whyus-apple-card');
      if (cards[index]) {
        const targetScrollLeft = cards[index].offsetLeft - (container.clientWidth - cards[index].offsetWidth) / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="why-us" id="why-us" style={{ background: '#F5F5F7', padding: '7rem 0', color: '#1D1D1F' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto', textAlign: 'center' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> WHY US
          </div>
          <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15, color: '#1D1D1F', marginBottom: '1.25rem' }}>
            Result driven projects, with a focus on design and functionality
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6 }}>
            Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych.
          </p>
        </Reveal>
      </div>

      {/* Apple-style Carousel (Full Screen Width) */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="whyus-carousel"
          onScroll={handleScroll}
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            gap: '1.5rem',
            paddingBottom: '2rem',
            paddingLeft: 'calc(50vw - min(42.5vw, 600px))',
            paddingRight: 'calc(50vw - min(42.5vw, 600px))',
            scrollPaddingLeft: 'calc(50vw - min(42.5vw, 600px))'
          }}
        >
          <style jsx>{`
            #whyus-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {whyUsCards.map((item) => (
            <RevealItem 
              key={item.id} 
              className="whyus-apple-card"
              style={{
                flex: '0 0 min(85vw, 1200px)',
                scrollSnapAlign: 'center',
                background: '#000000', 
                borderRadius: '36px',
                padding: '4rem 3.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '480px',
                border: '1px solid rgba(255,255,255,0.08)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Subtle background glow effect */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: item.visual,
                pointerEvents: 'none',
                opacity: 0.8
              }} />

              <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-cta)', marginBottom: '1.5rem' }}>
                  {item.tag}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '2rem' }}>
                  <div style={{ flex: '1 1 320px', maxWidth: '550px' }}>
                    <div style={{ fontSize: 'clamp(4.5rem, 8vw, 7rem)', fontWeight: 800, color: '#FFFFFF', lineHeight: 1, letterSpacing: '-0.04em', marginBottom: '1rem' }}>
                      {item.metric}
                    </div>
                    <div style={{ fontSize: '1.4rem', color: '#E4E4E7', fontWeight: 600, lineHeight: 1.4, marginBottom: '1rem' }}>
                      {item.text}
                    </div>
                  </div>

                  <div style={{ flex: '1 1 300px', maxWidth: '450px', background: 'rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)' }}>
                    <p style={{ color: '#A1A1AA', fontSize: '1.05rem', lineHeight: 1.7, margin: 0 }}>
                      {item.detail}
                    </p>
                  </div>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Pagination Controls (1:1 Apple Style) */}
        <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '10px', padding: '10px 20px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
            {whyUsCards.map((_, idx) => (
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                style={{
                  width: activeIndex === idx ? '36px' : '6px',
                  height: '6px',
                  borderRadius: activeIndex === idx ? '3px' : '50%',
                  background: activeIndex === idx ? '#1D1D1F' : '#86868B',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button 
            onClick={() => scrollTo((activeIndex + 1) % whyUsCards.length)}
            style={{ 
              background: '#E8E8ED', 
              border: 'none', 
              borderRadius: '50%', 
              width: '32px', 
              height: '32px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '0',
              transition: 'background 0.2s ease'
            }}
            aria-label="Next slide"
          >
            <svg width="10" height="10" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none" style={{ marginLeft: '1px' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
