'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { track } from '@/lib/track';
import { PANEL_DEMO_URL } from '@/lib/panel';

// Sprawdzarka „Czy ChatGPT poleca Twoją firmę?” (zadanie 2.3). Pytania zadaje panel
// (panel.ai-seo-company.pl/api/ai-check: DataForSEO, limit 3 na IP na dobę, raport e-mailem).
const API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/ai-check`;
const LABELS = { chat_gpt: 'ChatGPT', gemini: 'Gemini' };

const field = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: '#0F172A' };
const label = { display: 'block', fontWeight: 600, marginBottom: '0.35rem', color: 'var(--color-text-dark)' };
const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };

export default function AiCheckerClient() {
  const [state, setState] = useState({ status: 'idle', error: null, result: null });

  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const body = {
      company: String(fd.get('company') || ''),
      industry: String(fd.get('industry') || ''),
      city: String(fd.get('city') || ''),
      website: String(fd.get('website') || ''),
      email: String(fd.get('email') || ''),
      consent: fd.get('consent') === 'on',
      nick: String(fd.get('nick') || ''),
    };
    setState({ status: 'loading', error: null, result: null });
    track('ai_check_start', { city: body.city });
    try {
      const res = await fetch(API, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setState({ status: 'error', error: data.error || 'Nie udało się sprawdzić. Spróbuj za chwilę.', result: null });
        return;
      }
      // Lead z adresem e-mail: liczy się w GA4 jako zapytanie (bez konwersji Google Ads).
      track('generate_lead', { event_category: 'AI Check', plan: 'ai_check', currency: 'PLN', value: 100 });
      setState({ status: 'done', error: null, result: data });
    } catch {
      setState({ status: 'error', error: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.', result: null });
    }
  }

  const r = state.result;
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Sprawdź widoczność w AI" en="AI Visibility Check" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '80px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Bezpłatne sprawdzenie
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' }}>
              Czy ChatGPT poleca Twoją firmę?
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '680px', margin: '0 auto' }}>
              Zadamy ChatGPT (z wyszukiwaniem z Twojego miasta) i Gemini trzy pytania, które zadają klienci szukający firmy z Twojej branży. W około 30 sekund zobaczysz, czy w odpowiedziach pada Twoja firma. Pełny wynik wyślemy też e-mailem.
            </p>
          </Reveal>

          {state.status !== 'done' && (
            <Reveal>
              <form onSubmit={onSubmit} style={{ ...card, display: 'grid', gap: '1.1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))' }}>
                <div>
                  <label htmlFor="ac-company" style={label}>Nazwa firmy</label>
                  <input id="ac-company" name="company" required minLength={2} maxLength={100} placeholder="np. Stolarnia Kowalski" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-industry" style={label}>Branża albo usługa</label>
                  <input id="ac-industry" name="industry" required minLength={2} maxLength={60} placeholder="np. stolarz, dentysta, księgowa" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-city" style={label}>Miasto</label>
                  <input id="ac-city" name="city" required minLength={2} maxLength={60} placeholder="np. Warszawa" style={field} />
                </div>
                <div>
                  <label htmlFor="ac-website" style={label}>Strona www (opcjonalnie)</label>
                  <input id="ac-website" name="website" maxLength={200} placeholder="np. firma.pl" style={field} />
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label htmlFor="ac-email" style={label}>E-mail (wyślemy pełny wynik)</label>
                  <input id="ac-email" name="email" type="email" required maxLength={200} placeholder="ty@firma.pl" style={field} />
                </div>
                {/* Pole-pułapka dla botów: ukryte dla ludzi i czytników ekranu. */}
                <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <label style={{ gridColumn: '1 / -1', display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: '#333336' }}>
                  <input type="checkbox" name="consent" required style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
                  <span>
                    Zgadzam się na przetwarzanie podanych danych przez AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa), żeby przygotować i wysłać wynik oraz odpowiedzieć na moje pytania. Dane usuwamy po 60 dniach. Odbiorcy: dostawcy poczty i pomiarów (Resend, DataForSEO). Szczegóły w <Link href="/cookies" style={{ textDecoration: 'underline' }}>polityce prywatności</Link>.
                  </span>
                </label>
                <div style={{ gridColumn: '1 / -1', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
                  <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta="ai_check_submit">
                    {state.status === 'loading' ? 'Pytamy ChatGPT i Gemini… (do 40 s)' : 'Sprawdź za darmo'}
                  </button>
                  {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
                </div>
              </form>
            </Reveal>
          )}

          {state.status === 'done' && r && (
            <div style={{ display: 'grid', gap: '1.5rem' }} aria-live="polite">
              <div style={{ ...card, textAlign: 'center' }}>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>Twoja firma pojawia się w</p>
                <p style={{ margin: '0.25rem 0', fontSize: 'clamp(2.5rem, 7vw, 4rem)', fontWeight: 800, color: r.mentioned > 0 ? '#047857' : '#b3261e' }}>
                  {r.mentioned} z {r.total}
                </p>
                <p style={{ margin: 0, color: 'var(--color-text-muted)' }}>odpowiedzi ChatGPT i Gemini. Pełny wynik wysłaliśmy e-mailem.</p>
              </div>
              <ul style={{ ...card, listStyle: 'none', margin: 0, display: 'grid', gap: '1rem' }}>
                {r.rows.map((row, i) => (
                  <li key={i} style={{ borderTop: i ? '1px solid rgba(15,23,42,0.08)' : 'none', paddingTop: i ? '1rem' : 0 }}>
                    <p style={{ margin: 0, fontWeight: 700, color: 'var(--color-text-dark)' }}>{LABELS[row.engine] || row.engine}: {row.prompt}</p>
                    <p style={{ margin: '0.25rem 0 0', fontWeight: 600, color: row.mentioned ? '#047857' : '#b3261e' }}>{row.mentioned ? 'Firma wymieniona' : 'Firma niewymieniona'}</p>
                    <p style={{ margin: '0.25rem 0 0', lineHeight: 1.55, color: '#333336' }}>{row.excerpt || row.answer}</p>
                    {row.sources?.length > 0 && <p style={{ margin: '0.25rem 0 0', fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>Źródła: {row.sources.join(', ')}</p>}
                  </li>
                ))}
              </ul>
              <div style={{ ...card, display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ margin: 0, maxWidth: '520px', lineHeight: 1.6 }}>
                  Chcesz wiedzieć, jak to zmienić? W audycie sprawdzamy 30 pytań w ChatGPT, Perplexity, Gemini i Google, pokazujemy, kogo modele polecają zamiast Ciebie i z jakich stron korzystają.
                </p>
                <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <Link href="/pozycjonowanie-w-ai" className="btn btn-primary" data-cta="ai_check_offer">Audyt AI: 990 zł netto</Link>
                  <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="ai_check_demo">Zobacz demo panelu</a>
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                Odpowiedzi pochodzą z API modeli i mogą różnić się od tego, co ktoś zobaczy w aplikacji. Zmieniają się z dnia na dzień.
              </p>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </main>
  );
}
