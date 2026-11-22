// Deutsche Spoke-Seite /de/ki-suchoptimierung/kosten (F2, 22.11.2026; Schluessel PL: /pozycjonowanie-w-ai/cennik).
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import AppleFaq from '@/components/service/AppleFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { BylineDe } from '@/components/de/GeoBausteineDe';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { PREISE, faqFuerAppleFaq } from '@/lib/de/uslugiGemeinsam';
import { KI_KOSTEN_DE, STAND_KI_KOSTEN_DE } from '@/lib/de/kiKostenDe';

const KLUCZ = '/pozycjonowanie-w-ai/cennik';
const card = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)' };
const tekstStyl = { margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' };
const linkStyl = { textDecoration: 'underline', fontWeight: 600 };

function Verweis({ schluessel, children }) {
  return maWersjeDe(schluessel) ? <Link href={schluessel} style={linkStyl}>{children}</Link> : <>{children}</>;
}

export default function KiKostenDe() {
  const reg = wpisDe(KLUCZ);
  const h1 = reg?.h1 ?? 'Was kostet Generative Engine Optimization (GEO)? Preismodelle und Kosten 2026';
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/ki-suchoptimierung/kosten';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'Generative Engine Optimization (GEO) & KI-Sichtbarkeit Pakete',
    description: reg?.opis ?? KI_KOSTEN_DE.kurzantwort,
    serviceType: 'Generative Engine Optimization',
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
        name: 'Einmaliges KI-Sichtbarkeit Audit (30 Fragen in 4 KI-Quellen)',
        priceCurrency: 'EUR',
        price: PREISE.geoAudit,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.geoAudit,
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'SEO Standard inklusive GEO-Monitoring-Modul',
        priceCurrency: 'EUR',
        price: PREISE.standard + PREISE.geoZuschlag,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.standard + PREISE.geoZuschlag,
          unitCode: 'MON',
          valueAddedTaxIncluded: false,
        },
      },
      {
        '@type': 'Offer',
        name: 'SEO Premium (inklusive wöchentlichem GEO-Monitoring)',
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
    ],
  };

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceDe) }} />
      <Header />
      <Breadcrumbs
        parent={{ href: '/pozycjonowanie-w-ai', pl: 'Pozycjonowanie w AI', en: 'AI SEO (GEO)', de: 'Generative Engine Optimization' }}
        pl={KI_KOSTEN_DE.okruszek}
        en={KI_KOSTEN_DE.okruszek}
        de={KI_KOSTEN_DE.okruszek}
      />

      <section style={{ paddingTop: 'clamp(124px, 14vw, 160px)', paddingBottom: '36px' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {KI_KOSTEN_DE.tag}
            </div>
            <h1 lang="de" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.025em', margin: '0 0 1.2rem', color: 'var(--color-text-dark)', hyphens: 'auto', overflowWrap: 'break-word' }}>
              {h1}
            </h1>
            <BylineDe stand={STAND_KI_KOSTEN_DE} />
            <AnswerBox etykieta="Kurzantwort">
              <p lang="de" style={{ margin: 0 }}>{KI_KOSTEN_DE.kurzantwort}</p>
            </AnswerBox>
            <p lang="de" style={{ ...tekstStyl, marginTop: '1.25rem' }}>
              {KI_KOSTEN_DE.lead}{' '}Den methodischen Rahmen finden Sie auf unserer Hauptseite zu{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai">Generative Engine Optimization (GEO)</Verweis>.
            </p>
            <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href="#kontakt" className="hero-btn-primary" data-cta="ki_kosten_de_hero" data-plan="audyt-ai">
                {KI_KOSTEN_DE.ctaAudit}
              </a>
              <a href="#unsere-preise" className="hero-btn-secondary" data-cta="ki_kosten_de_tabelle">
                {KI_KOSTEN_DE.ctaPakete}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="de-abschnitt" id="marktmodelle">
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">3 Abrechnungsmodelle für GEO im Marktvergleich (2026)</h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gap: '1.2rem' }}>
            <p lang="de" style={tekstStyl}>
              Google betont in seiner offiziellen Dokumentation zu generativen KI-Funktionen, dass es weder bezahlte Einreichungen noch spezielle Pflicht-Tags für AI Overviews gibt: Entscheidend bleiben saubere Indexierung, hilfreiche Inhalte und verlässliche Unternehmenssignale. Je nach interner Aufstellung treffen Sie am Markt auf drei Preismodelle:
            </p>
            <CompareTable
              id={KI_KOSTEN_DE.marktModelleTabelle.id}
              caption={KI_KOSTEN_DE.marktModelleTabelle.caption}
              columns={KI_KOSTEN_DE.marktModelleTabelle.columns}
              rows={KI_KOSTEN_DE.marktModelleTabelle.rows}
              przypis={KI_KOSTEN_DE.marktModelleTabelle.przypis}
            />
          </Reveal>
        </div>
      </section>

      <section className="de-abschnitt" id="kostentreiber">
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Woraus sich die Kosten real zusammensetzen - API-Cents vs. Umsetzung</h2>
          </Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.1rem' }}>
            {KI_KOSTEN_DE.kostenTreiber.map(([titel, text]) => (
              <RevealItem key={titel} style={{ ...card, padding: '1.4rem 1.6rem' }}>
                <h3 lang="de" style={{ fontSize: '1.12rem', fontWeight: 600, margin: '0 0 0.45rem', color: 'var(--color-text-dark)' }}>{titel}</h3>
                <p lang="de" style={tekstStyl}>{text}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ marginTop: '1.25rem' }}>
            <p lang="de" style={tekstStyl}>
              Zwei technische Vorarbeiten erledigen Sie bei uns sogar komplett kostenlos: Prüfen Sie den Zugang von 12 KI-Bots im{' '}
              <Verweis schluessel="/narzedzia/tester-robotow-ai-robots-txt">KI-Crawler- &amp; robots.txt-Prüfer</Verweis>{' '}
              und erstellen Sie Ihre Strukturdatei im <Verweis schluessel="/narzedzia/generator-llms-txt">kostenlosen llms.txt Generator</Verweis>.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="de-abschnitt" id="unsere-preise">
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Unsere veröffentlichten GEO- &amp; KI-SEO-Preise in Euro</h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gap: '1.2rem' }}>
            <CompareTable
              id={KI_KOSTEN_DE.eigenesPreisblatt.id}
              caption={KI_KOSTEN_DE.eigenesPreisblatt.caption}
              columns={KI_KOSTEN_DE.eigenesPreisblatt.columns}
              rows={KI_KOSTEN_DE.eigenesPreisblatt.rows}
              przypis={KI_KOSTEN_DE.eigenesPreisblatt.przypis}
            />
            <p lang="de" style={tekstStyl}>
              Den genauen Ablauf der 30-Fragen-Analyse lesen Sie unter{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai/audyt-widocznosci">KI-Sichtbarkeit Audit</Verweis>, unsere Testergebnisse zu Empfehlungen und Links unter{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai/chatgpt">ChatGPT SEO</Verweis> und alle regulären SEO-Pakete unter{' '}
              <Verweis schluessel="/cennik-pozycjonowania">SEO Kosten</Verweis>. Vorab können Sie jederzeit eine kostenlose Stichprobe im{' '}
              <Verweis schluessel="/sprawdz-widocznosc-w-ai">KI-Sichtbarkeit Check</Verweis> abrufen.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="de-abschnitt" id="prueffragen">
        <div className="container" style={{ maxWidth: '920px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">7 Prüffragen vor dem Kauf einer GEO-Dienstleistung</h2>
          </Reveal>
          <Reveal>
            <CompareTable
              id={KI_KOSTEN_DE.prueffragenTabelle.id}
              caption={KI_KOSTEN_DE.prueffragenTabelle.caption}
              columns={KI_KOSTEN_DE.prueffragenTabelle.columns}
              rows={KI_KOSTEN_DE.prueffragenTabelle.rows}
              przypis={KI_KOSTEN_DE.prueffragenTabelle.przypis}
            />
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={faqFuerAppleFaq(KI_KOSTEN_DE.faq)} title="Häufige Fragen zu GEO-Kosten und Preismodellen" sectionId="faq" />

      <div className="container" style={{ maxWidth: '880px', margin: '0 auto', paddingBottom: '3.5rem' }}>
        <ZrodlaDe zrodla={KI_KOSTEN_DE.quellen} />
      </div>

      <Contact isMainContent={true} />
      <Footer />
    </main>
  );
}
