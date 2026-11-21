import { articleLanguages } from '@/lib/blogPosts';
import { metadataDe } from '@/lib/stronyDe';
import BlogArtikelDe from '@/components/de/BlogArtikelDe';
import { BLOG_CWV_DE } from '@/lib/de/blogCoreWebVitals';

const KLUCZ_CWV = '/blog/core-web-vitals-a-pozycje-google';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  if (locale === 'de') {
    return metadataDe(KLUCZ_CWV, {
      languages: {
        pl: 'https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google',
        en: 'https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings',
      },
    });
  }
  return {
  // 5.11.2026 (PLAN-v2 5.2a nr 108, CWV-K; SA-10, SA-13): meta PL i EN bez „FID” (od 2024 metryka
  // to INP, tresc artykulu juz o tym mowi) i title PL w polskiej pisowni. Tresc bez zmian; title EN bez zmian.
  title: locale === 'en' ? 'Core Web Vitals vs Google Rankings | SEO Guide' : 'Core Web Vitals a pozycje w Google: przewodnik SEO',
  description: locale === 'en' ? 'Learn how Core Web Vitals (LCP, INP, CLS) affect your Google rankings: thresholds, measurement and what to fix first.' : 'Jak Core Web Vitals (LCP, INP, CLS) wpływają na pozycje w Google: progi, pomiar i co poprawić najpierw. Praktyczny przewodnik.',
  alternates: {
    canonical: locale === 'en' ? `https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings` : `https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google`,
    languages: articleLanguages('/blog/core-web-vitals-a-pozycje-google', 'https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google', 'https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings')
  },
};
}

import Header from '@/components/Header';
import ArticleSchema from '@/components/ArticleSchema';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import ArticleTOC from '@/components/ArticleTOC';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import BlogCTA from '@/components/BlogCTA';
import { Link } from '@/i18n/routing';
import { LASTMOD } from '@/lib/lastmod';

const BASE = 'https://www.ai-seo-company.pl';

const FAQ_CWV = [
  {
    id: 'co-to-jest-inp',
    idEn: 'what-is-inp',
    question: 'Co to jest INP i jaki wynik uznaje Google?',
    answer: 'INP (Interaction to Next Paint) mierzy czas reakcji strony na kliknięcia, dotknięcia i klawiaturę podczas całej wizyty użytkownika. Od marca 2024 roku zastąpił wskaźnik FID. Dobry wynik według Google to maksymalnie 200 ms w 75. percentylu wizyt mobilnych i desktopowych, a powyżej 500 ms strona wymaga poprawy.',
    questionEn: 'What is INP (Interaction to Next Paint)?',
    answerEn: 'INP (Interaction to Next Paint) measures how quickly a page responds visually to clicks, taps, and keyboard input across the whole visit. It replaced FID in March 2024. Google considers 200 ms or less at the 75th percentile of mobile and desktop visits good; above 500 ms is rated poor.',
  },
  {
    id: 'dane-terenowe-a-laboratoryjne',
    idEn: 'lighthouse-score-rankings',
    question: 'Czym różnią się dane terenowe (field) od laboratoryjnych (lab)?',
    answer: 'Dane terenowe (polowe CrUX) pochodzą z prawdziwych sesji użytkowników przeglądarki Chrome z ostatnich 28 dni i to one decydują o ocenie Core Web Vitals w Google Search Console. Dane laboratoryjne to pojedynczy test symulowany w Lighthouse, który pokazuje programiście, który obraz lub skrypt spowalnia ładowanie LCP, INP albo CLS.',
    questionEn: 'Does Lighthouse score directly affect Google rankings?',
    answerEn: 'No. Lighthouse runs in a simulated lab environment on a single throttled connection. Google Search systems evaluate 28-day field data from real Chrome users (CrUX) in Search Console, while Lighthouse helps developers find which scripts, fonts, or images slow LCP, INP, or CLS down before deploying fixes.',
  },
  {
    id: 'czy-cwv-podnosza-pozycje',
    idEn: 'are-cwv-ranking-factor',
    question: 'Czy Core Web Vitals bezpośrednio podnoszą pozycje w Google?',
    answer: 'Google potwierdza, że główne systemy rankingowe nagradzają strony zapewniające dobre doświadczenie użytkownika, w tym wyniki LCP do 2,5 s, INP do 200 ms i CLS do 0,1. Trafność i jakość treści pozostają jednak ważniejsze, więc same zielone wskaźniki w PageSpeed Insights nie zastąpią dopasowanej odpowiedzi na zapytanie.',
    questionEn: 'Are Core Web Vitals a direct Google ranking factor?',
    answerEn: 'Google states that its core ranking systems seek to reward content that provides a good page experience, including LCP up to 2.5 s, INP up to 200 ms, and CLS up to 0.1. Relevance and content quality still weigh more, so fast scores alone cannot outrank stronger pages.',
  },
];

const ZRODLA_CWV_PL = [
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals a wyniki wyszukiwania Google', data: '2026-11-20' },
  { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals - progi LCP, INP, CLS i zasada 75. percentyla', data: '2026-11-20' },
  { url: 'https://developer.chrome.com/docs/crux', nazwa: 'Chrome Developers: Chrome UX Report (CrUX) - dokumentacja danych polowych', data: '2026-11-20' },
  { url: 'https://web.dev/articles/inp', nazwa: 'web.dev: Interaction to Next Paint (INP)', data: '2026-11-20' },
  { url: 'https://www.ai-seo-company.pl/narzedzia/audyt-seo', nazwa: 'AI SEO COMPANY: Darmowy audyt SEO strony (pomiar PageSpeed i CWV)', data: '2026-11-20' },
];

const ZRODLA_CWV_EN = [
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Understanding Core Web Vitals and Google search results', data: '20 November 2026' },
  { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals - LCP, INP, CLS thresholds and 75th percentile rule', data: '20 November 2026' },
  { url: 'https://developer.chrome.com/docs/crux', nazwa: 'Chrome Developers: Chrome UX Report (CrUX) field data documentation', data: '20 November 2026' },
  { url: 'https://web.dev/articles/inp', nazwa: 'web.dev: Interaction to Next Paint (INP)', data: '20 November 2026' },
  { url: 'https://www.ai-seo-company.pl/en/tools/free-seo-audit', nazwa: 'AI SEO COMPANY: Free SEO Audit (PageSpeed and technical checks)', data: '20 November 2026' },
];

export default async function ArticleCwvPage({ params }) {
  const { locale } = await params;
  if (locale === 'de') return <BlogArtikelDe klucz={KLUCZ_CWV} dane={BLOG_CWV_DE} />;
  const tocItems = [
    { id: 'progi-cwv', title: 'Progi Core Web Vitals oraz dane terenowe i laboratoryjne' },
    { id: 'dane-polowe-a-laboratoryjne', title: 'Dane polowe (CrUX) a laboratoryjne (Lighthouse)' },
    { id: 'dlaczego-przejmowac-sie', title: 'Dlaczego w ogóle przejmować się Core Web Vitals?' },
    { id: 'kluczowe-wskazniki', title: 'Kluczowe wskaźniki (Metryki CWV) i ich optymalizacja' },
    { id: 'znaczenie-ttfb', title: 'Znaczenie TTFB i renderowania serwerowego (SSR)' },
    { id: 'pytania-cwv', title: 'Najczęstsze pytania' },
    { id: 'zrodla', title: 'Źródła' }
  ];
  const tocItemsEn = [
    { id: 'progi-cwv', title: 'Core Web Vitals thresholds: field data vs lab data' },
    { id: 'field-vs-lab-data', title: 'Field data (CrUX) vs lab data (Lighthouse)' },
    { id: 'dlaczego-przejmowac-sie', title: 'Why should you care about Core Web Vitals at all?' },
    { id: 'kluczowe-wskazniki', title: 'Key indicators (CWV Metrics) and their optimization' },
    { id: 'znaczenie-ttfb', title: 'The importance of TTFB and Server-Side Rendering (SSR)' },
    { id: 'pytania-cwv', title: 'Frequently asked questions' },
    { id: 'zrodla', title: 'Sources' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema
        slug="/blog/core-web-vitals-a-pozycje-google"
        locale={locale}
        dateModified={LASTMOD[locale === 'en' ? `${BASE}/en/blog/core-web-vitals-google-rankings` : `${BASE}/blog/core-web-vitals-a-pozycje-google`]}
      />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      {locale === 'en' ? (
        <>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Technical SEO & Speed
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--w-tusz-2)', fontWeight: 500 }}>
                July 24, 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: 'var(--w-tusz)', marginBottom: '1.5rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              Core Web Vitals and Rankings
            </h1>
            <Byline sciezka={KLUCZ_CWV} takzeEn />
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <AnswerBox etykieta="Short answer">
                In 2026, passing Core Web Vitals requires meeting three thresholds at the 75th percentile of real Chrome user visits (CrUX, mobile and desktop): LCP up to 2.5 s, INP up to 200 ms, and CLS up to 0.1. Google Search Console evaluates 28-day field data rather than simulated Lighthouse scores.
              </AnswerBox>
              <p className="lead">
                Core Web Vitals measure page experience, which Google says aligns with what its core ranking systems reward. Good scores help but do not guarantee higher rankings. Here is our guide: Core Web Vitals and Google rankings in 2026.
              </p>
              <ArticleTOC items={tocItemsEn} />

              <h2 id="progi-cwv">Core Web Vitals thresholds: field data vs lab data</h2>
              <p>Google rates a page as good when, at the 75th percentile of real user visits across both mobile and desktop devices (Chrome UX Report), <strong>LCP is &lt;= 2.5 s</strong> (needs improvement up to 4.0 s), <strong>INP is &lt;= 200 ms</strong> (poor above 500 ms), and <strong>CLS is &lt;= 0.1</strong> (poor above 0.25) (<a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">web.dev: Web Vitals</a>, accessed 20 November 2026). All three metrics must hit the green threshold at the 75th percentile for a URL group to pass.</p>

              <h2 id="field-vs-lab-data">Field data (CrUX) vs lab data (Lighthouse)</h2>
              <p>Field data from real Chrome users collected over a rolling 28-day window decides the Core Web Vitals assessment in Google Search Console for mobile and desktop separately. Lab data in Lighthouse (inside Chrome DevTools or the lower half of PageSpeed Insights) runs a single simulated load on a throttled connection: it does not count toward Google rankings, but helps developers reproduce render-blocking scripts, slow LCP images, and layout shifts before deploying fixes. You can check technical issues and mobile PageSpeed across up to 25 URLs in our <Link href="/narzedzia/audyt-seo">free SEO audit</Link>.</p>
              
              <h2 id="dlaczego-przejmowac-sie">Why should you care about Core Web Vitals at all?</h2>
              <p>Loading speed is no longer just a nice addition - it has become a requirement. According to a 2017 Google/SOASTA study (mobile data), going from 1 to 3 seconds of load time raises the probability of a bounce by 32% (<a href="https://web.archive.org/web/20251226035614/https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/" target="_blank" rel="noopener noreferrer">Think with Google (archive)</a>).</p>
              <p>Moreover, the Google algorithm rewards websites in organic search results that are lightweight and flawlessly coded. A faster site means a lower crawl budget cost, which favors faster indexing of new content on your blog or offer subpages.</p>

              <h2 id="kluczowe-wskazniki">Key indicators (CWV Metrics) and their optimization</h2>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>LCP (Largest Contentful Paint)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>Render time of the largest visible element on the page. Google requires a score below 2.5 seconds. To achieve this, implement modern media formats (WebP, AVIF), preload critical resources, and deploy server-side rendering.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>CLS (Cumulative Layout Shift)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>Visual stability metric (ideal score is below 0.1). Most often results from asynchronously loading fonts (FOUT) or dynamically loading images and ads. Recipe: always declare fixed width and height attributes for all media.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>INP (Interaction to Next Paint)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>A new standard replacing the outdated FID. It measures interaction delays. Optimizing INP requires breaking up Long Tasks in the main JavaScript thread and reducing unnecessary rendering in React/Next.js.</span>
                  </div>
                </li>
              </ul>

              <h2 id="znaczenie-ttfb">The importance of TTFB and Server-Side Rendering (SSR)</h2>
              <p>Simply reducing image sizes will not help if the server responds too slowly (TTFB). Migrating to more modern architectures (such as Next.js App Router with React Server Components) means that the entire burden of database logic processing is done once on the server and distributed.</p>
              <p>This means minimized, static HTML files instantly ready for Googlebot to download. Remember that ultimate success depends not only on tools but on consistent and systematic website optimization in all key areas. A Core Web Vitals review is one of the steps of our <Link href="/audyt-seo">SEO audit</Link>. For a quick check of the whole site, run the <Link href="/narzedzia/audyt-seo">free SEO audit</Link>.</p>
            </div>
          </Reveal>
        </div>

        <AppleFaq faqData={FAQ_CWV} title="Frequently asked questions" sectionId="pytania-cwv" />

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="article-content">
            <Zrodla zrodla={ZRODLA_CWV_EN} en />
            <BlogCTA 
              locale={locale} 
              currentSlug="/blog/core-web-vitals-a-pozycje-google" 
              customCtaTitlePl="Przyspiesz swoją stronę"
              customCtaTextPl="Przeprowadzimy darmowy audyt techniczny Twojej witryny i wskażemy, jak poprawić wyniki PageSpeed Insights."
              customCtaTitleEn="Speed up your website"
              customCtaTextEn="We will conduct a free technical audit of your website and show you how to improve your PageSpeed Insights scores."
            />
          </div>
        </div>
        </>
      ) : (
        <>

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--w-tusz-2)', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Techniczne SEO & Speed
              </span>
              <span style={{ fontSize: '0.9rem', color: 'var(--w-tusz-2)', fontWeight: 500 }}>
                24 lipca 2026
              </span>
            </div>

            {/* The English branch above has its own <h1>. Only one of the two branches ever
                renders, so this is not a second H1 on the page - do not demote it. */}
              <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: 'var(--w-tusz)', 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'left'
            }}>
              Core Web Vitals a pozycje
            </h1>

            <Byline sciezka={KLUCZ_CWV} takzeEn />

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid var(--w-linia)', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <AnswerBox>
                W 2026 roku dobre wyniki Core Web Vitals oznaczają w 75. percentylu wizyt użytkowników Chrome (CrUX, mobile i desktop): LCP do 2,5 s, INP do 200 ms oraz CLS do 0,1. Raport w Google Search Console opiera się na danych polowych z 28 dni, a nie na pojedynczym teście Lighthouse.
              </AnswerBox>

              <p className="lead">
                Core Web Vitals to metryki doświadczenia na stronie, które według Google są zgodne z tym, co nagradzają jego główne systemy rankingowe. Dobre wyniki pomagają, ale nie gwarantują wyższych pozycji. Przedstawiamy przewodnik: Core Web Vitals a pozycje w Google w 2026 roku.
              </p>

              <ArticleTOC items={tocItems} />

              <h2 id="progi-cwv">Progi Core Web Vitals oraz dane terenowe i laboratoryjne</h2>
              <p>Google ocenia stronę jako dobrą, gdy w 75. percentylu wizyt prawdziwych użytkowników na telefonach (mobile) oraz komputerach (desktop) w raporcie Chrome UX <strong>LCP wynosi &lt;= 2,5 s</strong> (wymaga poprawy do 4,0 s), <strong>INP &lt;= 200 ms</strong> (wynik słaby powyżej 500 ms), a <strong>CLS &lt;= 0,1</strong> (wynik słaby powyżej 0,25) (<a href="https://web.dev/articles/vitals" target="_blank" rel="noopener noreferrer">web.dev: Web Vitals</a>, odczyt 20.11.2026). Aby grupa adresów URL uzyskała status „Dobre”, wszystkie trzy wskaźniki jednocześnie muszą mieścić się w zielonym progu.</p>

              <h2 id="dane-polowe-a-laboratoryjne">Dane polowe (CrUX) a laboratoryjne (Lighthouse)</h2>
              <p>O statusie Core Web Vitals w Google Search Console decydują wyłącznie dane polowe (terenowe, field data) zbierane przez 28 dni z realnych sesji przeglądarki Chrome, osobno dla ruchu mobilnego i desktopowego. Pomiar laboratoryjny (Lighthouse w Chrome DevTools oraz dolna sekcja PageSpeed Insights) działa w symulowanym środowisku na jednym urządzeniu: nie wchodzi do systemów rankingowych Google, lecz służy programistom do diagnozowania przyczyn spowolnień przed wdrożeniem poprawek. Błędy techniczne i mobilną wydajność do 25 podstron sprawdzisz w naszym <Link href="/narzedzia/audyt-seo">darmowym audycie SEO</Link>.</p>
              
              <h2 id="dlaczego-przejmowac-sie">
                Dlaczego w ogóle przejmować się Core Web Vitals?
              </h2>
              <p>
                Szybkość ładowania przestała być tylko miłym dodatkiem - stała się wymogiem. Według badania Google i SOASTA z 2017 roku (dane mobilne) wydłużenie ładowania strony z 1 do 3 sekund zwiększa prawdopodobieństwo odrzucenia o 32% (<a href="https://web.archive.org/web/20251226035614/https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/" target="_blank" rel="noopener noreferrer">Think with Google (archiwum)</a>).
              </p>
              <p>
                Co więcej, algorytm Google premiuje w bezpłatnych wynikach wyszukiwania serwisy, które są lekkie i bezbłędnie zakodowane. Szybsza strona oznacza mniejszy koszt tzw. crawl budget, co sprzyja szybszej indeksacji nowych treści na Twoim blogu czy podstronach ofertowych.
              </p>

              <h2 id="kluczowe-wskazniki">
                Kluczowe wskaźniki (Metryki CWV) i ich optymalizacja
              </h2>
              
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: 'var(--w-tusz)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>LCP (Largest Contentful Paint)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>Czas renderowania największego widocznego elementu na stronie (najczęściej jest to baner z obrazkiem lub duży nagłówek tekstowy). Google wymaga wyniku poniżej 2,5 sekundy. Aby to osiągnąć, wdroż nowoczesne formaty mediów (WebP, AVIF), wstępnie ładuj (preload) krytyczne zasoby i wdróż renderowanie serwerowe.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: 'var(--w-tusz)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>CLS (Cumulative Layout Shift)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>Miernik stabilności wizualnej (wynik idealny to poniżej 0,1). Wynika najczęściej z asynchronicznie ładujących się fontów (FOUT) lub z dynamicznie doczytujących się obrazków i reklam. Recepta: zadeklaruj zawsze stałą szerokość i wysokość atrybutów <code>width</code> i <code>height</code> dla wszystkich mediów oraz zablokuj miejsce pod ładowane z opóźnieniem skrypty (np. chat).</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: 'var(--w-tusz)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: 'var(--w-tusz)', fontWeight: 700, marginBottom: '0.25rem' }}>INP (Interaction to Next Paint)</span>
                    <span style={{ color: 'var(--color-text-main)', lineHeight: 1.5 }}>Nowy standard zastępujący przestarzały FID. Mierzy opóźnienia interakcji - to znaczy czas między np. kliknięciem przycisku rozwinięcia menu, a fizyczną reakcją ekranu. Optymalizacja INP wymaga rozbicia długich zadań (Long Tasks) w głównym wątku JavaScript, zmniejszenia ilości wtyczek i redukcji zbędnego renderowania w React/Next.js.</span>
                  </div>
                </li>
              </ul>

              <h2 id="znaczenie-ttfb">
                Znaczenie TTFB i renderowania serwerowego (SSR)
              </h2>
              <p>
                Samo zmniejszanie rozmiaru obrazków nie pomoże, jeśli serwer odpowiada zbyt wolno (wskaźnik TTFB - Time to First Byte). Migracja na nowocześniejsze architektury (takie jak Jamstack, Next.js App Router z React Server Components) sprawia, że cały ciężar przetwarzania logiki bazy danych wykonywany jest raz na serwerze i dystrybuowany na węzły sieci CDN na całym świecie.
              </p>
              <p>
                Oznacza to zminimalizowane, statyczne pliki HTML natychmiast gotowe dla Googlebota do pobrania, co ułatwia osiągnięcie wysokiego wyniku w PageSpeed Insights, ale wynik zależy też od obrazów, skryptów zewnętrznych i układu strony. Pamiętaj, że ostateczny sukces zależy nie tylko od narzędzi, ale od konsekwentnej i systematycznej optymalizacji witryny we wszystkich kluczowych obszarach. Analiza Core Web Vitals to jeden z etapów naszego <Link href="/audyt-seo">audytu SEO</Link>. Szybką kontrolę całej witryny zrobisz w <Link href="/narzedzia/audyt-seo">darmowym audycie SEO</Link>. Regularnie monitoruj i udoskonalaj architekturę, co w dłuższej perspektywie przyniesie Ci wymierne rezultaty, lepsze pozycje i znacznie więcej klientów organicznych w skali każdego miesiąca.
              </p>
            </div>
          </Reveal>
        </div>

        <AppleFaq faqData={FAQ_CWV} title="Najczęstsze pytania" sectionId="pytania-cwv" />

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <div className="article-content">
            <Zrodla zrodla={ZRODLA_CWV_PL} />
            <BlogCTA 
              locale={locale} 
              currentSlug="/blog/core-web-vitals-a-pozycje-google" 
              customCtaTitlePl="Przyspiesz swoją stronę"
              customCtaTextPl="Przeprowadzimy darmowy audyt techniczny Twojej witryny i wskażemy, jak poprawić wyniki PageSpeed Insights."
              customCtaTitleEn="Speed up your website"
              customCtaTextEn="We will conduct a free technical audit of your website and show you how to improve your PageSpeed Insights scores."
            />
          </div>
        </div>
      
        </>
      )}
    </article>

      <Contact />
      <Footer />
    </main>
  );
}
