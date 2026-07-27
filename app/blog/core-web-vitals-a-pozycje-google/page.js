import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'Core Web Vitals a Pozycje w Google | Blog AI SEO COMPANY',
  description: 'Wpływ szybkości działania strony i wskaźników LCP, CLS, INP na pozycjonowanie w wyszukiwarce Google.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google',
  },
};

export default function ArticleCwvPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div style={{ color: '#D85A30', fontWeight: 600, marginBottom: '0.75rem' }}>KLASTER: TECHNICZNE SEO & SPEED</div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 800, color: '#FFFFFF', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Core Web Vitals a pozycje w Google — Jak szybkość wpływa na SEO?
          </h1>
          <p style={{ fontSize: '1.15rem', color: '#94A3B8', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Core Web Vitals to oficjalny czynnik rankingowy Google. Strony, które ładują się szybko i bez skoków układu (CLS), osiągają wyższe wskaźniki konwersji i lepsze pozycje w wynikach wyszukiwania.
          </p>

          <div style={{ lineHeight: 1.8, color: '#CBD5E1', fontSize: '1.05rem' }}>
            <h2 style={{ color: '#FFFFFF', marginTop: '2rem', marginBottom: '1rem' }}>Trzy główne metryki UX & Techniczne</h2>
            <ul style={{ paddingLeft: '1.5rem', marginBottom: '2rem' }}>
              <li><strong>LCP (Largest Contentful Paint)</strong>: Czas renderowania największego elementu graficznego lub tekstowego.</li>
              <li><strong>CLS (Cumulative Layout Shift)</strong>: Miernik przesunięć elementów podczas ładowania.</li>
              <li><strong>INP (Interaction to Next Paint)</strong>: Czas reakcji witryny na interakcję użytkownika.</li>
            </ul>

            <div style={{ background: 'rgba(216, 90, 48, 0.1)', borderLeft: '4px solid #D85A30', padding: '1.5rem', borderRadius: '8px', margin: '2rem 0' }}>
              <h3 style={{ color: '#FFFFFF', margin: 0, marginBottom: '0.5rem' }}>Chcesz przetestować swoją stronę?</h3>
              <p style={{ margin: 0, color: '#94A3B8' }}>
                Zamów kompleksowy <a href="/audyt-seo" style={{ color: '#D85A30', fontWeight: 'bold' }}>audyt SEO strony</a> i wykryj wąskie gardła techniczne.
              </p>
            </div>
          </div>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
