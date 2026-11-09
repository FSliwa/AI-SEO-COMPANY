'use client';

// Formularz „wyślij PDF na e-mail” (lead magnet), wydzielony 1:1 z components/AgencySwitchClient.jsx
// (zadanie 3.2, checklista zmiany agencji). Z domyślnymi propsami wysyła identyczne body
// i zdarzenie jak oryginał. PDF wysyła panel (panel.ai-seo-company.pl/api/checklista),
// zespół dostaje powiadomienie o leadzie. Honeypot `nick` i zgoda RODO jak w oryginale.
//
// Propsy (wszystkie opcjonalne):
//   plan       - parametr `plan` w generate_lead (np. 'checklista_32_punkty' na P1)
//   endpoint   - adres API (domyślnie panel /api/checklista)
//   plik       - identyfikator pliku dla panelu (np. 'wzor-umowy'); bez niego body jak dziś
//   etykieta   - etykieta pola e-mail
//   przycisk   - tekst przycisku
//   idPrefiks  - prefiks id pola (dwa formularze na stronie = różne prefiksy)
//   kategoria  - event_category w generate_lead
//   komunikatOk- tekst po wysłaniu
//   przedmiot  - co wysyłamy, w tekście zgody RODO (domyślnie 'checklistę'; S1: 'wzór raportu SEO')
//   cta        - data-cta przycisku (domyślnie 'checklist_submit'; S1: 'wzor_raportu_submit')
// Podmianę lokalnej funkcji w AgencySwitchClient.jsx na ten import robi grupa eeat (ZA1).

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';

const API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/checklista`;
const field = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };
const OK = 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do PDF przyjdzie w ciągu minuty.';

// EN: domyślne teksty, gdy wywołujący nie poda własnych propsów (PorownanieLayout i SzablonRaport
// mogą przekazać już przetłumaczone). W PL wszystko zostaje jak było.
const EN = {
  etykieta: 'Email address to send the checklist to',
  przycisk: 'Send the PDF checklist',
  komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the PDF will arrive within a minute.',
  przedmiot: 'the checklist',
  placeholder: 'you@company.com',
  loading: 'Sending…',
  blad: 'Sending failed. Please try again in a moment.',
  brakPolaczenia: 'No connection. Check your internet and try again.',
  zgoda: (przedmiot) => `I agree to AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warsaw, Poland) processing my email address to send ${przedmiot} and to answer my questions. You will not be added to a mailing list. Details in the `,
  polityka: 'privacy policy',
};

export default function ChecklistForm({
  plan = 'checklista_zmiana_agencji',
  endpoint = API,
  plik,
  etykieta: etykietaProp,
  przycisk: przyciskProp,
  idPrefiks = 'cl',
  kategoria = 'Checklist',
  komunikatOk: komunikatOkProp,
  // Integracja 5.11.2026 (grupa narzędzia, S1): cel przetwarzania w zgodzie musi opisywać to,
  // co faktycznie wysyłamy. Domyślne wartości = dotychczasowy HTML bajt w bajt.
  przedmiot: przedmiotProp,
  cta = 'checklist_submit',
}) {
  const en = useLocale() === 'en';
  const etykieta = etykietaProp ?? (en ? EN.etykieta : 'E-mail, na który wyślemy checklistę');
  const przycisk = przyciskProp ?? (en ? EN.przycisk : 'Wyślij checklistę PDF');
  const komunikatOk = komunikatOkProp ?? (en ? EN.komunikatOk : OK);
  const przedmiot = przedmiotProp ?? (en ? EN.przedmiot : 'checklistę');
  const [state, setState] = useState({ status: 'idle', error: null });
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ status: 'loading', error: null });
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: String(fd.get('email') || ''), consent: fd.get('consent') === 'on', nick: String(fd.get('nick') || ''), ...(plik ? { plik } : {}), ...(en ? { lang: 'en' } : {}) }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return setState({ status: 'error', error: data.error || (en ? EN.blad : 'Nie udało się wysłać. Spróbuj za chwilę.') });
      track('generate_lead', { event_category: kategoria, plan, currency: 'PLN', value: 100 });
      setState({ status: 'done', error: null });
    } catch {
      setState({ status: 'error', error: en ? EN.brakPolaczenia : 'Brak połączenia. Sprawdź internet i spróbuj ponownie.' });
    }
  }
  if (state.status === 'done')
    return <p role="status" style={{ margin: 0, fontWeight: 600, color: '#047857' }}>{komunikatOk}</p>;
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
      <label htmlFor={`${idPrefiks}-email`} style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>{etykieta}</label>
      <input id={`${idPrefiks}-email`} name="email" type="email" required maxLength={200} placeholder={en ? EN.placeholder : 'ty@firma.pl'} style={field} />
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
        <input type="checkbox" name="consent" required style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
        <span>
          {en ? EN.zgoda(przedmiot) : `Zgadzam się na przetwarzanie adresu e-mail przez AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa), żeby wysłać ${przedmiot} i odpowiedzieć na moje pytania. Nie zapisujemy Cię na listę mailingową. Szczegóły w `}<Link href="/cookies" style={{ textDecoration: 'underline' }}>{en ? EN.polityka : 'polityce prywatności'}</Link>.
        </span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta={cta}>
          {state.status === 'loading' ? (en ? EN.loading : 'Wysyłam…') : przycisk}
        </button>
        {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
      </div>
    </form>
  );
}
