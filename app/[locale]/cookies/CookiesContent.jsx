'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { homeHash } from '@/lib/anchors';

export default function CookiesContent() {
  const lang = useLocale();
  const t = useTranslations('cookiesPage');

  return (
    <>
      <Header />
      {/* 5.11.2026 (PLAN-v2 6.24, okruszki na 6 stronach; SA-07 pkt 4): widoczne okruszki
          + BreadcrumbList na /cookies i /en/cookies. Klasa subpage-main = ten sam odstęp pod
          okruszkami co na /blog i /o-nas. Title i meta strony bez zmian (SA-10); H1 PL
          („Polityka prywatności i cookies”) zmienia Integracja w messages/pl.json. */}
      <Breadcrumbs pl="Polityka cookies" en="Cookies policy" />
      <main className="subpage-main" style={{ paddingTop: '120px', minHeight: '80vh', background: 'var(--w-papier-2)' }}>
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: '3rem', color: 'var(--w-tusz)', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            {t('title')}
          </h1>
          <div style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.8 }}>
            <p>
              {lang === 'pl' 
                ? 'Poniżej znajduje się Polityka Cookies serwisu AI SEO COMPANY.' 
                : 'Below you will find the Cookies Policy of AI SEO COMPANY.'}
            </p>
            <p>{t('content')}</p>
            <p style={{ marginTop: '2rem' }}>{lang === 'pl' ? 'Zależy nam na najwyższej jakości świadczonych usług i maksymalnej satysfakcji naszych klientów. Pliki cookies pomagają nam w nieustannym ulepszaniu naszego serwisu internetowego, dostosowując go do indywidualnych preferencji i potrzeb użytkowników. Analizując sposób, w jaki korzystasz z naszej strony, możemy wyciągać wnioski i wprowadzać modyfikacje, które ułatwiają nawigację, skracają czas ładowania podstron oraz eksponują najbardziej poszukiwane informacje. Dodatkowo, pliki cookies wykorzystywane są do utrzymywania sesji po zalogowaniu, dzięki czemu nie musisz wpisywać hasła na każdej odwiedzanej podstronie. Nasze działania marketingowe opierają się na zaawansowanych algorytmach i anonimizowanych danych statystycznych, co pozwala nam wyświetlać reklamy, które są faktycznie interesujące i relewantne z punktu widzenia potencjalnych odbiorców, ograniczając jednocześnie liczbę wyświetleń niechcianych banerów. Szanujemy Twoją prywatność, dlatego wszystkie zebrane informacje są starannie zabezpieczone i przetwarzane zgodnie z rygorystycznymi standardami bezpieczeństwa oraz obowiązującymi przepisami o ochronie danych osobowych. Masz pełną kontrolę nad swoimi preferencjami - w każdej chwili możesz wycofać zgodę na używanie określonych kategorii ciasteczek w ustawieniach swojej przeglądarki, choć może to wpłynąć na dostępność i funkcjonowanie niektórych zaawansowanych funkcji naszego portalu. Staramy się, by nasze systemy były przejrzyste i zrozumiałe dla każdego, dlatego zachęcamy do zapoznania się z pełną treścią naszego regulaminu i dokumentów powiązanych, które dokładnie precyzują zakres i cel przetwarzania informacji o użytkownikach w ramach struktury AI SEO COMPANY. Dbamy o to, by każda interakcja z naszą witryną przebiegała płynnie i bezproblemowo, dostarczając najlepszych możliwych doświadczeń.' : 'We are committed to providing the highest quality of services and ensuring maximum customer satisfaction. Cookies help us continuously improve our website by adapting it to the individual preferences and needs of our users. By analyzing how you interact with our site, we can draw conclusions and make modifications that facilitate navigation, reduce page load times, and highlight the most sought-after information. Additionally, cookies are used to maintain your session after logging in, so you do not have to re-enter your password on every page you visit. Our marketing efforts are based on advanced algorithms and anonymized statistical data, allowing us to display advertisements that are genuinely interesting and relevant to our potential audience, while simultaneously limiting the number of unwanted banners you see. We respect your privacy, which is why all collected information is carefully secured and processed in accordance with strict security standards and applicable data protection regulations. You have full control over your preferences - you can withdraw your consent for the use of specific categories of cookies at any time in your browser settings, although this may affect the availability and functionality of certain advanced features of our portal. We strive to make our systems transparent and easy to understand for everyone, which is why we encourage you to read the full text of our terms and conditions and related documents, which clearly define the scope and purpose of processing user information within the AI SEO COMPANY structure. We ensure that every interaction with our website is smooth and seamless, providing the best possible digital experience for all visitors globally.'}</p>
            <p style={{ marginTop: '2rem' }}>{lang === 'pl' ? 'Zapewnienie bezpieczeństwa danych użytkowników to nasz absolutny priorytet. Wykorzystujemy najnowocześniejsze metody szyfrowania, które gwarantują poufność i integralność wszystkich informacji przesyłanych pomiędzy Twoją przeglądarką a naszymi serwerami. Stale monitorujemy nasze systemy pod kątem potencjalnych luk w zabezpieczeniach.' : 'Ensuring the security of our users data is our absolute top priority. We utilize state-of-the-art encryption methods that guarantee the confidentiality and integrity of all information transmitted between your browser and our servers. We constantly monitor our systems for any potential vulnerabilities.'}</p>
            <p style={{ marginTop: '2rem' }}>{lang === 'pl' ? 'Jeśli masz jakiekolwiek pytania lub wątpliwości dotyczące sposobu, w jaki zarządzamy plikami cookies lub przetwarzamy dane, nasz zespół wsparcia jest do Twojej dyspozycji. Zachęcamy do kontaktu w celu uzyskania szczegółowych wyjaśnień i pełnej transparentności naszych działań operacyjnych na każdym etapie.' : 'If you have any questions or concerns regarding how we manage cookies or process data, our support team is always at your disposal. We encourage you to contact us for detailed explanations and full transparency of our operational activities at every single stage of your journey.'}</p>
            {lang === 'pl' ? (
              <>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>1. Czym są pliki cookies?</h2>
                <p>Pliki cookies (tzw. ciasteczka) to dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>2. Cele w jakich stosowane są cookies</h2>
                <p>Cookies używamy w celach analitycznych (Google Analytics), marketingowych (śledzenie konwersji i personalizacja reklam) oraz do zapewnienia prawidłowego funkcjonowania serwisu.</p>
                <p>Jeśli trafisz na stronę z reklamy Google Ads, identyfikator kliknięcia (parametr <code>gclid</code>, <code>gbraid</code> lub <code>wbraid</code>) oraz parametry <code>utm_*</code> zapisujemy na czas sesji, a po wyrażeniu zgody marketingowej – w ciasteczku <code>aisc_attr</code> na 90 dni. Identyfikator dołączamy do zgłoszenia z formularza kontaktowego wyłącznie po to, aby zmierzyć skuteczność reklam (w tym przekazać do Google Ads informację, że zapytanie zakończyło się współpracą). Nie łączymy go z innymi danymi ani nie przekazujemy innym podmiotom.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>3. Zarządzanie plikami cookies</h2>
                <p>W wielu przypadkach oprogramowanie służące do przeglądania stron internetowych (przeglądarka internetowa) domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać w każdym czasie zmiany ustawień dotyczących plików cookies w swojej przeglądarce.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>4. Kontakt</h2>
                <p>W razie pytań dotyczących polityki cookies prosimy o <a href={homeHash('kontakt', lang)} style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>kontakt</a>. Więcej o naszych usługach dowiesz się na stronach: <a href="/pozycjonowanie-stron-internetowych" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>pozycjonowanie stron</a>, <a href="/projektowanie-stron-internetowych" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>projektowanie stron internetowych</a> oraz <a href="/audyt-seo" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>audyt SEO</a>.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>5. Zmiany w polityce cookies i prywatności</h2>
                <p>Zastrzegamy sobie prawo do wprowadzania zmian w niniejszej polityce cookies, co może wynikać z rozwoju technologii internetowych, ewentualnych zmian prawa w zakresie ochrony danych osobowych oraz rozwoju naszego serwisu internetowego. O wszelkich zmianach będziemy informować w sposób widoczny i zrozumiały na naszej stronie głównej lub poprzez stosowne powiadomienia w przeglądarce. Użytkownicy zawsze mają nieograniczony dostęp do aktualnej wersji tego dokumentu na naszej witrynie. Dodatkowo, wszelkie modyfikacje wchodzą w życie z dniem ich publikacji, chyba że przepisy prawa stanowią inaczej. Przestrzeganie aktualnych dyrektyw jest dla nas najwyższym priorytetem, gwarantującym pełne bezpieczeństwo cyfrowe każdej interakcji.</p>

                {/* Art. 13 RODO. Okresy przechowywania i kategorie odbiorców odpowiadają
                    faktycznemu stanowi serwisu (formularz kontaktowy + Google Analytics).
                    Do potwierdzenia przez dział prawny przy zmianie procesów. */}
                <h2 style={{ marginTop: '3rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.75rem' }}>Polityka prywatności – informacja o przetwarzaniu danych osobowych</h2>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Administrator danych</h3>
                <p>Administratorem Twoich danych osobowych jest <strong>AI SIGNALS COMPANY Prosta Spółka Akcyjna</strong> z siedzibą w Warszawie, ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa, wpisana do rejestru przedsiębiorców Krajowego Rejestru Sądowego prowadzonego przez Sąd Rejonowy dla m.st. Warszawy w Warszawie pod numerem KRS 0001239983, NIP 5253090237, REGON 544761611.</p>
                <p>Kontakt w sprawach ochrony danych: <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>kontakt@ai-seo-company.pl</a> lub telefonicznie: <a href="tel:+48518815055" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>518 815 055</a>. Nie powołaliśmy Inspektora Ochrony Danych – we wszystkich sprawach dotyczących danych osobowych możesz kontaktować się bezpośrednio z administratorem.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Cele i podstawy prawne przetwarzania</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>Odpowiedź na zapytanie z formularza kontaktowego</strong> – podstawa: art. 6 ust. 1 lit. b RODO (działania podejmowane na Twoje żądanie przed zawarciem umowy) oraz art. 6 ust. 1 lit. f RODO (nasz prawnie uzasadniony interes polegający na prowadzeniu korespondencji handlowej).</li>
                  <li><strong>Zawarcie i wykonanie umowy o świadczenie usług</strong> – podstawa: art. 6 ust. 1 lit. b RODO.</li>
                  <li><strong>Wypełnienie obowiązków podatkowych i rachunkowych</strong> – podstawa: art. 6 ust. 1 lit. c RODO.</li>
                  <li><strong>Analityka ruchu w serwisie (Google Analytics)</strong> – podstawa: art. 6 ust. 1 lit. a RODO, czyli Twoja zgoda wyrażona w banerze cookies. Do czasu jej udzielenia nie uruchamiamy skryptów analitycznych.</li>
                  <li><strong>Ustalenie, dochodzenie lub obrona roszczeń</strong> – podstawa: art. 6 ust. 1 lit. f RODO.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Okres przechowywania danych</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li>Dane z formularza kontaktowego, które nie doprowadziły do zawarcia umowy – do 12 miesięcy od zakończenia korespondencji.</li>
                  <li>Dane związane z realizacją umowy – przez czas jej trwania, a następnie przez okres przedawnienia roszczeń.</li>
                  <li>Dokumentacja księgowa – 5 lat, licząc od końca roku kalendarzowego, w którym upłynął termin płatności podatku.</li>
                  <li>Dane z cookies analitycznych – do 14 miesięcy od ostatniej wizyty albo do momentu wycofania zgody.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Odbiorcy danych i przekazywanie poza EOG</h3>
                <p>Twoje dane mogą być powierzane podmiotom przetwarzającym je na nasze zlecenie: dostawcy hostingu i infrastruktury serwerowej, dostawcy poczty elektronicznej, biuru rachunkowemu oraz dostawcy narzędzi analitycznych (Google Ireland Limited). Każdy z nich działa na podstawie umowy powierzenia przetwarzania.</p>
                <p>W związku z korzystaniem z Google Analytics dane mogą być przekazywane do Stanów Zjednoczonych. Podstawą przekazania jest decyzja Komisji Europejskiej stwierdzająca odpowiedni stopień ochrony (EU–US Data Privacy Framework) lub standardowe klauzule umowne.</p>

                {/* 11.11.2026: darmowe narzędzia (audyt SEO, autorytet domeny, widoczność w AI, kalkulator,
                    makieta) i newsletter - stan zgodny z kodem panelu (tool_runs 60 dni, skrót IP, double
                    opt-in, odbiorcy z lib/zgodyNarzedzi.js). Do potwierdzenia przez dział prawny. */}
                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Darmowe narzędzia i newsletter</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>Wynik narzędzia wysłany e-mailem</strong> – gdy podasz adres e-mail i zaznaczysz zgodę na wysłanie wyniku, przetwarzamy adres e-mail, dane wpisane w formularz narzędzia (np. adres strony, nazwę firmy, branżę, miasto, liczby do kalkulatora) i wynik. Podstawa: art. 6 ust. 1 lit. b RODO (wysłanie wyniku na Twoje żądanie) oraz art. 6 ust. 1 lit. f RODO (odpowiedź na pytania dotyczące wyniku). Wyniki i adres e-mail usuwamy po 60 dniach.</li>
                  <li><strong>Ochrona przed nadużyciami</strong> – z adresu IP zapisujemy wyłącznie jednokierunkowy skrót, aby stosować dzienne limity korzystania z narzędzi. Podstawa: art. 6 ust. 1 lit. f RODO.</li>
                  <li><strong>Newsletter</strong> – tylko po zaznaczeniu osobnej, dobrowolnej zgody i potwierdzeniu zapisu linkiem z wiadomości (double opt-in). Zapisujemy adres e-mail, treść i wersję zgody, datę i źródło zapisu. Podstawa: art. 6 ust. 1 lit. a RODO. Zgodę wycofasz jednym kliknięciem w każdej wiadomości; dane newslettera przetwarzamy do czasu wycofania zgody. Wynik narzędzia otrzymasz także bez zapisu do newslettera.</li>
                  <li><strong>Comiesięczny audyt SEO i historia audytów</strong> – tylko po zaznaczeniu osobnej, dobrowolnej zgody przy wyniku audytu i potwierdzeniu linkiem z wiadomości (double opt-in; bez kliknięcia nie wysyłamy nic, a niepotwierdzoną prośbę usuwamy po 7 dniach). Przetwarzamy adres e-mail, domenę i adres strony, treść i wersję zgody, datę prośby i potwierdzenia, skrót adresu IP oraz liczby z ostatniego audytu, żeby co miesiąc wysłać ponowny audyt i pokazać zmianę od poprzedniego. Wyniki audytów zapisane w naszej bazie (także te comiesięczne) usuwamy po 60 dniach; liczby do porównania i dane monitoringu przechowujemy do wycofania zgody. Podstawa: art. 6 ust. 1 lit. a RODO. Zgodę wycofasz jednym kliknięciem w każdej wiadomości (link „Wypisz”, także przycisk wypisu w programie pocztowym). Wynik audytu otrzymasz także bez tej zgody. Przy porównaniu z poprzednim audytem tej samej domeny korzystamy też z naszych wcześniejszych wyników tej domeny sprzed najwyżej 60 dni.</li>
                  <li><strong>Okno z szablonem PDF</strong> – gdy podasz adres e-mail w oknie z darmowym szablonem lub checklistą i zaznaczysz zgodę, wyślemy Ci plik (art. 6 ust. 1 lit. b RODO) i powiadomimy zespół o zgłoszeniu (art. 6 ust. 1 lit. f RODO). Opcjonalnie możesz zaznaczyć osobną, niezaznaczoną domyślnie zgodę na newsletter: zapis jest wtedy tym samym double opt-in, a potwierdzenie przychodzi w tej samej wiadomości co plik. Szablon dostaniesz także bez zapisu. Okno nie pokazuje się, dopóki nie zdecydujesz o plikach cookies, a po zamknięciu nie wraca przez 14 dni (Twoją decyzję zapamiętujemy tylko w pamięci przeglądarki, bez wysyłania jej do nas).</li>
                  <li><strong>Odbiorcy</strong> – adres e-mail przekazujemy wyłącznie dostawcy poczty (Resend). Dane wpisane w formularz narzędzia, w zależności od narzędzia, przekazujemy dostawcom analiz: Google (PageSpeed Insights), DataForSEO (odpowiedzi modeli AI i wyników Google), Anthropic (model Claude) oraz Microlink (zrzuty ekranu strony). Jeżeli dostawca przetwarza dane poza EOG, przekazanie odbywa się na podstawie decyzji Komisji Europejskiej stwierdzającej odpowiedni stopień ochrony albo standardowych klauzul umownych.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Twoje prawa</h3>
                <p>Przysługuje Ci prawo do:</p>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>dostępu</strong> do swoich danych oraz otrzymania ich kopii,</li>
                  <li><strong>sprostowania</strong> danych nieprawidłowych lub uzupełnienia niekompletnych,</li>
                  <li><strong>usunięcia</strong> danych („prawo do bycia zapomnianym"),</li>
                  <li><strong>ograniczenia przetwarzania</strong>,</li>
                  <li><strong>przenoszenia danych</strong> do innego administratora,</li>
                  <li><strong>wniesienia sprzeciwu</strong> wobec przetwarzania opartego na prawnie uzasadnionym interesie,</li>
                  <li><strong>cofnięcia zgody</strong> w dowolnym momencie – bez wpływu na zgodność z prawem przetwarzania dokonanego przed jej cofnięciem. Zgodę na cookies wycofasz w każdej chwili przyciskiem preferencji w rogu strony.</li>
                </ul>
                <p>Jeżeli uznasz, że przetwarzamy Twoje dane niezgodnie z prawem, masz prawo wnieść skargę do organu nadzorczego: <strong>Prezes Urzędu Ochrony Danych Osobowych</strong>, ul. Stawki 2, 00-193 Warszawa.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Dobrowolność podania danych i profilowanie</h3>
                <p>Podanie danych jest dobrowolne, ale niezbędne, aby odpowiedzieć na zapytanie lub zawrzeć umowę – bez nich nie będziemy w stanie tego zrobić. Twoje dane nie służą do zautomatyzowanego podejmowania decyzji wywołujących wobec Ciebie skutki prawne, w tym do profilowania w rozumieniu art. 22 RODO.</p>
              </>
            ) : (
              <>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>1. What are cookies?</h2>
                <p>Cookies are IT data, in particular text files, which are stored on the Website User's end device and are intended for using the Website's pages.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>2. Purposes for which cookies are used</h2>
                <p>We use cookies for analytical purposes (Google Analytics), marketing (conversion tracking and ad personalization), and to ensure the proper functioning of the website.</p>
                <p>If you arrive from a Google Ads advert, the click identifier (<code>gclid</code>, <code>gbraid</code> or <code>wbraid</code>) and <code>utm_*</code> parameters are kept for the session and, once you grant marketing consent, in the <code>aisc_attr</code> cookie for 90 days. The identifier is attached to your contact-form enquiry solely to measure advertising effectiveness (including reporting to Google Ads that an enquiry became a client). It is not combined with other data or shared with third parties.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.5rem' }}>3. Cookie management</h2>
                <p>In many cases, the software used for browsing websites (web browser) allows cookies to be stored on the User's end device by default. Website Users can change their cookie settings at any time in their browser.</p>

                <h2 style={{ marginTop: '3rem', marginBottom: '1rem', color: 'var(--w-tusz)', fontSize: '1.75rem' }}>Privacy policy – information on the processing of personal data</h2>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Data controller</h3>
                <p>The controller of your personal data is <strong>AI SIGNALS COMPANY Prosta Spółka Akcyjna</strong>, registered office at ul. Grzybowska 12/14 lok. B-3, 00-132 Warsaw, Poland, entered in the register of entrepreneurs of the National Court Register kept by the District Court for the Capital City of Warsaw under KRS number 0001239983, tax ID (NIP) 5253090237, statistical number (REGON) 544761611.</p>
                <p>Data protection contact: <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>kontakt@ai-seo-company.pl</a> or <a href="tel:+48518815055" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>+48 518 815 055</a>. We have not appointed a Data Protection Officer – please contact the controller directly on any data protection matter.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Purposes and legal bases</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>Answering enquiries sent through the contact form</strong> – Art. 6(1)(b) GDPR (steps taken at your request prior to entering into a contract) and Art. 6(1)(f) GDPR (our legitimate interest in conducting business correspondence).</li>
                  <li><strong>Conclusion and performance of a service agreement</strong> – Art. 6(1)(b) GDPR.</li>
                  <li><strong>Compliance with tax and accounting obligations</strong> – Art. 6(1)(c) GDPR.</li>
                  <li><strong>Website analytics (Google Analytics)</strong> – Art. 6(1)(a) GDPR, your consent given in the cookie banner. Analytics scripts do not run until that consent is granted.</li>
                  <li><strong>Establishing, exercising or defending legal claims</strong> – Art. 6(1)(f) GDPR.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Retention periods</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li>Contact form data that did not lead to a contract – up to 12 months after the correspondence ends.</li>
                  <li>Data related to performing a contract – for its duration and then until claims become time-barred.</li>
                  <li>Accounting records – 5 years from the end of the calendar year in which the tax payment deadline fell.</li>
                  <li>Analytics cookie data – up to 14 months from your last visit, or until consent is withdrawn.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Recipients and transfers outside the EEA</h3>
                <p>Your data may be entrusted to processors acting on our instructions: hosting and server infrastructure providers, e-mail providers, our accounting office, and the provider of analytics tools (Google Ireland Limited). Each acts under a data processing agreement.</p>
                <p>Because we use Google Analytics, data may be transferred to the United States on the basis of the European Commission adequacy decision (EU–US Data Privacy Framework) or standard contractual clauses.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Free tools and newsletter</h3>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>Tool results sent by e-mail</strong> – when you enter your e-mail address and tick the consent to send the result, we process your e-mail address, the data you entered in the tool form (e.g. website address, company name, industry, city, calculator figures) and the result. Legal basis: Art. 6(1)(b) GDPR (sending the result at your request) and Art. 6(1)(f) GDPR (answering questions about the result). Results and e-mail addresses are deleted after 60 days.</li>
                  <li><strong>Abuse prevention</strong> – we store only a one-way hash of your IP address to apply daily usage limits. Legal basis: Art. 6(1)(f) GDPR.</li>
                  <li><strong>Newsletter</strong> – only after you tick a separate, voluntary consent and confirm the subscription with the link in our e-mail (double opt-in). We store your e-mail address, the text and version of the consent, and the date and source of the subscription. Legal basis: Art. 6(1)(a) GDPR. You can withdraw consent with one click in any e-mail; newsletter data is processed until you withdraw. You get the tool result without subscribing.</li>
                  <li><strong>Monthly SEO audit and audit history</strong> – only after you tick a separate, voluntary consent next to the audit result and confirm it with the link in our e-mail (double opt-in; without the click we send nothing, and an unconfirmed request is deleted after 7 days). We process your e-mail address, the domain and page address, the text and version of the consent, the date of the request and of the confirmation, a hash of your IP address and the numbers from the latest audit, to send a new audit every month and show the change since the previous one. Audit results stored in our database (including the monthly ones) are deleted after 60 days; the numbers used for comparison and the monitoring data are kept until you withdraw consent. Legal basis: Art. 6(1)(a) GDPR. You can withdraw consent with one click in any e-mail (the “Unsubscribe” link, also the unsubscribe button in your mail client). You get the audit result without this consent. To compare with the previous audit of the same domain we also use our earlier results for that domain, no older than 60 days.</li>
                  <li><strong>Template PDF window</strong> – when you enter your e-mail address in the window offering a free template or checklist and tick the consent, we send you the file (Art. 6(1)(b) GDPR) and notify our team about the request (Art. 6(1)(f) GDPR). You can optionally tick a separate consent to the newsletter, unticked by default: the subscription then uses the same double opt-in, and the confirmation arrives in the same e-mail as the file. You get the template without subscribing. The window does not appear until you decide on cookies, and after you close it, it does not return for 14 days (we remember your decision only in your browser storage and do not send it to us).</li>
                  <li><strong>Recipients</strong> – your e-mail address is shared only with our e-mail provider (Resend). Depending on the tool, the data you enter in the tool form is shared with analysis providers: Google (PageSpeed Insights), DataForSEO (AI model answers and Google results), Anthropic (the Claude model) and Microlink (website screenshots). Where a provider processes data outside the EEA, the transfer relies on a European Commission adequacy decision or standard contractual clauses.</li>
                </ul>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Your rights</h3>
                <p>You have the right to:</p>
                <ul style={{ paddingLeft: '1.25rem', lineHeight: 1.7 }}>
                  <li><strong>access</strong> your data and obtain a copy of it,</li>
                  <li><strong>rectification</strong> of inaccurate data and completion of incomplete data,</li>
                  <li><strong>erasure</strong> (the "right to be forgotten"),</li>
                  <li><strong>restriction of processing</strong>,</li>
                  <li><strong>data portability</strong> to another controller,</li>
                  <li><strong>object</strong> to processing based on legitimate interest,</li>
                  <li><strong>withdraw consent</strong> at any time, without affecting the lawfulness of processing carried out before withdrawal. Cookie consent can be withdrawn at any moment using the preferences button in the corner of the page.</li>
                </ul>
                <p>If you believe we process your data unlawfully, you may lodge a complaint with the supervisory authority: <strong>President of the Personal Data Protection Office</strong> (Prezes Urzędu Ochrony Danych Osobowych), ul. Stawki 2, 00-193 Warsaw, Poland.</p>

                <h3 style={{ marginTop: '2rem', marginBottom: '0.75rem', color: 'var(--w-tusz)', fontSize: '1.2rem' }}>Voluntary nature of providing data and profiling</h3>
                <p>Providing your data is voluntary but necessary for us to answer your enquiry or enter into a contract – without it we cannot do so. Your data is not used for automated decision-making producing legal effects concerning you, including profiling within the meaning of Art. 22 GDPR.</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
