'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function ONasPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '70px', position: 'relative' }}>
        <div className="container">
          <Reveal className="section-header" style={{ textAlign: 'left', marginBottom: '3rem', maxWidth: '900px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> E-E-A-T &amp; O NAS
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em'
            }}>
              Łączymy inżynierię oprogramowania <br />
              z precyzją <span style={{ color: 'var(--color-cta)' }}>pozycjonowania SEO</span>
            </h1>
            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '780px' }}>
              Jesteśmy warszawską agencją SEO i studiem web designu. Budujemy szybkie strony internetowe, automatyzujemy architekturę treści AI i wprowadzamy marki na czołowe pozycje w Google.
            </p>
          </Reveal>

          {/* Service Cards Grid for Key Metrics */}
          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.1)', color: 'var(--color-cta)' }}>
                ⚡
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                99.4<span style={{ color: 'var(--color-cta)' }}>%</span>
              </div>
              <h3>Skuteczność Audytów</h3>
              <p>Wykrywanie wąskich gardeł kodu oraz optymalizacja wskaźników Core Web Vitals.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)' }}>
                ★
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                4.9<span style={{ color: 'var(--color-primary)' }}>★</span>
              </div>
              <h3>Ocena Klientów</h3>
              <p>Wyróżnienie Top Rated Agency za mierzalne wzrosty pozycji i profesjonalny kontakt.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-growth)' }}>
                ⏱
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                &lt; 2h
              </div>
              <h3>Czas Reakcji</h3>
              <p>Bezpośredni kontakt z dedykowanym inżynierem SEO bez zbędnych pośredników.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pillars Section using exact KOTA Pillars Row from main site */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Reveal className="section-header" style={{ marginBottom: '3.5rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> FILARY DZIAŁANIA
            </div>
            <h2>Trzy filary naszej przewagi na rynku</h2>
            <p>Łączymy inżynierię oprogramowania z analityką i tworzeniem wysokiej jakości treści.</p>
          </Reveal>

          <RevealStagger className="kota-pillars-row" delay={0.2}>
            <RevealItem style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">01 —</div>
                <h4>Data-Driven SEO</h4>
                <p>Decyzje podejmujemy na podstawie analizy Search Intent, algorytmów semantycznych oraz profilu linków. Budujemy pozycje na twardych danych analitycznych.</p>
              </div>
              <span className="kota-divider-x">✕</span>
            </RevealItem>

            <RevealItem style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">02 —</div>
                <h4>High-End Web Design</h4>
                <p>Projektujemy strony internetowe w Next.js, które ładują się w ułamku sekundy (Core Web Vitals) i budują wysoki prestiż oraz zaufanie klientów.</p>
              </div>
              <span className="kota-divider-x">✕</span>
            </RevealItem>

            <RevealItem style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">03 —</div>
                <h4>LLM &amp; AI Search</h4>
                <p>Przygotowujemy Twoją witrynę nie tylko na tradycyjne Google, ale również na wyszukiwarki AI (Perplexity, ChatGPT, SGE Generative Search).</p>
              </div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Official Registry Card (NAP + E-E-A-T) using main site pricing-card style */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <Reveal>
            <div className="pricing-card" style={{ padding: '3rem 2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: 'var(--color-cta)' }}>🏢</span> Oficjalne Dane Rejestrowe &amp; Siedziba w Warszawie
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.75rem', color: 'var(--color-text-muted)', lineHeight: 1.65 }}>
                <div>
                  <strong style={{ color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.25rem' }}>Podmiot:</strong>
                  AI SEO COMPANY
                </div>
                <div>
                  <strong style={{ color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.25rem' }}>Siedziba:</strong>
                  ul. Grzybowska 12/14 lok. B-3<br />00-132 Warszawa, Polska
                </div>
                <div>
                  <strong style={{ color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.25rem' }}>NIP:</strong>
                  5253090237
                </div>
                <div>
                  <strong style={{ color: 'var(--color-text-dark)', display: 'block', marginBottom: '0.25rem' }}>E-mail:</strong>
                  <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'var(--color-cta)', fontWeight: 600 }}>kontakt@ai-seo-company.pl</a>
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
