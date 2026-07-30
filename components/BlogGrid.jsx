'use client';

import { useTranslations, useLocale } from 'next-intl';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import Link from 'next/link';

export default function BlogGrid() {
  const lang = useLocale();

  // Sort all posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Display only 4 posts (1 hero + 3 grid) on the main blog page
  const displayPosts = sortedPosts.slice(0, 4);

  // The newest post is the hero
  const heroPost = displayPosts[0];
  // The rest are standard grid items
  const gridPosts = displayPosts.slice(1);

  const getPostData = (p) => ({
    date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
    tag: lang === 'pl' ? p.tagPl : p.tagEn,
    title: lang === 'pl' ? p.titlePl : p.titleEn,
    slug: p.slug,
    image: p.image,
    heroImage: p.heroImage || p.image,
  });

  if (!heroPost) return null;
  const heroData = getPostData(heroPost);

  return (
    <section className="blog-grid" style={{ padding: '4rem 0', backgroundColor: '#F5F5F7' }}>
      <div className="container" style={{ margin: '0 auto' }}>
        <Reveal>
          <h1 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: 'var(--color-text-main)', 
            marginBottom: '0.5rem', textAlign: 'left' 
          }}>
            {lang === 'pl' ? 'Najnowsze Artykuły o SEO i Web Designie' : 'Latest Articles on SEO and Web Design'}
          </h1>
          <p style={{
            fontSize: '1.1rem',
            color: '#6E6E73',
            marginBottom: '2rem',
            maxWidth: '800px',
            textAlign: 'left'
          }}>
            {lang === 'pl' 
              ? 'Nasz Blog to praktyczny Poradnik SEO i Web Design, stworzony przez ekspertów AI SEO COMPANY. Przeczytaj nasze najnowsze artykuły z dziedziny pozycjonowania i optymalizacji.'
              : 'Our Blog is a practical SEO and Web Design Guide, created by AI SEO COMPANY experts. Read our latest articles on optimization.'}
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <Link href={heroData.slug} style={{ textDecoration: 'none' }}>
            <div className="hero-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px', 
              overflow: 'hidden',
              marginBottom: '2rem', textAlign: 'left',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              {/* Desktop: side-by-side, Mobile: stack */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', width: '100%' }}>
                
                <div style={{ 
                  height: '100%', 
                  minHeight: '350px',
                  backgroundImage: `url(${heroData.heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                
                <div style={{ 
                  padding: 'clamp(2rem, 5vw, 4rem)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: '#86868B', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>
                    {heroData.tag}
                  </span>
                  <h3 style={{ 
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                    fontWeight: 700, 
                    color: '#1D1D1F', 
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {heroData.title}
                  </h3>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#86868B',
                    fontWeight: 500
                  }}>
                    {heroData.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        <RevealStagger style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {gridPosts.map((post, idx) => {
            const data = getPostData(post);
            return (
              <RevealItem key={idx}>
                <Link href={data.slug} style={{ textDecoration: 'none' }}>
                  <div className="grid-card" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '24px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      height: '240px', 
                      backgroundImage: `url(${data.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 600, 
                        color: '#86868B', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '1rem'
                      }}>
                        {data.tag}
                      </span>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        color: '#1D1D1F', 
                        lineHeight: 1.3,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.01em',
                        flexGrow: 1
                      }}>
                        {data.title}
                      </h3>
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#86868B',
                        fontWeight: 500
                      }}>
                        {data.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
        
        <RevealItem style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href={`/${lang}/blog/biblioteka`} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#1D1D1F', 
            color: '#FFFFFF', 
            padding: '1.2rem 2.5rem', 
            borderRadius: '999px', 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            textDecoration: 'none', 
            transition: 'all 0.3s ease' 
          }}>
            {lang === 'pl' ? 'Pełna biblioteka artykułów' : 'Full article library'}
          </Link>
        </RevealItem>
      </div>

      <style jsx>{`
        .hero-card:hover, .grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    </section>
  );
}
