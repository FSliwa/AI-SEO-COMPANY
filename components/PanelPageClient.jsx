'use client';

import Image from 'next/image';
import { useLocale } from 'next-intl';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import FairDeal from '@/components/FairDeal';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal, RevealStagger, RevealItem } from '@/components/ScrollReveal';
import { hash } from '@/lib/anchors';
import { PANEL_DEMO_URL } from '@/lib/panel';

// Podstrona panelu klienta (zadanie 1.1 planu przewagi). Opisuje tylko to, co panel
// robi dziś (etap 1 panelu); nowe moduły dopisywać po wdrożeniu, nie wcześniej.
const features = {
  pl: [
    { img: '/images/panel/przeglad.webp', title: 'Przegląd: zapytania, cel i ruch', text: 'Zapytania z formularza, telefonu i e-maila, cel na miesiąc z prognozą, kliknięcia i wyświetlenia z Google Search Console oraz komentarz opiekuna: co się stało, dlaczego i co dalej.' },
    { img: '/images/panel/pozycje.webp', title: 'Pozycje fraz z naszymi działaniami na osi', text: 'Historia pozycji każdej frazy tydzień po tygodniu. Na wykresie widać, kiedy opublikowaliśmy treść albo zdobyliśmy link, więc łatwo powiązać przyczynę ze skutkiem.' },
    { img: '/images/panel/dzialania.webp', title: 'Dziennik prac', text: 'Każde działanie z datą, efektem, godzinami i osobą odpowiedzialną. Godziny pakietu sumują się na bieżąco.' },
    { img: '/images/panel/zmiany.webp', title: 'Zmiany na stronie opisane prostym językiem', text: 'AI czyta historię zmian w kodzie Twojej strony i pisze krótkie podsumowanie. Zespół sprawdza je przed publikacją, a Ty widzisz, co zmieniliśmy i po co.' },
    { img: '/images/panel/akceptacje.webp', title: 'Sprawy do akceptacji', text: 'Artykuły, zdjęcia i zmiany, które czekają na Twoją decyzję. Akceptujesz albo prosisz o poprawki jednym kliknięciem, a zespół od razu dostaje informację.' },
    { img: '/images/panel/raporty.webp', title: 'Raporty PDF', text: 'Raporty miesięczne i audyt startowy w jednym miejscu. Pliki leżą w prywatnym magazynie i pobierasz je w każdej chwili.' },
  ],
  en: [
    { img: '/images/panel/przeglad.webp', title: 'Overview: enquiries, goal and traffic', text: 'Form, phone and email enquiries, a monthly goal with a forecast, clicks and impressions from Google Search Console, and a note from your account manager: what happened, why, and what comes next.' },
    { img: '/images/panel/pozycje.webp', title: 'Keyword positions with our work on the timeline', text: 'Every keyword position week by week. The chart marks when we published content or earned a link, so cause and effect are easy to connect.' },
    { img: '/images/panel/dzialania.webp', title: 'Work log', text: 'Every task with its date, result, hours and the person responsible. Package hours add up as we go.' },
    { img: '/images/panel/zmiany.webp', title: 'Site changes in plain language', text: 'AI reads the history of changes in your site code and writes a short summary. The team reviews it before publishing, so you see what changed and why.' },
    { img: '/images/panel/akceptacje.webp', title: 'Items to approve', text: 'Articles, photos and changes waiting for your decision. Approve or request changes in one click, and the team is notified straight away.' },
    { img: '/images/panel/raporty.webp', title: 'PDF reports', text: 'Monthly reports and the starting audit in one place, stored privately and available to download at any time.' },
  ],
};

const faq = [
  {
    question: 'Czy panel klienta jest w cenie?',
    questionEn: 'Is the client portal included in the price?',
    answer: 'Tak. Panel dostaje każdy klient pakietów SEO Standard, SEO Premium i Booster Pack, bez dopłat i od pierwszego dnia współpracy.',
    answerEn: 'Yes. Every SEO Standard, SEO Premium and Booster Pack client gets the portal from day one, at no extra cost.'
  },
  {
    question: 'Skąd panel bierze dane?',
    questionEn: 'Where does the portal get its data?',
    answer: 'Kliknięcia, wyświetlenia i pozycje pochodzą z Google Search Console, zapytania z Google Analytics 4 (zdarzenia formularza, kliknięcia w telefon i e-mail z ruchu z Google), a opisy zmian z historii kodu Twojej strony na GitHubie. Panel synchronizuje dane co noc; Search Console pokazuje wyniki z 2–3-dniowym opóźnieniem.',
    answerEn: 'Clicks, impressions and positions come from Google Search Console, enquiries from Google Analytics 4 (form, phone and email events from Google traffic), and change summaries from your site code history on GitHub. The portal syncs every night; Search Console reports with a 2–3 day delay.'
  },
  {
    question: 'Kto widzi moje dane?',
    questionEn: 'Who can see my data?',
    answer: 'Tylko osoby z Twojej firmy, które dodamy do panelu, i nasz zespół. Każda firma widzi wyłącznie swoje dane: rozdzielenie pilnuje sama baza danych, a nie tylko interfejs. Dane i pliki są przechowywane w Unii Europejskiej (Frankfurt). Logujesz się kontem Google albo e-mailem i hasłem.',
    answerEn: 'Only the people from your company we add to the portal, and our team. Each company sees only its own data: the database itself enforces the separation, not just the interface. Data and files are stored in the European Union (Frankfurt). You sign in with a Google account or with email and password.'
  },
  {
    question: 'Co z danymi po zakończeniu współpracy?',
    questionEn: 'What happens to the data when we stop working together?',
    answer: 'Raporty PDF pobierasz w każdej chwili, także przed odejściem. Search Console, Analytics i wizytówka Google są na Twoich kontach, więc historia danych zostaje u Ciebie. Szczegóły w zasadach uczciwej umowy poniżej.',
    answerEn: 'You can download the PDF reports at any time, including before you leave. Search Console, Analytics and your Google Business Profile are in your accounts, so the data history stays with you. See the fair contract rules below.'
  },
];

export default function PanelPageClient() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Panel klienta" en="Client Portal" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Reveal className="section-header" style={{ margin: '0 auto', maxWidth: '860px' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'Panel klienta 24/7' : '24/7 client portal'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1.25rem', color: 'var(--color-text-dark)' }}>
              {lang === 'pl' ? 'Panel klienta: widzisz naszą pracę codziennie' : 'Client portal: see our work every day'}
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.2rem', color: 'var(--color-text-muted)', maxWidth: '720px', margin: '0 auto 2rem', lineHeight: 1.65 }}>
              {lang === 'pl'
                ? 'Dane z Google, zapytania od klientów, dziennik naszych prac i opis każdej zmiany na stronie w jednym miejscu. Panel dostaje każdy klient AI SEO COMPANY, bez dopłat. Demo działa bez logowania, na danych przykładowych.'
                : 'Google data, customer enquiries, a log of our work and a summary of every change to your site in one place. Every AI SEO COMPANY client gets the portal at no extra cost. The demo runs without login on sample data.'}
            </p>
            <div className="hero-cta-row" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={PANEL_DEMO_URL} className="hero-btn-primary" data-cta="panel_page_demo">
                {lang === 'pl' ? 'Otwórz demo bez logowania' : 'Open the demo, no login'}
              </a>
              <a href={hash('kontakt', lang)} className="hero-btn-secondary" data-cta="panel_page_quote">
                {lang === 'pl' ? 'Wyceń projekt' : 'Get a quote'}
              </a>
            </div>
          </Reveal>
          <Reveal style={{ marginTop: '3rem' }}>
            <Image src="/images/panel/przeglad.webp" alt={lang === 'pl' ? 'Przegląd w panelu klienta na danych przykładowych' : 'Client portal overview with sample data'} width={1600} height={1025} priority sizes="(max-width: 1100px) 100vw, 1060px" style={{ width: '100%', maxWidth: '1060px', height: 'auto', borderRadius: '20px', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)' }} />
          </Reveal>
        </div>
      </section>

      <section style={{ padding: '40px 0 80px' }}>
        <div className="container">
          <Reveal className="section-header">
            <h2>{lang === 'pl' ? 'Co jest w panelu klienta' : 'What is in the client portal'}</h2>
          </Reveal>
          <RevealStagger style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', marginTop: '2rem' }}>
            {features[lang].map((f) => (
              <RevealItem key={f.img} style={{ background: '#FFFFFF', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
                <Image src={f.img} alt={lang === 'pl' ? `${f.title} (dane przykładowe)` : `${f.title} (sample data)`} width={1600} height={1025} sizes="(max-width: 760px) 100vw, 400px" style={{ width: '100%', height: 'auto', display: 'block', borderBottom: '1px solid rgba(0,0,0,0.06)' }} />
                <div style={{ padding: '1.25rem 1.5rem 1.5rem' }}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.5rem', color: 'var(--color-text-dark)' }}>{f.title}</h3>
                  <p style={{ margin: 0, lineHeight: 1.6, color: '#333336' }}>{f.text}</p>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          <Reveal style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', alignItems: 'center', marginTop: '3rem', background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)' }}>
            <div>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem', color: 'var(--color-text-dark)' }}>{lang === 'pl' ? 'Na telefonie też' : 'On your phone too'}</h2>
              <p style={{ margin: 0, lineHeight: 1.65, color: '#333336', fontSize: '1.05rem' }}>
                {lang === 'pl'
                  ? 'Panel działa w przeglądarce telefonu bez instalowania aplikacji. Zapytania z ostatnich dni i sprawy do akceptacji sprawdzisz w dwie minuty.'
                  : 'The portal works in your phone browser without installing an app. You can check recent enquiries and pending approvals in two minutes.'}
              </p>
            </div>
            <Image src="/images/panel/przeglad-telefon.webp" alt={lang === 'pl' ? 'Panel klienta na telefonie (dane przykładowe)' : 'Client portal on a phone (sample data)'} width={780} height={1688} sizes="(max-width: 760px) 70vw, 300px" style={{ width: '100%', maxWidth: '300px', height: 'auto', justifySelf: 'center', borderRadius: '28px', boxShadow: '0 20px 50px rgba(15, 23, 42, 0.16)' }} />
          </Reveal>
        </div>
      </section>

      <FairDeal />

      <AppleFaq faqData={faq} title={lang === 'pl' ? 'Pytania o panel klienta' : 'Questions about the client portal'} />

      <Contact />
      <Footer />
    </main>
  );
}
