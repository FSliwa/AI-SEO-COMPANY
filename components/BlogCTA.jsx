'use client';
import { Link } from '@/i18n/routing';
import { blogPosts } from '@/lib/blogPosts';

export default function BlogCTA({ locale, currentSlug, customCtaTitlePl, customCtaTitleEn, customCtaTextPl, customCtaTextEn }) {
  // Get 2 related posts (excluding current)
  const relatedPosts = blogPosts.filter(p => p.slug !== currentSlug).slice(0, 2);

  return (
    <>
      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600, color: '#1D1D1F' }}>
          {locale === 'en' ? 'Related Articles' : 'Powiązane artykuły'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {relatedPosts.map(post => (
            <Link key={post.slug} href={post.slug} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ padding: '1.5rem', border: '1px solid #E5E5EA', borderRadius: '12px', height: '100%', transition: 'border-color 0.2s', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#1D1D1F', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {locale === 'en' ? post.titleEn : post.titlePl}
                </h4>
                <p style={{ color: '#86868B', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                  {locale === 'en' ? post.descEn : post.descPl}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
        <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem' }}>
            {locale === 'en' 
              ? (customCtaTitleEn || 'Dominate your local market') 
              : (customCtaTitlePl || 'Zdominuj lokalny rynek')}
          </h3>
          <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
            {locale === 'en' 
              ? (customCtaTextEn || 'Want to outpace your competition? Leave us a message below and we will prepare a dedicated strategy.')
              : (customCtaTextPl || 'Chcesz wyprzedzić konkurencję w swojej okolicy? Zostaw nam wiadomość poniżej, a przygotujemy dedykowaną strategię.')}
          </p>
          <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
            {locale === 'en' ? 'Consult Your Project' : 'Skonsultuj Projekt'}
          </a>
        </div>
      </div>
    </>
  );
}
