'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const realizedWebsites = [
  {
    id: 1,
    brandName: 'MADAME THAI',
    brandLogo: (
      <img src="/logos/madame-thai.png" alt="Madame Thai" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
    ),
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    metric: '104.9%',
    metricSubtitle: 'increase in organic visits after 1 month.',
    gradient: 'linear-gradient(135deg, #818CF8, #38BDF8, #C084FC)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(56, 189, 248, 0.1) 40%, rgba(255, 255, 255, 1) 75%)',
    rightVisual: 'phones',
    screens: [
      {
        title: 'Authentic Thai',
        subtitle: 'Restaurant Experience',
        tag: 'GASTRONOMY',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-18px)'
      },
      {
        title: 'Seamless Booking',
        subtitle: 'High Conversion UI',
        tag: 'UX/UI DESIGN',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(16px)',
        highlight: true
      },
      {
        title: 'Brand Strategy',
        subtitle: 'Digital Transformation',
        tag: 'WEB DEV',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-6px)'
      }
    ],
    details: `Część I — Nowa strona internetowa: Fundament, na którym pracuje cały marketing.
- Indywidualny projekt graficzny (UX/UI) dopasowany do identyfikacji wizualnej: Buduje zaufanie od pierwszych sekund i w przemyślany sposób prowadzi klienta do telefonu lub rezerwacji.
- Responsywna wersja strony (RWD): Poprawne działanie na telefonach i tabletach — eliminacja utraconych zapytań od klientów mobilnych.
- Integracja narzędzi: Formularz kontaktowy, Google Analytics, linki social media, integracja z Hotres.
- Stała opieka techniczna: Certyfikat bezpieczeństwa SSL, bieżące aktualizacje i brak przestojów w cenie.`
  },
  {
    id: 2,
    brandName: 'STANIAX',
    brandLogo: (
      <img src="/logos/staniax.png" alt="Staniax" style={{ height: '36px', width: 'auto', objectFit: 'contain' }} />
    ),
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metric: '2.8k+',
    metricSubtitle: 'organic search impressions from zero visibility.',
    gradient: 'linear-gradient(135deg, #818CF8, #60A5FA, #34D399)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(56, 189, 248, 0.15) 0%, rgba(52, 211, 153, 0.1) 40%, rgba(255, 255, 255, 1) 75%)',
    rightVisual: 'desktop',
    desktopCard: {
      tag: 'B2B INDUSTRY & SEO',
      title: 'METALIZACJA PRÓŻNIOWA & LAKIEROWANIE UV',
      subtitle: 'Skalowanie biznesu B2B na rynki zagraniczne (Niemcy, USA) dzięki nowej architekturze informacji i SEO.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      btnText: 'View Case Study'
    },
    details: `Case Study 1 — Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 2,8 tys. wyświetleń i gwałtowny skokowy wzrost do ok. 100 wyświetleń dziennie.
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych — przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    brandName: 'ASE-BOT',
    brandLogo: (
      <img src="/logos/ase-bot.png" alt="ASE-BOT" style={{ height: '36px', width: 'auto', objectFit: 'contain', filter: 'invert(1)' }} />
    ),
    url: 'https://ase-bot.live/',
    category: 'seo',
    metric: '+8 113.8%',
    metricSubtitle: 'Organic Google Search Growth',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A855F7)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.15) 0%, rgba(56, 189, 248, 0.12) 40%, rgba(255, 255, 255, 1) 75%)',
    rightVisual: 'phones',
    screens: [
      {
        title: 'AI Futures Trading',
        subtitle: 'Global Market Leader',
        tag: 'FINTECH',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-22px)'
      },
      {
        title: 'Unlock 4.8k impressions',
        subtitle: 'per quarter from zero',
        tag: 'SEO GROWTH',
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(12px)',
        highlight: true
      },
      {
        title: 'Global CTR 4.62%',
        subtitle: 'On commercial keywords',
        tag: 'CONVERSION',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-12px)'
      }
    ],
    details: `Case Study 2 — Hiperkonkurencyjny rynek zagraniczny (ase-bot.live):
- Skok od 0 do 4,8 tys. wyświetleń w kwartale (+8 113,8%) i wzrost w ostatnich 28 dniach o 244,7% (do 500 wyświetleń dziennie).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 — krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [activeModal, setActiveModal] = useState(null);
  const { lang } = useLanguage();

  const [dragStartX, setDragStartX] = useState(0);
  const [dragDistance, setDragDistance] = useState(0);

  const handlePointerDown = (e) => {
    if (isAnimating) return;
    e.target.setPointerCapture(e.pointerId);
    setDragStartX(e.clientX || (e.touches && e.touches[0].clientX) || 0);
    setDragDistance(0);
  };

  const handlePointerMove = (e) => {
    if (!dragStartX || isAnimating) return;
    const currentX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    setDragDistance(currentX - dragStartX);
  };

  const handlePointerUp = (e) => {
    if (e.pointerId) e.target.releasePointerCapture(e.pointerId);
    if (dragStartX && dragDistance < -50) {
      handleNextSlide();
    }
    setDragStartX(0);
    setDragDistance(0);
  };

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % realizedWebsites.length);
      setIsAnimating(false);
      setDragStartX(0);
      setDragDistance(0);
    }, 400); // Wait for the slide-out animation to complete
  };

  const getCardStyle = (index) => {
    const total = realizedWebsites.length;
    const offset = (index - activeIndex + total) % total;

    // Handle the card currently being dragged
    if (offset === 0 && dragStartX && !isAnimating) {
      return {
        zIndex: 10,
        transform: `translateX(${dragDistance}px) rotate(${dragDistance * 0.02}deg)`,
        transition: 'none',
        opacity: 1,
        boxShadow: '0 30px 70px rgba(0, 0, 0, 0.15)'
      };
    }

    // Default stacking styles
    let scale = 1;
    let translateX = 0;
    let opacity = 1;
    let zIndex = 10 - offset;
    let shadow = '0 25px 60px rgba(0, 0, 0, 0.08)';
    let transition = 'all 0.5s cubic-bezier(0.2, 0.8, 0.2, 1)';

    if (offset === 1) {
      scale = 0.95;
      translateX = -40;
      opacity = 0.95;
      shadow = '0 15px 40px rgba(0, 0, 0, 0.05)';
    } else if (offset === 2) {
      scale = 0.90;
      translateX = -80;
      opacity = 0.7;
      shadow = '0 10px 20px rgba(0, 0, 0, 0.03)';
    } else if (offset > 2) {
      scale = 0.85;
      translateX = -100;
      opacity = 0;
      // If it's the card that just animated out, disable transition so it snaps back to the left invisibly
      if (offset === total - 1) transition = 'none';
    }

    // When animating, the top card (offset 0) flies out
    if (offset === 0 && isAnimating) {
      return {
        zIndex: 10,
        transform: 'translateX(120%) rotate(5deg) scale(0.9)',
        opacity: 0,
        transition: 'all 0.4s cubic-bezier(0.8, 0, 0.2, 1)',
        pointerEvents: 'none'
      };
    }

    return {
      zIndex,
      transform: `translateX(${translateX}px) scale(${scale})`,
      opacity,
      boxShadow: shadow,
      transition,
      pointerEvents: offset === 0 ? 'auto' : 'none'
    };
  };

  return (
    <section className="portfolio-kota-section" id="portfolio">
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div className="section-header center">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> OUR RESULTS
          </div>
          <h2>
            {lang === 'pl' ? 'Projects — zrealizowane strony z mierzalnym efektem' : 'Projects — high-performance websites with measurable impact'}
          </h2>
          <p>
            {lang === 'pl' ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów.' : 'Explore analytics-backed growth metrics across our client case studies.'}
          </p>
        </div>

        {/* KOTA Full-Width True Card Deck Showcase */}
        <div className="kota-deck-container">
          {realizedWebsites.map((item, index) => {
            const offset = (index - activeIndex + realizedWebsites.length) % realizedWebsites.length;
            
            return (
              <div 
                key={item.id}
                className="kota-stacked-card"
                style={getCardStyle(index)}
                onPointerDown={offset === 0 ? handlePointerDown : undefined}
                onPointerMove={offset === 0 ? handlePointerMove : undefined}
                onPointerUp={offset === 0 ? handlePointerUp : undefined}
                onPointerLeave={offset === 0 ? handlePointerUp : undefined}
                onDragStart={(e) => e.preventDefault()}
              >
                <div className="kota-card-mesh-bg" style={{ background: item.meshBg }}></div>

                {/* Left Content Side */}
                <div className="kota-card-left" style={{ pointerEvents: offset === 0 ? 'auto' : 'none' }}>
                  <div className="kota-brand-logo-wrapper">
                    {item.brandLogo}
                  </div>

                  <div className="kota-metric-wrapper">
                    <div
                      className="kota-giant-metric"
                      style={{
                        background: item.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                      }}
                    >
                      {item.metric}
                    </div>
                    <div className="kota-metric-subtext">
                      {item.metricSubtitle}
                    </div>
                  </div>

                  <button
                    className="kota-view-project-btn"
                    onClick={() => offset === 0 && setActiveModal(item)}
                  >
                    <span>View Project</span>
                    <span className="kota-btn-arrow">→</span>
                  </button>
                </div>

                {/* Right Side Visual Showcase */}
                <div className="kota-card-right" style={{ pointerEvents: 'none' }}>
                  {item.rightVisual === 'desktop' ? (
                    <div className="kota-desktop-preview-card">
                      <div className="kota-desktop-img" style={{ backgroundImage: `url('${item.desktopCard.image}')` }}></div>
                      <div className="kota-desktop-content">
                        <span className="kota-phone-tag">{item.desktopCard.tag}</span>
                        <h3>{item.desktopCard.title}</h3>
                        <p>{item.desktopCard.subtitle}</p>
                        <button className="kota-desktop-pill-btn">
                          {item.desktopCard.btnText}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="kota-phone-trio">
                      {item.screens.map((screen, idx) => (
                        <div
                          key={idx}
                          className={`kota-phone-card ${screen.highlight ? 'highlight-phone' : ''}`}
                          style={{ transform: screen.transform }}
                        >
                          <div className="kota-phone-screen-top">
                            <span className="kota-phone-dot"></span>
                            <span className="kota-phone-tag">{screen.tag}</span>
                          </div>
                          <div
                            className="kota-phone-img"
                            style={{ backgroundImage: `url('${screen.image}')` }}
                          ></div>
                          <div className="kota-phone-body">
                            <h4>{screen.title}</h4>
                            <p>{screen.subtitle}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Next Arrow Button (Only active on top card) */}
                {offset === 0 && (
                  <button
                    className="kota-deck-next-btn"
                    onClick={(e) => { e.stopPropagation(); handleNextSlide(); }}
                    aria-label="Next Project"
                    title="Next Project"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setActiveModal(null)}>&times;</span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{activeModal.brandName}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '600' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                {activeModal.url} ↗
              </a>
            </p>
            <div style={{ fontSize: '2.8rem', fontWeight: '700', color: '#38BDF8', marginBottom: '1rem' }}>
              {activeModal.metric}
            </div>
            <div style={{ color: 'var(--color-text-main)', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-line', marginBottom: '1.5rem', background: 'var(--color-bg-surface)', padding: '1.25rem', borderRadius: '12px' }}>
              {activeModal.details}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                Odwiedź witrynę na żywo ↗
              </a>
              <a href="#kontakt" className="btn btn-primary" onClick={() => setActiveModal(null)}>
                Zamów stronę / SEO dla swojej firmy
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
