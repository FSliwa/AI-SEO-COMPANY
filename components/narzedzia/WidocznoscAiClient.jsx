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

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { WIDOCZNOSC, listaSilnikow } from '@/lib/narzedziaLiczby';
import BramkaEmail from './BramkaEmail';
import LinkWyniku from './LinkWyniku';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

const PYTAMY = WIDOCZNOSC.grok ? ['ChatGPT, Gemini, Perplexity, Claude and Grok', 'ChatGPT, Gemini, Perplexity, Claude i Grok'] : ['ChatGPT, Gemini, Perplexity and Claude', 'ChatGPT, Gemini, Perplexity i Claude'];
const KROKI_EN = ['Sending 3 customer questions to the AI engines', `Asking ${PYTAMY[0]}`, 'Checking Google AI Overviews', 'Looking for your business in the answers and sources'];
const KROKI = ['Wysyłamy 3 pytania klientów do silników AI', `Pytamy ${PYTAMY[1]}`, 'Sprawdzamy przegląd AI w Google', 'Szukamy Twojej firmy w odpowiedziach i źródłach'];

// Pytania klienta: te same granice co panel (PYTANIE_DLUGOSC, wzorzec adresu i ogólne człony marek
// z lib/narzedzia/widocznosc.ts i lib/dataforseo.ts). Panel sprawdza je jeszcze raz i ma ostatnie słowo.
const PYTANIE = { min: 10, max: 200 };
const ADRES = /https?:\/\/|(^|[^\p{L}\p{N}-])www\.|[\p{L}\p{N}._%+-]+@[\p{L}\p{N}-]+\.\p{L}{2,}|(^|[^\p{L}\p{N}-])[\p{L}\p{N}][\p{L}\p{N}-]*\.(pl|com|eu|net|org|io|ai|info|biz|co|uk|de|app|dev|shop|online|store|xyz|me|tv|edu|gov|cz|sk|ua)(?![\p{L}\p{N}])/iu;
const OGOLNE = new Set(['seo', 'web', 'art', 'pro', 'net', 'com', 'app', 'www', 'firma', 'sklep', 'studio', 'agencja', 'group', 'grupa', 'polska']);
const proste = (t) => ` ${String(t || '').normalize('NFKD').replace(/\p{M}/gu, '').replace(/ł/gi, 'l').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim()} `;
const zwin = (t) => String(t || '').replace(/\s+/g, ' ').trim();

function bladPytania(lista, i, dane, en) {
  const t = zwin(lista[i]);
  if (t.length < PYTANIE.min || t.length > PYTANIE.max) return en ? `A question must be ${PYTANIE.min} to ${PYTANIE.max} characters long.` : `Pytanie musi mieć od ${PYTANIE.min} do ${PYTANIE.max} znaków.`;
  if (ADRES.test(t)) return en ? 'Remove the website or email address.' : 'Usuń adres strony albo e-mail.';
  const n = proste(t);
  const host = String(dane.www || '').toLowerCase().replace(/^[a-z]+:\/\//, '').replace(/^www\./, '').split(/[/?#:]/)[0];
  const marki = [proste(dane.firma), host.includes('.') ? proste(host.split('.').slice(0, -1).join(' ')) : ''].map((m) => m.trim()).filter((m) => m.replace(/ /g, '').length >= 3 && !OGOLNE.has(m));
  if (marki.some((m) => n.includes(` ${m} `))) return en ? 'Remove your business name or domain: the model would repeat it in the answer and inflate the score.' : 'Usuń nazwę firmy albo jej domenę: model powtórzyłby ją w odpowiedzi i zawyżył wynik.';
  if (lista.some((x, j) => j < i && proste(x) === n)) return en ? 'The same question is already above.' : 'To samo pytanie jest już wyżej.';
  return null;
}

// Tryb demo (bez panelu): te same szablony co panel (lib/narzedzia/widocznosc.ts: pytania()), bez pytania ze strony.
function pytaniaDemo(branza, miasto, en) {
  if (en) {
    const where = miasto ? `in ${miasto}` : 'in Poland';
    return [`Which company in the “${branza}” industry do you recommend ${where}? Name a few.`, `Who is the best in the “${branza}” industry ${where}?`, `I'm looking for: ${branza}${miasto ? `, ${miasto}` : ', Poland'}. Which company should I choose and why?`];
  }
  const gdzie = miasto ? `w mieście ${miasto}` : 'w Polsce';
  return [`Jaką firmę z branży „${branza}” polecasz ${gdzie}? Podaj kilka nazw.`, `Kto jest najlepszy w branży „${branza}” ${gdzie}?`, `Szukam: ${branza}${miasto ? `, ${miasto}` : ', Polska'}. Którą firmę wybrać i dlaczego?`];
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
    return { ok: true, pytania: pytaniaDemo(body.branza.trim(), body.miasto.trim() || null, body.lang === 'en'), zrodloPytan: ['szablon', 'szablon', 'szablon'] };
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

// Z-W3 (jawność silników). Zgodne z panelem: ChatGPT web_search PL (+ miasto), Gemini web_search
// (wyłącznik NARZEDZIA_GEMINI_WEB_SEARCH=0), Claude web_search PL, Perplexity sonar, przegląd AI z Google „Poland”.
function liniaNaZywo(en) {
  const n = WIDOCZNOSC.limitIp;
  if (en) {
    const szukaja = WIDOCZNOSC.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity and Claude search the web' : 'ChatGPT, Perplexity and Claude search the web, Gemini answers from model knowledge';
    return `No sign-up. Up to ${n} businesses per day from one IP address. We ask live through the APIs: ${szukaja}, and we check AI Overviews in Google results for Poland.${WIDOCZNOSC.grok ? ' Grok answers from model knowledge, without web search.' : ''}`;
  }
  const szukaja = WIDOCZNOSC.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity i Claude szukają w sieci' : 'ChatGPT, Perplexity i Claude szukają w sieci, Gemini odpowiada z wiedzy modelu';
  return `Bez rejestracji. Do ${n} firm dziennie z jednego adresu IP. Pytamy na żywo przez API: ${szukaja}, a przegląd AI sprawdzamy w wynikach Google dla Polski.${WIDOCZNOSC.grok ? ' Grok odpowiada z wiedzy modelu, bez wyszukiwania.' : ''}`;
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
    if (resztaFirm) co.push(top.length ? `the remaining businesses (${resztaFirm})` : `the names of the ${resztaFirm} businesses the models mention`);
    if (resztaZrodel) co.push(`the remaining cited sites (${resztaZrodel})`);
    return `We will show ${lacz(co, true)}, and email you the report.`;
  }
  const co = [`treść ${p.odpowiedzi} odpowiedzi`, 'źródła każdej z nich'];
  if (resztaFirm) co.push(top.length ? `pozostałe firmy (${resztaFirm})` : `nazwy ${resztaFirm} ${odmiana(resztaFirm, ['firmy', 'firm', 'firm'])}, które wymieniają modele`);
  if (resztaZrodel) co.push(`pozostałe cytowane strony (${resztaZrodel})`);
  return `Pokażemy ${lacz(co, false)}. Raport wyślemy e-mailem.`;
}

function Znak({ stan, en }) {
  if (stan === 'brak') return <span className="narz-znak narz-znak--brak" title={en ? 'Google did not show an AI Overview' : 'Google nie pokazał przeglądu AI'}>–</span>;
  return stan ? <span className="narz-znak narz-znak--tak" aria-label={en ? 'mentioned' : 'wymieniona'}>✓</span> : <span className="narz-znak narz-znak--nie" aria-label={en ? 'not mentioned' : 'niewymieniona'}>✕</span>;
}

export default function WidocznoscAiClient() {
  const en = useLocale() === 'en';
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null });
  // Formularz jest niekontrolowany; wartości z adresu i po „Sprawdź inną firmę” wracają przez defaultValue.
  const [wstepne, setWstepne] = useState({});
  // Krok pytań: { body, pytania, zrodloPytan } z panelu i bieżące teksty w edytorze.
  const [propozycje, setPropozycje] = useState(null);
  const [edycje, setEdycje] = useState(['', '', '']);
  const [bledyPytan, setBledyPytan] = useState([null, null, null]);
  const [mapaDemo, setMapaDemo] = useState(null);
  const formRef = useRef(null);
  const pytaniaRef = useRef(null);

  // Z-06: ?firma= (albo ?marka=), ?branza=, ?miasto=, ?url= (strona www) tylko wypełniają pola.
  useParametrUrl(['firma', 'marka', 'branza', 'miasto', 'url'], (w) => {
    const pola = { firma: w.firma ?? w.marka, branza: w.branza, miasto: w.miasto, www: w.url };
    const f = formRef.current;
    for (const [k, v] of Object.entries(pola)) if (v && f?.elements[k]) f.elements[k].value = v.slice(0, Number(f.elements[k].maxLength) > 0 ? Number(f.elements[k].maxLength) : 200);
  });

  // Krok 1: dane firmy -> 3 proponowane pytania (bez kosztów). Gdy panel nie ma trasy /pytania albo
  // nie odpowiada, sprawdzamy od razu z pytaniami zaproponowanymi przez panel (zachowanie sprzed 12.11).
  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = { firma: String(fd.get('firma') || ''), branza: String(fd.get('branza') || ''), miasto: String(fd.get('miasto') || ''), www: String(fd.get('www') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' };
    setWstepne({ firma: body.firma, branza: body.branza, miasto: body.miasto, www: body.www });
    setStan({ status: 'pytania', blad: null, id: null, podglad: null, pelny: null, dane: null });
    const r = await pobierzPytania(body);
    if (r.ok) {
      setPropozycje({ body, pytania: r.pytania, zrodloPytan: r.zrodloPytan ?? ['szablon', 'szablon', 'szablon'] });
      setEdycje([...r.pytania]);
      setBledyPytan([null, null, null]);
      setStan((s) => ({ ...s, status: 'idle' }));
      track('ai_check_questions', { city: body.miasto });
      return;
    }
    if (r.blad && [400, 429, 503].includes(r.status)) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    return uruchom(body, null);
  }

  // Krok 2: sprawdzenie. pytania[i] = tekst zmienionego pytania albo null (pytanie zaproponowane).
  async function uruchom(body, wlasne) {
    const dane = { firma: body.firma.trim(), branza: body.branza.trim(), miasto: body.miasto.trim() || null, url: body.www.trim() || null };
    zapiszParametry(dane);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, dane });
    const ileZmienionych = wlasne ? wlasne.filter(Boolean).length : 0;
    track('ai_check_start', { city: body.miasto, edited_questions: ileZmienionych });
    let r = await wywolajNarzedzie('widocznosc_ai', ileZmienionych ? { ...body, pytania: wlasne } : body, 295_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    if (DEMO && propozycje) {
      const pokazane = edycje.map(zwin);
      const mapa = new Map(r.podglad.pytania.map((q, i) => [q, pokazane[i]]));
      setMapaDemo(mapa);
      r = { ...r, podglad: { ...demoZPytaniami(r.podglad, mapa), zrodloPytan: pokazane.map((_, i) => (wlasne?.[i] ? 'uzytkownik' : 'szablon')), uwagiPytan: [] } };
    }
    track('narzedzie_wynik', { narzedzie: 'widocznosc_ai', wynik: r.podglad.wynik });
    setStan((s) => ({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null, dane: s.dane }));
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
    setPropozycje(null);
    setMapaDemo(null);
    setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null });
  };

  const p = stan.podglad;
  const etykieta = (id) => p?.silniki.find((s) => s.id === id)?.etykieta ?? id;
  const top = (p?.konkurenciTop ?? []).slice(0, WIDOCZNOSC.przedBramka.firm);
  const topZr = (p?.zrodlaTop ?? []).slice(0, WIDOCZNOSC.przedBramka.domen);
  const resztaFirm = Math.max(0, (p?.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p?.zrodel ?? 0) - topZr.length);
  // 12.11.2026: pola z panelu z edycją pytań (starszy panel ich nie ma).
  const zmienionePytania = (p?.zrodloPytan ?? []).filter((z) => z === 'uzytkownik').length;
  const uwagiPytan = Array.isArray(p?.uwagiPytan) ? p.uwagiPytan : [];
  return (
    <div className="narz-app" id="narzedzie" style={{ marginTop: '1.25rem' }}>
      <PasekDemo />
      {stan.status !== 'done' && !propozycje && (
        <form ref={formRef} className="narz-formularz narz-siatka-formularza" onSubmit={start} style={{ gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', columnGap: '0.75rem', alignItems: 'end' }}>
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
            <input id="ai-miasto" name="miasto" maxLength={60} defaultValue={wstepne.miasto} placeholder={en ? 'e.g. Warsaw' : 'np. Warszawa'} className="narz-pole" aria-describedby="ai-miasto-opis" />
          </div>
          <div>
            <label htmlFor="ai-www" className="narz-etykieta">{en ? 'Website' : 'Strona'} <span style={OPCJONALNIE}>{en ? '(optional)' : '(opcjonalnie)'}</span></label>
            <input id="ai-www" name="www" maxLength={200} defaultValue={wstepne.www} placeholder={en ? 'e.g. company.com' : 'np. firma.pl'} className="narz-pole" inputMode="url" aria-describedby="ai-www-opis" />
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading' || stan.status === 'pytania'} data-cta="ai_check_submit">
              {stan.status === 'loading' ? (en ? 'Asking the AI models… (up to 2 min)' : 'Pytamy modele AI… (do 2 min)') : stan.status === 'pytania' ? (en ? 'Drafting the questions…' : 'Układamy pytania…') : (en ? 'Check your AI visibility for free' : 'Sprawdź widoczność w AI za darmo')}
            </button>
          </div>
          <p className="narz-mikro">{liniaNaZywo(en)}</p>
          <p className="narz-mikro">{en ? 'First you will see the 3 questions we will ask, and you can change each one. ' : 'Najpierw zobaczysz 3 pytania, które zadamy, i możesz zmienić każde z nich. '}<span id="ai-miasto-opis">{en ? 'No city = we ask about all of Poland. ' : 'Bez miasta pytamy o całą Polskę. '}</span><span id="ai-www-opis">{en ? 'If you add a page in English (e.g. company.com/en), we build one of the 3 questions from its title and description.' : 'Z tytułu i opisu podanej strony spróbujemy ułożyć jedno z 3 pytań.'}</span></p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={20000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status !== 'done' && propozycje && (
        <form ref={pytaniaRef} className="narz-formularz" onSubmit={zadajPytania} noValidate aria-labelledby="ai-pytania-tytul">
          <div>
            <h2 id="ai-pytania-tytul" className="narz-h2" style={{ marginTop: 0 }}>{en ? 'We will ask the AI models these 3 questions' : 'Te 3 pytania zadamy modelom AI'}</h2>
            <p className="narz-mikro" style={{ marginTop: 0 }}>
              <strong style={{ color: 'var(--w-tusz)' }}>{propozycje.body.firma.trim()}</strong>
              {` · ${propozycje.body.branza.trim()}${propozycje.body.miasto.trim() ? ` · ${propozycje.body.miasto.trim()}` : ''}${propozycje.body.www.trim() ? ` · ${propozycje.body.www.trim()}` : ''} `}
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
              <div key={i}>
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
                  className="narz-pole"
                  style={{ resize: 'vertical', lineHeight: 1.45, fieldSizing: 'content', minHeight: '4.5rem' }}
                />
                <div id={idOpis} style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '0.25rem 1rem' }}>
                  {bledyPytan[i] ? <p className="narz-blad" role="alert" style={{ margin: '0.25rem 0 0' }}>{bledyPytan[i]}</p> : <span />}
                  <span className="narz-mikro" style={{ display: 'inline-flex', gap: '1rem', alignItems: 'baseline', color: dlugosc > PYTANIE.max ? 'var(--n-zle)' : undefined }}>
                    {zmienione && stan.status !== 'loading' && <button type="button" className="narz-link" onClick={() => zmienPytanie(i, propozycje.pytania[i])}>{en ? 'Restore the suggestion' : 'Przywróć propozycję'}</button>}
                    <span aria-label={en ? `${dlugosc} of ${PYTANIE.max} characters` : `${dlugosc} z ${PYTANIE.max} znaków`}>{dlugosc}/{PYTANIE.max}</span>
                  </span>
                </div>
              </div>
            );
          })}
          <div className="narz-kalk-akcja">
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="ai_check_run">
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
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.4rem 1.5rem' }}>
                <button type="button" className="narz-link" onClick={resetuj}>{en ? 'Check another business' : 'Sprawdź inną firmę'}</button>
                {stan.dane && <LinkWyniku narzedzie="widocznosc_ai" parametry={stan.dane} tekst={en ? 'Copy a link to this check' : 'Kopiuj link do tego sprawdzenia'} />}
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
                      ? p.pytania.map((q) => {
                        const c = p.siatka.find((x) => x.silnik === s.id && x.pytanie === q);
                        return <td key={q}>{c ? <Znak stan={c.brakOdpowiedzi ? 'brak' : c.wymieniona} en={en} /> : '–'}</td>;
                      })
                      : <td colSpan={p.pytania.length} className="narz-mikro">{s.powod}</td>}
                    <td>{s.dostepny ? `${s.wzmianki}/${s.odpowiedzi}` : '–'}</td>
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
            <div className="narz-pelne-ai">
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
                  <ul className="narz-chipy">{topZr.map((z) => <li key={z.domena}>{z.domena} <span>×{z.ile}</span></li>)}</ul>
                  <p className="narz-mikro">
                    {en ? 'A mention of your business on these sites increases the chance that a model will recommend it.' : 'Wzmianka o firmie na tych stronach zwiększa szansę, że model ją poleci.'}
                    {resztaZrodel > 0 && (en ? ` And ${resztaZrodel} more ${resztaZrodel === 1 ? 'site' : 'sites'} after you enter your email.` : ` I jeszcze ${resztaZrodel} ${odmiana(resztaZrodel, ['strona', 'strony', 'stron'])} po podaniu e-maila.`)}
                  </p>
                </div>
              )}
            </div>
          )}

          {!stan.pelny ? (
            <div className="narz-zablokowane">
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {[1, 2, 3].map((i) => (
                  <li key={i} className="narz-problem"><p className="narz-problem-tytul narz-atrapa">{en ? 'Who the model recommends instead of your business' : 'Kogo poleca model zamiast Twojej firmy'}</p><p className="narz-problem-opis narz-atrapa">{en ? 'An excerpt of the answer and the pages the AI cites' : 'Fragment odpowiedzi i strony, na które powołuje się AI'}</p></li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="widocznosc_ai"
                id={stan.id}
                naglowek={en ? 'See all answers and sources' : 'Zobacz wszystkie odpowiedzi i źródła'}
                opis={opisBramki(p, en, top, topZr)}
                korzysci={en
                  ? [`Full answers: ${listaSilnikow('en')}`, 'The excerpt that names your business and the sources of each answer', 'All businesses and sites the models cite, plus the report by email']
                  : [`Pełne odpowiedzi: ${listaSilnikow('pl')}`, 'Fragment, w którym pada Twoja firma, i źródła każdej odpowiedzi', 'Wszystkie firmy i strony, które cytują modele, oraz raport e-mailem']}
                przycisk={en ? 'Show the AI answers' : 'Pokaż odpowiedzi AI'}
                onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny: DEMO && mapaDemo ? demoZPytaniami(pelny, mapaDemo) : pelny, newsletter }))}
              />
            </div>
          ) : (
            <div className="narz-pelne-ai">
              <Odblokowano newsletter={stan.newsletter} />
              {stan.pelny.konkurenci?.length > 0 && (
                <div role="region" aria-labelledby="ai-konkurenci">
                  <h2 id="ai-konkurenci" className="narz-h2">{en ? 'Who the models name' : 'Kogo modele wymieniają'}</h2>
                  <ul className="narz-chipy">{stan.pelny.konkurenci.map((k) => <li key={k.nazwa}>{k.nazwa} <span>×{k.ile}</span></li>)}</ul>
                </div>
              )}
              {stan.pelny.zrodla?.length > 0 && (
                <div role="region" aria-labelledby="ai-zrodla">
                  <h2 id="ai-zrodla" className="narz-h2">{en ? 'Which sites they rely on' : 'Z jakich stron korzystają'}</h2>
                  <ul className="narz-chipy">{stan.pelny.zrodla.map((z) => <li key={z.domena}>{z.domena} <span>×{z.ile}</span></li>)}</ul>
                  <p className="narz-mikro">{en ? 'A mention of your business on these sites increases the chance that a model will recommend it.' : 'Wzmianka o firmie na tych stronach zwiększa szansę, że model ją poleci.'}</p>
                </div>
              )}
              <h2 className="narz-h2">{en ? 'Answers' : 'Odpowiedzi'}</h2>
              <ul className="narz-problemy">
                {stan.pelny.wiersze.filter((r) => !r.brakOdpowiedzi).map((r) => (
                  <li key={`${r.silnik}-${r.pytanie}`} className={`narz-problem ${r.wymieniona ? 'narz-problem--ok' : 'narz-problem--blad'}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{etykieta(r.silnik)}</span> · {r.wymieniona ? (en ? 'business mentioned' : 'firma wymieniona') : (en ? 'business not mentioned' : 'firma niewymieniona')}</p>
                    <h3 className="narz-problem-tytul">{r.pytanie}</h3>
                    <p className="narz-problem-opis">{r.fragment ? (en ? `“${r.fragment}”` : `„${r.fragment}”`) : r.odpowiedz.slice(0, 600)}</p>
                    {r.zrodla.length > 0 && <p className="narz-mikro">{en ? 'Sources' : 'Źródła'}: {r.zrodla.join(', ')}</p>}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="narz-mikro">{en ? 'The answers come from the models’ APIs and may differ from what someone sees in the app. They change from day to day.' : 'Odpowiedzi pochodzą z API modeli i mogą różnić się od tego, co ktoś zobaczy w aplikacji. Zmieniają się z dnia na dzień.'}</p>
        </div>
      )}
    </div>
  );
}
