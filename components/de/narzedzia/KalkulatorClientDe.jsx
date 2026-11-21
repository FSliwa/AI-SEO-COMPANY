'use client';

// Deutscher SEO- und KI-Sichtbarkeits-Verlustrechner (/de/tools/seo-verlustrechner).
// Rechnet komplett im Browser in Euro (EUR) auf Basis der einheitenunabhängigen Modellfunktionen
// aus lib/kalkulatorStrat.js (policzStraty, policzZwrot).
// Enthält DACH-Branchenbeispiele in EUR, Online-Shop-Modus sowie die ROI- und Amortisationsrechnung
// mit unseren EUR-Paketen aus lib/narzedziaLiczby.js (450 € / 590 € netto) oder eigenem Budget (200 bis 25.000 €).

import { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { SKLEP, ZALOZENIA, ZWROT, policzStraty, policzZwrot } from '@/lib/kalkulatorStrat';
import { BEISPIELE_DE, KOSZT_WLASNY_EUR } from '@/lib/kalkulatorStrat.de';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur, liczba as fmtDe } from '@/lib/formatDe';
import { maWersjeDe } from '@/lib/stronyDe';
import { WALID_DE } from '@/lib/walidacjaDe';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { zachowaniePrzewijania } from '@/lib/ruch';
import { BramkaEmail, LinkWyniku, PasekDemo } from './WspolneDe';
import Zwin from '@/components/narzedzia/Zwin';
import { czasTokenu } from '@/components/narzedzia/wyjscie';
import '@/components/narzedzia/ruch-b.css';

const LISTA_BEISPIELE = Object.values(BEISPIELE_DE);
const DOMYSLNY_PRZYKLAD = BEISPIELE_DE.handwerk;
const PRZYKLAD_SKLEP = BEISPIELE_DE.shop;

const PAKIETY = ['seoStandard', 'seoPremium', 'boosterPack'];
const NAZWY_PAKIETOW = {
  seoStandard: 'SEO Standard',
  seoPremium: 'SEO Premium',
  boosterPack: 'Booster Pack',
};

// Parst deutsche Zahleneingaben: Komma als Dezimaltrennzeichen ("1,3" -> 1.3, "1.250,50" -> 1250.5),
// Tausenderpunkte ("2.400" -> 2400) oder Schweizer Hochkomma ("12'000" -> 12000) sowie URL-Punkte ("1.3" -> 1.3).
function liczbaDe(v) {
  const s = String(v ?? '').trim().replace(/[\s\u00A0']/g, '');
  if (!s) return NaN;
  if (s.includes(',')) return Number(s.replace(/\./g, '').replace(',', '.'));
  if (/^\d{1,3}(\.\d{3})+$/.test(s)) return Number(s.replace(/\./g, ''));
  return Number(s);
}

const podpDe = (n) => String(n).replace('.', ',');

const POLA_DE = [
  {
    k: 'wyszukiwania',
    etykieta: 'Wie oft suchen potenzielle Kunden Ihre Leistung pro Monat bei Google?',
    pomoc: 'Summe Ihrer wichtigsten Haupt-Keywords, z. B. „Zahnarzt Implantate München“ oder „CNC-Fertigung Lohnarbeit“. Prüfbar im Google Ads Keyword Planner.',
    przyklad: '2.400',
  },
  {
    k: 'ruch',
    etykieta: 'Wie viele organische Google-Besuche erhalten Sie heute pro Monat?',
    pomoc: 'Unbezahlte Klicks aus Google Search Console oder GA4 (ohne Google Ads). Nicht bekannt? Tragen Sie 0 ein.',
    przyklad: '35',
  },
  {
    k: 'konwersja',
    etykieta: 'Wie viel Prozent der Besucher werden zu Kunden?',
    pomoc: 'Abschlüsse oder qualifizierte Aufträge geteilt durch Website-Besuche in Prozent.',
    przyklad: '2,5',
    jednostka: '%',
  },
  {
    k: 'wartosc',
    etykieta: 'Durchschnittlicher Kunden- oder Auftragswert (netto)',
    pomoc: 'Was ein gewonnener Kunde im Durchschnitt einbringt (Einzelauftrag oder Mandatswert).',
    przyklad: '4.200',
    jednostka: '€',
  },
  {
    k: 'marza',
    etykieta: 'Gewinnmarge (Deckungsbeitrag)',
    pomoc: 'Welcher Anteil vom Umsatz als Gewinn im Unternehmen bleibt. 100 % = der Rechner zeigt den reinen Umsatzverlust.',
    przyklad: '35',
    jednostka: '%',
  },
];

const POLA_SKLEP_DE = [
  {
    k: 'wyszukiwania',
    etykieta: 'Wie oft suchen Kunden Ihre Produkte und Kategorien pro Monat bei Google?',
    pomoc: 'Summe der monatlichen Suchanfragen Ihrer Kategorie- und Produkt-Keywords im DACH-Raum (Google Ads Keyword Planner).',
    przyklad: '30.000',
  },
  {
    k: 'ruch',
    etykieta: 'Wie viele organische Google-Besuche hat Ihr Shop heute pro Monat?',
    pomoc: 'Unbezahlter Suchtraffic aus Google Search Console oder GA4 ohne Shopping-Anzeigen. Unbekannt? Tragen Sie 0 ein.',
    przyklad: '500',
  },
  {
    k: 'konwersja',
    etykieta: 'Conversion-Rate Ihres Online-Shops',
    pomoc: 'Bestellungen geteilt durch Sitzungen in Prozent. Orientierungswert: Der Median über 450 Shopify-Shops in GA4 liegt bei 1,3 % (Littledata, Aug. bis Nov. 2026).',
    przyklad: podpDe(PRZYKLAD_SKLEP.konwersja),
    jednostka: '%',
  },
  {
    k: 'wartosc',
    etykieta: 'Durchschnittlicher Bestellwert / Warenkorb (netto)',
    pomoc: 'Shop-Umsatz geteilt durch die Anzahl der Bestellungen laut Shop-Backend oder GA4.',
    przyklad: String(PRZYKLAD_SKLEP.wartosc),
    jednostka: '€',
  },
  {
    k: 'marza',
    etykieta: 'Bruttomarge (Handelsspanne)',
    pomoc: 'Verkaufspreis abzüglich Wareneinsatz in Prozent. Möchten Sie Versand, Retouren und Zahlungsgebühren abziehen, tragen Sie die bereinigte Marge ein. 100 % = reiner Umsatz.',
    przyklad: String(PRZYKLAD_SKLEP.marza),
    jednostka: '%',
  },
  {
    k: 'powroty',
    etykieta: 'Wie viel Prozent der Neukunden bestellen erneut? (optional)',
    pomoc: 'Anteil der Kunden mit mindestens zwei Bestellungen pro Jahr. Wir rechnen konservativ eine Zusatzbestellung pro Wiederkäufer ein. Leer = nur Erstbestellung.',
    przyklad: String(PRZYKLAD_SKLEP.powroty),
    jednostka: '%',
  },
];

// Gleiche numerische Grenzen wie bladDanych in lib/kalkulatorStrat.js, aber mit deutschen EUR-Meldungen.
function bladDanychDe(w) {
  const sklep = w.tryb === 'sklep';
  const ok = (v, a, b) => Number.isFinite(v) && v >= a && v <= b;
  const powrotyZle = sklep && w.powroty !== undefined && !ok(w.powroty, SKLEP.powroty.min, SKLEP.powroty.max);
  if (!ok(w.wyszukiwania, 1, 10_000_000) || !Number.isInteger(w.wyszukiwania)) {
    return 'Bitte geben Sie die monatlichen Suchanfragen ein (ganze Zahl, mindestens 1).';
  }
  if (!ok(w.ruch, 0, 10_000_000) || !Number.isInteger(w.ruch)) {
    return 'Bitte geben Sie Ihre monatlichen Google-Besuche ein (ganze Zahl, 0 falls unbekannt).';
  }
  if (!ok(w.konwersja, 0.01, 50)) return 'Conversion-Rate: bitte einen Wert zwischen 0,01 und 50 % eingeben.';
  if (!ok(w.wartosc, 1, 100_000_000)) {
    return sklep
      ? 'Bitte geben Sie den durchschnittlichen Bestellwert in Euro ein.'
      : 'Bitte geben Sie den durchschnittlichen Kunden- oder Auftragswert in Euro ein.';
  }
  if (!ok(w.marza, 1, 100)) {
    return sklep ? 'Bruttomarge: bitte einen Wert zwischen 1 und 100 % eingeben.' : 'Marge: bitte einen Wert zwischen 1 und 100 % eingeben.';
  }
  if (powrotyZle) return `Wiederkehrende Kunden: von ${SKLEP.powroty.min} bis ${SKLEP.powroty.max} % oder Feld leer lassen.`;
  if (!ok(w.udzialAi, 0, 80)) return 'Anteil der KI-Anfragen: von 0 bis 80 %.';
  return null;
}

const KLUCZE_URL = ['tryb', 'wyszukiwania', 'ruch', 'konwersja', 'wartosc', 'marza', 'powroty', 'udzialAi', 'widocznyWAi', 'pakiet', 'koszt', 'miesiace'];
const WIDOCZNOSC = ['tak', 'nie', 'nie_wiem'];
const POCZATEK = {
  tryb: 'uslugi',
  wyszukiwania: '',
  ruch: '',
  konwersja: '',
  wartosc: '',
  marza: '',
  powroty: '',
  udzialAi: String(ZALOZENIA.udzialAiDomyslny),
  widocznyWAi: 'nie_wiem',
  pakiet: 'seoStandard',
  koszt: '',
  miesiace: String(ZWROT.miesiaceDoEfektu.domyslnie),
};

function zParametrow(p) {
  const d = {};
  if (p.tryb === 'sklep' || p.tryb === 'uslugi') d.tryb = p.tryb;
  for (const k of ['wyszukiwania', 'ruch', 'konwersja', 'wartosc', 'marza', 'powroty', 'koszt']) {
    if (p[k] !== undefined && p[k] !== '') {
      const n = liczbaDe(p[k]);
      if (Number.isFinite(n)) d[k] = podpDe(n);
    }
  }
  const ai = Number(p.udzialAi);
  if (p.udzialAi !== undefined && Number.isFinite(ai)) d.udzialAi = String(Math.min(60, Math.max(0, Math.round(ai / 5) * 5)));
  if (WIDOCZNOSC.includes(p.widocznyWAi)) d.widocznyWAi = p.widocznyWAi;
  if (PAKIETY.includes(p.pakiet) || p.pakiet === 'wlasny') d.pakiet = p.pakiet;
  else if (d.koszt) d.pakiet = 'wlasny';
  const m = Number(p.miesiace);
  if (p.miesiace !== undefined && Number.isInteger(m) && m >= ZWROT.miesiaceDoEfektu.min && m <= ZWROT.miesiaceDoEfektu.max) {
    d.miesiace = String(m);
  }
  return d;
}

/** Button unter den Praxisbeispielen auf der Seite: überträgt das gewählte DACH-Szenario direkt in den Rechner. */
export function BeispielEinsetzenDe({ przyklad = 'handwerk', children }) {
  const dane = BEISPIELE_DE[przyklad] ?? DOMYSLNY_PRZYKLAD;
  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-cta={`narzedzie_kalkulator_de_przyklad_${przyklad}`}
      onClick={() => {
        window.dispatchEvent(new CustomEvent('kalkulator-przyklad', { detail: dane }));
        document.getElementById('narzedzie')?.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
      }}
    >
      {children ?? 'Diese Beispielwerte in den Rechner übernehmen'}
    </button>
  );
}

const CSS = `
body:has(.kalk-akcja), main:has(.kalk-akcja) { overflow-x: clip !important; }
.kalk-tryb { grid-column: 1 / -1; margin: 0; padding: 0; border: 0; min-width: 0; }
.kalk-tryb legend { padding: 0; margin-bottom: 0.45rem; }
.kalk-tryb-opcje { display: inline-grid; grid-template-columns: repeat(2, auto); gap: 0.25rem; padding: 0.25rem; border-radius: 999px; background: var(--w-papier, #f6f4ef); }
.kalk-tryb-opcje label { position: relative; display: block; cursor: pointer; }
.kalk-tryb-opcje input { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; clip-path: inset(50%); overflow: hidden; white-space: nowrap; }
.kalk-tryb-opcje span { display: block; height: 100%; padding: 0.5rem 1rem; border-radius: 999px; font-weight: 600; font-size: 0.95rem; color: var(--w-tusz-2); line-height: 1.3; text-align: center; }
.kalk-tryb-opcje input:checked + span { background: #fff; color: var(--w-tusz); box-shadow: 0 1px 3px rgba(10, 19, 55, 0.12), 0 0 0 1px var(--w-pomarancz, #d85a30); }
.kalk-tryb-opcje input:focus-visible + span { outline: 2px solid var(--w-pomarancz, #d85a30); outline-offset: 2px; }
.kalk-start { grid-column: 1 / -1; margin: 0; display: grid; gap: 0.45rem; }
.kalk-beispiele { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.kalk-chip { padding: 0.35rem 0.75rem; border-radius: 999px; border: 1px solid rgba(10, 19, 55, 0.14); background: #fff; font: inherit; font-size: 0.84rem; font-weight: 500; color: var(--w-tusz); cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease; }
.kalk-chip:hover { border-color: var(--w-pomarancz, #d85a30); background: var(--w-papier, #f6f4ef); }
.kalk-chip--aktywny { border-color: var(--w-pomarancz, #d85a30); box-shadow: 0 0 0 1px var(--w-pomarancz, #d85a30); font-weight: 600; }
.kalk-akcja { position: sticky; bottom: 0; z-index: 3; margin: 0 calc(-1 * clamp(1.25rem, 4vw, 2.25rem)); padding: 0.75rem clamp(1.25rem, 4vw, 2.25rem); background: #fff; border-top: 1px solid rgba(10, 19, 55, 0.08); display: flex; flex-wrap: wrap; gap: 0.5rem 1rem; align-items: center; justify-content: space-between; }
.kalk-akcja .btn { flex: 0 0 auto; }
.kalk-biezacy { margin: 0; font-size: 0.95rem; line-height: 1.4; color: var(--w-tusz-2); }
.kalk-biezacy strong { color: var(--w-tusz); font-size: 1.05rem; }
.kalk-pod-akcja { grid-column: 1 / -1; margin: 0; }
.kalk-wynik-tytul { margin: 0; font-size: 1rem; font-weight: 600; color: var(--w-tusz-2); }
.kalk-wynik-tytul:focus { outline: none; }
.kalk-zwrot { margin-top: 0.5rem; padding: clamp(1rem, 3vw, 1.5rem); border-radius: 20px; background: var(--w-papier, #f6f4ef); text-align: left; display: grid; gap: 0.9rem; }
.kalk-zwrot h3 { margin: 0; font-size: 1.15rem; color: var(--w-tusz); }
.kalk-zwrot fieldset { margin: 0; padding: 0; border: 0; min-width: 0; }
.kalk-pakiety { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 155px), 1fr)); gap: 0.5rem; }
.kalk-pakiety label { display: flex; gap: 0.5rem; align-items: flex-start; padding: 0.65rem 0.8rem; border-radius: 14px; background: #fff; border: 1px solid rgba(10, 19, 55, 0.1); cursor: pointer; line-height: 1.35; }
.kalk-pakiety label:has(input:checked) { border-color: var(--w-pomarancz, #d85a30); box-shadow: 0 0 0 1px var(--w-pomarancz, #d85a30); }
.kalk-pakiety input { accent-color: var(--w-pomarancz, #d85a30); margin-top: 0.2rem; }
.kalk-pakiety small { display: block; color: var(--w-tusz-2); font-size: 0.8rem; }
.kalk-zwrot-liczby { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 170px), 1fr)); gap: 0.6rem; }
.kalk-zwrot-liczby > div { padding: 0.8rem; border-radius: 14px; background: #fff; }
.kalk-zwrot-liczby .narz-rozbicie-kwota { font-size: 1.1rem; }
.kalk-plus { color: var(--n-ok); }
.kalk-minus { color: var(--n-zle); }
.kalk-dalej { margin: 0; text-align: left; }
@media (max-width: 600px) {
  .kalk-tryb-opcje { display: grid; grid-template-columns: 1fr 1fr; border-radius: 16px; }
  .kalk-tryb-opcje span { padding: 0.55rem 0.5rem; border-radius: 12px; font-size: 0.9rem; }
  .kalk-akcja { flex-direction: column; align-items: stretch; gap: 0.45rem; padding-top: 0.6rem; padding-bottom: 0.6rem; }
  .kalk-akcja .btn { width: 100%; justify-content: center; padding: 0.7rem 1rem; white-space: nowrap; font-size: 0.95rem; }
  .kalk-biezacy { flex: none; min-width: 0; text-align: center; font-size: 0.85rem; }
  .kalk-biezacy--pusty { display: none; }
  .kalk-biezacy strong { font-size: 0.95rem; }
}
`;

const nieRuchu = () => typeof window === 'undefined' || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function Kwota({ min, max, fmt, slowo, tick }) {
  const [p, setP] = useState(1);
  const [widziany, setWidziany] = useState(tick);
  if (tick !== widziany) {
    setWidziany(tick);
    if (!nieRuchu()) setP(0.7);
  }
  useEffect(() => {
    if (p !== 0.7) return undefined;
    const czas = czasTokenu('--r-d-wynik', 480);
    const t0 = performance.now();
    let id = 0;
    const krok = (t) => {
      const x = Math.min(1, (t - t0) / czas);
      setP(0.7 + 0.3 * (1 - (1 - x) ** 4));
      if (x < 1) id = requestAnimationFrame(krok);
    };
    id = requestAnimationFrame(krok);
    return () => cancelAnimationFrame(id);
  }, [widziany]); // eslint-disable-line react-hooks/exhaustive-deps -- Start nur bei Änderung von tick
  return <p className="narz-kwota">{fmt(min * p)} {slowo} {fmt(max * p)}</p>;
}

export default function KalkulatorClientDe() {
  const fmt = (n) => eur(Math.round(n), 'de');
  const num = (n) => fmtDe(n, 'de', 1);
  const calkowita = (n) => fmtDe(Math.round(n), 'de', 0);
  const ulamek = (n) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number(n));

  const [dane, setDane] = useState(POCZATEK);
  const [aktywnyPrzyklad, setAktywnyPrzyklad] = useState('');
  const sklep = dane.tryb === 'sklep';
  const pola = sklep ? POLA_SKLEP_DE : POLA_DE;
  const [probowal, setProbowal] = useState(false);
  const [licznik, setLicznik] = useState(0);
  const [blysk, setBlysk] = useState(0);
  const wynikRef = useRef(null);
  const poleSklepPowroty = POLA_SKLEP_DE.find((x) => x.k === 'powroty');

  const zgloszony = useRef(false);
  const zgloszonyStart = useRef(false);
  const zgloszonyZwrot = useRef(false);
  const zgloszonySklep = useRef(false);

  const cennikDe = maWersjeDe('/cennik-pozycjonowania') ? '/cennik-pozycjonowania' : null;
  const b2bDe = maWersjeDe('/pozycjonowanie-stron-internetowych') ? '/pozycjonowanie-stron-internetowych' : null;
  const audytDe = maWersjeDe('/narzedzia/audyt-seo') ? '/narzedzia/audyt-seo' : null;
  const widocznoscDe = maWersjeDe('/sprawdz-widocznosc-w-ai') ? '/sprawdz-widocznosc-w-ai' : null;

  useParametrUrl(KLUCZE_URL, (p) => setDane((d) => ({ ...d, ...zParametrow(p) })));

  useEffect(() => {
    const wstaw = (e) => {
      const zrodlo = e.detail ?? DOMYSLNY_PRZYKLAD;
      setDane(() => ({ ...POCZATEK, ...zParametrow(zrodlo) }));
      setAktywnyPrzyklad(zrodlo.id || '');
      setBlysk((b) => b + 1);
    };
    window.addEventListener('kalkulator-przyklad', wstaw);
    return () => window.removeEventListener('kalkulator-przyklad', wstaw);
  }, []);

  const zmien = (k) => (e) => {
    const v = e.target.value;
    setDane((d) => ({ ...d, [k]: v }));
    if (k !== 'pakiet' && k !== 'koszt' && k !== 'miesiace') setAktywnyPrzyklad('');
    if (k === 'tryb' && v === 'sklep' && !zgloszonySklep.current) {
      zgloszonySklep.current = true;
      track('narzedzie_kalkulator_tryb', { tryb: v, lang: 'de' });
    }
    if (k === 'pakiet' && !zgloszonyZwrot.current) {
      zgloszonyZwrot.current = true;
      track('narzedzie_kalkulator_zwrot', { pakiet: v, lang: 'de' });
    }
  };

  const wybierzPrzyklad = (przyklad) => {
    setDane({ ...POCZATEK, ...zParametrow(przyklad) });
    setAktywnyPrzyklad(przyklad.id);
    setBlysk((b) => b + 1);
    track('narzedzie_kalkulator_przyklad', { przyklad: przyklad.id, lang: 'de' });
  };

  const poleFormularza = (p) => (
    <div key={p.k} className="narz-kalk-pole">
      <label htmlFor={`k-de-${p.k}`} className="narz-etykieta">{p.etykieta}</label>
      <div className="narz-z-jednostka">
        <input
          key={blysk}
          id={`k-de-${p.k}`}
          name={p.k}
          value={dane[p.k]}
          onChange={zmien(p.k)}
          {...WALID_DE}
          inputMode="decimal"
          autoComplete="off"
          placeholder={`z. B. ${p.przyklad}`}
          className={`narz-pole${blysk ? ' kalk-wypelnione' : ''}`}
          aria-describedby={`k-de-${p.k}-pomoc`}
        />
        {p.jednostka && <span aria-hidden="true">{p.jednostka}</span>}
      </div>
      <p id={`k-de-${p.k}-pomoc`} className="narz-mikro">{p.pomoc}</p>
    </div>
  );

  const wejscie = useMemo(() => ({
    wyszukiwania: Math.round(liczbaDe(dane.wyszukiwania)),
    ruch: Math.round(liczbaDe(dane.ruch || '0')),
    konwersja: liczbaDe(dane.konwersja),
    wartosc: liczbaDe(dane.wartosc),
    marza: liczbaDe(dane.marza),
    udzialAi: Number(dane.udzialAi),
    widocznyWAi: dane.widocznyWAi,
    ...(dane.tryb === 'sklep' ? { tryb: 'sklep', ...(dane.powroty !== '' ? { powroty: liczbaDe(dane.powroty) } : {}) } : {}),
  }), [dane]);

  const blad = bladDanychDe(wejscie);
  const wynik = useMemo(() => (blad ? null : policzStraty(wejscie)), [blad, wejscie]);
  const [ostWynik, setOstWynik] = useState(null);
  if (wynik && wynik !== ostWynik) setOstWynik(wynik);
  const W = wynik ?? ostWynik;
  const [ostBlad, setOstBlad] = useState('');
  if (blad && blad !== ostBlad) setOstBlad(blad);
  const wypelnione = ['wyszukiwania', 'konwersja', 'wartosc', 'marza'].every((k) => dane[k] !== '');

  const kosztWlasny = liczbaDe(dane.koszt);
  const kosztWlasnyPoprawny = Number.isFinite(kosztWlasny) && kosztWlasny >= KOSZT_WLASNY_EUR.min && kosztWlasny <= KOSZT_WLASNY_EUR.max;
  const koszt = PAKIETY.includes(dane.pakiet)
    ? CENY[dane.pakiet].eur
    : dane.pakiet === 'wlasny' && kosztWlasnyPoprawny
      ? Math.round(kosztWlasny)
      : NaN;
  const miesiace = Number(dane.miesiace);
  const zwrot = wynik && dane.pakiet && Number.isFinite(koszt) ? policzZwrot(wynik, koszt, miesiace) : null;

  const maWynik = Boolean(wynik);
  const kwotaMin = wynik?.min.zysk ?? 0;
  useEffect(() => {
    if (!maWynik || zgloszony.current) return undefined;
    const t = setTimeout(() => {
      zgloszony.current = true;
      track('narzedzie_wynik', { narzedzie: 'kalkulator', wynik: kwotaMin, waluta: 'EUR', lang: 'de' });
    }, 1000);
    return () => clearTimeout(t);
  }, [maWynik, kwotaMin]);

  function licz(e) {
    e.preventDefault();
    setProbowal(true);
    if (blad) return;
    if (!zgloszonyStart.current) {
      zgloszonyStart.current = true;
      track('narzedzie_start', { narzedzie: 'kalkulator', lang: 'de' });
    }
    zapiszParametry(parametryWyniku());
    setLicznik((n) => n + 1);
    wynikRef.current?.focus({ preventScroll: true });
    wynikRef.current?.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
  }

  function parametryWyniku() {
    return {
      ...wejscie,
      pakiet: dane.pakiet || null,
      koszt: dane.pakiet === 'wlasny' && Number.isFinite(koszt) ? koszt : null,
      miesiace: dane.pakiet ? dane.miesiace : null,
    };
  }

  const cenaPakietu = (k) => {
    const c = CENY[k];
    const ab = c.od ? 'ab ' : '';
    return `${ab}${eur(c.eur, 'de')} netto/Monat`;
  };

  const miesiacTekst = (m) => (m === null ? `nicht innerhalb von ${ZWROT.horyzont} Monaten` : `${m}. Monat`);
  const okresZwrotu = ({ min, max }) => {
    if (max.miesiacZwrotu === null) return miesiacTekst(null);
    if (min.miesiacZwrotu === null) return `${max.miesiacZwrotu}. Monat (nur optimistisch)`;
    if (min.miesiacZwrotu === max.miesiacZwrotu) return miesiacTekst(max.miesiacZwrotu);
    return `${max.miesiacZwrotu}. bis ${min.miesiacZwrotu}. Monat`;
  };
  const zeZnakiem = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `−${fmt(-n)}` : fmt(0));
  const klasa = (n) => (n > 0 ? 'kalk-plus' : n < 0 ? 'kalk-minus' : '');

  let wniosek = null;
  if (zwrot) {
    const { min, max } = zwrot;
    const nazwa = PAKIETY.includes(dane.pakiet) ? NAZWY_PAKIETOW[dane.pakiet] : 'Dieses Budget';
    if (max.prog === null || max.prog > 100) {
      wniosek = `Selbst wenn Sie den gesamten berechneten Verlust zurückgewinnen, deckt das nicht ${fmt(koszt)} pro Monat. Bei dieser Suchnachfrage rechnet sich SEO zu diesem Preis nicht. Prüfen Sie, ob alle relevanten Haupt-Keywords in der Suchzahl enthalten sind, oder vergleichen Sie einen kleineren Umfang.`;
    } else if (max.miesiacZwrotu === null) {
      wniosek = `Bei voller Wirkung deckt der zurückgewonnene Gewinn die Kosten nur in der optimistischen Variante, und durch die Anlaufmonate amortisiert sich das Budget nicht innerhalb von ${ZWROT.horyzont} Monaten.`;
    } else if (min.miesiacZwrotu === null) {
      wniosek = `${nazwa} amortisiert sich im ${max.miesiacZwrotu}. Monat in der optimistischen Variante; in der vorsichtigen Variante nicht innerhalb von ${ZWROT.horyzont} Monaten.`;
    } else {
      wniosek = `${nazwa} amortisiert sich zwischen dem ${max.miesiacZwrotu}. und dem ${min.miesiacZwrotu}. Monat. Um die monatlichen Kosten bei voller Wirkung zu decken, genügt es, ${max.prog} bis ${min.prog} % des berechneten Verlusts zurückzugewinnen.`;
    }
  }

  const bladKosztu = dane.pakiet === 'wlasny' && dane.koszt !== '' && !kosztWlasnyPoprawny
    ? `Bitte geben Sie ein monatliches Budget zwischen ${eur(KOSZT_WLASNY_EUR.min, 'de')} und ${eur(KOSZT_WLASNY_EUR.max, 'de')} netto ein.`
    : null;

  const daneRaportu = zwrot ? { ...wejscie, koszt: zwrot.koszt, miesiaceDoEfektu: zwrot.miesiaceDoEfektu } : wejscie;

  return (
    <div className="narz-app" id="narzedzie">
      <style>{CSS}</style>
      <PasekDemo />
      <form className="narz-formularz narz-kalkulator" onSubmit={licz} noValidate>
        <fieldset className="kalk-tryb">
          <legend className="narz-etykieta">Ihr Geschäftsmodell</legend>
          <div className="kalk-tryb-opcje">
            {[['uslugi', 'Dienstleistungen & B2B'], ['sklep', 'Online-Shop']].map(([v, t]) => (
              <label key={v}>
                <input type="radio" name="tryb" value={v} checked={dane.tryb === v} onChange={zmien('tryb')} data-cta={`narzedzie_kalkulator_de_tryb_${v}`} />
                <span>{t}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="kalk-start">
          <p className="narz-mikro" style={{ margin: 0 }}>
            {sklep
              ? 'Fünf Kennzahlen und eine optionale Angabe in Euro: Das Ergebnis aktualisiert sich sofort bei der Eingabe.'
              : 'Fünf Kennzahlen in Euro: Das Ergebnis aktualisiert sich sofort bei der Eingabe. Oder laden Sie ein DACH-Branchenbeispiel:'}
          </p>
          <div className="kalk-beispiele" role="group" aria-label="DACH-Branchenbeispiele laden">
            {LISTA_BEISPIELE.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`kalk-chip${aktywnyPrzyklad === b.id ? ' kalk-chip--aktywny' : ''}`}
                data-cta={`narzedzie_kalkulator_de_chip_${b.id}`}
                onClick={() => wybierzPrzyklad(b)}
              >
                {b.etykieta}
              </button>
            ))}
          </div>
        </div>

        {pola.filter((p) => p.k !== 'powroty').map(poleFormularza)}
        <Zwin otwarte={sklep}>{poleFormularza(poleSklepPowroty)}</Zwin>

        <div className="narz-kalk-pole">
          <label htmlFor="k-de-udzialAi" className="narz-etykieta">
            Welcher Anteil der Suchenden fragt KI-Assistenten statt Google? <strong>{dane.udzialAi} %</strong>
          </label>
          <input id="k-de-udzialAi" type="range" min="0" max="60" step="5" value={dane.udzialAi} onChange={zmien('udzialAi')} className="narz-suwak" />
          <p className="narz-mikro">
            Standardwert {ZALOZENIA.udzialAiDomyslny} %: unsere vorsichtige Annahme (Gartner prognostizierte im Februar 2024 einen Rückgang des klassischen Suchvolumens um 25 % bis 2026; ob diese Prognose eingetreten ist, haben wir nicht überprüft). Passen Sie den Regler an Ihre Branche an. Je mehr Fragen an KI gehen, desto kleiner fällt der Gesamtverlust an Klicks aus, weil KI-Antworten deutlich seltener mit einem Website-Besuch enden.
          </p>
        </div>

        <fieldset className="narz-kalk-pole">
          <legend className="narz-etykieta">
            {sklep
              ? 'Empfehlen ChatGPT, Gemini oder Perplexity heute Ihren Online-Shop?'
              : 'Empfehlen ChatGPT, Gemini oder Perplexity heute Ihr Unternehmen?'}
          </legend>
          <div className="narz-wybor">
            {[['tak', 'Ja'], ['nie', 'Nein'], ['nie_wiem', 'Weiß nicht']].map(([v, t]) => (
              <label key={v}>
                <input type="radio" name="widocznyWAi" value={v} checked={dane.widocznyWAi === v} onChange={zmien('widocznyWAi')} /> {t}
              </label>
            ))}
          </div>
        </fieldset>

        <div className="narz-kalk-akcja kalk-akcja">
          <p className={`kalk-biezacy${wynik ? '' : ' kalk-biezacy--pusty'}`} aria-hidden="true">
            {wynik
              ? <>Entgangener Gewinn: <strong>{fmt(wynik.min.zysk)} bis {fmt(wynik.max.zysk)}</strong> pro Monat</>
              : 'Felder ausfüllen oder Beispiel wählen: Das Ergebnis erscheint sofort.'}
          </p>
          <button type="submit" className="btn btn-primary" data-cta="narzedzie_kalkulator_de_licz">Verlust berechnen</button>
        </div>

        <div className="kalk-pod-akcja">
          <Zwin otwarte={Boolean((probowal || wypelnione) && blad)}>
            <p role="alert" className="narz-blad">{blad || ostBlad}</p>
          </Zwin>
          <p className="narz-mikro">Berechnung lokal in Ihrem Browser, ohne Registrierung. Alle Studien und Annahmen stehen offen weiter unten auf dieser Seite.</p>
        </div>
      </form>

      <Zwin otwarte={Boolean(wynik)} className="r-zwin--karta">
        {W && (
          <div className="narz-wynik narz-kalk-wynik" id="wynik-kalkulatora">
            <h2 className="kalk-wynik-tytul" ref={wynikRef} tabIndex={-1}>Ihr Ergebnis</h2>
            <p className="narz-wynik-opis">
              {sklep
                ? 'Ohne Top-3-Positionen bei Google und ohne Empfehlungen in KI-Antworten entgehen Ihrem Shop schätzungsweise'
                : 'Ohne Top-3-Positionen bei Google und ohne Empfehlungen in KI-Antworten entgehen Ihrem Unternehmen schätzungsweise'}
            </p>
            <Kwota min={W.min.zysk} max={W.max.zysk} fmt={fmt} slowo="bis" tick={licznik} />
            {sklep ? (
              <p className="narz-wynik-opis">
                {`an Bruttomarge pro Monat, also ${fmt(W.rocznieMin)} bis ${fmt(W.rocznieMax)} pro Jahr, bei ${fmt(W.min.przychod)} bis ${fmt(W.max.przychod)} entgangenem Monatsumsatz. Die Spanne bildet die Unterschiede zwischen aktuellen Studien zu Klickraten in Google und in KI-Antworten ab.`}
              </p>
            ) : (
              <p className="narz-wynik-opis">
                {`an Gewinn pro Monat, also ${fmt(W.rocznieMin)} bis ${fmt(W.rocznieMax)} pro Jahr. Die Spanne bildet die Unterschiede zwischen aktuellen Studien zu Klickraten in Google und in KI-Antworten ab.`}
              </p>
            )}

            <div className="narz-rozbicie">
              <div>
                <p className="narz-rozbicie-etykieta">Fehlende Google-Rankings</p>
                <p className="narz-rozbicie-kwota">{fmt(W.min.zyskSeo)} bis {fmt(W.max.zyskSeo)}</p>
                <p className="narz-mikro">{calkowita(W.min.wizytySeo)} bis {calkowita(W.max.wizytySeo)} Besuche pro Monat</p>
              </div>
              <div>
                <p className="narz-rozbicie-etykieta">Fehlende KI-Empfehlungen</p>
                <p className="narz-rozbicie-kwota">{fmt(W.min.zyskAi)} bis {fmt(W.max.zyskAi)}</p>
                <p className="narz-mikro">{calkowita(W.min.wizytyAi)} bis {calkowita(W.max.wizytyAi)} Besuche aus KI-Antworten pro Monat</p>
              </div>
              {sklep ? (
                <div>
                  <p className="narz-rozbicie-etykieta">Entgangene Bestellungen</p>
                  <p className="narz-rozbicie-kwota">{num(W.min.zamowienia)} bis {num(W.max.zamowienia)}</p>
                  <p className="narz-mikro">
                    {wejscie.powroty > 0
                      ? `pro Monat, davon ${num(W.min.klienci)} bis ${num(W.max.klienci)} Erstbestellungen neuer Kunden`
                      : 'pro Monat (nur Erstbestellungen)'}
                  </p>
                </div>
              ) : (
                <div>
                  <p className="narz-rozbicie-etykieta">Entgangene Kunden</p>
                  <p className="narz-rozbicie-kwota">{num(W.min.klienci)} bis {num(W.max.klienci)}</p>
                  <p className="narz-mikro">pro Monat</p>
                </div>
              )}
            </div>

            <div className="kalk-zwrot" role="region" aria-labelledby="kalk-zwrot-tytul">
              <h3 id="kalk-zwrot-tytul">Lohnt sich SEO? Kosten und Amortisation</h3>
              <fieldset>
                <legend className="narz-etykieta">Welches monatliche SEO-Budget möchten Sie gegenrechnen?</legend>
                <div className="kalk-pakiety">
                  {PAKIETY.map((k) => (
                    <label key={k}>
                      <input type="radio" name="pakiet" value={k} checked={dane.pakiet === k} onChange={zmien('pakiet')} />
                      <span>
                        {NAZWY_PAKIETOW[k]}
                        <small>
                          {cenaPakietu(k)}
                          {CENY[k].umowaMiesiecy ? `, mind. ${CENY[k].umowaMiesiecy} Monate, inkl. neuer Website` : ', monatlich kündbar'}
                        </small>
                      </span>
                    </label>
                  ))}
                  <label>
                    <input type="radio" name="pakiet" value="wlasny" checked={dane.pakiet === 'wlasny'} onChange={zmien('pakiet')} />
                    <span>
                      Eigenes Budget
                      <small>{`${eur(KOSZT_WLASNY_EUR.min, 'de')} bis ${eur(KOSZT_WLASNY_EUR.max, 'de')} netto`}</small>
                    </span>
                  </label>
                </div>
              </fieldset>

              <Zwin otwarte={dane.pakiet === 'wlasny'}>
                <div className="narz-kalk-pole">
                  <label htmlFor="k-de-koszt" className="narz-etykieta">Monatliches SEO-Budget (netto)</label>
                  <div className="narz-z-jednostka">
                    <input
                      id="k-de-koszt"
                      name="koszt"
                      value={dane.koszt}
                      onChange={zmien('koszt')}
                      {...WALID_DE}
                      inputMode="decimal"
                      autoComplete="off"
                      placeholder="z. B. 1.500"
                      className="narz-pole"
                    />
                    <span aria-hidden="true">€</span>
                  </div>
                  {bladKosztu && <p role="alert" className="narz-blad">{bladKosztu}</p>}
                </div>
              </Zwin>

              <Zwin otwarte={Boolean(dane.pakiet)}>
                <div className="narz-kalk-pole">
                  <label htmlFor="k-de-miesiace" className="narz-etykieta">
                    Nach wie vielen Monaten erreicht SEO die volle Wirkung? <strong>{dane.miesiace}</strong>
                  </label>
                  <input
                    id="k-de-miesiace"
                    type="range"
                    min={ZWROT.miesiaceDoEfektu.min}
                    max={ZWROT.miesiaceDoEfektu.max}
                    step="1"
                    value={dane.miesiace}
                    onChange={zmien('miesiace')}
                    className="narz-suwak"
                  />
                  <p className="narz-mikro">
                    {`Standardwert ${ZWROT.miesiaceDoEfektu.domyslnie} Monate: unsere Modellannahme, kein Studienergebnis. Bis dahin wächst der zurückgewonnene Gewinn gleichmäßig an. Bei einer neuen Domain oder starkem Wettbewerb im DACH-Raum wählen Sie einen höheren Wert.`}
                  </p>
                </div>
              </Zwin>

              {zwrot && (
                <div className="r-zwin" data-otwarte="">
                  <div className="kalk-zwrot-wnetrze">
                    <div className="kalk-zwrot-liczby">
                      <div>
                        <p className="narz-rozbicie-etykieta">Monatliche Bilanz bei voller Wirkung</p>
                        <p className="narz-rozbicie-kwota">
                          <span className={klasa(zwrot.min.bilans)}>{zeZnakiem(zwrot.min.bilans)}</span> bis <span className={klasa(zwrot.max.bilans)}>{zeZnakiem(zwrot.max.bilans)}</span>
                        </p>
                      </div>
                      <div>
                        <p className="narz-rozbicie-etykieta">Bilanz der ersten 12 Monate</p>
                        <p className="narz-rozbicie-kwota">
                          <span className={klasa(zwrot.min.bilansRok)}>{zeZnakiem(zwrot.min.bilansRok)}</span> bis <span className={klasa(zwrot.max.bilansRok)}>{zeZnakiem(zwrot.max.bilansRok)}</span>
                        </p>
                      </div>
                      <div>
                        <p className="narz-rozbicie-etykieta">Amortisation (Break-even)</p>
                        <p className="narz-rozbicie-kwota">{okresZwrotu(zwrot)}</p>
                        <p className="narz-mikro">{`der Gewinn deckt die Kosten ${ulamek(zwrot.min.razy)}- bis ${ulamek(zwrot.max.razy)}-fach`}</p>
                      </div>
                    </div>
                    <p className="narz-mikro" role="status">
                      {wniosek}{' '}
                      {`Das ist eine Modellrechnung auf Basis Ihrer Zahlen, kein Heilsversprechen: Wir rechnen mit der Rückgewinnung des berechneten Potenzials nach ${zwrot.miesiaceDoEfektu} Monaten.`}
                    </p>
                  </div>
                </div>
              )}

              <p className="narz-mikro kalk-dalej">
                Leistungsumfang der Pakete:{' '}
                {cennikDe ? <Link href={cennikDe} className="narz-link">SEO Kosten & Pakete</Link> : 'SEO Kosten & Pakete'}
                {'. Was wir monatlich umsetzen: '}
                {b2bDe ? <Link href={b2bDe} className="narz-link">B2B SEO für Unternehmen</Link> : 'B2B SEO für Unternehmen'}.
              </p>
            </div>

            <p className="narz-mikro kalk-dalej">
              {'Nächster Schritt: Der '}
              {audytDe ? <Link href={audytDe} className="narz-link">kostenlose SEO Audit</Link> : 'kostenlose SEO Audit'}
              {' zeigt technische Bremsen Ihrer Website'}
              {widocznoscDe
                ? <>{', und unser Tool '}<Link href={widocznoscDe} className="narz-link">KI-Sichtbarkeit prüfen</Link>{' testet live, ob KI-Modelle Ihr Unternehmen nennen.'}</>
                : '.'}
            </p>

            <LinkWyniku
              narzedzie="kalkulator"
              tryb="wynik"
              parametry={parametryWyniku()}
              podsumowanie={`Geschätzter Verlust ohne SEO und KI-Sichtbarkeit: ${fmt(W.min.zysk)} bis ${fmt(W.max.zysk)} pro Monat`}
            />

            <BramkaEmail
              narzedzie="kalkulator"
              dane={{ ...daneRaportu, waluta: 'EUR', lang: 'de' }}
              tylkoRaport
              naglowek="Auswertung per E-Mail senden"
              opis="Wir schicken Ihnen Ihr Ergebnis mit der Aufschlüsselung nach Google und KI sowie allen Modellannahmen per E-Mail, praktisch für Ihre Budgetplanung."
              korzysci={[
                'Aufschlüsselung des Verlusts zwischen Google und KI-Antworten',
                sklep ? 'Entgangene Bestellungen und Monatsumsatz in Euro' : 'Entgangene Neukunden pro Monat',
                zwrot ? 'SEO-Kosten, 12-Monats-Bilanz und Amortisationsmonat' : 'Kurzer Maßnahmenplan für die ersten Schritte',
                'Alle Studien und Berechnungsannahmen auf einen Blick',
              ]}
              przycisk="Auswertung senden"
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}
