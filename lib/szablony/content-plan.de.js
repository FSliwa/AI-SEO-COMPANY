// Szablon „Redaktionsplan Vorlage” (de-narzedzia, 18.11.2026): niemiecki blok `de` dla lib/szablony/content-plan.js
// (PL /narzedzia/content-plan, EN /en/tools/content-calendar-template, DE /de/tools/redaktionsplan-vorlage).
// Nowy plik obok pliku PL/EN (zasada PLAN-DE.md: istniejących plików nie przepisujemy); łączy je lib/szablony/de.js.
// Treść napisana po niemiecku od zera pod frazę „redaktionsplan vorlage” (wariant „content plan vorlage”), fakty i
// układ jak na stronie PL: 11 kolumn, 8 kroków, 6 części PDF, przykład z fikcyjną firmą (pompy ciepła, bez liczb).
// Plik do pobrania to PDF (public/pliki/de/redaktionsplan-vorlage.pdf; źródło HTML scripts/szablony/pdf/redaktionsplan-vorlage.html).
// UWAGA: wyszukiwania DE dotyczą głównie wersji „Excel” i „Google Sheets”; szablon jest PDF-em (jak PL/EN), więc nigdzie
// nie obiecujemy pliku Excel. Linki wewnętrzne w html tylko do stron DE z 17-stronicowego zestawu (adresy gotowe, /de/...).

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/fundamentals/creating-helpful-content', nazwa: 'Google Search Central: Hilfreiche, zuverlässige und auf Menschen ausgerichtete Inhalte erstellen', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Richtlinien zu Spam (Brückenseiten, massenhaft erzeugte Inhalte)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen und Ihre Website (AI Overviews, KI-Modus)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: SEO-Einsteigerleitfaden (Google findet Seiten vor allem über Links)', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/links-crawlable', nazwa: 'Google Search Central: Links, über die Google neue Seiten findet', data: '2026-11-11' },
  { url: 'https://developers.google.com/search/docs/appearance/title-link', nazwa: 'Google Search Central: Titel in den Ergebnissen (keine Längenbegrenzung, Kürzung auf die Bildschirmbreite)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Search-Console-Hilfe: Leistungsbericht (Klicks, Impressionen, CTR, durchschnittliche Position, vorläufige Daten)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/17011259', nazwa: 'Search-Console-Hilfe: Dimensionen des Leistungsberichts (Suchanfragen, Seiten)', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/9012289', nazwa: 'Search-Console-Hilfe: URL-Prüfung', data: '2026-11-11' },
  { url: 'https://support.google.com/webmasters/answer/16984139', nazwa: 'Search-Console-Hilfe: Leistungsbericht zu generativer KI (Impressionen in AI Overviews und KI-Modus, seit 31.08.2026)', data: '2026-11-12' },
  { url: 'https://support.google.com/analytics/answer/13682862', nazwa: 'Google-Analytics-Hilfe: Bericht „Suchanfragen“ (die Search Console speichert Daten der letzten 16 Monate)', data: '2026-11-11' },
  { url: 'https://support.google.com/analytics/answer/13128484', nazwa: 'Google-Analytics-Hilfe: Ereignisse als Schlüsselereignisse markieren (gilt ab dem Zeitpunkt der Markierung, nicht für historische Daten)', data: '2026-11-11' },
];

// Kroki: te same w HowTo (schema) i w widocznej sekcji „so-fuellen-sie-aus”.
const KROKI = [
  { name: 'Ziel und Takt festlegen', text: 'Tragen Sie das Ziel des Quartals, die Zielgruppe, die zu stärkenden Leistungsseiten und die Zahl der Veröffentlichungen pro Monat ein, die Ihr Team realistisch schafft. Themen und Zielseiten übernehmen Sie aus Ihrer SEO-Strategie, falls Sie eine haben.' },
  { name: 'Themenspeicher füllen', text: 'Nehmen Sie Suchanfragen aus der Search Console, Ergebnisse der Keyword-Recherche, Google-Vorschläge und Fragen aus dem Bereich „Weitere Fragen“, Kundenfragen sowie Lücken gegenüber der Konkurrenz. Bewerten Sie jedes Thema auf einer Skala von 1 bis 10: Wirkung, Sicherheit, Einfachheit; die Punktzahl ist ihr Produkt (ICE).' },
  { name: 'Keyword und Suchintention zuordnen', text: 'Wählen Sie für jedes Thema ein Haupt-Keyword und prüfen Sie in Google, welche Seiten in den Top 10 stehen. Keywords mit mindestens 4 gemeinsamen Ergebnissen in den Top 10 bedienen Sie mit einer einzigen Adresse.' },
  { name: 'Format und Ziel-URL wählen', text: 'Artikel, Leistungsseite, FAQ, Fallstudie oder Aktualisierung. Stellen Sie sicher, dass keine andere Adresse Ihrer Website dasselbe Keyword anvisiert.' },
  { name: 'Interne Links planen', text: 'Notieren Sie, von welchen Seiten Sie auf den neuen Inhalt verlinken, auf welche Leistungsseite er führt und mit welchen 2 bis 4 Texten zum selben Thema er verbunden ist.' },
  { name: 'Drei Monate verteilen', text: 'Monat 1: Leistungsseiten und FAQs, Monat 2: Artikel und Vergleiche, Monat 3: Fallstudien und Aktualisierungen. Weisen Sie jeder Zeile eine verantwortliche Person und einen Status zu.' },
  { name: 'Nach 30 und 90 Tagen messen', text: 'Filtern Sie in der Search Console den Leistungsbericht nach der URL und tragen Sie Klicks, Impressionen und durchschnittliche Position in das Ergebnisblatt ein. Ergänzen Sie nach 90 Tagen aus GA4 die Anfragen aus Besuchen, die auf dieser Seite begonnen haben.' },
  { name: 'Quartalsrückblick machen', text: 'Entscheiden Sie, was bleibt, erweitert, zusammengelegt oder entfernt wird, prüfen Sie, ob zwei Adressen für dasselbe Keyword erscheinen, und übernehmen Sie die besten Themen aus dem Speicher in den nächsten Kalender.' },
];

const krokiHtml = (kroki, wstep) =>
  `<p>${wstep}</p><ol>${kroki.map((k) => `<li><strong>${k.name}.</strong> ${k.text}</li>`).join('')}</ol>`;

const tabelaHtml = (naglowki, wiersze) =>
  `<table><thead><tr>${naglowki.map((n) => `<th>${n}</th>`).join('')}</tr></thead><tbody>${wiersze
    .map((w) => `<tr>${w.map((k) => `<td>${k}</td>`).join('')}</tr>`)
    .join('')}</tbody></table>`;

const puste = (ile, kolumn, pierwsza) =>
  Array.from({ length: ile }, (_, i) => [pierwsza ? pierwsza(i) : String(i + 1), ...Array(kolumn - 1).fill('')]);

const SZABLON_DE = {
  seo: {
    tytul: 'Redaktionsplan Vorlage kostenlos: Download als PDF',
    opis: 'Kostenlose Redaktionsplan Vorlage für Blog und Website: Content-Kalender für 3 Monate, Themenspeicher und Auswertung in der Search Console, mit Anleitung.',
  },
  de: {
    okruszek: 'Redaktionsplan Vorlage',
    tag: 'Kostenlose Vorlage',
    h1: 'Redaktionsplan Vorlage: Content-Plan für SEO',
    lead: 'Ein Redaktionsplan (Content-Plan) ist eine Tabelle, in der Sie jede Veröffentlichung auf der Website Ihres Unternehmens planen: Datum, Thema, Haupt-Keyword, Suchintention, Format, Ziel-URL, interne Links, Verantwortliche, Status und die Messung nach 30 und 90 Tagen. Unten finden Sie die ganze Redaktionsplan Vorlage mit einem Kalender für 3 Monate und einem Themenspeicher, eine Anleitung und ein Beispiel. Das PDF senden wir Ihnen per E-Mail.',
    karta: {
      nazwa: 'Redaktionsplan Vorlage (PDF)',
      opis: 'Redaktionskalender für 3 Monate, Themenspeicher und Messblatt für die Search Console. Für Blog und Leistungsseiten.',
      cta: 'Vorlage herunterladen',
    },
    sekcje: [
      {
        id: 'was-ist-ein-redaktionsplan',
        h2: 'Was ist ein Redaktionsplan, und worin unterscheidet er sich von einem Redaktionskalender?',
        html: [
          '<p>Ein <strong>Redaktionsplan</strong> (auch <strong>Content-Plan</strong>) ist der Plan für die Inhalte auf der Website eines Unternehmens: eine Liste von Themen, die veröffentlicht werden sollen, jeweils mit Keyword, Ziel und Termin. „Redaktionsplan“, „Content-Plan“ und „Themenplan“ meinen im Alltag dasselbe. Ein guter Plan beantwortet drei Fragen: worüber wir schreiben, für wen und wozu.</p>',
          '<p>Der <strong>Redaktionskalender</strong> (auch Veröffentlichungskalender) ist der engere Teil des Plans. Er sagt nur, was wann erscheint. Der Redaktionsplan ergänzt den Kalender um die Strategie: Keyword, Suchintention, Ziel-URL, interne Links und die Art der Messung. Ohne diese Spalten ist ein Kalender eine Aufgabenliste und kein SEO-Werkzeug.</p>',
          '<h3>Redaktionsplan und SEO-Strategie</h3>',
          '<p>Der Redaktionsplan ergibt sich aus der SEO-Strategie. Die Strategie sagt, bei welchen Themen das Unternehmen in Google sichtbar sein will und welche Unterseite sie beantworten soll: ein Cluster von Keywords mit derselben Intention, eine URL. Der Redaktionsplan verteilt das auf konkrete Veröffentlichungen und Termine. Haben Sie noch keine Strategie, beginnen Sie damit, Themen und Zielseiten festzulegen, und übernehmen Sie sie in den Themenspeicher dieser Vorlage.</p>',
          '<h3>Plan für die Website und Plan für Social Media</h3>',
          '<p>Diese Vorlage gilt für den Blog und die Unterseiten der Unternehmenswebsite, nicht für reine Beiträge in sozialen Netzwerken. Der Unterschied ist praktisch. Ein Beitrag lebt einige Tage, ein guter Artikel oder eine Leistungsseite kann über Jahre Kunden aus Google bringen. Deshalb hat im Redaktionsplan für SEO jede Zeile eine URL und eine Messung, nicht nur ein Datum und einen Kanal. Beiträge für Social Media planen Sie später auf Basis fertiger Seiten.</p>',
          '<h3>Wer den Plan führt</h3>',
          '<p>Eine Person. In einem kleinen Unternehmen ist das meist die Inhaberin oder der Inhaber, jemand aus dem Marketing oder die Agentur. Diese Person achtet auf Termine und Status. Alle anderen (Fachexperten, Grafiker, Entwickler) sind in der Spalte „Verantwortlich“ einzelnen Zeilen zugeordnet.</p>',
        ].join(''),
      },
      {
        id: 'spalten-der-vorlage',
        h2: 'Was die Vorlage enthält: 11 Spalten des Redaktionsplans',
        html: '<p>Die Vorlage hat elf Spalten. Jede beantwortet eine Frage, die sonst immer wieder in E-Mails und Besprechungen auftaucht. Sie füllen sie von links nach rechts aus: zuerst die Entscheidungen (Thema, Keyword, Intention, Format), dann die Umsetzung (Verantwortliche, Status) und zuletzt das Ergebnis (Messung).</p>',
        tabela: {
          id: 'tabelle-spalten',
          caption: 'Spalten der Vorlage: was Sie eintragen, mit Beispiel',
          columns: [
            { key: 'kolumna', label: 'Spalte' },
            { key: 'co', label: 'Was Sie eintragen' },
            { key: 'przyklad', label: 'Beispiel' },
          ],
          rows: [
            { kolumna: 'Geplantes Datum', co: 'Der Tag, an dem der Text zur Veröffentlichung fertig sein soll.', przyklad: '14.01.' },
            { kolumna: 'Thema', co: 'Ein Arbeitstitel, der sagt, welche Frage der Text beantwortet.', przyklad: 'Was kostet eine Wärmepumpe mit Einbau?' },
            { kolumna: 'Haupt-Keyword', co: 'Eine Suchanfrage, für die Sie die Seite optimieren. Keywords mit derselben Intention bedient eine einzige URL.', przyklad: 'wärmepumpe kosten mit einbau' },
            { kolumna: 'Suchintention', co: 'Was die Person sucht, die die Anfrage eingibt: Wissen, einen Vergleich, einen Kauf oder ein Unternehmen in der Nähe.', przyklad: 'kommerziell (vergleicht Angebote)' },
            { kolumna: 'Format', co: 'Artikel, Leistungsseite, FAQ, Fallstudie, Ratgeber, Vergleich oder Aktualisierung.', przyklad: 'Artikel mit Kostentabelle' },
            { kolumna: 'Ziel-URL', co: 'Die Adresse der neuen Seite oder der bestehenden, die Sie aktualisieren.', przyklad: '/blog/waermepumpe-kosten' },
            { kolumna: 'Interne Links', co: 'Von welchen Seiten auf den neuen Inhalt verlinkt wird und auf welche Leistungsseite er verlinkt.', przyklad: 'von: /blog/waermepumpen-arten; auf: /waermepumpe-einbau' },
            { kolumna: 'Verantwortlich', co: 'Die eine Person, die für die Zeile zuständig ist.', przyklad: 'Anna (Marketing)' },
            { kolumna: 'Status', co: 'Idee, Briefing, Schreiben, Lektorat, fertig, veröffentlicht, Aktualisierung nötig.', przyklad: 'Schreiben' },
            { kolumna: 'Veröffentlichungsdatum', co: 'Das tatsächliche Datum der Veröffentlichung. Ab hier zählen Sie 30 und 90 Tage.', przyklad: '16.01.' },
            { kolumna: 'Ergebnisse (30 und 90 Tage)', co: 'Klicks und Impressionen für diese URL aus der Search Console, Anfragen aus GA4 und Ihre Entscheidung.', przyklad: 'prüfen am 15.02. und 16.04.' },
          ],
          przypis: 'Im PDF hat der Kalender 10 Spalten (Woche und geplantes Datum teilen sich eine), und die Ergebnisse stehen auf einem eigenen Blatt.',
        },
      },
      {
        id: 'so-fuellen-sie-aus',
        h2: 'So füllen Sie die Redaktionsplan Vorlage aus: 8 Schritte',
        html: krokiHtml(KROKI, 'Die Schritte folgen den Teilen des PDF. Den vollständigen Plan bauen Sie einmal im Quartal auf, dazwischen aktualisieren Sie nur Status und Ergebnisse.'),
      },
      {
        id: 'themen-finden',
        h2: 'Wo Sie Themen für den Redaktionsplan Ihres Blogs finden',
        html: [
          '<p>Die besten Themen kommen aus Daten, nicht aus dem Brainstorming. Sammeln Sie sie in einem Themenspeicher, einer Liste von Themen, die auf einen Termin warten, aus fünf Quellen.</p>',
          '<h3>1. Google Search Console: Suchanfragen, für die Sie schon erscheinen</h3>',
          '<p>Öffnen Sie den Leistungsbericht, wechseln Sie zum Tab „Suchanfragen“ und sortieren Sie nach Impressionen. Suchen Sie Anfragen, bei denen Ihre Website in den Ergebnissen erscheint, aber wenige Klicks erhält. Die durchschnittliche Position sagt Ihnen, was zu tun ist. Positionen von 4 bis 20 bedeuten meist eine Seite, die schon erscheint und sich auszubauen lohnt. Niedrigere Positionen bei einer Anfrage, für die Sie keine eigene Seite haben, bedeuten, dass Google Ihre Website schon mit dem Thema verbindet, Sie aber keine Seite haben, die es gut beantwortet. Wechseln Sie dann zum Tab „Seiten“, wählen Sie eine URL und sehen Sie, für welche Anfragen sie erscheint. Zieht ein Artikel Anfragen zu mehreren Themen mit unterschiedlicher Intention an, ist das ein Zeichen, ihn in eigene Texte aufzuteilen.</p>',
          '<h3>2. Keyword-Recherche</h3>',
          '<p>Ein Keyword-Tool wie der Google Ads Keyword-Planer zeigt, wie Menschen Ihre Leistungen beschreiben, was sie fragen und in welchen Monaten sie am meisten suchen. Gruppieren Sie Keywords nach den Ergebnissen von Google, nicht nach ähnlichem Wortlaut: Teilen zwei Keywords mindestens 4 ihrer Top-10-URLs, sind es ein Thema und eine Seite. Diese Schwelle ist unsere eigene Arbeitsregel, keine von Google veröffentlichte Zahl. In den Kalender kommt ein Thema, nicht ein einzelnes Keyword.</p>',
          '<h3>3. Google-Vorschläge und „Weitere Fragen“</h3>',
          '<p>Geben Sie Ihre Leistung bei Google ein und notieren Sie die Vorschläge, die beim Tippen erscheinen, sowie die Fragen im Feld „Weitere Fragen“. So formulieren Ihre Kunden. Eine lange Anfrage aus den Vorschlägen verdient meist eine eigene Überschrift oder eine FAQ-Frage. Eine eigene Seite verdient sie nur, wenn ihre Intention von den vorhandenen Seiten abweicht.</p>',
          '<h3>4. Fragen von Kunden</h3>',
          '<p>Schreiben Sie die Fragen auf, die Sie in Telefonaten, E-Mails und Verkaufsgesprächen hören. Fragen drei Personen im Monat dasselbe, haben Sie ein fertiges Thema für eine FAQ oder einen Artikel. Inhalte, die echte Fragen direkt beantworten, helfen auch, wenn Menschen KI-Assistenten fragen statt zu suchen, denn ChatGPT und Perplexity können das Web durchsuchen und Quellen nennen, bevor sie antworten.</p>',
          '<h3>5. Lücken gegenüber der Konkurrenz</h3>',
          '<p>Prüfen Sie, welche Themen die Unternehmen abdecken, die vor Ihnen ranken und Sie nicht. Dafür eignet sich eine einfache Gegenüberstellung von fünf Konkurrenten nach Themen, Keywords und Antworten in KI-Assistenten.</p>',
          '<h3>So wählen Sie Themen aus dem Speicher</h3>',
          '<p>Bewerten Sie jedes Thema auf drei Skalen von 1 bis 10: Wirkung auf den Umsatz (W), Sicherheit der Einschätzung (S) und Einfachheit der Umsetzung (E, 10 = sehr einfach). Die Punktzahl ist das Produkt W × S × E (ICE-Methode: Impact × Confidence × Ease, höchstens 1000). Themen mit der höchsten Punktzahl kommen zuerst in den Kalender. Beurteilen Sie die Wirkung danach, ob ein Thema Anfragen bringen kann, nicht allein nach Traffic.</p>',
        ].join(''),
      },
      {
        id: 'intention-und-format',
        h2: 'Suchintention und Inhaltsformat aufeinander abstimmen',
        html: '<p>Dasselbe Keyword passt nicht zu jedem Format. Suchen Sie das Keyword vor der Wahl des Formats bei Google und sehen Sie sich die ersten zehn Ergebnisse an: Artikel, Leistungsseiten, Onlineshops oder eine Karte. Das ist der einfachste Test der Intention. Sind alle Ergebnisse Leistungsseiten, hat ein Blogartikel es schwer.</p>',
        tabela: {
          id: 'tabelle-intention',
          caption: 'Suchintention und Inhaltsformat im Redaktionsplan',
          columns: [
            { key: 'intencja', label: 'Intention' },
            { key: 'cel', label: 'Was die suchende Person will' },
            { key: 'format', label: 'Format im Plan' },
            { key: 'przyklad', label: 'Beispiel-Keyword' },
          ],
          rows: [
            { intencja: 'Informativ', cel: 'Eine Erklärung, eine Anleitung oder eine Definition', format: 'Ratgeberartikel, FAQ', przyklad: 'wie funktioniert eine wärmepumpe' },
            { intencja: 'Kommerziell', cel: 'Einen Vergleich von Optionen, Preisen oder Bewertungen vor der Entscheidung', format: 'Vergleich, Artikel mit Kostentabelle, Fallstudie', przyklad: 'wärmepumpe oder gasheizung' },
            { intencja: 'Transaktional', cel: 'Ein konkretes Angebot und eine Möglichkeit zur Kontaktaufnahme', format: 'Leistungsseite mit Preisen oder Anfrageformular', przyklad: 'wärmepumpe einbau angebot' },
            { intencja: 'Lokal', cel: 'Ein Unternehmen in der Nähe', format: 'Leistungsseite für einen Standort (mit lokalen Inhalten), Google Unternehmensprofil', przyklad: 'wärmepumpe installateur in meiner nähe' },
            { intencja: 'Navigational', cel: 'Ein bestimmtes Unternehmen oder eine bestimmte Seite', format: 'Seiten „Über uns“ und Kontakt (meist ohne neue Inhalte)', przyklad: '[Firmenname] kontakt' },
          ],
        },
        htmlPo: [
          '<p>Achten Sie auf das Gleichgewicht. Informative Artikel schaffen Reichweite, Anfragen kommen aber öfter von Leistungsseiten und Vergleichen. Jeder Artikel im Kalender sollte daher in der Spalte „Interne Links“ die Leistungsseite nennen, auf die er verweist.</p>',
          '<p>Eine eigene Seite für jede Stadt ergibt nur Sinn, wenn sie lokale Inhalte hat: Projekte, das Team, das Einsatzgebiet, Fragen lokaler Kunden. Die Spam-Richtlinien von Google nennen Seiten, die auf bestimmte Regionen oder Städte zielen und Nutzer auf eine Seite lenken, als Missbrauch durch Brückenseiten.</p>',
        ].join(''),
      },
      {
        id: 'veroeffentlichungstakt',
        h2: 'Wie oft veröffentlichen, und wie Sie einen Kalender für 3 Monate aufbauen',
        html: [
          '<p>Bestimmen Sie den Takt nach Ihrer Kapazität, nicht nach Ihrem Ehrgeiz. Ein solider Text alle zwei Wochen über ein ganzes Jahr schlägt zehn Texte im ersten Monat und danach nichts. Die Hinweise von Google zu hilfreichen Inhalten nennen als Warnzeichen, viele Inhalte zu vielen verschiedenen Themen zu erzeugen in der Hoffnung, dass einige davon funktionieren. Ihr Kalender soll das verhindern, nicht fördern.</p>',
          '<p>Zählen Sie, wie viele Texte Ihr Team im Monat ohne Hast fertigstellt, und reservieren Sie einen Platz für die Aktualisierung älterer Inhalte. Das ist Ihr Takt. Für ein kleines Unternehmen sind zwei neue Texte im Monat plus eine Aktualisierung ein sinnvoller Anfang.</p>',
          '<p>Planen Sie entlang der Saison. Suchen Kunden Ihre Leistung vor allem in einigen Monaten des Jahres, veröffentlichen Sie vor dem Höhepunkt, denn eine neue Seite braucht Zeit, bis Google sie findet und bewertet. Der Keyword-Planer zeigt Suchen nach Monaten, und ein Jahresvergleich in der Search Console zeigt das Muster in Ihren eigenen Daten.</p>',
          '<h3>Ein Redaktionskalender für 3 Monate in drei Phasen</h3>',
          '<ul>',
          '<li><strong>Monat 1: Fundament.</strong> Leistungsseiten und FAQs für transaktionale und lokale Keywords. Sind Ihre Leistungsseiten schwach, haben Artikel keinen Ort, an den sie Traffic leiten können.</li>',
          '<li><strong>Monat 2: Unterstützung.</strong> Informative Artikel und Vergleiche, die Fragen vor dem Kauf beantworten und auf die Leistungsseiten aus Monat 1 verlinken.</li>',
          '<li><strong>Monat 3: Belege und Aktualisierungen.</strong> Fallstudien, Überarbeitung von Seiten, die in der Search Console Klicks verlieren, und die erste Messung der Inhalte aus Monat 1.</li>',
          '</ul>',
          '<p>Prüfen Sie am Ende des Quartals, was Klicks und Anfragen gebracht hat, was nicht und welche Themen aus dem Speicher in den nächsten Kalender wandern.</p>',
        ].join(''),
      },
      {
        id: 'redaktionsplan-und-ki-suche',
        h2: 'Ihr Redaktionsplan und die KI-Suche: ChatGPT und AI Overviews',
        html: [
          '<p>Immer mehr Menschen fragen KI-Assistenten nach Leistungen oder lesen die AI Overview über den Ergebnissen von Google. Für KI brauchen Sie keinen gesonderten Redaktionsplan. Google sagt, dass es für das Erscheinen in AI Overviews oder im KI-Modus keine zusätzlichen Anforderungen über die üblichen SEO-Empfehlungen hinaus gibt. Drei Dinge in Ihrem Kalender ändern sich aber doch.</p>',
          '<ul>',
          '<li><strong>Eine Frage, eine klare Antwort.</strong> Eine Kundenfrage aus Ihrem Speicher bekommt eine Überschrift in Form einer Frage, und der erste oder die ersten zwei Sätze darunter antworten direkt. Zahlen haben eine Quelle. Eine solche Passage lässt sich leicht zitieren, auch durch KI-Assistenten, die das Web durchsuchen, bevor sie antworten.</li>',
          '<li><strong>Mehr Inhalte, die KI nicht für Sie zusammenfassen kann.</strong> Eine Definition lässt sich in einer KI-Antwort leicht wiederholen. Ihre eigenen Daten, Erfahrungen und Beispiele nicht. Planen Sie mehr Fallstudien, Vergleiche, Preisseiten und Tools als reine Definitionen.</li>',
          '<li><strong>Am selben Ort messen.</strong> Google zählt Traffic aus AI Overviews und dem KI-Modus im Leistungsbericht der Search Console, Ihr Ergebnisblatt deckt ihn also schon ab. Impressionen allein in diesen Funktionen zeigt der Leistungsbericht zu generativer KI (seit dem 31. August 2026). Ob ChatGPT, Gemini oder Perplexity Ihr Unternehmen nennen, prüfen Sie mit unserem <a href="/de/ki-sichtbarkeit-pruefen">kostenlosen Tool zur KI-Sichtbarkeit</a>.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'beispiel',
        h2: 'Beispiel: ein Redaktionsplan für ein Quartal bei einem Dienstleister',
        html: '<p>Hier ein anschaulicher Plan für ein fiktives Unternehmen, das in einer Metropolregion Wärmepumpen einbaut. Er zeigt, wie Zeilen über interne Links zusammenhängen: Jeder Artikel verweist auf die Leistungsseite, und eine Fallstudie stützt sie. Die FAQ hat kein eigenes Haupt-Keyword, weil sie Teil der Leistungsseite ist.</p>',
        tabela: {
          id: 'tabelle-beispiel',
          caption: 'Beispiel für einen Redaktionsplan für 3 Monate (fiktives Unternehmen)',
          columns: [
            { key: 'miesiac', label: 'Monat' },
            { key: 'temat', label: 'Thema' },
            { key: 'fraza', label: 'Haupt-Keyword' },
            { key: 'intencja', label: 'Intention' },
            { key: 'format', label: 'Format' },
            { key: 'url', label: 'Ziel-URL' },
            { key: 'linki', label: 'Interne Links' },
          ],
          rows: [
            { miesiac: '1', temat: 'Wärmepumpe einbauen in [Stadt]', fraza: 'wärmepumpe einbau [stadt]', intencja: 'lokal', format: 'Leistungsseite', url: '/waermepumpe-einbau', linki: 'von: Startseite, /leistungen' },
            { miesiac: '1', temat: 'FAQ: Was Kunden vor dem Einbau fragen', fraza: '- (stützt das Keyword der Leistungsseite)', intencja: 'lokal', format: 'FAQ-Bereich auf der Leistungsseite', url: '/waermepumpe-einbau#faq', linki: 'Teil der Leistungsseite' },
            { miesiac: '2', temat: 'Was kostet der Einbau einer Wärmepumpe?', fraza: 'wärmepumpe einbau kosten', intencja: 'kommerziell', format: 'Artikel mit Kostentabelle', url: '/blog/waermepumpe-kosten', linki: 'auf: /waermepumpe-einbau' },
            { miesiac: '2', temat: 'Wärmepumpe oder Gasheizung', fraza: 'wärmepumpe oder gasheizung', intencja: 'kommerziell', format: 'Vergleich', url: '/blog/waermepumpe-oder-gasheizung', linki: 'auf: /blog/waermepumpe-kosten, /waermepumpe-einbau' },
            { miesiac: '3', temat: 'Altbau aus den 1990ern nachrüsten: Fallstudie', fraza: 'wärmepumpe im älteren haus', intencja: 'informativ', format: 'Fallstudie', url: '/projekte/nachruestung-haus-1990er', linki: 'auf: /waermepumpe-einbau' },
            { miesiac: '3', temat: 'Aktualisierung: Arten von Wärmepumpen', fraza: 'arten von wärmepumpen', intencja: 'informativ', format: 'Aktualisierung eines Inhalts', url: '/blog/waermepumpen-arten', linki: 'Links ergänzen auf: /blog/waermepumpe-kosten, /waermepumpe-einbau' },
          ],
          przypis: 'Unternehmen, URLs und Keywords sind Beispiele. Die Spalten „Verantwortlich“, „Status“ und „Ergebnisse“ stehen in der PDF-Vorlage.',
        },
      },
      {
        id: 'inhalte-aktualisieren',
        h2: 'Aktualisierungen alter Inhalte planen, nicht nur neue Beiträge',
        html: [
          '<p>Ein Redaktionsplan besteht nicht nur aus neuen Texten. Ältere Artikel veralten, und manchmal konkurrieren zwei von ihnen um dasselbe Keyword. Reservieren Sie mindestens einen Platz im Monat für eine Aktualisierung.</p>',
          '<p>Die Search Console zeigt die Kandidaten. Vergleichen Sie die letzten 3 Monate mit demselben Zeitraum des Vorjahres (die Search Console speichert Daten der letzten 16 Monate) und sortieren Sie den Tab „Seiten“ nach der Veränderung der Klicks. Die URLs mit dem größten Rückgang kommen mit dem Format „Aktualisierung“ in den Kalender. Die zweite Gruppe sind Seiten mit einer durchschnittlichen Position von 4 bis 20 bei Keywords, die für den Umsatz wichtig sind, denn sie liegen nah an den obersten Ergebnissen.</p>',
          '<h3>Aktualisieren, erweitern, zusammenlegen, entfernen oder belassen</h3>',
          '<ul>',
          '<li><strong>Aktualisieren</strong>, wenn der Inhalt veraltet ist: Preise, Vorschriften, Screenshots, Beispiele.</li>',
          '<li><strong>Erweitern</strong>, wenn die Seite für Anfragen erscheint, die sie nicht beantwortet. Ergänzen Sie einen Abschnitt oder eine FAQ.</li>',
          '<li><strong>Zusammenlegen</strong>, wenn zwei URLs dieselbe Frage beantworten. Behalten Sie die stärkere, übertragen Sie den Inhalt und leiten Sie die schwächere URL per 301 weiter.</li>',
          '<li><strong>Entfernen oder weiterleiten</strong>, wenn eine Seite keinen Traffic, keine Links und keinen geschäftlichen Wert hat. Haben Sie eine Seite zu einem eng verwandten Thema, leiten Sie die URL per 301 dorthin weiter. Wenn nicht, kann die URL den Code 404 oder 410 liefern.</li>',
          '<li><strong>Belassen</strong>, wenn der Inhalt aktuell ist und der Rückgang saisonal. Der Jahresvergleich zeigt es Ihnen.</li>',
          '</ul>',
          '<p>Ändern Sie das Datum „zuletzt aktualisiert“ nur, wenn sich der Inhalt wirklich geändert hat. Die Hinweise von Google fragen ausdrücklich, ob Sie Seitendaten ändern, damit sie frisch wirken, obwohl sich der Inhalt nicht wesentlich geändert hat.</p>',
        ].join(''),
      },
      {
        id: 'ergebnisse-messen',
        h2: 'So messen Sie Ergebnisse: Klicks in der Search Console nach 30 und 90 Tagen',
        html: [
          '<p>Jeder Text bekommt zwei Prüftermine: 30 und 90 Tage nach der Veröffentlichung. Tragen Sie sie am Tag der Veröffentlichung in den Kalender ein, damit sie nicht untergehen. Jede Prüfung dauert pro URL einige Minuten.</p>',
          '<ol>',
          '<li>Öffnen Sie in der Search Console den Leistungsbericht und setzen Sie den Zeitraum so, dass er am Veröffentlichungsdatum beginnt.</li>',
          '<li>Fügen Sie einen Seitenfilter mit der URL aus Ihrem Plan hinzu.</li>',
          '<li>Notieren Sie Klicks, Impressionen und durchschnittliche Position.</li>',
          '<li>Prüfen Sie auf dem Tab „Suchanfragen“, ob die Seite für das Haupt-Keyword aus Ihrem Plan oder für andere Anfragen erscheint.</li>',
          '<li>Prüfen Sie nach 90 Tagen in GA4 die Schlüsselereignisse (zum Beispiel ein Formular oder ein Klick auf Ihre Telefonnummer) aus Besuchen, die auf dieser Seite begonnen haben. Markieren Sie diese Ereignisse vor der Veröffentlichung als Schlüsselereignisse, denn GA4 wendet die Änderung nicht auf vergangene Daten an.</li>',
          '<li>Tragen Sie Ihre Entscheidung in das Ergebnisblatt ein.</li>',
          '</ol>',
          '<p>Die Prüfung nach 30 Tagen zeigt vor allem, ob Google die Seite indexiert hat und mit welchen Anfragen es sie verbindet. Die Prüfung nach 90 Tagen ist die Grundlage für Entscheidungen. Beurteilen Sie einen Text nicht nach der ersten Woche: Eine neue Seite braucht Zeit, bis Google sie findet, indexiert und bewertet. Lesen Sie die Zahlen auch ohne die neuesten Daten (die gepunktete Linie im Diagramm), denn sie sind vorläufig und können sich noch ändern.</p>',
        ].join(''),
        tabela: {
          id: 'tabelle-entscheidungen',
          caption: 'Was Sie nach 90 Tagen mit einem Inhalt tun',
          columns: [
            { key: 'sytuacja', label: 'Was Sie in der Search Console und in GA4 sehen' },
            { key: 'znaczenie', label: 'Was es bedeutet' },
            { key: 'decyzja', label: 'Was Sie tun' },
          ],
          rows: [
            { sytuacja: 'Keine Impressionen', znaczenie: 'Die Seite ist womöglich nicht indexiert, oder keine andere Seite verlinkt auf sie', decyzja: 'Mit der URL-Prüfung kontrollieren und interne Links ergänzen' },
            { sytuacja: 'Impressionen für das Haupt-Keyword, wenige Klicks', znaczenie: 'Google verbindet die Seite mit dem Thema, aber sie rankt niedrig, oder der Titel erzeugt keinen Klick', decyzja: 'Titel und Meta-Beschreibung neu schreiben, Inhalt erweitern, Links von starken Seiten ergänzen' },
            { sytuacja: 'Impressionen für andere Anfragen als geplant', znaczenie: 'Der Inhalt passt zu einer anderen Intention', decyzja: 'Keyword im Plan ändern oder den Text für die ursprüngliche Intention neu schreiben' },
            { sytuacja: 'Die Klicks wachsen', znaczenie: 'Der Inhalt funktioniert', decyzja: 'Link zur Leistungsseite ergänzen und den nächsten Text zum Thema planen' },
            { sytuacja: 'Klicks, aber keine Anfragen', znaczenie: 'Der Traffic erreicht Ihr Angebot nicht', decyzja: 'Einen klaren Link zur Leistungsseite und einen Handlungsaufruf im Text ergänzen und prüfen, ob das Thema zu Ihren Kunden passt' },
            { sytuacja: 'Zwei URLs für dasselbe Keyword', znaczenie: 'Keyword-Kannibalisierung: Die Seiten konkurrieren miteinander', decyzja: 'Seiten zusammenlegen oder ihre Intentionen trennen' },
          ],
        },
        htmlPo: '<p>Sie sind nicht sicher, ob das Problem im Inhalt oder in der Technik Ihrer Website liegt? Beginnen Sie mit dem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>. Er zeigt die Fehler, die neue Inhalte ausbremsen, bevor Sie sie schreiben.</p>',
      },
      {
        id: 'haeufige-fehler',
        h2: 'Häufige Fehler bei einer Redaktionsplan Vorlage',
        html: [
          '<ul>',
          '<li><strong>Zwei Texte für ein Keyword.</strong> Sie konkurrieren miteinander, und keiner wächst. Die Regel: ein Haupt-Keyword, eine URL.</li>',
          '<li><strong>Themen ohne Intention.</strong> Ein Artikel für ein Keyword, bei dem Google Onlineshops zeigt, schafft es selten auf die erste Seite.</li>',
          '<li><strong>Keine internen Links.</strong> Google findet neue Seiten vor allem über Links. Ein neuer Text, auf den keine andere Seite verlinkt, ist für Besucher und Googlebot schwer zu finden.</li>',
          '<li><strong>Ein Kalender, den Sie nicht halten können.</strong> Ein Plan für zwölf Texte im Monat, der nach drei Wochen zusammenbricht, bringt weniger als zwei gleichmäßige.</li>',
          '<li><strong>Inhalte ohne etwas Neues.</strong> Eine Zusammenfassung der ersten zehn Ergebnisse oder ein KI-Text, den niemand auf Fakten geprüft hat, gibt Google keinen Grund, ihn über die Originale zu stellen. Jeder Text im Plan sollte eigene Daten, ein Beispiel oder eigene Erfahrung hinzufügen.</li>',
          '<li><strong>Kopierte Stadtseiten.</strong> Dieselbe Seite mit einem anderen Städtenamen bietet Kunden nichts Neues. Planen Sie eine Standortseite nur, wenn Sie lokale Inhalte dafür haben.</li>',
          '<li><strong>Keine Messung.</strong> Ohne die Spalte „Ergebnisse“ wissen Sie nicht, welche Themen funktionieren, und planen das nächste Quartal blind.</li>',
          '<li><strong>Nur neue Inhalte.</strong> Wenn Sie Aktualisierungen auslassen, wächst die Website, während ältere Seiten Traffic verlieren.</li>',
          '<li><strong>Keine Leistungsseiten im Plan.</strong> Blog-Traffic wird nicht zu Anfragen, wenn es keinen Ort gibt, an den er geleitet wird.</li>',
          '</ul>',
          '<p>Möchten Sie die Planung der Inhalte lieber Spezialisten überlassen? Sehen Sie sich an, wie unsere <a href="/de/seo-fuer-unternehmen">SEO-Leistungen für Unternehmen</a> funktionieren.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Vorschau der Vorlage: Redaktionskalender für 3 Monate',
      opis: 'Das enthält das PDF (Tabellen auf einige Zeilen gekürzt). Übernehmen Sie es in eine Tabellenkalkulation oder drucken Sie es aus und füllen Sie es von Hand aus.',
      html: [
        '<h3>Teil 1. Grundlagen des Plans</h3>',
        '<ol>',
        '<li>Inhaltliches Ziel dieses Quartals (zum Beispiel mehr Anfragen für eine Leistung): ____________</li>',
        '<li>Zielgruppe (wer sie ist, welches Problem sie hat, wo sie in der Entscheidung steht): ____________</li>',
        '<li>Leistungsseiten, zu denen Ihre Artikel führen sollen: ____________</li>',
        '<li>Takt: ___ neue Texte und ___ Aktualisierungen pro Monat</li>',
        '<li>Verantwortliche für den Kalender: ____________ Termin des Quartalsrückblicks: ____________</li>',
        '</ol>',
        '<h3>Teil 2. Themenspeicher</h3>',
        tabelaHtml(
          ['#', 'Thema', 'Haupt-Keyword', 'Intention', 'Quelle der Idee', 'W (1-10)', 'S (1-10)', 'E (1-10)', 'Punkte', 'Monat'],
          puste(3, 10),
        ),
        '<p>W - Wirkung auf den Umsatz, S - Sicherheit der Einschätzung, E - Einfachheit der Umsetzung (10 = sehr einfach). Punkte = W × S × E (ICE). Quelle der Idee: Search Console, Keyword-Recherche, Google-Vorschläge und „Weitere Fragen“, Kundenfragen, Lücke gegenüber der Konkurrenz.</p>',
        '<h3>Teil 3. Redaktionskalender: Monat 1, 2 und 3</h3>',
        tabelaHtml(
          ['Woche / Datum', 'Thema', 'Haupt-Keyword', 'Intention', 'Format', 'Ziel-URL', 'Interne Links', 'Verantwortlich', 'Status', 'Veröffentlichung'],
          [...puste(4, 10, (i) => `Woche ${i + 1}`), ['Aktualisierung', '', '', '', '', '', '', '', '', '']],
        ),
        '<p>Die Monate 2 und 3 haben denselben Aufbau. Im PDF hat jeder Monat eine eigene Tabelle mit einer für eine Aktualisierung reservierten Zeile.</p>',
        '<p>Status: Idee → Briefing → Schreiben → Lektorat → fertig → veröffentlicht → Aktualisierung nötig. Formate: Artikel, Leistungsseite, FAQ, Fallstudie, Vergleich, Aktualisierung.</p>',
        '<h3>Teil 4. Ergebnisblatt (Search Console und GA4)</h3>',
        tabelaHtml(
          ['Ziel-URL', 'Veröffentlichung', 'Haupt-Keyword', 'Klicks nach 30 Tagen', 'Impressionen nach 30 Tagen', 'Klicks nach 90 Tagen', 'Impressionen nach 90 Tagen', 'Ø Position nach 90 Tagen', 'Anfragen (GA4) nach 90 Tagen', 'Entscheidung'],
          puste(2, 10, () => ''),
        ),
        '<p>Entscheidung: belassen, erweitern, Titel neu schreiben, Links ergänzen, mit einer anderen URL zusammenlegen, entfernen oder weiterleiten.</p>',
        '<h3>Teil 5. Checkliste vor der Veröffentlichung</h3>',
        '<ul>',
        '<li>☐ Das Haupt-Keyword steht im Seitentitel, in der H1 und im ersten Absatz. Der Titel hat etwa 50-60 Zeichen (Google hat keine Grenze, kürzt längere Titel aber meist).</li>',
        '<li>☐ Der Inhalt passt zur Intention, die Sie in den Ergebnissen von Google sehen.</li>',
        '<li>☐ Der Text bietet etwas, das die Top 10 nicht haben: eigene Daten, ein Beispiel, Projektfotos, die Sicht eines Experten.</li>',
        '<li>☐ Unter jeder Überschrift in Form einer Frage antworten der erste oder die ersten zwei Sätze direkt, und Zahlen haben eine Quelle.</li>',
        '<li>☐ Autor, Datum und Quellen sind auf der Seite sichtbar.</li>',
        '<li>☐ Keine andere URL der Website zielt auf dasselbe Keyword.</li>',
        '<li>☐ Mindestens zwei bestehende Seiten verlinken auf den neuen Text, und er verlinkt auf die richtige Leistungsseite und auf 2-4 verwandte Texte.</li>',
        '<li>☐ Die Meta-Beschreibung sagt, was die Leserin oder der Leser findet, und gibt einen Grund zum Klicken.</li>',
        '<li>☐ Jeder mit KI entworfene Text wurde von einer Person auf Fakten geprüft und redigiert.</li>',
        '<li>☐ Das Veröffentlichungsdatum steht im Kalender, die Prüftermine nach 30 und 90 Tagen im Teamkalender.</li>',
        '<li>☐ In GA4 sind Formularabsendungen und Klicks auf Ihre Telefonnummer als Schlüsselereignisse markiert (GA4 zählt sie nicht rückwirkend).</li>',
        '<li>☐ Bei Aktualisierungen: Das Datum „zuletzt aktualisiert“ ändert sich nur, wenn sich der Inhalt wirklich geändert hat.</li>',
        '</ul>',
        '<h3>Teil 6. Quartalsrückblick</h3>',
        '<ol>',
        '<li>Welche Texte haben nach 90 Tagen die meisten Klicks und Anfragen gebracht, und warum?</li>',
        '<li>Welche Texte haben nichts gebracht, und was haben Sie entschieden?</li>',
        '<li>Haben Sie den Takt gehalten? Wenn nicht, welchen Takt legen Sie für das nächste Quartal fest?</li>',
        '<li>Welche Seiten verlieren im Jahresvergleich Klicks, und erscheinen zwei URLs für dasselbe Keyword?</li>',
        '<li>Nennen KI-Assistenten und AI Overviews Ihr Unternehmen bei den Fragen aus Ihrem Plan?</li>',
        '<li>Themen aus dem Speicher für den Kalender des nächsten Quartals: ____________</li>',
        '</ol>',
      ].join(''),
    },
    formularz: {
      h2: 'Vorlage als PDF erhalten',
      opis: 'Wir senden Ihnen ein PDF mit den Grundlagen des Plans, einem Themenspeicher, einem Kalender für 3 Monate, einem Ergebnisblatt, einer Checkliste vor der Veröffentlichung und einem Quartalsrückblick. Drucken Sie es aus oder übernehmen Sie es in eine Tabellenkalkulation.',
      etykieta: 'Ihre E-Mail-Adresse',
      przycisk: 'Redaktionsplan Vorlage (PDF) erhalten',
      przedmiot: 'die Redaktionsplan Vorlage',
      komunikatOk: 'Gesendet. Schauen Sie in Ihr Postfach, auch in die Ordner „Werbung“ und „Spam“: Der Link zum PDF kommt innerhalb einer Minute.',
    },
    faq: [
      {
        question: 'Was ist der Unterschied zwischen einem Redaktionsplan und einem Redaktionskalender?',
        answer: 'In der Praxis sehr wenig. Beide zeigen, was wann erscheint. Ein Redaktionskalender legt meist mehr Gewicht auf den Ablauf: Briefings, Entwürfe, Lektorat und Freigabe. Ein für SEO gebauter Redaktionsplan ergänzt Haupt-Keyword, Suchintention, Ziel-URL, interne Links und Ergebnisse. Diese Vorlage deckt beides ab, der Ablauf steckt in den Spalten „Verantwortlich“ und „Status“.',
      },
      {
        question: 'Wie oft sollte ein kleines Unternehmen neue Inhalte veröffentlichen?',
        answer: 'So oft, wie Ihr Team es schafft, ohne dass die Qualität leidet. Beständigkeit ist wichtiger als Menge. Zwei neue Texte im Monat plus eine Aktualisierung älterer Inhalte sind für ein kleines Unternehmen ein sinnvoller Anfang. Zeigen Ihre Prüfungen nach 90 Tagen, dass die Texte Klicks bringen, erhöhen Sie den Takt. Wenn nicht, verbessern Sie zuerst, was Sie schon haben.',
      },
      {
        question: 'Brauche ich für den Redaktionsplan Excel oder reicht das PDF?',
        answer: 'Die Vorlage ist ein PDF, kein Excel-Dokument. Für die tägliche Arbeit übernehmen Sie die Tabellen in Excel oder Google Sheets, denn dort lässt sich leicht nach Status filtern und nach Themen sortieren. Das PDF eignet sich zum Planen auf Papier, für einen Workshop im Team oder für die Freigabe durch die Geschäftsleitung. Die Spalten des PDF entsprechen eins zu eins einer Tabellenkalkulation, Sie können also mit dem Ausdruck beginnen und den Plan später in eine Datei übertragen.',
      },
      {
        question: 'Wie lange dauert es, bis neue Inhalte in Google Ergebnisse zeigen?',
        answer: 'Das hängt von Ihrer Website, Ihren Konkurrenten und dem Thema ab, deshalb hat die Vorlage zwei Prüftermine. Nach 30 Tagen sehen Sie in der Search Console, ob die Seite erscheint und für welche Anfragen. Nach 90 Tagen betrachten Sie Klicks und Anfragen aus GA4 und entscheiden, ob Sie den Inhalt belassen, erweitern, den Titel neu schreiben oder ihn mit einer anderen URL zusammenlegen. Beurteilen Sie einen Text nicht nach einer Woche.',
      },
      {
        question: 'Wie viele Themen sollten im Themenspeicher stehen?',
        answer: 'Genug für ein bis zwei Quartale bei Ihrem Takt. Bei zwei Texten im Monat sind das 6 bis 12 Themen. Der Speicher muss nicht lang sein, aber jedes Thema sollte ein Haupt-Keyword, eine Intention und eine ICE-Bewertung für Wirkung, Sicherheit und Einfachheit haben. Dann ist der Aufbau des nächsten Kalenders eine schnelle Aufgabe und keine ganze Besprechung.',
      },
      {
        question: 'Kann ich diesen Redaktionsplan auch für Social Media nutzen?',
        answer: 'Die Vorlage ist für Inhalte der Website gebaut: Blogartikel, Leistungsseiten, FAQs und Fallstudien. Social Media hat einen anderen Rhythmus und andere Ziele. Planen Sie Ihre Beiträge in sozialen Netzwerken rund um das, was Sie auf der Website veröffentlichen, sodass aus jedem Artikel mehrere Beiträge werden, die auf die URL aus Ihrem Plan führen. So stützen sich beide Pläne, statt um Ihr Team zu konkurrieren.',
      },
    ],
    zrodla: ZRODLA,
    powiazane: [
      { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'die technische Seite Ihrer Website prüfen, bevor Sie veröffentlichen' },
      { href: '/sprawdz-widocznosc-w-ai', tekst: 'KI-Sichtbarkeit prüfen', opis: 'sehen, ob ChatGPT, Gemini und Perplexity Ihr Unternehmen nennen' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'SEO für Unternehmen', opis: 'Inhaltsplanung, technisches SEO und Reporting in einer Leistung' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste', opis: '50 Punkte für Technik, On-Page SEO, lokale Sichtbarkeit, KI-Tauglichkeit und Messung' },
    ],
    kroki: KROKI,
    plikNazwa: 'Redaktionsplan Vorlage (PDF)',
  },
};

export default SZABLON_DE;
