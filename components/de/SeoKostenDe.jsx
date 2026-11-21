import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Liste, Tabelle, Preise, Referenzen, CtaZeile, Faq, LINK } from './UslugiBausteine';
import { Link } from '@/i18n/routing';
import { PREISE, FAIRE_REGELN, TOP3_REGELN, PREIS_HINWEIS } from '@/lib/de/uslugiGemeinsam';
import { KOSTEN_FAQ, KOSTEN_BEISPIELE } from '@/lib/de/seoKosten';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';
import { eur } from '@/lib/formatDe';

const e = (n) => eur(n, 'de');

export default function SeoKostenDe() {
  const w = wpisDe('/cennik-pozycjonowania');
  return (
    <Seite krumen="SEO Kosten">
      <Hero
        kicker="SEO Kosten 2026"
        h1={w.h1}
        lead={`SEO Kosten bei AI SEO COMPANY: SEO Standard startet bei ${e(PREISE.standard)} netto pro Monat, SEO Premium kostet ${e(PREISE.premium)} netto pro Monat. Das Booster Pack (${e(PREISE.booster)} netto pro Monat, mindestens 3 Monate) enthält zusätzlich eine neue Website. Monatsvertrag ohne lange Bindung und ohne versteckte Gebühren: Unten finden Sie alle Pakete mit Leistungsumfang.`}
        cta="Angebot anfragen - Antwort in 24 Stunden"
      />

      <Preise />

      <Abschnitt titel="Was enthalten die SEO-Pakete?">
        <Absatz>Mit den Paketen von AI SEO COMPANY wissen Sie vorab, was Sie monatlich zahlen. Die Preise sind so aufgebaut, dass sie sowohl für lokale B2C-Unternehmen als auch für B2B-Unternehmen mit überregionalem Geschäft passen.</Absatz>
        <Absatz>Wir beschränken uns nicht auf das Setzen von Links. Jedes Paket enthält ein professionelles technisches Audit, die Erstellung eigener Inhalte, eine Linkaufbau-Strategie für B2B und die Optimierung der Core Web Vitals.</Absatz>
        <Unterueberschrift>Warum transparente Pakete?</Unterueberschrift>
        <Absatz>Wir arbeiten ohne Aktivierungs- und Ausstiegsgebühren und ohne mehrjährige Bindung. Ein klarer, einfacher Preis ist die Grundlage einer partnerschaftlichen Zusammenarbeit.</Absatz>
        <Absatz style={{ marginBottom: 0 }}>Jede Branche hat ihre Besonderheiten, eine eigene Zielgruppe und einen eigenen Entscheidungszyklus. Deshalb gehen wir flexibel an die Strategie unserer Kunden heran. Gemeinsam legen wir die wichtigsten Conversion-Ziele fest und richten Ihr Angebot darauf aus, die passenden Interessenten zu erreichen, wenn sie sich für einen Kauf entscheiden.</Absatz>
      </Abschnitt>
      <CtaZeile />

      <Abschnitt titel="Suchmaschinenoptimierung Kosten: Preise pro Monat" id="ueberblick">
        <Absatz>Die Suchmaschinenoptimierung Kosten richten sich nach dem monatlichen Leistungsumfang: Bei uns startet SEO Standard bei {e(PREISE.standard)} netto pro Monat, SEO Premium kostet {e(PREISE.premium)} netto pro Monat. Das Booster Pack ({e(PREISE.booster)} netto pro Monat, mindestens 3 Monate Laufzeit) enthält zusätzlich eine neue Website. Damit sind die laufenden Kosten der SEO Optimierung vorab klar kalkulierbar; alle Beträge sind Nettopreise in Euro zuzüglich gesetzlicher Umsatzsteuer.</Absatz>
        <Unterueberschrift>Kosten SEO Optimierung und SEO Preise im Überblick</Unterueberschrift>
        <Tabelle
          beschriftung="Leistungen und Preise (netto)"
          spalten={['Leistung', 'Preis', 'Laufzeit und Umfang']}
          zeilen={[
            ['SEO Standard', `ab ${e(PREISE.standard)} / Monat`, 'Monatsvertrag; bis zu 20 Keywords, 2 Inhalte, 2 Links pro Monat'],
            ['SEO Premium', `${e(PREISE.premium)} / Monat`, 'Monatsvertrag; bis zu 50 Keywords, 4 Inhalte, 4 Links pro Monat'],
            ['Booster Pack', `${e(PREISE.booster)} / Monat`, 'mindestens 3 Monate; neue Website und vollständige SEO-Betreuung'],
            ['SEO Audit (eigenständig)', `ab ${e(PREISE.audit)}`, 'einmalig; 3 bis 5 Werktage'],
            ['KI-Sichtbarkeit Audit', e(PREISE.geoAudit), 'einmalig; wird auf den ersten Monatsbeitrag angerechnet'],
            ['KI-Sichtbarkeit zu SEO Standard', `+${e(PREISE.geoZuschlag)} / Monat`, 'in SEO Premium enthalten'],
            ['Website (Next.js)', `ab ${e(PREISE.website)}`, 'einmalig; im Booster Pack im Monatspreis enthalten'],
          ]}
          fussnote={PREIS_HINWEIS}
        />
        <Unterueberschrift>Rechenbeispiele</Unterueberschrift>
        <Tabelle
          beschriftung="Was die Pakete über die Laufzeit kosten (netto)"
          spalten={['Beispiel', 'Rechnung', 'Summe']}
          zeilen={KOSTEN_BEISPIELE}
        />
        <Absatz style={{ marginBottom: 0 }}>Auf das einzelne Keyword gerechnet: SEO Standard bietet bis zu 20 Keywords, das sind rechnerisch {e(PREISE.standard / 20)} netto je Keyword und Monat. SEO Premium bietet bis zu 50 Keywords, das sind rechnerisch {e(Math.round((PREISE.premium / 50) * 100) / 100)} netto je Keyword und Monat. Dass Keywords in die Top 10 kommen, berechnen wir nicht zusätzlich.</Absatz>
      </Abschnitt>

      <Abschnitt titel="Wovon die SEO Kosten abhängen" id="preisfaktoren">
        <Absatz>Wer SEO Preise vergleicht, sollte nicht nur auf den Monatsbetrag schauen. Drei Faktoren bestimmen, wie viel Arbeit hinter einem Paket steckt:</Absatz>
        <Liste punkte={[
          'Konkurrenz: Je umkämpfter die Keywords, auf die Sie ranken möchten, desto mehr Inhalte und Links sind nötig.',
          'Technischer Zustand: Hat die Website Probleme bei Indexierung, Ladezeit oder Struktur, beginnt die Arbeit mit einem Audit und den Korrekturen.',
          'Umfang der Inhalte: Eine Domain ohne Historie braucht mehr neue Inhalte als eine Website mit etabliertem Linkprofil.',
        ]} />
        <Unterueberschrift>Günstige Angebote: Worauf Sie achten sollten</Unterueberschrift>
        <Absatz>Sehr günstige Angebote sparen meist an dem, was im Bericht nicht auffällt: an Inhalten, an Links von Websites mit echtem Traffic und an technischen Korrekturen. Prüfen Sie vor dem Preisvergleich <a href="#faire-vertraege" style={LINK}>im Vertrag</a> drei Punkte: wie viele Keywords und Inhalte Sie pro Monat erhalten, ob die Google-Konten auf Ihr Unternehmen angelegt sind und wie lange die Kündigungsfrist ist.</Absatz>
        <Unterueberschrift>Was wir für ein Angebot brauchen</Unterueberschrift>
        <Absatz>Für ein Angebot genügen die Adresse Ihrer Website, die Liste der Leistungen oder Kategorien, die Sie bewerben möchten, und Ihr Einzugsgebiet: Stadt, Region oder ein ganzes Land. Daraus bestimmen wir das passende Paket und die Zahl der Keywords. Hat die Website technische Probleme, beginnen wir mit einem {maWersjeDe("/audyt-seo") ? <Link href="/audyt-seo" style={LINK}>SEO Audit</Link> : "SEO Audit"}, das in jedem Paket enthalten ist.</Absatz>
      </Abschnitt>

      <section id="faire-vertraege" style={{ padding: '0 0 64px 0', scrollMarginTop: '110px' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.5rem, 5vw, 3rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
            <h2 lang="de" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Fairer Vertrag: sechs Grundsätze</h2>
            <Liste nummeriert punkte={FAIRE_REGELN} />
          </div>
          <div id="ziel-top-3" style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.5rem, 5vw, 3rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', scrollMarginTop: '110px' }}>
            <h2 lang="de" style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)' }}>Ziel Top 3: So messen wir es</h2>
            <Liste punkte={TOP3_REGELN} />
          </div>
        </div>
      </section>

      <Referenzen ids={['staniax', 'madamethai']} titel="Was SEO bei unseren Kunden bewirkt hat" />

      <Faq eintraege={KOSTEN_FAQ} titel="Häufige Fragen zu den SEO Kosten" />
    </Seite>
  );
}
