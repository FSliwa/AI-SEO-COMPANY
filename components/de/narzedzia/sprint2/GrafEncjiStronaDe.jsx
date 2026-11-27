// Deutsche Werkzeugseite D4: /de/tools/entity-graph-json-ld-validator

import '@/app/ruch.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import AnswerBox from '@/components/AnswerBox';
import Byline from '@/components/Byline';
import CompareTable from '@/components/CompareTable';
import WebAppSchema from '@/components/WebAppSchema';
import AppleFaq from '@/components/service/AppleFaq';
import Ozdoba from '@/components/narzedzia/Ozdoba';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import { Link } from '@/i18n/routing';
import { maWersjeDe, urlDe, wpisDe } from '@/lib/stronyDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import { obrazKarty } from '@/lib/narzedziaObrazy';
import { CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';
import { NawBok } from '@/components/de/narzedzia/WspolneDe';
import { WeitereToolsDe, ZrodlaDe } from '@/components/de/narzedzia/UkladDe';
import GrafEncjiClientDe from './GrafEncjiClientDe';

const KLUCZ = '/narzedzia/walidator-grafu-encji-json-ld';
const SLUG = 'walidator-grafu-encji-json-ld';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/entity-graph-json-ld-validator';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://www.w3.org/TR/json-ld11/', nazwa: 'W3C Recommendation: JSON-LD 1.1 - Knoten-IDs (@id) und verbundene Graphen (@graph, Englisch)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/organization', nazwa: 'Google Search Central: Strukturierte Daten für Organization (sameAs, vatID, taxID, iso6523Code)', data: '2026-11-22' },
  { url: 'https://schema.org/Organization', nazwa: 'Schema.org: Spezifikation des Typs Organization und verbundener Entitäten (Englisch)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data', nazwa: 'Google Search Central: Einführung in strukturierte Daten in der Google-Suche', data: '2026-11-22' },
];

const FAQ_DE = [
  {
    id: 'warum-verbundener-graph-statt-einzel-snippets',
    question: 'Warum ist ein verbundener @graph besser als einzelne CMS-JSON-LD-Blöcke?',
    answer: 'Klassische Plugins geben <code>WebSite</code>, <code>Organization</code> und <code>Service</code> oft getrennt ohne gemeinsame <code>@id</code>-Anker aus. Ein einheitlicher <code>@graph</code> mit stabilen URIs (etwa <code>https://ihre-firma.de/#organization</code>) verknüpft Unternehmen, Geschäftsführung, Standort und Leistungen eindeutig für Google und KI-Modelle.',
  },
  {
    id: 'warum-ust-idnr-und-handelsregister-ins-schema',
    question: 'Warum gehören USt-IdNr. und Handelsregisternummer auch ins JSON-LD?',
    answer: 'Im DACH-Raum stehen USt-IdNr. und HRB-Nummer zwar pflichtgemäß im Impressum, fehlen aber fast immer in den strukturierten Daten. Über Eigenschaften wie <code>vatID</code> und <code>taxID</code> erhält Ihr Unternehmen einen eindeutigen maschinenlesbaren Schlüssel, der Namensverwechslungen in Sprachmodellen verhindert.',
  },
  {
    id: 'welche-profile-gehoeren-in-sameas',
    question: 'Welche externen Profile sollten im sameAs-Array stehen?',
    answer: 'Tragen Sie offizielle, dauerhaft gepflegte Unternehmensprofile ein: LinkedIn-Unternehmensseite, Google Unternehmensprofil (Maps-Link), B2B-Bewertungsplattformen wie Clutch, Sortlist oder Trustpilot, WLW („Wer liefert was“), Crunchbase, Wikidata sowie offizielle GitHub-Profile.',
  },
  {
    id: 'erzeugt-organization-schema-sterne-in-google',
    question: 'Sorgt ein @graph automatisch für Bewertungssterne in den Suchergebnissen?',
    answer: 'Nein. Google blendet selbstreferenzierte Bewertungssterne für Organization und LocalBusiness aus. Der geschäftliche Wert eines <code>@graph</code> liegt in der klaren Entitäts-Zuordnung im Knowledge Graph und der höheren Vertrauenswürdigkeit (E-E-A-T) bei Antworten von ChatGPT, Perplexity und Gemini.',
  },
  {
    id: 'wo-wird-der-generierte-code-eingebaut',
    question: 'Auf welcher Unterseite binde ich das generierte @graph-Skript ein?',
    answer: 'Hinterlegen Sie den zentralen <code>Organization</code>- und <code>WebSite</code>-Block auf Ihrer Startseite und referenzieren Sie auf Leistungs-, Autoren- und Kontaktseiten exakt dieselbe <code>@id</code> (<code>https://www.ihre-firma.de/#organization</code>) in den Feldern <code>provider</code>, <code>publisher</code> und <code>worksFor</code>.',
  },
];

export function GrafEncjiStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'JSON-LD Entitäts-Graph Validator & @graph Generator';
  const okruszek = nazwy?.okruszek || 'Entitäts-Graph JSON-LD';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.sources?.length
    ? nazwy.sources
    : nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;
  const ilustracja = obrazKarty(SLUG, 'de');

  const schemaVorlagen = jesli('/narzedzia/dane-strukturalne-json-ld');
  const eeatCheck = jesli('/narzedzia/checklista-e-e-a-t');
  const geoHub = jesli('/pozycjonowanie-w-ai');
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
        name="JSON-LD Marken-Entitätsgraph Validator & @graph Generator"
        description="Kostenloses Entity-SEO- & Knowledge-Graph-Tool: liest Ihre wichtigsten Seiten aus, visualisiert JSON-LD-@graph-Knoten als interaktives SVG, prüft sameAs sowie USt-IdNr./HRB und generiert eine verbundene schema.org-Vorlage."
        url={url}
        category="DeveloperApplication"
        language="de"
        screenshot={ilustracja ? { url: ilustracja.src, width: ilustracja.width, height: ilustracja.height } : undefined}
        featureList={[
          'Interaktives SVG-Diagramm für Organization, WebSite, Person, LocalBusiness und Service',
          'Prüfung seitenübergreifender @id-Anker und Entitätsbeziehungen',
          'Kontrolle von sameAs-Profilen sowie USt-IdNr., Steuernummer und Handelsregister',
          '1-Klick-Generator für einen verbundenen @graph-JSON-LD-Block',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="autorytet" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses Entity-SEO- &amp; Schema-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Sehen Sie Ihr Unternehmen so, wie Google Knowledge Graph und KI-Systeme es auslesen: Visualisieren Sie Ihre JSON-LD-Knoten als interaktiven SVG-Graphen, schließen Sie @id- und sameAs-Lücken und kopieren Sie einen sauberen @graph mit einem Klick.
          </p>

          <GrafEncjiClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Zeitgemäßes Entity SEO bündelt einzelne Bausteine zu einem verbundenen JSON-LD-@graph mit festen @id-Ankern (#organization, #website, #person), amtlichen Unternehmenskennungen (USt-IdNr., Handelsregister) und externen sameAs-Profilen. Unser kostenloser Schema Markup Validator prüft sowohl Live-URLs als auch direkt eingefügten JSON-LD-Code, damit Google und Sprachmodelle Ihre Marke zweifelsfrei zuordnen.
            </AnswerBox>
            <Byline sciezka={KLUCZ} takzeEn style={{ margin: '1.25rem 0 0' }} />
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Schema Markup Validator & @graph-Prüfer: Das erhalten Sie kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Bewertung von 0 bis 100 für Live-Domains (Startseite, Über-uns, Impressum) oder eingefügtes JSON-LD',
                  'Interaktives SVG-Knotendiagramm mit @id-Verbindungen zwischen Unternehmen, Personen und Leistungen',
                  'Übersicht zu Registerkennungen (USt-IdNr., HRB, LEI) und verknüpften sameAs-Profilen',
                  'Kopierfertige @graph-JSON-LD-Vorlage passend zu Ihrer Domain und Branche',
                ]}
                przypis="Ohne Anmeldung: Alle Prüfergebnisse und das generierte JSON-LD stehen sofort bereit."
              >
                {ilustracja ? <ZrzutWyniku {...ilustracja} sizes="(max-width: 900px) 100vw, 860px" /> : null}
              </CoDostajesz>

              <Sekcja id="isolierte-plugins-vs-verbundener-graph" tytul="Isolierte Plugin-Snippets vs. verbundene @graph-Architektur">
                <CompareTable
                  id="tabelle-entity-graph-de"
                  caption="Unterschied zwischen Standard-Plugin-Ausgabe und sauberem Entity SEO"
                  columns={[
                    { key: 'ebene', label: 'Strukturebene' },
                    { key: 'plugin', label: 'Typisches CMS-Plugin' },
                    { key: 'graph', label: 'Verbundener @graph-Standard' },
                  ]}
                  rows={[
                    { id: 'id', ebene: 'Knoten-Identität (@id)', plugin: 'Lose Einzelobjekte ohne feste Referenz', graph: 'Durchgängige #organization-ID auf der gesamten Domain' },
                    { id: 'autor', ebene: 'Geschäftsführung & Autoren', plugin: 'Reiner Textname ohne Entitätsbezug', graph: 'Person-Knoten mit worksFor und Fachprofilen' },
                    { id: 'register', ebene: 'Rechtliche Eindeutigkeit', plugin: 'Nur Markenname (Verwechslungsgefahr)', graph: 'USt-IdNr. (vatID), Steuernummer, Adresse & Registerbezug' },
                    { id: 'sameas', ebene: 'Externe Bestätigung', plugin: 'Leer oder unvollständige Social-Links', graph: 'Geprüfte Profile auf LinkedIn, Clutch, Google Maps & GitHub' },
                  ]}
                  przypis="Basierend auf W3C JSON-LD 1.1 und Google Search Central Richtlinien für Organization."
                />
                <p style={s.akapit}>
                  Weitere Vorlagen für Artikel, Produkte und FAQs finden Sie in unseren{' '}
                  {schemaVorlagen ? <Link href={schemaVorlagen} style={s.podkreslenie}>7 Schema-Markup-Beispielen</Link> : 'Schema-Markup-Beispielen'}{' '}
                  sowie in der{' '}
                  {eeatCheck ? <Link href={eeatCheck} style={s.podkreslenie}>36-Punkte E-E-A-T Checkliste</Link> : 'E-E-A-T Checkliste'}.
                </p>
              </Sekcja>

              <Sekcja id="entitaetsaufbau-fuer-ki-suche" tytul="Wie strukturierte Daten und Off-Page-Signale zusammenspielen">
                <p style={s.akapit}>
                  Während JSON-LD Ihre Unternehmensdaten maschinenlesbar deklariert, prüfen ChatGPT, Perplexity und Google diese Angaben gegen echte Erwähnungen im Netz. Mehr dazu erfahren Sie unter{' '}
                  {geoHub ? <Link href={geoHub} style={s.podkreslenie}>Generative Engine Optimization (GEO)</Link> : 'Generative Engine Optimization (GEO)'}{' '}
                  sowie in unserer Übersicht{' '}
                  {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}{' '}
                  (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.).
                </p>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu JSON-LD @graph, @id und Entity SEO"
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

export default GrafEncjiStronaDe;
