// Deutsche Leistungsseite /de/webflow-seo-agentur (E1b, 22.11.2026; Schluessel PL: /pozycjonowanie-webflow).
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import {
  WF_KURZANTWORT,
  WF_HEBEL,
  WF_ENTSCHEIDUNG_ZEILEN,
  WF_PREIS_ZEILEN,
  WF_FAQ,
  WF_QUELLEN,
} from '@/lib/de/webflowSeoDe';

const KLUCZ = '/pozycjonowanie-webflow';

export default function WebflowSeoDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/webflow-seo-agentur';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Webflow SEO für B2B- und SaaS-Unternehmen',
    description: w?.opis ?? WF_KURZANTWORT,
    serviceType: 'Webflow Suchmaschinenoptimierung (SEO & GEO)',
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
        name: 'Webflow SEO im Paket SEO Standard',
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
        name: 'Booster Pack (Wechsel auf Next.js inklusive SEO)',
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
      <Seite krumen="Webflow SEO">
        <Hero
          kicker="Webflow CMS, Localization & KI-Suche"
          h1={w?.h1 ?? 'Webflow SEO für B2B & SaaS: CMS-Architektur, Hreflang und KI-Sichtbarkeit'}
          lead="Webflow bringt schnelles Hosting mit, erfordert beim Skalieren aber präzise Eingriffe in CMS-Kollektionen, mehrsprachige URL-Slugs, Custom-Code-JSON-LD und Lottie-Skripte. Wir übernehmen Technik, Inhalte und Messung direkt in Ihrem Webflow-Projekt."
          cta="Webflow-Analyse anfragen"
        />

        <Abschnitt titel="Kurzantwort: Worauf kommt es bei Webflow SEO wirklich an?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{WF_KURZANTWORT}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="schwerpunkte"
          titel="Was wir in Ihrem Webflow-Projekt technisch und inhaltlich lösen"
          untertitel="Von indexierten Hilfs-Kollektionen über Localization-Hreflang bis zu validiertem Schema-Markup ohne Drittanbieter-Plugins."
          items={WF_HEBEL}
        />

        <CtaZeile text="Webflow-Audit & Angebot in 24 Std." />

        <Abschnitt titel="Wann Webflow ideal bleibt - und wann sich der Wechsel auf Next.js rechnet" id="webflow-oder-nextjs">
          <Absatz>
            Viele SaaS- und Beratungsunternehmen starten auf Webflow und stoßen erst bei drei oder vier Sprachversionen oder komplexen Rechnern an Kosten- und Routing-Grenzen. So ordnen wir Ihr Setup nüchtern ein:
          </Absatz>
          <Tabelle
            beschriftung="Entscheidungsmatrix: Auf Webflow skalieren vs. Wechsel auf Next.js im Booster Pack"
            spalten={['Situation Ihres Unternehmens', 'Sinnvoller Weg', 'Technische & kaufmännische Begründung']}
            zeilen={WF_ENTSCHEIDUNG_ZEILEN}
            fussnote="Webflow-Tarife nach webflow.com/pricing (Stand: 22.11.2026); unsere Paketpreise in Euro netto zzgl. USt."
          />
          <Unterueberschrift>Systemvergleich und Sofort-Diagnose</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            {maWersjeDe('/porownania/webflow-vs-wordpress-seo') && <>Wie sich Webflow im 24-Monats-Vergleich schlägt, zeigen wir detailliert unter <Link href="/porownania/webflow-vs-wordpress-seo" style={LINK}>Webflow vs WordPress für SEO</Link>. </>}
            {maWersjeDe('/narzedzia/audyt-seo') && <>Ihre Live-Domain können Sie jederzeit vorab mit unserem <Link href="/narzedzia/audyt-seo" style={LINK}>kostenlosen SEO Audit</Link> durchleuchten.</>}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="Preise und Pakete für Webflow SEO" id="preise">
          <Absatz>
            Ob einmaliges Audit für Ihr internes Webflow-Team oder laufende Umsetzung ohne Jahresbindung - alle Konditionen stehen offen auf dieser Seite:
          </Absatz>
          <Tabelle
            beschriftung="Konditionen für Webflow SEO, KI-Monitoring und Next.js-Migration (netto)"
            spalten={['Leistung / Paket', 'Preis (netto)', 'Vertragslaufzeit', 'Enthaltener Umfang']}
            zeilen={WF_PREIS_ZEILEN}
            fussnote={PREIS_HINWEIS}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            {maWersjeDe('/cennik-pozycjonowania') && <>Den vollständigen Paketvergleich finden Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={WF_FAQ} titel="Häufige Fragen zu Webflow SEO" id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={WF_QUELLEN} />
        </div>
      </Seite>
    </>
  );
}
