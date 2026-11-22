'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';
import { hash } from '@/lib/anchors';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import kosm from './KosmetykaSekcji.module.css';

export default function Pricing({ isMainContent = false }) {
  const lang = useLocale();
  const t = useTranslations('pricing');
  const t3 = (pl, en, de) => (lang === 'de' ? de : lang === 'pl' ? pl : en);

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

        <RevealStagger className="pricing-grid">
          {/* Package 1: SEO Standard */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <div className={kosm.cennikKodNagl} aria-hidden="true">
                <span className={kosm.cennikKodNr}>{t3('PAKIET 01', 'PLAN 01', 'PAKET 01')}</span>
                <span className={kosm.cennikKodIndeks}>01 / 03</span>
              </div>
              <div className="pricing-kategoria pricing-kicker" aria-hidden="true">
                <span className="pricing-kicker-gwiazdka">✳</span>
                <span className="pricing-kicker-glowny">{lang === 'pl' ? 'PAKIET SEO' : 'SEO PACKAGE'}</span>
                <span className="pricing-kicker-ukosnik">/</span>
                <span className="pricing-kicker-cel">{lang === 'pl' ? 'DLA STARTU' : 'FOR STARTERS'}</span>
              </div>
              <h3>{t('standardTitle')}</h3>
              <p className="pricing-desc">{t('standardDesc')}</p>
              <div className="pricing-price pricing-price-box">
                <div className="pricing-price-top">
                  <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                  <span className="price-contract-pill">{lang === 'pl' ? 'Umowa miesięczna' : 'Monthly rolling'}</span>
                </div>
                <div className="price-amount">
                  <span className="price-from">{lang === 'pl' ? 'od' : 'from'}</span>
                  {t('standardPrice')}{' '}
                  <span className="price-period">{t('standardPeriod')}</span>
                </div>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li data-ikona="panel">Panel klienta 24/7: dane z Google, zapytania i dziennik prac</li>
                  <li data-ikona="audyt">Kompleksowy audyt SEO i analiza konkurencji</li>
                  <li data-ikona="tech">Podstawowa optymalizacja techniczna strony</li>
                  <li data-ikona="pin">Wizytówka Google (Profil Firmy): optymalizacja, posty 2 razy w miesiącu, odpowiedzi na opinie</li>
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
                  <li data-ikona="pin">Google Business Profile: optimization, two posts a month, review replies</li>
                  <li data-ikona="warstwy">Up to 20 keywords, 2 content pieces and 2 links a month</li>
                  <li data-ikona="ai">AI visibility (ChatGPT, Google): add-on +€115 net/mo</li>
                  <li data-ikona="warstwy">Monthly keyword ranking & traffic reports</li>
                  <li data-ikona="tarcza">Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <div className="pricing-mikro-pasek" aria-hidden="true">
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Start prac: ≤ 48 h' : 'Kick-off: ≤ 48 h'}</span>
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Rezygnacja: 1 mies.' : 'Notice: 1 month'}</span>
            </div>
            <a href={hash('kontakt', lang)} className="btn btn-secondary" data-cta="pricing" data-plan="standard">{t('btnChoose')} <span className="sr-only"> {t('standardTitle')}</span></a>
          </RevealItem>

          {/* Package 2: SEO Premium */}
          <RevealItem className="pricing-card pricing-card--popular">
            <span className="pricing-popular-badge">
              {lang === 'pl' ? 'NAJCZĘŚCIEJ WYBIERANY · SEO + AI' : 'MOST POPULAR · SEO + AI'}
            </span>
            <div className="pricing-header">
              <div className={kosm.cennikKodNagl} aria-hidden="true">
                <span className={kosm.cennikKodNr}>{t3('PAKIET 02', 'PLAN 02', 'PAKET 02')}</span>
                <span className={kosm.cennikKodIndeks}>02 / 03</span>
              </div>
              <div className="pricing-kategoria pricing-kicker" aria-hidden="true">
                <span className="pricing-kicker-gwiazdka">✳</span>
                <span className="pricing-kicker-glowny">{lang === 'pl' ? 'PAKIET SEO' : 'SEO PACKAGE'}</span>
                <span className="pricing-kicker-ukosnik">/</span>
                <span className="pricing-kicker-cel">{lang === 'pl' ? 'DLA WZROSTU' : 'FOR GROWTH'}</span>
              </div>
              <h3>{t('premiumTitle')}</h3>
              <p className="pricing-desc">{t('premiumDesc')}</p>
              <div className="pricing-price pricing-price-box">
                <div className="pricing-price-top">
                  <div className="price-label">{lang === 'pl' ? 'Subskrypcja miesięczna' : 'Monthly Subscription'}</div>
                  <span className="price-contract-pill">{lang === 'pl' ? 'Umowa miesięczna' : 'Monthly rolling'}</span>
                </div>
                <div className="price-amount">
                  {t('premiumPrice')}{' '}
                  <span className="price-period">{t('premiumPeriod')}</span>
                </div>
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
                  <li data-ikona="ai">Widoczność w AI: 30 pytań co tydzień w ChatGPT, Perplexity, Gemini i przeglądzie AI Google</li>
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
                  <li data-ikona="ai">AI visibility: 30 questions weekly in ChatGPT, Perplexity, Gemini and Google AI Overviews</li>
                  <li data-ikona="tarcza">Cancel anytime flexible policy</li>
                </>
              )}
            </ul>
            <div className="pricing-mikro-pasek" aria-hidden="true">
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Start prac: ≤ 48 h' : 'Kick-off: ≤ 48 h'}</span>
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Silniki AI: 4 modele' : 'AI engines: 4 models'}</span>
            </div>
            <a href={hash('kontakt', lang)} className="btn btn-dark-fill" data-cta="pricing" data-plan="premium">{t('btnChoose')} <span className="sr-only"> {t('premiumTitle')}</span></a>
          </RevealItem>

          {/* Package 3 (Featured Booster Pack) */}
          <RevealItem className="pricing-card featured">
            <span className="pricing-featured-badge">{lang === 'pl' ? 'STRONA WWW W CENIE' : 'WEBSITE INCLUDED'}</span>
            <div className="pricing-header">
              <div className={kosm.cennikKodNagl} aria-hidden="true">
                <span className={kosm.cennikKodNr}>{t3('PAKIET 03', 'PLAN 03', 'PAKET 03')}</span>
                <span className={kosm.cennikKodIndeks}>03 / 03</span>
              </div>
              <div className="pricing-kategoria pricing-kicker" aria-hidden="true">
                <span className="pricing-kicker-gwiazdka">✳</span>
                <span className="pricing-kicker-glowny">{lang === 'pl' ? 'PAKIET WWW + SEO' : 'WEB + SEO PACKAGE'}</span>
                <span className="pricing-kicker-ukosnik">/</span>
                <span className="pricing-kicker-cel">{lang === 'pl' ? 'DLA WZROSTU' : 'FOR GROWTH'}</span>
              </div>
              <h3>{t('boosterTitle')}</h3>
              <p className="pricing-desc">{t('boosterDesc')}</p>
              <div className="pricing-price pricing-price-box pricing-price-box--featured">
                <div className="pricing-price-top">
                  <div className="price-label price-label--booster">{lang === 'pl' ? 'Umowa min. 3 miesiące (Standard i Premium: umowa miesięczna)' : 'Min. 3-month contract (Standard and Premium: monthly)'}</div>
                </div>
                <div className="price-amount">
                  {t('boosterPrice')}{' '}
                  <span className="price-period">{t('boosterPeriod')}</span>
                </div>
              </div>
            </div>
            <div className="pricing-www-callout">
              <div className="pricing-www-tytul">
                <span className="pricing-www-kropka" aria-hidden="true" />
                <span>{t('boosterBadge')}</span>
              </div>
              <div className="pricing-www-tagi" aria-hidden="true">
                <span>{lang === 'pl' ? 'UX/UI na miarę' : 'Custom UX/UI'}</span>
                <span>{lang === 'pl' ? 'RWD / Core Web Vitals' : 'RWD / Core Web Vitals'}</span>
                <span>{lang === 'pl' ? 'SSL + serwer' : 'SSL + hosting'}</span>
              </div>
            </div>
            <ul className="pricing-features">
              {lang === 'pl' ? (
                <>
                  <li data-ikona="pedzel">Indywidualny projekt graficzny UX/UI (RWD)</li>
                  <li data-ikona="panel">Panel klienta 24/7 od pierwszego dnia</li>
                  <li data-ikona="audyt">Pełne pozycjonowanie SEO i audyt konkurencji</li>
                  <li data-ikona="ptaszek">Optymalizacja i publikacje w Wizytówce Google</li>
                  <li data-ikona="wykres">Konfiguracja GA4 i Google Search Console od startu</li>
                  <li data-ikona="tech">Certyfikat SSL, serwer i opieka techniczna</li>
                  <li data-ikona="nieskonczonosc">Brak jakichkolwiek dodatkowych ukrytych opłat</li>
                </>
              ) : (
                <>
                  <li data-ikona="www">Bespoke responsive UX/UI website design</li>
                  <li data-ikona="panel">24/7 client portal from day one</li>
                  <li data-ikona="tech">Complete technical & content SEO suite</li>
                  <li data-ikona="pin">Google Business Profile optimization and monthly posts</li>
                  <li data-ikona="wykres">GA4 & Google Search Console setup from day one</li>
                  <li data-ikona="tarcza">SSL certificate, hosting & ongoing maintenance</li>
                  <li data-ikona="nieskonczonosc">No hidden setup or maintenance fees</li>
                </>
              )}
            </ul>
            <div className="pricing-mikro-pasek" aria-hidden="true">
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Makieta WWW: 7 dni' : 'Web mockup: 7 days'}</span>
              <span className="pricing-mikro-el">{lang === 'pl' ? 'Gwarancja ceny: 0 zł dopłat' : 'Price lock: €0 extra fees'}</span>
            </div>
            <a href={hash('kontakt', lang)} className="btn btn-primary btn-glow" data-cta="pricing" data-plan="booster">{t('btnChoose')} <span className="sr-only"> {t('boosterTitle')}</span></a>
          </RevealItem>
        </RevealStagger>

        <Reveal className="pricing-note">
          {t('note')}
          {!isMainContent && (
            <>
              {' '}
              <Link href="/cennik-pozycjonowania" className="pricing-note-link" data-cta="pricing_full_page">
                {lang === 'pl'
                  ? 'Pełny cennik pozycjonowania stron i porównanie pakietów'
                  : 'Full SEO pricing and package comparison'}
              </Link>
              <span aria-hidden="true"> →</span>
            </>
          )}
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
