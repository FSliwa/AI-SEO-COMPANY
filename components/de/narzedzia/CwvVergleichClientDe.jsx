'use client';

// Deutscher Core-Web-Vitals-Vergleich & Conversion-Verlust-Rechner (/de/tools/core-web-vitals-vergleich).
// API: POST ${PANEL_API}/cwv-vs mit { urlA, urlB: urlB || undefined, lang: 'de' }.
// Unterstützt ?a=&b=&ruch=&wartosc= (sowie ?url=) und den DEMO-Modus.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba as fmtDe } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { LinkWyniku, PasekDemo, Postep } from './WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import st from '@/components/narzedzia/narzedzia.module.css';

const CSS_CWV_DE = `
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

const BENCHMARK_DOMYSLNY_DE = {
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

function PasekRozkladuCruxDe({ trojka, zwiezly = false }) {
  if (!trojka) return null;
  const [dobre, poprawa, wolne] = trojka;
  const tytul = `CrUX-Verteilung: ${dobre} % Gut / ${poprawa} % Optimierungsbedarf / ${wolne} % Langsam`;
  return (
    <div className="cwv-crux-wrap" title={tytul}>
      <div className="cwv-crux-pasek" role="img" aria-label={tytul}>
        {dobre > 0 && <span style={{ width: `${dobre}%`, background: '#047857' }} />}
        {poprawa > 0 && <span style={{ width: `${poprawa}%`, background: '#d97706' }} />}
        {wolne > 0 && <span style={{ width: `${wolne}%`, background: '#b3261e' }} />}
      </div>
      <span className="cwv-crux-opis">
        {zwiezly
          ? `${dobre} % / ${poprawa} % / ${wolne} %`
          : `${dobre} % Gut · ${poprawa} % Mittel · ${wolne} % Langsam`}
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

function demoStronaDe(surowyUrl, wariant) {
  const domena = wyczyscDomene(surowyUrl) || (wariant === 'A' ? 'ihre-firma.de' : 'wettbewerber.de');
  const jestSzybka = domena.includes('ai-seo-company') || domena.includes('vercel') || domena.includes('nextjs');
  if (jestSzybka) {
    return {
      url: `https://www.${domena}/`,
      domena,
      zrodlo: 'CrUX 28-Tage-Felddaten (Chrome)',
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
      zrodlo: 'CrUX 28-Tage-Felddaten (Chrome)',
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
    zrodlo: 'CrUX 28-Tage-Felddaten (Chrome)',
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

export function CwvVergleichClientDe() {
  const [urlA, setUrlA] = useState('');
  const [urlB, setUrlB] = useState('');
  const [ruchMobilny, setRuchMobilny] = useState(3000);
  const [wartoscKlienta, setWartoscKlienta] = useState(800);
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

  const formatSekund = (ms) => {
    if (!Number.isFinite(ms)) return 'keine Daten';
    return `${(ms / 1000).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s`;
  };

  const formatCls = (v) => {
    if (!Number.isFinite(v)) return 'keine Daten';
    return Number(v).toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    track('narzedzie_start', { narzedzie: 'cwv_vs', zKonkurentem: Boolean(czysteB), lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 950));
      const d = {
        ok: true,
        stronaA: demoStronaDe(czysteA, 'A'),
        stronaB: czysteB ? demoStronaDe(czysteB, 'B') : null,
        benchmarkNextjs: BENCHMARK_DOMYSLNY_DE,
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
          lang: 'de',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die Core Web Vitals für diese Adresse konnten nicht abgerufen werden. Bitte prüfen Sie die Domain und versuchen Sie es erneut.',
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
          ? 'Zeitüberschreitung nach 60 Sekunden. Google PageSpeed Insights ist derzeit stark ausgelastet - bitte gleich erneut starten.'
          : 'Keine Verbindung zum Messserver. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.',
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
    track('narzedzie_bofu_klik', { narzedzie: 'cwv_vs', plan: 'Booster Pack', lang: 'de' });
  }

  const d = stan.dane;
  const stronaA = d?.stronaA || null;
  const stronaB = d?.stronaB || null;
  const bench = {
    ...BENCHMARK_DOMYSLNY_DE,
    ...(d?.benchmarkNextjs || {}),
    metryki: { ...BENCHMARK_DOMYSLNY_DE.metryki, ...(d?.benchmarkNextjs?.metryki || {}) },
  };

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

    return {
      brakPomiaru,
      nadwyzkaSek: nadwyzkaMs / 1000,
      inpNadwyzkaMs,
      odsetekProc: Math.round(odsetekUtraty * 100),
      utraconeZapytaniaMies,
      utraconyPrzychodMies,
      utraconyPrzychodRok,
      wpBudowaEur: 4500,
      wpWartung24Eur: 2160,
    };
  }, [stronaA, bench.metryki.lcpMs, ruchMobilny, wartoscKlienta]);

  const maPorownanieNext = maWersjeDe('/porownania/nextjs-vs-wordpress-seo');
  const kolumny = stronaA ? [
    { klucz: 'a', naglowek: 'Ihre Website', dane: stronaA, next: false },
    ...(stronaB ? [{ klucz: 'b', naglowek: 'Konkurrent', dane: stronaB, next: false }] : []),
    { klucz: 'next', naglowek: 'Next.js-Architektur (Booster Pack)', dane: bench, next: true },
  ] : [];

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1040px' }}>
      <style>{CSS_CWV_DE}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomPorownanie}>
        <div className="cwv-pola-url">
          <div>
            <label htmlFor="cwv-url-a-de" className="narz-etykieta">
              Ihre Website (URL oder Domain)
            </label>
            <input
              ref={poleARef}
              id="cwv-url-a-de"
              name="a"
              required
              {...WALID_DE}
              maxLength={300}
              value={urlA}
              onChange={(e) => setUrlA(e.target.value)}
              placeholder="z. B. ihre-firma.de"
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'cwv-blad-de' : undefined}
            />
          </div>

          <div>
            <label htmlFor="cwv-url-b-de" className="narz-etykieta">
              Wettbewerber-URL (optional)
            </label>
            <input
              ref={poleBRef}
              id="cwv-url-b-de"
              name="b"
              maxLength={300}
              value={urlB}
              onChange={(e) => setUrlB(e.target.value)}
              placeholder="z. B. konkurrent.de"
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
            />
          </div>
        </div>

        <p className="narz-mikro" style={{ marginTop: '-0.25rem' }}>
          Schnellbeispiel:{' '}
          <button
            type="button"
            className={st.przyciskTekstowy}
            onClick={() => {
              setUrlA('staniax.pl');
              setUrlB('ai-seo-company.pl');
              poleARef.current?.focus();
            }}
          >
            staniax.pl vs. ai-seo-company.pl
          </button>
        </p>

        <div className="cwv-suwaki">
          <div>
            <div className="cwv-suwak-naglowek">
              <label htmlFor="cwv-ruch-de" className="narz-etykieta" style={{ margin: 0 }}>
                Monatlicher Mobile-Traffic
              </label>
              <span className="cwv-suwak-wartosc">
                {fmtDe(ruchMobilny, 'de')} Besuche/Mon.
              </span>
            </div>
            <input
              id="cwv-ruch-de"
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
              <label htmlFor="cwv-wartosc-de" className="narz-etykieta" style={{ margin: 0 }}>
                Durchschnittlicher Kundenwert
              </label>
              <span className="cwv-suwak-wartosc">{eur(wartoscKlienta, 'de')}</span>
            </div>
            <input
              id="cwv-wartosc-de"
              type="range"
              min={100}
              max={10000}
              step={50}
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
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_cwv_vs_de_start">
            {stan.status === 'loading' ? 'Lade CrUX-Daten & CMS-Röntgen...' : 'Core Web Vitals & Verlust vergleichen'}
          </button>
          <span className="narz-mikro" style={{ margin: 0 }}>
            Nutzt echte 28-Tage-Felddaten aus dem Chrome UX Report (CrUX) + PageSpeed sowie eine Live-Analyse der CMS-Skripte.
          </span>
        </div>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Abruf der 28-Tage-Felddaten aus dem Google Chrome UX Report (CrUX)',
              'Analyse von HTML-Gewicht, CMS-Signatur, Plugins und blockierenden Skripten',
              'Vergleich mit der Next.js-SSR-Referenz und Berechnung des mobilen Anfrageverlusts',
            ]}
            co={1400}
          />
        )}

        {stan.status === 'error' && (
          <p id="cwv-blad-de" role="alert" className="narz-blad">
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
                    Core Web Vitals &amp; CMS-Röntgen im Direktvergleich
                  </h2>
                  {d?.zCache === true && (
                    <span className="cwv-odznaka-cache">Cache 24h</span>
                  )}
                </div>
                <p className="narz-mikro">
                  Offizielle Google-Grenzwerte im 75. Perzentil (mobil): LCP &lt;= 2,50 s, INP &lt;= 200 ms, CLS &lt;= 0,10, TTFB &lt;= 800 ms.
                </p>
              </div>
              {!stronaB && (
                <button
                  type="button"
                  className="narz-link"
                  onClick={() => poleBRef.current?.focus()}
                >
                  + Oben Wettbewerber-Domain ergänzen
                </button>
              )}
            </div>

            <div className="narz-tabela-wrap">
              <table className="narz-tabela cwv-tabela">
                <thead>
                  <tr>
                    <th scope="col" style={{ textAlign: 'left', minWidth: '155px' }}>
                      Kennzahl / Technik-Ebene
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
                      Mobile-Wert (0-100)
                      <span className="narz-mikro">Gesamteinschätzung</span>
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
                      <span className="narz-mikro">Hauptinhalt geladen (&lt;= 2,50 s)</span>
                    </th>
                    {kolumny.map((k) => {
                      const selLcp = k.dane.metryki?.selektorLcp || k.dane.selektorLcp;
                      const rozkladLcp = wyciagnijTrojkeCrux(k.dane, 'lcp');
                      return (
                        <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                          <span className={`cwv-metr cwv-metr--${klasaLcp(k.dane.metryki?.lcpMs)}`}>
                            {formatSekund(k.dane.metryki?.lcpMs)}
                          </span>
                          <PasekRozkladuCruxDe trojka={rozkladLcp} />
                          {selLcp && (
                            <code className="cwv-selektor" title="Erkanntes LCP-DOM-Element">
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
                      <span className="narz-mikro">Reaktionszeit auf Tippen (&lt;= 200 ms)</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaInp(k.dane.metryki?.inpMs)}`}>
                          {Number.isFinite(k.dane.metryki?.inpMs) ? `${fmtDe(k.dane.metryki.inpMs, 'de')} ms` : 'keine Daten'}
                        </span>
                        <PasekRozkladuCruxDe trojka={wyciagnijTrojkeCrux(k.dane, 'inp')} zwiezly />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      CLS (Cumulative Layout Shift)
                      <span className="narz-mikro">Layout-Stabilität (&lt;= 0,10)</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaCls(k.dane.metryki?.cls)}`}>
                          {formatCls(k.dane.metryki?.cls)}
                        </span>
                        <PasekRozkladuCruxDe trojka={wyciagnijTrojkeCrux(k.dane, 'cls')} zwiezly />
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      TTFB (Time to First Byte)
                      <span className="narz-mikro">Server-Antwortzeit (&lt;= 800 ms)</span>
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                        <span className={`cwv-metr cwv-metr--${klasaTtfb(k.dane.metryki?.ttfbMs)}`}>
                          {Number.isFinite(k.dane.metryki?.ttfbMs) ? `${fmtDe(k.dane.metryki.ttfbMs, 'de')} ms` : 'keine Daten'}
                        </span>
                      </td>
                    ))}
                  </tr>

                  <tr>
                    <th scope="row">
                      Erkanntes CMS &amp; Plugins
                      <span className="narz-mikro">Architektur-Röntgen</span>
                    </th>
                    {kolumny.map((k) => {
                      const wtyczki = Array.isArray(k.dane.wtyczki) ? k.dane.wtyczki : [];
                      return (
                        <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined}>
                          <strong>{k.dane.cms || 'Individuell / Unbekannt'}</strong>
                          {k.next ? (
                            <span className="narz-mikro" style={{ display: 'block', margin: '0.2rem 0 0', color: '#047857', fontWeight: 600 }}>
                              0 PHP-Plugins
                            </span>
                          ) : wtyczki.length > 0 ? (
                            <div className="cwv-wtyczki">
                              {wtyczki.slice(0, 6).map((wt) => (
                                <span key={wt} className="cwv-wtyczka">{wt}</span>
                              ))}
                            </div>
                          ) : (
                            <span className="narz-mikro" style={{ display: 'block', margin: '0.2rem 0 0' }}>
                              Keine öffentlichen Plugin-Spuren
                            </span>
                          )}
                        </td>
                      );
                    })}
                  </tr>

                  <tr>
                    <th scope="row">
                      Render-blockierende Skripte
                      <span className="narz-mikro">Verzögern First Paint &amp; INP</span>
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
                      HTML-Gewicht &amp; Bilder ohne Maße
                    </th>
                    {kolumny.map((k) => (
                      <td key={k.klucz} className={k.next ? 'cwv-kol-next' : undefined} style={{ fontSize: '0.88rem' }}>
                        {k.dane.wagaHtmlKb != null ? `${fmtDe(k.dane.wagaHtmlKb, 'de')} KB HTML` : '-'}
                        {k.dane.obrazyBezWymiarow != null && (
                          <span className="narz-mikro" style={{ display: 'block', margin: '0.15rem 0 0' }}>
                            {`${k.dane.obrazyBezWymiarow} Bilder ohne width/height`}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="cwv-wyciek-karta">
              <div>
                <h2 className="narz-h2" style={{ margin: 0 }}>
                  Geschätzter mobiler Conversion-Verlust in Euro (Live-Berechnung)
                </h2>
                <p className="narz-mikro">
                  Auf Basis der Studie von Google &amp; Deloitte („Milliseconds Make Millions“), in der jede 0,1 s schnellere mobile Ladezeit die Conversion-Rate um 8,4 % im Handel und 10,1 % bei Dienstleistungen steigerte. Passen Sie die Schieberegler oben jederzeit an.
                </p>
              </div>

              {kalkulacja.brakPomiaru ? (
                <p className="narz-wynik-opis" style={{ margin: 0, color: 'var(--w-tusz-2)' }}>
                  Für {stronaA.domena} liegen aktuell keine LCP-/INP-Messwerte aus CrUX oder PageSpeed vor, daher schätzen wir keinen fiktiven Umsatzverlust.
                </p>
              ) : kalkulacja.odsetekProc === 0 ? (
                <p className="narz-wynik-opis" style={{ margin: 0, color: '#047857', fontWeight: 600 }}>
                  Starkes Ergebnis: {stronaA.domena} lädt bereits auf dem Niveau unserer Next.js-Referenz - Sie verlieren keine mobilen Anfragen durch LCP/INP-Verzögerung.
                </p>
              ) : (
                <div className="cwv-wyciek-siatka">
                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">
                      {kalkulacja.nadwyzkaSek === 0 && kalkulacja.inpNadwyzkaMs > 0
                        ? 'Mobile INP-Verzögerung (> 200 ms)'
                        : 'Mobiler LCP-Rückstand ggü. Next.js'}
                    </p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {kalkulacja.nadwyzkaSek === 0 && kalkulacja.inpNadwyzkaMs > 0
                        ? `+${Math.round(kalkulacja.inpNadwyzkaMs)} ms (${kalkulacja.odsetekProc} %)`
                        : `+${kalkulacja.nadwyzkaSek.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s (${kalkulacja.odsetekProc} %)`}
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">Entgangene mobile Anfragen / Mon.</p>
                    <p className="narz-rozbicie-kwota">
                      ~{kalkulacja.utraconeZapytaniaMies.toLocaleString('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 })} Leads
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">Monatlicher Umsatzverlust (mobil)</p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {eur(Math.round(kalkulacja.utraconyPrzychodMies), 'de')}
                    </p>
                  </div>

                  <div className="cwv-wyciek-boks">
                    <p className="narz-rozbicie-etykieta">Hochgerechnet auf 12 Monate</p>
                    <p className="narz-rozbicie-kwota" style={{ color: '#b3261e' }}>
                      {eur(Math.round(kalkulacja.utraconyPrzychodRok), 'de')}
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div>
              <h2 className="narz-h2" style={{ marginTop: 0, marginBottom: '0.75rem' }}>
                24-Monats-TCO: WordPress-Wartung + SEO vs. Booster Pack (Next.js für 0 € Setup)
              </h2>
              <div className="cwv-tco-siatka">
                <div className="cwv-tco-kol">
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--w-tusz-2)' }}>
                    Klassischer Agenturweg
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.15rem', color: 'var(--w-tusz)' }}>
                    WordPress-Relaunch + Wartung + SEO
                  </h3>
                  <ul className="cwv-tco-lista">
                    <li>Einmaliger WordPress-Relaunch: ca. {eur(kalkulacja.wpBudowaEur, 'de')} netto</li>
                    <li>24 Monate Managed Hosting, Premium-Plugins &amp; Updates: ca. {eur(kalkulacja.wpWartung24Eur, 'de')} netto</li>
                    <li>24 Monate separates SEO-Retainer: {eur(24 * CENY.seoStandard.eur, 'de')} netto</li>
                    <li><strong>Gesamtkosten über 24 Monate: ca. {eur(kalkulacja.wpBudowaEur + kalkulacja.wpWartung24Eur + 24 * CENY.seoStandard.eur, 'de')} netto</strong></li>
                  </ul>
                </div>

                <div className="cwv-tco-kol cwv-tco-kol--booster">
                  <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: '#ffd7c2' }}>
                    Next.js-Website + SEO + GEO in einem Paket
                  </p>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#ffffff' }}>
                    {`Booster Pack: ${eur(CENY.boosterPack.eur, 'de')} netto/Mon. (0 € Setup)`}
                  </h3>
                  <ul className="cwv-tco-lista">
                    <li>Individuell programmierte Next.js-SSR-Website für 0 € Einmalkosten</li>
                    <li>LCP ca. 1,15 s, INP ca. 48 ms, CLS 0,00 und null angreifbare PHP-Plugins</li>
                    <li>{`Inklusive laufendem SEO & KI-Sichtbarkeit (Mindestlaufzeit ${CENY.boosterPack.umowaMiesiecy} Monate)`}</li>
                    <li><strong style={{ color: '#ffffff' }}>Gesamtkosten über 24 Monate: {eur(24 * CENY.boosterPack.eur, 'de')} netto</strong></li>
                  </ul>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center', marginTop: '0.35rem' }}>
                    <a
                      href="#kontakt"
                      className="btn btn-primary"
                      onClick={wybierzBoosterKontakt}
                      data-cta="cwv_vs_de_bofu_booster"
                    >
                      Next.js-Wechsel für 0 € Setup anfragen
                    </a>
                    {maPorownanieNext && (
                      <Link
                        href="/porownania/nextjs-vs-wordpress-seo"
                        style={{ color: '#ffd7c2', textDecoration: 'underline', textUnderlineOffset: '3px', fontWeight: 600, fontSize: '0.9rem' }}
                      >
                        Next.js vs. WordPress Vergleich
                      </Link>
                    )}
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
              podsumowanie={`Core Web Vitals Vergleich für ${stronaA.domena}: LCP ${formatSekund(stronaA.metryki?.lcpMs)}, INP ${stronaA.metryki?.inpMs ?? '-'} ms`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default CwvVergleichClientDe;
