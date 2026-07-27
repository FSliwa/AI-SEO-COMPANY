export const metadata = {
  title: 'Pozycjonowanie Stron WWW | SEO B2B i B2C — AI SEO COMPANY',
  description: 'Skuteczne pozycjonowanie stron internetowych oparte na danych. Podniesiemy widoczność Twojego biznesu i przekształcimy ruch w płacących klientów.',
};

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
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      {/* Hero Banner - Apple Style */}
      <section style={{ paddingTop: '200px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '0.85rem', color: '#86868B', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                Pozycjonowanie
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
              Pozycjonowanie Stron.<br />Sklepów E-commerce.
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
              Zbuduj trwałą przewagę konkurencyjną. Łączymy zaawansowane audyty techniczne i architekturę treści dopasowaną pod sztuczną inteligencję.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                Zamów Wycenę
              </a>
              <a href="/#cennik" style={{ display: 'inline-block', background: 'rgba(0,0,0,0.05)', color: '#1D1D1F', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none' }}>
                Cennik Pakietów
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process Section - Apple Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Jak Działamy.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Trzyetapowa strategia wzrostu oparta na twardych danych.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 1</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Audyt Techniczny &amp; CWV.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 2</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Content Marketing &amp; AI.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i modeli LLM.</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 3</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.1 }}>Link Building.</h3>
              <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Pozyskujemy odnośniki z cenionych portali, systematycznie zwiększając autorytet Twojej domeny.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pricing Section Container to embed Pricing */}
      <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '4rem 0', margin: '0 24px' }}>
        <Pricing />
      </div>

      {/* FAQ Section - Apple Style */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Odpowiedzi.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Najczęściej zadawane pytania dotyczące pozycjonowania.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {faqSchema.mainEntity.map((item, index) => (
              <RevealItem key={index}>
                <div style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                  <h3 style={{ fontSize: '1.35rem', color: '#1D1D1F', marginBottom: '1rem', fontWeight: 700, letterSpacing: '-0.01em' }}>{item.name}</h3>
                  <p style={{ color: '#86868B', lineHeight: 1.6, fontSize: '1.1rem' }}>{item.acceptedAnswer.text}</p>
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
