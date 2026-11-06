'use client';

import { Fragment } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';
import { Link } from '@/i18n/routing';
import Image from 'next/image';

// 6.11.2026 (wyglad z makiety): ilustracje kreskowe pod kolumnami oferty.
// Dekoracja (alt=""), przebarwione z fioletu makiety na pomarancz marki.
const Ilustracja = ({ src, w, h }) => (
  <Image className="oferta-ilustracja" src={src} alt="" width={w} height={h} sizes="300px" loading="lazy" aria-hidden="true" />
);

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
    <section className="services cursor-light" id={sectionId('uslugi', lang)}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </Reveal>

        {/* KOTA 3 Pillars Row (Screenshot 1) */}
        {/* Znak ✕ stal w tym samym elemencie flex co karta, wiec karty 1 i 2
            oddawaly mu 34 px (18 px znaku + 16 px odstepu): pomiar 05.10.2026
            przy 1440 px dal 347 / 347 / 381 px. Teraz ✕ jest osobnym elementem
            miedzy kartami, karty dziela szerokosc po rowno, a stretch na rzedzie
            wyrownuje ich wysokosc (po zmianie: 353,1 x 3 przy 1440 px). ✕ to
            ozdobnik, wiec aria-hidden - bez tego czytnik odczytywal sam znak.
            ✕ to Reveal z opoznieniem karty po lewej (delayChildren 0,2 s
            + 0,15 s na karte), zeby wjezdzal tuz za nia jak wczesniej, a nie
            liczyl sie do kolejki staggera (przesunalby wejscie kart 2 i 3).
            Ukrycie ✕ ponizej 1024 px (rzad sie zawija) wymaga reguly
            w app/globals.css przy .kota-divider-x. */}
        <RevealStagger className="kota-pillars-row" delay={0.2} style={{ alignItems: 'stretch' }}>
          {pillars.map((pillar, idx) => (
            <Fragment key={idx}>
              <RevealItem style={{ display: 'flex', flex: 1, minWidth: 260 }}>
                <div className="kota-pillar-card">
                  <div className="kota-pillar-num">{pillar.num}</div>
                  <div style={{ fontSize: "1.25rem", fontWeight: 600, margin: "0.75rem 0" }}>{pillar.title}</div>
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

        {/* Detailed Service Cards */}
        <RevealStagger className="services-grid" delay={0.4}>
          {/* Card 1 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Strategia i identyfikacja marki' : 'Brand Strategy & Visual Identity'}</h3>
            <p>{lang === 'pl' 
              ? 'Projektujemy spójną tożsamość wizualną: logo, system kolorystyczny, typografię oraz kompletną księgę znaku dostosowaną do wymagań cyfrowych.' 
              : <>We design the part <strong>search engine optimisation agencies</strong> usually outsource: cohesive visual identities — logo systems, color palettes, typography, and comprehensive digital brand guidelines.</>
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
            <Ilustracja src="/images/wyglad/antena-linie.webp" w={1000} h={591} />
          </RevealItem>

          {/* Card 2 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Projektowanie stron i sklepów internetowych' : 'Web Design & E-Commerce Development'}</h3>
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
            <Ilustracja src="/images/wyglad/oferta-www.webp" w={640} h={416} />
          </RevealItem>

          {/* Card 3 */}
          <RevealItem className="service-card">
            <div className="service-icon">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23 6l-9.5 9.5-5-5L1 18"/><path d="M17 6h6v6"/></svg>
            </div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{lang === 'pl' ? 'Optymalizacja i marketing wzrostu' : 'Growth Marketing & Search Optimization'}</h3>
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
            <Ilustracja src="/images/wyglad/oferta-seo.webp" w={640} h={433} />
          </RevealItem>

          {/* Card 4 - 5.11.2026 (HOME; PLAN-v2 6.24, MSA-07): strona główna nie linkowała w treści do huba GEO
              (crawl 5.11: hub ma linki w treści tylko z cennika i sprawdzarki). Strona chroniona: tylko
              dodanie, tylko PL (plan nie podaje tekstu EN), title/description bez zmian. Tekst 33 słowa,
              celowo inny niż lead huba (playbook 5.5). Pełna szerokość siatki: 4. karta nie zostaje sama
              w trzeciej kolumnie. Link do sprawdzarki dopiero po T0.2. */}
          {lang === 'pl' && (
            <RevealItem className="service-card service-card--geo" style={{ gridColumn: '1 / -1' }}>
              <div className="service-icon">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/><path d="M8 9h8"/><path d="M8 13h5"/></svg>
              </div>
              <h3 style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>Pozycjonowanie w AI (GEO)</h3>
              <p style={{ maxWidth: '760px' }}>Klienci coraz częściej pytają ChatGPT i Gemini, jaką firmę wybrać. Mierzymy, czy modele wymieniają Twoją markę w odpowiedziach na pytania Twoich klientów, i poprawiamy strony, z których korzystają. Pomiar co tydzień w panelu.</p>
              <Link href="/pozycjonowanie-w-ai" style={{ color: 'var(--color-primary)', fontWeight: 600, textDecoration: 'underline' }}>
                Zobacz, jak działa pozycjonowanie w AI →
              </Link>
              <Ilustracja src="/images/wyglad/oferta-ai.webp" w={640} h={531} />
            </RevealItem>
          )}
        </RevealStagger>
      </div>
    </section>
  );
}
