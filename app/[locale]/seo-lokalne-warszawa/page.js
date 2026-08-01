export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Local SEO | SEO Agency Near Me & SEO Company Near Me' : 'SEO Lokalne Warszawa | Pozycjonowanie Lokalne Firm',
  description: locale === 'en' ? 'Looking for local search engine optimization or seo near me? We are a leading seo company near me and seo agency near me offering local seo. Compare seo firms near me, get seo services near me from top search engine optimization companies near me.' : 'Skuteczne pozycjonowanie lokalne i SEO lokalne w Warszawie. Zdominuj Mapy Google (Google Profil Firmy), zdobądź klientów z Twojej okolicy i wyprzedź konkurencję.',
  alternates: {
    canonical: locale === 'en' ? `/en/local-seo-warsaw` : `/pl/seo-lokalne-warszawa`,
    languages: {
      'pl': `/pl/seo-lokalne-warszawa`,
      'en': `/en/local-seo-warsaw`
    }
  },
};
}

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';

const faqData = [
  {
    question: 'Kiedy zobaczę efekty pozycjonowania lokalnego w Warszawie?',
    questionEn: 'When will I see the effects of local SEO in Warsaw?',
    answer: 'Zoptymalizowana wizytówka Google Profil Firmy może przynieść pierwsze zyski w postaci nowych telefonów i zapytań już w ciągu 2-4 tygodni. Zbudowanie solidnej, wiodącej pozycji w konkurencyjnych dzielnicach Warszawy to proces na 3-6 miesięcy.',
    answerEn: 'An optimized Google Business Profile can generate the first returns in the form of new calls and inquiries within 2-4 weeks. Building a solid, leading position in competitive Warsaw districts is a 3-6 month process.'
  },
  {
    question: 'Czy muszę posiadać fizyczne biuro w Warszawie?',
    questionEn: 'Do I need a physical office in Warsaw?',
    answer: 'Google preferuje firmy z weryfikowalnym adresem fizycznym. Jeśli obsługujesz klientów mobilnie na terenie Warszawy (np. hydraulik, mobilny mechanik), możemy ukryć dokładny adres, konfigurując tzw. obszar świadczenia usług (Service Area Business).',
    answerEn: 'Google prefers businesses with a verifiable physical address. If you serve clients mobile across Warsaw (e.g., plumber, mobile mechanic), we can hide the exact address by configuring a Service Area Business.'
  },
  {
    question: 'Czym różni się SEO lokalne od tradycyjnego pozycjonowania?',
    questionEn: 'How does local SEO differ from traditional SEO?',
    answer: 'SEO lokalne skupia się na tzw. "Local Pack", czyli wynikach z Map Google (Mappack) oraz organicznych wynikach geolokalizowanych. Zamiast budować globalny zasięg, walczymy o klientów wyszukujących Twoich usług w promieniu kilku/kilkunastu kilometrów.',
    answerEn: 'Local SEO focuses on the "Local Pack"—results from Google Maps—and geolocated organic results. Instead of building global reach, we compete for clients searching for your services within a few miles radius.'
  }
];

const portfolioCases = [
  {
    tag: 'WIZYTÓWKA GOOGLE (GBP)',
    tagEn: 'GOOGLE BUSINESS PROFILE (GBP)',
    title: 'Optymalizacja Profilu Firmy',
    titleEn: 'Business Profile Optimization',
    description: 'Konfigurujemy Twoją wizytówkę Google od A do Z. Wdrażamy odpowiednie słowa kluczowe, precyzyjne kategorie i system postów, który przyciąga uwagę klientów przeglądających Mapy w Warszawie.',
    descriptionEn: 'We configure your Google listing from A to Z. We implement the right keywords, precise categories, and a post system that attracts customers browsing Maps in Warsaw.',
    image: '/images/pozycjonowanie-lokalne-warszawa.jpg',
    imgAlt: 'Pozycjonowanie lokalne',
    imgTitle: 'Pozycjonowanie lokalne',
    gradient: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 50%, #312E81 100%)',
    metric: '+150%',
    metricLabel: 'Wyświetlenia',
    metricLabelEn: 'Views',
    metric2: '+85%',
    metric2Label: 'Telefony z Map',
    metric2LabelEn: 'Calls from Maps'
  },
  {
    tag: 'SYGNAŁY NAP & CYTACJE',
    tagEn: 'NAP SIGNALS & CITATIONS',
    title: 'Budowanie Autorytetu Lokalnego',
    titleEn: 'Building Local Authority',
    description: 'Rejestrujemy Twoją firmę w kluczowych warszawskich i ogólnopolskich katalogach branżowych (Panorama Firm, Yelp itp.). Gwarantujemy pełną spójność nazwy, adresu i telefonu (NAP), co jest potężnym sygnałem zaufania dla Google.',
    descriptionEn: 'We register your business in key local and national industry directories (Yelp, etc.). We guarantee complete consistency of Name, Address, and Phone (NAP), which is a powerful trust signal for Google.',
    image: '/images/unsplash-1555529902-5261145633bf.jpg',
    gradient: 'linear-gradient(135deg, #064E3B 0%, #047857 50%, #059669 100%)',
    metric: '100%',
    metricLabel: 'Spójność NAP',
    metricLabelEn: 'NAP Consistency',
    metric2: 'Top 3',
    metric2Label: 'Local Pack',
    metric2LabelEn: 'Local Pack'
  },
  {
    tag: 'OPINIE KLIENTÓW',
    tagEn: 'CUSTOMER REVIEWS',
    title: 'Strategia Zbierania Opinii',
    titleEn: 'Review Collection Strategy',
    description: 'Wdrażamy w Twojej firmie zautomatyzowane procesy pozyskiwania pięciogwiazdkowych recenzji od zadowolonych klientów. Opinie to najważniejszy czynnik konwersji (Social Proof) na warszawskim rynku.',
    descriptionEn: 'We implement automated processes in your company for acquiring five-star reviews from satisfied customers. Reviews are the most important conversion factor (Social Proof) in the local market.',
    image: '/images/unsplash-1522202176988-66273c2fd55f.jpg',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    metric: '5.0',
    metricLabel: 'Średnia ocen',
    metricLabelEn: 'Average rating',
    metric2: 'Trust',
    metric2Label: 'Wiarygodność',
    metric2LabelEn: 'Credibility'
  }
];

const carouselItems = [
  {
    number: '01 / AUDYT',
    numberEn: '01 / AUDIT',
    metric: 'Diagnoza',
    metricEn: 'Diagnosis',
    title: 'Analiza Konkurencji',
    titleEn: 'Competitor Analysis',
    description: 'Weryfikujemy, co robią liderzy w Twojej dzielnicy i wyznaczamy plan działania oparty na danych.',
    descriptionEn: 'We verify what the leaders in your area are doing and define a data-driven action plan.',
    width: 'min(85vw, 470px)',
    minHeight: '370px'
  },
  {
    number: '02 / MAPY',
    numberEn: '02 / MAPS',
    metric: 'GMB',
    title: 'Konfiguracja Wizytówki',
    titleEn: 'Profile Configuration',
    description: 'Przejmujemy kontrolę nad Twoim Profilem w Google, uzupełniając go o odpowiednie frazy i tagi.',
    descriptionEn: 'We take control of your Google Profile, completing it with the right keywords and tags.',
    width: 'min(75vw, 360px)'
  },
  {
    number: '03 / LINKI',
    numberEn: '03 / LINKS',
    metric: 'Autorytet',
    metricEn: 'Authority',
    title: 'Lokalny Link Building',
    titleEn: 'Local Link Building',
    description: 'Zdobywamy wzmianki o Twojej firmie na lokalnych warszawskich portalach i branżowych stronach.',
    descriptionEn: 'We acquire mentions of your business on local portals and industry websites.',
    width: 'min(80vw, 430px)',
    minHeight: '380px'
  },
  {
    number: '04 / TREŚĆ',
    numberEn: '04 / CONTENT',
    metric: 'On-Page',
    title: 'Optymalizacja Witryny',
    titleEn: 'Website Optimization',
    description: 'Dodajemy modyfikatory lokalne (nazwy dzielnic Warszawy) na stronę oraz wdrażamy Schema LocalBusiness.',
    descriptionEn: 'We add local modifiers to your pages and implement Schema LocalBusiness markup.',
    width: 'min(75vw, 370px)'
  }
];

export default function SeoLokalneWarszawaPage() {
  const lang = useLocale();
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
              <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                {lang === 'pl' ? 'MARKETING LOKALNY B2B & B2C' : 'LOCAL B2B & B2C MARKETING'}
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3.5rem, 7vw, 6rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: 'var(--color-text-main)', 
                marginBottom: '1rem', 
                letterSpacing: '-0.04em'
              }}>
                {lang === 'pl' ? 'SEO i pozycjonowanie lokalne Warszawa' : 'Local SEO Warsaw'}
              </h1>

              <div style={{ 
                width: '120px', 
                height: '6px', 
                background: 'linear-gradient(90deg, var(--color-cta) 0%, #FF8A65 100%)', 
                margin: '0 auto 2rem auto', 
                borderRadius: '3px',
                boxShadow: '0 4px 15px rgba(216, 90, 48, 0.4)'
              }}></div>

              <div style={{ 
                fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
                fontWeight: 700, 
                color: 'var(--color-text-main)', 
                marginBottom: '1.5rem', 
                lineHeight: 1.1,
                letterSpacing: '-0.02em'
              }}>
                {lang === 'pl' ? (
                  <>Zdominuj Swoją Ofertą<br/>Mapy Google</>
                ) : (
                  <>Dominate Your Offer<br/>Google Maps</>
                )}
              </div>

              <p style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
                color: '#333336', 
                lineHeight: 1.6, 
                maxWidth: '700px', 
                margin: '0 auto 3rem auto',
                fontWeight: 400
              }}>
                {lang === 'pl' 
                  ? <>Wykorzystaj potęgę wyszukiwań lokalnych. Skuteczne <strong>pozycjonowanie lokalne</strong> pozwala skalować firmy, łącząc <span style={{ color: 'var(--color-cta)' }}>zaawansowaną analitykę ze sprawdzonymi strategiami</span>. Zdominuj swój rynek!</>
                  : <>Harness the power of local searches. Effective optimization helps scale businesses by combining <span style={{ color: 'var(--color-cta)' }}>advanced analytics with proven visibility strategies</span>. Dominate your market!</>}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" className="hero-btn-primary">
                  {lang === 'pl' ? 'Sprawdź Swój Potencjał' : 'Check Your Potential'} 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a href={lang === 'pl' ? '/pl#portfolio' : '/en#portfolio'} className="hero-btn-secondary">
                  {lang === 'pl' ? 'Zobacz case studies' : 'View case studies'}
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
                Dlaczego pozycjonowanie lokalne ma znaczenie?
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                Zrozum, jak zachowują się użytkownicy smartfonów poszukujący usług.
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 1</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wyszukiwania z Intencją "Near Me"</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>Ponad 46% wszystkich wyszukiwań w Google ma intencję lokalną. Profesjonalne <strong>pozycjonowanie lokalne</strong> sprawia, że klienci są gotowi do natychmiastowego telefonu lub wizyty w lokalu. Polecamy także sprawdzić <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>jak pozyskiwać opinie</Link>.</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 2</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Widoczność Mobilna</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>Dominacja na urządzeniach mobilnych to klucz w branżach lokalnych (gastronomia, usługi prawne, beauty), gdzie decyzje podejmuje się "w drodze".</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>ZASADA 3</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>Wysoka Konwersja</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>Ruch z Map Google cechuje się jednym z najwyższych wskaźników konwersji ze wszystkich cyfrowych kanałów marketingowych.</p>
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
