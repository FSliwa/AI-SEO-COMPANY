'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

export default function ProjektowanieClient({ faqData, portfolioCases, carouselItems }) {
  const lang = useLocale();

  return (
    <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      
      {/* Hero Banner - Apple Style */}
      <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
              {lang === 'pl' ? 'WEBDESIGN & DEVELOPMENT' : 'WEBDESIGN & DEVELOPMENT'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(3.5rem, 7vw, 6rem)', 
              fontWeight: 700, 
              lineHeight: 1.05, 
              color: 'var(--color-text-main)', 
              marginBottom: '1rem', 
              letterSpacing: '-0.04em'
            }}>
              {lang === 'pl' ? 'Projektowanie stron internetowych' : 'Web Design & Development'}
            </h1>

            <div style={{ 
              width: '120px', 
              height: '6px', 
              background: 'linear-gradient(90deg, var(--color-cta) 0%, #FF8A65 100%)', 
              margin: '0 auto 2rem auto', 
              borderRadius: '3px',
              boxShadow: '0 4px 15px rgba(216, 90, 48, 0.4)'
            }}></div>

            <div style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: 'var(--color-text-main)', 
              marginBottom: '1.5rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? (
                <>Nowoczesne Strony<br/>Wysoka Konwersja</>
              ) : (
                <>Modern Websites<br/>High Conversion</>
              )}
            </div>

            <p style={{ 
              fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
              color: '#333336', 
              lineHeight: 1.6, 
              maxWidth: '700px', 
              margin: '0 auto 3rem auto',
              fontWeight: 400
            }}>
              {lang === 'pl' 
                ? <>Profesjonalne <strong>projektowanie stron internetowych</strong> to inwestycja w stabilny fundament. <span style={{ color: 'var(--color-cta)' }}>Tworzymy nowoczesne i szybkie strony B2B, chroniące przed atakami i zamieniające ruch organiczny w stałych klientów</span>.</> 
                : <>Professional Web Design and Development is an investment in a stable foundation. <span style={{ color: 'var(--color-cta)' }}>We create fast Business Websites that protect against attacks and turn organic traffic into customers</span>.</>}
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#kontakt" className="hero-btn-primary">
                {lang === 'pl' ? 'Rozpocznij współpracę' : 'Start collaboration'} 
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </a>
              <a href={lang === 'pl' ? '/#portfolio' : '/en#portfolio'} className="hero-btn-secondary">
                {lang === 'pl' ? 'Zobacz case studies' : 'View case studies'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Carousel */}
      <ServiceCarousel 
        tag={lang === 'pl' ? "STANDARDY INTERFEJSU & UX" : "INTERFACE & UX STANDARDS"}
        title={lang === 'pl' ? "Inżynieria Nowoczesnych Stron" : "Modern Web Engineering"}
        subtitle={lang === 'pl' ? "Zobacz parametry techniczne i projektowe wyróżniające nasze realizacje serwisów internetowych." : "Explore the technical and design parameters that distinguish our web developments."}
        items={carouselItems}
      />

      {/* Standards Section - Apple Bento Grid Style */}
      <section style={{ padding: '120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Standardy: projektowanie stron internetowych' : 'Web Engineering Standards'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Czym wyróżniają się interfejsy i architektura kodowana przez AI SEO COMPANY.' : 'What makes the interfaces and architecture coded by AI SEO COMPANY stand out.'}
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'FILAR 1' : 'PILLAR 1'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Niezawodność i Bezpieczeństwo' : 'Reliability & Security'}</div>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? <>Nasze <strong>projektowanie stron internetowych</strong> łączy nowoczesną architekturę Headless z biznesowymi korzyściami. To nie tylko niezrównana szybkość, ale też całkowite odcięcie hakerów od Twojej bazy danych. Zyskujesz spokój ducha i bezpieczeństwo znane z systemów klasy Enterprise, zapominając o awariach.</> : "Our website design combines modern Headless architecture with business benefits. It's not just unmatched speed, but also a complete cut-off for hackers from your database. You gain peace of mind and Enterprise-grade security, forgetting about crashes."}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'FILAR 2' : 'PILLAR 2'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wzrost Konwersji i Leady' : 'Conversion Growth & Leads'}</div>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Eliminujemy zbędny szum informacyjny. Budujemy przejrzyste interfejsy i formularze, które w logiczny sposób prowadzą klienta prosto do kontaktu z Twoim działem sprzedaży.' : 'We eliminate unnecessary information noise. We build clean interfaces and forms that logically guide the client straight to contacting your sales department.'}</p>
            </RevealItem>
            
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'FILAR 3' : 'PILLAR 3'}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Fundament pod SEO' : 'SEO Foundation'}</div>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Od pierwszego dnia strona jest zoptymalizowana pod Google (szybkość wczytywania, tagi strukturalne). Tworzymy solidną bazę, gotową na bezkompromisowe pozycjonowanie stron.' : 'From day one, the site is optimized for Google (loading speed, structured tags). We create a solid base, ready for uncompromising SEO.'}</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Process Section */}
      <section style={{ padding: '0 0 120px 0' }}>
        <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {lang === 'pl' ? 'KROKI PROJEKTOWE' : 'PROJECT STEPS'}
            </div>
            <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Od Koncepcji do Kodowania' : 'From Concept to Code'}
            </h2>
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
              {lang === 'pl' ? 'Przejrzysty proces realizacji Twojego projektu webowego.' : 'A transparent realization process for your web project.'}
            </p>
          </Reveal>

          <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Profesjonalny Design i Makiety' : 'Professional Design and Mockups'}</div>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? <>Nasze <strong>projektowanie stron internetowych</strong> zaczyna się od stworzenia czytelnych makiet i prototypów, w pełni dopasowanych do Twojej identyfikacji wizualnej i grupy docelowej.</> : 'Our web design begins with clean mockups and prototypes, perfectly tailored to your visual identity and target audience.'}</p>
            </RevealItem>
            <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column' }}>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wdrożenie i Skalowanie Sprzedaży' : 'Deployment and Sales Scaling'}</div>
              <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Gotowy projekt przenosimy do bezpiecznego i niezawodnego środowiska, dbając o zoptymalizowanie ścieżek zakupowych klienta (generowanie leadów).' : 'We transition the ready design into a secure and reliable environment, ensuring optimized customer purchase paths (lead generation).'}</p>
            </RevealItem>
          </RevealStagger>
        </div>
      </section>

      {/* Portfolio Section */}
      <SubpagePortfolio 
        title={lang === 'pl' ? "Standardy Architektury Web Design" : "Web Design Architecture Standards"} 
        subtitle={lang === 'pl' ? "Nowoczesne wzorce projektowe łączące estetykę z maksymalizacją zapytań" : "Modern design patterns combining aesthetics with inquiry maximization"}
        cases={portfolioCases} 
        layout="vertical"
      />

      {/* Pricing */}
      <Pricing />

      {/* FAQ Section */}
      <AppleFaq faqData={faqData} title={lang === 'pl' ? "Najczęstsze pytania" : "Frequently Asked Questions"} />

      <Contact />
    </main>
  );
}
