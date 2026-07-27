'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { motion } from 'framer-motion';

export default function ONasPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Apple-Inspired Hero Banner */}
      <section style={{ paddingTop: '180px', paddingBottom: '100px', position: 'relative' }}>
        {/* Glow ambient background */}
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60vw',
          height: '400px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.18) 0%, rgba(99, 102, 241, 0.12) 50%, rgba(3, 7, 18, 0) 80%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1.25rem' }}>
              <span className="asterisk">✳</span> E-E-A-T & INŻYNIERIA MARKETINGOWA
            </div>
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)', 
              fontWeight: 800, 
              lineHeight: 1.1, 
              color: '#FFFFFF', 
              marginBottom: '1.75rem', 
              letterSpacing: '-0.03em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Łączymy inżynierię oprogramowania <br />
              <span style={{ 
                background: 'linear-gradient(135deg, #FF7A59 0%, #D85A30 50%, #A855F7 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>z precyzją pozycjonowania SEO</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.65, marginBottom: '3rem' }}>
              Jesteśmy warszawską agencją SEO i studiem projektowym. Budujemy wyszukiwalne strony internetowe, automatyzujemy architekturę treści AI i wypychamy marki na czołowe pozycje w Google.
            </p>
          </Reveal>

          {/* Interactive Metric Cards (Apple Style Grid) */}
          <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.75rem', marginTop: '2rem' }}>
            <RevealItem style={{
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.25rem 2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
              transition: 'transform 0.3s ease, border-color 0.3s ease'
            }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                99.4<span style={{ color: '#D85A30' }}>%</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F1F5F9', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Skuteczność audytów</div>
              <div style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5 }}>Wykrywanie wąskich gardeł technicznych i optymalizacja Core Web Vitals.</div>
            </RevealItem>

            <RevealItem style={{
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.25rem 2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
            }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                4.9<span style={{ color: '#D85A30' }}>★</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F1F5F9', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Ocena Klientów</div>
              <div style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5 }}>Średnia ocena satysfakcji z obsługi i wyników pozycjonowania marek B2B.</div>
            </RevealItem>

            <RevealItem style={{
              background: 'rgba(15, 23, 42, 0.65)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.25rem 2rem',
              boxShadow: '0 20px 40px rgba(0,0,0,0.35)'
            }}>
              <div style={{ fontSize: '3.2rem', fontWeight: 800, color: '#FFFFFF', fontFamily: "'Space Grotesk', sans-serif", letterSpacing: '-0.03em' }}>
                &lt; 2h
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 700, color: '#F1F5F9', marginTop: '0.5rem', marginBottom: '0.25rem' }}>Czas Reakcji</div>
              <div style={{ fontSize: '0.9rem', color: '#94A3B8', lineHeight: 1.5 }}>Dedykowane wsparcie i bezpośrednia komunikacja bez pośredników.</div>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Pillars of Expertise Section */}
      <section style={{ padding: '100px 0', background: 'rgba(255, 255, 255, 0.015)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal className="section-header" style={{ marginBottom: '4rem' }}>
            <div className="section-tag" style={{ color: '#D85A30' }}>
              <span className="asterisk">✳</span> DLACZEGO AI SEO COMPANY
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF' }}>
              Trzy filary naszej przewagi na rynku
            </h2>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>01 — ANOLITYKA & ARCHITEKTURA</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>Data-Driven SEO</h3>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.65 }}>
                Decyzje podejmujemy na podstawie analizy Search Intent, algorytmów semantycznych oraz profilu linków. Nie zgadujemy — budujemy pozycje na faktach.
              </p>
            </RevealItem>

            <RevealItem style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>02 — DESIGN INSPIROWANY APPLE</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>Szybkość & High-End UX</h3>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.65 }}>
                Projektujemy strony internetowe, które ładują się w ułamku sekundy (Core Web Vitals) i budują wysoki prestiż oraz zaufanie odwiedzających.
              </p>
            </RevealItem>

            <RevealItem style={{
              background: 'linear-gradient(180deg, rgba(30, 41, 59, 0.6) 0%, rgba(15, 23, 42, 0.8) 100%)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '2.5rem',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#D85A30', letterSpacing: '0.1em', marginBottom: '1rem' }}>03 — INTEGRACJA ZE SZTUCZNĄ INTELIGENCJĄ</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem' }}>LLM & AI Optimization</h3>
              <p style={{ color: '#94A3B8', fontSize: '1rem', lineHeight: 1.65 }}>
                Przygotowujemy Twoją witrynę nie tylko na tradycyjne Google, ale również na wyszukiwarki AI (Perplexity, ChatGPT, SGE Generative Search).
              </p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Company Official Registry Card (NAP + E-E-A-T) */}
      <section style={{ padding: '80px 0', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.5rem' }}>
          <Reveal>
            <div style={{
              background: 'rgba(15, 23, 42, 0.75)',
              backdropFilter: 'blur(20px)',
              borderRadius: '28px',
              border: '1px solid rgba(216, 90, 48, 0.3)',
              padding: '3rem 2.5rem',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5)'
            }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span style={{ color: '#D85A30' }}>🏢</span> Dane Rejestrowe & Siedziba w Warszawie
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', color: '#CBD5E1', lineHeight: 1.7 }}>
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.25rem' }}>Pełna nazwa:</strong>
                  AI SEO COMPANY
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.25rem' }}>Adres rejestrowy:</strong>
                  ul. Grzybowska 12/14 lok. B-3<br />00-132 Warszawa, Polska
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.25rem' }}>Numer NIP:</strong>
                  5253090237
                </div>
                <div>
                  <strong style={{ color: '#FFFFFF', display: 'block', marginBottom: '0.25rem' }}>E-mail:</strong>
                  kontakt@ai-seo-company.pl
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
