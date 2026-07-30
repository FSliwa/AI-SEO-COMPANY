'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function AudytClient({ faqData, portfolioCases, carouselItems }) {
  const lang = useLocale();

  return (
    <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Banner - Apple Style */}
      <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: 'var(--color-text-main)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              {lang === 'pl' ? (
                <>Audyt i Optymalizacja SEO<span style={{ display: 'block', width: '60px', height: '4px', backgroundColor: 'currentColor', margin: '0.5rem auto', borderRadius: '2px', overflow: 'hidden', textIndent: '-9999px' }}> — </span>Diagnoza Techniczna<br />Precyzyjna Optymalizacja</>
              ) : (
                <>SEO Audit & Optimization<span style={{ display: 'block', width: '60px', height: '4px', backgroundColor: 'currentColor', margin: '0.5rem auto', borderRadius: '2px', overflow: 'hidden', textIndent: '-9999px' }}> — </span>Technical Diagnosis<br />Precise Optimization</>
              )}
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#6E6E73', 
              lineHeight: 1.5, 
              maxWidth: '650px', 
              margin: '0 auto 3rem auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              {lang === 'pl' 
                ? 'Zamów profesjonalny Audyt SEO (analiza i optymalizacja) w AI SEO COMPANY. Nasza diagnoza techniczna i precyzyjna optymalizacja odkryją przyczyny braku widoczności w Google i odblokują potencjał sprzedażowy serwisu.'
                : 'Order a professional SEO Audit (analysis and optimization) from AI SEO COMPANY. Our technical diagnosis and precise optimization will discover the real reasons for poor Google visibility and unlock your site\'s full sales potential.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                {lang === 'pl' ? 'Zamów Audyt Strony' : 'Order Website Audit'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Carousel */}
      <ServiceCarousel 
        tag={lang === 'pl' ? "STANDARDY TECHNICZNE" : "TECHNICAL STANDARDS"}
        title={lang === 'pl' ? "Pełna Kontrola Jakości" : "Complete Quality Control"}
        subtitle={lang === 'pl' ? "Poznaj kluczowe metryki, które analizujemy podczas każdego audytu." : "Explore the key metrics we analyze during every audit."}
        items={carouselItems}
      />

      {/* Feature Grid Section - Apple Bento Grid Style */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Obszary Analizy Technicznej' : 'Technical Analysis Areas'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Kompleksowa weryfikacja techniczna, strukturalna i semantyczna witryny.' : 'Comprehensive technical, structural, and semantic verification of your website.'}
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 1' : 'AREA 1'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Technikalia & CWV' : 'Technicals & CWV'}</h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Analiza Core Web Vitals (LCP, CLS, INP), poprawności kodów HTTP, przekierowań i eliminacja barier dla robotów indeksujących.' : 'Analysis of Core Web Vitals (LCP, CLS, INP), HTTP code correctness, redirects, and eliminating barriers for indexing bots.'}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 2' : 'AREA 2'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Treści & Semantyka' : 'Content & Semantics'}</h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Weryfikacja intencji wyszukiwania (Search Intent), analiza kanibalizacji słów kluczowych i pokrycia klastrów tematycznych.' : 'Verification of search intent, analysis of keyword cannibalization and coverage of topical clusters.'}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'OBSZAR 3' : 'AREA 3'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Profil Linków & Autorytet' : 'Link Profile & Authority'}</h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Weryfikacja toksyczności linków przychodzących, analiza anchor textów oraz badanie domen odsyłających w modelu AI.' : 'Verification of incoming link toxicity, anchor text analysis, and AI model evaluation of referring domains.'}</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Portfolio Section */}
      <SubpagePortfolio 
        title={lang === 'pl' ? "Odkryj efekty naszych audytów" : "Discover our audit results"} 
        subtitle={lang === 'pl' ? "Najczęstsze błędy techniczne wykrywane podczas audytów oraz metody ich eliminacji" : "Most common technical errors detected during audits and how we eliminate them"}
        cases={portfolioCases} 
      />

      {/* FAQ Section */}
      <AppleFaq faqData={faqData} title={lang === 'pl' ? "Najczęstsze pytania" : "Frequently Asked Questions"} />

      <Contact />
    </main>
  );
}
