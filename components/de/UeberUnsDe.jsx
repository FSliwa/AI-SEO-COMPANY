import { Seite, Hero, Abschnitt, Absatz, Unterueberschrift, Karten, CtaZeile, Tabelle } from './UslugiBausteine';
import { ENTITAET, GRUNDSAETZE, METHODE, TEAM, WERTE } from '@/lib/de/ueberUns';
import { FIRMA, KONTAKT } from '@/lib/de/uslugiGemeinsam';
import { wpisDe, maWersjeDe } from '@/lib/stronyDe';
import { Link } from '@/i18n/routing';
import { PROFILE_FIRMY } from '@/lib/firma';

const AUTOR_ID = 'https://www.ai-seo-company.pl/o-nas#filip-sliwa';

export default function UeberUnsDe() {
  const w = wpisDe('/o-nas');
  const autorSameAs = [PROFILE_FIRMY.linkedinAutor, PROFILE_FIRMY.githubAutor].filter(Boolean);
  const person = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTOR_ID,
    name: 'Filip Śliwa',
    givenName: 'Filip',
    familyName: 'Śliwa',
    jobTitle: 'SEO-Spezialist',
    url: 'https://www.ai-seo-company.pl/de/ueber-uns',
    email: KONTAKT.mail,
    worksFor: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    knowsAbout: ['Suchmaschinenoptimierung', 'Technisches SEO', 'Lokales SEO', 'Webanalyse', 'Generative Engine Optimization (GEO)'],
    ...(autorSameAs.length ? { sameAs: autorSameAs } : {}),
  };
  return (
    <Seite krumen="Über uns">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }} />
      <Hero kicker="Über uns" h1={w.h1} lead={ENTITAET} cta="Kontakt aufnehmen" />
      <Karten titel="Wir arbeiten datenbasiert und legen offen, was wir tun" untertitel="Fünf Grundsätze, nach denen wir arbeiten." items={GRUNDSAETZE} spalten={280} />
      <Karten titel="Unsere Methode in drei Schritten" untertitel="So führen wir Marken in den Suchergebnissen nach vorn." items={METHODE} />
      <Karten titel="Die Menschen hinter Ihrem SEO" untertitel="Die drei Säulen unseres Teams in Technik, Gestaltung und Optimierung." items={TEAM.map((t) => ({ kicker: t.kicker, titel: t.titel, text: `${t.text} (${t.rolle}; ${t.plakette})` }))} />

      <Abschnitt titel="Filip Śliwa: Wer Ihr SEO betreut" id="autor">
        <p lang="de" style={{ fontSize: '1.05rem', color: 'var(--w-tusz-2)', fontWeight: 500, margin: '0 0 1.25rem' }}>SEO-Spezialist, AI SEO COMPANY</p>
        <Absatz>Filip Śliwa ist SEO-Spezialist bei AI SEO COMPANY und Autor der Ratgeber auf unserem Blog (polnisch und englisch). Er arbeitet an technischem SEO, lokaler Sichtbarkeit und Analytik für B2B-Unternehmen: Audits, Indexierung, Core Web Vitals, Google Unternehmensprofil und die Einrichtung der Anfragemessung.</Absatz>
        <Absatz>Wir arbeiten ohne Vertriebsmitarbeiter: Auf Nachrichten antworten wir innerhalb von 24 Stunden an Werktagen, und die Antwort kommt von der Person, die das SEO Ihrer Website betreut. Was wir getan haben, sehen Sie im Kundenportal: ein Arbeitsprotokoll mit Datum, verständliche Beschreibungen der Änderungen an der Website und die Liste der gewonnenen Links.</Absatz>
        <Absatz>Jede Methode erproben wir zuerst auf ai-seo-company.pl: eine Seitenarchitektur nach Keyword-Gruppen, polnische und englische Version, verknüpft über hreflang, und strukturierte Daten. Ergebnisse zeigen wir als Daten, nicht als Behauptungen: Die Referenzen auf unserer Startseite enthalten Screenshots aus der Google Search Console mit dem Messzeitraum jedes Projekts. Verkaufsdaten unserer Kunden veröffentlichen wir nicht, nur die Sichtbarkeit, die Sie selbst nachprüfen können.</Absatz>
        <Absatz style={{ marginBottom: 0 }}>
          Kontakt: <a href={`mailto:${KONTAKT.mail}`} style={{ textDecoration: 'underline' }}>{KONTAKT.mail}</a>, Telefon <a href={KONTAKT.telHref} style={{ textDecoration: 'underline' }} data-cta="de_ueber_uns_tel">{KONTAKT.tel}</a>
          {PROFILE_FIRMY.linkedinAutor ? <>{', '}<a href={PROFILE_FIRMY.linkedinAutor} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }} data-cta="de_ueber_uns_linkedin">LinkedIn</a></> : null}
          {PROFILE_FIRMY.githubAutor ? <>{', '}<a href={PROFILE_FIRMY.githubAutor} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }} data-cta="de_ueber_uns_github">GitHub</a></> : null}
        </Absatz>
      </Abschnitt>

      <Karten titel="Unsere Werte" untertitel="Die Grundsätze, nach denen wir Erfolg aufbauen." items={WERTE} />

      <Abschnitt titel="Unternehmensdaten" id="unternehmensdaten">
        <Absatz>AI SEO COMPANY ist eine Marke der folgenden Gesellschaft polnischen Rechts (die vollständige Anbieterkennzeichnung steht im {maWersjeDe('/impressum') ? <Link href="/impressum" style={{ textDecoration: 'underline' }}>Impressum</Link> : 'Impressum'}):</Absatz>
        <Tabelle
          beschriftung="Angaben zum Unternehmen"
          spalten={['Angabe', 'Wert']}
          zeilen={[
            ['Marke', FIRMA.marke],
            ['Unternehmen', FIRMA.rechtsname],
            ['Sitz der Gesellschaft', `${FIRMA.strasse}, ${FIRMA.ort}`],
            ['Büroanschrift', FIRMA.buero],
            ['Registergericht', FIRMA.gericht],
            ['KRS', FIRMA.krs],
            ['NIP', FIRMA.nip],
            ['REGON', FIRMA.regon],
            ['Telefon', <a key="t" href={KONTAKT.telHref} style={{ textDecoration: 'underline' }}>{KONTAKT.tel}</a>],
            ['E-Mail', <a key="m" href={`mailto:${KONTAKT.mail}`} style={{ textDecoration: 'underline' }}>{KONTAKT.mail}</a>],
            ['Erreichbarkeit', 'Montag bis Freitag, 9 bis 18 Uhr (MEZ); Antwort auf Anfragen innerhalb von 24 Stunden an Werktagen, meist schneller'],
          ]}
        />
      </Abschnitt>
    </Seite>
  );
}
