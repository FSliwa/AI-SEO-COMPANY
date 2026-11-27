// Strona aplikacji: Makieta redesignu (/narzedzia/makieta-redesignu, /en/tools/website-redesign-mockup). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
// 12.11.2026 (S1-poprawki, sekcja 4 zmiany.md): lead i „Krótka odpowiedź” (Z-M3), Co dostajesz (Z-M2),
// przykład wyniku (Z-M5, na razie tylko tryb demo, opisany wprost), 3 kroki i zasady treści (Z-M4),
// Co dalej (Z-M6), FAQ 8 (Z-M7), ograniczenia, jak ocenić makietę, źródła, poradniki i inne narzędzia.
// Fakty o działaniu: panel-fix/lib/narzedzia/makieta.ts (dane strony :38-65, zrzut :68-79, prompt :80-105,
// podgląd do 2. sekcji :161-167), limit 2/IP (wspolne.ts LIMITY), link 60 dni (cron tool_runs).
// 12.11.2026 (domknięcie, makieta): galeria „przed i po” zamiast zrzutu z trybu demo (Z-M5), od 18.11.2026 na stronach klientów (patrz KLIENCI niżej)
// oraz 2 sekcje: co makieta zmieniła w przykładach i jak przygotować stronę (logo z rel=icon, kolory hex z HTML:
// panel-fix/lib/narzedzia/html.ts :78, :121-146).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { MAKIETA, cena } from '@/lib/narzedziaLiczby';
import Byline from '@/components/Byline';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz } from './UkladAplikacji';
import MakietaPrzyklady from './MakietaPrzyklady';
import * as s from './styl';
import MakietaClient from './MakietaClient';

const SCIEZKA = '/narzedzia/makieta-redesignu';
const AUDYT = '/narzedzia/audyt-seo';
const projektowanie = () => hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
const BRIEF = hrefJesliOpublikowana('/narzedzia/brief-strony-internetowej');
const minuty = MAKIETA.minut.replace('-', ' do ');

// Z-M5 (przebudowa 18.11.2026): przykłady „przed i po” to strony klientów, nie nasza. Staniax (https://www.staniax.pl/)
// i Madame Thai (https://www.madamethai.pl/), obie nazwane na stronie jako klienci. Dwa prawdziwe uruchomienia narzędzia
// na produkcji 18.11.2026 (limit 2 na IP dziennie): POST panel /api/narzedzia/makieta { url, cel: "", lang: "pl" },
// bez e-maila, więc „po” = podgląd (sekcja 1: nagłówek z menu i hero), czyli to, co narzędzie pokazuje każdemu od razu.
//   Staniax:      run c23e42fc-05a0-41aa-afc5-916074c92185, start 12:04:47 UTC (13:04 czasu polskiego), 200 w 93 s, 6 sekcji.
//   Madame Thai:  run 3e1f3767-9e94-41e4-b31d-ceb87615bad1, start 12:06:30 UTC (13:06), 200 w 94 s, 6 sekcji.
// Zrzuty: Playwright (Chromium), „przed” = oryginalna strona po odrzuceniu opcjonalnych cookies i odczekaniu na animacje,
// „po” = HTML podglądu bez zmian. Komputer 1280×800 (DPR 1), telefon 390×844 (DPR 2, plik 780×1688).
// Zrzuty są w ramkach narysowanych w Figmie (plik „AI SEO COMPANY - mockupy narzędzi (hub)”, strona „Makieta redesignu:
// przykłady klientów”): okno przeglądarki i telefon, etykiety Przed/Po (PL) i Before/After (EN) są częścią obrazu,
// zrzuty w środku bez zmian. Pliki w public/images/narzedzia/makieta/: <klient>-makieta-przed-po-komputer|telefon-<szer>.webp
// (PL) i <klient>-redesign-mockup-before-after-desktop|phone-<szer>.webp (EN); komputer 720/1080/1440 (1440 × 1942),
// telefon 600/900/1200 (1200 × 1333). Opisy w podpisach i w sekcji „Co makieta zmieniła” odnoszą się tylko do tego, co
// widać na tych zrzutach i w kodzie podglądu (liczby i dane z makiet sprawdzone z tekstem stron klientów 18.11.2026).
const KAT_OBRAZOW = '/images/narzedzia/makieta';
const obraz = (baza, szerokosci, width, height) => ({
  src: `${KAT_OBRAZOW}/${baza}-${szerokosci[szerokosci.length - 1]}.webp`,
  srcSet: szerokosci.map((w) => `${KAT_OBRAZOW}/${baza}-${w}.webp ${w}w`).join(', '),
  width,
  height,
});
const KOMP = [720, 1080, 1440];
const TEL = [600, 900, 1200];
const PRZYKLAD = {
  data: { pl: '18 listopada 2026', en: '18 November 2026' },
};
const KLIENCI = [
  {
    id: 'staniax',
    nazwa: 'Staniax',
    domena: 'staniax.pl',
    url: 'https://www.staniax.pl/',
    komputer: {
      pl: obraz('staniax-makieta-przed-po-komputer', KOMP, 1440, 1942),
      en: obraz('staniax-redesign-mockup-before-after-desktop', KOMP, 1440, 1942),
    },
    telefon: {
      pl: obraz('staniax-makieta-przed-po-telefon', TEL, 1200, 1333),
      en: obraz('staniax-redesign-mockup-before-after-phone', TEL, 1200, 1333),
    },
    tekst: {
      pl: {
        branza: 'metalizacja próżniowa, lakierowanie i regeneracja lamp samochodowych',
        przebieg: 'Uruchomione 18 listopada 2026 o 13:04 (czas polski), gotowe po 93 sekundach, makieta ma 6 sekcji.',
        komputer: {
          alt: 'Staniax na komputerze, przed i po. U góry obecna strona staniax.pl: pasek z menu i telefonem oraz zdjęcie złotej rzeźby dłoni z mikrofonem na cały ekran. Niżej pierwsza sekcja makiety: granatowe tło, nagłówek o metalizacji, lakierowaniu i regeneracji lamp, opis, dwa przyciski i trzy karty z atutami firmy',
          przed: 'obecna strona główna. Pierwszy ekran zajmuje zdjęcie rzeźby, a tekstu nagłówka na nim nie widać. Menu ma 5 pozycji, obok są telefon, przełącznik języków PL, EN i DE oraz przycisk „Bezpłatna wycena”.',
          po: 'pierwsza sekcja makiety w tym samym rozmiarze. Nagłówek, opis, dwa przyciski i trzy atuty (od 1993 r., Józefów k. Warszawy, alternatywa dla galwanizacji) mieszczą się na ekranie. Menu ma 5 pozycji, ale nagłówek zawija się do dwóch rzędów, a zdjęcia i przełącznika języków nie ma.',
        },
        telefon: {
          alt: 'Staniax na telefonie, przed i po. Po lewej obecna strona: złota rzeźba dłoni z mikrofonem na cały ekran, logo, flagi języków i ikona menu. Po prawej pierwsza sekcja makiety: logo, przycisk Bezpłatna wycena, menu, granatowy nagłówek, opis, dwa przyciski na całą szerokość i początek pierwszej karty',
          przed: 'obecna strona na telefonie. Zdjęcie rzeźby zajmuje cały ekran, menu jest schowane pod ikoną, widać przełącznik języków.',
          po: 'makieta na telefonie. Menu to rząd przewijany w bok, a piąta pozycja („Kontakt”) jest poza ekranem. Nagłówek, opis i oba przyciski mieszczą się na ekranie, a pierwszy atut zaczyna się na jego dole.',
        },
      },
      en: {
        branza: 'vacuum metallization, painting and car lamp restoration',
        przebieg: 'Run on 18 November 2026 at 13:04 (Polish time), ready after 93 seconds, the mockup has 6 sections.',
        komputer: {
          alt: 'Staniax on desktop, before and after. At the top the current staniax.pl: a bar with the menu and phone number and a full-screen photo of a golden sculpture of a hand holding a microphone. Below it the first section of the mockup: a navy background, a heading about metallization, painting and lamp restoration, a description, two buttons and three cards with the company’s strengths',
          przed: 'the current homepage. The first screen is taken up by the photo of the sculpture and no heading text is visible on it. The menu has 5 items, next to it are the phone number, a PL, EN and DE language switch and a “Bezpłatna wycena” (free quote) button.',
          po: 'the first section of the mockup at the same size. The heading, the description, two buttons and three strengths (since 1993, Józefów near Warsaw, an alternative to electroplating) fit on the screen. The menu has 5 items, but the header wraps into two rows, and the photo and the language switch are gone.',
        },
        telefon: {
          alt: 'Staniax on a phone, before and after. On the left the current site: a full-screen golden sculpture of a hand holding a microphone, the logo, language flags and a menu icon. On the right the first section of the mockup: the logo, a free quote button, the menu, a navy heading, a description, two full-width buttons and the start of the first card',
          przed: 'the current site on a phone. The photo of the sculpture fills the whole screen, the menu is hidden behind an icon and the language switch is visible.',
          po: 'the mockup on a phone. The menu is a row that scrolls sideways and the fifth item (“Kontakt”, contact) is off the screen. The heading, the description and both buttons fit on the screen, and the first strength starts at its bottom edge.',
        },
      },
    },
  },
  {
    id: 'madamethai',
    nazwa: 'Madame Thai',
    domena: 'madamethai.pl',
    url: 'https://www.madamethai.pl/',
    komputer: {
      pl: obraz('madamethai-makieta-przed-po-komputer', KOMP, 1440, 1942),
      en: obraz('madamethai-redesign-mockup-before-after-desktop', KOMP, 1440, 1942),
    },
    telefon: {
      pl: obraz('madamethai-makieta-przed-po-telefon', TEL, 1200, 1333),
      en: obraz('madamethai-redesign-mockup-before-after-phone', TEL, 1200, 1333),
    },
    tekst: {
      pl: {
        branza: 'restauracja tajska w centrum Warszawy',
        przebieg: 'Uruchomione 18 listopada 2026 o 13:06 (czas polski), gotowe po 94 sekundach, makieta ma 6 sekcji.',
        komputer: {
          alt: 'Madame Thai na komputerze, przed i po. U góry obecna strona madamethai.pl: ciemne zdjęcie wnętrza, wyśrodkowany napis MADAME THAI, hasło, opis, jeden beżowy przycisk i drugi z beżowym obrysem. Niżej pierwsza sekcja makiety: logo, pomarańczowy przycisk Zarezerwuj, menu z pięcioma pozycjami, nagłówek wyrównany do lewej, pomarańczowy przycisk z numerem telefonu oraz pasek z adresem i godzinami otwarcia',
          przed: 'obecna strona główna. Ciemne zdjęcie wnętrza, wyśrodkowany nagłówek, przyciski „Zobacz menu” i „Zarezerwuj stolik” w złoto-beżowych kolorach, menu z 8 pozycjami i przyciskiem „Zarezerwuj”.',
          po: 'pierwsza sekcja makiety w tym samym rozmiarze. Nagłówek jest wyrównany do lewej, przycisk rezerwacji ma numer telefonu, a adres i godziny otwarcia są na dole ekranu. Menu skrócono do 5 pozycji, a tło i akcenty są inne niż na obecnej stronie.',
        },
        telefon: {
          alt: 'Madame Thai na telefonie, przed i po. Po lewej obecna strona: ciemne zdjęcie, napis MADAME THAI, hasło, opis i dwa przyciski. Po prawej pierwsza sekcja makiety: logo, rząd menu, nagłówek, opis, pomarańczowy przycisk z numerem telefonu, przycisk Zobacz menu oraz adres i godziny otwarcia',
          przed: 'obecna strona na telefonie. Menu jest schowane pod ikoną, a przyciski zaczynają się w dolnej części ekranu.',
          po: 'makieta na telefonie. Menu to rząd przewijany w bok: widać 4 z 5 pozycji. Nagłówek, opis i dwa przyciski na całą szerokość mieszczą się na ekranie, a pod nimi widać adres i godziny otwarcia.',
        },
      },
      en: {
        branza: 'a Thai restaurant in central Warsaw',
        przebieg: 'Run on 18 November 2026 at 13:06 (Polish time), ready after 94 seconds, the mockup has 6 sections.',
        komputer: {
          alt: 'Madame Thai on desktop, before and after. At the top the current madamethai.pl: a dark photo of the interior, a centred MADAME THAI title, a tagline, a description, one beige button and one outlined in beige. Below it the first section of the mockup: the logo, an orange Zarezerwuj (book) button, a menu with five items, a left-aligned heading, an orange button with a phone number and a bar with the address and opening hours',
          przed: 'the current homepage. A dark photo of the interior, a centred heading, the “Zobacz menu” (see the menu) and “Zarezerwuj stolik” (book a table) buttons in gold and beige, a menu with 8 items and a “Zarezerwuj” button.',
          po: 'the first section of the mockup at the same size. The heading is left-aligned, the booking button carries a phone number, and the address and opening hours are at the bottom of the screen. The menu was cut to 5 items, and the background and accent colors differ from the current website.',
        },
        telefon: {
          alt: 'Madame Thai on a phone, before and after. On the left the current site: a dark photo, the MADAME THAI title, a tagline, a description and two buttons. On the right the first section of the mockup: the logo, a menu row, a heading, a description, an orange button with a phone number, a See the menu button, and the address and opening hours',
          przed: 'the current site on a phone. The menu is hidden behind an icon and the buttons start in the lower part of the screen.',
          po: 'the mockup on a phone. The menu is a row that scrolls sideways: 4 of its 5 items are visible. The heading, the description and two full-width buttons fit on the screen, with the address and opening hours below them.',
        },
      },
    },
  },
];
const zrzutSchema = (loc) => { const o = KLIENCI[0].komputer[loc === 'en' ? 'en' : 'pl']; return { url: o.src, width: o.width, height: o.height }; };

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Site moves with URL changes (przekierowania 301 przy zmianie adresów)', nazwaEn: 'Google Search Central: Site moves with URL changes (301 redirects when URLs change)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing', nazwa: 'Google Search Central: Mobile-first indexing best practices (Google ocenia wersję na telefon)', nazwaEn: 'Google Search Central: Mobile-first indexing best practices (Google uses the mobile version)', data: '2026-11-12' },
  { url: 'https://www.w3.org/TR/WCAG22/#contrast-minimum', nazwa: 'W3C: WCAG 2.2, kryterium 1.4.3 Contrast (Minimum), próg 4,5:1', nazwaEn: 'W3C: WCAG 2.2, success criterion 1.4.3 Contrast (Minimum), the 4.5:1 threshold', data: '2026-11-12' },
];

const cta = { marginTop: '1.25rem', textAlign: 'center' };
// --- Makieta redesignu ------------------------------------------------------------------------

const FAQ_MAKIETY = [
  { id: 'jak-powstaje-makieta', question: 'Jak powstaje makieta?', answer: 'Pobieramy Twoją stronę główną, wyciągamy z niej treści (nazwę, nagłówki, menu, opisy usług, kontakt i kolory) i robimy zrzut obecnego wyglądu. Model AI Claude projektuje z tego nowy układ strony głównej. Dostaje polecenie, żeby nie wymyślać liczb, opinii, nagród ani cen i używać tylko treści z Twojej strony; może się jednak pomylić, więc przejrzyj makietę przed użyciem.' },
  { id: 'czy-moge-uzyc-makiety', question: 'Czy mogę wdrożyć makietę?', answer: 'Makieta to propozycja wyglądu, a nie gotowa strona. Pokazuje kierunek: układ sekcji, hierarchię i kolory. Przed wdrożeniem trzeba ją dopasować do marki i zdjęć oraz zadbać o SEO: adresy, nagłówki, szybkość i dane strukturalne.' },
  { id: 'czy-makieta-jest-bezpieczna', question: 'Czy makieta zmienia coś na mojej stronie?', answer: 'Nie. Tylko czytamy publiczną stronę główną, tak jak przeglądarka. Makieta jest osobnym plikiem bez skryptów, wyświetlanym w zamkniętej ramce, a pełna wersja jest dostępna pod linkiem z maila przez 60 dni.' },
  { id: 'czy-zaszkodzi-seo', question: 'Czy nowa strona według makiety zaszkodzi SEO?', answer: 'Sama makieta niczego nie zmienia na Twojej stronie. Ryzyko pojawia się przy wdrożeniu nowego wyglądu: zmienione adresy, usunięte treści i wolniejsze ładowanie. Dlatego przy wdrożeniu trzeba zachować adresy albo ustawić przekierowania 301, przenieść treści i sprawdzić szybkość, zanim nowa strona zastąpi starą.' },
  { id: 'czy-ai-zmienia-tresc', question: 'Czy AI zmienia treść mojej strony?', answer: 'Model skraca i porządkuje teksty z Twojej strony i ma polecenie, żeby nie dopisywać liczb, opinii, nagród, cen ani nazw klientów, ale nie ma gwarancji, że zawsze się do niego zastosuje. Teksty do wdrożenia i tak warto przejrzeć, bo makieta pokazuje kierunek, a nie gotową treść.' },
  { id: 'czy-potrzebne-konto', question: 'Czy muszę zakładać konto albo podawać kartę?', answer: `Nie. Pierwszy ekran makiety widzisz bez rejestracji. Do całej makiety potrzebny jest tylko adres e-mail, na który wysyłamy link. Limit to ${MAKIETA.limitIp} makiety dziennie z jednego adresu IP.` },
  { id: 'co-ma-sie-poprawic', question: 'Co wpisać w polu „Co ma się poprawić?”', answer: 'Cel, który ma spełniać nowa strona, np. więcej telefonów od klientów, nowocześniejszy wygląd albo czytelniejsza oferta. Model bierze go pod uwagę przy układzie sekcji i wezwaniach do kontaktu. Pole jest opcjonalne.' },
  { id: 'ile-kosztuje-nowa-strona', question: 'Ile kosztuje nowa strona według makiety?', answer: `Zależy od liczby podstron, integracji i treści. Stronę firmową w Next.js budujemy od ${cena('strona')} netto, a wycenę przygotujemy w 24 godziny w dni robocze. Zakres opisujemy na stronie <a href="/projektowanie-stron-internetowych">projektowania stron internetowych</a>.` },
];

export function MakietaStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <MakietaEn />;
    return (
    <Uklad
      slug="makieta-redesignu"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Makieta redesignu strony z AI',
        description: 'Bezpłatny generator makiety: z adresu obecnej strony tworzy propozycję nowego wyglądu strony głównej na komputer i telefon, z treści firmy.',
        category: 'DesignApplication',
        featureList: ['Propozycja nowej strony głównej', 'Wersja na komputer i telefon', 'Tylko treści z Twojej strony'],
        screenshot: zrzutSchema('pl'),
      }}
      lead={`Wpisz adres strony, a w ${minuty} minut AI zaprojektuje z jej treści nową stronę główną na komputer i telefon. Pierwszy ekran zobaczysz od razu, bez konta.`}
      narzedzie={<MakietaClient />}
      odpowiedz="Makieta strony internetowej (makieta redesignu) to propozycja nowej strony głównej przygotowana przez model AI z treści, które już masz na stronie: nazwy, nagłówków, menu, opisów usług, danych kontaktowych i kolorów. Pokazuje układ sekcji, typografię, kolory i wersję na telefon. To kierunek do rozmowy z wykonawcą, a nie gotowa strona: pierwszy ekran widzisz od razu, całą makietę po podaniu e-maila."
      faq={FAQ_MAKIETY}
      tytulFaq="Pytania o makietę redesignu"
    >
      <Byline sciezka={SCIEZKA} takzeEn style={{ margin: '0 0 1.25rem' }} />
      <CoDostajesz
        locale="pl"
        tytulOdRazu="Od razu, bez konta"
        odRazu={[
          'Zrzut Twojej obecnej strony głównej (gdy usługa zrzutów odpowie w 30 sekund).',
          'Obok pierwszy ekran nowej strony: nagłówek z menu i sekcja powitalna.',
          'Bez rejestracji, karty i instalacji.',
        ]}
        poEmailu={[
          'Całą makietę: 4 do 6 sekcji z Twoich treści i stopkę.',
          'Podgląd na komputerze i na telefonie.',
          'Link do makiety ważny 60 dni, który możesz pokazać wspólnikowi albo wykonawcy.',
        ]}
        przypis="Co z tym zrobić: potraktuj makietę jak kierunek do rozmowy, czyli układ sekcji, hierarchię i kolory. Zdjęcia, teksty i SEO dopracowuje się przy wdrożeniu."
      />

      <Sekcja id="przyklad" tytul="Przykłady przed i po: strony klientów Staniax i Madame Thai">
        <p style={s.akapit}>Zamiast naszej własnej strony pokazujemy wyniki dla dwóch prawdziwych stron naszych klientów: Staniax (metalizacja i lakierowanie) i Madame Thai (restauracja tajska w Warszawie). {PRZYKLAD.data.pl} uruchomiliśmy narzędzie na obu adresach tak jak każdy użytkownik, z pustym polem „Co ma się poprawić?” i bez podawania e-maila. Makieta Staniax była gotowa po 93 sekundach, a Madame Thai po 94, i każda ma 6 sekcji. Poniżej jest pierwsza sekcja każdej z nich, czyli ta część, którą narzędzie pokazuje od razu.</p>
        <p style={s.akapit}>To surowy wynik darmowego narzędzia, a nie projekt zrobiony dla tych firm ani propozycja zmian w ich stronach. Ocena pod zrzutami jest naszą opinią o tym, jak narzędzie poradziło sobie z tymi dwiema stronami.</p>
        <p style={s.akapit}>Zrzuty obu wersji zrobiliśmy tą samą przeglądarką w tych samych rozmiarach ekranu: 1280 × 800 pikseli na komputerze i 390 × 844 na telefonie. Na obecnych stronach przed zrzutem odrzuciliśmy opcjonalne cookies, żeby baner nie zasłaniał treści. Makiet nie poprawialiśmy ręcznie: to dokładnie ten kod, który zwróciło narzędzie. Okno przeglądarki i telefon wokół zrzutów to ramka graficzna, a sam zrzut w środku jest bez zmian.</p>
        <MakietaPrzyklady klienci={KLIENCI} locale="pl" />
        <p style={s.przypis}>Zrzuty z {PRZYKLAD.data.pl}, bez ręcznych poprawek. Pozostałych 5 sekcji każdej makiety tu nie pokazujemy, bo w narzędziu też są dostępne dopiero po podaniu e-maila.</p>
      </Sekcja>

      <Sekcja id="co-zmienila-makieta" tytul="Co makieta zmieniła u Staniax i Madame Thai, a co trzeba poprawić">
        <p style={s.akapit}>Oceniamy wynik tak samo, jak radzimy oceniać makietę swojej strony: osobno to, co jest lepsze, i to, czego przy wdrożeniu nie można zostawić tak jak w makiecie.</p>
        <h3 style={s.h3}>Co jest lepsze</h3>
        <ul style={s.lista}>
          <li><strong>Staniax: oferta widać od razu.</strong> Na obecnej stronie pierwszy ekran zajmuje zdjęcie rzeźby, a w makiecie mieści się nagłówek z opisem usługi, przycisk „Poproś o bezpłatną wycenę”, przycisk z numerem telefonu i trzy atuty firmy.</li>
          <li><strong>Madame Thai: rezerwacja i dojazd są w pierwszym ekranie.</strong> Przycisk rezerwacji ma numer telefonu, a adres i godziny otwarcia są na dole ekranu, także na telefonie. Menu skrócono z 8 do 5 pozycji.</li>
          <li><strong>Dane zgadzają się ze stronami klientów.</strong> Sprawdziliśmy liczby i dane widoczne w obu makietach (rok 1993 i „ponad 25 lat”, 0% Cr6+, numery telefonów, adres i godziny otwarcia): występują też w kodzie stron klientów. Narzędzie przeredagowało część zdań, np. przycisk „Poproś o bezpłatną wycenę” zamiast „Bezpłatna wycena”, ale nie dodało liczb, których na tych stronach nie ma.</li>
          <li><strong>Nagłówki zostały.</strong> Nagłówek H1 obu stron wszedł do makiety bez zmian i ustawia pierwszy ekran.</li>
        </ul>
        <h3 style={s.h3}>Co trzeba poprawić przy wdrożeniu</h3>
        <ul style={s.lista}>
          <li><strong>Zniknęły elementy menu i nagłówka.</strong> U Staniax nie ma przełącznika języków PL, EN i DE ani pozycji „Realizacje” i „Galeria”. U Madame Thai nie ma pozycji „Galeria”, „Najnowsze wiadomości” i „Opinie”. Makieta projektuje jedną stronę główną, więc takie elementy trzeba dodać ręcznie.</li>
          <li><strong>Menu na telefonie jest ucięte.</strong> W obu makietach pozycje tworzą rząd przewijany w bok i ostatnie nie mieszczą się na ekranie: u Staniax piąta („Kontakt”), u Madame Thai piąta („Lokale”). Nie każdy zauważy, że da się przewinąć.</li>
          <li><strong>Staniax: nagłówek zawija się na komputerze.</strong> Menu jest w jednym rzędzie, a telefon i przycisk wyceny spadają do drugiego. Logo to ikona strony (favicon) obok napisu, a nie pełne logo.</li>
          <li><strong>Madame Thai: tło i kolory są inne niż na stronie.</strong> Model nie tworzy zdjęć, więc w tle użył grafiki do udostępniania (og:image) tej strony, a nie zdjęcia z obecnego pierwszego ekranu. Akcent jest pomarańczowy, a obecna strona jest w złoto-beżowych kolorach.</li>
          <li><strong>Strony straciły część charakteru.</strong> Staniax stracił zdjęcie rzeźby, które go wyróżnia, a Madame Thai wyśrodkowany, elegancki układ z napisem w kroju szeryfowym. Makiety są czytelniejsze, ale wyglądają bardziej typowo.</li>
        </ul>
        <p style={s.akapit}>Wniosek: z takich makiet bierzemy konkretne zmiany w pierwszym ekranie, czyli ofertę i kontakt wyżej, a wygląd marki zostaje. Tak samo warto czytać makietę swojej strony: jako listę zmian do sprawdzenia, a nie projekt do skopiowania.</p>
      </Sekcja>

      <Sekcja id="jak-powstaje" tytul="Jak powstaje makieta: 3 kroki">
        <ol style={s.lista}>
          <li><strong>Czytamy Twoją stronę główną.</strong> Pobieramy nazwę, nagłówki, menu, opisy usług, dane kontaktowe i kolory marki i robimy zrzut obecnego wyglądu.</li>
          <li><strong>AI projektuje nowy układ.</strong> Model Claude układa nagłówek z menu i pierwszy ekran, potem 4 do 6 sekcji z Twoich treści (np. usługi, dlaczego my, proces, obszar działania, kontakt) i stopkę, w wersji na komputer i telefon.</li>
          <li><strong>Porównujesz.</strong> Pierwszy ekran nowej strony pokazujemy obok obecnej od razu. Całą makietę i link ważny 60 dni dostajesz po podaniu e-maila.</li>
        </ol>
        <p style={s.akapit}>Cały proces trwa zwykle {minuty} minut. W tym czasie zostaw kartę otwartą: postęp widać pod przyciskiem.</p>
      </Sekcja>

      <Sekcja id="zasady-tresci" tytul="Twoje treści: model ma nie wymyślać danych">
        <p style={s.akapit}>Model może skracać i porządkować Twoje teksty. Dostaje polecenie, żeby nie wymyślać liczb, lat doświadczenia, opinii klientów, nagród, certyfikatów, cen, nazw klientów ani statystyk, a gdy czegoś na stronie brakuje, pominąć ten element zamiast go zmyślać; w naszych przykładach z 18.11.2026 nie dodał liczb ani opinii, których nie ma na stronach klientów. To polecenie dla modelu generatywnego, a nie kontrola w kodzie, więc przejrzyj makietę przed użyciem: może się pomylić. Makieta jest plikiem bez skryptów i formularzy, wyświetlanym w zamkniętej ramce, a my tylko czytamy publiczną stronę główną, tak jak przeglądarka.</p>
        <p style={s.akapit}>Jedno ograniczenie: gdy strona pokazuje tekst dopiero po uruchomieniu JavaScriptu, model dostaje mniej treści i makieta wychodzi uboższa. Sprawdzisz to w <Link href={AUDYT} style={s.podkreslenie}>darmowym audycie SEO</Link> (reguła „Treść niewidoczna bez JavaScriptu”).</p>
      </Sekcja>

      <Sekcja id="przygotuj-strone" tytul="Jak przygotować stronę, żeby makieta wyszła lepsza">
        <p style={s.akapit}>Model widzi tylko to, co narzędzie wyciągnie z kodu Twojej strony głównej. Kilka poprawek na obecnej stronie daje lepszą makietę, a przy okazji pomaga też w Google i w odpowiedziach AI:</p>
        <ul style={s.lista}>
          <li><strong>Nagłówek H1 i tytuł strony mówią, co robisz, dla kogo i gdzie.</strong> Model dostaje tytuł, opis meta i do 3 nagłówków H1. W obu naszych przykładach wziął nagłówek H1 bez zmian, więc to on ustawia cały pierwszy ekran.</li>
          <li><strong>Każda usługa ma własny nagłówek H2.</strong> Model dostaje do 12 nagłówków H2 i na nich buduje kolejne sekcje. Usługi wymienione w jednym długim akapicie łatwiej zgubić.</li>
          <li><strong>Telefon i e-mail są zwykłym tekstem.</strong> Narzędzie szuka ich w treści strony. Numer pokazany tylko na obrazku albo ukryty w formularzu nie trafi do przycisku kontaktu w makiecie.</li>
          <li><strong>Grafika do udostępniania (og:image) pasuje do strony.</strong> Obok logo to jedyny obraz, którego model może użyć. Jeśli to baner z napisem w innym języku albo ze starą ofertą, trafi do pierwszego ekranu: u Madame Thai makieta ma w tle grafikę do udostępniania strony, a nie zdjęcie z jej obecnego pierwszego ekranu.</li>
          <li><strong>Ikona strony to czytelny znak.</strong> Logo w makiecie pochodzi z ikony strony (favicon albo apple-touch-icon). Jeśli ikoną jest sam symbol, makieta pokaże symbol zamiast pełnego logo.</li>
          <li><strong>Kolory marki są zapisane w kodzie.</strong> Narzędzie bierze do 6 najczęstszych kolorów z kodu HTML strony głównej i z meta theme-color. Bez nich model sam dobiera spokojną paletę do branży.</li>
          <li><strong>Menu ma krótkie nazwy.</strong> Do makiety trafia do 8 linków do Twoich podstron, każdy do 30 znaków. Dłuższe opisy w menu wypadają.</li>
          <li><strong>Najważniejsza treść jest wysoko.</strong> Model dostaje do 6 000 znaków tekstu od początku strony, więc opis oferty i obszaru działania powinien być przed długimi tekstami SEO na dole.</li>
        </ul>
      </Sekcja>

      <Sekcja id="kiedy-redesign" tytul="Kiedy warto zmienić wygląd strony">
        <ul style={s.lista}>
          <li>Strona źle wygląda na telefonie albo trzeba ją powiększać palcami.</li>
          <li>Klient w pierwszym ekranie nie widzi, co robisz, dla kogo i jak się z Tobą skontaktować.</li>
          <li>Strona ładuje się wolno, a audyt pokazuje niską wydajność na telefonie.</li>
          <li>Wygląd odstaje od konkurencji i od tego, jak firma pracuje dziś.</li>
        </ul>
        <p style={s.akapit}>Makieta pomaga zobaczyć kierunek, zanim wydasz pieniądze. Wersja na telefon ma znaczenie także dla SEO: Google ocenia stronę głównie w wersji mobilnej.</p>
      </Sekcja>

      <Sekcja id="jak-ocenic" tytul="Jak ocenić makietę: 5 pytań">
        <ol style={s.lista}>
          <li><strong>Czy w pierwszym ekranie widać, co robisz, dla kogo i gdzie?</strong> Jeśli nie, brakuje tego zdania także na obecnej stronie: dopisz je, zanim zaczniesz wdrożenie.</li>
          <li><strong>Czy przycisk kontaktu i telefon są widoczne bez przewijania, także na telefonie?</strong> Przełącz podgląd na telefon i sprawdź pierwszy ekran.</li>
          <li><strong>Czy sekcje odpowiadają na pytania klientów?</strong> Co oferujesz, jak wygląda współpraca, gdzie działasz i jak się umówić.</li>
          <li><strong>Czego brakuje, bo nie ma tego na obecnej stronie?</strong> Realizacje, zdjęcia, opinie, ceny: model ich nie dopisze, więc to lista treści do przygotowania.</li>
          <li><strong>Czy kolory i typografia pasują do marki?</strong> Zapisz, co zostaje, a co zmienić. To gotowy fragment briefu dla wykonawcy.</li>
        </ol>
      </Sekcja>

      <Sekcja id="ograniczenia" tytul="Czego makieta nie zrobi">
        <ul style={s.lista}>
          <li>Projektuje tylko stronę główną, bez podstron oferty, kontaktu czy bloga.</li>
          <li>Nie tworzy zdjęć: używa logo i obrazu udostępniania z Twojej strony, a resztę zastępuje kolorem i prostymi ikonami.</li>
          <li>Model dostaje do 6 000 znaków tekstu ze strony głównej. Dłuższy tekst jest ucinany, więc treści z dolnej części strony mogą się nie zmieścić.</li>
          <li>To statyczny plik HTML: bez edytora i eksportu do WordPressa czy Figmy. Zmiany wprowadza się przy wdrożeniu.</li>
          <li>Narzędzie tworzy makietę w języku badanej strony (np. polską dla strony po polsku, angielską dla angielskiej i niemiecką dla niemieckiej). Każde uruchomienie daje trochę inną propozycję; limit to {MAKIETA.limitIp} makiety dziennie z jednego adresu IP.</li>
          <li>Zrzut obecnej strony robi zewnętrzna usługa. Gdy nie odpowie, model pracuje na samych treściach i nie zobaczysz porównania obok siebie.</li>
        </ul>
      </Sekcja>

      <Sekcja id="makieta-a-projekt" tytul="Makieta strony internetowej z AI a projekt od projektanta">
        <ul style={s.lista}>
          <li><strong>Czas:</strong> makieta powstaje w {minuty} minut. Projekt od projektanta wymaga briefu, rozmowy i kilku rund poprawek.</li>
          <li><strong>Treść:</strong> makieta używa tylko tego, co już jest na Twojej stronie. Projektant może zaproponować nowe teksty, zdjęcia i strukturę podstron.</li>
          <li><strong>Zakres:</strong> makieta to jedna strona główna. Projekt obejmuje też podstrony, elementy powtarzalne i zasady wyglądu marki.</li>
          <li><strong>Kiedy co:</strong> makieta pomaga zdecydować, czy i w którą stronę zmieniać wygląd. Projekt jest potrzebny, gdy ta decyzja już zapadła.</li>
        </ul>
      </Sekcja>

      <Sekcja id="co-dalej" tytul="Co dalej z makietą">
        <ul style={s.lista}>
          <li><strong>Wdrożenie u nas:</strong> stronę firmową w Next.js budujemy od {cena('strona')} netto, z SEO, szybkością i przekierowaniami ze starych adresów. Wycenę dostajesz w 24 godziny w dni robocze. <Link href={projektowanie()} style={s.podkreslenie}>Zobacz, jak pracujemy przy projektowaniu stron internetowych</Link>.</li>
          <li><strong>Wdrożenie z innym wykonawcą:</strong> link z maila działa 60 dni, więc możesz pokazać makietę programiście albo agencji.</li>
          <li><strong>Sam kierunek:</strong> użyj makiety jako punktu wyjścia do {BRIEF ? <Link href={BRIEF} style={s.podkreslenie}>briefu strony</Link> : 'briefu'}: zapisz, które sekcje zostają, czego brakuje i jakie zdjęcia trzeba przygotować.</li>
        </ul>
        <div style={cta}>
          <Link href={projektowanie()} className="btn btn-primary" data-cta="makieta_wycena">Wyceń wdrożenie makiety</Link>
        </div>
      </Sekcja>

      <Poradniki narzedzie={SCIEZKA} />
      <PozostaleNarzedzia bez={SCIEZKA} />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_MAKIETY_EN = [
  { id: 'how-is-the-mockup-made', question: 'How is the mockup made?', answer: 'We fetch your homepage, extract its content (name, headings, menu, service descriptions, contact details and colors) and take a screenshot of how it looks now. The Claude AI model designs a new homepage layout from that. It is instructed not to invent numbers, reviews, awards or prices and to use only content from your website, but it can still make mistakes, so review the mockup before using it.' },
  { id: 'can-i-use-the-mockup', question: 'Can I put the mockup live?', answer: 'The mockup is a proposal for the look, not a finished website. It shows a direction: the section layout, hierarchy and colors. Before launch it has to be adapted to your brand and photos, and you need to take care of SEO: URLs, headings, speed and structured data.' },
  { id: 'is-the-mockup-safe', question: 'Does the mockup change anything on my website?', answer: 'No. We only read the public homepage, the way a browser does. The mockup is a separate file with no scripts, shown in a sandboxed frame, and the full version is available through the link in the email for 60 days.' },
  { id: 'will-it-hurt-seo', question: 'Will a new website based on the mockup hurt my SEO?', answer: 'The mockup itself changes nothing on your website. The risk comes when you launch the new design: changed URLs, removed content and slower loading. That is why the build has to keep your URLs or set up 301 redirects, carry over the content and check the speed before the new site replaces the old one.' },
  { id: 'does-ai-change-my-content', question: 'Does the AI change my content?', answer: 'The model shortens and reorganises the copy from your website and is instructed not to add numbers, reviews, awards, prices or client names, but there is no guarantee it always follows that instruction. It is still worth reviewing the copy before launch, because the mockup shows a direction, not finished content.' },
  { id: 'do-i-need-an-account', question: 'Do I need an account or a credit card?', answer: `No. You see the first screen of the mockup without signing up. For the whole mockup you only need an email address, to which we send the link. The limit is ${MAKIETA.limitIp} mockups per day from one IP address.` },
  { id: 'what-language', question: 'What language is the mockup in?', answer: 'The same language as your website: a Polish website gets a Polish mockup and an English website an English one.' },
  { id: 'how-much-does-a-new-website-cost', question: 'How much does a website redesign cost?', answer: `The mockup is free. The website redesign cost depends on the number of pages, integrations and content. We build a Next.js company website from ${cena('strona', 'en')} net and prepare a quote within 24 hours on business days. The scope is described on our <a href="/en/web-design">web design</a> page.` },
];

function MakietaEn() {
    const minutyEn = MAKIETA.minut.replace('-', ' to ');
  return (
    <Uklad
      locale="en"
      slug="makieta-redesignu"
      tag="Free tool"
      schema={{
        name: 'AI website redesign mockup',
        description: 'A free mockup generator: from the address of your current website it creates a proposal for a new homepage design on desktop and mobile, built from your business’s content.',
        category: 'DesignApplication',
        featureList: ['A new homepage proposal', 'Desktop and mobile version', 'Only content from your website'],
        screenshot: zrzutSchema('en'),
      }}
      lead={`Free website redesign mockup: enter your website address and in ${minutyEn} minutes AI designs a new homepage for desktop and mobile from your content. No account needed. Building the new website with us costs from ${cena('strona', 'en')} net.`}
      narzedzie={<MakietaClient />}
      odpowiedz="A website design mockup (redesign mockup) is a proposal for a new homepage that an AI model builds from the content already on your website: your name, headings, menu, service descriptions, contact details and colors. It shows the section layout, typography, colors and a mobile version. It is a direction to discuss with a developer, not a finished website: you see the first screen right away and the whole mockup after you enter your email."
      faq={FAQ_MAKIETY_EN}
      tytulFaq="Questions about the redesign mockup"
    >
      <Byline sciezka={SCIEZKA} takzeEn style={{ margin: '0 0 1.25rem' }} />
      <CoDostajesz
        locale="en"
        tytulOdRazu="Right away, with no account"
        odRazu={[
          'A screenshot of your current homepage (when the screenshot service responds within 30 seconds).',
          'Next to it, the first screen of the new page: the header with the menu and the hero section.',
          'No signup, card or installation.',
        ]}
        poEmailu={[
          'The whole mockup: 4 to 6 sections built from your content plus a footer.',
          'A desktop and mobile preview.',
          'A link to the mockup valid for 60 days that you can show to a partner or a developer.',
        ]}
        przypis="What to do with it: treat the mockup as a direction to discuss, that is the section layout, hierarchy and colors. Photos, copy and SEO are finished during the build."
      />

      <Sekcja id="example" tytul="Before and after examples: our clients’ websites Staniax and Madame Thai">
        <p style={s.akapit}>Instead of our own website, here are results for two real websites of our clients: Staniax (metallization and painting) and Madame Thai (a Thai restaurant in Warsaw). On {PRZYKLAD.data.en} we ran the tool on both addresses the way any user would, with nothing typed in the “What should improve?” field and no email entered. The Staniax mockup was ready after 93 seconds and the Madame Thai one after 94, and each has 6 sections. Below is the first section of each, the part the tool shows right away. Both websites are in Polish, so the mockups are in Polish too: the tool keeps the language of the website.</p>
        <p style={s.akapit}>This is the raw output of a free tool, not a design made for these companies or a proposal for changes to their websites. The assessment under the screenshots is our opinion of how the tool handled these two websites.</p>
        <p style={s.akapit}>We took the screenshots of both versions in the same browser at the same screen sizes: 1280 × 800 pixels on desktop and 390 × 844 on mobile. On the current websites we declined optional cookies before the screenshot so the banner would not cover the content. We did not touch the mockups up: this is exactly the code the tool returned. The browser window and the phone around the screenshots are a graphic frame, and the screenshot inside is unedited.</p>
        <MakietaPrzyklady klienci={KLIENCI} locale="en" />
        <p style={s.przypis}>Screenshots from {PRZYKLAD.data.en}, unedited. We do not show the other 5 sections of each mockup here, because in the tool they are also available only after you enter your email.</p>
      </Sekcja>

      <Sekcja id="what-the-mockup-changed" tytul="What the mockup changed for Staniax and Madame Thai, and what needs fixing">
        <p style={s.akapit}>We review the result the same way we suggest you review the mockup of your own website: what is better, and what cannot stay the way it is in the mockup when the site is built.</p>
        <h3 style={s.h3}>What is better</h3>
        <ul style={s.lista}>
          <li><strong>Staniax: the offer is visible right away.</strong> On the current website the first screen is taken up by a photo of a sculpture, while the mockup fits a heading with a description of the service, a “Poproś o bezpłatną wycenę” (request a free quote) button, a button with the phone number and three strengths of the company.</li>
          <li><strong>Madame Thai: booking and directions are on the first screen.</strong> The booking button carries the phone number, and the address and opening hours are at the bottom of the screen, on mobile too. The menu was cut from 8 to 5 items.</li>
          <li><strong>The data matches the clients’ websites.</strong> We checked the numbers and details visible in both mockups (the year 1993 and “over 25 years”, 0% Cr6+, the phone numbers, the address and the opening hours): they also appear in the code of the clients’ websites. The tool reworded some sentences, for example the button “Poproś o bezpłatną wycenę” instead of “Bezpłatna wycena”, but it did not add numbers that are not on these websites.</li>
          <li><strong>The headings stayed.</strong> The H1 heading of both websites went into the mockup unchanged and sets the first screen.</li>
        </ul>
        <h3 style={s.h3}>What needs fixing during the build</h3>
        <ul style={s.lista}>
          <li><strong>Menu and header elements are gone.</strong> Staniax lost the PL, EN and DE language switch and the “Realizacje” (projects) and “Galeria” (gallery) items. Madame Thai lost “Galeria”, “Najnowsze wiadomości” (news) and “Opinie” (reviews). The mockup designs a single homepage, so elements like these have to be added by hand.</li>
          <li><strong>The mobile menu is cut off.</strong> In both mockups the items form a row that scrolls sideways and the last ones do not fit on the screen: the fifth item at Staniax (“Kontakt”) and the fifth at Madame Thai (“Lokale”, locations). Not everyone will notice it can be scrolled.</li>
          <li><strong>Staniax: the header wraps on desktop.</strong> The menu takes one row, and the phone number and the quote button drop to a second one. The logo is the site icon (favicon) next to a text label, not the full logo.</li>
          <li><strong>Madame Thai: the background and colors differ from the website.</strong> The model does not create photos, so in the background it used the site’s social sharing image (og:image), not the photo from the current first screen. The accent is orange, while the current website is in gold and beige.</li>
          <li><strong>The websites lost some of their character.</strong> Staniax lost the sculpture photo that sets it apart, and Madame Thai its centred, elegant layout with a serif title. The mockups are easier to read, but look more generic.</li>
        </ul>
        <p style={s.akapit}>Our takeaway: from mockups like these we take specific changes to the first screen, that is the offer and the contact details higher up, while the brand’s look stays. Read the mockup of your own website the same way: as a list of changes to check, not a design to copy.</p>
      </Sekcja>

      <Sekcja id="how-it-works" tytul="How the mockup is made: 3 steps">
        <ol style={s.lista}>
          <li><strong>We read your homepage.</strong> We take your name, headings, menu, service descriptions, contact details and brand colors, and capture a screenshot of the current design.</li>
          <li><strong>AI designs a new layout.</strong> The Claude model builds a header with the menu and a first screen, then 4 to 6 sections from your content (e.g. services, why us, process, service area, contact) and a footer, for desktop and mobile.</li>
          <li><strong>You compare.</strong> We show the first screen of the new page next to your current one right away. You get the whole mockup and a link valid for 60 days after you enter your email.</li>
        </ol>
        <p style={s.akapit}>The whole process usually takes {minutyEn} minutes. Keep the tab open in the meantime: the progress shows under the button.</p>
      </Sekcja>

      <Sekcja id="content-rules" tytul="Your content: the model is told not to invent data">
        <p style={s.akapit}>The model may shorten and reorganise your copy. It is instructed not to invent numbers, years of experience, customer reviews, awards, certifications, prices, client names or statistics, and, if something is missing from your website, to leave that element out instead of making it up; in our examples of 18 November 2026 it did not add numbers or reviews that are not on the clients’ websites. This is an instruction to a generative model, not a check in code, so review the mockup before using it: it can still make mistakes. The mockup is a file with no scripts or forms, shown in a sandboxed frame, and we only read your public homepage, the way a browser does.</p>
        <p style={s.akapit}>One limit: if your website shows its text only after JavaScript runs, the model gets less content and the mockup comes out thinner. You can check this in the <Link href={AUDYT} style={s.podkreslenie}>free SEO audit</Link> (the “Content invisible without JavaScript” rule).</p>
      </Sekcja>

      <Sekcja id="prepare-your-website" tytul="How to prepare your website for a better mockup">
        <p style={s.akapit}>The model only sees what the tool extracts from the code of your homepage. A few fixes on your current website give a better mockup, and they help with Google and AI answers along the way:</p>
        <ul style={s.lista}>
          <li><strong>The H1 heading and the page title say what you do, who for and where.</strong> The model gets the title, the meta description and up to 3 H1 headings. In both of our examples it kept the H1 unchanged, so that heading sets the whole first screen.</li>
          <li><strong>Every service has its own H2 heading.</strong> The model gets up to 12 H2 headings and builds the next sections from them. Services listed in one long paragraph are easier to lose.</li>
          <li><strong>Your phone number and email address are plain text.</strong> The tool looks for them in the page content. A number shown only in an image or hidden in a form will not make it into the contact button of the mockup.</li>
          <li><strong>Your social sharing image (og:image) fits the website.</strong> Apart from the logo, it is the only image the model can use. If it is a banner with text in another language or an old offer, it will end up on the first screen: for Madame Thai the mockup used the site’s sharing image in the background, not the photo from its current first screen.</li>
          <li><strong>Your site icon is a readable mark.</strong> The logo in the mockup comes from the site icon (favicon or apple-touch-icon). If the icon is only a symbol, the mockup will show the symbol instead of the full logo.</li>
          <li><strong>Your brand colors are written in the code.</strong> The tool takes up to 6 of the most frequent colors from the HTML of your homepage and from the theme-color meta tag. Without them the model picks a calm palette for your industry.</li>
          <li><strong>Your menu has short labels.</strong> Up to 8 links to your own pages make it into the mockup, each up to 30 characters long. Longer menu labels are dropped.</li>
          <li><strong>The most important content comes first.</strong> The model gets up to 6,000 characters of text from the start of the page, so the description of your offer and service area should come before long SEO texts at the bottom.</li>
        </ul>
      </Sekcja>

      <Sekcja id="when-to-redesign" tytul="When it is worth changing how your website looks">
        <ul style={s.lista}>
          <li>The site looks bad on a phone or has to be zoomed with your fingers.</li>
          <li>On the first screen a customer cannot see what you do, who for and how to contact you.</li>
          <li>The site loads slowly and an audit shows low mobile performance.</li>
          <li>The look lags behind your competitors and behind how the business works today.</li>
        </ul>
        <p style={s.akapit}>A mockup helps you see a direction before you spend money. The mobile version matters for SEO too: Google evaluates your website mainly in its mobile version.</p>
      </Sekcja>

      <Sekcja id="how-to-review" tytul="How to review the mockup: 5 questions">
        <ol style={s.lista}>
          <li><strong>Does the first screen show what you do, who for and where?</strong> If not, that sentence is missing from your current website too: add it before the build starts.</li>
          <li><strong>Are the contact button and phone number visible without scrolling</strong>, on mobile too? Switch the preview to mobile and check the first screen.</li>
          <li><strong>Do the sections answer customers’ questions?</strong> What you offer, how working together looks, where you operate and how to book.</li>
          <li><strong>What is missing because it is not on your current website?</strong> Projects, photos, reviews, prices: the model will not add them, so this is your list of content to prepare.</li>
          <li><strong>Do the colors and typography fit your brand?</strong> Note what stays and what should change. That is a ready part of the brief for your developer.</li>
        </ol>
      </Sekcja>

      <Sekcja id="limits" tytul="What the mockup will not do">
        <ul style={s.lista}>
          <li>It designs the homepage only, without the service, contact or blog pages.</li>
          <li>It does not create photos: it uses the logo and the sharing image from your website and replaces the rest with color and simple icons.</li>
          <li>The model gets up to 6,000 characters of text from your homepage. Longer text is cut off, so content from the lower part of the page may not make it in.</li>
          <li>It is a static HTML file: no editor and no export to WordPress or Figma. Changes are made during the build.</li>
          <li>The mockup is written in the language of your website. Every run gives a slightly different proposal; the limit is {MAKIETA.limitIp} mockups per day from one IP address.</li>
          <li>The screenshot of your current website comes from an external service. If it does not respond, the model works from your content only and you will not see a side-by-side comparison.</li>
        </ul>
      </Sekcja>

      <Sekcja id="mockup-vs-designer" tytul="AI website design mockup vs a designer’s project">
        <ul style={s.lista}>
          <li><strong>Time:</strong> the mockup is ready in {minutyEn} minutes. A designer’s project needs a brief, a conversation and a few rounds of changes.</li>
          <li><strong>Content:</strong> the mockup uses only what is already on your website. A designer can propose new copy, photos and a new page structure.</li>
          <li><strong>Scope:</strong> the mockup is one homepage. A project also covers the subpages, reusable components and brand design rules.</li>
          <li><strong>When to use which:</strong> the mockup helps you decide whether and in which direction to change the design. A project is what you need once that decision is made.</li>
        </ul>
      </Sekcja>

      <Sekcja id="next-steps" tytul="What to do with the mockup next">
        <ul style={s.lista}>
          <li><strong>Build it with us:</strong> we build a Next.js company website from {cena('strona', 'en')} net, with SEO, speed and redirects from your old URLs. You get a quote within 24 hours on business days. <Link href={projektowanie()} style={s.podkreslenie}>See how we approach web design</Link>.</li>
          <li><strong>Build it with someone else:</strong> the link in the email works for 60 days, so you can show the mockup to a developer or an agency.</li>
          <li><strong>Use it as a direction:</strong> treat the mockup as the starting point of a {BRIEF ? <Link href={BRIEF} style={s.podkreslenie}>website brief</Link> : 'brief'}: note which sections stay, what is missing and which photos you need.</li>
        </ul>
        <div style={cta}>
          <Link href={projektowanie()} className="btn btn-primary" data-cta="makieta_wycena">Get a quote for the mockup</Link>
        </div>
      </Sekcja>

      <Poradniki narzedzie={SCIEZKA} locale="en" />
      <PozostaleNarzedzia bez={SCIEZKA} locale="en" />
    </Uklad>
  );
}
