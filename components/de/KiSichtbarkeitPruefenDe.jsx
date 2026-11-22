'use client';

// Deutsche Seite „KI-Sichtbarkeit prüfen“ (/de/ki-sichtbarkeit-pruefen), Gruppe de-geo. Gleiche Abläufe und Fakten wie
// components/AiCheckerClient.jsx und components/narzedzia/WidocznoscAiClient.jsx (PL/EN), aber alle Texte auf Deutsch.
// API: Panel (/api/narzedzia/widocznosc-ai und /widocznosc-ai/pytania) mit lang: 'de' (lib/narzedziaApi.js,
// Kontrakt in ai-seo-prace/de/de-panel/KONTRAKT.md): Fragen und Ergebnistexte auf Deutsch, Standort der Abfragen Deutschland.
// Bewusst eigene Datei statt Änderungen an den gemeinsamen Tool-Komponenten (BramkaEmail, Wspolne, LinkWyniku kennen kein 'de').
// E-Mail-Schranke: Zustimmungstext ist ein ENTWURF (Prüfung durch Rechtsanwalt nötig); es gibt kein Newsletter-Feld
// (newsletter wird immer als false gesendet, Newsletter-Texte für DE schreibt der Rechtsanwalt).
// Texte (Schritte, FAQ, Grenzen) kommen aus lib/de/kiSichtbarkeit.js.

import { useEffect, useRef, useState } from 'react';
import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import WebAppSchema from '@/components/WebAppSchema';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie, odblokuj } from '@/lib/narzedziaApi';
import { tekstPotwierdzenia } from '@/lib/narzedziaPotwierdzenie';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { WIDOCZNOSC } from '@/lib/narzedziaLiczby';
import { maWersjeDe, STRONY_DE, hrefDe } from '@/lib/stronyDe';
import { Postep } from '@/components/narzedzia/Wspolne';
import { LinkWyniku } from '@/components/de/narzedzia/WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { zachowaniePrzewijania } from '@/lib/ruch';
import '@/components/narzedzia/ruch-c.css';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { BylineDe, faqFuerAppleFaq } from '@/components/de/GeoBausteineDe';
import { KOPF, ODER_NACH_EMAIL, SCHRITTE, METHODE, LESEN, WEITER, WEITER_LINKS, QUELLEN, WEITERE_TOOLS, FAQ, SCHEMA, STAND, SCHLUESSEL, listeEngines } from '@/lib/de/kiSichtbarkeit';
import { SIEDZIBA } from '@/lib/firma';

const W = WIDOCZNOSC;
const PYTAMY = W.grok ? 'ChatGPT, Gemini, Perplexity, Claude und Grok' : 'ChatGPT, Gemini, Perplexity und Claude';
const KROKI = ['Wir senden 3 Kundenfragen an die KI-Engines', `Wir fragen ${PYTAMY}`, 'Wir prüfen die AI Overviews in Google', 'Wir suchen Ihr Unternehmen in Antworten und Quellen'];

// Fragen des Kunden: gleiche Grenzen wie im Panel (PYTANIE_DLUGOSC, Adressmuster, allgemeine Namensbestandteile).
// Das Panel prüft sie noch einmal und hat das letzte Wort.
const PYTANIE = { min: 10, max: 200 };
const ADRES = /https?:\/\/|(^|[^\p{L}\p{N}-])www\.|[\p{L}\p{N}._%+-]+@[\p{L}\p{N}-]+\.\p{L}{2,}|(^|[^\p{L}\p{N}-])[\p{L}\p{N}][\p{L}\p{N}-]*\.(pl|com|eu|net|org|io|ai|info|biz|co|uk|de|at|ch|app|dev|shop|online|store|xyz|me|tv|edu|gov|cz|sk|ua)(?![\p{L}\p{N}])/iu;
const OGOLNE = new Set(['seo', 'web', 'art', 'pro', 'net', 'com', 'app', 'www', 'firma', 'sklep', 'studio', 'agentur', 'agencja', 'group', 'gruppe', 'grupa', 'polska', 'gmbh', 'service', 'deutschland']);
const proste = (t) => ` ${String(t || '').normalize('NFKD').replace(/\p{M}/gu, '').replace(/ł/gi, 'l').replace(/ß/g, 'ss').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
const zwin = (t) => String(t || '').replace(/\s+/g, ' ').trim();

const KRAJE_DE = [
  ['DE', 'DE - Deutschland'],
  ['AT', 'AT - Österreich'],
  ['CH', 'CH - Schweiz'],
];
const WO_KRAJ_DE = { DE: 'in Deutschland', AT: 'in Österreich', CH: 'in der Schweiz' };
const FUER_KRAJ_DE = { DE: 'Deutschland', AT: 'Österreich', CH: 'die Schweiz' };
const KROTKA_NAZWA_KRAJU_DE = { DE: 'Deutschland', AT: 'Österreich', CH: 'Schweiz' };

function krajZDomenyDe(wartosc) {
  const h = String(wartosc || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  if (!h || !h.includes('.')) return null;
  if (h.endsWith('.co.at') || h.endsWith('.or.at') || h.endsWith('.at')) return 'AT';
  if (h.endsWith('.ch')) return 'CH';
  if (h.endsWith('.de')) return 'DE';
  return null;
}

function odczytajOdblokowane(id) {
  if (!id || typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(`aisc_odblok_${id}`);
    if (!raw) return null;
    const p = JSON.parse(raw);
    return p && typeof p === 'object' ? (p.pelny ?? p) : null;
  } catch {
    return null;
  }
}

function zapiszOdblokowane(id, pelny) {
  if (!id || !pelny || typeof window === 'undefined') return;
  try {
    window.sessionStorage.setItem(`aisc_odblok_${id}`, JSON.stringify(pelny));
  } catch {
    // kein Zugriff auf sessionStorage
  }
}

const WIELOCZLONOWE_TLD_DE = /\.(com\.pl|waw\.pl|net\.pl|org\.pl|info\.pl|co\.uk|org\.uk|co\.at|or\.at|com\.de)$/i;

function bezTldDomenyDe(host) {
  if (!host || !host.includes('.')) return '';
  if (WIELOCZLONOWE_TLD_DE.test(host)) return host.replace(WIELOCZLONOWE_TLD_DE, '').replace(/\./g, ' ');
  return host.split('.').slice(0, -1).join(' ');
}

function wzorceMarki(firma, www) {
  const zbior = new Set();
  const czystaFirma = zwin(firma);
  if (czystaFirma.length >= 2) {
    zbior.add(czystaFirma);
    const bezFormy = zwin(czystaFirma.replace(/\b(gmbh\s*&\s*co\.\s*kg|gmbh|ug|ag|kg|og|e\.u\.|gbr|ltd\.?|limited|llc|inc\.?|corp\.?|p\.s\.a\.|s\.a\.)\b/gi, ''));
    if (bezFormy.length >= 3 && !OGOLNE.has(bezFormy.toLowerCase())) zbior.add(bezFormy);
  }
  const host = String(www || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  if (host.length >= 4 && host.includes('.')) {
    zbior.add(host);
    const korzen = host.replace(/\.(com\.pl|waw\.pl|net\.pl|org\.pl|info\.pl|co\.uk|org\.uk|co\.at|or\.at|com\.de|[a-z]{2,12})$/i, '');
    if (korzen.length >= 3 && !korzen.includes('.') && !OGOLNE.has(korzen)) zbior.add(korzen);
  }
  return [...zbior].sort((a, b) => b.length - a.length);
}

function podswietlMarke(tekst, wzorce) {
  const txt = String(tekst || '');
  if (!txt || !wzorce?.length) return txt;
  const esc = wzorce.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  if (!esc) return txt;
  const re = new RegExp(`(${esc})`, 'gi');
  const czesci = txt.split(re);
  if (czesci.length <= 1) return txt;
  return czesci.map((czesc, idx) => (idx % 2 === 1
    ? <mark key={idx} style={{ background: 'rgba(216, 90, 48, 0.18)', color: 'inherit', padding: '0.05em 0.2em', borderRadius: '4px' }}>{czesc}</mark>
    : czesc));
}

function bladPytania(lista, i, dane) {
  const t = zwin(lista[i]);
  if (t.length < PYTANIE.min || t.length > PYTANIE.max) return `Eine Frage muss zwischen ${PYTANIE.min} und ${PYTANIE.max} Zeichen lang sein.`;
  if (ADRES.test(t)) return 'Entfernen Sie die Website- oder E-Mail-Adresse.';
  const n = proste(t);
  const host = String(dane.www || '').toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  const marki = [proste(dane.firma), host.includes('.') ? proste(bezTldDomenyDe(host)) : ''].map((m) => m.trim()).filter((m) => m.replace(/ /g, '').length >= 3 && !OGOLNE.has(m));
  if (marki.some((m) => n.includes(` ${m} `))) return 'Entfernen Sie Ihren Firmennamen oder Ihre Domain: Das Modell würde sie in der Antwort wiederholen und das Ergebnis aufblähen.';
  if (lista.some((x, j) => j < i && proste(x) === n)) return 'Dieselbe Frage steht schon weiter oben.';
  return null;
}

// Demo-Modus (ohne Panel, nur lokale Vorschau): dieselben Vorlagen wie im Panel, ohne Frage aus der Website.
function pytaniaDemo(branza, miasto, kraj = 'DE') {
  const wo = miasto ? `in ${miasto}` : (WO_KRAJ_DE[kraj] || 'in Deutschland');
  const krotko = KROTKA_NAZWA_KRAJU_DE[kraj] || 'Deutschland';
  return [`Welches Unternehmen aus der Branche „${branza}“ empfehlen Sie ${wo}? Nennen Sie einige Namen.`, `Wer ist der Beste in der Branche „${branza}“ ${wo}?`, `Ich suche: ${branza}${miasto ? `, ${miasto}` : `, ${krotko}`}. Welches Unternehmen soll ich wählen und warum?`];
}

function demoZPytaniami(obiekt, mapa) {
  if (!obiekt) return obiekt;
  const zamien = (q) => mapa.get(q) ?? q;
  return { ...obiekt, ...(obiekt.pytania ? { pytania: obiekt.pytania.map(zamien) } : {}), ...(obiekt.siatka ? { siatka: obiekt.siatka.map((x) => ({ ...x, pytanie: zamien(x.pytanie) })) } : {}), ...(obiekt.wiersze ? { wiersze: obiekt.wiersze.map((w) => ({ ...w, pytanie: zamien(w.pytanie) })) } : {}) };
}

/** 3 vorgeschlagene Fragen aus dem Panel. { ok, pytania, zrodloPytan } oder { ok: false, status, blad }. */
async function pobierzPytania(body) {
  if (DEMO) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true, pytania: pytaniaDemo(body.branza.trim(), body.miasto.trim() || null, body.kraj), zrodloPytan: ['szablon', 'szablon', 'szablon'] };
  }
  const ctrl = new AbortController();
  const zegar = setTimeout(() => ctrl.abort(), 20_000);
  try {
    const res = await fetch(`${PANEL_API}/widocznosc-ai/pytania`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body), signal: ctrl.signal });
    const data = await res.json().catch(() => ({}));
    if (res.ok && data.ok && Array.isArray(data.pytania) && data.pytania.length === 3) return data;
    return { ok: false, status: res.status, blad: data.error || null };
  } catch {
    return { ok: false, status: 0, blad: null };
  } finally {
    clearTimeout(zegar);
  }
}

const ETYKIETA_ZRODLA = { szablon: 'aus Branche und Stadt', strona: 'aus dem Inhalt Ihrer Website', uzytkownik: 'von Ihnen geändert' };
const OPCJONALNIE = { fontWeight: 400, fontSize: '0.8rem', color: 'var(--w-tusz-2)', whiteSpace: 'nowrap' };

function liniaNaZywo(kraj = 'DE') {
  const fuer = FUER_KRAJ_DE[kraj] || 'Deutschland';
  const szukaja = W.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity und Claude suchen im Netz' : 'ChatGPT, Perplexity und Claude suchen im Netz, Gemini antwortet aus dem Modellwissen';
  return `Ohne Anmeldung. Bis zu ${W.limitIp} Unternehmen pro Tag von einer IP-Adresse. Wir fragen live über die APIs: ${szukaja}, und die AI Overviews prüfen wir in den Google-Ergebnissen für ${fuer}.${W.grok ? ' Grok antwortet aus dem Modellwissen, ohne Websuche.' : ''} ChatGPT meint hier ein OpenAI-Modell mit Websuche über die API; Antworten der ChatGPT-App können abweichen.`;
}

function lacz(lista) {
  if (lista.length < 2) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} und ${lista[lista.length - 1]}`;
}

function opisBramki(p, top, topZr) {
  const resztaFirm = Math.max(0, (p.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p.zrodel ?? 0) - topZr.length);
  const co = [`den Wortlaut der ${p.odpowiedzi} Antworten`, 'die Quellen jeder Antwort'];
  if (resztaFirm) co.push(top.length ? `die übrigen Unternehmen (${resztaFirm})` : `die in den Antworten gefundenen Unternehmen (${resztaFirm}), automatisch aus dem Antworttext erkannt`);
  if (resztaZrodel) co.push(`die übrigen zitierten Seiten (${resztaZrodel})`);
  return `Wir zeigen ${lacz(co)} und senden Ihnen den Bericht per E-Mail.`;
}

// 18.11.2026 (anim-narzedzia-c): znaczniki wchodzą staggerem 50 ms (r-stan, --i = numer pytania, maks. 6 kroków).
function Znak({ stan, i = 0 }) {
  const ruch = { '--i': i };
  if (stan === 'brak') return <span className="narz-znak narz-znak--brak r-stan" style={ruch} title="Google hat keine AI Overview angezeigt">-</span>;
  return stan ? <span className="narz-znak narz-znak--tak r-stan" style={ruch} aria-label="genannt">✓</span> : <span className="narz-znak narz-znak--nie r-stan" style={ruch} aria-label="nicht genannt">✕</span>;
}

function kolorOceny(w) {
  if (w >= 80) return 'dobra';
  if (w >= 50) return 'srednia';
  return 'slaba';
}

/** Ring mit dem Wert 0 bis 100 (SVG), Beschriftung für Screenreader auf Deutsch. */
function Ocena({ wynik, podpis }) {
  const r = 52;
  const obwod = 2 * Math.PI * r;
  const w = Math.max(0, Math.min(100, Number(wynik) || 0));
  return (
    <div className={`narz-ocena narz-ocena--${kolorOceny(w)}`} role="img" aria-label={`${podpis ? `${podpis}: ` : ''}${w} von 100`}>
      <svg viewBox="0 0 120 120" aria-hidden="true" focusable="false">
        <circle cx="60" cy="60" r={r} className="narz-ocena-tlo" />
        <circle cx="60" cy="60" r={r} className="narz-ocena-luk" strokeDasharray={obwod} strokeDashoffset={obwod * (1 - w / 100)} />
      </svg>
      <span className="narz-ocena-liczba" aria-hidden="true" style={{ '--cel': w }}>{w}</span>
      {podpis && <span className="narz-ocena-podpis" aria-hidden="true">{podpis}</span>}
    </div>
  );
}

/** E-Mail-Schranke (Entwurf des Zustimmungstextes: Prüfung durch Rechtsanwalt). Ohne Newsletter-Feld. */
function Schranke({ id, naglowek, opis, korzysci, przycisk, onOdblokowano }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null });
  const ref = useRef(null);
  const widziana = useRef(false);
  const potwRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return undefined;
    const io = new IntersectionObserver((w) => {
      if (w.some((x) => x.isIntersecting) && !widziana.current) {
        widziana.current = true;
        track('narzedzie_bramka', { narzedzie: 'widocznosc_ai' });
      }
    }, { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      narzedzie: 'widocznosc_ai',
      ...(id ? { id } : {}),
      email: String(fd.get('email') || ''),
      zgodaWynik: fd.get('zgodaWynik') === 'on',
      newsletter: false,
      nick: String(fd.get('nick') || ''),
      lang: 'de',
    };
    setStan((x) => ({ status: 'loading', blad: x.blad })); // tekst poprzedniego błędu zostaje na czas zwijania
    const r = await odblokuj(body);
    if (!r.ok) return setStan({ status: 'error', blad: r.blad });
    track('generate_lead', { lead_source: 'tool_gate', event_category: 'Narzędzia', plan: 'widocznosc_ai', currency: 'EUR', value: 12 });
    setStan({ status: 'done', blad: null, mailOk: r.mailOk }); // mailOk === false: Bericht nicht versendet
    return onOdblokowano?.(r.pelny, r.newsletter, r.mailOk);
  }

  const gotowe = stan.status === 'done';
  // Po wysłaniu fokus idzie na potwierdzenie (formularz traci przycisk, bez tego fokus ląduje na BODY).
  useEffect(() => { if (gotowe) potwRef.current?.focus({ preventScroll: true }); }, [gotowe]);

  return (
    <>
    <Zwin otwarte={!gotowe} wejscie={false}>
    <form ref={ref} className="narz-bramka" onSubmit={wyslij} aria-labelledby="bramka-widocznosc-ai-de">
      <div className="narz-bramka-glowa">
        <span className="narz-bramka-ikona" aria-hidden="true">
          <svg viewBox="0 0 24 24"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V8a4 4 0 0 1 8 0v3" /></svg>
        </span>
        <div>
          <p id="bramka-widocznosc-ai-de" className="narz-bramka-tytul">{naglowek}</p>
          {opis && <p className="narz-bramka-opis">{opis}</p>}
        </div>
      </div>
      {korzysci.length > 0 && <ul className="narz-bramka-korzysci">{korzysci.map((k) => <li key={k}>{k}</li>)}</ul>}
      <div className="narz-bramka-wiersz">
        <label htmlFor="email-widocznosc-ai-de" className="sr-only">E-Mail-Adresse</label>
        <input id="email-widocznosc-ai-de" name="email" type="email" required maxLength={200} autoComplete="email" inputMode="email" placeholder="ihre@email.de" className="narz-pole" />
        <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="narzedzie_widocznosc_ai_odblokuj">
          {stan.status === 'loading' ? 'Wird gesendet …' : przycisk}
        </button>
      </div>
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
      <label className="narz-zgoda">
        <input type="checkbox" name="zgodaWynik" required />
        <span lang="de">
          Bitte senden Sie mir dieses Ergebnis per E-Mail. Verantwortlicher: AI SIGNALS COMPANY P.S.A. ({SIEDZIBA.ulica}, Warschau, Polen). Wir verwenden Ihre Daten, um das Ergebnis zu senden und Ihre Fragen zu beantworten, und löschen sie nach 60 Tagen. Empfänger: E-Mail-Dienstleister (Resend) und Anbieter von KI-Modellen (DataForSEO, Anthropic). Einzelheiten in der <Link href="/cookies">Datenschutzerklärung</Link>.
        </span>
      </label>
      <p className="narz-bramka-mikro">Der Bericht erreicht Ihren Posteingang innerhalb einer Minute. Das vollständige Ergebnis sehen Sie außerdem sofort hier.</p>
      <Zwin otwarte={stan.status === 'error'}><p role="alert" className="narz-blad">{stan.blad}</p></Zwin>
    </form>
    </Zwin>
    {gotowe && (
      <div className="narz-bramka narz-bramka--gotowe r-stan" role="status" ref={potwRef} tabIndex={-1}>
        <p className="narz-bramka-tytul">{tekstPotwierdzenia({ lang: 'de', mailOk: stan.mailOk }).tytul}</p>
      </div>
    )}
    </>
  );
}

function PruefTool() {
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null });
  const [wstepne, setWstepne] = useState({});
  const [kraj, setKraj] = useState('DE');
  const [krajReczny, setKrajReczny] = useState(false);
  const [propozycje, setPropozycje] = useState(null);
  const [edycje, setEdycje] = useState(['', '', '']);
  const [bledyPytan, setBledyPytan] = useState([null, null, null]);
  const [mapaDemo, setMapaDemo] = useState(null);
  const formRef = useRef(null);
  const pelnyRef = useRef(null);
  const pytaniaRef = useRef(null);

  // Po odblokowaniu przewijamy do początku pełnych odpowiedzi (smooth tylko bez reduce).
  useEffect(() => {
    if (stan.pelny) pelnyRef.current?.scrollIntoView({ block: 'start', behavior: zachowaniePrzewijania() });
  }, [stan.pelny]);

  // ?firma=, ?branza=, ?miasto=, ?url=, ?kraj= füllen nur die Felder aus (kein Start: Limit pro IP und API-Kosten).
  useParametrUrl(['firma', 'marka', 'branza', 'miasto', 'url', 'kraj'], (w) => {
    const pola = { firma: w.firma ?? w.marka, branza: w.branza, miasto: w.miasto, www: w.url };
    const f = formRef.current;
    for (const [k, v] of Object.entries(pola)) if (v && f?.elements[k]) f.elements[k].value = v.slice(0, Number(f.elements[k].maxLength) > 0 ? Number(f.elements[k].maxLength) : 200);
    const kParam = String(w.kraj || '').toUpperCase();
    if (['DE', 'AT', 'CH'].includes(kParam)) {
      setKraj(kParam);
      setKrajReczny(true);
    } else if (w.url) {
      const auto = krajZDomenyDe(w.url);
      if (auto) setKraj(auto);
    }
  });

  useEffect(() => {
    if (DEMO || typeof window === 'undefined') return undefined;
    const wynikId = new URLSearchParams(window.location.search).get('wynik')?.trim();
    if (!wynikId || !/^[a-zA-Z0-9_-]{6,120}$/.test(wynikId)) return undefined;
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynikId)}`, { signal: ctrl.signal });
        const data = await res.json().catch(() => ({}));
        if (!res.ok || !data.ok || !data.podglad) return;
        if (data.tool && data.tool !== 'widocznosc_ai') return;
        const id = data.id || wynikId;
        const pelny = odczytajOdblokowane(id);
        const pUrl = new URLSearchParams(window.location.search);
        const dane = {
          firma: data.podglad.firma || pUrl.get('firma') || null,
          branza: data.podglad.branza || pUrl.get('branza') || null,
          miasto: data.podglad.miasto || pUrl.get('miasto') || null,
          url: pUrl.get('url') || null,
          ...(data.podglad.kraj || pUrl.get('kraj') ? { kraj: String(data.podglad.kraj || pUrl.get('kraj')).toUpperCase() } : {}),
        };
        setStan((x) => (x.status === 'idle' ? {
          status: 'done',
          blad: null,
          id,
          podglad: data.podglad,
          pelny,
          dane,
        } : x));
      } catch {
        // Fehler beim Laden des geteilten Ergebnisses ignorieren
      }
    })();
    return () => ctrl.abort();
  }, []);

  function onWwwZmiana(e) {
    if (krajReczny) return;
    const auto = krajZDomenyDe(e.target.value);
    if (auto) setKraj(auto);
  }

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const wybranyKraj = String(fd.get('kraj') || kraj || 'DE').toUpperCase();
    const body = { firma: String(fd.get('firma') || ''), branza: String(fd.get('branza') || ''), miasto: String(fd.get('miasto') || ''), www: String(fd.get('www') || ''), nick: String(fd.get('nick') || ''), lang: 'de', kraj: wybranyKraj };
    setWstepne({ firma: body.firma, branza: body.branza, miasto: body.miasto, www: body.www });
    setStan({ status: 'pytania', blad: null, id: null, podglad: null, pelny: null, dane: null });
    const r = await pobierzPytania(body);
    if (r.ok) {
      setPropozycje({ body, pytania: r.pytania, zrodloPytan: r.zrodloPytan ?? ['szablon', 'szablon', 'szablon'] });
      setEdycje([...r.pytania]);
      setBledyPytan([null, null, null]);
      setStan((x) => ({ ...x, status: 'idle' }));
      track('ai_check_questions', { city: body.miasto, country: wybranyKraj });
      return;
    }
    if (r.blad && [400, 429, 503].includes(r.status)) return setStan((x) => ({ ...x, status: 'error', blad: r.blad }));
    return uruchom(body, null);
  }

  async function uruchom(body, wlasne) {
    const dane = { firma: body.firma.trim(), branza: body.branza.trim(), miasto: body.miasto.trim() || null, url: body.www.trim() || null, kraj: body.kraj || 'DE' };
    zapiszParametry({ ...dane, wynik: null });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, dane });
    const ileZmienionych = wlasne ? wlasne.filter(Boolean).length : 0;
    track('ai_check_start', { city: body.miasto, country: body.kraj, edited_questions: ileZmienionych });
    let r = await wywolajNarzedzie('widocznosc_ai', ileZmienionych ? { ...body, pytania: wlasne } : body, 295_000);
    if (!r.ok) return setStan((x) => ({ ...x, status: 'error', blad: r.blad }));
    if (r.id && !DEMO) zapiszParametry({ ...dane, wynik: r.id });
    if (DEMO && propozycje) {
      const pokazane = edycje.map(zwin);
      const mapa = new Map(r.podglad.pytania.map((q, i) => [q, pokazane[i]]));
      setMapaDemo(mapa);
      r = { ...r, podglad: { ...demoZPytaniami(r.podglad, mapa), zrodloPytan: pokazane.map((_, i) => (wlasne?.[i] ? 'uzytkownik' : 'szablon')), uwagiPytan: [] } };
    }
    track('narzedzie_wynik', { narzedzie: 'widocznosc_ai', wynik: r.podglad.wynik });
    return setStan((x) => ({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: odczytajOdblokowane(r.id), dane: x.dane }));
  }

  function zadajPytania(e) {
    e.preventDefault();
    const bledy = edycje.map((_, i) => bladPytania(edycje, i, propozycje.body));
    setBledyPytan(bledy);
    const pierwszy = bledy.findIndex(Boolean);
    if (pierwszy >= 0) return pytaniaRef.current?.elements[`pytanie-${pierwszy}`]?.focus();
    const wlasne = edycje.map((q, i) => (zwin(q) === propozycje.pytania[i] ? null : zwin(q)));
    return uruchom(propozycje.body, wlasne);
  }

  function zmienPytanie(i, tekst) {
    setEdycje((l) => l.map((q, j) => (j === i ? tekst : q)));
    if (bledyPytan[i]) setBledyPytan((b) => b.map((x, j) => (j === i ? null : x)));
  }

  const resetuj = () => {
    zapiszParametry({ wynik: null });
    setPropozycje(null);
    setMapaDemo(null);
    setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null });
  };

  const p = stan.podglad;
  const wzorce = wzorceMarki(stan.pelny?.firma || p?.firma || stan.dane?.firma || wstepne.firma, stan.dane?.url || wstepne.www);
  const etykieta = (id) => p?.silniki.find((x) => x.id === id)?.etykieta ?? id;
  const top = (p?.konkurenciTop ?? []).slice(0, W.przedBramka.firm);
  const topZr = (p?.zrodlaTop ?? []).slice(0, W.przedBramka.domen);
  const resztaFirm = Math.max(0, (p?.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p?.zrodel ?? 0) - topZr.length);
  const zmienionePytania = (p?.zrodloPytan ?? []).filter((z) => z === 'uzytkownik').length;
  const uwagiPytan = Array.isArray(p?.uwagiPytan) ? p.uwagiPytan : [];

  return (
    <div className="narz-app" id="narzedzie" style={{ marginTop: '1.25rem' }}>
      {DEMO && <p className="narz-demo" role="note">Demo-Modus: Beispieldaten, keine Verbindung zum Panel.</p>}
      {stan.status !== 'done' && !propozycje && (
        <form ref={formRef} className="narz-formularz narz-siatka-formularza" onSubmit={start} style={{ columnGap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label htmlFor="ai-firma" className="narz-etykieta">Firmenname</label>
            <input id="ai-firma" name="firma" required minLength={2} maxLength={100} defaultValue={wstepne.firma} placeholder="z. B. Schreinerei Müller" className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-branza" className="narz-etykieta">Branche oder Leistung</label>
            <input id="ai-branza" name="branza" required minLength={2} maxLength={60} defaultValue={wstepne.branza} placeholder="z. B. Schreiner" className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-miasto" className="narz-etykieta">Stadt <span style={OPCJONALNIE}>(optional)</span></label>
            <input id="ai-miasto" name="miasto" maxLength={60} defaultValue={wstepne.miasto} placeholder={kraj === 'AT' ? 'z. B. Wien' : kraj === 'CH' ? 'z. B. Zürich' : 'z. B. München'} className="narz-pole" aria-describedby="ai-miasto-opis" />
          </div>
          <div>
            <label htmlFor="ai-www" className="narz-etykieta">Website <span style={OPCJONALNIE}>(optional)</span></label>
            <input id="ai-www" name="www" maxLength={200} defaultValue={wstepne.www} onChange={onWwwZmiana} placeholder={kraj === 'AT' ? 'z. B. firma.at' : kraj === 'CH' ? 'z. B. firma.ch' : 'z. B. firma.de'} className="narz-pole" inputMode="url" aria-describedby="ai-www-opis" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="ai-kraj" className="narz-etykieta">Land / Zielmarkt</label>
            <select
              id="ai-kraj"
              name="kraj"
              value={kraj}
              onChange={(e) => { setKraj(e.target.value); setKrajReczny(true); }}
              className="narz-pole"
            >
              {KRAJE_DE.map(([kod, nazwa]) => (
                <option key={kod} value={kod}>{nazwa}</option>
              ))}
            </select>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading' || stan.status === 'pytania'} aria-busy={stan.status === 'loading' || stan.status === 'pytania' ? 'true' : undefined} data-cta="ai_check_submit">
              {stan.status === 'loading' ? 'Wir fragen die KI-Modelle … (bis 2 Min.)' : stan.status === 'pytania' ? 'Fragen werden formuliert …' : 'KI-Sichtbarkeit kostenlos prüfen'}
            </button>
          </div>
          <p className="narz-mikro">{liniaNaZywo(kraj)}</p>
          <p className="narz-mikro">
            Zuerst sehen Sie die 3 Fragen, die wir stellen, und können jede ändern.{' '}
            <span id="ai-miasto-opis">{`Ohne Stadt fragen wir für ${kraj === 'CH' ? 'die ganze Schweiz' : `ganz ${FUER_KRAJ_DE[kraj] || 'Deutschland'}`}. `}</span>
            <span id="ai-www-opis">Aus Titel und Beschreibung der angegebenen Website versuchen wir, eine der 3 Fragen zu formulieren.</span>
          </p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status !== 'done' && propozycje && (
        <form ref={pytaniaRef} className="narz-formularz r-stan" onSubmit={zadajPytania} noValidate aria-labelledby="ai-pytania-tytul">
          <div>
            <h2 id="ai-pytania-tytul" className="narz-h2" style={{ marginTop: 0 }}>Diese 3 Fragen stellen wir den KI-Modellen</h2>
            <p className="narz-mikro" style={{ marginTop: 0 }}>
              <strong style={{ color: 'var(--w-tusz)' }}>{propozycje.body.firma.trim()}</strong>
              {` · ${propozycje.body.branza.trim()}${propozycje.body.miasto.trim() ? ` · ${propozycje.body.miasto.trim()}` : ''}${propozycje.body.kraj ? ` · ${propozycje.body.kraj}` : ''}${propozycje.body.www.trim() ? ` · ${propozycje.body.www.trim()}` : ''} `}
              <button type="button" className="narz-link" onClick={() => { setPropozycje(null); setStan((x) => ({ ...x, status: 'idle', blad: null })); }} disabled={stan.status === 'loading'}>Angaben ändern</button>
            </p>
            <p className="narz-mikro">Sie können jede Frage ändern, etwa um eine Leistung oder einen Stadtteil zu ergänzen oder so zu fragen, wie Ihre Kunden wirklich fragen. Geben Sie weder Ihren Firmennamen noch die Adresse Ihrer Website ein: Das Modell würde sie in der Antwort wiederholen, und das Ergebnis wäre aufgebläht.</p>
          </div>
          {edycje.map((q, i) => {
            const zmienione = zwin(q) !== propozycje.pytania[i];
            const zrodlo = zmienione ? 'uzytkownik' : propozycje.zrodloPytan[i] ?? 'szablon';
            const dlugosc = zwin(q).length;
            const idOpis = `ai-pytanie-${i}-opis`;
            return (
              <div key={i} className="r-stan" style={{ '--i': i + 1 }}>
                <label htmlFor={`ai-pytanie-${i}`} className="narz-etykieta">
                  Frage {i + 1} <span style={OPCJONALNIE}>({ETYKIETA_ZRODLA[zrodlo]})</span>
                </label>
                <textarea
                  id={`ai-pytanie-${i}`}
                  name={`pytanie-${i}`}
                  rows={3}
                  maxLength={PYTANIE.max + 50}
                  value={q}
                  onChange={(e) => zmienPytanie(i, e.target.value)}
                  readOnly={stan.status === 'loading'}
                  aria-invalid={bledyPytan[i] ? 'true' : undefined}
                  aria-describedby={idOpis}
                  className="narz-pole c-pole"
                  style={{ resize: 'vertical', lineHeight: 1.45, fieldSizing: 'content', minHeight: '4.5rem' }}
                />
                <div id={idOpis} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem 1rem' }}>
                  {bledyPytan[i] ? <p className="narz-blad" role="alert" style={{ margin: '0.25rem 0 0' }}>{bledyPytan[i]}</p> : <span />}
                  <span className="narz-mikro" style={{ display: 'inline-flex', gap: '1rem', alignItems: 'baseline', color: dlugosc > PYTANIE.max ? 'var(--n-zle)' : undefined }}>
                    {zmienione && <button type="button" className="narz-link" disabled={stan.status === 'loading'} onClick={() => zmienPytanie(i, propozycje.pytania[i])}>Vorschlag wiederherstellen</button>}
                    <span aria-label={`${dlugosc} von ${PYTANIE.max} Zeichen`}>{dlugosc}/{PYTANIE.max}</span>
                  </span>
                </div>
              </div>
            );
          })}
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="ai_check_run">
              {stan.status === 'loading' ? 'Wir fragen die KI-Modelle … (bis 2 Min.)' : 'Diese Fragen stellen'}
            </button>
          </div>
          <p className="narz-mikro">Jede Frage geht einmal an jede Engine ({listeEngines()}). Das Ändern der Fragen verbraucht keinen zusätzlichen Check.</p>
          {stan.status === 'loading' && <Postep kroki={KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={p.wynik} podpis="KI-Sichtbarkeit" />
            <div>
              <p className="narz-wynik-domena">{p.firma}</p>
              <p className="narz-wynik-opis">Ihr Unternehmen erscheint in <strong>{p.wzmianki} von {p.odpowiedzi}</strong> KI-Antworten auf Kundenfragen aus der Branche „{p.branza}“{p.miasto ? ` (${p.miasto})` : ''}.</p>
              {p.uwagaNazwy && <p className="narz-mikro" role="note">{p.uwagaNazwy}</p>}
              {p.zastrzezenie && <p className="narz-mikro">{p.zastrzezenie}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.25rem' }}>
                <button type="button" className="narz-link" onClick={resetuj}>Anderes Unternehmen prüfen</button>
                {(stan.dane || stan.id) && (
                  <LinkWyniku
                    narzedzie="widocznosc_ai"
                    tryb={stan.id ? 'wynik' : 'wypelnij'}
                    parametry={{ ...(stan.dane ?? { firma: p.firma, branza: p.branza, miasto: p.miasto || null }), ...(stan.id ? { wynik: stan.id } : {}) }}
                    tekst="Link zu diesem Check kopieren"
                    podsumowanie={`KI-Sichtbarkeit für ${p.firma}: ${p.wzmianki}/${p.odpowiedzi} Antworten (${p.wynik}/100)`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="narz-tabela-wrap">
            <table className="narz-tabela">
              <caption className="sr-only">Ob das Unternehmen in den Antworten der einzelnen KI-Engines genannt wird</caption>
              <thead>
                <tr><th scope="col">Engine</th>{p.pytania.map((q, i) => <th key={q} scope="col" title={q}>Frage {i + 1}</th>)}<th scope="col">Ergebnis</th></tr>
              </thead>
              <tbody>
                {p.silniki.map((x) => (
                  <tr key={x.id} className={x.dostepny ? '' : 'niedostepny'}>
                    <th scope="row"><span className="narz-silnik">{x.etykieta}</span><span className="narz-mikro">{x.opis}{x.dostepny && x.wyszukiwanie === false && !/wyszukiwania|web search|Websuche/i.test(x.opis) ? ' · ohne Websuche' : ''}</span></th>
                    {x.dostepny
                      ? p.pytania.map((q, qi) => {
                        const c = p.siatka.find((g) => g.silnik === x.id && g.pytanie === q);
                        return <td key={q}>{c ? <Znak stan={c.brakOdpowiedzi ? 'brak' : c.wymieniona} i={qi} /> : '-'}</td>;
                      })
                      : <td colSpan={p.pytania.length} className="narz-mikro">{x.powod}</td>}
                    <td>{x.dostepny ? `${x.wzmianki}/${x.odpowiedzi}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="narz-pytania" open={zmienionePytania > 0 || uwagiPytan.length > 0}>
            <summary>Welche Fragen wir gestellt haben{zmienionePytania > 0 && ` (von Ihnen geändert: ${zmienionePytania})`}</summary>
            <ol>{p.pytania.map((q, i) => (
              <li key={q}>
                {q}
                {p.zrodloPytan?.[i] === 'strona' && <span className="narz-mikro"> (aus dem Inhalt Ihrer Website)</span>}
                {p.zrodloPytan?.[i] === 'uzytkownik' && <span className="narz-mikro"> (Ihre Frage)</span>}
                {uwagiPytan.filter((u) => u.nr === i + 1).map((u) => <span key={u.zmiana} className="narz-mikro" role="note" style={{ display: 'block' }}>{u.powod}</span>)}
              </li>
            ))}</ol>
          </details>

          {!stan.pelny && (top.length > 0 || topZr.length > 0) && (
            <div key="top" className="narz-pelne-ai">
              {top.length > 0 && (
                <div role="region" aria-labelledby="ai-top-firmy">
                  <h2 id="ai-top-firmy" className="narz-h2">Wen die Modelle am häufigsten nennen</h2>
                  <ul className="narz-chipy">{top.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                  <p className="narz-mikro">
                    Das ist Ihre Konkurrenz in KI-Antworten, auch wenn Sie sie in Google nicht sehen.
                    {resztaFirm > 0 && ` Dazu ${resztaFirm} weitere${resztaFirm === 1 ? 's Unternehmen' : ' Unternehmen'} nach Eingabe Ihrer E-Mail.`}
                  </p>
                </div>
              )}
              {topZr.length > 0 && (
                <div role="region" aria-labelledby="ai-top-zrodla">
                  <h2 id="ai-top-zrodla" className="narz-h2">Am häufigsten zitierte Seiten</h2>
                  <ul className="narz-chipy">{topZr.map((z) => <li key={z.domena}>{z.domena} <span>×{z.ile}</span></li>)}</ul>
                  <p className="narz-mikro">
                    Eine Erwähnung Ihres Unternehmens auf diesen Seiten erhöht die Chance, dass ein Modell es empfiehlt.
                    {resztaZrodel > 0 && ` Dazu ${resztaZrodel} weitere ${resztaZrodel === 1 ? 'Seite' : 'Seiten'} nach Eingabe Ihrer E-Mail.`}
                  </p>
                </div>
              )}
            </div>
          )}

          {!stan.pelny ? (
            <div key="bramka" className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone wid-atrapa" aria-hidden="true">
                {Array.from({ length: Math.min(12, Math.max(3, Number(p.odpowiedzi) || 3)) }, (_, i) => i + 1).map((i) => (
                  <li key={i} className="narz-problem"><p className="narz-problem-tytul narz-atrapa">Wen das Modell statt Ihres Unternehmens empfiehlt</p><p className="narz-problem-opis narz-atrapa">Ein Ausschnitt der Antwort und die Seiten, auf die sich die KI beruft</p></li>
                ))}
              </ul>
              <Schranke
                id={stan.id}
                naglowek="Alle Antworten und Quellen ansehen"
                opis={opisBramki(p, top, topZr)}
                korzysci={[`Vollständige Antworten: ${listeEngines()}`, p.wzmianki > 0 ? 'Der Ausschnitt, in dem Ihr Unternehmen genannt wird, und die Quellen jeder Antwort' : 'Ausschnitte der Antworten und die Quellen jeder Antwort', 'Alle Unternehmen und Seiten, die die Modelle zitieren, plus der Bericht per E-Mail']}
                przycisk="KI-Antworten anzeigen"
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const gotowyPelny = DEMO && mapaDemo ? demoZPytaniami(pelny, mapaDemo) : pelny;
                  zapiszOdblokowane(stan.id, gotowyPelny);
                  setStan((x) => ({ ...x, pelny: gotowyPelny, mailOk }));
                }}
              />
            </div>
          ) : (
            <div key="pelny" ref={pelnyRef} className="narz-pelne-ai c-skok">
              <div className="narz-bramka narz-bramka--gotowe r-stan" role="status">
                <p className="narz-bramka-tytul">{tekstPotwierdzenia({ lang: 'de', mailOk: stan.mailOk }).tytul}</p>
              </div>
              {stan.pelny.konkurenci?.length > 0 && (
                <div role="region" aria-labelledby="ai-konkurenci">
                  <h2 id="ai-konkurenci" className="narz-h2">Wen die Modelle nennen</h2>
                  <ul className="narz-chipy">{stan.pelny.konkurenci.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                </div>
              )}
              {stan.pelny.zrodla?.length > 0 && (
                <div role="region" aria-labelledby="ai-zrodla">
                  <h2 id="ai-zrodla" className="narz-h2">Auf welche Seiten sie sich stützen</h2>
                  <ul className="narz-chipy">{stan.pelny.zrodla.map((z) => <li key={z.domena}>{z.domena} <span>×{z.ile}</span></li>)}</ul>
                  <p className="narz-mikro">Eine Erwähnung Ihres Unternehmens auf diesen Seiten erhöht die Chance, dass ein Modell es empfiehlt.</p>
                </div>
              )}
              <h2 className="narz-h2">Antworten</h2>
              <ul className="narz-problemy">
                {stan.pelny.wiersze.filter((r) => !r.brakOdpowiedzi).map((r) => {
                  const pelnyTekst = String(r.odpowiedz || '');
                  const maWiecej = Boolean(pelnyTekst) && (Boolean(r.fragment && pelnyTekst.trim() !== r.fragment.trim()) || pelnyTekst.length > 600);
                  const skrot = r.fragment
                    ? <>„{podswietlMarke(r.fragment, wzorce)}“</>
                    : <>{podswietlMarke(pelnyTekst.slice(0, 600), wzorce)}{pelnyTekst.length > 600 ? '…' : ''}</>;
                  return (
                    <li key={`${r.silnik}-${r.pytanie}`} className={`narz-problem ${r.wymieniona ? 'narz-problem--ok' : 'narz-problem--blad'}`}>
                      <p className="narz-problem-meta"><span className="narz-waga">{etykieta(r.silnik)}</span> · {r.wymieniona ? 'Unternehmen genannt' : 'Unternehmen nicht genannt'}</p>
                      <h3 className="narz-problem-tytul">{r.pytanie}</h3>
                      <p className="narz-problem-opis">{skrot}</p>
                      {maWiecej && (
                        <details className="narz-problem-strony" style={{ marginTop: '0.5rem' }}>
                          <summary>Vollständige Antwort anzeigen</summary>
                          <div className="narz-problem-opis" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                            {podswietlMarke(pelnyTekst, wzorce)}
                          </div>
                        </details>
                      )}
                      {r.zrodla.length > 0 && <p className="narz-mikro">Quellen: {r.zrodla.join(', ')}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <p className="narz-mikro">Die Antworten stammen aus den APIs der Modelle und können von dem abweichen, was jemand in der App sieht. Sie ändern sich von Tag zu Tag.</p>
        </div>
      )}
    </div>
  );
}

const card = s.karta;
const kartaListy = { ...card, margin: 0, paddingLeft: 'clamp(2.5rem, 6vw, 3.5rem)', display: 'grid', gap: '1rem', lineHeight: 1.6, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' };
const URL_SEITE = 'https://www.ai-seo-company.pl/de/ki-sichtbarkeit-pruefen';

export default function KiSichtbarkeitPruefenDe() {
  const reg = STRONY_DE[SCHLUESSEL];
  const audit = hrefDe('/pozycjonowanie-w-ai');
  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl="KI-Sichtbarkeit prüfen" en="KI-Sichtbarkeit prüfen" de="KI-Sichtbarkeit prüfen" />

      <section className={st.hero} style={{ paddingTop: 'clamp(112px, 12vw, 152px)', paddingBottom: '80px' }}>
        <Ozdoba rodzaj="ai" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1.25rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {KOPF.tag}
            </div>
            <h1 lang="de" style={{ ...s.h1, hyphens: 'auto', overflowWrap: 'break-word' }}>{reg.h1}</h1>
            <p lang="de" className={st.lead} style={s.lead}>{KOPF.lead}</p>
          </div>

          <PruefTool />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurz gesagt"><p lang="de" style={{ margin: 0 }}>{KOPF.kurz}</p></AnswerBox>
          </div>

          <div style={{ ...card, marginTop: '2rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
            <p lang="de" style={{ margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>{KOPF.angebot}</p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              {audit
                ? <Link href="/pozycjonowanie-w-ai" className="btn btn-primary" data-cta="ai_check_offer">{KOPF.angebotKnopf}</Link>
                : <a href="#kontakt" className="btn btn-primary" data-cta="ai_check_offer">{KOPF.angebotKnopf}</a>}
            </div>
          </div>
          <BylineDe stand={STAND} style={{ margin: '1rem 0 0' }} />

          <div className={st.tresc} id="nw-tresc"><div className={st.trescGlowna}>
            <CoDostajesz
              locale="de"
              id="ac-gratis"
              tytul={ODER_NACH_EMAIL.titel}
              tytulOdRazu={ODER_NACH_EMAIL.tOhne}
              tytulPoEmailu={ODER_NACH_EMAIL.tMit}
              odRazu={ODER_NACH_EMAIL.ohne}
              poEmailu={ODER_NACH_EMAIL.mit}
            >
              <p lang="de" style={s.akapit}>{ODER_NACH_EMAIL.wasTun}</p>
            </CoDostajesz>

            <Sekcja id="ac-ablauf" tytul={SCHRITTE.titel}>
              <ol lang="de" style={kartaListy}>
                {SCHRITTE.schritte.map(([h, t]) => (
                  <li key={h}><strong style={{ color: 'var(--color-text-dark)' }}>{h}.</strong> {t}</li>
                ))}
              </ol>
            </Sekcja>

            <Sekcja id="ac-methode" tytul={METHODE.titel}>
              <p lang="de" style={s.akapit}>{METHODE.einleitung}</p>
              <CompareTable id="ac-tabelle-methoden" caption={METHODE.caption} columns={METHODE.spalten} rows={METHODE.zeilen} />
              <h3 id="grenzen" style={{ ...s.h3, marginTop: 0 }}>{METHODE.grenzenTitel}</h3>
              <ul lang="de" style={s.lista}>
                {METHODE.grenzen.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Sekcja>

            <Sekcja id="ac-ergebnis" tytul={LESEN.titel}>
              <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))' }}>
                {LESEN.stufen.map(([h, t]) => (
                  <div key={h} style={{ ...card, padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.6rem', fontWeight: 600, margin: '0 0 0.5rem', color: 'var(--color-text-dark)' }}>{h}</h3>
                    <p lang="de" style={{ margin: 0, lineHeight: 1.6, color: 'var(--color-text-main)', hyphens: 'auto', overflowWrap: 'break-word' }}>{t}</p>
                  </div>
                ))}
              </div>
            </Sekcja>

            <Sekcja id="ac-wie-weiter" tytul={WEITER.titel}>
              <ul lang="de" style={{ ...kartaListy, gap: '0.85rem' }}>
                {WEITER.punkte.map((t, i) => {
                  const l = WEITER_LINKS.find(([idx, schluessel]) => idx === i && maWersjeDe(schluessel));
                  return (
                    <li key={t}>
                      {t}
                      {l && <> {l[3]} <Link href={l[1]} style={s.podkreslenie}>{l[2]}</Link>.</>}
                    </li>
                  );
                })}
              </ul>
            </Sekcja>

            <Sekcja id="ac-quellen" tytul={QUELLEN.titel}>
              <ul lang="de" style={s.lista}>
                {QUELLEN.punkte.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </Sekcja>

            {WEITERE_TOOLS.tools.some(([k]) => maWersjeDe(k)) && (
              <Sekcja id="ac-weitere-tools" tytul={WEITERE_TOOLS.titel}>
                <ul lang="de" style={s.lista}>
                  {WEITERE_TOOLS.tools.filter(([k]) => maWersjeDe(k)).map(([k, name, beschr]) => (
                    <li key={k}><Link href={k} style={s.podkreslenie}>{name}</Link>: {beschr}</li>
                  ))}
                </ul>
              </Sekcja>
            )}
          </div></div>
        </div>
      </section>
      <AppleFaq faqData={faqFuerAppleFaq(FAQ)} title="Fragen zur KI-Sichtbarkeit" />
      <Contact />
      <WebAppSchema
        name={SCHEMA.name}
        description={SCHEMA.beschreibung}
        url={URL_SEITE}
        language="de"
        featureList={SCHEMA.features}
      />
      <Footer />
    </main>
  );
}
