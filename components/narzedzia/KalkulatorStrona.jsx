// Strona aplikacji: Kalkulator strat (/narzedzia/kalkulator-strat-seo, /en/tools/seo-loss-calculator). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
//
// 12.11.2026 (S1-poprawki sekcja 3, agent kalkulator): lead i kalkulator w pierwszym ekranie (Z-K2),
// metodologia pod część AI 1-3% (Z-K0b), „Co dostajesz za darmo” (Z-04, rozbicie bez e-maila: Z-K5),
// „Koszt SEO i zwrot” (Z-K7, ceny z lib/narzedziaLiczby.js CENY), przykłady liczone modelem (Z-K3: liczby
// renderuje policzStraty/policzZwrot, nic nie jest wpisane ręcznie), „Czego kalkulator nie policzy”
// (Z-K2b), „Jak zmniejszyć stratę”, Poradniki (Z-03), wszystkie narzędzia i hub (Z-02), FAQ 4 -> 9 (Z-K4),
// featureList (Z-05).
// 12.11.2026 (domknięcie, agent kalkulator): tryb sklepu internetowego: sekcja „Kalkulator dla sklepu
// internetowego” z przykładem liczonym modelem (PRZYKLADY.sklep), wpis w „Czego kalkulator nie policzy”,
// 4 pytania FAQ dla sklepów, lead/odpowiedź/featureList. Konwersja sklepów: Littledata (ZRODLA_KALKULATORA[9]).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { hrefAudytuAi } from '@/lib/narzedzia';
import { hrefWJezyku } from '@/lib/linkiEn';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import KalkulatorClient, { WstawPrzyklad } from './KalkulatorClient';
import { PRZYKLADY, ZALOZENIA, ZWROT, policzStraty, policzZwrot } from '@/lib/kalkulatorStrat';
import { AUDYT, CENY, GENERATOR, cena } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/narzedzia/kalkulator-strat-seo';

// --- Liczby z modelu (nie wpisywać ręcznie) ---------------------------------------------------------
const proc = (x) => Math.round(x * 100);
const ctrPl = (x) => (Math.round(x * 1000) / 10).toLocaleString('pl-PL');
const ctrEn = (x) => (Math.round(x * 1000) / 10).toLocaleString('en-US');
const zl = (n) => `${Math.round(n).toLocaleString('pl-PL')} zł`;
const pln = (n) => `PLN ${Math.round(n).toLocaleString('en-US')}`;
const dzies = (n, en) => n.toLocaleString(en ? 'en-US' : 'pl-PL', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const zZnakiem = (n, f) => (n > 0 ? `+${f(n)}` : n < 0 ? `−${f(-n)}` : f(0));
const AI_MIN = proc(ZALOZENIA.ai.ctr.ostrozny);
const AI_MAX = proc(ZALOZENIA.ai.ctr.optymistyczny);

const usluga = policzStraty(PRZYKLADY.usluga);
const uslugaTak = policzStraty({ ...PRZYKLADY.usluga, widocznyWAi: 'tak' });
const uslugaZwrot = policzZwrot(usluga, CENY.seoStandard.pln);
const remont = policzStraty(PRZYKLADY.remont);
const remontZwrot = policzZwrot(remont, CENY.seoStandard.pln);
const SK = PRZYKLADY.sklep;
const sklep = policzStraty(SK);
const sklepBezPowrotow = policzStraty({ ...SK, powroty: undefined });
const sklepZwrot = policzZwrot(sklep, CENY.seoStandard.pln);

// Link tylko do opublikowanej strony (i do istniejącej wersji EN); inaczej sam tekst. Klucz PL: <Link>
// z i18n tłumaczy go sam (jak Poradniki.jsx).
function L({ href, en = false, children }) {
  const ok = hrefJesliOpublikowana(href) && (!en || hrefWJezyku(href, 'en') !== null);
  return ok ? <Link href={href} style={s.podkreslenie}>{children}</Link> : children;
}
const coKtory = Math.round(100 / PRZYKLADY.usluga.konwersja);

// Z-07: zrzut wyniku kalkulatora dla przykładu „firma remontowa” (PRZYKLADY.remont, udział AI 25%, widoczność
// w AI „nie”, pakiet SEO Standard, pełny efekt po 12 miesiącach), z 12.11.2026, bez ręcznych poprawek; tylko część
// widoczna bez e-maila. Kalkulator liczy w przeglądarce, więc to prawdziwe wyliczenie dla danych przykładowych.
// Po zmianie cennika (CENY), założeń (ZALOZENIA/ZWROT) albo PRZYKLADY.remont zrobić zrzut ponownie
// (scratchpad/pw-zrzuty/zrzuty.mjs), bo liczby na obrazie przestaną się zgadzać z tekstem przykładu.
const ZRZUT = {
  pl: { src: '/images/narzedzia/przyklady/kalkulator-strat-seo-przykladowy-wynik.webp', width: 1200, height: 1771 },
  en: { src: '/images/narzedzia/przyklady/seo-loss-calculator-example-result.webp', width: 1200, height: 1789 },
};
const schemaZrzutu = (z) => ({ url: z.src, width: z.width, height: z.height });
const R = PRZYKLADY.remont;

function miesiacZwrotuPl(z) {
  const { min, max } = z;
  if (max.miesiacZwrotu === null) return `koszt nie zwraca się w ciągu ${z.horyzont} miesięcy`;
  if (min.miesiacZwrotu === null) return `koszt zwraca się w ${max.miesiacZwrotu}. miesiącu tylko w wariancie optymistycznym`;
  return `koszt zwraca się między ${max.miesiacZwrotu}. a ${min.miesiacZwrotu}. miesiącem`;
}
function miesiacZwrotuEn(z) {
  const { min, max } = z;
  if (max.miesiacZwrotu === null) return `the cost does not pay back within ${z.horyzont} months`;
  if (min.miesiacZwrotu === null) return `the cost pays back in month ${max.miesiacZwrotu} in the optimistic variant only`;
  return `the cost pays back between month ${max.miesiacZwrotu} and month ${min.miesiacZwrotu}`;
}

// --- Kalkulator --------------------------------------------------------------------------------

function faqPl() {
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  return [
    { id: 'skad-widelki', question: 'Skąd widełki zamiast jednej kwoty?', answer: 'Badania CTR mocno się różnią: według First Page Sage pierwsza pozycja w Google zbiera 39,8% kliknięć, według badania GrowthSRC z 2025 roku 19%. Liczymy oba warianty, żeby nie zawyżać wyniku i nie obiecywać jednej liczby.' },
    { id: 'skad-dane-o-ai', question: 'Skąd dane o wpływie AI?', answer: `Wpływ przeglądów AI w Google bierzemy z badania Pew Research Center (marzec 2025): przy podsumowaniu AI użytkownicy klikali w wynik w 8% wizyt, bez niego w 15%, a podsumowanie pojawiło się przy 18% wyszukiwań. Z odpowiedzi AI na stronę firmy przechodzi niewiele osób: w link w samym podsumowaniu AI klikano w 1% wizyt (Pew), a z trybu AI Google kliknięciem w inną stronę kończy się mniej niż ok. 3% wyszukiwań (Similarweb, 2025). Dlatego stratę w AI liczymy współczynnikiem ${AI_MIN}-${AI_MAX}%, a nie CTR pozycji w Google. Udział pytań zadawanych asystentom AI ustawiasz sam; domyślne ${ZALOZENIA.udzialAiDomyslny}% to prognoza Gartnera.` },
    { id: 'czy-wynik-to-gwarancja', question: 'Czy wynik to gwarancja zysku po pozycjonowaniu?', answer: 'Nie. To szacunek potencjału przy pozycjach w TOP 3 i obecności w odpowiedziach AI, policzony z Twoich danych. Ile z niego da się odzyskać, zależy od konkurencji, budżetu i jakości strony.' },
    { id: 'gdzie-sprawdzic-wyszukiwania', question: 'Skąd wziąć liczbę wyszukiwań?', answer: 'Z Planera słów kluczowych Google Ads (bezpłatny po założeniu konta) albo z narzędzi SEO. Zsumuj miesięczne wyszukiwania kilku głównych fraz, np. „usługa + miasto”. Ruch z Google sprawdzisz w Google Search Console.' },
    { id: 'czy-to-kalkulator-kosztu-seo', question: 'Czy to kalkulator kosztu pozycjonowania?', answer: `Nie wycenia zakresu prac. Najpierw liczy, ile zysku tracisz dziś bez TOP 3 i bez poleceń w AI, a w części „Czy SEO się opłaci?” porównuje tę kwotę z ceną pakietu albo z Twoją kwotą i pokazuje miesiąc zwrotu. Pakiety SEO zaczynają się u nas od ${cena('seoStandard')} netto miesięcznie, a szczegóły są w <a href="${cennik}">cenniku pozycjonowania</a>.` },
    { id: 'kiedy-seo-sie-zwroci', question: 'Kiedy pozycjonowanie się zwróci?', answer: `To zależy od tego, ile zysku tracisz i ile płacisz. Kalkulator zakłada, że odzyskany zysk rośnie równo przez ${ZWROT.miesiaceDoEfektu.domyslnie} miesięcy (możesz to zmienić), i szuka miesiąca, w którym suma zysku dogoni sumę kosztów, w horyzoncie ${ZWROT.horyzont} miesięcy. Przy małym popycie pakiet może się nie zwrócić wcale, przy klientach o dużej wartości zwraca się w kilka miesięcy. Oba przypadki pokazujemy w przykładach na tej stronie.` },
    { id: 'nie-znam-konwersji', question: 'Co wpisać, gdy nie znam konwersji ani marży?', answer: 'Konwersję policzysz jako zapytania albo zamówienia z miesiąca podzielone przez wejścia na stronę z tego samego miesiąca. Bez danych wpisz wartość niższą, niż się spodziewasz: wynik będzie ostrożniejszy. Marża 100% pokaże przychód zamiast zysku.' },
    { id: 'czy-dane-gdzies-trafiaja', question: 'Czy wpisane liczby gdzieś trafiają?', answer: 'Wynik liczy Twoja przeglądarka i niczego nie wysyła, dopóki nie poprosisz o zestawienie e-mailem. Wtedy zapisujemy wpisane liczby (z kosztem SEO, jeśli go wybierzesz), wynik i adres e-mail na 60 dni, żeby wysłać raport.' },
    { id: 'dlaczego-strata-w-ai-mniejsza', question: 'Dlaczego strata w AI wychodzi mniejsza niż w Google?', answer: 'Bo z odpowiedzi AI rzadko się klika: według Pew w link w podsumowaniu AI klika się w 1% wizyt, a według Conductor wejścia z asystentów AI to 1,08% ruchu stron. Polecenie w ChatGPT czy Gemini daje dziś mniej wejść niż pozycja w TOP 3 Google. Z tego samego powodu wyższy udział pytań w AI zmniejsza wynik: zabiera popyt z Google i przenosi go do kanału, w którym mało kto klika.' },
    { id: 'czy-dziala-dla-sklepu', question: 'Czy kalkulator działa dla sklepu internetowego?', answer: 'Tak. Wybierz „Sklep internetowy” nad formularzem. Wpisujesz liczbę wyszukiwań fraz kategorii i produktów, ruch z Google, konwersję sklepu, średnią wartość zamówienia, marżę brutto i opcjonalnie odsetek klientów, którzy kupują ponownie. Model wejść z Google i z AI jest ten sam co dla usług, a wynik pokazuje utraconą marżę brutto, sprzedaż i liczbę zamówień. Koszt SEO i miesiąc zwrotu liczą się tak samo.' },
    { id: 'jaka-marza-w-sklepie', question: 'Jaką marżę wpisać dla sklepu?', answer: 'Marżę brutto: cenę sprzedaży minus koszt zakupu towaru, w procentach ceny. Kalkulator nie odejmuje wysyłki, prowizji płatności, zwrotów towaru ani kosztów reklam, więc jeśli chcesz je uwzględnić, wpisz marżę po tych kosztach. Marża 100% pokaże utraconą sprzedaż zamiast marży.' },
    { id: 'powracajacy-klienci', question: 'Jak kalkulator liczy klientów, którzy wracają?', answer: `Jeśli podasz odsetek klientów kupujących ponownie, zakładamy jedno dodatkowe zamówienie w ciągu roku od każdego, kto wraca: przy ${SK.powroty}% jeden utracony nowy klient to ${(1 + SK.powroty / 100).toLocaleString('pl-PL')} zamówienia. Wielu stałych klientów kupuje częściej, więc to ostrożne założenie. Bez tego pola liczymy tylko pierwsze zamówienie. Odsetek znajdziesz w raporcie klientów w panelu sklepu: klienci z co najmniej dwoma zamówieniami w roku podzieleni przez wszystkich klientów.` },
    { id: 'jaka-konwersja-sklepu', question: 'Jaka konwersja jest typowa dla sklepu internetowego?', answer: 'Według Littledata mediana w 450 sklepach Shopify (dane z GA4, sierpień-listopad 2026) to 1,3%, 20% najlepszych sklepów ma ponad 2,8%, a 10% najlepszych ponad 3,6%. W kalkulatorze wpisz swoją konwersję z GA4 albo z panelu sklepu: zamówienia podzielone przez sesje.' },
  ];
}

export function KalkulatorStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <KalkulatorEn />;
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  const st = CENY.seoStandard;
  return (
    <Uklad
      slug="kalkulator-strat-seo"
      tag="Darmowy kalkulator"
      schema={{
        name: 'Kalkulator strat bez SEO i widoczności w AI',
        description: 'Bezpłatny kalkulator: szacuje, ile zysku miesięcznie traci firma albo sklep internetowy bez pozycji w TOP 3 Google i bez poleceń w odpowiedziach AI, na podstawie jej danych, badań CTR w Google i badań kliknięć z odpowiedzi AI, oraz po ilu miesiącach zwróci się koszt SEO.',
        category: 'FinanceApplication',
        screenshot: schemaZrzutu(ZRZUT.pl),
        featureList: ['Strata w Google i w odpowiedziach AI', 'Widełki z badań kliknięć w Google i w odpowiedziach AI', 'Wynik w złotych miesięcznie i rocznie', 'Koszt SEO i miesiąc zwrotu dla pakietu z cennika albo własnej kwoty', 'Tryb dla sklepu internetowego: wartość zamówienia, marża brutto i powracający klienci'],
      }}
      lead="Wpisz pięć liczb ze swojej firmy albo sklepu internetowego, a kalkulator od razu pokaże w widełkach, ile zysku miesięcznie tracisz bez TOP 3 w Google i bez poleceń w AI. Po wyborze pakietu zobaczysz też, czy i kiedy SEO się zwróci."
      narzedzie={<KalkulatorClient />}
      odpowiedz="Kalkulator szacuje, ile zysku miesięcznie trafia do konkurencji, gdy Twojej firmy nie ma w TOP 3 Google i w odpowiedziach ChatGPT czy Gemini. Liczy z Twoich danych: liczby wyszukiwań, obecnego ruchu, konwersji, wartości klienta i marży, oraz z jawnych założeń: badań CTR w Google, wpływu przeglądów AI i odsetka wejść z odpowiedzi AI. Wynik podaje w widełkach, a po podaniu kosztu SEO pokazuje bilans i miesiąc zwrotu. Dla sklepów internetowych ma osobny tryb: liczy z wartości zamówienia, marży brutto i opcjonalnie odsetka klientów, którzy kupują ponownie."
      faq={faqPl()}
      tytulFaq="Pytania o kalkulator strat"
    >
      <CoDostajesz
        locale="pl"
        odRazu={[
          'Widełki straty zysku: miesięcznie i rocznie',
          'Rozbicie na Google i odpowiedzi AI z liczbą wejść',
          'Liczbę klientów, których tracisz co miesiąc',
          'Koszt SEO i miesiąc zwrotu dla naszych pakietów albo Twojej kwoty',
          'W trybie sklepu: utraconą marżę brutto, sprzedaż i liczbę zamówień',
          'Link, który odtwarza wynik z tymi samymi liczbami',
        ]}
        poEmailu={['Zestawienie e-mailem: wynik, założenia, źródła i krótki plan działań']}
        przypis="Wynik liczy Twoja przeglądarka. Adres e-mail podajesz tylko wtedy, gdy chcesz dostać zestawienie."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.pl}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Kalkulator strat SEO: przykładowe wyliczenie straty zysku z rozbiciem na Google, AI i klientów oraz koszt i miesiąc zwrotu pakietu SEO Standard"
            podpis={`Przykładowe wyliczenie dla firmy remontowej z przykładu niżej: ${R.wyszukiwania.toLocaleString('pl-PL')} wyszukiwań, ${R.ruch} wejść z Google, ${R.konwersja}% konwersji, zlecenie ${R.wartosc.toLocaleString('pl-PL')} zł, marża ${R.marza}%, pakiet SEO Standard i pełny efekt po 12 miesiącach. Liczby są przykładowe, to nie wynik prawdziwej firmy. Zrzut z 12.11.2026 (ceny z tego dnia).`}
          />
        </div>
      </CoDostajesz>

      <Sekcja id="jak-liczymy" tytul="Jak liczymy stratę">
        <ol style={s.lista}>
          <li><strong>Potencjał w Google:</strong> wyszukiwania pomniejszone o część, która trafia do asystentów AI, razy średni CTR pozycji 1-3: {ctrPl(ZALOZENIA.ctrTop3.ostrozny)}% w wariancie ostrożnym i {ctrPl(ZALOZENIA.ctrTop3.optymistyczny)}% w optymistycznym.</li>
          <li><strong>Przeglądy AI w Google:</strong> przy {proc(ZALOZENIA.aio.udzialWyszukiwan)}% wyszukiwań kliknięcia spadają z {proc(ZALOZENIA.aio.ctrBez)}% do {proc(ZALOZENIA.aio.ctrZ)}% wizyt, więc obniżamy CTR proporcjonalnie.</li>
          <li><strong>Strata w Google</strong> to potencjał minus Twój obecny ruch z Google (nie mniej niż zero).</li>
          <li><strong>Strata w AI:</strong> część pytań zadawanych asystentom AI razy odsetek pytających, którzy wchodzą potem na stronę polecanej firmy: {AI_MIN}% w wariancie ostrożnym (Pew Research Center: w link w samym podsumowaniu AI klika się w 1% wizyt) i {AI_MAX}% w optymistycznym (Similarweb: mniej niż ok. 3% wyszukiwań w trybie AI Google kończy się kliknięciem w inną stronę). To kilka razy mniej niż CTR pozycji 1-3 w Google. Liczymy ją tylko wtedy, gdy modele nie polecają dziś Twojej firmy.</li>
          <li><strong>Odpowiedź „nie wiem”:</strong> liczymy {proc(ZALOZENIA.ai.nieWiem.ostrozny)}% straty w AI w wariancie ostrożnym i całą w optymistycznym, bo asystenci polecają niewiele firm: według SOCi (2026) ChatGPT poleca 1,2% lokalizacji firm, a Google pokazuje 35,9% w pakiecie lokalnym.</li>
          <li><strong>Zysk:</strong> utracone wizyty razy konwersja, wartość klienta i marża. Kwota roczna to miesięczna razy 12.</li>
        </ol>
        <p style={s.akapit}>Dla porównania: w czerwcu 2025 roku platformy AI wysłały 1,13 mld wejść na 1000 największych stron świata, a wyszukiwarka Google 191 mld (Similarweb). Według Conductor wejścia z asystentów AI to 1,08% ruchu stron. Dlatego część AI jest dziś mniejsza niż strata w Google.</p>
        <p style={s.akapit}>Chcesz wiedzieć, ile kosztuje odzyskanie tego ruchu? Ceny pakietów są w <Link href={cennik} style={s.podkreslenie}>cenniku pozycjonowania</Link>, a widoczność w AI sprawdzisz w <Link href={hrefAudytuAi()} style={s.podkreslenie}>audycie widoczności w AI</Link>.</p>
      </Sekcja>

      <Sekcja id="koszt-i-zwrot" tytul="Czy SEO się opłaci: koszt i miesiąc zwrotu">
        <p style={s.akapit}>Pod wynikiem wybierasz pakiet z naszego <Link href={cennik} style={s.podkreslenie}>cennika pozycjonowania</Link> albo wpisujesz własną kwotę, np. wycenę innej agencji. Ceny netto miesięcznie: SEO Standard od {cena('seoStandard')}, SEO Premium {cena('seoPremium')}, Booster Pack {cena('boosterPack')} (umowa min. {CENY.boosterPack.umowaMiesiecy} miesiące, nowa strona w pakiecie). Przy cenie „od” liczymy kwotą wyjściową.</p>
        <ol style={s.lista}>
          <li><strong>Bilans miesięczny:</strong> odzyskany zysk przy pełnym efekcie minus koszt pakietu. Pokazujemy go dla obu wariantów straty.</li>
          <li><strong>Dochodzenie do efektu:</strong> pozycje nie rosną od pierwszego dnia, więc zakładamy, że odzyskany zysk rośnie równo przez wybraną liczbę miesięcy (domyślnie {ZWROT.miesiaceDoEfektu.domyslnie}, możesz ustawić od {ZWROT.miesiaceDoEfektu.min} do {ZWROT.miesiaceDoEfektu.max}), a potem stoi. Domyślne {ZWROT.miesiaceDoEfektu.domyslnie} miesięcy to nasze założenie, nie wynik badania. Według Ahrefs (2025) w ciągu roku do TOP 10 Google trafia 1,74% nowo opublikowanych stron, a 72,9% stron w TOP 10 ma ponad 3 lata, więc przy nowej domenie ustaw więcej.</li>
          <li><strong>Miesiąc zwrotu:</strong> pierwszy miesiąc, w którym suma odzyskanego zysku dogania sumę zapłaconych kosztów. Szukamy go w ciągu {ZWROT.horyzont} miesięcy.</li>
          <li><strong>Próg opłacalności:</strong> jaką część wyliczonej straty trzeba odzyskać, żeby zysk pokrył koszt. Jeśli wychodzi ponad 100%, pakiet w tej cenie się nie opłaci nawet przy pełnym sukcesie.</li>
        </ol>
        <p style={s.akapit}>To arytmetyka na Twoich liczbach, a nie obietnica wyniku. Nikt uczciwy nie zagwarantuje TOP 3, dlatego obok miesiąca zwrotu pokazujemy próg i bilans pierwszego roku. Co robimy co miesiąc w pakietach, opisujemy na stronach <L href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</L> i <L href="/pozycjonowanie-w-ai">pozycjonowanie w AI</L>.</p>
      </Sekcja>

      <Sekcja id="przyklad" tytul="Przykład: firma usługowa">
        <p style={s.akapit}>Firma usługowa ma frazy, które klienci wpisują w Google {PRZYKLADY.usluga.wyszukiwania.toLocaleString('pl-PL')} razy w miesiącu, a dziś dostaje z Google {PRZYKLADY.usluga.ruch} wejść. Co {coKtory}. odwiedzający zostaje klientem (konwersja {PRZYKLADY.usluga.konwersja}%), klient płaci średnio {zl(PRZYKLADY.usluga.wartosc)}, a marża to {PRZYKLADY.usluga.marza}%. Właściciel nie wie, czy ChatGPT poleca firmę, i zostawia domyślne {PRZYKLADY.usluga.udzialAi}% pytań w AI. Kalkulator pokazuje stratę od {zl(usluga.min.zysk)} do {zl(usluga.max.zysk)} zysku miesięcznie: w Google {zl(usluga.min.zyskSeo)}–{zl(usluga.max.zyskSeo)} i w AI {zl(usluga.min.zyskAi)}–{zl(usluga.max.zyskAi)}, czyli {dzies(usluga.min.klienci)}–{dzies(usluga.max.klienci)} klienta miesięcznie. Gdy modele AI już polecają firmę, strata spada do {zl(uslugaTak.min.zysk)}–{zl(uslugaTak.max.zysk)}.</p>
        <p style={s.akapit}>Przy pakiecie SEO Standard (od {zl(st.pln)} netto miesięcznie) i pełnym efekcie po {uslugaZwrot.miesiaceDoEfektu} miesiącach bilans miesięczny wynosi od {zZnakiem(uslugaZwrot.min.bilans, zl)} do {zZnakiem(uslugaZwrot.max.bilans, zl)}, a {miesiacZwrotuPl(uslugaZwrot)}.{uslugaZwrot.max.miesiacZwrotu === null ? ' Przy takim popycie i takiej wartości klienta pakiet się nie opłaci: kalkulator mówi to wprost, zamiast obiecywać zwrot.' : ''}</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="usluga" /></p>
      </Sekcja>

      <Sekcja id="przyklad-remont" tytul="Przykład: firma remontowa ze zleceniami o dużej wartości">
        <p style={s.akapit}>Firma remontowa ma frazy wpisywane {PRZYKLADY.remont.wyszukiwania.toLocaleString('pl-PL')} razy w miesiącu i dostaje dziś z Google {PRZYKLADY.remont.ruch} wejść. Klientem zostaje {PRZYKLADY.remont.konwersja}% odwiedzających, zlecenie jest warte średnio {zl(PRZYKLADY.remont.wartosc)}, marża to {PRZYKLADY.remont.marza}%, a modele AI nie polecają firmy. Strata: {zl(remont.min.zysk)}–{zl(remont.max.zysk)} zysku miesięcznie, z tego w Google {zl(remont.min.zyskSeo)}–{zl(remont.max.zyskSeo)} i w AI {zl(remont.min.zyskAi)}–{zl(remont.max.zyskAi)}, czyli {dzies(remont.min.klienci)}–{dzies(remont.max.klienci)} zlecenia miesięcznie.</p>
        <p style={s.akapit}>Przy tym samym pakiecie SEO Standard bilans miesięczny przy pełnym efekcie to {zZnakiem(remontZwrot.min.bilans, zl)} do {zZnakiem(remontZwrot.max.bilans, zl)}, bilans pierwszych 12 miesięcy {zZnakiem(remontZwrot.min.bilansRok, zl)} do {zZnakiem(remontZwrot.max.bilansRok, zl)}, a {miesiacZwrotuPl(remontZwrot)}. Żeby zysk pokrył koszt, wystarczy odzyskać {remontZwrot.max.prog}-{remontZwrot.min.prog}% wyliczonej straty. Różnicę między przykładami robi wartość klienta, nie liczba wyszukiwań.</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="remont" /></p>
      </Sekcja>

      <Sekcja id="sklep-internetowy" tytul="Kalkulator dla sklepu internetowego">
        <p style={s.akapit}>Nad formularzem wybierz „Sklep internetowy”. Model wejść z Google i z odpowiedzi AI zostaje ten sam co dla usług, zmieniają się dane i to, co pokazuje wynik.</p>
        <ul style={s.lista}>
          <li><strong>Średnia wartość zamówienia</strong> zamiast wartości klienta: przychód ze sprzedaży podzielony przez liczbę zamówień, z panelu sklepu albo z GA4.</li>
          <li><strong>Marża brutto:</strong> cena sprzedaży minus koszt zakupu towaru, w procentach ceny. Wynik to utracona marża brutto, a obok niej utracona sprzedaż (przychód przed marżą). Chcesz uwzględnić wysyłkę, prowizje płatności i zwroty towaru? Wpisz marżę po tych kosztach.</li>
          <li><strong>Konwersja sklepu:</strong> zamówienia podzielone przez sesje. Dla porównania: według Littledata mediana w 450 sklepach Shopify (dane z GA4, sierpień-listopad 2026) to 1,3%, a 10% najlepszych sklepów ma ponad 3,6%.</li>
          <li><strong>Powracający klienci (pole opcjonalne):</strong> zakładamy, że klient, który wraca, składa w ciągu roku jedno dodatkowe zamówienie, więc utracony nowy klient to 1 + odsetek powrotów zamówień. To ostrożne założenie, bo część klientów wraca kilka razy. Puste pole oznacza tylko pierwsze zamówienie. Nie podajemy „typowego” odsetka, bo mocno zależy od branży: karmę dla psa kupuje się co miesiąc, sofę raz na lata.</li>
          <li><strong>Koszt i zwrot</strong> liczą się tak samo jak dla usług: porównujemy koszt SEO z utraconą marżą brutto.</li>
        </ul>
        <p style={s.akapit}>Przykład: sklep ma frazy kategorii i produktów wpisywane {SK.wyszukiwania.toLocaleString('pl-PL')} razy w miesiącu i dostaje dziś z Google {SK.ruch.toLocaleString('pl-PL')} wejść. Konwersja to {SK.konwersja.toLocaleString('pl-PL')}%, średnie zamówienie {zl(SK.wartosc)}, marża brutto {SK.marza}%, a {SK.powroty}% klientów kupuje ponownie. Właściciel nie wie, czy AI poleca sklep. Strata: {zl(sklep.min.zysk)}–{zl(sklep.max.zysk)} marży brutto miesięcznie przy {zl(sklep.min.przychod)}–{zl(sklep.max.przychod)} utraconej sprzedaży, czyli {dzies(sklep.min.zamowienia)}–{dzies(sklep.max.zamowienia)} zamówienia miesięcznie. Bez powracających klientów strata wyniosłaby {zl(sklepBezPowrotow.min.zysk)}–{zl(sklepBezPowrotow.max.zysk)}.</p>
        <p style={s.akapit}>Przy pakiecie SEO Standard (od {zl(st.pln)} netto miesięcznie) i pełnym efekcie po {sklepZwrot.miesiaceDoEfektu} miesiącach bilans miesięczny wynosi od {zZnakiem(sklepZwrot.min.bilans, zl)} do {zZnakiem(sklepZwrot.max.bilans, zl)}, a {miesiacZwrotuPl(sklepZwrot)}.{sklepZwrot.max.miesiacZwrotu !== null && sklepZwrot.min.miesiacZwrotu === null ? ' Wynik zależy więc od tego, który wariant kliknięć okaże się bliższy prawdy w Twojej branży, i kalkulator pokazuje to wprost.' : ''}</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="sklep" /></p>
      </Sekcja>

      <Sekcja id="czego-nie-liczy" tytul="Czego kalkulator nie policzy">
        <ul style={s.lista}>
          <li><strong>Tego, ile straty naprawdę odzyskasz.</strong> Część o koszcie zakłada odzyskanie całej wyliczonej straty po wybranej liczbie miesięcy. Dlatego obok miesiąca zwrotu pokazujemy próg: jaka część straty wystarczy, żeby koszt się zwrócił.</li>
          <li><strong>Czasu dojścia do TOP 3.</strong> Wynik straty zakłada pozycje, które zwykle buduje się miesiącami. Kwota roczna to strata przy obecnym stanie, a nie prognoza wzrostu. Czas do pełnego efektu w części o koszcie ustawiasz sam.</li>
          <li><strong>Sezonowości i siły konkurencji.</strong> Liczymy średni miesiąc. Przy sezonowym popycie albo bardzo silnej konkurencji realna kwota będzie inna.</li>
          <li><strong>Ruchu z innych źródeł.</strong> Nie liczymy wizyt z reklam, wizytówki w Mapach Google ani poleceń poza internetem.</li>
          <li><strong>Sprzedaży poza Twoim sklepem.</strong> W trybie sklepu nie liczymy Allegro, Amazona ani innych platform sprzedażowych, reklam produktowych Google ani bezpłatnych wyników w zakładce Zakupy. Liczymy pozycje w zwykłych wynikach Google i polecenia w AI.</li>
          <li><strong>Kosztów poza kwotą miesięczną.</strong> Kalkulator bierze cenę netto pakietu albo Twoją kwotę. Nie dolicza VAT ani Twojego czasu.</li>
          <li><strong>Dokładnej liczby wizyt z czatów AI.</strong> Nie ma publicznych danych o tym, ile wizyt daje jedno polecenie w ChatGPT. Dlatego część AI liczymy współczynnikiem z badań kliknięć w odpowiedziach AI ({AI_MIN}-{AI_MAX}%), a nie CTR pozycji w Google. To najmniej pewna część wyniku i dziś zwykle najmniejsza.</li>
        </ul>
      </Sekcja>

      <Sekcja id="jak-zmniejszyc-strate" tytul="Jak zmniejszyć stratę: od czego zacząć">
        <ol style={s.lista}>
          <li><strong>Sprawdź, co blokuje stronę.</strong> <L href="/narzedzia/audyt-seo">Darmowy audyt SEO</L> przejdzie do {AUDYT.stron} podstron w {AUDYT.regul} regułach i pokaże błędy, które przeszkadzają Google i botom AI.</li>
          <li><strong>Zamień „nie wiem” na odpowiedź.</strong> <L href="/sprawdz-widocznosc-w-ai">Sprawdzarka widoczności w AI</L> zada pytania klientów modelom AI i pokaże, czy wymieniają Twoją firmę. Wtedy wpiszesz w kalkulator „tak” albo „nie” zamiast „nie wiem”.</li>
          <li><strong>Zacznij od fraz z największym popytem.</strong> Porównaj swoje podstrony z TOP 3 dla tych fraz: treść, odpowiedzi na pytania klientów, opinie, szybkość. Jak to zrobić krok po kroku, opisujemy w <L href="/blog/analiza-konkurencji-seo-przewodnik">przewodniku po analizie konkurencji</L>.</li>
          <li><strong>Wpuść boty AI.</strong> <L href="/narzedzia/generator-llms-txt">Generator llms.txt</L> sprawdzi, czy {GENERATOR.botow} botów AI może wejść na stronę, i przygotuje plik llms.txt.</li>
          <li><strong>Policz jeszcze raz.</strong> Wpisz nowe liczby z Google Search Console po kilku miesiącach pracy i porównaj stratę z kosztem pakietu.</li>
        </ol>
      </Sekcja>

      <Poradniki narzedzie={SCIEZKA} />
      <PozostaleNarzedzia bez={SCIEZKA} />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

function faqEn() {
  const cennik = hrefWJezyku('/cennik-pozycjonowania', 'en') ?? '/en/seo-pricing';
  return [
    { id: 'why-a-range', question: 'Why a range instead of a single amount?', answer: 'CTR studies differ a lot: according to First Page Sage the first position in Google gets 39.8% of clicks, while according to a 2025 GrowthSRC study it gets 19%. We calculate both variants so we do not inflate the result or promise a single number.' },
    { id: 'where-does-the-ai-data-come-from', question: 'Where does the data on the impact of AI come from?', answer: `We take the impact of Google AI Overviews from a Pew Research Center study (March 2025): with an AI summary users clicked a result in 8% of visits, without one in 15%, and a summary appeared for 18% of searches. Few people go from an AI answer to a business website: a link inside the AI summary was clicked in 1% of visits (Pew), and fewer than about 3% of Google AI Mode searches end with a click to another website (Similarweb, 2025). That is why we calculate the AI loss with a ${AI_MIN}-${AI_MAX}% rate, not with Google ranking CTR. You set the share of questions asked to AI assistants yourself; the default ${ZALOZENIA.udzialAiDomyslny}% is a Gartner forecast.` },
    { id: 'is-the-result-a-profit-guarantee', question: 'Is the result a guarantee of profit after SEO?', answer: 'No. It is an estimate of potential at top 3 positions and presence in AI answers, calculated from your data. How much of it you can recover depends on competition, budget and the quality of your website.' },
    { id: 'where-to-find-search-volume', question: 'Where do I get the number of searches?', answer: 'From Google Ads Keyword Planner (free once you have an account) or from SEO tools. Add up the monthly searches of a few main keywords, for example “service + city”. You can check your Google traffic in Google Search Console.' },
    { id: 'is-this-an-seo-cost-calculator', question: 'Is this an SEO cost calculator?', answer: `It does not price the scope of work. First it shows how much profit you lose today without a top 3 position and AI recommendations, and in the “Will SEO pay off?” part it compares that amount with a package price or your own amount and shows the payback month. Our SEO packages start from PLN ${CENY.seoStandard.pln.toLocaleString('en-US')} (${cena('seoStandard', 'en')}) net a month, with details in our <a href="${cennik}">SEO pricing</a>.` },
    { id: 'when-will-seo-pay-off', question: 'When will SEO pay off?', answer: `It depends on how much profit you lose and how much you pay. The calculator assumes the recovered profit grows evenly over ${ZWROT.miesiaceDoEfektu.domyslnie} months (you can change this) and looks for the month in which total profit catches up with total cost, within ${ZWROT.horyzont} months. With low demand a package may never pay off; with high-value customers it pays back in a few months. We show both cases in the examples on this page.` },
    { id: 'i-do-not-know-my-conversion-rate', question: 'What should I enter if I do not know my conversion rate or margin?', answer: 'Your conversion rate is the month’s enquiries or orders divided by the visits to your site in the same month. Without data, enter a value lower than you expect: the result will be more cautious. A 100% margin shows revenue instead of profit.' },
    { id: 'where-does-my-data-go', question: 'Do the numbers I enter go anywhere?', answer: 'Your browser calculates the result and sends nothing until you ask for the summary by email. Then we store the numbers you entered (including the SEO cost, if you choose one), the result and your email address for 60 days so we can send the report.' },
    { id: 'why-is-the-ai-loss-smaller', question: 'Why is the AI loss smaller than the Google loss?', answer: 'Because people rarely click from AI answers: according to Pew, a link inside the AI summary is clicked in 1% of visits, and according to Conductor visits from AI assistants make up 1.08% of website traffic. A recommendation in ChatGPT or Gemini brings fewer visits today than a top 3 position in Google. For the same reason a higher share of questions asked in AI lowers the result: it moves demand from Google to a channel where few people click.' },
    { id: 'does-it-work-for-an-online-shop', question: 'Does the calculator work for an online shop?', answer: 'Yes. Choose “Online shop” above the form. You enter the number of searches for your category and product keywords, traffic from Google, your shop’s conversion rate, average order value, gross margin and, optionally, the share of customers who buy again. The model of visits from Google and AI is the same as for services, and the result shows lost gross profit, sales and the number of orders. SEO cost and the payback month work the same way.' },
    { id: 'what-margin-for-a-shop', question: 'What margin should I enter for a shop?', answer: 'Your gross margin: the selling price minus the cost of goods, as a percentage of the price. The calculator does not deduct shipping, payment fees, product returns or advertising costs, so if you want to include them, enter the margin after those costs. A 100% margin shows lost sales instead of margin.' },
    { id: 'returning-customers', question: 'How does the calculator count returning customers?', answer: `If you enter the share of customers who buy again, we assume one extra order within a year from each returning customer: at ${SK.powroty}%, one lost new customer equals ${(1 + SK.powroty / 100).toLocaleString('en-US')} orders. Many loyal customers buy more often, so this is a cautious assumption. Without this field we count the first order only. You will find the share in the customer report of your store admin: customers with at least two orders in a year divided by all customers.` },
    { id: 'typical-online-shop-conversion-rate', question: 'What conversion rate is typical for an online shop?', answer: 'According to Littledata, the median across 450 Shopify stores (GA4 data, August to November 2026) is 1.3%, the top 20% of stores are above 2.8% and the top 10% above 3.6%. In the calculator, enter your own conversion rate from GA4 or your store admin: orders divided by sessions.' },
  ];
}

function KalkulatorEn() {
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  const st = CENY.seoStandard;
  const pakiet = (k) => `PLN ${CENY[k].pln.toLocaleString('en-US')} (${cena(k, 'en')})`;
  return (
    <Uklad
      locale="en"
      slug="kalkulator-strat-seo"
      tag="Free calculator"
      schema={{
        name: 'Calculator: profit lost without SEO and AI visibility',
        description: 'A free calculator that estimates how much profit a business or an online shop loses each month without top 3 Google positions and without recommendations in AI answers, based on its data, Google CTR studies and studies of clicks from AI answers, and after how many months the cost of SEO pays back.',
        category: 'FinanceApplication',
        screenshot: schemaZrzutu(ZRZUT.en),
        featureList: ['Loss in Google and in AI answers', 'A range from studies of clicks in Google and in AI answers', 'Monthly and yearly result in PLN', 'SEO cost and payback month for a package from our pricing or your own amount', 'Online shop mode: average order value, gross margin and returning customers'],
      }}
      lead="Enter five numbers about your business or online shop and the calculator instantly shows the range of monthly profit you lose without a Google top 3 position and AI recommendations. Pick a package to also see whether and when SEO pays off."
      narzedzie={<KalkulatorClient />}
      odpowiedz="The calculator estimates how much profit goes to competitors each month when your business is not in Google’s top 3 or in ChatGPT and Gemini answers. It uses your data: the number of searches, current traffic, conversion rate, customer value and margin, plus open assumptions: Google CTR studies, the impact of AI Overviews and the share of visits from AI answers. The result is given as a range, and once you add the cost of SEO it shows the balance and the payback month. For online shops it has a separate mode that uses average order value, gross margin and, optionally, the share of customers who buy again."
      faq={faqEn()}
      tytulFaq="Questions about the loss calculator"
    >
      <CoDostajesz
        locale="en"
        odRazu={[
          'The range of lost profit: per month and per year',
          'The split between Google and AI answers, with the number of visits',
          'The number of customers you lose each month',
          'SEO cost and payback month for our packages or your own amount',
          'In shop mode: lost gross profit, sales and number of orders',
          'A link that recreates the result with the same numbers',
        ]}
        poEmailu={['A summary by email: the result, assumptions, sources and a short action plan']}
        przypis="Your browser calculates the result. You only enter an email address if you want the summary."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.en}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="SEO loss calculator: an example calculation of lost profit split into Google, AI and customers, with the cost and payback month of the SEO Standard package"
            podpis={`An example calculation for the renovation company from the example below: ${R.wyszukiwania.toLocaleString('en-US')} searches, ${R.ruch} visits from Google, ${R.konwersja}% conversion, a PLN ${R.wartosc.toLocaleString('en-US')} job, ${R.marza}% margin, the SEO Standard package and full effect after 12 months. The numbers are illustrative, not a real company's result. Screenshot from November 12, 2026 (prices as of that day).`}
          />
        </div>
      </CoDostajesz>

      <Sekcja id="how-we-calculate" tytul="How we calculate the loss">
        <ol style={s.lista}>
          <li><strong>Potential in Google:</strong> searches minus the share that goes to AI assistants, times the average CTR of positions 1-3: {ctrEn(ZALOZENIA.ctrTop3.ostrozny)}% in the cautious variant and {ctrEn(ZALOZENIA.ctrTop3.optymistyczny)}% in the optimistic one.</li>
          <li><strong>Google AI Overviews:</strong> for {proc(ZALOZENIA.aio.udzialWyszukiwan)}% of searches, clicks fall from {proc(ZALOZENIA.aio.ctrBez)}% to {proc(ZALOZENIA.aio.ctrZ)}% of visits, so we lower CTR proportionally.</li>
          <li><strong>Loss in Google</strong> is the potential minus your current Google traffic (never less than zero).</li>
          <li><strong>Loss in AI:</strong> the share of questions asked to AI assistants times the share of people who then visit the recommended business’s website: {AI_MIN}% in the cautious variant (Pew Research Center: a link inside the AI summary is clicked in 1% of visits) and {AI_MAX}% in the optimistic one (Similarweb: fewer than about 3% of Google AI Mode searches end with a click to another website). That is several times less than the CTR of positions 1-3 in Google. We count it only if the models do not recommend your business today.</li>
          <li><strong>“Not sure” answer:</strong> we count {proc(ZALOZENIA.ai.nieWiem.ostrozny)}% of the AI loss in the cautious variant and all of it in the optimistic one, because assistants recommend few businesses: according to SOCi (2026), ChatGPT recommends 1.2% of business locations, while Google shows 35.9% in the local pack.</li>
          <li><strong>Profit:</strong> lost visits times conversion rate, customer value and margin. The yearly figure is the monthly one times 12.</li>
        </ol>
        <p style={s.akapit}>For comparison: in June 2025 AI platforms sent 1.13 billion visits to the world’s 1,000 largest websites, while Google Search sent 191 billion (Similarweb). According to Conductor, visits from AI assistants make up 1.08% of website traffic. That is why the AI part is smaller than the Google loss today.</p>
        <p style={s.akapit}>Want to know what it costs to win that traffic back? Package prices are in the <Link href={cennik} style={s.podkreslenie}>SEO pricing</Link>, and you can check your AI visibility in the <Link href={hrefAudytuAi()} style={s.podkreslenie}>AI visibility audit</Link>.</p>
      </Sekcja>

      <Sekcja id="cost-and-payback" tytul="Will SEO pay off: cost and payback month">
        <p style={s.akapit}>Under the result you pick a package from our <Link href={cennik} style={s.podkreslenie}>SEO pricing</Link> or enter your own amount, for example another agency’s quote. The calculator works in Polish zloty, so we use the PLN prices (with the euro prices from our English pricing in brackets), net per month: SEO Standard from {pakiet('seoStandard')}, SEO Premium {pakiet('seoPremium')}, Booster Pack {pakiet('boosterPack')} ({CENY.boosterPack.umowaMiesiecy}-month minimum, new website included). For a “from” price we use the starting amount.</p>
        <ol style={s.lista}>
          <li><strong>Monthly balance:</strong> the recovered profit at full effect minus the package cost. We show it for both loss variants.</li>
          <li><strong>Build-up:</strong> rankings do not grow from day one, so we assume the recovered profit grows evenly over the number of months you choose (default {ZWROT.miesiaceDoEfektu.domyslnie}, from {ZWROT.miesiaceDoEfektu.min} to {ZWROT.miesiaceDoEfektu.max}) and then stays flat. The default of {ZWROT.miesiaceDoEfektu.domyslnie} months is our assumption, not a study result. According to Ahrefs (2025), 1.74% of newly published pages reach Google’s top 10 within a year and 72.9% of top 10 pages are more than 3 years old, so with a new domain set more.</li>
          <li><strong>Payback month:</strong> the first month in which total recovered profit catches up with total cost paid. We look for it within {ZWROT.horyzont} months.</li>
          <li><strong>Break-even share:</strong> how much of the calculated loss you need to recover for the profit to cover the cost. Above 100% the package at this price does not pay off even with full success.</li>
        </ol>
        <p style={s.akapit}>This is arithmetic on your numbers, not a promise of results. No honest agency can guarantee a top 3 position, which is why next to the payback month we show the break-even share and the first-year balance. What we do each month is described on our <L en href="/pozycjonowanie-stron-internetowych">SEO services</L> and <L en href="/pozycjonowanie-w-ai">AI search optimization</L> pages.</p>
      </Sekcja>

      <Sekcja id="example" tytul="Example: a service business">
        <p style={s.akapit}>A service business has keywords that customers type into Google {PRZYKLADY.usluga.wyszukiwania.toLocaleString('en-US')} times a month, and today it gets {PRZYKLADY.usluga.ruch} visits from Google. One in {coKtory} visitors becomes a customer (a {PRZYKLADY.usluga.konwersja}% conversion rate), a customer pays {pln(PRZYKLADY.usluga.wartosc)} on average and the margin is {PRZYKLADY.usluga.marza}%. The owner does not know whether ChatGPT recommends the business and leaves the default {PRZYKLADY.usluga.udzialAi}% of questions asked in AI. The calculator shows a loss of {pln(usluga.min.zysk)} to {pln(usluga.max.zysk)} in profit per month: {pln(usluga.min.zyskSeo)}–{pln(usluga.max.zyskSeo)} in Google and {pln(usluga.min.zyskAi)}–{pln(usluga.max.zyskAi)} in AI, or {dzies(usluga.min.klienci, true)}–{dzies(usluga.max.klienci, true)} customers a month. When AI models already recommend the business, the loss falls to {pln(uslugaTak.min.zysk)}–{pln(uslugaTak.max.zysk)}.</p>
        <p style={s.akapit}>With the SEO Standard package (from {pln(st.pln)} net a month) and full effect after {uslugaZwrot.miesiaceDoEfektu} months, the monthly balance is {zZnakiem(uslugaZwrot.min.bilans, pln)} to {zZnakiem(uslugaZwrot.max.bilans, pln)}, and {miesiacZwrotuEn(uslugaZwrot)}.{uslugaZwrot.max.miesiacZwrotu === null ? ' At this demand and customer value the package does not pay off, and the calculator says so instead of promising a return.' : ''}</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="usluga" /></p>
      </Sekcja>

      <Sekcja id="example-renovation" tytul="Example: a renovation company with high-value jobs">
        <p style={s.akapit}>A renovation company has keywords typed {PRZYKLADY.remont.wyszukiwania.toLocaleString('en-US')} times a month and gets {PRZYKLADY.remont.ruch} visits from Google today. {PRZYKLADY.remont.konwersja}% of visitors become customers, a job is worth {pln(PRZYKLADY.remont.wartosc)} on average, the margin is {PRZYKLADY.remont.marza}% and AI models do not recommend the business. The loss: {pln(remont.min.zysk)}–{pln(remont.max.zysk)} in profit per month, of which {pln(remont.min.zyskSeo)}–{pln(remont.max.zyskSeo)} in Google and {pln(remont.min.zyskAi)}–{pln(remont.max.zyskAi)} in AI, or {dzies(remont.min.klienci, true)}–{dzies(remont.max.klienci, true)} jobs a month.</p>
        <p style={s.akapit}>With the same SEO Standard package, the monthly balance at full effect is {zZnakiem(remontZwrot.min.bilans, pln)} to {zZnakiem(remontZwrot.max.bilans, pln)}, the balance of the first 12 months is {zZnakiem(remontZwrot.min.bilansRok, pln)} to {zZnakiem(remontZwrot.max.bilansRok, pln)}, and {miesiacZwrotuEn(remontZwrot)}. To cover the cost it is enough to recover {remontZwrot.max.prog}-{remontZwrot.min.prog}% of the calculated loss. What makes the difference between the examples is the customer value, not the number of searches.</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="remont" /></p>
      </Sekcja>

      <Sekcja id="online-shop" tytul="The calculator for an online shop">
        <p style={s.akapit}>Choose “Online shop” above the form. The model of visits from Google and from AI answers stays the same as for services; what changes is the data you enter and what the result shows.</p>
        <ul style={s.lista}>
          <li><strong>Average order value</strong> instead of customer value: sales revenue divided by the number of orders, from your store admin or GA4.</li>
          <li><strong>Gross margin:</strong> the selling price minus the cost of goods, as a percentage of the price. The result is lost gross profit, shown next to lost sales (revenue before margin). Want to include shipping, payment fees and product returns? Enter the margin after those costs.</li>
          <li><strong>Shop conversion rate:</strong> orders divided by sessions. For comparison: according to Littledata, the median across 450 Shopify stores (GA4 data, August to November 2026) is 1.3%, and the top 10% of stores are above 3.6%.</li>
          <li><strong>Returning customers (optional field):</strong> we assume a returning customer places one extra order within a year, so a lost new customer equals 1 + the repeat share in orders. This is a cautious assumption, because some customers come back several times. An empty field means the first order only. We do not give a “typical” share, because it depends heavily on the industry: people buy dog food every month and a sofa once in years.</li>
          <li><strong>Cost and payback</strong> work the same way as for services: we compare the cost of SEO with the lost gross profit.</li>
        </ul>
        <p style={s.akapit}>Example: a shop has category and product keywords typed {SK.wyszukiwania.toLocaleString('en-US')} times a month and gets {SK.ruch.toLocaleString('en-US')} visits from Google today. The conversion rate is {SK.konwersja}%, the average order {pln(SK.wartosc)}, the gross margin {SK.marza}%, and {SK.powroty}% of customers buy again. The owner does not know whether AI recommends the shop. The loss: {pln(sklep.min.zysk)}–{pln(sklep.max.zysk)} in gross profit per month on {pln(sklep.min.przychod)}–{pln(sklep.max.przychod)} in lost sales, or {dzies(sklep.min.zamowienia, true)}–{dzies(sklep.max.zamowienia, true)} orders a month. Without returning customers the loss would be {pln(sklepBezPowrotow.min.zysk)}–{pln(sklepBezPowrotow.max.zysk)}.</p>
        <p style={s.akapit}>With the SEO Standard package (from {pln(st.pln)} net a month) and full effect after {sklepZwrot.miesiaceDoEfektu} months, the monthly balance is {zZnakiem(sklepZwrot.min.bilans, pln)} to {zZnakiem(sklepZwrot.max.bilans, pln)}, and {miesiacZwrotuEn(sklepZwrot)}.{sklepZwrot.max.miesiacZwrotu !== null && sklepZwrot.min.miesiacZwrotu === null ? ' So the answer depends on which click variant turns out closer to reality in your industry, and the calculator shows this openly.' : ''}</p>
        <p style={s.akapit}><WstawPrzyklad przyklad="sklep" /></p>
      </Sekcja>

      <Sekcja id="what-it-does-not-calculate" tytul="What the calculator does not calculate">
        <ul style={s.lista}>
          <li><strong>How much of the loss you will actually recover.</strong> The cost part assumes you recover the whole calculated loss after the number of months you choose. That is why next to the payback month we show the break-even share: how much of the loss is enough for the cost to pay back.</li>
          <li><strong>The time it takes to reach the top 3.</strong> The loss assumes positions that usually take months to build. The yearly figure is the loss at your current position, not a growth forecast. In the cost part you set the time to full effect yourself.</li>
          <li><strong>Seasonality and the strength of competitors.</strong> We calculate an average month. With seasonal demand or very strong competitors the real figure will be different.</li>
          <li><strong>Traffic from other sources.</strong> We do not count visits from ads, your Google Maps listing or offline referrals.</li>
          <li><strong>Sales outside your shop.</strong> In shop mode we do not count Allegro, Amazon or other marketplaces, Google Shopping ads or free listings in the Shopping tab. We count positions in regular Google results and recommendations in AI.</li>
          <li><strong>Costs beyond the monthly amount.</strong> The calculator takes the net package price or your own amount. It does not add VAT or your own time.</li>
          <li><strong>The exact number of visits from AI chats.</strong> There is no public data on how many visits one ChatGPT recommendation brings. That is why we calculate the AI part with a rate from studies of clicks in AI answers ({AI_MIN}-{AI_MAX}%), not with Google ranking CTR. It is the least certain part of the result and today usually the smallest.</li>
        </ul>
      </Sekcja>

      <Sekcja id="how-to-reduce-the-loss" tytul="How to reduce the loss: where to start">
        <ol style={s.lista}>
          <li><strong>Find what holds your site back.</strong> The <L en href="/narzedzia/audyt-seo">free SEO audit</L> checks up to {AUDYT.stron} pages against {AUDYT.regul} rules and shows the errors that get in the way of Google and AI bots.</li>
          <li><strong>Replace “not sure” with an answer.</strong> The <L en href="/sprawdz-widocznosc-w-ai">AI visibility check</L> asks AI models your customers’ questions and shows whether they mention your business. Then you can answer “yes” or “no” in the calculator instead of “not sure”.</li>
          <li><strong>Start with the keywords with the most demand.</strong> Compare your pages with the top 3 for those keywords: content, answers to customer questions, reviews, speed. Our <L en href="/blog/analiza-konkurencji-seo-przewodnik">competitor analysis guide</L> shows how, step by step.</li>
          <li><strong>Let AI bots in.</strong> The <L en href="/narzedzia/generator-llms-txt">llms.txt generator</L> checks whether {GENERATOR.botow} AI bots can access your site and prepares an llms.txt file.</li>
          <li><strong>Calculate again.</strong> Enter new numbers from Google Search Console after a few months of work and compare the loss with the package cost.</li>
        </ol>
      </Sekcja>

      <Poradniki narzedzie={SCIEZKA} locale="en" />
      <PozostaleNarzedzia bez={SCIEZKA} locale="en" />
    </Uklad>
  );
}
