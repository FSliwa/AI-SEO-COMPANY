export const metadata = {
  title: 'Pozycjonowanie Stron WWW | SEO B2B i B2C — AI SEO COMPANY',
  description: 'Skuteczne pozycjonowanie stron internetowych oparte na danych. Podniesiemy widoczność Twojego biznesu i przekształcimy ruch w płacących klientów.',
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import ServiceBlogGrid from '@/components/service/ServiceBlogGrid';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const faqData = [
  {
    question: 'Ile trwa pozycjonowanie stron internetowych?',
    answer: 'Pierwsze efekty wzrostu widoczności pojawiają się po 4-8 tygodniach od optymalizacji technicznej. Ustabilizowane wysokie pozycje na konkurencyjne frazy kluczowe buduje się zazwyczaj w horyzoncie 3 do 6 miesięcy.'
  },
  {
    question: 'Czym różni się pozycjonowanie z AI od tradycyjnego SEO?',
    answer: 'Analizujemy zapytania użytkowników w kontekście intencji wyszukiwania (Search Intent) oraz wyszukiwania semantycznego (LLM Search), optymalizując treści pod kątem tradycyjnego Google oraz wyszukiwarek AI (ChatGPT, Perplexity).'
  },
  {
    question: 'Czy pozycjonowanie stron gwarantuje pozycję nr 1 w Google?',
    answer: 'Żadna uczciwa agencja nie gwarantuje statycznej pozycji nr 1 ze względu na zmienność algorytmów Google. Gwarantujemy natomiast stały wzrost widoczności, jakościowego ruchu oraz optymalizację współczynnika konwersji (CRO).'
  }
];

const portfolioCases = [
  {
    tag: 'B2B INDUSTRY & SEO',
    title: 'Wzrost leadów B2B o 340%',
    description: 'Skalowanie biznesu na rynki zagraniczne (Niemcy, USA) dzięki nowej architekturze informacji i zaawansowanemu SEO. Start od zerowej widoczności na trudnym rynku inżynieryjnym.',
    image: 'https://images.unsplash.com/photo-1664575198308-3959904fa430?auto=format&fit=crop&w=800&q=80',
    metric: '+340%',
    metricLabel: 'Wzrost leadów',
    metric2: '2.8k+',
    metric2Label: 'Wizyt organicznych'
  },
  {
    tag: 'E-COMMERCE GROWTH',
    title: 'Dominacja w kategorii Fashion',
    description: 'Zbudowanie strategii Topic Clusters dla sklepu internetowego. Efektem była całkowita dominacja w niszy organicznej i obniżenie kosztów pozyskania klienta (CAC) o ponad połowę.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    metric: '-55%',
    metricLabel: 'Koszt CAC',
    metric2: 'Top 3',
    metric2Label: 'Kluczowe kategorie'
  }
];

const blogPostsData = [
  {
    date: '10 Czerwca 2026',
    tag: 'STRATEGIA B2B',
    title: 'Link building B2B dla marketerów',
    description: 'Jak pozyskiwać wartościowe odnośniki dla firmy usługowej w modelu B2B.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    slug: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista'
  },
  {
    date: '28 Lipca 2026',
    tag: 'BUDŻET SEO',
    title: 'Ile kosztuje SEO w Polsce?',
    description: 'Rozkładamy na czynniki pierwsze ceny pozycjonowania. Zobacz, ile kosztuje SEO.',
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    slug: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026'
  }
];

const carouselItems = [
  {
    number: '01 — WIDOCZNOŚĆ',
    metric: '+340%',
    title: 'Wzrost ruchu komercyjnego',
    description: 'Błyskawiczne skalowanie ruchu z zapytań o najwyższej intencji zakupowej w modelu wyszukiwania semantycznego.',
    width: 'min(85vw, 480px)',
    minHeight: '380px'
  },
  {
    number: '02 — STRATEGIA',
    metric: 'TOP 3',
    title: 'Kluczowe frazy branżowe',
    description: 'Wprowadzamy Twoje flagowe produkty i usługi na podium wyników organicznych wyszukiwarki Google.',
    width: 'min(75vw, 370px)'
  },
  {
    number: '03 — ARCHITEKTURA',
    metric: '100%',
    title: 'Topic Clusters & Authority',
    description: 'Tworzymy klastry tematyczne odpowiadające na pytania użytkowników, budując autorytet domeny.',
    width: 'min(80vw, 420px)',
    minHeight: '370px'
  },
  {
    number: '04 — AUTORYTET',
    metric: 'High DR',
    title: 'Jakościowy Link Building',
    description: 'Pozyskujemy editorialne odnośniki z najbardziej cenionych polskich i zagranicznych portali biznesowych.',
    width: 'min(75vw, 360px)'
  }
];

export default function PozycjonowanieStronPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner - Apple Style Minimalist */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Pozycjonowanie Stron
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: '#1D1D1F', 
                marginBottom: '1.5rem', 
                letterSpacing: '-0.04em'
              }}>
                Organiczny Wzrost<br />Maksymalna Konwersja
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
                Zbuduj trwałą przewagę konkurencyjną. Łączymy zaawansowane audyty techniczne i architekturę treści dopasowaną pod nowoczesną wyszukiwarkę.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: '#1D1D1F', color: '#FFFFFF', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  Zamów Wycenę
                </a>
                <a href="#cennik" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.05)', color: '#1D1D1F', padding: '1.2rem 2.5rem', borderRadius: '999px', fontSize: '1.1rem', fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s ease' }}>
                  Cennik Pakietów
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Apple Interactive Carousel Section (Why Us) */}
        <ServiceCarousel 
          tag="FILARY SKALOWANIA WIDOCZNOŚCI"
          title="Przewaga w Wynikach Organicznych"
          subtitle="Odkryj mechanizmy, które napędzają wzrost Twojego biznesu w wyszukiwarce Google."
          items={carouselItems}
        />

        {/* Process Section - Apple Style Minimal Grid */}
        <section style={{ padding: '120px 0', backgroundColor: '#FFFFFF' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Jak Działamy
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Trzyetapowa strategia wzrostu oparta na twardych danych analitycznych.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Audyt Techniczny &amp; CWV</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Content Marketing</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i intencje wyszukiwania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#F5F5F7', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#1D1D1F', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Link Building</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Pozyskujemy jakościowe odnośniki z cenionych portali, systematycznie budując zaufanie i autorytet Twojej domeny.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Odkryj nowości naszych klientów" 
          subtitle="Sukcesy organiczne w konkurencyjnych branżach"
          cases={portfolioCases} 
        />

        {/* Pricing */}
        <Pricing />

        {/* Blog / Knowledge Base */}
        <ServiceBlogGrid 
          tag="WIEDZA I INSPIRACJE"
          title="Trends & Insights"
          subtitle="Strategie pozycjonowania dla nowoczesnych wyszukiwarek"
          heroItem={{
            tag: 'SEO LOKALNE',
            title: 'SEO Lokalne dla Firm w Warszawie',
            description: 'Kompleksowy poradnik dla warszawskich firm usługowych. Dowiedz się, jak zdominować lokalne wyniki organiczne.',
            date: '10 Lipca 2026',
            image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=1200&q=80',
            slug: '/blog/seo-lokalne-dla-firm-w-warszawie'
          }}
          items={blogPostsData}
        />

        {/* FAQ */}
        <AppleFaq faqData={faqData} title="Najczęstsze pytania" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
