'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

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
              <Link href="/" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
                AI SEO COMPANY
              </Link>
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: '#94A3B8' }}>
                {t('desc')}
              </p>
              <div style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '1rem', lineHeight: '1.5' }}>
                <p style={{ margin: 0 }}><strong>AI SEO Company</strong> to marka należąca do:</p>
                {/* Art. 300(5) KSH: a prosta spółka akcyjna must state its firm,
                    registered office and address, the registry court and KRS
                    number, NIP, and the amount of share capital (kapitał akcyjny). */}
                <p style={{ margin: 0 }}>AI SIGNALS COMPANY Prosta Spółka Akcyjna</p>
                <p style={{ margin: 0 }}>ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa</p>
                <p style={{ margin: 0 }}>
                  {lang === 'pl' ? 'Sąd Rejonowy dla m.st. Warszawy w Warszawie' : 'District Court for the Capital City of Warsaw'}
                </p>
                <p style={{ margin: 0 }}>KRS: 0001239983</p>
                <p style={{ margin: 0 }}>NIP: 5253090237</p>
                <p style={{ margin: 0 }}>REGON: 544761611</p>
              </div>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Nawigacja' : 'Navigation'}</p>
              <ul className="footer-links">
                <li><Link href="/o-nas">{lang === 'pl' ? 'O nas (E-E-A-T)' : 'About Us'}</Link></li>
                <li><Link href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron' : 'SEO Services'}</Link></li>
                <li><Link href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}</Link></li>
                <li><Link href="/cennik-pozycjonowania">{navT('pricing')}</Link></li>
                <li><Link href="/blog">{lang === 'en' ? 'SEO Blog' : 'Blog SEO'}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Usługi SEO' : 'SEO Services'}</p>
              <ul className="footer-links">
                <li><Link href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron WWW' : 'Website SEO'}</Link></li>
                <li><Link href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO i analiza' : 'SEO Audit & Analysis'}</Link></li>
                <li><Link href="/projektowanie-stron-internetowych">{lang === 'pl' ? 'Projektowanie stron WWW' : 'Web Design'}</Link></li>
                <li><Link href="/seo-lokalne-warszawa">{lang === 'pl' ? 'SEO Lokalne Warszawa' : 'Local SEO Warsaw'}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Kontakt' : 'Contact'}</p>
              <ul className="footer-links">
                <li><a href="tel:+48518815055">518 815 055</a></li>
                <li><a href="mailto:kontakt@ai-seo-company.pl">kontakt@ai-seo-company.pl</a></li>
                <li><Link href="/#kontakt">{lang === 'pl' ? 'Formularz Wyceny' : 'Get Proposal Form'}</Link></li>
                <li><Link href="/cookies">{lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}</Link></li>
                <li><Link href="/regulamin">{lang === 'pl' ? 'Regulamin' : 'Terms of Service'}</Link></li>
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
