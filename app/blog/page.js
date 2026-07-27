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
    <main style={{ background: '#F8FAFC', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Blog Apple Light Hero */}
      <section style={{ paddingTop: '170px', paddingBottom: '80px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.08) 0%, rgba(99, 102, 241, 0.06) 50%, rgba(248, 250, 252, 0) 100%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '100px', 
              background: '#FFFFFF', 
              border: '1px solid rgba(216, 90, 48, 0.25)', 
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.08)', 
              color: '#D85A30', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              marginBottom: '1.5rem' 
            }}>
              <span className="asterisk">✳</span> WIEDZA, TRENDY & INSIGHTY SEO
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#0F172A', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Blog <span style={{ 
                background: 'linear-gradient(135deg, #D85A30 0%, #7C3AED 50%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>AI SEO COMPANY</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '750px', lineHeight: 1.65, marginBottom: '3.5rem' }}>
              Ekspercka wiedza z zakresu pozycjonowania stron internetowych, optymalizacji pod kątem wyszukiwarek AI oraz architektury informacji.
            </p>
          </Reveal>

          {/* Apple Light Mode Cards */}
          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.map((art) => (
              <RevealItem key={art.slug} style={{ display: 'flex' }}>
                <motion.article 
                  whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.08)' }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '28px',
                    border: '1px solid #E2E8F0',
                    padding: '2.5rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.03)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#D85A30', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                      {art.category}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: 500 }}>
                      {art.readTime}
                    </span>
                  </div>
                  
                  <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0F172A', marginBottom: '1rem', lineHeight: 1.3, letterSpacing: '-0.02em' }}>
                    <a href={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                      {art.title}
                    </a>
                  </h2>

                  <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.65, marginBottom: '2rem', flexGrow: 1 }}>
                    {art.excerpt}
                  </p>

                  <div style={{ paddingTop: '1.25rem', borderTop: '1px solid #F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.85rem', color: '#64748B' }}>{art.date}</span>
                    <a href={`/blog/${art.slug}`} style={{ color: '#D85A30', fontWeight: 700, fontSize: '0.95rem', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
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
