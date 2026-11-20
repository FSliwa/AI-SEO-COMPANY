// Texte der Seite /de/seo-fuer-unternehmen (B2B SEO). Fakten: pozycjonowanie-stron-internetowych/page.js,
// PozycjonowanieClient.jsx, Pricing.jsx. Die Kennzahlen der polnischen "Wachstumsszenarien" (+362 % usw.)
// sind Modellannahmen und werden hier NICHT uebernommen; stattdessen echte Search-Console-Referenzen.
import { PREISE, verweis } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

const e = (n) => eur(n, 'de');

export const B2B_SAEULEN = [
  { kicker: '01 / SICHTBARKEIT', titel: 'Traffic aus Suchanfragen mit Kaufabsicht', text: 'Wir skalieren den Traffic aus Suchanfragen mit hoher Kaufabsicht, auf Basis von Suchintention und semantischer Suche.' },
  { kicker: '02 / STRATEGIE', titel: 'Top 3 für die wichtigsten Keywords', text: 'Wir bringen Ihre wichtigsten Leistungen und Produkte in den Top-3-Bereich der organischen Google-Ergebnisse. Unser Ziel für vereinbarte lokale Keywords: 2 bis 3 Monate, mit den Regeln unter „Ziel Top 3“ auf der Seite SEO Kosten.' },
  { kicker: '03 / ARCHITEKTUR', titel: 'Themen-Cluster und Autorität', text: 'Wir erstellen thematische Cluster, die die Fragen der Nutzer beantworten, und bauen so die Autorität Ihrer Domain auf.' },
  { kicker: '04 / AUTORITÄT', titel: 'Hochwertiger Linkaufbau', text: 'Wir gewinnen redaktionelle Links von angesehenen Portalen und bauen systematisch Vertrauen und Autorität Ihrer Domain auf.' },
];

export const B2B_SCHRITTE = [
  { kicker: 'SCHRITT 1', titel: 'Technischer Audit und Core Web Vitals', text: 'Wir beseitigen Indexierungsfehler, beschleunigen das Laden und verbessern die Architektur der internen Verlinkung.' },
  { kicker: 'SCHRITT 2', titel: 'Content Marketing', text: 'Wir erstellen thematische Cluster und semantisch passende Inhalte, die die Fragen der Nutzer und ihre Suchintention beantworten.' },
  { kicker: 'SCHRITT 3', titel: 'Autorität aufbauen', text: 'Wir gewinnen hochwertige Verweise von angesehenen Portalen und bauen so Vertrauen und Autorität Ihrer Domain auf.' },
];

export const B2B_FAQ = [
  {
    id: 'wie-lange-dauert-seo',
    frage: 'Wie lange dauert SEO für eine Unternehmenswebsite?',
    antwort: 'Erste Effekte auf die Sichtbarkeit zeigen sich 4 bis 8 Wochen nach der technischen Optimierung. Für vereinbarte lokale Keywords ist unser Ziel Top 3 innerhalb von 2 bis 3 Monaten, mit wöchentlich sichtbarem Fortschritt im Kundenportal; wird das Ziel nach 3 Monaten nicht erreicht, arbeiten wir einen weiteren Monat ohne Berechnung. Bei sehr umkämpften überregionalen Keywords bauen sich stabile Spitzenplätze in der Regel über 3 bis 6 Monate auf. Ein Beispiel aus unseren Projekten: Eine neu gestartete Website eines Unternehmens für ISO-Normen hatte in den ersten 18 Tagen 296 Impressionen in Google bei einer durchschnittlichen Position von 34,6 (Google Search Console, Stand August 2026).',
  },
  {
    id: 'ki-statt-klassisches-seo',
    frage: 'Wie unterscheidet sich SEO mit KI vom klassischen SEO?',
    antwort: `Wir analysieren Suchanfragen im Kontext der Suchintention und der semantischen Suche (LLM Search) und optimieren Inhalte für das klassische Google ebenso wie für KI-Suchmaschinen (ChatGPT, Perplexity). Umfang, Preise und die Methode der wöchentlichen Messung in ChatGPT, Gemini und Perplexity beschreiben wir auf der Seite ${verweis('/pozycjonowanie-w-ai', 'Generative Engine Optimization (GEO)')}.`,
  },
  {
    id: 'garantie-platz-1',
    frage: 'Garantiert SEO Platz 1 in Google?',
    antwort: `Nein. Platz 1 garantieren wir nicht, denn über die Reihenfolge entscheidet Google. Zusichern können wir nur das, was auf unserer Seite liegt: Arbeitsumfang, Termine, ein Kundenportal mit aktuellen Daten, einen Monatsbericht darüber, was wir getan haben und wie sich die Sichtbarkeit verändert hat, sowie das Ziel Top 3 für vereinbarte lokale Keywords in 2 bis 3 Monaten. Erreichen wir es nicht, arbeiten wir einen weiteren Monat ohne Berechnung (${verweis('/cennik-pozycjonowania', 'Regeln zum Ziel Top 3')}).`,
  },
  {
    id: 'seo-und-online-marketing',
    frage: 'Wodurch unterscheidet sich SEO von Online-Marketing?',
    antwort: 'Online-Marketing umfasst alles, was Sie in Online-Kanälen tun: bezahlte Werbung, Social Media, E-Mail, Inhalte. SEO ist einer dieser Kanäle und verantwortet ausschließlich die Sichtbarkeit in den Suchergebnissen. Der praktische Unterschied betrifft den Zeithorizont: Werbung bringt am Tag, an dem das Budget endet, keine Klicks mehr, organisch aufgebaute Positionen arbeiten weiter. Deshalb betrachten wir beide Kanäle als sich ergänzend und nicht als konkurrierend.',
  },
  {
    id: 'seo-ohne-weiteres-marketing',
    frage: 'Ergibt SEO ohne weitere Marketingmaßnahmen Sinn?',
    antwort: 'Ja, aber langsamer. Der Traffic aus der Suche landet auf einer Seite, die überzeugen muss: Sind Angebot, Belege und Kontaktweg schwach, erhöht eine bessere Position die Zahl der Besuche, nicht die der Anfragen. Deshalb betrachten wir bei jeder Umsetzung auch die Conversion und nicht nur die Positionen.',
  },
  {
    id: 'was-ist-seo',
    frage: 'Was ist SEO eigentlich, und woher kommt die Bezeichnung?',
    antwort: 'SEO steht für Search Engine Optimization, also Suchmaschinenoptimierung. Sie umfasst drei Bereiche: Technik (kann die Suchmaschine die Seite indexieren und schnell laden), Inhalt (beantwortet die Seite die Suchintention) und Autorität (verweisen andere Websites auf sie). Fehlt einer der drei, begrenzt das die Wirkung der anderen beiden.',
  },
  {
    id: 'inhouse-und-agenturen',
    frage: 'Arbeiten Sie mit In-House-Teams und anderen Agenturen zusammen?',
    antwort: 'Ja, in beiden Konstellationen. Bei In-House-Teams übernehmen wir meist den technischen Teil - Audit, Informationsarchitektur, Performance-Korrekturen -, Redaktion und Kampagnen bleiben bei ihnen. Kreativ- und Mediaagenturen liefern wir die Suchmaschinen-Ebene als White-Label-Leistung, ohne Kontakt zu deren Endkunden. In beiden Fällen legen wir Umfang und Aufgabenverteilung vor dem Start schriftlich fest.',
  },
  {
    id: 'seo-fuer-kleine-unternehmen',
    frage: 'Lohnt sich SEO für ein kleines Unternehmen?',
    antwort: `Ja, wenn Kunden Ihre Leistung in Google suchen. Kleine Unternehmen beginnen meist mit lokalem SEO und dem Google Unternehmensprofil, weil das die schnellste Quelle erster Anfragen ist. SEO für kleine Unternehmen betreuen wir im Paket Standard: bis zu 20 Keywords, 2 Inhalte und 2 Links pro Monat, ab ${e(PREISE.standard)} netto, mit Monatsvertrag (${verweis('/cennik-pozycjonowania', 'SEO Kosten')}).`,
  },
];
