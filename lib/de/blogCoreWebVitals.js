// Dane niemieckiego artykułu /de/blog/core-web-vitals (Faza 2 DE, 19.11.2026; klucz PL: /blog/core-web-vitals-a-pozycje-google).
// Fraza główna: „core web vitals” (1 000/mies. DE). Wszystkie progi i fakty zweryfikowane z web.dev/articles/vitals
// oraz Google Search Central (Abruf: 19.11.2026) + nasz test rozrzutu PSI z 11.11.2026 (11 pomiarów: 59–81 pkt).

export const BLOG_CWV_DE = {
  fallbackPfad: '/blog/core-web-vitals',
  okruszek: 'Core Web Vitals',
  kategoria: 'Technisches SEO & Ladezeit',
  h1: 'Core Web Vitals (LCP, INP, CLS): Grenzwerte, Messung und Google-Rankings',
  opublikowano: '2026-11-19',
  aktualisiert: '2026-11-19',
  kurzantwort: 'Die Core Web Vitals messen Ladezeit, Reaktionsfähigkeit und visuelle Stabilität einer Seite anhand echter Chrome-Nutzungsdaten. Google stuft eine URL im 75. Perzentil als „gut“ ein, wenn LCP höchstens 2,5 Sekunden, INP höchstens 200 Millisekunden und CLS höchstens 0,1 beträgt. Gute Werte unterstützen Rankings, ersetzen aber keine relevante Antwort auf die Suchanfrage.',
  lead: 'Seit März 2024 hat INP (Interaction to Next Paint) den alten Messwert FID endgültig abgelöst. Trotzdem verwechseln viele Teams noch immer einen einzelnen Lighthouse-Punktwert mit der Bewertung in der Google Search Console. Dieser Leitfaden zeigt die offiziellen Grenzwerte, den Unterschied zwischen Feld- und Labordaten sowie die Maßnahmen, die in der Praxis am meisten bringen.',
  sekcje: [
    {
      id: 'grenzwerte',
      h2: 'Die drei Core Web Vitals und ihre offiziellen Grenzwerte',
      html: '<p>Google bewertet für jede der drei Kennzahlen das <strong>75. Perzentil</strong> aller erfassten Seitenaufrufe echter Nutzerinnen und Nutzer (Mobilgeräte und Desktop getrennt). Das bedeutet: Mindestens drei von vier Besuchen müssen den jeweiligen Schwellenwert einhalten, damit die URL oder Seitengruppe den Status „Gut“ erhält.</p>',
      tabela: {
        id: 'tabelle-cwv-grenzwerte',
        caption: 'Offizielle Schwellenwerte der Core Web Vitals im 75. Perzentil (Quelle: web.dev)',
        columns: [
          { key: 'metrik', label: 'Kennzahl' },
          { key: 'was', label: 'Was gemessen wird' },
          { key: 'gut', label: 'Gut' },
          { key: 'mittel', label: ' Optimierungsbedarf' },
          { key: 'schlecht', label: 'Schlecht' },
        ],
        rows: [
          { metrik: 'LCP (Largest Contentful Paint)', was: 'Sichtbarkeit des größten Inhaltsblocks im Viewport (meist Hero-Bild oder H1)', gut: 'bis 2,5 s', mittel: 'über 2,5 s bis 4,0 s', schlecht: 'über 4,0 s' },
          { metrik: 'INP (Interaction to Next Paint)', was: 'Reaktionszeit auf Klicks, Tipps und Tastatureingaben über den gesamten Besuch', gut: 'bis 200 ms', mittel: 'über 200 ms bis 500 ms', schlecht: 'über 500 ms' },
          { metrik: 'CLS (Cumulative Layout Shift)', was: 'Unerwartetes Springen sichtbarer Layout-Elemente beim Laden', gut: 'bis 0,1', mittel: 'über 0,1 bis 0,25', schlecht: 'über 0,25' },
        ],
        przypis: 'Quelle: Google / web.dev, „Web Vitals“, Abruf am 19.11.2026.',
      },
    },
    {
      id: 'felddaten-vs-labordaten',
      h2: 'Felddaten (CrUX) vs. Labordaten (Lighthouse): Was für Google zählt',
      html: [
        '<p>Wenn Sie PageSpeed Insights öffnen, sehen Sie oben „Entdecken Sie, was echte Nutzer erleben“ (Felddaten aus dem Chrome UX Report der letzten 28 Tage) und darunter die Diagnose aus Lighthouse (Labordaten). Für die Bewertung in den Google-Suchsystemen und im Bericht „Core Web Vitals“ der Search Console zählen <strong>ausschließlich die Felddaten</strong>.</p>',
        '<p>Labormessungen schwanken zudem spürbar zwischen einzelnen Durchläufen. Am 11.11.2026 haben wir unsere eigene Startseite elfmal hintereinander mobil über die PageSpeed-Insights-API gemessen: Die Einzelwerte lagen ohne jede Codeänderung zwischen <strong>59 und 81 Punkten</strong>. Deshalb misst unser <a href="/de/tools/kostenloser-seo-audit">kostenloser SEO Audit</a> dreimal parallel und bildet den Median, statt sich auf einen Ausreißer zu verlassen.</p>',
      ].join(''),
    },
    {
      id: 'einfluss-auf-rankings',
      h2: 'Wie stark beeinflussen Core Web Vitals die Google-Positionen?',
      html: [
        '<p>Google formuliert es in der Dokumentation zur Seitenerfahrung nüchtern: Die Core Web Vitals werden von den Ranking-Systemen genutzt, sind aber kein Freifahrtschein auf Platz 1. Relevanz, Inhaltstiefe und Autorität wiegen stärker als ein Vorsprung von wenigen Hundertstelsekunden. In zwei Situationen kosten schlechte Werte jedoch messbar Sichtbarkeit und Anfragen:</p>',
        '<ul>',
        '<li><strong>Deutlich im roten Bereich auf dem Smartphone:</strong> Wenn Wettbewerb und Suchintention eng beieinanderliegen, bevorzugt Google Seiten mit solider Nutzererfahrung.</li>',
        '<li><strong>Absprünge vor dem ersten Kontakt:</strong> In einer mobilen Auswertung von Google/SOASTA stieg die Absprungwahrscheinlichkeit beim Anstieg der Ladezeit von 1 auf 3 Sekunden um 32 %. Selbst ein gutes Ranking verpufft, wenn das Formular erst nach 5 Sekunden reagiert.</li>',
        '</ul>',
      ].join(''),
    },
    {
      id: 'optimierung-in-der-praxis',
      h2: 'Was LCP, INP und CLS in der Praxis am schnellsten verbessert',
      html: [
        '<h3>1. LCP unter 2,5 Sekunden senken</h3>',
        '<ul>',
        '<li><strong>Serverantwortzeit (TTFB) prüfen:</strong> Liefert der Server das HTML erst nach 1,5 Sekunden aus, kann LCP kaum grün werden. Server-Side Rendering (z. B. Next.js App Router) oder sauberes Seiten-Caching im CMS schaffen die Basis.</li>',
        '<li><strong>Hero-Bild richtig ausliefern:</strong> AVIF oder WebP in passender Auflösung verwenden, niemals <code>loading="lazy"</code> auf das sichtbare Hauptbild setzen und stattdessen <code>fetchpriority="high"</code> vergeben.</li>',
        '<li><strong>Render-blockierendes CSS und JS reduzieren:</strong> Unbenutzte Plugin-Stylesheets auf der Startseite entfernen.</li>',
        '</ul>',
        '<h3>2. INP unter 200 Millisekunden halten</h3>',
        '<ul>',
        '<li><strong>Lange JavaScript-Aufgaben (Long Tasks &gt; 50 ms) aufteilen:</strong> Schwere Tracking-, Chat- und Consent-Skripte blockieren den Hauptthread genau dann, wenn Besucher auf das Menü oder ein Formular tippen.</li>',
        '<li><strong>Drittanbieter-Tags entrümpeln:</strong> Jeden Tag im Tag Manager prüfen, ob das Tool wirklich aktiv genutzt wird.</li>',
        '</ul>',
        '<h3>3. CLS unter 0,1 stabilisieren</h3>',
        '<ul>',
        '<li><strong>Feste Abmessungen vergeben:</strong> Jedes Bild, Video und Einbettungselement bekommt explizite <code>width</code>- und <code>height</code>-Attribute oder ein <code>aspect-ratio</code> im CSS.</li>',
        '<li><strong>Platz für Banner und Schriften reservieren:</strong> Webfonts mit <code>font-display: swap</code> und größenangepasster Fallback-Schrift laden; nachträglich eingeschobene Leisten am oberen Bildschirmrand vermeiden.</li>',
        '</ul>',
        '<p>Eine systematische Prüfung Ihrer gesamten Website – von TTFB über Bildgrößen bis zur mobilen Darstellung – erhalten Sie sofort im <a href="/de/tools/kostenloser-seo-audit">kostenlosen SEO Audit</a> oder als vollständigen Maßnahmenplan für Ihre Entwickler in unserem <a href="/de/seo-audit">SEO Audit</a>.</p>',
      ].join(''),
    },
  ],
  faqTytul: 'Häufige Fragen zu den Core Web Vitals',
  faq: [
    {
      id: 'was-ist-inp',
      question: 'Was ist INP (Interaction to Next Paint)?',
      answer: 'INP misst, wie schnell eine Webseite nach einem Klick, Tipp oder Tastendruck visuell reagiert – betrachtet über den gesamten Seitenbesuch hinweg. Seit März 2024 ersetzt INP den früheren Wert FID. Bis 200 Millisekunden im 75. Perzentil gelten bei Google als gut, über 500 Millisekunden als schlecht.',
    },
    {
      id: 'warum-keine-daten-gsc',
      question: 'Warum zeigt die Search Console bei meiner Website „Keine Daten verfügbar“?',
      answer: 'Der Bericht in der Search Console basiert auf dem öffentlichen Chrome UX Report (CrUX). Hat eine kleinere oder neue Website noch nicht genügend Aufrufe von Chrome-Nutzern mit aktivierter Nutzungsstatistik gesammelt, liegen keine Felddaten vor. Nutzen Sie in dieser Phase Labormessungen (Median mehrerer Läufe) und die Server-Antwortzeiten zur Optimierung.',
    },
    {
      id: 'brauche-ich-100-punkte',
      question: 'Muss meine Website 100 von 100 Punkten in PageSpeed Insights erreichen?',
      answer: 'Nein. Der Gesamtscore von 0 bis 100 stammt aus dem Lighthouse-Labortest, nicht aus Googles Ranking-Bewertung. Wirtschaftlich sinnvoll ist es, die drei Felddaten-Grenzwerte (LCP bis 2,5 s, INP bis 200 ms, CLS bis 0,1) stabil im grünen Bereich zu halten, statt für die letzten 3 Laborpunkte wichtige Funktionen zu streichen.',
    },
    {
      id: 'wirken-cwv-auf-ki-suche',
      question: 'Spielen Ladezeit und Server-Rendering auch für KI-Bots eine Rolle?',
      answer: 'Ja, vor allem über das HTML-Rendering und die Antwortzeit. Die meisten KI-Crawler (etwa OAI-SearchBot, PerplexityBot oder ClaudeBot) führen kein aufwendiges Client-JavaScript aus. Schnelles serverseitiges HTML hilft daher gleichzeitig den Core Web Vitals und der Zitierbarkeit in KI-Antworten.',
    },
  ],
  powiazane: [
    { href: '/narzedzia/audyt-seo', tekst: 'Kostenloser SEO Audit', opis: 'prüft mobile PageSpeed-Werte (Median aus 3 Messungen), Seitengröße und Technik' },
    { href: '/narzedzia/checklista-seo', tekst: 'SEO Checkliste (PDF)', opis: '50 Prüfpunkte inklusive Ladezeit, Bildern und mobiler Darstellung' },
    { href: '/audyt-seo', tekst: 'SEO Audit in 3 bis 5 Werktagen', opis: 'tiefgehende Analyse von Core Web Vitals, Indexierung und Architektur' },
    { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', tekst: 'Canonical Tag im SEO', opis: 'wie Sie Duplicate Content sauber konsolidieren' },
  ],
  zrodla: [
    { url: 'https://web.dev/articles/vitals', nazwa: 'web.dev: Web Vitals – offizielle Definitionen, 75.-Perzentil-Regel und Grenzwerte für LCP, INP und CLS', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/appearance/core-web-vitals', nazwa: 'Google Search Central: Core Web Vitals und Google-Suchergebnisse verstehen', data: '2026-11-19' },
    { url: 'https://web.dev/articles/inp', nazwa: 'web.dev: Interaction to Next Paint (INP)', data: '2026-11-19' },
    { url: 'https://web.archive.org/web/20251226035614/https://www.thinkwithgoogle.com/marketing-strategies/app-and-mobile/mobile-page-speed-new-industry-benchmarks/', nazwa: 'Think with Google / SOASTA (2017, Archiv): Mobile Page Speed Benchmarks (+32 % Absprungwahrscheinlichkeit bei 1 s auf 3 s)', data: '2026-11-19' },
  ],
};
