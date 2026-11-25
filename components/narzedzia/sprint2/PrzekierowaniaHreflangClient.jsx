'use client';

// Inspektor Przekierowan 301/308, Kanonikali i Macierzy Zwrotnosci hreflang (PL + EN).
// Endpoint: POST ${PANEL_API}/przekierowania-hreflang z { url, lang: 'pl' | 'en' }.
// Obsluguje ?url= oraz ?wynik=<uuid> (GET ${PANEL_API}/wynik/<id>) i przycisk 1-klik DEMO.

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { zbudujRegulePrzekierowan } from '@/lib/narzedzia/presetyTechnologiczne';
import LinkWyniku, { PrzykladAdresu } from '@/components/narzedzia/LinkWyniku';
import { Ocena, PasekDemo, Postep } from '@/components/narzedzia/Wspolne';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, odmianaPl, skopiujTekst, wyczyscDomene } from './wspolneSprint2';

function zapasRegul(domena) {
  const czysta = wyczyscDomene(domena, 'twojafirma.pl');
  const kanonicznyHost = `www.${czysta}`;
  return {
    nextjs: `// next.config.mjs - 1-skokowe przekierowanie 308 na https://${kanonicznyHost}
export default {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: '${czysta}' }],
        destination: 'https://${kanonicznyHost}/:path*',
        permanent: true,
      },
    ];
  },
};`,
    nginx: `# /etc/nginx/conf.d/${czysta}.conf - bezposredni skok 301 z HTTP i bez-www na 1 cel
server {
  listen 80;
  listen [::]:80;
  server_name ${czysta} ${kanonicznyHost};
  return 301 https://${kanonicznyHost}$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${czysta};
  return 301 https://${kanonicznyHost}$request_uri;
}`,
    htaccess: `# .htaccess (Apache) - pojedynczy skok 301 bez lancucha http -> https -> www
RewriteEngine On
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} !^www\\. [NC]
RewriteRule ^ https://${kanonicznyHost}%{REQUEST_URI} [R=301,L]`,
    cloudflare: `// Cloudflare Redirect Rules (Single Redirect -> Dynamic)
// When incoming requests match:
(http.host eq "${czysta}") or (not ssl)
// Then -> Type: Dynamic, Status code: 301
concat("https://${kanonicznyHost}", http.request.uri.path)`,
  };
}

function demoPrzekierowania(surowyUrl, en) {
  const domena = wyczyscDomene(surowyUrl || 'twojafirma.pl', en ? 'yourcompany.com' : 'twojafirma.pl');
  const wzorcowa = domena.includes('ai-seo-company');
  const cel = `https://www.${domena}/`;
  const reguly = zapasRegul(domena);

  if (wzorcowa) {
    return {
      ok: true,
      id: null,
      domena,
      ocena: 96,
      wariantyHosta: [
        { wariant: 'http://', startUrl: `http://${domena}/`, skoki: [{ url: `http://${domena}/`, status: 308 }, { url: cel, status: 200 }], celUrl: cel, statusKoncowy: 200, liczbaSkokow: 1, ok: true },
        { wariant: 'https://', startUrl: `https://${domena}/`, skoki: [{ url: `https://${domena}/`, status: 308 }, { url: cel, status: 200 }], celUrl: cel, statusKoncowy: 200, liczbaSkokow: 1, ok: true },
        { wariant: 'http://www.', startUrl: `http://www.${domena}/`, skoki: [{ url: `http://www.${domena}/`, status: 308 }, { url: cel, status: 200 }], celUrl: cel, statusKoncowy: 200, liczbaSkokow: 1, ok: true },
        { wariant: 'https://www.', startUrl: cel, skoki: [{ url: cel, status: 200 }], celUrl: cel, statusKoncowy: 200, liczbaSkokow: 0, ok: true },
      ],
      canonical: {
        html: cel,
        httpHeader: null,
        zgodnyZDocelowym: true,
      },
      hreflang: [
        { kod: 'pl', url: `https://www.${domena}/`, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
        { kod: 'en', url: `https://www.${domena}/en`, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
        { kod: 'de', url: `https://www.${domena}/de`, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
        { kod: 'x-default', url: `https://www.${domena}/`, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
      ],
      maXDefault: true,
      regulyNaprawcze: reguly,
      problemy: [],
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 58,
    wariantyHosta: [
      {
        wariant: 'http://',
        startUrl: `http://${domena}/`,
        skoki: [
          { url: `http://${domena}/`, status: 301 },
          { url: `https://${domena}/`, status: 301 },
          { url: cel, status: 200 },
        ],
        celUrl: cel,
        statusKoncowy: 200,
        liczbaSkokow: 2,
        ok: false,
      },
      {
        wariant: 'https://',
        startUrl: `https://${domena}/`,
        skoki: [{ url: `https://${domena}/`, status: 301 }, { url: cel, status: 200 }],
        celUrl: cel,
        statusKoncowy: 200,
        liczbaSkokow: 1,
        ok: true,
      },
      {
        wariant: 'http://www.',
        startUrl: `http://www.${domena}/`,
        skoki: [{ url: `http://www.${domena}/`, status: 302 }, { url: cel, status: 200 }],
        celUrl: cel,
        statusKoncowy: 200,
        liczbaSkokow: 1,
        ok: false,
      },
      {
        wariant: 'https://www.',
        startUrl: cel,
        skoki: [{ url: cel, status: 200 }],
        celUrl: cel,
        statusKoncowy: 200,
        liczbaSkokow: 0,
        ok: true,
      },
    ],
    canonical: {
      html: `https://${domena}/`,
      httpHeader: null,
      zgodnyZDocelowym: false,
    },
    hreflang: [
      { kod: 'pl', url: cel, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
      { kod: 'en', url: `https://www.${domena}/en`, status: 200, zwrotny: false, zrodlo: 'HTML <head>' },
      { kod: 'de', url: `https://www.${domena}/de`, status: 301, zwrotny: false, zrodlo: 'HTML <head>' },
    ],
    maXDefault: false,
    regulyNaprawcze: reguly,
    problemy: [
      en
        ? `Double redirect chain on http://${domena}/ (2 hops: http -> https -> https://www). Merge into a single 301/308 jump.`
        : `Dwuskokowy łańcuch przekierowań na http://${domena}/ (2 skoki: http -> https -> https://www). Połącz w jeden skok 301/308.`,
      en
        ? `Temporary 302 redirect on http://www.${domena}/ instead of permanent 301/308.`
        : `Tymczasowe przekierowanie 302 na http://www.${domena}/ zamiast stałego 301/308.`,
      en
        ? `Canonical mismatch: <link rel="canonical"> points to https://${domena}/ (non-www), while server redirects to ${cel}.`
        : `Sprzeczność canonical: tag <link rel="canonical"> wskazuje na https://${domena}/ (bez www), podczas gdy serwer przekierowuje na ${cel}.`,
      en
        ? 'Broken hreflang reciprocity: /en does not link back to the Polish URL, /de returns 301, and x-default is missing.'
        : 'Brak zwrotności hreflang: wersja /en nie odsyła zwrotnie do polskiej wersji, /de zwraca kod 301, a tag x-default nie istnieje.',
    ],
  };
}

export function PrzekierowaniaHreflangClient() {
  const en = useLocale() === 'en';
  const [adres, setAdres] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
  const [aktywnySerwer, setAktywnySerwer] = useState('nextjs');
  const [celWww, setCelWww] = useState('www');
  const [bezTrailingSlash, setBezTrailingSlash] = useState(true);
  const [zmienionoPreset, setZmienionoPreset] = useState(false);
  const [skopiowanoKod, setSkopiowanoKod] = useState(false);
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
    if (!skopiowanoKod) return undefined;
    const t = setTimeout(() => setSkopiowanoKod(false), 2800);
    return () => clearTimeout(t);
  }, [skopiowanoKod]);

  function zaladujDemo() {
    const u = adres.trim() || (en ? 'yourcompany.com' : 'twojafirma.pl');
    if (!adres.trim()) setAdres(u);
    const d = demoPrzekierowania(u, en);
    track('narzedzie_demo', { narzedzie: 'przekierowania_hreflang' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomTest(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, wynik: null });
    track('narzedzie_start', { narzedzie: 'przekierowania_hreflang' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoPrzekierowania(wejscie, en);
      track('narzedzie_wynik', { narzedzie: 'przekierowania_hreflang', wynik: d.ocena });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/przekierowania-hreflang`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: en ? 'en' : 'pl' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not inspect redirects for this URL. Verify the address and try again.' : 'Nie udało się sprawdzić przekierowań dla tego adresu. Zweryfikuj domenę i spróbuj ponownie.'),
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'przekierowania_hreflang', wynik: w.ocena ?? w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'Inspection timed out after 45 s. Check if your server blocks automated HTTP requests.' : 'Przekroczono limit 45 s odpowiedzi serwera. Sprawdź, czy zapora nie odrzuca zapytań.')
          : (en ? 'Connection to the diagnostic server failed. Please try again.' : 'Brak połączenia z serwerem diagnostycznym. Spróbuj ponownie za chwilę.'),
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
    track('narzedzie_bofu_klik', { narzedzie: 'przekierowania_hreflang', plan });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const warianty = Array.isArray(w?.wariantyHosta) ? w.wariantyHosta : [];
  const can = w?.canonical || {};
  const canZgodny = Boolean(can.zgodnyZDocelowym ?? (can.zgodny && can.wskazujeSiebie));
  const canHttp = can.httpHeader ?? can.http ?? null;
  const hreflang = Array.isArray(w?.hreflang) ? w.hreflang : [];
  const problemy = Array.isArray(w?.problemy) ? w.problemy : [];
  const domyslneReguly = domena ? zapasRegul(domena) : { nextjs: '', nginx: '', htaccess: '', cloudflare: '' };
  const reguly = {
    nextjs: w?.regulyNaprawcze?.nextjs || domyslneReguly.nextjs,
    nginx: w?.regulyNaprawcze?.nginx || domyslneReguly.nginx,
    htaccess: w?.regulyNaprawcze?.htaccess || domyslneReguly.htaccess,
    cloudflare: w?.regulyNaprawcze?.cloudflare || domyslneReguly.cloudflare,
  };
  const aktywnyKod = zmienionoPreset
    ? zbudujRegulePrzekierowan(domena, aktywnySerwer, celWww, bezTrailingSlash, en ? 'en' : 'pl')
    : (reguly[aktywnySerwer] || zbudujRegulePrzekierowan(domena, aktywnySerwer, celWww, bezTrailingSlash, en ? 'en' : 'pl'));
  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomTest}>
        <div>
          <label htmlFor="redir-url" className="narz-etykieta">
            {en ? 'Domain or page URL to inspect' : 'Domena lub adres podstrony do inspekcji'}
          </label>
          <input
            ref={poleRef}
            id="redir-url"
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
            aria-describedby={stan.status === 'error' ? 'redir-blad' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_przekierowania_start">
            {stan.status === 'loading'
              ? (en ? 'Tracing 4 host variants & hreflang...' : 'Śledzę 4 warianty i hreflang...')
              : (en ? 'Inspect 301, Canonical & hreflang' : 'Sprawdź przekierowania i hreflang')}
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
            ? 'Free without registration: traces HTTP/HTTPS and www/non-www redirect chains, checks HTML & HTTP Link canonical consistency, verifies bidirectional A<->B hreflang tags, and generates 1-click server redirect rules.'
            : 'Za darmo i bez rejestracji: narzędzie śledzi łańcuchy przekierowań dla 4 wariantów hosta (http, https, www), weryfikuje spójność canonicala, bada zwrotność A<->B tagów hreflang i generuje gotowe reguły serwerowe.'}
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Probing http://, https://, http://www. and https://www. redirect hops',
                  'Parsing <link rel="canonical">, HTTP Link headers and robots directives',
                  'Fetching alternate language URLs to verify bidirectional hreflang reciprocity',
                ]
              : [
                  'Odpytujemy 4 warianty adresu (http, https, http://www, https://www) skok po skoku',
                  'Sprawdzamy zgodność <link rel="canonical"> oraz nagłówków HTTP Link',
                  'Pobieramy wersje językowe i weryfikujemy zwrotność macierzy hreflang + x-default',
                ]}
            co={1200}
          />
        )}

        {stan.status === 'error' && (
          <p id="redir-blad" role="alert" className="narz-blad">
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
                  ? 'Sample DEMO preview loaded. Enter your domain above and click "Inspect 301, Canonical & hreflang" for a live HTTP trace.'
                  : 'Wyświetlasz przykładowy wynik DEMO. Wpisz wyżej swoją domenę i kliknij „Sprawdź przekierowania i hreflang”, aby wykonać test na żywo.'}
              </p>
            )}

            {/* 1. Naglowek wyniku */}
            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="301 & i18n" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 85
                    ? (en
                      ? 'Clean consolidation: all host variants resolve in at most 1 permanent hop to your canonical URL without redirect loops or hreflang conflicts.'
                      : 'Czysta konsolidacja sygnałów: wszystkie warianty domeny prowadzą w maks. 1 stałym skoku do kanonicznego adresu bez pętli i błędów hreflang.')
                    : ocena >= 55
                    ? (en
                      ? 'Signal dilution detected: multi-hop redirect chains, 302 temporary redirects, canonical mismatch or non-reciprocal hreflang tags leak link equity.'
                      : 'Wykryto rozproszenie sygnału SEO: wieloskokowe przekierowania, kody 302, rozjazd canonicala lub brak zwrotności hreflang osłabiają indeksację.')
                    : (en
                      ? 'Critical indexing errors: conflicting canonicals, broken redirect chains or HTTP 4xx/5xx language targets prevent stable rankings.'
                      : 'Krytyczne błędy indeksacji: sprzeczne kanonikale, pętle przekierowań lub niedziałające adresy w hreflang blokują stabilne pozycje.')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className={`sp2-pigulka ${canZgodny ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                    Canonical: {canZgodny ? (en ? 'Consistent' : 'Spójny z celem') : (en ? 'Mismatch' : 'Niezgodny')}
                  </span>
                  {hreflang.length > 0 && (
                    <span className={`sp2-pigulka ${w.maXDefault ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                      x-default: {w.maXDefault ? (en ? 'Present' : 'Obecny') : (en ? 'Missing' : 'Brak')}
                    </span>
                  )}
                  <span className={`sp2-pigulka ${problemy.length === 0 ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {problemy.length === 0
                      ? (en ? '0 issues found' : '0 wykrytych błędów')
                      : (en
                        ? `${problemy.length} ${problemy.length === 1 ? 'issue' : 'issues'}`
                        : `${problemy.length} ${odmianaPl(problemy.length, 'problem', 'problemy', 'problemów')}`)}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Tabela 4 wariantow hosta */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? '4 Host Variants & Redirect Hop Chains' : 'Tabela 4 wariantów domeny i łańcuchów skoków HTTP'}
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                {en
                  ? 'Every non-canonical variant should jump directly (1 hop, status 301 or 308) to your single canonical HTTPS address.'
                  : 'Każdy niekanoniczny wariant powinien przechodzić w dokładnie 1 stałym skoku (301 lub 308) na docelowy adres HTTPS.'}
              </p>

              <div className="narz-tabela-wrap sp2-tabela-wrap">
                <table className="narz-tabela">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Variant' : 'Wariant wejściowy'}</th>
                      <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Redirect Chain (Hop by Hop)' : 'Łańcuch skoków przekierowań'}</th>
                      <th scope="col">{en ? 'Hops' : 'Skoki'}</th>
                      <th scope="col">{en ? 'Verdict' : 'Status'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warianty.map((v, idx) => {
                      const skoki = Array.isArray(v.skoki) && v.skoki.length
                        ? v.skoki
                        : [{ url: v.startUrl, status: v.statusKoncowy }];
                      const ileSkokow = Number(v.liczbaSkokow ?? Math.max(0, skoki.length - 1));
                      const etykietaWariantu = ({
                        http_bez_www: en ? 'http:// (non-www)' : 'http:// (bez www)',
                        http_z_www: en ? 'http://www.' : 'http:// (z www)',
                        https_bez_www: en ? 'https:// (non-www)' : 'https:// (bez www)',
                        https_z_www: en ? 'https://www.' : 'https:// (z www)',
                      })[v.wariant] || v.wariant || v.startUrl;
                      return (
                        <tr key={v.startUrl || idx}>
                          <th scope="row" style={{ textAlign: 'left' }}>
                            <span className="narz-silnik" style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.86rem' }}>
                              {etykietaWariantu}
                            </span>
                            {v.wariant && v.startUrl && <span className="narz-mikro">{v.startUrl}</span>}
                          </th>
                          <td style={{ textAlign: 'left' }}>
                            <div className="sp2-skok-lancuch">
                              {skoki.map((sk, sIdx) => {
                                const kod = Number(sk.status || 0);
                                const klasaKodu = kod === 200 ? 'sp2-pigulka--ok' : (kod === 301 || kod === 308) ? 'sp2-pigulka--info' : 'sp2-pigulka--uwaga';
                                return (
                                  <span key={`${sk.url}-${sIdx}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem', flexWrap: 'wrap' }}>
                                    {sIdx > 0 && <span aria-hidden="true">-&gt;</span>}
                                    <span className={`sp2-pigulka ${klasaKodu}`}>{kod || '?'}</span>
                                    <span>{sk.url}</span>
                                  </span>
                                );
                              })}
                            </div>
                          </td>
                          <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
                            {en
                              ? `${ileSkokow} ${ileSkokow === 1 ? 'hop' : 'hops'}`
                              : `${ileSkokow} ${odmianaPl(ileSkokow, 'skok', 'skoki', 'skoków')}`}
                          </td>
                          <td>
                            <span className={`sp2-pigulka ${v.ok ? 'sp2-pigulka--ok' : ileSkokow >= 2 ? 'sp2-pigulka--blad' : 'sp2-pigulka--uwaga'}`}>
                              {v.ok
                                ? (en ? '1-Hop OK' : 'Prawidłowy')
                                : ileSkokow >= 2
                                ? (en ? 'Multi-hop chain' : 'Łańcuch wieloskokowy')
                                : (en ? 'Check status' : 'Wymaga korekty')}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 3. Karta spojnosci Canonical */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Canonical Tag & HTTP Header Consistency' : 'Karta spójności tagu Canonical (HTML + HTTP Link)'}
              </h2>
              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'HTML <link rel="canonical">' : 'Tag HTML <link rel="canonical">'}</p>
                  <p className="sp2-kafel-wartosc" style={{ fontSize: '0.92rem', fontFamily: 'var(--w-mono, monospace)' }}>
                    {can.html || (en ? 'Missing in <head>' : 'Brak w sekcji <head>')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'HTTP Link Header Canonical' : 'Nagłówek HTTP Link (rel="canonical")'}</p>
                  <p className="sp2-kafel-wartosc" style={{ fontSize: '0.92rem', fontFamily: 'var(--w-mono, monospace)' }}>
                    {canHttp || (en ? 'Not set (optional for HTML)' : 'Brak (opcjonalny dla HTML)')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'Alignment With Final Destination' : 'Zgodność z docelowym URL po 301'}</p>
                  <p className="sp2-kafel-wartosc" style={{ color: canZgodny ? '#047857' : '#b3261e' }}>
                    {canZgodny
                      ? (en ? '100% Exact Match' : '100% zgodny (Self-Canonical)')
                      : (en ? 'Conflict Detected' : 'Sprzeczność adresu!')}
                  </p>
                </div>
              </div>
            </div>

            {/* 4. Macierz zwrotnosci hreflang */}
            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">
                  {en ? 'Bidirectional hreflang Reciprocity Matrix' : 'Macierz zwrotności tagów hreflang i x-default'}
                </h2>
                {hreflang.length > 0 && (
                  <span className={`sp2-pigulka ${w.maXDefault ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {w.maXDefault ? 'x-default: OK' : (en ? 'Missing x-default' : 'Brak x-default')}
                  </span>
                )}
              </div>

              {hreflang.length === 0 ? (
                <p className="narz-mikro" style={{ marginTop: '0.5rem' }}>
                  {en
                    ? 'No hreflang tags found in <head> or HTTP headers. If your website targets a single language and country, hreflang is not required. When adding /en or /de versions, ensure every language links back reciprocally (A <-> B) and include x-default.'
                    : 'Nie wykryto tagów hreflang w sekcji <head> ani w nagłówkach HTTP. Dla witryny jednojęzycznej tagi hreflang nie są wymagane. Przy wdrożeniu wersji /en lub /de pamiętaj o pełnej zwrotności A <-> B oraz tagu x-default.'}
                </p>
              ) : (
                <div className="narz-tabela-wrap sp2-tabela-wrap" style={{ marginTop: '0.65rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>hreflang</th>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Target Alternate URL' : 'Docelowy adres alternatywny'}</th>
                        <th scope="col">HTTP</th>
                        <th scope="col">{en ? 'Source' : 'Źródło'}</th>
                        <th scope="col">{en ? 'A <-> B Return Tag' : 'Zwrotność A <-> B'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hreflang.map((h, idx) => (
                        <tr key={`${h.kod || h.lang}-${idx}`}>
                          <th scope="row" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)' }}>
                            {h.kod || h.lang}
                          </th>
                          <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                            {h.url || h.href}
                          </td>
                          <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
                            <span className={`sp2-pigulka ${Number(h.status) === 200 ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                              {h.status || '-'}
                            </span>
                          </td>
                          <td className="narz-mikro">{h.zrodlo || 'HTML <head>'}</td>
                          <td>
                            <span className={`sp2-pigulka ${h.zwrotny ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                              {h.zwrotny
                                ? (en ? 'Reciprocal (OK)' : 'Zwrotny (OK)')
                                : (en ? 'Missing return link!' : 'Brak linku zwrotnego!')}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* 5. 4 zakladki gotowego kodu przekierowan */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Ready-to-Paste 1-Hop Redirect Rules' : 'Gotowe reguły 1-skokowych przekierowań (Kopiuj 1-klik)'}
              </h2>
              <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                {en
                  ? 'Eliminate multi-hop http -> https -> www chains on your server or CDN to preserve 100% of backlink authority.'
                  : 'Wyeliminuj dwuskokowe przekierowania http -> https -> www na swoim serwerze lub w Cloudflare, aby nie tracić mocy linków przychodzących.'}
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.6rem', alignItems: 'center' }}>
                <div className="narz-filtry" role="group" aria-label={en ? 'Canonical host target' : 'Docelowy wariant hosta'}>
                  <button
                    type="button"
                    aria-pressed={celWww === 'www'}
                    onClick={() => { setCelWww('www'); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    https://www.{domena || 'twojafirma.pl'}
                  </button>
                  <button
                    type="button"
                    aria-pressed={celWww === 'bez-www'}
                    onClick={() => { setCelWww('bez-www'); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    https://{domena || 'twojafirma.pl'} ({en ? 'apex / non-www' : 'bez www'})
                  </button>
                </div>
                <div className="narz-filtry" role="group" aria-label={en ? 'Trailing slash policy' : 'Końcowy ukośnik'}>
                  <button
                    type="button"
                    aria-pressed={bezTrailingSlash}
                    onClick={() => { setBezTrailingSlash(true); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    {en ? 'No trailing slash (/oferta)' : 'Bez końcowego / (/oferta)'}
                  </button>
                  <button
                    type="button"
                    aria-pressed={!bezTrailingSlash}
                    onClick={() => { setBezTrailingSlash(false); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    {en ? 'With trailing slash (/oferta/)' : 'Z końcowym / (/oferta/)'}
                  </button>
                </div>
              </div>

              <div className="narz-filtry" role="group" aria-label={en ? 'Server platform' : 'Platforma serwerowa'}>
                {[
                  { id: 'nextjs', etykieta: 'next.config.mjs' },
                  { id: 'nginx', etykieta: 'Nginx' },
                  { id: 'htaccess', etykieta: 'Apache (.htaccess)' },
                  { id: 'cloudflare', etykieta: 'Cloudflare Rules' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    aria-pressed={aktywnySerwer === t.id}
                    onClick={() => {
                      setAktywnySerwer(t.id);
                      setSkopiowanoKod(false);
                    }}
                  >
                    {t.etykieta}
                  </button>
                ))}
              </div>

              <pre className="sp2-kod-okno" tabIndex={0} aria-label={aktywnySerwer}>
                <code>{aktywnyKod}</code>
              </pre>

              <div className="sp2-akcje-kodu">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={async () => {
                    const ok = await skopiujTekst(aktywnyKod);
                    if (ok) {
                      setSkopiowanoKod(true);
                      track('narzedzie_kopiuj_kod', { narzedzie: 'przekierowania_hreflang', platforma: aktywnySerwer });
                    }
                  }}
                >
                  {skopiowanoKod
                    ? (en ? 'Redirect rule copied!' : 'Skopiowano regułę do schowka!')
                    : (en ? 'Copy server rule (1-click)' : 'Kopiuj regułę serwerową (1-klik)')}
                </button>
              </div>
            </div>

            {/* 6. Lista wykrytych problemow */}
            {problemy.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">
                  {en
                    ? `Detected Issues to Fix (${problemy.length})`
                    : `Wykryte błędy do naprawy (${problemy.length} ${odmianaPl(problemy.length, 'pozycja', 'pozycje', 'pozycji')})`}
                </h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {problemy.map((p, idx) => {
                    const tekst = typeof p === 'string' ? p : (p?.opis || p?.tytul || '');
                    return (
                      <li key={idx} className="narz-problem narz-problem--blad">
                        <p className="narz-problem-fix" style={{ margin: 0 }}>{tekst}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* 7. Most konwersyjny BOFU */}
            <div className="sp2-bofu">
              <h2>
                {en
                  ? 'Planning a domain migration, agency switch or DACH/EU international launch?'
                  : 'Planujesz migrację domeny, zmianę agencji SEO albo ekspansję na rynki EN i DACH?'}
              </h2>
              <p>
                {en
                  ? `Broken 301 maps and non-reciprocal hreflang tags are the #1 cause of post-migration traffic drops. In our Full Technical SEO Audit (from €${CENY.audytSeo.eur} net) or monthly SEO & GEO plans (from €${CENY.seoStandard.eur} net/mo), we verify every URL across your entire sitemap.`
                  : `Błędne mapy przekierowań 301 i niespójne tagi hreflang to najczęstsza przyczyna spadków ruchu po przebudowie strony. W pełnym Audycie Technicznym SEO (od ${CENY.audytSeo.pln.toLocaleString('pl-PL')} zł netto) lub w pakiecie miesięcznym (od ${CENY.seoStandard.pln.toLocaleString('pl-PL')} zł netto) weryfikujemy całą mapę witryny.`}
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href={kotwicaKontakt}
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Audyt SEO')}
                  data-cta="przekierowania_bofu_audyt"
                >
                  {en ? `Order Technical SEO Audit (from €${CENY.audytSeo.eur} net)` : `Zamów Audyt Techniczny SEO (od ${CENY.audytSeo.pln.toLocaleString('pl-PL')} zł netto)`}
                </a>
                <Link href="/zmiana-agencji-seo" className="sp2-bofu-link">
                  {en ? 'Safe SEO agency transition checklist' : 'Bezpieczna zmiana agencji SEO krok po kroku'}
                </Link>
              </div>
            </div>

            <LinkWyniku
              narzedzie="przekierowania_hreflang"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={en
                ? `Redirect, Canonical & hreflang Check for ${domena}: ${ocena}/100`
                : `Inspektor 301, canonical i hreflang dla ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default PrzekierowaniaHreflangClient;
