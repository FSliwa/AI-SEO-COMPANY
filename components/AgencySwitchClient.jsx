'use client';

import { useLocale } from 'next-intl';
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
import { LASTMOD } from '@/lib/lastmod';
import * as EN from '@/lib/agencySwitch.en';

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
const lead = { fontSize: '1.05rem', lineHeight: 1.65, color: 'var(--color-text-main)', margin: '0 0 1.5rem' };
const podkreslenie = { textDecoration: 'underline' };

function preselectReview() {
  track('select_plan', { plan: 'przeglad-agencji' });
  try { window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: 'przeglad-agencji' })); } catch (e) {}
}

export default function AgencySwitchClient() {
  const locale = useLocale();
  const en = locale === 'en';
  const t = (pl, enText) => (en ? enText : pl);
  const D = en ? EN : { CHECKLIST, CHECKLIST_COUNT, CONTRACT_CHECKS, FAQ, STEPS };
  const kontakt = hash('kontakt', locale);
  const hrefP1 = hrefJesliOpublikowana('/porownania/pozycjonowanie-za-efekt-czy-abonament');
  const hrefP6 = hrefJesliOpublikowana('/porownania/jak-wybrac-agencje-seo');
  const hrefS1 = hrefJesliOpublikowana('/narzedzia/raport-seo');
  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs pl="Zmiana agencji SEO" en="Switching SEO agency" />

      <section style={{ paddingTop: 'clamp(120px, 14vw, 160px)', paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 2rem' }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', justifyContent: 'center' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('Poradnik i checklista', 'Guide and checklist')}
            </div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)', lineHeight: 1.1, fontWeight: 800, letterSpacing: '-0.02em', margin: '0 0 1rem', color: 'var(--color-text-dark)' }}>
              {t('Jak zmienić agencję SEO bez kar i bez utraty pozycji', 'How to switch SEO agencies without penalties and without losing rankings')}
            </h1>
            <p className="hero-lead" style={{ fontSize: '1.15rem', color: 'var(--color-text-muted)', lineHeight: 1.65, maxWidth: '700px', margin: '0 auto 1.5rem' }}>
              {t('Najwięcej kłopotów przy wypowiedzeniu umowy z agencją SEO sprawiają trzy rzeczy: konta Google założone na agencję, linki, które znikają razem z umową, i terminy wypowiedzenia. Poniżej sprawdzisz umowę, zabierzesz wszystko, co Twoje, i przejdziesz do nowej agencji bez przerwy w wynikach.',
                'Three things cause the most trouble when you terminate a contract with an SEO agency: Google accounts set up under the agency’s name, links that vanish together with the contract, and notice deadlines. This guide, written for agreements under Polish law, helps you review your contract, take everything that is yours and move to a new agency without a gap in results.')}
            </p>
            <p style={{ fontSize: '1.05rem', color: 'var(--color-text-main)', lineHeight: 1.6, maxWidth: '700px', margin: '0.75rem auto 1rem' }}>
              {en
                ? <>AI SEO COMPANY takes on clients from other agencies using a {D.CHECKLIST_COUNT}-point checklist; the free review after a previous agency takes 30 minutes.</>
                : <>AI SEO COMPANY przejmuje klientów po innych agencjach według checklisty {D.CHECKLIST_COUNT} punktów; bezpłatny przegląd po poprzedniej agencji trwa 30 minut.</>}
            </p>
            <Byline sciezka="/zmiana-agencji-seo" takzeEn data={en ? LASTMOD['https://www.ai-seo-company.pl/zmiana-agencji-seo'] : undefined} style={{ margin: '0 auto 1.5rem' }} />
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="#checklista" className="btn btn-primary" data-cta="switch_hero_checklist">{en ? <>Get the checklist ({D.CHECKLIST_COUNT} items)</> : <>Pobierz checklistę ({D.CHECKLIST_COUNT} punkty)</>}</a>
              <a href={kontakt} onClick={preselectReview} className="btn btn-secondary" data-cta="switch_hero_review">{t('Bezpłatny przegląd (30 min)', 'Free review (30 min)')}</a>
            </div>
          </Reveal>
        </div>
      </section>

      <section style={{ paddingBottom: '40px' }}>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gap: '2rem' }}>
          <Reveal>
            <div style={card}>
              <h2 style={h2}>{t('Zanim wypowiesz umowę: 5 rzeczy do sprawdzenia', 'Before you terminate the contract: 5 things to check')}</h2>
              <p style={lead}>{t('Weź umowę i regulamin agencji. Te pięć punktów decyduje, ile zapłacisz i co zostanie u Ciebie.', 'Take the agency’s contract and terms of service. These five points decide how much you will pay and what stays with you.')}</p>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                {D.CONTRACT_CHECKS.map((c) => (
                  <li key={c.title}><strong style={{ color: 'var(--color-text-dark)' }}>{c.title}.</strong> {c.text}</li>
                ))}
              </ol>
              <p style={{ ...lead, margin: '1.25rem 0 0' }}>
                {en
                  ? <>When you switch agencies, also compare the {hrefP1 ? <Link href={hrefP1} style={podkreslenie}>billing model (pay for results or monthly retainer)</Link> : 'billing model (pay for results or monthly retainer)'}: in the new contract it determines what you pay for.</>
                  : <>Zmieniając agencję, porównaj też {hrefP1 ? <Link href={hrefP1} style={podkreslenie}>model rozliczenia (za efekt czy abonament)</Link> : 'model rozliczenia (za efekt czy abonament)'}: w nowej umowie decyduje on o tym, za co płacisz.</>}
              </p>
              {/* 5.11.2026 (OP-12, akceptacja „0 zdań powtórzonych na stronie”): akapit powtarzał
                  dwa zdania odpowiedzi FAQ o prawach konsumenta - szczegóły zostają tylko w FAQ. */}
              <p style={{ ...lead, margin: '1.25rem 0 0', fontSize: '0.95rem' }}>
                {t('Prowadzisz jednoosobową działalność? Od 2021 roku możesz mieć część praw konsumenta, także przy umowie z agencją SEO. Kiedy tak jest, wyjaśniamy w pytaniach na końcu strony.',
                  'Do you run a sole proprietorship? Since 2021, under Polish law, you may have some consumer rights, including in a contract with an SEO agency. We explain when that applies in the questions at the end of the page.')}
              </p>
              <p style={{ ...lead, margin: '1rem 0 0', fontSize: '0.95rem', color: 'var(--w-tusz-2)' }}>
                {t('To nie jest porada prawna. Okres i forma wypowiedzenia zależą od Twojej umowy.', 'This is not legal advice. The notice period and form depend on your contract, and this guide concerns agreements governed by Polish law.')}
              </p>
            </div>
          </Reveal>

          <Reveal>
            <div style={card}>
              <h2 style={h2}>{t('Wypowiedzenie umowy z agencją SEO krok po kroku', 'Terminating an SEO agency contract step by step')}</h2>
              <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.9rem', lineHeight: 1.6, color: 'var(--color-text-main)' }}>
                {D.STEPS.map((s) => (
                  <li key={s.title}><strong style={{ color: 'var(--color-text-dark)' }}>{s.title}.</strong> {s.text}</li>
                ))}
              </ol>
            </div>
          </Reveal>

          <Reveal>
            <div id="checklista" style={{ ...card, scrollMarginTop: '110px' }}>
              <h2 style={h2}>{en ? <>Checklist: what to take from the agency ({D.CHECKLIST_COUNT} items)</> : <>Checklista: co zabrać od agencji ({D.CHECKLIST_COUNT} punkty)</>}</h2>
              <p style={lead}>{t('Odhacz na swoich kontach. Wersję PDF do wydruku wyślemy e-mailem (formularz pod listą).', 'Tick each item off on your own accounts. We will email you a printable PDF version (form below the list).')}</p>
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                {D.CHECKLIST.map((g) => (
                  <div key={g.title}>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: '0 0 0.6rem', color: 'var(--color-text-dark)' }}>{g.title}</h3>
                    <ul style={{ margin: 0, paddingLeft: '1.25rem', display: 'grid', gap: '0.5rem', lineHeight: 1.55, color: 'var(--color-text-main)' }}>
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
              <h2 style={{ ...h2, marginBottom: 0 }}>{t('Bezpłatny przegląd po poprzedniej agencji', 'Free review after a previous agency')}</h2>
              <p style={{ ...lead, margin: 0 }}>
                {en
                  ? <>30 minutes online. We go through the checklist with you on your own accounts: who owns Search Console, GA4 and your Business Profile, which links and content you have, what stays after the contract ends and how your clicks look in Search Console. You get a list of things to secure before you give notice. No obligations and no legal assessment of the contract. If the review uncovers more problems, a <Link href="/audyt-seo" style={podkreslenie}>full SEO audit</Link> costs from €350 net.</>
                  : <>30 minut online. Przechodzimy z Tobą checklistę na Twoich kontach: kto jest właścicielem Search Console, GA4 i wizytówki, jakie masz linki i treści, co zostanie po zakończeniu umowy i jak wyglądają kliknięcia w Search Console. Dostaniesz listę rzeczy do zabezpieczenia przed wypowiedzeniem. Bez zobowiązań i bez oceny prawnej umowy. Jeśli przegląd pokaże więcej problemów, <Link href="/audyt-seo" style={podkreslenie}>pełny audyt SEO</Link> kosztuje od 1 490 zł netto.</>}
              </p>
              <p style={{ ...lead, margin: 0 }}>
                {en
                  ? <>With us, leaving is simple: a monthly contract, notice by email or with one button in the portal, no exit fees, and the list of links and all your data are available to download in the <Link href="/panel-klienta" style={podkreslenie}>client portal</Link> at any time. <Link href="/cennik-pozycjonowania#uczciwa-umowa" style={{ textDecoration: 'underline' }}>See our fair contract terms</Link>.</>
                  : <>U nas wyjście z umowy jest proste: umowa miesięczna, wypowiedzenie e-mailem albo jednym przyciskiem w panelu, bez opłat za wyjście, a lista linków i wszystkie dane są do pobrania w <Link href="/panel-klienta" style={podkreslenie}>panelu klienta</Link> w każdej chwili. <Link href="/cennik-pozycjonowania#uczciwa-umowa" style={{ textDecoration: 'underline' }}>Zobacz zasady uczciwej umowy</Link>.</>}
              </p>
              {(hrefP6 || hrefS1) && (
                <p style={{ ...lead, margin: 0 }}>
                  {hrefP6 && (en
                    ? <>Looking for your next agency? We collected the questions worth asking before you sign in our guide on <Link href={hrefP6} style={podkreslenie}>how to choose an SEO agency</Link>.</>
                    : <>Szukasz następnej agencji? Pytania, które warto jej zadać przed umową, zebraliśmy w poradniku <Link href={hrefP6} style={podkreslenie}>jak wybrać agencję SEO</Link>.</>)}
                  {hrefP6 && hrefS1 && ' '}
                  {hrefS1 && (en
                    ? <>What a new agency’s monthly report should contain is shown in our <Link href={hrefS1} style={podkreslenie}>SEO report template</Link>.</>
                    : <>Co powinno być w comiesięcznym raporcie od nowej agencji, pokazuje nasz <Link href={hrefS1} style={podkreslenie}>wzór raportu SEO</Link>.</>)}
                </p>
              )}
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                <a href={kontakt} onClick={preselectReview} className="btn btn-primary" data-cta="switch_review">{t('Umów przegląd', 'Book a review')}</a>
                <a href={PANEL_DEMO_URL} className="btn btn-secondary" data-cta="switch_demo">{t('Zobacz demo panelu', 'See the portal demo')}</a>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <AppleFaq faqData={D.FAQ} title={t('Pytania o zmianę agencji SEO', 'Frequently asked questions')} />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
