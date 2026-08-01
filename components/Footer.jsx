'use client';

import { useTranslations, useLocale } from 'next-intl';

export default function Footer() {
  const lang = useLocale();
  const navT = useTranslations('nav');
  const t = useTranslations('footer');

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
                <li><a href={`/${lang}/o-nas`}>{lang === 'pl' ? 'O nas (E-E-A-T)' : 'About Us'}</a></li>
                <li><a href={`/${lang}/pozycjonowanie-stron-internetowych`}>{lang === 'pl' ? 'Pozycjonowanie stron' : 'SEO Services'}</a></li>
                <li><a href={`/${lang}/audyt-seo`}>{lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}</a></li>
                <li><a href={`/${lang}/cennik-pozycjonowania`}>{navT('pricing')}</a></li>
                <li><a href={`/${lang}/blog`}>Blog SEO</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Usługi SEO' : 'SEO Services'}</p>
              <ul className="footer-links">
                <li><a href={`/${lang}/pozycjonowanie-stron-internetowych`}>{lang === 'pl' ? 'Pozycjonowanie stron WWW' : 'Website SEO'}</a></li>
                <li><a href={`/${lang}/audyt-seo`}>{lang === 'pl' ? 'Audyt SEO i analiza' : 'SEO Audit & Analysis'}</a></li>
                <li><a href={`/${lang}/projektowanie-stron-internetowych`}>{lang === 'pl' ? 'Projektowanie stron WWW' : 'Web Design'}</a></li>
                <li><a href={`/${lang}/seo-lokalne-warszawa`}>{lang === 'pl' ? 'SEO Lokalne Warszawa' : 'Local SEO Warsaw'}</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Kontakt' : 'Contact'}</p>
              <ul className="footer-links">
                <li><a href="mailto:kontakt@ai-seo-company.pl">kontakt@ai-seo-company.pl</a></li>
                <li><a href="/#kontakt">{lang === 'pl' ? 'Formularz Wyceny' : 'Get Proposal Form'}</a></li>
                <li><a href={`/${lang}/cookies`}>{lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}</a></li>
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
