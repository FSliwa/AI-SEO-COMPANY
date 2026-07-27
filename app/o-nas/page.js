'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export default function ONasPage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Section */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', position: 'relative' }}>
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

          {/* Metric Cards Grid matching main site */}
          <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem', marginTop: '2rem' }}>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -5, borderColor: 'var(--color-border-hover)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--color-card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '2.5rem 2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  99.4<span style={{ color: 'var(--color-cta)' }}>%</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginTop: '0.75rem', marginBottom: '0.35rem' }}>Skuteczność audytów</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>Wykrywanie wąskich gardeł kodu oraz optymalizacja wskaźników Core Web Vitals.</div>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -5, borderColor: 'var(--color-border-hover)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--color-card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '2.5rem 2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  4.9<span style={{ color: 'var(--color-cta)' }}>★</span>
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginTop: '0.75rem', marginBottom: '0.35rem' }}>Średnia Ocena Klientów</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>Wyróżnienie Top Rated Agency za mierzalne wzrosty pozycji i profesjonalny kontakt.</div>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -5, borderColor: 'var(--color-border-hover)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: 'var(--color-card-bg)',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-border)',
                  padding: '2.5rem 2rem',
                  boxShadow: 'var(--shadow-md)'
                }}
              >
                <div style={{ fontSize: '3.2rem', fontWeight: 800, color: 'var(--color-text-dark)', letterSpacing: '-0.03em', lineHeight: 1 }}>
                  &lt; 2h
                </div>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-dark)', marginTop: '0.75rem', marginBottom: '0.35rem' }}>Czas Reakcji Supportu</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.55 }}>Bezpośredni kontakt z dedykowanym inżynierem SEO bez zbędnych pośredników.</div>
              </motion.div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pillars Section matching main site Services style */}
      <section style={{ padding: '80px 0', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container">
          <Reveal className="section-header" style={{ marginBottom: '3.5rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> FILARY DZIAŁANIA
            </div>
            <h2>Trzy filary naszej przewagi na rynku</h2>
            <p>Łączymy inżynierię oprogramowania z analityką i tworzeniem wysokiej jakości treści.</p>
          </Reveal>

          <RevealStagger className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(24, 95, 165, 0.1)', color: 'var(--color-primary)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20V10"/><path d="M18 20V4"/><path d="M6 20v-4"/></svg>
              </div>
              <h3>01 — Data-Driven SEO</h3>
              <p>Decyzje podejmujemy na podstawie analizy Search Intent, algorytmów semantycznych oraz profilu linków. Budujemy pozycje na twardych danych analitycznych.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(216, 90, 48, 0.1)', color: 'var(--color-cta)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>
              </div>
              <h3>02 — High-End Web Design</h3>
              <p>Projektujemy strony internetowe w Next.js, które ładują się w ułamku sekundy (Core Web Vitals) i budują wysoki prestiż oraz zaufanie klientów.</p>
            </RevealItem>

            <RevealItem className="service-card">
              <div className="service-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--color-growth)' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v8"/><path d="M8 12h8"/></svg>
              </div>
              <h3>03 — LLM & AI Search</h3>
              <p>Przygotowujemy Twoją witrynę nie tylko na tradycyjne Google, ale również na wyszukiwarki AI (Perplexity, ChatGPT, SGE Generative Search).</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Official Registry Card (NAP + E-E-A-T) */}
      <section style={{ padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: '960px' }}>
          <Reveal>
            <div style={{
              background: 'var(--color-card-bg)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: '3rem 2.5rem',
              boxShadow: 'var(--shadow-md)'
            }}>
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
