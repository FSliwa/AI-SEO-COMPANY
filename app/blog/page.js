import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Blog SEO & Web Design — Poradniki i Klastry Treści | AI SEO COMPANY',
  description: 'Baza wiedzy z zakresu pozycjonowania stron internetowych, optymalizacji technicznej SEO, Core Web Vitals i marketingu w Google.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/blog',
  },
  openGraph: {
    title: 'Blog SEO & Web Design — AI SEO COMPANY',
    description: 'Praktyczne poradniki i wiedza z zakresu pozycjonowania i optymalizacji stron w Google.',
    url: 'https://www.ai-seo-company.pl/blog',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

const articles = [
  {
    slug: 'ile-kosztuje-pozycjonowanie-2026',
    title: 'Ile kosztuje pozycjonowanie stron internetowych w 2026 roku?',
    excerpt: 'Przegląd modeli rozliczeń SEO, kosztów budżetów linkowych i analizy wycen rynkowych w Polsce.',
    category: 'Cennik & Budżet',
    date: '2026-07-20'
  },
  {
    slug: 'core-web-vitals-a-pozycje-google',
    title: 'Core Web Vitals a pozycje w Google — Jak szybkość wpływa na SEO?',
    excerpt: 'LCP, CLS oraz INP. Dowiedz się, dlaczego optymalizacja techniczna to fundament nowoczesnego pozycjonowania.',
    category: 'Techniczne SEO',
    date: '2026-07-15'
  },
  {
    slug: 'seo-lokalne-dla-firm-w-warszawie',
    title: 'SEO Lokalne dla firm w Warszawie — Jak zdominować wyniki lokalne i Mapy?',
    excerpt: 'Strategie pozycjonowania wizytówek Google Profil Firmy oraz optymalizacja landing page pod ruch z Warszawy.',
    category: 'Lokalne SEO',
    date: '2026-07-10'
  }
];

export default function BlogHubPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '60px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> WIEDZA & KLASTRY TREŚCI
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            Blog <span style={{ color: '#D85A30' }}>AI SEO COMPANY</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '750px', lineHeight: 1.6, marginBottom: '3rem' }}>
            Odkryj aktualne porady, case studies i klastry tematyczne dotyczące pozycjonowania stron internetowych, audytów i SEO lokalnego.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            {articles.map((art) => (
              <article key={art.slug} style={{ background: 'rgba(15, 23, 42, 0.7)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.85rem', color: '#D85A30', fontWeight: 600, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
                  {art.category}
                </span>
                <h2 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#FFFFFF', marginBottom: '1rem', lineHeight: 1.35 }}>
                  <a href={`/blog/${art.slug}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                    {art.title}
                  </a>
                </h2>
                <p style={{ color: '#94A3B8', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '1.5rem', flexGrow: 1 }}>
                  {art.excerpt}
                </p>
                <a href={`/blog/${art.slug}`} style={{ color: '#D85A30', fontWeight: 600, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
                  Czytaj wpis →
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
