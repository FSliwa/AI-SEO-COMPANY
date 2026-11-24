// Deutsche Leistungsseite /de/seo-texte-schreiben (24.11.2026; Schluessel PL: /copywriting-seo).
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Liste, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { PREISE, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import {
  TEXTE_KURZANTWORT,
  TEXTE_BAUSTEINE,
  TEXTE_VERGLEICH_ZEILEN,
  TEXTE_PAKET_ZEILEN,
  TEXTE_PROZESS_SCHRITTE,
  TEXTE_FAQ,
  TEXTE_QUELLEN,
} from '@/lib/de/seoTexteDe';

const KLUCZ = '/copywriting-seo';

export default function SeoTexteDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/seo-texte-schreiben';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'SEO-Texte & B2B-Fachtexte in monatlichen SEO-Paketen',
    description: w?.opis ?? TEXTE_KURZANTWORT,
    serviceType: 'SEO Copywriting & KI-zitierbare Fachredaktion',
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
        name: 'SEO Standard (inklusive 2 SEO-Inhalten pro Monat)',
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
        name: 'SEO Premium (inklusive 4 SEO-Inhalten pro Monat & KI-Monitoring)',
        priceCurrency: 'EUR',
        price: PREISE.premium,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.premium,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'Booster Pack (Neue Next.js-Website inklusive laufender SEO-Betreuung)',
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
      <Seite krumen="SEO-Texte schreiben">
        <Hero
          kicker="SEO Copywriting · Inhalte im SEO-Paket"
          h1={w?.h1 ?? 'SEO-Texte schreiben lassen: B2B-Fachtexte und KI-zitierbare Inhalte im Paket'}
          lead="Gute Fachbeiträge und Leistungsseiten entstehen nicht zum Kilopreis pro Wort. Bei uns sind Redaktion, 10-Felder-Briefing, Quellenprüfung und interne Verlinkung fest in Ihre monatliche SEO-Betreuung eingebettet - mit 1-Klick-Freigabe im Kundenportal und vollen Nutzungsrechten."
          cta="Paket mit SEO-Texten anfragen"
        />

        <Abschnitt titel="Kurzantwort: Wie funktioniert SEO Copywriting bei AI SEO COMPANY?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{TEXTE_KURZANTWORT}</p>
          </AnswerBox>
        </Abschnitt>

        <Karten
          id="qualitaetsstandard"
          szklo
          titel="Vier Bausteine für B2B-Fachtexte und KI-zitierbare Inhalte"
          untertitel="Warum wir beim SEO-Texte-Schreiben auf Information Gain, Answer-First-Absätze und Primärquellen statt auf künstliche Wortvorgaben setzen."
          items={TEXTE_BAUSTEINE}
        />

        <CtaZeile text="Redaktions- & SEO-Paket anfragen (Antwort in 24 Std.)" />

        <Abschnitt titel="SEO Copywriting vs. klassischer Werbetext oder Textbörse" id="unterschied-copywriting">
          <Absatz>
            Wer isoliert einzelne SEO Texte schreiben lassen möchte, erhält auf Textbörsen häufig austauschbare Zusammenfassungen bestehender Suchergebnisse - abgerechnet nach Wortanzahl. Im B2B-Umfeld überzeugt das weder Einkäufer noch moderne Such- und Antwortsysteme. Entscheidend ist die Verbindung aus klarer Suchintention, neuen Sachinformationen und sauberer Einbettung in Ihre Gesamtseite:
          </Absatz>
          <Tabelle
            beschriftung="Methodenvergleich: Isolierte Textbestellung vs. integriertes SEO Copywriting"
            spalten={['Kriterium', 'Klassischer Werbetext / Wortpreis-Modell', 'Unser SEO Copywriting im Monats-Retainer']}
            zeilen={TEXTE_VERGLEICH_ZEILEN}
            fussnote="Hinweis: Google bestätigt in der Search-Central-Dokumentation ausdrücklich, dass es keine bevorzugte Wortanzahl für Rankings gibt (siehe Quelle 1)."
          />
        </Abschnitt>

        <Abschnitt szklo titel="Was kosten SEO-Texte? Umfang in unseren Monatspaketen" id="preise">
          <Absatz>
            Wir kalkulieren keinen Einzelpreis pro Artikel oder Zeichen. Texte entfalten ihre Wirkung erst im Zusammenspiel mit schnellen Ladezeiten, sauberer Indexierung und themennahen Backlinks - deshalb liefern wir Inhalte ausschließlich innerhalb unserer laufenden{' '}
            {maWersjeDe('/pozycjonowanie-stron-internetowych') ? (
              <Link href="/pozycjonowanie-stron-internetowych" style={LINK}>B2B-SEO-Betreuung</Link>
            ) : (
              'B2B-SEO-Betreuung'
            )}
            :
          </Absatz>
          <Tabelle
            beschriftung="Enthaltene Inhalte und Konditionen in unseren SEO-Paketen (netto)"
            spalten={['Paket', 'Preis (netto)', 'Vertragslaufzeit', 'Enthaltene Inhalte & Leistungen']}
            zeilen={TEXTE_PAKET_ZEILEN}
            fussnote={`${PREIS_HINWEIS} Im Booster Pack weist unsere Preisseite keine feste monatliche Textanzahl aus, da in der Startphase Seitenarchitektur und Kerntexte des Neubaus entstehen.`}
          />
          <Absatz style={{ marginTop: '1rem', marginBottom: 0 }}>
            Die Paketübersicht zählt bewusst Inhalte pro Monat statt Zeichen: Ob eine kaufnahe Leistungsseite, eine Kategorieseite oder ein technischer Leitfaden Priorität hat, ergibt sich aus dem gemeinsamen Redaktionsplan. Nach Rechnungszahlung gehen sämtliche Nutzungsrechte dauerhaft auf Ihr Unternehmen über.{' '}
            {maWersjeDe('/cennik-pozycjonowania') && (
              <>Alle Konditionen im Direktvergleich finden Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="Wie wir SEO-Texte schreiben: 6 Schritte vom Keyword bis zur Messung" id="prozess">
          <Absatz>
            Jeder Beitrag durchläuft denselben dokumentierten Redaktionsprozess. Die ersten drei Schritte finden vor dem eigentlichen Formulieren statt - denn ein unscharfes Briefing lässt sich später durch Stilistik nicht mehr retten:
          </Absatz>
          <Liste
            nummeriert
            punkte={TEXTE_PROZESS_SCHRITTE.map(([titel, beschreibung]) => (
              <span key={titel}>
                <strong style={{ color: 'var(--color-text-dark)', fontWeight: 600 }}>{titel}</strong>{' '}
                {beschreibung}
              </span>
            ))}
          />
          <Unterueberschrift>Kostenlose Vorlagen & Live-Prüfung unserer Methode</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            Sie können unsere Arbeitsweise vorab ohne Erstgespräch prüfen:{' '}
            {maWersjeDe('/narzedzia/brief-dla-copywritera') && (
              <>Laden Sie unsere <Link href="/narzedzia/brief-dla-copywritera" style={LINK}>Briefing Vorlage für Texter (10 Felder als PDF)</Link> herunter, </>
            )}
            {maWersjeDe('/narzedzia/dobor-slow-kluczowych') && (
              <>strukturieren Sie Themencluster ohne Kannibalisierung mit der <Link href="/narzedzia/dobor-slow-kluczowych" style={LINK}>Keyword Recherche Vorlage</Link> </>
            )}
            {maWersjeDe('/narzedzia/sprawdz-cytowalnosc-strony-ai') && (
              <>und testen Sie bestehende URLs live im Browser über <Link href="/narzedzia/sprawdz-cytowalnosc-strony-ai" style={LINK}>GEO-Zitierbarkeit prüfen</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={TEXTE_FAQ} titel="Häufige Fragen zu SEO-Texten & Copywriting" id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={TEXTE_QUELLEN} />
        </div>
      </Seite>
    </>
  );
}
