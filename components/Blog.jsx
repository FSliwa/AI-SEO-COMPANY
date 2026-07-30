'use client';

import { useTranslations, useLocale } from 'next-intl';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Blog() {
  const lang = useLocale();
  const t = useTranslations('blog');

  // Dynamic sorting algorithm: always top 3 latest posts
  const posts = [...blogPosts]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map((p, idx) => ({
      date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
      tag: lang === 'pl' ? p.tagPl : p.tagEn,
      title: lang === 'pl' ? p.titlePl : p.titleEn,
      desc: lang === 'pl' ? p.descPl : p.descEn,
      slug: p.slug,
      side: idx % 2 === 0 ? 'left' : 'right'
    }));

  return (
    <section className="blog" id="blog">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </Reveal>

        {/* VIS Vertical Timeline Blog Layout (Screenshot 2 & 3) */}
        <RevealStagger className="blog-timeline-container" delay={0.2}>
          <div className="blog-timeline-line"></div>

          {posts.map((post, idx) => (
            <RevealItem key={idx} className={`blog-timeline-item ${post.side}`}>
              <div className="blog-timeline-node">
                <span className="blog-timeline-date">{post.date}</span>
              </div>
              <div className="blog-timeline-card">
                <div style={{ fontSize: '0.75rem', color: 'var(--color-primary)', fontWeight: '600', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
                  {post.tag}
                </div>
                <h3>{post.title}</h3>
                <p>{post.desc}</p>
                <a href={post.slug} className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
                  {t('btnRead')} <span className="sr-only">o {post.title}</span>
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
        
        <RevealItem style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <a href="/blog" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
            {lang === 'pl' ? 'Zobacz pełną bibliotekę' : 'View full library'}
          </a>
        </RevealItem>
      </div>
    </section>
  );
}
