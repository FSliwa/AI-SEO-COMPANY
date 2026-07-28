'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CookiesContent() {
  const { lang } = useLanguage();
  const t = translations[lang].cookiesPage;

  return (
    <>
      <Header />
      <main style={{ paddingTop: '120px', minHeight: '80vh', background: '#F5F5F7' }}>
        <div className="container" style={{ maxWidth: '800px', padding: '4rem 1.5rem' }}>
          <h1 style={{ fontSize: '3rem', color: '#0F172A', marginBottom: '2rem', letterSpacing: '-0.03em' }}>
            {t.title}
          </h1>
          <div style={{ color: '#334155', fontSize: '1.1rem', lineHeight: 1.8 }}>
            <p>{t.content}</p>
            {lang === 'pl' ? (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>1. Czym są pliki cookies?</h3>
                <p>Pliki cookies (tzw. ciasteczka) to dane informatyczne, w szczególności pliki tekstowe, które przechowywane są w urządzeniu końcowym Użytkownika Serwisu i przeznaczone są do korzystania ze stron internetowych Serwisu.</p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>2. Cele w jakich stosowane są cookies</h3>
                <p>Cookies używamy w celach analitycznych (Google Analytics), marketingowych (śledzenie konwersji i personalizacja reklam) oraz do zapewnienia prawidłowego funkcjonowania serwisu.</p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>3. Zarządzanie plikami cookies</h3>
                <p>W wielu przypadkach oprogramowanie służące do przeglądania stron internetowych (przeglądarka internetowa) domyślnie dopuszcza przechowywanie plików cookies w urządzeniu końcowym Użytkownika. Użytkownicy Serwisu mogą dokonać w każdym czasie zmiany ustawień dotyczących plików cookies w swojej przeglądarce.</p>
              </>
            ) : (
              <>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>1. What are cookies?</h3>
                <p>Cookies are IT data, in particular text files, which are stored on the Website User's end device and are intended for using the Website's pages.</p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>2. Purposes for which cookies are used</h3>
                <p>We use cookies for analytical purposes (Google Analytics), marketing (conversion tracking and ad personalization), and to ensure the proper functioning of the website.</p>
                <h3 style={{ marginTop: '2rem', marginBottom: '1rem', color: '#0F172A' }}>3. Cookie management</h3>
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
