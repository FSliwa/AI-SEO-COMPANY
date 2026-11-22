// Deutsche Spoke-Seite /de/ki-suchoptimierung/ki-sichtbarkeit-audit (Faza 2 DE, 22.11.2026; Schlüssel PL: /pozycjonowanie-w-ai/audyt-widocznosci).
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
import { KI_AUDIT_DE, STAND_AUDIT_AI_DE } from '@/lib/de/kiSichtbarkeitAudit';

const KLUCZ = '/pozycjonowanie-w-ai/audyt-widocznosci';
const card = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)' };
const tekstStyl = { margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' };
const linkStyl = { textDecoration: 'underline', fontWeight: 600 };

function Verweis({ schluessel, children }) {
  return maWersjeDe(schluessel) ? <Link href={schluessel} style={linkStyl}>{children}</Link> : <>{children}</>;
}

export default function KiSichtbarkeitAuditDe() {
  const reg = wpisDe(KLUCZ);
  const h1 = reg?.h1 ?? 'KI-Sichtbarkeit messen: Audit in ChatGPT, Gemini und Perplexity';
  const url = urlDe(KLUCZ) || 'https://www.ai-seo-company.pl/de/ki-suchoptimierung/ki-sichtbarkeit-audit';

  const serviceDe = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: 'KI-Sichtbarkeit Audit & wöchentliches GEO-Monitoring',
    description: reg?.opis ?? KI_AUDIT_DE.kurzantwort,
    serviceType: 'Generative Engine Optimization Audit',
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
        name: 'KI-Sichtbarkeit Audit (30 Kundenfragen in 4 KI-Systemen)',
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
        name: 'Wöchentliches KI-Sichtbarkeit Monitoring (Zuschlag zu SEO Standard)',
        priceCurrency: 'EUR',
        price: PREISE.geoZuschlag,
        availability: 'https://schema.org/InStock',
        url,
        priceSpecification: {
          '@type': 'UnitPriceSpecification',
          priceCurrency: 'EUR',
          price: PREISE.geoZuschlag,
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
        pl={KI_AUDIT_DE.okruszek}
        en={KI_AUDIT_DE.okruszek}
        de={KI_AUDIT_DE.okruszek}
      />

      <section style={{ paddingTop: 'clamp(124px, 14vw, 160px)', paddingBottom: '36px' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {KI_AUDIT_DE.tag}
            </div>
            <h1 lang="de" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.025em', margin: '0 0 1.2rem', color: 'var(--color-text-dark)', hyphens: 'auto', overflowWrap: 'break-word' }}>
              {h1}
            </h1>
            <BylineDe stand={STAND_AUDIT_AI_DE} />
            <AnswerBox etykieta="Kurzantwort">
              <p lang="de" style={{ margin: 0 }}>{KI_AUDIT_DE.kurzantwort}</p>
            </AnswerBox>
            <p lang="de" style={{ ...tekstStyl, marginTop: '1.25rem' }}>
              {KI_AUDIT_DE.lead}{' '}Das Audit bildet den Startpunkt unserer Betreuung in{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai">Generative Engine Optimization (GEO)</Verweis>.
            </p>
            <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              <a href="#kontakt" className="hero-btn-primary" data-cta="ki_audit_de_hero">
                {KI_AUDIT_DE.ctaAudit}
              </a>
              {maWersjeDe('/sprawdz-widocznosc-w-ai') && (
                <Link href="/sprawdz-widocznosc-w-ai" className="hero-btn-secondary" data-cta="ki_audit_de_checker">
                  {KI_AUDIT_DE.ctaCheck}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="umfang" style={{ padding: '36px 0 48px' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Was wir prüfen: 30 Kundenfragen in 4 Antwortquellen</h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gap: '1.1rem', marginTop: '1.4rem' }}>
            <p lang="de" style={tekstStyl}>
              Gemeinsam mit Ihnen legen wir 30 realistische Fragen fest, die Entscheider und Einkäufer vor einer Anfrage eingeben. Jede Frage prüfen wir standardisiert in vier Systemen: <strong>ChatGPT mit aktivierter Websuche</strong>, <strong>Perplexity</strong>, <strong>Google Gemini</strong> und den <strong>Google AI Overviews</strong>. Im Ergebnisbericht erhalten Sie nach 5 Werktagen:
            </p>
            <ul lang="de" style={{ margin: 0, paddingLeft: '1.3rem', display: 'grid', gap: '0.65rem', fontSize: '1.03rem', lineHeight: 1.6 }}>
              {KI_AUDIT_DE.ergebnisPunkte.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
            <p lang="de" style={tekstStyl}>
              Den technischen Zugang der 12 wichtigsten KI-Bots können Sie vorab jederzeit mit unserem kostenlosen{' '}
              <Verweis schluessel="/narzedzia/tester-robotow-ai-robots-txt">KI-Crawler- und robots.txt-Prüfer</Verweis>{' '}
              sowie im <Verweis schluessel="/narzedzia/audyt-seo">kostenlosen SEO Audit</Verweis> testen.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="fragentypen" style={{ padding: '32px 0 48px' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Wie wir die 30 Fragen strukturieren - und warum das über die Maßnahmen entscheidet</h2>
          </Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.1rem', marginTop: '1.5rem' }}>
            {KI_AUDIT_DE.fragenTypen.map(([titel, text]) => (
              <RevealItem key={titel} style={{ ...card, padding: '1.4rem 1.6rem' }}>
                <h3 lang="de" style={{ fontSize: '1.12rem', fontWeight: 600, margin: '0 0 0.45rem', color: 'var(--color-text-dark)' }}>{titel}</h3>
                <p lang="de" style={tekstStyl}>{text}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ marginTop: '1.25rem' }}>
            <p lang="de" style={tekstStyl}>
              Fehlt Ihr Unternehmen bei lokalen Empfehlungsfragen, setzen wir zuerst beim{' '}
              <Verweis schluessel="/pozycjonowanie-wizytowki-google">Google Unternehmensprofil</Verweis> und den Branchenverzeichnissen an. Fehlt es bei Preis- und Vergleichsfragen, bauen wir gezielt zitierfähige Angebots- und Vergleichsseiten auf Ihrer Website aus (mehr dazu unter{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai/chatgpt">ChatGPT SEO in 7 Schritten</Verweis>).
            </p>
          </Reveal>
        </div>
      </section>

      <section id="vergleich" style={{ padding: '36px 0 56px' }}>
        <div className="container" style={{ maxWidth: '940px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Schnell-Check, einmaliges Audit oder wöchentliches Monitoring?</h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gap: '1.2rem', marginTop: '1.4rem' }}>
            <CompareTable
              id={KI_AUDIT_DE.vergleichTabelle.id}
              caption={KI_AUDIT_DE.vergleichTabelle.caption}
              columns={KI_AUDIT_DE.vergleichTabelle.columns}
              rows={KI_AUDIT_DE.vergleichTabelle.rows}
              przypis={KI_AUDIT_DE.vergleichTabelle.przypis}
            />
            <p lang="de" style={tekstStyl}>
              Das einmalige Audit genügt, wenn Ihr eigenes Marketing- oder Entwicklerteam die 10 empfohlenen Maßnahmen selbst umsetzt und nach einem Quartal erneut misst. Wenn wir die Umsetzung für Sie übernehmen sollen, sehen Sie im wöchentlichen Monitoring in unserem Kundenportal nach jeder neuen Drittquellen-Erwähnung und jeder neuen Unterseite, wie sich Ihr Anteil in den KI-Antworten verändert. Alle Paketpreise finden Sie transparent unter{' '}
              <Verweis schluessel="/cennik-pozycjonowania">SEO Kosten</Verweis>.
            </p>
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={faqFuerAppleFaq(KI_AUDIT_DE.faq)} title="Häufige Fragen zum KI-Sichtbarkeit Audit" sectionId="faq" />

      <section style={{ padding: '0 0 3.5rem' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <ZrodlaDe zrodla={KI_AUDIT_DE.quellen} />
        </div>
      </section>

      <Contact isMainContent={true} />
      <Footer />
    </main>
  );
}
