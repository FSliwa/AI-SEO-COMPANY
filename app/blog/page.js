'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

const articles = [
  {
    slug: 'ile-kosztuje-pozycjonowanie-2026',
    title: 'Ile kosztuje pozycjonowanie stron internetowych w 2026 roku?',
    excerpt: 'Przegląd modeli rozliczeń SEO, budżetów linkowych oraz analizy wycen rynkowych w Polsce. Dowiedz się, od czego zależy cena pozycjonowania.',
    category: 'Cennik & Budżet',
    readTime: '4 min czytania',
    date: '2026-07-20'
  },
  {
    slug: 'core-web-vitals-a-pozycje-google',
    title: 'Core Web Vitals a pozycje w Google — Jak szybkość wpływa na SEO?',
    excerpt: 'LCP, CLS oraz INP. Poznaj oficjalny wpływ wskaźników jakości strony na algorytmy Google i konwersję w e-commerce.',
    category: 'Techniczne SEO',
    readTime: '5 min czytania',
    date: '2026-07-15'
  },
  {
    slug: 'seo-lokalne-dla-firm-w-warszawie',
    title: 'SEO Lokalne dla firm w Warszawie — Jak zdominować wyniki i Mapy Google?',
    excerpt: 'Praktyczne strategie optymalizacji Google Profil Firmy oraz pozycjonowania lokalnych fraz usługowych w stolicy.',
    category: 'Lokalne SEO',
    readTime: '6 min czytania',
    date: '2026-07-10'
  }
];

export default function BlogHubPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Blog Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '3rem', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> WIEDZA, TRENDY &amp; INSIGHTY SEO
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              Blog <span style={{ color: 'var(--color-cta)' }}>AI SEO COMPANY</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
              Ekspercka wiedza z zakresu pozycjonowania stron internetowych, optymalizacji pod kątem wyszukiwarek AI oraz architektury informacji.
            </p>
          </Reveal>

          {/* Article Cards Grid matching main site card design */}
          <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.map((art) => (
              <RevealItem key={art.slug} style={{ display: 'flex' }}>
                <motion.article 
                  whileHover={{ y: -6, borderColor: 'var(--color-primary)' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'var(--color-card-bg)',
                    borderRadius: 'var(--radius-lg)',
                    border: '1px solid var(--color-border)',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: 'var(--color-primary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', fontWeight: 500 }}>
                      {art.readTime}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                    <a href={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {art.title}
                    </a>
                  </h2>

                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.95rem', lineHeight: 1.65, marginBottom: '2rem', flexGrow: 1 }}>
                    {art.excerpt}
                  </p>

                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)' }}>{art.date}</span>
                    <a href={`/blog/${art.slug}`} style={{ color: 'var(--color-cta)', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      Czytaj wpis <span>→</span>
                    </a>
                  </div>
                </motion.article>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
