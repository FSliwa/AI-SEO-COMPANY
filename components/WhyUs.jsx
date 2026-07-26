'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function WhyUs() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();

  const whyUsCards = [
    {
      id: 1,
      tag: lang === 'pl' ? 'STRONA WWW ZA 0 ZŁ' : 'FREE WEBSITE PACKAGE',
      metric: '0 zł',
      title: lang === 'pl' ? 'Dedykowany projekt UX/UI i pełna responsywność RWD.' : 'Bespoke UX/UI design & full mobile responsiveness.',
      description: lang === 'pl' 
        ? 'Strona zaprojektowana pod konwersję (formularze, Analytics, Hotres, Social Media) z darmowym wykonaniem w pakiecie przy umowie na min. 3 miesiące.'
        : 'High-conversion website with Google Analytics, Hotres & Social Media integrations, included for free with a min. 3-month contract.',
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      tag: lang === 'pl' ? 'POZYCJONOWANIE & SEO' : 'ADVANCED TECHNICAL SEO',
      metric: 'TOP 10',
      title: lang === 'pl' ? 'Audyt konkurencji, Core Web Vitals i Schema.org.' : 'Competitor audit, Core Web Vitals & Schema.org.',
      description: lang === 'pl'
        ? 'Błyskawiczne ładowanie, architektura sitemap.xml i robots.txt, przyjazne URL, Rich Snippets w Google oraz pełna obsługa przekierowań 301/404.'
        : 'Split-second speed, sitemap.xml architecture, SEO URLs, Schema Rich Snippets, and zero-downtime 301/404 redirect management.',
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      tag: lang === 'pl' ? 'MAPY GOOGLE & OPINIE' : 'GOOGLE MAPS & REVIEWS',
      metric: 'TOP 3',
      title: lang === 'pl' ? 'Dominacja w lokalnych wynikach i Mapach Google.' : 'Dominance in local search & Google Maps.',
      description: lang === 'pl'
        ? 'Optymalizacja pod frazy lokalne (usługa + miasto), regularne publikacje zdjęć i aktualności oraz aktywne zarządzanie opiniami klientów.'
        : 'Targeting local queries (service + city), publishing regular photos/updates, and proactively managing customer reviews.',
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      tag: lang === 'pl' ? 'ANALIZA SEARCH CONSOLE' : 'SEARCH CONSOLE ANALYTICS',
      metric: '+8 113%',
      title: lang === 'pl' ? 'Monitoring danych i budowa ruchu organicznego.' : 'Real-time data tracking & traffic expansion.',
      description: lang === 'pl'
        ? 'Co miesiąc priorytetyzujemy frazy znajdujące się najbliżej TOP 10 / TOP 20 Google, co gwarantuje najszybszy wzrost realnych zapytań.'
        : 'Monthly optimization prioritizing near-TOP 10 terms to generate fast, high-intent commercial inquiry growth.',
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      tag: lang === 'pl' ? 'STAŁY KOSZT & RAPORTY' : 'TRANSPARENT COST & REPORTS',
      metric: '3 075 zł',
      title: lang === 'pl' ? '3 075 zł brutto/mies. (2 500 zł netto) — zero ukrytych opłat.' : '2 500 PLN net/mo — zero hidden fees.',
      description: lang === 'pl'
        ? 'Kwota obejmuje nową stronę WWW za 0 zł, pełne SEO, Mapy Google, opiekę techniczną z SSL oraz czytelny raport z wyników i pozycji co miesiąc.'
        : 'Covers free website creation, full technical SEO, Google Maps management, SSL hosting, and transparent monthly performance reporting.',
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
                height: '460px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Graphic / Stat Visual Area */}
              <div style={{ 
                width: '100%', 
                height: '240px', 
                borderRadius: '20px', 
                background: item.bgVisual, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.5rem' }}>
                  {item.tag}
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                  style={{ fontSize: 'clamp(4.5rem, 8vw, 6.5rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1, letterSpacing: '-0.04em' }}
                >
                  {item.metric}
                </motion.div>
              </div>

              {/* Bottom Text Area matching Apple's formatting */}
              <div style={{ marginTop: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1D1D1F', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.98rem', color: '#515154', fontWeight: 400, lineHeight: 1.55, margin: 0 }}>
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
              <button
                key={idx}
                onClick={() => scrollTo(idx)}
                style={{
                  width: activeIndex === idx ? '36px' : '8px',
                  height: '8px',
                  borderRadius: activeIndex === idx ? '4px' : '50%',
                  background: activeIndex === idx ? '#1D1D1F' : '#B0B0B5',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.25, 1, 0.5, 1)'
                }}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Standalone Circular Play Button (44px) */}
          <button 
            onClick={() => scrollTo((activeIndex + 1) % whyUsCards.length)}
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
            aria-label="Next slide"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none" style={{ marginLeft: '2px' }}>
              <polygon points="5 3 19 12 5 21 5 3"></polygon>
            </svg>
          </button>
        </Reveal>

      </div>
    </section>
  );
}
