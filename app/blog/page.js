'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const articles = [
  {
    slug: 'ile-kosztuje-pozycjonowanie-2026',
    title: 'Ile kosztuje pozycjonowanie stron internetowych w 2026 roku?',
    excerpt: 'Przegląd modeli rozliczeń SEO, budżetów linkowych oraz analizy wycen rynkowych w Polsce. Dowiedz się, od czego zależy cena pozycjonowania.',
    category: 'Cennik & Budżet',
    readTime: '4 min czytania',
    date: '24 Lipca 2026',
    side: 'left'
  },
  {
    slug: 'core-web-vitals-a-pozycje-google',
    title: 'Core Web Vitals a pozycje w Google — Jak szybkość wpływa na SEO?',
    excerpt: 'LCP, CLS oraz INP. Poznaj oficjalny wpływ wskaźników jakości strony na algorytmy Google i konwersję w e-commerce.',
    category: 'Techniczne SEO',
    readTime: '5 min czytania',
    date: '23 Lipca 2026',
    side: 'right'
  },
  {
    slug: 'seo-lokalne-dla-firm-w-warszawie',
    title: 'SEO Lokalne dla firm w Warszawie — Jak zdominować wyniki i Mapy Google?',
    excerpt: 'Praktyczne strategie optymalizacji Google Profil Firmy oraz pozycjonowania lokalnych fraz usługowych w stolicy.',
    category: 'Lokalne SEO',
    readTime: '6 min czytania',
    date: '22 Lipca 2026',
    side: 'left'
  }
];

export default function BlogHubPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Blog Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '40px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '2rem', maxWidth: '850px' }}>
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
        </div>
      </section>

      {/* VIS Vertical Timeline Blog Layout matching main page */}
      <section className="blog" style={{ paddingTop: 0, paddingBottom: '100px' }}>
        <div className="container">
          <RevealStagger className="blog-timeline-container" delay={0.2}>
            <div className="blog-timeline-line"></div>

            {articles.map((post, idx) => (
              <RevealItem key={idx} className={`blog-timeline-item ${post.side}`}>
                <div className="blog-timeline-node">
                  <span className="blog-timeline-date">{post.date}</span>
                </div>
                <div className="blog-timeline-card">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {post.category}
                    </span>
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                      {post.readTime}
                    </span>
                  </div>
                  <h3>{post.title}</h3>
                  <p style={{ color: 'var(--color-text-muted)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>{post.excerpt}</p>
                  <a href={`/blog/${post.slug}`} className="blog-timeline-link" style={{ color: 'var(--color-cta)', fontWeight: 700 }}>
                    Czytaj wpis →
                  </a>
                </div>
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
