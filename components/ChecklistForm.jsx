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
import { SIEDZIBA } from '@/lib/firma';

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
  zgoda: (przedmiot) => `I agree to AI SIGNALS COMPANY P.S.A. (${SIEDZIBA.ulica}, Warsaw, Poland) processing my email address to send ${przedmiot} and to answer my questions. You will not be added to a mailing list. Details in the `,
  polityka: 'privacy policy',
};

const PLIKI_PDF = {
  'wzor-raportu-seo': { pl: '/pliki/wzor-raportu-seo.pdf', en: '/pliki/seo-report-template.pdf' },
  'raport-seo': { pl: '/pliki/wzor-raportu-seo.pdf', en: '/pliki/seo-report-template.pdf' },
  'content-plan': { pl: '/pliki/content-plan-szablon.pdf', en: '/pliki/content-calendar-template.pdf' },
  'analiza-konkurencji': { pl: '/pliki/szablon-analizy-konkurencji-seo.pdf', en: '/pliki/competitor-analysis-template.pdf' },
  'checklista-seo': { pl: '/pliki/checklista-seo.pdf', en: '/pliki/seo-checklist.pdf' },
  'brief-strony': { pl: '/pliki/brief-strony-internetowej.pdf', en: '/pliki/website-brief-template.pdf' },
  'strategia-seo': { pl: '/pliki/szablon-strategii-seo.pdf', en: '/pliki/seo-strategy-template.pdf' },
  'migracja-strony': { pl: '/pliki/checklista-migracji-strony.pdf', en: '/pliki/website-migration-checklist.pdf' },
  'dobor-slow-kluczowych': { pl: '/pliki/szablon-doboru-slow-kluczowych.pdf', en: '/pliki/keyword-research-template.pdf' },
  'brief-copywritera': { pl: '/pliki/brief-dla-copywritera.pdf', en: '/pliki/content-brief-template.pdf' },
  'audyt-tresci': { pl: '/pliki/szablon-audytu-tresci.pdf', en: '/pliki/content-audit-template.pdf' },
  'linkowanie-wewnetrzne': { pl: '/pliki/plan-linkowania-wewnetrznego.pdf', en: '/pliki/internal-linking-template.pdf' },
  'checklista-eeat': { pl: '/pliki/checklista-e-e-a-t.pdf', en: '/pliki/e-e-a-t-checklist.pdf' },
  'dane-strukturalne': { pl: '/pliki/wzory-danych-strukturalnych.pdf', en: '/pliki/schema-markup-examples.pdf' },
  'wizytowka-google': { pl: '/pliki/checklista-wizytowki-google.pdf', en: '/pliki/local-seo-checklist.pdf' },
  'zapytanie-ofertowe-seo': { pl: '/pliki/zapytanie-ofertowe-seo-wzor.pdf', en: '/pliki/seo-rfp-template.pdf' },
  'wzor-umowy': { pl: '/pliki/wzor-umowy-pozycjonowanie.pdf', en: '/pliki/seo-contract-checklist.pdf' },
  'umowa-na-pozycjonowanie': { pl: '/pliki/wzor-umowy-pozycjonowanie.pdf', en: '/pliki/seo-contract-checklist.pdf' },
};

export default function ChecklistForm({
  plan = 'checklista_zmiana_agencji',
  endpoint = API,
  plik,
  plikPdf,
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
  const bezposredniPdf = plikPdf ?? (plik && PLIKI_PDF[plik] ? PLIKI_PDF[plik][en ? 'en' : 'pl'] : null);
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
      if (!res.ok || !data.ok) {
        if (bezposredniPdf && res.status >= 500) {
          return setState({ status: 'direct', error: null });
        }
        return setState({ status: 'error', error: data.error || (en ? EN.blad : 'Nie udało się wysłać. Spróbuj za chwilę.') });
      }
      track('generate_lead', { lead_source: 'template', event_category: kategoria, plan, currency: en ? 'EUR' : 'PLN', value: en ? 25 : 100 });
      setState({ status: 'done', error: null });
    } catch {
      if (bezposredniPdf) return setState({ status: 'direct', error: null });
      setState({ status: 'error', error: en ? EN.brakPolaczenia : 'Brak połączenia. Sprawdź internet i spróbuj ponownie.' });
    }
  }
  if (state.status === 'done')
    return <p role="status" style={{ margin: 0, fontWeight: 600, color: '#047857' }}>{komunikatOk}</p>;
  if (state.status === 'direct' && bezposredniPdf) {
    return (
      <div role="status" style={{ display: 'grid', gap: '0.75rem' }}>
        <p style={{ margin: 0, fontWeight: 600, color: '#047857' }}>
          {en ? 'Your PDF template is ready for direct download:' : 'Twój szablon PDF jest gotowy do bezpośredniego pobrania:'}
        </p>
        <div>
          <a href={bezposredniPdf} download className="btn btn-primary" data-cta={`${cta}_pdf`}>
            {en ? 'Download PDF now' : 'Pobierz PDF teraz'}
          </a>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
      <label htmlFor={`${idPrefiks}-email`} style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>{etykieta}</label>
      <input id={`${idPrefiks}-email`} name="email" type="email" required maxLength={200} placeholder={en ? EN.placeholder : 'ty@firma.pl'} style={field} />
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
        <input type="checkbox" name="consent" required style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
        <span>
          {en ? EN.zgoda(przedmiot) : `Zgadzam się na przetwarzanie adresu e-mail przez AI SIGNALS COMPANY P.S.A. (${SIEDZIBA.ulica}, Warszawa), żeby wysłać ${przedmiot} i odpowiedzieć na moje pytania. Nie zapisujemy Cię na listę mailingową. Szczegóły w `}<Link href="/cookies" style={{ textDecoration: 'underline' }}>{en ? EN.polityka : 'polityce prywatności'}</Link>.
        </span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta={cta}>
          {state.status === 'loading' ? (en ? EN.loading : 'Wysyłam…') : przycisk}
        </button>
        {bezposredniPdf && (
          <a
            href={bezposredniPdf}
            download
            onClick={() => track('file_download', { file_name: bezposredniPdf, event_category: kategoria })}
            style={{ fontSize: '0.92rem', fontWeight: 600, color: 'var(--color-text-dark)', textDecoration: 'underline' }}
            data-cta={`${cta}_direkt`}
          >
            {en ? 'Or download PDF directly' : 'Lub pobierz PDF bezpośrednio'}
          </a>
        )}
        {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
      </div>
    </form>
  );
}
