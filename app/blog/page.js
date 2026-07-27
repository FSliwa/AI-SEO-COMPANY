'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const articles = [
  {
    slug: 'ile-kosztuje-pozycjonowanie-2026',
    title: 'Ile kosztuje pozycjonowanie stron w 2026 roku?',
    excerpt: 'Przegląd modeli rozliczeń SEO, budżetów linkowych oraz analizy wycen rynkowych w Polsce. Dowiedz się, od czego zależy cena pozycjonowania.',
    category: 'Cennik & Budżet',
    readTime: '4 min'
  },
  {
    slug: 'core-web-vitals-a-pozycje-google',
    title: 'Core Web Vitals a pozycje w Google.',
    excerpt: 'LCP, CLS oraz INP. Poznaj oficjalny wpływ wskaźników jakości strony na algorytmy Google i konwersję w e-commerce.',
    category: 'Techniczne SEO',
    readTime: '5 min'
  },
  {
    slug: 'seo-lokalne-dla-firm-w-warszawie',
    title: 'SEO Lokalne dla firm w Warszawie.',
    excerpt: 'Praktyczne strategie optymalizacji Google Profil Firmy oraz pozycjonowania lokalnych fraz usługowych w stolicy.',
    category: 'Lokalne SEO',
    readTime: '6 min'
  }
];

export default function BlogHubPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Section - Apple Style */}
      <section style={{ paddingTop: '200px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.04em'
            }}>
              Wiedza i inspiracje.<br />
              Trends &amp; Insights.
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#86868B', 
              lineHeight: 1.5, 
              maxWidth: '600px', 
              margin: '0 auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Przeczytaj najnowsze wpisy eksperckie i wyprzedź konkurencję.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Articles Grid - Ultra Minimalist Apple Style */}
      <section style={{ paddingBottom: '160px' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {articles.map((post, idx) => (
              <RevealItem key={idx}>
                <a href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ 
                    background: '#FFFFFF', 
                    borderRadius: '32px', 
                    padding: '4rem', 
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                    e.currentTarget.style.boxShadow = '0 20px 60px rgba(0,0,0,0.06)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                    e.currentTarget.style.boxShadow = '0 10px 40px rgba(0,0,0,0.03)';
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                      <span style={{ fontSize: '0.85rem', color: '#1D1D1F', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                        {post.category}
                      </span>
                      <span style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 500 }}>
                        {post.readTime}
                      </span>
                    </div>
                    <h3 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1rem' }}>
                      {post.title}
                    </h3>
                    <p style={{ color: '#86868B', fontSize: '1.2rem', lineHeight: 1.5, maxWidth: '700px' }}>
                      {post.excerpt}
                    </p>
                  </div>
                </a>
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
