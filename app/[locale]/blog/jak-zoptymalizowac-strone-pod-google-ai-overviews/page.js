// Artykuł tylko-PL (plOnly w lib/blogPosts.js, 308 /en/blog/<slug> -> /blog/<slug> w next.config.mjs).
// Treść: dokument „AI SEO - Optymalizacja pod Google AI Overviews” (17.11.2026).
// Zmiany względem dokumentu: title bez sufiksu marki (CLAUDE.md), meta skrócona do 136 zn.,
// link do nieistniejącego wpisu /blog/widocznosc-firmy-w-generatywnych-ai zastąpiony hubem
// /pozycjonowanie-w-ai i porównaniem SEO vs GEO, etykiety „Technika/Treść/…” w liście kontrolnej
// jako H3 (hierarchia nagłówków), „Porada profesjonalisty” bez pogrubienia (CLAUDE.md, <strong>).
// Recenzja 18.11.2026: fakty sprawdzone u źródeł pierwotnych (daty odczytu w ZRODLA), AnswerBox 48 słów,
// FAQ 43-62 słowa, H1 bez „GEO/AEO” (intencja huba i porównania SEO vs GEO), dopisane linki do narzędzi.
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
const SCIEZKA = '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews';
const URL_STRONY = `${BASE}${SCIEZKA}`;

// Title 59 zn., meta 136 zn. - te same wartości co titlePl/descPl w lib/blogPosts.js.
const TYTUL = 'Jak zoptymalizować stronę pod Google AI Overviews i AI Mode';
const OPIS = 'Google nie ma znaczników dla AI. Co decyduje o cytowaniu w AI Overviews, AI Mode i Perplexity: technika, treść, pomiar i plan na 30 dni.';
const H1 = 'Jak zoptymalizować stronę pod Google AI Overviews, AI Mode i Perplexity?';

const DATA_PUBLIKACJI = blogPosts.find((p) => p.slug === SCIEZKA)?.date;
const DATA_ZMIANY = LASTMOD[URL_STRONY] ?? DATA_PUBLIKACJI;

// FAQ: jedno źródło dla widocznego tekstu i FAQPage.
const FAQ = [
  {
    pytanie: 'Czy mogę zapłacić, żeby moja strona pojawiła się w AI Overviews?',
    odpowiedz: 'Dokumentacja Google opisuje tylko jeden warunek: strona ma być zindeksowana i kwalifikować się do wyświetlenia z fragmentem. Nie opisuje opłaty ani zgłoszenia, które gwarantowałyby cytowanie. Reklamy w Google Ads to osobny kanał, a o wyborze źródeł w podsumowaniu decydują systemy Google, nie reklamodawca.',
  },
  {
    pytanie: 'Jak pojawić się w AI Overviews, jeśli nie jestem w top 10?',
    odpowiedz: 'Szansę zwiększa query fan-out. Według Google AI Overviews i AI Mode wysyłają wiele powiązanych zapytań do różnych podtematów, więc pokazują szerszy zestaw linków niż klasyczne wyniki. Strona spoza pierwszej dziesiątki może zostać zacytowana, jeśli najlepiej odpowiada na jedno pytanie cząstkowe. To szansa, nie gwarancja, dlatego pisz osobne sekcje z jasnymi odpowiedziami na pytania szczegółowe.',
  },
  {
    pytanie: 'Czy potrzebuję pliku llms.txt albo specjalnego schematu, żeby trafić do AI Overviews?',
    odpowiedz: 'Według Google nie. Dokumentacja funkcji AI mówi, że nie trzeba tworzyć nowych plików ani znaczników dla AI i że nie ma specjalnego schematu schema.org, który należy dodać. Wystarczą standardowe praktyki SEO: indeksowanie, treść łatwa do zacytowania i dane strukturalne zgodne z widoczną treścią. Plik llms.txt nie jest więc warunkiem pojawienia się w AI Overviews.',
  },
  {
    pytanie: 'Czy zablokowanie Google-Extended usunie mnie z AI Overviews?',
    odpowiedz: 'Nie. Google-Extended to token w robots.txt, który ogranicza użycie treści do trenowania modeli Gemini i do groundingu w Gemini oraz Vertex AI. Według dokumentacji nie wpływa na obecność strony w Google Search i nie jest sygnałem rankingowym. Za obecność w AI Overviews odpowiadają indeksowanie, Googlebot i ustawienia snippetów, takie jak nosnippet, max-snippet i noindex.',
  },
  {
    pytanie: 'Jak sprawić, żeby Google nie pokazywał mojej treści w AI Overviews?',
    odpowiedz: 'Użyj nosnippet, data-nosnippet lub max-snippet, a w skrajnym przypadku noindex. Pierwsze trzy ograniczają fragmenty strony, data-nosnippet dotyczy tylko wybranego elementu, a noindex usuwa stronę z indeksu. Te same ustawienia działają w klasycznych wynikach, więc ograniczysz tam fragmenty lub widoczność. Po zmianie sprawdź stronę w Sprawdzaniu adresu URL i poczekaj na ponowne przeskanowanie.',
  },
  {
    pytanie: 'Czy AI Overviews zmniejszają ruch na stronie?',
    odpowiedz: 'To zależy od rodzaju zapytań i nie ma jednej odpowiedzi. Google twierdzi, że kliknięcia z wyników z AI Overviews są wyższej jakości, a użytkownicy częściej spędzają więcej czasu na stronie. To deklaracja Google, a nie niezależne badanie. Sprawdź to na własnych danych: porównaj w Search Console kliknięcia i CTR dla pytań informacyjnych oraz konwersje z ruchu organicznego przed zmianą i po niej.',
  },
  {
    pytanie: 'Czy AI Mode (Tryb AI) jest dostępny po polsku?',
    odpowiedz: 'Tak. Według strony pomocy Google (odczyt 18 listopada 2026 r.) Polska i język polski są na liście obsługiwanych krajów i języków AI Mode. Część funkcji ma osobne wymagania, na przykład wiek 18+, subskrypcję albo włączoną historię wyszukiwania, i nie wszystkie są dostępne w każdym kraju. Dostępność szybko się zmienia, więc przed planowaniem działań sprawdź aktualną listę.',
  },
  {
    pytanie: 'Jak trafić do Perplexity, jeśli moja strona jest dobrze widoczna w Google?',
    odpowiedz: 'Sprawdź, czy robots.txt i firewall przepuszczają PerplexityBota. Perplexity zaleca dopuszczenie go w robots.txt oraz zezwolenie na jego zakresy IP, które publikuje w pliku JSON. Widoczność w Google nie przekłada się automatycznie na Perplexity, bo to osobny system z własnym robotem. Zmiany w robots.txt mogą zacząć działać do 24 godzin po wprowadzeniu.',
  },
  {
    pytanie: 'Jak szybko zobaczę efekty zmian?',
    odpowiedz: 'Nie ma stałego terminu. Google może potrzebować od kilku dni do kilku miesięcy na ponowne przeskanowanie strony, a Perplexity podaje, że zmiany w robots.txt mogą zacząć działać do 24 godzin. Cytowania zależą też od konkurencji i zmieniają się z czasem, dlatego porównuj trendy co miesiąc, a nie pojedyncze wyniki, i nie obiecuj sobie efektu po tygodniu.',
  },
];

// Daty odczytu = dzień sprawdzenia źródła pierwotnego przy recenzji (18.11.2026).
const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website', data: '2026-11-18' },
  { url: 'https://support.google.com/websearch/answer/14901683?hl=pl', nazwa: 'Pomoc Google: Przegląd od AI w wynikach wyszukiwania', data: '2026-11-18' },
  { url: 'https://blog.google/products-and-platforms/products/search/google-search-ai-mode-update/', nazwa: 'Google Blog: ogłoszenie AI Mode w Google Search (20 maja 2025)', data: '2026-11-18' },
  { url: 'https://support.google.com/websearch/answer/16011537', nazwa: 'Pomoc Google: AI Mode - dostępność i wymagania', data: '2026-11-18' },
  { url: 'https://support.google.com/webmasters/answer/7042828', nazwa: 'Pomoc Search Console: raport Skuteczność - sposób liczenia danych', data: '2026-11-18' },
  { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Pomoc Search Console: raport skuteczności w generatywnej AI (Generative AI performance)', data: '2026-11-19' },
  { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google: przegląd typowych robotów Google (Google-Extended)', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Creating helpful, reliable, people-first content', data: '2026-11-18' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity Docs: dokumentacja robotów (PerplexityBot, Perplexity-User)', data: '2026-11-18' },
  { url: 'https://www.perplexity.ai/help-center/en/articles/10352895-how-does-perplexity-work', nazwa: 'Perplexity Help Center: How does Perplexity work?', data: '2026-11-18' },
];

const TOC = [
  { id: 'w-skrocie', title: 'Najważniejsze informacje w skrócie' },
  { id: 'ai-overviews', title: 'Czym są Google AI Overviews i skąd biorą źródła?' },
  { id: 'ai-mode', title: 'Jak działa Google AI Mode i czym jest query fan-out?' },
  { id: 'geo-aeo', title: 'Czym jest GEO/AEO i gdzie zaczyna się praktyka?' },
  { id: 'technika', title: 'Optymalizacja techniczna pod AI Overviews' },
  { id: 'tresc', title: 'Jak pisać treści, żeby pojawić się w AI Overviews?' },
  { id: 'dane-strukturalne', title: 'Czy dane strukturalne pomagają w AI Overviews?' },
  { id: 'eeat', title: 'E-E-A-T, linkowanie wewnętrzne i multimedia' },
  { id: 'tresc-ai-mode', title: 'Treść pod Google AI Mode i pytania uzupełniające' },
  { id: 'perplexity', title: 'Jak trafić do odpowiedzi Perplexity AI?' },
  { id: 'pomiar', title: 'Jak zmierzyć wpływ AI Overviews na ruch?' },
  { id: 'lista-kontrolna', title: 'Lista kontrolna przed optymalizacją pod AI' },
  { id: 'plan-30-dni', title: 'Plan wdrożenia na 30 dni' },
  { id: 'pytania', title: 'Pytania o AI Overviews, AI Mode i Perplexity' },
  { id: 'podsumowanie', title: 'Od indeksu do cytowania - podsumowanie' },
  { id: 'zrodla', title: 'Źródła' },
];

const W_SKROCIE = [
  ['Brak „magicznych” znaczników', 'Google nie wymaga osobnych plików, schematów ani znaczników dla funkcji AI. Liczy się indeksowanie i kwalifikacja do wyświetlenia z fragmentem.'],
  ['Odpowiedź na początku sekcji', 'Pierwsze 1-2 zdania pod nagłówkiem powinny samodzielnie odpowiadać na pytanie z nagłówka.'],
  ['Nagłówki jako pytania', 'H2 i H3 sformułowane tak, jak pytają użytkownicy, ułatwiają dopasowanie do zapytań cząstkowych (query fan-out).'],
  ['Fakty ze źródłami', 'Liczby, daty i definicje z podanym źródłem są łatwiejsze do zacytowania niż ogólniki.'],
  ['Kontrola fragmentów', 'Atrybuty nosnippet, data-nosnippet i max-snippet ograniczają to, co Google może pokazać, także w AI Overviews.'],
  ['Google-Extended to nie SEO', 'Blokada Google-Extended nie wpływa na obecność w wyszukiwarce Google ani na ranking.'],
  ['Perplexity rządzi się własnymi zasadami', 'O widoczności w Perplexity AI decyduje dostęp PerplexityBota, a nie Googlebota. Sprawdź też reguły WAF.'],
  ['Mierz, zamiast zgadywać', 'Ruch z AI Overviews i AI Mode trafia do raportu Skuteczność w Search Console (typ „Web”). Perplexity widać w GA4 jako odesłanie.'],
];

const PLAN = [
  ['Dni 1-5', 'Wybór 20-30 pytań kluczowych, pierwszy pomiar w Google, AI Mode i Perplexity, eksport danych z Search Console', 'Punkt odniesienia i lista priorytetów'],
  ['Dni 6-10', 'Przegląd techniczny: indeksowanie, robots.txt, WAF, nosnippet/max-snippet, renderowanie JS', 'Lista błędów blokujących cytowania'],
  ['Dni 11-15', 'Poprawki techniczne i dopuszczenie PerplexityBota; weryfikacja w Sprawdzaniu adresu URL', 'Strony dostępne i kwalifikujące się do snippetów'],
  ['Dni 16-22', 'Przebudowa 5-10 kluczowych artykułów: nagłówki-pytania, odpowiedzi na początku sekcji, tabele, źródła, autor', 'Treści gotowe do cytowania'],
  ['Dni 23-26', 'Dane strukturalne zgodne z treścią, linkowanie wewnętrzne w klastrze, obrazy i opisy', 'Lepszy kontekst tematyczny'],
  ['Dni 27-30', 'Ponowny pomiar, konfiguracja raportu GA4 dla ruchu z AI, plan kolejnych 30 dni', 'Porównanie z punktem wyjścia i dalsze priorytety'],
];

const LISTA_KONTROLNA = [
  ['Technika', [
    'Strona jest zindeksowana (Sprawdzanie adresu URL w Search Console).',
    'Robots.txt, CDN i firewall nie blokują Googlebota ani PerplexityBota.',
    'Brak przypadkowych noindex, nosnippet i max-snippet:0.',
    'Kluczowa treść jest widoczna w zrenderowanym HTML.',
    'Strona działa szybko na urządzeniach mobilnych.',
  ]],
  ['Treść', [
    'Nagłówki H2 i H3 są sformułowane jako pytania użytkowników.',
    'Pierwsze 1-2 zdania każdej sekcji odpowiadają na pytanie z nagłówka.',
    'Procedury są w listach numerowanych, porównania w tabelach.',
    'Liczby i fakty mają podane źródła.',
    'Data aktualizacji jest widoczna i odpowiada realnym zmianom.',
  ]],
  ['Wiarygodność i kontekst', [
    'Artykuł ma podpisanego autora z biogramem.',
    'Dane strukturalne są zgodne z widoczną treścią.',
    'Strona jest powiązana linkami wewnętrznymi z klastrem tematycznym.',
    'Ważne treści mają własne obrazy lub wideo z opisami.',
  ]],
  ['Pomiar', [
    'Search Console jest zweryfikowana, a raport Skuteczność monitorowany co tydzień.',
    'Prowadzisz dziennik testowych zapytań w Google i Perplexity.',
    'GA4 wydziela ruch z Perplexity i innych asystentów AI.',
  ]],
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

export default async function ArtykulAiOverviews({ params }) {
  const { locale } = await params;
  if (locale === 'en') return null;

  // Reguła 6.0: link tylko do strony, która zwraca 200 - inaczej zwykły tekst.
  const hrefSeoVsGeo = hrefJesliOpublikowana('/porownania/seo-vs-geo');
  const hrefAudytAi = hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci');
  const hrefBoty = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  const hrefSprawdzarka = hrefJesliOpublikowana('/sprawdz-widocznosc-w-ai');

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
              Pozycjonowanie w AI
            </span>
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 500, color: 'var(--w-tusz)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
            {H1}
          </h1>
          <Byline sciezka={SCIEZKA} />
          <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '1.5rem' }}></div>

          <div className="article-content">
              <AnswerBox>
                Żeby zoptymalizować stronę pod Google AI Overviews, zadbaj o dwie rzeczy: stronę, którą Google może zaindeksować i pokazać z fragmentem, oraz sekcje z konkretną, sprawdzalną odpowiedzią na pytanie z nagłówka. Google potwierdza, że nie wymaga do tego specjalnych znaczników, plików ani schematów. Resztę załatwia klasyczne SEO i pomiar.
              </AnswerBox>

              <p className="lead">
                W tym przewodniku o optymalizacji pod Google AI Overviews przechodzimy przez całą ścieżkę: od technicznych warunków wejścia, przez pisanie sekcji pod cytowanie, po Google AI Mode, Perplexity AI i pomiar w Search Console. Bez obietnic gwarancji, bo tych nie da nikt. Za to z konkretnymi krokami, które pozwalają działać bez zgadywania. Z listą kontrolną i planem na 30 dni, który możesz wdrożyć z małym zespołem.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="w-skrocie">Najważniejsze informacje w skrócie</h2>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Zasada</th>
                      <th scope="col">Szczegóły</th>
                    </tr>
                  </thead>
                  <tbody>
                    {W_SKROCIE.map(([zasada, opis]) => (
                      <tr key={zasada}>
                        <th scope="row">{zasada}</th>
                        <td>{opis}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <h2 id="ai-overviews">Czym są Google AI Overviews (Przegląd od AI) i skąd biorą źródła?</h2>
              <p>AI Overviews to generowane przez AI podsumowania nad wynikami Google, które streszczają temat i linkują do stron, na których można dowiedzieć się więcej. W polskim interfejsie funkcja pojawia się jako „Przegląd od AI”. Według strony pomocy Google funkcja pojawia się wtedy, gdy systemy uznają, że generatywna AI może być szczególnie pomocna - więc przy wielu zapytaniach podsumowania po prostu nie ma.</p>
              <p>To pierwsza ważna lekcja. Zanim zaczniesz cokolwiek zmieniać, sprawdź, czy przy Twoich kluczowych pytaniach podsumowanie w ogóle się pojawia. Nie zakładaj z góry, które zapytania je wywołują. Sprawdź to własnym testem, który opisujemy w sekcji o pomiarze.</p>

              <h3>Skąd AI Overviews biorą cytowane strony</h3>
              <p>Cytowania w AI Overviews pochodzą z indeksu Google. Dokumentacja Google Search Central mówi jasno: aby strona mogła pojawić się jako link pomocniczy w AI Overviews lub AI Mode, musi być zindeksowana i kwalifikować się do wyświetlenia w wyszukiwarce z fragmentem (snippetem). Nie ma dodatkowych wymagań technicznych.</p>
              <p>W praktyce oznacza to, że optymalizacja pod AI Overviews nie zastępuje klasycznego SEO. Jest jego kontynuacją. Strona, która nie radzi sobie z indeksowaniem, nie trafi do podsumowania, nawet jeśli ma najlepszą treść w branży.</p>

              <h3>Dlaczego cytowania różnią się od dziesięciu niebieskich linków</h3>
              <p>Google opisuje, że AI Overviews i AI Mode mogą wysyłać wiele powiązanych zapytań do różnych podtematów i źródeł. Dzięki temu pokazują szerszy i bardziej zróżnicowany zestaw linków niż tradycyjne wyniki. Dla Ciebie to dobra wiadomość: strona, która nie jest w pierwszej trójce na główne zapytanie, może zostać zacytowana, bo najlepiej odpowiada na jedno z pytań cząstkowych.</p>

              <h2 id="ai-mode">Jak działa Google AI Mode (Tryb AI) i czym jest query fan-out?</h2>
              <p>Google AI Mode (po polsku „Tryb AI”) to osobny, konwersacyjny tryb wyszukiwarki dla bardziej złożonych pytań, które wymagają zgłębienia tematu. Zamiast listy wyników dostajesz rozbudowaną odpowiedź z linkami do źródeł i możliwość zadawania pytań uzupełniających. Osobny przewodnik o <Link href="/blog/google-ai-mode-jak-sie-pojawic">Google AI Mode</Link>: dostępność, różnice względem przeglądu AI i pomiar w Search Console.</p>
              <p>Kluczem do zrozumienia, jak działa AI Mode, jest technika query fan-out. W ogłoszeniu z 20 maja 2025 roku Google wyjaśnia, że AI Mode dzieli pytanie na podtematy i wysyła wiele zapytań jednocześnie, dzięki czemu przeszukuje sieć głębiej niż klasyczna wyszukiwarka.</p>

              <h3>Query fan-out na przykładzie</h3>
              <p>Załóżmy, że użytkownik pyta: „Jaką pompę ciepła wybrać do domu 150 m² na Mazowszu i ile to kosztuje z dotacją?”. AI Mode może rozbić to na kilka pytań cząstkowych:</p>
              <ul>
                <li>Jak dobrać moc pompy ciepła do powierzchni domu?</li>
                <li>Pompa powietrzna czy gruntowa - różnice w kosztach i sprawności?</li>
                <li>Jakie dotacje na pompę ciepła są dostępne w Polsce?</li>
                <li>Ile kosztuje montaż pompy ciepła?</li>
              </ul>
              <p>Każde z tych pytań może być obsłużone przez inną stronę. Jeśli Twój artykuł ma osobną, jasno opisaną sekcję o doborze mocy, ma szansę stać się źródłem dla tego jednego elementu odpowiedzi. Dlatego struktura treści oparta na pytaniach jest dziś tak ważna.</p>

              <h3>Czy AI Mode działa w Polsce?</h3>
              <p>Według strony pomocy Google o AI Mode (odczyt 18 listopada 2026 r.) Polska znajduje się na liście obsługiwanych krajów, a język polski na liście obsługiwanych języków. Niektóre funkcje, np. personalizacja czy najnowsze modele, mają jednak osobne wymagania (wiek 18+, subskrypcja, włączona historia wyszukiwania) i nie wszystkie są dostępne w każdym kraju. Dostępność zmienia się szybko, więc przed planowaniem kampanii sprawdź aktualny stan na stronie pomocy Google.</p>
              <p><em>Porada profesjonalisty:</em> AI Overviews i AI Mode mogą korzystać z różnych modeli i technik. Ta sama strona bywa cytowana w jednym miejscu, a pomijana w drugim. Testuj oba widoki osobno.</p>

              <h2 id="geo-aeo">Czym jest GEO/AEO i gdzie zaczyna się praktyka?</h2>
              <p>
                GEO (Generative Engine Optimization) to optymalizacja pod wyszukiwarki generatywne, a AEO (Answer Engine Optimization) - pod systemy udzielające bezpośrednich odpowiedzi. GEO/AEO to więc wspólny parasol dla działań, które zwiększają szansę, że AI zacytuje Twoją stronę.
                {hrefSeoVsGeo && <> Różnice między SEO a GEO w ośmiu kryteriach rozpisaliśmy w porównaniu <Link href={hrefSeoVsGeo}>SEO vs GEO</Link>.</>}
                {' '}Całą usługę, z pomiarem widoczności w odpowiedziach modeli, opisujemy na stronie <Link href="/pozycjonowanie-w-ai">optymalizacja pod AI Overview</Link>.
              </p>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Skrót</th>
                      <th scope="col">W skrócie</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">SEO</th><td>Widoczność w klasycznych wynikach Google</td></tr>
                    <tr><th scope="row">GEO</th><td>Cytowania w odpowiedziach generatywnych (AI Overviews, AI Mode, Perplexity)</td></tr>
                    <tr><th scope="row">AEO</th><td>Bezpośrednia, zwięzła odpowiedź na konkretne pytanie</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Tutaj skupiamy się na praktyce: co konkretnie zmienić na stronie, żeby zwiększyć szansę na cytowanie w Google i Perplexity AI.</p>

              <h2 id="technika">Jak zoptymalizować stronę pod Google AI Overviews od strony technicznej?</h2>
              <p>Wszystko zaczyna się od warunku, który Google wymienia jako konieczny: indeksowania i kwalifikacji do snippetu. Jeśli tu są luki, praca nad treścią nie przyniesie efektu.</p>

              <h3>Indeksowalność i dostęp Googlebota</h3>
              <p>Googlebot musi mieć dostęp do strony. Sprawdź:</p>
              <ul>
                <li>czy robots.txt nie blokuje ważnych sekcji (np. /blog/ albo katalogu z produktami),</li>
                <li>czy CDN lub hosting nie odrzucają Googlebota (Google każe sprawdzić, czy infrastruktura też zezwala na crawling),</li>
                <li>czy strony nie mają przypadkowego noindex, np. po migracji z wersji testowej,</li>
                <li>czy kanoniczne adresy wskazują właściwe wersje stron,</li>
                <li>czy ważne podstrony są w mapie witryny XML.</li>
              </ul>
              <p>Najszybciej sprawdzisz to narzędziem Sprawdzanie adresu URL w Search Console. Jeśli potrzebujesz szerszego przeglądu, zobacz poradnik <Link href="/blog/technical-seo-audit-checklist">jak zrobić audyt SEO</Link> z progami technicznymi.</p>

              <h3>Snippety: nosnippet, data-nosnippet i max-snippet</h3>
              <p>To najczęściej pomijany punkt. Google wymienia te same mechanizmy kontroli dla funkcji AI co dla zwykłych wyników:</p>
              <ul>
                <li><strong>nosnippet</strong> - blokuje pokazywanie fragmentu strony, więc ogranicza też użycie jej tekstu w AI Overviews,</li>
                <li><strong>data-nosnippet</strong> - wyłącza z fragmentów tylko wybrany element HTML,</li>
                <li><strong>max-snippet</strong> - ogranicza długość fragmentu,</li>
                <li><strong>noindex</strong> - wyklucza stronę z indeksu, a więc i z AI Overviews.</li>
              </ul>
              <p>Zdarza się, że wtyczka SEO lub szablon ustawia max-snippet:0 albo nosnippet globalnie. Wtedy strona może rankować w klasycznych wynikach, ale nie zostanie wykorzystana jako fragment. Sprawdź nagłówki X-Robots-Tag i meta robots na kluczowych podstronach.</p>

              <h3>Google-Extended a wyszukiwarka</h3>
              <p>Google-Extended to token w robots.txt, którym decydujesz, czy treści pobrane przez Google mogą służyć do trenowania modeli Gemini i do groundingu w innych produktach Google. Dokumentacja Google mówi wprost, że Google-Extended nie wpływa na obecność witryny w Google Search i nie jest sygnałem rankingowym. Zablokowanie go nie wyłączy więc strony z AI Overviews - za to odpowiadają Googlebot, noindex i atrybuty snippetów.</p>

              <h3>Renderowanie JavaScript i treść w HTML</h3>
              <p>Google zaleca, aby ważne treści były dostępne w formie tekstowej. Jeśli kluczowe odpowiedzi ładują się dopiero po interakcji (zakładki, akordeony, „pokaż więcej” pobierane z API) albo są w obrazkach, model ma mniejszą szansę je wykorzystać. Sprawdź w Sprawdzaniu adresu URL zrenderowany HTML i upewnij się, że widać w nim treść, nie tylko szkielet strony. Przy stronach opartych na frameworkach JS rozważ renderowanie po stronie serwera dla treści informacyjnych.</p>

              <h3>Szybkość i page experience</h3>
              <p>Google wymienia dobre doświadczenie użytkownika na stronie jako jedną z praktyk wspierających widoczność w funkcjach AI. Wolna, przeładowana reklamami strona zniechęca użytkownika, który kliknął link z podsumowania, a to on ostatecznie konwertuje.</p>

              <h2 id="tresc">Jak pisać treści, żeby pojawić się w AI Overviews?</h2>
              <p>Optymalizacja treści pod AI Overviews sprowadza się do jednej zasady: każda sekcja powinna być samodzielną, gotową do zacytowania odpowiedzią na konkretne pytanie. Model nie czyta artykułu jak człowiek od początku do końca. Wyszukuje fragment, który najlepiej pasuje do pytania cząstkowego.</p>

              <h3>Odpowiedź w pierwszym akapicie sekcji</h3>
              <p>Pod każdym nagłówkiem H2 lub H3 umieść 1-2 zdania, które bezpośrednio odpowiadają na pytanie z nagłówka. Dopiero potem rozwijaj kontekst, przykłady i wyjątki.</p>
              <p>Porównaj:</p>
              <ul>
                <li><strong>Słabo:</strong> „Temat kosztów montażu jest złożony i zależy od wielu czynników, o których opowiemy poniżej.”</li>
                <li><strong>Dobrze:</strong> „Montaż pompy ciepła powietrze-woda w domu jednorodzinnym to zwykle koszt instalacji plus robocizna; ostateczna cena zależy od mocy urządzenia, rodzaju ogrzewania i stanu instalacji.”</li>
              </ul>

              <h3>Struktura pytań w H2 i H3</h3>
              <p>Nagłówki pisz tak, jak użytkownik formułuje pytanie. „Ile kosztuje audyt SEO?” jest lepsze niż „Cennik”. „Jak dobrać moc pompy ciepła?” jest lepsze niż „Moc”. Dzięki temu łatwiej dopasować sekcję do zapytań cząstkowych generowanych przez query fan-out.</p>
              <p>Skąd brać pytania? Z sekcji „Podobne pytania” w Google, z zapytań w Search Console, z rozmów działu sprzedaży i obsługi klienta. Systematyczny proces opisaliśmy w artykule o <Link href="/blog/content-gap-analysis">analizie luk contentowych</Link>.</p>

              <h3>Listy kroków i tabele porównawcze</h3>
              <p>Procedury zapisuj jako numerowane listy, a porównania jako tabele. Takie formaty mają jasną strukturę, którą łatwo przenieść do odpowiedzi. Przykładowo:</p>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Element sekcji</th>
                      <th scope="col">Co zawiera</th>
                      <th scope="col">Po co</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><th scope="row">Nagłówek-pytanie</th><td>Pytanie użytkownika</td><td>Dopasowanie do zapytania cząstkowego</td></tr>
                    <tr><th scope="row">Odpowiedź (1-2 zdania)</th><td>Konkretna odpowiedź</td><td>Fragment gotowy do cytowania</td></tr>
                    <tr><th scope="row">Rozwinięcie</th><td>Kontekst, wyjątki, przykład</td><td>Głębia i wiarygodność</td></tr>
                    <tr><th scope="row">Lista lub tabela</th><td>Kroki, parametry, różnice</td><td>Łatwe przetwarzanie przez AI i ludzi</td></tr>
                  </tbody>
                </table>
              </div>

              <h3>Fakty z liczbami i źródłami</h3>
              <p>Konkret wygrywa z ogólnikiem. Zamiast „wiele firm korzysta z AI” podaj liczbę, datę i źródło. Jeśli nie masz wiarygodnej liczby, nie wymyślaj jej - lepiej opisać mechanizm lub własne doświadczenie.</p>
              <p>Najcenniejsze są dane własne: wyniki ankiety klientów, średnie czasy realizacji, ceny z cennika, wnioski z wdrożeń. Google w wytycznych o pomocnych treściach pyta wprost, czy treść zawiera oryginalne informacje, badania lub analizy. Unikalne dane trudno zastąpić cudzą stroną.</p>

              <h3>Aktualność i daty aktualizacji</h3>
              <p>Przy tematach, które się zmieniają (ceny, przepisy, dostępność funkcji), pokaż datę ostatniej aktualizacji i faktycznie aktualizuj treść. Google ostrzega jednak przed sztucznym zmienianiem dat bez istotnych zmian w treści. Zmieniaj datę wtedy, gdy zmieniasz merytorykę.</p>

              <h2 id="dane-strukturalne">Czy dane strukturalne pomagają w AI Overviews?</h2>
              <p>Dane strukturalne nie są biletem do AI Overviews. Google nie przewiduje specjalnego schematu schema.org dla funkcji AI i nie wymaga dodatkowych znaczników. Jednocześnie wśród zalecanych praktyk wymienia, by dane strukturalne były zgodne z widoczną treścią strony.</p>
              <p>Jak więc z nich korzystać?</p>
              <ul>
                <li>Stosuj standardowe typy tam, gdzie pasują: Article, Product, Organization, LocalBusiness, BreadcrumbList.</li>
                <li>Dbaj, by cena, dostępność, autor czy data w znacznikach były identyczne z tym, co widzi użytkownik.</li>
                <li>Nie oznaczaj treści, których na stronie nie ma - to łamie wytyczne i podważa wiarygodność.</li>
                <li>Dla sklepów i firm lokalnych aktualizuj Merchant Center i Profil Firmy w Google; Google wymienia to w zaleceniach dla funkcji AI.</li>
              </ul>
              <p>Dane strukturalne pomagają Google zrozumieć, czym jest strona i do kogo należy. To wsparcie, a nie dźwignia.</p>

              <h2 id="eeat">Jak wzmocnić E-E-A-T, linkowanie wewnętrzne i multimedia?</h2>
              <p>Google nie publikuje osobnych kryteriów wyboru źródeł do AI Overviews, ale w wytycznych o pomocnych treściach stawia na zaufanie. E-E-A-T (doświadczenie, wiedza ekspercka, autorytet, wiarygodność) nie jest bezpośrednim czynnikiem rankingowym, ale według Google pomaga systemom rozpoznawać dobre treści - a najważniejszym elementem jest zaufanie.</p>

              <h3>Autorzy z prawdziwym doświadczeniem</h3>
              <p>Podpisuj artykuły ekspertów, którzy faktycznie wykonują opisywaną pracę. Dodaj krótki biogram i stronę autora z doświadczeniem, certyfikatami lub realizacjami. Google ostrzega przed fałszywymi profilami twórców, np. z wygenerowanymi przez AI zdjęciami - to sygnał niskiej jakości, a nie autorytetu.</p>
              <p>Pokazuj doświadczenie w treści: opis tego, co faktycznie zrobiono i z jakim skutkiem, mówi więcej niż „eksperci zalecają”.</p>

              <h3>Linkowanie wewnętrzne jako mapa tematu</h3>
              <p>Google zaleca łatwą nawigację przez linki wewnętrzne. Zbuduj klaster: stronę główną tematu (np. usługę) i artykuły odpowiadające na pytania szczegółowe. Linkuj między nimi opisowymi anchorami.</p>

              <h3>Obrazy i wideo</h3>
              <p>Google zachęca do uzupełniania tekstu wysokiej jakości obrazami i filmami. Własne zdjęcia, schematy i krótkie wideo instruktażowe z opisowymi tekstami alternatywnymi oraz transkrypcją zwiększają wartość strony.</p>

              <h2 id="tresc-ai-mode">Jak przygotować treść pod Google AI Mode i pytania uzupełniające?</h2>
              <p>Google AI Mode różni się od AI Overviews tym, że rozmowa trwa dłużej. Użytkownik zadaje pytanie, dostaje odpowiedź, a potem dopytuje. Search Console traktuje każde pytanie uzupełniające jako nowe zapytanie, co dobrze pokazuje logikę trybu: każda tura to nowa szansa na cytowanie.</p>
              <p>Co to oznacza w praktyce?</p>
              <ul>
                <li><strong>Pokryj ścieżkę decyzji, nie jedno pytanie.</strong> Jeśli piszesz o wyborze CRM, przewidź kolejne pytania: integracje, koszty wdrożenia, czas migracji, alternatywy.</li>
                <li><strong>Dodawaj porównania i kryteria wyboru.</strong> Użytkownicy często dopytują o różnice, więc tabela „opcja A vs B vs C” z jasnymi kryteriami to naturalny materiał na odpowiedź.</li>
                <li><strong>Opisuj wyjątki i warunki brzegowe.</strong> „To rozwiązanie nie sprawdzi się, jeśli…” - takie zdania pomagają odpowiedzieć na doprecyzowujące pytania.</li>
                <li><strong>Utrzymuj spójność między stronami.</strong> Jeśli cennik mówi jedno, a artykuł blogowy drugie, system może pominąć oba źródła albo zacytować nieaktualne.</li>
              </ul>
              <p><em>Porada profesjonalisty:</em> Zapisz 10 pytań, które klienci zadają przed zakupem, i przetestuj je w AI Mode po polsku. Zanotuj, które domeny są cytowane i jakich informacji brakuje w Twoich treściach. To gotowa lista tematów do uzupełnienia.</p>

              <h2 id="perplexity">Jak trafić do odpowiedzi Perplexity AI?</h2>
              <p>Perplexity AI to wyszukiwarka odpowiadająca w czasie rzeczywistym, która przy każdej odpowiedzi pokazuje numerowane przypisy z linkami do źródeł. Aby trafić do Perplexity, Twoja strona musi być dostępna dla jej robotów i zawierać treść, którą da się łatwo zacytować. Perplexity korzysta z własnych robotów, więc dostęp Googlebota niczego tu nie rozstrzyga.</p>

              <h3>PerplexityBot i Perplexity-User - czym się różnią</h3>
              <p>Dokumentacja Perplexity opisuje dwa user-agenty:</p>
              <ul>
                <li><strong>PerplexityBot</strong> - służy do wyświetlania i linkowania stron w wynikach Perplexity. Według dokumentacji nie zbiera treści do trenowania modeli. Perplexity zaleca dopuszczenie go w robots.txt.</li>
                <li><strong>Perplexity-User</strong> - pobiera stronę w imieniu użytkownika, gdy ten zada pytanie. Ponieważ żądanie pochodzi od użytkownika, ten fetcher zasadniczo ignoruje reguły robots.txt.</li>
              </ul>
              <p>Jeśli blokujesz PerplexityBota w robots.txt, ograniczasz szansę na pojawienie się w indeksie Perplexity. Minimalny wpis dopuszczający wygląda tak:</p>
              <pre><code>{`User-agent: PerplexityBot
Allow: /`}</code></pre>

              <h3>WAF i Cloudflare - częsta przyczyna braku cytowań</h3>
              <p>Robots.txt to nie wszystko. Firewall aplikacyjny potrafi zablokować bota, nawet jeśli robots.txt na to pozwala. Perplexity publikuje zakresy IP swoich robotów w plikach JSON i zaleca, by na ich podstawie tworzyć reguły zezwalające, łącząc dopasowanie user-agenta z weryfikacją IP. W Cloudflare dokumentacja zaznacza, że trybu Bot Fight Mode nie da się pominąć regułą WAF. Zmiany w ustawieniach robots.txt mogą zacząć działać do 24 godzin po wprowadzeniu.</p>

              <h3>Perplexity SEO w praktyce</h3>
              <p>Zasady treściowe są w dużej mierze wspólne z Google. Na co zwrócić uwagę szczególnie:</p>
              <ul>
                <li><strong>Jednoznaczne definicje i fakty.</strong> Każda odpowiedź Perplexity ma numerowane przypisy z linkami do źródeł. Zdanie z liczbą, datą i źródłem łatwiej zacytować niż ogólnik.</li>
                <li><strong>Aktualność.</strong> Perplexity przeszukuje internet na bieżąco, więc nieaktualne dane i daty są ryzykiem. Aktualizuj to, co się zmienia.</li>
                <li><strong>Czysty HTML.</strong> Treść widoczna bez logowania, bez pop-upów zasłaniających tekst i bez ładowania kluczowych informacji wyłącznie przez JavaScript.</li>
                <li><strong>Spójność wzmianek.</strong> Opisy firmy w katalogach, mediach i na Twojej stronie powinny się zgadzać.</li>
              </ul>
              {hrefBoty && <p>Dostęp botów AI do swojej strony możesz sprawdzić w <Link href={hrefBoty}>bezpłatnym teście dostępu botów AI</Link>.</p>}
              <p>Szersze tło, czyli jak modele językowe dobierają źródła i jak budować rozpoznawalność marki poza wyszukiwarką, opisujemy w ramach naszej <Link href="/pozycjonowanie-w-ai">usługi pozycjonowania w AI i AI Overview</Link>.</p>

              <h2 id="pomiar">Jak zmierzyć wpływ AI Overviews na ruch na stronie?</h2>
              <p>Zacznij od Search Console. Według Google strony wyświetlane w AI Overviews i AI Mode są wliczane do ogólnego ruchu w raporcie Skuteczność (typ „Web”), a od 31 sierpnia 2026 r. także raportowane osobno w raporcie skuteczności generatywnej AI (Generative AI performance). Sam raport pokazuje łączny wpływ funkcji generatywnych, więc dla konkretnych pytań i cytowań konkurencji nadal warto uzupełniać go o dziennik zapytań.</p>

              <h3>Jak Search Console liczy AI Overviews i AI Mode</h3>
              <p>Według pomocy Search Console:</p>
              <ul>
                <li><strong>AI Overviews:</strong> całe podsumowanie zajmuje jedną pozycję, a wszystkie linki w nim dostają tę samą pozycję. Kliknięcie w link do zewnętrznej strony liczy się jako kliknięcie.</li>
                <li><strong>AI Mode:</strong> pozycja jest liczona według tych samych zasad co na zwykłej stronie wyników; pytanie uzupełniające to nowe zapytanie.</li>
                <li><strong>Search Labs:</strong> dane z eksperymentów w Search Labs nie są uwzględniane.</li>
              </ul>

              <h3>Testowe zapytania i dziennik cytowań</h3>
              <p>Search Console nie powie Ci, które zapytania wywołały podsumowanie z Twoim linkiem. Uzupełnij dane ręcznie:</p>
              <ol>
                <li>Wybierz 20-30 pytań kluczowych dla biznesu.</li>
                <li>Raz w tygodniu sprawdzaj je w Google (AI Overviews), w AI Mode i w Perplexity AI - w oknie prywatnym, z polską lokalizacją.</li>
                <li>Zapisuj w arkuszu: czy pojawiło się podsumowanie, czy Twoja domena jest cytowana, które domeny konkurencji są cytowane.</li>
                <li>Porównuj trendy co miesiąc, a nie pojedyncze wyniki, bo odpowiedzi AI się zmieniają.</li>
              </ol>
              {hrefAudytAi && <p>Jeśli nie chcesz prowadzić takiego dziennika samodzielnie, zobacz, co obejmuje nasz <Link href={hrefAudytAi}>audyt widoczności w AI</Link>.</p>}

              {hrefSprawdzarka && <p>Pierwszy szybki odczyt, czy modele wymieniają Twoją firmę, daje bezpłatna <Link href={hrefSprawdzarka}>sprawdzarka widoczności w AI</Link>. Nie zastępuje ona ręcznego dziennika dla AI Overviews, bo dotyczy innych systemów.</p>}

              <h3>Perplexity w GA4 i jakość ruchu</h3>
              <p>Ruch z Perplexity AI pojawia się w Google Analytics 4 jako odesłanie (źródło z domeną perplexity.ai). Utwórz eksplorację lub własną grupę kanałów, w której wydzielisz ruch z asystentów AI, i porównuj go z ruchem organicznym pod kątem zaangażowania i konwersji.</p>
              <p>Google twierdzi, że kliknięcia z wyników z AI Overviews są wyższej jakości, bo użytkownicy częściej spędzają więcej czasu na stronie. Traktuj to jako hipotezę do sprawdzenia na własnych danych, nie jako pewnik. Patrz na konwersje, a nie tylko na kliknięcia.</p>

              <h2 id="lista-kontrolna">Lista kontrolna: co sprawdzić przed optymalizacją pod AI?</h2>
              <p>Ta lista zbiera najważniejsze punkty z całego artykułu w jednym miejscu. Przejdź przez nią dla 10-20 najważniejszych podstron.</p>
              {LISTA_KONTROLNA.map(([grupa, punkty]) => (
                <div key={grupa}>
                  <h3>{grupa}</h3>
                  <ul>
                    {punkty.map((p) => <li key={p}>{p}</li>)}
                  </ul>
                </div>
              ))}

              <h2 id="plan-30-dni">Plan wdrożenia na 30 dni</h2>
              <p>Plan zakłada mały zespół: jedną osobę od SEO, jedną od treści i dostęp do programisty na kilka godzin tygodniowo.</p>
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th scope="col">Okres</th>
                      <th scope="col">Zadania</th>
                      <th scope="col">Efekt</th>
                    </tr>
                  </thead>
                  <tbody>
                    {PLAN.map(([okres, zadania, efekt]) => (
                      <tr key={okres}>
                        <th scope="row">{okres}</th>
                        <td>{zadania}</td>
                        <td>{efekt}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>Pamiętaj, że ponowne przeskanowanie strony przez Google może zająć od kilku dni do kilku miesięcy. Pomiar po 30 dniach pokazuje kierunek, nie ostateczny wynik.</p>

              <h2 id="pytania">Jakie pytania najczęściej padają o AI Overviews, AI Mode i Perplexity?</h2>
              {FAQ.map((f) => (
                <div key={f.pytanie}>
                  <h3>{f.pytanie}</h3>
                  <p>{f.odpowiedz}</p>
                </div>
              ))}

              <h2 id="podsumowanie">Od indeksu do cytowania - podsumowanie</h2>
              <p>Jak zoptymalizować stronę pod Google AI Overviews? Najpierw upewnij się, że Google może ją zaindeksować i pokazać z fragmentem. Potem przebuduj treść tak, by każda sekcja zaczynała się od konkretnej odpowiedzi na pytanie z nagłówka, a fakty miały źródła. Na koniec mierz efekty w Search Console i w dzienniku testowych zapytań.</p>
              <p>Google AI Mode wymaga szerszego pokrycia tematu, bo użytkownicy dopytują. Perplexity AI wymaga osobnego sprawdzenia dostępu dla PerplexityBota i reguł firewalla. GEO, AEO i klasyczne SEO nie są osobnymi światami - to jedna praca nad stroną, którą zarówno ludzie, jak i modele mogą łatwo zrozumieć i której mogą zaufać.</p>
              <p>
                Nie wiesz, od czego zacząć w Twojej branży? Zacznij od rzetelnego przeglądu. W ramach usługi <Link href="/audyt-seo">audyt SEO strony internetowej</Link> sprawdzimy indeksowanie, ustawienia snippetów, dostęp robotów i strukturę treści pod cytowania. Jeśli chcesz długofalowo budować widoczność w klasycznych wynikach i w odpowiedziach AI, zobacz nasze <Link href="/pozycjonowanie-stron-internetowych">pozycjonowanie stron internetowych</Link>. <a href="#kontakt">Skontaktuj się z nami</a> - odpowiadamy w 24 h w dni robocze.
              </p>

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
