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
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqAudyt) }}
      />
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> DIAGNOSTYKA &amp; AUDYT
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              Profesjonalny <span style={{ color: 'var(--color-cta)' }}>Audyt SEO</span> Strony i Sklepu
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Odkryj przyczyny braku pozycji w Google i odblokuj pełny potencjał sprzedażowy serwisu. Przeprowadzamy weryfikację ponad 50 elementów technicznych i treściowych.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              Zamów Audyt Strony →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Feature Grid Section matching main site Services style */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> ZAKRES AUDYTU
            </div>
            <h2>Co Analizujemy Podczas Audytu SEO?</h2>
            <p>Kompleksowa weryfikacja techniczna, architektoniczna i profilu autorytetu.</p>
          </Reveal>

          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.1)', color: 'var(--color-cta)' }}>
                ⚡
              </div>
              <h3>1. SEO Techniczne i Szybkość</h3>
              <p>Core Web Vitals (LCP, CLS, INP), kody odpowiedzi HTTP, kanibalizacja i błędy indeksowania.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)' }}>
                📝
              </div>
              <h3>2. Architektura Treści (Content)</h3>
              <p>Nasycenie frazami, struktura nagłówków (H1-H6), duplikacja treści oraz profil słów kluczowych.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-growth)' }}>
                🔗
              </div>
              <h3>3. Profil Linków Zwrotnych</h3>
              <p>Jakość i toksyczność domen odsyłających, rozkład anchor textów oraz autorytet serwisu.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
