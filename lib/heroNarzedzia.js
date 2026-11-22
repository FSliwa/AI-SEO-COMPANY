// Dane hero strony głównej oraz sekcji darmowych narzędzi w stylu airSlate (19.11.2026).
// Jedno miejsce na teksty trzech wersji językowych, adresy narzędzi i liczby. Czysty ESM bez React.
//
// Skąd co:
//  - adresy: rejestr tras (hrefJesliOpublikowana, hrefWJezyku) i rejestr DE (hrefDe);
//  - liczby: lib/narzedziaLiczby.js (reguły, podstrony, silniki, pytania, boty, minuty, domeny w grafie);
//  - wynik 95 i data: przebieg audytu własnej domeny z lib/audytPrzyklad.js (18.11.2026);
//  - kalkulator: policzStraty(PRZYKLADY.usluga);
//  - podglądy wyników z Figmy (720/1080/1440 WebP): lib/narzedziaObrazy.js.

import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, POROWNYWARKA_CWV, ROBOTY_AI, WIDOCZNOSC } from './narzedziaLiczby';
import { RUN, DATA as DATA_AUDYTU } from './audytPrzyklad';
import { PRZYKLADY, policzStraty } from './kalkulatorStrat';
import { hrefJesliOpublikowana } from './publikacja';
import { hrefWJezyku } from './linkiEn';
import { hrefDe } from './stronyDe';
import { obrazKarty } from './narzedziaObrazy';

function dataAudytu(locale) {
  const [r, m, d] = DATA_AUDYTU.split('-').map(Number);
  if (locale === 'en') return `${d} ${['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'][m - 1]} ${r}`;
  return `${d}.${String(m).padStart(2, '0')}.${r}`;
}

const NBSP = '\u00A0';
const grupuj = (n, locale) => String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, locale === 'en' ? ',' : NBSP);

function adres(klucz, locale) {
  if (locale === 'de') return hrefDe(klucz);
  const h = hrefJesliOpublikowana(klucz);
  return h ? hrefWJezyku(h, locale) : null;
}

// --- Teksty hero ----------------------------------------------------------------------------------
// display = duży nagłówek, sub = podtytuł (oba w jednym H1), lead = zdanie wstępne.
// Eyebrow mówi o 8 darmowych narzędziach i panelu klienta (22.11.2026).
export function tekstyHero(locale) {
  if (locale === 'en') {
    return {
      eyebrow: '13 FREE SEO & AI TOOLS · 24/7 CLIENT PORTAL',
      display: 'SEO agency with the best technical solutions',
      sub: 'SEO that drives sales. SEO & Marketing Agency for Companies',
      lead: 'We do what search engine optimisation companies rarely do: give clients the best technical tools, Poland SEO execution from Warsaw, and live reporting from their own Google accounts.',
      ctaPrimary: 'Get Proposal',
      ctaSecondary: 'View Portfolio',
      mikro: 'Free quote within 24 h · no sales rep',
    };
  }
  if (locale === 'de') {
    return {
      eyebrow: '13 KOSTENLOSE SEO- & KI-TOOLS · KUNDENPORTAL 24/7',
      display: 'SEO Agentur mit den besten technischen Lösungen',
      sub: 'SEO und KI-Sichtbarkeit für Unternehmen im DACH-Raum',
      lead: 'Ihre Website und Ihr Projekt erhalten die besten technischen Lösungen: eigene Werkzeuge, Berichte mit Live-Daten aus Ihren Google-Konten und SEO, das Wachstum antreibt.',
      ctaPrimary: 'Angebot anfragen',
      ctaSecondary: 'Referenzen',
      mikro: 'Kostenloses Angebot in 24 Std. · ohne Vertriebler',
    };
  }
  return {
    eyebrow: '13 DARMOWYCH NARZĘDZI I PANEL KLIENTA 24/7',
    display: 'Agencja SEO z najlepszymi rozwiązaniami technicznymi',
    sub: 'Pozycjonowanie stron, które buduje sprzedaż. Agencja SEO i Marketingowa z Warszawy',
    lead: 'Twój projekt i strony dostają najlepsze rozwiązania techniczne: własne narzędzia, panel z danymi na żywo i pozycjonowanie napędzające wzrost.',
    ctaPrimary: 'Wyceń projekt',
    ctaSecondary: 'Zobacz portfolio',
    mikro: 'Bezpłatna wycena w 24 h · bez handlowca',
  };
}

// --- Scena hero w układzie airSlate bezpośrednio nad górami i chmurami (bez tła-kafla pod kartami) ---
export function scenaHero(locale) {
  const kat = RUN.kategorie;
  const data = dataAudytu(locale);
  const hrefAudyt = adres('/narzedzia/audyt-seo', locale) || '#uslugi';
  const hrefAi = adres('/sprawdz-widocznosc-w-ai', locale);
  const hrefAutorytet = adres('/narzedzia/autorytet-domeny', locale);
  const hrefKalk = adres('/narzedzia/kalkulator-strat-seo', locale);
  const hrefLlms = adres('/narzedzia/generator-llms-txt', locale);
  const hrefMakieta = adres('/narzedzia/makieta-redesignu', locale);
  const hrefBoty = adres('/narzedzia/tester-robotow-ai-robots-txt', locale);
  const hrefCwv = adres('/narzedzia/test-core-web-vitals-porownanie', locale);
  const hrefPanel = locale === 'de'
    ? (hrefAi || '#why-us')
    : (adres('/panel-klienta', locale) || '#panel-klienta');
  const hrefNarzedzia = locale === 'de'
    ? (adres('/narzedzia', 'de') || hrefLlms || hrefAudyt)
    : (locale === 'en' ? '#free-tools' : '#darmowe-narzedzia');

  if (locale === 'en') {
    const narzedziaKafelki = [
      { id: 'audyt', nazwa: 'SEO Audit', href: hrefAudyt, ton: '1' },
      { id: 'ai', nazwa: 'AI Check', href: hrefAi || '#free-tools', ton: '2' },
      { id: 'boty', nazwa: 'AI Bots', href: hrefBoty || '#free-tools', ton: '5' },
      { id: 'cwv', nazwa: 'CWV VS', href: hrefCwv || '#free-tools', ton: '3' },
      { id: 'kalk', nazwa: 'ROI Loss', href: hrefKalk || '#free-tools', ton: '4' },
      { id: 'makieta', nazwa: 'Redesign', href: hrefMakieta || '#free-tools', ton: '6' },
    ];
    return {
      regionLabel: 'Our free SEO tools and client portal',
      h2Sr: 'Overview of free SEO tools and the 24/7 client portal',
      audyt: {
        href: hrefAudyt,
        aria: `Free SEO audit (${AUDYT.regul} rules): check your website`,
        tytul: 'Free SEO audit',
        meta: `${RUN.wynik}/100`,
        domena: `ai-seo-company.pl · ${data}`,
        wiersze: [
          { stan: 'ok', tekst: 'Technical SEO', wynik: `${kat.techniczne.wynik}/100` },
          { stan: 'ok', tekst: 'Content & speed', wynik: `${kat.tresc.wynik}/100` },
          { stan: 'go', tekst: 'AI readiness', wynik: 'Run check →' },
        ],
      },
      ekosystem: {
        href: hrefNarzedzia,
        aria: 'See all 13 free SEO and AI tools',
        tytul: '13 free tools',
        etykietaDol: 'Access',
        statusDol: 'No sign-up',
        kafelki: narzedziaKafelki,
      },
      panel: {
        href: hrefPanel,
        aria: 'Client portal: see live Google data demo',
        tytul: 'Client Portal 24/7',
        ekranLiczba: '95 / 100',
        ekranMeta: `GSC + AI · ${data}`,
        weryfikacja: 'From your Google accounts',
        plakietkaTytul: 'Updated every day',
        plakietkaOpis: 'GSC · enquiries · change log',
        chipy: ['Search Console', `${WIDOCZNOSC.silnikow} AI engines`, 'API & MCP'],
      },
    };
  }

  if (locale === 'de') {
    const narzedziaKafelki = [
      { id: 'audyt', nazwa: 'SEO Audit', href: hrefAudyt, ton: '1' },
      { id: 'ai', nazwa: 'KI-Check', href: hrefAi || hrefAudyt, ton: '2' },
      { id: 'boty', nazwa: 'KI-Bots', href: hrefBoty || hrefAudyt, ton: '5' },
      { id: 'cwv', nazwa: 'CWV Test', href: hrefCwv || hrefAudyt, ton: '3' },
      { id: 'kalk', nazwa: 'Rechner', href: hrefKalk || hrefAudyt, ton: '4' },
      { id: 'llms', nazwa: 'llms.txt', href: hrefLlms || hrefAudyt, ton: '6' },
    ];
    return {
      regionLabel: 'Unsere kostenlosen SEO-Tools und Kundenportal',
      h2Sr: 'Überblick über kostenlose SEO-Tools und Live-Berichte',
      audyt: {
        href: hrefAudyt,
        aria: `Kostenloser SEO Audit (${AUDYT.regul} Regeln): Website prüfen`,
        tytul: 'Kostenloser SEO Audit',
        meta: `${RUN.wynik}/100`,
        domena: `ai-seo-company.pl · ${data}`,
        wiersze: [
          { stan: 'ok', tekst: 'Technisches SEO', wynik: `${kat.techniczne.wynik}/100` },
          { stan: 'ok', tekst: 'Inhalt & Tempo', wynik: `${kat.tresc.wynik}/100` },
          { stan: 'go', tekst: 'KI-Tauglichkeit', wynik: 'Prüfen →' },
        ],
      },
      ekosystem: {
        href: hrefNarzedzia,
        aria: 'Alle 13 kostenlosen SEO- und KI-Tools sowie 10 PDF-Vorlagen öffnen',
        tytul: '13 kostenlose Tools',
        etykietaDol: 'Zugang',
        statusDol: 'Ohne Anmeldung',
        kafelki: narzedziaKafelki,
      },
      panel: {
        href: hrefPanel,
        aria: 'KI-Sichtbarkeit in ChatGPT, Gemini und Perplexity prüfen',
        tytul: 'KI-Sichtbarkeit & Portal',
        ekranLiczba: '95 / 100',
        ekranMeta: `GSC + KI · ${data}`,
        weryfikacja: 'Live aus Ihren Google-Konten',
        plakietkaTytul: 'Laufende Messung',
        plakietkaOpis: 'GSC · Anfragen · Protokoll',
        chipy: ['Search Console', `${WIDOCZNOSC.silnikow} KI-Engines`, 'llms.txt & Bots'],
      },
    };
  }

  const narzedziaKafelki = [
    { id: 'audyt', nazwa: 'Audyt', href: hrefAudyt, ton: '1' },
    { id: 'ai', nazwa: 'AI (GEO)', href: hrefAi || '#narz-sprawdzarka-ai', ton: '2' },
    { id: 'boty', nazwa: 'Boty AI', href: hrefBoty || '#narz-tester-robotow-ai-robots-txt', ton: '5' },
    { id: 'cwv', nazwa: 'CWV VS', href: hrefCwv || '#narz-test-core-web-vitals-porownanie', ton: '3' },
    { id: 'kalk', nazwa: 'Straty', href: hrefKalk || '#narz-kalkulator-strat-seo', ton: '4' },
    { id: 'makieta', nazwa: 'Makieta', href: hrefMakieta || '#narz-makieta-redesignu', ton: '6' },
  ];

  return {
    regionLabel: 'Nasze darmowe narzędzia SEO i panel klienta',
    h2Sr: 'Przegląd 13 darmowych narzędzi SEO i panelu klienta 24/7',
    audyt: {
      href: hrefAudyt,
      aria: `Darmowy audyt SEO (${AUDYT.regul} reguł): sprawdź swoją stronę`,
      tytul: 'Darmowy audyt SEO',
      meta: `${RUN.wynik}/100`,
      domena: `ai-seo-company.pl · ${data}`,
      wiersze: [
        { stan: 'ok', tekst: 'SEO techniczne', wynik: `${kat.techniczne.wynik}/100` },
        { stan: 'ok', tekst: 'Treść i szybkość', wynik: `${kat.tresc.wynik}/100` },
        { stan: 'go', tekst: 'Gotowość na AI', wynik: 'Sprawdź →' },
      ],
    },
    ekosystem: {
      href: hrefNarzedzia,
      aria: 'Przejdź do sekcji wszystkich 13 darmowych narzędzi',
      tytul: '13 darmowych narzędzi',
      etykietaDol: 'Dostęp',
      statusDol: 'Bez rejestracji',
      kafelki: narzedziaKafelki,
    },
    panel: {
      href: hrefPanel,
      aria: 'Panel klienta 24/7: zobacz demo z danymi Google na żywo',
      tytul: 'Panel klienta 24/7',
      ekranLiczba: '95 / 100',
      ekranMeta: `GSC + AI · ${data}`,
      weryfikacja: 'Dane z Twoich kont Google',
      plakietkaTytul: 'Widoczne codziennie',
      plakietkaOpis: 'GSC · zapytania · dziennik zmian',
      chipy: ['Search Console', `${WIDOCZNOSC.silnikow} silników AI`, 'API i MCP'],
    },
  };
}

// --- Sekcja wszystkich 6 darmowych narzędzi w układzie airSlate (zdj. 2) ---------------------------
export function sekcjaNarzedziDane(locale) {
  const isEn = locale === 'en';
  const lang = isEn ? 'en' : 'pl';
  const straty = policzStraty(PRZYKLADY.usluga);
  const kwota = (n) => grupuj(n, lang);
  const zysk = isEn
    ? `PLN ${kwota(straty.rocznieMin)}-${kwota(straty.rocznieMax)} / yr`
    : `${kwota(straty.rocznieMin)}-${kwota(straty.rocznieMax)}${NBSP}zł / rok`;
  const hrefHub = adres('/narzedzia', lang) || '/narzedzia';
  const hrefSzablony = `${hrefHub}#szablony`;
  const hrefPrzykladEn = hrefJesliOpublikowana('/narzedzia/audyt-seo') ? '/en/tools/seo-audit-example' : hrefHub;

  const lista = isEn
    ? [
        {
          id: 'audyt-seo',
          klucz: '/narzedzia/audyt-seo',
          tlo: 'koral',
          nazwa: 'Free SEO Audit',
          kategoria: `${AUDYT.regul}-RULE TECHNICAL ANALYSIS`,
          naglowek: `Check up to ${AUDYT.stron} pages against ${AUDYT.regul} technical, content and AI rules.`,
          opis: `Our crawler inspects response codes, redirects, headings, canonicals, mobile PageSpeed Insights (median of ${AUDYT.przebiegiPsi} runs) and AI readiness in 20-90 seconds.`,
          ctaGlowne: 'Check your website',
          ctaDrugie: 'See sample 95/100 audit',
          hrefDrugie: hrefPrzykladEn,
          wejscie: 'https://your-company.com',
          statusWejscia: `${AUDYT.stron} pages · ${AUDYT.kategorii} weighted areas`,
          cechy: [
            `1-100 overall score weighted ${AUDYT.wagi.techniczne}/${AUDYT.wagi.tresc}/${AUDYT.wagi.wydajnosc}/${AUDYT.wagi.ai}%`,
            'Mobile Core Web Vitals & Lighthouse median',
            'Prioritised error list ready for a developer',
          ],
        },
        {
          id: 'sprawdzarka-ai',
          klucz: '/sprawdz-widocznosc-w-ai',
          tlo: 'lawenda',
          nazwa: 'AI Visibility Check',
          kategoria: 'GENERATIVE ENGINE OPTIMIZATION',
          naglowek: `See whether ChatGPT, Gemini, Perplexity and Claude recommend your business.`,
          opis: `We ask ${WIDOCZNOSC.silnikow} AI answer engines ${WIDOCZNOSC.pytan} real buyer questions live with web search enabled, and show which competitors and sources the models cite.`,
          ctaGlowne: 'Check AI visibility',
          ctaDrugie: 'How GEO works',
          hrefDrugie: adres('/pozycjonowanie-w-ai', 'en') || hrefHub,
          wejscie: 'Industry + city + your domain',
          statusWejscia: `${WIDOCZNOSC.silnikow} engines · ${WIDOCZNOSC.pytan} live buyer prompts`,
          cechy: [
            'Named / not named matrix across all engines',
            `Top ${WIDOCZNOSC.przedBramka.firm} cited competitors & ${WIDOCZNOSC.przedBramka.domen} source domains right away`,
            'Live answers with Google Search & web citations',
          ],
        },
        {
          id: 'autorytet-domeny',
          klucz: '/narzedzia/autorytet-domeny',
          tlo: 'blekit',
          nazwa: 'Domain Authority',
          kategoria: 'LINK GRAPH BENCHMARK',
          naglowek: `Compare your 0-100 link graph score against ${AUTORYTET.konkurentow} competitors at once.`,
          opis: `Calculated from the public Common Crawl web graph (${grupuj(AUTORYTET.domenWGrafie, 'en')} domains, ${AUTORYTET.krawedzi.en} edges) using harmonic centrality and PageRank, no account required.`,
          ctaGlowne: 'Check authority',
          ctaDrugie: 'Link building service',
          hrefDrugie: adres('/link-building', 'en') || hrefHub,
          wejscie: 'your-domain.com vs 3 competitors',
          statusWejscia: `${grupuj(AUTORYTET.domenWGrafie, 'en')} domains in graph`,
          cechy: [
            '0-100 authority score & global graph rank',
            `Side-by-side bar chart with up to ${AUTORYTET.konkurentow} competitors`,
            `Up to ${AUTORYTET.limitIp} checked domains per day without sign-up`,
          ],
        },
        {
          id: 'kalkulator-strat-seo',
          klucz: '/narzedzia/kalkulator-strat-seo',
          tlo: 'piasek',
          nazwa: 'SEO Loss Calculator',
          kategoria: 'REVENUE & PAYBACK MODEL',
          naglowek: 'Estimate how much profit goes to competitors without Google TOP 3 and AI citations.',
          opis: 'Runs directly in your browser using your traffic, conversion rate and margin alongside published Google CTR and AI click-through studies, showing the full result without an email.',
          ctaGlowne: 'Calculate losses',
          ctaDrugie: 'See SEO pricing',
          hrefDrugie: adres('/cennik-pozycjonowania', 'en') || hrefHub,
          wejscie: '2,400 visits · 2.5% conv.',
          statusWejscia: 'Instant calculation in browser · 0 emails required',
          cechy: [
            'Separate breakdown for Google Search & AI answers',
            'Estimated lost customers per month & annual range',
            'Payback month against our net package prices',
          ],
        },
        {
          id: 'generator-llms-txt',
          klucz: '/narzedzia/generator-llms-txt',
          tlo: 'szalwia',
          nazwa: 'llms.txt Generator',
          kategoria: 'AI CRAWLER ACCESS & SITEMAP',
          naglowek: `Generate a clean llms.txt file and test access for ${GENERATOR.botowAi} AI bots and Bingbot.`,
          opis: `Reads up to ${GENERATOR.mapPodrzednych} child sitemaps, groups up to ${GENERATOR.adresow} key URLs into Markdown sections, and verifies robots.txt + HTTP status codes for GPTBot, ClaudeBot and PerplexityBot.`,
          ctaGlowne: 'Generate llms.txt',
          ctaDrugie: 'Download 16 templates',
          hrefDrugie: hrefSzablony,
          wejscie: 'https://your-company.com/sitemap.xml',
          statusWejscia: `${GENERATOR.botowAi} AI crawlers + Bingbot verified`,
          cechy: [
            'Ready-to-upload /llms.txt file without email gate',
            'Live robots.txt & HTTP response check per bot',
            'Audit of your existing /llms.txt formatting',
          ],
        },
        {
          id: 'makieta-redesignu',
          klucz: '/narzedzia/makieta-redesignu',
          tlo: 'roza',
          nazwa: 'AI Redesign Mockup',
          kategoria: 'HOMEPAGE WIREFRAME & UX',
          naglowek: `Preview a new desktop and mobile homepage built from your own copy in ${MAKIETA.minut.replace('-', '-')} minutes.`,
          opis: 'Builds a modern homepage layout strictly from your existing content, without inventing fake reviews, numbers or awards, juxtaposed with a screenshot of your current site.',
          ctaGlowne: 'Create free mockup',
          ctaDrugie: 'Web design offer',
          hrefDrugie: adres('/projektowanie-stron-internetowych', 'en') || hrefHub,
          wejscie: 'https://your-company.com',
          statusWejscia: `Ready in ${MAKIETA.minut.replace('-', '-')} min · real site copy`,
          cechy: [
            'Before / after comparison with your live homepage',
            'Desktop & mobile layouts from real brand content',
            'Shareable preview link valid for 60 days',
          ],
        },
        {
          id: 'tester-robotow-ai-robots-txt',
          klucz: '/narzedzia/tester-robotow-ai-robots-txt',
          tlo: 'lawenda',
          nazwa: 'AI Crawler & robots.txt',
          kategoria: `${ROBOTY_AI.botow} AI BOTS · WAF & SSR PARITY`,
          naglowek: `Detect silent 403 firewall blocks across ${ROBOTY_AI.botow} AI bots and check SSR HTML parity.`,
          opis: 'Compares your robots.txt rules against real HTTP server responses for OAI-SearchBot, PerplexityBot, ClaudeBot and GPTBot, and generates a clean 3-policy robots.txt.',
          ctaGlowne: 'Test AI crawlers',
          ctaDrugie: 'AI search optimization',
          hrefDrugie: adres('/pozycjonowanie-w-ai', 'en') || hrefHub,
          wejscie: 'https://your-company.com',
          statusWejscia: `${ROBOTY_AI.botow} AI bots · 0-100% SSR parity · 0 emails`,
          podglad: {
            naglowek: 'SSR HTML parity · 98%',
            odznaka: '11 / 12 ALLOWED',
            wiersze: [
              { etykieta: 'OAI-SearchBot', wartosc: '200 OK · Allowed', stan: 'ok' },
              { etykieta: 'PerplexityBot', wartosc: '200 OK · Allowed', stan: 'ok' },
              { etykieta: 'ClaudeBot', wartosc: '403 WAF · Blocked', stan: 'warn' },
              { etykieta: 'Google-Extended', wartosc: '200 OK · Allowed', stan: 'ok' },
            ],
          },
          cechy: [
            `HTTP vs robots.txt matrix for ${ROBOTY_AI.botow} AI crawlers`,
            '0-100% server-rendered HTML parity score without JS',
            '3-policy robots.txt builder & embeddable SVG badge',
          ],
        },
        {
          id: 'test-core-web-vitals-porownanie',
          klucz: '/narzedzia/test-core-web-vitals-porownanie',
          tlo: 'koral',
          nazwa: 'Core Web Vitals VS',
          kategoria: `${POROWNYWARKA_CWV.dniCrux}-DAY CRUX FIELD DATA`,
          naglowek: 'Compare real-user LCP, INP and CLS against a competitor and Next.js.',
          opis: `Pulls official ${POROWNYWARKA_CWV.dniCrux}-day Chrome UX Report (CrUX) field metrics, X-rays CMS plugin bloat and estimates 24-month TCO and mobile conversion losses.`,
          ctaGlowne: 'Compare Core Web Vitals',
          ctaDrugie: 'Next.js vs WordPress',
          hrefDrugie: adres('/porownania/nextjs-vs-wordpress-seo', 'en') || hrefHub,
          wejscie: 'your-site.com vs competitor.com',
          statusWejscia: `${POROWNYWARKA_CWV.dniCrux}-day CrUX · CMS X-ray · 0 emails`,
          podglad: {
            naglowek: 'CrUX 28d (75th pct · mobile)',
            odznaka: 'LIVE FIELD DATA',
            wiersze: [
              { etykieta: 'LCP (Largest Paint)', wartosc: '3.4 s vs 1.1 s', stan: 'warn' },
              { etykieta: 'INP (Responsiveness)', wartosc: '260 ms vs 48 ms', stan: 'warn' },
              { etykieta: 'CLS (Layout Shift)', wartosc: '0.09 vs 0.01', stan: 'ok' },
              { etykieta: 'CMS X-ray', wartosc: '9 render-blocking scripts', stan: 'ok' },
            ],
          },
          cechy: [
            '3-column CrUX showdown: your site, competitor & Next.js',
            'CMS & render-blocking script X-ray from live HTML',
            '24-month TCO & mobile conversion leak calculator',
          ],
        },
        {
          id: 'sprawdz-cytowalnosc-strony-ai',
          klucz: '/narzedzia/sprawdz-cytowalnosc-strony-ai',
          tlo: 'szalwia',
          nazwa: 'GEO Citability',
          kategoria: '6-FACTOR RAG CHUNK AUDITOR',
          naglowek: 'Score every H2/H3 block for AI Overviews & ChatGPT citability.',
          opis: 'Splits your page into RAG chunks and evaluates Answer-First placement, word length, fact density, lists/tables and author schema against a rival.',
          ctaGlowne: 'Check citability',
          ctaDrugie: 'AI search pricing',
          hrefDrugie: adres('/pozycjonowanie-w-ai/cennik', 'en') || hrefHub,
          wejscie: 'https://your-site.com/service',
          statusWejscia: '6 RAG factors · AI snippet preview · 0 emails',
          podglad: {
            naglowek: 'GEO Citability Score · 91/100',
            odznaka: 'RAG READY',
            wiersze: [
              { etykieta: 'Answer-First lead', wartosc: '54 words · Optimal', stan: 'ok' },
              { etykieta: 'Fact & number density', wartosc: '8 data points / 200w', stan: 'ok' },
              { etykieta: 'Tables & structured lists', wartosc: '2 HTML tables', stan: 'ok' },
              { etykieta: 'Author & FAQ schema', wartosc: 'Verified JSON-LD', stan: 'ok' },
            ],
          },
          cechy: [
            '6 deterministic RAG criteria per H2/H3 section',
            'Simulated AI Overview & ChatGPT cited snippet',
            '1-on-1 comparison with a competitor page',
          ],
        },
        {
          id: 'sprawdz-przekierowania-hreflang',
          klucz: '/narzedzia/sprawdz-przekierowania-hreflang',
          tlo: 'blekit',
          nazwa: 'Redirects & hreflang',
          kategoria: '301 CHAINS & RECIPROCITY MATRIX',
          naglowek: 'Trace all 4 HTTP/www variants, canonicals and reciprocal hreflang tags.',
          opis: 'Inspects redirect chains across http, https and www, verifies canonical alignment and A-B hreflang return links, and generates server rules.',
          ctaGlowne: 'Check redirects',
          ctaDrugie: 'Migration checklist',
          hrefDrugie: adres('/narzedzia/checklista-migracji-strony', 'en') || hrefHub,
          wejscie: 'https://your-site.com',
          statusWejscia: '4 host variants · server rules · 0 emails',
          podglad: {
            naglowek: 'Canonical & hreflang Matrix',
            odznaka: '0 CHAINS',
            wiersze: [
              { etykieta: 'http:// + non-www', wartosc: '1 hop 308 -> https://www', stan: 'ok' },
              { etykieta: 'rel="canonical"', wartosc: 'Matches target 200 OK', stan: 'ok' },
              { etykieta: 'hreflang pl <-> en <-> de', wartosc: 'Reciprocal + x-default', stan: 'ok' },
              { etykieta: 'Fix rules', wartosc: 'Next.js · Nginx · Apache', stan: 'ok' },
            ],
          },
          cechy: [
            'Hop-by-hop trace of 4 http/https/www host variants',
            'Reciprocal A <-> B hreflang & x-default verification',
            'Copy-paste rules for Next.js, Nginx, Apache & Cloudflare',
          ],
        },
        {
          id: 'generator-indexnow-test-bing-chatgpt',
          klucz: '/narzedzia/generator-indexnow-test-bing-chatgpt',
          tlo: 'piasek',
          nazwa: 'IndexNow & Bing',
          kategoria: 'INSTANT INDEXING & LASTMOD AUDIT',
          naglowek: 'Generate an IndexNow key, test Bingbot + OAI-SearchBot and audit lastmod.',
          opis: 'Verifies live access for Bingbot and ChatGPT Search, spots fake identical sitemap timestamps and outputs a ready IndexNow key + GitHub Action.',
          ctaGlowne: 'Generate IndexNow',
          ctaDrugie: 'llms.txt vs sitemap.xml',
          hrefDrugie: adres('/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml', 'en') || hrefHub,
          wejscie: 'https://your-site.com',
          statusWejscia: 'Key .txt + GitHub Action · 0 emails',
          podglad: {
            naglowek: 'Bing + ChatGPT Search Readiness',
            odznaka: 'INDEXNOW',
            wiersze: [
              { etykieta: 'Bingbot & OAI-SearchBot', wartosc: '200 OK · Allowed', stan: 'ok' },
              { etykieta: 'Sitemap lastmod entropy', wartosc: 'Genuine per-page dates', stan: 'ok' },
              { etykieta: 'IndexNow key (.txt)', wartosc: '32-hex key ready', stan: 'ok' },
              { etykieta: 'CI/CD automation', wartosc: 'indexnow.yml workflow', stan: 'ok' },
            ],
          },
          cechy: [
            'Live Bingbot & OAI-SearchBot HTTP + WAF verification',
            'Sitemap <lastmod> entropy & fake-timestamp detector',
            'Downloadable IndexNow .txt key, curl & GitHub Action',
          ],
        },
        {
          id: 'walidator-grafu-encji-json-ld',
          klucz: '/narzedzia/walidator-grafu-encji-json-ld',
          tlo: 'lawenda',
          nazwa: 'Entity Graph JSON-LD',
          kategoria: 'KNOWLEDGE GRAPH & @GRAPH BUILDER',
          naglowek: 'Visualize your Organization, Person and Service @graph in SVG.',
          opis: 'Scans your homepage and About/Contact pages, checks @id anchors, VAT/Tax IDs and sameAs authority links, and generates connected JSON-LD.',
          ctaGlowne: 'Validate @graph',
          ctaDrugie: '7 JSON-LD templates',
          hrefDrugie: adres('/narzedzia/dane-strukturalne-json-ld', 'en') || hrefHub,
          wejscie: 'https://your-site.com',
          statusWejscia: 'SVG entity map · @graph code · 0 emails',
          podglad: {
            naglowek: 'Connected JSON-LD @graph',
            odznaka: 'ENTITY SEO',
            wiersze: [
              { etykieta: '#organization <-> #website', wartosc: 'Linked via @id', stan: 'ok' },
              { etykieta: 'Tax / VAT / Registry IDs', wartosc: 'Verified in schema', stan: 'ok' },
              { etykieta: 'sameAs profiles', wartosc: 'Maps · Clutch · GitHub', stan: 'ok' },
              { etykieta: 'Unified @graph output', wartosc: '1-click copy JSON-LD', stan: 'ok' },
            ],
          },
          cechy: [
            'Interactive SVG node-and-edge entity graph diagram',
            'Audit of @id cross-links, Tax/VAT IDs & sameAs URLs',
            'Ready-to-paste unified schema.org @graph generator',
          ],
        },
        {
          id: 'audyt-lokalnego-seo-wizytowki',
          klucz: '/narzedzia/audyt-lokalnego-seo-wizytowki',
          tlo: 'roza',
          nazwa: 'Local NAP & Review QR',
          kategoria: 'GOOGLE MAPS NAP & VECTOR QR',
          naglowek: 'Audit HTML vs JSON-LD NAP consistency and generate a Google review QR.',
          opis: 'Compares visible Name, Address and Phone against LocalBusiness schema, calculates 5-star reviews needed to beat Maps rivals, and exports SVG/PNG QR.',
          ctaGlowne: 'Check NAP & QR',
          ctaDrugie: 'Google Profile SEO',
          hrefDrugie: adres('/pozycjonowanie-wizytowki-google', 'en') || hrefHub,
          wejscie: 'https://your-site.com',
          statusWejscia: 'NAP table · 5★ calculator · SVG QR',
          podglad: {
            naglowek: 'LocalBusiness NAP & Review Gap',
            odznaka: 'MAPS + QR',
            wiersze: [
              { etykieta: 'Phone & Address parity', wartosc: 'HTML == JSON-LD', stan: 'ok' },
              { etykieta: 'Geo & OpeningHours', wartosc: 'Present in schema', stan: 'ok' },
              { etykieta: '5★ Review calculator', wartosc: '+14 reviews to 4.9★', stan: 'ok' },
              { etykieta: 'Google Review QR', wartosc: 'Permanent SVG & PNG', stan: 'ok' },
            ],
          },
          cechy: [
            'Character-level HTML vs LocalBusiness JSON-LD check',
            '5-star review gap calculator against Maps competitors',
            'Non-expiring print-ready SVG & 1024px PNG QR code',
          ],
        },
      ]
    : [
        {
          id: 'audyt-seo',
          klucz: '/narzedzia/audyt-seo',
          tlo: 'koral',
          nazwa: 'Darmowy audyt SEO',
          kategoria: `ANALIZA TECHNICZNA · ${AUDYT.regul} REGUŁ`,
          naglowek: `Sprawdź do ${AUDYT.stron} podstron w ${AUDYT.regul} regułach techniki, treści, szybkości i AI.`,
          opis: `Nasz crawler bada kody odpowiedzi, przekierowania, nagłówki, tagi kanoniczne, mobilne PageSpeed Insights (mediana ${AUDYT.przebiegiPsi} pomiarów) i gotowość pod modele AI w 20-90 sekund.`,
          ctaGlowne: 'Sprawdź swoją stronę',
          ctaDrugie: 'Pełny audyt SEO',
          hrefDrugie: adres('/audyt-seo', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: `do ${AUDYT.stron} podstron · ${AUDYT.kategorii} ważone obszary`,
          cechy: [
            `Ocena 1-100 z wagami ${AUDYT.wagi.techniczne}/${AUDYT.wagi.tresc}/${AUDYT.wagi.wydajnosc}/${AUDYT.wagi.ai}%`,
            'Mobilne Core Web Vitals i mediana Lighthouse',
            'Lista błędów z instrukcją naprawy dla dewelopera',
          ],
        },
        {
          id: 'sprawdzarka-ai',
          klucz: '/sprawdz-widocznosc-w-ai',
          tlo: 'lawenda',
          nazwa: 'Widoczność w AI',
          kategoria: 'POZYCJONOWANIE W AI (GEO)',
          naglowek: 'Zobacz, czy ChatGPT, Gemini, Perplexity i Claude polecają Twoją firmę.',
          opis: `Zadajemy na żywo ${WIDOCZNOSC.pytan} pytania zakupowe w ${WIDOCZNOSC.silnikow} silnikach z włączonym wyszukiwaniem w sieci i pokazujemy, kogo wymieniają modele oraz jakim źródłom ufają.`,
          ctaGlowne: 'Sprawdź widoczność w AI',
          ctaDrugie: 'Jak działa GEO',
          hrefDrugie: adres('/pozycjonowanie-w-ai', 'pl') || hrefHub,
          wejscie: 'Branża + miasto + Twoja domena',
          statusWejscia: `${WIDOCZNOSC.silnikow} silników · ${WIDOCZNOSC.pytan} pytania klientów na żywo`,
          cechy: [
            'Siatka „wymienia / pomija” dla każdego silnika i pytania',
            `Od razu ${WIDOCZNOSC.przedBramka.firm} polecanych firm i ${WIDOCZNOSC.przedBramka.domen} cytowanych domen`,
            'Odpowiedzi na żywo z wyszukiwaniem Google i Bing',
          ],
        },
        {
          id: 'autorytet-domeny',
          klucz: '/narzedzia/autorytet-domeny',
          tlo: 'blekit',
          nazwa: 'Autorytet domeny',
          kategoria: 'GRAF LINKÓW I KONKURENCJA',
          naglowek: `Porównaj swój wynik 0-100 z grafu linków z ${AUTORYTET.konkurentow} konkurentami naraz.`,
          opis: `Wyliczamy autorytet z publicznego grafu Common Crawl (${grupuj(AUTORYTET.domenWGrafie, 'pl')} domen, ${AUTORYTET.krawedzi.pl} krawędzi) na bazie harmonic centrality i PageRank, bez zakładania konta.`,
          ctaGlowne: 'Sprawdź autorytet',
          ctaDrugie: 'Link building w pakiecie',
          hrefDrugie: adres('/link-building', 'pl') || hrefHub,
          wejscie: 'twoja-domena.pl vs 3 konkurentów',
          statusWejscia: `${grupuj(AUTORYTET.domenWGrafie, 'pl')} domen w grafie`,
          cechy: [
            'Wynik 0-100 oraz pozycja wśród domen .pl i na świecie',
            `Wykres porównawczy z maks. ${AUTORYTET.konkurentow} konkurentami od ręki`,
            `Do ${AUTORYTET.limitIp} sprawdzanych domen dziennie bez rejestracji`,
          ],
        },
        {
          id: 'kalkulator-strat-seo',
          klucz: '/narzedzia/kalkulator-strat-seo',
          tlo: 'piasek',
          nazwa: 'Kalkulator strat SEO',
          kategoria: 'MODEL UTRACONEGO ZYSKU I ZWROTU',
          naglowek: 'Policz, ile miesięcznego zysku oddajesz konkurencji bez TOP 3 i odpowiedzi AI.',
          opis: 'Działa od razu w przeglądarce na Twoich danych (ruch, konwersja, marża) oraz badaniach CTR w Google i kliknięć z odpowiedzi AI. Cały wynik widzisz bez podawania e-maila.',
          ctaGlowne: 'Policz straty bez SEO',
          ctaDrugie: 'Zobacz cennik pakietów',
          hrefDrugie: adres('/cennik-pozycjonowania', 'pl') || hrefHub,
          wejscie: '2 400 wizyt · 2,5% konwersji',
          statusWejscia: 'Cały wynik na żywo · bez bramki e-mail',
          cechy: [
            'Osobne wyliczenie luki w Google i w odpowiedziach AI',
            'Liczba utraconych klientów miesięcznie i widełki roczne',
            'Miesiąc zwrotu inwestycji względem naszego cennika',
          ],
        },
        {
          id: 'generator-llms-txt',
          klucz: '/narzedzia/generator-llms-txt',
          tlo: 'szalwia',
          nazwa: 'Generator llms.txt',
          kategoria: 'DOSTĘP BOTÓW AI I MAPA STRONY',
          naglowek: `Wygeneruj gotowy plik llms.txt i przetestuj dostęp ${GENERATOR.botowAi} botów AI i Bingbota.`,
          opis: `Pobiera do ${GENERATOR.mapPodrzednych} map podrzędnych, porządkuje do ${GENERATOR.adresow} kluczowych adresów w sekcjach Markdown i sprawdza robots.txt oraz kod HTTP dla GPTBota, ClaudeBota i PerplexityBota.`,
          ctaGlowne: 'Wygeneruj plik llms.txt',
          ctaDrugie: 'Pobierz 16 szablonów SEO',
          hrefDrugie: hrefSzablony,
          wejscie: 'https://twoja-firma.pl/sitemap.xml',
          statusWejscia: `Test ${GENERATOR.botowAi} botów AI + Bingbot bez e-maila`,
          cechy: [
            'Gotowy plik /llms.txt do pobrania od razu bez e-maila',
            'Test blokad w robots.txt i nagłówków serwera dla każdego bota',
            'Walidacja istniejącego pliku /llms.txt na Twojej domenie',
          ],
        },
        {
          id: 'makieta-redesignu',
          klucz: '/narzedzia/makieta-redesignu',
          tlo: 'roza',
          nazwa: 'Makieta nowej strony',
          kategoria: 'REDESIGN Z AI · DESKTOP I TELEFON',
          naglowek: `Zobacz nowy projekt strony głównej zbudowany z Twoich treści w ${MAKIETA.minut.replace('-', '-')} minuty.`,
          opis: 'Projektuje nową stronę główną na komputer i telefon wyłącznie z prawdziwych informacji z Twojej obecnej witryny (bez zmyślonych opinii, nagród ani liczb) obok zrzutu stanu obecnego.',
          ctaGlowne: 'Zrób darmową makietę',
          ctaDrugie: 'Oferta tworzenia stron',
          hrefDrugie: adres('/projektowanie-stron-internetowych', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: `Gotowa w ${MAKIETA.minut.replace('-', '-')} min · z Twoich treści`,
          cechy: [
            'Porównanie obecnej strony z nową makietą obok siebie',
            'Widok desktop i mobile oparty na realnej ofercie firmy',
            'Link do pełnej makiety (4-6 sekcji) ważny przez 60 dni',
          ],
        },
        {
          id: 'tester-robotow-ai-robots-txt',
          klucz: '/narzedzia/tester-robotow-ai-robots-txt',
          tlo: 'lawenda',
          nazwa: 'Tester robotów AI',
          kategoria: `${ROBOTY_AI.botow} BOTÓW AI · WAF I PARZYSTOŚĆ SSR`,
          naglowek: `Wykryj ciche blokady 403 zapory WAF dla ${ROBOTY_AI.botow} botów AI i sprawdź parzystość HTML.`,
          opis: 'Porównuje reguły w robots.txt z prawdziwymi kodami HTTP serwera dla OAI-SearchBota, PerplexityBota, ClaudeBota i GPTBota oraz generuje gotowy plik robots.txt.',
          ctaGlowne: 'Sprawdź boty AI',
          ctaDrugie: 'Pozycjonowanie w AI',
          hrefDrugie: adres('/pozycjonowanie-w-ai', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: `${ROBOTY_AI.botow} botów AI · parzystość SSR 0-100% · bez e-maila`,
          podglad: {
            naglowek: 'Parzystość HTML SSR · 98%',
            odznaka: '11 / 12 DOZWOLONE',
            wiersze: [
              { etykieta: 'OAI-SearchBot', wartosc: '200 OK · Dozwolony', stan: 'ok' },
              { etykieta: 'PerplexityBot', wartosc: '200 OK · Dozwolony', stan: 'ok' },
              { etykieta: 'ClaudeBot', wartosc: '403 WAF · Blokada', stan: 'warn' },
              { etykieta: 'Google-Extended', wartosc: '200 OK · Dozwolony', stan: 'ok' },
            ],
          },
          cechy: [
            `Macierz HTTP vs robots.txt dla ${ROBOTY_AI.botow} botów AI`,
            'Wynik parzystości treści HTML 0-100% bez JavaScriptu',
            'Kreator 3 polityk robots.txt i odznaka SVG na stronę',
          ],
        },
        {
          id: 'test-core-web-vitals-porownanie',
          klucz: '/narzedzia/test-core-web-vitals-porownanie',
          tlo: 'koral',
          nazwa: 'Porównywarka CWV',
          kategoria: `DANE POLOWE CRUX (${POROWNYWARKA_CWV.dniCrux} DNI)`,
          naglowek: 'Porównaj prawdziwe LCP, INP i CLS swojej strony z konkurentem i Next.js.',
          opis: `Pobiera oficjalne ${POROWNYWARKA_CWV.dniCrux}-dniowe dane polowe Chrome UX Report (CrUX), rozpoznaje narzut wtyczek CMS i liczy 24-miesięczny koszt utrzymania oraz utracone zapytania.`,
          ctaGlowne: 'Porównaj szybkość',
          ctaDrugie: 'Next.js vs WordPress',
          hrefDrugie: adres('/porownania/nextjs-vs-wordpress-seo', 'pl') || hrefHub,
          wejscie: 'twoja-strona.pl vs konkurent.pl',
          statusWejscia: `CrUX ${POROWNYWARKA_CWV.dniCrux} dni · rentgen CMS · bez e-maila`,
          podglad: {
            naglowek: 'CrUX 28 dni (75. percentyl · telefon)',
            odznaka: 'DANE POLOWE',
            wiersze: [
              { etykieta: 'LCP (główny element)', wartosc: '3,4 s vs 1,1 s', stan: 'warn' },
              { etykieta: 'INP (reakcja na dotyk)', wartosc: '260 ms vs 48 ms', stan: 'warn' },
              { etykieta: 'CLS (stabilność układu)', wartosc: '0,09 vs 0,01', stan: 'ok' },
              { etykieta: 'Rentgen CMS', wartosc: '9 skryptów blokujących', stan: 'ok' },
            ],
          },
          cechy: [
            'Pojedynek CrUX: Twoja strona, konkurent i Next.js',
            'Rentgen wtyczek CMS i skryptów blokujących z kodu HTML',
            'Kalkulator 24-mies. TCO i utraconej konwersji mobilnej',
          ],
        },
        {
          id: 'sprawdz-cytowalnosc-strony-ai',
          klucz: '/narzedzia/sprawdz-cytowalnosc-strony-ai',
          tlo: 'szalwia',
          nazwa: 'Cytowalność GEO',
          kategoria: 'AUDYTOR BLOKÓW ODPOWIEDZI RAG',
          naglowek: 'Sprawdź, które sekcje H2/H3 Twojej strony nadają się do zacytowania przez AI.',
          opis: 'Dzieli podstronę na bloki RAG i ocenia odpowiedź w pierwszym zdaniu, długość akapitów, gęstość liczb, tabele oraz dane autora na tle konkurenta.',
          ctaGlowne: 'Sprawdź cytowalność',
          ctaDrugie: 'Cennik GEO',
          hrefDrugie: adres('/pozycjonowanie-w-ai/cennik', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl/usluga',
          statusWejscia: '6 kryteriów RAG · symulacja AI · bez e-maila',
          podglad: {
            naglowek: 'Wynik cytowalności GEO · 91/100',
            odznaka: 'GOTOWE POD RAG',
            wiersze: [
              { etykieta: 'Blok Answer-First', wartosc: '54 słowa · Optymalny', stan: 'ok' },
              { etykieta: 'Gęstość liczb i faktów', wartosc: '8 konkretów / 200 słów', stan: 'ok' },
              { etykieta: 'Tabele i listy HTML', wartosc: '2 tabele porównawcze', stan: 'ok' },
              { etykieta: 'Autor i schema FAQ', wartosc: 'Zweryfikowane JSON-LD', stan: 'ok' },
            ],
          },
          cechy: [
            'Ocena 6 deterministycznych kryteriów RAG dla każdego H2/H3',
            'Symulacja wycinka cytowanego w AI Overview i ChatGPT',
            'Porównanie cytowalności 1:1 z wybranym konkurentem',
          ],
        },
        {
          id: 'sprawdz-przekierowania-hreflang',
          klucz: '/narzedzia/sprawdz-przekierowania-hreflang',
          tlo: 'blekit',
          nazwa: 'Przekierowania i hreflang',
          kategoria: 'ŁAŃCUCHY 301 I ZWROTNOŚĆ JĘZYKÓW',
          naglowek: 'Przetestuj 4 warianty http/www, canonical i zwrotność tagów hreflang.',
          opis: 'Śledzi każdy skok 301/308 między wariantami domeny, weryfikuje zgodność canonical i par A-B hreflang oraz generuje reguły serwera.',
          ctaGlowne: 'Sprawdź przekierowania',
          ctaDrugie: 'Checklista migracji',
          hrefDrugie: adres('/narzedzia/checklista-migracji-strony', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: '4 warianty domeny · reguły serwera · bez e-maila',
          podglad: {
            naglowek: 'Macierz canonical i hreflang',
            odznaka: '0 ŁAŃCUCHÓW',
            wiersze: [
              { etykieta: 'http:// oraz bez www', wartosc: '1 skok 308 -> https://www', stan: 'ok' },
              { etykieta: 'rel="canonical"', wartosc: 'Zgodny z celem 200 OK', stan: 'ok' },
              { etykieta: 'hreflang pl <-> en <-> de', wartosc: 'Zwrotny + x-default', stan: 'ok' },
              { etykieta: 'Gotowe reguły', wartosc: 'Next.js · Nginx · Apache', stan: 'ok' },
            ],
          },
          cechy: [
            'Śledzenie skoków wszystkich 4 wariantów http/https/www',
            'Weryfikacja zwrotności linków hreflang i x-default',
            'Gotowy kod przekierowań dla Next.js, Nginx, Apache i Cloudflare',
          ],
        },
        {
          id: 'generator-indexnow-test-bing-chatgpt',
          klucz: '/narzedzia/generator-indexnow-test-bing-chatgpt',
          tlo: 'piasek',
          nazwa: 'IndexNow i Bing',
          kategoria: 'SZYBKA INDEKSACJA I AUDYT LASTMOD',
          naglowek: 'Wygeneruj klucz IndexNow, sprawdź Bingbot + OAI-SearchBot i daty lastmod.',
          opis: 'Testuje dostęp crawlerów zasilających Bing i ChatGPT Search, wykrywa sztuczne identyczne daty w sitemap.xml i tworzy gotowy klucz z akcją GitHub.',
          ctaGlowne: 'Wygeneruj IndexNow',
          ctaDrugie: 'Poradnik Bing i IndexNow',
          hrefDrugie: '/blog/bing-webmaster-tools-indexnow-chatgpt',
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: 'Klucz .txt + GitHub Actions · bez e-maila',
          podglad: {
            naglowek: 'Gotowość pod Bing i ChatGPT Search',
            odznaka: 'INDEXNOW',
            wiersze: [
              { etykieta: 'Bingbot i OAI-SearchBot', wartosc: '200 OK · Dozwolone', stan: 'ok' },
              { etykieta: 'Entropia dat lastmod', wartosc: 'Prawdziwe daty zmian', stan: 'ok' },
              { etykieta: 'Klucz IndexNow (.txt)', wartosc: '32 znaki hex gotowe', stan: 'ok' },
              { etykieta: 'Automatyzacja CI/CD', wartosc: 'Plik indexnow.yml', stan: 'ok' },
            ],
          },
          cechy: [
            'Żywy test dostępu Bingbot i OAI-SearchBot przez zaporę WAF',
            'Wykrywanie fałszywych identycznych dat <lastmod> w sitemapie',
            'Plik klucza .txt do pobrania, komenda curl i GitHub Actions',
          ],
        },
        {
          id: 'walidator-grafu-encji-json-ld',
          klucz: '/narzedzia/walidator-grafu-encji-json-ld',
          tlo: 'lawenda',
          nazwa: 'Graf encji JSON-LD',
          kategoria: 'KNOWLEDGE GRAPH I KREATOR @GRAPH',
          naglowek: 'Zwizualizuj powiązania Organization, Person i Service na diagramie SVG.',
          opis: 'Skanuje stronę główną, O nas i Kontakt, sprawdza kotwice @id, numery NIP/KRS/VAT-UE oraz profile sameAs i generuje spójny kod @graph.',
          ctaGlowne: 'Sprawdź graf encji',
          ctaDrugie: '7 wzorów JSON-LD',
          hrefDrugie: adres('/narzedzia/dane-strukturalne-json-ld', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: 'Diagram SVG · szablon @graph · bez e-maila',
          podglad: {
            naglowek: 'Połączony graf JSON-LD @graph',
            odznaka: 'ENTITY SEO',
            wiersze: [
              { etykieta: '#organization <-> #website', wartosc: 'Połączone przez @id', stan: 'ok' },
              { etykieta: 'Identyfikatory NIP / KRS', wartosc: 'Obecne w schema', stan: 'ok' },
              { etykieta: 'Profile sameAs', wartosc: 'Mapy · Clutch · GitHub', stan: 'ok' },
              { etykieta: 'Kod naprawczy @graph', wartosc: 'Kopiowanie 1-klik', stan: 'ok' },
            ],
          },
          cechy: [
            'Interaktywny diagram SVG węzłów i relacji encji marki',
            'Kontrola kotwic @id, numerów NIP/KRS oraz linków sameAs',
            'Gotowy połączony szablon schema.org @graph do wklejenia',
          ],
        },
        {
          id: 'audyt-lokalnego-seo-wizytowki',
          klucz: '/narzedzia/audyt-lokalnego-seo-wizytowki',
          tlo: 'roza',
          nazwa: 'Skaner NAP i kod QR',
          kategoria: 'SPÓJNOŚĆ WIZYTÓWKI I GENERATOR QR',
          naglowek: 'Porównaj dane NAP między HTML a JSON-LD i pobierz kod QR opinii Google.',
          opis: 'Sprawdza zgodność nazwy, adresu, telefonu i NIP z LocalBusiness schema, liczy brakujące opinie 5★ do lidera w Mapach i generuje wektorowy kod QR.',
          ctaGlowne: 'Sprawdź NAP i kod QR',
          ctaDrugie: 'Pozycjonowanie wizytówki',
          hrefDrugie: adres('/pozycjonowanie-wizytowki-google', 'pl') || hrefHub,
          wejscie: 'https://twoja-firma.pl',
          statusWejscia: 'Tabela NAP · kalkulator 5★ · wektorowy QR',
          podglad: {
            naglowek: 'Spójność LocalBusiness NAP i opinie',
            odznaka: 'MAPY + QR',
            wiersze: [
              { etykieta: 'Telefon i adres firmy', wartosc: 'HTML == JSON-LD', stan: 'ok' },
              { etykieta: 'Geo i godziny otwarcia', wartosc: 'Zapisane w schema', stan: 'ok' },
              { etykieta: 'Kalkulator opinii 5★', wartosc: '+14 opinii do średniej 4,9★', stan: 'ok' },
              { etykieta: 'Kod QR do opinii Google', wartosc: 'Bezterminowy SVG i PNG', stan: 'ok' },
            ],
          },
          cechy: [
            'Porównanie znak po znaku danych w HTML i LocalBusiness JSON-LD',
            'Kalkulator brakujących opinii 5★ względem konkurenta w Mapach',
            'Bezterminowy kod QR do druku w wektorowym SVG i PNG 1024px',
          ],
        },
      ];

  const narzedzia = lista
    .map((n) => {
      const href = adres(n.klucz, lang);
      if (!href) return null;
      return { ...n, href, obraz: obrazKarty(n.id, lang) };
    })
    .filter(Boolean);

  return {
    id: isEn ? 'free-tools' : 'darmowe-narzedzia',
    tytul: isEn
      ? 'Free tools for the SEO & AI work your growth runs on'
      : 'Darmowe narzędzia do SEO i widoczności w AI',
    podtytul: isEn
      ? 'Audit technical errors, measure brand mentions in ChatGPT, test AI crawler access, compare Core Web Vitals or calculate lost revenue. All 13 online tools work without registration.'
      : 'Sprawdź błędy techniczne, obecność marki w ChatGPT, blokady botów AI, szybkość CrUX, autorytet linków albo koszt braków w Google. Wszystkie 13 narzędzi działa bez rejestracji.',
    mozliwosciEtykieta: isEn ? 'CAPABILITIES' : 'CO DOSTAJESZ',
    bezRejestracji: isEn ? 'No sign-up' : 'Bez rejestracji',
    wejscieEtykieta: isEn ? 'Input' : 'Wejście',
    hubTekst: isEn ? 'All 13 free tools & 18 PDF templates' : 'Wszystkie 13 narzędzi i 17 szablonów PDF',
    hubHref: hrefHub,
    narzedzia,
  };
}

// --- Zachowane eksporty pomocnicze (kompatybilność) -----------------------------------------------
export const UI = {
  pl: {
    etykieta: 'Nasze narzędzia', h2: 'Nasze narzędzia SEO i panel klienta',
    wstrzymaj: 'Wstrzymaj ruch', wznow: 'Wznów ruch', poprzedni: 'Poprzedni kafel', nastepny: 'Następny kafel',
    kolkoKafle: 'Kółko: kafle', kolkoStrona: 'Kółko: strona', z: 'z', pasekPomoc: 'Strzałki, przeciąganie i klawisze góra i dół przewijają kafle.',
  },
  en: {
    etykieta: 'Our tools', h2: 'Our SEO tools and client portal',
    wstrzymaj: 'Pause motion', wznow: 'Resume motion', poprzedni: 'Previous tile', nastepny: 'Next tile',
    kolkoKafle: 'Wheel: tiles', kolkoStrona: 'Wheel: page', z: 'of', pasekPomoc: 'Arrows, dragging and the up and down keys scroll the tiles.',
  },
  de: {
    etykieta: 'Unsere Tools', h2: 'Unsere kostenlosen SEO-Tools',
    wstrzymaj: 'Bewegung anhalten', wznow: 'Bewegung fortsetzen', poprzedni: 'Vorherige Kachel', nastepny: 'Nächste Kachel',
    kolkoKafle: 'Mausrad: Kacheln', kolkoStrona: 'Mausrad: Seite', z: 'von', pasekPomoc: 'Pfeile, Ziehen und die Tasten oben und unten blättern durch die Kacheln.',
  },
};
