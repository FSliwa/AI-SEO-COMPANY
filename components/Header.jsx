'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const t = translations[lang].nav;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    if (menuOpen) {
      closeMenu();
    } else {
      setMenuOpen(true);
    }
  };

  const closeMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(false);
      setMenuClosing(false);
    }, 600);
  };

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
              onClick={toggleMenu}
              aria-label="Toggle Menu"
              title="Toggle Menu"
            >
              ≡
            </button>
          </div>
        </div>
      </header>

      {/* KOTA Full-Screen Immersive Menu */}
      {menuOpen && (
        <div className={`kota-fullscreen-menu ${menuClosing ? 'closing' : ''}`}>
          
          <div className="container nav-container" style={{ paddingTop: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', opacity: 0 }}>
              <span className="logo">AI SEO COMPANY</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginLeft: 'auto' }}>
              <button
                className="kota-menu-trigger close-variant"
                onClick={closeMenu}
                aria-label="Close Menu"
                title="Close Menu"
              >
                ✕
              </button>
            </div>
          </div>

          <div className="kota-fullscreen-content container">
            <ul className="kota-fullscreen-links">
              <li style={{ '--delay': '0.15s' }}>
                <a href="#portfolio" onClick={closeMenu}>{t.portfolio}</a>
              </li>
              <li style={{ '--delay': '0.2s' }}>
                <a href="#uslugi" onClick={closeMenu}>{t.services}</a>
              </li>
              <li style={{ '--delay': '0.25s' }}>
                <a href="#cennik" onClick={closeMenu}>{t.pricing}</a>
              </li>
              <li style={{ '--delay': '0.3s' }}>
                <a href="#proces" onClick={closeMenu}>{t.process}</a>
              </li>
              <li style={{ '--delay': '0.35s' }}>
                <a href="#blog" onClick={closeMenu}>{t.blog}</a>
              </li>
              <li style={{ '--delay': '0.4s' }}>
                <a href="#kontakt" onClick={closeMenu}>{lang === 'pl' ? 'Kontakt' : 'Contact'}</a>
              </li>
            </ul>

            <div className="kota-fullscreen-footer">
              <div className="footer-contact">
                <span className="footer-label">Napisz do nas</span>
                <a href="mailto:kontakt@aiseocompany.com" className="footer-value">kontakt@aiseocompany.com</a>
              </div>
              <div className="footer-socials">
                <span className="footer-label">Social Media</span>
                <a href="#" className="footer-value">LinkedIn</a>
                <a href="#" className="footer-value">Instagram</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
