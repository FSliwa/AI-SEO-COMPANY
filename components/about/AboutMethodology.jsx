'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from '../ScrollReveal';

const methodologyStages = [
  {
    id: 1,
    brandName: 'KROK 1',
    brandLogo: (
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '1.2rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
        KROK 1
      </span>
    ),
    metric: 'ARCHITEKTURA & DESIGN',
    metricSubtitle: 'Projektowanie UX/UI i solidny fundament techniczny.',
    gradient: 'linear-gradient(135deg, #818CF8, #38BDF8, #C084FC)',
    layout: 'center',
    largeImage: '/images/unsplash-1561070791-2526d30994b5.jpg',
  },
  {
    id: 2,
    brandName: 'KROK 2',
    brandLogo: (
      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.4rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
        KROK 2
      </span>
    ),
    metric: 'ZAAWANSOWANE SEO',
    metricSubtitle: 'Budowanie struktury treści, techniczne SEO i organiczny wzrost.',
    gradient: 'linear-gradient(135deg, #818CF8, #60A5FA, #34D399)',
    layout: 'right-side',
    desktopCard: {
      image: '/images/unsplash-1460925895917-afdab827c52f.jpg',
    },
  },
  {
    id: 3,
    brandName: 'KROK 3',
    brandLogo: (
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1.3rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
        KROK 3
      </span>
    ),
    metric: 'SKALOWANIE SPRZEDAŻY',
    metricSubtitle: 'Konwersja ruchu organicznego na realnych, płacących klientów.',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A855F7)',
    layout: 'center-reverse',
    largeImage: '/images/unsplash-1552581234-26160f608093.jpg',
  }
];

export default function AboutMethodology() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const lang = useLocale();

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.apple-card');
    if (!cards || !cards.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect('left') + containerRect('width') / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect('left') + cardRect('width') / 2;
      const distance = Math.abs(containerCenterX - cardCenterX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollTo = (index) => {
    const container = document('getElementById')('about-methodology-carousel');
    if (container) {
      const cards = container.querySelectorAll('.apple-card');
      if (cards[index]) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = cards[index].getBoundingClientRect();
        const scrollOffset = cardRect('left') - containerRect('left') + container.scrollLeft - (containerRect('width') - cardRect('width')) / 2;
        container.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % methodologyStages.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex]);

  return (
    <section className="portfolio" id="about-methodology" style={{ background: 'var(--color-bg-surface)', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Top Header Row */}
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'NASZA METODOLOGIA' : 'OUR METHODOLOGY'}
          </div>
          <h2 style={{ color: '#1D1D1F', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', margin: '1rem 0' }}>
            {lang === 'pl' ? 'Trzy etapy do dominacji w Google' : 'Three steps to Google dominance'}
          </h2>
          <p style={{ color: '#6E6E73', fontSize: '1.25rem', fontWeight: 500 }}>
            {lang === 'pl' ? 'Poznaj proces, dzięki któremu wprowadzamy marki na szczyt wyników wyszukiwania.' : 'Explore the process that takes brands to the top of search results.'}
          </p>
        </Reveal>
      </div>

      {/* Apple-style Carousel */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
            id="about-methodology-carousel"
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
              #about-methodology-carousel::-webkit-scrollbar { display: none; }
            `}</style>
            
            {methodologyStages.map((item, index) => (
              <RevealItem 
                key={item.id} 
                className="apple-card"
                style={{
                  flex: '0 0 min(85vw, 1200px)',
                  scrollSnapAlign: 'center',
                  background: '#000000', 
                  borderRadius: '36px',
                  padding: '4rem 3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '600px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                
                {item.layout === 'center' ? (
                  <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', position: 'relative', width: '100%' }}>
                    <div className="portfolio-text-container" style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.5rem', zIndex: 2 }}>
                      <div style={{ marginBottom: '1.25rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                      <div style={{ 
                        fontSize: 'clamp(1.85rem, 3vw, 2.45rem)', 
                        fontWeight: 700, 
                        color: '#FFFFFF', 
                        letterSpacing: '-0.03em', 
                        lineHeight: 1.22, 
                        marginBottom: '0' 
                      }}>
                        {lang === 'pl' ? item.metric : item.metric}
                        <br />
                        <span style={{ fontSize: '1.25rem', color: '#A1A1AA', fontWeight: 500 }}>{lang === 'pl' ? item.metricSubtitle : item.metricSubtitle}</span>
                      </div>
                    </div>

                    <motion.div 
                      className="portfolio-image-container"
                      animate={{ scaleY: [1, 1.03, 1] }}
                      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                      style={{ 
                        width: '80%', 
                        height: '320px', 
                        position: 'absolute',
                        bottom: '-4.1rem',
                        left: '10%',
                        transformOrigin: 'bottom center',
                        borderTopLeftRadius: '24px', 
                        borderTopRightRadius: '24px', 
                        overflow: 'hidden', 
                        boxShadow: '0 -20px 60px rgba(0,0,0,0.9)', 
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderBottom: 'none',
                        zIndex: 1
                      }}
                    >
                      <Image 
                        src={item.largeImage} 
                        alt="Project screenshot" 
                        fill
                        style={{ 
                          marginTop: '-75px',
                          objectFit: 'cover', 
                          objectPosition: 'top' 
                        }} 
                      />
                    </motion.div>
                  </div>
                ) : item.layout === 'center-reverse' ? (
                  <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', position: 'relative', width: '100%' }}>
                    <motion.div 
                      className="portfolio-image-container"
                      animate={{ scaleY: [1, 1.03, 1] }}
                      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                      style={{ 
                        width: '80%', 
                        height: '320px', 
                        position: 'absolute',
                        top: '-4.1rem',
                        left: '10%',
                        transformOrigin: 'top center',
                        borderBottomLeftRadius: '24px', 
                        borderBottomRightRadius: '24px', 
                        borderTopLeftRadius: '0',
                        borderTopRightRadius: '0',
                        overflow: 'hidden', 
                        boxShadow: '0 20px 60px rgba(0,0,0,0.9)', 
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderTop: 'none',
                        zIndex: 1
                      }}
                    >
                      <Image 
                        src={item.largeImage} 
                        alt="Project screenshot" 
                        fill
                        style={{ 
                          objectFit: 'cover', 
                          objectPosition: 'top' 
                        }} 
                      />
                    </motion.div>

                    <div className="portfolio-text-container" style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 'auto', paddingBottom: '0.5rem', zIndex: 2, position: 'relative' }}>
                      <div style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0' }}>
                        {lang === 'pl' ? item.metric : item.metric}
                        <br />
                        <span style={{ fontSize: '1.25rem', color: '#A1A1AA', fontWeight: 500 }}>{lang === 'pl' ? item.metricSubtitle : item.metricSubtitle}</span>
                      </div>
                      
                      <div style={{ position: 'absolute', bottom: '-2.5rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                    </div>
                  </div>
                ) : item.layout === 'right-side' ? (
                  <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', width: '100%' }}>
                    <div className="portfolio-text-container" style={{ flex: '0 0 42%', maxWidth: '440px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                      <div style={{ marginBottom: '1.5rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                      
                      <div style={{ 
                        fontSize: 'clamp(2.2rem, 3.8vw, 3.5rem)', 
                        fontWeight: 700, 
                        color: '#FFFFFF', 
                        letterSpacing: '-0.035em', 
                        lineHeight: 1.18 
                      }}>
                        {lang === 'pl' ? item.metric : item.metric}
                        <br />
                        <span style={{ fontSize: '1.25rem', color: '#A1A1AA', fontWeight: 500 }}>{lang === 'pl' ? item.metricSubtitle : item.metricSubtitle}</span>
                      </div>
                    </div>

                    <motion.div 
                      className="portfolio-image-container"
                      animate={{ scale: [1, 1.008, 1] }}
                      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                      style={{ 
                        position: 'absolute',
                        right: '-1.5rem', 
                        top: '10%',
                        bottom: '10%',
                        width: 'calc(56% + 1.5rem)',
                        borderTopLeftRadius: '24px',
                        borderBottomLeftRadius: '24px',
                        borderTopRightRadius: '0',
                        borderBottomRightRadius: '0',
                        overflow: 'hidden',
                        boxShadow: '-15px 0 40px rgba(0,0,0,0.5)',
                        zIndex: 1
                      }}
                    >
                      <Image 
                        src={item.desktopCard ? item.desktopCard.image : '/projects/kafelek-staniax-full.png'} 
                        alt="Preview screenshot" 
                        fill
                        style={{ 
                          objectFit: 'cover', 
                          objectPosition: 'top left'
                        }} 
                      />
                    </motion.div>
                  </div>
                ) : null}
              </RevealItem>
            ))}
          </RevealStagger>
          
          <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
              {methodologyStages.map((_, idx) => (
                <motion.button
                  key={idx}
                  layout
                  initial={false}
                  onClick={() => scrollTo(idx)}
                  animate={{
                    width: activeIndex === idx ? '36px' : '8px',
                    backgroundColor: activeIndex === idx ? '#1D1D1F' : '#B0B0B5',
                    borderRadius: activeIndex === idx ? '8px' : '50%'
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 30
                  }}
                  style={{
                    height: '8px',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button 
              onClick={() => setIsAutoplay(!isAutoplay)}
              style={{ 
                background: '#E8E8ED', 
                border: 'none', 
                borderRadius: '50%', 
                width: '44px', 
                height: '44px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '0',
                transition: 'background 0.2s ease, transform 0.2s ease'
              }}
              aria-label={isAutoplay ? 'Pause' : 'Play'}
            >
              {isAutoplay ? (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none" style={{ marginLeft: '2px' }}>
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              )}
            </button>
          </Reveal>

        </div>
    </section>
  );
}
