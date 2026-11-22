// Daten des deutschen Ratgebers /de/blog/ga4-events-gtm (22.11.2026; Schlüssel PL: /blog/konfiguracja-zdarzen-gtm-ga4-poradnik).
// Hauptkeyword: "ga4 events". Fakten geprüft gegen Google Analytics 4 Developer Docs, Google Consent Mode v2 Docs,
// DSGVO / § 25 TDDDG sowie unser eigenes produktives Setup (generate_lead + page_type + traffic_type=internal).

export const BLOG_GA4_EVENTS_DE = {
  fallbackPfad: '/blog/ga4-events-gtm',
  okruszek: 'GA4 Events & GTM',
  kategoria: 'Webanalyse & Google Tag Manager',
  h1: 'GA4 Events über den Google Tag Manager sauber einrichten und prüfen',
  opublikowano: '2026-11-22',
  aktualisiert: '2026-11-22',
  kurzantwort: 'Saubere GA4 Events richten Sie im Google Tag Manager auf Basis des Google Tags (Trigger Initialization: All Pages) und konsistenter lower_snake_case-Namen wie generate_lead ein. Für B2B-Anfragen stellen Sie Schlüsselereignisse auf „Einmal pro Sitzung“, übergeben Dimensionen wie page_type und lead_source, setzen den Consent Mode v2 um und prüfen alles im DebugView.',
  lead: 'In vielen Google-Analytics-4-Konten werden entweder gar keine echten Anfragen gemessen oder harmlose Seitenaufrufe und PDF-Klicks verwässern die Schlüsselereignisse. Dieser Praxisleitfaden zeigt Schritt für Schritt, wie Sie GA4 Events über den Google Tag Manager (GTM) technisch sauber, DSGVO-konform nach § 25 TDDDG und verlässlich für Ihr B2B-Reporting einrichten.',
  sekcje: [
    {
      id: 'ereigniskategorien-und-zaehlmethode',
      h2: 'GA4 Events im B2B: Schlüsselereignisse vs. Mikro-Signale richtig trennen',
      html: [
        '<p>Google Analytics 4 kennt ausschließlich Ereignisse (Events), unterscheidet aber vier Stufen: <strong>automatisch erfasste Events</strong> (z. B. <code>session_start</code>, <code>first_visit</code>), <strong>Optimierte Analysen</strong> (z. B. <code>scroll</code>, <code>file_download</code>, ausgehende Klicks), <strong>von Google empfohlene Events</strong> wie <code>generate_lead</code> sowie komplett <strong>benutzerdefinierte Events</strong> wie <code>click_to_call</code>. Der häufigste Strategiefehler in Audits besteht darin, jedes dieser Signale als Conversion (in GA4 heute: <em>Schlüsselereignis</em>) zu markieren.</p>',
        '<p>Pro Standard-Property erlaubt GA4 maximal <strong>30 Schlüsselereignisse</strong>. Wenn Sie 90-Prozent-Scrolls, Katalog-Downloads und echte Angebotsanfragen gleichberechtigt als Schlüsselereignis zählen, verliert der Bericht an Aussagekraft - und beim späteren Import nach Google Ads optimiert die Gebotsstrategie auf billige PDF-Klicks statt auf zahlende Unternehmenskunden. Markieren Sie im B2B nur Ereignisse mit unmittelbarer Kontaktabsicht als Schlüsselereignis und stellen Sie deren <strong>Zählmethode auf „Einmal pro Sitzung“</strong> um (statt „Jedes Mal“). So zählt ein Interessent, der das Kontaktformular zweimal absendet oder die Bestätigungsseite neu lädt, exakt als ein Lead.</p>',
      ].join(''),
      tabela: {
        id: 'tabelle-ga4-events-b2b',
        caption: 'Empfohlene GA4 Events und Einstellungen für B2B- und Dienstleistungs-Websites',
        columns: [
          { key: 'event', label: 'Event-Name (lower_snake_case)' },
          { key: 'rolle', label: 'Rolle & Zählmethode in GA4' },
          { key: 'parameter', label: 'Sinnvolle Parameter' },
          { key: 'ausloeser', label: 'Sauberer Auslöser im GTM' },
        ],
        rows: [
          {
            id: 'generate-lead',
            event: 'generate_lead',
            rolle: 'Schlüsselereignis (Einmal pro Sitzung)',
            parameter: 'lead_source, form_name, page_type, value, currency, transaction_id',
            ausloeser: 'Custom Event per dataLayer.push erst nach positiver Server-Antwort (HTTP 200)',
          },
          {
            id: 'click-to-call',
            event: 'click_to_call',
            rolle: 'Schlüsselereignis auf Mobilgeräten (Einmal pro Sitzung)',
            parameter: 'link_url (ohne personenbezogene Kundendaten), page_type, lead_source',
            ausloeser: 'Klick - Nur Links mit Click URL beginnt mit tel:',
          },
          {
            id: 'file-download',
            event: 'file_download',
            rolle: 'Sekundäres Mikro-Event (kein primäres Schlüsselereignis)',
            parameter: 'file_name, file_extension, link_text, page_type',
            ausloeser: 'Automatisch über Optimierte Analysen oder gezielter GTM-Link-Trigger für Preislisten/Whitepaper',
          },
          {
            id: 'cta-plan-select',
            event: 'cta_plan_select',
            rolle: 'Trichter-Event zur UX-Analyse (kein Schlüsselereignis)',
            parameter: 'plan, page_type, cta_location',
            ausloeser: 'Klick auf Paket-Auswahlbutton auf der Preisseite',
          },
        ],
        przypis: 'Wichtig: GA4 unterscheidet strikt zwischen Groß- und Kleinschreibung. Verwenden Sie ausnahmslos lower_snake_case (generate_lead statt Generate_Lead), da sonst zwei getrennte Zeilen in allen Berichten entstehen.',
      },
    },
    {
      id: 'einrichtung-im-gtm',
      h2: 'Schritt für Schritt: Google Tag, dataLayer.push und Ereignis-Tags im GTM',
      html: [
        '<h3>1. Das Google Tag als sauberes Fundament anlegen</h3>',
        '<p>Bevor das erste Ereignis-Tag feuert, benötigt Ihr GTM-Container ein zentrales <strong>Google Tag</strong>. Legen Sie Ihre Mess-ID (<code>G-XXXXXXXXXX</code>) niemals als Freitext in zwanzig einzelnen Tags an, sondern speichern Sie sie einmal als GTM-Variable vom Typ <em>Konstante</em> (z. B. <code>{{Const - GA4 Mess-ID}}</code>). Weisen Sie dem Google Tag den Trigger <strong>Initialization - All Pages</strong> zu, damit Konfiguration und Einwilligungsstatus vor allen nachgelagerten Ereignissen bereitstehen. Wiederkehrende Parameter wie <code>page_type</code> oder <code>language</code> bündeln Sie in einer <em>Google-Tag-Ereigniseinstellungen-Variable</em>.</p>',
        '<h3>2. Formular-Leads verlässlich per dataLayer.push statt Button-Klick erfassen</h3>',
        '<p>Ein klassischer Klick-Trigger auf dem Absende-Button feuert auch dann, wenn Pflichtfelder leer sind, die E-Mail-Adresse fehlerhaft ist oder der Spam-Schutz die Anfrage ablehnt. Lassen Sie Ihre Entwickler stattdessen erst nach erfolgreicher serverseitiger Speicherung der Anfrage ein strukturiertes <code>dataLayer.push</code> ausgeben:</p>',
        `<pre><code>window.dataLayer = window.dataLayer || [];
window.dataLayer.push({
  event: 'lead_form_success',
  lead_source: 'contact_form',
  form_name: 'projektanfrage_b2b',
  page_type: 'usluga',
  transaction_id: 'LEAD-2026-0841',
  value: 450,
  currency: 'EUR'
});</code></pre>`,
        '<p>Im Google Tag Manager erstellen Sie daraufhin einen Trigger vom Typ <strong>Benutzerdefiniertes Ereignis</strong> mit dem Ereignisnamen <code>lead_form_success</code> und verknüpfen ihn mit einem Tag vom Typ <em>Google Analytics: GA4-Ereignis</em>, das den offiziellen Namen <code>generate_lead</code> samt den zugehörigen Datenschicht-Variablen an GA4 sendet. Übergeben Sie dabei <strong>niemals unverschlüsselte personenbezogene Daten</strong> (Klarnamen, E-Mail-Adressen, Telefonnummern von Nutzern) in den <code>dataLayer</code> oder an GA4.</p>',
        '<h3>3. Telefonklicks (click_to_call) sauber abgreifen</h3>',
        '<p>Für Klicks auf Telefonnummern legen Sie im GTM einen Trigger <em>Klick - Nur Links</em> an, aktivieren unter „Einige Klicks auf Links“ die Bedingung <code>Click URL beginnt mit tel:</code> und senden das GA4-Event <code>click_to_call</code>. Aktivieren Sie vorher unter <em>Variablen -> Konfigurieren</em> die integrierten Klick-Variablen wie <code>Click URL</code> und <code>Click Text</code>.</p>',
      ].join(''),
    },
    {
      id: 'benutzerdefinierte-dimensionen',
      h2: 'Benutzerdefinierte Dimensionen (page_type und lead_source) in GA4 sichtbar machen',
      html: [
        '<p>Viele Teams wundern sich, warum selbst angelegte Parameter wie <code>page_type</code> oder <code>lead_source</code> zwar im DebugView auftauchen, in den Standardberichten und Explorativen Analysen aber fehlen. Der Grund: <strong>Eigene Parameter müssen in GA4 als Dimension registriert werden</strong> - und diese Registrierung gilt ausschließlich für zukünftige Daten ab dem Speicherzeitpunkt.</p>',
        '<p>Öffnen Sie dazu in GA4 <em>Verwaltung -> Datenanzeige -> Benutzerdefinierte Definitionen -> Benutzerdefinierte Dimension erstellen</em>, wählen Sie den Umfang <strong>Ereignis</strong> und tragen Sie exakt den Parameternamen ein:</p>',
        '<ul>',
        '<li><strong>Dimension „Seitentyp“ (Parameter <code>page_type</code>):</strong> Auf unserer eigenen mehrsprachigen Website klassifiziert eine zentrale Hilfsfunktion jede URL automatisch als <code>home</code>, <code>usluga</code> (Leistungsseite), <code>cennik</code> (Preisseite), <code>porownanie</code> (Vergleich), <code>narzedzie</code> (interaktives Tool), <code>szablon</code> (PDF-Vorlage), <code>geo</code> oder <code>blog</code>. Damit sehen Sie im Monatsbericht sofort, welche Seitengruppe tatsächlich qualifizierte Anfragen liefert - statt nur den letzten Klick auf <code>/kontakt</code> zu sehen.</li>',
        '<li><strong>Dimension „Lead-Quelle“ (Parameter <code>lead_source</code>):</strong> Unterscheidet sauber, ob eine Anfrage über das Hauptformular am Seitenende, über einen Schnellcheck, einen Paket-Button auf der Preisseite oder ein Tool-Formular eingegangen ist.</li>',
        '</ul>',
        '<p>Wie Sie diese Auswertungen übersichtlich auf einer Seite für Geschäftsführung und Vertrieb zusammenfassen, zeigt unsere kostenlose <a href="/de/tools/seo-report-vorlage">SEO Report Vorlage als PDF</a>. Wenn Formulare trotz gutem Traffic kaum absenden, hilft zusätzlich unser Leitfaden zum <a href="/de/blog/ux-audit">UX Audit für B2B-Websites</a>.</p>',
      ].join(''),
    },
    {
      id: 'consent-mode-v2-dsgvo-tdddg',
      h2: 'Google Consent Mode v2 nach DSGVO und § 25 TDDDG rechtssicher beachten',
      html: [
        '<p>Im gesamten EWR und insbesondere in Deutschland unterliegt das Setzen und Auslesen nicht technisch notwendiger Kennungen im Browser strengen Vorgaben aus der <strong>DSGVO</strong> sowie <strong>§ 25 Abs. 1 TDDDG</strong> (Telekommunikation-Digitale-Dienste-Datenschutz-Gesetz). Google verlangt zudem seit März 2024 den <strong>Consent Mode v2</strong> mit vier expliziten Einwilligungssignalen:</p>',
        '<ul>',
        '<li><code>analytics_storage</code> (Speicherung für Webanalyse wie GA4-Cookies),</li>',
        '<li><code>ad_storage</code> (Werbe-Cookies),</li>',
        '<li><code>ad_user_data</code> (Übergabe von Nutzerdaten für Werbezwecke an Google),</li>',
        '<li><code>ad_personalization</code> (personalisierte Werbung und Remarketing).</li>',
        '</ul>',
        '<p>Technisch muss der Standardzustand (<code>consent default</code>) für alle vier Signale auf <code>denied</code> stehen, <strong>bevor</strong> der GTM-Container bzw. das Google Tag lädt. Erst wenn die Besucherin oder der Besucher im Consent-Banner aktiv zustimmt, sendet Ihre Consent-Management-Plattform (oder Ihre eigene Banner-Logik, siehe unsere <a href="/de/datenschutz">Datenschutzerklärung</a>) ein <code>consent update</code> auf <code>granted</code>.</p>',
        '<p>Unterscheiden Sie dabei bewusst zwischen <strong>Basic Consent Mode</strong> (GA4-Tags werden erst nach erteilter Einwilligung überhaupt geladen und senden vorher keinerlei Pings an Google-Server - im deutschen Datenschutzumfeld die konservativste und rechtlich klarste Variante) und <strong>Advanced Consent Mode</strong> (cookielose Pings vor Einwilligung für Verhaltensmodellierung, was datenschutzrechtlich vorab mit Ihrem Datenschutzbeauftragten geprüft werden sollte). Planen Sie für Ihr B2B-Controlling fest ein: Da ein relevanter Teil der Besucher Analyse-Cookies ablehnt, zeigt GA4 immer <em>weniger</em> Abschlüsse als Ihr CRM. Die exakte Gesamtzahl Ihrer Leads lesen Sie aus dem Backend ab; GA4 liefert die relativen Anteile von Kanälen, Suchbegriffen und Seitentypen.</p>',
      ].join(''),
    },
    {
      id: 'interner-traffic-und-debugview',
      h2: 'Internen Traffic filtern und jedes Setup im GTM Preview & DebugView testen',
      html: [
        '<h3>1. Eigenen Team- und Agentur-Traffic sauber ausschließen</h3>',
        '<p>Auf B2B-Seiten mit wenigen hundert hochrelevanten Fachbesuchern pro Woche verfälschen schon zehn Test-Anfragen Ihres Vertriebs oder Ihrer Agentur die Conversion-Rate massiv. Klassische IP-Filter unter <em>Datenstream -> Tag-Einstellungen konfigurieren -> Internen Traffic definieren</em> reichen durch dynamische Heimnetz-Anschlüsse und IPv6-Adressen im Homeoffice oft nicht mehr aus.</p>',
        '<p>Bewährt hat sich eine zweistufige Lösung: Definieren Sie zusätzlich zu festen Büro-IPs ein internes Merkmal im Browser (etwa einen internen Cookie oder ein <code>localStorage</code>-Flag für Mitarbeitende), das bei jedem Event den Parameter <code>traffic_type: &apos;internal&apos;</code> mitschickt. Vergessen Sie anschließend unter <em>Verwaltung -> Datenerhebung und -änderung -> Datenfilter</em> nicht den entscheidenden letzten Klick: Standardmäßig steht der Filter „Internal Traffic“ in GA4 nur im Modus <strong>Test</strong> - erst nach dem Umschalten auf <strong>Aktiv</strong> werden interne Zugriffe dauerhaft aus Ihren Berichten herausgehalten.</p>',
        '<h3>2. Pflichtkontrolle vor dem Veröffentlichen: Tag Assistant + GA4 DebugView</h3>',
        '<p>Klicken Sie im GTM niemals auf „Senden“, ohne beide Prüfebenen durchlaufen zu haben:</p>',
        '<ol>',
        '<li><strong>GTM-Vorschaumodus (Tag Assistant):</strong> Prüft im Browser, ob Ihr Trigger beim Absenden des Formulars exakt einmal unter <em>Tags Fired</em> erscheint, ob im Reiter <em>Consent</em> der Status vorab auf <code>denied</code> und nach Zustimmung auf <code>granted</code> wechselt und ob keine Variable im Reiter <em>Variables</em> den Wert <code>undefined</code> liefert.</li>',
        '<li><strong>GA4 DebugView (Verwaltung -> Datenanzeige -> DebugView):</strong> Bestätigt auf der Gegenseite von Google, dass das Event tatsächlich verarbeitet wurde, alle Parameter korrekt zugeordnet sind und kein aktiver Datenfilter echte Nutzer versehentlich verschluckt.</li>',
        '</ol>',
        '<p>Im Rahmen unseres technischen <a href="/de/seo-audit">SEO Audits</a> prüfen wir neben Indexierung und Ladezeiten immer auch Ihr bestehendes GA4- und Search-Console-Setup auf Messlücken, doppelte Tags und Consent-Fehler. Einen schnellen technischen Erstcheck Ihrer Website erhalten Sie jederzeit in unserem <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a>.</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu GA4 Events und Google Tag Manager',
  faq: [
    {
      id: 'unterschied-event-schluesselereignis',
      question: 'Was ist in GA4 der Unterschied zwischen einem Event und einem Schlüsselereignis?',
      answer: 'In Google Analytics 4 ist jede gemessene Interaktion technisch ein Event - vom Seitenaufruf bis zum Scrollen. Ein Schlüsselereignis (früher Conversion genannt) ist eine Teilmenge der geschäftlich wichtigsten Events, etwa eine abgesendete Angebotsanfrage (generate_lead) oder ein Telefonklick. Nur Schlüsselereignisse sollten zur Erfolgsbewertung von SEO und für den Import nach Google Ads genutzt werden.',
    },
    {
      id: 'einmal-pro-sitzung-ga4',
      question: 'Wo stelle ich die Zählmethode eines Schlüsselereignisses auf „Einmal pro Sitzung“ um?',
      answer: 'Öffnen Sie in Google Analytics 4 den Bereich Verwaltung, wechseln Sie unter Datenanzeige zu Schlüsselereignisse, klicken Sie rechts neben dem gewünschten Event (z. B. generate_lead) auf das Drei-Punkte-Menü und wählen Sie Zählmethode ändern. Für B2B-Leads verhindert die Option Einmal pro Sitzung zuverlässig doppelte Zählungen bei Mehrfachklicks oder beim Neuladen der Bestätigungsseite.',
    },
    {
      id: 'warum-fehlen-leads-in-ga4',
      question: 'Warum zeigt GA4 weniger Formular-Anfragen als mein E-Mail-Postfach oder CRM?',
      answer: 'Dafür gibt es im DACH-Raum vor allem zwei seriöse Gründe: Erstens lehnt ein Teil der Besucher im Cookie-Banner die Statistik-Einwilligung ab, sodass nach DSGVO und § 25 TDDDG kein GA4-Event gesendet werden darf. Zweitens blockieren Adblocker und strenge Browser-Schutzfunktionen das Google-Tag-Skript. Nutzen Sie deshalb immer Ihr CRM für die absolute Anzahl der Leads und GA4 für den Vergleich von Kanälen und Seitentypen.',
    },
    {
      id: 'wann-erscheinen-custom-dimensions',
      question: 'Wie lange dauert es, bis neue GA4 Events und Dimensionen in den Standardberichten sichtbar sind?',
      answer: 'Im GA4 DebugView und im Echtzeit-Bericht sehen Sie korrekt gesendete Events innerhalb weniger Sekunden. Bis ein neues Event sowie neu registrierte benutzerdefinierte Dimensionen (wie page_type oder lead_source) vollständig in den regulären Standardberichten und Explorativen Analysen erscheinen, vergehen bei Google Analytics 4 üblicherweise 24 bis 48 Stunden.',
    },
    {
      id: 'brauche-ich-zwingend-gtm',
      question: 'Muss ich für GA4 Events zwingend den Google Tag Manager verwenden?',
      answer: 'Nein. Auf individuell programmierten Websites (etwa mit Next.js) lassen sich GA4 Events auch schlank und direkt über gtag.js aus dem Anwendungscode senden - ohne zusätzlichen GTM-Container-Overhead für die Ladezeit (INP). Der Google Tag Manager lohnt sich vor allem dann, wenn Marketing-Teams mehrere Systeme ohne ständige Entwickler-Releases pflegen müssen.',
    },
  ],
  powiazane: [
    { href: '/audyt-seo', tekst: 'SEO Audit in 3 bis 5 Werktagen', opis: 'prüft Technik, Search Console und bestehende GA4-Schlüsselereignisse auf Messfehler' },
    { href: '/narzedzia/raport-seo', tekst: 'SEO Report Vorlage (PDF)', opis: 'zeigt, wie Sie GA4-Leads und Search-Console-Daten sauber für Entscheider berichten' },
    { href: '/blog/audyt-ux-strony', tekst: 'UX Audit für B2B-Websites', opis: 'wie Sie Formular-Hürden und Conversion-Abbrüche systematisch beheben' },
    { href: '/cookies', tekst: 'Datenschutzerklärung & Consent-Praxis', opis: 'transparente Dokumentation von Einwilligungen und Webanalyse auf unserer Website' },
  ],
  zrodla: [
    { url: 'https://developers.google.com/analytics/devguides/collection/ga4/events', nazwa: 'Google Analytics for Developers: Set up events & recommended event parameters in GA4', data: '2026-11-22' },
    { url: 'https://developers.google.com/tag-platform/security/guides/consent', nazwa: 'Google Tag Platform Docs: Consent Mode v2 (analytics_storage, ad_storage, ad_user_data, ad_personalization)', data: '2026-11-22' },
    { url: 'https://support.google.com/analytics/answer/10108813', nazwa: 'Google Analytics-Hilfe: Internen Traffic in GA4 definieren und Datenfilter aktivieren', data: '2026-11-22' },
    { url: 'https://www.gesetze-im-internet.de/ttdsg/__25.html', nazwa: 'Bundesministerium der Justiz: § 25 TDDDG (Schutz der Privatsphäre bei Endeinrichtungen)', data: '2026-11-22' },
  ],
};
