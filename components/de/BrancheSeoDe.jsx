// Pakiet P3 - Fala 3 (24.11.2026): Deutsche Branchen-Leistungsseiten
// (/de/seo-fuer-bauunternehmen, /de/seo-fuer-industrie-und-produktion,
// /de/seo-fuer-gastronomie-und-restaurants, /de/seo-fuer-schulungsanbieter-und-zertifizierung).
// Aufbau analog zu components/de/WordpressSeoDe.jsx; echte Google-Search-Console-Messungen unserer Kundenprojekte in Polen.

import { Fragment } from 'react';
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import { liczba } from '@/lib/formatDe';
import { BRANZE_SEO } from '@/lib/branzeSeo';

function kurzerZeitraumDe(odIso, doIso) {
  const [, m1, d1] = odIso.split('-');
  const [, m2, d2] = doIso.split('-');
  return `${d1}.${m1}.-${d2}.${m2}.`;
}

function WochenverlaufGscDe({ seria, klientNazwa }) {
  const maxKlicks = Math.max(...seria.map((p) => p[2]), 1);

  return (
    <div
      className="w-tafla-szklo"
      style={{
        maxWidth: '100%',
        margin: '0 0 1.5rem',
        padding: '1.1rem 1rem',
        borderRadius: '16px',
      }}
    >
      <div
        role="region"
        aria-label={`Wöchentlicher Google-Search-Console-Verlauf für ${klientNazwa} (Kundenprojekt in Polen)`}
        tabIndex={0}
        style={{
          overflowX: 'auto',
          WebkitOverflowScrolling: 'touch',
          maxWidth: '100%',
        }}
      >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${seria.length}, minmax(58px, 1fr))`,
          gap: '0.5rem',
          alignItems: 'end',
          minWidth: `${seria.length * 62}px`,
        }}
      >
        {seria.map(([od, doDaty, klicks, impr], idx) => {
          const balkenHoehe = Math.max(Math.round((klicks / maxKlicks) * 92), klicks > 0 ? 10 : 4);
          const letzte = idx === seria.length - 1;
          return (
            <div key={od} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '0.3rem' }}>
              <span
                style={{
                  fontFamily: 'var(--w-mono)',
                  fontSize: '0.76rem',
                  fontWeight: 500,
                  color: letzte ? 'var(--w-pomarancz-tekst)' : 'var(--w-tusz)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {klicks}
              </span>
              <div style={{ height: '96px', width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div
                  aria-hidden="true"
                  style={{
                    width: '100%',
                    maxWidth: '30px',
                    height: `${balkenHoehe}px`,
                    borderRadius: '6px 6px 3px 3px',
                    background: letzte ? 'var(--w-pomarancz)' : 'rgba(29, 29, 31, 0.22)',
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
                W{idx + 1}
              </span>
              <span
                style={{
                  fontSize: '0.66rem',
                  color: 'var(--w-tusz-2)',
                  fontVariantNumeric: 'tabular-nums',
                  lineHeight: 1.15,
                  whiteSpace: 'nowrap',
                }}
                title={`${od} - ${doDaty}: ${liczba(impr, 'de')} Impressionen`}
              >
                {kurzerZeitraumDe(od, doDaty)}
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
                {liczba(impr, 'de')} Impr.
              </span>
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

export default function BrancheSeoDe({ kluczBranzy }) {
  const d = BRANZE_SEO[kluczBranzy];
  if (!d) return null;

  const de = d.de;
  const w = wpisDe(d.sciezka);
  const url = urlDe(d.sciezka) || `https://www.ai-seo-company.pl/de${d.dePath}`;

  const toolsDe = d.powiazaneNarz.filter((n) => maWersjeDe(n.href));
  const leistungenDe = d.powiazaneUslugi.filter((u) => maWersjeDe(u.href));

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: d.serviceNameDe,
    description: w?.opis ?? de.kurzantwort,
    serviceType: d.serviceTypeDe,
    url,
    inLanguage: 'de',
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    areaServed: [
      { '@type': 'Country', name: 'Deutschland' },
      { '@type': 'Country', name: 'Österreich' },
      { '@type': 'Country', name: 'Schweiz' },
      { '@type': 'Country', name: 'Polen' },
    ],
    availableLanguage: ['de', 'en', 'pl'],
    offers: [
      {
        '@type': 'Offer',
        name: `${d.breadcrumbs.de} im Paket SEO Standard`,
        priceCurrency: 'EUR',
        price: PREISE.standard,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.standard,
          minPrice: PREISE.standard,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Booster Pack (Neubau in Next.js inklusive laufendem SEO)',
        priceCurrency: 'EUR',
        price: PREISE.booster,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.booster,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceDe) }} />
      <Seite krumen={d.breadcrumbs.de}>
        <Hero
          kicker={de.kicker}
          h1={w?.h1 ?? de.h1}
          lead={de.lead}
          beweis={de.gscBadge}
          cta={de.cta}
        />

        <Abschnitt titel={`Kurzantwort: ${d.breadcrumbs.de}`} id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{de.kurzantwort}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="schwerpunkte"
          titel={de.baustellenTitel}
          untertitel={de.baustellenUntertitel}
          items={de.baustellen}
        />

        <Abschnitt szklo tag={de.caseStudy.tag} titel={de.caseStudy.titel} id="search-console-studie">
          <Absatz>{de.caseStudy.einleitung}</Absatz>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(155px, 100%), 1fr))',
              gap: '0.85rem',
              margin: '1.25rem 0 1.75rem',
            }}
          >
            {de.caseStudy.kpis.map((k) => (
              <div
                key={k.etykieta}
                lang="de"
                className="w-tafla-szklo"
                style={{
                  padding: '1rem 1.05rem',
                  borderRadius: '16px',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                <div style={{ fontSize: '0.78rem', color: 'var(--w-tusz-2)', marginBottom: '0.35rem', lineHeight: 1.35 }}>
                  {k.etykieta}
                </div>
                <div style={{ fontSize: 'clamp(1.45rem, 2.8vw, 1.85rem)', fontWeight: 600, letterSpacing: '-0.03em', color: 'var(--color-text-dark)', lineHeight: 1.1 }}>
                  {k.wartosc}
                </div>
                <div style={{ fontSize: '0.76rem', color: 'var(--w-tusz-2)', marginTop: '0.35rem', lineHeight: 1.35 }}>
                  {k.opis}
                </div>
              </div>
            ))}
          </div>

          <Unterueberschrift>{de.caseStudy.untertitelWochen}</Unterueberschrift>
          <WochenverlaufGscDe seria={d.gscSeria} klientNazwa={d.gscMetryki.nazwa} />

          <Tabelle
            beschriftung={de.caseStudy.beschriftung}
            spalten={de.caseStudy.spalten}
            zeilen={de.caseStudy.zeilen}
            fussnote={de.caseStudy.fussnote}
          />
        </Abschnitt>

        <CtaZeile text={de.ctaMid} />

        <Abschnitt titel={de.vergleich.titel} id="branchenvergleich">
          <Absatz>{de.vergleich.einleitung}</Absatz>
          <Tabelle
            beschriftung={de.vergleich.beschriftung}
            spalten={de.vergleich.spalten}
            zeilen={de.vergleich.zeilen}
            fussnote={de.vergleich.fussnote}
          />
          <Unterueberschrift>{de.vergleich.vorabTitel}</Unterueberschrift>
          {toolsDe.length > 0 && (
            <Absatz>
              Schon vor einem Erstgespräch können Sie Ihre bestehende Website direkt im Browser prüfen:{' '}
              Nutzen Sie unseren{' '}
              {toolsDe.map((n, idx) => (
                <Fragment key={n.href}>
                  {idx > 0 && (idx === toolsDe.length - 1 ? ' oder den ' : ', den ')}
                  <Link href={n.href} style={LINK}>{n.de}</Link>
                </Fragment>
              ))}
              .
            </Absatz>
          )}
          {leistungenDe.length > 0 && (
            <Absatz style={{ marginBottom: 0 }}>
              Ergänzende Leistungsbereiche unseres Teams:{' '}
              {leistungenDe.map((u, idx) => (
                <Fragment key={u.href}>
                  {idx > 0 && (idx === leistungenDe.length - 1 ? ' sowie ' : ', ')}
                  <Link href={u.href} style={LINK}>{u.de}</Link>
                </Fragment>
              ))}
              .
            </Absatz>
          )}
        </Abschnitt>

        <Abschnitt titel={de.preise.titel} id="preise">
          <Absatz>{de.preise.einleitung}</Absatz>
          <Tabelle
            beschriftung={de.preise.beschriftung}
            spalten={['Leistung / Paket', 'Preis (netto)', 'Vertragslaufzeit', 'Enthaltener Branchen-Umfang']}
            zeilen={de.preise.zeilen}
            fussnote={PREIS_HINWEIS}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            {maWersjeDe('/cennik-pozycjonowania') && <>Alle Paketdetails im Direktvergleich finden Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>. </>}
            {maWersjeDe('/narzedzia/kalkulator-strat-seo') && <>Den voraussichtlichen Amortisationsmonat berechnen Sie im <Link href="/narzedzia/kalkulator-strat-seo" style={LINK}>SEO-Verlust- &amp; ROI-Rechner</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={de.faq} titel={de.faqTitel} id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={de.quellen} />
        </div>
      </Seite>
    </>
  );
}
