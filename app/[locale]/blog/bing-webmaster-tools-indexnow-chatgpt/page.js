// B1 (PLAN-v2 6.12, zał. G.4; partia 3, W9). Opublikowany 18.11.2026 po potwierdzeniu, że
// ai-seo-company.pl jest w Bing Webmaster Tools (panel: 3 kliknięcia i 35 wyświetleń na 18.11.2026).
// Artykuł tylko-PL (plOnly w lib/blogPosts.js, 308 /en/blog/<slug> -> /blog/<slug> w next.config.mjs).
// Fraza: „bing webmaster tools” (PL ok. 2400/mies.).
// Zasada treści: o naszych wynikach piszemy tylko to, co zmierzyliśmy. Nie mamy pomiaru czasu
// indeksacji w Bing ani wpływu IndexNow na odpowiedzi ChatGPT, więc tekst ich nie podaje
// (FAQ „Ile trwa indeksacja” odsyła do dokumentacji i mówi wprost, że nie mierzyliśmy).
// Fakty zewnętrzne: źródła pierwotne z odczytem 18.11.2026 (lista ZRODLA niżej). Strony pomocy
// OpenAI o ChatGPT search zwracały 18.11.2026 HTTP 403, więc o OpenAI cytujemy tylko stronę o robotach.
import { articleLanguages, articleRobots, blogPosts } from '@/lib/blogPosts';
import { metadataDe } from '@/lib/stronyDe';
import BlogArtikelDe from '@/components/de/BlogArtikelDe';
import { BLOG_BING_INDEXNOW_DE } from '@/lib/de/blogBingIndexnowDe';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { LASTMOD } from '@/lib/lastmod';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
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
const SCIEZKA = '/blog/bing-webmaster-tools-indexnow-chatgpt';
const URL_STRONY = `${BASE}${SCIEZKA}`;

// Title (59 zn.) i meta (141 zn.): te same wartości co titlePl/descPl w lib/blogPosts.js i tytul/opis w lib/publikacja.js.
const TYTUL = 'Bing Webmaster Tools i IndexNow: konfiguracja krok po kroku';
const OPIS = 'Jak dodać stronę do Bing Webmaster Tools, wdrożyć IndexNow i sprawdzić indeksację w Bing. Co o roli Binga w ChatGPT piszą Microsoft i OpenAI.';
const H1 = 'Bing Webmaster Tools i IndexNow: jak skonfigurować i sprawdzić indeksację';

const DATA_PUBLIKACJI = blogPosts.find((p) => p.slug === SCIEZKA)?.date ?? '2026-11-18';
const DATA_ZMIANY = LASTMOD[URL_STRONY] ?? DATA_PUBLIKACJI;

// FAQ: jedno źródło dla widocznego tekstu i FAQPage.
const FAQ = [
  {
    pytanie: 'Czy Bing Webmaster Tools jest darmowe?',
    odpowiedz: 'Tak. Microsoft opisuje Bing Webmaster Tools jako bezpłatne narzędzie (wpis z 17 czerwca 2025 r.). Witrynę można dodać importem z Google Search Console albo zweryfikować plikiem XML, metatagiem, rekordem TXT w DNS lub przez Domain Connect.',
  },
  {
    pytanie: 'Czy IndexNow działa w Google?',
    odpowiedz: 'Nie. Na liście wyszukiwarek uczestniczących w IndexNow (indexnow.org, odczyt 18.11.2026) są Bing, Yandex, Seznam, Naver, Yep, Internet Archive i Amazonbot, a Google nie ma. Dla Google służy mapa witryny i sprawdzanie adresów w Search Console, a IndexNow działa obok nich.',
  },
  {
    pytanie: 'Czy Bing Webmaster Tools i IndexNow poprawią widoczność w ChatGPT?',
    odpowiedz: 'Tego nie obiecujemy i nie mierzyliśmy. Microsoft pisze, że Bing zasila między innymi ChatGPT, ale OpenAI na stronie o swoich robotach nie wymienia dostawców wyników wyszukiwania. Pewne jest tylko tyle, że strona niezaindeksowana w Bing nie ma szans trafić do wyników, które z jego indeksu korzystają, a dostęp dla OAI-SearchBot to osobny warunek.',
  },
  {
    pytanie: 'Ile trwa indeksacja w Bing po zgłoszeniu przez IndexNow?',
    odpowiedz: 'Nie podajemy czasu, bo go u siebie nie zmierzyliśmy, a dokumentacja nie podaje terminu. Bing pisze, że IndexNow nie gwarantuje crawlowania ani indeksowania, a zmiany mogą pojawić się w wynikach dopiero po jakimś czasie. Stan konkretnego adresu sprawdzisz w narzędziu Inspekcja adresu URL.',
  },
];

const D = '2026-11-18';
const ZRODLA = [
  { url: 'https://blogs.bing.com/webmaster/2025/6/Start-Using-Bing-Webmaster-Tools-to-Improve-Your-Site-Visibility/', nazwa: 'Microsoft Bing Blog: Start Using Bing Webmaster Tools to Improve Your Site Visibility (17.06.2025)', data: D },
  { url: 'https://blogs.bing.com/webmaster/2019/9/Import-sites-from-Search-Console-to-Bing-Webmaster-Tools/', nazwa: 'Microsoft Bing Blog: Easily Verify Your Site in Bing Webmaster Tools by Importing from Google Search Console (13.09.2019, aktualizacja 06.2025)', data: D },
  { url: 'https://www.bing.com/indexnow/getstarted', nazwa: 'Bing Webmaster Tools: How to add IndexNow to your website', data: D },
  { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Documentation', data: D },
  { url: 'https://www.indexnow.org/searchengines.json', nazwa: 'IndexNow.org: lista wyszukiwarek uczestniczących w protokole (searchengines.json)', data: D },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers', data: D },
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
  { id: 'nasze-wdrozenie', title: 'Co zrobiliśmy u siebie i czego nie mierzyliśmy' },
  { id: 'pytania', title: 'Pytania o Bing Webmaster Tools i IndexNow' },
  { id: 'zrodla', title: 'Źródła' },
];

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe(SCIEZKA, { languages: { pl: URL_STRONY } });
  }
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

export default async function ArtykulBingIndexNow({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <BlogArtikelDe klucz={SCIEZKA} dane={BLOG_BING_INDEXNOW_DE} />;
  if (locale === 'en') return null;

  // Reguła 6.0: link tylko do strony, która zwraca 200 - inaczej zwykły tekst.
  const hrefA2 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const hrefN1 = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  const hrefAudyt = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  const hrefAiMode = blogPosts.some((p) => p.slug === '/blog/google-ai-mode-jak-sie-pojawic')
    ? '/blog/google-ai-mode-jak-sie-pojawic'
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
      <Breadcrumbs parent={{ href: '/blog', pl: 'Blog', en: 'Blog', de: 'Blog' }} pl="Bing Webmaster Tools i IndexNow: konfiguracja krok po kroku" en="Bing Webmaster Tools i IndexNow: konfiguracja krok po kroku" />
      <ArticleSchema breadcrumb={null} slug={SCIEZKA} locale={locale} dateModified={DATA_ZMIANY} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <article style={{ paddingTop: 'clamp(20px, 3vw, 36px)', paddingBottom: 'clamp(64px, 8vw, 110px)' }}>
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
                Bing Webmaster Tools to bezpłatna konsola Microsoftu, w której sprawdzasz, jak Bing indeksuje Twoją stronę. IndexNow to protokół, którym strona sama zgłasza nowe i zmienione adresy. Dodaj witrynę importem z Google Search Console albo inną metodą weryfikacji, wgraj plik klucza i wysyłaj zmienione adresy. Zgłoszenie nie gwarantuje indeksacji.
              </AnswerBox>

              <p className="lead">
                Poradnik ma trzy części: dodanie witryny do Bing Webmaster Tools, wdrożenie IndexNow na przykładzie naszego kodu i sprawdzenie indeksacji w Bing. Opisujemy to na własnym wdrożeniu: ai-seo-company.pl jest w Bing Webmaster Tools, a adresy zgłaszamy przez IndexNow od 4.11.2026. Wyników tych działań nie mierzyliśmy, więc ich nie obiecujemy, a w osobnym fragmencie podajemy, co o roli Binga w ChatGPT mówią Microsoft i OpenAI.
              </p>

              <ArticleTOC items={TOC} />

              <h2 id="dodanie-strony">Jak dodać stronę do Bing Webmaster Tools</h2>
              <p>Najszybsza droga to import z Google Search Console. Microsoft opisuje go na blogu Bing Webmaster (wpis z 13 września 2019 r., zaktualizowany w czerwcu 2025 r.): witryny zweryfikowane w Search Console trafiają do Bing Webmaster Tools jako zweryfikowane, bez pliku XML, metatagu czy rekordu DNS.</p>

              <h3>Import z Google Search Console</h3>
              <ol>
                <li>Zaloguj się do Bing Webmaster Tools na istniejące konto albo załóż nowe.</li>
                <li>Na stronie „My Sites” wybierz „Import”.</li>
                <li>Zaloguj się kontem Google z dostępem do Search Console i zezwól Bingowi na dostęp do zweryfikowanych witryn i map witryny.</li>
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
              <p>Klucz ma od 8 do 128 znaków. Dokumentacja wymienia małe i wielkie litery, cyfry i myślniki, choć w jednym miejscu pisze o znakach szesnastkowych. Zapisujesz go w pliku tekstowym <code>{'{klucz}'}.txt</code> w kodowaniu UTF-8 i najlepiej umieszczasz w katalogu głównym domeny. Wyszukiwarka porównuje klucz z żądania z kluczem w tym pliku i w ten sposób potwierdza, że adresy wysyła właściciel strony. U nas klucz ma 32 znaki szesnastkowe, a plik leży w katalogu <code>public/</code> projektu Next.js, więc serwer zwraca go wprost spod adresu w katalogu głównym.</p>

              <h3>Krok 2: zgłaszanie adresów</h3>
              <p>Adresy wysyłasz żądaniem POST z listą URL-i w formacie JSON. Jedno żądanie może zawierać do 10 000 adresów. U nas robią to dwa mechanizmy. Pierwszy to skrypt <code>scripts/indexnow.mjs</code> do zgłoszeń ręcznych:</p>
              <ul>
                <li>przyjmuje listę adresów albo flagę <code>--lastmod</code> z datą (wtedy sam wybiera z mapy witryny adresy z taką datą ostatniej zmiany) albo flagę <code>--wydanie</code> (adresy z ostatniego wydania),</li>
                <li>przed wysłaniem sprawdza, czy plik klucza na produkcji zawiera ten sam klucz, a jeśli nie, przerywa,</li>
                <li>bez flagi <code>--wyslij</code> tylko wypisuje listę adresów, czyli robi próbę na sucho,</li>
                <li>wysyła jedno żądanie do <code>api.indexnow.org</code> i wypisuje kod odpowiedzi.</li>
              </ul>
              <p>Drugi mechanizm to zadanie cron na Vercelu, skonfigurowane w <code>vercel.json</code> (trasa <code>/api/cron/indexnow</code>, codziennie o 6:15 UTC). Po wdrożeniu zgłasza ono adresy z ostatniego wydania, ale tylko w ciągu 26 godzin od zbudowania wdrożenia i najwyżej 100 adresów naraz.</p>
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
                  <caption style={{ captionSide: 'bottom', textAlign: 'left', fontSize: '0.85rem', color: 'var(--w-tusz-2)', paddingTop: '0.5rem' }}>
                    Źródło: dokumentacja indexnow.org (odczyt: 18.11.2026).
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
              {hrefAudyt && <p>Zanim zaczniesz zgłaszać adresy, upewnij się, że same strony są poprawne technicznie: noindex, kanoniczne adresy i dostęp robotów sprawdzisz w naszym <Link href={hrefAudyt}>darmowym audycie SEO strony</Link>.</p>}

              <h2 id="bing-a-chatgpt">Czy Bing ma znaczenie dla ChatGPT?</h2>
              <p>Microsoft twierdzi, że tak. We wpisie na blogu Bing Webmaster z 17 czerwca 2025 r. pisze, że Bing zasila między innymi narzędzia AI, w tym ChatGPT. OpenAI w dokumentacji swoich robotów (odczyt 18.11.2026) nie wymienia dostawców wyników wyszukiwania. Opisuje za to własnego robota OAI-SearchBot: strony, które go wyłączyły w robots.txt, nie są pokazywane w odpowiedziach wyszukiwania ChatGPT, a zmiana w robots.txt zaczyna działać po około 24 godzinach. Strony pomocy OpenAI o wyszukiwaniu w ChatGPT nie otworzyły się nam 18.11.2026 (błąd 403), więc zależności od indeksu Binga nie potwierdzamy drugim źródłem.</p>
              <p>
                Wniosek praktyczny: indeksacja w Bing i dostęp dla OAI-SearchBot to dwa osobne warunki i warto spełnić oba. Nasz robots.txt blokuje robotom tylko katalog <code>/api/</code>.
                {hrefA2 && <> Skąd ChatGPT bierze firmy, które poleca, i jak to wykorzystać, opisujemy w poradniku <Link href={hrefA2}>jak pozycjonować się w ChatGPT</Link>.</>}
                {hrefAiMode && <> Jak wygląda ta sama kwestia po stronie Google, opisujemy w artykule o <Link href={hrefAiMode}>Google AI Mode</Link>.</>}
                {' '}Całą usługę, łącznie z pomiarem widoczności w odpowiedziach modeli, opisujemy na stronie <Link href="/pozycjonowanie-w-ai">pozycjonowanie w AI</Link>.
                {hrefN1 && <> Jeśli przy okazji porządkujesz pliki dla robotów, plik llms.txt przygotujesz w naszym narzędziu <Link href={hrefN1}>generator llms.txt</Link>.</>}
              </p>

              <h2 id="nasze-wdrozenie">Co zrobiliśmy u siebie i czego nie mierzyliśmy</h2>
              <p>Domena ai-seo-company.pl jest dodana do Bing Webmaster Tools i zweryfikowana (potwierdzone w panelu 18.11.2026). Plik klucza IndexNow leży w katalogu głównym. Adresy zgłaszaliśmy 4.11, 6.11 i 12.11.2026 oraz trzy razy 18.11.2026, a serwer odpowiadał kodem 200 albo 202.</p>
              <p>Panel Bing Webmaster Tools pokazywał 18.11.2026 dla naszej domeny 3 kliknięcia i 35 wyświetleń. To zbyt mało na jakiekolwiek wnioski. Panel podpowiada też, że w mapach witryny brakuje ważnych nowych stron, co traktujemy jako wskazówkę do sprawdzenia, a nie wynik. Nie mierzyliśmy czasu od zgłoszenia do zaindeksowania adresu w Bing ani wpływu IndexNow na odpowiedzi ChatGPT, dlatego tych liczb tu nie ma.</p>

              <h2 id="pytania">Pytania o Bing Webmaster Tools i IndexNow</h2>
              {FAQ.map((f) => (
                <div key={f.pytanie}>
                  <h3>{f.pytanie}</h3>
                  <p>{f.odpowiedz}</p>
                </div>
              ))}

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
