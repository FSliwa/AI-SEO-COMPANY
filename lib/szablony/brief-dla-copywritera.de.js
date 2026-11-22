// Szablon „Briefing Vorlage für Texter” (Faza 4 DE, 22.11.2026): niemiecki blok `de` dla
// lib/szablony/brief-dla-copywritera.js (/de/tools/briefing-vorlage-texter).
// PDF: public/pliki/de/briefing-vorlage-texter.pdf.
// Klare Abgrenzung: Briefing für EINEN konkreten SEO-Text / Leistungsbeitrag (Content Briefing Vorlage),
// während /de/tools/website-briefing-vorlage das Lastenheft für eine gesamte Website abdeckt.

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und nutzerorientierte Inhalte erstellen (Originalität, Autoren, keine Zielwortzahl)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: Startleitfaden zur Suchmaschinenoptimierung (Überschriften, Ankertexte, Title & Snippet)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam-Richtlinien (Keyword-Stuffing und Missbrauch durch massenhaft erstellte Inhalte)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/using-gen-ai-content', nazwa: 'Google Search Central: Umgang mit generativen KI-Inhalten und menschliche Faktenprüfung', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen in der Suche (AI Overviews & AI Mode) und Ihre Website', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search-Console-Hilfe: Leistungsbericht (Suchanfragen, Klicks, CTR und Kannibalisierung prüfen)', data: '2026-11-11' },
];

export const TEILE_BRIEF_TEXTER_DE = [
  {
    nr: 1,
    nazwa: 'Auftragsdaten & Eckpunkte',
    opis: 'Was entsteht, unter welcher URL erscheint der Text und bis wann liegen Gliederung und Entwurf vor?',
    pola: [
      'Arbeitstitel des Beitrags',
      'Textart: ☐ Ratgeber / Fachartikel ☐ Leistungsseite ☐ Kategorieseite ☐ Vergleich ☐ Content-Refresh (Bestandsseite)',
      'Ziel-URL (neu oder bestehend)',
      'Auftraggeber & fachlicher Ansprechpartner für Rückfragen',
      'Texterin / Texter & Fachprüfer (Freigabe)',
      'Termine für Gliederung, Erstentwurf und Livegang',
      'Umfangskorridor aus der Top-5-Analyse (Orientierungswert, kein künstliches Wortziel)',
      'Vereinbarte Korrekturschleifen im Honorar',
    ],
  },
  {
    nr: 2,
    nazwa: 'Geschäftsziel & Zielgruppe',
    opis: 'Warum investiert das Unternehmen in genau diesen Text und wer liest ihn in welcher Kaufsituation?',
    pola: [
      'Geschäftsziel: welche konkrete Handlung soll auf die Lektüre folgen (Anfrage, Terminbuchung, Download, Wechsel zur Leistungsseite)?',
      'Primärer Call-to-Action (CTA) inklusive exakter Ziel-URL',
      'Zielgruppe / Rolle im Buying Center (z. B. Einkaufsleitung, Geschäftsführung, IT-Leitung, Bauherr)',
      'Entscheidungsphase: ☐ Problem verstehen (TOFU) ☐ Optionen vergleichen (MOFU) ☐ Anbieter auswählen (BOFU)',
      'Typische Kundenfragen, Einwände und Fehlannahmen aus Vertriebsgesprächen und E-Mails',
    ],
  },
  {
    nr: 3,
    nazwa: 'Haupt-Keyword, Suchintention & Abgrenzung',
    opis: 'Ein Suchintentions-Cluster entspricht genau einer URL - so verhindern Sie interne Kannibalisierung.',
    pola: [
      'Haupt-Keyword inklusive Suchvolumen, Markt (DE / AT / CH) und Abrufdatum',
      'Neben-Keywords & enge Synonyme (nur mit identischer Suchintention)',
      'Suchintention: ☐ Informationell ☐ Kommerziell (Vergleich) ☐ Transaktional ☐ Navigational',
      'Gewinner-Format in den SERPs: ☐ Schritt-für-Schritt-Leitfaden ☐ Vergleichstabelle ☐ Leistungsseite ☐ Vorlage / Rechner',
      'Bewusste Abgrenzung (Out of Scope): Themen und Keywords, die anderen URLs Ihrer Website gehören',
    ],
  },
  {
    nr: 4,
    nazwa: 'SERP-Analyse: Google Top 5 & AI Overviews',
    opis: 'Prüfen Sie die ersten fünf organischen Treffer im Inkognito-Fenster, bevor die Gliederung entsteht.',
    tabela: {
      kolumny: ['Platz', 'Wettbewerber-URL', 'Seitentyp', 'Abgedeckte Pflichtpunkte', 'Inhaltliche Schwäche / Lücke'],
      wiersze: ['1', '2', '3', '4', '5'],
    },
    pola: [
      'Pflichtinhalte (Themen, die alle Seiten der Top 5 zwingend beantworten)',
      'Google AI Overview / ChatGPT-Suche: ☐ vorhanden ☐ nicht vorhanden - welche Kernfrage wird beantwortet und wer wird zitiert?',
      'Echte Nutzerfragen aus „Ähnliche Fragen“ (People Also Ask) und Suchvorschlägen',
    ],
  },
  {
    nr: 5,
    nazwa: 'Eigener Mehrwert (Information Gain) & Zulieferungen',
    opis: 'Mindestens ein konkreter Baustein, den kein Wettbewerber aus den Top 10 einfach abschreiben konnte.',
    pola: [
      'Unser Vorsprung: ☐ eigene Projektdaten ☐ anonymisiertes Fallbeispiel ☐ reale Preisspannen ☐ eigene Fotos/Screenshots ☐ Expertenzitat ☐ Tabelle / Checkliste',
      'Konkrete Beschreibung des Mehrwerts und Datenquelle im Unternehmen',
      'Interne Zulieferungen: welches Material liefert wer bis zu welchem Datum?',
      'Interne Fachexpertin / Fachexperte für Kurzinterview oder Faktenabnahme (Name, Position)',
    ],
  },
  {
    nr: 6,
    nazwa: 'Textstruktur & Answer-First-Einstieg',
    opis: 'Geben Sie die H2-/H3-Gliederung frei, bevor die Ausformulierung beginnt - das spart 80 % späterer Korrekturen.',
    pola: [
      'H1-Überschrift (präzise, mit Haupt-Keyword, max. eine H1 pro Seite)',
      'Direktantwort im ersten Absatz (40 bis 60 Wörter: beantwortet die Hauptfrage sofort ohne Vorrede)',
    ],
    tabela: {
      kolumny: ['Ebene (H2 / H3)', 'Beantwortete Leserfrage', 'Pflichtfakten, Zahlen, Beispiele oder Tabellen'],
      wiersze: ['H2', 'H3', 'H2', 'H2'],
    },
    polaPo: ['3 bis 6 konkrete FAQ-Fragen am Seitenende (ohne Dopplung zum Fließtext)'],
  },
  {
    nr: 7,
    nazwa: 'Interne Verlinkung & Primärquellen',
    opis: 'Kein neuer Text darf verwaist bleiben: planen Sie ausgehende UND eingehende interne Links vorab.',
    tabela: {
      kolumny: ['Ziel-URL im eigenen Auftritt', 'Sprechender Ankertext', 'Geplante Stelle im Text'],
      wiersze: ['Übergeordnete Leistungsseite (Hub)', 'Verwandter Beitrag / Tool 1', 'Verwandter Beitrag / Tool 2'],
    },
    pola: [
      'Bestehende starke Seiten, die nach Livegang AUF diesen neuen Beitrag verlinken müssen',
      'Verbindliche Primärquellen für Gesetze, Normen, Studien und Zahlen (URL + Abrufdatum)',
    ],
  },
  {
    nr: 8,
    nazwa: 'Tonalität, Markenregeln & KI-Einsatz',
    opis: 'Klare Leitplanken für Sprache, Fachbegriffe und den zulässigen Einsatz generativer KI.',
    pola: [
      'Ansprache: ☐ Sie-Form (B2B-Standard) ☐ Du-Form ☐ neutral / unpersönlich',
      'Fachniveau der Leserschaft: ☐ Einsteiger ☐ Entscheider mit Praxiswissen ☐ Fachpublikum',
      'Pflichtbegriffe (korrekte Produkt-, Norm- und Leistungsnamen)',
      'Tabuwörter & Floskeln (z. B. „in der heutigen schnelllebigen Zeit“, unbelegte Superlative)',
      'Referenztext für den gewünschten Schreibstil (URL)',
      'KI-Regel: ☐ kein KI-Text ☐ nur Recherche/Struktur ☐ Rohfassung erlaubt, aber jeder Fakt & jede Quelle manuell geprüft',
    ],
  },
  {
    nr: 9,
    nazwa: 'Metadaten, Medien & Autorenangabe (E-E-A-T)',
    opis: 'Damit der Text veröffentlichungsreif im CMS landet und kein zweiter Nachlauf entsteht.',
    pola: [
      'Title-Tag: individuell, Haupt-Keyword vorn, Richtwert <= 60 Zeichen ohne Firmen-Suffix',
      'Meta-Description: konkrete Inhaltszusammenfassung + Klickanreiz (120 bis 155 Zeichen)',
      'URL-Slug: kurz, kleingeschrieben, sprechend, ohne Jahreszahlen',
      'Bildkonzept & Alt-Texte: beschreibende Dateinamen und barrierefreie Alt-Attribute ohne Keyword-Listen',
      'Autorenzeile (Byline + Kurz-Bio) sowie namentliche Fachprüfung bei YMYL-Themen (Recht, Steuern, Medizin, Finanzen)',
      'Veröffentlichungsdatum & Wiedervorlage-Datum für die nächste Aktualitätsprüfung',
    ],
  },
  {
    nr: 10,
    nazwa: 'Abnahme-Checkliste vor & nach der Veröffentlichung',
    opis: '13 feste Prüfpunkte für eine objektive Redaktionsabnahme statt subjektiver Geschmacksdebatten.',
    lista: [
      'Der Text trifft exakt die vereinbarte Suchintention und beantwortet alle Pflichtpunkte aus Teil 4',
      'Der erste Absatz liefert sofort eine zitierfähige Direktantwort auf die Hauptfrage (Answer-First)',
      'Der vereinbarte eigene Mehrwert aus Teil 5 (Daten, Fallbeispiel, Preisrahmen, Expertenwissen) ist enthalten',
      'Genau eine H1; saubere Hierarchie H1 -> H2 -> H3 ohne Überspringen von Ebenen',
      'Haupt-Keyword steht natürlich in Title, H1 und Einstieg - ohne unnatürliches Keyword-Stuffing',
      'Sämtliche Zahlen, Fristen, Gesetze und Preise sind an der Primärquelle gegengeprüft und mit Datum belegt',
      'Keine Kannibalisierung mit gesperrten Nachbar-Keywords aus Teil 3',
      'Ausgehende UND eingehende interne Links sitzen mit sprechenden Ankertexten an Ort und Stelle',
      'Title-Tag (<= 60 Zeichen) und Meta-Description (120-155 Zeichen) sind individuell und frei von Platzhaltern',
      'Eigene Grafiken/Screenshots sind komprimiert (WebP/AVIF), mit festen Maßen und sinnvollen Alt-Texten versehen',
      'Reale Autorenbox ist hinterlegt; bei YMYL-Inhalten ist die fachliche Freigabe dokumentiert',
      'Sprachliche Endkontrolle bestanden: aktiver Stil, klare Absätze, keine leeren KI-Einleitungen',
      'Nach Livegang: URL in Sitemap, Indexierung in Search Console geprüft, Termin für 30-/90-Tage-Kontrolle gesetzt',
    ],
  },
];

function pogrubKrotko(tekst, sufiks = ':') {
  const caly = `${tekst}${sufiks}`;
  if (caly.length <= 70) return `<strong>${caly}</strong>`;
  const ciecie = caly.lastIndexOf(' ', 68);
  if (ciecie <= 10) return `<strong>${caly.slice(0, 68)}</strong>${caly.slice(68)}`;
  return `<strong>${caly.slice(0, ciecie)}</strong> ${caly.slice(ciecie + 1)}`;
}

function formatPole(p) {
  const m = p.match(/^([^:]+):\s*(.*)$/);
  if (!m) return `<li>${pogrubKrotko(p)} …</li>`;
  return p.includes('☐')
    ? `<li>${pogrubKrotko(m[1])} ${m[2]}</li>`
    : `<li>${pogrubKrotko(m[1])} ${m[2]} …</li>`;
}

function renderTabela(t) {
  return `<table><thead><tr>${t.kolumny.map((k) => `<th>${k}</th>`).join('')}</tr></thead><tbody>${t.wiersze
    .map((w) => `<tr><td>${w}</td>${t.kolumny.slice(1).map(() => '<td>…</td>').join('')}</tr>`)
    .join('')}</tbody></table>`;
}

function podgladHtml() {
  return TEILE_BRIEF_TEXTER_DE.map((c) => {
    let h = `<h3>Teil ${c.nr}. ${c.nazwa}</h3>`;
    if (c.opis) h += `<p><em>${c.opis}</em></p>`;
    if (c.nr === 4 || c.nr === 7) {
      if (c.tabela) h += renderTabela(c.tabela);
      if (c.pola) h += `<ul>${c.pola.map(formatPole).join('')}</ul>`;
    } else {
      if (c.pola) h += `<ul>${c.pola.map(formatPole).join('')}</ul>`;
      if (c.tabela) h += renderTabela(c.tabela);
      if (c.polaPo) h += `<ul>${c.polaPo.map(formatPole).join('')}</ul>`;
    }
    if (c.lista) {
      h += `<ul>${c.lista.map((punkt, i) => `<li>☐ <strong>Prüfpunkt ${i + 1}:</strong> ${punkt}.</li>`).join('')}</ul>`;
    }
    return h;
  }).join('');
}

const SZABLON_BRIEF_TEXTER_DE = {
  slug: 'brief-dla-copywritera',
  plik: 'brief-copywritera',
  updated: '2026-11-22',
  opublikowanoDe: '2026-11-22',
  plikPdfDe: '/pliki/de/briefing-vorlage-texter.pdf',
  seo: {
    tytul: 'Briefing Vorlage Texter: SEO-Content-Briefing als PDF',
    opis: 'Kostenlose Briefing Vorlage für Texter als PDF: Suchintention, Top-5-SERP-Analyse, Gliederung, interne Links, E-E-A-T-Quellen und Abnahme-Checkliste.',
  },
  de: {
    okruszek: 'Briefing Vorlage Texter',
    tag: 'Kostenlose PDF-Vorlage',
    h1: 'Briefing Vorlage für Texter: SEO-Texte in 10 Feldern sauber beauftragen',
    lead: 'Ein Satz wie „Schreiben Sie bitte 1.500 Wörter zum Thema Wärmepumpe im Industriebau“ kostet Unternehmen fast immer doppelt: zuerst beim Verfassen eines generischen Textes und danach beim kompletten Umschreiben durch die eigene Fachabteilung. Unsere kostenlose Briefing Vorlage für Texter (Content Briefing Vorlage) bündelt in 10 klaren Abschnitten Zielgruppe, Suchintention, Top-5-Analyse, Information Gain, Gliederung, interne Links und eine 13-Punkte-Abnahme als A4-PDF.',
    karta: {
      nazwa: 'Briefing Vorlage für Texter (PDF)',
      opis: '10 strukturierte Briefing-Felder für SEO- & B2B-Fachtexte inklusive SERP-Tabelle, H2/H3-Gliederungsraster und 13-Punkte-Abnahmeprotokoll.',
      cta: 'Briefing-Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'warum-content-briefing-vorlage',
        h2: 'Wozu eine Briefing Vorlage für Texter dient - und wie sie sich abgrenzt',
        html: [
          '<p>Eine <strong>Briefing Vorlage für Texter</strong> (im Marketing oft <strong>Content Briefing Vorlage</strong> genannt) ist der verbindliche Arbeitsauftrag für genau <em>eine</em> Unterseite: eine Leistungsseite, einen tiefgehenden Fachratgeber, einen Systemvergleich oder die Überarbeitung eines gefallenen Bestandsartikels. Sie trennt strategische Entscheidungen von der sprachlichen Ausarbeitung.</p>',
          '<p>Verantwortlich für das Briefing ist immer die Person, die Geschäftsziele, Vertriebsfragen und Daten aus der Google Search Console kennt - also Marketingverantwortliche oder SEO-Spezialisten, nicht die externe Texterin allein. Denn nur wer den gesamten Seitenbaum überblickt, weiß, welches Keyword bereits einer anderen URL gehört und welche echten Projektdaten das Unternehmen beisteuern kann.</p>',
          '<p>Wichtige Abgrenzung zu verwandten Dokumenten:</p>',
          '<ul>',
          '<li><strong>Gesamte Website neu planen:</strong> Wenn Sie einen Relaunch oder Neubau ausschreiben, nutzen Sie stattdessen unsere <a href="/de/tools/website-briefing-vorlage">Website Briefing Vorlage (Lastenheft)</a>.</li>',
          '<li><strong>Themen für das Quartal auswählen:</strong> Bevor einzelne Textbriefings entstehen, legen Sie Reihenfolge und Veröffentlichungstermine in der <a href="/de/tools/redaktionsplan-vorlage">Redaktionsplan Vorlage</a> sowie der <a href="/de/tools/keyword-recherche-vorlage">Keyword Recherche Vorlage</a> fest.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'aufbau-in-10-abschnitten',
        h2: 'Aufbau der Content Briefing Vorlage: 10 Teile mit klarer Aufgabe',
        html: '<p>Unsere Vorlage folgt dem tatsächlichen Redaktionsprozess: Teil 1 bis 5 klären Ziel, Suchintention und fachlichen Vorsprung; Teil 6 bis 9 definieren Gliederung, Verlinkung und Metadaten; Teil 10 dient als objektives Abnahmeprotokoll.</p>',
        tabela: {
          id: 'tabelle-10-teile-texter-briefing',
          caption: 'Die 10 Bausteine der Briefing Vorlage für Texter im Überblick',
          columns: [
            { key: 'teil', label: 'Abschnitt' },
            { key: 'inhalt', label: 'Was Sie eintragen' },
            { key: 'nutzen', label: 'Warum das Korrekturschleifen spart' },
          ],
          rows: [
            { teil: '1. Auftragsdaten', inhalt: 'Textart, Ziel-URL, Fristen für Gliederung & Entwurf, Umfangskorridor', nutzen: 'Klare Meilensteine; Gliederungsfreigabe verhindert Komplett-Neuschrieb' },
            { teil: '2. Ziel & Zielgruppe', inhalt: 'Gewünschte Conversion, CTA-Ziel, Rolle im Einkauf, echte Kundeneinwände', nutzen: 'Text spricht Entscheider an statt allgemeines Schulbuchwissen zu wiederholen' },
            { teil: '3. Keyword & Intention', inhalt: 'Haupt-Keyword, passende Varianten, Suchintention und gesperrte Nachbar-Themen', nutzen: 'Schützt zuverlässig vor Keyword-Kannibalisierung zwischen zwei eigenen URLs' },
            { teil: '4. Google Top 5 & KI', inhalt: 'Pflichtthemen und Lücken der Top 5 sowie Analyse der Google AI Overviews', nutzen: 'Zeigt schwarz auf weiß, was für Seite 1 erwartbar ist und wo Wettbewerber schwächeln' },
            { teil: '5. Information Gain', inhalt: 'Eigene Zahlen, Fallbeispiele, Preisspannen, Fotos und interne Fachansprechpartner', nutzen: 'Liefert echte Originalität gemäß Googles Helpful-Content-Leitlinien' },
            { teil: '6. Gliederung (H1-H3)', inhalt: 'H1, 40-60-Wörter-Direktantwort, H2/H3-Fragenraster und FAQ-Liste', nutzen: 'Macht Abschnitte für Leser und KI-Antwortsysteme sofort zitierbar' },
            { teil: '7. Links & Quellen', inhalt: 'Ausgehende und eingehende interne Links samt Ankertext sowie Primärquellen', nutzen: 'Verbindet den Artikel ab Tag 1 stark mit Ihrer wichtigsten Leistungsseite' },
            { teil: '8. Tonalität & KI-Regeln', inhalt: 'Sie-/Du-Form, Pflicht- und Tabubegriffe, klare Vorgabe zum KI-Einsatz', nutzen: 'Sichert Markensprache und zwingt zu manueller Faktenprüfung' },
            { teil: '9. Metadaten & Autor', inhalt: 'Title (<= 60 Z.), Description, Alt-Texte, Autorenbox und YMYL-Fachprüfung', nutzen: 'Artikel kann ohne Nacharbeit direkt im CMS veröffentlicht werden' },
            { teil: '10. Abnahme-Checkliste', inhalt: '13 abhakbare Qualitätskriterien vor und nach dem Livegang', nutzen: 'Ersetzt Bauchgefühl bei der Abnahme durch nachprüfbare Kriterien' },
          ],
        },
      },
      {
        id: 'suchintention-und-google-regeln',
        h2: 'Suchintention, Wortzahl-Mythen und Zitierbarkeit in KI-Systemen',
        html: '<p>Der teuerste Fehler in einem SEO-Briefing ist das falsche Seitenformat: Wenn auf den Plätzen 1 bis 5 bei Google ausschließlich interaktive Rechner oder Leistungsseiten mit Preistabellen ranken, wird ein reiner 2.500-Wörter-Blogaufsatz dort kaum gewinnen. Prüfen Sie die Suchintention deshalb immer live am aktuellen Suchergebnis.</p>',
        tabela: {
          id: 'tabelle-suchintention-briefing',
          caption: 'Suchintention im Content Briefing richtig in ein Seitenformat übersetzen',
          columns: [
            { key: 'intention', label: 'Suchintention' },
            { key: 'frage', label: 'Typische Suchanfrage' },
            { key: 'format', label: 'Passendes Format im Briefing' },
            { key: 'elemente', label: 'Unverzichtbare Bausteine im Text' },
          ],
          rows: [
            { intention: 'Informationell', frage: '„wie funktioniert …“, „grenzwerte …“, „anleitung“', format: 'Fachratgeber, Prüfliste, Schritt-für-Schritt-Leitfaden', elemente: 'Direktantwort im 1. Absatz, konkrete Schritte, Praxisbeispiel, dezenter Link zur Leistung' },
            { intention: 'Kommerziell (Vergleich)', frage: '„… vs …“, „… kosten“, „welches system für b2b“', format: 'Vergleichsseite, Kostenübersicht, Entscheidungshilfe', elemente: 'Kriterien-Tabelle, echte Preisspannen in Euro, ehrliche Vor- und Nachteile je Option' },
            { intention: 'Transaktional', frage: '„… agentur“, „… dienstleister beauftragen“', format: 'Leistungs- oder Produktseite', elemente: 'Leistungsumfang, Ablauf, Preise/Pakete, Referenzen, Ansprechpartner und klares Anfrageformular' },
            { intention: 'Navigational', frage: '„firmenname login“, „firmenname kontakt“', format: 'Marken- oder Kontaktseite', elemente: 'Direkter Einstieg, Kontaktdaten; benötigt in der Regel kein eigenes Texter-Briefing' },
          ],
        },
        htmlPo: [
          '<p>Beachten Sie beim Ausfüllen von Teil 1, 6 und 8 außerdem drei dokumentierte Grundsätze aus Google Search Central:</p>',
          '<ul>',
          '<li><strong>Keine magische Mindestwortzahl:</strong> Google betont ausdrücklich, dass die reine Textlänge kein Qualitätsmerkmal ist. Geben Sie im Briefing einen sinnvollen Korridor vor, aber belohnen Sie Präzision statt Füllsätze. Unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a> markiert lediglich Seiten unter 250 Wörtern im HTML, weil dort oft Inhalte fehlen oder erst spät per JavaScript nachgeladen werden.</li>',
          '<li><strong>Keine künstliche Keyword-Dichte:</strong> Verlangen Sie niemals „2,5 % Keyword-Density“. Das Haupt-Keyword gehört natürlich in Title, H1 und den ersten Absatz; erzwungene Wiederholungen fallen unter Googles Spam-Richtlinie gegen Keyword-Stuffing.</li>',
          '<li><strong>Answer-First hilft Mensch und KI gleichermaßen:</strong> Ein prägnanter Antwortblock (40 bis 60 Wörter) direkt unter einer präzisen H2-Frage erleichtert Entscheidern das Querlesen und erhöht die Chance, in Google AI Overviews und ChatGPT zitiert zu werden. Nach Veröffentlichung können Sie die fertige URL direkt im <a href="/de/tools/geo-zitierbarkeit-pruefen">GEO-Zitierbarkeit Prüfer</a> testen.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'ausgefuelltes-praxisbeispiel',
        h2: 'Ausgefülltes Beispiel: Content Briefing für einen B2B-Fachbeitrag',
        html: '<p>Damit Sie sehen, wie konkret ein gutes Briefing formuliert ist, zeigt die folgende Tabelle einen gekürzten Auszug für einen B2B-Vergleichsbeitrag im Mittelstand:</p>',
        tabela: {
          id: 'tabelle-briefing-praxisbeispiel',
          caption: 'Praxisbeispiel eines ausgefüllten Texter-Briefings (Auszug)',
          columns: [
            { key: 'feld', label: 'Briefing-Abschnitt' },
            { key: 'eintrag', label: 'Konkreter Eintrag des Auftraggebers' },
          ],
          rows: [
            { feld: '1. Auftrag & Ziel-URL', eintrag: 'Neuer Vergleichsartikel unter /de/vergleiche/nextjs-vs-wordpress-seo · Gliederung bis Fr., Entwurf +7 Werktage · 1.400-1.900 Wörter' },
            { feld: '2. Ziel & Leserschaft', eintrag: 'Geschäftsführung & Marketingleitung vor Website-Relaunch · Ziel: Anfrage zum Booster Pack bzw. Nutzung des Core-Web-Vitals-Vergleichs' },
            { feld: '3. Keyword & Abgrenzung', eintrag: 'Haupt-Keyword „next.js vs wordpress“ (Kommerziell) · Out of Scope: reine WordPress-Betreuung gehört auf /de/wordpress-seo-agentur' },
            { feld: '4. Top-5-Lücke', eintrag: 'Top 5 vergleichen nur Entwickler-Komfort, nennen aber keine realen 24-Monats-Gesamtkosten (TCO) in Euro und keine Folgen für KI-Crawler' },
            { feld: '5. Information Gain', eintrag: '9-Kriterien-Tabelle, 24-Monats-Kostenrechnung in Euro, echte CrUX-Grenzwerte (LCP <= 2,5 s, INP <= 200 ms) und SSR-HTML-Beleg' },
            { feld: '7. Interne Links', eintrag: 'Verlinkung auf /de/seo-kosten, /de/tools/core-web-vitals-vergleich und /de/wordpress-seo-agentur; Rücklink aus dem Vergleiche-Hub /de/vergleiche' },
            { feld: '8. Tonalität & KI', eintrag: 'Sachliches B2B-Sie, keine Agentur-Superlative, jede Google-Aussage mit Primärquelle und Abrufdatum, manuelle Faktenabnahme durch Filip Śliwa' },
          ],
        },
        htmlPo: '<p>Fehlende Themen für neue Briefings finden Sie strukturiert über unsere Anleitung zur <a href="/de/blog/content-gap-analyse">Content Gap Analyse</a>. Wenn Sie Planung, Briefing, Fachredaktion und technische Einpflege lieber komplett auslagern möchten, sind monatlich 2 bzw. 4 solcher Fachtexte fest in unserer <a href="/de/seo-fuer-unternehmen">B2B-SEO-Betreuung</a> enthalten (Preise unter <a href="/de/seo-kosten">SEO Kosten</a>).</p>',
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Alle 10 Briefing-Felder & 13-Punkte-Abnahme',
      opis: 'Vollständige Struktur des PDF-Dokuments. Die 13 Abnahmepunkte in Teil 10 können Sie direkt hier im Browser abhaken.',
      html: podgladHtml(),
    },
    formularz: {
      h2: 'Briefing Vorlage für Texter herunterladen (PDF)',
      opis: 'Laden Sie die komplette 10-teilige Content Briefing Vorlage inklusive Top-5-SERP-Tabelle, Gliederungsraster und Abnahme-Checkliste kostenlos als A4-PDF herunter.',
      etykieta: 'E-Mail-Adresse für den PDF-Versand',
      przycisk: 'Briefing-Vorlage als PDF senden',
      przedmiot: 'die Briefing Vorlage für Texter (PDF)',
      komunikatOk: 'Gesendet. Prüfen Sie Ihr Postfach (auch Werbung oder Spam): Der Link zur Briefing Vorlage für Texter trifft innerhalb einer Minute ein.',
    },
    faq: [
      {
        question: 'Wer sollte die Briefing Vorlage für Texter ausfüllen - Unternehmen oder Texter?',
        answer: 'Teil 1 bis 5 (Geschäftsziel, Zielgruppe, Haupt-Keyword, Abgrenzung zu anderen Unterseiten und interne Fakten/Zulieferungen) sollten immer vom Auftraggeber oder der betreuenden SEO-Fachkraft kommen. Die Detailgliederung in Teil 6 kann die Texterin vorschlagen, bevor Sie diese vor Schreibbeginn verbindlich freigeben.',
      },
      {
        question: 'Wie lang sollte ein gutes Content Briefing sein?',
        answer: 'In der Praxis reichen anderthalb bis drei präzise ausgefüllte A4-Seiten vollkommen aus. Ein Briefing soll Entscheidungen bündeln und Material liefern - nicht den halben Artikel vorwegformulieren und der Redaktion jeden eigenen Satzbau nehmen.',
      },
      {
        question: 'Darf im Briefing der Einsatz von ChatGPT oder Claude erlaubt werden?',
        answer: 'Ja, sofern klare Regeln gelten. Google bewertet Inhalte nach ihrem Nutzen für Menschen, nicht nach dem Entstehungswerkzeug, warnt aber ausdrücklich vor ungeprüften Fakten und massenhaft erzeugtem Spam ohne Mehrwert. In Teil 8 unserer Vorlage legen Sie deshalb verbindlich fest, ob KI nur zur Strukturierung dient und dass jede Zahl, Norm und Quelle menschlich geprüft werden muss.',
      },
      {
        question: 'Warum enthält die Vorlage ein Feld für gesperrte Keywords (Out of Scope)?',
        answer: 'Ohne klare Abgrenzung bauen engagierte Texterinnen oft verwandte Suchbegriffe mit ein, für die Ihr Unternehmen bereits eine eigene Leistungs- oder Kategorieseite besitzt. Dadurch konkurrieren plötzlich zwei eigene URLs um dieselbe Suchanfrage (Keyword-Kannibalisierung).',
      },
      {
        question: 'Wann prüfe ich in der Search Console, ob der neue Text funktioniert?',
        answer: 'Prüfen Sie direkt am Veröffentlichungstag per URL-Prüfung, ob die Seite sauber indexierbar ist. Eine erste belastbare Auswertung von Impressionen, Klicks und rankenden Suchanfragen im Leistungsbericht der Search Console ist nach 30 sowie nach 90 Tagen sinnvoll.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/content-plan', tekst: 'Redaktionsplan Vorlage', opis: 'plant Themen, Prioritäten und Veröffentlichungstermine vor dem Einzelbriefing' },
      { href: '/narzedzia/dobor-slow-kluczowych', tekst: 'Keyword Recherche Vorlage', opis: 'ordnet Suchbegriffe sauber einzelnen Ziel-URLs ohne Kannibalisierung zu' },
      { href: '/narzedzia/sprawdz-cytowalnosc-strony-ai', tekst: 'GEO-Zitierbarkeit prüfen', opis: 'testet den veröffentlichten Beitrag live auf Answer-First-Blöcke für KI-Systeme' },
      { href: '/narzedzia/checklista-e-e-a-t', tekst: 'E-E-A-T Checkliste', opis: '36 Prüfpunkte für Autorenprofile, Quellenarbeit und Vertrauenssignale' },
      { href: '/narzedzia/brief-strony-internetowej', tekst: 'Website Briefing Vorlage', opis: 'das passende Lastenheft, wenn Sie statt eines Einzeltextes eine ganze Website planen' },
    ],
    plikNazwa: 'Briefing Vorlage für Texter: SEO-Content-Briefing in 10 Teilen (PDF)',
  },
};

export default SZABLON_BRIEF_TEXTER_DE;
