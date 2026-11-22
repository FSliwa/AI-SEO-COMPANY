// Niemieckie dane stron narzędzi (18.11.2026, grupa de-narzedzia): okruszki, nazwy źródeł, FAQ generatora
// llms.txt i karty „Weitere kostenlose Tools” (tylko narzędzia i szablony, które mają stronę DE).
// Czysty ESM bez importów (czytają go komponenty serwerowe i klienckie). Te same URL-e i daty źródeł
// co w lib/narzedzia.js (kolejność nazw = kolejność sources PL); H1, title i opis stron: lib/stronyDe.js.
// Terminologia: GLOSSAR.md i GLOSSAR-DODATKI.md (de-narzedzia).

export const STRONY_NARZEDZI_DE = {
  'generator-llms-txt': {
    okruszek: 'llms.txt Generator',
    zrodla: [
      'llmstxt.org: The /llms.txt file, v2 (Formatspezifikation, Englisch)',
      'Ahrefs: What is llms.txt (Analyse von 137.000 Domains, Aussage von John Mueller, Englisch)',
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, Englisch)',
      'Google: Google-Extended in der Crawler-Dokumentation (Englisch)',
      'Anthropic: ClaudeBot, Claude-SearchBot und Claude-User (Englisch)',
      'Perplexity: PerplexityBot und Perplexity-User (Englisch)',
      'WordPress.org Plugin-Verzeichnis: Yoast SEO (Version 28.8)',
      'WordPress.org Plugin-Verzeichnis: Rank Math SEO (Version 1.0.281)',
      'WordPress.org Plugin-Verzeichnis: All in One SEO (Version 5.0.5)',
      'Shopify Developer Changelog (28.05.2026): Standard-/llms.txt und Vorlage llms.txt.liquid (Englisch)',
    ],
  },
  'audyt-seo': {
    okruszek: 'Kostenloser SEO Audit',
    zrodla: [
      'Google: PageSpeed Insights API v5 (Lighthouse und Chrome UX Report, Englisch)',
      'Google Search Central: Einführung in robots.txt',
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, Englisch)',
      'Google: Google-Extended in der Crawler-Dokumentation (Englisch)',
    ],
  },
  'autorytet-domeny': {
    okruszek: 'Domain Authority Checker',
    zrodla: [
      'Common Crawl: Host- und Domain-Graphen aus den Crawls August bis Oktober 2026 (Release cc-main-2026-aug-sep-oct, 135,0 Mio. Domains, 1,8 Mrd. Kanten, Englisch)',
      'Common Crawl: Web Graphs (Graph-Releases und Domain-Rankings: Harmonic Centrality und PageRank, Englisch)',
      'Common Crawl: Terms of Use (Fassung vom 07.03.2024, Englisch)',
      'Paolo Boldi, Sebastiano Vigna: Axioms for Centrality (arXiv:1308.2140, Internet Mathematics 2014, Englisch)',
      'Ahrefs Help: What is Domain Rating (DR) (Englisch)',
      'Moz: What is Domain Authority (Englisch)',
      'Moz: Top 500 Domains (Vergleich mit unserem Wert bei 441 zugeordneten Domains, Englisch)',
    ],
  },
  'kalkulator-strat-seo': {
    okruszek: 'SEO-Verlustrechner',
  },
  'makieta-redesignu': {
    okruszek: 'Website-Relaunch-Mockup',
    zrodla: [],
  },
  'tester-robotow-ai-robots-txt': {
    okruszek: 'KI-Crawler & robots.txt Prüfer',
    zrodla: [
      'OpenAI: Overview of OpenAI Crawlers (GPTBot, OAI-SearchBot, ChatGPT-User, Englisch)',
      'Perplexity: PerplexityBot und Perplexity-User Dokumentation (Englisch)',
      'Anthropic: ClaudeBot und Claude-SearchBot Dokumentation (Englisch)',
      'Google Search Central: Google-Extended und Google-Crawler',
    ],
  },
  'test-core-web-vitals-porownanie': {
    okruszek: 'Core Web Vitals Vergleich',
    zrodla: [
      'Google: PageSpeed Insights API v5 (Lighthouse und Chrome UX Report, Englisch)',
      'Chrome UX Report (CrUX) API: 28-Tage-Felddaten im 75. Perzentil (Englisch)',
      'web.dev: Core Web Vitals Grenzwerte (LCP <= 2,5 s, INP <= 200 ms, CLS <= 0,10)',
    ],
  },
  'sprawdz-cytowalnosc-strony-ai': {
    okruszek: 'GEO-Zitierbarkeit prüfen',
    zrodla: [
      'Google Search Central: KI-Funktionen in der Suche und Ihre Website',
      'Aggarwal et al.: GEO - Generative Engine Optimization (arXiv:2311.09735, Englisch)',
    ],
  },
  'sprawdz-przekierowania-hreflang': {
    okruszek: 'Weiterleitungen & hreflang',
    zrodla: [
      'Google Search Central: Weiterleitungen und die Google-Suche',
      'Google Search Central: Lokalisierte Versionen Ihrer Seiten (hreflang und x-default)',
    ],
  },
  'generator-indexnow-test-bing-chatgpt': {
    okruszek: 'IndexNow & Bing-Prüfer',
    zrodla: [
      'IndexNow.org: Protokollspezifikation für sofortige Indexierung (Englisch)',
      'OpenAI: Overview of OpenAI Crawlers (OAI-SearchBot, Englisch)',
    ],
  },
  'walidator-grafu-encji-json-ld': {
    okruszek: 'JSON-LD Entitäts-Graph',
    zrodla: [
      'Google Search Central: Einführung in strukturierte Daten in JSON-LD',
      'Schema.org: Typ Organization, Steuerkennungen und Eigenschaft sameAs (Englisch)',
    ],
  },
  'audyt-lokalnego-seo-wizytowki': {
    okruszek: 'NAP-Prüfer & Bewertungs-QR',
    zrodla: [
      'Google Search Central: Strukturierte Daten für LocalBusiness',
      'Google Unternehmensprofil-Hilfe: Link oder QR-Code für Kundenrezensionen teilen',
    ],
  },
};

// Teksty DE do stałych AUTORYTET z lib/narzedziaLiczby.js (tam są tylko pl/en).
export const AUTORYTET_DE = { okres: 'August bis Oktober 2026', krawedzi: '1,8 Mrd.' };

// Karty „Weitere kostenlose Tools”: tylko strony DE z rejestru (lib/stronyDe.js). href = klucz routingu (ścieżka PL),
// <Link> z @/i18n/routing sam zamienia go na adres /de/... Liczby doklejane przez wywołującego (lib/narzedziaLiczby.js).
export const KARTY_DE = {
  '/narzedzia/audyt-seo': { nazwa: 'Kostenloser SEO Audit', opis: (L) => `Punktzahl von 1 bis 100 und Fehlerliste für bis zu ${L.audytStron} Unterseiten` },
  '/narzedzia/generator-llms-txt': { nazwa: 'llms.txt Generator', opis: (L) => `llms.txt aus Ihrer Sitemap und Zugriffstest für ${L.botowAi} KI-Bots und Bingbot` },
  '/narzedzia/autorytet-domeny': { nazwa: 'Domain Authority Checker', opis: (L) => `Wert von 0 bis 100 aus dem Link-Graphen von Common Crawl und Vergleich mit bis zu ${L.konkurentow} Konkurrenten` },
  '/narzedzia/kalkulator-strat-seo': { nazwa: 'SEO-Rechner & ROI', opis: () => 'Entgangenen Gewinn in Euro ohne Google Top 3 und KI-Antworten sowie Amortisationsmonat berechnen' },
  '/narzedzia/content-plan': { nazwa: 'Redaktionsplan Vorlage', opis: () => 'Content-Kalender für 3 Monate, Themenspeicher und Auswertung in der Search Console' },
  '/narzedzia/checklista-seo': { nazwa: 'SEO Checkliste', opis: () => '50 Punkte für Technik, On-Page SEO, lokale Sichtbarkeit, KI-Tauglichkeit und Messung' },
  '/narzedzia/dobor-slow-kluczowych': { nazwa: 'Keyword Recherche Vorlage', opis: () => 'Von Suchbegriffen über Google-Top-10-Cluster bis zur fertigen Seiten- und URL-Zuordnung' },
  '/narzedzia/checklista-e-e-a-t': { nazwa: 'E-E-A-T Checkliste', opis: () => '36 Prüfpunkte zu Anbietertransparenz, Autoren, Erfahrung und Reputation als PDF' },
  '/narzedzia/dane-strukturalne-json-ld': { nazwa: 'Schema Markup Beispiele', opis: () => '7 kopierfertige JSON-LD Vorlagen (Organization, LocalBusiness, Article, Product) mit Checkliste' },
  '/sprawdz-widocznosc-w-ai': { nazwa: 'KI-Sichtbarkeit prüfen', opis: (L) => `Nennen ${L.silniki} Ihr Unternehmen?` },
  '/narzedzia/makieta-redesignu': { nazwa: 'Website-Relaunch-Mockup', opis: () => 'Neuer KI-Startseiten-Entwurf für Desktop und Mobilgerät in 1-3 Minuten aus Ihren Inhalten' },
  '/narzedzia/tester-robotow-ai-robots-txt': { nazwa: 'KI-Crawler & robots.txt Prüfer', opis: () => '15 KI-Bots in robots.txt und HTTP prüfen, 403-WAF-Konflikte erkennen und SSR-Parität messen' },
  '/narzedzia/test-core-web-vitals-porownanie': { nazwa: 'Core Web Vitals Vergleich', opis: () => '28-Tage-CrUX-Daten (LCP, INP, CLS), CMS-Plugin-Röntgen und Konkurrenz-Vergleich in Sekunden' },
  '/narzedzia/sprawdz-cytowalnosc-strony-ai': { nazwa: 'GEO-Zitierbarkeit prüfen', opis: () => '6 RAG-Kriterien für H2/H3-Antwortblöcke, AI-Overview-Vorschau und 1:1-Konkurrenzvergleich' },
  '/narzedzia/sprawdz-przekierowania-hreflang': { nazwa: '301-Weiterleitungen & hreflang', opis: () => '4 Host-Varianten auf Ketten testen, Canonical abgleichen und A-B-Hreflang-Rücklinks prüfen' },
  '/narzedzia/generator-indexnow-test-bing-chatgpt': { nazwa: 'IndexNow & Bing-KI-Prüfer', opis: () => 'IndexNow-Schlüssel (.txt + GitHub Action), Bingbot-/OAI-SearchBot-Test und Sitemap-lastmod-Prüfung' },
  '/narzedzia/walidator-grafu-encji-json-ld': { nazwa: 'JSON-LD Entitäts-Graph Validator', opis: () => 'Schema-@graph als SVG visualisieren, @id, USt-IdNr./HRB und sameAs prüfen und Vorlage kopieren' },
  '/narzedzia/audyt-lokalnego-seo-wizytowki': { nazwa: 'NAP-Prüfer & Bewertungs-QR', opis: () => 'HTML-Kontaktdaten mit LocalBusiness-JSON-LD abgleichen, 5★-Lücke berechnen und SVG-QR laden' },
  '/narzedzia/raport-seo': { nazwa: 'SEO Report Vorlage', opis: () => 'Monatsbericht auf Zahlenbasis mit Search Console, GA4, KI-Sichtbarkeit und Maßnahmenplan als PDF' },
  '/narzedzia/szablon-analizy-konkurencji-seo': { nazwa: 'SEO Wettbewerbsanalyse Vorlage', opis: () => '5 Prüffelder für Google, Maps, KI-Antworten, Inhalte und Autorität als PDF-Arbeitsblatt' },
  '/narzedzia/szablon-strategii-seo': { nazwa: 'SEO Strategie Vorlage', opis: () => '12-Monats-Plan mit Zielen, Keyword-Clustern, Quartals-Roadmap und Budget als PDF' },
  '/narzedzia/checklista-migracji-strony': { nazwa: 'Website Relaunch Checkliste', opis: () => 'Prüfpunkte vor, am und nach dem Go-Live inklusive 301-Weiterleitungsplan als PDF' },
  '/narzedzia/umowa-na-pozycjonowanie': { nazwa: 'SEO Vertrag Checkliste', opis: () => '12 Vertragsklauseln zu Kündigungsfrist, Google-Konten, Nutzungsrechten und Links als PDF' },
  '/narzedzia/checklista-wizytowki-google': { nazwa: 'Google Unternehmensprofil Checkliste', opis: () => '40 Prüfpunkte zu Verifizierung, Kategorien, NAP-Daten, Bewertungen und Maps-Pflege als PDF' },
  '/narzedzia/brief-dla-copywritera': { nazwa: 'Briefing Vorlage für Texter', opis: () => '10 Briefing-Felder mit Suchintention, Top-5-Analyse, Gliederung und Abnahme-Checkliste als PDF' },
  '/narzedzia/szablon-audytu-tresci': { nazwa: 'Content Audit Vorlage', opis: () => 'URL-Inventar mit Search Console und GA4, 5-Kriterien-Scorecard und Entscheidungsplan als PDF' },
  '/narzedzia/linkowanie-wewnetrzne': { nazwa: 'Interne Verlinkung Vorlage', opis: () => 'Hub-and-Spoke-Cluster, Ankertext-Register und Quartals-Audit verwaister Seiten als PDF' },
  '/narzedzia/brief-strony-internetowej': { nazwa: 'Website Briefing Vorlage', opis: () => 'Lastenheft in 12 Teilen mit Seitenbaum, Technik, Core Web Vitals, 301-Migration und Budget als PDF' },
  '/narzedzia/zapytanie-ofertowe-seo': { nazwa: 'SEO Ausschreibung Vorlage (RFP)', opis: () => 'Angebotsanfrage mit Leistungsmatrix, 12 Pflichtfragen an Agenturen und Scorecard als PDF' },
};

// FAQ generatora llms.txt (5 pytań ze strony PL, treść faktograficzna identyczna) + 4 dodatkowe (jak PL: id kotwic bez zmian).
// Pytania zebrane z niemieckich podpowiedzi Google (llms.txt was ist das, vs robots.txt, vs llms-full.txt, erstellen).
export const FAQ_GENERATORA_DE = [
  {
    id: 'llms-txt-a-robots-txt',
    question: 'Ersetzt llms.txt die robots.txt?',
    answer: 'Nein. Die robots.txt sagt Bots, was sie nicht abrufen dürfen. Indexierende und trainierende Bots (unter anderem OAI-SearchBot, GPTBot, PerplexityBot, ClaudeBot) beachten sie. Bots, die auf Anfrage eines Nutzers handeln, etwa ChatGPT-User, müssen das nicht: Laut OpenAI gelten die Regeln der robots.txt für sie möglicherweise nicht. llms.txt ist eine freiwillige Übersicht der wichtigsten Unterseiten im Markdown-Format und kann nichts blockieren. Wenn Sie OAI-SearchBot in der robots.txt sperren, sorgt keine llms.txt dafür, dass ChatGPT Ihre Website zitiert.',
  },
  {
    id: 'gdzie-umiescic-llms-txt',
    question: 'Wo gehört die Datei llms.txt hin?',
    answer: 'In das Stammverzeichnis der Domain, sodass sie unter ihredomain.de/llms.txt mit Statuscode 200 als reiner Text erreichbar ist. Die Spezifikation erlaubt auch eine Datei in einem Unterverzeichnis, etwa /docs/llms.txt, sie beschreibt dann aber nur Adressen unter diesem Pfad. Eine Datei hinter einer Weiterleitung wird leicht übersehen. Öffnen Sie die Adresse nach der Veröffentlichung im Browser und prüfen Sie sie im Generator.',
  },
  {
    id: 'llms-txt-a-llms-full-txt',
    question: 'Was ist der Unterschied zwischen llms.txt und llms-full.txt?',
    answer: 'llms.txt ist ein Verzeichnis: Titel von Unterseiten mit Links und kurzen Beschreibungen. llms-full.txt ist der übliche Name für eine Datei, die den vollständigen Inhalt dieser Unterseiten in einem Markdown-Dokument enthält; die Spezifikation von llmstxt.org beschreibt sie nicht. Die ausführliche Version lohnt sich bei technischer Dokumentation, die Coding-Assistenten nutzen. Für eine Unternehmenswebsite mit einigen Dutzend Unterseiten genügt das Verzeichnis.',
  },
  {
    id: 'czy-blokowac-gptbot',
    question: 'Sollte ich GPTBot in der robots.txt sperren?',
    answer: 'Das ist eine unternehmerische Entscheidung. GPTBot sammelt Daten für das Training von OpenAI-Modellen, OAI-SearchBot indexiert Seiten für die Suche in ChatGPT. Sie können den ersten sperren und den zweiten zulassen. Wenn Sie in den Antworten von ChatGPT vorkommen möchten, sperren Sie OAI-SearchBot nicht.',
  },
  {
    id: 'czy-google-uzywa-llms-txt',
    question: 'Nutzt Google die llms.txt?',
    answer: 'Nicht in der Suche. Vertreter von Google haben öffentlich gesagt, dass die Datei nicht für die Suche gedacht ist; der Zugriff von Gemini auf Inhalte wird über den Eintrag Google-Extended in der robots.txt gesteuert. llms.txt verbessert weder Ihre Positionen in Google noch sichert sie einen Platz in AI Overviews.',
  },
];
