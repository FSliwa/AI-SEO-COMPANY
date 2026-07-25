'use client';

import { useState } from 'react';

const realizedWebsites = [
  {
    id: 1,
    brand: 'MADAMe THAI RESTAURANT',
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    tags: ['Web Design UX/UI', 'Strona za 0 zł'],
    metric: 'Strona za 0 zł',
    metricSubtitle: 'w pakiecie z pełnym wdrożeniem RWD i rezerwacjami Hotres',
    desc: 'Indywidualny projekt graficzny (UX/UI) dostosowany pod użytkowników mobilnych z integracją formularza i systemu rezerwacji Hotres.',
    gradient: 'linear-gradient(135deg, #38BDF8, #A855F7, #EC4899)',
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(168, 85, 247, 0.25), rgba(7, 12, 24, 0.95))',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
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
    tags: ['Pozycjonowanie SEO', 'Case Study 1'],
    metric: '2,8 tys.',
    metricSubtitle: 'wyświetleń w Google i gwałtowny wzrost widoczności w 60 dni',
    desc: 'Skalowanie widoczności od zera na kluczowe frazy branżowe („metalizowanie próżniowe”, „metalizacja próżniowa”) oraz optymalizacja wersji mobilnej.',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #10B981)',
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.25), rgba(7, 12, 24, 0.95))',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
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
    tags: ['SEO B2B / USA', 'Case Study 2'],
    metric: '+8 113%',
    metricSubtitle: 'wzrostu wyświetleń w wyszukiwarce Google na rynku USA',
    desc: 'Budowa widoczności w hiperkonkurencyjnej branży AI trading na rynku amerykańskim.',
    gradient: 'linear-gradient(135deg, #F97316, #EC4899, #8B5CF6)',
    bgGradient: 'radial-gradient(circle at 70% 30%, rgba(236, 72, 153, 0.25), rgba(7, 12, 24, 0.95))',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    details: `Case Study 2 — Hiperkonkurencyjny rynek zagraniczny (ase-bot.live):
- Skok od 0 do 4,8 tys. wyświetleń w kwartale (+8 113,8%) i wzrost w ostatnich 28 dniach o 244,7% (do 500 wyświetleń dziennie).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 — krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % realizedWebsites.length);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + realizedWebsites.length) % realizedWebsites.length);
  };

  const currentItem = realizedWebsites[activeIndex];

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> OUR RESULTS
          </div>
          <h2>Projects — zrealizowane strony z mierzalnym efektem</h2>
          <p>Zobacz wyniki i realizacje stworzone na wzór najlepszych światowych agencji digital.</p>
        </div>

        {/* KOTA "Our Results" Stacked Deck Showcase (Screenshots 1 & 2) */}
        <div className="kota-results-deck-wrapper">
          {/* Background Stack Cards for Deck Effect */}
          <div className="kota-deck-stack layer-3"></div>
          <div className="kota-deck-stack layer-2"></div>

          {/* Active Primary Card */}
          <div className="kota-deck-main-card" style={{ background: currentItem.bgGradient }}>
            <div className="kota-deck-left">
              <div className="kota-deck-brand">
                <span>⚡</span> {currentItem.brand}
              </div>

              <div className="kota-deck-metric-group">
                <div className="kota-deck-metric-number" style={{ background: currentItem.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                  {currentItem.metric}
                </div>
                <div className="kota-deck-metric-sub">
                  {currentItem.metricSubtitle}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {currentItem.tags.map((t, i) => (
                  <span key={i} className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)' }}>
                    {t}
                  </span>
                ))}
              </div>

              <button className="btn btn-secondary" onClick={() => setActiveModal(currentItem)} style={{ background: 'rgba(255,255,255,0.1)', color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.2)' }}>
                Zobacz szczegóły case study →
              </button>
            </div>

            <div className="kota-deck-right">
              <div className="kota-deck-mockup-window">
                <div className="kota-deck-mockup-bg" style={{ backgroundImage: `url('${currentItem.image}')` }}></div>
                <div className="kota-deck-url-badge">{currentItem.url}</div>
              </div>
            </div>

            {/* Circular Carousel Controls (Bottom Right) */}
            <div className="kota-deck-controls">
              <button className="kota-control-arrow" onClick={prevSlide} title="Poprzedni projekt" aria-label="Previous">
                ‹
              </button>
              <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)', fontWeight: '600' }}>
                0{activeIndex + 1} / 0{realizedWebsites.length}
              </span>
              <button className="kota-control-arrow" onClick={nextSlide} title="Następny projekt" aria-label="Next">
                ›
              </button>
            </div>
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
            <div style={{ marginBottom: '1rem' }}>
              {activeModal.tags.map((tag, i) => (
                <span key={i} className="tag" style={{ marginRight: '0.4rem' }}>{tag}</span>
              ))}
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '700', color: '#38BDF8', marginBottom: '1rem' }}>
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
