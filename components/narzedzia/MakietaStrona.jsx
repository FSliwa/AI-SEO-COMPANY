// Strona aplikacji: Makieta redesignu (/narzedzia/makieta-redesignu, /en/tools/website-redesign-mockup). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
// 12.11.2026 (S1-poprawki, sekcja 4 zmiany.md): lead i „Krótka odpowiedź” (Z-M3), Co dostajesz (Z-M2),
// przykład wyniku (Z-M5, na razie tylko tryb demo, opisany wprost), 3 kroki i zasady treści (Z-M4),
// Co dalej (Z-M6), FAQ 8 (Z-M7), ograniczenia, jak ocenić makietę, źródła, poradniki i inne narzędzia.
// Fakty o działaniu: panel-fix/lib/narzedzia/makieta.ts (dane strony :38-65, zrzut :68-79, prompt :80-105,
// podgląd do 2. sekcji :161-167), limit 2/IP (wspolne.ts LIMITY), link 60 dni (cron tool_runs).
// 12.11.2026 (domknięcie, makieta): galeria „przed i po” na naszej stronie zamiast zrzutu z trybu demo (Z-M5)
// oraz 2 sekcje: co makieta zmieniła u nas i jak przygotować stronę (logo z rel=icon, kolory hex z HTML:
// panel-fix/lib/narzedzia/html.ts :78, :121-146).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { MAKIETA, cena } from '@/lib/narzedziaLiczby';
import Zrodla from '@/components/Zrodla';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import MakietaClient from './MakietaClient';

const SCIEZKA = '/narzedzia/makieta-redesignu';
const AUDYT = '/narzedzia/audyt-seo';
const projektowanie = () => hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
const BRIEF = hrefJesliOpublikowana('/narzedzia/brief-strony-internetowej');
const minuty = MAKIETA.minut.replace('-', ' do ');

// Z-M5: przykład „przed i po” na naszej stronie (bez zgody osób trzecich). Jedno prawdziwe uruchomienie na
// produkcji 12.11.2026 14:50: POST panel /api/narzedzia/makieta { url: https://www.ai-seo-company.pl, cel: "",
// lang: "pl" }, 200 w 90 s, run f2ea07c3-71e1-4cf2-b23c-9cad5d8f066c, 6 sekcji. Bez bramki e-mail, więc „po”
// to podgląd (sekcja 1: nagłówek z menu i hero), czyli to, co narzędzie pokazuje każdemu od razu.
// Zrzuty: Playwright (Chromium), „przed” = www.ai-seo-company.pl po kliknięciu „Odrzuć opcjonalne” w banerze
// cookies i 9 s czekania na animacje; „po” = HTML podglądu bez zmian. Komputer 1280×800 (DPR 1), telefon
// 390×844 (DPR 2, plik 780×1688). Pliki w public/images/narzedzia/makieta/ai-seo-company-*.webp.
// Opisy w podpisach i sekcji „Co makieta zmieniła” odnoszą się tylko do tego, co widać na tych zrzutach.
// Zrzuty z trybu demo (demo-wynik-komputer*.webp) nie są już używane na stronie.
const PRZYKLAD = {
  data: { pl: '12 listopada 2026', en: '12 November 2026' },
  komputer: {
    przed: { src: '/images/narzedzia/makieta/ai-seo-company-przed-komputer.webp', width: 1280, height: 800 },
    po: { src: '/images/narzedzia/makieta/ai-seo-company-makieta-komputer.webp', width: 1280, height: 800 },
  },
  telefon: {
    przed: { src: '/images/narzedzia/makieta/ai-seo-company-przed-telefon.webp', width: 780, height: 1688 },
    po: { src: '/images/narzedzia/makieta/ai-seo-company-makieta-telefon.webp', width: 780, height: 1688 },
  },
};
const ZRZUT_SCHEMA = { url: PRZYKLAD.komputer.po.src, width: PRZYKLAD.komputer.po.width, height: PRZYKLAD.komputer.po.height };

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Site moves with URL changes (przekierowania 301 przy zmianie adresów)', nazwaEn: 'Google Search Central: Site moves with URL changes (301 redirects when URLs change)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing', nazwa: 'Google Search Central: Mobile-first indexing best practices (Google ocenia wersję na telefon)', nazwaEn: 'Google Search Central: Mobile-first indexing best practices (Google uses the mobile version)', data: '2026-11-12' },
  { url: 'https://www.w3.org/TR/WCAG22/#contrast-minimum', nazwa: 'W3C: WCAG 2.2, kryterium 1.4.3 Contrast (Minimum), próg 4,5:1', nazwaEn: 'W3C: WCAG 2.2, success criterion 1.4.3 Contrast (Minimum), the 4.5:1 threshold', data: '2026-11-12' },
];

const cta = { marginTop: '1.25rem', textAlign: 'center' };
// Para na komputer: jeden pod drugim, na pełną szerokość (zrzut 1280 px w kolumnie 420 px byłby nieczytelny).
// Para na telefon: zawsze obok siebie, także na ekranie 390 px.
const paraKomputer = { display: 'grid', gap: '0.5rem' };
const paraTelefon = { display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 'clamp(0.75rem, 3vw, 1.5rem)', alignItems: 'start', maxWidth: '560px', margin: '0 auto' };
const ROZMIARY_KOMPUTER = '(max-width: 900px) 100vw, 860px';
const ROZMIARY_TELEFON = '(max-width: 600px) 50vw, 280px';

function Przed({ en }) {
  return <strong>{en ? 'Before' : 'Przed'}:</strong>;
}
function Po({ en }) {
  return <strong>{en ? 'After' : 'Po'}:</strong>;
}

// --- Makieta redesignu ------------------------------------------------------------------------

const FAQ_MAKIETY = [
  { id: 'jak-powstaje-makieta', question: 'Jak powstaje makieta?', answer: 'Pobieramy Twoją stronę główną, wyciągamy z niej treści (nazwę, nagłówki, menu, opisy usług, kontakt i kolory) i robimy zrzut obecnego wyglądu. Model AI Claude projektuje z tego nowy układ strony głównej. Nie wymyśla liczb, opinii, nagród ani cen: używa tylko treści z Twojej strony.' },
  { id: 'czy-moge-uzyc-makiety', question: 'Czy mogę wdrożyć makietę?', answer: 'Makieta to propozycja wyglądu, a nie gotowa strona. Pokazuje kierunek: układ sekcji, hierarchię i kolory. Przed wdrożeniem trzeba ją dopasować do marki i zdjęć oraz zadbać o SEO: adresy, nagłówki, szybkość i dane strukturalne.' },
  { id: 'czy-makieta-jest-bezpieczna', question: 'Czy makieta zmienia coś na mojej stronie?', answer: 'Nie. Tylko czytamy publiczną stronę główną, tak jak przeglądarka. Makieta jest osobnym plikiem bez skryptów, wyświetlanym w zamkniętej ramce, a pełna wersja jest dostępna pod linkiem z maila przez 60 dni.' },
  { id: 'czy-zaszkodzi-seo', question: 'Czy nowa strona według makiety zaszkodzi SEO?', answer: 'Sama makieta niczego nie zmienia na Twojej stronie. Ryzyko pojawia się przy wdrożeniu nowego wyglądu: zmienione adresy, usunięte treści i wolniejsze ładowanie. Dlatego przy wdrożeniu trzeba zachować adresy albo ustawić przekierowania 301, przenieść treści i sprawdzić szybkość, zanim nowa strona zastąpi starą.' },
  { id: 'czy-ai-zmienia-tresc', question: 'Czy AI zmienia treść mojej strony?', answer: 'Model skraca i porządkuje teksty z Twojej strony, ale nie dopisuje liczb, opinii, nagród, cen ani nazw klientów. Teksty do wdrożenia i tak warto przejrzeć, bo makieta pokazuje kierunek, a nie gotową treść.' },
  { id: 'czy-potrzebne-konto', question: 'Czy muszę zakładać konto albo podawać kartę?', answer: `Nie. Pierwszy ekran makiety widzisz bez rejestracji. Do całej makiety potrzebny jest tylko adres e-mail, na który wysyłamy link. Limit to ${MAKIETA.limitIp} makiety dziennie z jednego adresu IP.` },
  { id: 'co-ma-sie-poprawic', question: 'Co wpisać w polu „Co ma się poprawić?”', answer: 'Cel, który ma spełniać nowa strona, np. więcej telefonów od klientów, nowocześniejszy wygląd albo czytelniejsza oferta. Model bierze go pod uwagę przy układzie sekcji i wezwaniach do kontaktu. Pole jest opcjonalne.' },
  { id: 'ile-kosztuje-nowa-strona', question: 'Ile kosztuje nowa strona według makiety?', answer: `Zależy od liczby podstron, integracji i treści. Stronę firmową w Next.js budujemy od ${cena('strona')} netto, a wycenę przygotujemy w 24 godziny w dni robocze. Zakres opisujemy na stronie <a href="/projektowanie-stron-internetowych">projektowania stron internetowych</a>.` },
];

export function MakietaStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <MakietaEn />;
  const { komputer, telefon } = PRZYKLAD;
  return (
    <Uklad
      slug="makieta-redesignu"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Makieta redesignu strony z AI',
        description: 'Bezpłatny generator makiety: z adresu obecnej strony tworzy propozycję nowego wyglądu strony głównej na komputer i telefon, z treści firmy.',
        category: 'DesignApplication',
        featureList: ['Propozycja nowej strony głównej', 'Wersja na komputer i telefon', 'Tylko treści z Twojej strony'],
        screenshot: ZRZUT_SCHEMA,
      }}
      lead={`Wpisz adres strony, a w ${minuty} minut AI zaprojektuje z jej treści nową stronę główną na komputer i telefon. Pierwszy ekran zobaczysz od razu, bez konta.`}
      narzedzie={<MakietaClient />}
      odpowiedz="Makieta redesignu to propozycja nowej strony głównej przygotowana przez model AI z treści, które już masz na stronie: nazwy, nagłówków, menu, opisów usług, danych kontaktowych i kolorów. Pokazuje układ sekcji, typografię, kolory i wersję na telefon. To kierunek do rozmowy z wykonawcą, a nie gotowa strona: pierwszy ekran widzisz od razu, całą makietę po podaniu e-maila."
      faq={FAQ_MAKIETY}
      tytulFaq="Pytania o makietę redesignu"
    >
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

      <Sekcja id="przyklad" tytul="Przykład przed i po: nasza strona ai-seo-company.pl">
        <p style={s.akapit}>Zamiast wymyślonej firmy pokazujemy prawdziwy wynik dla naszej własnej strony. {PRZYKLAD.data.pl} uruchomiliśmy narzędzie na adresie ai-seo-company.pl tak jak każdy użytkownik, bez wpisanego celu w polu „Co ma się poprawić?”. Makieta była gotowa po około półtorej minuty i ma 6 sekcji. Poniżej jest jej pierwszy ekran, czyli ta część, którą narzędzie pokazuje od razu, bez podawania e-maila.</p>
        <p style={s.akapit}>Zrzuty obu wersji zrobiliśmy tą samą przeglądarką w tych samych rozmiarach ekranu: 1280 × 800 pikseli na komputerze i 390 × 844 na telefonie. Na obecnej stronie przed zrzutem kliknęliśmy „Odrzuć opcjonalne” w banerze cookies, żeby nie zasłaniał treści. Makiety nie poprawialiśmy ręcznie: to dokładnie ten kod, który zwróciło narzędzie.</p>
        <h3 style={s.h3}>Na komputerze</h3>
        <div style={paraKomputer}>
          <ZrzutWyniku
            {...komputer.przed}
            sizes={ROZMIARY_KOMPUTER}
            alt="Obecna strona główna ai-seo-company.pl na komputerze: duża pomarańczowa grafika SEO, postać 3D i nagłówek w dolnej części ekranu"
            podpis={<><Przed /> obecna strona główna na komputerze. Pierwszy ekran zajmuje grafika „SEO”, nagłówek H1 jest w dolnej części, a przyciski ucina krawędź ekranu.</>}
          />
          <ZrzutWyniku
            {...komputer.po}
            sizes={ROZMIARY_KOMPUTER}
            alt="Makieta redesignu ai-seo-company.pl na komputerze: menu z czterema pozycjami, nagłówek Pozycjonowanie, które buduje sprzedaż, dwa przyciski i grafika po prawej"
            podpis={<><Po /> pierwszy ekran makiety w tym samym rozmiarze. Nagłówek, krótszy opis i oba przyciski mieszczą się na ekranie, menu ma 4 widoczne pozycje, a obraz po prawej to nasza grafika do udostępniania w mediach społecznościowych.</>}
          />
        </div>
        <h3 style={s.h3}>Na telefonie</h3>
        <div style={paraTelefon}>
          <ZrzutWyniku
            {...telefon.przed}
            sizes={ROZMIARY_TELEFON}
            alt="Obecna strona główna ai-seo-company.pl na telefonie: krótki wstęp, grafika SEO, nagłówek i dwa przyciski"
            podpis={<><Przed /> obecna strona na telefonie. Przyciski są widoczne bez przewijania.</>}
          />
          <ZrzutWyniku
            {...telefon.po}
            sizes={ROZMIARY_TELEFON}
            alt="Makieta redesignu ai-seo-company.pl na telefonie: menu przewijane w bok, nagłówek, opis i dwa przyciski na całą szerokość"
            podpis={<><Po /> makieta na telefonie. Menu przewija się w bok i czwarta pozycja jest ucięta, przyciski mają całą szerokość ekranu.</>}
          />
        </div>
        <p style={s.przypis}>Zrzuty z {PRZYKLAD.data.pl}, bez ręcznych poprawek. Pozostałych 5 sekcji makiety tu nie pokazujemy, bo w narzędziu też są dostępne dopiero po podaniu e-maila.</p>
      </Sekcja>

      <Sekcja id="co-zmienila-makieta" tytul="Co makieta zmieniła na naszej stronie, a co trzeba poprawić">
        <p style={s.akapit}>Oceniamy wynik tak samo, jak radzimy oceniać makietę swojej strony: osobno to, co jest lepsze, i to, czego przy wdrożeniu nie można zostawić tak jak w makiecie.</p>
        <h3 style={s.h3}>Co jest lepsze</h3>
        <ul style={s.lista}>
          <li><strong>Obietnica i przyciski są wyżej.</strong> Na komputerze nagłówek „Pozycjonowanie, które buduje sprzedaż” i przyciski „Wyceń projekt” i „Zobacz portfolio” mieszczą się w pierwszym ekranie. Na obecnej stronie przyciski ucina dolna krawędź ekranu 1280 × 800.</li>
          <li><strong>Menu widać od razu.</strong> Cztery pozycje (Usługi, Dlaczego my, Wyniki, Kontakt) zamiast przycisku, który otwiera menu na cały ekran.</li>
          <li><strong>Tekst jest krótszy, ale nic nie zostało dopisane.</strong> Model wziął nasz nagłówek i podtytuł bez zmian, a opis skrócił z czterech zdań do dwóch i usunął słowo „masowo”. Nie dodał żadnej liczby, opinii ani obietnicy, której nie ma na stronie.</li>
          <li><strong>Kolory zostały nasze.</strong> Pomarańczowy (#ef6a1f) i ciemny grafit (#2a2e40) to najczęstsze kolory w kodzie obecnej strony głównej, poza białym.</li>
        </ul>
        <h3 style={s.h3}>Co trzeba poprawić przy wdrożeniu</h3>
        <ul style={s.lista}>
          <li><strong>Zniknęły ważne elementy nagłówka.</strong> W makiecie nie ma przełącznika języka PL/EN, linku „Zaloguj się” do panelu klienta ani skrótów do demo panelu i wyników. Makieta projektuje jedną stronę główną i takie elementy trzeba dodać ręcznie.</li>
          <li><strong>Menu na telefonie jest ucięte.</strong> Pozycje tworzą rząd przewijany w bok, a czwarta („Kontakt”) kończy się na krawędzi ekranu, więc nie każdy zauważy, że da się przewinąć.</li>
          <li><strong>Logo jest za małe.</strong> Narzędzie bierze logo z ikony strony (favicon), a nie z nagłówka, i w makiecie wyszło wyraźnie mniejsze niż na obecnej stronie.</li>
          <li><strong>Obraz nie pasuje do polskiej strony.</strong> Model nie tworzy zdjęć, więc w pierwszym ekranie użył naszej grafiki do udostępniania, która ma napis po angielsku.</li>
          <li><strong>Strona straciła charakter.</strong> Duża grafika „SEO” i postać 3D wyróżniają obecną stronę. Makieta jest czytelniejsza, ale wygląda bardziej typowo.</li>
        </ul>
        <p style={s.akapit}>Wniosek dla nas: z makiety bierzemy konkretne zmiany w pierwszym ekranie, czyli przyciski wyżej i widoczne menu, a wygląd marki zostaje. Tak samo warto czytać makietę swojej strony: jako listę zmian do sprawdzenia, a nie projekt do skopiowania.</p>
      </Sekcja>

      <Sekcja id="jak-powstaje" tytul="Jak powstaje makieta: 3 kroki">
        <ol style={s.lista}>
          <li><strong>Czytamy Twoją stronę główną.</strong> Pobieramy nazwę, nagłówki, menu, opisy usług, dane kontaktowe i kolory marki i robimy zrzut obecnego wyglądu.</li>
          <li><strong>AI projektuje nowy układ.</strong> Model Claude układa nagłówek z menu i pierwszy ekran, potem 4 do 6 sekcji z Twoich treści (np. usługi, dlaczego my, proces, obszar działania, kontakt) i stopkę, w wersji na komputer i telefon.</li>
          <li><strong>Porównujesz.</strong> Pierwszy ekran nowej strony pokazujemy obok obecnej od razu. Całą makietę i link ważny 60 dni dostajesz po podaniu e-maila.</li>
        </ol>
        <p style={s.akapit}>Cały proces trwa zwykle {minuty} minut. W tym czasie zostaw kartę otwartą: postęp widać pod przyciskiem.</p>
      </Sekcja>

      <Sekcja id="zasady-tresci" tytul="Twoje treści, bez wymyślonych danych">
        <p style={s.akapit}>Model może skracać i porządkować Twoje teksty, ale nie wymyśla liczb, lat doświadczenia, opinii klientów, nagród, certyfikatów, cen, nazw klientów ani statystyk. Gdy czegoś na stronie brakuje, pomija ten element zamiast go zmyślać. Makieta jest plikiem bez skryptów i formularzy, wyświetlanym w zamkniętej ramce, a my tylko czytamy publiczną stronę główną, tak jak przeglądarka.</p>
        <p style={s.akapit}>Jedno ograniczenie: gdy strona pokazuje tekst dopiero po uruchomieniu JavaScriptu, model dostaje mniej treści i makieta wychodzi uboższa. Sprawdzisz to w <Link href={AUDYT} style={s.podkreslenie}>darmowym audycie SEO</Link> (reguła „Treść niewidoczna bez JavaScriptu”).</p>
      </Sekcja>

      <Sekcja id="przygotuj-strone" tytul="Jak przygotować stronę, żeby makieta wyszła lepsza">
        <p style={s.akapit}>Model widzi tylko to, co narzędzie wyciągnie z kodu Twojej strony głównej. Kilka poprawek na obecnej stronie daje lepszą makietę, a przy okazji pomaga też w Google i w odpowiedziach AI:</p>
        <ul style={s.lista}>
          <li><strong>Nagłówek H1 i tytuł strony mówią, co robisz, dla kogo i gdzie.</strong> Model dostaje tytuł, opis meta i do 3 nagłówków H1. W naszym przykładzie wziął nagłówek H1 bez zmian, więc to on ustawia cały pierwszy ekran.</li>
          <li><strong>Każda usługa ma własny nagłówek H2.</strong> Model dostaje do 12 nagłówków H2 i na nich buduje kolejne sekcje. Usługi wymienione w jednym długim akapicie łatwiej zgubić.</li>
          <li><strong>Telefon i e-mail są zwykłym tekstem.</strong> Narzędzie szuka ich w treści strony. Numer pokazany tylko na obrazku albo ukryty w formularzu nie trafi do przycisku kontaktu w makiecie.</li>
          <li><strong>Grafika do udostępniania (og:image) pasuje do strony.</strong> Obok logo to jedyny obraz, którego model może użyć. Jeśli to baner z napisem w innym języku albo ze starą ofertą, trafi do pierwszego ekranu, tak jak u nas.</li>
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
          <li>Polska wersja narzędzia pisze makietę po polsku. Każde uruchomienie daje trochę inną propozycję; limit to {MAKIETA.limitIp} makiety dziennie z jednego adresu IP.</li>
          <li>Zrzut obecnej strony robi zewnętrzna usługa. Gdy nie odpowie, model pracuje na samych treściach i nie zobaczysz porównania obok siebie.</li>
        </ul>
      </Sekcja>

      <Sekcja id="makieta-a-projekt" tytul="Makieta z AI a projekt od projektanta">
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

      <Zrodla zrodla={ZRODLA} id="zrodla-makiety" />
      <Poradniki narzedzie={SCIEZKA} />
      <PozostaleNarzedzia bez={SCIEZKA} />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_MAKIETY_EN = [
  { id: 'how-is-the-mockup-made', question: 'How is the mockup made?', answer: 'We fetch your homepage, extract its content (name, headings, menu, service descriptions, contact details and colors) and take a screenshot of how it looks now. The Claude AI model designs a new homepage layout from that. It does not invent numbers, reviews, awards or prices: it only uses content from your website.' },
  { id: 'can-i-use-the-mockup', question: 'Can I put the mockup live?', answer: 'The mockup is a proposal for the look, not a finished website. It shows a direction: the section layout, hierarchy and colors. Before launch it has to be adapted to your brand and photos, and you need to take care of SEO: URLs, headings, speed and structured data.' },
  { id: 'is-the-mockup-safe', question: 'Does the mockup change anything on my website?', answer: 'No. We only read the public homepage, the way a browser does. The mockup is a separate file with no scripts, shown in a sandboxed frame, and the full version is available through the link in the email for 60 days.' },
  { id: 'will-it-hurt-seo', question: 'Will a new website based on the mockup hurt my SEO?', answer: 'The mockup itself changes nothing on your website. The risk comes when you launch the new design: changed URLs, removed content and slower loading. That is why the build has to keep your URLs or set up 301 redirects, carry over the content and check the speed before the new site replaces the old one.' },
  { id: 'does-ai-change-my-content', question: 'Does the AI change my content?', answer: 'The model shortens and reorganises the copy from your website, but it does not add numbers, reviews, awards, prices or client names. It is still worth reviewing the copy before launch, because the mockup shows a direction, not finished content.' },
  { id: 'do-i-need-an-account', question: 'Do I need an account or a credit card?', answer: `No. You see the first screen of the mockup without signing up. For the whole mockup you only need an email address, to which we send the link. The limit is ${MAKIETA.limitIp} mockups per day from one IP address.` },
  { id: 'what-language', question: 'What language is the mockup in?', answer: 'The same language as your website: a Polish website gets a Polish mockup and an English website an English one.' },
  { id: 'how-much-does-a-new-website-cost', question: 'How much does a new website based on the mockup cost?', answer: `It depends on the number of pages, integrations and content. We build a Next.js company website from ${cena('strona', 'en')} net and prepare a quote within 24 hours on business days. The scope is described on our <a href="/en/web-design">web design</a> page.` },
];

function MakietaEn() {
  const { komputer, telefon } = PRZYKLAD;
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
        screenshot: ZRZUT_SCHEMA,
      }}
      lead={`Free website redesign mockup: enter your website address and in ${minutyEn} minutes AI designs a new homepage for desktop and mobile from your content. No account needed.`}
      narzedzie={<MakietaClient />}
      odpowiedz="A redesign mockup is a proposal for a new homepage that an AI model builds from the content already on your website: your name, headings, menu, service descriptions, contact details and colors. It shows the section layout, typography, colors and a mobile version. It is a direction to discuss with a developer, not a finished website: you see the first screen right away and the whole mockup after you enter your email."
      faq={FAQ_MAKIETY_EN}
      tytulFaq="Questions about the redesign mockup"
    >
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

      <Sekcja id="example" tytul="Before and after: our own website, ai-seo-company.pl">
        <p style={s.akapit}>Instead of a made-up company, here is a real result for our own website. On {PRZYKLAD.data.en} we ran the tool on ai-seo-company.pl the way any user would, with nothing typed in the “What should improve?” field. The mockup was ready after about a minute and a half and has 6 sections. Below is its first screen, the part the tool shows right away, before you enter an email. Our homepage is in Polish, so the mockup is in Polish too: the tool keeps the language of the website.</p>
        <p style={s.akapit}>We captured both versions with the same browser at the same screen sizes: 1280 × 800 pixels on desktop and 390 × 844 on mobile. On the current website we clicked “Odrzuć opcjonalne” (Reject optional) in the cookie banner before the screenshot, so it would not cover the content. We did not edit the mockup by hand: it is exactly the code the tool returned.</p>
        <h3 style={s.h3}>On desktop</h3>
        <div style={paraKomputer}>
          <ZrzutWyniku
            {...komputer.przed}
            sizes={ROZMIARY_KOMPUTER}
            alt="The current ai-seo-company.pl homepage on desktop: a large orange SEO graphic, a 3D figure and the heading in the lower part of the screen"
            podpis={<><Przed en /> the current homepage on desktop. The “SEO” graphic takes up the first screen, the H1 heading sits in the lower part and the buttons are cut off by the edge of the screen.</>}
          />
          <ZrzutWyniku
            {...komputer.po}
            sizes={ROZMIARY_KOMPUTER}
            alt="The ai-seo-company.pl redesign mockup on desktop: a menu with four items, the heading, two buttons and a graphic on the right"
            podpis={<><Po en /> the first screen of the mockup at the same size. The heading, a shorter description and both buttons fit on the screen, the menu shows 4 items and the image on the right is our social sharing graphic.</>}
          />
        </div>
        <h3 style={s.h3}>On mobile</h3>
        <div style={paraTelefon}>
          <ZrzutWyniku
            {...telefon.przed}
            sizes={ROZMIARY_TELEFON}
            alt="The current ai-seo-company.pl homepage on mobile: a short intro, the SEO graphic, the heading and two buttons"
            podpis={<><Przed en /> the current website on mobile. The buttons are visible without scrolling.</>}
          />
          <ZrzutWyniku
            {...telefon.po}
            sizes={ROZMIARY_TELEFON}
            alt="The ai-seo-company.pl redesign mockup on mobile: a menu that scrolls sideways, the heading, the description and two full-width buttons"
            podpis={<><Po en /> the mockup on mobile. The menu scrolls sideways and the fourth item is cut off, the buttons span the full width of the screen.</>}
          />
        </div>
        <p style={s.przypis}>Screenshots from {PRZYKLAD.data.en}, unedited. We do not show the other 5 sections of the mockup here, because in the tool they are also available only after you enter your email.</p>
      </Sekcja>

      <Sekcja id="what-the-mockup-changed" tytul="What the mockup changed on our website, and what needs fixing">
        <p style={s.akapit}>We review the result the same way we suggest you review the mockup of your own website: what is better, and what cannot stay the way it is in the mockup when the site is built.</p>
        <h3 style={s.h3}>What is better</h3>
        <ul style={s.lista}>
          <li><strong>The promise and the buttons are higher up.</strong> On desktop, the heading “Pozycjonowanie, które buduje sprzedaż” (SEO that builds sales) and the “Wyceń projekt” (Get a quote) and “Zobacz portfolio” (See the portfolio) buttons fit on the first screen. On the current website the buttons are cut off by the bottom edge of a 1280 × 800 screen.</li>
          <li><strong>The menu is visible right away.</strong> Four items (Usługi, Dlaczego my, Wyniki, Kontakt: services, why us, results, contact) instead of a button that opens a full-screen menu.</li>
          <li><strong>The copy is shorter, but nothing was added.</strong> The model kept our heading and subheading unchanged and shortened the description from four sentences to two, dropping the word “masowo” (en masse). It added no numbers, reviews or promises that are not on the website.</li>
          <li><strong>The colors stayed ours.</strong> Orange (#ef6a1f) and dark graphite (#2a2e40) are the most frequent colors in the code of the current homepage, apart from white.</li>
        </ul>
        <h3 style={s.h3}>What needs fixing during the build</h3>
        <ul style={s.lista}>
          <li><strong>Important header elements are gone.</strong> The mockup has no PL/EN language switch, no “Zaloguj się” (Log in) link to the client panel and no shortcuts to the panel demo and the results. The mockup designs a single homepage, so elements like these have to be added by hand.</li>
          <li><strong>The mobile menu is cut off.</strong> The items form a row that scrolls sideways, and the fourth one (“Kontakt”) ends at the edge of the screen, so not everyone will notice it can be scrolled.</li>
          <li><strong>The logo is too small.</strong> The tool takes the logo from the site icon (favicon), not from the header, and in the mockup it came out noticeably smaller than on the current website.</li>
          <li><strong>The image does not fit a Polish website.</strong> The model does not create photos, so on the first screen it used our social sharing graphic, which has English text on it.</li>
          <li><strong>The website lost its character.</strong> The large “SEO” graphic and the 3D figure make the current website stand out. The mockup is easier to read, but looks more generic.</li>
        </ul>
        <p style={s.akapit}>Our takeaway: from the mockup we take specific changes to the first screen, that is the buttons higher up and a visible menu, while the brand’s look stays. Read the mockup of your own website the same way: as a list of changes to check, not a design to copy.</p>
      </Sekcja>

      <Sekcja id="how-it-works" tytul="How the mockup is made: 3 steps">
        <ol style={s.lista}>
          <li><strong>We read your homepage.</strong> We take your name, headings, menu, service descriptions, contact details and brand colors, and capture a screenshot of the current design.</li>
          <li><strong>AI designs a new layout.</strong> The Claude model builds a header with the menu and a first screen, then 4 to 6 sections from your content (e.g. services, why us, process, service area, contact) and a footer, for desktop and mobile.</li>
          <li><strong>You compare.</strong> We show the first screen of the new page next to your current one right away. You get the whole mockup and a link valid for 60 days after you enter your email.</li>
        </ol>
        <p style={s.akapit}>The whole process usually takes {minutyEn} minutes. Keep the tab open in the meantime: the progress shows under the button.</p>
      </Sekcja>

      <Sekcja id="content-rules" tytul="Your content, no invented data">
        <p style={s.akapit}>The model may shorten and reorganise your copy, but it does not invent numbers, years of experience, customer reviews, awards, certifications, prices, client names or statistics. If something is missing from your website, it leaves that element out instead of making it up. The mockup is a file with no scripts or forms, shown in a sandboxed frame, and we only read your public homepage, the way a browser does.</p>
        <p style={s.akapit}>One limit: if your website shows its text only after JavaScript runs, the model gets less content and the mockup comes out thinner. You can check this in the <Link href={AUDYT} style={s.podkreslenie}>free SEO audit</Link> (the “Content invisible without JavaScript” rule).</p>
      </Sekcja>

      <Sekcja id="prepare-your-website" tytul="How to prepare your website for a better mockup">
        <p style={s.akapit}>The model only sees what the tool extracts from the code of your homepage. A few fixes on your current website give a better mockup, and they help with Google and AI answers along the way:</p>
        <ul style={s.lista}>
          <li><strong>The H1 heading and the page title say what you do, who for and where.</strong> The model gets the title, the meta description and up to 3 H1 headings. In our example it kept the H1 unchanged, so that heading sets the whole first screen.</li>
          <li><strong>Every service has its own H2 heading.</strong> The model gets up to 12 H2 headings and builds the next sections from them. Services listed in one long paragraph are easier to lose.</li>
          <li><strong>Your phone number and email address are plain text.</strong> The tool looks for them in the page content. A number shown only in an image or hidden in a form will not make it into the contact button of the mockup.</li>
          <li><strong>Your social sharing image (og:image) fits the website.</strong> Apart from the logo, it is the only image the model can use. If it is a banner with text in another language or an old offer, it will end up on the first screen, as it did for us.</li>
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
          <li><strong>Are the contact button and phone number visible without scrolling, on mobile too?</strong> Switch the preview to mobile and check the first screen.</li>
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

      <Sekcja id="mockup-vs-designer" tytul="AI mockup vs a designer’s project">
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

      <Zrodla zrodla={ZRODLA.map((z) => ({ ...z, nazwa: z.nazwaEn }))} id="mockup-sources" en />
      <Poradniki narzedzie={SCIEZKA} locale="en" />
      <PozostaleNarzedzia bez={SCIEZKA} locale="en" />
    </Uklad>
  );
}
