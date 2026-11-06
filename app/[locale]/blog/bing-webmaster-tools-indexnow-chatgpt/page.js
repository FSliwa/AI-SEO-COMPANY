// B1 (PLAN-v2 6.12, zał. G.4; partia 3, W9) - artykuł za bramką publikacji (lib/publikacja.js).
// 5.11.2026: strona samodzielna, BEZ wpisu w lib/blogPosts.js do dnia publikacji (inaczej
// trafiłaby na listę /blog i do „Powiązanych artykułów” przed partią 3). /en/... = 404 wprost
// (wymagajStronyPl), brak wpisu w i18n/routing.js - next-intl przepuszcza ścieżkę bez zmian.
//
// Celowo POMINIĘTE do pomiaru W1–W8 (warunek publikacji w rejestrze): H2 „Nasze wyniki”,
// FAQ 3 „Ile trwa indeksacja w Bing po zgłoszeniu przez IndexNow?” i zrzuty z naszego BWT.
// Zdania o naszym BWT (Krótka odpowiedź, FAQ 1) są prawdziwe dopiero po T0.4b (import z GSC)
// - to też warunek publikacji. Fakty o Bing i IndexNow: źródła z odczytem 5.11.2026 (lista
// ZRODLA niżej); przed publikacją sprawdzić je ponownie (G.4: „w dniu publikacji”).
//
// PUBLIKACJA (Integracja/wydanie partii 3): opublikowana: true w lib/publikacja.js, wpis
// w lib/blogPosts.js (plOnly: true, related, cta: 'ai', date = dzień wdrożenia, obraz karty),
// LASTMOD tego URL-a = dzień wdrożenia. datePublished bierze date z wpisu, dateModified LASTMOD.
import { metadataStronyPl, wymagajStronyPl } from '@/lib/stronaPl';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { blogPosts } from '@/lib/blogPosts';
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
const SCIEZKA = '/blog/bing-webmaster-tools-indexnow-chatgpt';
const URL_STRONY = `${BASE}${SCIEZKA}`;

// Title (57 zn.) i meta (133 zn.) z PLAN-v2 6.12 - te same co w rejestrze lib/publikacja.js.
const TYTUL = 'Bing Webmaster Tools i IndexNow: konfiguracja pod ChatGPT';
const OPIS = 'Jak dodać stronę do Bing Webmaster Tools, wdrożyć IndexNow i sprawdzić indeksację. Dlaczego Bing ma znaczenie dla odpowiedzi ChatGPT.';
const H1 = 'Bing Webmaster Tools i IndexNow: jak skonfigurować i sprawdzić indeksację';

// Daty uzupełnia publikacja (wpis w blogPosts i LASTMOD); przed nią strona i tak zwraca 404.
const DATA_PUBLIKACJI = blogPosts.find((p) => p.slug === SCIEZKA)?.date ?? LASTMOD[URL_STRONY];
const DATA_ZMIANY = LASTMOD[URL_STRONY] ?? DATA_PUBLIKACJI;

// FAQ: jedno źródło dla widocznego tekstu i FAQPage (pytania 1 i 2 z zał. G.4).
// Ostatnie zdanie pytania 1 tylko po T0.4b zrobionym importem z GSC (Filip potwierdza).
const FAQ = [
  {
    pytanie: 'Czy Bing Webmaster Tools jest darmowe?',
    odpowiedz: 'Tak. Bing Webmaster Tools to bezpłatne narzędzie Microsoftu. Do logowania wystarczy konto Microsoft, Google albo Facebook, a witrynę można dodać importem z Google Search Console, bez osobnej weryfikacji przez plik albo tag. My dodaliśmy naszą stronę właśnie w ten sposób.',
  },
  {
    pytanie: 'Czy IndexNow działa w Google?',
    odpowiedz: 'Nie. Na liście wyszukiwarek uczestniczących w IndexNow (indexnow.org, stan 5.11.2026) są Bing, Yandex, Seznam, Naver, Yep, Internet Archive i Amazonbot, a Google nie ma. Nowe adresy zgłaszamy więc Google mapą witryny i prośbą o indeksację w Search Console, a IndexNow wysyłamy dla pozostałych.',
  },
];

const ZRODLA = [
  { url: 'https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/', nazwa: 'Microsoft Bing Blog: Start Using Bing Webmaster Tools to Improve Your Site Visibility (17.06.2025)', data: '2026-11-05' },
  { url: 'https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/', nazwa: 'Microsoft Bing Blog: Easily Verify Your Site in Bing Webmaster Tools by Importing from Google Search Console (13.09.2019, aktualizacja 06.2025)', data: '2026-11-05' },
  { url: 'https://www.bing.com/indexnow/getstarted', nazwa: 'Bing Webmaster Tools: How to add IndexNow to your website', data: '2026-11-05' },
  { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Documentation', data: '2026-11-05' },
  { url: 'https://www.indexnow.org/searchengines.json', nazwa: 'IndexNow.org: lista wyszukiwarek uczestniczących w protokole (searchengines.json)', data: '2026-11-05' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers', data: '2026-11-05' },
];

const ODPOWIEDZI_INDEXNOW = [
  ['200 OK', 'adresy przyjęte'],
  ['202 Accepted', 'adresy przyjęte, sprawdzanie klucza jeszcze trwa'],
  ['400 Bad Request', 'błędny format żądania'],
  ['403 Forbidden', 'klucz nieważny: brak pliku albo w pliku jest inny klucz'],
  ['422 Unprocessable Entity', 'adresy spoza zgłaszanego hosta albo klucz niezgodny z protokołem'],
  ['429 Too Many Requests', 'za dużo żądań (wyszukiwarka podejrzewa spam)'],
];

const TOC = [
  { id: 'dodanie-strony', title: 'Jak dodać stronę do Bing Webmaster Tools' },
  { id: 'indexnow', title: 'Jak wdrożyć IndexNow' },
  { id: 'sprawdzanie-indeksacji', title: 'Jak sprawdzić indeksację w Bing' },
  { id: 'bing-a-chatgpt', title: 'Czy Bing ma znaczenie dla ChatGPT?' },
  { id: 'pytania', title: 'Pytania o Bing Webmaster Tools i IndexNow' },
  { id: 'zrodla', title: 'Źródła' },
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return metadataStronyPl({ locale, sciezka: SCIEZKA, title: TYTUL, description: OPIS, ogType: 'article' });
}

export default async function ArtykulBingIndexNow({ params }) {
  const { locale } = await params;
  wymagajStronyPl(locale, SCIEZKA);

  // Reguła 6.0: link tylko do strony, która zwraca 200. A2 (partia 2) i N1 (partia 3).
  const hrefA2 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const hrefN1 = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');

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
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      {/* BlogPosting + BreadcrumbList (Strona główna › Blog › artykuł) jak w pozostałych wpisach. */}
      <ArticleSchema
        locale="pl"
        url={SCIEZKA}
        title={TYTUL}
        description={OPIS}
        datePublished={DATA_PUBLIKACJI}
        dateModified={DATA_ZMIANY}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Techniczne SEO
              </span>
            </div>

            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              {H1}
            </h1>

            <Byline sciezka={SCIEZKA} data={DATA_ZMIANY} />

            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <AnswerBox>
                Bing Webmaster Tools to bezpłatna konsola Microsoftu do sprawdzania, jak Bing indeksuje Twoją stronę, a IndexNow to protokół, którym strona sama zgłasza nowe i zmienione adresy. Na stronie AI SEO COMPANY wdrożyliśmy oba w listopadzie 2026: plik klucza w katalogu głównym i skrypt, który po każdym wydaniu wysyła listę zmienionych URL-i. Poniżej kroki konfiguracji.
              </AnswerBox>

              <p className="lead">
                Poradnik ma trzy części: dodanie witryny do Bing Webmaster Tools importem z Google Search Console, wdrożenie IndexNow na przykładzie naszego kodu i sprawdzenie indeksacji w Bing. Osobno zebraliśmy, co o roli Binga w odpowiedziach ChatGPT piszą sami Microsoft i OpenAI.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="dodanie-strony">Jak dodać stronę do Bing Webmaster Tools</h2>
              <p>Najszybsza droga to import z Google Search Console. Microsoft opisuje go na blogu Bing Webmaster (wpis z 13 września 2019 r., zaktualizowany w czerwcu 2025 r.): witryny zweryfikowane w Search Console trafiają do Bing Webmaster Tools od razu jako zweryfikowane, bez pliku XML, metatagu czy rekordu DNS.</p>

              <h3>Import z Google Search Console</h3>
              <ol>
                <li>Wejdź na bing.com/webmasters i zaloguj się kontem Microsoft, Google albo Facebook. Konto Microsoft można też założyć w trakcie rejestracji.</li>
                <li>Na stronie „My Sites” wybierz „Import”.</li>
                <li>Zaloguj się na konto Google z dostępem do Search Console i kliknij „Allow”.</li>
                <li>Zaznacz witryny, które chcesz dodać, i potwierdź przyciskiem „Import”.</li>
              </ol>
              <p>Jednorazowo można zaimportować do 100 witryn, a dane o ruchu pojawiają się w ciągu do 48 godzin. Bing co jakiś czas sprawdza własność witryny przez połączenie z Search Console. Jeśli odbierzesz mu ten dostęp, trzeba połączyć konta ponownie albo zweryfikować stronę inną metodą.</p>

              <h3>Weryfikacja bez Google Search Console</h3>
              <p>Gdy strony nie ma w Search Console, Bing Webmaster Tools przyjmuje cztery inne metody (wpis Microsoftu z 17 czerwca 2025 r.): Domain Connect, jeśli obsługuje go Twój rejestrator domeny, plik XML w katalogu głównym, metatag w sekcji head strony głównej albo rekord TXT w DNS.</p>

              <h3>Mapa witryny</h3>
              <p>Po dodaniu strony zgłoś mapę witryny w sekcji „Sitemaps” albo wskaż ją w pliku robots.txt. Według Microsoftu Bing przetwarza mapy witryny co najmniej raz na 24 godziny. Nasz robots.txt wskazuje adres <code>/sitemap.xml</code>, który jest indeksem kilku map witryny podzielonych na sekcje serwisu.</p>

              <h2 id="indexnow">Jak wdrożyć IndexNow</h2>
              <p>IndexNow to otwarty protokół: strona sama informuje wyszukiwarki, że adres powstał, zmienił się albo został usunięty, zamiast czekać na kolejną wizytę robota. Według dokumentacji indexnow.org zgłoszenie wysłane do jednej wyszukiwarki trafia automatycznie do pozostałych uczestników protokołu, więc wystarczy jedno żądanie.</p>

              <h3>Krok 1: klucz i plik klucza</h3>
              <p>Klucz to ciąg od 8 do 128 znaków: małe i wielkie litery, cyfry i myślniki. Zapisujesz go w pliku tekstowym <code>{'{klucz}'}.txt</code> w kodowaniu UTF-8 i umieszczasz w katalogu głównym domeny. Wyszukiwarka pobiera ten plik po zgłoszeniu i w ten sposób sprawdza, że adresy wysyła właściciel strony. U nas klucz ma 32 znaki szesnastkowe, a plik leży w katalogu <code>public/</code> projektu Next.js, więc serwer zwraca go wprost spod adresu w katalogu głównym.</p>

              <h3>Krok 2: zgłaszanie adresów</h3>
              <p>Adresy wysyłasz żądaniem POST z listą URL-i w formacie JSON. Jedno żądanie może zawierać do 10 000 adresów. My robimy to skryptem <code>scripts/indexnow.mjs</code>, który uruchamiamy po każdym wydaniu na produkcję:</p>
              <ul>
                <li>przyjmuje listę adresów albo flagę <code>--lastmod</code> z datą i wtedy sam wybiera z mapy witryny adresy z taką datą ostatniej zmiany,</li>
                <li>przed wysłaniem sprawdza, czy plik klucza na produkcji zawiera ten sam klucz, a jeśli nie, przerywa,</li>
                <li>bez flagi <code>--wyslij</code> tylko wypisuje listę adresów, czyli robi próbę na sucho,</li>
                <li>wysyła jedno żądanie do <code>api.indexnow.org</code> i wypisuje kod odpowiedzi.</li>
              </ul>
              <pre><code>{`POST https://api.indexnow.org/indexnow
Content-Type: application/json; charset=utf-8

{
  "host": "www.ai-seo-company.pl",
  "key": "<klucz>",
  "keyLocation": "https://www.ai-seo-company.pl/<klucz>.txt",
  "urlList": [
    "https://www.ai-seo-company.pl/blog/nowy-artykul"
  ]
}`}</code></pre>

              <h3>Krok 3: odpowiedź serwera</h3>
              <div className="table-container">
                <table>
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: '0.85rem', color: '#6E6E73', paddingTop: '0.5rem' }}>
                    Źródło: dokumentacja indexnow.org (odczyt: 5.11.2026).
                  </caption>
                  <thead>
                    <tr>
                      <th scope="col">Kod HTTP</th>
                      <th scope="col">Znaczenie</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ODPOWIEDZI_INDEXNOW.map(([kod, znaczenie]) => (
                      <tr key={kod}>
                        <th scope="row"><code>{kod}</code></th>
                        <td>{znaczenie}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p>Kod 200 oznacza tylko, że wyszukiwarka otrzymała adresy, a nie, że je zaindeksuje.</p>

              <h3>Wtyczki zamiast własnego kodu</h3>
              <p>Na WordPressie IndexNow włączają wtyczka IndexNow oraz Yoast, Rank Math, AIOSEO i SEOPress, w Shopify aplikacja InstaIndex, a w Cloudflare funkcja Crawler Hints (lista na stronie IndexNow w Bing Webmaster Tools). Bing zaleca zgłaszać tylko adresy dodane, zmienione albo usunięte od chwili wdrożenia IndexNow, bez starszych.</p>

              <h2 id="sprawdzanie-indeksacji">Jak sprawdzić indeksację w Bing</h2>
              <p>W Bing Webmaster Tools służą do tego trzy raporty (opis według wpisu Microsoftu z 17 czerwca 2025 r.):</p>
              <ul>
                <li>Inspekcja adresu URL (URL Inspection): status indeksowania, dostępność dla robota, kody HTTP i blokowane zasoby dla pojedynczego adresu.</li>
                <li>Eksplorator witryny (Site Explorer): struktura strony tak, jak widzi ją Bing, z zaindeksowanymi adresami, blokadami i błędami.</li>
                <li>Wyniki wyszukiwania (Search Performance): wyświetlenia, kliknięcia i średnia pozycja dla stron i fraz, z danymi do 16 miesięcy wstecz.</li>
              </ul>
              <p>To, czy adresy zgłoszone przez IndexNow dotarły do wyszukiwarki, według Binga sprawdzisz właśnie w Bing Webmaster Tools. Zgłoszenie nie gwarantuje jednak indeksacji: wyszukiwarki zwykle pobierają zgłoszone adresy w pierwszej kolejności, ale o indeksacji decydują same, a każde pobranie wlicza się do limitu crawl Twojej domeny.</p>

              <h2 id="bing-a-chatgpt">Czy Bing ma znaczenie dla ChatGPT?</h2>
              <p>Microsoft twierdzi, że tak. We wpisie na blogu Bing Webmaster z 17 czerwca 2025 r. pisze, że Bing zasila między innymi narzędzia AI, w tym ChatGPT. OpenAI w dokumentacji swoich robotów (odczyt 5.11.2026) nie wymienia dostawców wyników wyszukiwania. Opisuje za to własnego robota OAI-SearchBot: jego dopuszczenie w robots.txt pozwala stronie pojawiać się w wynikach wyszukiwania ChatGPT, a zmiana w robots.txt dociera do systemów OpenAI w około 24 godziny.</p>
              <p>
                Wniosek praktyczny: indeksacja w Bing i dostęp dla OAI-SearchBot to dwa osobne warunki i warto spełnić oba. Nasz robots.txt blokuje robotom tylko katalog <code>/api/</code>.
                {hrefA2 && <> Skąd ChatGPT bierze firmy, które poleca, i jak to wykorzystać, opisujemy w poradniku <Link href={hrefA2}>jak pozycjonować się w ChatGPT</Link>.</>}
                {' '}Całą usługę, łącznie z pomiarem widoczności w odpowiedziach modeli, opisujemy na stronie <Link href="/pozycjonowanie-w-ai">pozycjonowanie w AI</Link>.
                {hrefN1 && <> Jeśli przy okazji porządkujesz pliki dla robotów, plik llms.txt przygotujesz w naszym narzędziu <Link href={hrefN1}>generator llms.txt</Link>.</>}
              </p>

              {/* FAQ 3 (czas indeksacji w Bing) dopiero po pomiarze W1–W8 - bez niego nie publikujemy (G.4). */}
              <h2 id="pytania">Pytania o Bing Webmaster Tools i IndexNow</h2>
              {FAQ.map((f) => (
                <div key={f.pytanie}>
                  <h3>{f.pytanie}</h3>
                  <p>{f.odpowiedz}</p>
                </div>
              ))}

              <Zrodla zrodla={ZRODLA} />

              <BlogCTA locale="pl" currentSlug={SCIEZKA} klaster="ai" />
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
