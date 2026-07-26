'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

const reviewsData = [
  {
    id: 1,
    initials: 'MK',
    name: 'Michał Kowalski',
    role: 'CEO, FinTech Apex Platform',
    pl: '„AI SEO COMPANY przeprowadziło pełny rebrand naszej platformy B2B oraz wdrożenie serwisu. Efekt przeszedł nasze najśmielsze oczekiwania — ruch organiczny wzrósł o 104% w zaledwie 3 miesiące, a klienci zachwycają się nowoczesną estetyką.”',
    en: '“AI SEO COMPANY executed a full rebrand of our B2B platform and web deployment. The results blew away our expectations — organic traffic skyrocketed by 104% in just 3 months, and clients love our modern aesthetics.”'
  },
  {
    id: 2,
    initials: 'AB',
    name: 'Anna Bielska',
    role: 'Dyrektor E-commerce, Lumina Store',
    roleEn: 'E-commerce Director, Lumina Store',
    pl: '„Zwiększenie konwersji i spójny, zjawiskowy design - to właśnie zyskaliśmy dzięki tej współpracy. Nasz sklep internetowy nie tylko wygląda teraz jak marka premium, ale generuje o 40% więcej zapytań od klientów.”',
    en: '“Increased conversion and a stunning, cohesive design - that\'s exactly what we gained from this collaboration. Our online store not only looks like a premium brand now but also generates 40% more customer inquiries.”'
  },
  {
    id: 3,
    initials: 'PS',
    name: 'Piotr Szymański',
    role: 'Founder, DataFlow AI',
    pl: '„Wyróżnienie się na zatłoczonym rynku technologicznym to ogromne wyzwanie. AI SEO COMPANY stworzyło dla nas tożsamość, która idealnie oddaje naszą innowacyjność, zapewniając nam niesamowitą przewagę nad konkurencją.”',
    en: '“Standing out in a crowded tech market is a massive challenge. AI SEO COMPANY created an identity for us that perfectly captures our innovation, giving us an incredible edge over the competition.”'
  },
  {
    id: 4,
    initials: 'KW',
    name: 'Karolina Wróbel',
    role: 'Właściciel, MedCare Clinic',
    roleEn: 'Owner, MedCare Clinic',
    pl: '„Architektura treści i pozycjonowanie, które nam wdrożono, zaowocowały pełnym kalendarzem wizyt. Agencja nie tylko projektuje piękne strony, ale dba o to, by te strony zarabiały prawdziwe pieniądze.”',
    en: '“The content architecture and SEO positioning they implemented resulted in a fully booked calendar. The agency doesn\'t just design beautiful websites; they ensure those sites generate real revenue.”'
  },
  {
    id: 5,
    initials: 'TN',
    name: 'Tomasz Nowak',
    role: 'Head of Marketing, Skyline Development',
    pl: '„Ich podejście do projektowania UX to mistrzostwo. Użytkownicy spędzają na naszej stronie o wiele więcej czasu, a zapytania ofertowe na nasze inwestycje wzrosły drastycznie. Prawdziwi partnerzy biznesowi.”',
    en: '“Their approach to UX design is masterful. Users spend much more time on our site, and leads for our properties have increased drastically. True business partners.”'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const { lang } = useLanguage();
  const t = translations[lang].testimonials;

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.testimonial-apple-card');
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
    const container = document.getElementById('testimonials-carousel');
    if (container) {
      const cards = container.querySelectorAll('.testimonial-apple-card');
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

  useEffect(() => {
    if (!isAutoplay) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % reviewsData.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, activeIndex]);

  return (
    <section className="testimonials" id="testimonials" style={{ background: '#F5F5F7', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        <Reveal className="section-header center" style={{ marginBottom: '4rem', padding: '0 2rem' }}>
          <div className="section-tag" style={{ color: '#0F172A', borderColor: 'rgba(0,0,0,0.1)' }}>
            <span className="asterisk" style={{ color: '#0F172A' }}>✳</span> {t.tag}
          </div>
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            {t.title}
          </h2>
        </Reveal>

        {/* Carousel Container */}
        <div style={{ position: 'relative', width: '100vw', left: '50%', right: '50%', marginLeft: '-50vw', marginRight: '-50vw' }}>
          <RevealStagger 
            id="testimonials-carousel"
            onScroll={handleScroll}
            className="hide-scrollbar"
            style={{
              display: 'flex',
              gap: '24px',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollBehavior: 'smooth',
              padding: '0 50vw', // Ensures items can be centered
              paddingBottom: '2rem' // Space for shadow
            }}
          >
            {/* Empty element to act as start padding so first item centers properly */}
            <div style={{ flex: '0 0 1px' }} />
            
            {reviewsData.map((item, idx) => (
              <RevealItem 
                key={item.id}
                className="testimonial-apple-card"
                style={{
                  flex: '0 0 min(85vw, 900px)',
                  scrollSnapAlign: 'center',
                  background: '#FFFFFF', 
                  borderRadius: '36px',
                  padding: '4rem 3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '400px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
              >
                <div style={{ color: '#F59E0B', fontSize: '1.5rem', marginBottom: '1.5rem' }}>
                  ★★★★★
                </div>
                <p style={{ 
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)', 
                  fontWeight: 500, 
                  color: '#0F172A', 
                  lineHeight: 1.4,
                  letterSpacing: '-0.02em',
                  marginBottom: '3rem'
                }}>
                  {lang === 'pl' ? item.pl : item.en}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #0F172A, #334155)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 600, fontSize: '1.1rem'
                  }}>
                    {item.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0F172A', margin: 0 }}>{item.name}</h4>
                    <p style={{ fontSize: '0.95rem', color: '#64748B', margin: 0 }}>
                      {lang === 'pl' ? item.role : (item.roleEn || item.role)}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}

            {/* Empty element to act as end padding so last item centers properly */}
            <div style={{ flex: '0 0 1px' }} />
          </RevealStagger>
          
          {/* Pagination Controls */}
          <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
            {/* Dots Pill Container */}
            <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
              {reviewsData.map((_, idx) => (
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
                    cursor: 'pointer',
                    outline: 'none',
                    flexShrink: 0
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Play/Pause Button Pill */}
            <button
              onClick={() => setIsAutoplay(!isAutoplay)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#1D1D1F',
                outline: 'none',
                transition: 'background 0.3s ease'
              }}
              aria-label={isAutoplay ? 'Pause autoplay' : 'Play autoplay'}
            >
              {isAutoplay ? (
                // Pause Icon
                <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="2" height="10" rx="1" />
                  <rect x="7" y="1" width="2" height="10" rx="1" />
                </svg>
              ) : (
                // Play Icon
                <svg width="11" height="12" viewBox="0 0 11 12" fill="currentColor" xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: '2px' }}>
                  <path d="M10.1 5.1C10.7 5.5 10.7 6.5 10.1 6.9L1.9 11.6C1.2 12 0.3 11.5 0.3 10.7V1.3C0.3 0.5 1.2 0 1.9 0.4L10.1 5.1Z" />
                </svg>
              )}
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
