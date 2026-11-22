// Strona aplikacji D3: Tester Bing / ChatGPT Search, Audytor Entropii lastmod i Generator IndexNow
// PL: /narzedzia/generator-indexnow-test-bing-chatgpt | EN: /en/tools/indexnow-generator-bing-chatgpt-test

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Link } from '@/i18n/routing';
import { BASE, RODZIC_OKRUSZKOW, stronaNarzedzia } from '@/lib/narzedzia';
import { stronaNarzedziaL } from '@/lib/narzedzia.en';
import { cena } from '@/lib/narzedziaLiczby';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import NawBok from '@/components/narzedzia/NawBok';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import Sekcja from '@/components/narzedzia/Sekcja';
import PozostaleNarzedzia from '@/components/narzedzia/PozostaleNarzedzia';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import IndexNowBingClient from './IndexNowBingClient';

const SLUG = 'generator-indexnow-test-bing-chatgpt';
const URL_PL = `${BASE}/narzedzia/generator-indexnow-test-bing-chatgpt`;
const URL_EN = `${BASE}/en/tools/indexnow-generator-bing-chatgpt-test`;

const ZRODLA_PL = [
  { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Oficjalna specyfikacja protokołu IndexNow (format klucza .txt, limity POST JSON i współdzielenie między wyszukiwarkami)', data: '2026-11-22' },
  { url: 'https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap', nazwa: 'Microsoft Bing Webmaster Blog: Dlaczego dokładne wartości <lastmod> decydują o priorytecie crawlowania w Bing', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Dokumentacja OAI-SearchBot i powiązanie wyszukiwarki ChatGPT z indeksem sieciowym', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', nazwa: 'Google Search Central: Zasady stosowania znacznika <lastmod> wyłącznie przy istotnej zmianie treści', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://www.indexnow.org/documentation', nazwa: 'IndexNow.org: Official IndexNow protocol specification (TXT key verification & JSON batch API)', data: '2026-11-22' },
  { url: 'https://blogs.bing.com/webmaster/february-2023/The-Importance-of-Setting-the-lastmod-Tag-in-Your-Sitemap', nazwa: 'Microsoft Bing Webmaster Blog: The importance of accurate <lastmod> tags in sitemaps', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: OAI-SearchBot documentation for ChatGPT Search indexing', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', nazwa: 'Google Search Central: Build and submit a sitemap (verifiable <lastmod> requirement)', data: '2026-11-22' },
];

const FAQ_PL = [
  {
    id: 'dlaczego-bing-decyduje-o-chatgpt',
    question: 'Dlaczego indeksacja w Bing i Bing Webmaster Tools wpływa na widoczność w ChatGPT?',
    answer: 'Wyszukiwarka wbudowana w ChatGPT korzysta z dwóch filarów: własnego robota indeksującego <code>OAI-SearchBot</code> oraz infrastruktury wyszukiwania Microsoft Bing (na której działa również Microsoft Copilot). Jeżeli Twoich nowych podstron brakuje w indeksie Binga lub zapora wycina <code>Bingbot</code> i <code>OAI-SearchBot</code>, model nie znajdzie aktualnej oferty ani cennika podczas odpowiedzi na żywo.',
  },
  {
    id: 'czym-jest-protokol-indexnow',
    question: 'Jak działa protokół IndexNow i czy Google z niego korzysta?',
    answer: 'IndexNow to otwarty standard powiadamiania typu push wspierany m.in. przez Microsoft Bing, Naver, Seznam i Yep. Zamiast czekać dniami na ponowne odwiedziny bota, Twój serwer wysyła jedno zapytanie HTTP POST z listą zmienionych adresów URL, a wyszukiwarki uczestniczące w protokole wymieniają się tym zgłoszeniem automatycznie. Google obecnie nie należy do IndexNow i nadal polega na plikach sitemap.xml z wiarygodnym <code>&lt;lastmod&gt;</code>.',
  },
  {
    id: 'co-to-jest-entropia-lastmod',
    question: 'Dlaczego jednakowa data lastmod na wszystkich podstronach szkodzi indeksacji?',
    answer: 'Wiele skryptów budujących strony (np. w Next.js, Astro lub własnych generatorach) wpisuje przy każdym wdrożeniu aktualną godzinę buildu do wszystkich adresów w <code>sitemap.xml</code>. Gdy 200 podstron ma co noc identyczną datę co do sekundy, entropia dat spada do zera - algorytmy Bing i Google oznaczają wtedy pole <code>&lt;lastmod&gt;</code> jako niewiarygodne i przestają traktować je jako sygnał aktualizacji.',
  },
  {
    id: 'gdzie-wgrac-plik-klucza-indexnow',
    question: 'Gdzie dokładnie umieścić pobrany plik klucza .txt?',
    answer: 'Plik o nazwie równej wygenerowanemu kluczowi (np. <code>8f4c...b4d.txt</code>), zawierający wewnątrz ten sam ciąg znaków UTF-8, wgraj do głównego katalogu publicznego serwera (w Next.js jest to folder <code>public/</code>, w WordPressie katalog główny domeny obok <code>robots.txt</code>). Musi odpowiadać kodem HTTP 200 pod adresem <code>https://twojadomena.pl/klucz.txt</code>.',
  },
  {
    id: 'ile-adresow-mozna-wyslac-w-indexnow',
    question: 'Ile adresów URL można zgłosić w jednym żądaniu IndexNow?',
    answer: 'Specyfikacja IndexNow pozwala przekazać do 10 000 adresów URL należących do tego samego hosta w pojedynczym wywołaniu <code>POST https://api.indexnow.org/indexnow</code>. W codziennej pracy najlepiej wysyłać wyłącznie te podstrony, których widoczna treść faktycznie uległa zmianie.',
  },
];

const FAQ_EN = [
  {
    id: 'why-bing-matters-for-chatgpt-search',
    question: 'Why does Bing indexing directly affect ChatGPT Search and Copilot citations?',
    answer: 'ChatGPT Search blends OpenAI’s own <code>OAI-SearchBot</code> crawl index with Microsoft Bing’s web index (which also grounds Microsoft Copilot). When new service pages or pricing updates sit unindexed in Bing - or when your WAF blocks <code>Bingbot</code> or <code>OAI-SearchBot</code> - generative answers rely on outdated competitor pages instead.',
  },
  {
    id: 'how-does-indexnow-work',
    question: 'How does IndexNow work and which search engines support it?',
    answer: 'IndexNow is an instant push-indexing protocol backed by Microsoft Bing, Naver, Seznam and Yep. Instead of waiting for periodic polling crawls, a single HTTP POST request notifies api.indexnow.org whenever URLs are created or updated, and participating engines share the ping automatically. Google does not use IndexNow and relies on accurate sitemap <code>&lt;lastmod&gt;</code> timestamps.',
  },
  {
    id: 'what-is-sitemap-lastmod-entropy',
    question: 'Why do identical sitemap lastmod timestamps hurt crawl priority?',
    answer: 'Many static-site and SSR build scripts stamp every URL in <code>sitemap.xml</code> with <code>new Date().toISOString()</code> on every deploy. When 100% of your URLs share one identical timestamp, date entropy collapses to 1 unique value - both Google and Bing explicitly state they ignore unverified boilerplate <code>&lt;lastmod&gt;</code> dates.',
  },
  {
    id: 'where-to-place-indexnow-key-txt',
    question: 'Where should I upload the generated IndexNow .txt key file?',
    answer: 'Place the downloaded UTF-8 <code>&lt;key&gt;.txt</code> file in your public web root (for Next.js inside <code>public/</code>, for WordPress/Nginx in the document root next to <code>robots.txt</code>) so <code>https://yourdomain.com/&lt;key&gt;.txt</code> returns HTTP 200 with the key string.',
  },
  {
    id: 'indexnow-batch-url-limits',
    question: 'How many URLs can I submit in a single IndexNow POST request?',
    answer: 'The official IndexNow JSON endpoint accepts up to 10,000 URLs per HTTP POST batch for a verified host. Best practice is to submit only URLs whose rendered content hash actually changed during your deployment.',
  },
];

export function IndexNowBingStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'IndexNow Key Generator, Sitemap lastmod & Bing / ChatGPT Checker'
    : 'Generator IndexNow, audytor lastmod i tester Bing oraz ChatGPT');
  const okruszek = wpisRejestru?.okruszek || (en ? 'IndexNow & Bing Checker' : 'Generator IndexNow i Bing');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'IndexNow Generator, Sitemap lastmod Entropy & Bing / ChatGPT Tester' : 'Generator IndexNow, audytor entropii lastmod i tester Bing / ChatGPT Search'}
        description={en
          ? 'Free instant indexing & GEO diagnostic tool: checks Bingbot and OAI-SearchBot access, detects fake uniform <lastmod> dates in sitemap.xml, and generates a ready-to-download IndexNow .txt key, curl command and GitHub Actions workflow.'
          : 'Darmowe narzędzie indeksacji pod Bing i AI: sprawdza dostęp Bingbot oraz OAI-SearchBot, wykrywa sztuczne daty <lastmod> w sitemap.xml i generuje plik klucza IndexNow .txt do pobrania razem z komendą curl i plikiem GitHub Actions.'}
        url={en ? URL_EN : URL_PL}
        category="DeveloperApplication"
        featureList={en
          ? [
              'Live HTTP & robots.txt verification for Bingbot and OAI-SearchBot',
              'Sitemap <lastmod> timestamp entropy audit detecting fake build-time dates',
              '1-click 128-bit IndexNow key generator with downloadable <key>.txt file',
              'Copy-ready IndexNow JSON curl command and .github/workflows/indexnow.yml',
            ]
          : [
              'Test dostępu na żywo dla robotów Bingbot oraz OAI-SearchBot (ChatGPT Search)',
              'Audyt entropii dat <lastmod> w sitemap.xml wykrywający sztuczne daty buildu',
              'Generator klucza IndexNow z przyciskiem pobrania gotowego pliku <klucz>.txt',
              'Gotowa komenda curl oraz plik .github/workflows/indexnow.yml do skopiowania',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="llms" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free Instant Indexing & ChatGPT Search Tool' : 'Darmowe narzędzie indeksacji Bing i ChatGPT Search'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Verify in seconds whether Bingbot and OAI-SearchBot can index your site, check if crawlers trust your sitemap <lastmod> dates, and generate a complete IndexNow setup with key download.'
              : 'Sprawdź w kilka sekund, czy Bingbot i OAI-SearchBot indeksują Twoją stronę pod ChatGPT Search, czy roboty ufają datom <lastmod> w Twojej sitemapie, i pobierz gotowy zestaw wdrożeniowy IndexNow.'}
          </p>

          <IndexNowBingClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Fast visibility in ChatGPT Search and Microsoft Copilot depends on clean HTTP 200 access for both Bingbot and OAI-SearchBot, honest per-page <lastmod> dates in sitemap.xml (not uniform build timestamps), and instant push pings via the IndexNow protocol. Our tool checks all three and generates your <key>.txt verification file, curl command and GitHub Action for free.'
                : 'Szybka obecność nowych podstron w ChatGPT Search oraz Microsoft Copilot wymaga trzech elementów: otwartego dostępu HTTP 200 dla robotów Bingbot i OAI-SearchBot, prawdziwych dat modyfikacji <lastmod> w pliku sitemap.xml (zamiast jednej daty buildu dla całej witryny) oraz natychmiastowych powiadomień push przez protokół IndexNow. Nasze narzędzie weryfikuje te punkty i generuje gotowy plik klucza .txt.'}
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email needed' : 'Od razu na ekranie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      'Side-by-side reachability cards for Bingbot and OAI-SearchBot (robots.txt + live HTTP)',
                      'Sitemap.xml <lastmod> entropy check exposing fake single-timestamp deployments',
                      'Instant 32-character hexadecimal IndexNow key with 1-click <key>.txt file download',
                      'Ready-to-run curl batch POST command and .github/workflows/indexnow.yml pipeline',
                    ]
                  : [
                      'Karty dostępu na żywo dla Bingbot i OAI-SearchBot (deklaracja robots.txt + kod HTTP)',
                      'Diagnostyka entropii <lastmod> w sitemap.xml wykrywająca sztuczne daty z wdrożeń',
                      'Wygenerowany klucz szesnastkowy IndexNow z przyciskiem pobrania pliku <klucz>.txt',
                      'Gotowa komenda curl oraz plik automatyzacji .github/workflows/indexnow.yml',
                    ]}
                przypis={en
                  ? '100% free, zero sign-up: download your verification key file and deploy in 2 minutes.'
                  : 'Zero rejestracji i zero opłat: pobierasz plik klucza i wdrażasz IndexNow w 2 minuty.'}
              />

              {en ? (
                <>
                  <Sekcja id="indexnow-vs-sitemap-vs-llms-txt" tytul="IndexNow vs sitemap.xml vs llms.txt: How Discovery Protocols Work Together">
                    <CompareTable
                      id="table-discovery-protocols"
                      caption="Comparison of modern URL discovery and AI indexing mechanisms"
                      columns={[
                        { key: 'protocol', label: 'Mechanism' },
                        { key: 'consumers', label: 'Who Reads It' },
                        { key: 'role', label: 'Primary Technical Role' },
                      ]}
                      rows={[
                        { id: 'indexnow', protocol: 'IndexNow (POST API)', consumers: 'Microsoft Bing, Copilot, Naver, Seznam, Yep', role: 'Instant push alert within seconds of publishing or updating a URL' },
                        { id: 'sitemap', protocol: 'sitemap.xml + <lastmod>', consumers: 'Googlebot, Bingbot, PerplexityBot, OAI-SearchBot', role: 'Complete canonical URL inventory with per-page modification dates' },
                        { id: 'llmstxt', protocol: '/llms.txt (Markdown)', consumers: 'LLM agents & AI documentation readers', role: 'Curated priority map of your most important commercial & help pages' },
                      ]}
                      przypis="Sources: IndexNow.org specification, Microsoft Bing Webmaster Blog and Google Search Central."
                    />
                    <p style={s.akapit}>
                      Read our full architectural comparison in{' '}
                      <Link href="/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml" style={s.podkreslenie}>llms.txt vs robots.txt vs sitemap.xml</Link>{' '}
                      and our analysis of{' '}
                      <Link href="/blog/reklamy-w-chatgpt" style={s.podkreslenie}>ChatGPT Search, Bing indexing &amp; Organic GEO</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="fixing-fake-lastmod-timestamps" tytul="How to Fix Artificial <lastmod> Dates in Next.js & CMS Sitemaps">
                    <ul style={s.lista}>
                      <li><strong>Content-hash tracking:</strong> Compute a SHA-256 hash of rendered main content at build time and only advance <code>&lt;lastmod&gt;</code> when visible text actually changes.</li>
                      <li><strong>CMS database timestamps:</strong> Pull real <code>post_modified_gmt</code> dates rather than regenerating a static timestamp across unchanged pages.</li>
                      <li><strong>Pair with full AI bot testing:</strong> Inspect all 15 AI crawlers in our{' '}
                        <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={s.podkreslenie}>AI Crawler &amp; robots.txt Checker</Link>, build your{' '}
                        <Link href="/narzedzia/generator-llms-txt" style={s.podkreslenie}>llms.txt file</Link>, or see our{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO &amp; GEO plans</Link>{' '}
                        (from {cena('seoStandard', 'en')} net/mo).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="indexnow-a-sitemap-i-llms-txt" tytul="IndexNow kontra sitemap.xml i llms.txt: za co odpowiada każdy plik">
                    <CompareTable
                      id="tabela-protokoly-indeksacji"
                      caption="Rola trzech uzupełniających się mechanizmów zgłaszania treści wyszukiwarkom i AI"
                      columns={[
                        { key: 'mechanizm', label: 'Mechanizm' },
                        { key: 'odbiorcy', label: 'Kto z niego korzysta' },
                        { key: 'zadanie', label: 'Główne zadanie w indeksacji' },
                      ]}
                      rows={[
                        { id: 'indexnow', mechanizm: 'IndexNow (API POST)', odbiorcy: 'Microsoft Bing, Copilot, Naver, Seznam, Yep', zadanie: 'Natychmiastowy sygnał push w kilka sekund po publikacji lub edycji strony' },
                        { id: 'sitemap', mechanizm: 'sitemap.xml + <lastmod>', odbiorcy: 'Googlebot, Bingbot, PerplexityBot, OAI-SearchBot', zadanie: 'Pełny spis kanonicznych adresów URL z prawdziwą datą ostatniej zmiany treści' },
                        { id: 'llmstxt', mechanizm: '/llms.txt (Markdown)', odbiorcy: 'Agenty AI oraz asystenci kodowania i wyszukiwania', zadanie: 'Wyselekcjonowany przewodnik po najważniejszych usługach, cenniku i dokumentacji' },
                      ]}
                      przypis="Źródła: dokumentacja IndexNow.org, Microsoft Bing Webmaster Blog oraz Google Search Central."
                    />
                    <p style={s.akapit}>
                      Zobacz nasze szczegółowe zestawienie{' '}
                      <Link href="/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml" style={s.podkreslenie}>llms.txt vs robots.txt vs sitemap.xml</Link>{' '}
                      oraz praktyczny poradnik wdrożeniowy{' '}
                      <Link href="/blog/bing-webmaster-tools-indexnow-chatgpt" style={s.podkreslenie}>Bing Webmaster Tools i IndexNow pod ChatGPT krok po kroku</Link>.
                    </p>
                  </Sekcja>

                  <Sekcja id="jak-naprawic-sztuczne-daty-lastmod" tytul="Jak naprawić sztuczne daty <lastmod> w Next.js oraz systemach CMS">
                    <ul style={s.lista}>
                      <li><strong>Odcisk treści (Content Hash):</strong> Zamiast wstawiać <code>new Date()</code> przy każdym wdrożeniu, zapisuj skrót widocznego tekstu podstrony i zmieniaj datę <code>&lt;lastmod&gt;</code> wyłącznie przy realnej edycji.</li>
                      <li><strong>Prawdziwa data edycji z bazy CMS:</strong> Pobieraj pole ostatniej modyfikacji dokumentu zamiast daty wygenerowania cache.</li>
                      <li><strong>Sprawdź pozostałe boty AI:</strong> Przetestuj wszystkie 12 crawlerów w{' '}
                        <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={s.podkreslenie}>testerze robotów AI i SSR</Link>, stwórz mapę dla modeli w{' '}
                        <Link href="/narzedzia/generator-llms-txt" style={s.podkreslenie}>generatorze llms.txt</Link>{' '}
                        lub sprawdź nasz{' '}
                        <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cennik pozycjonowania</Link>{' '}
                        (pakiety od {cena('seoStandard')} netto/mies.).
                      </li>
                    </ul>
                  </Sekcja>
                </>
              )}

              <PozostaleNarzedzia bez="/narzedzia/generator-indexnow-test-bing-chatgpt" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: IndexNow, Bing & ChatGPT Search' : 'Najczęstsze pytania o IndexNow, Bing Webmaster Tools i daty lastmod'}
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

export default IndexNowBingStrona;
