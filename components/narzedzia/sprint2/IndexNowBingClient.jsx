'use client';

// Tester Bing / ChatGPT Search, Audytor Entropii lastmod i Generator IndexNow (PL + EN).
// Endpoint: POST ${PANEL_API}/indexnow-bing z { url, lang: 'pl' | 'en' }.
// Obsluguje ?url= oraz ?wynik=<uuid> (GET ${PANEL_API}/wynik/<id>) i przycisk 1-klik DEMO.

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from '@/components/narzedzia/LinkWyniku';
import { Ocena, PasekDemo, Postep } from '@/components/narzedzia/Wspolne';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, odmianaPl, pobierzPlikTekstowy, skopiujTekst, wyczyscDomene } from './wspolneSprint2';

function wygenerujKluczHex() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return 'a7f3e9c14b82d0659e1234ab89cd01ef';
}

function kanonicznyHostIndexNow(wejscie, domyslna = 'twojafirma.pl') {
  const tekst = String(wejscie || '').trim();
  const m = /^https?:\/\/([^/?#]+)/i.exec(tekst);
  if (m && m[1]) return m[1].toLowerCase();
  const bezSciezki = tekst.replace(/^\/+/, '').split(/[/?#]/)[0].toLowerCase();
  if (bezSciezki === 'ai-seo-company.pl') return 'www.ai-seo-company.pl';
  if (bezSciezki && bezSciezki.includes('.')) return bezSciezki;
  return wyczyscDomene(tekst, domyslna);
}

function zbudujArtefaktyIndexNow(domenaLubUrl, klucz, przyklady = []) {
  const zrodloPierwszego = przyklady.length
    ? (typeof przyklady[0] === 'string' ? przyklady[0] : przyklady[0]?.url)
    : '';
  const nazwaHosta = kanonicznyHostIndexNow(zrodloPierwszego || domenaLubUrl, 'twojafirma.pl');
  const host = `https://${nazwaHosta}`;
  const nazwaPliku = `${klucz}.txt`;
  const listaUrl = przyklady.length
    ? przyklady.slice(0, 3).map((p) => (typeof p === 'string' ? p : p.url)).filter(Boolean)
    : [`${host}/`, `${host}/oferta`, `${host}/kontakt`];

  const curlKomenda = `curl -i -X POST "https://api.indexnow.org/indexnow" \\
  -H "Content-Type: application/json; charset=utf-8" \\
  -d '${JSON.stringify(
    {
      host: nazwaHosta,
      key: klucz,
      keyLocation: `${host}/${nazwaPliku}`,
      urlList: listaUrl,
    },
    null,
    2
  )}'`;

  const githubActionYaml = `name: IndexNow Instant Ping (Bing & ChatGPT Search)
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  indexnow:
    runs-on: ubuntu-latest
    steps:
      - name: Notify IndexNow API after production deploy
        run: |
          curl -sS -X POST "https://api.indexnow.org/indexnow" \\
            -H "Content-Type: application/json; charset=utf-8" \\
            -d '{
              "host": "${nazwaHosta}",
              "key": "${klucz}",
              "keyLocation": "${host}/${nazwaPliku}",
              "urlList": ["${host}/"]
            }'`;

  return { wygenerowanyKlucz: klucz, nazwaPliku, zawartoscPliku: klucz, curlKomenda, githubActionYaml, nazwaHosta };
}

function normalizujBota(b) {
  if (!b) return { ok: false, robots: 'unknown', httpKod: null, ttfbMs: null, cfIp: false };
  if (typeof b === 'boolean') return { ok: b, robots: b ? 'allow' : 'disallow', httpKod: b ? 200 : 403, ttfbMs: null, cfIp: false };
  if (typeof b === 'string') {
    const ok = /ok|allow|dozwol|200/i.test(b) && !/block|zablok|disallow|403/i.test(b);
    return { ok, robots: ok ? 'allow' : 'disallow', httpKod: ok ? 200 : 403, ttfbMs: null, cfIp: /ip|cf|cloudflare/i.test(b) };
  }
  const cfIp = Boolean(b.cloudflareIpCheck || b.cloudflareWaf || /weryfikacja_ip|ip_check/i.test(String(b.status || '')));
  const dozwolonyRobots = b.dozwolony !== undefined
    ? Boolean(b.dozwolony)
    : b.robotsDozwolony !== undefined
    ? Boolean(b.robotsDozwolony)
    : !/zablok|block|disallow|sperr/i.test(String(b.robots ?? 'allow'));
  const kod = Number(b.httpKod ?? b.statusHttp ?? (dozwolonyRobots ? 200 : 403));
  const ok = b.ok !== undefined ? Boolean(b.ok) : (dozwolonyRobots && (kod >= 200 && kod < 400 || cfIp));
  return {
    ok,
    robots: dozwolonyRobots ? 'allow' : 'disallow',
    httpKod: Number.isFinite(kod) ? kod : null,
    ttfbMs: Number.isFinite(b.ttfbMs) ? b.ttfbMs : null,
    cfIp,
  };
}

function demoIndexNow(surowyUrl, en) {
  const domena = wyczyscDomene(surowyUrl || 'twojafirma.pl', en ? 'yourcompany.com' : 'twojafirma.pl');
  const wzorcowa = domena.includes('ai-seo-company');
  const klucz = '8f4c2e91b7a34d60c5129e80f3a17b4d';
  const przykladyWzorcowe = [
    { url: `https://www.${domena}/`, lastmod: '2026-11-22' },
    { url: `https://www.${domena}/cennik-pozycjonowania`, lastmod: '2026-11-21' },
    { url: `https://www.${domena}/pozycjonowanie-w-ai`, lastmod: '2026-11-18' },
  ];
  const przykladySztuczne = [
    { url: `https://www.${domena}/`, lastmod: '2026-11-22T04:00:01Z' },
    { url: `https://www.${domena}/o-nas`, lastmod: '2026-11-22T04:00:01Z' },
    { url: `https://www.${domena}/polityka-prywatnosci`, lastmod: '2026-11-22T04:00:01Z' },
  ];
  const artefakty = zbudujArtefaktyIndexNow(domena, klucz, wzorcowa ? przykladyWzorcowe : przykladySztuczne);

  if (wzorcowa) {
    return {
      ok: true,
      id: null,
      domena,
      ocena: 95,
      dostepBotow: {
        bingbot: { robots: 'dozwolony', httpKod: 200, ttfbMs: 128, status: 'ok' },
        oaiSearchBot: { robots: 'dozwolony', httpKod: 200, ttfbMs: 141, status: 'ok' },
      },
      sitemapa: {
        znaleziono: true,
        url: `https://www.${domena}/sitemap.xml`,
        liczbaUrl: 173,
        liczbaZLastmod: 173,
        unikalnychDat: 19,
        entropia: 'wysoka',
        przykladyUrl: przykladyWzorcowe,
      },
      indexNow: {
        wykrytyKlucz: klucz,
        ...artefakty,
      },
      rekomendacje: [
        en
          ? 'Bingbot and OAI-SearchBot both receive HTTP 200 with authentic content-hash lastmod dates.'
          : 'Bingbot oraz OAI-SearchBot otrzymują kod HTTP 200, a daty lastmod odzwierciedlają realne zmiany treści.',
      ],
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 54,
    dostepBotow: {
      bingbot: { robots: 'dozwolony', httpKod: 200, ttfbMs: 520, status: 'ok' },
      oaiSearchBot: { robots: 'dozwolony', httpKod: 403, ttfbMs: 94, status: 'konflikt_waf' },
    },
    sitemapa: {
      znaleziono: true,
      url: `https://www.${domena}/sitemap.xml`,
      liczbaUrl: 84,
      liczbaZLastmod: 84,
      unikalnychDat: 1,
      entropia: 'sztuczna',
      przykladyUrl: przykladySztuczne,
    },
    indexNow: {
      wykrytyKlucz: null,
      ...artefakty,
    },
    rekomendacje: [
      en
        ? 'Unblock OAI-SearchBot on your WAF/CDN (currently returning HTTP 403 despite robots.txt Allow) so ChatGPT Search can fetch live pages.'
        : 'Odblokuj OAI-SearchBot na zaporze WAF/CDN (obecnie zwraca kod HTTP 403 mimo Allow w robots.txt), aby ChatGPT Search mógł pobierać podstrony.',
      en
        ? 'Stop stamping all 84 sitemap URLs with the exact same build timestamp (1 unique date). Bing and Google ignore <lastmod> when every URL changes simultaneously.'
        : 'Przestań nadpisywać wszystkie 84 adresy w sitemap.xml tą samą godziną buildu (1 unikalna data). Bing i Google ignorują <lastmod>, gdy każda strona ma identyczny znacznik czasu.',
      en
        ? `Upload ${artefakty.nazwaPliku} to your public root folder and trigger the IndexNow curl or GitHub Action after deployments.`
        : `Wgraj plik klucza ${artefakty.nazwaPliku} do głównego katalogu public/ i wysyłaj ping IndexNow po każdej publikacji zmian.`,
    ],
  };
}

export function IndexNowBingClient() {
  const en = useLocale() === 'en';
  const jezyk = en ? 'en-US' : 'pl-PL';
  const [adres, setAdres] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
  const [wlasnyKlucz, setWlasnyKlucz] = useState('');
  const [aktywnaZakladka, setAktywnaZakladka] = useState('curl');
  const [skopiowano, setSkopiowano] = useState('');
  const poleRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['url', 'wynik'], ({ url, wynik }) => {
    if (url) setAdres(url);
    if (wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(wynik)) {
      setStan({ status: 'loading', blad: null, wynik: null, id: wynik, trybDemo: false });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            const p = data.podglad;
            if (!url && (p.url || p.domena)) setAdres(p.url || p.domena);
            setWlasnyKlucz('');
            setStan({ status: 'done', blad: null, wynik: p, id: wynik, trybDemo: false });
          } else {
            setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false }));
    }
  });

  useEffect(() => {
    if (stan.status === 'done') wynikRef.current?.focus({ preventScroll: true });
  }, [stan.status]);

  useEffect(() => {
    if (!skopiowano) return undefined;
    const t = setTimeout(() => setSkopiowano(''), 2800);
    return () => clearTimeout(t);
  }, [skopiowano]);

  function zaladujDemo() {
    const u = adres.trim() || (en ? 'yourcompany.com' : 'twojafirma.pl');
    if (!adres.trim()) setAdres(u);
    setWlasnyKlucz('');
    const d = demoIndexNow(u, en);
    track('narzedzie_demo', { narzedzie: 'indexnow_bing' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomTest(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setWlasnyKlucz('');
    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, wynik: null });
    track('narzedzie_start', { narzedzie: 'indexnow_bing' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoIndexNow(wejscie, en);
      track('narzedzie_wynik', { narzedzie: 'indexnow_bing', wynik: d.ocena });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/indexnow-bing`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: en ? 'en' : 'pl' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not audit Bing/IndexNow readiness for this domain. Try again shortly.' : 'Nie udało się sprawdzić gotowości Bing i IndexNow dla tej domeny. Spróbuj ponownie.'),
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'indexnow_bing', wynik: w.ocena ?? w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'Server timed out after 45 s while fetching sitemap.xml.' : 'Przekroczono limit 45 s podczas pobierania mapy witryny.')
          : (en ? 'Connection to diagnostic server failed. Check your network and try again.' : 'Brak połączenia z serwerem diagnostycznym. Sprawdź połączenie i spróbuj ponownie.'),
        wynik: null,
        id: null,
        trybDemo: false,
      });
    } finally {
      clearTimeout(zegar);
    }
  }

  function wybierzPakietKontakt(plan) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
    }
    track('narzedzie_bofu_klik', { narzedzie: 'indexnow_bing', plan });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const bing = normalizujBota(w?.dostepBotow?.bingbot);
  const oai = normalizujBota(w?.dostepBotow?.oaiSearchBot);
  const sm = w?.sitemapa || {};
  const smZnaleziono = Boolean(sm.znaleziono ?? sm.znaleziona);
  const liczbaUrl = Number(sm.liczbaUrl ?? 0);
  const zLastmod = Number(sm.liczbaZLastmod ?? sm.liczbaLastmod ?? 0);
  const unikalnychDat = Number(sm.unikalnychDat ?? sm.unikalneLastmod ?? 0);
  const entropiaWartosc = sm.entropia ?? sm.entropiaLastmod;
  const przykladyLista = Array.isArray(sm.przykladyUrl) && sm.przykladyUrl.length
    ? sm.przykladyUrl
    : (Array.isArray(sm.przykladoweUrl) ? sm.przykladoweUrl : []);
  const sztuczneLastmod = Boolean(
    zLastmod >= 5 && unikalnychDat <= 1 ||
    /sztucz|fake|niska|low|ident/i.test(String(entropiaWartosc ?? '')) ||
    (typeof entropiaWartosc === 'number' && entropiaWartosc < 0.15 && zLastmod >= 5)
  );

  const kluczBazowy = wlasnyKlucz || w?.indexNow?.wygenerowanyKlucz || w?.indexNow?.wykrytyKlucz || w?.indexNow?.klucz || '8f4c2e91b7a34d60c5129e80f3a17b4d';
  const zrodloHosta = sm.url || (przykladyLista.length ? (typeof przykladyLista[0] === 'string' ? przykladyLista[0] : przykladyLista[0]?.url) : '') || w?.url || adres || domena;
  const hostKanoniczny = domena ? kanonicznyHostIndexNow(zrodloHosta, en ? 'yourcompany.com' : 'twojafirma.pl') : '';
  const wygenerowaneLokalnie = domena
    ? zbudujArtefaktyIndexNow(zrodloHosta || domena, kluczBazowy, przykladyLista)
    : { nazwaPliku: `${kluczBazowy}.txt`, zawartoscPliku: kluczBazowy, curlKomenda: '', githubActionYaml: '', nazwaHosta: '' };

  const nazwaPlikuKlucza = wlasnyKlucz
    ? wygenerowaneLokalnie.nazwaPliku
    : (w?.indexNow?.nazwaPliku || wygenerowaneLokalnie.nazwaPliku);
  const zawartoscPlikuKlucza = wlasnyKlucz
    ? wygenerowaneLokalnie.zawartoscPliku
    : (w?.indexNow?.zawartoscPliku || wygenerowaneLokalnie.zawartoscPliku);
  const curlKod = wlasnyKlucz
    ? wygenerowaneLokalnie.curlKomenda
    : (w?.indexNow?.curlKomenda || wygenerowaneLokalnie.curlKomenda);
  const yamlKod = wlasnyKlucz
    ? wygenerowaneLokalnie.githubActionYaml
    : (w?.indexNow?.githubActionYaml || w?.indexNow?.githubWorkflowYml || wygenerowaneLokalnie.githubActionYaml);

  const rekomendacje = Array.isArray(w?.rekomendacje) ? w.rekomendacje : [];
  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  function renderujKarteBota(nazwa, rola, daneBota) {
    return (
      <div className="sp2-kafel" style={{ display: 'grid', gap: '0.45rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h3 className="sp2-h3" style={{ margin: 0, fontFamily: 'var(--w-mono, monospace)' }}>{nazwa}</h3>
          <span className={`sp2-pigulka ${daneBota.cfIp ? 'sp2-pigulka--info' : daneBota.ok ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
            {daneBota.cfIp
              ? (en ? 'Cloudflare IP Check' : 'Weryfikacja IP (CF)')
              : daneBota.ok
              ? (en ? 'Allowed (HTTP 200)' : 'Pełny dostęp (200)')
              : (en ? 'Blocked!' : 'Zablokowany!')}
          </span>
        </div>
        <p className="narz-mikro" style={{ margin: 0 }}>{rola}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.2rem' }}>
          <span className="sp2-pigulka sp2-pigulka--neutral">
            robots.txt: {daneBota.robots === 'allow' ? 'Allow' : 'Disallow'}
          </span>
          {daneBota.httpKod && (
            <span className="sp2-pigulka sp2-pigulka--neutral">
              HTTP {daneBota.httpKod}{daneBota.ttfbMs ? ` · ${daneBota.ttfbMs} ms` : ''}
            </span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomTest}>
        <div>
          <label htmlFor="inow-url" className="narz-etykieta">
            {en ? 'Domain or website URL to test' : 'Domena lub adres strony do sprawdzenia'}
          </label>
          <input
            ref={poleRef}
            id="inow-url"
            name="url"
            required
            maxLength={300}
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
            placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'}
            className="narz-pole"
            inputMode="url"
            autoComplete="url"
            aria-invalid={stan.status === 'error' ? 'true' : undefined}
            aria-describedby={stan.status === 'error' ? 'inow-blad' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_indexnow_start">
            {stan.status === 'loading'
              ? (en ? 'Checking Bing, sitemap & IndexNow...' : 'Sprawdzam Bing, sitemapę i IndexNow...')
              : (en ? 'Test Bing, lastmod & IndexNow' : 'Sprawdź Bing, lastmod i wygeneruj IndexNow')}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            {en ? 'See instant DEMO' : 'Zobacz wynik DEMO'}
          </button>
        </div>

        <PrzykladAdresu
          adresy={['ai-seo-company.pl', 'staniax.pl']}
          onWybierz={(a) => {
            setAdres(a);
            poleRef.current?.focus();
          }}
        />

        <p className="narz-mikro" style={{ margin: 0 }}>
          {en
            ? 'Free & instant: verifies Bingbot + OAI-SearchBot access for ChatGPT Search & Copilot, audits <lastmod> date entropy in sitemap.xml, and generates a downloadable IndexNow key file + curl & GitHub Actions workflow.'
            : 'Za darmo i od ręki: weryfikuje dostęp Bingbot oraz OAI-SearchBot (zaplecze ChatGPT Search i Microsoft Copilot), bada entropię dat <lastmod> w sitemap.xml oraz generuje klucz IndexNow do pobrania razem z komendą curl i GitHub Actions.'}
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Testing robots.txt and live HTTP access for Bingbot and OAI-SearchBot',
                  'Parsing sitemap.xml and calculating <lastmod> timestamp entropy',
                  'Checking existing IndexNow keys and building curl + GitHub Actions configs',
                ]
              : [
                  'Sprawdzamy dostęp Bingbot i OAI-SearchBot w robots.txt oraz na żywo po HTTP',
                  'Pobieramy sitemap.xml i liczymy entropię znaczników czasu <lastmod>',
                  'Weryfikujemy klucz IndexNow i generujemy plik .txt, komendę curl oraz workflow GitHub',
                ]}
            co={1150}
          />
        )}

        {stan.status === 'error' && (
          <p id="inow-blad" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                {en
                  ? 'Sample DEMO preview loaded. Enter your domain above and click "Test Bing, lastmod & IndexNow" to scan your live sitemap.'
                  : 'Wyświetlasz przykładowy wynik DEMO. Wpisz wyżej swoją domenę i kliknij główny przycisk, aby przeskanować własną mapę witryny na żywo.'}
              </p>
            )}

            {/* 1. Naglowek z ocena */}
            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Bing + AI" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? (en
                      ? 'Strong Bing, Copilot & ChatGPT Search readiness: crawlers have clean HTTP 200 access and your sitemap timestamps carry genuine freshness signals.'
                      : 'Wysoka gotowość pod Bing, Copilot i ChatGPT Search: boty mają czysty dostęp HTTP 200, a daty w mapie strony niosą wiarygodny sygnał świeżości.')
                    : ocena >= 50
                    ? (en
                      ? 'Partial readiness: either OAI-SearchBot/Bingbot encounters firewall friction, <lastmod> dates look artificially uniform, or IndexNow is not active yet.'
                      : 'Częściowa gotowość: jeden z botów napotyka blokadę, daty <lastmod> są sztucznie ujednolicone przy buildzie albo brakuje wdrożenia IndexNow.')
                    : (en
                      ? 'Critical indexing gap for ChatGPT & Bing: search crawlers are blocked or sitemap.xml is missing.'
                      : 'Krytyczna luka indeksacji w Bing i ChatGPT: roboty wyszukiwania są zablokowane lub brakuje poprawnego pliku sitemap.xml.')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className={`sp2-pigulka ${smZnaleziono ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                    sitemap.xml: {smZnaleziono ? (en ? 'Found' : 'Wykryta') : (en ? 'Missing' : 'Brak')}
                  </span>
                  <span className={`sp2-pigulka ${w?.indexNow?.wykrytyKlucz ? 'sp2-pigulka--ok' : 'sp2-pigulka--info'}`}>
                    IndexNow: {w?.indexNow?.wykrytyKlucz
                      ? (en ? 'Active key detected' : 'Wykryto aktywny klucz')
                      : (en ? 'Key generated below' : 'Klucz wygenerowany niżej')}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Karty dostepu Bingbot + OAI-SearchBot */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Bingbot & OAI-SearchBot Live Access' : 'Karty dostępu Bingbot oraz OAI-SearchBot'}
              </h2>
              <p className="narz-mikro">
                {en
                  ? 'ChatGPT Search combines OpenAI’s own OAI-SearchBot index with Microsoft Bing search infrastructure.'
                  : 'Wyszukiwarka ChatGPT łączy własny indeks OAI-SearchBot z infrastrukturą wyszukiwania Microsoft Bing.'}
              </p>
              <div className="sp2-kryteria-siatka">
                {renderujKarteBota(
                  'Bingbot',
                  en ? 'Powers Bing Search, Microsoft Copilot & partner search syndication' : 'Buduje indeks Bing, Microsoft Copilot oraz wyniki partnerskie w AI',
                  bing
                )}
                {renderujKarteBota(
                  'OAI-SearchBot',
                  en ? 'Indexes pages for clickable source links inside ChatGPT Search' : 'Indeksuje podstrony do klikalnych przypisów i źródeł w ChatGPT Search',
                  oai
                )}
              </div>
            </div>

            {/* 3. Diagnostyka entropii <lastmod> w sitemap.xml */}
            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">
                  {en ? 'Sitemap <lastmod> Entropy Audit' : 'Audyt entropii dat <lastmod> w pliku sitemap.xml'}
                </h2>
                {smZnaleziono && (
                  <span className={`sp2-pigulka ${sztuczneLastmod ? 'sp2-pigulka--blad' : zLastmod === 0 ? 'sp2-pigulka--uwaga' : 'sp2-pigulka--ok'}`}>
                    {sztuczneLastmod
                      ? (en ? 'Artificial uniform dates!' : 'Sztuczne identyczne daty!')
                      : zLastmod === 0
                      ? (en ? 'No <lastmod> tags' : 'Brak tagów <lastmod>')
                      : (en ? 'Healthy date diversity' : 'Wiarygodny rozkład dat')}
                  </span>
                )}
              </div>

              <p className="narz-mikro">
                {en
                  ? 'Both Google and Bing explicitly warn that stamping every URL with "new Date()" on each deploy destroys <lastmod> trust, causing crawlers to ignore your freshness signals.'
                  : 'Zarówno Google, jak i Microsoft Bing oficjalnie ostrzegają: nadawanie wszystkim podstronom bieżącej daty wdrożenia („new Date()”) zeruje zaufanie do <lastmod>, przez co boty przestają mu wierzyć.'}
              </p>

              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'URLs in Sitemap' : 'Adresy URL w sitemapie'}</p>
                  <p className="sp2-kafel-wartosc">{liczbaUrl.toLocaleString(jezyk)}</p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'URLs With <lastmod>' : 'Adresy z tagiem <lastmod>'}</p>
                  <p className="sp2-kafel-wartosc">{zLastmod.toLocaleString(jezyk)}</p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'Unique Dates Found' : 'Unikalne daty modyfikacji'}</p>
                  <p className="sp2-kafel-wartosc" style={{ color: sztuczneLastmod ? '#b3261e' : '#047857' }}>
                    {en
                      ? `${unikalnychDat} ${unikalnychDat === 1 ? 'date' : 'dates'}`
                      : `${unikalnychDat} ${odmianaPl(unikalnychDat, 'data', 'daty', 'dat')}`}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'Entropy Verdict' : 'Ocena entropii'}</p>
                  <p className="sp2-kafel-wartosc">
                    {typeof entropiaWartosc === 'number'
                      ? entropiaWartosc.toLocaleString(jezyk, { maximumFractionDigits: 2 })
                      : (({
                        wysoka: en ? 'High (Credible)' : 'Wysoka (wiarygodna)',
                        srednia: en ? 'Moderate' : 'Umiarkowana',
                        falszywa_identyczna: en ? 'Low (Uniform / Fake)' : 'Sztuczna (jednakowa)',
                        niska: en ? 'Low (Uniform)' : 'Niska (jednakowa)',
                        brak: en ? 'No <lastmod>' : 'Brak <lastmod>',
                      })[entropiaWartosc] || entropiaWartosc || (sztuczneLastmod ? (en ? 'Low (Fake)' : 'Sztuczna') : 'OK'))}
                  </p>
                </div>
              </div>

              {przykladyLista.length > 0 && (
                <div className="narz-tabela-wrap sp2-tabela-wrap" style={{ marginTop: '0.8rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Sample Sitemap URL' : 'Przykładowy adres z sitemapy'}</th>
                        <th scope="col">&lt;lastmod&gt;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {przykladyLista.slice(0, 5).map((item, idx) => {
                        const u = typeof item === 'string' ? item : item.url;
                        const lm = typeof item === 'object' ? item.lastmod : null;
                        return (
                          <tr key={`${u}-${idx}`}>
                            <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>{u}</td>
                            <td style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.84rem', fontVariantNumeric: 'tabular-nums' }}>{lm || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 4. Generator klucza IndexNow + Pobierz .txt + curl + GitHub Actions */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'IndexNow Key Generator, curl & GitHub Actions' : 'Generator klucza IndexNow, komendy curl i GitHub Actions'}
              </h2>
              <p className="narz-mikro" style={{ overflowWrap: 'anywhere' }}>
                {en
                  ? `Step 1: Download ${nazwaPlikuKlucza} and place it in your public root folder (https://${hostKanoniczny || domena}/${nazwaPlikuKlucza}). Step 2: Ping IndexNow after publishing new or updated URLs.`
                  : `Krok 1: Pobierz plik ${nazwaPlikuKlucza} i umieść go w głównym katalogu publicznym (https://${hostKanoniczny || domena}/${nazwaPlikuKlucza}). Krok 2: Wyślij powiadomienie IndexNow przez curl lub GitHub Actions.`}
              </p>

              <div className="sp2-kafel" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div style={{ minWidth: 0, maxWidth: '100%' }}>
                  <p className="sp2-kafel-etykieta">{en ? 'Generated 128-bit IndexNow Key' : 'Twój 32-znakowy klucz IndexNow'}</p>
                  <p className="sp2-kafel-wartosc" style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.98rem' }}>
                    {kluczBazowy}
                  </p>
                  <p className="narz-mikro" style={{ margin: '0.3rem 0 0', overflowWrap: 'anywhere' }}>
                    {en ? 'File:' : 'Plik:'}{' '}
                    <code style={{ fontSize: '0.78rem', overflowWrap: 'anywhere' }}>{nazwaPlikuKlucza}</code>
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', minWidth: 0, maxWidth: '100%' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.58rem 1.05rem', fontSize: '0.9rem' }}
                    onClick={() => {
                      pobierzPlikTekstowy(zawartoscPlikuKlucza, nazwaPlikuKlucza);
                      track('narzedzie_pobierz_indexnow_txt', { domena });
                    }}
                  >
                    {en ? 'Download key file (.txt)' : 'Pobierz plik klucza (.txt)'}
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.58rem 1rem', fontSize: '0.88rem' }}
                    onClick={() => setWlasnyKlucz(wygenerujKluczHex())}
                  >
                    {en ? 'New random key' : 'Losuj nowy klucz'}
                  </button>
                </div>
              </div>

              <div className="narz-filtry" role="group" aria-label={en ? 'IndexNow integration method' : 'Sposób wdrożenia IndexNow'} style={{ marginTop: '0.9rem' }}>
                <button
                  type="button"
                  aria-pressed={aktywnaZakladka === 'curl'}
                  onClick={() => {
                    setAktywnaZakladka('curl');
                    setSkopiowano('');
                  }}
                >
                  {en ? 'Instant curl Command' : 'Gotowa komenda curl'}
                </button>
                <button
                  type="button"
                  aria-pressed={aktywnaZakladka === 'yaml'}
                  onClick={() => {
                    setAktywnaZakladka('yaml');
                    setSkopiowano('');
                  }}
                >
                  .github/workflows/indexnow.yml
                </button>
              </div>

              <pre className="sp2-kod-okno" tabIndex={0} aria-label={aktywnaZakladka}>
                <code>{aktywnaZakladka === 'curl' ? curlKod : yamlKod}</code>
              </pre>

              <div className="sp2-akcje-kodu">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={async () => {
                    const tekst = aktywnaZakladka === 'curl' ? curlKod : yamlKod;
                    const ok = await skopiujTekst(tekst);
                    if (ok) {
                      setSkopiowano(aktywnaZakladka);
                      track('narzedzie_kopiuj_indexnow', { typ: aktywnaZakladka });
                    }
                  }}
                >
                  {skopiowano === aktywnaZakladka
                    ? (en ? 'Copied to clipboard!' : 'Skopiowano do schowka!')
                    : aktywnaZakladka === 'curl'
                    ? (en ? 'Copy curl command' : 'Kopiuj komendę curl')
                    : (en ? 'Copy indexnow.yml workflow' : 'Kopiuj plik indexnow.yml')}
                </button>
                {aktywnaZakladka === 'yaml' && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => pobierzPlikTekstowy(yamlKod, 'indexnow.yml', 'text/yaml;charset=utf-8')}
                  >
                    {en ? 'Download indexnow.yml' : 'Pobierz indexnow.yml'}
                  </button>
                )}
              </div>
            </div>

            {/* 5. Rekomendacje */}
            {rekomendacje.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">
                  {en
                    ? `Recommended Next Steps (${rekomendacje.length})`
                    : `Rekomendacje wdrożeniowe (${rekomendacje.length} ${odmianaPl(rekomendacje.length, 'punkt', 'punkty', 'punktów')})`}
                </h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {rekomendacje.map((r, idx) => (
                    <li key={idx} className={`narz-problem ${ocena >= 80 ? 'narz-problem--ok' : 'narz-problem--ostrzezenie'}`}>
                      <p className="narz-problem-fix" style={{ margin: 0 }}>
                        {typeof r === 'string' ? r : (r?.opis || r?.tytul || '')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 6. BOFU */}
            <div className="sp2-bofu">
              <h2>
                {en
                  ? 'Want your brand recommended inside ChatGPT Search & Microsoft Copilot?'
                  : 'Chcesz, aby ChatGPT Search i Microsoft Copilot regularnie polecały Twoją firmę?'}
              </h2>
              <p>
                {en
                  ? `Instant indexing in Bing and OAI-SearchBot is the technical foundation. In our Booster Pack (€${CENY.boosterPack.eur} net/mo, ${CENY.boosterPack.umowaMiesiecy}-month minimum), we deploy automated content-hash sitemaps, IndexNow pipelines and ongoing SEO + GEO optimization.`
                  : `Natychmiastowa indeksacja w Bing i OAI-SearchBot to fundament techniczny. W pakiecie Booster Pack (${CENY.boosterPack.pln.toLocaleString('pl-PL')} zł netto/mies., umowa na min. ${CENY.boosterPack.umowaMiesiecy} mies.) wdrażamy automatyczny IndexNow, prawdziwe daty lastmod z sum kontrolnych treści i stałe pozycjonowanie w Google oraz AI.`}
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href={kotwicaKontakt}
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Booster Pack')}
                  data-cta="indexnow_bofu_booster"
                >
                  {en ? `Ask about Booster Pack (€${CENY.boosterPack.eur}/mo)` : `Zapytaj o Booster Pack (${CENY.boosterPack.pln.toLocaleString('pl-PL')} zł/mies.)`}
                </a>
                <Link href="/pozycjonowanie-w-ai/chatgpt" className="sp2-bofu-link">
                  {en ? 'How ChatGPT selects recommended companies' : 'Zobacz skąd ChatGPT bierze polecane firmy'}
                </Link>
              </div>
            </div>

            <LinkWyniku
              narzedzie="indexnow_bing"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={en
                ? `Bing, ChatGPT & IndexNow Check for ${domena}: ${ocena}/100`
                : `Test Bing, ChatGPT i IndexNow dla ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default IndexNowBingClient;
