'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

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
    <main style={{ background: '#F8FAFC', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqAudyt) }}
      />
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '170px', paddingBottom: '90px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '25%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '350px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.08) 0%, rgba(248, 250, 252, 0) 80%)',
          filter: 'blur(75px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '100px', 
              background: '#FFFFFF', 
              border: '1px solid rgba(216, 90, 48, 0.25)', 
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.08)', 
              color: '#D85A30', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              marginBottom: '1.5rem' 
            }}>
              <span className="asterisk">✳</span> LEAD MAGNET & DIAGNOSTYKA
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#0F172A', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Profesjonalny <span style={{ 
                background: 'linear-gradient(135deg, #D85A30 0%, #7C3AED 50%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>Audyt SEO</span> Strony i Sklepu
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '780px', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Odkryj przyczyny braku pozycji w Google i odblokuj pełny potencjał sprzedażowy serwisu. Przeprowadzamy weryfikację ponad 50 elementów technicznych i treściowych.
            </p>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
              Zamów Audyt Strony →
            </a>
          </Reveal>
        </div>
      </section>

      {/* Feature Grid Section */}
      <section style={{ padding: '90px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#0F172A', marginBottom: '3rem', fontFamily: "'Space Grotesk', sans-serif" }}>
              Co Analizujemy Podczas Audytu SEO?
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -6 }}
                style={{ background: '#F8FAFC', padding: '2.5rem', borderRadius: '28px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚡</div>
                <h3 style={{ color: '#D85A30', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 800 }}>1. SEO Techniczne i Szybkość</h3>
                <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.65 }}>Core Web Vitals (LCP, CLS, INP), kody odpowiedzi HTTP, kanibalizacja i błędy indeksowania.</p>
              </motion.div>
            </RevealItem>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -6 }}
                style={{ background: '#F8FAFC', padding: '2.5rem', borderRadius: '28px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📝</div>
                <h3 style={{ color: '#7C3AED', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 800 }}>2. Architektura Treści (Content)</h3>
                <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.65 }}>Nasycenie frazami, struktura nagłówków (H1-H6), duplikacja treści oraz profil słów kluczowych.</p>
              </motion.div>
            </RevealItem>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -6 }}
                style={{ background: '#F8FAFC', padding: '2.5rem', borderRadius: '28px', border: '1px solid #E2E8F0', boxShadow: '0 10px 25px rgba(0,0,0,0.02)' }}
              >
                <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔗</div>
                <h3 style={{ color: '#2563EB', fontSize: '1.3rem', marginBottom: '0.75rem', fontWeight: 800 }}>3. Profil Linków Zwrotnych</h3>
                <p style={{ color: '#475569', fontSize: '0.975rem', lineHeight: 1.65 }}>Jakość i toksyczność domen odsyłających, rozkład anchor textów oraz autorytet serwisu.</p>
              </motion.div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
