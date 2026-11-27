'use client';

// Deutscher 301-Weiterleitungs-, Canonical- & hreflang-Pruefer (/de/tools/weiterleitungen-hreflang-pruefen).
// API: POST ${PANEL_API}/przekierowania-hreflang mit { url, lang: 'de' }.

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { zbudujRegulePrzekierowan } from '@/lib/narzedzia/presetyTechnologiczne';
import { LinkWyniku, Ocena, PasekDemo, Postep, PrzykladAdresu } from '@/components/de/narzedzia/WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, skopiujTekst, wyczyscDomene } from '@/components/narzedzia/sprint2/wspolneSprint2';

function zapasRegulDe(domena) {
  const czysta = wyczyscDomene(domena, 'ihre-firma.de');
  const kanonicznyHost = `www.${czysta}`;
  return {
    nextjs: `// next.config.mjs - direkte 1-Sprung-Weiterleitung (308) auf https://${kanonicznyHost}
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
    nginx: `# /etc/nginx/conf.d/${czysta}.conf - direkter 301-Sprung ohne Zwischenkette
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
    htaccess: `# .htaccess (Apache) - 1-Sprung-301 von HTTP und ohne-www auf das Ziel
RewriteEngine On
RewriteCond %{HTTPS} !=on [OR]
RewriteCond %{HTTP_HOST} !^www\\. [NC]
RewriteRule ^ https://${kanonicznyHost}%{REQUEST_URI} [R=301,L]`,
    cloudflare: `// Cloudflare Redirect Rules (Single Redirect -> Dynamic)
// Bedingung (Expression):
(http.host eq "${czysta}") or (not ssl)
// Ziel (Status 301):
concat("https://${kanonicznyHost}", http.request.uri.path)`,
  };
}

function demoPrzekierowaniaDe(surowyUrl) {
  const domena = wyczyscDomene(surowyUrl || 'ihre-firma.de', 'ihre-firma.de');
  const wzorcowa = domena.includes('ai-seo-company');
  const cel = `https://www.${domena}/`;
  const reguly = zapasRegulDe(domena);

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
      canonical: { html: cel, httpHeader: null, zgodnyZDocelowym: true },
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
    canonical: { html: `https://${domena}/`, httpHeader: null, zgodnyZDocelowym: false },
    hreflang: [
      { kod: 'de', url: cel, status: 200, zwrotny: true, zrodlo: 'HTML <head>' },
      { kod: 'en', url: `https://www.${domena}/en`, status: 200, zwrotny: false, zrodlo: 'HTML <head>' },
      { kod: 'fr', url: `https://www.${domena}/fr`, status: 301, zwrotny: false, zrodlo: 'HTML <head>' },
    ],
    maXDefault: false,
    regulyNaprawcze: reguly,
    problemy: [
      `2-stufige Weiterleitungskette unter http://${domena}/ (http -> https -> https://www). In einen direkten 301/308-Sprung zusammenfassen.`,
      `Temporäre 302-Weiterleitung auf http://www.${domena}/ statt dauerhaftem 301/308-Code.`,
      `Canonical-Widerspruch: <link rel="canonical"> zeigt auf https://${domena}/ (ohne www), während der Server auf ${cel} weiterleitet.`,
      'Fehlende hreflang-Rückverlinkung: /en verweist nicht zurück auf die deutsche URL, /fr antwortet mit 301 und x-default fehlt.',
    ],
  };
}

export function PrzekierowaniaHreflangClientDe() {
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
    const u = adres.trim() || 'ihre-firma.de';
    if (!adres.trim()) setAdres(u);
    const d = demoPrzekierowaniaDe(u);
    track('narzedzie_demo', { narzedzie: 'przekierowania_hreflang', lang: 'de' });
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
    track('narzedzie_start', { narzedzie: 'przekierowania_hreflang', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 850));
      const d = demoPrzekierowaniaDe(wejscie);
      track('narzedzie_wynik', { narzedzie: 'przekierowania_hreflang', wynik: d.ocena, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/przekierowania-hreflang`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: 'de' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die Weiterleitungen konnten für diese Adresse nicht geprüft werden. Bitte kontrollieren Sie die URL.',
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'przekierowania_hreflang', wynik: w.ocena ?? w.wynik, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? 'Zeitüberschreitung nach 45 Sekunden. Prüfen Sie, ob Ihre Firewall automatisierte Abrufe verwirft.'
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
    track('narzedzie_bofu_klik', { narzedzie: 'przekierowania_hreflang', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres, 'ihre-firma.de')) : '';
  const warianty = Array.isArray(w?.wariantyHosta) ? w.wariantyHosta : [];
  const can = w?.canonical || {};
  const canZgodny = Boolean(can.zgodnyZDocelowym ?? (can.zgodny && can.wskazujeSiebie));
  const canHttp = can.httpHeader ?? can.http ?? null;
  const hreflang = Array.isArray(w?.hreflang) ? w.hreflang : [];
  const problemy = Array.isArray(w?.problemy) ? w.problemy : [];
  const domyslneReguly = domena ? zapasRegulDe(domena) : { nextjs: '', nginx: '', htaccess: '', cloudflare: '' };
  const reguly = {
    nextjs: w?.regulyNaprawcze?.nextjs || domyslneReguly.nextjs,
    nginx: w?.regulyNaprawcze?.nginx || domyslneReguly.nginx,
    htaccess: w?.regulyNaprawcze?.htaccess || domyslneReguly.htaccess,
    cloudflare: w?.regulyNaprawcze?.cloudflare || domyslneReguly.cloudflare,
  };
  const aktywnyKod = zmienionoPreset
    ? zbudujRegulePrzekierowan(domena, aktywnySerwer, celWww, bezTrailingSlash, 'de')
    : (reguly[aktywnySerwer] || zbudujRegulePrzekierowan(domena, aktywnySerwer, celWww, bezTrailingSlash, 'de'));
  const maWechselDe = maWersjeDe('/zmiana-agencji-seo');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomTest}>
        <div>
          <label htmlFor="redir-url-de" className="narz-etykieta">
            Domain oder Seiten-URL zur Prüfung eingeben
          </label>
          <input
            ref={poleRef}
            id="redir-url-de"
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
            aria-describedby={stan.status === 'error' ? 'redir-blad-de' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_przekierowania_de_start">
            {stan.status === 'loading' ? 'Prüfe 4 Host-Varianten & hreflang...' : '301, Canonical & hreflang prüfen'}
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
          Kostenlos ohne Anmeldung: verfolgt Weiterleitungsketten aller 4 Host-Varianten (http, https, www), prüft die Übereinstimmung von Canonical-Tag und Ziel-URL, testet die gegenseitige A&lt;-&gt;B-Rückverlinkung im hreflang und generiert kopierfertige Server-Regeln.
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Abruf von http://, https://, http://www. und https://www. Sprung für Sprung',
              'Abgleich von <link rel="canonical"> und HTTP-Link-Headern mit der Zieladresse',
              'Prüfung aller Sprachversionen auf Statuscode 200, Rückverlinkung und x-default',
            ]}
            co={1200}
          />
        )}

        {stan.status === 'error' && (
          <p id="redir-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                Beispiel-DEMO geladen. Tragen Sie oben Ihre eigene Domain ein und klicken Sie auf „301, Canonical &amp; hreflang prüfen“, um Ihre Live-Weiterleitungen zu testen.
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="301 & i18n" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 85
                    ? 'Saubere URL-Konsolidierung: Alle Host-Varianten leiten in maximal einem dauerhaften Sprung auf Ihre kanonische HTTPS-Adresse weiter.'
                    : ocena >= 55
                    ? 'Signalverlust erkannt: Mehrstufige Weiterleitungsketten, 302-Statuscodes, abweichende Canonicals oder fehlende hreflang-Rücklinks schwächen das Ranking.'
                    : 'Kritische Indexierungsfehler: Widersprüchliche Canonicals, Weiterleitungsschleifen oder fehlerhafte Sprachziele gefährden die Sichtbarkeit.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className={`sp2-pigulka ${canZgodny ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                    Canonical: {canZgodny ? 'Konsistent' : 'Abweichung'}
                  </span>
                  {hreflang.length > 0 && (
                    <span className={`sp2-pigulka ${w.maXDefault ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                      x-default: {w.maXDefault ? 'Vorhanden' : 'Fehlt'}
                    </span>
                  )}
                  <span className={`sp2-pigulka ${problemy.length === 0 ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {problemy.length === 0 ? '0 Fehler gefunden' : `${problemy.length} ${problemy.length === 1 ? 'Problem' : 'Probleme'}`}
                  </span>
                </div>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">4 Host-Varianten &amp; Weiterleitungsketten</h2>
              <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                Jede nicht-kanonische Adresse sollte in genau 1 dauerhaften Sprung (Status 301 oder 308) auf die kanonische Ziel-URL verweisen.
              </p>

              <div className="narz-tabela-wrap sp2-tabela-wrap">
                <table className="narz-tabela">
                  <thead>
                    <tr>
                      <th scope="col" style={{ textAlign: 'left' }}>Variante</th>
                      <th scope="col" style={{ textAlign: 'left' }}>Weiterleitungskette (Hop-by-Hop)</th>
                      <th scope="col">Sprünge</th>
                      <th scope="col">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {warianty.map((v, idx) => {
                      const skoki = Array.isArray(v.skoki) && v.skoki.length
                        ? v.skoki
                        : [{ url: v.startUrl, status: v.statusKoncowy }];
                      const ileSkokow = Number(v.liczbaSkokow ?? Math.max(0, skoki.length - 1));
                      const etykietaWariantu = ({
                        http_bez_www: 'http:// (ohne www)',
                        http_z_www: 'http://www.',
                        http_www: 'http://www.',
                        https_bez_www: 'https:// (ohne www)',
                        https_z_www: 'https://www.',
                        https_www: 'https://www.',
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
                            {ileSkokow} {ileSkokow === 1 ? 'Sprung' : 'Sprünge'}
                          </td>
                          <td>
                            <span className={`sp2-pigulka ${v.ok ? 'sp2-pigulka--ok' : ileSkokow >= 2 ? 'sp2-pigulka--blad' : 'sp2-pigulka--uwaga'}`}>
                              {v.ok ? '1-Sprung OK' : ileSkokow >= 2 ? 'Mehrstufige Kette' : 'Prüfen'}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Canonical-Konsistenz (HTML &amp; HTTP-Header)</h2>
              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">HTML &lt;link rel=&quot;canonical&quot;&gt;</p>
                  <p className="sp2-kafel-wartosc" style={{ fontSize: '0.92rem', fontFamily: 'var(--w-mono, monospace)' }}>
                    {can.html || 'Fehlt im <head>'}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">HTTP-Link-Header (rel=&quot;canonical&quot;)</p>
                  <p className="sp2-kafel-wartosc" style={{ fontSize: '0.92rem', fontFamily: 'var(--w-mono, monospace)' }}>
                    {canHttp || 'Nicht gesetzt (optional)'}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">Übereinstimmung mit Ziel-URL</p>
                  <p className="sp2-kafel-wartosc" style={{ color: canZgodny ? '#047857' : '#b3261e' }}>
                    {canZgodny ? '100 % identisch' : 'Widerspruch erkannt!'}
                  </p>
                </div>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">Gegenseitige hreflang-Matrix &amp; x-default</h2>
                {hreflang.length > 0 && (
                  <span className={`sp2-pigulka ${w.maXDefault ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {w.maXDefault ? 'x-default: OK' : 'x-default fehlt'}
                  </span>
                )}
              </div>

              {hreflang.length === 0 ? (
                <p className="narz-mikro" style={{ marginTop: '0.5rem' }}>
                  Keine hreflang-Tags gefunden. Bei einsprachigen Websites ist dies korrekt. Sobald Sie Sprachversionen für DACH (de-DE, de-AT, de-CH) oder Englisch (/en) ergänzen, müssen alle Seiten gegenseitig aufeinander verweisen.
                </p>
              ) : (
                <div className="narz-tabela-wrap sp2-tabela-wrap" style={{ marginTop: '0.65rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>Sprachcode</th>
                        <th scope="col" style={{ textAlign: 'left' }}>Ziel-URL</th>
                        <th scope="col">HTTP</th>
                        <th scope="col">Quelle</th>
                        <th scope="col">Rücklink A &lt;-&gt; B</th>
                      </tr>
                    </thead>
                    <tbody>
                      {hreflang.map((h, idx) => {
                        const niesprawdzone = Boolean(h.niesprawdzone || h.zwrotny === null);
                        const zrodloTekst = ({
                          html: 'HTML <head>',
                          http: 'HTTP Link',
                          sitemap: 'XML Sitemap',
                        })[h.zrodlo] || h.zrodlo || 'HTML <head>';
                        return (
                          <tr key={`${h.kod || h.lang}-${idx}`}>
                            <th scope="row" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)' }}>
                              {h.kod || h.lang}
                            </th>
                            <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                              {h.url || h.href}
                            </td>
                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
                              <span className={`sp2-pigulka ${niesprawdzone && h.status == null ? 'sp2-pigulka--neutral' : Number(h.status) === 200 ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                                {h.status || '-'}
                              </span>
                            </td>
                            <td className="narz-mikro">{zrodloTekst}</td>
                            <td>
                              <span className={`sp2-pigulka ${niesprawdzone ? 'sp2-pigulka--neutral' : h.zwrotny ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                                {niesprawdzone ? 'Nicht geprüft (>12)' : h.zwrotny ? 'Bestätigt (OK)' : 'Rücklink fehlt!'}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Kopierfertige 1-Sprung-Serverregeln (1-Klick)</h2>
              <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                Beseitigen Sie mehrstufige http -&gt; https -&gt; www Ketten direkt auf Ihrem Webserver oder in Cloudflare.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', marginBottom: '0.6rem', alignItems: 'center' }}>
                <div className="narz-filtry" role="group" aria-label="Kanonische Zieldomain">
                  <button
                    type="button"
                    aria-pressed={celWww === 'www'}
                    onClick={() => { setCelWww('www'); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    https://www.{domena || 'ihre-firma.de'}
                  </button>
                  <button
                    type="button"
                    aria-pressed={celWww === 'bez-www'}
                    onClick={() => { setCelWww('bez-www'); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    https://{domena || 'ihre-firma.de'} (ohne www)
                  </button>
                </div>
                <div className="narz-filtry" role="group" aria-label="Schrägstrich am Ende">
                  <button
                    type="button"
                    aria-pressed={bezTrailingSlash}
                    onClick={() => { setBezTrailingSlash(true); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    Ohne Schrägstrich (/angebot)
                  </button>
                  <button
                    type="button"
                    aria-pressed={!bezTrailingSlash}
                    onClick={() => { setBezTrailingSlash(false); setZmienionoPreset(true); setSkopiowanoKod(false); }}
                  >
                    Mit Schrägstrich (/angebot/)
                  </button>
                </div>
              </div>

              <div className="narz-filtry" role="group" aria-label="Server-Plattform">
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
                      track('narzedzie_kopiuj_kod', { narzedzie: 'przekierowania_hreflang', platforma: aktywnySerwer, lang: 'de' });
                    }
                  }}
                >
                  {skopiowanoKod ? 'Server-Regel kopiert!' : 'Regel kopieren (1-Klick)'}
                </button>
              </div>
            </div>

            {problemy.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Erkannte Probleme ({problemy.length})</h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {problemy.map((p, idx) => {
                    const tekst = typeof p === 'string' ? p : (p?.opis || p?.tytul || '');
                    const klasaProblemu = (p?.waga === 'ostrzezenie' || p?.waga === 'uwaga')
                      ? 'narz-problem--ostrzezenie'
                      : 'narz-problem--blad';
                    return (
                      <li key={idx} className={`narz-problem ${klasaProblemu}`}>
                        <p className="narz-problem-fix" style={{ margin: 0 }}>{tekst}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="sp2-bofu">
              <h2>Relaunch, Domain-Umzug oder mehrsprachiger Ausbau für DACH geplant?</h2>
              <p>
                Fehlerhafte 301-Tabellen und einseitige hreflang-Verweise kosten Unternehmen nach einem Relaunch oft monatelang Rankings. Im Technischen SEO-Audit (ab {eur(CENY.audytSeo.eur, 'de')} netto) oder in unseren Monatspaketen (ab {eur(CENY.seoStandard.eur, 'de')} netto) sichern wir Ihre gesamte URL-Struktur ab.
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href="#kontakt"
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Audyt SEO')}
                  data-cta="przekierowania_de_bofu"
                >
                  Technisches SEO-Audit anfragen (ab {eur(CENY.audytSeo.eur, 'de')} netto)
                </a>
                {maWechselDe && (
                  <Link href="/zmiana-agencji-seo" className="sp2-bofu-link">
                    Sicherer Wechsel der SEO-Agentur
                  </Link>
                )}
              </div>
            </div>

            <LinkWyniku
              narzedzie="przekierowania_hreflang"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={`301-, Canonical- & hreflang-Prüfung für ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default PrzekierowaniaHreflangClientDe;
