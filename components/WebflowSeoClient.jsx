'use client';

// E1b (22.11.2026): /pozycjonowanie-webflow (PL) i /en/webflow-seo-services (EN).
// Unikalny zakres techniczny Webflow: plaskie sciezki kolekcji CMS (/kolekcja/wpis), wylaczanie
// indeksacji subdomeny webflow.io i pustych kolekcji pomocniczych (opinie/logotypy), audyt Webflow
// Localization (Essential $9 vs Advanced $29/jezyk/mies. dla zlokalizowanych slugow URL i hreflang),
// dynamiczne JSON-LD w Custom Code, odchudzanie animacji Lottie pod INP, dostep botow AI i jawny cennik CENY.

import { useLocale } from 'next-intl';
import Contact from '@/components/Contact';
import AppleFaq from '@/components/service/AppleFaq';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import Zrodla from '@/components/Zrodla';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { AUDYT, CENY, POROWNYWARKA_CWV } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/pozycjonowanie-webflow';
const fmtPl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmtEn = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const ZRODLA_PL = [
  { url: 'https://help.webflow.com/hc/en-us/articles/33961248560659-SEO-settings', nazwa: 'Webflow Help Center: SEO settings, blokada indeksacji webflow.io, robots.txt i sitemap.xml', data: '2026-11-22' },
  { url: 'https://webflow.com/pricing', nazwa: 'Webflow Pricing: limity kolekcji w Site Plans oraz cennik Webflow Localization (Essential vs Advanced)', data: '2026-11-22' },
  { url: 'https://help.webflow.com/hc/en-us/articles/33961326090899-Code-export', nazwa: 'Webflow Help Center: Code Export i ograniczenia eksportu kolekcji CMS oraz Localization', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Wersje językowe stron, wzajemny hreflang i x-default', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP, INP i CLS w danych polowych CrUX)', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://help.webflow.com/hc/en-us/articles/33961248560659-SEO-settings', nazwa: 'Webflow Help Center: SEO settings, disabling webflow.io indexing, robots.txt & XML sitemaps', data: '2026-11-22' },
  { url: 'https://webflow.com/pricing', nazwa: 'Webflow Pricing: Site Plans, CMS collection item caps & Webflow Localization tiers', data: '2026-11-22' },
  { url: 'https://help.webflow.com/hc/en-us/articles/33961326090899-Code-export', nazwa: 'Webflow Help Center: Code Export scope and CMS / Localization export limits', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Managing multi-regional and multilingual sites (hreflang)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Understanding Core Web Vitals (LCP, INP, CLS)', data: '2026-11-22' },
];

const OBSZARY_PL = [
  {
    nr: '01 / ARCHITEKTURA KOLEKCJI CMS',
    tytul: 'Obejście płaskich URL-i kolekcji i czyszczenie pustych szablonów',
    opis: 'Każda kolekcja Webflow CMS narzuca dwupoziomowy adres /kolekcja/slug i automatycznie tworzy osobne podstrony dla każdego rekordu - nawet wtedy, gdy kolekcja służy wyłącznie do wyświetlania kafelków opinii, logotypów klientów lub pytań FAQ na stronie głównej. Wyłączamy publikację pustych szablonów kolekcji pomocniczych, blokujemy indeksację roboczej subdomeny *.webflow.io i projektujemy architekturę klastrów łączącą foldery statyczne z kolekcjami CMS.',
  },
  {
    nr: '02 / WEBFLOW LOCALIZATION & HREFLANG',
    tytul: 'Wielojęzyczne SEO bez nieprzetłumaczonych slugów i błędów hreflang',
    opis: 'Podstawowy dodatek Webflow Localization Essential ($9/mies. za język przy płatności rocznej) nie pozwala przetłumaczyć samego adresu URL (sluga), co ogranicza dopasowanie do lokalnych fraz w EN czy DE; pełną lokalizację adresów daje dopiero plan Advanced ($29/mies. za język). Weryfikujemy dwukierunkowe tagi hreflang, wskazanie x-default, mapy XML dla każdego języka oraz pola CMS, które po niepełnym tłumaczeniu tworzą strony mieszanojęzyczne.',
  },
  {
    nr: '03 / DANE STRUKTURALNE W CUSTOM CODE',
    tytul: 'Dynamiczne szablony JSON-LD spięte z polami Webflow CMS',
    opis: 'W Webflow nie ma wtyczek pokroju Rank Math, dlatego większość stron ma zerowe lub ręcznie wklejone, zepsute znaczniki schema.org. Wdrażamy w sekcji Custom Code (<head>) szablony JSON-LD (Organization, Service, Article, FAQPage, BreadcrumbList) pobierające dane z pól kolekcji CMS i zabezpieczone przed błędami składni przy znakach cudzysłowu.',
  },
  {
    nr: '04 / INP, LOTTIE, RODO & BOTY AI',
    tytul: 'Odchudzanie animacji Webflow, lokalne fonty WOFF2 i gotowość na AI',
    opis: 'Hosting AWS/Fastly w Webflow jest szybki, ale rozbudowane animacje Lottie, nieskompresowane wideo w tle i zewnętrzne kontenery GTM potrafią wybić mobilny wskaźnik INP ponad 200 ms. Optymalizujemy interakcje, podmieniamy zdalne Google Fonts na lokalnie wgrane pliki WOFF2 (zgodność z RODO/DSGVO i szybszy LCP) oraz porządkujemy robots.txt i tabele odpowiedzi pod OAI-SearchBot i PerplexityBot.',
  },
];

const OBSZARY_EN = [
  {
    nr: '01 / CMS COLLECTION ARCHITECTURE',
    tytul: 'Solving flat CMS URLs, orphan collection pages & webflow.io leaks',
    opis: 'Every Webflow CMS collection enforces a rigid two-level /collection/item path and creates live template URLs by default - even for helper collections storing testimonials, partner logos or FAQ cards. We disable template publishing on utility collections, block *.webflow.io staging indexing, clean up pagination canonicals and architect hybrid static-folder + CMS topic clusters.',
  },
  {
    nr: '02 / WEBFLOW LOCALIZATION & HREFLANG',
    tytul: 'International SEO without unlocalized URL slugs or broken hreflang',
    opis: 'Webflow Localization Essential ($9/locale/mo billed annually) translates on-page text but locks URL slugs to the primary language; localized URL slugs require Localization Advanced ($29/locale/mo). We audit reciprocal hreflang annotations, x-default tags, per-locale XML sitemaps and untranslated CMS fallback fields that trigger mixed-language soft-404s.',
  },
  {
    nr: '03 / CUSTOM-CODE JSON-LD GRAPHS',
    tytul: 'Dynamic schema.org bindings inside Webflow Page & Collection Settings',
    opis: 'Without SEO plugins, most Webflow sites ship zero structured data or broken copy-pasted scripts. We implement validated JSON-LD graphs (Organization, Service, Article, FAQPage, BreadcrumbList) wired to Webflow CMS fields in Custom Code and sanitized against quote-escaping syntax errors.',
  },
  {
    nr: '04 / LOTTIE INP, LOCAL FONTS & AI SEARCH',
    tytul: 'Interaction tuning, GDPR-safe WOFF2 fonts & AI crawler readiness',
    opis: 'Webflow’s AWS/Fastly CDN delivers fast TTFB, yet heavy Lottie JSON files, autoplay hero videos and third-party tag managers still push mobile INP past 200 ms. We trim interaction scripts, replace external Google Fonts calls with locally uploaded WOFF2 files, verify OAI-SearchBot and PerplexityBot rules in Webflow SEO settings, and structure citable comparison tables.',
  },
];

const KIEDY_PL = [
  {
    id: 'wf-zostac',
    sytuacja: 'Strona SaaS lub B2B w 1 języku (do kilkuset podstron), dział marketingu sprawnie buduje landing page w Webflow Designerze',
    rekomendacja: `Rozwój SEO bezpośrednio na Webflow (SEO Standard od ${fmtPl(CENY.seoStandard.pln)} zł/mies. lub Premium ${fmtPl(CENY.seoPremium.pln)} zł/mies.)`,
    powod: 'Szybki CDN bez łatania wtyczek PHP; po uporządkowaniu kolekcji CMS, JSON-LD i treści serwis bardzo dobrze zdobywa pozycje i cytowania w AI',
  },
  {
    id: 'wf-migracja-jezyki',
    sytuacja: 'Serwis w 3-5 językach ze zlokalizowanymi URL-ami, gdzie dopłaty Localization Advanced + stanowiska Workspace przekraczają budżet',
    rekomendacja: `Przejście na własny Next.js w pakiecie Booster Pack (${fmtPl(CENY.boosterPack.pln)} zł netto/mies., min. ${CENY.boosterPack.umowaMiesiecy} mies.)`,
    powod: '0 zł dopłaty SaaS za każdy kolejny język, pełna swoboda wielopoziomowych adresów URL, natywny endpoint /llms.txt i 100% własności kodu w repozytorium Git',
  },
  {
    id: 'wf-migracja-narzedzia',
    sytuacja: 'Potrzeba własnych interaktywnych kalkulatorów SEO/ROI, konfiguratorów B2B lub tysięcy podstron programmatic powyżej limitu rekordów Webflow CMS',
    rekomendacja: `Dedykowany Next.js (od ${fmtPl(CENY.strona.pln)} zł netto osobno lub 0 zł na starcie w Booster Packu)`,
    powod: 'Brak limitu 10 zagnieżdżonych list kolekcji na stronę i brak zewnętrznych skryptów filtrujących (typu Jetboost/Finsweet) obciążających przeglądarkę',
  },
];

const KIEDY_EN = [
  {
    id: 'wf-zostac',
    sytuacja: 'Single-language B2B or SaaS site (up to a few hundred URLs) where marketers ship pages fast inside Webflow Designer',
    rekomendacja: `Scale directly on Webflow (SEO Standard from €${fmtEn(CENY.seoStandard.eur)}/mo or Premium €${fmtEn(CENY.seoPremium.eur)}/mo)`,
    powod: 'Fast global CDN with zero PHP maintenance; once CMS templates, JSON-LD and citable copy are dialed in, Webflow ranks and earns AI mentions reliably',
  },
  {
    id: 'wf-migracja-jezyki',
    sytuacja: '3-5+ language versions needing localized URL slugs where Localization Advanced ($29/locale/mo) + Workspace seats compound',
    rekomendacja: `Migrate to owned Next.js inside Booster Pack (€${fmtEn(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy} months)`,
    powod: '€0 per-locale SaaS add-on fees, unrestricted multi-level URL directories, native /llms.txt route and 100% portable Git codebase ownership',
  },
  {
    id: 'wf-migracja-narzedzia',
    sytuacja: 'Need custom interactive calculators, B2B configurators or thousands of programmatic pages beyond Webflow CMS item caps',
    rekomendacja: `Standalone Next.js (from €${fmtEn(CENY.strona.eur)} net) or Booster Pack`,
    powod: 'Eliminates Webflow’s nested Collection List limits and heavy client-side filtering scripts while keeping sub-second server rendering',
  },
];

const CENNIK_PL = [
  {
    id: 'wf-audyt',
    opcja: 'Jednorazowy audyt techniczny Webflow SEO & Localization',
    kwota: `od ${fmtPl(CENY.audytSeo.pln)} zł netto`,
    warunki: 'Zlecenie jednorazowe (3-5 dni roboczych)',
    zakres: 'Audyt kolekcji CMS, subdomeny webflow.io, hreflang, szablonów JSON-LD, animacji Lottie/INP, dostępu botów AI oraz plan wdrożeniowy na 90 dni',
  },
  {
    id: 'wf-standard',
    opcja: 'Pakiet SEO Standard (stałe pozycjonowanie Webflow)',
    kwota: `od ${fmtPl(CENY.seoStandard.pln)} zł netto / mies.`,
    warunki: 'Umowa miesięczna, rezygnacja w dowolnym miesiącu',
    zakres: 'Optymalizacja techniczna w Webflow, do 20 fraz, 2 rozbudowane treści i 2 linki/mies., wizytówka Google, panel 24/7 (pomiar AI opcjonalnie +490 zł/mies.)',
  },
  {
    id: 'wf-premium',
    opcja: 'Pakiet SEO Premium (Webflow + cotygodniowe GEO w cenie)',
    kwota: `${fmtPl(CENY.seoPremium.pln)} zł netto / mies.`,
    warunki: 'Umowa miesięczna, rezygnacja w dowolnym miesiącu',
    zakres: 'Rozbudowa stron usługowych i porównawczych w Webflow, CRO mobilne, do 50 fraz, 4 treści i 4 linki/mies. oraz pomiar 30 pytań co tydzień w 4 silnikach AI',
  },
  {
    id: 'wf-booster',
    opcja: 'Booster Pack (migracja z Webflow na własny Next.js + SEO)',
    kwota: `${fmtPl(CENY.boosterPack.pln)} zł netto / mies.`,
    warunki: `Min. ${CENY.boosterPack.umowaMiesiecy} mies., potem umowa miesięczna`,
    zakres: 'Budowa nowej strony w Next.js za 0 zł na starcie (pełna własność kodu, wielojęzyczność bez dopłat), mapa przekierowań 301, serwer, SSL i pełne SEO',
  },
];

const CENNIK_EN = [
  {
    id: 'wf-audyt',
    opcja: 'Standalone Webflow SEO & Localization technical audit',
    kwota: `from €${fmtEn(CENY.audytSeo.eur)} net`,
    warunki: 'One-off engagement (3-5 business days)',
    zakres: 'Audit of CMS collections, webflow.io indexing, Localization hreflang, Custom Code JSON-LD, Lottie/INP bottlenecks, AI crawler access & 90-day plan',
  },
  {
    id: 'wf-standard',
    opcja: 'SEO Standard (ongoing Webflow SEO retainer)',
    kwota: `from €${fmtEn(CENY.seoStandard.eur)} net / mo`,
    warunki: 'Monthly rolling contract, cancel anytime',
    zakres: 'Direct Webflow implementation, up to 20 keywords, 2 content assets & 2 links/mo, Google Business Profile, 24/7 portal (optional AI tracking: +€115/mo)',
  },
  {
    id: 'wf-premium',
    opcja: 'SEO Premium (Webflow growth + weekly GEO included)',
    kwota: `€${fmtEn(CENY.seoPremium.eur)} net / mo`,
    warunki: 'Monthly rolling contract, cancel anytime',
    zakres: 'New Webflow service & comparison pages, mobile CRO, up to 50 keywords, 4 content assets & 4 links/mo, plus weekly 30-prompt AI visibility tracking',
  },
  {
    id: 'wf-booster',
    opcja: 'Booster Pack (migrate off Webflow to owned Next.js + SEO)',
    kwota: `€${fmtEn(CENY.boosterPack.eur)} net / mo`,
    warunki: `Min. ${CENY.boosterPack.umowaMiesiecy}-month term, monthly rolling after`,
    zakres: '€0 upfront custom Next.js build (full Git ownership, zero per-locale SaaS fees), complete 301 migration from Webflow CSV/URLs, hosting, SSL & full SEO',
  },
];

const FAQ_PL = [
  {
    id: 'czy-webflow-jest-dobre-pod-seo',
    question: 'Czy Webflow jest dobrym systemem pod pozycjonowanie strony B2B?',
    answer: 'Tak, szczególnie dla jednojęzycznych stron usługowych i SaaS do kilkuset podstron. Webflow generuje czysty kod HTML/CSS na szybkim CDN i nie wymaga łatania dziurawych wtyczek PHP. Ograniczenia pojawiają się dopiero przy potrzebie głębokiego zagnieżdżania katalogów URL w jednej kolekcji CMS oraz przy kosztach modułu Localization dla wielu języków.',
  },
  {
    id: 'jak-obejsc-plaskie-urle-webflow-cms',
    question: 'Jak radzicie sobie ze sztywną strukturą /kolekcja/wpis w Webflow CMS?',
    answer: 'Dla najważniejszych usług i rynków lokalnych łączymy zagnieżdżone foldery stron statycznych (np. /uslugi/audyt-seo) z dedykowanymi kolekcjami tematycznymi połączonymi silnym linkowaniem wewnętrznym i okruszkami BreadcrumbList. W dużych serwisach enterprise możliwe jest również spięcie Webflow z warstwą Cloudflare Reverse Proxy.',
  },
  {
    id: 'subdomena-webflow-io-duplikacja',
    question: 'Dlaczego w Google widać czasem naszą roboczą domenę nazwa.webflow.io?',
    answer: 'Dzieje się tak, gdy w ustawieniach projektu (Site Settings -> SEO -> Indexing) nie wyłączono indeksowania subdomeny stagingowej Webflow. Google traktuje ją wtedy jako osobną witrynę z identyczną treścią. W pierwszym dniu audytu wyłączamy indeksację webflow.io i weryfikujemy kanoniczną domenę w Search Console.',
  },
  {
    id: 'webflow-a-llms-txt-boty-ai',
    question: 'Czy strona na Webflow dobrze wyświetla się w ChatGPT, Perplexity i Google AI Overviews?',
    answer: 'Tak, pod warunkiem że kluczowe opisy oferty, cenniki i tabele są wyrenderowane jako natywne elementy HTML/CMS Webflow, a nie wczytywane zewnętrznym skryptem JS w bloku Embed. Sprawdzamy też ustawienia pliku robots.txt w panelu Webflow, żeby nie blokować OAI-SearchBot ani PerplexityBot.',
  },
  {
    id: 'eksport-z-webflow-na-nextjs',
    question: 'Czy z Webflow da się wyeksportować stronę i przenieść ją na własny serwer bez utraty pozycji?',
    answer: 'Funkcja Code Export w Webflow eksportuje wyłącznie statyczny HTML/CSS/JS bez działającego CMS-a i bez modułu Localization, natomiast kolekcje CMS można pobrać do plików CSV. Podczas migracji do Next.js (np. w naszym Booster Packu) automatycznie importujemy wszystkie treści z CSV, zachowujemy strukturę URL 1:1 lub wdrażamy przekierowania 301 na brzegu sieci, dzięki czemu wypracowane pozycje zostają zachowane.',
  },
];

const FAQ_EN = [
  {
    id: 'is-webflow-good-for-b2b-seo',
    question: 'Is Webflow good for B2B and SaaS SEO in 2026?',
    answer: 'Yes - especially for single-locale B2B and SaaS marketing sites up to several hundred URLs. Webflow serves clean server HTML over Fastly/AWS CDN with zero PHP plugin patching. Its real trade-offs only surface when you need multi-level dynamic directory trees inside one CMS collection or localized URL slugs across many languages.',
  },
  {
    id: 'flat-cms-collection-urls-workaround',
    question: 'How do you handle Webflow’s flat /collection/item URL structure?',
    answer: 'We combine nested static folders for core money pages (e.g. /services/technical-seo) with tightly scoped CMS collections reinforced by BreadcrumbList schema and hub-and-spoke internal linking, while disabling live URL output on utility collections (like testimonials or logos) so zero thin pages enter Google’s index.',
  },
  {
    id: 'webflow-io-staging-duplication',
    question: 'Why is our staging *.webflow.io subdomain showing up in Google search results?',
    answer: 'If "Disable Webflow subdomain indexing" is left unchecked under Site Settings -> SEO -> Indexing, Google crawls and indexes your staging subdomain alongside your production domain, splitting signals across duplicate URLs. We lock down subdomain indexing on day one and verify canonical consolidation in Search Console.',
  },
  {
    id: 'webflow-ai-crawlers-chatgpt',
    question: 'Does Webflow work well for ChatGPT, Perplexity and Google AI Overviews?',
    answer: 'Yes, because native Webflow elements and CMS fields render directly into server HTML that non-JS crawlers (OAI-SearchBot, PerplexityBot, ClaudeBot) read on the first HTTP fetch. We ensure pricing tables and FAQs are built with native semantic HTML rather than client-side JS embeds, and verify bot rules in Webflow’s robots.txt panel.',
  },
  {
    id: 'migrating-from-webflow-to-nextjs',
    question: 'Can we migrate off Webflow to custom Next.js later without losing rankings?',
    answer: 'Yes. While Webflow’s native Code Export only outputs static HTML/CSS without CMS or Localization logic, all CMS collections export cleanly to CSV. Inside our Booster Pack migration, we import your CSV content into Next.js, preserve existing URL paths 1:1 (or map edge 301 redirects for flattened collection slugs), and retain full organic equity.',
  },
];

const kontener = { maxWidth: '880px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.3vw, 2.2rem)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'var(--w-tusz)', margin: '0 0 1.15rem', scrollMarginTop: '110px' };
const h3Styl = { fontSize: 'clamp(1.18rem, 2.2vw, 1.38rem)', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--w-tusz)', margin: '0 0 0.65rem' };
const akapit = { fontSize: '1.06rem', lineHeight: 1.7, color: 'var(--w-tusz-2)', margin: '0 0 1.1rem' };
const link = { color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', boxShadow: 'none', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

export default function WebflowSeoClient() {
  const lang = useLocale();
  const en = lang === 'en';
  const kontakt = hash('kontakt', lang);
  const OBSZARY = en ? OBSZARY_EN : OBSZARY_PL;
  const KIEDY = en ? KIEDY_EN : KIEDY_PL;
  const CENNIK = en ? CENNIK_EN : CENNIK_PL;
  const ZRODLA = en ? ZRODLA_EN : ZRODLA_PL;
  const FAQ = en ? FAQ_EN : FAQ_PL;

  const hrefAudytNarz = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  const hrefCwvNarz = hrefJesliOpublikowana('/narzedzia/test-core-web-vitals-porownanie');
  const hrefWfVsWp = hrefJesliOpublikowana('/porownania/webflow-vs-wordpress-seo');
  const hrefCennik = hrefJesliOpublikowana('/cennik-pozycjonowania');

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '2rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {en ? 'Webflow CMS, Localization & GEO' : 'Webflow CMS · Localization · AI SEO'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.4rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 1.35rem', color: 'var(--w-tusz)' }}>
              {en
                ? 'Webflow SEO services: CMS structure, international hreflang and AI search visibility'
                : 'Pozycjonowanie Webflow: architektura kolekcji CMS, hreflang i widoczność w AI'}
            </h1>
          </Reveal>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en
              ? `Webflow ships fast CDN hosting out of the box, but scaling organic traffic requires fixing Webflow-specific bottlenecks: flat /collection/item URL rules, accidentally indexed utility collections and *.webflow.io staging subdomains, unlocalized URL slugs on basic Localization tiers, missing Custom-Code JSON-LD, and heavy Lottie scripts hurting mobile INP. We run monthly Webflow SEO retainers from €${fmtEn(CENY.seoStandard.eur)} net/mo - or migrate multilingual teams off Webflow fees onto custom Next.js inside our Booster Pack (€${fmtEn(CENY.boosterPack.eur)} net/mo).`
              : `Webflow daje szybki hosting CDN od pierwszego dnia, ale przy skalowaniu ruchu organicznego ujawnia specyficzne ograniczenia: płaskie ścieżki kolekcji (/kolekcja/wpis), przypadkowo zaindeksowane kolekcje pomocnicze i subdomeny *.webflow.io, brak tłumaczenia slugów URL w podstawowym planie Localization, brak natywnych wtyczek JSON-LD oraz ciężkie animacje Lottie psujące mobilne INP. Pozycjonujemy serwisy Webflow w umowie miesięcznej od ${fmtPl(CENY.seoStandard.pln)} zł netto/mies., a wielojęzyczne projekty przenosimy bez opłaty startowej na własny Next.js w pakiecie Booster Pack (${fmtPl(CENY.boosterPack.pln)} zł netto/mies.).`}
          </AnswerBox>

          <Byline sciezka={SCIEZKA} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta="wf_seo_hero" data-plan="standard">
              {en ? 'Request a Webflow SEO quote in 24h' : 'Zamów wycenę pozycjonowania Webflow w 24 h'}
            </a>
            <a href={en ? '#pricing' : '#cennik'} className="hero-btn-secondary" data-cta="wf_seo_cennik">
              {en ? 'See Webflow SEO plans & rates' : 'Sprawdź stawki i warunki współpracy'}
            </a>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'webflow-fixes' : 'co-optymalizujemy'}>
        <div className="container" style={kontener}>
          <h2 style={h2Styl}>
            {en
              ? '4 Webflow-specific SEO bottlenecks we resolve inside your project'
              : '4 specyficzne wąskie gardła Webflow, które rozwiązujemy w Twoim projekcie'}
          </h2>
          <p style={akapit}>
            {en
              ? 'Generic SEO checklists written for WordPress miss half of what actually breaks on Webflow. Our work goes straight into Webflow Designer, CMS Collection Templates and Custom Code:'
              : 'Ogólne poradniki SEO pisane pod WordPressa nie pasują do architektury Webflow. Pracujemy bezpośrednio w Webflow Designerze, szablonach Collection Pages oraz sekcji Custom Code:'}
          </p>
          <div style={{ display: 'grid', gap: '1.15rem', marginTop: '1.25rem' }}>
            {OBSZARY.map((o) => (
              <div key={o.nr} style={karta}>
                <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.45rem' }}>
                  {o.nr}
                </div>
                <h3 style={h3Styl}>{o.tytul}</h3>
                <p style={{ ...akapit, margin: 0 }}>{o.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'scale-or-migrate' : 'skalowac-czy-migrowac'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>
              {en
                ? 'When to keep scaling on Webflow vs when to move to Next.js'
                : 'Kiedy rozwijać stronę na Webflow, a kiedy opłaca się przejść na Next.js?'}
            </h2>
            <p style={akapit}>
              {en
                ? 'We optimize client Webflow domains every week while building custom Next.js applications in-house. Before signing a retainer, we check whether Webflow’s CMS limits and Localization add-ons fit your 24-month roadmap:'
                : 'Na co dzień pozycjonujemy strony klientów na Webflow i budujemy własne serwisy w Next.js. Zanim zaczniemy, sprawdzamy na twardych liczbach, czy limity kolekcji i cennik Webflow Localization spinają się z Twoim planem na kolejne 24 miesiące:'}
            </p>
            <CompareTable
              id="tabela-decyzja-webflow-nextjs"
              caption={en ? 'Stay on Webflow vs migrate to Next.js in Booster Pack: decision guide' : 'Pozostanie na Webflow czy migracja na Next.js w Booster Packu: tabela decyzyjna'}
              columns={en
                ? [
                    { key: 'sytuacja', label: 'Your business & site setup' },
                    { key: 'rekomendacja', label: 'Recommended path' },
                    { key: 'powod', label: 'Why it wins technically & financially' },
                  ]
                : [
                    { key: 'sytuacja', label: 'Sytuacja Twojej firmy i serwisu' },
                    { key: 'rekomendacja', label: 'Rekomendowana ścieżka' },
                    { key: 'powod', label: 'Uzasadnienie techniczne i kosztowe' },
                  ]}
              rows={KIEDY}
              przypis={en
                ? 'Webflow Localization pricing per webflow.com/pricing (accessed Nov 22, 2026); AI SEO COMPANY rates in EUR net.'
                : 'Cennik Webflow Localization według webflow.com/pricing (odczyt 22.11.2026); stawki AI SEO COMPANY w PLN netto.'}
            />
            <p style={{ ...akapit, marginTop: '1.1rem', marginBottom: 0 }}>
              {en ? (
                <>
                  Benchmark your Webflow site right now:{' '}
                  {hrefAudytNarz && <>scan up to {AUDYT.stron} URLs in our <Link href="/narzedzia/audyt-seo" style={link}>free {AUDYT.regul}-rule SEO audit</Link></>}
                  {hrefCwvNarz && <>, compare {POROWNYWARKA_CWV.dniCrux}-day CrUX mobile INP/LCP against a rival in our <Link href="/narzedzia/test-core-web-vitals-porownanie" style={link}>Core Web Vitals comparator</Link></>}
                  {hrefWfVsWp && <>, or read <Link href="/porownania/webflow-vs-wordpress-seo" style={link}>Webflow vs WordPress for SEO (24-month TCO)</Link></>}.
                </>
              ) : (
                <>
                  Przetestuj swój serwis Webflow od ręki:{' '}
                  {hrefAudytNarz && <>sprawdź do {AUDYT.stron} podstron w naszym <Link href="/narzedzia/audyt-seo" style={link}>darmowym audycie SEO ({AUDYT.regul} reguł)</Link></>}
                  {hrefCwvNarz && <>, porównaj {POROWNYWARKA_CWV.dniCrux}-dniowe wyniki mobilnego INP i LCP z konkurentem w <Link href="/narzedzia/test-core-web-vitals-porownanie" style={link}>porównywarce Core Web Vitals</Link></>}
                  {hrefWfVsWp && <> albo zobacz zestawienie <Link href="/porownania/webflow-vs-wordpress-seo" style={link}>Webflow vs WordPress pod SEO</Link></>}.
                </>
              )}
            </p>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'pricing' : 'cennik'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>
              {en ? 'Webflow SEO pricing & monthly retainers (2026)' : 'Cennik pozycjonowania Webflow: jawne stawki bez długich umów'}
            </h2>
            <p style={akapit}>
              {en
                ? 'Choose a one-off Webflow technical audit for your internal team or a rolling monthly retainer where we ship pages, schema, links and AI visibility tracking for you:'
                : 'Wybierz jednorazowy audyt z instrukcją dla Twojego webdesignera albo stały abonament z umową miesięczną, w którym wdrażamy zmiany, piszemy treści i budujemy autorytet domeny:'}
            </p>
            <CompareTable
              id="tabela-cennik-webflow-seo"
              caption={en ? 'Webflow SEO audit, monthly retainers & Booster Pack rates (EUR net)' : 'Stawki audytu, pakietów pozycjonowania Webflow i Booster Packa (PLN netto)'}
              columns={en
                ? [
                    { key: 'opcja', label: 'Service / Plan' },
                    { key: 'kwota', label: 'Net price' },
                    { key: 'warunki', label: 'Contract terms' },
                    { key: 'zakres', label: 'Deliverables' },
                  ]
                : [
                    { key: 'opcja', label: 'Usługa / Pakiet' },
                    { key: 'kwota', label: 'Cena netto' },
                    { key: 'warunki', label: 'Warunki umowy' },
                    { key: 'zakres', label: 'Co wchodzi w zakres' },
                  ]}
              rows={CENNIK}
              przypis={en
                ? 'Source: AI SEO COMPANY published pricing (lib/narzedziaLiczby.js, November 2026). Prices exclude VAT.'
                : 'Źródło: publiczny cennik AI SEO COMPANY (lib/narzedziaLiczby.js, stan: listopad 2026). Kwoty netto (+ 23% VAT).'}
            />
            {hrefCennik && (
              <p style={{ ...akapit, marginTop: '1rem', marginBottom: 0 }}>
                {en ? (
                  <>Compare all retainer tiers on our <Link href="/cennik-pozycjonowania" style={link}>SEO pricing page</Link>.</>
                ) : (
                  <>Pełne porównanie pakietów sprawdzisz na stronie <Link href="/cennik-pozycjonowania" style={link}>cennik pozycjonowania</Link>.</>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ}
        title={en ? 'Questions about Webflow SEO services' : 'Najczęstsze pytania o pozycjonowanie stron na Webflow'}
        sectionId={en ? 'faq' : 'pytania'}
      />

      <div className="container" style={{ ...kontener, paddingBottom: '3rem' }}>
        <Zrodla zrodla={ZRODLA} en={en} />
      </div>

      <Contact />
    </main>
  );
}
