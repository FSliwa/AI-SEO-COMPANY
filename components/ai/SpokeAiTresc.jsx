// Treść spoke'a huba GEO z danych lib/pytaniaAi.js (5.11.2026, PLAN-v2 6.5 A2, 6.7 A5).
// Bez hooków i bez 'use client': renderuje się na serwerze (cała treść w HTML dla botów AI,
// krok 4 z A2), a do przeglądarki trafiają tylko komponenty klienckie z SpokeAiLayout.
//
// Hierarchia nagłówków: H2 sekcji -> H3 podsekcji, bez przeskoków. Tabele przez wspólny
// CompareTable (przewija się tylko kontener na 390 px), obraz przez next/image z podpisem.
// Linki wewnętrzne przez Link z @/i18n/routing; cel nieopublikowany = zwykły tekst (reguła 6.0).

import Image from 'next/image';
import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { sectionId, hash } from '@/lib/anchors';
import { celLinku, spelniony } from './segmenty';

const S = {
  h2: { fontSize: 'clamp(1.6rem, 3.5vw, 2.2rem)', lineHeight: 1.2, fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--color-text-dark)', margin: '3.5rem 0 1.25rem', scrollMarginTop: '110px' },
  h3: { fontSize: 'clamp(1.2rem, 2.4vw, 1.45rem)', lineHeight: 1.3, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--color-text-dark)', margin: '2.25rem 0 0.75rem', scrollMarginTop: '110px' },
  p: { fontSize: '1.08rem', lineHeight: 1.7, color: '#333336', margin: '0 0 1.1rem' },
  lista: { margin: '0 0 1.25rem', paddingLeft: '1.4rem', display: 'grid', gap: '0.5rem', fontSize: '1.08rem', lineHeight: 1.65, color: '#333336' },
  link: { color: 'var(--color-primary)', textDecoration: 'underline', textUnderlineOffset: '3px' },
  podpis: { margin: '0.75rem 0 0', fontSize: '0.88rem', lineHeight: 1.5, color: '#6E6E73' },
  karta: { background: '#FFFFFF', borderRadius: '20px', padding: 'clamp(1.1rem, 3vw, 1.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', margin: '1.5rem 0 2rem' },
};

/** id sekcji H2: kotwica z lib/anchors.js (np. 'zrodla') albo pole id wpisu. */
export function idSekcji(s) {
  return s.kotwica ? sectionId(s.kotwica, 'pl') : s.id;
}

/** Segmenty tekstu (string | link warunkowy | fragment z warunkiem) jako węzły React. */
export function Segmenty({ segs = [] }) {
  return (
    <>
      {segs.map((s, i) => {
        if (typeof s === 'string') return s;
        if (s && s.tresc) return spelniony(s.warunek) ? <Segmenty key={i} segs={s.tresc} /> : null;
        if (s && s.a) {
          const cel = celLinku(s);
          if (!cel) return s.a;
          return cel.startsWith('/')
            ? <Link key={i} href={cel} style={S.link}>{s.a}</Link>
            : <a key={i} href={cel} style={S.link}>{s.a}</a>;
        }
        return null;
      })}
    </>
  );
}

/**
 * Przyciski CTA. kontakt: true -> kotwica #kontakt z data-plan (AnalyticsEvents.jsx wysyła
 * pricing_plan_click i ustawia pakiet w formularzu Contact). Przycisk z celem przed publikacją
 * nie renderuje się wcale.
 */
export function Przyciski({ przyciski = [], style }) {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center', ...style }}>
      {przyciski.map((b) => {
        const klasa = b.glowny ? 'btn btn-primary' : 'btn btn-secondary';
        if (b.kontakt) {
          return <a key={b.tekst} href={hash('kontakt', 'pl')} className={klasa} data-plan={b.plan} data-cta={b.cta}>{b.tekst}</a>;
        }
        const cel = celLinku(b);
        if (!cel) return null;
        return cel.startsWith('/')
          ? <Link key={b.tekst} href={cel} className={klasa} data-cta={b.cta}>{b.tekst}</Link>
          : <a key={b.tekst} href={cel} className={klasa} data-cta={b.cta}>{b.tekst}</a>;
      })}
    </div>
  );
}

// Wykres słupkowy z liczbami w tekście (dostępny bez obrazu i bez alt): etykieta, „59 z 62”,
// pasek proporcji ukryty dla czytników. Liczby wyłącznie z danych wpisu.
function Wykres({ tytul, slupki = [], podpis }) {
  return (
    <figure style={S.karta}>
      <figcaption style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--color-text-dark)', margin: '0 0 1rem' }}>{tytul}</figcaption>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {slupki.map((s) => {
          const proc = s.z ? Math.round((s.wartosc / s.z) * 100) : 0;
          return (
            <div key={s.etykieta}>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap', fontSize: '0.95rem', lineHeight: 1.4, color: '#333336', marginBottom: '0.4rem' }}>
                <span>{s.etykieta}</span>
                <span style={{ fontWeight: 700, color: 'var(--color-text-dark)', whiteSpace: 'nowrap' }}>{s.wartosc} z {s.z} linków</span>
              </div>
              <div aria-hidden="true" style={{ height: '12px', background: '#E5E5EA', borderRadius: '999px', overflow: 'hidden' }}>
                <div style={{ width: `${proc}%`, height: '100%', background: 'var(--color-primary)', borderRadius: '999px' }} />
              </div>
            </div>
          );
        })}
      </div>
      {podpis && <p style={S.podpis}>{podpis}</p>}
    </figure>
  );
}

function Obraz({ src, alt, width, height, podpis }) {
  return (
    <figure style={{ margin: '1.5rem 0 2rem' }}>
      <Image src={src} alt={alt} width={width} height={height} sizes="(max-width: 900px) 100vw, 820px" style={{ width: '100%', height: 'auto', borderRadius: '18px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.14)' }} />
      {podpis && <figcaption style={S.podpis}>{podpis}</figcaption>}
    </figure>
  );
}

function Blok({ blok }) {
  if (!spelniony(blok.warunek)) return null;
  if (blok.p) return <p style={S.p}><Segmenty segs={blok.p} /></p>;
  if (blok.lista) {
    const Lista = blok.numerowana ? 'ol' : 'ul';
    return (
      <Lista style={S.lista}>
        {blok.lista.map((li, i) => <li key={i}><Segmenty segs={li} /></li>)}
      </Lista>
    );
  }
  if (blok.tabela) return <CompareTable {...blok.tabela} />;
  if (blok.obraz) return <Obraz {...blok.obraz} />;
  if (blok.wykres) return <Wykres {...blok.wykres} />;
  return null;
}

// Data odczytu jak w components/Zrodla.jsx: '2026-11-05' -> '5.11.2026'.
function dataOdczytu(data) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(data || '');
  return m ? `${Number(m[3])}.${m[2]}.${m[1]}` : data;
}

function ZrodloPodsekcji({ zrodlo }) {
  if (!zrodlo) return null;
  return (
    <p style={S.podpis}>
      Źródło: <a href={zrodlo.url} rel="noopener" style={S.link}>{zrodlo.nazwa}</a>{zrodlo.data ? ` (odczyt: ${dataOdczytu(zrodlo.data)})` : ''}
    </p>
  );
}

/** Sekcje H2 wpisu (z podsekcjami H3) w kolejności z lib/pytaniaAi.js. */
export default function SpokeAiTresc({ sections = [] }) {
  return (
    <>
      {sections.map((s) => {
        const id = idSekcji(s);
        return (
          <section key={id} aria-labelledby={id}>
            <h2 id={id} style={S.h2}>{s.h2}</h2>
            {(s.bloki || []).map((b, i) => <Blok key={i} blok={b} />)}
            {(s.podsekcje || []).map((ps, i) => (
              <div key={ps.id ?? i}>
                <h3 id={ps.id} style={S.h3}>{ps.h3}</h3>
                {(ps.bloki || []).map((b, j) => <Blok key={j} blok={b} />)}
                <ZrodloPodsekcji zrodlo={ps.zrodlo} />
              </div>
            ))}
          </section>
        );
      })}
    </>
  );
}
