'use client';

/* Wybrane realizacje w układzie makiety „Desktop - 2” (9.11.2026):
   po lewej oś na łuku z listą klientów (role="tablist"), po prawej karta
   wybranego klienta: logo, „Widoczność w Google”, opis, przełącznik
   Wyświetlenia / Kliknięcia, wykres, dwie metryki i źródło.

   Makieta miała przykładowe procenty (+437 %, +152 %) i krzywą z księżyca.
   Tu wszystko jest z prawdziwych paneli Search Console klientów: krzywe z
   lib/realizacjeGsc.js (odczyt z wykresu dziennego, opis metody w pliku),
   liczby w metrykach wprost z kafelków GSC. Wartości bezwzględne, nie
   procenty, tak samo jak w artykule /blog/wyniki-wdrozen-seo-2026.

   Karty wszystkich klientów są w HTML od razu (nieaktywne z atrybutem
   hidden), więc tekst jest w SSR także bez JS. */

import { useId, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { SERIE_GSC } from '@/lib/realizacjeGsc';

const MIESIACE_PL = ['sty', 'lut', 'mar', 'kwi', 'maj', 'cze', 'lip', 'sie', 'wrz', 'paź', 'lis', 'gru'];
const MIESIACE_PL_DOP = ['stycznia', 'lutego', 'marca', 'kwietnia', 'maja', 'czerwca', 'lipca', 'sierpnia', 'września', 'października', 'listopada', 'grudnia'];
const MIESIACE_EN = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const DZIEN = 86400000;

const data = (iso) => new Date(`${iso}T12:00:00Z`);

function odmiana(n, [jeden, kilka, wiele]) {
  if (n === 1) return jeden;
  const j = n % 10;
  const d = n % 100;
  return j >= 2 && j <= 4 && (d < 12 || d > 14) ? kilka : wiele;
}

function liczba(n, lang) {
  return new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : 'en-US').format(n);
}

function etykietaOsi(n, lang) {
  if (n >= 1000) {
    const t = n / 1000;
    const s = new Intl.NumberFormat(lang === 'pl' ? 'pl-PL' : 'en-US', { maximumFractionDigits: 1 }).format(t);
    return lang === 'pl' ? `${s} tys.` : `${s}k`;
  }
  return liczba(n, lang);
}

function zakresDat(od, doo, lang) {
  const a = data(od);
  const b = data(doo);
  const M = lang === 'pl' ? MIESIACE_PL_DOP : MIESIACE_EN;
  const dzien = (d) => d.getUTCDate();
  const mies = (d) => M[d.getUTCMonth()];
  const rok = b.getUTCFullYear();
  if (od === doo) return lang === 'pl' ? `${dzien(a)} ${mies(a)} ${rok}` : `${mies(a)} ${dzien(a)}, ${rok}`;
  if (a.getUTCMonth() === b.getUTCMonth()) {
    return lang === 'pl' ? `${dzien(a)}–${dzien(b)} ${mies(b)} ${rok}` : `${mies(a)} ${dzien(a)}–${dzien(b)}, ${rok}`;
  }
  return lang === 'pl'
    ? `${dzien(a)} ${mies(a)} – ${dzien(b)} ${mies(b)} ${rok}`
    : `${mies(a)} ${dzien(a)} – ${mies(b)} ${dzien(b)}, ${rok}`;
}

/* Krok osi Y: 1, 2, 2,5 albo 5 razy potęga dziesięciu, cztery przedziały. */
function skala(max, calkowite) {
  const surowy = Math.max(max, 1) / 4;
  const p = 10 ** Math.floor(Math.log10(surowy));
  let krok = [1, 2, 2.5, 5, 10].map((m) => m * p).find((k) => k >= surowy);
  if (calkowite) krok = Math.max(1, Math.ceil(krok));
  const gora = Math.ceil(Math.max(max, 1) / krok) * krok;
  const kreski = [];
  for (let v = 0; v <= gora + 1e-9; v += krok) kreski.push(Math.round(v * 100) / 100);
  return { gora, kreski };
}

/* Monotoniczna krzywa sześcienna (Fritsch-Carlson): gładka jak w makiecie,
   ale bez przestrzeleń poniżej zera i ponad szczyty, których w danych nie ma. */
function sciezka(p) {
  if (p.length < 2) return '';
  const n = p.length;
  const dx = [];
  const m = [];
  for (let i = 0; i < n - 1; i += 1) {
    dx.push(p[i + 1][0] - p[i][0]);
    m.push((p[i + 1][1] - p[i][1]) / dx[i]);
  }
  const t = [m[0]];
  for (let i = 1; i < n - 1; i += 1) t.push(m[i - 1] * m[i] <= 0 ? 0 : (m[i - 1] + m[i]) / 2);
  t.push(m[n - 2]);
  for (let i = 0; i < n - 1; i += 1) {
    if (m[i] === 0) { t[i] = 0; t[i + 1] = 0; continue; }
    const a = t[i] / m[i];
    const b = t[i + 1] / m[i];
    const h = a * a + b * b;
    if (h > 9) { const s = 3 / Math.sqrt(h); t[i] = s * a * m[i]; t[i + 1] = s * b * m[i]; }
  }
  const r = (v) => Math.round(v * 10) / 10;
  let d = `M${r(p[0][0])} ${r(p[0][1])}`;
  for (let i = 0; i < n - 1; i += 1) {
    const h = dx[i] / 3;
    d += ` C${r(p[i][0] + h)} ${r(p[i][1] + t[i] * h)} ${r(p[i + 1][0] - h)} ${r(p[i + 1][1] - t[i + 1] * h)} ${r(p[i + 1][0])} ${r(p[i + 1][1])}`;
  }
  return d;
}

const SZER = 800;
const WYS = 280;
const L = 58;
const P = 14;
const G = 64;
const D = 36;

function Wykres({ klucz, lang, idPanelu }) {
  const [miara, setMiara] = useState('wysw');
  const [wskazany, setWskazany] = useState(null);
  const ramka = useRef(null);
  const seria = SERIE_GSC[klucz];
  const tygodniowe = seria.length > 1 && seria[0][0] !== seria[0][1];

  const model = useMemo(() => {
    const t0 = data(seria[0][0]).getTime();
    const t1 = data(seria[seria.length - 1][1]).getTime();
    const sx = (t) => L + ((t - t0) / Math.max(t1 - t0, DZIEN)) * (SZER - L - P);
    const policz = (pole) => {
      const wart = seria.map((s) => s[pole]);
      /* 5 % zapasu nad szczytem; nad siatką pas G = 64 na dymek. */
      const { gora, kreski } = skala(Math.max(...wart) * 1.05, pole === 2);
      const sy = (v) => G + (1 - v / gora) * (WYS - G - D);
      const pkt = seria.map((s) => {
        const srodek = (data(s[0]).getTime() + data(s[1]).getTime()) / 2;
        return [sx(srodek), sy(s[pole])];
      });
      const linia = sciezka(pkt);
      const pole_ = `${linia} L${pkt[pkt.length - 1][0].toFixed(1)} ${WYS - D} L${pkt[0][0].toFixed(1)} ${WYS - D} Z`;
      const najw = wart.indexOf(Math.max(...wart));
      return { wart, kreski, sy, pkt, linia, pole: pole_, najw };
    };
    /* Etykiety osi X: przy trzech miesiącach pierwsze dni miesięcy, przy
       kilku tygodniach co siedem dni od startu. */
    const etykiety = [];
    const M = lang === 'pl' ? MIESIACE_PL : MIESIACE_EN;
    if (t1 - t0 > 40 * DZIEN) {
      const d = data(seria[0][0]);
      d.setUTCDate(1);
      for (d.setUTCMonth(d.getUTCMonth() + 1); d.getTime() <= t1; d.setUTCMonth(d.getUTCMonth() + 1)) {
        const nazwa = M[d.getUTCMonth()];
        etykiety.push([sx(d.getTime()), nazwa.charAt(0).toUpperCase() + nazwa.slice(1)]);
      }
    } else {
      for (let t = t0; t <= t1; t += 7 * DZIEN) {
        const d = new Date(t);
        etykiety.push([sx(t), lang === 'pl' ? `${d.getUTCDate()} ${M[d.getUTCMonth()]}` : `${M[d.getUTCMonth()]} ${d.getUTCDate()}`]);
      }
    }
    return { wysw: policz(3), klik: policz(2), etykiety };
  }, [seria, lang]);

  const m = model[miara];
  const indeks = wskazany ?? m.najw;
  const [px, py] = m.pkt[indeks];
  const wartosc = m.wart[indeks];
  const jednostka = miara === 'wysw'
    ? (lang === 'pl' ? odmiana(wartosc, ['wyświetlenie', 'wyświetlenia', 'wyświetleń']) : (wartosc === 1 ? 'impression' : 'impressions'))
    : (lang === 'pl' ? odmiana(wartosc, ['kliknięcie', 'kliknięcia', 'kliknięć']) : (wartosc === 1 ? 'click' : 'clicks'));
  const okolo = lang === 'pl' ? 'ok.' : 'approx.';
  const opis = (() => {
    const w = m.wart;
    const nazwa = miara === 'wysw' ? (lang === 'pl' ? 'wyświetleń' : 'impressions') : (lang === 'pl' ? 'kliknięć' : 'clicks');
    const okres = tygodniowe ? (lang === 'pl' ? 'tygodniowo' : 'per week') : (lang === 'pl' ? 'dziennie' : 'per day');
    return lang === 'pl'
      ? `Wykres ${nazwa} ${okres}, ${zakresDat(seria[0][0], seria[seria.length - 1][1], 'pl')}: na początku ok. ${liczba(w[0], 'pl')}, najwięcej ok. ${liczba(w[m.najw], 'pl')}, na końcu ok. ${liczba(w[w.length - 1], 'pl')}.`
      : `Chart of ${nazwa} ${okres}, ${zakresDat(seria[0][0], seria[seria.length - 1][1], 'en')}: approx. ${liczba(w[0], 'en')} at the start, approx. ${liczba(w[m.najw], 'en')} at the peak, approx. ${liczba(w[w.length - 1], 'en')} at the end.`;
  })();

  const najblizszy = (clientX) => {
    const el = ramka.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = ((clientX - r.left) / r.width) * SZER;
    let best = 0;
    m.pkt.forEach((p, i) => { if (Math.abs(p[0] - x) < Math.abs(m.pkt[best][0] - x)) best = i; });
    setWskazany(best);
  };

  const klawisze = (e) => {
    if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight' && e.key !== 'Home' && e.key !== 'End') return;
    e.preventDefault();
    const n = m.pkt.length;
    if (e.key === 'Home') setWskazany(0);
    else if (e.key === 'End') setWskazany(n - 1);
    else setWskazany(Math.min(n - 1, Math.max(0, indeks + (e.key === 'ArrowRight' ? 1 : -1))));
  };

  const etykietaMiary = (k) => (k === 'wysw'
    ? (lang === 'pl' ? 'Wyświetlenia' : 'Impressions')
    : (lang === 'pl' ? 'Kliknięcia' : 'Clicks'));

  return (
    <>
      <div className="realizacje-miary" role="group" aria-label={lang === 'pl' ? 'Dane na wykresie' : 'Chart data'}>
        {['wysw', 'klik'].map((k) => (
          <button
            key={k}
            type="button"
            className="realizacje-miara"
            aria-pressed={miara === k}
            aria-controls={`${idPanelu}-wykres`}
            onClick={() => { setMiara(k); setWskazany(null); }}
          >
            {etykietaMiary(k)}
          </button>
        ))}
      </div>
      <figure className="realizacje-wykres" id={`${idPanelu}-wykres`} data-miara={miara}>
        <div
          className="realizacje-wykres-ramka"
          ref={ramka}
          tabIndex={0}
          role="group"
          aria-roledescription={lang === 'pl' ? 'wykres' : 'chart'}
          aria-label={opis}
          onPointerMove={(e) => najblizszy(e.clientX)}
          onPointerLeave={() => setWskazany(null)}
          onKeyDown={klawisze}
          onBlur={() => setWskazany(null)}
        >
          <svg viewBox={`0 0 ${SZER} ${WYS}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
            <defs>
              <linearGradient id={`${idPanelu}-gradient`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" className="realizacje-gradient-gora" />
                <stop offset="100%" className="realizacje-gradient-dol" />
              </linearGradient>
            </defs>
            {m.kreski.map((v) => (
              <line key={v} className="realizacje-siatka" x1={L} x2={SZER - P} y1={m.sy(v)} y2={m.sy(v)} />
            ))}
            <path className="realizacje-pole" d={m.pole} fill={`url(#${idPanelu}-gradient)`} />
            <path className="realizacje-linia" d={m.linia} />
            <line className="realizacje-pion" x1={px} x2={px} y1={py} y2={WYS - D} />
            <circle className="realizacje-punkt" cx={px} cy={py} r="5" />
          </svg>
          {/* Etykiety w HTML, nie w SVG: przy preserveAspectRatio="none"
              tekst w SVG rozciągałby się razem z wykresem. */}
          {m.kreski.map((v) => (
            <span key={v} className="realizacje-os-y" data-t={etykietaOsi(v, lang)} style={{ top: `${(m.sy(v) / WYS) * 100}%` }} aria-hidden="true" />
          ))}
          {model.etykiety.map(([x, t]) => (
            <span key={t} className="realizacje-os-x" data-t={t} style={{ left: `${(x / SZER) * 100}%` }} aria-hidden="true" />
          ))}
          <div
            className="realizacje-dymek"
            aria-hidden="true"
            data-strona={px > SZER * 0.72 ? 'lewa' : px < SZER * 0.22 ? 'prawa' : 'srodek'}
            data-pion={py < 66 ? 'dol' : 'gora'}
            style={{ left: `${(px / SZER) * 100}%`, top: `${(py / WYS) * 100}%` }}
          >
            <span className="realizacje-dymek-data" data-t={zakresDat(seria[indeks][0], seria[indeks][1], lang)} />
            <span className="realizacje-dymek-wartosc" data-t={`${okolo} ${liczba(wartosc, lang)} ${jednostka}`} />
          </div>
        </div>
        <figcaption className="sr-only" aria-live="polite">
          {wskazany !== null ? `${zakresDat(seria[indeks][0], seria[indeks][1], lang)}: ${okolo} ${liczba(wartosc, lang)} ${jednostka}` : ''}
        </figcaption>
      </figure>
    </>
  );
}

/* Łuk osi: x(t) dla t = y / wysokość listy. Środek bliżej lewej krawędzi,
   końce dalej, jak w makiecie. */
const LUK_SRODEK = 22;
const LUK_KONCE = 70;
const lukX = (t) => LUK_SRODEK + (LUK_KONCE - LUK_SRODEK) * (1 - Math.sin(Math.PI * Math.min(1, Math.max(0, t))));
const KROPKA = 21; // środek kropki od lewej krawędzi zakładki (left 8 px + 13 px)

export default function Realizacje({ pozycje, lang, etykieta }) {
  const [aktywna, setAktywna] = useState(0);
  const lista = useRef(null);
  const [luk, setLuk] = useState(null);

  /* Kropki leżą dokładnie na łuku: po ułożeniu listy mierzymy środek każdej
     zakładki i z tej samej funkcji liczymy jej przesunięcie oraz ścieżkę łuku.
     Przed pomiarem (SSR) działa przybliżenie z CSS (sin() w .realizacje-zakladka). */
  useLayoutEffect(() => {
    const el = lista.current;
    if (!el || typeof ResizeObserver === 'undefined') return undefined;
    const licz = () => {
      if (getComputedStyle(el).flexDirection !== 'column') { setLuk(null); return; }
      const H = el.clientHeight;
      if (!H) return;
      const zak = [...el.querySelectorAll('[role="tab"]')];
      const przes = zak.map((z) => Math.round(lukX((z.offsetTop + z.offsetHeight / 2) / H) - KROPKA));
      let d = '';
      for (let i = 0; i <= 40; i += 1) {
        const t = i / 40;
        d += `${i ? ' L' : 'M'}${lukX(t).toFixed(1)} ${(t * H).toFixed(1)}`;
      }
      setLuk({ H, przes, d });
    };
    licz();
    const ro = new ResizeObserver(licz);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const baza = `r${useId().replace(/[^a-zA-Z0-9]/g, '')}`;
  const zakladki = useRef([]);

  const klawisze = (e, i) => {
    const n = pozycje.length;
    let j = null;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') j = (i + 1) % n;
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') j = (i - 1 + n) % n;
    if (e.key === 'Home') j = 0;
    if (e.key === 'End') j = n - 1;
    if (j === null) return;
    e.preventDefault();
    setAktywna(j);
    zakladki.current[j]?.focus();
  };

  return (
    <div className="realizacje" style={{ ['--realizacje-n']: pozycje.length, ['--realizacje-aktywna']: aktywna }}>
      <div className="realizacje-os" role="tablist" aria-label={etykieta} aria-orientation="vertical" ref={lista} data-luk={luk ? 'zmierzony' : undefined}>
        <svg className="realizacje-luk" viewBox={`0 0 72 ${luk ? luk.H : 400}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path d={luk ? luk.d : 'M70 0 C 6 120, 6 280, 70 400'} />
        </svg>
        {pozycje.map((p, i) => (
          <button
            key={p.id}
            ref={(el) => { zakladki.current[i] = el; }}
            type="button"
            role="tab"
            id={`${baza}-zakladka-${p.id}`}
            aria-selected={aktywna === i}
            aria-controls={`${baza}-panel-${p.id}`}
            tabIndex={aktywna === i ? 0 : -1}
            className="realizacje-zakladka"
            style={luk ? { ['--i']: i, marginLeft: `${luk.przes[i]}px` } : { ['--i']: i }}
            onClick={() => setAktywna(i)}
            onKeyDown={(e) => klawisze(e, i)}
          >
            <span className="realizacje-kropka" aria-hidden="true" />
            <span className="realizacje-zakladka-nazwa">
              {p.nazwa}
              <svg className="realizacje-strzalka" viewBox="0 0 16 16" aria-hidden="true" focusable="false">
                <path d="M4 12 12 4M5.5 4H12v6.5" />
              </svg>
            </span>
            <span className="realizacje-zakladka-tag">{p.tag}</span>
          </button>
        ))}
      </div>

      {/* Bez JavaScriptu zakładki nie działają, więc wtedy widać wszystkie karty. */}
      <noscript>
        <style>{'.realizacje-karta[hidden]{display:grid!important;margin-top:56px}.realizacje-miary,.realizacje-dymek{display:none!important}'}</style>
      </noscript>
      <div className="realizacje-karty">
        {pozycje.map((p, i) => (
          <div
            key={p.id}
            role="tabpanel"
            id={`${baza}-panel-${p.id}`}
            aria-labelledby={`${baza}-zakladka-${p.id}`}
            hidden={aktywna !== i}
            className="realizacje-karta"
          >
            <div className="realizacje-marka">{p.logo}</div>
            {/* Nazwa klienta tylko dla czytników i wyszukiwarek: cztery karty
                nie mają czterech identycznych nagłówków, a wygląd zostaje jak w makiecie. */}
            <h3 className="realizacje-tytul">
              <span className="sr-only">{p.nazwa}: </span>
              {lang === 'pl' ? 'Widoczność w Google' : 'Visibility in Google'}
            </h3>
            <p className="realizacje-opis">{p.opis}</p>
            <Wykres klucz={p.seria} lang={lang} idPanelu={`${baza}-panel-${p.id}`} />
            <dl className="realizacje-metryki">
              {p.metryki.map(([wartosc, podpis]) => (
                <div className="realizacje-metryka" key={podpis}>
                  <dt>{podpis}</dt>
                  <dd>{wartosc}</dd>
                </div>
              ))}
            </dl>
            <div className="realizacje-stopka">
              <p className="realizacje-zrodlo">
                <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><rect x="2.5" y="3.5" width="11" height="10" rx="1.5" /><path d="M2.5 6.5h11M5.5 2v3M10.5 2v3" /></svg>
                <span>{p.okres}</span>
                <span className="realizacje-zrodlo-kreska" aria-hidden="true" />
                <span>{p.zrodlo}</span>
              </p>
              {p.cta}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
