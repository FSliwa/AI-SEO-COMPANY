'use client';

import Header from '@/components/Header';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import Byline from '@/components/Byline';
import ChecklistForm from '@/components/ChecklistForm';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '../i18n/routing';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { CHECKLIST, CHECKLIST_COUNT, CONTRACT_CHECKS, FAQ, STEPS } from '@/lib/agencySwitch';

// Poradnik „Zmiana agencji SEO bez kar” (zadanie 3.2). Checklistę PDF wysyła panel
// (panel.ai-seo-company.pl/api/checklista) e-mailem; zespół dostaje powiadomienie o leadzie.
// 5.11.2026 (PLAN-v2 SIL, ZA1): formularz przeniesiony 1:1 do components/ChecklistForm.jsx
// (wspólny z innymi lead magnetami); domyślne propsy = to samo body, endpoint, id pola
// (cl-email), teksty i zdarzenie generate_lead { event_category: 'Checklist',
// plan: 'checklista_zmiana_agencji', currency: 'PLN', value: 100 } co lokalna funkcja wcześniej.
//
// 5.11.2026 (PLAN-v2 6.23, ZA1; AV-18, OP-04 linki 32-33, przegląd prawny 5.2a YMYL-P):
// zdanie z marką po leadzie, podpis autora, dopisek „To nie jest porada prawna…” pod sekcją
// o umowie (do czasu przeglądu radcy prawnego, D5), link do P1 w sekcji o umowie, linki do
// /panel-klienta i /audyt-seo w sekcji przeglądu. P6 (partia 4) i S1 (partia 3) przez bramkę
// publikacji: zdania z tymi linkami renderują się dopiero, gdy cel zwraca 200 (bez celu zdanie
// odsyłałoby do nieistniejącej treści).

const card = { background: '#FFFFFF', borderRadius: '28px', padding: 'clamp(1.5rem, 4vw, 2.5rem)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' };
const h2 = { fontSize: 'clamp(1.5rem, 3.2vw, 2rem)', fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' };
const lead = { fontSize: '1.05rem', lineHeight: 1.65, color: '#333336', margin: '0 0 1.5rem' };
const podkreslenie = { textDecoration: 'underline' };

function preselectReview() {
  track('select_plan', { plan: 'przeglad-agencji' });
  try { window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: 'przeglad-agencji' })); } catch (e) {}
}

export default function AgencySwitchClient() {
  const kontakt = hash('kontakt', 'pl');
  const hrefP1 = hrefJesliOpublikowana('/porownania/pozycjonowanie-za-efekt-czy-abonament');
  const hrefP6 = hrefJesliOpublikowana('/porownania/jak-wybrac-agencje-seo');
  const hrefS1 = hrefJesliOpublikowana('/narzedzia/raport-seo');
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
            <p style={{ fontSize: '1.05rem', color: '#333336', lineHeight: 1.6, maxWidth: '700px', margin: '0.75rem auto 1rem' }}>
              AI SEO COMPANY przejmuje klientów po innych agencjach według checklisty {CHECKLIST_COUNT} punktów; bezpłatny przegląd po poprzedniej agencji trwa 30 minut.
            </p>
            <Byline sciezka="/zmiana-agencji-seo" style={{ margin: '0 auto 1.5rem' }} />
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
              <p style={{ ...lead, margin: '1.25rem 0 0' }}>
                Zmieniając agencję, porównaj też {hrefP1 ? <Link href={hrefP1} style={podkreslenie}>model rozliczenia (za efekt czy abonament)</Link> : 'model rozliczenia (za efekt czy abonament)'}: w nowej umowie decyduje on o tym, za co płacisz.
              </p>
              {/* 5.11.2026 (OP-12, akceptacja „0 zdań powtórzonych na stronie”): akapit powtarzał
                  dwa zdania odpowiedzi FAQ o prawach konsumenta - szczegóły zostają tylko w FAQ. */}
              <p style={{ ...lead, margin: '1.25rem 0 0', fontSize: '0.95rem' }}>
                Prowadzisz jednoosobową działalność? Od 2021 roku możesz mieć część praw konsumenta, także przy umowie z agencją SEO. Kiedy tak jest, wyjaśniamy w pytaniach na końcu strony.
              </p>
              <p style={{ ...lead, margin: '1rem 0 0', fontSize: '0.95rem', color: '#6E6E73' }}>
                To nie jest porada prawna. Okres i forma wypowiedzenia zależą od Twojej umowy.
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
                30 minut online. Przechodzimy z Tobą checklistę na Twoich kontach: kto jest właścicielem Search Console, GA4 i wizytówki, jakie masz linki i treści, co zostanie po zakończeniu umowy i jak wyglądają kliknięcia w Search Console. Dostaniesz listę rzeczy do zabezpieczenia przed wypowiedzeniem. Bez zobowiązań i bez oceny prawnej umowy. Jeśli przegląd pokaże więcej problemów, <Link href="/audyt-seo" style={podkreslenie}>pełny audyt SEO</Link> kosztuje od 1 490 zł netto.
              </p>
              <p style={{ ...lead, margin: 0 }}>
                U nas wyjście z umowy jest proste: umowa miesięczna, wypowiedzenie e-mailem albo jednym przyciskiem w panelu, bez opłat za wyjście, a lista linków i wszystkie dane są do pobrania w <Link href="/panel-klienta" style={podkreslenie}>panelu klienta</Link> w każdej chwili. <Link href="/cennik-pozycjonowania#uczciwa-umowa" style={{ textDecoration: 'underline' }}>Zobacz zasady uczciwej umowy</Link>.
              </p>
              {(hrefP6 || hrefS1) && (
                <p style={{ ...lead, margin: 0 }}>
                  {hrefP6 && <>Szukasz następnej agencji? Pytania, które warto jej zadać przed umową, zebraliśmy w poradniku <Link href={hrefP6} style={podkreslenie}>jak wybrać agencję SEO</Link>.</>}
                  {hrefP6 && hrefS1 && ' '}
                  {hrefS1 && <>Co powinno być w comiesięcznym raporcie od nowej agencji, pokazuje nasz <Link href={hrefS1} style={podkreslenie}>wzór raportu SEO</Link>.</>}
                </p>
              )}
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
