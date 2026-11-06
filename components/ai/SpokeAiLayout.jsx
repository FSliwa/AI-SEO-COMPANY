// Układ spoke'a huba GEO /pozycjonowanie-w-ai/[slug] (5.11.2026; PLAN-v2 6.0, 6.5 A2, 6.7 A5).
// Komponent serwerowy: treść z lib/pytaniaAi.js renderuje się w HTML (bez JavaScriptu), a do
// przeglądarki idą tylko części klienckie (Header, Breadcrumbs, Byline, AppleFaq, Contact...).
//
// Kolejność: okruszki 3-poziomowe -> H1 -> Krótka odpowiedź (AnswerBox) -> autor i data (Byline)
// -> lead -> [spis treści] -> sekcje H2/H3 -> FAQ (H2 w AppleFaq, FAQPage) -> CTA -> Źródła
// -> formularz <Contact isMainContent /> (PLAN-v2 6.0: strona z ofertą kończy się formularzem).
//
// Dane strukturalne (CB-05): BreadcrumbList WYŁĄCZNIE z <Breadcrumbs parent> (3 pozycje, bez
// „Blog”); artykuł (A2) = ArticleSchema type="Article" breadcrumb={null}, dateModified = LASTMOD;
// usługa (A5) = ServiceSchema z wariantem z wpisu ('geo-audyt'); FAQPage z AppleFaq.
// Daty: dateModified = LASTMOD z lib/lastmod.js (ta sama co w Byline i w sitemapie), a przed
// wpisem Integracji - pole updated wpisu; datePublished = opublikowano ?? dateModified.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import AppleFaq from '@/components/service/AppleFaq';
import Contact from '@/components/Contact';
import ArticleSchema from '@/components/ArticleSchema';
import ServiceSchema from '@/components/ServiceSchema';
import Zrodla from '@/components/Zrodla';
import ArticleTOC from '@/components/ArticleTOC';
import { Reveal } from '@/components/ScrollReveal';
import { LASTMOD } from '@/lib/lastmod';
import { PREFIKS } from '@/lib/pytaniaAi';
import SpokeAiTresc, { idSekcji, Segmenty, Przyciski } from './SpokeAiTresc';
import { faqDoAppleFaq } from './segmenty';

const BASE = 'https://www.ai-seo-company.pl';
// Rodzic w okruszkach: hub GEO (ma wersję EN, ale spoke'i są tylko po polsku).
const RODZIC = { href: '/pozycjonowanie-w-ai', pl: 'Pozycjonowanie w AI', en: 'AI Search Optimization' };
// id sekcji FAQ (spis treści linkuje do niej; Contact ma id="kontakt", Zrodla id="lista-zrodel").
const ID_FAQ = 'pytania';
// A2 ma H2 id="zrodla" (karta 2 huba), więc lista źródeł dostaje inne id (components/Zrodla.jsx).
const ID_ZRODEL = 'lista-zrodel';

const kontener = { maxWidth: '860px', margin: '0 auto' };
const leadStyl = { fontSize: '1.12rem', lineHeight: 1.7, color: '#333336', margin: '0 0 1.5rem' };
const kartaCta = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', display: 'grid', gap: '1rem' };

export default function SpokeAiLayout({ wpis }) {
  const sciezka = `${PREFIKS}${wpis.slug}`;
  const dataModyfikacji = LASTMOD[`${BASE}${sciezka}`] ?? wpis.updated;
  const dataPublikacji = wpis.opublikowano ?? dataModyfikacji;
  const faq = faqDoAppleFaq(wpis.faq);
  const artykul = wpis.typ === 'artykul';
  const spis = wpis.spisTresci
    ? [...wpis.sections.map((s) => ({ id: idSekcji(s), title: s.h2 })), { id: ID_FAQ, title: wpis.faqTytul }]
    : null;
  const Tresc = artykul ? 'article' : 'div';

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl={wpis.okruszek} en={wpis.okruszek} parent={RODZIC} />
      {artykul ? (
        <ArticleSchema
          type="Article"
          breadcrumb={null}
          locale="pl"
          url={sciezka}
          title={wpis.title}
          description={wpis.description}
          datePublished={dataPublikacji}
          dateModified={dataModyfikacji}
        />
      ) : (
        wpis.serviceSchema && <ServiceSchema variant={wpis.serviceSchema} />
      )}

      <Tresc>
        <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '8px' }}>
          <div className="container" style={kontener}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {wpis.tag}
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: 'var(--color-text-dark)' }}>
                {wpis.h1}
              </h1>
              <AnswerBox>{wpis.answer}</AnswerBox>
              <Byline sciezka={sciezka} />
              <p style={leadStyl}>
                <Segmenty segs={wpis.lead} />
              </p>
              {wpis.hero && <Przyciski przyciski={wpis.hero} style={{ marginBottom: '1rem' }} />}
            </Reveal>
          </div>
        </section>

        <div className="container" style={{ ...kontener, paddingBottom: '24px' }}>
          {spis && <ArticleTOC items={spis} />}
          <SpokeAiTresc sections={wpis.sections} />
        </div>
      </Tresc>

      <AppleFaq faqData={faq} title={wpis.faqTytul} sectionId={ID_FAQ} />

      {wpis.cta && (
        <section style={{ padding: '0 0 40px' }}>
          <div className="container" style={kontener}>
            <Reveal>
              {/* Tytuł CTA to <p>, nie nagłówek: H1/H2 „Audyt widoczności w AI” ma tylko A5 (CS-07). */}
              <div style={kartaCta}>
                <p style={{ margin: 0, fontSize: 'clamp(1.25rem, 2.6vw, 1.55rem)', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--color-text-dark)' }}>{wpis.cta.tytul}</p>
                <p style={{ ...leadStyl, margin: 0 }}>{wpis.cta.tekst}</p>
                <Przyciski przyciski={wpis.cta.przyciski} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {wpis.sources?.length > 0 && (
        <div className="container" style={{ ...kontener, paddingBottom: '40px' }}>
          <Zrodla zrodla={wpis.sources} id={ID_ZRODEL} />
        </div>
      )}

      <Contact isMainContent />
      <Footer />
    </main>
  );
}
