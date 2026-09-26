'use client';

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Pricing from '@/components/Pricing';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { useTranslations, useLocale } from 'next-intl';
import { hash } from '@/lib/anchors';

export default function PricingClient() {
  const lang = useLocale();

  const faqData = [
    {
      question: 'Ile kosztuje pozycjonowanie?',
      questionEn: 'How much does SEO cost?',
      answer: 'Cena pozycjonowania zależy od wielkości serwisu, konkurencyjności branży oraz aktualnego stanu technicznego strony. W AI SEO COMPANY nasze pakiety zaczynają się od transparentnych kwot, oferując pełną optymalizację SEO, dedykowaną strategię content marketingu oraz jakościowy link building, bez ukrytych kosztów. Przeczytaj więcej w naszym szczegółowym poradniku: <a href="/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026" style="text-decoration:underline">Ile kosztuje SEO w Polsce? Cennik i pakiety 2026</a>.',
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
      answer: 'Nie. SEO lokalne oraz optymalizacja Profilu Firmy w Google są w cenie każdego pakietu. Dla firm usługowych działających w konkretnym mieście to zwykle najszybsze źródło pierwszych zapytań, więc traktujemy je jako element bazowy, a nie opcję.',
      answerEn: 'No. Local SEO and Google Business Profile optimisation are included in every package. For service businesses operating in a specific city this is usually the fastest source of first enquiries, so we treat it as a baseline element rather than an option.'
    },
    {
      question: 'Jak często dostaję raport z postępów?',
      questionEn: 'How often do I receive a progress report?',
      answer: 'Co miesiąc otrzymujesz raport pozycji i ruchu. Raport pokazuje zmiany widoczności na monitorowanych frazach oraz ruch organiczny, żebyś mógł ocenić efekt niezależnie od naszych deklaracji. Dostęp do Google Search Console i Analytics pozostaje po Twojej stronie.',
      answerEn: 'You receive a rankings and traffic report every month. It shows visibility changes on the tracked phrases and organic traffic, so you can judge the effect independently of what we claim. Access to Google Search Console and Analytics stays on your side.'
    },
    {
      question: 'Od czego zależy, ile zapłacę za pozycjonowanie?',
      questionEn: 'What determines how much I pay for SEO?',
      answer: 'O cenie decydują trzy rzeczy: konkurencyjność fraz, na które chcesz się pozycjonować, stan techniczny strony na starcie oraz zakres potrzebnych treści. Domena bez historii w konkurencyjnej branży wymaga więcej pracy niż serwis z ugruntowanym profilem linków. Dlatego wycena zaczyna się od rozmowy o celach, a nie od cennika.',
      answerEn: 'Three things drive the price: how competitive your target phrases are, the technical condition of the site at the start, and how much content is needed. A domain with no history in a competitive niche takes more work than a site with an established link profile. That is why a quote starts with a conversation about goals, not with a price list.'
    },
    {
      question: 'Czym różnią się pakiety SEO Standard i SEO Premium?',
      questionEn: 'What is the difference between the SEO Standard and SEO Premium packages?',
      answer: 'Oba pakiety obejmują ten sam fundament: audyt techniczny, treści, link building i SEO lokalne. Różnica leży w skali — liczbie monitorowanych fraz, ilości publikowanych treści i intensywności pozyskiwania odnośników. Premium ma sens przy szerszym asortymencie usług lub bardziej konkurencyjnej branży; przy jednej usłudze w niszy lokalnej Standard zwykle wystarcza.',
      answerEn: 'Both packages share the same foundation: technical audit, content, link building and local SEO. The difference is scale — the number of tracked phrases, the volume of published content and the intensity of link acquisition. Premium makes sense for a broader service range or a more competitive niche; for a single service in a local niche, Standard is usually enough.'
    },
    {
      question: 'Kiedy zobaczę pierwsze efekty pozycjonowania?',
      questionEn: 'When will I see the first SEO results?',
      answer: 'Pierwsze ruchy widoczności pojawiają się zwykle po 4–8 tygodniach, gdy Google przecrawluje wprowadzone poprawki techniczne i nowe treści. W standardowym podejściu agencji SEO stabilne pozycje na frazach komercyjnych to zakres 3–6 miesięcy, ale my jesteśmy w stanie osiągnąć ten efekt już w 2–3 miesiące (przy nowej domenie bez profilu linków czas ten może być nieco dłuższy). Pamiętaj jednak: każdy, kto obiecuje Top 3 w miesiąc, sprzedaje Ci ryzyko, a nie usługę.',
      answerEn: 'The first visibility movements usually appear after 4–8 weeks, once Google has re-crawled the technical fixes and new content. In the standard agency approach, stable positions on commercial phrases are a 3–6 month horizon, but we are able to reach that result in 2–3 months (for a new domain with no link profile it may take a little longer). Remember, though: anyone promising a Top 3 in a month is selling you risk, not a service.'
    },
    {
      question: 'Potrzebuję też nowej strony — czy da się to połączyć z pozycjonowaniem?',
      questionEn: 'I also need a new website — can that be combined with SEO?',
      answer: 'Tak. Poza subskrypcją miesięczną oferujemy pakiet łączący pozycjonowanie z wykonaniem strony internetowej. Ma to przewagę porządkową: strona powstaje od razu z architekturą informacji i strukturą adresów przygotowaną pod wyszukiwarkę, więc nie trzeba później migrować URL-i ani przebudowywać nawigacji. Szczegóły w sekcji <a href="/projektowanie-stron-internetowych" style="text-decoration:underline">projektowanie stron internetowych</a>.',
      answerEn: 'Yes. Alongside the monthly subscription we offer a package combining SEO with building the website itself. That has a practical advantage: the site is built from the start with an information architecture and URL structure prepared for search, so there is no need to migrate URLs or rebuild navigation later. See <a href="/en/web-design" style="text-decoration:underline">web design</a> for details.'
    }
  ];

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
                {lang === 'pl' ? 'Zamów wycenę — odpowiedź w 24 h' : 'Get a quote — reply within 24 h'}
              </a>
              <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="service_hero_cennik_tel">
                {lang === 'pl' ? 'Zadzwoń: 518 815 055' : 'Call: +48 518 815 055'}
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Cennik zaraz pod hero: wcześniej karty pakietów były dopiero na 4,4
          ekranu telefonu, pod blokiem tekstu. Tekst został, tylko niżej. */}
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
              {lang === 'pl' ? 'Zapytaj o wycenę — odpowiedź w 24 h' : 'Ask for a quote — reply within 24 h'}
            </a>
          </div>
        </div>
      </section>

      <AppleFaq faqData={faqData} title={lang === 'pl' ? "Częste pytania o wycenę" : "Frequently Asked Questions about Pricing"} />
      
      <Contact />
      <Footer />
    </main>
  );
}
