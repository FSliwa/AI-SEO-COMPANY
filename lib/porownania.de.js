// Deutsche Vergleichsseiten (Gruppe de-porownania, aktualisiert 22.11.2026 - 10 Vergleiche):
//   - P2_DE:             /porownania/seo-vs-geo                              -> /de/vergleiche/seo-vs-geo
//   - P3_DE:             /porownania/seo-czy-google-ads                      -> /de/vergleiche/seo-oder-google-ads
//   - P4_DE:             /porownania/agencja-seo-czy-freelancer              -> /de/vergleiche/seo-agentur-oder-freelancer
//   - P6_DE:             /porownania/jak-wybrac-agencje-seo                  -> /de/vergleiche/seo-agentur-auswaehlen
//   - P1_DE:             /porownania/pozycjonowanie-za-efekt-czy-abonament   -> /de/vergleiche/seo-erfolgsbasiert-oder-retainer
//   - P10_NEXT_WP_DE:    /porownania/nextjs-vs-wordpress-seo                 -> /de/vergleiche/nextjs-vs-wordpress-seo
//   - P11_WEBFLOW_WP_DE: /porownania/webflow-vs-wordpress-seo                -> /de/vergleiche/webflow-vs-wordpress-seo
//   - P12_KOD_KREATOR_DE:/porownania/strona-kodowana-czy-kreator-seo         -> /de/vergleiche/programmierte-website-oder-baukasten-seo
//   - P13_SHOPIFY_WOO_DE:/porownania/shopify-vs-woocommerce-seo              -> /de/vergleiche/shopify-vs-woocommerce-seo
//   - P14_AHREFS_SEMRUSH_DE:/porownania/ahrefs-vs-semrush-narzedzia-seo      -> /de/vergleiche/ahrefs-vs-semrush-seo-tools
//
// Zahlen für P2_DE kommen aus POMIAR_AIO (lib/porownania.js): ein Datensatz für PL, EN und DE.
// Title, Beschreibung und H1 aus dem Register lib/stronyDe.js (mit defensiven Fallbacks für parallelen Ausbau).
// Preise: EUR-Werte der deutschen Leistungsseiten (SEO Standard 450 €, SEO Premium 590 €, Booster Pack 590 €,
// SEO Audit ab 350 €, KI-Sichtbarkeit Audit 235 €, Aufpreis 115 €), keine Wechselkurs-Schätzung für Paketpreise.
// Links in HTML nur zu Seiten, die es auf Deutsch gibt (hrefDe liefert null ohne Seite oder bei ausgeschalteter Version DE).
// Polnische Marktdaten und eigene Kampagnendaten aus Polen sind überall ausdrücklich als solche gekennzeichnet.

import { POMIAR_AIO } from './porownania';
import { PANEL_DEMO_URL } from './panel';
import { STRONY_DE, hrefDe } from './stronyDe';
import { P10_NEXT_WP_DE, P11_WEBFLOW_WP_DE, P12_KOD_KREATOR_DE } from './porownania.cms.de';
import { POROWNANIA_SPRINT2_DE } from './porownaniaSprint2.de';
import { POROWNANIA_FALA2_DE } from './porownaniaFala2.de';

function metaDe(klucz, zapas) {
  return STRONY_DE[klucz] || zapas;
}

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

// --- P2_DE: SEO vs GEO -------------------------------------------------------------------------

const W2 = metaDe('/porownania/seo-vs-geo', {
  tytul: 'SEO vs GEO: Unterschiede und der richtige Start',
  h1: 'SEO vs GEO: Was ist der Unterschied?',
  opis: 'SEO vs GEO: SEO verbessert Positionen in Google, GEO sorgt für Nennungen in ChatGPT, Gemini und AI Overviews. Gemeinsamkeiten, Unterschiede, Start.',
});

const P2_DE = {
  slug: 'seo-vs-geo',
  title: W2.tytul,
  description: W2.opis,
  h1: W2.h1,
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
        '<p>GEO steht für Generative Engine Optimization, auf Deutsch Optimierung für generative Suchmaschinen (im Vergleich oft auch GEO vs SEO genannt). Gemeint ist die Arbeit daran, dass KI-Modelle mit Internetzugang Ihr Unternehmen nennen und Ihre Seite zitieren, wenn sie Kundenfragen beantworten. Bei SEO ist das Ziel ein Platz in der Ergebnisliste und der Klick. Bei GEO zählt, ob das Modell Ihr Unternehmen überhaupt erwähnt, in welchem Zusammenhang und mit welcher Quelle.</p>',
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
          h3: 'SEO vs GEO vs AEO, AIO, LLMO und KI-SEO: dasselbe?',
          html: '<p>Wer den Vergleich SEO vs GEO vs AEO zieht, beschreibt dasselbe Phänomen: Ein Unternehmen soll in der Antwort eines Modells auftauchen, nicht nur in einer Linkliste. AEO, Answer Engine Optimization, ist älter als GEO und entstand mit Featured Snippets in Google und mit Sprachassistenten. AIO und LLMO sind neuere Namen, und „KI-SEO“ ist ein Verkaufsbegriff, den Agenturen verwenden, auch wir.</p>',
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
    { url: 'https://insight.senuto.com/aio-report-2/', nazwa: 'Senuto: AI Overviews in Poland - 18M Keywords, v2.0 (27.11.2025), abgerufen am 18.11.2026' },
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

// --- P4_DE: SEO-Agentur, Freelancer oder Inhouse-SEO -------------------------------------------

const W4 = metaDe('/porownania/agencja-seo-czy-freelancer', {
  tytul: 'SEO-Agentur, Freelancer oder Inhouse? Vergleich 2026',
  h1: 'SEO-Agentur, SEO-Freelancer oder Inhouse-Team: Kosten, Risiken und Vertrag',
  opis: 'SEO-Agentur, Freelancer oder Inhouse-SEO im Vergleich: Monatskosten in Euro, Vertretung, Tools, Google-Konten und Kündigungsfristen mit Quellen.',
});

const P4_DE = {
  slug: 'agencja-seo-czy-freelancer',
  title: W4.tytul,
  description: W4.opis,
  h1: W4.h1,
  okruszek: 'SEO-Agentur oder Freelancer',
  nazwaKarty: 'SEO-Agentur, Freelancer oder Inhouse',
  tag: 'Vergleich der SEO-Zusammenarbeit',
  zrodlaDanych: 'Daten: globale Ahrefs-Preisstudie (439 Anbieter, August 2024), unsere Auswertung von 17 Agenturen in Polen (Stand 25.10.2026), Marktübersichten NapoleonCat/Useme (Polen) sowie unsere Euro-Preisliste (Stand 21.11.2026).',
  answer: 'Ein SEO-Freelancer rechnet sich bei klar abgegrenzten Einzelaufgaben und direktem 1:1-Austausch. Eine SEO-Agentur bündelt Technik, Content, Linkaufbau, bezahlte SEO-Tools und KI-Sichtbarkeit in einem festen Monatspaket. Eine eigene Inhouse-Stelle lohnt sich erst bei großen Plattformen mit 160 Stunden SEO-Arbeit pro Monat. In allen drei Modellen gehören die Google-Konten auf Ihr Firmenkonto.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabelle-agentur-freelancer-inhouse',
  tableCaption: 'SEO-Agentur, SEO-Freelancer und Inhouse-SEO im Vergleich: 8 Kriterien für Unternehmen im DACH-Raum (November 2026)',
  tablePrzypis: 'Quellen: Ahrefs SEO Pricing Survey (439 Anbieter weltweit, aktualisiert 15.08.2024), Google Search Central Leitfaden zur Auswahl von SEO-Dienstleistern sowie unsere veröffentlichten Paketpreise in Euro (Stand 21.11.2026). Beschreibungen sind marktübliche Muster; die letzte Zeile nennt Prüffragen für jedes Vorgespräch.',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'agencja', label: 'SEO-Agentur' },
    { key: 'freelancer', label: 'SEO-Freelancer' },
    { key: 'inhouse', label: 'Inhouse-SEO' },
  ],
  rows: [
    {
      id: 'monatskosten',
      kryterium: 'Monatliche Gesamtkosten (netto)',
      agencja: 'Fester Paketpreis inkl. Umsetzung; bei uns 450 € (SEO Standard) oder 590 € (SEO Premium) pro Monat; globaler Agentur-Schnitt laut Ahrefs: 3.209 USD/Monat',
      freelancer: 'Stundensatz oder kleiner Retainer; globaler Schnitt laut Ahrefs: 1.349 USD/Monat bzw. 71,59 USD/Stunde; Texte und Links oft extra berechnet',
      inhouse: 'Bruttogehalt plus Arbeitgeber-Lohnnebenkosten im DACH-Raum, zuzüglich eigener SEO-Tool-Lizenzen sowie Budget für externe Links und Redaktion',
    },
    {
      id: 'kompetenzen',
      kryterium: 'Abgedeckte Kompetenzen',
      agencja: 'Technisches SEO, Core Web Vitals, Fachredaktion, B2B-Linkaufbau, lokales SEO und KI-Sichtbarkeit (GEO) parallel im Team',
      freelancer: 'Spitze Expertise in einem Schwerpunkt (z. B. technischer Audit oder Content), selten Entwickler, Texter und Outreach-Spezialist in einer Person',
      inhouse: 'Tiefe Kenntnis von Produkt und Vertrieb, aber eine einzelne Fachkraft deckt selten Code, Copywriting und Digital PR gleichermaßen ab',
    },
    {
      id: 'tools',
      kryterium: 'SEO-Tool-Stack und Lizenzkosten',
      agencja: 'Crawler, Backlink-Datenbanken, Keyword-Recherche und KI-Monitoring trägt die Agentur; bei uns inklusive Kundenportal rund um die Uhr',
      freelancer: 'Eigene Basis-Lizenzen meist vorhanden; Spezial-Crawler oder wöchentliches KI-Monitoring teils als Weiterberechnung',
      inhouse: 'Unternehmen zahlt alle Lizenzen separat (technischer Crawler, Backlink-Index und Rank-Tracker kosten schnell mehrere Hundert Euro netto/Monat)',
    },
    {
      id: 'vertretung',
      kryterium: 'Urlaub, Krankheit oder Ausfall',
      agencja: 'Dokumentiertes Arbeitsprotokoll im Team; klären Sie vorab im Vertrag schriftlich, wer bei Abwesenheit übernimmt',
      freelancer: 'Ohne ausdrücklich benannte Vertretung steht das Projekt bei Krankheit, Urlaub oder Vollauslastung still',
      inhouse: 'Urlaub, längerer Ausfall oder Kündigung der einzigen SEO-Fachkraft pausiert Maßnahmen bis zur Neubesetzung (oft mehrere Monate Recruiting)',
    },
    {
      id: 'reporting',
      kryterium: 'Reporting und Einblick in Daten',
      agencja: 'Bei uns 24/7-Kundenportal (Oberfläche auf Polnisch und Englisch) mit Live-Daten Ihrer Search Console, Arbeitsprotokoll und Monatsbericht',
      freelancer: 'Hängt von der Arbeitsweise ab; lassen Sie sich vorab einen anonymisierten Musterbericht aus echten Kundendaten zeigen',
      inhouse: 'Direkte Teilnahme an internen Sprints und Jour fixes; Reporting-Dashboards müssen intern aufgebaut und gepflegt werden',
    },
    {
      id: 'eigentum-konten',
      kryterium: 'Google-Konten, Texte und Links',
      agencja: 'Je nach Vertrag verschieden; bei uns bleiben Search Console, GA4, Unternehmensprofil und Domain auf Ihrem Firmenkonto, bezahlte Inhalte und Links bleiben bestehen',
      freelancer: 'In der Regel Gastzugriff auf Ihre bestehenden Konten; Rechteübergang an erstellten Texten schriftlich festhalten',
      inhouse: 'Alle Konten, Daten und Inhalte liegen von Beginn an vollständig im Unternehmen',
    },
    {
      id: 'vertrag',
      kryterium: 'Vertragslaufzeit und Kündigungsfrist',
      agencja: 'Im Markt häufig 6 bis 24 Monate Bindung; bei uns flexibler Monatsvertrag per E-Mail kündbar (Ausnahme Booster Pack mit neuer Website: mind. 3 Monate)',
      freelancer: 'Meist flexibel projektbezogen oder mit kurzer Frist von 2 bis 4 Wochen kündbar',
      inhouse: 'Unbefristeter Arbeitsvertrag mit gesetzlicher bzw. vertraglicher Kündigungsfrist und dauerhaftem Fixkostenblock',
    },
    {
      id: 'eignung',
      kryterium: 'Wann wirtschaftlich erste Wahl?',
      agencja: 'KMU, B2B-Unternehmen und Dienstleister, die planbare Monatskosten und messbare Umsetzung aus einer Hand suchen',
      freelancer: 'Einmalige Aufgaben (Audit, Relaunch-Begleitung, Sparring für internes Marketing) oder sehr spitze Nischen mit kleinem Budget',
      inhouse: 'Große E-Commerce-Shops, Marktplätze, SaaS-Anbieter oder Portalgruppen mit mindestens 160 Stunden SEO-Arbeit jeden Monat im Produkt',
    },
  ],
  sections: [
    {
      id: 'vergleich-8-kriterien',
      h2: 'SEO-Agentur, Freelancer oder Inhouse-SEO: 8 Kriterien in einer Tabelle',
      html: [
        '<p>Transparenzhinweis: Wir schreiben diesen Vergleich als SEO- und GEO-Agentur mit Sitz in Warschau. Deshalb benennen wir ebenso klar die Situationen, in denen ein unabhängiger SEO-Freelancer oder eine eigene Inhouse-Stelle wirtschaftlich sinnvoller ist. Wir nennen und bewerten keine einzelnen Wettbewerber.</p>',
        '<p>Die Entscheidung zwischen Agentur, Freelancer und Inhouse-Team lässt sich selten allein über den Stundensatz treffen. Entscheidend ist, wer im Alltag Texte schreibt, technische Fehler im Code behebt, externe Verlinkungen aufbaut, die Softwarelizenzen bezahlt und bei Urlaub einspringt.</p>',
      ].join(''),
      tabela: 'glowna',
      h3: [
        {
          id: 'wann-inhouse-sinnvoll',
          h3: 'Ab welcher Unternehmensgröße rechnet sich Inhouse-SEO?',
          html: '<p>Eine Vollzeitstelle für Inhouse-SEO entfaltet ihren Wert dort, wo jede Woche neue Produktkategorien, Filterregeln, Templates und internationale Releases live gehen und eine Person 160 Stunden pro Monat im engen Austausch mit Produktmanagement und Entwicklung auslasten. In kleinen und mittleren B2B-Unternehmen mit 20 bis 100 Unterseiten übersteigen dagegen schon das Arbeitgeberbrutto und der eigene SEO-Tool-Stack ein mehrfaches Agenturpaket - noch bevor ein einziger Fachartikel geschrieben oder ein Branchenlink aufgebaut wurde.</p>',
        },
      ],
    },
    {
      id: 'kosten-und-preisstudien',
      h2: 'Was kosten SEO-Agentur und Freelancer? Veröffentlichte Studien und unsere Euro-Pakete',
      html: [
        '<p>Verlässliche Preisdaten über SEO-Dienstleister hinweg sind selten, weil viele Anbieter Preise erst nach einem Verkaufsgespräch nennen. Deshalb stellen wir einer internationalen Erhebung zwei polnische Marktübersichten (ausdrücklich als Daten aus Polen gekennzeichnet) und unsere festen Euro-Paketpreise für Kunden im DACH-Raum gegenüber. Währungen und Märkte rechnen wir bewusst nicht künstlich ineinander um.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-veroeffentlichte-seo-preise',
        caption: 'Veröffentlichte SEO-Honorare im Vergleich zu unseren Euro-Paketen (Stand November 2026)',
        columns: [
          { key: 'quelle', label: 'Quelle, Markt und Abrechnungsart' },
          { key: 'freelancer', label: 'SEO-Freelancer' },
          { key: 'agentur', label: 'SEO-Agentur' },
        ],
        rows: [
          { id: 'ahrefs-monat', quelle: 'Ahrefs, weltweit (439 Anbieter, Stand 15.08.2024): durchschnittliches Monatsabo', freelancer: '1.349 USD / Monat', agentur: '3.209 USD / Monat' },
          { id: 'ahrefs-stunde', quelle: 'Ahrefs, weltweit (wie oben): durchschnittlicher Stundensatz', freelancer: '71,59 USD / Stunde', agentur: '98,90 USD / Stunde' },
          { id: 'napoleoncat-pl', quelle: 'NapoleonCat, Polen (11.09.2026, polnischer Markt): Monatsspanne netto', freelancer: '1.000-8.000 PLN', agentur: '800-15.000 PLN' },
          { id: 'useme-pl', quelle: 'Useme, Polen (abgerechnete Aufträge 2025, polnischer Markt): Ø Auftragswert', freelancer: '2.050 PLN je Auftrag', agentur: 'keine Angabe' },
          { id: 'aisc-eur', quelle: 'AI SEO COMPANY, Euro-Preisliste (netto, Monatsvertrag)', freelancer: '-', agentur: '450 € (SEO Standard) / 590 € (SEO Premium)' },
        ],
        przypis: 'Quellen: Ahrefs Blog „SEO Pricing“ (439 Befragte weltweit, Update 15.08.2024), NapoleonCat (polnische Marktübersicht vom 11.09.2026), Useme (Abrechnungsdaten 2025 aus Polen), abgerufen am 18.11.2026, sowie unsere Euro-Preisliste (Stand 21.11.2026). Die PLN-Werte beschreiben ausschließlich den polnischen Inlandsmarkt.',
        minWidth: 580,
      },
      htmlPo: [
        `<p>Wir verkaufen keine losen Beratungsstunden, sondern einen klar bezifferten monatlichen Leistungsumfang: In <strong>SEO Standard (ab 450 € netto/Monat)</strong> sind technisches Audit, bis zu 20 Keywords (rechnerisch 22,50 € netto je Keyword), 2 Fachinhalte, 2 Links sowie die Pflege des Google Unternehmensprofils enthalten. <strong>SEO Premium (590 € netto/Monat)</strong> umfasst bis zu 50 Keywords (rechnerisch 11,80 € netto je Keyword), 4 Inhalte, 4 Links sowie die wöchentliche Messung der KI-Sichtbarkeit in ChatGPT und Google. Den kompletten Leistungsvergleich sehen Sie unter ${wew('/cennik-pozycjonowania', 'SEO Kosten und Pakete in Euro')}.</p>`,
        `<p>Durch unseren Sitz in Warschau arbeiten Unternehmen aus Deutschland, Österreich und der Schweiz direkt mit einem europäischen Entwickler- und SEO-Team zu transparenten Euro-Konditionen - sowohl für deutschsprachiges B2B-SEO als auch beim gezielten Markteintritt über unsere Seite ${wew('/seo-agentur-polen', 'SEO Agentur Polen')}.</p>`,
      ].join(''),
    },
    {
      id: 'markttransparenz-17-agenturen',
      h2: 'Was Agenturen vorab offenlegen: Einblick aus 17 SEO-Agenturen in Polen',
      html: [
        '<p>Wie transparent gehen Agenturen vor Vertragsabschluss mit Preisen, Kündigungsfristen und Reporting um? Für unsere Marktanalyse haben wir die Angebotsseiten, Preislisten und Allgemeinen Geschäftsbedingungen von <strong>17 SEO-Agenturen in Polen (Stand 25.10.2026)</strong> ausgewertet. Wichtig zur Einordnung: Es handelt sich ausdrücklich um <strong>Daten des polnischen Marktes</strong> (AI SEO COMPANY selbst ist in den 17 nicht mitgezählt; es werden keine Firmennamen genannt). Die Stichprobe zeigt dennoch typische Vertragsmuster der Branche, die Sie auch bei Anbietern im DACH-Raum gezielt abfragen sollten:</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-17-agenturen-polen',
        caption: 'Veröffentlichte Vertrags- und Preisangaben von 17 untersuchten SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten)',
        columns: [
          { key: 'merkmal', label: 'Geprüftes Merkmal auf der Website / in den AGB' },
          { key: 'anzahl', label: 'Anzahl von 17 Agenturen' },
        ],
        rows: [
          { id: 'preis', merkmal: 'Nennen einen Ab-Preis oder eine Preisspanne öffentlich auf der Website', anzahl: '12 von 17' },
          { id: 'abo', merkmal: 'Arbeiten im festen Abo, Stundenkontingent oder Projekt ohne Erfolgsprovision', anzahl: '11 von 17' },
          { id: 'erfolg', merkmal: 'Knüpfen einen Teil der Vergütung an Ergebnisse (meist Grundgebühr + Erfolgsanteil)', anzahl: '5 von 17 (1 ohne Angabe)' },
          { id: 'kuendigung', merkmal: 'Veröffentlichen ihre Kündigungsfrist vorab auf der Website', anzahl: '6 von 17 (4x ca. 1 Monat, 2x 3 Monate)' },
          { id: 'portal', merkmal: 'Erwähnen ein eigenes Kundenportal mit Login (öffentliche Demo ohne Login: 0)', anzahl: '4 von 17' },
        ],
        przypis: 'Quelle: eigene Auswertung öffentlich zugänglicher Angebotsseiten, Preislisten und AGB von 17 in Polen tätigen SEO-Agenturen, Stichtag 25.10.2026. Marktdaten für Polen, nicht repräsentativ für Deutschland, Österreich oder die Schweiz.',
        minWidth: 460,
      },
      htmlPo: `<p>Nur sechs von 17 untersuchten Agenturen nannten ihre Kündigungsfrist offen vor dem Erstgespräch, und keine einzige zeigte ihr Reporting-Portal ohne Login. Bei uns können Sie die ${ax(PANEL_DEMO_URL, 'Live-Demo unseres Kundenportals ohne Anmeldung')} jederzeit vorab im Browser öffnen (Oberfläche auf Polnisch und Englisch).</p>`,
    },
    {
      id: 'wann-freelancer-agentur-hybrid',
      h2: 'Wann passt der SEO-Freelancer, wann die Agentur und wann das Hybrid-Modell?',
      html: [
        '<ul>',
        '<li><strong>SEO-Freelancer wählen:</strong> Sie benötigen ein einmaliges technisches Audit, eine Zweitmeinung vor einem Relaunch, die Einrichtung von Google Search Console und GA4 oder wenige Stunden monatliches Sparring, während Ihr eigenes Team alle Texte und Code-Änderungen intern umsetzt.</li>',
        '<li><strong>SEO-Agentur wählen:</strong> Sie möchten kontinuierlich organische Kundenanfragen aufbauen und brauchen Technik, Content-Produktion, Linkaufbau, Google Unternehmensprofil und KI-Sichtbarkeits-Messung verlässlich koordiniert zu einem festen Monatsbetrag.</li>',
        '<li><strong>Hybrid-Modell für den Mittelstand:</strong> Eine Person im internen DACH-Marketing gibt Fachthemen, Produktwissen und Freigaben rein, während die Agentur Keyword-Architektur, Core Web Vitals, strukturierte Daten, Linkaufbau und das wöchentliche Reporting liefert.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'vertrag-und-google-konten',
      h2: 'Vertrag und Konten-Hoheit: 6 Schutzregeln vor jeder Unterschrift',
      html: [
        '<p>Google weist in der offiziellen Dokumentation ausdrücklich darauf hin, dass Website-Betreiber selbst für die Maßnahmen beauftragter SEO-Dienstleister verantwortlich bleiben. Diese sechs Punkte schützen Ihr Unternehmen unabhängig davon, ob Sie einen Freelancer oder eine Agentur beauftragen:</p>',
        '<ol>',
        '<li><strong>Eigentum an allen Konten:</strong> Google Search Console, Google Analytics 4, Google Unternehmensprofil und die Domain laufen auf den Namen Ihres Unternehmens; Dienstleister erhalten lediglich Nutzerrechte.</li>',
        '<li><strong>Kurze Kündigungsfrist ohne Strafgebühren:</strong> Monatliche Kündbarkeit per E-Mail (ohne Einrichtungs- oder Ausstiegsgebühr und ohne stillschweigende Verlängerung um weitere 12 Monate).</li>',
        '<li><strong>Klare Vertretungs- und Übergaberegelung:</strong> Wer führt laufende Aufgaben bei Urlaub oder Krankheit fort, und wie ist das Änderungsprotokoll dokumentiert?</li>',
        '<li><strong>Dauerhafte Nutzungsrechte an Texten und Links:</strong> Bezahlte Fachartikel gehen in Ihr Eigentum über; meiden Sie „gemietete“ Agentur-Linknetzwerke, deren Links nach Vertragsende gelöscht werden.</li>',
        '<li><strong>Messung aus Ihren Erstparteien-Daten:</strong> Berichte müssen auf Klicks, Impressionen und Anfragen aus Ihrer eigenen Search Console und GA4 basieren - nicht nur auf Screenshots fremder Ranking-Tools.</li>',
        '<li><strong>DSGVO-Konformität in der EU:</strong> Prüfen Sie Zugriffsrechte auf Analyse- und Serverdaten nach DSGVO-Maßstäben (innerhalb der Europäischen Union gelten die Vorgaben der DSGVO unmittelbar).</li>',
        '</ol>',
        `<p>Unsere eigenen Vertragsbedingungen fassen wir verbindlich in den ${wew('/cennik-pozycjonowania', 'sechs Grundsätzen für faire Verträge', '#faire-vertraege')} zusammen.</p>`,
        '<p><em>Hinweis: Diese Zusammenstellung dient der geschäftlichen Orientierung und stellt keine Rechtsberatung dar. Lassen Sie umfangreiche Verträge im Zweifel juristisch prüfen.</em></p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu SEO-Agentur, Freelancer und Inhouse-SEO',
  faq: [
    {
      question: 'Was kostet eine SEO-Agentur im Vergleich zu einem SEO-Freelancer?',
      answer: 'In der weltweiten Ahrefs-Erhebung unter 439 Anbietern lag der durchschnittliche Stundensatz von SEO-Freelancern bei 71,59 USD (Monatsretainer Ø 1.349 USD) und von Agenturen bei 98,90 USD (Monatsretainer Ø 3.209 USD). Vergleichen Sie immer den konkreten Leistungsumfang: Bei uns kostet SEO Standard 450 € netto pro Monat (bis 20 Keywords, 2 Inhalte, 2 Links) und SEO Premium 590 € netto pro Monat.',
    },
    {
      question: 'Was passiert, wenn mein SEO-Freelancer krank wird oder keine Kapazität mehr hat?',
      answer: 'Ohne vertraglich vereinbarte Vertretung pausiert die Arbeit meistens komplett. Sichern Sie sich vorab ab: Alle Google-Konten (Search Console, GA4, Unternehmensprofil) müssen auf Ihr Unternehmen registriert sein, und alle Änderungen an Technik und Inhalten sollten laufend dokumentiert werden, damit jederzeit nahtlos übernommen werden kann.',
    },
    {
      question: 'Wann lohnt sich ein eigener Inhouse-SEO-Mitarbeiter statt einer Agentur?',
      answer: 'Meist erst dann, wenn Sie einen großen Online-Shop, ein SaaS-Produkt oder mehrere Länderportale betreiben, die jeden Monat volle 160 Arbeitsstunden direkt in Entwicklungs-Sprints füllen - und wenn zusätzlich zum Arbeitgeberbrutto noch Budget für SEO-Tools, Texterstellung und externen Linkaufbau vorhanden ist.',
    },
    {
      question: 'Woran erkenne ich unseriöse SEO-Anbieter im Erstgespräch?',
      answer: 'Warnsignale sind Garantien auf „Platz 1 bei Google in 30 Tagen“ (niemand kann organische Top-1-Positionen garantieren), 12- bis 24-Monats-Knebelverträge ohne Ausstiegsrecht, fehlende Einsicht in Musterberichte sowie die Weigerung, Search Console und Analytics auf Ihrem eigenen Firmenkonto einzurichten.',
    },
    {
      question: 'Kann ein DACH-Unternehmen sinnvoll mit Ihrer Agentur in Warschau zusammenarbeiten?',
      answer: `Ja. AI SEO COMPANY ist eine europäische Kapitalgesellschaft mit Sitz in Warschau; alle Rechnungen und Pakete für den DACH-Raum lauten transparent in Euro netto mit monatlicher Kündbarkeit. Wir betreuen sowohl deutschsprachige Unternehmensseiten als auch den gezielten Markteintritt nach Polen über ${wew('/seo-agentur-polen', 'SEO Agentur Polen')}.`,
    },
    {
      question: 'Lassen sich internes Marketing und externe SEO-Agentur kombinieren?',
      answer: 'Ja, das ist im B2B-Mittelstand oft die wirtschaftlich stärkste Lösung: Ihr internes Team liefert Fachwissen aus Vertrieb und Produkt, während wir technisches SEO, Core Web Vitals, Keyword-Cluster, redaktionelle Ausarbeitung, Linkaufbau und das wöchentliche KI-Sichtbarkeits-Monitoring übernehmen.',
    },
  ],
  sources: [
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO Pricing (Umfrage unter 439 SEO-Anbietern weltweit, aktualisiert am 15.08.2024), abgerufen am 18.11.2026' },
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de', nazwa: 'Google Search Central: Brauche ich einen SEO-Experten? (Auswahlkriterien und Konten-Verantwortung), abgerufen am 21.11.2026' },
    { url: 'https://napoleoncat.com/pl/blog/ile-kosztuje-zatrudnienie-agencji-seo/', nazwa: 'NapoleonCat: Kosten einer SEO-Agentur vs. Freelancer vs. Festanstellung (11.09.2026, polnischsprachige Marktübersicht für Polen), abgerufen am 18.11.2026' },
    { url: 'https://useme.com/pl/blog/ile-zaplacic-freelancerowi/', nazwa: 'Useme: Abrechnungsdaten für Freelancer-Aufträge 2025 (polnischsprachiger Bericht für Polen), abgerufen am 18.11.2026' },
  ],
  cta: {
    tekst: 'Liegt Ihnen ein SEO-Angebot vor? Wir prüfen Leistungsumfang, Kosten und Vertrag kostenfrei',
    plan: 'przeglad-agencji',
    linki: [
      { tekst: 'SEO Kosten und Pakete in Euro ansehen', href: '/cennik-pozycjonowania' },
      { tekst: 'SEO Agentur Polen (Markteintritt aus dem DACH-Raum)', href: '/seo-agentur-polen' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Auswahl eines SEO-Dienstleisters: Agentur, Freelancer oder Inhouse' }],
};

// --- P3_DE: SEO oder Google Ads (SEA) ----------------------------------------------------------

const W3 = metaDe('/porownania/seo-czy-google-ads', {
  tytul: 'SEO oder Google Ads? Kosten, Dauer & Kombination 2026',
  h1: 'SEO oder Google Ads (SEA): Was rechnet sich wann für Unternehmen?',
  opis: 'SEO oder Google Ads im Vergleich: Klickpreise, Anlaufzeit, was nach Budgetstopp bleibt und wann die Kombination aus SEO und SEA sinnvoll ist.',
});

const P3_DE = {
  slug: 'seo-czy-google-ads',
  title: W3.tytul,
  description: W3.opis,
  h1: W3.h1,
  okruszek: 'SEO oder Google Ads',
  nazwaKarty: 'SEO oder Google Ads (SEA)',
  tag: 'Kanalvergleich: Organische Suche vs. Bezahlte Anzeigen',
  zrodlaDanych: 'Daten: eigene Google-Ads-Kampagne in Polen (26.09.-11.10.2026), Google Keyword-Planer & SERP-Abruf über DataForSEO (Polen, 04.11.2026) sowie unsere Euro-Preisliste (Stand 21.11.2026).',
  answer: 'Google Ads (SEA) bringt Klicks ab dem ersten Tag der Freigabe, aber nur solange das Tagesbudget läuft: In unserer eigenen Kampagne in Polen lag der durchschnittliche Klickpreis bei 7,92 PLN (ca. 1,85 €). SEO zeigt in unserer Praxis erste Sichtbarkeitsbewegungen meist nach 4 bis 8 Wochen (marktüblich nennen Agenturen 3 bis 6 Monate), baut dafür dauerhafte Inhalte, Rankings und KI-Zitate auf. Für viele KMU ist die Kombination optimal: SEA für den Sofortstart, SEO für sinkende Kosten pro Anfrage.',
  published: '2026-11-21',
  updated: '2026-11-21',
  tableId: 'tabelle-seo-vs-google-ads-9-kriterien',
  tableCaption: 'SEO (Suchmaschinenoptimierung) und Google Ads (SEA) im Vergleich: 9 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: eigene Google-Ads-Kampagne (Polen, 26.09.-11.10.2026), Google Keyword-Planer und SERP-Messung über DataForSEO (Standort Polen, 04.11.2026, NBP-Mittelkurs 3,9097 PLN/USD), Google Ads Hilfe sowie unsere Euro-Preisliste (Stand 21.11.2026).',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'seo', label: 'SEO (organische Suche)' },
    { key: 'ads', label: 'Google Ads (SEA / bezahlte Suche)' },
  ],
  rows: [
    {
      id: 'bezahlung',
      kryterium: 'Wofür Sie bezahlen',
      seo: 'Für nachhaltige Arbeit an Technik, Inhalten, Links und Unternehmensprofil; der einzelne organische Klick kostet 0 €',
      ads: 'Für jeden einzelnen Klick in der Anzeigenauktion (CPC) zuzüglich eventueller Agenturgebühr für die Kontobetreuung',
    },
    {
      id: 'anlaufzeit',
      kryterium: 'Zeit bis zu ersten Ergebnissen',
      seo: 'In unserer Praxis erste Sichtbarkeitsänderungen meist nach 4 bis 8 Wochen; spürbarer Traffic später (Branchenrichtwert: 3 bis 6 Monate)',
      ads: 'Unmittelbar nach Anzeigenprüfung durch Google, in der Regel innerhalb eines Werktags',
    },
    {
      id: 'budgetstopp',
      kryterium: 'Was nach Budgetstopp bleibt',
      seo: 'Schnelle Technik, Fachseiten und aufgebaute Links bleiben Ihr Eigentum; Rankings geben ohne Pflege nur schrittweise nach',
      ads: 'Sichtbarkeit und Klicks aus Anzeigen fallen am Tag der Pausierung sofort auf null zurück',
    },
    {
      id: 'klickpreis',
      kryterium: 'Klickpreis (CPC)',
      seo: '0 € pro Klick aus den unbezahlten Ergebnissen und aus Google Maps',
      ads: 'Auktionspreis je Klick; in unserer eigenen Kampagne in Polen Ø 7,92 PLN (ca. 1,85 €, Gebotslimit 18 PLN), in umkämpften B2B-Branchen oft deutlich höher',
    },
    {
      id: 'steuerung',
      kryterium: 'Steuerung und Planbarkeit',
      seo: 'Google bestimmt die Reihenfolge; keine sekundengenaue Steuerung nach Uhrzeit oder Kampagnenfenster',
      ads: 'Präzise Steuerung nach Keywords, Region, Endgerät, Wochentag, Tagesbudget und Zielseite',
    },
    {
      id: 'reichweite',
      kryterium: 'Keyword-Breite',
      seo: 'Ein fundierter Fachbeitrag sammelt oft Klicks über Dutzende verwandte Long-Tail-Fragen ohne Zusatzkosten',
      ads: 'Jeder weitere Klick verbraucht Budget; die Reichweite ist direkt durch das Monatsbudget gedeckelt',
    },
    {
      id: 'messung',
      kryterium: 'Erfolgsmessung und Datenschutz',
      seo: 'Google Search Console (unabhängig von Analyse-Cookies) kombiniert mit GA4',
      ads: 'Google-Ads-Konto und GA4; im EWR/DACH-Raum für saubere Attribution auf Cookie-Einwilligung und Google Consent Mode angewiesen',
    },
    {
      id: 'risiko',
      kryterium: 'Typische Risiken',
      seo: 'Längere Anlaufzeit bei neuen Domains ohne Historie sowie Schwankungen durch Google Core Updates',
      ads: 'Steigende Klickpreise durch neue Mitbieter und Budgetverlust bei fehlenden auszuschließenden Keywords',
    },
    {
      id: 'ki-antworten',
      kryterium: 'Wirkung auf KI-Antworten (ChatGPT & AI Overviews)',
      seo: 'Indexierte Fachinhalte können in Google AI Overviews, ChatGPT und Perplexity als Quelle zitiert werden',
      ads: 'Suchanzeigen kaufen weder organische Positionen noch Quellen-Zitate in generativen KI-Antworten',
    },
  ],
  sections: [
    {
      id: 'sem-vs-seo-unterschied',
      h2: 'SEM vs. SEO: Was ist der Unterschied? (Begriffe SEO, SEA und PPC)',
      html: [
        '<p>Im deutschsprachigen Marketing begegnen Ihnen vier Abkürzungen, die in Gesprächen häufig durcheinandergeworfen werden:</p>',
        '<ul>',
        '<li><strong>SEO (Search Engine Optimization / Suchmaschinenoptimierung):</strong> Alle technischen, inhaltlichen und autoritätsbildenden Maßnahmen, damit Ihre Website in den unbezahlten (organischen) Suchergebnissen und in Google Maps sichtbar wird.</li>',
        '<li><strong>SEA (Search Engine Advertising / Suchmaschinenwerbung):</strong> Bezahlte Text- und Shopping-Anzeigen in Suchmaschinen - allen voran Google Ads. Im DACH-Raum beschreibt „SEO vs SEA“ (bzw. „SEO vs. SEA“) präzise die Entscheidung zwischen organischem Aufbau und bezahlten Anzeigen.</li>',
        '<li><strong>SEM (Search Engine Marketing / Suchmaschinenmarketing):</strong> Fachlich der Oberbegriff aus SEO und SEA zusammen. Im Alltag nutzen viele Suchende „SEM vs. SEO“ jedoch als Kurzform für „Google Ads oder SEO“.</li>',
        '<li><strong>PPC (Pay-per-Click):</strong> Das Abrechnungsmodell hinter SEA, bei dem nicht die Einblendung, sondern erst der Klick auf die Anzeige Geld kostet.</li>',
        '</ul>',
        '<p>Transparenzhinweis zu unserem eigenen Interesse: Wir sind eine auf SEO und KI-Sichtbarkeit (GEO) spezialisierte Agentur und bieten keine laufende Google-Ads-Betreuung als Kundendienstleistung an. Unsere Google-Ads-Zahlen auf dieser Seite stammen aus der Bewerbung unserer eigenen Website - wir berichten also aus der Perspektive eines werbungtreibenden Unternehmens, nicht als Anzeigenverkäufer.</p>',
      ].join(''),
    },
    {
      id: 'vergleich-9-kriterien',
      h2: 'SEO oder Google Ads im Vergleich: 9 Kriterien',
      tabela: 'glowna',
      htmlPo: '<p>Auf den Punkt gebracht lautet der kaufmännische Unterschied: Mit Google Ads mieten Sie sofortigen Zugang zu Suchenden für die Dauer Ihres Budgets. Mit SEO investieren Sie in das digitale Eigentum Ihres Unternehmens - schnelle Technik, zitierfähige Fachseiten und Markenautorität, die auch nach Monaten weiter Besucher anziehen.</p>',
    },
    {
      id: 'klickpreise-kampagnendaten',
      h2: 'Was kostet ein Klick in Google Ads? Echte Zahlen aus unserer eigenen Kampagne',
      html: [
        '<p>Google Ads hat keine feste Preisliste: Jeder Klick entsteht in einer Echtzeit-Auktion aus Gebotshöhe und Anzeigenqualität (Qualitätsfaktor). Um keine theoretischen Schätzwerte zu nennen, zeigen wir die realen Abrechnungsdaten unserer eigenen Google-Ads-Suchkampagne für SEO-Dienstleistungsbegriffe in Polen.</p>',
        '<p>Wichtige Einordnung: Diese Zahlen sind <strong>polnische Kampagnen- und Keyword-Planer-Daten</strong> (Standort Polen, polnische Suchbegriffe). Im deutschsprachigen DACH-Markt liegen die Klickpreise für vergleichbare B2B-, Rechts-, Finanz- oder Software-Keywords erfahrungsgemäß oft deutlich höher; der Mechanismus zwischen Gebotsstrategie und Listenpreis bleibt jedoch derselbe.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-cpc-eigene-kampagne-polen',
        caption: 'Gemessene Klickpreise unserer Kampagne vs. Google Keyword-Planer (Standort Polen, Herbst 2026 - polnische Marktdaten)',
        columns: [
          { key: 'datenquelle', label: 'Messung / Keyword (Polen)' },
          { key: 'wert', label: 'Durchschnittlicher Klickpreis (CPC)' },
        ],
        rows: [
          { id: 'eigene-ads', datenquelle: 'Unsere eigene Google-Ads-Kampagne (26.09.-11.10.2026, 213 Klicks für 1.687,82 PLN, Gebotsstrategie „Klicks maximieren“ mit Limit 18 PLN)', wert: '7,92 PLN (ca. 1,85 € Orientierungswert)' },
          { id: 'kp-cennik', datenquelle: 'Google Keyword-Planer: „pozycjonowanie stron cennik“ (SEO-Preise)', wert: 'ca. 37 PLN' },
          { id: 'kp-agencja', datenquelle: 'Google Keyword-Planer: „agencja seo“ (SEO-Agentur)', wert: 'ca. 50 PLN' },
          { id: 'kp-efekt', datenquelle: 'Google Keyword-Planer: „pozycjonowanie za efekt“ (SEO nach Erfolg)', wert: 'ca. 81 PLN' },
        ],
        przypis: 'Quellen: unser Google-Ads-Konto (Zeitraum 26.09.-11.10.2026, Polen) sowie Google Keyword-Planer über DataForSEO (Polen, 04.11.2026, umgerechnet zum NBP-Mittelkurs 3,9097 PLN/USD, Tabelle 215/A/NBP/2026). Der Euro-Betrag (ca. 1,85 €) dient lediglich der Größenordnung für DACH-Leser.',
        minWidth: 480,
      },
      htmlPo: '<p>Zum reinen Klickbudget kommt bei externer Vergabe das Agenturhonorar für die SEA-Betreuung hinzu: In unserer Stichprobe von 17 Agenturen in Polen (Stand 25.10.2026, polnische Marktdaten) starteten Verwaltungsgebühren bei 600 PLN im Monat oder lagen bei 14 bis 20 % des Werbebudgets. Im DACH-Raum sollten Sie diese Betreuungsquote immer auf den Netto-Klickpreis aufschlagen, bevor Sie die Kosten pro Anfrage mit einem SEO-Paket vergleichen.</p>',
    },
    {
      id: 'anlaufzeit-und-nachhaltigkeit',
      h2: 'Zeitfaktor und Budgetstopp: Sofort-Traffic gegen langfristigen Kanal',
      html: [
        '<p>Google prüft neue Suchanzeigen meist innerhalb eines Werktags. Sobald die Anzeige freigegeben ist und Ihr Gebot in der Auktion mithält, fließen noch in derselben Woche die ersten Besucher auf Ihre Zielseite. Endet das Budget oder pausieren Sie die Kampagne, sinkt der Anzeigen-Traffic noch am selben Tag auf null.</p>',
        `<p>Bei SEO verhält sich die Kurve umgekehrt: In den ersten Wochen investieren Sie in technische Fehlerbehebung, Ladezeit, Seitenarchitektur und neue Inhalte. Erste Bewegungen bei Impressionen und Positionen sehen wir in unserer Praxis meist nach 4 bis 8 Wochen, sobald Google die überarbeiteten Seiten neu gecrawlt hat; bis daraus regelmäßige Kundenanfragen entstehen, kalkulieren Agenturen am Markt üblicherweise 3 bis 6 Monate. Für vereinbarte lokale Keywords verfolgen wir das Ziel Top 3 in 2 bis 3 Monaten (Regeln und Ausnahmen unter ${wew('/cennik-pozycjonowania', 'Ziel Top 3 auf unserer Kostenseite', '#ziel-top-3')}).</p>`,
      ].join(''),
    },
    {
      id: 'ki-antworten-und-anzeigen',
      h2: 'AI Overviews und ChatGPT 2026: Warum Google Ads keine KI-Präsenz ersetzt',
      html: [
        '<p>Am 4. November 2026 haben wir 30 Keywords aus der SEO-Branche in Google geprüft (Standort Polen, Desktop, Daten über DataForSEO): Bei allen 30 Suchanfragen blendete Google eine KI-Übersicht (AI Overview) ein, während bezahlte Suchanzeigen nur bei 4 der 30 Keywords erschienen (Messung für Google Polen). In informations- und vergleichsgetriebenen B2B-Suchen konkurrieren Sie heute also häufig stärker um einen Platz als zitierte Quelle in der KI-Antwort als gegen klassische Textanzeigen.</p>',
        `<p>Bezahlte Google-Ads-Klicks haben keinerlei Einfluss auf organische Rankings oder darauf, wen ChatGPT, Perplexity und Gemini empfehlen. Wie Sie Ihre Inhalte für beide Welten strukturieren, zeigt unser ${wew('/porownania/seo-vs-geo', 'Vergleich SEO vs GEO')}.</p>`,
      ].join(''),
    },
    {
      id: 'wann-welcher-kanal',
      h2: 'Wann lohnt sich Google Ads, wann SEO und wann die Kombination?',
      tabela: {
        id: 'tabelle-entscheidung-seo-oder-sea',
        caption: 'Entscheidungshilfe nach Unternehmenssituation: Google Ads (SEA), SEO oder beides kombinieren',
        columns: [
          { key: 'situation', label: 'Ausgangslage Ihres Unternehmens' },
          { key: 'empfehlung', label: 'Empfohlener Weg' },
          { key: 'begruendung', label: 'Begründung' },
        ],
        rows: [
          { situation: 'Neugründung oder neue Dienstleistung: Anfragen werden noch diesen Monat gebraucht', empfehlung: 'Google Ads + paralleler SEO-Start', begruendung: 'SEA überbrückt die Anlaufzeit sofort, während SEO ab Monat 2 bis 6 die Abhängigkeit vom Klickpreis senkt' },
          { situation: 'Stark saisonales Geschäft (z. B. Klimatechnik, Winterdienst, Messebau)', empfehlung: 'SEA in der Hochsaison, SEO 3 Monate vor Saisonstart', begruendung: 'Anzeigen lassen sich tagesgenau zuschalten; organische Seiten müssen vorab indexiert sein' },
          { situation: 'Test eines neuen Angebots, Preises oder Nutzenversprechens', empfehlung: 'Zuerst Google Ads (2 bis 4 Wochen Test)', begruendung: 'Sie sehen schnell an echten Konversionsdaten, welche Keywords tatsächlich Anfragen auslösen, bevor Sie umfangreiche Inhalte produzieren' },
          { situation: 'Branche mit sehr hohen Klickpreisen (B2B-Industrie, IT, Recht, Medizin, Finanzen)', empfehlung: 'Schwerpunkt SEO + spitzes SEA auf Top-Konversions-Keywords', begruendung: 'Wenn einzelne Klicks zweistellige Eurobeträge kosten, senkt jeder organische Besuch die durchschnittlichen Kosten pro Lead massiv' },
          { situation: 'Lokaler Fachbetrieb mit begrenztem festem Monatsbudget', empfehlung: 'Lokales SEO + Google Unternehmensprofil', begruendung: 'Klicks und Anrufe über Google Maps und lokale Suchergebnisse bleiben dauerhaft kostenfrei pro Klick' },
        ],
        minWidth: 560,
      },
      htmlPo: `<p>Vor jedem größeren Werbe- oder SEO-Budget lohnt sich ein Blick unter die Haube der Zielseite: Wenn Formulare mobil klemmen oder Ladezeiten zu hoch sind, verpufft auch teurer Anzeigen-Traffic. Einen schnellen technischen Befund liefert unser ${wew('/narzedzia/audyt-seo', 'kostenloser SEO Audit')} oder das vertiefte ${wew('/audyt-seo', 'SEO Audit in 3 bis 5 Werktagen')}.</p>`,
    },
    {
      id: 'startbudget-berechnen',
      h2: 'So rechnen Sie Ihr Startbudget sauber durch',
      html: [
        '<p>Ob Google Ads oder SEO günstiger Kunden gewinnt, entscheidet eine einfache Dreisatz-Rechnung auf Basis Ihrer Website-Konversionsrate:</p>',
        '<ul>',
        '<li><strong>Erwartete Klicks</strong> = Monatsbudget geteilt durch den durchschnittlichen Klickpreis (CPC);</li>',
        '<li><strong>Erwartete Anfragen (Leads)</strong> = Klicks mal Konversionsrate Ihrer Zielseite (Anteil der Besuche mit abgesendetem Formular oder Anruf);</li>',
        '<li><strong>Kosten pro Anfrage (CPL)</strong> = Monatsbudget geteilt durch die Anzahl der Anfragen.</li>',
        '</ul>',
        `<p>Rechenbeispiel zur Einordnung: Bei einem Klickpreis von 3,00 € im B2B-Umfeld kauft ein Monatsbudget von 450 € netto (der Preis unseres Pakets SEO Standard) genau 150 Anzeigenklicks in diesem Monat - ohne bleibende Inhalte nach Monatsende. Im selben Budgetrahmen entstehen im ${wew('/cennik-pozycjonowania', 'Paket SEO Standard (ab 450 € netto/Monat)')} Monat für Monat technische Optimierungen, 2 neue Fachinhalte und 2 aufgebaute Links. Wichtig im DACH-Raum: Richten Sie das Conversion-Tracking in GA4 mitsamt sauberem Google Consent Mode v2 vor dem ersten ausgegebenen Euro ein, sonst fliegen beide Kanäle im Blindflug.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu SEO, SEA und Google Ads',
  faq: [
    {
      question: 'SEM vs. SEO: Was ist der Unterschied?',
      answer: 'SEM (Search Engine Marketing) ist der Oberbegriff für das gesamte Suchmaschinenmarketing und umfasst sowohl SEO (unbezahlte organische Ergebnisse) als auch SEA (bezahlte Suchanzeigen wie Google Ads). Wenn im Alltag nach „SEM vs. SEO“ oder „SEO vs. SEA“ gefragt wird, geht es praktisch immer um die Budgetentscheidung zwischen laufender Suchmaschinenoptimierung und bezahlten Klickanzeigen.',
    },
    {
      question: 'Was ist günstiger: SEO oder Google Ads?',
      answer: 'Kurzfristig zum Testen oft Google Ads, weil Sie mit kleinem Tagesbudget starten und sofort stoppen können. Über 6 bis 24 Monate ist SEO in den meisten Dienstleistungs- und B2B-Märkten wirtschaftlicher, weil organische Klicks 0 € kosten und einmal veröffentlichte Inhalte dauerhaft weiter Anfragen liefern.',
    },
    {
      question: 'Was bringt schneller Kundenanfragen: SEO oder SEA?',
      answer: 'Eindeutig Google Ads (SEA): Nach Freigabe der Anzeige (meist innerhalb eines Werktags) können sofort Besucher kommen. Bei SEO sehen wir erste Sichtbarkeitsbewegungen meist nach 4 bis 8 Wochen, während sich stabiler organischer Anfragefluss über mehrere Monate aufbaut.',
    },
    {
      question: 'Helfen Google-Ads-Anzeigen indirekt meinem organischen Google-Ranking?',
      answer: 'Nein, nicht als direkter Rankingfaktor. Google trennt das Anzeigensystem strikt vom organischen Suchalgorithmus; Werbebudget kauft keine besseren SEO-Plätze. Indirekt liefert Google Ads jedoch wertvolle Echtzeitdaten darüber, bei welchen Suchbegriffen und Anzeigentexten Besucher tatsächlich anfragen - dieses Wissen spart beim anschließenden SEO-Content viel Zeit.',
    },
    {
      question: 'Was kostet ein Klick bei Google Ads?',
      answer: 'Es gibt keinen Fixpreis, sondern eine Live-Auktion pro Suchanfrage. In unserer eigenen Google-Ads-Kampagne in Polen (26.09.-11.10.2026) zahlten wir durchschnittlich 7,92 PLN (ca. 1,85 €) pro Klick bei einem Gebotslimit von 18 PLN, während der Google Keyword-Planer für polnische SEO-Branchenbegriffe Durchschnitte von rund 37 bis 81 PLN auswies. Im DACH-Raum variieren Klickpreise je nach Wettbewerb stark von unter einem Euro bis zu hohen zweistelligen Eurobeträgen.',
    },
    {
      question: 'Sollte man Google Ads noch schalten, wenn man organisch schon in den Top 3 steht?',
      answer: 'Das hängt vom Wettbewerb auf Ihrem Markennamen und Ihren Hauptkeywords ab. Belegt die Konkurrenz über Ihrem organischen Platz 1 vier bezahlte Anzeigenplätze, kann eine ergänzende Anzeige Klickverluste verhindern. Prüfen Sie den Zusatznutzen nüchtern: Pausieren Sie die Anzeige für ein solches Keyword testweise 2 bis 4 Wochen und vergleichen Sie die Gesamtzahl der Anfragen aus Search Console, Ads und GA4.',
    },
  ],
  sources: [
    { url: 'https://support.google.com/google-ads/answer/1722120?hl=de', nazwa: 'Google Ads-Hilfe: Ablauf und Dauer der Anzeigenüberprüfung, abgerufen am 21.11.2026' },
    { url: 'https://business.google.com/de/ad-solutions/search-ads/', nazwa: 'Google Ads: Funktionsweise und Kostenkontrolle bei Suchanzeigen, abgerufen am 21.11.2026' },
    { url: 'https://www.google.com/intl/de/search/howsearchworks/', nazwa: 'Google Suche: Wie die Google-Suche funktioniert (Trennung von bezahlten Anzeigen und organischen Ergebnissen), abgerufen am 21.11.2026' },
    { url: 'https://ads.google.com/intl/de_de/home/tools/keyword-planner/', nazwa: 'Google Ads: Keyword-Planer für Suchvolumen und Gebotsschätzungen, abgerufen am 21.11.2026' },
    { url: 'https://api.nbp.pl/api/exchangerates/rates/a/usd/2026-11-04/?format=json', nazwa: 'Polnische Nationalbank (NBP): USD/PLN-Mittelkurs 3,9097 vom 04.11.2026 (Tabelle 215/A/NBP/2026 für die Keyword-Planer-Daten aus Polen), abgerufen am 04.11.2026' },
  ],
  cta: {
    tekst: 'Zielseite vor dem Budgetentscheid prüfen: SEO Audit anfragen (ab 350 € netto)',
    plan: null,
    linki: [
      { tekst: 'SEO Kosten und Pakete in Euro vergleichen', href: '/cennik-pozycjonowania' },
      { tekst: 'SEO Audit in 3 bis 5 Werktagen', href: '/audyt-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Suchmaschinenoptimierung (SEO)' },
    { '@type': 'Thing', name: 'Google Ads (SEA)' },
  ],
};

// --- P6_DE: SEO Agentur finden & auswählen (12 Prüffragen vor der Vertragsunterschrift) ---------

const W6 = metaDe('/porownania/jak-wybrac-agencje-seo', {
  tytul: 'SEO Agentur finden & auswählen: 12 Fragen vor Vertrag',
  h1: 'SEO Agentur finden und auswählen: 12 Fragen vor der Vertragsunterschrift',
  opis: 'Wie Sie die passende SEO Agentur finden (DE, AT, Schweiz): 12 konkrete Prüffragen zu Vertrag, Google-Konten, Links, Preisen und Warnsignalen im Vergleich.',
});

const P6_DE = {
  slug: 'jak-wybrac-agencje-seo',
  title: W6.tytul,
  description: W6.opis,
  h1: W6.h1,
  okruszek: 'SEO Agentur auswählen',
  nazwaKarty: 'SEO Agentur finden & auswählen: 12 Fragen',
  kryteria: '12 Prüffragen',
  tag: 'Einkaufs- & Due-Diligence-Leitfaden',
  zrodlaDanych: 'Daten: Google Search Central Leitfaden zur Auswahl von SEO-Experten, globale Ahrefs-Preisstudie (439 Anbieter), unsere Auswertung von 17 SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten) sowie DSGVO/nDSG-Anforderungen (Stand 22.11.2026).',
  answer: 'Wer im DACH-Raum eine passende SEO Agentur finden möchte, sollte nicht nach gekauften Award-Siegeln entscheiden, sondern zwölf Prüfpunkte vor der Unterschrift schriftlich klären: Bleiben Search Console, GA4 und Unternehmensprofil auf Ihrem Firmenkonto, ist der Vertrag monatlich kündbar, gehören Texte und Links dauerhaft Ihnen, misst der Bericht echte Kundenanfragen und ist die Auftragsverarbeitung nach DSGVO bzw. Schweizer nDSG geregelt?',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabelle-12-prueffragen-seo-agentur',
  tableCaption: '12 Prüffragen vor der Beauftragung: Seriöse B2B-SEO-Agentur vs. Warnsignal im Angebot (Stand November 2026)',
  tablePrzypis: 'Quellen: Google Search Central „Brauche ich einen SEO-Experten?“, Vertragsmuster und Beschwerdebilder aus unserer Marktanalyse vom 25.10.2026 (polnische Marktdaten) sowie Einkaufskriterien für Unternehmen in Deutschland, Österreich und der Schweiz.',
  columns: [
    { key: 'pytanie', label: 'Prüffrage vor der Unterschrift' },
    { key: 'dobra', label: 'Seriöse B2B-SEO-Agentur' },
    { key: 'flaga', label: 'Warnsignal im Angebot' },
  ],
  rows: [
    {
      id: 'raport',
      pytanie: '1. Zeigen Sie vorab einen echten Musterbericht oder eine Live-Demo des Portals?',
      dobra: 'Anonymisierter Monatsbericht aus einem realen Kundenprojekt oder öffentliche Portal-Demo ohne Login',
      flaga: '„Unser Reporting-Dashboard sehen Sie erst nach Vertragsabschluss“',
    },
    {
      id: 'konta',
      pytanie: '2. Auf wessen Namen laufen Search Console, GA4, Tag Manager, Unternehmensprofil und Ads?',
      dobra: 'Alle Konten gehören Ihrem Unternehmen; die Agentur erhält widerrufbare Nutzerrechte',
      flaga: 'Konten werden unter einer Agentur-E-Mail oder im Agentur-Managerkonto angelegt',
    },
    {
      id: 'tresci-linki',
      pytanie: '3. Wem gehören Fachtexte und Backlinks nach Vertragsende?',
      dobra: 'Schriftliche Übertragung der Nutzungsrechte an Texten; aufgebaute Links bleiben dauerhaft bestehen',
      flaga: 'Linkmiete-Modell aus eigenen Netzwerken - Links verschwinden am Tag der Kündigung',
    },
    {
      id: 'okres',
      pytanie: '4. Wie lang sind Mindestlaufzeit, Kündigungsfrist und Verlängerung?',
      dobra: 'Monatsvertrag oder unbefristeter Vertrag mit 1 Monat Kündigungsfrist per E-Mail ohne Ausstiegsgebühr',
      flaga: '12 bis 24 Monate Bindung, 3 Monate Frist und automatische Verlängerung um ein weiteres Jahr',
    },
    {
      id: 'pomiar',
      pytanie: '5. Welche Kennzahlen berichten Sie jeden Monat?',
      dobra: 'Kundenanfragen (Formulare, Anrufe), Klicks und Impressionen aus Ihrer Search Console und GA4 neben Rankings',
      flaga: 'Ausschließlich PDF-Screenshots einzelner Keyword-Positionen aus dem Agentur-Tool',
    },
    {
      id: 'cena',
      pytanie: '6. Was kostet die Betreuung netto und welche Stückzahlen sind enthalten?',
      dobra: 'Transparenter Monatspreis vorab samt konkretem Umfang (Keywords, Fachtexte, Links, Technik-Stunden)',
      flaga: '„Individueller Preis erst nach Verkaufsgespräch“ ohne bezifferte Leistungen im Vertrag',
    },
    {
      id: 'frazy',
      pytanie: '7. Nach welchen Kriterien wählen Sie die Ziel-Keywords aus?',
      dobra: 'Suchvolumen aus dem Keyword-Planer, echte Suchanfragen Ihrer Search Console und klare Kaufintention',
      flaga: 'Eigener Markenname oder Wortkombinationen ohne Suchvolumen, die von allein auf Seite 1 stehen',
    },
    {
      id: 'gwarancja',
      pytanie: '8. Garantieren Sie Platz 1 bei Google?',
      dobra: 'Nein - stattdessen verbindlicher Arbeitsumfang, saubere Messmethode und realistische Meilensteine',
      flaga: 'Pauschale Garantie auf „Platz 1 bei Google in 30 Tagen“',
    },
    {
      id: 'kto',
      pytanie: '9. Wer arbeitet konkret an unserer Website und wer vertritt im Urlaub?',
      dobra: 'Namentlich benannter SEO-Verantwortlicher mit direktem Kontakt und dokumentierter Vertretung',
      flaga: 'Reiner Vertriebskontakt vor dem Kauf, danach anonyme Ticket-Hotline oder ständiger Wechsel',
    },
    {
      id: 'zmiany',
      pytanie: '10. Wie laufen technische und inhaltliche Freigaben auf der Website ab?',
      dobra: 'Vorab-Freigabe sichtbarer Änderungen, Backup-/Staging-Regel und lückenloses Änderungsprotokoll',
      flaga: 'Unangekündigte Eingriffe am Live-System ohne Freigabe und ohne Dokumentation',
    },
    {
      id: 'ai',
      pytanie: '11. Wie messen Sie KI-Sichtbarkeit in ChatGPT, Perplexity und AI Overviews?',
      dobra: 'Fester Fragenkatalog (z. B. 30 Kundenfragen), benannte KI-Systeme und regelmäßiger Zitat-Abgleich',
      flaga: 'Unbelegte Versprechen auf „ChatGPT-Empfehlungen“ ohne reproduzierbare Messmethode',
    },
    {
      id: 'brak-postepu',
      pytanie: '12. Was gilt ohne Fortschritt nach 3 Monaten und wie ist der Datenschutz geregelt?',
      dobra: 'Klares Meilenstein-Ziel (oder monatliches Ausstiegsrecht) plus Auftragsverarbeitung nach DSGVO bzw. nDSG',
      flaga: 'Keinerlei Ziel, kein Ausstiegsrecht und Zugriff auf Analyse-/CMS-Daten ohne AV-Vertrag',
    },
  ],
  sections: [
    {
      id: 'zwoelf-prueffragen',
      h2: '12 Due-Diligence-Fragen, bevor Sie einen SEO-Vertrag unterschreiben',
      html: [
        '<p>Transparenzhinweis: Wir veröffentlichen diesen Einkaufsleitfaden als B2B-SEO- und GEO-Agentur mit Sitz in Warschau. Deshalb bewerten wir keine einzelnen Wettbewerber beim Namen, sondern geben Ihnen einen objektiven Prüfkatalog an die Hand, an dem Sie jedes Angebot - auch unseres - messen können.</p>',
        `<p>Wenn Sie systematisch eine <strong>SEO Agentur finden</strong> und mehrere Anbieter vergleichen möchten, senden Sie allen Kandidaten dieselben zwölf Fragen vorab schriftlich zu. Eine vorbereitete Vorlage zum Ausfüllen finden Sie in unserer kostenlosen ${wew('/narzedzia/zapytanie-ofertowe-seo', 'SEO Ausschreibung Vorlage (RFP als PDF)')}.</p>`,
      ].join(''),
      tabela: 'glowna',
      htmlPo: `<p>Alle Vertragsklauseln zum Abhaken vor der Unterschrift haben wir zusätzlich in unserer kostenlosen ${wew('/narzedzia/umowa-na-pozycjonowanie', 'SEO Vertrag Checkliste (PDF-Download)')} zusammengefasst.</p>`,
    },
    {
      id: 'dach-auswahl-deutschland-oesterreich-schweiz',
      h2: 'SEO Agentur finden in Deutschland, Österreich und der Schweiz: Worauf es im DACH-Raum ankommt',
      html: [
        '<p>Wer bei Google nach Begriffen wie „SEO Agentur finden“ oder <strong>„beste SEO Agentur Schweiz“</strong>, Deutschland bzw. Österreich sucht, landet häufig auf bezahlten Agenturverzeichnissen und gekauften Award-Listen. Dort entscheidet oft das Werbebudget der gelisteten Agentur über den Listenplatz - nicht die technische Qualität der Kundenprojekte.</p>',
        '<p>Für Geschäftsführer und Marketing-Leiter in <strong>Deutschland, Österreich und der Schweiz</strong> zählen im Einkauf vier harte, nachprüfbare Kriterien:</p>',
        '<ul>',
        '<li><strong>Reporting aus eigenen Google-Konten:</strong> Bestehen Sie darauf, dass Google Search Console, Google Analytics 4 (GA4), Tag Manager und das Google Unternehmensprofil unter Ihrer eigenen Firmen-Domain laufen. Nur so sehen Sie ungefilterte Klicks, Impressionen und Anfragen in Echtzeit.</li>',
        '<li><strong>Monatliche Kündbarkeit ohne Strafgebühr:</strong> Seriöse B2B-Agenturen binden Kunden über nachweisbare Ergebnisse statt über 12- oder 24-Monats-Verträge mit dreimonatiger Kündigungsfrist.</li>',
        '<li><strong>Kein Linkmiete-Modell:</strong> Fragen Sie explizit, ob aufgebaute Backlinks aus redaktionellen Fachquellen stammen und nach Vertragsende dauerhaft bestehen bleiben. Gemietete Agentur-Linknetzwerke verstoßen gegen Googles Spam-Richtlinien und reißen bei einem Wechsel ein sofortiges Loch ins Linkprofil.</li>',
        '<li><strong>DSGVO- und Schweizer nDSG-Konformität:</strong> Sobald ein Dienstleister Zugriff auf Ihr CMS, Server-Logs, den Google Tag Manager oder GA4 erhält, regeln Unternehmen in der EU (Deutschland, Österreich) die Zusammenarbeit über einen Auftragsverarbeitungsvertrag (AVV nach Art. 28 DSGVO) und Unternehmen in der Schweiz nach dem revidierten Bundesgesetz über den Datenschutz (nDSG, Auftragsbearbeitung nach Art. 9 nDSG). Da Polen EU-Mitgliedstaat ist, unterliegt unsere Gesellschaft unmittelbar der DSGVO - und die Europäische Kommission erkennt für die Schweiz ein angemessenes Datenschutzniveau an.</li>',
        '</ul>',
      ].join(''),
      h3: [
        {
          id: 'schweiz-oesterreich-sprachvarianten',
          h3: 'Besonderheit für die Schweiz und Österreich: hreflang und Schreibweise',
          html: `<p>Betreibt Ihr Unternehmen eigene Ländershops oder Standorte für <code>.de</code>, <code>.at</code> und <code>.ch</code>, prüfen Sie im Erstgespräch, ob die Agentur saubere <code>hreflang</code>-Auszeichnungen (<code>de-DE</code>, <code>de-AT</code>, <code>de-CH</code>), Währungsauszeichnung (EUR vs. CHF) und die Schweizer Rechtschreibung ohne „ß“ beherrscht. Ob Ihre bestehenden Länder-URLs korrekt verknüpft sind, zeigt unser kostenloser ${wew('/narzedzia/sprawdz-przekierowania-hreflang', '301- und hreflang-Prüfer')}.</p>`,
        },
      ],
    },
    {
      id: 'marktdaten-17-agenturen-polen',
      h2: 'Was Agenturen vor dem Erstgespräch verschweigen: Auswertung von 17 Agenturen (polnische Marktdaten)',
      html: [
        '<p>Warum ist schriftliches Nachfragen vor Vertragsbeginn so wichtig? Wir haben am 25.10.2026 die öffentlich zugänglichen Angebotsseiten, Preislisten, AGB und Verzeichnisprofile von <strong>17 SEO-Agenturen in Polen</strong> systematisch ausgewertet.</p>',
        '<p>Wichtige Einordnung: Diese Zahlen sind ausdrücklich <strong>polnische Marktdaten</strong> (AI SEO COMPANY ist in den 17 nicht mitgezählt; wir nennen keine Agenturnamen). Sie sind nicht 1:1 repräsentativ für den DACH-Markt, machen aber sichtbar, welche Vertragsdetails in der SEO-Branche typischerweise erst im Kleingedruckten auftauchen:</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-17-agenturen-auswahl-polen',
        caption: 'Öffentlich einsehbare Angaben vor dem Verkaufsgespräch bei 17 SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten)',
        columns: [
          { key: 'cecha', label: 'Geprüftes Transparenz-Merkmal auf Website / in AGB' },
          { key: 'liczba', label: 'Anzahl von 17 Agenturen' },
        ],
        rows: [
          { id: 'cena', cecha: 'Öffentlicher Ab-Preis oder Preisspanne vor dem Erstgespräch', liczba: '12 von 17' },
          { id: 'panel', cecha: 'Eigenes Kundenportal mit Login erwähnt (öffentliche Demo ohne Login: 0)', liczba: '4 von 17' },
          { id: 'umowa', cecha: 'Kündigungsfrist offen auf der Website genannt', liczba: '6 von 17 (4x ca. 1 Monat, 2x 3 Monate)' },
          { id: 'ai', cecha: 'Eigenes Leistungsangebot für KI-Sichtbarkeit (GEO)', liczba: '13 von 17' },
        ],
        przypis: 'Quelle: eigene Auswertung öffentlich zugänglicher Angebotsseiten, Preislisten und AGB von 17 in Polen tätigen SEO-Agenturen, Stichtag 25.10.2026 (polnische Marktdaten, keine Qualitätsbewertung einzelner Firmen).',
        minWidth: 460,
      },
      htmlPo: `<p>Das Muster ist eindeutig: Fast vier von fünf Anbietern werben bereits mit KI-Sichtbarkeit, aber fast zwei Drittel legen ihre Kündigungsfrist nicht offen, und kein einziger Anbieter der Stichprobe zeigte sein Kundenportal frei zugänglich ohne Registrierung. Bei uns prüfen Sie die ${ax(PANEL_DEMO_URL, 'Live-Demo unseres Kundenportals ohne Anmeldung')} jederzeit vorab selbst (Oberfläche auf Polnisch und Englisch) und kennen alle Paketpreise unter ${wew('/cennik-pozycjonowania', 'SEO Kosten')} vor dem ersten Gespräch.</p>`,
    },
    {
      id: 'vertrag-und-wechsel',
      h2: 'Vertragsschutz, Monatsreporting und geordneter Agenturwechsel',
      html: [
        '<p>Bevor Sie unterschreiben, prüfen Sie im Vertragsentwurf insbesondere das Zusammenspiel aus Probezeit, Rechteübergang und Leistungsnachweis:</p>',
        '<ol>',
        '<li><strong>Keine versteckte Probezeit-Falle:</strong> Manche Verträge werben mit 2 bis 3 Testmonaten, gehen ohne rechtzeitiges Einschreiben aber automatisch in einen 12-Monats-Vertrag über.</li>',
        '<li><strong>Schriftlicher Rechteübergang an Inhalten:</strong> Stellen Sie vertraglich sicher, dass sämtliche erstellten Ratgeber, Landingpages und Grafiken mit Rechnungszahlung dauerhaft und uneingeschränkt von Ihrem Unternehmen genutzt und weiterbearbeitet werden dürfen.</li>',
        `<li><strong>Bericht auf Zahlenbasis statt Chart-Friedhof:</strong> Ein guter Monatsbericht beantwortet auf wenigen Seiten drei Fragen: Was wurde umgesetzt, welche Klicks und Anfragen sind in Search Console und GA4 entstanden und was folgt im nächsten Monat? Den Aufbau zeigt unsere kostenlose ${wew('/narzedzia/raport-seo', 'SEO Report Vorlage als PDF')}.</li>`,
        `<li><strong>Abrechnungsmodell bewusst wählen:</strong> Warum vermeintlich risikofreie Erfolgsverträge oft teurer enden als ein transparenter Monatsretainer, rechnen wir im Vergleich ${wew('/porownania/pozycjonowanie-za-efekt-czy-abonament', 'SEO erfolgsbasiert oder monatlicher Retainer')} vor. Ob für Ihr Vorhaben eher ein Einzelberater passt, klärt ${wew('/porownania/agencja-seo-czy-freelancer', 'SEO-Agentur, Freelancer oder Inhouse')}.</li>`,
        '</ol>',
        `<p>Stecken Sie bereits in einem laufenden Vertrag fest und möchten ohne Sichtbarkeitsverlust kündigen? Unser ${wew('/zmiana-agencji-seo', 'Leitfaden zum Wechsel der SEO-Agentur')} führt Sie mit 6 Schritten und 32 Prüfpunkten sicher durch die Übergabe.</p>`,
        '<p><em>Hinweis: Dieser Leitfaden dient der kaufmännischen und technischen Orientierung und stellt keine Rechtsberatung dar. Lassen Sie umfangreiche Verträge im Zweifel anwaltlich prüfen.</em></p>',
      ].join(''),
    },
    {
      id: 'selbsttest-google-und-ki',
      h2: 'Schnelltest in 10 Minuten: So prüfen Sie eine SEO-Agentur in Google und ChatGPT',
      html: [
        '<ul>',
        '<li><strong>Eigene organische Sichtbarkeit und Ladezeit:</strong> Prüfen Sie die Website der Agentur mit PageSpeed Insights bzw. unserem kostenlosen Core-Web-Vitals-Test. Wer schnelle Technik verkauft, sollte sie auf der eigenen Domain beherrschen.</li>',
        '<li><strong>Nachprüfbare Kundenstimmen:</strong> Achten Sie in Google Maps und auf B2B-Plattformen wie Clutch oder Sortlist auf namentlich nachvollziehbare Kundenprojekte und echte Zeitachsen aus der Google Search Console statt bloßer Prozent-Versprechen ohne Ausgangswert.</li>',
        '<li><strong>Gegenprobe in KI-Systemen:</strong> Fragen Sie ChatGPT und Perplexity nach der Agentur und prüfen Sie, welche Quellen zitiert werden. Verkauft die Agentur Generative Engine Optimization (GEO), lassen Sie sich ein echtes Muster ihres wöchentlichen KI-Monitorings zeigen.</li>',
        '</ul>',
        `<p>Denselben Schnelltest können Sie sofort für Ihre eigene Marke durchführen: Unser ${wew('/sprawdz-widocznosc-w-ai', 'kostenloser KI-Sichtbarkeit Check')} prüft live, ob ChatGPT, Gemini, Perplexity und AI Overviews Ihr Unternehmen nennen.</p>`,
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zur Auswahl einer SEO-Agentur im DACH-Raum',
  faq: [
    {
      question: 'Wie kann ich eine seriöse SEO Agentur finden, ohne auf Verkaufsfloskeln hereinzufallen?',
      answer: 'Fordern Sie vor der Unterschrift drei konkrete Nachweise an: erstens einen anonymisierten echten Monatsbericht oder eine Live-Portal-Demo, zweitens den Vertragsentwurf mit klarer Kündigungsfrist und Bestätigung Ihrer Kontenhoheit (Search Console, GA4, Unternehmensprofil), und drittens eine bezifferte Liste der monatlichen Leistungen (Technik, Inhalte, Links) samt Festpreis.',
    },
    {
      question: 'Worauf sollten Schweizer Unternehmen bei der Suche („beste SEO Agentur Schweiz“) besonders achten?',
      answer: 'Lassen Sie sich nicht von gekauften Top-10-Verzeichnissen täuschen. Entscheidend für Schweizer KMU und B2B-Firmen sind vier Punkte: volle Inhaberschaft der eigenen Google-Konten, monatliche Kündbarkeit ohne Linkmiete, saubere Beherrschung von Schweizer Hochdeutsch (ohne „ß“), CHF-Auszeichnung und de-CH-hreflang sowie eine datenschutzkonforme Auftragsbearbeitung nach dem revidierten Schweizer Datenschutzgesetz (nDSG) bzw. der DSGVO.',
    },
    {
      question: 'Kann eine SEO-Agentur Platz 1 bei Google vertraglich garantieren?',
      answer: 'Nein. Google stellt in seinem offiziellen Leitfaden für Website-Betreiber ausdrücklich klar, dass niemand eine Platz-1-Position bei Google garantieren kann. Seriöse Agenturen sichern Ihnen stattdessen einen festen Arbeitsumfang, transparente Messung in Ihrer eigenen Search Console und faire Meilenstein-Regeln zu.',
    },
    {
      question: 'Was kostet eine seriöse B2B-SEO-Agentur pro Monat?',
      answer: `In der globalen Ahrefs-Studie (439 Anbieter) lag der Durchschnitt von Agentur-Retainern bei 3.209 USD pro Monat; im deutschsprachigen Markt starten solide KMU- und B2B-Betreuungen je nach Wettbewerb meist im mittleren dreistelligen bis vierstelligen Euro-Bereich. Bei uns startet SEO Standard ab 450 € netto/Monat (bis 20 Keywords, 2 Inhalte, 2 Links) und SEO Premium liegt bei 590 € netto/Monat inkl. wöchentlichem KI-Monitoring - monatlich kündbar (${wew('/cennik-pozycjonowania', 'alle Pakete unter SEO Kosten')}).`,
    },
    {
      question: 'Welche Vertragsklauseln sind bei SEO-Agenturen besonders kritisch?',
      answer: 'Kritisch sind vor allem 12- bis 24-Monats-Laufzeiten mit automatischer Verlängerung, dreimonatige Kündigungsfristen, Aktivierungs- oder Ausstiegsgebühren, Google-Konten auf den Namen der Agentur sowie gemietete Backlinks, die nach Vertragsende gelöscht werden. Prüfen Sie jeden Vertrag vorab mit unserer kostenlosen SEO-Vertrag-Checkliste.',
    },
    {
      question: 'Sollte eine SEO-Agentur 2026 auch KI-Sichtbarkeit (ChatGPT & AI Overviews) abdecken?',
      answer: 'Ja, besonders im erklärungsbedürftigen B2B-Geschäft. In unserer Messung vom 04.11.2026 (30 SEO-Branchenkeywords, Google Polen, DataForSEO) blendete Google bei allen 30 Suchanfragen eine AI Overview ein, und Einkäufer nutzen zunehmend ChatGPT und Perplexity zur Anbieter-Vorauswahl. Fragen Sie die Agentur konkret, wie viele Kundenfragen sie in welchen KI-Systemen wie oft misst.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de', nazwa: 'Google Search Central: Brauche ich einen SEO-Experten? (Offizielle Auswahlkriterien, Kontenhoheit und Warnung vor Platz-1-Garantien), abgerufen am 22.11.2026' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de', nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (Link-Spam und gekaufte/gemietete Links), abgerufen am 22.11.2026' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO Pricing Survey (439 Anbieter weltweit, aktualisiert am 15.08.2024), abgerufen am 22.11.2026' },
    { url: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj?locale=de', nazwa: 'EUR-Lex: Verordnung (EU) 2016/679 (DSGVO), Art. 28 Auftragsverarbeiter, abgerufen am 22.11.2026' },
    { url: 'https://www.fedlex.admin.ch/eli/cc/2022/491/de', nazwa: 'Fedlex Schweizerische Eidgenossenschaft: Bundesgesetz über den Datenschutz (nDSG, SR 235.1), Art. 9 Bearbeitung durch Auftragsbearbeiter, abgerufen am 22.11.2026' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Messung von AI Overviews für 30 SEO-Branchenkeywords (Standort Polen, Desktop, 04.11.2026), abgerufen am 22.11.2026' },
  ],
  cta: {
    tekst: 'Liegt Ihnen ein SEO-Angebot vor? Wir prüfen es kostenlos anhand aller 12 Fragen',
    plan: 'przeglad-agencji',
    linki: [
      { tekst: 'SEO Vertrag Checkliste (PDF)', href: '/narzedzia/umowa-na-pozycjonowanie' },
      { tekst: 'SEO Ausschreibung Vorlage (RFP)', href: '/narzedzia/zapytanie-ofertowe-seo' },
      { tekst: 'SEO Agentur wechseln (32 Punkte)', href: '/zmiana-agencji-seo' },
    ],
  },
  about: [{ '@type': 'Thing', name: 'Auswahl einer SEO-Agentur im DACH-Raum' }],
};

// --- P1_DE: SEO erfolgsbasiert oder monatlicher Retainer ---------------------------------------

const W1 = metaDe('/porownania/pozycjonowanie-za-efekt-czy-abonament', {
  tytul: 'SEO erfolgsbasiert oder Retainer? Abrechnungs-Vergleich',
  h1: 'SEO erfolgsbasiert oder monatlicher Retainer: Was rechnet sich für B2B?',
  opis: 'SEO erfolgsbasiert (Pay per Performance) oder monatlicher Retainer? Kosten, Marken-Keyword-Fallen, Risiken und faire Alternativen für Unternehmen im Check.',
});

const P1_DE = {
  slug: 'pozycjonowanie-za-efekt-czy-abonament',
  title: W1.tytul,
  description: W1.opis,
  h1: W1.h1,
  okruszek: 'SEO erfolgsbasiert oder Retainer',
  nazwaKarty: 'SEO erfolgsbasiert oder monatlicher Retainer',
  kryteria: '10 Kriterien',
  tag: 'Vergleich der SEO-Abrechnungsmodelle',
  zrodlaDanych: 'Daten: Google Search Central (SEO-Auswahl & Link-Spam-Richtlinien), Ahrefs SEO Pricing Survey (439 Anbieter), unsere Auswertung von 17 SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten) sowie unsere Euro-Preisliste (Stand 22.11.2026).',
  answer: 'Für nahezu alle B2B- und Mittelstandsunternehmen ist ein monatlich kündbarer Retainer (oder ein Retainer mit klarem Meilenstein-Ziel) wirtschaftlicher und sicherer als „SEO erfolgsbasiert“. Bei reiner Bezahlung nach Platzierung zahlen Sie für ausgewählte Keyword-Positionen statt für echte Kundenanfragen, riskieren Null-Volumen-Keywords oder kurzfristige Spam-Links und zahlen bei Erfolg oft deutlich mehr als im festen Monatspaket.',
  published: '2026-11-22',
  updated: '2026-11-22',
  tableId: 'tabelle-seo-abrechnungsmodelle-10-kriterien',
  tableCaption: 'SEO erfolgsbasiert (Pay per Performance), monatlicher Retainer und Stundenkontingent / Hybrid im Vergleich: 10 Kriterien (November 2026)',
  tablePrzypis: 'Quellen: eigene Auswertung von Preislisten und AGB von 17 SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten), Ahrefs SEO Pricing Survey (439 Anbieter weltweit), Google Search Central sowie unsere Euro-Paketpreise (Stand 22.11.2026).',
  columns: [
    { key: 'kryterium', label: 'Kriterium' },
    { key: 'efekt', label: 'SEO erfolgsbasiert (Pay per Performance)' },
    { key: 'abonament', label: 'Monatlicher Retainer (Festpreis)' },
    { key: 'stunden', label: 'Stundenkontingent / Hybrid-Modell' },
  ],
  rows: [
    {
      id: 'gegenstand',
      kryterium: 'Wofür Sie bezahlen',
      efekt: 'Tage oder Monatsstichtag mit Vertrags-Keywords in den Top 10 (seltener Klicks/Leads), meist zusätzlich zu einer Grundgebühr',
      abonament: 'Fest vereinbarter monatlicher Leistungsumfang: Audit, Technik, Fachtexte, Linkaufbau und Google Unternehmensprofil',
      stunden: 'Abgerufene Beratungs-/Entwicklerstunden nach Stundensatz oder fester Sockelbetrag plus gedeckelte Zielprämie',
    },
    {
      id: 'keyword-auswahl',
      kryterium: 'Wer die Keywords auswählt',
      efekt: 'Oft schlägt der Anbieter die Liste vor - hohes Risiko von Markenbegriffen oder Wortkombinationen ohne Suchvolumen',
      abonament: 'Gemeinsame Auswahl nach Suchvolumen, Search-Console-Daten und Marge; jederzeit im Projektverlauf anpassbar',
      stunden: 'Flexibel je Sprint (Stundenkontingent) bzw. fest definiertes Kernset für den variablen Zielanteil',
    },
    {
      id: 'kosten-wachstum',
      kryterium: 'Kostenverlauf bei steigenden Rankings',
      efekt: 'Rechnung steigt mit jedem Keyword auf Seite 1 - ohne vertragliche Obergrenze oft weit über einen Retainer hinaus',
      abonament: 'Konstant planbarer Monatsbetrag in Euro (z. B. 450 € netto in SEO Standard, 590 € netto in SEO Premium)',
      stunden: 'Planbar über das vereinbarte Stundenbudget bzw. vertragliche Prämien-Obergrenze',
    },
    {
      id: 'anlaufrisiko',
      kryterium: 'Kostenrisiko in den ersten Monaten',
      efekt: 'Niedriger Einstieg ohne Rankings, meist fällt aber dennoch eine Einrichtungs- oder Sockelgebühr an',
      abonament: 'Voller Monatspreis ab Start - das Risiko sinkt durch monatliche Kündbarkeit und transparentes Arbeitsprotokoll',
      stunden: 'Vergütung nach geleisteter Zeit; externe Content- und Linkkosten kommen bei reiner Beratung oft separat hinzu',
    },
    {
      id: 'umfang',
      kryterium: 'Technischer & inhaltlicher Fokus',
      efekt: 'Eng begrenzt auf wenige Vertrags-Keywords; Core Web Vitals, Seitenarchitektur und Conversion bleiben oft unbeachtet',
      abonament: 'Ganzheitliche Entwicklung der gesamten Domain: Technik, Leistungsseiten, Ratgeber, lokale Sichtbarkeit und Links',
      stunden: 'Ideal für klar abgegrenzte Technik-Tickets, Audits oder Relaunch-Begleitung eines internen Teams',
    },
    {
      id: 'messung',
      kryterium: 'Messgrundlage & Nachprüfbarkeit',
      efekt: 'Meist Drittanbieter-Rank-Tracker der Agentur an einem Stichtag; stark abhängig von gemessenem Ort und Gerät',
      abonament: 'Echte Erstparteien-Daten aus Ihrer eigenen Google Search Console und Konversionen (Anfragen/Anrufe) in GA4',
      stunden: 'Stundennachweis je Aufgabe kombiniert mit Kennzahlen aus Ihrer eigenen Search Console und GA4',
    },
    {
      id: 'link-risiko',
      kryterium: 'Linkaufbau-Qualität & Google-Risiko',
      efekt: 'Starker Fehlanreiz für billige Mietlinks und PBN-Netzwerke, um schnell Prämien auszulösen (Verstoß gegen Google-Richtlinien)',
      abonament: 'Nachhaltiger White-Hat-Linkaufbau und Fachbeiträge, die auch nach Vertragsende dauerhaft bestehen bleiben',
      stunden: 'Kein Fehlanreiz bei Beratung, Linkaufbau muss jedoch separat budgetiert und gesteuert werden',
    },
    {
      id: 'vertragslaufzeit',
      kryterium: 'Typische Vertragslaufzeit',
      efekt: 'Häufig 12 bis 24 Monate Mindestbindung, damit der Anbieter seine Vorfinanzierung über spätere Prämien einspielt',
      abonament: 'Am Markt 1 bis 24 Monate; bei uns flexibler Monatsvertrag ohne Ausstiegsgebühr (Booster Pack: mind. 3 Monate)',
      stunden: 'Stundenkontingente meist monatlich flexibel; Hybridmodelle je nach Vereinbarung',
    },
    {
      id: 'ki-suche',
      kryterium: 'KI-Sichtbarkeit (ChatGPT, Perplexity, AI Overviews)',
      efekt: 'Praktisch nie enthalten, da ausschließlich klassische Top-10-Positionen vergütet werden',
      abonament: 'Direkt integrierbar (bei uns in SEO Premium inklusive oder +115 € netto/Monat zu SEO Standard)',
      stunden: 'Als separates Analyse- oder Umsetzungsprojekt beauftragbar',
    },
    {
      id: 'eignung',
      kryterium: 'Für wen wirtschaftlich geeignet?',
      efekt: 'Allenfalls kleine lokale Nischen mit 5 bis 10 exakt geprüften Keywords, hartem Kostendeckel und voller Kontenhoheit',
      abonament: 'KMU und B2B-Unternehmen, die planbar qualifizierte Kundenanfragen über Google und KI-Systeme aufbauen wollen',
      stunden: 'Unternehmen mit eigenem Entwickler-/Content-Team (Stundenpaket) oder Wunsch nach Retainer mit Zielvereinbarung',
    },
  ],
  sections: [
    {
      id: 'drei-abrechnungsmodelle',
      h2: 'SEO erfolgsbasiert, monatlicher Retainer oder Stundenkontingent: Wo liegt der Unterschied?',
      html: [
        '<p>Transparenzhinweis: Wir arbeiten selbst im monatlich kündbaren Retainer-Modell mit vertraglichem Meilenstein-Ziel und benennen deshalb offen unser eigenes Geschäftsinteresse. Gleichzeitig zeigen wir präzise, wann ein Stundenkontingent oder ein streng begrenzter Erfolgsanteil sinnvoll sein kann.</p>',
        '<p>Wenn Unternehmen nach <strong>„SEO erfolgsbasiert“</strong> (oft auch <em>Pay-per-Performance SEO</em> oder <em>Bezahlung nach Platzierung</em>) suchen, steckt dahinter ein verständlicher Wunsch: nicht monatelang für schöne PDF-Berichte ohne Kundenanfragen zu bezahlen. Im Markt begegnen Ihnen drei Grundmodelle:</p>',
        '<ul>',
        '<li><strong>Erfolgsbasiertes SEO (Pay per Rank / Pay per Lead):</strong> Die Vergütung hängt davon ab, ob vertraglich fixierte Keywords an einem Stichtag oder tageweise in den Top 10 stehen - fast immer kombiniert mit einer Grund- oder Einrichtungsgebühr.</li>',
        '<li><strong>Monatlicher Retainer (Festpreis-Paket):</strong> Sie zahlen einen festen Euro-Betrag pro Monat für klar bezifferte Arbeit an Technik, Core Web Vitals, Fachtexten, Backlinks, Google Unternehmensprofil und KI-Sichtbarkeit.</li>',
        '<li><strong>Stundenkontingent oder Hybrid-Modell:</strong> Entweder kaufen Sie ein festes Kontingent an SEO-Beratungsstunden (laut Ahrefs-Studie weltweit Ø 98,90 USD/Stunde bei Agenturen) oder Sie kombinieren einen fairen Retainer mit einem überprüfbaren Meilenstein-Ziel.</li>',
        '</ul>',
      ].join(''),
      tabela: 'glowna',
    },
    {
      id: 'warum-bezahlung-nach-platzierung-gefaehrlich-ist',
      h2: 'Warum „Bezahlung nach Platzierung“ oft Null-Volumen-Keywords und riskante Spam-Links fördert',
      html: [
        '<p>Auf dem Papier klingt „Sie zahlen erst bei Seite 1“ risikolos. In der technischen Praxis erzeugt reine Positionsabrechnung jedoch drei gravierende Fehlanreize auf Kosten Ihrer Domain:</p>',
        '<ol>',
        '<li><strong>Marken- und Null-Volumen-Keywords:</strong> Schlägt der Anbieter 20 oder 30 Vertragsbegriffe vor, landen darunter häufig Kombinationen mit Ihrem eigenen Firmennamen, Stadtteil-Zusätzen oder extrem langen Wortketten, nach denen laut Google Keyword-Planer kein einziger Einkäufer sucht. Solche Begriffe erreichen die Top 10 binnen weniger Wochen fast von allein - die Erfolgsprämie wird fällig, Ihr Telefon bleibt jedoch still.</li>',
        '<li><strong>Kurzfristige Miet- und Spam-Links:</strong> Muss eine Agentur mehrere Monate Arbeit vorfinanzieren, greift sie unter Kostendruck selten zu aufwendiger Fachredaktion und Digital PR. Stattdessen kommen oft eigene Linknetzwerke (PBNs) oder gemietete Katalog- und Footer-Links ohne <code>rel="sponsored"</code> zum Einsatz. Das verstößt gegen Googles Spam-Richtlinien: Im besten Fall entwertet Google die Links beim nächsten Spam-Update, im schlechtesten Fall droht eine manuelle Abstrafung - und bei Vertragsende schaltet der Anbieter die Mietlinks ab.</li>',
        `<li><strong>Stichtags-Messung und AI Overviews:</strong> Platz 9 auf Seite 1 am letzten Werktag des Monats zählt im Erfolgsvertrag oft als voller Treffer, liefert im B2B aber kaum Besucher. Zudem zeigte Google in unserer Messung vom 04.11.2026 (30 SEO-Branchenkeywords, Standort Polen, Desktop, DataForSEO) bei allen 30 Suchanfragen eine KI-Übersicht (AI Overview). Wer nur für klassische Positionen bezahlt, geht in ${wew('/porownania/seo-vs-geo', 'ChatGPT, Perplexity und AI Overviews (GEO)')} leer aus.</li>`,
        '</ol>',
      ].join(''),
    },
    {
      id: 'kostenrechnung-eur',
      h2: 'Kostenrechnung in Euro: 450 € / 590 € Retainer gegen versteckte Erfolgsprämien',
      html: [
        '<p>Rechnen Sie jedes erfolgsbasierte Angebot vor der Unterschrift mit der einfachen Formel <strong>Monatskosten = Grundgebühr S + (Anzahl rankender Keywords n × Prämie s)</strong> bis zum Erfolgsfall durch. Viele Entscheider prüfen nur Monat 1, nicht aber Monat 6 bis 24:</p>',
        '<ul>',
        '<li><strong>Reines Positionsmodell (Rechenbeispiel):</strong> 0 € Grundgebühr, aber 45 € netto pro Monat je Keyword auf Seite 1 (Mindestabnahme 15 bis 20 Keywords, 12 Monate Bindung).</li>',
        '<li><strong>Hybridmodell mit Erfolgsprämie (Rechenbeispiel):</strong> 250 € netto monatliche Grundgebühr plus 35 € netto je Top-10-Keyword und Monat ohne niedrige Deckelung.</li>',
        `<li><strong>Unsere festen Euro-Retainer zum Vergleich:</strong> <strong>SEO Standard (450 € netto/Monat)</strong> umfasst bis zu 20 Keywords (rechnerisch 22,50 € netto je Keyword), 2 Fachtexte, 2 Links, Technik und Unternehmensprofil; <strong>SEO Premium (590 € netto/Monat)</strong> deckt bis zu 50 Keywords (rechnerisch 11,80 € netto je Keyword), 4 Inhalte, 4 Links und wöchentliches KI-Monitoring ab - ohne einen Cent Aufpreis, wenn alle Keywords in den Top 3 stehen.</li>`,
        '</ul>',
      ].join(''),
      tabela: {
        id: 'tabelle-kostenrechnung-eur-20-keywords',
        caption: 'Modellrechnung für 20 vereinbarte Keywords: Monatliche Nettokosten in Euro nach Anzahl der Keywords auf Seite 1',
        columns: [
          { key: 'n', label: 'Keywords auf Seite 1 (n)' },
          { key: 'rein', label: 'Erfolgsmodell: 0 € + 45 €/Keyword (Beispiel)' },
          { key: 'hybrid', label: 'Sockel + Prämie: 250 € + 35 €/Keyword (Beispiel)' },
          { key: 'standard', label: 'Retainer SEO Standard (AI SEO COMPANY, fest)' },
          { key: 'premium', label: 'Retainer SEO Premium inkl. GEO (fest)' },
        ],
        rows: [
          { id: 'n-0', n: '0 Keywords (Startmonat)', rein: '0 €', hybrid: '250 €', standard: '450 €', premium: '590 €' },
          { id: 'n-4', n: '4 Keywords', rein: '180 €', hybrid: '390 €', standard: '450 €', premium: '590 €' },
          { id: 'n-8', n: '8 Keywords', rein: '360 €', hybrid: '530 €', standard: '450 €', premium: '590 €' },
          { id: 'n-12', n: '12 Keywords', rein: '540 €', hybrid: '670 €', standard: '450 €', premium: '590 €' },
          { id: 'n-16', n: '16 Keywords', rein: '720 €', hybrid: '810 €', standard: '450 €', premium: '590 €' },
          { id: 'n-20', n: '20 Keywords', rein: '900 €', hybrid: '950 €', standard: '450 €', premium: '590 €' },
        ],
        przypis: 'Hinweis: Die Spalten „0 € + 45 €“ und „250 € + 35 €“ sind transparente Rechenbeispiele zur Break-even-Prüfung. Unsere Paketpreise (450 € bzw. 590 € netto/Monat, Stand 22.11.2026) sind feste Endpreise ohne Erfolgsaufschlag.',
        minWidth: 620,
      },
      h3: [
        {
          id: 'break-even-schwelle',
          h3: 'Ab welchem Punkt kippt die Rechnung gegen das Erfolgsmodell?',
          html: `<p>Im Hybrid-Beispiel (250 € + 35 € je Keyword) zahlen Sie bereits ab dem <strong>6. Keyword auf Seite 1 (460 € netto)</strong> jeden Monat mehr als in unserem Komplettpaket SEO Standard (450 € netto) - und bei 20 Keywords mehr als das Doppelte (950 € vs. 450 €), obwohl der Erfolgsanbieter weiter nur die 20 Vertragsbegriffe pflegt. Dasselbe Muster zeigte sich in einem realen Google-Angebot auf dem polnischen Markt vom 05.11.2026 (polnische Marktdaten: 99 bzw. 149 PLN netto je Top-10-Keyword gegenüber 499 PLN Pauschalpaket desselben Anbieters - schon ab 4 bzw. 6 Keywords war das Erfolgsmodell teurer). Wie sich organischer Traffic kaufmännisch für Ihre Marge rechnet, kalkulieren Sie mit unserem kostenlosen ${wew('/narzedzia/kalkulator-strat-seo', 'SEO-Rechner und ROI-Rechner in Euro')}.</p>`,
        },
      ],
    },
    {
      id: 'marktdaten-17-agenturen-abrechnung',
      h2: 'Wie verbreitet ist erfolgsbasiertes SEO tatsächlich? Einblick in 17 Agenturen (polnische Marktdaten)',
      html: [
        '<p>In unserer Marktstudie vom 25.10.2026 haben wir die veröffentlichten Preismodelle und Allgemeinen Geschäftsbedingungen von <strong>17 SEO-Agenturen in Polen</strong> untersucht (ausdrücklich <strong>polnische Marktdaten</strong>; AI SEO COMPANY ist nicht unter den 17 gezählt):</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-17-agenturen-abrechnung-polen',
        caption: 'Abrechnungsmodelle von 17 untersuchten SEO-Agenturen in Polen (Stand 25.10.2026 - polnische Marktdaten)',
        columns: [
          { key: 'merkmal', label: 'Veröffentlichtes Abrechnungs- und Vertragsmerkmal' },
          { key: 'anzahl', label: 'Anzahl von 17 Agenturen' },
        ],
        rows: [
          { id: 'ohne-erfolg', merkmal: 'Reiner Retainer, Stundenkontingent oder Projektpreis ohne Erfolgsprovision', anzahl: '11 von 17' },
          { id: 'mit-erfolg', merkmal: 'Teil der Vergütung erfolgsabhängig (davon 4 ausdrücklich Grundgebühr + Erfolgsanteil)', anzahl: '5 von 17' },
          { id: 'keine-angabe', merkmal: 'Kein Abrechnungsmodell öffentlich genannt', anzahl: '1 von 17' },
          { id: 'kritik', merkmal: 'Lehnen reine Abrechnung nach Keyword-Positionen öffentlich ab', anzahl: 'mindestens 6 von 17' },
          { id: 'frist', merkmal: 'Veröffentlichen ihre Kündigungsfrist offen auf der Website', anzahl: '6 von 17 (4x ca. 1 Monat, 2x 3 Monate)' },
        ],
        przypis: 'Quelle: eigene Auswertung von Angebotsseiten, Preislisten und AGB von 17 SEO-Agenturen in Polen, Stichtag 25.10.2026 (polnische Marktdaten).',
        minWidth: 460,
      },
      htmlPo: '<p>Selbst unter den fünf Anbietern mit Erfolgsanteil arbeiteten vier beschriebene Modelle mit einer festen monatlichen Grundgebühr - ein reines „0 € bis Seite 1“-Versprechen ohne Fixkosten und ohne Mindestlaufzeit bildet am professionellen Markt die absolute Ausnahme.</p>',
    },
    {
      id: 'faire-alternative-ziel-top-3',
      h2: 'Die faire B2B-Alternative: Monatlich kündbarer Retainer mit klarem Ziel',
      html: [
        '<p>Wie verbinden Sie Kostenkontrolle für Ihre Geschäftsführung mit sauberer technischer Arbeit ohne Spam-Risiko? Statt riskanter Prämien pro Keyword setzen wir auf zwei Schutzmechanismen zugunsten des Auftraggebers:</p>',
        '<ul>',
        '<li><strong>Monatliche Kündbarkeit statt Knebelvertrag:</strong> SEO Standard (ab 450 € netto/Monat) und SEO Premium (590 € netto/Monat) laufen als Monatsvertrag, kündbar per E-Mail ohne Ausstiegsgebühr (einzige Ausnahme ist das Booster Pack inklusive neuer Next.js-Website mit mindestens 3 Monaten Laufzeit). Liefert unsere Arbeit keinen spürbaren Fortschritt, müssen Sie kein Jahr abwarten.</li>',
        `<li><strong>Vertragliches Ziel Top 3 für vereinbarte lokale Keywords:</strong> Wir legen relevante lokale Suchbegriffe gemeinsam fest und messen sie transparent in Ihrer eigenen Google Search Console sowie in Google Maps. Erreichen wir das vereinbarte Top-3-Ziel nach 3 Monaten nicht, arbeiten wir den Folgemonat für 0 € weiter (keine Platz-1-Garantie; Ausnahmen gelten u. a. bei frischen Domains ohne Historie, manuellen Google-Maßnahmen oder fremden Eingriffen - alle Details unter ${wew('/cennik-pozycjonowania', 'Ziel Top 3 auf unserer Kostenseite', '#ziel-top-3')}).</li>`,
        '</ul>',
        `<p>Wenn Sie einen vorliegenden Erfolgs- oder Retainer-Vertrag prüfen möchten, nutzen Sie unsere kostenlose ${wew('/narzedzia/umowa-na-pozycjonowanie', 'SEO Vertrag Checkliste als PDF')}, unseren Vergleich ${wew('/porownania/jak-wybrac-agencje-seo', 'SEO Agentur finden: 12 Fragen vor Vertrag')} oder - falls Sie aus einem Altvertrag aussteigen wollen - unseren Leitfaden ${wew('/zmiana-agencji-seo', 'SEO Agentur wechseln')}.</p>`,
        '<p><em>Hinweis: Diese Übersicht ersetzt keine Rechtsberatung. Lassen Sie Verträge mit hohen Mindestlaufzeiten oder ungedeckelten Erfolgsprämien im Zweifel juristisch prüfen.</em></p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu erfolgsbasiertem SEO und Retainer-Modellen',
  faq: [
    {
      question: 'Lohnt sich „SEO erfolgsbasiert“ für B2B-Unternehmen?',
      answer: 'In den allermeisten B2B-Märkten nein. B2B-Kaufprozesse laufen über Dutzende Fach-, Problem- und Vergleichsbegriffe sowie zunehmend über KI-Antworten in ChatGPT und AI Overviews. Ein Erfolgsvertrag verengt die Arbeit auf wenige Einzel-Keywords, birgt das Risiko von Null-Volumen-Begriffen oder Mietlinks und wird bei guten Rankings ohne niedrigen Kostendeckel schnell teurer als ein fester Retainer.',
    },
    {
      question: 'Woran erkenne ich Marken- oder Null-Volumen-Keywords in einem Erfolgsvertrag?',
      answer: 'Prüfen Sie jedes vorgeschlagene Vertrags-Keyword vor der Unterschrift in zwei Quellen: erstens im Google Ads Keyword-Planer auf reales monatliches Suchvolumen im Zielmarkt (DE, AT oder CH) und zweitens im Leistungsbericht Ihrer eigenen Google Search Console. Enthält ein Begriff Ihren Firmennamen oder hat er null Suchanfragen, gehört er niemals in eine Erfolgsabrechnung.',
    },
    {
      question: 'Warum sind gemietete Links bei Pay-per-Performance-SEO ein Sicherheitsrisiko?',
      answer: 'Um schnell abrechenbare Top-10-Plätze zu erzeugen, greifen manche Erfolgsanbieter auf eigene Blog-Netzwerke (PBNs) oder gemietete Links zurück. Gekaufte oder gemietete Links zur Manipulation des PageRanks verstoßen direkt gegen Googles Spam-Richtlinien. Endet der Vertrag, werden diese Links entfernt und Ihre Sichtbarkeit bricht schlagartig ein.',
    },
    {
      question: 'Was kostet ein fairer SEO-Retainer im Vergleich zum Stundenkontingent?',
      answer: `In der weltweiten Ahrefs-Befragung (439 Anbieter) berechneten SEO-Agenturen im Schnitt 98,90 USD pro Stunde bzw. 3.209 USD im Monatsretainer. Bei uns erhalten Sie feste Komplettpakete inklusive Umsetzung, Texten, Links und Profi-Tools: SEO Standard startet ab 450 € netto/Monat (bis 20 Keywords) und SEO Premium kostet 590 € netto/Monat (bis 50 Keywords inkl. wöchentlichem KI-Monitoring) - Details unter ${wew('/cennik-pozycjonowania', 'SEO Kosten')}.`,
    },
    {
      question: 'Welche 5 Klauseln sind Pflicht, falls ich dennoch einen Vertrag mit Erfolgsanteil unterschreibe?',
      answer: 'Bestehen Sie schriftlich auf fünf Schutzpunkten: 1. einer festen monatlichen Kostenobergrenze (Cap), 2. Messung über Ihre eigene Google Search Console statt über Screenshots fremder Tools, 3. Ausschluss aller Marken- und Null-Volumen-Keywords, 4. Verbot von Mietlinks samt dauerhaftem Eigentum an allen Inhalten und 5. einem ordentlichen Kündigungsrecht ohne Strafgebühren.',
    },
    {
      question: 'Berücksichtigt erfolgsbasiertes SEO auch ChatGPT, Perplexity und Google AI Overviews?',
      answer: 'Nahezu nie, weil das Abrechnungsmodell nur klassische organische Positionen zählt. Da AI Overviews und KI-Antworten heute einen wachsenden Teil der B2B-Recherchen abfangen und zu rund drei Vierteln auch Quellen außerhalb der klassischen Top 10 zitieren können, sollte KI-Sichtbarkeit als fester Bestandteil eines Retainers auf einem konstanten Fragenkatalog gemessen werden.',
    },
  ],
  sources: [
    { url: 'https://developers.google.com/search/docs/fundamentals/do-i-need-seo?hl=de', nazwa: 'Google Search Central: Brauche ich einen SEO-Experten? (Hinweise zu Garantien, Leistungsumfang und Verantwortung), abgerufen am 22.11.2026' },
    { url: 'https://developers.google.com/search/docs/essentials/spam-policies?hl=de', nazwa: 'Google Search Central: Spam-Richtlinien für die Google Websuche (Link-Spam, Kauf- und Mietlinks), abgerufen am 22.11.2026' },
    { url: 'https://ahrefs.com/blog/seo-pricing/', nazwa: 'Ahrefs: SEO Pricing Survey (Stundensätze und Retainer von 439 Anbietern weltweit, Stand 15.08.2024), abgerufen am 22.11.2026' },
    { url: 'https://ads.google.com/intl/de_de/home/tools/keyword-planner/', nazwa: 'Google Ads: Keyword-Planer zur Prüfung des realen Suchvolumens von Vertrags-Keywords, abgerufen am 22.11.2026' },
    { url: 'https://dataforseo.com/apis/serp-api', nazwa: 'DataForSEO SERP API: Google-Ergebnisse und AI-Overview-Messung für 30 SEO-Branchenkeywords (Polen, Desktop, 04.11.2026), abgerufen am 22.11.2026' },
  ],
  cta: {
    tekst: 'Erfolgsvertrag oder Retainer-Angebot vorliegen? Wir prüfen Kosten und Klauseln kostenfrei',
    plan: 'przeglad-agencji',
    linki: [
      { tekst: 'SEO Kosten & Pakete ab 450 € netto', href: '/cennik-pozycjonowania' },
      { tekst: 'SEO Vertrag Checkliste (PDF)', href: '/narzedzia/umowa-na-pozycjonowanie' },
      { tekst: 'SEO Agentur wechseln (Leitfaden)', href: '/zmiana-agencji-seo' },
    ],
  },
  about: [
    { '@type': 'Thing', name: 'Erfolgsbasiertes SEO (Pay per Performance)' },
    { '@type': 'Thing', name: 'SEO-Retainer' },
  ],
};

export const POROWNANIA_DE = [
  P2_DE,
  P3_DE,
  P4_DE,
  P6_DE,
  P1_DE,
  P10_NEXT_WP_DE,
  P11_WEBFLOW_WP_DE,
  P12_KOD_KREATOR_DE,
  ...POROWNANIA_SPRINT2_DE,
  ...POROWNANIA_FALA2_DE,
];

export {
  P1_DE,
  P2_DE,
  P3_DE,
  P4_DE,
  P6_DE,
  P10_NEXT_WP_DE,
  P11_WEBFLOW_WP_DE,
  P12_KOD_KREATOR_DE,
};

/** Deutsche Vergleichsseite nach polnischem Routing-Slug (10 Vergleiche) oder null. */
export function porownanieDeBySlug(slug) {
  return POROWNANIA_DE.find((p) => p.slug === slug) || null;
}
