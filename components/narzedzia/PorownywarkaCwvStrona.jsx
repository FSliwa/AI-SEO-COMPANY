// Strona aplikacji: Porównywarka Core Web Vitals i Wycieku Konwersji: WordPress vs Next.js (Live CrUX VS)
// PL: /narzedzia/test-core-web-vitals-porownanie | EN: /en/tools/core-web-vitals-competitor-comparison
// Komponent serwerowy; interaktywna część w PorownywarkaCwvClient.jsx.

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
import { CENY, cena } from '@/lib/narzedziaLiczby';
import Ozdoba from './Ozdoba';
import NawBok from './NawBok';
import CoDostajesz from './CoDostajesz';
import Sekcja from './Sekcja';
import Poradniki from './Poradniki';
import PozostaleNarzedzia from './PozostaleNarzedzia';
import PorownywarkaCwvClient from './PorownywarkaCwvClient';
import st from './narzedzia.module.css';
import * as s from './styl';

const SLUG = 'test-core-web-vitals-porownanie';
const URL_PL = `${BASE}/narzedzia/test-core-web-vitals-porownanie`;
const URL_EN = `${BASE}/en/tools/core-web-vitals-competitor-comparison`;

const ZRODLA_PL = [
  { url: 'https://web.dev/articles/vitals', nazwa: 'Google web.dev: Core Web Vitals - progi LCP (2,5 s), INP (200 ms) i CLS (0,10) w 75. percentylu', data: '2026-11-18' },
  { url: 'https://web.dev/blog/inp-cwv-march-12', nazwa: 'Google web.dev: Interaction to Next Paint (INP) oficjalnie zastępuje FID od 12 marca 2024', data: '2026-11-18' },
  { url: 'https://developer.chrome.com/docs/crux', nazwa: 'Chrome Developers: Chrome User Experience Report (CrUX) - metodologia 28-dniowego okna pomiarowego', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals w wyszukiwarce Google i Search Console', data: '2026-11-18' },
  { url: 'https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/', nazwa: 'Google & Deloitte („Milliseconds Make Millions”): wpływ skrócenia ładowania o 0,1 s na konwersję mobilną', data: '2026-11-18' },
];

const ZRODLA_EN = [
  { url: 'https://web.dev/articles/vitals', nazwa: 'Google web.dev: Core Web Vitals - 75th-percentile thresholds for LCP (2.5 s), INP (200 ms) and CLS (0.10)', data: '2026-11-18' },
  { url: 'https://web.dev/blog/inp-cwv-march-12', nazwa: 'Google web.dev: Interaction to Next Paint (INP) officially replaces FID on March 12, 2024', data: '2026-11-18' },
  { url: 'https://developer.chrome.com/docs/crux', nazwa: 'Chrome Developers: Chrome User Experience Report (CrUX) 28-day rolling field methodology', data: '2026-11-18' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Understanding Core Web Vitals and Google search results', data: '2026-11-18' },
  { url: 'https://www.thinkwithgoogle.com/intl/en-emea/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/', nazwa: 'Google & Deloitte ("Milliseconds Make Millions"): impact of 0.1 s mobile speed improvements on conversion rates', data: '2026-11-18' },
];

const FAQ_PL = [
  {
    id: 'crux-a-lighthouse-roznica',
    question: 'Dlaczego wynik w tym narzędziu różni się czasem od pojedynczego testu w Lighthouse?',
    answer: 'Lighthouse wykonuje jednorazową symulację laboratoryjną na sztucznie spowolnionym łączu, natomiast Google w algorytmie rankingowym bierze pod uwagę dane terenowe CrUX (Chrome User Experience Report), czyli rzeczywiste pomiary z ostatnich 28 dni zebrane na prawdziwych telefonach użytkowników Chrome. Nasza porównywarka w pierwszej kolejności pobiera 28-dniowe dane CrUX, a do pomiaru laboratoryjnego PageSpeed Insights sięga wtedy, gdy domena ma jeszcze zbyt mały ruch, by trafić do bazy CrUX.',
  },
  {
    id: 'co-to-jest-inp-zamiast-fid',
    question: 'Czym jest wskaźnik INP i dlaczego strony na kreatorach WordPress tak często go oblewają?',
    answer: 'Od marca 2024 roku wskaźnik INP (Interaction to Next Paint) zastąpił dawną metrykę FID. FID mierzył wyłącznie pierwsze kliknięcie, a INP ocenia czas reakcji strony na każde dotknięcie menu, akordeonu FAQ czy formularza przez całą wizytę (próg: maksymalnie 200 ms). Ciężkie motywy WordPressa z kilkunastoma wtyczkami ładują setki kilobajtów JavaScriptu blokującego główny wątek procesora telefonu, przez co po dotknięciu ekranu interfejs zamarza na 300-600 ms.',
  },
  {
    id: 'czy-wtyczka-cache-wystarczy',
    question: 'Czy instalacja wtyczki WP Rocket albo LiteSpeed Cache rozwiąże problem jak migracja na Next.js?',
    answer: 'Wtyczka cache przyspiesza odpowiedź serwera (TTFB), bo podaje zapisany plik HTML zamiast uruchamiać PHP przy każdym wejściu. Nie usuwa jednak nadmiarowego drzewa DOM wygenerowanego przez page builder ani dziesiątek skryptów śledzących i wtyczek ładowanych w przeglądarce klienta. W Next.js komponenty serwerowe (React Server Components) w ogóle nie wysyłają kodu bibliotek do telefonu użytkownika, stąd stabilne INP poniżej 50 ms.',
  },
  {
    id: 'jak-liczony-wyciek-konwersji',
    question: 'Skąd pochodzi wzór na utracone zapytania z telefonów w kalkulatorze pod tabelą?',
    answer: 'Model opiera się na wspólnym badaniu Google i firmy doradczej Deloitte („Milliseconds Make Millions”), w którym przeanalizowano dziesiątki milionów sesji mobilnych: skrócenie czasu ładowania o każde 0,1 sekundy zwiększało współczynnik konwersji o 8,4% w handlu i 10,1% w usługach. Nasz kalkulator porównuje zmierzone LCP i INP Twojej domeny ze wzorcem Next.js (1,15 s) i nakłada ostrożny limit maksymalny, żeby wynik stanowił realistyczną orientację biznesową, a nie obietnicę przychodu.',
  },
  {
    id: 'na-czym-polega-booster-pack',
    question: 'Jak działa strona Next.js za 0 zł na start w pakiecie Booster Pack?',
    answer: `Zamiast płacić osobno 10-20 tys. zł za budowę strony i osobno za pozycjonowanie, w pakiecie Booster Pack (${cena('boosterPack')} netto miesięcznie, minimalny okres umowy to ${CENY.boosterPack.umowaMiesiecy} miesiące) projektujemy i kodujemy od zera indywidualny serwis w Next.js bez opłaty wdrożeniowej na start, a od pierwszego miesiąca prowadzimy pełne działania SEO w Google i GEO pod odpowiedzi AI.`,
  },
];

const FAQ_EN = [
  {
    id: 'crux-vs-lighthouse-difference',
    question: 'Why do CrUX numbers differ from a one-off Lighthouse browser audit?',
    answer: 'Lighthouse runs a single synthetic lab simulation on a throttled virtual CPU, whereas Google Search rankings evaluate real-world Chrome User Experience Report (CrUX) field data aggregated over the past 28 days from actual mobile visitors. Our comparison tool prioritizes official 28-day CrUX field metrics and falls back to PageSpeed Insights lab runs only when a domain lacks sufficient Chrome traffic.',
  },
  {
    id: 'what-is-inp-vs-fid',
    question: 'What is INP and why do visual page-builder sites fail it on mobile?',
    answer: 'Interaction to Next Paint (INP) officially replaced First Input Delay (FID) in March 2024. While FID only measured the very first tap, INP measures the worst interaction latency across the entire page visit - opening mobile menus, expanding FAQs or typing into forms (threshold: 200 ms or less). Heavy CMS themes with 10-20 plugins ship megabytes of main-thread JavaScript that freeze mid-range smartphones for 300-600 ms per tap.',
  },
  {
    id: 'can-caching-plugins-match-nextjs',
    question: 'Can WP Rocket or LiteSpeed Cache match Next.js Core Web Vitals?',
    answer: 'Page caching plugins improve server TTFB by serving pre-saved HTML instead of running PHP + MySQL queries on every visit. However, caching cannot strip bloated DOM trees or eliminate third-party plugin scripts executing inside the visitor’s phone browser. Next.js Server Components render on the edge with zero client-side JavaScript overhead for content sections, keeping INP consistently around 40-60 ms.',
  },
  {
    id: 'how-mobile-conversion-leak-is-calculated',
    question: 'How do you estimate lost mobile enquiries in the calculator?',
    answer: 'The formula references the joint Google and Deloitte study ("Milliseconds Make Millions"), which found across millions of mobile sessions that every 0.1 s improvement in mobile load speed lifted conversion rates by 8.4% in retail and 10.1% in travel and services. We measure the gap between your live LCP/INP and our 1.15 s Next.js benchmark with a conservative cap so you get a grounded commercial estimate.',
  },
  {
    id: 'how-booster-pack-zero-upfront-works',
    question: `How does the €0 upfront Next.js website in Booster Pack (€${CENY.boosterPack.eur}/mo) work?`,
    answer: `Instead of paying $4,000-$10,000 upfront for a custom website rebuild before starting SEO, our Booster Pack (€${CENY.boosterPack.eur} net/mo, ${CENY.boosterPack.umowaMiesiecy}-month minimum agreement) includes a bespoke, custom-coded Next.js SSR website built for €0 upfront alongside ongoing technical SEO, content, link building and AI visibility optimization.`,
  },
];

export function PorownywarkaCwvStrona({ locale = 'pl' } = {}) {
  const en = locale === 'en';
  const wpisRejestru = en ? stronaNarzedziaL(SLUG, 'en') : stronaNarzedzia(SLUG);

  const h1 = wpisRejestru?.h1 || (en
    ? 'Core Web Vitals Competitor Comparison & Mobile Conversion Leak Calculator'
    : 'Test i porównywarka Core Web Vitals: Twoja strona vs konkurent vs Next.js');
  const okruszek = wpisRejestru?.okruszek || (en ? 'Core Web Vitals Comparison' : 'Porównywarka Core Web Vitals');
  const zrodla = wpisRejestru?.sources?.length ? wpisRejestru.sources : (en ? ZRODLA_EN : ZRODLA_PL);

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs pl={okruszek} en={okruszek} parent={RODZIC_OKRUSZKOW} />
      <WebAppSchema
        name={en ? 'Core Web Vitals Competitor Comparison & Mobile Conversion Calculator' : 'Porównywarka Core Web Vitals z konkurencją i kalkulator wycieku konwersji'}
        description={en
          ? 'Free live Core Web Vitals comparison tool: benchmarks your mobile LCP, INP, CLS and TTFB (28-day Chrome CrUX data) against any competitor and Next.js SSR, inspects CMS plugin bloat, and calculates lost mobile leads.'
          : 'Bezpłatna porównywarka Core Web Vitals na żywo: zestawia mobilne LCP, INP, CLS i TTFB (28-dniowe dane CrUX z Chrome) Twojej strony z konkurentem oraz architekturą Next.js, prześwietla wtyczki CMS i liczy utracone zapytania.'}
        url={en ? URL_EN : URL_PL}
        category="BusinessApplication"
        featureList={en
          ? [
              '3-column side-by-side Core Web Vitals comparison: Your Site vs Competitor vs Next.js Benchmark',
              'Live 28-day Chrome User Experience Report (CrUX) mobile LCP, INP, CLS and TTFB',
              'CMS & plugin X-Ray: detected platform, active plugin signatures, render-blocking scripts and HTML weight',
              'Interactive mobile conversion leak calculator based on Google/Deloitte 0.1 s speed study',
              '24-month TCO breakdown comparing WordPress maintenance against Booster Pack (€0 upfront Next.js site)',
            ]
          : [
              '3-kolumnowe porównanie Core Web Vitals: Twoja strona, konkurent z branży oraz wzorzec Next.js SSR',
              'Prawdziwe 28-dniowe pomiary użytkowników mobilnych z Chrome UX Report (LCP, INP, CLS, TTFB)',
              'Rentgen CMS i wtyczek: wykryty silnik, publiczne sygnatury wtyczek, skrypty blokujące oraz waga HTML',
              'Interaktywny kalkulator wycieku zapytań mobilnych oparty na badaniu Google i Deloitte (0,1 s)',
              'Porównanie 24-miesięcznego kosztu posiadania (TCO) WordPressa z pakietem Booster Pack (strona Next.js 0 zł na start)',
            ]}
        {...(en ? { language: 'en' } : {})}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="autorytet" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
              {en ? 'Free Live CrUX Benchmark' : 'Darmowy test CrUX na żywo'}
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            {en
              ? 'Compare your real 28-day Chrome mobile speed (LCP, INP, CLS, TTFB) and CMS script overhead side by side against a competitor and a zero-plugin Next.js architecture - and see how many enquiries slow mobile loads cost you each month.'
              : 'Zestaw prawdziwe 28-dniowe czasy ładowania na telefonie (LCP, INP, CLS, TTFB) i liczbę wtyczek swojej strony z konkurentem oraz architekturą Next.js - i policz na żywo, ile zapytań miesięcznie ucieka przez wolny mobile.'}
          </p>

          <PorownywarkaCwvClient />

          <div style={s.poNarzedziu}>
            <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
              {en
                ? 'Core Web Vitals are Google’s three official user-experience metrics measured at the 75th percentile of real Chrome mobile visits: Largest Contentful Paint (LCP <= 2.50 s), Interaction to Next Paint (INP <= 200 ms) and Cumulative Layout Shift (CLS <= 0.10). Our tool compares your live CrUX field metrics and CMS script weight directly against your competitor and a modern Next.js Server Components stack, translating millisecond delays into estimated monthly mobile revenue leak.'
                : 'Core Web Vitals to trzy oficjalne wskaźniki wygody użytkownika mierzone przez Google w 75. percentylu prawdziwych wizyt mobilnych w przeglądarce Chrome: ładowanie głównego elementu (LCP <= 2,50 s), czas reakcji na dotyk (INP <= 200 ms) oraz stabilność wizualna (CLS <= 0,10). Nasze narzędzie zestawia Twoje dane terenowe CrUX i narzut skryptów CMS z konkurentem oraz czystą architekturą Next.js, przeliczając sekundy opóźnienia na utracone zapytania ofertowe.'}
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                locale={locale}
                tytulOdRazu={en ? 'Right away in the browser, no email required' : 'Od razu na stronie, bez podawania e-maila'}
                odRazu={en
                  ? [
                      'Side-by-side 3-column table: Your Website vs Competitor vs Next.js Booster Pack Benchmark',
                      'Color-coded mobile LCP, INP, CLS and TTFB evaluated against Google’s official 75th-percentile thresholds',
                      'CMS & plugin X-Ray revealing detected framework, plugin footprints, render-blocking scripts and HTML KB weight',
                      'Reactive mobile conversion leak calculator with live sliders for monthly traffic and customer value',
                      'Shareable comparison URL (?a=...&b=...) to send directly to your board or developer',
                    ]
                  : [
                      '3-kolumnowa tabela porównawcza: Twoja strona, wybrany konkurent oraz wzorzec Next.js SSR',
                      'Kolorystyczna ocena mobilnego LCP, INP, CLS i TTFB według oficjalnych progów Google (75. percentyl)',
                      'Prześwietlenie CMS pokazujące wykryty system, wtyczki, liczbę skryptów blokujących renderowanie i wagę HTML',
                      'Reaktywny kalkulator wycieku konwersji z suwakami miesięcznego ruchu mobilnego i wartości klienta',
                      'Gotowy link do skopiowania (?a=...&b=...), który odtwarza to samo porównanie u wspólnika lub programisty',
                    ]}
                przypis={en
                  ? 'All measurements and financial estimates appear immediately with zero registration.'
                  : 'Całe porównanie i kalkulację TCO widzisz od razu bez zakładania konta i bez bramki e-mail.'}
              />

              {en ? (
                <>
                  <Sekcja id="crux-field-data-vs-lighthouse-lab" tytul="CrUX 28-Day Field Data vs Lighthouse Lab Scores">
                    <p style={s.akapit}>
                      Many website owners celebrate a green 92/100 score in a desktop Lighthouse test while Google Search Console flags every URL on their domain as &quot;Poor&quot; on mobile. That discrepancy happens because Lighthouse is a synthetic single-run simulation, whereas Google’s ranking systems read the <strong>Chrome User Experience Report (CrUX)</strong>.
                    </p>
                    <ul style={s.lista}>
                      <li><strong>Real devices and cellular networks:</strong> CrUX aggregates anonymized telemetry over a rolling 28-day window from real Android and desktop Chrome users visiting your pages on 4G/5G and Wi-Fi.</li>
                      <li><strong>The strict 75th-percentile rule:</strong> To pass a Core Web Vital, at least 75% of all recorded visits must beat the threshold - not the average, and not your office MacBook Pro.</li>
                      <li><strong>No gaming the metric:</strong> Script-delay plugins that trick Lighthouse timers by waiting for mouse movement still fail real CrUX INP as soon as a mobile visitor taps the navigation menu.</li>
                    </ul>
                  </Sekcja>

                  <Sekcja id="inp-vs-fid-and-cwv-thresholds" tytul="INP vs FID: Official 2026 Core Web Vitals Thresholds">
                    <p style={s.akapit}>
                      When Google replaced First Input Delay (FID) with Interaction to Next Paint (INP) in March 2024, hundreds of thousands of plugin-heavy CMS websites dropped out of the &quot;Good&quot; bucket overnight. Unlike FID, INP measures main-thread responsiveness throughout the entire session:
                    </p>
                    <CompareTable
                      id="table-cwv-thresholds"
                      caption="Google Core Web Vitals and server TTFB thresholds (75th percentile, mobile)"
                      columns={[
                        { key: 'metric', label: 'Metric' },
                        { key: 'good', label: 'Good (Green)' },
                        { key: 'needs', label: 'Needs Improvement' },
                        { key: 'poor', label: 'Poor (Red)' },
                        { key: 'cause', label: 'Typical Bottleneck in Legacy CMS' },
                      ]}
                      rows={[
                        { id: 'lcp', metric: 'LCP (Largest Contentful Paint)', good: '<= 2.50 s', needs: '2.51 - 4.00 s', poor: '> 4.00 s', cause: 'Slow PHP TTFB, unoptimized hero images, render-blocking CSS/JS' },
                        { id: 'inp', metric: 'INP (Interaction to Next Paint)', good: '<= 200 ms', needs: '201 - 500 ms', poor: '> 500 ms', cause: 'Heavy page-builder DOM, jQuery sliders, tag manager & chat widget scripts' },
                        { id: 'cls', metric: 'CLS (Cumulative Layout Shift)', good: '<= 0.10', needs: '0.11 - 0.25', poor: '> 0.25', cause: 'Images/iframes without width & height, late-loading web fonts and cookie banners' },
                        { id: 'ttfb', metric: 'TTFB (Time to First Byte)', good: '<= 800 ms', needs: '801 - 1800 ms', poor: '> 1800 ms', cause: 'Uncached MySQL queries, overloaded shared hosting, heavy PHP middleware' },
                      ]}
                      przypis="Source: Google web.dev Core Web Vitals documentation (verified November 2026)."
                    />
                  </Sekcja>

                  <Sekcja id="cms-plugin-bloat-vs-nextjs-architecture" tytul="Why CMS Plugin Bloat Leaks Mobile Leads (and How Next.js Fixes It)">
                    <p style={s.akapit}>
                      A typical corporate WordPress installation accumulates 15 to 30 plugins over three years: a visual builder, form plugin, multilingual add-on, slider, popup manager and security firewall. Even when page caching hides slow PHP execution, every mobile visitor still downloads and parses each plugin’s CSS and JavaScript.
                    </p>
                    <p style={s.akapit}>
                      In Next.js App Router, layout, copy, comparison tables and structured data compile on the server as zero-bundle React Server Components, while images automatically receive <code>AVIF/WebP</code> sizing with zero layout shift. Read our full 9-point breakdown in{' '}
                      <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress for SEO & AI</Link>, see how we build high-converting sites in{' '}
                      <Link href="/projektowanie-stron-internetowych" style={s.podkreslenie}>custom web design</Link>, pair fast pages with{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>AI search optimization (GEO)</Link>, and review all tiers on our{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>SEO pricing page</Link>.
                    </p>
                  </Sekcja>
                </>
              ) : (
                <>
                  <Sekcja id="crux-kontra-lighthouse" tytul="Dane terenowe CrUX (28 dni) kontra laboratoryjny wynik Lighthouse">
                    <p style={s.akapit}>
                      Właściciele firm często widzą zielone 90 punktów w jednorazowym teście na szybkim laptopie w biurze, podczas gdy Google Search Console oznacza całą domenę na czerwono na urządzeniach mobilnych. Dzieje się tak dlatego, że jednorazowy przebieg Lighthouse to symulacja laboratoryjna, a algorytm Google ocenia <strong>dane terenowe Chrome User Experience Report (CrUX)</strong>.
                    </p>
                    <ul style={s.lista}>
                      <li><strong>Prawdziwe telefony i zasięg LTE/5G:</strong> Raport CrUX zbiera anonimowe pomiary z ostatnich 28 dni od realnych użytkowników przeglądarki Chrome wchodzących na Twoją stronę w trasie, na słabszym zasięgu i na kilkuletnich smartfonach ze średniej półki.</li>
                      <li><strong>Zasada 75. percentyla:</strong> Żeby Google zaliczyło wskaźnik na zielono, próg musi spełnić co najmniej 75% wszystkich prawdziwych odsłon, a nie średnia arytmetyczna.</li>
                      <li><strong>Koniec sztuczek z opóźnianiem skryptów:</strong> Wtyczki w WordPressie, które sztucznie wstrzymują ładowanie JavaScriptu do pierwszego dotknięcia ekranu, podbijają wynik laboratoryjny, ale przy pierwszym kliknięciu menu powodują drastyczny skok wskaźnika INP w danych CrUX.</li>
                    </ul>
                  </Sekcja>

                  <Sekcja id="inp-kontra-fid-progi-cwv" tytul="INP zamiast FID: oficjalne progi Core Web Vitals w 2026 roku">
                    <p style={s.akapit}>
                      Gdy w marcu 2024 roku Google zastąpiło przestarzały wskaźnik FID nową metryką INP (Interaction to Next Paint), setki tysięcy stron zbudowanych na wizualnych kreatorach spadły do czerwonej strefy. INP mierzy opóźnienie każdej interakcji użytkownika przez cały czas trwania wizyty:
                    </p>
                    <CompareTable
                      id="tabela-progi-cwv"
                      caption="Oficjalne progi Core Web Vitals i TTFB według dokumentacji Google (75. percentyl, mobile)"
                      columns={[
                        { key: 'metryka', label: 'Wskaźnik' },
                        { key: 'dobry', label: 'Dobry (Zielony)' },
                        { key: 'poprawa', label: 'Wymaga poprawy' },
                        { key: 'slaby', label: 'Słaby (Czerwony)' },
                        { key: 'przyczyna', label: 'Najczęstsza przyczyna na starszych CMS-ach' },
                      ]}
                      rows={[
                        { id: 'lcp', metryka: 'LCP (Largest Contentful Paint)', dobry: '<= 2,50 s', poprawa: '2,51 - 4,00 s', slaby: '> 4,00 s', przyczyna: 'Wolne TTFB z PHP/MySQL, ciężkie zdjęcie w hero, arkusze CSS i JS blokujące renderowanie' },
                        { id: 'inp', metryka: 'INP (Interaction to Next Paint)', dobry: '<= 200 ms', poprawa: '201 - 500 ms', slaby: '> 500 ms', przyczyna: 'Rozrośnięte drzewo DOM z kreatora, jQuery, slidery, czaty i nadmiar skryptów w GTM' },
                        { id: 'cls', metryka: 'CLS (Cumulative Layout Shift)', dobry: '<= 0,10', poprawa: '0,11 - 0,25', slaby: '> 0,25', przyczyna: 'Obrazy i ramki bez atrybutów width/height, doskakujące fonty oraz banery cookies' },
                        { id: 'ttfb', metryka: 'TTFB (Time to First Byte)', dobry: '<= 800 ms', poprawa: '801 - 1800 ms', slaby: '> 1800 ms', przyczyna: 'Brak pamięci podręcznej na serwerze, przeciążony hosting współdzielony, dziesiątki zapytań do bazy' },
                      ]}
                      przypis="Źródło: dokumentacja Google web.dev oraz Google Search Central (odczyt: listopad 2026)."
                    />
                  </Sekcja>

                  <Sekcja id="narzut-wtyczek-cms-a-nextjs" tytul="Skąd bierze się narzut wtyczek CMS i jak eliminuje go Next.js">
                    <p style={s.akapit}>
                      Przeciętna strona firmowa na WordPressie po dwóch latach rozbudowy ma od 15 do 30 aktywnych wtyczek: page builder, formularze, tłumaczenia, pop-upy, slidery i wtyczkę bezpieczeństwa. Nawet po włączeniu cache serwerowego każda z tych wtyczek wstrzykuje do przeglądarki telefonu własne pliki CSS i JavaScript.
                    </p>
                    <p style={s.akapit}>
                      W architekturze Next.js App Router sekcje tekstowe, tabele i dane strukturalne renderują się na serwerze (React Server Components) i wysyłają do telefonu zero kilobajtów zbędnego JavaScriptu, a obrazy są automatycznie serwowane w <code>AVIF/WebP</code> ze stałymi wymiarami (<code>CLS 0,00</code>). Zobacz nasze 9-punktowe porównanie{' '}
                      <Link href="/porownania/nextjs-vs-wordpress-seo" style={s.podkreslenie}>Next.js vs WordPress pod SEO i AI</Link>, sprawdź zakres usługi{' '}
                      <Link href="/projektowanie-stron-internetowych" style={s.podkreslenie}>projektowania stron internetowych</Link>, połącz szybki serwis z{' '}
                      <Link href="/pozycjonowanie-w-ai" style={s.podkreslenie}>pozycjonowaniem w AI (GEO)</Link>{' '}
                      oraz porównaj pakiety w{' '}
                      <Link href="/cennik-pozycjonowania" style={s.podkreslenie}>cenniku pozycjonowania</Link>.
                    </p>
                  </Sekcja>
                </>
              )}

              <Poradniki narzedzie="/narzedzia/test-core-web-vitals-porownanie" locale={locale} />
              <PozostaleNarzedzia bez="/narzedzia/test-core-web-vitals-porownanie" locale={locale} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={en ? FAQ_EN : FAQ_PL}
        title={en ? 'Frequently Asked Questions: Core Web Vitals, INP & Next.js' : 'Najczęstsze pytania o Core Web Vitals, INP i migrację na Next.js'}
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

export default PorownywarkaCwvStrona;
