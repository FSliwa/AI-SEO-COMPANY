'use client';

// Formularz i wynik darmowego audytu SEO (/narzedzia/audyt-seo). API: panel /api/narzedzia/audyt-seo.
// Przed e-mailem: ocena 1-100, cztery kategorie, liczby problemów, PageSpeed i 3 najważniejsze
// problemy z instrukcją. Po e-mailu: wszystkie problemy z adresami podstron i raport na skrzynkę.
// 12.11.2026 (S1-poprawki Z-A2, Z-A10, Z-06, agent audyt): linia „Dane:” pod przyciskiem, ?url= wypełnia pole
// (bez startu), przykład do kliknięcia, link do wyniku, mediana pomiarów PSI przy wyniku, ramka z ofertą < 80.
// 12.11.2026 (domknięcie, agent audyt): historia domeny („+6 od audytu z 3.11”, zmiana przy każdej kategorii,
// tylko liczby domeny z panelu) i comiesięczny audyt: osobny, niezaznaczony checkbox po odblokowaniu wyniku,
// POST panel /api/narzedzia/monitoring z id audytu, tym samym e-mailem i zgodą (treść = ZGODA_MONITORINGU w panelu).

import { useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { DEMO, PANEL_API, wywolajNarzedzie } from '@/lib/narzedziaApi';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { AUDYT, cena } from '@/lib/narzedziaLiczby';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import BramkaEmail from './BramkaEmail';
import LinkWyniku, { PrzykladAdresu } from './LinkWyniku';
import { Ocena, Odblokowano, PasekDemo, Postep } from './Wspolne';

export const KATEGORIE = { techniczne: 'Techniczne', tresc: 'Treść', wydajnosc: 'Wydajność', ai: 'Gotowość na AI' };
const KATEGORIE_EN = { techniczne: 'Technical', tresc: 'Content', wydajnosc: 'Performance', ai: 'AI readiness' };
const WAGI = { blad: 'Błąd', ostrzezenie: 'Ostrzeżenie', uwaga: 'Uwaga' };
const WAGI_EN = { blad: 'Error', ostrzezenie: 'Warning', uwaga: 'Notice' };
const KROKI_EN = ['Checking the address, HTTPS and redirects', 'Reading robots.txt, the sitemap and llms.txt', 'Crawling your pages (up to 25)', 'Measuring speed with PageSpeed Insights', 'Calculating the score'];
const KROKI = ['Sprawdzamy adres, HTTPS i przekierowania', 'Czytamy robots.txt, mapę strony i llms.txt', 'Przechodzimy po podstronach (do 25)', 'Mierzymy szybkość w PageSpeed Insights', 'Liczymy ocenę'];

function liczbaProblemow(n) {
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return '1 problem';
  return `${n} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? 'problemy' : 'problemów'}`;
}

function odmien(n, [jeden, kilka, wiele]) {
  const d = n % 10;
  const s = n % 100;
  if (n === 1) return `1 ${jeden}`;
  return `${n} ${d >= 2 && d <= 4 && (s < 12 || s > 14) ? kilka : wiele}`;
}

function liczbaProblemowEn(n) {
  return `${n} ${n === 1 ? 'issue' : 'issues'}`;
}

// Treść zgody na comiesięczny audyt: identyczna z ZGODA_MONITORINGU w panelu (lib/narzedzia/monitoring.ts,
// wersja 2026-11-12), bo panel zapisuje ją jako dowód zgody.
const ZGODA_MONITORINGU = { glowna: 'Co miesiąc wyślij mi ponowny audyt tej domeny.', reszta: 'Adres e-mail i domenę przechowujecie do mojej rezygnacji, a zrezygnować mogę jednym kliknięciem w każdej wiadomości.' };
const ZGODA_MONITORINGU_EN = { glowna: 'Send me a new audit of this domain every month.', reszta: 'You keep my email address and the domain until I opt out, and I can opt out with one click in any email.' };

const STREFA = 'Europe/Warsaw';
function dataKrotko(iso, en) {
  const d = new Date(iso);
  const rok = (x) => x.toLocaleDateString('en-GB', { year: 'numeric', timeZone: STREFA });
  const zRokiem = rok(d) !== rok(new Date());
  const dzis = d.toLocaleDateString('en-CA', { timeZone: STREFA }) === new Date().toLocaleDateString('en-CA', { timeZone: STREFA });
  const godzina = dzis ? `, ${d.toLocaleTimeString(en ? 'en-GB' : 'pl-PL', { hour: '2-digit', minute: '2-digit', timeZone: STREFA })}` : '';
  return en
    ? `${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', ...(zRokiem ? { year: 'numeric' } : {}), timeZone: STREFA })}${godzina}`
    : `${d.toLocaleDateString('pl-PL', { day: 'numeric', month: 'numeric', ...(zRokiem ? { year: 'numeric' } : {}), timeZone: STREFA })}${godzina}`;
}
const dataPelna = (iso, en) => new Date(iso).toLocaleDateString(en ? 'en-GB' : 'pl-PL', { day: 'numeric', month: 'long', year: 'numeric', timeZone: STREFA });
const znak = (n) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : '0');
const kolorZmiany = (n) => (n > 0 ? 'var(--n-ok)' : n < 0 ? 'var(--n-zle)' : 'var(--w-tusz-2)');

/** „+6 od audytu z 3.11 (było 72)”: poprzedni audyt tej domeny, z panelu (tylko liczby domeny). */
function Historia({ h, en }) {
  const kiedy = dataKrotko(h.data, en);
  const tekst = h.zmiana === 0
    ? (en ? `No change since the audit on ${kiedy}` : `Bez zmian od audytu z ${kiedy}`)
    : en ? `${znak(h.zmiana)} since the audit on ${kiedy}` : `${znak(h.zmiana)} od audytu z ${kiedy}`;
  return (
    <p className="narz-psi" style={{ margin: '0.35rem 0 0.6rem' }}>
      <strong style={{ color: kolorZmiany(h.zmiana) }}>{tekst}</strong> {en ? `(it was ${h.wynik}/100).` : `(było ${h.wynik}/100).`}
      {!h.wydajnoscPorownywalna && (en ? ' One of the audits had no PageSpeed measurement, so we do not compare performance.' : ' W jednym z audytów zabrakło pomiaru PageSpeed, więc wydajności nie porównujemy.')}
    </p>
  );
}

// Tryb demo (lokalny podgląd bez panelu): przykładowa historia, żeby było widać układ.
function historiaDemo(podglad) {
  const kategorie = Object.fromEntries(Object.entries(podglad.kategorie).map(([k, v], i) => [k, { wynik: v.wynik - [4, 9, 2, 6][i % 4], zmiana: [4, 9, 2, 6][i % 4] }]));
  return { data: new Date(Date.now() - 9 * 864e5).toISOString(), wynik: podglad.wynik - 6, zmiana: 6, kategorie, wydajnoscPorownywalna: true };
}

async function wlaczMonitoring(body) {
  const en = body.lang === 'en';
  if (DEMO) return { ok: true, status: 'oczekuje', wygasa: new Date(Date.now() + 7 * 864e5).toISOString() };
  try {
    const res = await fetch(`${PANEL_API}/monitoring`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.ok) return { ok: false, blad: data.error || (en ? 'Something went wrong. Please try again in a moment.' : 'Nie udało się. Spróbuj za chwilę.') };
    return data;
  } catch {
    return { ok: false, blad: en ? 'Could not reach the tool server. Check your connection and try again.' : 'Brak połączenia z serwerem narzędzia. Sprawdź internet i spróbuj ponownie.' };
  }
}

/** Po odblokowaniu: osobny, niezaznaczony checkbox „Co miesiąc wyślij mi ponowny audyt tej domeny”. */
function Monitoring({ id, email, domena, en }) {
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null });
  const [adres, setAdres] = useState(email || '');
  const zgoda = en ? ZGODA_MONITORINGU_EN : ZGODA_MONITORINGU;

  async function wyslij(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    if (fd.get('monitoring') !== 'on') return;
    setStan({ status: 'loading', blad: null, wynik: null });
    const r = await wlaczMonitoring({ id, email: adres.trim(), zgoda: true, lang: en ? 'en' : 'pl', nick: String(fd.get('nick') || '') });
    if (!r.ok) return setStan({ status: 'error', blad: r.blad, wynik: null });
    track('monitoring_wlaczony', { narzedzie: 'audyt_seo', status: r.status || 'oczekuje' });
    setStan({ status: 'done', blad: null, wynik: r });
  }

  if (stan.status === 'done') {
    // Double opt-in: panel odpowiada „oczekuje” (mail z linkiem potwierdzenia, ważny 7 dni) albo „juz” (aktywny).
    const juz = stan.wynik.status === 'juz';
    const kiedy = dataPelna(juz ? stan.wynik.nastepny : stan.wynik.wygasa, en);
    return (
      <div className="narz-bramka narz-bramka--gotowe" role="status" style={{ marginTop: '1rem' }}>
        <p className="narz-bramka-tytul">{juz
          ? (en ? `The monthly audit of ${domena} was already on for this address.` : `Comiesięczny audyt domeny ${domena} był już włączony dla tego adresu.`)
          : (en ? 'One more step: confirm it in your email.' : 'Jeszcze jeden krok: potwierdź w e-mailu.')}</p>
        <p className="narz-bramka-opis">{juz
          ? (en ? `Next audit: ${kiedy}. Every email has a one-click link to turn it off.` : `Kolejny audyt: ${kiedy}. W każdym mailu jest link, którym wyłączysz go jednym kliknięciem.`)
          : (en ? `We have sent a link to confirm the monthly audit of ${domena}. Click it by ${kiedy}: the audits start only after you confirm, and the first one comes a month later. Check your spam folder too.` : `Wysłaliśmy link do potwierdzenia comiesięcznego audytu domeny ${domena}. Kliknij go do ${kiedy}: audyty ruszą dopiero po potwierdzeniu, a pierwszy przyjdzie miesiąc później. Zajrzyj też do spamu.`)}</p>
      </div>
    );
  }

  return (
    <form className="narz-bramka" onSubmit={wyslij} style={{ marginTop: '1rem' }} aria-labelledby="monitoring-tytul">
      <div>
        <p id="monitoring-tytul" className="narz-bramka-tytul">{en ? 'Want to see whether the score improves?' : 'Chcesz wiedzieć, czy ocena rośnie?'}</p>
        <p className="narz-bramka-opis">{en
          ? 'Once a month we will audit this domain again and email you the score with the change since the previous audit, plus the issues that are new and the ones you have fixed.'
          : 'Raz w miesiącu ponownie sprawdzimy tę domenę i wyślemy ocenę ze zmianą od poprzedniego audytu oraz listę nowych i naprawionych problemów.'}</p>
      </div>
      {!email && (
        <div className="narz-bramka-wiersz">
          <label htmlFor="monitoring-email" className="sr-only">{en ? 'Email address' : 'Adres e-mail'}</label>
          <input id="monitoring-email" type="email" required maxLength={200} autoComplete="email" inputMode="email" value={adres} onChange={(e) => setAdres(e.target.value)} placeholder={en ? 'The email you unlocked the result with' : 'E-mail, którym odblokowałeś wynik'} className="narz-pole" />
        </div>
      )}
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
      <label className="narz-zgoda narz-zgoda--newsletter">
        <input type="checkbox" name="monitoring" required />
        <span><strong>{zgoda.glowna}</strong> {zgoda.reszta}</span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1rem' }}>
        <button type="submit" className="btn btn-secondary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_monitoring">
          {stan.status === 'loading' ? (en ? 'Sending…' : 'Wysyłam…') : (en ? 'Turn on the monthly audit' : 'Włącz comiesięczny audyt')}
        </button>
        {email && <span className="narz-bramka-mikro">{en ? `We will send it to ${email}.` : `Wyślemy na ${email}.`}</span>}
      </div>
      {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
    </form>
  );
}

function KartaProblemu({ p, en }) {
  const wagi = en ? WAGI_EN : WAGI;
  const kat = en ? KATEGORIE_EN : KATEGORIE;
  return (
    <li className={`narz-problem narz-problem--${p.waga}`}>
      <p className="narz-problem-meta"><span className="narz-waga">{wagi[p.waga]}</span> · {kat[p.kategoria]}{p.liczba > 1 ? ` · ${en ? `${p.liczba} pages` : odmien(p.liczba, ['podstrona', 'podstrony', 'podstron'])}` : ''}</p>
      <h3 className="narz-problem-tytul">{p.tytul}</h3>
      <p className="narz-problem-opis">{p.opis}</p>
      <p className="narz-problem-fix"><strong>{en ? 'How to fix it:' : 'Jak naprawić:'}</strong> {p.jakNaprawic}</p>
      {p.strony?.length > 0 && (
        <details className="narz-problem-strony">
          <summary>{en ? 'URLs' : 'Adresy'} ({p.strony.length}{p.liczba > p.strony.length ? ` ${en ? 'of' : 'z'} ${p.liczba}` : ''})</summary>
          <ul>{p.strony.map((u) => <li key={u}>{u}</li>)}</ul>
        </details>
      )}
    </li>
  );
}

export default function AudytSeoClient() {
  const en = useLocale() === 'en';
  const kat = en ? KATEGORIE_EN : KATEGORIE;
  const wagi = en ? WAGI_EN : WAGI;
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null });
  const [filtr, setFiltr] = useState('wszystkie');
  const [adres, setAdres] = useState('');
  const pole = useRef(null);
  // Adres z bramki e-mail (BramkaEmail go nie zwraca): odczyt z formularza w chwili wysłania, do monitoringu.
  const emailBramki = useRef('');
  // ?url= tylko wypełnia pole (Z-06); audyt startuje dopiero po kliknięciu (limit IP).
  useParametrUrl(['url'], ({ url }) => setAdres(url));
  const pelnyAudyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = adres.trim();
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, historia: null });
    zapiszParametry({ url });
    track('narzedzie_start', { narzedzie: 'audyt_seo' });
    const r = await wywolajNarzedzie('audyt_seo', { url, nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' });
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    track('narzedzie_wynik', { narzedzie: 'audyt_seo', wynik: r.podglad.wynik });
    setStan({ status: 'done', blad: null, id: r.id, podglad: r.podglad, pelny: null, historia: r.historia ?? (DEMO ? historiaDemo(r.podglad) : null) });
  }

  const w = stan.pelny ?? stan.podglad;
  const problemy = stan.pelny ? stan.pelny.problemy : stan.podglad?.problemy ?? [];
  const widoczne = filtr === 'wszystkie' ? problemy : problemy.filter((p) => p.kategoria === filtr);

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {stan.status !== 'done' && (
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="audyt-url" className="narz-etykieta">{en ? 'Website address' : 'Adres strony'}</label>
          <div className="narz-bramka-wiersz">
            <input ref={pole} id="audyt-url" name="url" required maxLength={300} value={adres} onChange={(e) => setAdres(e.target.value)} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_start">
              {stan.status === 'loading' ? (en ? 'Checking…' : 'Sprawdzam…') : (en ? 'Check your site for free' : 'Sprawdź stronę za darmo')}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <PrzykladAdresu onWybierz={(a) => { setAdres(a); pole.current?.focus(); }} />
          <p className="narz-mikro">{en
            ? `No sign-up. Up to ${AUDYT.limitIp} audits per day from one IP address. An audit usually takes 20 to 90 seconds. Data: our AISEOCompanyAudit crawler and Google PageSpeed Insights.`
            : `Bez rejestracji. Do ${AUDYT.limitIp} audytów dziennie z jednego adresu IP. Audyt trwa zwykle 20 do 90 sekund. Dane: nasz robot AISEOCompanyAudit i Google PageSpeed Insights.`}</p>
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={9000} />}
          {stan.status === 'error' && <p role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      )}

      {stan.status === 'done' && w && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={w.wynik} podpis={en ? 'SEO score' : 'ocena SEO'} />
            <div>
              <p className="narz-wynik-domena">{w.domena}</p>
              <p className="narz-wynik-opis">
                {en ? (
                  <>We checked {w.stron} {w.stron === 1 ? 'page' : 'pages'} and found {liczbaProblemowEn(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {w.liczby.bledy} {w.liczby.bledy === 1 ? 'error' : 'errors'}, {w.liczby.ostrzezenia} {w.liczby.ostrzezenia === 1 ? 'warning' : 'warnings'} and {w.liczby.uwagi} {w.liczby.uwagi === 1 ? 'notice' : 'notices'}.</>
                ) : (<>Sprawdziliśmy {odmien(w.stron, ['podstronę', 'podstrony', 'podstron'])}. Znaleźliśmy {liczbaProblemow(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {odmien(w.liczby.bledy, ['błąd', 'błędy', 'błędów'])}, {odmien(w.liczby.ostrzezenia, ['ostrzeżenie', 'ostrzeżenia', 'ostrzeżeń'])} i {odmien(w.liczby.uwagi, ['uwagę', 'uwagi', 'uwag'])}.</>)}
              </p>
              {stan.historia && <Historia h={stan.historia} en={en} />}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'baseline', gap: '0.4rem 1.5rem' }}>
                <button type="button" className="narz-link" onClick={() => setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null })}>{en ? 'Check another site' : 'Sprawdź inną stronę'}</button>
                <LinkWyniku narzedzie="audyt_seo" parametry={{ url: adres.trim() || w.domena }} />
              </div>
            </div>
          </div>
          <ul className="narz-kategorie">
            {Object.entries(w.kategorie).map(([k, v]) => (
              <li key={k}>
                {k === 'wydajnosc' && w.wydajnoscZmierzona === false
                  ? <div className="narz-ocena narz-ocena--mala narz-ocena--brak" role="img" aria-label={en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}><span className="narz-ocena-liczba" aria-hidden="true">–</span><span className="narz-ocena-podpis" aria-hidden="true">{en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}</span></div>
                  : <Ocena wynik={v.wynik} podpis={kat[k]} maly />}
                {stan.historia?.kategorie?.[k]?.zmiana != null && (
                  <span className="narz-psi" style={{ fontWeight: 700, color: kolorZmiany(stan.historia.kategorie[k].zmiana) }} aria-label={en ? `Change since the previous audit: ${znak(stan.historia.kategorie[k].zmiana)}` : `Zmiana od poprzedniego audytu: ${znak(stan.historia.kategorie[k].zmiana)}`}>
                    {stan.historia.kategorie[k].zmiana === 0 ? (en ? 'no change' : 'bez zmian') : znak(stan.historia.kategorie[k].zmiana)}
                  </span>
                )}
              </li>
            ))}
          </ul>
          {w.wydajnoscZmierzona === false && <p className="narz-psi">{en ? 'The PageSpeed Insights speed measurement was temporarily unavailable, so performance is not included in the score.' : 'Pomiar szybkości z PageSpeed Insights był chwilowo niedostępny, więc wydajność nie wchodzi do oceny.'}</p>}
          {w.psi && (
            <p className="narz-psi">{en
              ? <>PageSpeed Insights (mobile): performance {w.psi.wydajnosc ?? '–'}, SEO {w.psi.seo ?? '–'}, accessibility {w.psi.dostepnosc ?? '–'}, best practices {w.psi.praktyki ?? '–'}.</>
              : <>PageSpeed Insights (telefon): wydajność {w.psi.wydajnosc ?? '–'}, SEO {w.psi.seo ?? '–'}, dostępność {w.psi.dostepnosc ?? '–'}, dobre praktyki {w.psi.praktyki ?? '–'}.</>}
              {w.psi.przebiegi > 1 && w.psi.wydajnoscPomiary?.length > 1
                ? (en ? ` Performance is the median of ${w.psi.przebiegi} runs (${w.psi.wydajnoscPomiary.join(' and ')}).` : ` Wydajność to mediana ${w.psi.przebiegi} pomiarów (${w.psi.wydajnoscPomiary.join(' i ')}).`)
                : w.psi.przebiegi === 1 ? (en ? ' Performance comes from a single run; a single run can vary by about 10 points.' : ' Wydajność pochodzi z jednego pomiaru; pojedynczy pomiar może się różnić o ok. 10 punktów.') : null}</p>
          )}

          {stan.pelny && <Odblokowano newsletter={stan.newsletter} />}
          {stan.pelny && stan.id && <Monitoring id={stan.id} email={stan.email} domena={w.domena} en={en} />}
          <h2 className="narz-h2">{stan.pelny ? (en ? 'All issues' : 'Wszystkie problemy') : (en ? 'Top issues' : 'Najważniejsze problemy')}</h2>
          {stan.pelny && (
            <div className="narz-filtry" role="group" aria-label={en ? 'Category filter' : 'Filtr kategorii'}>
              {['wszystkie', ...Object.keys(KATEGORIE)].map((k) => (
                <button key={k} type="button" aria-pressed={filtr === k} onClick={() => setFiltr(k)}>{k === 'wszystkie' ? (en ? 'All' : 'Wszystkie') : kat[k]}</button>
              ))}
            </div>
          )}
          <ul className="narz-problemy">{widoczne.map((p) => <KartaProblemu key={p.id} p={p} en={en} />)}</ul>
          {problemy.length === 0 && <p className="narz-wynik-opis">{en ? 'We found no issues in the scope we checked.' : 'W sprawdzonym zakresie nie znaleźliśmy problemów.'}</p>}

          {!stan.pelny && stan.podglad.zablokowane.length > 0 && (
            <div className="narz-zablokowane" onSubmitCapture={(e) => { if (e.target instanceof HTMLFormElement) emailBramki.current = String(new FormData(e.target).get('email') || '').trim(); }}>
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {stan.podglad.zablokowane.slice(0, 4).map((p) => (
                  <li key={p.id} className={`narz-problem narz-problem--${p.waga}`}>
                    <p className="narz-problem-meta"><span className="narz-waga">{wagi[p.waga]}</span> · {kat[p.kategoria]}</p>
                    <p className="narz-problem-tytul narz-atrapa">{en ? 'Issue description and fix instructions' : 'Opis problemu i instrukcja naprawy'}</p>
                    <p className="narz-problem-opis narz-atrapa">{en ? 'URLs of the pages affected by this issue' : 'Adresy podstron, których dotyczy ten problem'}</p>
                  </li>
                ))}
              </ul>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                naglowek={en ? `Unlock the remaining ${liczbaProblemowEn(stan.podglad.zablokowane.length)}` : `Odblokuj pozostałe ${liczbaProblemow(stan.podglad.zablokowane.length)}`}
                opis={en ? 'We will show the full list here and email you a report you can hand straight to a developer.' : 'Pokażemy pełną listę tutaj i wyślemy raport e-mailem, gotowy do przekazania programiście.'}
                korzysci={en ? ['Every issue with fix instructions', 'The pages each issue affects', 'Priorities: from errors to notices'] : ['Każdy problem z instrukcją naprawy', 'Adresy podstron, których dotyczy', 'Priorytety: od błędów do uwag']}
                przycisk={en ? 'Show the full audit' : 'Pokaż pełny audyt'}
                onOdblokowano={(pelny, newsletter) => {
                  const email = emailBramki.current;
                  setStan((s) => ({ ...s, pelny, newsletter, email }));
                }}
              />
            </div>
          )}

          {w.wynik < 80 && (
            <div className="narz-bramka" style={{ marginTop: '1.5rem' }}>
              <p className="narz-bramka-tytul">{en ? 'Want every error fixed in the right order?' : 'Chcesz naprawić błędy we właściwej kolejności?'}</p>
              <p className="narz-bramka-opis">{en
                ? `A score below 80 means there are problems that limit your visibility. In an SEO audit (from ${cena('audytSeo', 'en')} net) you get every error with a priority and instructions for a developer.`
                : `Ocena poniżej 80 oznacza problemy, które ograniczają widoczność. W audycie SEO (od ${cena('audytSeo')} netto) dostajesz każdy błąd z priorytetem i instrukcją dla programisty.`}</p>
              <p style={{ margin: '0.75rem 0 0' }}><Link href={pelnyAudyt} className="btn btn-secondary" data-cta="audyt_wynik_oferta">{en ? 'See what the SEO audit covers' : 'Zobacz zakres audytu SEO'}</Link></p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
