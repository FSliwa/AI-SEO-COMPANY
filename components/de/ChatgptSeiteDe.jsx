// Deutsche Spoke-Seite /de/ki-suchoptimierung/chatgpt (Faza 2 DE, 19.11.2026; klucz PL: /pozycjonowanie-w-ai/chatgpt).
// Serverkomponente im gleichen Stil wie GeoSeiteDe.jsx: AnswerBox, BylineDe, CompareTable der eigenen API-Messung
// vom 04.-05.11.2026, 7 Umsetzungsschritte, AppleFaq (FAQPage JSON-LD), ZrodlaDe, Contact und Footer.

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleSchema from '@/components/ArticleSchema';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import AppleFaq from '@/components/service/AppleFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { CHATGPT_DE, STAND_CHATGPT_DE } from '@/lib/de/chatgpt';

const KLUCZ = '/pozycjonowanie-w-ai/chatgpt';
const card = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: 'var(--w-promien-karta)' };
const tekstStyl = { margin: 0, fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' };
const linkStyl = { textDecoration: 'underline' };

function Verweis({ schluessel, children }) {
  return maWersjeDe(schluessel) ? <Link href={schluessel} style={linkStyl}>{children}</Link> : <>{children}</>;
}

export default function ChatgptSeiteDe() {
  const reg = wpisDe(KLUCZ);
  const h1 = reg?.h1 ?? 'ChatGPT SEO: Wie Ihr Unternehmen in ChatGPT empfohlen wird';

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs
        parent={{ href: '/pozycjonowanie-w-ai', pl: 'Pozycjonowanie w AI', en: 'AI SEO (GEO)', de: 'Generative Engine Optimization' }}
        pl={CHATGPT_DE.okruszek}
        en={CHATGPT_DE.okruszek}
        de={CHATGPT_DE.okruszek}
      />
      <ArticleSchema
        type="Article"
        locale="de"
        breadcrumb={null}
        url="/de/ki-suchoptimierung/chatgpt"
        title={h1}
        description={reg?.opis ?? CHATGPT_DE.kurzantwort}
        datePublished={STAND_CHATGPT_DE}
        dateModified={STAND_CHATGPT_DE}
      />

      <section className="sekcja-po-okruszkach">
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {CHATGPT_DE.tag}
            </div>
            <h1 lang="de" style={{ fontSize: 'clamp(2rem, 4.6vw, 3.2rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.025em', margin: '0 0 1.2rem', color: 'var(--color-text-dark)', hyphens: 'manual', overflowWrap: 'break-word' }}>
              {h1}
            </h1>
            <BylineDe stand={STAND_CHATGPT_DE} />
            <AnswerBox etykieta="Kurzantwort">
              <p lang="de" style={{ margin: 0 }}>{CHATGPT_DE.kurzantwort}</p>
            </AnswerBox>
            <p lang="de" style={{ ...tekstStyl, marginTop: '1.25rem' }}>
              {CHATGPT_DE.lead}{' '}Den übergeordneten Rahmen über alle Systeme hinweg beschreiben wir auf unserer Seite zu{' '}
              <Verweis schluessel="/pozycjonowanie-w-ai">Generative Engine Optimization (GEO)</Verweis>.
            </p>
            <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.5rem' }}>
              {maWersjeDe('/sprawdz-widocznosc-w-ai') && (
                <Link href="/sprawdz-widocznosc-w-ai" className="hero-btn-primary" data-cta="chatgpt_de_checker">
                  {CHATGPT_DE.ctaPruefen}
                </Link>
              )}
              {maWersjeDe('/pozycjonowanie-w-ai/audyt-widocznosci') ? (
                <Link href="/pozycjonowanie-w-ai/audyt-widocznosci" className="hero-btn-secondary" data-cta="chatgpt_de_audit">
                  {CHATGPT_DE.ctaAudit}
                </Link>
              ) : (
                <a href="#kontakt" className="hero-btn-secondary" data-cta="chatgpt_de_audit">
                  {CHATGPT_DE.ctaAudit}
                </a>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      <section id="quellen-messung" className="sekcja-kompakt">
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">Woher ChatGPT seine Unternehmens-Empfehlungen nimmt: Unsere Messung</h2>
          </Reveal>
          <Reveal style={{ display: 'grid', gap: '1.1rem', marginTop: '1.4rem' }}>
            <p lang="de" style={tekstStyl}>
              ChatGPT besitzt keine fest hinterlegte Empfehlungsliste für Dienstleister. Entscheidend ist, ob das Modell aus seinem Trainingswissen antwortet (ohne Links) oder die Live-Websuche (<em>ChatGPT search</em>) auslöst. In unserem Test griff ChatGPT bei <strong>jeder</strong> Bitte um eine Anbieter-Empfehlung und bei <strong>jeder</strong> Preisfrage auf die Websuche zurück - mit einer klaren Zweiteilung der Quellen:
            </p>
            <CompareTable
              id={CHATGPT_DE.tabelleMessung.id}
              caption={CHATGPT_DE.tabelleMessung.caption}
              columns={CHATGPT_DE.tabelleMessung.columns}
              rows={CHATGPT_DE.tabelleMessung.rows}
              przypis={CHATGPT_DE.tabelleMessung.przypis}
            />
            <p lang="de" style={tekstStyl}>
              Die praktische Konsequenz für Unternehmen im DACH-Raum und in Polen: Ein gepflegtes Unternehmensprofil beantwortet die Frage <em>„Wen empfiehlst du?“</em>, während eine Website mit klarer Leistungsbeschreibung und transparenten Preisen (wie unsere Seite zu <Verweis schluessel="/cennik-pozycjonowania">SEO Kosten</Verweis>) bei Fragen nach Budget, Ablauf und Vergleich zitiert wird.
            </p>
          </Reveal>
        </div>
      </section>

      <section id="schritte" className="sekcja-kompakt">
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <Reveal className="section-header">
            <h2 lang="de">ChatGPT SEO in 7 konkreten Schritten</h2>
          </Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.1rem', marginTop: '1.6rem' }}>
            {CHATGPT_DE.schritte.map(([titel, text]) => (
              <RevealItem key={titel} style={{ ...card, padding: '1.4rem 1.6rem' }}>
                <h3 lang="de" style={{ fontSize: '1.12rem', fontWeight: 600, margin: '0 0 0.45rem', color: 'var(--color-text-dark)' }}>{titel}</h3>
                <p lang="de" style={tekstStyl}>{text}</p>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ marginTop: '1.5rem' }}>
            <p lang="de" style={tekstStyl}>
              Ob Ihre Website den OpenAI-Suchcrawler <code>OAI-SearchBot</code> zulässt und Ihre Texte ohne JavaScript lesbar ausliefert, testen Sie kostenlos mit unserem{' '}
              <Verweis schluessel="/narzedzia/audyt-seo">kostenlosen SEO Audit</Verweis> sowie im{' '}
              <Verweis schluessel="/narzedzia/generator-llms-txt">llms.txt Generator</Verweis>. Den Unterschied zwischen klassischer Suchmaschinenoptimierung und KI-Antworten zeigt außerdem unser Leitfaden{' '}
              <Verweis schluessel="/porownania/seo-vs-geo">SEO vs GEO</Verweis>.
            </p>
          </Reveal>
        </div>
      </section>

      <AppleFaq
        faqData={faqFuerAppleFaq(CHATGPT_DE.faq)}
        title="Häufige Fragen zu ChatGPT SEO"
        sectionId="faq"
      />

      <section style={{ padding: '0 0 3.5rem' }}>
        <div className="container" style={{ maxWidth: '880px', margin: '0 auto' }}>
          <ZrodlaDe zrodla={CHATGPT_DE.zrodla} id="quellen" />
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
