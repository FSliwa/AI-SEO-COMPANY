'use client';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { postsForLocale } from '@/lib/blogPosts';

export default function BlogCTA({ locale, currentSlug, customCtaTitlePl, customCtaTitleEn, customCtaTextPl, customCtaTextEn }) {
  // Fall back to the active locale: several call sites render <BlogCTA /> with no
  // props, which previously left `locale` undefined and forced the Polish branch.
  const activeLocale = useLocale();
  const lang = locale || activeLocale;
  // Get 2 related posts (excluding current)
  const relatedPosts = postsForLocale(lang)
    .filter(p => p.slug !== currentSlug)
    .slice(0, 2);

  return (
    <>
      {/* Named byline: matches the Person author in the BlogPosting schema.
          TODO: extend with years of experience and specialisation — left out
          deliberately rather than invented. */}
      <div style={{ marginTop: '3rem', padding: '1.5rem', border: '1px solid #E5E5EA', borderRadius: '12px', background: '#F9F9FB' }}>
        <p style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', margin: '0 0 0.5rem 0' }}>
          {lang === 'en' ? 'Author' : 'Autor'}
        </p>
        <p style={{ fontSize: '1rem', color: '#1D1D1F', fontWeight: 600, margin: '0 0 0.35rem 0' }}>
          Filip Śliwa
        </p>
        <p style={{ fontSize: '0.95rem', color: '#4B5563', margin: 0, lineHeight: 1.55 }}>
          {lang === 'en'
            ? 'SEO specialist at AI SEO COMPANY. Works on technical optimisation and search visibility strategy for B2B companies.'
            : 'Specjalista SEO w AI SEO COMPANY. Zajmuje się optymalizacją techniczną i strategią widoczności w wyszukiwarce dla firm B2B.'}
        </p>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', fontWeight: 600, color: '#1D1D1F' }}>
          {lang === 'en' ? 'Related Articles' : 'Powiązane artykuły'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {relatedPosts.map(post => (
            <Link key={post.slug} href={post.slug} style={{ textDecoration: 'none', display: 'block' }}>
              <div style={{ padding: '1.5rem', border: '1px solid #E5E5EA', borderRadius: '12px', height: '100%', transition: 'border-color 0.2s', background: '#FFFFFF' }}>
                <h4 style={{ fontSize: '1.1rem', color: '#1D1D1F', marginBottom: '0.5rem', fontWeight: 600 }}>
                  {lang === 'en' ? post.titleEn : post.titlePl}
                </h4>
                <p style={{ color: '#86868B', fontSize: '0.95rem', margin: 0, lineHeight: 1.5 }}>
                  {lang === 'en' ? post.descEn : post.descPl}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
        <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', display: 'block' }}>
            {lang === 'en' 
              ? (customCtaTitleEn || 'Dominate your local market') 
              : (customCtaTitlePl || 'Zdominuj lokalny rynek')}
          </p>
          <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
            {lang === 'en' 
              ? (customCtaTextEn || 'Want to outpace your competition? Leave us a message below and we will prepare a dedicated strategy.')
              : (customCtaTextPl || 'Chcesz wyprzedzić konkurencję w swojej okolicy? Zostaw nam wiadomość poniżej, a przygotujemy dedykowaną strategię.')}
          </p>
          <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
            {lang === 'en' ? 'Consult Your Project' : 'Skonsultuj Projekt'}
          </a>
        </div>
      </div>
    </>
  );
}
