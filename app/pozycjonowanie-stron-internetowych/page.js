import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';

export const metadata = {
  title: 'Pozycjonowanie Stron Internetowych — Agencja SEO Warszawa | AI SEO COMPANY',
  description: 'Skuteczne pozycjonowanie stron internetowych i sklepów e-commerce w Google. Wykorzystaj sztuczną inteligencję i architekturę treści, aby zdobyć TOP1.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
  },
  openGraph: {
    title: 'Pozycjonowanie Stron Internetowych — Agencja SEO Warszawa',
    description: 'Zwiększ widoczność swojej firmy w Google. Dedykowana strategia SEO, optymalizacja treści i mierzalny wzrost ruchu.',
    url: 'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

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
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Header />
      
      {/* Hero Banner Podstrony */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> USŁUGA GŁÓWNA SEO
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Pozycjonowanie Stron Internetowych <span style={{ color: '#D85A30' }}>& Sklepów E-commerce</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Zbuduj trwałą przewagę konkurencyjną w Google. Nasza Agencja SEO w Warszawie łączy zaawansowane audyty techniczne, architekturę treści dopasowaną pod AI i intencje zakupowe użytkowników.
          </p>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
              Zamów Bezpłatną Wycenę →
            </a>
            <a href="/cennik-pozycjonowania" className="btn btn-secondary" style={{ padding: '0.9rem 2rem' }}>
              Zobacz Cennik Pakietów
            </a>
          </div>
        </div>
      </section>

      {/* Szczegółowa Treść SEO */}
      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            Jak Działa Skuteczne Pozycjonowanie Stron w AI SEO COMPANY?
          </h2>
          <p style={{ color: '#CBD5E1', lineHeight: 1.7, fontSize: '1.05rem', marginBottom: '2rem' }}>
            Pozycjonowanie stron (SEO) to wieloetapowy proces ciągłej optymalizacji serwisu pod kątem algorytmów wyszukiwarek oraz doświadczeń użytkownika (UX/Core Web Vitals). Nie skupiamy się wyłącznie na generycznych frazach — budujemy stabilny i konwertujący ruch z wyszukiwarek.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '3rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#D85A30', marginBottom: '0.75rem' }}>1. Audyt Techniczny & CWV</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Eliminujemy błędy indeksowania, przyspieszamy ładowanie strony (Core Web Vitals) i poprawiamy architekturę linkowania wewnętrznego.
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#D85A30', marginBottom: '0.75rem' }}>2. Content Marketing & AI</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Tworzymy klastry tematyczne (Topic Clusters) oraz semantyczne treści odpowiadające na pytania użytkowników w Google i modelach LLM.
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ fontSize: '1.3rem', color: '#D85A30', marginBottom: '0.75rem' }}>3. Link Building & Autorytet</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6 }}>
                Pozyskujemy wartościowe odnośniki z cenionych portali i serwisów branżowych, zwiększając autorytet Twojej domeny (Domain Rating).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pakiety Cennikowe Component */}
      <Pricing />

      {/* Sekcja FAQ */}
      <section style={{ padding: '80px 0', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '2.5rem', textAlign: 'center' }}>
            Najczęściej Zadawane Pytania (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {faqSchema.mainEntity.map((item, index) => (
              <div key={index} style={{ background: 'rgba(15, 23, 42, 0.8)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#FFFFFF', marginBottom: '0.75rem' }}>{item.name}</h3>
                <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.95rem' }}>{item.acceptedAnswer.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
