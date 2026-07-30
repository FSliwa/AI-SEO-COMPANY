'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

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

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const { lang } = useLanguage();

  const whyUsCards = [
    {
      id: 1,
      tag: lang === 'pl' ? 'ZAUFANIE I KONWERSJA' : 'TRUST & CONVERSION',
      metric: '81%',
      title: lang === 'pl' ? 'Zaufanie klientów przed zakupem.' : 'Client trust before purchase.',
      description: lang === 'pl' 
        ? 'Statystyki jasno pokazują, że 81% klientów musi w pełni zaufać marce na podstawie jej wizerunku w sieci, zanim podejmie decyzję o zakupie. Nasz rygorystyczny proces projektowy UI/UX buduje u odbiorców poczucie bezpieczeństwa, co drastycznie zwiększa współczynnik konwersji i generuje więcej zapytań ofertowych.'
        : 'Industry data shows that 81% of clients must completely trust a brand online before making a purchasing decision. Our rigorous UI/UX design process instills immediate confidence, significantly boosting conversion rates and driving more high-value inquiries from your existing traffic.',
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      tag: lang === 'pl' ? 'ROZPOZNAWALNOŚĆ MARKI' : 'BRAND RECOGNITION',
      metric: '+80%',
      title: lang === 'pl' ? 'Wzrost rozpoznawalności firmy.' : 'Significant brand recall boost.',
      description: lang === 'pl'
        ? 'Profesjonalny branding to kluczowe narzędzie sprzedażowe. Tworzymy unikalne, spójne systemy wizualne i nowoczesną architekturę designu, która zwiększa zapamiętywalność marki o 80%. Dzięki temu Twoja firma jednoznacznie wyróżnia się na tle konkurencji, budując pozycję lidera.'
        : 'Professional branding is a critical sales tool. We develop unique, cohesive visual systems and modern design architectures that increase brand recall by 80%. This ensures your company stands out definitively from competitors, establishing a strong leadership position in your industry.',
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      tag: lang === 'pl' ? 'WPŁYW NA PRZYCHÓD' : 'REVENUE IMPACT',
      metric: '+23%',
      title: lang === 'pl' ? 'Średni wzrost przychodów.' : 'Average revenue increase.',
      description: lang === 'pl'
        ? 'Sama obecność w sieci to za mało. Łączymy zaawansowane pozycjonowanie SEO z psychologią konwersji, aby zmaksymalizować Twoje zyski. Zastosowanie premium designu na wszystkich etapach ścieżki klienta przekłada się na udokumentowany średni wzrost przychodów firmy o 23%.'
        : 'Merely being online is not enough. We effectively combine advanced SEO with conversion psychology to maximize your ROI. Implementing a consistent, premium design across the entire customer journey translates to a documented average revenue increase of 23%.',
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      tag: lang === 'pl' ? 'RUCH ORGANICZNY' : 'ORGANIC TRAFFIC',
      metric: '+310%',
      title: lang === 'pl' ? 'Dynamiczny wzrost wartościowego ruchu.' : 'Dynamic high-intent traffic growth.',
      description: lang === 'pl'
        ? 'Optymalizujemy intencjonalne frazy komercyjne, dostarczając klientów z Google gotowych do zakupu.'
        : 'We optimize targeted commercial keywords, driving buyers from Google ready to convert.',
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      tag: lang === 'pl' ? 'WYDAJNOŚĆ I UX' : 'PERFORMANCE & UX',
      metric: '99/100',
      title: lang === 'pl' ? 'Błyskawiczna wydajność i ocena Google.' : 'Lightning performance & Google score.',
      description: lang === 'pl'
        ? 'Eliminujemy opóźnienia, dostarczając strony ładujące się w ułamku sekundy, co obniża wskaźnik odrzuceń do minimum.'
        : 'We eliminate delays, serving split-second pages that drastically reduce bounce rates.',
      bgVisual: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 245, 247, 0.4))'
    }
  ];

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.whyus-card-item');
    if (!cards || !cards.length) return;

    // Fix for large padding: if scrolled to the very left edge, always select the first item
    if (container.scrollLeft <= 20) {
      setActiveIndex(0);
      return;
    }

    // If scrolled to the very right edge, always select the last item
    // Adding 20px tolerance for sub-pixel rendering differences
    if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 20) {
      setActiveIndex(whyUsCards.length - 1);
      return;
    }

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
    const container = document.getElementById('whyus-carousel');
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
    const nextIndex = Math.min(whyUsCards.length - 1, activeIndex + 1);
    scrollTo(nextIndex);
  };

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % whyUsCards.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex]);

  return (
    <section className="why-us" id="why-us" style={{ background: '#F5F5F7', padding: '7rem 0', color: '#1D1D1F' }}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Top Header Row with Apple-style Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <Reveal className="section-header" style={{ maxWidth: '720px', margin: 0 }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'DLACZEGO MY' : 'WHY US'}
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15, color: '#1D1D1F', marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Projekty nastawione na wyniki, z naciskiem na design i funkcjonalność' : 'Result driven projects, with a focus on design and functionality'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
              {lang === 'pl' ? 'Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych.' : 'We craft digital solutions backed by hard analytics and buyer psychology.'}
            </p>
          </Reveal>

          {/* Top Right Apple Circular Arrow Buttons (from Apple Screenshot) */}
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
              disabled={activeIndex === whyUsCards.length - 1}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === whyUsCards.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === whyUsCards.length - 1 ? 0.4 : 1,
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

      {/* Apple Productivity Carousel (Full Screen Width, aligned flush with container above) */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="whyus-carousel"
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
            #whyus-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {whyUsCards.map((item, idx) => (
            <RevealItem 
              key={item.id} 
              className="whyus-card-item"
              style={{
                flex: idx === 0 ? '0 0 min(85vw, 580px)' : '0 0 min(75vw, 420px)', // Card 1 is wider like Apple screenshot!
                scrollSnapAlign: 'center',
                background: '#FFFFFF', // Pure white card background
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

              {/* Bottom Text Area matching Apple's formatting */}
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

        {/* Bottom Pagination & Play Controls (1:1 Apple Proportions from Screenshot) */}
        <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
          {/* Dots Pill Container */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
            {whyUsCards.map((_, idx) => (
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

          {/* Standalone Circular Play/Pause Button (44px) */}
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
