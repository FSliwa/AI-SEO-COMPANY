// Dane hero strony głównej oraz sekcji darmowych narzędzi w stylu airSlate (19.11.2026).
// Jedno miejsce na teksty trzech wersji językowych, adresy narzędzi i liczby. Czysty ESM bez React.
//
// Skąd co:
//  - adresy: rejestr tras (hrefJesliOpublikowana, hrefWJezyku) i rejestr DE (hrefDe);
//  - liczby: lib/narzedziaLiczby.js (reguły, podstrony, silniki, pytania, boty, minuty, domeny w grafie);
//  - wynik 95 i data: przebieg audytu własnej domeny z lib/audytPrzyklad.js (18.11.2026);
//  - kalkulator: policzStraty(PRZYKLADY.usluga);
//  - podglądy wyników z Figmy (720/1080/1440 WebP): lib/narzedziaObrazy.js.

import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, WIDOCZNOSC } from './narzedziaLiczby';
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
// Eyebrow mówi o 6 darmowych narzędziach i panelu klienta (19.11.2026).
export function tekstyHero(locale) {
  if (locale === 'en') {
    return {
      eyebrow: '6 FREE SEO & AI TOOLS · 24/7 CLIENT PORTAL',
      display: 'SEO agency with the best technical solutions',
      sub: 'SEO that drives sales. SEO & Marketing Agency for Companies',
      lead: 'We do what search engine optimisation companies rarely do: give clients the best technical tools and report from their own Google accounts.',
      ctaPrimary: 'Get Proposal',
      ctaSecondary: 'View Portfolio',
      mikro: 'Free quote within 24 h · no sales rep',
    };
  }
  if (locale === 'de') {
    return {
      eyebrow: 'KOSTENLOSE SEO- & KI-TOOLS · KUNDENPORTAL 24/7',
      display: 'SEO Agentur mit den besten technischen Lösungen',
      sub: 'SEO und KI-Sichtbarkeit für Unternehmen im DACH-Raum',
      lead: 'Ihre Website und Ihr Projekt erhalten die besten technischen Lösungen: eigene Werkzeuge, Berichte mit Live-Daten aus Ihren Google-Konten und SEO, das Wachstum antreibt.',
      ctaPrimary: 'Angebot anfragen',
      ctaSecondary: 'Referenzen',
      mikro: 'Kostenloses Angebot in 24 Std. · ohne Vertriebler',
    };
  }
  return {
    eyebrow: '6 DARMOWYCH NARZĘDZI I PANEL KLIENTA 24/7',
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
  const hrefPanel = locale === 'de'
    ? (hrefAi || '#why-us')
    : (adres('/panel-klienta', locale) || '#panel-klienta');
  const hrefNarzedzia = locale === 'de'
    ? (hrefLlms || hrefAudyt)
    : (locale === 'en' ? '#free-tools' : '#darmowe-narzedzia');

  if (locale === 'en') {
    const narzedziaKafelki = [
      { id: 'audyt', nazwa: 'SEO Audit', href: hrefAudyt, ton: '1' },
      { id: 'ai', nazwa: 'AI Check', href: hrefAi || '#free-tools', ton: '2' },
      { id: 'autorytet', nazwa: 'Authority', href: hrefAutorytet || '#free-tools', ton: '3' },
      { id: 'kalk', nazwa: 'ROI Loss', href: hrefKalk || '#free-tools', ton: '4' },
      { id: 'llms', nazwa: 'llms.txt', href: hrefLlms || '#free-tools', ton: '5' },
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
        aria: 'See all 6 free SEO and AI tools',
        tytul: '6 free tools',
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
      { id: 'llms', nazwa: 'llms.txt', href: hrefLlms || hrefAudyt, ton: '5' },
      { id: 'makieta', nazwa: 'Vorlagen', href: adres('/narzedzia/checklista-seo', 'de') || hrefAudyt, ton: '6' },
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
        aria: 'llms.txt Generator und KI-Bot-Test öffnen',
        tytul: 'Kostenlose Tools',
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
    { id: 'autorytet', nazwa: 'Autorytet', href: hrefAutorytet || '#narz-autorytet-domeny', ton: '3' },
    { id: 'kalk', nazwa: 'Straty', href: hrefKalk || '#narz-kalkulator-strat-seo', ton: '4' },
    { id: 'llms', nazwa: 'llms.txt', href: hrefLlms || '#narz-generator-llms-txt', ton: '5' },
    { id: 'makieta', nazwa: 'Makieta', href: hrefMakieta || '#narz-makieta-redesignu', ton: '6' },
  ];

  return {
    regionLabel: 'Nasze darmowe narzędzia SEO i panel klienta',
    h2Sr: 'Przegląd 6 darmowych narzędzi SEO i panelu klienta 24/7',
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
      aria: 'Przejdź do sekcji wszystkich 6 darmowych narzędzi',
      tytul: '6 darmowych narzędzi',
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
      ? 'Six free tools for the SEO & AI work your growth runs on'
      : 'Sześć darmowych narzędzi do SEO i widoczności w AI',
    podtytul: isEn
      ? 'Audit technical errors, measure brand mentions in ChatGPT, check link authority or calculate lost revenue. Each tool works on its own, without registration.'
      : 'Sprawdź błędy techniczne, obecność marki w ChatGPT, autorytet linków albo koszt braków w Google. Każde narzędzie działa osobno i bez rejestracji.',
    mozliwosciEtykieta: isEn ? 'CAPABILITIES' : 'CO DOSTAJESZ',
    bezRejestracji: isEn ? 'No sign-up' : 'Bez rejestracji',
    wejscieEtykieta: isEn ? 'Input' : 'Wejście',
    hubTekst: isEn ? 'All free tools & 16 PDF/XLSX templates' : 'Wszystkie narzędzia i 16 szablonów PDF/XLSX',
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
