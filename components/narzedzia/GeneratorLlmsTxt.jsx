// N1 /narzedzia/generator-llms-txt (PLAN-v2 6.10; brief N1; CB-09 korekta, CB-18; 5.11.2026).
// Komponent serwerowy: treść, schema i okruszki; interaktywna część to LlmsTxtClient.
// - H1 (59) i Krótka odpowiedź (54 słowa) z 6.10, bez obietnicy „plik dla ChatGPT” (CB-09),
// - konspekt 1 000–1 200 słów BEZ H2 „Kto pobrał nasz llms.txt” (dopiero po ≥ 30 dniach danych
//   z trwałego licznika T0.5, CB-09; logi Vercel tego nie zapewnią),
// - liczby z datą i źródłem: Ahrefs (28% ze 137 000 domen) i specyfikacja llmstxt.org - odczyt
//   5.11.2026; własny test botów 5.11.2026 (skille/ai-visibility/botcheck-2026-11-05.txt);
//   wersje wtyczek WordPress z katalogu WordPress.org 5.11.2026 (sprawdzić ponownie przed publikacją),
// - schema: WebAppSchema (DeveloperApplication) + FAQPage (AppleFaq) + BreadcrumbList 3 poziomy
//   (Breadcrumbs z parent); bez ArticleSchema,
// - linki: hub GEO, A2 (warunkowo), sprawdzarka (po T0.2), /narzedzia, /llms.txt.
// 9.11.2026: prop locale ('pl' domyślnie | 'en'); wersja EN pod /en/tools/llms-txt-generator.
// 12.11.2026 S1-poprawki (sekcja 5 zmiany.md): lead → narzędzie → Krótka odpowiedź i byline (Z-01, Z-L1),
// teksty zgodne z generatorem z 11.11 (Z-L0, z korektą weryfikacji: kontakt zostaje w „Strony”), Co dostajesz
// (Z-04), H2 o poprawianiu pliku w edytorze (Z-L4), Poradniki (Z-03), Inne narzędzia i okruszek przez hub
// (Z-02), FAQ 5 → 9 (Z-L3 + pytanie o edytor; dodatki tu, bo lib/narzedzia*.js to wspólne rejestry), featureList (Z-05).

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { LASTMOD } from '@/lib/lastmod';
import { sectionId } from '@/lib/anchors';
import { STRONY_NARZEDZI_EN, FAQ_GENERATORA_EN } from '@/lib/narzedziaGeneratorRaport.en';
import { BASE, FAQ_GENERATORA, SCIEZKA_HUBA, hrefAudytuAi, hrefSprawdzarki, stronaNarzedzia } from '@/lib/narzedzia';
import { GENERATOR, cena } from '@/lib/narzedziaLiczby';
import LlmsTxtClient from './LlmsTxtClient';
import PozostaleNarzedzia, { RODZIC_HUBA } from './PozostaleNarzedzia';
import Poradniki from './Poradniki';
import CoDostajesz from './CoDostajesz';
import ZrzutWyniku from './ZrzutWyniku';
import Sekcja from './Sekcja';
import st from './narzedzia.module.css';
import * as s from './styl';

const SCIEZKA = '/narzedzia/generator-llms-txt';
const SCIEZKA_EN = '/en/tools/llms-txt-generator';

// Fragment https://www.ai-seo-company.pl/llms.txt (stan na 5.11.2026, public/llms.txt).
const PRZYKLAD = `# AI SEO COMPANY

> Agencja SEO i web design z Warszawy. Pozycjonowanie stron, pozycjonowanie
> w AI (GEO), audyty SEO, SEO lokalne i projektowanie stron dla małych
> i średnich firm. Każdy klient dostaje panel klienta 24/7 z publicznym demo.

## Zmiana agencji

- [Zmiana agencji SEO bez kar i utraty pozycji](https://www.ai-seo-company.pl/zmiana-agencji-seo): poradnik, checklista 32 punktów (konta Google, domena, treści, linki, dane) i bezpłatny przegląd po poprzedniej agencji (30 min).`;

const TESTY = [
  { co: 'Mapa strony', poCo: `Źródło listy podstron: wpis Sitemap w robots.txt albo /sitemap.xml, także indeks map (do ${GENERATOR.mapPodrzednych} map podrzędnych). Przy ponad ${GENERATOR.adresow} adresach bierzemy po kilka z każdej mapy i sekcji, a nie pierwsze ${GENERATOR.adresow}. Kilka adresów z błędem zastępujemy innymi z tej samej sekcji.`, jak: 'Bez mapy plik zawiera tylko stronę główną. Dodaj sitemap.xml i zgłoś ją w Search Console.' },
  { co: 'Kod odpowiedzi i przekierowania', poCo: 'Do pliku trafiają tylko adresy, które zwracają kod 200.', jak: 'Adresy z kodem 3xx, 4xx i 5xx są na liście pominiętych razem z kodem.' },
  { co: 'noindex', poCo: 'Strona wyłączona z indeksu nie powinna trafiać do spisu.', jak: 'Pomijamy adresy z noindex w meta robots albo w nagłówku X-Robots-Tag.' },
  { co: 'Tytuł i opis', poCo: 'Z nich powstają wiersze pliku: link z tytułem i opis po dwukropku.', jak: 'Brak opisu = sam link. Uzupełnij meta description na tych podstronach.' },
  { co: 'Sekcje pliku', poCo: 'Podstrony grupujemy według pierwszego członu adresu (Blog, Usługi) i wersji językowej (Wersja EN, Blog (EN)). Regulamin i polityki trafiają do sekcji „Optional”, którą model może pominąć. Kontakt zostaje w „Strony”.', jak: 'Sekcja potrzebuje co najmniej 2 podstron w mapie, pozostałe adresy trafiają do „Strony”. Nazwy sekcji i przydział linków zmienisz w edytorze przed pobraniem.' },
  { co: 'robots.txt dla 8 botów', poCo: 'Pokazuje, czy bot może pobrać stronę główną i ile sprawdzonych adresów blokuje.', jak: 'Blokada OAI-SearchBot albo PerplexityBot wyklucza stronę z wyników ChatGPT i Perplexity.' },
  { co: 'Obecny plik /llms.txt', poCo: 'Pokazuje, czy strona ma już plik i czy zwraca go bez przekierowania.', jak: 'Kod 200 i nagłówek „# Nazwa” w pierwszym wierszu = plik jest na miejscu. Pokazujemy też liczbę linków do podstron: plik bez linków w formacie [nazwa](https://adres) oznaczamy jako błąd, bo nic modelowi nie wskaże. HTML zamiast tekstu oznacza zły adres.' },
  { co: 'Kod HTTP z User-Agentem bota', poCo: 'Wykrywa blokady zapory (WAF) i CDN, których nie widać w robots.txt.', jak: 'Kod 403 albo 429 dla bota przy 200 dla przeglądarki oznacza blokadę po stronie serwera.' },
];

const TESTY_EN = [
  { co: 'Sitemap', poCo: `Source of the page list: the Sitemap entry in robots.txt or /sitemap.xml, including sitemap indexes (up to ${GENERATOR.mapPodrzednych} child sitemaps). With more than ${GENERATOR.adresow} URLs, we take a few from every sitemap and section, not the first ${GENERATOR.adresow}. We replace a few URLs with errors with others from the same section.`, jak: 'Without a sitemap, the file contains only the home page. Add sitemap.xml and submit it in Search Console.' },
  { co: 'Response code and redirects', poCo: 'Only URLs that return code 200 go into the file.', jak: 'URLs with 3xx, 4xx and 5xx codes appear on the skipped list together with the code.' },
  { co: 'noindex', poCo: 'A page excluded from the index should not appear in the listing.', jak: 'We skip URLs with noindex in the meta robots tag or in the X-Robots-Tag header.' },
  { co: 'Title and description', poCo: 'They make up the lines of the file: a link with a title and a description after the colon.', jak: 'No description = a bare link. Add a meta description to those pages.' },
  { co: 'File sections', poCo: 'We group pages by the first part of the URL (Blog, Services) and by language version (EN version, Blog (EN)). Terms and policies go to the "Optional" section, which a model may skip. The contact page stays in "Pages".', jak: 'A section needs at least 2 pages in the sitemap; the remaining URLs go to "Pages". You can rename sections and move links between them in the editor before downloading.' },
  { co: 'robots.txt for 8 bots', poCo: 'Shows whether a bot can fetch the home page and how many of the checked URLs it blocks.', jak: 'Blocking OAI-SearchBot or PerplexityBot excludes your site from ChatGPT and Perplexity results.' },
  { co: 'Existing /llms.txt file', poCo: 'Shows whether the site already has the file and whether it is served without a redirect.', jak: 'Code 200 and a "# Name" heading on the first line = the file is in place. We also show the number of links to your pages: a file with no links in the [name](https://address) format is marked as an error, because it points a model to nothing. HTML instead of text means the wrong address.' },
  { co: 'HTTP code with the bot User-Agent', poCo: 'Detects firewall (WAF) and CDN blocks that robots.txt does not show.', jak: 'Code 403 or 429 for the bot with 200 for a browser means a block on the server side.' },
];

const PRZYKLAD_EN_NOTE = 'An excerpt of https://www.ai-seo-company.pl/llms.txt as of November 5, 2026 (the file itself is in Polish).';

// Z-L3 (FAQ 5 → 8) + pytanie o edytor (Z-L4). Odpowiedź o „Optional” po weryfikacji 11.11: kontakt NIE
// trafia do Optional (generator.js SLUG_OPCJONALNY), więc tekst z zmiany.md bez „oraz kontakt”.
const FAQ_DODATKOWE = [
  {
    id: 'dlaczego-brakuje-podstron',
    question: 'Dlaczego w pliku nie ma wszystkich moich podstron?',
    answer: `Sprawdzamy do ${GENERATOR.adresow} adresów: przy większej mapie bierzemy po kilka z każdej mapy podrzędnej i sekcji (do ${GENERATOR.mapPodrzednych} map). Pomijamy adresy z kodem innym niż 200 i z noindex, a pod wynikiem pokazujemy listę pominiętych i tych, których nie zdążyliśmy sprawdzić w ${GENERATOR.sekund} sekund. Kilka adresów z błędem zastępujemy innymi z tej samej sekcji. Brakujące ważne podstrony dopisz ręcznie w tym samym formacie.`,
  },
  {
    id: 'co-to-jest-sekcja-optional',
    question: 'Co to jest sekcja „Optional”?',
    answer: 'To sekcja opisana w specyfikacji llmstxt.org: linki, które model może pominąć, gdy ma mało miejsca. Generator wkłada tam regulamin oraz polityki prywatności i cookies, a kontakt i ważne podstrony zostawia w sekcjach wyżej. W edytorze pod wynikiem przeniesiesz do niej inne drugorzędne linki. Nazwy „Optional” nie tłumacz, bo to nazwa ze specyfikacji.',
  },
  {
    id: 'czy-potrzebny-email',
    question: 'Czy muszę podawać e-mail albo zakładać konto?',
    answer: `Nie. Cały plik i test botów widzisz od razu na stronie, bez rejestracji i bez e-maila. Nie zapisujemy adresu ani wyniku. Limit to ${GENERATOR.limitIp} sprawdzeń dziennie z jednego adresu IP.`,
  },
  {
    id: 'czy-moge-edytowac-plik',
    question: 'Czy mogę zmienić plik przed pobraniem?',
    answer: 'Tak. Pod wynikiem otwórz „Edytuj plik przed pobraniem”: odznaczysz linie, których nie chcesz w pliku, zmienisz nazwę, opis firmy, tytuły i opisy linków, kolejność i sekcje, a drugorzędne linki przeniesiesz do „Optional”. Przyciski „Kopiuj” i „Pobierz llms.txt” biorą plik już ze zmianami. Edycja działa w Twojej przeglądarce i niczego nie zapisujemy.',
  },
];

const FAQ_DODATKOWE_EN = [
  {
    id: 'why-are-some-pages-missing',
    question: 'Why are some of my pages missing from the file?',
    answer: `We check up to ${GENERATOR.adresow} URLs: with a larger sitemap we take a few from every child sitemap and section (up to ${GENERATOR.mapPodrzednych} sitemaps). We skip URLs that return a code other than 200 or have noindex, and below the result we list the skipped URLs and those we did not manage to check within ${GENERATOR.sekund} seconds. We replace a few URLs with errors with others from the same section. Add any important missing pages by hand in the same format.`,
  },
  {
    id: 'what-is-the-optional-section',
    question: 'What is the "Optional" section?',
    answer: 'It is a section defined in the llmstxt.org specification: links that a model may skip when it is short on context. The generator puts the terms and the privacy and cookie policies there, and keeps the contact page and important pages in the sections above. In the editor below the result, you can move other secondary links there. Do not translate the name "Optional", because it comes from the specification.',
  },
  {
    id: 'do-i-need-an-email',
    question: 'Do I need to give an email or create an account?',
    answer: `No. You see the whole file and the bot test right away on the page, with no sign-up and no email. We do not store the address or the result. The limit is ${GENERATOR.limitIp} checks per day from one IP address.`,
  },
  {
    id: 'can-i-edit-the-file',
    question: 'Can I edit the file before downloading it?',
    answer: 'Yes. Below the result, open "Edit the file before downloading": you can untick the lines you do not want in the file, change the name, the business description, link titles and descriptions, the order and the sections, and move secondary links to "Optional". The "Copy" and "Download llms.txt" buttons take the file with your changes. Editing happens in your browser and we store nothing.',
  },
];

// Z-04: wszystko od razu, bez e-maila (jedna kolumna). Fakty z generator.js i LlmsTxtClient.jsx.
const CO_DOSTAJESZ = [
  'Cały plik llms.txt w formacie llmstxt.org: nagłówek z nazwą, opis firmy i sekcje z linkami do podstron.',
  'Tytuł przy każdym linku i opis z meta description podstrony, jeśli go ma.',
  'Sekcje według katalogów i wersji językowych, a regulamin i polityki w sekcji „Optional”.',
  'Edytor przed pobraniem: odznaczanie linii, zmiana tytułów, opisów, kolejności i sekcji.',
  `Test robots.txt i kodu HTTP dla ${GENERATOR.botow} botów AI z wnioskiem przy każdym.`,
  'Ocenę obecnego pliku /llms.txt z liczbą linków do podstron.',
  'Listę pominiętych adresów z powodem (kod HTTP, noindex) i link do wyniku do skopiowania.',
];
const CO_DOSTAJESZ_EN = [
  'The whole llms.txt file in the llmstxt.org format: a heading with the name, a business description and sections with links to your pages.',
  'A title for every link and a description from the page’s meta description, if it has one.',
  'Sections by folder and language version, with terms and policies in the "Optional" section.',
  'An editor before downloading: untick lines, change titles, descriptions, order and sections.',
  `A robots.txt and HTTP code test for ${GENERATOR.botow} AI bots, with a conclusion for each.`,
  'A check of the existing /llms.txt file, including its number of links to your pages.',
  'A list of skipped URLs with the reason (HTTP code, noindex) and a link to the result you can copy.',
];

// Z-07: prawdziwy przebieg 12.11.2026 12:05 UTC (www.ai-seo-company.pl, kopia dev z kodem tej gałęzi), bez edycji
// treści; przycięty pod tabelą botów, ukryte tylko przyklejone elementy (nagłówek, baner cookies).
// Skrypt: prace-2026-11-11/lepsi/llms/skrypty/pw-zrzut-wyniku.mjs. WebP bezstratny, 65 KB.
const ZRZUT = { src: '/narzedzia/generator-llms-txt-wynik.webp', width: 1137, height: 1580 };

// Z-05: te same fakty co na stronie.
const FUNKCJE = ['Plik llms.txt z mapy strony, do 50 adresów z każdej sekcji', 'Sekcje według katalogów i wersji językowych, sekcja Optional', 'Edycja pliku przed pobraniem', 'Test robots.txt i kodu HTTP dla 8 botów AI', 'Ocena istniejącego pliku /llms.txt z liczbą linków'];
const FUNKCJE_EN = ['An llms.txt file from your sitemap, up to 50 URLs across all sections', 'Sections by folder and language version, an Optional section', 'Editing the file before downloading', 'robots.txt and HTTP code test for 8 AI bots', 'A check of the existing /llms.txt file, including its link count'];

export default function GeneratorLlmsTxt({ locale = 'pl' }) {
  const en = locale === 'en';
  const strona = stronaNarzedzia('generator-llms-txt');
  const a2 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/chatgpt');
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');
  const hub = hrefJesliOpublikowana(SCIEZKA_HUBA);
  const sprawdzarka = hrefSprawdzarki();
  // Link PL z kotwicą (#ile-kosztuje) w EN dostaje kotwicę EN; Link lokalizuje tylko ścieżkę.
  const audyt = en ? (hrefJesliOpublikowana('/pozycjonowanie-w-ai/audyt-widocznosci') ?? `/pozycjonowanie-w-ai#${sectionId('ileKosztuje', 'en')}`) : hrefAudytuAi();
  const metaEn = STRONY_NARZEDZI_EN['generator-llms-txt'];

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={metaEn.okruszek} parent={RODZIC_HUBA} />
      {en ? (
        <WebAppSchema
          name="llms.txt generator and AI bot access test"
          description="Free tool: generates an llms.txt file from your sitemap and checks GPTBot, OAI-SearchBot, PerplexityBot and ClaudeBot access in robots.txt."
          url={`${BASE}${SCIEZKA_EN}`}
          category="DeveloperApplication"
          language="en"
          featureList={FUNKCJE_EN}
          screenshot={{ url: ZRZUT.src, width: ZRZUT.width, height: ZRZUT.height }}
        />
      ) : (
        <WebAppSchema
          name="Generator llms.txt i test dostępu botów AI"
          description="Darmowe narzędzie: generuje plik llms.txt z mapy strony i sprawdza dostęp GPTBot, OAI-SearchBot, PerplexityBot i ClaudeBot w robots.txt."
          url={`${BASE}${SCIEZKA}`}
          category="DeveloperApplication"
          featureList={FUNKCJE}
          screenshot={{ url: ZRZUT.src, width: ZRZUT.width, height: ZRZUT.height }}
        />
      )}

      <section className={st.hero} style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {en ? 'Free tool' : 'Darmowe narzędzie'}
            </div>
            <h1 style={s.h1}>{en ? metaEn.h1 : strona.h1}</h1>
          </Reveal>
          {/* Z-L1: lead nad formularzem (Z-01: lead → narzędzie → Krótka odpowiedź → byline). */}
          <p className={st.lead} style={s.lead}>
            {en
              ? `Enter your website address and within ${GENERATOR.sekund} seconds at most you get the whole llms.txt file built from your sitemap and an access test for ${GENERATOR.botow} AI bots. No sign-up, no email.`
              : `Wpisz adres strony, a w najwyżej ${GENERATOR.sekund} sekund dostaniesz cały plik llms.txt z mapy strony i test dostępu ${GENERATOR.botow} botów AI. Bez rejestracji i bez e-maila.`}
          </p>
          <LlmsTxtClient hrefSprawdzarki={sprawdzarka} hrefAudytu={audyt} />
          <div style={s.poNarzedziu}>
          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en ? 'llms.txt is a Markdown file in the root of a website that points language models to its most important pages, each with a short description. It is a proposed standard (llmstxt.org), not a requirement: according to Ahrefs, no major model provider officially supports it. For ChatGPT, what matters more is whether AI bots can access your site in robots.txt. The generator checks both.' : 'llms.txt to plik w formacie Markdown w katalogu głównym strony, który wskazuje modelom językowym najważniejsze podstrony z krótkim opisem. To propozycja standardu (llmstxt.org), a nie wymóg: według analizy Ahrefs żaden duży dostawca modeli oficjalnie go nie obsługuje. Dla ChatGPT ważniejsze jest, czy boty AI mają dostęp do strony w robots.txt. Generator sprawdza oba elementy.'}
          </AnswerBox>
          </div>
          <Byline sciezka={SCIEZKA} takzeEn data={en ? LASTMOD[`${BASE}${SCIEZKA}`] : undefined} style={{ textAlign: 'center' }} />

          <CoDostajesz
            locale={locale}
            odRazu={en ? CO_DOSTAJESZ_EN : CO_DOSTAJESZ}
            tytulOdRazu={en ? 'Right away, no email and no sign-up' : 'Od razu, bez e-maila i rejestracji'}
            przypis={en ? 'There is nothing to unlock with an email: the whole result is on the page. We do not store the address or the result.' : 'Nie ma tu nic do odblokowania e-mailem: cały wynik jest na stronie. Nie zapisujemy adresu ani wyniku.'}
          >
            <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
              <ZrzutWyniku
                {...ZRZUT}
                sizes="(max-width: 700px) 100vw, 640px"
                alt={en ? 'llms.txt generator: the result for ai-seo-company.pl with the sitemap summary, the existing file check and the access test for 8 AI bots' : 'Generator llms.txt: wynik dla ai-seo-company.pl z mapą strony, oceną obecnego pliku i testem dostępu 8 botów AI'}
                podpis={en ? 'The generator’s result for our own website from 12 November 2026 (Polish interface): sitemap, existing file and the 8-bot test. The ready file and the editor are below the table.' : 'Wynik generatora dla naszej strony z 12 listopada 2026: mapa strony, obecny plik i test 8 botów. Pod tabelą jest gotowy plik i edytor.'}
              />
            </div>
          </CoDostajesz>

          <section aria-labelledby="co-to-jest-llms-txt" className={st.sekcja} style={s.sekcja}>
            <h2 id="co-to-jest-llms-txt" style={s.h2}>{en ? 'What is llms.txt (and llms-full.txt)' : 'Co to jest llms.txt (i llms-full.txt)'}</h2>
            {en ? (
              <>
                <p style={s.akapit}>
                  The llms.txt file lives at /llms.txt and describes a website for language models and AI agents that read pages on behalf of users. Jeremy Howard proposed the format in September 2024, and the current version of the specification (v2) is published at llmstxt.org.
                </p>
                <p style={s.akapit}>
                  The layout is fixed. At the top is a heading with the company name, the only required element. Below it comes a blockquote with a short description, followed by sections with lists of links: the page title in square brackets, the URL in parentheses and, after a colon, a sentence about what is there. A section named &quot;Optional&quot; holds secondary links that a model may skip when it is short on context. This is what the beginning of{' '}
                  <a href="/llms.txt" style={s.podkreslenie}>our llms.txt file</a> looks like:
                </p>
              </>
            ) : (
              <>
                <p style={s.akapit}>
                  Plik llms.txt leży pod adresem /llms.txt i opisuje serwis dla modeli językowych i agentów AI, które czytają strony w imieniu użytkowników. Format zaproponował Jeremy Howard we wrześniu 2024 roku, a aktualna wersja specyfikacji (v2) jest opublikowana na llmstxt.org.
                </p>
                <p style={s.akapit}>
                  Układ jest stały. Na górze nagłówek z nazwą firmy, jedyny obowiązkowy element. Pod nim cytat z krótkim opisem, a dalej sekcje z listami linków: tytuł podstrony w nawiasach kwadratowych, adres w okrągłych i po dwukropku zdanie o tym, co tam jest. Sekcja o nazwie „Optional” zbiera linki drugorzędne, które model może pominąć, gdy ma mało miejsca. Tak wygląda początek{' '}
                  <a href="/llms.txt" style={s.podkreslenie}>naszego pliku llms.txt</a>:
                </p>
              </>
            )}
            <pre style={{ ...s.karta, ...s.kod, padding: '1.25rem', margin: '0 0 0.5rem', whiteSpace: 'pre-wrap', overflowWrap: 'anywhere', color: 'var(--w-tusz)' }}>
              <code>{PRZYKLAD}</code>
            </pre>
            <p style={s.przypis}>{en ? PRZYKLAD_EN_NOTE : 'Fragment pliku https://www.ai-seo-company.pl/llms.txt, stan na 5 listopada 2026.'}</p>
            <p style={{ ...s.akapit, marginTop: '1rem' }}>
              {en ? 'Some sites also publish a second, much longer file called llms-full.txt. Our generator creates the index, that is llms.txt: it is what a typical company website needs.' : 'Niektóre serwisy publikują obok drugi, dużo dłuższy plik llms-full.txt. Nasz generator tworzy spis, czyli llms.txt: tego potrzebuje typowa strona firmowa.'}
            </p>
          </section>

          <section aria-labelledby="czy-llms-txt-pomaga" className={st.sekcja} style={s.sekcja}>
            <h2 id="czy-llms-txt-pomaga" style={s.h2}>{en ? 'Does llms.txt help in Google and ChatGPT?' : 'Czy llms.txt pomaga w Google i ChatGPT?'}</h2>
            {en ? (
              <>
                <p style={s.akapit}>
                  There is no evidence for it so far. Ahrefs (accessed November 5, 2026) found no statement from OpenAI, Anthropic or Google that their crawlers read this file. Even so, 28% of the 137,000 domains that Ahrefs studied in its Web Analytics tool publish llms.txt. Companies roll it out in advance, hoping that models will start to use it.
                </p>
                <p style={s.akapit}>
                  Signals from Google are mixed. The Chrome team added an llms.txt check to its experimental Lighthouse audits, while Google&apos;s John Mueller explained that the file was not created with search in mind. Gemini&apos;s access to content is governed separately, by the Google-Extended entry in robots.txt.
                </p>
                <p style={s.akapit}>
                  Our conclusion: llms.txt is a cheap add-on, not a strategy. Preparing the file costs little and breaks nothing, but whether ChatGPT, Perplexity or Claude cite your site is decided by their bots&apos; access and by content that can be quoted. That is why the generator also tests robots.txt and server responses for 8 bots. If you care about recommendations in model answers, start with{' '}
                  {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>AI search optimization</Link> : 'AI search optimization'}
                  {a2 ? (
                    <>
                      {' '}and read{' '}
                      <Link href={a2} style={s.podkreslenie}>how to get ranked in ChatGPT</Link>
                    </>
                  ) : null}
                  .
                </p>
              </>
            ) : (
              <>
            <p style={s.akapit}>
              Na razie brak na to dowodów. Ahrefs (odczyt 5.11.2026) nie znalazł deklaracji OpenAI, Anthropic ani Google, że ich crawlery czytają ten plik. Mimo to llms.txt publikuje 28% ze 137 000 domen, które Ahrefs zbadał w swoim narzędziu Web Analytics. Firmy wdrażają go na zapas, licząc, że modele zaczną z niego korzystać.
            </p>
            <p style={s.akapit}>
              Sygnały z Google są sprzeczne. Zespół Chrome dodał sprawdzanie llms.txt do eksperymentalnych audytów Lighthouse, a John Mueller z Google tłumaczył, że plik nie powstał z myślą o wyszukiwaniu. Dostęp Gemini do treści reguluje się osobno, wpisem Google-Extended w robots.txt.
            </p>
            <p style={s.akapit}>
              Nasz wniosek: llms.txt to tani dodatek, a nie strategia. Przygotowanie pliku kosztuje niewiele i niczego nie psuje, ale o tym, czy ChatGPT, Perplexity albo Claude zacytują stronę, decyduje dostęp ich botów i treść, którą da się zacytować. Dlatego generator testuje też robots.txt i odpowiedzi serwera dla 8 botów. Jeśli zależy Ci na poleceniach w odpowiedziach modeli, zacznij od{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>pozycjonowania w AI</Link> : 'pozycjonowania w AI'}
              {a2 ? (
                <>
                  {' '}i przeczytaj,{' '}
                  <Link href={a2} style={s.podkreslenie}>jak pozycjonować się w ChatGPT</Link>
                </>
              ) : null}
              .
            </p>
              </>
            )}
          </section>

          <section aria-labelledby="co-sprawdza-generator" className={st.sekcja} style={s.sekcja}>
            <h2 id="co-sprawdza-generator" style={s.h2}>{en ? 'What the generator checks' : 'Co sprawdza generator'}</h2>
            <p style={s.akapit}>
              {en ? `The generator fetches your sitemap, picks up to ${GENERATOR.adresow} URLs (with a larger sitemap, a few from every section), checks them and builds the file from them. At the same time it tests the access of ${GENERATOR.botow} bots to the home page. The whole run takes ${GENERATOR.sekund} seconds at most. If your site responds slowly, you get a partial result and a list of the URLs we did not manage to check. We do not store the address or the result.` : `Generator pobiera mapę strony, wybiera do ${GENERATOR.adresow} adresów (przy większej mapie po kilka z każdej sekcji), sprawdza je i składa z nich plik. Równolegle testuje dostęp ${GENERATOR.botow} botów do strony głównej. Całość trwa najwyżej ${GENERATOR.sekund} sekund. Gdy strona odpowiada wolno, dostajesz wynik częściowy i listę adresów, których nie zdążyliśmy sprawdzić. Nie zapisujemy ani adresu, ani wyniku.`}
            </p>
            <CompareTable
              id="tabela-testow"
              caption={en ? 'What the llms.txt generator checks' : 'Co sprawdza generator llms.txt'}
              columns={en ? [
                { key: 'co', label: 'Test' },
                { key: 'poCo', label: 'Why' },
                { key: 'jak', label: 'How to read the result' },
              ] : [
                { key: 'co', label: 'Test' },
                { key: 'poCo', label: 'Po co' },
                { key: 'jak', label: 'Jak czytać wynik' },
              ]}
              rows={(en ? TESTY_EN : TESTY).map((t) => ({ ...t, id: t.co }))}
              przypis={en ? 'We send requests from our own server, not from the IP addresses of AI providers, so treat the HTTP code column as a guide.' : 'Zapytania wysyłamy z naszego serwera, nie z adresów IP dostawców AI, więc kolumnę z kodem HTTP traktuj jako wskazówkę.'}
            />
            <p style={s.akapit}>
              {en ? 'This is how we check ourselves, too. On November 5, 2026 we queried our own site with 17 User-Agents (16 bots and a browser) on 7 URLs. All 119 requests returned code 200, and our llms.txt was 14,437 bytes at the time.' : 'Tak sprawdzamy też siebie. 5 listopada 2026 odpytaliśmy własną stronę 17 User-Agentami (16 botów i przeglądarka) na 7 adresach. Wszystkie 119 zapytań dostały kod 200, a nasz llms.txt miał wtedy 14 437 bajtów.'}
            </p>
          </section>

          <Sekcja id={en ? 'improve-the-file' : 'jak-poprawic-plik'} tytul={en ? 'How to improve the file before uploading it' : 'Jak poprawić plik przed wgraniem'}>
            <p style={s.akapit}>
              {en
                ? 'The generator builds the file from what your pages say about themselves in their title and meta description. Before you upload it, open the editor below the result and fix what an automated tool cannot judge:'
                : 'Generator składa plik z tego, co podstrony mówią o sobie w title i meta description. Zanim wgrasz plik, otwórz edytor pod wynikiem i popraw to, czego automat nie oceni:'}
            </p>
            <ol style={s.lista}>
              {(en ? [
                'The description under the heading: one or two sentences about what you do, for whom and where. A model reads it right after the name.',
                'Untick lines with no value for customers: login, cart, tags, search result pages.',
                'Shorten titles that repeat the company name or are too long. A description should say what is on the page, not invite a click.',
                'Move key pages to the top of their section, and move secondary ones to "Optional".',
                'Add important pages that are missing (for example pages outside your sitemap) by hand, in the same format.',
              ] : [
                'Opis pod nagłówkiem: jedno-dwa zdania o tym, co robisz, dla kogo i gdzie. Model czyta go zaraz po nazwie.',
                'Odznacz linie bez wartości dla klienta: logowanie, koszyk, tagi, strony wyników wyszukiwania.',
                'Skróć tytuły, które powtarzają nazwę firmy albo są za długie. Opis ma mówić, co jest na podstronie, a nie zachęcać do kliknięcia.',
                'Najważniejsze podstrony przesuń na początek sekcji, a drugorzędne przenieś do „Optional”.',
                'Ważne podstrony, których brakuje (np. spoza mapy strony), dopisz ręcznie w tym samym formacie.',
              ]).map((t) => <li key={t}>{t}</li>)}
            </ol>
            <p style={s.akapit}>
              {en
                ? 'The Copy and Download buttons take the file with your changes. The editor works in your browser: we do not send or store anything, so after you change your website, generate the file again.'
                : 'Przyciski „Kopiuj” i „Pobierz llms.txt” biorą plik już ze zmianami. Edytor działa w Twojej przeglądarce: niczego nie wysyłamy ani nie zapisujemy, więc po zmianach na stronie wygeneruj plik ponownie.'}
            </p>
          </Sekcja>

          <section aria-labelledby="jak-wdrozyc-llms-txt" className={st.sekcja} style={s.sekcja}>
            <h2 id="jak-wdrozyc-llms-txt" style={s.h2}>{en ? 'How to deploy llms.txt: WordPress, Next.js, Shopify' : 'Jak wdrożyć llms.txt: WordPress, Next.js, Shopify'}</h2>
            {en ? (
              <>
                <p style={s.akapit}>
                  Whatever the platform, the file should open at yourdomain.com/llms.txt as plain text. After deployment, enter your site address in the generator above and compare the result with the file.
                </p>

                <h3 id="llms-txt-wordpress" style={s.h3}>WordPress</h3>
                <p style={s.akapit}>
                  The simplest option is to use an SEO plugin, which you probably already have. According to the WordPress.org directory (accessed November 5, 2026), Yoast SEO (version 28.8), Rank Math (1.0.281) and All in One SEO (5.0.5) have an llms.txt feature. Turn it on in the plugin settings and check which pages made it into the file. Without a plugin, upload the file from the generator through your hosting file manager or FTP to the root directory, where wp-config.php lives. Pick one method so you do not have to maintain two versions of the file.
                </p>

                <h3 id="llms-txt-nextjs" style={s.h3}>Next.js</h3>
                <p style={s.akapit}>
                  Save the file as public/llms.txt. Next.js serves files from the public directory at the site root, so it will appear at /llms.txt with no extra code. If the list of pages changes often, use a route handler at app/llms.txt/route.js instead of a static file: it builds the content from the same data as your sitemap and returns it with the Content-Type: text/plain header. A new page then lands in llms.txt together with the deployment.
                </p>

                <h3 id="llms-txt-shopify" style={s.h3}>Shopify</h3>
                <p style={s.akapit}>
                  Shopify is a hosted platform: you cannot upload a file to the domain root over FTP. The Shopify community describes two workarounds: a custom llms.txt.liquid theme template, or a redirect from /llms.txt to a file added in the Files section. Shopify has not described this in its official documentation, so after making the change, open the file address in a browser. A file served at /llms.txt without a redirect is the safer choice.
                </p>
              </>
            ) : (
              <>
            <p style={s.akapit}>
              Niezależnie od platformy plik ma się otwierać pod adresem twojadomena.pl/llms.txt jako zwykły tekst. Po wdrożeniu wpisz adres strony w generator wyżej i porównaj wynik z plikiem.
            </p>

            <h3 id="llms-txt-wordpress" style={s.h3}>WordPress</h3>
            <p style={s.akapit}>
              Najprościej użyć wtyczki SEO, którą zwykle już masz. Według katalogu WordPress.org (odczyt 5.11.2026) funkcję llms.txt mają Yoast SEO (wersja 28.8), Rank Math (1.0.281) i All in One SEO (5.0.5). Włącz ją w ustawieniach wtyczki i sprawdź, które podstrony trafiły do pliku. Bez wtyczki wgraj plik z generatora przez menedżer plików hostingu albo FTP do katalogu głównego, tam gdzie leży wp-config.php. Wybierz jeden sposób, żeby nie utrzymywać dwóch wersji pliku.
            </p>

            <h3 id="llms-txt-nextjs" style={s.h3}>Next.js</h3>
            <p style={s.akapit}>
              Zapisz plik jako public/llms.txt. Next.js serwuje pliki z katalogu public pod adresem głównym, więc trafi pod /llms.txt bez dodatkowego kodu. Gdy lista podstron często się zmienia, zamiast stałego pliku użyj route handlera app/llms.txt/route.js, który składa treść z tych samych danych co sitemapa i zwraca ją z nagłówkiem Content-Type: text/plain. Nowa podstrona trafi wtedy do llms.txt razem z wdrożeniem.
            </p>

            <h3 id="llms-txt-shopify" style={s.h3}>Shopify</h3>
            <p style={s.akapit}>
              Shopify to platforma hostowana: nie wgrasz pliku przez FTP do katalogu głównego domeny. Społeczność Shopify opisuje dwa obejścia: własny szablon motywu llms.txt.liquid albo przekierowanie adresu /llms.txt na plik dodany w sekcji Pliki. Shopify nie opisał tego w oficjalnej dokumentacji, więc po zmianie otwórz adres pliku w przeglądarce. Pewniejszy jest plik dostępny pod /llms.txt bez przekierowania.
            </p>
              </>
            )}
          </section>

          <section aria-labelledby="po-generatorze" className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.sekcja, ...s.karta, display: 'grid', gap: '1rem' }}>
            <h2 id="po-generatorze" style={{ ...s.h2, marginBottom: 0 }}>{en ? 'File ready, but models still do not recommend your company?' : 'Plik gotowy, a modele dalej nie polecają firmy?'}</h2>
            <p style={{ ...s.akapit, margin: 0 }}>
              {en ? (
                <>
                  In our AI visibility audit we ask 30 questions your customers would ask in ChatGPT, Perplexity, Gemini and Google&apos;s AI Overviews, and show which pages the models take their recommendations from. You will find more free tools and templates in the{' '}
                  {hub ? <Link href={hub} style={s.podkreslenie}>tools and templates</Link> : 'tools and templates'} section.
                </>
              ) : (
                <>
              W audycie widoczności w AI zadajemy 30 pytań Twoich klientów w ChatGPT, Perplexity, Gemini i przeglądzie AI Google i pokazujemy, z jakich stron modele biorą polecenia. Więcej bezpłatnych narzędzi i wzorów jest w dziale{' '}
              {hub ? <Link href={hub} style={s.podkreslenie}>narzędzia i szablony</Link> : 'narzędzia i szablony'}.
                </>
              )}
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <Link href={audyt} className="btn btn-primary" data-cta="llms_audyt_tresc">{en ? `AI visibility audit: ${cena('audytAi', 'en')} net` : `Audyt widoczności w AI: ${cena('audytAi')} netto`}</Link>
              {sprawdzarka && <Link href={sprawdzarka} className="btn btn-secondary" data-cta="llms_sprawdzarka_tresc">{en ? 'Check whether ChatGPT recommends your company' : 'Sprawdź, czy ChatGPT poleca Twoją firmę'}</Link>}
            </div>
          </section>

          <Poradniki narzedzie={SCIEZKA} locale={locale} />
          <PozostaleNarzedzia bez={SCIEZKA} locale={locale} />
        </div>
      </section>

      <AppleFaq faqData={en ? [...FAQ_GENERATORA_EN, ...FAQ_DODATKOWE_EN] : [...FAQ_GENERATORA, ...FAQ_DODATKOWE]} title={en ? 'Questions about llms.txt' : 'Pytania o llms.txt'} sectionId="pytania" />

      <section style={{ paddingBottom: '4rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={en ? metaEn.sources : strona.sources} en={en} />
        </div>
      </section>
      <Footer />
    </main>
  );
}
