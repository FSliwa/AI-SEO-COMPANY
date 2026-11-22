// Texte und Daten der deutschen Seite „KI-Sichtbarkeit prüfen“ (/de/ki-sichtbarkeit-pruefen), Gruppe de-geo.
// Reiner ESM-Code ohne React. Fakten und Zahlen wie auf der polnischen Seite (components/AiCheckerClient.jsx) und aus
// lib/narzedziaLiczby.js (WIDOCZNOSC, CENY): 3 Fragen, Engines, Limit pro IP, 5 Unternehmen und 5 Domains vor der
// E-Mail-Schranke, Audit 235 € netto. Der Check läuft über das Panel (/api/narzedzia/widocznosc-ai mit lang 'de');
// Fragen, Ergebnistexte und Standort Deutschland liefert das Panel (Kontrakt: ai-seo-prace/de/de-panel/KONTRAKT.md).
// Links nur zu deutschen Seiten: hrefDe liefert null ohne Seite.
import { hrefDe } from '../stronyDe';
import { SIEDZIBA } from '../firma';
import { WIDOCZNOSC, CENY } from '../narzedziaLiczby';

export const STAND = '2026-11-18';
export const SCHLUESSEL = '/sprawdz-widocznosc-w-ai';

const W = WIDOCZNOSC;
export const AUDIT_PREIS = `${CENY.audytAi.eur}\u00a0€ netto`; // 235 € netto

const verweis = (klucz, text) => {
  const h = hrefDe(klucz);
  return h ? `<a href="${h}">${text}</a>` : text;
};

const NAMEN = { 'Google AI Overviews': 'AI Overviews in Google' };
/** „ChatGPT, Gemini, Perplexity, Claude und AI Overviews in Google“ (Grok kommt von selbst dazu, sobald WIDOCZNOSC.grok true ist). */
export function listeEngines() {
  const l = W.silniki.en.map((n) => NAMEN[n] || n);
  return `${l.slice(0, -1).join(', ')} und ${l[l.length - 1]}`;
}
/** Anzahl der Engines in Worten. */
export function anzahlEngines() {
  return { 5: 'fünf', 6: 'sechs' }[W.silnikow] ?? String(W.silnikow);
}
const MIT_SUCHE = W.geminiZWyszukiwaniem ? 'ChatGPT, Gemini, Perplexity und Claude' : 'ChatGPT, Perplexity und Claude';

export const KOPF = {
  tag: 'Kostenloser Check',
  lead: `Ihre KI Sichtbarkeit live messen: Wir prüfen, ob ${listeEngines()} Ihr Unternehmen nennen, wenn ein Kunde drei typische Fragen stellt. Das Ergebnis liegt in etwa 2 Minuten vor, ohne Anmeldung.`,
  kurz: `KI-Sichtbarkeit prüfen Sie, indem Sie KI-Assistenten die Fragen stellen, die Ihre Kunden stellen, und zählen, in wie vielen Antworten Ihr Firmenname fällt. Unser Check erledigt das kostenlos: ${W.pytan} Fragen, ${W.silnikow} Engines (${listeEngines()}), ein Wert von 0 bis 100 in etwa 2 Minuten. Ein Check ist eine Stichprobe, vergleichen Sie deshalb die Ergebnisse mehrerer Checks.`,
  angebot: 'Sie möchten wissen, wie Sie das ändern? Im Audit prüfen wir 30 Fragen in ChatGPT, Perplexity, Gemini und Google, zeigen, wen die Modelle statt Ihnen empfehlen und auf welche Seiten sie sich stützen.',
  angebotKnopf: `KI-Sichtbarkeit Audit: ${AUDIT_PREIS}`,
};

export const ODER_NACH_EMAIL = {
  titel: 'Was Sie kostenlos erhalten',
  tOhne: 'Sofort, ohne Anmeldung',
  tMit: 'Nach Eingabe Ihrer E-Mail',
  ohne: [
    'Einen Wert von 0 bis 100: der Anteil der Antworten, in denen Ihr Unternehmen genannt wird.',
    `Ein Raster „genannt / nicht genannt“ für jede Engine und jede der ${W.pytan} Fragen sowie den Wortlaut der Fragen (mit Kennzeichnung der aus Ihrer Website abgeleiteten und der von Ihnen geänderten Fragen).`,
    `Die ${W.przedBramka.firm} Unternehmen, die die Modelle am häufigsten nennen, und die ${W.przedBramka.domen} am häufigsten zitierten Seiten, mit Anzahl der Nennungen.`,
    'Wenn Ihr Firmenname nur aus allgemeinen Wörtern besteht, sagt das Ergebnis sofort, wie wir Nennungen zählen.',
  ],
  mit: [
    'Die vollständigen Antworten (bis zu 1.500 Zeichen je Antwort) mit dem Ausschnitt, in dem Ihr Unternehmen genannt wird.',
    'Die Quellen jeder Antwort.',
    'Alle Unternehmen, die die Modelle nennen (bis zu 10), und alle Seiten, auf die sie sich stützen (bis zu 12).',
    'Dasselbe Ergebnis in Ihrem Posteingang.',
  ],
  wasTun: 'Was Sie damit tun: Die Seiten aus der Quellenliste sind die Orte, an denen sich eine Erwähnung lohnt. Die Unternehmen aus der Liste sind Ihre Konkurrenz in KI-Antworten, auch wenn Sie sie in Google nicht sehen.',
};

export const SCHRITTE = {
  titel: 'So funktioniert der KI-Sichtbarkeit Check',
  schritte: [
    ['Drei Fragen wie von einem Kunden', 'Aus Branche und Stadt formulieren wir zwei Fragen, zum Beispiel: „Welches Unternehmen aus der Branche ‚Schreiner‘ empfehlen Sie in München? Nennen Sie einige Namen.“ Wenn Sie Ihre Website angeben und deren Titel und Beschreibung eine konkrete Leistung nennen, formulieren wir daraus die dritte Frage, zum Beispiel: „Ich suche: Küchen nach Maß, Hamburg. Welches Unternehmen soll ich wählen und warum?“ Ohne Website entsteht die dritte Frage ebenfalls aus Branche und Stadt. Bevor wir fragen, zeigen wir Ihnen die Fragen, und Sie können jede ändern, etwa um eine Leistung oder einen Stadtteil zu ergänzen. Schreiben Sie darin nicht Ihren Firmennamen oder Ihre Adresse, denn das Modell würde ihn in der Antwort wiederholen.'],
    [`${anzahlEngines()[0].toUpperCase()}${anzahlEngines().slice(1)} KI-Engines`, `Jede Frage stellen wir ChatGPT mit Websuche, eingestellt auf Deutschland (und Ihre Stadt, falls Sie eine angeben), ${W.geminiZWyszukiwaniem ? 'Gemini mit Google-Suche' : 'Gemini aus dem Modellwissen (ohne Websuche)'}, Perplexity und Claude mit Websuche, ${W.grok ? 'Grok aus dem Modellwissen (ohne Websuche), ' : ''}und in Google prüfen wir die AI Overviews. Microsoft Copilot hat keine öffentliche API, deshalb fragen wir ihn nicht ab und sagen das im Ergebnis.`],
    ['Wir suchen Ihr Unternehmen', 'In jeder Antwort prüfen wir, ob Ihr Firmenname oder die Adresse Ihrer Website vorkommt, und speichern die Quellen, auf die sich das Modell beruft. Der Wert von 0 bis 100 ist der Anteil der Antworten, in denen Ihr Unternehmen erscheint. Aus den Antworten sammeln wir außerdem die Unternehmen, die die Modelle nennen, und die Seiten, die sie zitieren.'],
  ],
};

export const METHODE = {
  titel: 'Was unseren Check von anderen unterscheidet',
  einleitung: 'Werkzeuge für KI-Sichtbarkeit messen drei verschiedene Dinge. Unser Check stellt Fragen live, so wie ein Kunde, und zeigt die Antwort, in der Ihr Unternehmen genannt wird oder nicht.',
  caption: 'Drei Wege, KI-Sichtbarkeit zu messen',
  spalten: [
    { key: 'k', label: 'Kriterium' },
    { key: 'my', label: 'Live-Fragen mit Websuche (unser Check)' },
    { key: 'baza', label: 'Datenbank vorbereiteter Fragen' },
    { key: 'model', label: 'Frage an ein Modell ohne Websuche' },
  ],
  zeilen: [
    { k: 'Woher die Antwort kommt', my: `${MIT_SUCHE} suchen im Moment der Frage im Netz; AI Overviews aus den aktuellen Google-Ergebnissen`, baza: 'aus Antworten auf Fragen, die der Anbieter des Werkzeugs vorher gesammelt hat', model: 'aus Wissen, das das Modell vor seiner Veröffentlichung gelernt hat' },
    { k: 'Fragen', my: '3 Fragen: 2 aus Ihrer Branche und Stadt, 1 aus Titel und Beschreibung Ihrer Website; jede können Sie vor dem Check ändern', baza: 'Fragen aus der Datenbank des Anbieters', model: 'meist Fragen zur Marke' },
    { k: 'Kleines lokales Unternehmen', my: 'erhält ein Ergebnis, denn wir fragen nach Branche, Stadt und Ihrem Angebot', baza: 'steht das Unternehmen nicht in der Datenbank, gibt es unter Umständen gar kein Ergebnis', model: 'das Modell kennt das Unternehmen womöglich nicht, obwohl eine Suchmaschine es finden würde' },
    { k: 'Was Sie sehen', my: 'Antworten, den Ausschnitt mit der Nennung, Unternehmen und Quellen', baza: 'Zahl der Nennungen und Themen', model: 'die Antwort oder Einschätzung des Modells' },
  ],
  grenzenTitel: 'Grenzen des Checks',
  grenzen: [
    'Drei Fragen sind eine Stichprobe. Geben Sie keine Website an, formulieren wir alle drei aus Branche und Stadt, und bei einem Nischenangebot fällt das Ergebnis dann oft niedriger aus als bei Fragen zu einer konkreten Leistung. Geben Sie die Adresse Ihrer Website an, dann formulieren wir eine Frage aus ihrem Titel und ihrer Beschreibung. Sie können die Fragen vor dem Check auch so ändern, wie Ihre Kunden fragen.',
    'Eine Engine, die im Ergebnis mit „ohne Websuche“ gekennzeichnet ist, antwortet aus dem Modellwissen. Diese Zeile sagt, ob das Modell Ihr Unternehmen kennt, nicht, ob es es im Netz finden würde.',
    'Den Firmennamen suchen wir als ganze Wörter. Besteht der Name nur aus allgemeinen Wörtern (zum Beispiel „SEO Agentur Berlin“), zählen wir eine Nennung nur dann, wenn die Antwort die Adresse Ihrer Website nennt oder den Namen als Eigennamen schreibt. Ein solches Ergebnis kann zu niedrig sein, prüfen Sie deshalb die Antwortausschnitte im vollständigen Ergebnis.',
    'Antworten ändern sich von Tag zu Tag. In zwei Durchläufen für dasselbe Unternehmen erhielten wir 18 und 36 Punkte, vergleichen Sie deshalb die Ergebnisse mehrerer Checks.',
    'Der Check ist auf den deutschen Markt eingestellt: Die Fragen stellen wir auf Deutsch, ChatGPT und Claude suchen mit dem Standort Deutschland, AI Overviews lesen wir aus den Google-Ergebnissen für Deutschland. Für Unternehmen in Österreich oder der Schweiz ist das nur eine Näherung, für Unternehmen, die ausschließlich im Ausland tätig sind, ist das Ergebnis weniger aussagekräftig.',
  ],
};

export const LESEN = {
  titel: 'So lesen Sie das Ergebnis',
  stufen: [
    ['0', 'Die Modelle verbinden Ihr Unternehmen nicht mit Branche und Stadt. Häufige Ursachen: ein schwaches Google Unternehmensprofil, wenige Bewertungen, keine Einträge in Verzeichnissen und Zusammenstellungen, eine Website ohne klare Beschreibung von Leistungen und Standort.'],
    ['1-49', 'Das Unternehmen erscheint, aber nicht in jeder Frage und nicht in jedem Modell. Sehen Sie sich die Quellen in den Antworten an: Das sind die Seiten, auf denen sich eine Erwähnung lohnt.'],
    ['50-100', 'Die Modelle nennen Ihr Unternehmen. Prüfen Sie das regelmäßig, denn Antworten ändern sich von Tag zu Tag.'],
  ],
};

export const WEITER = {
  titel: 'Was tun, wenn ChatGPT Ihr Unternehmen nicht empfiehlt',
  punkte: [
    'Vervollständigen Sie Ihr Google Unternehmensprofil und sammeln Sie nach jedem Auftrag Bewertungen, denn das ist die Grundlage für lokales SEO.',
    `Sorgen Sie für Erwähnungen in den Verzeichnissen und Zusammenstellungen, die die Modelle in Ihrer Branche zitieren. Die ${W.przedBramka.domen} am häufigsten zitierten Seiten sehen Sie sofort im Ergebnis, die Quellen jeder Antwort im vollständigen Ergebnis.`,
    'Beschreiben Sie Leistungen, Stadt und Einsatzgebiet auf Ihrer Website in einfachen Sätzen, die sich ohne Kontext zitieren lassen.',
    'Prüfen Sie, ob Ihre robots.txt die Crawler OAI-SearchBot und PerplexityBot nicht sperrt. Eine Sperre schließt Ihre Seite von den Zitaten dieser Werkzeuge aus.',
    'Messen Sie Veränderungen regelmäßig. Bei der Generative Engine Optimization prüfen wir 30 Fragen in ChatGPT, Perplexity, Gemini und Google; die wöchentliche Messung im Kundenportal kostet als Aufpreis zu SEO Standard 115 € netto pro Monat (in SEO Premium enthalten).',
  ],
};

// Links, die an die WEITER-Liste angehängt werden, wenn die Zielseite auf Deutsch existiert: [Index in punkte, Schlüssel, Text, Satz davor].
export const WEITER_LINKS = [
  [2, '/porownania/seo-vs-geo', 'SEO vs GEO', 'Solche Beschreibungen helfen in Google und in Antworten von Modellen: Was in beiden wirkt, zeigen wir im Vergleich'],
  [3, '/narzedzia/generator-llms-txt', 'llms.txt Generator', 'Den Zugriff von KI-Bots auf Ihre Website prüft auch unser kostenloser'],
  [4, '/pozycjonowanie-w-ai', 'Generative Engine Optimization', 'Mehr dazu auf der Seite'],
];

export const QUELLEN = {
  titel: 'Quellen und Stand der Methode',
  punkte: [
    'Methode laut Code des Checks, Stand 12.11.2026: ChatGPT (gpt-4.1-mini), Gemini (bis 30.11.2026 gemini-2.5-flash; ab 01.12.2026 leitet Google Anfragen an dieses Modell auf gemini-3.5-flash-lite um, laut der Seite zur Abkündigung von Modellen, abgerufen am 18.11.2026, den Namen aktualisieren wir nach der Migration) und Perplexity (sonar) fragen wir über die DataForSEO-API ab, Claude über die Anthropic-API mit dem Werkzeug für Websuche, und AI Overviews lesen wir aus den Google-Ergebnissen des eingestellten Marktes (DataForSEO). Die Apps von ChatGPT und Gemini, die Ihre Kunden nutzen, können neuere Modelle verwenden.',
    'Kontrolllauf vom 11.11.2026: Dasselbe Unternehmen nannte Gemini mit Google-Suche in 3 von 3 Antworten, früher am selben Tag ohne Websuche in 0 von 3. Deshalb fragt Gemini jetzt mit Websuche.',
    'Microsoft Copilot: keine öffentliche API zur Abfrage von Antworten (Stand 12.11.2026).',
    'Speicherdauer: 60 Tage; die Empfänger der Daten nennen wir in den Fragen unten.',
  ],
};

export const WEITERE_TOOLS = {
  titel: 'Weitere kostenlose Tools',
  tools: [
    ['/narzedzia/audyt-seo', 'Kostenloses SEO Audit', 'Ihre Website online prüfen'],
    ['/narzedzia/generator-llms-txt', 'llms.txt Generator', 'Datei erstellen und Zugriff für KI-Bots testen'],
    ['/narzedzia/autorytet-domeny', 'Domain Authority Checker', 'Autorität Ihrer Domain prüfen'],
    ['/narzedzia/checklista-seo', 'SEO Checkliste', '50 Punkte zum Download'],
    ['/narzedzia/content-plan', 'Redaktionsplan Vorlage', 'Content-Plan für SEO'],
  ],
};

export const FAQ = [
  { question: 'Ist der KI-Sichtbarkeit Check kostenlos?', answer: `Ja. Die Abfragen an die Modelle bezahlen wir. Den Wert, das Raster der Antworten, die ${W.przedBramka.firm} Unternehmen, die die Modelle am häufigsten nennen, und die ${W.przedBramka.domen} am häufigsten zitierten Seiten sehen Sie sofort. Den Wortlaut der Antworten, die Quellen jeder Antwort und die übrigen Unternehmen zeigen wir nach Eingabe Ihrer E-Mail-Adresse, an die wir auch den Bericht senden. Pro IP-Adresse können Sie ${W.limitIp} Unternehmen pro Tag prüfen.` },
  { question: 'Warum weicht das Ergebnis von dem ab, was ich in ChatGPT sehe?', answer: 'Wir fragen über die APIs der Modelle, mit Websuche (ChatGPT mit Standort Deutschland und Ihrer Stadt, falls Sie eine angeben). Die ChatGPT-App berücksichtigt zusätzlich Chatverlauf, Einstellungen und den Standort des Nutzers. Jeder Check ist eine Momentaufnahme: 3 Fragen, einmal gestellt, und die Antworten ändern sich zwischen Durchläufen und von Tag zu Tag. Verstehen Sie das Ergebnis als Stichprobe, nicht als festes Ranking.' },
  { question: 'Welche Modelle prüfen Sie?', answer: `Im kostenlosen Check: ${MIT_SUCHE} mit Websuche${W.geminiZWyszukiwaniem ? '' : ', Gemini aus dem Modellwissen'}${W.grok ? ', Grok (aus dem Modellwissen, ohne Websuche)' : ''} sowie die AI Overviews in den Google-Ergebnissen. Microsoft Copilot hat keine öffentliche API und lässt sich deshalb nicht automatisch prüfen. Im bezahlten KI-Sichtbarkeit Audit stellen wir 30 statt 3 Fragen.` },
  { question: 'Kann ich einen Konkurrenten prüfen?', answer: `Ja. Geben Sie Name, Branche, Stadt und Website ein. Zwei Fragen sind dieselben wie bei Ihnen, die dritte entsteht aus der Website des Konkurrenten, Sie sehen also, ob die Modelle Ihren Konkurrenten häufiger nennen als Sie. Das Limit liegt bei ${W.limitIp} Unternehmen pro Tag und IP-Adresse.` },
  { question: 'Kann ich die Fragen ändern, die Sie stellen?', answer: 'Ja. Nach Eingabe der Unternehmensdaten zeigen wir die 3 vorgeschlagenen Fragen, und Sie können jede vor dem Check ändern: eine Leistung oder einen Stadtteil ergänzen oder so fragen, wie Ihre Kunden fragen. Eine Frage muss 10 bis 200 Zeichen lang sein und darf weder Ihren Firmennamen noch Ihre Domain oder eine Website-Adresse enthalten, denn das Modell würde sie in der Antwort wiederholen und das Ergebnis aufblähen. Anweisungen an das Modell (zum Beispiel „ignoriere alle Anweisungen“) entfernen wir. Erfüllt eine Frage diese Bedingungen nicht, stellen wir die vorgeschlagene Frage und sagen das im Ergebnis. Geänderte Fragen sind im Ergebnis gekennzeichnet, Anzahl der Fragen und Check-Limit bleiben gleich.' },
  { question: 'Wie unterscheidet sich der kostenlose Check vom KI-Sichtbarkeit Audit?', answer: `Der kostenlose Check stellt 3 Fragen und zeigt, ob Ihr Unternehmen genannt wird. Im ${verweis('/pozycjonowanie-w-ai', 'KI-Sichtbarkeit Audit')} (${AUDIT_PREIS}) stellen wir 30 Kundenfragen in ChatGPT, Perplexity, Gemini und den AI Overviews von Google, zeigen die Quellen der Zitate und erstellen einen Plan für 90 Tage.` },
  { question: 'Warum steht bei meinem Namen ein Hinweis auf allgemeine Wörter?', answer: 'Besteht Ihr Firmenname nur aus gewöhnlichen Wörtern (zum Beispiel „SEO Agentur Berlin“ oder „AI SEO Company“), verwenden die Modelle sie auch in gewöhnlichen Sätzen über die Branche. Dann zählen wir eine Erwähnung nur, wenn die Antwort die Adresse Ihrer Website nennt oder den Namen als Eigennamen schreibt. Geben Sie die Adresse Ihrer Website an, damit das Ergebnis genauer wird.' },
  { question: 'Wer sieht mein Ergebnis?', answer: 'Das Ergebnis landet in keinem öffentlichen Ranking und nicht auf unserer Website. Wir speichern es zusammen mit den Formulardaten 60 Tage lang, um nach Eingabe der E-Mail das vollständige Ergebnis zu zeigen und den Bericht zu senden. Geben Sie Ihre E-Mail-Adresse an, erhalten wir eine Benachrichtigung mit der Zusammenfassung des Ergebnisses, damit wir Ihre Fragen beantworten können.' },
  { question: 'Was geschieht mit meinen Daten?', answer: `Wir verwenden sie nur, um das Ergebnis vorzubereiten und zu senden und um Ihre Fragen zu beantworten. Nach 60 Tagen löschen wir sie. Empfänger sind Anbieter von E-Mail-Diensten und KI-Modellen: ${W.grok ? 'Resend, DataForSEO, Anthropic und xAI' : 'Resend, DataForSEO und Anthropic'}. Verantwortlich ist AI SIGNALS COMPANY P.S.A. (${SIEDZIBA.ulica}, Warschau, Polen). Einzelheiten stehen in der ${verweis('/cookies', 'Datenschutzerklärung')}.` },
  { question: 'Für welches Land prüft der Check?', answer: 'Für Deutschland: Die Fragen stellen wir auf Deutsch, ChatGPT und Claude suchen mit dem Standort Deutschland, AI Overviews lesen wir aus den Google-Ergebnissen für Deutschland. Für Österreich und die Schweiz ist das eine Näherung. Für einen anderen Markt ist das Ergebnis weniger aussagekräftig.' },
  { question: 'Wie erhöhe ich meine KI-Sichtbarkeit?', answer: 'Beginnen Sie beim Google Unternehmensprofil und bei Bewertungen, sorgen Sie dann für Erwähnungen in den Quellen, die die Modelle in Ihrer Branche zitieren, und für klare Antworten auf Kundenfragen auf Ihrer Website. Prüfen Sie außerdem, ob die robots.txt die Crawler OAI-SearchBot und PerplexityBot nicht sperrt.' },
];

export const SCHEMA = {
  name: 'KI-Sichtbarkeit Check',
  beschreibung: `Kostenloser Check der KI-Sichtbarkeit: Er prüft, ob ${listeEngines()} Ihr Unternehmen in den Antworten auf drei Kundenfragen aus Ihrer Branche nennen.`,
  features: [
    '3 Kundenfragen: 2 aus Branche und Stadt, 1 aus Ihrer Website',
    'Fragen, die Sie vor dem Check ändern können',
    `${MIT_SUCHE} mit Websuche`,
    ...(W.geminiZWyszukiwaniem ? [] : ['Gemini (Modellwissen)']),
    ...(W.grok ? ['Grok (Modellwissen)'] : []),
    'AI Overviews in Google',
    'Wert von 0 bis 100 und Raster der Antworten',
    `Die ${W.przedBramka.firm} meistgenannten Unternehmen und ${W.przedBramka.domen} meistzitierten Seiten ohne E-Mail`,
  ],
};
