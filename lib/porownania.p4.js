// P4: agencja SEO czy freelancer (airSlate, 18.11.2026; klaster „freelancer seo” PL 880).
// Ten sam kształt co P1-P6 w lib/porownania.js. Integrator importuje P4 do tablicy `porownania`
// (patrz REJESTR.md w ai-seo-prace/airslate/nowa-freelancer). Bez nazw agencji i freelancerów (art. 16 UZNK):
// stawki pochodzą z opublikowanych zestawień, a nasze liczby z pakietów w cenniku (components/Pricing.jsx).
// Linki do stron z rejestru publikacji idą przez hrefJesliOpublikowana; zdanie bez linku znika w całości.

import { hrefJesliOpublikowana } from './publikacja';
import { PANEL_DEMO_URL } from './panel';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;

/** Zdanie z linkiem do strony z rejestru publikacji albo '' (strona jeszcze nie zwraca 200). */
function zdanieJesli(href, zdanie) {
  const h = hrefJesliOpublikowana(href);
  return h ? zdanie(h) : '';
}

// --- Model kosztów i godzin (JEDNO źródło liczb; tekst i tabela liczą się stąd) -------------------
// Założenia: kwoty netto; stawki godzinowe to trzy scenariusze z przedziału 150-400 zł netto za
// godzinę specjalisty z cennika NapoleonCat (11.09.2026), a nie stawka konkretnego freelancera;
// pakiety i zakres: components/Pricing.jsx i FAQ w components/PricingClient.jsx (1 900 / 2 500 zł).
export const MODEL_P4 = {
  stawki: [150, 250, 400],
  pakiety: [
    { nazwa: 'SEO Standard', cena: 1900, frazy: 20, tresci: 2, linki: 2 },
    { nazwa: 'SEO Premium', cena: 2500, frazy: 50, tresci: 4, linki: 4 },
  ],
};

const fmt = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const godz = (n) => String(Math.round(n * 10) / 10).replace('.', ',');
const wierszeGodzin = MODEL_P4.pakiety.map((p) => ({
  id: `godziny-${p.cena}`,
  budzet: `${fmt(p.cena)} zł netto (${p.nazwa})`,
  s150: `${godz(p.cena / 150)} h`,
  s250: `${godz(p.cena / 250)} h`,
  s400: `${godz(p.cena / 400)} h`,
  fraza: `${Math.round(p.cena / p.frazy)} zł netto za frazę (do ${p.frazy} fraz, ${p.tresci} treści i ${p.linki} linki w miesiącu)`,
}));

export const P4 = {
  slug: 'agencja-seo-czy-freelancer',
  title: 'Freelancer SEO czy agencja: koszty, ryzyka i umowa',
  description: 'Freelancer SEO czy agencja SEO: koszt miesięczny, godziny pracy, zastępstwo, konta Google i umowa. Tabela ze źródłami.',
  h1: 'Freelancer SEO czy agencja SEO: koszty, ryzyka i umowa',
  okruszek: 'Agencja SEO czy freelancer',
  nazwaKarty: 'Agencja SEO czy freelancer',
  teaser: 'Ile godzin kupujesz za miesięczny budżet, kto Cię zastąpi w czasie urlopu i co zapisać w umowie, żeby konta Google zostały Twoje.',
  kryteria: '8 kryteriów',
  decyzja: { pytanie: 'Freelancer SEO czy agencja?', skrot: 'Koszt, godziny, zastępstwo, konta i umowa' },
  tag: 'Porównanie wykonawców SEO',
  ujawnienie: 'Piszemy jako agencja SEO, więc podajemy też, kiedy freelancer jest lepszym wyborem. Nie oceniamy konkretnych osób ani firm.',
  zrodlaDanych: 'Dane: zestawienie cen i modeli współpracy NapoleonCat (11.09.2026), ZUS (składki płatnika 20,48% na UoP), Useme (zlecenia 2025), Ahrefs (439 dostawców, 08.2024), nasz cennik. Stan na 20.11.2026.',
  // 52 słowa.
  answer: 'Freelancer SEO bywa tańszy i daje bezpośredni kontakt z osobą, która pracuje nad stroną. Agencja daje szerszy zespół i stały raport, a zastępstwo na czas urlopu zależy od umowy. Przy wąskim zakresie i małym budżecie często wystarczy freelancer, przy treściach, linkach i SEO technicznym naraz wygrywa zespół. Niezależnie od wyboru konta Google zostaw na swojej firmie.',
  published: '2026-11-18',
  updated: '2026-11-20',
  tableId: 'tabela-agencja-freelancer',
  tableCaption: 'Freelancer SEO, agencja SEO i specjalista in-house: porównanie na 8 kryteriach',
  tablePrzypis: 'Źródła: zestawienie „Agencja, freelancer czy etat” w artykule NapoleonCat z 11.09.2026 (kwoty netto, małe i średnie firmy), stawki składek ZUS po stronie pracodawcy (zus.pl, 20,48% na UoP bez PPK), poradnik Google Search Central, nasz cennik pozycjonowania (20.11.2026). Opis wykonawców ma charakter ogólny: konkretna oferta może się różnić, dlatego ostatni wiersz to pytania do zadania każdemu.',
  columns: [
    { key: 'kryterium', label: 'Kryterium' },
    { key: 'freelancer', label: 'Freelancer SEO' },
    { key: 'agencja', label: 'Agencja SEO' },
    { key: 'inhouse', label: 'Specjalista in-house (etat)' },
  ],
  rows: [
    { id: 'koszt', kryterium: 'Koszt miesięczny (netto)', freelancer: '1 000-8 000 zł według NapoleonCat; zwykle niższy przy tym samym zakresie', agencja: '800-15 000 zł według NapoleonCat. U nas od 1 900 zł (SEO Standard) i 2 500 zł (SEO Premium)', inhouse: 'Pensja brutto × ok. 1,2048 (ZUS pracodawcy na UoP) + licencje narzędzi SEO oraz budżet na treści i linki' },
    { id: 'kto', kryterium: 'Kto pracuje nad stroną', freelancer: 'Ta sama osoba, z którą rozmawiasz', agencja: 'Zależy od agencji: ustal, kto konkretnie pracuje nad Twoją stroną', inhouse: 'Zatrudniony pracownik w Twoim zespole (160 h w miesiącu na wyłączność)' },
    { id: 'zastepstwo', kryterium: 'Urlop, choroba, zniknięcie wykonawcy', freelancer: 'Praca staje, chyba że umowa przewiduje zastępcę', agencja: 'Zależy od umowy: zapytaj, kto i na jakich zasadach przejmuje pracę', inhouse: 'Urlop, L4 lub odejście jedynego specjalisty wstrzymuje prace do czasu rekrutacji następcy' },
    { id: 'kompetencje', kryterium: 'Zakres kompetencji', freelancer: 'Wąskie, ale głębokie: jedna nisza albo jedna umiejętność', agencja: 'Szerokie: technika, treści, linki, SEO lokalne i widoczność w AI w jednym zespole', inhouse: 'Głęboka znajomość produktu, ale jedna osoba rzadko łączy kod, copywriting i PR naraz' },
    { id: 'skala', kryterium: 'Skala projektu', freelancer: 'Mała i średnia strona; bardzo duży serwis przekracza możliwości jednej osoby', agencja: 'Szerszy zespół i podział zadań (technika, treści, linki); zakres ustalamy przy wycenie', inhouse: 'Duży e-commerce, marketplace, SaaS lub grupa domen wymagających codziennej pracy w produkcie' },
    { id: 'raport', kryterium: 'Raportowanie', freelancer: 'Zależy od osoby: poproś o wzór raportu przed umową', agencja: 'U nas panel klienta z danymi z Twojej Search Console i raport co miesiąc', inhouse: 'Bieżące raportowanie wewnątrz zespołu; płatne crawlery i monitoring opłaca pracodawca' },
    { id: 'umowa', kryterium: 'Umowa i wyjście', freelancer: 'Zwykle elastyczna; ustal wypowiedzenie i przekazanie dostępów na piśmie', agencja: 'Różnie; u nas umowa miesięczna (Booster Pack: minimum 3 miesiące), dostęp do Search Console i Analytics zostaje po Twojej stronie', inhouse: 'Umowa o pracę (1-3 mies. wypowiedzenia) lub kontrakt B2B; konta od początku są wewnątrz firmy' },
    { id: 'pytania', kryterium: 'Pytania do zadania każdemu', freelancer: 'Kto Cię zastąpi? Czy konta będą na mojej firmie? Czy pokażesz raport i referencje?', agencja: 'Te same pytania; dobra agencja odpowie na każde na piśmie', inhouse: 'Czy mamy pracę SEO na 160 h co miesiąc oraz osobny budżet na narzędzia, treści i linki?' },
  ],
  sections: [
    {
      id: 'tabela-porownania',
      h2: 'Freelancer SEO czy agencja: 8 kryteriów w jednej tabeli',
      html: '<p>Wybór nie sprowadza się do ceny. Poniżej zestawiamy freelancera, agencję oraz punkt odniesienia w postaci własnego specjalisty in-house (na etacie), a obok podajemy, co deklarujemy my. Kwoty w tabeli są netto, a przedziały pochodzą z publicznego zestawienia, nie z naszych ofert.</p>',
      tabela: 'glowna',
      h3: [
        {
          id: 'kiedy-etat-inhouse',
          h3: 'Kiedy rozważyć specjalistę SEO in-house (na etacie)',
          html: [
            '<p>Zatrudnienie własnego specjalisty SEO opłaca się głównie w większych zespołach produktowych, dużych sklepach internetowych i grupach kilku portali, gdzie zmiany w szablonach, filtrach oraz architekturze informacji wchodzą w każdym sprincie i wypełniają pełne 160 godzin w miesiącu. W małej i średniej firmie sam koszt pracodawcy (pensja brutto powiększona o 20,48% składek ZUS na umowie o pracę, bez PPK) oraz licencje narzędzi SEO (crawler, baza linków, monitoring pozycji) pochłaniają wielokrotność abonamentu agencji jeszcze przed wydaniem złotówki na zewnętrzne publikacje i copywriting.</p>',
            zdanieJesli('/porownania/seo-w-firmie-czy-agencja-seo', (h) => `<p>Szczegółową symulację pełnego kosztu pracodawcy i pakietu narzędzi znajdziesz w osobnym porównaniu: ${a(h, 'specjalista SEO w firmie (in-house) czy agencja SEO')}.</p>`),
          ].join(''),
        },
      ],
    },
    {
      id: 'ile-godzin',
      h2: 'Ile godzin pracy kupujesz za miesięczny budżet',
      html: [
        '<p>Freelancer często rozlicza się godzinowo, agencja zakresem. Żeby je porównać, przeliczyliśmy nasze dwa pakiety na godziny według trzech stawek za godzinę pracy specjalisty SEO: 150, 250 i 400 zł netto. 150 i 400 zł netto to granice przedziału z cennika NapoleonCat (stawka godzinowa specjalisty, 150-400 zł), a 250 zł to wartość pośrednia, którą przyjęliśmy jako scenariusz. To nie stawka konkretnego freelancera, więc potraktuj te liczby jako scenariusze, nie jako ofertę. Stawka 400 zł/h to scenariusz górny: freelancerzy zwykle liczą mniej, więc w ich przypadku mieści się więcej godzin.</p>',
      ].join(''),
      tabela: {
        id: 'tabela-godziny',
        caption: 'Ile godzin pracy specjalisty mieści się w budżecie na poziomie naszych pakietów (kwoty netto)',
        columns: [
          { key: 'budzet', label: 'Budżet miesięczny' },
          { key: 's150', label: 'Przy 150 zł/h' },
          { key: 's250', label: 'Przy 250 zł/h' },
          { key: 's400', label: 'Przy 400 zł/h' },
          { key: 'fraza', label: 'Nasz zakres i cena za frazę' },
        ],
        rows: wierszeGodzin,
        przypis: 'Obliczenie własne: budżet podzielony przez stawkę godzinową. Stawki 150-400 zł netto za godzinę specjalisty: NapoleonCat, 11.09.2026 (cennik w artykule). Pakiety, liczba fraz, treści i linków: nasz cennik pozycjonowania, 18.11.2026. Cena za frazę = cena pakietu podzielona przez maksymalną liczbę fraz.',
        minWidth: 620,
      },
      htmlPo: [
        '<p>Założenia modelu: kwoty netto, jeden miesiąc, całość budżetu idzie na pracę przy stronie, bez osobnych kosztów narzędzi. My nie sprzedajemy godzin, tylko zakres: do 20 fraz, 2 treści i 2 linki miesięcznie w SEO Standard oraz do 50 fraz, 4 treści i 4 linki w SEO Premium, z audytem technicznym, SEO lokalnym i raportem w cenie. Nie podajemy więc, ile godzin zespół poświęca na Twoją stronę.</p>',
        '<p>Jak z tego korzystać: poproś freelancera o rozpisanie takiego samego zakresu na godziny (audyt, teksty, linki, raport). Jeśli 2 treści, 2 linki i miesięczny raport nie mieszczą się w godzinach z jego oferty, różnica w cenie jest pozorna. Jeśli się mieszczą, a stawka jest niższa, freelancer wychodzi taniej i to jest uczciwa odpowiedź.</p>',
      ].join(''),
    },
    {
      id: 'stawki-ze-zrodel',
      h2: 'Co mówią opublikowane stawki freelancerów i agencji',
      html: '<p>Polskich zestawień stawek stricte freelancerów SEO jest niewiele, więc obok danych krajowych podajemy jedno zestawienie globalne. Rynek i waluta są różne, dlatego liczb z różnych źródeł nie sumujemy ani nie przeliczamy.</p>',
      tabela: {
        id: 'tabela-stawki-zrodla',
        caption: 'Opublikowane stawki SEO: freelancerzy i agencje (stan na 18.11.2026)',
        columns: [
          { key: 'zrodlo', label: 'Źródło i zakres' },
          { key: 'freelancer', label: 'Freelancer' },
          { key: 'agencja', label: 'Agencja' },
        ],
        rows: [
          { id: 'napoleoncat', zrodlo: 'NapoleonCat, Polska, 11.09.2026: miesięcznie, netto', freelancer: '1 000-8 000 zł', agencja: '800-15 000 zł' },
          { id: 'useme', zrodlo: 'Useme, Polska, zlecenia rozliczone w 2025: średnia wartość zlecenia SEO', freelancer: '2 050 zł za zlecenie', agencja: 'brak danych' },
          { id: 'ahrefs-mies', zrodlo: 'Ahrefs, świat, 439 dostawców, aktualizacja 15.08.2024: średni abonament miesięczny', freelancer: '1 349 USD', agencja: '3 209 USD' },
          { id: 'ahrefs-godz', zrodlo: 'Ahrefs, świat, jak wyżej: średnia stawka za godzinę', freelancer: '71,59 USD', agencja: '98,90 USD' },
        ],
        przypis: 'Źródła: NapoleonCat (artykuł z 11.09.2026), Useme (blog, dane z rozliczeń 2025), Ahrefs (SEO pricing, aktualizacja 15.08.2024), odczyt 18.11.2026. Ahrefs podaje średnie z ankiety, a przy abonamentach zakłada górną granicę przedziału, który wybrał respondent. Useme nie podaje wartości dla agencji.',
        minWidth: 480,
      },
      htmlPo: [
        '<p>Wspólny wniosek: freelancer jest tańszy, ale różnica zależy od rynku. W danych Ahrefs średnia stawka godzinowa freelancera stanowi około 72% stawki agencji, a średni abonament około 42%. Przedziały z NapoleonCat nakładają się szeroko, więc tani zespół i drogi freelancer są jak najbardziej możliwi.</p>',
        '<p>Kwotę netto porównuj z kwotą netto. Jeśli nie odliczasz VAT, sprawdź, czy wykonawca jest jego płatnikiem, bo od tego zależy końcowy koszt.</p>',
      ].join(''),
    },
    {
      id: 'kiedy-freelancer',
      h2: 'Kiedy lepiej wybrać freelancera SEO',
      html: [
        '<ul>',
        '<li><strong>Jedno zadanie zamiast stałej współpracy:</strong> audyt, naprawa błędów technicznych, konfiguracja Search Console i GA4 albo jednorazowy plan treści. Płacisz za wynik, nie za gotowość zespołu.</li>',
        '<li><strong>Wąska nisza:</strong> NapoleonCat wskazuje rynki takie jak SaaS i B2B z długim cyklem sprzedaży, gdzie liczy się głęboka znajomość jednego tematu.</li>',
        '<li><strong>Budżet poniżej minimum agencji:</strong> nasz najtańszy pakiet pozycjonowania to 1 900 zł netto miesięcznie. Jeśli to za dużo, freelancer albo własny wkład w treści mogą być rozsądniejszym startem.</li>',
        '<li><strong>Masz w firmie osobę od marketingu:</strong> konsultant SEO na kilka godzin w miesiącu wystarczy, gdy wykonanie zostaje u Ciebie.</li>',
        '<li><strong>Zależy Ci na jednym, stałym rozmówcy:</strong> bez opiekuna i bez przekazywania spraw między osobami.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'kiedy-agencja',
      h2: 'Kiedy lepiej sprawdzi się agencja',
      html: [
        '<ul>',
        '<li><strong>Potrzebujesz kilku kompetencji naraz:</strong> technika, treści, linki, wizytówka Google i pomiar widoczności w ChatGPT rzadko mieszczą się w głowie jednej osoby.</li>',
        '<li><strong>Liczy się ciągłość:</strong> przy urlopie lub chorobie wykonawcy zastępstwo zależy od umowy, więc zapytaj, kto i na jakich zasadach przejmuje zadania.</li>',
        '<li><strong>Chcesz stały raport i wgląd w dane:</strong> w naszym panelu klienta widzisz kliknięcia i wyświetlenia z Search Console, pozycje fraz oraz dziennik prac, a demo obejrzysz bez logowania.</li>',
        '<li><strong>Serwis jest duży albo wymaga kilku specjalistów naraz:</strong> jedna osoba nie obsłuży bardzo dużego serwisu, o czym pisze też NapoleonCat.</li>',
        '</ul>',
        `<p>Jak wygląda panel, sprawdzisz w ${a(PANEL_DEMO_URL, 'demo panelu klienta')}, a zakres pakietów w ${a('/cennik-pozycjonowania', 'cenniku pozycjonowania')}.</p>`,
      ].join(''),
    },
    {
      id: 'umowa-i-dostep',
      h2: 'Umowa i dostęp do kont: 6 zapisów dla obu wyborów',
      html: [
        '<p>Te zapisy chronią Cię tak samo przy freelancerze, jak przy agencji. Google przypomina, że to Ty odpowiadasz za działania firm, które zatrudniasz, więc zakres prac ma być jasny przed startem.</p>',
        '<ol>',
        '<li>Search Console, GA4, wizytówka Google i domena są na Twojej firmie; wykonawca dostaje tylko uprawnienia, a przy audycie wystarczy dostęp tylko do odczytu.</li>',
        '<li>Zastępca na czas nieobecności albo zapis, kto przejmuje zadania, gdy wykonawca przestanie odpowiadać.</li>',
        '<li>Wypowiedzenie rzędu miesiąca, bez kar za wyjście i bez automatycznego przedłużenia na rok.</li>',
        '<li>Prawa do treści przechodzą na Ciebie na piśmie, a linki zdobyte w trakcie współpracy zostają.</li>',
        '<li>Raport z Twoich kont co miesiąc: lista zmian na stronie, zapytania od klientów i kliknięcia z Google, nie same pozycje fraz.</li>',
        '<li>Zakres prac opisany liczbą fraz, treści i linków albo godzin, żeby było co rozliczyć.</li>',
        '</ol>',
        zdanieJesli('/porownania/jak-wybrac-agencje-seo', (h) => `<p>Dłuższą listę pytań znajdziesz w poradniku ${a(h, 'jak wybrać agencję SEO')}, a jeśli zmieniasz obecnego wykonawcę, w poradniku o ${a('/zmiana-agencji-seo', 'zmianie agencji SEO')}.</p>`) || `<p>Jeśli zmieniasz obecnego wykonawcę, zobacz poradnik o ${a('/zmiana-agencji-seo', 'zmianie agencji SEO')}.</p>`,
      ].join(''),
      uwaga: 'To nie jest porada prawna. Przy umowie na dużą kwotę pokaż ją prawnikowi.',
    },
    {
      id: 'jak-sprawdzic-freelancera',
      h2: 'Jak sprawdzić freelancera SEO przed zleceniem',
      html: [
        '<p>Google radzi poprosić o przykłady dotychczasowych prac i porozmawiać z poprzednimi klientami. W praktyce:</p>',
        '<ul>',
        '<li>Poproś o 2-3 referencje i zadzwoń do jednej z nich. Pytaj o terminowość, raporty i wynik, nie o sympatię.</li>',
        '<li>Poproś o wzór raportu z ukrytymi danymi klienta i sprawdź, czy liczby pochodzą z Search Console, a nie tylko z narzędzia wykonawcy.</li>',
        '<li>Zapytaj o gwarancje. Nikt nie może zagwarantować pierwszego miejsca w Google, więc „TOP 1 w 30 dni” jest sygnałem ostrzegawczym także u freelancera.</li>',
        '<li>Sprawdź, co zmieni na Twojej stronie, i ustal, że lista zmian wraca do Ciebie przed wdrożeniem.</li>',
        '<li>Miasto ma mniejsze znaczenie niż referencje: szukając freelancera SEO w Warszawie albo w innym mieście, porównuj doświadczenie w Twojej branży, a nie adres.</li>',
        '</ul>',
        zdanieJesli('/porownania/pozycjonowanie-za-efekt-czy-abonament', (h) => `<p>Jeśli rozważasz rozliczenie za wynik zamiast abonamentu, przeczytaj porównanie ${a(h, 'pozycjonowania za efekt i abonamentu')}.</p>`),
      ].join(''),
    },
  ],
  faqTytul: 'Pytania o freelancera SEO i agencję',
  faq: [
    {
      question: 'Ile kosztuje freelancer SEO, a ile agencja?',
      answer: 'Według zestawienia NapoleonCat z 11.09.2026 freelancer SEO kosztuje 1 000-8 000 zł netto miesięcznie, a agencja 800-15 000 zł. Przedziały mocno się nakładają, więc porównuj zakres: liczbę fraz, treści i linków albo godzin. U nas SEO Standard to 1 900 zł netto miesięcznie, a SEO Premium 2 500 zł.',
    },
    {
      question: 'Czy freelancer SEO jest lepszy niż agencja?',
      answer: 'Bywa lepszy: przy jednym zadaniu, wąskiej niszy, małym budżecie albo gdy zależy Ci na stałym kontakcie z jedną osobą. Agencja wygrywa, gdy potrzebujesz kilku kompetencji naraz, stałego raportu i zastępstwa uzgodnionego w umowie. Nie ma jednej odpowiedzi, jest dopasowanie do zakresu.',
    },
    {
      question: 'Co się stanie z pozycjonowaniem, gdy freelancer zachoruje albo zniknie?',
      answer: 'Praca zwykle staje, bo nie ma kto jej przejąć. Zabezpiecz się przed umową: konta Search Console, GA4 i wizytówka Google na Twojej firmie, zapis o zastępcy i dokumentacja wykonanych zmian. Dzięki temu nowy wykonawca przejmie stronę bez zaczynania od zera.',
    },
    {
      question: 'Jak sprawdzić freelancera SEO przed zleceniem?',
      answer: 'Poproś o przykłady prac i referencje, tak jak radzi Google, a także o wzór raportu. Zapytaj, co zmieni na Twojej stronie, i nie ufaj obietnicom pierwszego miejsca w Google, bo nikt nie może ich zagwarantować. Dobry freelancer odpowie na te pytania na piśmie.',
    },
    {
      question: 'Czy można połączyć freelancera i agencję?',
      answer: 'Tak. Częsty układ to freelancer od jednego zadania, np. audytu lub treści, i agencja albo własny zespół od reszty. Ustal wtedy, kto ma dostęp do Search Console i kto zatwierdza zmiany na stronie, żeby nikt nie nadpisywał cudzej pracy.',
    },
  ],
  sources: [
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: ile kosztuje zatrudnienie agencji SEO (11.09.2026), sekcja „Agencja, freelancer czy etat”', data: '2026-11-18' },
    { url: 'https://useme.com/pl/blog/ile-zaplacic-freelancerowi/', nazwa: 'Useme: ile zapłacić freelancerowi (dane z rozliczeń 2025)', data: '2026-11-18' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO pricing (439 dostawców, aktualizacja 15.08.2024)', data: '2026-11-18' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=pl', nazwa: 'Google Search Central: Czy potrzebujesz specjalisty SEO?', data: '2026-11-18' },
  ],
  zrodlaWewnetrzne: [
    'components/Pricing.jsx (SEO Standard 1 900 zł, do 20 fraz, 2 treści, 2 linki; SEO Premium 2 500 zł, do 50 fraz, 4 treści, 4 linki; umowa miesięczna, Booster Pack min. 3 mies.)',
    'components/PricingClient.jsx (cena za frazę 95 zł i 50 zł; panel klienta; dostęp do Search Console i Analytics po stronie klienta; audyt, SEO lokalne, link building w cenie)',
    'seo/frazy-pl.csv: freelancer seo 880, pozycjonowanie stron freelancer 70, freelancer seo warszawa 30 (miasto jako zdanie w poradniku, bez strony miejskiej)',
    'lib/porownania.js P6 (sekcja „Agencja czy freelancer”: te same źródła Useme i Ahrefs; tu odczyt ponowiony 18.11.2026)',
  ],
  aiQuestions: [],
  cta: {
    tekst: 'Masz ofertę agencji SEO? Prześlij ją, sprawdzimy zakres, godziny i umowę',
    plan: 'przeglad-agencji',
    linki: [{ tekst: 'Zobacz nasz cennik pozycjonowania', href: '/cennik-pozycjonowania' }],
  },
  about: [{ '@type': 'Thing', name: 'Wybór wykonawcy SEO: agencja czy freelancer' }],
};
