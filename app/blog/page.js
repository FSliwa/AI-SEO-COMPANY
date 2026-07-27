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
    excerpt: 'Praktyczne strategie optymalizacji Google Profil Firmy oraz pozycjonowania lokalnych fraz usłuogwych w stolicy.',
    category: 'Lokalne SEO',
    readTime: '6 min czytania',
    date: '2026-07-10'
  }
];

export default function BlogHubPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Blog Hero Banner with Apple Ambient Glow */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, rgba(216, 90, 48, 0.12) 50%, rgba(3, 7, 18, 0) 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1.25rem' }}>
              <span className="asterisk">✳</span> WIEDZA, TRENDY & INSIGHTY SEO
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#FFFFFF', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Blog <span style={{ 
                background: 'linear-gradient(135deg, #FF7A59 0%, #D85A30 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>AI SEO COMPANY</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '750px', lineHeight: 1.65, marginBottom: '3rem' }}>
              Ekspercka wiedza z zakresu pozycjonowania stron internetowych, optymalizacji pod kątem wyszukiwarek AI oraz architektury informacji.
            </p>
          </Reveal>

          {/* Article Cards Grid */}
          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.map((art) => (
              <RevealItem key={art.slug} style={{ display: 'flex' }}>
                <article style={{
                  background: 'rgba(15, 23, 42, 0.65)',
                  backdropFilter: 'blur(16px)',
                  borderRadius: '24px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  padding: '2.25rem 2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
                }} className="blog-card-hover">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#D85A30', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B' }}>
                      {art.readTime}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.35, letterSpacing: '-0.01em' }}>
                    <a href={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {art.title}
                    </a>
                  </h2>

                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '2rem', flexGrow: 1 }}>
                    {art.excerpt}
                  </p>

                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{art.date}</span>
                    <a href={`/blog/${art.slug}`} style={{ color: '#D85A30', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                      Czytaj wpis <span style={{ transition: 'transform 0.2s ease' }}>→</span>
                    </a>
                  </div>
                </article>
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
