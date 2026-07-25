'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';

const realizedWebsites = [
  {
    id: 1,
    brandName: 'ISI GLOBAL / MADAMe THAI',
    brandLogo: (
      <svg width="130" height="30" viewBox="0 0 160 36" fill="none">
        <path d="M8 18C8 12.5 12.5 8 18 8C23.5 8 28 12.5 28 18C28 23.5 23.5 28 18 28" stroke="#38BDF8" strokeWidth="3" strokeLinecap="round"/>
        <path d="M18 18C18 12.5 22.5 8 28 8C33.5 8 38 12.5 38 18" stroke="#A855F7" strokeWidth="3" strokeLinecap="round"/>
        <text x="48" y="25" fill="#FFFFFF" fontSize="18" fontWeight="800" fontFamily="Space Grotesk, sans-serif" letterSpacing="2">ISI GLOBAL</text>
      </svg>
    ),
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    metric: '104.9%',
    metricSubtitle: 'increase in organic visits after 1 month.',
    gradient: 'linear-gradient(135deg, #818CF8, #38BDF8, #C084FC)',
    meshBg: 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.5) 0%, rgba(56, 189, 248, 0.35) 45%, rgba(4, 8, 20, 0.98) 75%)',
    rightVisual: 'phones',
    screens: [
      {
        title: 'Senior 3D Retail',
        subtitle: 'London, UK',
        tag: 'CAREERS',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-18px)'
      },
      {
        title: 'Shaping the future',
        subtitle: 'Retail Experience',
        tag: 'OUR EXPERTISE',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(16px)',
        highlight: true
      },
      {
        title: 'Empower creativity',
        subtitle: 'Brand Strategy 2026',
        tag: 'CULTURE',
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
    brandName: 'WOGAN / STANIAX',
    brandLogo: (
      <svg width="130" height="36" viewBox="0 0 160 40" fill="none">
        <path d="M18 10C14 10 10 14 10 18C10 22 14 26 18 26C22 26 26 22 26 18" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round"/>
        <path d="M14 12L22 24" stroke="#FFFFFF" strokeWidth="2.5"/>
        <text x="36" y="27" fill="#FFFFFF" fontSize="20" fontWeight="800" fontFamily="Space Grotesk, sans-serif" letterSpacing="3">WOGAN</text>
      </svg>
    ),
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metric: '83.14%',
    metricSubtitle: 'increase in sales after 1 year.',
    gradient: 'linear-gradient(135deg, #818CF8, #60A5FA, #34D399)',
    meshBg: 'radial-gradient(circle at 80% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(52, 211, 153, 0.35) 45%, rgba(4, 8, 20, 0.98) 75%)',
    rightVisual: 'desktop',
    desktopCard: {
      tag: 'BRANDING & E-COMMERCE',
      title: 'GREAT COFFEE DOESN\'T HAVE TO COST THE EARTH',
      subtitle: 'Since 1970, our family has been on a mission to provide sustainable and ethical specialty coffee.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      btnText: 'Shop Now'
    },
    details: `Case Study 1 — Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 2,8 tys. wyświetleń i gwałtowny skokowy wzrost do ok. 100 wyświetleń dziennie.
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych — przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    brandName: 'PISON / ASE-BOT',
    brandLogo: (
      <svg width="120" height="34" viewBox="0 0 150 40" fill="none">
        <path d="M12 8L28 20L12 32V8Z" stroke="#38BDF8" strokeWidth="3" strokeLinejoin="round"/>
        <text x="38" y="27" fill="#FFFFFF" fontSize="20" fontWeight="800" fontFamily="Space Grotesk, sans-serif" letterSpacing="3">PISON</text>
      </svg>
    ),
    url: 'https://ase-bot.live/',
    category: 'seo',
    metric: '67.6%',
    metricSubtitle: 'rise in engaged sessions per user after 1 month.',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A855F7)',
    meshBg: 'radial-gradient(circle at 80% 50%, rgba(168, 85, 247, 0.5) 0%, rgba(56, 189, 248, 0.35) 45%, rgba(4, 8, 20, 0.98) 75%)',
    rightVisual: 'phones',
    screens: [
      {
        title: 'PISON READY',
        subtitle: 'Measure your ability',
        tag: 'APP READY',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-22px)'
      },
      {
        title: 'Unlock your mind.',
        subtitle: 'Unleash your potential.',
        tag: 'OUR EXPERTISE',
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(12px)',
        highlight: true
      },
      {
        title: 'Coming to your',
        subtitle: 'Favorite Devices',
        tag: 'ECOSYSTEM',
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
  const [swipingIndex, setSwipingIndex] = useState(null);
  const [activeModal, setActiveModal] = useState(null);
  const { lang } = useLanguage();

  const handleNextSlide = () => {
    if (swipingIndex !== null) return;
    setSwipingIndex(activeIndex);

    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % realizedWebsites.length);
      setSwipingIndex(null);
    }, 450);
  };

  const currentItem = realizedWebsites[activeIndex];
  const nextItem = realizedWebsites[(activeIndex + 1) % realizedWebsites.length];

  return (
    <section className="portfolio-kota-section" id="portfolio">
      <div className="container" style={{ maxWidth: '1280px' }}>
        <div className="section-header dark-header">
          <div className="section-tag dark-tag">
            <span className="asterisk">✳</span> OUR RESULTS
          </div>
          <h2 style={{ color: '#FFFFFF' }}>
            {lang === 'pl' ? 'Projects — zrealizowane strony z mierzalnym efektem' : 'Projects — high-performance websites with measurable impact'}
          </h2>
          <p style={{ color: '#94A3B8' }}>
            {lang === 'pl' ? 'Zobacz wyniki i realizacje stworzone na wzór najlepszych światowych agencji digital.' : 'Explore analytics-backed growth metrics across our client case studies.'}
          </p>
        </div>

        {/* KOTA Full-Width Card Deck Showcase with Horizontal Card Swipe Physics */}
        <div className="kota-deck-container">
          {/* Left Stack Edges */}
          <div className="kota-deck-edge edge-3"></div>
          <div className="kota-deck-edge edge-2"></div>
          <div className="kota-deck-edge edge-1"></div>

          {/* Underneath Revealed Card (Appears as top card swipes right) */}
          <div className="kota-main-card kota-underneath-card">
            <div className="kota-card-mesh-bg" style={{ background: nextItem.meshBg }}></div>
            <div className="kota-card-left">
              <div className="kota-brand-logo-wrapper">{nextItem.brandLogo}</div>
              <div className="kota-metric-wrapper">
                <div
                  className="kota-giant-metric"
                  style={{
                    background: nextItem.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {nextItem.metric}
                </div>
                <div className="kota-metric-subtext">{nextItem.metricSubtitle}</div>
              </div>
              <button className="kota-view-project-btn">
                <span>View Project</span>
                <span className="kota-btn-arrow">→</span>
              </button>
            </div>

            <div className="kota-card-right">
              {nextItem.rightVisual === 'desktop' ? (
                <div className="kota-desktop-preview-card">
                  <div className="kota-desktop-img" style={{ backgroundImage: `url('${nextItem.desktopCard.image}')` }}></div>
                  <div className="kota-desktop-content">
                    <span className="kota-phone-tag">{nextItem.desktopCard.tag}</span>
                    <h3>{nextItem.desktopCard.title}</h3>
                    <p>{nextItem.desktopCard.subtitle}</p>
                  </div>
                </div>
              ) : (
                <div className="kota-phone-trio">
                  {nextItem.screens.map((screen, idx) => (
                    <div
                      key={idx}
                      className={`kota-phone-card ${screen.highlight ? 'highlight-phone' : ''}`}
                      style={{ transform: screen.transform }}
                    >
                      <div className="kota-phone-screen-top">
                        <span className="kota-phone-dot"></span>
                        <span className="kota-phone-tag">{screen.tag}</span>
                      </div>
                      <div className="kota-phone-img" style={{ backgroundImage: `url('${screen.image}')` }}></div>
                      <div className="kota-phone-body">
                        <h4>{screen.title}</h4>
                        <p>{screen.subtitle}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Primary Top Active Card (Swipes off to the right when arrow clicked) */}
          <div className={`kota-main-card ${swipingIndex === activeIndex ? 'kota-swiping-out' : ''}`}>
            <div className="kota-card-mesh-bg" style={{ background: currentItem.meshBg }}></div>

            {/* Left Content Side */}
            <div className="kota-card-left">
              <div className="kota-brand-logo-wrapper">
                {currentItem.brandLogo}
              </div>

              <div className="kota-metric-wrapper">
                <div
                  className="kota-giant-metric"
                  style={{
                    background: currentItem.gradient,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {currentItem.metric}
                </div>
                <div className="kota-metric-subtext">
                  {currentItem.metricSubtitle}
                </div>
              </div>

              <button
                className="kota-view-project-btn"
                onClick={() => setActiveModal(currentItem)}
              >
                <span>View Project</span>
                <span className="kota-btn-arrow">→</span>
              </button>
            </div>

            {/* Right Side Visual Showcase */}
            <div className="kota-card-right">
              {currentItem.rightVisual === 'desktop' ? (
                /* Desktop Web Preview Mockup Card (WOGAN style - Frame 20) */
                <div className="kota-desktop-preview-card">
                  <div className="kota-desktop-img" style={{ backgroundImage: `url('${currentItem.desktopCard.image}')` }}></div>
                  <div className="kota-desktop-content">
                    <span className="kota-phone-tag">{currentItem.desktopCard.tag}</span>
                    <h3>{currentItem.desktopCard.title}</h3>
                    <p>{currentItem.desktopCard.subtitle}</p>
                    <button className="kota-desktop-pill-btn">
                      {currentItem.desktopCard.btnText}
                    </button>
                  </div>
                </div>
              ) : (
                /* 3 White Phone Screen Cards Trio (PISON / ISI GLOBAL style) */
                <div className="kota-phone-trio">
                  {currentItem.screens.map((screen, idx) => (
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

            {/* KOTA Bottom-Right Carousel Next Arrow Button (Frame 20) */}
            <button
              className="kota-deck-next-btn"
              onClick={handleNextSlide}
              aria-label="Next Project"
              title="Next Project"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
            </button>
          </div>
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
