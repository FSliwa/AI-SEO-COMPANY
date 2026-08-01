'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Services() {
  const lang = useLocale();
  const t = useTranslations('services');

  const pillarsCount = 3;
  const pillars = Array.from({ length: pillarsCount }).map((_, i) => ({
    num: t(`pillars.${i}.num`),
    title: t(`pillars.${i}.title`),
    desc: t(`pillars.${i}.desc`)
  }));

  return (
    <section className="services" id="uslugi">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </Reveal>

        {/* KOTA 3 Pillars Row (Screenshot 1) */}
        <RevealStagger className="kota-pillars-row" delay={0.2}>
          {pillars.map((pillar, idx) => (
            <RevealItem key={idx} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">{pillar.num}</div>
                <div style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0.75rem 0" }}>{pillar.title}</div>
                <p>{pillar.desc}</p>
              </div>
              {idx < pillars.length - 1 && <span className="kota-divider-x">✕</span>}
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Detailed Service Cards */}
        <RevealStagger className="services-grid" delay={0.4}>
          {/* Card 1 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Strategia i identyfikacja marki' : 'Brand Strategy & Identity'}</h3>
            <p>{lang === 'pl' 
              ? 'Projektujemy spójną tożsamość wizualną: logo, system kolorystyczny, typografię oraz kompletną księgę znaku dostosowaną do wymagań cyfrowych.' 
              : 'We design cohesive visual identities: logo systems, color palettes, typography, and comprehensive digital brand guidelines.'
            }</p>
            <ul className="service-features">
              {lang === 'pl' ? (
                <>
                  <li>Projektowanie logo & sygnetu</li>
                  <li>Brand guidelines & styleguide</li>
                  <li>Materiały marketingowe i social media</li>
                </>
              ) : (
                <>
                  <li>Logo & mark system design</li>
                  <li>Brand guidelines & styleguide</li>
                  <li>Marketing assets & social media</li>
                </>
              )}
            </ul>
          </RevealItem>

          {/* Card 2 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Projektowanie stron i sklepów internetowych' : 'Web Design & E-Commerce'}</h3>
            <p>{lang === 'pl'
              ? 'Tworzymy responsywne, niezwykle szybkie strony internetowe (UX/UI), zoptymalizowane pod najwyższe współczynniki konwersji i estetykę premium.'
              : 'We engineer responsive, high-speed websites (UX/UI), optimized for top conversion rates and premium aesthetic appeal.'
            }</p>
            <ul className="service-features">
              {lang === 'pl' ? (
                <>
                  <li>Makiety UX/UI w Figma</li>
                  <li>Programowanie (Next.js & React)</li>
                  <li>Integracje z CRM i systemami płatności</li>
                </>
              ) : (
                <>
                  <li>UX/UI Wireframes in Figma</li>
                  <li>Development (Next.js & React)</li>
                  <li>CRM & payment system integrations</li>
                </>
              )}
            </ul>
          </RevealItem>

          {/* Card 3 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Optymalizacja SEO i marketing wzrostu' : 'SEO Optimization Service, SEO Services & Marketing Growth'}</h3>
            <p>{lang === 'pl'
              ? 'Skuteczne pozycjonowanie stron, seo lokalne w Warszawie i całej Polsce, techniczna optymalizacja SEO oraz poprawa konwersji (CRO) napędzająca stabilny ruch z Google.'
              : <>High-impact search engine positioning, local <strong>SEO services</strong>, technical <strong>SEO optimization service</strong>, and strategic content in marketing driving stable organic growth for your brand.</>
            }</p>
            <ul className="service-features">
              {lang === 'pl' ? (
                <>
                  <li>Audyt SEO i analiza konkurencji</li>
                  <li>Content marketing & optymalizacja techniczna</li>
                  <li>Monitorowanie widoczności i konwersji</li>
                </>
              ) : (
                <>
                  <li>SEO audit & competitor analysis</li>
                  <li>Content in marketing & technical SEO</li>
                  <li>Visibility & conversion tracking</li>
                </>
              )}
            </ul>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
