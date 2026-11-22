// Daten des deutschen Ratgebers /de/blog/wie-lange-dauert-seo (22.11.2026; Schlüssel EN: /blog/how-long-does-seo-take).
// Hauptkeyword: "wie lange dauert seo". Alle Zahlen verifiziert gegen Google Search Central (SEO Starter Guide & Ask Google to recrawl),
// die Ahrefs-Studie vom 15.05.2025 (1,74 % bzw. 6,11 % neuer Seiten in Top 10 binnen 1 Jahr) sowie unsere vier echten Zeitachsen aus lib/realizacjeGsc.js.

import { METRYKI_GSC, SERIE_GSC } from '../realizacjeGsc.js';

const fmt = (n) => new Intl.NumberFormat('de-DE').format(n);
const komma = (n) => String(n).replace('.', ',');
const datumDe = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

const mtSerie = SERIE_GSC.madamethai;
const stSerie = SERIE_GSC.staniax;
const tqSerie = SERIE_GSC.tql;
const abSerie = SERIE_GSC['ase-bot'];

const mtMet = METRYKI_GSC.madamethai;
const stMet = METRYKI_GSC.staniax;
const tqMet = METRYKI_GSC.tql;
const abMet = METRYKI_GSC['ase-bot'];

const stMinKlik = Math.min(...stSerie.map((w) => w[2]));
const stMaxKlik = Math.max(...stSerie.map((w) => w[2]));
const abPeak = abSerie.reduce((best, w) => (w[3] > best[3] ? w : best), abSerie[0]);

export const BLOG_WIE_LANGE_DE = {
  fallbackPfad: '/blog/wie-lange-dauert-seo',
  okruszek: 'Wie lange dauert SEO?',
  kategoria: 'SEO Grundlagen & Planung',
  h1: 'Wie lange dauert SEO? Was Google sagt und was echte Projektdaten zeigen',
  opublikowano: '2026-11-22',
  aktualisiert: '2026-11-22',
  kurzantwort: 'Wie lange dauert SEO bis zu messbaren Ergebnissen? Laut Google Search Central wirken manche Änderungen binnen weniger Stunden, während andere mehrere Monate benötigen. In unseren echten Search-Console-Daten zeigen sich erste Impressionen oft nach wenigen Tagen, spürbare Sichtbarkeitszuwächse nach 4 bis 8 Wochen und stabile Top-3-Positionen für umkämpfte B2B-Begriffe meist nach 3 bis 6 Monaten.',
  lead: 'Auf die Frage „Wie lange dauert SEO?“ gibt es keine einzelne Monatszahl, weil Indexierung, erste Impressionen und planbare Kundenanfragen auf völlig unterschiedlichen Zeitachsen liegen. In diesem Leitfaden trennen wir diese Phasen sauber, zitieren die offiziellen Aussagen von Google Search Central, ordnen die Ahrefs-Langzeitstudie von Mai 2025 ein und zeigen vier echte Search-Console-Verläufe aus unserer täglichen Arbeit.',
  sekcje: [
    {
      id: 'offizielle-aussagen-google',
      h2: 'Was Google Search Central offiziell über die Dauer von SEO sagt',
      html: [
        '<p>Google nennt bewusst keinen starren Countdown von exakt 90 oder 180 Tagen. Im offiziellen <strong>SEO-Startleitfaden von Google Search Central</strong> heißt es sinngemäß: Jede Änderung an einer Website braucht Zeit, bis sie auf Googles Seite abgebildet wird - <strong>manche greifen in wenigen Stunden, andere brauchen mehrere Monate</strong>. Google empfiehlt ausdrücklich, im Regelfall mindestens einige Wochen abzuwarten, bevor Sie beurteilen, ob sich eine Maßnahme positiv in den Suchergebnissen ausgewirkt hat.</p>',
        '<p>Auch beim vorgelagerten Schritt, dem Crawling und der Aufnahme in den Suchindex, dämpft Google falsche Erwartungen: Laut der Dokumentation <em>Google um erneutes Crawlen deiner URLs bitten</em> dauert das Crawlen neuer oder überarbeiteter Adressen <strong>einige Tage bis einige Wochen</strong> - und selbst ein manueller Abruf über die URL-Prüfung garantiert keine sofortige Ausspielung in den Rankings.</p>',
        '<p>Für die Unternehmenspraxis folgen daraus zwei wichtige Regeln: Bewerten Sie einen Relaunch oder Textumbau niemals nach vier Tagen nervösen Nachsehens, und dokumentieren Sie größere Änderungen immer mit exaktem Datum, damit Sie Ursache und Wirkung später in der Search Console sauber zuordnen können.</p>',
      ].join(''),
    },
    {
      id: 'indexierung-impressionen-top-3',
      h2: 'Der entscheidende Unterschied: Indexierung vs. erste Impressionen vs. stabile Top 3',
      html: [
        '<p>Missverständnisse zwischen Auftraggebern und Agenturen entstehen fast immer dann, wenn beide Seiten unter „SEO wirkt“ etwas anderes verstehen. In der Google Search Console durchläuft jede neue oder überarbeitete Unterseite drei klar getrennte Etappen:</p>',
        '<ol>',
        '<li><strong>Technische Indexierung (Tage bis wenige Wochen):</strong> Googlebot ruft das HTML ab, prüft Statuscode, Canonical Tag und Inhaltstiefe und legt die URL im Index ab. Wird ein versehentliches <code>noindex</code> entfernt oder eine fehlerhafte Weiterleitung repariert, zeigt sich der Effekt oft schon beim nächsten Crawl nach wenigen Tagen.</li>',
        '<li><strong>Erste Impressionen auf Testpositionen (Woche 1 bis Woche 8):</strong> Google blendet die Seite zunächst bei spezifischen Long-Tail-Suchanfragen auf den Positionen 25 bis 60 ein. Im Diagramm steigen die Impressionen sichtbar an, doch auf Seite 3 bis 6 klicken Suchende kaum - das Telefon klingelt in dieser Phase noch nicht häufiger.</li>',
        '<li><strong>Stabile Top-3- bis Top-5-Positionen (Monat 2 bis Monat 6+):</strong> Erst wenn Themenabdeckung, interne Verlinkung, Nutzersignale und externe Referenzen zusammenkommen, klettert die URL auf die erste Ergebnisseite. Auf den Plätzen 1 bis 3 konzentriert sich der Großteil aller gewerblichen Klicks und Angebotsanfragen.</li>',
        '</ol>',
      ].join(''),
      tabela: {
        id: 'tabelle-seo-zeitrahmen-ziele',
        caption: 'Realistische SEO-Zeiträume nach Zielsetzung in unserer Praxis',
        columns: [
          { key: 'ziel', label: 'Konkretes Ziel' },
          { key: 'zeitraum', label: 'Typischer Zeitraum' },
          { key: 'hebel', label: 'Wovon das Tempo abhängt' },
        ],
        rows: [
          {
            id: 'technik-fix',
            ziel: 'Korrektur harter Indexierungsfehler (noindex, 404, falsches Canonical)',
            zeitraum: 'Wenige Tage bis 2 Wochen',
            hebel: 'Crawl-Frequenz der Domain und saubere XML-Sitemap',
          },
          {
            id: 'gbp-lokal',
            ziel: 'Erste Anrufe und Routenanfragen über ein optimiertes Google Unternehmensprofil',
            zeitraum: '2 bis 4 Wochen',
            hebel: 'Standortnähe, richtige Kategorien und echte Kundenbewertungen',
          },
          {
            id: 'sichtbarkeit-audit',
            ziel: 'Erster spürbarer Sichtbarkeitsanstieg nach technischem SEO Audit & On-Page-Umbau',
            zeitraum: '4 bis 8 Wochen',
            hebel: 'Zügige Umsetzung durch Entwickler und klare Ein-Thema-pro-URL-Struktur',
          },
          {
            id: 'lokal-top3',
            ziel: 'Abgestimmte lokale Fokus-Keywords in den Top 3 (unser lokaler Zielwert)',
            zeitraum: '2 bis 3 Monate',
            hebel: 'Lokale Wettbewerbsdichte, Leistungsunterseiten und konsistente NAP-Daten',
          },
          {
            id: 'b2b-national',
            ziel: 'Stabile Top-Positionen für stark umkämpfte überregionale B2B-Keywords',
            zeitraum: '3 bis 6+ Monate (höchster ROI oft ab Monat 6)',
            hebel: 'Gewachsene Domain-Autorität, Fachtiefe und kontinuierlicher Linkaufbau',
          },
        ],
        przypis: 'Wichtiger Hinweis: Keine seriöse Agentur kann Platz 1 garantieren, da Googles Algorithmen unabhängig entscheiden. Für vorab abgestimmte lokale Suchbegriffe arbeiten wir auf ein Top-3-Ziel binnen 2 bis 3 Monaten hin - verfehlen wir dieses Ziel nach 3 Monaten, übernehmen wir den Folgemonat auf eigene Kosten.',
      },
    },
    {
      id: 'ahrefs-studie-und-echte-zeitachsen',
      h2: 'Was die Ahrefs-Studie (Mai 2025) und unsere vier Search-Console-Zeitachsen zeigen',
      html: [
        '<p>Wie schwer es gerade für komplett neue Seiten ist, belegt die groß angelegte Auswertung von <strong>Ahrefs vom 15. Mai 2025</strong>: In einer Zufallsstichprobe von 1 Million neu entdeckten URLs aus dem September 2023 erreichten lediglich <strong>1,74 %</strong> innerhalb eines Jahres die Google Top 10. Eine zweite, laut den Studienautoren fairere Stichprobe von 2 Millionen im Oktober 2023 frisch veröffentlichten Seiten kam auf <strong>6,11 %</strong> in den Top 10 binnen zwölf Monaten. Gleichzeitig war die durchschnittliche Seite auf Platz 1 rund <strong>5 Jahre alt</strong>, und <strong>72,9 %</strong> aller Top-10-Ergebnisse bestanden seit mehr als drei Jahren. Interessantes Detail am Rande: Von den wenigen Seiten, die den Sprung in die Top 10 überhaupt schafften, gelang dies <strong>40,82 %</strong> bereits im ersten Monat - meist dann, wenn eine bereits autoritätsstarke Domain ein wenig umkämpftes Spezialthema besetzte.</p>',
        '<p>Genau dieses Muster - schnelle erste Impressionen, aber geduldiger Aufbau der Klicks - sehen wir in unseren eigenen Projekten. Die folgende Tabelle zeigt vier echte Zeitachsen aus der Google Search Console (drei reale polnische Kundenprojekte sowie unser eigenes englischsprachiges KI-Projekt; alle Details finden Sie auch in unserer <a href="/de/blog/seo-ergebnisse">SEO Fallstudie</a>):</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-vier-zeitachsen-gsc',
        caption: `Vier echte Search-Console-Zeitachsen aus unserer Betreuung (aktuelles Fenster bis ${datumDe(stMet.endDate)})`,
        columns: [
          { key: 'projekt', label: 'Website & Ausgangslage' },
          { key: 'fruehsignal', label: 'Frühsignal nach Start / Fensterbeginn' },
          { key: 'stand', label: 'Verlauf & aktueller 92-Tage-Stand' },
        ],
        rows: [
          {
            id: 'madame-thai',
            projekt: 'MADAME THAI (madamethai.pl) - neuer Restaurantstandort (polnisches Kundenprojekt)',
            fruehsignal: `187 Klicks & ca. 10.100 Impressionen in den ersten 26 Tagen nach Start; Startwoche im aktuellen Fenster: ${fmt(mtSerie[0][2])} Klicks / ${fmt(mtSerie[0][3])} Impressionen`,
            stand: `Anstieg auf ${fmt(mtSerie[mtSerie.length - 1][2])} Klicks / Woche; 92-Tage-Summe: ${fmt(mtMet.totalClicks)} Klicks, ${fmt(mtMet.totalImpr)} Impressionen, Ø-Position ${komma(mtMet.position)}`,
          },
          {
            id: 'staniax',
            projekt: 'STANIAX (staniax.pl) - B2B Vakuummetallisierung ab null Sichtbarkeit (polnisches Kundenprojekt)',
            fruehsignal: `ca. 1.100 Impressionen im ersten Monat nach Relaunch (Mai 2026); Startwoche August: ${fmt(stSerie[0][2])} Klicks / ${fmt(stSerie[0][3])} Impressionen`,
            stand: `Konstant ${stMinKlik} bis ${stMaxKlik} B2B-Klicks pro Woche; 92-Tage-Summe: ${fmt(stMet.totalClicks)} Klicks, ${fmt(stMet.totalImpr)} Impressionen, Ø-Position ${komma(stMet.position)}`,
          },
          {
            id: 'tql',
            projekt: 'TQL (tql.pl) - ISO-Beratung mit frisch gestarteter Website (polnisches Kundenprojekt)',
            fruehsignal: 'Erste Impression an Tag 1; nach 18 Tagen (05.-22.08.2026) 296 Impressionen, 2 Klicks und Ø-Position 34,6',
            stand: `Nach 8 ruhigen Wochen Sprung auf ${fmt(tqSerie[tqSerie.length - 1][3])} Impressionen und ${fmt(tqSerie[tqSerie.length - 1][2])} Klicks in der Woche bis ${datumDe(tqSerie[tqSerie.length - 1][1])} (Summe: ${fmt(tqMet.totalClicks)} Klicks, Ø-Position ${komma(tqMet.position)})`,
          },
          {
            id: 'ase-bot',
            projekt: 'ASE-BOT (ase-bot.live) - eigene KI-Plattform in umkämpfter US-Nische (.live ohne Historie)',
            fruehsignal: `Zwischenhoch im aktuellen Fenster bei ${fmt(abPeak[3])} Impressionen/Woche (${datumDe(abPeak[0])} - ${datumDe(abPeak[1])})`,
            stand: `92-Tage-Summe: ${fmt(abMet.totalImpr)} Impressionen, aber nur ${fmt(abMet.totalClicks)} Klicks auf Ø-Position ${komma(abMet.position)} - zeigt ehrlich, dass hohe Konkurrenz mehr Zeit & Links verlangt`,
          },
        ],
        przypis: `Quelle: Google Search Console API (synchronisierte Wochenreihen vom ${datumDe(stMet.startDate)} bis ${datumDe(stMet.endDate)}) sowie dokumentierte Startmessungen vom August 2026.`,
      },
    },
    {
      id: 'fuenf-faktoren-geschwindigkeit',
      h2: '5 Faktoren, die bestimmen, ob SEO bei Ihnen schneller oder langsamer greift',
      html: [
        '<ul>',
        '<li><strong>1. Bestehende Domain-Autorität und Historie:</strong> Eine gewachsene Unternehmensdomain mit echten Erwähnungen von Verbänden, Kunden und Fachmedien rankt für neue Leistungsseiten um Monate schneller als eine frisch registrierte Domain. Wo Ihre Seite im Link-Graphen von 135 Millionen Domains steht, zeigt unser kostenloser <a href="/de/tools/domain-authority-checker">Domain Authority Checker</a>.</li>',
        '<li><strong>2. Wettbewerbsdichte und Keyword-Spezifität:</strong> „CNC-Lohnfertigung Titan Kleinserien“ bewegt sich deutlich rascher in die Top 5 als ein generischer Sammelbegriff wie „Maschinenbau Deutschland“.</li>',
        '<li><strong>3. Technischer Ausgangszustand:</strong> Blockierte Crawler, langsames mobiles Rendering, widersprüchliche Canonical Tags oder tausende Parameter-Duplikate bremsen jeden noch so guten Fachtext aus. Deshalb stehen in den ersten Wochen immer ein <a href="/de/seo-audit">SEO Audit</a> (oder vorab unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a>) und die technische Bereinigung an erster Stelle.</li>',
        '<li><strong>4. Umsetzungsgeschwindigkeit auf Kundenseite:</strong> Der beste Maßnahmenplan wirkt erst ab dem Tag, an dem er live auf dem Server steht. Bleiben Freigaben für Texte oder Entwickler-Tickets acht Wochen liegen, verschiebt sich die Ergebniskurve exakt um diese acht Wochen nach hinten.</li>',
        '<li><strong>5. Substanz bei Inhalten und Verlinkung:</strong> Seiten mit konkreten Preisen, echten Projektdaten, Vergleichstabellen und redaktionellem <a href="/de/blog/linkaufbau-b2b">Linkaufbau im B2B</a> setzen sich nachhaltiger durch als dünne Standardtexte.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'fruehsignale-und-vergleich-google-ads',
      h2: 'Frühindikatoren prüfen - und wann Google Ads parallel sinnvoll sind',
      html: [
        '<p>Sie müssen nicht sechs Monate im Blindflug warten, um zu erkennen, ob Ihre Suchmaschinenoptimierung greift. Prüfen Sie in der Google Search Console alle zwei Wochen exakt diese Reihenfolge von Frühindikatoren:</p>',
        '<ol>',
        '<li>Steigt die Zahl der <strong>ordnungsgemäß indexierten Zielseiten</strong> ohne ungeplante Ausschlüsse?</li>',
        '<li>Wachsen die <strong>wöchentlichen Impressionen</strong> für Nicht-Marken-Suchbegriffe?</li>',
        '<li>Nimmt die <strong>Anzahl unterschiedlicher Suchanfragen</strong> zu, für die Ihre Leistungsseiten eingeblendet werden?</li>',
        '<li>Verbessert sich die <strong>durchschnittliche Position</strong> einzelner Fokus-URLs schrittweise von Platz 45 auf Platz 18 und weiter Richtung Top 10?</li>',
        '<li>Steigen anschließend die <strong>organischen Klicks und Schlüsselereignisse in GA4</strong>?</li>',
        '</ol>',
        '<p>Bewegt sich bei den Punkten 2 und 3 selbst nach sechs bis acht Wochen nach Livegang nichts, sollten Indexierung, Suchintention und Seitenaufbau sofort nachgeschärft werden, statt passiv ein weiteres Quartal abzuwarten.</p>',
        '<h3>SEO vs. Google Ads (SEA): Zeit gegen laufende Klickpreise</h3>',
        '<p>Wenn Ihr Vertrieb bereits nächste Woche dringend neue Leads benötigt, ist SEO als alleiniger Sofortkanal die falsche Wahl. <strong>Google Ads (SEA)</strong> bringen sofort nach Freischaltung Besucher auf Ihre Seite, kosten im B2B aber bei jedem einzelnen Klick Geld und versiegen in der Sekunde, in der Sie das Tagesbudget pausieren. <strong>SEO</strong> verlangt Vorlaufzeit in den ersten Monaten, baut dafür aber einen eigenen Vermögenswert auf, bei dem zusätzliche Klicks keine variablen Anzeigenkosten verursachen.</p>',
        '<p>Den detaillierten Kosten- und Kanalvergleich mit echten Klickpreisen lesen Sie in unserem Ratgeber <a href="/de/vergleiche/seo-oder-google-ads">SEO oder Google Ads (SEA)</a>. Ab welchem Monat sich die Vorlaufzeit für Ihr konkretes Geschäftsmodell in Euro rechnet, kalkulieren Sie in 60 Sekunden mit unserem <a href="/de/tools/seo-verlustrechner">SEO-Rechner &amp; ROI-Rechner</a>; unsere monatlich kündbaren Pakete ab 450 Euro netto finden Sie transparent unter <a href="/de/seo-kosten">SEO Kosten</a>.</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zur Dauer von SEO',
  faq: [
    {
      id: 'kann-seo-in-einem-monat-wirken',
      question: 'Kann SEO schon nach einem Monat sichtbare Ergebnisse liefern?',
      answer: 'Teilweise ja, aber meist auf der Ebene von Indexierung, behobenen Technikfehlern, ersten Impressionen in der Search Console oder lokalen Google-Maps-Anfragen. Laut der Ahrefs-Studie von Mai 2025 erreichten zwar 40,82 Prozent der erfolgreichen Top-10-Seiten ihr Ranking bereits im ersten Monat, doch insgesamt schafften überhaupt nur 1,74 bis 6,11 Prozent aller neuen Seiten den Sprung in die Top 10 innerhalb eines Jahres. Planen Sie Monat eins realistisch für Fundament, Technik und erste Messdaten ein.',
    },
    {
      id: 'wie-lange-dauert-seo-neue-website',
      question: 'Wie lange dauert SEO bei einer komplett neuen Website ohne Historie?',
      answer: 'Bei einer frisch registrierten Domain dauert der Aufbau spürbar länger als bei einer etablierten Unternehmensseite. Erste Impressionen sehen wir in der Search Console oft schon nach wenigen Tagen bis drei Wochen, doch bis Google genügend Vertrauen für umkämpfte B2B-Suchbegriffe auf Seite 1 aufbaut, vergehen in der Regel 4 bis 9 Monate konsequenter Arbeit an Fachinhalten und seriösen Verlinkungen.',
    },
    {
      id: 'wie-lange-dauert-google-indexierung',
      question: 'Wie lange braucht Google, um eine neue Unterseite zu indexieren?',
      answer: 'Laut Google Search Central kann das Crawlen und Indexieren einer neuen oder aktualisierten URL wenige Tage bis einige Wochen dauern. Über die XML-Sitemap und die URL-Prüfung in der Google Search Console lässt sich der Abruf anstoßen; auf gut verlinkten Unternehmensdomains mit sauberem Server-HTML erfolgt die Aufnahme häufig schon binnen 24 bis 72 Stunden, eine Garantie gibt Google jedoch nicht.',
    },
    {
      id: 'warum-keine-vertragslaufzeit-12-monate',
      question: 'Muss ich wegen der SEO-Anlaufzeit sofort einen 12-Monats-Vertrag unterschreiben?',
      answer: 'Nein. Dass SEO mehrere Monate bis zur vollen Reife benötigt, ist eine fachliche Tatsache - daraus folgt aber keine Pflicht zu starren Jahresknebelverträgen. Bei AI SEO COMPANY sind alle SEO-Pakete monatlich kündbar: Sie sehen in den ersten Wochen im Kundenportal genau, welche technischen Korrekturen, Texte und Links geliefert wurden und wie sich Impressionen und Positionen entwickeln.',
    },
    {
      id: 'wann-seite-ueberarbeiten',
      question: 'Ab wann sollte man eine Unterseite überarbeiten, wenn sie nicht in die Top 10 kommt?',
      answer: 'Prüfen Sie nach 6 bis 8 Wochen zuerst, ob die Seite überhaupt indexiert ist und wachsende Impressionen sammelt. Verharrt eine fachlich wichtige Leistungsseite nach rund 4 bis 6 Monaten trotz sauberer Technik dauerhaft auf den Plätzen 15 bis 40, deckt sie meist die Suchintention noch nicht tief genug ab oder benötigt gezielte interne und externe Verlinkung.',
    },
  ],
  powiazane: [
    { href: '/porownania/seo-czy-google-ads', tekst: 'SEO oder Google Ads (SEA) im Vergleich', opis: 'Anlaufzeit, Klickpreise und wann sich die Kombination beider Kanäle rechnet' },
    { href: '/narzedzia/kalkulator-strat-seo', tekst: 'SEO-Rechner & ROI-Rechner in Euro', opis: 'berechnet entgangenes Potenzial und den Amortisationsmonat für Ihre Branche' },
    { href: '/blog/wyniki-wdrozen-seo-2026', tekst: 'SEO Fallstudie 2026', opis: 'alle fünf Search-Console-Projekte mit Klicks, Impressionen und Maßnahmen im Detail' },
    { href: '/narzedzia/autorytet-domeny', tekst: 'Domain Authority Checker', opis: 'prüft kostenlos die Link-Autorität Ihrer Domain im Vergleich zum Wettbewerb' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: Startleitfaden zur Suchmaschinenoptimierung (Kapitel Wirkungsdauer von Änderungen)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/crawling-indexing/ask-google-to-recrawl', nazwa: 'Google Search Central: Google um erneutes Crawlen deiner URLs bitten (Crawling-Dauer von Tagen bis Wochen)', data: '2026-11-22' },
    { url: 'https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/', nazwa: 'Ahrefs-Studie (15.05.2025): How Long Does It Take to Rank in Google? (1,74 % bzw. 6,11 % neuer Seiten in Top 10)', data: '2026-11-22' },
    { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Google Search Console-Hilfe: Leistungsbericht für die Websuche auswerten', data: '2026-11-22' },
  ],
};
