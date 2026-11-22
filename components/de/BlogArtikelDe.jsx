// Wspólny układ niemieckich artykułów poradnikowych (/de/blog/core-web-vitals, /de/blog/canonical-tag, Faza 2 DE, 19.11.2026).
// Komponent serwerowy. Zwraca pełną strukturę artykułu z AnswerBox („Kurzantwort”), BylineDe, ArticleTOC, CompareTable,
// AppleFaq (FAQPage JSON-LD), ZrodlaDe („Quellen”), Contact i Footer. Linkuje wewnętrznie wyłącznie do istniejących stron DE.

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import ArticleSchema from '@/components/ArticleSchema';
import AnswerBox from '@/components/AnswerBox';
import ArticleTOC from '@/components/ArticleTOC';
import CompareTable from '@/components/CompareTable';
import AppleFaq from '@/components/service/AppleFaq';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { BASE } from '@/lib/narzedzia';

export default function BlogArtikelDe({ klucz, dane }) {
  const wpis = wpisDe(klucz);
  const pelnyUrl = urlDe(klucz);
  const sciezkaDe = pelnyUrl ? pelnyUrl.replace(BASE, '') : `/de${dane.fallbackPfad}`;
  const tocItems = [
    ...dane.sekcje.map((s) => ({ id: s.id, title: s.h2 })),
    ...(dane.faq?.length ? [{ id: 'faq', title: dane.faqTytul || 'Häufige Fragen' }] : []),
    ...(dane.zrodla?.length ? [{ id: 'quellen', title: 'Quellen' }] : []),
  ];
  const powiazane = (dane.powiazane || []).filter((p) => maWersjeDe(p.href));

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs parent={{ href: '/blog', pl: 'Blog', en: 'Blog', de: 'Blog' }} pl={dane.okruszek} en={dane.okruszek} de={dane.okruszek} />
      <ArticleSchema
        type="BlogPosting"
        locale="de"
        breadcrumb={null}
        url={sciezkaDe}
        title={wpis?.h1 ?? dane.h1}
        description={wpis?.opis ?? dane.kurzantwort}
        datePublished={dane.opublikowano}
        dateModified={dane.aktualisiert}
      />

      <article style={{ paddingTop: 'clamp(24px, 3.5vw, 44px)', paddingBottom: '72px' }}>
        <div className="container" style={{ maxWidth: '760px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1rem' }}>
              <span style={{ fontSize: '0.78rem', fontFamily: 'var(--w-mono)', fontWeight: 500, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                {dane.kategoria}
              </span>
            </div>
            <h1 lang="de" style={{ fontSize: 'clamp(2.1rem, 4.6vw, 3.35rem)', fontWeight: 500, color: 'var(--w-tusz)', margin: '0 0 1.25rem', lineHeight: 1.1, letterSpacing: '-0.025em', hyphens: 'auto', overflowWrap: 'break-word' }}>
              {wpis?.h1 ?? dane.h1}
            </h1>
            <BylineDe stand={dane.aktualisiert} />
            <AnswerBox etykieta="Kurzantwort">
              <p lang="de" style={{ margin: 0 }}>{dane.kurzantwort}</p>
            </AnswerBox>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="article-content" lang="de" style={{ marginTop: '2rem' }}>
              <p className="lead">{dane.lead}</p>
              <ArticleTOC items={tocItems} />

              {dane.sekcje.map((sek) => (
                <section key={sek.id} aria-labelledby={`${sek.id}-h`} style={{ marginTop: '2.5rem' }}>
                  <h2 id={sek.id}><span id={`${sek.id}-h`}>{sek.h2}</span></h2>
                  {sek.html && <div dangerouslySetInnerHTML={{ __html: sek.html }} />}
                  {sek.tabela && (
                    <div style={{ margin: '1.5rem 0' }}>
                      <CompareTable
                        id={sek.tabela.id}
                        caption={sek.tabela.caption}
                        columns={sek.tabela.columns}
                        rows={sek.tabela.rows}
                        przypis={sek.tabela.przypis}
                      />
                    </div>
                  )}
                  {sek.htmlPo && <div dangerouslySetInnerHTML={{ __html: sek.htmlPo }} />}
                </section>
              ))}

              {powiazane.length > 0 && (
                <section aria-labelledby="weiterfuehrend-h" style={{ marginTop: '2.75rem', padding: '1.6rem 1.75rem', borderRadius: '20px', background: 'var(--w-papier-2)', border: '1px solid var(--w-linia)' }}>
                  <h2 id="weiterfuehrend-h" style={{ marginTop: 0, fontSize: '1.3rem' }}>Passende Tools und Leitfäden auf Deutsch</h2>
                  <ul style={{ margin: '0.75rem 0 0', paddingLeft: '1.2rem' }}>
                    {powiazane.map((p) => (
                      <li key={p.href} style={{ marginBottom: '0.45rem' }}>
                        <Link href={p.href} style={{ fontWeight: 600, textDecoration: 'underline' }}>{p.tekst}</Link>
                        {p.opis ? `: ${p.opis}` : ''}
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              {dane.zrodla?.length > 0 && <ZrodlaDe zrodla={dane.zrodla} id="quellen" />}
            </div>
          </Reveal>
        </div>
      </article>

      {dane.faq?.length > 0 && (
        <AppleFaq
          faqData={faqFuerAppleFaq(dane.faq)}
          title={dane.faqTytul || 'Häufige Fragen'}
          sectionId="faq"
        />
      )}

      <Contact />
      <Footer />
    </main>
  );
}
