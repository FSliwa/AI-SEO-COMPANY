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
    <Wrapper className="pricing" id={sectionId('cennik', lang)} data-petla="" {...wrapperProps}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
          <div style={{ marginTop: '1rem', display: 'inline-block', background: 'rgba(29, 29, 31, 0.05)', color: 'var(--w-tusz)', padding: '0.5rem 1.2rem', borderRadius: '999px', fontSize: '0.9rem', fontWeight: 600 }}>
            {lang === 'pl' ? '✓ SEO Lokalne & Mapy Google w cenie każdego pakietu' : '✓ Local SEO & Google Maps included in all plans'}
          </div>
        </Reveal>

        <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Package 1 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-kategoria" aria-hidden="true">✳ SEO</div>
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
                  <li data-ikona="panel">Panel klienta 24/7: dane z Google, zapytania i dziennik prac</li>
                  <li data-ikona="audyt">Kompleksowy audyt SEO i analiza konkurencji</li>
                  <li data-ikona="tech">Podstawowa optymalizacja techniczna strony</li>
                  <li data-ikona="pin">Optymalizacja Wizytówki Google (Profil Firmy)</li>
                  <li data-ikona="warstwy">Do 20 fraz, 2 treści i 2 linki miesięcznie</li>
                  <li data-ikona="ai">Widoczność w AI (ChatGPT, Google): opcja +490 zł netto/mies.</li>
                  <li data-ikona="wykres">Comiesięczny raport pozycji i ruchu</li>
                  <li data-ikona="tarcza">Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li data-ikona="panel">24/7 client portal: Google data, enquiries and a work log</li>
                  <li data-ikona="audyt">Comprehensive SEO audit & competitor analysis</li>
                  <li data-ikona="tech">Core technical website optimization</li>
                  <li data-ikona="pin">Google Business Profile optimization</li>
                  <li data-ikona="warstwy">Up to 20 keywords, 2 content pieces and 2 links a month</li>
                  <li data-ikona="ai">AI visibility (ChatGPT, Google): add-on +€115 net/mo</li>
                  <li data-ikona="warstwy">Monthly keyword ranking & traffic reports</li>
                  <li data-ikona="tarcza">Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-secondary" data-cta="pricing" data-plan="standard">{t('btnChoose')} <span className="sr-only"> {t('standardTitle')}</span></a>
          </RevealItem>

          {/* Package 2 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <div className="pricing-kategoria" aria-hidden="true">✳ SEO</div>
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
                  <li data-ikona="panel">Panel klienta 24/7: dane z Google, zapytania i dziennik prac</li>
                  <li data-ikona="tech">Pełne pozycjonowanie techniczne i treściowe</li>
                  <li data-ikona="telefon">Wzmocniony profil mobilny (wzrost CTR z telefonów)</li>
                  <li data-ikona="pin">Prowadzenie Wizytówki Google (walka o TOP 3 Map)</li>
                  <li data-ikona="link">Strategia link buildingu i rozbudowa artykułów</li>
                  <li data-ikona="warstwy">Do 50 fraz, 4 treści i 4 linki miesięcznie</li>
                  <li data-ikona="ai">Widoczność w AI: 30 pytań co tydzień w ChatGPT i Google</li>
                  <li data-ikona="tarcza">Możliwość rezygnacji w każdej chwili</li>
                </>
              ) : (
                <>
                  <li data-ikona="panel">24/7 client portal: Google data, enquiries and a work log</li>
                  <li data-ikona="tech">Full technical & content SEO positioning</li>
                  <li data-ikona="telefon">Enhanced mobile UX (mobile CTR optimization)</li>
                  <li data-ikona="pin">Google Maps TOP 3 ranking management</li>
                  <li data-ikona="link">High-authority link building & expert content</li>
                  <li data-ikona="warstwy">Up to 50 keywords, 4 content pieces and 4 links a month</li>
                  <li data-ikona="ai">AI visibility: 30 questions weekly in ChatGPT and Google</li>
                  <li data-ikona="tarcza">Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-secondary" data-cta="pricing" data-plan="premium">{t('btnChoose')} <span className="sr-only"> {t('premiumTitle')}</span></a>
          </RevealItem>

          {/* Package 3 (Featured Booster Pack) */}
          <RevealItem className="pricing-card featured">
            <span className="pricing-featured-badge">{lang === 'pl' ? 'STRONA WWW W CENIE' : 'WEBSITE INCLUDED'}</span>
            <div className="pricing-header">
              <div className="pricing-kategoria" aria-hidden="true">✳ WWW + SEO</div>
              <h3>{t('boosterTitle')}</h3>
              <p className="pricing-desc">{t('boosterDesc')}</p>
              <div className="pricing-price">
                <div className="price-label" style={{ color: 'var(--color-cta)' }}>{lang === 'pl' ? 'Umowa min. 3 miesiące (Standard i Premium: umowa miesięczna)' : 'Min. 3-month contract (Standard and Premium: monthly)'}</div>
                <div className="price-amount"><span className="price-from">{lang === 'pl' ? 'od' : 'from'}</span>{t('boosterPrice')} <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>{t('boosterPeriod')}</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li data-ikona="www"><span style={{ fontWeight: 600, color: 'var(--color-growth)' }}>{t('boosterBadge')}</span></li>
              {lang === 'pl' ? (
                <>
                  <li data-ikona="pedzel">Indywidualny projekt graficzny UX/UI (RWD)</li>
                  <li data-ikona="panel">Panel klienta 24/7 od pierwszego dnia</li>
                  <li data-ikona="audyt">Pełne pozycjonowanie SEO i audyt konkurencji</li>
                  <li data-ikona="ptaszek">Optymalizacja i publikacje w Wizytówce Google</li>
                  <li data-ikona="tech">Certyfikat SSL, serwer i opieka techniczna</li>
                  <li data-ikona="nieskonczonosc">Brak jakichkolwiek dodatkowych ukrytych opłat</li>
                </>
              ) : (
                <>
                  <li data-ikona="www">Bespoke responsive UX/UI website design</li>
                  <li data-ikona="panel">24/7 client portal from day one</li>
                  <li data-ikona="tech">Complete technical & content SEO suite</li>
                  <li data-ikona="pin">Google Maps optimization & weekly updates</li>
                  <li data-ikona="tarcza">SSL certificate, hosting & ongoing maintenance</li>
                  <li data-ikona="nieskonczonosc">No hidden setup or maintenance fees</li>
                </>
              )}
            </ul>
            <a href={hash('kontakt', lang)} className="btn btn-primary btn-glow" data-cta="pricing" data-plan="booster">{t('btnChoose')} <span className="sr-only"> {t('boosterTitle')}</span></a>
          </RevealItem>
        </RevealStagger>

        <Reveal className="pricing-note">
          {t('note')}
        </Reveal>
        {/* Panel klienta to wyroznik oferty (analiza konkurencji 25.10.2026): 4 z 17 agencji maja panel, zadna nie pokazuje go bez logowania. */}
        <Reveal className="pricing-panel-links">
          <Link href="/panel-klienta" data-cta="pricing_panel_page">{lang === 'pl' ? 'Co widzisz w panelu klienta' : 'What you see in the client portal'}</Link>
          <span aria-hidden="true"> · </span>
          <a href={PANEL_DEMO_URL} data-cta="pricing_panel_demo">{lang === 'pl' ? 'Otwórz demo bez logowania' : 'Open the demo, no login'} →</a>
        </Reveal>
      </div>
    </Wrapper>
  );
}
