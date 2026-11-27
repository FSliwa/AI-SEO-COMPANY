'use client';

// Deterministyczny Audytor Cytowalnosci GEO i Blokow Odpowiedzi (PL + EN).
// Endpoint: POST ${PANEL_API}/cytowalnosc-geo z { url, konkurentUrl, lang: 'pl' | 'en' }.
// Obsluguje ?url=, ?vs= oraz ?wynik=<uuid> (GET ${PANEL_API}/wynik/<id>) i przycisk 1-klik DEMO.

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/i18n/routing';
import { DEMO, PANEL_API } from '@/lib/narzedziaApi';
import { CENY } from '@/lib/narzedziaLiczby';
import { hash } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';
import { useParametrUrl, zapiszParametry } from '@/lib/narzedzia/parametrUrl';
import LinkWyniku, { PrzykladAdresu } from '@/components/narzedzia/LinkWyniku';
import { Ocena, PasekDemo, Postep } from '@/components/narzedzia/Wspolne';
import Zwin from '@/components/narzedzia/Zwin';
import { CSS_SPRINT2, odmianaPl, wyczyscDomene } from './wspolneSprint2';

function wartoscKryterium(v) {
  if (typeof v === 'number') return Math.max(0, Math.min(100, Math.round(v)));
  if (v && typeof v === 'object') {
    const n = Number(v.ocena ?? v.wynik ?? v.punkty ?? v.procent ?? 0);
    return Number.isFinite(n) ? Math.max(0, Math.min(100, Math.round(n))) : 0;
  }
  return 0;
}

function kolorPaska(pkt) {
  if (pkt >= 75) return '#047857';
  if (pkt >= 50) return '#b45309';
  return '#b3261e';
}

function demoCytowalnosc(surowyUrl, surowyKonkurent, en) {
  const domena = wyczyscDomene(surowyUrl || 'twojafirma.pl', en ? 'yourcompany.com' : 'twojafirma.pl');
  const domenaKonk = wyczyscDomene(surowyKonkurent || 'ai-seo-company.pl', 'ai-seo-company.pl');
  const wzorcowa = domena.includes('ai-seo-company');

  return {
    ok: true,
    id: null,
    domena,
    url: `https://www.${domena}/`,
    ocena: wzorcowa ? 94 : 61,
    kryteria: wzorcowa
      ? { answerFirst: 95, dlugoscBlokow: 92, gestoscFaktow: 96, naglowkiPytania: 90, listyTabele: 95, schemaAutor: 94 }
      : { answerFirst: 48, dlugoscBlokow: 64, gestoscFaktow: 52, naglowkiPytania: 58, listyTabele: 70, schemaAutor: 74 },
    symulacjaAi: wzorcowa
      ? {
          naglowek: en ? 'How much does B2B SEO & GEO cost in 2026?' : 'Ile kosztuje pozycjonowanie stron i widoczność w AI w 2026 roku?',
          najlepszyBlok: en
            ? 'Monthly B2B SEO & GEO retainers start at EUR 450 net (Standard) and EUR 590 net (Booster Pack with a custom Next.js SSR website for EUR 0 upfront under a 3-month minimum agreement), covering technical audits, structured data and AI search citations.'
            : 'Miesięczne pozycjonowanie stron B2B i GEO zaczyna się od 1 900 zł netto w pakiecie Standard oraz 2 500 zł netto w pakiecie Booster Pack (w tym nowa strona w Next.js za 0 zł na start przy min. 3 mies. umowy), obejmując audyt, treści z weryfikacją faktów i dane JSON-LD.',
          gotowyDoCytatu: true,
        }
      : {
          naglowek: en ? 'Our services and company offer' : 'Nasza oferta i kompleksowe usługi dla firm',
          najlepszyBlok: en
            ? 'We are a dynamic team of specialists offering comprehensive, tailored solutions for modern businesses looking to grow online with innovative strategies and individual consulting.'
            : 'Jesteśmy dynamicznie rozwijającym się zespołem specjalistów oferującym kompleksowe rozwiązania dopasowane do indywidualnych potrzeb nowoczesnych przedsiębiorstw szukających rozwoju.',
          gotowyDoCytatu: false,
        },
    bloki: wzorcowa
      ? [
          {
            naglowek: en ? 'H2: How much does B2B SEO & GEO cost in 2026?' : 'H2: Ile kosztuje pozycjonowanie stron i GEO w 2026 roku?',
            slow: 62,
            ocena: 96,
            powod: en ? 'Ideal 40-75 word Answer-First definition + concrete prices' : 'Wzorcowa definicja Answer-First (40-75 słów) + konkretne kwoty',
            fragment: en
              ? 'Monthly B2B SEO & GEO retainers start at EUR 450 net (Standard) and EUR 590 net (Booster Pack)...'
              : 'Miesięczne pozycjonowanie stron B2B i GEO zaczyna się od 1 900 zł netto w pakiecie Standard...',
          },
          {
            naglowek: en ? 'H2: Next.js SSR vs WordPress in Core Web Vitals' : 'H2: Next.js SSR kontra WordPress w Core Web Vitals',
            slow: 118,
            ocena: 92,
            powod: en ? 'Comparison table + numeric thresholds (LCP <= 2.5 s, INP <= 200 ms)' : 'Tabela porównawcza + progi liczbowe (LCP <= 2,5 s, INP <= 200 ms)',
            fragment: en
              ? 'Server-Side Rendering delivers semantic HTML and JSON-LD in 140 ms TTFB without blocking scripts...'
              : 'Renderowanie po stronie serwera dostarcza semantyczny HTML i JSON-LD w 140 ms TTFB...',
          },
          {
            naglowek: en ? 'H3: What deliverables are tracked in the client panel?' : 'H3: Jakie dowody pracy widzisz co miesiąc w panelu klienta?',
            slow: 74,
            ocena: 91,
            powod: en ? 'Question heading + bulleted deliverables list' : 'Nagłówek pytający + wypunktowana lista rezultatów',
            fragment: en
              ? 'Every task includes live Search Console queries, published URLs, acquired backlinks and AI prompt checks.'
              : 'Każde zadanie zawiera żywe frazy z Search Console, opublikowane adresy URL, linki i testy AI.',
          },
        ]
      : [
          {
            naglowek: en ? 'H2: About our company' : 'H2: O naszej firmie',
            slow: 245,
            ocena: 38,
            powod: en ? 'Wall of promotional text (> 220 words), zero numbers or entities' : 'Ściana ogólników (> 220 słów), brak liczb i twardych faktów',
            fragment: en
              ? 'For many years we have provided high quality services with passion and commitment to every client...'
              : 'Od wielu lat świadczymy najwyższej jakości usługi z pasją i pełnym zaangażowaniem dla klientów...',
          },
          {
            naglowek: en ? 'H2: Why choose our offer?' : 'H2: Dlaczego warto wybrać naszą ofertę?',
            slow: 68,
            ocena: 74,
            powod: en ? 'Good chunk length (40-75 words), but lacks measurable proof' : 'Dobra długość akapitu (40-75 słów), ale brak konkretnych danych',
            fragment: en
              ? 'Clients receive dedicated support, transparent reporting within 24 hours and certified ISO workflows.'
              : 'Klienci otrzymują wsparcie opiekuna, raportowanie w 24 godziny oraz procesy zgodne z normą ISO.',
          },
          {
            naglowek: en ? 'H3: Technical specifications & pricing' : 'H3: Specyfikacja techniczna i wycena',
            slow: 54,
            ocena: 82,
            powod: en ? 'Structured list + numeric units ready for RAG extraction' : 'Lista punktowana + jednostki liczbowe gotowe do ekstrakcji RAG',
            fragment: en
              ? 'Implementation takes 14 business days, includes 12 months SLA warranty and starts from EUR 1,200.'
              : 'Wdrożenie trwa 14 dni roboczych, obejmuje 12 miesięcy gwarancji SLA i zaczyna się od 4 900 zł.',
          },
          {
            naglowek: en ? 'H3: Contact us today' : 'H3: Skontaktuj się z nami',
            slow: 19,
            ocena: 35,
            powod: en ? 'Too short (< 30 words) - navigational filler skipped by LLMs' : 'Zbyt krótki blok (< 30 słów) - wypełniacz pomijany przez modele AI',
            fragment: en
              ? 'Fill out the contact form below and our advisor will call you back shortly.'
              : 'Wypełnij formularz kontaktowy poniżej, a nasz doradca oddzwoni najszybciej jak to możliwe.',
          },
        ],
    konkurent: {
      domena: domenaKonk,
      url: `https://www.${domenaKonk}/`,
      ocena: 91,
      kryteria: { answerFirst: 92, dlugoscBlokow: 89, gestoscFaktow: 94, naglowkiPytania: 88, listyTabele: 92, schemaAutor: 91 },
    },
    rekomendacje: wzorcowa
      ? [
          en
            ? 'Keep updating factual figures and source dates quarterly so Perplexity and ChatGPT prefer your fresh RAG chunks.'
            : 'Aktualizuj liczby i daty źródeł raz na kwartał, aby Perplexity i ChatGPT preferowały Twoje świeże sekcje.',
          en
            ? 'Expand comparison tables to remaining subpages to capture high-intent "X vs Y" AI Overview slots.'
            : 'Dodaj tabele porównawcze na kolejnych podstronach ofertowych pod zapytania „X czy Y” w AI Overviews.',
        ]
      : [
          en
            ? 'Add a 45-70 word Answer-First paragraph immediately below every H2 heading stating price, timeframe and scope.'
            : 'Dodaj bezpośrednio pod każdym nagłówkiem H2 akapit Answer-First (45-70 słów) z ceną, czasem realizacji i zakresem.',
          en
            ? 'Replace generic promotional adjectives ("dynamic team", "tailored solutions") with verifiable numbers, units and named standards.'
            : 'Zamień przymiotniki sprzedażowe („kompleksowe usługi”, „indywidualne podejście”) na weryfikowalne liczby, normy i widełki cen.',
          en
            ? 'Rewrite vague H2 headings ("About us", "Our offer") into buyer questions ("How much does X cost?", "How long does X take?").'
            : 'Przepisz ogólne nagłówki H2 („O nas”, „Oferta”) na pytania klientów („Ile kosztuje X?”, „Ile trwa wdrożenie X?”).',
          en
            ? 'Convert long 240+ word paragraphs into HTML <table> comparisons or bulleted lists with explicit authorship and Article/Service JSON-LD.'
            : 'Rozbij ściany tekstu (> 200 słów) na semantyczne tabele <table> i listy punktowane oraz dodaj autora i datę w JSON-LD.',
        ],
  };
}

export function CytowalnoscGeoClient() {
  const en = useLocale() === 'en';
  const jezyk = en ? 'en-US' : 'pl-PL';
  const [adres, setAdres] = useState('');
  const [konkurentUrl, setKonkurentUrl] = useState('');
  const [stan, setStan] = useState({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
  const poleRef = useRef(null);
  const wynikRef = useRef(null);

  useParametrUrl(['url', 'vs', 'wynik'], ({ url, vs, wynik }) => {
    if (url) setAdres(url);
    if (vs) setKonkurentUrl(vs);
    if (wynik && !DEMO && /^[0-9a-f-]{36}$/i.test(wynik)) {
      setStan({ status: 'loading', blad: null, wynik: null, id: wynik, trybDemo: false });
      fetch(`${PANEL_API}/wynik/${encodeURIComponent(wynik)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.ok && data.podglad) {
            const p = data.podglad;
            if (!url && (p.url || p.domena)) setAdres(p.url || p.domena);
            if (!vs && p.konkurent?.domena) setKonkurentUrl(p.konkurent.domena);
            setStan({ status: 'done', blad: null, wynik: p, id: wynik, trybDemo: false });
          } else {
            setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false });
          }
        })
        .catch(() => setStan({ status: 'idle', blad: null, wynik: null, id: null, trybDemo: false }));
    }
  });

  useEffect(() => {
    if (stan.status === 'done') wynikRef.current?.focus({ preventScroll: true });
  }, [stan.status]);

  function zaladujDemo() {
    const u = adres.trim() || (en ? 'yourcompany.com' : 'twojafirma.pl');
    const k = konkurentUrl.trim() || 'ai-seo-company.pl';
    if (!adres.trim()) setAdres(u);
    if (!konkurentUrl.trim()) setKonkurentUrl(k);
    const d = demoCytowalnosc(u, k, en);
    track('narzedzie_demo', { narzedzie: 'cytowalnosc_geo' });
    setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
  }

  async function uruchomAudyt(e) {
    e.preventDefault();
    const wejscie = adres.trim();
    const wejscieKonk = konkurentUrl.trim();
    if (!wejscie) {
      poleRef.current?.focus();
      return;
    }

    setStan({ status: 'loading', blad: null, wynik: null, id: null, trybDemo: false });
    zapiszParametry({ url: wejscie, vs: wejscieKonk || null, wynik: null });
    track('narzedzie_start', { narzedzie: 'cytowalnosc_geo', zKonkurentem: Boolean(wejscieKonk) });

    if (DEMO) {
      await new Promise((r) => setTimeout(r, 800));
      const d = demoCytowalnosc(wejscie, wejscieKonk, en);
      track('narzedzie_wynik', { narzedzie: 'cytowalnosc_geo', wynik: d.ocena });
      setStan({ status: 'done', blad: null, wynik: d, id: null, trybDemo: true });
      return;
    }

    const ctrl = new AbortController();
    const zegar = setTimeout(() => ctrl.abort(), 45_000);
    try {
      const res = await fetch(`${PANEL_API}/cytowalnosc-geo`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          url: wejscie,
          konkurentUrl: wejscieKonk || undefined,
          lang: en ? 'en' : 'pl',
        }),
        signal: ctrl.signal,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) {
        setStan({
          status: 'error',
          blad: data.error || (en ? 'Could not analyze this URL right now. Verify the address and try again.' : 'Nie udało się przeanalizować tego adresu. Sprawdź poprawność URL i spróbuj ponownie.'),
          wynik: null,
          id: null,
          trybDemo: false,
        });
        return;
      }
      const w = data.podglad || data;
      const runId = data.id || null;
      if (runId) zapiszParametry({ wynik: runId });
      track('narzedzie_wynik', { narzedzie: 'cytowalnosc_geo', wynik: w.ocena ?? w.wynik });
      setStan({ status: 'done', blad: null, wynik: w, id: runId, trybDemo: false });
    } catch (err) {
      setStan({
        status: 'error',
        blad: err?.name === 'AbortError'
          ? (en ? 'The page took longer than 45 s to respond. Check if a firewall blocks crawlers.' : 'Strona odpowiadała dłużej niż 45 s. Sprawdź, czy zapora WAF nie blokuje zapytań.')
          : (en ? 'Could not reach the diagnostic server. Check your connection and try again.' : 'Brak połączenia z serwerem diagnostycznym. Sprawdź połączenie i spróbuj ponownie.'),
        wynik: null,
        id: null,
        trybDemo: false,
      });
    } finally {
      clearTimeout(zegar);
    }
  }

  function wybierzPakietKontakt(plan) {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
    }
    track('narzedzie_bofu_klik', { narzedzie: 'cytowalnosc_geo', plan });
  }

  const w = stan.wynik;
  const ocena = Math.max(0, Math.min(100, Math.round(Number(w?.ocena ?? w?.wynik ?? 0))));
  const domena = w ? (w.domena || wyczyscDomene(w.url || adres)) : '';
  const kr = w?.kryteria || {};
  const konk = w?.konkurent && (w.konkurent.domena || w.konkurent.url) ? w.konkurent : null;
  const ocenaKonk = konk ? Math.max(0, Math.min(100, Math.round(Number(konk.ocena ?? konk.wynik ?? 0)))) : null;
  const bloki = Array.isArray(w?.bloki) ? w.bloki : [];
  const rekomendacje = Array.isArray(w?.rekomendacje) ? w.rekomendacje : [];
  const sym = w?.symulacjaAi || null;
  const kotwicaKontakt = hash('kontakt', en ? 'en' : 'pl');

  const definicjeKryteriow = [
    {
      klucz: 'answerFirst',
      nazwa: en ? 'Answer-First Openings (8-55 words)' : 'Otwarcia Answer-First (8-55 słów)',
      opis: en ? 'Direct factual sentence right after H2/H3 before marketing fluff' : 'Bezpośrednie zdanie z konkretem zaraz pod H2/H3 zamiast wstępu ogólnego',
    },
    {
      klucz: 'dlugoscBlokow',
      nazwa: en ? 'RAG Chunk Length Hygiene (40-180 words)' : 'Długość bloków pod chunking RAG (40-180 słów)',
      opis: en ? 'Self-contained 40-180 word passages easy to quote verbatim' : 'Samodzielne sekcje 40-180 słów łatwe do wycięcia przez LLM',
    },
    {
      klucz: 'gestoscFaktow',
      nazwa: en ? 'Fact, Number & Entity Density' : 'Gęstość faktów, liczb i jednostek',
      opis: en ? 'Prices, percentages, standards, dates and verifiable metrics' : 'Ceny, procenty, normy, daty i mierzalne parametry na 100 słów',
    },
    {
      klucz: 'naglowkiPytania',
      nazwa: en ? 'Question-Aligned H2/H3 Headings' : 'Nagłówki H2/H3 zgodne z intencją pytań',
      opis: en ? 'Headings matching real user prompts in ChatGPT & Google AIO' : 'Nagłówki odpowiadające realnym pytaniom w ChatGPT i Google',
    },
    {
      klucz: 'listyTabele',
      nazwa: en ? 'Semantic Lists & HTML Tables' : 'Listy punktowane i tabele <table>',
      opis: en ? 'Structured comparisons and enumerations preferred by AI synthesizers' : 'Ustrukturyzowane zestawienia preferowane w syntezie odpowiedzi AI',
    },
    {
      klucz: 'schemaAutor',
      nazwa: en ? 'Authorship, Dates & Schema E-E-A-T' : 'Autor, daty aktualizacji i JSON-LD',
      opis: en ? 'Named author, dateModified and Article/FAQ/Service schema' : 'Jawny autor, data aktualizacji i spójne dane strukturalne',
    },
  ];

  return (
    <div className="narz-app" id="narzedzie" style={{ maxWidth: '1000px' }}>
      <style>{CSS_SPRINT2}</style>
      <PasekDemo />

      <form className="narz-formularz" onSubmit={uruchomAudyt}>
        <div className="sp2-siatka-pola">
          <div>
            <label htmlFor="geo-url" className="narz-etykieta">
              {en ? 'Page URL to audit for AI citability' : 'Adres podstrony do audytu cytowalności AI'}
            </label>
            <input
              ref={poleRef}
              id="geo-url"
              name="url"
              required
              maxLength={300}
              value={adres}
              onChange={(e) => setAdres(e.target.value)}
              placeholder={en ? 'e.g. yourcompany.com/pricing' : 'np. twojafirma.pl/oferta'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
              aria-invalid={stan.status === 'error' ? 'true' : undefined}
              aria-describedby={stan.status === 'error' ? 'geo-blad' : undefined}
            />
          </div>

          <div>
            <label htmlFor="geo-konkurent" className="narz-etykieta">
              {en ? 'Competitor URL for 1:1 comparison (optional)' : 'Adres podstrony konkurenta 1:1 (opcjonalnie)'}
            </label>
            <input
              id="geo-konkurent"
              name="konkurentUrl"
              maxLength={300}
              value={konkurentUrl}
              onChange={(e) => setKonkurentUrl(e.target.value)}
              placeholder={en ? 'e.g. competitor.com/pricing' : 'np. konkurent.pl/oferta'}
              className="narz-pole"
              inputMode="url"
              autoComplete="url"
            />
          </div>
        </div>

        <div className="sp2-akcje-form">
          <button type="submit" className="btn btn-primary" disabled={stan.status === 'loading'} data-cta="narzedzie_cytowalnosc_geo_start">
            {stan.status === 'loading'
              ? (en ? 'Splitting HTML into RAG chunks...' : 'Dzielę treść na bloki RAG...')
              : (en ? 'Check GEO Citability Score' : 'Sprawdź cytowalność strony w AI')}
          </button>
          <button type="button" className="sp2-btn-demo" onClick={zaladujDemo} disabled={stan.status === 'loading'}>
            {en ? 'See instant DEMO' : 'Zobacz wynik DEMO'}
          </button>
        </div>

        <PrzykladAdresu
          adresy={['ai-seo-company.pl/cennik-pozycjonowania', 'ai-seo-company.pl']}
          onWybierz={(a) => {
            setAdres(a);
            poleRef.current?.focus();
          }}
        />

        <p className="narz-mikro" style={{ margin: 0 }}>
          {en
            ? '100% deterministic & free (no email required): splits your page by H2/H3 headings into RAG passages, scores 6 AI citation criteria and simulates how Google AI Overviews and ChatGPT extract your answer.'
            : '100% deterministycznie i za darmo (bez e-maila): narzędzie dzieli podstronę po nagłówkach H2/H3 na bloki RAG, ocenia 6 kryteriów cytowalności i symuluje wycinek w AI Overview oraz ChatGPT.'}
        </p>

        {stan.status === 'loading' && (
          <Postep
            kroki={en
              ? [
                  'Fetching server-rendered HTML and stripping navigation boilerplate',
                  'Segmenting H2 and H3 sections into RAG retrieval passages',
                  'Scoring 6 GEO criteria, simulating AI snippet and comparing competitor',
                ]
              : [
                  'Pobieramy czysty kod HTML podstrony i oddzielamy treść główną od menu',
                  'Dzielimy sekcje H2 oraz H3 na bloki odpowiedzi (chunki RAG)',
                  'Oceniamy 6 kryteriów GEO, symulujemy wycinek AI i porównujemy konkurenta',
                ]}
            co={1100}
          />
        )}

        {stan.status === 'error' && (
          <p id="geo-blad" role="alert" className="narz-blad">
            {stan.blad}
          </p>
        )}
      </form>

      <Zwin otwarte={stan.status === 'done' && Boolean(w)}>
        {w && (
          <div className="narz-wynik" style={{ marginTop: '1.25rem' }} aria-live="polite">
            {stan.trybDemo && !DEMO && (
              <p className="sp2-demo-baner" role="status">
                {en
                  ? 'Sample DEMO preview loaded. Enter your own URL above and click "Check GEO Citability Score" for a live scan.'
                  : 'Wyświetlasz przykładowy wynik DEMO. Wpisz wyżej własny adres URL i kliknij „Sprawdź cytowalność strony w AI”, aby wykonać skan na żywo.'}
              </p>
            )}

            {/* 1. Naglowek z ocena kolowa 0-100 (+ opcjonalny konkurent) */}
            <div className="narz-wynik-glowa">
              <Ocena wynik={ocena} podpis="GEO Score" />
              <div>
                <p className="narz-wynik-domena" ref={wynikRef} tabIndex={-1}>
                  {w.url || domena}
                </p>
                <p className="narz-wynik-opis">
                  {ocena >= 80
                    ? (en
                      ? 'High RAG extractability: your headings, concise answer blocks and factual density make it easy for ChatGPT, Perplexity and Google AI Overviews to quote your page.'
                      : 'Wysoka podatność na cytowanie: Twoje nagłówki, zwięzłe bloki odpowiedzi i nasycenie liczbami ułatwiają ChatGPT, Perplexity i Google AI Overviews zacytowanie strony.')
                    : ocena >= 50
                    ? (en
                      ? 'Moderate citability: some sections are extractable, but long promotional paragraphs or missing Answer-First definitions reduce citation probability.'
                      : 'Umiarkowana cytowalność: część sekcji nadaje się do ekstrakcji, ale długie akapity sprzedażowe lub brak definicji Answer-First obniżają szansę na cytat.')
                    : (en
                      ? 'Low AI citability: language models encounter walls of generic text without concise factual blocks, tables or verifiable metrics.'
                      : 'Niska cytowalność w AI: modele językowe trafiają na ściany ogólnego tekstu bez zwięzłych bloków odpowiedzi, tabel i weryfikowalnych liczb.')}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '0.55rem' }}>
                  <span className="sp2-pigulka sp2-pigulka--neutral">
                    {en
                      ? `${bloki.length} H2/H3 passages analyzed`
                      : `Przeanalizowano ${bloki.length} ${odmianaPl(bloki.length, 'blok H2/H3', 'bloki H2/H3', 'bloków H2/H3')}`}
                  </span>
                  {konk && ocenaKonk !== null && (
                    <span className={`sp2-pigulka ${ocena >= ocenaKonk ? 'sp2-pigulka--ok' : 'sp2-pigulka--blad'}`}>
                      {en
                        ? `vs ${wyczyscDomene(konk.domena || konk.url)}: ${ocena} vs ${ocenaKonk}/100`
                        : `kontra ${wyczyscDomene(konk.domena || konk.url)}: ${ocena} do ${ocenaKonk}/100`}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* 2. Symulacja wycinka w AI Overview / ChatGPT */}
            {sym && (
              <div className="sp2-sekcja-wyniku">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <h2 className="narz-h2">
                    {en ? 'Simulated Snippet in AI Overview / ChatGPT' : 'Symulacja wycinka w AI Overview / ChatGPT'}
                  </h2>
                  <span className={`sp2-pigulka ${sym.gotowyDoCytatu ? 'sp2-pigulka--ok' : 'sp2-pigulka--uwaga'}`}>
                    {sym.gotowyDoCytatu
                      ? (en ? 'Ready for direct AI citation' : 'Gotowy do bezpośredniego cytatu')
                      : (en ? 'Weak snippet - needs Answer-First rewrite' : 'Słaby wycinek - wymaga przepisania Answer-First')}
                  </span>
                </div>
                <div className="sp2-ai-wycinek">
                  {sym.naglowek && (
                    <p className="narz-mikro" style={{ margin: 0, fontWeight: 600, color: 'var(--w-tusz)' }}>
                      {en ? 'Matched section heading:' : 'Dopasowany nagłówek sekcji:'} {sym.naglowek}
                    </p>
                  )}
                  <blockquote className="sp2-ai-cytat">
                    {sym.najlepszyBlok || (en ? 'No self-contained factual passage (40-180 words) found on this page.' : 'Nie znaleziono na stronie samodzielnego bloku faktograficznego (40-180 słów).')}
                  </blockquote>
                  <p className="narz-mikro" style={{ margin: 0 }}>
                    {en
                      ? 'Retrieval-Augmented Generation (RAG) pipelines rank self-contained 40-180 word sections opening with an 8-55 word factual sentence highest.'
                      : 'Systemy RAG w Google AI Overviews, ChatGPT i Perplexity najwyżej oceniają samodzielne sekcje 40-180 słów otwierane zdaniem Answer-First (8-55 słów) z liczbami i jednostkami.'}
                  </p>
                </div>
              </div>
            )}

            {/* 3. 6 paskow kryteriow RAG (+ opcjonalne porownanie 1:1 z konkurentem) */}
            <div className="sp2-sekcja-wyniku">
              <h2 className="narz-h2">
                {en ? '6 Deterministic RAG Citability Criteria' : '6 deterministycznych kryteriów cytowalności RAG'}
              </h2>
              <p className="narz-mikro">
                {konk
                  ? (en
                    ? `Each dimension is scored 0-100 and benchmarked 1:1 against ${wyczyscDomene(konk.domena || konk.url)}.`
                    : `Każdy wymiar oceniamy w skali 0-100 i zestawiamy 1:1 z podstroną ${wyczyscDomene(konk.domena || konk.url)}.`)
                  : (en
                    ? 'Scores reflect structural and factual signals measured in Princeton/Georgia Tech GEO research.'
                    : 'Oceny odzwierciedlają sygnały strukturalne i faktograficzne z badań GEO (Princeton / Georgia Tech).')}
              </p>

              <div className="sp2-kryteria-siatka">
                {definicjeKryteriow.map((k) => {
                  const pkt = wartoscKryterium(kr[k.klucz]);
                  const pktKonk = konk?.kryteria ? wartoscKryterium(konk.kryteria[k.klucz]) : null;
                  const roznica = pktKonk !== null ? pkt - pktKonk : null;
                  const kolor = kolorPaska(pkt);
                  return (
                    <div key={k.klucz} className="sp2-kryterium">
                      <div className="sp2-kryterium-gora">
                        <h3 className="sp2-h3" style={{ margin: 0, fontSize: '0.95rem' }}>{k.nazwa}</h3>
                        <span style={{ fontWeight: 700, color: kolor, fontVariantNumeric: 'tabular-nums', whiteSpace: 'nowrap' }}>
                          {pkt}/100
                        </span>
                      </div>
                      <div className="sp2-pasek-tlo" role="progressbar" aria-valuenow={pkt} aria-valuemin={0} aria-valuemax={100} aria-label={k.nazwa}>
                        <div className="sp2-pasek-wypelnienie" style={{ width: `${pkt}%`, background: kolor }} />
                      </div>
                      <p className="narz-mikro" style={{ marginTop: '0.45rem' }}>{k.opis}</p>
                      {pktKonk !== null && (
                        <p className="narz-mikro" style={{ marginTop: '0.25rem', fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: roznica >= 0 ? '#047857' : '#b3261e' }}>
                          {en ? 'Competitor:' : 'Konkurent:'} {pktKonk}/100 ({roznica >= 0 ? `+${roznica}` : roznica})
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 4. Tabela blokow H2/H3 */}
            {bloki.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">
                  {en ? 'H2/H3 Content Blocks Breakdown' : 'Tabela bloków treści H2/H3 i ocena chunków'}
                </h2>
                <p className="narz-mikro" style={{ marginBottom: '0.65rem' }}>
                  {en
                    ? 'Optimal Answer-First opening sentence: 8-55 words; full self-contained section chunk: 40-180 words.'
                    : 'Optymalne zdanie otwierające Answer-First: 8-55 słów; pełna samodzielna sekcja pod RAG: 40-180 słów.'}
                </p>
                <div className="narz-tabela-wrap">
                  <table className="narz-tabela">
                    <thead>
                      <tr>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Section Heading & Excerpt' : 'Nagłówek sekcji i wycinek'}</th>
                        <th scope="col">{en ? 'Words' : 'Słowa'}</th>
                        <th scope="col">{en ? 'Score' : 'Ocena'}</th>
                        <th scope="col" style={{ textAlign: 'left' }}>{en ? 'Diagnostic Verdict' : 'Diagnoza bloku'}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {bloki.map((b, idx) => {
                        const pkt = Math.max(0, Math.min(100, Math.round(Number(b.ocena ?? 0))));
                        const klasa = pkt >= 75 ? 'sp2-pigulka--ok' : pkt >= 50 ? 'sp2-pigulka--uwaga' : 'sp2-pigulka--blad';
                        return (
                          <tr key={`${b.naglowek || 'blok'}-${idx}`}>
                            <th scope="row" style={{ textAlign: 'left' }}>
                              <span className="narz-silnik">{b.naglowek || (en ? `Section #${idx + 1}` : `Sekcja #${idx + 1}`)}</span>
                              {b.fragment && <span className="narz-mikro">{b.fragment}</span>}
                            </th>
                            <td style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 600 }}>
                              {Number(b.slow ?? 0).toLocaleString(jezyk)}
                            </td>
                            <td>
                              <span className={`sp2-pigulka ${klasa}`}>{pkt}/100</span>
                            </td>
                            <td className="narz-mikro" style={{ textAlign: 'left', color: 'var(--w-tusz)' }}>
                              {b.powod || '-'}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Lista rekomendacji naprawczych */}
            {rekomendacje.length > 0 && (
              <div className="sp2-sekcja-wyniku">
                <h2 className="narz-h2">
                  {en
                    ? `Actionable GEO Recommendations (${rekomendacje.length})`
                    : `Rekomendacje naprawcze pod cytowania AI (${rekomendacje.length} ${odmianaPl(rekomendacje.length, 'krok', 'kroki', 'kroków')})`}
                </h2>
                <ul className="narz-problemy" style={{ marginTop: '0.75rem' }}>
                  {rekomendacje.map((rek, i) => {
                    const tekst = typeof rek === 'string' ? rek : (rek?.opis || rek?.tytul || '');
                    const tytul = typeof rek === 'object' && rek?.tytul && rek?.opis ? rek.tytul : null;
                    return (
                      <li key={i} className={`narz-problem ${ocena >= 80 ? 'narz-problem--ok' : 'narz-problem--ostrzezenie'}`}>
                        {tytul && <p className="narz-problem-tytul"><strong>{tytul}</strong></p>}
                        <p className="narz-problem-fix" style={{ margin: 0 }}>{tekst}</p>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

            {/* 6. Most konwersyjny BOFU */}
            <div className="sp2-bofu">
              <h2>
                {ocena < 75
                  ? (en
                    ? 'Turn promotional pages into Answer-First sources cited by ChatGPT & Google AI'
                    : 'Przebudujemy Twoje podstrony ofertowe w źródła cytowane przez ChatGPT i przegląd AI Google')
                  : (en
                    ? 'Strong on-page structure - now verify how 5 live AI engines answer your buyer prompts'
                    : 'Dobra struktura bloków - sprawdź teraz, kogo poleca 5 silników AI na zapytania Twoich klientów')}
              </h2>
              <p>
                {en
                  ? `In our AI Visibility Audit (€${CENY.audytAi.eur} net) we test 30 commercial prompts across ChatGPT, Perplexity, Gemini and Google AI Overviews, and in our monthly SEO & GEO retainers (from €${CENY.seoStandard.eur} net/mo) we write fact-checked Answer-First copy and comparison tables.`
                  : `W Audycie Widoczności w AI (${CENY.audytAi.pln} zł netto) sprawdzamy 30 pytań zakupowych Twoich klientów w ChatGPT, Perplexity, Gemini i AI Overviews, a w pakietach SEO i GEO (od ${CENY.seoStandard.pln.toLocaleString('pl-PL')} zł netto/mies.) wdrażamy bloki Answer-First, tabele i dane JSON-LD.`}
              </p>
              <div className="sp2-bofu-akcje">
                <a
                  href={kotwicaKontakt}
                  className="btn btn-primary"
                  onClick={() => wybierzPakietKontakt('Audyt widocznosci w AI')}
                  data-cta="cytowalnosc_geo_bofu_audyt_ai"
                >
                  {en ? `Order AI Visibility Audit (€${CENY.audytAi.eur} net)` : `Zamów Audyt Widoczności w AI (${CENY.audytAi.pln} zł netto)`}
                </a>
                <Link href="/pozycjonowanie-w-ai" className="sp2-bofu-link">
                  {en ? 'Explore AI Search Optimization (GEO)' : 'Zobacz usługę pozycjonowania w AI (GEO)'}
                </Link>
              </div>
            </div>

            <LinkWyniku
              narzedzie="cytowalnosc_geo"
              tryb={stan.id ? 'wynik' : 'wypelnij'}
              parametry={{ url: w.url || domena, vs: konk ? (konk.url || konk.domena) : null, wynik: stan.id || null }}
              podsumowanie={en
                ? `GEO Citability Score for ${domena}: ${ocena}/100`
                : `Ocena cytowalności GEO dla ${domena}: ${ocena}/100`}
            />
          </div>
        )}
      </Zwin>
    </div>
  );
}

export default CytowalnoscGeoClient;
