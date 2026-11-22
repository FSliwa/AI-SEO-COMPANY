'use client';

// Deutscher GEO-Zitierbarkeits- & Antwortblock-Pruefer (/de/tools/geo-zitierbarkeit-pruefen).
// API: POST ${PANEL_API}/cytowalnosc-geo mit { url, konkurentUrl, lang: 'de' }.

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
import { CSS_SPRINT2, wyczyscDomene } from '@/components/narzedzia/sprint2/wspolneSprint2';

function wartoscKryterium(v) {
  if (typeof v === 'number') return Math.max(0, Math.min(100, Math.round(v)));
  if (v && typeof v === 'object') {
    const n = Number(v.ocena ?? v.wynik ?? v.punkty ?? v.procent ?? 0);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
  }
  return 0;
}

function kolorPaska(pkt) {
  if (pkt >= 75) return '#047857';
  if (pkt >= 50) return '#b45309';
  return '#b3261e';
}

function demoCytowalnoscDe(surowyUrl, surowyKonkurent) {
  const domena = wyczyscDomene(surowyUrl || 'ihre-firma.de', 'ihre-firma.de');
  const domenaKonk = wyczyscDomene(surowyKonkurent || 'ai-seo-company.pl', 'ai-seo-company.pl');
  const wzorcowa = domena.includes('ai-seo-company');

  return {
    ok: true,
    id: null,
    domena,
    url: `https://www.${domena}/`,
    ocena: wzorcowa ? 94 : 62,
    kryteria: wzorcowa
      ? { answerFirst: 95, dlugoscBlokow: 92, gestoscFaktow: 96, naglowkiPytania: 90, listyTabele: 95, schemaAutor: 94 }
      : { answerFirst: 49, dlugoscBlokow: 65, gestoscFaktow: 54, naglowkiPytania: 59, listyTabele: 70, schemaAutor: 75 },
    symulacjaAi: wzorcowa
      ? {
          naglowek: 'Was kostet B2B-SEO und KI-Sichtbarkeit (GEO) im DACH-Raum?',
          najlepszyBlok:
            'Laufende B2B-SEO- und GEO-Betreuung startet bei 450 € netto pro Monat (Standard) bzw. 590 € netto im Booster Pack inklusive neuer Next.js-SSR-Website für 0 € Setup bei 3 Monaten Mindestlaufzeit.',
          gotowyDoCytatu: true,
        }
      : {
          naglowek: 'Unsere Leistungen und ganzheitliche Beratung',
          najlepszyBlok:
            'Als erfahrenes Team bieten wir maßgeschneiderte und zukunftssichere Lösungen für anspruchsvolle Unternehmen im Mittelstand, die nachhaltig digital wachsen möchten.',
          gotowyDoCytatu: false,
        },
    bloki: wzorcowa
      ? [
          {
            naglowek: 'H2: Was kostet B2B-SEO und KI-Sichtbarkeit 2026?',
            slow: 60,
            ocena: 96,
            powod: 'Präzise Answer-First-Definition (40-75 Wörter) mit klaren Euro-Beträgen',
            fragment: 'Laufende B2B-SEO- und GEO-Betreuung startet bei 450 € netto pro Monat (Standard)...',
          },
          {
            naglowek: 'H2: Next.js SSR vs. WordPress bei Core Web Vitals',
            slow: 114,
            ocena: 92,
            powod: 'Semantische Vergleichstabelle + Messwerte (LCP <= 2,5 s, INP <= 200 ms)',
            fragment: 'Server-Side Rendering liefert sauberes HTML und JSON-LD in rund 140 ms TTFB...',
          },
        ]
      : [
          {
            naglowek: 'H2: Über unser Unternehmen',
            slow: 238,
            ocena: 39,
            powod: 'Werbetext-Wand (> 220 Wörter) ohne konkrete Zahlen, Preise oder Normen',
            fragment: 'Seit vielen Jahren begleiten wir Kunden mit Leidenschaft, Qualität und individueller Beratung...',
          },
          {
            naglowek: 'H2: Warum Kunden mit uns arbeiten',
            slow: 66,
            ocena: 73,
            powod: 'Gute Abschnittslänge (40-75 Wörter), aber wenige messbare Belege',
            fragment: 'Fester Ansprechpartner, Rückmeldung innerhalb von 24 Stunden und zertifizierte ISO-Prozesse.',
          },
          {
            naglowek: 'H3: Technische Umsetzung & Konditionen',
            slow: 58,
            ocena: 83,
            powod: 'Aufzählung + konkrete Einheiten und Zeitrahmen, direkt zitierfähig',
            fragment: 'Einführung in 14 Werktagen inklusive 12 Monaten SLA-Garantie ab 1.400 € netto.',
          },
        ],
    konkurent: {
      domena: domenaKonk,
      url: `https://www.${domenaKonk}/`,
      ocena: 91,
      kryteria: { answerFirst: 92, dlugoscBlokow: 89, gestoscFaktow: 94, naglowkiPytania: 88, listyTabele: 92, schemaAutor: 91 },
    },
    rekomendacje: wzorcowa
      ? [
          'Zahlen, Preisspannen und Quellenangaben quartalsweise aktualisieren, damit Perplexity und ChatGPT aktuelle Abschnitte bevorzugen.',
          'Weitere Leistungsseiten um semantische HTML-Vergleichstabellen ergänzen.',
        ]
      : [
          'Direkt unter jeder H2-Überschrift einen 45 bis 70 Wörter kurzen Answer-First-Absatz mit Preisrahmen, Dauer und Leistungsumfang ergänzen.',
          'Unkonkrete Werbefloskeln („maßgeschneiderte Lösungen“) durch messbare Kennzahlen, Euro-Spannen, Fristen und DIN/ISO-Standards ersetzen.',
          'Allgemeine Überschriften („Über uns“, „Leistungen“) als echte Kundenfragen formulieren („Was kostet X?“, „Wie lange dauert X?“).',
          'Lange Textblöcke (> 200 Wörter) in semantische <table>-Tabellen oder Listen aufteilen und Autor sowie Aktualisierungsdatum im JSON-LD auszeichnen.',
        ],
  };
}

export function CytowalnoscGeoClientDe() {
  const [adres, setAdres] = useState('');
  const [konkurentUrl, setKonkurentUrl] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
  const poleRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['url', 'vs', 'wynik'], ({ url, vs, wynik }) => {
    if (url) setAdres(url);
    if (vs) setKonkurentUrl(vs);
    if (wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(wynik)) {
      setStan({ status: 'loading', blad: null, wynik: null, id: wynik, trybDemo: false });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            const p = data.podglad;
            if (!url && (p.url || p.domena)) setAdres(p.url || p.domena);
            if (!vs && p.konkurent?.domena) setKonkurentUrl(p.konkurent.domena);
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

  function zaladujDemo() {
    const u = adres.trim() || 'ihre-firma.de';
    const k = konkurentUrl.trim() || 'ai-seo-company.pl';
    if (!adres.trim()) setAdres(u);
    if (!konkurentUrl.trim()) setKonkurentUrl(k);
    const d = demoCytowalnoscDe(u, k);
    track('narzedzie_demo', { narzedzie: 'cytowalnosc_geo', lang: 'de' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomAudyt(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    const wejscieKonk = konkurentUrl.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, vs: wejscieKonk || null, wynik: null });
    track('narzedzie_start', { narzedzie: 'cytowalnosc_geo', lang: 'de', zKonkurentem: Boolean(wejscieKonk) });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 800));
      const d = demoCytowalnoscDe(wejscie, wejscieKonk);
      track('narzedzie_wynik', { narzedzie: 'cytowalnosc_geo', wynik: d.ocena, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/cytowalnosc-geo`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          url: wejscie,
          konkurentUrl: wejscieKonk || undefined,
          lang: 'de',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Die Adresse konnte nicht analysiert werden. Bitte prüfen Sie die URL und versuchen Sie es gleich erneut.',
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'cytowalnosc_geo', wynik: w.ocena ?? w.wynik, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? 'Zeitüberschreitung nach 45 Sekunden. Prüfen Sie, ob eine Firewall externe Abrufe blockiert.'
          : 'Keine Verbindung zum Diagnoseserver. Bitte prüfen Sie Ihre Internetverbindung.',
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
    track('narzedzie_bofu_klik', { narzedzie: 'cytowalnosc_geo', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres, 'ihre-firma.de')) : '';
  const kr = w?.kryteria || {};
  const konk = w?.konkurent && (w.konkurent.domena || w.konkurent.url) ? w.konkurent : null;
  const ocenaKonk = konk ? Math.max(0, Math.min(100, Math.round(Number(konk.ocena ?? konk.wynik ?? 0)))) : null;
  const bloki = Array.isArray(w?.bloki) ? w.bloki : [];
  const rekomendacje = Array.isArray(w?.rekomendacje) ? w.rekomendacje : [];
  const sym = w?.symulacjaAi || null;
  const maGeoDe = maWersjeDe('/pozycjonowanie-w-ai');

  const definicjeKryteriow = [
    { klucz: 'answerFirst', nazwa: 'Answer-First-Einstieg (40-75 Wörter)', opis: 'Direkte Kernaussage unmittelbar unter H2 statt langer Einleitung' },
    { klucz: 'dlugoscBlokow', nazwa: 'RAG-Abschnittslänge', opis: 'Eigenständige Blöcke mit 60-180 Wörtern für sauberes Chunking' },
    { klucz: 'gestoscFaktow', nazwa: 'Fakten-, Zahlen- & Einheitendichte', opis: 'Preise, Prozentwerte, Fristen, Normen und belegbare Kennzahlen' },
    { klucz: 'naglowkiPytania', nazwa: 'Frageorientierte H2/H3-Überschriften', opis: 'Überschriften passend zu realen Suchfragen in ChatGPT und Google' },
    { klucz: 'listyTabele', nazwa: 'Semantische Listen & HTML-Tabellen', opis: 'Klare Aufzählungen und <table>-Vergleiche statt Grafik-Texten' },
    { klucz: 'schemaAutor', nazwa: 'Autorenschaft, Datum & JSON-LD', opis: 'Namentlicher Autor, Aktualisierungsdatum und strukturierte Daten' },
  ];

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomAudyt}>
        <div className="sp2-siatka-pola">
          <div>
            <label htmlFor="geo-url-de" className="narz-etykieta">
              Seiten-URL für den GEO-Zitierbarkeits-Check
            </label>
            <input
              ref={poleRef}
              id="geo-url-de"
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
              aria-describedby={stan.status === 'error' ? 'geo-blad-de' : undefined}
            />
          </div>

          <div>
            <label htmlFor="geo-konkurent-de" className="narz-etykieta">
              Wettbewerber-URL zum 1:1-Vergleich (optional)
            </label>
            <input
              id="geo-konkurent-de"
              name="konkurentUrl"
              maxLength={300}
              value={konkurentUrl}
              onChange={(e) => setKonkurentUrl(e.target.value)}
              placeholder="z. B. wettbewerber.de"
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
            />
          </div>
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_cytowalnosc_geo_de_start">
            {stan.status === 'loading' ? 'Zerlege HTML in RAG-Blöcke...' : 'GEO-Zitierbarkeit prüfen'}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            DEMO-Ergebnis laden
          </button>
        </div>

        <PrzykladAdresu
          adresy={['ai-seo-company.pl/de/seo-preise', 'ai-seo-company.pl/de']}
          onWybierz={(a) => {
            setAdres(a);
            poleRef.current?.focus();
          }}
        />

        <p className="narz-mikro" style={{ margin: 0 }}>
          100 % deterministisch &amp; kostenlos (ohne E-Mail): zerlegt Ihre Unterseite entlang der H2/H3-Überschriften in RAG-Abschnitte, bewertet 6 Zitierkriterien und simuliert den Auszug für Google AI Overviews und ChatGPT.
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Server-HTML abrufen und Navigation sowie Boilerplate entfernen',
              'H2- und H3-Abschnitte in RAG-Antwortblöcke segmentieren',
              '6 GEO-Kriterien bewerten, KI-Snippet simulieren und Wettbewerber vergleichen',
            ]}
            co={1100}
          />
        )}

        {stan.status === 'error' && (
          <p id="geo-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                Beispiel-DEMO geladen. Tragen Sie oben Ihre eigene URL ein und klicken Sie auf „GEO-Zitierbarkeit prüfen“, um Ihre Live-Seite zu testen.
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="GEO-Score" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {w.url || domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? 'Hohe Zitierfähigkeit: Klare Überschriften, prägnante Antwortblöcke und belastbare Zahlen erleichtern ChatGPT, Perplexity und Google AI Overviews das direkte Zitieren.'
                    : ocena >= 50
                    ? 'Mittlere Zitierfähigkeit: Einzelne Abschnitte eignen sich für RAG-Systeme, aber lange Werbeeinleitungen oder fehlende Zahlen bremsen die Quellenauswahl.'
                    : 'Niedrige KI-Zitierfähigkeit: Sprachmodelle finden überwiegend allgemeine Werbetexte ohne kompakte Antwortblöcke, Tabellen oder überprüfbare Fakten.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className="sp2-pigulka sp2-pigulka--neutral">
                    {fmtDe(bloki.length, 'de')} H2/H3-Blöcke geprüft
                  </span>
                  {konk && ocenaKonk !== null && (
                    <span className={`sp2-pigulka ${ocena >= ocenaKonk ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                      vs. {wyczyscDomene(konk.domena || konk.url, 'wettbewerber.de')}: {ocena} zu {ocenaKonk}/100
                    </span>
                  )}
                </div>
              </div>
            </div>

            {sym && (
              <div className="sp2-sekcja-wyniku">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <h2 className="narz-h2">Simulierter Auszug in AI Overview / ChatGPT</h2>
                  <span className={`sp2-pigulka ${sym.gotowyDoCytatu ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {sym.gotowyDoCytatu ? 'Direkt als KI-Zitat geeignet' : 'Schwacher Auszug - Answer-First empfohlen'}
                  </span>
                </div>
                <div className="sp2-ai-wycinek">
                  {sym.naglowek && (
                    <p className="narz-mikro" style={{ margin: 0, fontWeight: 600, color: 'var(--w-tusz)' }}>
                      Zugeordnete Überschrift: {sym.naglowek}
                    </p>
                  )}
                  <blockquote className="sp2-ai-cytat">
                    {sym.najlepszyBlok || 'Kein eigenständiger Faktenabsatz (40-120 Wörter) auf dieser Unterseite erkannt.'}
                  </blockquote>
                  <p className="narz-mikro" style={{ margin: 0 }}>
                    RAG-Pipelines bevorzugen in sich geschlossene Absätze mit 40 bis 75 Wörtern, konkreten Zahlen, Einheiten und eindeutigen Begriffen.
                  </p>
                </div>
              </div>
            )}

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">6 deterministische RAG-Zitierkriterien</h2>
              <p className="narz-mikro">
                {konk
                  ? `Jedes Kriterium wird von 0 bis 100 bewertet und 1:1 mit ${wyczyscDomene(konk.domena || konk.url, 'wettbewerber.de')} verglichen.`
                  : 'Bewertung anhand struktureller und faktenbasierter Signale aus der GEO-Forschung (Princeton / Georgia Tech).'}
              </p>

              <div className="sp2-kryteria-siatka">
                {definicjeKryteriow.map((k) => {
                  const pkt = wartoscKryterium(kr[k.klucz]);
                  const pktKonk = konk?.kryteria ? wartoscKryterium(konk.kryteria[k.klucz]) : null;
                  const roznica = pktKonk !== null ? pkt - pktKonk : null;
                  const kolor = kolorPaska(pkt);
                  return (
                    <div key={k.klucz} className="sp2-kryterium">
                      <div className="sp2-kryterium-gora">
                        <h3 className="sp2-h3" style={{ margin: 0, fontSize: '0.95rem' }}>{k.nazwa}</h3>
                        <span style={{ fontWeight: 700, color: kolor, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                          {pkt}/100
                        </span>
                      </div>
                      <div className="sp2-pasek-tlo" role="progressbar" aria-valuenow={pkt} aria-valuemin={0} aria-valuemax={100} aria-label={k.nazwa}>
                        <div className="sp2-pasek-wypelnienie" style={{ width: `${pkt}%`, background: kolor }} />
                      </div>
                      <p className="narz-mikro" style={{ marginTop: '0.45rem' }}>{k.opis}</p>
                      {pktKonk !== null && (
                        <p className="narz-mikro" style={{ marginTop: '0.25rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: roznica >= 0 ? '#047857' : '#b3261e' }}>
                          Wettbewerber: {pktKonk}/100 ({roznica >= 0 ? `+${roznica}` : roznica})
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {bloki.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Übersicht aller H2/H3-Textblöcke</h2>
                <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                  Idealer Answer-First-Einstieg: 40-75 Wörter; vollständiger RAG-Abschnitt: 60-180 Wörter.
                </p>
                <div className="narz-tabela-wrap">
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>Abschnittsüberschrift &amp; Vorschau</th>
                        <th scope="col">Wörter</th>
                        <th scope="col">Punkte</th>
                        <th scope="col" style={{ textAlign: 'left' }}>Befund</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bloki.map((b, idx) => {
                        const pkt = Math.max(0, Math.min(100, Math.round(Number(b.ocena ?? 0))));
                        const klasa = pkt >= 75 ? 'sp2-pigulka--ok' : pkt >= 50 ? 'sp2-pigulka--uwaga' : 'sp2-pigulka--blad';
                        return (
                          <tr key={`${b.naglowek || 'blok'}-${idx}`}>
                            <th scope="row" style={{ textAlign: 'left' }}>
                              <span className="narz-silnik">{b.naglowek || `Abschnitt #${idx + 1}`}</span>
                              {b.fragment && <span className="narz-mikro">{b.fragment}</span>}
                            </th>
                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                              {fmtDe(b.slow ?? 0, 'de')}
                            </td>
                            <td>
                              <span className={`sp2-pigulka ${klasa}`}>{pkt}/100</span>
                            </td>
                            <td className="narz-mikro" style={{ textAlign: 'left', color: 'var(--w-tusz)' }}>
                              {b.powod || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {rekomendacje.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Konkrete GEO-Handlungsempfehlungen ({rekomendacje.length})</h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {rekomendacje.map((rek, i) => {
                    const tekst = typeof rek === 'string' ? rek : (rek?.opis || rek?.tytul || '');
                    const tytul = typeof rek === 'object' && rek?.tytul && rek?.opis ? rek.tytul : null;
                    return (
                      <li key={i} className={`narz-problem ${ocena >= 80 ? 'narz-problem--ok' : 'narz-problem--ostrzezenie'}`}>
                        {tytul && <p className="narz-problem-tytul"><strong>{tytul}</strong></p>}
                        <p className="narz-problem-fix" style={{ margin: 0 }}>{tekst}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            <div className="sp2-bofu">
              <h2>
                {ocena < 75
                  ? 'Wir bauen Ihre Leistungsseiten zu zitierfähigen KI-Quellen für ChatGPT & Google AI um'
                  : 'Starke Seitenstruktur - prüfen Sie jetzt live, wen 5 KI-Systeme bei Kaufanfragen empfehlen'}
              </h2>
              <p>
                Im KI-Sichtbarkeits-Audit ({eur(CENY.audytAi.eur, 'de')} netto) testen wir 30 reale Kundenfragen in ChatGPT, Perplexity, Gemini und Google AI Overviews. In der laufenden SEO- &amp; GEO-Betreuung (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.) erstellen wir Answer-First-Texte, Tabellen und JSON-LD.
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href="#kontakt"
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Audyt widocznosci w AI')}
                  data-cta="cytowalnosc_geo_de_bofu"
                >
                  KI-Sichtbarkeits-Audit anfragen ({eur(CENY.audytAi.eur, 'de')} netto)
                </a>
                {maGeoDe && (
                  <Link href="/pozycjonowanie-w-ai" className="sp2-bofu-link">
                    Mehr zu Generative Engine Optimization (GEO)
                  </Link>
                )}
              </div>
            </div>

            <LinkWyniku
              narzedzie="cytowalnosc_geo"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: w.url || domena, vs: konk ? (konk.url || konk.domena) : null, wynik: stan.id || null }}
              podsumowanie={`GEO-Zitierbarkeit für ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default CytowalnoscGeoClientDe;
