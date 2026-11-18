'use client';

// /copywriting-seo (PL) i /en/seo-copywriting (EN): usługa "copywriting SEO" w pakietach pozycjonowania.
// 18.11.2026, zadanie airSlate "nowa-copywriting". Układ i komponenty jak WizytowkaClient.jsx
// (najnowszy wzorzec strony usługi): AnswerBox, Byline, CompareTable, Zrodla, AppleFaq, Contact.
// Treść z lib/copywritingSeo.js (PL) i lib/copywritingSeo.en.js (EN), render wspólny.
// Znacznik [[/sciezka|tekst]] w danych = link wewnętrzny (Link z i18n/routing tłumaczy adres na EN).

import { Fragment } from 'react';
import { useLocale } from 'next-intl';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import { hrefWJezyku } from '@/lib/linkiEn';
import { PL, SCIEZKA, DATA_AKTUALIZACJI } from '@/lib/copywritingSeo';
import { EN } from '@/lib/copywritingSeo.en';

const sekcja = { padding: 'clamp(2.5rem, 6vw, 4rem) 0 0' };
const kontener = { maxWidth: '850px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.4vw, 2.2rem)', fontWeight: 700, lineHeight: 1.2, letterSpacing: '-0.02em', color: 'var(--color-text-dark)', margin: '0 0 1.25rem', scrollMarginTop: '110px' };
const akapit = { fontSize: '1.08rem', lineHeight: 1.7, color: 'var(--color-text-main)', margin: '0 0 1.1rem' };
const lista = { ...akapit, paddingLeft: '1.25rem', display: 'grid', gap: '0.6rem' };
const link = { color: 'var(--color-primary)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

const ZNACZNIK_ZRODLO = '\\[\\[([^|\\]]+)\\|([^\\]]+)\\]\\]';

// Tekst ze znacznikami [[/sciezka|tekst]] -> tablica węzłów z <Link>.
function Tekst({ children }) {
  if (typeof children !== 'string') return children;
  const czesci = [];
  let ostatni = 0;
  for (const m of children.matchAll(new RegExp(ZNACZNIK_ZRODLO, 'g'))) {
    if (m.index > ostatni) czesci.push(children.slice(ostatni, m.index));
    czesci.push(<Link key={m.index} href={m[1]} style={link}>{m[2]}</Link>);
    ostatni = m.index + m[0].length;
  }
  if (ostatni < children.length) czesci.push(children.slice(ostatni));
  return czesci.map((c, i) => <Fragment key={i}>{c}</Fragment>);
}

// Ten sam znacznik w odpowiedziach FAQ, które AppleFaq renderuje jako HTML (a wizytówkowy wzorzec
// ma w nich zwykłe <a>): adres w języku strony przez hrefWJezyku, bez adresu EN zostaje sam tekst.
function faqHtml(tekst, locale) {
  return tekst.replace(new RegExp(ZNACZNIK_ZRODLO, 'g'), (_, sciezka, etykieta) => {
    const href = hrefWJezyku(sciezka, locale);
    return href ? `<a href="${href}" style="text-decoration:underline">${etykieta}</a>` : etykieta;
  });
}

function Tabela({ t, minWidth }) {
  return (
    <CompareTable
      id={t.id}
      caption={t.caption}
      columns={t.kolumny.map((label, i) => ({ key: `k${i}`, label }))}
      rows={t.wiersze.map((w) => Object.fromEntries(w.map((v, i) => [`k${i}`, v])))}
      przypis={<Tekst>{t.przypis}</Tekst>}
      minWidth={minWidth}
    />
  );
}

export default function CopywritingSeoClient() {
  const lang = useLocale();
  const en = lang === 'en';
  const D = en ? EN : PL;
  const S = D.sekcje;
  const kontakt = hash('kontakt', lang);
  const faqData = D.faq.map((f) => ({ ...f, answer: faqHtml(f.answer, lang) }));

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '1rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {D.tag}
            </div>
            <h1 style={{ fontSize: 'clamp(2.1rem, 5vw, 3.4rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.5rem', color: 'var(--color-text-dark)' }}>
              {D.h1}
            </h1>
          </Reveal>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>{D.odpowiedz}</AnswerBox>

          <p style={akapit}>{D.wstep}</p>

          <Byline sciezka={SCIEZKA} data={DATA_AKTUALIZACJI} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta="service_hero_copywriting" data-plan="standard">{D.ctaGlowny}</a>
            <a href={`#${S.cena.id}`} className="hero-btn-secondary" data-cta="service_hero_copywriting_cena">{D.ctaDrugi}</a>
          </div>
        </div>
      </section>

      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={S.czym.id} style={h2Styl}>{S.czym.h2}</h2>
          {S.czym.akapity.map((a) => <p key={a} style={akapit}><Tekst>{a}</Tekst></p>)}
          <Tabela t={S.czym.tabela} minWidth={520} />
        </div>
      </section>

      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={S.cena.id} style={h2Styl}>{S.cena.h2}</h2>
          {S.cena.akapity.map((a) => <p key={a} style={akapit}><Tekst>{a}</Tekst></p>)}
          <Tabela t={S.cena.tabela} minWidth={640} />
          {S.cena.akapityPo.map((a) => <p key={a} style={akapit}><Tekst>{a}</Tekst></p>)}
          <div style={{ margin: '1.5rem 0 0' }}>
            <a href={kontakt} className="btn btn-primary" data-cta="service_cena_copywriting" data-plan="standard">
              {D.ctaGlowny}{' – '}{D.ctaOdpowiedz}
            </a>
          </div>
        </div>
      </section>

      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={S.proces.id} style={h2Styl}>{S.proces.h2}</h2>
          <p style={akapit}>{S.proces.wstep}</p>
          <ol style={{ ...lista, gap: '0.9rem' }}>
            {S.proces.kroki.map(([tytul, opis]) => (
              <li key={tytul}>
                <span style={{ fontWeight: 700, color: 'var(--color-text-dark)' }}>{tytul}</span> <Tekst>{opis}</Tekst>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={S.szablony.id} style={h2Styl}>{S.szablony.h2}</h2>
          <p style={akapit}>{S.szablony.wstep}</p>
          <ul style={lista}>
            {S.szablony.lista.map((p) => <li key={p}><Tekst>{p}</Tekst></li>)}
          </ul>
        </div>
      </section>

      <section style={sekcja}>
        <div className="container" style={kontener}>
          <h2 id={S.nieWystarczy.id} style={h2Styl}>{S.nieWystarczy.h2}</h2>
          {S.nieWystarczy.akapity.map((a) => <p key={a} style={akapit}><Tekst>{a}</Tekst></p>)}
          <Zrodla zrodla={D.zrodla} en={en} naglowek={D.zrodlaNaglowek} />
        </div>
      </section>

      <AppleFaq faqData={faqData} title={D.faqTytul} sectionId={en ? 'faq' : 'pytania'} />

      <section style={{ padding: '0 0 3rem' }}>
        <div className="container" style={kontener}>
          <div style={{ ...karta, textAlign: 'center' }}>
            <p style={{ ...akapit, fontSize: '1.2rem', fontWeight: 600, color: 'var(--color-text-dark)' }}>{D.ctaKoniec}</p>
            <a href={kontakt} className="btn btn-primary" data-cta="service_bottom_copywriting" data-plan="standard">{D.ctaKoniecPrzycisk}</a>
          </div>
        </div>
      </section>

      <Contact />
    </main>
  );
}
