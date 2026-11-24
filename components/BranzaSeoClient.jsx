'use client';

// Pakiet P3 - Fala 3 (24.11.2026): Wspolny komponent kliencki PL i EN dla 4 glebokich stron branzowych
// (/seo-dla-firm-budowlanych, /seo-dla-firm-produkcyjnych-b2b, /seo-dla-restauracji-i-gastronomii,
// /seo-dla-firm-szkoleniowych-i-iso). Header, Breadcrumbs i Footer renderuje page.js (wzorzec MazowszeClient.jsx).

import { Fragment } from 'react';
import { useLocale } from 'next-intl';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BIURO } from '@/lib/firma';
import { BRANZE_SEO } from '@/lib/branzeSeo';

const kontener = { maxWidth: '880px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.3vw, 2.2rem)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'var(--w-tusz)', margin: '0 0 1.15rem', scrollMarginTop: '110px' };
const h3Styl = { fontSize: 'clamp(1.18rem, 2.2vw, 1.38rem)', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--w-tusz)', margin: '0 0 0.6rem' };
const akapit = { fontSize: '1.06rem', lineHeight: 1.7, color: 'var(--w-tusz-2)', margin: '0 0 1.1rem' };
const linkStyl = { color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', boxShadow: 'none', padding: 'clamp(1.5rem, 4vw, 2.5rem)', minWidth: 0, maxWidth: '100%' };

function krotkiZakresDat(odIso, doIso, en) {
  const [, m1, d1] = odIso.split('-');
  const [, m2, d2] = doIso.split('-');
  return en ? `${m1}/${d1}-${m2}/${d2}` : `${d1}.${m1}-${d2}.${m2}`;
}

function SeriaTygodniowaGsc({ seria, en, klientNazwa }) {
  const maxKlik = Math.max(...seria.map((p) => p[2]), 1);
  const fmt = (n) => (en ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',') : String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' '));

  return (
    <div
      role="region"
      aria-label={en ? `Weekly Google Search Console series for ${klientNazwa}` : `Tygodniowa seria Google Search Console dla ${klientNazwa}`}
      tabIndex={0}
      style={{
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
        maxWidth: '100%',
        margin: '0 0 1.5rem',
        padding: '1.1rem 1rem',
        borderRadius: '16px',
        background: 'var(--w-papier-2)',
        border: '1px solid var(--w-linia)',
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${seria.length}, minmax(56px, 1fr))`,
          gap: '0.5rem',
          alignItems: 'end',
          minWidth: `${seria.length * 60}px`,
        }}
      >
        {seria.map(([od, doDaty, klik, wysw], idx) => {
          const wysSlupka = Math.max(Math.round((klik / maxKlik) * 92), klik > 0 ? 10 : 4);
          const ostatni = idx === seria.length - 1;
          return (
            <div key={od} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.3rem' }}>
              <span
                style={{
                  fontFamily: 'var(--w-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 500,
                  color: ostatni ? 'var(--w-pomarancz-tekst)' : 'var(--w-tusz)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {klik}
              </span>
              <div style={{ height: '96px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: '100%',
                    maxWidth: '30px',
                    height: `${wysSlupka}px`,
                    borderRadius: '6px 6px 3px 3px',
                    background: ostatni ? 'var(--w-pomarancz)' : 'rgba(29, 29, 31, 0.22)',
                  }}
                />
              </div>
              <span
                style={{
                  fontFamily: 'var(--w-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--w-tusz-2)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.2,
                }}
              >
                {en ? `W${idx + 1}` : `T${idx + 1}`}
              </span>
              <span
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--w-tusz-2)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                }}
                title={`${od} - ${doDaty}: ${fmt(wysw)} ${en ? 'impressions' : 'wyświetleń'}`}
              >
                {krotkiZakresDat(od, doDaty, en)}
              </span>
              <span
                style={{
                  fontSize: '0.65rem',
                  color: 'var(--w-tusz-2)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                }}
              >
                {fmt(wysw)} {en ? 'impr.' : 'wyśw.'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function BranzaSeoClient({ kluczBranzy }) {
  const lang = useLocale();
  const en = lang === 'en';
  const kontakt = hash('kontakt', lang);
  const d = BRANZE_SEO[kluczBranzy];
  if (!d) return null;

  const t = en ? d.en : d.pl;
  const narzedziaAktywne = d.powiazaneNarz.filter((n) => hrefJesliOpublikowana(n.href));
  const uslugiAktywne = d.powiazaneUslugi.filter((u) => hrefJesliOpublikowana(u.href));
  const hrefCennik = hrefJesliOpublikowana('/cennik-pozycjonowania');
  const hrefKalkulator = hrefJesliOpublikowana('/narzedzia/kalkulator-strat-seo');

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '2rem' }}>
        <div className="container" style={kontener}>
          <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.12em' }}>
            <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {t.tag}
          </div>

          <h1 style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.35rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 1.15rem', color: 'var(--w-tusz)' }}>
            {t.h1}
          </h1>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'baseline',
              gap: '0.55rem',
              padding: '0.55rem 0.95rem',
              marginBottom: '1.35rem',
              borderRadius: '12px',
              background: 'var(--w-karta)',
              border: '1px solid var(--w-linia)',
              fontSize: '0.88rem',
              lineHeight: 1.45,
              color: 'var(--w-tusz)',
              fontVariantNumeric: 'tabular-nums',
              maxWidth: '100%',
            }}
          >
            <span aria-hidden="true" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500 }}>GSC</span>
            <span>{t.gscBadge}</span>
          </div>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {t.answerBox}
          </AnswerBox>

          <Byline sciezka={d.sciezka} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta={`branza_${d.klucz}_hero`} data-plan="standard">
              {t.ctaPrimary}
            </a>
            <a href={en ? '#verified-results' : '#wyniki-gsc'} className="hero-btn-secondary" data-cta={`branza_${d.klucz}_gsc`}>
              {t.ctaSecondary}
            </a>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'pillars' : 'filary-strategii'}>
        <div className="container" style={kontener}>
          <Reveal>
            <h2 style={h2Styl}>{t.filaryTytul}</h2>
            <p style={akapit}>{t.filaryWstep}</p>
          </Reveal>
          <div style={{ display: 'grid', gap: '1.15rem', marginTop: '1.25rem' }}>
            {t.filary.map((f) => (
              <div key={f.nr} style={karta}>
                <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.45rem' }}>
                  {f.nr}
                </div>
                <h3 style={h3Styl}>{f.tytul}</h3>
                <p style={{ ...akapit, margin: f.dostarczenie ? '0 0 0.95rem' : 0 }}>{f.opis}</p>
                {f.dostarczenie && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
                    {f.dostarczenie.map((el) => (
                      <span
                        key={el}
                        style={{
                          fontFamily: 'var(--w-mono)',
                          fontSize: '0.75rem',
                          padding: '0.28rem 0.65rem',
                          borderRadius: '999px',
                          background: 'var(--w-papier-2)',
                          border: '1px solid var(--w-linia)',
                          color: 'var(--w-tusz-2)',
                        }}
                      >
                        {el}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'verified-results' : 'wyniki-gsc'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.55rem' }}>
              {t.caseStudy.kicker}
            </div>
            <h2 style={h2Styl}>{t.caseStudy.tytul}</h2>
            <p style={akapit}>{t.caseStudy.opis}</p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(175px, 100%), 1fr))',
                gap: '0.85rem',
                margin: '1.25rem 0 1.75rem',
              }}
            >
              {t.caseStudy.kpis.map((k) => (
                <div
                  key={k.etykieta}
                  style={{
                    padding: '1rem 1.1rem',
                    borderRadius: '16px',
                    background: 'var(--w-papier-2)',
                    border: '1px solid var(--w-linia)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  <div style={{ fontSize: '0.78rem', color: 'var(--w-tusz-2)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                    {k.etykieta}
                  </div>
                  <div style={{ fontSize: 'clamp(1.45rem, 2.8vw, 1.85rem)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--w-tusz)', lineHeight: 1.1 }}>
                    {k.wartosc}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--w-tusz-2)', marginTop: '0.35rem', lineHeight: 1.35 }}>
                    {k.opis}
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ ...h3Styl, marginBottom: '0.75rem' }}>{t.caseStudy.wykresTytul}</h3>
            <SeriaTygodniowaGsc seria={d.gscSeria} en={en} klientNazwa={d.gscMetryki.nazwa} />

            <CompareTable
              id={`tabela-gsc-${d.klucz}`}
              caption={en
                ? `Verified Google Search Console milestones: ${d.gscMetryki.nazwa} (${d.gscMetryki.url})`
                : `Kluczowe punkty pomiarowe w Google Search Console: ${d.gscMetryki.nazwa} (${d.gscMetryki.url})`}
              columns={t.caseStudy.kolumny}
              rows={t.caseStudy.etapy}
              przypis={t.caseStudy.przypis}
            />
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'comparison' : 'porownanie-kanalow'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>{t.porownanie.tytul}</h2>
            <p style={akapit}>{t.porownanie.wstep}</p>

            <CompareTable
              id={`tabela-porownanie-${d.klucz}`}
              caption={t.porownanie.caption}
              columns={t.porownanie.kolumny}
              rows={t.porownanie.wiersze}
              przypis={t.porownanie.przypis}
            />

            {narzedziaAktywne.length > 0 && (
              <p style={{ ...akapit, marginTop: '1.1rem' }}>
                <strong>{en ? 'Test your website free before booking a call:' : 'Sprawdź swoją stronę za darmo przed rozmową:'}</strong>{' '}
                {en ? 'run a live check in our ' : 'przetestuj swój obecny serwis w '}
                {narzedziaAktywne.map((n, idx) => (
                  <Fragment key={n.href}>
                    {idx > 0 && (idx === narzedziaAktywne.length - 1 ? (en ? ' or ' : ' lub ') : ', ')}
                    <Link href={n.href} style={linkStyl}>{en ? n.en : n.pl}</Link>
                  </Fragment>
                ))}
                .
              </p>
            )}

            {uslugiAktywne.length > 0 && (
              <p style={{ ...akapit, marginBottom: 0 }}>
                <strong>{en ? `Related services from our Warsaw team (${BIURO.ulica}):` : `Powiązane usługi naszego zespołu (${BIURO.ulica}):`}</strong>{' '}
                {uslugiAktywne.map((u, idx) => (
                  <Fragment key={u.href}>
                    {idx > 0 && (idx === uslugiAktywne.length - 1 ? (en ? ' and ' : ' oraz ') : ', ')}
                    <Link href={u.href} style={linkStyl}>{en ? u.en : u.pl}</Link>
                  </Fragment>
                ))}
                .
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'pricing' : 'cennik'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>{t.cennik.tytul}</h2>
            <p style={akapit}>{t.cennik.wstep}</p>

            <CompareTable
              id={`tabela-cennik-${d.klucz}`}
              caption={t.cennik.caption}
              columns={en
                ? [
                    { key: 'opcja', label: 'Service / Plan' },
                    { key: 'kwota', label: 'Net price' },
                    { key: 'umowa', label: 'Contract term' },
                    { key: 'zakres', label: 'Included vertical scope' },
                  ]
                : [
                    { key: 'opcja', label: 'Usługa / Pakiet' },
                    { key: 'kwota', label: 'Cena netto' },
                    { key: 'umowa', label: 'Warunki umowy' },
                    { key: 'zakres', label: 'Zakres prac w Twojej branży' },
                  ]}
              rows={t.cennik.wiersze}
              przypis={t.cennik.przypis}
            />

            {(hrefCennik || hrefKalkulator) && (
              <p style={{ ...akapit, marginTop: '1rem', marginBottom: 0 }}>
                {en ? (
                  <>
                    Compare all package deliverables side-by-side on our{' '}
                    {hrefCennik ? <Link href="/cennik-pozycjonowania" style={linkStyl}>SEO pricing page</Link> : 'SEO pricing page'}
                    {hrefKalkulator && <>, or estimate your monthly payback timeline in our <Link href="/narzedzia/kalkulator-strat-seo" style={linkStyl}>SEO ROI &amp; loss calculator</Link></>}.
                  </>
                ) : (
                  <>
                    Pełne porównanie pakietów sprawdzisz na stronie{' '}
                    {hrefCennik ? <Link href="/cennik-pozycjonowania" style={linkStyl}>cennik pozycjonowania</Link> : 'cennik pozycjonowania'}
                    {hrefKalkulator && <>, a orientacyjny miesiąc zwrotu z inwestycji wyliczysz w <Link href="/narzedzia/kalkulator-strat-seo" style={linkStyl}>kalkulatorze strat i zwrotu z SEO</Link></>}.
                  </>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={t.faq}
        title={t.faqTytul}
        sectionId={en ? 'faq' : 'pytania'}
      />

      <section>
        <div className="container" style={kontener}>
          <Zrodla zrodla={t.zrodla} en={en} />
        </div>
      </section>

      <Contact />
    </main>
  );
}
