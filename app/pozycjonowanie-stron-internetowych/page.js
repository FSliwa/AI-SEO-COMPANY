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
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.08)', color: 'var(--color-primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
              </div>
              <h3>1. Audyt Techniczny &amp; CWV</h3>
              <p>Eliminujemy błędy indeksowania, przyspieszamy ładowanie strony (Core Web Vitals) i poprawiamy architekturę linkowania wewnętrznego.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.08)', color: 'var(--color-cta)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
              </div>
              <h3>2. Content Marketing &amp; AI</h3>
              <p>Tworzymy klastry tematyczne (Topic Clusters) oraz semantyczne treści odpowiadające na pytania użytkowników w Google i modelach LLM.</p>
            </RevealItem>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.08)', color: 'var(--color-growth)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
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
                <div className="service-card" style={{ padding: '2rem' }}>
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
