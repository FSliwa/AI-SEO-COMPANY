import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Tabelle, Karten, CtaZeile, Faq } from './UslugiBausteine';
import ServiceSchema from '@/components/ServiceSchema';
import { Link } from '@/i18n/routing';
import { AUDIT_BEREICHE, AUDIT_PRUEFFELDER, AUDIT_BEFUNDE, AUDIT_VARIANTEN, AUDIT_FAQ } from '@/lib/de/seoAudit';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';

const LNK = { textDecoration: 'underline', fontWeight: 600 };

export default function SeoAuditDe() {
  const w = wpisDe('/audyt-seo');
  return (
    <>
      <ServiceSchema variant="audyt-seo" />
      <Seite krumen="SEO Audit">
        <Hero
          kicker="SEO Audit"
          h1={w.h1}
          lead={`Ein SEO Audit zeigt, warum Ihre Website in Google nicht sichtbar genug ist: technisches Audit Ihrer Website oder Ihres Shops in 3 bis 5 Werktagen, mehr als 50 Prüfpunkte, jeder Fehler mit Priorität und Anleitung zur Behebung für Ihren Entwickler. Kein PDF mit 90 Seiten, sondern eine Maßnahmenliste, die jemand liest. Angebot innerhalb von 24 Stunden, ohne Vertriebsgespräch.`}
          cta="SEO Audit anfragen"
        />
        <Karten titel="Prüfbereiche des SEO Audits" untertitel="Technische, strukturelle und semantische Prüfung Ihrer Website in drei Bereichen." items={AUDIT_BEREICHE} />
        <Karten titel="Was wir im SEO Audit im Einzelnen prüfen" untertitel="Die wichtigsten Kennzahlen und Fehlerbilder, die wir bei jedem Audit untersuchen." items={AUDIT_PRUEFFELDER} spalten={260} />
        <CtaZeile />

        <Abschnitt titel="SEO Audit: Ablauf in vier Schritten" id="ablauf">
          <Liste_ />
        </Abschnitt>

        <Karten titel="Was ein SEO Audit typischerweise aufdeckt" untertitel="Häufige technische Fehler aus Audits und wie wir sie beseitigen. Die Befunde sind typische Szenarien, keine Ergebnisse einzelner Kunden." items={AUDIT_BEFUNDE} />

        <Abschnitt titel="SEO Audit: Preis und Varianten" id="preise">
          <Absatz>Der Preis hängt davon ab, ob Sie nur die Diagnose oder die Diagnose samt Umsetzung brauchen. Die drei Varianten, in denen wir ein Audit durchführen, finden Sie in der Tabelle. Vor dem Angebot beurteilen wir Ihre Website und den Umfang kostenlos; das vollständige Audit mit Bericht ist kostenpflichtig, wie in der Tabelle angegeben.</Absatz>
          <Tabelle
            beschriftung="Varianten des Audits: Preis netto, Dauer und Umfang"
            spalten={['Variante', 'Preis (netto)', 'Dauer', 'Das erhalten Sie']}
            zeilen={AUDIT_VARIANTEN}
            fussnote="Preise in Euro, netto zuzüglich gesetzlicher Umsatzsteuer. Stand: November 2026."
          />
          <Unterueberschrift>Website-Audit und SEO Audit</Unterueberschrift>
          <Absatz style={{ marginBottom: 0 }}>Ein Website-Audit ist der weitere Begriff: Er kann auch Nutzbarkeit, Barrierefreiheit und Sicherheit umfassen. Das SEO Audit einer Website prüft das, was über die Sichtbarkeit in Google entscheidet: Indexierung, Geschwindigkeit, Überschriftenstruktur, Inhalte und Links. {maWersjeDe('/cennik-pozycjonowania') && <>Die Betreuungspakete mit enthaltenem Audit finden Sie unter <Link href="/cennik-pozycjonowania" style={LNK}>SEO Kosten</Link>. </>}{maWersjeDe('/narzedzia/audyt-seo') && <>Für einen ersten Überblick gibt es das <Link href="/narzedzia/audyt-seo" style={LNK}>kostenlose SEO Audit</Link> als Online-Tool.</>}</Absatz>
        </Abschnitt>

        <Faq eintraege={AUDIT_FAQ} titel="Häufige Fragen zum SEO Audit" />
      </Seite>
    </>
  );
}

function Liste_() {
  const schritte = [
    ['Zugänge und Ziel', 'Sie geben uns Zugriff auf Google Search Console und Analytics (und, wenn vorhanden, auf CMS und Hosting-Angaben). Wir klären, welche Seiten und Keywords geschäftlich zählen.'],
    ['Analyse', 'Wir prüfen mehr als 50 Punkte in drei Bereichen: Technik und Core Web Vitals, Inhalte und Semantik, Linkprofil. Die Ergebnisse stellen wir den Daten aus Ihrer Search Console gegenüber.'],
    ['Bericht', 'Sie erhalten die Fehler mit Einschätzung der Wirkung, die betroffenen URLs und technische Empfehlungen, die Ihr Entwickler direkt umsetzen kann, sortiert nach Wirkung und Aufwand.'],
    ['Besprechung', 'Wir gehen den Bericht gemeinsam durch und legen die Reihenfolge der Umsetzung fest. Auf Wunsch setzen wir die Korrekturen im Rahmen der Betreuung um.'],
  ];
  return (
    <ol lang="de" style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.9rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
      {schritte.map(([t, x]) => <li key={t}><strong>{t}:</strong> {x}</li>)}
    </ol>
  );
}
