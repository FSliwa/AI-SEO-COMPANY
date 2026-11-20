// Artykuł tylko-PL (plOnly w lib/blogPosts.js, 308 /en/blog/<slug> -> /blog/<slug> w next.config.mjs).
// Frazy: „google ai mode” (PL 2400/mies.), „tryb ai google” (1900/mies.); klaster ai-mode z seo/frazy-pl.csv (18.11.2026).
// Fakty o AI Mode tylko ze źródeł pierwotnych Google (daty odczytu w ZRODLA) i z pomiarów własnych
// z lib/pytaniaAi.js (4–5.11.2026, z podanym modelem). Nie twierdzimy, że mierzyliśmy AI Mode: nie mierzyliśmy.
// Rozróżnienie od /blog/jak-zoptymalizowac-strone-pod-google-ai-overviews: tamten tekst to pełny przewodnik
// po optymalizacji (technika, treść, Perplexity, plan 30 dni); ten dotyczy wyłącznie AI Mode:
// dostępność w Polsce, czym różni się od AI Overviews, jak Google liczy go w Search Console, jak sprawdzać cytowania.
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
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

const BASE = 'https://www.ai-seo-company.pl';
const SCIEZKA = '/blog/google-ai-mode-jak-sie-pojawic';
const URL_STRONY = `${BASE}${SCIEZKA}`;

// Title i meta: te same wartości co titlePl/descPl w lib/blogPosts.js (wpis w REJESTR.md).
const TYTUL = 'Google AI Mode: jak się w nim pojawić. Poradnik SEO 2026';
const OPIS = 'Google AI Mode w Polsce: czym różni się od AI Overviews, skąd bierze źródła, jak je mierzyć w Search Console i co zrobić, by strona była cytowana.';
const H1 = 'Google AI Mode: jak sprawić, żeby Twoja strona pojawiła się w odpowiedziach';

const DATA_PUBLIKACJI = blogPosts.find((p) => p.slug === SCIEZKA)?.date ?? '2026-11-18';
const DATA_ZMIANY = LASTMOD[URL_STRONY] ?? DATA_PUBLIKACJI;

const FAQ = [
  {
    pytanie: 'Czy Google AI Mode (Tryb AI Google) działa po polsku?',
    odpowiedz: 'Tak. Strona pomocy Google, którą odczytaliśmy 18 listopada 2026 r., wymienia Polskę wśród krajów, a polski wśród języków, w których działa Tryb AI Google (AI Mode). Część funkcji ma dodatkowe warunki: nowszy model Gemini 4 Argon jest według tej strony dostępny w wybranych krajach (bez Polski) i wymaga subskrypcji Google AI Pro albo Google AI Ultra.',
  },
  {
    pytanie: 'Czy potrzebuję specjalnego znacznika albo pliku, żeby pojawić się w Google AI Mode?',
    odpowiedz: 'Nie. Dokumentacja Google dla właścicieli stron mówi, że warunkiem jest zindeksowanie strony i kwalifikacja do wyświetlenia z fragmentem, a dodatkowych wymagań technicznych nie ma. Google nie opisuje osobnego schematu ani pliku dla AI Mode, więc llms.txt nie jest warunkiem pojawienia się w tym trybie.',
  },
  {
    pytanie: 'Czy ruch z Google AI Mode widać w Search Console?',
    odpowiedz: 'Tak: kliknięcia i wyświetlenia z AI Mode wchodzą do raportu Skuteczność w typie wyszukiwania „Web” (pytanie uzupełniające liczy się jako nowe zapytanie). Od 31 sierpnia 2026 r. Search Console ma także osobny raport skuteczności w generatywnej AI (Generative AI performance), który pokazuje wyświetlenia i kliknięcia z AI Overviews i AI Mode osobno; dane z eksperymentów Search Labs nadal nie są uwzględniane.',
  },
  {
    pytanie: 'Czy mogę zablokować pokazywanie mojej strony w Google AI Mode?',
    odpowiedz: 'Tak, tymi samymi mechanizmami co w zwykłych wynikach. Google wskazuje nosnippet, data-nosnippet, max-snippet i noindex. Pierwsze trzy ograniczają fragmenty, a noindex usuwa stronę z indeksu, więc traci też klasyczne wyniki. Blokada Google-Extended dotyczy treningu modeli Gemini, nie obecności w Google Search.',
  },
  {
    pytanie: 'Jak szybko pojawię się w Google AI Mode po poprawkach na stronie?',
    odpowiedz: 'Google nie podaje terminu. Dokumentacja zaznacza, że indeksowanie i wyświetlanie nie są gwarantowane, a cytowania w odpowiedziach AI zmieniają się z czasem. Dlatego porównuj trend dla stałej listy pytań co miesiąc, zamiast oceniać efekt po jednym sprawdzeniu, i nie planuj kampanii na gwarantowanym terminie.',
  },
];

// Daty odczytu = dzień sprawdzenia źródła pierwotnego (18.11.2026).
const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-18' },
  { url: 'https://support.google.com/websearch/answer/16011537', nazwa: 'Pomoc Google: AI Mode, dostępność i wymagania', data: '2026-11-18' },
  { url: 'https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/', nazwa: 'Google Blog: ogłoszenie AI Mode (20 maja 2025)', data: '2026-11-18' },
  { url: 'https://blog.google/products-and-platforms/products/search/ai-mode-expands-languages-locations/', nazwa: 'Google Blog: AI Mode w ponad 35 nowych językach i ponad 40 krajach (7 października 2025)', data: '2026-11-18' },
  { url: 'https://support.google.com/webmasters/answer/7042828', nazwa: 'Pomoc Search Console: raport Skuteczność, AI Overviews i AI Mode', data: '2026-11-18' },
  { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Pomoc Search Console: raport skuteczności w generatywnej AI (Generative AI performance)', data: '2026-11-19' },
  { url: 'https://support.google.com/websearch/answer/14901683?hl=pl', nazwa: 'Pomoc Google: Przegląd od AI w wynikach wyszukiwania', data: '2026-11-18' },
  { url: 'https://www.benchmark.pl/google-ai-mode-w-polsce-7268543279072321a', nazwa: 'Benchmark.pl: AI Mode już w Polsce (8 października 2025, źródło wtórne)', data: '2026-11-18' },
];

const TOC = [
  { id: 'co-to-jest', title: 'Czym jest Google AI Mode i czym różni się od AI Overviews?' },
  { id: 'w-polsce', title: 'Czy Google AI Mode działa w Polsce?' },
  { id: 'zrodla-odpowiedzi', title: 'Skąd Google AI Mode bierze strony do cytowania?' },
  { id: 'jak-sie-pojawic', title: 'Jak pojawić się w Google AI Mode: 6 kroków' },
  { id: 'pomiar', title: 'Jak sprawdzić, czy AI Mode cytuje Twoją stronę?' },
  { id: 'czego-nie-wiemy', title: 'Czego nie wiadomo o Google AI Mode' },
  { id: 'pytania', title: 'Pytania o Google AI Mode' },
  { id: 'zrodla', title: 'Źródła' },
];

const ROZNICE = [
  ['Jak się uruchamia', 'Pojawia się nad wynikami, gdy systemy Google uznają, że generatywna AI będzie pomocna.', 'Osobny tryb wyszukiwarki, który użytkownik wybiera świadomie.'],
  ['Przebieg', 'Podsumowanie z linkami do stron.', 'Rozbudowana odpowiedź z linkami do źródeł i pytania uzupełniające.'],
  ['Pozycja w Search Console', 'Całe podsumowanie to jedna pozycja, wszystkie linki mają tę samą.', 'Pozycja liczona jak na zwykłej stronie wyników.'],
  ['Pytanie uzupełniające', 'Pomoc Search Console nie opisuje.', 'Liczy się jako nowe zapytanie.'],
  ['Warunek cytowania', 'Strona zindeksowana i kwalifikująca się do wyświetlenia z fragmentem.', 'Ten sam warunek, brak dodatkowych wymagań technicznych.'],
];

const CHRONOLOGIA = [
  ['20.05.2025', 'Google opisuje AI Mode i technikę query fan-out w ogłoszeniu po konferencji Google I/O.', 'Google Blog'],
  ['7.10.2025', 'Google zapowiada AI Mode w ponad 35 nowych językach i ponad 40 nowych krajach i terytoriach, łącznie w ponad 200. Ogłoszenie nie wymienia Polski z nazwy.', 'Google Blog'],
  ['8.10.2025', 'Polskie media podają start Trybu AI w Polsce; część użytkowników mogła zobaczyć go z opóźnieniem.', 'Benchmark.pl (źródło wtórne)'],
  ['18.11.2026', 'Strona pomocy Google wymienia Polskę i język polski. Polski nie ma na liście krajów dla modelu Gemini 4 Argon, który wymaga subskrypcji Google AI Pro albo Google AI Ultra.', 'Pomoc Google'],
];

const KROKI = [
  ['Sprawdź indeksowanie i fragmenty', 'Strona ma być zindeksowana i mieć prawo do wyświetlenia z fragmentem, bo tylko to Google podaje jako warunek. Przejrzyj robots.txt, CDN, nagłówki X-Robots-Tag i meta robots pod kątem noindex, nosnippet i max-snippet:0.'],
  ['Odpowiadaj na pytania cząstkowe', 'AI Mode dzieli pytanie na podtematy i szuka każdego osobno. Daj więc każdemu podtematowi osobny nagłówek i 1–2 zdania odpowiedzi na jego początku. Strona spoza pierwszej dziesiątki może zostać zacytowana za jedną taką odpowiedź.'],
  ['Przewiduj pytania uzupełniające', 'Rozmowa trwa dalej, a każde dopytanie to nowe zapytanie. Napisz sekcje o kosztach, terminach, wyjątkach i alternatywach, czyli o tym, o co klient zapyta w drugiej i trzeciej turze.'],
  ['Utrzymuj spójne dane', 'Cena, godziny, adres i zakres usługi muszą być identyczne na stronie, w wizytówce Google i w danych strukturalnych. Google zaleca aktualizować Profil Firmy i Merchant Center oraz dopasować dane strukturalne do widocznej treści.'],
  ['Trzymaj ważne treści w tekście', 'Odpowiedzi ukryte w obrazkach albo ładowane dopiero po interakcji są trudniejsze do wykorzystania. Google zaleca treść w formie tekstowej, uzupełnioną wartościowymi obrazami i wideo.'],
  ['Połącz stronę linkami wewnętrznymi', 'Google zaleca, by treści dało się znaleźć przez linki wewnętrzne. Powiąż poradnik z usługą i pokrewnymi artykułami opisowymi anchorami, żeby temat był czytelny jako całość.'],
];

const POMIAR = [
  ['Search Console: Skuteczność („Web”) i raport Generative AI performance', 'Kliknięcia i wyświetlenia w ogólnym ruchu „Web” oraz osobno w raporcie skuteczności generatywnej AI (od 31.08.2026)', 'Raport obejmuje łącznie funkcje generatywne AI; dane z eksperymentów Search Labs są pominięte.'],
  ['Dziennik zapytań prowadzony ręcznie', 'Czy domena jest cytowana, które domeny konkurencji są cytowane', 'Wynik jednej sesji nie jest trendem; porównuj co miesiąc.'],
  ['Pomiar automatyczny (audyt i monitoring)', 'Odsetek odpowiedzi z nazwą firmy, źródła cytowań', 'Nasz audyt obejmuje przegląd AI w Google, nie osobny pomiar AI Mode.'],
];

const POMIAR_WLASNY = [
  ['Polecenie firmy (11 odpowiedzi)', '62', '59 do wyszukiwania w Mapach Google'],
  ['Cena i ranking agencji (5 odpowiedzi)', '31', '0 do Map; cenniki, rankingi i strony agencji'],
  ['Porady ogólne (4 odpowiedzi)', '0', 'model nie wyszukiwał'],
];

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

export default async function ArtykulGoogleAiMode({ params }) {
  const { locale } = await params;
  if (locale === 'en') return null;

  // Reguła 6.0: link tylko do strony, która zwraca 200 - inaczej zwykły tekst.
  const hrefAudytAi = hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci');
  const hrefSeoVsGeo = hrefJesliOpublikowana('/porownania/seo-vs-geo');
  const hrefWizytowka = hrefJesliOpublikowana('/pozycjonowanie-wizytowki-google');
  const hrefSprawdzarka = hrefJesliOpublikowana('/sprawdz-widocznosc-w-ai');
  const hrefChatgpt = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const hrefAiOverviews = blogPosts.some((p) => p.slug === '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews')
    ? '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews'
    : null;

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

      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Pozycjonowanie w AI
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--w-tusz)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              {H1}
            </h1>
            <Byline sciezka={SCIEZKA} data={DATA_ZMIANY} />
            <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <AnswerBox>
                Google AI Mode to osobny tryb wyszukiwarki: użytkownik dostaje rozbudowaną odpowiedź z linkami do źródeł i może dopytywać. Żeby Twoja strona znalazła się wśród źródeł, musi być zindeksowana i kwalifikować się do wyświetlenia z fragmentem. Google zaznacza, że nie ma dodatkowych wymagań technicznych, ale też nie gwarantuje cytowania.
              </AnswerBox>

              <p className="lead">
                Ten artykuł dotyczy wyłącznie Trybu AI Google. Dowiesz się, czy działa w Polsce, czym różni się od przeglądu AI nad wynikami, jak Google liczy go w Search Console i jak sprawdzić, czy cytuje Twoją firmę. Opieramy się na dokumentacji Google z datą odczytu i na własnych pomiarach, które opisujemy z modelem i datą. Nie mierzyliśmy samego AI Mode, więc go nie opisujemy liczbami.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="co-to-jest">Czym jest Google AI Mode i czym różni się od AI Overviews?</h2>
              <p>
                Google AI Mode (po polsku „Tryb AI”) to według Google wyszukiwanie z odpowiedzią opartą na AI, w którym można dopytywać i wchodzić w linki do stron. Google opisuje go jako szczególnie przydatny przy zapytaniach, które wymagają dalszej eksploracji, rozumowania albo złożonych porównań. Przegląd od AI (AI Overviews) to krótsze podsumowanie nad zwykłymi wynikami.
              </p>
              <p>
                Dla właściciela strony najważniejsze są dwie rzeczy. Po pierwsze, oba widoki mają ten sam warunek cytowania. Po drugie, inaczej są liczone w Search Console i inaczej się je uruchamia, więc testuje się je osobno.
              </p>
              <div className="table-container tabela-artykulu" tabIndex={0} role="region" aria-label="AI Overviews i AI Mode: porównanie">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Cecha</th>
                      <th scope="col">AI Overviews</th>
                      <th scope="col">AI Mode</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ROZNICE.map(([cecha, aio, mode]) => (
                      <tr key={cecha}>
                        <th scope="row">{cecha}</th>
                        <td>{aio}</td>
                        <td>{mode}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Źródła tabeli: dokumentacja Google Search Central, pomoc Search Console i strona pomocy o przeglądzie AI (odczyt 18.11.2026).
                {hrefAiOverviews && <> Pełny przewodnik po technice, treści i pomiarze dla obu funkcji znajdziesz w artykule o <Link href={hrefAiOverviews}>optymalizacji pod Google AI Overviews</Link>.</>}
                {' '}Szersze ujęcie, w tym inne asystenty AI, opisujemy na stronie <Link href="/pozycjonowanie-w-ai">pozycjonowanie w AI</Link>.
              </p>

              <h2 id="w-polsce">Czy Google AI Mode działa w Polsce?</h2>
              <p>
                Tak. Strona pomocy Google o AI Mode (odczyt 18 listopada 2026 r.) wymienia Polskę wśród obsługiwanych krajów, a polski wśród obsługiwanych języków. Ogłoszenie Google z 7 października 2025 r. mówiło o ponad 200 krajach i terytoriach, w tym wielu w Europie, bez wymieniania Polski z nazwy. Polskie media podały start Trybu AI w Polsce 8 października 2025 r.
              </p>
              <div className="table-container tabela-artykulu" tabIndex={0} role="region" aria-label="Obsługa Polski w AI Mode">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Data</th>
                      <th scope="col">Co się stało</th>
                      <th scope="col">Źródło</th>
                    </tr>
                  </thead>
                  <tbody>
                    {CHRONOLOGIA.map(([data, opis, zrodlo]) => (
                      <tr key={data}>
                        <th scope="row">{data}</th>
                        <td>{opis}</td>
                        <td>{zrodlo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                Nie wszystko jest dostępne wszędzie. Według strony pomocy personalizacja wymaga wieku 18+ i włączonej historii, a najnowszy model w Trybie AI ma osobną listę krajów i wymaga subskrypcji. Dostępność zmienia się szybko, więc przed planowaniem działań sprawdź aktualną listę w pomocy Google.
              </p>

              <h2 id="zrodla-odpowiedzi">Skąd Google AI Mode bierze strony do cytowania?</h2>
              <p>
                Google AI Mode bierze linki z tego samego indeksu co zwykłe wyszukiwanie. Dokumentacja mówi, że strona musi być zindeksowana i kwalifikować się do wyświetlenia z fragmentem, a dodatkowych wymagań technicznych nie ma. Zaznacza też, że samo indeksowanie i wyświetlanie nie jest gwarantowane.
              </p>
              <h3>Czym jest query fan-out</h3>
              <p>
                Według Google AI Mode dzieli pytanie na podtematy i wysyła wiele powiązanych zapytań jednocześnie. Dzięki temu pokazuje szerszy i bardziej zróżnicowany zestaw linków niż klasyczne wyniki. W praktyce strona, która nie jest w pierwszej dziesiątce na główne zapytanie, może zostać zacytowana za odpowiedź na jedno z pytań cząstkowych. To możliwość, nie reguła.
              </p>
              <h3>Co dzieje się przy niskiej pewności odpowiedzi</h3>
              <p>
                Strona pomocy Google zaznacza, że gdy system ma niską pewność, może pokazać zestaw linków do sieci zamiast odpowiedzi AI. Zachęca też, by klikać linki do źródeł i weryfikować ważne informacje. Dla firmy oznacza to, że link do Twojej strony jest elementem odpowiedzi, a nie jej ozdobą.
              </p>

              <h2 id="jak-sie-pojawic">Jak pojawić się w Google AI Mode: 6 kroków</h2>
              <p>
                Poniższe kroki łączą to, co Google dokumentuje, z naszą praktyką pracy nad treścią. Google nie publikuje czynników wyboru źródeł w AI Mode, więc to nie jest lista gwarancji, tylko sposób, żeby nie odpaść na warunkach, które znamy.
              </p>
              <ol>
                {KROKI.map(([nazwa, opis]) => (
                  <li key={nazwa}><strong>{nazwa}.</strong> {opis}</li>
                ))}
              </ol>
              <p>
                Jeśli prowadzisz firmę lokalną, zacznij od wizytówki, bo Google wymienia aktualny Profil Firmy w zaleceniach dla funkcji AI.
                {hrefWizytowka && <> Jak to robimy, opisaliśmy na stronie <Link href={hrefWizytowka}>pozycjonowanie wizytówki Google</Link>.</>}
                {' '}Warunki techniczne z kroku pierwszego dokładniej rozpisuje nasz <Link href="/blog/technical-seo-audit-checklist">audyt techniczny SEO</Link>. Indeksację w Bing, czyli drugiej dużej wyszukiwarce, opisujemy w poradniku <Link href="/blog/bing-webmaster-tools-indexnow-chatgpt">Bing Webmaster Tools i IndexNow</Link>.
              </p>

              <h2 id="pomiar">Jak sprawdzić, czy Google AI Mode cytuje Twoją stronę?</h2>
              <p>
                W Search Console ruch z AI Mode wchodzi do raportu Skuteczność w typie „Web” (kliknięcie linku do zewnętrznej strony liczy się jako kliknięcie, pozycja liczona jest jak na zwykłej stronie wyników, a pytanie uzupełniające to nowe zapytanie). Od 31 sierpnia 2026 r. działa dodatkowo osobny raport skuteczności w generatywnej AI (Generative AI performance), który wydziela wyświetlenia i kliknięcia z AI Overviews i AI Mode; dane z eksperymentów Search Labs nadal są pomijane.
              </p>
              <div className="table-container tabela-artykulu" tabIndex={0} role="region" aria-label="Raportowanie AI Mode w Search Console">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Metoda</th>
                      <th scope="col">Co pokazuje</th>
                      <th scope="col">Ograniczenie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POMIAR.map(([metoda, pokazuje, limit]) => (
                      <tr key={metoda}>
                        <th scope="row">{metoda}</th>
                        <td>{pokazuje}</td>
                        <td>{limit}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <h3>Prosty dziennik cytowań</h3>
              <p>
                Spisz 20–30 pytań, które klienci zadają przed zakupem. Raz w tygodniu zadawaj je w Trybie AI, w oknie prywatnym i po polsku. Zapisuj, czy Twoja domena jest cytowana i kto jest cytowany zamiast niej. Po miesiącu porównaj trend, bo pojedyncza odpowiedź niczego nie dowodzi.
              </p>
              <h3>Co zmierzyliśmy sami, a czego nie</h3>
              <p>
                W dniach 4–5.11.2026 zadaliśmy przez API DataForSEO LLM Responses pytania o polecenie firm, ceny i ranking agencji modelowi gpt-4.1-mini z wyszukiwaniem w sieci (lokalizacja Warszawa) oraz Perplexity (model sonar). To nie jest pomiar Google AI Mode, więc nie wyciągamy z niego wniosków o jego cytowaniach. Pokazuje tylko, że różne zapytania kierują do różnych źródeł:
              </p>
              <div className="table-container tabela-artykulu" tabIndex={0} role="region" aria-label="Źródła cytowane w testowych zapytaniach">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Typ pytania (ChatGPT, gpt-4.1-mini, 4–5.11.2026)</th>
                      <th scope="col">Linki w odpowiedziach</th>
                      <th scope="col">Dokąd prowadziły</th>
                    </tr>
                  </thead>
                  <tbody>
                    {POMIAR_WLASNY.map(([typ, linki, dokad]) => (
                      <tr key={typ}>
                        <th scope="row">{typ}</th>
                        <td>{linki}</td>
                        <td>{dokad}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>
                To mały pomiar (20 odpowiedzi ChatGPT) przez API, a aplikacja może odpowiedzieć inaczej.
                {hrefChatgpt && <> Pełną metodę i dane opisujemy w artykule <Link href={hrefChatgpt}>pozycjonowanie w ChatGPT</Link>.</>}
                {hrefAudytAi && <> Jeśli chcesz zlecić taki pomiar na pytaniach Twoich klientów, zobacz <Link href={hrefAudytAi}>audyt widoczności w AI</Link>: 990 zł netto jednorazowo, 30 pytań, a stały pomiar co tydzień to 490 zł netto miesięcznie. Audyt obejmuje przegląd AI w Google, nie osobny odczyt Trybu AI.</>}
                {hrefSprawdzarka && <> Szybki odczyt, czy modele wymieniają firmę, daje bezpłatna <Link href={hrefSprawdzarka}>sprawdzarka widoczności w AI</Link>.</>}
              </p>

              <h2 id="czego-nie-wiemy">Czego nie wiadomo o Google AI Mode</h2>
              <p>
                Google nie opublikował listy czynników, według których AI Mode wybiera źródła, ani udziału kliknięć, jaki ten tryb odbiera zwykłym wynikom. Google nie potwierdza większości porad o optymalizacji pod AI, więc traktujemy je jako hipotezy do sprawdzenia na własnych pytaniach. Nie obiecujemy cytowania w AI Mode, bo Google go nie gwarantuje.
                {hrefSeoVsGeo && <> Różnice między pracą nad klasycznym SEO a pracą nad cytowaniami opisaliśmy w porównaniu <Link href={hrefSeoVsGeo}>SEO vs GEO</Link>.</>}
              </p>

              <h2 id="pytania">Jakie pytania najczęściej padają o Google AI Mode?</h2>
              {FAQ.map((f) => (
                <div key={f.pytanie}>
                  <h3>{f.pytanie}</h3>
                  <p>{f.odpowiedz}</p>
                </div>
              ))}

              <p>
                Chcesz wiedzieć, czy Twoja strona spełnia warunki cytowania w AI Mode? W ramach usługi <Link href="/audyt-seo">audyt SEO strony internetowej</Link> sprawdzimy indeksowanie, ustawienia fragmentów i strukturę treści. <a href="#kontakt">Skontaktuj się z nami</a>, odpowiadamy w 24 h w dni robocze.
              </p>

              <Zrodla zrodla={ZRODLA} />

              <BlogCTA locale={locale} currentSlug={SCIEZKA} />
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
