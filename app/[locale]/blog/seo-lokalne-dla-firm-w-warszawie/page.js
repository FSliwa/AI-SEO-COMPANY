export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: 'Jak Pozycjonować Firmę Lokalnie w Google? Poradnik 2026',
  description: 'Kompletny poradnik: jak krok po kroku zoptymalizować wizytówkę Google Moja Firma, zdobyć opinie i poprawić lokalne pozycje w wyszukiwarce.',
  alternates: {
    canonical: `/${locale}/blog/seo-lokalne-dla-firm-w-warszawie`,
  },
};
}
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';

import ArticleTOC from '@/components/ArticleTOC';

export default function ArticleLokalnePage() {
  const tocItems = [
    { id: 'czym-w-a-ciwie-jest-pozycjonowanie-lokalne-local-seo', title: 'Czym właściwie jest pozycjonowanie lokalne (Local SEO)?' },
    { id: 'optymalizacja-profilu-firmy-w-google-gbp', title: 'Optymalizacja Profilu Firmy w Google (GBP)' },
    { id: 'strategia-nap-name-address-phone', title: 'Strategia NAP (Name, Address, Phone)' },
    { id: 'znaczenie-prawdziwych-recenzji-od-klient-w', title: 'Znaczenie prawdziwych recenzji od klientów' },
    { id: 'optymalizacja-on-page-pod-k-tem-miasta', title: 'Optymalizacja On-Page pod kątem miasta' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Lokalne SEO Warszawa
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                Jul 20, 2026
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
              SEO Lokalne w Warszawie.
            </h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              <p style={{ fontSize: '1.4rem', color: '#1D1D1F', lineHeight: 1.5, marginBottom: '2.5rem', fontWeight: 500, letterSpacing: '-0.01em' }}>
                Rynek usług w Warszawie charakteryzuje się ogromną konkurencją. Aby docierać do klientów lokalnych, samo posiadanie strony to za mało. Poniżej przedstawiamy kompletny Poradnik 2026: Jak Pozycjonować Firmę Lokalnie w Google?
              </p>
              <ArticleTOC items={tocItems} />
              <h2 id="czym-w-a-ciwie-jest-pozycjonowanie-lokalne-local-seo">Czym właściwie jest pozycjonowanie lokalne (Local SEO)?</h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                SEO lokalne to zbiór działań mających na celu zwiększenie widoczności firmy w wynikach wyszukiwania powiązanych z konkretną lokalizacją geograficzną (np. „dobry hydraulik warszawa wola”, „agencja reklamowa mokotów”). Kiedy użytkownik wyszukuje usługę na smartfonie, algorytm Google bierze pod uwagę jego fizyczną lokalizację i stara się dopasować do niej jak najbliższe, zaufane biznesy w tzw. Mapach Google (Local Pack).
              </p>

              <h2 id="optymalizacja-profilu-firmy-w-google-gbp">Optymalizacja Profilu Firmy w Google (GBP)</h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Profil Firmy w Google (dawniej Google Moja Firma) to darmowe narzędzie i absolutny fundament lokalnego SEO. Jeśli Twoja firma nie ma założonej i zweryfikowanej wizytówki, tracisz nawet 70% potencjalnego ruchu z urządzeń mobilnych.
              </p>
              
              <ul>
                <li>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Wybierz odpowiednią kategorię główną.</span>
                </li>
                <li>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Dodaj fizyczny adres i precyzyjne godziny otwarcia.</span>
                </li>
                <li>
                  <div style={{ marginTop: '0.25rem', width: '20px', height: '20px', background: '#1D1D1F', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <span style={{ fontSize: '1.15rem', color: '#1D1D1F', fontWeight: 500 }}>Publikuj posty, oferty i zdjęcia bezpośrednio w wizytówce.</span>
                </li>
              </ul>

              <h2 id="strategia-nap-name-address-phone">Strategia NAP (Name, Address, Phone)</h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Sygnały NAP to jeden z głównych czynników rankingowych dla algorytmu lokalnego. Oznacza to, że nazwa firmy, jej adres i numer telefonu muszą być identyczne w każdym miejscu w Internecie. Zmiana nazwy ulicy lub nowy numer telefonu w jednym z zewnętrznych katalogów (np. Panorama Firm, Zumi, Yelp) podczas gdy wizytówka Google posiada inny format, wywołuje zamieszanie w robocie indeksującym i drastycznie obniża autorytet witryny.
              </p>

              <h2 id="znaczenie-prawdziwych-recenzji-od-klient-w">Znaczenie prawdziwych recenzji od klientów</h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                W Warszawie konkurencja z 500 pozytywnymi opiniami zawsze zdominuje firmę, która ma ich tylko 10. Kluczem do lokalnego SEO jest wdrożenie w firmie procesu ciągłego pozyskiwania opinii. Pamiętaj jednak o dwóch zasadach:
              </p>
              <ul>
                <li>Google premiuje opinie zawierające odpowiednie frazy (np. "Polecam tę agencję SEO z Warszawy").</li>
                <li>Jako właściciel firmy musisz zawsze odpowiadać na opinie, włączając w odpowiedź delikatne nawiązanie do lokalizacji.</li>
              </ul>

              <h2 id="optymalizacja-on-page-pod-k-tem-miasta">Optymalizacja On-Page pod kątem miasta</h2>
              <p style={{ marginBottom: '1.5rem', color: '#515154' }}>
                Nie zapominaj o samej stronie internetowej! Zadbaj o to, aby słowo „Warszawa” oraz nazwa odpowiedniej dzielnicy pojawiały się w:
              </p>
              <ul>
                <li>Zoptymalizowanych tytułach meta (Meta Title) i opisach (Meta Description).</li>
                <li>W nagłówkach H1 na stronie ofertowej.</li>
                <li>W schemacie danych ustrukturyzowanych LocalBusiness (JSON-LD), tak jak robimy to standardowo we wszystkich naszych realizacjach w AI SEO COMPANY.</li>
              </ul>

              <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '4rem', paddingTop: '4rem' }}>
                <div style={{ background: '#F5F5F7', borderRadius: '24px', padding: '3rem', textAlign: 'center' }}>
                  <h3>
                    Zdominuj lokalny rynek
                  </h3>
                  <p style={{ margin: 0, color: '#86868B', fontSize: '1.1rem', marginBottom: '2rem' }}>
                    Chcesz wyprzedzić konkurencję w swojej okolicy? Zostaw nam wiadomość poniżej, a przygotujemy dedykowaną strategię.
                  </p>
                  <a href="#kontakt" style={{ display: 'inline-block', background: '#1D1D1F', color: '#FFFFFF', padding: '1rem 2rem', borderRadius: '999px', fontSize: '1.05rem', fontWeight: 600, textDecoration: 'none' }}>
                    Skonsultuj Projekt
                  </a>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </article>

      <div id="kontakt">
        <Contact />
      </div>
      <Footer />
    </main>
  );
}
