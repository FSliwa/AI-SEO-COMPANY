'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';

export default function PozycjonowanieClient({ faqData, portfolioCases, carouselItems }) {
  const lang = useLocale();

  return (
    <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              {lang === 'pl' ? 'POZYCJONOWANIE STRON' : 'SEO OPTIMIZATION'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 7vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: 'var(--color-text-main)', 
              marginBottom: '1rem', 
              letterSpacing: '-0.04em'
            }}>
              {lang === 'pl' ? 'Pozycjonowanie stron internetowych' : 'SEO Optimization Agency & Search Engine Marketing'}
            </h1>

            <div style={{ 
              width: '120px', 
              height: '6px', 
              background: 'linear-gradient(90deg, var(--color-cta) 0%, #FF8A65 100%)', 
              margin: '0 auto 2rem auto', 
              borderRadius: '3px',
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.4)'
            }}></div>

            <div style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: 'var(--color-text-main)', 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? (
                <>Organiczny Wzrost<br/>Maksymalna Konwersja</>
              ) : (
                <>Organic Growth<br/>Maximum Conversion</>
              )}
            </div>

            <p style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              color: '#333336', 
              lineHeight: 1.6, 
              maxWidth: '700px', 
              margin: '0 auto 3rem auto',
              fontWeight: 400
            }}>
              {lang === 'pl' 
                ? <>Zbuduj trwałą przewagę konkurencyjną. Łączymy zaawansowane audyty techniczne i architekturę treści dopasowaną pod nowoczesną wyszukiwarkę. Nasza usługa to: <span style={{ fontWeight: 'bold' }} style={{ color: 'var(--color-cta)' }}>Pozycjonowanie Stron Internetowych | SEO dla Firm B2B</span>.</>
                : <>Build a lasting competitive advantage. We combine advanced technical audits with <span style={{ fontWeight: 'bold' }}>content marketing</span> tailored for modern search engines. Our <strong>search optimization services</strong> and <strong>seo for agencies</strong> are unparalleled: <span style={{ color: 'var(--color-cta)' }}>Website SEO | B2B Optimization | AI SEO COMPANY</span>.</>}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" className="hero-btn-primary">
                {lang === 'pl' ? 'Rozpocznij współpracę' : 'Start collaboration'} 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a href={lang === 'pl' ? '/#portfolio' : '/en#portfolio'} className="hero-btn-secondary">
                {lang === 'pl' ? 'Zobacz case studies' : 'View case studies'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <ServiceCarousel 
        tag={lang === 'pl' ? "FILARY SKALOWANIA WIDOCZNOŚCI" : "PILLARS OF VISIBILITY SCALING"}
        title={lang === 'pl' ? "Przewaga w Wynikach Organicznych" : "Advantage in Organic Results & Content Marketing"}
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
                {lang === 'pl' ? 'Audyt Techniczny & CWV' : 'Search Engine Optimization and Marketing'}
              </h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>
                {lang === 'pl' ? 'Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.' : 'We eliminate indexing errors, speed up loading times, and improve internal linking architecture.'}
              </p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'KROK 2' : 'STEP 2'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {lang === 'pl' ? 'Content Marketing' : 'Search Engine Optimisation SEO & Digital Marketing SEO'}
              </h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>
                {lang === 'pl' 
                  ? <>Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i intencje wyszukiwania. Sprawdź nasz <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-cta)', textDecoration: 'underline' }}>poradnik o opiniach Google</Link>.</>
                  : <>We create topical clusters and semantic content answering user queries and search intent. Check out our <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-cta)', textDecoration: 'underline' }}>Google reviews guide</Link>.</>}
              </p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'KROK 3' : 'STEP 3'}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>
                {lang === 'pl' ? 'Link Building' : 'Search Optimisation Agency, SEO Optimization Service & SEO Services SEO'}
              </h3>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>
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

      <AppleFaq faqData={faqData} title={lang === 'pl' ? "Najczęstsze pytania" : "Search Optimization Agency & SEO Digital Marketing FAQs"} />

      <Contact />
    </main>
  );
}
