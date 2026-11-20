// Texte der Seite /de/seo-audit (Quelle der Fakten: app/[locale]/audyt-seo/page.js, AudytClient.jsx).
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');
const KEY_B2B = '/pozycjonowanie-stron-internetowych';
const KEY_TOOL = '/narzedzia/audyt-seo';
const KEY_GEO = '/pozycjonowanie-w-ai';
const KEY_KOSTEN = '/cennik-pozycjonowania';

export const AUDIT_BEREICHE = [
  { kicker: 'BEREICH 1', titel: 'Technik und Core Web Vitals', text: 'Analyse der Core Web Vitals (LCP, CLS, INP), der HTTP-Statuscodes und Weiterleitungen sowie Beseitigung von Hürden für Crawler.' },
  { kicker: 'BEREICH 2', titel: 'Inhalte und Semantik', text: 'Prüfung der Suchintention, Optimierung der Inhalte, Analyse von Keyword-Kannibalisierung und der Abdeckung thematischer Cluster.' },
  { kicker: 'BEREICH 3', titel: 'Linkprofil und Autorität', text: 'Prüfung eingehender Links auf schädliche Muster, Analyse der Ankertexte und Untersuchung der verweisenden Domains.' },
];

export const AUDIT_PRUEFFELDER = [
  { kicker: '01 / GESCHWINDIGKEIT', titel: 'PageSpeed und Core Web Vitals', text: 'Wir benennen und priorisieren renderblockierendes JavaScript sowie Bilder, die in modernen Formaten (WebP/AVIF) komprimiert werden sollten. Die Umsetzung können Sie im Rahmen der Betreuung bei uns beauftragen.' },
  { kicker: '02 / INDEXIERUNG', titel: 'Crawl Budget und Indexierung', text: 'Wir benennen und priorisieren Weiterleitungsschleifen, doppelte Canonical-Tags und Unterseiten mit dem Status 404. Die Behebung können Sie bei uns beauftragen.' },
  { kicker: '03 / SEMANTIK', titel: 'Überschriftenstruktur und Schema Markup', text: 'Wir zeigen die richtige H1-H3-Struktur und markieren fehlende oder fehlerhafte strukturierte Daten nach Schema.org. Die Umsetzung können Sie bei uns beauftragen.' },
  { kicker: '04 / PERFORMANCE', titel: 'Serverantwortzeit (TTFB)', text: 'Wir geben Empfehlungen für den Server und beraten zu Caching und CDN.' },
];

// Typische Befunde: bewusst OHNE Zahlen (auf der polnischen Seite sind die Kennzahlen der Karten Modellannahmen).
export const AUDIT_BEFUNDE = [
  { kicker: 'BEFUND 01 / INDEXIERUNG', titel: 'Crawl Budget geht an doppelte URLs verloren', text: 'Doppelte Adressen und Weiterleitungsschleifen verbrauchen das Crawl Budget. Wichtige Seiten werden dadurch seltener erfasst und fehlen in den Suchergebnissen.' },
  { kicker: 'BEFUND 02 / SPEED UND CWV', titel: 'Langsamer Seitenaufbau auf dem Smartphone', text: 'Ein durch unoptimiertes JavaScript blockierter Haupt-Thread und nicht komprimierte Bilder verschlechtern die Ladezeit. Besucher auf dem Smartphone springen ab.' },
  { kicker: 'BEFUND 03 / STRUKTURIERTE DATEN', titel: 'Fehlendes oder fehlerhaftes Schema Markup', text: 'Fehlende oder falsche strukturierte Daten verringern die Chance auf erweiterte Suchergebnisse (Bewertungen, Preise, Verfügbarkeit). Für die KI-Funktionen in Google sind sie nicht erforderlich.' },
  { kicker: 'BEFUND 04 / LINKS', titel: 'Auffällige Linkmuster', text: 'Massenhafter Spam und schädliche verweisende Domains können Filter auslösen. Das Disavow-Tool ziehen wir nur bei massivem Spam und einer manuellen Maßnahme in Betracht.' },
  { kicker: 'BEFUND 05 / KANNIBALISIERUNG', titel: 'Unterseiten konkurrieren um dieselben Keywords', text: 'Mehrere Seiten treten für dieselben Keywords an. Es fehlen Canonical-Tags (rel="canonical"), und Filterparameter werden nicht korrekt behandelt.' },
  { kicker: 'BEFUND 06 / HTML-SEMANTIK', titel: 'Fehlerhafte Überschriftenhierarchie', text: 'Ungeeignete HTML-Struktur, fehlende Alt-Texte bei Bildern und leere Title-Tags erschweren es Google, die Suchintention zu erkennen.' },
];

export const AUDIT_VARIANTEN = [
  ['SEO Audit als eigenständige Leistung', `ab ${e(PREISE.audit)}`, '3 bis 5 Werktage', 'Mehr als 50 Prüfpunkte, Maßnahmenliste mit Prioritäten und ein Besprechungstermin'],
  ['SEO Audit im Betreuungspaket', `im Paketpreis enthalten (ab ${e(PREISE.standard)} / Monat)`, 'zum Start der Zusammenarbeit', 'Derselbe Umfang, dazu die Umsetzung der Korrekturen'],
  ['KI-Sichtbarkeit Audit', e(PREISE.geoAudit), '5 Werktage', '30 Fragen in 4 Quellen, 5 von den Modellen empfohlene Konkurrenten und 10 Empfehlungen'],
];

export const AUDIT_FAQ = [
  {
    id: 'was-enthaelt-ein-seo-audit',
    frage: 'Was enthält ein professioneller SEO Audit?',
    antwort: 'Ein SEO Audit umfasst mehr als 50 Prüfpunkte, darunter die Analyse der Core Web Vitals, die Indexierung in Google, die Struktur von Überschriften und URLs, das Backlink-Profil, die Keyword-Recherche und Hinweise zu UX und Conversion-Optimierung. Wir gliedern das Audit in drei Bereiche: Technik und Core Web Vitals, Inhalte und Semantik sowie Linkprofil.',
  },
  {
    id: 'seo-audit-kosten',
    frage: 'Was kostet ein SEO Audit?',
    antwort: `Das SEO Audit ist in jedem Betreuungspaket enthalten (ab ${e(PREISE.standard)} netto pro Monat), denn mit ihm beginnen wir jede Zusammenarbeit. Als eigenständige Leistung kostet es ab ${e(PREISE.audit)} netto. Der endgültige Preis hängt von der Größe der Website ab: Eine Unternehmenswebsite mit 20 Unterseiten ist eine andere Aufgabe als ein Shop mit 5.000 Produkten. Das Angebot erhalten Sie innerhalb von 24 Stunden an Werktagen, ohne Gespräch mit einem Vertriebsmitarbeiter. ${verweis(KEY_KOSTEN, 'Alle Preise im Überblick')}.`,
  },
  {
    id: 'dauer-seo-audit',
    frage: 'Wie lange dauert die Erstellung eines SEO Audits?',
    antwort: 'Die übliche Bearbeitungszeit für ein vollständiges SEO Audit beträgt 3 bis 5 Werktage. Nach Übergabe des Berichts besprechen wir ihn in einem gemeinsamen Termin.',
  },
  {
    id: 'technischer-audit-und-content-audit',
    frage: 'Was unterscheidet ein technisches Audit von einem Content-Audit?',
    antwort: 'Das technische Audit prüft, ob Google die Website indexieren und schnell laden kann: Core Web Vitals, Weiterleitungen, Canonical-Tags, URL-Struktur und Sitemap. Der Content-Audit bewertet, ob die Seite die Suchintention beantwortet: Themenabdeckung, Überschriftenstruktur, Keyword-Kannibalisierung und Lücken gegenüber der Konkurrenz. Der erste beseitigt Hürden, der zweite schafft Relevanz. Vollständige Optimierung braucht beides.',
  },
  {
    id: 'audit-oder-umsetzung',
    frage: 'Reicht das Audit allein, oder brauche ich auch die Umsetzung?',
    antwort: `Ein Audit allein verändert keine Positionen: Er ist eine Diagnose, keine Behandlung. Der Bericht enthält eine nach Wirkung und Aufwand sortierte Aufgabenliste, die Ihr eigenes Team oder Ihr Entwickler umsetzen kann. Solange die Empfehlungen nicht umgesetzt sind, schlägt sich das Ergebnis nicht in der Sichtbarkeit nieder. Die Umsetzung können Sie bei uns im Rahmen von ${verweis(KEY_B2B, 'B2B SEO')} beauftragen.`,
  },
  {
    id: 'haeufigkeit-seo-audit',
    frage: 'Wie oft sollte man ein SEO Audit wiederholen?',
    antwort: 'Ein vollständiger Audit alle 6 bis 12 Monate genügt den meisten Websites. Früher lohnt sich die Wiederholung in drei Fällen: nach einer Migration oder einem Relaunch, nach einem bedeutenden Google-Update und nach einem plötzlichen Sichtbarkeitsverlust ohne bekannte Ursache. Zwischen den Audits reichen laufendes Positions-Monitoring und die Search Console.',
  },
  {
    id: 'zugaenge-fuer-den-audit',
    frage: 'Welche Zugänge brauchen Sie für das Audit?',
    antwort: 'Für ein belastbares Audit brauchen wir Zugriff auf die Google Search Console und Google Analytics, die einzigen Primärquellen für Daten zu Ihrer Domain. Hilfreich sind außerdem der Zugang zum CMS und Angaben zum Hosting, damit wir Serverantwortzeiten und die Konfiguration der Weiterleitungen prüfen können. Ein Audit ist auch ohne diese Zugänge möglich, stützt sich dann aber nur auf externe Daten und ist weniger genau.',
  },
  {
    id: 'audit-fuer-neue-website',
    frage: 'Lohnt sich ein SEO Audit für eine neue Website ohne Traffic?',
    antwort: 'Ja, aber der Umfang ist ein anderer. Eine neue Domain hat noch keine Daten zu Positionen oder Klicks, deshalb konzentriert sich das Audit auf die Grundlagen: Indexierbarkeit, URL-Struktur, Inhaltsarchitektur und Keyword-Plan. Das ist der günstigste Zeitpunkt, um Fehler zu beheben, weil später keine URLs migriert werden müssen. Sinnlos ist ein Audit dagegen, solange die Website noch entsteht und ihre Struktur nicht feststeht.',
  },
  {
    id: 'inhalt-des-auditberichts',
    frage: 'Was genau erhalte ich im Auditbericht?',
    antwort: 'Der Bericht enthält die Liste der gefundenen Fehler mit der Einschätzung ihrer Wirkung auf die Sichtbarkeit, eine Priorisierung der Aufgaben nach dem Verhältnis von Wirkung und Aufwand, die konkreten URLs, die überarbeitet werden müssen, und technische Empfehlungen, die Sie direkt an einen Entwickler weitergeben können. Nach der Übergabe besprechen wir ihn in einem Termin, um gemeinsam die Reihenfolge der Umsetzung festzulegen.',
  },
  {
    id: 'shops-und-wordpress',
    frage: 'Deckt das Audit Onlineshops und WordPress-Websites ab?',
    antwort: 'Ja. Der Prüfumfang ist unabhängig von der Technologie derselbe, es ändern sich die typischen Probleme. In Onlineshops untersuchen wir am häufigsten die Kannibalisierung zwischen Kategorien, den Umgang mit Filtern und URL-Parametern und das Crawl Budget. Bei WordPress sind überflüssige Plugins, doppelte Schlagwort- und Archivseiten und die Performance des Themes häufige Fehlerquellen.',
  },
  {
    id: 'audit-oder-kostenloses-tool',
    frage: 'Wie unterscheidet sich ein SEO Audit von einem kostenlosen Bericht eines Online-Tools?',
    antwort: `Kostenlose Tools erkennen Fehler anhand einer starren Regelliste und kennen den geschäftlichen Zusammenhang nicht. Sie zeigen, dass ein Wort im Title fehlt, beurteilen aber nicht, ob die Seite die Suchintention beantwortet oder welche der zweihundert gefundenen Mängel die Sichtbarkeit tatsächlich beeinflussen. Ein Audit ist die Auswertung dieser Daten: Rauschen aussortieren, priorisieren und entscheiden, was zuerst geschieht und was bewusst unangetastet bleibt. Die automatische Analyse eines Tools ist ein guter Ausgangspunkt, im Audit stellen wir ihre Ergebnisse den Daten aus Ihrer Google Search Console gegenüber. Wenn Sie zuerst selbst prüfen möchten: ${verweis(KEY_TOOL, 'kostenloses SEO Audit')}.`,
  },
  {
    id: 'seo-audit-und-ki-sichtbarkeit',
    frage: 'Umfasst das SEO Audit auch die Sichtbarkeit in ChatGPT und KI-Antworten?',
    antwort: `Das klassische SEO Audit prüft die Sichtbarkeit in Google. Die Sichtbarkeit in ChatGPT, Gemini und Perplexity untersuchen wir getrennt im ${verweis(KEY_GEO, 'KI-Sichtbarkeit Audit')} für ${e(PREISE.geoAudit)} netto: 30 Fragen in 4 Quellen, 5 von den Modellen empfohlene Konkurrenten und 10 Empfehlungen. Die Kosten dieses Audits rechnen wir auf den ersten Monatsbeitrag an.`,
  },
];
