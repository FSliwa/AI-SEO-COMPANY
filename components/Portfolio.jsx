'use client';

import { useState } from 'react';

const realizedWebsites = [
  {
    id: 1,
    brand: 'MADAMe THAI RESTAURANT',
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    metric: '0 zł',
    metricSubtitle: 'strona WWW w pakiecie z pełnym RWD i systemem Hotres',
    gradient: 'linear-gradient(135deg, #38BDF8, #A855F7, #EC4899)',
    meshColor: 'radial-gradient(circle at 75% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.25) 45%, transparent 70%)',
    screens: [
      {
        title: 'Menu & Specjały',
        subtitle: 'Autorskie dania Tajskie',
        tag: 'Dania',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-15px)'
      },
      {
        title: 'Rezerwacja Stolika',
        subtitle: 'System Hotres Online',
        tag: 'Hotres UI',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(15px)',
        highlight: true
      },
      {
        title: 'Lokalizacja & Kontakt',
        subtitle: 'Wykrywanie GPS i Mapa',
        tag: 'Mobile RWD',
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
    brand: 'STANIAX METALIZACJA',
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metric: '2.8k',
    metricSubtitle: 'wyświetleń w Google i gwałtowny wzrost widoczności',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #10B981)',
    meshColor: 'radial-gradient(circle at 75% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(16, 185, 129, 0.25) 45%, transparent 70%)',
    screens: [
      {
        title: 'Metalizacja Próżniowa',
        subtitle: 'Fraza #1 w Google (17.3)',
        tag: 'SEO B2B',
        image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-10px)'
      },
      {
        title: 'Park Maszynowy',
        subtitle: 'Przemysłowa wydajność',
        tag: 'Wersje DE/EN',
        image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(20px)',
        highlight: true
      },
      {
        title: 'Zapytanie Ofertowe',
        subtitle: 'Wzrost konwersji +180%',
        tag: 'Formularz B2B',
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
    brand: 'ASE-BOT TRADING',
    url: 'https://ase-bot.live/',
    category: 'seo',
    metric: '+8113%',
    metricSubtitle: 'increase in organic search views on USA market',
    gradient: 'linear-gradient(135deg, #A855F7, #EC4899, #F97316)',
    meshColor: 'radial-gradient(circle at 75% 50%, rgba(236, 72, 153, 0.45) 0%, rgba(249, 115, 22, 0.3) 45%, transparent 70%)',
    screens: [
      {
        title: 'AI Futures Bot',
        subtitle: 'Algorytmy kwantowe USA',
        tag: 'USA Organic',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-20px)'
      },
      {
        title: 'Analityka Wyników',
        subtitle: '4.8k wyświetleń/kwartał',
        tag: 'CTR 4.62%',
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(10px)',
        highlight: true
      },
      {
        title: 'Live Signals Feed',
        subtitle: 'Powiadomienia na żywo',
        tag: 'High Velocity',
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
  const [activeModal, setActiveModal] = useState(null);
  const [animating, setAnimating] = useState(false);

  const handleNext = () => {
    if (animating) return;
    setAnimating(true);
    setActiveIndex((prev) => (prev + 1) % realizedWebsites.length);
    setTimeout(() => setAnimating(false), 500);
  };

  const currentItem = realizedWebsites[activeIndex];

  return (
    <section className="portfolio-kota-section" id="portfolio">
      <div className="container">
        <div className="section-header dark-header">
          <div className="section-tag dark-tag">
            <span className="asterisk">✳</span> OUR RESULTS
          </div>
          <h2>Projects — zrealizowane strony z mierzalnym efektem</h2>
          <p style={{ color: '#94A3B8' }}>Projekty i case studies wygenerowane dla klientów poszukujących wzrostu organicznego.</p>
        </div>

        {/* KOTA Full Screen Deck Showcase */}
        <div className="kota-deck-container">
          {/* Stacked Back Edges (Left Cards Effect) */}
          <div className="kota-deck-edge edge-3"></div>
          <div className="kota-deck-edge edge-2"></div>
          <div className="kota-deck-edge edge-1"></div>

          {/* Primary Main Card */}
          <div className={`kota-main-card ${animating ? 'slide-animating' : ''}`}>
            {/* Mesh Blur Glow Background Overlay */}
            <div className="kota-card-mesh-bg" style={{ background: currentItem.meshColor }}></div>

            {/* Left Side Content */}
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
                <span>View project</span>
                <span className="kota-btn-arrow">→</span>
              </button>
            </div>

            {/* Right Side 3 Floating Staggered Mobile Phone Screen Mockups */}
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

            {/* KOTA Bottom-Right Circular Carousel Control Button */}
            <button
              className="kota-deck-next-btn"
              onClick={handleNext}
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
            <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#38BDF8', marginBottom: '1rem' }}>
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
