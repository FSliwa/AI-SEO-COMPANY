import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import AppleFaq from '@/components/service/AppleFaq';
import RaportBledowAkcje from '@/components/RaportBledowAkcje';
import { Link } from '@/i18n/routing';
import { PANEL_API } from '@/lib/narzedziaApi';
import styles from '@/components/porownania/porownania.module.css';

const BASE = 'https://www.ai-seo-company.pl';

// Dane przykładowe wyłącznie dla lokalnego podglądu technicznego (NEXT_PUBLIC_PODGLAD_PARTII=1),
// zanim licznik unikalnych domen w audit_domain_stats przekroczy próg publikacji N >= 100.
const DANE_PODGLADU = {
  ok: true,
  prog: 100,
  gotowe: false,
  podgladTechniczny: true,
  domen: 120,
  odDnia: '2026-11-12',
  doDnia: '2026-11-20',
  sredniaOcena: 68.4,
  medianaOceny: 71,
  kategorieSrednie: { techniczne: 74.2, tresc: 69.5, wydajnosc: 58.1, ai: 64.8 },
  reguly: [
    { id: 'brak_llms', kategoria: 'ai', waga: 'uwaga', zakres: 'witryna', domenZProblemem: 109, odsetek: 90.8, tytulPl: 'Brak pliku llms.txt', tytulEn: 'Missing llms.txt file' },
    { id: 'psi_srednia', kategoria: 'wydajnosc', waga: 'ostrzezenie', zakres: 'witryna', domenZProblemem: 68, odsetek: 56.7, tytulPl: 'Wydajność na telefonie do poprawy (PageSpeed 50-89)', tytulEn: 'Mobile performance needs work (PageSpeed 50-89)' },
    { id: 'obrazy_bez_wymiarow', kategoria: 'wydajnosc', waga: 'uwaga', zakres: 'strona', domenZProblemem: 61, odsetek: 50.8, tytulPl: 'Obrazy bez wymiarów (width i height)', tytulEn: 'Images without width and height attributes' },
    { id: 'brak_danych_organizacji', kategoria: 'ai', waga: 'ostrzezenie', zakres: 'witryna', domenZProblemem: 54, odsetek: 45.0, tytulPl: 'Brak danych strukturalnych firmy (Organization / LocalBusiness)', tytulEn: 'Missing company structured data (Organization / LocalBusiness)' },
    { id: 'obrazy_bez_alt', kategoria: 'tresc', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 49, odsetek: 40.8, tytulPl: 'Obrazy bez tekstu alternatywnego (alt)', tytulEn: 'Images missing alt text' },
    { id: 'brak_opisu', kategoria: 'tresc', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 44, odsetek: 36.7, tytulPl: 'Brak opisu meta (meta description)', tytulEn: 'Missing meta description' },
    { id: 'tytul_dlugi', kategoria: 'tresc', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 41, odsetek: 34.2, tytulPl: 'Długi tytuł (ponad 60 znaków, praktyczna granica widoczności)', tytulEn: 'Long title (over 60 characters, practical visibility limit)' },
    { id: 'lcp', kategoria: 'wydajnosc', waga: 'ostrzezenie', zakres: 'witryna', domenZProblemem: 38, odsetek: 31.7, tytulPl: 'Największy element ładuje się za długo (LCP ponad 2,5 s)', tytulEn: 'Largest element loads too slowly (LCP over 2.5 s)' },
    { id: 'brak_canonical', kategoria: 'techniczne', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 31, odsetek: 25.8, tytulPl: 'Brak adresu kanonicznego', tytulEn: 'Missing canonical URL' },
    { id: 'wiele_h1', kategoria: 'tresc', waga: 'uwaga', zakres: 'strona', domenZProblemem: 29, odsetek: 24.2, tytulPl: 'Kilka nagłówków H1 na stronie', tytulEn: 'Multiple H1 headings on a page' },
    { id: 'malo_tresci', kategoria: 'tresc', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 26, odsetek: 21.7, tytulPl: 'Mało tekstu w kodzie HTML (poniżej 250 słów)', tytulEn: 'Thin text in server HTML (under 250 words)' },
    { id: 'lancuch_przekierowan', kategoria: 'techniczne', waga: 'ostrzezenie', zakres: 'strona', domenZProblemem: 22, odsetek: 18.3, tytulPl: 'Łańcuchy przekierowań', tytulEn: 'Redirect chains' },
    { id: 'boty_ai_zablokowane', kategoria: 'ai', waga: 'ostrzezenie', zakres: 'witryna', domenZProblemem: 19, odsetek: 15.8, tytulPl: 'robots.txt blokuje boty wyszukiwania AI', tytulEn: 'robots.txt blocks AI search bots' },
    { id: 'psi_slaba', kategoria: 'wydajnosc', waga: 'blad', zakres: 'witryna', domenZProblemem: 17, odsetek: 14.2, tytulPl: 'Niska wydajność na telefonie (PageSpeed poniżej 50)', tytulEn: 'Poor mobile performance (PageSpeed below 50)' },
    { id: 'zepsute_linki', kategoria: 'techniczne', waga: 'blad', zakres: 'strona', domenZProblemem: 14, odsetek: 11.7, tytulPl: 'Zepsute linki wewnętrzne', tytulEn: 'Broken internal links' },
  ],
  botyAi: [
    { bot: 'OAI-SearchBot', rola: 'szukanie', sprawdzonoDomen: 120, zablokowanoDomen: 14, odsetekZablokowanych: 11.7 },
    { bot: 'PerplexityBot', rola: 'szukanie', sprawdzonoDomen: 120, zablokowanoDomen: 15, odsetekZablokowanych: 12.5 },
    { bot: 'Claude-SearchBot', rola: 'szukanie', sprawdzonoDomen: 120, zablokowanoDomen: 13, odsetekZablokowanych: 10.8 },
    { bot: 'GPTBot', rola: 'trening_lub_uzytkownik', sprawdzonoDomen: 120, zablokowanoDomen: 28, odsetekZablokowanych: 23.3 },
    { bot: 'ClaudeBot', rola: 'trening_lub_uzytkownik', sprawdzonoDomen: 120, zablokowanoDomen: 24, odsetekZablokowanych: 20.0 },
    { bot: 'Google-Extended', rola: 'trening_lub_uzytkownik', sprawdzonoDomen: 120, zablokowanoDomen: 21, odsetekZablokowanych: 17.5 },
    { bot: 'ChatGPT-User', rola: 'trening_lub_uzytkownik', sprawdzonoDomen: 120, zablokowanoDomen: 9, odsetekZablokowanych: 7.5 },
  ],
};

async function pobierzDane() {
  try {
    const res = await fetch(`${PANEL_API}/statystyki-audytow`, { next: { revalidate: 3600 } });
    if (!res.ok) return DANE_PODGLADU;
    const json = await res.json();
    if (json && json.gotowe && json.domen >= 100) return { ...json, podgladTechniczny: false };
    return { ...DANE_PODGLADU, rzeczywisteDomenyWBazie: json?.domen ?? 0 };
  } catch {
    return DANE_PODGLADU;
  }
}

const KAT_PL = { techniczne: 'Techniczne', tresc: 'Treść i on-page', wydajnosc: 'Wydajność (CWV)', ai: 'Gotowość na AI' };
const KAT_EN = { techniczne: 'Technical', tresc: 'Content & on-page', wydajnosc: 'Performance (CWV)', ai: 'AI readiness' };

export default async function RaportBledowStrona({ locale = 'pl' }) {
  const en = locale === 'en';
  const d = await pobierzDane();
  const top15 = (d.reguly || []).slice(0, 15);
  const blokadaSzukania = (d.reguly || []).find((r) => r.id === 'boty_ai_zablokowane')?.odsetek ?? 0;
  const urlStrony = en ? `${BASE}/en/seo-errors-benchmark-report` : `${BASE}/raport-bledow-seo-w-polsce`;

  const cytat = en
    ? `According to the AI SEO COMPANY benchmark (${d.domen} unique domains audited between ${d.odDnia} and ${d.doDnia}), the median SEO score is ${d.medianaOceny}/100, and ${blokadaSzukania}% of websites block at least one AI search crawler in robots.txt. Source: ${urlStrony}`
    : `Według zestawienia AI SEO COMPANY (${d.domen} unikalnych domen przebadanych w okresie ${d.odDnia} - ${d.doDnia}) mediana oceny SEO wynosi ${d.medianaOceny}/100, a ${blokadaSzukania}% witryn blokuje w robots.txt co najmniej jednego bota wyszukiwania AI. Źródło: ${urlStrony}`;

  const datasetJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Dataset',
    '@id': `${urlStrony}#dataset`,
    name: en
      ? 'Technical SEO Errors and AI Crawler Blocking Benchmark (2026)'
      : 'Najczęstsze błędy techniczne SEO i blokady botów AI w Polsce (2026)',
    description: en
      ? `Anonymous rule-level statistics from ${d.domen} unique domains checked across 49 SEO and AI readiness rules.`
      : `Zanonimizowane statystyki z ${d.domen} unikalnych domen sprawdzonych pod kątem 49 reguł technicznego SEO i gotowości na AI.`,
    url: urlStrony,
    inLanguage: en ? 'en-US' : 'pl-PL',
    dateModified: d.doDnia || '2026-11-20',
    creator: { '@id': `${BASE}/#organization` },
    isAccessibleForFree: true,
    license: 'https://creativecommons.org/licenses/by/4.0/',
  };

  const faq = en
    ? [
        {
          question: 'How is domain deduplication handled without storing domain names?',
          answer: 'When an audit finishes, our server computes a keyed one-way HMAC-SHA256 hash of the normalised hostname without www. Re-testing the same website overwrites its single anonymous rule vector instead of inflating the count, while the domain name, URLs, IP address and email are never written to the statistics table.',
        },
        {
          question: 'Why do you separate AI search bots from AI training bots?',
          answer: 'Blocking OAI-SearchBot, PerplexityBot or Claude-SearchBot prevents a website from being cited in live AI search answers. Blocking GPTBot, ClaudeBot or Google-Extended only opts out of model training and does not lower our SEO score or affect Google Search rankings.',
        },
        {
          question: 'Is this sample representative of the entire internet?',
          answer: 'No. It is a self-selected sample of websites tested by business owners, marketers and developers in our free SEO audit tool (up to 25 crawled subpages per domain). Treat the percentages as a benchmark of actively audited SME websites rather than a random census of all registered domains.',
        },
        {
          question: 'Can I cite these statistics in an article or report?',
          answer: 'Yes, the aggregated dataset is available under Creative Commons BY 4.0. Please include the sample size, date window and a link to this benchmark page.',
        },
      ]
    : [
        {
          question: 'Jak zapobiegacie wielokrotnemu liczeniu tej samej strony bez zapisywania nazwy domeny?',
          answer: 'Po zakończeniu audytu serwer wylicza jednokierunkowy skrót kryptograficzny HMAC-SHA256 ze znormalizowanego hosta bez przedrostka www. Kolejny test tej samej witryny nadpisuje jej pojedynczy wektor reguł (1 domena = 1 głos), a nazwa domeny, adresy podstron, IP i e-mail nigdy nie trafiają do tabeli statystyk.',
        },
        {
          question: 'Dlaczego oddzielacie boty wyszukiwania AI od botów treningowych?',
          answer: 'Zablokowanie OAI-SearchBot, PerplexityBot lub Claude-SearchBot w robots.txt wyklucza witrynę z bieżących odpowiedzi i cytowań w wyszukiwarkach AI. Zablokowanie GPTBot, ClaudeBot czy Google-Extended oznacza wyłącznie sprzeciw wobec treningu modeli i nie obniża oceny w naszym audycie ani pozycji w Google Search.',
        },
        {
          question: 'Czy próba odzwierciedla wszystkie strony w polskim internecie?',
          answer: 'Nie. To próba stron zgłaszanych dobrowolnie przez właścicieli firm, marketerów i programistów w darmowym audycie SEO (crawl do 25 podstron na domenę). Odsetki pokazują realny stan witryn małych i średnich firm sprawdzających swoje SEO, a nie losowy spis wszystkich aktywnych domen .pl.',
        },
        {
          question: 'Czy mogę zacytować te dane we własnym artykule lub publikacji?',
          answer: 'Tak - zagregowane dane udostępniamy na licencji Creative Commons BY 4.0. Przy cytowaniu podaj wielkość próby N, przedział dat pomiaru oraz aktywny link do tej strony.',
        },
      ];

  const zrodla = en
    ? [
        { tytul: 'Google Search Central: Robots.txt specification and Google Common Crawlers (Google-Extended)', url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers', dopisek: 'accessed 20 November 2026' },
        { tytul: 'OpenAI Platform Documentation: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User)', url: 'https://developers.openai.com/api/docs/bots', dopisek: 'accessed 20 November 2026' },
        { tytul: 'Perplexity Documentation: Perplexity Crawlers (PerplexityBot)', url: 'https://docs.perplexity.ai/guides/bots', dopisek: 'accessed 20 November 2026' },
        { tytul: 'web.dev: Core Web Vitals thresholds (LCP, INP, CLS at the 75th percentile)', url: 'https://web.dev/articles/vitals', dopisek: 'accessed 20 November 2026' },
      ]
    : [
        { tytul: 'Google Search Central: roboty Google i działanie znacznika Google-Extended', url: 'https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers', dopisek: 'dostęp 20.11.2026' },
        { tytul: 'Dokumentacja OpenAI: boty indeksujące i treningowe (OAI-SearchBot, GPTBot, ChatGPT-User)', url: 'https://developers.openai.com/api/docs/bots', dopisek: 'dostęp 20.11.2026' },
        { tytul: 'Dokumentacja Perplexity: działanie bota PerplexityBot w robots.txt', url: 'https://docs.perplexity.ai/guides/bots', dopisek: 'dostęp 20.11.2026' },
        { tytul: 'web.dev: progi Core Web Vitals (LCP, INP, CLS na 75. percentylu CrUX)', url: 'https://web.dev/articles/vitals', dopisek: 'dostęp 20.11.2026' },
      ];

  return (
    <main style={{ backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <Breadcrumbs
        pl="Raport błędów SEO i blokad botów AI"
        en="SEO Errors & AI Crawler Benchmark"
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datasetJsonLd) }} />

      <article>
        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', paddingTop: 'clamp(1.5rem, 4vw, 2.5rem)', paddingBottom: '1.5rem' }}>
          {d.podgladTechniczny && (
            <p role="note" style={{ padding: '0.75rem 1rem', borderRadius: '12px', background: '#FEF3C7', color: '#92400E', fontSize: '0.9rem', fontWeight: 600, marginBottom: '1rem' }}>
              {en
                ? `Technical preview: showing illustrative data until the live database reaches N >= ${d.prog} unique domains (currently collected: ${d.rzeczywisteDomenyWBazie ?? 0}/${d.prog}).`
                : `Podgląd techniczny: prezentacja układu do czasu zebrania próby N >= ${d.prog} unikalnych domen w bazie (obecnie zebrano: ${d.rzeczywisteDomenyWBazie ?? 0}/${d.prog}).`}
            </p>
          )}
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span>{' '}
            {en ? 'Live First-Party Benchmark · CC BY 4.0' : 'Żywe dane własne · Licencja CC BY 4.0'}
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: 1.12, fontWeight: 800, letterSpacing: '-0.02em', margin: '0.5rem 0 1rem', color: 'var(--color-text-dark)' }}>
            {en
              ? 'Most Common Technical SEO Errors and AI Bot Blocks (2026 Benchmark)'
              : 'Najczęstsze błędy techniczne SEO i blokady botów AI w 2026 roku'}
          </h1>
          <Byline sciezka="/raport-bledow-seo-w-polsce" data={d.doDnia || '2026-11-20'} takzeEn style={{ margin: '0 0 0.5rem' }} />
          <p style={{ margin: '0 0 1.5rem', fontSize: '0.9rem', lineHeight: 1.5, color: 'var(--w-tusz-2)' }}>
            {en
              ? `Sample: N = ${d.domen} unique domains (1 domain = 1 latest vector) · Measurement window: ${d.odDnia} to ${d.doDnia} · Crawler: AISEOCompanyAudit (up to 25 pages, 49 rules) + Google PageSpeed Insights.`
              : `Próba: N = ${d.domen} unikalnych domen (1 domena = 1 najnowszy wynik) · Okno pomiaru: ${d.odDnia} do ${d.doDnia} · Dane: crawler AISEOCompanyAudit (do 25 podstron, 49 reguł) + Google PageSpeed Insights.`}
          </p>
          <AnswerBox {...(en ? { etykieta: 'Short answer' } : {})}>
            <p className={styles.tresc} style={{ margin: 0 }}>
              {en
                ? `Across ${d.domen} unique websites audited in 2026, the median overall SEO score is ${d.medianaOceny}/100 (mean ${d.sredniaOcena}/100), mobile performance is the weakest pillar (${d.kategorieSrednie.wydajnosc}/100), and ${blokadaSzukania}% of sites block at least one AI search crawler (OAI-SearchBot, PerplexityBot or Claude-SearchBot) in robots.txt.`
                : `W próbie ${d.domen} unikalnych witryn przebadanych w 2026 roku mediana ogólnej oceny SEO wynosi ${d.medianaOceny}/100 (średnia ${d.sredniaOcena}/100), najsłabszym filarem jest wydajność mobilna (${d.kategorieSrednie.wydajnosc}/100), a ${blokadaSzukania}% stron blokuje w pliku robots.txt co najmniej jednego bota wyszukiwania AI (OAI-SearchBot, PerplexityBot lub Claude-SearchBot).`}
            </p>
          </AnswerBox>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.85rem', marginTop: '1.5rem' }}>
            {[
              { k: en ? 'Unique domains (N)' : 'Unikalne domeny (N)', v: String(d.domen) },
              { k: en ? 'Median SEO score' : 'Mediana oceny SEO', v: `${d.medianaOceny}/100` },
              { k: en ? 'Avg. mobile performance' : 'Śr. wydajność mobilna', v: `${d.kategorieSrednie.wydajnosc ?? '-'}/100` },
              { k: en ? 'Sites blocking AI search' : 'Blokada wyszukiwania AI', v: `${blokadaSzukania}%` },
            ].map((x) => (
              <div key={x.k} style={{ background: '#ffffff', border: '1px solid rgba(15,23,42,0.1)', borderRadius: '16px', padding: '1rem 1.15rem' }}>
                <div style={{ fontSize: '0.8rem', color: 'var(--w-tusz-2)', marginBottom: '0.25rem' }}>{x.k}</div>
                <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--color-text-dark)', fontVariantNumeric: 'tabular-nums' }}>{x.v}</div>
              </div>
            ))}
          </div>

          <RaportBledowAkcje
            en={en}
            reguly={d.reguly || []}
            cytat={cytat}
            plikNazwa={en ? 'seo-errors-benchmark-2026.csv' : 'raport-bledow-seo-2026.csv'}
          />
        </div>

        <div className="container" style={{ maxWidth: '860px', margin: '0 auto', display: 'grid', gap: '1.5rem' }}>
          <div id="top-bledy" className={styles.karta}>
            <h2 className={styles.h2}>
              {en ? 'Top 15 most frequent SEO and AI readiness issues' : '15 najczęstszych błędów technicznych, treściowych i wydajnościowych'}
            </h2>
            <p className={styles.tresc}>
              {en
                ? 'Each percentage below shows the share of unique audited domains where our crawler triggered the rule on the homepage or at least one crawled subpage (up to 25 URLs per site).'
                : 'Odsetek w tabeli pokazuje udział unikalnych przebadanych domen, na których crawler wykrył dany problem na stronie głównej lub na co najmniej jednej ze sprawdzonych podstron (do 25 adresów na witrynę).'}
            </p>
            <CompareTable
              id="tabela-top-15-regul"
              caption={en ? `Most common SEO issues across N = ${d.domen} domains` : `Najczęstsze problemy SEO w próbie N = ${d.domen} domen`}
              columns={[
                { key: 'regula', label: en ? 'Check rule' : 'Reguła audytu' },
                { key: 'kat', label: en ? 'Category' : 'Kategoria' },
                { key: 'odsetek', label: en ? 'Affected sites' : 'Odsetek domen' },
              ]}
              rows={top15.map((r) => ({
                id: r.id,
                regula: en ? r.tytulEn : r.tytulPl,
                kat: (en ? KAT_EN : KAT_PL)[r.kategoria] || r.kategoria,
                odsetek: `${r.odsetek.toFixed(1)}% (${r.domenZProblemem}/${d.domen})`,
              }))}
              przypis={en ? 'Full 49-rule distribution available in the CSV export above.' : 'Pełny rozkład wszystkich 49 reguł znajdziesz w pliku CSV do pobrania wyżej.'}
            />
          </div>

          <div id="boty-ai" className={styles.karta}>
            <h2 className={styles.h2}>
              {en ? 'How often websites block AI bots in robots.txt' : 'Jak często firmy blokują boty AI w pliku robots.txt'}
            </h2>
            <p className={styles.tresc}>
              {en
                ? 'Many website owners copy blanket robots.txt rules that block training crawlers and accidentally cut themselves off from ChatGPT Search and Perplexity citations. The table separates search crawlers (which control live citations) from training crawlers.'
                : 'Wiele firm wkleja do pliku robots.txt gotowe reguły blokujące boty treningowe i przypadkowo odcina sobie cytowania w wyszukiwarce ChatGPT oraz Perplexity. W tabeli oddzielamy boty wyszukiwania (odpowiadające za bieżące polecenia firmy) od botów treningowych.'}
            </p>
            <CompareTable
              id="tabela-botow-ai"
              caption={en ? 'AI crawler Disallow rate in robots.txt' : 'Odsetek blokad poszczególnych botów AI w robots.txt'}
              columns={[
                { key: 'bot', label: 'User-agent' },
                { key: 'rola', label: en ? 'Crawler role' : 'Rola bota' },
                { key: 'blok', label: en ? 'Blocked in robots.txt' : 'Zablokowany w robots.txt' },
              ]}
              rows={(d.botyAi || []).map((b) => ({
                id: b.bot,
                bot: b.bot,
                rola: b.rola === 'szukanie'
                  ? (en ? 'AI search & citations (penalised if blocked)' : 'Wyszukiwanie i cytowania AI (istotny dla GEO)')
                  : (en ? 'Model training / user fetch (informational)' : 'Trening modelu / pobranie użytkownika (informacyjnie)'),
                blok: `${b.odsetekZablokowanych.toFixed(1)}% (${b.zablokowanoDomen}/${b.sprawdzonoDomen})`,
              }))}
            />
          </div>

          <div id="metodologia" className={styles.karta}>
            <h2 className={styles.h2}>{en ? 'Methodology and sample limitations' : 'Metodologia pomiaru i ograniczenia próby'}</h2>
            <p className={styles.tresc}>
              {en
                ? 'Data comes from public runs of our free SEO audit tool at ai-seo-company.pl. For every checked site, AISEOCompanyAudit fetches robots.txt, sitemap.xml (up to 10 child sitemaps), /llms.txt, Google PageSpeed Insights (mobile + CrUX field metrics where available) and up to 25 internal HTML pages balanced across language folders and URL sections.'
                : 'Dane pochodzą z uruchomień naszego darmowego audytu SEO na stronie ai-seo-company.pl. Dla każdej badanej witryny crawler AISEOCompanyAudit pobiera plik robots.txt, mapę sitemap.xml (do 10 map podrzędnych), plik /llms.txt, dane Google PageSpeed Insights (telefon oraz dane polowe CrUX, jeśli domena je posiada) i maksymalnie 25 podstron wewnętrznych zbalansowanych między sekcjami i wersjami językowymi.'}
            </p>
            <p className={styles.tresc} style={{ marginBottom: 0 }}>
              {en
                ? 'Privacy and deduplication: before raw logs expire after 60 days, only an irreversible HMAC-SHA256 hash of the normalised hostname, category scores and triggered rule IDs are stored. You can check your own website for free in our '
                : 'Prywatność i deduplikacja: zanim surowe logi wygasną po 60 dniach, system zapisuje wyłącznie nieodwracalny skrót HMAC-SHA256 znormalizowanej domeny, oceny kategorii i identyfikatory trafionych reguł. Własną witrynę sprawdzisz bez rejestracji w naszym '}
              <Link href="/narzedzia/audyt-seo" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                {en ? 'free online SEO audit' : 'darmowym audycie SEO online'}
              </Link>
              {en ? ' or test AI crawlers in the ' : ' albo przetestujesz dostęp botów w '}
              <Link href="/narzedzia/generator-llms-txt" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                {en ? 'llms.txt generator' : 'generatorze llms.txt'}
              </Link>
              .
            </p>
          </div>
        </div>
      </article>

      <AppleFaq faqData={faq} title={en ? 'Frequently asked questions' : 'Najczęstsze pytania o raport'} sectionId="faq" />

      <div className="container" style={{ maxWidth: '860px', margin: '0 auto' }}>
        <Zrodla zrodla={zrodla} naglowek={en ? 'Sources and documentation' : 'Źródła i dokumentacja'} id="zrodla" />
      </div>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}
