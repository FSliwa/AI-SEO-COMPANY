'use client';

import { Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';
import { Link } from '@/i18n/routing';
import { WSTEP_OFERTY } from '@/lib/wstepOferty';

export default function Services() {
  const lang = useLocale();
  const t = useTranslations('services');

  const pillarsCount = 3;
  const pillars = Array.from({ length: pillarsCount }).map((_, i) => ({
    num: t(`pillars.${i}.num`),
    title: t(`pillars.${i}.title`),
    desc: t(`pillars.${i}.desc`)
  }));

  // Zdania akapitu wstępnego (podział po kropce i spacji), grupy 2 + 2 + reszta.
  const zdaniaWstepu = WSTEP_OFERTY[lang === 'en' ? 'en' : 'pl'].split(/(?<=\.)\s+/);
  const blokiWstepu = [zdaniaWstepu.slice(0, 2), zdaniaWstepu.slice(2, 4), zdaniaWstepu.slice(4)].filter((b) => b.length);

  return (
    <section className="services cursor-light" id={sectionId('uslugi', lang)}>
      <div className="container" data-header-box="">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </Reveal>

        {/* Akapit wstępny w 3 krótkich blokach: te same zdania co w WSTEP_OFERTY, tylko podzielone
            (2 + 2 + reszta). Pierwsze zdanie bloku to wyróżnienie (span, nie strong - CLAUDE.md). */}
        <Reveal className="oferta-wstep-siatka" delay={0.1}>
          {blokiWstepu.map((zdania) => (
            <p className="oferta-wstep" key={zdania[0]}>
              <span className="oferta-wstep-wyroznienie">{zdania[0]}</span>{' '}
              {zdania.slice(1).join(' ')}
            </p>
          ))}
        </Reveal>

        {/* 3 Filary oferty */}
        <RevealStagger className="kota-pillars-row" delay={0.2} style={{ alignItems: 'stretch' }}>
          {pillars.map((pillar, idx) => (
            <Fragment key={idx}>
              <RevealItem style={{ display: 'flex', flex: 1, minWidth: 260 }}>
                <div className="kota-pillar-card">
                  <div className="kota-pillar-num">{pillar.num}</div>
                  <div style={{ fontSize: '1.25rem', fontWeight: 600, margin: '0.75rem 0' }}>{pillar.title}</div>
                  <p>{pillar.desc}</p>
                </div>
              </RevealItem>
              {idx < pillars.length - 1 && (
                <Reveal
                  className="kota-divider-x"
                  aria-hidden="true"
                  delay={0.2 + 0.15 * idx}
                  style={{ flex: 'none', alignSelf: 'center' }}
                >
                  ✕
                </Reveal>
              )}
            </Fragment>
          ))}
        </RevealStagger>

        {/* Szczegółowe kolumny usług (bez dolnych ilustracji; 4 równe kolumny w PL, 3 w EN) */}
        <RevealStagger className="services-grid" delay={0.4}>
          {/* Kolumna 1 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{lang === 'pl' ? 'Strategia i identyfikacja marki' : 'Brand Strategy & Visual Identity'}</h3>
            <p>{lang === 'pl'
              ? 'Projektujemy spójną tożsamość wizualną: logo, system kolorystyczny, typografię oraz kompletną księgę znaku dostosowaną do wymagań cyfrowych.'
              : <>We design the part <strong>search engine optimisation agencies</strong> usually outsource: cohesive visual identities - logo systems, color palettes, typography, and comprehensive digital brand guidelines.</>
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

          {/* Kolumna 2 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{lang === 'pl' ? 'Projektowanie stron i sklepów internetowych' : <>Web Design &amp; <span style={{ whiteSpace: 'nowrap' }}>E-Commerce</span> Development</>}</h3>
            <p>{lang === 'pl'
              ? 'Tworzymy responsywne, niezwykle szybkie strony internetowe (UX/UI), zoptymalizowane pod najwyższe współczynniki konwersji i estetykę premium.'
              : 'As a full-service marketing agency, we engineer responsive, high-speed websites (UX/UI), optimized for top conversion rates and premium aesthetic appeal.'
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

          {/* Kolumna 3 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
            </div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{lang === 'pl' ? 'Optymalizacja i marketing wzrostu' : 'Growth Marketing & Search Optimization'}</h3>
            <p>{lang === 'pl'
              ? 'Skuteczne pozycjonowanie stron, seo lokalne w Warszawie i całej Polsce, techniczna optymalizacja SEO oraz poprawa konwersji (CRO) napędzająca stabilny ruch z Google.'
              : <>High-impact search engine positioning, local <span style={{ fontWeight: 'bold' }}>SEO services</span>, and technical <span style={{ fontWeight: 'bold' }}>SEO optimization service</span> driving stable growth. We are recognized among top <strong>search engine optimization companies</strong>.</>
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

          {/* Kolumna 4 (PL): Pozycjonowanie w AI (GEO) - pełnoprawna czwarta kolumna w tej samej siatce */}
          {lang === 'pl' && (
            <RevealItem className="service-card service-card--geo">
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>Pozycjonowanie w AI (GEO)</h3>
              <p>Klienci coraz częściej pytają ChatGPT i Gemini, jaką firmę wybrać. Mierzymy, czy modele wymieniają Twoją markę w odpowiedziach na pytania Twoich klientów, i poprawiamy strony, z których korzystają. Pomiar co tydzień w panelu.</p>
              <div className="service-geo-footer">
                <Link href="/pozycjonowanie-w-ai" className="service-geo-link">
                  <span>Zobacz, jak działa pozycjonowanie w{'\u00A0'}AI</span>
                  <span className="service-geo-arrow" aria-hidden="true">→</span>
                </Link>
              </div>
            </RevealItem>
          )}
        </RevealStagger>
      </div>
    </section>
  );
}
