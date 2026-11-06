'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';

// Panel klienta na stronie głównej (zadanie 1.1 planu przewagi, 29.10.2026). Zastąpił sekcję
// z pięcioma opiniami bez nazw firm (D3). Zrzuty pochodzą z demo panelu na danych
// przykładowych (Stolarnia Demo), więc można je pokazywać bez zgody żadnego klienta.
const items = {
  pl: [
    { img: '/images/panel/przeglad.webp', title: 'Zapytania i ruch z Google', text: 'Liczba zapytań z formularza, telefonu i e-maila na pierwszym ekranie, cel na miesiąc i wzrost kliknięć z Google Search Console.' },
    { img: '/images/panel/zmiany.webp', title: 'Każda zmiana na stronie opisana', text: 'AI czyta historię zmian w kodzie strony, a zespół sprawdza opis przed publikacją. Widzisz, co zmieniliśmy i po co.' },
    { img: '/images/panel/akceptacje.webp', title: 'Decyzje jednym kliknięciem', text: 'Artykuły, zdjęcia i zmiany czekające na Twoją zgodę są w jednym miejscu, bez wątków mailowych.' },
  ],
  en: [
    { img: '/images/panel/przeglad.webp', title: 'Enquiries and Google traffic', text: 'Form, phone and email enquiries on the first screen, a monthly goal and click growth from Google Search Console.' },
    { img: '/images/panel/zmiany.webp', title: 'Every change to the site explained', text: 'AI reads the history of changes in your site code and the team reviews the summary before publishing it.' },
    { img: '/images/panel/akceptacje.webp', title: 'Decisions in one click', text: 'Articles, photos and changes waiting for your approval sit in one place instead of email threads.' },
  ],
};

// Ikony cech (obrys 1,5 px, kolor akcentu) - kolejnosc jak w `items`.
const IKONY = [
  <svg key="a" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></svg>,
  <svg key="b" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="c" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></svg>,
];

// 6.11.2026 (wyglad z makiety, sekcja "Nic nie dzieje sie za kulisami"): tekst
// i przyciski po lewej, trzy zrzuty panelu jako warstwy w rzucie izometrycznym
// na srodku, opisy po prawej. Tresc bez zmian: te same zrzuty z tymi samymi
// alt, te same tytuly i opisy, te same dwa przyciski - zmienil sie uklad.
export default function PanelShowcase() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  return (
    <section className="panel-showcase cursor-light w-ciemne" id={lang === 'pl' ? 'panel-klienta' : 'client-portal'}>
      <div className="container panel-uklad">
        <Reveal className="section-header">
          <div className="section-tag">
            <span className="asterisk">✳</span> {lang === 'pl' ? 'PANEL KLIENTA' : 'CLIENT PORTAL'}
          </div>
          <h2>{lang === 'pl' ? 'Panel klienta, w którym agencja SEO pokazuje swoją pracę codziennie' : 'A client portal where your SEO company shows its work every day'}</h2>
          <p>
            {lang === 'pl'
              ? 'Raport raz w miesiącu to za mało, żeby ocenić, za co płacisz. W panelu widzisz wzrost zapytań z Google, pozycje fraz, dziennik naszych prac i opis każdej zmiany kodu Twojej strony. Projekt prowadzimy jawnie od pierwszego dnia, a panel jest w cenie każdego pakietu SEO.'
              : 'Most clients of an SEO company only get a monthly report, and that is not enough to judge what you are paying for. In the portal you see enquiry growth from Google, keyword positions, a log of our work and a summary of every change to your site code. The portal is included in every package.'}
          </p>
          <div className="panel-akcje">
            <a href={PANEL_DEMO_URL} className="w-przycisk w-przycisk--glowny" data-cta="home_panel_demo">
              {lang === 'pl' ? 'Otwórz demo bez logowania' : 'Open the demo, no login'}
            </a>
            <Link href="/panel-klienta" className="w-przycisk w-przycisk--obrys" data-cta="home_panel_page">
              {lang === 'pl' ? 'Co jest w panelu klienta' : 'What is in the client portal'}
            </Link>
          </div>
        </Reveal>

        <div className="panel-stos">
          {items[lang].map((it, i) => (
            <figure key={it.img} className={`panel-warstwa panel-warstwa--${i}`}>
              <Image src={it.img} alt={lang === 'pl' ? `Panel klienta: ${it.title.toLowerCase()} (dane przykładowe)` : `Client portal: ${it.title.toLowerCase()} (sample data)`} width={1600} height={1025} sizes="(max-width: 900px) 100vw, 520px" />
            </figure>
          ))}
        </div>

        <RevealStagger className="panel-cechy">
          {items[lang].map((it, i) => (
            <RevealItem key={it.img} className="panel-cecha">
              <span className="panel-cecha-ikona">{IKONY[i]}</span>
              <div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
