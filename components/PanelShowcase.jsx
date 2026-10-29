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

export default function PanelShowcase() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  return (
    <section className="panel-showcase" id={lang === 'pl' ? 'panel-klienta' : 'client-portal'} style={{ padding: 'clamp(64px, 9vw, 112px) 0' }}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'PANEL KLIENTA' : 'CLIENT PORTAL'}
          </div>
          <h2>{lang === 'pl' ? 'Panel klienta, w którym agencja SEO pokazuje swoją pracę codziennie' : 'A client portal where your SEO company shows its work every day'}</h2>
          <p>
            {lang === 'pl'
              ? 'Raport raz w miesiącu to za mało, żeby ocenić, za co płacisz. W panelu widzisz wzrost zapytań z Google, pozycje fraz, dziennik naszych prac i opis każdej zmiany kodu Twojej strony. Projekt prowadzimy jawnie od pierwszego dnia, a panel jest w cenie każdego pakietu SEO.'
              : 'Most clients of an SEO company only get a monthly report, and that is not enough to judge what you are paying for. In the portal you see enquiry growth from Google, keyword positions, a log of our work and a summary of every change to your site code. The portal is included in every package.'}
          </p>
        </Reveal>

        <RevealStagger className="panel-showcase-grid" style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', marginTop: '2.5rem' }}>
          {items[lang].map((it) => (
            <RevealItem key={it.img} style={{ background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
              <Image src={it.img} alt={lang === 'pl' ? `Panel klienta: ${it.title.toLowerCase()} (dane przykładowe)` : `Client portal: ${it.title.toLowerCase()} (sample data)`} width={1600} height={1025} sizes="(max-width: 700px) 100vw, 380px" style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid rgba(0,0,0,0.06)' }} />
              <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-dark)' }}>{it.title}</h3>
                <p style={{ margin: 0, lineHeight: 1.6, color: '#333336' }}>{it.text}</p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        <Reveal style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'center', marginTop: '2.5rem' }}>
          <a href={PANEL_DEMO_URL} className="btn btn-primary" data-cta="home_panel_demo">
            {lang === 'pl' ? 'Otwórz demo bez logowania' : 'Open the demo, no login'}
          </a>
          <Link href="/panel-klienta" className="btn btn-secondary" data-cta="home_panel_page">
            {lang === 'pl' ? 'Co jest w panelu klienta' : 'What is in the client portal'}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
