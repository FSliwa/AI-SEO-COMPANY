'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleCwvPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '200px', paddingBottom: '160px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '2rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Techniczne SEO &amp; Speed
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '2rem', 
              lineHeight: 1.05,
              letterSpacing: '-0.04em'
            }}>
              Core Web Vitals a pozycje.
            </h1>

            <p style={{ fontSize: '1.4rem', color: '#86868B', lineHeight: 1.5, marginBottom: '4rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
              Core Web Vitals to oficjalny czynnik rankingowy Google. Witryny, które ładują się natychmiastowo i pozbawione są przesunięć elementów, osiągają wyższy czas przebywania na stronie.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '4rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '2rem', color: '#1D1D1F', marginTop: '0', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Kluczowe wskaźniki jakości strony.
              </h2>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}><strong>LCP (Largest Contentful Paint)</strong>: Czas renderowania elementu (poniżej 2,5s).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}><strong>CLS (Cumulative Layout Shift)</strong>: Miernik stabilności wizualnej (poniżej 0,1).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}><strong>INP (Interaction to Next Paint)</strong>: Pomiary opóźnienia interakcji użytkownika.</span>
                </li>
              </ul>

              <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', marginTop: '4rem', textAlign: 'center' }}>
                <h3 style={{ color: '#1D1D1F', margin: 0, marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                  Przetestuj szybkość
                </h3>
                <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
                  Zamów bezpłatny audyt SEO i poznaj dokładny wynik Core Web Vitals.
                </p>
                <a href="/audyt-seo" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                  Zamów Audyt
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
