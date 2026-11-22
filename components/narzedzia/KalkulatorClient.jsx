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
import { zachowaniePrzewijania } from '@/lib/ruch';
import BramkaEmail from './BramkaEmail';
import LinkWyniku from './LinkWyniku';
import { PasekDemo } from './Wspolne';
import Zwin from './Zwin';
import './ruch-b.css';
import { czasTokenu } from './wyjscie';

const zl = (n) => `${Math.round(n).toLocaleString('pl-PL')} zł`;
const formatujWaluteEn = (n, waluta = 'USD') => {
  const kwota = Math.round(n);
  if (waluta === 'USD') return `$${kwota.toLocaleString('en-US')}`;
  if (waluta === 'EUR') return `€${kwota.toLocaleString('en-US')}`;
  if (waluta === 'GBP') return `£${kwota.toLocaleString('en-GB')}`;
  return `PLN ${kwota.toLocaleString('en-US')}`;
};
const liczbaPl = (v) => Number(String(v).replace(/\s/g, '').replace(',', '.'));
// EN: przecinek to separator tysięcy ("1,500"), kropka to ułamek.
const liczbaEn = (v) => Number(String(v).replace(/[\s,]/g, ''));

// Przykład „firma usługowa” (Z-K3) = podpowiedzi z pól formularza; ta sama stała liczy przykład na stronie.
const PRZYKLAD = PRZYKLADY.usluga;
const PS = PRZYKLADY.sklep;
// Podpowiedź liczby w polu: PL z przecinkiem dziesiętnym, EN z kropką.
const podp = (v, en) => (en ? String(v) : String(v).replace('.', ','));

// Pakiety z cennika pozycjonowania (ceny netto miesięcznie z lib/narzedziaLiczby.js + przeliczniki EN).
const PAKIETY = ['seoStandard', 'seoPremium', 'boosterPack'];
const NAZWY_PAKIETOW = { seoStandard: 'SEO Standard', seoPremium: 'SEO Premium', boosterPack: 'Booster Pack' };
const WALUTY_EN = [
  ['USD', 'USD ($)'],
  ['EUR', 'EUR (€)'],
  ['GBP', 'GBP (£)'],
  ['PLN', 'PLN'],
];
const CENY_PAKIETOW_WALUTY = {
  PLN: { seoStandard: CENY.seoStandard.pln, seoPremium: CENY.seoPremium.pln, boosterPack: CENY.boosterPack.pln },
  EUR: { seoStandard: CENY.seoStandard.eur, seoPremium: CENY.seoPremium.eur, boosterPack: CENY.boosterPack.eur },
  USD: { seoStandard: 550, seoPremium: 700, boosterPack: 700 },
  GBP: { seoStandard: 390, seoPremium: 510, boosterPack: 510 },
};

const PRZYKLADY_BRANZ_PL = [
  { id: 'remont', etykieta: 'Usługi lokalne / remonty', tryb: 'uslugi', wyszukiwania: 1500, ruch: 40, konwersja: 3, wartosc: 8000, marza: 35, udzialAi: 25, widocznyWAi: 'nie', pakiet: 'seoStandard', miesiace: 12 },
  { id: 'gabinet', etykieta: 'Gabinet / klinika', tryb: 'uslugi', wyszukiwania: 3200, ruch: 60, konwersja: 3, wartosc: 2500, marza: 45, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoStandard', miesiace: 12 },
  { id: 'kancelaria', etykieta: 'Kancelaria / księgowość', tryb: 'uslugi', wyszukiwania: 2000, ruch: 35, konwersja: 2, wartosc: 4500, marza: 55, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoPremium', miesiace: 12 },
  { id: 'b2b', etykieta: 'Firma B2B / produkcja / IT', tryb: 'uslugi', wyszukiwania: 1600, ruch: 25, konwersja: 1.5, wartosc: 25000, marza: 30, udzialAi: 30, widocznyWAi: 'nie', pakiet: 'seoPremium', miesiace: 12 },
  { id: 'sklep', etykieta: 'Sklep internetowy', tryb: 'sklep', wyszukiwania: 30000, ruch: 1800, konwersja: 1.3, wartosc: 220, marza: 35, powroty: 25, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoStandard', miesiace: 12 },
];

const PRZYKLADY_BRANZ_EN = [
  { id: 'contractors', etykieta: 'Home services / contractors', tryb: 'uslugi', wyszukiwania: 2400, ruch: 35, konwersja: 2.5, wartosc: 3800, wartoscPln: 15000, marza: 35, udzialAi: 25, widocznyWAi: 'nie', pakiet: 'seoStandard', miesiace: 12 },
  { id: 'clinic', etykieta: 'Dental / medical clinic', tryb: 'uslugi', wyszukiwania: 3200, ruch: 50, konwersja: 3, wartosc: 1200, wartoscPln: 4800, marza: 45, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoStandard', miesiace: 12 },
  { id: 'legal', etykieta: 'Law / accounting firm', tryb: 'uslugi', wyszukiwania: 2000, ruch: 30, konwersja: 2, wartosc: 2800, wartoscPln: 11000, marza: 55, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoPremium', miesiace: 12 },
  { id: 'b2b', etykieta: 'B2B / SaaS / IT', tryb: 'uslugi', wyszukiwania: 1600, ruch: 25, konwersja: 1.5, wartosc: 12000, wartoscPln: 45000, marza: 30, udzialAi: 30, widocznyWAi: 'nie', pakiet: 'seoPremium', miesiace: 12 },
  { id: 'shop', etykieta: 'Online shop', tryb: 'sklep', wyszukiwania: 30000, ruch: 500, konwersja: 1.3, wartosc: 110, wartoscPln: 420, marza: 38, powroty: 25, udzialAi: 25, widocznyWAi: 'nie_wiem', pakiet: 'seoStandard', miesiace: 12 },
];

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

const KLUCZE_URL = ['tryb', 'waluta', 'wyszukiwania', 'ruch', 'konwersja', 'closeRate', 'wartosc', 'marza', 'powroty', 'udzialAi', 'widocznyWAi', 'pakiet', 'koszt', 'miesiace'];
const WIDOCZNOSC = ['tak', 'nie', 'nie_wiem'];
const DOZWOLONE_WALUTY_EN = ['USD', 'EUR', 'GBP', 'PLN'];
const POCZATEK = { tryb: 'uslugi', wyszukiwania: '', ruch: '', konwersja: '', closeRate: '100', wartosc: '', marza: '', powroty: '', udzialAi: String(ZALOZENIA.udzialAiDomyslny), widocznyWAi: 'nie_wiem', pakiet: '', koszt: '', miesiace: String(ZWROT.miesiaceDoEfektu.domyslnie) };

// Wartości z adresu albo z przykładu -> stan formularza (teksty pól). Złe wartości pomija.
function zParametrow(p) {
  const d = {};
  if (p.tryb === 'sklep' || p.tryb === 'uslugi') d.tryb = p.tryb;
  if (p.waluta && DOZWOLONE_WALUTY_EN.includes(String(p.waluta).toUpperCase())) d.waluta = String(p.waluta).toUpperCase();
  for (const k of ['wyszukiwania', 'ruch', 'konwersja', 'wartosc', 'marza', 'powroty', 'koszt']) {
    if (p[k] !== undefined && p[k] !== '' && Number.isFinite(Number(p[k]))) d[k] = String(p[k]);
  }
  const cr = Number(p.closeRate);
  if (p.closeRate !== undefined && Number.isFinite(cr) && cr >= 5 && cr <= 100) {
    d.closeRate = String(Math.min(100, Math.max(5, Math.round(cr / 5) * 5)));
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
        document.getElementById('narzedzie')?.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
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
.kalk-tryb-wiersz { grid-column: 1 / -1; display: flex; flex-wrap: wrap; gap: 0.9rem 1.5rem; align-items: flex-end; justify-content: space-between; }
.kalk-tryb-wiersz .kalk-tryb { grid-column: auto; }
.kalk-waluta-opcje { display: inline-grid; grid-template-columns: repeat(4, auto); gap: 0.2rem; padding: 0.25rem; border-radius: 999px; background: var(--w-papier, #f6f4ef); }
.kalk-waluta-opcje label { position: relative; display: block; cursor: pointer; }
.kalk-waluta-opcje input { position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0; border: 0; clip-path: inset(50%); overflow: hidden; white-space: nowrap; }
.kalk-waluta-opcje span { display: block; padding: 0.45rem 0.75rem; border-radius: 999px; font-weight: 600; font-size: 0.88rem; color: var(--w-tusz-2); line-height: 1.3; text-align: center; }
.kalk-waluta-opcje input:checked + span { background: #fff; color: var(--w-tusz); box-shadow: 0 1px 3px rgba(10, 19, 55, 0.12), 0 0 0 1px var(--w-pomarancz, #d85a30); }
.kalk-waluta-opcje input:focus-visible + span { outline: 2px solid var(--w-pomarancz, #d85a30); outline-offset: 2px; }
.kalk-start { grid-column: 1 / -1; margin: 0; display: grid; gap: 0.45rem; }
.kalk-beispiele { display: flex; flex-wrap: wrap; gap: 0.4rem; align-items: center; }
.kalk-chip { padding: 0.35rem 0.75rem; border-radius: 999px; border: 1px solid rgba(10, 19, 55, 0.14); background: #fff; font: inherit; font-size: 0.84rem; font-weight: 500; color: var(--w-tusz); cursor: pointer; transition: border-color 150ms ease, background-color 150ms ease; }
.kalk-chip:hover { border-color: var(--w-pomarancz, #d85a30); background: var(--w-papier, #f6f4ef); }
.kalk-chip--aktywny { border-color: var(--w-pomarancz, #d85a30); box-shadow: 0 0 0 1px var(--w-pomarancz, #d85a30); font-weight: 600; }
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
.kalk-zwrot-liczby { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 170px), 1fr)); gap: 0.6rem; font-variant-numeric: tabular-nums; }
.kalk-zwrot-liczby > div { padding: 0.8rem; border-radius: 14px; background: #fff; }
.kalk-zwrot-liczby .narz-rozbicie-kwota { font-size: 1.1rem; }
.kalk-jcurve { margin-top: 0.75rem; padding: 0.9rem 1rem; border-radius: 16px; background: #fff; border: 1px solid rgba(10, 19, 55, 0.08); font-variant-numeric: tabular-nums; }
.kalk-jcurve-nagl { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.45rem 1rem; margin-bottom: 0.55rem; font-size: 0.84rem; color: var(--w-tusz-2); }
.kalk-jcurve-legenda { display: flex; flex-wrap: wrap; gap: 0.75rem; align-items: center; font-size: 0.78rem; }
.kalk-jcurve-legenda span { display: inline-flex; align-items: center; gap: 0.35rem; }
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
  .kalk-jcurve svg { min-height: 150px; }
}
`;

const nie_ruchu = () => typeof window === 'undefined' || !window.matchMedia || window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Kwota straty. Po kliknięciu „Policz” (zmiana `tick`) liczby dochodzą raz do wartości końcowej (480 ms, od 70%, żeby
 *  liczba cyfr i szerokość linii się nie zmieniały). Przy wpisywaniu (zmiana wartości) kwota reaguje natychmiast,
 *  pod prefers-reduced-motion: reduce zawsze. Tekst w DOM to zawsze bieżąca wartość. */
function Kwota({ min, max, fmt, slowo, tick }) {
  const [p, setP] = useState(1);
  const [widziany, setWidziany] = useState(tick);
  // Zmiana tick: p ustawiamy na 0,7 jeszcze w tym samym renderze (wzorzec "state from props"), więc pierwsza klatka
  // nie pokazuje wartości końcowej i nie ma mignięcia 100% -> 70% -> 100%. Pod reduce zostaje 1 (bez animacji).
  if (tick !== widziany) {
    setWidziany(tick);
    if (!nie_ruchu()) setP(0.7);
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
  }, [widziany]); // eslint-disable-line react-hooks/exhaustive-deps -- start tylko po zmianie tick
  return <p className="narz-kwota">{fmt(min * p)} {slowo} {fmt(max * p)}</p>;
}

function skrotKwoty(v, waluta, en) {
  const n = Math.round(v);
  const abs = Math.abs(n);
  const pref = waluta === 'USD' ? '$' : waluta === 'EUR' ? '€' : waluta === 'GBP' ? '£' : '';
  const suf = pref ? '' : (en ? ' PLN' : ' zł');
  if (abs >= 1_000_000) {
    const mln = (n / 1_000_000).toLocaleString(en ? 'en-US' : 'pl-PL', { maximumFractionDigits: 1 });
    return `${pref}${mln}${en ? 'M' : ' mln'}${suf}`;
  }
  if (abs >= 10_000) {
    const tys = Math.round(n / 1000).toLocaleString(en ? 'en-US' : 'pl-PL');
    return `${pref}${tys}${en ? 'k' : ' tys.'}${suf}`;
  }
  return `${pref}${n.toLocaleString(en ? 'en-US' : 'pl-PL')}${suf}`;
}

function WykresJCurve({ zyskMin, zyskMax, koszt, miesiaceDoEfektu, waluta, en, fmt }) {
  const zyskSrodek = (zyskMin + zyskMax) / 2;
  const n = Math.max(1, Number(miesiaceDoEfektu) || 12);
  const punkty = [{ m: 0, kosztSkum: 0, zyskSkum: 0 }];
  let sumaZysku = 0;
  let przeciecie = null;
  for (let m = 1; m <= 24; m += 1) {
    sumaZysku += zyskSrodek * Math.min(m / n, 1);
    const kosztM = koszt * m;
    const prev = punkty[m - 1];
    const prevBilans = prev.zyskSkum - prev.kosztSkum;
    const currBilans = sumaZysku - kosztM;
    if (przeciecie === null && currBilans >= 0 && sumaZysku > 0) {
      const delta = currBilans - prevBilans;
      const u = delta > 0 ? Math.min(1, Math.max(0, (0 - prevBilans) / delta)) : 1;
      const mDokladny = (m - 1) + u;
      przeciecie = {
        miesiac: m,
        mDokladny,
        kwota: prev.kosztSkum + u * (kosztM - prev.kosztSkum),
      };
    }
    punkty.push({ m, kosztSkum: kosztM, zyskSkum: sumaZysku });
  }

  const wysSvg = 256;
  const padL = 68;
  const padR = 22;
  const padT = 28;
  const padB = 32;
  const szer = 640 - padL - padR;
  const wys = wysSvg - padT - padB;
  const maxY = Math.max(punkty[24].kosztSkum, punkty[24].zyskSkum, 1) * 1.18;
  const x = (m) => padL + (m / 24) * szer;
  const y = (v) => padT + wys - (v / maxY) * wys;

  const sciezkaKosztu = punkty.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.m).toFixed(1)},${y(p.kosztSkum).toFixed(1)}`).join(' ');
  const sciezkaZysku = punkty.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.m).toFixed(1)},${y(p.zyskSkum).toFixed(1)}`).join(' ');
  const obszarZysku = `${sciezkaZysku} L${x(24).toFixed(1)},${y(0).toFixed(1)} L${x(0).toFixed(1)},${y(0).toFixed(1)} Z`;

  const etykietaPrzeciecia = przeciecie
    ? (en ? `Break-Even: month ${przeciecie.miesiac}` : `Break-Even: ${przeciecie.miesiac}. mies.`)
    : (en ? 'Break-Even: > 24 mo' : 'Break-Even: > 24 mies.');
  const badgeW = Math.round(etykietaPrzeciecia.length * 6.8 + 18);
  const cxPrzeciecia = przeciecie ? x(przeciecie.mDokladny) : 0;
  const badgeX = przeciecie
    ? Math.max(padL + 4, Math.min(640 - padR - badgeW - 4, cxPrzeciecia - badgeW / 2))
    : padL + 4;

  return (
    <div className="kalk-jcurve">
      <div className="kalk-jcurve-nagl">
        <strong style={{ color: 'var(--w-tusz)', fontSize: '0.88rem' }}>
          {en ? 'ROI J-Curve (1-24 months, midpoint variant)' : 'Krzywa zwrotu inwestycji J-Curve (1-24 mies., wariant środkowy)'}
        </strong>
        <div className="kalk-jcurve-legenda">
          <span>
            <i style={{ width: 12, height: 3, background: '#047857', display: 'inline-block', borderRadius: 2 }} aria-hidden="true" />
            {en ? 'Cumulative recovered profit' : 'Skumulowany odzyskany zysk'}
          </span>
          <span>
            <i style={{ width: 12, height: 2, borderTop: '2px dashed #64748b', display: 'inline-block' }} aria-hidden="true" />
            {en ? 'Cumulative SEO cost' : 'Skumulowany koszt SEO'}
          </span>
        </div>
      </div>
      <svg
        viewBox={`0 0 640 ${wysSvg}`}
        role="img"
        aria-label={en
          ? `Cumulative SEO cost versus recovered profit over 24 months. ${etykietaPrzeciecia}. After 24 months: ${fmt(punkty[24].zyskSkum)} recovered profit vs ${fmt(punkty[24].kosztSkum)} cost.`
          : `Skumulowany koszt SEO względem odzyskanego zysku w 24 miesiące. ${etykietaPrzeciecia}. Po 24 mies.: ${fmt(punkty[24].zyskSkum)} zysku wobec ${fmt(punkty[24].kosztSkum)} kosztu.`}
        style={{ display: 'block', width: '100%', height: 'auto', fontFamily: 'var(--w-sans)', fontVariantNumeric: 'tabular-nums' }}
      >
        {[0, 0.5, 1].map((u) => {
          const wart = maxY * u;
          const pozY = y(wart);
          return (
            <g key={u}>
              <line x1={padL} y1={pozY} x2={640 - padR} y2={pozY} stroke="rgba(15,23,42,0.08)" strokeWidth="1" />
              <text x={padL - 8} y={pozY + 4} textAnchor="end" fontSize="11.5" fill="#64748b">
                {skrotKwoty(wart, waluta, en)}
              </text>
            </g>
          );
        })}

        {[1, 6, 12, 18, 24].map((m) => (
          <g key={m}>
            <line x1={x(m)} y1={padT + wys} x2={x(m)} y2={padT + wys + 4} stroke="rgba(15,23,42,0.2)" strokeWidth="1" />
            <text x={x(m)} y={wysSvg - 10} textAnchor="middle" fontSize="11.5" fill="#64748b">
              {en ? `M${m}` : `${m} m.`}
            </text>
          </g>
        ))}

        <path d={obszarZysku} fill="rgba(4, 120, 87, 0.09)" />
        <path d={sciezkaKosztu} fill="none" stroke="#64748b" strokeWidth="2" strokeDasharray="5 4" />
        <path d={sciezkaZysku} fill="none" stroke="#047857" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />

        {przeciecie && (
          <g>
            <line
              x1={cxPrzeciecia}
              y1={padT + 2}
              x2={cxPrzeciecia}
              y2={padT + wys}
              stroke="#d85a30"
              strokeWidth="1.4"
              strokeDasharray="3 3"
            />
            <circle
              cx={cxPrzeciecia}
              cy={y(przeciecie.kwota)}
              r="5.5"
              fill="#d85a30"
              stroke="#ffffff"
              strokeWidth="2"
            />
            <rect
              x={badgeX}
              y={padT + 2}
              width={badgeW}
              height={20}
              rx="6"
              fill="rgba(255,255,255,0.95)"
              stroke="rgba(216,90,48,0.45)"
              strokeWidth="1"
            />
            <text
              x={badgeX + badgeW / 2}
              y={padT + 16}
              textAnchor="middle"
              fontSize="11.5"
              fontWeight="700"
              fill="#b4471f"
            >
              {etykietaPrzeciecia}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
}

export default function KalkulatorClient() {
  const en = useLocale() === 'en';
  const lang = en ? 'en' : 'pl';
  const [dane, setDane] = useState(() => ({ ...POCZATEK, pakiet: 'seoStandard' }));
  const [walutaEn, setWalutaEn] = useState('USD');
  const [aktywnyPrzyklad, setAktywnyPrzyklad] = useState('');
  const waluta = en ? walutaEn : 'PLN';
  const fmt = en ? (n) => formatujWaluteEn(n, waluta) : zl;
  const jednostkaWaluty = waluta === 'USD' ? '$' : waluta === 'EUR' ? '€' : waluta === 'GBP' ? '£' : (en ? 'PLN' : 'zł');
  const num = (n) => n.toLocaleString(en ? 'en-US' : 'pl-PL');
  const ulamek = (n) => n.toLocaleString(en ? 'en-US' : 'pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const sklep = dane.tryb === 'sklep';
  const polaBazowe = sklep ? (en ? POLA_SKLEP_EN : POLA_SKLEP) : (en ? POLA_EN : POLA);
  const pola = polaBazowe.map((p) => {
    if (p.k !== 'wartosc') return p;
    if (!en) return p;
    const przykladKwoty = waluta === 'PLN' ? (sklep ? '220' : '1500') : (sklep ? '110' : '1200');
    return { ...p, jednostka: jednostkaWaluty, przyklad: przykladKwoty };
  });
  const liczba = en ? liczbaEn : liczbaPl;
  const [probowal, setProbowal] = useState(false);
  const [licznik, setLicznik] = useState(0); // kolejne „Policz”: uruchamia dojście kwoty (Kwota)
  const [blysk, setBlysk] = useState(0); // wypełnienie przykładem: pola rozjaśniają się raz
  const wynikRef = useRef(null);
  const poleSklepPowroty = (en ? POLA_SKLEP_EN : POLA_SKLEP).find((x) => x.k === 'powroty');
  const listaPrzykladow = en ? PRZYKLADY_BRANZ_EN : PRZYKLADY_BRANZ_PL;
  // Jedno pole formularza; `key` z licznikiem wypełnień wstawia klasę rozjaśnienia od nowa przy każdym „Wstaw przykład”.
  const poleFormularza = (p) => (
    <div key={p.k} className="narz-kalk-pole">
      <label htmlFor={`k-${p.k}`} className="narz-etykieta">{p.etykieta}</label>
      <div className="narz-z-jednostka">
        <input key={blysk} id={`k-${p.k}`} name={p.k} value={dane[p.k]} onChange={zmien(p.k)} inputMode="decimal" autoComplete="off" placeholder={`${en ? 'e.g.' : 'np.'} ${p.przyklad}`} className={`narz-pole${blysk ? ' kalk-wypelnione' : ''}`} aria-describedby={`k-${p.k}-pomoc`} />
        {p.jednostka && <span aria-hidden="true">{p.jednostka}</span>}
      </div>
      <p id={`k-${p.k}-pomoc`} className="narz-mikro">{p.pomoc}</p>
    </div>
  );
  const zgloszony = useRef(false);
  const zgloszonyStart = useRef(false);
  const zgloszonyZwrot = useRef(false);
  const zgloszonySklep = useRef(false);

  // Z-06: wynik z linku albo z przykładu (liczy się lokalnie, więc pokazuje się od razu).
  useParametrUrl(KLUCZE_URL, (p) => {
    const oczyszczone = zParametrow(p);
    if (en && oczyszczone.waluta) {
      setWalutaEn(oczyszczone.waluta);
      delete oczyszczone.waluta;
    } else if (en && p.wartosc !== undefined && !p.waluta) {
      // Starsze linki EN bez parametru waluta były w PLN.
      setWalutaEn('PLN');
    }
    setDane((d) => ({ ...d, ...oczyszczone }));
  });
  useEffect(() => {
    const wstaw = (e) => {
      const zrodlo = e.detail ?? PRZYKLAD;
      // WstawPrzyklad ze strony (PRZYKLADY.usluga / remont / sklep) ma kwoty w PLN.
      if (en && !zrodlo.wartoscPln && (zrodlo === PRZYKLAD || zrodlo === PRZYKLADY.remont || zrodlo === PS)) {
        setWalutaEn('PLN');
      }
      setDane((d) => ({ ...POCZATEK, pakiet: d.pakiet || 'seoStandard', ...zParametrow(zrodlo) }));
      setAktywnyPrzyklad(zrodlo.id || '');
      setBlysk((b) => b + 1);
    };
    window.addEventListener('kalkulator-przyklad', wstaw);
    return () => window.removeEventListener('kalkulator-przyklad', wstaw);
  }, [en]);

  const closeRateNum = Math.min(100, Math.max(5, Number(dane.closeRate) || 100));
  const czySkalujeCloseRate = !sklep && closeRateNum < 100;
  const wejscieSurowe = useMemo(() => ({
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
  const blad = bladDanych(wejscieSurowe, lang, waluta);
  const wejscie = useMemo(() => {
    if (!czySkalujeCloseRate || !Number.isFinite(wejscieSurowe.konwersja)) return wejscieSurowe;
    return {
      ...wejscieSurowe,
      konwersja: Math.max(0.01, Number((wejscieSurowe.konwersja * (closeRateNum / 100)).toFixed(4))),
    };
  }, [wejscieSurowe, czySkalujeCloseRate, closeRateNum]);
  const wynik = useMemo(() => (blad ? null : policzStraty(wejscie)), [blad, wejscie]);
  const wynikZapytan = useMemo(() => (blad ? null : policzStraty(wejscieSurowe)), [blad, wejscieSurowe]);
  // Ostatni poprawny wynik: potrzebny, gdy wynik się zwija po wpisaniu błędnej wartości (Zwin trzyma treść 200 ms).
  const [ostWynik, setOstWynik] = useState(null);
  if (wynik && wynik !== ostWynik) setOstWynik(wynik);
  const W = wynik ?? ostWynik;
  const [ostZapytan, setOstZapytan] = useState(null);
  if (wynikZapytan && wynikZapytan !== ostZapytan) setOstZapytan(wynikZapytan);
  const WZapytan = wynikZapytan ?? ostZapytan;
  const [ostBlad, setOstBlad] = useState('');
  if (blad && blad !== ostBlad) setOstBlad(blad);
  const wypelnione = ['wyszukiwania', 'konwersja', 'wartosc', 'marza'].every((k) => dane[k] !== '');

  const cennikWaluty = CENY_PAKIETOW_WALUTY[waluta] ?? CENY_PAKIETOW_WALUTY.PLN;
  const koszt = PAKIETY.includes(dane.pakiet) ? cennikWaluty[dane.pakiet] : dane.pakiet === 'wlasny' ? liczba(dane.koszt) : NaN;
  const miesiace = Number(dane.miesiace);
  const zwrot = wynik && dane.pakiet ? policzZwrot(wynik, koszt, miesiace) : null;

  // Z-K6: zdarzenie raz, sekundę po pierwszym poprawnym wyniku (nie przy każdym wpisanym znaku).
  const maWynik = !!wynik;
  const kwotaMin = wynik?.min.zysk ?? 0;
  useEffect(() => {
    if (!maWynik || zgloszony.current) return undefined;
    const t = setTimeout(() => {
      zgloszony.current = true;
      track('narzedzie_wynik', { narzedzie: 'kalkulator', wynik: kwotaMin, waluta });
    }, 1000);
    return () => clearTimeout(t);
  }, [maWynik, kwotaMin, waluta]);

  const zmien = (k) => (e) => {
    const v = e.target.value;
    setDane((d) => ({ ...d, [k]: v }));
    if (k !== 'pakiet' && k !== 'koszt' && k !== 'miesiace') setAktywnyPrzyklad('');
    if (k === 'tryb' && v === 'sklep' && !zgloszonySklep.current) {
      zgloszonySklep.current = true;
      track('narzedzie_kalkulator_tryb', { tryb: v });
    }
    if (k === 'pakiet' && !zgloszonyZwrot.current) {
      zgloszonyZwrot.current = true;
      track('narzedzie_kalkulator_zwrot', { pakiet: v });
    }
  };

  const zmienWalute = (nowaWaluta) => {
    setWalutaEn(nowaWaluta);
    if (en && aktywnyPrzyklad) {
      const p = PRZYKLADY_BRANZ_EN.find((x) => x.id === aktywnyPrzyklad);
      if (p) {
        setDane((d) => ({ ...d, wartosc: String(nowaWaluta === 'PLN' ? p.wartoscPln : p.wartosc) }));
      }
    }
    track('narzedzie_kalkulator_waluta', { waluta: nowaWaluta });
  };

  const wybierzPrzyklad = (przyklad) => {
    const kwota = en && waluta === 'PLN' && przyklad.wartoscPln ? przyklad.wartoscPln : przyklad.wartosc;
    const nowe = { ...POCZATEK, pakiet: dane.pakiet || 'seoStandard', ...zParametrow({ ...przyklad, wartosc: kwota }) };
    setDane(nowe);
    setAktywnyPrzyklad(przyklad.id);
    setBlysk((b) => b + 1);
    track('narzedzie_kalkulator_przyklad', { przyklad: przyklad.id, lang });
  };

  useEffect(() => {
    if (!wypelnione || blad) return undefined;
    const t = setTimeout(() => {
      zapiszParametry({
        ...wejscieSurowe,
        ...(czySkalujeCloseRate ? { closeRate: closeRateNum } : {}),
        ...(en ? { waluta } : {}),
        pakiet: dane.pakiet || null,
        koszt: dane.pakiet === 'wlasny' && Number.isFinite(koszt) ? koszt : null,
        miesiace: dane.pakiet ? dane.miesiace : null,
      });
    }, 450);
    return () => clearTimeout(t);
  }, [wypelnione, blad, wejscieSurowe, czySkalujeCloseRate, closeRateNum, en, waluta, dane.pakiet, dane.miesiace, koszt]);

  function licz(e) {
    e.preventDefault();
    setProbowal(true);
    if (blad) return;
    if (!zgloszonyStart.current) {
      zgloszonyStart.current = true;
      track('narzedzie_start', { narzedzie: 'kalkulator', waluta });
    }
    zapiszParametry(parametryWyniku());
    setLicznik((n) => n + 1);
    wynikRef.current?.focus({ preventScroll: true });
    wynikRef.current?.scrollIntoView({ behavior: zachowaniePrzewijania(), block: 'start' });
  }

  function parametryWyniku() {
    return {
      ...wejscieSurowe,
      ...(czySkalujeCloseRate ? { closeRate: closeRateNum } : {}),
      ...(en ? { waluta } : {}),
      pakiet: dane.pakiet || null,
      koszt: dane.pakiet === 'wlasny' && Number.isFinite(koszt) ? koszt : null,
      miesiace: dane.pakiet ? dane.miesiace : null,
    };
  }

  const cenaPakietu = (k) => {
    const c = CENY[k];
    const kwota = cennikWaluty[k];
    const od = c.od ? (en ? 'from ' : 'od ') : '';
    return en ? `${od}${formatujWaluteEn(kwota, waluta)} net/mo` : `${od}${zl(kwota)} netto/mies.`;
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
    ? (en ? `Enter a monthly amount from ${ZWROT.koszt.min} to ${ZWROT.koszt.max.toLocaleString('en-US')} ${waluta}.` : `Podaj kwotę miesięczną od ${ZWROT.koszt.min} do ${ZWROT.koszt.max.toLocaleString('pl-PL')} zł.`)
    : null;

  const daneRaportu = { ...(zwrot ? { ...wejscie, koszt: zwrot.koszt, miesiaceDoEfektu: zwrot.miesiaceDoEfektu } : wejscie), waluta };

  return (
    <div className="narz-app" id="narzedzie">
      <style>{CSS}</style>
      <PasekDemo />
      <form className="narz-formularz narz-kalkulator" onSubmit={licz} noValidate>
        <div className="kalk-tryb-wiersz">
          <fieldset className="kalk-tryb">
            <legend className="narz-etykieta">{en ? 'What do you sell?' : 'Co sprzedajesz?'}</legend>
            <div className="kalk-tryb-opcje">
              {(en ? [['uslugi', 'Services'], ['sklep', 'Online shop']] : [['uslugi', 'Usługi lub zlecenia'], ['sklep', 'Sklep internetowy']]).map(([v, t]) => (
                <label key={v}><input type="radio" name="tryb" value={v} checked={dane.tryb === v} onChange={zmien('tryb')} data-cta={`narzedzie_kalkulator_tryb_${v}`} /><span>{t}</span></label>
              ))}
            </div>
          </fieldset>
          {en && (
            <fieldset className="kalk-tryb">
              <legend className="narz-etykieta">Currency</legend>
              <div className="kalk-waluta-opcje">
                {WALUTY_EN.map(([kod, etykieta]) => (
                  <label key={kod}>
                    <input type="radio" name="waluta" value={kod} checked={waluta === kod} onChange={() => zmienWalute(kod)} data-cta={`narzedzie_kalkulator_waluta_${kod}`} />
                    <span>{etykieta}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}
        </div>
        <div className="kalk-start">
          <p className="narz-mikro" style={{ margin: 0 }}>
            {sklep
              ? (en ? 'Five numbers and one optional, the result updates as you type. Or pick an industry preset:' : 'Pięć liczb i jedna opcjonalna, wynik liczy się na bieżąco. Możesz też wczytać przykład branży:')
              : (en ? 'Five numbers, the result updates as you type. Or pick an industry preset:' : 'Pięć liczb, wynik liczy się na bieżąco. Możesz też wczytać przykład branży:')}
          </p>
          <div className="kalk-beispiele" role="group" aria-label={en ? 'Load an industry preset' : 'Wczytaj przykład branży'}>
            {listaPrzykladow.map((b) => (
              <button
                key={b.id}
                type="button"
                className={`kalk-chip${aktywnyPrzyklad === b.id ? ' kalk-chip--aktywny' : ''}`}
                data-cta={`narzedzie_kalkulator_chip_${b.id}`}
                onClick={() => wybierzPrzyklad(b)}
              >
                {b.etykieta}
              </button>
            ))}
          </div>
        </div>
        {pola.filter((p) => p.k !== 'powroty').map(poleFormularza)}
        <Zwin otwarte={!sklep}>
          <div className="narz-kalk-pole" style={{ fontVariantNumeric: 'tabular-nums' }}>
            <label htmlFor="k-closeRate" className="narz-etykieta">
              {en ? 'Lead-to-deal Close Rate (optional)' : 'Odsetek domykanych zapytań - Close Rate (%)'}{' '}
              <strong>{closeRateNum}%</strong>
            </label>
            <input
              id="k-closeRate"
              name="closeRate"
              type="range"
              min="5"
              max="100"
              step="5"
              value={closeRateNum}
              onChange={zmien('closeRate')}
              className="narz-suwak"
            />
            <p className="narz-mikro">
              {czySkalujeCloseRate && wynik && wynikZapytan
                ? (en
                  ? `At ${closeRateNum}% close rate: ${num(wynikZapytan.min.klienci)}-${num(wynikZapytan.max.klienci)} enquiries/mo turn into ${num(wynik.min.klienci)}-${num(wynik.max.klienci)} signed deals/mo (effective visit-to-deal conversion: ${podp(Number(wejscie.konwersja.toFixed(2)), true)}%).`
                  : `Przy Close Rate ${closeRateNum}%: z ${num(wynikZapytan.min.klienci)}-${num(wynikZapytan.max.klienci)} zapytań miesięcznie domykasz ${num(wynik.min.klienci)}-${num(wynik.max.klienci)} umów (efektywna konwersja do umowy: ${podp(Number(wejscie.konwersja.toFixed(2)), false)}%).`)
                : (en
                  ? 'Default 100%: the conversion rate entered above already counts signed customers. If you entered lead/form conversion instead, lower this slider (e.g. 25%) to separate enquiries from closed contracts.'
                  : 'Domyślnie 100%: wpisana wyżej konwersja oznacza już domkniętych klientów. Jeśli wyżej podajesz konwersję na samo zapytanie ofertowe, obniż suwak (np. 25%), aby przeliczyć zapytania na podpisane umowy.')}
            </p>
          </div>
        </Zwin>
        <Zwin otwarte={sklep}>{poleFormularza(poleSklepPowroty)}</Zwin>
        <div className="narz-kalk-pole">
          <label htmlFor="k-udzialAi" className="narz-etykieta">{en ? 'What share of customers ask AI instead of Google?' : 'Jaka część klientów pyta AI zamiast Google?'} <strong>{dane.udzialAi}%</strong></label>
          <input id="k-udzialAi" type="range" min="0" max="60" step="5" value={dane.udzialAi} onChange={zmien('udzialAi')} className="narz-suwak" />
          <p className="narz-mikro">{en
            ? `Default ${ZALOZENIA.udzialAiDomyslny}%: our cautious assumption (in 2024 Gartner forecast a 25% fall in traditional search volume by 2026, which we have not verified). Set your own value. In the AI channel we include both direct citation clicks and zero-click brand searches with higher purchase intent (${ZALOZENIA.ai.mnoznikKonwersji}x conversion lift).`
            : `Domyślnie ${ZALOZENIA.udzialAiDomyslny}%: nasze ostrożne założenie (Gartner w 2024 r. prognozował spadek wolumenu wyszukiwań w klasycznych wyszukiwarkach o 25% do 2026 r., czego nie sprawdziliśmy). Ustaw swoją wartość. W kanale AI uwzględniamy zarówno bezpośrednie kliknięcia w cytowane źródła, jak i wyszukiwania nazwy firmy po poleceniu w AI z wyższą intencją zakupu (${String(ZALOZENIA.ai.mnoznikKonwersji).replace('.', ',')}x wyższa konwersja).`}</p>
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
          <Zwin otwarte={Boolean((probowal || wypelnione) && blad)}><p role="alert" className="narz-blad">{blad || ostBlad}</p></Zwin>
          <p className="narz-mikro">{en ? 'Calculated in your browser, no sign-up. The assumptions and sources are further down the page.' : 'Liczymy w przeglądarce, bez rejestracji. Założenia i źródła są niżej na stronie.'}</p>
        </div>
      </form>

      <Zwin otwarte={Boolean(wynik)} className="r-zwin--karta">
      {W && (
        <div className="narz-wynik narz-kalk-wynik" id="wynik-kalkulatora">
          <h2 className="kalk-wynik-tytul" ref={wynikRef} tabIndex={-1}>{en ? 'Your result' : 'Twój wynik'}</h2>
          <p className="narz-wynik-opis">{sklep
            ? (en ? 'Without a top 3 position on Google and without AI recommendations, your shop is losing an estimated' : 'Bez pozycji w TOP 3 Google i bez poleceń w AI sklep traci szacunkowo')
            : (en ? 'Without a top 3 position on Google and without AI recommendations, you are losing an estimated' : 'Bez pozycji w TOP 3 Google i bez poleceń w AI tracisz szacunkowo')}</p>
          <Kwota min={W.min.zysk} max={W.max.zysk} fmt={fmt} slowo={en ? 'to' : 'do'} tick={licznik} />
          {sklep ? (
            <p className="narz-wynik-opis">{en ? `in gross profit per month, or ${fmt(W.rocznieMin)} to ${fmt(W.rocznieMax)} per year, from ${fmt(W.min.przychod)} to ${fmt(W.max.przychod)} in lost sales a month. The range reflects differences between studies of clicks in Google and in AI answers (assumptions below).` : `marży brutto miesięcznie, czyli ${fmt(W.rocznieMin)} do ${fmt(W.rocznieMax)} rocznie, przy ${fmt(W.min.przychod)} do ${fmt(W.max.przychod)} utraconej sprzedaży miesięcznie. Widełki wynikają z różnic między badaniami kliknięć w Google i w odpowiedziach AI (założenia niżej).`}</p>
          ) : (
            <p className="narz-wynik-opis">{en ? `in profit per month, or ${fmt(W.rocznieMin)} to ${fmt(W.rocznieMax)} per year. The range reflects differences between studies of clicks in Google and in AI answers (assumptions below).` : `zysku miesięcznie, czyli ${fmt(W.rocznieMin)} do ${fmt(W.rocznieMax)} rocznie. Widełki wynikają z różnic między badaniami kliknięć w Google i w odpowiedziach AI (założenia niżej).`}</p>
          )}

          <div className="narz-rozbicie">
            <div><p className="narz-rozbicie-etykieta">{en ? 'No Google rankings' : 'Brak pozycji w Google'}</p><p className="narz-rozbicie-kwota">{fmt(W.min.zyskSeo)} {en ? 'to' : 'do'} {fmt(W.max.zyskSeo)}</p><p className="narz-mikro">{num(W.min.wizytySeo)} {en ? 'to' : 'do'} {num(W.max.wizytySeo)} {en ? 'visits per month' : 'wejść miesięcznie'}</p></div>
            <div><p className="narz-rozbicie-etykieta">{en ? 'No AI recommendations' : 'Brak poleceń w AI'}</p><p className="narz-rozbicie-kwota">{fmt(W.min.zyskAi)} {en ? 'to' : 'do'} {fmt(W.max.zyskAi)}</p><p className="narz-mikro">{num(W.min.wizytyAi)} {en ? 'to' : 'do'} {num(W.max.wizytyAi)} {en ? 'visits from AI recommendations per month' : 'wejść z poleceń AI miesięcznie'}</p></div>
            {sklep ? (
              <div><p className="narz-rozbicie-etykieta">{en ? 'Lost orders' : 'Utracone zamówienia'}</p><p className="narz-rozbicie-kwota">{num(W.min.zamowienia)} {en ? 'to' : 'do'} {num(W.max.zamowienia)}</p><p className="narz-mikro">{wejscie.powroty > 0
                ? (en ? `per month, including ${num(W.min.klienci)} to ${num(W.max.klienci)} first orders from new customers` : `miesięcznie, w tym ${num(W.min.klienci)} do ${num(W.max.klienci)} pierwszych zamówień nowych klientów`)
                : (en ? 'per month (first orders only)' : 'miesięcznie (tylko pierwsze zamówienia)')}</p></div>
            ) : (
              <div><p className="narz-rozbicie-etykieta">{en ? 'Lost customers' : 'Utraceni klienci'}</p><p className="narz-rozbicie-kwota">{num(W.min.klienci)} {en ? 'to' : 'do'} {num(W.max.klienci)}</p><p className="narz-mikro">{czySkalujeCloseRate && WZapytan
                ? (en
                  ? `signed deals/mo (from ${num(WZapytan.min.klienci)} to ${num(WZapytan.max.klienci)} enquiries at ${closeRateNum}% close rate)`
                  : `podpisanych umów miesięcznie (z ${num(WZapytan.min.klienci)} do ${num(WZapytan.max.klienci)} zapytań przy ${closeRateNum}% Close Rate)`)
                : (en ? 'per month' : 'miesięcznie')}</p></div>
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
            <Zwin otwarte={dane.pakiet === 'wlasny'}>
              <div className="narz-kalk-pole">
                <label htmlFor="k-koszt" className="narz-etykieta">{en ? 'Monthly SEO cost (net)' : 'Miesięczny koszt SEO (netto)'}</label>
                <div className="narz-z-jednostka">
                  <input id="k-koszt" name="koszt" value={dane.koszt} onChange={zmien('koszt')} inputMode="decimal" autoComplete="off" placeholder={en ? (waluta === 'PLN' ? 'e.g. 3000' : 'e.g. 800') : 'np. 3000'} className="narz-pole" />
                  <span aria-hidden="true">{jednostkaWaluty}</span>
                </div>
                {bladKosztu && <p role="alert" className="narz-blad">{bladKosztu}</p>}
              </div>
            </Zwin>
            <Zwin otwarte={Boolean(dane.pakiet)}>
              <div className="narz-kalk-pole">
                <label htmlFor="k-miesiace" className="narz-etykieta">{en ? 'After how many months will SEO reach full effect?' : 'Po ilu miesiącach SEO da pełny efekt?'} <strong>{dane.miesiace}</strong></label>
                <input id="k-miesiace" type="range" min={ZWROT.miesiaceDoEfektu.min} max={ZWROT.miesiaceDoEfektu.max} step="1" value={dane.miesiace} onChange={zmien('miesiace')} className="narz-suwak" />
                <p className="narz-mikro">{en
                  ? `Default ${ZWROT.miesiaceDoEfektu.domyslnie}: our assumption, not a study result. Until then the recovered profit grows evenly. With a new domain or strong competitors, set more.`
                  : `Domyślnie ${ZWROT.miesiaceDoEfektu.domyslnie}: nasze założenie, nie wynik badania. Do tego czasu odzyskany zysk rośnie równo. Przy nowej domenie albo silnej konkurencji ustaw więcej.`}</p>
              </div>
            </Zwin>
            {zwrot && (
              <div className="r-zwin" data-otwarte=""><div className="kalk-zwrot-wnetrze">
                <div className="kalk-zwrot-liczby">
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Monthly balance at full effect' : 'Bilans miesięczny przy pełnym efekcie'}</p><p className="narz-rozbicie-kwota"><span className={klasa(zwrot.min.bilans)}>{zeZnakiem(zwrot.min.bilans)}</span> {en ? 'to' : 'do'} <span className={klasa(zwrot.max.bilans)}>{zeZnakiem(zwrot.max.bilans)}</span></p></div>
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Balance of the first 12 months' : 'Bilans pierwszych 12 miesięcy'}</p><p className="narz-rozbicie-kwota"><span className={klasa(zwrot.min.bilansRok)}>{zeZnakiem(zwrot.min.bilansRok)}</span> {en ? 'to' : 'do'} <span className={klasa(zwrot.max.bilansRok)}>{zeZnakiem(zwrot.max.bilansRok)}</span></p></div>
                  <div><p className="narz-rozbicie-etykieta">{en ? 'Payback' : 'Zwrot kosztu'}</p><p className="narz-rozbicie-kwota">{okresZwrotu(zwrot)}</p><p className="narz-mikro">{en ? `the profit covers the cost ${ulamek(zwrot.min.razy)}-${ulamek(zwrot.max.razy)} times` : `zysk pokrywa koszt ${ulamek(zwrot.min.razy)}-${ulamek(zwrot.max.razy)} raza`}</p></div>
                </div>
                <WykresJCurve
                  zyskMin={W.min.zysk}
                  zyskMax={W.max.zysk}
                  koszt={zwrot.koszt}
                  miesiaceDoEfektu={zwrot.miesiaceDoEfektu}
                  waluta={waluta}
                  en={en}
                  fmt={fmt}
                />
                <p className="narz-mikro" role="status">{wniosek} {en
                  ? `This is arithmetic on your numbers, not a promise: we assume you recover the whole calculated loss after ${zwrot.miesiaceDoEfektu} months, and SEO results take months.`
                  : `To arytmetyka na Twoich liczbach, nie obietnica: zakładamy odzyskanie całej wyliczonej straty po ${zwrot.miesiaceDoEfektu} miesiącach, a efekty SEO przychodzą po miesiącach.`}</p>
              </div></div>
            )}
            <p className="narz-mikro kalk-dalej">{en ? 'Package details: ' : 'Zakres pakietów: '}<Link href="/cennik-pozycjonowania" className="narz-link">{en ? 'SEO pricing' : 'cennik pozycjonowania'}</Link>{en ? '. What we do each month: ' : '. Co robimy co miesiąc: '}<Link href="/pozycjonowanie-stron-internetowych" className="narz-link">{en ? 'SEO services' : 'pozycjonowanie stron'}</Link>.</p>
          </div>

          <p className="narz-mikro kalk-dalej">
            {en ? 'Next step: the ' : 'Następny krok: '}
            <Link href="/narzedzia/audyt-seo" className="narz-link">{en ? 'free SEO audit' : 'darmowy audyt SEO'}</Link>
            {en ? ' shows what holds your site back' : ' pokaże, co blokuje stronę'}
            {SPRAWDZARKA_DZIALA ? <>{en ? ', and the ' : ', a '}<Link href="/sprawdz-widocznosc-w-ai" className="narz-link">{en ? 'AI visibility check' : 'sprawdzarka widoczności w AI'}</Link>{en ? ' whether AI models mention your business.' : ', czy modele AI wymieniają Twoją firmę.'}</> : '.'}
          </p>
          <LinkWyniku
            narzedzie="kalkulator"
            tryb="wynik"
            parametry={parametryWyniku()}
            podsumowanie={en
              ? `Estimated loss without SEO and AI visibility: ${fmt(W.min.zysk)} to ${fmt(W.max.zysk)} per month`
              : `Szacowana strata bez SEO i widoczności w AI: ${fmt(W.min.zysk)} do ${fmt(W.max.zysk)} miesięcznie`}
          />

          <BramkaEmail
            narzedzie="kalkulator"
            dane={daneRaportu}
            parametry={{ waluta }}
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
      </Zwin>
    </div>
  );
}
