'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const faqAudyt = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Co zawiera profesjonalny audyt SEO?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Ile trwa przygotowanie audytu SEO?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.'
      }
    }
  ]
};

export default function AudytSeoPage() {
  return (
    <main style={{ backgroundColor: '#F5F5F7', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqAudyt) }}
      />
      <Header />
      
      {/* Hero Banner - Apple Style */}
      <section style={{ paddingTop: '200px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Diagnostyka i Audyt
              </span>
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              Profesjonalny Audyt SEO.
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#86868B', 
              lineHeight: 1.5, 
              maxWidth: '650px', 
              margin: '0 auto 3rem auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Odkryj przyczyny braku pozycji w Google i odblokuj pełny potencjał sprzedażowy serwisu. Weryfikujemy ponad 50 elementów.
            </p>
            <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
              Zamów Audyt Strony
            </a>
          </Reveal>
        </div>
      </section>

      {/* Feature Grid Section - Apple Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Co Analizujemy.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Kompleksowa weryfikacja techniczna i architektoniczna.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Szybkość i Technikalia.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Weryfikacja Core Web Vitals (LCP, CLS, INP), kodów odpowiedzi HTTP oraz eliminacja błędów indeksowania.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Architektura Treści.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Analiza struktury nagłówków, duplikacji treści oraz weryfikacja prawidłowego profilu słów kluczowych.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Profil Linków.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Badanie jakości i toksyczności domen odsyłających, anchor textów oraz autorytetu domeny.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
