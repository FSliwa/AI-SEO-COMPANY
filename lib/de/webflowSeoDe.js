// Texte fuer /de/webflow-seo-agentur (E1b, 22.11.2026; Schluessel PL: /pozycjonowanie-webflow).
// Reiner ESM-Code ohne React. Preise aus lib/de/uslugiGemeinsam.js (PREISE), keine langen Gedankenstriche.

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';
import { AUDYT } from '../narzedziaLiczby.js';

const e = (n) => eur(n, 'de');

export const WF_KURZANTWORT = `Webflow liefert schnelles CDN-HTML ab Werk, bremst B2B- und SaaS-Websites im SEO jedoch oft an vier Stellen aus: flache CMS-Kollektions-URLs (/kollektion/eintrag), versehentlich indexierte Hilfs-Kollektionen und webflow.io-Staging-Subdomains, nicht übersetzte URL-Slugs im günstigen Localization-Tarif sowie fehlendes dynamisches JSON-LD. Wir optimieren bestehende Webflow-Projekte ab ${e(PREISE.standard)} netto pro Monat im Monatsvertrag - oder lösen wachsende mehrsprachige Seiten im Booster Pack (${e(PREISE.booster)} netto/Monat, mind. 3 Monate) ohne Einmalpreis durch eigenes Next.js ab.`;

export const WF_HEBEL = [
  {
    kicker: '01 / CMS-ARCHITEKTUR',
    titel: 'Flache Kollektions-Pfade & dünne Hilfsseiten bereinigen',
    text: 'Jede Webflow-CMS-Kollektion erzwingt das Muster /kollektion/slug und legt standardmäßig eigene Detailseiten an - selbst für Kundenstimmen, Teamkarten oder Logos. Wir sperren reine Baustein-Kollektionen für den Index, deaktivieren die webflow.io-Subdomain und strukturieren Leistungs-Cluster aus statischen Ordnern und sauber verlinkten CMS-Hubs.',
    lieferung: ['Kein Staging-Duplikat', 'Saubere CMS-Pfade', '301-Regeln'],
  },
  {
    kicker: '02 / HREFLANG & LOCALIZATION',
    titel: 'Mehrsprachiges Webflow SEO ohne gemischtsprachige Seiten',
    text: 'Im Webflow-Localization-Tarif Essential (9 USD/Sprache/Monat) bleiben URL-Slugs unübersetzt; erst Advanced (29 USD/Sprache/Monat bei Jahreszahlung) erlaubt lokalisierte Pfade. Wir prüfen hreflang-Gegenseitigkeit, x-default, lokalisierte Sitemaps und nicht übersetzte CMS-Pflichtfelder, die sonst Soft-404-Signale auslösen.',
    lieferung: ['Valides hreflang', 'Lokalisierte Slugs', 'Sprach-Sitemaps'],
  },
  {
    kicker: '03 / DYNAMISCHES JSON-LD & DSGVO',
    titel: 'CMS-gebundenes Schema.org & lokale WOFF2-Schriften',
    text: 'Ohne Plugins muss strukturiertes Markup in Webflow über den Custom-Code-Bereich gepflegt werden. Wir hinterlegen fehlertolerante JSON-LD-Templates (Service, Article, FAQPage, Organization) mit CMS-Feldern und stellen Google Fonts auf lokal hochgeladene WOFF2-Dateien um.',
    lieferung: ['Dynamisches JSON-LD', 'Lokale Webfonts', 'WCAG-Kontraste'],
  },
  {
    kicker: '04 / PERFORMANCE & KI-SUCHE',
    titel: 'Lottie-/Skript-Last senken & KI-Bots steuern',
    text: 'Schwere Lottie-Animationen, Hintergrundvideos und Tag-Manager-Container drücken auch auf Webflow den mobilen INP über 200 ms. Wir entschlacken Interaktionen, prüfen OAI-SearchBot und PerplexityBot in den Webflow-SEO-Einstellungen und bauen zitierfähige Antwort- und Vergleichsseiten auf.',
    lieferung: ['INP <= 200 ms', 'KI-Bot-Freigabe', 'Zitierbare Tabellen'],
  },
];

export const WF_ENTSCHEIDUNG_ZEILEN = [
  [
    'Einsprachige B2B- oder SaaS-Website bis ca. 200 Seiten, Marketing pflegt Inhalte gern visuell im Webflow Designer',
    'Auf Webflow bleiben & SEO-Potenzial ausschöpfen (SEO Standard / Premium)',
    'Schnelles Fastly/AWS-CDN ohne Plugin-Updates; mit sauberer CMS- und Schema-Struktur sehr starkes Setup',
  ],
  [
    'Mehrsprachige Expansion (z. B. DE + EN + FR + PL) mit hohen laufenden Localization- und Workspace-Gebühren',
    `Umstieg auf Next.js im Booster Pack (${e(PREISE.booster)} netto/Monat, mind. 3 Monate)`,
    'Keine monatlichen Aufpreise pro Sprache, freie mehrstufige URL-Hierarchien und 100 % Code-Eigentum im Git-Repository',
  ],
  [
    'Bedarf an interaktiven B2B-Rechnern, eigenen Konfiguratoren oder tausenden programmatischen Unterseiten über dem CMS-Item-Limit',
    `Next.js (Einzelprojekt ab ${e(PREISE.website)} netto oder im Booster Pack)`,
    'Keine CMS-Datensatz-Obergrenzen, keine langsamen Drittanbieter-Embeds und native Server-Routen z. B. für /llms.txt',
  ],
];

export const WF_PREIS_ZEILEN = [
  [
    'Eigenständiger Webflow SEO & Localization Audit',
    `ab ${e(PREISE.audit)} netto (einmalig)`,
    'Einmalauftrag (3-5 Werktage)',
    'Prüfung von CMS-Kollektionen, webflow.io-Indexierung, hreflang, Custom-Code-JSON-LD, Lottie-/INP-Bremse und KI-Sichtbarkeit inkl. Maßnahmenplan',
  ],
  [
    'SEO Standard (laufende Webflow-Betreuung)',
    `ab ${e(PREISE.standard)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    `Technische Umsetzung in Webflow, bis zu 20 Keywords, 2 Inhalte & 2 Links/Monat, Google Unternehmensprofil, Kundenportal 24/7 (KI-Monitoring optional +${e(PREISE.geoZuschlag)}/Monat)`,
  ],
  [
    'SEO Premium (Webflow-Skalierung + GEO inklusive)',
    `${e(PREISE.premium)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    'Ausbau von Leistungs- und Vergleichsseiten in Webflow, bis zu 50 Keywords, 4 Inhalte & 4 Links/Monat sowie wöchentliches KI-Monitoring (30 Fragen)',
  ],
  [
    'Booster Pack (Wechsel von Webflow zu Next.js + SEO)',
    `${e(PREISE.booster)} netto / Monat`,
    'Mindestlaufzeit 3 Monate, danach monatlich',
    'Neubau in Next.js (0 € separater Einmalpreis) ohne SaaS-Sprachzuschläge inkl. 301-Migration, Hosting, SSL und kompletter SEO-Betreuung',
  ],
];

export const WF_FAQ = [
  {
    id: 'wie-gut-ist-webflow-fuer-seo',
    frage: 'Ist Webflow grundsätzlich gut für B2B-SEO geeignet?',
    antwort: `Ja - insbesondere für einsprachige Unternehmens- und SaaS-Seiten. Webflow erzeugt sauberes HTML, liefert Seiten über ein schnelles globales CDN aus und benötigt keine wartungsintensiven PHP-Plugins. Grenzen zeigen sich erst bei tief verschachtelten URL-Verzeichnissen im CMS und den Zusatzkosten für mehrsprachige URL-Slugs; mehr dazu unter ${verweis('/porownania/webflow-vs-wordpress-seo', 'Webflow vs WordPress für SEO')}.`,
  },
  {
    id: 'webflow-io-subdomain-problem',
    frage: 'Warum taucht unsere webflow.io-Testadresse manchmal in den Google-Ergebnissen auf?',
    antwort: 'Wenn in den Webflow Site Settings unter SEO der Schalter zum Deaktivieren der Subdomain-Indexierung nicht gesetzt wurde, crawlt Google die Staging-Domain parallel zur Hauptdomain. Wir schalten die Indexierung der webflow.io-Subdomain konsequent ab und prüfen in der Search Console, dass ausschließlich Ihre eigene Hauptdomain rankt.',
  },
  {
    id: 'json-ld-in-webflow-cms',
    frage: 'Wie pflegen Sie strukturierte Daten (JSON-LD) in Webflow ohne SEO-Plugin?',
    antwort: 'Wir hinterlegen schlanke, geprüfte JSON-LD-Skripte direkt in den Seiteneinstellungen bzw. Collection-Page-Templates von Webflow und verknüpfen dynamische Felder wie Überschrift, Kurzbeschreibung, Änderungsdatum und Preis sauber, sodass keine Anführungszeichen im Fließtext die JSON-Syntax beschädigen.',
  },
  {
    id: 'webflow-dsgvo-fonts',
    frage: 'Worauf achten Sie bei Webflow im DACH-Raum in puncto DSGVO und Ladezeit?',
    antwort: 'Standardmäßig eingebundene Google- oder Adobe-Schriften im Webflow-Designer bauen beim Seitenaufruf oft direkte Verbindungen zu US-Servern auf. Wir ersetzen externe Schriftaufrufe durch lokal in Webflow hochgeladene WOFF2-Schriftdateien - das beseitigt ein häufiges Datenschutzrisiko und spart zusätzliche DNS-Abfragen beim ersten Seitenaufruf.',
  },
  {
    id: 'webflow-kostenlos-pruefen',
    frage: 'Kann ich meine bestehende Webflow-Seite vorab kostenlos prüfen?',
    antwort: `Selbstverständlich. Geben Sie Ihre Domain in unseren ${verweis('/narzedzia/audyt-seo', 'kostenlosen SEO Audit')} ein: In rund einer Minute prüfen wir bis zu ${AUDYT.stron} Unterseiten nach ${AUDYT.regul} Regeln auf Titel, Überschriftenhierarchie, Canonical-Tags, Antwortzeiten und KI-Crawler-Freigabe.`,
  },
];

export const WF_QUELLEN = [
  { url: 'https://help.webflow.com/hc/en-us/articles/33961248560659-SEO-settings', nazwa: 'Webflow Help Center: SEO settings, indexing controls, robots.txt & sitemap configuration', data: '2026-11-22' },
  { url: 'https://webflow.com/pricing', nazwa: 'Webflow Pricing: Site Plans, CMS Collection Limits & Localization Tiers', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Lokalisierte Versionen Ihrer Seiten (hreflang & x-default)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Einführung in strukturierte Daten (JSON-LD)', data: '2026-11-22' },
];
