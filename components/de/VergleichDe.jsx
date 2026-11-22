// Deutsche Vergleichsseite (/de/vergleiche/seo-vs-geo), Gruppe de-geo. Gleicher Aufbau wie
// components/porownania/PorownanieLayout.jsx, aber mit deutschen Beschriftungen (Kurz gesagt, Quellen, Autorenzeile)
// und JSON-LD in deutscher Sprache. Serverkomponente: der Text steht im HTML vom Server, ohne Einblendanimation.
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import ArticleSchema from '@/components/ArticleSchema';
import { BlokCta } from '@/components/porownania/PorownanieLayout';
import styles from '@/components/porownania/porownania.module.css';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { urlDe } from '@/lib/stronyDe';

const BASE = 'https://www.ai-seo-company.pl';

function Html({ html, className = styles.tresc }) {
  if (!html) return null;
  return <div lang="de" className={className} dangerouslySetInnerHTML={{ __html: html }} />;
}

function Tabela({ tabela, porownanie: p }) {
  if (!tabela) return null;
  if (tabela === 'glowna') {
    return <CompareTable id={p.tableId} caption={p.tableCaption} columns={p.columns} rows={p.rows} przypis={p.tablePrzypis} />;
  }
  return <CompareTable id={tabela.id} caption={tabela.caption} columns={tabela.columns} rows={tabela.rows} przypis={tabela.przypis} minWidth={tabela.minWidth} />;
}

function Sekcja({ sekcja: s, porownanie: p }) {
  const naglowekId = `${s.id}-ueberschrift`;
  return (
    <div id={s.id} className={styles.karta} role="region" aria-labelledby={naglowekId}>
      <h2 id={naglowekId} className={styles.h2} lang="de">{s.h2}</h2>
      <Html html={s.html} />
      <Tabela tabela={s.tabela} porownanie={p} />
      <Html html={s.htmlPo} />
      {(s.h3 || []).map((h) => (
        <div key={h.id}>
          <h3 id={h.id} className={styles.h3} lang="de">{h.h3}</h3>
          <Html html={h.html} />
          <Tabela tabela={h.tabela} porownanie={p} />
          <Html html={h.htmlPo} />
        </div>
      ))}
    </div>
  );
}

export default function VergleichDe({ porownanie: p }) {
  // Adresse für JSON-LD: Pfad ohne Domain (ArticleSchema setzt BASE davor); Schlüssel = polnischer Pfad.
  const url = (urlDe(`/porownania/${p.slug}`) || `${BASE}/de/vergleiche/${p.slug}`).replace(BASE, '');
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl={p.okruszek} en={p.okruszek} de={p.okruszek} />
      <ArticleSchema
        type="Article"
        breadcrumb={null}
        locale="de"
        url={url}
        title={p.h1}
        description={p.description}
        datePublished={p.published}
        dateModified={p.updated}
        extra={{ '@id': `${BASE}${url}#article`, ...(p.about ? { about: p.about } : {}) }}
      />

      <article>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '1.5rem' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {p.tag}
          </div>
          <h1 lang="de" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12, fontWeight: 500, letterSpacing: '-0.025em', margin: '0.5rem 0 1rem', color: 'var(--color-text-dark)', overflowWrap: 'break-word' }}>
            {p.h1}
          </h1>
          <BylineDe stand={p.updated} style={{ margin: '0 0 0.25rem' }} />
          <p lang="de" style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>{p.zrodlaDanych}</p>
          <AnswerBox etykieta="Kurz gesagt">
            <p lang="de" className={styles.tresc} style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: p.answer }} />
          </AnswerBox>
        </div>

        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '1.5rem' }}>
          {p.sections.map((s) => (
            <Sekcja key={s.id} sekcja={s} porownanie={p} />
          ))}
        </div>
      </article>

      <AppleFaq faqData={faqFuerAppleFaq(p.faq)} title={p.faqTytul} sectionId="fragen" />

      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <Zrodla zrodla={p.sources} naglowek="Quellen" id="quellen" />
      </div>

      <BlokCta cta={p.cta} dataCta="porownanie_cta" locale="de" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
