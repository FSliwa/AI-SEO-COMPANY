// Deutsche Leistungsseite /de/wordpress-seo-agentur (E1b, 22.11.2026; Schluessel PL: /pozycjonowanie-wordpress).
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import {
  WP_KURZANTWORT,
  WP_BAUSTELLEN,
  WP_ENTSCHEIDUNG_ZEILEN,
  WP_PREIS_ZEILEN,
  WP_FAQ,
  WP_QUELLEN,
} from '@/lib/de/wordpressSeoDe';

const KLUCZ = '/pozycjonowanie-wordpress';

export default function WordpressSeoDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/wordpress-seo-agentur';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'WordPress SEO für Unternehmen',
    description: w?.opis ?? WP_KURZANTWORT,
    serviceType: 'WordPress Suchmaschinenoptimierung (SEO & GEO)',
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
        name: 'WordPress SEO im Paket SEO Standard',
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
        name: 'Booster Pack (Relaunch auf Next.js inklusive SEO)',
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
      <Seite krumen="WordPress SEO">
        <Hero
          kicker="Technisches CMS-SEO & KI-Sichtbarkeit"
          h1={w?.h1 ?? 'WordPress SEO für Unternehmen: Ladezeit, saubere Indexierung und KI-Sichtbarkeit'}
          lead="WordPress scheitert bei Google selten am Content-Management-System selbst, sondern an aufgeblähten Page-Buildern, unkontrollierten Archiv-URLs und konkurrierenden Plugins. Wir räumen Technik, Core Web Vitals, Schema.org und KI-Crawler-Zugang messbar auf."
          cta="WordPress-Analyse anfragen"
        />

        <Abschnitt titel="Kurzantwort: Was bringt spezialisiertes WordPress SEO?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{WP_KURZANTWORT}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="schwerpunkte"
          titel="Die 4 technischen Hebel jeder WordPress-Optimierung"
          untertitel="Statt pauschal neue Plugins zu installieren, reduzieren wir Komplexität im Code, in der Datenbank und im Google-Index."
          items={WP_BAUSTELLEN}
        />

        <CtaZeile text="WordPress-Audit & Angebot in 24 Std." />

        <Abschnitt titel="Ehrliche Abwägung: WordPress optimieren oder im Booster Pack auf Next.js wechseln?" id="wordpress-oder-nextjs">
          <Absatz>
            Weil wir sowohl bestehende WordPress-Seiten im SEO betreuen als auch neue B2B-Websites in Next.js entwickeln, müssen wir Ihnen keine Einheitslösung verkaufen. Nach dem Blick in Ihr Backend empfehlen wir transparent den wirtschaftlicheren Weg:
          </Absatz>
          <Tabelle
            beschriftung="Entscheidungshilfe: Optimierung im WordPress-Bestand vs. Migration auf Next.js"
            spalten={['Ausgangslage Ihrer Website', 'Unsere Empfehlung', 'Wirtschaftlicher & technischer Grund']}
            zeilen={WP_ENTSCHEIDUNG_ZEILEN}
            fussnote="Alle Paket- und Projektpreise verstehen sich netto zzgl. gesetzlicher USt. (Stand: November 2026)."
          />
          <Unterueberschrift>Vorab-Diagnose ohne Login-Daten</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            Schon vor einem Gespräch können Sie Ihre aktuelle Installation selbst testen:{' '}
            {maWersjeDe('/narzedzia/audyt-seo') && <>Der <Link href="/narzedzia/audyt-seo" style={LINK}>kostenlose SEO Audit</Link> prüft bis zu 25 Seiten auf Antwortzeit, H1-Struktur und Meta-Daten. </>}
            {maWersjeDe('/narzedzia/tester-robotow-ai-robots-txt') && <>Ob Ihre Sicherheits-Firewall ChatGPT oder Perplexity aussperrt, zeigt unser <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={LINK}>KI-Bot- & robots.txt-Prüfer</Link>. </>}
            {maWersjeDe('/porownania/nextjs-vs-wordpress-seo') && <>Den ausführlichen Architekturvergleich lesen Sie unter <Link href="/porownania/nextjs-vs-wordpress-seo" style={LINK}>Next.js vs WordPress für SEO</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="Was kostet WordPress SEO bei uns?" id="preise">
          <Absatz>
            Sie wählen zwischen einem einmaligen technischen Tiefenaudit zur Umsetzung durch Ihr eigenes Team und unseren monatlich kündbaren Betreuungspaketen inklusive Content, Linkaufbau und 24/7-Kundenportal:
          </Absatz>
          <Tabelle
            beschriftung="Transparente Preise für WordPress SEO und Relaunch-Optionen (netto)"
            spalten={['Leistung / Paket', 'Preis (netto)', 'Vertragslaufzeit', 'Enthaltener Umfang']}
            zeilen={WP_PREIS_ZEILEN}
            fussnote={PREIS_HINWEIS}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            {maWersjeDe('/cennik-pozycjonowania') && <>Alle Paketdetails im Direktvergleich finden Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={WP_FAQ} titel="Häufige Fragen zu WordPress SEO" id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={WP_QUELLEN} />
        </div>
      </Seite>
    </>
  );
}
