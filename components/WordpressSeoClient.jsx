'use client';

// E1b (22.11.2026): /pozycjonowanie-wordpress (PL) i /en/wordpress-seo-services (EN).
// Zakres merytoryczny: odchudzanie wtyczek i kreatorow pod LCP/INP, higiena indeksacji taksonomii
// (tagi, archiwa autora/dat, attachment pages, ?s=), czysty @graph JSON-LD bez konfliktow Yoast/RankMath,
// dostep OAI-SearchBot/PerplexityBot przez WAF + /llms.txt + IndexNow, jawny cennik z CENY oraz
// uczciwa tabela: kiedy optymalizowac WordPressa, a kiedy przejsc na Next.js w Booster Packu.

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
import { AUDYT, CENY, ROBOTY_AI } from '@/lib/narzedziaLiczby';

const SCIEZKA = '/pozycjonowanie-wordpress';
const fmtPl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
const fmtEn = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');

const ZRODLA_PL = [
  { url: 'https://developer.wordpress.org/advanced-administration/performance/optimization/', nazwa: 'WordPress Developer Resources: Optymalizacja wydajności, pamięć obiektowa i cache strony', data: '2026-11-22' },
  { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (udział wtyczek i motywów w lukach bezpieczeństwa)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,1 w 75. percentylu)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', nazwa: 'Google Search Central: Budowa map witryn XML i higiena indeksowanych adresów', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: Dostęp robota OAI-SearchBot w pliku robots.txt i zaporach WAF', data: '2026-11-22' },
];

const ZRODLA_EN = [
  { url: 'https://developer.wordpress.org/advanced-administration/performance/optimization/', nazwa: 'WordPress Developer Resources: Performance Optimization, Object Cache & Page Caching', data: '2026-11-22' },
  { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (plugin and theme vulnerability share)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP <= 2.5 s, INP <= 200 ms, CLS <= 0.1 at 75th percentile)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', nazwa: 'Google Search Central: Build and submit clean XML sitemaps', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: Controlling OAI-SearchBot access in robots.txt and WAF', data: '2026-11-22' },
];

const FILARY_PL = [
  {
    nr: '01 / WYDAJNOŚĆ (LCP & INP)',
    tytul: 'Odchudzanie wtyczek i kreatorów (Elementor, Divi, WPBakery)',
    opis: 'Przeciętna firmowa instalacja WordPressa ładuje na każdej podstronie style i skrypty z 20-35 wtyczek (suwaki, formularze, pop-upy, czaty), co blokuje główny wątek telefonu i wybija wskaźnik INP powyżej 200 ms. Usuwamy zbędne rozszerzenia, odpinamy nieużywane zasoby CSS/JS per szablon (wp_dequeue_script), wdrażamy lokalne fonty WebP/AVIF oraz spinamy serwerowy page cache z pamięcią obiektową Redis.',
  },
  {
    nr: '02 / INDEKSACJA & CRAWL BUDGET',
    tytul: 'Porządek w tagach, archiwach autorów, załącznikach i ?s=',
    opis: 'Domyślny WordPress potrafi wygenerować pięć razy więcej cienkich stron archiwalnych niż realnych podstron oferty: puste archiwa tagów, pojedynczego autora, dat publikacji, strony załączników obrazków (attachment pages) oraz otwarte wyniki wyszukiwarki wewnętrznej (?s=). Czyścimy mapy XML (wp-sitemap.xml / Rank Math / Yoast), ustawiamy celowe dyrektywy noindex i kierujemy całą moc linkowania wewnętrznego na strony usług i cennika.',
  },
  {
    nr: '03 / DANE STRUKTURALNE JSON-LD',
    tytul: 'Jeden spójny graf @graph bez konfliktów między wtyczkami',
    opis: 'Częsty błąd na WordPressie to jednoczesne wstrzykiwanie sprzecznych znaczników Organization, LocalBusiness i FAQPage przez motyw, wtyczkę SEO oraz dodatki do gwiazdek opinii. Porządkujemy wyjście danych strukturalnych do jednego walidowanego grafu JSON-LD z jednoznacznymi identyfikatorami @id, zgodnego z treścią widoczną dla użytkownika.',
  },
  {
    nr: '04 / WYSZUKIWARKI AI (GEO)',
    tytul: 'Odblokowanie botów ChatGPT i Perplexity w WAF + /llms.txt',
    opis: 'Wtyczki bezpieczeństwa (Wordfence, Solid Security) oraz reguły Bot Fight Mode na serwerze potrafią po cichu blokować roboty OAI-SearchBot i PerplexityBot kodem HTTP 403, mimo że plik robots.txt je wpuszcza. Weryfikujemy odpowiedzi HTTP dla 12 botów AI, wdrażamy protokół IndexNow pod Bing i publikujemy w katalogu głównym przejrzysty plik /llms.txt.',
  },
];

const FILARY_EN = [
  {
    nr: '01 / SPEED (LCP & INP)',
    tytul: 'Plugin bloat cleanup & visual builder tuning (Elementor, Divi)',
    opis: 'Typical business WordPress builds enqueue CSS and JavaScript from 20-35 plugins on every URL (sliders, form builders, pop-ups, trackers), blocking the mobile main thread and pushing INP past 200 ms. We audit every active plugin, dequeue unused assets per template, self-host fonts, convert media to WebP/AVIF, and configure server page caching plus Redis object cache.',
  },
  {
    nr: '02 / INDEXING HYGIENE',
    tytul: 'Taxonomy, tag, author, attachment & internal search (?s=) cleanup',
    opis: 'Left on defaults, WordPress often indexes five times more thin archive URLs than commercial service pages: 1-post tags, single-author archives, date archives, media attachment pages and internal search queries (?s=). We prune XML sitemaps in Rank Math or Yoast, apply surgical noindex rules and consolidate internal link equity onto revenue pages.',
  },
  {
    nr: '03 / CONFLICT-FREE JSON-LD',
    tytul: 'Single validated @graph without overlapping plugin schema',
    opis: 'Themes, SEO plugins and review widgets frequently emit competing Organization, LocalBusiness and FAQPage blocks on the same page. We strip duplicate outputs and build one clean, interconnected JSON-LD @graph matching the visible copy on screen.',
  },
  {
    nr: '04 / AI SEARCH (GEO)',
    tytul: 'WAF allowlisting for OAI-SearchBot & PerplexityBot + /llms.txt',
    opis: 'WordPress security plugins (Wordfence, Solid Security) and CDN bot filters regularly serve HTTP 403 errors to OAI-SearchBot and PerplexityBot even when robots.txt allows them. We verify live HTTP responses across 12 AI crawlers, enable IndexNow for Bing, and publish a clean root /llms.txt index.',
  },
];

const DECYZJA_PL = [
  {
    id: 'zostac-gutenberg',
    stan: 'Lekki motyw blokowy (Gutenberg / własny motyw), 8-15 zadbanych wtyczek, redakcja często publikuje wpisy',
    sciezka: `Optymalizacja WordPressa w pakiecie SEO Standard (od ${fmtPl(CENY.seoStandard.pln)} zł/mies.) lub Premium (${fmtPl(CENY.seoPremium.pln)} zł/mies.)`,
    dlaczego: 'Brak kosztu przebudowy strony; po uporządkowaniu cache, indeksacji i JSON-LD serwis osiąga zielone Core Web Vitals i zachowuje wygodny edytor dla zespołu',
  },
  {
    id: 'zostac-woo',
    stan: 'Sklep WooCommerce lub serwis z rozbudowanymi polskimi integracjami kurierskimi i księgowymi',
    sciezka: 'Pozostanie na WordPressie + wdrożenie Redis, HPOS i odchudzenie szablonu kart',
    dlaczego: 'Gotowy ekosystem wtyczek e-commerce oszczędza dziesiątki godzin prac programistycznych, o ile baza danych i cache są poprawnie skonfigurowane',
  },
  {
    id: 'migracja-booster',
    stan: 'Stary motyw na Elementorze / Divi / WPBakery, 30+ wtyczek, nawracające infekcje malware lub mobilne LCP > 4 s',
    sciezka: `Migracja na czysty Next.js w pakiecie Booster Pack (${fmtPl(CENY.boosterPack.pln)} zł netto/mies., min. ${CENY.boosterPack.umowaMiesiecy} mies.)`,
    dlaczego: '0 zł opłaty startowej za budowę nowej strony; zamiast płacić programiście za łatanie długu technologicznego PHP, dostajesz szybki serwis bez wtyczek wraz z pełnym SEO i mapą przekierowań 301',
  },
  {
    id: 'migracja-i18n',
    stan: 'Strona B2B wchodząca na rynki zagraniczne (np. PL + EN + DE) lub potrzebująca dedykowanych kalkulatorów',
    sciezka: `Next.js osobno (od ${fmtPl(CENY.strona.pln)} zł netto) albo w pakiecie Booster Pack`,
    dlaczego: 'Brak konfliktów i narzutu wydajnościowego wielojęzycznych wtyczek PHP, natywne komponenty interaktywne React i błyskawiczny HTML dla robotów AI',
  },
];

const DECYZJA_EN = [
  {
    id: 'zostac-gutenberg',
    stan: 'Lean Gutenberg or custom PHP theme, 8-15 maintained plugins, active editorial blog team',
    sciezka: `Optimize existing WordPress in SEO Standard (from €${fmtEn(CENY.seoStandard.eur)}/mo) or Premium (€${fmtEn(CENY.seoPremium.eur)}/mo)`,
    dlaczego: 'Fastest ROI with zero rebuild disruption; tuning Redis, page cache, sitemap rules and JSON-LD passes Core Web Vitals while keeping your familiar editor',
  },
  {
    id: 'zostac-woo',
    stan: 'WooCommerce store relying on regional payment, courier and accounting plugins',
    sciezka: 'Stay on WordPress + enable HPOS tables, Redis object cache & template script pruning',
    dlaczego: 'Mature e-commerce integrations save custom engineering cost once database bottlenecks and facet indexation are cleaned up',
  },
  {
    id: 'migracja-booster',
    stan: 'Legacy Elementor / Divi / WPBakery build, 30+ plugins, recurring security patches or mobile LCP > 4 s',
    sciezka: `Migrate to custom Next.js inside Booster Pack (€${fmtEn(CENY.boosterPack.eur)} net/mo, min. ${CENY.boosterPack.umowaMiesiecy} months)`,
    dlaczego: '€0 upfront website build fee; instead of paying hourly to patch brittle PHP shortcodes, you get a plugin-free Next.js site, 1:1 301 redirects and full monthly SEO',
  },
  {
    id: 'migracja-i18n',
    stan: 'Multilingual B2B lead-gen site (EN + DE + PL) or custom interactive ROI calculators',
    sciezka: `Standalone Next.js (from €${fmtEn(CENY.strona.eur)} net) or Booster Pack`,
    dlaczego: 'Zero multilingual plugin overhead, deterministic reciprocal hreflang, instant edge HTML for AI crawlers and native React tools',
  },
];

const CENNIK_PL = [
  {
    id: 'wp-audyt',
    opcja: 'Jednorazowy audyt techniczny i treściowy WordPress SEO',
    kwota: `od ${fmtPl(CENY.audytSeo.pln)} zł netto`,
    umowa: 'Zlecenie jednorazowe (3-5 dni roboczych)',
    zakres: 'Pełny przegląd wtyczek, bazy i CWV (LCP/INP/CLS), indeksacji taksonomii, konfliktu JSON-LD, dostępu botów AI oraz lista zadań dla programisty lub naszego zespołu',
  },
  {
    id: 'wp-standard',
    opcja: 'Pakiet SEO Standard (prowadzenie WordPressa)',
    kwota: `od ${fmtPl(CENY.seoStandard.pln)} zł netto / mies.`,
    umowa: 'Umowa miesięczna, wypowiedzenie 1 mies.',
    zakres: 'Wdrożenie poprawek SEO na WordPressie, do 20 fraz, 2 treści i 2 linki/mies., wizytówka Google, panel klienta 24/7 (opcja pomiaru AI: +490 zł netto/mies.)',
  },
  {
    id: 'wp-premium',
    opcja: 'Pakiet SEO Premium (WordPress + pełne GEO / AI)',
    kwota: `${fmtPl(CENY.seoPremium.pln)} zł netto / mies.`,
    umowa: 'Umowa miesięczna, wypowiedzenie 1 mies.',
    zakres: 'Pełna optymalizacja techniczna i CRO na WordPressie, do 50 fraz, 4 treści i 4 linki/mies. oraz cotygodniowy monitoring 30 pytań w ChatGPT, Gemini, Perplexity i AI Overviews',
  },
  {
    id: 'wp-booster',
    opcja: 'Booster Pack (przebudowa z WordPressa na Next.js + SEO)',
    kwota: `${fmtPl(CENY.boosterPack.pln)} zł netto / mies.`,
    umowa: `Min. ${CENY.boosterPack.umowaMiesiecy} mies., potem umowa miesięczna`,
    zakres: '0 zł za budowę nowej strony w Next.js, bezpieczna migracja adresów URL i przekierowań 301, hosting, SSL, wizytówka Google oraz pełne pozycjonowanie od 1. dnia',
  },
];

const CENNIK_EN = [
  {
    id: 'wp-audyt',
    opcja: 'Standalone WordPress technical & content SEO audit',
    kwota: `from €${fmtEn(CENY.audytSeo.eur)} net`,
    umowa: 'One-off engagement (3-5 business days)',
    zakres: 'Deep audit of plugin overhead, CWV (LCP/INP/CLS), taxonomy index bloat, JSON-LD conflicts, AI crawler access and prioritized developer fix roadmap',
  },
  {
    id: 'wp-standard',
    opcja: 'SEO Standard (ongoing WordPress SEO retainer)',
    kwota: `from €${fmtEn(CENY.seoStandard.eur)} net / mo`,
    umowa: 'Monthly rolling contract, cancel anytime',
    zakres: 'Technical WordPress fixes, up to 20 keywords, 2 content pieces & 2 links/mo, Google Business Profile, 24/7 client portal (optional weekly AI tracking: +€115/mo)',
  },
  {
    id: 'wp-premium',
    opcja: 'SEO Premium (WordPress scale + weekly GEO included)',
    kwota: `€${fmtEn(CENY.seoPremium.eur)} net / mo`,
    umowa: 'Monthly rolling contract, cancel anytime',
    zakres: 'Full technical & mobile CRO optimization, up to 50 keywords, 4 content pieces & 4 links/mo, plus weekly 30-prompt tracking in ChatGPT, Gemini, Perplexity & AI Overviews',
  },
  {
    id: 'wp-booster',
    opcja: 'Booster Pack (migrate WordPress to Next.js + full SEO)',
    kwota: `€${fmtEn(CENY.boosterPack.eur)} net / mo`,
    umowa: `Min. ${CENY.boosterPack.umowaMiesiecy}-month term, monthly rolling after`,
    zakres: '€0 upfront custom Next.js website build, complete URL/301 migration from WordPress, managed hosting, SSL, Google Maps and ongoing SEO from day one',
  },
];

const FAQ_PL = [
  {
    id: 'yoast-czy-rank-math',
    question: 'Yoast SEO czy Rank Math - którą wtyczkę wybrać na WordPressie?',
    answer: 'Żadna wtyczka SEO nie podnosi pozycji sama z siebie - służy jedynie do wygodnego wystawienia tytułów, adresów kanonicznych, mapy XML i schematów JSON-LD. Pracujemy zarówno na Rank Math, jak i na Yoast SEO (lub The SEO Framework): wyłączamy zbędne moduły obciążające panel, blokujemy indeksację pustych archiwów i pilnujemy, żeby zielone kropki we wtyczce nie prowadziły do sztucznego upychania fraz.',
  },
  {
    id: 'elementor-divi-optymalizacja',
    question: 'Czy da się przyspieszyć stronę zbudowaną na Elementorze lub Divi bez pisania jej od nowa?',
    answer: 'W wielu przypadkach tak: wyłączenie nieużywanych widżetów kreatora, odpięcie globalnych arkuszy wtyczek formularzy na podstronach bez formularza, zamiana obrazów na WebP, lokalne hostowanie fontów i włączenie pamięci podręcznej serwera z Redisem potrafi wyraźnie poprawić LCP i INP. Jeżeli jednak motyw generuje kilkanaście megabajtów DOM-u i dziesiątki przestarzałych shortcode’ów, wprost pokażemy w audycie, kiedy taniej wyjdzie migracja na Next.js w Booster Packu.',
  },
  {
    id: 'dlaczego-wtyczki-bezpieczenstwo-seo',
    question: 'Co ma bezpieczeństwo wtyczek WordPress do pozycji w Google?',
    answer: 'Według raportów Patchstack ponad 90% wykrywanych luk w ekosystemie WordPress pochodzi z wtyczek firm trzecich. Przejęta witryna najczęściej nie zostaje wyłączona - atakujący wstrzykuje skrypt generujący dziesiątki tysięcy japońskich lub farmaceutycznych podstron spamowych w indeksie Google, których czyszczenie w Search Console zajmuje tygodnie.',
  },
  {
    id: 'wordpress-a-chatgpt-perplexity',
    question: 'Jak przygotować stronę na WordPressie pod ChatGPT i Google AI Overviews?',
    answer: 'Po pierwsze sprawdzamy, czy zapora WAF (np. Wordfence lub Cloudflare) nie zwraca błędu 403 robotom OAI-SearchBot i PerplexityBot. Po drugie porządkujemy strukturę odpowiedzi (jasne nagłówki pytań, tabele, jawne widełki cenowe w czystym HTML-u bez ukrywania ich za akordeonami JS) oraz dodajemy plik /llms.txt i powiadomienia IndexNow do wyszukiwarki Bing.',
  },
  {
    id: 'dostep-do-panelu-wp',
    question: 'Czy muszę mieć własnego programistę WordPress, żebyście wdrożyli poprawki SEO?',
    answer: 'Nie. Jeśli powierzysz nam dostęp administracyjny i dostęp do serwera (po wykonaniu kopii zapasowej), nasz zespół techniczny samodzielnie wdraża optymalizacje wtyczek, przekierowania 301, dane strukturalne JSON-LD i nowe podstrony ofertowe w ramach abonamentu. Jeżeli macie własny dział IT, przygotowujemy precyzyjną specyfikację techniczną i weryfikujemy wdrożenie na środowisku testowym.',
  },
];

const FAQ_EN = [
  {
    id: 'yoast-vs-rank-math',
    question: 'Should we use Yoast SEO or Rank Math on WordPress?',
    answer: 'Neither plugin improves Google rankings on its own - both are simply interfaces for titles, canonicals, XML sitemaps and JSON-LD templates. We work cleanly inside whichever plugin you already run (Rank Math, Yoast SEO or The SEO Framework), disabling bloated add-on modules, cleaning up taxonomy sitemap rules and ignoring misleading keyword-density traffic lights.',
  },
  {
    id: 'elementor-divi-speed',
    question: 'Can you fix Core Web Vitals on an Elementor or Divi site without a full rebuild?',
    answer: 'Often yes: disabling unused widget packs, dequeuing global plugin scripts on pages that do not use them, self-hosting fonts, serving WebP/AVIF media and pairing server page caching with Redis brings many Elementor builds back within LCP <= 2.5 s and INP <= 200 ms. When a legacy theme is buried under broken shortcodes, we show you transparently when switching to Next.js in our Booster Pack costs less than endless patching.',
  },
  {
    id: 'plugin-security-seo-impact',
    question: 'Why does WordPress plugin security matter directly for SEO?',
    answer: 'Per Patchstack’s annual research, more than 90% of disclosed WordPress vulnerabilities stem from third-party plugins. Compromised sites rarely just go offline - attackers typically inject cloaked pharma or Japanese keyword spam that floods Google Search Console with tens of thousands of toxic URLs, tanking crawl budget and domain trust.',
  },
  {
    id: 'wordpress-chatgpt-ai-overviews',
    question: 'How do you optimize a WordPress site for ChatGPT and Google AI Overviews?',
    answer: 'First we verify that security plugins (Wordfence, Solid Security) and CDN bot rules are not returning HTTP 403 to OAI-SearchBot or PerplexityBot. Next we structure service and pricing pages with direct answer blocks, HTML comparison tables and conflict-free JSON-LD @graph entities, wire up IndexNow for Bing, and publish a clean /llms.txt file.',
  },
  {
    id: 'do-we-need-our-own-developer',
    question: 'Do we need an in-house WordPress developer to implement your SEO fixes?',
    answer: 'No. With staging/backup access, our technical team implements plugin cleanup, 301 redirects, schema markup and new landing pages directly inside your monthly retainer. If your company prefers internal deployment, we deliver exact code specifications and verify every release.',
  },
];

const kontener = { maxWidth: '880px', margin: '0 auto' };
const h2Styl = { fontSize: 'clamp(1.6rem, 3.3vw, 2.2rem)', fontWeight: 500, lineHeight: 1.12, letterSpacing: '-0.03em', color: 'var(--w-tusz)', margin: '0 0 1.15rem', scrollMarginTop: '110px' };
const h3Styl = { fontSize: 'clamp(1.18rem, 2.2vw, 1.38rem)', fontWeight: 600, lineHeight: 1.25, letterSpacing: '-0.02em', color: 'var(--w-tusz)', margin: '0 0 0.65rem' };
const akapit = { fontSize: '1.06rem', lineHeight: 1.7, color: 'var(--w-tusz-2)', margin: '0 0 1.1rem' };
const link = { color: 'var(--w-pomarancz-tekst)', textDecoration: 'underline', fontWeight: 600 };
const karta = { background: 'var(--w-karta)', border: '1px solid var(--w-linia)', borderRadius: '24px', boxShadow: 'none', padding: 'clamp(1.5rem, 4vw, 2.5rem)' };

export default function WordpressSeoClient() {
  const lang = useLocale();
  const en = lang === 'en';
  const kontakt = hash('kontakt', lang);
  const FILARY = en ? FILARY_EN : FILARY_PL;
  const DECYZJA = en ? DECYZJA_EN : DECYZJA_PL;
  const CENNIK = en ? CENNIK_EN : CENNIK_PL;
  const ZRODLA = en ? ZRODLA_EN : ZRODLA_PL;
  const FAQ = en ? FAQ_EN : FAQ_PL;

  const hrefAudytNarz = hrefJesliOpublikowana('/narzedzia/audyt-seo');
  const hrefBotyNarz = hrefJesliOpublikowana('/narzedzia/tester-robotow-ai-robots-txt');
  const hrefPorownanieNextWp = hrefJesliOpublikowana('/porownania/nextjs-vs-wordpress-seo');
  const hrefCennik = hrefJesliOpublikowana('/cennik-pozycjonowania');

  return (
    <main className="subpage-main" style={{ backgroundColor: 'var(--w-papier)', color: 'var(--w-tusz)', minHeight: '100vh', overflowX: 'hidden' }}>
      <section style={{ paddingTop: 'clamp(136px, 14vw, 166px)', paddingBottom: '2rem' }}>
        <div className="container" style={kontener}>
          <Reveal>
            <div className="section-tag" style={{ color: 'var(--w-pomarancz-tekst)', fontFamily: 'var(--w-mono)', fontWeight: 500, fontSize: '0.82rem', letterSpacing: '0.14em' }}>
              <span className="asterisk" style={{ color: 'var(--w-pomarancz)' }}>✳</span> {en ? 'WordPress Technical SEO & GEO' : 'Techniczne SEO na WordPressie · GEO'}
            </div>
            <h1 style={{ fontSize: 'clamp(2.15rem, 4.8vw, 3.4rem)', lineHeight: 1.08, fontWeight: 500, letterSpacing: '-0.035em', margin: '0 0 1.35rem', color: 'var(--w-tusz)' }}>
              {en
                ? 'WordPress SEO services: plugin cleanup, Core Web Vitals and AI search readiness'
                : 'Pozycjonowanie WordPress: techniczne SEO, odchudzanie wtyczek i gotowość na AI'}
            </h1>
          </Reveal>

          <AnswerBox etykieta={en ? 'Short answer' : undefined}>
            {en
              ? `WordPress sites rarely struggle in Google because of PHP itself - they lose rankings to visual builder bloat (Elementor, Divi) hurting mobile INP and LCP, thousands of thin tag and attachment archives, conflicting JSON-LD from overlapping plugins, and WAF rules blocking AI search bots. We optimize existing WordPress sites on rolling monthly contracts from €${fmtEn(CENY.seoStandard.eur)} net/mo, or migrate outgrown builds to custom Next.js for €0 upfront inside our Booster Pack (€${fmtEn(CENY.boosterPack.eur)} net/mo).`
              : `Strony na WordPressie rzadko przegrywają w Google przez sam silnik PHP - tracą pozycje przez nadmiar wtyczek i ciężkie kreatory (Elementor, Divi) psujące mobilne LCP i INP, tysiące pustych archiwów tagów i załączników w indeksie, zduplikowane dane JSON-LD oraz zapory WAF wycinające boty AI. Pozycjonujemy i odchudzamy istniejące serwisy WordPress w umowie miesięcznej od ${fmtPl(CENY.seoStandard.pln)} zł netto/mies., a przestarzałe instalacje przenosimy za 0 zł opłaty startowej na szybki Next.js w pakiecie Booster Pack (${fmtPl(CENY.boosterPack.pln)} zł netto/mies.).`}
          </AnswerBox>

          <Byline sciezka={SCIEZKA} takzeEn />

          <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', margin: '0.5rem 0 0' }}>
            <a href={kontakt} className="hero-btn-primary" data-cta="wp_seo_hero" data-plan="standard">
              {en ? 'Request a WordPress SEO quote in 24h' : 'Zamów wycenę pozycjonowania WordPress w 24 h'}
            </a>
            <a href={en ? '#pricing' : '#cennik'} className="hero-btn-secondary" data-cta="wp_seo_cennik">
              {en ? 'See transparent WordPress SEO pricing' : 'Zobacz cennik i warianty współpracy'}
            </a>
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'technical-scope' : 'zakres-techniczny'}>
        <div className="container" style={kontener}>
          <h2 style={h2Styl}>
            {en
              ? 'What we fix inside your WordPress installation in month one'
              : 'Co naprawiamy w silniku WordPressa już w pierwszym miesiącu współpracy'}
          </h2>
          <p style={akapit}>
            {en
              ? 'Installing another SEO plugin will not fix crawl bloat or mobile main-thread lag. Our audit and implementation focus on four architectural layers that move organic rankings, conversion rates and AI citations:'
              : 'Zainstalowanie kolejnej wtyczki nie naprawi przeładowanego kodu ani rozdmuchanego indeksu w Google Search Console. Naszą pracę na WordPressie zaczynamy od czterech warstw technicznych, od których zależy widoczność w wyszukiwarce i modelach AI:'}
          </p>
          <div style={{ display: 'grid', gap: '1.15rem', marginTop: '1.25rem' }}>
            {FILARY.map((f) => (
              <div key={f.nr} style={karta}>
                <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', color: 'var(--w-pomarancz-tekst)', marginBottom: '0.45rem' }}>
                  {f.nr}
                </div>
                <h3 style={h3Styl}>{f.tytul}</h3>
                <p style={{ ...akapit, margin: 0 }}>{f.opis}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="de-abschnitt" id={en ? 'wordpress-or-nextjs' : 'wordpress-czy-nextjs'}>
        <div className="container" style={kontener}>
          <div style={karta}>
            <h2 style={h2Styl}>
              {en
                ? 'When to optimize your current WordPress vs when to migrate to Next.js'
                : 'Kiedy opłaca się optymalizować WordPressa, a kiedy przejść na Next.js w Booster Packu?'}
            </h2>
            <p style={akapit}>
              {en
                ? 'Because we run ongoing WordPress SEO retainers and engineer custom Next.js websites in-house, we have zero incentive to push an unnecessary rebuild - or keep billing hours on a broken theme. Here is how we advise clients before signing:'
                : 'Prowadzimy stałe kampanie SEO na WordPressie i jednocześnie budujemy autorskie strony w Next.js, dlatego nie musimy na siłę sprzedawać przebudowy strony ani łatać motywu, który nie rokuje. Przed startem oceniamy Twój serwis według czterech kryteriów:'}
            </p>
            <CompareTable
              id="tabela-decyzja-wp-nextjs"
              caption={en ? 'Optimize existing WordPress or migrate to Next.js: 4 typical B2B scenarios' : 'Optymalizacja obecnego WordPressa czy migracja na Next.js: 4 scenariusze decyzyjne'}
              columns={en
                ? [
                    { key: 'stan', label: 'Current website state' },
                    { key: 'sciezka', label: 'Recommended path' },
                    { key: 'dlaczego', label: 'Technical & budget rationale' },
                  ]
                : [
                    { key: 'stan', label: 'Stan obecnej strony na WordPressie' },
                    { key: 'sciezka', label: 'Rekomendowana ścieżka' },
                    { key: 'dlaczego', label: 'Uzasadnienie techniczne i finansowe' },
                  ]}
              rows={DECYZJA}
              przypis={en
                ? 'All prices net excluding VAT. Booster Pack includes custom Next.js build + hosting + full SEO with a 3-month minimum contract.'
                : 'Wszystkie kwoty netto. Pakiet Booster Pack obejmuje budowę strony w Next.js za 0 zł na starcie, serwer, SSL i pełne SEO przy umowie na min. 3 miesiące.'}
            />
            <p style={{ ...akapit, marginTop: '1.1rem', marginBottom: 0 }}>
              {en ? (
                <>
                  Want to inspect your WordPress site right now before talking to us?{' '}
                  {hrefAudytNarz && <>Run a scan of up to {AUDYT.stron} URLs across {AUDYT.regul} rules in our <Link href="/narzedzia/audyt-seo" style={link}>free SEO audit tool</Link></>}
                  {hrefBotyNarz && <>, check whether Wordfence or Cloudflare blocks AI crawlers in our <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={link}>AI crawler &amp; robots.txt tester ({ROBOTY_AI.botow} bots)</Link></>}
                  {hrefPorownanieNextWp && <>, or read our full architectural breakdown: <Link href="/porownania/nextjs-vs-wordpress-seo" style={link}>Next.js vs WordPress for SEO &amp; AI</Link></>}.
                </>
              ) : (
                <>
                  Chcesz sprawdzić kondycję swojego WordPressa jeszcze przed rozmową?{' '}
                  {hrefAudytNarz && <>Przeskanuj do {AUDYT.stron} podstron w {AUDYT.regul} regułach w naszym <Link href="/narzedzia/audyt-seo" style={link}>darmowym audycie SEO online</Link></>}
                  {hrefBotyNarz && <>, przetestuj zaporę WAF i plik <code>robots.txt</code> dla {ROBOTY_AI.botow} botów w <Link href="/narzedzia/tester-robotow-ai-robots-txt" style={link}>testerze robotów AI</Link></>}
                  {hrefPorownanieNextWp && <> albo przeczytaj szczegółowe zestawienie <Link href="/porownania/nextjs-vs-wordpress-seo" style={link}>Next.js vs WordPress pod SEO i AI</Link></>}.
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
              {en ? 'Transparent WordPress SEO pricing (2026)' : 'Ile kosztuje pozycjonowanie WordPress: jawny cennik 2026'}
            </h2>
            <p style={akapit}>
              {en
                ? 'No 12- or 24-month lock-ins on our SEO Standard and SEO Premium retainers, and 100% of your Google Search Console, GA4 and Business Profile accounts stay registered under your company email:'
                : 'W pakietach SEO Standard i SEO Premium pracujemy w uczciwej umowie miesięcznej bez wiązania na 12-24 miesiące, a pełna własność kont Search Console, GA4, wizytówki Google oraz napisanych treści zostaje po Twojej stronie:'}
            </p>
            <CompareTable
              id="tabela-cennik-wordpress-seo"
              caption={en ? 'WordPress SEO audit, monthly retainers and Booster Pack migration rates (EUR net)' : 'Cennik audytu, pakietów pozycjonowania WordPress i migracji w Booster Packu (PLN netto)'}
              columns={en
                ? [
                    { key: 'opcja', label: 'Service / Plan' },
                    { key: 'kwota', label: 'Net price' },
                    { key: 'umowa', label: 'Contract term' },
                    { key: 'zakres', label: 'What is included' },
                  ]
                : [
                    { key: 'opcja', label: 'Usługa / Pakiet' },
                    { key: 'kwota', label: 'Cena netto' },
                    { key: 'umowa', label: 'Warunki umowy' },
                    { key: 'zakres', label: 'Co dokładnie obejmuje' },
                  ]}
              rows={CENNIK}
              przypis={en
                ? 'Source: AI SEO COMPANY published pricing (lib/narzedziaLiczby.js, November 2026). All prices exclude VAT.'
                : 'Źródło: publiczny cennik AI SEO COMPANY (lib/narzedziaLiczby.js, stan: listopad 2026). Do kwot należy doliczyć 23% VAT.'}
            />
            {hrefCennik && (
              <p style={{ ...akapit, marginTop: '1rem', marginBottom: 0 }}>
                {en ? (
                  <>Full side-by-side deliverables of every plan are listed on our <Link href="/cennik-pozycjonowania" style={link}>SEO pricing page</Link>.</>
                ) : (
                  <>Pełne zestawienie zakresu wszystkich pakietów znajdziesz na stronie <Link href="/cennik-pozycjonowania" style={link}>cennik pozycjonowania</Link>.</>
                )}
              </p>
            )}
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ}
        title={en ? 'Questions about WordPress SEO services' : 'Najczęstsze pytania o pozycjonowanie stron na WordPressie'}
        sectionId={en ? 'faq' : 'pytania'}
      />

      <div className="container" style={{ ...kontener, paddingBottom: '3rem' }}>
        <Zrodla zrodla={ZRODLA} en={en} />
      </div>

      <Contact />
    </main>
  );
}
