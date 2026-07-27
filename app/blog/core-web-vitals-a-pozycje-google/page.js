'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleCwvPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <Reveal>
            <a href="/blog" style={{ color: 'var(--color-cta)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              ← Powrót do Bloga
            </a>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)', padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', fontSize: '0.8rem', fontWeight: 800, textTransform: 'uppercase' }}>
                TECHNICZNE SEO &amp; SPEED
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>5 min czytania • 15 Lipca 2026</span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', 
              fontWeight: 800, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.75rem', 
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}>
              Core Web Vitals a pozycje w Google — Jak szybkość wpływa na SEO?
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '3rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.25rem' }}>
              Core Web Vitals to oficjalny czynnik rankingowy Google. Witryny, które ładują się natychmiastowo i pozbawione są przesunięć elementów, osiągają wyższy czas przebywania na stronie oraz lepsze pozycje w wyszukiwarce.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{
              background: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '3rem 2.5rem',
              color: 'var(--color-text-main)',
              lineHeight: 1.8,
              fontSize: '1.05rem',
              boxShadow: 'var(--shadow-md)'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-text-dark)', marginTop: '0', marginBottom: '1.25rem', fontWeight: 800 }}>
                Kluczowe wskaźniki jakości strony (UX)
              </h2>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li style={{ marginBottom: '0.75rem' }}><strong>LCP (Largest Contentful Paint)</strong>: Czas renderowania głównego elementu wizualnego na ekranie. Uznaje się, że powinien wynosić poniżej 2,5 sekundy.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>CLS (Cumulative Layout Shift)</strong>: Miernik stabilności wizualnej serwisu. Wartość powinna wynosić poniżej 0,1.</li>
                <li style={{ marginBottom: '0.75rem' }}><strong>INP (Interaction to Next Paint)</strong>: Pomiary opóźnienia interakcji użytkownika z interfejsem.</li>
              </ul>

              <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', padding: '2.25rem', borderRadius: 'var(--radius-md)', margin: '2.5rem 0' }}>
                <h3 style={{ color: 'var(--color-text-dark)', margin: 0, marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 800 }}>
                  Chcesz przetestować szybkość swojej strony?
                </h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.25rem' }}>
                  Zamów bezpłatny lub zaawansowany audyt SEO i poznaj dokładny wynik techniczny Core Web Vitals.
                </p>
                <a href="/audyt-seo" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
                  Zamów Audyt SEO →
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
