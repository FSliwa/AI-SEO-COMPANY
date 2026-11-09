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
// 9.11.2026: prop locale ('pl' | 'en'). EN: wpis z lib/pytaniaAi.en.js, JSON-LD z inLanguage 'en' i
// adresami /en/..., Byline takzeEn, Service A5 budowany tu (ServiceSchema nie ma wariantu EN, a cena
// zostaje w PLN jak na stronie). PL bez zmian.
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
import { hrefWJezyku } from '@/lib/linkiEn';
import SpokeAiTresc, { idSekcji, Segmenty, Przyciski } from './SpokeAiTresc';
import { faqDoAppleFaq } from './segmenty';

const BASE = 'https://www.ai-seo-company.pl';
// Rodzic w okruszkach: hub GEO (pl i en).
const RODZIC = { href: '/pozycjonowanie-w-ai', pl: 'Pozycjonowanie w AI', en: 'AI Search Optimization' };
// id sekcji FAQ (spis treści linkuje do niej; Contact ma id="kontakt", Zrodla id="lista-zrodel").
const ID_FAQ = 'pytania';
// A2 ma H2 id="zrodla" (karta 2 huba), więc lista źródeł dostaje inne id (components/Zrodla.jsx).
const ID_ZRODEL = 'lista-zrodel';
const ID_FAQ_EN = 'faq';
const ID_ZRODEL_EN = 'sources-list';

const kontener = { maxWidth: '860px', margin: '0 auto' };
const leadStyl = { fontSize: '1.12rem', lineHeight: 1.7, color: 'var(--color-text-main)', margin: '0 0 1.5rem' };
const kartaCta = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', display: 'grid', gap: '1rem' };

// Service JSON-LD wersji EN (kwoty w PLN, jak widoczne na stronie).
function ServiceEn({ u }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${u.url}#service`,
    name: u.name,
    description: u.desc,
    serviceType: u.typ,
    url: u.url,
    provider: { '@id': `${BASE}/#organization` },
    areaServed: { '@type': 'AdministrativeArea', name: 'Warsaw and Poland' },
    availableLanguage: ['pl', 'en'],
    inLanguage: 'en',
    offers: u.oferty.map((o) => ({
      '@type': 'Offer',
      name: o.name,
      // Cennik EN w EUR (jak Contact.jsx i ServiceSchema): 990 zł = €235, 490 zł/mies. = €115.
      priceCurrency: 'EUR',
      price: o.cenaEur ?? o.cena,
      availability: 'https://schema.org/InStock',
      url: u.url,
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}

export default function SpokeAiLayout({ wpis, locale = 'pl' }) {
  const en = locale === 'en';
  const sciezka = `${PREFIKS}${wpis.slug}`;
  const sciezkaEn = en ? hrefWJezyku(sciezka, 'en') : sciezka; // '/en/ai-search-optimization/...'
  const dataModyfikacji = LASTMOD[`${BASE}${en ? sciezkaEn : sciezka}`] ?? (en ? LASTMOD[`${BASE}${sciezka}`] : undefined) ?? wpis.updated;
  const dataPublikacji = wpis.opublikowano ?? dataModyfikacji;
  const faq = faqDoAppleFaq(wpis.faq, locale);
  const artykul = wpis.typ === 'artykul';
  const idFaq = en ? ID_FAQ_EN : ID_FAQ;
  const spis = wpis.spisTresci
    ? [...wpis.sections.map((s) => ({ id: idSekcji(s, locale), title: s.h2 })), { id: idFaq, title: wpis.faqTytul }]
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
          locale={locale}
          url={sciezkaEn}
          title={wpis.title}
          description={wpis.description}
          datePublished={dataPublikacji}
          dateModified={dataModyfikacji}
        />
      ) : (
        en
          ? wpis.serviceEn && <ServiceEn u={wpis.serviceEn} />
          : wpis.serviceSchema && <ServiceSchema variant={wpis.serviceSchema} />
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
              <AnswerBox etykieta={en ? 'Short answer' : undefined}>{wpis.answer}</AnswerBox>
              <Byline sciezka={sciezka} takzeEn={en} data={en ? dataModyfikacji : undefined} />
              <p style={leadStyl}>
                <Segmenty segs={wpis.lead} locale={locale} />
              </p>
              {wpis.hero && <Przyciski przyciski={wpis.hero} style={{ marginBottom: '1rem' }} locale={locale} />}
            </Reveal>
          </div>
        </section>

        <div className="container" style={{ ...kontener, paddingBottom: '24px' }}>
          {spis && <ArticleTOC items={spis} />}
          <SpokeAiTresc sections={wpis.sections} locale={locale} />
        </div>
      </Tresc>

      <AppleFaq faqData={faq} title={wpis.faqTytul} sectionId={idFaq} />

      {wpis.cta && (
        <section style={{ padding: '0 0 40px' }}>
          <div className="container" style={kontener}>
            <Reveal>
              {/* Tytuł CTA to <p>, nie nagłówek: H1/H2 „Audyt widoczności w AI” ma tylko A5 (CS-07). */}
              <div style={kartaCta}>
                <p style={{ margin: 0, fontSize: 'clamp(1.25rem, 2.6vw, 1.55rem)', fontWeight: 800, letterSpacing: '-0.01em', color: 'var(--color-text-dark)' }}>{wpis.cta.tytul}</p>
                <p style={{ ...leadStyl, margin: 0 }}>{wpis.cta.tekst}</p>
                <Przyciski przyciski={wpis.cta.przyciski} locale={locale} />
              </div>
            </Reveal>
          </div>
        </section>
      )}

      {wpis.sources?.length > 0 && (
        <div className="container" style={{ ...kontener, paddingBottom: '40px' }}>
          <Zrodla zrodla={wpis.sources} id={en ? ID_ZRODEL_EN : ID_ZRODEL} en={en} />
        </div>
      )}

      <Contact isMainContent />
      <Footer />
    </main>
  );
}
