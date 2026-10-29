'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { CHECKLIST, CHECKLIST_COUNT, CONTRACT_CHECKS, FAQ, STEPS } from '@/lib/agencySwitch';

// Poradnik „Zmiana agencji SEO bez kar” (zadanie 3.2). Checklistę PDF wysyła panel
// (panel.ai-seo-company.pl/api/checklista) e-mailem; zespół dostaje powiadomienie o leadzie.
const API = `${process.env.NEXT_PUBLIC_PANEL_URL || 'https://panel.ai-seo-company.pl'}/api/checklista`;

const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };
const h2 = { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' };
const lead = { fontSize: '1.05rem', lineHeight: 1.65, color: '#333336', margin: '0 0 1.5rem' };
const field = { width: '100%', padding: '0.8rem 1rem', borderRadius: '14px', border: '1px solid rgba(15,23,42,0.15)', fontSize: '1rem', background: '#FFFFFF', color: '#0F172A' };

function preselectReview() {
  track('select_plan', { plan: 'przeglad-agencji' });
  try { window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: 'przeglad-agencji' })); } catch (e) {}
}

function ChecklistForm() {
  const [state, setState] = useState({ status: 'idle', error: null });
  async function onSubmit(e) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setState({ status: 'loading', error: null });
    try {
      const res = await fetch(API, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: String(fd.get('email') || ''), consent: fd.get('consent') === 'on', nick: String(fd.get('nick') || '') }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) return setState({ status: 'error', error: data.error || 'Nie udało się wysłać. Spróbuj za chwilę.' });
      track('generate_lead', { event_category: 'Checklist', plan: 'checklista_zmiana_agencji', currency: 'PLN', value: 100 });
      setState({ status: 'done', error: null });
    } catch {
      setState({ status: 'error', error: 'Brak połączenia. Sprawdź internet i spróbuj ponownie.' });
    }
  }
  if (state.status === 'done')
    return <p role="status" style={{ margin: 0, fontWeight: 600, color: '#047857' }}>Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do PDF przyjdzie w ciągu minuty.</p>;
  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.9rem' }}>
      <label htmlFor="cl-email" style={{ fontWeight: 600, color: 'var(--color-text-dark)' }}>E-mail, na który wyślemy checklistę</label>
      <input id="cl-email" name="email" type="email" required maxLength={200} placeholder="ty@firma.pl" style={field} />
      <input name="nick" tabIndex={-1} autoComplete="off" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
      <label style={{ display: 'flex', gap: '0.6rem', alignItems: 'flex-start', fontSize: '0.9rem', lineHeight: 1.5, color: '#333336' }}>
        <input type="checkbox" name="consent" required style={{ marginTop: '0.25rem', width: 18, height: 18, flexShrink: 0 }} />
        <span>
          Zgadzam się na przetwarzanie adresu e-mail przez AI SIGNALS COMPANY P.S.A. (ul. Grzybowska 12/14 lok. B-3, Warszawa), żeby wysłać checklistę i odpowiedzieć na moje pytania. Nie zapisujemy Cię na listę mailingową. Szczegóły w <Link href="/cookies" style={{ textDecoration: 'underline' }}>polityce prywatności</Link>.
        </span>
      </label>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
        <button type="submit" className="btn btn-primary" disabled={state.status === 'loading'} data-cta="checklist_submit">
          {state.status === 'loading' ? 'Wysyłam…' : 'Wyślij checklistę PDF'}
        </button>
        {state.status === 'error' && <p role="alert" style={{ margin: 0, color: '#b3261e' }}>{state.error}</p>}
      </div>
    </form>
  );
}

export default function AgencySwitchClient() {
  const kontakt = hash('kontakt', 'pl');
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Zmiana agencji SEO" en="Changing SEO agency" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Poradnik i checklista
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' }}>
              Jak zmienić agencję SEO bez kar i bez utraty pozycji
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '700px', margin: '0 auto 1.5rem' }}>
              Najwięcej kłopotów przy wypowiedzeniu umowy z agencją SEO sprawiają trzy rzeczy: konta Google założone na agencję, linki, które znikają razem z umową, i terminy wypowiedzenia. Poniżej sprawdzisz umowę, zabierzesz wszystko, co Twoje, i przejdziesz do nowej agencji bez przerwy w wynikach.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#checklista" className="btn btn-primary" data-cta="switch_hero_checklist">Pobierz checklistę ({CHECKLIST_COUNT} punkty)</a>
              <a href={kontakt} onClick={preselectReview} className="btn btn-secondary" data-cta="switch_hero_review">Bezpłatny przegląd (30 min)</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <Reveal>
            <div style={card}>
              <h2 style={h2}>Zanim wypowiesz umowę: 5 rzeczy do sprawdzenia</h2>
              <p style={lead}>Weź umowę i regulamin agencji. Te pięć punktów decyduje, ile zapłacisz i co zostanie u Ciebie.</p>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.9rem', lineHeight: 1.6, color: '#333336' }}>
                {CONTRACT_CHECKS.map((c) => (
                  <li key={c.title}><strong style={{ color: 'var(--color-text-dark)' }}>{c.title}.</strong> {c.text}</li>
                ))}
              </ol>
              <p style={{ ...lead, margin: '1.25rem 0 0', fontSize: '0.95rem' }}>
                Prowadzisz jednoosobową działalność? Od 2021 roku część ochrony konsumenckiej (m.in. przed niedozwolonymi postanowieniami umownymi) obejmuje też przedsiębiorców, dla których umowa nie ma charakteru zawodowego. To zależy od umowy i wpisu w CEIDG: w razie wątpliwości zapytaj prawnika.
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={card}>
              <h2 style={h2}>Wypowiedzenie umowy z agencją SEO krok po kroku</h2>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.9rem', lineHeight: 1.6, color: '#333336' }}>
                {STEPS.map((s) => (
                  <li key={s.title}><strong style={{ color: 'var(--color-text-dark)' }}>{s.title}.</strong> {s.text}</li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div id="checklista" style={{ ...card, scrollMarginTop: '110px' }}>
              <h2 style={h2}>Checklista: co zabrać od agencji ({CHECKLIST_COUNT} punkty)</h2>
              <p style={lead}>Odhacz na swoich kontach. Wersję PDF do wydruku wyślemy e-mailem (formularz pod listą).</p>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {CHECKLIST.map((g) => (
                  <div key={g.title}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--color-text-dark)' }}>{g.title}</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem', lineHeight: 1.55, color: '#333336' }}>
                      {g.items.map((i) => <li key={i}>{i}</li>)}
                    </ul>
                  </div>
                ))}
              </div>
              <div style={{ borderTop: '1px solid rgba(15,23,42,0.08)', marginTop: '2rem', paddingTop: '1.5rem' }}>
                <ChecklistForm />
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div style={{ ...card, display: 'grid', gap: '1rem' }}>
              <h2 style={{ ...h2, marginBottom: 0 }}>Bezpłatny przegląd po poprzedniej agencji</h2>
              <p style={{ ...lead, margin: 0 }}>
                30 minut online. Przechodzimy z Tobą checklistę na Twoich kontach: kto jest właścicielem Search Console, GA4 i wizytówki, jakie masz linki i treści, co zostanie po zakończeniu umowy i jak wyglądają kliknięcia w Search Console. Dostaniesz listę rzeczy do zabezpieczenia przed wypowiedzeniem. Bez zobowiązań i bez oceny prawnej umowy.
              </p>
              <p style={{ ...lead, margin: 0 }}>
                U nas wyjście z umowy jest proste: umowa miesięczna, wypowiedzenie e-mailem albo jednym przyciskiem w panelu, bez opłat za wyjście, a lista linków i wszystkie dane są do pobrania w panelu w każdej chwili. <Link href="/cennik-pozycjonowania#uczciwa-umowa" style={{ textDecoration: 'underline' }}>Zobacz zasady uczciwej umowy</Link>.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={kontakt} onClick={preselectReview} className="btn btn-primary" data-cta="switch_review">Umów przegląd</a>
                <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="switch_demo">Zobacz demo panelu</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={FAQ} title="Pytania o zmianę agencji SEO" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
