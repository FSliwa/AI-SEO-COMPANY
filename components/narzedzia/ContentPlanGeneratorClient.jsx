'use client';

// Generator 90-dniowego Planu Treści BOFU + AI (C16):
// woła POST ${PANEL_API}/content-plan-ai z { url, branza, lang }, renderuje tabelę 12 tematów
// na Miesiąc 1-3 oraz pozwala pobrać arkusz .csv z BOM UTF-8 (\uFEFF) do Excela i Google Sheets.

import { useRef, useState } from 'react';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { WALID_DE } from '@/lib/walidacjaDe';
import { track } from '@/lib/track';

const CSS_CPG = `
.cpg-karta { margin: 0 0 2rem; padding: clamp(1.15rem, 3vw, 1.65rem); border-radius: 22px; background: var(--w-karta, #ffffff); border: 1.5px solid rgba(243, 183, 156, 0.65); box-shadow: 0 18px 44px rgba(10, 19, 55, 0.07); display: grid; gap: 1rem; }
.cpg-pola { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 230px), 1fr)); gap: 0.75rem; }
.cpg-etykieta { display: block; font-size: 0.86rem; font-weight: 600; color: var(--color-text-dark); margin: 0 0 0.3rem; }
.cpg-pole { width: 100%; min-height: 48px; padding: 0.65rem 0.9rem; border-radius: 12px; border: 1px solid rgba(15, 23, 42, 0.16); background: var(--w-papier, #f6f4ef); color: var(--w-tusz); font: inherit; font-size: 0.95rem; }
.cpg-pole:focus-visible { outline: 2px solid var(--w-pomarancz, #d85a30); outline-offset: 2px; background: #ffffff; }
.cpg-pasek-wyniku { display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; border-radius: 14px; background: var(--w-papier, #f6f4ef); border: 1px solid var(--w-linia, rgba(30,30,30,0.1)); }
.cpg-tabela-wrap { overflow-x: auto; border: 1px solid var(--w-linia, rgba(30,30,30,0.12)); border-radius: 16px; background: #ffffff; }
.cpg-tabela { width: 100%; border-collapse: collapse; font-size: 0.88rem; line-height: 1.45; }
.cpg-tabela th, .cpg-tabela td { padding: 0.68rem 0.8rem; border-bottom: 1px solid var(--w-linia, rgba(30,30,30,0.1)); text-align: left; vertical-align: top; }
.cpg-tabela th { background: var(--w-papier-2, #f2ede4); font-weight: 600; color: var(--color-text-dark); white-space: nowrap; }
.cpg-tabela tr:last-child td { border-bottom: 0; }
.cpg-intencja { display: inline-block; padding: 0.18rem 0.55rem; border-radius: 999px; font-size: 0.75rem; font-weight: 700; white-space: nowrap; }
.cpg-intencja--bofu { background: rgba(216, 90, 48, 0.14); color: #b4471f; }
.cpg-intencja--vs { background: rgba(30, 64, 175, 0.12); color: #1e40af; }
.cpg-intencja--geo { background: rgba(4, 120, 87, 0.13); color: #047857; }
`;

const TEKSTY = {
  pl: {
    tytul: 'Generator 90-dniowego Planu Treści BOFU + AI',
    opis: 'Wpisz domenę i opcjonalnie branżę, aby wygenerować 12 gotowych tematów na Miesiąc 1-3 (strony usług, cenniki, porównania VS oraz artykuły pod cytowania w ChatGPT i AI Overviews).',
    urlLabel: 'Domena Twojej firmy',
    urlPh: 'np. twojafirma.pl',
    branzaLabel: 'Branża lub usługa (opcjonalnie)',
    branzaPh: 'np. biuro rachunkowe B2B',
    start: 'Wygeneruj plan na 90 dni',
    demo: 'Załaduj przykładowy plan DEMO',
    trwa: 'Układam 12 tematów na 3 mies.…',
    pobierz: 'Pobierz arkusz planu (.csv do Excel / Google Sheets)',
    podsumowanie: (domena) => `Plan 90 dni (12 publikacji, Miesiąc 1-3) dla ${domena}`,
    kolumny: ['Tydzień', 'Tytuł', 'Fraza główna', 'Intencja BOFU/VS/GEO', 'Cel w AI'],
    miesiac: (m) => `Mies. ${m}`,
    tydz: (w) => `Tydz. ${w}`,
    bladSieci: 'Nie udało się wygenerować planu treści dla tej domeny. Sprawdź adres i spróbuj ponownie.',
  },
  en: {
    tytul: '90-Day BOFU + AI Content Plan Generator',
    opis: 'Enter your domain and optional industry to generate 12 high-intent topics for Months 1-3 across BOFU pricing/service pages, VS comparisons and AI-citable guides.',
    urlLabel: 'Your website domain',
    urlPh: 'e.g. yourcompany.com',
    branzaLabel: 'Industry or core service (optional)',
    branzaPh: 'e.g. B2B accounting',
    start: 'Generate 90-day plan',
    demo: 'Load DEMO plan',
    trwa: 'Building 12-week plan…',
    pobierz: 'Download plan (.csv for Excel / Google Sheets)',
    podsumowanie: (domena) => `90-day content plan (12 topics, Months 1-3) for ${domena}`,
    kolumny: ['Week', 'Title', 'Primary keyword', 'BOFU/VS/GEO intent', 'AI visibility goal'],
    miesiac: (m) => `Mo. ${m}`,
    tydz: (w) => `Wk ${w}`,
    bladSieci: 'Could not generate a content plan for this domain right now. Check the URL and try again.',
  },
  de: {
    tytul: '90-Tage-Generator: BOFU- & KI-Redaktionsplan',
    opis: 'Geben Sie Ihre Domain und optional Ihre Branche ein: Sie erhalten 12 kaufnahe Themen für Monat 1 bis 3 (Leistungen, Kosten, VS-Vergleiche und GEO-Inhalte für ChatGPT & AI Overviews).',
    urlLabel: 'Ihre Website-Domain',
    urlPh: 'z. B. ihrefirma.de',
    branzaLabel: 'Branche oder Leistung (optional)',
    branzaPh: 'z. B. CNC-Fertigung',
    start: '90-Tage-Plan erstellen',
    demo: 'DEMO-Plan sofort laden',
    trwa: 'Erstelle 12-Wochen-Plan…',
    pobierz: 'Redaktionsplan herunterladen (.csv für Excel / Google Sheets)',
    podsumowanie: (domena) => `90-Tage-Redaktionsplan (12 Themen, Monat 1-3) für ${domena}`,
    kolumny: ['Woche', 'Titel', 'Haupt-Keyword', 'Intention BOFU/VS/GEO', 'Ziel in KI-Systemen'],
    miesiac: (m) => `Mon. ${m}`,
    tydz: (w) => `KW +${w}`,
    bladSieci: 'Der Redaktionsplan konnte momentan nicht erstellt werden. Bitte prüfen Sie die Domain und versuchen Sie es erneut.',
  },
};

function wyczyscDomene(surowy) {
  const s = String(surowy || '').trim();
  if (!s) return 'twojafirma.pl';
  try {
    const u = new URL(/^https?:\/\//i.test(s) ? s : `https://${s}`);
    return u.hostname.replace(/^www\./i, '');
  } catch {
    return s.replace(/^https?:\/\//i, '').split('/')[0] || 'twojafirma.pl';
  }
}

function klasaIntencji(tekst) {
  const s = String(tekst || '').toUpperCase();
  if (s.includes('VS') || s.includes('VERGLEICH') || s.includes('PORÓWN')) return 'vs';
  if (s.includes('GEO') || s.includes('AI') || s.includes('KI')) return 'geo';
  return 'bofu';
}

function zbudujDemoPlan(domena, surowaBranza, jezyk) {
  const b = (surowaBranza || '').trim() || (jezyk === 'de' ? 'B2B-Dienstleistung' : jezyk === 'en' ? 'B2B services' : 'usługi B2B');
  const bMale = jezyk === 'de' ? b : b.toLowerCase();
  if (jezyk === 'de') {
    return [
      [1, 1, `${b}: Leistungsumfang, Ablauf und Ergebnisse für Unternehmen`, `${bMale} anbieter`, 'BOFU', 'Klare Entitäts- und Leistungsdefinition für ChatGPT Search'],
      [2, 1, `Was kostet ${b} 2026? Preisrahmen und Kostenfaktoren`, `${bMale} kosten`, 'BOFU', 'Direkte Preisspannen in Euro für Google AI Overviews'],
      [3, 1, `${b} intern lösen oder extern vergeben? Kosten-Vergleich`, `${bMale} agentur oder inhouse`, 'VS', 'Vergleichstabelle für Entscheidungsfragen in Perplexity'],
      [4, 1, `Checkliste vor der Auswahl eines Anbieters für ${b}`, `${bMale} auswahl checkliste`, 'GEO', 'Strukturierte Prüfpunkte als zitierfähige Quelle'],
      [5, 2, `Fallstudie: Messbare Ergebnisse mit ${b} in 90 Tagen`, `${bMale} erfahrungen`, 'BOFU', 'Belegbare Zahlen und E-E-A-T-Signale für Empfehlungen'],
      [6, 2, `Die 7 teuersten Fehler bei ${b} im Mittelstand`, `${bMale} fehler vermeiden`, 'GEO', 'Konkrete Antworten auf typische Problemfragen im KI-Chat'],
      [7, 2, `Standardlösung vs. individuelle Umsetzung bei ${b}`, `${bMale} vergleich`, 'VS', 'Objektive Vor- und Nachteile für KI-Vergleichsantworten'],
      [8, 2, `Wie lange dauert ${b}? Realistischer Zeitplan nach Phasen`, `${bMale} dauer`, 'GEO', 'Präzise Zeitangaben direkt im ersten Absatz (Answer-First)'],
      [9, 3, `ROI-Rechnung: Wann amortisiert sich ${b} im B2B?`, `${bMale} roi berechnen`, 'BOFU', 'Rechenbeispiel in Euro für kaufnahe Budgetfragen'],
      [10, 3, `Anbieter für ${b} wechseln ohne Betriebsrisiko`, `${bMale} wechseln`, 'BOFU', 'Migrationsschritte für unzufriedene Bestandskunden der Konkurrenz'],
      [11, 3, `Vertragsmuster & SLA-Kriterien bei ${b}: Worauf achten?`, `${bMale} vertrag kriterien`, 'VS', 'Transparenter Kriterienkatalog für B2B-Einkäufer'],
      [12, 3, `15 häufige Kundenfragen zu ${b} knapp beantwortet`, `${bMale} faq`, 'GEO', 'Abdeckung von Long-Tail-Prompts in ChatGPT und Gemini'],
    ].map(([tydzien, miesiac, tytul, fraza, intencja, celAi]) => ({ tydzien, miesiac, tytul, fraza, intencja, celAi, domena }));
  }
  if (jezyk === 'en') {
    return [
      [1, 1, `${b}: Scope, Process and Deliverables for Businesses`, `${bMale} company`, 'BOFU', 'Clear entity & service definition for ChatGPT Search'],
      [2, 1, `How Much Does ${b} Cost in 2026? Pricing Tiers & Factors`, `${bMale} cost`, 'BOFU', 'Direct price ranges cited in Google AI Overviews'],
      [3, 1, `In-House vs Agency for ${b}: 12-Month Cost Breakdown`, `${bMale} agency vs in-house`, 'VS', 'Comparison matrix for Perplexity buyer prompts'],
      [4, 1, `Buyer Checklist: 10 Questions Before Hiring for ${b}`, `how to choose ${bMale}`, 'GEO', 'Structured evaluation criteria for LLM recommendations'],
      [5, 2, `Case Study: Measurable Results from ${b} in 90 Days`, `${bMale} case study`, 'BOFU', 'First-hand proof and E-E-A-T signals for brand mentions'],
      [6, 2, `7 Costly Mistakes Companies Make with ${b}`, `${bMale} mistakes`, 'GEO', 'Problem-solution snippets for conversational queries'],
      [7, 2, `Custom vs Off-the-Shelf Approach in ${b}: Pros & Cons`, `custom vs standard ${bMale}`, 'VS', 'Balanced trade-off table cited in comparison answers'],
      [8, 2, `How Long Does ${b} Take? Realistic Timeline by Stage`, `how long does ${bMale} take`, 'GEO', 'Answer-first timeline summary for AI snippets'],
      [9, 3, `ROI Model: When Does ${b} Pay Back?`, `${bMale} roi`, 'BOFU', 'Unit-economics breakdown for CFO/founder prompts'],
      [10, 3, `Switching ${b} Providers Without Disruption: Step-by-Step`, `switch ${bMale} provider`, 'BOFU', 'Captures high-intent buyers leaving competitors'],
      [11, 3, `SLA & Contract Terms in ${b}: What to Verify`, `${bMale} contract checklist`, 'VS', 'Transparent buyer guide building trust signals'],
      [12, 3, `15 Real Customer Questions About ${b} Answered Directly`, `${bMale} faq`, 'GEO', 'Covers long-tail conversational prompts across LLMs'],
    ].map(([tydzien, miesiac, tytul, fraza, intencja, celAi]) => ({ tydzien, miesiac, tytul, fraza, intencja, celAi, domena }));
  }
  return [
    [1, 1, `${b}: zakres współpracy, przebieg i mierzalne efekty`, `${bMale} dla firm`, 'BOFU', 'Jasna definicja usługi i encji firmy pod ChatGPT Search'],
    [2, 1, `Ile kosztuje ${bMale} w 2026 roku? Widełki cen i czynniki`, `${bMale} cennik`, 'BOFU', 'Konkretne widełki cenowe cytowane w Google AI Overviews'],
    [3, 1, `${b}: zewnętrzny wykonawca czy dział wewnętrzny? Porównanie kosztów`, `${bMale} firma czy etat`, 'VS', 'Tabela porównawcza pod zapytania decyzyjne w Perplexity'],
    [4, 1, `Jak wybrać wykonawcę w branży (${bMale}) - 10 pytań przed umową`, `jak wybrać ${bMale}`, 'GEO', 'Lista kryteriów wyboru gotowa do cytowania przez modele AI'],
    [5, 2, `Studium przypadku: wyniki wdrożenia (${bMale}) po 90 dniach`, `${bMale} opinie efekty`, 'BOFU', 'Twarde dane własne (E-E-A-T) wzmacniające polecenia marki'],
    [6, 2, `7 najdroższych błędów przy zamawianiu usługi: ${bMale}`, `${bMale} błędy`, 'GEO', 'Zwięzłe odpowiedzi na pytania problemowe klientów w czatach AI'],
    [7, 2, `Rozwiązanie dedykowane kontra gotowy pakiet (${bMale})`, `${bMale} porównanie`, 'VS', 'Uczciwe zestawienie zalet i ograniczeń obu wariantów'],
    [8, 2, `Ile trwa ${bMale}? Realny harmonogram prac tydzień po tygodniu`, `ile trwa ${bMale}`, 'GEO', 'Odpowiedź w pierwszym akapicie (Answer-First) pod snippety AI'],
    [9, 3, `Kiedy zwraca się inwestycja w ${bMale}? Kalkulacja ROI`, `${bMale} opłacalność roi`, 'BOFU', 'Wyliczenie na liczbach dla decydentów i zarządu'],
    [10, 3, `Zmiana dostawcy (${bMale}) bez przestojów - instrukcja krok po kroku`, `zmiana firmy ${bMale}`, 'BOFU', 'Przechwycenie klientów niezadowolonych z obecnej obsługi'],
    [11, 3, `Co musi zawierać umowa i SLA na ${bMale}? Wzór zapisów`, `umowa ${bMale}`, 'VS', 'Przejrzyste warunki budujące zaufanie przed kontaktem'],
    [12, 3, `15 pytań klientów o ${bMale} - konkretne odpowiedzi bez żargonu`, `${bMale} pytania`, 'GEO', 'Pokrycie długiego ogona zapytań konwersacyjnych w Gemini i ChatGPT'],
  ].map(([tydzien, miesiac, tytul, fraza, intencja, celAi]) => ({ tydzien, miesiac, tytul, fraza, intencja, celAi, domena }));
}

function normalizujWiersze(surowe, domena) {
  if (!Array.isArray(surowe)) return [];
  return surowe.slice(0, 12).map((w, idx) => {
    const tydzien = Number(w.tydzien ?? w.week ?? w.nr ?? idx + 1) || idx + 1;
    const miesiac = Number(w.miesiac ?? w.month ?? Math.ceil(tydzien / 4)) || Math.ceil(tydzien / 4);
    return {
      tydzien,
      miesiac,
      tytul: String(w.tytul ?? w.title ?? w.temat ?? ''),
      fraza: String(w.fraza ?? w.frazaGlowna ?? w.keyword ?? ''),
      intencja: String(w.intencja ?? w.typ ?? w.intent ?? 'BOFU'),
      celAi: String(w.celAi ?? w.celWAi ?? w.cel_ai ?? w.aiGoal ?? w.cel ?? ''),
      domena,
    };
  });
}

function csvKomorka(wartosc) {
  const s = String(wartosc ?? '').replace(/"/g, '""');
  return `"${s}"`;
}

export default function ContentPlanGeneratorClient({ locale = 'pl' }) {
  const jezyk = locale === 'de' ? 'de' : locale === 'en' ? 'en' : 'pl';
  const T = TEKSTY[jezyk];
  const walid = jezyk === 'de' ? WALID_DE : {};

  const [url, setUrl] = useState('');
  const [branza, setBranza] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, domena: '', wiersze: [] });
  const poleUrlRef = useRef(null);

  async function generujPlan(e) {
    e.preventDefault();
    const czystyUrl = url.trim();
    if (!czystyUrl) {
      poleUrlRef.current?.focus();
      return;
    }
    const domena = wyczyscDomene(czystyUrl);
    setStan({ status: 'loading', blad: null, domena, wiersze: [] });
    track('narzedzie_content_plan_ai_start', { lang: jezyk, zBranza: Boolean(branza.trim()) });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 750));
      const wiersze = zbudujDemoPlan(domena, branza, jezyk);
      setStan({ status: 'done', blad: null, domena, wiersze });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 50_000);
    try {
      const res = await fetch(`${PANEL_API}/content-plan-ai`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          url: czystyUrl,
          ...(branza.trim() ? { branza: branza.trim() } : {}),
          lang: jezyk,
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      const p = data.podglad || data;
      const lista = normalizujWiersze(p.tematy ?? p.plan ?? p.wiersze ?? p.items, p.domena || domena);
      if (!res.ok || !data.ok || lista.length === 0) {
        setStan({ status: 'error', blad: data.error || T.bladSieci, domena, wiersze: [] });
        return;
      }
      track('narzedzie_content_plan_ai_wynik', { lang: jezyk, tematow: lista.length });
      setStan({ status: 'done', blad: null, domena: p.domena || domena, wiersze: lista });
    } catch {
      setStan({ status: 'error', blad: T.bladSieci, domena, wiersze: [] });
    } finally {
      clearTimeout(zegar);
    }
  }

  function pobierzCsv() {
    if (!stan.wiersze.length) return;
    const naglowki = ['Miesiac / Month', ...T.kolumny];
    const linie = [
      naglowki.map(csvKomorka).join(','),
      ...stan.wiersze.map((w) => [
        T.miesiac(w.miesiac),
        w.tydzien,
        w.tytul,
        w.fraza,
        w.intencja,
        w.celAi,
      ].map(csvKomorka).join(',')),
    ];
    const zawartosc = `\uFEFF${linie.join('\r\n')}\r\n`;
    const blob = new Blob([zawartosc], { type: 'text/csv;charset=utf-8' });
    const adresBlob = URL.createObjectURL(blob);
    const a = document.createElement('a');
    const bezpieczna = String(stan.domena || 'plan').replace(/[^a-z0-9.-]+/gi, '-');
    a.href = adresBlob;
    a.download = `content-plan-90d-${bezpieczna}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(adresBlob), 1000);
    track('narzedzie_content_plan_ai_csv', { lang: jezyk });
  }

  function zaladujDemo() {
    const domyslnaDomena = jezyk === 'de' ? 'ihre-cnc-technik.de' : jezyk === 'en' ? 'acme-industrial.com' : 'twoja-produkcja.pl';
    const domena = url.trim() ? wyczyscDomene(url) : domyslnaDomena;
    if (!url.trim()) setUrl(domena);
    const wiersze = zbudujDemoPlan(domena, branza, jezyk);
    track('narzedzie_content_plan_ai_demo', { lang: jezyk });
    setStan({ status: 'done', blad: null, domena, wiersze });
  }

  return (
    <div id="generator-content-planu" role="region" aria-labelledby="cpg-tytul" className="cpg-karta">
      <style>{CSS_CPG}</style>
      <div>
        <h2 id="cpg-tytul" className="sz-h3" style={{ margin: 0 }}>{T.tytul}</h2>
        <p className="sz-przypis" style={{ margin: '0.25rem 0 0' }}>{T.opis}</p>
      </div>

      <form onSubmit={generujPlan} style={{ display: 'grid', gap: '0.85rem' }}>
        <div className="cpg-pola">
          <div>
            <label htmlFor="cpg-url" className="cpg-etykieta">{T.urlLabel}</label>
            <input
              ref={poleUrlRef}
              id="cpg-url"
              name="url"
              type="text"
              inputMode="url"
              autoComplete="url"
              required
              maxLength={250}
              {...walid}
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder={T.urlPh}
              className="cpg-pole"
            />
          </div>
          <div>
            <label htmlFor="cpg-branza" className="cpg-etykieta">{T.branzaLabel}</label>
            <input
              id="cpg-branza"
              name="branza"
              type="text"
              maxLength={120}
              {...walid}
              value={branza}
              onChange={(e) => setBranza(e.target.value)}
              placeholder={T.branzaPh}
              className="cpg-pole"
            />
          </div>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem', alignItems: 'center' }}>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={stan.status === 'loading'}
            aria-busy={stan.status === 'loading' ? 'true' : undefined}
            data-cta="content_plan_ai_submit"
          >
            {stan.status === 'loading' ? T.trwa : T.start}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            disabled={stan.status === 'loading'}
            onClick={zaladujDemo}
            data-cta="content_plan_ai_demo"
          >
            {T.demo}
          </button>
        </div>
      </form>

      {stan.status === 'error' && (
        <p role="alert" className="narz-blad" style={{ margin: 0 }}>{stan.blad}</p>
      )}

      {stan.status === 'done' && stan.wiersze.length > 0 && (
        <div aria-live="polite" style={{ display: 'grid', gap: '0.85rem' }}>
          <div className="cpg-pasek-wyniku">
            <strong style={{ color: 'var(--color-text-dark)', fontSize: '0.95rem' }}>
              {T.podsumowanie(stan.domena)}
            </strong>
            <button
              type="button"
              className="btn btn-secondary"
              style={{ padding: '0.55rem 1rem', fontSize: '0.88rem' }}
              onClick={pobierzCsv}
              data-cta="content_plan_ai_csv"
            >
              {T.pobierz}
            </button>
          </div>

          <div className="cpg-tabela-wrap">
            <table className="cpg-tabela">
              <thead>
                <tr>
                  <th scope="col">{T.kolumny[0]}</th>
                  <th scope="col">{T.kolumny[1]}</th>
                  <th scope="col">{T.kolumny[2]}</th>
                  <th scope="col">{T.kolumny[3]}</th>
                  <th scope="col">{T.kolumny[4]}</th>
                </tr>
              </thead>
              <tbody>
                {stan.wiersze.map((w) => (
                  <tr key={`${w.tydzien}-${w.tytul}`}>
                    <td style={{ whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>
                      <strong>{T.tydz(w.tydzien)}</strong>
                      <span style={{ display: 'block', fontSize: '0.76rem', color: 'var(--w-tusz-2)' }}>
                        {T.miesiac(w.miesiac)}
                      </span>
                    </td>
                    <td><strong>{w.tytul}</strong></td>
                    <td style={{ fontFamily: 'var(--w-mono, monospace)', fontSize: '0.82rem' }}>{w.fraza}</td>
                    <td>
                      <span className={`cpg-intencja cpg-intencja--${klasaIntencji(w.intencja)}`}>
                        {w.intencja}
                      </span>
                    </td>
                    <td style={{ color: 'var(--w-tusz-2)' }}>{w.celAi}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
