export const metadata = {
  title: 'SEO Lokalne Warszawa | Pozycjonowanie Lokalne Firm',
  description: 'Skuteczne pozycjonowanie lokalne w Warszawie. Zdominuj Mapy Google (Google Profil Firmy), zdobądź klientów z Twojej okolicy i wyprzedź konkurencję.',
  alternates: {
    canonical: '/seo-lokalne-warszawa',
  },
};

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';

const faqData = [
  {
    question: 'Kiedy zobaczę efekty pozycjonowania lokalnego w Warszawie?',
    answer: 'Zoptymalizowana wizytówka Google Profil Firmy może przynieść pierwsze zyski w postaci nowych telefonów i zapytań już w ciągu 2-4 tygodni. Zbudowanie solidnej, wiodącej pozycji w konkurencyjnych dzielnicach Warszawy to proces na 3-6 miesięcy.'
  },
  {
    question: 'Czy muszę posiadać fizyczne biuro w Warszawie?',
    answer: 'Google preferuje firmy z weryfikowalnym adresem fizycznym. Jeśli obsługujesz klientów mobilnie na terenie Warszawy (np. hydraulik, mobilny mechanik), możemy ukryć dokładny adres, konfigurując tzw. obszar świadczenia usług (Service Area Business).'
  },
  {
    question: 'Czym różni się SEO lokalne od tradycyjnego pozycjonowania?',
    answer: 'SEO lokalne skupia się na tzw. "Local Pack", czyli wynikach z Map Google (Mappack) oraz organicznych wynikach geolokalizowanych. Zamiast budować globalny zasięg, walczymy o klientów wyszukujących Twoich usług w promieniu kilku/kilkunastu kilometrów.'
  }
];

const portfolioCases = [
  {
    tag: 'WIZYTÓWKA GOOGLE (GBP)',
    title: 'Optymalizacja Profilu Firmy',
    description: 'Konfigurujemy Twoją wizytówkę Google od A do Z. Wdrażamy odpowiednie słowa kluczowe, precyzyjne kategorie i system postów, który przyciąga uwagę klientów przeglądających Mapy w Warszawie.',
    image: 'https://images.unsplash.com/photo-1604871000636-074fa5117945?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '+150%',
    metricLabel: 'Wyświetlenia',
    metric2: '+85%',
    metric2Label: 'Telefony z Map'
  },
  {
    tag: 'SYGNAŁY NAP & CYTACJE',
    title: 'Budowanie Autorytetu Lokalnego',
    description: 'Rejestrujemy Twoją firmę w kluczowych warszawskich i ogólnopolskich katalogach branżowych (Panorama Firm, Yelp itp.). Gwarantujemy pełną spójność nazwy, adresu i telefonu (NAP), co jest potężnym sygnałem zaufania dla Google.',
    image: 'https://images.unsplash.com/photo-1555529902-5261145633bf?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '100%',
    metricLabel: 'Spójność NAP',
    metric2: 'Top 3',
    metric2Label: 'Local Pack'
  },
  {
    tag: 'OPINIE KLIENTÓW',
    title: 'Strategia Zbierania Opinii',
    description: 'Wdrażamy w Twojej firmie zautomatyzowane procesy pozyskiwania pięciogwiazdkowych recenzji od zadowolonych klientów. Opinie to najważniejszy czynnik konwersji (Social Proof) na warszawskim rynku.',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1200&q=80',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '5.0',
    metricLabel: 'Średnia ocen',
    metric2: 'Trust',
    metric2Label: 'Wiarygodność'
  }
];

const carouselItems = [
  {
    number: '01 / AUDYT',
    metric: 'Diagnoza',
    title: 'Analiza Konkurencji',
    description: 'Weryfikujemy, co robią liderzy w Twojej dzielnicy i wyznaczamy plan działania oparty na danych.',
    width: 'min(85vw, 470px)',
    minHeight: '370px'
  },
  {
    number: '02 / MAPY',
    metric: 'GMB',
    title: 'Konfiguracja Wizytówki',
    description: 'Przejmujemy kontrolę nad Twoim Profilem w Google, uzupełniając go o odpowiednie frazy i tagi.',
    width: 'min(75vw, 360px)'
  },
  {
    number: '03 / LINKI',
    metric: 'Autorytet',
    title: 'Lokalny Link Building',
    description: 'Zdobywamy wzmianki o Twojej firmie na lokalnych warszawskich portalach i branżowych stronach.',
    width: 'min(80vw, 430px)',
    minHeight: '380px'
  },
  {
    number: '04 / TREŚĆ',
    metric: 'On-Page',
    title: 'Optymalizacja Witryny',
    description: 'Dodajemy modyfikatory lokalne (nazwy dzielnic Warszawy) na stronę oraz wdrażamy Schema LocalBusiness.',
    width: 'min(75vw, 370px)'
  }
];

export default function SeoLokalneWarszawaPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                MARKETING LOKALNY B2B & B2C
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3rem, 6vw, 5.5rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: 'var(--color-text-main)', 
                marginBottom: '1.5rem', 
                letterSpacing: '-0.04em'
              }}>
                SEO Lokalne Warszawa<span style={{ display: 'block', width: '60px', height: '4px', backgroundColor: 'currentColor', margin: '0.5rem auto', borderRadius: '2px', overflow: 'hidden', textIndent: '-9999px' }}> — </span>Zdominuj Swoją Ofertą
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
                Wykorzystaj potęgę Map Google. Skuteczne pozycjonowanie lokalne pozwala skalować firmy (usługi, gabinety, sklepy), łącząc zaawansowaną analitykę ze sprawdzonymi strategiami widoczności. Nasze seo lokalne zamienia kliknięcia w prawdziwe zyski.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" className="btn btn-primary" style={{ padding: '1rem 2rem', fontSize: '1.05rem', fontWeight: 600 }}>
                  Sprawdź Swój Potencjał
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Carousel */}
        <ServiceCarousel 
          tag="SKUTECZNY PROCES"
          title="Inżynieria Zysku na Rynku Lokalnym"
          subtitle="Proces optymalizacji, który transformuje przypadkowych klikających w płacących klientów z Twojej okolicy."
          items={carouselItems}
        />

        {/* Standards Section */}
        <section style={{ padding: '120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                Dlaczego lokalność ma znaczenie?
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Zrozum, jak zachowują się użytkownicy smartfonów poszukujący usług.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wyszukiwania z Intencją "Near Me"</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Ponad 46% wszystkich wyszukiwań w Google ma intencję lokalną. Profesjonalne pozycjonowanie lokalne sprawia, że klienci są gotowi do natychmiastowego telefonu lub wizyty w lokalu.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Widoczność Mobilna</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Dominacja na urządzeniach mobilnych to klucz w branżach lokalnych (gastronomia, usługi prawne, beauty), gdzie decyzje podejmuje się "w drodze".</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wysoka Konwersja</h3>
                <p style={{ color: '#515154', fontSize: '1.1rem', lineHeight: 1.55 }}>Ruch z Map Google cechuje się jednym z najwyższych wskaźników konwersji ze wszystkich cyfrowych kanałów marketingowych.</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Portfolio Section */}
        <SubpagePortfolio 
          title="Sektor Strategii Lokalnych" 
          subtitle="Poznaj kluczowe obszary, dzięki którym wprowadzamy firmy na szczyt wyników w Warszawie"
          cases={portfolioCases} 
          layout="vertical"
        />

        {/* Pricing */}
        <Pricing />

        {/* FAQ Section */}
        <AppleFaq faqData={faqData} title="Często zadawane pytania (Lokalne SEO)" />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
