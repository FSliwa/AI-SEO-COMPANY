'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Hero() {
  const { lang } = useLanguage();
  const t = translations[lang].hero;

  return (
    <section className="hero" id="hero">
      {/* Background Hero Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="hero-video-bg"
      >
        <source src="/Black hole AI SEO COMPANY.mp4" type="video/mp4" />
      </video>

      {/* Hero Overlay & Subtle Vignette */}
      <div className="hero-overlay"></div>

      <div className="container hero-grid">
        <div className="hero-content">
          <div className="section-tag hero-badge-tag">
            <span className="asterisk">✳</span> {t.tag}
          </div>

          <h1>
            {t.title1}
            <span className="highlight">{t.titleHighlight}</span>
          </h1>

          <p className="hero-subtitle">
            {t.subtitle}
          </p>

          <div className="hero-cta-group">
            <a href="#kontakt" className="btn btn-primary">
              {t.btnPrimary} →
            </a>
            <a href="#portfolio" className="btn btn-secondary" style={{ background: 'rgba(255, 255, 255, 0.08)', color: '#FFFFFF', borderColor: 'rgba(255, 255, 255, 0.25)' }}>
              {t.btnSecondary}
            </a>
          </div>

          <div className="hero-proof">
            <div className="proof-item">
              <span className="proof-stars">★★★★★</span>
              <span>{t.rating}</span>
            </div>
            <div className="proof-item" style={{ opacity: 0.7 }}>•</div>
            <div className="proof-item">
              <span>{t.awards}</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-card-preview">
            <span className="preview-badge">GOOGLING CASE STUDY</span>
            <div className="preview-metric">+8 113.8%</div>
            <div className="preview-title">{t.caseTitle}</div>
            <p style={{ fontSize: '0.85rem', color: '#94A3B8', lineHeight: '1.5' }}>
              {t.caseDesc}
            </p>
            <div className="preview-bar">
              <div className="preview-progress"></div>
            </div>
          </div>

          {/* Floating Pill Badges */}
          <div className="floating-pill pill-1">
            <div className="pill-icon">✓</div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Organiczny ruch</div>
              <div style={{ color: '#0F172A' }}>{t.pill1}</div>
            </div>
          </div>

          <div className="floating-pill pill-2">
            <div className="pill-icon">★</div>
            <div>
              <div style={{ fontSize: '0.75rem', color: '#64748B' }}>Darmowa Strona WWW</div>
              <div style={{ color: '#0F172A' }}>{t.pill2}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade Gradient Transition Matching ase-bot.live */}
      <div className="hero-bottom-fade"></div>
    </section>
  );
}
