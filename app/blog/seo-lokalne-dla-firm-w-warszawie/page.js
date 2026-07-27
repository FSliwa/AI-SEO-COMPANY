'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

export default function ArticleLokalnePage() {
  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Lokalne SEO Warszawa
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                Jul 20, 2026
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '2rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'left'
            }}>
              SEO Lokalne w Warszawie.
            </h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div style={{ fontSize: '1.15rem', lineHeight: 1.6, color: '#333336' }}>
              <p style={{ fontSize: '1.4rem', color: '#1D1D1F', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Rynek usług w Warszawie charakteryzuje się ogromną konkurencją. Aby docierać do klientów, musisz zsynchronizować optymalizację serwisu z wizytówką Google.
              </p>
              
              <h2 style={{ fontSize: '1.5rem', color: '#1D1D1F', marginTop: '2.5rem', marginBottom: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                Strategiczne filary pozycjonowania.
              </h2>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Spójność wizytówki i witryny pod kątem danych NAP (Name, Address, Phone).</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Optymalizacja kategorii w Google Profil Firmy.</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Pozyskiwanie opinii klientów z frazami lokalnymi.</span>
                </li>
              </ul>

              <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
                <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
                  <h3 style={{ color: '#1D1D1F', margin: 0, marginBottom: '1rem', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '-0.02em' }}>
                    Zdominuj lokalny rynek
                  </h3>
                  <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Chcesz wyprzedzić konkurencję w swojej okolicy? Zostaw nam wiadomość poniżej, a przygotujemy dedykowaną strategię.
                  </p>
                  <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                    Skonsultuj Projekt
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <div id="kontakt">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
