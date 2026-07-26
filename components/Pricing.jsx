'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Pricing() {
  const { lang } = useLanguage();
  const t = translations[lang].pricing;

  return (
    <section className="pricing" id="cennik">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag">{t.tag}</div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </Reveal>

        <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Package 1 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>{t.standardTitle}</h3>
              <p className="pricing-desc">{t.standardDesc}</p>
              <div className="pricing-price">
                <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                <div className="price-amount">{t.standardPrice} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t.standardPeriod}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li>Kompleksowy audyt SEO i analiza konkurencji</li>
                  <li>Podstawowa optymalizacja techniczna strony</li>
                  <li>Optymalizacja Wizytówki Google (Profil Firmy)</li>
                  <li>Comiesięczny raport pozycji i ruchu</li>
                  <li>Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li>Comprehensive SEO audit & competitor analysis</li>
                  <li>Core technical website optimization</li>
                  <li>Google Business Profile optimization</li>
                  <li>Monthly keyword ranking & traffic reports</li>
                  <li>Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href="#kontakt" className="btn btn-secondary">{t.btnChoose}</a>
          </RevealItem>

          {/* Package 2 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>{t.premiumTitle}</h3>
              <p className="pricing-desc">{t.premiumDesc}</p>
              <div className="pricing-price">
                <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                <div className="price-amount">{t.premiumPrice} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t.premiumPeriod}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li>Pełne pozycjonowanie techniczne i treściowe</li>
                  <li>Wzmocniony profil mobilny (wzrost CTR z telefonów)</li>
                  <li>Prowadzenie Wizytówki Google (walka o TOP 3 Map)</li>
                  <li>Strategia link buildingu i rozbudowa artykułów</li>
                  <li>Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li>Full technical & content SEO positioning</li>
                  <li>Enhanced mobile UX (mobile CTR optimization)</li>
                  <li>Google Maps TOP 3 ranking management</li>
                  <li>High-authority link building & expert content</li>
                  <li>Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href="#kontakt" className="btn btn-secondary">{t.btnChoose}</a>
          </RevealItem>

          {/* Package 3 (Featured Booster Pack) */}
          <RevealItem className="pricing-card featured">
            <div className="pricing-header">
              <h3>{t.boosterTitle}</h3>
              <p className="pricing-desc">{t.boosterDesc}</p>
              <div className="pricing-price">
                <div className="price-label" style={{ color: 'var(--color-cta)', fontWeight: '700' }}>{lang === 'pl' ? 'Umowa min. 3 miesiące' : 'Min. 3-month contract'}</div>
                <div className="price-amount">{t.boosterPrice} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t.boosterPeriod}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li><strong style={{ color: 'var(--color-growth)' }}>{t.boosterBadge}</strong></li>
              {lang === 'pl' ? (
                <>
                  <li>Indywidualny projekt graficzny UX/UI (RWD)</li>
                  <li>Pełne pozycjonowanie SEO i audyt konkurencji</li>
                  <li>Optymalizacja i publikacje w Wizytówce Google</li>
                  <li>Certyfikat SSL, serwer i opieka techniczna</li>
                  <li>Brak jakichkolwiek dodatkowych ukrytych opłat</li>
                </>
              ) : (
                <>
                  <li>Bespoke responsive UX/UI website design</li>
                  <li>Complete technical & content SEO suite</li>
                  <li>Google Maps optimization & weekly updates</li>
                  <li>SSL certificate, hosting & ongoing maintenance</li>
                  <li>No hidden setup or maintenance fees</li>
                </>
              )}
            </ul>
            <a href="#kontakt" className="btn btn-primary">{lang === 'pl' ? 'Zamów Booster Pack' : 'Get Booster Pack'}</a>
          </RevealItem>
        </RevealStagger>

        <Reveal className="pricing-note">
          {t.note}
        </Reveal>
      </div>
    </section>
  );
}
