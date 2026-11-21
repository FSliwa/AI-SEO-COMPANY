// Deutsche Tech-Stack- und CMS-Vergleiche (BOFU, Gruppe de-porownania, 21.11.2026):
//   - P10_NEXT_WP_DE:     /porownania/nextjs-vs-wordpress-seo       -> /de/vergleiche/nextjs-vs-wordpress-seo
//   - P11_WEBFLOW_WP_DE:  /porownania/webflow-vs-wordpress-seo      -> /de/vergleiche/webflow-vs-wordpress-seo
//   - P12_KOD_KREATOR_DE: /porownania/strona-kodowana-czy-kreator-seo -> /de/vergleiche/programmierte-website-oder-baukasten-seo
//
// Gleiche Datenstruktur wie P2_DE in lib/porownania.de.js (kompatibel mit components/de/VergleichDe.jsx 1:1).
// Defensiver Zugriff auf STRONY_DE mit Fallback-Metadaten; interne Links ausschliesslich ueber wew(klucz, tekst, kotwica).
// Keine langen Gedankenstriche (nur ASCII '-'), keine Nennung anderer SEO-Agenturen, mit Markenhinweis.

import { STRONY_DE, hrefDe } from './stronyDe';

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const wew = (klucz, tekst, kotwica = '') => {
  const h = hrefDe(klucz);
  return h ? a(`${h}${kotwica}`, tekst) : tekst;
};

function metaDe(klucz, zapas) {
  return STRONY_DE[klucz] || zapas;
}

// --- P10_NEXT_WP_DE: Next.js vs WordPress fuer SEO & KI ----------------------------------------

const W10 = metaDe('/porownania/nextjs-vs-wordpress-seo', {
  tytul: 'Next.js vs WordPress für SEO & KI: Vergleich 2026',
  h1: 'Next.js vs WordPress für SEO: Core Web Vitals, Sicherheit und Kosten',
  opis: 'Next.js oder WordPress für B2B-SEO? 9 Kriterien im Vergleich: Core Web Vitals, Plugin-Sicherheit, JSON-LD, KI-Crawler und Gesamtkosten über 24 Monate.',
});

export const P10_NEXT_WP_DE = {
  slug: 'nextjs-vs-wordpress-seo',
  title: W10.tytul,
  description: W10.opis,
  h1: W10.h1,
  okruszek: 'Next.js vs WordPress für SEO',
  nazwaKarty: 'Next.js vs WordPress für SEO',
  tag: 'Technologievergleich: Website & SEO',
  zrodlaDanych: 'Daten: web.dev / Google Search Central (Core Web Vitals), Patchstack State of WordPress Security, Next.js- und WordPress-Dokumentation sowie unsere Preisliste in Euro (Stand 21.11.2026).',
  answer: `Für B2B-Unternehmenswebsites mit Fokus auf Leadgenerierung, ${wew('/blog/core-web-vitals-a-pozycje-google', 'Core Web Vitals')} und Zitierbarkeit in KI-Antworten ist Next.js technisch im Vorteil: Seiten kommen ohne Plugin-Kette und ohne Datenbankabfrage pro Aufruf direkt als schnelles Server-HTML. WordPress bleibt sinnvoll, wenn ein Redaktionsteam täglich eigenständig komplexe Layouts baut oder spezielle Shop-Plugins benötigt.`,
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabelle-nextjs-vs-wordpress-9-kriterien',
  tableCaption: 'Next.js und WordPress für SEO im Vergleich: 9 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: Dokumentation von Next.js (nextjs.org) und WordPress (developer.wordpress.org), Google Search Central zu Core Web Vitals, Patchstack-Sicherheitsberichte sowie unsere Paketpreise (Stand 21.11.2026). Markennamen gehören ihren jeweiligen Inhabern.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'nextjs', label: 'Next.js (App Router / SSR & SSG)' },
    { key: 'wordpress', label: 'WordPress (PHP-CMS mit Plugins)' },
  ],
  rows: [
    {
      id: 'rendering',
      kryterium: 'HTML-Auslieferung und Antwortzeit (TTFB)',
      nextjs: 'Statisch vorerzeugtes HTML (SSG/ISR) oder Server-Side Rendering vom Edge-Netzwerk; keine Datenbankabfrage bei jedem Seitenaufruf nötig',
      wordpress: 'Baut Seiten ohne aktives Page-Caching bei jedem Aufruf per PHP und MySQL zusammen; niedrige TTFB erfordert sauberes Server- und Plugin-Caching',
    },
    {
      id: 'cwv',
      kryterium: 'Core Web Vitals mobil (LCP, INP, CLS)',
      nextjs: 'Automatische Bildkonvertierung (AVIF/WebP), Code-Splitting pro Route und Server Components halten JavaScript im Browser klein',
      wordpress: 'Stark abhängig von Theme und Page-Builder; visuelle Builder und 15 bis 30 aktive Plugins laden oft hunderte Kilobyte ungenutztes CSS und JS',
    },
    {
      id: 'sicherheit',
      kryterium: 'Sicherheit und Wartungsaufwand',
      nextjs: 'Kein öffentliches Login-Verzeichnis wie /wp-login.php, keine exponierte SQL-Datenbank und keine fremden SEO- oder Formular-Plugins',
      wordpress: 'Der Großteil bekannter Schwachstellen entsteht in Drittanbieter-Plugins und Themes; regelmäßige Updates, Backups und Firewall sind Pflicht',
    },
    {
      id: 'url-technik',
      kryterium: 'URL-Architektur, Sitemaps und Header',
      nextjs: 'Volle Kontrolle im Code über beliebige URL-Pfade, mehrsprachige Routen, XML-Sitemaps, 301/308-Weiterleitungen und HTTP-Header',
      wordpress: 'Gute Grundkontrolle per SEO-Plugin, aber Tag-, Autor- und Anhang-Archive erzeugen ohne Nacharbeit häufig unnötige Duplikate',
    },
    {
      id: 'json-ld',
      kryterium: 'Strukturierte Daten (Schema.org / JSON-LD)',
      nextjs: 'Beliebig verschachtelte JSON-LD-Graphen (Organization, Service, FAQPage, Article) direkt aus den Seitendaten ohne Zusatzlizenzen',
      wordpress: 'Standard-Schemas per Plugin schnell aktiv; individuelle B2B-Entitäten erfordern oft kostenpflichtige Pro-Versionen oder eigene PHP-Snippets',
    },
    {
      id: 'ki-crawler',
      kryterium: 'Lesbarkeit für KI-Crawler (GEO)',
      nextjs: 'Schlankes, semantisches Server-HTML; Bots wie OAI-SearchBot, PerplexityBot und ClaudeBot lesen Inhalte sofort ohne JS-Ausführung',
      wordpress: 'Grundsätzlich serverseitig lesbar, bei visuellen Page-Buildern jedoch oft tief in verschachtelten Container-Elementen und Shortcodes verpackt',
    },
    {
      id: 'dsgvo',
      kryterium: 'DSGVO & lokale Schriften im DACH-Raum',
      nextjs: 'Das Modul next/font lädt Webfonts beim Build herunter und liefert sie lokal von der eigenen Domain aus - ohne Aufruf externer Font-Server',
      wordpress: 'Themes, Slider- oder Formular-Plugins laden Schriften und Skripte häufig standardmäßig von Drittservern nach und müssen einzeln geprüft werden',
    },
    {
      id: 'redaktion',
      kryterium: 'Redaktionsalltag für Marketing-Teams',
      nextjs: 'Pflege über ein angebundenes Headless-CMS oder strukturierte Datendateien; Designsystem bleibt stabil, neue Seitentypen baut ein Entwickler',
      wordpress: 'Vertrauter Block-Editor (Gutenberg) und großes Ökosystem; Redakteure legen neue Unterseiten ohne Entwickler an',
    },
    {
      id: 'tco',
      kryterium: 'Gesamtkosten über 24 Monate (TCO)',
      nextjs: 'Einzelprojekt ab 1.400 € netto oder ohne separaten Einmalpreis im Booster Pack (590 € netto/Monat, mind. 3 Monate inkl. SEO); kaum Wartungskosten',
      wordpress: 'Günstiger Start mit Fertig-Theme möglich, aber laufende Kosten für Managed Hosting, Pro-Plugins, Sicherheits-Updates und Speed-Optimierung',
    },
  ],
  sections: [
    {
      id: 'vergleich-9-kriterien',
      h2: 'Next.js vs WordPress für SEO: 9 Kriterien im Direktvergleich',
      html: [
        '<p>Transparenz- und Markenhinweis: Wir entwickeln Unternehmenswebsites in Next.js und betreuen im laufenden SEO ebenso bestehende WordPress-Seiten unserer Kunden. Markennamen gehören ihren jeweiligen Inhabern (Next.js ist eine Marke von Vercel Inc., WordPress eine Marke der WordPress Foundation).</p>',
        '<p>WordPress kann mit einem schlanken Individual-Theme und sauberem Server-Caching sehr gut ranken. In der B2B-Praxis vergleichen Unternehmen jedoch selten ein handprogrammiertes PHP-Theme, sondern eine gewachsene WordPress-Installation aus Kauf-Theme, Page-Builder und 20 Plugins mit einer modernen Next.js-Architektur. Genau diesen Praxisunterschied zeigt die Tabelle.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'core-web-vitals-und-ki-bots',
      h2: 'Warum Server-HTML über Core Web Vitals und KI-Zitate entscheidet',
      html: [
        `<p>Google bewertet die ${wew('/blog/core-web-vitals-a-pozycje-google', 'Core Web Vitals im 75. Perzentil echter Nutzerdaten')}: Largest Contentful Paint (LCP) bis 2,5 Sekunden, Interaction to Next Paint (INP) bis 200 Millisekunden und Cumulative Layout Shift (CLS) bis 0,1. Auf einer klassischen WordPress-Seite mit visuellem Builder konkurrieren Slider-Skripte, Formular-Plugins, Consent-Banner und Tracking-Tags im Hauptthread des Smartphones - genau dort kippt der INP-Wert bei echten Besuchern häufig über die 200-ms-Schwelle.</p>`,
        '<p>Next.js mit dem App Router verlagert Komponenten standardmäßig auf den Server (React Server Components). Der Browser lädt nur das JavaScript, das für interaktive Elemente wie Menüs, Rechner oder Formulare tatsächlich gebraucht wird. Bilder werden automatisch in moderne Formate (AVIF, WebP) umgerechnet und in passender Auflösung ausgeliefert.</p>',
        `<p>Derselbe Architekturvorteil zahlt direkt auf ${wew('/pozycjonowanie-w-ai', 'Generative Engine Optimization (GEO)')} ein: Die wichtigsten KI-Suchcrawler (etwa OAI-SearchBot von OpenAI, PerplexityBot oder ClaudeBot) rufen das rohe HTML ab und führen kein schweres Client-JavaScript aus. Je klarer Überschriften, Tabellen und Antwortabsätze direkt im Server-HTML stehen, desto zuverlässiger lassen sich Fakten extrahieren und zitieren.</p>`,
      ].join(''),
    },
    {
      id: 'sicherheit-plugins-und-dsgvo',
      h2: 'Plugin-Abhängigkeit, Sicherheit und DSGVO-Anforderungen im DACH-Raum',
      html: [
        '<p>WordPress selbst ist ein ausgereifter Open-Source-Kern. Das Risiko im Unternehmensalltag entsteht in der Lieferkette rundherum: Laut den jährlichen Sicherheitsauswertungen von Patchstack gehen weit über 90 % der neu gemeldeten Schwachstellen im WordPress-Ökosystem auf Plugins und Themes von Drittanbietern zurück, nicht auf den WordPress-Core. Fällt ein Wartungsfenster im Urlaub aus oder verträgt sich ein PHP-Update nicht mit einem älteren Formular-Plugin, drohen Ausfälle oder kompromittierte Seiten (SEO-Spam-Injektionen mit tausenden fremden URLs im Google-Index).</p>',
        '<p>Im deutschsprachigen Raum kommt der Datenschutz hinzu:</p>',
        '<ul>',
        '<li><strong>Lokale Schriftarten ohne Drittserver:</strong> Seit dem bekannten Urteil des LG München I zu extern nachgeladenen Google Fonts achten Unternehmen in Deutschland, Österreich und der Schweiz penibel auf lokales Font-Hosting. In Next.js lädt <code>next/font</code> die Schriftdateien bereits zur Build-Zeit herunter und liefert sie von der eigenen Domain aus. Bei WordPress bringen viele Themes, ReCaptcha-Einbindungen oder Design-Plugins eigene externe Aufrufe mit, die einzeln abgeschaltet werden müssen.</li>',
        '<li><strong>Barrierefreiheit (WCAG 2.2 AA / BFSG):</strong> Seit Juni 2025 gilt in Deutschland das Barrierefreiheitsstärkungsgesetz für viele digitale Angebote im Verbraucherverkehr und strahlt zunehmend auf B2B-Ausschreibungen aus. In eigenem JSX-Code steuern Sie Tastaturfokus, Kontraste und ARIA-Attribute ohne Vorgaben fremder Plugin-Widgets.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'gesamtkosten-24-monate',
      h2: 'Gesamtkosten über 24 Monate (TCO): Anschaffung, Pflege und Booster Pack',
      html: [
        '<p>Auf den ersten Blick wirkt WordPress günstiger, weil die Software selbst unter GPL-Lizenz kostenlos ist. Über 24 Monate entscheiden bei einer geschäftskritischen B2B-Website mit 15 bis 25 Unterseiten jedoch die laufenden Betriebskosten, Lizenzverlängerungen und Entwicklerstunden für Updates und Ladezeit-Korrekturen.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-tco-nextjs-wordpress',
        caption: 'Orientierende Gesamtkosten (TCO) einer B2B-Website über 24 Monate in Euro netto (Modellrechnung)',
        columns: [
          { key: 'posten', label: 'Kostenblock (netto)' },
          { key: 'wp', label: 'WordPress (Page-Builder-Setup)' },
          { key: 'nextEinzeln', label: 'Next.js bei uns (Einzelkauf)' },
          { key: 'booster', label: 'Booster Pack bei uns (Website + SEO)' },
        ],
        rows: [
          {
            id: 'erstellung',
            posten: 'Konzeption, Design und Umsetzung',
            wp: 'Agentur- oder Freelancer-Projekt (oft 1.500 € bis 5.000 € je nach Umfang)',
            nextEinzeln: 'ab 1.400 € einmalig',
            booster: '0 € separater Einmalpreis (im Paketpreis ab 590 €/Monat enthalten, mind. 3 Monate)',
          },
          {
            id: 'lizenzen',
            posten: 'Premium-Plugins (Builder, SEO-Pro, Caching, Mehrsprachigkeit, Backup)',
            wp: 'ca. 25 € bis 80 € pro Monat (Jahreslizenzen umgerechnet)',
            nextEinzeln: '0 € für SEO-, Schema- oder Caching-Plugins',
            booster: '0 € Zusatzlizenzen',
          },
          {
            id: 'wartung',
            posten: 'Managed Hosting, SSL und technische Sicherheits-Updates',
            wp: 'ca. 40 € bis 150 € pro Monat (Hosting + Wartungsvertrag)',
            nextEinzeln: 'schlankes Hosting, keine wöchentlichen Plugin-Patches nötig',
            booster: 'Hosting, SSL und technische Betreuung während der Laufzeit inklusive',
          },
          {
            id: 'seo',
            posten: 'Laufendes SEO (Audit, Content, Links, Google Unternehmensprofil)',
            wp: 'separates SEO-Budget erforderlich',
            nextEinzeln: 'optional kombinierbar (z. B. SEO Standard ab 450 €/Monat)',
            booster: 'vollständige SEO-Betreuung ab Tag 1 enthalten (590 €/Monat, mind. 3 Monate = 1.770 € Mindestsumme)',
          },
        ],
        przypis: 'Modellrechnung zur Einordnung typischer Kostenblöcke (Stand November 2026, alle Beträge netto zzgl. gesetzlicher USt.). Die WordPress-Spannen sind marktübliche Orientierungswerte im DACH-Raum ohne konkrete Fremdagentur; unsere Preise stammen aus unserer veröffentlichten Preisliste.',
        minWidth: 640,
      },
      htmlPo: `<p>Alle Details zu Leistungen, Laufzeiten und Kündigungsregeln finden Sie transparent unter ${wew('/cennik-pozycjonowania', 'SEO Kosten und Pakete in Euro')}.</p>`,
    },
    {
      id: 'wann-wordpress-wann-nextjs',
      h2: 'Wann bleibt WordPress die richtige Wahl - und wann gewinnt Next.js?',
      html: [
        '<p>Kein System ist für jedes Unternehmen pauschal besser. Entscheiden Sie nach Ihrem Arbeitsalltag:</p>',
        '<ul>',
        '<li><strong>WordPress passt besser, wenn</strong> Ihr internes Marketing-Team mehrmals pro Woche eigene Aktionsseiten per Drag-and-Drop zusammenstellt, Sie ein großes Online-Magazin mit Dutzenden Gastautoren betreiben oder auf ein bestehendes WooCommerce-Ökosystem mit spezifischen Zahlungs- und Versand-Plugins angewiesen sind.</li>',
        '<li><strong>Next.js passt besser, wenn</strong> Ihre Website als verlässlicher B2B-Vertriebskanal Anfragen gewinnen soll, Sie mehrsprachig im DACH-Raum und international auftreten, Wert auf dauerhaft grüne Core Web Vitals ohne Plugin-Pflege legen oder interaktive Tools und Rechner direkt in die Seite integrieren möchten.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'migration-ohne-rankingverlust',
      h2: 'Sicherer Wechsel von WordPress zu Next.js ohne Rankingverlust',
      html: [
        '<p>Viele Unternehmen scheuen den Technologiewechsel aus Sorge um bestehende Google-Positionen. Ein Rankingverlust entsteht bei einem Relaunch fast nie durch das neue Framework, sondern durch geänderte URLs ohne Weiterleitung oder vergessene Inhalte. So sichern wir Migrationen ab:</p>',
        '<ol>',
        '<li>Vollständiger Crawl aller bestehenden WordPress-URLs und Abgleich mit den Klick- und Impressionsdaten der letzten 16 Monate aus Ihrer Google Search Console.</li>',
        `<li>Übernahme bewährter URL-Pfade 1:1 in den Next.js App Router oder lückenlose 301/308-Weiterleitungsmatrix inklusive sauberer ${wew('/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', 'Canonical Tags')}.</li>`,
        `<li>Übertragung und Ausbau aller Meta-Daten, Überschriftenhierarchien und ${wew('/narzedzia/dane-strukturalne-json-ld', 'JSON-LD Schema-Markups')} vor dem Livegang.</li>`,
        '<li>Prüfung von Sitemap, robots.txt und Indexierungsstatus unmittelbar nach der DNS-Umstellung.</li>',
        '</ol>',
        `<p>Wenn Sie unsicher sind, ob sich bei Ihrer heutigen WordPress-Seite eine Optimierung im Bestand oder ein Neubau rechnet, testen Sie Ihre Domain vorab in unserem ${wew('/narzedzia/audyt-seo', 'kostenlosen SEO Audit')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Next.js vs WordPress für SEO',
  faq: [
    {
      question: 'Rankt eine Next.js-Website automatisch höher bei Google als WordPress?',
      answer: 'Nein, Google vergibt keinen Bonus allein für ein bestimmtes Framework. Next.js macht es jedoch deutlich einfacher, technische Ranking-Bremsen zu vermeiden: schnelle Server-Antwortzeiten, stabile Core Web Vitals auf Mobilgeräten, saubere Canonical- und hreflang-Tags sowie valides Server-HTML ohne Plugin-Ballast.',
    },
    {
      question: 'Kann unser Marketing-Team auf einer Next.js-Website Texte selbst ändern?',
      answer: 'Ja. Bei Bedarf binden wir ein übersichtliches Headless-CMS an, in dem Ihr Team Texte, Blogartikel, Bilder, FAQs und Meta-Daten im Browser pflegt, ohne das Layout versehentlich zu verschieben. Im laufenden SEO-Paket übernehmen wir die Inhaltspflege und Veröffentlichung auf Wunsch komplett für Sie.',
    },
    {
      question: 'Ist JavaScript bei Next.js nicht schlecht für den Googlebot und KI-Crawler?',
      answer: 'Das gilt nur für reine Single-Page-Applications (Client-Side Rendering), die ein leeres HTML-Gerüst ausliefern. Next.js erzeugt mit Static Site Generation (SSG) und Server-Side Rendering (SSR) fertiges HTML direkt auf dem Server - Googlebot, Bingbot, OAI-SearchBot und PerplexityBot lesen den gesamten Seiteninhalt sofort beim ersten Abruf.',
    },
    {
      question: 'Was kostet eine Next.js-Website im Vergleich zu WordPress bei Ihnen?',
      answer: `Als Einzelprojekt startet eine Unternehmenswebsite auf Basis von Next.js bei uns ab 1.400 € netto. Im Booster Pack (590 € netto pro Monat bei mindestens 3 Monaten Laufzeit) ist die Erstellung der neuen Next.js-Website ohne separaten Einmalpreis direkt zusammen mit Hosting, SSL und vollständiger SEO-Betreuung enthalten. Details stehen unter ${wew('/cennik-pozycjonowania', 'SEO Kosten')}.`,
    },
    {
      question: 'Verlieren wir beim Umzug von WordPress auf Next.js unsere bisherigen Rankings?',
      answer: 'Nicht bei einer strukturierten SEO-Migration. Wenn bestehende URL-Pfade mit Suchverkehr beibehalten oder per permanenter 301/308-Weiterleitung sauber zugeordnet werden und Inhalte sowie interne Links erhalten bleiben, übernimmt Google die Signale. Häufig steigen Klickraten und gecrawlte Seiten nach dem Wechsel durch die kürzeren Ladezeiten sogar an.',
    },
    {
      question: 'Betreuen Sie im SEO auch bestehende WordPress-Websites, wenn wir nicht wechseln möchten?',
      answer: `Ja. Wenn Ihre WordPress-Website technisch tragfähig ist, optimieren wir sie in unseren regulären Paketen SEO Standard (ab 450 € netto/Monat) und SEO Premium (590 € netto/Monat) weiter, statt Ihnen unnötig einen Relaunch zu verkaufen. Den Ausgangszustand klärt unser ${wew('/audyt-seo', 'SEO Audit')}.`,
    },
  ],
  sources: [
    { url: 'https://nextjs.org/docs/app/building-your-application/optimizing/fonts', nazwa: 'Next.js Documentation: Font Optimization (lokales Selbst-Hosting von Schriften ohne externe Browser-Anfragen), abgerufen am 21.11.2026' },
    { url: 'https://developer.wordpress.org/advanced-administration/performance/optimization/', nazwa: 'WordPress Developer Resources: Optimization & Caching, abgerufen am 21.11.2026' },
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals und Seitenerfahrung in der Google-Suche, abgerufen am 21.11.2026' },
    { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security Report (Verteilung gemeldeter Schwachstellen auf Plugins, Themes und Core), abgerufen am 21.11.2026' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: Overview of OpenAI Crawlers (OAI-SearchBot), abgerufen am 21.11.2026' },
  ],
  cta: {
    tekst: 'Neue Next.js-Website ohne Einmalpreis im Booster Pack anfragen (590 € netto/Monat)',
    plan: 'booster',
    linki: [
      { tekst: 'SEO Kosten und Booster Pack vergleichen', href: '/cennik-pozycjonowania' },
      { tekst: 'Aktuelle Website im kostenlosen SEO Audit testen', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Next.js SEO' },
    { '@type': 'Thing', name: 'WordPress SEO' },
  ],
};

// --- P11_WEBFLOW_WP_DE: Webflow vs WordPress fuer SEO ------------------------------------------

const W11 = metaDe('/porownania/webflow-vs-wordpress-seo', {
  tytul: 'Webflow vs WordPress für SEO: Grenzen, Tempo & Kosten',
  h1: 'Webflow vs WordPress im SEO-Vergleich: URL-Struktur, hreflang und TCO',
  opis: 'Webflow oder WordPress für SEO? Vergleich von URL-Pfaden, CMS-Limits, mehrsprachigem hreflang, Ladezeiten, DSGVO-Schriften und 24-Monats-Kosten.',
});

export const P11_WEBFLOW_WP_DE = {
  slug: 'webflow-vs-wordpress-seo',
  title: W11.tytul,
  description: W11.opis,
  h1: W11.h1,
  okruszek: 'Webflow vs WordPress für SEO',
  nazwaKarty: 'Webflow vs WordPress für SEO',
  tag: 'CMS-Vergleich: Architektur & SEO-Grenzen',
  zrodlaDanych: 'Daten: offizielle Webflow-Dokumentation (CMS-Limits, Localization, Code-Export), WordPress Developer Resources, Google Search Central sowie unsere Preisliste in Euro (Stand 21.11.2026).',
  answer: 'Webflow liefert ohne Plugin-Pflege sauberes HTML und starkes CDN-Hosting, stößt aber bei dynamischen URL-Pfaden, CMS-Element-Obergrenzen und kostenpflichtigen Sprach-Add-ons an klare Plattformgrenzen. WordPress bietet volle URL- und Datenbankfreiheit auf EU-Servern, verlangt dafür laufende Sicherheits- und Performance-Wartung. Als dritte Option ohne beide Kompromisse bauen wir B2B-Seiten in Next.js.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabelle-webflow-vs-wordpress-9-kriterien',
  tableCaption: 'Webflow und WordPress im SEO-Vergleich: 9 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: Webflow University & Pricing/Limits Documentation (webflow.com), WordPress.org Dokumentation, Google Search Central (hreflang & Core Web Vitals), Stand 21.11.2026. Markennamen gehören ihren jeweiligen Inhabern.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'webflow', label: 'Webflow (geschlossenes SaaS-CMS)' },
    { key: 'wordpress', label: 'WordPress (Open Source, eigenes Hosting)' },
  ],
  rows: [
    {
      id: 'url-pfade',
      kryterium: 'URL-Struktur und Ordnerfreiheit',
      webflow: 'Statische Seiten flexibel; dynamische CMS-Einträge liegen zwingend unter einem festen Collection-Ordner (/sammlung/eintrag) ohne freie Verschachtelung',
      wordpress: 'Permalinks, Custom Post Types und verschachtelte Kategorien nahezu frei gestaltbar; volle Kontrolle über flache oder mehrstufige URL-Bäume',
    },
    {
      id: 'cms-limits',
      kryterium: 'CMS-Skalierung und Element-Limits',
      webflow: 'Tarifabhängige Obergrenzen im Standard- und Business-CMS (z. B. 2.000 bzw. 10.000 CMS-Items vor Enterprise-Tarifen) sowie Limits für Referenzfelder',
      wordpress: 'Keine lizenzseitige Obergrenze für Beiträge, Landingpages oder Glossareinträge; Skalierung hängt allein von Datenbank und Hosting ab',
    },
    {
      id: 'hreflang',
      kryterium: 'Mehrsprachigkeit und hreflang (DE/AT/CH & EN)',
      webflow: 'Saubere Integration über Webflow Localization, jedoch als kostenpflichtiges Add-on pro zusätzlicher Sprache/Region auf die laufende Monatsrechnung',
      wordpress: 'Über etablierte Plugins wie WPML oder Polylang flexibel für beliebig viele Sprachen und Länder-Varianten zu fixen Jahreslizenzkosten lösbar',
    },
    {
      id: 'ladezeit',
      kryterium: 'Core Web Vitals (LCP, INP, CLS)',
      webflow: 'Schnelles globales CDN und schlankerer HTML-Output als typische WordPress-Page-Builder; aufwendige Animationen (Interactions) können INP mobil belasten',
      wordpress: 'Mit leichtgewichtigem Theme sehr schnell, mit schweren Drag-and-Drop-Buildern und vielen Plugins oft deutlich langsamer ohne Nachoptimierung',
    },
    {
      id: 'wartung',
      kryterium: 'Sicherheit und technischer Pflegeaufwand',
      webflow: 'Plattform übernimmt Hosting, SSL und System-Updates zentral; kein Plugin-Konfliktrisiko bei Sicherheits-Patches',
      wordpress: 'Verantwortung für Core-, Theme- und Plugin-Updates, Backups und WAF liegt beim Betreiber oder der betreuenden Agentur',
    },
    {
      id: 'dsgvo-server',
      kryterium: 'DSGVO, Serverstandort und lokale Schriften',
      webflow: 'US-Anbieter mit globalem CDN (Auftragsverarbeitung/DPF prüfen); Google Fonts im Designer unbedingt durch lokal hochgeladene WOFF2-Dateien ersetzen',
      wordpress: 'Freie Wahl eines deutschen oder europäischen Hosters; externe Schrift- und Skriptaufrufe von Plugins müssen manuell kontrolliert werden',
    },
    {
      id: 'schema-geo',
      kryterium: 'JSON-LD Schema & KI-Sichtbarkeit (GEO)',
      webflow: 'Sauberes HTML für KI-Bots; JSON-LD wird als benutzerdefinierter Code-Block pro Seitenvorlage mit CMS-Feldern verknüpft',
      wordpress: 'Basis-JSON-LD per SEO-Plugin sofort aktiv, erweiterte Schema-Graphen per Pro-Plugin oder eigenem Template-Code',
    },
    {
      id: 'portabilitaet',
      kryterium: 'Code-Eigentum und Plattform-Abhängigkeit',
      webflow: 'Hoher Lock-in: Code-Export umfasst nur statisches HTML/CSS/JS - CMS-Sammlungen, Localization und Formulare lassen sich nicht als funktionierendes System umziehen',
      wordpress: 'Kein Plattform-Lock-in: Kompletter PHP-Code, Medien und MySQL-Datenbank gehören Ihnen und ziehen jederzeit auf einen anderen Server um',
    },
    {
      id: 'kosten-24m',
      kryterium: 'Kostenstruktur über 24 Monate',
      webflow: 'Planbare Grundgebühr, steigt aber spürbar durch Sitzlizenzen (Workspace), CMS-Stufen und Localization-Aufpreise je Sprache',
      wordpress: 'Niedrige Lizenzbasis, dafür laufendes Budget für gutes Managed Hosting, Premium-Plugins und technische Wartung einplanen',
    },
  ],
  sections: [
    {
      id: 'vergleich-9-kriterien',
      h2: 'Webflow vs WordPress für SEO: Die 9 wichtigsten Unterschiede',
      html: [
        '<p>Marken- und Transparenzhinweis: Markennamen gehören ihren jeweiligen Inhabern (Webflow ist eine Marke von Webflow, Inc.; WordPress ist eine Marke der WordPress Foundation; Next.js ist eine Marke von Vercel Inc.). Wir betreuen Unternehmen im SEO auf bestehenden Webflow- und WordPress-Websites und entwickeln neue B2B-Seiten in Next.js.</p>',
        '<p>Design-Agenturen empfehlen häufig Webflow, weil Layouts visuell präzise entstehen und Plugin-Updates entfallen. SEO-Verantwortliche bevorzugen oft WordPress, weil URL-Hierarchien, große Content-Hubs und Server-Logfiles frei zugänglich sind. Die Tabelle zeigt, wo beide Systeme im Wachstumsbetrieb an Grenzen stoßen.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'url-struktur-und-cms-limits',
      h2: 'URL-Pfade und CMS-Obergrenzen: Wo Webflow SEO-Architekturen einschränkt',
      html: [
        '<p>Bei einer kleinen Unternehmenswebsite mit zehn statischen Seiten fällt der Unterschied kaum auf. Sobald Sie jedoch systematisch organischen Suchverkehr über Leistungscluster, Branchenlösungen, Standorte oder Vergleichsseiten aufbauen, greifen in Webflow feste Architekturregeln:</p>',
        '<ul>',
        '<li><strong>Erzwungene Ordnerpräfixe im CMS:</strong> Jede Webflow-Collection erzeugt einen starren Pfad wie <code>/leistungen/b2b-seo</code> oder <code>/standorte/muenchen</code>. Tiefe mehrstufige Themenbäume (etwa <code>/branchen/maschinenbau/seo-audit</code>) aus dynamischen Sammlungen oder flache Root-URLs lassen sich ohne Reverse-Proxy vor Webflow nicht frei abbilden.</li>',
        '<li><strong>CMS-Item-Decke:</strong> Während WordPress problemlos 25.000 Fachbegriffe, Produktblätter oder regionale Unterseiten in einer MySQL-Datenbank verwaltet, greifen in regulären Webflow-Tarifen feste Item-Limits (2.000 im CMS-Tarif, 10.000 im Business-Tarif), bevor kostspielige Enterprise-Verträge nötig werden.</li>',
        '<li><strong>Weiterleitungen und Header:</strong> 301-Weiterleitungen lassen sich in Webflow bequem hinterlegen, spezielle Serverregeln oder granulare Logfile-Analysen für große Crawl-Budgets sind auf einem eigenen WordPress-Server (oder in Next.js) jedoch deutlich flexibler.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'hreflang-und-dsgvo-dach',
      h2: 'Mehrsprachigkeit (hreflang) und DSGVO im DACH-Raum',
      html: [
        '<p>Gerade im DACH-Raum betreiben viele Mittelständler ihre Website parallel auf Deutsch und Englisch oder trennen Inhalte für Deutschland (<code>de-DE</code>), Österreich (<code>de-AT</code>) und die Schweiz (<code>de-CH</code>), etwa wegen abweichender Währungen (EUR vs. CHF) oder Referenzen.</p>',
        '<p>In Webflow löst das Modul Localization die Generierung von <code>hreflang</code>-Verweisen und übersetzten URL-Slugs sauber, kostet aber pro Sprache monatlich extra. Bei drei oder vier Zielmärkten übersteigen allein die laufenden Plattform- und Sprachgebühren über zwei Jahre oft die Kosten eines individuell programmierten Systems. In WordPress zahlen Sie für WPML oder Polylang eine überschaubare Jahreslizenz unabhängig von der Seitenanzahl, müssen aber auf die Datenbank-Performance achten.</p>',
        '<p>Für die DSGVO-Prüfung im DACH-Raum gilt bei Webflow: Laden Sie sämtliche Hausschriften als lokale <code>.woff2</code>-Dateien in die Projekteinstellungen hoch und deaktivieren Sie Google-Fonts-Integrationen im Designer, damit beim Seitenaufruf keine Besucher-IPs an US-Font-Server fließen.</p>',
      ].join(''),
    },
    {
      id: 'dritte-option-nextjs-tco',
      h2: 'Der dritte Weg für B2B: Webflow, WordPress und Next.js im 24-Monats-Vergleich',
      html: [
        '<p>Viele Unternehmen wechseln von WordPress zu Webflow, weil sie keine defekten Plugins mehr pflegen wollen - und stellen ein Jahr später fest, dass sie nun in einem geschlossenen SaaS-Vertrag mit Sprach-Aufpreisen und ohne exportierbares CMS stecken. Eine individuell in Next.js gebaute Website verbindet die Wartungsruhe von Webflow mit der vollen URL-, Sprach- und Eigentumsfreiheit von Open Source.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-drei-systeme-b2b',
        caption: 'Entscheidungsmatrix nach 24 Monaten: Webflow vs. WordPress vs. Next.js (Booster Pack)',
        columns: [
          { key: 'merkmal', label: 'Merkmal' },
          { key: 'webflow', label: 'Webflow' },
          { key: 'wordpress', label: 'WordPress' },
          { key: 'nextjs', label: 'Next.js im Booster Pack (AI SEO COMPANY)' },
        ],
        rows: [
          { merkmal: 'Laufender Update-Stress durch Plugins', webflow: 'Nein', wordpress: 'Ja, laufend einplanen', nextjs: 'Nein (keine Drittanbieter-Plugins)' },
          { merkmal: 'Freie URL-Hierarchie ohne Zwangsordner', webflow: 'Nur bei statischen Seiten', wordpress: 'Ja', nextjs: 'Ja, vollständig frei im App Router' },
          { merkmal: 'Zusatzlizenz pro Sprache (hreflang)', webflow: 'Ja, monatliches Add-on je Sprache', wordpress: 'Einmalige/jährliche Plugin-Lizenz', nextjs: '0 € Lizenzaufpreis für mehrsprachiges Routing' },
          { merkmal: 'Voller Export inklusive dynamischer Inhalte', webflow: 'Nein (nur statischer Code-Export)', wordpress: 'Ja (Code + Datenbank)', nextjs: 'Ja (vollständiger Quellcode gehört Ihnen)' },
          { merkmal: 'Einstiegspreis inkl. SEO-Umsetzung', webflow: 'Erstellung + SaaS-Abo + separates SEO', wordpress: 'Erstellung + Hosting/Wartung + separates SEO', nextjs: '590 € netto/Monat (mind. 3 Monate inkl. Website, Hosting & SEO)' },
        ],
        przypis: 'Eigene Gegenüberstellung für B2B-Unternehmensseiten (Stand 21.11.2026). Details zu unserem Booster Pack und Einzelpreisen ab 1.400 € netto unter /de/seo-kosten.',
        minWidth: 640,
      },
      htmlPo: `<p>Einen tiefen technischen Vergleich zwischen klassischem PHP-CMS und moderner React-Architektur lesen Sie ergänzend unter ${wew('/porownania/nextjs-vs-wordpress-seo', 'Next.js vs WordPress für SEO')}.</p>`,
    },
    {
      id: 'entscheidungshilfe',
      h2: 'Wann sollten Sie Webflow wählen, wann WordPress - und wann wechseln?',
      html: [
        '<ul>',
        '<li><strong>Wählen Sie Webflow, wenn</strong> Ihr Design-Team in Webflow zu Hause ist, die Website einsprachig bleibt, unter 2.000 CMS-Einträgen liegt und Marketing-Kampagnenseiten schnell visuell gebaut werden sollen.</li>',
        '<li><strong>Wählen Sie WordPress, wenn</strong> Sie ein großes Redaktionsportal auf eigenem Server in Deutschland oder der Schweiz betreiben wollen und ein verlässliches Technik-Team für Updates und Caching haben.</li>',
        `<li><strong>Prüfen Sie unser Booster Pack (Next.js + SEO), wenn</strong> Sie weder Plugin-Wartung noch monatliche SaaS-Sprachzuschläge zahlen möchten und von Anfang an eine schnelle, KI-zitierfähige Website inklusive laufender ${wew('/pozycjonowanie-stron-internetowych', 'B2B-SEO-Betreuung')} suchen.</li>`,
        '</ul>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu Webflow und WordPress für SEO',
  faq: [
    {
      question: 'Ist Webflow für SEO besser als WordPress?',
      answer: 'Ab Werk liefert Webflow oft saubereren Code und schnellere Ladezeiten als eine mit Page-Builder und vielen Plugins überladene WordPress-Seite. Sobald Sie jedoch tausende Unterseiten, komplett freie URL-Pfade ohne Sammlungs-Präfix oder viele Sprachversionen ohne monatlichen Aufpreis brauchen, ist WordPress (oder Next.js) architektonisch flexibler.',
    },
    {
      question: 'Kann ich meine Webflow-Website später einfach auf einen eigenen Server umziehen?',
      answer: 'Nur eingeschränkt. Webflow erlaubt in entsprechenden Workspace-Tarifen zwar den Export von statischem HTML, CSS und JavaScript, doch das gesamte CMS, die Mehrsprachigkeit (Localization) und die Formularlogik lassen sich nicht als dynamisches System exportieren. Ein späterer Ausstieg bedeutet praktisch einen Neuaufbau des Backends.',
    },
    {
      question: 'Ist Webflow im DACH-Raum DSGVO-konform nutzbar?',
      answer: 'Viele Unternehmen im DACH-Raum setzen Webflow mit abgeschlossenem Auftragsverarbeitungsvertrag (DPA), lokal hochgeladenen Schriftdateien (statt externer Google Fonts) und vorgeschaltetem Consent-Management ein. Da Webflow jedoch US-Infrastruktur und globale CDNs nutzt, sollten Datenschutzbeauftragte die aktuelle Rechtsgrundlage vorab prüfen.',
    },
    {
      question: 'Warum wird mehrsprachiges SEO in Webflow schnell teuer?',
      answer: 'Weil Webflow für das offizielle Localization-Modul mit automatischen hreflang-Tags und übersetzten URL-Pfaden pro zusätzlicher Sprache einen laufenden Monatszuschlag zusätzlich zum regulären Site-Tarif berechnet. Bei Projekten mit Deutsch, Englisch, Französisch und Polnisch summieren sich diese Fixkosten dauerhaft.',
    },
    {
      question: 'Wie funktioniert Ihr Booster Pack als Alternative zu Webflow und WordPress?',
      answer: `Im Booster Pack (590 € netto pro Monat, Mindestlaufzeit 3 Monate) erstellen wir für Sie eine maßgeschneiderte Website in Next.js ohne separaten Einmalpreis und übernehmen gleichzeitig die komplette SEO-Betreuung inklusive Hosting und SSL. Alle Konditionen stehen auf unserer Seite ${wew('/cennik-pozycjonowania', 'SEO Kosten')}.`,
    },
  ],
  sources: [
    { url: 'https://help.webflow.com/hc/en-us/articles/33961326090899-Code-export', nazwa: 'Webflow Help Center: Code export and limitations (kein Export dynamischer CMS- und Localization-Funktionen), abgerufen am 21.11.2026' },
    { url: 'https://webflow.com/pricing', nazwa: 'Webflow: Site Plans, CMS Item Limits & Localization Add-on Pricing, abgerufen am 21.11.2026' },
    { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Lokalisierte Versionen Ihrer Seite (hreflang) für Google bereitstellen, abgerufen am 21.11.2026' },
    { url: 'https://developer.wordpress.org/advanced-administration/wordpress/permalinks/', nazwa: 'WordPress Developer Resources: Customize Permalinks, abgerufen am 21.11.2026' },
  ],
  cta: {
    tekst: 'Ohne SaaS-Limits und ohne Plugin-Stress: Booster Pack mit Next.js-Website anfragen (590 € netto/Monat)',
    plan: 'booster',
    linki: [
      { tekst: 'SEO Kosten und Pakete in Euro ansehen', href: '/cennik-pozycjonowania' },
      { tekst: 'Bestehende Webflow- oder WordPress-Seite kostenlos prüfen', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Webflow SEO' },
    { '@type': 'Thing', name: 'WordPress SEO' },
  ],
};

// --- P12_KOD_KREATOR_DE: Programmierte Website (Next.js) vs Homepage-Baukasten ----------------

const W12 = metaDe('/porownania/strona-kodowana-czy-kreator-seo', {
  tytul: 'Programmierte Website oder Baukasten für SEO? (2026)',
  h1: 'Individuell programmierte Website (Next.js) oder Homepage-Baukasten für SEO?',
  opis: 'Programmierte Next.js-Website vs. Homepage-Baukasten (Wix, Squarespace): Code-Eigentum, mobile INP-Werte, HTML für KI-Bots und Kosten über 24 Monate.',
});

export const P12_KOD_KREATOR_DE = {
  slug: 'strona-kodowana-czy-kreator-seo',
  title: W12.tytul,
  description: W12.opis,
  h1: W12.h1,
  okruszek: 'Programmierte Website oder Baukasten',
  nazwaKarty: 'Programmierte Website oder Baukasten für SEO',
  tag: 'Entscheidungshilfe vor dem Website-Start',
  zrodlaDanych: 'Daten: web.dev / Google Search Central (INP & Core Web Vitals), OpenAI Crawler-Dokumentation, Export-Richtlinien gängiger Baukästen sowie unsere Preisliste in Euro (Stand 21.11.2026).',
  answer: 'Ein Homepage-Baukasten (etwa Wix, Squarespace oder Jimdo) reicht für eine digitale Visitenkarte, wenn Kunden Sie ohnehin über Empfehlungen kennen. Sobald die Website aktiv über Google und KI-Antworten Neukunden gewinnen soll, bremst der Baukasten durch fremden Skript-Ballast auf Mobilgeräten, starre URL-Muster und fehlendes Code-Eigentum. Im Booster Pack erhalten Sie eine programmierte Next.js-Website ohne separaten Einmalpreis direkt mit laufendem SEO.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabelle-programmierte-website-vs-baukasten',
  tableCaption: 'Individuell programmierte Next.js-Website und Homepage-Baukasten im SEO-Vergleich: 9 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: Google Search Central (JavaScript-SEO & Core Web Vitals), Hilfe-Dokumentationen gängiger Homepage-Baukästen zum Thema Website-Export sowie unsere Paketpreise (Stand 21.11.2026). Markennamen gehören ihren jeweiligen Inhabern.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'nextjs', label: 'Programmierte Website (Next.js)' },
    { key: 'baukasten', label: 'Homepage-Baukasten (z. B. Wix, Squarespace, Jimdo)' },
  ],
  rows: [
    {
      id: 'eigentum',
      kryterium: 'Eigentum am Quellcode und Umzugsfreiheit',
      nextjs: 'Der gesamte Quellcode, alle Texte und Medien gehören Ihrem Unternehmen und sind jederzeit auf jedem kompatiblen Hoster lauffähig',
      baukasten: 'Kein Code-Export möglich: Kündigen Sie das Baukasten-Abo, ist die Website weg und muss bei einem Wechsel komplett neu gebaut werden',
    },
    {
      id: 'inp-mobil',
      kryterium: 'Mobile Reaktionszeit (INP) und Ladegewicht',
      nextjs: 'Schlankes HTML und gezieltes Code-Splitting pro Unterseite halten LCP (bis 2,5 s) und INP (bis 200 ms) auf Smartphones stabil im grünen Bereich',
      baukasten: 'Plattformeigene Laufzeitumgebungen und App-Widgets laden umfangreiche JavaScript-Pakete auf dem Smartphone, was den INP-Wert oft drückt',
    },
    {
      id: 'html-ki',
      kryterium: 'HTML-Struktur für Googlebot und KI-Crawler (GEO)',
      nextjs: 'Klares semantisches Server-HTML (Überschriften, Vergleichstabellen, Antwortblöcke) sofort lesbar für Googlebot, OAI-SearchBot und PerplexityBot',
      baukasten: 'Tief verschachteltes Baukasten-DOM und teils nachgeladene Inhaltsblöcke erschweren KI-Crawlern das saubere Extrahieren von Fakten und Tabellen',
    },
    {
      id: 'url-kontrolle',
      kryterium: 'URL-Pfade, Weiterleitungen und Canonicals',
      nextjs: 'Freie URL-Struktur ohne Zwangsordner, präzise 301/308-Weiterleitungen, eigene HTTP-Header und exakte Canonical-Steuerung',
      baukasten: 'Je nach Anbieter feste Systempfade für Blog-, Shop- oder Kategorieseiten sowie begrenzte Regeln für komplexe Weiterleitungen',
    },
    {
      id: 'schema-tools',
      kryterium: 'Strukturierte Daten (JSON-LD) und eigene Tools',
      nextjs: 'Maßgeschneiderte Schema.org-Verknüpfungen plus interaktive Rechner, Checklisten oder Konfiguratoren nativ im Seitenlayout ohne iFrames',
      baukasten: 'Grundlegende Standard-Schemas vorhanden; individuelle Rechner oder B2B-Formulare laufen meist als langsame Drittanbieter-iFrames',
    },
    {
      id: 'dsgvo-bfsg',
      kryterium: 'DSGVO, lokale Schriften & Barrierefreiheit (BFSG)',
      nextjs: 'Lokales Font-Hosting über next/font, volle Kontrolle über Consent Mode v2 und barrierefreier Code nach WCAG 2.2 AA',
      baukasten: 'Plattformskripte, App-Store-Erweiterungen und eingeschränkter Einfluss auf Tastaturfokus und ARIA-Rollen in fertigen Baukasten-Modulen',
    },
    {
      id: 'mehrsprachigkeit',
      kryterium: 'Mehrsprachigkeit (z. B. DE / EN / PL)',
      nextjs: 'Übersetzte URL-Slugs je Markt, sauberes x-default- und Länder-hreflang ohne Lizenzaufschlag pro Sprache',
      baukasten: 'Oft an höhere Tarifstufen oder Übersetzungs-Apps gekoppelt, teils mit eingeschränkter URL-Lokalisierung',
    },
    {
      id: 'skalierung',
      kryterium: 'Wachstum ab 30+ SEO-Landingpages',
      nextjs: 'Wächst über wiederverwendbare Komponenten mühelos auf hunderte Leistungs-, Standort- und Ratgeberseiten mit einheitlichem Tempo',
      baukasten: 'Pflege vieler ähnlicher Leistungsseiten im Drag-and-Drop-Editor wird unübersichtlich und fehleranfällig',
    },
    {
      id: 'kosten-24m',
      kryterium: 'Wirtschaftlichkeit über 24 Monate',
      nextjs: 'Einzelpreis ab 1.400 € netto oder im Booster Pack (590 € netto/Monat, mind. 3 Monate inkl. vollständiger SEO-Betreuung) ohne spätere Neubaukosten',
      baukasten: 'Scheinbar günstig (ca. 15 € bis 45 €/Monat plus kostenpflichtige Apps), doch bei ernsthaftem SEO folgt im 2. Jahr häufig der bezahlte Komplett-Relaunch',
    },
  ],
  sections: [
    {
      id: 'vergleich-9-kriterien',
      h2: 'Programmierte Website oder Homepage-Baukasten: 9 Kriterien für SEO und KI',
      html: [
        '<p>Marken- und Transparenzhinweis: Markennamen gehören ihren jeweiligen Inhabern (Wix ist eine Marke von Wix.com Ltd., Squarespace von Squarespace, Inc., Jimdo von der Jimdo GmbH, IONOS von der IONOS SE, Next.js von Vercel Inc.). Wir entwickeln programmierte Websites in Next.js und kombinieren sie im Booster Pack mit laufender Suchmaschinenoptimierung.</p>',
        '<p>Homepage-Baukästen haben sich technisch weiterentwickelt: Titel-Tags, Meta-Beschreibungen und eine Sitemap lassen sich heute überall eintragen. Dass Google eine Baukasten-Seite indexieren kann, heißt im umkämpften Mittelstand aber noch nicht, dass sie gegen spezialisierte Wettbewerber in die Top 3 kommt oder von ChatGPT und Perplexity als Quelle zitiert wird.</p>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'warum-inp-und-ki-bots-leiden',
      h2: 'Technischer Flaschenhals im Baukasten: Mobiles JavaScript (INP) und KI-Bots',
      html: [
        `<p>Ein Baukasten muss im Browser für tausende denkbare Layout-Wünsche gerüstet sein. Selbst eine schlichte Dienstleister-Seite mit fünf Unterseiten lädt dadurch häufig ein schweres Framework-Grundpaket der Plattform plus Skripte aus dem jeweiligen App-Marktplatz (Terminbuchung, Bewertungs-Widget, Cookie-Tool, Chat). Auf einem Mittelklasse-Smartphone verzögert diese Skriptlast die Reaktion auf Fingertipps - genau das misst Google seit März 2024 mit dem ${wew('/blog/core-web-vitals-a-pozycje-google', 'Core-Web-Vitals-Wert INP (Grenzwert 200 ms)')}.</p>`,
        `<p>Noch deutlicher wird der Unterschied bei ${wew('/pozycjonowanie-w-ai', 'KI-Antworten in ChatGPT, Perplexity und Google AI Overviews')}: KI-Suchbots rufen Seiten mit engem Zeitbudget ab und führen in der Regel kein komplexes Client-JavaScript aus. Auf einer programmierten Next.js-Seite stehen H1, Kurzantwort, Vergleichstabellen und ${wew('/narzedzia/dane-strukturalne-json-ld', 'JSON-LD-Daten')} fertig gerendert im ersten HTML-Paket. Baukasten-Widgets, die Preise, FAQs oder Leistungslisten erst im Browser nachladen, bleiben für viele Bots schlicht unsichtbar.</p>`,
      ].join(''),
    },
    {
      id: 'vendor-lock-in-und-relaunch-falle',
      h2: 'Die versteckte Relaunch-Falle: Kein Code-Export beim Anbieterwechsel',
      html: [
        '<p>Der wichtigste kaufmännische Unterschied steht selten auf der Preisseite eines Baukastens: Sie mieten die Website nur. Weder bei Wix noch bei Squarespace oder Jimdo können Sie den fertigen Programmcode Ihrer Website herunterladen und zu einem eigenen Hoster mitnehmen. Sobald Ihr Unternehmen wächst - etwa weil Sie mehrsprachig expandieren, ein individuelles Anfrageformular mit Vorqualifizierung brauchen oder eine SEO-Agentur technische Bremsen lösen soll -, beginnt die Arbeit wieder bei null.</p>',
        '<p>Bei einer individuell programmierten Next.js-Website gehört Ihnen das Ergebnis. Designsystem, Texte, Bilder und strukturierte Daten liegen sauber getrennt vor und lassen sich jahrelang ausbauen, ohne das Fundament wegwerfen zu müssen.</p>',
      ].join(''),
    },
    {
      id: 'kostenrechnung-24-monate',
      h2: 'Kostenvergleich über 24 Monate: Baukasten vs. Einzelprojekt vs. Booster Pack',
      html: [
        '<p>Klassische Webagenturen verlangen für eine individuell programmierte Unternehmenswebsite im DACH-Raum oft mehrere Tausend Euro vorab - genau deshalb greifen viele Gründer und KMU zuerst zum Baukasten. Unser Booster Pack löst diese Einstiegshürde auf, indem die Website-Erstellung ohne separaten Einmalpreis in die ersten drei Monate der SEO-Zusammenarbeit integriert ist.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-kosten-baukasten-vs-booster',
        caption: 'Vier Wege zur Unternehmenswebsite über 24 Monate im Kosten- und Nutzenvergleich (EUR netto)',
        columns: [
          { key: 'modell', label: 'Modell' },
          { key: 'start', label: 'Startkosten (Monat 1)' },
          { key: 'laufend', label: 'Laufende Kosten' },
          { key: 'ergebnis', label: 'Was nach 12-24 Monaten dasteht' },
        ],
        rows: [
          {
            id: 'nur-baukasten',
            modell: '1. Homepage-Baukasten in Eigenregie (ohne SEO)',
            start: '0 € extern + eigene Arbeitszeit',
            laufend: 'ca. 15 € bis 45 €/Monat + kostenpflichtige Zusatz-Apps',
            ergebnis: 'Digitale Visitenkarte auf Mietbasis; meist kaum Sichtbarkeit für umkämpfte Suchbegriffe ohne Markenname',
          },
          {
            id: 'baukasten-plus-seo',
            modell: '2. Baukasten + spätere SEO-Nachrüstung & Relaunch',
            start: 'eigene Zeit im Baukasten',
            laufend: 'Baukasten-Abo + SEO-Budget + späterer Neubau beim Systemwechsel',
            ergebnis: 'Doppelte Arbeit: Texte, URLs und Weiterleitungen müssen beim Umstieg auf ein offenes System neu aufgesetzt werden',
          },
          {
            id: 'nextjs-einzeln',
            modell: '3. Next.js-Website einzeln bei AI SEO COMPANY',
            start: 'ab 1.400 € netto einmalig',
            laufend: 'optional SEO Standard (ab 450 € netto/Monat, monatlich kündbar)',
            ergebnis: 'Eigener, schneller Next.js-Code ab Tag 1 ohne Verpflichtung zu einem laufenden SEO-Vertrag',
          },
          {
            id: 'booster-pack',
            modell: '4. Booster Pack (Next.js-Website + SEO inklusive)',
            start: '590 € netto im 1. Monat (0 € separater Einmalpreis)',
            laufend: '590 € netto/Monat (Mindestlaufzeit 3 Monate = 1.770 € netto Mindestsumme)',
            ergebnis: 'Maßgeschneiderte Next.js-Website, Hosting, SSL, Kundenportal und vollständiger Aufbau organischer Anfragen aus einer Hand',
          },
        ],
        przypis: 'Alle eigenen Preise netto in Euro zzgl. gesetzlicher USt., Stand 21.11.2026. Baukasten-Gebühren als marktübliche Orientierungsspanne gängiger Business-Tarife.',
        minWidth: 640,
      },
      htmlPo: `<p>Den genauen Leistungsumfang aller drei Pakete (SEO Standard, SEO Premium und Booster Pack) sehen Sie unter ${wew('/cennik-pozycjonowania', 'SEO Kosten und Pakete in Euro')}.</p>`,
    },
    {
      id: 'wann-reicht-ein-baukasten',
      h2: 'Ehrliche Abgrenzung: Wann reicht ein Homepage-Baukasten trotzdem aus?',
      html: [
        '<p>Wir raten nicht jedem Unternehmen automatisch zu einer programmierten Website. Ein Homepage-Baukasten ist die wirtschaftlich vernünftige Lösung, wenn:</p>',
        '<ul>',
        '<li>Sie ein zeitlich begrenztes Projekt, eine Veranstaltung oder eine erste Geschäftsidee für wenige Wochen testen möchten;</li>',
        '<li>Ihre Aufträge ausschließlich über persönliche Empfehlungen oder bestehende Rahmenverträge kommen und die Website nur Kontaktdaten und Impressum zeigen soll;</li>',
        '<li>Ihr gesamtes Jahresbudget für Website und Marketing unter 1.000 € liegt.</li>',
        '</ul>',
        `<p>Sobald jedoch schon ein oder zwei zusätzliche Kundenanfragen pro Monat die gesamten Jahreskosten mehrfach einspielen - typisch im B2B, im Handwerk, in Kanzleien, Praxen und spezialisierten Dienstleistungen -, rechnet sich ein sauberes technisches Fundament vom ersten Tag an. Prüfen Sie Ihre bestehende Baukasten-Seite gern vorab in unserem ${wew('/narzedzia/audyt-seo', 'kostenlosen SEO Audit')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu programmierter Website und Homepage-Baukasten',
  faq: [
    {
      question: 'Kann man mit Wix, Squarespace oder Jimdo überhaupt bei Google gefunden werden?',
      answer: 'Für den eigenen Firmennamen und sehr schwache lokale Nischenbegriffe: ja. Bei umkämpften Suchanfragen mit echter Kaufabsicht stoßen Baukästen jedoch schnell an Grenzen - vor allem durch langsamere mobile Interaktionswerte (INP), starre URL-Vorgaben, begrenztes Schema-Markup und schwerfälliges HTML für KI-Suchmaschinen.',
    },
    {
      question: 'Gehört mir die Website im Booster Pack, wenn ich nach der Mindestlaufzeit kündige?',
      answer: `Die Mindestlaufzeit des Booster Packs beträgt 3 Monate zu je 590 € netto pro Monat. Alle von uns erstellten Inhalte gehen nach Bezahlung in Ihren Besitz über, und Google Search Console, Analytics sowie Ihre Domain liegen von Tag eins an auf Ihren eigenen Konten. Unsere Vertragsregeln lesen Sie transparent unter ${wew('/cennik-pozycjonowania', 'Fairer Vertrag auf der Seite SEO Kosten', '#faire-vertraege')}.`,
    },
    {
      question: 'Wie lange dauert die Erstellung einer programmierten Next.js-Website bei Ihnen?',
      answer: 'Eine klar strukturierte Unternehmenswebsite entsteht nach Freigabe der Inhalte und der Seitenarchitektur meist innerhalb weniger Wochen. Weil Konzeption, Texterstellung und technisches SEO in einem Team liegen, starten Keyword-Struktur, interne Verlinkung und Schema.org-Auszeichnung direkt beim Bau der Seite statt erst Monate später.',
    },
    {
      question: 'Muss ich für jede Textänderung auf einer programmierten Website einen Entwickler bezahlen?',
      answer: 'Nein. Im laufenden SEO-Paket setzen wir Änderungen und neue Fachseiten direkt für Sie um. Wenn Ihr Team Inhalte unabhängig selbst pflegen möchte, richten wir eine klare Inhaltsstruktur oder ein Headless-CMS ein, in dem Texte, Bilder und FAQs genauso einfach bearbeitet werden wie in einem klassischen Editor - ohne Gefahr für Design und Ladezeit.',
    },
    {
      question: 'Wie ziehen wir von einem bestehenden Baukasten auf Next.js um, ohne Besucher zu verlieren?',
      answer: 'Wir erfassen alle aktuell indexierten URLs Ihres Baukastens aus der Google Search Console, übernehmen wichtige Seiteninhalte in ein sauberes Next.js-Layout und richten beim Wechsel der Domain permanente 301/308-Weiterleitungen von alten Systempfaden (etwa /post/... oder /services-1) auf die neuen sprechenden URLs ein.',
    },
  ],
  sources: [
    { url: 'https://web.dev/articles/inp', nazwa: 'web.dev: Interaction to Next Paint (INP) - Einfluss von JavaScript im Hauptthread auf mobile Reaktionszeiten, abgerufen am 21.11.2026' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics', nazwa: 'Google Search Central: JavaScript-SEO-Grundlagen verstehen, abgerufen am 21.11.2026' },
    { url: 'https://support.wix.com/en/article/exporting-or-embedding-your-wix-site-elsewhere', nazwa: 'Wix Help Center: Exporting or Embedding Your Wix Site Elsewhere (kein Export der Website auf externes Hosting), abgerufen am 21.11.2026' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: Overview of OpenAI Crawlers (OAI-SearchBot), abgerufen am 21.11.2026' },
  ],
  cta: {
    tekst: 'Raus aus dem Baukasten: Neue Next.js-Website im Booster Pack anfragen (590 € netto/Monat, mind. 3 Monate)',
    plan: 'booster',
    linki: [
      { tekst: 'Alle Pakete und Preise in Euro vergleichen', href: '/cennik-pozycjonowania' },
      { tekst: 'Bestehende Website kostenlos auf SEO-Bremsen prüfen', href: '/narzedzia/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Individuell programmierte Website (Next.js)' },
    { '@type': 'Thing', name: 'Homepage-Baukasten SEO' },
  ],
};
