// Wersja niemiecka serwisu (DACH, 18.11.2026). JEDNO źródło prawdy: które strony mają niemiecki
// odpowiednik, pod jakim adresem i z jakim title, opisem, H1 i frazą główną. Czysty ESM bez
// importów (działa w middleware, w komponentach serwerowych i klienckich, w skryptach node).
//
// BRAMKA PUBLIKACJI (twarda reguła): dopóki DE_OPUBLIKOWANE = false, wersja niemiecka jest
// NIEWIDOCZNA: każdy adres /de... daje 404, nie ma wpisów DE w sitemapach, hreflang de, przełączniku
// języka, nawigacji, stopce ani llms.txt, a HTML stron PL i EN jest identyczny jak przed wdrożeniem
// wersji DE. Zmiana na true wyłącznie po zgodzie właściciela (osobny commit z datą w lastmod).
// Lokalny podgląd: NEXT_PUBLIC_PODGLAD_DE=1 (jak PODGLAD_PARTII w lib/publikacja.js; prefiks
// NEXT_PUBLIC_, żeby serwer i klient widziały tę samą wartość). Nigdy w Vercel.
//
// Klucz wpisu = klucz routingu next-intl (ścieżka PL). Strony bez polskiego odpowiednika
// (/impressum, /seo-agentur-polen) mają własny klucz i znacznik tylkoDe: true; ich trasy w app/
// wołają notFound() dla locale innego niż 'de'.
// de = ścieżka bez prefiksu /de ('/' = strona główna). Dokładnie 17 stron startowych
// (seo/mapa-de.csv, priorytet "1 (start)"); strony fazy 2 dopisywać tu i nigdzie indziej.
//
// Opisy: 120-158 znaków, tytuły <= 60 znaków (kontrola: node scripts/kontrola-stronyDe.mjs).
// Teksty pisane po niemiecku od zera (nie tłumaczenie słowo w słowo); terminologia: GLOSSAR.md.

// 18.11.2026: decyzja właściciela „Od razu” (świadomy brak pełnego Impressum, AGB i Datenschutz bez
// przeglądu prawnika): true. Powrót do stanu ukrytego = jedna linia (false), nic więcej nie trzeba zmieniać.
export const DE_OPUBLIKOWANE = true;
export const PODGLAD_DE = process.env.NEXT_PUBLIC_PODGLAD_DE === '1';
export const DE_AKTYWNE = DE_OPUBLIKOWANE || PODGLAD_DE;

const BASE = 'https://www.ai-seo-company.pl';

// grupa = agent odpowiedzialny za treść (PLAN-DE.md). fraza = fraza główna (mapa-de.csv).
// gotowa = treść niemiecka strony jest napisana i strona renderuje ją w locale 'de'. Dopóki false,
// middleware.js kieruje adres /de/... na stronę-zastępnik (trasa de-platzhalter: powłoka + notatka,
// noindex), więc strona nie pokazuje treści PL ani EN. Grupa ustawia true w SWOIM wpisie razem
// z oddaniem strony; przed publikacją wszystkie muszą być true (node scripts/kontrola-stronyDe.mjs --publikacja).
export const STRONY_DE = {
  '/': {
    de: '/', grupa: 'de-uslugi', gotowa: true,
    tytul: 'KI-Sichtbarkeit & SEO aus Warschau | AI SEO Company',
    h1: 'SEO und KI-Sichtbarkeit für Unternehmen im DACH-Raum',
    fraza: 'ki seo agentur',
    opis: 'KI SEO Agentur aus Warschau: SEO Audit, B2B SEO und Generative Engine Optimization, damit Ihr Unternehmen in Google und in KI-Antworten genannt wird.',
  },
  '/pozycjonowanie-stron-internetowych': {
    de: '/seo-fuer-unternehmen', grupa: 'de-uslugi', gotowa: true,
    tytul: 'B2B SEO aus Warschau: Technik, Content, Links',
    h1: 'B2B SEO: Sichtbarkeit in Google, die Anfragen bringt',
    fraza: 'b2b seo',
    opis: 'B2B SEO für Unternehmen: technische Optimierung, Content, Linkaufbau und Reporting. So wird Ihre Website in Google gefunden und bringt Anfragen.',
  },
  '/pozycjonowanie-w-ai': {
    de: '/ki-suchoptimierung', grupa: 'de-geo', gotowa: true,
    tytul: 'Generative Engine Optimization (GEO) | AI SEO Company',
    h1: 'Generative Engine Optimization: in KI-Antworten genannt werden',
    fraza: 'generative engine optimization',
    opis: 'Generative Engine Optimization (GEO): So wird Ihr Unternehmen in ChatGPT, Gemini und Google AI Overviews genannt. Methode, Messung und Maßnahmen.',
  },
  '/sprawdz-widocznosc-w-ai': {
    de: '/ki-sichtbarkeit-pruefen', grupa: 'de-geo', gotowa: true,
    tytul: 'KI-Sichtbarkeit prüfen: kostenloser Check',
    h1: 'KI-Sichtbarkeit prüfen: Wird Ihre Marke in ChatGPT genannt?',
    fraza: 'ki sichtbarkeit',
    opis: 'Kostenloser KI-Sichtbarkeit Check: Wir stellen ChatGPT, Gemini, Perplexity, Claude und AI Overviews Kundenfragen und zeigen, ob Ihre Marke genannt wird.',
  },
  '/audyt-seo': {
    de: '/seo-audit', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO Audit: Analyse und Maßnahmenplan in 3 bis 5 Werktagen',
    h1: 'SEO Audit für Ihre Website: Befunde, Prioritäten, Maßnahmen',
    fraza: 'seo audit',
    opis: 'SEO Audit mit technischer und inhaltlicher Analyse: Indexierung, Core Web Vitals, Keywords. Sie erhalten Befunde und einen priorisierten Maßnahmenplan.',
  },
  '/narzedzia/audyt-seo': {
    de: '/tools/kostenloser-seo-audit', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Kostenloser SEO Audit: Website online prüfen',
    h1: 'Kostenloser SEO Audit: Ihre Website online prüfen',
    fraza: 'seo analyse kostenlos',
    opis: 'Kostenloser SEO Audit mit Punktzahl von 1 bis 100: Technik, Inhalte, mobile Ladezeit und Zugriff für KI-Bots. Ohne Anmeldung, mit Maßnahmenliste.',
  },
  '/cennik-pozycjonowania': {
    de: '/seo-kosten', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO Kosten 2026: Preise, Pakete und Beispiele',
    h1: 'Was kostet SEO? Preise und Pakete in Euro',
    fraza: 'seo kosten',
    opis: 'Was kostet SEO? Die Pakete SEO Standard und SEO Premium mit Leistungsumfang und Preisen in Euro (netto), dazu der Booster Pack mit neuer Website.',
  },
  '/narzedzia/generator-llms-txt': {
    de: '/tools/llms-txt-generator', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'llms.txt Generator: Datei in Sekunden erstellen',
    h1: 'llms.txt Generator für Ihre Website',
    fraza: 'llms.txt generator',
    opis: 'Kostenloser llms.txt Generator: Datei aus Ihrer Sitemap mit Abschnitten und Beschreibung je Link plus Zugriffstest für 7 KI-Bots und Bingbot.',
  },
  '/narzedzia/autorytet-domeny': {
    de: '/tools/domain-authority-checker', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Domain Authority Checker: Domain-Autorität prüfen',
    h1: 'Domain Authority Checker: Autorität Ihrer Domain prüfen',
    fraza: 'domain authority checker',
    opis: 'Kostenloser Domain Authority Checker: Wert von 0 bis 100 aus dem Link-Graphen von Common Crawl, Position unter 135 Millionen Domains, Wettbewerbsvergleich.',
  },
  '/narzedzia/content-plan': {
    de: '/tools/redaktionsplan-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Redaktionsplan Vorlage kostenlos: Download als PDF',
    h1: 'Redaktionsplan Vorlage: Content-Plan für SEO',
    fraza: 'redaktionsplan vorlage',
    opis: 'Kostenlose Redaktionsplan Vorlage für Blog und Website: Content-Kalender für 3 Monate, Themenspeicher und Auswertung in der Search Console, mit Anleitung.',
  },
  '/narzedzia/checklista-seo': {
    de: '/tools/seo-checkliste', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Checkliste 2026: 50 Punkte zum Download',
    h1: 'SEO Checkliste für Ihre Website',
    fraza: 'seo checkliste',
    opis: 'SEO Checkliste mit 50 Punkten für Technik, On-Page SEO, lokale Sichtbarkeit, KI-Tauglichkeit und Messung, mit Prioritäten, Beispiel und kostenlosem PDF.',
  },
  '/porownania/seo-vs-geo': {
    de: '/vergleiche/seo-vs-geo', grupa: 'de-geo', gotowa: true,
    tytul: 'SEO vs GEO: Unterschiede und der richtige Start',
    h1: 'SEO vs GEO: Was ist der Unterschied?',
    fraza: 'seo vs geo',
    opis: 'SEO vs GEO: SEO verbessert Positionen in Google, GEO sorgt für Nennungen in ChatGPT, Gemini und AI Overviews. Gemeinsamkeiten, Unterschiede, Start.',
  },
  '/o-nas': {
    de: '/ueber-uns', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Über uns | AI SEO Company, Warschau',
    h1: 'Über AI SEO Company: SEO-Team aus Warschau',
    fraza: 'ai seo company',
    opis: 'AI SEO Company ist eine SEO Agentur aus Warschau: Team, Arbeitsweise, Unternehmensdaten und Verantwortliche hinter den Publikationen und Auswertungen.',
  },
  '/regulamin': {
    de: '/agb', grupa: 'de-prawne', gotowa: true,
    tytul: 'Allgemeine Geschäftsbedingungen | AI SEO Company',
    h1: 'Allgemeine Geschäftsbedingungen',
    fraza: 'agb',
    opis: 'AGB von AI SEO Company (AI SIGNALS COMPANY P.S.A.): elektronische Dienste, kostenlose Tools, Reklamation und außergerichtliche Streitbeilegung.',
  },
  '/cookies': {
    de: '/datenschutz', grupa: 'de-prawne', gotowa: true,
    tytul: 'Datenschutzerklärung (DSGVO) | AI SEO Company',
    h1: 'Datenschutzerklärung',
    fraza: 'datenschutz',
    opis: 'Datenschutzerklärung von AI SEO Company nach DSGVO: Verantwortlicher, Verarbeitungszwecke, Cookies und Analyse, Empfänger und Ihre Rechte.',
  },
  '/impressum': {
    de: '/impressum', grupa: 'de-prawne', tylkoDe: true, gotowa: true,
    tytul: 'Impressum | AI SEO Company',
    h1: 'Impressum',
    fraza: 'impressum',
    opis: 'Impressum von AI SEO Company (AI SIGNALS COMPANY Prosta Spółka Akcyjna): Anbieterkennzeichnung, Anschrift, Kontakt und Registerdaten nach § 5 DDG.',
  },
  '/seo-agentur-polen': {
    de: '/seo-agentur-polen', grupa: 'de-uslugi', tylkoDe: true, gotowa: true,
    tytul: 'SEO Agentur Polen: Ihr Markteintritt über Warschau',
    h1: 'SEO für den polnischen Markt: Agentur in Warschau',
    fraza: 'seo polen',
    opis: 'SEO Agentur in Warschau für Unternehmen aus dem DACH-Raum, die in Polen gefunden werden wollen: polnische Keywords, Inhalte, Technik und Reporting.',
  },
  // --- Faza 2 DE (19.11.2026): 6 stron o najwyższym popycie (3 szablony PDF, 2 poradniki techniczne, 1 spoke GEO) ---
  '/narzedzia/dobor-slow-kluczowych': {
    de: '/tools/keyword-recherche-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Keyword Recherche Vorlage kostenlos: PDF Download',
    h1: 'Keyword Recherche Vorlage: von Suchbegriffen zur Seitenmap',
    fraza: 'keyword recherche',
    opis: 'Kostenlose Keyword Recherche Vorlage als PDF: Suchintention bestimmen, Keywords nach Google Top 10 clustern, Ziel-URLs zuordnen und Kannibalisierung prüfen.',
  },
  '/narzedzia/checklista-e-e-a-t': {
    de: '/tools/e-e-a-t-checkliste', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'E-E-A-T Checkliste 2026: 36 Punkte als PDF-Vorlage',
    h1: 'E-E-A-T Checkliste: Erfahrung, Expertise und Vertrauen prüfen',
    fraza: 'e-e-a-t',
    opis: 'Kostenlose E-E-A-T Checkliste als PDF: 36 Prüfpunkte zu Vertrauen, Autoren, Inhalten, Reputation und Schema.org plus YMYL-Einstufung und Maßnahmenplan.',
  },
  '/narzedzia/dane-strukturalne-json-ld': {
    de: '/tools/schema-markup-beispiele', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen als PDF',
    h1: 'Schema Markup Beispiele: 7 JSON-LD Vorlagen für Websites',
    fraza: 'schema markup',
    opis: 'Kostenlose Schema Markup Beispiele in JSON-LD: 7 Vorlagen (Organization, LocalBusiness, Article, Product, BreadcrumbList) mit Checkliste und PDF-Download.',
  },
  '/blog/core-web-vitals-a-pozycje-google': {
    de: '/blog/core-web-vitals', grupa: 'de-blog', gotowa: true,
    tytul: 'Core Web Vitals: LCP, INP, CLS Grenzwerte und SEO 2026',
    h1: 'Core Web Vitals (LCP, INP, CLS): Grenzwerte, Messung und Google-Rankings',
    fraza: 'core web vitals',
    opis: 'Core Web Vitals verständlich erklärt: Grenzwerte im 75. Perzentil (LCP, INP, CLS), Felddaten vs. Labordaten und welche Maßnahmen Ladezeiten stabil senken.',
  },
  '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': {
    de: '/blog/canonical-tag', grupa: 'de-blog', gotowa: true,
    tytul: 'Canonical Tag (rel=canonical): Anleitung & Beispiele',
    h1: 'Canonical Tag im SEO: Funktion, Beispiele und häufige Fehler',
    fraza: 'canonical tag',
    opis: 'Wann Sie das Canonical Tag (rel=canonical) einsetzen, wie es sich von 301-Weiterleitung und noindex unterscheidet und wie Sie die Google-Auswahl prüfen.',
  },
  '/pozycjonowanie-w-ai/chatgpt': {
    de: '/ki-suchoptimierung/chatgpt', grupa: 'de-geo', gotowa: true,
    tytul: 'ChatGPT SEO: So empfiehlt ChatGPT Ihr Unternehmen',
    h1: 'ChatGPT SEO: Wie Ihr Unternehmen in ChatGPT empfohlen wird',
    fraza: 'chatgpt seo',
    opis: 'ChatGPT SEO auf Basis eigener Messdaten: 59 von 62 Empfehlungslinks führten zu Google Maps, Preisfragen zu Websites. 7 Schritte für mehr KI-Nennungen.',
  },
  // --- Faza 3 DACH BOFU & Tech-Stack VS (21.11.2026): kalkulator ROI w EUR + 5 stron porównawczych ---
  '/narzedzia/kalkulator-strat-seo': {
    de: '/tools/seo-verlustrechner', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO-Rechner & ROI-Rechner in Euro: Verlust berechnen',
    h1: 'SEO-Rechner: Was fehlende Google- und KI-Sichtbarkeit kostet',
    fraza: 'seo-rechner',
    opis: 'Kostenloser SEO-Rechner und SEO-ROI-Rechner in Euro: entgangenen Gewinn ohne Google Top 3 und ohne ChatGPT-Nennung plus Amortisationsmonat prüfen.',
  },
  '/porownania/agencja-seo-czy-freelancer': {
    de: '/vergleiche/seo-agentur-oder-freelancer', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO-Agentur, Freelancer oder Inhouse? Vergleich 2026',
    h1: 'SEO-Agentur, SEO-Freelancer oder Inhouse-Team: Kosten, Risiken und Vertrag',
    fraza: 'seo-agentur',
    opis: 'SEO-Agentur, Freelancer oder Inhouse-SEO im Vergleich: Monatskosten in Euro, Vertretung, Tools, Google-Konten und Kündigungsfristen mit Quellen.',
  },
  '/porownania/seo-czy-google-ads': {
    de: '/vergleiche/seo-oder-google-ads', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO oder Google Ads? Kosten, Dauer & Kombination 2026',
    h1: 'SEO oder Google Ads (SEA): Was rechnet sich wann für Unternehmen?',
    fraza: 'seo oder google ads',
    opis: 'SEO oder Google Ads im Vergleich: Klickpreise, Anlaufzeit, was nach Budgetstopp bleibt und wann die Kombination aus SEO und SEA sinnvoll ist.',
  },
  '/porownania/nextjs-vs-wordpress-seo': {
    de: '/vergleiche/nextjs-vs-wordpress-seo', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Next.js vs WordPress für SEO & KI: Vergleich 2026',
    h1: 'Next.js vs WordPress für SEO: Core Web Vitals, Sicherheit und Kosten',
    fraza: 'next.js vs wordpress',
    opis: 'Next.js oder WordPress für B2B-SEO? 9 Kriterien im Vergleich: Core Web Vitals, Plugin-Sicherheit, JSON-LD, KI-Crawler und Gesamtkosten über 24 Monate.',
  },
  '/porownania/webflow-vs-wordpress-seo': {
    de: '/vergleiche/webflow-vs-wordpress-seo', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Webflow vs WordPress für SEO: Grenzen, Tempo & Kosten',
    h1: 'Webflow vs WordPress im SEO-Vergleich: URL-Struktur, hreflang und TCO',
    fraza: 'webflow vs wordpress',
    opis: 'Webflow oder WordPress für SEO? Vergleich von URL-Pfaden, CMS-Limits, mehrsprachigem hreflang, Ladezeiten, DSGVO-Schriften und 24-Monats-Kosten.',
  },
  '/porownania/strona-kodowana-czy-kreator-seo': {
    de: '/vergleiche/programmierte-website-oder-baukasten-seo', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Programmierte Website oder Baukasten für SEO? (2026)',
    h1: 'Individuell programmierte Website (Next.js) oder Homepage-Baukasten für SEO?',
    fraza: 'homepage-baukasten',
    opis: 'Programmierte Next.js-Website vs. Homepage-Baukasten (Wix, Squarespace): Code-Eigentum, mobile INP-Werte, HTML für KI-Bots und Kosten über 24 Monate.',
  },
  // --- Hub narzędzi DE + Sprint 1 nowych narzędzi GEO & CWV (22.11.2026) ---
  '/narzedzia': {
    de: '/tools', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Kostenlose SEO-Tools, KI-Checks & Vorlagen (2026)',
    h1: 'Kostenlose SEO-Tools, KI-Prüfer und Praxis-Vorlagen',
    fraza: 'kostenlose seo tools',
    opis: 'Kostenlose SEO- und KI-Tools ohne Anmeldung: SEO-Audit, KI-Sichtbarkeit, KI-Crawler-Check, Core Web Vitals Vergleich, SEO-Rechner und PDF-Checklisten.',
  },
  '/narzedzia/tester-robotow-ai-robots-txt': {
    de: '/tools/ki-crawler-robots-txt-pruefen', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'KI-Crawler & robots.txt prüfen: 12 KI-Bots im Test',
    h1: 'KI-Crawler, SSR-Parität und robots.txt kostenlos prüfen',
    fraza: 'ki crawler prüfen',
    opis: 'Kostenloser KI-Crawler- und robots.txt-Prüfer: Testen Sie 12 KI-Bots (OAI-SearchBot, PerplexityBot, GPTBot), 403-WAF-Sperren und SSR-HTML ohne Anmeldung.',
  },
  '/narzedzia/test-core-web-vitals-porownanie': {
    de: '/tools/core-web-vitals-vergleich', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Core Web Vitals Test & Konkurrenz-Vergleich (CrUX)',
    h1: 'Core Web Vitals Test: Ihre Website gegen Konkurrenz und Next.js',
    fraza: 'core web vitals test',
    opis: 'Kostenloser Core Web Vitals Vergleich mit echten 28-Tage-CrUX-Daten (LCP, INP, CLS): CMS-Plugin-Analyse, Wettbewerbsvergleich und Relaunch-Rechner in Euro.',
  },
};

const bezKotwicy = (s) => {
  if (typeof s !== 'string') return '';
  const t = s.split('#')[0].split('?')[0];
  return t.length > 1 ? t.replace(/\/+$/, '') : t;
};

/** Wpis DE dla klucza routingu (ścieżki PL) albo null. Zawsze null przy wyłączonej wersji DE. */
export function wpisDe(sciezkaPl) {
  if (!DE_AKTYWNE) return null;
  return STRONY_DE[bezKotwicy(sciezkaPl)] ?? null;
}

/** Czy strona ma niemiecki odpowiednik (i wersja DE jest aktywna). */
export function maWersjeDe(sciezkaPl) {
  return Boolean(wpisDe(sciezkaPl));
}

/** Ścieżka DE bez prefiksu /de ('/' dla strony głównej) albo null. */
export function sciezkaDe(sciezkaPl) {
  return wpisDe(sciezkaPl)?.de ?? null;
}

/** Pełny adres publiczny DE (z domeną) albo null. */
export function urlDe(sciezkaPl) {
  const d = sciezkaDe(sciezkaPl);
  if (d == null) return null;
  return d === '/' ? `${BASE}/de` : `${BASE}/de${d}`;
}

/** href względny (/de, /de/seo-audit) dla zwykłego <a>/<NextLink> albo null: link tylko do istniejących stron DE. */
export function hrefDe(sciezkaPl) {
  const d = sciezkaDe(sciezkaPl);
  if (d == null) return null;
  return d === '/' ? '/de' : `/de${d}`;
}

/** Klucze routingu (ścieżki PL) stron DE w stałej kolejności; pusta lista przy wyłączonej wersji DE. */
export function opublikowaneSciezkiDe() {
  return DE_AKTYWNE ? Object.keys(STRONY_DE) : [];
}

/** Mapa adres /de... -> { klucz, gotowa } (middleware: adres spoza mapy = 404, gotowa=false = zastępnik). */
export function mapaAdresowDe() {
  return new Map(opublikowaneSciezkiDe().map((k) => [hrefDe(k), { klucz: k, gotowa: STRONY_DE[k].gotowa === true }]));
}

/** Fragment alternates.languages: { de: url } gdy strona ma wersję DE i wersja jest aktywna, inaczej {}. */
export function hreflangDe(sciezkaPl) {
  const u = urlDe(sciezkaPl);
  return u ? { de: u } : {};
}

/**
 * Metadane strony DE ze wpisu rejestru: title, description, canonical, hreflang (pl/en tylko gdy
 * istnieją odpowiedniki, x-default = PL albo EN, a dla stron tylkoDe sam de) i openGraph.
 * languages: { pl, en } opcjonalne (adresy z pełną domeną). Zwraca {} gdy strony nie ma.
 */
export function metadataDe(sciezkaPl, { languages = {}, obraz } = {}) {
  const w = wpisDe(sciezkaPl);
  if (!w) return {};
  const url = urlDe(sciezkaPl);
  const alt = { ...languages, de: url };
  const domyslny = languages['x-default'] || languages.pl || languages.en || url;
  if (domyslny) alt['x-default'] = domyslny;
  return {
    title: w.tytul,
    description: w.opis,
    alternates: { canonical: url, languages: alt },
    openGraph: {
      title: w.tytul,
      description: w.opis,
      url,
      type: 'website',
      locale: 'de_DE',
      siteName: 'AI SEO COMPANY',
      images: [obraz || { url: `${BASE}/og-image.jpg`, width: 1024, height: 1024, alt: 'AI SEO COMPANY | SEO Agentur Warschau' }],
    },
  };
}
