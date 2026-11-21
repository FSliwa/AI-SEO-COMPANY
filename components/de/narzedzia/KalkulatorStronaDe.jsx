// Deutsche Werkzeugseite /de/tools/seo-verlustrechner (Gruppe de-narzedzia / DACH BOFU).
// Serverkomponente analog zu AudytSeoStronaDe.jsx und KalkulatorStrona.jsx, aber vollständig in Euro (EUR)
// und auf den DACH-Suchmarkt ausgerichtet (Ziel-Keywords: seo rechner, seo roi rechner, seo verlustrechner).
// Alle Rechenbeispiele im Text werden live über policzStraty / policzZwrot berechnet, damit keine Zahl veraltet.

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { homeHash } from '@/lib/anchors';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { AUDYT, CENY, GENERATOR } from '@/lib/narzedziaLiczby';
import { ZALOZENIA, ZRODLA_KALKULATORA, ZWROT, policzStraty, policzZwrot } from '@/lib/kalkulatorStrat';
import { BEISPIELE_DE, KOSZT_WLASNY_EUR } from '@/lib/kalkulatorStrat.de';
import { eur, liczba } from '@/lib/formatDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { UkladDe, WeitereToolsDe } from './UkladDe';
import KalkulatorClientDe, { BeispielEinsetzenDe } from './KalkulatorClientDe';

const KLUCZ = '/narzedzia/kalkulator-strat-seo';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

// --- Live berechnete Modellzahlen (nichts von Hand eintragen) ---------------------------------------
const proc = (x) => Math.round(x * 100);
const ctrDe = (x) => (Math.round(x * 1000) / 10).toLocaleString('de-DE');
const e = (n) => eur(Math.round(n), 'de');
const nDe = (n) => liczba(n, 'de', 0);
const dziesDe = (n) => new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(Number(n));
const zZnakiem = (n) => (n > 0 ? `+${e(n)}` : n < 0 ? `−${e(-n)}` : e(0));

const AI_MIN = proc(ZALOZENIA.ai.ctr.ostrozny);
const AI_MAX = proc(ZALOZENIA.ai.ctr.optymistyczny);

const HW = BEISPIELE_DE.handwerk;
const handwerk = policzStraty(HW);
const handwerkZwrot = policzZwrot(handwerk, CENY.seoStandard.eur, HW.miesiace);

const B2B = BEISPIELE_DE.b2b;
const b2b = policzStraty(B2B);
const b2bZwrot = policzZwrot(b2b, CENY.seoPremium.eur, B2B.miesiace);

const SH = BEISPIELE_DE.shop;
const shop = policzStraty(SH);
const shopBezPowrotow = policzStraty({ ...SH, powroty: undefined });
const shopZwrot = policzZwrot(shop, CENY.seoStandard.eur, SH.miesiace);

function amortisationText(z) {
  const { min, max } = z;
  if (max.miesiacZwrotu === null) return `amortisiert sich das Budget nicht innerhalb von ${z.horyzont} Monaten`;
  if (min.miesiacZwrotu === null) return `amortisiert sich das Budget im ${max.miesiacZwrotu}. Monat in der optimistischen Variante (in der vorsichtigen nicht innerhalb von ${z.horyzont} Monaten)`;
  if (min.miesiacZwrotu === max.miesiacZwrotu) return `amortisiert sich das Budget im ${max.miesiacZwrotu}. Monat`;
  return `amortisiert sich das Budget zwischen dem ${max.miesiacZwrotu}. und dem ${min.miesiacZwrotu}. Monat`;
}

// Deutsche Quellenliste: gleiche Primärstudien wie ZRODLA_KALKULATORA plus die klassische SISTRIX-CTR-Studie als DACH-Referenz.
const ZRODLA_DE = [
  {
    url: ZRODLA_KALKULATORA[0].url,
    nazwa: 'First Page Sage: Google Click-Through Rates (CTRs) by Ranking Position (Bericht vom 22.09.2026, USA): Plätze 1/2/3 ohne KI-Antwort 22,6 / 10,2 / 5,8 %, Gesamtschnitt 7,1 / 3,0 / 1,7 %, mit KI-Antwort 3,6 / 1,4 / 0,8 % (Englisch)',
    data: ZRODLA_KALKULATORA[0].data,
  },
  {
    url: 'https://www.sistrix.de/news/warum-fast-alles-was-du-ueber-google-ctr-wusstest-nicht-mehr-stimmt/',
    nazwa: 'SISTRIX: Warum fast alles, was du über Google-CTR wusstest, nicht mehr stimmt (über 80 Mio. Keywords, klassische mobile Klickraten vor AI Overviews: Platz 1 28,5 %, Platz 2 15,7 %, Platz 3 11,0 %)',
    data: '2026-11-20',
  },
  {
    url: ZRODLA_KALKULATORA[1].url,
    nazwa: 'GrowthSRC Media Studie (über 200.000 Keywords): Rückgang der CTR auf Platz 1 von 28 % auf 19 % und auf Platz 2 von 20,8 % auf 12,6 % zwischen 2024 und 2025 (Englisch)',
    data: ZRODLA_KALKULATORA[1].data,
  },
  {
    url: ZRODLA_KALKULATORA[2].url,
    nazwa: 'Pew Research Center (März 2025, veröffentlicht Juli 2025): Bei Google-Suchen mit KI-Zusammenfassung klicken Nutzer in 8 % der Besuche auf ein Suchergebnis, ohne sie in 15 %, und auf einen Link in der KI-Zusammenfassung selbst in 1 % der Besuche; KI-Übersichten erschienen bei 18 % der Suchen (Englisch)',
    data: ZRODLA_KALKULATORA[2].data,
  },
  {
    url: ZRODLA_KALKULATORA[3].url,
    nazwa: 'Gartner (Februar 2024): Prognose eines Rückgangs des klassischen Suchmaschinenvolumens um 25 % bis 2026 durch KI-Chatbots (Prognose, Eintritt von uns nicht geprüft, Englisch)',
    data: ZRODLA_KALKULATORA[3].data,
  },
  {
    url: ZRODLA_KALKULATORA[4].url,
    nazwa: 'iPullRank auf Basis von Similarweb-Daten (über 100.000 Nutzer, Mai bis August 2025): Weniger als rund 3 % der Suchen im Google AI Mode enden mit einem Klick auf eine externe Website (Englisch)',
    data: ZRODLA_KALKULATORA[4].data,
  },
  {
    url: ZRODLA_KALKULATORA[5].url,
    nazwa: 'SOCi, Local Visibility Index 2026 (über 350.000 Standorte, 2.751 Marken): ChatGPT empfiehlt 1,2 % der Unternehmensstandorte, Google zeigt 35,9 % im Local Pack (Englisch)',
    data: ZRODLA_KALKULATORA[5].data,
  },
  {
    url: ZRODLA_KALKULATORA[6].url,
    nazwa: 'TechCrunch auf Basis von Similarweb (Juni 2025): KI-Plattformen sendeten 1,13 Mrd. Besuche an die 1.000 größten Websites weltweit, die Google-Suche 191 Mrd. (Englisch)',
    data: ZRODLA_KALKULATORA[6].data,
  },
  {
    url: ZRODLA_KALKULATORA[7].url,
    nazwa: 'Conductor, AEO/GEO Benchmarks 2026 (1.215 Unternehmensdomains, 3,3 Mrd. Sitzungen, USA, Mai bis September 2025): KI-Assistenten liefern 1,08 % des Website-Traffics, davon 87,4 % aus ChatGPT (Englisch)',
    data: ZRODLA_KALKULATORA[7].data,
  },
  {
    url: ZRODLA_KALKULATORA[8].url,
    nazwa: 'Ahrefs, Patrick Stox (Mai 2025): Nur 1,74 % neu veröffentlichter Seiten erreichen innerhalb eines Jahres die Google Top 10; 72,9 % der Seiten in den Top 10 sind älter als 3 Jahre (Englisch)',
    data: ZRODLA_KALKULATORA[8].data,
  },
  {
    url: ZRODLA_KALKULATORA[9].url,
    nazwa: 'Littledata E-Commerce Conversion Benchmark (450 Shopify-Shops mit GA4-Daten, 10.08. bis 07.11.2026): Median 1,3 %, Top 20 % über 2,8 %, Top 10 % über 3,6 % (Englisch)',
    data: ZRODLA_KALKULATORA[9].data,
  },
];

function faqDe() {
  const kostenHref = maWersjeDe('/cennik-pozycjonowania') ? '/de/seo-kosten' : null;
  const kostenLink = kostenHref ? `<a href="${kostenHref}">SEO Kosten & Pakete</a>` : 'SEO Kosten & Pakete';
  return [
    {
      id: 'warum-spanne',
      question: 'Warum zeigt der SEO-Rechner eine Spanne statt eines einzelnen Euro-Betrags?',
      answer: 'Weil seriöse CTR-Studien je nach Suchumfeld stark voneinander abweichen: In der klassischen SISTRIX-Studie lag Platz 1 bei Google noch bei 28,5 % Klickrate, bei GrowthSRC (2025) bei 19 % und bei First Page Sage (22.09.2026) bei 22,6 % ohne KI-Antwort bzw. 7,1 % im Gesamtschnitt aller Suchanfragen. Unser SEO-Verlustrechner rechnet deshalb parallel eine vorsichtige und eine optimistische Variante, statt eine scheingenaue Einzelzahl zu versprechen.',
    },
    {
      id: 'daten-ki-sichtbarkeit',
      question: 'Woher stammen die Annahmen zu AI Overviews, ChatGPT und Perplexity?',
      answer: `Den Effekt von Google AI Overviews berechnen wir nach der Studie des Pew Research Center (März 2025): Mit KI-Zusammenfassung klickten Nutzer in 8 % der Besuche auf ein organisches Ergebnis, ohne Zusammenfassung in 15 %, und eine Übersicht erschien bei 18 % der Suchen. Für direkte Klicks aus KI-Antworten setzt das Modell ${AI_MIN} % (Pew: Klick im KI-Text) bis ${AI_MAX} % (Similarweb via iPullRank: Google AI Mode) an. Da die Studien von Pew, First Page Sage, SOCi und Conductor aus den USA stammen, können die genauen Quoten im DACH-Raum abweichen.`,
    },
    {
      id: 'wann-amortisiert-sich-seo',
      question: 'Wie berechnet der SEO-ROI-Rechner den Amortisationsmonat?',
      answer: `Unter dem Ergebnis wählen Sie eines unserer Pakete (ab ${e(CENY.seoStandard.eur)} netto pro Monat, Details unter ${kostenLink}) oder tragen Ihr eigenes Monatsbudget zwischen ${e(KOSZT_WLASNY_EUR.min)} und ${e(KOSZT_WLASNY_EUR.max)} netto ein. Das Modell geht davon aus, dass der zurückgewonnene Gewinn über ${ZWROT.miesiaceDoEfektu.domyslnie} Monate (frei wählbar von ${ZWROT.miesiaceDoEfektu.min} bis ${ZWROT.miesiaceDoEfektu.max} Monaten) linear anwächst, und sucht innerhalb von ${ZWROT.horyzont} Monaten den ersten Monat, in dem die kumulierten Rückflüsse die kumulierten SEO-Kosten übersteigen.`,
    },
    {
      id: 'online-shop-modus',
      question: 'Eignet sich der SEO-Rechner auch für Online-Shops im DACH-Raum?',
      answer: `Ja. Schalten Sie oben im Rechner auf „Online-Shop“ um. Statt Kundenwert und Gewinnmarge geben Sie Ihren durchschnittlichen Netto-Warenkorb, Ihre Bruttomarge (Handelsspanne) und optional den Anteil wiederkehrender Käufer ein. Bei ${SH.powroty} % Wiederkäufern zählt ein entgangener Neukunde konservativ als ${(1 + SH.powroty / 100).toLocaleString('de-DE')} Bestellungen im Jahr. Als Orientierung für die Shop-Conversion dient der Littledata-Median von 1,3 % über 450 Shopify-Shops.`,
    },
    {
      id: 'datenschutz-eingaben',
      question: 'Werden meine eingegebenen Umsätze, Margen oder Budgets gespeichert?',
      answer: 'Nein, solange Sie nur im Browser rechnen: Alle Berechnungen laufen lokal auf Ihrem Gerät, ohne Anmeldung und ohne Serveranfrage. Erst wenn Sie ausdrücklich die Zusammenfassung per E-Mail anfordern, übermitteln wir die eingegebenen Zahlen, das Ergebnis und Ihre E-Mail-Adresse an unser System und löschen diese Daten nach 60 Tagen.',
    },
  ];
}

export default function KalkulatorStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE['kalkulator-strat-seo'];
  const h1 = wpis?.h1 || 'SEO-Rechner: Was fehlende Google- und KI-Sichtbarkeit kostet';
  const okruszek = nazwy?.okruszek || 'SEO-Verlustrechner';
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const seoKosten = jesli('/cennik-pozycjonowania');
  const b2bSeo = jesli('/pozycjonowanie-stron-internetowych');
  const geoHub = jesli('/pozycjonowanie-w-ai');
  const darmowyAudit = jesli('/narzedzia/audyt-seo');
  const kiCheck = jesli('/sprawdz-widocznosc-w-ai');
  const llmsGen = jesli('/narzedzia/generator-llms-txt');
  const kontaktHref = homeHash('kontakt', 'de');

  return (
    <UkladDe
      klucz={KLUCZ}
      tag="Kostenloser SEO-Rechner"
      h1={h1}
      okruszek={okruszek}
      zrodla={zrodla}
      schema={{
        name: 'SEO-Rechner & SEO-Verlustrechner in Euro (inkl. KI-Sichtbarkeit & ROI)',
        description: 'Kostenloser SEO-Rechner und SEO-ROI-Rechner in Euro: berechnet anhand Ihrer Unternehmensdaten sowie aktuellen CTR- und KI-Studien, wie viel Gewinn monatlich ohne Google-Top-3 und ohne Nennung in ChatGPT verloren geht und ab welchem Monat sich SEO amortisiert.',
        category: 'BusinessApplication',
        featureList: [
          'Entgangener Monats- und Jahresgewinn in Euro durch fehlende Google-Top-3 und KI-Empfehlungen',
          'Vorsichtige und optimistische Spanne auf Basis veröffentlichter CTR- und KI-Klickstudien',
          'Integrierter SEO-ROI-Rechner: Amortisationsmonat und 12-Monats-Bilanz für Pakete ab 450 € netto oder eigenes Budget',
          'Fünf DACH-Branchenbeispiele (Handwerk, Zahnarztpraxis, Kanzlei, B2B/IT, Online-Shop)',
          'Eigener E-Commerce-Modus mit Warenkorbwert, Bruttomarge und Wiederkäufern',
        ],
      }}
      lead="Tragen Sie fünf Kennzahlen Ihres Unternehmens oder Online-Shops in Euro ein (oder laden Sie ein DACH-Branchenbeispiel): Der SEO-Rechner zeigt sofort als Spanne, wie viel Gewinn Ihnen ohne Google-Top-3 und ohne KI-Empfehlungen entgeht und ab welchem Monat sich ein SEO-Budget amortisiert."
      narzedzie={<KalkulatorClientDe />}
      odpowiedz="Unser kostenloser SEO-Verlustrechner und SEO-ROI-Rechner schätzt in Euro, wie viel Deckungsbeitrag pro Monat an Wettbewerber fließt, wenn Ihr Unternehmen weder in den Google Top 3 noch in Antworten von ChatGPT, Gemini oder Perplexity auftaucht. Er kombiniert Ihre echten Geschäftszahlen (Suchvolumen, aktueller Google-Traffic, Conversion-Rate, Auftragswert, Marge) mit offengelegten Klickraten aus Studien von First Page Sage, SISTRIX, Pew Research Center und Similarweb und stellt dem Verlust Ihr geplantes SEO-Budget gegenüber."
      faq={faqDe()}
      tytulFaq="Häufige Fragen zum SEO-Rechner und SEO-ROI"
    >
      <CoDostajesz
        id="was-sie-erhalten"
        tytul="Das liefert Ihnen der SEO-Rechner kostenlos"
        tytulOdRazu="Sofort im Browser, ohne E-Mail"
        tytulPoEmailu="Optional per E-Mail"
        odRazu={[
          'Spanne des entgangenen Gewinns in Euro: pro Monat und hochgerechnet aufs Jahr',
          'Getrennte Aufschlüsselung nach Google-Suche und KI-Antworten inklusive Besucherzahlen',
          'Anzahl der monatlich entgangenen Kunden bzw. Shop-Bestellungen',
          'SEO-ROI-Rechner: 12-Monats-Bilanz, Break-even-Schwelle und Amortisationsmonat',
          'Fünf voreingestellte DACH-Szenarien zum direkten Vergleich per Klick',
          'Teilbarer Ergebnis-Link, der exakt dieselben Eingaben wiederherstellt',
        ]}
        poEmailu={[
          'Übersichtliche Zusammenfassung per E-Mail für Ihre Geschäftsführung oder Budgetplanung: Ergebnis, ROI-Rechnung, Annahmen und Quellen',
        ]}
        przypis="Die gesamte Rechnung läuft lokal in Ihrem Browser. Ihre E-Mail-Adresse tragen Sie nur ein, wenn Sie die Auswertung zugeschickt bekommen möchten."
      />

      <Sekcja id="wie-wir-rechnen" tytul="Wie der SEO-Verlustrechner Google-CTR und KI-Klicks modelliert">
        <p style={s.akapit}>
          Klassische SEO-Rechner im deutschsprachigen Raum multiplizieren das Suchvolumen oft pauschal mit veralteten Klickraten von rund 30 % für Platz 1. Seit Google AI Overviews ausspielt und ein wachsender Teil der Nutzer direkt in ChatGPT oder Perplexity fragt, überschätzen solche Formeln das Klickpotenzial deutlich. Unser Modell rechnet in sechs transparenten Schritten:
        </p>
        <ol style={s.lista}>
          <li>
            <strong>Potenzial in den Google Top 3:</strong> Vom monatlichen Suchvolumen ziehen wir zunächst den Anteil ab, der direkt an KI-Assistenten geht. Den verbleibenden Google-Anteil multiplizieren wir mit der durchschnittlichen Klickrate der Plätze 1 bis 3 laut First Page Sage (Bericht vom 22.09.2026, US-Daten): <strong>{ctrDe(ZALOZENIA.ctrTop3.ostrozny)} %</strong> in der vorsichtigen Variante (Durchschnitt über alle Suchanfragen inklusive KI-Antworten) und <strong>{ctrDe(ZALOZENIA.ctrTop3.optymistyczny)} %</strong> in der optimistischen Variante (Suchanfragen ohne KI-Antwort). Zum Vergleich: In der bekannten deutschen SISTRIX-Studie vor Einführung der AI Overviews lagen die Plätze 1 bis 3 mobil noch bei 28,5 %, 15,7 % und 11,0 % (Schnitt 18,4 %), und GrowthSRC maß zwischen 2024 und 2025 über 200.000 Keywords einen Rückgang auf Platz 1 von 28 % auf 19 %.
          </li>
          <li>
            <strong>Dämpfung durch Google AI Overviews:</strong> Laut Pew Research Center (März 2025) erschien bei {proc(ZALOZENIA.aio.udzialWyszukiwan)} % der Google-Suchen eine KI-Zusammenfassung; die Klickrate auf organische Ergebnisse sank dort von {proc(ZALOZENIA.aio.ctrBez)} % auf {proc(ZALOZENIA.aio.ctrZ)} %. Wir senken die effektive CTR im selben Verhältnis ab. Da die vorsichtige First-Page-Sage-Zahl KI-Antworten bereits einpreist, ist unsere Untergrenze bewusst konservativ.
          </li>
          <li>
            <strong>Netto-Verlust bei Google:</strong> Vom berechneten Top-3-Potenzial ziehen wir Ihre heutigen organischen Google-Besuche ab (mindestens null). Wer bereits gut rankt, sieht entsprechend einen kleineren Fehlbetrag.
          </li>
          <li>
            <strong>Verlust in KI-Antworten (ChatGPT, Gemini, Perplexity):</strong> KI-Antworten erzeugen weit weniger Klicks als klassische Suchergebnisse. Wir rechnen mit <strong>{AI_MIN} %</strong> Klickrate in der vorsichtigen Variante (Pew Research Center: Klick auf einen Link innerhalb der KI-Zusammenfassung) und <strong>{AI_MAX} %</strong> in der optimistischen Variante (Similarweb via iPullRank: weniger als rund 3 % der Suchen im Google AI Mode enden mit einem externen Klick). Dieser Block zählt nur, wenn KI-Modelle Ihr Unternehmen heute noch nicht empfehlen.
          </li>
          <li>
            <strong>Antwort „Weiß nicht“ bei KI-Empfehlungen:</strong> Wählen Sie „Weiß nicht“, setzt der Rechner {proc(ZALOZENIA.ai.nieWiem.ostrozny)} % des KI-Verlusts in der vorsichtigen und 100 % in der optimistischen Variante an. Hintergrund: Laut SOCi Local Visibility Index (2026) empfiehlt ChatGPT im Schnitt nur 1,2 % der Unternehmensstandorte, während Google 35,9 % im Local Pack anzeigt.
          </li>
          <li>
            <strong>Vom Klick zum entgangenen Gewinn in Euro:</strong> Entgangene Besuche mal Ihre Conversion-Rate ergeben die verlorenen Neukunden (im Shop-Modus zusätzlich multipliziert mit dem Faktor wiederkehrender Käufer), multipliziert mit Auftragswert und Marge.
          </li>
        </ol>
        <p style={s.akapit}>
          Einordnung der Größenordnung: Im Juni 2025 schickten KI-Plattformen weltweit 1,13 Mrd. Besuche an die 1.000 größten Websites, die klassische Google-Suche dagegen 191 Mrd. (Similarweb via TechCrunch). Laut Conductor stammen 1,08 % des Website-Traffics aus KI-Assistenten. Deshalb ist der finanzielle Hebel in Google heute meist noch um ein Vielfaches größer als der reine Traffic aus KI-Chats, auch wenn KI-Nennungen die Markenwahl im B2B stark vorprägen.
        </p>

        <CompareTable
          id="tabelle-annahmen"
          caption="Alle Modellannahmen des SEO-Verlust- und ROI-Rechners im Überblick"
          columns={[
            { key: 'parametr', label: 'Modellgröße' },
            { key: 'ostrozny', label: 'Vorsichtige Variante' },
            { key: 'optymistyczny', label: 'Optimistische Variante' },
            { key: 'zrodlo', label: 'Quelle / Begründung' },
          ]}
          rows={[
            {
              id: 'ctr-google',
              parametr: 'Ø CTR Google Top 3 (Plätze 1 bis 3)',
              ostrozny: `${ctrDe(ZALOZENIA.ctrTop3.ostrozny)} %`,
              optymistyczny: `${ctrDe(ZALOZENIA.ctrTop3.optymistyczny)} %`,
              zrodlo: 'First Page Sage (22.09.2026, USA): Schnitt mit bzw. ohne KI-Antwort; klassischer DACH-Vergleichswert vor AIO: SISTRIX 28,5 / 15,7 / 11,0 %',
            },
            {
              id: 'aio-abzug',
              parametr: 'Korrektur für Google AI Overviews',
              ostrozny: `−8,4 % auf CTR (${proc(ZALOZENIA.aio.udzialWyszukiwan)} % Suchen mit AIO)`,
              optymistyczny: `−8,4 % auf CTR (${proc(ZALOZENIA.aio.udzialWyszukiwan)} % Suchen mit AIO)`,
              zrodlo: `Pew Research Center (03/2025): Klickrate sinkt bei KI-Übersicht von ${proc(ZALOZENIA.aio.ctrBez)} % auf ${proc(ZALOZENIA.aio.ctrZ)} %`,
            },
            {
              id: 'ctr-ai',
              parametr: 'Klickrate aus KI-Antworten auf die Website',
              ostrozny: `${AI_MIN} %`,
              optymistyczny: `${AI_MAX} %`,
              zrodlo: 'Pew Research Center (1 % Klick in AIO) und Similarweb / iPullRank (< 3 % Klicks im Google AI Mode, 2025)',
            },
            {
              id: 'ai-weiss-nicht',
              parametr: 'Gewichtung bei „Weiß nicht“ (KI-Empfehlung)',
              ostrozny: `${proc(ZALOZENIA.ai.nieWiem.ostrozny)} % des KI-Verlusts`,
              optymistyczny: '100 % des KI-Verlusts',
              zrodlo: 'SOCi Local Visibility Index 2026: nur 1,2 % der Standorte werden in ChatGPT empfohlen',
            },
            {
              id: 'ai-anteil',
              parametr: 'Anteil KI-Anfragen statt Google',
              ostrozny: `${ZALOZENIA.udzialAiDomyslny} % Standard (0 bis 60 % wählbar)`,
              optymistyczny: `${ZALOZENIA.udzialAiDomyslny} % Standard (0 bis 60 % wählbar)`,
              zrodlo: 'Eigene vorsichtige Voreinstellung in Anlehnung an die Gartner-Prognose (02/2024: −25 % bis 2026)',
            },
            {
              id: 'anlaufzeit',
              parametr: 'Anlaufzeit bis zur vollen SEO-Wirkung',
              ostrozny: `${ZWROT.miesiaceDoEfektu.domyslnie} Monate linear (${ZWROT.miesiaceDoEfektu.min} bis ${ZWROT.miesiaceDoEfektu.max} wählbar)`,
              optymistyczny: `${ZWROT.miesiaceDoEfektu.domyslnie} Monate linear (${ZWROT.miesiaceDoEfektu.min} bis ${ZWROT.miesiaceDoEfektu.max} wählbar)`,
              zrodlo: `Eigene Modellannahme, Horizont ${ZWROT.horyzont} Monate; Kontext: Ahrefs (05/2025), nur 1,74 % neuer Seiten in 12 Monaten in Top 10`,
            },
            {
              id: 'shop-wiederkaeufer',
              parametr: 'Wiederkäufer im Online-Shop-Modus',
              ostrozny: '+1 Bestellung pro Wiederkäufer/Jahr',
              optymistyczny: '+1 Bestellung pro Wiederkäufer/Jahr',
              zrodlo: 'Eigene konservative Modellannahme (optional, 0 bis 90 %); Conversion-Referenz: Littledata Median 1,3 %',
            },
          ]}
          przypis="Hinweis: Die Klickstudien von First Page Sage, Pew Research Center, SOCi und Conductor basieren auf US-Daten. Nutzen Sie die Ergebnisse als kaufmännische Orientierungsspanne, nicht als Umsatzgarantie."
        />
      </Sekcja>

      <Sekcja id="seo-roi-rechner" tytul="SEO-ROI-Rechner: Kosten, Anlaufzeit und Amortisation prüfen">
        <p style={s.akapit}>
          Ein reiner Verlustrechner zeigt nur das theoretische Potenzial. Entscheidend für die Budgetfreigabe im Mittelstand ist das Verhältnis zwischen monatlichem SEO-Investment und realistischem Rückfluss. Direkt unter dem Ergebnis vergleichen Sie den Verlust mit unseren{' '}
          {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO-Paketen in Euro</Link> : 'SEO-Paketen in Euro'}{' '}
          oder mit einem eigenen Agentur- oder Inhouse-Budget ({e(KOSZT_WLASNY_EUR.min)} bis {e(KOSZT_WLASNY_EUR.max)} netto pro Monat):
        </p>
        <ul style={s.lista}>
          <li>
            <strong>Unsere Referenzpreise (netto pro Monat):</strong> SEO Standard ab {e(CENY.seoStandard.eur)} (bis zu 20 Keywords, 2 Inhalte, 2 Links), SEO Premium {e(CENY.seoPremium.eur)} (bis zu 50 Keywords, 4 Inhalte, 4 Links, CRO und wöchentliche KI-Sichtbarkeitsmessung) sowie Booster Pack {e(CENY.boosterPack.eur)} (Laufzeit mindestens {CENY.boosterPack.umowaMiesiecy} Monate inklusive neuer Next.js-Website).
          </li>
          <li>
            <strong>Realistische Aufbauphase statt Soforteffekt:</strong> Organische Rankings entstehen nicht am ersten Tag. Das Modell lässt den zurückgewonnenen Deckungsbeitrag über {ZWROT.miesiaceDoEfektu.domyslnie} Monate gleichmäßig von null auf 100 % ansteigen (frei einstellbar zwischen {ZWROT.miesiaceDoEfektu.min} und {ZWROT.miesiaceDoEfektu.max} Monaten). Laut einer Ahrefs-Auswertung von Mai 2025 schaffen es nur 1,74 % neu veröffentlichter Seiten innerhalb eines Jahres in die Google Top 10, und 72,9 % aller Top-10-Seiten sind älter als drei Jahre. Bei einer frischen Domain sollten Sie den Regler daher eher auf 15 bis 24 Monate stellen.
          </li>
          <li>
            <strong>Break-even-Monat und Gewinnschwelle:</strong> Der Rechner nennt den ersten Monat innerhalb von {ZWROT.horyzont} Monaten, in dem die Summe der zusätzlichen Deckungsbeiträge alle bis dahin gezahlten Monatsbeiträge übersteigt, sowie den Prozentsatz des Verlusts, den Sie lediglich zurückgewinnen müssen, um die laufenden Kosten zu decken. Rechnet sich ein Budget bei Ihrer Nachfrage nicht, sagt das Tool dies offen.
          </li>
        </ul>
        <p style={s.akapit}>
          Welche Maßnahmen in jedem Monat enthalten sind, lesen Sie unter{' '}
          {b2bSeo ? <Link href={b2bSeo} style={s.podkreslenie}>B2B SEO für Unternehmen</Link> : 'B2B SEO für Unternehmen'}{' '}
          und{' '}
          {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}.
        </p>
      </Sekcja>

      <Sekcja id="rechenbeispiele-dach" tytul="Drei durchgerechnete Praxisbeispiele in Euro (DACH)">
        <h3 style={s.h3}>1. Handwerks- und Sanierungsbetrieb (regional, hoher Auftragswert)</h3>
        <p style={s.akapit}>
          Ein Fachbetrieb für Badsanierung oder Wärmepumpen wird für seine Leistungs-Keywords im Einzugsgebiet {nDe(HW.wyszukiwania)}-mal im Monat gesucht und erhält aktuell {nDe(HW.ruch)} organische Google-Besuche. Aus {podpText(HW.konwersja)} % der Besuche entsteht ein Auftrag im Schnitt von {e(HW.wartosc)} netto bei {HW.marza} % Marge; ChatGPT nennt den Betrieb noch nicht. Der Rechner weist einen monatlichen Gewinnverlust von <strong>{e(handwerk.min.zysk)} bis {e(handwerk.max.zysk)}</strong> aus ({dziesDe(handwerk.min.klienci)} bis {dziesDe(handwerk.max.klienci)} Aufträge pro Monat). Mit SEO Standard ({e(CENY.seoStandard.eur)} netto/Monat) und {HW.miesiace} Monaten Anlaufzeit liegt die Monatsbilanz bei voller Wirkung zwischen {zZnakiem(handwerkZwrot.min.bilans)} und {zZnakiem(handwerkZwrot.max.bilans)}, und {amortisationText(handwerkZwrot)}.
        </p>
        <p style={s.akapit}><BeispielEinsetzenDe przyklad="handwerk">Handwerks-Beispiel in den Rechner laden</BeispielEinsetzenDe></p>

        <h3 style={s.h3}>2. B2B-Fertigung oder IT-Systemhaus (wenige Suchen, hoher Kundenwert)</h3>
        <p style={s.akapit}>
          Ein spezialisierter B2B-Zulieferer kommt über alle Fachbegriffe auf {nDe(B2B.wyszukiwania)} monatliche Suchanfragen bei {nDe(B2B.ruch)} aktuellen Klicks, {podpText(B2B.konwersja)} % Abschlussquote, {e(B2B.wartosc)} durchschnittlichem Auftragswert und {B2B.marza} % Deckungsbeitrag ({B2B.udzialAi} % KI-Anteil). Trotz des überschaubaren Suchvolumens summiert sich das entgangene Potenzial auf <strong>{e(b2b.min.zysk)} bis {e(b2b.max.zysk)}</strong> Gewinn pro Monat. Gegenübergestellt mit SEO Premium ({e(CENY.seoPremium.eur)} netto/Monat inkl. GEO-Messung) ergibt sich nach {B2B.miesiace} Monaten eine monatliche Bilanz von {zZnakiem(b2bZwrot.min.bilans)} bis {zZnakiem(b2bZwrot.max.bilans)}, und {amortisationText(b2bZwrot)}.
        </p>
        <p style={s.akapit}><BeispielEinsetzenDe przyklad="b2b">B2B-Beispiel in den Rechner laden</BeispielEinsetzenDe></p>

        <h3 style={s.h3}>3. Online-Shop im DACH-Raum (Warenkorb, Bruttomarge & Wiederkäufer)</h3>
        <p style={s.akapit}>
          Ein spezialisierter Online-Shop verzeichnet {nDe(SH.wyszukiwania)} Suchanfragen auf seine Produktkategorien und heute {nDe(SH.ruch)} organische Besuche. Bei der Littledata-Median-Conversion von {podpText(SH.konwersja)} %, einem Warenkorb von {e(SH.wartosc)} netto, {SH.marza} % Bruttomarge und {SH.powroty} % Wiederkäufern entgehen dem Shop <strong>{e(shop.min.zysk)} bis {e(shop.max.zysk)}</strong> Bruttomarge pro Monat (ohne Wiederkäufer wären es {e(shopBezPowrotow.min.zysk)} bis {e(shopBezPowrotow.max.zysk)}) aus {dziesDe(shop.min.zamowienia)} bis {dziesDe(shop.max.zamowienia)} Bestellungen. Bei SEO Standard ({e(CENY.seoStandard.eur)} netto/Monat) liegt die Bilanz bei voller Wirkung zwischen {zZnakiem(shopZwrot.min.bilans)} und {zZnakiem(shopZwrot.max.bilans)}, und {amortisationText(shopZwrot)}: Der Rechner zeigt offen, wenn sich ein Paket nur im optimistischen Klickszenario trägt.
        </p>
        <p style={s.akapit}><BeispielEinsetzenDe przyklad="shop">Online-Shop-Beispiel in den Rechner laden</BeispielEinsetzenDe></p>
      </Sekcja>

      <Sekcja id="grenzen-des-rechners" tytul="Was der SEO-Rechner bewusst nicht verspricht">
        <ul style={s.lista}>
          <li><strong>Keine Ranking- oder Umsatzgarantie:</strong> Die ROI-Sektion prüft rechnerisch, was passiert, wenn Sie das berechnete Top-3-Potenzial nach der gewählten Anlaufzeit erreichen. Wie viel davon realisierbar ist, hängt von Domain-Autorität, Technik, Content-Qualität und der Stärke Ihrer Mitbewerber ab.</li>
          <li><strong>Saisonalität und lokaler Wettbewerb:</strong> Das Modell bildet einen durchschnittlichen Monat ab und kennt weder saisonale Spitzen noch die genaue Dichte von Marktplätzen oder Konzernen in Ihrer Nische.</li>
          <li><strong>Andere Kanäle sind ausgeklammert:</strong> Google Ads, Shopping-Anzeigen, Amazon, Marktplätze und Empfehlungen außerhalb der Suche fließen nicht in die Berechnung ein.</li>
          <li><strong>Alle Beträge in Euro netto:</strong> Paketpreise und Ihr eigenes Budget werden netto ohne gesetzliche Umsatzsteuer und ohne Ihren internen Zeitaufwand gerechnet.</li>
        </ul>
        <p style={s.akapit}>
          Prüfen Sie im nächsten Schritt kostenlos die konkrete Ausgangslage Ihrer Domain: Unser{' '}
          {darmowyAudit ? <Link href={darmowyAudit} style={s.podkreslenie}>kostenloser SEO Audit</Link> : 'kostenloser SEO Audit'}{' '}
          untersucht bis zu {AUDYT.stron} Unterseiten nach {AUDYT.regul} Regeln, der{' '}
          {llmsGen ? <Link href={llmsGen} style={s.podkreslenie}>llms.txt Generator</Link> : 'llms.txt Generator'}{' '}
          testet den Zugriff von {GENERATOR.botowAi} KI-Bots, und mit{' '}
          {kiCheck ? <Link href={kiCheck} style={s.podkreslenie}>KI-Sichtbarkeit prüfen</Link> : 'KI-Sichtbarkeit prüfen'}{' '}
          ersetzen Sie „Weiß nicht“ im Rechner durch einen echten Live-Test in ChatGPT, Gemini und Perplexity.
        </p>
      </Sekcja>

      <section aria-labelledby="seo-rechner-kontakt" className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.sekcja, ...s.karta, display: 'grid', gap: '1rem' }}>
        <h2 id="seo-rechner-kontakt" style={{ ...s.h2, marginBottom: 0 }}>Wollen Sie prüfen, wie realistisch die Top 3 für Ihre Haupt-Keywords sind?</h2>
        <p style={{ ...s.akapit, margin: 0 }}>
          Schicken Sie uns Ihre Domain und 3 bis 5 Leistungen oder Produktkategorien. Wir gleichen Suchvolumen, Wettbewerb und technische Hürden ab und melden uns werktags innerhalb von 24 Stunden mit einer ehrlichen Einschätzung, ob und mit welchem Paket sich SEO für Sie rechnet.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <Link href={kontaktHref} className="btn btn-primary" data-cta="kalkulator_de_kontakt">Kostenlose Einschätzung anfragen</Link>
          {seoKosten && <Link href={seoKosten} className="btn btn-secondary" data-cta="kalkulator_de_preise">{`SEO-Pakete ab ${e(CENY.seoStandard.eur)} netto ansehen`}</Link>}
        </div>
      </section>

      <WeitereToolsDe bez={KLUCZ} />
    </UkladDe>
  );
}

function podpText(n) {
  return String(n).replace('.', ',');
}
