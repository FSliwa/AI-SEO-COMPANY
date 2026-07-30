export const metadata = {
  title: 'Core Web Vitals a Pozycje w Google | Przewodnik SEO',
  description: 'Dowiedz się jak Core Web Vitals (LCP, FID, CLS) wpływają na pozycje Twojej strony w wyszukiwarce Google. Praktyczny przewodnik optymalizacji.',
  alternates: {
    canonical: '/blog/core-web-vitals-a-pozycje-google',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleCwvPage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
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

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '2rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'left'
            }}>
              Core Web Vitals a pozycje.
            </h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ fontSize: '1.15rem', lineHeight: 1.6, color: '#333336' }}>
              <p style={{ fontSize: '1.4rem', color: '#1D1D1F', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Core Web Vitals to oficjalny czynnik rankingowy Google. Witryny, które ładują się natychmiastowo i pozbawione są irytujących przesunięć elementów, osiągają znacznie wyższy czas przebywania na stronie. Przedstawiamy praktyczny przewodnik, jak optymalizować swoją stronę pod parametry prędkości w 2026 roku.
              </p>
              
              <h2 style={{ fontSize: '1.5rem', color: '#1D1D1F', marginTop: '2.5rem', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Dlaczego w ogóle przejmować się Core Web Vitals?
              </h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Szybkość ładowania przestała być tylko miłym dodatkiem – stała się wymogiem. Według oficjalnych danych Google, opóźnienie w załadowaniu strony zaledwie o 1 do 3 sekund zwiększa prawdopodobieństwo porzucenia jej przez użytkownika o ponad 32%.
              </p>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Co więcej, algorytm Google premiuje w bezpłatnych wynikach wyszukiwania serwisy, które są lekkie i bezbłędnie zakodowane. Szybsza strona oznacza mniejszy koszt tzw. crawl budget, co sprzyja szybszej indeksacji nowych treści na Twoim blogu czy podstronach ofertowych.
              </p>

              <h2 style={{ fontSize: '1.5rem', color: '#1D1D1F', marginTop: '3.5rem', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Kluczowe wskaźniki (Metryki CWV) i ich optymalizacja
              </h2>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '2rem 0', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>LCP (Largest Contentful Paint)</span>
                    <span style={{ color: '#515154', lineHeight: 1.5 }}>Czas renderowania największego widocznego elementu na stronie (najczęściej jest to baner z obrazkiem lub duży nagłówek tekstowy). Google wymaga wyniku poniżej 2,5 sekundy. Aby to osiągnąć, wdroż nowoczesne formaty mediów (WebP, AVIF), wstępnie ładuj (preload) krytyczne zasoby i wdróż renderowanie serwerowe.</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>CLS (Cumulative Layout Shift)</span>
                    <span style={{ color: '#515154', lineHeight: 1.5 }}>Miernik stabilności wizualnej (wynik idealny to poniżej 0,1). Wynika najczęściej z asynchronicznie ładujących się fontów (FOUT) lub z dynamicznie doczytujących się obrazków i reklam. Recepta: zadeklaruj zawsze stałą szerokość i wysokość atrybutów <code>width</code> i <code>height</code> dla wszystkich mediów oraz zablokuj miejsce pod ładowane z opóźnieniem skrypty (np. chat).</span>
                  </div>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 700, marginBottom: '0.25rem' }}>INP (Interaction to Next Paint)</span>
                    <span style={{ color: '#515154', lineHeight: 1.5 }}>Nowy standard zastępujący przestarzały FID. Mierzy opóźnienia interakcji – to znaczy czas między np. kliknięciem przycisku rozwinięcia menu, a fizyczną reakcją ekranu. Optymalizacja INP wymaga rozbicia długich zadań (Long Tasks) w głównym wątku JavaScript, zmniejszenia ilości wtyczek i redukcji zbędnego renderowania w React/Next.js.</span>
                  </div>
                </li>
              </ul>

              <h2 style={{ fontSize: '1.5rem', color: '#1D1D1F', marginTop: '3.5rem', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Znaczenie TTFB i renderowania serwerowego (SSR)
              </h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Samo zmniejszanie rozmiaru obrazków nie pomoże, jeśli serwer odpowiada zbyt wolno (wskaźnik TTFB - Time to First Byte). Migracja na nowocześniejsze architektury (takie jak Jamstack, Next.js App Router z React Server Components) sprawia, że cały ciężar przetwarzania logiki bazy danych wykonywany jest raz na serwerze i dystrybuowany na węzły sieci CDN na całym świecie.
              </p>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Oznacza to zminimalizowane, statyczne pliki HTML natychmiast gotowe dla Googlebota do pobrania, co praktycznie gwarantuje zdobycie 100 punktów w teście PageSpeed Insights i deklasuje ociężałe monolityczne CMSy oparte o wtyczki.
              </p>

              <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
                <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
                  <h3 style={{ color: '#1D1D1F', margin: 0, marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    Przyspiesz swoją stronę
                  </h3>
                  <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Przeprowadzimy darmowy audyt techniczny Twojej witryny i wskażemy, jak poprawić wyniki PageSpeed Insights.
                  </p>
                  <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                    Skonsultuj Projekt
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <div id="kontakt">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
