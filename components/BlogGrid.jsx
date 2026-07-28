'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import Link from 'next/link';

export default function BlogGrid() {
  const { lang } = useLanguage();

  // Sort all posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // The newest post is the hero
  const heroPost = sortedPosts[0];
  // The rest are standard grid items
  const gridPosts = sortedPosts.slice(1);

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
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 700, 
            color: '#1D1D1F', 
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            {lang === 'pl' ? 'Najnowsze Artykuły' : 'Latest News'}
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Link href={heroData.slug} style={{ textDecoration: 'none' }}>
            <div className="hero-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px', 
              overflow: 'hidden',
              marginBottom: '2rem',
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

        <RevealStagger delay={0.2} style={{ 
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
                    backgroundColor: '#FFFFFF',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                  }}>
                    <div style={{ 
                      width: '100%', 
                      height: '240px',
                      backgroundImage: `url(${data.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    
                    <div style={{ padding: '2rem', flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <span style={{ 
                        fontSize: '0.75rem', 
                        fontWeight: 600, 
                        color: '#86868B', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '0.75rem'
                      }}>
                        {data.tag}
                      </span>
                      <h4 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        color: '#1D1D1F', 
                        lineHeight: 1.3,
                        marginBottom: '1.5rem',
                        flexGrow: 1
                      }}>
                        {data.title}
                      </h4>
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
