'use client';

import { useLanguage } from '@/lib/LanguageContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function PozycjonowanieClient({ faqData, portfolioCases, carouselItems }) {
  const { lang } = useLanguage();

  return (
    <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {lang === 'pl' ? 'Pozycjonowanie Stron' : 'SEO Optimization'}
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
                <>Pozycjonowanie stron internetowych<span style={{ display: 'block', width: '60px', height: '4px', backgroundColor: 'currentColor', margin: '0.5rem auto', borderRadius: '2px' }}></span>Organiczny Wzrost Maksymalna Konwersja</>
              ) : (
                <>Search Engine Optimization<span style={{ display: 'block', width: '60px', height: '4px', backgroundColor: 'currentColor', margin: '0.5rem auto', borderRadius: '2px' }}></span>Organic Growth Maximum Conversion</>
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
                ? 'Zbuduj trwałą przewagę konkurencyjną. Łączymy zaawansowane audyty techniczne i architekturę treści dopasowaną pod nowoczesną wyszukiwarkę.'
                : 'Build a lasting competitive advantage. We combine advanced technical audits and content architecture tailored for modern search engines.'}
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                {lang === 'pl' ? 'Zamów Wycenę' : 'Get a Quote'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceCarousel 
        tag={lang === 'pl' ? "FILARY SKALOWANIA WIDOCZNOŚCI" : "PILLARS OF VISIBILITY SCALING"}
        title={lang === 'pl' ? "Przewaga w Wynikach Organicznych" : "Advantage in Organic Results"}
        subtitle={lang === 'pl' ? "Odkryj mechanizmy, które napędzają wzrost Twojego biznesu w wyszukiwarce Google." : "Discover the mechanisms driving your business growth in Google search."}
        items={carouselItems}
      />

      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Jak Działamy' : 'How We Work'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Trzyetapowa strategia wzrostu oparta na twardych danych analitycznych.' : 'A three-step growth strategy based on hard analytical data.'}
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'KROK 1' : 'STEP 1'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {lang === 'pl' ? 'Audyt Techniczny & CWV' : 'Technical Audit & CWV'}
              </h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>
                {lang === 'pl' ? 'Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.' : 'We eliminate indexing errors, speed up loading times, and improve internal linking architecture.'}
              </p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'KROK 2' : 'STEP 2'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {lang === 'pl' ? 'Content Marketing' : 'Content Marketing'}
              </h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>
                {lang === 'pl' ? 'Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i intencje wyszukiwania.' : 'We create topical clusters and semantic content answering user queries and search intent.'}
              </p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'KROK 3' : 'STEP 3'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {lang === 'pl' ? 'Link Building' : 'Link Building'}
              </h3>
              <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>
                {lang === 'pl' ? 'Pozyskujemy jakościowe odnośniki z cenionych portali, systematycznie budując zaufanie i autorytet Twojej domeny.' : 'We acquire high-quality backlinks from respected portals, systematically building trust and authority for your domain.'}
              </p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <SubpagePortfolio 
        title={lang === 'pl' ? "Scenariusze Wzrostu i Wyniki" : "Growth Scenarios and Results"} 
        subtitle={lang === 'pl' ? "Sprawdzone wzorce skalowania widoczności i konwersji w modelu AI SEO" : "Proven patterns of visibility and conversion scaling in the AI SEO model"}
        cases={portfolioCases} 
        layout="vertical"
      />

      <Pricing />

      <AppleFaq faqData={faqData} title={lang === 'pl' ? "Najczęstsze pytania" : "Frequently Asked Questions"} />

      <Contact />
    </main>
  );
}
