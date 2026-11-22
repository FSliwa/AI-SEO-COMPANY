// Deutsche Vergleichsseiten Sprint 2 (E1a, Gruppe de-porownania, 22.11.2026):
//   - P13_SHOPIFY_WOO_DE:    /porownania/shopify-vs-woocommerce-seo         -> /de/vergleiche/shopify-vs-woocommerce-seo
//   - P14_AHREFS_SEMRUSH_DE: /porownania/ahrefs-vs-semrush-narzedzia-seo    -> /de/vergleiche/ahrefs-vs-semrush-seo-tools
//
// Gleiche Datenstruktur wie lib/porownania.cms.de.js (kompatibel mit components/de/VergleichDe.jsx 1:1).
// Keine langen Gedankenstriche (nur ASCII '-'), sachlicher Preis- und Funktionsvergleich mit Datums- und Quellenangabe.

import { STRONY_DE, hrefDe } from './stronyDe.js';
import { AUDYT, AUTORYTET, POROWNYWARKA_CWV, ROBOTY_AI, WIDOCZNOSC } from './narzedziaLiczby.js';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const wew = (klucz, tekst, kotwica = '') => {
  const h = hrefDe(klucz);
  return h ? a(`${h}${kotwica}`, tekst) : tekst;
};
const liczbaDe = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

function metaDe(klucz, zapas) {
  return STRONY_DE[klucz] || zapas;
}

// --- P13_SHOPIFY_WOO_DE: Shopify vs WooCommerce fuer SEO & KI ----------------------------------

const W13 = metaDe('/porownania/shopify-vs-woocommerce-seo', {
  tytul: 'Shopify vs WooCommerce für SEO: URLs, Tempo & Kosten',
  h1: 'Shopify vs WooCommerce für SEO und KI: URL-Struktur, Ladezeit und Kosten über 24 Monate',
  opis: 'Shopify oder WooCommerce für Shop-SEO? Vergleich von URL-Struktur, Core Web Vitals, Product-Schema, hreflang, KI-Bots und Kosten über 24 Monate.',
});

export const P13_SHOPIFY_WOO_DE = {
  slug: 'shopify-vs-woocommerce-seo',
  title: W13.tytul,
  description: W13.opis,
  h1: W13.h1,
  okruszek: 'Shopify vs WooCommerce für SEO',
  nazwaKarty: 'Shopify vs WooCommerce für SEO',
  tag: 'Shopsystem-Vergleich: E-Commerce SEO & GEO',
  zrodlaDanych: 'Daten: offizielle Dokumentation und Preislisten von Shopify (shopify.com/pricing, shopify.dev, Shopify Markets) und WooCommerce (Permalinks, Structured Data, HPOS) sowie Google Search Central (Stand: 22.11.2026).',
  answer: 'Shopify punktet mit schnellem Edge-CDN ab Werk, automatischen hreflang-Tags über Shopify Markets und null Serverwartung - ideal für D2C-Marken mit internationalem Versand. WooCommerce gewinnt bei technischer SEO-Freiheit und B2B-Anforderungen: Sie steuern URL-Pfade ohne feste /collections/- und /products/-Ordner, passen den Checkout (z. B. USt-IdNr.-Prüfung) ohne 2.300-USD-Enterprise-Tarif an und behalten die volle Datenbankhoheit.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabelle-shopify-vs-woocommerce-9-kriterien',
  tableCaption: 'Shopify und WooCommerce im technischen SEO- und Kostenvergleich: 9 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: Shopify Help Center & Developer Docs (shopify.com/pricing, shopify.dev), WooCommerce Documentation (woocommerce.com/documentation) und Google Search Central (abgerufen am 22.11.2026). Markennamen gehören ihren jeweiligen Inhabern.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'shopify', label: 'Shopify (geschlossenes SaaS-Shopsystem)' },
    { key: 'woocommerce', label: 'WooCommerce (Open Source auf WordPress)' },
  ],
  rows: [
    {
      id: 'url-struktur',
      kryterium: 'URL-Architektur für Kategorien, Produkte und Magazin',
      shopify: 'Feste Systempfade /collections/, /products/, /pages/ und /blogs/news/; im Liquid-Theme muss geprüft werden, dass Produktkacheln direkt auf /products/slug statt auf Duplikate unter /collections/.../products/slug verlinken',
      woocommerce: 'Freie Permalink-Steuerung in WordPress: eigene Kategorie- und Produktbasen, verschachtelte Unterkategorien (/kategorie/unterkategorie/) und einheitliche Ratgeber-URLs ohne /blogs/-Zwang',
    },
    {
      id: 'ttfb-cwv',
      kryterium: 'Antwortzeit (TTFB) und mobile Core Web Vitals (LCP, INP)',
      shopify: 'Globales CDN (Cloudflare-Infrastruktur) und schnelles Server-HTML aus Liquid; größtes Risiko für den mobilen INP-Wert sind 10 bis 20 nachgeladene Storefront-Apps aus dem App Store',
      woocommerce: 'Abhängig vom Hosting: Mit High-Performance Order Storage (HPOS, Standard seit WooCommerce 8.2), Redis Object Cache und sauberem Server-Caching sehr schnell; auf billigem Shared Hosting mit Page-Builder oft träge',
    },
    {
      id: 'filter-indexierung',
      kryterium: 'Facettennavigation (Größen-, Farb- und B2B-Parameterfilter)',
      shopify: 'Klassische Tag-Filter (/collections/schuhe/schwarz+leder) erzeugen leicht tausende dünne URLs; natives Storefront Filtering (?filter.*) braucht konsequente Canonical-Regeln und Kontrolle in der robots.txt.liquid',
      woocommerce: 'Volle Kontrolle über indexierbare Filter-Landingpages für kaufnahe Long-Tail-Suchbegriffe bei gleichzeitigem noindex oder Canonical für Mehrfach- und Sortierparameter',
    },
    {
      id: 'product-schema',
      kryterium: 'Strukturierte Daten (Product, Offer, Versand & Rückgabe)',
      shopify: 'Online-Store-2.0-Themes geben Basis-JSON-LD über den Liquid-Filter structured_data aus; vollständige Merchant-Center-Felder (GTIN/EAN, shippingDetails, Rückgaberegeln) erfordern oft Liquid-Anpassungen oder eine App',
      woocommerce: 'Die Kernklasse WC_Structured_Data liefert Product- und Offer-Markup ab Werk; Erweiterungen für Grundpreise, GTIN und B2B-Staffeln lassen sich per PHP-Filter oder SEO-Plugin ohne Monatsabo ergänzen',
    },
    {
      id: 'hreflang-international',
      kryterium: 'Mehrsprachigkeit, Währungen und hreflang-Tags (DACH & EU)',
      shopify: 'Sehr starkes Modul Shopify Markets: Sprachverzeichnisse (/de/, /at/, /en/), Subdomains oder Länderdomains inklusive automatischer hreflang-Tags und Sitemaps; Translate & Adapt übersetzt bis zu 2 Sprachen kostenfrei',
      woocommerce: 'Flexibel über WPML (WooCommerce Multilingual) oder Polylang for WooCommerce mit übersetzten Produkt- und Kategorie-Slugs zum festen Jahrespreis, aber höherem Einrichtungsaufwand bei Steuersätzen',
    },
    {
      id: 'checkout-b2b',
      kryterium: 'Checkout-Anpassung, Rechtssicherheit & B2B-Funktionen',
      shopify: 'Schneller Ein-Seiten-Checkout, aber tiefgreifende Checkout-Anpassungen (Checkout Extensibility) und native B2B-Preislisten sind weitgehend Shopify Plus (ab ca. 2.300 USD/Monat) vorbehalten',
      woocommerce: 'Offene Checkout-Templates in jedem Tarif: USt-IdNr.-Prüfung (VIES), Kauf auf Rechnung für Geschäftskunden, individuelle Versandlogik und direkte ERP-/WaWi-Anbindung ohne Enterprise-Aufpreis',
    },
    {
      id: 'ki-crawler',
      kryterium: 'Lesbarkeit für KI-Crawler (OAI-SearchBot, PerplexityBot) & /llms.txt',
      shopify: 'Produktdaten stehen im Server-HTML für KI-Suchbots bereit; robots.txt ist über robots.txt.liquid anpassbar, eine eigene Datei direkt unter /llms.txt lässt sich ohne Proxy jedoch nicht frei ablegen',
      woocommerce: 'Voller Dateisystem- und Serverzugriff: eigene /llms.txt im Hauptverzeichnis, feingranulare Steuerung für KI-Bots in robots.txt und Server-Firewall jederzeit möglich',
    },
    {
      id: 'kosten-24m',
      kryterium: 'Kostenstruktur über 24 Monate (Lizenzen, Apps & Zahlungsgebühren)',
      shopify: 'Fester USD-Tarif (Basic 29 USD, Grow 79 USD, Advanced 299 USD/Monat bei Jahreszahlung; monatlich 39/105/399 USD) plus laufende App-Abos plus Zusatzgebühr bei externen Zahlungsanbietern außerhalb von Shopify Payments',
      woocommerce: 'Kostenloser GPL-Kern; Sie zahlen Managed Hosting, ausgewählte Jahreslizenzen und technische Wartung - ohne umsatzabhängige Plattformgebühr seitens WooCommerce',
    },
    {
      id: 'datenhoheit',
      kryterium: 'Datenhoheit, DSGVO-Kontrolle und Wechselaufwand',
      shopify: 'Proprietäre SaaS-Plattform: Produkt- und Bestelldaten sind als CSV/API exportierbar, das Liquid-Frontend und die App-Logik müssen bei einem Systemwechsel jedoch neu gebaut werden',
      woocommerce: '100 % Eigentum an PHP-Code, Bildern und MySQL-Datenbank auf einem Server Ihrer Wahl in Deutschland, Österreich, der Schweiz oder der EU',
    },
  ],
  sections: [
    {
      id: 'direktvergleich',
      h2: 'Shopify oder WooCommerce für SEO: 9 Kriterien im Direktvergleich',
      html: [
        '<p>Transparenz- und Markenhinweis: Wir betreuen im laufenden SEO sowohl Online-Shops auf Shopify als auch auf WooCommerce und erhalten keinerlei Provisionen von Plattform- oder Plugin-Anbietern. Shopify ist eine Marke der Shopify Inc., WooCommerce eine Marke der Automattic Inc.</p>',
        '<p>Beide Systeme können bei Google auf Platz 1 ranken. In der Praxis entscheiden drei technische Fragen über Ihren organischen Umsatz: Wie sauber verlinkt das System tausende Produkt- und Filter-URLs, wie stabil bleiben die mobilen Ladezeiten trotz Erweiterungen und was kostet das Gesamtpaket über zwei Jahre?</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'url-duplikate-liquid',
      h2: 'URL-Architektur und interne Produkt-Duplikate: die häufigste SEO-Bremse bei Shopify',
      html: [
        '<p>In Shopify lassen sich die Verzeichnisnamen <code>/collections/</code>, <code>/products/</code> und <code>/pages/</code> im Standard-Storefront nicht entfernen. Für Google ist das englische Pfadsegment selten ein Problem - wohl aber die Art, wie viele Shopify-Themes intern verlinken: Standardmäßig erzeugen Kategorieseiten häufig Links nach dem Muster <code>shop.de/collections/wanderschuhe/products/modell-x</code>, während das <code>rel="canonical"</code> auf <code>shop.de/products/modell-x</code> zeigt.</p>',
        `<p>Liegt ein Artikel in sechs Kollektionen, crawlt der Googlebot sechs verschiedene Adressen für dasselbe Produkt und verlässt sich allein auf das ${wew('/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', 'Canonical-Signal')}. Im technischen Audit korrigieren wir im Liquid-Template den Aufruf <code>product.url | within: collection</code> auf das direkte <code>product.url</code>, damit jede interne Verlinkung ohne Umweg auf die kanonische Produkt-URL einzahlt.</p>`,
        '<p>Bei <strong>WooCommerce</strong> bestimmen Sie die URL-Hierarchie frei. Vorsicht ist hier beim gegenteiligen Extrem geboten: Wer per Plugin sämtliche Kategorie-Präfixe komplett entfernt, riskiert bei mehreren tausend Artikeln aufgeblähte WordPress-Rewrite-Regeln und 404-Konflikte zwischen Ratgeberbeiträgen und Unterkategorien.</p>',
      ].join(''),
    },
    {
      id: 'ladezeit-hpos-und-apps',
      h2: 'Core Web Vitals: Shopify-CDN gegen WooCommerce mit HPOS und Redis',
      html: [
        `<p>Früher galt WooCommerce bei größeren Katalogen schnell als schwerfällig, weil Bestellungen zusammen mit Seiten und Beiträgen in <code>wp_posts</code> gespeichert wurden. Seit WooCommerce 8.2 trennt <strong>High-Performance Order Storage (HPOS)</strong> alle Bestelldaten standardmäßig in eigene, schlank indizierte Tabellen (<code>_wc_orders</code>) ab. Auf einem guten Managed Hosting mit Redis Object Cache erreicht WooCommerce damit sehr kurze Server-Antwortzeiten.</p>`,
        `<p>Shopify liefert das globale CDN ab Tag eins mit, verliert seine Geschwindigkeit jedoch oft schleichend durch zu viele Storefront-Apps: Jedes zusätzliche Bewertungs-Widget, Pop-up-Skript oder Upsell-Banner belastet den Hauptthread auf Smartphones und verschlechtert den INP-Wert. Wie Ihr Shop im 28-Tage-Felddatensatz dasteht, zeigt unser kostenloser ${wew('/narzedzia/test-core-web-vitals-porownanie', 'Core Web Vitals Vergleich')}.</p>`,
      ].join(''),
    },
    {
      id: 'gesamtkosten-24-monate',
      h2: 'Gesamtkosten über 24 Monate (TCO) realistisch kalkulieren',
      html: '<p>Vergleichen Sie niemals nur die nackte Grundgebühr von Shopify (Basic 29 USD, Grow 79 USD, Advanced 299 USD pro Monat bei jährlicher Abrechnung, Stand 22.11.2026) mit dem kostenlosen WooCommerce-Download. Über 24 Monate zählen die realen Betriebsblöcke:</p>',
      tabela: {
        id: 'tabelle-tco-shopify-woo-de',
        caption: 'Typische Kostenblöcke eines Online-Shops über 24 Monate (netto, Orientierungswerte)',
        columns: [
          { key: 'posten', label: 'Kostenblock' },
          { key: 'shopify', label: 'Shopify (Basic / Grow)' },
          { key: 'woo', label: 'WooCommerce (Managed Setup)' },
        ],
        rows: [
          {
            id: 'grundsystem',
            posten: 'Plattform-Tarif bzw. Managed Hosting',
            shopify: '29 USD bis 79 USD/Monat (Jahreszahlung) bzw. 39 bis 105 USD monatlich',
            woo: '0 € Lizenz + ca. 35 € bis 120 €/Monat für schnelles NVMe-/Redis-Hosting',
          },
          {
            id: 'erweiterungen',
            posten: 'Apps & Plugins (Filter, SEO-Schema, Rechtstexte, B2B, Versand)',
            shopify: 'oft 50 USD bis 200 USD/Monat für laufende App-Store-Abonnements',
            woo: 'meist 250 € bis 600 €/Jahr für Jahreslizenzen (Germanized/German Market, WPML, Versand)',
          },
          {
            id: 'zahlungen',
            posten: 'Transaktionsgebühren der Plattform',
            shopify: '0 % Zusatzgebühr mit Shopify Payments; Aufschlag bei externen Zahlungs-Gateways',
            woo: '0 % Plattformgebühr seitens WooCommerce (nur reguläre Gebühren Ihres Zahlungsdienstleisters)',
          },
          {
            id: 'wartung',
            posten: 'Technische Updates & Sicherheit',
            shopify: 'in der Plattformgebühr enthalten, kein PHP-/Datenbank-Patching nötig',
            woo: 'laufende Pflege für WordPress-, WooCommerce- und Plugin-Updates einplanen',
          },
        ],
        przypis: 'Quellen: öffentliche Preisliste unter shopify.com/pricing (abgerufen am 22.11.2026, Beträge netto zzgl. USt.) sowie marktübliche Hosting- und Plugin-Spannen im DACH-Raum.',
        minWidth: 580,
      },
      htmlPo: `<p>Vertreiben Sie erklärungsbedürftige B2B-Produkte ausschließlich auf Anfrage ohne Warenkorb, ist oft keines der beiden Shopsysteme nötig: Eine schlanke Produktkatalog-Website in Next.js startet bei uns ab 1.400 € netto oder ohne separaten Einmalpreis im Booster Pack (Details unter ${wew('/cennik-pozycjonowania', 'SEO Kosten')}).</p>`,
    },
    {
      id: 'entscheidungshilfe',
      h2: 'Wann gewinnt Shopify - und wann ist WooCommerce die bessere Wahl?',
      html: [
        '<ul>',
        '<li><strong>Wählen Sie Shopify, wenn</strong> Sie eine D2C-Handelsmarke aufbauen, schnell in mehrere Länder mit sauberem <code>hreflang</code> expandieren möchten und keine internen Entwicklerkapazitäten für Server- und Update-Pflege binden wollen.</li>',
        '<li><strong>Wählen Sie WooCommerce, wenn</strong> Sie komplexe Kategoriesysteme, B2B-Kundenkonten mit USt-IdNr.-Prüfung, individuelle Versandregeln im DACH-Raum oder volle Datenhoheit auf eigenem EU-Server ohne Enterprise-Mietpreise benötigen.</li>',
        '</ul>',
        `<p>Bestehende Shops auf beiden Systemen können Sie sofort technisch mit unserem ${wew('/narzedzia/audyt-seo', 'kostenlosen SEO Audit')} auf Indexierungs- und Schema-Fehler prüfen.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Shopify vs WooCommerce SEO',
  faq: [
    {
      question: 'Kann man /collections/ und /products/ in Shopify-URLs entfernen?',
      answer: 'Im regulären Shopify Online Store nicht - diese Verzeichnispfade sind fest im Routing verankert. Eigene URL-Strukturen lassen sich mit Shopify nur über ein entkoppeltes Headless-Frontend (z. B. Next.js oder Hydrogen über die Storefront API) umsetzen, was sich erst ab einer gewissen Umsatzgröße rechnet.',
    },
    {
      question: 'Wie behebt man doppelte Produkt-URLs innerhalb von Shopify-Kollektionen?',
      answer: 'Passen Sie im Liquid-Code Ihres Themes (meist card-product.liquid) die interne Produktverlinkung an: Ersetzen Sie product.url | within: collection durch das direkte product.url. Dadurch zeigen alle Kategorieseiten unmittelbar auf die kanonische Adresse /products/produktname.',
    },
    {
      question: 'Ist WooCommerce bei mehreren tausend Produkten zu langsam für gute Core Web Vitals?',
      answer: 'Nein, sofern die Architektur stimmt: Aktivieren Sie High-Performance Order Storage (HPOS), nutzen Sie ein Hosting mit Redis Object Cache statt einfachem Shared Hosting, richten Sie Server-Page-Caching außerhalb von Warenkorb und Kasse ein und verzichten Sie auf schwere Page-Builder.',
    },
    {
      question: 'Welches Shopsystem wird besser in ChatGPT, Perplexity und Google AI Overviews zitiert?',
      answer: 'Beide Systeme liefern Produktbeschreibungen, Preise und strukturierte Product-Daten serverseitig im HTML aus, sodass KI-Suchcrawler wie OAI-SearchBot und PerplexityBot sie ohne JavaScript lesen können. WooCommerce bietet zusätzlich den Vorteil, dass Sie im Hauptverzeichnis problemlos eine eigene /llms.txt bereitstellen und JSON-LD-Attribute ohne Zusatz-Apps frei erweitern können.',
    },
  ],
  sources: [
    { url: 'https://www.shopify.com/pricing', nazwa: 'Shopify Pricing: Tarife Basic, Grow, Advanced und Plus im Monats- und Jahresvergleich, abgerufen am 22.11.2026' },
    { url: 'https://help.shopify.com/en/manual/promoting-marketing/seo/seo-overview', nazwa: 'Shopify Help Center: SEO-Übersicht, URL-Struktur und Sitemaps, abgerufen am 22.11.2026' },
    { url: 'https://shopify.dev/docs/storefronts/themes/seo', nazwa: 'Shopify Developer Docs: Theme SEO, structured_data und robots.txt.liquid, abgerufen am 22.11.2026' },
    { url: 'https://woocommerce.com/document/permalinks/', nazwa: 'WooCommerce Documentation: Produkt- und Kategorie-Permalinks einrichten, abgerufen am 22.11.2026' },
    { url: 'https://woocommerce.com/document/high-performance-order-storage/', nazwa: 'WooCommerce Documentation: High-Performance Order Storage (HPOS), abgerufen am 22.11.2026' },
    { url: 'https://developers.google.com/search/docs/appearance/structured-data/product', nazwa: 'Google Search Central: Strukturierte Product-Daten für Snippets und Händler-Einträge, abgerufen am 22.11.2026' },
  ],
  cta: {
    tekst: 'Shop-SEO auf Shopify oder WooCommerce prüfen lassen - Angebot in 24 Std. (ab 450 € netto/Monat)',
    plan: 'standard',
    linki: [
      { tekst: 'SEO Kosten und Monatspakete ansehen', href: '/cennik-pozycjonowania' },
      { tekst: 'Shop jetzt kostenlos mit 49 Regeln prüfen', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Shopify SEO' },
    { '@type': 'Thing', name: 'WooCommerce SEO' },
  ],
};

// --- P14_AHREFS_SEMRUSH_DE: Ahrefs vs Semrush vs kostenlose SEO-Tools --------------------------

const W14 = metaDe('/porownania/ahrefs-vs-semrush-narzedzia-seo', {
  tytul: 'Ahrefs vs Semrush vs kostenlose SEO-Tools: Preise 2026',
  h1: 'Ahrefs vs Semrush vs kostenlose SEO-Tools: Funktionen, Limits und Preise im Vergleich',
  opis: 'Ahrefs oder Semrush im Vergleich: aktuelle Tarife in USD, Credit-Limits, Linkdaten und wann für B2B-Unternehmen kostenlose SEO-Tools ausreichen.',
});

export const P14_AHREFS_SEMRUSH_DE = {
  slug: 'ahrefs-vs-semrush-narzedzia-seo',
  title: W14.tytul,
  description: W14.opis,
  h1: W14.h1,
  okruszek: 'Ahrefs vs Semrush vs freie Tools',
  nazwaKarty: 'Ahrefs vs Semrush vs kostenlose SEO-Tools',
  tag: 'Werkzeug- & Budgetvergleich im SEO',
  zrodlaDanych: `Daten: öffentliche Preislisten unter ahrefs.com/pricing und semrush.com/pricing, Dokumentation der Google Search Console und Bing Webmaster Tools sowie Spezifikation unserer kostenlosen Diagnose-Tools (Common Crawl ${AUTORYTET.wydanie}, ${AUDYT.regul} Prüfregeln). Stand: 22.11.2026.`,
  answer: 'Ahrefs und Semrush sind leistungsfähige Wettbewerbs-Suiten: Ahrefs überzeugt bei Backlink-Analysen und schnellen Content-Vergleichen (Lite ab 129 USD/Monat, dazu ein kleiner Starter-Tarif für 29 USD/Monat), während Semrush SEO mit täglichem Ranking-Tracking und Google-Ads-Wettbewerbsdaten verbindet (Pro ab 139,95 USD/Monat). Betreiben Sie jedoch eine einzelne B2B-Website ohne eigene SEO-Stelle, reichen kostenlose Erstquellen (Google Search Console, Bing Webmaster Tools und unsere kostenlosen SEO-Tools) für die Diagnose vollkommen aus.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabelle-ahrefs-semrush-kostenlos',
  tableCaption: 'Ahrefs, Semrush und ein kostenloses SEO-Tool-Set im Vergleich: 9 Kriterien (Stand 22.11.2026)',
  tablePrzypis: 'Quellen: veröffentlichte Preislisten auf ahrefs.com/pricing und semrush.com/pricing (Listenpreise in USD netto zzgl. Steuern, abgerufen am 22.11.2026), Google Search Console, Bing Webmaster Tools sowie unsere Tool-Dokumentation. Keine Affiliate-Partnerschaft mit Ahrefs oder Semrush.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'ahrefs', label: 'Ahrefs' },
    { key: 'semrush', label: 'Semrush' },
    { key: 'darmowe', label: 'Kostenloses Set (GSC + Bing + AI-SEO-Tools)' },
  ],
  rows: [
    {
      id: 'preise',
      kryterium: 'Öffentliche Monatspreise (USD netto zzgl. USt., Stand 22.11.2026)',
      ahrefs: 'Starter 29 USD/Monat (nur monatlich, enges Einstiegskontingent), Lite 129 USD/Monat, Standard 249 USD/Monat, Advanced 449 USD/Monat; bis ca. 17 % Rabatt bei Jahreszahlung ab Lite',
      semrush: 'Pro 139,95 USD/Monat, Guru 249,95 USD/Monat, Business 499,95 USD/Monat; bis ca. 17 % Rabatt bei jährlicher Zahlung (Pro ca. 117,33 USD/Monat)',
      darmowe: '0 € (Google Search Console, Bing Webmaster Tools, Google Keyword-Planer sowie unsere kostenlosen Online-Prüfer und PDF-Vorlagen)',
    },
    {
      id: 'credits-nutzer',
      kryterium: 'Berichts-Credits und enthaltene Nutzerplätze',
      ahrefs: '1 Nutzer enthalten; in Starter und Lite begrenzen monatliche Credits das Öffnen und Filtern von Berichten, ab Standard (249 USD/Monat) gelten unbegrenzte Fair-Use-Credits',
      semrush: '1 Nutzer enthalten; kein Credit-Abzug pro geöffnetem Standardbericht, dafür feste Projekt- und Tageslimits (5 Projekte in Pro, 15 in Guru, 40 in Business)',
      darmowe: 'Beliebig viele Teammitglieder in Ihrer eigenen Search Console und bei Bing; faire Tageslimits pro IP-Adresse ohne Registrierung in unseren Tools',
    },
    {
      id: 'eigene-daten',
      kryterium: 'Genauigkeit der Traffic-Zahlen für Ihre eigene Domain',
      ahrefs: 'Modellschätzung aus beobachteten Keyword-Positionen und durchschnittlichen Klickraten (eigene GSC-Anbindung in Ahrefs Webmaster Tools möglich)',
      semrush: 'Modellschätzung für organischen und bezahlten Traffic anhand der Keyword-Datenbank (optionale GSC- und GA4-Verknüpfung im Projekt)',
      darmowe: 'Echte Messdaten aus erster Hand in der Google Search Console: tatsächliche Klicks, Impressionen und Suchanfragen der letzten 16 Monate',
    },
    {
      id: 'backlinks',
      kryterium: 'Backlink-Datenbank und Wettbewerbsvergleich',
      ahrefs: 'Sehr schneller Link-Crawler (AhrefsBot), Verlauf neuer und verlorener verweisender Domains, Ankertext-Filter und Link-Intersect-Berichte',
      semrush: 'Umfangreiche Backlink Analytics und Backlink Audit mit Authority Score, Konkurrenzvergleich und integriertem Outreach-Modul',
      darmowe: `Eigene Links in GSC und Bing Webmaster Tools plus unser kostenloser Domain Authority Checker (Wert 0-100 aus dem Common-Crawl-Graphen über ${liczbaDe(AUTORYTET.domenWGrafie)} Domains für bis zu ${AUTORYTET.konkurentow} Wettbewerber)`,
    },
    {
      id: 'keywords',
      kryterium: 'Keyword-Recherche bei Wettbewerbern (Keyword Gap)',
      ahrefs: 'Keywords Explorer mit Klick-Schätzungen, linkbasierter Keyword Difficulty (KD) und sofortiger Liste aller rankenden Unterseiten eines Konkurrenten',
      semrush: 'Keyword Magic Tool mit Klassifizierung der Suchintention, Mehr-Domain-Keyword-Gap und historischen SERP-Daten ab Tarif Guru',
      darmowe: 'Search Console zeigt alle Begriffe, für die Ihre Seite bereits Impressionen erhält; der Google Keyword-Planer ergänzt Suchvolumen-Spannen und Klickpreise (ohne kompletten Fremd-Domain-Export)',
    },
    {
      id: 'technik-audit',
      kryterium: 'Technisches Website-Audit & Core Web Vitals',
      ahrefs: 'Cloud-basierter Site Audit (für verifizierte eigene Domains auch kostenfrei in Ahrefs Webmaster Tools im Rahmen der Crawl-Limits) inkl. JS-Rendering',
      semrush: 'Site Audit (bis 100.000 gecrawlte Seiten/Monat in Pro) für Indexierung, hreflang, Weiterleitungen und interne Verlinkung',
      darmowe: `Unser kostenloser SEO Audit prüft bis zu ${AUDYT.stron} Seiten nach ${AUDYT.regul} Regeln (1-100 Punkte), dazu 28-Tage-CrUX-Direktvergleich und Test für ${ROBOTY_AI.botow} KI-Bots`,
    },
    {
      id: 'sea-ppc',
      kryterium: 'Einblick in fremde Google-Ads-Kampagnen (SEA)',
      ahrefs: 'Grundlegende Übersicht bezahlter Keywords und Anzeigentexte im Site Explorer, Schwerpunkt liegt klar auf organischem SEO',
      semrush: 'Starke Disziplin: detaillierte Historie fremder Such- und Shopping-Anzeigen, geschätzte CPC-Budgets und Anzeigen-Wettbewerbsanalyse',
      darmowe: 'Das Google Ads Transparenzcenter zeigt aktive Anzeigen jedes Werbetreibenden kostenlos, jedoch ohne automatische Keyword-Tabellen',
    },
    {
      id: 'ki-sichtbarkeit',
      kryterium: 'Messung der KI-Sichtbarkeit (ChatGPT, Perplexity, AI Overviews)',
      ahrefs: 'Erfassung von AI Overviews in den Suchergebnissen sowie kostenpflichtige Zusatzmodule für Marken- und KI-Monitoring',
      semrush: 'Tracking von AI Overviews im Position Tracking sowie separat bepreiste KI-/GEO-Zusatzpakete',
      darmowe: `Leistungsbericht zu generativer KI in der Search Console plus unser kostenloser KI-Sichtbarkeit Check mit ${WIDOCZNOSC.pytan} echten Fragen in ${WIDOCZNOSC.silnikow} KI-Quellen`,
    },
    {
      id: 'zielgruppe',
      kryterium: 'Für wen rechnet sich die Anschaffung?',
      ahrefs: 'SEO-Agenturen, Linkaufbau- und Redaktionsteams, die wöchentlich fremde Linkprofile und Top-Seiten analysieren',
      semrush: 'Inhouse-Marketingteams, die SEO, tägliches lokales/nationales Keyword-Tracking und Google Ads in einer Oberfläche bündeln',
      darmowe: 'Kleine und mittlere B2B-Unternehmen mit einer eigenen Domain, die vorab sauber diagnostizieren oder ihr Budget lieber direkt in die Umsetzung stecken',
    },
  ],
  sections: [
    {
      id: 'direktvergleich',
      h2: 'Ahrefs vs Semrush vs kostenloses Tool-Set: 9 Kriterien im Überblick',
      html: [
        '<p>Transparenz- und Markenhinweis: Wir nutzen in unserer Agenturarbeit selbst kostenpflichtige SEO-Datenbanken und APIs, stellen aber gleichzeitig eigene kostenlose Diagnose-Tools bereit. Diese Seite enthält keine Affiliate-Links. Ahrefs und Semrush sind eingetragene Marken ihrer jeweiligen Inhaber; alle Tarifangaben beruhen auf den öffentlich einsehbaren Preislisten vom 22.11.2026.</p>',
        '<p>Viele Tool-Vergleiche übergehen die wichtigste kaufmännische Frage für den Mittelstand: Braucht ein Unternehmen mit einer einzigen Website überhaupt ein Software-Abo für 1.500 bis 3.000 USD im Jahr, wenn niemand im Team jede Woche Konkurrenz-Exporte auswertet?</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'warum-traffic-zahlen-abweichen',
      h2: 'Warum Ahrefs, Semrush und die Search Console völlig unterschiedliche Besucherzahlen zeigen',
      html: [
        '<p>Fast jedes B2B-Unternehmen erlebt denselben Widerspruch: Ahrefs meldet für die eigene Domain 180 organische Besuche pro Monat, Semrush schätzt 310, und in der Google Search Console stehen 940 tatsächliche Klicks. Der Grund liegt in der Messmethode:</p>',
        '<ul>',
        '<li><strong>Google Search Console (Echtdaten):</strong> zählt jede reale Einblendung und jeden Klick Ihrer verifizierten Website in der Google-Suche - inklusive tausender spezifischer Fach-, Seriennummern- und Ortsanfragen, die in keiner kommerziellen Keyword-Datenbank hinterlegt sind.</li>',
        '<li><strong>Ahrefs und Semrush (Hochrechnung):</strong> fragen einen festen Katalog bekannter Suchbegriffe ab, prüfen die Position Ihrer Domain und multiplizieren das geschätzte Suchvolumen mit einer typischen Klickrate. Gerade im technischen B2B unterschätzen externe Tools den wahren Suchverkehr regelmäßig deutlich.</li>',
        `<li><strong>Autoritäts-Kennzahlen:</strong> Weder der Domain Rating (Ahrefs) noch der Authority Score (Semrush) stammen von Google. Unser kostenloser ${wew('/narzedzia/autorytet-domeny', 'Domain Authority Checker')} berechnet ebenfalls einen eigenen Index von 0 bis 100 - transparent aus dem offenen Link-Graphen von Common Crawl und ohne Verwechslung mit Drittanbieter-Metriken.</li>`,
        '</ul>',
      ].join(''),
    },
    {
      id: 'wann-ahrefs-wann-semrush',
      h2: 'Ahrefs oder Semrush: Welches Bezahlt-Tool passt zu welchem Marketing-Team?',
      html: [
        '<p>Wenn in Ihrem Unternehmen tatsächlich jede Woche aktiv an Inhalten, Links oder Kampagnen gearbeitet wird, unterscheiden sich die beiden Marktführer vor allem in zwei Punkten:</p>',
        '<ul>',
        '<li><strong>Ahrefs spielt seine Stärke bei Linkprofilen und schnellen Seitenanalysen aus:</strong> Im Site Explorer sehen Sie mit wenigen Klicks, welche konkreten Unterseiten eines Mitbewerbers Traffic ziehen und welche Fachportale darauf verlinken. Achten Sie bei der Budgetplanung auf das Credit-Modell: Im Tarif <strong>Lite (129 USD/Monat)</strong> ist die Zahl der abrufbaren Berichte pro Monat begrenzt; unbegrenzte Fair-Use-Abfragen beginnen ab <strong>Standard (249 USD/Monat)</strong>.</li>',
        '<li><strong>Semrush punktet bei Google Ads und täglichem Tracking:</strong> Schon im Tarif <strong>Pro (139,95 USD/Monat)</strong> überwachen Sie täglich 500 Keywords inklusive lokaler Standorte und werten fremde Google-Such- und Shopping-Anzeigen aus. Historische Datenbestände kommen ab <strong>Guru (249,95 USD/Monat)</strong> hinzu.</li>',
        '<li><strong>Kostenlose Eigentümer-Option vor dem Kauf prüfen:</strong> Mit den kostenlosen <em>Ahrefs Webmaster Tools</em> können Sie Ihre eigene, per Search Console bestätigte Domain bereits ohne Monatsgebühr technisch crawlen und eigene Backlinks einsehen (ohne Wettbewerber-Abfragen).</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'budget-entscheidung-b2b',
      h2: 'Wirtschaftlichkeitsrechnung für KMU: Software-Lizenz oder direkte Umsetzung?',
      html: '<p>Ein Diagnose-Tool findet Fehler, behebt sie aber nicht. Bevor Sie ein Jahresabo abschließen, hilft diese Dreiteilung nach Unternehmenssituation:</p>',
      tabela: {
        id: 'tabelle-budget-seo-tools-de',
        caption: 'Welches SEO-Setup passt zu Ihrer internen Teamkapazität? (Stand November 2026)',
        columns: [
          { key: 'situation', label: 'Ausgangslage im Unternehmen' },
          { key: 'empfehlung', label: 'Sinnvolles Setup' },
          { key: 'kosten', label: 'Laufende Nettokosten' },
        ],
        rows: [
          {
            id: 'kmu-diagnose',
            situation: '1 Unternehmenswebsite, kein eigener SEO-Spezialist im Haus',
            empfehlung: 'Google Search Console + Bing Webmaster Tools + kostenlose AI-SEO-Prüftools',
            kosten: '0 € pro Monat',
          },
          {
            id: 'inhouse-team',
            situation: 'Eigenes Content- oder Performance-Team veröffentlicht laufend neue Seiten',
            empfehlung: 'Ahrefs Lite/Standard oder Semrush Pro/Guru ergänzend zur Search Console',
            kosten: 'ab ca. 129 bis 250 USD netto/Monat zzgl. interner Arbeitszeit',
          },
          {
            id: 'umsetzung-auslagern',
            situation: 'Sie wünschen fertige Seiten, Technik-Fixes, Links und KI-Monitoring ohne Einarbeitung',
            empfehlung: 'Monatlich kündbare Betreuung (z. B. unser Paket SEO Standard inkl. Kundenportal 24/7)',
            kosten: 'ab 450 € netto/Monat (Agentur-Tools und API-Abfragen bereits inklusive)',
          },
        ],
        przypis: 'Quellen: Preislisten von Ahrefs und Semrush (Stand 22.11.2026) sowie unsere veröffentlichten Paketpreise in Euro.',
        minWidth: 560,
      },
      htmlPo: `<p>Starten Sie ohne Risiko mit unserem ${wew('/narzedzia/audyt-seo', 'kostenlosen SEO Audit')} und dem ${wew('/sprawdz-widocznosc-w-ai', 'kostenlosen KI-Sichtbarkeit Check')} oder vergleichen Sie unsere Monatspakete unter ${wew('/cennik-pozycjonowania', 'SEO Kosten')}.</p>`,
    },
  ],
  faqTytul: 'Häufige Fragen zu Ahrefs, Semrush und kostenlosen SEO-Tools',
  faq: [
    {
      question: 'Kann ich meine Unternehmenswebsite auch ohne kostenpflichtiges Ahrefs- oder Semrush-Abo optimieren?',
      answer: 'Ja. Für die eigene Website liefern die Google Search Console (echte Suchanfragen, Klicks, Indexierung) und die Bing Webmaster Tools (kostenloser Backlink-Bericht und Technik-Scan) verlässliche Originaldaten. Ergänzt um unseren kostenlosen 49-Regeln-SEO-Audit decken Sie Technik, On-Page-Faktoren und KI-Bots ohne Lizenzkosten ab. Bezahl-Suiten werden erst nötig, wenn Sie systematisch Dutzende Wettbewerber durchleuchten wollen.',
    },
    {
      question: 'Was ist der Unterschied zwischen den kostenlosen Ahrefs Webmaster Tools und Ahrefs Lite?',
      answer: 'Die Ahrefs Webmaster Tools sind für verifizierte Inhaber einer eigenen Domain kostenlos und erlauben den technischen Site Audit sowie den Blick auf die eigenen Backlinks und rankenden Keywords. Sobald Sie jedoch fremde Wettbewerber-Domains analysieren oder im Keywords Explorer neue Themen recherchieren möchten, ist ein kostenpflichtiger Tarif erforderlich.',
    },
    {
      question: 'Worauf sollte man bei den Einstiegstarifen Ahrefs Starter (29 USD) und Lite (129 USD) achten?',
      answer: 'Beide Tarife enthalten standardmäßig einen Nutzerplatz und arbeiten mit einem monatlichen Credit-Kontingent für Berichte und Filterabfragen. Wer intensiv recherchiert, sollte zunächst einen einzelnen Monat buchen und prüfen, ob die enthaltenen Credits im Alltag ausreichen oder ob der Tarif Standard mit unbegrenzten Fair-Use-Berichten wirtschaftlicher ist.',
    },
    {
      question: 'Muss ich bei einer SEO-Betreuung durch AI SEO COMPANY eigene Tool-Lizenzen kaufen?',
      answer: 'Nein. In unseren Paketen (ab 450 € netto pro Monat in SEO Standard, monatlich kündbar) sind sämtliche Profi-Crawler, Keyword-Datenbanken und wöchentlichen KI-API-Messungen bereits enthalten. Ihre Google Search Console und Ihr GA4-Konto bleiben vollständig in Ihrem Eigentum, und alle Ergebnisse sehen Sie live im Kundenportal.',
    },
  ],
  sources: [
    { url: 'https://ahrefs.com/pricing', nazwa: 'Ahrefs Pricing: offizielle Übersicht der Tarife Starter, Lite, Standard und Advanced sowie Credit-Regeln, abgerufen am 22.11.2026' },
    { url: 'https://ahrefs.com/webmaster-tools', nazwa: 'Ahrefs Webmaster Tools: Funktionsumfang des kostenlosen Zugangs für verifizierte Domains, abgerufen am 22.11.2026' },
    { url: 'https://www.semrush.com/pricing/', nazwa: 'Semrush Pricing: offizielle Übersicht der Tarife Pro, Guru und Business, abgerufen am 22.11.2026' },
    { url: 'https://search.google.com/search-console/about', nazwa: 'Google Search Console: Leistungs- und Indexierungsdiagnose aus erster Hand, abgerufen am 22.11.2026' },
    { url: 'https://www.bing.com/webmasters/about', nazwa: 'Bing Webmaster Tools: kostenlose Backlink-Berichte, Site Scan und IndexNow, abgerufen am 22.11.2026' },
    { url: 'https://commoncrawl.org/web-graphs', nazwa: 'Common Crawl Web Graphs: öffentlicher Link-Graph als Datenbasis unseres kostenlosen Domain Authority Checkers, abgerufen am 22.11.2026' },
  ],
  cta: {
    tekst: 'Website zuerst kostenlos prüfen - oder Umsetzung im Monatsvertrag ab 450 € netto starten',
    plan: 'standard',
    linki: [
      { tekst: 'Kostenlosen SEO Audit starten (1 bis 100 Punkte)', href: '/narzedzia/audyt-seo' },
      { tekst: 'Domain-Autorität kostenlos über Common Crawl prüfen', href: '/narzedzia/autorytet-domeny' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Ahrefs' },
    { '@type': 'Thing', name: 'Semrush' },
    { '@type': 'Thing', name: 'Kostenlose SEO-Tools' },
  ],
};

export const POROWNANIA_SPRINT2_DE = [P13_SHOPIFY_WOO_DE, P14_AHREFS_SEMRUSH_DE];

export default POROWNANIA_SPRINT2_DE;
