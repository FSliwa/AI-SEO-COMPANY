'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const lang = useLocale();
  const t = useTranslations('footer');
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
              <a href="/" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
                AI SEO COMPANY
              </a>
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: '#94A3B8' }}>
                {t('desc')}
              </p>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Nawigacja' : 'Navigation'}</p>
              <ul className="footer-links">
                <li><a href="/o-nas">{lang === 'pl' ? 'O nas (E-E-A-T)' : 'About Us'}</a></li>
                <li><a href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron' : 'SEO Services'}</a></li>
                <li><a href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}</a></li>
                <li><a href="/cennik-pozycjonowania">{nav.pricing}</a></li>
                <li><a href="/blog">Blog SEO</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Usługi SEO' : 'SEO Services'}</p>
              <ul className="footer-links">
                <li><a href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron WWW' : 'Website SEO'}</a></li>
                <li><a href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO i analiza' : 'SEO Audit & Analysis'}</a></li>
                <li><a href="/projektowanie-stron-internetowych">{lang === 'pl' ? 'Projektowanie stron WWW' : 'Web Design'}</a></li>
                <li><a href="/seo-lokalne-warszawa">{lang === 'pl' ? 'SEO Lokalne Warszawa' : 'Local SEO Warsaw'}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Kontakt' : 'Contact'}</p>
              <ul className="footer-links">
                <li><a href="mailto:kontakt@ai-seo-company.pl">kontakt@ai-seo-company.pl</a></li>
                <li><a href="/#kontakt">{lang === 'pl' ? 'Formularz Wyceny' : 'Get Proposal Form'}</a></li>
                <li><a href="/cookies">{lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('rights')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
