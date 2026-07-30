'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

const reviewsData = [
  {
    id: 1,
    initials: 'MK',
    name: 'Michał Kowalski',
    role: 'Sektor FinTech • Zweryfikowany Partner',
    roleEn: 'FinTech Sector • Verified Partner',
    tag: 'FINTECH B2B',
    metricBadge: '+104% Ruchu B2B',
    metricBadgeEn: '+104% Organic Traffic',
    image: '/images/unsplash-1635776062127-d379bfcba9f8.jpg',
    leadPl: 'Pełny rebrand B2B i 104% wzrostu ruchu w 3 miesiące.',
    leadEn: 'Full B2B rebrand and 104% traffic growth in 3 months.',
    bodyPl: 'AI SEO COMPANY przeprowadziło pełny rebrand naszej platformy B2B oraz wdrożenie serwisu. Efekt przeszedł nasze najśmielsze oczekiwania — ruch organiczny wzrósł błyskawicznie, a klienci zachwycają się nowoczesną estetyką.',
    bodyEn: 'AI SEO COMPANY executed a full rebrand of our platform and web deployment. The results blew away our expectations — organic traffic skyrocketed and clients love our modern aesthetics.',
    metric: '+104%',
    metricLabel: 'Wzrost ruchu',
    metricLabelEn: 'Traffic Growth'
  },
  {
    id: 2,
    initials: 'AB',
    name: 'Anna Bielska',
    role: 'Branża Gastronomiczna • Zweryfikowany Partner',
    roleEn: 'Gastronomy & E-commerce • Verified Partner',
    tag: 'GASTRONOMIA',
    tagEn: 'GASTRONOMY',
    metricBadge: 'Nowa Lokalizacja & Skalowanie',
    metricBadgeEn: 'New Location & Sales Scaling',
    image: '/images/unsplash-1620641788421-7a1c342ea42e.jpg',
    leadPl: 'Zbudowanie i rozwinięcie sprzedaży w nowo otwartej lokalizacji.',
    leadEn: 'Building and scaling digital sales for the newly opened restaurant location.',
    bodyPl: 'Współpraca przy wdrożeniu serwisu oraz strategii cyfrowej dla nowo otwartej lokalizacji restauracji przebiegła wzorowo. Zbudowano dla nas intuicyjny portal zoptymalizowany pod konwersję i SEO, co natychmiast wygenerowało wysoki wolumen rezerwacji i wzrost przychodów.',
    bodyEn: 'Collaborating on the digital architecture and marketing launch for our newly opened restaurant location was seamless. They built an intuitive, high-converting platform with local SEO optimization that instantly drove reservation volumes and sales growth.',
    metric: '+220%',
    metricLabel: 'Wzrost rezerwacji',
    metricLabelEn: 'Booking Growth'
  },
  {
    id: 3,
    initials: 'PS',
    name: 'Piotr Szymański',
    role: 'Branża Technologiczna B2B • Zweryfikowany Partner',
    roleEn: 'Tech B2B Sector • Verified Partner',
    tag: 'TECH B2B',
    metricBadge: '2.8k+ Wyświetleń od 0',
    metricBadgeEn: '2.8k+ Impressions from 0',
    image: '/images/unsplash-1462556791646-c201b8241a94.jpg',
    leadPl: 'Przewaga nad konkurencją na zatłoczonym rynku B2B.',
    leadEn: 'Competitive edge in a crowded B2B technology market.',
    bodyPl: 'Wyróżnienie się w branży to ogromne wyzwanie. Stworzono dla nas tożsamość, która idealnie oddaje naszą innowacyjność, zapewniając nam niesamowitą przewagę nad konkurencją.',
    bodyEn: 'Standing out in tech is a massive challenge. AI SEO COMPANY created an identity for us that perfectly captures our innovation, giving us an incredible edge over the competition.',
    metric: '2.8k+',
    metricLabel: 'Wyświetleń',
    metricLabelEn: 'Impressions'
  },
  {
    id: 4,
    initials: 'KW',
    name: 'Karolina Wróbel',
    role: 'Branża Medyczna • Zweryfikowany Partner',
    roleEn: 'Healthcare Sector • Verified Partner',
    tag: 'MEDYCYNA',
    tagEn: 'HEALTHCARE',
    metricBadge: '100% Obłożenia Kalendarza',
    metricBadgeEn: 'Fully Booked Schedule',
    image: '/images/unsplash-1558591710-4b4a1ae0f04d.jpg',
    leadPl: 'Przemyślana architektura treści i stały napływ pacjentów.',
    leadEn: 'Smart content architecture and steady patient acquisition.',
    bodyPl: 'Architektura treści i pozycjonowanie zaowocowały pełnym kalendarzem wizyt. Agencja nie tylko projektuje piękne strony, ale dba o to, by te strony zarabiały prawdziwe pieniądze.',
    bodyEn: 'The content architecture and SEO positioning resulted in a fully booked calendar. The agency doesn\'t just design beautiful websites; they ensure those sites generate real revenue.',
    metric: '100%',
    metricLabel: 'Obłożenia',
    metricLabelEn: 'Booking Rate'
  },
  {
    id: 5,
    initials: 'TN',
    name: 'Tomasz Nowak',
    role: 'Branża Deweloperska • Zweryfikowany Partner',
    roleEn: 'Real Estate Sector • Verified Partner',
    tag: 'NIERUCHOMOŚCI',
    tagEn: 'REAL ESTATE',
    metricBadge: '+180% Leadów Ofertowych',
    metricBadgeEn: '+180% Property Inquiries',
    image: '/images/unsplash-1557682250-33bd709cbe85.jpg',
    leadPl: 'Mistrzowskie UX i drastyczny wzrost zapytań ofertowych.',
    leadEn: 'Masterful UX and drastic growth in property inquiries.',
    bodyPl: 'Podejście do projektowania UX to mistrzostwo. Użytkownicy spędzają na naszej stronie o wiele więcej czasu, a zapytania ofertowe na nasze inwestycje wzrosły drastycznie.',
    bodyEn: 'Their approach to UX design is masterful. Users spend much more time on our site, and leads for our properties have increased drastically.',
    metric: '+180%',
    metricLabel: 'Leadów',
    metricLabelEn: 'Leads'
  }
];

export default function Testimonials() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const carouselRef = useRef(null);
  const lang = useLocale();
  const t = useTranslations('testimonials');

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -400, behavior: 'smooth' });
    }
  };

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 400, behavior: 'smooth' });
    }
  };

  return (
    <section className="testimonials" id="testimonials" style={{ padding: '8rem 0', overflow: 'hidden' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        <Reveal>
          <div style={{ position: 'relative', marginBottom: '3.5rem', width: '100%' }}>
            <div className="section-header center" style={{ textAlign: 'center', maxWidth: '840px', marginInline: 'auto' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', display: 'inline-flex' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
              </div>
              <h2 style={{ 
                fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', 
                fontWeight: 700, 
                color: '#1D1D1F', 
                letterSpacing: '-0.04em',
                marginBottom: '1rem',
                lineHeight: 1.15
              }}>
                {lang === 'pl' ? 'Doświadczenia i Rekomendacje' : 'Client Endorsements'}
              </h2>
              <p style={{ color: '#6E6E73', fontSize: '1.25rem', margin: 0, fontWeight: 500, lineHeight: 1.5 }}>
                {lang === 'pl' 
                  ? 'Efekty, które budują zaufanie. Poznaj opinie partnerów i zobacz realne rezultaty.'
                  : 'Impact that builds trust. Explore feedback from our partners and see real results.'}
              </p>
            </div>
            
            {/* Navigation Arrows */}
            <div className="testimonials-arrows" style={{ position: 'absolute', right: 0, bottom: '10px', display: 'flex', gap: '10px', alignItems: 'center', zIndex: 10 }}>
              <button 
                onClick={scrollPrev}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#E8E8ED',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#DCDCE0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#E8E8ED'}
                aria-label="Previous"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <button 
                onClick={scrollNext}
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#E8E8ED',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#DCDCE0'}
                onMouseLeave={(e) => e.currentTarget.style.background = '#E8E8ED'}
                aria-label="Next"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
          id="testimonials-carousel"
          ref={carouselRef}
          style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            gap: '2rem',
            paddingBottom: '2rem',
            paddingLeft: 'calc(50vw - min(42.5vw, 600px))',
            paddingRight: 'calc(50vw - min(42.5vw, 600px))',
            scrollPaddingLeft: 'calc(50vw - min(42.5vw, 600px))'
          }}
        >
          <style jsx>{`
            #testimonials-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {reviewsData.map((item, idx) => {
            const isExpanded = expandedIndex === idx;
            return (
              <RevealItem 
                key={item.id}
                style={{
                  flex: isExpanded ? '0 0 min(90vw, 800px)' : '0 0 min(85vw, 400px)',
                  transition: 'flex 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  minHeight: '600px',
                  scrollSnapAlign: 'center',
                  background: '#000000', 
                  borderRadius: '36px',
                  overflow: 'hidden',
                  display: 'flex',
                  flexDirection: 'column',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%', padding: '2.5rem', position: 'relative', zIndex: 1, minHeight: '600px' }}>
                  {/* Full Background Image */}
                  <div style={{ position: 'absolute', inset: 0, zIndex: -1 }}>
                    <Image src={item.image} alt={item.name} fill style={{ objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.85) 100%)' }} />
                  </div>

                  {/* Top Text */}
                  <div>
                    <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#FFFFFF', opacity: 0.9, marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
                      {lang === 'pl' ? item.tag : (item.tagEn || item.tag)}
                    </div>
                    <div style={{ color: '#FFFFFF', fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.1 }}>
                      {lang === 'pl' ? item.leadPl : item.leadEn}
                    </div>
                  </div>

                  {/* Expanded Content */}
                  <div style={{ 
                    marginTop: '2rem',
                    opacity: isExpanded ? 1 : 0,
                    maxHeight: isExpanded ? '400px' : 0,
                    overflow: 'hidden',
                    transition: 'opacity 0.4s ease, max-height 0.5s ease',
                    color: '#FFFFFF'
                  }}>
                    <p style={{ fontSize: '1.05rem', lineHeight: 1.6, opacity: 0.9, maxWidth: '500px' }}>
                      {lang === 'pl' ? item.bodyPl : item.bodyEn}
                    </p>
                    
                    {/* Client Signature */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem', marginTop: '2rem' }}>
                      <div style={{
                        width: '42px', height: '42px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#FFF', fontWeight: 700, fontSize: '0.9rem'
                      }}>
                        {item.initials}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#FFFFFF', lineHeight: 1.2 }}>{item.name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', marginTop: '2px' }}>
                          {lang === 'pl' ? item.role : (item.roleEn || item.role)}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div>
                      <div style={{ fontSize: '1.1rem', color: '#FFFFFF', opacity: 0.9, fontWeight: 500, marginBottom: '0.25rem' }}>
                        {lang === 'pl' ? item.metricLabel : (item.metricLabelEn || item.metricLabel)}
                      </div>
                      <div style={{ fontSize: '3rem', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.02em', lineHeight: 1 }}>
                        {item.metric}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setExpandedIndex(isExpanded ? null : idx)}
                      style={{ 
                        width: '36px', height: '36px', borderRadius: '50%', 
                        background: 'rgba(255,255,255,0.25)', 
                        backdropFilter: 'blur(10px)',
                        display: 'flex', justifyContent: 'center', alignItems: 'center',
                        border: 'none', cursor: 'pointer', outline: 'none'
                      }}
                      aria-label={isExpanded ? "Zwiń opinię" : "Rozwiń opinię"}
                    >
                      <svg 
                        width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                        style={{ transform: isExpanded ? 'rotate(45deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}
                      >
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </button>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
