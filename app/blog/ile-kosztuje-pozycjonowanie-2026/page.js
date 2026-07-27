'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleCennikPage() {
  return (
    <main style={{ background: '#030712', color: '#F8FAFC', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '180px', paddingBottom: '100px', position: 'relative' }}>
        <div style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '50vw',
          height: '300px',
          background: 'radial-gradient(circle, rgba(216, 90, 48, 0.15) 0%, rgba(3, 7, 18, 0) 75%)',
          filter: 'blur(90px)',
          pointerEvents: 'none',
          zIndex: 1
        }} />

        <div className="container" style={{ maxWidth: '880px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', zIndex: 2 }}>
          <Reveal>
            <a href="/blog" style={{ color: '#D85A30', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem' }}>
              ← Powrót do Bloga
            </a>

            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginBottom: '1.25rem' }}>
              <span style={{ background: 'rgba(216, 90, 48, 0.15)', color: '#D85A30', padding: '0.35rem 0.85rem', borderRadius: '100px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase' }}>
                CENNIK & BUDŻET SEO
              </span>
              <span style={{ fontSize: '0.85rem', color: '#64748B' }}>4 min czytania • 20 Lipca 2026</span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', 
              fontWeight: 800, 
              color: '#FFFFFF', 
              marginBottom: '1.75rem', 
              lineHeight: 1.15,
              letterSpacing: '-0.02em',
              fontFamily: "'Space Grotesk', system-ui, sans-serif"
            }}>
              Ile kosztuje pozycjonowanie stron internetowych w 2026 roku?
            </h1>

            <p style={{ fontSize: '1.25rem', color: '#CBD5E1', lineHeight: 1.65, marginBottom: '3rem', borderLeft: '3px solid #D85A30', paddingLeft: '1.25rem' }}>
              Koszt pozycjonowania stron zależy od konkurencyjności branży, stanu technicznego witryny oraz zakresu prac content marketingowych i link buildingowych. Sprawdź, z jakimi budżetami należy się liczyć.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(16px)',
              borderRadius: '24px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              padding: '2.5rem 2rem',
              color: '#CBD5E1',
              lineHeight: 1.8,
              fontSize: '1.05rem'
            }}>
              <h2 style={{ fontSize: '1.6rem', color: '#FFFFFF', marginTop: '0', marginBottom: '1.25rem', fontWeight: 700 }}>
                Główne składniki budżetu SEO
              </h2>
              <p style={{ marginBottom: '1.5rem' }}>
                Optymalizacja pod kątem wyszukiwarki Google to nie jednorazowy zabieg, lecz ciągły proces inżynieryjny. W ramach miesięcznego budżetu agencja SEO realizuje prace z zakresu:
              </p>
              <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>Audytu technicznego oraz ciągłego monitorowania błędów indeksacji,</li>
                <li style={{ marginBottom: '0.5rem' }}>Tworzenia dedykowanych treści i architektury słów kluczowych pod Search Intent,</li>
                <li style={{ marginBottom: '0.5rem' }}>Pozyskiwania wartościowych odnośników zewnętrznych (Link Building),</li>
                <li style={{ marginBottom: '0.5rem' }}>Optymalizacji wskaźników konwersji (CRO) oraz analizy UX.</li>
              </ul>

              {/* Styled Callout */}
              <div style={{ background: 'linear-gradient(135deg, rgba(216, 90, 48, 0.15) 0%, rgba(15, 23, 42, 0.9) 100%)', border: '1px solid rgba(216, 90, 48, 0.3)', padding: '2rem', borderRadius: '16px', margin: '2.5rem 0' }}>
                <h3 style={{ color: '#FFFFFF', margin: 0, marginBottom: '0.5rem', fontSize: '1.3rem', fontWeight: 700 }}>
                  Chcesz poznać dokładne pakiety?
                </h3>
                <p style={{ margin: 0, color: '#94A3B8', fontSize: '1rem', marginBottom: '1.25rem' }}>
                  Zobacz nasz przejrzysty cennik pozycjonowania stron internetowych bez ukrytych opłat i bez długoterminowych umów.
                </p>
                <a href="/cennik-pozycjonowania" className="btn btn-primary" style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem' }}>
                  Sprawdź Cennik Pakietów →
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
