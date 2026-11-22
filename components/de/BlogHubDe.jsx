// Deutscher Blog-Hub (/de/blog) fuer alle veroeffentlichten DACH-Praxisratgeber (Gruppe de-blog).
// Serverkomponente analog zu components/de/VergleicheHubDe.jsx mit CollectionPage + ItemList JSON-LD,
// AnswerBox ("Kurzantwort"), thematischer Gruppierung, Verweisen auf /de/tools und /de/vergleiche sowie AppleFaq.

import NextLink from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import AppleFaq from '@/components/service/AppleFaq';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { STRONY_DE, hrefDe, urlDe, wpisDe } from '@/lib/stronyDe';
import styles from '@/components/porownania/porownania.module.css';

const BASE = 'https://www.ai-seo-company.pl';
const KLUCZ = '/blog';

const THEMEN_GRUPPEN = [
  {
    id: 'technisches-seo-cwv',
    titel: 'Technisches SEO & CWV',
    beschreibung: 'Crawling, Indexierung, Statuscodes, Canonical-Signale und die offiziellen Grenzwerte der Core Web Vitals (LCP, INP, CLS) im 75. Perzentil.',
  },
  {
    id: 'ki-suche-tools',
    titel: 'KI-Suche & Tools',
    beschreibung: 'Sinnvoller Einsatz von KI-Werkzeugen im SEO-Alltag, Grenzen automatisierter Texterstellung und Schutz vor Googles Spam-Richtlinien.',
  },
  {
    id: 'strategie-content-linkaufbau',
    titel: 'Strategie, Content & Linkaufbau',
    beschreibung: 'Systematische Konkurrenz- und Content-Gap-Analysen, nachhaltiger B2B-Linkaufbau sowie echte Zeitachsen und Daten aus der Google Search Console.',
  },
  {
    id: 'lokales-seo-ux-analytics',
    titel: 'Lokales SEO, UX & Analytics',
    beschreibung: 'Nutzbarkeit und Conversion von B2B-Websites, sauberes GA4-Event-Tracking mit Consent Mode v2 und dauerhafter Aufbau echter Google-Bewertungen.',
  },
];

const ARTIKEL_META_DE = {
  '/blog/technical-seo-audit-checklist': {
    gruppe: 'technisches-seo-cwv',
    lesezeit: '11 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/core-web-vitals-a-pozycje-google': {
    gruppe: 'technisches-seo-cwv',
    lesezeit: '8 Min. Lesezeit',
    stand: '2026-11-19',
    standLabel: '19.11.2026',
  },
  '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': {
    gruppe: 'technisches-seo-cwv',
    lesezeit: '7 Min. Lesezeit',
    stand: '2026-11-19',
    standLabel: '19.11.2026',
  },
  '/blog/ki-fuer-seo': {
    gruppe: 'ki-suche-tools',
    lesezeit: '9 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/analiza-konkurencji-seo-przewodnik': {
    gruppe: 'strategie-content-linkaufbau',
    lesezeit: '10 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/content-gap-analysis': {
    gruppe: 'strategie-content-linkaufbau',
    lesezeit: '11 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': {
    gruppe: 'strategie-content-linkaufbau',
    lesezeit: '10 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/wyniki-wdrozen-seo-2026': {
    gruppe: 'strategie-content-linkaufbau',
    lesezeit: '8 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/how-long-does-seo-take': {
    gruppe: 'strategie-content-linkaufbau',
    lesezeit: '9 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/audyt-ux-strony': {
    gruppe: 'lokales-seo-ux-analytics',
    lesezeit: '10 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/jak-pozyskiwac-opinie-google-poradnik': {
    gruppe: 'lokales-seo-ux-analytics',
    lesezeit: '8 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
  '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik': {
    gruppe: 'lokales-seo-ux-analytics',
    lesezeit: '9 Min. Lesezeit',
    stand: '2026-11-22',
    standLabel: '22.11.2026',
  },
};

const FAQ_BLOG_DE = [
  {
    id: 'fuer-wen-ist-der-seo-blog',
    question: 'Für wen sind die Leitfäden im deutschen SEO Blog geschrieben?',
    answer: 'Alle Artikel richten sich an Geschäftsführer, Marketing-Leitungen und Inhouse-SEO-Teams im B2B-Mittelstand sowie im DACH-Raum. Statt oberflächlicher Allgemeinplätze finden Sie konkrete Prüfkriterien, Schwellenwerte, Schritt-für-Schritt-Workflows und dokumentierte Messdaten für Ihre tägliche Umsetzung.',
  },
  {
    id: 'woher-stammen-daten-und-quellen',
    question: 'Auf welchen Quellen und Messdaten basieren die Artikel?',
    answer: 'Jeder Beitrag verknüpft offizielle Primärdokumentation von Google Search Central, web.dev, Schema.org und W3C mit unseren eigenen Messreihen - etwa aus der Google Search Console, dem Common-Crawl-Linkgraphen, PageSpeed-Medianläufen oder strukturierten Marktstudien mit offenem Abrufdatum.',
  },
  {
    id: 'wie-haengen-blog-tools-und-vergleiche-zusammen',
    question: 'Wie ergänzen sich Blog-Artikel, kostenlose Tools und SEO-Vergleiche?',
    answer: 'Die Blog-Ratgeber erklären Methodik, Grenzwerte und Umsetzung im Detail. Passend dazu bieten unsere kostenlosen Online-Tools und PDF-Vorlagen unter /de/tools direkte Live-Checks und Arbeitsblätter, während die Vergleichsseiten unter /de/vergleiche kaufmännische Entscheidungen zu Agenturwahl, SEA, GEO und CMS abdecken.',
  },
  {
    id: 'wie-oft-werden-leitfaeden-aktualisiert',
    question: 'Wie oft werden bestehende Ratgeber auf Aktualität geprüft?',
    answer: 'Wir überprüfen sämtliche technischen Schwellenwerte, Google-Richtlinien und Tool-Verweise fortlaufend sowie nach relevanten Änderungen in der Google Search Central Dokumentation. Jeder Beitrag weist oben im Kopfbereich transparent das jeweilige Aktualisierungsdatum aus.',
  },
];

const h2Styl = {
  fontSize: 'clamp(1.45rem, 3vw, 1.95rem)',
  lineHeight: 1.14,
  fontWeight: 500,
  letterSpacing: '-0.03em',
  margin: '0 0 0.5rem',
  color: 'var(--w-tusz)',
};

export default function BlogHubDe() {
  const wpis = wpisDe(KLUCZ) || {
    tytul: 'SEO Blog: Ratgeber zu B2B SEO, Technik & KI-Suche',
    h1: 'SEO Blog: Praxis-Ratgeber für SEO, Technik und KI-Suche',
    opis: 'SEO Blog von AI SEO COMPANY: fundierte Ratgeber zu technischem SEO, Core Web Vitals, Linkaufbau, GA4, Google Unternehmensprofil und KI-Sichtbarkeit.',
  };
  const hubUrl = urlDe(KLUCZ) || `${BASE}/de/blog`;

  const alleArtikel = Object.entries(STRONY_DE)
    .filter(([k, w]) => w.grupa === 'de-blog' && k !== '/blog' && Boolean(hrefDe(k)));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${hubUrl}#webpage`,
    url: hubUrl,
    name: wpis.tytul,
    description: wpis.opis,
    inLanguage: 'de-DE',
    isPartOf: { '@id': `${BASE}/#website` },
    publisher: { '@id': `${BASE}/#organization` },
    datePublished: '2026-11-19',
    dateModified: '2026-11-22',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: alleArtikel.length,
      itemListElement: alleArtikel.map(([k, w], i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: urlDe(k) || `${BASE}${hrefDe(k)}`,
        name: w.h1,
      })),
    },
  };

  const gruppenMitArtikeln = THEMEN_GRUPPEN.map((g) => ({
    ...g,
    artikel: alleArtikel.filter(([k]) => (ARTIKEL_META_DE[k]?.gruppe || 'strategie-content-linkaufbau') === g.id),
  })).filter((g) => g.artikel.length > 0);

  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Blog" en="Blog" de="Blog" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '1.75rem' }}>
        <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
          <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> SEO Blog ({alleArtikel.length} Praxis-Ratgeber)
        </div>
        <h1 lang="de" style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.35rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.04em', margin: '0.5rem 0 1rem', color: 'var(--w-tusz)' }}>
          {wpis.h1}
        </h1>
        <BylineDe stand="2026-11-22" style={{ margin: '0 0 1.25rem' }} />

        <AnswerBox etykieta="Kurzantwort">
          <p lang="de" style={{ margin: 0 }}>
            Im deutschen SEO Blog von AI SEO COMPANY finden B2B-Unternehmen {alleArtikel.length} praxiserprobte Leitfäden zu technischem SEO, Core Web Vitals, Konkurrenz- und Content-Gap-Analysen, White-Hat-Linkaufbau, UX, GA4 und KI-Suche. Jeder Beitrag liefert klare Schwellenwerte, dokumentierte Primärquellen und direkte Verknüpfungen zu kostenlosen Prüfwerkzeugen.
          </p>
        </AnswerBox>

        <p lang="de" style={{ margin: '1.25rem 0 1.35rem', fontSize: '1.08rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', maxWidth: '820px' }}>
          Alle Leitfäden sind aus der täglichen Projektarbeit unseres Teams entstanden: mit überprüfbaren Zahlen aus der Google Search Console, klaren Abnahmekriterien für Entwicklung und Redaktion sowie sauber getrennten Empfehlungen für klassische Google-Rankings und Zitate in KI-Antworten.
        </p>

        <nav aria-label="Themenbereiche im SEO Blog" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          {gruppenMitArtikeln.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.42rem 0.9rem',
                borderRadius: '999px',
                border: '1px solid var(--w-linia)',
                backgroundColor: 'var(--w-karta)',
                color: 'var(--w-tusz)',
                fontFamily: 'var(--w-mono)',
                fontSize: '0.78rem',
                textDecoration: 'none',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              <span>{g.titel}</span>
              <span style={{ color: 'var(--w-pomarancz-tekst)', fontWeight: 600 }}>{String(g.artikel.length).padStart(2, '0')}</span>
            </a>
          ))}
          <a
            href="#faq"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '0.42rem 0.9rem',
              borderRadius: '999px',
              border: '1px solid var(--w-linia)',
              backgroundColor: 'var(--w-karta)',
              color: 'var(--w-tusz)',
              fontFamily: 'var(--w-mono)',
              fontSize: '0.78rem',
              textDecoration: 'none',
            }}
          >
            Häufige Fragen
          </a>
        </nav>
      </div>

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '2.25rem', paddingBottom: '3rem' }}>
        {gruppenMitArtikeln.map((gruppe) => (
          <div key={gruppe.id} id={gruppe.id} role="region" aria-labelledby={`${gruppe.id}-h2`} style={{ scrollMarginTop: '110px' }}>
            <h2 id={`${gruppe.id}-h2`} lang="de" style={h2Styl}>
              {gruppe.titel}
            </h2>
            <p lang="de" style={{ margin: '0 0 1.15rem', fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--w-tusz-2)', maxWidth: '780px' }}>
              {gruppe.beschreibung}
            </p>
            <div className={styles.siatkaKart}>
              {gruppe.artikel.map(([k, w]) => {
                const zielHref = hrefDe(k);
                const meta = ARTIKEL_META_DE[k] || {
                  lesezeit: '9 Min. Lesezeit',
                  stand: '2026-11-22',
                  standLabel: '22.11.2026',
                };
                return (
                  <article key={k} className={styles.kartaPorownania}>
                    <span
                      style={{
                        fontFamily: 'var(--w-mono)',
                        fontSize: '0.74rem',
                        fontWeight: 500,
                        color: 'var(--w-pomarancz-tekst)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                      }}
                    >
                      {gruppe.titel}
                    </span>
                    <h3 className={styles.kartaTytul} lang="de">
                      <NextLink href={zielHref}>{w.h1}</NextLink> <span aria-hidden="true">→</span>
                    </h3>
                    <p lang="de" style={{ margin: 0, fontSize: '0.98rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                      {w.opis}
                    </p>
                    <p className={styles.kartaMeta} style={{ fontVariantNumeric: 'tabular-nums' }}>
                      {`${meta.lesezeit} · Stand: `}
                      <time data-lastmod="pomin" dateTime={meta.stand}>{meta.standLabel}</time>
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        ))}

        <div id="werkzeuge-und-vergleiche" className={styles.karta} role="region" aria-labelledby="werkzeuge-und-vergleiche-h2">
          <h2 id="werkzeuge-und-vergleiche-h2" lang="de" style={h2Styl}>
            Direkt weiterarbeiten: Kostenlose SEO-Tools &amp; Entscheidungsvergleiche
          </h2>
          <p lang="de" className={styles.tresc}>
            Alle Methoden aus unseren Ratgebern lassen sich ohne Registrierung an Ihrer eigenen Domain gegenprüfen oder für Budget- und Systementscheidungen vertiefen:
          </p>
          <ul lang="de" className={styles.tresc}>
            <li>
              <NextLink href="/de/tools">Kostenlose SEO-Tools &amp; PDF-Vorlagen</NextLink>: 13 interaktive Online-Prüfer (SEO-Audit nach 49 Regeln, KI-Sichtbarkeit in ChatGPT, KI-Crawler-Test, Core-Web-Vitals-Vergleich, ROI-Rechner in Euro) sowie druckfertige Checklisten und Arbeitsblätter.
            </li>
            <li>
              <NextLink href="/de/vergleiche">Unabhängige SEO- &amp; CMS-Vergleiche</NextLink>: Fundierte Gegenüberstellungen zu SEO vs. GEO, SEO oder Google Ads (SEA), Agentur vs. Freelancer sowie Next.js, Webflow und WordPress über 24 Monate.
            </li>
            <li>
              <NextLink href="/de/seo-audit">Technisches &amp; inhaltliches SEO Audit</NextLink> sowie <NextLink href="/de/ki-suchoptimierung">Generative Engine Optimization (GEO)</NextLink>: Wenn unser Team Analyse, Priorisierung und laufende Umsetzung für Ihr Unternehmen übernehmen soll.
            </li>
          </ul>
        </div>
      </div>

      <AppleFaq
        faqData={faqFuerAppleFaq(FAQ_BLOG_DE)}
        title="Häufige Fragen zu unserem SEO Blog"
        sectionId="faq"
      />

      <Contact isMainContent />
      <Footer />
    </main>
  );
}
