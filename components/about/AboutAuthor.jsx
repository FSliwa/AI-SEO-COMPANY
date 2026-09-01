'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '../ScrollReveal';

// Strona /o-nas byla linkowana w stopce jako sygnal E-E-A-T, ale nie padalo na
// niej ani jedno nazwisko i nie bylo schematu Person. Jednoczesnie kazdy artykul
// deklarowal autora "Filip Śliwa" jako byt bez @id, url i sameAs. Autor wisial
// w prozni: Google nie mial jak polaczyc artykulu z osoba, a osoby z firma.
// Ten komponent zamyka lancuch - widoczny podpis + wezel Person z trwalym @id,
// na ktory wskazuje ArticleSchema.
export const AUTHOR_ID = 'https://www.ai-seo-company.pl/o-nas#filip-sliwa';

export default function AboutAuthor() {
  const lang = useLocale();
  const isEn = lang === 'en';

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': AUTHOR_ID,
    name: 'Filip Śliwa',
    givenName: 'Filip',
    familyName: 'Śliwa',
    jobTitle: isEn ? 'SEO specialist' : 'Specjalista SEO',
    url: isEn
      ? 'https://www.ai-seo-company.pl/en/about-us'
      : 'https://www.ai-seo-company.pl/o-nas',
    email: 'kontakt@ai-seo-company.pl',
    worksFor: { '@id': 'https://www.ai-seo-company.pl/#organization' },
    knowsAbout: isEn
      ? ['Search engine optimization', 'Technical SEO', 'Local SEO', 'Web analytics']
      : ['Pozycjonowanie stron', 'Techniczne SEO', 'SEO lokalne', 'Analityka internetowa'],
  };

  return (
    <section style={{ padding: '80px 0' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="container" style={{ maxWidth: '820px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: 'clamp(2rem, 5vw, 3rem)', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6E6E73', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '1rem' }}>
              {isEn ? 'Who writes here' : 'Kto tu pisze'}
            </div>
            <h2 style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '0.5rem' }}>
              Filip Śliwa
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#6E6E73', fontWeight: 500, marginBottom: '1.5rem' }}>
              {isEn ? 'SEO specialist, AI SEO COMPANY' : 'Specjalista SEO, AI SEO COMPANY'}
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#333336', marginBottom: '1rem' }}>
              {isEn
                ? 'Author of the guides published on this blog. Works on technical SEO, local visibility and web analytics for B2B companies — audits, indexing, Core Web Vitals, Google Business Profile and measurement setup.'
                : 'Autor poradników publikowanych na tym blogu. Zajmuje się technicznym SEO, widocznością lokalną i analityką dla firm B2B — audytami, indeksacją, Core Web Vitals, Wizytówką Google i konfiguracją pomiaru.'}
            </p>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: '#333336', margin: 0 }}>
              {isEn ? 'Contact: ' : 'Kontakt: '}
              <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                kontakt@ai-seo-company.pl
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
