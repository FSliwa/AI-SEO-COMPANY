export const metadata = {
  title: 'Audyt SEO | Analiza i optymalizacja — AI SEO COMPANY',
  description: 'Kompleksowy audyt SEO. Znajdziemy błędy techniczne na Twojej stronie i przygotujemy strategię, która natychmiast poprawi Twoje pozycje w Google.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const faqAudyt = [
  {
    question: 'Co zawiera profesjonalny audyt SEO?',
    answer: 'Audyt SEO obejmuje ponad 50 punktów kontrolnych, w tym analizę Core Web Vitals, indeksację w Google, strukturę nagłówków i adresów URL, profil linków zwrotnych, badanie fraz kluczowych oraz wytyczne UX/CRO.'
  },
  {
    question: 'Ile trwa przygotowanie audytu SEO?',
    answer: 'Standardowy czas realizacji kompletnego audytu SEO wynosi od 3 do 5 dni roboczych. Po wygenerowaniu raportu przeprowadzamy konsultację omówieniową.'
  }
];

const auditCarouselItems = [
  {
    number: '01 — PRĘDKOŚĆ',
    metric: '99 / 100',
    title: 'PageSpeed & Core Web Vitals',
    description: 'Eliminujemy blokujący kod JavaScript i optymalizujemy renderowanie obrazów WebP/AVIF.',
    width: 'min(85vw, 460px)'
  },
  {
    number: '02 — INDEKSACJA',
    metric: '0 Błędów',
    title: 'Optymalizacja Crawl Budget',
    description: 'Usuwamy pętle przekierowań, zduplikowane tagi canonical oraz podstrony ze statusem 404.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 — SEMANTYKA',
    metric: 'HTML5',
    title: 'Hierarchia Nagłówków & Schema',
    description: 'Układamy poprawną strukturę H1-H3 oraz wdrażamy mikrodane Schema.org.',
    width: 'min(80vw, 410px)'
  },
  {
    number: '04 — WYDAJNOŚĆ',
    metric: '< 0.5s',
    title: 'Czas Odpowiedzi Serwera (TTFB)',
    description: 'Wskazujemy rekomendacje serwerowe i wdrażamy szybki bufor Caching/CDN.',
    width: 'min(75vw, 360px)'
  }
];

const auditPortfolioCases = [
  {
    tag: 'TECHNICAL E-COMMERCE',
    title: 'Naprawa indeksacji dużego sklepu',
    description: 'Znaleźliśmy i usunęliśmy ponad 20 tysięcy zduplikowanych i pustych adresów URL, które konsumowały Crawl Budget. Wynikiem był błyskawiczny powrót sklepu do Top 10 Google na kluczowe kategorie.',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    metric: '-95%',
    metricLabel: 'Błędów 404/500',
    metric2: '+45%',
    metric2Label: 'Zaindeksowanych podstron'
  },
  {
    tag: 'CORE WEB VITALS',
    title: 'Optymalizacja LCP i CLS w portalu B2B',
    description: 'Portal tracił użytkowników mobilnych przez bardzo wolne ładowanie wynoszące 8 sekund. Przebudowaliśmy architekturę zasobów i wdrożyliśmy nowoczesne mechanizmy buforowania.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    metric: '1.2s',
    metricLabel: 'Nowy wskaźnik LCP',
    metric2: '0',
    metric2Label: 'Przesunięć CLS'
  },
  {
    tag: 'RAPORT WYDAJNOŚCI',
    title: 'Audyt Techniczny Core Web Vitals: Od Diagnozy do Wyniku 99/100',
    description: 'Kompleksowa analiza przypadku optymalizacji kodu JavaScript i zasobów mediów, która skróciła czas ładowania serwisu B2B o 3.4 sekundy.',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=1200&q=80',
    metric: '28 Lipca',
    metricLabel: 'Data publikacji'
  },
  {
    tag: 'INDEKSACJA GOOGLE',
    title: 'Optymalizacja Crawl Budget dla Serwisów E-commerce',
    description: 'Jak wyeliminować pętle przekierowań i nieaktywne podstrony, aby ułatwić robotom indeksującym docieranie do produktów.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
    metric: '24 Lipca',
    metricLabel: 'Data publikacji'
  },
  {
    tag: 'STRUKTURA DANYCH',
    title: 'Wdrożenie Mikrodanych Schema.org w Modelu B2B',
    description: 'Przewodnik po optymalizacji danych strukturalnych pod kątem wyszukiwarek AI.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1200&q=80',
    metric: '20 Lipca',
    metricLabel: 'Data publikacji'
  },
  {
    tag: 'BEZPIECZEŃSTWO',
    title: 'Weryfikacja Profilu Linków i Czyszczenie Toksycznych Domen',
    description: 'Metodyka zabezpieczania autorytetu domeny przed działaniami depozycjonującymi.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1200&q=80',
    metric: '16 Lipca',
    metricLabel: 'Data publikacji'
  }
];

export default function AudytSeoPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner - Apple Style */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Audyt SEO
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: 'var(--color-text-main)', 
                marginBottom: '1.5rem', 
                letterSpacing: '-0.04em'
              }}>
                Diagnoza Techniczna<br />Odblokowanie Wzrostu
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
                Odkryj prawdziwe przyczyny braku widoczności w Google i odblokuj pełny potencjał sprzedażowy serwisu. Weryfikujemy ponad 50 krytycznych elementów algorytmu.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                  Zamów Audyt Strony
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Carousel */}
        <ServiceCarousel 
          tag="STANDARDY TECHNICZNE"
          title="Pełna Kontrola Jakości"
          subtitle="Poznaj kluczowe metryki, które analizujemy podczas każdego audytu."
          items={auditCarouselItems}
        />

        {/* Feature Grid Section - Apple Bento Grid Style */}
        <section style={{ padding: '120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Obszary Analizy Technicznej
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Kompleksowa weryfikacja techniczna, strukturalna i semantyczna witryny.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>OBSZAR 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Technikalia &amp; CWV</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Analiza Core Web Vitals (LCP, CLS, INP), poprawności kodów HTTP, przekierowań i eliminacja barier dla robotów indeksujących.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>OBSZAR 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Architektura Treści</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Badanie struktury nagłówków, architektury informacji, thin contentu oraz eliminowanie kanibalizacji słów kluczowych.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>OBSZAR 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Profil Linków &amp; Autorytet</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Weryfikacja toksyczności linków przychodzących, analiza anchor textów oraz badanie domen odsyłających w modelu AI.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Odkryj efekty naszych audytów" 
          subtitle="Realne przypadki zoptymalizowanych witryn e-commerce i B2B oraz nasza Baza Wiedzy Technicznej."
          cases={auditPortfolioCases} 
        />

        {/* FAQ Section */}
        <AppleFaq faqData={faqAudyt} title="Najczęstsze pytania" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
