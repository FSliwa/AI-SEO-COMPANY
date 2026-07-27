'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function ONasPage() {
  return (
    <main style={{ backgroundColor: '#F5F5F7', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Section - Apple Style */}
      <section style={{ paddingTop: '200px', paddingBottom: '100px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <Reveal>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '2rem',
              letterSpacing: '-0.04em'
            }}>
              Łączymy inżynierię oprogramowania z pozycjonowaniem.
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#86868B', 
              lineHeight: 1.5, 
              maxWidth: '780px', 
              margin: '0 auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Jesteśmy agencją SEO i studiem web designu. Budujemy strony internetowe i wprowadzamy marki na czołowe pozycje.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Metrics Section - Apple Style Cards */}
      <section style={{ paddingBottom: '120px' }}>
        <div className="container">
          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem 3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>
                99.4<span style={{ fontSize: '2.5rem', color: '#86868B' }}>%</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1D1D1F', marginBottom: '0.5rem' }}>Skuteczność Audytów</h3>
              <p style={{ color: '#86868B', fontSize: '1rem', lineHeight: 1.5 }}>Wykrywanie wąskich gardeł kodu oraz optymalizacja wskaźników Core Web Vitals.</p>
            </RevealItem>

            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem 3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>
                4.9<span style={{ fontSize: '2.5rem', color: '#86868B' }}>★</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1D1D1F', marginBottom: '0.5rem' }}>Ocena Klientów</h3>
              <p style={{ color: '#86868B', fontSize: '1rem', lineHeight: 1.5 }}>Top Rated Agency za mierzalne wzrosty pozycji i profesjonalny kontakt.</p>
            </RevealItem>

            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem 3rem', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '4.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1, marginBottom: '0.5rem' }}>
                &lt; 2<span style={{ fontSize: '2.5rem', color: '#86868B' }}>h</span>
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#1D1D1F', marginBottom: '0.5rem' }}>Czas Reakcji</h3>
              <p style={{ color: '#86868B', fontSize: '1rem', lineHeight: 1.5 }}>Bezpośredni kontakt z dedykowanym inżynierem bez pośredników.</p>
            </RevealItem>

          </RevealStagger>
        </div>
      </section>

      {/* Pillars Section - Apple Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Trzy filary naszej przewagi.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Łączymy inżynierię oprogramowania z analityką i tworzeniem treści.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>01</div>
              <h4 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>Data-Driven SEO</h4>
              <p style={{ color: '#86868B', fontSize: '1.05rem', lineHeight: 1.5 }}>Decyzje podejmujemy na podstawie analizy Search Intent i algorytmów semantycznych.</p>
            </RevealItem>

            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>02</div>
              <h4 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>High-End Web Design</h4>
              <p style={{ color: '#86868B', fontSize: '1.05rem', lineHeight: 1.5 }}>Projektujemy strony w Next.js, które ładują się natychmiast i budują prestiż.</p>
            </RevealItem>

            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#86868B', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>03</div>
              <h4 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1rem', lineHeight: 1.1 }}>LLM &amp; AI Search</h4>
              <p style={{ color: '#86868B', fontSize: '1.05rem', lineHeight: 1.5 }}>Przygotowujemy witrynę na wyszukiwarki AI takie jak Perplexity czy SGE.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Case Studies "Odkryj nowości" - Apple Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container">
          <Reveal style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', marginBottom: '1rem' }}>
              Odkryj nowości naszych klientów.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#86868B', maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
              Przykłady mierzalnych wzrostów i nowoczesnego projektowania.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86868B', letterSpacing: '0.05em', marginBottom: '1rem' }}>CASE STUDY — ASE-BOT</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>+4.8k Wyświetleń <br/>w Kwartał.</h3>
                <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Kompleksowe pozycjonowanie serwisu B2B. Architektura treści SEO przyniosła stały wzrost ruchu.</p>
              </div>
            </RevealItem>

            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '4rem 3rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', minHeight: '400px' }}>
              <div>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#86868B', letterSpacing: '0.05em', marginBottom: '1rem' }}>CASE STUDY — STANIAX</div>
                <h3 style={{ fontSize: '2.5rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.03em', lineHeight: 1.1, marginBottom: '1.5rem' }}>Nowy Branding <br/>&amp; Skalowanie.</h3>
                <p style={{ color: '#86868B', fontSize: '1.1rem', lineHeight: 1.5 }}>Nowoczesny portal korporacyjny zintegrowany z systemem pozycjonowania. Czas ładowania &lt; 0.8s.</p>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Official Registry Card - Ultra Minimal */}
      <section style={{ padding: '0 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <Reveal>
            <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '4rem', textAlign: 'center' }}>
              <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center' }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
                  <line x1="9" y1="6" x2="9" y2="6.01"/>
                  <line x1="15" y1="6" x2="15" y2="6.01"/>
                  <line x1="9" y1="10" x2="9" y2="10.01"/>
                  <line x1="15" y1="10" x2="15" y2="10.01"/>
                  <line x1="9" y1="14" x2="9" y2="14.01"/>
                  <line x1="15" y1="14" x2="15" y2="14.01"/>
                  <line x1="9" y1="18" x2="15" y2="18"/>
                </svg>
              </div>
              <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '2.5rem' }}>
                Oficjalne Dane Rejestrowe
              </h2>
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', color: '#86868B', fontSize: '1.05rem', lineHeight: 1.5 }}>
                <div style={{ textAlign: 'left' }}>
                  <strong style={{ color: '#1D1D1F', display: 'block', marginBottom: '0.25rem' }}>Podmiot</strong>
                  AI SEO COMPANY
                </div>
                <div style={{ textAlign: 'left' }}>
                  <strong style={{ color: '#1D1D1F', display: 'block', marginBottom: '0.25rem' }}>Siedziba</strong>
                  ul. Grzybowska 12/14 lok. B-3<br />00-132 Warszawa
                </div>
                <div style={{ textAlign: 'left' }}>
                  <strong style={{ color: '#1D1D1F', display: 'block', marginBottom: '0.25rem' }}>NIP</strong>
                  5253090237
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
