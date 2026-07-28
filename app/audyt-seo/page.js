export const metadata = {
  title: 'Audyt SEO | Analiza i optymalizacja — AI SEO COMPANY',
  description: 'Kompleksowy audyt SEO. Znajdziemy błędy techniczne na Twojej stronie i przygotujemy strategię, która natychmiast poprawi Twoje pozycje w Google.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
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
      <section style={{ paddingTop: '180px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> AUDYT SEO
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              Diagnoza Techniczna.<br />Odblokowanie Wzrostu.
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
              Odkryj prawdziwe przyczyny braku widoczności w Google i odblokuj pełny potencjał sprzedażowy serwisu. Weryfikujemy ponad 50 krytycznych elementów algorytmu.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                Zamów Audyt Strony
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Feature Grid Section - Apple Bento Grid Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              Obszary Analizy.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              Kompleksowa weryfikacja techniczna, strukturalna i semantyczna.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Technikalia & CWV.</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Analiza Core Web Vitals (LCP, CLS, INP), poprawności kodów HTTP, przekierowań i eliminacja barier dla robotów indeksujących.</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Architektura Treści.</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Badanie struktury nagłówków, architektury informacji, thin contentu oraz kanibalizacji słów kluczowych.</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Profil Linków.</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Weryfikacja toksyczności linków przychodzących, analiza anchor textów oraz badanie domen odsyłających w modelu AI.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Portfolio />

      {/* FAQ Section - Apple Style */}
      <section style={{ padding: '40px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              Q&amp;A.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              Często zadawane pytania.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {faqAudyt.mainEntity.map((item, index) => (
              <RevealItem key={index}>
                <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#1D1D1F', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.name}</h3>
                  <p style={{ color: '#6E6E73', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.acceptedAnswer.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
