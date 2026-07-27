'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Ile trwa pozycjonowanie stron internetowych?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Pierwsze efekty wzrostu widoczności pojawiają się po 4-8 tygodniach od optymalizacji technicznej. Ustabilizowane wysokie pozycje na konkurencyjne frazy kluczowe buduje się zazwyczaj w horyzoncie 3 do 6 miesięcy.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Czym różni się pozycjonowanie z AI od tradycyjnego SEO?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Model AI SEO COMPANY analizuje zapytania użytkowników w kontekście intencji wyszukiwania (Search Intent) oraz wyszukiwania semantycznego (LLM Search), optymalizując treści pod kątem tradycyjnego Google oraz wyszukiwarek AI (ChatGPT, Perplexity).'
      }
    },
    {
      '@type': 'Question',
      'name': 'Czy pozycjonowanie stron gwarantuje pozycję nr 1 w Google?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Żadna uczciwa agencja nie gwarantuje statycznej pozycji nr 1 ze względu na zmienność algorytmów Google. Gwarantujemy natomiast stały wzrost widoczności, jakościowego ruchu oraz optymalizację współczynnika konwersji (CRO).'
      }
    }
  ]
};

export default function PozycjonowanieStronPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      {/* Hero Banner with Apple Ambient Glow */}
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
              <span className="asterisk">✳</span> USŁUGA GŁÓWNA SEO
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
              Pozycjonowanie Stron Internetowych <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #FF7A59 0%, #D85A30 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>& Sklepów E-commerce</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.65, marginBottom: '2.5rem' }}>
              Zbuduj trwałą przewagę konkurencyjną w Google. Nasza Agencja SEO w Warszawie łączy zaawansowane audyty techniczne, architekturę treści dopasowaną pod AI i intencje zakupowe użytkowników.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2.25rem' }}>
                Zamów Bezpłatną Wycenę →
              </a>
              <a href="/cennik-pozycjonowania" className="btn btn-secondary" style={{ padding: '0.9rem 2.25rem' }}>
                Zobacz Cennik Pakietów
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Section with Framer Motion Stagger */}
      <section style={{ padding: '80px 0', background: 'rgba(255,255,255,0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '3rem', fontFamily: "'Space Grotesk', sans-serif" }}>
              Jak Działa Skuteczne Pozycjonowanie Stron w AI SEO COMPANY?
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>ETAP 01</div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.75rem', fontWeight: 700 }}>1. Audyt Techniczny & CWV</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Eliminujemy błędy indeksowania, przyspieszamy ładowanie strony (Core Web Vitals) i poprawiamy architekturę linkowania wewnętrznego.
              </p>
            </RevealItem>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>ETAP 02</div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.75rem', fontWeight: 700 }}>2. Content Marketing & AI</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Tworzymy klastry tematyczne (Topic Clusters) oraz semantyczne treści odpowiadające na pytania użytkowników w Google i modelach LLM.
              </p>
            </RevealItem>
            <RevealItem style={{ background: 'rgba(15, 23, 42, 0.65)', backdropFilter: 'blur(16px)', padding: '2.25rem', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>ETAP 03</div>
              <h3 style={{ fontSize: '1.4rem', color: '#FFFFFF', marginBottom: '0.75rem', fontWeight: 700 }}>3. Link Building & Autorytet</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Pozyskujemy wartościowe odnośniki z cenionych portali i serwisów branżowych, zwiększając autorytet Twojej domeny (Domain Rating).
              </p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pricing Component */}
      <Pricing />

      {/* FAQ Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '2.5rem', textAlign: 'center', fontFamily: "'Space Grotesk', sans-serif" }}>
              Najczęściej Zadawane Pytania (FAQ)
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqSchema.mainEntity.map((item, index) => (
              <RevealItem key={index} style={{ background: 'rgba(15, 23, 42, 0.75)', backdropFilter: 'blur(12px)', padding: '1.75rem 2rem', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem', fontWeight: 700 }}>{item.name}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.65, fontSize: '0.95rem' }}>{item.acceptedAnswer.text}</p>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
