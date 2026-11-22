// Deutsche Werkzeugseite D1: /de/tools/geo-zitierbarkeit-pruefen

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import { Link } from '@/i18n/routing';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { NawBok } from '@/components/de/narzedzia/WspolneDe';
import { WeitereToolsDe, ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import CytowalnoscGeoClientDe from './CytowalnoscGeoClientDe';

const KLUCZ = '/narzedzia/sprawdz-cytowalnosc-strony-ai';
const SLUG = 'sprawdz-cytowalnosc-strony-ai';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/geo-zitierbarkeit-pruefen';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://arxiv.org/abs/2311.09735', nazwa: 'Aggarwal et al. (Princeton, Georgia Tech, Allen AI, KDD 2024): GEO - Generative Engine Optimization (Englisch)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen in der Suche (AI Overviews & AI Mode) und Seitenstruktur', data: '2026-11-22' },
  { url: 'https://developers.openai.com/api/docs/bots', nazwa: 'OpenAI: OAI-SearchBot und Quellenextraktion in ChatGPT Search (Englisch)', data: '2026-11-22' },
  { url: 'https://docs.perplexity.ai/docs/resources/perplexity-crawlers', nazwa: 'Perplexity Docs: Indexierung und Quellenangaben durch PerplexityBot (Englisch)', data: '2026-11-22' },
];

const FAQ_DE = [
  {
    id: 'was-misst-geo-zitierbarkeit',
    question: 'Worin unterscheidet sich der GEO-Zitierbarkeits-Check von klassischen SEO-Textanalysen?',
    answer: 'Klassische On-Page-Tools zählen Keyword-Wiederholungen im Gesamttext. KI-Antwortsysteme wie Google AI Overviews, ChatGPT Search und Perplexity arbeiten dagegen mit Retrieval-Augmented Generation (RAG): Sie schneiden eine Seite entlang der H2- und H3-Überschriften in einzelne Blöcke und zitieren bevorzugt den Abschnitt, der in 40 bis 75 Wörtern eine präzise Antwort mit Zahlen, Einheiten oder einer Tabelle liefert.',
  },
  {
    id: 'warum-40-bis-75-woerter-answer-first',
    question: 'Warum sollte der erste Absatz unter einer H2 genau 40 bis 75 Wörter umfassen?',
    answer: 'Ein eigenständiger Absatz dieser Länge beantwortet Preisrahmen, Dauer und Voraussetzungen ohne Füllsätze innerhalb eines einzigen Abruffensters. Beginnt ein Abschnitt mit 200 Wörtern Image-Text, verwässert der semantische Vektor und Sprachmodelle weichen auf prägnantere Wettbewerberseiten aus.',
  },
  {
    id: 'was-bedeutet-faktendichte',
    question: 'Welche Signale fließen in die Fakten- und Einheitendichte ein?',
    answer: 'Gezählt werden überprüfbare Angaben pro 100 Wörter: Geldbeträge in Euro, Prozentsätze, Zeitangaben, Maßeinheiten, Jahreszahlen sowie genannte Normen (z. B. ISO, DSGVO). In der GEO-Studie der Universitäten Princeton und Georgia Tech (KDD 2024) steigerten konkrete Statistiken und Quellenbelege die Sichtbarkeit in generativen Antworten um über 30 %.',
  },
  {
    id: 'helfen-html-tabellen-bei-ki-zitaten',
    question: 'Sind native HTML-Tabellen besser für KI-Zitate geeignet als Preisgrafiken?',
    answer: 'Ja. Eine saubere <code>&lt;table&gt;</code>-Struktur mit <code>&lt;th&gt;</code> verknüpft jede Zeile im Quelltext eindeutig mit der zugehörigen Spalte. Preislisten als Bilddatei oder verschachtelte <code>&lt;div&gt;</code>-Container verlieren diesen Bezug beim Abruf durch KI-Crawler ohne Browser-Rendering.',
  },
  {
    id: 'ist-der-geo-score-reproduzierbar',
    question: 'Liefert die Analyse bei jedem Aufruf denselben Wert?',
    answer: 'Ja. Die Bewertung ist vollständig deterministisch und verzichtet bewusst auf zufallsbehaftete LLM-Schätzungen: Geprüft werden reale DOM-Elemente, Wortlängen je Abschnitt, Frageüberschriften, Zahlendichte, Tabellen und JSON-LD. Für echte Live-Abfragen über 5 Sprachmodelle nutzen Sie ergänzend unseren kostenlosen KI-Sichtbarkeits-Check.',
  },
];

export function CytowalnoscGeoStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'GEO-Zitierbarkeit prüfen: Wird Ihre Seite in AI Overviews & ChatGPT zitiert?';
  const okruszek = nazwy?.okruszek || 'GEO-Zitierbarkeit prüfen';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const geoHub = jesli('/pozycjonowanie-w-ai');
  const seoVsGeo = jesli('/porownania/seo-vs-geo');
  const kiCrawler = jesli('/narzedzia/tester-robotow-ai-robots-txt');
  const kiCheck = jesli('/sprawdz-widocznosc-w-ai');
  const seoKosten = jesli('/cennik-pozycjonowania');

  return (
    <main className={st.strona} style={s.main}>
      <Header />
      <Breadcrumbs
        pl={okruszek}
        en={okruszek}
        de={okruszek}
        parent={{ href: '/narzedzia', pl: 'Narzędzia', en: 'Tools', de: 'Tools' }}
      />
      <WebAppSchema
        name="GEO-Zitierbarkeits- & Antwortblock-Prüfer"
        description="Kostenloses deterministisches GEO-Tool: zerlegt jede Unterseite nach H2/H3-Überschriften in RAG-Abschnitte, bewertet 6 KI-Zitierkriterien (Answer-First, Blocklänge, Faktendichte, Frageüberschriften, Tabellen, Schema) und vergleicht 1:1 mit einem Wettbewerber."
        url={url}
        category="BusinessApplication"
        language="de"
        featureList={[
          'Deterministischer GEO-Score von 0 bis 100 über 6 RAG-Kriterien',
          'Simulation des extrahierten Antwortblocks in Google AI Overviews und ChatGPT',
          'Optionaler 1:1-Vergleich gegen eine beliebige Wettbewerber-Unterseite',
          'Detaillierte H2/H3-Abschnittstabelle mit Wortanzahl, Punktzahl und Diagnose',
          'Sofort umsetzbare Redaktions-Checkliste ohne Registrierung und ohne E-Mail',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="ai" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses GEO- &amp; Content-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Prüfen Sie kostenlos, wie KI-Suchsysteme Ihre H2/H3-Abschnitte in RAG-Blöcke zerlegen, welcher Textausschnitt sich als Quelle für Google AI Overviews und ChatGPT eignet und wo ein Konkurrent besser strukturiert ist.
          </p>

          <CytowalnoscGeoClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              KI-Antwortmaschinen (Google AI Overviews, ChatGPT Search, Perplexity und Claude) zitieren selten komplette Artikel, sondern extrahieren per RAG einzelne H2/H3-Passagen. Hohe Zitierchancen erreichen Seiten, die jeden Abschnitt mit einer präzisen Answer-First-Antwort (40-75 Wörter) eröffnen, überprüfbare Zahlen und Einheiten nennen, Vergleiche als HTML-Tabellen auszeichnen und Autor sowie Aktualisierungsdatum im JSON-LD hinterlegen.
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Das liefert der GEO-Zitierbarkeits-Prüfer kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Gesamtwert von 0 bis 100 sowie Einzelbewertung von 6 RAG-Zitierkriterien',
                  'Simulierter Antwortauszug für Google AI Overviews und ChatGPT Search',
                  'Optionaler 1:1-Direktvergleich mit einer rankenden Wettbewerber-URL',
                  'Vollständige H2/H3-Blocktabelle inklusive Wortanzahl und Einzelbefund',
                  'Priorisierte Umbau-Empfehlungen für Redaktion, Marketing und B2B-Vertrieb',
                ]}
                przypis="Kein E-Mail-Gate und keine KI-Zufallsschätzung: reproduzierbare Analyse Ihres HTML-Quelltextes."
              />

              <Sekcja id="wie-rag-systeme-quellen-auswaehlen" tytul="Wie RAG-Systeme entscheiden, welche Website zitiert wird">
                <p style={s.akapit}>
                  Stellt ein Einkäufer in ChatGPT oder Google eine konkrete Frage zu Kosten, Lieferzeiten oder Systemunterschieden, zerlegt die Suchpipeline passende Webseiten entlang ihrer <code>H2</code>- und <code>H3</code>-Überschriften in kompakte Textblöcke (Chunks):
                </p>
                <CompareTable
                  id="tabelle-geo-signale"
                  caption="Die 6 Text- und Struktursignale für hohe KI-Zitierbarkeit"
                  columns={[
                    { key: 'signal', label: 'GEO-Kriterium' },
                    { key: 'schwach', label: 'Wird von KI meist übersprungen' },
                    { key: 'stark', label: 'Zitierfähiger RAG-Antwortblock' },
                  ]}
                  rows={[
                    { id: 'answer-first', signal: 'Answer-First-Einstieg', schwach: '180 Wörter Unternehmensgeschichte vor der eigentlichen Antwort', stark: 'Klare Antwort in 45-70 Wörtern direkt im ersten Absatz' },
                    { id: 'laenge', signal: 'Abschnittslänge', schwach: 'Ungeteilte 900-Wörter-Textwand oder Ein-Satz-Floskel', stark: 'Eigenständiger Abschnitt mit 60-180 Wörtern je H2/H3' },
                    { id: 'fakten', signal: 'Fakten & Einheiten', schwach: '„Individuell, schnell und kosteneffizient“', stark: '„Ab 450 € netto/Mon., Start in 14 Tagen, LCP <= 2,5 s“' },
                    { id: 'headings', signal: 'H2/H3-Formulierung', schwach: '„Leistungen“, „Über uns“, „Vorteile“', stark: '„Was kostet B2B-SEO?“, „Next.js vs. WordPress“' },
                    { id: 'tabellen', signal: 'Listen & Tabellen', schwach: 'Preise nur als Bilddatei eingebunden', stark: 'Saubere HTML-Tabelle <table> und Aufzählungen <ul>' },
                    { id: 'eeat', signal: 'Autor & Schema', schwach: 'Ohne Verfasser, ohne Datum und ohne JSON-LD', stark: 'Autor, Aktualisierungsdatum und Article/Service JSON-LD' },
                  ]}
                  przypis="Grundlage: GEO-Studie (Aggarwal et al., KDD 2024) sowie Google Search Central Dokumentation zu KI-Funktionen."
                />
                <p style={s.akapit}>
                  Den strategischen Unterschied zwischen klassischer Suchmaschinenoptimierung und KI-Optimierung lesen Sie im Vergleich{' '}
                  {seoVsGeo ? <Link href={seoVsGeo} style={s.podkreslenie}>SEO vs. GEO</Link> : 'SEO vs. GEO'}{' '}
                  sowie auf unserer Leistungsseite{' '}
                  {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}.
                </p>
              </Sekcja>

              <Sekcja id="drei-schritte-fuer-ki-sichtbare-seiten" tytul="In 3 Schritten zur zitierfähigen B2B-Leistungsseite">
                <ol style={s.lista}>
                  <li><strong>Fazit an den Anfang stellen:</strong> Nennen Sie Preisspannen, Projektdauer und Rahmenbedingungen in den ersten 50 Wörtern unter jeder H2.</li>
                  <li><strong>Tarife und Vergleiche tabellarisch auszeichnen:</strong> Strukturierte <code>&lt;table&gt;</code>-Vergleiche werden in AI Overviews deutlich häufiger übernommen als Fließtext.</li>
                  <li><strong>Technischen Bot-Zugriff absichern:</strong> Prüfen Sie im{' '}
                    {kiCrawler ? <Link href={kiCrawler} style={s.podkreslenie}>KI-Crawler &amp; robots.txt Prüfer</Link> : 'KI-Crawler & robots.txt Prüfer'}, dass <code>OAI-SearchBot</code> und <code>PerplexityBot</code> Statuscode 200 erhalten, und testen Sie echte Marken-Nennungen unter{' '}
                    {kiCheck ? <Link href={kiCheck} style={s.podkreslenie}>KI-Sichtbarkeit prüfen</Link> : 'KI-Sichtbarkeit prüfen'}. Alle laufenden Pakete (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.) finden Sie unter{' '}
                    {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}.
                  </li>
                </ol>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zur GEO-Zitierbarkeit und Answer-First-Struktur"
        sectionId="faq"
      />

      <section style={{ paddingBottom: '2rem' }}>
        <div className="container" style={s.kontener}>
          <ZrodlaDe zrodla={zrodla} />
        </div>
      </section>

      <Contact isMainContent />
      <Footer />
    </main>
  );
}

export default CytowalnoscGeoStronaDe;
