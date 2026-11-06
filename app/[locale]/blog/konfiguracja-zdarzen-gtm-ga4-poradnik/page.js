import { articleLanguages, articleRobots } from '@/lib/blogPosts';
export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  // 5.11.2026 (PLAN-v2 6.25 R1, decyzje-blog nr 14; CS-15, MSA-17): title PL (59 zn.) zaczyna sie od
  // „Konfiguracja GA4” (GSC: „konfiguracja ga4” 27 wyśw., poz. 21,0), meta PL (135 zn.) z decyzje-blog nr 14.
  // Wersja EN to strona-cien (noindex, canonical na PL) - bez zmian.
  title: locale === 'en' ? 'Google Tag Manager: GA4 Event Configuration Guide' : 'Konfiguracja GA4 i GTM: zdarzenia i konwersje krok po kroku',
  description: locale === 'en' ? 'How to configure events in Google Tag Manager for GA4? A complete guide on dataLayer, triggers, and testing.' : 'Jak skonfigurować zdarzenia GA4 w Google Tag Manager i oznaczyć lead jako zdarzenie kluczowe. Przykład z naszego wdrożenia z 4.11.2026.',
  alternates: {
    // Wpis plOnly: angielski slug /en/blog/google-tag-manager-ga4-events-guide
    // nigdy nie powstal, wiec canonical wskazywal adres zwracajacy 404. Oba
    // locale prowadza teraz na wersje polska, a rendering /en jest noindex
    // przez articleRobots ponizej - tak samo jak w /blog/rodo-na-stronie-internetowej.
    canonical: 'https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik',
    languages: articleLanguages('/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', 'https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', 'https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik')
  },
  robots: articleRobots('/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', locale),
};
}

import Header from '@/components/Header';
import ArticleSchema from '@/components/ArticleSchema';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import ArticleTOC from '@/components/ArticleTOC';
import BlogCTA from '@/components/BlogCTA';
import { LASTMOD } from '@/lib/lastmod';

export default async function ArticleGTM({ params }) {
  const { locale } = await params;
  const tocItems = [
    { id: 'jak-skonfigurowac-zdarzenia-w-google-tag-manager-krok-po-kroku', title: 'Jak skonfigurować zdarzenia w Google Tag Manager krok po kroku' },
    { id: 'jak-testowac-i-debugowac-zdarzenia-w-gtm-i-ga4', title: 'Jak testować i debugować zdarzenia w GTM i GA4?' },
    { id: 'zaawansowane-zdarzenia-przez-datalayer-kiedy-i-jak-je-stosowac', title: 'Zaawansowane zdarzenia przez dataLayer: kiedy i jak je stosować?' },
    { id: 'jak-znalezc-zdarzenia-w-ga4-i-oznaczyc-je-jako-konwersje', title: 'Jak znaleźć zdarzenia w GA4 i oznaczyć je jako kluczowe zdarzenia?' },
    { id: 'generate-lead-nasze-wdrozenie', title: 'generate_lead jako zdarzenie kluczowe: nasze wdrożenie' },
    { id: 'wymiar-page-type', title: 'Wymiar niestandardowy: typ strony (page_type)' },
    { id: 'najczestsze-problemy-i-jak-je-szybko-naprawic', title: 'Najczęstsze problemy i jak je szybko naprawić' },
    { id: 'jak-zarzadzac-zdarzeniami-w-organizacji-katalog-nazewnictwo-i-dokumentacja', title: 'Jak zarządzać zdarzeniami w organizacji: katalog, nazewnictwo i dokumentacja' },
    { id: 'kiedy-warto-zlecic-wdrozenie-gtm-specjaliscie', title: 'Kiedy warto zlecić wdrożenie GTM specjaliście?' },
    { id: 'ai-seo-company-wdrozenie-gtm-i-konfiguracja-zdarzen-dla-twojej-firmy', title: 'AI SEO COMPANY: wdrożenie GTM i konfiguracja zdarzeń dla Twojej firmy' },
    { id: 'zrodla', title: 'Źródła' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      {/* 5.11.2026: dateModified = LASTMOD (tresc PL realnie zmieniona: 2 nowe H2 z wdrozenia 4.11). */}
      <ArticleSchema
        slug="/blog/konfiguracja-zdarzen-gtm-ga4-poradnik"
        locale={locale}
        dateModified={locale === 'en' ? undefined : LASTMOD['https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik']}
      />
      
      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Analytics & GTM
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                {locale === 'en' ? 'August 07, 2026' : '07 Sierpnia 2026'}
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
              {locale === 'en' ? 'Google Tag Manager: GA4 Event Configuration Guide' : 'Google Tag Manager: Konfiguracja zdarzeń GA4 poradnik'}
            </h1>

            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#86868B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
            </div>
            
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              {locale === 'en' ? (
                <p>English translation is currently unavailable for this article.</p>
              ) : (
                <>
                  <div className="table-container">
                    <table>
                      <tbody>
                        <tr>
                          <td><strong>Google Tag (baza GA4)</strong></td>
                          <td>Measurement ID przechowuj jako zmienną stałą w GTM, nie wklejaj go bezpośrednio do tagów.</td>
                        </tr>
                        <tr>
                          <td><strong>Nazewnictwo zdarzeń</strong></td>
                          <td>Stosuj <code>lower_snake_case</code> bez wyjątków; GA4 rozróżnia wielkość liter w nazwach zdarzeń.</td>
                        </tr>
                        <tr>
                          <td><strong>DataLayer dla kluczowych zdarzeń</strong></td>
                          <td>Dla <code>purchase</code> i innych krytycznych zdarzeń używaj <code>dataLayer.push</code> z danymi z backendu.</td>
                        </tr>
                        <tr>
                          <td><strong>Testowanie przed publikacją</strong></td>
                          <td>GTM Preview potwierdza odpalenie tagu; DebugView w GA4 potwierdza, że parametry dotarły poprawnie.</td>
                        </tr>
                        <tr>
                          <td><strong>AI SEO COMPANY</strong></td>
                          <td>Oferuje kompleksowe wdrożenia GTM z dokumentacją, testami i szkoleniem zespołu.</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <ArticleTOC items={tocItems} />

                  <h2 id="jak-skonfigurowac-zdarzenia-w-google-tag-manager-krok-po-kroku">Jak skonfigurować zdarzenia w Google Tag Manager krok po kroku</h2>
                  <p>Konfiguracja zdarzenia w GTM dla GA4 opiera się na typie tagu „Google Analytics: Zdarzenie GA4“ i wymaga kilku konkretnych kroków.</p>

                  <h3>Krok 1: Google Tag jako fundament</h3>
                  <p>Zanim stworzysz jakikolwiek tag zdarzenia, kontener musi zawierać Google Tag z Measurement ID. Wejdź do GTM, utwórz nowy tag, wybierz typ Google Tag (dawniej „Google Analytics: Konfiguracja GA4") i wklej swój identyfikator Measurement ID (uwaga: w obecnym interfejsie GTM to pole nosi nazwę “Tag ID” lub “Identyfikator tagu”). Jako wyzwalacz przypisz Initialization – All Pages (nie zwykłe „All Pages") — dzięki temu Google Tag załaduje się przed wszystkimi pozostałymi tagami w kontenerze. Najlepiej przechowuj Measurement ID jako zmienną stałą (Constant Variable) o nazwie np. <code>GA4 - Measurement ID</code> — wtedy zmiana ID w jednym miejscu aktualizuje wszystkie tagi.</p>

                  <h3>Krok 2: nowy tag zdarzenia</h3>
                  <p>Utwórz nowy tag, wybierz typ „Google Analytics: Zdarzenie GA4“. W polu <strong>Measurement ID</strong> wklej identyfikator (lub wskaż zmienną stałą, np. <code>&#123;&#123;GA4 - Measurement ID&#125;&#125;</code>). Wpisz nazwę zdarzenia, np. <code>form_submit</code>. Pamiętaj: GA4 rozróżnia wielkość liter, więc <code>Form_Submit</code> i <code>form_submit</code> to dwa różne zdarzenia w raportach.</p>

                  <h3>Krok 3: parametry zdarzenia</h3>
                  <p>Dodaj parametry, które wzbogacą dane. Przykłady:</p>
                  
                  <div className="table-container">
                    <table>
                      <thead>
                        <tr>
                          <th>Parametr</th>
                          <th>Przykładowa wartość</th>
                          <th>Źródło w GTM</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td><code>form_name</code></td>
                          <td>„Kontakt“</td>
                          <td>Zmienna warstwy danych</td>
                        </tr>
                        <tr>
                          <td><code>transaction_id</code></td>
                          <td>„ORD-98765“</td>
                          <td>Zmienna warstwy danych</td>
                        </tr>
                        <tr>
                          <td><code>value</code></td>
                          <td>499.00</td>
                          <td>Zmienna warstwy danych</td>
                        </tr>
                        <tr>
                          <td><code>currency</code></td>
                          <td>„PLN“</td>
                          <td>Zmienna stała</td>
                        </tr>
                        <tr>
                          <td><code>video_title</code></td>
                          <td>„Demo produktu“</td>
                          <td>Zmienna elementu DOM</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <p>Wartości możesz pobierać ze zmiennych GTM (Data Layer Variable, DOM Element, JavaScript Variable) lub wpisywać statycznie.</p>

                  <p><strong>Porada dla zachowania porządku:</strong> Jeśli wysyłasz te same parametry (np. <code>currency</code>, <code>language</code> czy status logowania) w wielu różnych zdarzeniach, skorzystaj z nowej <strong>Zmiennej ustawień zdarzenia (Event Settings Variable)</strong>. Pozwala ona zgrupować powtarzające się parametry w jedną zmienną, którą wystarczy raz podpiąć do wybranych tagów, zamiast konfigurować je w każdym tagu z osobna.</p>

                  <h3>Krok 4: wyzwalacz</h3>
                  <p>Wybierz lub utwórz wyzwalacz. Najczęstsze typy:</p>
                  <ul>
                    <li><strong>Kliknięcie linku</strong> — gdy śledzisz kliknięcia w CTA</li>
                    <li><strong>Wysłanie formularza</strong> — dla leadów i rejestracji</li>
                    <li><strong>Element widoczny</strong> — dla zdarzeń scroll depth lub widoczności sekcji</li>
                    <li><strong>Custom Event</strong> — gdy <code>dataLayer.push</code> zawiera pole <code>event</code> z konkretną nazwą</li>
                  </ul>

                  <h3>Przykład kodu dataLayer.push</h3>
                  <p>Umieść ten snippet bezpośrednio w kodzie strony, <strong>przed</strong> fragmentem kontenera GTM, jeśli wartości muszą być dostępne przy ładowaniu:</p>

                  <pre><code>{`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({ ecommerce: null });  
window.dataLayer.push({
  event: 'purchase',
  ecommerce: {                               
    transaction_id: 'ORD-98765',
    value: 499.00,
    currency: 'PLN',
    items: [{ item_id: 'SKU-001', item_name: 'Pakiet SEO', quantity: 1 }]
  }
});`}</code></pre>

                  <p>Jeśli push następuje po akcji użytkownika (np. kliknięcie przycisku), możesz go umieścić w handlerze zdarzenia — GTM odbierze go asynchronicznie.</p>

                  <p><em>Porada profesjonalisty: Trzymaj Measurement ID jako zmienną stałą w GTM, nigdy nie wklejaj go bezpośrednio do każdego tagu. Jeden błąd w ID oznacza utratę danych ze wszystkich tagów jednocześnie.</em></p>

                  <h2 id="jak-testowac-i-debugowac-zdarzenia-w-gtm-i-ga4">Jak testować i debugować zdarzenia w GTM i GA4?</h2>
                  <p>Testowanie to etap, który odróżnia solidne wdrożenie od wdrożenia, które „chyba działa“. GTM Preview i <a href="https://developers.google.com/analytics/devguides/collection/ga4/events" target="_blank" rel="noopener noreferrer">GA4 DebugView</a> pełnią różne funkcje i oba są niezbędne.</p>

                  <p><strong>Kroki walidacji:</strong></p>
                  <ul>
                    <li>Kliknij „Podgląd“ (Preview) w GTM — otworzy się nowa karta z Twoją stroną i panelem debugowania</li>
                    <li>Wykonaj akcję, która powinna uruchomić tag (wypełnij formularz, kliknij link)</li>
                    <li>W panelu GTM sprawdź, czy tag pojawił się w sekcji „Tags Fired“ — to potwierdza odpalenie</li>
                    <li>Przejdź do GA4 → Administracja (ikona zębatki) → Wyświetlanie danych → DebugView i poczekaj kilka sekund na pojawienie się zdarzenia</li>
                    <li>Kliknij nazwę zdarzenia w DebugView i sprawdź, czy wszystkie parametry mają oczekiwane wartości</li>
                  </ul>

                  <p>GTM Preview pokazuje, że tag odpalił. DebugView pokazuje, czy parametry dotarły i zostały przetworzone po stronie Google. To kluczowa różnica — checklisty testowe obejmujące oba narzędzia minimalizują ryzyko błędów po publikacji.</p>

                  <p><strong>Checklist testowy:</strong></p>
                  <ul>
                    <li>Nazwa zdarzenia jest pisana małymi literami z podkreślnikami (<code>lower_snake_case</code>)</li>
                    <li>Measurement ID w tagu zdarzenia wskazuje na właściwą właściwość GA4</li>
                    <li>Parametry w panelu „Values“ w GTM Preview mają oczekiwane wartości, nie <code>undefined</code></li>
                    <li>Zdarzenie pojawia się w DebugView, nie tylko w GTM Preview</li>
                    <li>Consent Mode v2 nie blokuje wysyłki — od marca 2024 jest obowiązkowy dla ruchu z EEA/UK i wymaga obsługi czterech sygnałów: <code>ad_storage</code>, <code>analytics_storage</code>, <code>ad_user_data</code>, <code>ad_personalization</code>. Sprawdź w zakładce Consent w GTM Preview, czy domyślny stan to <code>denied</code> i czy sygnały aktualizują się po interakcji z banerem cookies.</li>
                    <li>Resetujesz cache przeglądarki między testami, by uniknąć fałszywych wyników</li>
                  </ul>

                  <p>Aby jednak nie polegać wyłącznie na wbudowanych narzędziach i znacznie ułatwić sobie pracę, warto zainstalować dedykowane rozszerzenia do przeglądarki. Do codziennego debugowania warstwy danych i tagów niezastąpione będą: Tag Assistant Companion (oficjalne wsparcie Google), Omnibug lub Adswerve - dataLayer Inspector+. Pozwalają one na szybki podgląd parametrów bez konieczności ciągłego przełączania się między oknami.</p>

                  <h2 id="zaawansowane-zdarzenia-przez-datalayer-kiedy-i-jak-je-stosowac">Zaawansowane zdarzenia przez dataLayer: kiedy i jak je stosować?</h2>
                  <p>Dla kluczowych zdarzeń <a href="https://www.analyticsmania.com/post/google-tag-manager-event-tracking/" target="_blank" rel="noopener noreferrer">dataLayer.push jest bardziej niezawodny</a> niż wyzwalacze oparte wyłącznie na zdarzeniach DOM. Powód jest prosty: dane transakcyjne, takie jak <code>transaction_id</code> czy <code>value</code>, powinny pochodzić z backendu, nie z elementów HTML, które użytkownik może zmodyfikować.</p>

                  <p>Deklaruj <code>window.dataLayer</code> możliwie wysoko w kodzie strony. Zgodnie z dokumentacją Google, jeśli wartości muszą być dostępne przy ładowaniu kontenera, push powinien wystąpić <strong>nad</strong> snippetem GTM. GTM przetwarza komunikaty z dataLayer w kolejności FIFO (pierwsze weszło, pierwsze wyszło), więc kolejność pushów ma znaczenie przy złożonych wdrożeniach.</p>

                  <p>Przykład dla zdarzenia <code>generate_lead</code>:</p>

                  <pre><code>{`window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'generate_lead',
  lead_source: 'contact_form',
  form_name: 'Zapytanie ofertowe',
  value: 150.00,
  currency: 'PLN'
});`}</code></pre>

                  <p>Umieść ten kod w handlerze formularza kontaktowego lub na stronie podziękowania po wysłaniu zapytania. Pełny przykład zdarzenia purchase znajdziesz wyżej, w Kroku 4. Podobnie jak przy transakcjach, wartości leadów warto wypychać z backendu — po walidacji formularza po stronie serwera.</p>

                  <p><strong>Najlepsze praktyki:</strong></p>
                  <ul>
                    <li>Nigdy nie nadpisuj <code>window.dataLayer</code> — zawsze używaj <code>window.dataLayer = window.dataLayer || []</code></li>
                    <li>Nie przesyłaj danych osobowych (imię, e-mail, telefon) przez dataLayer bez odpowiedniej anonimizacji</li>
                    <li>Trzymaj nazwy kluczy spójne między środowiskami (dev, staging, produkcja)</li>
                    <li>Gdy potrzebujesz nasłuchiwać konkretnego eventu, użyj Custom Event triggera z nazwą eventu zamiast polegać na kolejności asynchronicznej</li>
                  </ul>

                  <p><em>Porada profesjonalisty: Wartości transakcyjne, takie jak <code>transaction_id</code> i <code>value</code>, wypychaj z backendu po potwierdzeniu płatności. Dane pobierane z frontendu można zmodyfikować w narzędziach deweloperskich przeglądarki, co zaburza raporty przychodów.</em></p>

                  <h2 id="jak-znalezc-zdarzenia-w-ga4-i-oznaczyc-je-jako-konwersje">Jak znaleźć zdarzenia w GA4 i oznaczyć je jako kluczowe zdarzenia?</h2>
                  <p>Po opublikowaniu kontenera zdarzenia pojawiają się w kilku miejscach w GA4. Najszybciej sprawdzisz je w Realtime (widok bieżący) lub DebugView. Po 24–48 godzinach trafią do standardowych raportów w sekcji Raporty → Zdarzenia.</p>

                  <p>Aby oznaczyć zdarzenie jako kluczowe zdarzenie: przejdź do Administracja → Wyświetlanie danych → Zdarzenia, znajdź nazwę zdarzenia na liście i włącz przełącznik „Oznacz jako kluczowe zdarzenie”. Zmiana jest aktywna od momentu jej zapisania — nie działa wstecznie.</p>

                  <p>Nie oznaczaj jako <strong>kluczowego zdarzenia</strong> każdego zdarzenia, które wydaje się ważne. <a href="https://ntpm.pl/google-analytics-events-jak-sledzic-zdarzenia-i-budowac-lepsze-raporty/" target="_blank" rel="noopener noreferrer">GA4 ma limit około 500 unikalnych nazw zdarzeń</a> na właściwość w przypadku strumieni aplikacji (app). Dla stron internetowych (web) limit formalnie nie obowiązuje lub jest znacznie wyższy. Co ważniejsze w praktyce, GA4 pozwala oznaczyć maksymalnie <strong>30 kluczowych zdarzeń na standardową właściwość</strong> (50 w GA4 360), planuj oznaczenia oszczędnie. Niezależnie od tego warto trzymać katalog zdarzeń możliwie mały. Zbyt wiele zdarzeń oznaczonych jako kluczowe zdarzenia utrudnia interpretację raportów i optymalizację kampanii w Google Ads.</p>

                  {/* 5.11.2026 (PLAN-v2 6.25 R1, decyzje-blog nr 14, MSA-17): dwa H2 z wlasnego wdrozenia 4.11.2026.
                      Fakty: components/Contact.jsx (generate_lead po zapisie zgloszenia), lib/track.js (page_type),
                      PLAN-v2 3.7 (zdarzenie kluczowe i wymiar „Typ strony” w GA4 od 4.11.2026, zgoda domyslnie „denied”). */}
                  <h2 id="generate-lead-nasze-wdrozenie">generate_lead jako zdarzenie kluczowe: nasze wdrożenie</h2>
                  <p>Pokażemy to na naszej stronie. Nie ma na niej kontenera GTM: serwis działa na Next.js, a zdarzenia wysyła gtag.js bezpośrednio z kodu formularza. Po stronie GA4 konfiguracja wygląda jednak tak samo jak przy tagu zdarzenia z GTM, a nazwa zdarzenia i parametry są identyczne.</p>
                  <p>Gdy serwer potwierdzi zapisanie zgłoszenia z formularza kontaktowego, strona wysyła zalecane przez Google zdarzenie <code>generate_lead</code> z parametrami:</p>
                  <ul>
                    <li><code>transaction_id</code>: identyfikator zgłoszenia, ten sam, który trafia do e-maila i arkusza zgłoszeń, więc lead z GA4 da się dopasować do rozmowy handlowej;</li>
                    <li><code>plan</code>: pakiet wybrany w formularzu, np. <code>standard</code> albo <code>premium</code>;</li>
                    <li><code>value</code> i <code>currency</code>: miesięczna wartość pakietu netto w PLN, np. 1900 dla SEO Standard, żeby raporty i import do Google Ads liczyły wartość, a nie tylko sztuki;</li>
                    <li><code>page_type</code>: typ strony, z której przyszło zgłoszenie (o nim w następnej sekcji).</li>
                  </ul>

                  <pre><code>{`window.gtag('event', 'generate_lead', {
  transaction_id: leadId,
  event_category: 'Contact',
  plan: data.service || 'none',
  currency: 'PLN',
  value: LEAD_VALUE_PLN[data.service] ?? DEFAULT_LEAD_VALUE_PLN,
  page_type: pageType(window.location.pathname),
});`}</code></pre>

                  <p>4 listopada 2026 oznaczyliśmy <code>generate_lead</code> jako kluczowe zdarzenie, tą samą ścieżką co wyżej: Administracja → Wyświetlanie danych → Zdarzenia. Dwie decyzje z tego wdrożenia, które warto skopiować:</p>
                  <ul>
                    <li>Zdarzenie idzie dopiero po odpowiedzi serwera, że zgłoszenie zapisano. Kliknięcie przycisku bez wysłanego formularza nie jest leadem, a zgłoszenia odrzucone przez filtr antyspamowy nie trafiają do GA4.</li>
                    <li>W Polsce domyślny stan Consent Mode to odmowa zgody na analitykę, więc GA4 nie zapisze części zgłoszeń. Jeśli formularz zapisuje leady także w CRM albo w arkuszu, pełną liczbę bierz stamtąd, a GA4 traktuj jako źródło proporcji: kanałów i typów stron.</li>
                  </ul>

                  <h2 id="wymiar-page-type">Wymiar niestandardowy: typ strony (page_type)</h2>
                  <p>Sama liczba leadów nie mówi, które strony je przyniosły. Dlatego każde zdarzenie wysyłane przez naszą funkcję <code>track()</code> dostaje parametr <code>page_type</code>, wyliczany ze ścieżki adresu: strona główna to <code>home</code>, cennik to <code>cennik</code>, strony usług to <code>usluga</code>, artykuł bloga to <code>blog</code>, porównanie to <code>porownanie</code>. Nowy szablon stron oznacza nową regułę w jednym miejscu kodu:</p>

                  <pre><code>{String.raw`const PAGE_TYPES = [
  [/^\/(en\/?)?$/, 'home'],
  [/^(\/en)?\/(cennik-pozycjonowania|seo-pricing)(\/|$)/, 'cennik'],
  [/^(\/en)?\/(porownania|comparisons)(\/|$)/, 'porownanie'],
  [/^(\/en)?\/blog\/.+/, 'blog'],
  // ...
];

export function pageType(pathname = '') {
  for (const [re, type] of PAGE_TYPES) if (re.test(pathname)) return type;
  return 'inne';
}`}</code></pre>

                  <p>Sam parametr nie wystarczy. Żeby zobaczyć go w raportach, trzeba go zarejestrować w GA4 jako wymiar niestandardowy:</p>
                  <ol>
                    <li>Administracja → Wyświetlanie danych → Definicje niestandardowe → Utwórz wymiar niestandardowy.</li>
                    <li>Nazwa wymiaru: „Typ strony”, zakres: Zdarzenie, parametr zdarzenia: <code>page_type</code>.</li>
                    <li>Zapisz. Wymiar nie działa wstecz: obejmie tylko zdarzenia zebrane po rejestracji.</li>
                  </ol>
                  <p>Wymiar „Typ strony” zarejestrowaliśmy 4 listopada 2026, razem z oznaczeniem zdarzenia kluczowego. Od tego dnia w raporcie zdarzeń kluczowych widać, czy leady przychodzą ze stron usług, z cennika czy z bloga. Pierwszy pełny miesiąc danych to listopad 2026, dlatego nie podajemy jeszcze liczb.</p>
                  <p>Klienci naszych pakietów SEO widzą zapytania z GA4 (formularz, telefon, e-mail) na pierwszym ekranie panelu. Tak wyglądają <Link href="/panel-klienta">raporty w panelu klienta</Link>.</p>

                  <h2 id="najczestsze-problemy-i-jak-je-szybko-naprawic">Najczęstsze problemy i jak je szybko naprawić</h2>
                  <ol>
                    <li><strong>Tag odpala w GTM, ale brak zdarzenia w GA4.</strong> Sprawdź Measurement ID — czy wskazuje na właściwą właściwość? Otwórz DebugView i upewnij się, że przeglądarka jest w trybie debugowania. Sprawdź zakładkę Consent w GTM Preview, czy Consent Mode nie blokuje wysyłki. Pamiętaj, że Realtime ma opóźnienie kilku sekund.</li>
                    <li><strong>Parametry mają wartość <code>undefined</code>.</strong> Zmienna GTM nie jest włączona lub klucz w <code>dataLayer.push</code> nie zgadza się z nazwą zmiennej w GTM. Sprawdź w panelu „Values“ w GTM Preview, co faktycznie zwraca zmienna. Upewnij się, że klucze w obiekcie push są w cudzysłowie i pisane dokładnie tak samo jak w konfiguracji zmiennej.</li>
                    <li><strong>Konflikty kolejności pushów.</strong> Jeśli dane muszą być dostępne przy ładowaniu strony, push musi wystąpić nad snippetem GTM. Dla danych ładowanych asynchronicznie (np. po odpowiedzi API) użyj Custom Event triggera z konkretną nazwą eventu — GTM odbierze go w momencie push, nie przy ładowaniu strony.</li>
                    <li><strong>Zdarzenie pojawia się podwójnie w GA4.</strong> Sprawdź, czy tag nie ma dwóch wyzwalaczy lub czy <code>dataLayer.push</code> nie jest wywoływany dwukrotnie (np. raz w kodzie strony, raz przez GTM). W GTM Preview sprawdź, ile razy tag pojawia się w sekcji „Tags Fired“.</li>
                    <li><strong>Błędy JavaScript w konsoli.</strong> Otwórz narzędzia deweloperskie przeglądarki (F12) i sprawdź zakładkę Console podczas wykonywania akcji. Błąd w skrypcie strony może uniemożliwić wykonanie push. Tymczasowo dodaj <code>console.log(window.dataLayer)</code> po pushu, by potwierdzić, że obiekt zawiera oczekiwane dane.</li>
                    <li><strong>Selektor CSS wyzwalacza nie działa.</strong> W GTM Preview kliknij element i sprawdź w zakładce „Click“ wartości zmiennych <code>Click Element</code>, <code>Click Classes</code>, <code>Click ID</code>. Porównaj je z warunkiem wyzwalacza i popraw selektor.</li>
                  </ol>

                  <h2 id="jak-zarzadzac-zdarzeniami-w-organizacji-katalog-nazewnictwo-i-dokumentacja">Jak zarządzać zdarzeniami w organizacji: katalog, nazewnictwo i dokumentacja</h2>
                  <p>Brak spójności nazewnictwa i zbyt wiele kluczowych zdarzeń to najczęstsze przyczyny chaosu w raportach. Rozwiązaniem jest katalog zdarzeń prowadzony jako żywy dokument zespołowy.</p>

                  <p>Konwencja nazewnictwa: <code>lower_snake_case</code> bez wyjątków, opcjonalne prefiksy tematyczne (<code>form_</code>, <code>video_</code>, <code>ecommerce_</code>) dla grup zdarzeń. Tę samą konwencję stosuj w każdym środowisku — dev, staging i produkcja muszą używać identycznych nazw, inaczej porównanie danych między środowiskami staje się niemożliwe.</p>

                  <p>Przed każdą publikacją kontenera przeprowadź przegląd zmian z właścicielem katalogu. Wersjonuj dokumentację razem ze zmianami w GTM — notatka w wersji kontenera powinna wskazywać, które zdarzenia zostały dodane lub zmodyfikowane.</p>

                  <h2 id="kiedy-warto-zlecic-wdrozenie-gtm-specjaliscie">Kiedy warto zlecić wdrożenie GTM specjaliście?</h2>
                  <p>Prosty gtm event tracking — śledzenie kliknięć w przyciski, podstawowe formularze, scroll depth — jest w zasięgu każdego analityka z podstawami JavaScript i kilkoma godzinami na naukę GTM. Wewnętrzny zespół poradzi sobie, jeśli ma dostęp do jednego developera, który może szybko dodać <code>dataLayer.push</code> do kodu strony.</p>

                  <p>Sytuacja zmienia się przy wdrożeniach wymagających integracji backendowej. Jeśli <code>transaction_id</code> i <code>value</code> muszą pochodzić z serwera po potwierdzeniu płatności, potrzebujesz kogoś, kto rozumie zarówno architekturę aplikacji, jak i specyfikę dataLayer. Podobnie przy wielostronicowym e-commerce z dziesiątkami zdarzeń, złożoną atrybucją lub gdy organizacja nie ma żadnych procesów governance dla GTM — brak dokumentacji i kontroli wersji to prosta droga do sytuacji, w której nikt nie wie, co i dlaczego odpala.</p>

                  <p>Decydenci powinni zadać sobie trzy pytania: czy wdrożenie wymaga zmian w backendzie, czy organizacja ma zasoby do utrzymania dokumentacji, i jakie ryzyko niesie błąd analityczny dla decyzji biznesowych. Gdy odpowiedź na pierwsze lub trzecie pytanie brzmi „tak“ — outsourcing jest tańszy niż naprawa błędów po fakcie.</p>

                  <p>Jeśli nie wiesz, czy obecny pomiar liczy leady poprawnie, sprawdź to przy okazji <Link href="/audyt-seo">audytu SEO</Link>: do audytu i tak potrzebujemy dostępu do Search Console i Analytics, więc rozjazdy między formularzem a GA4 wychodzą przy tej samej pracy.</p>

                  <h2 id="ai-seo-company-wdrozenie-gtm-i-konfiguracja-zdarzen-dla-twojej-firmy">AI SEO COMPANY: wdrożenie GTM i konfiguracja zdarzeń dla Twojej firmy</h2>
                  <p>Zamiast spędzać tygodnie na konfiguracji i debugowaniu, możesz zlecić całość specjalistom, którzy robią to na co dzień.</p>

                  <p><Link href="/" style={{ color: '#0066cc', textDecoration: 'underline' }}>AI SEO COMPANY</Link> realizuje kompleksowe wdrożenia GTM dla firm w Polsce: od audytu istniejącego kontenera, przez zaprojektowanie katalogu zdarzeń i implementację dataLayer.push dla kluczowych zdarzeń, po testy w Preview i DebugView oraz szkolenie Twojego zespołu. Każde wdrożenie kończy się dokumentacją gotową do przekazania wewnętrznemu analitykowi. Transparentny zakres prac oznacza, że przed startem wiesz dokładnie, co dostarczymy: które zdarzenia zostaną skonfigurowane, kto jest odpowiedzialny (developer, analityk, PM) i kiedy projekt zostanie zamknięty. Skontaktuj się z nami przez formularz poniżej, by omówić zakres wdrożenia.</p>

                  <h2 id="zrodla">Źródła</h2>
                  <p>Poniższe zasoby warto mieć otwarte podczas implementacji:</p>
                  <ul>
                    <li><a href="https://developers.google.com/analytics/devguides/collection/ga4/events" target="_blank" rel="noopener noreferrer">Set up events | Google Analytics | Google for Developers</a></li>
                    <li><a href="https://www.analyticsmania.com/post/google-tag-manager-event-tracking/" target="_blank" rel="noopener noreferrer">Google Tag Manager Event Tracking with Google Analytics (2026)</a></li>
                    <li><a href="https://ntpm.pl/google-analytics-events-jak-sledzic-zdarzenia-i-budowac-lepsze-raporty/" target="_blank" rel="noopener noreferrer">Google Analytics events – jak śledzić zdarzenia i budować lepsze raporty? - NTPM</a></li>
                    <li><a href="https://cogny.com/docs/gtm-event-tracking" target="_blank" rel="noopener noreferrer">GTM Event Tracking & Setup Reference — Complete Implementation Guide | Cogny</a></li>
                  </ul>
                  
                  <p>Do codziennej pracy z GTM najczęściej sięgaj po dokumentację na <code>developers.google.com</code> — znajdziesz tam specyfikacje techniczne dataLayer i listę zalecanych nazw zdarzeń. Panel <code>support.google.com</code> jest lepszy do szybkich instrukcji konfiguracyjnych bez zagłębiania się w kod.</p>

                  <BlogCTA 
                    locale={locale} 
                    currentSlug="/blog/konfiguracja-zdarzen-gtm-ga4-poradnik" 
                  />
                </>
              )}
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
