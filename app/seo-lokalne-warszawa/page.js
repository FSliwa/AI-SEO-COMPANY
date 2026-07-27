import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'SEO Lokalne Warszawa — Pozycjonowanie Firm w Google & Maps | AI SEO COMPANY',
  description: 'Zdominuj lokalny rynek w Warszawie. Pozycjonowanie wizytówki Google Profil Firmy, pozycjonowanie lokalne stron i pozyskiwanie klientów z Twojej okolicy.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/seo-lokalne-warszawa',
  },
  openGraph: {
    title: 'SEO Lokalne Warszawa — Zdobądź Kientów z Map Google',
    description: 'Optymalizacja profilu firmy w Google i lokalnego pozycjonowania stron internetowych.',
    url: 'https://www.ai-seo-company.pl/seo-lokalne-warszawa',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function SeoLokalnePage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> LOKALNA WIDOCZNOŚĆ
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            SEO Lokalne Warszawa <span style={{ color: '#D85A30' }}>& Mapy Google</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Pozyskuj klientów szukających Twoich usług w Warszawie i okolicach. Optymalizujemy wizytówki Google Profil Firmy oraz stronę pod frazy geolokalizowane.
          </p>
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
            Zwiększ Widoczność w Warszawie →
          </a>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
