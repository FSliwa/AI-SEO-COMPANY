// Texte fuer /de/linkbuilding-agentur (Schluessel PL: /link-building; Stand: 24.11.2026).
// Reiner ESM-Code ohne React. Preise aus lib/de/uslugiGemeinsam.js (PREISE), keine langen Gedankenstriche.
// Klare Abgrenzung zum Ratgeber /de/blog/linkaufbau-b2b (Informationsintention "linkaufbau"):
// Hier geht es um unsere Dienstleistung als Linkbuilding Agentur, Paketumfaenge, Qualitaetsfilter und Messung.

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const LB_KURZANTWORT = `Als spezialisierte Linkbuilding Agentur bauen wir themennahe, redaktionelle Verweise auf Ihre Website auf - ohne private Blognetzwerke (PBNs), ohne Massen-Kataloge und ohne Linkmiete. Wir verkaufen Backlinks nicht einzeln oder im Paket auf Zuruf: Unser White-Hat-Linkbuilding ist fester Bestandteil der monatlichen SEO-Betreuung mit 2 redaktionellen Links pro Monat in SEO Standard (ab ${e(PREISE.standard)} netto/Monat) und 4 redaktionellen Links pro Monat in SEO Premium (${e(PREISE.premium)} netto/Monat); größere Digital-PR-Kampagnen kalkulieren wir individuell auf Anfrage. Alle erworbenen redaktionellen Erwähnungen bleiben nach Vertragsende dauerhaft bestehen, und bezahlte Medienplatzierungen kennzeichnen wir strikt mit rel="sponsored" oder rel="nofollow".`;

export const LB_SAEULEN = [
  {
    kicker: '01 / AUDIT & PARTNER',
    titel: 'Linkprofil-Analyse & Aktivierung echter B2B-Partner',
    text: 'Jedes Projekt startet mit dem Abgleich Ihres bestehenden Linkprofils gegen Ihre SERP-Wettbewerber. Zuerst heben wir ungenutzte Potenziale im eigenen Ökosystem: Lieferanten, Verbände, Handelskammern, Technologiepartner und gemeinsame Kunden-Fallstudien.',
    lieferung: ['Backlink-Gap-Check', 'Partner- & Verbandslinks', 'Saubere Ziel-URLs'],
  },
  {
    kicker: '02 / DIGITAL PR & ASSETS',
    titel: 'Digital PR SEO durch Studien, Rechner und Open Data',
    text: 'Fachredaktionen verlinken selten auf reine Verkaufsseiten, aber regelmäßig auf überprüfbare Primärdaten und nützliche Werkzeuge. Wir entwickeln zitierfähige Linkable Assets wie offene CC-BY-4.0-Studien, kostenlose Online-Tools oder Auswertungen aus dem Common-Crawl-Web-Graphen.',
    lieferung: ['CC BY 4.0 Studien', 'Interaktive Tools', 'Common-Crawl-Daten'],
  },
  {
    kicker: '03 / REDAKTIONELLER OUTREACH',
    titel: 'Redaktioneller Linkaufbau B2B statt Massen-Mailing',
    text: 'Wir sprechen ausgewählte Fachmedien, Branchenportale und Redaktionen persönlich mit einem konkreten Themenvorschlag oder exklusiven Datensatz an. Der Verweis steht im redaktionellen Fließtext mit natürlichem, beschreibendem Ankertext statt in Fußzeilen oder Linklisten.',
    lieferung: ['Persönlicher Pitch', 'Kontext im Haupttext', 'Natürliche Ankertexte'],
  },
  {
    kicker: '04 / KEINE LINKMIETE',
    titel: 'Richtlinienkonformität & wöchentlicher Live-Check',
    text: 'Wir lehnen PBNs und gemietete Links konsequent ab: Erworbene redaktionelle Erwähnungen gehören Ihnen und verschwinden nach einer Kündigung nicht. Im 24/7-Kundenportal sehen Sie jede Quelle samt automatischer wöchentlicher Verfügbarkeitsprüfung.',
    lieferung: ['0 PBNs & 0 Linkmiete', 'rel="sponsored"-konform', 'Wöchentlicher Check'],
  },
];

export const LB_QUALITAET_ZEILEN = [
  [
    'Thematische Relevanz',
    'Fachmedien, Verbände und Portale aus Ihrer Branche oder der Arbeitswelt Ihrer Einkäufer',
    'Beliebige Sammelportale ohne fachlichen Bezug zu Ihrem Angebot',
  ],
  [
    'Eigener Suchmaschinen-Traffic',
    'Quellen mit nachweisbaren organischen Rankings und echter Leserschaft',
    'Domains ohne Sichtbarkeit, künstlich aufgeblähte Metriken oder abgestrafte Seiten',
  ],
  [
    'Platzierung des Links',
    'Redaktionell eingebettet im Fließtext eines Fachbeitrags, Werkzeugs oder Partnerprofils',
    'Seitenweite Footer-Links, Blogroll-Leisten, unmoderierte Foren oder Massen-Verzeichnisse',
  ],
  [
    'Ankertext (Linktext)',
    'Natürlich, beschreibend und passend zum Thema der verlinkten Zielseite',
    'Künstlich wiederholte Exact-Match-Kaufbegriffe zur reinen Ranking-Manipulation',
  ],
  [
    'Vertragsmodell & Bestand',
    'Dauerhafte redaktionelle Erwähnungen ohne laufende Miete - bleiben nach Vertragsende bestehen',
    'Linkmiete auf Monatsbasis, bei der Verweise nach Kündigung gelöscht werden',
  ],
  [
    'Umgang mit bezahlten Medien',
    'Strikte Auszeichnung vergüteter Kooperationen mit rel="sponsored" oder rel="nofollow"',
    'Verdeckter Kauf von dofollow-Links entgegen Googles Spam-Richtlinien',
  ],
];

export const LB_PAKET_ZEILEN = [
  [
    'Monatlicher Preis (netto)',
    `ab ${e(PREISE.standard)} / Monat`,
    `${e(PREISE.premium)} / Monat`,
    'Individuelles Angebot nach Ziel & Branche',
  ],
  [
    'Redaktionelle Links pro Monat',
    '2 Links / Monat',
    '4 Links / Monat',
    'Projektbezogener Kampagnen-Umfang',
  ],
  [
    'Enthaltene SEO-Inhalte & Keywords',
    '2 Inhalte / Monat, bis zu 20 Keywords',
    '4 Inhalte / Monat, bis zu 50 Keywords',
    'Eigene Studien, Datensätze oder Branchen-Assets',
  ],
  [
    'Strategie & Content-Tiefe',
    'Linkprofil-Audit, Partner- & Fachmedien-Outreach',
    'Zusätzlich systematischer Ausbau zitierfähiger Fachartikel & KI-Monitoring',
    'Konzeption, Datenerhebung, Presse-Outreach & Seeding',
  ],
  [
    'Reporting & Kontrolle',
    'Monatsbericht + 24/7-Kundenportal mit wöchentlichem Link-Check',
    'Monatsbericht + 24/7-Kundenportal inkl. 30 KI-Fragen pro Woche',
    'Dediziertes Kampagnen-Reporting (Domains, Erwähnungen, Traffic)',
  ],
  [
    'Vertragslaufzeit',
    'Monatlich, jederzeit kündbar',
    'Monatlich, jederzeit kündbar',
    'Nach Projektvereinbarung',
  ],
];

export const LB_FAQ = [
  {
    id: 'was-ist-linkbuilding-und-wirkt-es-noch',
    frage: 'Was macht eine Linkbuilding Agentur und wie wichtig sind Backlinks 2026 noch?',
    antwort: 'Linkbuilding bezeichnet den gezielten Aufbau externer Verweise von anderen Websites auf Ihre eigene. Laut Google Search Central nutzt Google Links weiterhin als wichtiges Signal für die Relevanz von Seiten sowie zum Entdecken neuer Inhalte. Verändert hat sich der Maßstab: Hundert billige Verzeichniseinträge bringen nichts mehr - wenige glaubwürdige Verweise aus themennahen Fachmedien, Verbänden und Studien stützen sowohl Google-Rankings als auch Markennennungen in KI-Antworten.',
  },
  {
    id: 'was-kostet-linkbuilding-bei-ihnen',
    frage: 'Was kostet es, bei Ihnen Backlinks aufbauen zu lassen?',
    antwort: `Bei uns ist der Linkaufbau fest in die monatlichen SEO-Pakete integriert: SEO Standard ab ${e(PREISE.standard)} netto pro Monat enthält 2 redaktionelle Links monatlich, SEO Premium für ${e(PREISE.premium)} netto pro Monat enthält 4 redaktionelle Links monatlich. Einzelne Links zum Stückpreis verkaufen wir nicht. Größere Digital-PR-Programme kalkulieren wir nach einem Gespräch über Ihre Branche individuell. Alle Paketpreise finden Sie unter ${verweis('/cennik-pozycjonowania', 'SEO Kosten')}.`,
  },
  {
    id: 'wie-viele-links-und-ranking-garantie',
    frage: 'Wie viele Links erhalte ich pro Monat und garantieren Sie Platz 1 bei Google?',
    antwort: 'Sie erhalten verlässlich den im Paket vereinbarten Umfang: 2 Links pro Monat in SEO Standard und 4 Links pro Monat in SEO Premium. Platz 1 bei Google garantieren wir nicht, da ausschließlich der Google-Algorithmus über die Reihenfolge entscheidet. Wir verpflichten uns vertraglich zu transparentem Leistungsumfang, sauberer Quellenprüfung, monatlichem Bericht und vollem Einblick im 24/7-Kundenportal.',
  },
  {
    id: 'kaufen-sie-links-pbn-oder-linkmiete',
    frage: 'Nutzen Sie PBN-Netzwerke, Linkkauf oder Linkmiete?',
    antwort: 'Nein. Wir nutzen weder private Blognetzwerke (PBNs) noch automatisierte Verzeichnisse oder Linkmiete. Erworbene redaktionelle Erwähnungen und Partnerlinks bleiben nach Ende der Zusammenarbeit dauerhaft bestehen. Googles Spam-Richtlinien werten den Kauf oder Verkauf von Links zur Weitergabe von Ranking-Signalen als Link-Spam; bezahlte Medienkooperationen oder Advertorials sind ausschließlich mit dem Attribut <code>rel=&quot;sponsored&quot;</code> oder <code>rel=&quot;nofollow&quot;</code> zulässig - genau daran halten wir uns ausnahmslos.',
  },
  {
    id: 'wie-pruefe-ich-linkqualitaet',
    frage: 'Wie kann ich die Qualität bestehender Backlinks meiner Domain selbst prüfen?',
    antwort: `Stellen Sie fünf Fragen an jede verweisende Quelle: Passt die Website fachlich zu Ihrer Branche? Hat sie echten organischen Suchverkehr? Steht der Verweis redaktionell im Haupttext? Ist der Ankertext natürlich formuliert? Und wirkt das ausgehende Linkprofil seriös statt wie ein Linknetzwerk? Einen sofortigen Überblick über Ihre aktuelle Linkstärke im Common-Crawl-Graphen liefert unser kostenloser ${verweis('/narzedzia/autorytet-domeny', 'Domain Authority Checker')}.`,
  },
  {
    id: 'wann-zeigen-backlinks-wirkung',
    frage: 'Nach welcher Zeit zeigen neue Backlinks messbare Wirkung?',
    antwort: `Google weist darauf hin, dass Änderungen teils nach wenigen Tagen, bei umkämpften Suchbegriffen jedoch erst nach mehreren Wochen bis Monaten greifen, sobald Quell- und Zielseiten erneut gecrawlt und neu bewertet wurden. Bei überregionalen B2B-Keywords entwickeln sich stabile Top-Positionen meist über 3 bis 6 Monate im Zusammenspiel aus technischem ${verweis('/audyt-seo', 'SEO Audit')}, starken Inhalten und kontinuierlichem Linkaufbau.`,
  },
];

export const LB_QUELLEN = [
  {
    url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable',
    nazwa: 'Google Search Central: Best Practices für crawlbare Links und aussagekräftige Ankertexte',
    data: '2026-11-24',
  },
  {
    url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de',
    nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (Abschnitt Link-Spam und bezahlte Links)',
    data: '2026-11-24',
  },
  {
    url: 'https://developers.google.com/search/docs/crawling-indexing/qualify-outbound-links',
    nazwa: 'Google Search Central: Ausgehende Links kennzeichnen (rel="sponsored", rel="ugc", rel="nofollow")',
    data: '2026-11-24',
  },
  {
    url: 'https://commoncrawl.org/web-graphs',
    nazwa: 'Common Crawl: Host- und Domain-Level Web Graphs (Datengrundlage offener Link-Autoritätsmessung)',
    data: '2026-11-24',
  },
];
