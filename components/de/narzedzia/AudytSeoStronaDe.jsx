// Niemiecka strona /de/tools/kostenloser-seo-audit (18.11.2026, de-narzedzia). Odpowiednik AudytSeoStrona.jsx (PL/EN):
// te same sekcje i fakty (liczby ze stałej AUDYT w lib/narzedziaLiczby.js, ceny z CENY.eur), tekst pisany po niemiecku
// od zera pod frazę „seo analyse kostenlos” / „kostenloser SEO Audit” (intencja: darmowe narzędzie, SERP zdominowany
// przez narzędzia Sistrix, Seobility, SE Ranking, AIOSEO; przewaga tej strony: sprawdzenie gotowości na AI i boty AI).
// Komponent serwerowy; interaktywna część: AudytSeoClientDe. Bez linków do bloga (brak /de/blog w fazie startowej).
// Przykłady z testu 11.11.2026 (6 polskich stron firmowych) są prawdziwe i identyczne jak na stronie PL.

import { Link } from '@/i18n/routing';
import CompareTable from '@/components/CompareTable';
import { maWersjeDe, wpisDe } from '@/lib/stronyDe';
import { AUDYT, CENY } from '@/lib/narzedziaLiczby';
import { eur } from '@/lib/formatDe';
import { STRONY_NARZEDZI_DE } from '@/lib/narzedzia.de';
import { stronaNarzedzia } from '@/lib/narzedzia';
import CoDostajesz from '@/components/narzedzia/CoDostajesz';
import ZrzutWyniku from '@/components/narzedzia/ZrzutWyniku';
import { Sekcja } from '@/components/narzedzia/Sekcja';
import * as s from '@/components/narzedzia/styl';
import { UkladDe, WeitereToolsDe } from './UkladDe';
import AudytSeoClientDe from './AudytSeoClientDe';

const KLUCZ = '/narzedzia/audyt-seo';
const R = AUDYT.reguly;
const W = AUDYT.wagi;
const jesli = (klucz) => (maWersjeDe(klucz) ? klucz : null);

/** „21 Regeln”, „1 Regel”. */
const regeln = (n) => `${n} ${n === 1 ? 'Regel' : 'Regeln'}`;

const ZRODLA = {
  awt: 'https://ahrefs.com/webmaster-tools',
  checker: 'https://ahrefs.com/website-checker',
  gscWeryfikacja: 'https://support.google.com/webmasters/answer/9008080',
  gsc: 'https://search.google.com/search-console/about',
};
const zewn = { ...s.podkreslenie };

// Zrzut przykładowego wyniku z trybu demo (NEXT_PUBLIC_NARZEDZIA_DEMO=1) z niemieckim interfejsem; domena example.com,
// ocena i problemy to dane demonstracyjne, a podpis mówi to wprost. Plik powstaje w kroku renderu (RAPORT de-narzedzia).
const ZRZUT = { src: '/images/narzedzia/przyklady/kostenloser-seo-audit-beispielergebnis.webp', width: 1200, height: 1480 };

const FAQ = [
  { id: 'audyt-seo-za-darmo', question: 'Ist das kostenlose SEO Audit wirklich kostenlos?', answer: 'Ja. Punktzahl, Kategorien und die drei wichtigsten Probleme sehen Sie sofort und ohne Anmeldung. Die vollständige Problemliste mit den Adressen der Unterseiten zeigen wir Ihnen, nachdem Sie Ihre E-Mail-Adresse angegeben haben; dorthin schicken wir auch den Bericht. Für die Anmeldung zum Newsletter gibt es keinen Zwang: Das Ergebnis erhalten Sie in jedem Fall.' },
  { id: 'jak-liczona-ocena', question: 'Wie berechnen Sie die SEO-Punktzahl von 1 bis 100?', answer: `Jede der ${AUDYT.regul} Regeln zieht Punkte von ihrer Kategorie ab, wenn sie nicht erfüllt ist. Die Punktzahl setzt sich zusammen aus ${W.techniczne} % Technik, ${W.tresc} % Inhalt, ${W.wydajnosc} % Performance (davon 70 % der PageSpeed-Wert auf dem Smartphone, Median aus ${AUDYT.przebiegiPsi} Messungen) und ${W.ai} % KI-Tauglichkeit. Die Schwellenwerte der Regeln stehen im Code, zum Beispiel ein Titel über 60 Zeichen oder eine Serverantwort über 1,5 Sekunden. Die vollständige Berechnung steht weiter unten auf dieser Seite.` },
  { id: 'audyt-a-pelny-audyt', question: 'Worin unterscheidet sich das kostenlose Audit vom kostenpflichtigen SEO Audit?', answer: `Das kostenlose Audit prüft automatisch bis zu ${AUDYT.stron} Unterseiten anhand von ${AUDYT.regul} Regeln. Ein kostenpflichtiger SEO Audit (ab ${eur(CENY.audytSeo.eur)} netto, 3 bis 5 Werktage) umfasst die gesamte Website, Keywords, Konkurrenz, Linkprofil und Daten aus der Search Console. Er liefert zu jedem Fehler eine Priorität, eine Anleitung für Ihre Entwickler und einen Maßnahmenplan.` },
  { id: 'czy-audyt-obciaza-strone', question: 'Belastet das Audit meine Website?', answer: `Nein. Wir rufen bis zu ${AUDYT.stron} Unterseiten ab, einige gleichzeitig, mit einem Crawler, der sich zu erkennen gibt (AISEOCompanyAudit). Das ist weniger als ein einziger Besuch einer Suchmaschine. Wir senden keine Formulare ab und melden uns nirgends an.` },
  { id: 'czy-moge-sprawdzic-konkurencje', question: 'Kann ich die Website eines Konkurrenten prüfen?', answer: `Ja. Das Audit funktioniert für jede öffentliche Website und verlangt keinen Nachweis, dass Sie Inhaber sind. Der Vergleich mit 2 bis 3 Unternehmen Ihrer Branche zeigt, ob ein Problem nur Sie betrifft. Das Limit liegt bei ${AUDYT.limitIp} Audits pro Tag und IP-Adresse.` },
  { id: 'inny-wynik-niz-w-innych-narzedziach', question: 'Warum weicht das Ergebnis von anderen SEO-Tools ab?', answer: `Jedes Tool hat seinen eigenen Regelsatz und eigene Gewichtungen. Wir prüfen bis zu ${AUDYT.stron} Unterseiten auf einmal, nicht nur die Startseite, und ergänzen Regeln zur KI-Tauglichkeit. Der PageSpeed-Wert ist der Median aus drei Labormessungen, kann aber trotzdem um einige Punkte schwanken. Beurteilen Sie deshalb vor allem die Veränderung der Fehlerliste und nicht allein die Zahl.` },
  { id: 'jak-czesto-sprawdzac', question: 'Wie oft sollte ich meine Website prüfen?', answer: 'Nach jeder größeren Änderung: neues Theme, Migration, Plugin oder eine Reihe neuer Unterseiten. Darüber hinaus einmal im Monat. Das monatliche Audit können Sie nach der Freischaltung des vollständigen Ergebnisses aktivieren, dann schicken wir ihn Ihnen automatisch.' },
  { id: 'zmiana-od-poprzedniego-audytu', question: 'Sehe ich, ob sich die Punktzahl verbessert hat?', answer: 'Ja. Wenn diese Domain schon einmal geprüft wurde, zum Beispiel von Ihnen vor den Korrekturen oder von Ihrem Entwickler, zeigt das Ergebnis die Veränderung der Punktzahl und jeder Kategorie, etwa „+6 seit dem Audit vom 3.11.“. Wir vergleichen nur Zahlen derselben Domain; Details des früheren Audits sehen Sie nicht.' },
  { id: 'co-z-wynikiem-audytu', question: 'Was passiert mit der Adresse und dem Ergebnis des Audits?', answer: 'Wir speichern die Adresse der Website und das Ergebnis, um nach Angabe Ihrer E-Mail-Adresse die vollständige Liste zu zeigen und den Bericht zu versenden. Nach 60 Tagen löschen wir beides. Die Zahlen aus dem Ergebnis (Punktzahl und Kategorien) bleiben nur für den Vergleich mit einem späteren Audit derselben Domain erhalten, ohne Adressen der Unterseiten.' },
];

export default function AudytSeoStronaDe() {
  const wpis = wpisDe(KLUCZ);
  const meta = stronaNarzedzia('audyt-seo');
  const nazwy = STRONY_NARZEDZI_DE['audyt-seo'];
  const zrodla = meta.sources.map((z, i) => ({ ...z, nazwa: nazwy.zrodla[i] ?? z.nazwa }));
  const audyt = jesli('/audyt-seo');
  const llms = jesli('/narzedzia/generator-llms-txt');
  const autorytet = jesli('/narzedzia/autorytet-domeny');
  const cenaAudyt = eur(CENY.audytSeo.eur);
  return (
    <UkladDe
      klucz={KLUCZ}
      tag="Kostenloses Tool"
      h1={wpis.h1}
      okruszek={nazwy.okruszek}
      zrodla={zrodla}
      schema={{
        name: 'Kostenloser SEO Audit für Ihre Website',
        description: `Kostenloser SEO Audit: prüft bis zu ${AUDYT.stron} Unterseiten anhand von ${AUDYT.regul} Regeln, darunter robots.txt, Sitemap, Geschwindigkeit in PageSpeed Insights und KI-Tauglichkeit, und liefert eine Punktzahl von 1 bis 100 mit Fehlerliste und Anleitung zur Behebung.`,
        category: 'BusinessApplication',
        screenshot: { url: ZRZUT.src, width: ZRZUT.width, height: ZRZUT.height },
        featureList: [`Bis zu ${AUDYT.stron} Unterseiten in einem Audit`, `${regeln(AUDYT.regul)} in ${AUDYT.kategorii} Kategorien`, `PageSpeed-Insights-Wert für das Smartphone (Median aus ${AUDYT.przebiegiPsi} Messungen)`, 'Zugriff von KI-Bots in der robots.txt und die Datei llms.txt', 'Punktzahl von 1 bis 100 und Fehlerliste mit Anleitung zur Behebung'],
      }}
      lead={`Diese kostenlose SEO Analyse prüft bis zu ${AUDYT.stron} Unterseiten Ihrer Website anhand von ${regeln(AUDYT.regul)} und zeigt Ihnen ohne Anmeldung sofort die Punktzahl, vier Kategorien und die drei wichtigsten Fehler.`}
      narzedzie={<AudytSeoClientDe />}
      odpowiedz={`Das kostenlose SEO Audit prüft bis zu ${AUDYT.stron} Unterseiten Ihrer Website, verteilt auf deren Bereiche und Sprachversionen, anhand von ${AUDYT.regul} Regeln: Statuscodes, Weiterleitungen, Titel, Beschreibungen, Überschriften, Inhalt, Bilder, strukturierte Daten, robots.txt, Sitemap, mobile Geschwindigkeit und Zugriff von KI-Bots. Das Ergebnis ist eine Punktzahl von 1 bis 100 in vier Kategorien und eine Problemliste mit Anleitung zur Behebung.`}
      faq={FAQ}
      tytulFaq="Fragen zum kostenlosen SEO Audit"
    >
      <CoDostajesz
        id="was-sie-erhalten"
        tytul="Das erhalten Sie im kostenlosen Audit"
        tytulOdRazu="Sofort, ohne Anmeldung"
        tytulPoEmailu="Nach Angabe Ihrer E-Mail-Adresse"
        odRazu={[
          'Eine Punktzahl von 1 bis 100.',
          'Die Punktzahl jeder der vier Kategorien mit der Zahl der Fehler, Warnungen und Hinweise.',
          'Vier PageSpeed-Insights-Werte für das Smartphone: Performance, SEO, Barrierefreiheit und Best Practices.',
          'Die drei wichtigsten Probleme mit Beschreibung, Anleitung zur Behebung und Beispieladressen betroffener Unterseiten.',
          'Einen Link zum Ergebnis, der das Audit mit eingetragener Adresse öffnet (zum Beispiel für Ihre Entwickler).',
          'Die Veränderung von Punktzahl und Kategorien seit dem letzten Audit dieser Domain, etwa „+6 seit dem Audit vom 3.11.“, falls sie schon einmal geprüft wurde.',
        ]}
        poEmailu={[
          `Alle gefundenen Probleme mit den Adressen der Unterseiten (bis zu ${AUDYT.stron} je Problem).`,
          'Einen Kategoriefilter: Technik, Inhalt, Performance, KI-Tauglichkeit.',
          'Einen Bericht per E-Mail, den Sie an Ihre Entwickler weitergeben können.',
          'Auf Wunsch: ein monatliches Audit dieser Domain per E-Mail, mit der Veränderung der Punktzahl sowie neuen und behobenen Problemen (gesonderte Einwilligung und Bestätigung per Link in einer E-Mail, mit einem Klick abschaltbar).',
        ]}
      >
        <p style={{ ...s.akapit, marginTop: '1rem' }}><strong>Was Sie damit tun:</strong> Beginnen Sie mit den Fehlern und beheben Sie danach die Warnungen. Hinweise erledigen Sie bei Gelegenheit zusammen mit anderen Änderungen. Starten Sie das Audit nach den Korrekturen erneut und vergleichen Sie die Punktzahl.</p>
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Kostenloser SEO Audit: Beispielergebnis für example.com mit einer Punktzahl von 1 bis 100, vier Kategorien und den wichtigsten Problemen"
            podpis="Beispielergebnis mit Demodaten: Die Domain example.com, die Punktzahl und die Probleme sind beispielhaft und stammen nicht von einer echten Website. Sichtbar ist, was Sie sofort erhalten; die vollständige Problemliste zeigen wir nach Angabe Ihrer E-Mail-Adresse. Screenshot vom 18.11.2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="was-prueft-der-audit" tytul={`SEO Audit Tools: Was unser kostenloser Audit prüft (${regeln(AUDYT.regul)} in ${AUDYT.kategorii} Kategorien)`}>
        <p style={s.akapit}>Jede Regel hat einen im Code festgelegten Schwellenwert, etwa einen Titel über 60 Zeichen, eine Serverantwort langsamer als 1,5 Sekunden oder eine Startseite schwerer als 3 MB. Zu jedem Problem erhalten Sie eine Beschreibung der Auswirkung, eine Anleitung zur Behebung und die Adressen der betroffenen Unterseiten.</p>
        <h3 style={s.h3}>Technik ({regeln(R.techniczne)}, {W.techniczne} % der Punktzahl)</h3>
        <p style={s.akapit}>HTTPS und Weiterleitungen, Versionen mit und ohne www, 4xx- und 5xx-Fehler, Weiterleitungsketten, Canonical-URLs, noindex (auch auf der Startseite und in ganzen Bereichen, etwa in einer Sprachversion unter /en/), das Attribut lang, das Meta-Tag viewport, über http:// geladene Ressourcen auf einer https://-Seite, defekte interne Links und tote externe Links (404 oder 410), Soft-404 (ob eine nicht vorhandene Adresse den Code 404 liefert), hreflang auf der Startseite und auf Unterseiten mehrsprachiger Websites (einschließlich Rückverweisen), robots.txt, Sitemap und Adressen in der Sitemap, die dort nicht stehen sollten (mit noindex, Weiterleitung, Fehler oder einem Canonical auf eine andere Seite).</p>
        <h3 style={s.h3}>Inhalt ({regeln(R.tresc)}, {W.tresc} % der Punktzahl)</h3>
        <p style={s.akapit}>Titel und Meta-Beschreibungen (fehlend, Länge, Duplikate), H1-Überschriften (fehlend oder mehrere), die Textmenge im HTML (unter 250 Wörtern gibt es eine Warnung), Alt-Texte von Bildern und Open-Graph-Tags, die bestimmen, wie die Seite beim Teilen in sozialen Netzwerken aussieht.</p>
        <h3 style={s.h3}>Performance ({regeln(R.wydajnosc)}, {W.wydajnosc} % der Punktzahl)</h3>
        <p style={s.akapit}>Der Lighthouse-Wert für das Smartphone aus Google PageSpeed Insights (Median aus drei unabhängigen Messungen, denn eine einzelne kann um 10 Punkte abweichen), LCP und CLS (aus Daten echter Nutzer, sofern die Website welche hat), Gewicht der Startseite mit einer Liste der größten Dateien, zu optimierende Bilder (Format, Größe, Kompression), Bilder ohne width und height, Antwortzeit des Servers und Größe des HTML.</p>
        <h3 style={s.h3}>KI-Tauglichkeit ({regeln(R.ai)}, {W.ai} % der Punktzahl)</h3>
        <p style={s.akapit}>Ob der Text ohne Ausführung von JavaScript im HTML steht (KI-Bots führen es nicht aus), ob die robots.txt die KI-Suchbots (OAI-SearchBot, PerplexityBot, Claude-SearchBot) zulässt und wie die Trainings-Bots (GPTBot, ClaudeBot, Google-Extended) eingestellt sind, strukturierte Daten Ihres Unternehmens (Organization oder LocalBusiness) samt gültigem JSON-LD und eine Datei llms.txt mit Links zu Ihren Unterseiten{llms ? <> (erstellen können Sie sie im <Link href={llms} style={s.podkreslenie}>llms.txt Generator</Link>)</> : null}.</p>
      </Sekcja>

      <Sekcja id="so-berechnen-wir-die-punktzahl" tytul="So berechnen wir die Punktzahl von 1 bis 100">
        <p style={s.akapit}>Jede der {AUDYT.regul} Regeln hat ein Gewicht in Punkten. Eine nicht erfüllte Regel zieht das Dreifache ihres Gewichts von ihrer Kategorie ab, die Abzüge addieren sich. Bei Regeln, die einzelne Unterseiten betreffen, kostet schon eine betroffene Unterseite 40 % des Abzugs, der Rest wächst mit dem Anteil der betroffenen Unterseiten. Regeln für die ganze Website, etwa Soft-404 oder das Gewicht der Startseite, ziehen den vollen Abzug ab. Die Gesamtpunktzahl ist der gewichtete Durchschnitt der vier Kategorien.</p>
        <p style={s.akapit}>Beispiel: noindex auf der Startseite (Gewicht 15 Punkte) zieht 45 Punkte von der Kategorie Technik ab, das sind rund 16 Punkte der Gesamtpunktzahl. Eine fehlende Meta-Beschreibung auf 1 von 20 Unterseiten kostet die Kategorie Inhalt knapp 4 Punkte.</p>
        <CompareTable
          id="tabelle-punktzahl"
          caption="Kategorien des kostenlosen SEO Audits und ihr Gewicht in der Punktzahl"
          columns={[
            { key: 'kategoria', label: 'Kategorie' },
            { key: 'regul', label: 'Regeln' },
            { key: 'waga', label: 'Gewicht in der Punktzahl' },
            { key: 'najciezsze', label: 'Regeln mit dem größten Gewicht' },
          ]}
          rows={[
            { id: 't', kategoria: 'Technik', regul: R.techniczne, waga: `${W.techniczne} %`, najciezsze: 'robots.txt sperrt die ganze Website, noindex auf der Startseite, 4xx- und 5xx-Fehler, kein HTTPS' },
            { id: 'c', kategoria: 'Inhalt', regul: R.tresc, waga: `${W.tresc} %`, najciezsze: 'fehlender Seitentitel, fehlende H1-Überschrift' },
            { id: 'w', kategoria: 'Performance', regul: R.wydajnosc, waga: `${W.wydajnosc} %, davon 70 % der PageSpeed-Wert auf dem Smartphone (Median aus ${AUDYT.przebiegiPsi} Messungen)`, najciezsze: 'PageSpeed unter 50, Startseite schwerer als 5 MB' },
            { id: 'a', kategoria: 'KI-Tauglichkeit', regul: R.ai, waga: `${W.ai} %`, najciezsze: 'Inhalt erst nach Ausführung von JavaScript sichtbar, robots.txt sperrt KI-Suchbots' },
          ]}
          przypis="Antwortet PageSpeed Insights nicht, fließt die Performance nicht in die Punktzahl ein, und die Gewichte der übrigen Kategorien werden anteilig angepasst. Das Ergebnis trägt dann den Vermerk „Performance: nicht gemessen“."
        />
      </Sekcja>

      <Sekcja id="so-lesen-sie-die-punktzahl" tytul="So lesen Sie die Punktzahl">
        <p style={s.akapit}>Ab 80 Punkten sind die Grundlagen in Ordnung, und es lohnt sich, Inhalte und Links in den Blick zu nehmen. Von 50 bis 79 gibt es Probleme, die Ihre Sichtbarkeit tatsächlich einschränken: Beginnen Sie mit den Fehlern, dann folgen die Warnungen. Unter 50 hat die Website gravierende Lücken. Prüfen Sie zuerst die technischen Fehler (noindex, robots.txt, 4xx/5xx-Codes), denn sie können die Indexierung blockieren.</p>
        <p style={s.akapit}>Am aussagekräftigsten ist die Punktzahl im Vergleich mit der Konkurrenz. Das Audit funktioniert für jede öffentliche Website, prüfen Sie also auch 2 bis 3 Unternehmen, die in Google vor Ihnen stehen: Entscheidend ist der Unterschied bei den Fehlern, nicht die Zahl allein.{autorytet ? <> Die Linkstärke dieser Domains vergleichen Sie im <Link href={autorytet} style={s.podkreslenie}>Domain Authority Checker</Link>.</> : null}</p>
        <p style={s.akapit}>Die Punktzahl ist keine Position in Google. Sie zeigt, wie viele Hindernisse Ihrer Website im Weg stehen. Über die Position entscheiden auch Inhalt, Links und Konkurrenz, die wir im {audyt ? <Link href={audyt} style={s.podkreslenie}>vollständigen SEO Audit</Link> : 'vollständigen SEO Audit'} prüfen.</p>
      </Sekcja>

      <Sekcja id="punktzahl-verbessern" tytul="SEO-Punktzahl verbessern: Womit Sie anfangen">
        <p style={s.akapit}>Die Reihenfolge der Schritte folgt den Gewichten der Regeln: zuerst das, was die meisten Punkte kostet.</p>
        <ol style={s.lista}>
          <li><strong>Zuerst das, was die Indexierung blockiert.</strong> Eine robots.txt mit Disallow: / für alle Bots, noindex auf der Startseite, fehlendes HTTPS und Unterseiten mit 4xx- oder 5xx-Fehler haben das größte Gewicht in der Punktzahl. Beheben Sie sie vor allem anderen.</li>
          <li><strong>Text im HTML, nicht nur in JavaScript.</strong> Zeigt das Audit „Inhalt ohne JavaScript nicht sichtbar“, aktivieren Sie Server-Side-Rendering oder Prerendering. KI-Bots führen JavaScript meist nicht aus, ohne das haben sie nichts zu zitieren.</li>
          <li><strong>Titel, Beschreibungen und Überschriften.</strong> Jede wichtige Unterseite braucht einen eigenen Titel von bis zu etwa 60 Zeichen, eine Meta-Beschreibung von 120 bis 160 Zeichen und genau eine H1-Überschrift.</li>
          <li><strong>Gewicht und Bilder der Startseite.</strong> Beginnen Sie mit den größten Dateien aus der Liste im Ergebnis: Speichern Sie Bilder als WebP oder AVIF in der angezeigten Größe und ergänzen Sie width und height. Ersetzen Sie ein Hintergrundvideo durch ein Vorschaubild oder eine leichtere Version.</li>
          <li><strong>Zugriff von KI-Bots und Unternehmensdaten.</strong> Lassen Sie die Suchbots der KI-Anbieter (OAI-SearchBot, PerplexityBot, Claude-SearchBot) in der robots.txt zu. ChatGPT-User handelt auf Anfrage eines Nutzers und entscheidet nicht über die Präsenz in der ChatGPT-Suche, und Google-Extended betrifft nur Gemini und hat keinen Einfluss auf die Google-Suche oder AI Overviews. Ergänzen Sie auf der Startseite strukturierte Daten vom Typ Organization oder LocalBusiness und eine Datei llms.txt mit Links zu Ihren Unterseiten.</li>
          <li><strong>Erneut prüfen.</strong> Starten Sie das Audit nach den Korrekturen noch einmal. Eine einzelne PageSpeed-Messung kann stark schwanken: Am 11. November 2026 ergaben elf Messungen unserer eigenen Website zwischen 59 und 81 Punkte. Der Median aus zwei Messungen lag im selben Test zwischen 69 und 76, deshalb messen wir dreimal gleichzeitig und nehmen den Median. Beim nächsten Audit derselben Domain zeigt das Ergebnis die Veränderung gegenüber dem vorherigen. Beurteilen Sie trotzdem vor allem die Veränderung der Fehlerliste und nicht die Zahl allein.</li>
        </ol>
      </Sekcja>

      <Sekcja id="was-der-audit-gefunden-hat" tytul="Was das Audit auf echten Websites gefunden hat">
        <p style={s.akapit}>Am 11. November 2026 haben wir mit dem Audit 6 polnische Unternehmenswebsites geprüft und jeden Fund von Hand bestätigt. Einige Beispiele (ohne Firmennamen, außer unserem eigenen):</p>
        <ul style={s.lista}>
          <li><strong>Dienstleister mit englischer Version:</strong> noindex auf allen 12 geprüften Adressen unter /en/, die gesamte Sprachversion also außerhalb von Google. Die Startseite war in Ordnung, ein Audit einer einzelnen Adresse hätte das nicht gezeigt.</li>
          <li><strong>Möbelhersteller auf WordPress:</strong> 2 Adressen in der Sitemap mit Fehler 404 (von einem Theme-Plugin hinzugefügt) und eine Startseite mit 15,9 MB, davon 13,9 MB ein Hintergrundvideo.</li>
          <li><strong>Unternehmen aus dem 3D-Druck:</strong> 2 Links auf Wikipedia-Artikel, die es nicht mehr gibt (Code 404). Von Hand sind sie schwer zu finden, und sie schaden der Glaubwürdigkeit des Inhalts.</li>
          <li><strong>Sanitärbetrieb:</strong> 24 Unterseiten, auf die der Server länger als 1,5 Sekunden brauchte.</li>
          <li><strong>Unsere eigene Website ai-seo-company.pl:</strong> Punktzahl 94; PageSpeed auf dem Smartphone 76 (Median der Messungen 79 und 72), die gesamte Kategorie Performance 72.</li>
        </ul>
        <p style={s.akapit}>Deshalb prüfen wir bis zu {AUDYT.stron} Unterseiten, einige aus jedem Bereich und jeder Sprachversion, und nicht nur eine einzelne Adresse.</p>
      </Sekcja>

      <Sekcja id="ohne-konto" tytul="SEO Analyse kostenlos und ohne Konto: Vergleich mit Ahrefs Webmaster Tools und Search Console">
        <p style={s.akapit}>Zwei verbreitete kostenlose Tools zur Prüfung einer Website verlangen ein Konto und den Nachweis, dass die Website Ihnen gehört. Unser Audit liefert das Ergebnis direkt auf dieser Seite, ohne Konto, auch für die Website eines Konkurrenten.</p>
        <CompareTable
          id="tabelle-ohne-konto"
          caption="Kostenloser SEO Audit, Ahrefs Webmaster Tools und Google Search Console"
          columns={[
            { key: 'cecha', label: 'Merkmal' },
            { key: 'my', label: 'Unser kostenloses Audit' },
            { key: 'awt', label: 'Ahrefs Webmaster Tools' },
            { key: 'gsc', label: 'Google Search Console' },
          ]}
          rows={[
            { id: 'konto', cecha: 'Konto', my: 'nicht nötig', awt: 'kostenloses Ahrefs-Konto', gsc: 'Google-Konto' },
            { id: 'wlasnosc', cecha: 'Nachweis, dass die Website Ihnen gehört', my: 'nein', awt: 'ja, vor dem Audit', gsc: 'ja' },
            { id: 'konkurent', cecha: 'Website eines Konkurrenten', my: 'ja, jede öffentliche Website', awt: 'nein, fremde Domains nur in kostenpflichtigen Tarifen', gsc: 'nein' },
            { id: 'kiedy', cecha: 'Wann das Ergebnis da ist', my: 'auf dieser Seite, meist nach 20 bis 90 Sekunden', awt: 'in der App, nach Anlegen eines Projekts und dem Scan', gsc: 'Daten sammeln sich einige Tage nach dem Hinzufügen der Website' },
            { id: 'zakres', cecha: 'Umfang', my: `bis zu ${AUDYT.stron} Unterseiten, ${AUDYT.regul} Regeln`, awt: '5.000 Crawl-Credits pro Monat und Projekt (1 Credit = 1 HTML-Seite mit Code 200)', gsc: 'die Seiten, die Google kennt' },
            { id: 'ai', cecha: 'KI-Tauglichkeit: KI-Bots in der robots.txt, llms.txt, Inhalt ohne JavaScript', my: `ja, ${regeln(R.ai)}`, awt: 'auf der Seite des Tools nicht erwähnt', gsc: 'nein, die Berichte betreffen die Crawler von Google' },
            { id: 'dane', cecha: 'Echte Google-Daten: Klicks, Impressionen, Indexierung', my: 'nein', awt: 'nein, eigene Schätzungen zu Traffic und Keywords', gsc: 'ja' },
          ]}
          przypis={<>Quellen: Ahrefs, Seiten <a href={ZRODLA.awt} style={zewn} rel="noopener" target="_blank">Ahrefs Webmaster Tools</a> und <a href={ZRODLA.checker} style={zewn} rel="noopener" target="_blank">Website Checker</a> (Limits und FAQ), Abruf 11.11.2026; Google, <a href={`${ZRODLA.gscWeryfikacja}?hl=de`} style={zewn} rel="noopener" target="_blank">Search-Console-Hilfe: Inhaberschaft der Website bestätigen</a> und <a href={ZRODLA.gsc} style={zewn} rel="noopener" target="_blank">Überblick über die Search Console</a>, Abruf 12.11.2026.</>}
        />
        <p style={s.akapit}>Diese Tools ergänzen sich. Die Search Console ist die einzige Quelle echter Google-Daten zu Ihrer Website und gehört immer dazu. Ahrefs Webmaster Tools scannt mehr Unterseiten, wenn Sie die Inhaberschaft bestätigen. Unseren Audit starten Sie in einer Minute, ohne Konto, auch für die Website eines Konkurrenten, und er enthält Regeln zur KI-Tauglichkeit.</p>
      </Sekcja>

      <Sekcja id="grenzen-des-audits" tytul="Was das kostenlose Audit nicht prüft">
        <ul style={s.lista}>
          <li>Wir prüfen eine Stichprobe von bis zu {AUDYT.stron} Unterseiten: die Startseite, die von ihr verlinkten Seiten und Adressen aus der Sitemap (bis zu {AUDYT.mapPodrzednych} untergeordnete Sitemaps). Wir wählen einige Adressen aus jeder Sprachversion und jedem Bereich, etwa /blog/ und /leistungen/, aber bei einer großen Website bleiben die meisten Unterseiten außerhalb des Audits.</li>
          <li>Die Geschwindigkeit messen wir in PageSpeed Insights auf dem Smartphone, nur für die Startseite: drei Labormessungen gleichzeitig und der Median der Messungen, die innerhalb von 30 Sekunden fertig werden. In unserem Test vom 12.11.2026 waren in 36 von 37 Versuchen mindestens zwei Messungen rechtzeitig fertig. Schafft es nur eine, stammt das Ergebnis aus einer einzigen Messung, und das Ergebnis sagt es. Daten echter Nutzer (LCP, CLS) erscheinen nur, wenn Google sie hat.</li>
          <li>Wir lesen das HTML so, wie der Server es sendet, ohne JavaScript auszuführen, also wie die meisten KI-Bots. Per Skript nachgeladene Inhalte können im Audit unsichtbar sein, und auch das ist ein Befund.</li>
          <li>Doppelte Titel und Beschreibungen erkennen wir nur unter den geprüften Unterseiten, und Inhaltsregeln wenden wir nur auf Seiten ohne noindex an.</li>
          <li>Externe Links prüfen wir nur auf die Codes 404 und 410, bis zu 30 Adressen und höchstens 3 je Domain. Soziale Netzwerke, die Roboter blockieren, lassen wir aus.</li>
          <li>Wir prüfen weder Links auf Ihre Website noch Keywords, Positionen in Google oder Daten aus der Search Console. Das ist der Umfang des kostenpflichtigen SEO Audits.</li>
        </ul>
      </Sekcja>

      <Sekcja id="kostenloser-und-vollstaendiger-audit" tytul="Kostenloses Audit und vollständiger SEO Audit">
        <CompareTable
          id="tabelle-kostenlos-vollstaendig"
          caption="Kostenloses Audit und kostenpflichtiger SEO Audit"
          columns={[
            { key: 'co', label: '' },
            { key: 'darmowy', label: 'Kostenloser Audit' },
            { key: 'pelny', label: `SEO Audit (ab ${cenaAudyt} netto)` },
          ]}
          rows={[
            { id: 'zakres', co: 'Umfang', darmowy: `bis zu ${AUDYT.stron} Unterseiten`, pelny: 'die gesamte Website' },
            { id: 'co', co: 'Was geprüft wird', darmowy: `${AUDYT.regul} automatische Regeln: Technik, Inhalt, Performance, KI-Tauglichkeit`, pelny: 'dasselbe plus Keywords, Konkurrenz, Linkprofil und Daten aus der Search Console' },
            { id: 'czas', co: 'Dauer', darmowy: 'meist 20 bis 90 Sekunden', pelny: '3 bis 5 Werktage' },
            { id: 'wynik', co: 'Ergebnis', darmowy: 'Punktzahl von 1 bis 100 und Problemliste mit Anleitung zur Behebung', pelny: 'jeder Fehler mit Priorität und Anleitung für Entwickler, Maßnahmenplan und Angebot' },
            { id: 'konto', co: 'Konto', darmowy: 'nicht nötig; E-Mail nur für die vollständige Liste', pelny: '-' },
          ]}
          przypis="Preise netto zzgl. gesetzlicher MwSt."
        />
        {audyt && (
          <p style={{ marginTop: '1.25rem', textAlign: 'center' }}>
            <Link href={audyt} className="btn btn-secondary" data-cta="audyt_darmowy_pelny">Leistungsumfang des SEO Audits ansehen</Link>
          </p>
        )}
      </Sekcja>

      <WeitereToolsDe bez={KLUCZ} />
    </UkladDe>
  );
}
