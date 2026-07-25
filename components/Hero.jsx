'use client';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      {/* Black Hole Background Video */}
      <video
        className="hero-video-bg"
        autoPlay
        loop
        muted
        playsInline
        poster="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?auto=format&fit=crop&w=1920&q=80"
      >
        <source src="/Black hole AI SEO COMPANY.mp4" type="video/mp4" />
      </video>
      
      {/* Overlay */}
      <div className="hero-overlay"></div>

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="section-tag hero-badge-tag">
            <span className="asterisk">✳</span> AI SEO COMPANY
          </div>
          <h1>
            Branding i strony internetowe, które <span className="highlight">budują sprzedaż</span>
          </h1>
          <p className="hero-subtitle">
            Łączymy strategię marki, nowatorskie projektowanie i zaawansowane SEO, aby Twoja firma była widoczna, zapamiętana i masowo wybierana przez klientów.
          </p>
          <div className="hero-cta-group">
            <a href="#kontakt" className="btn btn-primary">
              Wyceń projekt
              <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a href="#portfolio" className="btn btn-secondary" style={{ color: '#FFFFFF', borderColor: 'rgba(255,255,255,0.3)', background: 'transparent' }}>
              Zobacz portfolio
            </a>
          </div>
          <div className="hero-proof">
            <div className="proof-item">
              <span className="proof-stars">★★★★★</span>
              <span>4,9/5 oceny klientów</span>
            </div>
            <div className="proof-item">
              <span>W wyróżnieniach Awwwards & Clutch</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-preview">
            <div className="preview-badge">Case Study Highlight</div>
            <div className="preview-metric">+8 113%</div>
            <div className="preview-title">Wzrost wyświetleń serwisu w Google</div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8' }}>
              Kompleksowe pozycjonowanie i architektura treści SEO — od 0 do 4,8 tys. wyświetleń w kwartale (ase-bot.live).
            </p>
            <div className="preview-bar">
              <div className="preview-progress"></div>
            </div>
          </div>
          <div className="floating-pill pill-1">
            <div className="pill-icon">↑</div>
            <div>
              <div style={{ color: '#0F172A' }}>+100 wyświetleń/dzień</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Staniax.pl (metalizacja)</div>
            </div>
          </div>
          <div className="floating-pill pill-2">
            <div className="pill-icon">⚡</div>
            <div>
              <div style={{ color: '#0F172A' }}>Strona za 0 zł w pakiecie</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Madame Thai Vercel</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
