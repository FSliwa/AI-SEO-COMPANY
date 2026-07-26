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
      side: 'left'
    },
    {
      date: '23 Lipca 2026',
      tag: 'Branding',
      title: 'Spójny system wizualny jako główny czynnik budowania zaufania B2B',
      desc: 'Jak profesjonalne logo i spójny design system podnoszą postrzeganą wartość Twoich usług i konwersję ze strony.',
      side: 'right'
    },
    {
      date: '22 Lipca 2026',
      tag: 'Conversion Rate',
      title: 'Jak zaplanować cennik na stronie internetowej, aby zwiększyć klikalność CTA?',
      desc: 'Analiza psychologii prezentacji cen i wyboru odpowiedniego kontrastu przycisków akcji w ofertach agencji.',
      side: 'left'
    }
  ] : [
    {
      date: 'July 24, 2026',
      tag: 'SEO Strategy',
      title: 'Why responsiveness & Core Web Vitals are key to top Google rankings',
      desc: 'Discover how page speed and user experience translate directly into higher organic positioning.',
      side: 'left'
    },
    {
      date: 'July 23, 2026',
      tag: 'Branding',
      title: 'Cohesive visual identity as the foundation of B2B client trust',
      desc: 'How professional branding and design systems raise perceived service value and site conversions.',
      side: 'right'
    },
    {
      date: 'July 22, 2026',
      tag: 'Conversion Rate',
      title: 'How to structure pricing tables to boost CTA conversion rates',
      desc: 'Analyzing pricing psychology and action button contrast to maximize sales inquiries.',
      side: 'left'
    }
  ];

  return (
    <section className="blog" id="blog">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> {t.tag}
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
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.85rem' }}>
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
