'use client';

// Deutscher JSON-LD Entitaets-Graph-Validator & @graph-Generator (/de/tools/entity-graph-json-ld-validator).
// API: POST ${PANEL_API}/graf-encji mit { url, lang: 'de' }.

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { LinkWyniku, Ocena, PasekDemo, Postep, PrzykladAdresu } from '@/components/de/narzedzia/WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, pobierzPlikTekstowy, skopiujTekst, wyczyscDomene } from '@/components/narzedzia/sprint2/wspolneSprint2';

const KOLOR_TYPU = {
  Organization: '#d85a30',
  LocalBusiness: '#e07a3c',
  ProfessionalService: '#e07a3c',
  WebSite: '#38bdf8',
  Person: '#34d399',
  Service: '#fbbf24',
  WebPage: '#94a3b8',
  FAQPage: '#a3e635',
};

function domyslnySzablonJsonLdDe(domena) {
  const czysta = wyczyscDomene(domena, 'ihre-firma.de');
  const baza = `https://www.${czysta}`;
  const obiekt = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${baza}/#organization`,
        name: czysta.toUpperCase(),
        url: `${baza}/`,
        logo: { '@type': 'ImageObject', url: `${baza}/logo.png` },
        vatID: 'DE000000000',
        sameAs: [
          'https://www.linkedin.com/company/ihre-firma',
          'https://clutch.co/profile/ihre-firma',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': `${baza}/#website`,
        url: `${baza}/`,
        name: czysta,
        publisher: { '@id': `${baza}/#organization` },
      },
      {
        '@type': 'Person',
        '@id': `${baza}/#person`,
        name: 'Vorname Nachname (Geschäftsführung)',
        worksFor: { '@id': `${baza}/#organization` },
        sameAs: ['https://www.linkedin.com/in/geschaeftsfuehrung'],
      },
      {
        '@type': 'LocalBusiness',
        '@id': `${baza}/#localbusiness`,
        name: czysta.toUpperCase(),
        url: `${baza}/`,
        parentOrganization: { '@id': `${baza}/#organization` },
      },
    ],
  };
  return JSON.stringify(obiekt, null, 2);
}

function demoGrafEncjiDe(surowyUrl) {
  const domena = wyczyscDomene(surowyUrl || 'ihre-firma.de', 'ihre-firma.de');
  const wzorcowa = domena.includes('ai-seo-company');
  const baza = `https://www.${domena}`;

  if (wzorcowa) {
    return {
      ok: true,
      id: null,
      domena,
      ocena: 95,
      sprawdzoneStrony: [`${baza}/de`, `${baza}/de/impressum`, `${baza}/de/seo-preise`],
      wezly: [
        { id: `${baza}/#organization`, typ: 'Organization', nazwa: 'AI SEO COMPANY', strona: '/de', maId: true, pola: ['name', 'url', 'logo', 'vatID', 'taxID', 'sameAs', 'address'] },
        { id: `${baza}/#website`, typ: 'WebSite', nazwa: 'ai-seo-company.pl', strona: '/de', maId: true, pola: ['name', 'url', 'publisher', 'inLanguage'] },
        { id: `${baza}/#person`, typ: 'Person', nazwa: 'Filip Śliwa', strona: '/de', maId: true, pola: ['name', 'jobTitle', 'worksFor', 'knowsAbout'] },
        { id: `${baza}/#localbusiness`, typ: 'LocalBusiness', nazwa: 'AI SEO COMPANY', strona: '/de', maId: true, pola: ['telephone', 'address', 'geo', 'openingHoursSpecification'] },
        { id: `${baza}/#service-geo`, typ: 'Service', nazwa: 'Generative Engine Optimization (GEO)', strona: '/de/seo-preise', maId: true, pola: ['name', 'provider', 'offers'] },
      ],
      krawedzie: [
        { od: `${baza}/#website`, do: `${baza}/#organization`, relacja: 'publisher' },
        { od: `${baza}/#person`, do: `${baza}/#organization`, relacja: 'worksFor' },
        { od: `${baza}/#localbusiness`, do: `${baza}/#organization`, relacja: 'parentOrganization' },
        { od: `${baza}/#service-geo`, do: `${baza}/#organization`, relacja: 'provider' },
      ],
      sameAs: [
        { platforma: 'Clutch.co', url: 'https://clutch.co/profile/ai-signals-company-prosta-sp-ka-akcyjna' },
        { platforma: 'Sortlist', url: 'https://www.sortlist.co.uk/agency/ai-signals-company' },
        { platforma: 'Google Maps', url: 'https://www.google.com/maps/place/?q=place_id:ChIJBbPRrkDNHkcR0Oetxw5AMFk' },
        { platforma: 'GitHub', url: 'https://github.com/FSliwa' },
      ],
      identyfikatoryRejestrowe: {
        nip: '5253090237',
        krs: '0001239983',
        vatUe: null,
        leI: null,
      },
      luki: [
        'Optionale Ergänzung: Verifizierte LinkedIn-Profile des Unternehmens und des Gründers im sameAs-Array hinterlegen.',
      ],
      wygenerowanyJsonLd: domyslnySzablonJsonLdDe(domena),
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 46,
    sprawdzoneStrony: [`${baza}/`, `${baza}/ueber-uns`, `${baza}/impressum`],
    wezly: [
      { id: 'org-1', typ: 'Organization', nazwa: domena, strona: '/', maId: false, pola: ['name', 'url'] },
      { id: 'web-1', typ: 'WebSite', nazwa: domena, strona: '/', maId: false, pola: ['name', 'url'] },
      { id: 'loc-1', typ: 'LocalBusiness', nazwa: 'Unternehmensstandort', strona: '/impressum', maId: false, pola: ['name', 'telephone'] },
      { id: 'srv-1', typ: 'Service', nazwa: 'B2B-Kernleistung', strona: '/', maId: false, pola: ['name'] },
    ],
    krawedzie: [
      { od: 'web-1', do: 'org-1', relacja: 'publisher' },
    ],
    sameAs: [
      { platforma: 'LinkedIn', url: `https://www.linkedin.com/company/${domena.split('.')[0]}` },
    ],
    identyfikatoryRejestrowe: { nip: null, krs: null, vatUe: null, leI: null },
    luki: [
      'Fehlende @id-Knotenanker: Organization, WebSite, LocalBusiness und Service sind nicht über eine gemeinsame #organization-ID verbunden.',
      'Keine Person-Entität (Geschäftsführung / Autor) auf Über-uns oder Impressum gefunden - E-E-A-T bleibt für KI-Modelle unsichtbar.',
      'Keine amtlichen Registerkennungen (USt-IdNr. / vatID, Handelsregister / HRB) im Organization-Schema hinterlegt, obwohl sie im Impressum stehen.',
      'Zu wenige sameAs-Belege: Ergänzen Sie Google Unternehmensprofil, Clutch, WLW oder Branchenregister.',
    ],
    wygenerowanyJsonLd: domyslnySzablonJsonLdDe(domena),
  };
}

function SvgGrafWezlowDe({ wezly, krawedzie, aktywnyIndeks, onWybierz }) {
  const lista = wezly.slice(0, 8);
  const cx = 380;
  const cy = 195;
  const rx = 245;
  const ry = 132;

  const pozycje = useMemo(() => {
    if (!lista.length) return [];
    if (lista.length === 1) return [{ ...lista[0], x: cx, y: cy, idx: 0 }];
    const srodkowy = { ...lista[0], x: cx, y: cy, idx: 0 };
    const reszta = lista.slice(1).map((w, i) => {
      const kat = -Math.PI / 2 + (i * 2 * Math.PI) / (lista.length - 1);
      return {
        ...w,
        x: Math.round(cx + rx * Math.cos(kat)),
        y: Math.round(cy + ry * Math.sin(kat)),
        idx: i + 1,
      };
    });
    return [srodkowy, ...reszta];
  }, [lista]);

  const znajdzWezel = (klucz) =>
    pozycje.find((p) => p.id === klucz || p.typ === klucz || p.nazwa === klucz);

  return (
    <div className="sp2-svg-ramka">
      <svg viewBox="0 0 760 390" role="img" aria-label="JSON-LD Entitäts-Graph Diagramm">
        <defs>
          <radialGradient id="sp2-glow-de" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(216, 90, 48, 0.24)" />
            <stop offset="100%" stopColor="rgba(16, 25, 53, 0)" />
          </radialGradient>
        </defs>
        <rect width="760" height="390" rx="14" fill="#101935" />
        <ellipse cx={cx} cy={cy} rx="290" ry="165" fill="url(#sp2-glow-de)" />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />

        {krawedzie.map((kr, idx) => {
          const zrodlo = znajdzWezel(kr.od);
          const cel = znajdzWezel(kr.do);
          if (!zrodlo || !cel) return null;
          const mx = (zrodlo.x + cel.x) / 2;
          const my = (zrodlo.y + cel.y) / 2;
          const aktywna = aktywnyIndeks === zrodlo.idx || aktywnyIndeks === cel.idx;
          return (
            <g key={`kr-de-${idx}`}>
              <line
                x1={zrodlo.x}
                y1={zrodlo.y}
                x2={cel.x}
                y2={cel.y}
                stroke={aktywna ? '#ff9e7a' : 'rgba(255,255,255,0.32)'}
                strokeWidth={aktywna ? 2.4 : 1.5}
              />
              {kr.relacja && (
                <g transform={`translate(${mx}, ${my})`}>
                  <rect x="-46" y="-10" width="92" height="20" rx="6" fill="#182449" stroke="rgba(255,255,255,0.16)" />
                  <text x="0" y="4" textAnchor="middle" fill="#ffd7c2" fontFamily="var(--w-sans)" fontSize="10.5" fontWeight="600">
                    {String(kr.relacja).slice(0, 16)}
                  </text>
                </g>
              )}
            </g>
          );
        })}

        {pozycje.map((p) => {
          const kolor = KOLOR_TYPU[p.typ] || '#94a3b8';
          const wybrany = aktywnyIndeks === p.idx;
          const skrotNazwy = String(p.nazwa || p.typ || '').slice(0, 22);
          return (
            <g
              key={`${p.id || p.typ}-${p.idx}`}
              transform={`translate(${p.x}, ${p.y})`}
              onClick={() => onWybierz(p.idx)}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="-82"
                y="-28"
                width="164"
                height="56"
                rx="12"
                fill={wybrany ? '#1e2f5d' : '#162142'}
                stroke={wybrany ? '#ff9e7a' : kolor}
                strokeWidth={wybrany ? 2.5 : 1.6}
              />
              <circle cx="-64" cy="-8" r="5" fill={p.maId ? '#34d399' : '#f59e0b'} />
              <text x="-52" y="-4" fill="#ffffff" fontFamily="var(--w-sans)" fontSize="12" fontWeight="700">
                {String(p.typ || 'Thing').slice(0, 18)}
              </text>
              <text x="-68" y="15" fill="rgba(255,255,255,0.78)" fontFamily="var(--w-sans)" fontSize="10.5">
                {skrotNazwy}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

export function GrafEncjiClientDe() {
  const [adres, setAdres] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
  const [aktywnyWezel, setAktywnyWezel] = useState(0);
  const [zTagiemScript, setZTagiemScript] = useState(true);
  const [skopiowanoJson, setSkopiowanoJson] = useState(false);
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
            setAktywnyWezel(0);
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
    if (!skopiowanoJson) return undefined;
    const t = setTimeout(() => setSkopiowanoJson(false), 2800);
    return () => clearTimeout(t);
  }, [skopiowanoJson]);

  function zaladujDemo() {
    const u = adres.trim() || 'ai-seo-company.pl';
    if (!adres.trim()) setAdres(u);
    setAktywnyWezel(0);
    const d = demoGrafEncjiDe(u);
    track('narzedzie_demo', { narzedzie: 'graf_encji', lang: 'de' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomWalidacje(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setAktywnyWezel(0);
    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, wynik: null });
    track('narzedzie_start', { narzedzie: 'graf_encji', lang: 'de' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 900));
      const d = demoGrafEncjiDe(wejscie);
      track('narzedzie_wynik', { narzedzie: 'graf_encji', wynik: d.ocena, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/graf-encji`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: 'de' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || 'Der JSON-LD-Entitätsgraph konnte für diese Domain nicht ausgelesen werden.',
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'graf_encji', wynik: w.ocena ?? w.wynik, lang: 'de' });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? 'Zeitüberschreitung nach 45 Sekunden beim Scannen der Unterseiten.'
          : 'Keine Verbindung zum Diagnoseserver.',
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
    track('narzedzie_bofu_klik', { narzedzie: 'graf_encji', plan, lang: 'de' });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres, 'ihre-firma.de')) : '';
  const wezly = Array.isArray(w?.wezly) ? w.wezly : [];
  const krawedzie = Array.isArray(w?.krawedzie) ? w.krawedzie : [];
  const sameAs = Array.isArray(w?.sameAs) ? w.sameAs : [];
  const rej = w?.identyfikatoryRejestrowe || {};
  const luki = Array.isArray(w?.luki) ? w.luki : [];
  const wybranyWezel = wezly[aktywnyWezel] || wezly[0] || null;

  const surowyJson = useMemo(() => {
    if (!w) return '';
    if (typeof w.wygenerowanyJsonLd === 'string' && w.wygenerowanyJsonLd.trim()) return w.wygenerowanyJsonLd.trim();
    if (w.wygenerowanyJsonLd && typeof w.wygenerowanyJsonLd === 'object') return JSON.stringify(w.wygenerowanyJsonLd, null, 2);
    return domyslnySzablonJsonLdDe(domena);
  }, [w, domena]);

  const gotowyKodDoKopiowania = zTagiemScript
    ? `<script type="application/ld+json">\n${surowyJson}\n</script>`
    : surowyJson;

  const maGeoDe = maWersjeDe('/pozycjonowanie-w-ai');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomWalidacje}>
        <div>
          <label htmlFor="ent-url-de" className="narz-etykieta">
            Domain oder Startseiten-URL zur Prüfung eingeben
          </label>
          <input
            ref={poleRef}
            id="ent-url-de"
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
            aria-describedby={stan.status === 'error' ? 'ent-blad-de' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_graf_encji_de_start">
            {stan.status === 'loading' ? 'Extrahiere @graph & sameAs...' : 'Entitäts-Graph prüfen & JSON-LD erstellen'}
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
          Kostenlos &amp; ohne E-Mail: liest Startseite, Über-uns und Impressum/Kontakt aus, zeichnet ein interaktives SVG-Diagramm Ihrer schema.org-@graph-Knoten, prüft sameAs sowie Registerkennungen (USt-IdNr., HRB) und erzeugt eine verbundene JSON-LD-Vorlage.
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={[
              'Abruf von Startseite, Über-uns und Impressum zum Auslesen aller JSON-LD-Blöcke',
              'Auflösung der @id-Verknüpfungen, Kanten und externen sameAs-Profile',
              'Aufbau des interaktiven SVG-Graphen und der verbundenen @graph-Vorlage',
            ]}
            co={1200}
          />
        )}

        {stan.status === 'error' && (
          <p id="ent-blad-de" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                Beispiel-DEMO geladen. Tragen Sie oben Ihre eigene Domain ein und klicken Sie auf den Hauptbutton, um Ihren Live-Entitätsgraphen zu prüfen.
              </p>
            )}

            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Entity-SEO" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? 'Sauber verknüpfter Marken-Graph: Organization, WebSite, Person und Service sind über feste @id-Anker verbunden und durch externe sameAs-Profile belegt.'
                    : ocena >= 50
                    ? 'Unvollständiger Entitäts-Graph: Einzelne Schema-Blöcke sind vorhanden, aber fehlende @id-Referenzen, Registerdaten oder sameAs-Links erschweren die eindeutige Zuordnung.'
                    : 'Entitäts-Lücke: Suchmaschinen und KI-Modelle finden keinen verbundenen @graph mit Unternehmensdaten, Autorenschaft und Registernummern.'}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className="sp2-pigulka sp2-pigulka--neutral">
                    {wezly.length} {wezly.length === 1 ? 'Entitätsknoten' : 'Entitätsknoten'}
                  </span>
                  <span className="sp2-pigulka sp2-pigulka--info">
                    {krawedzie.length} @id-{krawedzie.length === 1 ? 'Beziehung' : 'Beziehungen'}
                  </span>
                  <span className={`sp2-pigulka ${sameAs.length >= 3 ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    sameAs: {sameAs.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Interaktiver Marken-Entitätsgraph (@graph SVG)</h2>
              <p className="narz-mikro">
                Klicken Sie auf einen Knoten, um @id-Anker, Quellseite und erkannte Schema-Eigenschaften einzusehen. Grüner Punkt = feste @id vorhanden.
              </p>

              {wezly.length > 0 ? (
                <>
                  <SvgGrafWezlowDe
                    wezly={wezly}
                    krawedzie={krawedzie}
                    aktywnyIndeks={aktywnyWezel}
                    onWybierz={setAktywnyWezel}
                  />

                  <div className="narz-filtry" style={{ marginTop: '0.75rem' }} role="group" aria-label="Entitätsknoten auswählen">
                    {wezly.map((wz, idx) => (
                      <button
                        key={`${wz.id || wz.typ}-${idx}`}
                        type="button"
                        aria-pressed={aktywnyWezel === idx}
                        onClick={() => setAktywnyWezel(idx)}
                      >
                        {wz.typ}: {wz.nazwa || `#${idx + 1}`}
                      </button>
                    ))}
                  </div>

                  {wybranyWezel && (
                    <div className="sp2-kafel" style={{ marginTop: '0.75rem' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 className="sp2-h3" style={{ margin: 0 }}>
                          {wybranyWezel.typ} - {wybranyWezel.nazwa || domena}
                        </h3>
                        <span className={`sp2-pigulka ${wybranyWezel.maId ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                          {wybranyWezel.maId ? `@id: ${wybranyWezel.id}` : 'Kein @id-Anker!'}
                        </span>
                      </div>
                      <p className="narz-mikro" style={{ marginTop: '0.35rem', overflowWrap: 'anywhere' }}>
                        <strong>Gefunden auf:</strong> <code style={{ overflowWrap: 'anywhere' }}>{wybranyWezel.strona || '/'}</code>
                        {Array.isArray(wybranyWezel.pola) && wybranyWezel.pola.length > 0 && (
                          <> · <strong>Felder:</strong> {wybranyWezel.pola.join(', ')}</>
                        )}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="narz-blad" style={{ marginTop: '0.65rem' }}>
                  Keine JSON-LD-Blöcke gefunden. Kopieren Sie unten die fertige @graph-Vorlage für Ihre Website.
                </p>
              )}
            </div>

            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">Amtliche Registerkennungen &amp; externe sameAs-Profile</h2>
              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">Steuernummer (taxID)</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.nip ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.nip || 'Fehlt'}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">Handelsregister / HRB</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.krs ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.krs || 'Fehlt'}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">USt-IdNr. (vatID)</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.vatUe ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.vatUe || 'Fehlt'}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">ISO 17442 LEI</p>
                  <p className="sp2-kafel-wartosc" style={{ color: (rej.leI || rej.lei) ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.leI || rej.lei || 'Optional'}
                  </p>
                </div>
              </div>

              {sameAs.length > 0 ? (
                <div className="narz-tabela-wrap sp2-tabela-wrap" style={{ marginTop: '0.85rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>Plattform / Verzeichnis</th>
                        <th scope="col" style={{ textAlign: 'left' }}>Hinterlegte sameAs-URL</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sameAs.map((item, idx) => {
                        const u = typeof item === 'string' ? item : item.url;
                        const plat = typeof item === 'object' && item.platforma ? item.platforma : 'sameAs';
                        return (
                          <tr key={`${u}-${idx}`}>
                            <th scope="row" style={{ textAlign: 'left' }}>
                              <span className="sp2-pigulka sp2-pigulka--ok">{plat}</span>
                            </th>
                            <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)', overflowWrap: 'anywhere', wordBreak: 'break-word' }}>
                              {u}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="narz-mikro" style={{ marginTop: '0.65rem' }}>
                  Keine sameAs-Profile erkannt. Hinterlegen Sie LinkedIn, Google Unternehmensprofil, Clutch, Sortlist oder WLW.
                </p>
              )}
            </div>

            {luki.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">Erkannte Knowledge-Graph-Lücken ({luki.length})</h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {luki.map((l, idx) => (
                    <li key={idx} className={`narz-problem ${ocena >= 85 ? 'narz-problem--ok' : 'narz-problem--ostrzezenie'}`}>
                      <p className="narz-problem-fix" style={{ margin: 0 }}>
                        {typeof l === 'string' ? l : (l?.opis || l?.tytul || '')}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">Verbundene @graph JSON-LD-Vorlage (1-Klick Kopie)</h2>
                <div className="narz-filtry" role="group" aria-label="JSON-LD-Format">
                  <button type="button" aria-pressed={zTagiemScript} onClick={() => setZTagiemScript(true)}>
                    &lt;script type=&quot;application/ld+json&quot;&gt;
                  </button>
                  <button type="button" aria-pressed={!zTagiemScript} onClick={() => setZTagiemScript(false)}>
                    Reines JSON
                  </button>
                </div>
              </div>

              <pre className="sp2-kod-okno" tabIndex={0} aria-label="JSON-LD @graph">
                <code>{gotowyKodDoKopiowania}</code>
              </pre>

              <div className="sp2-akcje-kodu">
                <button
                  type="button"
                  className="btn btn-primary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={async () => {
                    const ok = await skopiujTekst(gotowyKodDoKopiowania);
                    if (ok) {
                      setSkopiowanoJson(true);
                      track('narzedzie_kopiuj_jsonld', { domena, lang: 'de' });
                    }
                  }}
                >
                  {skopiowanoJson ? '@graph JSON-LD kopiert!' : '@graph JSON-LD kopieren (1-Klick)'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={() => pobierzPlikTekstowy(surowyJson, `schema-graph-${domena}.json`, 'application/ld+json;charset=utf-8')}
                >
                  Als .json herunterladen
                </button>
              </div>
            </div>

            <div className="sp2-bofu">
              <h2>Schema-Markup erklärt Ihre Marke - externe Autorität bestätigt sie gegenüber KI</h2>
              <p>
                Sprachmodelle gleichen Ihre sameAs-Angaben mit realen Bewertungen, Fachportalen und Branchenverzeichnissen ab. In unseren monatlichen SEO- &amp; GEO-Paketen (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.) richten wir einen sauberen @graph ein und bauen kontinuierlich redaktionelle Erwähnungen auf.
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href="#kontakt"
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Standard')}
                  data-cta="graf_encji_de_bofu"
                >
                  Entity-SEO &amp; Autorität aufbauen (ab {eur(CENY.seoStandard.eur, 'de')}/Mon.)
                </a>
                {maGeoDe && (
                  <Link href="/pozycjonowanie-w-ai" className="sp2-bofu-link">
                    Mehr zu Generative Engine Optimization (GEO)
                  </Link>
                )}
              </div>
            </div>

            <LinkWyniku
              narzedzie="graf_encji"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={`JSON-LD Entitäts-Graph für ${domena}: ${ocena}/100 (${wezly.length} Knoten)`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default GrafEncjiClientDe;
