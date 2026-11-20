// Deutsche Version der Vergleichsseite SEO vs GEO (18.11.2026, Gruppe de-geo). Gleiche Form wie P2_EN in
// lib/porownania.en.js (slug = polnischer Slug, gleiche Abschnitts-IDs, wo sinnvoll), eigene Texte.
// Zahlen kommen aus POMIAR_AIO (lib/porownania.js): ein Datensatz für PL, EN und DE.
// Title, Beschreibung und H1 aus dem Register lib/stronyDe.js (eine Quelle). Preise: EUR-Werte der EN-Seiten
// (SEO Standard 450 €, SEO Premium 590 €, KI-Sichtbarkeit Audit 235 €, Aufpreis 115 €), keine Umrechnung.
// Links in HTML nur zu Seiten, die es auf Deutsch gibt (hrefDe liefert null ohne Seite oder bei ausgeschalteter
// Version DE). Messungen: Google Polen, Standort Warschau, 4.-05.11.2026; sie gelten nicht für DACH und sind so beschriftet.

import { POMIAR_AIO } from './porownania';
import { STRONY_DE, hrefDe } from './stronyDe';

const SCIEZKA = '/porownania/seo-vs-geo';
const W = STRONY_DE[SCIEZKA];

const a = (href, tekst) => `<a href="${href}">${tekst}</a>`;
const ax = (href, tekst) => `<a href="${href}" rel="noopener">${tekst}</a>`;
/** Interner Link auf eine deutsche Seite (Schlüssel = polnischer Pfad) oder reiner Text, wenn es sie (noch) nicht gibt. */
const wew = (klucz, tekst, kotwica = '') => {
  const h = hrefDe(klucz);
  return h ? a(`${h}${kotwica}`, tekst) : tekst;
};

const liczba = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
const PROZENT = ' %';

const MIESIACE_DE = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];

/** 'JJJJ-MM-TT' -> '04.11.2026'. */
export function dataDe(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${m[3]}.${m[2]}.${m[1]}` : iso;
}

/** 'JJJJ-MM-TT' -> '4. November 2026'. */
export function dataDeDluga(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return m ? `${Number(m[3])}. ${MIESIACE_DE[Number(m[2]) - 1]} ${m[1]}` : iso;
}

function tekstPomiaru(p) {
  const kiedy = p.typ === 'mediana'
    ? `An den Tagen ${p.daty.map(dataDe).join(', ')} haben wir`
    : `Am ${dataDeDluga(p.daty[0])} haben wir`;
  const wynik = p.typ === 'mediana'
    ? `Median aus ${p.daty.length} Messungen: Von ${liczba(p.cytowan)} Zitaten (${p.domen} Domains) stammten nur ${p.wTop10}, also ${p.procent}${PROZENT} (Spanne ${p.zakresProcent}${PROZENT}), von Domains aus den Top 10.`
    : `Von ${liczba(p.cytowan)} Zitaten (${p.domen} Domains) stammten nur ${p.wTop10}, also ${p.procent}${PROZENT}, von Domains aus den Top 10.`;
  return `${kiedy} ${p.frazSprawdzonych} Keywords aus unserer Branche in Google geprüft (Polen, Desktop, Daten von DataForSEO). Bei ${p.frazZPrzegladem === p.frazSprawdzonych ? 'allen' : p.frazZPrzegladem} erschien eine AI Overview. Bei ${p.frazPorownanych} davon haben wir ihre Quellen mit den ersten zehn organischen Ergebnissen verglichen. ${wynik} Eine hohe Position hilft, reicht aber nicht aus.`;
}

function zastrzezeniePomiaru(p) {
  const kiedy = p.typ === 'mediana'
    ? `Median aus ${p.daty.length} Messungen (${p.daty.map(dataDe).join(', ')}), ein Standort und ein Gerät.`
    : `Eine Messung (${dataDe(p.daty[0])}), ein Standort und ein Gerät.`;
  return `${kiedy} Google-Ergebnisse und AI Overviews ändern sich von Tag zu Tag. Wir aktualisieren monatlich.`;
}

const P2_DE = {
  slug: 'seo-vs-geo',
  title: W.tytul,
  description: W.opis,
  h1: W.h1,
  okruszek: 'SEO vs GEO',
  nazwaKarty: 'SEO vs GEO',
  tag: 'Vergleich: SEO und Generative Engine Optimization',
  zrodlaDanych: 'Daten: Google-Ergebnisse für 30 Keywords aus der SEO-Branche (DataForSEO, Standort Polen, 04.11.2026), Tests von KI-Antworten (4.-05.11.2026).',
  answer: `SEO vs GEO in einem Satz: SEO verbessert die Position Ihrer Seite in den Google-Ergebnissen, GEO (${wew('/pozycjonowanie-w-ai', 'Generative Engine Optimization')}) sorgt dafür, dass ChatGPT, Gemini, Perplexity und die AI Overviews in Google Ihr Unternehmen in der Antwort nennen. Die Grundlagen sind gleich, aber in unserer Messung stammte nur etwa jede vierte in einer AI Overview zitierte Domain auch aus den Top 10 desselben Keywords.`,
  published: '2026-11-18',
  updated: '2026-11-18',
  tableId: 'tabelle-8-kriterien',
  tableCaption: 'SEO und GEO im Vergleich: 8 Kriterien (November 2026)',
  tablePrzypis: `Quellen: unsere Messung der Quellen von AI Overviews (Google, Polen, Desktop, DataForSEO, ${dataDe(POMIAR_AIO.daty[POMIAR_AIO.daty.length - 1])}) und unsere Preisliste (November 2026).`,
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'seo', label: 'SEO' },
    { key: 'geo', label: 'GEO' },
  ],
  rows: [
    { kryterium: 'Ziel', seo: 'Position Ihrer Seite und Klick aus den Suchergebnissen', geo: 'Nennung oder Zitat Ihres Unternehmens in der Antwort eines KI-Modells' },
    { kryterium: 'Wo es wirkt', seo: 'Google und Bing: organische Ergebnisse und Maps', geo: 'ChatGPT, Perplexity, Gemini, Copilot sowie AI Overviews und KI-Modus in Google' },
    { kryterium: 'Erfolgsmaß', seo: 'Position, Klickrate, Klicks, Anfragen per Formular und Telefon', geo: 'Anteil der Antworten mit Ihrem Firmennamen, zitierte URLs, Platz in der Empfehlungsliste' },
    { kryterium: 'Messwerkzeuge', seo: 'Google Search Console, GA4, Ranking-Monitoring', geo: 'Feste Fragenliste, die jede Woche den Modellen gestellt wird, Traffic aus KI-Diensten in GA4' },
    { kryterium: 'Was das Ergebnis beeinflusst', seo: 'Inhalt passend zur Suchintention, Technik, Links, Unternehmensprofil', geo: 'Erwähnungen in Quellen, die Modelle lesen (Verzeichnisse, Medien, Foren, Video), direkte Antworten mit Zahlen, einheitliche Unternehmensdaten, bei AI Overviews zusätzlich die Indexierung in Google' },
    { kryterium: 'Stabilität', seo: 'Positionen ändern sich in Tagen und Wochen', geo: 'Antworten unterscheiden sich zwischen Anfragen und Wochen; dieselbe Frage kann eine andere Firmenliste ergeben' },
    { kryterium: 'Quellen des Ergebnisses', seo: 'Top 10 eines Keywords', geo: `In unserer Messung stammten ${POMIAR_AIO.procent}${PROZENT} der Zitate in AI Overviews von Domains aus den Top 10 desselben Keywords` },
    { kryterium: 'Kosten bei uns', seo: 'SEO-Pakete ab 450 € netto pro Monat', geo: 'KI-Sichtbarkeit Audit 235 € netto; Messung und Maßnahmen in SEO Premium oder als Aufpreis von 115 € netto pro Monat zu SEO Standard' },
  ],
  sections: [
    {
      id: 'was-ist-geo',
      h2: 'Was ist GEO?',
      html: [
        '<p>GEO steht für Generative Engine Optimization, auf Deutsch Optimierung für generative Suchmaschinen. Gemeint ist die Arbeit daran, dass KI-Modelle mit Internetzugang Ihr Unternehmen nennen und Ihre Seite zitieren, wenn sie Kundenfragen beantworten. Bei SEO ist das Ziel ein Platz in der Ergebnisliste und der Klick. Bei GEO zählt, ob das Modell Ihr Unternehmen überhaupt erwähnt, in welchem Zusammenhang und mit welcher Quelle.</p>',
        '<p>Das betrifft ChatGPT mit Websuche, Perplexity, Gemini und Copilot, in Google außerdem die AI Overviews und den KI-Modus. Jedes dieser Werkzeuge nutzt andere Quellen: Wer in einem vorkommt, wird nicht automatisch in den anderen genannt.</p>',
        `<p>Wie diese Arbeit bei uns aussieht, beschreiben wir auf der Seite ${wew('/pozycjonowanie-w-ai', 'Generative Engine Optimization (GEO)')}.</p>`,
      ].join(''),
      h3: [
        {
          id: 'zwei-bedeutungen',
          h3: 'GEO hat im Marketing zwei Bedeutungen',
          html: [
            `<p>Das Kürzel GEO führt leicht in die Irre. Im Marketing steht es seit Jahren für Maßnahmen mit Ortsbezug: Geotargeting von Anzeigen und lokales SEO, und im Deutschen klingt „Geo“ auch nach Geografie und Geodaten. Seit November 2023, nach der Veröffentlichung einer Studie zu generativen Suchmaschinen (${ax('https://arxiv.org/abs/2311.09735', 'arXiv 2311.09735')}), bedeutet es immer häufiger die Optimierung für Antworten von KI-Modellen. Selbst die Modelle verwechseln es: In unseren Tests vom 4. und 5. November 2026 beschrieb das Modell GPT-4.1 mini (OpenAI, über die API, mit aktivierter Suche) GEO zweimal als Geolokalisierungs-Marketing und nannte keine Quelle, während Perplexity richtig antwortete und 10 Quellen angab. Auf dieser Seite bedeutet GEO immer die Optimierung für KI-Antworten.</p>`,
            '<p>Wenn Sie ein lokales Unternehmen führen, betreffen Sie beide Bedeutungen: Kunden suchen Sie in Google Maps, und ein Teil von ihnen fragt zusätzlich KI-Modelle, wen sie wählen sollen.</p>',
          ].join(''),
        },
        {
          id: 'kuerzel',
          h3: 'AEO, AIO, LLMO und KI-SEO: dasselbe?',
          html: '<p>Alle diese Kürzel beschreiben dasselbe Phänomen: Ein Unternehmen soll in der Antwort eines Modells auftauchen, nicht nur in einer Linkliste. AEO, Answer Engine Optimization, ist älter als GEO und entstand mit Featured Snippets in Google und mit Sprachassistenten. AIO und LLMO sind neuere Namen, und „KI-SEO“ ist ein Verkaufsbegriff, den Agenturen verwenden, auch wir.</p>',
          tabela: {
            id: 'tabelle-seo-geo-aeo',
            caption: 'SEO, GEO und AEO: Unterschiede (November 2026)',
            columns: [
              { key: 'cecha', label: 'Merkmal' },
              { key: 'seo', label: 'SEO' },
              { key: 'geo', label: 'GEO' },
              { key: 'aeo', label: 'AEO' },
            ],
            rows: [
              { cecha: 'Bedeutung', seo: 'Optimierung für Suchmaschinen', geo: 'Optimierung für generative Suchmaschinen, also KI-Modelle', aeo: 'Optimierung für Antwortmaschinen' },
              { cecha: 'Ziel', seo: 'Position in den Ergebnissen', geo: 'Nennung in der Antwort eines Modells', aeo: 'Direkte Antwort: Snippet, Sprachassistent, KI-Antwort' },
              { cecha: 'Seit wann gebräuchlich', seo: 'Seit den 1990er-Jahren', geo: 'Seit 2023 (Studie zu GEO)', aeo: 'Früher als GEO, bei Featured Snippets und Sprachassistenten' },
              { cecha: 'Hinweis', seo: '-', geo: 'AIO, LLMO und „KI-SEO“ sind in der Praxis Synonyme', aeo: 'Im Zoll steht „AEO“ außerdem für den Status „Zugelassener Wirtschaftsbeteiligter“ (Authorised Economic Operator)' },
            ],
            przypis: 'Beobachtung zum Zollstatus bei der Suchanfrage „aeo“: Google-Ergebnisse (Polen, Desktop, DataForSEO) vom 04.11.2026.',
          },
        },
      ],
    },
    {
      id: 'vergleich-8-kriterien',
      h2: 'SEO vs GEO in 8 Kriterien',
      tabela: 'glowna',
      htmlPo: '<p>Fazit aus der Tabelle: Die Grundlagen sind gemeinsam, das Erfolgsmaß ist ein anderes. Eine Seite, die nicht indexiert ist oder eine Frage nicht direkt beantwortet, kommt weder in die Ergebnisse noch in die Antwort eines Modells. Umgekehrt garantiert eine hohe Position nicht, dass ein Modell Ihr Unternehmen nennt, denn Modelle stützen sich auch auf Verzeichnisse, Medien, Foren und Videos.</p>',
    },
    {
      id: 'unsere-messung',
      h2: 'Unsere Messung: Woher AI Overviews ihre Quellen nehmen',
      html: [
        `<p>${tekstPomiaru(POMIAR_AIO)}</p>`,
        '<p>Methode: Für jedes Keyword haben wir die Liste der Quellen der AI Overview gespeichert und die Domains der ersten zehn unbezahlten Ergebnisse. Weiterleitungsadressen von Google haben wir zu Domains aufgelöst, einzelne Ergebnisse, die sich nicht auflösen ließen, haben wir weggelassen. Das Keyword „aeo“ haben wir ausgeschlossen, weil Google es mit dem Zollstatus verbindet und nicht mit Marketing.</p>',
        `<p>Das Ergebnis schwankt. Für das Keyword „seo vs geo“ waren in ${POMIAR_AIO.seoVsGeo.pobran} Abrufen vom 4. und 5. November zwischen ${POMIAR_AIO.seoVsGeo.min} und ${POMIAR_AIO.seoVsGeo.max} von ${POMIAR_AIO.seoVsGeo.z} Quellen der AI Overview in den Top 10, obwohl sich die Quellen der Übersicht selbst nicht geändert hatten. YouTube war bei ${POMIAR_AIO.youtube} von ${POMIAR_AIO.frazPorownanych} Keywords unter den Quellen, ein Video kann also ebenfalls in der Antwort landen.</p>`,
        '<p>Die Messung bezieht sich auf Google in Polen (Standort Warschau, polnische Keywords). Für den deutschsprachigen Raum haben wir keine vergleichbare Messung; die Größenordnung lässt sich nicht einfach übertragen.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-messung-aio',
        caption: `Quellen von AI Overviews und Top 10 desselben Keywords (Google, Polen, Desktop, ${POMIAR_AIO.typ === 'mediana' ? 'Median der Messungen' : dataDe(POMIAR_AIO.daty[0])})`,
        columns: [{ key: 'miara', label: 'Kennzahl' }, { key: 'wartosc', label: 'Wert' }],
        rows: [
          { miara: 'Geprüfte Keywords', wartosc: String(POMIAR_AIO.frazSprawdzonych) },
          { miara: 'Keywords mit AI Overview', wartosc: String(POMIAR_AIO.frazZPrzegladem) },
          { miara: 'Verglichene Keywords (mit Quellenliste, ohne „aeo“)', wartosc: String(POMIAR_AIO.frazPorownanych) },
          { miara: 'Zitate in AI Overviews', wartosc: liczba(POMIAR_AIO.cytowan) },
          { miara: 'Verschiedene Domains unter den Zitaten', wartosc: String(POMIAR_AIO.domen) },
          { miara: 'Zitate von Domains aus den Top 10 desselben Keywords', wartosc: `${POMIAR_AIO.wTop10} (${POMIAR_AIO.procent}${PROZENT}${POMIAR_AIO.zakresProcent ? `, Spanne ${POMIAR_AIO.zakresProcent}${PROZENT}` : ''})` },
        ],
        przypis: zastrzezeniePomiaru(POMIAR_AIO),
        minWidth: 420,
      },
    },
    {
      id: 'was-in-beiden-wirkt',
      h2: 'Was in beiden wirkt: Indexierung, Markenentität, zitierfähige Antworten',
      html: [
        '<ul>',
        '<li>Indexierung. Google schreibt, dass eine Seite als Quelle in einer AI Overview erscheinen kann, wenn sie indexiert ist und für die Anzeige mit einem Textausschnitt infrage kommt. ChatGPT mit Websuche und Perplexity lesen ebenfalls Seiten aus dem Netz. Saubere Technik und die Indexierung in Google und Bing sind deshalb der Ausgangspunkt.</li>',
        '<li>Markenentität. Derselbe Name, dieselbe Adresse und dieselbe Beschreibung des Unternehmens auf der Website, im Google Unternehmensprofil und in Verzeichnissen. In unserem Test vom 04.11.2026 zitierte Perplexity auf die Frage nach einer SEO-Agentur in Warschau Firmenverzeichnisse: Clutch, Sortlist und DesignRush.</li>',
        '<li>Zitierfähige Antworten. Eine Überschrift als Frage und darunter ein Absatz, der direkt antwortet, mit Zahl und Quelle. Einen solchen Abschnitt kann man leicht herauslösen und zitieren, in den Google-Ergebnissen wie in der Antwort eines Modells.</li>',
        '<li>Zugang für Bots. Die Crawler der KI-Suchmaschinen (OAI-SearchBot, PerplexityBot, Claude-SearchBot) und der Googlebot müssen die Seite abrufen können, ohne Sperre in der robots.txt und in der Firewall des Servers.</li>',
        '</ul>',
        `<p>Dieselben Maßnahmen sind das Fundament, auf dem unser ${wew('/pozycjonowanie-stron-internetowych', 'B2B SEO')} aufbaut. Bei begrenztem Budget müssen Sie sich deshalb nicht für das eine oder das andere entscheiden.</p>`,
      ].join(''),
    },
    {
      id: 'was-man-lassen-sollte',
      h2: 'Was Sie bei GEO besser lassen',
      html: [
        '<ul>',
        '<li>Keine Keywords oder Modellnamen in den Text stopfen. Ein Modell fasst den Sinn einer Seite zusammen, es zählt also die klare Antwort und nicht die Zahl der Wiederholungen.</li>',
        '<li>Die Datei llms.txt nicht als Weg zu einer Position in Google verstehen. Google schreibt ausdrücklich, dass seine Suche solche Dateien nicht verwendet und sie für AI Overviews nicht braucht, sie ersetzen also keine Indexierung.</li>',
        '<li>Keine Erwähnungen, Bewertungen oder Links im Paket kaufen. Gekaufte Links sind nach den Richtlinien von Google Spam, und Google weist darauf hin, dass nicht authentische Erwähnungen nicht helfen; gefälschte Bewertungen sind zudem ein rechtliches Risiko.</li>',
        '<li>Keine großen Mengen KI-generierter Texte ohne redaktionelle Prüfung veröffentlichen. Massenhaft erzeugte Inhalte ohne Mehrwert für Leser behandelt Google als Spam, unabhängig davon, ob ein Mensch oder ein Modell sie geschrieben hat.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'womit-anfangen',
      h2: 'Wann Sie mit GEO beginnen und wann mit SEO',
      html: '<p>Die Reihenfolge hängt davon ab, wo Ihre Kunden Sie heute suchen und ob Ihre Seite bereits im Google-Index ist.</p>',
      tabela: {
        id: 'tabelle-womit-anfangen',
        caption: 'Womit anfangen: SEO oder GEO (November 2026)',
        columns: [
          { key: 'sytuacja', label: 'Situation des Unternehmens' },
          { key: 'start', label: 'Beginnen Sie mit' },
          { key: 'dlaczego', label: 'Warum' },
        ],
        rows: [
          { sytuacja: 'Dienstleister, der in einer Stadt arbeitet', start: 'Lokales SEO und Google Unternehmensprofil, GEO als Messung', dlaczego: 'Kunden suchen in Maps; laut dem Senuto-Bericht „AI Overviews in Poland“ (v2.0, 27.11.2025, 17,8 Mio. Keywords) erscheint in Polen eine AI Overview bei 28,95 % aller Keywords, aber nur bei 6,08 % der Keywords mit lokaler Suchintention (Daten für Polen)' },
          { sytuacja: 'B2B-Unternehmen, Beratung, SaaS', start: 'SEO und GEO parallel', dlaczego: 'Kunden fragen Modelle nach Vergleichen und Empfehlungen; Perplexity zitierte in unserem Test Branchenverzeichnisse' },
          { sytuacja: 'Neue Domain ohne Historie', start: 'Technisches SEO und Indexierung', dlaczego: 'Ohne Indexierung gibt es nichts zu zitieren' },
          { sytuacja: 'Seite mit Traffic, aber ohne Nennungen in KI-Antworten', start: 'GEO: Erwähnungen in Quellen, die Modelle zitieren', dlaczego: 'Die Positionen sind da, es fehlt die Präsenz in den Quellen' },
        ],
        przypis: 'Quelle der Daten zur lokalen Suchintention: Senuto, „AI Overviews in Poland - 18M Keywords“, v2.0, Stand 27.11.2025 (abgerufen am 05.11.2026). Der Bericht bezieht sich auf Polen.',
      },
    },
    {
      id: 'wie-man-geo-misst',
      h2: 'Wie Sie GEO messen',
      html: [
        '<p>KI-Sichtbarkeit prüfen Sie nicht mit einer einzigen Frage, denn Antworten ändern sich zwischen Anfragen und Wochen. Es hilft eine feste Methode:</p>',
        '<ol>',
        '<li>Eine Liste von 20 bis 50 Fragen, die Ihre Kunden stellen, einmal festgelegt und zwischen den Messungen nicht verändert.</li>',
        '<li>Dieselben Fragen jede Woche in vier Quellen: ChatGPT mit Websuche, Perplexity, Gemini und die AI Overviews in Google.</li>',
        '<li>Drei Kennzahlen: Anteil der Antworten mit Ihrem Firmennamen oder Ihrer Seite, Adressen der zitierten Unterseiten und die Domains, aus denen die Modelle ihr Wissen beziehen.</li>',
        '<li>Traffic von chatgpt.com und perplexity.ai in Google Analytics 4 als Hinweis darauf, dass Antworten auf Ihre Seite führen.</li>',
        '</ol>',
        '<p>Die Messung selbst muss nicht teuer sein: Die Daten für 30 Fragen pro Woche in ChatGPT und Perplexity kosten uns etwa 5 US-Dollar im Monat (API-Preise von DataForSEO, November 2026). Die Ergebnisse einer solchen Messung sehen Sie im Reiter „KI-Sichtbarkeit“ unseres Kundenportals, das es derzeit auf Polnisch und Englisch gibt.</p>',
        `<p>Eine kostenlose Stichprobe mit drei Fragen liefert unser ${wew('/sprawdz-widocznosc-w-ai', 'KI-Sichtbarkeit Check')}.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Fragen zu SEO und GEO',
  faq: [
    {
      question: 'Worin unterscheiden sich SEO und GEO?',
      answer: 'SEO verbessert die Position einer Seite in den Suchergebnissen, GEO erhöht die Chance, dass ein KI-Modell ein Unternehmen in seiner Antwort nennt oder zitiert. Bei SEO messen Sie Positionen und Klicks in der Search Console, bei GEO den Anteil der Antworten mit dem Firmennamen auf einer festen Fragenliste. Die Grundlagen sind gleich: Indexierung, gute Inhalte und Erwähnungen des Unternehmens.',
    },
    {
      question: 'Ersetzt GEO das SEO?',
      answer: 'Nein, denn KI-Antworten stützen sich zu einem großen Teil auf Seiten, die Suchmaschinen bereits indexiert haben. Es ändert sich aber das Erfolgsmaß: Am 04.11.2026 erschien eine AI Overview bei allen 30 von uns geprüften Keywords aus der SEO-Branche (Google Polen), die Position allein kann also weniger Klicks bringen als früher. Laut Senuto sank der Median der Klicks von 1.442 polnischen Domains von August bis Oktober 2025 im Jahresvergleich um 19,9 % (Bericht v2.0, abgerufen am 18.11.2026; Daten für Polen).',
    },
    {
      question: 'Lohnt sich SEO 2026 noch?',
      answer: 'Ja. Google zeigt in AI Overviews als Quellen Seiten, die indexiert sind und für die Anzeige mit einem Ausschnitt infrage kommen, und ChatGPT mit Websuche liest ebenfalls Seiten aus dem Netz. Ohne technisches SEO und gute Inhalte hat ein Modell nichts, was es zitieren könnte. Geändert hat sich eher, was Sie messen.',
    },
    {
      question: 'Was ist GEO im SEO?',
      answer: 'Im Marketing hat das Kürzel GEO zwei Bedeutungen. Früher stand es für Maßnahmen mit Ortsbezug, also Geotargeting und lokales SEO. Seit 2023 bezeichnet es immer häufiger die Optimierung für Antworten von KI-Modellen, also für generative Suchmaschinen. Selbst die Modelle verwechseln es: In unseren zwei Tests vom 4. und 05.11.2026 beschrieb GPT-4.1 mini GEO als Geolokalisierungs-Marketing.',
    },
    {
      question: 'Sind AEO, AIO und LLMO dasselbe wie GEO?',
      answer: 'In der Praxis ja: AEO, AIO, LLMO und KI-SEO beschreiben die Arbeit an der Präsenz eines Unternehmens in KI-generierten Antworten. Sie unterscheiden sich im Schwerpunkt, nicht in der Methode. Vorsicht bei der Suche: Das Kürzel „AEO“ steht im Zoll auch für den Status „Zugelassener Wirtschaftsbeteiligter“ und nicht nur für Marketing.',
    },
    {
      question: 'Was kostet GEO?',
      answer: 'Das KI-Sichtbarkeit Audit kostet bei uns 235 € netto und wird auf den ersten Monat des Abonnements angerechnet. Laufende Messung und Maßnahmen sind in SEO Premium enthalten (ab 590 € netto pro Monat) oder kosten als Aufpreis zu SEO Standard (ab 450 € netto pro Monat) 115 € netto pro Monat. Alle Preise netto zzgl. gesetzlicher MwSt., Stand 11.2026.',
    },
    {
      question: 'Wie prüfe ich, ob ChatGPT mein Unternehmen empfiehlt?',
      answer: 'Stellen Sie ChatGPT, Perplexity und Gemini einige Fragen, die Ihre Kunden stellen, und prüfen Sie, ob in den Antworten Ihr Firmenname oder Ihre Seite genannt wird. Wiederholen Sie das jede Woche mit derselben Fragenliste, denn Antworten ändern sich. Eine vollständige Messung mit 30 Fragen in vier Quellen ist Teil unseres KI-Sichtbarkeit Audits.',
    },
  ],
  sources: [
    { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal et al., Studie, die den Begriff GEO einführte, arXiv 2311.09735 (November 2023), abgerufen am 05.11.2026' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: AI features and your website, abgerufen am 05.11.2026' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies', nazwa: 'Google Search Central: Spam policies for Google web search, abgerufen am 05.11.2026' },
    { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: Crawler von OpenAI (OAI-SearchBot, GPTBot), abgerufen am 18.11.2026' },
    { url: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide', nazwa: 'Google Search Central: Optimizing for generative AI features (llms.txt, Erwähnungen, strukturierte Daten), abgerufen am 18.11.2026' },
    { url: 'https://insight.senuto.com/aio-report-2/', nazwa: 'Senuto: AI Overviews in Poland - 18M Keywords, v2.0 (27.11.2025), abgerufen am 18.11.2026', },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Google-Ergebnisse (Polen, Desktop) für 30 Keywords aus der SEO-Branche, abgerufen am 04.11.2026' },
  ],
  cta: {
    tekst: 'KI-Sichtbarkeit Audit anfragen (235 € netto)',
    plan: 'audyt-ai',
    linki: [{ tekst: 'So arbeiten wir an Generative Engine Optimization', href: '/pozycjonowanie-w-ai' }],
  },
  about: {
    '@type': 'DefinedTerm',
    name: 'Generative Engine Optimization',
    alternateName: ['GEO', 'AEO', 'AIO', 'LLMO'],
    description: 'Optimierung der Präsenz eines Unternehmens in Antworten von KI-Modellen und in AI Overviews von Suchmaschinen.',
  },
};

export { P2_DE };

/** Deutsche Vergleichsseite nach Slug (nur seo-vs-geo existiert in der Startphase) oder null. */
export function porownanieDeBySlug(slug) {
  return slug === P2_DE.slug ? P2_DE : null;
}
