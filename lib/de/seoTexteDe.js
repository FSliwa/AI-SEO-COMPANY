// Texte fuer /de/seo-texte-schreiben (Schluessel PL: /copywriting-seo; Stand: 24.11.2026).
// Reiner ESM-Code ohne React. Preise aus lib/de/uslugiGemeinsam.js (PREISE), keine langen Gedankenstriche.
// Fakten 1:1 synchron zu lib/copywritingSeo.js, lib/copywritingSeo.en.js und lib/de/uslugiGemeinsam.js:
// Copywriting wird NICHT einzeln oder pro Wort/Zeichen verkauft, sondern ist fester Bestandteil der monatlichen SEO-Pakete.

import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const TEXTE_KURZANTWORT = `Professionelles SEO Copywriting verbindet fachliche Überzeugungskraft mit einer klaren Seiten- und Antwortstruktur für Google und KI-Systeme. Wir verkaufen keine Einzeltexte nach Wort- oder Zeichenpreis: Wenn Unternehmen bei uns SEO Texte schreiben lassen, entstehen diese fest integriert in unsere monatlichen Pakete - 2 Inhalte pro Monat in SEO Standard (ab ${e(PREISE.standard)} netto/Monat, bis zu 20 Keywords) und 4 Inhalte pro Monat in SEO Premium (${e(PREISE.premium)} netto/Monat, bis zu 50 Keywords inklusive wöchentlichem KI-Monitoring). Jeder Beitrag basiert auf einem 10-Felder-Briefing, Answer-First-Absätzen von 40 bis 60 Wörtern, geprüften Primärquellen, interner Hub-and-Spoke-Verlinkung und Ihrer Freigabe im 24/7-Kundenportal.`;

export const TEXTE_BAUSTEINE = [
  {
    kicker: '01 / 10-FELDER-BRIEFING',
    titel: 'SERP-Analyse & Information Gain vor der ersten Zeile',
    text: 'Bevor wir SEO-Texte schreiben, analysieren wir die Top-5-Ergebnisse in Google für das Ziel-Cluster: Welche Fragen beantworten bereits alle Wettbewerber und welche konkreten Daten, Rechenwege oder Grenzfälle fehlen? Ein verbindliches 10-Felder-Briefing ordnet genau eine Suchintention einer eindeutigen Ziel-URL zu und verhindert interne Keyword-Kannibalisierung.',
    lieferung: ['1 Intention = 1 URL', 'Top-5-SERP-Check', '10-Felder-Briefing'],
  },
  {
    kicker: '02 / ANSWER-FIRST & GEO',
    titel: 'KI-zitierbare Inhalte in 40- bis 60-Wort-Blöcken',
    text: 'Jede zentrale H2-Zwischenüberschrift greift eine echte Einkäufer- oder Fachfrage auf und startet unmittelbar mit einer präzisen Kurzantwort von 40 bis 60 Wörtern. Danach folgen Tabellen, Beispiele und Einordnungen. Diese Struktur erleichtert Entscheidern das schnelle Erfassen und erhöht die Chance, in Google AI Overviews, ChatGPT Search und Perplexity zitiert zu werden.',
    lieferung: ['40-60 Wörter je H2', 'Saubere H1-H2-H3', 'RAG-tauglicher Aufbau'],
  },
  {
    kicker: '03 / QUELLEN & HUB-SPOKE',
    titel: 'B2B Fachtexte mit Primärquellen und interner Architektur',
    text: 'Belastbare B2B Fachtexte dulden keine erfundenen Zahlen. Wir belegen technische Schwellenwerte, Gesetzeshinweise und Marktstatistiken direkt am Fakt mit offiziellen Primärquellen samt Abrufdatum. Gleichzeitig verknüpfen wir jeden neuen Artikel wechselseitig im Hub-and-Spoke-System mit Ihren kaufnahen Leistungsseiten.',
    lieferung: ['Geprüfte Primärquellen', 'Hub-and-Spoke-Links', 'Autoren-Byline & Datum'],
  },
  {
    kicker: '04 / PORTAL & RECHTE',
    titel: 'Freigabe im 24/7-Kundenportal & volle Nutzungsrechte',
    text: 'Kein Text geht ungeprüft online: Im 24/7-Kundenportal (Oberfläche auf Polnisch und Englisch) prüfen Sie jeden Entwurf und geben ihn mit einem Klick frei oder hinterlassen Änderungswünsche. Jede Arbeitsstunde steht nachvollziehbar im Arbeitsprotokoll, und mit Bezahlung der Rechnung gehen die vollen Nutzungsrechte auf Ihr Unternehmen über.',
    lieferung: ['1-Klick-Freigabe', 'Stunden im Protokoll', 'Volle Nutzungsrechte'],
  },
];

export const TEXTE_VERGLEICH_ZEILEN = [
  [
    'Ausgangspunkt',
    'Werbebotschaft oder isolierte Textbestellung nach Bauchgefühl',
    'Konkrete Suchanfrage Ihrer Zielgruppe, Suchintention und Seitenrolle im Funnel',
  ],
  [
    'Recherche vor Schreibbeginn',
    'Kurzer Blick auf das eigene Produktblatt oder KI-Rohtext ohne Abgleich',
    'Systematische Auswertung der Top-5-Google-Ergebnisse plus gezielter Information Gain',
  ],
  [
    'Textumfang & Abrechnung',
    'Pauschaler Preis pro Wort oder Zeichen führt oft zu künstlich gestreckten Absätzen',
    'Umfang nach fachlicher Tiefe statt Wortpreis; Google hat keine bevorzugte Wortanzahl',
  ],
  [
    'Aufbau für KI-Antworten',
    'Lange Einleitungen, hinter denen die eigentliche Antwort erst am Seitenende steht',
    'Answer-First-Blöcke (40-60 Wörter direkt unter H2) für AI Overviews, ChatGPT & Perplexity',
  ],
  [
    'Quellen & interne Verlinkung',
    'Unbelegte Aussagen, isolierte Unterseite ohne Rücklinks aus bestehenden Hubs',
    'Verifizierte Primärquellen je Fakt sowie wechselseitige Hub-and-Spoke-Verlinkung',
  ],
  [
    'Nach der Veröffentlichung',
    'Auftrag gilt mit Textabgabe als erledigt - keine Kontrolle der Wirkung',
    'Laufende Messung in der Search Console und gezielte Aktualisierung bei Positionsverlusten',
  ],
];

export const TEXTE_PAKET_ZEILEN = [
  [
    'SEO Standard',
    `ab ${e(PREISE.standard)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    `2 Inhalte pro Monat, bis zu 20 Keywords, 2 Links/Monat, technischer SEO-Audit, Google Unternehmensprofil & 24/7-Kundenportal (KI-Monitoring optional +${e(PREISE.geoZuschlag)}/Monat)`,
  ],
  [
    'SEO Premium',
    `${e(PREISE.premium)} netto / Monat`,
    'Monatsvertrag, jederzeit kündbar',
    '4 Inhalte pro Monat, bis zu 50 Keywords, 4 Links/Monat, strategischer Ausbau von Fachartikeln, CRO sowie wöchentliches KI-Monitoring (30 Kundenfragen/Woche)',
  ],
  [
    'Booster Pack (Website + SEO)',
    `${e(PREISE.booster)} netto / Monat`,
    'Mindestens 3 Monate, danach monatlich',
    'Kompletter Neubau Ihrer Website in Next.js (0 € separater Einmalpreis) inklusive Seitenarchitektur, Hosting, SSL und vollständiger SEO-Betreuung',
  ],
];

export const TEXTE_PROZESS_SCHRITTE = [
  [
    'Keyword-Cluster & Kannibalisierungs-Prüfung:',
    'Wir bündeln Suchbegriffe mit identischer Suchintention auf genau einer Ziel-URL und prüfen in Ihrer Search Console, ob bereits eine bestehende Unterseite zu diesem Thema rankt.',
  ],
  [
    'Top-5-SERP- & Information-Gain-Analyse:',
    'Wir werten die fünf bestplatzierten Seiten in Google aus, dokumentieren Pflichtfragen und ergänzen echte Mehrwerte wie Vergleichstabellen, Rechenbeispiele oder Praxiskriterien.',
  ],
  [
    'Verbindliches 10-Felder-Content-Briefing:',
    'Ziel, Lesergruppe, H1- bis H3-Gliederung, geplante interne Links, Primärquellen und Tonalität werden fixiert, bevor der eigentliche Schreibprozess startet.',
  ],
  [
    'Ausarbeitung mit Answer-First-Struktur & Quellenprüfung:',
    'Der Fachbeitrag oder Leistungstext beantwortet die Kernfrage sofort im Einstieg (40-60 Wörter je H2), vermeidet Keyword-Stuffing und verknüpft jeden Zahlenwert mit seiner Originalquelle.',
  ],
  [
    'Freigabe im Kundenportal & sauberer Go-Live:',
    'Nach Ihrer 1-Klick-Freigabe im Portal veröffentlichen wir den Inhalt inklusive geprüfter Meta-Daten, genau einer H1, passendem JSON-LD-Schema, Autorenangabe und beidseitigen internen Links.',
  ],
  [
    'Wirkungsmessung & Content-Refresh:',
    'Impressionen, Klicks, durchschnittliche Positionen und Kontaktanfragen laufen in der Search Console und im Kundenportal zusammen; verliert ein Beitrag später an Sichtbarkeit, aktualisieren wir ihn gezielt.',
  ],
];

export const TEXTE_FAQ = [
  {
    id: 'was-ist-seo-copywriting',
    frage: 'Was ist SEO Copywriting und worin unterscheidet es sich von klassischen Werbetexten?',
    antwort: 'Klassische Werbetexte sollen überzeugen, sobald jemand bereits auf der Seite ist. SEO Copywriting leistet beides: Der Text beantwortet eine reale Suchanfrage präzise, ist auf genau eine Suchintention und eine eindeutige URL ausgerichtet und führt fachkundige Leser nachvollziehbar zur Anfrage. Da Google laut eigener Dokumentation hilfreiche Inhalte für Menschen statt Suchmaschinen-Texte belohnt, wachsen Fachredaktion und Suchmaschinenoptimierung eng zusammen.',
  },
  {
    id: 'kosten-seo-texte-schreiben-lassen',
    frage: 'Was kostet es, bei Ihnen SEO Texte schreiben zu lassen?',
    antwort: `Wir führen keine separate Preisliste pro Wort, Zeichen oder Einzelartikel. Unsere Redaktion ist fester Bestandteil der monatlichen Betreuung: SEO Standard ab ${e(PREISE.standard)} netto pro Monat umfasst 2 Inhalte, SEO Premium für ${e(PREISE.premium)} netto pro Monat 4 Inhalte - jeweils inklusive technischem Audit, Linkaufbau und 24/7-Kundenportal. Den vollständigen Paketvergleich sehen Sie unter ${verweis('/cennik-pozycjonowania', 'SEO Kosten')}.`,
  },
  {
    id: 'einzeltexte-ohne-seo-paket',
    frage: 'Kann ich auch einzelne Fachtexte ohne laufendes SEO-Paket bestellen?',
    antwort: `Nein, Einzelbestellungen auf Zuruf bieten wir bewusst nicht an. Selbst ein starker Fachtext rankt kaum, wenn Ladezeit, Indexierung, interne Verlinkung oder Domain-Autorität bremsen. Wenn Sie Texte intern mit Ihrem eigenen Team verfassen möchten, können Sie jedoch unsere kostenlose ${verweis('/narzedzia/brief-dla-copywritera', 'Briefing Vorlage für Texter')} und die ${verweis('/narzedzia/content-plan', 'Redaktionsplan Vorlage')} als PDF herunterladen.`,
  },
  {
    id: 'optimale-wortanzahl-seo-text',
    frage: 'Wie viele Wörter muss ein guter SEO-Text für Google haben?',
    antwort: 'So viele Wörter, wie für eine vollständige und belastbare Antwort nötig sind - nicht mehr und nicht weniger. Google stellt in den Richtlinien zu hilfreichen Inhalten ausdrücklich klar, dass es keine bevorzugte Wortanzahl gibt. Eine künstlich aufgeblähte Zeichenzahl schadet der Lesbarkeit im B2B eher. Wir leiten den sinnvollen Umfang als Orientierungswert aus den Top-5-Ergebnissen und der Komplexität des Themas ab.',
  },
  {
    id: 'ki-einsatz-und-qualitaetssicherung',
    frage: 'Wie stellen Sie sicher, dass Inhalte nicht als KI-Spam gewertet werden und sachlich stimmen?',
    antwort: `Googles Spam-Richtlinien richten sich gezielt gegen massenhaft erzeugte Inhalte ohne eigenen Mehrwert (Scaled Content Abuse). Bei uns durchläuft jeder Text SERP-Recherche, 10-Felder-Briefing, menschliche Fachredaktion, Faktenprüfung anhand verlinkter Primärquellen sowie Ihre Freigabe im Kundenportal. Ob bestehende Unterseiten bereits zitierfähig aufgebaut sind, testen Sie kostenlos mit unserem Tool ${verweis('/narzedzia/sprawdz-cytowalnosc-strony-ai', 'GEO-Zitierbarkeit prüfen')}.`,
  },
  {
    id: 'nutzungsrechte-nach-vertragsende',
    frage: 'Wem gehören die geschriebenen SEO-Texte nach einer Kündigung?',
    antwort: 'Ihnen. Sobald die jeweilige Monatsrechnung beglichen ist, gehen sämtliche urheberrechtlichen Nutzungsrechte an den für Sie erstellten Leistungsseiten, Ratgebern und Kategoriebeschreibungen dauerhaft auf Ihr Unternehmen über. Auch nach Ende der Zusammenarbeit bleiben alle veröffentlichten Texte uneingeschränkt auf Ihrer Website.',
  },
];

export const TEXTE_QUELLEN = [
  {
    url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content?hl=de',
    nazwa: 'Google Search Central: Hilfreiche, zuverlässige und nutzerorientierte Inhalte erstellen (keine bevorzugte Wortanzahl, E-E-A-T-Selbsttest)',
    data: '2026-11-24',
  },
  {
    url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de',
    nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (Keyword-Stuffing und Missbrauch durch skalierte Inhalte)',
    data: '2026-11-24',
  },
  {
    url: 'https://developers.google.com/search/docs/appearance/ai-features',
    nazwa: 'Google Search Central: KI-Funktionen (AI Overviews & AI Mode) und strukturierte Inhalte auf Websites',
    data: '2026-11-24',
  },
];
