import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Cennik Pozycjonowania Stron 2026 — Pakiety SEO | AI SEO COMPANY',
  description: 'Sprawdź transparentny cennik pozycjonowania stron internetowych. Pakiety od 0 zł za stronę WWW do zaawansowanej optymalizacji e-commerce.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
  },
  openGraph: {
    title: 'Cennik Pozycjonowania Stron Internetowych 2026 — AI SEO COMPANY',
    description: 'Przejrzyste pakiety pozycjonowania bez ukrytych kosztów. Wybierz pakiet dopasowany do celów biznesowych.',
    url: 'https://www.ai-seo-company.pl/cennik-pozycjonowania',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function CennikPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem', textAlign: 'center' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem', justifyContent: 'center', display: 'flex' }}>
            <span className="asterisk">✳</span> TRANSPARENTNA WYCENA
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            Ile Kosztuje Pozycjonowanie Stron? <span style={{ color: '#D85A30' }}>Cennik 2026</span>
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.6 }}>
            Brak ukrytych opłat i skomplikowanych umów. Płać za mierzalne wyniki i stały rozwój widoczności w wyszukiwarkach.
          </p>
        </div>
      </section>

      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}
