'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
        <div className="container nav-container">
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#" className="logo">
              AI SEO COMPANY
            </a>
            
            {/* Header Award Badges */}
            <div className="header-award-badges">
              <span className="badge-pill">AWWWARDS</span>
              <span className="badge-pill">Clutch 4.9★</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Switcher (PL | EN) */}
            <div className="lang-switcher">
              <button
                className={`lang-btn ${lang === 'pl' ? 'active' : ''}`}
                onClick={() => toggleLang('pl')}
                title="Polski"
              >
                PL
              </button>
              <span style={{ opacity: 0.35 }}>|</span>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                onClick={() => toggleLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Header Hire Us Pill Button */}
            <a href="#kontakt" className="header-hire-btn">
              {t.cta}
            </a>

            {/* KOTA Circular Menu Toggle Trigger (Black Circle with ≡ or ✕) */}
            <button
              className="kota-menu-trigger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              {menuOpen ? '✕' : '≡'}
            </button>
          </div>
        </div>
      </header>

      {/* KOTA Floating Top-Right Navigation Menu Dropdown Card (Matching Attached Screenshot) */}
      {menuOpen && (
        <div className="kota-menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="kota-menu-dropdown-card" onClick={(e) => e.stopPropagation()}>
            <div className="kota-menu-card-header">
              <button
                className="kota-menu-close-btn"
                onClick={() => setMenuOpen(false)}
                aria-label="Close Menu"
              >
                ✕
              </button>
            </div>

            <ul className="kota-menu-card-links">
              <li>
                <a href="#portfolio" onClick={() => setMenuOpen(false)}>
                  {t.portfolio}
                </a>
              </li>
              <li>
                <a href="#uslugi" onClick={() => setMenuOpen(false)}>
                  {t.services} <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>+</span>
                </a>
              </li>
              <li>
                <a href="#cennik" onClick={() => setMenuOpen(false)}>
                  {t.pricing}
                </a>
              </li>
              <li>
                <a href="#proces" onClick={() => setMenuOpen(false)}>
                  {t.process}
                </a>
              </li>
              <li>
                <a href="#blog" onClick={() => setMenuOpen(false)}>
                  {t.blog}
                </a>
              </li>
              <li>
                <a href="#kontakt" onClick={() => setMenuOpen(false)}>
                  {lang === 'pl' ? 'Kontakt' : 'Contact'}
                </a>
              </li>
            </ul>

            <div className="kota-menu-card-footer">
              <a href="#kontakt" className="kota-menu-pill-cta" onClick={() => setMenuOpen(false)}>
                {t.cta}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
