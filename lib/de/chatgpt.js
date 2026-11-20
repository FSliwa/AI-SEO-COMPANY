// Dane niemieckiej strony spoke /de/ki-suchoptimierung/chatgpt (Faza 2 DE, 19.11.2026; klucz PL: /pozycjonowanie-w-ai/chatgpt).
// Fraza główna: „chatgpt seo” (390/mies. DE). Wszystkie liczby pochodzą z własnego pomiaru AI SEO COMPANY z 4–5.11.2026
// (identycznie jak w lib/pytaniaAi.js i lib/de/geo.js) oraz z offizieller Dokumentation von OpenAI, Google und Microsoft.

export const STAND_CHATGPT_DE = '2026-11-19';

export const CHATGPT_DE = {
  okruszek: 'ChatGPT SEO',
  tag: 'KI-Suchoptimierung · ChatGPT',
  kurzantwort: 'ChatGPT SEO (Optimierung für Antworten in ChatGPT) setzt an den Quellen an, die das Modell bei aktivierter Websuche abruft. In unserem API-Test vom 4. und 5. November 2026 lieferte ChatGPT bei Unternehmens-Empfehlungen 62 Links, davon führten 59 zu Google Maps. Bei Fragen nach Preisen und Vergleichen zitierte es dagegen normale Websites. Deshalb beginnen wir immer mit dem Google Unternehmensprofil und klaren Leistungs- und Preisseiten.',
  lead: 'ChatGPT SEO ist ein Teilbereich der Generative Engine Optimization (GEO): Es geht darum, ob ChatGPT Ihr Unternehmen nennt, wenn potenzielle Kunden nach einem Anbieter, einem Preisrahmen oder einem Vergleich fragen. Auf dieser Seite zeigen wir unsere Auswertung von 20 echten Kundenfragen im Suchmodus von ChatGPT und leiten daraus 7 konkrete Umsetzungsschritte ab.',
  ctaPruefen: 'Kostenlos prüfen, ob ChatGPT Sie nennt',
  ctaAudit: 'KI-Sichtbarkeits-Audit anfragen (235 € netto)',
  tabelleMessung: {
    id: 'tabelle-chatgpt-messung-de',
    caption: 'Wohin die Links in den Antworten von ChatGPT und Perplexity führten (Messung 04.–05.11.2026)',
    columns: [
      { key: 'typ', label: 'Fragetyp (Beispiele)' },
      { key: 'antw', label: 'Antworten' },
      { key: 'links', label: 'Links gesamt' },
      { key: 'maps', label: 'Davon zu Google Maps' },
      { key: 'sonst', label: 'Übrige Quellen' },
    ],
    rows: [
      { id: 'empf', typ: 'Anbieter-Empfehlung (SEO-Agentur, Tischlerei, Sanitärbetrieb, Steuerbüro)', antw: '11 (10 Fragen)', links: '62', maps: '59 (Google-Maps-Suche)', sonst: '3 Agentur-Websites (bei Fragen mit Preisbezug)' },
      { id: 'preis', typ: 'Preisfragen (SEO-Kosten, SEO-Audit-Preis, Erfolgsbasis vs. Pauschale)', antw: '3', links: '15', maps: '0', sonst: 'Preisseiten und Ratgeber (u. a. unsere Preisseite)' },
      { id: 'rank', typ: 'Anbieter-Vergleich oder konkretes Leistungsmerkmal', antw: '2', links: '16', maps: '0', sonst: 'Branchenvergleiche und Anbieter-Websites' },
      { id: 'rat', typ: 'Allgemeine Ratgeberfragen („Wie empfiehlt mich ChatGPT?“)', antw: '4', links: '0', maps: '0', sonst: 'Antwort aus Modellwissen ohne Websuche' },
      { id: 'perp', typ: 'Zum Vergleich: Perplexity (Modell sonar, alle Fragetypen)', antw: '23', links: '–', maps: '0', sonst: 'Branchenverzeichnisse (z. B. Clutch, Sortlist) & Fachartikel' },
    ],
    przypis: 'Methode: Messung von AI SEO COMPANY am 04.–05.11.2026 über die DataForSEO LLM Responses API (polnischer Dienstleistungsmarkt, Suchstandort Warschau). ChatGPT = Modell gpt-4.1-mini mit aktivierter Websuche; Perplexity = Modell sonar. Links zu Maps sind Google-Maps-Such-URLs (google.com/maps/search) mit Firmennamen. Die ChatGPT-App beim Endnutzer kann je nach Standort und Gesprächsverlauf abweichend antworten.',
  },
  schritte: [
    [
      '1. Einheitliche Unternehmensprofile in Google Maps, Bing Places und Apple',
      'Vervollständigen Sie Ihr Google Unternehmensprofil (Haupt- und Nebenkategorien, Leistungen, Öffnungszeiten, echte Fotos) und halten Sie Name, Anschrift und Telefonnummer (NAP) in Bing Places und Apple Business Connect identisch. Da ChatGPT bei Empfehlungen Adresse und Öffnungszeiten nennt und auf Maps verlinkt, führen veraltete Einträge direkt zu falschen Angaben in der Antwort.',
    ],
    [
      '2. Präsenz in Branchenverzeichnissen und unabhängigen Vergleichen',
      'Prüfen Sie, welche Plattformen KI-Modelle in Ihrer Branche zitieren – im B2B-Umfeld etwa Clutch, Sortlist, Fachverbände oder spezialisierte Vergleichsportale. Ein vollständiges Profil mit überprüfbaren Kundenstimmen erhöht die Chance, in Listen-Antworten aufzutauchen.',
    ],
    [
      '3. Eigene Unterseiten mit direkter Antwort zu Leistung, Preis und Region',
      'Bei Preis- und Vergleichsfragen zitierte ChatGPT keine Kartenprofile, sondern konkrete Preisseiten und Ratgeber. Legen Sie für jede Kernleistung und jede häufige Preisfrage eine klar gegliederte Seite mit nachvollziehbaren Zahlen in Euro und einer präzisen Kurzantwort unter der Überschrift an.',
    ],
    [
      '4. OAI-SearchBot in der robots.txt zulassen und Inhalte im Server-HTML liefern',
      'OpenAI trennt seine Bots strikt: GPTBot sammelt Trainingsdaten, während OAI-SearchBot Webseiten für die Suche in ChatGPT erfasst. Laut OpenAI-Dokumentation erscheint eine für OAI-SearchBot gesperrte Seite nicht als Quelle in ChatGPT-Suchantworten. Stellen Sie außerdem sicher, dass Preise und Leistungsbeschreibungen im ausgelieferten HTML stehen und nicht erst per Client-JavaScript nachgeladen werden.',
    ],
    [
      '5. Saubere Indexierung in Google und Bing (inklusive IndexNow)',
      'Nur Seiten, die Suchmaschinen kennen und indexieren, gelangen in die Websuche von Sprachmodellen. Verbinden Sie Ihre Domain neben der Google Search Console auch mit den Bing Webmaster Tools und melden Sie neue oder aktualisierte URLs sofort über das Protokoll IndexNow.',
    ],
    [
      '6. Quellenanalyse statt Blindflug beim Erwähnungsaufbau',
      'Stellen Sie ChatGPT und Perplexity die zehn wichtigsten Kauf- und Vergleichsfragen Ihrer Kunden und notieren Sie jede verlinkte Drittseite. Diese Liste zeigt schwarz auf weiß, in welchen Fachmedien, Verzeichnissen oder Vergleichsartikeln eine Erwähnung Ihres Unternehmens tatsächlich Wirkung entfaltet.',
    ],
    [
      '7. Wöchentliche Messung auf einem festen Fragenset',
      'Eine einzelne Testfrage im eigenen Browser ist eine Momentaufnahme. Messen Sie regelmäßig dasselbe Set aus 20 bis 50 echten Kundenfragen und dokumentieren Sie drei Werte: Wird Ihre Marke genannt, welche Wettbewerber tauchen auf und welche URLs werden als Quelle verlinkt?',
    ],
  ],
  faq: [
    {
      id: 'garantie-chatgpt',
      question: 'Kann eine Agentur garantieren, dass ChatGPT mein Unternehmen empfiehlt?',
      answer: 'Nein. Kein Dienstleister kontrolliert die Gewichtung oder die Websuche von Sprachmodellen. Seriöses ChatGPT SEO verspricht keine garantierten Empfehlungen, sondern überprüfbare Arbeit an den zitierten Quellen (Unternehmensprofil, Leistungs- und Preisseiten, Bot-Zugang, Fachmedien) und eine transparente wöchentliche Messung.',
    },
    {
      id: 'gptbot-vs-oaisearchbot',
      question: 'Kann ich das KI-Training blockieren und trotzdem in ChatGPT-Antworten erscheinen?',
      answer: 'Ja. Laut OpenAI können Sie in Ihrer robots.txt den Trainings-Crawler GPTBot per Disallow ausschließen und gleichzeitig OAI-SearchBot erlauben. Damit fließen Ihre Texte nicht in das Modelltraining ein, bleiben aber für aktuelle Antworten der ChatGPT-Suche auffindbar.',
    },
    {
      id: 'hilft-llms-txt-chatgpt',
      question: 'Bringt eine llms.txt-Datei bessere Platzierungen in ChatGPT?',
      answer: 'Einen belegten Ranking-Vorteil gibt es derzeit nicht: Weder OpenAI noch Google haben bestätigt, llms.txt für ihre Suchantworten auszuwerten. Viel wichtiger sind ein offener Zugang für OAI-SearchBot in der robots.txt und sauberes Server-HTML. Wenn Sie dennoch eine geordnete Markdown-Übersicht bereitstellen möchten, erstellt unser kostenloser llms.txt Generator die Datei in Sekunden.',
    },
    {
      id: 'kostenloses-tool-chatgpt-seo',
      question: 'Gibt es ein kostenloses Tool für ChatGPT SEO?',
      answer: 'Ja: Mit unserem kostenlosen Check unter /de/ki-sichtbarkeit-pruefen testen Sie live, ob ChatGPT, Gemini, Perplexity, Claude und Google AI Overviews Ihr Unternehmen bei typischen Kundenfragen nennen. Den Zugang von OAI-SearchBot in Ihrer robots.txt prüft zusätzlich unser kostenloser SEO Audit.',
    },
    {
      id: 'was-kostet-chatgpt-seo',
      question: 'Was kostet die Optimierung für ChatGPT bei AI SEO COMPANY?',
      answer: 'Unser einmaliger KI-Sichtbarkeits-Audit kostet 235 Euro netto (30 Kundenfragen in 4 Systemen, Wettbewerbs- und Quellenanalyse sowie 10 priorisierte Maßnahmen; wird bei Buchung auf den ersten Monat angerechnet). Die laufende Arbeit samt wöchentlicher Messung ist im Paket SEO Premium (590 Euro netto/Monat) enthalten oder als Zusatzmodul für 115 Euro netto/Monat zu SEO Standard buchbar.',
    },
  ],
  zrodla: [
    { url: 'https://platform.openai.com/docs/bots', nazwa: 'OpenAI Platform Docs: Overview of OpenAI Crawlers (OAI-SearchBot, GPTBot, ChatGPT-User)', data: '2026-11-19' },
    { url: 'https://help.openai.com/en/articles/9237897-chatgpt-search', nazwa: 'OpenAI Help Center: ChatGPT search', data: '2026-11-19' },
    { url: 'https://developers.google.com/search/docs/appearance/ai-features', nazwa: 'Google Search Central: KI-Funktionen und Ihre Website', data: '2026-11-19' },
    { url: 'https://www.bing.com/indexnow', nazwa: 'Microsoft Bing: IndexNow-Protokoll zur sofortigen URL-Meldung', data: '2026-11-19' },
  ],
};
