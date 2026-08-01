'use client';

import { useLocale } from 'next-intl';
import { Reveal } from '@/components/ScrollReveal';

export default function Hero() {
  const lang = useLocale();

  return (
    <section className="subpage-hero" id="hero" style={{ paddingTop: '160px', paddingBottom: '120px', position: 'relative', textAlign: 'center', backgroundColor: '#FFFFFF', overflow: 'hidden' }}>
      
      {/* Ukryte elementy pod 100% zachowanie wyników SEO (Exact Match) */}
      <h1 style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', color: 'transparent', zIndex: -10, top: 0, left: 0, pointerEvents: 'none', margin: 0, padding: 0 }}>
        {lang === 'en' 
          ? <><strong>AI SEO COMPANY | Modern SEO & Marketing Agency</strong></>
          : <><strong>Agencja SEO, Agencja Marketingowa Warszawa: Pozycjonowanie Stron, Projekt, Strony i Wzrost</strong></>}
      </h1>
      <div style={{ position: 'absolute', opacity: 0, pointerEvents: 'none', zIndex: -1 }}>
        <img 
          src={lang === 'en' ? '/ai-seo-company-modern-seo-marketing-agency-en.svg' : '/agencja-marketingowa-agencja-seo-pozycjonowanie-stron-projekt-strony-wzrost.svg'} 
          alt={lang === 'en' 
            ? 'Modern SEO & Marketing Agency' 
            : 'Agencja SEO, Agencja Marketingowa Warszawa: Pozycjonowanie Stron, Projekt, Strony i Wzrost'} 
          title={lang === 'en' 
            ? 'Modern SEO & Marketing Agency' 
            : 'Agencja SEO, Agencja Marketingowa Warszawa: Pozycjonowanie Stron, Projekt, Strony i Wzrost'}
          width={1}
          height={1}
        />
      </div>

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', zIndex: 2, position: 'relative' }}>
        <Reveal>
          <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
            AI SEO COMPANY
          </div>
          
          <div style={{ 
            fontSize: 'clamp(3rem, 6vw, 5rem)', 
            fontWeight: 700, 
            lineHeight: 1.05, 
            color: 'var(--color-text-main)', 
            marginBottom: '1rem', 
            letterSpacing: '-0.04em'
          }}>
            {lang === 'pl' 
              ? 'Agencja SEO, Agencja Marketingowa Warszawa' 
              : 'SEO Company & SEO Agency'}
          </div>

          <div style={{ 
            width: '120px', 
            height: '6px', 
            background: 'linear-gradient(90deg, var(--color-cta) 0%, #FF8A65 100%)', 
            margin: '0 auto 2rem auto', 
            borderRadius: '3px',
            boxShadow: '0 4px 15px rgba(216, 90, 48, 0.4)'
          }}></div>

          <div style={{ 
            fontSize: 'clamp(2rem, 4vw, 3.2rem)', 
            fontWeight: 700, 
            color: 'var(--color-text-main)', 
            marginBottom: '1.5rem', 
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>
            {lang === 'pl' ? (
              <>Pozycjonowanie Stron, Projekt,<br/>Strony i Wzrost</>
            ) : (
              <>Search Engine Optimization<br/>Company</>
            )}
          </div>

          <p style={{ 
            fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', 
            color: '#333336', 
            lineHeight: 1.6, 
            maxWidth: '800px', 
            margin: '0 auto 3rem auto',
            fontWeight: 400
          }}>
            {lang === 'pl' 
              ? <>Twój projekt i strony to nasz priorytet. Agencja SEO, agencja marketingowa Warszawa. Zapewniamy pozycjonowanie stron, które generuje realny wzrost Twojej firmy.</> 
              : <>Need a company for seo or seo for companies? We are a leading seo company seo agency and search engine optimization company. We rank among top search engine optimization companies, seo firms, engine optimization companies, seo optimization companies, search engine optimisation companies and search engine optimization agencies.</>}
          </p>
          
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#kontakt" className="hero-btn-primary">
              {lang === 'pl' ? 'Rozpocznij współpracę' : 'Start collaboration'} 
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
            </a>
            <a href={lang === 'pl' ? '/pl/blog/cennik-pozycjonowania' : '/en/blog/seo-pricing'} className="hero-btn-secondary">
              {lang === 'pl' ? 'Zobacz cennik SEO' : 'View SEO pricing'}
            </a>
          </div>
        </Reveal>
      </div>

      <div style={{ marginTop: '5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.5, filter: 'grayscale(100%)', position: 'relative', zIndex: 2 }}>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.2rem', color: '#1D1D1F' }}>STANIAX</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1.1rem', color: '#1D1D1F' }}>ASE-BOT</span>
        <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '1rem', color: '#1D1D1F' }}>MADAME THAI</span>
        <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 500, letterSpacing: '0.05em', fontSize: '1rem', color: '#1D1D1F' }}>IRENEUSZ KOZERA</span>
      </div>
    </section>
  );
}
