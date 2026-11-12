'use client';

// Kalkulator utraconego zysku przez brak SEO i widoczności w AI (/narzedzia/kalkulator-strat-seo).
// Liczy w przeglądarce (lib/kalkulatorStrat.js); panel liczy wynik ponownie przed wysłaniem raportu.
// 12.11.2026 (S1-poprawki, agent kalkulator):
// - Z-K6 wynik na żywo: liczy się po każdej zmianie, gdy pola są poprawne. Przycisk zostaje (czytniki
//   ekranu, klawiatura): przenosi fokus do wyniku. Zdarzenie narzedzie_wynik raz, 1 s po pierwszym wyniku.
// - Z-K5 (decyzja właściciela): całe rozbicie Google / AI / klienci bez e-maila; bramka tylko wysyła
//   zestawienie (tylkoRaport).
// - Z-K7 (decyzja właściciela): „Koszt SEO i zwrot”: pakiety z cennika strony (lib/narzedziaLiczby.js
//   CENY, źródło lib/translations.js:47-61) albo własna kwota, miesiące do pełnego efektu, bilans i miesiąc
//   zwrotu (policzZwrot). Kalkulator liczy w złotych także po angielsku, więc EN pokazuje PLN (i € z cennika EN).
// - Z-06: parametry adresu odtwarzają wynik (liczy się lokalnie, więc wolno pokazać go od razu);
//   „Wstaw przykład” i przycisk WstawPrzyklad pod przykładem na stronie (zdarzenie kalkulator-przyklad).
// - <div>, nie <section> w wyniku: globals.css daje każdej <section> duży padding z !important.
// - Pasek akcji przyklejony do dołu ekranu, dopóki widać formularz: na telefonie przycisk i bieżąca kwota
//   są w pierwszym ekranie.
// 12.11.2026 (domknięcie, agent kalkulator): przełącznik „Usługi / Sklep internetowy”. Sklep: te same pola
// z etykietami dla sklepu (wartość koszyka, marża brutto) i opcjonalne „powroty”; wynik pokazuje marżę brutto,
// utraconą sprzedaż i zamówienia (policzStraty z tryb: 'sklep'). Koszt i zwrot działają w obu trybach.

import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';
import { PRZYKLADY, ZALOZENIA, ZWROT, bladDanych, policzStraty, policzZwrot } from '@/lib/kalkulatorStrat';
import { CENY } from '@/lib/narzedziaLiczby';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import { SPRAWDZARKA_DZIALA } from '@/lib/publikacja';
import BramkaEmail from './BramkaEmail';
import LinkWyniku from './LinkWyniku';
import { PasekDemo } from './Wspolne';

const zl = (n) => `${Math.round(n).toLocaleString('pl-PL')} zł`;
const zlEn = (n) => `PLN ${Math.round(n).toLocaleString('en-US')}`;
const liczbaPl = (v) => Number(String(v).replace(/\s/g, '').replace(',', '.'));
// EN: przecinek to separator tysięcy ("1,500"), kropka to ułamek.
const liczbaEn = (v) => Number(String(v).replace(/[\s,]/g, ''));

// Przykład „firma usługowa” (Z-K3) = podpowiedzi z pól formularza; ta sama stała liczy przykład na stronie.
const PRZYKLAD = PRZYKLADY.usluga;
const PS = PRZYKLADY.sklep;
// Podpowiedź liczby w polu: PL z przecinkiem dziesiętnym, EN z kropką.
const podp = (v, en) => (en ? String(v) : String(v).replace('.', ','));

// Pakiety z cennika pozycjonowania (ceny netto miesięcznie z lib/narzedziaLiczby.js).
const PAKIETY = ['seoStandard', 'seoPremium', 'boosterPack'];
const NAZWY_PAKIETOW = { seoStandard: 'SEO Standard', seoPremium: 'SEO Premium', boosterPack: 'Booster Pack' };

const POLA = [
  { k: 'wyszukiwania', etykieta: 'Ile razy miesięcznie klienci szukają Twoich usług w Google?', pomoc: 'Suma wyszukiwań głównych fraz, np. „stolarz Warszawa”. Sprawdzisz w Planerze słów kluczowych Google Ads.', przyklad: '2000' },
  { k: 'ruch', etykieta: 'Ile wejść z Google masz dziś miesięcznie?', pomoc: 'Google Search Console albo Analytics, ruch organiczny. Nie wiesz? Wpisz 0.', przyklad: '150' },
  { k: 'konwersja', etykieta: 'Ile % odwiedzających zostaje klientami?', pomoc: 'Zapytania lub zakupy podzielone przez wejścia, w procentach.', przyklad: '2', jednostka: '%' },
  { k: 'wartosc', etykieta: 'Średnia wartość klienta lub zamówienia', pomoc: 'Ile średnio płaci jeden klient (zamówienie albo współpraca).', przyklad: '1500', jednostka: 'zł' },
  { k: 'marza', etykieta: 'Marża', pomoc: 'Jaka część przychodu zostaje jako zysk. 100% = liczymy przychód.', przyklad: '40', jednostka: '%' },
];

const POLA_EN = [
  { k: 'wyszukiwania', etykieta: 'How many times a month do customers search for your services on Google?', pomoc: 'The total of searches for your main keywords, e.g. “carpenter Warsaw”. You can check it in Google Ads Keyword Planner.', przyklad: '2000' },
  { k: 'ruch', etykieta: 'How many visits from Google do you get per month today?', pomoc: 'From Google Search Console or Analytics, organic traffic. Not sure? Enter 0.', przyklad: '150' },
  { k: 'konwersja', etykieta: 'What % of visitors become customers?', pomoc: 'Enquiries or purchases divided by visits, as a percentage.', przyklad: '2', jednostka: '%' },
  { k: 'wartosc', etykieta: 'Average value of a customer or an order', pomoc: 'How much one customer pays on average (an order or an engagement).', przyklad: '1500', jednostka: 'PLN' },
  { k: 'marza', etykieta: 'Margin', pomoc: 'The share of revenue that stays as profit. 100% = we calculate revenue.', przyklad: '40', jednostka: '%' },
];

// Tryb sklepu: te same pola co wyżej (wartosc = średnia wartość zamówienia, marza = marża brutto) i opcjonalne
// „powroty”. Mediana konwersji: ZRODLA_KALKULATORA[9] (Littledata, odczyt 12.11.2026).
const POLA_SKLEP = [
  { k: 'wyszukiwania', etykieta: 'Ile razy miesięcznie klienci szukają Twoich produktów w Google?', pomoc: 'Suma wyszukiwań fraz kategorii i produktów, np. „buty do biegania damskie”. Sprawdzisz w Planerze słów kluczowych Google Ads.', przyklad: podp(PS.wyszukiwania) },
  { k: 'ruch', etykieta: 'Ile wejść z Google ma dziś sklep miesięcznie?', pomoc: 'Bezpłatny ruch z wyszukiwarki z Google Search Console albo GA4, bez reklam. Nie wiesz? Wpisz 0.', przyklad: podp(PS.ruch) },
  { k: 'konwersja', etykieta: 'Współczynnik konwersji sklepu', pomoc: 'Zamówienia podzielone przez sesje, w procentach (GA4 albo panel sklepu). Dla porównania: mediana w 450 sklepach Shopify to 1,3% (Littledata, VIII-XI 2026).', przyklad: podp(PS.konwersja), jednostka: '%' },
  { k: 'wartosc', etykieta: 'Średnia wartość zamówienia (koszyka)', pomoc: 'Przychód ze sprzedaży podzielony przez liczbę zamówień, z panelu sklepu albo GA4.', przyklad: podp(PS.wartosc), jednostka: 'zł' },
  { k: 'marza', etykieta: 'Marża brutto', pomoc: 'Cena sprzedaży minus koszt zakupu towaru, w procentach ceny. Chcesz uwzględnić wysyłkę i prowizje płatności? Wpisz marżę po tych kosztach. 100% = liczymy przychód.', przyklad: podp(PS.marza), jednostka: '%' },
  { k: 'powroty', etykieta: 'Ile % klientów kupuje ponownie? (opcjonalnie)', pomoc: 'Odsetek klientów z co najmniej dwoma zamówieniami w roku, z raportu klientów w panelu sklepu. Liczymy jedno dodatkowe zamówienie od każdego, kto wraca. Puste pole = tylko pierwsze zamówienie.', przyklad: podp(PS.powroty), jednostka: '%' },
];

const POLA_SKLEP_EN = [
  { k: 'wyszukiwania', etykieta: 'How many times a month do customers search for your products on Google?', pomoc: 'The total of searches for your category and product keywords, e.g. “women’s running shoes”. You can check it in Google Ads Keyword Planner.', przyklad: podp(PS.wyszukiwania, true) },
  { k: 'ruch', etykieta: 'How many visits from Google does your shop get per month today?', pomoc: 'Free search traffic from Google Search Console or GA4, without ads. Not sure? Enter 0.', przyklad: podp(PS.ruch, true) },
  { k: 'konwersja', etykieta: 'Your shop’s conversion rate', pomoc: 'Orders divided by sessions, as a percentage (GA4 or your store admin). For comparison: the median across 450 Shopify stores is 1.3% (Littledata, August to November 2026).', przyklad: podp(PS.konwersja, true), jednostka: '%' },
  { k: 'wartosc', etykieta: 'Average order value', pomoc: 'Sales revenue divided by the number of orders, from your store admin or GA4.', przyklad: podp(PS.wartosc, true), jednostka: 'PLN' },
  { k: 'marza', etykieta: 'Gross margin', pomoc: 'Selling price minus the cost of goods, as a percentage of the price. Want to include shipping and payment fees? Enter the margin after those costs. 100% = we calculate revenue.', przyklad: podp(PS.marza, true), jednostka: '%' },
  { k: 'powroty', etykieta: 'What % of customers buy again? (optional)', pomoc: 'The share of customers with at least two orders a year, from the customer report in your store admin. We count one extra order from each returning customer. Empty = first order only.', przyklad: podp(PS.powroty, true), jednostka: '%' },
];

const KLUCZE_URL = ['tryb', 'wyszukiwania', 'ruch', 'konwersja', 'wartosc', 'marza', 'powroty', 'udzialAi', 'widocznyWAi', 'pakiet', 'koszt', 'miesiace'];
const WIDOCZNOSC = ['tak', 'nie', 'nie_wiem'];
const POCZATEK = { tryb: 'uslugi', wyszukiwania: '', ruch: '', konwersja: '', wartosc: '', marza: '', powroty: '', udzialAi: String(ZALOZENIA.udzialAiDomyslny), widocznyWAi: 'nie_wiem', pakiet: '', koszt: '', miesiace: String(ZWROT.miesiaceDoEfektu.domyslnie) };

// Wartości z adresu albo z przykładu -> stan formularza (teksty pól). Złe wartości pomija.
function zParametrow(p) {
  const d = {};
  if (p.tryb === 'sklep' || p.tryb === 'uslugi') d.tryb = p.tryb;
  for (const k of ['wyszukiwania', 'ruch', 'konwersja', 'wartosc', 'marza', 'powroty', 'koszt']) {
    if (p[k] !== undefined && p[k] !== '' && Number.isFinite(Number(p[k]))) d[k] = String(p[k]);
  }
  const ai = Number(p.udzialAi);
  if (p.udzialAi !== undefined && Number.isFinite(ai)) d.udzialAi = String(Math.min(60, Math.max(0, Math.round(ai / 5) * 5)));
  if (WIDOCZNOSC.includes(p.widocznyWAi)) d.widocznyWAi = p.widocznyWAi;
  if (PAKIETY.includes(p.pakiet) || p.pakiet === 'wlasny') d.pakiet = p.pakiet;
  else if (d.koszt) d.pakiet = 'wlasny';
  const m = Number(p.miesiace);
  if (p.miesiace !== undefined && Number.isInteger(m) && m >= ZWROT.miesiaceDoEfektu.min && m <= ZWROT.miesiaceDoEfektu.max) d.miesiace = String(m);
  return d;
}

/** Przycisk pod przykładem na stronie (komponent serwerowy go renderuje): wpisuje dane do kalkulatora. */
export function WstawPrzyklad({ przyklad = 'usluga', children }) {
  const dane = PRZYKLADY[przyklad] ?? PRZYKLAD;
  const en = useLocale() === 'en';
  return (
    <button
      type="button"
      className="btn btn-secondary"
      data-cta="narzedzie_kalkulator_przyklad"
      onClick={() => {
        window.dispatchEvent(new CustomEvent('kalkulator-przyklad', { detail: dane }));
        document.getElementById('narzedzie')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }}
    >
      {children ?? (en ? 'Fill in the form with these numbers' : 'Wypełnij formularz tymi danymi')}
    </button>
  );
}

// Sticky nie działa pod przodkiem z overflow-x: hidden (main ma go w stylu inline ze styl.js, body
// w globals.css: robi z nich kontener przewijania). overflow-x: clip przycina tak samo, bez kontenera
// przewijania; tylko na stronie z kalkulatorem (:has), !important wygrywa ze stylem inline. Przeglądarki
// bez `clip` odrzucą regułę i pasek zostanie zwykłym (nieprzyklejonym) wierszem.
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
.kalk-start { grid-column: 1 / -1; margin: 0; display: flex; flex-wrap: wrap; gap: 0.25rem 0.5rem; align-items: baseline; }
.kalk-tekstowy { padding: 0; border: 0; background: none; font: inherit; color: var(--w-pomarancz-tekst, #b4471f); text-decoration: underline; text-underline-offset: 3px; cursor: pointer; }
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
.kalk-pakiety { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 145px), 1fr)); gap: 0.5rem; }
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
  .kalk-akcja { flex-wrap: nowrap; gap: 0.75rem; padding-top: 0.55rem; padding-bottom: 0.55rem; }
  .kalk-akcja .btn { flex: 1 0 auto; padding: 0.7rem 1rem; white-space: nowrap; font-size: 0.95rem; }
  .kalk-biezacy { flex: 1 1 0; min-width: 0; font-size: 0.85rem; }
  .kalk-biezacy--pusty { display: none; }
  .kalk-biezacy strong { font-size: 0.95rem; }
}
`;

export default function KalkulatorClient() {
  const en = useLocale() === 'en';
  const lang = en ? 'en' : 'pl';
  const fmt = en ? zlEn : zl;
  const num = (n) => n.toLocaleString(en ? 'en-US' : 'pl-PL');
  const ulamek = (n) => n.toLocaleString(en ? 'en-US' : 'pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const [dane, setDane] = useState(POCZATEK);
  const sklep = dane.tryb === 'sklep';
  const pola = sklep ? (en ? POLA_SKLEP_EN : POLA_SKLEP) : (en ? POLA_EN : POLA);
  const liczba = en ? liczbaEn : liczbaPl;
  const [probowal, setProbowal] = useState(false);
  const wynikRef = useRef(null);
  const zgloszony = useRef(false);
  const zgloszonyZwrot = useRef(false);
  const zgloszonySklep = useRef(false);

  // Z-06: wynik z linku albo z przykładu (liczy się lokalnie, więc pokazuje się od razu).
  useParametrUrl(KLUCZE_URL, (p) => setDane((d) => ({ ...d, ...zParametrow(p) })));
  useEffect(() => {
    const wstaw = (e) => setDane(() => ({ ...POCZATEK, ...zParametrow(e.detail ?? PRZYKLAD) }));
    window.addEventListener('kalkulator-przyklad', wstaw);
    return () => window.removeEventListener('kalkulator-przyklad', wstaw);
  }, []);

  const wejscie = useMemo(() => ({
    wyszukiwania: Math.round(liczba(dane.wyszukiwania)),
    ruch: Math.round(liczba(dane.ruch || 0)),
    konwersja: liczba(dane.konwersja),
    wartosc: liczba(dane.wartosc),
    marza: liczba(dane.marza),
    udzialAi: liczba(dane.udzialAi),
    widocznyWAi: dane.widocznyWAi,
    // Tryb usług bez pól sklepu: te same dane i ten sam adres wyniku co przed 12.11.2026.
    ...(dane.tryb === 'sklep' ? { tryb: 'sklep', ...(dane.powroty !== '' ? { powroty: liczba(dane.powroty) } : {}) } : {}),
  }), [dane, liczba]);
  const blad = bladDanych(wejscie, lang);
  const wynik = blad ? null : policzStraty(wejscie);
  const wypelnione = ['wyszukiwania', 'konwersja', 'wartosc', 'marza'].every((k) => dane[k] !== '');

  const koszt = PAKIETY.includes(dane.pakiet) ? CENY[dane.pakiet].pln : dane.pakiet === 'wlasny' ? liczba(dane.koszt) : NaN;
  const miesiace = Number(dane.miesiace);
  const zwrot = wynik && dane.pakiet ? policzZwrot(wynik, koszt, miesiace) : null;

  // Z-K6: zdarzenie raz, sekundę po pierwszym poprawnym wyniku (nie przy każdym wpisanym znaku).
  const maWynik = !!wynik;
  const kwotaMin = wynik?.min.zysk ?? 0;
  useEffect(() => {
    if (!maWynik || zgloszony.current) return undefined;
    const t = setTimeout(() => {
      zgloszony.current = true;
      track('narzedzie_wynik', { narzedzie: 'kalkulator', wynik: kwotaMin });
    }, 1000);
    return () => clearTimeout(t);
  }, [maWynik, kwotaMin]);

  const zmien = (k) => (e) => {
    const v = e.target.value;
    setDane((d) => ({ ...d, [k]: v }));
    if (k === 'tryb' && v === 'sklep' && !zgloszonySklep.current) {
      zgloszonySklep.current = true;
      track('narzedzie_kalkulator_tryb', { tryb: v });
    }
    if (k === 'pakiet' && !zgloszonyZwrot.current) {
      zgloszonyZwrot.current = true;
      track('narzedzie_kalkulator_zwrot', { pakiet: v });
    }
  };

  function licz(e) {
    e.preventDefault();
    setProbowal(true);
    if (blad) return;
    zapiszParametry(parametryWyniku());
    wynikRef.current?.focus();
    wynikRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
    const od = c.od ? (en ? 'from ' : 'od ') : '';
    return en ? `${od}PLN ${c.pln.toLocaleString('en-US')} (€${c.eur}) net/mo` : `${od}${zl(c.pln)} netto/mies.`;
  };
  const miesiacTekst = (m) => (m === null ? (en ? `not within ${ZWROT.horyzont} months` : `nie w ciągu ${ZWROT.horyzont} miesięcy`) : (en ? `month ${m}` : `${m}. miesiąc`));
  // Zwrot w widełkach: optymistyczny (max) jest zawsze wcześniej albo równo z ostrożnym (min).
  const okresZwrotu = ({ min, max }) => {
    if (max.miesiacZwrotu === null) return miesiacTekst(null);
    if (min.miesiacZwrotu === null) return en ? `month ${max.miesiacZwrotu} (optimistic only)` : `${max.miesiacZwrotu}. miesiąc (tylko optymistycznie)`;
    if (min.miesiacZwrotu === max.miesiacZwrotu) return miesiacTekst(max.miesiacZwrotu);
    return en ? `month ${max.miesiacZwrotu} to ${min.miesiacZwrotu}` : `${max.miesiacZwrotu}.-${min.miesiacZwrotu}. miesiąc`;
  };
  const zeZnakiem = (n) => (n > 0 ? `+${fmt(n)}` : n < 0 ? `−${fmt(-n)}` : fmt(0));
  const klasa = (n) => (n > 0 ? 'kalk-plus' : n < 0 ? 'kalk-minus' : '');

  let wniosek = null;
  if (zwrot) {
    const { min, max } = zwrot;
    const nazwa = PAKIETY.includes(dane.pakiet) ? NAZWY_PAKIETOW[dane.pakiet] : (en ? 'This budget' : 'Ten budżet');
    if (max.prog === null || max.prog > 100) {
      wniosek = en
        ? `Even recovering the whole calculated loss would not cover ${fmt(koszt)} a month, so at this demand SEO at this price does not pay off. Check that your search number includes all your main keywords, or compare a smaller scope.`
        : `Nawet odzyskanie całej wyliczonej straty nie pokryje ${fmt(koszt)} miesięcznie, więc przy tym popycie SEO w tej cenie się nie opłaci. Sprawdź, czy liczba wyszukiwań obejmuje wszystkie główne frazy, albo porównaj mniejszy zakres.`;
    } else if (max.miesiacZwrotu === null) {
      wniosek = en
        ? `At full effect the recovered profit covers the cost only in the optimistic variant, and the months of build-up mean the cost does not pay back within ${ZWROT.horyzont} months.`
        : `Przy pełnym efekcie odzyskany zysk pokrywa koszt tylko w wariancie optymistycznym, a miesiące dochodzenia do efektu sprawiają, że koszt nie zwraca się w ${ZWROT.horyzont} miesięcy.`;
    } else if (min.miesiacZwrotu === null) {
      wniosek = en
        ? `${nazwa} pays back in month ${max.miesiacZwrotu} in the optimistic variant; in the cautious one not within ${ZWROT.horyzont} months.`
        : `${nazwa} zwraca się w ${max.miesiacZwrotu}. miesiącu w wariancie optymistycznym; w ostrożnym nie w ciągu ${ZWROT.horyzont} miesięcy.`;
    } else {
      wniosek = en
        ? `${nazwa} pays back between month ${max.miesiacZwrotu} and month ${min.miesiacZwrotu}. To cover the cost at full effect, it is enough to recover ${max.prog}-${min.prog}% of the calculated loss.`
        : `${nazwa} zwraca się między ${max.miesiacZwrotu}. a ${min.miesiacZwrotu}. miesiącem. Żeby zysk pokrył koszt przy pełnym efekcie, wystarczy odzyskać ${max.prog}-${min.prog}% wyliczonej straty.`;
    }
  }

  const bladKosztu = dane.pakiet === 'wlasny' && dane.koszt !== '' && !zwrot
    ? (en ? `Enter a monthly amount from ${ZWROT.koszt.min} to ${ZWROT.koszt.max.toLocaleString('en-US')} PLN.` : `Podaj kwotę miesięczną od ${ZWROT.koszt.min} do ${ZWROT.koszt.max.toLocaleString('pl-PL')} zł.`)
    : null;

  const daneRaportu = zwrot ? { ...wejscie, koszt: zwrot.koszt, miesiaceDoEfektu: zwrot.miesiaceDoEfektu } : wejscie;

  return (
    <div className="narz-app" id="narzedzie">
      <style>{CSS}</style>
      <PasekDemo />
      <form className="narz-formularz narz-kalkulator" onSubmit={licz} noValidate>
        <fieldset className="kalk-tryb">
          <legend className="narz-etykieta">{en ? 'What do you sell?' : 'Co sprzedajesz?'}</legend>
          <div className="kalk-tryb-opcje">
            {(en ? [['uslugi', 'Services'], ['sklep', 'Online shop']] : [['uslugi', 'Usługi lub zlecenia'], ['sklep', 'Sklep internetowy']]).map(([v, t]) => (
              <label key={v}><input type="radio" name="tryb" value={v} checked={dane.tryb === v} onChange={zmien('tryb')} data-cta={`narzedzie_kalkulator_tryb_${v}`} /><span>{t}</span></label>
            ))}
          </div>
        </fieldset>
        <p className="narz-mikro kalk-start">
          <span>{sklep
            ? (en ? 'Five numbers and one optional, the result updates as you type.' : 'Pięć liczb i jedna opcjonalna, wynik liczy się na bieżąco.')
            : (en ? 'Five numbers, the result updates as you type.' : 'Pięć liczb, wynik liczy się na bieżąco.')}</span>
          <button type="button" className="kalk-tekstowy" data-cta="narzedzie_kalkulator_przyklad" onClick={() => setDane({ ...POCZATEK, ...zParametrow(sklep ? PS : PRZYKLAD) })}>
            {en ? 'Fill in an example' : 'Wstaw przykład'}
          </button>
        </p>
        {pola.map((p) => (
          <div key={p.k} className="narz-kalk-pole">
            <label htmlFor={`k-${p.k}`} className="narz-etykieta">{p.etykieta}</label>
            <div className="narz-z-jednostka">
              <input id={`k-${p.k}`} name={p.k} value={dane[p.k]} onChange={zmien(p.k)} inputMode="decimal" autoComplete="off" placeholder={`${en ? 'e.g.' : 'np.'} ${p.przyklad}`} className="narz-pole" aria-describedby={`k-${p.k}-pomoc`} />
              {p.jednostka && <span aria-hidden="true">{p.jednostka}</span>}
            </div>
            <p id={`k-${p.k}-pomoc`} className="narz-mikro">{p.pomoc}</p>
          </div>
        ))}
        <div className="narz-kalk-pole">
          <label htmlFor="k-udzialAi" className="narz-etykieta">{en ? 'What share of customers ask AI instead of Google?' : 'Jaka część klientów pyta AI zamiast Google?'} <strong>{dane.udzialAi}%</strong></label>
          <input id="k-udzialAi" type="range" min="0" max="60" step="5" value={dane.udzialAi} onChange={zmien('udzialAi')} className="narz-suwak" />
          <p className="narz-mikro">{en
            ? `Default ${ZALOZENIA.udzialAiDomyslny}%: Gartner’s forecast of a drop in search volume to AI chatbots by 2026. Set your own value. The more questions go to AI, the fewer visits there are to win, because AI answers rarely end with a click.`
            : `Domyślnie ${ZALOZENIA.udzialAiDomyslny}%: prognoza Gartnera spadku wyszukiwań przez czaty AI do 2026. Ustaw swoją wartość. Im więcej pytań trafia do AI, tym mniej wejść jest do zdobycia, bo odpowiedzi AI rzadko kończą się kliknięciem.`}</p>
        </div>
        <fieldset className="narz-kalk-pole">
          <legend className="narz-etykieta">{sklep
            ? (en ? 'Do ChatGPT, Gemini or Perplexity recommend your shop today?' : 'Czy ChatGPT, Gemini albo Perplexity polecają dziś Twój sklep?')
            : (en ? 'Do ChatGPT, Gemini or Perplexity recommend your business today?' : 'Czy ChatGPT, Gemini albo Perplexity polecają dziś Twoją firmę?')}</legend>
          <div className="narz-wybor">
            {(en ? [['tak', 'Yes'], ['nie', 'No'], ['nie_wiem', 'Not sure']] : [['tak', 'Tak'], ['nie', 'Nie'], ['nie_wiem', 'Nie wiem']]).map(([v, t]) => (
              <label key={v}><input type="radio" name="widocznyWAi" value={v} checked={dane.widocznyWAi === v} onChange={zmien('widocznyWAi')} /> {t}</label>
            ))}
          </div>
        </fieldset>
        <div className="narz-kalk-akcja kalk-akcja">
          <p className={`kalk-biezacy${wynik ? '' : ' kalk-biezacy--pusty'}`} aria-hidden="true">
            {wynik
              ? <>{en ? 'Loss: ' : 'Strata: '}<strong>{fmt(wynik.min.zysk)} {en ? 'to' : 'do'} {fmt(wynik.max.zysk)}</strong>{en ? ' a month' : ' miesięcznie'}</>
              : (en ? 'Fill in the fields and the result appears right away.' : 'Wypełnij pola, a wynik pojawi się od razu.')}
          </p>
          <button type="submit" className="btn btn-primary" data-cta="narzedzie_kalkulator_licz">{en ? 'Calculate my loss' : 'Policz, ile tracę'}</button>
        </div>
        <div className="kalk-pod-akcja">
          {(probowal || wypelnione) && blad && <p role="alert" className="narz-blad">{blad}</p>}
          <p className="narz-mikro">{en ? 'Calculated in your browser, no sign-up. The assumptions and sources are further down the page.' : 'Liczymy w przeglądarce, bez rejestracji. Założenia i źródła są niżej na stronie.'}</p>
        </div>
      </form>

      {wynik && (
        <div className="narz-wynik narz-kalk-wynik" id="wynik-kalkulatora">
          <h2 className="kalk-wynik-tytul" ref={wynikRef} tabIndex={-1}>{en ? 'Your result' : 'Twój wynik'}</h2>
          <p className="narz-wynik-opis">{sklep
            ? (en ? 'Without a top 3 position on Google and without AI recommendations, your shop is losing an estimated' : 'Bez pozycji w TOP 3 Google i bez poleceń w AI sklep traci szacunkowo')
            : (en ? 'Without a top 3 position on Google and without AI recommendations, you are losing an estimated' : 'Bez pozycji w TOP 3 Google i bez poleceń w AI tracisz szacunkowo')}</p>
          <p className="narz-kwota">{fmt(wynik.min.zysk)} {en ? 'to' : 'do'} {fmt(wynik.max.zysk)}</p>
          {sklep ? (
            <p className="narz-wynik-opis">{en ? `in gross profit per month, or ${fmt(wynik.rocznieMin)} to ${fmt(wynik.rocznieMax)} per year, from ${fmt(wynik.min.przychod)} to ${fmt(wynik.max.przychod)} in lost sales a month. The range reflects differences between studies of clicks in Google and in AI answers (assumptions below).` : `marży brutto miesięcznie, czyli ${fmt(wynik.rocznieMin)} do ${fmt(wynik.rocznieMax)} rocznie, przy ${fmt(wynik.min.przychod)} do ${fmt(wynik.max.przychod)} utraconej sprzedaży miesięcznie. Widełki wynikają z różnic między badaniami kliknięć w Google i w odpowiedziach AI (założenia niżej).`}</p>
          ) : (
            <p className="narz-wynik-opis">{en ? `in profit per month, or ${fmt(wynik.rocznieMin)} to ${fmt(wynik.rocznieMax)} per year. The range reflects differences between studies of clicks in Google and in AI answers (assumptions below).` : `zysku miesięcznie, czyli ${fmt(wynik.rocznieMin)} do ${fmt(wynik.rocznieMax)} rocznie. Widełki wynikają z różnic między badaniami kliknięć w Google i w odpowiedziach AI (założenia niżej).`}</p>
          )}

          <div className="narz-rozbicie">
            <div><p className="narz-rozbicie-etykieta">{en ? 'No Google rankings' : 'Brak pozycji w Google'}</p><p className="narz-rozbicie-kwota">{fmt(wynik.min.zyskSeo)} {en ? 'to' : 'do'} {fmt(wynik.max.zyskSeo)}</p><p className="narz-mikro">{num(wynik.min.wizytySeo)} {en ? 'to' : 'do'} {num(wynik.max.wizytySeo)} {en ? 'visits per month' : 'wejść miesięcznie'}</p></div>
            <div><p className="narz-rozbicie-etykieta">{en ? 'No AI recommendations' : 'Brak poleceń w AI'}</p><p className="narz-rozbicie-kwota">{fmt(wynik.min.zyskAi)} {en ? 'to' : 'do'} {fmt(wynik.max.zyskAi)}</p><p className="narz-mikro">{num(wynik.min.wizytyAi)} {en ? 'to' : 'do'} {num(wynik.max.wizytyAi)} {en ? 'visits from AI recommendations per month' : 'wejść z poleceń AI miesięcznie'}</p></div>
            {sklep ? (
              <div><p className="narz-rozbicie-etykieta">{en ? 'Lost orders' : 'Utracone zamówienia'}</p><p className="narz-rozbicie-kwota">{num(wynik.min.zamowienia)} {en ? 'to' : 'do'} {num(wynik.max.zamowienia)}</p><p className="narz-mikro">{wejscie.powroty > 0
                ? (en ? `per month, including ${num(wynik.min.klienci)} to ${num(wynik.max.klienci)} first orders from new customers` : `miesięcznie, w tym ${num(wynik.min.klienci)} do ${num(wynik.max.klienci)} pierwszych zamówień nowych klientów`)
                : (en ? 'per month (first orders only)' : 'miesięcznie (tylko pierwsze zamówienia)')}</p></div>
            ) : (
              <div><p className="narz-rozbicie-etykieta">{en ? 'Lost customers' : 'Utraceni klienci'}</p><p className="narz-rozbicie-kwota">{num(wynik.min.klienci)} {en ? 'to' : 'do'} {num(wynik.max.klienci)}</p><p className="narz-mikro">{en ? 'per month' : 'miesięcznie'}</p></div>
            )}
          </div>

          <div className="kalk-zwrot" role="region" aria-labelledby="kalk-zwrot-tytul">
            <h3 id="kalk-zwrot-tytul">{en ? 'Will SEO pay off? Cost and payback' : 'Czy SEO się opłaci? Koszt i zwrot'}</h3>
            <fieldset>
              <legend className="narz-etykieta">{en ? 'How much do you spend, or plan to spend, on SEO per month?' : 'Ile wydajesz albo chcesz wydać na SEO miesięcznie?'}</legend>
              <div className="kalk-pakiety">
                {PAKIETY.map((k) => (
                  <label key={k}>
                    <input type="radio" name="pakiet" value={k} checked={dane.pakiet === k} onChange={zmien('pakiet')} />
                    <span>{NAZWY_PAKIETOW[k]}<small>{cenaPakietu(k)}{CENY[k].umowaMiesiecy ? (en ? `, ${CENY[k].umowaMiesiecy}-month minimum, new website included` : `, umowa min. ${CENY[k].umowaMiesiecy} mies., nowa strona w pakiecie`) : ''}</small></span>
                  </label>
                ))}
                <label>
                  <input type="radio" name="pakiet" value="wlasny" checked={dane.pakiet === 'wlasny'} onChange={zmien('pakiet')} />
                  <span>{en ? 'My own amount' : 'Własna kwota'}<small>{en ? 'e.g. another agency’s quote' : 'np. wycena innej agencji'}</small></span>
                </label>
              </div>
            </fieldset>
            {dane.pakiet === 'wlasny' && (
              <div className="narz-kalk-pole">
                <label htmlFor="k-koszt" className="narz-etykieta">{en ? 'Monthly SEO cost (net)' : 'Miesięczny koszt SEO (netto)'}</label>
                <div className="narz-z-jednostka">
                  <input id="k-koszt" name="koszt" value={dane.koszt} onChange={zmien('koszt')} inputMode="decimal" autoComplete="off" placeholder={en ? 'e.g. 3000' : 'np. 3000'} className="narz-pole" />
                  <span aria-hidden="true">{en ? 'PLN' : 'zł'}</span>
                </div>
                {bladKosztu && <p role="alert" className="narz-blad">{bladKosztu}</p>}
              </div>
            )}
            {dane.pakiet && (
              <div className="narz-kalk-pole">
                <label htmlFor="k-miesiace" className="narz-etykieta">{en ? 'After how many months will SEO reach full effect?' : 'Po ilu miesiącach SEO da pełny efekt?'} <strong>{dane.miesiace}</strong></label>
                <input id="k-miesiace" type="range" min={ZWROT.miesiaceDoEfektu.min} max={ZWROT.miesiaceDoEfektu.max} step="1" value={dane.miesiace} onChange={zmien('miesiace')} className="narz-suwak" />
                <p className="narz-mikro">{en
                  ? `Default ${ZWROT.miesiaceDoEfektu.domyslnie}: our assumption, not a study result. Until then the recovered profit grows evenly. With a new domain or strong competitors, set more.`
                  : `Domyślnie ${ZWROT.miesiaceDoEfektu.domyslnie}: nasze założenie, nie wynik badania. Do tego czasu odzyskany zysk rośnie równo. Przy nowej domenie albo silnej konkurencji ustaw więcej.`}</p>
              </div>
            )}
            {zwrot && (
              <>
                <div className="kalk-zwrot-liczby">
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Monthly balance at full effect' : 'Bilans miesięczny przy pełnym efekcie'}</p><p className="narz-rozbicie-kwota"><span className={klasa(zwrot.min.bilans)}>{zeZnakiem(zwrot.min.bilans)}</span> {en ? 'to' : 'do'} <span className={klasa(zwrot.max.bilans)}>{zeZnakiem(zwrot.max.bilans)}</span></p></div>
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Balance of the first 12 months' : 'Bilans pierwszych 12 miesięcy'}</p><p className="narz-rozbicie-kwota"><span className={klasa(zwrot.min.bilansRok)}>{zeZnakiem(zwrot.min.bilansRok)}</span> {en ? 'to' : 'do'} <span className={klasa(zwrot.max.bilansRok)}>{zeZnakiem(zwrot.max.bilansRok)}</span></p></div>
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Payback' : 'Zwrot kosztu'}</p><p className="narz-rozbicie-kwota">{okresZwrotu(zwrot)}</p><p className="narz-mikro">{en ? `the profit covers the cost ${ulamek(zwrot.min.razy)}-${ulamek(zwrot.max.razy)} times` : `zysk pokrywa koszt ${ulamek(zwrot.min.razy)}-${ulamek(zwrot.max.razy)} raza`}</p></div>
                </div>
                <p className="narz-mikro" role="status">{wniosek} {en
                  ? `This is arithmetic on your numbers, not a promise: we assume you recover the whole calculated loss after ${zwrot.miesiaceDoEfektu} months, and SEO results take months.`
                  : `To arytmetyka na Twoich liczbach, nie obietnica: zakładamy odzyskanie całej wyliczonej straty po ${zwrot.miesiaceDoEfektu} miesiącach, a efekty SEO przychodzą po miesiącach.`}</p>
              </>
            )}
            <p className="narz-mikro kalk-dalej">{en ? 'Package details: ' : 'Zakres pakietów: '}<Link href="/cennik-pozycjonowania" className="narz-link">{en ? 'SEO pricing' : 'cennik pozycjonowania'}</Link>{en ? '. What we do each month: ' : '. Co robimy co miesiąc: '}<Link href="/pozycjonowanie-stron-internetowych" className="narz-link">{en ? 'SEO services' : 'pozycjonowanie stron'}</Link>.</p>
          </div>

          <p className="narz-mikro kalk-dalej">
            {en ? 'Next step: the ' : 'Następny krok: '}
            <Link href="/narzedzia/audyt-seo" className="narz-link">{en ? 'free SEO audit' : 'darmowy audyt SEO'}</Link>
            {en ? ' shows what holds your site back' : ' pokaże, co blokuje stronę'}
            {SPRAWDZARKA_DZIALA ? <>{en ? ', and the ' : ', a '}<Link href="/sprawdz-widocznosc-w-ai" className="narz-link">{en ? 'AI visibility check' : 'sprawdzarka widoczności w AI'}</Link>{en ? ' whether AI models mention your business.' : ', czy modele AI wymieniają Twoją firmę.'}</> : '.'}
          </p>
          <LinkWyniku narzedzie="kalkulator" tryb="wynik" parametry={parametryWyniku()} />

          <BramkaEmail
            narzedzie="kalkulator"
            dane={daneRaportu}
            tylkoRaport
            naglowek={en ? 'Email me the summary' : 'Wyślij zestawienie e-mailem'}
            opis={en ? 'We will send the result with the Google and AI breakdown and the assumptions, so you can come back to it when you plan your budget.' : 'Wyślemy wynik z rozbiciem na Google i AI oraz z założeniami, żeby wrócić do niego przy planowaniu budżetu.'}
            korzysci={en
              ? ['The loss split between Google and AI', dane.tryb === 'sklep' ? 'Lost orders and sales per month' : 'Customers lost per month', zwrot ? 'SEO cost and payback month' : 'A short action plan', 'Assumptions and sources in one place']
              : ['Rozbicie straty na Google i AI', dane.tryb === 'sklep' ? 'Utracone zamówienia i sprzedaż miesięcznie' : 'Liczba klientów miesięcznie', zwrot ? 'Koszt SEO i miesiąc zwrotu' : 'Krótki plan działań', 'Założenia i źródła w jednym miejscu']}
            przycisk={en ? 'Send the summary' : 'Wyślij zestawienie'}
          />
        </div>
      )}
    </div>
  );
}
