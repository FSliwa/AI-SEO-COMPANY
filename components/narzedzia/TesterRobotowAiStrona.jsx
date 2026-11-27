// Strona aplikacji: Tester Robotów AI, Parzystości SSR vs JS i Kreator Zapory robots.txt
// PL: /narzedzia/tester-robotow-ai-robots-txt | EN: /en/tools/ai-crawler-robots-txt-checker
// Komponent serwerowy; interaktywna część w TesterRobotowAiClient.jsx.

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import { CENY, cena } from '@/lib/narzedziaLiczby';
import Ozdoba from './Ozdoba';
import NawBok from './NawBok';
import CoDostajesz from './CoDostajesz';
import ZrzutWyniku from './ZrzutWyniku';
import Sekcja from './Sekcja';
import Poradniki from './Poradniki';
import PozostaleNarzedzia from './PozostaleNarzedzia';
import TesterRobotowAiClient from './TesterRobotowAiClient';
import st from './narzedzia.module.css';
import * as s from './styl';

const SLUG = 'tester-robotow-ai-robots-txt';
const URL_PL = `${BASE}/narzedzia/tester-robotow-ai-robots-txt`;
const URL_EN = `${BASE}/en/tools/ai-crawler-robots-txt-checker`;

const ZRODLA_PL = [
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (OAI-SearchBot, ChatGPT-User, GPTBot)', data: '2026-11-18' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity: PerplexityBot oraz Perplexity-User - dokumentacja i zakresy IP', data: '2026-11-18' },
  { url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', nazwa: 'Anthropic: Claude-SearchBot, Claude-User i ClaudeBot', data: '2026-11-18' },
  { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google Search Central: Googlebot oraz token Google-Extended w robots.txt', data: '2026-11-18' },
  { url: 'https://developers.cloudflare.com/bots/concepts/bot/verified-bots/', nazwa: 'Cloudflare Docs: Verified Bots, ASN/IP verification oraz Bot Fight Mode', data: '2026-11-18' },
  { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: Specyfikacja formatu /llms.txt (v2)', data: '2026-11-18' },
];

const ZRODLA_EN = [
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Overview of OpenAI Crawlers (OAI-SearchBot, ChatGPT-User, GPTBot)', data: '2026-11-18' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity: PerplexityBot and Perplexity-User documentation & IP ranges', data: '2026-11-18' },
  { url: 'https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', nazwa: 'Anthropic: Claude-SearchBot, Claude-User and ClaudeBot', data: '2026-11-18' },
  { url: 'https://developers.google.com/crawling/docs/crawlers-fetchers/google-common-crawlers', nazwa: 'Google Search Central: Googlebot and Google-Extended in robots.txt', data: '2026-11-18' },
  { url: 'https://developers.cloudflare.com/bots/concepts/bot/verified-bots/', nazwa: 'Cloudflare Docs: Verified Bots, ASN/IP verification and Bot Fight Mode', data: '2026-11-18' },
  { url: 'https://llmstxt.org/', nazwa: 'llmstxt.org: The /llms.txt file specification (v2)', data: '2026-11-18' },
];

const FAQ_PL = [
  {
    id: 'oai-searchbot-a-gptbot',
    question: 'Czy mogę zablokować trenowanie modeli AI (GPTBot), nie tracąc cytowań w ChatGPT?',
    answer: 'Tak. OpenAI rozdziela te role na osobne roboty: GPTBot zbiera dane do trenowania przyszłych modeli językowych, natomiast OAI-SearchBot buduje indeks wyszukiwarki ChatGPT, a ChatGPT-User pobiera stronę w trakcie rozmowy użytkownika. W naszym kreatorze robots.txt wariant „Rekomendowana” blokuje GPTBot, ClaudeBot i Google-Extended, ale zostawia otwarte drzwi dla OAI-SearchBot, PerplexityBot i Claude-SearchBot.',
  },
  {
    id: 'dlaczego-403-przy-allow',
    question: 'Dlaczego tester pokazuje błąd 403 Konflikt WAF, skoro w robots.txt mam Allow: /?',
    answer: 'Plik robots.txt to tylko deklaracja tekstowa, a nie ustawienie serwera. Zapory sieciowe (np. Cloudflare Bot Fight Mode, Wordfence w WordPressie, ModSecurity na hostingu współdzielonym) potrafią odrzucić zapytanie HTTP z nagłówkiem PerplexityBot lub OAI-SearchBot kodem 403 zanim robot przeczyta treść strony. W efekcie właściciel firmy myśli, że strona jest otwarta na AI, podczas gdy serwer wycina ruch u samego wejścia.',
  },
  {
    id: 'czy-boty-ai-wykonuja-javascript',
    question: 'Czy roboty ChatGPT, Perplexity i Claude renderują JavaScript tak jak Googlebot?',
    answer: 'Większość crawlerów AI pobiera wyłącznie surową odpowiedź HTML z serwera i nie uruchamia przeglądarki Chromium do wykonania kodu React, Vue ani Angular. Jeśli Twoja strona działa jako SPA (Client-Side Rendering) i bez JavaScriptu zwraca pusty znacznik <code>&lt;div id=&quot;root&quot;&gt;</code>, miernik parzystości SSR pokaże niski wynik, a modele językowe nie zobaczą nagłówków, cenników ani tabel.',
  },
  {
    id: 'co-oznacza-weryfikacja-ip-cloudflare',
    question: 'Co oznacza niebieska etykieta „Weryfikacja IP bota (CF)” w tabeli wyników?',
    answer: 'Cloudflare i wybrane sieci CDN weryfikują prawdziwe roboty wyszukiwarek po oficjalnych zakresach adresów IP i numerach ASN dostawców (OpenAI, Perplexity, Microsoft, Google). Gdy zewnętrzny tester przedstawia się tym samym User-Agentem z innego adresu IP, Cloudflare celowo odpowiada kodem 403 lub wyzwaniem. Oznaczamy to neutralnie, bo prawdziwy bot z oficjalnej sieci dostawcy przejdzie przez taką regułę, o ile nie włączono pełnej blokady AI.',
  },
  {
    id: 'czy-llms-txt-wystarczy',
    question: 'Czy wgranie pliku /llms.txt zastępuje poprawki w robots.txt i SSR?',
    answer: 'Nie. Plik /llms.txt to pomocniczy spis najważniejszych adresów w formacie Markdown (propozycja ze strony llmstxt.org). Nie nadpisuje zakazu Disallow w robots.txt, nie omija blokady 403 na zaporze WAF i nie wypełni pustego HTML-a w aplikacji SPA. Najpierw odblokuj boty wyszukiwania AI i zadbaj o renderowanie serwerowe (SSR), a plik /llms.txt dodaj jako uporządkowaną mapę treści.',
  },
];

const FAQ_EN = [
  {
    id: 'block-gptbot-keep-chatgpt-search',
    question: 'Can I block LLM training (GPTBot) without losing citations in ChatGPT Search?',
    answer: 'Yes. OpenAI separates model training from search: GPTBot collects text for training future foundation models, whereas OAI-SearchBot indexes pages for ChatGPT Search citations and ChatGPT-User fetches pages live during user prompts. Our "Recommended" robots.txt preset blocks GPTBot, ClaudeBot and Google-Extended while keeping OAI-SearchBot, PerplexityBot and Claude-SearchBot open.',
  },
  {
    id: 'why-403-waf-conflict-with-allow',
    question: 'Why do I see a 403 WAF Conflict when my robots.txt has Allow: /?',
    answer: 'Because robots.txt is only an advisory text file, not a firewall rule. Security layers such as Cloudflare Bot Fight Mode, Wordfence on WordPress, or shared-hosting ModSecurity rules frequently block requests carrying PerplexityBot or OAI-SearchBot User-Agents with HTTP 403 before the crawler ever receives your HTML.',
  },
  {
    id: 'do-ai-crawlers-execute-javascript',
    question: 'Do ChatGPT, Perplexity and Claude crawlers execute JavaScript like Googlebot?',
    answer: 'No. Unlike Googlebot’s headless Chromium Web Rendering Service, AI search crawlers fetch raw HTTP HTML responses without executing client-side React, Vue or Angular bundles. If your site relies on Client-Side Rendering (SPA) and ships an empty <code>&lt;div id=&quot;root&quot;&gt;</code> container, AI bots see almost zero words, headings or pricing tables.',
  },
  {
    id: 'what-is-cloudflare-ip-verification',
    question: 'What does the "Cloudflare Bot IP Check" badge mean in the matrix?',
    answer: 'Cloudflare Verified Bots validates crawlers against published IP ranges and ASNs owned by OpenAI, Perplexity, Microsoft and Google. When a diagnostic scanner sends the same User-Agent from outside those official IP blocks, Cloudflare returns a protective 403 challenge. We mark this neutrally so you do not mistake IP spoofing protection for an accidental block.',
  },
  {
    id: 'does-llms-txt-replace-ssr-and-robots',
    question: 'Does adding /llms.txt replace fixing robots.txt or SSR content parity?',
    answer: 'No. The /llms.txt file is a curated Markdown directory of key URLs (llmstxt.org), not an access control override. If OAI-SearchBot or PerplexityBot is blocked in robots.txt, rejected with HTTP 403 by your WAF, or served blank client-rendered HTML, /llms.txt alone will not get your pages cited.',
  },
];

export function TesterRobotowAiStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'AI Crawler, SSR Parity & robots.txt Firewall Checker'
    : 'Tester robotów AI, parzystości SSR i zapory robots.txt');
  const okruszek = wpisRejestru?.okruszek || (en ? 'AI Crawler & robots.txt Checker' : 'Tester robotów AI i robots.txt');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);
  const ilustracja = obrazKarty(SLUG, locale);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'AI Crawler, SSR Content Parity & robots.txt Tester / Validator' : 'Tester robotów AI, parzystości SSR i walidator robots.txt'}
        description={en
          ? 'Free online robots.txt tester and AI crawler validator: checks robots.txt rules vs real HTTP firewall status across 15 AI & search crawlers (OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot), measures SSR vs JS HTML visibility, and generates a 1-click robots.txt policy.'
          : 'Bezpłatny tester robots.txt i walidator robotów AI online: porównuje reguły robots.txt z realnym kodem HTTP zapory serwerowej dla 15 botów AI i wyszukiwarek (OAI-SearchBot, PerplexityBot, ClaudeBot, GPTBot), mierzy widoczność treści bez JavaScriptu (SSR) i generuje gotowy plik robots.txt.'}
        url={en ? URL_EN : URL_PL}
        category="DeveloperApplication"
        screenshot={ilustracja ? { url: ilustracja.src, width: ilustracja.width, height: ilustracja.height } : undefined}
        featureList={en
          ? [
              '15-bot split matrix comparing robots.txt rules against live HTTP firewall responses and TTFB',
              'Detection of 403 WAF conflicts and Cloudflare Verified Bot IP checks',
              'SSR vs JavaScript Content Parity meter (words, H1/H2, tables, links, JSON-LD, SPA detection)',
              '1-click robots.txt firewall generator with 3 policies (Allow AI Search + Block Training, Open GEO, Strict Block)',
              'Embeddable SVG AI-Ready verification badge for sites scoring 70/100 or higher',
            ]
          : [
              'Macierz 15 botów AI zestawiająca reguły robots.txt z realnym kodem odpowiedzi HTTP i TTFB',
              'Wykrywanie cichych blokad 403 na zaporze WAF oraz weryfikacji IP botów w Cloudflare',
              'Miernik parzystości treści SSR bez JavaScriptu (słowa, H1/H2, tabele, linki, JSON-LD, detekcja SPA)',
              'Kreator zapory robots.txt w 3 wariantach (Wpuść wyszukiwarki AI + Zablokuj trening, Otwarte GEO, Pełna blokada)',
              'Dynamiczna odznaka SVG AI-Ready do wklejenia na stronę przy wyniku od 70/100 wzwyż',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="llms" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free AI & Technical SEO Tool' : 'Darmowe narzędzie AI i Technical SEO'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Enter your URL to verify in 5 seconds whether OAI-SearchBot, PerplexityBot and Claude actually reach your server, how much of your page renders without JavaScript, and generate a clean robots.txt firewall.'
              : 'Wklej adres strony i w 5 sekund sprawdź, czy OAI-SearchBot, PerplexityBot oraz Claude przechodzą przez Twoją zaporę serwerową, ile treści widzą bez JavaScriptu i pobierz gotowy plik robots.txt.'}
          </p>

          <TesterRobotowAiClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Being cited in ChatGPT, Perplexity and Claude requires three technical layers to align: your robots.txt must allow AI search bots (such as OAI-SearchBot and PerplexityBot), your server firewall (WAF/CDN) must return HTTP 200 instead of 403, and your HTML must deliver headings, facts and schema via Server-Side Rendering (SSR) without relying on client-side JavaScript. Our free robots.txt tester and validator checks all three layers at once and builds your robots.txt file.'
                : 'Żeby ChatGPT, Perplexity i Claude mogły zacytować Twoją firmę, muszą zadziałać naraz trzy warstwy techniczne: plik robots.txt musi wpuszczać boty wyszukiwania AI (OAI-SearchBot, PerplexityBot, Claude-SearchBot), zapora serwerowa WAF/CDN musi zwracać kod HTTP 200 zamiast blokady 403, a serwer musi podawać treść i JSON-LD w czystym HTML (SSR) bez czekania na wykonanie JavaScriptu. Nasz darmowy tester robots.txt i walidator robots.txt weryfikuje wszystkie trzy punkty jednocześnie.'}
            </AnswerBox>
            <Byline sciezka="/narzedzia/tester-robotow-ai-robots-txt" takzeEn style={{ margin: '1.25rem 0 0' }} />
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      'Overall 0-100 AI Readiness score combining bot reachability, TTFB and HTML completeness',
                      'SSR vs JavaScript Content Parity meter: word count without JS, H1/H2 headings, tables, links, JSON-LD and SPA shell detection',
                      '15-bot split matrix grouped into AI Search, User Agents and LLM Training Scrapers',
                      'Detection of 403 WAF firewall conflicts when robots.txt says Allow yet CDN rejects the bot',
                      '1-click robots.txt generator (Copy or Download) plus an embeddable AI-Ready SVG badge for scores >= 70',
                    ]
                  : [
                      'Ogólny wynik gotowości AI w skali 0-100 łączący dostępność botów, TTFB i kompletność HTML',
                      'Miernik parzystości treści SSR bez JavaScriptu: liczba słów, nagłówki H1/H2, tabele, linki, JSON-LD oraz wykrywanie szkieletu SPA',
                      'Macierz 15 robotów podzielona na wyszukiwarki AI, agenty użytkownika oraz scrapery treningowe LLM',
                      'Wykrywanie konfliktów 403 WAF, gdy robots.txt pozwala wejść, ale serwer lub CDN wycina zapytanie',
                      'Kreator pliku robots.txt jednym kliknięciem oraz dynamiczna odznaka SVG dla domen z wynikiem od 70 pkt',
                    ]}
                przypis={en
                  ? 'Zero email gate: every metric, diagnostic table and generated configuration file is unlocked immediately.'
                  : 'Zero bramki e-mail: pełną macierz 15 botów, diagnozę SSR i wygenerowany plik robots.txt pobierasz od razu.'}
              >
                {ilustracja ? <ZrzutWyniku {...ilustracja} sizes="(max-width: 900px) 100vw, 860px" /> : null}
              </CoDostajesz>

              {en ? (
                <>
                  <Sekcja id="ai-search-bots-vs-training-scrapers" tytul="AI Search Bots vs User Agents vs Training Scrapers">
                    <p style={s.akapit}>
                      Between 2023 and 2025, thousands of companies pasted blanket <code>Disallow: /</code> rules for every AI bot after reading headlines about model scraping. In 2026, that single copy-pasted rule silently removes brands from ChatGPT Search, Perplexity source cards and Claude web answers. Major AI providers now split their crawlers by purpose:
                    </p>
                    <CompareTable
                      id="table-ai-bot-roles"
                      caption="Official roles of major AI crawlers and recommended robots.txt action"
                      columns={[
                        { key: 'bot', label: 'Bot User-Agent' },
                        { key: 'provider', label: 'Provider & Category' },
                        { key: 'role', label: 'What it actually does' },
                        { key: 'policy', label: 'Recommended Rule' },
                      ]}
                      rows={[
                        { id: 'oai-search', bot: 'OAI-SearchBot', provider: 'OpenAI (Search)', role: 'Indexes pages for clickable citations in ChatGPT Search; does not train foundation models', policy: 'Allow: /' },
                        { id: 'perplexity', bot: 'PerplexityBot', provider: 'Perplexity (Search)', role: 'Builds Perplexity search index and numbered citation links', policy: 'Allow: /' },
                        { id: 'claude-search', bot: 'Claude-SearchBot', provider: 'Anthropic (Search)', role: 'Indexes web pages for Claude search answers with source attribution', policy: 'Allow: /' },
                        { id: 'chatgpt-user', bot: 'ChatGPT-User', provider: 'OpenAI (User Agent)', role: 'Fetches a live URL when a user asks ChatGPT about a specific page or topic', policy: 'Allow: /' },
                        { id: 'gptbot', bot: 'GPTBot', provider: 'OpenAI (Training)', role: 'Crawls public text to train future OpenAI generative models', policy: 'Optional Disallow: /' },
                        { id: 'claudebot', bot: 'ClaudeBot', provider: 'Anthropic (Training)', role: 'Collects training corpus data for Anthropic language models', policy: 'Optional Disallow: /' },
                        { id: 'google-ext', bot: 'Google-Extended', provider: 'Google (Training)', role: 'Controls Gemini model training without removing pages from Google Search', policy: 'Optional Disallow: /' },
                      ]}
                      przypis="Sources: OpenAI Crawler Documentation, Perplexity Crawlers Docs, Anthropic Support and Google Search Central (verified November 2026)."
                    />
                    <p style={s.akapit}>
                      Once your technical access is configured, combine it with structured authority building and citation engineering inside our{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>AI search optimization (GEO) service</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="ssr-vs-javascript-ai-crawlers" tytul="Why SSR vs Client-Side JavaScript Decides AI Citations">
                    <p style={s.akapit}>
                      Googlebot invests massive compute in a two-wave headless Chromium renderer so it can eventually index JavaScript-heavy websites. AI crawlers such as <code>OAI-SearchBot</code>, <code>PerplexityBot</code> and <code>ClaudeBot</code> optimize for sub-second retrieval latency: they download the initial HTTP payload and parse raw HTML immediately.
                    </p>
                    <ul style={s.lista}>
                      <li><strong>Client-Side SPA risk:</strong> Pure React, Vue or Vite single-page apps return an empty container in raw HTML, leaving AI crawlers with zero headings, zero product specs and zero internal links.</li>
                      <li><strong>Heavy CMS page-builder bloat:</strong> Legacy WordPress themes stacked with visual builders bury actual copy beneath tens of thousands of lines of inline styles and blocking scripts, pushing key tables past crawler truncation limits.</li>
                      <li><strong>Server-Side Rendering advantage:</strong> Frameworks like Next.js App Router render complete semantic HTML (<code>h1</code>, <code>h2</code>, <code>table</code>, <code>JSON-LD</code>) on the server in ~100-200 ms TTFB.</li>
                    </ul>
                    <p style={s.akapit}>
                      See our full architectural breakdown in{' '}
                      <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress for SEO & AI</Link>, explore our{' '}
                      <Link href="/projektowanie-stron-internetowych" style={s.podkreslenie}>custom Next.js web design</Link>, or check{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO & Booster Pack pricing</Link> (where we build a new Next.js website for €0 upfront inside a €{CENY.boosterPack.eur}/mo SEO plan).
                    </p>
                  </Sekcja>

                  <Sekcja id="waf-403-conflicts-and-cloudflare" tytul="Silent 403 WAF Conflicts: When robots.txt Lies to You">
                    <p style={s.akapit}>
                      Checking <code>/robots.txt</code> in isolation gives a false sense of security. Across B2B audits we routinely see domains with a clean <code>Allow: /</code> file whose origin server or CDN returns <code>HTTP 403 Forbidden</code> to <code>PerplexityBot</code> or <code>Claude-SearchBot</code>.
                    </p>
                    <h3 style={s.h3}>How to resolve a 403 WAF conflict</h3>
                    <ol style={s.lista}>
                      <li><strong>Cloudflare Bot Fight Mode:</strong> In Cloudflare Dashboard (Security - Bots), inspect Security Events filtered by User-Agent and ensure AI search crawlers are not blocked by Super Bot Fight Mode managed rules.</li>
                      <li><strong>WordPress security plugins:</strong> Check Wordfence, iThemes/Solid Security or Hosting WAF logs for blocked ASN ranges belonging to OpenAI, Perplexity or Anthropic.</li>
                      <li><strong>Re-verify live:</strong> Run the URL above again and confirm that all bots in Group 1 (AI Search & Citations) return HTTP 200, then pair your setup with a clean{' '}
                        <Link href="/narzedzia/generator-llms-txt" style={s.podkreslenie}>llms.txt index file</Link>.
                      </li>
                    </ol>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="wyszukiwarki-ai-agenty-a-trening" tytul="Wyszukiwarki AI, agenty użytkownika a scrapery treningowe">
                    <p style={s.akapit}>
                      W latach 2023-2025 tysiące firm wklejało hurtową blokadę wszystkich botów AI do pliku <code>robots.txt</code>, chcąc chronić artykuły przed kopiowaniem. W 2026 roku taka reguła po cichu wycina firmę z odpowiedzi zakupowych w ChatGPT Search, Perplexity i Claude. Dostawcy modeli rozdzielili swoje crawlery na trzy niezależne grupy:
                    </p>
                    <CompareTable
                      id="tabela-role-botow-ai"
                      caption="Podział najważniejszych robotów AI według dokumentacji dostawców i zalecana reguła w robots.txt"
                      columns={[
                        { key: 'bot', label: 'User-Agent bota' },
                        { key: 'dostawca', label: 'Dostawca i grupa' },
                        { key: 'rola', label: 'Za co odpowiada w praktyce' },
                        { key: 'regula', label: 'Zalecana reguła' },
                      ]}
                      rows={[
                        { id: 'oai-search', bot: 'OAI-SearchBot', dostawca: 'OpenAI (Wyszukiwanie)', rola: 'Buduje indeks wyszukiwarki ChatGPT i klikalne cytowania; nie służy do trenowania modeli', regula: 'Allow: /' },
                        { id: 'perplexity', bot: 'PerplexityBot', dostawca: 'Perplexity (Wyszukiwanie)', rola: 'Indeksuje strony do odpowiedzi i kart źródeł w Perplexity', regula: 'Allow: /' },
                        { id: 'claude-search', bot: 'Claude-SearchBot', dostawca: 'Anthropic (Wyszukiwanie)', rola: 'Indeksuje strony do odpowiedzi z cytowaniem źródła w Claude', regula: 'Allow: /' },
                        { id: 'chatgpt-user', bot: 'ChatGPT-User', dostawca: 'OpenAI (Agent)', rola: 'Pobiera stronę na żywo, gdy użytkownik pyta o konkretny adres lub ofertę w oknie czatu', regula: 'Allow: /' },
                        { id: 'gptbot', bot: 'GPTBot', dostawca: 'OpenAI (Trening)', rola: 'Pobiera publiczne teksty do trenowania kolejnych generacji modeli OpenAI', regula: 'Można dać Disallow: /' },
                        { id: 'claudebot', bot: 'ClaudeBot', dostawca: 'Anthropic (Trening)', rola: 'Zbiera korpus treningowy dla modeli językowych Claude', regula: 'Można dać Disallow: /' },
                        { id: 'google-ext', bot: 'Google-Extended', dostawca: 'Google (Trening)', rola: 'Steruje udziałem treści w treningu Gemini bez wpływu na pozycje w wyszukiwarce Google', regula: 'Można dać Disallow: /' },
                      ]}
                      przypis="Źródła: dokumentacja OpenAI Crawlers, Perplexity Crawlers, Anthropic Support oraz Google Search Central (weryfikacja: listopad 2026)."
                    />
                    <p style={s.akapit}>
                      Odblokowanie robotów to fundament techniczny. Jak budować wzmianki zewnętrzne, strukturę odpowiedzi i cytowania marki w modelach, pokazujemy na stronie usługi{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>pozycjonowanie w AI (GEO)</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="parzystosc-ssr-a-javascript" tytul="Dlaczego parzystość SSR kontra JavaScript decyduje o cytowaniach w AI">
                    <p style={s.akapit}>
                      Klasyczny Googlebot uruchamia zasobożerny silnik Chromium (Web Rendering Service), dzięki czemu potrafi z opóźnieniem przeczytać strony budowane w przeglądarce. Roboty AI - takie jak <code>OAI-SearchBot</code>, <code>PerplexityBot</code> czy <code>ClaudeBot</code> - pobierają wyłącznie surowy dokument HTML z pierwszego zapytania HTTP i nie wykonują paczek JavaScript.
                    </p>
                    <ul style={s.lista}>
                      <li><strong>Pułapka aplikacji SPA (React/Vue CSR):</strong> Jeśli serwer wysyła pusty kontener <code>&lt;div id=&quot;root&quot;&gt;</code>, a oferta doczytuje się dopiero w przeglądarce klienta, bot AI widzi pustą kartkę bez nagłówków i cennika.</li>
                      <li><strong>Narzut ciężkich kreatorów w CMS:</strong> Motywy z rozbudowanymi page builderami potrafią wygenerować setki kilobajtów stylów inline zanim w kodzie pojawi się pierwszy akapit oferty, przez co tabele i FAQ wypadają poza limit okna pobierania bota.</li>
                      <li><strong>Przewaga Next.js (Server-Side Rendering):</strong> Renderowanie po stronie serwera zwraca w ułamku sekundy gotowy, semantyczny HTML z nagłówkami <code>H1-H3</code>, tabelami porównawczymi i pełnym grafem <code>JSON-LD</code>.</li>
                    </ul>
                    <p style={s.akapit}>
                      Szczegółowe zestawienie obu architektur znajdziesz w analizie{' '}
                      <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress pod SEO i AI</Link>. Nowe serwisy kodujemy w usłudze{' '}
                      <Link href="/projektowanie-stron-internetowych" style={s.podkreslenie}>projektowania stron internetowych</Link>, a w pakiecie Booster Pack (zobacz{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>, {cena('boosterPack')} netto miesięcznie) budujemy nową stronę w Next.js za 0 zł opłaty startowej.
                    </p>
                  </Sekcja>

                  <Sekcja id="konflikt-waf-cloudflare-403" tytul="Cicha blokada 403 WAF: gdy robots.txt mówi Tak, a serwer odpowiada Nie">
                    <p style={s.akapit}>
                      Samo sprawdzenie pliku <code>/robots.txt</code> nie wystarcza. W audytach technicznych regularnie spotykamy strony z wzorowym wpisem <code>Allow: /</code>, których serwer albo CDN odrzuca zapytania <code>PerplexityBot</code> i <code>OAI-SearchBot</code> kodem <code>HTTP 403 Forbidden</code>.
                    </p>
                    <h3 style={s.h3}>Jak usunąć konflikt 403 na zaporze</h3>
                    <ol style={s.lista}>
                      <li><strong>Cloudflare Bot Fight Mode:</strong> Wejdź w panelu Cloudflare do zakładki Security - Bots / Events i sprawdź, czy tryb Super Bot Fight Mode nie blokuje zweryfikowanych crawlerów AI.</li>
                      <li><strong>Wtyczki zabezpieczające i WAF hostingu:</strong> Sprawdź logi Wordfence, Solid Security lub reguły ModSecurity u hostingodawcy pod kątem odrzuconych zakresów ASN należących do OpenAI, Perplexity i Anthropic.</li>
                      <li><strong>Uzupełnij nawigację dla modeli:</strong> Po odblokowaniu kodów 200 wygeneruj plik indeksowy w naszym darmowym narzędziu{' '}
                        <Link href="/narzedzia/generator-llms-txt" style={s.podkreslenie}>generator llms.txt</Link>{' '}
                        i sprawdź resztę błędów technicznych w{' '}
                        <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>darmowym audycie SEO</Link>.
                      </li>
                    </ol>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/tester-robotow-ai-robots-txt" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/tester-robotow-ai-robots-txt" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: AI Crawlers, SSR & robots.txt' : 'Najczęstsze pytania o roboty AI, parzystość SSR i robots.txt'}
        sectionId="pytania"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <Zrodla zrodla={zrodla} {...(en ? { en: true } : {})} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default TesterRobotowAiStrona;
