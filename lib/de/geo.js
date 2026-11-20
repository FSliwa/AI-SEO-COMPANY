// Texte und Daten der deutschen GEO-Seite (/de/ki-suchoptimierung), Gruppe de-geo. Reiner ESM-Code ohne React.
// Fakten wie auf der polnischen Seite (components/GeoPageClient.jsx): 30 Fragen, 4 Quellen, Preise aus den
// EN-Werten im Code (235 € netto Audit, 115 € netto Aufpreis, SEO Premium ab 590 €, SEO Standard ab 450 €),
// Messung vom 4.-05.11.2026 (Google Polen, Standort Warschau). Nichts wird in Euro umgerechnet.
// Texte frisch für den deutschen Markt geschrieben (Keyword „generative engine optimization“, Varianten
// geo optimierung, ki seo, ki sichtbarkeit in den Zwischenüberschriften), Terminologie nach GLOSSAR.md.
// Interne Links nur zu deutschen Seiten (hrefDe liefert null ohne Seite): Zeilen ohne Ziel werden Fließtext.
import { hrefDe } from '../stronyDe';
import { CENY } from '../narzedziaLiczby';
import { BIURO, adresLinia } from '../firma';

export const STAND = '2026-11-18'; // Datum der letzten inhaltlichen Änderung der Seite
export const PREISSTAND = '11.2026';

const e = (n) => `${String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}\u00a0€`;
const AUDIT = e(CENY.audytAi.eur); // 235 €
const PREMIUM = e(CENY.seoPremium.eur); // 590 €
const STANDARD = e(CENY.seoStandard.eur); // 450 €
const AUFPREIS = e(115); // Aufpreis zu SEO Standard (EN-Wert 115, wie ServiceSchema)

const verweis = (klucz, text, kotwica = '') => {
  const h = hrefDe(klucz);
  return h ? `<a href="${h}${kotwica}" style="text-decoration:underline">${text}</a>` : text;
};
const extern = (url, text) => `<a href="${url}" rel="noopener" style="text-decoration:underline">${text}</a>`;

export const QUELLEN = {
  senuto: 'https://insight.senuto.com/aio-report-2/',
  ahrefs: 'https://ahrefs.com/blog/what-is-llms-txt/',
  googleGuide: 'https://developers.google.com/search/docs/fundamentals/ai-optimization-guide',
  googleKi: 'https://developers.google.com/search/blog/2023/02/google-search-and-ai-content',
};

export const KOPF = {
  tag: 'Generative Engine Optimization · GEO',
  // H1 aus dem Register (lib/stronyDe.js): „Generative Engine Optimization: in KI-Antworten genannt werden“.
  antwort: `Generative Engine Optimization (GEO) ist die Arbeit daran, dass ChatGPT, Gemini, Perplexity und die AI Overviews in Google Ihr Unternehmen nennen, wenn ein Kunde nach einer Leistung fragt. AI SEO COMPANY aus Warschau stellt den Modellen jede Woche 30 Kundenfragen, zeigt das Ergebnis im Kundenportal und arbeitet an den Quellen, auf die sich die Modelle stützen. Das KI-Sichtbarkeit Audit kostet ${AUDIT} netto.`,
  ctaPruefen: 'Kostenlos prüfen, ob ChatGPT Sie empfiehlt',
  ctaAudit: `KI-Sichtbarkeit Audit: ${AUDIT} netto`,
};

export const MESSUNG_KARTEN = {
  titel: 'So messen wir KI-Sichtbarkeit',
  karten: [
    ['Fragen wie von Ihren Kunden', 'Wir legen 30 Fragen fest, die Ihre Kunden tatsächlich stellen, zum Beispiel: „Können Sie einen guten Schreiner in München empfehlen?“'],
    ['Vier Antwortquellen', 'ChatGPT mit Websuche für Ihren Standort, Perplexity, Gemini und die AI Overviews in den Google-Ergebnissen.'],
    ['Jede Woche im Kundenportal', 'Der Anteil der Antworten, in denen Ihr Firmenname oder Ihre Website vorkommt, Woche für Woche, mit dem vollständigen Wortlaut der Antworten. Das Kundenportal gibt es derzeit auf Polnisch und Englisch.'],
    ['Woher die Modelle ihr Wissen haben', 'Die Liste der Seiten, die in den Antworten zitiert werden. Dort lohnt sich eine Erwähnung, damit das Modell Sie empfiehlt.'],
  ],
};

export const ANGEBOT = {
  titel: 'Was kostet Generative Engine Optimization?',
  einleitung: 'Wir rechnen GEO auf zwei Wegen ab: mit einem einmaligen Audit oder mit laufender Messung und Maßnahmen im monatlichen',
  einleitungLinkText: 'SEO-Abonnement',
  einleitungLinkSchluessel: '/cennik-pozycjonowania',
  karten: [
    { name: 'KI-Sichtbarkeit Audit', preis: `${AUDIT} netto`, einheit: 'einmalig', punkte: ['30 Fragen in 4 Quellen', '5 Konkurrenten, die die Modelle empfehlen', 'Von den Modellen zitierte Seiten', '10 Empfehlungen und 45 Minuten Besprechung', 'Fertig in 5 Werktagen', 'Wird auf den ersten Monat des Abonnements angerechnet'] },
    { name: 'Im Paket SEO Premium', preis: 'inklusive', einheit: `ab ${PREMIUM} netto / Monat`, punkte: ['30 Fragen wöchentlich im Portal', '2 Maßnahmen pro Monat für KI-Sichtbarkeit', 'Erwähnungen in zitierten Quellen', 'Inhalte, die Kundenfragen beantworten'], hervorgehoben: true },
    { name: 'Aufpreis zu SEO Standard', preis: `+${AUFPREIS} netto`, einheit: 'pro Monat', punkte: ['Wie in Premium', 'Wöchentliche Messung im Portal', 'Monatsvertrag ohne zusätzliche Bindung'] },
  ],
  hinweis: `Preisstand: ${PREISSTAND}. Alle Preise in Euro, netto zuzüglich gesetzlicher Umsatzsteuer. SEO Standard kostet ab ${STANDARD} netto pro Monat.`,
};

export const MASSNAHMEN = {
  titel: 'Was wir tun, damit Modelle Sie empfehlen',
  punkte: [
    'Erwähnungen Ihres Unternehmens dort, wo die Modelle nachsehen: Branchenverzeichnisse, Bewertungsportale, lokale Medien.',
    'Inhalte, die Kundenfragen direkt beantworten, mit konkreten Zahlen, Preisen und Einsatzgebiet.',
    'Einheitliche Unternehmensdaten (Name, Adresse, Telefon) überall, strukturierte Daten passend zum Seiteninhalt und optional eine llms.txt-Datei (Google nutzt sie nicht).',
    'Eine schnelle Website, die KI-Bots ohne JavaScript lesen können, und ein gepflegtes Google Unternehmensprofil mit Bewertungen.',
  ],
  ehrlichTitel: 'Was wir nicht versprechen',
  ehrlich: 'Wir garantieren nicht, dass ein Modell Ihr Unternehmen empfiehlt: Antworten ändern sich von Woche zu Woche, und Antworten über die API können von dem abweichen, was jemand in der App sieht. Zusichern können wir die wöchentliche Messung, eine offengelegte Methode und die Arbeit an den Quellen der Modelle. Bei lokalem Suchintention erscheinen AI Overviews in Polen selten (Daten unten), deshalb liefern Maps und Website weiterhin den größten Teil der Anfragen.',
};

// FAQ im Akkordeon (7 Fragen). Antworten als HTML (AppleFaq). Fragen angelehnt an Google-Autosuggest DE
// (generative engine optimization was ist das, wie funktioniert generative engine optimization, geo agentur kosten).
export const FAQ = [
  {
    question: 'Was ist Generative Engine Optimization (GEO)?',
    answer: 'Generative Engine Optimization, kurz GEO, ist die Arbeit daran, dass Sprachmodelle wie ChatGPT, Gemini oder Perplexity und die AI Overviews in Google den Namen Ihres Unternehmens nennen, wenn jemand nach einer Leistung aus Ihrer Branche sucht. Die Modelle setzen ihre Antwort aus Seiten zusammen, die sie finden. Deshalb zählen Erwähnungen in diesen Quellen, Inhalte, die Fragen beantworten, und einheitliche Unternehmensdaten. Dieselbe Leistung heißt auch KI-Suchoptimierung, LLM SEO oder SEO für KI; unter den Kürzeln AEO (Answer Engine Optimization), AIO und LLMO steckt dieselbe Arbeit.'
      + (hrefDe('/porownania/seo-vs-geo') ? ` Worin sich GEO von SEO unterscheidet, zeigen wir im ${verweis('/porownania/seo-vs-geo', 'Vergleich SEO vs GEO')}.` : ''),
  },
  {
    question: 'Ist klassisches SEO noch sinnvoll?',
    answer: `Ja. Laut dem Senuto-Bericht ${extern(QUELLEN.senuto, '„AI Overviews in Poland“')} (Version 2.0 vom 27.11.2025, 17,8 Mio. Keywords) erscheint in Polen eine AI Overview bei 28,95 % der Keywords, bei Keywords mit lokaler Suchintention aber nur bei 6,08 % und bei transaktionaler bei 8,09 %. Für das deutschsprachige Gebiet haben wir keine vergleichbaren Zahlen. Für ein lokales Dienstleistungsunternehmen liefern Maps und Website weiterhin die meisten Anfragen. GEO allein genügt meist nicht: Modelle mit Websuche greifen auf Seiten zurück, die sie im Netz finden, und AI Overviews zitieren Seiten aus dem Google-Index. Wir ergänzen GEO als weitere Ebene, nicht anstelle von ${verweis('/pozycjonowanie-stron-internetowych', 'B2B SEO')}.`,
  },
  {
    question: 'Was kostet Generative Engine Optimization?',
    answer: `Das KI-Sichtbarkeit Audit kostet ${AUDIT} netto und wird auf den ersten Monat des Abonnements angerechnet. Laufende Messung und Maßnahmen sind im Paket SEO Premium enthalten (ab ${PREMIUM} netto pro Monat) oder kosten ${AUFPREIS} netto pro Monat als Aufpreis zu SEO Standard. Alle Preise netto zzgl. gesetzlicher MwSt., Stand ${PREISSTAND}.`,
  },
  {
    question: 'Wann sehe ich Ergebnisse?',
    answer: 'Die erste Messung erhalten Sie in der Woche des Starts, Sie wissen also sofort, wo Sie stehen. Veränderungen in den Antworten der Modelle zeigen sich meist nach einigen Wochen, wenn neue Erwähnungen und Inhalte in den Quellen angekommen sind, die die Modelle nutzen. Den Fortschritt sehen Sie jede Woche im Kundenportal.',
  },
  {
    question: 'Garantieren Sie, dass ChatGPT mein Unternehmen empfiehlt?',
    answer: 'Nein. Niemand kontrolliert die Antworten der Modelle. Zusichern können wir die wöchentliche Messung, eine offengelegte Methode und konkrete Maßnahmen, die die Chance auf eine Erwähnung erhöhen.',
  },
  {
    question: 'Wie finde ich die richtige GEO Agentur?',
    answer: 'Dieselbe Leistung heißt GEO, KI SEO oder LLM SEO, und immer mehr Agenturen bieten sie an. Wir bewerten andere Unternehmen nicht namentlich. AI SEO COMPANY ist eine SEO Agentur aus Warschau und misst jede Woche, ob ChatGPT, Perplexity, Gemini und die AI Overviews in Google den Kunden nennen. Stellen Sie jeder Agentur vor Vertragsabschluss die 8 Fragen aus dem Abschnitt zur Auswahl einer GEO Agentur.',
  },
  {
    question: 'Schaden KI-generierte Inhalte der Sichtbarkeit?',
    answer: `Nicht an sich. Google schreibt in seinen ${extern(QUELLEN.googleKi, 'Hinweisen vom 8. Februar 2023')}, dass der sinnvolle Einsatz von KI nicht gegen seine Richtlinien verstößt, das automatische Erzeugen von Inhalten vor allem zur Manipulation des Rankings aber Spam ist. Entscheidend ist also die Qualität: konkrete Daten mit Quelle, die Erfahrung des Autors und eine klare Antwort auf die Frage des Kunden.`,
  },
  {
    question: 'Kann man nur für ein Modell wie ChatGPT optimieren?',
    answer: 'Die Messung lässt sich auf ein Modell beschränken, die Arbeit selbst aber nicht: Google Unternehmensprofil, Einträge in Verzeichnissen und eine Seite mit klarem Angebot landen in den Quellen vieler Modelle zugleich. Die Modelle unterscheiden sich darin, worauf sie zugreifen. In unserer Messung vom 4.-05.11.2026 verlinkte ChatGPT bei Firmenempfehlungen fast ausschließlich auf Google Maps und Perplexity auf Verzeichnisse und Rankings. Deshalb messen wir vier Quellen.',
  },
  {
    question: 'Was ist der Unterschied zwischen GEO und AEO?',
    answer: `GEO Optimierung (Generative Engine Optimization) und AEO (Answer Engine Optimization) meinen in der täglichen Arbeit meist dasselbe: Inhalte, Unternehmensdaten und externe Erwähnungen so aufbereiten, dass KI-Antwortsysteme wie ChatGPT, Gemini, Perplexity und Google AI Overviews Ihr Unternehmen nennen. AEO betont stärker kurze, direkte Antworten auf Kundenfragen, GEO das Zitieren in generierten Antworten.${hrefDe('/porownania/seo-vs-geo') ? ` Alle Kürzel im Vergleich finden Sie unter ${verweis('/porownania/seo-vs-geo', 'SEO vs GEO', '#kuerzel')}.` : ''}`,
  },
  {
    question: 'Welche Tools gibt es für Generative Engine Optimization?',
    answer: `Zum Start genügen zwei Prüfungen: ob Sprachmodelle Ihr Unternehmen heute schon nennen und ob Ihre Website technisch für KI-Crawler offen ist. Beides testen Sie kostenlos bei uns: im ${verweis('/sprawdz-widocznosc-w-ai', 'KI-Sichtbarkeit Check')} für ChatGPT, Gemini, Perplexity, Claude und AI Overviews sowie im ${verweis('/narzedzia/generator-llms-txt', 'llms.txt Generator mit Bot-Zugriffstest')}. Für die laufende Auswertung zählen die Google Search Console und regelmäßige Fragen-Stichproben im Kundenportal.`,
  },
];

// Acht Karten „Fragen zur KI-Sichtbarkeit, die wir beantworten“; dieselben Texte gehen in dasselbe FAQPage-JSON-LD.
// schluessel = polnischer Pfad der Zielseite (nur deutsche Seiten), kotwica = Anker, ankertext = Linktext.
export const KARTEN = [
  {
    id: 'wie-chatgpt-ihr-unternehmen-empfiehlt',
    frage: 'Wie sorgt man dafür, dass ChatGPT Ihr Unternehmen empfiehlt?',
    antwort: 'ChatGPT mit Websuche setzt seine Antwort aus Seiten zusammen, die es im Moment findet, deshalb zählt die Präsenz in diesen Quellen. Wir beginnen beim Google Unternehmensprofil, bei denselben Unternehmensdaten in Verzeichnissen und bei einer Seite, die Leistung, Preis und Einsatzgebiet direkt nennt. Danach prüfen wir jede Woche, ob das Modell Ihr Unternehmen nennt.',
  },
  {
    id: 'woher-chatgpt-die-unternehmen-nimmt',
    frage: 'Woher nimmt ChatGPT die Unternehmen, die es empfiehlt?',
    antwort: 'In Tests vom 4. und 5. November 2026 haben wir ChatGPT mit Websuche in 10 Fragen um die Empfehlung eines Unternehmens gebeten, von der SEO-Agentur bis zum Schreiner und Klempner. In 11 Antworten führten 59 von 62 Links zu Google Maps. Bei Fragen nach Preisen und Rankings zitierte das Modell Websites, darunter unsere Preisseite. Perplexity zitierte vor allem Artikel und Leistungsbeschreibungen zur jeweiligen Frage, bei der Frage nach einer B2B-Agentur auch Firmenverzeichnisse (Clutch, Sortlist und DesignRush). Die Tests liefen mit polnischen Fragen und dem Standort Warschau. Es sind Ergebnisse eines einzelnen API-Modells, kein Ranking der ChatGPT-App.',
    quelle: { text: 'eigene Messung über die DataForSEO-API, 4.-05.11.2026 (Methode unter der Messtabelle)' },
  },
  {
    id: 'seo-und-geo',
    frage: 'SEO und GEO: Worin unterscheiden sie sich?',
    antwort: 'SEO kämpft um einen Platz in der Ergebnisliste von Google, GEO um die Nennung in einer Antwort, die das Modell selbst schreibt. Das Fundament ist gemeinsam: eine für Crawler zugängliche Seite, klare Antworten, einheitliche Unternehmensdaten und Erwähnungen auf anderen Websites. Anders ist die Messung: Bei GEO zählen wir den Anteil der Antworten mit dem Firmennamen, nicht die Position in einer Liste.',
    schluessel: '/porownania/seo-vs-geo',
    ankertext: 'SEO vs GEO: der ganze Vergleich',
  },
  {
    id: 'geo-aeo-aio-llmo',
    frage: 'GEO, AEO, AIO, LLMO: dasselbe?',
    antwort: 'In der Praxis sind das Namen derselben Arbeit. GEO (Generative Engine Optimization) und LLMO betreffen Antworten von ChatGPT, Gemini und Perplexity, AIO meist die AI Overviews in Google, AEO Antwortmaschinen. Vorsicht beim Kürzel „AEO“: Im Zoll steht es für den Status „Zugelassener Wirtschaftsbeteiligter“, und in den polnischen Google-Ergebnissen führte die Suche nach „aeo“ zu genau diesem Status und nicht zu Marketing.',
    quelle: { text: 'Google-Ergebnisse Polen für die Suchanfrage „aeo“, 04.11.2026' },
    schluessel: '/porownania/seo-vs-geo',
    kotwica: '#kuerzel',
    ankertext: 'AEO, AIO und LLMO: die Kürzel erklärt',
  },
  {
    id: 'llms-txt',
    frage: 'Was ist llms.txt und hilft es?',
    antwort: 'llms.txt ist eine Datei im Markdown-Format mit einer Liste der wichtigsten Unterseiten für Sprachmodelle. Es ist ein Standardvorschlag, keine Pflicht: Google schreibt in seinem offiziellen Leitfaden (2026), dass seine Suche solche Dateien nicht verwendet, und laut einer Analyse von Ahrefs unterstützt kein großer Modellanbieter sie offiziell. Die Datei kostet wenig, wichtiger ist aber, ob KI-Bots in der robots.txt Zugriff auf die Seite haben.',
    quelle: { text: 'Google Search Central, „Optimizing for generative AI features“ sowie Ahrefs, „What Is llms.txt?“', url: QUELLEN.googleGuide, data: 'abgerufen am 18.11.2026' },
    schluessel: '/narzedzia/generator-llms-txt',
    ankertext: 'llms.txt Generator und Test für KI-Bots',
  },
  {
    id: 'ai-overviews-in-google',
    frage: 'Wie kommt man in die AI Overviews von Google?',
    antwort: 'Die AI Overview erschien bei allen 30 Keywords unserer Stichprobe (SEO, GEO, Preise und Tools; Google Polen, 04.11.2026). Bei 21 davon nannte Google Quellen: 153 Verweise auf 91 Domains. Google verlangt weder, für KI zu schreiben, noch, Inhalte in Häppchen zu zerlegen; eine kurze Antwort unter der Überschrift ist unser Lesbarkeitsstandard und erleichtert zugleich das Zitieren.',
    quelle: { text: 'eigene Messung über die DataForSEO-API (Google Polen, Desktop, Top 10 und AI Overview), 04.11.2026' },
  },
  {
    id: 'ki-sichtbarkeit-pruefen',
    frage: 'Wie prüfe ich, ob ChatGPT mein Unternehmen empfiehlt?',
    antwort: 'Stellen Sie ChatGPT mit eingeschalteter Websuche einige Fragen, die Ihre Kunden stellen, zum Beispiel „Können Sie einen Schreiner in München empfehlen?“, und notieren Sie, ob Ihr Firmenname fällt und welche Seiten das Modell als Quellen nennt. Eine einzelne Frage beweist nichts, denn Antworten ändern sich. Unser kostenloser Check erledigt das für Sie in ChatGPT, Gemini, Perplexity, Claude und den AI Overviews in Google.',
    schluessel: '/sprawdz-widocznosc-w-ai',
    ankertext: 'Kostenlos prüfen',
  },
  {
    id: 'werbung-in-chatgpt',
    frage: 'Ist Werbung in ChatGPT dasselbe wie Generative Engine Optimization?',
    antwort: 'Nein. Werbung ist eine bezahlte Einblendung, die nur wirkt, solange Sie die Kampagne bezahlen. GEO betrifft die Antwort des Modells selbst: ob es Ihr Unternehmen nennt und welche Quellen es nutzt. Erwähnungen in diesen Quellen bleiben nach dem Ende einer Kampagne bestehen. Die aktuellen Regeln für Werbung finden Sie im Hilfecenter von OpenAI.',
  },
];

// Messtabelle (4.-05.11.2026).
export const MESSUNG = {
  titel: 'Was Modelle heute empfehlen: Messung vom November 2026',
  einleitung: 'Wir stellen den Modellen Fragen, wie Kunden sie stellen, und prüfen, wen sie empfehlen und woher sie ihre Informationen nehmen. Unten das Ergebnis vom 4. und 5. November 2026. Wir zeigen die Quellen, nicht die Namen empfohlener Unternehmen. Die Messung stammt aus Polen (polnische Fragen, Google Polen, Standort Warschau) und lässt sich nicht ohne Weiteres auf den deutschsprachigen Raum übertragen.',
  caption: 'Messung von KI-Antworten, 4.-5. November 2026',
  spalten: [
    { key: 'pomiar', label: 'Was wir gemessen haben' },
    { key: 'wynik', label: 'Ergebnis' },
    { key: 'proba', label: 'Stichprobe und Datum' },
  ],
  zeilen: [
    { id: 'aio', pomiar: 'AI Overview in Google', wynik: '30 von 30 Keywords aus unserer Stichprobe (SEO, KI, Preise, Tools)', proba: 'Google Polen, Desktop, Top 10, 04.11.2026' },
    { id: 'empfehlungen', pomiar: 'ChatGPT: Bitte um die Empfehlung eines Unternehmens (SEO-Agentur, Schreiner, Klempner, Buchhaltungsbüro)', wynik: '59 von 62 Links zur Suche in Google Maps (google.com/maps/search)', proba: '11 Antworten auf 10 Fragen, 4.-05.11.2026' },
    { id: 'preise', pomiar: 'ChatGPT: Fragen nach Preis, Ranking oder Funktion einer Leistung', wynik: '0 von 31 Links zu Maps; zitiert wurden Websites, darunter unsere Preisseite', proba: '5 Antworten, 4.-05.11.2026' },
    { id: 'perplexity', pomiar: 'Perplexity: alle Fragen', wynik: '0 von 23 Antworten mit Link zu Maps', proba: '23 Antworten, 4.-05.11.2026' },
  ],
  fussnote: 'Methode: Antworten über die DataForSEO-API von ChatGPT (gpt-4.1-mini mit Websuche, Suchstandort Warschau, auch bei Fragen zu Krakau und Posen) und von Perplexity (sonar), eine Antwort pro Frage. Die Frage nach unserer eigenen Marke (5 Links, 0 zu Maps) und Ratschläge ohne Suche zählen wir getrennt. AI Overviews: Google-Ergebnisse Polen auf dem Desktop, 04.11.2026.',
  fazit: 'Fazit: Bei einer Empfehlung nennt ChatGPT meist Adresse und Öffnungszeiten, und der Link führt zu Google Maps, wo der Kunde das Unternehmensprofil sieht. Für ein Dienstleistungsunternehmen ist deshalb ein gepflegtes Unternehmensprofil der erste Schritt, für Agenturen und B2B-Unternehmen sind es Einträge in Verzeichnissen und Inhalte, die genau die Fragen beantworten, auf die Perplexity zugreift. Eine Seite mit offenen Preisen wird bei Preisfragen häufiger zitiert.',
};

export const FUER_WEN = {
  titel: 'Für wen sich GEO lohnt, und wann noch nicht',
  einleitung: 'GEO ist eine Ebene über den Grundlagen und keine Abkürzung zu Kunden. Am meisten bringt es Unternehmen, nach denen Menschen vor dem Kauf fragen, am wenigsten denen, die Google noch nicht kennt.',
  sinnvoll: {
    titel: 'Sinnvoll, wenn',
    punkte: [
      'Kunden vor dem Kauf Anbieter vergleichen und nach Empfehlungen fragen: B2B-Leistungen, Leistungen mit höherem Preis, Praxen, Kanzleien, Handwerksbetriebe;',
      'die Website bereits indexiert ist, Unterseiten für Leistungen und ein solides SEO-Grundgerüst hat und das Unternehmen ein Google Unternehmensprofil mit Bewertungen führt;',
      'Sie wissen wollen, was Modelle über Ihre Marke sagen und wen sie statt Ihrer empfehlen.',
    ],
  },
  nochNicht: {
    titel: 'Noch nicht, wenn',
    punkte: [
      { text: 'die Website nicht im Google-Index ist oder keine eigenen Unterseiten für Leistungen hat: beginnen Sie mit', link: { schluessel: '/pozycjonowanie-stron-internetowych', text: 'B2B SEO' }, nachLink: ';' },
      { text: 'ein lokales Unternehmen kein verifiziertes Google Unternehmensprofil hat: beginnen Sie bei Maps, denn dorthin führten die Empfehlungen von ChatGPT in unserem Test;' },
      { text: 'Sie die Garantie einer Erwähnung zu einem bestimmten Termin erwarten: das kann Ihnen niemand seriös zusagen.' },
    ],
  },
};

export const AGENTUR = {
  titel: 'GEO Agentur und KI SEO Agentur: so wählen Sie aus, und das tun wir',
  intro: 'AI SEO COMPANY ist eine KI SEO Agentur aus Warschau (' + adresLinia(BIURO, 'de') + '). Wir verbinden SEO mit der Arbeit an der Sichtbarkeit in ChatGPT, Gemini und AI Overviews, also mit dem, was eine GEO Agentur tut. Wir arbeiten mit Monatsverträgen. Unsere Pakete und Preise sehen Sie unter',
  introLink: { schluessel: '/cennik-pozycjonowania', text: 'SEO Kosten' },
  monatTitel: 'Was eine GEO Agentur jeden Monat tut',
  monat: 'Eine seriöse GEO Agentur wiederholt jeden Monat die Messung mit denselben Fragen, verbessert die Firmenprofile in Verzeichnissen und in Maps, ergänzt Inhalte mit Antworten auf Kundenfragen und pflegt strukturierte Daten. Bei uns sind das in SEO Premium 2 Maßnahmen pro Monat für KI-Sichtbarkeit und die Messung von 30 Fragen jede Woche.',
  fragenTitel: '8 Fragen an eine GEO Agentur vor Vertragsabschluss',
  fragen: [
    'Wie viele Fragen messen Sie, und legen wir sie gemeinsam fest?',
    'In welchen Modellen und von welchem Standort aus prüfen Sie die Antworten?',
    'Wie oft erhalte ich ein Ergebnis, und sehe ich die vollständigen Antworten der Modelle?',
    'Aus welchen Seiten beziehen die Modelle ihre Informationen in meiner Branche?',
    'Was genau tun Sie im ersten Monat?',
    'Garantieren Sie Erwähnungen in ChatGPT? Die ehrliche Antwort lautet: Nein.',
    'Wie lang ist die Kündigungsfrist, und gibt es Gebühren für den Ausstieg?',
    'Bleiben Inhalte, Links und Konten nach Vertragsende bei mir?',
  ],
  messTitel: 'So messen wir den Erfolg von GEO',
  mess: 'Den Erfolg berechnen wir als Anteil der Antworten, in denen der Firmenname oder die Adresse der Seite vorkommt, auf denselben 30 Fragen jede Woche. Wir vergleichen ihn mit der Basismessung aus der ersten Woche und zeigen, welche Quellen die Modelle neu zitieren. Eine schnelle Stichprobe ohne Vertrag:',
  messLink: { schluessel: '/sprawdz-widocznosc-w-ai', text: 'KI-Sichtbarkeit prüfen' },
};

export const TECHNIK = {
  titel: 'Was wir technisch umsetzen',
  punkte: [
    { text: 'Zugang für KI-Bots: Wir prüfen, ob robots.txt und Server-Firewall GPTBot, OAI-SearchBot, PerplexityBot und ClaudeBot nicht sperren.' },
    { text: 'Optional eine llms.txt-Datei mit einer kurzen Beschreibung des Unternehmens und der Liste wichtiger Adressen. Google nutzt sie nicht und verlangt sie für AI Overviews nicht (', extern: { url: QUELLEN.googleGuide, text: 'Leitfaden von Google Search Central' }, nach: ', abgerufen am 18.11.2026). Wir erstellen sie deshalb nur dort, wo andere Werkzeuge sie verwenden.' },
    { text: 'Strukturierte Daten passend zu dem, was auf der Seite steht: Unternehmen mit Adresse, Leistungen mit Preisen, Fragen mit Antworten und Brotkrumennavigation. Für AI Overviews sind sie nicht erforderlich, helfen aber bei erweiterten Suchergebnissen.' },
    { text: 'Bing Webmaster Tools und IndexNow, damit neue und geänderte Unterseiten schneller in den Bing-Index kommen.' },
  ],
  nachweis: 'Auf unserer Domain sperrt die robots.txt nur das Verzeichnis /api/. Im Test vom 4. und 5. November 2026 erhielten 16 Crawler, darunter GPTBot, OAI-SearchBot, PerplexityBot und ClaudeBot, auf 7 geprüften Adressen den Statuscode 200 und denselben Inhalt wie der Chrome-Browser. Die Datei',
  nachweisLinkText: 'llms.txt',
  nachweisSchluss: 'ist öffentlich, und geänderte Adressen melden wir nach jedem Release über IndexNow.',
};

export const PLAN = {
  titel: 'Die ersten 90 Tage: Fahrplan für GEO',
  caption: 'Fahrplan der ersten 90 Tage',
  spalten: [
    { key: 'okres', label: 'Zeitraum' },
    { key: 'robimy', label: 'Was wir tun' },
    { key: 'panel', label: 'Was Sie im Portal sehen' },
  ],
  zeilen: [
    { id: 't1', okres: 'Woche 1', robimy: 'Wir legen mit Ihnen 30 Fragen fest und messen die Ausgangslage in allen vier Quellen.', panel: 'Das erste Ergebnis und die Liste der Seiten, die Modelle in Ihrer Branche zitieren.' },
    { id: 't2-4', okres: 'Wochen 2-4', robimy: 'Audit und technische Korrekturen: Bot-Zugang, strukturierte Daten, einheitliche Unternehmensdaten in Verzeichnissen, optional llms.txt.', panel: 'Arbeitsprotokoll und Freigaben.' },
    { id: 'm2', okres: 'Monat 2', robimy: 'Inhalte, die Kundenfragen beantworten, und ein vervollständigtes Google Unternehmensprofil.', panel: 'Neue Unterseiten und die Veränderung des Ergebnisses von Woche zu Woche.' },
    { id: 'm3', okres: 'Monat 3', robimy: 'Erwähnungen in Verzeichnissen und Medien, die Modelle zitieren, sowie der Vergleich mit der Basismessung.', panel: 'Die Veränderung des Anteils der Antworten mit Ihrem Firmennamen seit dem Start.' },
  ],
  fussnote: 'Der Fahrplan gilt für die wöchentliche Messung in SEO Premium oder im Aufpreis zu SEO Standard. Das Audit allein endet nach 5 Werktagen mit einem Bericht.',
};


/** Texte der Karten und FAQ für das FAQPage-JSON-LD (Frage + Antwort + Quelle, wie sichtbar). */
const quelleText = (z) => (z ? ` Quelle: ${z.text}${z.data ? `, ${z.data}` : ''}${z.text.endsWith('.') ? '' : '.'}` : '');
export const KARTEN_SCHEMA = KARTEN.map((k) => ({ question: k.frage, answer: `${k.antwort}${quelleText(k.quelle)}` }));
