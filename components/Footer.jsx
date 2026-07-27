'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const t = translations[lang].footer;
  const nav = translations[lang].nav;

  return (
    <>
      {/* KOTA Sticky / Floating Action Pill Button (Bottom Right) */}
      <a href="#kontakt" className="kota-floating-cta">
        {lang === 'pl' ? 'Wyceń projekt →' : 'Start your project →'}
      </a>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
                AI SEO COMPANY
              </a>
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: '#94A3B8' }}>
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
                <li><a href="/cookies">{lang === 'pl' ? 'Polityka Prywatności i Cookies' : 'Privacy & Cookie Policy'}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t.rights}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
