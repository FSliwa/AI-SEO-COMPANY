// 23.11.2026: SEO techniczne - dane strukturalne, JavaScript, hreflang i migracje (tylko PL, dokument AISEO_SEO_techniczne_1).
// Artykuł tylko-PL (plOnly w lib/blogPosts.js, 308 /en/blog/<slug> -> /blog/<slug> w next.config.mjs).
// Fraza główna: „seo techniczne”. Frazy „dane strukturalne” i „migracja strony” należą do szablonów
// /narzedzia/dane-strukturalne-json-ld i /narzedzia/checklista-migracji-strony (seo/frazy-pl.csv),
// a „audyt techniczny seo” do /blog/audyt-techniczny-seo, dlatego artykuł linkuje do nich jako do
// stron docelowych tych fraz, zamiast z nimi konkurować.
// Fakty zewnętrzne: źródła pierwotne z listy ZRODLA. Wycofanie wyników FAQ (7.05.2026) i stanowisko
// Google wobec llms.txt sprawdzone 23.11.2026.
import { articleLanguages, articleRobots, blogPosts } from '@/lib/blogPosts';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { LASTMOD } from '@/lib/lastmod';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ArticleSchema from '@/components/ArticleSchema';
import ArticleTOC from '@/components/ArticleTOC';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import Zrodla from '@/components/Zrodla';
import BlogCTA from '@/components/BlogCTA';
import { Link } from '@/i18n/routing';

const BASE = 'https://www.ai-seo-company.pl';
const SCIEZKA = '/blog/seo-techniczne-dane-strukturalne-javascript-hreflang';
const URL_STRONY = `${BASE}${SCIEZKA}`;

// Title (56 zn.) i meta (140 zn.): te same wartości co titlePl/descPl w lib/blogPosts.js.
const TYTUL = 'SEO techniczne: dane strukturalne, JavaScript i hreflang';
const OPIS = 'SEO techniczne w praktyce: dane strukturalne Schema.org, renderowanie JavaScript, hreflang i plan migracji strony bez utraty ruchu z Google.';
const H1 = 'SEO techniczne: dane strukturalne, JavaScript, hreflang i migracje';

const DATA_PUBLIKACJI = blogPosts.find((p) => p.slug === SCIEZKA)?.date ?? '2026-11-23';
const DATA_ZMIANY = LASTMOD[URL_STRONY] ?? DATA_PUBLIKACJI;

const PODPIS_TABELI = { captionSide: 'bottom', textAlign: 'left', fontSize: '0.85rem', color: 'var(--w-tusz-2)', paddingTop: '0.5rem' };

const W_SKROCIE = [
  ['Najpierw dostępność, potem treść', 'Strona musi być możliwa do pobrania, wyrenderowania i zaindeksowania, zanim jej jakość zacznie mieć znaczenie.'],
  ['Robots.txt nie służy do deindeksacji', 'Blokada w robots.txt ogranicza pobieranie, ale do wykluczenia strony z indeksu służy noindex.'],
  ['Canonical wskazuje wersję preferowaną', 'Jeden adres kanoniczny na stronę, zgodny z linkowaniem wewnętrznym i mapą witryny.'],
  ['Dane strukturalne w JSON-LD', 'Google zaleca format JSON-LD, a znaczniki muszą odpowiadać treści widocznej dla użytkownika.'],
  ['Kluczowe treści w HTML', 'Linki jako elementy a z atrybutem href, a ważne treści dostępne po renderowaniu lub już w kodzie z serwera.'],
  ['Hreflang działa tylko wzajemnie', 'Każda wersja językowa wskazuje siebie i pozostałe wersje, a brak odnośników zwrotnych unieważnia oznaczenia.'],
  ['Migracja wymaga mapy URL', 'Przekierowania 301 lub 308 jeden do jednego, utrzymywane możliwie długo, zwykle co najmniej rok.'],
  ['Core Web Vitals mają progi', 'LCP do 2,5 s, INP do 200 ms, CLS do 0,1, mierzone na danych od realnych użytkowników.'],
];

const TYPY_SCHEMA = [
  ['Organization', 'Nazwa, logo, dane kontaktowe, profile marki', 'Strona główna lub strona O nas'],
  ['LocalBusiness', 'Adres, godziny otwarcia, obszar działania', 'Strony lokalizacji firmy'],
  ['Article / BlogPosting', 'Tytuł, autor, data publikacji i aktualizacji', 'Wpisy blogowe, poradniki'],
  ['BreadcrumbList', 'Ścieżka nawigacyjna strony', 'Wszystkie podstrony z okruszkami'],
  ['Product i Offer', 'Cena, dostępność, warianty', 'Karty produktów w sklepie'],
  ['Review / AggregateRating', 'Opinie i oceny', 'Tylko tam, gdzie opinie są widoczne i zgodne z wytycznymi'],
  ['Event', 'Termin, miejsce, bilety', 'Strony wydarzeń i szkoleń'],
];

const BLEDY_HREFLANG = [
  ['Brak odnośnika zwrotnego', 'Google ignoruje parę stron', 'Dodaj wzajemne oznaczenia na obu wersjach'],
  ['Sam kod kraju bez języka, np. DE', 'Oznaczenie nie jest obsługiwane', 'Zawsze zaczynaj od kodu języka, np. de-DE'],
  ['Kod UK zamiast GB', 'Kod zarezerwowany jest ignorowany', 'Użyj kodu z ISO 3166-1 Alpha-2, czyli en-GB'],
  ['Hreflang wskazuje adres z przekierowaniem lub noindex', 'Sygnał jest osłabiony lub pomijany', 'Wskazuj tylko kanoniczne adresy z kodem 200'],
  ['Canonical na inną wersję językową', 'Wersje konkurują o jeden adres', 'Każda wersja kanoniczna sama do siebie'],
  ['Tagi poza sekcją head lub w niepoprawnym HTML', 'Oznaczenia nie są odczytywane', 'Popraw strukturę head lub przenieś hreflang do mapy witryny'],
];

const ETAPY_MIGRACJI = [
  ['Przed migracją', 'Crawl starego serwisu, mapa URL stary-nowy, kopia stanu wyjściowego, testy na środowisku testowym, weryfikacja obu wersji w Search Console'],
  ['W trakcie', 'Przekierowania 301 lub 308 jeden do jednego, usunięcie blokad testowych, nowa mapa witryny, narzędzie zmiany adresu przy zmianie domeny'],
  ['Po migracji', 'Monitoring 404 i indeksacji, porównanie ruchu z kopią stanu, aktualizacja linków wewnętrznych i zewnętrznych, utrzymanie przekierowań co najmniej rok'],
];

const PROGI_CWV = [
  ['LCP', 'Czas wyświetlenia największego elementu treści', 'do 2,5 s', '2,5-4 s', 'powyżej 4 s'],
  ['INP', 'Opóźnienie reakcji na interakcje', 'do 200 ms', '200-500 ms', 'powyżej 500 ms'],
  ['CLS', 'Nieoczekiwane przesunięcia układu', 'do 0,1', '0,1-0,25', 'powyżej 0,25'],
];

const OBSZARY_AUDYTU = [
  ['Dostępność dla robotów', 'Reguły robots.txt, blokady zasobów CSS i JS', 'Raport robots.txt w Search Console, crawler'],
  ['Indeksacja', 'Strony wykluczone, noindex, soft 404', 'Raport indeksowania stron, narzędzie sprawdzania adresu URL'],
  ['Kanonikalizacja', 'Spójność canonical, linków i mapy witryny', 'Crawler, narzędzie sprawdzania adresu URL'],
  ['Dane strukturalne', 'Błędy, ostrzeżenia, zgodność z treścią', 'Test wyników z elementami rozszerzonymi, Schema Markup Validator'],
  ['JavaScript', 'Treść i linki w wyrenderowanym HTML', 'Narzędzie sprawdzania adresu URL, crawler z renderowaniem'],
  ['Hreflang', 'Odnośniki zwrotne, kody języków, x-default', 'Crawler, ręczna kontrola kodu'],
  ['Wydajność', 'LCP, INP, CLS na danych terenowych', 'Raport Podstawowe wskaźniki internetowe, PageSpeed Insights'],
  ['Przekierowania', 'Łańcuchy, pętle, przekierowania tymczasowe', 'Crawler, logi serwera'],
];

// FAQ: jedno źródło dla widocznego tekstu i FAQPage.
const FAQ = [
  {
    pytanie: 'Jak często wykonywać audyt SEO technicznego?',
    odpowiedz: 'Pełny przegląd warto przeprowadzać okresowo oraz zawsze przed i po większych zmianach, takich jak nowy szablon, platforma czy struktura adresów. Między audytami wystarczy regularnie monitorować raporty w Search Console. Duże serwisy z częstymi wdrożeniami korzystają też z automatycznego monitoringu.',
  },
  {
    pytanie: 'Czy dane strukturalne wpływają bezpośrednio na pozycje w Google?',
    odpowiedz: 'Google nie przedstawia ich jako czynnika rankingowego. Ich rolą jest ułatwienie zrozumienia treści i umożliwienie wyników rozszerzonych, które mogą zwiększyć atrakcyjność wyniku. Nie zastępują jednak wartościowej treści ani poprawnej indeksacji.',
  },
  {
    pytanie: 'Czy trzeba usunąć znaczniki FAQPage po wycofaniu wyników rozszerzonych FAQ?',
    odpowiedz: 'Nie ma takiej potrzeby. Google w dokumentacji zaznacza, że znaczniki FAQ można zostawić albo usunąć bez wpływu na widoczność. Warto jednak przestać traktować je jako sposób na dodatkowe miejsce w wynikach Google. Mogą nadal porządkować treść i bywają odczytywane przez inne systemy.',
  },
  {
    pytanie: 'Czym różni się słownik Schema.org od wyników rozszerzonych Google?',
    odpowiedz: 'Schema.org to otwarty słownik setek typów i właściwości, z którego korzystają różne wyszukiwarki i aplikacje. Google obsługuje tylko część z nich w formie wyników rozszerzonych i ma własne wymagania dotyczące właściwości. Poprawny znacznik zgodny ze słownikiem nie musi więc dawać wyniku rozszerzonego w Google.',
  },
  {
    pytanie: 'Jak Google radzi sobie ze stronami zbudowanymi w React lub Vue?',
    odpowiedz: 'Google renderuje JavaScript, ale robi to w osobnym etapie po pobraniu strony. Problemy pojawiają się, gdy linki nie są elementami a z atrybutem href, treść ładuje się po interakcji albo skrypty zmieniają meta tagi. Renderowanie po stronie serwera znacząco zmniejsza te ryzyka.',
  },
  {
    pytanie: 'Kiedy hreflang jest potrzebny przy osobnych domenach krajowych?',
    odpowiedz: 'Praktycznie zawsze, gdy treści odpowiadają sobie między domenami. Domena krajowa jest silnym sygnałem kierowania na dany kraj, ale hreflang nadal pomaga Google powiązać odpowiadające sobie strony w różnych wersjach. Szczególnie ważne jest to wtedy, gdy kilka krajów używa tego samego języka.',
  },
  {
    pytanie: 'Ile czasu utrzymywać przekierowania 301 po zmianie domeny?',
    odpowiedz: 'Google zaleca utrzymywanie przekierowań możliwie długo, zasadniczo co najmniej rok. W praktyce warto zostawić je na stałe, jeśli koszt utrzymania jest niewielki, bo do starych adresów mogą nadal prowadzić linki zewnętrzne i zakładki użytkowników.',
  },
  {
    pytanie: 'Czy dobre SEO techniczne wystarczy, żeby strona była wysoko w Google?',
    odpowiedz: 'Nie. Techniczna poprawność sprawia, że strona może konkurować, ale o pozycjach decydują przede wszystkim trafność i jakość treści oraz sygnały zaufania. Najlepsze efekty daje połączenie fundamentów technicznych z dobrą strategią treści.',
  },
  {
    pytanie: 'Do czego służy plik llms.txt i czy pomaga w Google?',
    odpowiedz: 'To propozycja pliku z uporządkowanym opisem serwisu dla modeli językowych. Google w dokumentacji o funkcjach AI w wyszukiwarce pisze, że takie pliki nie są potrzebne, by pojawić się w AI Overviews czy AI Mode, i nie pomagają ani nie szkodzą pozycjom. Mogą mieć sens dla innych usług, które z nich korzystają, ale w Google lepiej zainwestować czas w indeksację, strukturę treści i wydajność.',
  },
  {
    pytanie: 'Kto w firmie powinien odpowiadać za SEO techniczne?',
    odpowiedz: 'Najlepiej sprawdza się podział ról: specjalista SEO diagnozuje i ustala priorytety, a programiści wdrażają zmiany. Ważne, by konsultacja SEO była stałym elementem procesu wdrożeniowego, a nie działaniem po fakcie. Dotyczy to szczególnie migracji strony i zmian w szablonach.',
  },
];

const D = '2026-11-23';
const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/essentials/technical', nazwa: 'Google Search Central: Wymagania techniczne Google Search', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/robots/intro', nazwa: 'Google Search Central: Wprowadzenie do pliku robots.txt', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview', nazwa: 'Google Search Central: Mapy witryn - omówienie', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Konsolidacja zduplikowanych adresów URL', data: D },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Wprowadzenie do danych strukturalnych', data: D },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/search-gallery', nazwa: 'Google Search Central: Galeria funkcji wyszukiwania', data: D },
  { url: 'https://developers.google.com/search/blog/2023/08/howto-faq-changes', nazwa: 'Google Search Central Blog: Changes to HowTo and FAQ rich results (08.2023)', data: D },
  { url: 'https://developers.google.com/search/updates', nazwa: 'Google Search Central: Dziennik zmian dokumentacji', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: JavaScript SEO basics', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/dynamic-rendering', nazwa: 'Google Search Central: Dynamic rendering as a workaround', data: D },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Wersje zlokalizowane strony (hreflang)', data: D },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Przenoszenie witryny ze zmianą adresów URL', data: D },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals', data: D },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: Funkcje AI a Twoja witryna', data: D },
  { url: 'https://web.dev/blog/inp-cwv-march-12', nazwa: 'web.dev: Interaction to Next Paint becomes a Core Web Vital on March 12 (2024)', data: D },
  { url: 'https://schema.org/', nazwa: 'Schema.org: strona główna słownika', data: D },
  { url: 'https://validator.schema.org/', nazwa: 'Schema.org: Schema Markup Validator', data: D },
];

const TOC = [
  { id: 'w-skrocie', title: 'Najważniejsze informacje w skrócie' },
  { id: 'czym-jest-seo-techniczne', title: 'Czym jest SEO techniczne i za co odpowiada?' },
  { id: 'crawl-i-indeksacja', title: 'Crawl i indeksacja: robots.txt, mapa witryny i canonical' },
  { id: 'dane-strukturalne', title: 'Dane strukturalne i Schema.org' },
  { id: 'javascript', title: 'Renderowanie JavaScript a indeksowanie treści' },
  { id: 'hreflang', title: 'Hreflang w serwisach wielojęzycznych' },
  { id: 'migracja', title: 'SEO podczas migracji strony' },
  { id: 'core-web-vitals', title: 'Core Web Vitals: szybkość, responsywność i stabilność' },
  { id: 'audyt', title: 'Audyt SEO technicznego krok po kroku' },
  { id: 'wyszukiwarki-ai', title: 'SEO techniczne a widoczność w wyszukiwarkach AI' },
  { id: 'pytania', title: 'Najczęstsze pytania' },
  { id: 'podsumowanie', title: 'Podsumowanie' },
  { id: 'zrodla', title: 'Źródła' },
];

const KOD_ORGANIZATION = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Nazwa Firmy",
  "url": "https://www.example.pl/",
  "logo": "https://www.example.pl/logo.png",
  "sameAs": ["https://www.linkedin.com/company/example"]
}
</script>`;

const KOD_ARTICLE = `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Tytuł artykułu",
  "author": {"@type": "Person", "name": "Imię Nazwisko"},
  "datePublished": "2026-01-15",
  "dateModified": "2026-03-02"
}
</script>`;

const KOD_HREFLANG = `<link rel="alternate" hreflang="pl" href="https://www.example.com/pl/" />
<link rel="alternate" hreflang="de-DE" href="https://www.example.com/de/" />
<link rel="alternate" hreflang="en" href="https://www.example.com/en/" />
<link rel="alternate" hreflang="x-default" href="https://www.example.com/" />`;

function Tabela({ naglowki, wiersze, podpis }) {
  return (
    <div className="table-container">
      <table>
        {podpis && <caption style={PODPIS_TABELI}>{podpis}</caption>}
        <thead>
          <tr>
            {naglowki.map((n) => <th key={n} scope="col">{n}</th>)}
          </tr>
        </thead>
        <tbody>
          {wiersze.map(([pierwsza, ...reszta]) => (
            <tr key={pierwsza}>
              <th scope="row">{pierwsza}</th>
              {reszta.map((k, i) => <td key={i}>{k}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: TYTUL,
    description: OPIS,
    alternates: {
      canonical: URL_STRONY,
      languages: articleLanguages(SCIEZKA, URL_STRONY, null),
    },
    robots: articleRobots(SCIEZKA, locale),
  };
}

export default async function ArtykulSeoTechniczne({ params }) {
  const { locale } = await params;
  if (locale === 'en') return null;

  // Reguła 6.0: link tylko do strony, która zwraca 200 - inaczej zwykły tekst.
  const hrefJsonLd = hrefJesliOpublikowana('/narzedzia/dane-strukturalne-json-ld');
  const hrefMigracja = hrefJesliOpublikowana('/narzedzia/checklista-migracji-strony');
  const hrefHreflang = hrefJesliOpublikowana('/narzedzia/sprawdz-przekierowania-hreflang');
  const hrefAudytNarzedzie = hrefJesliOpublikowana('/narzedzia/audyt-seo');

  const faqLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${URL_STRONY}#pytania`,
    inLanguage: 'pl-PL',
    mainEntity: FAQ.map((f) => ({
      '@type': 'Question',
      name: f.pytanie,
      acceptedAnswer: { '@type': 'Answer', text: f.odpowiedz },
    })),
  };

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema slug={SCIEZKA} locale={locale} dateModified={DATA_ZMIANY} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article style={{ paddingTop: 'clamp(108px, 11vw, 148px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
              Techniczne SEO
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, color: 'var(--w-tusz)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
            {H1}
          </h1>

          <Byline sciezka={SCIEZKA} />

          <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '1.5rem' }}></div>

          <div className="article-content">
              <AnswerBox>
                SEO techniczne decyduje o tym, czy wyszukiwarka w ogóle znajdzie, wyrenderuje i zaindeksuje Twoje treści, zanim zacznie oceniać ich jakość. Kluczowe obszary to indeksacja, dane strukturalne w JSON-LD, poprawna obsługa JavaScript, hreflang w serwisach wielojęzycznych, Core Web Vitals i bezpieczna migracja strony z mapą przekierowań 301.
              </AnswerBox>

              <p className="lead">
                Nawet najlepszy tekst nie przyniesie ruchu, jeśli robot nie dotrze do podstrony albo zobaczy ją pustą. W tym poradniku pokazujemy, jak podejść do każdego z tych tematów w oparciu o dokumentację Google Search Central i słownik Schema.org. Zaczynamy od fundamentów, a kończymy na tym, jak techniczna kondycja serwisu wpływa na obecność marki w odpowiedziach generowanych przez AI.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="w-skrocie">Najważniejsze informacje w skrócie</h2>
              <Tabela naglowki={['Zasada', 'Szczegóły']} wiersze={W_SKROCIE} />

              <h2 id="czym-jest-seo-techniczne">Czym jest SEO techniczne i za co odpowiada?</h2>
              <p>SEO techniczne to zestaw działań, które sprawiają, że wyszukiwarka może sprawnie pobrać stronę, zrozumieć jej strukturę i umieścić ją w indeksie. Obejmuje konfigurację serwera, architekturę adresów URL, przekierowania, kody odpowiedzi HTTP, renderowanie, wydajność oraz znaczniki opisujące zawartość. W odróżnieniu od pracy nad treścią czy linkami, efekty technicznego SEO często są niewidoczne dla użytkownika, ale bez nich pozostałe działania tracą sens.</p>
              <p>Dobrym punktem odniesienia są wymagania techniczne Google Search. Są one zaskakująco proste: Googlebot nie może być zablokowany, strona musi zwracać kod 200 i zawierać indeksowalną treść. Problem polega na tym, że w rozbudowanych serwisach te trzy warunki łatwo naruszyć przypadkiem, na przykład przy wdrożeniu nowego szablonu czy frameworka.</p>
              <p>W praktyce praca nad SEO technicznym łączy kompetencje kilku osób. Specjalista SEO diagnozuje problemy i ustala priorytety, programista wdraża zmiany, a właściciel biznesu decyduje, które ryzyka są akceptowalne. Im wcześniej te role współpracują, tym mniej kosztownych poprawek po fakcie.</p>
              <p>W kolejnych częściach omawiamy obszary, które najczęściej decydują o sukcesie lub porażce serwisu: indeksację, dane strukturalne, JavaScript, hreflang, migracje i wydajność. Każdy z nich można sprawdzić bezpłatnymi narzędziami Google, a większość błędów da się wykryć jeszcze przed publikacją zmian.</p>

              <h2 id="crawl-i-indeksacja">Crawl i indeksacja: robots.txt, mapa witryny i canonical</h2>
              <p>Zanim strona trafi do wyników, przechodzi przez etapy pobierania (crawl), przetwarzania i indeksowania. Na każdym z nich możesz pomóc robotom albo nieświadomie im przeszkodzić. Do kontroli tego procesu służą przede wszystkim trzy narzędzia: plik robots.txt, mapa witryny XML i adres kanoniczny.</p>

              <h3>Robots.txt: co blokować, a czego nie</h3>
              <p>Plik robots.txt mówi robotom, których części serwisu nie powinny pobierać. Google wyraźnie zaznacza, że nie jest to mechanizm ukrywania stron przed wyszukiwarką: zablokowany adres może trafić do indeksu, jeśli prowadzą do niego linki. Jeśli chcesz wykluczyć stronę z wyników, użyj meta tagu noindex i pozwól robotowi go odczytać.</p>
              <p>Typowy błąd polega na blokowaniu w robots.txt plików CSS i JavaScript. Bez nich Google nie wyrenderuje strony tak, jak widzi ją użytkownik, co może utrudnić ocenę układu i treści. Rozsądne zastosowania robots.txt to wykluczenie wyników wyszukiwarki wewnętrznej, nieskończonych kombinacji filtrów czy zaplecza administracyjnego.</p>

              <h3>Mapa witryny XML</h3>
              <p>Mapa witryny pomaga wyszukiwarce odkryć adresy, które chcesz mieć w indeksie. Powinna zawierać wyłącznie kanoniczne, indeksowalne strony zwracające kod 200, bez przekierowań i adresów z noindex. Pojedynczy plik ma limit 50 000 adresów lub 50 MB po rozpakowaniu, więc duże serwisy korzystają z indeksu map witryny.</p>
              <p>Mapę zgłaszasz w Google Search Console i możesz wskazać ją także w robots.txt. Raport stron w Search Console pozwala porównać, ile adresów z mapy faktycznie zostało zaindeksowanych i z jakiego powodu pozostałe zostały pominięte. Tę samą mapę przyjmuje Bing, a konfigurację krok po kroku opisujemy w poradniku <Link href="/blog/bing-webmaster-tools-indexnow-chatgpt">Bing Webmaster Tools i IndexNow</Link>.</p>

              <h3>Canonical i duplikacja treści</h3>
              <p>Gdy ta sama lub bardzo podobna treść jest dostępna pod kilkoma adresami, Google wybiera jeden z nich jako kanoniczny. Możesz na ten wybór wpływać sygnałami: przekierowaniami, elementem link rel=canonical i umieszczeniem adresu w mapie witryny. Pamiętaj jednak, że canonical to wskazówka, a nie polecenie, dlatego wszystkie sygnały powinny wskazywać ten sam adres.</p>
              <p>Najczęstsze źródła duplikacji to parametry w adresach, wersje z ukośnikiem i bez niego, wielkie i małe litery oraz równoległe wersje http i https. W sklepach dochodzą do tego warianty produktów i sortowanie list. Spójna polityka adresów URL rozwiązuje większość tych problemów u źródła. Wdrożenie i typowe pułapki opisujemy szerzej w artykule o tym, jak wdrożyć <Link href="/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026">tag canonical</Link>.</p>

              <h2 id="dane-strukturalne">Dane strukturalne i Schema.org: jak opisać treść dla wyszukiwarki?</h2>
              <p>Dane strukturalne to ustandaryzowany sposób opisania, czym jest dana strona i jakie elementy zawiera: organizację, artykuł, produkt, wydarzenie czy opinię. Wspólnym słownikiem dla wyszukiwarek jest Schema.org, projekt rozwijany wspólnie przez największe wyszukiwarki.</p>
              <p>Dzięki niemu robot nie musi zgadywać, że ciąg cyfr to cena, a nazwisko pod tekstem to autor. To jeden z elementów SEO technicznego, który najbardziej bezpośrednio wpływa na sposób prezentacji strony w wynikach.</p>
              <p>Google opisuje to szczegółowo we wprowadzeniu do danych strukturalnych. Znaczniki mogą sprawić, że strona będzie kwalifikować się do wyników rozszerzonych, ale nie gwarantują ich wyświetlenia. Muszą też spełniać ogólne wytyczne i opisywać wyłącznie treści widoczne dla użytkownika.</p>

              <h3>Wyniki rozszerzone, które Google ograniczył lub wycofał</h3>
              <p>Lista obsługiwanych wyników rozszerzonych zmienia się regularnie, dlatego zawsze sprawdzaj aktualną galerię funkcji wyszukiwania. W sierpniu 2023 roku Google ograniczył wyniki FAQ do autorytatywnych serwisów rządowych i medycznych, a wyniki HowTo zostały wycofane. W kolejnych latach z dokumentacji zniknęły między innymi oznaczenia kursów, szacowanych wynagrodzeń, ofert pojazdów i zadań ćwiczeniowych.</p>
              <p>Od 7 maja 2026 roku wyniki rozszerzone FAQ nie są już wyświetlane w wyszukiwarce Google, co odnotowuje dziennik zmian dokumentacji, a sama dokumentacja tej funkcji została później usunięta. Nie oznacza to, że znaczniki FAQPage szkodzą stronie. Oznacza jedynie, że nie warto planować na nich dodatkowej widoczności w Google.</p>

              <h3>Jakie typy Schema.org warto wdrożyć w firmie?</h3>
              <p>Dla większości firm najważniejsze są typy, które jednoznacznie opisują markę, jej ofertę i publikowane treści. Poniższa tabela pokazuje typy najczęściej stosowane w serwisach firmowych.</p>
              <Tabela naglowki={['Typ', 'Zastosowanie', 'Gdzie wdrożyć']} wiersze={TYPY_SCHEMA} />

              <h3>Format JSON-LD i przykład kodu</h3>
              <p>Google akceptuje trzy formaty: JSON-LD, Microdata i RDFa, ale zaleca JSON-LD, jeśli pozwala na to konfiguracja serwisu. Kod umieszcza się w znaczniku script, oddzielnie od treści HTML, co ułatwia utrzymanie i generowanie go z systemu CMS. Poniżej krótki przykład opisu organizacji.</p>
              <pre><code>{KOD_ORGANIZATION}</code></pre>
              <p>Dla wpisu blogowego analogicznie stosuje się typ Article lub BlogPosting z właściwościami takimi jak headline, author, datePublished i dateModified.</p>
              <pre><code>{KOD_ARTICLE}</code></pre>
              {hrefJsonLd && <p>Gotowe wzory dla siedmiu typów, od Organization po Product, znajdziesz w naszym szablonie <Link href={hrefJsonLd}>dane strukturalne JSON-LD</Link>.</p>}

              <h3>Testowanie i walidacja znaczników</h3>
              <p>Do sprawdzenia, czy strona kwalifikuje się do wyników rozszerzonych Google, służy Test wyników z elementami rozszerzonymi. Ogólną poprawność względem słownika, niezależnie od funkcji Google, zweryfikujesz w Schema Markup Validator. Po wdrożeniu warto monitorować raporty ulepszeń w Search Console, bo błędy często pojawiają się dopiero przy zmianach szablonu.</p>

              <h2 id="javascript">Renderowanie JavaScript a indeksowanie treści</h2>
              <p>Nowoczesne serwisy coraz częściej budowane są we frameworkach takich jak React, Vue czy Angular. Google potrafi wykonywać JavaScript, ale robi to w określonej kolejności i z pewnymi ograniczeniami.</p>
              <p>W takich projektach o widoczności decyduje się już na etapie wyboru architektury. Zrozumienie procesu renderowania pozwala uniknąć sytuacji, w której użytkownik widzi pełną stronę, a robot pustą powłokę.</p>

              <h3>Trzy etapy: crawl, render, indeksacja</h3>
              <p>Zgodnie z dokumentacją JavaScript SEO basics Google przetwarza aplikacje w trzech fazach: pobieranie, renderowanie i indeksowanie. Strona zwracająca kod 200 trafia do kolejki renderowania, w której może pozostać kilka sekund, ale czasem dłużej. Dopiero po wyrenderowaniu Google analizuje końcowy HTML, odkrywa w nim kolejne linki i wykorzystuje go do indeksowania.</p>
              <p>Dokumentacja zaznacza też, że przy kodach odpowiedzi innych niż 200 renderowanie może zostać pominięte. Dlatego strona błędu wygenerowana wyłącznie po stronie klienta, ale zwracająca kod 200, to prosta droga do tzw. soft 404.</p>

              <h3>SSR, prerendering czy renderowanie po stronie klienta?</h3>
              <p>Google wskazuje, że renderowanie po stronie serwera lub prerendering nadal są dobrym pomysłem. Przyspieszają stronę dla użytkowników i robotów, a do tego nie każdy bot potrafi uruchomić JavaScript. Dotyczy to także wielu crawlerów wykorzystywanych przez narzędzia AI.</p>
              <p>Dynamiczne renderowanie, czyli serwowanie robotom innej, wstępnie wyrenderowanej wersji strony, Google opisuje jako obejście, a nie rozwiązanie długoterminowe. Zamiast niego rekomenduje renderowanie po stronie serwera, generowanie statyczne lub hydratację. Dynamiczne renderowanie zwiększa złożoność i koszty utrzymania, więc nie warto go wybierać przy nowych projektach.</p>

              <h3>Najczęstsze błędy w serwisach opartych na JavaScript</h3>
              <p>Pierwszy błąd to linki, których robot nie widzi. Google odkrywa adresy tylko z elementów a z atrybutem href, więc nawigacja oparta na zdarzeniach onclick czy adresach z krzyżykiem (#) blokuje dostęp do podstron. Przy routingu po stronie klienta używaj History API.</p>
              <p>Drugi problem to manipulowanie tagami przez skrypty. Jeśli w pierwotnym HTML jest noindex, Google może w ogóle pominąć renderowanie, więc późniejsze usunięcie tagu przez JavaScript nie zadziała. Podobnie adres kanoniczny ustawiony skryptem nie powinien różnić się od tego w oryginalnym kodzie.</p>
              <p>Trzeci błąd to treść ładowana dopiero po interakcji, na przykład po przewinięciu czy kliknięciu w zakładkę. Robot nie klika i nie przewija jak człowiek, dlatego kluczowe informacje powinny znaleźć się w kodzie po pierwszym renderowaniu. Sprawdzisz to narzędziem do sprawdzania adresu URL w Search Console, które pokazuje wyrenderowany HTML.</p>

              <h2 id="hreflang">Hreflang w serwisach wielojęzycznych</h2>
              <p>Atrybut hreflang informuje Google, że strona ma wersje przeznaczone dla innych języków lub regionów. Dzięki temu użytkownik z Niemiec powinien zobaczyć w wynikach wersję niemiecką, a nie polską.</p>
              <p>W serwisach międzynarodowych to jeden z najbardziej podatnych na błędy elementów technicznego SEO. Warto pamiętać, że Google nie używa hreflang do wykrywania języka strony, tylko do wyboru właściwej wersji spośród już zaindeksowanych.</p>

              <h3>Zasady poprawnego wdrożenia</h3>
              <p>Według dokumentacji o wersjach zlokalizowanych alternatywne strony można wskazać na trzy równoważne sposoby: tagami link w sekcji head, nagłówkami HTTP lub w mapie witryny. Kod języka podaje się w formacie ISO 639-1, a opcjonalny kod regionu w ISO 3166-1 Alpha-2. Sam kod kraju, bez języka, nie jest obsługiwany.</p>
              <p>Każda wersja musi wskazywać siebie oraz wszystkie pozostałe wersje, a zestaw odnośników powinien być identyczny na każdej z nich. Jeśli dwie strony nie wskazują siebie nawzajem, oznaczenia zostaną zignorowane. Adresy muszą być pełne, razem z protokołem https.</p>

              <h3>Przykład tagów z x-default</h3>
              <p>Wartość x-default oznacza stronę zapasową dla użytkowników, których język lub region nie pasuje do żadnej wersji. Często jest to strona wyboru języka albo wersja międzynarodowa.</p>
              <pre><code>{KOD_HREFLANG}</code></pre>

              <h3>Typowe błędy hreflang</h3>
              <p>Większość problemów wynika z niespójności między wersjami lub z błędnych kodów. Poniżej zestawienie najczęstszych sytuacji, które spotyka się w audytach serwisów międzynarodowych.</p>
              <Tabela naglowki={['Błąd', 'Skutek', 'Jak naprawić']} wiersze={BLEDY_HREFLANG} />
              {hrefHreflang && <p>Zwrotność oznaczeń i łańcuchy przekierowań dla konkretnego adresu sprawdzisz w naszym darmowym narzędziu <Link href={hrefHreflang}>sprawdź przekierowania i tagi hreflang</Link>.</p>}

              <h2 id="migracja">Jak przeprowadzić SEO podczas migracji strony bez utraty ruchu?</h2>
              <p>Zmiana domeny, struktury adresów, protokołu albo platformy to moment największego ryzyka dla widoczności. Nawet dobrze przygotowana zmiana powoduje przejściowe wahania, a źle zaplanowana może odebrać serwisowi ruch na wiele miesięcy.</p>
              <p>To moment, w którym błędy techniczne najszybciej przekładają się na wynik biznesowy. Kluczem jest traktowanie migracji strony jako projektu z własnym harmonogramem, testami i odpowiedzialnymi osobami.</p>
              <p>Google opisuje cały proces w przewodniku o przenoszeniu witryny ze zmianą adresów URL. Według dokumentacji przeniesienie większości stron średniego serwisu może potrwać kilka tygodni, a w tym czasie widoczność może się tymczasowo wahać.</p>

              <h3>Przed migracją strony: mapa przekierowań i kopia stanu</h3>
              <p>Najważniejszym dokumentem jest mapa adresów URL, czyli zestawienie każdego starego adresu z jego nowym odpowiednikiem. Źródłem listy powinny być crawl serwisu, mapy witryny, dane z Search Console, analityka i adresy z linkami zewnętrznymi. Przed startem zapisz też stan wyjściowy: zaindeksowane strony, pozycje kluczowych fraz i ruch organiczny na poziomie podstron.</p>
              <p>Nowy serwis przetestuj na środowisku testowym zablokowanym dla robotów hasłem, a nie wyłącznie plikiem robots.txt. Sprawdź tagi canonical, dane strukturalne, hreflang i linkowanie wewnętrzne, ponieważ to elementy, które najczęściej giną przy zmianie szablonu. Upewnij się też, że obie wersje serwisu są zweryfikowane w Search Console.</p>

              <h3>W dniu wdrożenia</h3>
              <p>Przekierowania powinny być stałe (301 lub 308), działać po stronie serwera i prowadzić z każdego starego adresu na najbliższy tematycznie odpowiednik. Unikaj łańcuchów przekierowań i masowego kierowania starych adresów na stronę główną, bo Google może je potraktować jak błąd soft 404. Zaraz po starcie usuń blokady środowiska testowego i zgłoś nową mapę witryny.</p>
              <p>Jeśli zmieniasz domenę, skorzystaj z narzędzia do zmiany adresu w Search Console dla starej witryny. Zaktualizuj również linki wewnętrzne, aby wskazywały bezpośrednio nowe adresy, a nie przechodziły przez przekierowania.</p>

              <h3>Po migracji: monitoring i utrzymanie przekierowań</h3>
              <p>Przez pierwsze tygodnie codziennie obserwuj błędy 404, raport indeksowania stron, statystyki indeksowania i ruch na najważniejszych podstronach. Porównuj dane z kopią stanu sprzed zmian, aby szybko wychwycić sekcje, które tracą widoczność. Przekierowania utrzymuj możliwie długo, według Google zasadniczo co najmniej rok.</p>
              <Tabela naglowki={['Etap', 'Najważniejsze zadania']} wiersze={ETAPY_MIGRACJI} />
              <p>Dobrze przygotowany plan migracji strony zawiera też scenariusz awaryjny na wypadek nieprzewidzianych problemów. Ustal z zespołem, kto podejmuje decyzję o wycofaniu zmian i jakie wskaźniki ją uruchamiają. Taki scenariusz skraca czas reakcji, gdy po wdrożeniu ruch spada szybciej, niż zakładano.</p>
              {hrefMigracja && <p>Pełną listę kontrolną z wzorem mapy przekierowań pobierzesz jako darmowy szablon: <Link href={hrefMigracja}>migracja strony: checklista SEO</Link>.</p>}

              <h2 id="core-web-vitals">Core Web Vitals: szybkość, responsywność i stabilność</h2>
              <p>Core Web Vitals to trzy wskaźniki opisujące doświadczenie użytkownika podczas ładowania i używania strony. Google zaleca osiąganie dobrych wyników, podkreślając, że są one zgodne z tym, co nagradzają jego główne systemy rankingowe.</p>
              <p>Nie są jednak jedynym czynnikiem, a trafność treści pozostaje ważniejsza. Wydajność najmocniej ze wszystkich obszarów technicznych przekłada się na odczucia użytkownika.</p>
              <p>12 marca 2024 roku wskaźnik INP (Interaction to Next Paint) zastąpił FID jako miara responsywności. W odróżnieniu od FID ocenia on opóźnienia przy wszystkich interakcjach podczas wizyty, a nie tylko przy pierwszej.</p>
              <Tabela
                naglowki={['Wskaźnik', 'Co mierzy', 'Dobry wynik', 'Wymaga poprawy', 'Słaby wynik']}
                wiersze={PROGI_CWV}
                podpis="Źródło: Google Search Central, Core Web Vitals."
              />
              <p>Wyniki ocenia się na podstawie danych od realnych użytkowników, na poziomie 75. percentyla odsłon. Dane laboratoryjne z Lighthouse pomagają w diagnozie, ale o ocenie w Search Console decydują dane terenowe. Jak te progi przekładają się na pozycje, rozbieramy w artykule <Link href="/blog/core-web-vitals-a-pozycje-google">Core Web Vitals a pozycje w Google</Link>.</p>

              <h3>Wpływ JavaScript na INP i pozostałe wskaźniki</h3>
              <p>Najczęstszą przyczyną słabego INP są długie zadania JavaScript blokujące główny wątek przeglądarki. Pomaga dzielenie kodu, odkładanie nieistotnych skryptów, ograniczanie zewnętrznych tagów i ostrożne podejście do widżetów marketingowych. Na LCP wpływają głównie czas odpowiedzi serwera, wielkość obrazów i sposób ładowania czcionek, a na CLS brak zarezerwowanego miejsca na obrazy, reklamy i elementy wstrzykiwane dynamicznie.</p>

              <h2 id="audyt">Audyt SEO technicznego krok po kroku</h2>
              <p>Audyt SEO technicznego to uporządkowany przegląd serwisu, który kończy się listą problemów z priorytetami, a nie tylko eksportem błędów z narzędzia. Dobrze przeprowadzony pokazuje, co blokuje indeksację, co osłabia sygnały i co warto poprawić w pierwszej kolejności. Zakres można dopasować do wielkości serwisu, ale kolejność kroków pozostaje podobna.</p>
              <ol>
                <li>Crawl całego serwisu narzędziem takim jak Screaming Frog lub Sitebulb, z renderowaniem JavaScript.</li>
                <li>Porównanie wyników crawla z mapą witryny i raportem indeksowania stron w Search Console.</li>
                <li>Analiza kodów odpowiedzi, przekierowań, adresów kanonicznych i duplikacji.</li>
                <li>Kontrola danych strukturalnych, hreflang i meta tagów robots.</li>
                <li>Ocena Core Web Vitals na danych terenowych i diagnoza w Lighthouse.</li>
                <li>Przegląd logów serwera, jeśli są dostępne, aby zobaczyć realne zachowanie Googlebota.</li>
                <li>Lista rekomendacji z oceną wpływu i nakładu pracy.</li>
              </ol>
              <p>Progi i kryteria dla każdego z tych kroków, razem z arkuszem do pobrania, rozpisujemy w poradniku <Link href="/blog/technical-seo-audit-checklist">jak zrobić audyt SEO</Link>.</p>

              <h3>Elementy technicznego SEO do sprawdzenia</h3>
              <p>Poniższa tabela porządkuje najważniejsze obszary, które warto objąć audytem, wraz z narzędziami pomocnymi przy ich weryfikacji.</p>
              <Tabela naglowki={['Obszar', 'Co sprawdzić', 'Narzędzie']} wiersze={OBSZARY_AUDYTU} />

              <h3>Kontrola danych strukturalnych i hreflang w audycie</h3>
              <p>Przy danych strukturalnych nie wystarczy brak błędów w walidatorze. Sprawdź, czy znaczniki opisują treść faktycznie widoczną na stronie, czy dane są aktualne i czy szablon nie generuje sprzecznych informacji, na przykład dwóch różnych cen. W przypadku hreflang zweryfikuj komplet par między wszystkimi wersjami, a nie tylko pojedyncze podstrony.</p>
              <p>
                Jeśli chcesz zlecić taki przegląd specjalistom, sprawdź usługę <Link href="/audyt-seo">audyt SEO strony internetowej</Link>. Wyniki audytu są najcenniejsze wtedy, gdy zespół deweloperski otrzymuje je w formie konkretnych zadań z priorytetami.
                {hrefAudytNarzedzie && <> Szybki pierwszy przegląd zrobisz też samodzielnie w naszym <Link href={hrefAudytNarzedzie}>darmowym audycie SEO strony</Link>.</>}
              </p>

              <h2 id="wyszukiwarki-ai">SEO techniczne a widoczność w wyszukiwarkach AI</h2>
              <p>Odpowiedzi generowane przez AI, takie jak AI Overviews czy AI Mode w Google, korzystają ze stron, które wyszukiwarka może pobrać i zaindeksować. Google w dokumentacji o funkcjach AI wskazuje, że strona musi być zaindeksowana i kwalifikować się do wyświetlenia z fragmentem, a dodatkowych wymagań technicznych nie ma. Nie trzeba też wdrażać specjalnych znaczników Schema.org ani osobnych plików dla AI.</p>
              <p>To oznacza, że SEO techniczne jest warunkiem wejścia do tej gry, a nie osobną strategią. Serwis z blokadami renderowania, błędną kanonikalizacją czy treścią dostępną dopiero po kliknięciu ma mniejsze szanse na bycie źródłem odpowiedzi. Jak przygotować treści pod te formaty, opisujemy w artykułach o optymalizacji pod <Link href="/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews">Google AI Overviews</Link> i o tym, jak pojawić się w <Link href="/blog/google-ai-mode-jak-sie-pojawic">Google AI Mode</Link>, a całą usługę na stronie <Link href="/pozycjonowanie-w-ai">pozycjonowanie w AI</Link>.</p>

              <h2 id="pytania">Najczęstsze pytania o SEO techniczne</h2>
              {FAQ.map((f) => (
                <div key={f.pytanie}>
                  <h3>{f.pytanie}</h3>
                  <p>{f.odpowiedz}</p>
                </div>
              ))}

              <h2 id="podsumowanie">Podsumowanie: SEO techniczne jako fundament widoczności</h2>
              <p>SEO techniczne nie przyciąga uwagi tak jak kampanie czy nowe treści, ale to ono decyduje, czy te treści w ogóle zobaczy wyszukiwarka. Poprawna indeksacja, dane strukturalne w JSON-LD, przemyślane renderowanie JavaScript i spójne oznaczenia hreflang tworzą solidną podstawę pod widoczność zarówno w klasycznych wynikach, jak i w odpowiedziach AI.</p>
              <p>Największe ryzyko pojawia się podczas migracji strony, dlatego każda zmiana domeny, platformy czy struktury adresów wymaga mapy przekierowań, testów i monitoringu. Regularny audyt pozwala wychwycić problemy, zanim przełożą się na utratę ruchu.</p>
              <p>Zaniedbania w SEO technicznym rzadko widać od razu, ale ich koszt rośnie z każdym miesiącem. Jeśli chcesz omówić stan techniczny swojego serwisu, <a href="#kontakt">napisz do nas przez formularz kontaktowy</a>.</p>

              <Zrodla zrodla={ZRODLA} />

              <BlogCTA locale={locale} currentSlug={SCIEZKA} />
          </div>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
