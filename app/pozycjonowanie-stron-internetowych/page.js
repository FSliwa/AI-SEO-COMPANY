export const metadata = {
  title: 'Pozycjonowanie Stron WWW | SEO B2B i B2C — AI SEO COMPANY',
  description: 'Skuteczne pozycjonowanie stron internetowych oparte na danych. Podniesiemy widoczność Twojego biznesu i przekształcimy ruch w płacących klientów.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
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

const carouselItems = [
  {
    number: '01 — WIDOCZNOŚĆ',
    metric: '+340%',
    title: 'Wzrost ruchu komercyjnego',
    description: 'Błyskawiczne skalowanie ruchu z zapytań o najwyższej intencji zakupowej w modelu wyszukiwania semantycznego.'
  },
  {
    number: '02 — STRATEGIA',
    metric: 'TOP 3',
    title: 'Kluczowe frazy branżowe',
    description: 'Wprowadzamy Twoje flagowe produkty i usługi na podium wyników organicznych wyszukiwarki Google.'
  },
  {
    number: '03 — ARCHITEKTURA',
    metric: '100%',
    title: 'Topic Clusters & Authority',
    description: 'Tworzymy klastry tematyczne odpowiadające na pytania użytkowników, budując autorytet domeny.'
  },
  {
    number: '04 — AUTORYTET',
    metric: 'High DR',
    title: 'Jakościowy Link Building',
    description: 'Pozyskujemy editorialne odnośniki z najbardziej cenionych polskich i zagranicznych portali biznesowych.'
  }
];

export default function PozycjonowanieStronPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        {/* Hero Banner - Apple Style */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> POZYCJONOWANIE STRON
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: '#1D1D1F', 
                marginBottom: '1.5rem', 
                letterSpacing: '-0.04em'
              }}>
                Organiczny Wzrost<br />Maksymalna Konwersja
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
                Zbuduj trwałą przewagę konkurencyjną. Łączymy zaawansowane audyty techniczne i architekturę treści dopasowaną pod nowoczesną wyszukiwarkę.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  Zamów Wycenę
                </a>
                <a href="#cennik" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', color: '#1D1D1F', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  Cennik Pakietów
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Process Section - Apple Style Bento Grid */}
        <section style={{ padding: '80px 0 100px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Jak Działamy
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Trzyetapowa strategia wzrostu oparta na twardych danych analitycznych.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Audyt Techniczny &amp; CWV</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Content Marketing</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i intencje wyszukiwania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Link Building</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Pozyskujemy jakościowe odnośniki z cenionych portali, systematycznie budując zaufanie i autorytet Twojej domeny.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Apple Interactive Carousel Section */}
        <ServiceCarousel 
          tag="FILARY SKALOWANIA WIDOCZNOŚCI"
          title="Przewaga w Wynikach Organicznych"
          subtitle="Odkryj mechanizmy, które napędzają wzrost Twojego biznesu w wyszukiwarce Google."
          items={carouselItems}
        />

        <Pricing />

        {/* FAQ Section - Apple Style */}
        <section style={{ padding: '100px 0' }}>
          <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Najczęstsze pytania
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Transparentne odpowiedzi na Twoje wątpliwości.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              {faqSchema.mainEntity.map((item, index) => (
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

        {/* Custom Knowledge Section for SEO */}
        <section style={{ padding: '80px 0 120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
                <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> WIEDZA EKSPERCKA
              </div>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Sekrety Pozycjonowania
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Sprawdzone strategie dla nowoczesnych wyszukiwarek.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wyszukiwanie Semantyczne</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>W 2026 roku nie pozycjonujemy na pojedyncze słowa, ale odpowiadamy na intencje. Tworzymy tzw. Topic Clusters budujące Topical Authority domeny w konkretnej niszy.</p>
              </RevealItem>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>AI Search (SGE)</h3>
                <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Optymalizujemy treści nie tylko dla tradycyjnego bota Google, ale również pod kątem modeli językowych generujących bezpośrednie odpowiedzi (LLM-based Search).</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
