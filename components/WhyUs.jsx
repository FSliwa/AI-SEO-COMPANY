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
      tag: lang === 'pl' ? 'PEAK WIDOCZNOŚCI' : 'PEAK IMPRESSIONS',
      metric: '500/dzień',
      title: lang === 'pl' ? 'Szczyty sięgające 500 wyświetleń dziennie.' : 'Surging peaks reaching 500 daily views.',
      description: lang === 'pl' 
        ? 'Zaledwie w kilkadziesiąt dni wygenerowaliśmy skokowy przyrost ruchu do pół tysiąca wyświetleń dziennie z komercyjnych zapytań klientów.'
        : 'Within weeks we unlocked surging search traffic reaching 500 daily impressions from targeted commercial buyer queries.',
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      tag: lang === 'pl' ? 'POZYCJE FRAZ KOMERCYJNYCH' : 'KEYWORD RANKINGS',
      metric: 'Poz. 17',
      title: lang === 'pl' ? 'Główne frazy usługowe wprowadzane pod TOP 10.' : 'Target commercial terms entering near TOP 10.',
      description: lang === 'pl'
        ? 'Skupiamy optymalizację na frazach tuż przy szczycie wyników ("metalizacja próżniowa" poz. 17 i 19), generując najszybszy przyrost zapytań.'
        : 'Prioritizing terms right near the top 10 rankings ("vacuum metallizing" rank 17 & 19) guarantees the fastest query volume growth.',
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      tag: lang === 'pl' ? 'RUCH Z BOGATYCH RYNKÓW' : 'HIGH-VALUE US TRAFFIC',
      metric: '2k USA',
      title: lang === 'pl' ? 'Ponad 2 000 wyświetleń z rynku amerykańskiego.' : 'Over 2,000 targeted views from US market.',
      description: lang === 'pl'
        ? 'Strategia podstron /en i /de otwiera firmę na zlecenia oraz wysokie marże eksportowe z najbogatszych gospodarek świata.'
        : 'Parallel multilanguage architecture (/en & /de) opens your brand to lucrative export leads and dollars from global economies.',
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      tag: lang === 'pl' ? 'CTR PODSTRON OFERTOWYCH' : 'LANDING PAGE CTR',
      metric: '4.62%',
      title: lang === 'pl' ? 'CTR 4,62% na kluczowych treściach komercyjnych.' : '4.62% click-through rate on landing pages.',
      description: lang === 'pl'
        ? 'Optymalizacja zaufania (UX/UI) sprawia, że klienci klikają dwa razy chętniej w ofertę niż wynosi średnia rynkowa konkurencji.'
        : 'High-conversion UX/UI and strategic titles double average click-through rates compared to industry competitors.',
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      tag: lang === 'pl' ? 'STRONA WWW ZA 0 ZŁ' : 'FREE CUSTOM WEBSITE',
      metric: 'min. 3 mies.',
      title: lang === 'pl' ? 'Darmowa strona WWW przy umowie na min. 3 miesiące.' : 'Free custom website with 3-mo min contract.',
      description: lang === 'pl'
        ? 'Dedykowany projekt UX/UI z darmowym wykonaniem w pakiecie (2 500 zł netto / 3 075 zł brutto), pełnym SEO i opieki SSL bez ukrytych opłat.'
        : 'Bespoke UX/UI website created for free in the package (2,500 PLN net), bundled with complete technical SEO, Maps, and SSL hosting.',
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
                height: '210px', 
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
                  style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.4rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.1, letterSpacing: '-0.03em', whiteSpace: 'nowrap', textAlign: 'center' }}
                >
                  {item.metric}
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
