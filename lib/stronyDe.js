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
    tytul: 'KI SEO Agentur: B2B SEO & KI-Sichtbarkeit aus Warschau',
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
    tytul: 'Generative Engine Optimization (GEO): Agentur & Methode',
    h1: 'Generative Engine Optimization: in KI-Antworten genannt werden',
    fraza: 'generative engine optimization',
    opis: 'Generative Engine Optimization (GEO): So wird Ihr Unternehmen in ChatGPT, Gemini und Google AI Overviews genannt. Methode, Messung und Maßnahmen.',
  },
  '/sprawdz-widocznosc-w-ai': {
    de: '/ki-sichtbarkeit-pruefen', grupa: 'de-geo', gotowa: true,
    tytul: 'KI-Sichtbarkeit prüfen: ChatGPT & Google KI Check',
    h1: 'KI-Sichtbarkeit prüfen: Wird Ihre Marke in ChatGPT genannt?',
    fraza: 'ki sichtbarkeit',
    opis: 'Kostenloser KI Sichtbarkeitscheck: Wir stellen ChatGPT, Gemini, Perplexity, Claude und AI Overviews Kundenfragen und zeigen, ob Ihre Marke genannt wird.',
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
    tytul: 'SEO Analyse kostenlos & SEO Audit: Website online prüfen',
    h1: 'Kostenloser SEO Audit & SEO-Analyse: Website online prüfen',
    fraza: 'seo analyse kostenlos',
    opis: 'SEO Analyse kostenlos & SEO Audit (1 bis 100 Punkte): Technik, Inhalte, mobile Ladezeit und Zugriff für KI-Bots ohne Anmeldung mit Maßnahmenliste prüfen.',
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
    opis: 'Kostenloser llms.txt Generator: Datei aus Ihrer Sitemap mit Abschnitten und Beschreibung je Link plus Zugriffstest für 9 KI-Bots und Bingbot.',
  },
  '/narzedzia/autorytet-domeny': {
    de: '/tools/domain-authority-checker', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Domain Authority Checker: Domain-Autorität & DR prüfen',
    h1: 'Domain Authority Checker: Autorität Ihrer Domain prüfen',
    fraza: 'domain authority checker',
    opis: 'Kostenloser Domain Authority Checker & Domain Rating Check: 0-100 Wert aus Common Crawl (135 Mio. Domains), Domain Authority prüfen & Konkurrenzvergleich.',
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
  '/porownania': {
    de: '/vergleiche', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO Vergleich 2026: Agentur, Google Ads, GEO & CMS',
    h1: 'SEO Vergleich: Entscheidungshilfen zu Agentur, SEA, GEO und Technik',
    fraza: 'seo vergleich',
    opis: 'Unabhängiger SEO Vergleich mit Zahlen und Quellen: SEO vs GEO, SEO oder Google Ads (SEA), Agentur oder Freelancer sowie Next.js, Webflow & WordPress.',
  },
  '/porownania/seo-vs-geo': {
    de: '/vergleiche/seo-vs-geo', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO vs GEO: Unterschiede und der richtige Start',
    h1: 'SEO vs GEO: Was ist der Unterschied?',
    fraza: 'seo vs geo',
    opis: 'SEO vs GEO: SEO verbessert Positionen in Google, GEO sorgt für Nennungen in ChatGPT, Gemini und AI Overviews. Gemeinsamkeiten, Unterschiede, Start.',
  },
  '/o-nas': {
    de: '/ueber-uns', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Über AI SEO COMPANY: SEO-Team, Methode & Firmendaten',
    h1: 'Über AI SEO Company: SEO-Team aus Warschau',
    fraza: 'ai seo company',
    opis: 'AI SEO Company ist eine SEO Agentur aus Warschau: Team, Arbeitsweise, Unternehmensdaten und Verantwortliche hinter den Publikationen und Auswertungen.',
  },
  '/regulamin': {
    de: '/agb', grupa: 'de-prawne', gotowa: true,
    tytul: 'Allgemeine Geschäftsbedingungen (AGB) für Online-Dienste',
    h1: 'Allgemeine Geschäftsbedingungen',
    fraza: 'agb',
    opis: 'AGB von AI SEO Company (AI SIGNALS COMPANY P.S.A.): elektronische Dienste, kostenlose Tools, Reklamation und außergerichtliche Streitbeilegung.',
  },
  '/cookies': {
    de: '/datenschutz', grupa: 'de-prawne', gotowa: true,
    tytul: 'Datenschutzerklärung (DSGVO) & Cookie-Hinweise',
    h1: 'Datenschutzerklärung',
    fraza: 'datenschutz',
    opis: 'Datenschutzerklärung von AI SEO Company nach DSGVO: Verantwortlicher, Verarbeitungszwecke, Cookies und Analyse, Empfänger und Ihre Rechte.',
  },
  '/impressum': {
    de: '/impressum', grupa: 'de-prawne', tylkoDe: true, gotowa: true,
    tytul: 'Impressum & Anbieterkennzeichnung nach § 5 DDG',
    h1: 'Impressum',
    fraza: 'impressum',
    opis: 'Impressum von AI SEO Company (AI SIGNALS COMPANY Prosta Spółka Akcyjna): Anbieterkennzeichnung, Anschrift, Kontakt und Registerdaten nach § 5 DDG.',
  },
  '/seo-agentur-polen': {
    de: '/seo-agentur-polen', grupa: 'de-uslugi', tylkoDe: true, gotowa: true,
    tytul: 'SEO Polen & SEO Agentur Warschau: Ihr Markteintritt',
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
    opis: 'Kostenlose Keyword Recherche Vorlage als PDF: Suchintention klären, nach Google Top 10 clustern, Ziel-URLs zuordnen und Kannibalisierung prüfen.',
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
    tytul: 'Schema Markup & Strukturierte Daten: 7 JSON-LD Vorlagen',
    h1: 'Schema Markup Beispiele & Strukturierte Daten: 7 JSON-LD Vorlagen für Websites',
    fraza: 'schema markup',
    opis: 'Kostenlose Schema Markup Beispiele (Strukturierte Daten in JSON-LD): 7 Vorlagen wie Organization, LocalBusiness, Article und Product als PDF.',
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
    h1: 'SEO-Rechner & SEO-ROI-Rechner: Was fehlende Google- und KI-Sichtbarkeit kostet',
    fraza: 'seo-rechner',
    opis: 'Kostenloser SEO-Rechner und SEO-ROI-Rechner in Euro: entgangenen Gewinn ohne Google Top 3 und ohne ChatGPT-Nennung plus Amortisationsmonat prüfen.',
  },
  '/porownania/agencja-seo-czy-freelancer': {
    de: '/vergleiche/seo-agentur-oder-freelancer', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO-Agentur, Freelancer oder Inhouse? Vergleich 2026',
    h1: 'SEO-Agentur, SEO-Freelancer oder Inhouse-Team: Kosten, Risiken und Vertrag',
    fraza: 'seo-agentur',
    opis: 'SEO-Agentur, Freelancer oder Inhouse-SEO im Vergleich: Monatskosten in Euro, Vertretung, Tools, Google-Konten und Kündigungsfristen mit Quellen.',
  },
  '/porownania/seo-czy-google-ads': {
    de: '/vergleiche/seo-oder-google-ads', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO oder Google Ads (SEO vs SEA): Kosten & Vergleich',
    h1: 'SEO oder Google Ads (SEA): Was rechnet sich wann für Unternehmen?',
    fraza: 'seo oder google ads',
    opis: 'SEO oder Google Ads im Vergleich: Klickpreise, Anlaufzeit, was nach Budgetstopp bleibt und wann die Kombination aus SEO und SEA sinnvoll ist.',
  },
  '/porownania/nextjs-vs-wordpress-seo': {
    de: '/vergleiche/nextjs-vs-wordpress-seo', grupa: 'de-porownania', gotowa: true,
    tytul: 'Next.js vs WordPress für SEO & KI: Vergleich 2026',
    h1: 'Next.js vs WordPress für SEO: Core Web Vitals, Sicherheit und Kosten',
    fraza: 'next.js vs wordpress',
    opis: 'Next.js oder WordPress für B2B-SEO? 9 Kriterien im Vergleich: Core Web Vitals, Plugin-Sicherheit, JSON-LD, KI-Crawler und Gesamtkosten über 24 Monate.',
  },
  '/porownania/webflow-vs-wordpress-seo': {
    de: '/vergleiche/webflow-vs-wordpress-seo', grupa: 'de-porownania', gotowa: true,
    tytul: 'Webflow vs WordPress für SEO: Grenzen, Tempo & Kosten',
    h1: 'Webflow vs WordPress im SEO-Vergleich: URL-Struktur, hreflang und TCO',
    fraza: 'webflow vs wordpress',
    opis: 'Webflow oder WordPress für SEO? Vergleich von URL-Pfaden, CMS-Limits, mehrsprachigem hreflang, Ladezeiten, DSGVO-Schriften und 24-Monats-Kosten.',
  },
  '/porownania/strona-kodowana-czy-kreator-seo': {
    de: '/vergleiche/programmierte-website-oder-baukasten-seo', grupa: 'de-porownania', gotowa: true,
    tytul: 'Programmierte Website oder Baukasten für SEO? (2026)',
    h1: 'Individuell programmierte Website (Next.js) oder Homepage-Baukasten für SEO?',
    fraza: 'homepage-baukasten',
    opis: 'Programmierte Next.js-Website vs. Homepage-Baukasten (Wix, Squarespace): Code-Eigentum, mobile INP-Werte, HTML für KI-Bots und Kosten über 24 Monate.',
  },
  // --- Hub narzędzi DE + Sprint 1 nowych narzędzi GEO & CWV (22.11.2026) ---
  '/narzedzia': {
    de: '/tools', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Tools kostenlos: KI-Checks, Audit & Vorlagen (2026)',
    h1: 'Kostenlose SEO-Tools, KI-Prüfer und Praxis-Vorlagen',
    fraza: 'seo tools kostenlos',
    opis: 'SEO Tools kostenlos & ohne Anmeldung: Kostenlose SEO- und KI-Tools für SEO-Audit, KI-Sichtbarkeit, KI-Crawler, Core Web Vitals, Rechner & PDF-Vorlagen.',
  },
  '/narzedzia/tester-robotow-ai-robots-txt': {
    de: '/tools/ki-crawler-robots-txt-pruefen', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'KI-Crawler & robots.txt prüfen: 15 KI-Bots im Test',
    h1: 'KI-Crawler, SSR-Parität und robots.txt kostenlos prüfen',
    fraza: 'ki crawler prüfen',
    opis: 'Kostenloser KI-Crawler- und robots.txt-Prüfer: Testen Sie 15 KI-Bots (OAI-SearchBot, PerplexityBot, GPTBot), 403-WAF-Sperren und SSR-HTML ohne Anmeldung.',
  },
  '/narzedzia/test-core-web-vitals-porownanie': {
    de: '/tools/core-web-vitals-vergleich', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Core Web Vitals Test & Konkurrenz-Vergleich (CrUX)',
    h1: 'Core Web Vitals Test: Ihre Website gegen Konkurrenz und Next.js',
    fraza: 'core web vitals test',
    opis: 'Kostenloser Core Web Vitals Vergleich mit echten 28-Tage-CrUX-Daten (LCP, INP, CLS): CMS-Plugin-Analyse, Wettbewerbsvergleich und Relaunch-Rechner in Euro.',
  },
  // --- Faza 2 DACH Services & GEO Spoke (22.11.2026): Google Unternehmensprofil + KI-Sichtbarkeit Audit ---
  '/pozycjonowanie-wizytowki-google': {
    de: '/google-unternehmensprofil-optimieren', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Google Unternehmensprofil optimieren: Preis & 49-Raster',
    h1: 'Google Unternehmensprofil optimieren: Sichtbarkeit auf Google Maps',
    fraza: 'google unternehmensprofil optimieren',
    opis: 'Google Unternehmensprofil optimieren mit Positionsmessung im 49-Punkte-Kartenraster: Kategorien, Leistungen, Bewertungen und Preise in Euro (netto).',
  },
  '/pozycjonowanie-w-ai/audyt-widocznosci': {
    de: '/ki-suchoptimierung/ki-sichtbarkeit-audit', grupa: 'de-geo', gotowa: true,
    tytul: 'KI-Sichtbarkeit messen & Audit: 30 Fragen in 4 KI-Systemen',
    h1: 'KI-Sichtbarkeit messen: Audit in ChatGPT, Gemini und Perplexity',
    fraza: 'ki sichtbarkeit messen',
    opis: 'KI-Sichtbarkeit messen mit 30 echten Kundenfragen in ChatGPT, Perplexity, Gemini und Google AI Overviews: Quellen, 90-Tage-Plan (235 € netto) & Monitoring.',
  },
  // --- Sprint 2 DACH (22.11.2026): 8. Tool (Mockup) + 5 neue Tools + 5 PDF-Vorlagen + CMS/VS/GEO Kosten ---
  '/narzedzia/makieta-redesignu': {
    de: '/tools/website-relaunch-mockup', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Website Relaunch Mockup mit KI: Entwurf in 1-3 Minuten',
    h1: 'Kostenloses KI-Mockup für Ihren Website-Relaunch in 1 bis 3 Minuten',
    fraza: 'website relaunch mockup',
    opis: 'Kostenloses KI-Mockup für Ihren Website-Relaunch: URL eingeben und in 1-3 Minuten einen neuen Startseiten-Entwurf für Desktop und Mobilgerät prüfen.',
  },
  '/narzedzia/sprawdz-cytowalnosc-strony-ai': {
    de: '/tools/geo-zitierbarkeit-pruefen', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'GEO-Zitierbarkeit prüfen: Kostenloser KI-Block-Check',
    h1: 'GEO-Zitierbarkeit prüfen: Wird Ihre Seite in AI Overviews & ChatGPT zitiert?',
    fraza: 'geo zitierbarkeit prüfen',
    opis: 'Prüfen Sie kostenlos die GEO-Zitierbarkeit Ihrer Seite für AI Overviews und ChatGPT: 6 RAG-Kriterien, Answer-First-Blöcke und 1:1-Konkurrenzvergleich.',
  },
  '/narzedzia/sprawdz-przekierowania-hreflang': {
    de: '/tools/weiterleitungen-hreflang-pruefen', grupa: 'de-narzedzia', gotowa: true,
    tytul: '301-Weiterleitungen, Canonical & hreflang live prüfen',
    h1: '301-Weiterleitungen, Canonical & hreflang online prüfen',
    fraza: 'weiterleitungen hreflang prüfen',
    opis: 'Kostenloser Redirect- und hreflang-Prüfer: 4 Host-Varianten auf Ketten testen, Canonical abgleichen, A-B-Rücklinks prüfen und Server-Regeln kopieren.',
  },
  '/narzedzia/generator-indexnow-test-bing-chatgpt': {
    de: '/tools/indexnow-generator-bing-chatgpt-test', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'IndexNow Generator, Sitemap-lastmod & Bing-KI-Prüfer',
    h1: 'IndexNow Generator, Sitemap-lastmod & Bing / ChatGPT Prüfer',
    fraza: 'indexnow generator',
    opis: 'Kostenloser IndexNow-Schlüsselgenerator (.txt-Download, curl & GitHub Action) inklusive Bingbot- & OAI-SearchBot-Test sowie Sitemap-lastmod-Prüfung.',
  },
  '/narzedzia/walidator-grafu-encji-json-ld': {
    de: '/tools/entity-graph-json-ld-validator', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'JSON-LD Entitäts-Graph Validator & @graph Generator',
    h1: 'JSON-LD Entitäts-Graph Validator & @graph Generator',
    fraza: 'json-ld validator',
    opis: 'Kostenloser Entity-SEO-Validator: JSON-LD-@graph als SVG prüfen, @id-Anker, USt-IdNr./HRB sowie sameAs kontrollieren und Schema-Vorlage kopieren.',
  },
  '/narzedzia/audyt-lokalnego-seo-wizytowki': {
    de: '/tools/lokales-seo-nap-qr-generator', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Lokales SEO: NAP-Prüfer & Google-Bewertungs-QR-Code',
    h1: 'Lokales SEO: NAP-Prüfer, Bewertungsrechner & Google-QR-Generator',
    fraza: 'google bewertung qr code',
    opis: 'Kostenloses Local-SEO-Tool: HTML-Kontaktdaten mit LocalBusiness-JSON-LD abgleichen, fehlende 5★-Bewertungen berechnen und QR-Code herunterladen.',
  },
  '/narzedzia/raport-seo': {
    de: '/tools/seo-report-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Report Vorlage kostenlos: Monatsbericht als PDF',
    h1: 'SEO Report Vorlage: Monatsbericht auf Zahlenbasis statt Chart-Friedhof',
    fraza: 'seo report vorlage',
    opis: 'Kostenlose SEO Report Vorlage als PDF: Monatsbericht mit Anfragen, Search Console, Technik, KI-Sichtbarkeit und Maßnahmen für B2B-Teams.',
  },
  '/narzedzia/szablon-analizy-konkurencji-seo': {
    de: '/tools/wettbewerbsanalyse-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Wettbewerbsanalyse Vorlage kostenlos: PDF Download',
    h1: 'SEO Wettbewerbsanalyse Vorlage: 5 Prüffelder für Ihren Vorsprung',
    fraza: 'seo wettbewerbsanalyse',
    opis: 'Kostenlose SEO Wettbewerbsanalyse Vorlage als PDF: Echte SERP-Wettbewerber, Themenlücken, Technik, Autorität und KI-Zitate strukturiert prüfen.',
  },
  '/narzedzia/szablon-strategii-seo': {
    de: '/tools/seo-strategie-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Strategie Vorlage kostenlos: Plan in 6 Schritten',
    h1: 'SEO Strategie Vorlage: Ihr 12-Monats-Plan auf 6 Arbeitsblättern',
    fraza: 'seo strategie vorlage',
    opis: 'Kostenlose SEO Strategie Vorlage als PDF: Ziele, Seitenarchitektur, 90-Tage-Roadmap, Ressourcen, Budget und KPIs auf einem klaren Arbeitsblatt.',
  },
  '/narzedzia/checklista-migracji-strony': {
    de: '/tools/website-relaunch-checkliste', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Website Relaunch Checkliste SEO: PDF ohne Rankingverlust',
    h1: 'Website Relaunch Checkliste für SEO: sicher umziehen ohne Sichtbarkeitsverlust',
    fraza: 'website relaunch checkliste',
    opis: 'Kostenlose Website Relaunch Checkliste für SEO als PDF: Prüfpunkte zu 301-Weiterleitungen, Staging-Schutz, Go-Live und Kontrolle ohne Verluste.',
  },
  '/narzedzia/umowa-na-pozycjonowanie': {
    de: '/tools/seo-vertrag-checkliste', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Vertrag Checkliste & Musterklauseln: PDF Download',
    h1: 'SEO Vertrag Checkliste: 12 Klauseln, die Auftraggeber vor der Unterschrift prüfen sollten',
    fraza: 'seo vertrag',
    opis: 'Kostenlose SEO Vertrag Checkliste als PDF: 12 Klauseln vor Vertragsabschluss prüfen - Kündigungsfrist, Google-Konten, Nutzungsrechte, Links und AVV.',
  },
  '/porownania/shopify-vs-woocommerce-seo': {
    de: '/vergleiche/shopify-vs-woocommerce-seo', grupa: 'de-porownania', gotowa: true,
    tytul: 'Shopify vs WooCommerce für SEO: URLs, Tempo & Kosten',
    h1: 'Shopify vs WooCommerce für SEO und KI: URL-Struktur, Ladezeit und Kosten über 24 Monate',
    fraza: 'shopify vs woocommerce seo',
    opis: 'Shopify oder WooCommerce für Shop-SEO? Vergleich von URL-Struktur, Core Web Vitals, Product-Schema, hreflang, KI-Bots und Kosten über 24 Monate.',
  },
  '/porownania/ahrefs-vs-semrush-narzedzia-seo': {
    de: '/vergleiche/ahrefs-vs-semrush-seo-tools', grupa: 'de-porownania', gotowa: true,
    tytul: 'Ahrefs vs Semrush vs kostenlose SEO-Tools: Preise 2026',
    h1: 'Ahrefs vs Semrush vs kostenlose SEO-Tools: Funktionen, Limits und Preise im Vergleich',
    fraza: 'ahrefs vs semrush',
    opis: 'Ahrefs oder Semrush im Vergleich: aktuelle Tarife in USD, Credit-Limits, Linkdaten und wann für B2B-Unternehmen kostenlose SEO-Tools ausreichen.',
  },
  '/pozycjonowanie-wordpress': {
    de: '/wordpress-seo-agentur', grupa: 'de-uslugi', gotowa: true,
    tytul: 'WordPress SEO Agentur: Ladezeit, Technik & KI-Suche',
    h1: 'WordPress SEO für Unternehmen: Ladezeit, saubere Indexierung und KI-Sichtbarkeit',
    fraza: 'wordpress seo',
    opis: 'WordPress SEO für B2B-Websites: Plugin-Ballast abbauen (LCP/INP), Archiv-Indexierung, sauberes JSON-LD, KI-Crawler-Zugriff und Pakete ab 450 €.',
  },
  '/pozycjonowanie-webflow': {
    de: '/webflow-seo-agentur', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Webflow SEO Agentur: CMS-Struktur, Hreflang & KI-SEO',
    h1: 'Webflow SEO für B2B & SaaS: CMS-Architektur, Hreflang und KI-Sichtbarkeit',
    fraza: 'webflow seo',
    opis: 'Webflow SEO für B2B- und SaaS-Websites: CMS-Kollektionen strukturieren, Localization-Hreflang prüfen, JSON-LD, KI-Sichtbarkeit und Pakete ab 450 €.',
  },
  '/pozycjonowanie-w-ai/cennik': {
    de: '/ki-suchoptimierung/kosten', grupa: 'de-geo', gotowa: true,
    tytul: 'GEO & KI-Suchoptimierung Kosten: Modelle & Preise 2026',
    h1: 'Was kostet Generative Engine Optimization (GEO)? Preismodelle und Kosten 2026',
    fraza: 'generative engine optimization kosten',
    opis: 'Was kostet Generative Engine Optimization (GEO)? 3 Abrechnungsmodelle, echte Kostenblöcke und unsere Preise: KI-Audit 235 € netto, Pakete ab 450 €.',
  },
  // --- Pełne domknięcie mapy DE (seo/mapa-de.csv Faza 2 + Faza 3, 22.11.2026): 20 stron (Hub Bloga, 10 artykułów, 6 szablonów PDF, 2 porównania, zmiana agencji) ---
  '/blog': {
    de: '/blog', grupa: 'de-blog', gotowa: true,
    tytul: 'SEO Blog: Ratgeber zu B2B SEO, Technik & KI-Suche',
    h1: 'SEO Blog: Praxis-Ratgeber für SEO, Technik und KI-Suche',
    fraza: 'seo blog',
    opis: 'SEO Blog von AI SEO COMPANY: fundierte Ratgeber zu technischem SEO, Core Web Vitals, Linkaufbau, GA4, Google Unternehmensprofil und KI-Sichtbarkeit.',
  },
  '/porownania/jak-wybrac-agencje-seo': {
    de: '/vergleiche/seo-agentur-auswaehlen', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO Agentur finden & auswählen: 12 Fragen vor Vertrag',
    h1: 'SEO Agentur finden und auswählen: 12 Fragen vor der Vertragsunterschrift',
    fraza: 'seo agentur finden',
    opis: 'Wie Sie die passende SEO Agentur finden (DE, AT, Schweiz): 12 konkrete Prüffragen zu Vertrag, Google-Konten, Links, Preisen und Warnsignalen im Vergleich.',
  },
  '/porownania/pozycjonowanie-za-efekt-czy-abonament': {
    de: '/vergleiche/seo-erfolgsbasiert-oder-retainer', grupa: 'de-porownania', gotowa: true,
    tytul: 'SEO erfolgsbasiert oder Retainer? Abrechnungs-Vergleich',
    h1: 'SEO erfolgsbasiert oder monatlicher Retainer: Was rechnet sich für B2B?',
    fraza: 'seo erfolgsbasiert',
    opis: 'SEO erfolgsbasiert (Pay per Performance) oder monatlicher Retainer? Kosten, Marken-Keyword-Fallen, Risiken und faire Alternativen für Unternehmen im Check.',
  },
  '/zmiana-agencji-seo': {
    de: '/seo-agentur-wechseln', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO Agentur wechseln: Übergabe ohne Rankingverlust',
    h1: 'SEO Agentur wechseln: 6 Schritte und 32 Prüfpunkte ohne Rankingverlust',
    fraza: 'seo agentur wechseln',
    opis: 'Sicher die SEO Agentur wechseln: Kündigungsfrist prüfen, Google-Konten, Domain, Texte und Backlinks sichern. Leitfaden mit 32-Punkte-Übergabeliste.',
  },
  '/narzedzia/checklista-wizytowki-google': {
    de: '/tools/google-unternehmensprofil-checkliste', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Google Unternehmensprofil Checkliste: 40 Punkte als PDF',
    h1: 'Google Unternehmensprofil Checkliste: 40 Prüfpunkte zum Download',
    fraza: 'google unternehmensprofil checkliste',
    opis: 'Kostenlose Google Unternehmensprofil Checkliste als PDF: 40 Punkte zu Verifizierung, Kategorien, NAP-Daten, Bewertungen, Beiträgen und Maps-Pflege.',
  },
  '/narzedzia/brief-dla-copywritera': {
    de: '/tools/briefing-vorlage-texter', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Briefing Vorlage Texter: SEO-Content-Briefing als PDF',
    h1: 'Briefing Vorlage für Texter: SEO-Texte in 10 Feldern sauber beauftragen',
    fraza: 'briefing vorlage texter',
    opis: 'Kostenlose Briefing Vorlage für Texter als PDF: Suchintention, Top-5-SERP-Analyse, Gliederung, interne Links, E-E-A-T-Quellen und Abnahme-Checkliste.',
  },
  '/narzedzia/szablon-audytu-tresci': {
    de: '/tools/content-audit-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Content Audit Vorlage kostenlos: Seiten prüfen als PDF',
    h1: 'Content Audit Vorlage: Bestehende Inhalte bewerten und bereinigen',
    fraza: 'content audit',
    opis: 'Kostenlose Content Audit Vorlage als PDF: URL-Inventar mit Search Console und GA4 abgleichen und je Seite klar entscheiden (behalten, updaten, 301).',
  },
  '/narzedzia/linkowanie-wewnetrzne': {
    de: '/tools/interne-verlinkung-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Interne Verlinkung: Vorlage & SEO-Strategie als PDF',
    h1: 'Interne Verlinkung planen: Kostenlose Vorlage für Hub-and-Spoke & Ankertexte',
    fraza: 'interne verlinkung',
    opis: 'Kostenlose Vorlage für interne Verlinkung als PDF: Zielseiten priorisieren, Ankertexte ohne Kannibalisierung steuern und verwaiste Seiten finden.',
  },
  '/narzedzia/brief-strony-internetowej': {
    de: '/tools/website-briefing-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'Website Briefing Vorlage kostenlos: Lastenheft als PDF',
    h1: 'Website Briefing Vorlage für Relaunch und Neubau inklusive SEO-Teil',
    fraza: 'website briefing vorlage',
    opis: 'Kostenlose Website Briefing Vorlage als PDF: Ziele, Seitenbaum, CMS-Auswahl, SEO-Anforderungen, Ladezeiten, DSGVO und Budget vor der Anfrage klären.',
  },
  '/narzedzia/zapytanie-ofertowe-seo': {
    de: '/tools/seo-ausschreibung-vorlage', grupa: 'de-narzedzia', gotowa: true,
    tytul: 'SEO Ausschreibung Vorlage (RFP): Agentur-Anfrage PDF',
    h1: 'SEO Ausschreibung Vorlage: Vergleichbare Agentur-Angebote einholen',
    fraza: 'seo ausschreibung vorlage',
    opis: 'Kostenlose SEO Ausschreibung Vorlage (RFP) als PDF: 10 Projektfelder, 12 Pflichtfragen an Agenturen und Bewertungsmatrix für vergleichbare Angebote.',
  },
  '/blog/analiza-konkurencji-seo-przewodnik': {
    de: '/blog/seo-konkurrenzanalyse', grupa: 'de-blog', gotowa: true,
    tytul: 'Konkurrenzanalyse SEO: Anleitung & Daten zu 17 Agenturen',
    h1: 'Konkurrenzanalyse SEO: Schritt-für-Schritt-Anleitung mit echten Marktdaten',
    fraza: 'konkurrenzanalyse seo',
    opis: 'Konkurrenzanalyse SEO in 6 Schritten: SERP-Wettbewerber bestimmen, Content-Gaps, Backlinks, Core Web Vitals und KI-Zitate prüfen - mit 17-Agenturen-Daten.',
  },
  '/blog/technical-seo-audit-checklist': {
    de: '/blog/technischer-seo-audit-checkliste', grupa: 'de-blog', gotowa: true,
    tytul: 'Technisches SEO & Audit Checkliste: Grenzwerte 2026',
    h1: 'Technisches SEO Audit: Praxis-Checkliste mit Grenzwerten für Unternehmen',
    fraza: 'technisches seo',
    opis: 'Technisches SEO systematisch prüfen: Crawling, Indexierung, Statuscodes, Canonical, hreflang, Core Web Vitals, JSON-LD und KI-Bots mit klaren Schwellen.',
  },
  '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': {
    de: '/blog/linkaufbau-b2b', grupa: 'de-blog', gotowa: true,
    tytul: 'Linkaufbau im B2B: White-Hat-Strategien & Checkliste',
    h1: 'Linkaufbau für B2B-Unternehmen: White-Hat-Strategien und Qualitäts-Checkliste',
    fraza: 'linkaufbau',
    opis: 'Nachhaltiger Linkaufbau für B2B ohne Spam-Risiko: linkwürdige Studien und Tools, Digital PR, Partnerlinks und woran Sie wertlose Kauflinks sofort erkennen.',
  },
  '/blog/content-gap-analysis': {
    de: '/blog/content-gap-analyse', grupa: 'de-blog', gotowa: true,
    tytul: 'Content Gap Analyse: Themenlücken finden & priorisieren',
    h1: 'Content Gap Analyse im SEO: Wie Sie echte Themenlücken finden und schließen',
    fraza: 'content gap analyse',
    opis: 'Content Gap Analyse Schritt für Schritt: fehlende Keywords und KI-Fragen gegen Top-Wettbewerber aufdecken, nach Suchintention clustern und priorisieren.',
  },
  '/blog/audyt-ux-strony': {
    de: '/blog/ux-audit', grupa: 'de-blog', gotowa: true,
    tytul: 'UX Audit einer Website: Prüfpunkte für mehr Anfragen',
    h1: 'UX Audit für B2B-Websites: Nutzbarkeit, Formulare und Conversion prüfen',
    fraza: 'ux audit',
    opis: 'Praxisleitfaden zum UX Audit: Navigation, mobile Bedienung, Ladezeit (INP/CLS), Barrierefreiheit und Kontaktformulare systematisch auf Hürden prüfen.',
  },
  '/blog/jak-pozyskiwac-opinie-google-poradnik': {
    de: '/blog/google-bewertungen-sammeln', grupa: 'de-blog', gotowa: true,
    tytul: 'Google Bewertungen sammeln: Seriöse Methoden & QR-Code',
    h1: 'Google Bewertungen sammeln: Wie Unternehmen dauerhaft echte Rezensionen gewinnen',
    fraza: 'google bewertungen sammeln',
    opis: 'Mehr echte Google Bewertungen sammeln ohne Richtlinienverstoß: optimaler Zeitpunkt, Direktlink und QR-Code, Antworten auf Kritik und Einfluss auf Maps.',
  },
  '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik': {
    de: '/blog/ga4-events-gtm', grupa: 'de-blog', gotowa: true,
    tytul: 'GA4 Events mit Google Tag Manager einrichten (Anleitung)',
    h1: 'GA4 Events über den Google Tag Manager sauber einrichten und prüfen',
    fraza: 'ga4 events',
    opis: 'GA4 Events im Google Tag Manager Schritt für Schritt einrichten: Formular-Leads (generate_lead), Telefonklicks, Consent Mode v2 und DebugView-Kontrolle.',
  },
  '/blog/wyniki-wdrozen-seo-2026': {
    de: '/blog/seo-ergebnisse', grupa: 'de-blog', gotowa: true,
    tytul: 'SEO Fallstudie & Ergebnisse: Echte Search-Console-Daten',
    h1: 'SEO Fallstudie 2026: Echte Ergebnisse und Verläufe aus der Google Search Console',
    fraza: 'seo fallstudie',
    opis: 'Transparente SEO Fallstudie mit echten 90-Tage-Daten aus der Google Search Console von fünf Kundenprojekten: Klicks, Impressionen, Maßnahmen und Grenzen.',
  },
  '/blog/how-long-does-seo-take': {
    de: '/blog/wie-lange-dauert-seo', grupa: 'de-blog', gotowa: true,
    tytul: 'Wie lange dauert SEO? Echte Zeiträume & Kundendaten',
    h1: 'Wie lange dauert SEO? Was Google sagt und was echte Projektdaten zeigen',
    fraza: 'wie lange dauert seo',
    opis: 'Wie lange dauert SEO bis zu sichtbaren Ergebnissen? Offizielle Google-Aussagen, Ahrefs-Daten und echte Search-Console-Zeitachsen aus vier Kundenprojekten.',
  },
  '/blog/ki-fuer-seo': {
    de: '/blog/ki-fuer-seo', grupa: 'de-blog', tylkoDe: true, gotowa: true,
    tytul: 'KI SEO Tools im Einsatz: Prozesse, Nutzen & Google-Regeln',
    h1: 'KI für SEO und KI SEO Tools: Wo sie Zeit sparen und wo sie Rankings gefährden',
    fraza: 'ki seo tools',
    opis: 'KI SEO Tools sinnvoll im B2B einsetzen: Keyword-Clustering, Briefings, Schema-Code und Datenanalyse - ohne Verstoß gegen Googles Spam-Richtlinien.',
  },
  // --- Pakiet P3 (Fala 2 + Fala 3 airSlate, 24.11.2026): 4 BOFU-Vergleiche + 4 Branchenseiten ---
  '/porownania/sistrix-vs-ahrefs-vs-seobility': {
    de: '/vergleiche/sistrix-vs-ahrefs-vs-seobility', grupa: 'de-porownania', gotowa: true,
    tytul: 'Sistrix vs Ahrefs vs Seobility: SEO-Tools im Vergleich',
    h1: 'Sistrix vs Ahrefs vs Seobility: Welches SEO-Tool lohnt sich im DACH-Raum?',
    fraza: 'sistrix vs ahrefs',
    opis: 'Sistrix, Ahrefs oder Seobility im DACH-Vergleich 2026: Sichtbarkeitsindex, Backlink-Datenbank, Technik-Audit, KI-Overviews und Kosten über 24 Monate.',
  },
  '/porownania/senuto-vs-semstorm-vs-ahrefs': {
    de: '/vergleiche/senuto-vs-semstorm-vs-ahrefs', grupa: 'de-porownania', gotowa: true,
    tytul: 'Senuto vs Semstorm vs Ahrefs: SEO-Tools für Polen & EU',
    h1: 'Senuto vs Semstorm vs Ahrefs: Keyword-Datenbanken für Polen und Osteuropa im Vergleich',
    fraza: 'senuto vs ahrefs',
    opis: 'Senuto, Semstorm oder Ahrefs für den polnischen Markt? Polnische Wortformen, Saisonalität, AI Overviews, Backlink-Prüfung und Lizenzkosten im Vergleich.',
  },
  '/porownania/nextjs-vs-astro-vs-webflow-seo': {
    de: '/vergleiche/nextjs-vs-astro-vs-webflow-seo', grupa: 'de-porownania', gotowa: true,
    tytul: 'Next.js vs Astro vs Webflow für SEO & Ladezeit 2026',
    h1: 'Next.js vs Astro vs Webflow für SEO: Core Web Vitals, hreflang und 24-Monats-Kosten',
    fraza: 'nextjs vs astro',
    opis: 'Next.js, Astro oder Webflow für B2B-SEO? Vergleich von SSR vs Islands, mobilem INP, interaktiven Rechnern, hreflang-Kosten, KI-Bots und Code-Eigentum.',
  },
  '/porownania/chatgpt-search-vs-perplexity-vs-ai-overviews': {
    de: '/vergleiche/chatgpt-search-vs-perplexity-vs-ai-overviews', grupa: 'de-porownania', gotowa: true,
    tytul: 'ChatGPT Search vs Perplexity vs AI Overviews: Vergleich',
    h1: 'ChatGPT Search vs Perplexity vs Google AI Overviews: Wie KI-Suchen Quellen auswählen',
    fraza: 'chatgpt search vs perplexity',
    opis: 'Wie wählen ChatGPT Search, Perplexity und Google AI Overviews 2026 ihre Quellen? Bing- vs Google-Index, KI-Crawler, Zitierquote und GA4-Erfolgsmessung.',
  },
  '/seo-dla-firm-budowlanych': {
    de: '/seo-fuer-bauunternehmen', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO für Bauunternehmen & Handwerk: Google, Maps & KI',
    h1: 'SEO für Bauunternehmen, Anlagenbau und Handwerksbetriebe: Anfragen über Google und KI',
    fraza: 'seo für bauunternehmen',
    opis: 'Spezialisiertes SEO und KI-Sichtbarkeit für Bauunternehmen und Haustechnik. Mit echter Search-Console-Fallstudie (9.071 Impressionen, 5 auf 44 Klicks/Wo.).',
  },
  '/seo-dla-firm-produkcyjnych-b2b': {
    de: '/seo-fuer-industrie-und-produktion', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Industrie-SEO für Hersteller, CNC & Maschinenbau (B2B)',
    h1: 'B2B-SEO und KI-Sichtbarkeit für Industrie, Lohnfertigung und produzierende Unternehmen',
    fraza: 'industrie seo',
    opis: 'Technisches B2B-SEO für Hersteller, CNC-Fertigung und Exporteure im DACH-Raum. Mit verifizierten Search-Console-Daten (8.814 Impressionen in 13 Wochen).',
  },
  '/seo-dla-restauracji-i-gastronomii': {
    de: '/seo-fuer-gastronomie-und-restaurants', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO für Restaurants & Gastronomie: Google Maps & KI',
    h1: 'Lokales SEO und Google Maps für Restaurants und Gastronomie: Direktbuchungen ohne Provision',
    fraza: 'seo für restaurants',
    opis: 'Lokales SEO, HTML-Speisekarten und KI-Empfehlungen für Restaurants statt Lieferportal-Gebühren. Fallstudie: 58.618 Impressionen und 1.470 Klicks in 90 Tg.',
  },
  '/seo-dla-firm-szkoleniowych-i-iso': {
    de: '/seo-fuer-schulungsanbieter-und-zertifizierung', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO für Schulungsanbieter, Akademien & ISO-Beratung',
    h1: 'B2B-SEO und KI-Sichtbarkeit für Weiterbildungsanbieter, Akademien und ISO-Zertifizierer',
    fraza: 'seo für weiterbildungsanbieter',
    opis: 'Nachhaltiges B2B-SEO mit Course-Schema und GEO für Akademien und ISO-Berater. Verifizierte GSC-Fallstudie: Anstieg von 2 auf 29 Klicks/Woche in 13 Wochen.',
  },
  // --- Faza 4 DACH (24.11.2026): Pełne domknięcie usług, porównań 17/17, studiów CC BY 4.0 i bloga GEO ---
  '/copywriting-seo': {
    de: '/seo-texte-schreiben', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO-Texte schreiben lassen: Copywriting ab 450 € netto',
    h1: 'SEO-Texte schreiben lassen: B2B-Copywriting in unseren SEO-Paketen',
    fraza: 'seo-texte schreiben',
    opis: 'SEO-Texte schreiben lassen im monatlichen SEO-Paket: 2 oder 4 faktengeprüfte B2B-Inhalte mit Briefing, E-E-A-T-Quellen, internen Links und Reporting.',
  },
  '/link-building': {
    de: '/linkbuilding-agentur', grupa: 'de-uslugi', gotowa: true,
    tytul: 'Linkbuilding Agentur B2B: Redaktionelle Links im Paket',
    h1: 'Linkbuilding Agentur für B2B: Redaktionelle Backlinks ohne Spam-Risiko',
    fraza: 'linkbuilding agentur',
    opis: 'Seriöse Linkbuilding Agentur im SEO-Paket: Linkprofil-Audit, linkwürdige Studien, Outreach an Fachredaktionen und 2 bzw. 4 Backlinks pro Monat ab 450 €.',
  },
  '/panel-klienta': {
    de: '/kundenportal', grupa: 'de-uslugi', gotowa: true,
    tytul: 'SEO Kundenportal 24/7: Live-Rankings, GSC & Arbeitslog',
    h1: 'Unser SEO Kundenportal: Google-Daten, KI-Sichtbarkeit und Arbeiten 24/7 live',
    fraza: 'kundenportal',
    opis: 'Einblick ins AI SEO COMPANY Kundenportal: Search-Console-Klicks, wöchentliche Rankings, KI-Zitate, Arbeitsprotokoll und PDF-Berichte ohne Anmeldung testen.',
  },
  '/porownania/ahrefs-dr-vs-moz-da-vs-common-crawl': {
    de: '/vergleiche/ahrefs-dr-vs-moz-da-vs-common-crawl', grupa: 'de-porownania', gotowa: true,
    tytul: 'Ahrefs DR vs Moz DA vs Common Crawl: Metrik-Vergleich',
    h1: 'Ahrefs DR vs Moz DA vs Common Crawl: Was Domain-Autorität wirklich misst',
    fraza: 'ahrefs dr vs moz da',
    opis: 'Ahrefs Domain Rating, Moz Domain Authority und unser 0-100-Wert aus 135 Mio. Common-Crawl-Domains im Vergleich: Formel, 441-Domain-Korrelation & Kosten.',
  },
  '/porownania/llms-txt-vs-robots-txt-vs-sitemap-xml': {
    de: '/vergleiche/llms-txt-vs-robots-txt-vs-sitemap-xml', grupa: 'de-porownania', gotowa: true,
    tytul: 'llms.txt vs robots.txt vs sitemap.xml: Rollen & KI-Bots',
    h1: 'llms.txt vs robots.txt vs sitemap.xml: Welche Datei steuert Google und KI-Bots?',
    fraza: 'llms.txt vs robots.txt',
    opis: 'Unterschied zwischen llms.txt, robots.txt und sitemap.xml erklärt: Was KI-Crawler blockiert, was die Indexierung beschleunigt und unser 17-Bot-Praxistest.',
  },
  '/porownania/seo-w-firmie-czy-agencja-seo': {
    de: '/vergleiche/inhouse-seo-oder-agentur', grupa: 'de-porownania', gotowa: true,
    tytul: 'Inhouse-SEO oder Agentur? Vollkosten-Rechnung DACH 2026',
    h1: 'Inhouse-SEO oder SEO-Agentur: Arbeitgeberbrutto, Tools und Leistung im Vergleich',
    fraza: 'inhouse-seo',
    opis: 'Inhouse-SEO-Stelle (Gehalt, Lohnnebenkosten & Tool-Lizenzen im DACH-Raum) gegen monatlichen Agentur-Retainer ab 450 € netto: Vollkosten über 12 Monate.',
  },
  '/raporty-ai': {
    de: '/ki-studien', grupa: 'de-studien', gotowa: true,
    tytul: 'KI-SEO Studien & Offene Forschungsdaten (CC BY 4.0)',
    h1: 'KI-SEO Studien & offene Datensätze: Messdaten zu Technik und KI-Zitaten',
    fraza: 'ki-seo studien',
    opis: 'Offene CC-BY-4.0-Studien von AI SEO COMPANY: KI-Empfehlungs-Index (ChatGPT & AI Overviews), 49-Regeln-SEO-Fehlerstudie und echte Search-Console-Zeitreihen.',
  },
  '/raporty-ai/indeks-polecen-ai': {
    de: '/ki-studien/ki-empfehlungs-index', grupa: 'de-studien', gotowa: true,
    tytul: 'KI-Empfehlungs-Index: Welche Quellen ChatGPT & AIO nutzen',
    h1: 'KI-Empfehlungs-Index: Welche Quellen ChatGPT, Perplexity und AI Overviews zitieren',
    fraza: 'ki-empfehlungs-index',
    opis: 'Empirische Auswertung von 141 Google-AI-Overview-Zitaten und 62 lokalen ChatGPT-Links: Anteil der Top 10 (28 %), Google Maps (95,2 %) und CSV-Download.',
  },
  '/raport-bledow-seo-w-polsce': {
    de: '/seo-fehler-studie', grupa: 'de-studien', gotowa: true,
    tytul: 'Technische SEO-Fehler & KI-Bot-Sperren: Live-Studie 2026',
    h1: 'Häufigste technische SEO-Fehler und KI-Bot-Sperren: Live-Benchmark geprüfter Websites',
    fraza: 'technische seo-fehler',
    opis: 'Live-Studie zu technischen SEO-Fehlern und robots.txt-Sperren für OAI-SearchBot, PerplexityBot und GPTBot aus anonymen 49-Regeln-Audits mit CSV-Export.',
  },
  '/blog/bing-webmaster-tools-indexnow-chatgpt': {
    de: '/blog/bing-webmaster-tools-indexnow-chatgpt', grupa: 'de-blog', gotowa: true,
    tytul: 'Bing Webmaster Tools & IndexNow einrichten (Anleitung)',
    h1: 'Bing Webmaster Tools und IndexNow einrichten: Anleitung für Bing und ChatGPT',
    fraza: 'bing webmaster tools',
    opis: 'Website in den Bing Webmaster Tools verifizieren, IndexNow-Schlüssel einrichten und Indexierung prüfen - inklusive Rolle des Bing-Index für ChatGPT.',
  },
  '/blog/reklamy-w-chatgpt': {
    de: '/blog/chatgpt-werbung', grupa: 'de-blog', gotowa: true,
    tytul: 'ChatGPT Werbung (Ads) vs. organisches GEO: Fakten 2026',
    h1: 'ChatGPT Werbung (ChatGPT Ads) vs. organische KI-Sichtbarkeit: Was Unternehmen wissen müssen',
    fraza: 'chatgpt werbung',
    opis: 'Was OpenAI zu Anzeigenformaten, Kennzeichnung und Steuerung bei ChatGPT Werbung bestätigt hat - und warum organische GEO-Zitate das Fundament bleiben.',
  },
  '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews': {
    de: '/blog/google-ai-overviews-optimieren', grupa: 'de-blog', gotowa: true,
    tytul: 'Google AI Overviews optimieren: In der KI-Übersicht sein',
    h1: 'Google AI Overviews optimieren: Wie Ihre Website in Googles KI-Übersicht zitiert wird',
    fraza: 'google ai overviews optimieren',
    opis: 'Praxisleitfaden für Google AI Overviews (KI-Übersicht): Answer-First-Absätze, Entitäts-Signale, 141-Zitate-Messung und 30-Tage-Plan ohne Spezial-Tags.',
  },
  '/blog/google-ai-mode-jak-sie-pojawic': {
    de: '/blog/google-ai-mode', grupa: 'de-blog', gotowa: true,
    tytul: 'Google AI Mode (KI-Modus): Unterschied zu AIO & SEO 2026',
    h1: 'Google AI Mode (KI-Modus): Wie Query Fan-Out funktioniert und wie Marken zitiert werden',
    fraza: 'google ai mode',
    opis: 'Was der Google AI Mode (KI-Modus) anders macht als klassische AI Overviews: Query Fan-Out, Search-Console-Messung und konkrete GEO-Schritte für B2B.',
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
