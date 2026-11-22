// Wspólny układ niemieckich stron narzędzi (18.11.2026, de-narzedzia): odpowiednik components/narzedzia/UkladAplikacji.jsx
// (Uklad) z tekstami DE. Komponent serwerowy. Okruszki 2-poziomowe (Startseite › Narzędzie): hub /narzedzia nie ma
// strony DE w fazie startowej, więc brak rodzica. Źródła pod treścią w formacie DE („Abruf: 05.11.2026”).
// Sekcja, CoDostajesz, ZrzutWyniku: te same komponenty co PL/EN (teksty dostają jako propsy).

import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import Ikona, { ikonaNarzedzia } from '@/components/narzedzia/Ikony';
import { Link as IntlLink } from '@/i18n/routing';
import { maWersjeDe, urlDe } from '@/lib/stronyDe';
import { AUDYT, AUTORYTET, GENERATOR } from '@/lib/narzedziaLiczby';
import { KARTY_DE } from '@/lib/narzedzia.de';
import { NawBok } from './WspolneDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';

const MIESIACE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

/** „2026-11-05” -> „05.11.2026”. */
export function dataOdczytuDe(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${Number(m[3])}.${m[2]}.${m[1]}` : iso;
}

/** „2026-11-18” -> „18. November 2026”. */
export function dataDlugaDe(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso || '');
  return m ? `${Number(m[3])}. ${MIESIACE[Number(m[2]) - 1]} ${m[1]}` : iso;
}

/** Lista źródeł DE: <ol> jak components/Zrodla.jsx, nagłówek „Quellen”, data odczytu „Abruf: 05.11.2026”. */
export function ZrodlaDe({ zrodla, id = 'zrodla' }) {
  if (!zrodla || zrodla.length === 0) return null;
  return (
    <section className="zrodla-sekcja" aria-labelledby={id} style={{ margin: '2.5rem 0 0' }}>
      <h2 id={id} style={{ fontSize: 'clamp(1.25rem, 2.6vw, 1.5rem)', fontWeight: 500, letterSpacing: '-0.015em', margin: '0 0 0.9rem', color: 'var(--color-text-dark)', scrollMarginTop: '110px' }}>
        Quellen
      </h2>
      <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem', fontSize: '0.92rem', lineHeight: 1.55, color: 'var(--color-text-main)' }}>
        {zrodla.map((z) => (
          <li key={z.url}>
            <a href={z.url} rel="noopener" style={{ color: 'var(--color-primary)', textDecoration: 'underline', overflowWrap: 'anywhere' }}>{z.nazwa}</a>
            {z.data && <> (Abruf: {dataOdczytuDe(z.data)})</>}
          </li>
        ))}
      </ol>
    </section>
  );
}

/** „Weitere kostenlose Tools”: tylko narzędzia i szablony z wersją DE (bez huba i bez bieżącej strony). */
export function WeitereToolsDe({ bez }) {
  const L = { audytStron: AUDYT.stron, botow: GENERATOR.botow, botowAi: GENERATOR.botowAi, konkurentow: AUTORYTET.konkurentow, silniki: 'ChatGPT, Gemini, Perplexity, Claude und AI Overviews' };
  const karty = Object.entries(KARTY_DE).filter(([href]) => href !== bez && maWersjeDe(href));
  if (!karty.length) return null;
  return (
    <section aria-labelledby="weitere-tools" className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.sekcja, ...s.karta }}>
      <h2 id="weitere-tools" className={st.h2} style={{ ...s.h2, marginBottom: '1rem' }}>Weitere kostenlose Tools</h2>
      <ul className={st.siatka}>
        {karty.map(([href, k]) => (
          <li key={href}>
            <IntlLink href={href} className={st.kafel}>
              <span className={st.kafelIkona}><Ikona nazwa={ikonaNarzedzia(href)} /></span>
              <span className={st.kafelNazwa}>{k.nazwa}</span>
              <span className={st.kafelOpis}>{k.opis(L)}</span>
            </IntlLink>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * Układ strony narzędzia DE. Propsy jak w Uklad (PL/EN): klucz = klucz routingu (ścieżka PL),
 * schema { name, description, category, featureList, screenshot }, lead, narzedzie, odpowiedz, children, faq, tytulFaq.
 */
export function UkladDe({ klucz, tag, h1, okruszek, zrodla, schema, lead, narzedzie, odpowiedz, children, faq, tytulFaq }) {
  const url = urlDe(klucz);
  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs
        parent={{ href: '/narzedzia', pl: 'Narzędzia', en: 'Tools', de: 'Tools & Vorlagen' }}
        pl={okruszek}
        en={okruszek}
        de={okruszek}
      />
      <WebAppSchema
        name={schema.name}
        description={schema.description}
        url={url}
        category={schema.category}
        featureList={schema.featureList}
        screenshot={schema.screenshot}
        language="de"
      />
      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj={ikonaNarzedzia(klucz)} />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>
          {lead ? <p className={st.lead} style={s.lead}>{lead}</p> : null}
          {narzedzie}
          {odpowiedz ? <div style={s.poNarzedziu}><AnswerBox etykieta="Kurzantwort">{odpowiedz}</AnswerBox></div> : null}
          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>{children}</div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>
      <AppleFaq faqData={faq.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))} title={tytulFaq} sectionId="pytania" />
      {zrodla.length > 0 && (
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container" style={s.kontener}>
            <ZrodlaDe zrodla={zrodla} />
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}
