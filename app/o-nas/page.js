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

          {/* Metric Cards Grid with Clean SVG Icons */}
          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.08)', color: 'var(--color-cta)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                </svg>
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                99.4<span style={{ color: 'var(--color-cta)' }}>%</span>
              </div>
              <h3>Skuteczność Audytów</h3>
              <p>Wykrywanie wąskich gardeł kodu oraz optymalizacja wskaźników Core Web Vitals.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.08)', color: 'var(--color-primary)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                </svg>
              </div>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                4.9<span style={{ color: 'var(--color-primary)' }}>★</span>
              </div>
              <h3>Ocena Klientów</h3>
              <p>Wyróżnienie Top Rated Agency za mierzalne wzrosty pozycji i profesjonalny kontakt.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.08)', color: 'var(--color-growth)' }}>
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
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

      {/* Section "Odkryj nowości naszych klientów" matching Results/Portfolio from main page */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-surface)' }}>
        <div className="container">
          <Reveal className="section-header">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> NASZE WYNIKI
            </div>
            <h2>Odkryj nowości naszych klientów</h2>
            <p>Zobacz przykłady mierzalnych wzrostów widoczności i nowoczesnego projektowania stron.</p>
          </Reveal>

          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', marginTop: '2.5rem' }}>
            <RevealItem className="service-card">
              <div style={{ display: 'inline-block', background: 'var(--color-growth-bg)', color: 'var(--color-growth)', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
                ● CASE STUDY — ASE-BOT
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>+4.8k Wyświetleń w Kwartał</h3>
              <p>Kompleksowe pozycjonowanie serwisu B2B. Architektura treści SEO oraz optymalizacja struktury słów kluczowych przyniosły stały wzrost ruchu organicznego.</p>
              <ul className="service-features" style={{ marginTop: '1.5rem' }}>
                <li>Wzrost widoczności od 0 do 4.8 tys. wyświetleń</li>
                <li>Dedykowana architektura topic clusters</li>
                <li>Optymalizacja konwersji (CRO)</li>
              </ul>
            </RevealItem>

            <RevealItem className="service-card">
              <div style={{ display: 'inline-block', background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)', fontSize: '0.75rem', fontWeight: 700, padding: '0.35rem 0.85rem', borderRadius: 'var(--radius-full)', marginBottom: '1.25rem' }}>
                ● CASE STUDY — STANIAX
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>Nowy Branding &amp; Skalowanie</h3>
              <p>Nowoczesny portal korporacyjny w Next.js zintegrowany z systemem pozycjonowania AI SEO. Pełny rebrand i wzrost zapytaniowości.</p>
              <ul className="service-features" style={{ marginTop: '1.5rem' }}>
                <li>Projektowanie UX/UI w Next.js</li>
                <li>Czas ładowania pod Core Web Vitals (&lt; 0.8s)</li>
                <li>Spójna identyfikacja wizualna B2B</li>
              </ul>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Official Registry Card (NAP + E-E-A-T) with SVG building icon */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <Reveal>
            <div className="pricing-card" style={{ padding: '3rem 2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--color-text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'rgba(216, 90, 48, 0.1)', color: 'var(--color-cta)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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
                Oficjalne Dane Rejestrowe &amp; Siedziba w Warszawie
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
