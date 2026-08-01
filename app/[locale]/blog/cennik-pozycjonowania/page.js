import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import ArticleTOC from '@/components/ArticleTOC';
import Pricing from '@/components/Pricing';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: locale === 'en' ? 'SEO Pricing 2026 | Costs for Professional Services' : 'Cennik Pozycjonowania 2026 | Ile Kosztuje Pozycjonowanie Stron',
  description: locale === 'en' ? 'How much does SEO cost in 2026? See our transparent pricing. Compare us with other search engine optimization companies and discover our affordable SEO services.' : 'Sprawdź nasz cennik pozycjonowania i dowiedz się, ile kosztuje pozycjonowanie w 2026 roku. Pakiety dostosowane do wielkości Twojej firmy i brak ukrytych opłat.',
  alternates: {
    canonical: locale === 'en' ? `/en/blog/seo-pricing` : `/pl/blog/cennik-pozycjonowania`,
    languages: {
      'pl': `/pl/blog/cennik-pozycjonowania`,
      'en': `/en/blog/seo-pricing`
    }
  },
};
}

export default async function CennikArticlePage({ params }) {
  const { locale } = await params;
  
  const tocItems = [
    { id: 'ile-kosztuje-pozycjonowanie-stron', title: 'Ile kosztuje pozycjonowanie stron w 2026 roku?' },
    { id: 'od-czego-zalezy-cennik-pozycjonowania', title: 'Od czego zależy cennik pozycjonowania?' },
    { id: 'nasze-pakiety-cenowe', title: 'Nasze Pakiety Cenowe (Wybierz opcję dla siebie)' },
    { id: 'modele-rozliczen', title: 'Modele rozliczeń z agencją SEO' },
    { id: 'ukryte-koszty', title: 'Ukryte koszty, na które musisz uważać' },
    { id: 'podsumowanie', title: 'Podsumowanie' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
      {locale === 'en' ? (

        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                SEO Pricing
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                Aug 1, 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              SEO Pricing 2026 | Costs for Professional Services
            </h1>
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                Wondering how much SEO costs in 2026? In this comprehensive guide, we explain our pricing structure and show exactly what you pay for when hiring an expert agency.
              </p>
              
              <h2 id="ile-kosztuje-pozycjonowanie-stron">How much does SEO cost?</h2>
              <p>The cost of SEO depends on the scale of your business and competition. Check out our pricing below.</p>

              <h2 id="nasze-pakiety-cenowe">Our Pricing Packages</h2>
              
              <div style={{ margin: '3rem -1rem' }}>
                <Pricing />
              </div>

              <h2 id="podsumowanie">Summary</h2>
              <p>Investing in SEO is a long-term commitment that brings compounded returns. Transparent pricing is key to a healthy business relationship.</p>
            </div>
          </Reveal>
        </div>
    
      ) : (
        <>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Budżet i Strategia
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                1 Sierpnia 2026
              </span>
            </div>

            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 4rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '2rem', 
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
              textAlign: 'left'
            }}>
              Cennik Pozycjonowania 2026 | Ile Kosztuje Pozycjonowanie Stron?
            </h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p className="lead">
                To jedno z najczęściej zadawanych pytań przez przedsiębiorców poszukujących agencji marketingowej: "ile kosztuje pozycjonowanie?". Odpowiedź na to pytanie nie jest jednoznaczna, ponieważ cennik pozycjonowania zależy od setek zmiennych. W tym artykule rozkładamy koszty SEO na czynniki pierwsze.
              </p>

              <ArticleTOC items={tocItems} />
              
              <h2 id="ile-kosztuje-pozycjonowanie-stron">Ile kosztuje pozycjonowanie stron w 2026 roku?</h2>
              <p>
                Wielu właścicieli firm próbuje znaleźć jednoznaczną odpowiedź na pytanie, ile kosztuje pozycjonowanie stron. Prawda jest jednak taka, że profesjonalny cennik pozycjonowania zawsze ma charakter "od - do". Dlaczego? Ponieważ każda strona internetowa zaczyna z innego poziomu, ma inną historię i walczy na rynku o zupełnie innej konkurencyjności. 
              </p>
              <p>
                Zwykle koszt pozycjonowania w Polsce zaczyna się od około 1000 - 1500 zł netto miesięcznie w przypadku małych firm o bardzo lokalnym zasięgu. W przypadku ogólnopolskich sklepów internetowych e-commerce, gdzie walka toczy się o setki tysięcy słów kluczowych, budżet potrafi swobodnie przekroczyć 10 000 zł netto miesięcznie.
              </p>
              
              <h2 id="od-czego-zalezy-cennik-pozycjonowania">Od czego zależy cennik pozycjonowania?</h2>
              <p>Wyceniając koszt kampanii SEO, agencja bierze pod uwagę między innymi:</p>
              <ul>
                <li><strong>Branżę i Konkurencję:</strong> Pozycjonowanie w branży finansowej czy medycznej pochłonie nieporównywalnie większy budżet na same publikacje zewnętrzne i zapleczowe (Link Building).</li>
                <li><strong>Stan Techniczny Strony:</strong> Zepsuta witryna, która ładuje się przez 10 sekund i ma mnóstwo błędów 404, wymaga dziesiątek godzin pracy webdevelopera i specjalisty Technical SEO.</li>
                <li><strong>Wielkość serwisu:</strong> Sklep posiadający 10 000 produktów generuje znacznie więcej pracy analitycznej i redakcyjnej niż prosta witryna wizytówkowa (5 podstron).</li>
                <li><strong>Oczekiwania czasowe:</strong> Pozycjonowanie z definicji jest powolnym procesem, jednak agresywniejsza kampania z większym budżetem potrafi skrócić czas oczekiwania na zwrot z inwestycji.</li>
              </ul>

              <h2 id="nasze-pakiety-cenowe">Nasze Pakiety Cenowe (Wybierz opcję dla siebie)</h2>
              <p>
                Wierzymy w pełną transparentność. Brak ukrytych kosztów i jasne zasady gry to podstawa naszej współpracy. Zobacz nasz cennik pozycjonowania i wybierz pakiet idealny dla skali Twojej firmy. Oczywiście każdy z pakietów możemy elastycznie modyfikować podczas darmowej konsultacji.
              </p>

              {/* Wstrzykiwanie cennika bezpośrednio w środek artykułu */}
              <div style={{ margin: '3rem -1rem' }}>
                <Pricing />
              </div>

              <h2 id="modele-rozliczen">Modele rozliczeń z agencją SEO</h2>
              <p>
                W dzisiejszych realiach rynkowych (2026), 95% profesjonalnych agencji rozlicza się w modelu abonamentowym (Flat Fee). Oznacza to, że płacisz stałą, comiesięczną kwotę, w ramach której agencja realizuje określoną liczbę godzin pracy, dostarcza pule artykułów eksperckich oraz pozyskuje konkretną liczbę mocnych linków z zewnątrz.
              </p>
              <p>
                Przestrzegamy przed przestarzałym modelem "za efekt" (płatność tylko po wbiciu na pozycję numer 1). Zazwyczaj kończy się on stosowaniem niebezpiecznych technik "Black Hat SEO", które mogą skutkować trwałym zbanowaniem Twojej domeny przez filtry Google, niszcząc cały wypracowany wcześniej ruch.
              </p>

              <h2 id="ukryte-koszty">Ukryte koszty, na które musisz uważać</h2>
              <p>
                Analizując rynkowe oferty, musisz uważać na tanie cenniki SEO, w których agencja oferuje kompleksową obsługę za 500 zł miesięcznie. Bardzo często w takiej umowie znajduje się "haczyk" polegający na tym, że:
              </p>
              <ul>
                <li>Za każdego pozyskanego linka zapłacisz osobno.</li>
                <li>Agencja nie tworzy żadnych treści, a Ty musisz dostarczyć je samodzielnie.</li>
                <li>Poprawki programistyczne niezbędne do przeprowadzenia audytu technicznego muszą zostać wykonane i opłacone po stronie Twojego dewelopera.</li>
              </ul>

              <h2 id="podsumowanie">Podsumowanie</h2>
              <p>
                Zanim zapytasz agencję ile kosztuje pozycjonowanie Twojej strony, poproś o wykonanie dogłębnego audytu wstępnego. Profesjonalna wycena SEO jest zawsze efektem analizy matematycznej i opiera się na porównaniu Twojej obecnej widoczności do widoczności liderów z Twojej niszy. Z naszym transparentnym podejściem inwestycja w marketing z Google z pewnością przełoży się na solidny wzrost ROI w Twojej firmie.
              </p>
            </div>
          </Reveal>
        </div>
        </>
      )}
      </article>
      
      <Contact />
      <Footer />
    </main>
  );
}
