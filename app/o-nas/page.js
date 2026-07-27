'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export default function ONasPage() {
  return (
    <main style={{ background: '#F8FAFC', color: '#0F172A', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Apple Intelligence Light Hero Section */}
      <section style={{ paddingTop: '170px', paddingBottom: '90px', position: 'relative' }}>
        {/* Soft iridescent ambient background glow */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '65vw',
          height: '420px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.08) 0%, rgba(99, 102, 241, 0.07) 40%, rgba(168, 85, 247, 0.05) 70%, rgba(248, 250, 252, 0) 100%)',
          filter: 'blur(70px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '100px', 
              background: '#FFFFFF', 
              border: '1px solid rgba(216, 90, 48, 0.25)', 
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.08)', 
              color: '#D85A30', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              marginBottom: '1.5rem' 
            }}>
              <span className="asterisk">✳</span> E-E-A-T & INŻYNIERIA MARKETINGOWA
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#0F172A', 
              marginBottom: '1.75rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Łączymy inżynierię oprogramowania <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #D85A30 0%, #7C3AED 50%, #2563EB 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>z technologią pozycjonowania AI</span>
            </h1>

            <p style={{ fontSize: '1.25rem', color: '#475569', maxWidth: '780px', lineHeight: 1.65, marginBottom: '3.5rem' }}>
              Jesteśmy agencją SEO i studiem projektowym w Warszawie. Projektujemy wyszukiwalne strony internetowe, budujemy architekturę treści AI i wprowadzamy marki do czołówki wyników w Google.
            </p>
          </Reveal>

          {/* Apple Intelligence Style Interactive Cards */}
          <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(216, 90, 48, 0.15)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.04em' }}>
                  99.4<span style={{ color: '#D85A30' }}>%</span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.35rem' }}>Precyzja audytów SEO</div>
                <div style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.55 }}>Eliminacja wąskich gardeł kodu oraz pełna optymalizacja wskaźników Core Web Vitals.</div>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(124, 58, 237, 0.15)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.04em' }}>
                  4.9<span style={{ color: '#7C3AED' }}>★</span>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.35rem' }}>Średnia Ocena Klientów</div>
                <div style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.55 }}>Najwyższa opinia za terminowość, mierzalne wyniki i transparentną współpracę.</div>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -6, boxShadow: '0 20px 40px -10px rgba(37, 99, 235, 0.15)' }}
                transition={{ duration: 0.3 }}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.04)'
                }}
              >
                <div style={{ fontSize: '3.5rem', fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.04em' }}>
                  &lt; 2h
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 700, color: '#0F172A', marginTop: '0.5rem', marginBottom: '0.35rem' }}>Czas Reakcji Supportu</div>
                <div style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: 1.55 }}>Direct-line z opiekunem projektu. Bez zbędnych korpo-procedur.</div>
              </motion.div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pillars Section */}
      <section style={{ padding: '90px 0', background: '#FFFFFF', borderTop: '1px solid #E2E8F0', borderBottom: '1px solid #E2E8F0' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal className="section-header" style={{ marginBottom: '4rem' }}>
            <div style={{ 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '0.5rem', 
              padding: '0.4rem 1rem', 
              borderRadius: '100px', 
              background: '#F1F5F9', 
              color: '#D85A30', 
              fontWeight: 700, 
              fontSize: '0.85rem', 
              marginBottom: '1rem' 
            }}>
              <span className="asterisk">✳</span> METODOLOGIA i FILARY
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#0F172A', fontFamily: "'Space Grotesk', sans-serif" }}>
              Trzy filary sukcesu naszych klientów
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem>
              <motion.div 
                whileHover={{ y: -5 }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>01 — ANOLITYKA DANYCH</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Data-Driven SEO</h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65 }}>
                  Decyzje podejmujemy na podstawie analizy Search Intent, algorytmów semantycznych oraz profilu linków. Nie zgadujemy — budujemy pozycje na faktach.
                </p>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -5 }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#7C3AED', letterSpacing: '0.1em', marginBottom: '1rem' }}>02 — DESIGN APPLE STYLE</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>Szybkość & High-End UX</h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65 }}>
                  Projektujemy strony internetowe, które ładują się w ułamku sekundy (Core Web Vitals) i budują wysoki prestiż oraz zaufanie odwiedzających.
                </p>
              </motion.div>
            </RevealItem>

            <RevealItem>
              <motion.div 
                whileHover={{ y: -5 }}
                style={{
                  background: '#F8FAFC',
                  borderRadius: '28px',
                  border: '1px solid #E2E8F0',
                  padding: '2.5rem',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.02)'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#2563EB', letterSpacing: '0.1em', marginBottom: '1rem' }}>03 — SEARCH INTENT & AI</div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#0F172A', marginBottom: '1rem' }}>LLM & AI Optimization</h3>
                <p style={{ color: '#475569', fontSize: '1rem', lineHeight: 1.65 }}>
                  Przygotowujemy Twoją witrynę nie tylko na tradycyjne Google, ale również na wyszukiwarki AI (Perplexity, ChatGPT, SGE Generative Search).
                </p>
              </motion.div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Official Registry Card (NAP + E-E-A-T) */}
      <section style={{ padding: '90px 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '960px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <div style={{
              background: '#FFFFFF',
              borderRadius: '32px',
              border: '1px solid rgba(216, 90, 48, 0.25)',
              padding: '3.5rem 3rem',
              boxShadow: '0 20px 50px -10px rgba(216, 90, 48, 0.1)',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '200px',
                height: '200px',
                background: 'radial-gradient(circle at top right, rgba(216, 90, 48, 0.1), transparent 70%)',
                pointerEvents: 'none'
              }} />

              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0F172A', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#D85A30' }}>🏢</span> Oficjalne Dane Rejestrowe & Siedziba w Warszawie
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', color: '#475569', lineHeight: 1.7, fontSize: '1.05rem' }}>
                <div>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>Podmiot:</strong>
                  AI SEO COMPANY
                </div>
                <div>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>Siedziba:</strong>
                  ul. Grzybowska 12/14 lok. B-3<br />00-132 Warszawa, Polska
                </div>
                <div>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>NIP:</strong>
                  5253090237
                </div>
                <div>
                  <strong style={{ color: '#0F172A', display: 'block', marginBottom: '0.35rem' }}>Kontakt E-mail:</strong>
                  <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: '#D85A30', textDecoration: 'underline', fontWeight: 600 }}>kontakt@ai-seo-company.pl</a>
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
