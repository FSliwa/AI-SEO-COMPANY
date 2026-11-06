import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import ChecklistForm from '@/components/ChecklistForm';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import ComparisonSchema from '@/components/porownania/ComparisonSchema';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import styles from './porownania.module.css';

// Wspólny układ stron /porownania/[slug] (5.11.2026; PLAN-v2 7 SIL, 6.0, CB-08, CB-15).
// Komponent serwerowy: treść (HTML z lib/porownania.js) jest w HTML z serwera, bez animacji
// wejścia (bez Reveal), więc boty i czytniki widzą ją od razu, a LCP nie czeka na JS.
// Kolejność: Header › okruszki (3 poziomy) › H1 › Byline › Krótka odpowiedź › sekcje H2/H3
// z tabelami (<caption>) › FAQ (FAQPage) › Źródła › CTA do #kontakt (data-plan) › formularz
// <Contact isMainContent /> › Footer. Bez formularza generate_lead z page_type=porownanie nie
// wystąpi (CB-15). Sekcje to <div>, nie <section>: globals.css daje każdemu <section> 5,5 rem
// odstępu z !important.

const KONTAKT = hash('kontakt', 'pl');

function Html({ html, className = styles.tresc }) {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Tabela({ tabela, porownanie: p }) {
  if (!tabela) return null;
  if (tabela === 'glowna') {
    return <CompareTable id={p.tableId} caption={p.tableCaption} columns={p.columns} rows={p.rows} przypis={p.tablePrzypis} />;
  }
  return <CompareTable id={tabela.id} caption={tabela.caption} columns={tabela.columns} rows={tabela.rows} przypis={tabela.przypis} minWidth={tabela.minWidth} />;
}

function Sekcja({ sekcja: s, porownanie: p }) {
  const naglowekId = `${s.id}-naglowek`;
  return (
    <div id={s.id} className={styles.karta} role="region" aria-labelledby={naglowekId}>
      <h2 id={naglowekId} className={styles.h2}>{s.h2}</h2>
      <Html html={s.html} />
      <Tabela tabela={s.tabela} porownanie={p} />
      <Html html={s.htmlPo} />
      {s.uwaga && <p className={styles.uwaga}>{s.uwaga}</p>}
      {s.checklista && (
        <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)', marginTop: '1.5rem', paddingTop: '1.5rem', display: 'grid', gap: '1rem' }}>
          <p style={{ margin: 0, fontWeight: 700, fontSize: '1.1rem', lineHeight: 1.4, color: 'var(--color-text-dark)' }}>{s.checklista.naglowek}</p>
          <ChecklistForm plan={s.checklista.plan} idPrefiks={s.checklista.idPrefiks} />
        </div>
      )}
      {(s.h3 || []).map((h) => (
        <div key={h.id}>
          <h3 id={h.id} className={styles.h3}>{h.h3}</h3>
          <Html html={h.html} />
          <Tabela tabela={h.tabela} porownanie={p} />
          <Html html={h.htmlPo} />
        </div>
      ))}
    </div>
  );
}

export function BlokCta({ cta, dataCta }) {
  return (
    <div className="container" style={{ maxWidth: '860px', margin: '0 auto', padding: '0 1.5rem 3rem' }}>
      <div className={styles.karta} style={{ display: 'grid', gap: '1rem', justifyItems: 'center', textAlign: 'center' }}>
        <a
          href={KONTAKT}
          className="btn btn-primary"
          data-cta={dataCta}
          {...(cta.plan ? { 'data-plan': cta.plan } : {})}
          style={{ whiteSpace: 'normal', textAlign: 'center', textWrap: 'balance' }}
        >
          {cta.tekst}
        </a>
        {cta.linki && cta.linki.length > 0 && (
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {cta.linki.map((l) => (
              <Link key={l.href} href={l.href} className="btn btn-secondary" style={{ whiteSpace: 'normal', textAlign: 'center' }}>
                {l.tekst}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function PorownanieLayout({ porownanie: p }) {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl={p.okruszek} en={p.okruszek} parent={{ href: '/porownania', pl: 'Porównania' }} />
      <ComparisonSchema porownanie={p} />

      <article>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '1.5rem' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {p.tag}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12, fontWeight: 800, letterSpacing: '-0.02em', margin: '0.5rem 0 1rem', color: 'var(--color-text-dark)' }}>
            {p.h1}
          </h1>
          {p.ujawnienie && (
            <p style={{ margin: '0 0 0.75rem', fontSize: '1rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>{p.ujawnienie}</p>
          )}
          <Byline sciezka={`/porownania/${p.slug}`} data={p.updated} style={{ margin: '0 0 0.25rem' }} />
          <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>{p.zrodlaDanych}</p>
          <AnswerBox>
            <p className={styles.tresc} style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: p.answer }} />
          </AnswerBox>
        </div>

        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
          {p.sections.map((s) => (
            <Sekcja key={s.id} sekcja={s} porownanie={p} />
          ))}
        </div>
      </article>

      <AppleFaq faqData={p.faq} title={p.faqTytul} sectionId="pytania" />

      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <Zrodla zrodla={p.sources} />
      </div>

      <BlokCta cta={p.cta} dataCta="porownanie_cta" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
