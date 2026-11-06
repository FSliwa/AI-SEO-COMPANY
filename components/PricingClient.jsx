'use client';

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';
import EntryOffer from '@/components/EntryOffer';
import FairDeal from '@/components/FairDeal';
import { hash } from '@/lib/anchors';
import Byline from '@/components/Byline';
import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';

// 5.11.2026 (C2; PLAN-v2 6.18, OP-01, OP-04, MSA-18, CB-04, AV-12) - strona chroniona (strażnik fraz):
// tylko DODAWANIE treści w wersji PL. Title, meta, H1 i istniejące zdania bez zmian; nowe pytania FAQ
// mają tylkoPl: true i nie trafiają do /en/seo-pricing (EN zostaje 12 pytań, PL 14).
// Linki do stron z rejestru publikacji (P1, A6) idą przez hrefJesliOpublikowana(): przed publikacją
// celu zdanie z linkiem po prostu się nie renderuje (reguła 6.0: bez linku do 404).
const HREF_P1 = hrefJesliOpublikowana('/porownania/pozycjonowanie-za-efekt-czy-abonament');
const HREF_A6 = hrefJesliOpublikowana('/pozycjonowanie-w-ai/cennik');

export default function PricingClient() {
  const lang = useLocale();

  const faqData = [
    {
      question: 'Ile kosztuje pozycjonowanie?',
      questionEn: 'How much does SEO cost?',
      answer: 'U nas pozycjonowanie kosztuje od 1 900 zł netto miesięcznie. Cena pozycjonowania zależy od wielkości serwisu, konkurencyjności branży oraz aktualnego stanu technicznego strony. W AI SEO COMPANY nasze pakiety zaczynają się od transparentnych kwot, oferując pełną optymalizację SEO, dedykowaną strategię content marketingu oraz jakościowy link building, bez ukrytych kosztów. Przeczytaj więcej w naszym szczegółowym poradniku: <a href="/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026" style="text-decoration:underline">Ile kosztuje SEO w Polsce? Cennik i pakiety 2026</a>.',
      answerEn: 'The cost of SEO depends on the size of the website, industry competitiveness, and the current technical state of the site. At AI SEO COMPANY, our packages start at transparent rates, offering full SEO optimization, a dedicated content marketing strategy, and quality link building with no hidden costs. Read more in our detailed guide: <a href="/en/blog/how-much-does-seo-cost-pricing-packages-2026" style="text-decoration:underline">How Much Does SEO Cost? Pricing &amp; Packages 2026</a>.'
    },
    {
      question: 'Ile kosztuje pozycjonowanie strony w 2026?',
      questionEn: 'How much does SEO for a website cost in 2026?',
      answer: 'W 2026 roku pozycjonowanie strony w AI SEO COMPANY kosztuje od 1 900 zł netto miesięcznie w pakiecie SEO Standard, a rozszerzony pakiet SEO Premium z optymalizacją konwersji to 2 500 zł netto miesięcznie. W tej samej kwocie 2 500 zł netto/mies. dostępny jest też Booster Pack, który przy umowie na minimum 3 miesiące obejmuje dodatkowo wykonanie nowej strony WWW. Wszystkie ceny są kwotami netto (+23% VAT), bez ukrytych opłat.',
      answerEn: 'In 2026, SEO at AI SEO COMPANY starts at €450 net per month with the SEO Standard package, while the extended SEO Premium package with conversion optimisation costs €590 net per month. For the same €590 net per month, the Booster Pack additionally includes building a brand-new website with a minimum 3-month contract. All prices are net (+23% VAT), with no hidden fees.'
    },
    {
      question: 'Czy muszę podpisywać umowę na dłuższy okres?',
      questionEn: 'Do I have to sign a long-term contract?',
      answer: 'Nie w pakietach SEO Standard i SEO Premium: pracujemy w modelu elastycznej subskrypcji miesięcznej z możliwością rezygnacji w każdej chwili. Wyjątkiem jest Booster Pack z nową stroną WWW — tam umowa trwa minimum 3 miesiące. Umowy wieloletnie z karami za wcześniejsze zakończenie uznajemy za sposób na zatrzymanie klienta, którego nie da się zatrzymać wynikami.',
      answerEn: 'Not for SEO Standard and SEO Premium: we work on a flexible monthly subscription that you can cancel at any time. The exception is the Booster Pack with a new website, which has a minimum 3-month contract. Multi-year contracts with early-termination penalties are, in our view, a way of holding on to a client that results alone cannot hold.'
    },
    {
      question: 'Czy audyt SEO jest wliczony w cenę pakietu?',
      questionEn: 'Is the SEO audit included in the package price?',
      answer: 'Tak. Każdy pakiet zawiera profesjonalny audyt techniczny, tworzenie unikalnych treści, strategię link buildingu B2B oraz optymalizację techniczną. Audyt nie jest osobno płatnym dodatkiem — bez niego nie wiedzielibyśmy, od czego zacząć.',
      answerEn: 'Yes. Every package includes a professional technical audit, original content production, a B2B link building strategy and technical optimisation. The audit is not a paid add-on — without it we would not know where to start.'
    },
    {
      question: 'Czy SEO lokalne i wizytówka Google są dodatkowo płatne?',
      questionEn: 'Are local SEO and the Google Business Profile charged separately?',
      answer: 'Nie. SEO lokalne oraz optymalizacja Profilu Firmy w Google są w cenie każdego pakietu. Dla firm usługowych działających w konkretnym mieście to zwykle najszybsze źródło pierwszych zapytań, więc traktujemy je jako element bazowy, a nie opcję. Zakres prac lokalnych opisujemy na stronie <a href="/seo-lokalne-warszawa" style="text-decoration:underline">SEO lokalne w Warszawie</a>.',
      answerEn: 'No. Local SEO and Google Business Profile optimisation are included in every package. For service businesses operating in a specific city this is usually the fastest source of first enquiries, so we treat it as a baseline element rather than an option.'
    },
    {
      question: 'Jak często dostaję raport z postępów?',
      questionEn: 'How often do I receive a progress report?',
      answer: 'Dane widzisz codziennie w panelu klienta: kliknięcia i wyświetlenia z Google Search Console, pozycje fraz tydzień po tygodniu, zapytania z formularza, telefonu i e-maila oraz dziennik naszych prac. Raz w miesiącu dostajesz raport pozycji i ruchu z wnioskami. Dostęp do Google Search Console i Analytics pozostaje po Twojej stronie. <a href="https://panel.ai-seo-company.pl/demo?utm_source=strona&utm_medium=referral&utm_campaign=panel_demo" style="text-decoration:underline">Zobacz demo panelu bez logowania</a>.',
      answerEn: 'You see the data every day in the client portal: clicks and impressions from Google Search Console, keyword positions week by week, form, phone and email enquiries, and a log of our work. Once a month you also get a rankings and traffic report with conclusions. Access to Google Search Console and Analytics stays on your side. <a href="https://panel.ai-seo-company.pl/demo?utm_source=strona&utm_medium=referral&utm_campaign=panel_demo" style="text-decoration:underline">Open the portal demo, no login</a>.'
    },
    {
      question: 'Od czego zależy, ile zapłacę za pozycjonowanie?',
      questionEn: 'What determines how much I pay for SEO?',
      answer: 'O cenie decydują trzy rzeczy: konkurencyjność fraz, na które chcesz się pozycjonować, stan techniczny strony na starcie oraz zakres potrzebnych treści. Domena bez historii w konkurencyjnej branży wymaga więcej pracy niż serwis z ugruntowanym profilem linków. Dlatego wycena zaczyna się od rozmowy o celach, a nie od cennika.',
      answerEn: 'Three things drive the price: how competitive your target phrases are, the technical condition of the site at the start, and how much content is needed. A domain with no history in a competitive niche takes more work than a site with an established link profile. That is why a quote starts with a conversation about goals, not with a price list.'
    },
    {
      // Nowe (C2, OP-01): 45 słów; „pozycjonowanie za efekt” 170/mies. (frazy.csv, 4.11.2026).
      // Link do P1 tylko po jej publikacji (hrefJesliOpublikowana).
      id: 'czy-pozycjonowanie-za-efekt-jest-tansze',
      tylkoPl: true,
      question: 'Czy pozycjonowanie za efekt jest tańsze?',
      answer: 'Nie zawsze. W rozliczeniu za efekt płacisz za frazy, które wejdą do ustalonego przedziału pozycji, więc im lepsze wyniki, tym wyższy rachunek. My pracujemy w miesięcznym abonamencie z jednym celem: TOP 3 dla uzgodnionych fraz lokalnych, na zasadach opisanych w sekcji o <a href="#cel-top-3" style="text-decoration:underline">celu TOP 3</a>.'
        + (HREF_P1 ? ` Oba modele zestawia nasze <a href="${HREF_P1}" style="text-decoration:underline">porównanie: pozycjonowanie za efekt czy abonament</a>.` : ''),
    },
    {
      question: 'Czym różnią się pakiety SEO Standard i SEO Premium?',
      questionEn: 'What is the difference between the SEO Standard and SEO Premium packages?',
      answer: 'Oba pakiety obejmują ten sam fundament: audyt techniczny, treści, link building i SEO lokalne. Różnica leży w skali: Standard obejmuje do 20 fraz, 2 treści i 2 linki miesięcznie, Premium do 50 fraz, 4 treści i 4 linki miesięcznie. Premium ma sens przy szerszym asortymencie usług lub bardziej konkurencyjnej branży; przy jednej usłudze w niszy lokalnej Standard zwykle wystarcza.',
      answerEn: 'Both packages share the same foundation: technical audit, content, link building and local SEO. The difference is scale: Standard covers up to 20 keywords, 2 content pieces and 2 links a month, Premium up to 50 keywords, 4 content pieces and 4 links a month. Premium makes sense for a broader service range or a more competitive niche; for a single service in a local niche, Standard is usually enough.'
    },
    {
      question: 'Ile kosztuje samodzielny audyt SEO albo nowa strona internetowa?',
      questionEn: 'How much is a standalone SEO audit or a new website?',
      answer: '<a href="/audyt-seo" style="text-decoration:underline">Audyt SEO jako samodzielna usługa</a> kosztuje od 1 490 zł netto, a strona internetowa w Next.js od 5 900 zł netto. W pakietach pozycjonowania audyt jest w cenie, a w Booster Pack nowa strona jest w abonamencie od 2 500 zł netto miesięcznie (umowa min. 3 miesiące). Dokładną wycenę większych serwisów dostajesz w 24 h w dni robocze.',
      answerEn: 'A standalone SEO audit starts at €350 net, and a Next.js website at €1,400 net. In the SEO packages the audit is included, and in the Booster Pack the new website is part of the monthly fee from €590 net (minimum 3-month contract). You get an exact quote for larger sites within 24 h on business days.'
    },
    {
      question: 'Ile kosztuje pozycjonowanie w AI (ChatGPT, Google)?',
      questionEn: 'How much does AI search optimization (ChatGPT, Google) cost?',
      answer: 'Audyt widoczności w AI kosztuje 990 zł netto i jest zaliczany na pierwszy miesiąc abonamentu. Pomiar co tydzień i działania pod AI są w cenie SEO Premium, a do SEO Standard można je dodać za 490 zł netto miesięcznie. Wynik widzisz w zakładce Widoczność w AI w panelu klienta. <a href="/pozycjonowanie-w-ai#ile-kosztuje" style="text-decoration:underline">Szczegóły pozycjonowania w AI</a>.'
        // CB-04: kotwica #ile-kosztuje na hubie (sectionId('ileKosztuje', 'pl')); AV-12: link do A6 dopiero po jej publikacji.
        + (HREF_A6 ? ` <a href="${HREF_A6}" style="text-decoration:underline">Ceny pozycjonowania w AI u innych agencji</a>.` : ''),
      answerEn: 'The AI visibility audit costs €235 net and is credited to your first monthly fee. Weekly measurement and AI-focused work are included in SEO Premium and can be added to SEO Standard for €115 net a month. You see the results in the AI visibility tab of the client portal. <a href="/en/ai-search-optimization" style="text-decoration:underline">More about AI search optimization</a>.'
    },
    {
      question: 'Kiedy zobaczę pierwsze efekty pozycjonowania?',
      questionEn: 'When will I see the first SEO results?',
      answer: 'Pierwsze ruchy widoczności pojawiają się zwykle po 4–8 tygodniach, gdy Google przecrawluje wprowadzone poprawki techniczne i nowe treści. Naszym celem jest TOP 3 dla uzgodnionych fraz lokalnych w 2–3 miesiące: postęp widzisz co tydzień w panelu klienta, a jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł (<a href="#cel-top-3" style="text-decoration:underline">zasady celu TOP 3</a>). Nie gwarantujemy pozycji nr 1, bo o kolejności decyduje Google. Pamiętaj: każdy, kto obiecuje Top 3 w miesiąc, sprzedaje Ci ryzyko, a nie usługę.',
      answerEn: 'The first visibility movements usually appear after 4–8 weeks, once Google has re-crawled the technical fixes and new content. Our goal is a Google TOP 3 for agreed local keywords within 2–3 months: you track progress weekly in the client portal, and if we miss the goal after 3 months, the next month is on us (<a href="#cel-top-3" style="text-decoration:underline">TOP 3 goal rules</a>). We do not guarantee the #1 position, because Google decides the order. Remember: anyone promising a Top 3 in a month is selling you risk, not a service.'
    },
    {
      // Nowe (C2, MSA-18): „czy pozycjonowanie się opłaca” 70/mies. (DataForSEO, 4.11.2026), 56 słów.
      // Liczby z /blog/wyniki-wdrozen-seo-2026 (GSC, okno 3 miesiące, stan na sierpień 2026).
      id: 'czy-pozycjonowanie-sie-oplaca',
      tylkoPl: true,
      question: 'Czy pozycjonowanie się opłaca?',
      answer: 'Opłaca się, gdy klienci szukają Twojej usługi w Google, a strona zamienia wizyty w zapytania. W naszych <a href="/blog/wyniki-wdrozen-seo-2026" style="text-decoration:underline">wdrożeniach z 2026 roku</a> lokalna restauracja zebrała 187 kliknięć, a producent B2B 152 kliknięcia w trzy miesiące (Google Search Console, stan na sierpień 2026). Kliknięcia to jeszcze nie przychód, dlatego opłacalność liczymy zapytaniami widocznymi w panelu klienta.',
    },
    {
      question: 'Potrzebuję też nowej strony — czy da się to połączyć z pozycjonowaniem?',
      questionEn: 'I also need a new website — can that be combined with SEO?',
      answer: 'Tak. Poza subskrypcją miesięczną oferujemy pakiet łączący pozycjonowanie z wykonaniem strony internetowej. Ma to przewagę porządkową: strona powstaje od razu z architekturą informacji i strukturą adresów przygotowaną pod wyszukiwarkę, więc nie trzeba później migrować URL-i ani przebudowywać nawigacji. Szczegóły w sekcji <a href="/projektowanie-stron-internetowych" style="text-decoration:underline">projektowanie stron internetowych</a>.',
      answerEn: 'Yes. Alongside the monthly subscription we offer a package combining SEO with building the website itself. That has a practical advantage: the site is built from the start with an information architecture and URL structure prepared for search, so there is no need to migrate URLs or rebuild navigation later. See <a href="/en/web-design" style="text-decoration:underline">web design</a> for details.'
    }
  ];
  // FAQPage = pytania widoczne na stronie: PL 14, EN 12 (bez pytań tylkoPl).
  const faqWidoczne = lang === 'pl' ? faqData : faqData.filter((f) => !f.tylkoPl);

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Cennik Pozycjonowania" en="SEO Pricing" />
      
      {/* Hero Banner */}
      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px', position: 'relative' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '850px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'Cennik SEO. Jawny. Bez ściemy.' : 'TRANSPARENT PRICING'}
            </div>
            
            <h1 style={{ 
              fontSize: 'clamp(2rem, 5vw, 4.2rem)', 
              fontWeight: 800, 
              lineHeight: 1.15, 
              color: 'var(--color-text-dark)', 
              marginBottom: '1.5rem', 
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? 'Ile Kosztuje Pozycjonowanie Stron?' : 'How Much Does SEO Cost?'} <br />
              <span style={{ color: 'var(--color-cta)' }}>{lang === 'pl' ? 'Cennik pozycjonowania stron 2026' : 'Pricing 2026'}</span>
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '750px', margin: '0 auto 2rem auto', lineHeight: 1.65 }}>
              {lang === 'pl' 
                ? 'Pozycjonowanie od 1 900 zł netto/mies. (SEO Standard) lub 2 500 zł netto/mies. (SEO Premium z CRO albo Booster Pack z nową stroną WWW). Umowa na miesiąc w SEO Standard i Premium (Booster Pack: min. 3 miesiące), bez ukrytych opłat — poniżej pełny cennik pozycjonowania stron 2026.' 
                : 'Discover our SEO Pricing 2026. No hidden fees or complicated contracts. Check our packages and costs and pay for measurable search visibility growth.'}
            </p>
            {/* Przycisk i telefon w hero: 59% kliknięć z Google Ads trafia na ten landing,
                a pierwszy przycisk był wcześniej na 4. ekranie telefonu (pomiar 24.09.2026). */}
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={hash('kontakt', lang)} className="hero-btn-primary" data-cta="service_hero_cennik">
                {lang === 'pl' ? 'Zamów wycenę — odpowiedź w\u00a024\u00a0h' : 'Get a quote — reply within 24\u00a0h'}
              </a>
              <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="service_hero_cennik_tel">
                {lang === 'pl' ? 'Zadzwoń: 518 815 055' : 'Call: +48 518 815 055'}
              </a>
            </div>
            {/* OP-14: autor i data (LASTMOD) pod leadem; na /en Byline nic nie renderuje. */}
            <Byline sciezka="/cennik-pozycjonowania" style={{ margin: '2rem 0 0' }} />
          </Reveal>
        </div>
      </section>

      {/* Cennik zaraz pod hero: wcześniej karty pakietów były dopiero na 4,4
          ekranu telefonu, pod blokiem tekstu. Tekst został, tylko niżej. */}
      {/* Oferta wejsciowa tylko dla ruchu z reklam i tylko po wlaczeniu
          NEXT_PUBLIC_ENTRY_OFFER=audyt - patrz components/EntryOffer.jsx. */}
      <EntryOffer />

      <Pricing isMainContent={true} />

      {/* SEO Content Section */}
      <section style={{ padding: '40px 0 80px 0' }}>
        <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--color-text-main)' }}>
          <Reveal>
            <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: '3.5rem', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                {lang === 'pl' ? 'Co obejmuje nasz cennik pozycjonowania stron?' : 'What does our SEO pricing include?'}
              </h2>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginBottom: '1.5rem' }}>
                {lang === 'pl' 
                  ? 'Wybierając pakiety AI SEO COMPANY, inwestujesz w przewidywalny wzrost. Nasz cennik pozycjonowania stron internetowych został skonstruowany tak, aby zaspokoić potrzeby zarówno lokalnych biznesów B2C, jak i ogólnopolskich firm B2B.' 
                  : 'By choosing AI SEO COMPANY packages, you invest in predictable growth. Our website SEO pricing has been designed to meet the needs of both local B2C businesses and nationwide B2B companies.'}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginBottom: '1.5rem' }}>
                {lang === 'pl'
                  ? 'Jako nowoczesna agencja marketingowa i SEO, nie ograniczamy się tylko do dodawania linków. Każdy z naszych pakietów zawiera profesjonalny audyt techniczny, tworzenie unikalnych treści, strategię link buildingu B2B oraz optymalizację wskaźników Core Web Vitals.'
                  : 'As a modern marketing and SEO agency, we don\'t just build links. Each of our packages includes a professional technical audit, unique content creation, B2B link building strategy, and Core Web Vitals optimization.'}
              </p>
              <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)', marginTop: '2rem' }}>
                {lang === 'pl' ? 'Dlaczego transparentne pakiety?' : 'Why transparent packages?'}
              </h3>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336' }}>
                {lang === 'pl'
                  ? 'Ukryte koszty i umowy na wiele lat to domena przestarzałych firm. Wierzymy, że dobra usługa broni się sama, a jasny i prosty cennik pozycjonowania to podstawa partnerskich relacji i najwyższego zwrotu z inwestycji (ROI).'
                  : 'Hidden costs and multi-year contracts are the domain of outdated companies. We believe a good service defends itself, and clear, simple SEO pricing is the foundation of partnership and the highest ROI.'}
              </p>
              <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginTop: '1.5rem' }}>
                {lang === 'pl'
                  ? 'Zdajemy sobie sprawę, że każda branża charakteryzuje się odmienną specyfiką, unikalną grupą docelową oraz specyficznym cyklem decyzyjnym. Z tego powodu podchodzimy z ogromną elastycznością do optymalizacji strategii biznesowej naszych Klientów. Decydując się na inwestycję w profesjonalny marketing internetowy w postaci SEO, wybierasz model trwałego budowania kompetencji własnej marki. Wspólnie identyfikujemy kluczowe cele konwersji i obniżamy długofalowy koszt pozyskania leada poprzez precyzyjne dotarcie z ofertą do właściwych konsumentów w najbardziej sprzyjającym momencie ich procesu zakupowego.'
                  : 'We realize that every industry is characterized by its own specific nature, unique target audience, and specific decision-making cycle. For this reason, we approach the optimization of our Clients business strategies with great flexibility. By deciding to invest in professional internet marketing in the form of SEO, you choose a model of lasting brand competency building. Together, we identify key conversion goals and lower the long-term cost of lead acquisition by precisely reaching out with an offer to the right consumers at the most favorable moment of their purchasing process.'}
              </p>
            </div>
          </Reveal>
          {/* CTA w środku strony: między hero a #kontakt były sekcje bez żadnego przycisku. */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="service_mid_cennik_1">
              {lang === 'pl' ? 'Zapytaj o wycenę — odpowiedź w\u00a024\u00a0h' : 'Ask for a quote — reply within 24\u00a0h'}
            </a>
          </div>
        </div>
      </section>

      {/* C2 (OP-01, PLAN-v2 6.18): sekcja cenowa tylko PL, po bloku „Co obejmuje…”, przed FairDeal.
          „pozycjonowanie stron cena” 1 000/mies., „wycena pozycjonowania” 480, „tanie pozycjonowanie
          stron” 170 (DataForSEO i frazy.csv, 4.11.2026). Kwoty i liczby fraz = pakiety z Pricing.jsx
          i FAQ „Czym różnią się pakiety…”. Bez zdań z FAQ i leadu (playbook 5.5). */}
      {lang === 'pl' && (
        <section style={{ padding: '0 0 80px 0' }}>
          <div className="container" style={{ maxWidth: '850px', margin: '0 auto', color: 'var(--color-text-main)' }}>
            <Reveal>
              <div style={{ background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
                <h2 style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '1.5rem', color: 'var(--color-text-dark)' }}>
                  Pozycjonowanie stron: cena, koszt i wycena w 2026
                </h2>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginBottom: '1.5rem' }}>
                  <Link href="/pozycjonowanie-stron-internetowych" style={{ textDecoration: 'underline' }}>Pozycjonowanie stron</Link> kosztuje u nas od 1 900 zł netto miesięcznie. W SEO Standard dostajesz do 20 fraz, czyli średnio 95 zł netto za frazę, a w SEO Premium za 2 500 zł netto do 50 fraz, czyli 50 zł za frazę. Za samo wejście fraz do TOP 10 nie dopłacasz.
                </p>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)', marginTop: '2rem' }}>
                  Tanie pozycjonowanie stron: na czym oszczędzają najtańsze oferty
                </h3>
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336', marginBottom: '1.5rem' }}>
                  Najtańsze oferty zwykle oszczędzają na tym, czego nie widać w raporcie: treściach, linkach z serwisów z realnym ruchem i poprawkach technicznych. Zanim porównasz ceny, sprawdź <a href="#uczciwa-umowa" style={{ textDecoration: 'underline' }}>w umowie</a> trzy rzeczy: ile fraz i treści dostajesz co miesiąc, czy konta Google są założone na Twoją firmę i ile trwa wypowiedzenie.
                </p>
                <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)', marginTop: '2rem' }}>
                  Wycena pozycjonowania: czego potrzebujemy
                </h3>
                {/* Do potwierdzenia przez Filipa (OP-01): czy te trzy dane wystarczają do wyceny. */}
                <p style={{ fontSize: '1.1rem', lineHeight: 1.65, color: '#333336' }}>
                  Do wyceny pozycjonowania wystarczą adres strony, lista usług albo kategorii, które chcesz promować, i obszar działania: miasto, region albo cała Polska. Na tej podstawie dobieramy pakiet i liczbę fraz. Jeśli strona ma problemy techniczne, zaczynamy od <Link href="/audyt-seo" style={{ textDecoration: 'underline' }}>audytu SEO</Link>, który w każdym pakiecie jest w cenie.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      )}

      <FairDeal />

      <AppleFaq faqData={faqWidoczne} title={lang === 'pl' ? "Częste pytania o wycenę" : "Frequently Asked Questions about Pricing"} />
      
      <Contact />
      <Footer />
    </main>
  );
}
