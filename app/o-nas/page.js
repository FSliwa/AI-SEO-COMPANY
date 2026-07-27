import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';

export const metadata = {
  title: 'O Nas — Agencja SEO Warszawa | Zespół i Misja AI SEO COMPANY',
  description: 'Poznaj zespół AI SEO COMPANY w Warszawie. Połączenie wiedzy inżynieryjnej, analityki oraz autorskich narzędzi AI w służbie wyższym pozycjom w Google.',
  alternates: {
    canonical: 'https://www.ai-seo-company.pl/o-nas',
  },
  openGraph: {
    title: 'O Nas — Zespół i Misja AI SEO COMPANY Warszawa',
    description: 'Poznaj zespół ekspercki i doświadczenie w budowaniu widoczności marek w internecie.',
    url: 'https://www.ai-seo-company.pl/o-nas',
    siteName: 'AI SEO COMPANY',
    locale: 'pl_PL',
    type: 'website',
  },
};

export default function ONasPage() {
  return (
    <main style={{ background: '#090D16', color: '#F8FAFC', minHeight: '100vh' }}>
      <Header />
      
      <section style={{ paddingTop: '160px', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 1.5rem' }}>
          <div className="section-tag" style={{ color: '#D85A30', marginBottom: '1rem' }}>
            <span className="asterisk">✳</span> E-E-A-T & WIARYGODNOŚĆ
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 800, lineHeight: 1.15, color: '#FFFFFF', marginBottom: '1.5rem' }}>
            O Nas — <span style={{ color: '#D85A30' }}>Agencja SEO Warszawa</span>
          </h1>
          <p style={{ fontSize: '1.2rem', color: '#94A3B8', maxWidth: '780px', lineHeight: 1.6, marginBottom: '3rem' }}>
            Jesteśmy zespołem inżynierów, specjalistów SEO oraz web designerów z siedzibą w Warszawie. Od lat pomagamy polskim i zagranicznym firmom zdobywać i utrzymywać czołowe pozycje w wyszukiwarkach.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#D85A30', marginBottom: '1rem' }}>Doświadczenie & Inżynieria</h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Nie stosujemy szablonowych rozwiązań. Każdy projekt opiera się na dogłębnej analizie danych, optymalizacji kodu oraz autorskim modelowaniu architektury informacji.
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#D85A30', marginBottom: '1rem' }}>Technologia & AI</h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.95rem' }}>
                Wykorzystujemy algorytmy uczenia maszynowego do przewidywania intencji zakupowych użytkowników oraz budowania treści dopasowanych pod generatywne modele wyszukiwania (SGE, LLM).
              </p>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
              <h2 style={{ fontSize: '1.4rem', color: '#D85A30', marginBottom: '1rem' }}>Dane Rejestrowe (NAP)</h2>
              <p style={{ color: '#94A3B8', lineHeight: 1.6, fontSize: '0.95rem' }}>
                <strong>AI SEO COMPANY</strong><br />
                Siedziba: ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa<br />
                NIP: 5253090237<br />
                E-mail: kontakt@ai-seo-company.pl
              </p>
            </div>
          </div>
        </div>
      </section>

      <Contact />
      <Footer />
    </main>
  );
}
