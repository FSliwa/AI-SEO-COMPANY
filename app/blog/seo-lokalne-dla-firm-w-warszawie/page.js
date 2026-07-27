'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleLokalnePage() {
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '100px', position: 'relative' }}>
        <div className="container" style={{ maxWidth: '880px' }}>
          <Reveal>
            <a href="/blog" style={{ color: 'var(--color-cta)', textDecoration: 'none', fontWeight: 700, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              ← Powrót do Bloga
            </a>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span className="section-tag" style={{ color: 'var(--color-primary)', padding: '0.35rem 0.85rem', background: 'rgba(24, 95, 165, 0.1)', borderRadius: 'var(--radius-full)' }}>
                <span className="asterisk">✳</span> LOKALNE SEO WARSZAWA
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>6 min czytania • 10 Lipca 2026</span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', 
              fontWeight: 800, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.75rem', 
              lineHeight: 1.15,
              letterSpacing: '-0.02em'
            }}>
              SEO Lokalne dla firm w Warszawie — Jak zdominować wyniki i Mapy?
            </h1>

            <p style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', lineHeight: 1.65, marginBottom: '3rem', borderLeft: '3px solid var(--color-primary)', paddingLeft: '1.25rem' }}>
              Rynek usług lokalnych w Warszawie charakteryzuje się ogromną konkurencją. Aby docierać do klientów ze swojej dzielnicy, musisz zsynchronizować optymalizację serwisu z profilem Google Profil Firmy.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="service-card" style={{ padding: '3rem 2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', color: 'var(--color-text-dark)', marginTop: '0', marginBottom: '1.25rem', fontWeight: 800 }}>
                Strategiczne filary pozycjonowania lokalnego
              </h2>
              <ul className="service-features" style={{ borderTop: 'none', paddingTop: 0, marginBottom: '2rem' }}>
                <li>Spójność wizytówki i witryny pod kątem danych NAP (Name, Address, Phone)</li>
                <li>Optymalizacja kategorii głównych oraz słów kluczowych w Google Profil Firmy</li>
                <li>Pozyskiwanie opinii klientów z frazami lokalnymi i geolokalizacją</li>
              </ul>

              <div style={{ background: 'var(--color-bg-alt)', border: '1px solid var(--color-border)', padding: '2.25rem', borderRadius: 'var(--radius-md)', margin: '2.5rem 0' }}>
                <h3 style={{ color: 'var(--color-text-dark)', margin: 0, marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 800 }}>
                  Szukasz pozycjonowania w Warszawie?
                </h3>
                <p style={{ margin: 0, color: 'var(--color-text-muted)', fontSize: '1rem', marginBottom: '1.25rem' }}>
                  Sprawdź dedykowaną ofertę i dowiedz się, jak pozycjonujemy lokalne firmy w stolicy.
                </p>
                <a href="/seo-lokalne-warszawa" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
                  SEO Lokalne Warszawa →
                </a>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
