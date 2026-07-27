'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal } from './ScrollReveal';

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* KOTA Sticky / Floating Action Pill Button (Bottom Right) */}
      <a href="#kontakt" className="kota-floating-cta">
        {lang === 'pl' ? 'Wyceń projekt →' : 'Start your project →'}
      </a>

      <footer className="footer">
        <div className="container">
          <Reveal>
            <div className="footer-grid">
              <div>
                <a href="#" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem', display: 'inline-block' }}>
                  AI SEO COMPANY
                </a>
                <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: '#94A3B8', lineHeight: 1.6 }}>
                  {t.desc}
                </p>
              </div>
              <div className="footer-col">
                <h4>{lang === 'pl' ? 'Nawigacja' : 'Navigation'}</h4>
                <ul className="footer-links">
                  <li><a href="#why-us">{nav.results}</a></li>
                  <li><a href="#uslugi">{nav.services}</a></li>
                  <li><a href="#portfolio">{nav.process}</a></li>
                  <li><a href="#cennik">{nav.pricing}</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>{lang === 'pl' ? 'Usługi' : 'Services'}</h4>
                <ul className="footer-links">
                  <li><a href="#cennik">{lang === 'pl' ? 'Strona WWW za 0 zł' : 'Free Website Package'}</a></li>
                  <li><a href="#cennik">SEO Standard</a></li>
                  <li><a href="#cennik">SEO Premium</a></li>
                  <li><a href="#cennik">Booster Pack</a></li>
                </ul>
              </div>
              <div className="footer-col">
                <h4>{lang === 'pl' ? 'Kontakt' : 'Contact'}</h4>
                <ul className="footer-links">
                  <li><a href="mailto:f.sliwa@ai-signals-company.pl">f.sliwa@ai-signals-company.pl</a></li>
                  <li><a href="#kontakt">{lang === 'pl' ? 'Formularz Wyceny' : 'Get Proposal Form'}</a></li>
                  <li><a href="#">Warszawa, Polska</a></li>
                </ul>
              </div>
            </div>

            <div className="footer-bottom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
              <p style={{ margin: 0 }}>{t.rights}</p>
              <button 
                onClick={scrollToTop}
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#FFFFFF',
                  padding: '0.5rem 1.1rem',
                  borderRadius: '9999px',
                  cursor: 'pointer',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
                aria-label="Scroll to top"
              >
                {lang === 'pl' ? 'Wróć na górę' : 'Back to top'} ↑
              </button>
            </div>
          </Reveal>
        </div>
      </footer>
    </>
  );
}
