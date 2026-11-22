'use client';

// Deutscher IndexNow-Generator, lastmod-Entropie-Pruefer & Bing/ChatGPT-Tester (/de/tools/indexnow-generator-bing-chatgpt-test).
// API: POST ${PANEL_API}/indexnow-bing mit { url, lang: 'de' }.

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba as fmtDe } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { LinkWyniku, Ocena, PasekDemo, Postep, PrzykladAdresu } from '@/components/de/narzedzia/WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, pobierzPlikTekstowy, skopiujTekst, wyczyscDomene } from '@/components/narzedzia/sprint2/wspolneSprint2';

function wygenerujKluczHex() {
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
  }
  return 'a7f3e9c14b82d0659e1234ab89cd01ef';
}

function zbudujArtefaktyIndexNowDe(domena, klucz, przyklady = []) {
  const czysta = wyczyscDomene(domena, 'ihre-firma.de');
  const host = `https://www.${czysta}`;
  const nazwaPliku = `${klucz}.txt`;
  const listaUrl = przyklady.length
    ? przyklady.slice(0, 3).map((p) => (typeof p === 'string' ? p : p.url)).filter(Boolean)
    : [`${host}/`, `${host}/leistungen`, `${host}/kontakt`];

  const curlKomenda = `curl -i -X POST "https://api.indexnow.org/indexnow" \\
  -H "Content-Type: application/json; charset=utf-8" \\
  -d '${JSON.stringify(
    {
      host: `www.${czysta}`,
      key: klucz,
      keyLocation: `${host}/${nazwaPliku}`,
      urlList: listaUrl,
    },
    null,
    2
  )}'`;

  const githubActionYaml = `name: IndexNow Sofort-Ping (Bing & ChatGPT Search)
on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  indexnow:
    runs-on: ubuntu-latest
    steps:
      - name: IndexNow API nach Deployment benachrichtigen
        run: |
          curl -sS -X POST "https://api.indexnow.org/indexnow" \\
            -H "Content-Type: application/json; charset=utf-8" \\
            -d '{
              "host": "www.${czysta}",
              "key": "${klucz}",
              "keyLocation": "${host}/${nazwaPliku}",
              "urlList": ["${host}/"]
            }'`;

  return { wygenerowanyKlucz: klucz, nazwaPliku, zawartoscPliku: klucz, curlKomenda, githubActionYaml };
}

function normalizujBota(b) {
  if (!b) return { ok: false, robots: 'unknown', httpKod: null, ttfbMs: null, cfIp: false };
  if (typeof b === 'boolean') return { ok: b, robots: b ? 'allow' : 'disallow', httpKod: b ? 200 : 403, ttfbMs: null, cfIp: false };
  if (typeof b === 'string') {
    const ok = /ok|allow|dozwol|erlaub|200/i.test(b) && !/block|zablok|disallow|sperr|403/i.test(b);
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

function demoIndexNowDe(surowyUrl) {
  const domena = wyczyscDomene(surowyUrl || 'ihre-firma.de', 'ihre-firma.de');
  const wzorcowa = domena.includes('ai-seo-company');
  const klucz = '8f4c2e91b7a34d60c5129e80f3a17b4d';
  const przykladyWzorcowe = [
    { url: `https://www.${domena}/de`, lastmod: '2026-11-22' },
    { url: `https://www.${domena}/de/seo-preise`, lastmod: '2026-11-21' },
    { url: `https://www.${domena}/de/ki-seo`, lastmod: '2026-11-18' },
  ];
  const przykladySztuczne = [
    { url: `https://www.${domena}/`, lastmod: '2026-11-22T04:00:01Z' },
    { url: `https://www.${domena}/ueber-uns`, lastmod: '2026-11-22T04:00:01Z' },
    { url: `https://www.${domena}/impressum`, lastmod: '2026-11-22T04:00:01Z' },
  ];
  const artefakty = zbudujArtefaktyIndexNowDe(domena, klucz, wzorcowa ? przykladyWzorcowe : przykladySztuczne);

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
        entropia: 'Hoch',
        przykladyUrl: przykladyWzorcowe,
      },
      indexNow: { wykrytyKlucz: klucz, ...artefakty },
      rekomendacje: [
        'Bingbot und OAI-SearchBot erhalten beide Statuscode 200, und die lastmod-Zeitstempel spiegeln echte Inhaltsänderungen wider.',
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
      entropia: 'Künstlich',
      przykladyUrl: przykladySztuczne,
    },
    indexNow: { wykrytyKlucz: null, ...artefakty },
    rekomendacje: [
      'OAI-SearchBot in Ihrer Server-Firewall (WAF/CDN) freigeben: Trotz Allow in der robots.txt antwortet der Server aktuell mit HTTP 403.',
      'Künstliche Build-Zeitstempel beseitigen: Alle 84 Sitemap-URLs tragen exakt denselben Zeitstempel (1 eindeutiges Datum) - Bing und Google ignorieren solche <lastmod>-Werte.',
      `Die Schlüsseldatei ${artefakty.nazwaPliku} im Stammverzeichnis ablegen und Änderungen per IndexNow-Ping melden.`,
    ],
  };
}

export function IndexNowBingClientDe() {
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
    const u = adres.trim() || 'ihre-firma.de';
    if (!adres.trim()) setAdres(u);
    setWlasnyKlucz('');
    const d = demoIndexNowDe(u);
    track('narzedzie_demo', { narzedzie: 'indexnow_bing', lang: 'de' });
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
    track('narzedzie_start', { narzedzie: 'indexnow_bing', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoIndexNowDe(wejscie);
      track('narzedzie_wynik', { narzedzie: 'indexnow_bing', wynik: d.ocena, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/indexnow-bing`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: 'de' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die Bing- und IndexNow-Prüfung konnte für diese Domain nicht abgeschlossen werden.',
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'indexnow_bing', wynik: w.ocena ?? w.wynik, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? 'Zeitüberschreitung nach 45 Sekunden beim Abruf der sitemap.xml.'
          : 'Keine Verbindung zum Diagnoseserver. Bitte versuchen Sie es gleich noch einmal.',
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
    track('narzedzie_bofu_klik', { narzedzie: 'indexnow_bing', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres, 'ihre-firma.de')) : '';
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
    /sztucz|fake|kuenst|künst|niska|low|ident/i.test(String(entropiaWartosc ?? '')) ||
    (typeof entropiaWartosc === 'number' && entropiaWartosc < 0.15 && zLastmod >= 5)
  );

  const kluczBazowy = wlasnyKlucz || w?.indexNow?.wygenerowanyKlucz || w?.indexNow?.wykrytyKlucz || w?.indexNow?.klucz || '8f4c2e91b7a34d60c5129e80f3a17b4d';
  const wygenerowaneLokalnie = domena
    ? zbudujArtefaktyIndexNowDe(domena, kluczBazowy, przykladyLista)
    : { nazwaPliku: `${kluczBazowy}.txt`, zawartoscPliku: kluczBazowy, curlKomenda: '', githubActionYaml: '' };

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
  const maGeoDe = maWersjeDe('/pozycjonowanie-w-ai');

  function renderujKarteBota(nazwa, rola, daneBota) {
    return (
      <div className="sp2-kafel" style={{ display: 'grid', gap: '0.45rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <h3 className="sp2-h3" style={{ margin: 0, fontFamily: 'var(--w-mono, monospace)' }}>{nazwa}</h3>
          <span className={`sp2-pigulka ${daneBota.cfIp ? 'sp2-pigulka--info' : daneBota.ok ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
            {daneBota.cfIp ? 'Bot-IP-Prüfung (CF)' : daneBota.ok ? 'Erreichbar (HTTP 200)' : 'Blockiert!'}
          </span>
        </div>
        <p className="narz-mikro" style={{ margin: 0 }}>{rola}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.2rem' }}>
          <span className="sp2-pigulka sp2-pigulka--neutral">
            robots.txt: {daneBota.robots === 'allow' ? 'Allow' : 'Disallow'}
          </span>
          {daneBota.httpKod && (
            <span className="sp2-pigulka sp2-pigulka--neutral">
              HTTP {daneBota.httpKod}{daneBota.ttfbMs ? ` · ${fmtDe(daneBota.ttfbMs, 'de')} ms` : ''}
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
          <label htmlFor="inow-url-de" className="narz-etykieta">
            Domain oder Website-URL zur Prüfung eingeben
          </label>
          <input
            ref={poleRef}
            id="inow-url-de"
            name="url"
            required
            {...WALID_DE}
            maxLength={300}
            value={adres}
            onChange={(e) => setAdres(e.target.value)}
            placeholder="z. B. ihre-firma.de"
            className="narz-pole"
            inputMode="url"
            autoComplete="url"
            aria-invalid={stan.status === 'error' ? 'true' : undefined}
            aria-describedby={stan.status === 'error' ? 'inow-blad-de' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_indexnow_de_start">
            {stan.status === 'loading' ? 'Prüfe Bing, Sitemap & IndexNow...' : 'Bing, lastmod & IndexNow prüfen'}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            DEMO-Ergebnis laden
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
          Kostenlos &amp; sofort: prüft den Live-Zugriff von Bingbot und OAI-SearchBot (Basis für ChatGPT Search und Microsoft Copilot), untersucht die Glaubwürdigkeit Ihrer &lt;lastmod&gt;-Zeitstempel in der sitemap.xml und erzeugt Ihre fertige IndexNow-Schlüsseldatei samt curl-Befehl und GitHub Action.
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Prüfung von robots.txt und HTTP-Antwort für Bingbot sowie OAI-SearchBot',
              'Analyse der sitemap.xml und Berechnung der <lastmod>-Datumsverteilung',
              'Erstellung von IndexNow-Schlüssel, curl-Kommando und GitHub-Actions-Workflow',
            ]}
            co={1150}
          />
        )}

        {stan.status === 'error' && (
          <p id="inow-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                Beispiel-DEMO geladen. Geben Sie oben Ihre Domain ein und klicken Sie auf „Bing, lastmod &amp; IndexNow prüfen“, um Ihre Live-Sitemap auszuwerten.
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Bing + KI" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? 'Hohe Bereitschaft für Bing, Copilot und ChatGPT Search: Beide Crawler erhalten HTTP 200 und Ihre Sitemap liefert glaubwürdige Aktualisierungsdaten.'
                    : ocena >= 50
                    ? 'Teilweise bereit: Entweder blockiert eine WAF den OAI-SearchBot, alle <lastmod>-Daten sind künstlich identisch oder IndexNow ist noch nicht hinterlegt.'
                    : 'Kritische Indexierungslücke: Suchbots werden abgewiesen oder es wurde keine gültige sitemap.xml gefunden.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className={`sp2-pigulka ${smZnaleziono ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                    sitemap.xml: {smZnaleziono ? 'Gefunden' : 'Fehlt'}
                  </span>
                  <span className={`sp2-pigulka ${w?.indexNow?.wykrytyKlucz ? 'sp2-pigulka--ok' : 'sp2-pigulka--info'}`}>
                    IndexNow: {w?.indexNow?.wykrytyKlucz ? 'Aktiver Schlüssel erkannt' : 'Schlüssel unten erstellt'}
                  </span>
                </div>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Live-Zugriff für Bingbot &amp; OAI-SearchBot</h2>
              <p className="narz-mikro">
                ChatGPT Search kombiniert den eigenen OAI-SearchBot-Index direkt mit dem Suchindex von Microsoft Bing.
              </p>
              <div className="sp2-kryteria-siatka">
                {renderujKarteBota('Bingbot', 'Indexiert Seiten für Microsoft Bing, Copilot und Suchpartner', bing)}
                {renderujKarteBota('OAI-SearchBot', 'Indexiert Webseiten für klickbare Quellenlinks in ChatGPT Search', oai)}
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">Sitemap &lt;lastmod&gt;-Entropie-Prüfung</h2>
                {smZnaleziono && (
                  <span className={`sp2-pigulka ${sztuczneLastmod ? 'sp2-pigulka--blad' : zLastmod === 0 ? 'sp2-pigulka--uwaga' : 'sp2-pigulka--ok'}`}>
                    {sztuczneLastmod ? 'Künstlich identische Daten!' : zLastmod === 0 ? 'Keine <lastmod>-Tags' : 'Glaubwürdige Streuung'}
                  </span>
                )}
              </div>

              <p className="narz-mikro">
                Setzt ein Build-Skript bei jedem Deployment pauschal dasselbe Datum auf alle Unterseiten, werten Bing und Google das &lt;lastmod&gt;-Signal als unzuverlässig und ignorieren es.
              </p>

              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">URLs in der Sitemap</p>
                  <p className="sp2-kafel-wartosc">{fmtDe(liczbaUrl, 'de')}</p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">URLs mit &lt;lastmod&gt;</p>
                  <p className="sp2-kafel-wartosc">{fmtDe(zLastmod, 'de')}</p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">Eindeutige Daten</p>
                  <p className="sp2-kafel-wartosc" style={{ color: sztuczneLastmod ? '#b3261e' : '#047857' }}>
                    {fmtDe(unikalnychDat, 'de')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">Entropie-Befund</p>
                  <p className="sp2-kafel-wartosc">
                    {typeof entropiaWartosc === 'number'
                      ? fmtDe(entropiaWartosc, 'de', 2)
                      : (entropiaWartosc || (sztuczneLastmod ? 'Künstlich' : 'OK'))}
                  </p>
                </div>
              </div>

              {przykladyLista.length > 0 && (
                <div className="narz-tabela-wrap" style={{ marginTop: '0.8rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>Beispiel-URL aus der Sitemap</th>
                        <th scope="col">&lt;lastmod&gt;</th>
                      </tr>
                    </thead>
                    <tbody>
                      {przykladyLista.slice(0, 5).map((item, idx) => {
                        const u = typeof item === 'string' ? item : item.url;
                        const lm = typeof item === 'object' ? item.lastmod : null;
                        return (
                          <tr key={`${u}-${idx}`}>
                            <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)' }}>{u}</td>
                            <td style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.84rem', fontVariantNumeric: 'tabular-nums' }}>{lm || '-'}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">IndexNow-Schlüsselgenerator, curl &amp; GitHub Actions</h2>
              <p className="narz-mikro">
                Schritt 1: Schlüsseldatei {nazwaPlikuKlucza} herunterladen und im öffentlichen Stammverzeichnis ablegen (https://www.{domena}/{nazwaPlikuKlucza}). Schritt 2: Geänderte URLs per curl oder GitHub Actions melden.
              </p>

              <div className="sp2-kafel" style={{ marginTop: '0.75rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <div>
                  <p className="sp2-kafel-etykieta">Ihr 32-stelliger IndexNow-Schlüssel</p>
                  <p className="sp2-kafel-wartosc" style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.98rem' }}>
                    {kluczBazowy}
                  </p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    style={{ padding: '0.58rem 1.05rem', fontSize: '0.9rem' }}
                    onClick={() => {
                      pobierzPlikTekstowy(zawartoscPlikuKlucza, nazwaPlikuKlucza);
                      track('narzedzie_pobierz_indexnow_txt', { domena, lang: 'de' });
                    }}
                  >
                    Schlüsseldatei {nazwaPlikuKlucza} herunterladen
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.58rem 1rem', fontSize: '0.88rem' }}
                    onClick={() => setWlasnyKlucz(wygenerujKluczHex())}
                  >
                    Neuen Schlüssel erzeugen
                  </button>
                </div>
              </div>

              <div className="narz-filtry" role="group" aria-label="IndexNow-Einbindung" style={{ marginTop: '0.9rem' }}>
                <button
                  type="button"
                  aria-pressed={aktywnaZakladka === 'curl'}
                  onClick={() => {
                    setAktywnaZakladka('curl');
                    setSkopiowano('');
                  }}
                >
                  Fertiger curl-Befehl
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
                      track('narzedzie_kopiuj_indexnow', { typ: aktywnaZakladka, lang: 'de' });
                    }
                  }}
                >
                  {skopiowano === aktywnaZakladka
                    ? 'In die Zwischenablage kopiert!'
                    : aktywnaZakladka === 'curl'
                    ? 'curl-Befehl kopieren'
                    : 'indexnow.yml kopieren'}
                </button>
                {aktywnaZakladka === 'yaml' && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                    onClick={() => pobierzPlikTekstowy(yamlKod, 'indexnow.yml', 'text/yaml;charset=utf-8')}
                  >
                    indexnow.yml herunterladen
                  </button>
                )}
              </div>
            </div>

            {rekomendacje.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Empfohlene Maßnahmen ({rekomendacje.length})</h2>
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

            <div className="sp2-bofu">
              <h2>Schnellere Indexierung und Sichtbarkeit in ChatGPT Search &amp; Copilot gewünscht?</h2>
              <p>
                Im Booster Pack ({eur(CENY.boosterPack.eur, 'de')} netto/Mon., {CENY.boosterPack.umowaMiesiecy} Monate Mindestlaufzeit) implementieren wir automatisierte IndexNow-Pipelines, echte Content-Hash-Sitemaps sowie laufendes B2B-SEO und GEO.
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href="#kontakt"
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Booster Pack')}
                  data-cta="indexnow_de_bofu"
                >
                  Booster Pack anfragen ({eur(CENY.boosterPack.eur, 'de')}/Mon.)
                </a>
                {maGeoDe && (
                  <Link href="/pozycjonowanie-w-ai" className="sp2-bofu-link">
                    Mehr zu KI-SEO (GEO) erfahren
                  </Link>
                )}
              </div>
            </div>

            <LinkWyniku
              narzedzie="indexnow_bing"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={`Bing-, ChatGPT- & IndexNow-Prüfung für ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default IndexNowBingClientDe;
