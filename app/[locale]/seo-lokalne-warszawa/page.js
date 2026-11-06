export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'Local SEO Warsaw | Google Maps Visibility for Companies' : 'SEO Lokalne Warszawa | Pozycjonowanie Lokalne Firm',
  description: locale === 'en' ? 'Local SEO agency for Google Maps rankings in Warsaw. We optimise your Google Business Profile, NAP consistency and reviews so nearby customers find you.' : 'Pozycjonowanie lokalne i SEO lokalne w Warszawie. Zdominuj Mapy Google i Profil Firmy, zdobądź klientów z okolicy, wyprzedź lokalną konkurencję.',
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
import ServiceSchema from '@/components/ServiceSchema';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import Image from 'next/image';
import Byline from '@/components/Byline';
import { hrefJesliOpublikowana } from '@/lib/publikacja';

// 5.11.2026 (LO1; PLAN-v2 6.21, OP-09, OP-10, AV-06/Z1, CB-16, OP-04) - strona chroniona: tylko
// DODAWANIE w wersji PL (answer, nowe sekcje pod lang === 'pl'); answerEn i EN bez zmian poza kaflem Z1.
// Nowe pytania mają tylkoPl: true - na /en/local-seo-warsaw zostają 3 pytania, na PL jest 6.
// L1 (/pozycjonowanie-wizytowki-google) jest w partii 2: zdania z linkiem do niej renderują się
// dopiero po publikacji (hrefJesliOpublikowana, reguła 6.0). Link do sprawdzarki - po T0.2.
const HREF_L1 = hrefJesliOpublikowana('/pozycjonowanie-wizytowki-google');

const faqData = [
  {
    question: 'Kiedy zobaczę efekty pozycjonowania lokalnego w Warszawie?',
    questionEn: 'When will I see the effects of local SEO in Warsaw?',
    answer: 'Zoptymalizowana wizytówka Google Profil Firmy może przynieść pierwsze zyski w postaci nowych telefonów i zapytań już w ciągu 2-4 tygodni. Celem dla uzgodnionych fraz lokalnych jest TOP 3 w 2–3 miesiące: postęp widzisz co tydzień w panelu klienta, a jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł. W najbardziej konkurencyjnych dzielnicach Warszawy zbudowanie wiodącej pozycji może potrwać 3-6 miesięcy.',
    answerEn: 'An optimized Google Business Profile can generate the first returns in the form of new calls and inquiries within 2-4 weeks. The goal for agreed local keywords is a TOP 3 within 2–3 months: you track progress weekly in the client portal, and if we miss it after 3 months, the next month is on us. In the most competitive Warsaw districts, building a leading position can take 3-6 months.'
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
    answer: 'SEO lokalne skupia się na tzw. "Local Pack", czyli wynikach z Map Google (Mappack) oraz organicznych wynikach geolokalizowanych. Zamiast budować globalny zasięg, walczymy o klientów wyszukujących Twoich usług w promieniu kilku/kilkunastu kilometrów. Oba podejścia łączymy: zakres ogólnopolski opisujemy na stronie o <a href="/pozycjonowanie-stron-internetowych" style="text-decoration:underline">pozycjonowaniu stron</a>.',
    answerEn: 'Local SEO (or local search engine optimization) focuses on the "Local Pack"—results from Google Maps—and geolocated organic results. Instead of building global reach, we compete for clients searching for your services within a few miles radius.'
  },
  {
    // Nowe (LO1, OP-10): 40 słów; „ile kosztuje pozycjonowanie lokalne” 10/mies. (DataForSEO, 4.11.2026).
    id: 'ile-kosztuje-pozycjonowanie-lokalne',
    tylkoPl: true,
    question: 'Ile kosztuje pozycjonowanie lokalne?',
    answer: 'Pozycjonowanie lokalne jest w cenie każdego pakietu, od 1 900 zł netto miesięcznie w SEO Standard. Nie dopłacasz za optymalizację wizytówki Google ani za posty i odpowiedzi na opinie. Umowa jest miesięczna, a pełne porównanie pakietów znajdziesz w <a href="/cennik-pozycjonowania" style="text-decoration:underline">cenniku pozycjonowania</a>.',
  },
  {
    // Nowe (LO1, OP-10): 44 słowa, bez liczby Senuto. Po T0.2 (POST /api/ai-check z pustym body = 400)
    // link 19 na słowach „Sprawdź za darmo, czy ChatGPT poleca Twoją firmę” → /sprawdz-widocznosc-w-ai.
    id: 'czy-chatgpt-poleca-firmy-lokalne',
    tylkoPl: true,
    question: 'Czy ChatGPT poleca firmy lokalne?',
    answer: 'Coraz częściej tak. ChatGPT z wyszukiwaniem w sieci korzysta z wizytówek, opinii i katalogów firm, więc dobrze prowadzone SEO lokalne (ang. local SEO) pomaga też w odpowiedziach modeli. Sprawdź za darmo, czy ChatGPT poleca Twoją firmę, gdy klient pyta o usługę w Twoim mieście.',
  },
  {
    // Nowe (LO1, CB-16): 45 słów (+7 z linkiem do L1 po jej publikacji); celowo inne zdania niż
    // FAQ 6 na L1 („Czym różni się pozycjonowanie wizytówki od pozycjonowania strony?”).
    // Zakres = karty i karuzela tej strony (kategorie, posty, NAP, nazwy dzielnic) + Z1 (opinie).
    id: 'seo-lokalne-a-wizytowka-google',
    tylkoPl: true,
    question: 'Czy SEO lokalne obejmuje prowadzenie wizytówki Google?',
    answer: 'Tak. Prowadzenie wizytówki Google jest w każdym naszym pakiecie SEO: uzupełniamy kategorie i usługi, dodajemy zdjęcia i posty, odpowiadamy na opinie i pilnujemy, żeby nazwa, adres i telefon były takie same jak w katalogach. Na stronie firmy dopisujemy treści z nazwami dzielnic, które wzmacniają widoczność w Mapach.'
      + (HREF_L1 ? ` Więcej o tej części pracy: <a href="${HREF_L1}" style="text-decoration:underline">pozycjonowanie wizytówki Google</a>.` : ''),
  }
];

// 5.11.2026 (ALT; OP-16): karty 2–3 to zdjęcia stockowe (kłódka na drzwiach, 3 osoby przy laptopach),
// których alt PL był kopią H3 karty - decorative: true = w PL alt="" i bez title (SubpagePortfolio.jsx).
// Karta 1 (alt i plik z frazą „pozycjonowanie lokalne”) bez zmian do D18; alty EN bez zmian.
const portfolioCases = [
  {
    tag: 'WIZYTÓWKA GOOGLE (GBP)',
    tagEn: 'GOOGLE BUSINESS PROFILE (GBP)',
    title: 'Optymalizacja Profilu Firmy',
    titleEn: 'Business Profile Optimization',
    description: 'Konfigurujemy Twoją wizytówkę Google od A do Z. Wdrażamy odpowiednie słowa kluczowe, precyzyjne kategorie i system postów, który przyciąga uwagę klientów',
    descriptionEn: 'We configure your Google Business Profile from A to Z: the right keywords, precise categories and a posting system that reaches customers browsing Maps in Warsaw.',
    image: '/images/pozycjonowanie-lokalne-warszawa.jpg',
    imgAlt: 'Pozycjonowanie lokalne',
    imgAltEn: 'Local SEO',
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
    description: 'Rejestrujemy Twoją firmę w kluczowych warszawskich i ogólnopolskich katalogach branżowych (Panorama Firm, Yelp itp.). Pilnujemy, żeby nazwa, adres i telefon były wszędzie identyczne — to mocny sygnał zaufania dla Google.',
    descriptionEn: 'We register your business in key local and national industry directories (Yelp, etc.). We keep the Name, Address and Phone identical everywhere, which is a powerful trust signal for Google.',
    image: '/images/unsplash-1555529902-5261145633bf.jpg',
    decorative: true,
    imgAltEn: 'Local authority and NAP consistency',
    imgTitleEn: 'Building local authority',
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
    descriptionEn: 'We implement automated processes for collecting reviews from satisfied customers. In local search, reviews are the strongest conversion factor there is.',
    image: '/images/unsplash-1522202176988-66273c2fd55f.jpg',
    decorative: true,
    imgAltEn: 'Review collection strategy',
    imgTitleEn: 'Review collection strategy',
    gradient: 'linear-gradient(135deg, #4C1D95 0%, #6D28D9 50%, #7C3AED 100%)',
    // Z1 / AV-06 (5.11.2026): „Średnia ocen 5.0” nie miała źródła. Teraz proces, który obiecujemy
    // (PLAN-v2 6.26, LOK: odpowiedź na każdą opinię ≤ 48 h), a nie wynik klienta.
    metric: '≤ 48 h',
    metricLabel: 'Odpowiedź na każdą opinię',
    metricLabelEn: 'Reply to every review',
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
  // FAQPage = pytania widoczne na stronie: PL 6, EN 3 (bez pytań tylkoPl).
  const faqWidoczne = lang === 'pl' ? faqData : faqData.filter((f) => !f.tylkoPl);
  return (
    <>
      <ServiceSchema variant="seo-lokalne" />
      <Header />
      <Breadcrumbs pl="SEO Lokalne Warszawa" en="Local SEO Warsaw" />
      <main className="subpage-main" style={{ paddingTop: '100px', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        
        {/* Hero Banner */}
        <section className="subpage-hero" style={{ paddingTop: '80px', paddingBottom: '80px', position: 'relative', textAlign: 'center' }}>
          <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
            <Reveal>
            <div style={{ fontSize: '0.85rem', color: '#86868B', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase', fontWeight: 600 }}>Search Engine Optimization - Local SEO Warsaw</div>
              <div className="section-tag" style={{ color: 'var(--color-cta)', marginBottom: '1.5rem', display: 'inline-flex', justifyContent: 'center', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem' }}>
                {lang === 'pl' ? 'SEO Warszawa. Konkurent wyżej?' : 'LOCAL B2B & B2C MARKETING'}
              </div>
              
              <h1 style={{ 
                fontSize: 'clamp(3.5rem, 7vw, 6rem)', 
                fontWeight: 700, 
                lineHeight: 1.05, 
                color: 'var(--color-text-main)', 
                marginBottom: '1rem', 
                letterSpacing: '-0.04em'
              }}>
                {lang === 'pl' ? 'SEO lokalne i pozycjonowanie lokalne Warszawa' : 'Local SEO and Google Maps visibility in Warsaw'}
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

              <p className="hero-lead" style={{ 
                fontSize: 'clamp(1.1rem, 2vw, 1.3rem)', 
                color: '#333336', 
                lineHeight: 1.6, 
                maxWidth: '700px', 
                margin: '0 auto 3rem auto',
                fontWeight: 400
              }}>
                {lang === 'pl' 
                  ? <>Pozycjonowanie stron w Warszawie od <span style={{ color: 'var(--color-cta)', fontWeight: 'bold' }}>1 900 zł netto/mies.</span> Umowa na miesiąc. Wizytówka Google, Mapy i wyniki organiczne dla firm z Warszawy — skuteczne <span style={{ fontWeight: 'bold' }}>pozycjonowanie lokalne</span> bez wieloletnich umów.</>
                  : <>Harness the power of local searches. Effective optimization helps scale businesses by combining <span style={{ color: 'var(--color-cta)' }}>advanced analytics with proven visibility strategies</span>. Dominate your market!</>}
              </p>
              {/* Obietnice z nagłówków RSA w pierwszym ekranie. */}
              <p className="hero-proof" style={{ margin: '-1.75rem auto 2.25rem auto', fontSize: '0.95rem', fontWeight: 600, color: '#6E6E73' }}>
                {lang === 'pl'
                  ? '✓ Wizytówka Google w cenie · ✓ Raport co miesiąc · ✓ Odpowiedź w 24 h w dni robocze'
                  : '✓ Google Business Profile included · ✓ Monthly report · ✓ Reply within 24 h on business days'}
              </p>
              
              <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a href={hash('kontakt', locale)} className="hero-btn-primary" data-cta="service_hero_warszawa">
                  {lang === 'pl' ? 'Sprawdź Swój Potencjał' : 'Check Your Potential'} 
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                </a>
                <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="service_hero_warszawa_tel">
                  {lang === 'pl' ? 'Zadzwoń: 518 815 055' : 'Call: +48 518 815 055'}
                </a>
              </div>
              {/* OP-14: autor i data (LASTMOD); na /en Byline nic nie renderuje. */}
              <Byline sciezka="/seo-lokalne-warszawa" style={{ margin: '2rem 0 0' }} />
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
                {lang === 'pl' ? 'Pozycjonowanie stron w Warszawie — dlaczego lokalnie?' : 'Why Local SEO & Search Engine Optimization Matters'}
              </h2>
              <p style={{ fontSize: '1.2rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500 }}>
                {lang === 'pl'
                  ? 'Zrozum, jak zachowują się użytkownicy smartfonów poszukujący usług.'
                  : 'Understand how smartphone users behave when they search for services near them.'}
              </p>
              {/* OP-09 (link 21): osłabia kanibalizację „pozycjonowanie stron warszawa” ze stroną główną;
                  anchor zgodny z istniejącym „agencja seo warszawa” → /. Bez nowego H2 z „Warszawa” (G1). */}
              {lang === 'pl' && (
                <p style={{ fontSize: '1.05rem', color: '#333336', margin: '1rem auto 0 auto', lineHeight: 1.6 }}>
                  Jeśli szukasz agencji do pozycjonowania całej strony, a nie tylko widoczności w okolicy, zobacz, jak pracuje nasza <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>agencja SEO w Warszawie</Link>.
                </p>
              )}
            </Reveal>

            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 1' : 'RULE 1'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wyszukiwania z Intencją "Near Me"' : 'Searches with local intent'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? <>Ponad 46% wszystkich wyszukiwań w Google ma intencję lokalną. Profesjonalne <span style={{ fontWeight: 'bold' }}>pozycjonowanie lokalne</span> sprawia, że klienci są gotowi do natychmiastowego telefonu lub wizyty w lokalu. Polecamy także sprawdzić <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>jak pozyskiwać opinie</Link>.</> : <>Over 46% of all Google searches have a local intent, which means those customers are ready to call or visit straight away. Check out our <Link href="/blog/jak-pozyskiwac-opinie-google-poradnik" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Google reviews guide</Link>.</>}</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 2' : 'RULE 2'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Widoczność Mobilna' : 'Mobile visibility'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Dominacja na urządzeniach mobilnych to klucz w branżach lokalnych (gastronomia, usługi prawne, beauty), gdzie decyzje podejmuje się "w drodze".' : 'Mobile dominance is key in local industries (gastronomy, legal services, beauty), where decisions are made on the go.'}</p>
              </RevealItem>
              
              <RevealItem style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--color-text-main)', marginBottom: '1.5rem', letterSpacing: '0.05em' }}>{lang === 'pl' ? 'ZASADA 3' : 'RULE 3'}</div>
                <h3 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.25rem', lineHeight: 1.2 }}>{lang === 'pl' ? 'Wysoka Konwersja' : 'High conversion rate'}</h3>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.55 }}>{lang === 'pl' ? 'Ruch z Map Google cechuje się jednym z najwyższych wskaźników konwersji ze wszystkich cyfrowych kanałów marketingowych.' : 'Traffic from Google Maps is characterized by one of the highest conversion rates of all digital marketing channels.'}</p>
              </RevealItem>
            </RevealStagger>
            {/* CTA w środku strony: między hero a #kontakt były sekcje bez żadnego przycisku. */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href={hash('kontakt', locale)} className="btn btn-primary" data-cta="service_mid_warszawa_1">
                {lang === 'pl' ? 'Zapytaj o wycenę — odpowiedź w 24 h' : 'Ask for a quote — reply within 24 h'}
              </a>
            </div>
          </div>
        </section>

        {/* Warszawa dzielnica po dzielnicy - tresc lokalna, ktorej nie da sie
            przeniesc do innego miasta. Strona celowala we fraze lokalna, nie
            majac ani jednej nazwy dzielnicy w tresci. */}
        <section style={{ padding: '80px 0' }}>
          <div className="container" style={{ maxWidth: '1240px', margin: '0 auto' }}>
            <Reveal className="section-header" style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 3rem auto' }}>
              <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1rem' }}>
                {lang === 'pl' ? 'Pozycjonowanie lokalne w Warszawie dzielnica po dzielnicy' : 'Local SEO in Warsaw, district by district'}
              </h2>
              <p style={{ fontSize: '1.1rem', color: '#6E6E73', margin: '0 auto', fontWeight: 500, lineHeight: 1.6 }}>
                {lang === 'pl'
                  ? 'W pakiecie lokalnym Google największą wagę ma odległość użytkownika od firmy. Dlatego w Warszawie nie ma jednej strategii — inaczej wygląda walka o widoczność w Śródmieściu, a inaczej na Ursynowie.'
                  : 'In the Google local pack, the distance between the user and the business carries the most weight. That is why Warsaw has no single strategy: competing in Srodmiescie looks nothing like competing in Ursynow.'}
              </p>
            </Reveal>
            <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    {lang === 'pl' ? 'Śródmieście i Wola' : 'Srodmiescie and Wola'}
                  </h3>
                  <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Najgęstszy rynek biurowy w Polsce. W promieniu kilometra od Ronda ONZ o te same frazy walczy kilkadziesiąt firm z jednej branży, więc o miejsce w pakiecie lokalnym nie decyduje już odległość, tylko liczba i świeżość opinii oraz kompletność wizytówki.' : 'The densest office market in Poland. Within a kilometre of Rondo ONZ dozens of companies from one industry compete for the same phrases, so the local pack is decided by the number and freshness of reviews and by profile completeness, not by distance.'}
                  </p>
                </RevealItem>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    {lang === 'pl' ? 'Mokotów i Służewiec' : 'Mokotow and Sluzewiec'}
                  </h3>
                  <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Dzielnica biurowa o wyraźnym rytmie dnia: szczyt wyszukiwań przypada na godziny pracy, a zapytania mają charakter „teraz i blisko". Kluczowe są aktualne godziny otwarcia, zdjęcia wnętrza i możliwość dojścia pieszo w kilka minut.' : 'An office district with a clear daily rhythm: searches peak during working hours and the intent is immediate and local. Accurate opening hours, interior photos and a few minutes\' walking distance decide the outcome.'}
                  </p>
                </RevealItem>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    {lang === 'pl' ? 'Ursynów, Wilanów, Białołęka' : 'Ursynow, Wilanow and Bialoleka'}
                  </h3>
                  <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Rynki mieszkaniowe: mniejsza konkurencja i wyższa konwersja niż w centrum. To tutaj najszybciej wchodzi się do TOP 3 Map, bo o wyniku decyduje promień i opinie od osób z sąsiedztwa.' : 'Residential markets with less competition and higher conversion than the centre. This is where a business reaches the Maps top three fastest, because proximity and neighbourhood reviews carry most of the weight.'}
                  </p>
                </RevealItem>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-main)' }}>
                    {lang === 'pl' ? 'Praga-Południe i Praga-Północ' : 'Praga-Poludnie and Praga-Polnoc'}
                  </h3>
                  <p style={{ color: '#333336', fontSize: '1.05rem', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Gastronomia, rzemiosło i usługi. Konkurencja rośnie, ale nasycenie dobrze prowadzonymi wizytówkami wciąż jest niskie — regularne posty i odpowiedzi na opinie dają tu przewagę szybciej niż gdziekolwiek indziej w mieście.' : 'Restaurants, crafts and services. Competition is growing, but the share of well-run business profiles is still low, so regular posts and replies to reviews build an advantage faster here than anywhere else in the city.'}
                  </p>
                </RevealItem>
            </RevealStagger>
            <Reveal>
              <p style={{ maxWidth: '820px', margin: '3rem auto 0 auto', color: '#333336', fontSize: '1.05rem', lineHeight: 1.65, textAlign: 'center' }}>
                {lang === 'pl'
                  ? 'Jeśli obsługujesz klientów w całym mieście i nie masz lokalu z obsługą, konfigurujemy wizytówkę jako Service Area Business z obszarem obejmującym wszystkie dzielnice — wtedy o widoczność walczymy zasięgiem i opiniami, a nie adresem.'
                  : 'If you serve the whole city and have no walk-in location, we set the profile up as a Service Area Business covering every district — then visibility is won with service area and reviews rather than with an address.'}
              </p>
            </Reveal>
            {/* CTA w środku strony: między hero a #kontakt były sekcje bez żadnego przycisku. */}
            <div style={{ textAlign: 'center', marginTop: '3rem' }}>
              <a href={hash('kontakt', locale)} className="btn btn-primary" data-cta="service_mid_warszawa_2">
                {lang === 'pl' ? 'Zapytaj o wycenę — odpowiedź w 24 h' : 'Ask for a quote — reply within 24 h'}
              </a>
            </div>
          </div>
        </section>

        {/* LO1 (OP-10, PLAN-v2 6.21): information gain z panelu - pomiar siatką 7×7 (49 punktów co 14 dni,
            PanelPageClient.jsx:27). Tylko PL. Obraz = demo panelu, więc podpis „dane przykładowe”; od W4
            skan GRID własnej wizytówki z datą skanu (zmiana obrazu i podpisu = dodanie treści). */}
        {lang === 'pl' && (
          <section style={{ padding: '80px 0' }}>
            <div className="container" style={{ maxWidth: '900px', margin: '0 auto' }}>
              <Reveal>
                <h2 style={{ fontSize: 'clamp(2rem, 3vw, 2.5rem)', fontWeight: 700, color: 'var(--color-text-main)', letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Jak mierzymy pozycjonowanie lokalne: siatka 7×7 w Mapach Google
                </h2>
                <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.65, marginBottom: '2rem' }}>
                  Pozycja wizytówki w Mapach Google zależy od tego, gdzie stoi szukający. Dlatego co 14 dni sprawdzamy ją w siatce 7×7, czyli w 49 punktach wokół adresu firmy, a wynik widzisz w panelu klienta jako mapę. Od razu widać, w których miejscach wokół firmy jesteś w TOP 3, a gdzie wizytówka jeszcze nie wchodzi do pakietu lokalnego.
                </p>
                <figure style={{ margin: 0 }}>
                  <Image
                    src="/images/panel/mapy.webp"
                    alt="Zakładka Mapy Google w panelu klienta: dwie siatki 7×7 z pozycją wizytówki demonstracyjnej stolarni dla fraz „stolarz” i „meble na wymiar” (dane przykładowe)"
                    width={1600}
                    height={1025}
                    sizes="(max-width: 960px) 100vw, 900px"
                    style={{ width: '100%', height: 'auto', display: 'block', borderRadius: '20px', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)' }}
                  />
                  <figcaption style={{ marginTop: '0.75rem', fontSize: '0.9rem', lineHeight: 1.5, color: '#6E6E73' }}>
                    Panel klienta, dane przykładowe: zielone punkty to miejsca, z których wizytówka jest w TOP 3 Map.
                  </figcaption>
                </figure>
                {HREF_L1 && (
                  <p style={{ color: '#333336', fontSize: '1.1rem', lineHeight: 1.65, margin: '2rem 0 0 0' }}>
                    Pracę nad samym Profilem Firmy w Google, od kategorii po posty i opinie, opisujemy osobno na stronie <Link href={HREF_L1} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>pozycjonowanie wizytówki Google</Link>.
                  </p>
                )}
              </Reveal>
            </div>
          </section>
        )}

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
                    {lang === 'pl' ? 'Firma SEO w Twojej Okolicy' : 'A local SEO company'}
                  </h3>
                  <p style={{ color: '#333336', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Znalezienie wiarygodnego partnera jest kluczowe. Zapewniamy eksperckie strategie dominacji na lokalnym rynku, trafiając do klientów szukających usług w Twojej okolicy.' : 'Finding a reliable partner is crucial. If you are searching for SEO near me, we provide expert strategies to dominate your local market.'}
                  </p>
                </RevealItem>
                <RevealItem style={{ background: '#FFFFFF', borderRadius: '24px', padding: '2.5rem' }}>
                  <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem' }}>
                    {lang === 'pl' ? 'Najlepsze Lokalne SEO' : 'Leading local SEO'}
                  </h3>
                  <p style={{ color: '#333336', lineHeight: 1.6 }}>
                    {lang === 'pl' ? 'Nie gwarantujemy pozycji nr 1 — Google nas o zdanie nie pyta. Obiecujemy plan, robotę, panel klienta z mapami i wynikami organicznymi na bieżąco, comiesięczny raport oraz cel TOP 3 dla uzgodnionych fraz w 2–3 miesiące. Dedykowane usługi lokalnego SEO dopasowane do Twojego obszaru.' : 'We do not guarantee the #1 spot — Google does not ask our opinion. We promise a plan, the work, a client portal with map pack and organic results, a monthly report and a TOP 3 goal for agreed keywords within 2–3 months. Dedicated local SEO services tailored to your area.'}
                  </p>
                </RevealItem>
              </RevealStagger>
            </div>
          </section>

        {/* Portfolio Section */}
        <SubpagePortfolio
          title={lang === 'pl' ? 'Sektor Strategii Lokalnych' : 'Local Strategy Sector'}
          subtitle={lang === 'pl'
            ? 'Poznaj kluczowe obszary, w których budujemy widoczność firm w wynikach w Warszawie — przykładowe scenariusze, ilustracja metody, nie wyniki konkretnych klientów'
            : 'The key areas of local search engine optimization we use to build companies\' visibility in the Warsaw results — illustrative scenarios of the method, not results of specific clients'}
          cases={portfolioCases}
          layout="vertical"
        />

        {/* Pricing */}
        <Pricing />

        {/* FAQ Section */}
        <AppleFaq faqData={faqWidoczne} title={lang === 'pl' ? "Często zadawane pytania (Lokalne SEO)" : "Local Search Engine Optimization FAQs"} />

        <Contact />
      </main>
      <Footer />
    </>
  );
}
