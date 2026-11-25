'use client';

// Formularz i wynik darmowego audytu SEO (/narzedzia/audyt-seo). API: panel /api/narzedzia/audyt-seo.
// Przed e-mailem: ocena 1-100, cztery kategorie, liczby problemów, PageSpeed i 3 najważniejsze
// problemy z instrukcją. Po e-mailu: wszystkie problemy z adresami podstron i raport na skrzynkę.
// 12.11.2026 (S1-poprawki Z-A2, Z-A10, Z-06, agent audyt): linia „Dane:” pod przyciskiem, ?url= wypełnia pole
// (bez startu), przykład do kliknięcia, link do wyniku, mediana pomiarów PSI przy wyniku, ramka z ofertą < 80.
// 12.11.2026 (domknięcie, agent audyt): historia domeny („+6 od audytu z 3.11”, zmiana przy każdej kategorii,
// tylko liczby domeny z panelu) i comiesięczny audyt: osobny, niezaznaczony checkbox po odblokowaniu wyniku,
// POST panel /api/narzedzia/monitoring z id audytu, tym samym e-mailem i zgodą (treść = ZGODA_MONITORINGU w panelu).

import { useEffect, useRef, useState } from 'react';
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
import Zwin from './Zwin';
import { czasWyjscia, przewinDoNarzedzia } from './wyjscie';
import './ruch-b.css';

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

function zbudujFallbackFixPack(domena, urlDocelowy, en) {
  const czysta = String(domena || 'twojafirma.pl').replace(/^www\./i, '');
  let origin = `https://${domena || czysta}`;
  try {
    if (urlDocelowy) origin = new URL(urlDocelowy).origin;
  } catch {
    // zostaje domyslny origin
  }
  const zrodlowyHost = String(domena || '').toLowerCase().startsWith('www.') ? czysta : `www.${czysta}`;
  const tytul = en ? `${czysta} - Services and Solutions` : `${czysta} - oferta i usługi`;
  const opis = en
    ? `Official website of ${czysta}. Explore our services, case studies and contact details.`
    : `Oficjalna strona ${czysta}. Sprawdź zakres usług, realizacje i skontaktuj się z nami.`;
  return {
    headHtml: [
      `<title>${tytul}</title>`,
      `<meta name="description" content="${opis}" />`,
      '<meta name="viewport" content="width=device-width, initial-scale=1" />',
      `<link rel="canonical" href="${origin}/" />`,
      `<meta property="og:title" content="${tytul}" />`,
      `<meta property="og:description" content="${opis}" />`,
      `<meta property="og:url" content="${origin}/" />`,
      '<script type="application/ld+json">',
      JSON.stringify({ '@context': 'https://schema.org', '@type': 'Organization', '@id': `${origin}/#organization`, name: czysta, url: `${origin}/` }, null, 2),
      '</script>',
    ].join('\n'),
    robotsTxt: [
      'User-agent: *',
      'Allow: /',
      '',
      'User-agent: OAI-SearchBot',
      'Allow: /',
      '',
      'User-agent: PerplexityBot',
      'Allow: /',
      '',
      'User-agent: Claude-SearchBot',
      'Allow: /',
      '',
      `Sitemap: ${origin}/sitemap.xml`,
    ].join('\n'),
    redirectsNext: [
      '// next.config.mjs',
      'export default {',
      '  async redirects() {',
      '    return [',
      '      {',
      "        source: '/:path*',",
      `        has: [{ type: 'host', value: '${zrodlowyHost}' }],`,
      `        destination: '${origin}/:path*',`,
      '        permanent: true,',
      '      },',
      '    ];',
      '  },',
      '};',
    ].join('\n'),
  };
}

function wzbogacDemoAudytu(obiekt, zakres, urzadzenie, en) {
  if (!obiekt) return obiekt;
  const domena = obiekt.domena || 'przyklad.pl';
  return {
    ...obiekt,
    zakres: obiekt.zakres ?? zakres,
    urzadzenie: obiekt.urzadzenie ?? urzadzenie,
    stron: zakres === 'strona' ? 1 : obiekt.stron,
    cruxPole: obiekt.cruxPole ?? { lcpMs: 2240, inpMs: 158, cls: 0.05 },
    pikseleTytulu: obiekt.pikseleTytulu ?? 538,
    tytulPrzekracza580Px: obiekt.tytulPrzekracza580Px ?? false,
    przeskokNaglowkow: obiekt.przeskokNaglowkow ?? true,
    fixPack: obiekt.fixPack ?? zbudujFallbackFixPack(domena, obiekt.url, en),
  };
}

function pobierzCsvAudytu(w, problemy, kat, wagi, en) {
  const esc = (v) => {
    const s = String(v ?? '').replace(/\r?\n/g, ' ');
    return /[";,]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
  };
  const sep = en ? ',' : ';';
  const nagl = en
    ? ['Severity', 'Category', 'Issue', 'Affected pages', 'How to fix', 'Sample URLs']
    : ['Waga', 'Kategoria', 'Problem', 'Liczba podstron', 'Jak naprawic', 'Przykladowe adresy'];
  const wiersze = [
    nagl.join(sep),
    ...problemy.map((p) => [
      wagi[p.waga] || p.waga,
      kat[p.kategoria] || p.kategoria,
      p.tytul,
      p.liczba ?? 1,
      p.jakNaprawic,
      (p.strony || []).join(' | '),
    ].map(esc).join(sep)),
  ];
  const blob = new Blob([`\uFEFF${wiersze.join('\r\n')}`], { type: 'text/csv;charset=utf-8' });
  const u = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = u;
  const czysta = String(w.domena || 'strona').replace(/[^a-z0-9.-]/gi, '-');
  a.download = en ? `seo-audit-${czysta}.csv` : `audyt-seo-${czysta}.csv`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(u), 1500);
}

function zbudujMarkdownDlaProgramisty(w, problemy, kat, wagi, en) {
  const domena = w.domenaWyswietlana || w.domena;
  const linie = [
    en ? `# Technical SEO & AI Readiness Audit: ${domena} (${w.wynik}/100)` : `# Audyt techniczny SEO i AI: ${domena} (${w.wynik}/100)`,
    '',
    en
      ? `- Checked pages: ${w.stron} (${w.zakres === 'strona' ? 'single URL' : 'site crawl'}) · Device: ${w.urzadzenie === 'desktop' ? 'Desktop' : 'Mobile'}`
      : `- Sprawdzone podstrony: ${w.stron} (${w.zakres === 'strona' ? 'pojedynczy URL' : 'cała witryna'}) · Urządzenie: ${w.urzadzenie === 'desktop' ? 'Komputer' : 'Telefon'}`,
    '',
    en ? '## Issues to fix (ordered by priority)' : '## Lista zadań dla programisty (według priorytetu)',
    '',
  ];
  if (problemy.length === 0) {
    linie.push(en ? '- No issues detected in the checked scope.' : '- Brak wykrytych problemów w sprawdzonym zakresie.');
  } else {
    for (const p of problemy) {
      linie.push(`- [ ] **[${wagi[p.waga] || p.waga} · ${kat[p.kategoria] || p.kategoria}] ${p.tytul}**`);
      linie.push(`  - ${en ? 'Why' : 'Opis'}: ${p.opis}`);
      linie.push(`  - ${en ? 'Fix' : 'Naprawa'}: ${p.jakNaprawic}`);
      if (p.strony?.length) {
        linie.push(`  - URLs: ${p.strony.slice(0, 8).join(', ')}${p.liczba > p.strony.length ? ` (+${p.liczba - p.strony.length})` : ''}`);
      }
    }
  }
  return `${linie.join('\n')}\n`;
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
      <div className="narz-bramka narz-bramka--gotowe r-stan" role="status">
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
    <form className="narz-bramka" onSubmit={wyslij} aria-labelledby="monitoring-tytul">
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

export default function AudytSeoClient() {
  const en = useLocale() === 'en';
  const kat = en ? KATEGORIE_EN : KATEGORIE;
  const wagi = en ? WAGI_EN : WAGI;
  const [stan, setStan] = useState({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null });
  const [filtr, setFiltr] = useState('wszystkie');
  const [adres, setAdres] = useState('');
  const [zakres, setZakres] = useState('witryna');
  const [urzadzenie, setUrzadzenie] = useState('mobile');
  const [zakladkaFix, setZakladkaFix] = useState('headHtml');
  const [skopiowanoMd, setSkopiowanoMd] = useState(false);
  const [skopiowanoFix, setSkopiowanoFix] = useState(false);
  const [skopiowanoBadge, setSkopiowanoBadge] = useState(false);
  const [badgeNofollow, setBadgeNofollow] = useState(true);
  const [bladObrazkaBadge, setBladObrazkaBadge] = useState(false);
  // Powrót do formularza: wynik najpierw się zwija (Zwin), dopiero potem stan wraca do pustego (anim-narzedzia-b).
  const [wychodzi, setWychodzi] = useState(false);
  const [powrot, setPowrot] = useState(false);
  const pole = useRef(null);
  const naglowekWyniku = useRef(null);
  // Po wyniku fokus idzie na nagłówek listy (formularz zostaje odmontowany, bez tego fokus ląduje na BODY).
  useEffect(() => { if (stan.status === 'done') naglowekWyniku.current?.focus({ preventScroll: true }); }, [stan.status]);
  const emailBramki = useRef('');
  // ?url= tylko wypełnia pole (Z-06); audyt startuje dopiero po kliknięciu (limit IP).
  useParametrUrl(['url'], ({ url }) => setAdres(url));
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
        if (data.tool && data.tool !== 'audyt_seo') return;
        const id = data.id || wynikId;
        const pelny = odczytajOdblokowane(id);
        setAdres((obecny) => obecny || data.podglad.domenaWyswietlana || data.podglad.domena || data.podglad.url || '');
        setStan((s) => (s.status === 'idle' ? {
          status: 'done',
          blad: null,
          id,
          podglad: data.podglad,
          pelny,
          historia: data.historia ?? null,
        } : s));
      } catch {
        // nieudane pobranie wyniku z linku: formularz zostaje gotowy do uruchomienia
      }
    })();
    return () => ctrl.abort();
  }, []);
  const pelnyAudyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';

  async function start(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const url = adres.trim();
    setBladObrazkaBadge(false);
    setStan({ status: 'loading', blad: null, id: null, podglad: null, pelny: null, historia: null });
    zapiszParametry({ url, wynik: null });
    track('narzedzie_start', { narzedzie: 'audyt_seo', zakres, urzadzenie });
    const r = await wywolajNarzedzie('audyt_seo', { url, zakres, urzadzenie, nick: String(fd.get('nick') || ''), lang: en ? 'en' : 'pl' });
    if (!r.ok) return setStan((s) => ({ ...s, status: 'error', blad: r.blad }));
    if (r.id && !DEMO) zapiszParametry({ url, wynik: r.id });
    const podgladGotowy = DEMO ? wzbogacDemoAudytu(r.podglad, zakres, urzadzenie, en) : r.podglad;
    track('narzedzie_wynik', { narzedzie: 'audyt_seo', wynik: podgladGotowy.wynik, zakres, urzadzenie });
    setStan({ status: 'done', blad: null, id: r.id, podglad: podgladGotowy, pelny: odczytajOdblokowane(r.id), historia: r.historia ?? (DEMO ? historiaDemo(podgladGotowy) : null) });
  }

  function wroc() {
    zapiszParametry({ wynik: null });
    setPowrot(true);
    setWychodzi(true);
    setTimeout(() => {
      setStan({ status: 'idle', blad: null, id: null, podglad: null, pelny: null, historia: null });
      setWychodzi(false);
      setFiltr('wszystkie');
      przewinDoNarzedzia();
      setTimeout(() => pole.current?.focus({ preventScroll: true }), 30);
    }, czasWyjscia());
  }

  const w = stan.pelny ?? stan.podglad;
  const cruxPole = w?.cruxPole ?? stan.podglad?.cruxPole ?? null;
  const pikseleTytulu = w?.pikseleTytulu ?? stan.podglad?.pikseleTytulu ?? null;
  const przeskokNaglowkow = w?.przeskokNaglowkow ?? stan.podglad?.przeskokNaglowkow ?? null;
  const urzadzenieWyniku = w?.urzadzenie ?? stan.podglad?.urzadzenie ?? urzadzenie;
  const fixPack = w?.fixPack ?? stan.podglad?.fixPack ?? (w ? zbudujFallbackFixPack(w.domena, w.url, en) : null);
  const odblokowaneNarzedzia = Boolean(stan.pelny) || (stan.podglad?.zablokowane?.length === 0);
  const badgeUrl = w ? `${PANEL_API}/badge/seo-score?domain=${encodeURIComponent(w.domena)}&lang=${en ? 'en' : 'pl'}` : '';
  const stronaAudytuHref = en ? 'https://www.ai-seo-company.pl/en/tools/free-seo-audit' : 'https://www.ai-seo-company.pl/narzedzia/audyt-seo';
  const relBadge = badgeNofollow ? 'nofollow noopener' : 'noopener';
  const kodHtmlBadge = w
    ? `<a href="${stronaAudytuHref}?url=${encodeURIComponent(w.domena)}" target="_blank" rel="${relBadge}"><img src="${badgeUrl}" alt="${en ? `Verified SEO Score ${w.wynik}/100 - ${w.domena}` : `Zweryfikowany wynik Audytu SEO ${w.wynik}/100 - ${w.domena}`}" width="236" height="32" /></a>`
    : '';
  const niesprawdzoneLiczba = Number(w?.niesprawdzoneLiczba ?? stan.podglad?.niesprawdzoneLiczba ?? 0);
  const niesprawdzoneLista = Array.isArray(w?.niesprawdzone) ? w.niesprawdzone : (Array.isArray(stan.podglad?.niesprawdzone) ? stan.podglad.niesprawdzone : []);
  const problemy = stan.pelny ? stan.pelny.problemy : stan.podglad?.problemy ?? [];
  const widoczne = filtr === 'wszystkie' ? problemy : problemy.filter((p) => p.kategoria === filtr);
  // Przy pełnym wyniku bez filtra lista dzieli się na trzy pierwsze (jak w podglądzie) i resztę pod bramką.
  const podzial = Boolean(stan.pelny); // filtry stoją pod trzema pierwszymi problemami, więc położenie listy nie zależy od filtra
  const gora = podzial ? widoczne.slice(0, 3) : widoczne;
  const dol = podzial ? widoczne.slice(3) : [];

  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      {/* Formularz i wynik zajmują tę samą komórkę siatki: podczas przejścia nakładają się (zanikanie i wejście), więc żaden
          z nich nie zmienia położenia drugiego i lista wyniku nie ucieka w dół (CLS). */}
      <div className="narz-faza">
      <Zwin otwarte={stan.status !== 'done'} wejscie={powrot} className="r-zwin--karta">
        <form className="narz-formularz" onSubmit={start}>
          <label htmlFor="audyt-url" className="narz-etykieta">{en ? 'Website address' : 'Adres strony'}</label>
          <input ref={pole} id="audyt-url" name="url" required maxLength={300} aria-invalid={stan.status === 'error' ? 'true' : undefined} aria-describedby={stan.status === 'error' ? 'audyt-blad' : undefined} value={adres} onChange={(e) => setAdres(e.target.value)} placeholder={en ? 'e.g. yourcompany.com' : 'np. twojafirma.pl'} className="narz-pole" inputMode="url" autoComplete="url" />
          <PrzykladAdresu onWybierz={(a) => { setAdres(a); pole.current?.focus(); }} />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem 1rem', alignItems: 'center' }}>
            <div className="narz-filtry" role="group" aria-label={en ? 'Audit scope' : 'Zakres skanowania'} style={{ margin: 0 }}>
              <button type="button" aria-pressed={zakres === 'witryna'} onClick={() => setZakres('witryna')}>
                {en ? 'Full site (up to 25 pages)' : 'Cała witryna (do 25 podstron)'}
              </button>
              <button type="button" aria-pressed={zakres === 'strona'} onClick={() => setZakres('strona')}>
                {en ? 'Single URL only' : 'Tylko ten adres URL'}
              </button>
            </div>
            <div className="narz-filtry" role="group" aria-label={en ? 'PageSpeed device' : 'Urządzenie pomiaru'} style={{ margin: 0 }}>
              <button type="button" aria-pressed={urzadzenie === 'mobile'} onClick={() => setUrzadzenie('mobile')}>
                {en ? 'Mobile' : 'Telefon (Mobile)'}
              </button>
              <button type="button" aria-pressed={urzadzenie === 'desktop'} onClick={() => setUrzadzenie('desktop')}>
                {en ? 'Desktop' : 'Komputer (Desktop)'}
              </button>
            </div>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_audyt_start">
              {stan.status === 'loading' ? (en ? 'Checking…' : 'Sprawdzam…') : (en ? 'Check your site for free' : 'Sprawdź stronę za darmo')}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              disabled={stan.status === 'loading'}
              data-cta="narzedzie_audyt_demo"
              onClick={async () => {
                const mod = await import('@/lib/narzedziaDemo');
                const r = await mod.demoNarzedzia('audyt_seo', { url: adres.trim() || (en ? 'example.com' : 'przyklad.pl'), zakres, urzadzenie, lang: en ? 'en' : 'pl' });
                if (!r?.podglad) return;
                const demoPodglad = wzbogacDemoAudytu({ ...r.podglad, wynik: 91, zablokowane: [] }, zakres, urzadzenie, en);
                track('narzedzie_demo', { narzedzie: 'audyt_seo', lang: en ? 'en' : 'pl' });
                setStan({ status: 'done', blad: null, id: null, podglad: demoPodglad, pelny: demoPodglad, historia: null });
              }}
            >
              {en ? 'Load DEMO audit' : 'Załaduj przykładowy audyt DEMO'}
            </button>
          </div>
          <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" className="narz-pulapka" />
          <p className="narz-mikro">{en
            ? `No sign-up. Up to ${AUDYT.limitIp} audits per day from one IP address. An audit usually takes 20 to 90 seconds. Data: our AISEOCompanyAudit crawler and Google PageSpeed Insights.`
            : `Bez rejestracji. Do ${AUDYT.limitIp} audytów dziennie z jednego adresu IP. Audyt trwa zwykle 20 do 90 sekund. Dane: nasz robot AISEOCompanyAudit i Google PageSpeed Insights.`}</p>
          {en && <p className="narz-mikro">Not sure what you will get? Read an <Link href="/narzedzia/seo-audit-example">SEO audit example</Link>: the finished report for our own website, rule by rule.</p>}
          {stan.status === 'loading' && <Postep kroki={en ? KROKI_EN : KROKI} co={9000} />}
          {stan.status === 'error' && <p id="audyt-blad" role="alert" className="narz-blad">{stan.blad}</p>}
        </form>
      </Zwin>

      <Zwin otwarte={stan.status === 'done' && !wychodzi} className="r-zwin--karta">
      {stan.status === 'done' && w && (
        <div className="narz-wynik" aria-live="polite">
          <div className="narz-wynik-glowa">
            <Ocena wynik={w.wynik} podpis={en ? 'SEO score' : 'ocena SEO'} />
            <div>
              <p className="narz-wynik-domena">{w.domenaWyswietlana || w.domena}</p>
              <p className="narz-wynik-opis">
                {en ? (
                  <>We checked {w.stron} {w.stron === 1 ? 'page' : 'pages'} and found {liczbaProblemowEn(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {w.liczby.bledy} {w.liczby.bledy === 1 ? 'error' : 'errors'}, {w.liczby.ostrzezenia} {w.liczby.ostrzezenia === 1 ? 'warning' : 'warnings'} and {w.liczby.uwagi} {w.liczby.uwagi === 1 ? 'notice' : 'notices'}.</>
                ) : (<>Sprawdziliśmy {odmien(w.stron, ['podstronę', 'podstrony', 'podstron'])}. Znaleźliśmy {liczbaProblemow(w.liczby.bledy + w.liczby.ostrzezenia + w.liczby.uwagi)}: {odmien(w.liczby.bledy, ['błąd', 'błędy', 'błędów'])}, {odmien(w.liczby.ostrzezenia, ['ostrzeżenie', 'ostrzeżenia', 'ostrzeżeń'])} i {odmien(w.liczby.uwagi, ['uwagę', 'uwagi', 'uwag'])}.</>)}
              </p>
              {niesprawdzoneLiczba > 0 && (
                <div className="narz-psi" role="note" style={{ margin: '0.35rem 0 0.6rem' }}>
                  <p style={{ margin: 0 }}>
                    {en
                      ? `We could not fetch ${niesprawdzoneLiczba} ${niesprawdzoneLiczba === 1 ? 'page' : 'pages'} (timeout or connection error), so ${niesprawdzoneLiczba === 1 ? 'it is' : 'they are'} not included in the score.`
                      : `Nie udało się pobrać ${odmien(niesprawdzoneLiczba, ['podstrony', 'podstron', 'podstron'])} (przekroczony limit czasu albo błąd połączenia), więc nie wchodzą do oceny.`}
                  </p>
                  {niesprawdzoneLista.length > 0 && (
                    <details className="narz-problem-strony" style={{ marginTop: '0.25rem' }}>
                      <summary>{en ? `Unchecked URLs (${niesprawdzoneLista.length})` : `Niesprawdzone adresy (${niesprawdzoneLista.length})`}</summary>
                      <ul>{niesprawdzoneLista.map((item, idx) => {
                        const tekst = typeof item === 'string' ? item : `${item.url}${item.powod ? ` (${item.powod})` : ''}`;
                        return <li key={`${idx}-${tekst}`}>{tekst}</li>;
                      })}</ul>
                    </details>
                  )}
                </div>
              )}
              {stan.historia && <Historia h={stan.historia} en={en} />}
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem 1.25rem' }}>
                <button type="button" className="narz-link" onClick={wroc}>{en ? 'Check another site' : 'Sprawdź inną stronę'}</button>
                <LinkWyniku
                  narzedzie="audyt_seo"
                  tryb={stan.id ? 'wynik' : 'wypelnij'}
                  parametry={{ url: adres.trim() || w.domenaWyswietlana || w.domena, ...(stan.id ? { wynik: stan.id } : {}) }}
                  podsumowanie={en
                    ? `SEO audit for ${w.domenaWyswietlana || w.domena}: ${w.wynik}/100 (${w.liczby.bledy} ${w.liczby.bledy === 1 ? 'error' : 'errors'}, ${w.liczby.ostrzezenia} ${w.liczby.ostrzezenia === 1 ? 'warning' : 'warnings'})`
                    : `Audyt SEO ${w.domenaWyswietlana || w.domena}: ${w.wynik}/100 (${odmien(w.liczby.bledy, ['błąd', 'błędy', 'błędów'])}, ${odmien(w.liczby.ostrzezenia, ['ostrzeżenie', 'ostrzeżenia', 'ostrzeżeń'])})`}
                />
              </div>
            </div>
          </div>
          <ul className="narz-kategorie">
            {Object.entries(w.kategorie).map(([k, v]) => (
              <li key={k}>
                {k === 'wydajnosc' && w.wydajnoscZmierzona === false
                  ? <div className="narz-ocena narz-ocena--mala narz-ocena--brak" role="img" aria-label={en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}><span className="narz-ocena-liczba" aria-hidden="true">-</span><span className="narz-ocena-podpis" aria-hidden="true">{en ? 'Performance: not measured' : 'Wydajność: brak pomiaru'}</span></div>
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
              ? <>PageSpeed Insights ({urzadzenieWyniku === 'desktop' ? 'desktop' : 'mobile'}): performance {w.psi.wydajnosc ?? '-'}, SEO {w.psi.seo ?? '-'}, accessibility {w.psi.dostepnosc ?? '-'}, best practices {w.psi.praktyki ?? '-'}.</>
              : <>PageSpeed Insights ({urzadzenieWyniku === 'desktop' ? 'komputer' : 'telefon'}): wydajność {w.psi.wydajnosc ?? '-'}, SEO {w.psi.seo ?? '-'}, dostępność {w.psi.dostepnosc ?? '-'}, dobre praktyki {w.psi.praktyki ?? '-'}.</>}
              {w.psi.przebiegi > 1 && w.psi.wydajnoscPomiary?.length > 1
                ? (en ? ` Performance is the median of ${w.psi.przebiegi} runs (${w.psi.wydajnoscPomiary.join(', ')}).` : ` Wydajność to mediana ${w.psi.przebiegi} pomiarów (${w.psi.wydajnoscPomiary.join(', ')}).`)
                : w.psi.przebiegi === 1 ? (en ? ' Performance comes from a single run; a single run can vary by about 10 points.' : ' Wydajność pochodzi z jednego pomiaru; pojedynczy pomiar może się różnić o ok. 10 punktów.') : null}</p>
          )}
          {cruxPole && (cruxPole.lcpMs != null || cruxPole.inpMs != null || cruxPole.cls != null) && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem 0.75rem', alignItems: 'center', padding: '0.6rem 0.85rem', borderRadius: '12px', background: 'var(--w-papier, #f6f4ef)', fontSize: '0.84rem', fontVariantNumeric: 'tabular-nums' }}>
              <strong style={{ color: 'var(--w-tusz)' }}>
                {en ? 'Chrome CrUX field data (28d):' : 'Dane polowe Chrome CrUX (28 dni):'}
              </strong>
              {cruxPole.lcpMs != null && (
                <span style={{ padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 600, background: cruxPole.lcpMs <= 2500 ? 'rgba(4,120,87,0.12)' : cruxPole.lcpMs <= 4000 ? 'rgba(180,83,9,0.13)' : 'rgba(179,38,30,0.13)', color: cruxPole.lcpMs <= 2500 ? '#047857' : cruxPole.lcpMs <= 4000 ? '#b45309' : '#b3261e' }}>
                  LCP {(cruxPole.lcpMs / 1000).toLocaleString(en ? 'en-US' : 'pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} s
                </span>
              )}
              {cruxPole.inpMs != null && (
                <span style={{ padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 600, background: cruxPole.inpMs <= 200 ? 'rgba(4,120,87,0.12)' : cruxPole.inpMs <= 500 ? 'rgba(180,83,9,0.13)' : 'rgba(179,38,30,0.13)', color: cruxPole.inpMs <= 200 ? '#047857' : cruxPole.inpMs <= 500 ? '#b45309' : '#b3261e' }}>
                  INP {Math.round(cruxPole.inpMs)} ms
                </span>
              )}
              {cruxPole.cls != null && (
                <span style={{ padding: '0.12rem 0.5rem', borderRadius: '999px', fontWeight: 600, background: cruxPole.cls <= 0.1 ? 'rgba(4,120,87,0.12)' : cruxPole.cls <= 0.25 ? 'rgba(180,83,9,0.13)' : 'rgba(179,38,30,0.13)', color: cruxPole.cls <= 0.1 ? '#047857' : cruxPole.cls <= 0.25 ? '#b45309' : '#b3261e' }}>
                  CLS {Number(cruxPole.cls).toLocaleString(en ? 'en-US' : 'pl-PL', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              )}
            </div>
          )}
          {(pikseleTytulu != null || przeskokNaglowkow != null) && (
            <p className="narz-psi" style={{ fontVariantNumeric: 'tabular-nums' }}>
              {pikseleTytulu != null && (
                <span>
                  {en
                    ? `SERP <title> pixel width: ~${pikseleTytulu} px ${pikseleTytulu > 580 ? '(> 580 px - Google may truncate on desktop)' : '(<= 580 px, fits without truncation)'}. `
                    : `Szerokość <title> w SERP: ~${pikseleTytulu} px ${pikseleTytulu > 580 ? '(> 580 px - Google może uciąć tytuł)' : '(<= 580 px, bez ucięcia)'}. `}
                </span>
              )}
              {przeskokNaglowkow != null && (
                <span style={{ color: przeskokNaglowkow ? '#b45309' : undefined, fontWeight: przeskokNaglowkow ? 600 : undefined }}>
                  {przeskokNaglowkow
                    ? (en ? 'Heading hierarchy: skipped level detected (e.g. H1 -> H3).' : 'Hierarchia nagłówków: wykryto przeskok poziomów (np. H1 -> H3).')
                    : (en ? 'Heading hierarchy H1-H6: clean (no skipped levels).' : 'Hierarchia nagłówków H1-H6: poprawna (bez przeskoków).')}
                </span>
              )}
            </p>
          )}

          <h2 className="narz-h2" ref={naglowekWyniku} tabIndex={-1}>{stan.pelny ? (en ? 'All issues' : 'Wszystkie problemy') : (en ? 'Top issues' : 'Najważniejsze problemy')}</h2>
          {/* Po odblokowaniu: pierwsze trzy problemy zostają na miejscu, potwierdzenie i monitoring wchodzą w miejsce bramki,
              a reszta listy pod nimi. Nic nie wstawia się nad listą, więc nic, co widać na ekranie, nie ucieka w dół. */}
          <div className="audyt-lista">
            <ul className="narz-problemy">{gora.map((p) => <KartaProblemu key={p.id} p={p} en={en} />)}</ul>
            {stan.pelny && <Odblokowano newsletter={stan.newsletter} mailOk={stan.mailOk} />}
            {stan.pelny && stan.id && <Monitoring id={stan.id} email={stan.email} domena={w.domena} en={en} />}
            {stan.pelny && (
              <div className="narz-filtry" role="group" aria-label={en ? 'Category filter' : 'Filtr kategorii'}>
                {['wszystkie', ...Object.keys(KATEGORIE)].map((k) => (
                  <button key={k} type="button" aria-pressed={filtr === k} onClick={() => setFiltr(k)}>{k === 'wszystkie' ? (en ? 'All' : 'Wszystkie') : kat[k]}</button>
                ))}
              </div>
            )}
            {dol.length > 0 && <ul className="narz-problemy">{dol.map((p) => <KartaProblemu key={p.id} p={p} en={en} />)}</ul>}
          </div>
          {problemy.length === 0 && <p className="narz-wynik-opis">{en ? 'We found no issues in the scope we checked.' : 'W sprawdzonym zakresie nie znaleźliśmy problemów.'}</p>}

          {!stan.pelny && stan.podglad.zablokowane.length > 0 && (
            <div className="narz-zablokowane" onSubmitCapture={(e) => { if (e.target instanceof HTMLFormElement) emailBramki.current = String(new FormData(e.target).get('email') || '').trim(); }}>
              <ul className="narz-problemy narz-zamglone" aria-hidden="true">
                {stan.podglad.zablokowane.slice(0, 12).map((p) => (
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
                naglowek={en ? `Unlock the remaining ${liczbaProblemowEn(stan.podglad.zablokowane.length)}` : (stan.podglad.zablokowane.length === 1 ? 'Odblokuj pozostały 1 problem' : `Odblokuj pozostałe ${liczbaProblemow(stan.podglad.zablokowane.length)}`)}
                opis={en ? 'We will show the full list here and email you a report you can hand straight to a developer.' : 'Pokażemy pełną listę tutaj i wyślemy raport e-mailem, gotowy do przekazania programiście.'}
                korzysci={en ? ['Every issue with fix instructions', 'The pages each issue affects', 'Priorities: from errors to notices'] : ['Każdy problem z instrukcją naprawy', 'Adresy podstron, których dotyczy', 'Priorytety: od błędów do uwag']}
                przycisk={en ? 'Show the full audit' : 'Pokaż pełny audyt'}
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const email = emailBramki.current;
                  const pelnyGotowy = DEMO ? wzbogacDemoAudytu(pelny, zakres, urzadzenie, en) : pelny;
                  zapiszOdblokowane(stan.id, pelnyGotowy);
                  setStan((s) => ({ ...s, pelny: pelnyGotowy, newsletter, email, mailOk }));
                }}
              />
            </div>
          )}

          {/* Do trzech problemów nic nie jest zablokowane (cały wynik jest na ekranie), więc bramka tylko wysyła raport
              (tylkoRaport, jak w narzędziu autorytetu), a opcja comiesięcznego audytu wchodzi pod nią. Wynik zostaje bez zmian. */}
          {!stan.pelny && stan.podglad.zablokowane.length === 0 && stan.id && (
            <div onSubmitCapture={(e) => { if (e.target instanceof HTMLFormElement) emailBramki.current = String(new FormData(e.target).get('email') || '').trim(); }}>
              <BramkaEmail
                narzedzie="audyt_seo"
                id={stan.id}
                tylkoRaport
                naglowek={en ? 'Send the report by email' : 'Wyślij raport e-mailem'}
                opis={en ? 'The whole result is above. We will email it as a report with fix instructions that you can hand straight to a developer.' : 'Cały wynik masz powyżej. Wyślemy go e-mailem w raporcie z instrukcjami naprawy, gotowym do przekazania programiście.'}
                onOdblokowano={(pelny, newsletter, mailOk) => {
                  const email = emailBramki.current;
                  setStan((s) => ({ ...s, raportWyslany: true, newsletter, email, mailOk }));
                }}
              />
              {stan.raportWyslany && stan.mailOk !== false && <Monitoring id={stan.id} email={stan.email} domena={w.domena} en={en} />}
            </div>
          )}

          {odblokowaneNarzedzia && (
            <div style={{ marginTop: '1.1rem', display: 'grid', gap: '0.75rem' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    pobierzCsvAudytu(w, problemy, kat, wagi, en);
                    track('audyt_export_csv', { domena: w.domena, lang: en ? 'en' : 'pl' });
                  }}
                  data-cta="audyt_export_csv"
                >
                  {en ? 'Download CSV' : 'Pobierz CSV'}
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(zbudujMarkdownDlaProgramisty(w, problemy, kat, wagi, en));
                      setSkopiowanoMd(true);
                      setTimeout(() => setSkopiowanoMd(false), 2600);
                      track('audyt_copy_markdown', { domena: w.domena, lang: en ? 'en' : 'pl' });
                    } catch {
                      // brak schowka
                    }
                  }}
                  data-cta="audyt_copy_markdown"
                >
                  {skopiowanoMd
                    ? (en ? 'Copied Markdown!' : 'Skopiowano Markdown!')
                    : (en ? 'Copy Markdown for developer / Cursor' : 'Kopiuj Markdown dla programisty / Cursor')}
                </button>
              </div>

              {fixPack && (
                <details style={{ border: '1px solid rgba(15,23,42,0.12)', borderRadius: '16px', padding: '0.85rem 1rem', background: 'var(--w-papier, #f6f4ef)', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
                  <summary style={{ cursor: 'pointer', fontWeight: 700, color: 'var(--w-tusz)' }}>
                    {en ? 'Copy-Paste Fix Pack (ready snippets for your site)' : 'Copy-Paste Fix Pack (gotowe bloki kodu do wdrożenia)'}
                  </summary>
                  <div style={{ marginTop: '0.75rem', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '0.6rem', minWidth: 0 }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.5rem' }}>
                      <div className="narz-filtry" role="group" aria-label="Fix Pack" style={{ margin: 0 }}>
                        {[
                          ['headHtml', '<head> + JSON-LD'],
                          ['robotsTxt', 'robots.txt'],
                          ['redirectsNext', 'Next.js Redirects'],
                        ].map(([klucz, etykietaZakl]) => (
                          <button
                            key={klucz}
                            type="button"
                            aria-pressed={zakladkaFix === klucz}
                            onClick={() => { setZakladkaFix(klucz); setSkopiowanoFix(false); }}
                          >
                            {etykietaZakl}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        className="narz-link"
                        onClick={async () => {
                          const kod = fixPack[zakladkaFix] || '';
                          if (!kod) return;
                          try {
                            await navigator.clipboard.writeText(kod);
                            setSkopiowanoFix(true);
                            setTimeout(() => setSkopiowanoFix(false), 2500);
                          } catch {
                            // brak schowka
                          }
                        }}
                      >
                        {skopiowanoFix ? (en ? 'Copied!' : 'Skopiowano!') : (en ? 'Copy code' : 'Kopiuj kod')}
                      </button>
                    </div>
                    <pre style={{ margin: 0, padding: '0.8rem 0.95rem', borderRadius: '12px', background: '#0f172a', color: '#f8fafc', fontSize: '0.78rem', lineHeight: 1.5, overflowX: 'auto', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box', fontFamily: 'var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace)' }}>
                      <code>{fixPack[zakladkaFix] || ''}</code>
                    </pre>
                  </div>
                </details>
              )}
            </div>
          )}

          {w.wynik >= 80 && (
            <div className="narz-bramka" style={{ marginTop: '1.25rem', fontVariantNumeric: 'tabular-nums', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box' }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem' }}>
                <div>
                  <p className="narz-bramka-tytul" style={{ margin: 0 }}>
                    {en ? 'Verified SEO Audit Score' : 'Zweryfikowany wynik Audytu SEO'}
                  </p>
                  <p className="narz-bramka-opis" style={{ margin: '0.25rem 0 0' }}>
                    {en
                      ? `Your domain scored ${w.wynik}/100. Embed this live SVG badge in your footer or README.`
                      : `Twoja domena uzyskała ${w.wynik}/100. Możesz osadzić odznakę SVG w stopce strony lub README.`}
                  </p>
                </div>
                {!DEMO && !bladObrazkaBadge ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={badgeUrl}
                    alt={en ? `Verified SEO Score ${w.wynik}/100` : `Zweryfikowany wynik Audytu SEO ${w.wynik}/100`}
                    width={236}
                    height={32}
                    onError={() => setBladObrazkaBadge(true)}
                    style={{ display: 'block', height: '32px', width: 'auto' }}
                  />
                ) : (
                  <svg width="236" height="32" viewBox="0 0 236 32" role="img" aria-label={`SEO Score ${w.wynik}/100`} style={{ flexShrink: 0 }}>
                    <rect width="236" height="32" rx="8" fill="#101935" />
                    <rect x="152" width="84" height="32" rx="8" fill="#047857" />
                    <rect x="152" width="8" height="32" fill="#047857" />
                    <text x="12" y="20" fill="#ffffff" fontSize="11.5" fontWeight="600" fontFamily="system-ui, sans-serif">AI SEO Audit</text>
                    <text x="194" y="20" textAnchor="middle" fill="#ffffff" fontSize="12" fontWeight="700" fontFamily="system-ui, sans-serif">{`${w.wynik}/100`}</text>
                  </svg>
                )}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center', marginTop: '0.55rem', minWidth: 0, maxWidth: '100%' }}>
                <code style={{ flex: '1 1 260px', minWidth: 0, maxWidth: '100%', boxSizing: 'border-box', padding: '0.45rem 0.65rem', borderRadius: '8px', background: '#ffffff', border: '1px solid rgba(15,23,42,0.12)', fontSize: '0.74rem', fontFamily: 'var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace)', overflowX: 'auto', whiteSpace: 'nowrap' }}>
                  {kodHtmlBadge}
                </code>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(kodHtmlBadge);
                      setSkopiowanoBadge(true);
                      setTimeout(() => setSkopiowanoBadge(false), 2500);
                      track('audyt_badge_copy', { domena: w.domena, wynik: w.wynik });
                    } catch {
                      // brak schowka
                    }
                  }}
                  data-cta="audyt_badge_copy"
                >
                  {skopiowanoBadge ? (en ? 'Copied!' : 'Skopiowano!') : (en ? 'Copy badge HTML' : 'Kopiuj kod odznaki')}
                </button>
              </div>
              <label style={{ display: 'inline-flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.45rem', fontSize: '0.82rem', color: 'var(--w-tusz-2)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={badgeNofollow}
                  onChange={(e) => {
                    setBadgeNofollow(e.target.checked);
                    setSkopiowanoBadge(false);
                  }}
                />
                <span>
                  {en
                    ? 'Include rel="nofollow" (recommended by Google Spam Policies for embedded widgets)'
                    : 'Dodaj atrybut rel="nofollow" (zalecane przez wytyczne Google dla widżetów)'}
                </span>
              </label>
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
      </Zwin>
      </div>
    </div>
  );
}
