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
        <div 
          className="nav-container" 
          style={{ 
            maxWidth: scrolled ? 'var(--container-width)' : '100%', 
            padding: scrolled ? '0 1.5rem' : '0 3vw',
            margin: '0 auto',
            width: '100%',
            transition: 'max-width 0.7s cubic-bezier(0.7, 0, 0.3, 1), padding 0.7s cubic-bezier(0.7, 0, 0.3, 1)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
            <a href="#" className="logo" style={{ display: 'flex', alignItems: 'center' }}>
              <img 
                src="/AI SEO COMPANY Logotyp.svg" 
                alt="AI SEO COMPANY" 
                style={{ 
                  height: 'clamp(36px, 4vw, 46px)', 
                  width: 'auto', 
                  filter: scrolled ? 'none' : 'brightness(0) invert(1)',
                  transition: 'filter 0.7s ease, height 0.7s ease'
                }} 
              />
            </a>
            
            {/* Header Award Badges */}
            <div className="header-award-badges">
              <span className="badge-pill" style={{ 
                color: scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)',
                background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255,255,255,0.1)',
                borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.7s ease'
              }}>Top Rated Agency</span>
              <span className="badge-pill" style={{ 
                color: scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.85)',
                background: scrolled ? 'rgba(0, 0, 0, 0.05)' : 'rgba(255,255,255,0.1)',
                borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
                transition: 'all 0.7s ease'
              }}>Reviews 4.9★</span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {/* Language Switcher (PL | EN) */}
            <div className="lang-switcher" style={{
              background: scrolled ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255,255,255,0.1)',
              borderColor: scrolled ? 'var(--color-border)' : 'rgba(255,255,255,0.2)',
              color: scrolled ? 'var(--color-text-dark)' : '#FFFFFF',
              transition: 'all 0.7s ease'
            }}>
              <button
                className={`lang-btn ${lang === 'pl' ? 'active' : ''}`}
                style={{ 
                  color: lang === 'pl' ? (scrolled ? 'var(--color-text-dark)' : '#FFFFFF') : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.5)'), 
                  transition: 'color 0.7s ease' 
                }}
                onClick={() => toggleLang('pl')}
                title="Polski"
              >
                PL
              </button>
              <span style={{ opacity: 0.35 }}>|</span>
              <button
                className={`lang-btn ${lang === 'en' ? 'active' : ''}`}
                style={{ 
                  color: lang === 'en' ? (scrolled ? 'var(--color-text-dark)' : '#FFFFFF') : (scrolled ? 'var(--color-text-muted)' : 'rgba(255,255,255,0.5)'), 
                  transition: 'color 0.7s ease' 
                }}
                onClick={() => toggleLang('en')}
                title="English"
              >
                EN
              </button>
            </div>

            {/* Header Hire Us Pill Button */}
            <a href="#kontakt" className="header-hire-btn" style={{
              background: scrolled ? '#000000' : '#FFFFFF',
              color: scrolled ? '#FFFFFF' : '#000000',
              transition: 'all 0.7s ease'
            }}>
              {t.cta}
            </a>

            {/* KOTA Circular Menu Toggle Trigger */}
            <button
              className="kota-menu-trigger"
              style={{
                background: scrolled ? '#000000' : '#FFFFFF',
                color: scrolled ? '#FFFFFF' : '#000000',
                transition: 'all 0.7s ease'
              }}
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
                <a href="#why-us" onClick={closeMenu}>{t.results}</a>
              </li>
              <li style={{ '--delay': '0.2s' }}>
                <a href="#uslugi" onClick={closeMenu}>{t.services}</a>
              </li>
              <li style={{ '--delay': '0.25s' }}>
                <a href="#cennik" onClick={closeMenu}>{t.pricing}</a>
              </li>
              <li style={{ '--delay': '0.3s' }}>
                <a href="#portfolio" onClick={closeMenu}>{t.process}</a>
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
                <span className="footer-label">{lang === 'pl' ? 'Napisz do nas' : 'Email Us'}</span>
                <a href="mailto:f.sliwa@ai-signals-company.pl" className="footer-value">f.sliwa@ai-signals-company.pl</a>
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
