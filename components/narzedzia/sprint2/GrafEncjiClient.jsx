'use client';

// Walidator i Kreator Grafu Encji Marki JSON-LD (@graph + sameAs) - PL + EN.
// Endpoint: POST ${PANEL_API}/graf-encji z { url, lang: 'pl' | 'en' }.
// Obsluguje ?url= oraz ?wynik=<uuid> (GET ${PANEL_API}/wynik/<id>) i przycisk 1-klik DEMO.

import { useEffect, useMemo, useRef, useState } from 'react';
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

function domyslnySzablonJsonLd(domena) {
  const czysta = wyczyscDomene(domena, 'twojafirma.pl');
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
        vatID: 'PL0000000000',
        taxID: '0000000000',
        sameAs: [
          'https://www.linkedin.com/company/twojafirma',
          'https://clutch.co/profile/twojafirma',
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
        '@id': `${baza}/#founder`,
        name: 'Imie i Nazwisko Eksperta',
        worksFor: { '@id': `${baza}/#organization` },
        sameAs: ['https://www.linkedin.com/in/ekspert'],
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

function demoGrafEncji(surowyUrl, en) {
  const domena = wyczyscDomene(surowyUrl || 'twojafirma.pl', en ? 'yourcompany.com' : 'twojafirma.pl');
  const wzorcowa = domena.includes('ai-seo-company');
  const baza = `https://www.${domena}`;

  if (wzorcowa) {
    return {
      ok: true,
      id: null,
      domena,
      ocena: 95,
      sprawdzoneStrony: [`${baza}/`, `${baza}/o-nas`, `${baza}/cennik-pozycjonowania`],
      wezly: [
        { id: `${baza}/#organization`, typ: 'Organization', nazwa: 'AI SEO COMPANY', strona: '/', maId: true, pola: ['name', 'url', 'logo', 'vatID', 'taxID', 'sameAs', 'address'] },
        { id: `${baza}/#website`, typ: 'WebSite', nazwa: 'ai-seo-company.pl', strona: '/', maId: true, pola: ['name', 'url', 'publisher', 'inLanguage'] },
        { id: `${baza}/#person`, typ: 'Person', nazwa: 'Filip Śliwa', strona: '/o-nas', maId: true, pola: ['name', 'jobTitle', 'worksFor', 'knowsAbout'] },
        { id: `${baza}/#localbusiness`, typ: 'LocalBusiness', nazwa: 'AI SEO COMPANY Warszawa', strona: '/', maId: true, pola: ['telephone', 'address', 'geo', 'openingHoursSpecification'] },
        { id: `${baza}/#service-geo`, typ: 'Service', nazwa: en ? 'AI Search Optimization (GEO)' : 'Pozycjonowanie w AI (GEO)', strona: '/cennik-pozycjonowania', maId: true, pola: ['name', 'provider', 'offers'] },
      ],
      krawedzie: [
        { od: `${baza}/#website`, do: `${baza}/#organization`, relacja: 'publisher' },
        { od: `${baza}/#person`, do: `${baza}/#organization`, relacja: 'worksFor' },
        { od: `${baza}/#localbusiness`, do: `${baza}/#organization`, relacja: 'parentOrganization' },
        { od: `${baza}/#service-geo`, do: `${baza}/#organization`, relacja: 'provider' },
      ],
      sameAs: [
        { platforma: 'Clutch.co', url: 'https://clutch.co/profile/ai-seo-company' },
        { platforma: 'Sortlist', url: 'https://www.sortlist.com/agency/ai-seo-company' },
        { platforma: 'Google Maps', url: 'https://www.google.com/maps?cid=6426780283546953680' },
        { platforma: 'GitHub', url: 'https://github.com/FSliwa' },
      ],
      identyfikatoryRejestrowe: {
        nip: '5253090237',
        krs: '0001239983',
        vatUe: 'PL5253090237',
        leI: null,
      },
      luki: [
        en
          ? 'Optional enhancement: add verified corporate and founder LinkedIn URLs into sameAs for stronger B2B entity disambiguation.'
          : 'Opcjonalne wzmocnienie: uzupełnij zweryfikowane profile LinkedIn spółki oraz autora w tablicy sameAs.',
      ],
      wygenerowanyJsonLd: domyslnySzablonJsonLd(domena),
    };
  }

  return {
    ok: true,
    id: null,
    domena,
    ocena: 46,
    sprawdzoneStrony: [`${baza}/`, `${baza}/o-nas`, `${baza}/kontakt`],
    wezly: [
      { id: 'org-1', typ: 'Organization', nazwa: domena, strona: '/', maId: false, pola: ['name', 'url'] },
      { id: 'web-1', typ: 'WebSite', nazwa: domena, strona: '/', maId: false, pola: ['name', 'url'] },
      { id: 'loc-1', typ: 'LocalBusiness', nazwa: en ? 'Branch Office' : 'Siedziba firmy', strona: '/kontakt', maId: false, pola: ['name', 'telephone'] },
      { id: 'srv-1', typ: 'Service', nazwa: en ? 'Main B2B Service' : 'Główna usługa B2B', strona: '/', maId: false, pola: ['name'] },
    ],
    krawedzie: [
      { od: 'web-1', do: 'org-1', relacja: 'publisher' },
    ],
    sameAs: [
      { platforma: 'Facebook', url: `https://www.facebook.com/${domena.split('.')[0]}` },
    ],
    identyfikatoryRejestrowe: {
      nip: null,
      krs: null,
      vatUe: null,
      leI: null,
    },
    luki: [
      en
        ? 'Missing @id anchors: Organization, WebSite, LocalBusiness and Service sit as disconnected islands without stable #organization cross-references.'
        : 'Brak kotwic @id: węzły Organization, WebSite, LocalBusiness i Service są odizolowanymi wyspami bez spójnego identyfikatora #organization.',
      en
        ? 'No Person / founder / author entity detected on /about - E-E-A-T authorship is invisible to Google Knowledge Graph and LLMs.'
        : 'Brak encji Person (założyciela lub eksperta) na podstronie O nas - autorstwo E-E-A-T jest niewidoczne dla Knowledge Graph i modeli AI.',
      en
        ? 'Zero official tax/company registry identifiers (VAT-ID, Tax ID, Company No.) in Organization schema.'
        : 'Brak oficjalnych identyfikatorów rejestrowych spółki (NIP / taxID, KRS, VAT-UE / vatID) w schemacie Organization.',
      en
        ? 'Weak sameAs corroboration (only 1 social link; missing LinkedIn, Clutch, Google Business Profile or Wikidata).'
        : 'Słabe potwierdzenie encji w sameAs (tylko 1 link społecznościowy; brak LinkedIn, wizytówki Google, Clutch i katalogów B2B).',
    ],
    wygenerowanyJsonLd: domyslnySzablonJsonLd(domena),
  };
}

function SvgGrafWezlow({ wezly, krawedzie, aktywnyIndeks, onWybierz, en }) {
  const lista = wezly.slice(0, 8);
  const cx = 380;
  const cy = 195;
  const rx = 245;
  const ry = 132;

  const pozycje = useMemo(() => {
    if (!lista.length) return [];
    if (lista.length === 1) return [{ ...lista[0], x: cx, y: cy, idx: 0 }];
    // Pierwszy wezel (zwykle Organization) w centrum, pozostale na orbicie elipsy
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
      <svg viewBox="0 0 760 390" role="img" aria-label={en ? 'JSON-LD Entity Graph diagram' : 'Diagram grafu encji JSON-LD'}>
        <defs>
          <radialGradient id="sp2-glow" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="rgba(216, 90, 48, 0.24)" />
            <stop offset="100%" stopColor="rgba(16, 25, 53, 0)" />
          </radialGradient>
        </defs>
        <rect width="760" height="390" rx="14" fill="#101935" />
        <ellipse cx={cx} cy={cy} rx="290" ry="165" fill="url(#sp2-glow)" />
        <ellipse cx={cx} cy={cy} rx={rx} ry={ry} fill="none" stroke="rgba(255,255,255,0.08)" strokeDasharray="4 6" />

        {/* Krawedzie relacji */}
        {krawedzie.map((kr, idx) => {
          const zrodlo = znajdzWezel(kr.od);
          const cel = znajdzWezel(kr.do);
          if (!zrodlo || !cel) return null;
          const mx = (zrodlo.x + cel.x) / 2;
          const my = (zrodlo.y + cel.y) / 2;
          const aktywna = aktywnyIndeks === zrodlo.idx || aktywnyIndeks === cel.idx;
          return (
            <g key={`kr-${idx}`}>
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

        {/* Wezly encji */}
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

export function GrafEncjiClient() {
  const en = useLocale() === 'en';
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
    const d = demoGrafEncji(u, en);
    track('narzedzie_demo', { narzedzie: 'graf_encji' });
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
    track('narzedzie_start', { narzedzie: 'graf_encji' });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 900));
      const d = demoGrafEncji(wejscie, en);
      track('narzedzie_wynik', { narzedzie: 'graf_encji', wynik: d.ocena });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/graf-encji`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ url: wejscie, lang: en ? 'en' : 'pl' }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not extract JSON-LD entities from this domain. Verify the URL and try again.' : 'Nie udało się pobrać grafu encji JSON-LD dla tej domeny. Sprawdź adres i spróbuj ponownie.'),
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'graf_encji', wynik: w.ocena ?? w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'Request timed out after 45 s.' : 'Przekroczono limit 45 s podczas skanowania podstron.')
          : (en ? 'Could not connect to the diagnostic server.' : 'Brak połączenia z serwerem diagnostycznym.'),
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
    track('narzedzie_bofu_klik', { narzedzie: 'graf_encji', plan });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
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
    return domyslnySzablonJsonLd(domena);
  }, [w, domena]);

  const gotowyKodDoKopiowania = zTagiemScript
    ? `<script type="application/ld+json">\n${surowyJson}\n</script>`
    : surowyJson;

  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomWalidacje}>
        <div>
          <label htmlFor="ent-url" className="narz-etykieta">
            {en ? 'Domain or homepage URL to inspect' : 'Domena lub adres strony głównej do walidacji'}
          </label>
          <input
            ref={poleRef}
            id="ent-url"
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
            aria-describedby={stan.status === 'error' ? 'ent-blad' : undefined}
          />
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_graf_encji_start">
            {stan.status === 'loading'
              ? (en ? 'Extracting @graph & sameAs...' : 'Buduję graf encji JSON-LD...')
              : (en ? 'Validate Brand Entity Graph' : 'Sprawdź graf encji i wygeneruj JSON-LD')}
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
            ? 'Free & instant: scans your homepage, /about and /contact pages, draws an interactive SVG diagram of your schema.org @graph nodes, audits sameAs & tax/company registry IDs, and generates a connected JSON-LD template.'
            : 'Za darmo i bez e-maila: skanuje stronę główną, podstronę O nas oraz Kontakt, rysuje interaktywny graf SVG węzłów schema.org, sprawdza linki sameAs i rejestry (NIP / KRS / VAT-UE) oraz generuje połączony szablon @graph JSON-LD.'}
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Fetching homepage, About and Contact pages to extract JSON-LD scripts',
                  'Resolving @id anchors, edge relationships and sameAs authority profiles',
                  'Rendering SVG entity graph and compiling unified @graph JSON-LD',
                ]
              : [
                  'Pobieramy stronę główną, O nas oraz Kontakt i wyciągamy bloki JSON-LD',
                  'Łączymy kotwice @id, relacje między encjami oraz profile zewnętrzne sameAs',
                  'Rysujemy graf SVG węzłów i składamy spójny szablon @graph do wdrożenia',
                ]}
            co={1200}
          />
        )}

        {stan.status === 'error' && (
          <p id="ent-blad" role="alert" className="narz-blad">
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
                  ? 'Sample DEMO preview loaded. Enter your own domain above and click "Validate Brand Entity Graph" for a live crawl.'
                  : 'Wyświetlasz przykładowy wynik DEMO. Wpisz wyżej swoją domenę i kliknij główny przycisk, aby przeskanować własny graf JSON-LD.'}
              </p>
            )}

            {/* 1. Naglowek z ocena */}
            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="Entity SEO" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? (en
                      ? 'Cohesive Knowledge Graph: your Organization, WebSite, Person and Service nodes are cross-linked via stable @id URIs and corroborated by external sameAs profiles.'
                      : 'Spójny graf encji marki: węzły Organization, WebSite, Person i Service są połączone stałymi kotwicami @id i potwierdzone profilami zewnętrznymi sameAs.')
                    : ocena >= 50
                    ? (en
                      ? 'Fragmented entity markup: schema blocks exist on your site, but missing @id references, absent registry IDs or weak sameAs links prevent full Knowledge Graph disambiguation.'
                      : 'Pofragmentowane dane strukturalne: strona posiada pojedyncze znaczniki Schema, ale brak kotwic @id, rejestrów NIP/KRS lub profili sameAs utrudnia jednoznaczną identyfikację firmy w AI.')
                    : (en
                      ? 'Entity blind spot: search engines and LLMs must guess who operates this website due to missing @graph structure, authorship and registry identifiers.'
                      : 'Pusta karta encji: wyszukiwarki i modele AI muszą zgadywać tożsamość firmy z powodu braku połączonego grafu @graph, autora i danych rejestrowych.')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className="sp2-pigulka sp2-pigulka--neutral">
                    {en
                      ? `${wezly.length} ${wezly.length === 1 ? 'entity node' : 'entity nodes'}`
                      : `${wezly.length} ${odmianaPl(wezly.length, 'węzeł encji', 'węzły encji', 'węzłów encji')}`}
                  </span>
                  <span className="sp2-pigulka sp2-pigulka--info">
                    {en
                      ? `${krawedzie.length} @id ${krawedzie.length === 1 ? 'edge' : 'edges'}`
                      : `${krawedzie.length} ${odmianaPl(krawedzie.length, 'relacja @id', 'relacje @id', 'relacji @id')}`}
                  </span>
                  <span className={`sp2-pigulka ${sameAs.length >= 3 ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    sameAs: {sameAs.length}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Interaktywny diagram SVG grafu wezlow */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Interactive Brand Entity Graph (@graph SVG)' : 'Interaktywny graf węzłów encji marki (@graph SVG)'}
              </h2>
              <p className="narz-mikro">
                {en
                  ? 'Click any node to inspect its @id anchor, source URL and declared schema.org properties. Green dot = stable @id URI present.'
                  : 'Kliknij dowolny węzeł, aby sprawdzić jego kotwicę @id, podstronę źródłową oraz zadeklarowane pola schema.org. Zielona kropka = poprawny @id.'}
              </p>

              {wezly.length > 0 ? (
                <>
                  <SvgGrafWezlow
                    wezly={wezly}
                    krawedzie={krawedzie}
                    aktywnyIndeks={aktywnyWezel}
                    onWybierz={setAktywnyWezel}
                    en={en}
                  />

                  <div className="narz-filtry" style={{ marginTop: '0.75rem' }} role="group" aria-label={en ? 'Select entity node' : 'Wybierz węzeł encji'}>
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
                          {wybranyWezel.maId ? `@id: ${wybranyWezel.id}` : (en ? 'Missing @id anchor!' : 'Brak kotwicy @id!')}
                        </span>
                      </div>
                      <p className="narz-mikro" style={{ marginTop: '0.35rem' }}>
                        <strong>{en ? 'Found on:' : 'Wykryto na podstronie:'}</strong> <code>{wybranyWezel.strona || '/'}</code>
                        {Array.isArray(wybranyWezel.pola) && wybranyWezel.pola.length > 0 && (
                          <> · <strong>{en ? 'Properties:' : 'Pola Schema:'}</strong> {wybranyWezel.pola.join(', ')}</>
                        )}
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <p className="narz-blad" style={{ marginTop: '0.65rem' }}>
                  {en
                    ? 'Zero JSON-LD blocks found across scanned pages. Copy the ready-made @graph template below.'
                    : 'Nie wykryto żadnego bloku JSON-LD na sprawdzonych podstronach. Skopiuj gotowy szablon @graph poniżej.'}
                </p>
              )}
            </div>

            {/* 3. Rejestry (NIP / KRS / VAT-UE / LEI) oraz sameAs */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? 'Official Registry IDs & External sameAs Signals' : 'Identyfikatory rejestrowe (NIP / KRS / VAT-UE) i sygnały sameAs'}
              </h2>
              <div className="sp2-siatka-kafle">
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'Tax ID / NIP' : 'NIP (taxID)'}</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.nip ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.nip || (en ? 'Missing' : 'Brak')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'Company Reg. / KRS' : 'Numer KRS / Rejestr'}</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.krs ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.krs || (en ? 'Missing' : 'Brak')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">{en ? 'EU VAT ID (vatID)' : 'VAT-UE (vatID)'}</p>
                  <p className="sp2-kafel-wartosc" style={{ color: rej.vatUe ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.vatUe || (en ? 'Missing' : 'Brak')}
                  </p>
                </div>
                <div className="sp2-kafel">
                  <p className="sp2-kafel-etykieta">ISO 17442 LEI</p>
                  <p className="sp2-kafel-wartosc" style={{ color: (rej.leI || rej.lei) ? '#047857' : 'var(--w-tusz-2)' }}>
                    {rej.leI || rej.lei || (en ? 'Optional' : 'Opcjonalny')}
                  </p>
                </div>
              </div>

              {sameAs.length > 0 ? (
                <div className="narz-tabela-wrap" style={{ marginTop: '0.85rem' }}>
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Platform / Directory' : 'Platforma / Katalog zaufania'}</th>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Linked sameAs Profile URL' : 'Powiązany adres profilu sameAs'}</th>
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
                            <td className="narz-mikro" style={{ textAlign: 'left', fontFamily: 'var(--w-mono, monospace)', color: 'var(--w-tusz)' }}>
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
                  {en
                    ? 'Zero sameAs URLs detected. Add verified profiles on LinkedIn, Clutch, Sortlist, Google Maps and GitHub to anchor your entity in LLM knowledge graphs.'
                    : 'Brak linków w tablicy sameAs. Dodaj zweryfikowane profile na LinkedIn, Clutch, Sortlist, Mapach Google i GitHubie, aby potwierdzić tożsamość spółki.'}
                </p>
              )}
            </div>

            {/* 4. Lista luk Knowledge Graph */}
            {luki.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">
                  {en
                    ? `Knowledge Graph Gaps (${luki.length})`
                    : `Wykryte luki Knowledge Graph (${luki.length} ${odmianaPl(luki.length, 'luka', 'luki', 'luk')})`}
                </h2>
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

            {/* 5. Gotowy polaczony szablon @graph JSON-LD */}
            <div className="sp2-sekcja-wyniku">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                <h2 className="narz-h2">
                  {en ? 'Connected @graph JSON-LD Template (1-Click Copy)' : 'Gotowy połączony szablon @graph JSON-LD (Kopiuj 1-klik)'}
                </h2>
                <div className="narz-filtry" role="group" aria-label="JSON-LD format">
                  <button type="button" aria-pressed={zTagiemScript} onClick={() => setZTagiemScript(true)}>
                    &lt;script type=&quot;application/ld+json&quot;&gt;
                  </button>
                  <button type="button" aria-pressed={!zTagiemScript} onClick={() => setZTagiemScript(false)}>
                    {en ? 'Raw JSON' : 'Czysty JSON'}
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
                      track('narzedzie_kopiuj_jsonld', { domena });
                    }
                  }}
                >
                  {skopiowanoJson
                    ? (en ? 'Copied @graph JSON-LD!' : 'Skopiowano graf JSON-LD!')
                    : (en ? 'Copy @graph JSON-LD (1-click)' : 'Kopiuj szablon @graph JSON-LD')}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  style={{ padding: '0.6rem 1.15rem', fontSize: '0.92rem' }}
                  onClick={() => pobierzPlikTekstowy(surowyJson, `schema-graph-${domena}.json`, 'application/ld+json;charset=utf-8')}
                >
                  {en ? 'Download .json' : 'Pobierz plik .json'}
                </button>
              </div>
            </div>

            {/* 6. BOFU */}
            <div className="sp2-bofu">
              <h2>
                {en
                  ? 'Schema declares your entity - off-page authority proves it to Google & ChatGPT'
                  : 'Kod JSON-LD deklaruje encję - zewnętrzne publikacje i katalogi potwierdzają ją w Google i AI'}
              </h2>
              <p>
                {en
                  ? `Language models cross-check your sameAs declarations against real mentions on Clutch, industry portals and business registries. In our SEO & GEO plans (from €${CENY.seoStandard.eur} net/mo), we implement full @graph schemas and build verified editorial backlinks every month.`
                  : `Modele językowe i Google konfrontują deklaracje sameAs z realnymi wzmiankami w katalogach B2B, mediach branżowych i rejestrach. W pakietach SEO i GEO (od ${CENY.seoStandard.pln.toLocaleString('pl-PL')} zł netto/mies.) wdrażamy kompletny @graph oraz co miesiąc zdobywamy publikacje wzmacniające autorytet marki.`}
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href={kotwicaKontakt}
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Standard')}
                  data-cta="graf_encji_bofu_seo"
                >
                  {en ? `Build Entity Authority (from €${CENY.seoStandard.eur}/mo)` : `Zbuduj autorytet encji (od ${CENY.seoStandard.pln.toLocaleString('pl-PL')} zł/mies.)`}
                </a>
                <Link href="/link-building" className="sp2-bofu-link">
                  {en ? 'How we build editorial B2B links & PR' : 'Zobacz jak prowadzimy Link Building i Digital PR'}
                </Link>
              </div>
            </div>

            <LinkWyniku
              narzedzie="graf_encji"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: domena, wynik: stan.id || null }}
              podsumowanie={en
                ? `JSON-LD Entity Graph Audit for ${domena}: ${ocena}/100 (${wezly.length} nodes)`
                : `Walidacja grafu encji JSON-LD dla ${domena}: ${ocena}/100 (${wezly.length} ${odmianaPl(wezly.length, 'węzeł', 'węzły', 'węzłów')})`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default GrafEncjiClient;
