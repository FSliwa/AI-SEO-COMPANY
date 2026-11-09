// Strony czterech darmowych aplikacji pod /narzedzia/<slug> (9.11.2026): audyt SEO, autorytet domeny,
// kalkulator strat, makieta redesignu. Komponenty serwerowe: treść, schema i okruszki; interaktywna
// część to *Client.jsx. Wspólny układ jak generator llms.txt (styl.js), bramka e-mail w BramkaEmail.jsx.
// Liczby w treści: tylko z działania narzędzi (limity, zakres) albo ze źródeł z datą odczytu.

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { BASE, RODZIC_OKRUSZKOW, SCIEZKA_HUBA, hrefAudytuAi, stronaNarzedzia } from '@/lib/narzedzia';
import { ZRODLA_KALKULATORA, ZALOZENIA } from '@/lib/kalkulatorStrat';
import AudytSeoClient from './AudytSeoClient';
import AutorytetClient from './AutorytetClient';
import KalkulatorClient from './KalkulatorClient';
import MakietaClient from './MakietaClient';
import * as s from './styl';

function Uklad({ slug, tag, schema, odpowiedz, children, faq, tytulFaq }) {
  const strona = stronaNarzedzia(slug);
  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema name={schema.name} description={schema.description} url={`${BASE}/narzedzia/${slug}`} category={schema.category} />
      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          <AnswerBox>{odpowiedz}</AnswerBox>
          {children}
        </div>
      </section>
      <AppleFaq faqData={faq} title={tytulFaq} sectionId="pytania" />
      {strona.sources.length > 0 && (
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container" style={s.kontener}>
            <Zrodla zrodla={strona.sources} />
          </div>
        </section>
      )}
      <Footer />
    </main>
  );
}

function Sekcja({ id, tytul, children }) {
  return (
    <section aria-labelledby={id} style={s.sekcja}>
      <h2 id={id} style={s.h2}>{tytul}</h2>
      {children}
    </section>
  );
}

function PozostaleNarzedzia({ bez }) {
  const hub = hrefJesliOpublikowana(SCIEZKA_HUBA);
  const linki = [
    ['audyt-seo', 'Darmowy audyt SEO'],
    ['autorytet-domeny', 'Autorytet domeny'],
    ['kalkulator-strat-seo', 'Kalkulator strat bez SEO'],
    ['makieta-redesignu', 'Makieta nowej strony'],
    ['generator-llms-txt', 'Generator llms.txt'],
  ].filter(([slug]) => slug !== bez).map(([slug, nazwa]) => [hrefJesliOpublikowana(`/narzedzia/${slug}`), nazwa]).filter(([href]) => href);
  if (!linki.length && !hub) return null;
  return (
    <section aria-labelledby="inne-narzedzia" style={{ ...s.sekcja, ...s.karta }}>
      <h2 id="inne-narzedzia" style={{ ...s.h2, marginBottom: '0.75rem' }}>Inne darmowe narzędzia</h2>
      <ul style={s.lista}>
        {linki.map(([href, nazwa]) => <li key={href}><Link href={href} style={s.podkreslenie}>{nazwa}</Link></li>)}
        {hub && <li><Link href={hub} style={s.podkreslenie}>Wszystkie narzędzia i szablony</Link></li>}
      </ul>
    </section>
  );
}

// --- Audyt SEO --------------------------------------------------------------------------------

const FAQ_AUDYTU = [
  { id: 'audyt-seo-za-darmo', question: 'Czy darmowy audyt SEO jest naprawdę bezpłatny?', answer: 'Tak. Ocenę, kategorie i trzy najważniejsze problemy widzisz od razu, bez rejestracji. Pełną listę problemów z adresami podstron pokazujemy po podaniu e-maila, na który wysyłamy też raport. Zapis na newsletter jest osobny i dobrowolny.' },
  { id: 'jak-liczona-ocena', question: 'Jak liczycie ocenę SEO od 1 do 100?', answer: 'Każda reguła ma wagę. Przy regułach dotyczących podstron kara rośnie z odsetkiem podstron z problemem, przy regułach całej witryny jest pełna albo zerowa. Ocena to 35% kategorii technicznej, 30% treści, 20% wydajności (w tym wynik PageSpeed Insights na telefonie) i 15% gotowości na AI.' },
  { id: 'audyt-a-pelny-audyt', question: 'Czym różni się darmowy audyt od płatnego audytu SEO?', answer: 'Darmowy audyt sprawdza automatycznie do 25 podstron i około 35 reguł. Płatny audyt SEO obejmuje całą stronę, frazy, konkurencję, profil linków i dane z Search Console, a jego wynikiem jest plan zmian z priorytetami i wyceną.' },
  { id: 'czy-audyt-obciaza-strone', question: 'Czy audyt obciąża moją stronę?', answer: 'Nie. Pobieramy do 25 podstron, po kilka naraz, z przedstawiającym się robotem AISEOCompanyAudit. To mniej niż jedna wizyta wyszukiwarki. Nie wysyłamy formularzy i nie logujemy się.' },
];

export function AudytSeoStrona() {
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  return (
    <Uklad
      slug="audyt-seo"
      tag="Darmowe narzędzie"
      schema={{ name: 'Darmowy audyt SEO strony', description: 'Bezpłatny audyt SEO: sprawdza do 25 podstron, robots.txt, mapę strony, szybkość w PageSpeed Insights i gotowość na AI, wystawia ocenę 1-100 i listę błędów z instrukcją naprawy.', category: 'BusinessApplication' }}
      odpowiedz="Darmowy audyt SEO sprawdza do 25 podstron Twojej strony: kody odpowiedzi, przekierowania, tytuły, opisy, nagłówki, treść, obrazy, dane strukturalne, robots.txt, mapę strony, szybkość na telefonie i dostęp botów AI. Wynik to ocena od 1 do 100 w czterech kategoriach i lista problemów z instrukcją naprawy."
      faq={FAQ_AUDYTU}
      tytulFaq="Pytania o darmowy audyt SEO"
    >
      <AudytSeoClient />
      <Sekcja id="co-sprawdza-audyt" tytul="Co sprawdza darmowy audyt SEO">
        <ul style={s.lista}>
          <li><strong>Technika:</strong> HTTPS i przekierowania, wersje z www i bez, błędy 4xx i 5xx, łańcuchy przekierowań, adresy kanoniczne, noindex, atrybut lang, meta viewport, zepsute linki wewnętrzne, robots.txt i mapa strony.</li>
          <li><strong>Treść:</strong> tytuły i opisy meta (brak, długość, duplikaty), nagłówki H1, ilość tekstu, teksty alternatywne obrazów i znaczniki Open Graph.</li>
          <li><strong>Wydajność:</strong> wynik Lighthouse na telefonie z Google PageSpeed Insights, LCP i CLS (z danych prawdziwych użytkowników, jeśli strona je ma), czas odpowiedzi serwera i rozmiar HTML.</li>
          <li><strong>Gotowość na AI:</strong> czy robots.txt wpuszcza boty GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot i Google-Extended, dane strukturalne firmy (Organization albo LocalBusiness) i plik llms.txt{llms ? <> (wygenerujesz go w <Link href={llms} style={s.podkreslenie}>generatorze llms.txt</Link>)</> : null}.</li>
        </ul>
      </Sekcja>
      <Sekcja id="jak-czytac-ocene" tytul="Jak czytać ocenę">
        <p style={s.akapit}>Ocena 80 i więcej oznacza, że podstawy są w porządku i warto skupić się na treści i linkach. Od 50 do 79 są problemy, które realnie ograniczają widoczność: zacznij od błędów, potem ostrzeżeń. Poniżej 50 strona ma braki techniczne, przez które Google może jej nie indeksować albo pokazywać gorzej niż konkurencję.</p>
        <p style={s.akapit}>Ocena nie jest pozycją w Google. Pokazuje, jak dużo przeszkód stoi stronie na drodze. O pozycji decydują też treść, linki i konkurencja, które sprawdzamy w <Link href={audyt} style={s.podkreslenie}>pełnym audycie SEO</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="audyt-seo" />
    </Uklad>
  );
}

// --- Autorytet domeny ----------------------------------------------------------------------------

const FAQ_AUTORYTETU = [
  { id: 'dr-a-da', question: 'Czym różni się DR od DA?', answer: 'Domain Rating (DR) to metryka Ahrefs, a Domain Authority (DA) metryka Moz. Obie oceniają siłę profilu linków w skali 0-100 i obie są logarytmiczne, ale liczą się z różnych baz linków, więc ta sama domena ma inny DR i inny DA. Porównuj domeny w jednej metryce.' },
  { id: 'jaki-dr-jest-dobry', question: 'Jaki DR jest dobry?', answer: 'Zależy od konkurencji. W lokalnych usługach często wystarcza DR kilkanaście, w ogólnopolskich frazach e-commerce konkurenci mają zwykle dużo więcej. Dlatego narzędzie pozwala porównać się z konkurentami, a nie z abstrakcyjnym progiem.' },
  { id: 'jak-podniesc-dr', question: 'Jak podnieść Domain Rating?', answer: 'Zdobywając linki z serwisów, które same mają wysoki DR i są powiązane z Twoją branżą: media branżowe, partnerzy, katalogi z moderacją, badania i treści, które inni chętnie cytują. Kupowanie masowych linków podnosi DR na chwilę i grozi karą Google.' },
  { id: 'czy-dr-wplywa-na-pozycje', question: 'Czy DR wpływa na pozycje w Google?', answer: 'Google nie używa DR. To miara Ahrefs, która dobrze oddaje siłę linków prowadzących do domeny, a linki są jednym z czynników rankingu Google. DR jest więc wskaźnikiem, a nie przyczyną pozycji.' },
];

export function AutorytetStrona() {
  return (
    <Uklad
      slug="autorytet-domeny"
      tag="Darmowe narzędzie"
      schema={{ name: 'Sprawdzanie autorytetu domeny (Domain Rating)', description: 'Bezpłatne sprawdzenie Domain Rating (DR) z bazy Ahrefs: siła profilu linków domeny w skali 0-100 i porównanie z konkurentami.', category: 'BusinessApplication' }}
      odpowiedz="Autorytet domeny to ocena siły profilu linków prowadzących do strony, w skali od 0 do 100. Narzędzie pokazuje Domain Rating (DR) z bazy Ahrefs, czyli najpopularniejszy odpowiednik Domain Authority (DA) z Moz. Wynik dostajesz od razu i za darmo, a po podaniu e-maila porównasz się z maksymalnie trzema konkurentami."
      faq={FAQ_AUTORYTETU}
      tytulFaq="Pytania o autorytet domeny"
    >
      <AutorytetClient />
      <Sekcja id="co-to-jest-dr" tytul="Co to jest Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating to metryka Ahrefs, która porównuje profil linków danej domeny z profilami wszystkich domen w bazie Ahrefs. Liczy się liczba unikalnych domen linkujących i ich własny DR, a nie sama liczba linków. Skala jest logarytmiczna: przejście z DR 20 na 30 jest łatwiejsze niż z 60 na 70.</p>
        <p style={s.akapit}>Wartość pochodzi z darmowego interfejsu Ahrefs i jest podpisana zgodnie z licencją: Domain Rating by Ahrefs. Nie zapisujemy jej w żadnym rankingu.</p>
      </Sekcja>
      <Sekcja id="jak-uzyc-dr" tytul="Jak użyć wyniku">
        <ul style={s.lista}>
          <li>Porównaj swój DR z firmami, które są w TOP 10 na Twoje najważniejsze frazy. Duża różnica oznacza, że sama treść może nie wystarczyć.</li>
          <li>Sprawdzaj DR co kwartał. Spadek zwykle oznacza utracone linki, np. po zamknięciu serwisu partnera.</li>
          <li>Przy wyborze miejsc na publikacje sprawdzaj DR serwisu: link z mocnej, powiązanej tematycznie strony jest wart więcej niż dziesiątki słabych.</li>
        </ul>
      </Sekcja>
      <PozostaleNarzedzia bez="autorytet-domeny" />
    </Uklad>
  );
}

// --- Kalkulator --------------------------------------------------------------------------------

const FAQ_KALKULATORA = [
  { id: 'skad-widelki', question: 'Skąd widełki zamiast jednej kwoty?', answer: 'Badania CTR mocno się różnią: według First Page Sage pierwsza pozycja w Google zbiera 39,8% kliknięć, według badania GrowthSRC z 2025 roku 19%. Liczymy oba warianty, żeby nie zawyżać wyniku i nie obiecywać jednej liczby.' },
  { id: 'skad-dane-o-ai', question: 'Skąd dane o wpływie AI?', answer: 'Wpływ przeglądów AI w Google bierzemy z badania Pew Research Center (marzec 2025): przy podsumowaniu AI użytkownicy klikali w wynik w 8% wizyt, bez niego w 15%, a podsumowanie pojawiło się przy 18% wyszukiwań. Udział pytań zadawanych asystentom AI ustawiasz sam; domyślne 25% to prognoza Gartnera.' },
  { id: 'czy-wynik-to-gwarancja', question: 'Czy wynik to gwarancja zysku po pozycjonowaniu?', answer: 'Nie. To szacunek potencjału przy pozycjach w TOP 3 i obecności w odpowiedziach AI, policzony z Twoich danych. Ile z niego da się odzyskać, zależy od konkurencji, budżetu i jakości strony.' },
  { id: 'gdzie-sprawdzic-wyszukiwania', question: 'Skąd wziąć liczbę wyszukiwań?', answer: 'Z Planera słów kluczowych Google Ads (bezpłatny po założeniu konta) albo z narzędzi SEO. Zsumuj miesięczne wyszukiwania kilku głównych fraz, np. „usługa + miasto”. Ruch z Google sprawdzisz w Google Search Console.' },
];

export function KalkulatorStrona() {
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  return (
    <Uklad
      slug="kalkulator-strat-seo"
      tag="Darmowy kalkulator"
      schema={{ name: 'Kalkulator strat bez SEO i widoczności w AI', description: 'Bezpłatny kalkulator: szacuje, ile zysku miesięcznie traci firma bez pozycji w TOP 3 Google i bez poleceń w odpowiedziach AI, na podstawie jej danych i badań CTR.', category: 'FinanceApplication' }}
      odpowiedz="Kalkulator szacuje, ile zysku miesięcznie trafia do konkurencji, gdy Twojej firmy nie ma w TOP 3 Google i w odpowiedziach ChatGPT czy Gemini. Liczy z Twoich danych: liczby wyszukiwań, obecnego ruchu, konwersji, wartości klienta i marży, oraz z jawnych założeń z badań CTR i wpływu przeglądów AI. Wynik podaje w widełkach."
      faq={FAQ_KALKULATORA}
      tytulFaq="Pytania o kalkulator strat"
    >
      <KalkulatorClient />
      <Sekcja id="jak-liczymy" tytul="Jak liczymy stratę">
        <ol style={s.lista}>
          <li><strong>Potencjał w Google:</strong> wyszukiwania pomniejszone o część, która trafia do asystentów AI, razy średni CTR pozycji 1-3: {(Math.round(ZALOZENIA.ctrTop3.ostrozny * 1000) / 10).toLocaleString('pl-PL')}% w wariancie ostrożnym i {(Math.round(ZALOZENIA.ctrTop3.optymistyczny * 1000) / 10).toLocaleString('pl-PL')}% w optymistycznym.</li>
          <li><strong>Przeglądy AI w Google:</strong> przy {Math.round(ZALOZENIA.aio.udzialWyszukiwan * 100)}% wyszukiwań kliknięcia spadają z {Math.round(ZALOZENIA.aio.ctrBez * 100)}% do {Math.round(ZALOZENIA.aio.ctrZ * 100)}% wizyt, więc obniżamy CTR proporcjonalnie.</li>
          <li><strong>Strata w Google</strong> to potencjał minus Twój obecny ruch z Google (nie mniej niż zero).</li>
          <li><strong>Strata w AI:</strong> część pytań zadawanych asystentom AI razy ten sam CTR, jeśli modele nie polecają dziś Twojej firmy.</li>
          <li><strong>Zysk:</strong> utracone wizyty razy konwersja, wartość klienta i marża.</li>
        </ol>
        <p style={s.akapit}>Chcesz wiedzieć, ile kosztuje odzyskanie tego ruchu? Ceny pakietów są w <Link href={cennik} style={s.podkreslenie}>cenniku pozycjonowania</Link>, a widoczność w AI sprawdzisz w <Link href={hrefAudytuAi()} style={s.podkreslenie}>audycie widoczności w AI</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="kalkulator-strat-seo" />
    </Uklad>
  );
}

// --- Makieta redesignu ------------------------------------------------------------------------

const FAQ_MAKIETY = [
  { id: 'jak-powstaje-makieta', question: 'Jak powstaje makieta?', answer: 'Pobieramy Twoją stronę główną, wyciągamy z niej treści (nazwę, nagłówki, menu, opisy usług, kontakt i kolory) i robimy zrzut obecnego wyglądu. Model AI Claude projektuje z tego nowy układ strony głównej. Nie wymyśla liczb, opinii, nagród ani cen: używa tylko treści z Twojej strony.' },
  { id: 'czy-moge-uzyc-makiety', question: 'Czy mogę wdrożyć makietę?', answer: 'Makieta to propozycja wyglądu, a nie gotowa strona. Pokazuje kierunek: układ sekcji, hierarchię i kolory. Przed wdrożeniem trzeba ją dopasować do marki i zdjęć oraz zadbać o SEO: adresy, nagłówki, szybkość i dane strukturalne.' },
  { id: 'czy-makieta-jest-bezpieczna', question: 'Czy makieta zmienia coś na mojej stronie?', answer: 'Nie. Tylko czytamy publiczną stronę główną, tak jak przeglądarka. Makieta jest osobnym plikiem bez skryptów, wyświetlanym w zamkniętej ramce, a pełna wersja jest dostępna pod linkiem z maila przez 60 dni.' },
  { id: 'ile-kosztuje-nowa-strona', question: 'Ile kosztuje nowa strona według makiety?', answer: 'Zależy od liczby podstron, integracji i treści. Zakres i ceny projektowania stron opisujemy na stronie projektowania, a wycenę przygotujemy po krótkiej rozmowie.' },
];

export function MakietaStrona() {
  const projektowanie = hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
  return (
    <Uklad
      slug="makieta-redesignu"
      tag="Darmowe narzędzie"
      schema={{ name: 'Makieta redesignu strony z AI', description: 'Bezpłatny generator makiety: z adresu obecnej strony tworzy propozycję nowego wyglądu strony głównej na komputer i telefon, z treści firmy.', category: 'DesignApplication' }}
      odpowiedz="Wpisz adres swojej strony, a w 1 do 3 minut zobaczysz propozycję nowej strony głównej: układ sekcji, typografię, kolory i wersję na telefon, zbudowane z treści, które już masz. Pierwszy ekran pokazujemy od razu, całą makietę po podaniu e-maila."
      faq={FAQ_MAKIETY}
      tytulFaq="Pytania o makietę redesignu"
    >
      <MakietaClient />
      <Sekcja id="kiedy-redesign" tytul="Kiedy warto zmienić wygląd strony">
        <ul style={s.lista}>
          <li>Strona źle wygląda na telefonie albo trzeba ją powiększać palcami.</li>
          <li>Klient w pierwszym ekranie nie widzi, co robisz, dla kogo i jak się z Tobą skontaktować.</li>
          <li>Strona ładuje się wolno, a audyt pokazuje niską wydajność na telefonie.</li>
          <li>Wygląd odstaje od konkurencji i od tego, jak firma pracuje dziś.</li>
        </ul>
        <p style={s.akapit}>Makieta pomaga zobaczyć kierunek, zanim wydasz pieniądze. Gdy chcesz go wdrożyć, zobacz, jak pracujemy przy <Link href={projektowanie} style={s.podkreslenie}>projektowaniu stron internetowych</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="makieta-redesignu" />
    </Uklad>
  );
}

export { ZRODLA_KALKULATORA };
