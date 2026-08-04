export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Core Web Vitals vs Google Rankings | SEO Guide' : 'Core Web Vitals a Pozycje w Google | Przewodnik SEO',
  description: locale === 'en' ? 'Learn how Core Web Vitals (LCP, FID, CLS) impact your Google rankings. A practical optimization guide.' : 'Dowiedz się jak Core Web Vitals (LCP, FID, CLS) wpływają na pozycje Twojej strony w wyszukiwarce Google. Praktyczny przewodnik optymalizacji.',
  alternates: {
    canonical: locale === 'en' ? `https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings` : `https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google`,
    languages: {
      'pl': `https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google`,
      'x-default': `https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google`,
      'en': `https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings`
    }
  },
};
}

import Header from '@/components/Header';
import ArticleSchema from '@/components/ArticleSchema';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import ArticleTOC from '@/components/ArticleTOC';
import BlogCTA from '@/components/BlogCTA';

export default async function ArticleCwvPage({ params }) {
  const { locale } = await params;
  const tocItems = [
    { id: 'dlaczego-przejmowac-sie', title: 'Dlaczego w ogóle przejmować się Core Web Vitals?' },
    { id: 'kluczowe-wskazniki', title: 'Kluczowe wskaźniki (Metryki CWV) i ich optymalizacja' },
    { id: 'znaczenie-ttfb', title: 'Znaczenie TTFB i renderowania serwerowego (SSR)' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema slug="/blog/core-web-vitals-a-pozycje-google" locale={locale} />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      {locale === 'en' ? (

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Technical SEO & Speed
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                Jul 24, 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              Core Web Vitals and Rankings
            </h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                Core Web Vitals is an official Google ranking factor. Websites that load instantly and are free of annoying layout shifts achieve higher positions and significantly higher dwell time. Here is our guide: Core Web Vitals and Google rankings in 2026.
              </p>
              <ArticleTOC items={tocItems} />
              
              <h2 id="dlaczego-przejmowac-sie">Why should you care about Core Web Vitals at all?</h2>
              <p>Loading speed is no longer just a nice addition - it has become a requirement. According to official Google data, a delay in page load of just 1 to 3 seconds increases the probability of a user abandoning it by over 32%.</p>
              <p>Moreover, the Google algorithm rewards websites in organic search results that are lightweight and flawlessly coded. A faster site means a lower crawl budget cost, which favors faster indexing of new content on your blog or offer subpages.</p>

              <h2 id="kluczowe-wskazniki">Key indicators (CWV Metrics) and their optimization</h2>
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>LCP (Largest Contentful Paint)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>Render time of the largest visible element on the page. Google requires a score below 2.5 seconds. To achieve this, implement modern media formats (WebP, AVIF), preload critical resources, and deploy server-side rendering.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>CLS (Cumulative Layout Shift)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>Visual stability metric (ideal score is below 0.1). Most often results from asynchronously loading fonts (FOUT) or dynamically loading images and ads. Recipe: always declare fixed width and height attributes for all media.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>INP (Interaction to Next Paint)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>A new standard replacing the outdated FID. It measures interaction delays. Optimizing INP requires breaking up Long Tasks in the main JavaScript thread and reducing unnecessary rendering in React/Next.js.</span>
                  </div>
                </li>
              </ul>

              <h2 id="znaczenie-ttfb">The importance of TTFB and Server-Side Rendering (SSR)</h2>
              <p>Simply reducing image sizes will not help if the server responds too slowly (TTFB). Migrating to more modern architectures (such as Next.js App Router with React Server Components) means that the entire burden of database logic processing is done once on the server and distributed.</p>
              <p>This means minimized, static HTML files instantly ready for Googlebot to download. Remember that ultimate success depends not only on tools but on consistent and systematic website optimization in all key areas.</p>

              <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
                <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
                  <h3>Speed up your website</h3>
                  <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>We will conduct a free technical audit of your website and show you how to improve your PageSpeed Insights scores.</p>
                  <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>Consult Your Project</a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
    
      ) : (
        <>

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Techniczne SEO & Speed
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                Jul 24, 2026
              </span>
            </div>

            <h2 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '2rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'left'
            }}>
              Core Web Vitals a pozycje
            </h2>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                Core Web Vitals to oficjalny czynnik rankingowy Google. Witryny, które ładują się natychmiastowo i pozbawione są irytujących przesunięć elementów, osiągają wyższe pozycje oraz znacznie wyższy czas przebywania na stronie. Przedstawiamy przewodnik: Core Web Vitals a pozycje w Google w 2026 roku.
              </p>

              <ArticleTOC items={tocItems} />
              
              <h2 id="dlaczego-przejmowac-sie">
                Dlaczego w ogóle przejmować się Core Web Vitals?
              </h2>
              <p>
                Szybkość ładowania przestała być tylko miłym dodatkiem – stała się wymogiem. Według oficjalnych danych Google, opóźnienie w załadowaniu strony zaledwie o 1 do 3 sekund zwiększa prawdopodobieństwo porzucenia jej przez użytkownika o ponad 32%.
              </p>
              <p>
                Co więcej, algorytm Google premiuje w bezpłatnych wynikach wyszukiwania serwisy, które są lekkie i bezbłędnie zakodowane. Szybsza strona oznacza mniejszy koszt tzw. crawl budget, co sprzyja szybszej indeksacji nowych treści na Twoim blogu czy podstronach ofertowych.
              </p>

              <h2 id="kluczowe-wskazniki">
                Kluczowe wskaźniki (Metryki CWV) i ich optymalizacja
              </h2>
              
              <ul style={{ listStyle: 'none' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>LCP (Largest Contentful Paint)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>Czas renderowania największego widocznego elementu na stronie (najczęściej jest to baner z obrazkiem lub duży nagłówek tekstowy). Google wymaga wyniku poniżej 2,5 sekundy. Aby to osiągnąć, wdroż nowoczesne formaty mediów (WebP, AVIF), wstępnie ładuj (preload) krytyczne zasoby i wdróż renderowanie serwerowe.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>CLS (Cumulative Layout Shift)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>Miernik stabilności wizualnej (wynik idealny to poniżej 0,1). Wynika najczęściej z asynchronicznie ładujących się fontów (FOUT) lub z dynamicznie doczytujących się obrazków i reklam. Recepta: zadeklaruj zawsze stałą szerokość i wysokość atrybutów <code>width</code> i <code>height</code> dla wszystkich mediów oraz zablokuj miejsce pod ładowane z opóźnieniem skrypty (np. chat).</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>INP (Interaction to Next Paint)</span>
                    <span style={{ color: '#333336', lineHeight: 1.5 }}>Nowy standard zastępujący przestarzały FID. Mierzy opóźnienia interakcji – to znaczy czas między np. kliknięciem przycisku rozwinięcia menu, a fizyczną reakcją ekranu. Optymalizacja INP wymaga rozbicia długich zadań (Long Tasks) w głównym wątku JavaScript, zmniejszenia ilości wtyczek i redukcji zbędnego renderowania w React/Next.js.</span>
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
                Oznacza to zminimalizowane, statyczne pliki HTML natychmiast gotowe dla Googlebota do pobrania, co praktycznie gwarantuje zdobycie 100 punktów w teście PageSpeed Insights i deklasuje ociężałe monolityczne CMSy oparte o wtyczki. Pamiętaj, że ostateczny sukces zależy nie tylko od narzędzi, ale od konsekwentnej i systematycznej optymalizacji witryny we wszystkich kluczowych obszarach. Regularnie monitoruj i udoskonalaj architekturę, co w dłuższej perspektywie przyniesie Ci wymierne rezultaty, lepsze pozycje i znacznie więcej klientów organicznych w skali każdego miesiąca.
              </p>

              <BlogCTA 
                locale={locale} 
                currentSlug="/blog/core-web-vitals-a-pozycje-google" 
                customCtaTitlePl="Przyspiesz swoją stronę"
                customCtaTextPl="Przeprowadzimy darmowy audyt techniczny Twojej witryny i wskażemy, jak poprawić wyniki PageSpeed Insights."
              />
            </div>
          </Reveal>
        </div>
      
        </>
      )}
    </article>

      <div id="kontakt">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
