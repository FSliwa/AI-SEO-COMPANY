'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import { useLanguage } from '@/lib/LanguageContext';

export default function PricingClient() {
  const { lang } = useLanguage();

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '40px', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'TRANSPARENTNA WYCENA' : 'TRANSPARENT PRICING'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? 'Ile Kosztuje Pozycjonowanie Stron?' : 'How Much Does SEO Cost?'} <br />
              <span style={{ color: 'var(--color-cta)' }}>{lang === 'pl' ? 'Cennik 2026' : 'Pricing 2026'}</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
              {lang === 'pl' 
                ? 'Brak ukrytych opłat i skomplikowanych umów. Płać za mierzalne wyniki i stały rozwój widoczności w wyszukiwarkach.' 
                : 'No hidden fees or complicated contracts. Pay for measurable results and continuous search visibility growth.'}
            </p>
          </Reveal>
        </div>
      </section>

      {/* SEO Content Section */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--color-text-main)' }}>
          <Reveal>
            <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                {lang === 'pl' ? 'Co obejmuje nasz cennik pozycjonowania?' : 'What does our SEO pricing include?'}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#515154', marginBottom: '1.5rem' }}>
                {lang === 'pl' 
                  ? 'Wybierając pakiety AI SEO COMPANY, inwestujesz w przewidywalny wzrost. Nasz cennik pozycjonowania stron internetowych został skonstruowany tak, aby zaspokoić potrzeby zarówno lokalnych biznesów B2C, jak i ogólnopolskich firm B2B.' 
                  : 'By choosing AI SEO COMPANY packages, you invest in predictable growth. Our website SEO pricing has been designed to meet the needs of both local B2C businesses and nationwide B2B companies.'}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#515154', marginBottom: '1.5rem' }}>
                {lang === 'pl'
                  ? 'Jako nowoczesna agencja marketingowa i SEO, nie ograniczamy się tylko do dodawania linków. Każdy z poniższych pakietów zawiera profesjonalny audyt techniczny, tworzenie unikalnych treści, strategię link buildingu B2B oraz optymalizację wskaźników Core Web Vitals.'
                  : 'As a modern marketing and SEO agency, we don\'t just build links. Each of the packages below includes a professional technical audit, unique content creation, B2B link building strategy, and Core Web Vitals optimization.'}
              </p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)', marginTop: '2rem' }}>
                {lang === 'pl' ? 'Dlaczego transparentne pakiety?' : 'Why transparent packages?'}
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#515154' }}>
                {lang === 'pl'
                  ? 'Ukryte koszty i umowy na wiele lat to domena przestarzałych firm. Wierzymy, że dobra usługa broni się sama, a jasny i prosty cennik pozycjonowania to podstawa partnerskich relacji i najwyższego zwrotu z inwestycji (ROI).'
                  : 'Hidden costs and multi-year contracts are the domain of outdated companies. We believe a good service defends itself, and clear, simple SEO pricing is the foundation of partnership and the highest ROI.'}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
