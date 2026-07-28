export const metadata = {
  title: 'Pozycjonowanie Lokalne Warszawa | Zdobądź klientów z okolicy',
  description: 'Zdominuj lokalne wyniki Google w Warszawie (Mapy i wyszukiwarkę). Agencja AI SEO COMPANY zbuduje Twoją widoczność w Twoim mieście.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Portfolio from '@/components/Portfolio';
import Blog from '@/components/Blog';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function SeoLokalnePage() {
  return (
    <main style={{ backgroundColor: '#F5F5F7', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      {/* Hero Banner - Apple Style */}
      <section style={{ paddingTop: '180px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> LOKALNE SEO
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: '#1D1D1F', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.04em'
            }}>
              SEO Lokalne Warszawa.
            </h1>
            <p style={{ 
              fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', 
              color: '#6E6E73', 
              lineHeight: 1.5, 
              maxWidth: '650px', 
              margin: '0 auto 3rem auto',
              fontWeight: 500,
              letterSpacing: '-0.01em'
            }}>
              Zdobywaj klientów bezpośrednio ze swojej okolicy. Dominujemy w Mapach Google i optymalizujemy wizytówki dla lokalnych biznesów.
            </p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                Zamów Bezpłatną Wycenę
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Standards Section - Apple Bento Grid Style */}
      <section style={{ padding: '80px 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              Jak Dominować Lokalnie.
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              Zintegrowana strategia widoczności na rynku warszawskim.
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wizytówka Google (GMB).</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Zaawansowana optymalizacja kategorii, inteligentne geo-tagowanie zdjęć oraz aktywne zarządzanie opiniami w celu zdobycia Local Pack.</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Spójność NAP.</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Absolutna spójność nazwy, adresu i telefonu (Name, Address, Phone) we wszystkich istotnych lokalnych katalogach warszawskich (Cititations).</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 24px rgba(0,0,0,0.04)' }}>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Konwersja z Dzielnic.</h3>
              <p style={{ color: '#6E6E73', fontSize: '1.1rem', lineHeight: 1.55 }}>Tworzenie wysoce konwertujących, dedykowanych landing pages pod konkretne dzielnice Warszawy np. Mokotów, Wola, Śródmieście.</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      <Portfolio />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
