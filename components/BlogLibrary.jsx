'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import Link from 'next/link';

export default function BlogLibrary() {
  const { lang } = useLanguage();

  // Sort all posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  const getPostData = (p) => ({
    date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
    tag: lang === 'pl' ? p.tagPl : p.tagEn,
    title: lang === 'pl' ? p.titlePl : p.titleEn,
    slug: p.slug,
    image: p.image,
  });

  return (
    <section className="blog-grid" style={{ padding: '8rem 0 4rem 0', backgroundColor: 'var(--color-bg-surface)' }}>
      <div className="container" style={{ margin: '0 auto' }}>
        <Reveal>
          <div style={{ marginBottom: '4rem', textAlign: 'center' }}>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              letterSpacing: '-0.04em',
              marginBottom: '1rem'
            }}>
              {lang === 'pl' ? 'Biblioteka Artykułów' : 'Articles Library'}
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Wszystkie publikacje naszego zespołu w jednym miejscu.' : 'All publications from our team in one place.'}
            </p>
          </div>
        </Reveal>

        <RevealStagger style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {sortedPosts.map((post, idx) => {
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
          <Link href="/blog" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'rgba(0,0,0,0.05)', 
            color: '#1D1D1F', 
            padding: '1.2rem 2.5rem', 
            borderRadius: '999px', 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            textDecoration: 'none', 
            transition: 'all 0.3s ease' 
          }}>
            {lang === 'pl' ? 'Wróć na stronę główną bloga' : 'Back to main blog page'}
          </Link>
        </RevealItem>
      </div>
    </section>
  );
}
