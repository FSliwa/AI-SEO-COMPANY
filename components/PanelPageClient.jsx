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
// robi dziś (etapy 1–3 panelu, stan 4.11.2026); nowe moduły dopisywać po wdrożeniu, nie wcześniej.
// Asystenta AI („Zapytaj o dane”) opisać dopiero, gdy działa na produkcji.
const features = {
  pl: [
    { img: '/images/panel/przeglad.webp', title: 'Przegląd: zapytania, cel i ruch', text: 'Zapytania z formularza, telefonu i e-maila, cel na miesiąc z prognozą, kliknięcia i wyświetlenia z Google Search Console oraz komentarz opiekuna: co się stało, dlaczego i co dalej.' },
    { img: '/images/panel/pozycje.webp', title: 'Pozycje fraz z naszymi działaniami na osi', text: 'Historia pozycji każdej frazy tydzień po tygodniu. Na wykresie widać, kiedy opublikowaliśmy treść albo zdobyliśmy link, więc łatwo powiązać przyczynę ze skutkiem.' },
    { img: '/images/panel/dzialania.webp', title: 'Dziennik prac', text: 'Każde działanie z datą, efektem, godzinami i osobą odpowiedzialną. Godziny pakietu sumują się na bieżąco.' },
    { img: '/images/panel/zmiany.webp', title: 'Zmiany na stronie opisane prostym językiem', text: 'AI czyta historię zmian w kodzie Twojej strony i pisze krótkie podsumowanie. Zespół sprawdza je przed publikacją, a Ty widzisz, co zmieniliśmy i po co.' },
    { img: '/images/panel/akceptacje.webp', title: 'Sprawy do akceptacji', text: 'Artykuły, zdjęcia i zmiany, które czekają na Twoją decyzję. Akceptujesz albo prosisz o poprawki jednym kliknięciem, a zespół od razu dostaje informację.' },
    { img: '/images/panel/raporty.webp', title: 'Raporty PDF', text: 'Raporty miesięczne i audyt startowy w jednym miejscu. Pliki leżą w prywatnym magazynie i pobierasz je w każdej chwili.' },
    { img: '/images/panel/ai.webp', title: 'Widoczność w ChatGPT i AI co tydzień', text: 'Co poniedziałek zadajemy ChatGPT, Perplexity, Gemini i przeglądom AI w Google pytania Twoich klientów. Widzisz, w ilu odpowiedziach pada Twoja firma, kogo modele polecają zamiast Ciebie i z jakich stron korzystają. W SEO Premium albo za 490 zł netto miesięcznie do SEO Standard.' },
    { img: '/images/panel/mapy.webp', title: 'Mapy Google z 49 punktów', text: 'Klient widzi inne wyniki w Mapach zależnie od tego, gdzie stoi. Sprawdzamy pozycję Twojej wizytówki w siatce 7×7 wokół adresu firmy co 14 dni.' },
    { img: '/images/panel/linki.webp', title: 'Lista zdobytych linków', text: 'Każdy link z adresem strony, datą i rodzajem. Co tydzień automat sprawdza, czy link nadal jest na stronie. Lista zostaje u Ciebie także po zakończeniu współpracy.' },
    { img: '/images/panel/wiadomosci.webp', title: 'Wiadomości do opiekuna i alerty', text: 'Każda sprawa ma swój wątek, a czas odpowiedzi zespołu widzisz w panelu. Alerty pokazują spadek kliknięć o 30%, spadek ważnej frazy i 14 dni bez nowego wpisu w dzienniku prac.' },
    { img: '/images/panel/faktury.webp', title: 'Faktury, pakiet i wypowiedzenie', text: 'Faktury z terminem i statusem płatności do pobrania w PDF. Zmianę pakietu albo wypowiedzenie składasz w panelu i od razu dostajesz potwierdzenie e-mailem.' },
    { img: '/images/panel/dane.webp', title: 'Twoje dane do pobrania i dla Twojego AI', text: 'Wszystko z panelu pobierzesz w CSV albo JSON. Token tylko do odczytu podłącza dane do arkusza, własnego skryptu albo do Claude przez MCP. Token widzi wyłącznie dane Twojej firmy.' },
  ],
  en: [
    { img: '/images/panel/przeglad.webp', title: 'Overview: enquiries, goal and traffic', text: 'Form, phone and email enquiries, a monthly goal with a forecast, clicks and impressions from Google Search Console, and a note from your account manager: what happened, why, and what comes next.' },
    { img: '/images/panel/pozycje.webp', title: 'Keyword positions with our work on the timeline', text: 'Every keyword position week by week. The chart marks when we published content or earned a link, so cause and effect are easy to connect.' },
    { img: '/images/panel/dzialania.webp', title: 'Work log', text: 'Every task with its date, result, hours and the person responsible. Package hours add up as we go.' },
    { img: '/images/panel/zmiany.webp', title: 'Site changes in plain language', text: 'AI reads the history of changes in your site code and writes a short summary. The team reviews it before publishing, so you see what changed and why.' },
    { img: '/images/panel/akceptacje.webp', title: 'Items to approve', text: 'Articles, photos and changes waiting for your decision. Approve or request changes in one click, and the team is notified straight away.' },
    { img: '/images/panel/raporty.webp', title: 'PDF reports', text: 'Monthly reports and the starting audit in one place, stored privately and available to download at any time.' },
    { img: '/images/panel/ai.webp', title: 'Weekly visibility in ChatGPT and AI', text: 'Every Monday we ask ChatGPT, Perplexity, Gemini and Google AI overviews the questions your customers ask. You see how many answers mention your company, who the models recommend instead and which sites they use. Included in SEO Premium or added to SEO Standard.' },
    { img: '/images/panel/mapy.webp', title: 'Google Maps from 49 points', text: 'People see different Maps results depending on where they stand. We check your Business Profile position on a 7×7 grid around your address every 14 days.' },
    { img: '/images/panel/linki.webp', title: 'Every link we earn', text: 'Each link with the linking page, date and type. A weekly check confirms the link is still live. The list stays with you after we stop working together.' },
    { img: '/images/panel/wiadomosci.webp', title: 'Messages and alerts', text: 'Every request has its own thread, and the team response time is shown in the portal. Alerts flag a 30% drop in clicks, a drop in a key phrase and 14 days without a new work log entry.' },
    { img: '/images/panel/faktury.webp', title: 'Invoices, plan and cancellation', text: 'Invoices with due dates and payment status, ready to download as PDF. You change your plan or cancel in the portal and get an email confirmation straight away.' },
    { img: '/images/panel/dane.webp', title: 'Your data, ready for your own AI', text: 'Download everything in the portal as CSV or JSON. A read-only token connects the data to a spreadsheet, your own script or Claude through MCP. The token sees only your company data.' },
  ],
};

// Porównanie z typowymi formami raportowania na rynku, bez nazw agencji (stan 4.11.2026).
const compare = {
  head: {
    pl: ['Co widzisz', 'Raport PDF raz w miesiącu', 'Typowy panel z pozycjami', 'Panel AI SEO COMPANY'],
    en: ['What you see', 'Monthly PDF report', 'Typical rankings portal', 'AI SEO COMPANY portal'],
  },
  rows: [
    { pl: 'Zapytania od klientów i koszt jednego zapytania', en: 'Customer enquiries and cost per enquiry', pdf: ['raz w miesiącu', 'monthly'], typ: ['rzadko', 'rarely'] },
    { pl: 'Pozycje fraz tydzień po tygodniu z naszymi działaniami na osi', en: 'Weekly keyword positions with our work on the timeline', pdf: ['raz w miesiącu', 'monthly'], typ: ['pozycje bez działań', 'positions only'] },
    { pl: 'Dziennik prac z godzinami i opis zmian na stronie z historii kodu', en: 'Work log with hours and site changes from the code history', pdf: ['skrót', 'summary'], typ: ['rzadko', 'rarely'] },
    { pl: 'Akceptacje treści jednym kliknięciem', en: 'One-click content approvals', pdf: ['nie', 'no'], typ: ['rzadko', 'rarely'] },
    { pl: 'Widoczność w ChatGPT, Gemini i przeglądach AI co tydzień', en: 'Weekly visibility in ChatGPT, Gemini and AI overviews', pdf: ['nie', 'no'], typ: ['nie', 'no'] },
    { pl: 'Pozycje w Mapach Google z 49 punktów', en: 'Google Maps positions from 49 points', pdf: ['nie', 'no'], typ: ['nie', 'no'] },
    { pl: 'Lista linków sprawdzana co tydzień', en: 'Link list checked every week', pdf: ['lista bez sprawdzania', 'list, unchecked'], typ: ['rzadko', 'rarely'] },
    { pl: 'Alerty o spadkach i przerwach w pracy', en: 'Alerts on drops and work gaps', pdf: ['nie', 'no'], typ: ['rzadko', 'rarely'] },
    { pl: 'Wiadomości z widocznym czasem odpowiedzi, faktury i wypowiedzenie', en: 'Messages with visible response time, invoices and cancellation', pdf: ['nie', 'no'], typ: ['część', 'some'] },
    { pl: 'Eksport CSV i JSON, API i MCP', en: 'CSV and JSON export, API and MCP', pdf: ['nie', 'no'], typ: ['nie', 'no'] },
    { pl: 'Demo bez logowania przed podpisaniem umowy', en: 'Demo without login before you sign', pdf: ['nie', 'no'], typ: ['nie', 'no'] },
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
    answer: 'Raporty PDF pobierasz w każdej chwili, także przed odejściem. Wszystkie dane z panelu (pozycje, zapytania, dziennik prac, linki, widoczność w AI) eksportujesz do CSV albo JSON jednym kliknięciem. Search Console, Analytics i wizytówka Google są na Twoich kontach, więc historia danych zostaje u Ciebie. Szczegóły w zasadach uczciwej umowy poniżej.',
    answerEn: 'You can download the PDF reports at any time, including before you leave. Everything in the portal (positions, enquiries, work log, links, AI visibility) exports to CSV or JSON in one click. Search Console, Analytics and your Google Business Profile are in your accounts, so the data history stays with you. See the fair contract rules below.'
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

      <section style={{ padding: '0 0 80px' }} aria-labelledby="porownanie">
        <div className="container" style={{ maxWidth: '1060px' }}>
          <Reveal className="section-header">
            <h2 id="porownanie">{lang === 'pl' ? 'Czego nie pokaże raport PDF' : 'What a PDF report will not show you'}</h2>
            <p style={{ color: 'var(--color-text-muted)', maxWidth: '720px', margin: '0.75rem 0 0', lineHeight: 1.65 }}>
              {lang === 'pl'
                ? 'Porównanie z formami raportowania, które spotkasz u agencji SEO. Kolumna środkowa to panel, który pokazuje głównie pozycje fraz.'
                : 'A comparison with the reporting you will find at SEO agencies. The middle column is a portal that mainly shows keyword positions.'}
            </p>
          </Reveal>
          <Reveal style={{ marginTop: '2rem', overflowX: 'auto', background: '#FFFFFF', borderRadius: '24px', boxShadow: '0 10px 40px rgba(0,0,0,0.04)' }}>
            <table style={{ width: '100%', minWidth: '640px', borderCollapse: 'collapse', fontSize: '0.98rem', lineHeight: 1.45 }}>
              <thead>
                <tr>
                  {compare.head[lang].map((h, i) => (
                    <th key={h} scope="col" style={{ textAlign: 'left', padding: '1rem 1.1rem', borderBottom: '1px solid rgba(15,23,42,0.1)', color: i === 3 ? 'var(--color-primary)' : 'var(--color-text-dark)', fontWeight: 700 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compare.rows.map((r) => (
                  <tr key={r.pl}>
                    <th scope="row" style={{ textAlign: 'left', padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(15,23,42,0.06)', fontWeight: 600, color: 'var(--color-text-dark)' }}>{r[lang]}</th>
                    <td style={{ padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(15,23,42,0.06)', color: '#5B6576' }}>{r.pdf[lang === 'pl' ? 0 : 1]}</td>
                    <td style={{ padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(15,23,42,0.06)', color: '#5B6576' }}>{r.typ[lang === 'pl' ? 0 : 1]}</td>
                    <td style={{ padding: '0.85rem 1.1rem', borderBottom: '1px solid rgba(15,23,42,0.06)', color: '#047857', fontWeight: 700 }}>{lang === 'pl' ? 'tak' : 'yes'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Reveal>
          <Reveal style={{ display: 'flex', justifyContent: 'center', marginTop: '1.75rem' }}>
            <a href={PANEL_DEMO_URL} className="btn btn-primary" data-cta="panel_page_compare_demo">{lang === 'pl' ? 'Sprawdź to w demo' : 'Check it in the demo'}</a>
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
