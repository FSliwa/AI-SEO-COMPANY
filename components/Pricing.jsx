'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';
import { hash } from '@/lib/anchors';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';

export default function Pricing({ isMainContent = false }) {
  const lang = useLocale();
  const t = useTranslations('pricing');

  const Wrapper = isMainContent ? 'section' : 'aside';
  const wrapperProps = isMainContent ? {} : { 'data-nosnippet': 'true', 'aria-label': 'Cennik' };

  return (
    <Wrapper className="pricing" id={sectionId('cennik', lang)} {...wrapperProps}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
          <div style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(29, 29, 31, 0.05)', color: '#1D1D1F', padding: '0.5rem 1.2rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600 }}>
            {lang === 'pl' ? '✓ SEO Lokalne & Mapy Google w cenie każdego pakietu' : '✓ Local SEO & Google Maps included in all plans'}
          </div>
        </Reveal>

        <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Package 1 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>{t('standardTitle')}</h3>
              <p className="pricing-desc">{t('standardDesc')}</p>
              <div className="pricing-price">
                <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                <div className="price-amount"><span className="price-from">{lang === 'pl' ? 'od' : 'from'}</span>{t('standardPrice')} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t('standardPeriod')}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li>Panel klienta 24/7: dane z Google, zapytania i dziennik prac</li>
                  <li>Kompleksowy audyt SEO i analiza konkurencji</li>
                  <li>Podstawowa optymalizacja techniczna strony</li>
                  <li>Optymalizacja Wizytówki Google (Profil Firmy)</li>
                  <li>Do 20 fraz, 2 treści i 2 linki miesięcznie</li>
                  <li>Widoczność w AI (ChatGPT, Google): opcja +490 zł netto/mies.</li>
                  <li>Comiesięczny raport pozycji i ruchu</li>
                  <li>Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li>24/7 client portal: Google data, enquiries and a work log</li>
                  <li>Comprehensive SEO audit & competitor analysis</li>
                  <li>Core technical website optimization</li>
                  <li>Google Business Profile optimization</li>
                  <li>Up to 20 keywords, 2 content pieces and 2 links a month</li>
                  <li>AI visibility (ChatGPT, Google): add-on +€115 net/mo</li>
                  <li>Monthly keyword ranking & traffic reports</li>
                  <li>Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-secondary" data-cta="pricing" data-plan="standard">{t('btnChoose')} <span className="sr-only"> {t('standardTitle')}</span></a>
          </RevealItem>

          {/* Package 2 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>{t('premiumTitle')}</h3>
              <p className="pricing-desc">{t('premiumDesc')}</p>
              <div className="pricing-price">
                <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                <div className="price-amount"><span className="price-from">{lang === 'pl' ? 'od' : 'from'}</span>{t('premiumPrice')} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t('premiumPeriod')}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li>Panel klienta 24/7: dane z Google, zapytania i dziennik prac</li>
                  <li>Pełne pozycjonowanie techniczne i treściowe</li>
                  <li>Wzmocniony profil mobilny (wzrost CTR z telefonów)</li>
                  <li>Prowadzenie Wizytówki Google (walka o TOP 3 Map)</li>
                  <li>Strategia link buildingu i rozbudowa artykułów</li>
                  <li>Do 50 fraz, 4 treści i 4 linki miesięcznie</li>
                  <li>Widoczność w AI: 30 pytań co tydzień w ChatGPT i Google</li>
                  <li>Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li>24/7 client portal: Google data, enquiries and a work log</li>
                  <li>Full technical & content SEO positioning</li>
                  <li>Enhanced mobile UX (mobile CTR optimization)</li>
                  <li>Google Maps TOP 3 ranking management</li>
                  <li>High-authority link building & expert content</li>
                  <li>Up to 50 keywords, 4 content pieces and 4 links a month</li>
                  <li>AI visibility: 30 questions weekly in ChatGPT and Google</li>
                  <li>Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-secondary" data-cta="pricing" data-plan="premium">{t('btnChoose')} <span className="sr-only"> {t('premiumTitle')}</span></a>
          </RevealItem>

          {/* Package 3 (Featured Booster Pack) */}
          <RevealItem className="pricing-card featured">
            <span className="pricing-featured-badge">{lang === 'pl' ? 'NAJPOPULARNIEJSZY PAKIET' : 'MOST POPULAR PACK'}</span>
            <div className="pricing-header">
              <h3>{t('boosterTitle')}</h3>
              <p className="pricing-desc">{t('boosterDesc')}</p>
              <div className="pricing-price">
                <div className="price-label" style={{ color: 'var(--color-cta)', fontWeight: '700' }}>{lang === 'pl' ? 'Umowa min. 3 miesiące (Standard i Premium: umowa miesięczna)' : 'Min. 3-month contract (Standard and Premium: monthly)'}</div>
                <div className="price-amount"><span className="price-from">{lang === 'pl' ? 'od' : 'from'}</span>{t('boosterPrice')} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t('boosterPeriod')}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li><span style={{ fontWeight: 'bold', color: 'var(--color-growth)' }}>{t('boosterBadge')}</span></li>
              {lang === 'pl' ? (
                <>
                  <li>Indywidualny projekt graficzny UX/UI (RWD)</li>
                  <li>Panel klienta 24/7 od pierwszego dnia</li>
                  <li>Pełne pozycjonowanie SEO i audyt konkurencji</li>
                  <li>Optymalizacja i publikacje w Wizytówce Google</li>
                  <li>Certyfikat SSL, serwer i opieka techniczna</li>
                  <li>Brak jakichkolwiek dodatkowych ukrytych opłat</li>
                </>
              ) : (
                <>
                  <li>Bespoke responsive UX/UI website design</li>
                  <li>24/7 client portal from day one</li>
                  <li>Complete technical & content SEO suite</li>
                  <li>Google Maps optimization & weekly updates</li>
                  <li>SSL certificate, hosting & ongoing maintenance</li>
                  <li>No hidden setup or maintenance fees</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-primary btn-glow" data-cta="pricing" data-plan="booster" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: '600' }}>{t('btnChoose')} <span className="sr-only"> {t('boosterTitle')}</span></a>
          </RevealItem>
        </RevealStagger>

        <Reveal className="pricing-note">
          {t('note')}
        </Reveal>
        {/* Panel klienta to wyroznik oferty (analiza konkurencji 25.10.2026): 4 z 17 agencji maja panel, zadna nie pokazuje go bez logowania. */}
        <Reveal className="pricing-panel-links">
          <Link href="/panel-klienta" data-cta="pricing_panel_page">{lang === 'pl' ? 'Co widzisz w panelu klienta' : 'What you see in the client portal'}</Link>
          <span aria-hidden="true"> · </span>
          <a href={PANEL_DEMO_URL} data-cta="pricing_panel_demo">{lang === 'pl' ? 'Otwórz demo bez logowania' : 'Open the demo, no login'} →</a>
        </Reveal>
      </div>
    </Wrapper>
  );
}
