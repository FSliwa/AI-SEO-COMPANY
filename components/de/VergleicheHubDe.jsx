// Deutscher Vergleichs-Hub (/de/vergleiche), analog zu components/porownania/PorownaniaHub.jsx.
// Verbindet alle 6 veröffentlichten DACH-Vergleichsseiten (SEO vs GEO, SEO oder Google Ads,
// Agentur vs Freelancer vs Inhouse, Next.js vs WordPress, Webflow vs WordPress, Programmierte Website vs Baukasten)
// in einer Hub-and-Spoke-Architektur mit CollectionPage + ItemList JSON-LD und Entscheidungstabelle.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import CompareTable from '@/components/CompareTable';
import { BlokCta } from '@/components/porownania/PorownanieLayout';
import { BylineDe } from '@/components/de/GeoBausteineDe';
import { Link } from '@/i18n/routing';
import { POROWNANIA_DE, dataDeDluga } from '@/lib/porownania.de';
import { urlDe, wpisDe, maWersjeDe } from '@/lib/stronyDe';
import styles from '@/components/porownania/porownania.module.css';

const BASE = 'https://www.ai-seo-company.pl';
const KLUCZ = '/porownania';

const ENTSCHEIDUNGEN_DE = {
  'seo-vs-geo': {
    frage: 'Reicht klassisches Google-SEO oder brauchen wir KI-Sichtbarkeit (GEO) in ChatGPT & AI Overviews?',
    kurz: 'SEO sichert Klicks aus Google & Maps; GEO sorgt für Markennennungen in ChatGPT, Perplexity und AI Overviews (nur ~25 % Überschneidung mit Top 10).',
  },
  'seo-czy-google-ads': {
    frage: 'Budget in SEO oder Google Ads (SEA) investieren - oder beides kombinieren?',
    kurz: 'Google Ads liefert Klicks ab Tag 1, stoppt aber bei Budgetende sofort; SEO baut dauerhafte organische Sichtbarkeit und 0-€-Klicks auf.',
  },
  'agencja-seo-czy-freelancer': {
    frage: 'SEO-Agentur, freier SEO-Berater (Freelancer) oder eigenes Inhouse-Team?',
    kurz: 'Vergleich von Monatskosten in Euro, Ausfallsicherheit, Tool-Lizenzen, Eigentum an Google-Konten und Kündigungsfristen.',
  },
  'nextjs-vs-wordpress-seo': {
    frage: 'B2B-Website auf WordPress lassen oder auf Next.js (SSR) umstellen?',
    kurz: 'Next.js liefert sauberes Server-HTML für KI-Bots, stabile mobile Core Web Vitals (INP/LCP) und null angreifbare PHP-Plugins.',
  },
  'webflow-vs-wordpress-seo': {
    frage: 'Webflow oder WordPress für mehrsprachiges B2B-SEO und Relaunch?',
    kurz: 'URL-Struktur, CMS-Limits, mehrsprachiges hreflang, DSGVO-Schriften und Gesamtkosten über 24 Monate im direkten Vergleich.',
  },
  'strona-kodowana-czy-kreator-seo': {
    frage: 'Individuell programmierte Next.js-Website oder Homepage-Baukasten (Wix, Squarespace)?',
    kurz: 'Code-Eigentum, mobile Reaktionszeit (INP), Lesbarkeit für KI-Crawler und 24-Monats-Gesamtkosten im Vergleich.',
  },
};

const CTA_DE = {
  tekst: 'Unsicher, welcher Weg zu Ihrer Website passt? Kostenloses Erstgespräch oder SEO Audit ab 350 € netto',
  plan: null,
  linki: [
    { tekst: 'SEO Kosten und Pakete in Euro prüfen', href: '/cennik-pozycjonowania' },
    { tekst: 'Kostenlose SEO- und KI-Tools testen', href: '/narzedzia' },
  ],
};

const h2Styl = {
  fontSize: 'clamp(1.5rem, 3.2vw, 2.05rem)',
  lineHeight: 1.12,
  fontWeight: 500,
  letterSpacing: '-0.035em',
  margin: '0 0 1rem',
  color: 'var(--w-tusz)',
};

export default function VergleicheHubDe() {
  const wpis = wpisDe(KLUCZ) || {
    tytul: 'SEO Vergleich 2026: Agentur, Google Ads, GEO & CMS',
    h1: 'SEO Vergleich: Entscheidungshilfen zu Agentur, SEA, GEO und Technik',
    opis: 'Unabhängiger SEO Vergleich mit Zahlen und Quellen: SEO vs GEO, SEO oder Google Ads (SEA), Agentur oder Freelancer sowie Next.js, Webflow & WordPress.',
  };
  const hubUrl = urlDe(KLUCZ) || `${BASE}/de/vergleiche`;
  const lista = POROWNANIA_DE.filter((p) => maWersjeDe(`/porownania/${p.slug}`));

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
    datePublished: '2026-11-22',
    dateModified: '2026-11-22',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: lista.length,
      itemListElement: lista.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: urlDe(`/porownania/${p.slug}`) || `${BASE}/de/vergleiche/${p.slug}`,
        name: p.nazwaKarty,
      })),
    },
  };

  return (
    <main style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Porównania" en="Comparisons" de="SEO-Vergleiche" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '2rem' }}>
        <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
          <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> SEO-Vergleiche
        </div>
        <h1 lang="de" style={{ fontSize: 'clamp(2.15rem, 5vw, 3.35rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.04em', margin: '0.5rem 0 1rem', color: 'var(--w-tusz)' }}>
          {wpis.h1}
        </h1>
        <BylineDe stand="2026-11-22" style={{ margin: '0 0 1rem' }} />
        <p lang="de" style={{ margin: 0, fontSize: '1.15rem', lineHeight: 1.65, color: 'var(--w-tusz-2)', maxWidth: '760px' }}>
          Sechs fundierte Vergleiche für Geschäftsführer und Marketing-Verantwortliche im DACH-Raum: mit transparenten Kriterien, Euro-Kalkulationen über 24 Monate, Messdaten aus Google Search Console sowie klaren Quellenangaben.
        </p>
      </div>

      <div className="container" style={{ maxWidth: '960px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem', paddingBottom: '3rem' }}>
        <div id="alle-vergleiche" role="region" aria-labelledby="alle-vergleiche-ueberschrift" style={{ scrollMarginTop: '110px' }}>
          <h2 id="alle-vergleiche-ueberschrift" lang="de" style={h2Styl}>Alle SEO- &amp; Technik-Vergleiche</h2>
          <div className={styles.siatkaKart}>
            {lista.map((p) => (
              <div key={p.slug} className={styles.kartaPorownania}>
                <h3 className={styles.kartaTytul} lang="de">
                  <Link href={`/porownania/${p.slug}`}>{p.nazwaKarty}</Link> <span aria-hidden="true">→</span>
                </h3>
                <p lang="de" style={{ margin: 0, fontSize: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                  {p.description}
                </p>
                <p className={styles.kartaMeta}>
                  {`${p.rows?.length || 8} Kriterien · Stand: `}
                  <time data-lastmod="pomin" dateTime={p.updated}>{dataDeDluga(p.updated)}</time>
                </p>
              </div>
            ))}
          </div>
        </div>

        <div id="entscheidungshilfe" className={styles.karta} role="region" aria-labelledby="entscheidungshilfe-ueberschrift">
          <h2 id="entscheidungshilfe-ueberschrift" lang="de" style={h2Styl}>Vor welcher Entscheidung stehen Sie?</h2>
          <CompareTable
            id="tabelle-entscheidung"
            caption="Welcher Vergleich Ihre Frage beantwortet"
            columns={[
              { key: 'frage', label: 'Ihre Frage' },
              { key: 'vergleich', label: 'Vergleich' },
              { key: 'kurz', label: 'Kurzantwort' },
            ]}
            rows={lista.map((p) => {
              const e = ENTSCHEIDUNGEN_DE[p.slug] || { frage: p.h1, kurz: p.description };
              return {
                id: p.slug,
                frage: e.frage,
                vergleich: <Link href={`/porownania/${p.slug}`} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>{p.nazwaKarty}</Link>,
                kurz: e.kurz,
              };
            })}
          />
        </div>

        <div id="methode" className={styles.karta} role="region" aria-labelledby="methode-ueberschrift">
          <h2 id="methode-ueberschrift" lang="de" style={h2Styl}>Wie wir Vergleiche erstellen</h2>
          <p lang="de" className={styles.tresc} style={{ margin: 0 }}>
            Jeder Vergleich benennt offen unser eigenes Geschäftsinteresse: Wir sind eine auf B2B-SEO, Generative Engine Optimization (GEO) und Next.js-Websites spezialisierte Agentur. Deshalb nennen wir keine konkurrierenden Agenturen beim Namen, belegen jede technische Aussage mit offizieller Dokumentation (Google Search Central, web.dev, HTTP Archive, Patchstack) und zeigen klar, in welchen Fällen ein Freelancer, Google Ads oder ein bestehendes CMS die wirtschaftlich bessere Wahl für Ihr Unternehmen ist.
          </p>
        </div>

        <div id="vor-der-wahl" className={styles.karta} role="region" aria-labelledby="vor-der-wahl-ueberschrift">
          <h2 id="vor-der-wahl-ueberschrift" lang="de" style={h2Styl}>Nächste Schritte vor Ihrer Entscheidung</h2>
          <ul lang="de" className={styles.tresc} style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem' }}>
            <li>
              <Link href={{ pathname: '/cennik-pozycjonowania', hash: 'faire-vertraege' }}>Fairer Vertrag: sechs Grundsätze</Link> zu monatlicher Kündbarkeit, Kontoeigentum und transparenten Leistungsumfängen in Euro.
            </li>
            <li>
              <Link href="/narzedzia/kalkulator-strat-seo">SEO-Verlust- und ROI-Rechner in EUR</Link>: Prüfen Sie mit Ihren eigenen Zahlen, ab welchem Monat sich SEO gegenüber entgangenen Anfragen rechnet.
            </li>
            <li>
              <Link href="/narzedzia/audyt-seo">Kostenloser SEO Audit (49 Regeln)</Link>: Testen Sie Technik, mobile Ladezeit und KI-Bot-Zugriff Ihrer aktuellen Website in 30 Sekunden.
            </li>
          </ul>
        </div>
      </div>

      <BlokCta cta={CTA_DE} dataCta="porownania_hub_de_cta" locale="de" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
