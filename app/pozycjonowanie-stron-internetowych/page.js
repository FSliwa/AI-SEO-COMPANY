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
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '2.5rem', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> USŁUGA GŁÓWNA SEO
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              Pozycjonowanie Stron Internetowych <br />
              <span style={{ color: 'var(--color-cta)' }}>&amp; Sklepów E-commerce</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '2.5rem' }}>
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

      {/* Process Section matching main site Services style */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> NASZ PROCES POZYCJONOWANIA
            </div>
            <h2>Jak Działa Skuteczne Pozycjonowanie Stron w AI SEO COMPANY?</h2>
            <p>Trzyetapowa strategia wzrostu widoczności poparta twardymi danymi analitycznymi.</p>
          </Reveal>

          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              </div>
              <h3>1. Audyt Techniczny &amp; CWV</h3>
              <p>Eliminujemy błędy indeksowania, przyspieszamy ładowanie strony (Core Web Vitals) i poprawiamy architekturę linkowania wewnętrznego.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.1)', color: 'var(--color-cta)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
              </div>
              <h3>2. Content Marketing &amp; AI</h3>
              <p>Tworzymy klastry tematyczne (Topic Clusters) oraz semantyczne treści odpowiadające na pytania użytkowników w Google i modelach LLM.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-growth)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
              </div>
              <h3>3. Link Building &amp; Autorytet</h3>
              <p>Pozyskujemy wartościowe odnośniki z cenionych portali i serwisów branżowych, zwiększając autorytet Twojej domeny (Domain Rating).</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pricing Component */}
      <Pricing />

      {/* FAQ Section */}
      <section style={{ padding: '80px 0', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '900px' }}>
          <Reveal className="section-header">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> FAQ
            </div>
            <h2>Najczęściej Zadawane Pytania</h2>
            <p>Odpowiedzi na kluczowe pytania dotyczące pozycjonowania stron.</p>
          </Reveal>

          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginTop: '2.5rem' }}>
            {faqSchema.mainEntity.map((item, index) => (
              <RevealItem key={index}>
                <div style={{ background: 'var(--color-card-bg)', padding: '2rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-sm)' }}>
                  <h3 style={{ fontSize: '1.2rem', color: 'var(--color-text-dark)', marginBottom: '0.75rem', fontWeight: 800 }}>{item.name}</h3>
                  <p style={{ color: 'var(--color-text-muted)', lineHeight: 1.65, fontSize: '0.95rem' }}>{item.acceptedAnswer.text}</p>
                </div>
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
