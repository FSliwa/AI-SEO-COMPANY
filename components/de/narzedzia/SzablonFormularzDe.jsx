'use client';

// Formularz „PDF per E-Mail” szablonów DE (18.11.2026, de-narzedzia): odpowiednik components/ChecklistForm.jsx
// (które przełącza teksty tylko PL/EN). Wysyła do panelu /api/szablony { email, consent, nick, plik, lang: 'de' };
// panel (grupa de-panel) odsyła PDF z public/pliki/de/ (lib/szablony.ts: wpis `de`). Bez zapisu do newslettera
// (zgoda DE na newsletter = tekst prawnika). Tekst zgody DE: szkic do sprawdzenia przez prawnika razem z Datenschutz.

import { WALID_DE } from '@/lib/walidacjaDe';
import { useState } from 'react';
import { Link } from '@/i18n/routing';
import { track } from '@/lib/track';

const field = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: 'var(--w-tusz)' };

export default function SzablonFormularzDe({ endpoint, plik, plan, idPrefiks, etykieta, przycisk, komunikatOk, przedmiot, cta, kategoria = 'Template' }) {
  const [state, setState] = useState({ status: 'idle', error: null });
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ status: 'loading', error: null });
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: String(fd.get('email') || ''), consent: fd.get('consent') === 'on', nick: String(fd.get('nick') || ''), plik, lang: 'de' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return setState({ status: 'error', error: data.error || 'Das Senden hat nicht geklappt. Bitte versuchen Sie es gleich noch einmal.' });
      track('generate_lead', { event_category: kategoria, plan, currency: 'PLN', value: 100 });
      setState({ status: 'done', error: null });
    } catch {
      setState({ status: 'error', error: 'Keine Verbindung. Bitte prüfen Sie Ihre Internetverbindung und versuchen Sie es erneut.' });
    }
  }
  if (state.status === 'done') return <p role="status" style={{ margin: 0, fontWeight: 600, color: '#047857' }}>{komunikatOk}</p>;
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
      <label htmlFor={`${idPrefiks}-email`} style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>{etykieta}</label>
      <input id={`${idPrefiks}-email`} name="email" type="email" required {...WALID_DE} maxLength={200} placeholder="sie@firma.de" style={field} />
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--color-text-main)' }}>
        <input type="checkbox" name="consent" required {...WALID_DE} style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
        <span>
          Ich willige ein, dass AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warschau, Polen) meine E-Mail-Adresse verarbeitet, um mir {przedmiot} zu senden und meine Fragen zu beantworten. Ich werde nicht in einen Mailverteiler eingetragen. Details in der <Link href="/cookies" style={{ textDecoration: 'underline' }}>Datenschutzerklärung</Link>.
        </span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta={cta}>
          {state.status === 'loading' ? 'Wird gesendet…' : przycisk}
        </button>
        {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
      </div>
    </form>
  );
}
