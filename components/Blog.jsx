'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Blog() {
  const { lang } = useLanguage();
  const t = translations[lang].blog;

  const posts = lang === 'pl' ? [
    {
      date: '24 Lipca 2026',
      tag: 'Strategia SEO',
      title: 'Dlaczego responsywność i Core Web Vitals to klucz do wyższych pozycji w Google?',
      desc: 'Dowiedz się, jak szybkość ładowania strony i doświadczenie użytkownika przekładają się bezpośrednio na pozycję w wyszukiwarce.',
      side: 'left',
      slug: '/blog/core-web-vitals-a-pozycje-google'
    },
    {
      date: '20 Lipca 2026',
      tag: 'SEO Lokalne',
      title: 'SEO Lokalne dla firm w Warszawie - jak wygrać z konkurencją?',
      desc: 'Praktyczny poradnik jak zdominować lokalne wyniki wyszukiwania i zdobyć klientów z Twojej okolicy w Warszawie.',
      side: 'right',
      slug: '/blog/seo-lokalne-dla-firm-w-warszawie'
    },
    {
      date: '15 Lipca 2026',
      tag: 'Budżet SEO',
      title: 'Ile kosztuje pozycjonowanie w 2026 roku?',
      desc: 'Analiza kosztów, modeli rozliczeń i zwrotu z inwestycji. Dowiedz się, za co tak naprawdę płacisz agencji SEO.',
      side: 'left',
      slug: '/blog/ile-kosztuje-pozycjonowanie-2026'
    }
  ] : [
    {
      date: 'July 24, 2026',
      tag: 'SEO Strategy',
      title: 'Why responsiveness & Core Web Vitals are key to top Google rankings',
      desc: 'Discover how page speed and user experience translate directly into higher organic positioning.',
      side: 'left',
      slug: '/blog/core-web-vitals-a-pozycje-google'
    },
    {
      date: 'July 20, 2026',
      tag: 'Local SEO',
      title: 'Local SEO for businesses in Warsaw - how to beat the competition?',
      desc: 'A practical guide on how to dominate local search results and get clients from your area in Warsaw.',
      side: 'right',
      slug: '/blog/seo-lokalne-dla-firm-w-warszawie'
    },
    {
      date: 'July 15, 2026',
      tag: 'SEO Budget',
      title: 'How much does SEO cost in 2026?',
      desc: 'Analysis of costs, billing models and ROI. Find out what you really pay for when hiring an SEO agency.',
      side: 'left',
      slug: '/blog/ile-kosztuje-pozycjonowanie-2026'
    }
  ];

  return (
    <section className="blog" id="blog">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t.tag}
          </div>
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
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
                  {t.btnRead}
                </a>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
