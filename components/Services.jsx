export default function Services() {
  const pillars = [
    { num: '01 —', title: 'Brand Clarity', desc: 'Decyzje strategiczne pomagające pozycjonować markę na rynku.' },
    { num: '02 —', title: 'Creative Craft', desc: 'Pewny siebie, dopracowany design stworzony, by się wyróżniać.' },
    { num: '03 —', title: 'Commercial Momentum', desc: 'Skalowalne systemy zoptymalizowane pod szybki wzrost sprzedaży.' },
  ];

  return (
    <section className="services" id="uslugi">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> OUR SERVICES
          </div>
          <h2>Shaping how brands are seen, trusted, and remembered</h2>
          <p>Łączymy strategię marki, dedykowane projektowanie i architekturę SEO, aby doprowadzić Twoją firmę do stabilnego wzrostu.</p>
        </div>

        {/* KOTA 3 Pillars Row (Screenshot 1) */}
        <div className="kota-pillars-row">
          {pillars.map((pillar, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">{pillar.num}</div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
              {idx < pillars.length - 1 && <span className="kota-divider-x">✕</span>}
            </div>
          ))}
        </div>

        {/* Detailed Service Cards */}
        <div className="services-grid">
          {/* Card 1 */}
          <div className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3>Strategia i identyfikacja marki</h3>
            <p>Projektujemy spójną tożsamość wizualną: logo, system kolorystyczny, typografię oraz kompletną księgę znaku dostosowaną do wymagań cyfrowych.</p>
            <ul className="service-features">
              <li>Projektowanie logo & sygnetu</li>
              <li>Brand guidelines & styleguide</li>
              <li>Materiały marketingowe i social media</li>
            </ul>
          </div>

          {/* Card 2 */}
          <div className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3>Projektowanie i wdrożenie stron</h3>
            <p>Tworzymy responsywne, niezwykle szybkie strony internetowe (UX/UI), zoptymalizowane pod najwyższe współczynniki konwersji i estetykę premium.</p>
            <ul className="service-features">
              <li>Makiety UX/UI w Figma</li>
              <li>Programowanie (Next.js & React)</li>
              <li>Integracje z CRM i systemami płatności</li>
            </ul>
          </div>

          {/* Card 3 */}
          <div className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
            </div>
            <h3>SEO i marketing wzrostu</h3>
            <p>Skuteczne pozycjonowanie w wyszukiwarkach, architektura treści long-tail oraz optymalizacja konwersji (CRO) napędzająca stabilny ruch organiczny.</p>
            <ul className="service-features">
              <li>Audyt SEO i analiza konkurencji</li>
              <li>Content marketing & optymalizacja techniczna</li>
              <li>Monitorowanie widoczności i konwersji</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
