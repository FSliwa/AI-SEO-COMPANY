'use client';

import { useState, useEffect } from 'react';

const realizedWebsites = [
  {
    id: 1,
    brand: 'MADAMe THAI',
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    metricVal: 104.9,
    metricSuffix: '%',
    metricSubtitle: 'wzrost rezerwacji i wizyt organicznych po 1 miesiącu.',
    gradient: 'linear-gradient(135deg, #38BDF8, #A855F7, #EC4899)',
    meshBg: 'radial-gradient(circle at 80% 45%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.3) 40%, rgba(6, 11, 24, 0.98) 75%)',
    screens: [
      {
        title: 'Senior 3D Retail',
        subtitle: 'London, UK',
        tag: 'CAREERS',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-15px)'
      },
      {
        title: 'Shaping the future',
        subtitle: 'Retail Experience',
        tag: 'OUR EXPERTISE',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(15px)',
        highlight: true
      },
      {
        title: 'Empower creativity',
        subtitle: 'Design System',
        tag: 'CULTURE',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-5px)'
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
    brand: 'WOGAN / STANIAX',
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metricVal: 83.14,
    metricSuffix: '%',
    metricSubtitle: 'wzrost sprzedaży i zapytan B2B po 1 roku.',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #10B981)',
    meshBg: 'radial-gradient(circle at 80% 45%, rgba(56, 189, 248, 0.45) 0%, rgba(16, 185, 129, 0.3) 40%, rgba(6, 11, 24, 0.98) 75%)',
    screens: [
      {
        title: 'GREAT COFFEE',
        subtitle: 'Sustainable roasting',
        tag: 'BRANDING',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-10px)'
      },
      {
        title: 'Metalizacja Próżniowa',
        subtitle: 'Pozycja #1 w Google',
        tag: 'SEO B2B',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(20px)',
        highlight: true
      },
      {
        title: 'B2B Offer System',
        subtitle: 'Conversion +180%',
        tag: 'SYSTEM',
        image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-15px)'
      }
    ],
    details: `Case Study 1 — Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 2,8 tys. wyświetleń i gwałtowny skokowy wzrost do ok. 100 wyświetleń dziennie.
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych — przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    brand: 'ASE-BOT',
    url: 'https://ase-bot.live/',
    category: 'seo',
    metricVal: 8113.8,
    metricSuffix: '%',
    metricSubtitle: 'wzrostu wyświetleń w wyszukiwarce Google (USA).',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899, #F97316)',
    meshBg: 'radial-gradient(circle at 80% 45%, rgba(236, 72, 153, 0.45) 0%, rgba(249, 115, 22, 0.3) 40%, rgba(6, 11, 24, 0.98) 75%)',
    screens: [
      {
        title: 'AI Futures Trading',
        subtitle: 'Quantum Trading USA',
        tag: 'AI TRADING',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-20px)'
      },
      {
        title: 'Organic Reach 4.8k',
        subtitle: 'CTR 4.62% na rynku USA',
        tag: 'ANALYTICS',
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(10px)',
        highlight: true
      },
      {
        title: 'Live Signal Feed',
        subtitle: 'Realtime WebSocket',
        tag: 'ENGINE',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-10px)'
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
  const [displayNumber, setDisplayNumber] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const [isSwapping, setIsSwapping] = useState(false);

  const currentItem = realizedWebsites[activeIndex];

  // Countup counter animation for metric value
  useEffect(() => {
    let start = 0;
    const target = currentItem.metricVal;
    const duration = 600;
    const steps = 30;
    const increment = target / steps;
    const stepTime = duration / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setDisplayNumber(target);
        clearInterval(timer);
      } else {
        setDisplayNumber(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [activeIndex, currentItem.metricVal]);

  const handleNextSlide = () => {
    if (isSwapping) return;
    setIsSwapping(true);
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % realizedWebsites.length);
      setIsSwapping(false);
    }, 250);
  };

  return (
    <section className="portfolio-kota-section" id="portfolio">
      <div className="container" style={{ maxWidth: '1300px' }}>
        <div className="section-header dark-header">
          <div className="section-tag dark-tag">
            <span className="asterisk">✳</span> OUR RESULTS
          </div>
          <h2>Projects — zrealizowane strony z mierzalnym efektem</h2>
          <p style={{ color: '#94A3B8' }}>Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów.</p>
        </div>

        {/* KOTA Full-Width Card Deck Frame */}
        <div className="kota-deck-container">
          {/* Stacked Left Edge Card Layers (Visual Depth Stack) */}
          <div className="kota-deck-edge edge-3"></div>
          <div className="kota-deck-edge edge-2"></div>
          <div className="kota-deck-edge edge-1"></div>

          {/* Active Main Card */}
          <div className={`kota-main-card ${isSwapping ? 'kota-swapping' : ''}`}>
            {/* Dynamic Ambient Mesh Gradient Background */}
            <div className="kota-card-mesh-bg" style={{ background: currentItem.meshBg }}></div>

            {/* Left Content Side */}
            <div className="kota-card-left">
              <div className="kota-brand-badge">
                <span className="kota-brand-icon">⚡</span>
                <span>{currentItem.brand}</span>
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
                  {displayNumber.toFixed(1)}{currentItem.metricSuffix}
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

            {/* Right Side 3 Floating Mobile Phone Screen Trio */}
            <div className="kota-card-right">
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
            </div>

            {/* Circular Carousel Next Control Arrow (Bottom Right) */}
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
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{activeModal.brand}</h3>
            <p style={{ fontSize: '0.95rem', color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: '600' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                {activeModal.url} ↗
              </a>
            </p>
            <div style={{ fontSize: '2.8rem', fontWeight: '700', color: '#38BDF8', marginBottom: '1rem' }}>
              {activeModal.metricVal}{activeModal.metricSuffix}
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
