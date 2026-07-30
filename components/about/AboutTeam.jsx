'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from '../ScrollReveal';

const teamData = [
  {
    id: 1,
    initials: 'DEV',
    name: 'Tech & Architecture',
    role: 'Wydajność • Skalowalność • Next.js',
    roleEn: 'Performance • Scalability • Next.js',
    metricBadge: 'Core Web Vitals 100/100',
    metricBadgeEn: 'Core Web Vitals 100/100',
    image: '/images/unsplash-1614729939124-032f0b56c9ce.jpg',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    leadPl: 'Błyskawiczne działanie i perfekcyjny kod.',
    leadEn: 'Lightning fast performance and perfect code.',
    bodyPl: 'Zespół deweloperski odpowiedzialny jest za wdrażanie nowoczesnych rozwiązań opartych na Next.js i architekturze serverless. Każda stworzona przez nas linijka kodu ma jeden cel: zapewnić Twojej stronie najwyższe noty w narzędziach Google i niesamowite doświadczenie dla użytkownika.',
    bodyEn: 'Our development team implements modern solutions based on Next.js and serverless architecture. Every line of code we write has one goal: to ensure your site gets top scores in Google tools and delivers an amazing user experience.'
  },
  {
    id: 2,
    initials: 'SEO',
    name: 'Strategia & SEO',
    role: 'Analityka • Link Building • AI',
    roleEn: 'Analytics • Link Building • AI',
    metricBadge: 'Pozycje w TOP 3',
    metricBadgeEn: 'TOP 3 Rankings',
    image: '/images/unsplash-1550745165-9bc0b252726f.jpg',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
    leadPl: 'Inżynieria widoczności oparta na danych.',
    leadEn: 'Data-driven visibility engineering.',
    bodyPl: 'Nasi analitycy śledzą zmiany w algorytmach wyszukiwarek 24/7. Wykorzystujemy uczenie maszynowe, precyzyjne mapowanie słów kluczowych oraz autorytatywny link building, aby zbudować organiczną fosę ochronną wokół Twojego biznesu.',
    bodyEn: 'Our analysts track search engine algorithm changes 24/7. We use machine learning, precise keyword mapping, and authoritative link building to build an organic moat around your business.'
  },
  {
    id: 3,
    initials: 'UX',
    name: 'Kreatywność & UX',
    role: 'Design System • Branding • Konwersja',
    roleEn: 'Design System • Branding • Conversion',
    metricBadge: 'Maksymalizacja ROI',
    metricBadgeEn: 'ROI Maximization',
    image: '/images/unsplash-1618005182384-a83a8bd57fbe.jpg',
    bgGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    leadPl: 'Projektowanie, które sprzedaje.',
    leadEn: 'Design that sells.',
    bodyPl: 'Nasz zespół kreatywny łączy bezkompromisową, minimalistyczną estetykę Apple z twardą psychologią konsumencką. Każdy interfejs, który projektujemy, nie tylko wygląda premium, ale przede wszystkim prowadzi klienta za rękę prosto do koszyka lub formularza kontaktowego.',
    bodyEn: 'Our creative team combines uncompromising, minimalist Apple aesthetics with hard consumer psychology. Every interface we design not only looks premium but, above all, guides the customer straight to the cart or contact form.'
  }
];

export default function AboutTeam() {
  const [activeIndex, setActiveIndex] = useState(0);
  const lang = useLocale();

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.apple-testimonial-card');
    if (!cards || !cards.length) return;

    const containerRect = container.getBoundingClientRect();
    const containerLeft = containerRect.left;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const distance = Math.abs(cardRect.left - containerLeft);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollTo = (index) => {
    const container = document.getElementById('about-team-carousel');
    if (container) {
      const cards = container.querySelectorAll('.apple-testimonial-card');
      if (cards[index]) {
        const scrollOffset = cards[index].offsetLeft - container.offsetLeft;
        container.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="testimonials" id="about-team" style={{ background: 'var(--color-bg-surface)', padding: '7rem 0', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Apple Intelligence Header Layout with Top-Right Nav Arrows */}
        <Reveal className="section-header" style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', maxWidth: '100%' }}>
          <div style={{ maxWidth: '780px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'NASZ ZESPÓŁ' : 'OUR TEAM'}
            </div>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.12, fontWeight: 700, marginBottom: '1.25rem' }}>
              {lang === 'pl' ? 'Ludzie, którzy napędzają Twój biznes' : 'The people who drive your business'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '1.15rem', lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
              {lang === 'pl' 
                ? 'Poznaj filary naszego zespołu i zobacz, dlaczego potrafimy dostarczać tak wyjątkowe rezultaty w technologii, projektowaniu i optymalizacji.'
                : 'Meet the pillars of our team and see why we deliver such exceptional results in technology, design, and optimization.'}
            </p>
          </div>

          {/* Navigation Arrows (Apple Header Style) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.5rem' }}>
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: activeIndex === 0 ? 'rgba(0,0,0,0.04)' : '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                color: activeIndex === 0 ? '#B0B0B5' : '#1D1D1F',
                transition: 'all 0.25s ease'
              }}
              aria-label="Previous slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <button
              onClick={() => scrollTo(Math.min(teamData.length - 1, activeIndex + 1))}
              disabled={activeIndex >= teamData.length - 1}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: activeIndex >= teamData.length - 1 ? 'rgba(0,0,0,0.04)' : '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex >= teamData.length - 1 ? 'default' : 'pointer',
                color: activeIndex >= teamData.length - 1 ? '#B0B0B5' : '#1D1D1F',
                transition: 'all 0.25s ease'
              }}
              aria-label="Next slide"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>
        </Reveal>
      </div>

      {/* Full 100vw Viewport Bleeding Carousel Container */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="about-team-carousel"
          onScroll={handleScroll}
          className="hide-scrollbar"
          style={{
            display: 'flex',
            gap: '24px',
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            scrollBehavior: 'smooth',
            paddingBottom: '2.5rem',
            paddingLeft: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)',
            paddingRight: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)',
            scrollPaddingLeft: 'calc((100vw - min(1240px, 100vw - 3rem)) / 2)'
          }}
        >
            {teamData.map((item, idx) => (
              <RevealItem 
                key={item.id}
                className="apple-testimonial-card"
                style={{
                  flex: '0 0 min(88vw, 540px)',
                  scrollSnapAlign: 'start',
                  background: '#FFFFFF', 
                  borderRadius: '28px',
                  padding: '1.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: '0 12px 36px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.06)',
                  position: 'relative'
                }}
              >
                {/* Apple Visual Media Banner */}
                <div style={{
                  width: '100%',
                  height: '220px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1.75rem',
                  background: item.bgGradient
                }}>
                  <Image 
                    src={item.image} 
                    alt={item.name}
                    fill
                    style={{
                      objectFit: 'cover',
                      objectPosition: 'center',
                      opacity: 0.9,
                      filter: 'contrast(1.05)'
                    }}
                  />
                  {/* Glassmorphism Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'rgba(255, 255, 255, 0.92)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    color: '#0F172A',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    padding: '0.4rem 0.9rem',
                    borderRadius: '9999px',
                    boxShadow: '0 4px 14px rgba(0,0,0,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem'
                  }}>
                    <span style={{ color: 'var(--color-growth)' }}>●</span>
                    {lang === 'pl' ? item.metricBadge : item.metricBadgeEn}
                  </div>
                </div>

                {/* Body Content below banner */}
                <div style={{ padding: '0 0.5rem 0.5rem 0.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <p style={{ 
                    fontSize: '1.08rem', 
                    color: '#1D1D1F', 
                    lineHeight: 1.55,
                    letterSpacing: '-0.015em',
                    marginBottom: '1.75rem'
                  }}>
                    <strong style={{ fontWeight: 700, color: '#0F172A', marginRight: '0.35rem' }}>
                      {lang === 'pl' ? item.leadPl : item.leadEn}
                    </strong>
                    {lang === 'pl' ? item.bodyPl : item.bodyEn}
                  </p>

                  {/* Team Signature Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div className="testimonial-avatar" style={{
                        width: '42px', height: '42px', borderRadius: '50%', background: '#000000',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, fontSize: '0.9rem'
                      }}>
                        {item.initials}
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#1D1D1F', margin: 0, lineHeight: 1.2 }}>{item.name}</h4>
                        <p style={{ fontSize: '0.8rem', color: '#6E6E73', margin: '2px 0 0 0' }}>
                          {lang === 'pl' ? item.role : (item.roleEn || item.role)}
                        </p>
                      </div>
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
