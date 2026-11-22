// Deutsche Seite /de/tools/website-relaunch-mockup (E2, 8. interaktives Tool DE).
// Server-Komponente analog zu components/narzedzia/MakietaStrona.jsx (PL/EN) und AudytSeoStronaDe.jsx.
// Alle Preise in EUR aus CENY, Limits aus MAKIETA, echte Vorher-/Nachher-Beispiele vom 18.11.2026 (Staniax & Madame Thai).

import { Link } from '@/i18n/routing';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { CENY, MAKIETA } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import stPrzyklady from '@/components/narzedzia/makieta-przyklady.module.css';
import * as s from '@/components/narzedzia/styl';
import { UkladDe, WeitereToolsDe } from './UkladDe';
import MakietaClientDe from './MakietaClientDe';

const KLUCZ = '/narzedzia/makieta-redesignu';
const jesli = (k) => (maWersjeDe(k) ? k : null);

const KAT_OBRAZOW = '/images/narzedzia/makieta';
const obraz = (baza, szerokosci, width, height) => ({
  src: `${KAT_OBRAZOW}/${baza}-${szerokosci[szerokosci.length - 1]}.webp`,
  srcSet: szerokosci.map((w) => `${KAT_OBRAZOW}/${baza}-${w}.webp ${w}w`).join(', '),
  width,
  height,
});
const KOMP = [720, 1080, 1440];
const TEL = [600, 900, 1200];

const KLIENCI_DE = [
  {
    id: 'staniax',
    nazwa: 'Staniax',
    domena: 'staniax.pl',
    url: 'https://www.staniax.pl/',
    branza: 'Vakuummetallisierung, Lackierung und Scheinwerfer-Aufbereitung',
    przebieg: 'Gestartet am 18. November 2026 um 13:04 Uhr, fertig nach 93 Sekunden, das Mockup umfasst 6 Sektionen.',
    komputer: {
      ...obraz('staniax-redesign-mockup-before-after-desktop', KOMP, 1440, 1942),
      alt: 'Staniax auf dem Computer, vorher und nachher: oben die bestehende Startseite mit ganzflächigem Skulpturenfoto, darunter die erste Sektion des KI-Mockups mit klarem Leistungsversprechen, zwei Buttons und drei Stärkenkarten.',
      przed: 'die bestehende Startseite. Den gesamten ersten Bildschirm füllt das Foto einer goldenen Skulptur ohne sichtbare Überschrift. Oben stehen fünf Menüpunkte, Telefonnummer, Sprachumschalter (PL, EN, DE) und ein Anfrage-Button.',
      po: 'die erste Sektion des Mockups in derselben Fenstergröße. Überschrift, Leistungsbeschreibung, zwei Kontaktbuttons und drei Faktenkarten (seit 1993, Standort bei Warschau, Alternative zur Galvanik) passen sofort auf den ersten Bildschirm.',
    },
    telefon: {
      ...obraz('staniax-redesign-mockup-before-after-phone', TEL, 1200, 1333),
      alt: 'Staniax auf dem Smartphone, vorher und nachher: links das bildschirmfüllende Foto ohne Leistungstext, rechts das Mockup mit sichtbarer Überschrift, Beschreibung und zwei Kontaktbuttons.',
      przed: 'die aktuelle Seite auf dem Smartphone. Das Foto füllt den kompletten Bildschirm, das Menü liegt hinter einem Icon.',
      po: 'das Mockup auf dem Smartphone. Überschrift, Kurztext und beide Handlungsbuttons sind sofort ohne Scrollen sichtbar; die horizontale Menüleiste schneidet den fünften Punkt am rechten Rand ab.',
    },
  },
  {
    id: 'madamethai',
    nazwa: 'Madame Thai',
    domena: 'madamethai.pl',
    url: 'https://www.madamethai.pl/',
    branza: 'Thailändisches Restaurant im Zentrum von Warschau',
    przebieg: 'Gestartet am 18. November 2026 um 13:06 Uhr, fertig nach 94 Sekunden, das Mockup umfasst 6 Sektionen.',
    komputer: {
      ...obraz('madamethai-redesign-mockup-before-after-desktop', KOMP, 1440, 1942),
      alt: 'Madame Thai auf dem Computer, vorher und nachher: oben das dunkle Innenraumfoto mit zentriertem Schriftzug, darunter der Entwurf mit linksbündiger Überschrift, Telefonbutton sowie Adresse und Öffnungszeiten.',
      przed: 'die aktuelle Startseite mit dunklem Innenraumfoto, zentriertem Titel, acht Menüpunkten sowie Buttons für Speisekarte und Tischreservierung in Gold-Beige.',
      po: 'die erste Sektion des Mockups. Die Überschrift steht linksbündig, der Reservierungsbutton zeigt direkt die Telefonnummer, und Adresse samt Öffnungszeiten erscheinen noch im ersten Bildschirm.',
    },
    telefon: {
      ...obraz('madamethai-redesign-mockup-before-after-phone', TEL, 1200, 1333),
      alt: 'Madame Thai auf dem Smartphone, vorher und nachher: links die dunkle Startseite, rechts der KI-Entwurf mit Telefonbutton, Speisekarten-Link sowie Adresse und Öffnungszeiten.',
      przed: 'die bestehende mobile Ansicht mit verstecktem Burgermenü und tief sitzenden Buttons.',
      po: 'das Mockup auf dem Smartphone. Überschrift, Beschreibung, beide Buttons auf voller Breite sowie Adresse und Öffnungszeiten passen auf den ersten Bildschirm.',
    },
  },
];

const ZRODLA_DE = [
  {
    url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes',
    nazwa: 'Google Search Central: Website-Umzug mit URL-Änderungen (301-Weiterleitungen beim Relaunch)',
    data: '2026-11-12',
  },
  {
    url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing',
    nazwa: 'Google Search Central: Mobile-First-Indexierung (Google bewertet primär die Smartphone-Version)',
    data: '2026-11-12',
  },
  {
    url: 'https://www.w3.org/TR/WCAG22/#contrast-minimum',
    nazwa: 'W3C: WCAG 2.2, Erfolgskriterium 1.4.3 Kontrast (Minimum) von 4,5:1',
    data: '2026-11-12',
  },
];

const FAQ_DE = [
  {
    id: 'wie-entsteht-das-mockup',
    question: 'Wie entsteht das Website-Relaunch-Mockup?',
    answer: 'Wir rufen Ihre öffentliche Startseite ab, lesen Name, Überschriften, Navigation, Leistungsbeschreibungen, Kontaktdaten und Markenfarben aus und erstellen einen Screenshot des Ist-Zustands. Das KI-Modell Claude entwirft daraus eine neue Startseite für Computer und Smartphone. Es ist angewiesen, keine Zahlen, Kundenstimmen, Auszeichnungen oder Preise hinzuzuerfinden, sondern ausschließlich Inhalte Ihrer Seite zu nutzen; prüfen Sie den Entwurf vor der Weiterverwendung dennoch gegen.',
  },
  {
    id: 'kann-ich-das-mockup-live-schalten',
    question: 'Kann ich das Mockup direkt als fertige Website veröffentlichen?',
    answer: 'Nein. Das Mockup ist ein visueller Strukturvorschlag für das Gespräch mit Geschäftsführung, Marketing oder Agentur und noch keine produktionsreife Website. Vor dem Livegang müssen Bildmaterial, Unterseiten, Ladezeiten, strukturierte Daten, Weiterleitungen und Rechtstexte sauber umgesetzt werden.',
  },
  {
    id: 'aendert-das-tool-etwas-an-meiner-website',
    question: 'Verändert das Tool etwas an meiner bestehenden Website?',
    answer: 'Nein. Unser Server liest lediglich Ihre öffentlich erreichbare Startseite wie ein normaler Browser. Der erzeugte Entwurf ist eine statische HTML-Datei ohne Skripte in einem isolierten Rahmen (Sandbox-Iframe) und ist über den E-Mail-Link 60 Tage lang abrufbar.',
  },
  {
    id: 'schadet-ein-relaunch-meinem-seo',
    question: 'Gefährdet ein Website-Relaunch meine bestehenden Google-Rankings?',
    answer: 'Das Mockup selbst berührt Ihre Website nicht. Beim späteren Relaunch entstehen Rankingverluste vor allem dann, wenn URLs ohne 301-Weiterleitung geändert, rankende Texte gekürzt oder Ladezeiten verschlechtert werden. Deshalb verbinden wir jeden Relaunch mit einer vollständigen URL-Zuordnung und technischer SEO-Abnahme.',
  },
  {
    id: 'erfindet-die-ki-inhalte',
    question: 'Verändert oder erfindet die KI Texte auf meiner Seite?',
    answer: 'Das Modell strafft und ordnet die vorhandenen Texte Ihrer Startseite neu. Es erhält die ausdrückliche Vorgabe, keine Erfahrungsjahre, Referenzen, Preise oder Zertifikate zu erfinden. Da Sprachmodelle trotzdem Fehler machen können, dient der Entwurf als Layout-Richtung und nicht als ungeprüfte Textvorlage.',
  },
  {
    id: 'konto-oder-kreditkarte',
    question: 'Brauche ich ein Nutzerkonto oder eine Kreditkarte?',
    answer: `Nein. Den ersten Bildschirm des neuen Entwurfs sehen Sie sofort ohne Registrierung neben Ihrer aktuellen Startseite. Für die vollständige Ansicht aller Sektionen genügt Ihre E-Mail-Adresse, an die wir den Direktlink senden. Das Tageslimit liegt bei ${MAKIETA.limitIp} Entwürfen pro IP-Adresse.`,
  },
  {
    id: 'feld-verbesserung',
    question: 'Was trage ich unter „Was soll sich verbessern?“ ein?',
    answer: 'Ihr wichtigstes Geschäftsziel für den Relaunch, etwa „mehr qualifizierte B2B-Anfragen“, „Telefonnummer sofort sichtbar“ oder „klarere Darstellung unserer drei Kernleistungen“. Das Modell gewichtet danach den Kopfbereich und die Handlungsaufforderungen. Das Feld ist freiwillig.',
  },
  {
    id: 'was-kostet-die-umsetzung',
    question: 'Was kostet eine neue Unternehmenswebsite auf Basis des Mockups?',
    answer: `Das Mockup selbst ist kostenlos. Eine individuell programmierte Next.js-Unternehmenswebsite inklusive technischem SEO und 301-Migration realisieren wir ab ${eur(CENY.strona.eur)} netto zum Festpreis oder für 0 € Einmalkosten im Paket Booster Pack (${eur(CENY.boosterPack.eur)} netto/Monat, Mindestlaufzeit ${CENY.boosterPack.umowaMiesiecy} Monate). Ein verbindliches Angebot erhalten Sie werktags innerhalb von 24 Stunden.`,
  },
];

function VorherNachherDe() {
  return (
    <div className={stPrzyklady.lista}>
      {KLIENCI_DE.map((k) => {
        const idK = `${k.id}-komputer-de`;
        const idT = `${k.id}-telefon-de`;
        const nazwaGrupy = `widok-${k.id}-de`;
        return (
          <article className={`${stPrzyklady.kafel} mak-kafel`} key={k.id} aria-labelledby={`naglowek-${k.id}-de`}>
            <header className={`${stPrzyklady.naglowek} r-wej`}>
              <h3 className={stPrzyklady.nazwa} id={`naglowek-${k.id}-de`}>{k.nazwa}</h3>
              <p className={stPrzyklady.meta}>
                Website: <a href={k.url} rel="noopener noreferrer" target="_blank">{k.domena}</a>
                <span aria-hidden="true"> · </span>
                {k.branza}
              </p>
              <p className={stPrzyklady.meta}>{k.przebieg}</p>
            </header>
            <fieldset className={stPrzyklady.grupa}>
              <legend className={stPrzyklady.legenda}>Vorschau wählen</legend>
              <input className={`${stPrzyklady.radio} ${stPrzyklady.radioK}`} type="radio" name={nazwaGrupy} id={idK} defaultChecked />
              <label className={stPrzyklady.przelacznik} htmlFor={idK}>Computer</label>
              <input className={`${stPrzyklady.radio} ${stPrzyklady.radioT}`} type="radio" name={nazwaGrupy} id={idT} />
              <label className={stPrzyklady.przelacznik} htmlFor={idT}>Smartphone</label>
              {[['komputer', stPrzyklady.panelKomputer], ['telefon', stPrzyklady.panelTelefon]].map(([urz, klasa]) => {
                const o = k[urz];
                return (
                  <figure className={`${stPrzyklady.panel} ${klasa} mak-panel`} key={urz}>
                    {/* eslint-disable-next-line @next/next/no-img-element -- statische WebP-Dateien in 3 Auflösungen */}
                    <img
                      className={urz === 'komputer' ? stPrzyklady.obrazKomputer : stPrzyklady.obrazTelefon}
                      src={o.src}
                      srcSet={o.srcSet}
                      sizes={urz === 'komputer' ? '(max-width: 900px) calc(100vw - 2rem), 860px' : '(max-width: 760px) calc(100vw - 2rem), 760px'}
                      alt={o.alt}
                      width={o.width}
                      height={o.height}
                      loading="lazy"
                      decoding="async"
                    />
                    <figcaption className={stPrzyklady.podpis}>
                      <span><strong>Vorher:</strong> {o.przed}</span>
                      <span><strong>Nachher:</strong> {o.po}</span>
                      {urz === 'komputer' && (
                        <span>
                          <a className={stPrzyklady.link1440} href={o.src} target="_blank" rel="noopener noreferrer">
                            Desktop-Screenshot in voller Größe öffnen
                          </a>
                        </span>
                      )}
                    </figcaption>
                  </figure>
                );
              })}
            </fieldset>
          </article>
        );
      })}
    </div>
  );
}

export default function MakietaStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const nazwy = STRONY_NARZEDZI_DE['makieta-redesignu'];
  const h1 = wpis?.h1 ?? 'Website Relaunch Mockup: neue Startseite mit KI aus Ihren Inhalten';
  const okruszek = nazwy?.okruszek ?? 'Website Relaunch Mockup';
  const minuty = MAKIETA.minut.replace('-', ' bis ');
  const cenaStrona = eur(CENY.strona.eur);
  const cenaBooster = eur(CENY.boosterPack.eur);
  const audytDarmowy = jesli('/narzedzia/audyt-seo');
  const projektowanie = jesli('/projektowanie-stron-internetowych');
  const migracjaCheck = jesli('/narzedzia/checklista-migracji-strony');

  return (
    <UkladDe
      klucz={KLUCZ}
      tag="Kostenloses Tool"
      h1={h1}
      okruszek={okruszek}
      zrodla={ZRODLA_DE}
      schema={{
        name: 'Website Relaunch Mockup Generator mit KI',
        description: 'Kostenloser Relaunch-Mockup-Generator: entwirft aus der Adresse Ihrer bestehenden Website einen neuen Startseiten-Vorschlag für Computer und Smartphone auf Basis Ihrer echten Inhalte.',
        category: 'DesignApplication',
        featureList: [
          'Neuer Startseiten-Entwurf aus Ihren bestehenden Texten',
          'Vorschau für Computer und Smartphone',
          'Direktvergleich neben dem aktuellen Zustand',
        ],
        screenshot: {
          url: KLIENCI_DE[0].komputer.src,
          width: KLIENCI_DE[0].komputer.width,
          height: KLIENCI_DE[0].komputer.height,
        },
      }}
      lead={`Geben Sie Ihre aktuelle Domain ein: In ${minuty} Minuten entwirft die KI aus Ihren vorhandenen Inhalten eine klar strukturierte neue Startseite für Computer und Smartphone. Den ersten Bildschirm sehen Sie sofort ohne Konto.`}
      narzedzie={<MakietaClientDe />}
      odpowiedz="Ein Website-Relaunch-Mockup ist ein konkreter Gestaltungsvorschlag für Ihre neue Startseite, den ein KI-Modell ausschließlich aus den Inhalten Ihrer bestehenden Website aufbaut: Firmenname, Überschriften, Navigation, Leistungsbeschreibungen, Kontaktdaten und Markenfarben. Sie sehen sofort den neuen Kopfbereich neben Ihrer heutigen Seite und erhalten nach E-Mail-Angabe alle Sektionen samt Smartphone-Ansicht als Diskussionsgrundlage für Ihren Relaunch."
      faq={FAQ_DE}
      tytulFaq="Häufige Fragen zum Website Relaunch Mockup"
    >
      <CoDostajesz
        id="was-sie-erhalten"
        tytul="Das erhalten Sie im kostenlosen Relaunch-Tool"
        tytulOdRazu="Sofort, ohne Anmeldung"
        tytulPoEmailu="Nach Angabe Ihrer E-Mail-Adresse"
        odRazu={[
          'Einen aktuellen Screenshot Ihrer bestehenden Startseite (sofern der Screenshot-Dienst innerhalb von 30 Sekunden antwortet).',
          'Direkt daneben den ersten Bildschirm des neuen Entwurfs mit Header, Navigation und Hero-Bereich.',
          'Keine Registrierung, keine Zahlungsdaten und keine Installation.',
        ]}
        poEmailu={[
          'Das vollständige Mockup mit 4 bis 6 Sektionen aus Ihren Inhalten plus Footer.',
          'Einen Umschalter zwischen Computer- und Smartphone-Ansicht (390 px).',
          'Einen 60 Tage gültigen Direktlink für die Abstimmung im Team oder mit Ihrer Agentur.',
        ]}
      >
        <p style={{ ...s.akapit, marginTop: '1rem' }}>
          <strong>So nutzen Sie das Ergebnis:</strong> Betrachten Sie das Mockup als strukturelle Richtung für Informationsarchitektur, Einstieg und Handlungsaufforderungen. Eigene Fotos, Feintexte und technisches SEO folgen bei der Umsetzung.
        </p>
      </CoDostajesz>

      <Sekcja id="beispiele-vorher-nachher" tytul="Echte Vorher-Nachher-Beispiele: Kundenwebsites Staniax und Madame Thai">
        <p style={s.akapit}>
          Statt geschönter Konzeptgrafiken zeigen wir die ungefilterte Ausgabe des Tools für zwei reale Websites unserer Kunden: Staniax (Oberflächentechnik und Vakuummetallisierung) sowie Madame Thai (Restaurant in Warschau). Am 18. November 2026 haben wir beide Domains ohne Zusatzangaben im Feld „Was soll sich verbessern?“ durchlaufen lassen. Nach 93 bzw. 94 Sekunden standen jeweils 6 Sektionen bereit.
        </p>
        <p style={s.akapit}>
          Alle Screenshots entstanden im selben Browser bei identischer Auflösung (1280 x 800 Pixel auf dem Computer, 390 x 844 Pixel auf dem Smartphone) ohne nachträgliche Korrekturen am generierten HTML-Code. Da beide Websites auf Polnisch veröffentlicht sind, behält auch der Entwurf die Originalsprache der Website bei.
        </p>
        <VorherNachherDe />
        <p style={s.przypis}>
          Unbearbeitete Tool-Ausgabe vom 18. November 2026. Die Sektionen 2 bis 6 bleiben hier wie im Live-Tool ausgeblendet, da sie nach E-Mail-Freischaltung bereitstehen.
        </p>
      </Sekcja>

      <Sekcja id="was-das-mockup-verbessert" tytul="Was der KI-Entwurf verbessert hat und wo ein Mensch nachschärfen muss">
        <p style={s.akapit}>
          Genau so empfehlen wir auch die Prüfung Ihres eigenen Entwurfs: Trennen Sie klar zwischen gewonnenen Stärken im Einstiegsbereich und Punkten, die vor einer technischen Umsetzung angepasst werden müssen.
        </p>
        <h3 style={s.h3}>Was sofort klarer geworden ist</h3>
        <ul style={s.lista}>
          <li><strong>Staniax zeigt das Angebot ohne Scrollen:</strong> Statt eines bildschirmfüllenden Skulpturenfotos stehen Kernleistung, Angebots-Button, Telefonnummer und drei Vertrauensfakten direkt im ersten Sichtfeld.</li>
          <li><strong>Madame Thai holt Reservierung und Standort nach oben:</strong> Der Reservierungsbutton trägt die Telefonnummer, und Adresse sowie Öffnungszeiten sind auch mobil sofort lesbar.</li>
          <li><strong>Faktentreue gegenüber dem Quelltext:</strong> Gründungsjahr 1993, technische Angaben, Telefonnummern und Öffnungszeiten stammen unverändert aus dem HTML der Kundenwebsites; das Modell hat keine erfundenen Zahlen ergänzt.</li>
          <li><strong>Beibehaltene Hauptüberschrift:</strong> In beiden Fällen übernahm das Tool die vorhandene H1-Überschrift als klaren Anker für den Einstieg.</li>
        </ul>
        <h3 style={s.h3}>Was bei der echten Entwicklung ergänzt werden muss</h3>
        <ul style={s.lista}>
          <li><strong>Reduzierte Hauptnavigation:</strong> Sprachumschalter (PL/EN/DE bei Staniax) sowie Galerie- und Referenzlinks fielen der Straffung auf eine einzelne Startseite zum Opfer und gehören in einer echten Website wieder sauber eingeplant.</li>
          <li><strong>Seitlich scrollendes Mobilmenü:</strong> Auf schmalen Bildschirmen läuft der fünfte Menüpunkt aus dem Sichtfeld; im Produktiveinsatz lösen wir das über ein zugängliches Mobilmenü.</li>
          <li><strong>Logo und Bildwelt:</strong> Da das Tool keine neuen Fotografien erzeugt, greift es auf Favicon und Open-Graph-Vorschaubild zurück. Individuelle Werk- oder Teamfotos machen erst den Markencharakter aus.</li>
        </ul>
      </Sekcja>

      <Sekcja id="ablauf-in-3-schritten" tytul="So entsteht der Entwurf in 3 Schritten">
        <ol style={s.lista}>
          <li><strong>Analyse Ihrer Startseite:</strong> Unser Server liest Titel, H1- und H2-Überschriften, Menülinks, Leistungstexte, Kontaktdaten sowie Hex-Farbwerte aus dem HTML und erstellt einen aktuellen Screenshot.</li>
          <li><strong>Strukturentwurf durch KI:</strong> Das Modell gliedert Ihre Inhalte in einen aufgeräumten Header, einen konversionsstarken Hero-Bereich sowie 4 bis 6 Folgesektionen mit Footer für Desktop und Smartphone.</li>
          <li><strong>Direktvergleich im Browser:</strong> Sie vergleichen Alt und Neu nebeneinander und schalten bei Bedarf die komplette Seite samt 60-Tage-Teillink frei.</li>
        </ol>
        <p style={s.akapit}>
          Wenn Ihre aktuelle Website Inhalte erst per Client-JavaScript nachlädt, sieht der Generator weniger Ausgangstext. Ob das auf Ihre Domain zutrifft, zeigt Ihnen unser{' '}
          {audytDarmowy ? <Link href={audytDarmowy} style={s.podkreslenie}>kostenloser SEO Audit</Link> : 'kostenloser SEO Audit'}.
        </p>
      </Sekcja>

      <Sekcja id="vorbereitung-der-seite" tytul="Wie Sie das beste Ergebnis aus Ihrer aktuellen Startseite herausholen">
        <ul style={s.lista}>
          <li><strong>Klare H1-Überschrift:</strong> Sagt Ihre H1 präzise, was Sie für wen und in welcher Region leisten, sitzt auch der erste Bildschirm des Entwurfs sofort.</li>
          <li><strong>Eigene H2 je Kernleistung:</strong> Das Tool liest bis zu 12 H2-Überschriften aus und baut daraus die Leistungssektionen auf.</li>
          <li><strong>Telefon und E-Mail als echter Text:</strong> Nur im HTML lesbare Kontaktdaten landen automatisch in den Kontaktbuttons des Entwurfs.</li>
          <li><strong>Aussagekräftiges og:image und Favicon:</strong> Diese beiden Grafiken nutzt der Generator für Markenlogo und Kopfbereich.</li>
        </ul>
      </Sekcja>

      <Sekcja id="naechste-schritte" tytul="Wie es nach dem Mockup weitergeht">
        <ul style={s.lista}>
          <li>
            <strong>Schlüsselfertige Umsetzung durch uns:</strong> Wir programmieren schnelle Unternehmenswebsites in Next.js SSR ab {cenaStrona} netto zum Festpreis oder für 0 € Setup im Paket Booster Pack ({cenaBooster} netto/Monat inkl. laufendem SEO und KI-Sichtbarkeit).{' '}
            {projektowanie ? <Link href={projektowanie} style={s.podkreslenie}>Mehr zu Webdesign &amp; Next.js-Entwicklung</Link> : null}
          </li>
          <li>
            <strong>Sicherer Relaunch ohne Rankingverlust:</strong> Nutzen Sie bei der Umsetzung durch Ihr eigenes Team den 60-Tage-Link als Briefing-Grundlage{migracjaCheck ? <> und prüfen Sie alle 301-Weiterleitungen mit unserer <Link href={migracjaCheck} style={s.podkreslenie}>Website-Relaunch-Checkliste</Link></> : null}.
          </li>
        </ul>
        {projektowanie && (
          <div style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link href={projektowanie} className="btn btn-primary" data-cta="makieta_de_wycena">
              Umsetzung des Relaunchs anfragen
            </Link>
          </div>
        )}
      </Sekcja>

      <WeitereToolsDe bez={KLUCZ} />
    </UkladDe>
  );
}
