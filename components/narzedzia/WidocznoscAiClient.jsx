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

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { wywolajNarzedzie } from '@/lib/narzedziaApi';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { WIDOCZNOSC, listaSilnikow } from '@/lib/narzedziaLiczby';
import BramkaEmail from './BramkaEmail';
import LinkWyniku from './LinkWyniku';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

const PYTAMY = WIDOCZNOSC.grok ? ['ChatGPT, Gemini, Perplexity, Claude and Grok', 'ChatGPT, Gemini, Perplexity, Claude i Grok'] : ['ChatGPT, Gemini, Perplexity and Claude', 'ChatGPT, Gemini, Perplexity i Claude'];
const KROKI_EN = ['Drafting 3 questions like your customers ask', `Asking ${PYTAMY[0]}`, 'Checking Google AI Overviews', 'Looking for your business in the answers and sources'];
const KROKI = ['Układamy 3 pytania, jakie zadają Twoi klienci', `Pytamy ${PYTAMY[1]}`, 'Sprawdzamy przegląd AI w Google', 'Szukamy Twojej firmy w odpowiedziach i źródłach'];

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
  const formRef = useRef(null);

  // Z-06: ?firma= (albo ?marka=), ?branza=, ?miasto=, ?url= (strona www) tylko wypełniają pola.
  useParametrUrl(['firma', 'marka', 'branza', 'miasto', 'url'], (w) => {
    const pola = { firma: w.firma ?? w.marka, branza: w.branza, miasto: w.miasto, www: w.url };
    const f = formRef.current;
    for (const [k, v] of Object.entries(pola)) if (v && f?.elements[k]) f.elements[k].value = v.slice(0, Number(f.elements[k].maxLength) > 0 ? Number(f.elements[k].maxLength) : 200);
  });

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = { firma: String(fd.get('firma') || ''), branza: String(fd.get('branza') || ''), miasto: String(fd.get('miasto') || ''), www: String(fd.get('www') || ''), nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' };
    const dane = { firma: body.firma.trim(), branza: body.branza.trim(), miasto: body.miasto.trim() || null, url: body.www.trim() || null };
    zapiszParametry(dane);
    setWstepne({ firma: body.firma, branza: body.branza, miasto: body.miasto, www: body.www });
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, dane });
    track('ai_check_start', { city: body.miasto });
    const r = await wywolajNarzedzie('widocznosc_ai', body, 295_000);
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'widocznosc_ai', wynik: r.podglad.wynik });
    setStan((s) => ({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null, dane: s.dane }));
  }

  const p = stan.podglad;
  const etykieta = (id) => p?.silniki.find((s) => s.id === id)?.etykieta ?? id;
  const top = (p?.konkurenciTop ?? []).slice(0, WIDOCZNOSC.przedBramka.firm);
  const topZr = (p?.zrodlaTop ?? []).slice(0, WIDOCZNOSC.przedBramka.domen);
  const resztaFirm = Math.max(0, (p?.konkurentow ?? 0) - top.length);
  const resztaZrodel = Math.max(0, (p?.zrodel ?? 0) - topZr.length);
  return (
    <div className="narz-app" id="narzedzie" style={{ marginTop: '1.25rem' }}>
      <PasekDemo />
      {stan.status !== 'done' && (
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
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="ai_check_submit">
              {stan.status === 'loading' ? (en ? 'Asking the AI models… (up to 2 min)' : 'Pytamy modele AI… (do 2 min)') : (en ? 'Check your AI visibility for free' : 'Sprawdź widoczność w AI za darmo')}
            </button>
          </div>
          <p className="narz-mikro">{liniaNaZywo(en)}</p>
          <p className="narz-mikro"><span id="ai-miasto-opis">{en ? 'No city = we ask about all of Poland. ' : 'Bez miasta pytamy o całą Polskę. '}</span><span id="ai-www-opis">{en ? 'If you add a page in English (e.g. company.com/en), we build one of the 3 questions from its title and description.' : 'Z tytułu i opisu podanej strony spróbujemy ułożyć jedno z 3 pytań.'}</span></p>
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
                <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, dane: null })}>{en ? 'Check another business' : 'Sprawdź inną firmę'}</button>
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
          <details className="narz-pytania">
            <summary>{en ? 'Questions we asked' : 'Jakie pytania zadaliśmy'}</summary>
            <ol>{p.pytania.map((q, i) => <li key={q}>{q}{p.zrodloPytan?.[i] === 'strona' && <span className="narz-mikro"> {en ? '(from your website)' : '(z treści Twojej strony)'}</span>}</li>)}</ol>
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
                onOdblokowano={(pelny, newsletter) => setStan((s) => ({ ...s, pelny, newsletter }))}
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
