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
    tag: 'MODEL B2B & SEO',
    title: 'Model Skalowania Leadów B2B',
    description: 'Strategiczna architektura informacji dla branż inżynieryjnych i technicznych. Model budowania wysokiej autorytatywności domeny od podstaw.',
    image: 'https://images.unsplash.com/photo-1693648793394-0b76b7eb042e?auto=format&fit=crop&w=800&q=80',
    metric: '+362%',
    metricLabel: 'Wzrost leadów organicznych',
    metric2: '+520%',
    metric2Label: 'Wzrost ruchu komercyjnego'
  },
  {
    tag: 'MODEL E-COMMERCE',
    title: 'Struktura Klastrowa w Fashion',
    description: 'Strategia Topic Clusters dla sklepu internetowego. Model eliminujący kanibalizację słów kluczowych i obniżający koszt pozyskania klienta (CAC).',
    image: 'https://images.unsplash.com/photo-1533134486753-c833f0ed4866?auto=format&fit=crop&w=800&q=80',
    metric: '-58%',
    metricLabel: 'Obniżenie kosztu pozyskania (CAC)',
    metric2: '+310%',
    metric2Label: 'Wzrost przychodu z SEO'
  },
  {
    tag: 'MODEL LOCAL B2C',
    title: 'Skalowanie Podstron Geolokalizacyjnych',
    description: 'Model pozycji dla sieci wielooddziałowych na ponad 20 miast w Polsce dzięki zoptymalizowanej strukturze podstron oraz wizytówek profilu Google.',
    image: 'https://images.unsplash.com/photo-1710438399422-2fca27686bcd?auto=format&fit=crop&w=800&q=80',
    metric: '+280%',
    metricLabel: 'Wzrost zapytań lokalnych',
    metric2: '+410%',
    metric2Label: 'Wyświetleń w Google Maps'
  },
  {
    tag: 'MODEL SAAS TECH',
    title: 'Optymalizacja Pod Zapytania BOFU',
    description: 'Pozycjonowanie trudnych fraz kluczowych o najwyższym inteńcie zakupowym na rynku globalnym, napędzające wzrost stałych przychodów subskrypcyjnych.',
    image: 'https://images.unsplash.com/photo-1557264322-b44d383a2906?auto=format&fit=crop&w=800&q=80',
    metric: '+140%',
    metricLabel: 'Skok przychodów (MRR)',
    metric2: 'Top 1',
    metric2Label: 'Kluczowe frazy zakupowe'
  },
  {
    tag: 'MODEL FINTECH',
    title: 'Mapowanie Intencji i Lejka Konwersji',
    description: 'Precyzyjna architektura treści odpowiadająca na zapytania użytkowników na każdym etapie decyzji finansowej, zmniejszająca koszty konwersji.',
    image: 'https://images.unsplash.com/photo-1678366633407-7f49da199a42?auto=format&fit=crop&w=800&q=80',
    metric: '-48%',
    metricLabel: 'Redukcja kosztu konwersji',
    metric2: '+290%',
    metric2Label: 'Nowych kont organicznie'
  },
  {
    tag: 'MODEL LOGISTICS',
    title: 'Wielojęzyczna Struktura TSL',
    description: 'Wielojęzyczny audyt techniczny oraz rozbudowa klastrów treści generująca wysoki popyt B2B na rynku europejskim.',
    image: 'https://images.unsplash.com/photo-1526289034009-0240ddb68ce3?auto=format&fit=crop&w=800&q=80',
    metric: '+380%',
    metricLabel: 'Zapytań ofertowych B2B',
    metric2: '+540%',
    metric2Label: 'Ruchu z rynków zagranicznych'
  },
  {
    tag: 'MODEL PREMIUM',
    title: 'Budowanie Autorytetu i Digital PR',
    description: 'Strategia pozyskiwania wartościowych odnośników editorialnych i budowania autorytetu domeny w segmentach marek premium.',
    image: 'https://images.unsplash.com/photo-1567095751004-aa51a2690368?auto=format&fit=crop&w=800&q=80',
    metric: '+180%',
    metricLabel: 'Wzrost autorytetu domeny (DR)',
    metric2: '+320%',
    metric2Label: 'Ogólnej widoczności fraz'
  }
];

const carouselItems = [
  {
    number: '01 — WIDOCZNOŚĆ',
    metric: '+362%',
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
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
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
                color: 'var(--color-text-main)', 
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
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                  Zamów Wycenę
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
        <section style={{ padding: '120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Jak Działamy
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Trzyetapowa strategia wzrostu oparta na twardych danych analitycznych.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Audyt Techniczny &amp; CWV</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Eliminujemy błędy indeksowania, przyspieszamy ładowanie i poprawiamy architekturę linkowania wewnętrznego.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Content Marketing</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Tworzymy klastry tematyczne oraz semantyczne treści odpowiadające na pytania użytkowników i intencje wyszukiwania.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>KROK 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Link Building</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Pozyskujemy jakościowe odnośniki z cenionych portali, systematycznie budując zaufanie i autorytet Twojej domeny.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Scenariusze Wzrostu i Wyniki" 
          subtitle="Sprawdzone wzorce skalowania widoczności i konwersji w modelu AI SEO"
          cases={portfolioCases} 
          layout="vertical"
        />

        {/* Pricing */}
        <Pricing />

        {/* FAQ */}
        <AppleFaq faqData={faqData} title="Najczęstsze pytania" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
