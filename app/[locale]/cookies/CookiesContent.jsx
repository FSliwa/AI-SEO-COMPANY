'use client';

import { useTranslations, useLocale } from 'next-intl';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesContent() {
  const lang = useLocale();
  const t = useTranslations('cookiesPage');

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', minHeight: '80vh', background: '#F5F5F7' }}>
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
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
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>1. Czym są pliki cookies?</h2>
                <p>Pliki cookies (tzw. ciasteczka) to dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>2. Cele w jakich stosowane są cookies</h2>
                <p>Cookies używamy w celach analitycznych (Google Analytics), marketingowych (śledzenie konwersji i personalizacja reklam) oraz do zapewnienia prawidłowego funkcjonowania serwisu.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>3. Zarządzanie plikami cookies</h2>
                <p>W wielu przypadkach oprogramowanie służące do przeglądania stron internetowych (przeglądarka internetowa) domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać w każdym czasie zmiany ustawień dotyczących plików cookies w swojej przeglądarce.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>4. Kontakt</h2>
                <p>W razie pytań dotyczących polityki cookies prosimy o <a href="/#kontakt" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>kontakt</a>. Więcej o naszych usługach dowiesz się na stronach: <a href="/pozycjonowanie-stron-internetowych" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>pozycjonowanie stron</a>, <a href="/projektowanie-stron-internetowych" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>projektowanie stron internetowych</a> oraz <a href="/audyt-seo" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>audyt SEO</a>.</p>
              </>
            ) : (
              <>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>1. What are cookies?</h2>
                <p>Cookies are IT data, in particular text files, which are stored on the Website User's end device and are intended for using the Website's pages.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>2. Purposes for which cookies are used</h2>
                <p>We use cookies for analytical purposes (Google Analytics), marketing (conversion tracking and ad personalization), and to ensure the proper functioning of the website.</p>
                <h2 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A', fontSize: '1.5rem' }}>3. Cookie management</h2>
                <p>In many cases, the software used for browsing websites (web browser) allows cookies to be stored on the User's end device by default. Website Users can change their cookie settings at any time in their browser.</p>
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
