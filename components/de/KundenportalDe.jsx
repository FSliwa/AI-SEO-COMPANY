// Deutsche Leistungs- & Produktseite /de/kundenportal (24.11.2026; Schluessel PL: /panel-klienta).
import Image from 'next/image';
import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Liste, Tabelle, Karten, CtaZeile, Faq, LINK } from './UslugiBausteine';
import AnswerBox from '@/components/AnswerBox';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { Link } from '@/i18n/routing';
import { wpisDe, urlDe, maWersjeDe } from '@/lib/stronyDe';
import { FAIRE_REGELN } from '@/lib/de/uslugiGemeinsam';
import {
  PORTAL_DEMO_URL,
  PORTAL_KURZANTWORT,
  PORTAL_MODULE,
  PORTAL_ALLE_FUNKTIONEN,
  PORTAL_VERGLEICH_ZEILEN,
  PORTAL_PRUEFFRAGEN,
  PORTAL_FAQ,
  PORTAL_QUELLEN,
} from '@/lib/de/kundenportalDe';

const KLUCZ = '/panel-klienta';

export default function KundenportalDe() {
  const w = wpisDe(KLUCZ);
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/kundenportal';

  const appSchemaDe = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    '@id': `${url}#app`,
    name: 'AI SEO COMPANY 24/7-Kundenportal (Live-Demo)',
    description: w?.opis ?? PORTAL_KURZANTWORT,
    url: PORTAL_DEMO_URL,
    mainEntityOfPage: url,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    inLanguage: 'de',
    availableLanguage: ['en', 'pl'],
    isAccessibleForFree: true,
    offers: {
      '@type': 'Offer',
      name: 'Öffentliche Live-Demo ohne Registrierung (Oberfläche auf Englisch und Polnisch)',
      price: 0,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: PORTAL_DEMO_URL,
    },
    featureList: [
      'Tägliche Google Search Console- und GA4-Anfragedaten',
      'Wöchentliche Keyword-Positionen mit Maßnahmen-Markierungen',
      'Lückenloses Arbeitsprotokoll (Work Log) mit Datum und Stunden',
      'Wöchentliches KI-Sichtbarkeits-Monitoring (30 Fragen pro Woche in SEO Premium)',
      '1-Klick-Freigaben für Inhalte sowie wöchentlich geprüfte Backlink-Liste',
      'Monatliche PDF-Berichte, CSV-/JSON-Export, Read-Only-API und Claude-MCP',
    ],
    screenshot: {
      '@type': 'ImageObject',
      url: 'https://www.ai-seo-company.pl/images/panel/przeglad.webp',
      width: 1600,
      height: 1025,
    },
    provider: { '@id': 'https://www.ai-seo-company.pl/#organization' },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchemaDe).replace(/</g, '\\u003c') }}
      />
      <Seite krumen="Kundenportal 24/7">
        <Hero
          kicker="24/7-Kundenportal · Live-Reporting ohne Blackbox"
          h1={w?.h1 ?? 'SEO-Kundenportal 24/7: Anfragen, Rankings, KI-Sichtbarkeit und Arbeitsprotokoll live'}
          lead="Statt einmal im Monat auf eine PDF-Datei zu warten, sehen Sie im Kundenportal jeden Tag Ihre Google-Anfragen, wöchentliche Keyword-Verläufe, jede erledigte Arbeitsstunde und alle aufgebauten Backlinks. Die Live-Demo öffnen Sie sofort ohne Login (Oberfläche auf Englisch und Polnisch)."
          beweis="✓ In jedem SEO-Paket ab Tag 1 inklusive · ✓ Öffentliche Demo ohne Registrierung · ✓ EU-Hosting in Frankfurt"
          cta="Projekt & Portal-Zugang anfragen"
        />

        <Abschnitt titel="Kurzantwort: Was zeigt das 24/7-Kundenportal und wie funktioniert die Demo?" id="kurzantwort">
          <AnswerBox etykieta="Kurzantwort">
            <p lang="de" style={{ margin: 0 }}>{PORTAL_KURZANTWORT}</p>
          </AnswerBox>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginTop: '1.5rem' }}>
            <a
              href={PORTAL_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-cta="de_portal_demo_top"
            >
              Live-Demo ohne Login öffnen (EN / PL)
            </a>
            <span lang="de" style={{ fontSize: '0.92rem', color: 'var(--w-tusz-2)' }}>
              Direktzugriff auf <code>panel.ai-seo-company.pl/demo</code> mit Beispieldaten, ohne Konto oder E-Mail-Angabe.
            </span>
          </div>
          <div style={{ marginTop: '1.75rem' }}>
            <Image
              src="/images/panel/przeglad.webp"
              alt="Übersichtsansicht im Kundenportal mit Beispieldaten"
              width={1600}
              height={1025}
              sizes="(max-width: 920px) 100vw, 800px"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                borderRadius: '16px',
                border: '1px solid var(--w-linia)',
              }}
            />
          </div>
        </Abschnitt>

        <Karten
          id="kernbereiche"
          szklo
          titel="Vier Kernbereiche gegen die typische Agentur-Blackbox"
          untertitel="Alle Daten stammen unmittelbar aus Ihren eigenen Google-Konten, unserer Code-Historie und dokumentierten Arbeitsstunden."
          items={PORTAL_MODULE}
        />

        <Abschnitt titel="Alle 12 Live-Module im Überblick (inklusive Smartphone-Ansicht)" id="alle-module">
          <Absatz>
            Das Portal läuft direkt im Browser auf Desktop und Smartphone ohne separate App-Installation. Hinweis zur Sprache: Die Benutzeroberfläche des Live-Portals ist auf <strong>Englisch und Polnisch</strong> gehalten; deutschsprachige Inhalte zur Freigabe, Ihre DACH-Keywords und der persönliche Austausch mit unserem Team erfolgen gewohnt auf Deutsch. Diese zwölf Bereiche stehen heute produktiv bereit:
          </Absatz>
          <Liste punkte={PORTAL_ALLE_FUNKTIONEN} />
          <Absatz style={{ marginBottom: 0 }}>
            {maWersjeDe('/pozycjonowanie-w-ai') && (
              <>Wie die wöchentliche Auswertung von 30 Käuferfragen technisch aufgebaut ist, erläutern wir unter <Link href="/pozycjonowanie-w-ai" style={LINK}>Generative Engine Optimization (GEO)</Link>. </>
            )}
            {maWersjeDe('/pozycjonowanie-wizytowki-google') && (
              <>Details zur 14-tägigen 7x7-Kartenmessung finden Sie unter <Link href="/pozycjonowanie-wizytowki-google" style={LINK}>Google Unternehmensprofil optimieren</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <CtaZeile text="Angebot inkl. 24/7-Kundenportal in 24 Std." />

        <Abschnitt szklo titel="Was ein reiner PDF-Monatsbericht verschweigt: Marktvergleich" id="vergleich">
          <Absatz>
            Im Oktober 2026 haben wir die Leistungsbeschreibungen und Preislisten von 17 SEO-Agenturen ausgewertet (Stand: 25.10.2026). Die folgende Gegenüberstellung zeigt den Unterschied zwischen einem klassischen PDF-Bericht einmal im Monat, einem reinen Positions-Tracker und unserem offenen Kundenportal:
          </Absatz>
          <Tabelle
            beschriftung="Reporting-Vergleich: Monatliches PDF vs. reines Ranking-Portal vs. AI SEO COMPANY Portal"
            spalten={['Was Sie als Auftraggeber sehen', 'PDF-Bericht 1x / Monat', 'Typisches Ranking-Portal', 'AI SEO COMPANY Portal']}
            zeilen={PORTAL_VERGLEICH_ZEILEN}
            fussnote="Grundlage: Auswertung öffentlicher Leistungsbeschreibungen von 17 SEO-Agenturen (Stand: 25.10.2026); einzelne Agenturen bieten Teilfunktionen an."
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', marginTop: '1.25rem' }}>
            <a
              href={PORTAL_DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
              data-cta="de_portal_demo_mid"
            >
              Alle Ansichten jetzt in der Live-Demo prüfen
            </a>
          </div>
          <Unterueberschrift>Vorlagen & Paketpreise zum Nachprüfen</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>
            {maWersjeDe('/narzedzia/raport-seo') && (
              <>Welche Kennzahlen zusätzlich in jeden sauberen Monatsbericht gehören, zeigt unsere kostenlose <Link href="/narzedzia/raport-seo" style={LINK}>SEO Report Vorlage als PDF</Link>. </>
            )}
            {maWersjeDe('/cennik-pozycjonowania') && (
              <>Die genauen Paketpreise ab 450 € netto pro Monat vergleichen Sie unter <Link href="/cennik-pozycjonowania" style={LINK}>SEO Kosten</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Abschnitt titel="6 Prüffragen an jedes Agentur-Portal vor der Vertragsunterschrift" id="prueffragen">
          <Absatz>
            Bitten Sie jede Agentur vor Vertragsabschluss um Einblick in ein echtes Demo-Konto mit Beispieldaten und gehen Sie diese sechs Fragen Punkt für Punkt durch:
          </Absatz>
          <Liste
            nummeriert
            punkte={PORTAL_PRUEFFRAGEN.map(([frage, antwort]) => (
              <span key={frage}>
                <strong style={{ color: 'var(--color-text-dark)', fontWeight: 600 }}>{frage}</strong>{' '}
                {antwort}
              </span>
            ))}
          />
          <Unterueberschrift>Sechs faire Vertragsgrundsätze rund um Ihre Daten</Unterueberschrift>
          <Liste punkte={FAIRE_REGELN} />
          <Absatz style={{ marginBottom: 0 }}>
            {maWersjeDe('/porownania/jak-wybrac-agencje-seo') && (
              <>Weitere Entscheidungskriterien vor der Beauftragung finden Sie im Leitfaden <Link href="/porownania/jak-wybrac-agencje-seo" style={LINK}>SEO Agentur finden &amp; auswählen: 12 Fragen vor Vertrag</Link>.</>
            )}
          </Absatz>
        </Abschnitt>

        <Faq eintraege={PORTAL_FAQ} titel="Häufige Fragen zum 24/7-Kundenportal" id="faq" />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
          <ZrodlaDe zrodla={PORTAL_QUELLEN} />
        </div>
      </Seite>
    </>
  );
}
