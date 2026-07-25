'use client';

import { useState, useEffect } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`} id="header">
      <div className="container nav-container">
        <a href="#" className="logo">
          AI SEO COMPANY
        </a>
        <nav>
          <ul className={`nav-links ${mobileOpen ? 'mobile-active' : ''}`} style={mobileOpen ? {
            display: 'flex',
            flexDirection: 'column',
            position: 'absolute',
            top: '100%',
            left: 0,
            width: '100%',
            background: '#FFFFFF',
            padding: '1.5rem',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          } : {}}>
            <li><a href="#uslugi" className="nav-link" onClick={() => setMobileOpen(false)}>Usługi</a></li>
            <li><a href="#portfolio" className="nav-link" onClick={() => setMobileOpen(false)}>Portfolio</a></li>
            <li><a href="#cennik" className="nav-link" onClick={() => setMobileOpen(false)}>Cennik</a></li>
            <li><a href="#proces" className="nav-link" onClick={() => setMobileOpen(false)}>Proces</a></li>
            <li><a href="#wyniki" className="nav-link" onClick={() => setMobileOpen(false)}>Wyniki</a></li>
            <li><a href="#blog" className="nav-link" onClick={() => setMobileOpen(false)}>Blog</a></li>
          </ul>
        </nav>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <a href="#kontakt" className="btn btn-primary">Wyceń projekt</a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Menu"
          >
            ☰
          </button>
        </div>
      </div>
    </header>
  );
}
