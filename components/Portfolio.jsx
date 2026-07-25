'use client';

import { useState } from 'react';

const realizedWebsites = [
  {
    id: 1,
    title: 'MADAMe Thai Restaurant',
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    tags: ['Web Design UX/UI', 'Strona za 0 zł'],
    metric: 'Strona za 0 zł w pakiecie',
    desc: 'Indywidualny projekt graficzny (UX/UI) dostosowany pod użytkowników mobilnych z integracją formularza i systemu rezerwacji Hotres.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    details: `Część I — Nowa strona internetowa: Fundament, na którym pracuje cały marketing.
- Indywidualny projekt graficzny (UX/UI) dopasowany do identyfikacji wizualnej: Buduje zaufanie od pierwszych sekund i w przemyślany sposób prowadzi klienta do telefonu lub rezerwacji.
- Responsywna wersja strony (RWD): Poprawne działanie na telefonach i tabletach — eliminacja utraconych zapytań od klientów mobilnych.
- Integracja narzędzi: Formularz kontaktowy, Google Analytics, linki social media, integracja z Hotres.
- Stała opieka techniczna: Certyfikat bezpieczeństwa SSL, bieżące aktualizacje i brak przestojów w cenie.`
  },
  {
    id: 2,
    title: 'Staniax — Metalizacja Próżniowa',
    url: 'https://www.staniax.pl/',
    category: 'seo',
    tags: ['Pozycjonowanie SEO', 'Case Study 1'],
    metric: '2,8 tys. wyświetleń w Google',
    desc: 'Skalowanie widoczności od zera na kluczowe frazy branżowe („metalizowanie próżniowe”, „metalizacja próżniowa”) oraz optymalizacja wersji mobilnej.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    details: `Case Study 1 — Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 2,8 tys. wyświetleń i gwałtowny skokowy wzrost do ok. 100 wyświetleń dziennie.
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych — przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    title: 'ASE-Bot — AI Futures Trading',
    url: 'https://ase-bot.live/',
    category: 'seo',
    tags: ['SEO B2B / USA', 'Case Study 2'],
    metric: '+8 113% wyświetleń (4,8k)',
    desc: 'Budowa widoczności w hiperkonkurencyjnej branży AI trading na rynku amerykańskim.',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    details: `Case Study 2 — Hiperkonkurencyjny rynek zagraniczny (ase-bot.live):
- Skok od 0 do 4,8 tys. wyświetleń w kwartale (+8 113,8%) i wzrost w ostatnich 28 dniach o 244,7% (do 500 wyświetleń dziennie).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 — krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

export default function Portfolio() {
  const [filter, setFilter] = useState('all');
  const [activeModal, setActiveModal] = useState(null);

  const filteredItems = filter === 'all'
    ? realizedWebsites
    : realizedWebsites.filter(item => item.category === filter || item.tags.some(t => t.toLowerCase().includes(filter)));

  return (
    <section className="portfolio" id="portfolio">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> Projects & Realizacje
          </div>
          <h2>Projects — zrealizowane strony z mierzalnym efektem</h2>
          <p>Zobacz wybrane projekty dla marek, którym pomogliśmy zdominować wyszukiwarki i zdobyć klientów.</p>
        </div>

        <div className="portfolio-filter">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>Wszystkie Projekty</button>
          <button className={`filter-btn ${filter === 'web' ? 'active' : ''}`} onClick={() => setFilter('web')}>Strony WWW za 0 zł</button>
          <button className={`filter-btn ${filter === 'seo' ? 'active' : ''}`} onClick={() => setFilter('seo')}>Case Studies SEO</button>
        </div>

        {/* VIS Screenshot 2 Device Mockup Grid */}
        <div className="portfolio-grid">
          {filteredItems.map(item => (
            <div key={item.id} className="portfolio-card" onClick={() => setActiveModal(item)}>
              <div className="portfolio-mockup-frame">
                <div className="portfolio-mockup-img" style={{ backgroundImage: `url('${item.image}')` }}></div>
                <div className="portfolio-metric-badge">{item.metric}</div>
              </div>
              <div className="portfolio-body">
                <div className="portfolio-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tag">{tag}</span>
                  ))}
                </div>
                <h3>{item.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-primary)', marginBottom: '0.5rem', fontWeight: '600' }}>
                  🔗 {item.url}
                </p>
                <p>{item.desc}</p>
                <span className="portfolio-link">Zobacz szczegóły case study →</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setActiveModal(null)}>&times;</span>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{activeModal.title}</h3>
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
            <div style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--color-primary)', marginBottom: '1rem' }}>
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
