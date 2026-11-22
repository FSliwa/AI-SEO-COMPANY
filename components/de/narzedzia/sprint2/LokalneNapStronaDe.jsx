// Deutsche Werkzeugseite D5: /de/tools/lokales-seo-nap-qr-generator

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
import LokalneNapClientDe from './LokalneNapClientDe';

const KLUCZ = '/narzedzia/audyt-lokalnego-seo-wizytowki';
const SLUG = 'audyt-lokalnego-seo-wizytowki';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/lokales-seo-nap-qr-generator';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://support.google.com/business/answer/7091', nazwa: 'Google Unternehmensprofil-Hilfe: Lokales Ranking auf Google verbessern (Relevanz, Entfernung und Bekanntheit)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/appearance/structured-data/local-business', nazwa: 'Google Search Central: Strukturierte Daten für LocalBusiness (Adresse, Telefon, Öffnungszeiten & Geo)', data: '2026-11-22' },
  { url: 'https://support.google.com/business/answer/3474122', nazwa: 'Google Unternehmensprofil-Hilfe: Kurzlink für Kundenrezensionen erstellen und teilen', data: '2026-11-22' },
  { url: 'https://www.iso.org/standard/83389.html', nazwa: 'ISO/IEC 18004: Internationale Norm für QR-Code-Symbologie und Reed-Solomon-Fehlerkorrektur (Englisch)', data: '2026-11-22' },
];

const FAQ_DE = [
  {
    id: 'was-bedeutet-nap-konsistenz',
    question: 'Was bedeutet NAP-Konsistenz im lokalen SEO für Google Maps?',
    answer: 'NAP steht für Name, Address und Phone (Firmenname, vollständige Anschrift mit Postleitzahl sowie Telefonnummer). Google gleicht diese Angaben zwischen Ihrem Google Unternehmensprofil, Ihrem Impressum/Footer, dem <code>LocalBusiness JSON-LD</code> und Branchenverzeichnissen ab. Abweichende Rufnummern oder unvollständige Adressdaten bremsen Ihre Platzierung im Local Pack.',
  },
  {
    id: 'laeuft-dieser-google-qr-code-jemals-ab',
    question: 'Läuft der hier erstellte QR-Code für Google-Bewertungen irgendwann ab?',
    answer: 'Nein, niemals. Viele kostenlose QR-Generatoren im Netz kodieren heimlich eine eigene Kurz-URL und schalten diese nach einer Testphase kostenpflichtig ab. Unser ISO/IEC-18004-Generator kodiert Ihre echte <code>g.page</code>-Adresse direkt als Vektorgrafik ohne Zwischenserver und ohne Scan-Limit.',
  },
  {
    id: 'wo-finde-ich-meinen-google-bewertungslink',
    question: 'Wo finde ich den offiziellen Bewertungslink meines Google Unternehmensprofils?',
    answer: 'Melden Sie sich mit dem verwaltenden Google-Konto an, suchen Sie bei Google nach Ihrem Firmennamen, klicken Sie im Verwaltungsbereich auf „Um Rezensionen bitten“ und kopieren Sie den angezeigten Link (<code>https://g.page/r/.../review</code>) in das Feld oben.',
  },
  {
    id: 'ist-bewertungs-filterung-erlaubt',
    question: 'Darf ich vor dem Google-Formular unzufriedene Kunden per Umfrage herausfiltern?',
    answer: 'Nein. Sogenanntes „Review Gating“ verstößt ausdrücklich gegen die Google-Richtlinien für nutzergenerierte Inhalte und kann zur Löschung bestehender Bewertungen führen. Verlinken Sie Ihren QR-Code daher immer direkt auf das offizielle Google-Bewertungsfenster.',
  },
  {
    id: 'helfen-google-bewertungen-auch-in-chatgpt',
    question: 'Wirken sich Google-Maps-Bewertungen auch auf Empfehlungen in ChatGPT aus?',
    answer: 'Ja, erheblich. Bei lokalen Suchanfragen (etwa nach Kanzleien, Praxen, Fachbetrieben oder Agenturen in einer bestimmten Stadt) greifen ChatGPT und Perplexity stark auf Google-Maps-Profile, Bewertungsanzahl und gepflegte <code>LocalBusiness</code>-Daten Ihrer Website zurück.',
  },
];

export function LokalneNapStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || 'Lokales SEO: NAP-Prüfer, Bewertungsrechner & Google-QR-Generator';
  const okruszek = nazwy?.okruszek || 'Lokales SEO NAP & QR';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const gbpService = jesli('/pozycjonowanie-wizytowki-google');
  const localSeo = jesli('/seo-lokalne-warszawa');
  const schemaVorlagen = jesli('/narzedzia/dane-strukturalne-json-ld');
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
        name="Local-SEO NAP-Scanner, 5-Sterne-Bewertungsrechner & Google-QR-Code-Generator"
        description="Kostenloses 3-in-1 Local-SEO-Tool: gleicht sichtbare Kontaktdaten mit LocalBusiness-JSON-LD ab, berechnet fehlende 5-Sterne-Bewertungen gegenüber Google-Maps-Wettbewerbern und erstellt einen dauerhaften Druck-QR-Code (SVG & PNG 1024px)."
        url={url}
        category="BusinessApplication"
        language="de"
        featureList={[
          'Abgleich von Firmenname, Telefon, Anschrift, USt-IdNr., Öffnungszeiten und Geo zwischen HTML und JSON-LD',
          'Interaktiver 5-Sterne-Bewertungsrechner mit Wettbewerbsvergleich in Echtzeit',
          'Dauerhaft gültiger ISO/IEC-18004 QR-Code-Generator als Vektor-SVG und 1024px-PNG',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="kalkulator" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses Local-SEO- &amp; Maps-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Prüfen Sie, ob Impressum/Kontakt und LocalBusiness-Schema übereinstimmen, berechnen Sie die fehlenden 5★-Bewertungen bis Platz 1 in Google Maps und laden Sie einen unbegrenzt gültigen Druck-QR-Code herunter.
          </p>

          <LokalneNapClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Top-Platzierungen im Google Maps Local Pack und in lokalen KI-Empfehlungen beruhen auf drei Säulen: präzisen Haupt- und Nebenkategorien im Google Unternehmensprofil, 100 % identischen NAP-Daten zwischen Profil, Website-Text und LocalBusiness-JSON-LD sowie einem stetigen Zufluss echter Kundenbewertungen.
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Das bietet das Local-SEO- & QR-Tool kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  '6-Punkte-Vergleich (Name, Telefon, Adresse, USt-IdNr., Öffnungszeiten, Geo) zwischen HTML und JSON-LD',
                  'Echtzeit-Rechner für fehlende 5★-Rezensionen bis zum Wunsch-Schnitt und zum lokalen Marktführer',
                  'Unbegrenzt gültiger QR-Code nach ISO/IEC 18004 als druckfertiges Vektor-SVG und 1024px-PNG',
                ]}
                przypis="Ohne Abo-Falle und ohne Weiterleitungsserver: Einmal gedruckte Aufsteller funktionieren dauerhaft."
              />

              <Sekcja id="drei-faktoren-fuer-google-maps-top-3" tytul="Was über Top-3-Plätze in Google Maps und lokalen KI-Antworten entscheidet">
                <CompareTable
                  id="tabelle-local-seo-de"
                  caption="Die drei offiziellen Google-Faktoren in der praktischen Umsetzung"
                  columns={[
                    { key: 'faktor', label: 'Google-Faktor' },
                    { key: 'fehler', label: 'Häufiger Fehler vor Ort' },
                    { key: 'praxis', label: 'Sauberer Local-SEO-Standard' },
                  ]}
                  rows={[
                    { id: 'relevanz', faktor: 'Relevanz', fehler: 'Zu allgemeine Hauptkategorie & leerer Leistungsbereich', praxis: 'Präzise Kategorien gespiegelt durch eigene Leistungs-Unterseiten' },
                    { id: 'entfernung', faktor: 'Standort & NAP', fehler: 'Abweichende Telefonnummer in Footer, JSON-LD und Verzeichnissen', praxis: 'Exakt identische PostalAddress, Rufnummer & GeoCoordinates überall' },
                    { id: 'bekanntheit', faktor: 'Bekanntheit & Bewertungen', fehler: 'Alte Bewertungen ohne laufende Neuzugänge oder Antworten', praxis: 'Kontinuierliche 5★-Bewertungen per QR-Aufsteller + fachliche Antworten' },
                  ]}
                  przypis="Quellen: Google Unternehmensprofil-Hilfe und Google Search Central (LocalBusiness)."
                />
                <p style={s.akapit}>
                  Passende JSON-LD-Beispiele finden Sie unter{' '}
                  {schemaVorlagen ? <Link href={schemaVorlagen} style={s.podkreslenie}>Schema Markup Beispiele</Link> : 'Schema Markup Beispiele'}{' '}
                  und unsere laufende Betreuung unter{' '}
                  {gbpService ? <Link href={gbpService} style={s.podkreslenie}>Google Unternehmensprofil optimieren</Link> : 'Google Unternehmensprofil optimieren'}.
                </p>
              </Sekcja>

              <Sekcja id="einsatzorte-fuer-bewertungs-qr-codes" tytul="Wo gedruckte Bewertungs-QR-Codes die höchste Rücklaufquote erzielen">
                <ul style={s.lista}>
                  <li><strong>Empfangstheke, Praxis &amp; Besprechungsraum:</strong> Platzieren Sie das Vektor-<code>SVG</code> auf einem kompakten Tischaufsteller direkt am Point of Sale.</li>
                  <li><strong>Rechnungen, Abnahmeprotokolle &amp; Pakete:</strong> Binden Sie das <code>1024px-PNG</code> mit einer freundlichen Bitte auf Lieferscheinen oder Rechnungs-PDFs ein.</li>
                  <li><strong>Außendienst &amp; Handwerk:</strong> Drucken Sie den QR-Code auf die Rückseite Ihrer Visitenkarten. Kombinieren Sie dies mit{' '}
                    {localSeo ? <Link href={localSeo} style={s.podkreslenie}>Local SEO</Link> : 'Local SEO'}{' '}
                    und prüfen Sie unsere Konditionen unter{' '}
                    {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}{' '}
                    (ab {eur(CENY.seoStandard.eur, 'de')} netto/Mon.).
                  </li>
                </ul>
              </Sekcja>

              <WeitereToolsDe bez={KLUCZ} />
            </div>
            <NawBok rootId="nw-tresc" />
          </div>
        </div>
      </section>

      <AppleFaq
        faqData={FAQ_DE.map((f) => ({ ...f, questionEn: f.question, answerEn: f.answer, idEn: f.id }))}
        title="Häufige Fragen zu NAP-Konsistenz, Google-Bewertungen und QR-Codes"
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

export default LokalneNapStronaDe;
