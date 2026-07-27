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
    role: 'Sektor FinTech • Zweryfikowany Partner',
    roleEn: 'FinTech Sector • Verified Partner',
    metricBadge: '+104% Ruchu B2B',
    metricBadgeEn: '+104% Organic Traffic',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    leadPl: 'Pełny rebrand B2B i 104% wzrostu ruchu w 3 miesiące.',
    leadEn: 'Full B2B rebrand and 104% traffic growth in 3 months.',
    bodyPl: 'AI SEO COMPANY przeprowadziło pełny rebrand naszej platformy B2B oraz wdrożenie serwisu. Efekt przeszedł nasze najśmielsze oczekiwania — ruch organiczny wzrósł błyskawicznie, a klienci zachwycają się nowoczesną estetyką.',
    bodyEn: 'AI SEO COMPANY executed a full rebrand of our platform and web deployment. The results blew away our expectations — organic traffic skyrocketed and clients love our modern aesthetics.'
  },
  {
    id: 2,
    initials: 'AB',
    name: 'Anna Bielska',
    role: 'Branża Gastronomiczna • Zweryfikowany Partner',
    roleEn: 'Gastronomy & E-commerce • Verified Partner',
    metricBadge: 'Nowa Lokalizacja & Skalowanie',
    metricBadgeEn: 'New Location & Sales Scaling',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 100%)',
    leadPl: 'Zbudowanie i rozwinięcie sprzedaży w nowo otwartej lokalizacji.',
    leadEn: 'Building and scaling digital sales for the newly opened restaurant location.',
    bodyPl: 'Współpraca przy wdrożeniu serwisu oraz strategii cyfrowej dla nowo otwartej lokalizacji restauracji przebiegła wzorowo. Zbudowano dla nas intuicyjny portal zoptymalizowany pod konwersję i SEO, co natychmiast wygenerowało wysoki wolumen rezerwacji i wzrost przychodów.',
    bodyEn: 'Collaborating on the digital architecture and marketing launch for our newly opened restaurant location was seamless. They built an intuitive, high-converting platform with local SEO optimization that instantly drove reservation volumes and sales growth.'
  },
  {
    id: 3,
    initials: 'PS',
    name: 'Piotr Szymański',
    role: 'Branża Technologiczna B2B • Zweryfikowany Partner',
    roleEn: 'Tech B2B Sector • Verified Partner',
    metricBadge: '2.8k+ Wyświetleń od 0',
    metricBadgeEn: '2.8k+ Impressions from 0',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'linear-gradient(135deg, #064E3B 0%, #047857 100%)',
    leadPl: 'Przewaga nad konkurencją na zatłoczonym rynku B2B.',
    leadEn: 'Competitive edge in a crowded B2B technology market.',
    bodyPl: 'Wyróżnienie się w branży to ogromne wyzwanie. Stworzono dla nas tożsamość, która idealnie oddaje naszą innowacyjność, zapewniając nam niesamowitą przewagę nad konkurencją.',
    bodyEn: 'Standing out in tech is a massive challenge. AI SEO COMPANY created an identity for us that perfectly captures our innovation, giving us an incredible edge over the competition.'
  },
  {
    id: 4,
    initials: 'KW',
    name: 'Karolina Wróbel',
    role: 'Branża Medyczna • Zweryfikowany Partner',
    roleEn: 'Healthcare Sector • Verified Partner',
    metricBadge: '100% Obłożenia Kalendarza',
    metricBadgeEn: 'Fully Booked Schedule',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 100%)',
    leadPl: 'Przemyślana architektura treści i stały napływ pacjentów.',
    leadEn: 'Smart content architecture and steady patient acquisition.',
    bodyPl: 'Architektura treści i pozycjonowanie zaowocowały pełnym kalendarzem wizyt. Agencja nie tylko projektuje piękne strony, ale dba o to, by te strony zarabiały prawdziwe pieniądze.',
    bodyEn: 'The content architecture and SEO positioning resulted in a fully booked calendar. The agency doesn\'t just design beautiful websites; they ensure those sites generate real revenue.'
  },
  {
    id: 5,
    initials: 'TN',
    name: 'Tomasz Nowak',
    role: 'Branża Deweloperska • Zweryfikowany Partner',
    roleEn: 'Real Estate Sector • Verified Partner',
    metricBadge: '+180% Leadów Ofertowych',
    metricBadgeEn: '+180% Property Inquiries',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    bgGradient: 'linear-gradient(135deg, #7C2D12 0%, #9A3412 100%)',
    leadPl: 'Mistrzowskie UX i drastyczny wzrost zapytań ofertowych.',
    leadEn: 'Masterful UX and drastic growth in property inquiries.',
    bodyPl: 'Podejście do projektowania UX to mistrzostwo. Użytkownicy spędzają na naszej stronie o wiele więcej czasu, a zapytania ofertowe na nasze inwestycje wzrosły drastycznie.',
    bodyEn: 'Their approach to UX design is masterful. Users spend much more time on our site, and leads for our properties have increased drastically.'
  }
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);
  const { lang } = useLanguage();
  const t = translations[lang].testimonials;

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
    const container = document.getElementById('testimonials-apple-carousel');
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
    <section className="testimonials" id="testimonials" style={{ background: '#F5F5F7', padding: '7rem 0', overflow: 'hidden' }}>
      <div className="container">
        
        {/* Apple Intelligence Header Layout with Top-Right Nav Arrows */}
        <Reveal className="section-header" style={{ marginBottom: '3.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem', maxWidth: '100%' }}>
          <div style={{ maxWidth: '780px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
            </div>
            <h2 style={{ fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)', color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.12, fontWeight: 700, marginBottom: '1.25rem' }}>
              {lang === 'pl' ? 'Doświadczenia i Rekomendacje. Efekty, które budują zaufanie.' : 'Client Endorsements. Impact that builds trust.'}
            </h2>
            <p style={{ color: '#6E6E73', fontSize: '1.15rem', lineHeight: 1.55, fontWeight: 500, margin: 0 }}>
              {lang === 'pl' 
                ? 'Poznaj opinie partnerów i zobacz, jak połączenie nowoczesnego brandingu, architektury Web i zaawansowanego SEO przekłada się na realny wzrost przychodów.'
                : 'Explore feedback from our partners and discover how custom web design, branding, and advanced SEO translate into measurable business growth.'}
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
              onClick={() => scrollTo(Math.min(reviewsData.length - 1, activeIndex + 1))}
              disabled={activeIndex >= reviewsData.length - 1}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: activeIndex >= reviewsData.length - 1 ? 'rgba(0,0,0,0.04)' : '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex >= reviewsData.length - 1 ? 'default' : 'pointer',
                color: activeIndex >= reviewsData.length - 1 ? '#B0B0B5' : '#1D1D1F',
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

      {/* Full 100vw Viewport Bleeding Carousel Container (Apple style) */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="testimonials-apple-carousel"
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
            {reviewsData.map((item, idx) => (
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
                {/* Apple Intelligence Top Visual Media Banner */}
                <div style={{
                  width: '100%',
                  height: '240px',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  position: 'relative',
                  marginBottom: '1.75rem',
                  background: item.bgGradient
                }}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      objectPosition: 'top center',
                      opacity: 0.88,
                      filter: 'contrast(1.05)'
                    }}
                  />
                  {/* Glassmorphism Result Pill Badge */}
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

                {/* Body Content below banner — Apple inline bold lead styling */}
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

                  {/* Client Signature Row */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto', paddingTop: '1.25rem', borderTop: '1px solid rgba(0,0,0,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                      <div style={{
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

                    <div style={{ color: '#F59E0B', fontSize: '0.95rem', letterSpacing: '1px', fontWeight: 600 }}>
                      ★★★★★
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
