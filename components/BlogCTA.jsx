'use client';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { blogPosts, postsForLocale } from '@/lib/blogPosts';
import { hash } from '@/lib/anchors';
import { ctaDlaWpisu } from '@/lib/blogCta';

export default function BlogCTA({ locale, currentSlug, klaster, customCtaTitlePl, customCtaTitleEn, customCtaTextPl, customCtaTextEn }) {
  // Fall back to the active locale: several call sites render <BlogCTA /> with no
  // props, which previously left `locale` undefined and forced the Polish branch.
  const activeLocale = useLocale();
  const lang = locale || activeLocale;
  // 2 powiazane wpisy: najpierw lista `related` z lib/blogPosts.js (tylko
  // wpisy dostepne w tym jezyku), braki uzupelniaja najnowsze - jak dawniej.
  const available = postsForLocale(lang).filter(p => p.slug !== currentSlug);
  const current = blogPosts.find(p => p.slug === currentSlug);
  const curated = (current?.related || [])
    .map(slug => available.find(p => p.slug === slug))
    .filter(Boolean);
  const relatedPosts = [...curated, ...available.filter(p => !curated.includes(p))]
    .slice(0, 2);
  // BC1 (5.11.2026, CS-04): klaster z pola `cta` wpisu w lib/blogPosts.js (albo z propa
  // `klaster` na stronie, która nie ma jeszcze wpisu, np. B1 przed publikacją partii 3).
  // Z klastrem: link do strony klastra z data-cta="blog_cta_<klaster>", a tytuł i tekst
  // z lib/blogCta.js zastępują customCta* (te mówią o formularzu „poniżej”). Bez klastra:
  // dotychczasowy przycisk do #kontakt, tylko data-cta="blog_cta_kontakt" zamiast "blog_cta".
  const cta = ctaDlaWpisu(klaster ?? current?.cta, currentSlug, lang);
  const przyciskStyl = { display: 'inline-block', background: 'var(--w-tusz)', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' };

  return (
    <>
      {/* Named byline: matches the Person author in the BlogPosting schema.
          TODO: extend with years of experience and specialisation - left out
          deliberately rather than invented. */}
      <div style={{ marginTop: '3rem', padding: '1.5rem 1.75rem', border: '1px solid var(--w-linia)', borderRadius: '16px', background: 'var(--w-papier-2)' }}>
        <p style={{ fontFamily: 'var(--w-mono)', fontSize: '0.75rem', fontWeight: 500, color: 'var(--w-pomarancz-tekst)', textTransform: 'uppercase', letterSpacing: '0.12em', margin: '0 0 0.45rem 0' }}>
          {lang === 'en' ? 'Author' : 'Autor'}
        </p>
        <p style={{ fontSize: '1rem', color: 'var(--w-tusz)', fontWeight: 600, margin: '0 0 0.35rem 0' }}>
          Filip Śliwa
        </p>
        <p style={{ fontSize: '0.95rem', color: 'var(--w-tusz-2)', margin: 0, lineHeight: 1.55 }}>
          {lang === 'en'
            ? 'SEO specialist at AI SEO COMPANY. Works on technical optimisation and search visibility strategy for B2B companies.'
            : 'Specjalista SEO w AI SEO COMPANY. Zajmuje się optymalizacją techniczną i strategią widoczności w wyszukiwarce dla firm B2B.'}
        </p>
        <p style={{ fontSize: '0.9rem', margin: '0.6rem 0 0 0' }}>
          <Link href={{ pathname: '/o-nas', hash: lang === 'en' ? 'how-our-content-is-made' : 'jak-powstaja-tresci' }} style={{ color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline' }}>
            {lang === 'en' ? 'How our content is made' : 'Jak powstają nasze treści'}
          </Link>
        </p>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <h3 style={{ fontSize: '1.45rem', marginBottom: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', color: 'var(--w-tusz)' }}>
          {lang === 'en' ? 'Related Articles' : 'Powiązane artykuły'}
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '1.25rem' }}>
          {/* The card stays fully clickable, but only the title sits inside the
              anchor - wrapping the description too made the anchor text ~150
              characters, which the crawl flagged. .stretched-link covers the
              card via ::after, so the look and the click target are unchanged. */}
          {relatedPosts.map(post => (
            <div key={post.slug} className="w-karta w-karta--link" style={{ position: 'relative', padding: '1.5rem', border: '1px solid var(--w-linia)', borderRadius: '20px', height: '100%', background: 'var(--w-karta)' }}>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--w-tusz)', marginBottom: '0.5rem', fontWeight: 600, letterSpacing: '-0.015em', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Link href={post.slug} className="stretched-link" style={{ textDecoration: 'none', color: 'inherit' }}>
                  {lang === 'en' ? post.titleEn : post.titlePl}
                </Link>
                <span aria-hidden="true" style={{ color: 'var(--w-pomarancz-tekst)', flexShrink: 0 }}>→</span>
              </h4>
              <p style={{ color: 'var(--w-tusz-2)', fontSize: '0.95rem', margin: 0, lineHeight: 1.55 }}>
                {lang === 'en' ? post.descEn : post.descPl}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ borderTop: '1px solid var(--w-linia)', marginTop: '4rem', paddingTop: '4rem' }}>
        <div style={{ background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', padding: 'clamp(2rem, 4vw, 3rem)', textAlign: 'center' }}>
          <p style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '1rem', display: 'block' }}>
            {cta ? cta.title : lang === 'en' 
              ? (customCtaTitleEn || 'Dominate your market') 
              : (customCtaTitlePl || 'Zdominuj swój rynek')}
          </p>
          <p style={{ margin: 0, color: 'var(--w-tusz-2)', fontSize: '1.1rem', marginBottom: '2rem' }}>
            {cta ? cta.text : lang === 'en' 
              ? (customCtaTextEn || 'Want to outpace your competition in search results? Leave us a message below and we will prepare a dedicated SEO strategy.')
              : (customCtaTextPl || 'Chcesz wyprzedzić konkurencję w wynikach wyszukiwania? Zostaw nam wiadomość poniżej, a przygotujemy dedykowaną strategię SEO.')}
          </p>
          {cta ? (
            <Link href={cta.href} data-cta={`blog_cta_${cta.klaster}`} style={przyciskStyl}>
              {cta.label}
            </Link>
          ) : (
            <a href={hash('kontakt', activeLocale)} data-cta="blog_cta_kontakt" style={przyciskStyl}>
              {lang === 'en' ? 'Consult Your Project' : 'Skonsultuj Projekt'}
            </a>
          )}
        </div>
      </div>
    </>
  );
}
