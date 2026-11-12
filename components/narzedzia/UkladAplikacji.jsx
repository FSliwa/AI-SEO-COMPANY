// Wspólny układ stron darmowych aplikacji (wydzielony ze StronyAplikacji.jsx 11.11.2026, żeby każda
// aplikacja miała własny plik strony). Komponenty serwerowe. API dla stron: RAPORT agenta wspolne
// (prace-2026-11-11/lepsi/wspolne/RAPORT.md).
//
// 12.11.2026 (S1-poprawki Z-01, Z-01b, Z-05, agent wspolne): pierwszy ekran lead -> narzędzie -> „Krótka
// odpowiedź”. Nowe propsy (wszystkie opcjonalne, stare wywołania renderują się jak wcześniej):
// - lead: 1-2 zdania obietnicy pod H1 (tekst albo elementy inline, bez bloków),
// - narzedzie: komponent kliencki narzędzia (<AudytSeoClient />) zaraz pod leadem; wtedy „Krótka odpowiedź”
//   idzie POD narzędzie. Bez tego propa kolejność stara: odpowiedź nad children,
// - schema.featureList (tablica tekstów) i schema.screenshot ({ url, width, height }) do WebApplication.
// <main> dostaje klasę modułu narzedzia.module.css (.strona): na telefonie (≤ 600 px) chowa znacznik
// „✳ Darmowe narzędzie” nad H1. Okruszki zawsze przez hub (RODZIC_OKRUSZKOW, 3 poziomy).

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { hrefWJezyku } from '@/lib/linkiEn';
import st from './narzedzia.module.css';
import * as s from './styl';

export { Sekcja } from './Sekcja';
export { default as PozostaleNarzedzia } from './PozostaleNarzedzia';
export { default as Poradniki } from './Poradniki';
export { default as CoDostajesz } from './CoDostajesz';
export { default as ZrzutWyniku } from './ZrzutWyniku';

export function Uklad({ slug, tag, schema, lead, narzedzie, odpowiedz, children, faq, tytulFaq, locale = 'pl' }) {
  const en = locale === 'en';
  const strona = en ? stronaNarzedziaL(slug, 'en') : stronaNarzedzia(slug);
  const krotka = odpowiedz ? <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>{odpowiedz}</AnswerBox> : null;
  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={schema.name}
        description={schema.description}
        url={en ? `${BASE}${hrefWJezyku(`/narzedzia/${slug}`, 'en')}` : `${BASE}/narzedzia/${slug}`}
        category={schema.category}
        featureList={schema.featureList}
        screenshot={schema.screenshot}
        {...(en ? { language: 'en' } : {})}
      />
      <section className={st.hero} style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          {lead ? <p className={st.lead} style={s.lead}>{lead}</p> : null}
          {narzedzie ? (
            <>
              {narzedzie}
              {krotka ? <div style={s.poNarzedziu}>{krotka}</div> : null}
            </>
          ) : krotka}
          {children}
        </div>
      </section>
      <AppleFaq faqData={faq} title={tytulFaq} sectionId="pytania" />
      {strona.sources.length > 0 && (
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container" style={s.kontener}>
            <Zrodla zrodla={strona.sources} {...(en ? { en: true } : {})} />
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
