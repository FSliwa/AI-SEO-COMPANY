'use client';

import { useLocale } from 'next-intl';
import { Reveal } from './ScrollReveal';

// Warunki współpracy i zasady celu TOP 3 w jednym miejscu (decyzje D2 i plan przewagi
// z 28.10.2026). Kotwice #uczciwa-umowa i #cel-top-3 są linkowane z FAQ cennika,
// pozycjonowania i SEO lokalnego, więc nie zmieniać ich bez poprawienia tych linków.
const fairRules = {
  pl: [
    'Umowa miesięczna w SEO Standard i SEO Premium. Booster Pack z nową stroną: minimum 3 miesiące.',
    'Wypowiedzenie wysyłasz e-mailem. Nie pobieramy opłat aktywacyjnych ani opłat za wyjście.',
    'Treści, które dla Ciebie napiszemy, przechodzą na Ciebie po opłaceniu faktury.',
    'Linki zdobyte w czasie współpracy zostają po jej zakończeniu.',
    'Search Console, Analytics, wizytówka Google, konto reklamowe i domena są na Twoich kontach. My dostajemy tylko dostęp.',
    'Raporty PDF z panelu klienta pobierasz w każdej chwili i zostają u Ciebie.',
  ],
  en: [
    'Monthly contract for SEO Standard and SEO Premium. Booster Pack with a new website: minimum 3 months.',
    'You cancel by email. We charge no activation fees and no exit fees.',
    'Content we write for you becomes yours once the invoice is paid.',
    'Links earned during the engagement stay after it ends.',
    'Search Console, Analytics, your Google Business Profile, ad account and domain stay in your accounts. We only get access.',
    'You can download the PDF reports from the client portal at any time, and they stay with you.',
  ],
};

const top3Rules = {
  pl: [
    'Frazy lokalne uzgadniamy na starcie i wpisujemy do umowy.',
    'Cel: TOP 3 w Google dla tych fraz w 2–3 miesiące od startu prac.',
    'Pozycję mierzymy w Google Search Console (średnia pozycja w tygodniu) i w wynikach Map dla adresu firmy. Postęp widzisz co tydzień w panelu klienta.',
    'Jeśli po 3 miesiącach cel nie jest osiągnięty, kolejny miesiąc pracujemy za 0 zł.',
    'Wyjątki: nowa domena bez historii, ręczna kara Google i zmiany na stronie wprowadzone bez nas.',
    'Nie gwarantujemy pozycji nr 1: o kolejności wyników decyduje Google.',
  ],
  en: [
    'We agree the local keywords at the start and put them in the contract.',
    'Goal: a Google TOP 3 for those keywords within 2–3 months of starting work.',
    'We measure position in Google Search Console (weekly average position) and in Maps results for your business address. You see progress weekly in the client portal.',
    'If we miss the goal after 3 months, the next month is on us.',
    'Exceptions: a new domain with no history, a Google manual action, and changes to the site made without us.',
    'We do not guarantee the #1 position: Google decides the order of results.',
  ],
};

const card = { background: '#FFFFFF', borderRadius: '32px', padding: 'clamp(1.75rem, 5vw, 3rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.03)', scrollMarginTop: '110px' };
const h2 = { fontSize: '1.6rem', fontWeight: 700, marginBottom: '1.25rem', color: 'var(--color-text-dark)' };
const list = { margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.75rem', fontSize: '1.05rem', lineHeight: 1.6, color: '#333336' };

export default function FairDeal() {
  const lang = useLocale() === 'en' ? 'en' : 'pl';
  return (
    <section style={{ padding: '0 0 80px 0' }} aria-label={lang === 'pl' ? 'Warunki współpracy' : 'Terms of cooperation'}>
      <div className="container" style={{ maxWidth: '850px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
        <Reveal>
          <div id="uczciwa-umowa" style={card}>
            <h2 style={h2}>{lang === 'pl' ? 'Uczciwa umowa: sześć zasad' : 'A fair contract: six rules'}</h2>
            <ol style={list}>
              {fairRules[lang].map((r) => <li key={r}>{r}</li>)}
            </ol>
          </div>
        </Reveal>
        <Reveal>
          <div id="cel-top-3" style={card}>
            <h2 style={h2}>{lang === 'pl' ? 'Cel TOP 3: jak go liczymy' : 'The TOP 3 goal: how we measure it'}</h2>
            <ul style={list}>
              {top3Rules[lang].map((r) => <li key={r}>{r}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
