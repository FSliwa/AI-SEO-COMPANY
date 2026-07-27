'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

const reviewsData = [
  {
    id: 1,
    initials: 'MK',
    name: 'Michał Kowalski',
    role: 'FinTech Apex Platform • Zweryfikowany Partner',
    roleEn: 'FinTech Apex Platform • Verified Partner',
    pl: '„AI SEO COMPANY przeprowadziło pełny rebrand naszej platformy B2B oraz wdrożenie serwisu. Efekt przeszedł nasze najśmielsze oczekiwania — ruch organiczny wzrósł o 104% w zaledwie 3 miesiące, a klienci zachwycają się nowoczesną estetyką.”',
    en: '“AI SEO COMPANY executed a full rebrand of our B2B platform and web deployment. The results blew away our expectations — organic traffic skyrocketed by 104% in just 3 months, and clients love our modern aesthetics.”'
  },
  {
    id: 2,
    initials: 'AB',
    name: 'Anna Bielska',
    role: 'Lumina Store • Zweryfikowany Partner',
    roleEn: 'Lumina Store • Verified Partner',
    pl: '„Zwiększenie konwersji i spójny, zjawiskowy design - to właśnie zyskaliśmy dzięki tej współpracy. Nasz sklep internetowy nie tylko wygląda teraz jak marka premium, ale generuje o 40% więcej zapytań od klientów.”',
    en: '“Increased conversion and a stunning, cohesive design - that\'s exactly what we gained from this collaboration. Our online store not only looks like a premium brand now but also generates 40% more customer inquiries.”'
  },
  {
    id: 3,
    initials: 'PS',
    name: 'Piotr Szymański',
    role: 'DataFlow AI • Zweryfikowany Partner',
    roleEn: 'DataFlow AI • Verified Partner',
    pl: '„Wyróżnienie się na zatłoczonym rynku technologicznym to ogromne wyzwanie. AI SEO COMPANY stworzyło dla nas tożsamość, która idealnie oddaje naszą innowacyjność, zapewniając nam niesamowitą przewagę nad konkurencją.”',
    en: '“Standing out in a crowded tech market is a massive challenge. AI SEO COMPANY created an identity for us that perfectly captures our innovation, giving us an incredible edge over the competition.”'
  },
  {
    id: 4,
    initials: 'KW',
    name: 'Karolina Wróbel',
    role: 'MedCare Clinic • Zweryfikowany Partner',
    roleEn: 'MedCare Clinic • Verified Partner',
    pl: '„Architektura treści i pozycjonowanie, które nam wdrożono, zaowocowały pełnym kalendarzem wizyt. Agencja nie tylko projektuje piękne strony, ale dba o to, by te strony zarabiały prawdziwe pieniądze.”',
    en: '“The content architecture and SEO positioning they implemented resulted in a fully booked calendar. The agency doesn\'t just design beautiful websites; they ensure those sites generate real revenue.”'
  },
  {
    id: 5,
    initials: 'TN',
    name: 'Tomasz Nowak',
    role: 'Skyline Development • Zweryfikowany Partner',
    roleEn: 'Skyline Development • Verified Partner',
    pl: '„Ich podejście do projektowania UX to mistrzostwo. Użytkownicy spędzają na naszej stronie o wiele więcej czasu, a zapytania ofertowe na nasze inwestycje wzrosły drastycznie. Prawdziwi partnerzy biznesowi.”',
    en: '“Their approach to UX design is masterful. Users spend much more time on our site, and leads for our properties have increased drastically. True business partners.”'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();
  const t = translations[lang].testimonials;

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.testimonial-apple-card');
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
    const container = document.getElementById('testimonials-carousel');
    if (container) {
      const cards = container.querySelectorAll('.testimonial-apple-card');
      if (cards[index]) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = cards[index].getBoundingClientRect();
        // Calculate offset so the left edge of the card aligns with the left edge of the container
        const scrollOffset = cardRect.left - containerRect.left + container.scrollLeft;
        container.scrollTo({
          left: scrollOffset,
          behavior: 'smooth'
        });
        setActiveIndex(index);
      }
    }
  };

  return (
    <section className="testimonials" id="testimonials" style={{ background: '#F5F5F7', padding: '8rem 0' }}>
      <div className="container">
        <Reveal className="section-header" style={{ marginBottom: '4rem', textAlign: 'left' }}>
          <div className="section-tag" style={{ color: '#0F172A', borderColor: 'rgba(0,0,0,0.1)' }}>
            <span className="asterisk" style={{ color: '#0F172A' }}>✳</span> {t.tag}
          </div>
          <h2 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#0F172A', letterSpacing: '-0.04em', lineHeight: 1.1 }}>
            {t.title}
          </h2>
        </Reveal>

        {/* Carousel Container */}
        <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
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
              paddingBottom: '2rem', // Space for shadow
              marginRight: '-100vw', // Allow horizontal overflow beyond container on the right
              paddingRight: '100vw'
            }}
          >
            {reviewsData.map((item, idx) => (
              <RevealItem 
                key={item.id}
                className="testimonial-apple-card"
                style={{
                  flex: '0 0 min(85vw, 420px)', // Match Apple's screenshot proportions
                  scrollSnapAlign: 'start',
                  background: '#FFFFFF', 
                  borderRadius: '32px',
                  padding: '3rem 2.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '380px',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.04)',
                  position: 'relative'
                }}
              >
                <div>
                  <div style={{ color: '#F59E0B', fontSize: '1.25rem', marginBottom: '1.5rem', letterSpacing: '2px' }}>
                    ★★★★★
                  </div>
                  <p style={{ 
                    fontSize: '1.15rem', 
                    fontWeight: 500, 
                    color: '#1D1D1F', 
                    lineHeight: 1.5,
                    letterSpacing: '-0.01em',
                    marginBottom: '2rem'
                  }}>
                    {lang === 'pl' ? item.pl : item.en}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginTop: 'auto' }}>
                  <div style={{
                    width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #0F172A, #334155)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 600, fontSize: '1rem'
                  }}>
                    {item.initials}
                  </div>
                  <div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1D1D1F', margin: 0 }}>{item.name}</h4>
                    <p style={{ fontSize: '0.85rem', color: '#86868B', margin: 0 }}>
                      {lang === 'pl' ? item.role : (item.roleEn || item.role)}
                    </p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          
          {/* Pagination Controls - Right Aligned Arrows */}
          <Reveal delay={0.2} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '12px', marginTop: '1rem' }}>
            <button
              onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
              disabled={activeIndex === 0}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: activeIndex === 0 ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.08)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                color: activeIndex === 0 ? 'rgba(0,0,0,0.3)' : '#1D1D1F',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label="Previous"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>

            <button
              onClick={() => scrollTo(Math.min(reviewsData.length - 1, activeIndex + 1))}
              disabled={activeIndex >= reviewsData.length - 1} // Disables if at end
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: activeIndex >= reviewsData.length - 1 ? 'rgba(0,0,0,0.04)' : 'rgba(0,0,0,0.08)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex >= reviewsData.length - 1 ? 'default' : 'pointer',
                color: activeIndex >= reviewsData.length - 1 ? 'rgba(0,0,0,0.3)' : '#1D1D1F',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              aria-label="Next"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
