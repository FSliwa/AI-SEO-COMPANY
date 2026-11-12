// Strona aplikacji: Audyt SEO (/narzedzia/audyt-seo, /en/tools/free-seo-audit). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
//
// 12.11.2026 (S1-poprawki Z-A2…Z-A9, Z-01…Z-05, agent audyt): lead -> narzędzie -> „Krótka odpowiedź”,
// „Co dostajesz”, 49 reguł z H3 na kategorię, jak liczymy ocenę (tabela), jak podnieść ocenę, przykłady
// z testu 11.11, porównanie z Ahrefs Webmaster Tools i Search Console, ograniczenia, darmowy a pełny audyt,
// poradniki, inne narzędzia, FAQ 8. Liczby reguł i wag ze stałej AUDYT (lib/narzedziaLiczby.js), która
// odpowiada panel-fix/lib/narzedzia/audyt.ts (REGULY, wagi :443, MNOZNIK_KARY :245, PROG_UDZIALU :247,
// wydajność 0,7 × PSI :437) i psi.ts (2 przebiegi, mediana). Przykłady z testu: prace-2026-11-11/aplikacje/audyt/RAPORT.md §4.
// 12.11.2026 (domknięcie, agent audyt): PSI = 3 pomiary naraz i mediana tych, które zdążą w 30 s (psi.ts PSI_AUDYTU,
// pomiar: prace-2026-11-12/domkniecie/audyt/RAPORT.md), historia domeny przy wyniku i comiesięczny audyt e-mailem
// (osobna zgoda po odblokowaniu). FAQ 9: nowe pytanie o zmianę oceny i comiesięczny audyt.

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { AUDYT, cena } from '@/lib/narzedziaLiczby';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import AudytSeoClient from './AudytSeoClient';

const R = AUDYT.reguly;
const W = AUDYT.wagi;

/** „21 reguł”, „22 reguły”, „1 reguła”. */
function regul(n) {
  const d = n % 10;
  const st = n % 100;
  if (n === 1) return '1 reguła';
  return `${n} ${d >= 2 && d <= 4 && (st < 12 || st > 14) ? 'reguły' : 'reguł'}`;
}

const ZRODLA_POROWNANIA = {
  awt: 'https://ahrefs.com/webmaster-tools',
  checker: 'https://ahrefs.com/website-checker',
  gscWeryfikacja: 'https://support.google.com/webmasters/answer/9008080',
  gsc: 'https://search.google.com/search-console/about',
};

const zewn = { ...s.podkreslenie };

// Z-07: zrzut przykładowego wyniku z trybu demonstracyjnego narzędzia (12.11.2026, bez ręcznych poprawek,
// widać część dostępną od razu, bez bramki e-mail). Domena example.com, ocena i problemy to dane demo,
// a podpis mówi to wprost. Po wdrożeniu panelu można podmienić na prawdziwy przebieg dla ai-seo-company.pl
// (zmiany.md Z-07): nowy plik, wymiary i podpis z datą przebiegu.
const ZRZUT = {
  pl: { src: '/images/narzedzia/przyklady/darmowy-audyt-seo-przykladowy-wynik.webp', width: 1200, height: 1480 },
  en: { src: '/images/narzedzia/przyklady/free-seo-audit-example-result.webp', width: 1200, height: 1439 },
};
const schemaZrzutu = (z) => ({ url: z.src, width: z.width, height: z.height });

// --- Audyt SEO --------------------------------------------------------------------------------

const FAQ_AUDYTU = [
  { id: 'audyt-seo-za-darmo', question: 'Czy darmowy audyt SEO jest naprawdę bezpłatny?', answer: 'Tak. Ocenę, kategorie i trzy najważniejsze problemy widzisz od razu, bez rejestracji. Pełną listę problemów z adresami podstron pokazujemy po podaniu e-maila, na który wysyłamy też raport. Zapis na newsletter jest osobny i dobrowolny.' },
  { id: 'jak-liczona-ocena', question: 'Jak liczycie ocenę SEO od 1 do 100?', answer: `Każda z ${AUDYT.regul} reguł odejmuje punkty od swojej kategorii, gdy nie jest spełniona. Ocena to ${W.techniczne}% kategorii technicznej, ${W.tresc}% treści, ${W.wydajnosc}% wydajności (w tym wynik PageSpeed Insights na telefonie) i ${W.ai}% gotowości na AI; szczegóły są w sekcji „Jak liczymy ocenę 1-100”.` },
  { id: 'audyt-a-pelny-audyt', question: 'Czym różni się darmowy audyt od płatnego audytu SEO?', answer: `Darmowy audyt sprawdza automatycznie do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach. Płatny audyt SEO (od ${cena('audytSeo')} netto, 3-5 dni roboczych) obejmuje całą stronę, frazy, konkurencję, profil linków i dane z Search Console, a jego wynikiem jest plan zmian z priorytetami i wyceną.` },
  { id: 'czy-audyt-obciaza-strone', question: 'Czy audyt obciąża moją stronę?', answer: `Nie. Pobieramy do ${AUDYT.stron} podstron, po kilka naraz, z przedstawiającym się robotem AISEOCompanyAudit. To mniej niż jedna wizyta wyszukiwarki. Nie wysyłamy formularzy i nie logujemy się.` },
  { id: 'czy-moge-sprawdzic-konkurencje', question: 'Czy mogę sprawdzić stronę konkurencji?', answer: `Tak. Audyt działa dla każdej publicznej strony i nie wymaga potwierdzania, że jesteś jej właścicielem. Porównanie z 2-3 firmami z Twojej branży pokazuje, czy problem dotyczy tylko Ciebie. Limit to ${AUDYT.limitIp} audytów dziennie z jednego adresu IP.` },
  { id: 'inny-wynik-niz-w-innych-narzedziach', question: 'Dlaczego wynik różni się od innych narzędzi SEO?', answer: `Każde narzędzie ma własny zestaw reguł i wag. Sprawdzamy do ${AUDYT.stron} podstron naraz, a nie tylko stronę główną, i dokładamy reguły gotowości na AI. Wynik PageSpeed to mediana trzech pomiarów laboratoryjnych, ale i tak może się różnić od wyniku z innego dnia albo innego narzędzia. Porównuj listę problemów, a nie samą liczbę.` },
  { id: 'jak-czesto-sprawdzac', question: 'Jak często sprawdzać stronę?', answer: 'Po każdej większej zmianie: nowym szablonie, migracji, wtyczce albo partii nowych podstron, a poza tym raz w miesiącu. Comiesięczny audyt możesz włączyć po odblokowaniu pełnego wyniku, wtedy wyślemy go sami.' },
  { id: 'zmiana-od-poprzedniego-audytu', question: 'Czy zobaczę, czy ocena się poprawiła?', answer: 'Tak. Jeśli tę domenę ktoś już sprawdzał, np. Ty przed poprawkami albo Twój programista, przy wyniku pokazujemy zmianę oceny i każdej kategorii, np. „+6 od audytu z 3.11”. Porównujemy same liczby: ocenę, kategorie i datę poprzedniego audytu, bez danych osoby, która go uruchomiła, i tylko audyty liczone tymi samymi regułami (od 12 listopada 2026). Po odblokowaniu wyniku możesz też zaznaczyć comiesięczny audyt: raz w miesiącu wyślemy ocenę ze zmianą oraz listę nowych i naprawionych problemów. Ruszy po potwierdzeniu adresu linkiem z maila (bez kliknięcia nic nie wyślemy), a wyłączysz go jednym kliknięciem w każdym mailu.' },
  { id: 'co-z-wynikiem-audytu', question: 'Co dzieje się z adresem i wynikiem audytu?', answer: 'Zapisujemy adres strony i wynik, żeby pokazać pełną listę po podaniu e-maila i wysłać raport. Usuwamy je po 60 dniach. Liczby z wyniku (ocena i kategorie) służą też do pokazania zmiany przy kolejnym audycie tej domeny. Jeśli włączysz comiesięczny audyt, adres e-mail i domenę przechowujemy do czasu, aż go wyłączysz. Zapis na newsletter jest osobny i dobrowolny. Szczegóły są w <a href="/cookies">polityce prywatności</a>.' },
];

export function AudytSeoStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AudytSeoEn />;
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  const autorytet = hrefJesliOpublikowana('/narzedzia/autorytet-domeny');
  return (
    <Uklad
      slug="audyt-seo"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Darmowy audyt SEO strony',
        description: `Bezpłatny audyt SEO: sprawdza do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach, w tym robots.txt, mapę strony, szybkość w PageSpeed Insights i gotowość na AI, i wystawia ocenę 1-100 z listą błędów i instrukcją naprawy.`,
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.pl),
        featureList: [`Do ${AUDYT.stron} podstron w jednym audycie`, `${AUDYT.regul} reguł w ${AUDYT.kategorii} kategoriach`, `Wynik PageSpeed Insights na telefonie (mediana ${AUDYT.przebiegiPsi} pomiarów)`, 'Dostęp botów AI w robots.txt i plik llms.txt', 'Ocena 1-100 i lista błędów z instrukcją naprawy'],
      }}
      lead={`Sprawdzimy do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach i od razu, bez rejestracji, pokażemy ocenę, cztery kategorie i trzy najważniejsze błędy.`}
      narzedzie={<AudytSeoClient />}
      odpowiedz={`Darmowy audyt SEO sprawdza do ${AUDYT.stron} podstron Twojej strony, po kilka z każdej sekcji i wersji językowej, w ${AUDYT.regul} regułach: kody odpowiedzi, przekierowania, tytuły, opisy, nagłówki, treść, obrazy, dane strukturalne, robots.txt, mapę strony, szybkość na telefonie i dostęp botów AI. Wynik to ocena od 1 do 100 w czterech kategoriach i lista problemów z instrukcją naprawy.`}
      faq={FAQ_AUDYTU}
      tytulFaq="Pytania o darmowy audyt SEO"
    >
      <CoDostajesz
        id="co-dostajesz"
        tytul="Co dostajesz w darmowym audycie"
        tytulOdRazu="Od razu, bez rejestracji"
        odRazu={[
          'Ocenę od 1 do 100.',
          'Wynik każdej z czterech kategorii z liczbą błędów, ostrzeżeń i uwag.',
          'Cztery wyniki PageSpeed Insights na telefonie: wydajność, SEO, dostępność i dobre praktyki.',
          'Trzy najważniejsze problemy z opisem, instrukcją naprawy i przykładowymi adresami podstron.',
          'Link do wyniku, który otwiera audyt z wpisanym adresem (np. dla programisty).',
          'Zmianę oceny i kategorii od poprzedniego audytu tej domeny, np. „+6 od audytu z 3.11”, jeśli ktoś już ją sprawdzał.',
        ]}
        poEmailu={[
          `Wszystkie znalezione problemy z adresami podstron (do ${AUDYT.stron} przy każdym problemie).`,
          'Filtr kategorii: technika, treść, wydajność, gotowość na AI.',
          'Raport na skrzynkę, który możesz przekazać programiście.',
          'Jeśli chcesz: comiesięczny audyt tej domeny e-mailem, ze zmianą oceny oraz nowymi i naprawionymi problemami (osobna zgoda i potwierdzenie linkiem z maila, wyłączasz jednym kliknięciem).',
        ]}
      >
        <p style={{ ...s.akapit, marginTop: '1rem' }}><strong>Co z tym zrobić:</strong> zacznij od błędów, potem popraw ostrzeżenia. Uwagi naprawiaj przy okazji innych zmian. Po poprawkach uruchom audyt jeszcze raz i porównaj ocenę.</p>
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.pl}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Darmowy audyt SEO: przykładowy wynik dla example.com z oceną od 1 do 100, czterema kategoriami i najważniejszymi problemami"
            podpis="Przykładowy wynik na danych demonstracyjnych: domena example.com, ocena i problemy są przykładowe, to nie wynik prawdziwej strony. Widać to, co dostajesz od razu; pełną listę problemów pokazujemy po podaniu e-maila. Zrzut z 12.11.2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="co-sprawdza-audyt" tytul={`Co sprawdza darmowy audyt SEO: ${AUDYT.regul} reguł w ${AUDYT.kategorii} kategoriach`}>
        <p style={s.akapit}>Każda reguła ma próg zapisany w kodzie, np. tytuł dłuższy niż 60 znaków, odpowiedź serwera wolniejsza niż 1,5 sekundy albo strona główna cięższa niż 3 MB. Przy każdym problemie dostajesz opis skutku, instrukcję naprawy i adresy podstron, których dotyczy.</p>
        <h3 style={s.h3}>Technika ({regul(R.techniczne)}, {W.techniczne}% oceny)</h3>
        <p style={s.akapit}>HTTPS i przekierowania, wersje z www i bez, błędy 4xx i 5xx, łańcuchy przekierowań, adresy kanoniczne, noindex (także na stronie głównej i w całych sekcjach, np. w wersji /en/), atrybut lang, meta viewport, zasoby ładowane przez http:// na stronie https://, zepsute linki wewnętrzne i niedziałające linki zewnętrzne (kod 404 albo 410), soft 404 (czy nieistniejący adres zwraca kod 404), hreflang na stronie głównej i podstronach przy kilku wersjach językowych (z linkami zwrotnymi), robots.txt, mapa strony i adresy w mapie, które nie powinny tam być (z noindex, przekierowaniem, błędem albo adresem kanonicznym wskazującym inną stronę).</p>
        <h3 style={s.h3}>Treść ({regul(R.tresc)}, {W.tresc}% oceny)</h3>
        <p style={s.akapit}>Tytuły i opisy meta (brak, długość, duplikaty), nagłówki H1 (brak albo kilka), ilość tekstu w HTML (poniżej 250 słów to ostrzeżenie), teksty alternatywne obrazów i znaczniki Open Graph, czyli podgląd strony w mediach społecznościowych.</p>
        <h3 style={s.h3}>Wydajność ({regul(R.wydajnosc)}, {W.wydajnosc}% oceny)</h3>
        <p style={s.akapit}>Wynik Lighthouse na telefonie z Google PageSpeed Insights (mediana trzech niezależnych pomiarów, bo pojedynczy potrafi różnić się o 10 punktów), LCP i CLS (z danych prawdziwych użytkowników, jeśli strona je ma), waga strony głównej z listą największych plików, obrazy do optymalizacji (format, wymiary, kompresja), obrazy bez width i height, czas odpowiedzi serwera i rozmiar HTML.</p>
        <h3 style={s.h3}>Gotowość na AI ({regul(R.ai)}, {W.ai}% oceny)</h3>
        <p style={s.akapit}>Czy tekst jest w HTML bez uruchamiania JavaScriptu (boty AI go nie uruchamiają), czy robots.txt wpuszcza GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot i Google-Extended, dane strukturalne firmy (Organization albo LocalBusiness) i poprawność JSON-LD, plik llms.txt i to, czy ma linki do podstron{llms ? <> (plik wygenerujesz w <Link href={llms} style={s.podkreslenie}>generatorze llms.txt</Link>)</> : null}.</p>
      </Sekcja>

      <Sekcja id="jak-liczymy-ocene" tytul="Jak liczymy ocenę 1-100">
        <p style={s.akapit}>Każda z {AUDYT.regul} reguł ma wagę w punktach. Niespełniona reguła odejmuje od swojej kategorii trzykrotność tej wagi, a kary się sumują. Przy regułach dotyczących podstron już jedna podstrona z problemem kosztuje 40% kary, a reszta rośnie z odsetkiem podstron. Reguły całej witryny, np. soft 404 albo waga strony głównej, odejmują pełną karę. Ocena końcowa to średnia ważona czterech kategorii.</p>
        <p style={s.akapit}>Przykład: noindex na stronie głównej (15 punktów wagi) odejmuje od kategorii technicznej 45 punktów, czyli około 16 punktów oceny końcowej. Brak opisu meta na 1 z 20 podstron kosztuje kategorię treści niecałe 4 punkty.</p>
        <CompareTable
          id="tabela-oceny"
          caption="Kategorie darmowego audytu SEO i ich waga w ocenie"
          columns={[
            { key: 'kategoria', label: 'Kategoria' },
            { key: 'regul', label: 'Reguł' },
            { key: 'waga', label: 'Waga w ocenie' },
            { key: 'najciezsze', label: 'Reguły o największej wadze' },
          ]}
          rows={[
            { id: 't', kategoria: 'Technika', regul: R.techniczne, waga: `${W.techniczne}%`, najciezsze: 'robots.txt blokuje całą stronę, noindex na stronie głównej, błędy 4xx i 5xx, brak HTTPS' },
            { id: 'c', kategoria: 'Treść', regul: R.tresc, waga: `${W.tresc}%`, najciezsze: 'brak tytułu strony, brak nagłówka H1' },
            { id: 'w', kategoria: 'Wydajność', regul: R.wydajnosc, waga: `${W.wydajnosc}%, z czego 70% to wynik PageSpeed na telefonie (mediana ${AUDYT.przebiegiPsi} pomiarów)`, najciezsze: 'PageSpeed poniżej 50, strona główna cięższa niż 5 MB' },
            { id: 'a', kategoria: 'Gotowość na AI', regul: R.ai, waga: `${W.ai}%`, najciezsze: 'treść widoczna dopiero po uruchomieniu JavaScriptu, robots.txt blokuje boty AI' },
          ]}
          przypis="Gdy PageSpeed Insights nie odpowie, wydajność nie wchodzi do oceny, a wagi pozostałych kategorii przeliczamy proporcjonalnie. Wynik oznaczamy wtedy jako „Wydajność: brak pomiaru”."
        />
      </Sekcja>

      <Sekcja id="jak-czytac-ocene" tytul="Jak czytać ocenę">
        <p style={s.akapit}>Ocena 80 i więcej oznacza, że podstawy są w porządku i warto skupić się na treści i linkach. Od 50 do 79 są problemy, które realnie ograniczają widoczność: zacznij od błędów, potem ostrzeżeń. Poniżej 50 strona ma braki techniczne, przez które Google może jej nie indeksować albo pokazywać gorzej niż konkurencję.</p>
        <p style={s.akapit}>Ocenę najlepiej porównać z konkurencją. Audyt działa dla każdej publicznej strony, więc sprawdź też 2-3 firmy, które są wyżej w Google: liczy się różnica w błędach, a nie sama liczba.{autorytet ? <> Siłę linków tych domen porównasz w <Link href={autorytet} style={s.podkreslenie}>sprawdzarce autorytetu domeny</Link>.</> : null}</p>
        <p style={s.akapit}>Ocena nie jest pozycją w Google. Pokazuje, jak dużo przeszkód stoi stronie na drodze. O pozycji decydują też treść, linki i konkurencja, które sprawdzamy w <Link href={audyt} style={s.podkreslenie}>pełnym audycie SEO</Link>.</p>
      </Sekcja>

      <Sekcja id="jak-podniesc-ocene" tytul="Jak podnieść ocenę SEO: od czego zacząć">
        <p style={s.akapit}>Kolejność kroków odpowiada wagom reguł: najpierw to, co odejmuje najwięcej punktów.</p>
        <ol style={s.lista}>
          <li><strong>Najpierw to, co blokuje indeksowanie.</strong> robots.txt z Disallow: / dla wszystkich botów, noindex na stronie głównej, brak HTTPS i podstrony z błędem 4xx albo 5xx mają w ocenie największą wagę. Napraw je przed czymkolwiek innym.</li>
          <li><strong>Tekst w HTML, nie tylko w JavaScripcie.</strong> Jeśli audyt pokazuje „Treść niewidoczna bez JavaScriptu”, włącz renderowanie po stronie serwera albo prerendering. Boty AI zwykle nie uruchamiają JavaScriptu, więc bez tego nie mają czego zacytować.</li>
          <li><strong>Tytuły, opisy i nagłówki.</strong> Każda ważna podstrona potrzebuje własnego tytułu do ok. 60 znaków, opisu meta o długości 120-160 znaków i jednego nagłówka H1.</li>
          <li><strong>Waga i obrazy strony głównej.</strong> Zacznij od największych plików z listy w wyniku: obrazy zapisz w WebP albo AVIF w wymiarach, w jakich się wyświetlają, i dodaj im width i height. Film w tle zastąp plakatem albo lżejszą wersją.</li>
          <li><strong>Dostęp botów AI i dane firmy.</strong> Wpuść w robots.txt boty wyszukiwania AI (OAI-SearchBot, PerplexityBot, ChatGPT-User), dodaj na stronie głównej dane strukturalne Organization albo LocalBusiness i plik llms.txt z linkami do podstron.</li>
          <li><strong>Sprawdź ponownie.</strong> Uruchom audyt po poprawkach. Pojedynczy pomiar PageSpeed potrafi się mocno różnić: 11 listopada 2026 jedenaście pomiarów naszej strony dało od 59 do 81 punktów. Mediana dwóch pomiarów mieściła się w tym samym teście między 69 a 76, dlatego mierzymy trzy razy naraz i bierzemy medianę. Przy kolejnym audycie tej samej domeny wynik pokazuje zmianę od poprzedniego. Mimo to oceniaj przede wszystkim zmianę listy błędów, a nie samą liczbę.</li>
        </ol>
      </Sekcja>

      <Sekcja id="co-znajduje-audyt" tytul="Co audyt znalazł na prawdziwych stronach">
        <p style={s.akapit}>11 listopada 2026 sprawdziliśmy audytem 6 polskich stron firmowych, a każde znalezisko potwierdziliśmy ręcznie. Kilka przykładów (bez nazw firm, poza naszą):</p>
        <ul style={s.lista}>
          <li><strong>Firma usługowa z wersją angielską:</strong> noindex na wszystkich 12 sprawdzonych adresach /en/, czyli cała wersja językowa poza Google. Strona główna była w porządku, więc audyt jednego adresu tego nie pokaże.</li>
          <li><strong>Firma meblowa na WordPressie:</strong> 2 adresy w mapie strony z błędem 404 (dodane przez wtyczkę motywu) i strona główna ważąca 15,9 MB, z czego 13,9 MB to film w tle.</li>
          <li><strong>Firma z branży druku 3D:</strong> 2 linki do artykułów w Wikipedii, których już nie ma (kod 404). Ręcznie trudno je wyłapać, a psują wiarygodność treści.</li>
          <li><strong>Firma hydrauliczna:</strong> 24 podstrony, na które serwer odpowiadał dłużej niż 1,5 sekundy.</li>
          <li><strong>Nasza strona ai-seo-company.pl:</strong> ocena 94; PageSpeed na telefonie 76 (mediana pomiarów 79 i 72), a cała kategoria wydajności 72.</li>
        </ul>
        <p style={s.akapit}>W tym samym teście popularny darmowy checker SEO, który analizuje jeden adres, nie wykrył żadnego z trzech pierwszych problemów. Właśnie dlatego sprawdzamy do {AUDYT.stron} podstron, po kilka z każdej sekcji i wersji językowej.</p>
      </Sekcja>

      <Sekcja id="bez-konta" tytul="Darmowy audyt bez konta: porównanie z Ahrefs Webmaster Tools i Search Console">
        <p style={s.akapit}>Dwa popularne darmowe narzędzia do sprawdzania strony wymagają konta i potwierdzenia, że strona jest Twoja. Nasz audyt daje wynik na tej stronie, bez konta, także dla strony konkurenta.</p>
        <CompareTable
          id="tabela-bez-konta"
          caption="Darmowy audyt SEO, Ahrefs Webmaster Tools i Google Search Console"
          columns={[
            { key: 'cecha', label: 'Cecha' },
            { key: 'my', label: 'Nasz darmowy audyt' },
            { key: 'awt', label: 'Ahrefs Webmaster Tools' },
            { key: 'gsc', label: 'Google Search Console' },
          ]}
          rows={[
            { id: 'konto', cecha: 'Konto', my: 'niepotrzebne', awt: 'darmowe konto Ahrefs', gsc: 'konto Google' },
            { id: 'wlasnosc', cecha: 'Potwierdzenie, że strona jest Twoja', my: 'nie', awt: 'tak, przed audytem', gsc: 'tak' },
            { id: 'konkurent', cecha: 'Strona konkurenta', my: 'tak, każda publiczna strona', awt: 'nie, cudze domeny tylko w płatnych planach', gsc: 'nie' },
            { id: 'kiedy', cecha: 'Kiedy jest wynik', my: 'na tej stronie, zwykle po 20-90 sekundach', awt: 'w aplikacji, po założeniu projektu i skanowaniu', gsc: 'dane zbierają się kilka dni od dodania strony' },
            { id: 'zakres', cecha: 'Zakres', my: `do ${AUDYT.stron} podstron, ${AUDYT.regul} reguł`, awt: '5 000 kredytów skanowania miesięcznie na projekt (1 kredyt = 1 strona HTML z kodem 200)', gsc: 'strony, które zna Google' },
            { id: 'ai', cecha: 'Gotowość na AI: boty AI w robots.txt, llms.txt, treść bez JavaScriptu', my: `tak, ${regul(R.ai)}`, awt: 'strona narzędzia o tym nie wspomina', gsc: 'nie, raporty dotyczą robotów Google' },
            { id: 'dane', cecha: 'Prawdziwe dane Google: kliknięcia, wyświetlenia, indeksowanie', my: 'nie', awt: 'nie, własne szacunki ruchu i fraz', gsc: 'tak' },
          ]}
          przypis={<>Źródła: Ahrefs, strony <a href={ZRODLA_POROWNANIA.awt} style={zewn} rel="noopener" target="_blank">Ahrefs Webmaster Tools</a> i <a href={ZRODLA_POROWNANIA.checker} style={zewn} rel="noopener" target="_blank">Website Checker</a> (limity i FAQ), odczyt 11.11.2026; Google, <a href={ZRODLA_POROWNANIA.gscWeryfikacja} style={zewn} rel="noopener" target="_blank">Pomoc Search Console: weryfikacja własności</a> i <a href={ZRODLA_POROWNANIA.gsc} style={zewn} rel="noopener" target="_blank">opis Search Console</a>, odczyt 12.11.2026.</>}
        />
        <p style={s.akapit}>Te narzędzia się uzupełniają. Search Console to jedyne źródło prawdziwych danych Google o Twojej stronie i warto je mieć zawsze. Ahrefs Webmaster Tools przeskanuje więcej podstron, jeśli potwierdzisz własność. Nasz audyt uruchomisz w minutę, bez konta, także dla strony konkurenta, i z regułami gotowości na AI.</p>
      </Sekcja>

      <Sekcja id="ograniczenia-audytu" tytul="Czego darmowy audyt nie sprawdza">
        <ul style={s.lista}>
          <li>Sprawdzamy próbkę do {AUDYT.stron} podstron: stronę główną, linki z niej i adresy z mapy strony (do {AUDYT.mapPodrzednych} map podrzędnych). Wybieramy po kilka adresów z każdej wersji językowej i sekcji, np. /blog/ i /uslugi/, ale w dużym serwisie większość podstron zostaje poza audytem.</li>
          <li>Szybkość mierzymy w PageSpeed Insights na telefonie, tylko dla strony głównej: trzy pomiary laboratoryjne naraz i mediana tych, które skończą się w ciągu 30 sekund. W naszym teście z 12.11.2026 co najmniej dwa pomiary zdążyły w 36 z 37 prób. Gdy zdąży tylko jeden, wynik pochodzi z jednego pomiaru i to widać przy wyniku. Dane prawdziwych użytkowników (LCP, CLS) pokazujemy tylko wtedy, gdy Google je ma.</li>
          <li>Czytamy HTML tak, jak wysyła go serwer, bez uruchamiania JavaScriptu, czyli tak jak większość botów AI. Treść dokładana skryptami może być w audycie niewidoczna, i to też jest wynik.</li>
          <li>Powtórzone tytuły i opisy wykrywamy tylko wśród sprawdzonych podstron, a reguły treści liczymy tylko na stronach bez noindex.</li>
          <li>Linki zewnętrzne sprawdzamy tylko pod kątem kodów 404 i 410, do 30 adresów i najwyżej 3 z jednej domeny. Pomijamy serwisy społecznościowe, które blokują roboty.</li>
          <li>Nie sprawdzamy linków prowadzących do strony, fraz, pozycji w Google ani danych z Search Console. To zakres płatnego audytu SEO.</li>
        </ul>
      </Sekcja>

      <Sekcja id="darmowy-a-pelny-audyt" tytul="Darmowy audyt a pełny audyt SEO">
        <CompareTable
          id="tabela-darmowy-pelny"
          caption="Darmowy audyt a płatny audyt SEO"
          columns={[
            { key: 'co', label: '' },
            { key: 'darmowy', label: 'Darmowy audyt' },
            { key: 'pelny', label: `Audyt SEO (od ${cena('audytSeo')} netto)` },
          ]}
          rows={[
            { id: 'zakres', co: 'Zakres', darmowy: `do ${AUDYT.stron} podstron`, pelny: 'cała strona' },
            { id: 'co', co: 'Co sprawdza', darmowy: `${AUDYT.regul} reguł automatycznych: technika, treść, wydajność, gotowość na AI`, pelny: 'to samo plus frazy, konkurencja, profil linków i dane z Search Console' },
            { id: 'czas', co: 'Czas', darmowy: 'zwykle 20 do 90 sekund', pelny: '3 do 5 dni roboczych' },
            { id: 'wynik', co: 'Wynik', darmowy: 'ocena 1-100 i lista problemów z instrukcją naprawy', pelny: 'każdy błąd z priorytetem i instrukcją dla programisty, plan zmian i wycena' },
            { id: 'konto', co: 'Konto', darmowy: 'niepotrzebne; e-mail tylko po pełną listę', pelny: '–' },
          ]}
        />
        <p style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <Link href={audyt} className="btn btn-secondary" data-cta="audyt_darmowy_pelny">Zobacz zakres audytu SEO</Link>
        </p>
      </Sekcja>

      <Poradniki narzedzie="/narzedzia/audyt-seo" />
      <PozostaleNarzedzia bez="/narzedzia/audyt-seo" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_AUDYTU_EN = [
  { id: 'is-the-free-seo-audit-really-free', question: 'Is the free SEO audit really free?', answer: 'Yes. You see the score, the categories and the three most important problems right away, with no sign-up. We show the full list of problems with page URLs after you give an email address, which we also send the report to. Signing up for the newsletter is separate and voluntary.' },
  { id: 'how-is-the-score-calculated', question: 'How do you calculate the SEO score from 1 to 100?', answer: `Each of the ${AUDYT.regul} rules subtracts points from its category when it fails. The score is ${W.techniczne}% technical, ${W.tresc}% content, ${W.wydajnosc}% performance (including the mobile PageSpeed Insights score) and ${W.ai}% AI readiness; details are in “How we calculate the 1-100 score”.` },
  { id: 'free-audit-vs-paid-audit', question: 'How does the free audit differ from a paid SEO audit?', answer: `The free audit automatically checks up to ${AUDYT.stron} pages against ${AUDYT.regul} rules. A paid SEO audit (from ${cena('audytSeo', 'en')} net, 3 to 5 business days) covers the whole website, keywords, competitors, the link profile and Search Console data, and its result is a plan of changes with priorities and a quote.` },
  { id: 'does-the-audit-load-my-website', question: 'Does the audit put a load on my website?', answer: `No. We fetch up to ${AUDYT.stron} pages, a few at a time, with a self-identifying robot called AISEOCompanyAudit. That is less than a single visit from a search engine. We do not submit forms and we do not log in.` },
  { id: 'can-i-check-a-competitor', question: 'Can I check a competitor’s website?', answer: `Yes. The audit works for any public website and does not ask you to prove that you own it. Comparing yourself with 2-3 businesses in your industry shows whether a problem affects only you. The limit is ${AUDYT.limitIp} audits per day from one IP address.` },
  { id: 'why-does-the-score-differ', question: 'Why does the score differ from other SEO tools?', answer: `Every tool has its own set of rules and weights. We check up to ${AUDYT.stron} pages at once, not just the home page, and add AI readiness rules. The PageSpeed score is the median of three lab runs, but it can still differ from a result taken on another day or in another tool. Compare the list of problems, not the number alone.` },
  { id: 'how-often-to-check', question: 'How often should I check my website?', answer: 'After every major change: a new theme, a migration, a plugin or a batch of new pages, and otherwise once a month. You can turn on a monthly audit after you unlock the full result, and we will send it for you.' },
  { id: 'change-since-the-last-audit', question: 'Will I see whether my score has improved?', answer: 'Yes. If someone has already checked this domain, for example you before the fixes or your developer, the result shows the change in the score and in each category, e.g. “+6 since the audit on 3 Nov”. We compare numbers only: the score, the categories and the date of the previous audit, with no data about the person who ran it, and only audits scored with the same rules (from 12 November 2026). After you unlock the result, you can also tick the monthly audit: once a month we will email you the score with the change and a list of new and fixed issues. It starts only after you confirm your address with the link in an email (without the click we send nothing), and you can turn it off with one click in any email.' },
  { id: 'what-happens-to-the-audit-data', question: 'What happens to the address and the audit result?', answer: 'We store the website address and the result so we can show the full list after you enter your email and send the report. We delete them after 60 days. The numbers from the result (the score and the categories) are also used to show the change at the next audit of this domain. If you turn on the monthly audit, we keep your email address and the domain until you turn it off. Newsletter signup is separate and voluntary. Details are in the <a href="/en/cookies">privacy policy</a>.' },
];

/** „21 rules”, „1 rule”. */
const rules = (n) => `${n} ${n === 1 ? 'rule' : 'rules'}`;

function AudytSeoEn() {
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  const autorytet = hrefJesliOpublikowana('/narzedzia/autorytet-domeny');
  return (
    <Uklad
      locale="en"
      slug="audyt-seo"
      tag="Free tool"
      schema={{
        name: 'Free website SEO audit',
        description: `A free SEO audit: it checks up to ${AUDYT.stron} pages against ${AUDYT.regul} rules, including robots.txt, the sitemap, speed in PageSpeed Insights and AI readiness, and gives a 1-100 score with a list of errors and fix instructions.`,
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.en),
        featureList: [`Up to ${AUDYT.stron} pages per audit`, `${AUDYT.regul} rules in ${AUDYT.kategorii} categories`, `Mobile PageSpeed Insights score (median of ${AUDYT.przebiegiPsi} runs)`, 'AI bot access in robots.txt and the llms.txt file', 'A 1-100 score and a list of errors with fix instructions'],
      }}
      lead={`We check up to ${AUDYT.stron} pages against ${AUDYT.regul} rules and show your score, four category scores and the top three issues right away, with no sign-up.`}
      narzedzie={<AudytSeoClient />}
      odpowiedz={`The free SEO audit checks up to ${AUDYT.stron} pages of your website, spread across its sections and language versions, against ${AUDYT.regul} rules: response codes, redirects, titles, descriptions, headings, content, images, structured data, robots.txt, the sitemap, mobile speed and AI bot access. The result is a score from 1 to 100 across four categories and a list of problems with fix instructions.`}
      faq={FAQ_AUDYTU_EN}
      tytulFaq="Questions about the free SEO audit"
    >
      <CoDostajesz
        locale="en"
        id="what-you-get"
        tytul="What you get in the free audit"
        tytulOdRazu="Right away, with no sign-up"
        odRazu={[
          'A score from 1 to 100.',
          'A score for each of the four categories with the number of errors, warnings and notices.',
          'Four mobile PageSpeed Insights scores: performance, SEO, accessibility and best practices.',
          'The three most important issues with a description, fix instructions and sample page URLs.',
          'A link to the result that opens the audit with your address filled in (e.g. for your developer).',
          'The change in the score and categories since the previous audit of this domain, e.g. “+6 since the audit on 3 Nov”, if someone has checked it before.',
        ]}
        poEmailu={[
          `Every issue we found with the affected page URLs (up to ${AUDYT.stron} per issue).`,
          'A category filter: technical, content, performance, AI readiness.',
          'A report in your inbox that you can hand to a developer.',
          'If you want it: a monthly audit of this domain by email, with the change in the score and the new and fixed issues (separate consent and a confirmation link in an email, one click to turn it off).',
        ]}
      >
        <p style={{ ...s.akapit, marginTop: '1rem' }}><strong>What to do with it:</strong> start with the errors, then fix the warnings. Deal with the notices alongside other changes. Once you have made the fixes, run the audit again and compare the score.</p>
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.en}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Free SEO audit: an example result for example.com with the score from 1 to 100, four categories and top issues"
            podpis="An example result using demo data: the example.com domain, the score and the issues are illustrative, not a real website's result. It shows what you get right away; the full list of issues appears after you enter your email. Screenshot from November 12, 2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="what-the-audit-checks" tytul={`What the free SEO audit checks: ${AUDYT.regul} rules in ${AUDYT.kategorii} categories`}>
        <p style={s.akapit}>Every rule has a threshold set in the code, e.g. a title longer than 60 characters, a server response slower than 1.5 seconds or a home page heavier than 3 MB. For each issue you get a description of its effect, fix instructions and the URLs of the pages it affects.</p>
        <h3 style={s.h3}>Technical ({rules(R.techniczne)}, {W.techniczne}% of the score)</h3>
        <p style={s.akapit}>HTTPS and redirects, www and non-www versions, 4xx and 5xx errors, redirect chains, canonical URLs, noindex (including on the home page and across whole sections, e.g. a /en/ version), the lang attribute, the meta viewport tag, resources loaded over http:// on an https:// page, broken internal links and dead external links (404 or 410), soft 404 (whether a non-existent address returns 404), hreflang on the home page and on subpages of multilingual sites (including return links), robots.txt, the sitemap and URLs in the sitemap that should not be there (with noindex, a redirect, an error or a canonical pointing to another page).</p>
        <h3 style={s.h3}>Content ({rules(R.tresc)}, {W.tresc}% of the score)</h3>
        <p style={s.akapit}>Titles and meta descriptions (missing, length, duplicates), H1 headings (missing or more than one), the amount of text in the HTML (below 250 words is a warning), image alt text and Open Graph tags, which control how the page looks when shared on social media.</p>
        <h3 style={s.h3}>Performance ({rules(R.wydajnosc)}, {W.wydajnosc}% of the score)</h3>
        <p style={s.akapit}>The mobile Lighthouse score from Google PageSpeed Insights (the median of three independent runs, because a single run can vary by 10 points), LCP and CLS (from real-user data, if the site has it), home page weight with a list of the largest files, images to optimise (format, size, compression), images without width and height, server response time and HTML size.</p>
        <h3 style={s.h3}>AI readiness ({rules(R.ai)}, {W.ai}% of the score)</h3>
        <p style={s.akapit}>Whether the text is in the HTML without running JavaScript (AI bots do not run it), whether robots.txt lets in GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended, your company structured data (Organization or LocalBusiness) and valid JSON-LD, and an llms.txt file with links to your pages{llms ? <> (you can create one in the <Link href={llms} style={s.podkreslenie}>llms.txt generator</Link>)</> : null}.</p>
      </Sekcja>

      <Sekcja id="how-we-calculate-the-score" tytul="How we calculate the 1-100 score">
        <p style={s.akapit}>Each of the {AUDYT.regul} rules has a weight in points. A failed rule subtracts three times that weight from its category, and penalties add up. For page-level rules a single affected page already costs 40% of the penalty, and the rest grows with the share of pages. Site-wide rules, such as soft 404 or home page weight, subtract the full penalty. The final score is a weighted average of the four categories.</p>
        <p style={s.akapit}>Example: noindex on the home page (a weight of 15 points) subtracts 45 points from the technical category, which is about 16 points of the final score. A missing meta description on 1 of 20 pages costs the content category just under 4 points.</p>
        <CompareTable
          id="score-table"
          caption="Free SEO audit categories and their weight in the score"
          columns={[
            { key: 'kategoria', label: 'Category' },
            { key: 'regul', label: 'Rules' },
            { key: 'waga', label: 'Weight in the score' },
            { key: 'najciezsze', label: 'Heaviest rules' },
          ]}
          rows={[
            { id: 't', kategoria: 'Technical', regul: R.techniczne, waga: `${W.techniczne}%`, najciezsze: 'robots.txt blocks the whole site, noindex on the home page, 4xx and 5xx errors, no HTTPS' },
            { id: 'c', kategoria: 'Content', regul: R.tresc, waga: `${W.tresc}%`, najciezsze: 'missing page title, missing H1 heading' },
            { id: 'w', kategoria: 'Performance', regul: R.wydajnosc, waga: `${W.wydajnosc}%, of which 70% is the mobile PageSpeed score (median of ${AUDYT.przebiegiPsi} runs)`, najciezsze: 'PageSpeed below 50, home page heavier than 5 MB' },
            { id: 'a', kategoria: 'AI readiness', regul: R.ai, waga: `${W.ai}%`, najciezsze: 'content visible only after JavaScript runs, robots.txt blocks AI bots' },
          ]}
          przypis="If PageSpeed Insights does not respond, performance is left out of the score and the weights of the other categories are scaled proportionally. The result then shows “Performance: not measured”."
        />
      </Sekcja>

      <Sekcja id="how-to-read-the-score" tytul="How to read the score">
        <p style={s.akapit}>A score of 80 or more means the basics are fine and it is worth focusing on content and links. From 50 to 79 there are problems that genuinely limit visibility: start with errors, then warnings. Below 50 the site has technical gaps that may stop Google from indexing it or make it show worse than your competitors.</p>
        <p style={s.akapit}>The score is most useful next to your competitors. The audit works for any public website, so also check 2-3 businesses that rank above you: what matters is the difference in errors, not the number alone.{autorytet ? <> You can compare the link strength of those domains in the <Link href={autorytet} style={s.podkreslenie}>domain authority checker</Link>.</> : null}</p>
        <p style={s.akapit}>The score is not a Google ranking. It shows how many obstacles stand in your site’s way. Rankings also depend on content, links and competitors, which we check in a <Link href={audyt} style={s.podkreslenie}>full SEO audit</Link>.</p>
      </Sekcja>

      <Sekcja id="how-to-improve-the-score" tytul="How to improve your SEO score: where to start">
        <p style={s.akapit}>The order of the steps follows the rule weights: first the things that cost the most points.</p>
        <ol style={s.lista}>
          <li><strong>Start with what blocks indexing.</strong> A robots.txt with Disallow: / for all bots, noindex on the home page, no HTTPS and pages with 4xx or 5xx errors carry the most weight in the score. Fix them before anything else.</li>
          <li><strong>Text in the HTML, not only in JavaScript.</strong> If the audit shows “Content not visible without JavaScript”, turn on server-side rendering or prerendering. AI bots usually do not run JavaScript, so without it they have nothing to quote.</li>
          <li><strong>Titles, descriptions and headings.</strong> Every important page needs its own title of up to about 60 characters, a meta description of 120-160 characters and a single H1 heading.</li>
          <li><strong>Home page weight and images.</strong> Start with the largest files listed in the result: save images as WebP or AVIF at the size they are displayed, and give them width and height. Replace a background video with a poster image or a lighter version.</li>
          <li><strong>AI bot access and company data.</strong> Let AI search bots (OAI-SearchBot, PerplexityBot, ChatGPT-User) in through robots.txt, add Organization or LocalBusiness structured data to the home page and an llms.txt file with links to your pages.</li>
          <li><strong>Check again.</strong> Run the audit after the fixes. A single PageSpeed measurement can vary a lot: on 11 November 2026 eleven runs on our own website gave between 59 and 81 points. In the same test the median of two runs stayed between 69 and 76, so we measure three times at once and take the median. At the next audit of the same domain, the result shows the change since the previous one. Even so, judge mainly the change in the list of errors, not the number alone.</li>
        </ol>
      </Sekcja>

      <Sekcja id="what-the-audit-finds" tytul="What the audit found on real websites">
        <p style={s.akapit}>On 11 November 2026 we ran the audit on 6 Polish business websites and checked every finding by hand. A few examples (without company names, except our own):</p>
        <ul style={s.lista}>
          <li><strong>A service business with an English version:</strong> noindex on all 12 checked /en/ URLs, so the whole language version was out of Google. The home page was fine, so a single-URL audit would not show it.</li>
          <li><strong>A furniture maker on WordPress:</strong> 2 URLs in the sitemap returning 404 (added by a theme plugin) and a home page weighing 15.9 MB, of which 13.9 MB was a background video.</li>
          <li><strong>A 3D printing business:</strong> 2 links to Wikipedia articles that no longer exist (404). They are hard to spot by hand and they undermine trust in the content.</li>
          <li><strong>A plumbing business:</strong> 24 pages where the server took longer than 1.5 seconds to respond.</li>
          <li><strong>Our own website ai-seo-company.pl:</strong> a score of 94; mobile PageSpeed 76 (the median of runs scoring 79 and 72) and 72 for the whole performance category.</li>
        </ul>
        <p style={s.akapit}>In the same test, a popular free SEO checker that analyses a single URL found none of the first three problems. That is exactly why we check up to {AUDYT.stron} pages, a few from every section and language version.</p>
      </Sekcja>

      <Sekcja id="no-account" tytul="A free SEO audit with no account: compared with Ahrefs Webmaster Tools and Search Console">
        <p style={s.akapit}>Two popular free tools for checking a website require an account and proof that the website is yours. Our audit gives you the result on this page, with no account, including for a competitor’s website.</p>
        <CompareTable
          id="no-account-table"
          caption="Free SEO audit, Ahrefs Webmaster Tools and Google Search Console"
          columns={[
            { key: 'cecha', label: 'Feature' },
            { key: 'my', label: 'Our free audit' },
            { key: 'awt', label: 'Ahrefs Webmaster Tools' },
            { key: 'gsc', label: 'Google Search Console' },
          ]}
          rows={[
            { id: 'konto', cecha: 'Account', my: 'not needed', awt: 'a free Ahrefs account', gsc: 'a Google account' },
            { id: 'wlasnosc', cecha: 'Proof that the website is yours', my: 'no', awt: 'yes, before the audit', gsc: 'yes' },
            { id: 'konkurent', cecha: 'A competitor’s website', my: 'yes, any public website', awt: 'no, other domains only on paid plans', gsc: 'no' },
            { id: 'kiedy', cecha: 'When you get the result', my: 'on this page, usually after 20-90 seconds', awt: 'in the app, after you set up a project and it is crawled', gsc: 'data builds up over a few days after you add the site' },
            { id: 'zakres', cecha: 'Scope', my: `up to ${AUDYT.stron} pages, ${AUDYT.regul} rules`, awt: '5,000 crawl credits a month per project (1 credit = 1 HTML page with code 200)', gsc: 'the pages Google knows' },
            { id: 'ai', cecha: 'AI readiness: AI bots in robots.txt, llms.txt, content without JavaScript', my: `yes, ${rules(R.ai)}`, awt: 'not mentioned on the tool’s page', gsc: 'no, the reports cover Google’s crawlers' },
            { id: 'dane', cecha: 'Real Google data: clicks, impressions, indexing', my: 'no', awt: 'no, its own traffic and keyword estimates', gsc: 'yes' },
          ]}
          przypis={<>Sources: Ahrefs, the <a href={ZRODLA_POROWNANIA.awt} style={zewn} rel="noopener" target="_blank">Ahrefs Webmaster Tools</a> and <a href={ZRODLA_POROWNANIA.checker} style={zewn} rel="noopener" target="_blank">Website Checker</a> pages (limits and FAQ), read on 11 Nov 2026; Google, <a href={`${ZRODLA_POROWNANIA.gscWeryfikacja}?hl=en`} style={zewn} rel="noopener" target="_blank">Search Console Help: verify your site ownership</a> and <a href={ZRODLA_POROWNANIA.gsc} style={zewn} rel="noopener" target="_blank">Search Console overview</a>, read on 12 Nov 2026.</>}
        />
        <p style={s.akapit}>These tools complement each other. Search Console is the only source of real Google data about your website and is always worth having. Ahrefs Webmaster Tools will crawl more pages once you verify ownership. Our audit runs in a minute, with no account, also for a competitor’s website, and includes AI readiness rules.</p>
      </Sekcja>

      <Sekcja id="audit-limits" tytul="What the free audit does not check">
        <ul style={s.lista}>
          <li>We check a sample of up to {AUDYT.stron} pages: the home page, the links on it and URLs from the sitemap (up to {AUDYT.mapPodrzednych} child sitemaps). We pick a few URLs from every language version and section, e.g. /blog/ and /services/, but on a large website most pages stay outside the audit.</li>
          <li>We measure speed in PageSpeed Insights on mobile, for the home page only: three lab runs at once and the median of those that finish within 30 seconds. In our test on 12 Nov 2026 at least two runs finished in 36 of 37 attempts. If only one finishes, the result comes from a single run and the result says so. Real-user data (LCP, CLS) appears only if Google has it.</li>
          <li>We read the HTML as the server sends it, without running JavaScript, the way most AI bots do. Content added by scripts may be invisible in the audit, and that is a finding in itself.</li>
          <li>We detect duplicate titles and descriptions only among the pages we checked, and we apply content rules only to pages without noindex.</li>
          <li>We check external links only for 404 and 410 codes, up to 30 URLs and no more than 3 per domain. We skip social networks, which block crawlers.</li>
          <li>We do not check links pointing to your site, keywords, Google rankings or Search Console data. That is the scope of a paid SEO audit.</li>
        </ul>
      </Sekcja>

      <Sekcja id="free-vs-full-audit" tytul="Free audit vs a full SEO audit">
        <CompareTable
          id="free-vs-full-table"
          caption="The free audit compared with a paid SEO audit"
          columns={[
            { key: 'co', label: '' },
            { key: 'darmowy', label: 'Free audit' },
            { key: 'pelny', label: `SEO audit (from ${cena('audytSeo', 'en')} net)` },
          ]}
          rows={[
            { id: 'zakres', co: 'Scope', darmowy: `up to ${AUDYT.stron} pages`, pelny: 'the whole website' },
            { id: 'co', co: 'What it checks', darmowy: `${AUDYT.regul} automated rules: technical, content, performance, AI readiness`, pelny: 'the same plus keywords, competitors, the link profile and Search Console data' },
            { id: 'czas', co: 'Time', darmowy: 'usually 20 to 90 seconds', pelny: '3 to 5 business days' },
            { id: 'wynik', co: 'Result', darmowy: 'a 1-100 score and a list of problems with fix instructions', pelny: 'every error with a priority and instructions for a developer, a plan of changes and a quote' },
            { id: 'konto', co: 'Account', darmowy: 'not needed; email only for the full list', pelny: '–' },
          ]}
        />
        <p style={{ marginTop: '1.25rem', textAlign: 'center' }}>
          <Link href={audyt} className="btn btn-secondary" data-cta="audyt_darmowy_pelny">See what the SEO audit covers</Link>
        </p>
      </Sekcja>

      <Poradniki narzedzie="/narzedzia/audyt-seo" locale="en" />
      <PozostaleNarzedzia bez="/narzedzia/audyt-seo" locale="en" />
    </Uklad>
  );
}
