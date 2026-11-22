'use client';

// Audyt widoczności w AI (/sprawdz-widocznosc-w-ai, zastępuje sprawdzarkę ChatGPT + Gemini od 9.11.2026).
// API: panel /api/narzedzia/widocznosc-ai. Przed e-mailem: ocena 0-100 i siatka „czy padła nazwa”
// dla każdego silnika i pytania. Po e-mailu: treść odpowiedzi, kogo modele polecają zamiast Ciebie
// i z jakich źródeł korzystają, oraz raport e-mailem.
// 11.11.2026: panel zwraca też metadane metody (pola opcjonalne, starszy panel ich nie ma):
// zrodloPytan (pytanie 3 z treści strony klienta), uwagaNazwy (nazwa z samych ogólnych słów),
// zastrzezenie („migawka”) i silniki[].wyszukiwanie (false = odpowiedź z wiedzy modelu).
// 12.11.2026 (S1-poprawki, agent lepsi/widocznosc):
// - Z-W9, decyzja właściciela: przed bramką 5 firm i 5 najczęściej cytowanych domen (panel: konkurenciTop,
//   zrodlaTop; same nazwy/domeny i liczby). Treść odpowiedzi, fragmenty, źródła każdej odpowiedzi,
//   pozostałe firmy i domeny oraz raport zostają za e-mailem. Starszy panel: pola puste, jak dotąd.
// - Z-W3: linia „Pytamy na żywo” pod przyciskiem, warianty ze stałych Z-00 (Grok, Gemini bez wyszukiwania).
// - Z-06: ?firma=&branza=&miasto=&url= tylko wypełnia formularz (bez startu: limit 2 na IP i koszt API);
//   po starcie dane trafiają do paska adresu, a przy wyniku jest „Kopiuj link do tego sprawdzenia”.
// - Telefon: pola w 2 kolumnach (krótkie etykiety), podpowiedź o stronie pod przyciskiem, żeby przycisk
//   był w pierwszym ekranie 390×844.
// 12.11.2026 (domknięcie wobec RightBlogger): pytania do edycji przed sprawdzeniem. Formularz pobiera
// 3 proponowane pytania (panel /api/narzedzia/widocznosc-ai/pytania, bez płatnych wywołań), klient może
// każde zmienić (10-200 znaków, bez adresu i nazwy firmy), a uruchomienie wysyła pytania[3]: tekst
// zmienionego pytania albo null (zaproponowane). Panel sprawdza je jeszcze raz i oznacza w wyniku
// (zrodloPytan „uzytkownik”, uwagiPytan). Starszy panel bez trasy /pytania: start od razu, jak dotąd.

import '@/app/ruch.css'; // tokeny i utility ruchu: tylko trasy narzędzi i szablonów (nie CSS strony głównej)
import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { WIDOCZNOSC, listaSilnikow } from '@/lib/narzedziaLiczby';
import { zachowaniePrzewijania } from '@/lib/ruch';
import BramkaEmail from './BramkaEmail';
import LinkWyniku from './LinkWyniku';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';
import './ruch-c.css';

const PYTAMY = WIDOCZNOSC.grok ? ['ChatGPT, Gemini, Perplexity, Claude and Grok', 'ChatGPT, Gemini, Perplexity, Claude i Grok'] : ['ChatGPT, Gemini, Perplexity and Claude', 'ChatGPT, Gemini, Perplexity i Claude'];
const KROKI_EN = ['Sending 3 customer questions to the AI engines', `Asking ${PYTAMY[0]}`, 'Checking Google AI Overviews', 'Looking for your business in the answers and sources'];
const KROKI = ['Wysyłamy 3 pytania klientów do silników AI', `Pytamy ${PYTAMY[1]}`, 'Sprawdzamy przegląd AI w Google', 'Szukamy Twojej firmy w odpowiedziach i źródłach'];

// Pytania klienta: te same granice co panel (PYTANIE_DLUGOSC, wzorzec adresu i ogólne człony marek
// z lib/narzedzia/widocznosc.ts i lib/dataforseo.ts). Panel sprawdza je jeszcze raz i ma ostatnie słowo.
const PYTANIE = { min: 10, max: 200 };
const ADRES = /https?:\/\/|(^|[^\p{L}\p{N}-])www\.|[\p{L}\p{N}._%+-]+@[\p{L}\p{N}-]+\.\p{L}{2,}|(^|[^\p{L}\p{N}-])[\p{L}\p{N}][\p{L}\p{N}-]*\.(pl|com|eu|net|org|io|ai|info|biz|co|uk|de|at|ch|app|dev|shop|online|store|xyz|me|tv|edu|gov|cz|sk|ua)(?![\p{L}\p{N}])/iu;
const OGOLNE = new Set(['seo', 'web', 'art', 'pro', 'net', 'com', 'app', 'www', 'firma', 'sklep', 'studio', 'agencja', 'group', 'grupa', 'polska']);
const proste = (t) => ` ${String(t || '').normalize('NFKD').replace(/\p{M}/gu, '').replace(/ł/gi, 'l').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
const zwin = (t) => String(t || '').replace(/\s+/g, ' ').trim();

const KRAJE_EN = [
  ['US', 'US - United States'],
  ['GB', 'GB - United Kingdom'],
  ['DE', 'DE - Germany'],
  ['AT', 'AT - Austria'],
  ['CH', 'CH - Switzerland'],
  ['PL', 'PL - Poland'],
];
const KRAJE_PL = [
  ['PL', 'PL - Polska'],
  ['DE', 'DE - Niemcy'],
  ['AT', 'AT - Austria'],
  ['CH', 'CH - Szwajcaria'],
  ['GB', 'GB - Wielka Brytania'],
  ['US', 'US - Stany Zjednoczone'],
];
const NAZWY_KRAJOW_EN = { US: 'the United States', GB: 'the United Kingdom', PL: 'Poland', DE: 'Germany', AT: 'Austria', CH: 'Switzerland' };
const KROTKA_NAZWA_KRAJU_EN = { US: 'United States', GB: 'United Kingdom', PL: 'Poland', DE: 'Germany', AT: 'Austria', CH: 'Switzerland' };
const NAZWY_KRAJOW_PL = {
  PL: { w: 'w Polsce', dla: 'dla Polski', cala: 'całą Polskę', krotka: 'Polska' },
  DE: { w: 'w Niemczech', dla: 'dla Niemiec', cala: 'całe Niemcy', krotka: 'Niemcy' },
  AT: { w: 'w Austrii', dla: 'dla Austrii', cala: 'całą Austrię', krotka: 'Austria' },
  CH: { w: 'w Szwajcarii', dla: 'dla Szwajcarii', cala: 'całą Szwajcarię', krotka: 'Szwajcaria' },
  GB: { w: 'w Wielkiej Brytanii', dla: 'dla Wielkiej Brytanii', cala: 'całą Wielką Brytanię', krotka: 'Wielka Brytania' },
  US: { w: 'w USA', dla: 'dla USA', cala: 'całe USA', krotka: 'USA' },
};
const WIELOCZLONOWE_TLD = /\.(com\.pl|waw\.pl|net\.pl|org\.pl|info\.pl|co\.uk|org\.uk|co\.at|or\.at|com\.de)$/i;

function bezTldDomeny(host) {
  if (!host || !host.includes('.')) return '';
  if (WIELOCZLONOWE_TLD.test(host)) return host.replace(WIELOCZLONOWE_TLD, '').replace(/\./g, ' ');
  return host.split('.').slice(0, -1).join(' ');
}

function krajZDomeny(wartosc, dozwolone) {
  const h = String(wartosc || '').trim().toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  if (!h || !h.includes('.')) return null;
  if ((h.endsWith('.co.uk') || h.endsWith('.org.uk') || h.endsWith('.uk')) && dozwolone.includes('GB')) return 'GB';
  if (h.endsWith('.pl') && dozwolone.includes('PL')) return 'PL';
  if (h.endsWith('.de') && dozwolone.includes('DE')) return 'DE';
  if ((h.endsWith('.co.at') || h.endsWith('.or.at') || h.endsWith('.at')) && dozwolone.includes('AT')) return 'AT';
  if (h.endsWith('.ch') && dozwolone.includes('CH')) return 'CH';
  if (h.endsWith('.us') && dozwolone.includes('US')) return 'US';
  return null;
}

function odczytajOdblokowane(id) {
  if (!id || typeof window === 'undefined') return null;
  try {
    const s = window.sessionStorage.getItem(`aisc_odblok_${id}`);
    if (!s) return null;
    const p = JSON.parse(s);
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
    // brak dostepu do sessionStorage
  }
}

function wzorceMarki(firma, www) {
  const zbior = new Set();
  const czystaFirma = zwin(firma);
  if (czystaFirma.length >= 2) {
    zbior.add(czystaFirma);
    const bezFormy = zwin(czystaFirma.replace(/\b(sp\.\s*z\s*o\.\s*o\.|spolka\s+z\s+o\.o\.|spółka\s+z\s+o\.o\.|s\.a\.|p\.s\.a\.|ltd\.?|limited|llc|inc\.?|corp\.?|gmbh|ug|ag|kg)\b/gi, ''));
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
  const s = String(tekst || '');
  if (!s || !wzorce?.length) return s;
  const esc = wzorce.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
  if (!esc) return s;
  const re = new RegExp(`(${esc})`, 'gi');
  const czesci = s.split(re);
  if (czesci.length <= 1) return s;
  return czesci.map((czesc, idx) => (idx % 2 === 1
    ? <mark key={idx} style={{ background: 'rgba(216, 90, 48, 0.18)', color: 'inherit', padding: '0.05em 0.2em', borderRadius: '4px' }}>{czesc}</mark>
    : czesc));
}

function bladPytania(lista, i, dane, en) {
  const t = zwin(lista[i]);
  if (t.length < PYTANIE.min || t.length > PYTANIE.max) return en ? `A question must be ${PYTANIE.min} to ${PYTANIE.max} characters long.` : `Pytanie musi mieć od ${PYTANIE.min} do ${PYTANIE.max} znaków.`;
  if (ADRES.test(t)) return en ? 'Remove the website or email address.' : 'Usuń adres strony albo e-mail.';
  const n = proste(t);
  const host = String(dane.www || '').toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  const marki = [proste(dane.firma), host.includes('.') ? proste(bezTldDomeny(host)) : ''].map((m) => m.trim()).filter((m) => m.replace(/ /g, '').length >= 3 && !OGOLNE.has(m));
  if (marki.some((m) => n.includes(` ${m} `))) return en ? 'Remove your business name or domain: the model would repeat it in the answer and inflate the score.' : 'Usuń nazwę firmy albo jej domenę: model powtórzyłby ją w odpowiedzi i zawyżył wynik.';
  if (lista.some((x, j) => j < i && proste(x) === n)) return en ? 'The same question is already above.' : 'To samo pytanie jest już wyżej.';
  return null;
}

// Tryb demo (bez panelu): te same szablony co panel (lib/narzedzia/widocznosc.ts: pytania()), bez pytania ze strony.
function pytaniaDemo(branza, miasto, en, kraj = 'PL') {
  if (en) {
    const krajNazwa = NAZWY_KRAJOW_EN[kraj] || 'the United States';
    const krajKrotko = KROTKA_NAZWA_KRAJU_EN[kraj] || 'United States';
    const where = miasto ? `in ${miasto}` : `in ${krajNazwa}`;
    return [`Which company in the “${branza}” industry do you recommend ${where}? Name a few.`, `Who is the best in the “${branza}” industry ${where}?`, `I'm looking for: ${branza}${miasto ? `, ${miasto}` : `, ${krajKrotko}`}. Which company should I choose and why?`];
  }
  const kPl = NAZWY_KRAJOW_PL[kraj] || NAZWY_KRAJOW_PL.PL;
  const gdzie = miasto ? `w mieście ${miasto}` : kPl.w;
  return [`Jaką firmę z branży „${branza}” polecasz ${gdzie}? Podaj kilka nazw.`, `Kto jest najlepszy w branży „${branza}” ${gdzie}?`, `Szukam: ${branza}${miasto ? `, ${miasto}` : `, ${kPl.krotka}`}. Którą firmę wybrać i dlaczego?`];
}

// Tryb demo: odpowiedzi z lib/narzedziaDemo.js mają stałe pytania, więc podstawiamy te z edytora (tylko podgląd lokalny).
function demoZPytaniami(obiekt, mapa) {
  if (!obiekt) return obiekt;
  const zamien = (q) => mapa.get(q) ?? q;
  return { ...obiekt, ...(obiekt.pytania ? { pytania: obiekt.pytania.map(zamien) } : {}), ...(obiekt.siatka ? { siatka: obiekt.siatka.map((s) => ({ ...s, pytanie: zamien(s.pytanie) })) } : {}), ...(obiekt.wiersze ? { wiersze: obiekt.wiersze.map((w) => ({ ...w, pytanie: zamien(w.pytanie) })) } : {}) };
}

/** 3 proponowane pytania z panelu. { ok, pytania, zrodloPytan } albo { ok: false, status, blad }. */
async function pobierzPytania(body) {
  if (DEMO) {
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true, pytania: pytaniaDemo(body.branza.trim(), body.miasto.trim() || null, body.lang === 'en', body.kraj), zrodloPytan: ['szablon', 'szablon', 'szablon'] };
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

const ETYKIETA_ZRODLA = {
  szablon: ['z branży i miasta', 'from your industry and city'],
  strona: ['z treści Twojej strony', 'from your website'],
  uzytkownik: ['zmienione przez Ciebie', 'edited by you'],
};

// Z-W3 (jawność silników). Zgodne z panelem: ChatGPT web_search, Gemini web_search, Claude web_search, Perplexity sonar, Google AI Overviews.
function liniaNaZywo(en, kraj = 'PL') {
  const n = WIDOCZNOSC.limitIp;
  if (en) {
    const krajNazwa = NAZWY_KRAJOW_EN[kraj] || 'the United States';
    const szukaja = WIDOCZNOSC.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity and Claude search the web' : 'ChatGPT, Perplexity and Claude search the web, Gemini answers from model knowledge';
    return `No sign-up. Up to ${n} businesses per day from one IP address. We ask live through the APIs: ${szukaja}, and we check AI Overviews in Google results for ${krajNazwa}.${WIDOCZNOSC.grok ? ' Grok answers from model knowledge, without web search.' : ''} ChatGPT here means an OpenAI model with web search through the API; answers in the ChatGPT app may differ.`;
  }
  const kPl = NAZWY_KRAJOW_PL[kraj] || NAZWY_KRAJOW_PL.PL;
  const szukaja = WIDOCZNOSC.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity i Claude szukają w sieci' : 'ChatGPT, Perplexity i Claude szukają w sieci, Gemini odpowiada z wiedzy modelu';
  return `Bez rejestracji. Do ${n} firm dziennie z jednego adresu IP. Pytamy na żywo przez API: ${szukaja}, a przegląd AI sprawdzamy w wynikach Google ${kPl.dla}.${WIDOCZNOSC.grok ? ' Grok odpowiada z wiedzy modelu, bez wyszukiwania.' : ''} ChatGPT to tu model OpenAI z wyszukiwaniem przez API; odpowiedzi aplikacji ChatGPT mogą się różnić.`;
}

// Dopisek przy polach opcjonalnych mniejszy niż etykieta: w 2 kolumnach na telefonie etykieta mieści się w 1 wierszu.
const OPCJONALNIE = { fontWeight: 400, fontSize: '0.8rem', color: 'var(--w-tusz-2)', whiteSpace: 'nowrap' };

// 1 firma, 2-4 firmy, 5+ firm (12-14 zawsze „wiele”).
function odmiana(n, [jeden, kilka, wiele]) {
  if (n === 1) return jeden;
  const d = n % 10;
  const s = n % 100;
  return d >= 2 && d <= 4 && (s < 12 || s > 14) ? kilka : wiele;
}
function lacz(lista, en) {
  if (lista.length < 2) return lista.join('');
  return `${lista.slice(0, -1).join(', ')} ${en ? 'and' : 'i'} ${lista[lista.length - 1]}`;
}

// Z-W9: opis bramki dopasowany do tego, co naprawdę zostało za nią (bez obietnic „pozostałych firm”, gdy ich nie ma).
function opisBramki(p, en, top, topZr) {
  const resztaFirm = Math.max(0, (p.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p.zrodel ?? 0) - topZr.length);
  if (en) {
    const co = [`the text of ${p.odpowiedzi} answers`, 'the sources of each answer'];
    if (resztaFirm) co.push(top.length ? `the remaining businesses (${resztaFirm})` : `the businesses found in the answers (${resztaFirm}), detected automatically from the answer text`);
    if (resztaZrodel) co.push(`the remaining cited sites (${resztaZrodel})`);
    return `We will show ${lacz(co, true)}, and email you the report.`;
  }
  const co = [`treść ${p.odpowiedzi} odpowiedzi`, 'źródła każdej z nich'];
  if (resztaFirm) co.push(top.length ? `pozostałe firmy (${resztaFirm})` : `firmy znalezione w odpowiedziach (${resztaFirm}), wykrywane automatycznie z treści odpowiedzi`);
  if (resztaZrodel) co.push(`pozostałe cytowane strony (${resztaZrodel})`);
  return `Pokażemy ${lacz(co, false)}. Raport wyślemy e-mailem.`;
}

// 18.11.2026 (anim-narzedzia-c): znaczniki wchodzą staggerem 50 ms (r-stan, --i = numer pytania, maks. 6 kroków).
function Znak({ stan, en, i = 0 }) {
  const ruch = { '--i': i };
  if (stan === 'brak') return <span className="narz-znak narz-znak--brak r-stan" style={ruch} title={en ? 'Google did not show an AI Overview' : 'Google nie pokazał przeglądu AI'}>-</span>;
  return stan ? <span className="narz-znak narz-znak--tak r-stan" style={ruch} aria-label={en ? 'mentioned' : 'wymieniona'}>✓</span> : <span className="narz-znak narz-znak--nie r-stan" style={ruch} aria-label={en ? 'not mentioned' : 'niewymieniona'}>✕</span>;
}

const KATALOGI_DEMO_RE = /(^|\.)(clutch\.co|sortlist\.[a-z.]+|goodfirms\.co|g2\.com|capterra\.[a-z.]+|trustpilot\.[a-z.]+|panoramafirm\.pl|oferteo\.pl|aleo\.com|pkt\.pl|firmy\.net|gowork\.[a-z.]+|wlw\.de|gelbeseiten\.de|provenexpert\.com|kununu\.com|designrush\.com|yelp\.[a-z.]+|znanylekarz\.pl|booksy\.com)$/i;
const SPOLECZNOSCI_DEMO_RE = /(^|\.)(reddit\.com|quora\.com|wykop\.pl|linkedin\.com|youtube\.com|youtu\.be|facebook\.com|instagram\.com|x\.com|medium\.com|github\.com|gutefrage\.net)$/i;
const MEDIA_DEMO_RE = /(^|\.)(onet\.pl|wp\.pl|interia\.pl|gazeta\.pl|wyborcza\.pl|rp\.pl|pb\.pl|forbes\.[a-z.]+|businessinsider\.[a-z.]+|money\.pl|bankier\.pl|mamstartup\.pl|spidersweb\.pl|wirtualnemedia\.pl|techcrunch\.com|searchengineland\.com)$/i;

function klasyfikujKategorie(domena, zastana) {
  if (zastana) return zastana;
  const d = String(domena || '').toLowerCase().replace(/^www\./, '');
  if (KATALOGI_DEMO_RE.test(d)) return 'katalog_b2b';
  if (SPOLECZNOSCI_DEMO_RE.test(d)) return 'spolecznosci';
  if (MEDIA_DEMO_RE.test(d) || /(^|[.-])(news|presse|media|magazin|gazeta|dziennik|portal|blog)([.-]|$)/i.test(d)) return 'media';
  return 'inne';
}

function etykietaKategoriiZrodla(kat, en) {
  if (kat === 'katalog_b2b') return en ? 'B2B Directory' : 'Katalog B2B';
  if (kat === 'media') return 'Media';
  if (kat === 'spolecznosci') return en ? 'Community' : 'Społeczności';
  if (kat === 'wlasna') return en ? 'Own site' : 'Własna strona';
  return en ? 'Portal' : 'Portal';
}

function etykietaSentymentu(sent, en) {
  if (sent === 'pozytywny') return en ? 'positive' : 'pozytywny';
  if (sent === 'negatywny') return en ? 'negative' : 'negatywny';
  if (sent === 'neutralny') return en ? 'neutral' : 'neutralny';
  return null;
}

function stylSentymentu(sent) {
  if (sent === 'pozytywny') return { background: 'rgba(4, 120, 87, 0.12)', color: '#047857' };
  if (sent === 'negatywny') return { background: 'rgba(179, 38, 30, 0.12)', color: '#b3261e' };
  return { background: 'rgba(15, 23, 42, 0.07)', color: 'var(--w-tusz-2)' };
}

function PigulkiPozycjiISentymentu({ pozycja, sentyment, en, kompakt = false }) {
  const maPoz = Number.isFinite(pozycja) && pozycja > 0;
  const tekstSent = etykietaSentymentu(sentyment, en);
  if (!maPoz && !tekstSent) return null;
  const stylBazowy = {
    display: 'inline-block',
    padding: kompakt ? '0.08rem 0.38rem' : '0.12rem 0.48rem',
    borderRadius: '999px',
    fontSize: kompakt ? '0.68rem' : '0.74rem',
    fontWeight: 700,
    lineHeight: 1.35,
    fontVariantNumeric: 'tabular-nums',
    whiteSpace: 'nowrap',
  };
  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25rem', alignItems: 'center', marginLeft: kompakt ? '0.3rem' : '0.4rem', verticalAlign: 'middle' }}>
      {maPoz && (
        <span
          style={{
            ...stylBazowy,
            background: pozycja <= 3 ? 'rgba(216, 90, 48, 0.14)' : 'rgba(15, 23, 42, 0.08)',
            color: pozycja <= 3 ? '#b4471f' : 'var(--w-tusz)',
          }}
          title={en ? `Recommendation rank #${pozycja}` : `Pozycja na liście rekomendacji: #${pozycja}`}
        >
          #{pozycja}
        </span>
      )}
      {tekstSent && (
        <span style={{ ...stylBazowy, ...stylSentymentu(sentyment) }}>
          {tekstSent}
        </span>
      )}
    </span>
  );
}

function wzbogacDemoWidocznosci(obiekt, en) {
  if (!obiekt) return obiekt;
  let licznikWzmianek = 0;
  const dopiszPozSent = (el) => {
    if (!el?.wymieniona || el.brakOdpowiedzi) return el;
    licznikWzmianek += 1;
    return {
      ...el,
      pozycja: el.pozycja ?? ((licznikWzmianek % 3) + 1),
      sentyment: el.sentyment ?? (licznikWzmianek % 2 === 1 ? 'pozytywny' : 'neutralny'),
    };
  };
  const siatka = Array.isArray(obiekt.siatka) ? obiekt.siatka.map(dopiszPozSent) : obiekt.siatka;
  licznikWzmianek = 0;
  const wiersze = Array.isArray(obiekt.wiersze) ? obiekt.wiersze.map(dopiszPozSent) : obiekt.wiersze;
  const bazoweZrodla = obiekt.zrodla || obiekt.zrodlaTop || [];
  const lukaCytowan = Array.isArray(obiekt.lukaCytowan) && obiekt.lukaCytowan.length > 0
    ? obiekt.lukaCytowan
    : bazoweZrodla.slice(0, 4).map((z) => {
        const kategoria = klasyfikujKategorie(z.domena, z.kategoria);
        const wskazowka = kategoria === 'katalog_b2b'
          ? (en
            ? `Claim and complete your company profile on ${z.domena} (services, pricing tiers, min. 3 verified client reviews and consistent NAP).`
            : `Załóż lub uzupełnij profil firmy w katalogu ${z.domena} (zakres usług, widełki cenowe, min. 3 zweryfikowane opinie i spójny NAP).`)
          : kategoria === 'spolecznosci'
            ? (en
              ? `Publish expert answers or real case studies in industry threads on ${z.domena} cited by AI engines.`
              : `Opublikuj merytoryczne odpowiedzi lub case study w wątkach branżowych na ${z.domena}, z których korzystają modele AI.`)
            : (en
              ? `Inspect the cited ranking or article on ${z.domena} and pitch your company profile or expert data quote.`
              : `Sprawdź cytowany ranking lub artykuł na ${z.domena} i zadbaj o dopisanie firmy lub komentarz ekspercki.`);
        return {
          domena: z.domena,
          kategoria,
          ileOdpowiedzi: z.ile || 1,
          wskazowka,
        };
      });
  return { ...obiekt, ...(siatka ? { siatka } : {}), ...(wiersze ? { wiersze } : {}), lukaCytowan };
}

export default function WidocznoscAiClient() {
  const en = useLocale() === 'en';
  const listaKrajow = en ? KRAJE_EN : KRAJE_PL;
  const dozwoloneKraje = listaKrajow.map(([k]) => k);
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null });
  // Formularz jest niekontrolowany; wartości z adresu i po „Sprawdź inną firmę” wracają przez defaultValue.
  const [wstepne, setWstepne] = useState({});
  const [kraj, setKraj] = useState(en ? 'US' : 'PL');
  const [krajReczny, setKrajReczny] = useState(false);
  // Krok pytań: { body, pytania, zrodloPytan } z panelu i bieżące teksty w edytorze.
  const [propozycje, setPropozycje] = useState(null);
  const [edycje, setEdycje] = useState(['', '', '']);
  const [bledyPytan, setBledyPytan] = useState([null, null, null]);
  const [mapaDemo, setMapaDemo] = useState(null);
  const formRef = useRef(null);
  const pelnyRef = useRef(null);
  const pytaniaRef = useRef(null);

  // Z-06: ?firma= (albo ?marka=), ?branza=, ?miasto=, ?url= (strona www), ?kraj= tylko wypełniają pola.
  useParametrUrl(['firma', 'marka', 'branza', 'miasto', 'url', 'kraj'], (w) => {
    const pola = { firma: w.firma ?? w.marka, branza: w.branza, miasto: w.miasto, www: w.url };
    const f = formRef.current;
    for (const [k, v] of Object.entries(pola)) if (v && f?.elements[k]) f.elements[k].value = v.slice(0, Number(f.elements[k].maxLength) > 0 ? Number(f.elements[k].maxLength) : 200);
    const kParam = String(w.kraj || '').toUpperCase();
    if (dozwoloneKraje.includes(kParam)) {
      setKraj(kParam);
      setKrajReczny(true);
    } else if (w.url) {
      const auto = krajZDomeny(w.url, dozwoloneKraje);
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
        const odczytanyKraj = String(data.podglad.kraj || pUrl.get('kraj') || '').toUpperCase();
        if (odczytanyKraj && dozwoloneKraje.includes(odczytanyKraj)) setKraj(odczytanyKraj);
        const dane = {
          firma: data.podglad.firma || pUrl.get('firma') || null,
          branza: data.podglad.branza || pUrl.get('branza') || null,
          miasto: data.podglad.miasto || pUrl.get('miasto') || null,
          url: pUrl.get('url') || null,
          ...(odczytanyKraj ? { kraj: odczytanyKraj } : {}),
        };
        setStan((s) => (s.status === 'idle' ? {
          status: 'done',
          blad: null,
          id,
          podglad: data.podglad,
          pelny,
          dane,
        } : s));
      } catch {
        // nieudane pobranie wyniku z linku: formularz zostaje gotowy do uruchomienia
      }
    })();
    return () => ctrl.abort();
  }, [en]); // eslint-disable-line react-hooks/exhaustive-deps -- dozwoloneKraje zależy wyłącznie od en

  // Po odblokowaniu przewijamy do początku pełnych odpowiedzi (smooth tylko bez reduce).
  useEffect(() => {
    if (stan.pelny) pelnyRef.current?.scrollIntoView({ block: 'start', behavior: zachowaniePrzewijania() });
  }, [stan.pelny]);

  function onWwwZmiana(e) {
    if (krajReczny) return;
    const auto = krajZDomeny(e.target.value, dozwoloneKraje);
    if (auto) setKraj(auto);
  }

  // Krok 1: dane firmy -> 3 proponowane pytania (bez kosztów). Gdy panel nie ma trasy /pytania albo
  // nie odpowiada, sprawdzamy od razu z pytaniami zaproponowanymi przez panel (zachowanie sprzed 12.11).
  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const wybranyKraj = String(fd.get('kraj') || kraj || (en ? 'US' : 'PL')).toUpperCase();
    const body = { firma: String(fd.get('firma') || ''), branza: String(fd.get('branza') || ''), miasto: String(fd.get('miasto') || ''), www: String(fd.get('www') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl', kraj: wybranyKraj };
    setWstepne({ firma: body.firma, branza: body.branza, miasto: body.miasto, www: body.www });
    setStan({ status: 'pytania', blad: null, id: null, podglad: null, pelny: null, dane: null });
    const r = await pobierzPytania(body);
    if (r.ok) {
      setPropozycje({ body, pytania: r.pytania, zrodloPytan: r.zrodloPytan ?? ['szablon', 'szablon', 'szablon'] });
      setEdycje([...r.pytania]);
      setBledyPytan([null, null, null]);
      setStan((s) => ({ ...s, status: 'idle' }));
      track('ai_check_questions', { city: body.miasto, country: wybranyKraj });
      return;
    }
    if (r.blad && [400, 429, 503].includes(r.status)) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    return uruchom(body, null);
  }

  // Krok 2: sprawdzenie. pytania[i] = tekst zmienionego pytania albo null (pytanie zaproponowane).
  async function uruchom(body, wlasne) {
    const domyslnyKraj = en ? 'US' : 'PL';
    const dane = { firma: body.firma.trim(), branza: body.branza.trim(), miasto: body.miasto.trim() || null, url: body.www.trim() || null, ...(body.kraj && (en || body.kraj !== domyslnyKraj) ? { kraj: body.kraj } : {}) };
    zapiszParametry({ ...dane, wynik: null });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, dane });
    const ileZmienionych = wlasne ? wlasne.filter(Boolean).length : 0;
    track('ai_check_start', { city: body.miasto, country: body.kraj, edited_questions: ileZmienionych });
    let r = await wywolajNarzedzie('widocznosc_ai', ileZmienionych ? { ...body, pytania: wlasne } : body, 295_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    if (r.id && !DEMO) zapiszParametry({ ...dane, wynik: r.id });
    if (DEMO && propozycje) {
      const pokazane = edycje.map(zwin);
      const mapa = new Map(r.podglad.pytania.map((q, i) => [q, pokazane[i]]));
      setMapaDemo(mapa);
      r = { ...r, podglad: wzbogacDemoWidocznosci({ ...demoZPytaniami(r.podglad, mapa), zrodloPytan: pokazane.map((_, i) => (wlasne?.[i] ? 'uzytkownik' : 'szablon')), uwagiPytan: [] }, en) };
    } else if (DEMO) {
      r = { ...r, podglad: wzbogacDemoWidocznosci(r.podglad, en) };
    }
    track('narzedzie_wynik', { narzedzie: 'widocznosc_ai', wynik: r.podglad.wynik });
    setStan((s) => ({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: odczytajOdblokowane(r.id), dane: s.dane }));
  }

  function zadajPytania(e) {
    e.preventDefault();
    const bledy = edycje.map((_, i) => bladPytania(edycje, i, propozycje.body, en));
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
  const etykieta = (id) => p?.silniki.find((s) => s.id === id)?.etykieta ?? id;
  const top = (p?.konkurenciTop ?? []).slice(0, WIDOCZNOSC.przedBramka.firm);
  const topZr = (p?.zrodlaTop ?? []).slice(0, WIDOCZNOSC.przedBramka.domen);
  const resztaFirm = Math.max(0, (p?.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p?.zrodel ?? 0) - topZr.length);
  const lukaPodglad = Array.isArray(p?.lukaCytowan) ? p.lukaCytowan : [];
  const lukaPelna = Array.isArray(stan.pelny?.lukaCytowan) && stan.pelny.lukaCytowan.length > 0
    ? stan.pelny.lukaCytowan
    : lukaPodglad;
  // 12.11.2026: pola z panelu z edycją pytań (starszy panel ich nie ma).
  const zmienionePytania = (p?.zrodloPytan ?? []).filter((z) => z === 'uzytkownik').length;
  const uwagiPytan = Array.isArray(p?.uwagiPytan) ? p.uwagiPytan : [];
  return (
    <div className="narz-app" id="narzedzie" style={{ marginTop: '1.25rem' }}>
      <PasekDemo />
      {stan.status !== 'done' && !propozycje && (
        <form ref={formRef} className="narz-formularz narz-siatka-formularza" onSubmit={start} style={{ columnGap: '0.75rem', alignItems: 'end' }}>
          <div>
            <label htmlFor="ai-firma" className="narz-etykieta">{en ? 'Company name' : 'Nazwa firmy'}</label>
            <input id="ai-firma" name="firma" required minLength={2} maxLength={100} defaultValue={wstepne.firma} placeholder={en ? 'e.g. Smith Carpentry' : 'np. Stolarnia Kowalski'} className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-branza" className="narz-etykieta">{en ? 'Industry or service' : 'Branża albo usługa'}</label>
            <input id="ai-branza" name="branza" required minLength={2} maxLength={60} defaultValue={wstepne.branza} placeholder={en ? 'e.g. carpenter' : 'np. stolarz'} className="narz-pole" />
          </div>
          <div>
            <label htmlFor="ai-miasto" className="narz-etykieta">{en ? 'City' : 'Miasto'} <span style={OPCJONALNIE}>{en ? '(optional)' : '(opcjonalnie)'}</span></label>
            <input id="ai-miasto" name="miasto" maxLength={60} defaultValue={wstepne.miasto} placeholder={en ? (kraj === 'US' ? 'e.g. Chicago' : kraj === 'GB' ? 'e.g. London' : kraj === 'DE' ? 'e.g. Berlin' : kraj === 'AT' ? 'e.g. Vienna' : kraj === 'CH' ? 'e.g. Zurich' : 'e.g. Warsaw') : (kraj === 'DE' ? 'np. Berlin' : kraj === 'AT' ? 'np. Wiedeń' : kraj === 'CH' ? 'np. Zurych' : kraj === 'GB' ? 'np. Londyn' : kraj === 'US' ? 'np. Chicago' : 'np. Warszawa')} className="narz-pole" aria-describedby="ai-miasto-opis" />
          </div>
          <div>
            <label htmlFor="ai-www" className="narz-etykieta">{en ? 'Website' : 'Strona'} <span style={OPCJONALNIE}>{en ? '(optional)' : '(opcjonalnie)'}</span></label>
            <input id="ai-www" name="www" maxLength={200} defaultValue={wstepne.www} onChange={onWwwZmiana} placeholder={en ? 'e.g. company.com' : (kraj === 'DE' ? 'np. firma.de' : kraj === 'AT' ? 'np. firma.at' : kraj === 'CH' ? 'np. firma.ch' : 'np. firma.pl')} className="narz-pole" inputMode="url" aria-describedby="ai-www-opis" />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <label htmlFor="ai-kraj" className="narz-etykieta">{en ? 'Country / target market' : 'Kraj / rynek docelowy'}</label>
            <select
              id="ai-kraj"
              name="kraj"
              value={kraj}
              onChange={(e) => { setKraj(e.target.value); setKrajReczny(true); }}
              className="narz-pole"
            >
              {listaKrajow.map(([kod, nazwa]) => (
                <option key={kod} value={kod}>{nazwa}</option>
              ))}
            </select>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading' || stan.status === 'pytania'} aria-busy={stan.status === 'loading' || stan.status === 'pytania' ? 'true' : undefined} data-cta="ai_check_submit">
              {stan.status === 'loading' ? (en ? 'Asking the AI models… (up to 2 min)' : 'Pytamy modele AI… (do 2 min)') : stan.status === 'pytania' ? (en ? 'Drafting the questions…' : 'Układamy pytania…') : (en ? 'Check your AI visibility for free' : 'Sprawdź widoczność w AI za darmo')}
            </button>
          </div>
          <p className="narz-mikro">{liniaNaZywo(en, kraj)}</p>
          <p className="narz-mikro">{en ? 'First you will see the 3 questions we will ask, and you can change each one. ' : 'Najpierw zobaczysz 3 pytania, które zadamy, i możesz zmienić każde z nich. '}<span id="ai-miasto-opis">{en ? `No city = we ask across ${NAZWY_KRAJOW_EN[kraj] || 'the United States'}. ` : `Bez miasta pytamy o ${(NAZWY_KRAJOW_PL[kraj] || NAZWY_KRAJOW_PL.PL).cala}. `}</span><span id="ai-www-opis">{en ? 'If you add a page in English (e.g. company.com/en), we build one of the 3 questions from its title and description.' : 'Z tytułu i opisu podanej strony spróbujemy ułożyć jedno z 3 pytań.'}</span></p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status !== 'done' && propozycje && (
        <form ref={pytaniaRef} className="narz-formularz r-stan" onSubmit={zadajPytania} noValidate aria-labelledby="ai-pytania-tytul">
          <div>
            <h2 id="ai-pytania-tytul" className="narz-h2" style={{ marginTop: 0 }}>{en ? 'We will ask the AI models these 3 questions' : 'Te 3 pytania zadamy modelom AI'}</h2>
            <p className="narz-mikro" style={{ marginTop: 0 }}>
              <strong style={{ color: 'var(--w-tusz)' }}>{propozycje.body.firma.trim()}</strong>
              {` · ${propozycje.body.branza.trim()}${propozycje.body.miasto.trim() ? ` · ${propozycje.body.miasto.trim()}` : ''}${en && propozycje.body.kraj ? ` · ${propozycje.body.kraj}` : ''}${propozycje.body.www.trim() ? ` · ${propozycje.body.www.trim()}` : ''} `}
              <button type="button" className="narz-link" onClick={() => { setPropozycje(null); setStan((s) => ({ ...s, status: 'idle', blad: null })); }} disabled={stan.status === 'loading'}>{en ? 'Change details' : 'Zmień dane'}</button>
            </p>
            <p className="narz-mikro">{en
              ? 'You can change any question, e.g. add a service, a district or the way your customers really ask. Do not enter your business name or website address: the model would repeat it in the answer and the score would be inflated.'
              : 'Możesz zmienić każde pytanie, np. dopisać usługę, dzielnicę albo to, jak naprawdę pytają Twoi klienci. Nie wpisuj nazwy firmy ani adresu strony: model powtórzyłby ją w odpowiedzi i wynik byłby zawyżony.'}</p>
          </div>
          {edycje.map((q, i) => {
            const zmienione = zwin(q) !== propozycje.pytania[i];
            const zrodlo = zmienione ? 'uzytkownik' : propozycje.zrodloPytan[i] ?? 'szablon';
            const dlugosc = zwin(q).length;
            const idOpis = `ai-pytanie-${i}-opis`;
            return (
              <div key={i} className="r-stan" style={{ '--i': i + 1 }}>
                <label htmlFor={`ai-pytanie-${i}`} className="narz-etykieta">
                  {en ? 'Question' : 'Pytanie'} {i + 1} <span style={OPCJONALNIE}>({ETYKIETA_ZRODLA[zrodlo][en ? 1 : 0]})</span>
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
                    {zmienione && <button type="button" className="narz-link" disabled={stan.status === 'loading'} onClick={() => zmienPytanie(i, propozycje.pytania[i])}>{en ? 'Restore the suggestion' : 'Przywróć propozycję'}</button>}
                    <span aria-label={en ? `${dlugosc} of ${PYTANIE.max} characters` : `${dlugosc} z ${PYTANIE.max} znaków`}>{dlugosc}/{PYTANIE.max}</span>
                  </span>
                </div>
              </div>
            );
          })}
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary c-zajety" disabled={stan.status === 'loading'} aria-busy={stan.status === 'loading' ? 'true' : undefined} data-cta="ai_check_run">
              {stan.status === 'loading' ? (en ? 'Asking the AI models… (up to 2 min)' : 'Pytamy modele AI… (do 2 min)') : (en ? 'Ask these questions' : 'Zadaj te pytania')}
            </button>
          </div>
          <p className="narz-mikro">{en ? `Each question goes to every engine once (${listaSilnikow('en')}). Changing the questions does not use up an extra check.` : `Każde pytanie trafia raz do każdego silnika (${listaSilnikow('pl')}). Zmiana pytań nie zużywa dodatkowego sprawdzenia.`}</p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && p && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={p.wynik} podpis={en ? 'AI visibility' : 'widoczność w AI'} />
            <div>
              <p className="narz-wynik-domena">{p.firma}</p>
              <p className="narz-wynik-opis">{en
                ? <>Your business appears in <strong>{p.wzmianki} of {p.odpowiedzi}</strong> AI answers to customer questions in the “{p.branza}” industry{p.miasto ? ` (${p.miasto})` : ''}.</>
                : <>Firma pojawia się w <strong>{p.wzmianki} z {p.odpowiedzi}</strong> odpowiedzi AI na pytania klientów z branży „{p.branza}”{p.miasto ? ` (${p.miasto})` : ''}.</>}</p>
              {p.uwagaNazwy && <p className="narz-mikro" role="note">{p.uwagaNazwy}</p>}
              {p.zastrzezenie && <p className="narz-mikro">{p.zastrzezenie}</p>}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.25rem' }}>
                <button type="button" className="narz-link" onClick={resetuj}>{en ? 'Check another business' : 'Sprawdź inną firmę'}</button>
                {(stan.dane || stan.id) && (
                  <LinkWyniku
                    narzedzie="widocznosc_ai"
                    tryb={stan.id ? 'wynik' : 'wypelnij'}
                    parametry={{ ...(stan.dane ?? { firma: p.firma, branza: p.branza, miasto: p.miasto || null }), ...(stan.id ? { wynik: stan.id } : {}) }}
                    tekst={en ? 'Copy a link to this check' : 'Kopiuj link do tego sprawdzenia'}
                    podsumowanie={en
                      ? `AI visibility for ${p.firma}: ${p.wzmianki}/${p.odpowiedzi} answers (${p.wynik}/100)`
                      : `Widoczność w AI dla ${p.firma}: ${p.wzmianki}/${p.odpowiedzi} odpowiedzi (${p.wynik}/100)`}
                  />
                )}
              </div>
            </div>
          </div>

          <div className="narz-tabela-wrap">
            <table className="narz-tabela">
              <caption className="sr-only">{en ? 'Whether the business is named in the answers of each AI engine' : 'Czy firma pada w odpowiedziach poszczególnych silników AI'}</caption>
              <thead>
                <tr><th scope="col">{en ? 'Engine' : 'Silnik'}</th>{p.pytania.map((q, i) => <th key={q} scope="col" title={q}>{en ? 'Question' : 'Pytanie'} {i + 1}</th>)}<th scope="col">{en ? 'Score' : 'Wynik'}</th></tr>
              </thead>
              <tbody>
                {p.silniki.map((s) => (
                  <tr key={s.id} className={s.dostepny ? '' : 'niedostepny'}>
                    <th scope="row"><span className="narz-silnik">{s.etykieta}</span><span className="narz-mikro">{s.opis}{s.dostepny && s.wyszukiwanie === false && !/wyszukiwania|web search/i.test(s.opis) ? (en ? ' · no web search' : ' · bez wyszukiwania') : ''}</span></th>
                    {s.dostepny
                      ? p.pytania.map((q, qi) => {
                        const c = p.siatka.find((x) => x.silnik === s.id && x.pytanie === q);
                        return (
                          <td key={q}>
                            {c ? (
                              <span style={{ display: 'inline-flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: '0.2rem' }}>
                                <Znak stan={c.brakOdpowiedzi ? 'brak' : c.wymieniona} en={en} i={qi} />
                                {c.wymieniona && !c.brakOdpowiedzi && (
                                  <PigulkiPozycjiISentymentu pozycja={c.pozycja} sentyment={c.sentyment} en={en} kompakt />
                                )}
                              </span>
                            ) : '-'}
                          </td>
                        );
                      })
                      : <td colSpan={p.pytania.length} className="narz-mikro">{s.powod}</td>}
                    <td>{s.dostepny ? `${s.wzmianki}/${s.odpowiedzi}` : '-'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="narz-pytania" open={zmienionePytania > 0 || uwagiPytan.length > 0}>
            <summary>{en ? 'Questions we asked' : 'Jakie pytania zadaliśmy'}{zmienionePytania > 0 && (en ? ` (edited by you: ${zmienionePytania})` : ` (zmienione przez Ciebie: ${zmienionePytania})`)}</summary>
            <ol>{p.pytania.map((q, i) => (
              <li key={q}>
                {q}
                {p.zrodloPytan?.[i] === 'strona' && <span className="narz-mikro"> {en ? '(from your website)' : '(z treści Twojej strony)'}</span>}
                {p.zrodloPytan?.[i] === 'uzytkownik' && <span className="narz-mikro"> {en ? '(your question)' : '(Twoje pytanie)'}</span>}
                {uwagiPytan.filter((u) => u.nr === i + 1).map((u) => <span key={u.zmiana} className="narz-mikro" role="note" style={{ display: 'block' }}>{u.powod}</span>)}
              </li>
            ))}</ol>
          </details>

          {!stan.pelny && (top.length > 0 || topZr.length > 0) && (
            <div key="top" className="narz-pelne-ai">
              {top.length > 0 && (
                <div role="region" aria-labelledby="ai-top-firmy">
                  <h2 id="ai-top-firmy" className="narz-h2">{en ? 'Who the models name most often' : 'Kogo modele wymieniają najczęściej'}</h2>
                  <ul className="narz-chipy">{top.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                  <p className="narz-mikro">
                    {en ? 'Your competitors in AI answers, even if you do not see them in Google.' : 'To Twoja konkurencja w odpowiedziach AI, nawet jeśli nie widzisz jej w Google.'}
                    {resztaFirm > 0 && (en ? ` And ${resztaFirm} more ${resztaFirm === 1 ? 'business' : 'businesses'} after you enter your email.` : ` I jeszcze ${resztaFirm} ${odmiana(resztaFirm, ['firma', 'firmy', 'firm'])} po podaniu e-maila.`)}
                  </p>
                </div>
              )}
              {topZr.length > 0 && (
                <div role="region" aria-labelledby="ai-top-zrodla">
                  <h2 id="ai-top-zrodla" className="narz-h2">{en ? 'Most cited sites' : 'Najczęściej cytowane strony'}</h2>
                  <ul className="narz-chipy">
                    {topZr.map((z) => {
                      const kat = klasyfikujKategorie(z.domena, z.kategoria);
                      return (
                        <li key={z.domena} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                          <span>{z.domena}</span>
                          <span style={{ fontSize: '0.72rem', padding: '0.08rem 0.42rem', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.07)', color: 'var(--w-tusz-2)', fontWeight: 600 }}>
                            {etykietaKategoriiZrodla(kat, en)}
                          </span>
                          <span style={{ fontVariantNumeric: 'tabular-nums' }}>×{z.ile}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="narz-mikro">
                    {en ? 'A mention of your business on these sites increases the chance that a model will recommend it.' : 'Wzmianka o firmie na tych stronach zwiększa szansę, że model ją poleci.'}
                    {resztaZrodel > 0 && (en ? ` And ${resztaZrodel} more ${resztaZrodel === 1 ? 'site' : 'sites'} after you enter your email.` : ` I jeszcze ${resztaZrodel} ${odmiana(resztaZrodel, ['strona', 'strony', 'stron'])} po podaniu e-maila.`)}
                  </p>
                  {lukaPodglad.length > 0 && (
                    <p className="narz-mikro" style={{ marginTop: '0.45rem', padding: '0.6rem 0.85rem', borderRadius: '12px', background: 'rgba(216, 90, 48, 0.07)', border: '1px solid rgba(216, 90, 48, 0.2)', color: 'var(--w-tusz)', fontVariantNumeric: 'tabular-nums' }}>
                      <strong>
                        {en
                          ? `Citation Gap detected (${lukaPodglad.length} ${lukaPodglad.length === 1 ? 'source' : 'sources'}):`
                          : `Wykryto ${lukaPodglad.length} ${odmiana(lukaPodglad.length, ['lukę cytowań', 'luki cytowań', 'luk cytowań'])}:`}
                      </strong>{' '}
                      {en
                        ? 'Unlock the step-by-step Citation Gap Playbook below to see where competitors are cited without your business.'
                        : 'Odblokuj niżej kartę Citation Gap Playbook z instrukcją krok po kroku, jak zdobyć wpis na domenach cytujących konkurencję.'}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {!stan.pelny ? (
            <div key="bramka" className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone wid-atrapa" aria-hidden="true">
                {Array.from({ length: Math.min(12, Math.max(3, Number(p.odpowiedzi) || 3)) }, (_, i) => i + 1).map((i) => (
                  <li key={i} className="narz-problem"><p className="narz-problem-tytul narz-atrapa">{en ? 'Who the model recommends instead of your business' : 'Kogo poleca model zamiast Twojej firmy'}</p><p className="narz-problem-opis narz-atrapa">{en ? 'An excerpt of the answer and the pages the AI cites' : 'Fragment odpowiedzi i strony, na które powołuje się AI'}</p></li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="widocznosc_ai"
                id={stan.id}
                naglowek={en ? 'See all answers and sources' : 'Zobacz wszystkie odpowiedzi i źródła'}
                opis={opisBramki(p, en, top, topZr)}
                korzysci={en
                  ? [`Full answers: ${listaSilnikow('en')}`, p.wzmianki > 0 ? 'The excerpt that names your business and the sources of each answer' : 'Excerpts of the answers and the sources of each answer', 'All businesses and sites the models cite, plus the report by email']
                  : [`Pełne odpowiedzi: ${listaSilnikow('pl')}`, p.wzmianki > 0 ? 'Fragment, w którym pada Twoja firma, i źródła każdej odpowiedzi' : 'Fragmenty odpowiedzi i źródła każdej z nich', 'Wszystkie firmy i strony, które cytują modele, oraz raport e-mailem']}
                przycisk={en ? 'Show the AI answers' : 'Pokaż odpowiedzi AI'}
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const podstawowyPelny = DEMO && mapaDemo ? demoZPytaniami(pelny, mapaDemo) : pelny;
                  const gotowyPelny = DEMO ? wzbogacDemoWidocznosci(podstawowyPelny, en) : podstawowyPelny;
                  zapiszOdblokowane(stan.id, gotowyPelny);
                  setStan((s) => ({ ...s, pelny: gotowyPelny, newsletter, mailOk }));
                }}
              />
            </div>
          ) : (
            <div key="pelny" ref={pelnyRef} className="narz-pelne-ai c-skok">
              <Odblokowano newsletter={stan.newsletter} mailOk={stan.mailOk} />
              {stan.pelny.konkurenci?.length > 0 && (
                <div role="region" aria-labelledby="ai-konkurenci">
                  <h2 id="ai-konkurenci" className="narz-h2">{en ? 'Who the models name' : 'Kogo modele wymieniają'}</h2>
                  <ul className="narz-chipy">{stan.pelny.konkurenci.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                </div>
              )}
              {stan.pelny.zrodla?.length > 0 && (
                <div role="region" aria-labelledby="ai-zrodla">
                  <h2 id="ai-zrodla" className="narz-h2">{en ? 'Which sites they rely on' : 'Z jakich stron korzystają'}</h2>
                  <ul className="narz-chipy">
                    {stan.pelny.zrodla.map((z) => {
                      const kat = klasyfikujKategorie(z.domena, z.kategoria);
                      return (
                        <li key={z.domena} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', flexWrap: 'wrap' }}>
                          <span>{z.domena}</span>
                          <span style={{ fontSize: '0.72rem', padding: '0.08rem 0.42rem', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.07)', color: 'var(--w-tusz-2)', fontWeight: 600 }}>
                            {etykietaKategoriiZrodla(kat, en)}
                          </span>
                          <span style={{ fontVariantNumeric: 'tabular-nums' }}>×{z.ile}</span>
                        </li>
                      );
                    })}
                  </ul>
                  <p className="narz-mikro">{en ? 'A mention of your business on these sites increases the chance that a model will recommend it.' : 'Wzmianka o firmie na tych stronach zwiększa szansę, że model ją poleci.'}</p>
                </div>
              )}
              {lukaPelna.length > 0 && (
                <div
                  role="region"
                  aria-labelledby="ai-luka-cytowan"
                  style={{ padding: '1.1rem 1.2rem', borderRadius: '18px', background: 'var(--w-papier, #f6f4ef)', border: '1px solid rgba(216, 90, 48, 0.22)', display: 'grid', gap: '0.75rem', fontVariantNumeric: 'tabular-nums' }}
                >
                  <div>
                    <h2 id="ai-luka-cytowan" className="narz-h2" style={{ margin: 0 }}>
                      {en
                        ? 'Citation Gap Playbook - where competitors are cited and your business is missing'
                        : 'Citation Gap Playbook - gdzie są cytowani konkurenci, a brakuje Twojej firmy'}
                    </h2>
                    <p className="narz-mikro" style={{ margin: '0.25rem 0 0' }}>
                      {en
                        ? 'Priority external domains from answers that recommended competitors without naming your company.'
                        : 'Domeny zewnętrzne, na które powołały się modele AI w odpowiedziach polecających konkurencję bez Twojej firmy.'}
                    </p>
                  </div>
                  <ul className="narz-problemy" style={{ margin: 0 }}>
                    {lukaPelna.map((l) => {
                      const kat = klasyfikujKategorie(l.domena, l.kategoria);
                      const ile = Number(l.ileOdpowiedzi ?? l.ile ?? 1);
                      return (
                        <li key={l.domena} className="narz-problem" style={{ background: '#ffffff' }}>
                          <p className="narz-problem-meta" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', alignItems: 'center' }}>
                            <strong style={{ color: 'var(--w-tusz)' }}>{l.domena}</strong>
                            <span style={{ fontSize: '0.73rem', padding: '0.1rem 0.48rem', borderRadius: '999px', background: 'rgba(15, 23, 42, 0.07)', color: 'var(--w-tusz-2)', fontWeight: 600 }}>
                              {etykietaKategoriiZrodla(kat, en)}
                            </span>
                            <span>
                              {en
                                ? `cited in ${ile} ${ile === 1 ? 'answer' : 'answers'}`
                                : `cytowana w ${ile} ${odmiana(ile, ['odpowiedzi', 'odpowiedziach', 'odpowiedziach'])}`}
                            </span>
                          </p>
                          {l.wskazowka && (
                            <p className="narz-problem-opis" style={{ marginTop: '0.25rem' }}>{l.wskazowka}</p>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              )}
              <h2 className="narz-h2">{en ? 'Answers' : 'Odpowiedzi'}</h2>
              <ul className="narz-problemy">
                {stan.pelny.wiersze.filter((r) => !r.brakOdpowiedzi).map((r) => {
                  const pelnyTekst = String(r.odpowiedz || '');
                  const maWiecej = Boolean(pelnyTekst) && (Boolean(r.fragment && pelnyTekst.trim() !== r.fragment.trim()) || pelnyTekst.length > 600);
                  const skrot = r.fragment
                    ? (en ? <>“{podswietlMarke(r.fragment, wzorce)}”</> : <>„{podswietlMarke(r.fragment, wzorce)}”</>)
                    : <>{podswietlMarke(pelnyTekst.slice(0, 600), wzorce)}{pelnyTekst.length > 600 ? '…' : ''}</>;
                  return (
                    <li key={`${r.silnik}-${r.pytanie}`} className={`narz-problem ${r.wymieniona ? 'narz-problem--ok' : 'narz-problem--blad'}`}>
                      <p className="narz-problem-meta">
                        <span className="narz-waga">{etykieta(r.silnik)}</span>
                        {' · '}
                        {r.wymieniona ? (en ? 'business mentioned' : 'firma wymieniona') : (en ? 'business not mentioned' : 'firma niewymieniona')}
                        {r.wymieniona && <PigulkiPozycjiISentymentu pozycja={r.pozycja} sentyment={r.sentyment} en={en} />}
                      </p>
                      <h3 className="narz-problem-tytul">{r.pytanie}</h3>
                      <p className="narz-problem-opis">{skrot}</p>
                      {maWiecej && (
                        <details className="narz-problem-strony" style={{ marginTop: '0.5rem' }}>
                          <summary>{en ? 'Show full response' : 'Pokaż pełną odpowiedź'}</summary>
                          <div className="narz-problem-opis" style={{ marginTop: '0.5rem', whiteSpace: 'pre-wrap' }}>
                            {podswietlMarke(pelnyTekst, wzorce)}
                          </div>
                        </details>
                      )}
                      {r.zrodla.length > 0 && <p className="narz-mikro">{en ? 'Sources' : 'Źródła'}: {r.zrodla.join(', ')}</p>}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          <p className="narz-mikro">{en ? 'The answers come from the models’ APIs and may differ from what someone sees in the app. They change from day to day.' : 'Odpowiedzi pochodzą z API modeli i mogą różnić się od tego, co ktoś zobaczy w aplikacji. Zmieniają się z dnia na dzień.'}</p>
        </div>
      )}
    </div>
  );
}
