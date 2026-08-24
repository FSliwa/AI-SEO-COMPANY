export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Local SEO Warsaw | Search Engine Optimization, SEO Near Me' : 'SEO Lokalne Warszawa | Pozycjonowanie Lokalne Firm',
  description: locale === 'en' ? 'Local search engine optimization agency for Google Maps rankings. Need SEO near me? Our company delivers proven local SEO services and results.' : 'Pozycjonowanie lokalne i SEO lokalne w Warszawie. Zdominuj Mapy Google i Profil Firmy, zdobądź klientów z okolicy, wyprzedź lokalną konkurencję.',
      alternates: {
    canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/local-seo-warsaw' : 'https://www.ai-seo-company.pl/seo-lokalne-warszawa',
    languages: {
      'pl': 'https://www.ai-seo-company.pl/seo-lokalne-warszawa',
      'x-default': 'https://www.ai-seo-company.pl/seo-lokalne-warszawa',
      'en': 'https://www.ai-seo-company.pl/en/local-seo-warsaw'
    }
  },
};
}

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Pricing from '@/components/Pricing';
import ServiceCarousel from '@/components/service/ServiceCarousel';
import AppleFaq from '@/components/service/AppleFaq';
import SubpagePortfolio from '@/components/service/SubpagePortfolio';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';

const faqData = [
  {
    question: 'Kiedy zobaczę efekty pozycjonowania lokalnego w Warszawie?',
    questionEn: 'When will I see the effects of local SEO in Warsaw?',
    answer: 'Zoptymalizowana wizytówka Google Profil Firmy może przynieść pierwsze zyski w postaci nowych telefonów i zapytań już w ciągu 2-4 tygodni. Zbudowanie solidnej, wiodącej pozycji w konkurencyjnych dzielnicach Warszawy to proces na 3-6 miesięcy.',
    answerEn: 'An optimized Google Business Profile can generate the first returns in the form of new calls and inquiries within 2-4 weeks. Building a solid, leading position in competitive Warsaw districts is a 3-6 month process. If you are looking for an seo agency near me or seo firms near me, we can help you build that solid position.'
  },
  {
    question: 'Czy muszę posiadać fizyczne biuro w Warszawie?',
    questionEn: 'Do I need a physical office in Warsaw?',
    answer: 'Google preferuje firmy z weryfikowalnym adresem fizycznym. Jeśli obsługujesz klientów mobilnie na terenie Warszawy (np. hydraulik, mobilny mechanik), możemy ukryć dokładny adres, konfigurując tzw. obszar świadczenia usług (Service Area Business).',
    answerEn: 'Google prefers businesses with a verifiable physical address. If you serve clients mobile across Warsaw (e.g., plumber, mobile mechanic), we can hide the exact address by configuring a Service Area Business. This is crucial when potential customers search for seo near me or local services.'
  },
  {
    question: 'Czym różni się SEO lokalne od tradycyjnego pozycjonowania?',
    questionEn: 'How does local SEO differ from traditional SEO?',
    answer: 'SEO lokalne skupia się na tzw. "Local Pack", czyli wynikach z Map Google (Mappack) oraz organicznych wynikach geolokalizowanych. Zamiast budować globalny zasięg, walczymy o klientów wyszukujących Twoich usług w promieniu kilku/kilkunastu kilometrów.',
    answerEn: 'Local SEO (or local search engine optimization) focuses on the "Local Pack"—results from Google Maps—and geolocated organic results. Instead of building global reach, we compete for clients searching for your services within a few miles radius.'
  }
];

const portfolioCases = [
  {
    tag: 'WIZYTÓWKA GOOGLE (GBP)',
    tagEn: 'GOOGLE BUSINESS PROFILE (GBP)',
    title: 'Optymalizacja Profilu Firmy',
    titleEn: 'Business Profile Optimization',
    description: 'Konfigurujemy Twoją wizytówkę Google od A do Z. Wdrażamy odpowiednie słowa kluczowe, precyzyjne kategorie i system postów, który przyciąga uwagę klientów',
    descriptionEn: 'As a top seo company near me, we configure your Google listing from A to Z. We implement the right keywords, precise categories, and a post system that attracts customers browsing Maps in Warsaw.',
    image: '/images/pozycjonowanie-lokalne-warszawa.jpg',
    imgAlt: 'Pozycjonowanie lokalne',
    imgAltEn: 'Local search engine optimization companies near me - SEO company near me',
    imgTitle: 'Pozycjonowanie lokalne',
    imgTitleEn: 'Local SEO Company',
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
    description: 'Rejestrujemy Twoją firmę w kluczowych warszawskich i ogólnopolskich katalogach branżowych (Panorama Firm, Yelp itp.). Gwarantujemy pełną spójność nazwy',
    descriptionEn: 'We register your business in key local and national industry directories (Yelp, etc.). We guarantee complete consistency of Name, Address, and Phone (NAP), which is a powerful trust signal for Google. This consistency is what top search engine optimization companies near me focus on to build trust.',
    image: '/images/unsplash-1555529902-5261145633bf.jpg',
    imgAltEn: 'Top local SEO agency near me and SEO firms near me',
    imgTitleEn: 'Local SEO agency near me',
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
    description: 'Wdrażamy w Twojej firmie zautomatyzowane procesy pozyskiwania pięciogwiazdkowych recenzji od zadowolonych klientów. Opinie to najważniejszy czynnik',
    descriptionEn: 'We implement automated processes in your company for acquiring five-star reviews from satisfied customers. Reviews are the most important conversion factor (Social Proof) in the local market. When clients look for seo services near me, reviews are the ultimate conversion factor.',
    image: '/images/unsplash-1522202176988-66273c2fd55f.jpg',
    imgAltEn: 'Expert SEO services near me and local SEO near me',
    imgTitleEn: 'Local SEO services near me',
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

export default async function SeoLokalneWarszawaPage({ params }) {
  // useLocale() w komponencie serwerowym czyta kontekst zadania i wymuszal
  // dynamiczne renderowanie CALEJ trasy (jedyna nie-statyczna strona po
  // wdrozeniu ISR). Locale bierzemy z params, jak na pozostalych stronach.
  const { locale } = await params;
  setRequestLocale(locale);
  const lang = locale;
  return (
    <>
      <Header />
      <Breadcrumbs pl="SEO Lokalne Warszawa" en="Local SEO Warsaw" />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
            <div style={{ fontSize: '0.85rem', color: '#86868B', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Search Engine Optimization - Local SEO Warsaw</div>
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
                {lang === 'pl' ? 'SEO lokalne i pozycjonowanie lokalne Warszawa' : 'Local SEO Warsaw & Search Engine Optimization Near Me'}
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
                  ? <>Wykorzystaj potęgę wyszukiwań lokalnych. Skuteczne <span style={{ fontWeight: 'bold' }}>pozycjonowanie lokalne</span> pozwala skalować firmy, łącząc <span style={{ color: 'var(--color-cta)' }}>zaawansowaną analitykę ze sprawdzonymi strategiami</span>. Zdominuj swój rynek!</>
                  : <>Harness the power of local searches. Effective optimization helps scale businesses by combining <span style={{ color: 'var(--color-cta)' }}>advanced analytics with proven visibility strategies</span>. Dominate your market!</>}
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href="#kontakt" className="hero-btn-primary">
                  {lang === 'pl' ? 'Sprawdź Swój Potencjał' : 'Check Your Potential'} 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a href={lang === 'pl' ? '/#portfolio' : '/en#portfolio'} className="hero-btn-secondary">
                  {lang === 'pl' ? 'Zobacz case studies' : 'View case studies'}
                </a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* Carousel */}
        <ServiceCarousel
          tag={lang === 'pl' ? 'SKUTECZNY PROCES' : 'PROVEN PROCESS'}
          title={lang === 'pl'
            ? 'Inżynieria Zysku na Rynku Lokalnym'
            : 'Engineering Profit in the Local Market'}
          subtitle={lang === 'pl'
            ? 'Proces optymalizacji, który transformuje przypadkowych klikających w płacących klientów z Twojej okolicy.'
            : 'A local SEO process that turns accidental clicks into paying customers from your own neighbourhood.'}
          items={carouselItems}
        />

        {/* Standards Section */}
        <section style={{ padding: '120px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 4rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.04em', lineHeight: 1.15, marginBottom: '1rem' }}>
                {lang === 'pl' ? 'Dlaczego pozycjonowanie lokalne ma znaczenie?' : 'Why Local SEO & Search Engine Optimization Matters'}
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                {lang === 'pl'
                  ? 'Zrozum, jak zachowują się użytkownicy smartfonów poszukujący usług.'
                  : 'Understand how smartphone users behave when they search for services near them.'}
              </p>
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 1' : 'RULE 1'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wyszukiwania z Intencją "Near Me"' : 'Finding Search Engine Optimization Companies Near Me'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? <>Ponad 46% wszystkich wyszukiwań w Google ma intencję lokalną. Profesjonalne <span style={{ fontWeight: 'bold' }}>pozycjonowanie lokalne</span> sprawia, że klienci są gotowi do natychmiastowego telefonu lub wizyty w lokalu. Polecamy także sprawdzić <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>jak pozyskiwać opinie</Link>.</> : <>Over 46% of all Google searches have a local intent. Working with top seo company near me ensures clients are ready to call you. Check out our <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Google reviews guide</Link>.</>}</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 2' : 'RULE 2'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Widoczność Mobilna' : 'Partnering with an SEO Agency & SEO Firms Near Me'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Dominacja na urządzeniach mobilnych to klucz w branżach lokalnych (gastronomia, usługi prawne, beauty), gdzie decyzje podejmuje się "w drodze".' : 'Mobile dominance is key in local industries (gastronomy, legal services, beauty), where decisions are made on the go.'}</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 3' : 'RULE 3'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wysoka Konwersja' : 'Utilizing Local SEO Services Near Me'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Ruch z Map Google cechuje się jednym z najwyższych wskaźników konwersji ze wszystkich cyfrowych kanałów marketingowych.' : 'Traffic from Google Maps is characterized by one of the highest conversion rates of all digital marketing channels.'}</p>
              </RevealItem>
            </RevealStagger>
          </div>
        </section>

        {/* Local SEO Strategy Section */}
        <section style={{ padding: '80px 0', background: '#F5F5F7' }}>
            <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
              <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                  {lang === 'pl' ? 'Lokalna Optymalizacja Wyszukiwarek' : 'Local Search Engine Optimization'}
                </h2>
                <p style={{ fontSize: '1.1rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                  {lang === 'pl' ? 'Zaawansowane strategie dla firm szukających lokalnych rozwiązań SEO.' : 'Advanced strategies for businesses looking for local SEO solutions.'}
                </p>
              </Reveal>
              <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {lang === 'pl' ? 'Firma SEO w Twojej Okolicy' : 'SEO Company Near Me'}
                  </h3>
                  <p style={{ color: '#333336', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Znalezienie wiarygodnego partnera jest kluczowe. Zapewniamy eksperckie strategie dominacji na lokalnym rynku, trafiając do klientów szukających usług w Twojej okolicy.' : 'Finding a reliable partner is crucial. If you are searching for SEO near me, we provide expert strategies to dominate your local market.'}
                  </p>
                </RevealItem>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {lang === 'pl' ? 'Najlepsze Lokalne SEO' : 'Top SEO Near Me'}
                  </h3>
                  <p style={{ color: '#333336', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Gwarantujemy, że Twoja firma zajmie wysokie pozycje w mapach i wynikach organicznych. Skorzystaj z naszych dedykowanych usług lokalnego SEO dopasowanych do Twojego obszaru.' : 'We ensure your business ranks highly in map packs and organic results. Benefit from our dedicated local SEO services tailored for your area.'}
                  </p>
                </RevealItem>
              </RevealStagger>
            </div>
          </section>

        {/* Portfolio Section */}
        <SubpagePortfolio
          title={lang === 'pl' ? 'Sektor Strategii Lokalnych' : 'Local Strategy Sector'}
          subtitle={lang === 'pl'
            ? 'Poznaj kluczowe obszary, dzięki którym wprowadzamy firmy na szczyt wyników w Warszawie'
            : 'The key areas of local search engine optimization we use to take companies to the top of the Warsaw results'}
          cases={portfolioCases}
          layout="vertical"
        />

        {/* Pricing */}
        <Pricing />

        {/* FAQ Section */}
        <AppleFaq faqData={faqData} title={lang === 'pl' ? "Często zadawane pytania (Lokalne SEO)" : "Local Search Engine Optimization FAQs"} />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
