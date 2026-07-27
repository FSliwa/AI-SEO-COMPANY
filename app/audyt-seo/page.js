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
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqAudyt) }}
      />
      <Header />
      
      {/* Hero Banner with Ambient Glow */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '55vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.18) 0%, rgba(3, 7, 18, 0) 80%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1.25rem' }}>
              <span className="asterisk">✳</span> LEAD MAGNET & DIAGNOSTYKA
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#FFFFFF', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Profesjonalny <span style={{ 
                background: 'linear-gradient(135deg, #FF7A59 0%, #D85A30 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Audyt SEO</span> Strony i Sklepu
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Odkryj przyczyny braku pozycji w Google i odblokuj pełny potencjał sprzedażowy serwisu. Przeprowadzamy weryfikację ponad 50 elementów technicznych i treściowych.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              Zamów Audyt Strony →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '3rem', fontFamily: "'Space Grotesk', sans-serif" }}>
              Co Analizujemy Podczas Audytu SEO?
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
              <h3 style={{ color: '#D85A30', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>1. SEO Techniczne i Szybkość</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>Core Web Vitals (LCP, CLS, INP), kody odpowiedzi HTTP, kanibalizacja i błędy indeksowania.</p>
            </RevealItem>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
              <h3 style={{ color: '#D85A30', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>2. Architektura Treści (Content)</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>Nasycenie frazami, struktura nagłówków (H1-H6), duplikacja treści oraz profil słów kluczowych.</p>
            </RevealItem>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔗</div>
              <h3 style={{ color: '#D85A30', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 700 }}>3. Profil Linków Zwrotnych</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>Jakość i toksyczność domen odsyłających, rozkład anchor textów oraz autorytet serwisu.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
