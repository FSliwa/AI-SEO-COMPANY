// Dane hero strony głównej (19.11.2026, hero v8): kolumna kafli z darmowymi narzędziami i panelem klienta.
// Jedno miejsce na teksty trzech wersji językowych, adresy kafli i liczby. Czysty ESM bez React.
//
// Skąd co:
//  - adresy: rejestr tras (hrefJesliOpublikowana, hrefWJezyku) i rejestr DE (hrefDe): kafel bez
//    opublikowanej strony w danym języku w ogóle się nie pojawia (DE: 4 kafle, bo strony kalkulatora,
//    makiety i panelu po niemiecku nie istnieją, a hero nie obiecuje niczego, czego strona DE nie ma);
//  - liczby: lib/narzedziaLiczby.js (reguły, podstrony, silniki, pytania, boty, minuty, domeny w grafie);
//  - wynik 95 i data: przebieg audytu własnej domeny z lib/audytPrzyklad.js (18.11.2026; kolejny odczyt
//    19.11 dał 94, więc data pochodzi z tego samego pliku co liczba, nigdy z ręcznego tekstu);
//  - kalkulator: policzStraty(PRZYKLADY.usluga), więc zmiana modelu zmienia kafel;
//  - przykłady (widoczność w AI, autorytet, makieta, panel) są ZAWSZE oznaczone plakietką PRZYKŁAD / DEMO
//    (wartości z zestawu demo lib/narzedziaDemo.js, domeny fikcyjne).

import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, WIDOCZNOSC } from './narzedziaLiczby';
import { RUN, DATA as DATA_AUDYTU } from './audytPrzyklad';
import { PRZYKLADY, policzStraty } from './kalkulatorStrat';
import { hrefJesliOpublikowana } from './publikacja';
import { hrefWJezyku } from './linkiEn';
import { hrefDe } from './stronyDe';

/** '2026-11-18' -> '18.11.2026' (PL, DE) albo '18 NOV 2026' (EN, wielkie litery eyebrow). */
function dataAudytu(locale) {
  const [r, m, d] = DATA_AUDYTU.split('-').map(Number);
  if (locale === 'en') return `${d} ${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][m - 1]} ${r}`;
  return `${d}.${String(m).padStart(2, '0')}.${r}`;
}

const NBSP = ' ';
const grupuj = (n, locale) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : NBSP);

// --- Teksty hero (wersja 2 z decyzji właściciela 19.11.2026) ------------------------------------
// display = duży nagłówek, sub = podtytuł (oba w jednym H1), lead = zdanie wstępne. Akapit łukowy
// ze starego hero (leadSeg / bodySeg w Hero.jsx) zostaje na stronie bez zmian słów.
export function tekstyHero(locale) {
  const regul = AUDYT.regul;
  const wynik = RUN.wynik;
  const data = dataAudytu(locale);
  if (locale === 'en') {
    return {
      eyebrow: `OWN ${regul}-RULE AUDIT: ${wynik}/100 (${data})`,
      display: 'SEO agency with the best technical solutions',
      sub: 'SEO that drives sales. SEO & Marketing Agency for Companies',
      lead: 'We do what search engine optimisation companies rarely do: give clients the best technical tools and report from their own Google accounts.',
      ctaPrimary: 'Get Proposal',
      ctaSecondary: 'View Portfolio',
    };
  }
  if (locale === 'de') {
    return {
      eyebrow: `EIGENES AUDIT MIT ${regul} REGELN: ${wynik}/100 (${data})`,
      display: 'SEO Agentur mit den besten technischen Lösungen',
      sub: 'SEO und KI-Sichtbarkeit für Unternehmen im DACH-Raum',
      lead: 'Ihre Website und Ihr Projekt erhalten die besten technischen Lösungen: eigene Werkzeuge, Berichte mit Live-Daten aus Ihren Google-Konten und SEO, das Wachstum antreibt.',
      ctaPrimary: 'Angebot anfragen',
      ctaSecondary: 'Referenzen',
    };
  }
  return {
    eyebrow: `WŁASNY AUDYT ${regul} REGUŁ: ${wynik}/100 (${data})`,
    display: 'Agencja SEO z najlepszymi rozwiązaniami technicznymi',
    sub: 'Pozycjonowanie stron, które buduje sprzedaż. Agencja SEO i Marketingowa z Warszawy',
    lead: 'Twój projekt i strony dostają najlepsze rozwiązania techniczne: własne narzędzia, panel z danymi na żywo i pozycjonowanie napędzające wzrost.',
    ctaPrimary: 'Wyceń projekt',
    ctaSecondary: 'Zobacz portfolio',
  };
}

// --- Teksty interfejsu panelu kafli ---------------------------------------------------------------
export const UI = {
  pl: {
    etykieta: 'Nasze narzędzia', h2: 'Nasze narzędzia SEO i panel klienta',
    wstrzymaj: 'Wstrzymaj ruch', wznow: 'Wznów ruch', poprzedni: 'Poprzedni kafel', nastepny: 'Następny kafel',
    kolkoKafle: 'Kółko: kafle', kolkoStrona: 'Kółko: strona', z: 'z', pasekPomoc: 'Strzałki, przeciąganie i klawisze góra i dół przewijają kafle.',
  },
  en: {
    etykieta: 'Our tools', h2: 'Our SEO tools and client portal',
    wstrzymaj: 'Pause motion', wznow: 'Resume motion', poprzedni: 'Previous tile', nastepny: 'Next tile',
    kolkoKafle: 'Wheel: tiles', kolkoStrona: 'Wheel: page', z: 'of', pasekPomoc: 'Arrows, dragging and the up and down keys scroll the tiles.',
  },
  de: {
    etykieta: 'Unsere Tools', h2: 'Unsere kostenlosen SEO-Tools',
    wstrzymaj: 'Bewegung anhalten', wznow: 'Bewegung fortsetzen', poprzedni: 'Vorherige Kachel', nastepny: 'Nächste Kachel',
    kolkoKafle: 'Mausrad: Kacheln', kolkoStrona: 'Mausrad: Seite', z: 'von', pasekPomoc: 'Pfeile, Ziehen und die Tasten oben und unten blättern durch die Kacheln.',
  },
};

// --- Kafle ------------------------------------------------------------------------------------
// klucz = klucz routingu (ścieżka PL). szer = szerokość kafla w px, strona 'l'|'r' (lewy lub prawy tor),
// margines = odsunięcie od krawędzi, ciemny = granatowy kafel (jeden w kolumnie).
const DEF = [
  { id: 'audyt', klucz: '/narzedzia/audyt-seo', szer: 340, strona: 'l', margines: 24, ciemny: false, de: true },
  { id: 'ai', klucz: '/sprawdz-widocznosc-w-ai', szer: 320, strona: 'r', margines: 36, ciemny: true, de: true },
  { id: 'autorytet', klucz: '/narzedzia/autorytet-domeny', szer: 320, strona: 'l', margines: 40, ciemny: false, de: true },
  { id: 'kalk', klucz: '/narzedzia/kalkulator-strat-seo', szer: 340, strona: 'r', margines: 40, ciemny: false, de: false },
  { id: 'llms', klucz: '/narzedzia/generator-llms-txt', szer: 320, strona: 'l', margines: 28, ciemny: false, de: true },
  { id: 'makieta', klucz: '/narzedzia/makieta-redesignu', szer: 320, strona: 'r', margines: 40, ciemny: false, de: false },
  { id: 'panel', klucz: '/panel-klienta', szer: 340, strona: 'l', margines: 28, ciemny: false, de: false },
];

function adres(klucz, locale) {
  if (locale === 'de') return hrefDe(klucz);
  const h = hrefJesliOpublikowana(klucz);
  return h ? hrefWJezyku(h, locale) : null;
}

function tekstyKafli(locale) {
  const A = AUDYT;
  const w = A.wagi;
  const wagi = `${w.techniczne}/${w.tresc}/${w.wydajnosc}/${w.ai}`;
  const straty = policzStraty(PRZYKLADY.usluga);
  const kwota = (n) => grupuj(n, locale);
  const zysk = locale === 'en' ? `PLN ${kwota(straty.rocznieMin)}–${kwota(straty.rocznieMax)}` : `${kwota(straty.rocznieMin)}–${kwota(straty.rocznieMax)}${NBSP}zł`;
  const silniki = WIDOCZNOSC.silnikow;
  if (locale === 'en') {
    return {
      audyt: { nazwa: 'Free SEO audit', plakietka: 'OUR DOMAIN', opis: `${A.regul} rules in ${A.kategorii} areas weighted ${wagi}, with a list of fixes.`, cta: 'Check your site', sat: ['In the report', `up to ${A.stron} pages`, 'result in 20–90 seconds'] },
      ai: { nazwa: 'AI visibility check', plakietka: 'EXAMPLE', opis: `${silniki} engines, ${WIDOCZNOSC.pytan} questions. In the example ChatGPT names the company in 1 of 3 answers.`, cta: 'Check visibility', sat: ['Questions', `${WIDOCZNOSC.pytan} customer questions`, 'answers with web search'] },
      autorytet: { nazwa: 'Domain authority', plakietka: 'EXAMPLE', opis: `Our 0-100 score from a link graph and a comparison with ${AUTORYTET.konkurentow} competitors.`, cta: 'Check authority', sat: ['Comparison', `up to ${AUTORYTET.konkurentow} competitors`, 'in one check'] },
      kalk: { nazwa: 'SEO loss calculator', plakietka: 'EXAMPLE', opis: 'How much profit you lose without SEO and AI visibility.', cta: 'Calculate losses', sat: ['Breakdown', 'Google · AI · customers', 'whole result without an email'] },
      llms: { nazwa: 'llms.txt generator', plakietka: 'EXAMPLE', opis: `An llms.txt file from your sitemap and an access test for ${GENERATOR.botowAi} AI bots and Bingbot.`, cta: 'Generate the file', sat: ['Access test', `${GENERATOR.botowAi} AI bots and Bingbot`, 'read from robots.txt'] },
      makieta: { nazwa: 'Website redesign mockup', plakietka: 'EXAMPLE', opis: 'See a redesign of your website before you order.', cta: 'Create a mockup', sat: ['Time', `${MAKIETA.minut.replace('-', '–')} minutes`, 'preview before the email'] },
      panel: { nazwa: 'Client portal', plakietka: 'DEMO', opis: 'Live data from your Google accounts, export, API and MCP.', cta: 'See the portal', sat: ['Demo', 'no login', 'data from Google accounts'] },
      m: {
        wagaSlowo: 'weight', domena: 'ai-seo-company.pl', kat: ['Technical SEO', 'Content', 'Performance', 'AI readiness'],
        silniki: WIDOCZNOSC.silniki.en, domenWGrafie: 'domains in the link graph', zyskEtykieta: 'Annual profit lost',
        pola: ['Searches / month', 'Visits from Google', 'Conversion', 'Customer value'], wartosc: `PLN ${kwota(PRZYKLADY.usluga.wartosc)}`, zysk,
        przykladLlms: 'Example: Google-Extended blocked in robots.txt', przykladMakieta: 'Example Ltd: a new layout in 1–3 min', przykladPanel: 'Queries from Google · sample data',
      },
    };
  }
  if (locale === 'de') {
    return {
      audyt: { nazwa: 'Kostenloser SEO Audit', plakietka: 'UNSERE DOMAIN', opis: `${A.regul} Regeln in ${A.kategorii} Bereichen mit den Gewichten ${wagi} und eine Fehlerliste.`, cta: 'Website prüfen', sat: ['Im Bericht', `bis zu ${A.stron} Unterseiten`, 'Ergebnis in 20 bis 90 Sekunden'] },
      ai: { nazwa: 'KI-Sichtbarkeit prüfen', plakietka: 'BEISPIEL', opis: `${silniki} Engines, ${WIDOCZNOSC.pytan} Fragen. Im Beispiel nennt ChatGPT das Unternehmen in 1 von 3 Antworten.`, cta: 'Sichtbarkeit prüfen', sat: ['Fragen', `${WIDOCZNOSC.pytan} Kundenfragen`, 'Antworten mit Websuche'] },
      autorytet: { nazwa: 'Domain Authority Checker', plakietka: 'BEISPIEL', opis: `Unser Wert von 0 bis 100 aus einem Link-Graphen und der Vergleich mit ${AUTORYTET.konkurentow} Konkurrenten.`, cta: 'Autorität prüfen', sat: ['Vergleich', `bis zu ${AUTORYTET.konkurentow} Konkurrenten`, 'in einer Prüfung'] },
      llms: { nazwa: 'llms.txt Generator', plakietka: 'BEISPIEL', opis: `Eine llms.txt aus Ihrer Sitemap und ein Zugriffstest für ${GENERATOR.botowAi} KI-Bots und Bingbot.`, cta: 'Datei erzeugen', sat: ['Zugriffstest', `${GENERATOR.botowAi} KI-Bots und Bingbot`, 'Auswertung der robots.txt'] },
      m: {
        wagaSlowo: 'Gewicht', domena: 'ai-seo-company.pl', kat: ['Technik', 'Inhalt', 'Performance', 'KI-Tauglichkeit'],
        silniki: ['ChatGPT', 'Gemini', 'Perplexity', 'Claude', 'AI Overviews in Google'], domenWGrafie: 'Domains im Link-Graphen', zyskEtykieta: '',
        pola: [], wartosc: '', zysk: '', przykladLlms: 'Beispiel: Google-Extended in der robots.txt gesperrt', przykladMakieta: '', przykladPanel: '',
      },
    };
  }
  return {
    audyt: { nazwa: 'Audyt SEO', plakietka: 'NASZA DOMENA', opis: `${A.regul} reguł w ${A.kategorii} obszarach z wagami ${wagi} i lista błędów do naprawy.`, cta: 'Sprawdź swoją stronę', sat: ['W raporcie', `do ${A.stron} podstron`, 'wynik w 20–90 sekund'] },
    ai: { nazwa: 'Widoczność w AI', plakietka: 'PRZYKŁAD', opis: `${silniki} silników, ${WIDOCZNOSC.pytan} pytania. W przykładzie ChatGPT wymienia firmę w 1 z 3 odpowiedzi.`, cta: 'Sprawdź widoczność', sat: ['Pytania', `${WIDOCZNOSC.pytan} pytania klientów`, 'odpowiedzi z wyszukiwaniem w sieci'] },
    autorytet: { nazwa: 'Autorytet domeny', plakietka: 'PRZYKŁAD', opis: `Nasz wynik 0-100 z grafu linków i porównanie z ${AUTORYTET.konkurentow} konkurentami.`, cta: 'Sprawdź autorytet', sat: ['Porównanie', `do ${AUTORYTET.konkurentow} konkurentów`, 'w jednym sprawdzeniu'] },
    kalk: { nazwa: 'Kalkulator strat SEO', plakietka: 'PRZYKŁAD', opis: 'Ile zysku tracisz bez SEO i widoczności w AI.', cta: 'Policz straty', sat: ['Rozbicie', 'Google · AI · klienci', 'cały wynik bez e-maila'] },
    llms: { nazwa: 'Generator llms.txt', plakietka: 'PRZYKŁAD', opis: `Plik llms.txt z mapy strony i test dostępu ${GENERATOR.botowAi} botów AI i Bingbota.`, cta: 'Wygeneruj plik', sat: ['Test dostępu', `${GENERATOR.botowAi} botów AI i Bingbot`, 'odczyt z robots.txt'] },
    makieta: { nazwa: 'Makieta nowej strony', plakietka: 'PRZYKŁAD', opis: 'Zobacz redesign swojej strony, zanim zamówisz.', cta: 'Zrób makietę', sat: ['Czas', `${MAKIETA.minut.replace('-', '–')} minuty`, 'podgląd przed e-mailem'] },
    panel: { nazwa: 'Panel klienta', plakietka: 'DEMO', opis: 'Dane z Twoich kont Google na żywo, eksport oraz API i MCP.', cta: 'Zobacz panel', sat: ['Demo', 'bez logowania', 'dane z kont Google'] },
    m: {
      wagaSlowo: 'waga', domena: 'ai-seo-company.pl', kat: ['Techniczne', 'Treść', 'Wydajność', 'Gotowość na AI'],
      silniki: WIDOCZNOSC.silniki.pl, domenWGrafie: 'domen w grafie linków', zyskEtykieta: 'Utracony zysk rocznie',
      pola: ['Wyszukiwania / mies.', 'Wizyty z Google', 'Konwersja', 'Wartość klienta'], wartosc: `${kwota(PRZYKLADY.usluga.wartosc)}${NBSP}zł`, zysk,
      przykladLlms: 'Przykład: Google-Extended zablokowany w robots.txt', przykladMakieta: 'Przykład Sp. z o.o.: nowy układ w 1–3 min', przykladPanel: 'Zapytania z Google · dane przykładowe',
    },
  };
}

/**
 * Kafle hero dla języka: tylko te, których strona istnieje i jest opublikowana w tym języku.
 * Zwraca { kafle: [{ id, href, ciemny, szer, strona, margines, nazwa, plakietka, opis, cta, sat }], m } .
 */
export function kafleHero(locale) {
  const T = tekstyKafli(locale);
  const kafle = [];
  for (const d of DEF) {
    if (locale === 'de' && !d.de) continue;
    const href = adres(d.klucz, locale);
    if (!href || !T[d.id]) continue;
    kafle.push({ ...d, href, ...T[d.id] });
  }
  return { kafle, m: T.m, strony: { audytWynik: RUN.wynik, audytKategorie: RUN.kategorie, audytData: dataAudytu(locale), wagi: AUDYT.wagi, autorytetWynik: 23, autorytetDomen: grupuj(AUTORYTET.domenWGrafie, locale), polaWartosci: [grupuj(PRZYKLADY.usluga.wyszukiwania, locale), grupuj(PRZYKLADY.usluga.ruch, locale), `${PRZYKLADY.usluga.konwersja}%`] } };
}
