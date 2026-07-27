import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Portfolio from '@/components/Portfolio';

export const metadata = {
  title: 'Projektowanie Stron Internetowych Warszawa — Strony WWW | AI SEO COMPANY',
  description: 'Nowoczesne projektowanie stron internetowych w Warszawie. Tworzymy szybkiej i zoptymalizowane pod SEO strony WWW z wysokim współczynnikiem konwersji.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/projektowanie-stron-internetowych',
  },
  openGraph: {
    title: 'Projektowanie Stron Internetowych Warszawa — AI SEO COMPANY',
    description: 'Zamów profesjonalną stronę WWW dopasowaną pod urządzenia mobilne, szybkość i optymalizację SEO.',
    url: 'https://www.ai-seo-company.pl/projektowanie-stron-internetowych',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function ProjektowanieStronPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> WEB DESIGN & UX
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            Projektowanie Stron Internetowych <span style={{ color: '#D85A30' }}>w Warszawie</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Tworzymy szybkie, nowoczesne strony WWW, które łączą unikalny branding z zaawansowaną architekturą pod pozycjonowanie w Google.
          </p>
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
            Wyceń Nową Stronę →
          </a>
        </div>
      </section>

      <Portfolio />
      <Contact />
      <Footer />
    </main>
  );
}
