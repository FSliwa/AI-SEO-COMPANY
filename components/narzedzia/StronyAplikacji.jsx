// Strony czterech darmowych aplikacji pod /narzedzia/<slug> (9.11.2026): audyt SEO, autorytet domeny,
// kalkulator strat, makieta redesignu. Komponenty serwerowe: treść, schema i okruszki; interaktywna
// część to *Client.jsx. Wspólny układ jak generator llms.txt (styl.js), bramka e-mail w BramkaEmail.jsx.
// Liczby w treści: tylko z działania narzędzi (limity, zakres) albo ze źródeł z datą odczytu.
// 9.11.2026: prop locale ('pl' | 'en') w każdej stronie; wersja EN to osobne komponenty *En poniżej
// (treść i JSON-LD po angielsku), a PL zostaje bez zmian. Klienckie *Client.jsx czytają język same (useLocale).

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
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { hrefWJezyku } from '@/lib/linkiEn';
import { ZRODLA_KALKULATORA, ZALOZENIA } from '@/lib/kalkulatorStrat';
import AudytSeoClient from './AudytSeoClient';
import AutorytetClient from './AutorytetClient';
import KalkulatorClient from './KalkulatorClient';
import MakietaClient from './MakietaClient';
import * as s from './styl';

function Uklad({ slug, tag, schema, odpowiedz, children, faq, tytulFaq, locale = 'pl' }) {
  const en = locale === 'en';
  const strona = en ? stronaNarzedziaL(slug, 'en') : stronaNarzedzia(slug);
  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema name={schema.name} description={schema.description} url={en ? `${BASE}${hrefWJezyku(`/narzedzia/${slug}`, 'en')}` : `${BASE}/narzedzia/${slug}`} category={schema.category} {...(en ? { language: 'en' } : {})} />
      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {tag}
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>{odpowiedz}</AnswerBox>
          {children}
        </div>
      </section>
      <AppleFaq faqData={faq} title={tytulFaq} sectionId="pytania" />
      {strona.sources.length > 0 && (
        <section style={{ paddingBottom: '4rem' }}>
          <div className="container" style={s.kontener}>
            <Zrodla zrodla={strona.sources} {...(en ? { en: true } : {})} />
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

function PozostaleNarzedzia({ bez, locale = 'pl' }) {
  const en = locale === 'en';
  const hub = hrefJesliOpublikowana(SCIEZKA_HUBA);
  const linki = (en ? [
    ['audyt-seo', 'Free SEO audit'],
    ['autorytet-domeny', 'Domain authority'],
    ['kalkulator-strat-seo', 'SEO loss calculator'],
    ['makieta-redesignu', 'Website mockup'],
    ['generator-llms-txt', 'llms.txt generator'],
  ] : [
    ['audyt-seo', 'Darmowy audyt SEO'],
    ['autorytet-domeny', 'Autorytet domeny'],
    ['kalkulator-strat-seo', 'Kalkulator strat bez SEO'],
    ['makieta-redesignu', 'Makieta nowej strony'],
    ['generator-llms-txt', 'Generator llms.txt'],
  ]).filter(([slug]) => slug !== bez).map(([slug, nazwa]) => [hrefJesliOpublikowana(`/narzedzia/${slug}`), nazwa]).filter(([href]) => href);
  if (!linki.length && !hub) return null;
  return (
    <section aria-labelledby={en ? 'more-tools' : 'inne-narzedzia'} style={{ ...s.sekcja, ...s.karta }}>
      <h2 id={en ? 'more-tools' : 'inne-narzedzia'} style={{ ...s.h2, marginBottom: '0.75rem' }}>{en ? 'More free tools' : 'Inne darmowe narzędzia'}</h2>
      <ul style={s.lista}>
        {linki.map(([href, nazwa]) => <li key={href}><Link href={href} style={s.podkreslenie}>{nazwa}</Link></li>)}
        {hub && <li><Link href={hub} style={s.podkreslenie}>{en ? 'All tools and templates' : 'Wszystkie narzędzia i szablony'}</Link></li>}
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

export function AudytSeoStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AudytSeoEn />;
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

export function AutorytetStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AutorytetEn />;
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

export function KalkulatorStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <KalkulatorEn />;
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

export function MakietaStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <MakietaEn />;
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

// =============================== Wersja EN (/en/tools/<slug>) ===============================
// Te same fakty, liczby i limity co w PL; po angielsku, z jawnym kontekstem polskim tam, gdzie
// narzędzie od niego zależy (Google.pl, rynek polski). Linki <Link> z PL kluczami (Link tłumaczy je na EN).

const FAQ_AUDYTU_EN = [
  { id: 'is-the-free-seo-audit-really-free', question: 'Is the free SEO audit really free?', answer: 'Yes. You see the score, the categories and the three most important problems right away, with no sign-up. We show the full list of problems with page URLs after you give an email address, which we also send the report to. Signing up for the newsletter is separate and voluntary.' },
  { id: 'how-is-the-score-calculated', question: 'How do you calculate the SEO score from 1 to 100?', answer: 'Each rule has a weight. For page-level rules the penalty grows with the share of pages that have the problem; for site-wide rules it is all or nothing. The score is 35% the technical category, 30% content, 20% performance (including the mobile PageSpeed Insights result) and 15% AI readiness.' },
  { id: 'free-audit-vs-paid-audit', question: 'How does the free audit differ from a paid SEO audit?', answer: 'The free audit automatically checks up to 25 pages and about 35 rules. A paid SEO audit covers the whole website, keywords, competitors, the link profile and Search Console data, and its result is a plan of changes with priorities and a quote.' },
  { id: 'does-the-audit-load-my-website', question: 'Does the audit put a load on my website?', answer: 'No. We fetch up to 25 pages, a few at a time, with a self-identifying robot called AISEOCompanyAudit. That is less than a single visit from a search engine. We do not submit forms and we do not log in.' },
];

function AudytSeoEn() {
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  return (
    <Uklad
      locale="en"
      slug="audyt-seo"
      tag="Free tool"
      schema={{ name: 'Free website SEO audit', description: 'A free SEO audit: it checks up to 25 pages, robots.txt, the sitemap, speed in PageSpeed Insights and AI readiness, then gives a 1-100 score and a list of errors with fix instructions.', category: 'BusinessApplication' }}
      odpowiedz="The free SEO audit checks up to 25 pages of your website: response codes, redirects, titles, descriptions, headings, content, images, structured data, robots.txt, the sitemap, mobile speed and AI bot access. The result is a score from 1 to 100 across four categories and a list of problems with fix instructions."
      faq={FAQ_AUDYTU_EN}
      tytulFaq="Questions about the free SEO audit"
    >
      <AudytSeoClient />
      <Sekcja id="what-the-audit-checks" tytul="What the free SEO audit checks">
        <ul style={s.lista}>
          <li><strong>Technical:</strong> HTTPS and redirects, www and non-www versions, 4xx and 5xx errors, redirect chains, canonical URLs, noindex, the lang attribute, the meta viewport tag, broken internal links, robots.txt and the sitemap.</li>
          <li><strong>Content:</strong> titles and meta descriptions (missing, length, duplicates), H1 headings, amount of text, image alt text and Open Graph tags.</li>
          <li><strong>Performance:</strong> the mobile Lighthouse score from Google PageSpeed Insights, LCP and CLS (from real-user data, if the site has it), server response time and HTML size.</li>
          <li><strong>AI readiness:</strong> whether robots.txt lets in the GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended bots, your company structured data (Organization or LocalBusiness) and an llms.txt file{llms ? <> (you can create one in the <Link href={llms} style={s.podkreslenie}>llms.txt generator</Link>)</> : null}.</li>
        </ul>
      </Sekcja>
      <Sekcja id="how-to-read-the-score" tytul="How to read the score">
        <p style={s.akapit}>A score of 80 or more means the basics are fine and it is worth focusing on content and links. From 50 to 79 there are problems that genuinely limit visibility: start with errors, then warnings. Below 50 the site has technical gaps that may stop Google from indexing it or make it show worse than your competitors.</p>
        <p style={s.akapit}>The score is not a Google ranking. It shows how many obstacles stand in your site’s way. Rankings also depend on content, links and competitors, which we check in a <Link href={audyt} style={s.podkreslenie}>full SEO audit</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="audyt-seo" locale="en" />
    </Uklad>
  );
}

const FAQ_AUTORYTETU_EN = [
  { id: 'dr-vs-da', question: 'How does DR differ from DA?', answer: 'Domain Rating (DR) is an Ahrefs metric and Domain Authority (DA) is a Moz metric. Both rate the strength of a link profile on a 0-100 scale and both are logarithmic, but they are calculated from different link databases, so the same domain has a different DR and a different DA. Compare domains using one metric.' },
  { id: 'what-is-a-good-dr', question: 'What is a good DR?', answer: 'It depends on your competitors. For local services a DR in the low teens is often enough; for nationwide e-commerce keywords in Poland, competitors usually have much more. That is why the tool lets you compare yourself with competitors rather than with an abstract threshold.' },
  { id: 'how-to-raise-domain-rating', question: 'How do I raise Domain Rating?', answer: 'By earning links from sites that have a high DR themselves and are related to your industry: trade media, partners, moderated directories, and research and content that others like to cite. Buying links in bulk raises DR for a moment and risks a Google penalty.' },
  { id: 'does-dr-affect-google-rankings', question: 'Does DR affect Google rankings?', answer: 'Google does not use DR. It is an Ahrefs measure that reflects well the strength of the links pointing to a domain, and links are one of Google’s ranking factors. So DR is an indicator, not the cause of a ranking.' },
];

function AutorytetEn() {
  return (
    <Uklad
      locale="en"
      slug="autorytet-domeny"
      tag="Free tool"
      schema={{ name: 'Domain authority checker (Domain Rating)', description: 'A free check of Domain Rating (DR) from the Ahrefs database: the strength of a domain’s link profile on a 0-100 scale, with a comparison against competitors.', category: 'BusinessApplication' }}
      odpowiedz="Domain authority is a rating of the strength of the link profile pointing to a website, on a scale from 0 to 100. The tool shows Domain Rating (DR) from the Ahrefs database, the most popular counterpart of Moz’s Domain Authority (DA). You get the result right away and for free, and after you give an email address you can compare yourself with up to three competitors."
      faq={FAQ_AUTORYTETU_EN}
      tytulFaq="Questions about domain authority"
    >
      <AutorytetClient />
      <Sekcja id="what-is-domain-rating" tytul="What is Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating is an Ahrefs metric that compares a domain’s link profile with the profiles of all domains in the Ahrefs database. What counts is the number of unique linking domains and their own DR, not the raw number of links. The scale is logarithmic: moving from DR 20 to 30 is easier than from 60 to 70.</p>
        <p style={s.akapit}>The value comes from the free Ahrefs interface and is credited as the license requires: Domain Rating by Ahrefs. We do not store it in any ranking.</p>
      </Sekcja>
      <Sekcja id="how-to-use-the-result" tytul="How to use the result">
        <ul style={s.lista}>
          <li>Compare your DR with companies that rank in the top 10 for your most important keywords. A big gap means content alone may not be enough.</li>
          <li>Check DR every quarter. A drop usually means lost links, for example after a partner’s site shuts down.</li>
          <li>When choosing places to publish, check the site’s DR: a link from a strong, thematically related site is worth more than dozens of weak ones.</li>
        </ul>
      </Sekcja>
      <PozostaleNarzedzia bez="autorytet-domeny" locale="en" />
    </Uklad>
  );
}

const FAQ_KALKULATORA_EN = [
  { id: 'why-a-range', question: 'Why a range instead of a single amount?', answer: 'CTR studies differ a lot: according to First Page Sage the first position in Google gets 39.8% of clicks, while according to a 2025 GrowthSRC study it gets 19%. We calculate both variants so we do not inflate the result or promise a single number.' },
  { id: 'where-does-the-ai-data-come-from', question: 'Where does the data on the impact of AI come from?', answer: 'We take the impact of Google AI Overviews from a Pew Research Center study (March 2025): with an AI summary users clicked a result in 8% of visits, without one in 15%, and a summary appeared for 18% of searches. You set the share of questions asked to AI assistants yourself; the default 25% is a Gartner forecast.' },
  { id: 'is-the-result-a-profit-guarantee', question: 'Is the result a guarantee of profit after SEO?', answer: 'No. It is an estimate of potential at top 3 positions and presence in AI answers, calculated from your data. How much of it you can recover depends on competition, budget and the quality of your website.' },
  { id: 'where-to-find-search-volume', question: 'Where do I get the number of searches?', answer: 'From Google Ads Keyword Planner (free once you have an account) or from SEO tools. Add up the monthly searches of a few main keywords, for example “service + city”. You can check your Google traffic in Google Search Console.' },
];

function KalkulatorEn() {
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  return (
    <Uklad
      locale="en"
      slug="kalkulator-strat-seo"
      tag="Free calculator"
      schema={{ name: 'Calculator: profit lost without SEO and AI visibility', description: 'A free calculator that estimates how much profit a business loses each month without top 3 Google positions and without recommendations in AI answers, based on its data and CTR studies.', category: 'FinanceApplication' }}
      odpowiedz="The calculator estimates how much profit goes to competitors each month when your business is not in Google’s top 3 or in ChatGPT and Gemini answers. It uses your data: the number of searches, current traffic, conversion rate, customer value and margin, plus open assumptions from CTR studies and the impact of AI Overviews. The result is given as a range."
      faq={FAQ_KALKULATORA_EN}
      tytulFaq="Questions about the loss calculator"
    >
      <KalkulatorClient />
      <Sekcja id="how-we-calculate" tytul="How we calculate the loss">
        <ol style={s.lista}>
          <li><strong>Potential in Google:</strong> searches minus the share that goes to AI assistants, times the average CTR of positions 1-3: {(Math.round(ZALOZENIA.ctrTop3.ostrozny * 1000) / 10).toLocaleString('en-US')}% in the cautious variant and {(Math.round(ZALOZENIA.ctrTop3.optymistyczny * 1000) / 10).toLocaleString('en-US')}% in the optimistic one.</li>
          <li><strong>Google AI Overviews:</strong> for {Math.round(ZALOZENIA.aio.udzialWyszukiwan * 100)}% of searches, clicks fall from {Math.round(ZALOZENIA.aio.ctrBez * 100)}% to {Math.round(ZALOZENIA.aio.ctrZ * 100)}% of visits, so we lower CTR proportionally.</li>
          <li><strong>Loss in Google</strong> is the potential minus your current Google traffic (never less than zero).</li>
          <li><strong>Loss in AI:</strong> the share of questions asked to AI assistants times the same CTR, if the models do not recommend your business today.</li>
          <li><strong>Profit:</strong> lost visits times conversion rate, customer value and margin.</li>
        </ol>
        <p style={s.akapit}>Want to know what it costs to win that traffic back? Package prices are in the <Link href={cennik} style={s.podkreslenie}>SEO pricing</Link>, and you can check your AI visibility in the <Link href={hrefAudytuAi()} style={s.podkreslenie}>AI visibility audit</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="kalkulator-strat-seo" locale="en" />
    </Uklad>
  );
}

const FAQ_MAKIETY_EN = [
  { id: 'how-is-the-mockup-made', question: 'How is the mockup made?', answer: 'We fetch your homepage, extract its content (name, headings, menu, service descriptions, contact details and colors) and take a screenshot of how it looks now. The Claude AI model designs a new homepage layout from that. It does not invent numbers, reviews, awards or prices: it only uses content from your website.' },
  { id: 'can-i-use-the-mockup', question: 'Can I put the mockup live?', answer: 'The mockup is a proposal for the look, not a finished website. It shows a direction: the section layout, hierarchy and colors. Before launch it has to be adapted to your brand and photos, and you need to take care of SEO: URLs, headings, speed and structured data.' },
  { id: 'is-the-mockup-safe', question: 'Does the mockup change anything on my website?', answer: 'No. We only read the public homepage, the way a browser does. The mockup is a separate file with no scripts, shown in a sandboxed frame, and the full version is available through the link in the email for 60 days.' },
  { id: 'how-much-does-a-new-website-cost', question: 'How much does a new website based on the mockup cost?', answer: 'It depends on the number of pages, integrations and content. We describe the scope and prices of web design on the web design page, and we prepare a quote after a short conversation.' },
];

function MakietaEn() {
  const projektowanie = hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
  return (
    <Uklad
      locale="en"
      slug="makieta-redesignu"
      tag="Free tool"
      schema={{ name: 'AI website redesign mockup', description: 'A free mockup generator: from the address of your current website it creates a proposal for a new homepage design on desktop and mobile, built from your business’s content.', category: 'DesignApplication' }}
      odpowiedz="Free website redesign mockup: enter your website address and in 1 to 3 minutes you will see a proposal for a new homepage: the section layout, typography, colors and a mobile version, built from the content you already have. We show the first screen right away and the whole mockup after you give an email address."
      faq={FAQ_MAKIETY_EN}
      tytulFaq="Questions about the redesign mockup"
    >
      <MakietaClient />
      <Sekcja id="when-to-redesign" tytul="When it is worth changing how your website looks">
        <ul style={s.lista}>
          <li>The site looks bad on a phone or has to be zoomed with your fingers.</li>
          <li>On the first screen a customer cannot see what you do, who for and how to contact you.</li>
          <li>The site loads slowly and an audit shows low mobile performance.</li>
          <li>The look lags behind your competitors and behind how the business works today.</li>
        </ul>
        <p style={s.akapit}>A mockup helps you see a direction before you spend money. When you want to put it live, see how we work on <Link href={projektowanie} style={s.podkreslenie}>web design</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="makieta-redesignu" locale="en" />
    </Uklad>
  );
}

export { ZRODLA_KALKULATORA };
