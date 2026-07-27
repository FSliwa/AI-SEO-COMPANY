import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Audyt SEO — Kompleksowa Analiza Techniczna i Treści | AI SEO COMPANY',
  description: 'Zamów profesjonalny audyt SEO swojej strony internetowej. Wykryj błędy indeksacji, spadki widoczności oraz uzyskaj rekomendacje optymalizacyjne.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/audyt-seo',
  },
  openGraph: {
    title: 'Audyt SEO — Analiza Techniczna i Wskazówki Optymalizacyjne',
    description: 'Poznaj stan techniczny i potencjał pozycjonowania swojej strony WWW w Google.',
    url: 'https://www.ai-seo-company.pl/audyt-seo',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

const faqAudyt = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': [
    {
      '@type': 'Question',
      'name': 'Co zawiera profesjonalny audyt SEO?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.'
      }
    },
    {
      '@type': 'Question',
      'name': 'Ile trwa przygotowanie audytu SEO?',
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.'
      }
    }
  ]
};

export default function AudytSeoPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqAudyt) }}
      />
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> LEAD MAGNET & DIAGNOSTYKA
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>
            Profesjonalny <span style={{ color: '#D85A30' }}>Audyt SEO</span> Strony i Sklepu
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.6, marginBottom: '2.5rem' }}>
            Odkryj przyczyny braku pozycji w Google i odblokuj pełny potencjał sprzedażowy serwisu. Przeprowadzamy weryfikację ponad 50 elementów technicznych i treściowych.
          </p>
          <a href="#kontakt" className="btn btn-primary" style={{ padding: '0.9rem 2rem' }}>
            Zamów Audyt Strony →
          </a>
        </div>
      </section>

      <section style={{ padding: '60px 0', background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '2rem' }}>
            Co Analizujemy Podczas Audytu SEO?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ color: '#D85A30', fontSize: '1.2rem', marginBottom: '0.5rem' }}>1. SEO Techniczne i Szybkość</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Core Web Vitals (LCP, CLS, INP), kody odpowiedzi HTTP, kanibalizacja i błędy indeksowania.</p>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ color: '#D85A30', fontSize: '1.2rem', marginBottom: '0.5rem' }}>2. Architektura Treści (Content)</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Nasycenie frazami, struktura nagłówków (H1-H6), duplikacja treści oraz profil słów kluczowych.</p>
            </div>
            <div style={{ background: 'rgba(15,23,42,0.6)', padding: '1.75rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
              <h3 style={{ color: '#D85A30', fontSize: '1.2rem', marginBottom: '0.5rem' }}>3. Profil Linków Zwrotnych</h3>
              <p style={{ color: '#94A3B8', fontSize: '0.95rem' }}>Jakość i toksyczność domen odsyłających, rozkład anchor textów oraz autorytet serwisu.</p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
