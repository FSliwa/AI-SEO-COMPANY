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
    tag: 'PROBLEM 01 — INDEKSACJA',
    title: 'Wyciek Crawl Budget i Błędy 404',
    description: 'Wykryto ponad 20 000 zduplikowanych adresów URL oraz pętli przekierowań konsumujących budżet indeksowania. Eliminuje to kluczowe produkty z wyników wyszukiwania.',
    image: 'https://images.unsplash.com/photo-1550684848-722ebb602b9f?auto=format&fit=crop&w=800&q=80',
    metric: '-95%',
    metricLabel: 'Redukcja błędów',
    metric2: '+45%',
    metric2Label: 'Zaindeksowanych stron'
  },
  {
    tag: 'PROBLEM 02 — SPEED & CWV',
    title: 'Wolne Ładowanie LCP (8.2s)',
    description: 'Zablokowany wątek główny przez niezoptymalizowany JavaScript oraz brak kompresji obrazów Next-Gen, powodujący ucieczkę 60% użytkowników mobilnych.',
    image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=800&q=80',
    metric: '1.2s',
    metricLabel: 'Docelowy czas LCP',
    metric2: '0.00',
    metric2Label: 'Przesunięć CLS'
  },
  {
    tag: 'PROBLEM 03 — DANE STRUKTURALNE',
    title: 'Brak Mikrodanych Schema.org',
    description: 'Brak oznaczeń semantycznych dla wyszukiwarek AI i Google (Rich Snippets), uniemożliwiający wyświetlanie ocen, cen i dostępności w wynikach Search.',
    image: 'https://images.unsplash.com/photo-1620121692029-d088224ddc74?auto=format&fit=crop&w=1200&q=80',
    metric: '100%',
    metricLabel: 'Pokrycia Schema',
    metric2: '+35%',
    metric2Label: 'Wzrost CTR'
  },
  {
    tag: 'PROBLEM 04 — TOKSYCZNE LINKI',
    title: 'Ryzyko Filtrów Algorytmicznych',
    description: 'Wykrycie masowych przyrostów spamu i toksycznych domen odsyłających z filtrem depozycjonującym. Konieczność wdrożenia procedury Disavow Tool.',
    image: 'https://images.unsplash.com/photo-1555448248-2571daf6346b?auto=format&fit=crop&w=1200&q=80',
    metric: '0',
    metricLabel: 'Toksycznych linków',
    metric2: '100%',
    metric2Label: 'Bezpieczny profil'
  },
  {
    tag: 'PROBLEM 05 — KANIBALIZACJA',
    title: 'Duplikacja i Wewnętrzne Rywalizacje',
    description: 'Wielokrotne podstrony rywalizujące o te same frazy kluczowe. Wykryto brak tagów kanonicznych (rel="canonical") oraz błędne parametry filtrowania.',
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=80',
    metric: 'TOP 3',
    metricLabel: 'Dla głównych fraz',
    metric2: '100%',
    metric2Label: 'Czystość kanoniczna'
  },
  {
    tag: 'PROBLEM 06 — SEMANTYKA HTML',
    title: 'Błędna Hierarchia Nagłówków H1-H3',
    description: 'Niewłaściwa struktura semantyczna HTML, brak opisów alternatywnych ALT w obrazach i puste tagi meta title uniemożliwiające zrozumienie intencji zapytania.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1200&q=80',
    metric: '100/100',
    metricLabel: 'Wskaźnik SEO',
    metric2: '+80%',
    metric2Label: 'Widoczności fraz'
  }
];

export default function AudytSeoPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
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
                Diagnoza Techniczna<br />Precyzyjna Optymalizacja
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
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Treści &amp; Semantyka</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Weryfikacja intencji wyszukiwania (Search Intent), analiza kanibalizacji słów kluczowych i pokrycia klastrów tematycznych.</p>
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
          subtitle="Najczęstsze błędy techniczne wykrywane podczas audytów oraz metody ich eliminacji"
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
