// Deutsche Werkzeugseite D2: /de/tools/weiterleitungen-hreflang-pruefen

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
import PrzekierowaniaHreflangClientDe from './PrzekierowaniaHreflangClientDe';

const KLUCZ = '/narzedzia/sprawdz-przekierowania-hreflang';
const SLUG = 'sprawdz-przekierowania-hreflang';
const ZAPAS_URL = 'https://www.ai-seo-company.pl/de/tools/weiterleitungen-hreflang-pruefen';
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

const ZRODLA_DE = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/301-redirects', nazwa: 'Google Search Central: Weiterleitungen und die Google-Suche (301, 308, 302 und Ketten)', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls', nazwa: 'Google Search Central: Doppelte URLs zusammenfassen und rel="canonical" korrekt setzen', data: '2026-11-22' },
  { url: 'https://developers.google.com/search/docs/specialty/international/localized-versions', nazwa: 'Google Search Central: Lokalisierte Versionen Ihrer Seiten (hreflang-Rücklinks & x-default)', data: '2026-11-22' },
  { url: 'https://datatracker.ietf.org/doc/html/rfc7538', nazwa: 'IETF RFC 7538: HTTP-Statuscode 308 Permanent Redirect (Englisch)', data: '2026-11-22' },
];

const FAQ_DE = [
  {
    id: 'unterschied-301-308-und-302',
    question: 'Behandelt Google den Statuscode 308 genauso wie 301 - und warum schadet 302?',
    answer: 'Ja. Laut Google Search Central gelten sowohl 301 (Moved Permanently) als auch 308 (Permanent Redirect, Standard etwa bei Next.js und Vercel) als dauerhafte Weiterleitungen mit voller Signalweitergabe. Die Codes 302 und 307 signalisieren dagegen einen vorübergehenden Umzug und führen häufig dazu, dass alte Host-Varianten monatelang im Index verbleiben.',
  },
  {
    id: 'warum-mehrstufige-weiterleitungen-vermeiden',
    question: 'Warum kostet eine 2-Sprung-Kette (http -> https -> https://www) Ladezeit und Autorität?',
    answer: 'Jeder zusätzliche Weiterleitungssprung erzwingt einen weiteren Netzwerk-Roundtrip auf Mobilgeräten, belastet das Crawl-Budget und verwässert Backlink-Signale aus Branchenbüchern, die Ihre Adresse ohne www oder mit http verlinkt haben. Idealerweise bündelt eine einzige Serverregel Protokoll und Hostnamen direkt zum Ziel.',
  },
  {
    id: 'was-bedeutet-hreflang-reziprozitaet',
    question: 'Was bedeutet die zwingende Rückverlinkung (Reziprozität) bei hreflang?',
    answer: 'Google erkennt Sprachverknüpfungen nur dann an, wenn beide Seiten sich gegenseitig bestätigen: Verweist die deutsche Seite <code>/de/leistungen</code> per <code>hreflang=&quot;en&quot;</code> auf <code>/en/services</code>, muss die englische Seite zwingend zurück auf <code>/de/leistungen</code> zeigen. Fehlt der Rücklink oder liefert die Ziel-URL eine 301-Weiterleitung statt Status 200, ignoriert Google das Signal.',
  },
  {
    id: 'wofuer-dient-hreflang-x-default',
    question: 'Wann benötige ich das Attribut hreflang="x-default"?',
    answer: 'Der Eintrag <code>x-default</code> definiert die Standard-Zielseite für Nutzer, deren Spracheinstellung zu keiner Ihrer ausdrücklich hinterlegten Sprachversionen passt. Im internationalen B2B-Geschäft verweist <code>x-default</code> in der Regel auf die englische Hauptversion oder Ihre zentrale Startseite.',
  },
  {
    id: 'widerspruch-zwischen-canonical-und-301',
    question: 'Was passiert, wenn das Canonical-Tag einer 301-Weiterleitung widerspricht?',
    answer: 'Leitet der Server Besucher per 301 auf <code>https://www.firma.de/</code> weiter, während im HTML noch <code>&lt;link rel=&quot;canonical&quot; href=&quot;https://firma.de/&quot;&gt;</code> steht, sendet die Website widersprüchliche Signale. In der Search Console erscheint dann häufig „Duplikat - Google hat eine andere kanonische Seite als der Nutzer bestimmt“.',
  },
];

export function PrzekierowaniaHreflangStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE[SLUG];
  const h1 = wpis?.h1 || '301-Weiterleitungen, Canonical & hreflang online prüfen';
  const okruszek = nazwy?.okruszek || 'Weiterleitungen & hreflang';
  const url = urlDe(KLUCZ) || ZAPAS_URL;
  const zrodla = nazwy?.zrodla
    ? ZRODLA_DE.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }))
    : ZRODLA_DE;

  const auditTool = jesli('/narzedzia/audyt-seo');
  const nextVergleich = jesli('/porownania/nextjs-vs-wordpress-seo');
  const webflowVergleich = jesli('/porownania/webflow-vs-wordpress-seo');
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
        name="301-Weiterleitungs-, Canonical- & hreflang-Prüfer"
        description="Kostenloser Technik-Check für SEO & Internationalisierung: prüft alle 4 Host-Varianten (http, https, www) auf Weiterleitungsketten, gleicht Canonical-Tags ab, validiert die gegenseitige hreflang-Matrix (DE/AT/CH/EN) und generiert Server-Regeln."
        url={url}
        category="DeveloperApplication"
        language="de"
        featureList={[
          'Prüfung aller 4 Domain-Varianten (http, https, http://www, https://www) inklusive Sprunganzahl',
          'Abgleich von HTML-Canonical und HTTP-Link-Header mit der endgültigen Zieladresse',
          'Live-Prüfung der gegenseitigen A<->B-Rückverlinkung bei hreflang und x-default',
          '1-Klick-Serverregeln für next.config.mjs, Nginx, Apache .htaccess und Cloudflare',
        ]}
      />

      <section className={st.hero} style={s.hero}>
        <Ozdoba rodzaj="audyt" />
        <div className="container" style={s.kontener}>
          <div className="section-header" style={{ margin: '0 0 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Kostenloses Technical- &amp; DACH-SEO-Tool
            </div>
            <h1 style={s.h1}>{h1}</h1>
          </div>

          <p className={st.lead} style={s.lead}>
            Prüfen Sie in wenigen Sekunden, ob Ihre Domain durch 2-stufige Weiterleitungsketten, widersprüchliche Canonicals oder fehlerhafte hreflang-Rückverweise Rankingkraft verliert - inklusive kopierfertiger Server-Konfiguration.
          </p>

          <PrzekierowaniaHreflangClientDe />

          <div style={s.poNarzedziu}>
            <AnswerBox etykieta="Kurzantwort">
              Für eine saubere Indexierung müssen alle drei nicht-kanonischen Host-Varianten (http://, https:// und http://www. - oder umgekehrt) in einem einzigen dauerhaften 301/308-Sprung auf Ihre Zieladresse leiten, die ein identisches Self-Canonical trägt. Auf mehrsprachigen Websites (etwa für Deutschland, Österreich, die Schweiz und internationale Märkte) muss zudem jeder hreflang-Verweis von Seite A auf Seite B durch einen Rücklink von B auf A bestätigt werden.
            </AnswerBox>
          </div>

          <div className={st.tresc} id="nw-tresc">
            <div className={st.trescGlowna}>
              <CoDostajesz
                id="was-sie-erhalten"
                tytul="Das prüft der Weiterleitungs- & hreflang-Inspektor kostenlos"
                tytulOdRazu="Sofort im Browser, ohne E-Mail"
                odRazu={[
                  'Übersichtliche Hop-by-Hop-Tabelle für http://, https://, http://www. und https://www.',
                  'Canonical-Abgleich zwischen HTML-<head>, HTTP-Link-Header und realer Ziel-URL',
                  'Gegenseitigkeits-Matrix für hreflang-Attribute samt HTTP-200-Check und x-default',
                  '4 fertige Konfigurationsvorlagen für Next.js, Nginx, Apache (.htaccess) und Cloudflare',
                ]}
                przypis="Teilbarer Diagnose-Link (?url=...) für die direkte Abstimmung mit IT, Hosting oder Agentur."
              />

              <Sekcja id="typische-weiterleitungs-und-canonical-fehler" tytul="4 häufige Weiterleitungs- & hreflang-Fehler im DACH-Mittelstand">
                <CompareTable
                  id="tabelle-redirect-fehler-de"
                  caption="Typische technische Schwachstellen und die saubere Serverlösung"
                  columns={[
                    { key: 'fehler', label: 'Technisches Problem' },
                    { key: 'wirkung', label: 'Folge für Google & KI-Crawler' },
                    { key: 'loesung', label: 'Empfohlene Korrektur' },
                  ]}
                  rows={[
                    { id: 'zwei-hops', fehler: '2-Sprung-Kette (http -> https -> www)', wirkung: 'Erhöht mobile Antwortzeiten und schwächt Backlinks aus älteren Verzeichnissen', loesung: 'Protokoll- und Hostwechsel in 1 direkten 301/308-Sprung bündeln' },
                    { id: 'code-302', fehler: 'Temporäre 302 / 307 Weiterleitung', wirkung: 'Alte URLs bleiben im Index, Signale werden nicht dauerhaft übertragen', loesung: 'Dauerhaften Statuscode 301 oder 308 verwenden' },
                    { id: 'can-konflikt', fehler: 'Canonical zeigt auf weiterleitende URL', wirkung: 'Search-Console-Warnung zu abweichender kanonischer URL', loesung: 'Exakte 200-OK-Zieladresse als Self-Canonical ausgeben' },
                    { id: 'hreflang-einseitig', fehler: 'Einseitiges hreflang oder 301-Ziel', wirkung: 'Falsche Sprachversion rankt in DE/AT/CH oder auf Google.com', loesung: 'Vollständige A<->B-Rückverlinkung nur auf Status-200-Seiten' },
                  ]}
                  przypis="Quellen: Google Search Central Richtlinien zu Weiterleitungen, Canonical-Tags und lokalisierten Seiten."
                />
                <p style={s.akapit}>
                  Für eine vollständige Prüfung von bis zu 25 Unterseiten nutzen Sie ergänzend unseren{' '}
                  {auditTool ? <Link href={auditTool} style={s.podkreslenie}>kostenlosen SEO Audit</Link> : 'kostenlosen SEO Audit'}.
                </p>
              </Sekcja>

              <Sekcja id="mehrsprachige-architektur-dach-und-en" tytul="Saubere hreflang-Architektur für DE, AT, CH und internationale Märkte">
                <ul style={s.lista}>
                  <li><strong>Selbstreferenz ist Pflicht:</strong> Jede Sprachversion muss neben allen Übersetzungen auch sich selbst im <code>hreflang</code>-Block aufführen.</li>
                  <li><strong>Nur fertige 200-OK-Seiten verknüpfen:</strong> Verweisen Sie niemals per <code>hreflang</code> auf unveröffentlichte Pfade oder 301-Weiterleitungen.</li>
                  <li><strong>Systemvergleich:</strong> Wie sauber Next.js Mehrsprachigkeit im Vergleich zu klassischen Plugins löst, zeigen wir unter{' '}
                    {nextVergleich ? <Link href={nextVergleich} style={s.podkreslenie}>Next.js vs. WordPress für SEO</Link> : 'Next.js vs. WordPress'}{' '}
                    und{' '}
                    {webflowVergleich ? <Link href={webflowVergleich} style={s.podkreslenie}>Webflow vs. WordPress</Link> : 'Webflow vs. WordPress'}. Unsere laufenden Pakete (Audits ab {eur(CENY.audytSeo.eur, 'de')} netto) finden Sie unter{' '}
                    {seoKosten ? <Link href={seoKosten} style={s.podkreslenie}>SEO Kosten &amp; Pakete</Link> : 'SEO Kosten & Pakete'}.
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
        title="Häufige Fragen zu 301-Weiterleitungen, Canonicals und hreflang"
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

export default PrzekierowaniaHreflangStronaDe;
