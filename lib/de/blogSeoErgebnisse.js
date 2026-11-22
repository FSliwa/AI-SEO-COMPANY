// Daten der deutschen SEO Fallstudie /de/blog/seo-ergebnisse (22.11.2026; Schlüssel PL: /blog/wyniki-wdrozen-seo-2026).
// Hauptkeyword: "seo fallstudie". Alle Kennzahlen stammen direkt aus lib/realizacjeGsc.js (verifizierte Live-Synchronisation
// über die Google Search Console API unserer Agentur) sowie den dokumentierten Startfenstern der polnischen Kundenmandate.

import { METRYKI_GSC, SERIE_GSC } from '../realizacjeGsc.js';

const fmt = (n) => new Intl.NumberFormat('de-DE').format(n);
const komma = (n) => String(n).replace('.', ',');
const datumDe = (iso) => {
  const [y, m, d] = iso.split('-');
  return `${d}.${m}.${y}`;
};

const st = METRYKI_GSC.staniax;
const mt = METRYKI_GSC.madamethai;
const sb = METRYKI_GSC.stefbud;
const tq = METRYKI_GSC.tql;
const ab = METRYKI_GSC['ase-bot'];

const sbStart = SERIE_GSC.stefbud[0];
const sbEnde = SERIE_GSC.stefbud[SERIE_GSC.stefbud.length - 1];
const tqEnde = SERIE_GSC.tql[SERIE_GSC.tql.length - 1];
const mtStart = SERIE_GSC.madamethai[0];
const mtEnde = SERIE_GSC.madamethai[SERIE_GSC.madamethai.length - 1];

export const BLOG_SEO_ERGEBNISSE_DE = {
  fallbackPfad: '/blog/seo-ergebnisse',
  okruszek: 'SEO Fallstudie & Ergebnisse',
  kategoria: 'SEO Fallstudie & Search-Console-Daten',
  h1: 'SEO Fallstudie 2026: Echte Ergebnisse und Verläufe aus der Google Search Console',
  opublikowano: '2026-11-22',
  aktualisiert: '2026-11-22',
  kurzantwort: `Diese SEO Fallstudie dokumentiert echte Search-Console-Daten polnischer Kundenprojekte und eines eigenen SaaS-Projekts aus dem Jahr 2026: Im aktuellen 75- bis 92-Tage-Fenster erreichten junge Domains zwischen ${fmt(tq.totalClicks)} und ${fmt(mt.totalClicks)} organische Klicks sowie bis zu ${fmt(mt.totalImpr)} Impressionen. Die Verläufe zeigen transparent, welche Maßnahmen griffen, wo Schwankungen auftraten und warum Impressionen vor Klicks wachsen.`,
  lead: 'Agentur-Präsentationen zeigen gerne „+380 % Traffic“ ohne Ausgangsbasis und ohne Zeitraum. In dieser SEO Fallstudie legen wir stattdessen die ungefilterten Daten aus der Google Search Console von fünf Websites offen, die wir 2026 technisch und inhaltlich betreut haben - vier reale polnische Kundenprojekte aus Industrie, Bauwesen, Beratung und Gastronomie sowie ein eigenes internationales KI-Projekt inklusive seiner Dellen.',
  sekcje: [
    {
      id: 'methodik-und-einordnung',
      h2: 'Methodik: Echte Search-Console-Daten polnischer Kundenprojekte statt Schätztools',
      html: [
        '<p>Damit Sie die folgenden Zahlen für Ihr eigenes Unternehmen im DACH-Raum realistisch einordnen können, nennen wir vorab drei methodische Grundsätze:</p>',
        '<ul>',
        '<li><strong>Erstparteien-Quelle statt Drittanbieter-Hochrechnung:</strong> Sämtliche Werte zu Klicks, Impressionen, Klickrate (CTR) und Durchschnittsposition stammen direkt aus der <strong>Google Search Console API</strong> der jeweiligen Domains (dieselben Zeitreihen speisen auch die interaktiven Kurven im Portfolio auf unserer <a href="/de">Startseite</a>). Externe Sichtbarkeitsindizes unterschätzen junge oder spezialisierte B2B-Domains regelmäßig um ein Vielfaches.</li>',
        '<li><strong>Transparente Herkunft der Mandate:</strong> Bei <code>staniax.pl</code>, <code>madamethai.pl</code>, <code>stefbud.com</code> und <code>tql.pl</code> handelt es sich um <strong>echte Search-Console-Daten polnischer Kundenprojekte</strong>; <code>ase-bot.live</code> ist unser eigenes englischsprachiges Fintech-Projekt. Alle fünf Websites starteten 2026 entweder als kompletter Neuaufbau oder von nahezu null organischer Sichtbarkeit. Deshalb berichten wir <em>absolute Zahlen mit exaktem Datumsfenster</em> statt irreführender Prozentwerte.</li>',
        '<li><strong>Was diese Daten belegen - und was nicht:</strong> Impressionen und Klicks messen organische Auffindbarkeit, keinen Umsatz. Geschäftszahlen und Margen unserer Auftraggeber veröffentlichen wir grundsätzlich nicht. Zudem sind vergangene Verläufe kein Garantieversprechen: Im deutschsprachigen Markt (DE, AT, CH) wirken exakt dieselben technischen und inhaltlichen Mechanismen, je nach Branche ist die gewachsene Konkurrenz in den Top 10 jedoch dichter und erfordert entsprechend mehr Substanz bei Inhalten und Autorität.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'uebersicht-fuenf-domains',
      h2: 'Alle fünf Projekte im direkten Search-Console-Überblick',
      html: `<p>Die Tabelle fasst den aktuellen Auswertungsstand aus der Google Search Console zusammen (automatisch synchronisiert bis ${datumDe(st.endDate)}):</p>`,
      tabela: {
        id: 'tabelle-seo-fallstudie-gsc',
        caption: 'Verifizierte Google-Search-Console-Kennzahlen von fünf betreuten Domains (2026)',
        columns: [
          { key: 'projekt', label: 'Projekt & Branche' },
          { key: 'fenster', label: 'Messfenster' },
          { key: 'volumen', label: 'Klicks & Impressionen' },
          { key: 'qualitaet', label: 'Ø-Position & CTR' },
        ],
        rows: [
          {
            id: 'staniax',
            projekt: 'STANIAX (staniax.pl) - B2B Vakuummetallisierung & Oberflächentechnik (polnisches Kundenprojekt)',
            fenster: `${st.days} Tage (${datumDe(st.startDate)} - ${datumDe(st.endDate)})`,
            volumen: `${fmt(st.totalClicks)} Klicks / ${fmt(st.totalImpr)} Impressionen`,
            qualitaet: `Ø-Position ${komma(st.position)} / CTR ${komma(st.ctr)} %`,
          },
          {
            id: 'stefbud',
            projekt: 'STEF-BUD (stefbud.com) - B2B Dachoberlichter & Industriekuppeln (polnisches Kundenprojekt)',
            fenster: `${sb.days} Tage (${datumDe(sb.startDate)} - ${datumDe(sb.endDate)})`,
            volumen: `${fmt(sb.totalClicks)} Klicks / ${fmt(sb.totalImpr)} Impressionen`,
            qualitaet: `Ø-Position ${komma(sb.position)} / CTR ${komma(sb.ctr)} %`,
          },
          {
            id: 'tql',
            projekt: 'TQL (tql.pl) - B2B Beratung für ISO-Zertifizierungen (polnisches Kundenprojekt)',
            fenster: `${tq.days} Tage (${datumDe(tq.startDate)} - ${datumDe(tq.endDate)})`,
            volumen: `${fmt(tq.totalClicks)} Klicks / ${fmt(tq.totalImpr)} Impressionen`,
            qualitaet: `Ø-Position ${komma(tq.position)} / CTR ${komma(tq.ctr)} %`,
          },
          {
            id: 'madamethai',
            projekt: 'MADAME THAI (madamethai.pl) - Lokaler Restaurantstandort (polnisches Kundenprojekt)',
            fenster: `${mt.days} Tage (${datumDe(mt.startDate)} - ${datumDe(mt.endDate)})`,
            volumen: `${fmt(mt.totalClicks)} Klicks / ${fmt(mt.totalImpr)} Impressionen`,
            qualitaet: `Ø-Position ${komma(mt.position)} / CTR ${komma(mt.ctr)} %`,
          },
          {
            id: 'asebot',
            projekt: 'ASE-BOT (ase-bot.live) - KI-Trading-Plattform, US-Markt (eigenes Projekt)',
            fenster: `${ab.days} Tage (${datumDe(ab.startDate)} - ${datumDe(ab.endDate)})`,
            volumen: `${fmt(ab.totalClicks)} Klicks / ${fmt(ab.totalImpr)} Impressionen`,
            qualitaet: `Ø-Position ${komma(ab.position)} / CTR ${komma(ab.ctr)} %`,
          },
        ],
        przypis: `Quelle: Google Search Console API (Bericht „Leistung -> Websuche“), Abrufzeitfenster jeweils bis ${datumDe(st.endDate)}.`,
      },
    },
    {
      id: 'b2b-industrie-staniax-und-stefbud',
      h2: 'B2B-Fertigung und Industriebau: Was bei STANIAX und STEF-BUD funktioniert hat',
      html: [
        '<h3>1. STANIAX: Von null Sichtbarkeit auf Ø-Position 8,4 in einer Industriesparte</h3>',
        '<p><strong>Ausgangslage:</strong> Ein Industriebetrieb mit 25 Jahren Erfahrung in der Vakuummetallisierung und UV-Lackierung, dessen bisherige Website praktisch keinen organischen Suchtraffic erzielte. Wir haben die Informationsarchitektur komplett neu aufgebaut, jede technische Verfahrens- und Anwendungsseite (z. B. Reflektor-Regenerierung, Beschichtung von Kunststoffbauteilen) sauber getrennt, mehrsprachige Pfade für den Export (DE/EN) vorbereitet und einen Fachratgeber für Einkäufer und Konstrukteure ergänzt.</p>',
        `<p><strong>Verlauf und Ergebnis:</strong> Bereits im ersten Dreimonatsfenster nach dem Relaunch (Mai bis August 2026) sammelte die Domain 152 Klicks und 6.340 Impressionen. Im aktuellen ${st.days}-Tage-Zeitraum (${datumDe(st.startDate)} bis ${datumDe(st.endDate)}) stieg die Bilanz weiter auf <strong>${fmt(st.totalClicks)} Klicks und ${fmt(st.totalImpr)} Impressionen auf Ø-Position ${komma(st.position)}</strong> (CTR ${komma(st.ctr)} %). Entscheidend im B2B: In einer spitzen Fertigungsnische bedeuten rund 20 hochspezifische Suchklicks pro Woche keine zufälligen Ratgeberleser, sondern konkrete Fertigungs- und Serienanfragen.</p>`,
        '<h3>2. STEF-BUD: Von 5 auf 44 Wochenklicks in 75 Tagen im B2B-Baubereich</h3>',
        '<p><strong>Ausgangslage:</strong> Ein Hersteller von Lichtbändern, Rauchabzugsklappen und Dachoberlichtern für Industriehallen. Zielgruppe sind Architekten, Generalunternehmer und technische Einkäufer, die nach exakten Bauelementen und technischen Parametern suchen.</p>',
        `<p><strong>Verlauf und Ergebnis:</strong> Nach dem technischen SEO-Aufbau und der Ausrichtung der Produktkategorien auf konkrete Ausschreibungsbegriffe startete <code>stefbud.com</code> in der ersten erfassten Septemberwoche (${datumDe(sbStart[0])} bis ${datumDe(sbStart[1])}) mit ${fmt(sbStart[2])} Klicks und ${fmt(sbStart[3])} Impressionen. Binnen elf Wochen zog die Kurve auf <strong>${fmt(sbEnde[2])} Klicks und ${fmt(sbEnde[3])} Impressionen in der Woche bis ${datumDe(sbEnde[1])}</strong> an - insgesamt <strong>${fmt(sb.totalClicks)} Klicks und ${fmt(sb.totalImpr)} Impressionen in ${sb.days} Tagen</strong>.</p>`,
      ].join(''),
    },
    {
      id: 'beratung-und-lokal-tql-madame-thai',
      h2: 'B2B-Beratung vs. Local SEO: TQL und MADAME THAI im Kontrast',
      html: [
        '<h3>3. TQL: Der typische B2B-Verzögerungseffekt einer frischen Beratungs-Domain</h3>',
        '<p><strong>Ausgangslage:</strong> Ein Beratungsunternehmen für ISO-Managementsysteme (u. a. ISO 9001, ISO 27001) mit frisch gelaunchter Website im August 2026. Gerade dieses Mandat zeigt ehrlich, wie sich eine junge B2B-Domain anfühlt, bevor der Knoten platzt: In den ersten 18 Tagen nach dem Start (05. bis 22.08.2026) verzeichnete die Search Console 296 Impressionen und 2 Klicks auf einer durchschnittlichen Position von 34,6. Auch im September und Anfang Oktober bewegte sich die Seite scheinbar unspektakulär zwischen 33 und 67 Impressionen pro Woche.</p>',
        `<p><strong>Der Wendepunkt nach rund zehn Wochen:</strong> Ab Ende Oktober rückten mehrere Normen-Unterseiten gleichzeitig von Seite 4 in Richtung Seite 1 bis 2 vor. Die Wochenimpressionen sprangen von 40 (Mitte Oktober) über 477, 647 und 857 auf <strong>${fmt(tqEnde[3])} Impressionen und ${fmt(tqEnde[2])} Klicks in der Woche bis ${datumDe(tqEnde[1])}</strong>. Über das gesamte ${tq.days}-Tage-Fenster stehen damit <strong>${fmt(tq.totalClicks)} Klicks, ${fmt(tq.totalImpr)} Impressionen und Ø-Position ${komma(tq.position)}</strong> zu Buche. Wer eine solche Kampagne ungeduldig nach Woche sechs abgebrochen hätte, hätte kurz vor dem eigentlichen Sichtbarkeitsschub aufgehört.</p>`,
        '<h3>4. MADAME THAI: Hohes Suchvolumen durch klare lokale Kaufabsicht</h3>',
        '<p><strong>Ausgangslage:</strong> Ein neu eröffneter Restaurantstandort mit schneller mobiloptimierter Website, Online-Speisekarte, Reservierungsanbindung und strukturiert gepflegtem <a href="/de/google-unternehmensprofil-optimieren">Google Unternehmensprofil</a>.</p>',
        `<p><strong>Verlauf und Ergebnis:</strong> Lokale Gastronomie-Suchanfragen besitzen ein Vielfaches des Suchvolumens industrieller Spezialbegriffe. Schon in den ersten 26 Tagen nach Start (27.07. bis 21.08.2026) kamen 187 Klicks und rund 10.100 Impressionen zusammen. Im darauffolgenden ${mt.days}-Tage-Zeitraum (${datumDe(mt.startDate)} bis ${datumDe(mt.endDate)}) wuchs die Seite von ${fmt(mtStart[2])} auf ${fmt(mtEnde[2])} Klicks pro Woche und erreichte insgesamt <strong>${fmt(mt.totalClicks)} Klicks bei ${fmt(mt.totalImpr)} Impressionen und Ø-Position ${komma(mt.position)}</strong>.</p>`,
      ].join(''),
    },
    {
      id: 'gegenbeispiel-asebot-und-vier-phasen',
      h2: 'ASE-BOT als ehrliches Gegenbeispiel - und warum Impressionen immer vor Klicks wachsen',
      html: [
        '<p>Zu einer glaubwürdigen SEO Fallstudie gehört auch ein Projekt, bei dem Sichtbarkeit allein noch keine Klickflut auslöst: <strong>ASE-BOT (ase-bot.live)</strong> ist unser eigenes englischsprachiges Softwareprojekt im hochkompetitiven US-Finanz- und Trading-Umfeld auf einer neuen <code>.live</code>-Domain ohne gewachsene Backlink-Historie.</p>',
        `<p>Nach einem ersten Zwischenhoch im Sommer (7.710 Impressionen und 28 Klicks im ersten Quartal Mai bis August 2026) zeigt das aktuelle ${ab.days}-Tage-Fenster <strong>${fmt(ab.totalImpr)} Impressionen, aber nur ${fmt(ab.totalClicks)} Klicks auf Ø-Position ${komma(ab.position)}</strong> (CTR ${komma(ab.ctr)} %). Die Ursache ist lehrbuchhaft: Google hat die Fachartikel indexiert und spielt sie tausendfach auf den Positionen 24 bis 60 aus - dort sieht der Suchende das Ergebnis jedoch erst auf Seite 3 bis 6, wo kaum geklickt wird. Um in einer englischsprachigen YMYL-/Fintech-Nische in die Top 10 vorzudringen, reichen Technik und Content allein nicht aus; hier entscheidet langfristiger <a href="/de/blog/linkaufbau-b2b">Linkaufbau im B2B</a> und gewachsene Markenautorität.</p>`,
        '<h3>Die 4-Phasen-Gesetzmäßigkeit für Ihr eigenes SEO-Projekt</h3>',
        '<ol>',
        '<li><strong>Phase 1 - Saubere Indexierung (Tage 1 bis 21):</strong> Server-Side Rendering, klare Sitemap, fehlerfreie Canonicals und eindeutige URL-Zuordnung je Suchintention.</li>',
        '<li><strong>Phase 2 - Wachsende Impressionen (Wochen 3 bis 8):</strong> Google testet die neuen Seiten auf Position 25 bis 60. Die Impressionen steigen deutlich, während die Klickkurve noch flach bleibt.</li>',
        '<li><strong>Phase 3 - Sprung auf Seite 1 bis 2 (Monat 2 bis 4):</strong> Durch interne Verlinkung, Nutzersignale und thematische Tiefe klettern Fokusseiten in den Bereich von Position 8 bis 18 (wie bei TQL und STEF-BUD sichtbar).</li>',
        '<li><strong>Phase 4 - Stabiles Klick- und Anfragewachstum (ab Monat 3 bis 6):</strong> Erst in den Top 5 bis Top 10 übersetzen sich Impressionen in planbare Klickraten von 2,5 bis über 10 Prozent (wie bei STANIAX auf Ø-Position 8,4 und MADAME THAI auf Ø-Position 4,3).</li>',
        '</ol>',
        '<p>Wie diese Zeitachsen mit unabhängigen Studien zusammenpassen, lesen Sie vertiefend in <a href="/de/blog/wie-lange-dauert-seo">Wie lange dauert SEO?</a>. Wenn Sie prüfen möchten, wo Ihre eigene Domain heute technisch und inhaltlich steht, starten Sie mit unserem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>, informieren Sie sich über unseren tiefgehenden <a href="/de/seo-audit">SEO Audit</a> oder vergleichen Sie den Leistungsumfang unter <a href="/de/seo-kosten">SEO Kosten</a>. Worauf Sie generell bei Fallstudien von Dienstleistern achten sollten, zeigt unser Leitfaden <a href="/de/vergleiche/seo-agentur-auswaehlen">SEO Agentur finden und auswählen</a>.</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu unserer SEO Fallstudie',
  faq: [
    {
      id: 'sind-daten-auf-dach-uebertragbar',
      question: 'Lassen sich Ergebnisse polnischer Kundenprojekte auf Deutschland, Österreich und die Schweiz übertragen?',
      answer: 'Die technischen und algorithmischen Hebel von Google - saubere Informationsarchitektur, ein Thema pro URL, schnelle Core Web Vitals und präzise Beantwortung der Suchintention - funktionieren im DACH-Raum identisch. Unterschiede bestehen vor allem in der Wettbewerbsdichte und im Preisniveau: In stark besetzten deutschen B2B-Branchen verfügen etablierte Mitbewerber oft über ältere Domains und mehr Fachlinks, weshalb wir vor jedem Angebot zuerst die reale Top-10-Konkurrenz Ihrer Zielkeywords prüfen.',
    },
    {
      id: 'warum-absolute-zahlen-statt-prozent',
      question: 'Warum nennt AI SEO COMPANY absolute Klickzahlen statt prozentualer Steigerungen?',
      answer: 'Weil Prozentwerte bei neuen oder zuvor kaum sichtbaren Websites in die Irre führen: Ein Anstieg von 2 auf 20 Klicks entspricht rechnerisch plus 900 Prozent, sagt aber nichts über die tatsächliche Reichweite aus. Absolute Klicks, Impressionen, Durchschnittsposition und das exakte Datumsfenster aus der Google Search Console ermöglichen dagegen eine ehrliche, nachprüfbare Einordnung.',
    },
    {
      id: 'warum-steigen-impressionen-vor-klicks',
      question: 'Warum wachsen in der Google Search Console zuerst die Impressionen und erst Wochen später die Klicks?',
      answer: 'Eine Impression zählt bereits, sobald eine URL in einer Suchergebnisliste geladen wird - auch auf Platz 28 oder 45, wo kaum jemand hinscrollt. Erst wenn sich eine Unterseite durch Relevanz, interne Verlinkung und Autorität auf die erste Suchergebnisseite (Position 1 bis 10) vorarbeitet, steigt die Klickrate sprunghaft an. Steigende Impressionen in den ersten Wochen sind daher das wichtigste Frühsignal, dass Google Ihre Seiten thematisch richtig zuordnet.',
    },
    {
      id: 'wie-schnell-erste-ergebnisse',
      question: 'Wie schnell zeigten sich in den fünf Projekten die ersten messbaren Signale?',
      answer: 'Erste Impressionen in der Google Search Console traten bei neu gestarteten Websites bereits innerhalb weniger Tage bis drei Wochen auf (etwa 296 Impressionen in den ersten 18 Tagen bei TQL). Belastbare Klickströme für gewerbliche B2B-Anfragen bauten sich dagegen über einen Zeitraum von zwei bis drei Monaten auf und wuchsen im darauffolgenden Quartal weiter.',
    },
    {
      id: 'wie-pruefe-ich-agentur-referenzen',
      question: 'Woran erkenne ich eine seriöse SEO Fallstudie vor der Beauftragung einer Agentur?',
      answer: 'Achten Sie auf vier Prüfpunkte: Stammen die Zahlen direkt aus der Google Search Console statt aus geschätzten Tool-Graphen? Sind Startzustand und exakter Messzeitraum (z. B. 90 Tage mit Datum) angegeben? Werden Branchenkontext und getroffene Maßnahmen konkret benannt? Und zeigt die Agentur transparent auch Grenzen oder Schwankungen statt unrealistischer Ranking-Garantien?',
    },
  ],
  powiazane: [
    { href: '/blog/how-long-does-seo-take', tekst: 'Wie lange dauert SEO?', opis: 'offizielle Google-Aussagen, Ahrefs-Studie und detaillierte Wochenverläufe' },
    { href: '/audyt-seo', tekst: 'SEO Audit in 3 bis 5 Werktagen', opis: 'ehrliche Bestandsaufnahme Ihrer eigenen Domain vor Projektstart' },
    { href: '/cennik-pozycjonowania', tekst: 'SEO Kosten & Pakete in Euro', opis: 'monatlich kündbare B2B-Pakete ab 450 Euro netto im Überblick' },
    { href: '/porownania/jak-wybrac-agencje-seo', tekst: 'SEO Agentur auswählen: 12 Prüffragen', opis: 'woran Sie belastbare Referenzen und faire Verträge erkennen' },
  ],
  zrodla: [
    { url: 'https://support.google.com/webmasters/answer/7576553', nazwa: 'Google Search Console-Hilfe: Leistungsbericht (Klicks, Impressionen, CTR und durchschnittliche Position verstehen)', data: '2026-11-22' },
    { url: 'https://developers.google.com/search/docs/fundamentals/seo-starter-guide', nazwa: 'Google Search Central: Startleitfaden zur Suchmaschinenoptimierung (Wirkungszeiträume von Änderungen)', data: '2026-11-22' },
    { url: 'https://www.ai-seo-company.pl/de', nazwa: 'AI SEO COMPANY Portfolio: Live synchronisierte Zeitreihen aus der Google Search Console API (Stand 20.11.2026)', data: '2026-11-22' },
    { url: 'https://ahrefs.com/blog/how-long-does-it-take-to-rank-in-google-and-how-old-are-top-ranking-pages/', nazwa: 'Ahrefs-Studie (15.05.2025): How Long Does It Take to Rank in Google?', data: '2026-11-22' },
  ],
};
