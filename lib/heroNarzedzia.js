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
        aria: 'Alle 13 kostenlosen SEO- und KI-Tools sowie 16 PDF-Vorlagen öffnen',
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

// --- Sekcja 6 najważniejszych darmowych narzędzi w układzie airSlate (zdj. 2) + link do pełnego huba ---
export function sekcjaNarzedziDane(locale) {
  const isEn = locale === 'en';
  const isDe = locale === 'de';
  const lang = isDe ? 'de' : isEn ? 'en' : 'pl';
  const hrefHub = adres('/narzedzia', lang) || (isDe ? '/de/tools' : isEn ? '/en/tools' : '/narzedzia');
  const hrefSzablony = isDe ? `${hrefHub}#vorlagen` : `${hrefHub}#szablony`;
  const hrefPrzykladEn = hrefJesliOpublikowana('/narzedzia/audyt-seo') ? '/en/tools/seo-audit-example' : hrefHub;

  const lista = isDe
    ? [
        {
          id: 'audyt-seo',
          klucz: '/narzedzia/audyt-seo',
          tlo: 'koral',
          nazwa: 'Kostenloser SEO-Audit',
          kategoria: `TECHNISCHE ANALYSE · ${AUDYT.regul} REGELN`,
          naglowek: `Prüfen Sie bis zu ${AUDYT.stron} Unterseiten nach ${AUDYT.regul} Regeln für Technik, Inhalt, Tempo und KI.`,
          opis: `Unser Crawler analysiert Statuscodes, Weiterleitungen, Überschriften, Canonicals, mobile PageSpeed Insights (Median aus ${AUDYT.przebiegiPsi} Läufen) und KI-Tauglichkeit in 20-90 Sekunden.`,
          ctaGlowne: 'Website kostenlos prüfen',
          ctaDrugie: 'Vollständiges SEO-Audit',
          hrefDrugie: adres('/audyt-seo', 'de') || hrefHub,
          wejscie: 'https://ihr-unternehmen.de',
          statusWejscia: `bis zu ${AUDYT.stron} Seiten · ${AUDYT.kategorii} gewichtete Bereiche`,
          cechy: [
            `Gesamtwert 1-100 mit Gewichtung ${AUDYT.wagi.techniczne}/${AUDYT.wagi.tresc}/${AUDYT.wagi.wydajnosc}/${AUDYT.wagi.ai}%`,
            'Mobile Core Web Vitals & Lighthouse-Median',
            'Priorisierte Fehlerliste direkt für Entwickler',
          ],
        },
        {
          id: 'sprawdzarka-ai',
          klucz: '/sprawdz-widocznosc-w-ai',
          tlo: 'lawenda',
          nazwa: 'KI-Sichtbarkeit prüfen',
          kategoria: 'GENERATIVE ENGINE OPTIMIZATION',
          naglowek: 'Sehen Sie live, ob ChatGPT, Gemini, Perplexity und Claude Ihre Marke empfehlen.',
          opis: `Wir stellen ${WIDOCZNOSC.silnikow} KI-Antwortsystemen ${WIDOCZNOSC.pytan} echte Kaufanfragen mit aktivierter Websuche und zeigen empfohlene Wettbewerber sowie zitierte Quellen.`,
          ctaGlowne: 'KI-Sichtbarkeit testen',
          ctaDrugie: 'Wie GEO funktioniert',
          hrefDrugie: adres('/pozycjonowanie-w-ai', 'de') || hrefHub,
          wejscie: 'Branche + Stadt + Ihre Domain',
          statusWejscia: `${WIDOCZNOSC.silnikow} KI-Systeme · ${WIDOCZNOSC.pytan} Live-Kaufanfragen`,
          cechy: [
            'Matrix „genannt / nicht genannt“ je Modell und Frage',
            `Sofort bis zu ${WIDOCZNOSC.przedBramka.firm} Wettbewerber & ${WIDOCZNOSC.przedBramka.domen} Quell-Domains`,
            'Live-Abfrage mit Google-Suche & Web-Zitaten',
          ],
        },
        {
          id: 'autorytet-domeny',
          klucz: '/narzedzia/autorytet-domeny',
          tlo: 'blekit',
          nazwa: 'Domain Authority',
          kategoria: 'LINKGRAPH-VERGLEICH',
          naglowek: `Vergleichen Sie Ihren 0-100 Linkgraph-Wert direkt mit ${AUTORYTET.konkurentow} Wettbewerbern.`,
          opis: `Berechnet aus dem öffentlichen Common-Crawl-Webgraphen (${grupuj(AUTORYTET.domenWGrafie, 'de')} Domains) über Harmonic Centrality und PageRank, ganz ohne Konto.`,
          ctaGlowne: 'Autorität prüfen',
          ctaDrugie: 'B2B-SEO Angebot',
          hrefDrugie: adres('/pozycjonowanie-stron-internetowych', 'de') || hrefHub,
          wejscie: 'ihre-domain.de vs 3 Wettbewerber',
          statusWejscia: `${grupuj(AUTORYTET.domenWGrafie, 'de')} Domains im Graphen`,
          cechy: [
            'Autoritätswert 0-100 & globale Position im Webgraphen',
            `Direkter Balkenvergleich mit bis zu ${AUTORYTET.konkurentow} Konkurrenten`,
            `Bis zu ${AUTORYTET.limitIp} geprüfte Domains pro Tag ohne Anmeldung`,
          ],
        },
        {
          id: 'kalkulator-strat-seo',
          klucz: '/narzedzia/kalkulator-strat-seo',
          tlo: 'piasek',
          nazwa: 'SEO-Verlustrechner',
          kategoria: 'ENTGANGENER DECKUNGSBEITRAG & ROI',
          naglowek: 'Berechnen Sie in Euro, wie viel Gewinn ohne Google Top 3 und KI-Zitate verloren geht.',
          opis: 'Rechnet direkt im Browser mit Ihren Besucherzahlen, Conversion-Rate und Marge auf Basis publizierter CTR-Studien - das komplette Ergebnis sofort ohne E-Mail.',
          ctaGlowne: 'Verlust in EUR berechnen',
          ctaDrugie: 'SEO-Preise ansehen',
          hrefDrugie: adres('/cennik-pozycjonowania', 'de') || hrefHub,
          wejscie: '2 400 Besuche · 2,5% Conv.',
          statusWejscia: 'Sofort im Browser · ohne E-Mail-Schranke',
          cechy: [
            'Getrennte Auswertung für Google-Suche und KI-Antworten',
            'Entgangene Anfragen pro Monat & Jahresspanne in Euro',
            'Amortisationsmonat im Vergleich zu unseren Paketen',
          ],
        },
        {
          id: 'generator-llms-txt',
          klucz: '/narzedzia/generator-llms-txt',
          tlo: 'szalwia',
          nazwa: 'llms.txt Generator',
          kategoria: 'KI-BOT-ZUGANG & SITEMAP',
          naglowek: `Erstellen Sie eine saubere llms.txt und testen Sie ${GENERATOR.botowAi} KI-Bots samt Bingbot.`,
          opis: `Liest bis zu ${GENERATOR.mapPodrzednych} Unter-Sitemaps, gliedert bis zu ${GENERATOR.adresow} wichtige URLs in Markdown-Sektionen und prüft robots.txt sowie HTTP-Statuscodes.`,
          ctaGlowne: 'llms.txt erstellen',
          ctaDrugie: '16 PDF-Vorlagen laden',
          hrefDrugie: hrefSzablony,
          wejscie: 'https://ihr-unternehmen.de/sitemap.xml',
          statusWejscia: `${GENERATOR.botowAi} KI-Crawler + Bingbot geprüft`,
          cechy: [
            'Fertige /llms.txt-Datei sofort ohne E-Mail herunterladen',
            'Live-Test von robots.txt & Server-Antwort je KI-Bot',
            'Prüfung einer bestehenden /llms.txt auf Ihrer Domain',
          ],
        },
        {
          id: 'makieta-redesignu',
          klucz: '/narzedzia/makieta-redesignu',
          tlo: 'roza',
          nazwa: 'Relaunch-Mockup',
          kategoria: 'KI-STARTSEITEN-ENTWURF · DESKTOP & MOBIL',
          naglowek: `Sehen Sie in ${MAKIETA.minut} Minuten einen neuen Startseiten-Entwurf aus Ihren echten Inhalten.`,
          opis: 'Entwirft eine moderne Startseite für Desktop und Smartphone ausschließlich aus den realen Texten Ihrer aktuellen Website - direkt neben dem Ist-Screenshot.',
          ctaGlowne: 'Kostenloses Mockup starten',
          ctaDrugie: 'Relaunch-Checkliste',
          hrefDrugie: adres('/narzedzia/checklista-migracji-strony', 'de') || hrefHub,
          wejscie: 'https://ihr-unternehmen.de',
          statusWejscia: `Fertig in ${MAKIETA.minut} Min. · echte Seiteninhalte`,
          cechy: [
            'Vorher-/Nachher-Vergleich mit Ihrer aktuellen Startseite',
            'Desktop- & Mobil-Ansicht ohne erfundene Zahlen',
            'Teilbarer Vorschaulink (4-6 Sektionen) 60 Tage gültig',
          ],
        },
      ]
    : isEn
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
          ctaDrugie: 'Download 18 templates',
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
          ctaDrugie: 'Pobierz 17 szablonów SEO',
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

  if (isDe) {
    return {
      id: 'kostenlose-tools',
      tytul: 'Kostenlose Tools für SEO & KI-Sichtbarkeit',
      podtytul: 'Prüfen Sie technische SEO-Fehler, Ihre Markennennung in ChatGPT, Ihre Link-Autorität oder entgangene Umsätze. Hier sind unsere 6 wichtigsten Tools - alle 13 Online-Tools und 16 PDF-Vorlagen finden Sie auf der Übersichtsseite.',
      mozliwosciEtykieta: 'WAS SIE ERHALTEN',
      bezRejestracji: 'Ohne Anmeldung',
      wejscieEtykieta: 'Eingabe',
      hubTekst: 'Alle 13 kostenlosen Tools & 16 PDF-Vorlagen',
      hubHref: hrefHub,
      narzedzia,
    };
  }

  return {
    id: isEn ? 'free-tools' : 'darmowe-narzedzia',
    tytul: isEn
      ? 'Free tools for the SEO & AI work your growth runs on'
      : 'Darmowe narzędzia do SEO i widoczności w AI',
    podtytul: isEn
      ? 'Audit technical errors, measure brand mentions in ChatGPT, benchmark domain authority or calculate lost revenue. Explore our 6 core tools below, or open all 13 online tools without registration.'
      : 'Sprawdź błędy techniczne, obecność marki w ChatGPT, autorytet linków, plik llms.txt albo koszt braków w Google. Poniżej 6 najważniejszych narzędzi, a wszystkie 13 działa bez rejestracji.',
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
