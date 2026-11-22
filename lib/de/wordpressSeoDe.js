// Texte fuer /de/wordpress-seo-agentur (E1b, 22.11.2026; Schluessel PL: /pozycjonowanie-wordpress).
// Reiner ESM-Code ohne React. Preise aus lib/de/uslugiGemeinsam.js (PREISE), keine langen Gedankenstriche.

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';
import { AUDYT } from '../narzedziaLiczby.js';

const e = (n) => eur(n, 'de');

export const WP_KURZANTWORT = `WordPress SEO beseitigt die typischen technischen Bremsen gewachsener WordPress-Installationen: langsamer INP und LCP durch Page-Builder-Ballast (Elementor, Divi), tausende dünne Tag-, Autor- und Anhang-Archive im Google-Index, doppelte JSON-LD-Blöcke aus konkurrierenden Plugins sowie 403-Sperren für KI-Crawler wie OAI-SearchBot. Wir optimieren bestehende WordPress-Websites ab ${e(PREISE.standard)} netto pro Monat im Monatsvertrag - oder ersetzen veraltete Setups im Booster Pack (${e(PREISE.booster)} netto/Monat, mind. 3 Monate) ohne separaten Einmalpreis durch eine schnelle Next.js-Website.`;

export const WP_BAUSTELLEN = [
  {
    kicker: '01 / CORE WEB VITALS',
    titel: 'Plugin-Diät & Entlastung für LCP und INP',
    text: 'Visuelle Builder wie Elementor, Divi oder WPBakery sowie 25+ aktive Plugins laden CSS- und JS-Dateien oft auf jeder einzelnen Unterseite. Wir entfernen ungenutzte Skripte pro Template, richten Server-Caching samt Redis Object Cache ein und holen Webfonts DSGVO-konform lokal auf Ihren eigenen Server.',
    lieferung: ['LCP <= 2,5 s', 'INP <= 200 ms', 'Lokale Fonts'],
  },
  {
    kicker: '02 / INDEXIERUNG',
    titel: 'Taxonomien, Archive und Crawl-Budget aufräumen',
    text: 'Standardmäßig erzeugt WordPress eigene URLs für Schlagwörter (Tags), Autoren, Monatsarchive, Medien-Anhänge und interne Suchseiten (?s=). Wir bereinigen die XML-Sitemap in Rank Math oder Yoast, setzen dünne Archivseiten gezielt auf noindex und bündeln interne Links auf Ihre kaufnahen Leistungsseiten.',
    lieferung: ['Saubere Sitemap', 'Kein Index-Bloat', '301-Matrix'],
  },
  {
    kicker: '03 / SCHEMA.ORG',
    titel: 'Konfliktfreies JSON-LD ohne doppelte Entitäten',
    text: 'Häufig geben Theme, SEO-Plugin und Bewertungs-Add-on gleichzeitig widersprüchliche Organization-, LocalBusiness- oder FAQPage-Blöcke aus. Wir konsolidieren das Markup zu einem einzigen, validierten @graph mit klaren @id-Verweisen für Google und Antwortmaschinen.',
    lieferung: ['1 sauberer @graph', 'Service & FAQPage', 'Rich-Results-Check'],
  },
  {
    kicker: '04 / KI-SUCHE & GEO',
    titel: 'Freier Zugang für ChatGPT & Perplexity + /llms.txt',
    text: 'Sicherheits-Plugins (z. B. Wordfence, iThemes/Solid Security) oder Server-Firewalls blockieren KI-Suchbots oft unbemerkt mit HTTP 403. Wir schalten OAI-SearchBot, PerplexityBot und Claude-SearchBot kontrolliert frei, richten IndexNow für Bing ein und legen eine strukturierte /llms.txt an.',
    lieferung: ['robots.txt & WAF', '/llms.txt im Root', 'IndexNow aktiv'],
  },
];

export const WP_ENTSCHEIDUNG_ZEILEN = [
  [
    'Technisch gesunde Gutenberg-Seite mit 8-15 gepflegten Plugins',
    'Auf WordPress bleiben & gezielt optimieren (SEO Standard / Premium)',
    'Schneller ROI ohne Relaunch-Aufwand; Redaktion arbeitet gewohnt im Block-Editor weiter',
  ],
  [
    'Großes Fachmagazin oder WooCommerce-Shop mit speziellen WaWi-Plugins',
    'WordPress behalten + Redis, HPOS und Template-Entschlackung',
    'Das Plugin-Ökosystem spart hier echte Entwicklungszeit, solange Caching und Updates sitzen',
  ],
  [
    'Veraltetes Kauf-Theme (Elementor/Divi/WPBakery), 30+ Plugins, wiederkehrende Sicherheitslücken oder mobile Ladezeit > 4 s',
    `Wechsel auf Next.js im Booster Pack (${e(PREISE.booster)} netto/Monat, mind. 3 Monate)`,
    '0 € separater Einmalpreis für den Neubau, dauerhaft grüne Core Web Vitals und null Plugin-Wartung',
  ],
  [
    'Mehrsprachige B2B-Website (DE, EN, PL) mit individuellen Rechnern oder Tools',
    `Next.js (Einzelprojekt ab ${e(PREISE.website)} netto oder im Booster Pack)`,
    'Saubere hreflang-Steuerung ohne WPML-Konflikte und sofort lesbares Server-HTML für KI-Crawler',
  ],
];

export const WP_PREIS_ZEILEN = [
  [
    'Eigenständiger WordPress SEO Audit',
    `ab ${e(PREISE.audit)} netto (einmalig)`,
    'Einmalauftrag (3-5 Werktage)',
    `Vollständige Prüfung von Technik, Plugin-Last, Indexierung, Schema.org, KI-Bots und Keyword-Potenzial inkl. priorisiertem Maßnahmenplan`,
  ],
  [
    'SEO Standard (für bestehende WordPress-Seiten)',
    `ab ${e(PREISE.standard)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    `Technik- & Plugin-Optimierung, bis zu 20 Keywords, 2 Fachinhalte & 2 Links/Monat, Google Unternehmensprofil, Kundenportal 24/7 (KI-Monitoring optional +${e(PREISE.geoZuschlag)}/Monat)`,
  ],
  [
    'SEO Premium (Wachstum + GEO inklusive)',
    `${e(PREISE.premium)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    'Umfassendes technisches WordPress-SEO, bis zu 50 Keywords, 4 Inhalte & 4 Links/Monat, CRO sowie wöchentliches KI-Monitoring (30 Kundenfragen)',
  ],
  [
    'Booster Pack (Relaunch von WordPress auf Next.js + SEO)',
    `${e(PREISE.booster)} netto / Monat`,
    'Mindestlaufzeit 3 Monate, danach monatlich',
    'Kompletter Neubau Ihrer Website in Next.js (0 € Einmalpreis) inkl. 1:1-URL-/301-Migration, Hosting, SSL und vollständiger SEO-Betreuung',
  ],
];

export const WP_FAQ = [
  {
    id: 'yoast-oder-rank-math',
    frage: 'Sollten wir auf WordPress lieber Yoast SEO, Rank Math oder The SEO Framework nutzen?',
    antwort: 'Keines dieser Plugins verschafft allein bessere Google-Positionen - entscheidend ist die saubere Konfiguration. Wir arbeiten problemlos mit Ihrem bestehenden Setup (meist Rank Math oder Yoast SEO), schalten dort überflüssige Module ab, bereinigen Sitemap-Regeln und verhindern doppelte Schema-Ausgaben. Einen riskanten Plugin-Wechsel empfehlen wir nur, wenn das bisherige Plugin technisch defekt ist.',
  },
  {
    id: 'elementor-divi-behalten',
    frage: 'Können Sie auch eine WordPress-Seite mit Elementor oder Divi für Core Web Vitals beschleunigen?',
    antwort: `Bis zu einem gewissen Grad ja: Durch das Abschalten ungenutzter Widgets, lokales Font-Hosting, verzögertes Laden drittanbieterseitiger Skripte, WebP-Bilder und vollflächiges Server-Caching holen wir oft deutliche Verbesserungen heraus. Ist das Theme jedoch über Jahre aus verschachtelten Shortcodes gewachsen, zeigen wir Ihnen ehrlich, ab wann ein Neubau im ${verweis('/cennik-pozycjonowania', 'Booster Pack')} günstiger ist als stundenlanges Flicken.`,
  },
  {
    id: 'sicherheit-updates-seo',
    frage: 'Warum gehören Plugin-Sicherheit und Updates für Sie direkt zum WordPress-SEO?',
    antwort: 'Laut den jährlichen Sicherheitsberichten von Patchstack entstehen über 90 % aller gemeldeten Schwachstellen im WordPress-Umfeld in Drittanbieter-Plugins. Eine kompromittierte Installation legt oft unbemerkt zehntausende japanische oder pharmazeutische Spam-URLs im Google-Index an - das zerstört Vertrauen und Crawl-Budget über Monate.',
  },
  {
    id: 'migration-auf-nextjs-rankings',
    frage: 'Gehen unsere Rankings verloren, wenn wir später von WordPress auf Next.js wechseln?',
    antwort: `Nein, wenn die Migration sauber geplant wird. Wir exportieren vorab alle indexierten URLs und Backlink-Ziele aus Ihrer Search Console, übernehmen starke Pfade 1:1 oder richten permanente 301/308-Weiterleitungen ein. Den direkten Systemvergleich lesen Sie unter ${verweis('/porownania/nextjs-vs-wordpress-seo', 'Next.js vs WordPress für SEO')}.`,
  },
  {
    id: 'vorab-kostenlos-testen',
    frage: 'Kann ich meine WordPress-Website vorab unverbindlich testen?',
    antwort: `Ja. Unser ${verweis('/narzedzia/audyt-seo', 'kostenloser SEO Audit')} prüft bis zu ${AUDYT.stron} Unterseiten nach ${AUDYT.regul} technischen, inhaltlichen und KI-bezogenen Regeln und liefert sofort einen Punktwert von 1 bis 100 ohne Registrierung.`,
  },
];

export const WP_QUELLEN = [
  { url: 'https://developer.wordpress.org/advanced-administration/performance/optimization/', nazwa: 'WordPress Developer Resources: Performance Optimization & Caching' , data: '2026-11-22' },
  { url: 'https://patchstack.com/whitepaper/state-of-wordpress-security-in-2025/', nazwa: 'Patchstack: State of WordPress Security (Schwachstellenanteil von Plugins und Themes)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals (LCP, INP, CLS im 75. Perzentil)', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI Documentation: OAI-SearchBot und robots.txt-Steuerung', data: '2026-11-22' },
];
