// Niemiecka strona /de/tools/domain-authority-checker (18.11.2026, de-narzedzia). Odpowiednik AutorytetStrona.jsx (PL/EN).
// Wynik to NASZA metryka 0-100 (wzór cc-hcpr-v1) z publicznego grafu linków Common Crawl, nie Domain Rating Ahrefs ani
// Domain Authority Moz; nie sugerujemy powiązania z Common Crawl, Ahrefs ani Moz (ToU CC pkt 2(i)); metodę opisujemy
// tak samo jak strona PL (liczby ze stałej AUTORYTET w lib/narzedziaLiczby.js, kalibracja z prace-2026-11-12/autorytet-cc/dane).
// Fraza „domain authority checker” jest po angielsku także w DE (wyszukiwana po angielsku, ~1 300/mies. w DE).
// Uwaga dla czytelnika DE (z działania narzędzia): domeny .pl mają pełne dane (ranga i percentyl wśród .pl, domeny linkujące),
// inne końcówki (.de, .at, .ch) mają tylko pozycję w całym grafie i tylko z pierwszych 5 mln pozycji; poza nimi wynik ≤ 44.
// Dane kalibracji (60% domen .pl ≤ 10 pkt itd.) dotyczą rozkładu .pl i są tak opisane. Brak twierdzeń o rynku DACH bez źródła.

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { liczba } from '@/lib/formatDe';
import { STRONY_NARZEDZI_DE, AUTORYTET_DE } from '@/lib/narzedzia.de';
import { stronaNarzedzia } from '@/lib/narzedzia';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import * as s from '@/components/narzedzia/styl';
import { UkladDe, WeitereToolsDe } from './UkladDe';
import AutorytetClientDe from './AutorytetClientDe';

const KLUCZ = '/narzedzia/autorytet-domeny';
const AHREFS_DR = 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr';
const MOZ_DA = 'https://moz.com/learn/seo/domain-authority';
const MOZ_TOP = 'https://moz.com/top500';
const AKSJOMATY = 'https://arxiv.org/abs/1308.2140';
const zewn = { target: '_blank', rel: 'noopener', style: s.podkreslenie };
const n = (x) => liczba(x, 'de');
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

// Kalibracja z dane/RAPORT.md §5 (wydanie cc-main-2026-aug-sep-oct): wynik i miejsce wśród domen .pl.
const PRZYKLADY = [
  { id: 'google', domena: 'google.com', wynik: 100, miejscePl: null },
  { id: 'wikipedia', domena: 'wikipedia.org', wynik: 99, miejscePl: null },
  { id: 'onet', domena: 'onet.pl', wynik: 92, miejscePl: 3 },
  { id: 'allegro', domena: 'allegro.pl', wynik: 91, miejscePl: 5 },
  { id: 'wp', domena: 'wp.pl', wynik: 87, miejscePl: 10 },
  { id: 'olx', domena: 'olx.pl', wynik: 84, miejscePl: 35 },
  { id: 'mbank', domena: 'mbank.pl', wynik: 82, miejscePl: 62 },
  { id: 'xkom', domena: 'x-kom.pl', wynik: 68, miejscePl: 509 },
  { id: 'decathlon', domena: 'decathlon.pl', wynik: 64, miejscePl: 1735 },
  { id: 'rossmann', domena: 'rossmann.pl', wynik: 52, miejscePl: 7939 },
];

// Zrzut przykładowego wyniku z trybu demo z interfejsem DE (domeny fikcyjne, *.example); powstaje w kroku renderu.
const ZRZUT = { src: '/images/narzedzia/przyklady/domain-authority-checker-beispielergebnis.webp', width: 1200, height: 1330 };

const FAQ = [
  { id: 'czy-to-dr-albo-da', question: 'Ist das der Domain Rating von Ahrefs oder die Domain Authority von Moz?', answer: 'Nein. Das ist unser eigener Wert für die Domain-Autorität. Wir berechnen ihn aus dem öffentlichen Link-Graphen von Common Crawl nach einer offenen Formel, die wir auf dieser Seite beschreiben. Domain Rating ist eine Kennzahl von Ahrefs, Domain Authority eine von Moz: Beide entstehen aus deren eigenen Link-Datenbanken und nach deren eigenen Formeln. Wir nutzen keine Daten von Ahrefs oder Moz, und Common Crawl berechnet diesen Wert nicht und ist nicht für ihn verantwortlich.' },
  { id: 'skad-dane', question: 'Woher stammen die Daten, und senden Sie meine Domain irgendwohin?', answer: `Die Daten stammen aus dem Graphen der Links zwischen Domains, den Common Crawl kostenlos veröffentlicht. Das aktuelle Release (${AUTORYTET.wydanie}) umfasst Crawls aus dem Zeitraum ${AUTORYTET_DE.okres}. Die berechneten Werte halten wir in unserem eigenen Datenspeicher, die eingegebene Domain geht also an keine externe Firma.` },
  { id: 'jaki-wynik-jest-dobry', question: 'Welcher Autoritätswert ist gut?', answer: 'Das hängt von Ihren Konkurrenten ab. In diesem Release haben etwa 60 % der .pl-Domains 10 Punkte oder weniger, mehr als 30 Punkte haben etwa 5 %, mehr als 50 weniger als 1 %. Neue und lokale Websites liegen meist unter 10 Punkten (unsere vier Testdomains haben jeweils 9), etablierte kleine Unternehmen aus unserer Zufallsstichprobe hatten von knapp über 10 bis etwa 40, und ein Shop, der um bundesweite Keywords konkurriert, misst sich mit deutlich stärkeren Domains. Gut ist ein Wert, der nicht hinter den Unternehmen in den Top 10 von Google für Ihre Keywords zurückbleibt, deshalb ist der Vergleich mit bis zu drei Konkurrenten kostenlos. Die Verteilung gilt für .pl-Domains; für andere Endungen nennen wir keine Verteilung.' },
  { id: 'porownanie-bez-emaila', question: 'Braucht der Vergleich mit Konkurrenten eine E-Mail-Adresse?', answer: 'Nein. Den Wert Ihrer Domain und den Vergleich mit bis zu drei Konkurrenten sehen Sie sofort, ohne Anmeldung und ohne E-Mail. Eine E-Mail-Adresse brauchen Sie nur, wenn Sie den Bericht mit Maßnahmenplan erhalten möchten.' },
  { id: 'inny-niz-dr', question: 'Warum weicht mein Wert vom DR oder der DA ab?', answer: 'Weil es ein anderes Maß auf Basis anderer Daten ist. Ahrefs und Moz haben eigene Crawler und Link-Datenbanken und messen etwas anderes als wir: Der DR beruht auf Zahl und Stärke der verlinkenden Domains, die DA ist ein Modell, das Rankings vorhersagt. Wir messen die Position einer Domain im Graphen von Common Crawl. Bei 441 Domains aus der Top-500-Liste von Moz liegt die Rangkorrelation unseres Werts mit der Zahl der verlinkenden Domains laut Moz bei etwa 0,57 und mit der DA bei etwa 0,37. Die Werte lassen sich nicht ineinander umrechnen.' },
  { id: 'wynik-zero', question: 'Warum hat meine Domain 0 Punkte oder fehlt im Graphen?', answer: 'Meist ist es eine neue Domain oder eine, auf die keine vom Common-Crawl-Roboter im Zeitraum des Releases besuchte Seite verlinkt. Der zweite Fall: Die Domain ist im Graphen, aber keine andere Domain verlinkt auf sie. In beiden Fällen beträgt der Wert 0. Sobald Sie Links von anderen Websites gewinnen, erscheinen sie im nächsten Release des Graphen.' },
  { id: 'domeny-linkujace', question: 'Was bedeutet die Zahl der verlinkenden Domains, und ist das eine vollständige Backlink-Liste?', answer: 'Für .pl-Domains zeigen wir, von wie vielen verschiedenen Domains mindestens ein Link auf Ihre Domain führt, sowie die fünf stärksten davon nach unserem Wert. Wir zählen das aus demselben Graphen von Common Crawl, aus einem Quartals-Crawl und nur unter Domains, die der Roboter gesehen hat, also ist es eine Untergrenze und kein vollständiger Backlink-Index. Wir kennen weder Adressen der Seiten noch Ankertexte oder dofollow-Attribute und vergleichen die Zahl nicht mit kommerziellen Tools, weil jedes eine eigene Datenbank hat. Ein Link von Ihren eigenen Subdomains zählt nicht als eigene Domain. Für Domains außerhalb von .pl nennen wir die Zahl nicht.' },
  { id: 'jak-czesto', question: 'Wie oft ändert sich der Wert?', answer: 'Mit jedem Release des Graphen, nicht von Tag zu Tag. Jedes Release umfasst drei Monate Crawling, ein neuer Link zeigt sich im Wert also mit einer Verzögerung von einigen Wochen bis zu einigen Monaten. Der Wert derselben Domain kann sich zwischen Releases auch um einige Punkte verschieben, weil sich die Zahl der Domains im Graphen ändert. Deshalb nennen wir neben dem Wert immer das Daten-Release.' },
  { id: 'jak-podniesc', question: 'Wie erhöhe ich die Domain-Autorität?', answer: 'Indem Sie Links von Websites gewinnen, die selbst stark sind und zu Ihrer Branche passen: Veröffentlichungen in Fachmedien auf Basis eigener Daten, Materialien, die andere gern zitieren, Erwähnungen Ihres Unternehmens, die zu Links werden, und zurückgewonnene Links auf gelöschte Unterseiten. Massenlinks von schwachen Websites bringen hier wenig, denn der Wert berücksichtigt das schwächere von zwei Signalen, und das Risiko einer Strafe von Google ist real.' },
  { id: 'ccbot', question: 'Senkt es den Wert, wenn ich den Roboter CCBot in der robots.txt sperre?', answer: 'Nein. Wir berechnen den Wert aus Links, die von anderen Websites auf Ihre Domain führen, eine Sperre des Common-Crawl-Roboters auf Ihrer eigenen Website senkt ihn also nicht. Entscheidend ist, ob der Roboter die Seiten besucht, die auf Sie verlinken.' },
  { id: 'pozycje-google', question: 'Beeinflusst die Domain-Autorität die Positionen in Google?', answer: 'Google nutzt weder unseren Wert noch ein anderes Autoritätsmaß aus SEO-Tools. Der Wert zeigt, wie fest eine Domain im Netz der Links verankert ist, und Links sind einer der Rankingfaktoren von Google. Er ist ein Indikator, nicht die Ursache einer Position.' },
  { id: 'ile-domen', question: 'Wie viele Domains kann ich prüfen?', answer: `Bis zu ${AUTORYTET.limitIp} Domains pro Tag und IP-Adresse. Jede Domain zählt einzeln: Die Prüfung der eigenen Domain mit drei Konkurrenten sind vier Domains. Unter dem Ergebnis zeigen wir, wie viele Prüfungen für heute übrig sind.` },
  { id: 'czy-zapisujecie-wyniki', question: 'Speichern Sie die Ergebnisse?', answer: 'Wir erfassen die Prüfung in unserem Panel, um das Tageslimit zu zählen und den Bericht zu senden, den Sie anfordern. Eine Liste der geprüften Domains oder ihrer Werte veröffentlichen wir nicht.' },
  { id: 'autorytet-a-widocznosc-w-ai', question: 'Ist die Domain-Autorität für die KI-Sichtbarkeit wichtig?', answer: 'KI-Modelle nutzen unseren Wert nicht. Dieselben Maßnahmen, die ihn erhöhen, also Veröffentlichungen in Fachmedien und Erwähnungen der Marke, erhöhen aber die Chance, dass ChatGPT oder Gemini Ihr Unternehmen nennen. Ob sie es schon tun, prüfen Sie mit unserem kostenlosen Tool zur KI-Sichtbarkeit.' },
];

export default function AutorytetStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const meta = stronaNarzedzia('autorytet-domeny');
  const nazwy = STRONY_NARZEDZI_DE['autorytet-domeny'];
  const zrodla = meta.sources.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }));
  const seoFuerUnternehmen = jesli('/pozycjonowanie-stron-internetowych');
  const audyt = jesli('/narzedzia/audyt-seo');
  const sichtbarkeit = jesli('/sprawdz-widocznosc-w-ai');
  return (
    <UkladDe
      klucz={KLUCZ}
      tag="Kostenloses Tool"
      h1={wpis.h1}
      okruszek={nazwy.okruszek}
      zrodla={zrodla}
      schema={{
        name: 'Domain Authority Checker',
        description: 'Kostenloser Domain Authority Checker: ein Wert von 0 bis 100, den AI SEO COMPANY aus dem öffentlichen Link-Graphen von Common Crawl berechnet, die Position der Domain im Graphen und ein Vergleich mit bis zu drei Konkurrenten, ohne E-Mail.',
        category: 'BusinessApplication',
        screenshot: { url: ZRZUT.src, width: ZRZUT.width, height: ZRZUT.height },
        featureList: [`Autoritätswert von 0 bis 100 aus dem Link-Graphen von Common Crawl (Release ${AUTORYTET.wydanie})`, `Rang und Perzentil unter ${n(AUTORYTET.domenPl)} .pl-Domains`, `Vergleich mit bis zu ${AUTORYTET.konkurentow} Konkurrenten, ohne E-Mail`, 'Beschreibung Ihrer Stufe und Ihres Abstands zum stärksten Konkurrenten', 'Bericht mit Maßnahmenplan per E-Mail', `Bis zu ${AUTORYTET.limitIp} Domains pro Tag, ohne Anmeldung`],
      }}
      lead="Der kostenlose Domain Authority Checker liefert in einem Schritt einen Wert von 0 bis 100 aus dem öffentlichen Link-Graphen von Common Crawl, die Position Ihrer Domain im Graphen und den Vergleich mit bis zu drei Konkurrenten. Ohne Anmeldung und ohne E-Mail."
      narzedzie={<AutorytetClientDe />}
      odpowiedz={`Domain Authority (Domain-Autorität) ist eine Einstufung auf einer Skala von 0 bis 100, wie fest eine Website im Netz der Links verankert ist. Unser Domain Authority Checker berechnet sie aus dem öffentlichen Link-Graphen von Common Crawl (${n(AUTORYTET.domenWGrafie)} Domains, Crawls aus ${AUTORYTET_DE.okres}): Je näher andere Websites in diesem Netz an einer Domain liegen und je stärker die verlinkenden Domains sind, desto höher der Wert. Es ist unsere eigene Kennzahl, nicht der Domain Rating von Ahrefs und nicht die Domain Authority von Moz. Wert und Konkurrentenvergleich sehen Sie sofort und kostenlos.`}
      faq={FAQ}
      tytulFaq="Fragen zur Domain-Autorität"
    >
      <CoDostajesz
        id="was-sie-erhalten"
        tytul="Das erhalten Sie kostenlos"
        tytulOdRazu="Sofort, ohne E-Mail"
        tytulPoEmailu="Nach Angabe Ihrer E-Mail-Adresse"
        odRazu={[
          'Ihren Wert der Domain-Autorität auf einer Skala von 0 bis 100 aus dem Link-Graphen von Common Crawl',
          `Bei .pl-Domains Ihren Rang und Ihr Perzentil unter ${n(AUTORYTET.domenPl)} .pl-Domains, bei allen Domains Ihre Position im gesamten Graphen`,
          'Einen Vergleich mit bis zu drei Konkurrenten in einem Diagramm',
          'Bei .pl-Domains: die Zahl der verlinkenden Domains und die fünf stärksten, auch bei den Konkurrenten',
          'Ihre Autoritätsstufe und Ihren Abstand zum stärksten Konkurrenten',
          'Einen Zähler der heutigen Prüfungen und einen Link zum Ergebnis zum Kopieren',
        ]}
        poEmailu={[
          'Einen Bericht mit Wert, Vergleich und dem Daten-Release',
          'Einen Maßnahmenplan in der richtigen Reihenfolge: womit Sie beim Linkaufbau bei Ihrem Wert anfangen',
          'Welche Links Sie meiden sollten, um keine Strafe von Google zu riskieren',
        ]}
        przypis="Die E-Mail schaltet auf der Seite nichts frei: Das ganze Ergebnis sehen Sie auch ohne sie. Zu jedem Wert gehören die Datenquelle und das Release des Graphen."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Domain Authority Checker: Beispielwert 23 von 100 mit der Position im Link-Graphen und einem Vergleich mit drei Konkurrenten in einem Balkendiagramm"
            podpis="Beispielergebnis im Demo-Modus: ihre-firma.example und die Konkurrenz-Domains sind fiktiv, und die Zahlen zeigen typische Werte für solche Ergebnisse, keine Daten echter Websites. Das Ergebnis und den Vergleich sehen Sie ohne E-Mail; per E-Mail senden wir einen Bericht mit Maßnahmenplan. Screenshot vom 18.11.2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="was-ist-domain-authority" tytul="Was ist Domain Authority (Domain-Autorität)?">
        <p style={s.akapit}>Domain Authority ist ein konventionelles Maß für die Stärke einer Website im Netz der Links. Ein Link von einer anderen Website wirkt wie eine Empfehlung: Je mehr starke Websites auf Ihre Domain zeigen, desto leichter kann eine Suchmaschine sie als vertrauenswürdige Quelle behandeln. Google veröffentlicht keine eigene Autoritätszahl, daher stützt sich die SEO-Branche auf Kennzahlen aus Tools, und jedes Tool berechnet sie aus seiner eigenen Link-Datenbank.</p>
        <p style={s.akapit}>Wir berechnen unseren Wert selbst aus dem öffentlichen Link-Graphen von Common Crawl. Es ist eine Zahl von 0 bis 100: Je höher sie ist, desto näher liegt die Domain am Zentrum des Netzes und desto stärker sind die verlinkenden Domains. Der Wert 0 bedeutet, dass die Daten keine Links auf die Domain enthalten oder die Domain im Graphen gar nicht vorkommt.</p>
        <p style={s.akapit}>Neben dem Wert zeigen wir bei .pl-Domains den Rang der Domain unter den {n(AUTORYTET.domenPl)} .pl-Domains im Graphen und ihr Perzentil, also den Anteil der .pl-Domains mit schlechterer Position im Graphen. Für Domains mit anderen Endungen, etwa .de, .at oder .ch, nennen wir die Position im gesamten Graphen mit {n(AUTORYTET.domenWGrafie)} Domains (siehe die Grenzen weiter unten).</p>
      </Sekcja>

      <Sekcja id="so-berechnen-wir-den-wert" tytul="So berechnen wir den Wert aus den Daten von Common Crawl">
        <p style={s.akapit}>Common Crawl ist eine gemeinnützige Stiftung aus den USA, die regelmäßig öffentliche Webseiten crawlt und die Daten kostenlos bereitstellt. Aus den Links auf diesen Seiten baut sie einen Graphen: Ein Knoten ist eine Domain, eine Kante ein Link von einer Domain auf eine andere. Das aktuelle Release {AUTORYTET.wydanie} entstand aus drei Crawls von {AUTORYTET_DE.okres} und hat {n(AUTORYTET.domenWGrafie)} Domains und {AUTORYTET_DE.krawedzi} Kanten zwischen ihnen. Die Datei mit den Positionen der Domains wurde am 22. Oktober 2026 veröffentlicht. Quelle: <a href={AUTORYTET.notatka} {...zewn}>Release-Notiz von Common Crawl</a> (Englisch).</p>
        <p style={s.akapit}>Für jede Domain liefert Common Crawl zwei Rangpositionen, und wir machen daraus in vier Schritten einen Wert:</p>
        <ol style={s.lista}>
          <li><strong>Harmonic Centrality.</strong> Für jede Domain werden die inversen Abstände zu allen anderen Domains addiert, gezählt in Sprüngen entlang von Links. Eine Domain, die der größte Teil des Netzes über kurze Wege erreicht, steht weit oben. Eine Link-Farm verkürzt diese Wege nicht, deshalb lässt sich diese Position schwer damit aufblähen. Laut der Studie von Boldi und Vigna <a href={AKSJOMATY} {...zewn}>„Axioms for Centrality“</a> ist es das einzige dort verglichene Maß, das alle drei vorgeschlagenen Axiome erfüllt.</li>
          <li><strong>PageRank.</strong> Ein Link von einer Domain, die selbst viele Links erhält, wiegt mehr. Dieses Maß bildet Zahl und Stärke der Links besser ab, lässt sich aber leichter mit Spam-Links aufblähen.</li>
          <li><strong>Das schwächere der beiden Signale.</strong> Wir nehmen die schlechtere der beiden Positionen. Spam erhöht den PageRank, aber nicht die Zentralität. Ein einzelner Link von einer sehr zentralen Website erhöht die Zentralität, aber nicht den PageRank. Nur eine Domain mit zwei starken Signalen erhält einen hohen Wert.</li>
          <li><strong>Eine Skala von 0 bis 100.</strong> Die Position r rechnen wir um in Wert = 100 × (1 − (log r / log r0)³), wobei r0 die Zahl der Domains mit mindestens einem eingehenden Link ist ({n(AUTORYTET.r0)} in diesem Release). Position 1.000 entspricht 95 Punkten, 100.000 entspricht 76 und eine Million 59.</li>
        </ol>
        <p style={s.akapit}>Die Skala ist logarithmisch und wird nach oben schwerer: Unten bedeuten 10 Punkte grob eine doppelt so gute Position im Graphen, zwischen 40 und 60 Punkten je 10 Punkte das 2,5- bis 3-Fache und zwischen 80 und 90 fast das 10-Fache. Die Formel trägt die Version {AUTORYTET.wzor}. Ändern wir sie, bekommt die neue Version eine neue Nummer.</p>
        <p style={s.akapit}>Common Crawl berechnet diesen Wert nicht und ist nicht für ihn verantwortlich; wir nutzen die Daten, die es für alle veröffentlicht. Die Domain suchen wir in unserer eigenen Kopie der berechneten Daten, die eingegebene Adresse geht also an keine externe Firma.</p>
      </Sekcja>

      <Sekcja id="unterschied-zu-dr-und-da" tytul="Worin sich das von Ahrefs Domain Rating und Moz Domain Authority unterscheidet">
        <CompareTable
          id="tabelle-autoritaet-dr-da"
          caption="Unser Autoritätswert, Ahrefs Domain Rating und Moz Domain Authority"
          columns={[
            { key: 'cecha', label: 'Merkmal' },
            { key: 'my', label: 'Unser Wert' },
            { key: 'dr', label: 'Domain Rating (Ahrefs)' },
            { key: 'da', label: 'Domain Authority (Moz)' },
          ]}
          rows={[
            { id: 'who', cecha: 'Berechnet von', my: 'AI SEO COMPANY', dr: 'Ahrefs', da: 'Moz' },
            { id: 'data', cecha: 'Link-Daten', my: `der öffentliche Graph von Common Crawl, ${n(AUTORYTET.domenWGrafie)} Domains`, dr: 'eigene Link-Datenbank von Ahrefs', da: 'eigene Link-Datenbank von Moz' },
            { id: 'what', cecha: 'Was gemessen wird', my: 'die Position der Domain im Graphen: Harmonic Centrality und PageRank, das schwächere von beiden', dr: 'eindeutige verlinkende Domains und deren eigener DR', da: 'ein Machine-Learning-Modell, vor allem auf Basis von Link-Daten, das die Fähigkeit zum Ranken vorhersagt' },
            { id: 'scale', cecha: 'Skala', my: '0 bis 100, logarithmisch', dr: '0 bis 100, logarithmisch', da: '1 bis 100' },
            { id: 'freshness', cecha: 'Aktualität', my: `Releases des Graphen, jedes mit 3 Monaten Crawling (jetzt: ${AUTORYTET_DE.okres})`, dr: 'laufend, laut Ahrefs', da: 'mit Aktualisierungen des Moz-Index' },
          ]}
          przypis={<>Quellen: <a href={AHREFS_DR} {...zewn}>Ahrefs Help, „What is Domain Rating (DR)“</a> (Abruf 11.11.2026), <a href={MOZ_DA} {...zewn}>Moz, „What is Domain Authority“</a> und <a href={AUTORYTET.zrodlo} {...zewn}>Common Crawl, Web Graphs</a> (Abruf 12.11.2026), alle auf Englisch.</>}
        />
        <p style={s.akapit}>Wir haben geprüft, wie unser Wert mit den Daten von Moz in dessen Liste der 500 beliebtesten Domains übereinstimmt (<a href={MOZ_TOP} {...zewn}>Moz Top 500</a>, 441 zugeordnete Domains, 12. November 2026). Die Rangkorrelation nach Spearman mit der Zahl der verlinkenden Domains laut Moz beträgt etwa 0,57, mit der DA allein etwa 0,37. Das ist eine mäßige Übereinstimmung: Die Maße ordnen Domains ähnlich, aber nicht gleich. Der PageRank allein stimmte besser mit Moz überein (0,72), gab aber kleinen polnischen Domains mit Spam-Links überhöhte Werte, deshalb nutzen wir ihn nicht allein. Die Übereinstimmung in der Mitte der Skala, wo die meisten Unternehmen liegen, haben wir noch nicht gemessen.</p>
        <p style={s.akapit}>Vier Domains aus unseren Tests, darunter unsere eigene ai-seo-company.pl, zeigen den Unterschied: Alle haben bei uns 9 Punkte, während ihr DR nach Messungen von Ahrefs vom 11. November 2026 je nach Domain und DR-Version zwischen 0 und 54 lag. Zwei davon verdankten ihren hohen DR Spam-Links. Rechnen Sie unseren Wert also nicht in DR oder DA um. Vergleichen Sie Domains mit einer einzigen Kennzahl und bleiben Sie bei späteren Prüfungen dabei.</p>
      </Sekcja>

      <Sekcja id="ergebnis-lesen" tytul="So lesen Sie das Ergebnis im Vergleich mit Konkurrenten">
        <p style={s.akapit}>Die Zahl allein sagt wenig. Ein Wert von 25 kann für eine Klinik in einer mittelgroßen Stadt stark sein und für einen Shop, der um bundesweite Keywords konkurriert, schwach. Deshalb vergleicht das Tool Sie sofort und ohne E-Mail mit bis zu drei Konkurrenten.</p>
        <h3 style={s.h3}>Wen Sie als Konkurrenten eingeben</h3>
        <p style={s.akapit}>Die Unternehmen in den Top 10 von Google für Ihre wichtigsten Keywords, nicht die größten Marken Ihrer Branche. Suchen Sie nach dem Begriff, mit dem Kunden Sie finden, und nehmen Sie die Domains aus den ersten Ergebnissen, ohne Portale und Verzeichnisse. Konkurrieren Sie lokal, vergleichen Sie sich mit Unternehmen aus derselben Stadt.</p>
        <h3 style={s.h3}>Stufen des Werts</h3>
        <ul style={s.lista}>
          <li><strong>0 bis 9, sehr niedrig:</strong> typisch für neue und kleine Websites. Etwa 60 % der .pl-Domains im Graphen haben 10 Punkte oder weniger.</li>
          <li><strong>10 bis 24, niedrig:</strong> Die Domain hat schon Links, aber wenige von starken Websites. Oft ausreichend für lokale und Nischen-Keywords.</li>
          <li><strong>25 bis 44, mittel:</strong> eine solide Position im Netz der Links. Etwa 5 % der .pl-Domains haben mehr als 30 Punkte.</li>
          <li><strong>45 bis 69, hoch:</strong> eine starke Position, das Niveau bekannter Unternehmen und großer Shops. Weniger als 1 % der .pl-Domains haben mehr als 50 Punkte.</li>
          <li><strong>70 bis 100, sehr hoch:</strong> die größten Websites. Rund 340 .pl-Domains haben mehr als 70 Punkte.</li>
        </ul>
        <p style={s.przypis}>Die Schwellen der Stufen sind unsere eigenen, gesetzt auf der Verteilung der Werte der .pl-Domains im Release {AUTORYTET.wydanie}. Verstehen Sie sie als Orientierung: Entscheidend ist der Vergleich mit den Konkurrenten.</p>
        <h3 style={s.h3}>Beispielwerte zur Orientierung</h3>
        <CompareTable
          id="tabelle-autoritaet-beispiele"
          caption={`Autoritätswert ausgewählter Domains, Release ${AUTORYTET.wydanie}`}
          columns={[
            { key: 'domena', label: 'Domain' },
            { key: 'wynik', label: 'Wert' },
            { key: 'miejsce', label: 'Rang unter den .pl-Domains' },
          ]}
          rows={PRZYKLADY.map((x) => ({ id: x.id, domena: x.domena, wynik: String(x.wynik), miejsce: x.miejscePl ? n(x.miejscePl) : 'nicht zutreffend' }))}
          przypis="Quelle: unsere Berechnungen aus dem Link-Graphen von Common Crawl, 12. November 2026. Bis auf google.com und wikipedia.org sind es polnische Domains, denn die Kalibrierung des Tools stützt sich auf die .pl-Domains."
        />
        <p style={s.akapit}>Große Shops schneiden bei uns schlechter ab als Portale: x-kom.pl und mediaexpert.pl haben 67 bis 68 Punkte und rossmann.pl 52, obwohl es bekannte Marken mit vielen Links sind. Ihr schwächeres Signal ist die Zentralität, und der Wert nimmt das schwächere Signal. Vergleichen Sie sich mit einem Shop, bedenken Sie, dass sein Vorsprung bei den Links größer sein kann, als der Wert zeigt.</p>
        <h3 style={s.h3}>Wie wir Ihren Abstand zum stärksten Konkurrenten beschreiben</h3>
        <ul style={s.lista}>
          <li><strong>Sie haben den höchsten Wert:</strong> Bei den Links liegen diese Unternehmen nicht vor Ihnen. Einen Vorsprung bauen Sie mit Inhalten und mit Links auf die Seiten aus, die verkaufen.</li>
          <li><strong>Abstand bis 5 Punkte:</strong> Inhalt und die Passung einer Seite zur Frage entscheiden über das Ranking öfter als das Linkprofil.</li>
          <li><strong>5 bis 20 Punkte:</strong> ein deutlicher Vorteil des Konkurrenten bei den Links. Sie brauchen Links von Branchenseiten und Medien, nicht nur bessere Inhalte.</li>
          <li><strong>Mehr als 20 Punkte:</strong> Die Skala ist logarithmisch, das dauert also Monate. Beginnen Sie mit Keywords, für die der Konkurrent keine starken Seiten hat.</li>
        </ul>
        <p style={s.przypis}>Die Schwellen von 5 und 20 Punkten sind ebenfalls unsere eigenen und ungefähr. Sie sind ein Ausgangspunkt für Entscheidungen zu Links, keine Prognose des Rankings.</p>
      </Sekcja>

      <Sekcja id="domain-authority-erhoehen" tytul="Domain Authority erhöhen">
        <p style={s.akapit}>Die folgende Reihenfolge stammt aus unserem SEO-Playbook, nach dem wir mit Kunden arbeiten: von den Maßnahmen, die bei geringstem Risiko am meisten bringen.</p>
        <h3 style={s.h3}>Taktiken in der Reihenfolge des Ertrags</h3>
        <ol style={s.lista}>
          <li><strong>Digital PR auf Basis eigener Daten.</strong> Ein Bericht, eine Studie oder ein Ranking aus Unternehmensdaten, angeboten Fach- und allgemeinen Medien. Das bringt die Links von der höchsten Qualität und Erwähnungen der Marke, die auch in KI-Antworten zählen.</li>
          <li><strong>Ressourcen, die von allein Links gewinnen.</strong> Rechner, Tools, Benchmarks und Vorlagen gewinnen Links ohne Outreach.</li>
          <li><strong>Unverlinkte Erwähnungen.</strong> Finden Sie Seiten, die Ihr Unternehmen erwähnen, ohne zu verlinken, und bitten Sie um einen Link. Das ist die wirksamste Bitte im gesamten Outreach.</li>
          <li><strong>Linkrückgewinnung.</strong> Leiten Sie Links, die auf 404-Seiten zeigen, zum Beispiel nach einem Relaunch, auf die richtigen Adressen um oder bitten Sie um eine Korrektur.</li>
          <li><strong>Gastbeiträge und Partnerschaften, aber selektiv.</strong> Nur auf Websites mit echtem Traffic zu Ihrem Thema.</li>
        </ol>
        <p style={s.akapit}>Lokale Unternehmen haben zusätzliche Linkquellen: Sponsoring, lokale Medien, Branchenverbände und Geschäftspartner. Ein Google Unternehmensprofil und Verzeichnisse mit identischem Namen, identischer Adresse und Telefonnummer bilden die Basis, auch wenn die Links daraus schwach sind.</p>
        <h3 style={s.h3}>Wie Sie einen Link beurteilen, bevor Sie ihn erhalten</h3>
        <ul style={s.lista}>
          <li>Die Website erhält Traffic aus Google für Keywords Ihrer Branche.</li>
          <li>Sie hat einen Bezug zu dem, was Sie tun.</li>
          <li>Der Link steht im Text eines Artikels, nicht im Footer oder in der Seitenleiste.</li>
          <li>Die Website ist kein Verzeichnis, das Links an jeden verkauft.</li>
        </ul>
        <p style={s.akapit}>Meiden Sie Link-Netzwerke (PBN), massenhafte Linktausche und Systeme zum Linktausch sowie Forenkommentare im großen Stil. Das Risiko einer Strafe ist real, und der Wert solcher Links liegt nahe null. Auch ein hoher Wert einer Website, die Beiträge verkauft, garantiert nichts: Prüfen Sie sie hier und sehen Sie nach, ob sie echten Traffic hat.</p>
        <h3 style={s.h3}>Was Sie messen</h3>
        <ul style={s.lista}>
          <li>Die Zahl der Domains, die auf die Seiten verlinken, die verkaufen, nicht auf die ganze Website.</li>
          <li>Erwähnungen der Marke und Suchanfragen nach Ihrem Firmennamen: ein guter Stellvertreter für Autorität.</li>
          <li>Traffic aus den Veröffentlichungen, die Sie gewonnen haben.</li>
        </ul>
        <p style={s.akapit}>Prüfen Sie unseren Wert nach jedem neuen Daten-Release, mit derselben Liste von Konkurrenten. Neue Links erscheinen darin mit Verzögerung: Der Common-Crawl-Roboter muss zuerst die Seite mit dem Link besuchen, und der Graph umfasst drei Monate Crawling.</p>
      </Sekcja>

      <Sekcja id="ergebnis-nutzen" tytul="So nutzen Sie das Ergebnis">
        <ul style={s.lista}>
          <li>Vergleichen Sie Ihren Wert mit Unternehmen, die für Ihre wichtigsten Keywords in den Top 10 stehen. Ein großer Abstand bedeutet, dass Inhalte allein womöglich nicht reichen.</li>
          <li>Prüfen Sie den Wert nach jedem Release des Graphen. Ein Rückgang bei ähnlich bleibender Zahl der Domains im Graphen bedeutet meist verlorene Links, etwa nach der Abschaltung der Website eines Partners.</li>
          <li>Prüfen Sie bei der Wahl von Orten für Veröffentlichungen den Wert der Website: Ein Link von einer starken, thematisch passenden Website ist mehr wert als Dutzende schwache.</li>
          <li>Vergleichen Sie nach einer Migration oder einem Domainwechsel den Wert mit dem Release davor. Ein Rückgang signalisiert, dass einige Links auf Adressen zeigen, die es nicht mehr gibt.</li>
        </ul>
      </Sekcja>

      <Sekcja id="verlinkende-domains" tytul="Verlinkende Domains: was wir zeigen und wie Sie es lesen">
        <p style={s.akapit}>Für .pl-Domains zeigen wir neben dem Wert die Zahl der verlinkenden Domains: verschiedene Domains mit mindestens einem Link auf Ihre. Wir zählen nicht die Links selbst: Hundert Links von einer Website sind eine Domain. Außerdem zeigen wir die fünf stärksten verlinkenden Domains, geordnet nach unserem Wert, und dieselbe Zahl für die Konkurrenten in der Vergleichstabelle.</p>
        <p style={s.akapit}>Die Spannweite ist sehr groß. In diesem Release haben 129.587 .pl-Domains gar keinen Link, und fast jede zweite der übrigen (44 %) hat nur eine verlinkende Domain. Die größten Portale haben zehntausende. Lesen Sie die Zahl also zusammen mit dem Wert: Zwanzig-plus Domains aus einer Farm billiger Domains ergeben eine Zahl, aber keine Stärke, und der Wert sieht das. Achten Sie auf die fünf stärksten: Sind es Websites, die Sie kennen und denen Sie vertrauen, ist das Profil gesund; sind es zufällige Adressen, sagt die Zahl wenig.</p>
        <p style={s.akapit}>Wichtig: Das ist kein vollständiger Backlink-Index. Die Daten stammen aus einem Quartals-Crawl von Common Crawl und umfassen nur Domains, die der Roboter besucht hat, die tatsächliche Zahl ist also meist höher. Wir kennen weder Adressen der Seiten noch Ankertexte oder dofollow-Attribute und nennen keine Zahlen für Domains außerhalb von .pl. Vergleichen Sie die Zahl nicht mit kommerziellen Tools, denn jedes hat eine eigene Datenbank.</p>
      </Sekcja>

      <Sekcja id="grenzen" tytul="Grenzen: was der Wert nicht zeigt">
        <ul style={s.lista}>
          <li><strong>Der Stand eines Releases, nicht von heute.</strong> Die Daten umfassen Crawls aus {AUTORYTET_DE.okres}. Ein Link, den Sie heute gewinnen, erscheint frühestens im nächsten Release des Graphen.</li>
          <li><strong>Neue Domains fehlen im Graphen.</strong> Eine Domain, auf die keine vom Common-Crawl-Roboter besuchte Seite verlinkt, erhält 0 und den Vermerk „nicht im Graphen“.</li>
          <li><strong>Keine vollständige Linkliste.</strong> Für .pl-Domains zeigen wir die Zahl der verlinkenden Domains und die fünf stärksten, aber das ist eine Untergrenze aus einem Crawl, kein vollständiger Index. Wir kennen weder Adressen der Seiten noch Ankertexte oder dofollow-Attribute und raten sie nicht. Für Domains außerhalb von .pl nennen wir die Zahl nicht.</li>
          <li><strong>Der Roboter sieht nicht das ganze Web.</strong> Links von Seiten, die der Common-Crawl-Roboter nicht besucht hat, zählen im Wert nicht mit.</li>
          <li><strong>Kleine Domains unterscheiden sich wenig.</strong> Viele kleine Websites haben eine ähnliche Position und erhalten denselben Wert. Unsere vier Testdomains haben alle 9 Punkte, obwohl sich ihre Linkprofile unterscheiden.</li>
          <li><strong>Große Shops schneiden schlechter ab.</strong> Einige bekannte E-Commerce-Marken kommen bei uns auf 49 bis 68 Punkte, weniger, als ihre Zahl der Links vermuten ließe.</li>
          <li><strong>Domains außerhalb von .pl nur von der Spitze.</strong> Alle .pl-Domains halten wir vor, von den übrigen nur die ersten {n(AUTORYTET.limitInnych)} Positionen im Graphen. Zu den übrigen Endungen gehören .de, .at und .ch. Liegt eine solche Domain weiter hinten, zeigen wir „≤ {AUTORYTET.maksPozaZbiorem}“. Für alle Endungen außer .pl gibt es außerdem weder einen Rang unter den .pl-Domains noch ein Perzentil noch die Zahl der verlinkenden Domains.</li>
          <li><strong>Eine Domain, keine Seite.</strong> Der Wert beschreibt die ganze Domain. Subdomains wie blog.firma.de zählen zusammen mit firma.de, weil der Graph von Common Crawl sie so gruppiert.</li>
          <li><strong>Ein Indikator, keine Ursache.</strong> Google nutzt unseren Wert nicht. Das Ranking einer bestimmten Seite hängt auch von den Links auf sie und ihrem Inhalt ab.</li>
          <li><strong>Ein Limit.</strong> Bis zu {AUTORYTET.limitIp} Domains pro Tag und IP-Adresse. Jeder Konkurrent zählt als eine Domain.</li>
        </ul>
        <p style={s.akapit}>Das vollständige Linkprofil, also wer auf Sie verlinkt, welche Links riskant sind und was Ihnen gegenüber den Konkurrenten fehlt, analysieren wir im Rahmen unserer {seoFuerUnternehmen ? <Link href={seoFuerUnternehmen} style={s.podkreslenie}>SEO-Leistungen für Unternehmen</Link> : 'SEO-Leistungen für Unternehmen'}. Die technische Seite und den Inhalt Ihrer eigenen Website prüfen Sie im {audyt ? <Link href={audyt} style={s.podkreslenie}>kostenlosen SEO Audit</Link> : 'kostenlosen SEO Audit'}{sichtbarkeit ? <>, und ob KI-Modelle Ihr Unternehmen nennen, im Tool <Link href={sichtbarkeit} style={s.podkreslenie}>KI-Sichtbarkeit prüfen</Link></> : null}.</p>
      </Sekcja>

      <WeitereToolsDe bez={KLUCZ} />
    </UkladDe>
  );
}
