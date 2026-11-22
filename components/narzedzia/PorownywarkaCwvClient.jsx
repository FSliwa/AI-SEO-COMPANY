'use client';

// Porównywarka Core Web Vitals i Wycieku Konwersji: WordPress vs Next.js (Live CrUX VS) - PL + EN.
// Endpoint: POST ${PANEL_API}/cwv-vs z { urlA, urlB: urlB || undefined, lang: 'pl' | 'en' }.
// Obsługuje ?a=&b=&ruch=&wartosc= (także zapasowo ?url=) oraz tryb DEMO.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku from './LinkWyniku';
import { PasekDemo, Postep } from './Wspolne';
import Zwin from './Zwin';
import st from './narzedzia.module.css';

const CSS_CWV = `
.cwv-pola-url { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 0.9rem; }
.cwv-suwaki { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr)); gap: 1rem; padding: 1rem 1.15rem; border-radius: 16px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.cwv-suwak-naglowek { display: flex; justify-content: space-between; align-items: baseline; gap: 0.5rem; margin-bottom: 0.35rem; }
.cwv-suwak-wartosc { font-weight: 700; font-size: 1.05rem; color: var(--w-tusz); font-variant-numeric: tabular-nums; }
.cwv-tabela th, .cwv-tabela td { padding: 0.75rem 0.7rem; vertical-align: top; }
.cwv-kol-next { background: rgba(216, 90, 48, 0.06); }
.cwv-metr { display: inline-flex; align-items: center; gap: 0.35rem; padding: 0.25rem 0.65rem; border-radius: 999px; font-weight: 700; font-size: 0.88rem; font-variant-numeric: tabular-nums; white-space: nowrap; }
.cwv-metr--dobra { background: rgba(4, 120, 87, 0.12); color: #047857; }
.cwv-metr--srednia { background: rgba(180, 83, 9, 0.13); color: #b45309; }
.cwv-metr--slaba { background: rgba(179, 38, 30, 0.13); color: #b3261e; }
.cwv-metr--brak { background: rgba(30, 30, 30, 0.07); color: var(--w-tusz-2); }
.cwv-wtyczki { display: flex; flex-wrap: wrap; gap: 0.3rem; justify-content: center; margin-top: 0.25rem; }
.cwv-wtyczka { display: inline-block; padding: 0.16rem 0.5rem; border-radius: 999px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); font-size: 0.75rem; color: var(--w-tusz); }
.cwv-wyciek-karta { padding: clamp(1.2rem, 3vw, 1.65rem); border-radius: 20px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); display: grid; gap: 1rem; }
.cwv-wyciek-siatka { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 200px), 1fr)); gap: 0.75rem; }
.cwv-wyciek-boks { padding: 0.95rem 1.05rem; border-radius: 14px; background: #ffffff; border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.cwv-tco-siatka { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 300px), 1fr)); gap: 0.9rem; }
.cwv-tco-kol { min-width: 0; padding: 1.15rem 1.25rem; border-radius: 18px; border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); background: #ffffff; display: grid; gap: 0.55rem; align-content: start; }
.cwv-tco-kol .btn { width: 100%; max-width: 100%; white-space: normal; text-align: center; justify-content: center; height: auto; line-height: 1.3; }
.cwv-tco-kol--booster { background: linear-gradient(135deg, #101935 0%, #1d2b53 100%); color: #ffffff; border-color: transparent; }
.cwv-tco-kol--booster p, .cwv-tco-kol--booster li { color: rgba(255, 255, 255, 0.88); }
.cwv-tco-lista { margin: 0; padding-left: 1.15rem; display: grid; gap: 0.35rem; font-size: 0.9rem; line-height: 1.5; }
.cwv-crux-wrap { margin-top: 0.45rem; display: grid; gap: 0.22rem; text-align: left; font-variant-numeric: tabular-nums; }
.cwv-crux-pasek { display: flex; width: 100%; height: 7px; border-radius: 999px; overflow: hidden; background: rgba(15, 23, 42, 0.08); }
.cwv-crux-opis { font-size: 0.72rem; line-height: 1.35; color: var(--w-tusz-2); }
.cwv-selektor { display: block; max-width: 100%; margin-top: 0.38rem; padding: 0.2rem 0.45rem; border-radius: 6px; background: rgba(15, 23, 42, 0.06); font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace); font-size: 0.72rem; color: var(--w-tusz); overflow-wrap: anywhere; text-align: left; }
.cwv-odznaka-cache { display: inline-flex; align-items: center; padding: 0.18rem 0.55rem; border-radius: 999px; background: rgba(15, 23, 42, 0.06); border: 1px solid rgba(15, 23, 42, 0.12); font-size: 0.74rem; font-weight: 600; color: var(--w-tusz-2); font-variant-numeric: tabular-nums; }
`;

const BENCHMARK_DOMYSLNY = {
  nazwa: 'Booster Pack (Next.js SSR)',
  cms: 'Next.js App Router (0 PHP)',
  wtyczki: [],
  skryptyBlokujace: 0,
  obrazyBezWymiarow: 0,
  wagaHtmlKb: 28,
  selektorLcp: 'main > section.hero > h1',
  rozkladCrux: { lcp: [96, 3, 1], inp: [98, 2, 0], cls: [99, 1, 0] },
  metryki: {
    lcpMs: 1150,
    inpMs: 48,
    cls: 0,
    ttfbMs: 185,
    ocena: 'dobra',
    wynik: 99,
    selektorLcp: 'main > section.hero > h1',
    rozkladCrux: { lcp: [96, 3, 1], inp: [98, 2, 0], cls: [99, 1, 0] },
  },
};

function wyciagnijTrojkeCrux(daneStrony, klucz = 'lcp') {
  const r = daneStrony?.metryki?.rozkladCrux ?? daneStrony?.rozkladCrux;
  if (!r) return null;
  const zrodlo = Array.isArray(r) ? r : r[klucz];
  if (Array.isArray(zrodlo) && zrodlo.length >= 3) {
    const [dobre, poprawa, wolne] = zrodlo.map((x) => Math.max(0, Math.round(Number(x) || 0)));
    if (dobre + poprawa + wolne > 0) return [dobre, poprawa, wolne];
  }
  if (typeof r.dobre === 'number' && klucz === 'lcp') {
    return [Math.round(r.dobre), Math.round(r.doPoprawy || 0), Math.round(r.wolne || 0)];
  }
  return null;
}

function PasekRozkladuCrux({ trojka, en, zwiezly = false }) {
  if (!trojka) return null;
  const [dobre, poprawa, wolne] = trojka;
  const tytul = en
    ? `CrUX distribution: ${dobre}% Good / ${poprawa}% Needs Improvement / ${wolne}% Poor`
    : `Rozkład CrUX: ${dobre}% Dobre / ${poprawa}% Do poprawy / ${wolne}% Wolne`;
  return (
    <div className="cwv-crux-wrap" title={tytul}>
      <div className="cwv-crux-pasek" role="img" aria-label={tytul}>
        {dobre > 0 && <span style={{ width: `${dobre}%`, background: '#047857' }} />}
        {poprawa > 0 && <span style={{ width: `${poprawa}%`, background: '#d97706' }} />}
        {wolne > 0 && <span style={{ width: `${wolne}%`, background: '#b3261e' }} />}
      </div>
      <span className="cwv-crux-opis">
        {zwiezly
          ? `${dobre}% / ${poprawa}% / ${wolne}%`
          : (en
            ? `${dobre}% Good · ${poprawa}% Needs Fix · ${wolne}% Slow`
            : `${dobre}% Dobre · ${poprawa}% Do poprawy · ${wolne}% Wolne`)}
      </span>
    </div>
  );
}

function wyczyscDomene(surowy) {
  const s = String(surowy || '').trim();
  if (!s) return '';
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '');
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || '';
  }
}

function klasaLcp(ms) {
  if (!Number.isFinite(ms)) return 'brak';
  if (ms <= 2500) return 'dobra';
  if (ms <= 4000) return 'srednia';
  return 'slaba';
}

function klasaInp(ms) {
  if (!Number.isFinite(ms)) return 'brak';
  if (ms <= 200) return 'dobra';
  if (ms <= 500) return 'srednia';
  return 'slaba';
}

function klasaCls(v) {
  if (!Number.isFinite(v)) return 'brak';
  if (v <= 0.1) return 'dobra';
  if (v <= 0.25) return 'srednia';
  return 'slaba';
}

function klasaTtfb(ms) {
  if (!Number.isFinite(ms)) return 'brak';
  if (ms <= 800) return 'dobra';
  if (ms <= 1800) return 'srednia';
  return 'slaba';
}

function klasaWyniku(w) {
  if (!Number.isFinite(w)) return 'brak';
  if (w >= 90) return 'dobra';
  if (w >= 50) return 'srednia';
  return 'slaba';
}

function demoStrona(surowyUrl, wariant, en) {
  const domena = wyczyscDomene(surowyUrl) || (wariant === 'A' ? 'twojafirma.pl' : 'konkurent.pl');
  const jestSzybka = domena.includes('ai-seo-company') || domena.includes('vercel') || domena.includes('nextjs');
  if (jestSzybka) {
    return {
      url: `https://www.${domena}/`,
      domena,
      zrodlo: en ? 'CrUX 28-day Chrome Field Data' : 'Dane CrUX z 28 dni (Chrome)',
      cms: 'Next.js SSR',
      wtyczki: [],
      skryptyBlokujace: 0,
      obrazyBezWymiarow: 0,
      wagaHtmlKb: 31,
      selektorLcp: 'main > section.hero > h1',
      rozkladCrux: { lcp: [94, 4, 2], inp: [96, 3, 1], cls: [98, 2, 0] },
      metryki: {
        lcpMs: 1220,
        inpMs: 54,
        cls: 0.01,
        ttfbMs: 210,
        ocena: 'dobra',
        wynik: 97,
        selektorLcp: 'main > section.hero > h1',
        rozkladCrux: { lcp: [94, 4, 2], inp: [96, 3, 1], cls: [98, 2, 0] },
      },
    };
  }
  if (wariant === 'B') {
    return {
      url: `https://${domena}/`,
      domena,
      zrodlo: en ? 'CrUX 28-day Chrome Field Data' : 'Dane CrUX z 28 dni (Chrome)',
      cms: 'WordPress + Gutenberg',
      wtyczki: ['Yoast SEO', 'WP Rocket', 'Contact Form 7'],
      skryptyBlokujace: 5,
      obrazyBezWymiarow: 2,
      wagaHtmlKb: 96,
      selektorLcp: 'div.wp-block-cover > img.wp-post-image',
      rozkladCrux: { lcp: [68, 21, 11], inp: [76, 16, 8], cls: [82, 12, 6] },
      metryki: {
        lcpMs: 2680,
        inpMs: 195,
        cls: 0.07,
        ttfbMs: 760,
        ocena: 'srednia',
        wynik: 74,
        selektorLcp: 'div.wp-block-cover > img.wp-post-image',
        rozkladCrux: { lcp: [68, 21, 11], inp: [76, 16, 8], cls: [82, 12, 6] },
      },
    };
  }
  return {
    url: `https://${domena}/`,
    domena,
    zrodlo: en ? 'CrUX 28-day Chrome Field Data' : 'Dane CrUX z 28 dni (Chrome)',
    cms: 'WordPress + Elementor',
    wtyczki: ['Elementor', 'Slider Revolution', 'Contact Form 7', 'WooCommerce', 'WPML'],
    skryptyBlokujace: 11,
    obrazyBezWymiarow: 6,
    wagaHtmlKb: 184,
    selektorLcp: 'section.elementor-top-section img.rev-slidebg',
    rozkladCrux: { lcp: [38, 31, 31], inp: [52, 29, 19], cls: [61, 22, 17] },
    metryki: {
      lcpMs: 3850,
      inpMs: 295,
      cls: 0.16,
      ttfbMs: 1120,
      ocena: 'slaba',
      wynik: 46,
      selektorLcp: 'section.elementor-top-section img.rev-slidebg',
      rozkladCrux: { lcp: [38, 31, 31], inp: [52, 29, 19], cls: [61, 22, 17] },
    },
  };
}

export function PorownywarkaCwvClient() {
  const en = useLocale() === 'en';
  const jezyk = en ? 'en-US' : 'pl-PL';
  const domyslnaWartosc = en ? 800 : 2500;

  const [urlA, setUrlA] = useState('');
  const [urlB, setUrlB] = useState('');
  const [ruchMobilny, setRuchMobilny] = useState(3000);
  const [wartoscKlienta, setWartoscKlienta] = useState(domyslnaWartosc);
  const [stan, setStan] = useState({ status: 'idle', blad: null, dane: null, id: null });

  const poleARef = useRef(null);
  const poleBRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['a', 'b', 'url', 'ruch', 'wartosc', 'wynik'], (p) => {
    if (p.a || p.url) setUrlA(p.a || p.url);
    if (p.b) setUrlB(p.b);
    const r = Number(p.ruch);
    if (Number.isFinite(r) && r >= 100 && r <= 200000) setRuchMobilny(Math.round(r));
    const w = Number(p.wartosc);
    if (Number.isFinite(w) && w >= 50 && w <= 100000) setWartoscKlienta(Math.round(w));
    if (p.wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(p.wynik)) {
      setStan({ status: 'loading', blad: null, dane: null, id: p.wynik });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(p.wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            if (!p.a && !p.url && data.podglad.stronaA?.domena) setUrlA(data.podglad.stronaA.domena);
            if (!p.b && data.podglad.stronaB?.domena) setUrlB(data.podglad.stronaB.domena);
            setStan({ status: 'done', blad: null, dane: data.podglad, id: p.wynik });
          } else {
            setStan({ status: 'idle', blad: null, dane: null, id: null });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, dane: null, id: null }));
    }
  });

  useEffect(() => {
    if (stan.status === 'done') wynikRef.current?.focus({ preventScroll: true });
  }, [stan.status]);

  const formatKwoty = (kwota) => {
    const n = Math.round(kwota);
    return en ? `€${n.toLocaleString('en-US')}` : `${n.toLocaleString('pl-PL')} zł`;
  };

  const formatSekund = (ms) => {
    if (!Number.isFinite(ms)) return en ? 'no data' : 'brak';
    return `${(ms / 1000).toLocaleString(jezyk, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`;
  };

  const formatCls = (v) => {
    if (!Number.isFinite(v)) return en ? 'no data' : 'brak';
    return Number(v).toLocaleString(jezyk, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  };

  async function uruchomPorownanie(e) {
    e.preventDefault();
    const czysteA = urlA.trim();
    const czysteB = urlB.trim();
    if (!czysteA) {
      poleARef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, dane: null, id: null });
    zapiszParametry({
      a: czysteA,
      b: czysteB || null,
      ruch: ruchMobilny,
      wartosc: wartoscKlienta,
      wynik: null,
    });
    track('narzedzie_start', { narzedzie: 'cwv_vs', zKonkurentem: Boolean(czysteB) });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 950));
      const d = {
        ok: true,
        stronaA: demoStrona(czysteA, 'A', en),
        stronaB: czysteB ? demoStrona(czysteB, 'B', en) : null,
        benchmarkNextjs: BENCHMARK_DOMYSLNY,
      };
      track('narzedzie_wynik', { narzedzie: 'cwv_vs', wynikA: d.stronaA.metryki.wynik });
      setStan({ status: 'done', blad: null, dane: d });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 60_000);
    try {
      const res = await fetch(`${PANEL_API}/cwv-vs`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          urlA: czysteA,
          urlB: czysteB || undefined,
          lang: en ? 'en' : 'pl',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not retrieve Core Web Vitals for this URL. Check the domain and try again.' : 'Nie udało się pobrać wyników Core Web Vitals dla tego adresu. Sprawdź domenę i spróbuj ponownie.'),
          dane: null,
        });
        return;
      }
      const surowyWynik = data.podglad || data;
      const d = { ...surowyWynik, zCache: Boolean(data.zCache || surowyWynik?.zCache) };
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'cwv_vs', wynikA: d.stronaA?.metryki?.wynik });
      setStan({ status: 'done', blad: null, dane: d, id: runId });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'Measurement timed out after 60 s. PageSpeed Insights may be under heavy load - please retry.' : 'Pomiar przekroczył limit 60 s. Google PageSpeed Insights może być chwilowo obciążone - spróbuj ponownie.')
          : (en ? 'Connection to the measurement server failed. Check your network and try again.' : 'Brak połączenia z serwerem pomiarowym. Sprawdź internet i spróbuj ponownie.'),
        dane: null,
      });
    } finally {
      clearTimeout(zegar);
    }
  }

  function wybierzBoosterKontakt() {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: 'Booster Pack' }));
    }
    track('narzedzie_bofu_klik', { narzedzie: 'cwv_vs', plan: 'Booster Pack' });
  }

  const d = stan.dane;
  const stronaA = d?.stronaA || null;
  const stronaB = d?.stronaB || null;
  const bench = {
    ...BENCHMARK_DOMYSLNY,
    ...(d?.benchmarkNextjs || {}),
    metryki: { ...BENCHMARK_DOMYSLNY.metryki, ...(d?.benchmarkNextjs?.metryki || {}) },
  };

  // Wyliczenie wycieku konwersji mobilnej wg badania Google / Deloitte ("Milliseconds Make Millions"):
  // kazde 0,1 s opoznienia na mobile obniza konwersje o ~7-8% wzglednie; stosujemy ostrozny model z limitem 48%.
  const kalkulacja = useMemo(() => {
    const suroweLcp = stronaA?.metryki?.lcpMs;
    const suroweInp = stronaA?.metryki?.inpMs;
    const maLcp = Number.isFinite(suroweLcp);
    const maInp = Number.isFinite(suroweInp);
    const brakPomiaru = Boolean(stronaA) && !maLcp && !maInp;
    const lcpCel = Number(bench.metryki.lcpMs || 1150);
    const nadwyzkaMs = maLcp ? Math.max(0, Number(suroweLcp) - lcpCel) : 0;
    const kroki100ms = nadwyzkaMs / 100;
    const karaLcp = kroki100ms > 0 ? (1 - Math.pow(0.968, Math.min(kroki100ms, 24))) : 0;
    const inpNadwyzkaMs = maInp && Number(suroweInp) > 200 ? Number(suroweInp) - 200 : 0;
    const karaInp = inpNadwyzkaMs > 0 ? Math.min(0.08, (inpNadwyzkaMs / 300) * 0.06) : 0;
    const odsetekUtraty = brakPomiaru ? 0 : Math.min(0.48, Math.max(0, karaLcp + karaInp));

    const bazoweZapytania = ruchMobilny * 0.022;
    const utraconeZapytaniaMies = bazoweZapytania * odsetekUtraty;
    const utraconyPrzychodMies = utraconeZapytaniaMies * wartoscKlienta;
    const utraconyPrzychodRok = utraconyPrzychodMies * 12;

    // 24-miesieczne TCO: klasyczne wdrozenie WordPress + opieka + hosting + osobne SEO vs Booster Pack (strona 0 zl/0 EUR na start)
    const tcoWordpress24 = en
      ? { budowa: 4200, utrzymanieIWtyczki: 1920, seo24: 24 * CENY.seoStandard.eur, razem: 4200 + 1920 + 24 * CENY.seoStandard.eur }
      : { budowa: 12000, utrzymanieIWtyczki: 6000, seo24: 24 * CENY.seoStandard.pln, razem: 12000 + 6000 + 24 * CENY.seoStandard.pln };

    const tcoBooster24 = en
      ? { budowa: 0, miesiecznie: CENY.boosterPack.eur, razem: 24 * CENY.boosterPack.eur }
      : { budowa: 0, miesiecznie: CENY.boosterPack.pln, razem: 24 * CENY.boosterPack.pln };

    return {
      brakPomiaru,
      nadwyzkaSek: nadwyzkaMs / 1000,
      inpNadwyzkaMs,
      odsetekProc: Math.round(odsetekUtraty * 100),
      utraconeZapytaniaMies,
      utraconyPrzychodMies,
      utraconyPrzychodRok,
      tcoWordpress24,
      tcoBooster24,
    };
  }, [stronaA, bench.metryki.lcpMs, ruchMobilny, wartoscKlienta, en]);

  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');
  const kolumny = stronaA ? [
    { klucz: 'a', naglowek: en ? 'Your Website' : 'Twoja strona', dane: stronaA, next: false },
    ...(stronaB ? [{ klucz: 'b', naglowek: en ? 'Competitor' : 'Konkurent', dane: stronaB, next: false }] : []),
    { klucz: 'next', naglowek: en ? 'Next.js Architecture (Booster Pack)' : 'Architektura Next.js (Booster Pack)', dane: bench, next: true },
  ] : [];

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1040px' }}>
      <style>{CSS_CWV}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomPorownanie}>
        <div className="cwv-pola-url">
          <div>
            <label htmlFor="cwv-url-a" className="narz-etykieta">
              {en ? 'Your website URL' : 'Twoja strona (adres URL lub domena)'}
            </label>
            <input
              ref={poleARef}
              id="cwv-url-a"
              name="a"
              required
              maxLength={300}
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'cwv-blad' : undefined}
            />
          </div>

          <div>
            <label htmlFor="cwv-url-b" className="narz-etykieta">
              {en ? 'Competitor URL (optional)' : 'Strona konkurenta (opcjonalnie)'}
            </label>
            <input
              ref={poleBRef}
              id="cwv-url-b"
              name="b"
              maxLength={300}
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              placeholder={en ? 'e.g. competitor.com' : 'np. konkurent.pl'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
            />
          </div>
        </div>

        <p className="narz-mikro" style={{ marginTop: '-0.25rem' }}>
          {en ? 'Quick example: ' : 'Szybki przykład: '}
          <button
            type="button"
            className={st.przyciskTekstowy}
            onClick={() => {
              setUrlA('staniax.pl');
              setUrlB('ai-seo-company.pl');
              poleARef.current?.focus();
            }}
          >
            staniax.pl vs ai-seo-company.pl
          </button>
        </p>

        {/* Interaktywne suwaki ruchu mobilnego i wartosci klienta */}
        <div className="cwv-suwaki">
          <div>
            <div className="cwv-suwak-naglowek">
              <label htmlFor="cwv-ruch" className="narz-etykieta" style={{ margin: 0 }}>
                {en ? 'Monthly mobile traffic' : 'Miesięczny ruch mobilny'}
              </label>
              <span className="cwv-suwak-wartosc">
                {ruchMobilny.toLocaleString(jezyk)} {en ? 'visits/mo' : 'wizyt/mies.'}
              </span>
            </div>
            <input
              id="cwv-ruch"
              type="range"
              min={200}
              max={50000}
              step={100}
              value={ruchMobilny}
              onChange={(e) => {
                const v = Number(e.target.value);
                setRuchMobilny(v);
                if (stan.status === 'done') zapiszParametry({ ruch: v });
              }}
              className="narz-suwak"
            />
          </div>

          <div>
            <div className="cwv-suwak-naglowek">
              <label htmlFor="cwv-wartosc" className="narz-etykieta" style={{ margin: 0 }}>
                {en ? 'Average customer value' : 'Średnia wartość klienta'}
              </label>
              <span className="cwv-suwak-wartosc">{formatKwoty(wartoscKlienta)}</span>
            </div>
            <input
              id="cwv-wartosc"
              type="range"
              min={en ? 100 : 300}
              max={en ? 10000 : 25000}
              step={en ? 50 : 100}
              value={wartoscKlienta}
              onChange={(e) => {
                const v = Number(e.target.value);
                setWartoscKlienta(v);
                if (stan.status === 'done') zapiszParametry({ wartosc: v });
              }}
              className="narz-suwak"
            />
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_cwv_vs_start">
            {stan.status === 'loading'
              ? (en ? 'Running live CrUX & CMS X-Ray...' : 'Pobieram dane CrUX i prześwietlam CMS...')
              : (en ? 'Compare Core Web Vitals & Leak' : 'Porównaj Core Web Vitals i stratę')}
          </button>
          <span className="narz-mikro" style={{ margin: 0 }}>
            {en
              ? 'Reads real 28-day Chrome UX Report (CrUX) + PageSpeed data and inspects CMS script bloat.'
              : 'Pobiera 28-dniowe dane użytkowników Chrome (CrUX) + PageSpeed oraz prześwietla wtyczki i skrypty blokujące.'}
          </span>
        </div>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Querying Google Chrome UX Report (28-day mobile field metrics)',
                  'Inspecting HTML weight, CMS fingerprint, plugins and render-blocking scripts',
                  'Benchmarking against Next.js SSR architecture and calculating mobile conversion leak',
                ]
              : [
                  'Pobieramy 28-dniowe dane terenowe z Google Chrome UX Report (CrUX)',
                  'Prześwietlamy wagę HTML, wykryty CMS, wtyczki i skrypty blokujące renderowanie',
                  'Zestawiamy wynik z architekturą Next.js SSR i liczymy wyciek zapytań z telefonów',
                ]}
            co={1400}
          />
        )}

        {stan.status === 'error' && (
          <p id="cwv-blad" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(stronaA)}>
        {stronaA && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', flexWrap: 'wrap' }}>
              <div>
                <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.55rem' }}>
                  <h2 className="narz-h2" ref={wynikRef} tabIndex={-1} style={{ margin: 0 }}>
                    {en ? 'Core Web Vitals & CMS X-Ray Showdown' : 'Zestawienie Core Web Vitals i prześwietlenie CMS'}
                  </h2>
                  {d?.zCache === true && (
                    <span className="cwv-odznaka-cache">Cache 24h</span>
                  )}
                </div>
                <p className="narz-mikro">
                  {en
                    ? 'Thresholds at the 75th percentile on mobile: LCP <= 2.50 s, INP <= 200 ms, CLS <= 0.10, TTFB <= 800 ms.'
                    : 'Oficjalne progi Google na telefonie (75. percentyl): LCP <= 2,50 s, INP <= 200 ms, CLS <= 0,10, TTFB <= 800 ms.'}
                </p>
              </div>
              {!stronaB && (
                <button
                  type="button"
                  className="narz-link"
                  onClick={() => poleBRef.current?.focus()}
                >
                  {en ? '+ Add a competitor domain above' : '+ Dodaj wyżej domenę konkurenta'}
                </button>
              )}
            </div>

            {/* 3-kolumnowa tabela porownawcza */}
            <div className="narz-tabela-wrap">
              <table className="narz-tabela cwv-tabela">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'left', minWidth: '155px' }}>
                      {en ? 'Metric / Technical Layer' : 'Metryka / Warstwa techniczna'}
                    </th>
                    {kolumny.map((k) => (
                      <th key={k.klucz} scope="col" className={k.next ? 'cwv-kol-next' : undefined} style={{ minWidth: '185px' }}>
                        <span style={{ display: 'block', fontSize: '0.76rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: k.next ? 'var(--w-pomarancz)' : 'var(--w-tusz-2)' }}>
                          {k.naglowek}
                        </span>
                        <span style={{ display: 'block', fontSize: '0.96rem', fontWeight: 700, color: 'var(--w-tusz)', marginTop: '0.15rem' }}>
                          {k.dane.domena || k.dane.nazwa}
                        </span>
                        {k.dane.zrodlo && (
                          <span style={{ display: 'block', fontSize: '0.74rem', fontWeight: 400, color: 'var(--w-tusz-2)', marginTop: '0.1rem' }}>
                            {k.dane.zrodlo}
                          </span>
                        )}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">
                      {en ? 'Mobile Score (0-100)' : 'Wynik mobilny (0-100)'}
                      <span className="narz-mikro">{en ? 'Overall speed rating' : 'Ogólna ocena wydajności'}</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaWyniku(k.dane.metryki?.wynik)}`}>
                          {Number.isFinite(k.dane.metryki?.wynik) ? `${k.dane.metryki.wynik}/100` : '-'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      LCP (Largest Contentful Paint)
                      <span className="narz-mikro">{en ? 'Main content load (<= 2.50 s)' : 'Ładowanie głównej treści (<= 2,50 s)'}</span>
                    </th>
                    {kolumny.map((k) => {
                      const selLcp = k.dane.metryki?.selektorLcp || k.dane.selektorLcp;
                      const rozkladLcp = wyciagnijTrojkeCrux(k.dane, 'lcp');
                      return (
                        <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                          <span className={`cwv-metr cwv-metr--${klasaLcp(k.dane.metryki?.lcpMs)}`}>
                            {formatSekund(k.dane.metryki?.lcpMs)}
                          </span>
                          <PasekRozkladuCrux trojka={rozkladLcp} en={en} />
                          {selLcp && (
                            <code className="cwv-selektor" title={en ? 'Detected LCP DOM element' : 'Wykryty element DOM dla LCP'}>
                              {selLcp}
                            </code>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <th scope="row">
                      INP (Interaction to Next Paint)
                      <span className="narz-mikro">{en ? 'Tap responsiveness (<= 200 ms)' : 'Reakcja na dotyk (<= 200 ms)'}</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaInp(k.dane.metryki?.inpMs)}`}>
                          {Number.isFinite(k.dane.metryki?.inpMs) ? `${k.dane.metryki.inpMs.toLocaleString(jezyk)} ms` : (en ? 'no data' : 'brak')}
                        </span>
                        <PasekRozkladuCrux trojka={wyciagnijTrojkeCrux(k.dane, 'inp')} en={en} zwiezly />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      CLS (Cumulative Layout Shift)
                      <span className="narz-mikro">{en ? 'Visual stability (<= 0.10)' : 'Stabilność układu (<= 0,10)'}</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaCls(k.dane.metryki?.cls)}`}>
                          {formatCls(k.dane.metryki?.cls)}
                        </span>
                        <PasekRozkladuCrux trojka={wyciagnijTrojkeCrux(k.dane, 'cls')} en={en} zwiezly />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      TTFB (Time to First Byte)
                      <span className="narz-mikro">{en ? 'Server response (<= 800 ms)' : 'Czas odpowiedzi serwera (<= 800 ms)'}</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaTtfb(k.dane.metryki?.ttfbMs)}`}>
                          {Number.isFinite(k.dane.metryki?.ttfbMs) ? `${k.dane.metryki.ttfbMs.toLocaleString(jezyk)} ms` : (en ? 'no data' : 'brak')}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      {en ? 'Detected CMS & Plugins' : 'Wykryty CMS i wtyczki'}
                      <span className="narz-mikro">{en ? 'Architecture X-Ray' : 'Prześwietlenie architektury'}</span>
                    </th>
                    {kolumny.map((k) => {
                      const wtyczki = Array.isArray(k.dane.wtyczki) ? k.dane.wtyczki : [];
                      return (
                        <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                          <strong>{k.dane.cms || (en ? 'Custom / Unknown' : 'Własny / Nieznany')}</strong>
                          {k.next ? (
                            <span className="narz-mikro" style={{ display: 'block', margin: '0.2rem 0 0', color: '#047857', fontWeight: 600 }}>
                              {en ? '0 PHP plugins' : '0 wtyczek PHP'}
                            </span>
                          ) : wtyczki.length > 0 ? (
                            <div className="cwv-wtyczki">
                              {wtyczki.slice(0, 6).map((wt) => (
                                <span key={wt} className="cwv-wtyczka">{wt}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="narz-mikro" style={{ display: 'block', margin: '0.2rem 0 0' }}>
                              {en ? 'No public plugin signatures' : 'Brak widocznych sygnatur wtyczek'}
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <th scope="row">
                      {en ? 'Render-Blocking Scripts' : 'Skrypty blokujące renderowanie'}
                      <span className="narz-mikro">{en ? 'Delays first paint & INP' : 'Opóźniają pierwszy ekran i INP'}</span>
                    </th>
                    {kolumny.map((k) => {
                      const ile = Number(k.dane.skryptyBlokujace ?? 0);
                      return (
                        <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                          <strong style={{ color: ile === 0 ? '#047857' : ile > 5 ? '#b3261e' : '#b45309' }}>
                            {ile}
                          </strong>
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <th scope="row">
                      {en ? 'HTML Weight & Unsized Images' : 'Waga HTML i obrazy bez wymiarów'}
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined} style={{ fontSize: '0.88rem' }}>
                        {k.dane.wagaHtmlKb != null ? `${Number(k.dane.wagaHtmlKb).toLocaleString(jezyk)} KB HTML` : '-'}
                        {k.dane.obrazyBezWymiarow != null && (
                          <span className="narz-mikro" style={{ display: 'block', margin: '0.15rem 0 0' }}>
                            {en
                              ? `${k.dane.obrazyBezWymiarow} images missing width/height`
                              : `${k.dane.obrazyBezWymiarow} obrazów bez width/height`}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Kalkulator wycieku konwersji mobilnej na zywo */}
            <div className="cwv-wyciek-karta">
              <div>
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  {en
                    ? 'Estimated Mobile Conversion Leak (Live Calculation)'
                    : 'Szacowany wyciek konwersji mobilnej (wyliczenie na żywo)'}
                </h2>
                <p className="narz-mikro">
                  {en
                    ? 'Based on the Google & Deloitte study ("Milliseconds Make Millions"), where every 0.1 s of mobile speed improvement lifted conversions by 8.4% in retail and 10.1% in services. Move the sliders above to adjust to your business.'
                    : 'Model oparty na badaniu Google i Deloitte („Milliseconds Make Millions”), w którym przyspieszenie ładowania na telefonie o każde 0,1 s podnosiło konwersję o 8,4% w handlu i 10,1% w usługach. Przesuń suwaki wyżej, aby podstawić własne dane.'}
                </p>
              </div>

              {kalkulacja.brakPomiaru ? (
                <p className="narz-wynik-opis" style={{ margin: 0, color: 'var(--w-tusz-2)' }}>
                  {en
                    ? `Google CrUX and PageSpeed returned no LCP/INP timing for ${stronaA.domena}, so we do not estimate conversion loss.`
                    : `Google CrUX i PageSpeed nie zwróciły pomiaru LCP/INP dla ${stronaA.domena}, dlatego nie zgadujemy kwoty wycieku konwersji.`}
                </p>
              ) : kalkulacja.odsetekProc === 0 ? (
                <p className="narz-wynik-opis" style={{ margin: 0, color: '#047857', fontWeight: 600 }}>
                  {en
                    ? `Great news: ${stronaA.domena} already loads on par with our Next.js benchmark, so you are not losing mobile enquiries to LCP/INP lag.`
                    : `Świetny wynik: ${stronaA.domena} ładuje się równie szybko co nasz punkt odniesienia Next.js, więc nie tracisz zapytań mobilnych przez opóźnienia LCP/INP.`}
                </p>
              ) : (
                <div className="cwv-wyciek-siatka">
                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">
                      {kalkulacja.nadwyzkaSek === 0 && kalkulacja.inpNadwyzkaMs > 0
                        ? (en ? 'Mobile INP lag (> 200 ms)' : 'Opóźnienie INP powyżej 200 ms')
                        : (en ? 'Mobile LCP gap vs Next.js' : 'Opóźnienie LCP względem Next.js')}
                    </p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {kalkulacja.nadwyzkaSek === 0 && kalkulacja.inpNadwyzkaMs > 0
                        ? `+${Math.round(kalkulacja.inpNadwyzkaMs)} ms (${kalkulacja.odsetekProc}%)`
                        : `+${kalkulacja.nadwyzkaSek.toLocaleString(jezyk, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s (${kalkulacja.odsetekProc}%)`}
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">
                      {en ? 'Lost mobile enquiries / month' : 'Utracone zapytania z mobile / mies.'}
                    </p>
                    <p className="narz-rozbicie-kwota">
                      ~{kalkulacja.utraconeZapytaniaMies.toLocaleString(jezyk, { minimumFractionDigits: 1, maximumFractionDigits: 1 })} {en ? 'leads' : 'zapytań'}
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">
                      {en ? 'Monthly revenue leaking on mobile' : 'Miesięczny wyciek przychodu (mobile)'}
                    </p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {formatKwoty(kalkulacja.utraconyPrzychodMies)}
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">
                      {en ? '12-month cumulative leak' : 'Skumulowana strata w 12 miesięcy'}
                    </p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {formatKwoty(kalkulacja.utraconyPrzychodRok)}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Porownanie 24-miesiecznego TCO: WordPress vs Booster Pack */}
            <div>
              <h2 className="narz-h2" style={{ marginTop: 0, marginBottom: '0.75rem' }}>
                {en
                  ? '24-Month TCO: WordPress Maintenance + SEO vs Booster Pack (Next.js for €0 Upfront)'
                  : '24-miesięczny koszt całkowity (TCO): utrzymanie WordPress + SEO kontra Booster Pack'}
              </h2>
              <div className="cwv-tco-siatka">
                <div className="cwv-tco-kol">
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--w-tusz-2)' }}>
                    {en ? 'Traditional Agency Path' : 'Klasyczny model rynkowy'}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--w-tusz)' }}>
                    {en ? 'WordPress Rebuild + Hosting + SEO' : 'Nowa strona WordPress + opieka + SEO'}
                  </h3>
                  <ul className="cwv-tco-lista">
                    <li>
                      {en
                        ? `Upfront custom WordPress build: ~€${kalkulacja.tcoWordpress24.budowa.toLocaleString('en-US')}`
                        : `Jednorazowe wdrożenie strony WordPress: ok. ${kalkulacja.tcoWordpress24.budowa.toLocaleString('pl-PL')} zł netto`}
                    </li>
                    <li>
                      {en
                        ? `24 months of fast hosting, paid plugins & updates: ~€${kalkulacja.tcoWordpress24.utrzymanieIWtyczki.toLocaleString('en-US')}`
                        : `24 mies. hostingu, płatnych wtyczek i aktualizacji PHP: ok. ${kalkulacja.tcoWordpress24.utrzymanieIWtyczki.toLocaleString('pl-PL')} zł netto`}
                    </li>
                    <li>
                      {en
                        ? `24 months of SEO retainer: €${kalkulacja.tcoWordpress24.seo24.toLocaleString('en-US')} net`
                        : `24 mies. osobnego abonamentu SEO: ${kalkulacja.tcoWordpress24.seo24.toLocaleString('pl-PL')} zł netto`}
                    </li>
                    <li>
                      <strong>
                        {en
                          ? `24-month total: ~€${kalkulacja.tcoWordpress24.razem.toLocaleString('en-US')} net`
                          : `Łącznie przez 24 miesiące: ok. ${kalkulacja.tcoWordpress24.razem.toLocaleString('pl-PL')} zł netto`}
                      </strong>
                    </li>
                  </ul>
                </div>

                <div className="cwv-tco-kol cwv-tco-kol--booster">
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#ffd7c2' }}>
                    {en ? 'All-in-One Next.js + SEO + GEO' : 'Strona Next.js + SEO + GEO w jednym abonamencie'}
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>
                    {en
                      ? `Booster Pack: €${CENY.boosterPack.eur} net/mo (€0 upfront)`
                      : `Booster Pack: ${CENY.boosterPack.pln.toLocaleString('pl-PL')} zł netto/mies. (0 zł na start)`}
                  </h3>
                  <ul className="cwv-tco-lista">
                    <li>
                      {en
                        ? 'Custom-coded Next.js SSR website built for €0 upfront fee'
                        : 'Indywidualnie kodowana strona Next.js SSR za 0 zł opłaty startowej'}
                    </li>
                    <li>
                      {en
                        ? 'LCP ~1.15 s, INP ~48 ms, CLS 0.00, zero PHP plugins to hack'
                        : 'LCP ok. 1,15 s, INP ok. 48 ms, CLS 0,00 i zero wtyczek PHP podatnych na włamania'}
                    </li>
                    <li>
                      {en
                        ? `Includes full SEO & AI Visibility execution (${CENY.boosterPack.umowaMiesiecy}-month min. agreement, code stays yours)`
                        : `W cenie pełne pozycjonowanie Google + AI (umowa na min. ${CENY.boosterPack.umowaMiesiecy} mies.)`}
                    </li>
                    <li>
                      <strong style={{ color: '#ffffff' }}>
                        {en
                          ? `24-month total: €${kalkulacja.tcoBooster24.razem.toLocaleString('en-US')} net`
                          : `Łącznie przez 24 miesiące: ${kalkulacja.tcoBooster24.razem.toLocaleString('pl-PL')} zł netto`}
                      </strong>
                    </li>
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center', marginTop: '0.35rem' }}>
                    <a
                      href={kotwicaKontakt}
                      className="btn btn-primary"
                      onClick={wybierzBoosterKontakt}
                      data-cta="cwv_vs_bofu_booster"
                    >
                      {en ? 'Switch to Next.js for €0 Upfront' : 'Zamów migrację na Next.js (0 zł na start)'}
                    </a>
                    <Link
                      href="/porownania/nextjs-vs-wordpress-seo"
                      style={{ color: '#ffd7c2', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 600, fontSize: '0.9rem' }}
                    >
                      {en ? 'Next.js vs WordPress comparison' : 'Porównanie Next.js vs WordPress'}
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <LinkWyniku
              narzedzie="cwv_vs"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{
                a: stronaA.domena,
                b: stronaB?.domena || null,
                ruch: ruchMobilny,
                wartosc: wartoscKlienta,
                wynik: stan.id || null,
              }}
              podsumowanie={en
                ? `Core Web Vitals comparison for ${stronaA.domena}: LCP ${formatSekund(stronaA.metryki?.lcpMs)}, INP ${stronaA.metryki?.inpMs ?? '-'} ms`
                : `Porównanie Core Web Vitals dla ${stronaA.domena}: LCP ${formatSekund(stronaA.metryki?.lcpMs)}, INP ${stronaA.metryki?.inpMs ?? '-'} ms`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default PorownywarkaCwvClient;
