'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from '../ScrollReveal';

function CountUpMetric({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    const match = value.match(/([\+]*)([0-9\.]+)(.*)/);
    if (!match) return;
    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';

    const duration = 1200;
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * targetNum);

      setDisplayValue(`${prefix}${currentVal}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function AboutMission() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const lang = useLocale();

  const aboutCards = [
    {
      id: 1,
      tag: lang === 'pl' ? 'AI & DATA-DRIVEN' : 'AI & DATA-DRIVEN',
      metric: '100%',
      title: lang === 'pl' ? 'Strategia oparta na twardych danych' : 'Strategy based on hard data',
      description: lang === 'pl' 
        ? 'Nie zgadujemy. Wykorzystujemy zaawansowaną analitykę i algorytmy AI do precyzyjnego pozycjonowania i architektury treści, gwarantując najwyższą skuteczność działań.'
        : 'We don’t guess. We use advanced analytics and AI algorithms for precise positioning and content architecture, guaranteeing maximum campaign effectiveness.',
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      tag: lang === 'pl' ? 'APPLE-GRADE DESIGN' : 'APPLE-GRADE DESIGN',
      metric: 'UX',
      title: lang === 'pl' ? 'Bezkompromisowa estetyka i minimalizm' : 'Uncompromising aesthetics and minimalism',
      description: lang === 'pl'
        ? 'Wierzymy, że premium design sprzedaje. Tworzymy czyste, minimalistyczne interfejsy inspirowane najwyższymi standardami w branży tech, aby budować bezwzględne zaufanie.'
        : 'We believe premium design sells. We craft clean, minimalist interfaces inspired by the highest standards in the tech industry to build absolute trust.',
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      tag: lang === 'pl' ? 'CRO & KONWERSJA' : 'CRO & CONVERSION',
      metric: 'ROI',
      title: lang === 'pl' ? 'Hiper-optymalizacja konwersji sprzedażowej' : 'Hyper-optimization of sales conversion',
      description: lang === 'pl'
        ? 'Ruch to tylko początek. Nasze projekty są zaprojektowane od podstaw w taki sposób, aby zamieniać anonimowych odwiedzających w płacących, lojalnych klientów.'
        : 'Traffic is just the beginning. Our projects are designed from the ground up to turn anonymous visitors into paying, loyal customers.',
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      tag: lang === 'pl' ? 'PARTNERSTWO' : 'PARTNERSHIP',
      metric: '1:1',
      title: lang === 'pl' ? 'Traktujemy Twój biznes jak własny' : 'We treat your business as our own',
      description: lang === 'pl'
        ? 'Nie jesteśmy tylko wykonawcą – stajemy się przedłużeniem Twojego zespołu. Angażujemy się w zrozumienie Twojego modelu biznesowego, by wspólnie budować długoterminowy sukces.'
        : 'We are not just a contractor – we become an extension of your team. We commit to understanding your business model to build long-term success together.',
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      tag: lang === 'pl' ? 'INNOWACJA' : 'INNOVATION',
      metric: '∞',
      title: lang === 'pl' ? 'Nigdy nie osiadamy na laurach' : 'We never rest on our laurels',
      description: lang === 'pl'
        ? 'Technologia i algorytmy zmieniają się każdego dnia. Dlatego uczymy się i adaptujemy jeszcze szybciej, wyznaczając nowe standardy w branży, a nie tylko za nimi podążając.'
        : 'Technology and algorithms change every day. That’s why we learn and adapt even faster, setting new industry standards rather than just following them.',
      bgVisual: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 245, 247, 0.4))'
    }
  ];

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.whyus-card-item');
    if (!cards || !cards.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenterX - cardCenterX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollTo = (index) => {
    const container = document.getElementById('about-mission-carousel');
    if (container) {
      const cards = container.querySelectorAll('.whyus-card-item');
      if (cards[index]) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = cards[index].getBoundingClientRect();
        const scrollOffset = cardRect.left - containerRect.left + container.scrollLeft - (containerRect.width - cardRect.width) / 2;
        container.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(0, activeIndex - 1);
    scrollTo(prevIndex);
  };

  const scrollNext = () => {
    const nextIndex = Math.min(aboutCards.length - 1, activeIndex + 1);
    scrollTo(nextIndex);
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % aboutCards.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex]);

  return (
    <section className="why-us" id="about-mission" style={{ background: 'var(--color-bg-surface)', padding: '7rem 0', color: '#1D1D1F' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Top Header Row with Apple-style Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <Reveal className="section-header" style={{ maxWidth: '720px', margin: 0 }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'KIM JESTEŚMY' : 'WHO WE ARE'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15, color: '#1D1D1F', marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Nie jesteśmy zwykłą agencją. Jesteśmy architektami Twojego wzrostu' : 'We are not just an agency. We are the architects of your growth'}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
              {lang === 'pl' ? 'O nas: Nie jesteśmy zwykłą agencją. Jako nowoczesna Agencja SEO Warszawa (AI SEO COMPANY), tworzymy rozwiązania poparte twardymi danymi analitycznymi. Faktycznie jesteśmy architektami Twojego wzrostu.' : 'About Us: As a professional SEO Firm, Marketing Agency and leading SEO Agency Warsaw (AI SEO COMPANY), we craft digital solutions backed by hard analytics. We are the architects of your digital growth.'}
            </p>
          </Reveal>

          {/* Top Right Apple Circular Arrow Buttons */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button 
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                opacity: activeIndex === 0 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label="Previous slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button 
              onClick={scrollNext}
              disabled={activeIndex === aboutCards.length - 1}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === aboutCards.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === aboutCards.length - 1 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label="Next slide"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Apple Productivity Carousel */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="about-mission-carousel"
          onScroll={handleScroll}
          style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            gap: '1.5rem',
            paddingBottom: '2rem',
            paddingLeft: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)',
            paddingRight: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)',
            scrollPaddingLeft: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)'
          }}
        >
          <style jsx>{`
            #about-mission-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {aboutCards.map((item, idx) => (
            <RevealItem 
              key={item.id} 
              className="whyus-card-item"
              style={{
                flex: idx === 0 ? '0 0 min(85vw, 580px)' : '0 0 min(75vw, 420px)',
                scrollSnapAlign: 'center',
                background: '#FFFFFF',
                borderRadius: '28px',
                padding: '2.5rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
                minHeight: '480px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Graphic / Stat Visual Area */}
              <div style={{ 
                width: '100%', 
                height: '210px', 
                flexShrink: 0,
                borderRadius: '20px', 
                background: item.bgVisual, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '1.25rem 1rem',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem', textAlign: 'center', whiteSpace: 'nowrap' }}>
                  {item.tag}
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                  style={{ fontSize: 'clamp(4rem, 6.5vw, 6rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.1, letterSpacing: '-0.03em', whiteSpace: 'nowrap', textAlign: 'center' }}
                >
                  <CountUpMetric value={item.metric} />
                </motion.div>
              </div>

              {/* Bottom Text Area */}
              <div style={{ marginTop: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#1D1D1F', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#424245', fontWeight: 400, lineHeight: 1.55, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Bottom Pagination & Play Controls */}
        <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
            {aboutCards.map((_, idx) => (
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
