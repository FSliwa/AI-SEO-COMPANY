'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { readAttribution } from '@/lib/attribution';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { hash } from '@/lib/anchors';

// Oferta wejsciowa dla ruchu z reklam. Diagnoza z 26-28.09.2026: 58% klikniec
// z PL-Search to zapytania "ile kosztuje pozycjonowanie", ktore laduja na
// cenniku, widza 1 900 zl/mies. i wychodza - 132 klikniecia, 0 zgloszen
// (P(0 | CVR 2%) = 6,9%). Nizszy pierwszy schodek (audyt za stala kwote,
// odliczany od abonamentu) ma zamienic czesc tych wejsc w zgloszenia, ktore
// przy koszcie leada 500 zl same sie splacaja.
//
// PRZELACZNIK: blok renderuje sie tylko, gdy NEXT_PUBLIC_ENTRY_OFFER === 'audyt'
// (zmienna srodowiskowa na Vercelu; domyslnie wylaczony) ORAZ sesja niesie
// identyfikator klikniecia z Google Ads. Ruch organiczny widzi cennik jak dotad.
// Cena jest konfiguracja, nie tresc - wlasciciel ustala ja razem z tekstem
// na /audyt-seo, ktory dzis mowi "wyceniamy indywidualnie".
export const ENTRY_OFFER = process.env.NEXT_PUBLIC_ENTRY_OFFER || '';
export const ENTRY_OFFER_PRICE_PLN = Number(process.env.NEXT_PUBLIC_ENTRY_OFFER_PRICE || 690);

const noopSubscribe = () => () => {};

function hasAdsClick() {
  const a = readAttribution();
  return !!(a && (a.gclid || a.gbraid || a.wbraid));
}

export default function EntryOffer() {
  const lang = useLocale();
  // Odczyt atrybucji dopiero po montazu: w SSR nie ma sesji ani ciasteczka,
  // a rozjazd miedzy serwerem a klientem dalby blad hydratacji.
  const [paid, setPaid] = useState(false);
  useEffect(() => {
    if (ENTRY_OFFER !== 'audyt') return;
    const on = hasAdsClick();
    setPaid(on);
    if (on) track('entry_offer_view', { offer: 'audyt', price: ENTRY_OFFER_PRICE_PLN });
  }, []);

  if (ENTRY_OFFER !== 'audyt' || !paid) return null;

  const price = ENTRY_OFFER_PRICE_PLN.toLocaleString('pl-PL');
  const onClick = () => {
    track('entry_offer_click', { offer: 'audyt', price: ENTRY_OFFER_PRICE_PLN });
    try { window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: 'audyt' })); } catch (e) {}
  };

  return (
    <section className="entry-offer" aria-label={lang === 'pl' ? 'Oferta wejściowa' : 'Entry offer'} style={{ padding: '0 0 2.5rem 0' }}>
      <div className="container" style={{ maxWidth: '850px' }}>
        <div style={{ background: '#0F172A', color: '#FFFFFF', borderRadius: '24px', padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '0.9rem' }}>
          <p style={{ margin: 0, fontSize: '0.8rem', letterSpacing: '0.08em', textTransform: 'uppercase', color: '#94A3B8', fontWeight: 600 }}>
            {lang === 'pl' ? 'Nie musisz zaczynać od abonamentu' : 'You do not have to start with a subscription'}
          </p>
          <h2 style={{ margin: 0, fontSize: 'clamp(1.4rem, 3.4vw, 1.9rem)', lineHeight: 1.2, fontWeight: 700 }}>
            {lang === 'pl'
              ? <>Audyt SEO za <span style={{ color: '#38BDF8' }}>{price} zł netto</span> — kwota odliczana od pierwszej faktury</>
              : <>SEO audit for <span style={{ color: '#38BDF8' }}>PLN {price} net</span> — deducted from your first invoice</>}
          </h2>
          <p style={{ margin: 0, fontSize: '1rem', lineHeight: 1.55, color: '#CBD5E1' }}>
            {lang === 'pl'
              ? 'Raport w 3–5 dni roboczych: co blokuje Twoją stronę, lista napraw według priorytetu i realna prognoza. Bez umowy, bez handlowca. Jeśli potem wejdziesz w pozycjonowanie, audyt masz za darmo.'
              : 'Report in 3–5 business days: what holds your site back, a prioritised fix list and a realistic forecast. No contract, no sales call. If you go on to a subscription, the audit is free.'}
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href={hash('kontakt', lang)} onClick={onClick} className="hero-btn-primary" data-cta="entry_offer_audyt" style={{ minHeight: '44px' }}>
              {lang === 'pl' ? `Zamów audyt za ${price} zł` : `Order the audit for PLN ${price}`}
            </a>
            <a href="tel:+48518815055" className="hero-btn-secondary" data-cta="entry_offer_tel" style={{ minHeight: '44px' }}>
              {lang === 'pl' ? 'Wolisz zadzwonić? 518 815 055' : 'Prefer to call? +48 518 815 055'}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
