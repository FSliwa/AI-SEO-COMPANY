// Deutsche Leistungsseite /de/google-unternehmensprofil-optimieren (Faza 2 DE, 22.11.2026; Schlüssel PL: /pozycjonowanie-wizytowki-google).
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Tabelle, Karten, CtaZeile, Faq } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import {
  GBP_KURZANTWORT,
  GBP_FAKTOREN,
  GBP_LEISTUNGEN,
  GBP_CHATGPT_TABELLE,
  GBP_PREIS_ZEILEN,
  GBP_FAQ,
  GBP_QUELLEN,
} from '@/lib/de/googleUnternehmensprofil';

const KLUCZ = '/pozycjonowanie-wizytowki-google';
const LNK = { textDecoration: 'underline', fontWeight: 600 };

export default function GoogleUnternehmensprofilDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/google-unternehmensprofil-optimieren';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Google Unternehmensprofil optimieren',
    description: w?.opis ?? GBP_KURZANTWORT,
    serviceType: 'Google Unternehmensprofil Optimierung',
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
        name: 'SEO Standard inklusive Google Unternehmensprofil Betreuung',
        priceCurrency: 'EUR',
        price: PREISE.standard,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.standard,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceDe) }} />
      <Seite krumen="Google Unternehmensprofil">
        <Hero
          kicker="Lokales SEO & Google Maps"
          h1={w?.h1 ?? 'Google Unternehmensprofil optimieren: Sichtbarkeit auf Google Maps'}
          lead="Wer eine Dienstleistung mit Ortsbezug sucht, entscheidet oft schon im dreiteiligen Kartenausschnitt (Local Pack) - noch vor dem ersten Klick auf eine organische Website. Wir optimieren Ihr Google Unternehmensprofil nachprüfbar über ein 49-Punkte-Kartenraster im 14-Tage-Takt."
          cta="Angebot in 24 Std. anfragen"
        />

        <Abschnitt titel="Kurzantwort: Was bringt die Optimierung des Google Unternehmensprofils?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{GBP_KURZANTWORT}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="rankingfaktoren"
          titel="Wonach Google Unternehmensprofile sortiert"
          untertitel="Google nennt in seiner offiziellen Dokumentation drei Faktoren für das lokale Ranking: Relevanz, Entfernung und Bekanntheit."
          items={GBP_FAKTOREN}
        />

        <Karten
          id="leistungen"
          szklo
          titel="Was wir an Ihrem Google Unternehmensprofil laufend umsetzen"
          untertitel="Keine einmalige Kosmetik, sondern ein dokumentierter Monatsprozess mit Eigentum auf Ihrem eigenen Google-Konto."
          items={GBP_LEISTUNGEN}
          spalten={260}
        />

        <CtaZeile text="Google Unternehmensprofil prüfen lassen - Angebot in 24 Std." />

        <Abschnitt titel="Warum das Google Unternehmensprofil auch über ChatGPT-Empfehlungen entscheidet" id="chatgpt-maps">
          <Absatz>
            Ein gepflegtes Profil wirkt längst nicht mehr nur in der klassischen Google-Suche. In unserer eigenen API-Messung vom 4. und 5. November 2026 (Modell <code>gpt-4.1-mini</code> mit aktivierter Live-Websuche) haben wir untersucht, wohin ChatGPT verlinkt, wenn potenzielle Kunden nach einem konkreten Anbieter vor Ort fragen:
          </Absatz>
          <Tabelle
            beschriftung="Wohin ChatGPT bei Kauf- und Empfehlungsfragen verlinkte (eigene Messung, 04.-05.11.2026)"
            spalten={['Art der Kundenfrage', 'Gemessene Links in ChatGPT', 'Was dafür optimiert sein muss']}
            zeilen={GBP_CHATGPT_TABELLE}
            fussnote="Quelle: eigene Messung über die DataForSEO-API (Standort Warschau, 04.-05.11.2026). Ergebnisse variieren je nach Branche, Sprache und Standort."
          />
          <Unterueberschrift>Messung im 49-Punkte-Kartenraster statt Bauchgefühl</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            Wer sein eigenes Unternehmen im Büro googelt, sieht fast immer Platz 1 - weil die Entfernung null Meter beträgt. Zwei Kilometer weiter kann dasselbe Profil auf Platz 9 liegen. Deshalb prüfen wir Ihre Sichtbarkeit vor Beginn und anschließend alle 14 Tage an 49 geografischen Punkten (7x7-Gitter) rund um Ihren Standort.{' '}
            {maWersjeDe('/pozycjonowanie-w-ai') && <>Wie Kartendaten und KI-Antworten zusammenspielen, lesen Sie unter <Link href="/pozycjonowanie-w-ai" style={LNK}>Generative Engine Optimization (GEO)</Link>. </>}
            {maWersjeDe('/sprawdz-widocznosc-w-ai') && <>Ob KI-Modelle Ihre Marke heute schon nennen, testen Sie sofort im <Link href="/sprawdz-widocznosc-w-ai" style={LNK}>kostenlosen KI-Sichtbarkeit Check</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="Was kostet die Betreuung des Google Unternehmensprofils?" id="preise">
          <Absatz>
            Weil Google die organische Stärke Ihrer verknüpften Website unmittelbar in die Bewertung des Unternehmensprofils einbezieht, betreuen wir Profil und Website gemeinsam in unseren Monatspaketen - ohne Einrichtungsgebühr und ohne Jahresbindung in SEO Standard und SEO Premium:
          </Absatz>
          <Tabelle
            beschriftung="Pakete mit laufender Optimierung des Google Unternehmensprofils"
            spalten={['Paket', 'Preis (netto)', 'Laufzeit', 'Enthaltene Leistungen']}
            zeilen={GBP_PREIS_ZEILEN}
            fussnote={PREIS_HINWEIS}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            {maWersjeDe('/cennik-pozycjonowania') && <>Alle Paketdetails finden Sie unter <Link href="/cennik-pozycjonowania" style={LNK}>SEO Kosten</Link>. </>}
            {maWersjeDe('/narzedzia/audyt-seo') && <>Den technischen Zustand Ihrer verknüpften Website prüfen Sie vorab im <Link href="/narzedzia/audyt-seo" style={LNK}>kostenlosen SEO Audit</Link>.</>}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={GBP_FAQ} titel="Häufige Fragen zum Google Unternehmensprofil" />

        <section style={{ padding: '0 0 3.5rem' }}>
          <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
            <ZrodlaDe zrodla={GBP_QUELLEN} />
          </div>
        </section>
      </Seite>
    </>
  );
}
