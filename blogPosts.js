// Czas czytania (readMinPl / readMinEn) policzony z REALNEJ objetosci tekstu
// na produkcji: widoczny tekst strony bez nav/stopki/skryptow, podzielony przez
// 200 slow na minute i zaokraglony. Pomiar z 05.10.2026.
// Wpisy jednojezyczne maja tylko swoje pole - strona-cien drugiego jezyka ma
// kilka slow ("English translation is currently unavailable") i nie dostaje
// czasu czytania. Komponent Blog.jsx pomija metryke, gdy pola brak.
//
// `related` (20.10.2026): wpisy z tego samego tematu do bloku "Powiazane
// artykuly" (BlogCTA). Wczesniej blok bral dwa najnowsze wpisy, wiec 19 z 20
// artykulow linkowalo do tych samych dwoch (wyniki-wdrozen i storytelling),
// a np. audyt-ux-strony i tag-kanoniczny mialy po 3 linki z tresci. Lista
// moze zawierac wpisy jednojezyczne - BlogCTA pomija te niedostepne w danym
// jezyku, dlatego wiekszosc list ma 3 pozycje przy 2 kartach.
//
// `cta` (5.11.2026, BC1; mapa CS-04 = KLASTER_WPISU w lib/blogCta.js): klaster BlogCTA
// z lib/blogCta.js (ceny, audyt, web, lokalne, analityka, ai). Brak pola = przycisk do
// formularza #kontakt (mailchimp, vwo i wpisy tylko EN). titlePl/descPl odswiezonych
// artykulow zsynchronizowane z ich title/meta 5.11.2026 (titlePl zasila tez headline
// w BlogPosting). Pol `date` nie zmieniamy (CLAUDE.md).
import { hreflangDe, maWersjeDe } from './stronyDe';

export const blogPosts = [
  // 23.11.2026: SEO techniczne - dane strukturalne, JavaScript, hreflang i migracje (tylko PL, dokument AISEO_SEO_techniczne_1).
  // readMinPl z tekstu artykułu (~200 słów/min). Obraz karty: ciemna szklana fasada (Unsplash 1526289034009,
  // wcześniej nieużywany) jako WebP pod opisową nazwą. bezGlownej: true jak przy B1 i F9, żeby karta
  // „Agencja SEO czy Google Ads?” została w trójce na stronie głównej (strażnik fraz).
  {
    date: '2026-11-23',
    displayDatePl: '23 Listopada 2026',
    displayDateEn: 'November 23, 2026',
    tagPl: 'Techniczne SEO',
    tagEn: 'Technical SEO',
    titlePl: 'SEO techniczne: dane strukturalne, JavaScript i hreflang',
    titleEn: '',
    descPl: 'SEO techniczne w praktyce: dane strukturalne Schema.org, renderowanie JavaScript, hreflang i plan migracji strony bez utraty ruchu z Google.',
    descEn: '',
    slug: '/blog/seo-techniczne-dane-strukturalne-javascript-hreflang',
    related: ['/blog/technical-seo-audit-checklist', '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', '/blog/core-web-vitals-a-pozycje-google'],
    cta: 'audyt',
    readMinPl: 20,
    image: '/images/ciemna-szklana-fasada-budynku.webp',
    heroImage: '/images/ciemna-szklana-fasada-budynku.webp',
    bezGlownej: true,
    enOnly: false,
    plOnly: true
  },
  // 22.11.2026 (F9): Reklamy w ChatGPT vs organiczne GEO (PL + EN; slug EN w i18n/routing.js: /blog/chatgpt-ads-vs-organic-geo).
  // bezGlownej: true zachowuje kartę „Agencja SEO czy Google Ads?” w trójce na stronie głównej / (strażnik fraz).
  {
    date: '2026-11-22',
    displayDatePl: '22 Listopada 2026',
    displayDateEn: 'November 22, 2026',
    tagPl: 'Pozycjonowanie w AI',
    tagEn: 'AI Search & GEO',
    titlePl: 'Reklamy w ChatGPT (ChatGPT Ads): co wiemy i dla kogo są',
    titleEn: 'ChatGPT Ads vs Organic GEO: What OpenAI Announced (2026)',
    descPl: 'Reklamy w ChatGPT: co OpenAI ogłosiło o formatach, oznaczeniu i kierowaniu, czym różnią się od pozycjonowania w AI i kiedy je testować.',
    descEn: 'ChatGPT Ads explained: what OpenAI confirmed about sponsored formats, labeling, costs vs Google Ads, and why organic GEO citations come first.',
    slug: '/blog/reklamy-w-chatgpt',
    slugEn: '/blog/chatgpt-ads-vs-organic-geo',
    related: [
      '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews',
      '/blog/agencja-seo-czy-google-ads',
      '/blog/how-long-does-seo-take',
      '/blog/seo-for-saas-startups-playbook'
    ],
    cta: 'ai',
    readMinPl: 9,
    readMinEn: 8,
    image: '/images/unsplash-1618005182384-a83a8bd57fbe.jpg',
    heroImage: '/images/unsplash-1618005182384-a83a8bd57fbe.jpg',
    bezGlownej: true,
    enOnly: false,
    plOnly: false
  },
  // 18.11.2026: Bing Webmaster Tools i IndexNow (tylko PL; opublikowany po potwierdzeniu, że domena jest w BWT).
  // readMinPl z tekstu artykułu (~200 słów/min). Obraz karty: abstrakcja wolna na polskiej siatce.
  {
    date: '2026-11-18',
    displayDatePl: '18 Listopada 2026',
    displayDateEn: 'November 18, 2026',
    tagPl: 'Techniczne SEO',
    tagEn: 'Technical SEO',
    titlePl: 'Bing Webmaster Tools i IndexNow: konfiguracja krok po kroku',
    titleEn: '',
    descPl: 'Jak dodać stronę do Bing Webmaster Tools, wdrożyć IndexNow i sprawdzić indeksację w Bing. Co o roli Binga w ChatGPT piszą Microsoft i OpenAI.',
    descEn: '',
    slug: '/blog/bing-webmaster-tools-indexnow-chatgpt',
    related: ['/blog/google-ai-mode-jak-sie-pojawic', '/blog/technical-seo-audit-checklist', '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews'],
    cta: 'ai',
    readMinPl: 8,
    image: '/images/abstract-molten-copper-fluid.webp',
    heroImage: '/images/abstract-molten-copper-fluid.webp',
    // Ukryty na liście strony głównej decyzją właściciela z 18.11.2026, żeby karta „Agencja SEO czy Google Ads?” zachowała miejsce (strażnik fraz). Filtr tylko w components/Blog.jsx.
    bezGlownej: true,
    enOnly: false,
    plOnly: true
  },
  // 18.11.2026: Landing page - tworzenie, CMS, hosting i cena (tylko PL, dokument AI SEO).
  // readMinPl z tekstu artykułu (~200 słów/min). Obraz karty: kopia
  // seo-search-engine-optimization-services.jpg jako WebP 1200x800 pod opisową nazwą, wolna na polskiej siatce.
  {
    date: '2026-11-18',
    displayDatePl: '18 Listopada 2026',
    displayDateEn: 'November 18, 2026',
    tagPl: 'Tworzenie stron',
    tagEn: 'Web design',
    titlePl: 'Landing page: tworzenie, wybór CMS, hosting i cena',
    titleEn: '',
    descPl: 'Landing page krok po kroku: tworzenie, wybór CMS, hosting i SEO strony. Sprawdź, od czego zależy cena i jak uniknąć błędów obniżających konwersję.',
    descEn: '',
    slug: '/blog/landing-page-tworzenie-cms-hosting-cena',
    related: ['/blog/ile-kosztuje-strona-www-dla-firmy-ceny', '/blog/audyt-ux-strony', '/blog/technical-seo-audit-checklist'],
    cta: 'web',
    readMinPl: 17,
    image: '/images/abstract-dark-green-wave.webp',
    heroImage: '/images/abstract-dark-green-wave.webp',
    enOnly: false,
    plOnly: true
  },
  // 18.11.2026 (integracja listy airSlate): Google AI Mode (tylko PL) i How long does SEO take (tylko EN).
  {
    date: '2026-11-18',
    displayDatePl: '18 Listopada 2026',
    displayDateEn: 'November 18, 2026',
    tagPl: 'Pozycjonowanie w AI',
    tagEn: 'AI search',
    titlePl: 'Google AI Mode: jak się w nim pojawić. Poradnik SEO 2026',
    titleEn: '',
    descPl: 'Google AI Mode w Polsce: czym różni się od AI Overviews, skąd bierze źródła, jak je mierzyć w Search Console i co zrobić, by strona była cytowana.',
    descEn: '',
    slug: '/blog/google-ai-mode-jak-sie-pojawic',
    related: ['/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews', '/blog/technical-seo-audit-checklist', '/blog/content-gap-analysis'],
    cta: 'ai',
    readMinPl: 9,
    image: '/images/abstract-glowing-light-streams.webp',
    heroImage: '/images/abstract-glowing-light-streams.webp',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-11-18',
    displayDatePl: '18 Listopada 2026',
    displayDateEn: 'November 18, 2026',
    tagPl: 'SEO',
    tagEn: 'SEO basics',
    titlePl: '',
    titleEn: 'How long does SEO take? Real client timelines, 2026',
    descPl: '',
    descEn: 'How long does SEO take? Google’s own timing statements, an Ahrefs study and Search Console timelines of four sites we work on.',
    slug: '/blog/how-long-does-seo-take',
    related: ['/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', '/blog/seo-for-saas-startups-playbook'],
    cta: 'ceny',
    readMinEn: 8,
    image: '/images/abstract-deep-blue-ink-swirls.webp',
    heroImage: '/images/abstract-deep-blue-ink-swirls.webp',
    enOnly: true,
    plOnly: false
  },
  // 17.11.2026: dwa artykuły tylko-PL (dokumenty AI SEO). readMinPl liczony z tekstu artykułu
  // (~200 słów/min) - po wdrożeniu można zweryfikować pomiarem z produkcji jak dla reszty wpisów.
  // Obrazy kart: nowe pliki z opisowymi nazwami (kopie google-reviews-v2.png i
  // search-engine-optimization-consultants.jpg), wolne na polskiej siatce.
  // Kolejność dwóch wpisów z 17.11 (ta sama data): „Agencja SEO czy Google Ads” przed „AI Overviews”,
  // bo trzy najnowsze karty na stronie głównej (sort po dacie, stabilny) inaczej wypychają kartę z frazą
  // „agencja SEO” i strażnik fraz (kontrola-fraz.py) zgłasza spadek na / (18.11.2026).
  {
    date: '2026-11-17',
    displayDatePl: '17 Listopada 2026',
    displayDateEn: 'November 17, 2026',
    tagPl: 'SEO i reklamy',
    tagEn: 'SEO and ads',
    titlePl: 'Agencja SEO czy Google Ads? Jak wybrać kanał i partnera',
    titleEn: '',
    descPl: 'Agencja SEO czy Google Ads? Porównaj mechanizmy, czas efektu i trwałość obu kanałów, sprawdź, kiedy je łączyć, i dowiedz się, jak wybrać partnera.',
    descEn: '',
    slug: '/blog/agencja-seo-czy-google-ads',
    related: ['/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews'],
    cta: 'audyt',
    readMinPl: 18,
    image: '/images/abstract-deep-blue-ink-swirls.webp',
    heroImage: '/images/abstract-deep-blue-ink-swirls.webp',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-11-17',
    displayDatePl: '17 Listopada 2026',
    displayDateEn: 'November 17, 2026',
    tagPl: 'Pozycjonowanie w AI',
    tagEn: 'AI search',
    titlePl: 'Jak zoptymalizować stronę pod Google AI Overviews i AI Mode',
    titleEn: '',
    descPl: 'Google nie ma znaczników dla AI. Co decyduje o cytowaniu w AI Overviews, AI Mode i Perplexity: technika, treść, pomiar i plan na 30 dni.',
    descEn: '',
    slug: '/blog/jak-zoptymalizowac-strone-pod-google-ai-overviews',
    related: ['/blog/technical-seo-audit-checklist', '/blog/content-gap-analysis', '/blog/agencja-seo-czy-google-ads'],
    cta: 'ai',
    readMinPl: 19,
    image: '/images/abstract-glowing-light-streams.webp',
    heroImage: '/images/abstract-glowing-light-streams.webp',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-08-31',
    displayDatePl: '31 Sierpnia 2026',
    displayDateEn: 'August 31, 2026',
    tagPl: 'Analiza SEO',
    tagEn: 'SEO Analysis',
    titlePl: 'Case study SEO: wyniki pięciu wdrożeń w 2026 (dane GSC)',
    titleEn: '',
    descPl: 'Zebrane w jednym miejscu wyniki pięciu wdrożeń SEO z 2026 roku: kliknięcia, wyświetlenia i pozycje z Google Search Console, z metodologią pomiaru.',
    descEn: '',
    slug: '/blog/wyniki-wdrozen-seo-2026',
    related: ['/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', '/blog/analiza-konkurencji-seo-przewodnik', '/blog/technical-seo-audit-checklist'],
    cta: 'ceny',
    readMinPl: 6,
    // Zielono-morski plynny marmur: jedyny inny uzytkownik (multi-location)
    // jest enOnly, wiec na polskiej siatce zero duplikatow.
    image: '/images/multi-location-seo-header.jpg',
    heroImage: '/images/multi-location-seo-header.jpg',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-08-31',
    datePl: '2026-09-01',
    displayDatePl: '01 Września 2026',
    displayDateEn: 'August 31, 2026',
    tagPl: 'Strategia treści',
    tagEn: 'Content strategy',
    titlePl: 'Storytelling marki: 5 wzorców dla B2B i mniejszych firm',
    titleEn: 'Convert More Customers: 5 Brand Storytelling Patterns',
    descPl: 'Pięć wzorców storytellingu marki, framework czterech filarów i metryki, które sprawdzają, czy historia działa - dla B2B i mniejszych firm.',
    descEn: 'Five brand storytelling patterns, a four-pillar framework, and the metrics to test whether the story works - built for B2B and smaller companies.',
    slug: '/blog/brand-storytelling-patterns',
    related: ['/blog/content-gap-analysis', '/blog/analiza-konkurencji-seo-przewodnik', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista'],
    cta: 'web',
    readMinPl: 14, readMinEn: 17,
    // PL wystartowal 1.09 (commit 4a12a78, datePl); EN 31.08 (commit fe5abf9) = `date`, klucz
    // sortowania pary. Sliwkowy marmur
    // (Unsplash, fot. Aedrian Salazar, id dbGq3i3BoXc) jest wolny na OBU
    // siatkach, wiec karta wspolna dla jezykow.
    image: '/images/abstract-plum-liquid-marble.webp',
    heroImage: '/images/abstract-plum-liquid-marble.webp',
    enOnly: false,
    plOnly: false
  },
  {
    date: '2026-08-26',
    displayDatePl: '26 Sierpnia 2026',
    displayDateEn: 'August 26, 2026',
    tagPl: 'Techniczne SEO',
    tagEn: 'SEO Analysis',
    titlePl: 'Audyt techniczny SEO: checklista z progami i arkusz',
    titleEn: 'Technical SEO Audit Checklist for Digital Marketers',
    descPl: 'Jak zrobić audyt techniczny SEO, który kończy się listą napraw: crawl, indeksacja, progi Core Web Vitals i kryteria binarne zamiast ocen na oko.',
    descEn: 'Run a technical SEO audit that ends in a prioritized fix list: crawl, indexability, Core Web Vitals thresholds, and schema that still earns a result.',
    slug: '/blog/technical-seo-audit-checklist',
    related: ['/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', '/blog/core-web-vitals-a-pozycje-google', '/blog/audyt-ux-strony'],
    cta: 'audyt',
    readMinPl: 13, readMinEn: 16,
    // Karty per jezyk, zeby uniknac duplikatow grafik na listingach:
    // PL fiolet (google-reviews-abstract nie wystepuje na zadnej karcie),
    // EN miedz (jedyny inny uzytkownik miedzi, audyt-ux-strony, jest plOnly).
    image: '/images/google-reviews-abstract.png',
    imageEn: '/images/abstract-molten-copper-fluid.webp',
    heroImage: '/images/google-reviews-abstract.png',
    heroImageEn: '/images/abstract-molten-copper-fluid.webp',
    enOnly: false,
    plOnly: false
  },
  {
    date: '2026-08-16',
    displayDatePl: '16 Sierpnia 2026',
    displayDateEn: 'August 16, 2026',
    tagPl: 'Compliance Stron Internetowych',
    tagEn: '',
    titlePl: 'RODO na stronie internetowej: co musisz mieć i jak to wdrożyć',
    titleEn: '',
    descPl: 'Polityka prywatności, baner cookies i umowy powierzenia - co wdrożyć na stronie w 2026 roku, po wejściu w życie Prawa komunikacji elektronicznej.',
    descEn: '',
    slug: '/blog/rodo-na-stronie-internetowej',
    related: ['/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', '/blog/ile-kosztuje-strona-www-dla-firmy-ceny', '/blog/mailchimp-vs-getresponse'],
    cta: 'web',
    readMinPl: 15, readMinEn: 15,
    image: '/images/pngtree-abstract-design-background-blue-color-with-aesthetic-and-liquid-style-image_15684491.jpg',
    heroImage: '/images/pngtree-abstract-design-background-blue-color-with-aesthetic-and-liquid-style-image_15684491.jpg',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-08-15',
    // The Polish half of the pair went live three days after the English one,
    // so the display dates differ while `date` keeps the pair's sort position.
    displayDatePl: '18 Sierpnia 2026',
    displayDateEn: 'August 15, 2026',
    tagPl: 'Strategia treści',
    tagEn: 'Content strategy',
    titlePl: 'Analiza luk contentowych: przewodnik praktyczny',
    titleEn: 'Content Gap Analysis: A Practical Guide for Marketing Teams',
    descPl: 'Jak przeprowadzić analizę luk contentowych kończącą się backlogiem z priorytetami: wybór konkurentów, siedem typów luk, scoring i kwartalne powtórki.',
    descEn: 'Run a content gap analysis that ends in a prioritized roadmap: competitor selection, seven gap types, scoring by impact and effort, and quarterly re-runs.',
    slug: '/blog/content-gap-analysis',
    related: ['/blog/analiza-konkurencji-seo-przewodnik', '/blog/brand-storytelling-patterns', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista'],
    cta: 'audyt',
    readMinPl: 14, readMinEn: 29,
    image: '/images/abstract-emerald-liquid-marble.webp',
    // Karta EN celowo dzieli grafike z RODO (decyzja klienta); RODO jest
    // plOnly, wiec na angielskim blogu duplikat nie wystapi.
    imageEn: '/images/pngtree-abstract-design-background-blue-color-with-aesthetic-and-liquid-style-image_15684491.jpg',
    heroImage: '/images/abstract-emerald-liquid-marble.webp',
    heroImageEn: '/images/pngtree-abstract-design-background-blue-color-with-aesthetic-and-liquid-style-image_15684491.jpg',
    enOnly: false,
    plOnly: false
  },
  {
    date: '2026-08-13',
    displayDatePl: '13 Sierpnia 2026',
    dateEn: '2026-09-01',
    tagPl: 'UX i konwersja',
    tagEn: 'UX & Conversion',
    titlePl: 'Audyt UX strony pod konwersję: przewodnik',
    titleEn: 'Website UX Audit for Conversion: A Practical Guide',
    descPl: 'Jak przeprowadzić audyt UX, który kończy się backlogiem z priorytetami: weryfikacja pomiaru, analiza lejków, testy z użytkownikami i pomiar efektu.',
    descEn: 'How to run a UX audit that ends with a prioritized backlog: measurement verification, funnel analysis, user testing and effect measurement.',
    slug: '/blog/audyt-ux-strony',
    related: ['/blog/vwo-vs-optimizely-porownanie', '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', '/blog/core-web-vitals-a-pozycje-google'],
    cta: 'web',
    readMinPl: 19, readMinEn: 22,
    // EN wystartowal 1.09 (commit 4a12a78, dateEn); `date` = pierwsza publikacja PL (13.08,
    // commit 288725b) i trzyma pozycje pary w sortowaniu (precedens content-gap). Karty per jezyk: miedz zostaje na PL; na siatce EN miedz
    // zajmuje juz audyt techniczny, wiec EN dostaje fiolet google-reviews
    // (nieuzywany na zadnej karcie EN).
    displayDateEn: 'September 01, 2026',
    image: '/images/abstract-molten-copper-fluid.webp',
    imageEn: '/images/google-reviews-abstract.png',
    heroImage: '/images/abstract-molten-copper-fluid.webp',
    heroImageEn: '/images/google-reviews-abstract.png',
    enOnly: false,
    plOnly: false
  },
  {
    date: '2026-08-11',
    displayDatePl: '11 Sierpnia 2026',
    displayDateEn: 'August 11, 2026',
    tagPl: 'SaaS SEO',
    tagEn: 'SaaS SEO',
    titlePl: '',
    titleEn: 'SEO for SaaS Startups: Product-Led Playbook 2026',
    descPl: '',
    descEn: 'A product-led SEO playbook for SaaS startups: BOFU pages first, technical foundation, programmatic scale, and what it actually costs in 2026.',
    slug: '/blog/seo-for-saas-startups-playbook',
    related: ['/blog/technical-seo-audit-checklist', '/blog/content-gap-analysis', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista'],
    readMinEn: 39,
    image: '/images/abstract-emerald-liquid-marble.webp',
    heroImage: '/images/abstract-emerald-liquid-marble.webp',
    enOnly: true,
    plOnly: false
  },
  {
    date: '2026-08-09',
    displayDatePl: '09 Sierpnia 2026',
    displayDateEn: 'August 09, 2026',
    tagPl: 'Narzędzia',
    tagEn: 'Tools',
    titlePl: 'Mailchimp vs GetResponse: którą wybrać dla Twojej firmy?',
    titleEn: 'Mailchimp vs GetResponse: Which to Choose for Your Business?',
    descPl: 'Porównanie Mailchimp i GetResponse: ceny na progach od 500 do 25 000 kontaktów, funkcje, webinary, automatyzacja i próg opłacalności.',
    descEn: 'Mailchimp or GetResponse? Compare pricing, features, webinars, and the list threshold where GetResponse becomes cheaper.',
    slug: '/blog/mailchimp-vs-getresponse',
    related: ['/blog/vwo-vs-optimizely-porownanie', '/blog/rodo-na-stronie-internetowej', '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik'],
    readMinPl: 21,
    image: '/images/mailchimp-vs-getresponse.jpg',
    heroImage: '/images/mailchimp-vs-getresponse.jpg',
    enOnly: false,
    // The English branch of this article is still the placeholder sentence, so
    // /en/blog/mailchimp-vs-getresponse crawled as a page with no text content.
    // Flag it Polish-only until a real translation exists - that keeps the empty
    // URL out of the sitemap and the English blog listing. Nothing is removed:
    // the Polish article is untouched and the route still resolves.
    plOnly: true
  },
  {
    date: '2026-08-08',
    displayDatePl: '08 Sierpnia 2026',
    displayDateEn: 'August 08, 2026',
    tagPl: 'Local SEO',
    tagEn: 'Local SEO',
    titlePl: '',
    titleEn: 'Multi-Location SEO: Scale Local Visibility in 2026',
    descPl: '',
    descEn: 'A complete guide to scaling local visibility for multiple locations using single domains, GBP optimization, and programmatic local content.',
    slug: '/blog/multi-location-seo-scale-local-visibility',
    related: ['/blog/seo-lokalne-dla-firm-w-warszawie', '/blog/jak-pozyskiwac-opinie-google-poradnik', '/blog/technical-seo-audit-checklist'],
    readMinEn: 26,
    image: '/images/multi-location-seo-header.jpg',
    heroImage: '/images/multi-location-seo-header.jpg',
    enOnly: true,
    plOnly: false
  },
  {
    date: '2026-08-07',
    displayDatePl: '07 Sierpnia 2026',
    displayDateEn: 'August 07, 2026',
    tagPl: 'Analytics & GTM',
    tagEn: 'Analytics & GTM',
    titlePl: 'Konfiguracja GA4 i GTM: zdarzenia i konwersje krok po kroku',
    titleEn: 'Google Tag Manager: GA4 Event Configuration Guide',
    descPl: 'Jak skonfigurować zdarzenia GA4 w Google Tag Manager i oznaczyć lead jako zdarzenie kluczowe. Przykład z naszego wdrożenia z 4.11.2026.',
    descEn: 'How to configure events in Google Tag Manager for GA4? A complete guide on dataLayer, triggers, and testing.',
    slug: '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik',
    related: ['/blog/audyt-ux-strony', '/blog/vwo-vs-optimizely-porownanie', '/blog/rodo-na-stronie-internetowej'],
    cta: 'analityka',
    readMinPl: 10,
    image: '/images/photo-abstract-linear-black-backgroundabstract-dark-wave-background-ai-generated_1145931-43905.avif',
    heroImage: '/images/photo-abstract-linear-black-backgroundabstract-dark-wave-background-ai-generated_1145931-43905.avif',
    enOnly: false,
    plOnly: true
  },
  {
    date: '2026-08-07',
    displayDatePl: '07 Sierpnia 2026',
    displayDateEn: 'August 07, 2026',
    tagPl: 'Attribution',
    tagEn: 'Attribution Tools',
    titlePl: '',
    titleEn: 'Best Marketing Attribution Tools for 2026: Full Buyer Guide',
    descPl: '',
    descEn: 'Discover the best marketing attribution tools and platforms. A comprehensive buyer guide for B2B, DTC, and agencies in 2026.',
    slug: '/blog/best-marketing-attribution-tools-for-2026',
    related: ['/blog/audyt-ux-strony', '/blog/vwo-vs-optimizely-porownanie', '/blog/seo-for-saas-startups-playbook'],
    readMinEn: 9,
    image: '/images/photo-abstract-linear-black-backgroundabstract-dark-wave-background-ai-generated_1145931-43905.avif',
    heroImage: '/images/photo-abstract-linear-black-backgroundabstract-dark-wave-background-ai-generated_1145931-43905.avif',
    enOnly: true
  },
  {
    date: '2026-08-04',
    displayDatePl: '04 Sierpnia 2026',
    displayDateEn: 'August 04, 2026',
    tagPl: 'Testy A/B i CRO',
    tagEn: 'A/B Testing & CRO',
    titlePl: 'VWO vs Optimizely: porównanie platform do testów A/B',
    titleEn: 'VWO vs Optimizely: A/B testing platforms compared',
    descPl: 'VWO vs Optimizely - porównanie funkcji, cen, wdrożenia i zgodności z RODO. Sprawdź, która platforma do testów A/B pasuje do Twojego zespołu.',
    descEn: 'VWO vs Optimizely - features, pricing, rollout and GDPR compared. Find out which A/B testing platform fits your team.',
    slug: '/blog/vwo-vs-optimizely-porownanie',
    related: ['/blog/audyt-ux-strony', '/blog/konfiguracja-zdarzen-gtm-ga4-poradnik', '/blog/best-marketing-attribution-tools-for-2026', '/blog/mailchimp-vs-getresponse'],
    readMinPl: 14, readMinEn: 17,
    // TODO: placeholder cover - swap for the intended graphic once its filename is provided.
    image: '/images/digital-marketing-seo-content-in-marketing.jpg',
    heroImage: '/images/digital-marketing-seo-content-in-marketing.jpg',
    // Only the Polish copy was supplied, so this post is hidden from the English listing
    // until an English translation exists (prevents Polish text surfacing under /en).
    plOnly: false
  },
  {
    date: '2026-08-03',
    displayDatePl: '03 Sierpnia 2026',
    displayDateEn: 'August 03, 2026',
    tagPl: 'Analiza SEO',
    tagEn: 'SEO Analysis',
    titlePl: 'Analiza konkurencji SEO: przewodnik z przykładem 17 agencji',
    titleEn: 'SEO Competitor Analysis: A Step-by-Step Guide',
    descPl: 'Zwiększ swoją widoczność w sieci z pomocą analizy konkurencji SEO. Dowiedz się, jak skutecznie porównać swoje wyniki z rywalami.',
    descEn: 'Boost your online visibility with SEO competitor analysis. Learn how to effectively compare your results with rivals and build a winning strategy.',
    slug: '/blog/analiza-konkurencji-seo-przewodnik',
    related: ['/blog/content-gap-analysis', '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', '/blog/technical-seo-audit-checklist'],
    cta: 'audyt',
    readMinPl: 8, readMinEn: 10,
    image: '/images/psychedelic-4k-6fzhe5y0lfd0f3l2.jpg',
    heroImage: '/images/psychedelic-4k-6fzhe5y0lfd0f3l2.jpg'
  },
  {
    date: '2026-08-01',
    displayDatePl: '01 Sierpnia 2026',
    displayDateEn: 'August 01, 2026',
    tagPl: 'Web Design',
    tagEn: 'Web Design',
    titlePl: 'Ile kosztuje strona internetowa dla firmy? Ceny 2026',
    titleEn: 'How much does a business website cost? Pricing',
    descPl: 'Prosta wizytówka kosztuje najczęściej od 1 300 do 5 000 zł netto, profesjonalna strona znacznie więcej. Sprawdź, ile kosztuje strona www dla firmy i co wpływa na cenę.',
    descEn: 'Wondering how much a business website costs? See our web design pricing and learn what affects the final cost of the project.',
    slug: '/blog/ile-kosztuje-strona-www-dla-firmy-ceny',
    related: ['/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', '/blog/core-web-vitals-a-pozycje-google', '/blog/rodo-na-stronie-internetowej'],
    cta: 'web',
    readMinPl: 15, readMinEn: 16,
    image: '/images/ile-kosztuje-strona-www-dla-firmy-ceny-bg.jpg',
    heroImage: '/images/ile-kosztuje-strona-www-dla-firmy-ceny-bg.jpg'
  },
  {
    date: '2026-07-31',
    displayDatePl: '31 Lipca 2026',
    displayDateEn: 'July 31, 2026',
    tagPl: 'Google Business',
    tagEn: 'Google Business',
    titlePl: 'Opinie Google: jak je zdobywać i jak odpowiadać (wzory)',
    titleEn: 'How to effectively get Google reviews? Guide',
    descPl: 'Jak zdobywać opinie w Google bez łamania zasad i jak odpowiadać na pozytywne i negatywne. 6 wzorów odpowiedzi i proces po usłudze.',
    descEn: 'The most effective method of getting Google reviews. Check how to build a process that generates reviews.',
    slug: '/blog/jak-pozyskiwac-opinie-google-poradnik',
    related: ['/blog/seo-lokalne-dla-firm-w-warszawie', '/blog/multi-location-seo-scale-local-visibility', '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026'],
    cta: 'lokalne',
    readMinPl: 10, readMinEn: 5,
    image: '/images/jak-pozyskiwac-opinie-google-poradnik-bg.jpg',
    heroImage: '/images/jak-pozyskiwac-opinie-google-poradnik-bg.jpg'
  },
  {
    date: '2026-07-30',
    displayDatePl: '30 Lipca 2026',
    displayDateEn: 'July 30, 2026',
    tagPl: 'Techniczne SEO',
    tagEn: 'Technical SEO',
    titlePl: 'Rel canonical: link kanoniczny i adres kanoniczny w praktyce',
    titleEn: 'SEO Canonical Tag - what is it, how it works and how to implement it in 2026',
    descPl: 'Czym jest link kanoniczny (rel=canonical), jak ustawić adres kanoniczny i jak sprawdzić, który URL wybrał Google. Przykłady z Next.js.',
    descEn: 'The canonical tag (rel=canonical) is the foundation of SEO. See how to avoid duplicate content, protect crawl budget, and implement it correctly.',
    slug: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026',
    related: ['/blog/technical-seo-audit-checklist', '/blog/core-web-vitals-a-pozycje-google', '/blog/analiza-konkurencji-seo-przewodnik'],
    cta: 'audyt',
    readMinPl: 6, readMinEn: 6,
    image: '/images/tag-kanoniczny-seo-jak-wdrozyc-w-2026-bg.jpg',
    heroImage: '/images/tag-kanoniczny-seo-jak-wdrozyc-w-2026-bg.jpg'
  },
  {
    date: '2026-07-27',
    displayDatePl: '27 Lipca 2026',
    displayDateEn: 'July 27, 2026',
    tagPl: 'Link Building B2B',
    tagEn: 'B2B Link Building',
    titlePl: 'Linkowanie B2B: strategie link buildingu i checklista',
    titleEn: 'B2B Link Building for Marketers: Strategies and Checklist',
    descPl: 'Linkowanie B2B w praktyce: metody link buildingu, które przekładają się na widoczność w Google, i checklista dla marketerów.',
    descEn: 'Effective B2B link building is based on digital PR, partnerships, and expert publications. Check how to do it.',
    slug: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista',
    related: ['/blog/analiza-konkurencji-seo-przewodnik', '/blog/content-gap-analysis'],
    cta: 'ceny',
    readMinPl: 13, readMinEn: 16,
    image: '/images/unsplash-1620207418302-439b387441b0.jpg',
    heroImage: '/images/unsplash-1620207418302-439b387441b0.jpg'
  },
  {
    date: '2026-07-24',
    displayDatePl: '24 Lipca 2026',
    displayDateEn: 'July 24, 2026',
    tagPl: 'Strategia SEO',
    tagEn: 'SEO Strategy',
    titlePl: 'Core Web Vitals a pozycje w Google: przewodnik SEO',
    titleEn: 'Why responsiveness & Core Web Vitals are key to top Google rankings',
    descPl: 'Jak Core Web Vitals (LCP, INP, CLS) wpływają na pozycje w Google: progi, pomiar i co poprawić najpierw. Praktyczny przewodnik.',
    descEn: 'Learn how Core Web Vitals (LCP, INP, CLS) affect your Google rankings: thresholds, measurement and what to fix first.',
    slug: '/blog/core-web-vitals-a-pozycje-google',
    related: ['/blog/technical-seo-audit-checklist', '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', '/blog/audyt-ux-strony'],
    cta: 'web',
    readMinPl: 3, readMinEn: 3,
    image: '/images/unsplash-1620121692029-d088224ddc74.jpg'
  },
  {
    date: '2026-07-27',
    displayDatePl: '27 Lipca 2026',
    dateEn: '2026-07-30',
    displayDateEn: 'July 30, 2026',
    tagPl: 'SEO Lokalne',
    tagEn: 'Local SEO',
    titlePl: 'SEO Lokalne dla firm w Warszawie - jak wygrać z konkurencją?',
    titleEn: 'Local SEO for businesses in Warsaw - how to beat the competition?',
    descPl: 'Praktyczny poradnik jak zdominować lokalne wyniki wyszukiwania i zdobyć klientów z Twojej okolicy w Warszawie.',
    descEn: 'A practical guide on how to dominate local search results and get clients from your area in Warsaw.',
    slug: '/blog/seo-lokalne-dla-firm-w-warszawie',
    related: ['/blog/jak-pozyskiwac-opinie-google-poradnik', '/blog/multi-location-seo-scale-local-visibility', '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026'],
    cta: 'lokalne',
    readMinPl: 5, readMinEn: 4,
    image: '/images/seo-lokalne-dla-firm-w-warszawie-bg.jpg'
  },
  {
    date: '2026-07-28',
    displayDatePl: '28 Lipca 2026',
    dateEn: '2026-07-30',
    displayDateEn: 'July 30, 2026',
    tagPl: 'Budżet SEO',
    tagEn: 'SEO Budget',
    titlePl: 'Ile kosztuje SEO w 2026? Ceny agencji i od czego zależą',
    titleEn: 'How much does SEO cost in Poland? Pricing and packages 2026',
    descPl: 'Ile kosztuje SEO w 2026 roku: od czego zależy cena, co zawiera pakiet, kiedy widać efekty i jak rozliczają się agencje.',
    descEn: 'We break down the prices of SEO in Poland. See how much SEO costs for different types of businesses.',
    slug: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026',
    related: ['/blog/wyniki-wdrozen-seo-2026', '/blog/ile-kosztuje-strona-www-dla-firmy-ceny', '/blog/seo-lokalne-dla-firm-w-warszawie'],
    cta: 'ceny',
    readMinPl: 11, readMinEn: 4,
    image: '/images/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026-bg.jpg'
  }
];

/**
 * Articles may be published in one language only - a topic like Polish market
 * pricing has no English audience, and vice versa. Set `plOnly: true` or
 * `enOnly: true` on the entry.
 *
 * Everything that lists posts must go through this helper. The rule used to be
 * copy-pasted into four components, which is how a post ends up advertised in a
 * language it was never written in.
 */
export function isPostAvailableIn(post, locale) {
  if (locale === 'de') return maWersjeDe(post.slug);
  if (locale === 'en' && post.plOnly) return false;
  if (locale === 'pl' && post.enOnly) return false;
  return true;
}

export function postsForLocale(locale) {
  return blogPosts.filter(post => isPostAvailableIn(post, locale));
}

// 14.10.2026: domyslny meta robots calego serwisu (ustawiany w
// app/[locale]/layout.js). Mieszka tutaj, bo articleRobots musi zwracac te sama
// wartosc: w Next 16 klucz robots: undefined na stronie kasuje robots z layoutu,
// wiec 11 artykulow z articleRobots stracilyby te regule.
export const DEFAULT_ROBOTS = { 'max-image-preview': 'large' };

/**
 * A single-language article still resolves at the other locale's URL - the route
 * exists, the component just renders nothing, so the page answers 200 with an
 * empty body. Keeping it out of the sitemap and the listings stops us from
 * advertising it, but Google can still reach it another way, and an empty 200 is
 * exactly the thin page the crawl flags.
 *
 * Returns a noindex directive for the locale the article was never written in,
 * and DEFAULT_ROBOTS otherwise - the same value the layout sets. Returning
 * undefined is not neutral: Next.js treats `robots: undefined` on a page as an
 * override and drops the layout's robots meta. `follow` stays on: there is
 * nothing to index, but the header and footer links are still worth crawling.
 */
export function articleRobots(slug, locale) {
  const post = blogPosts.find(p => p.slug === slug);
  if (post && !isPostAvailableIn(post, locale)) {
    return { index: false, follow: true };
  }
  return DEFAULT_ROBOTS;
}

/**
 * hreflang must only point at versions that exist. Emitting an alternate for a
 * translation that was never written sends Google to a URL that 404s or serves
 * the wrong language.
 */
export function articleLanguages(slug, plUrl, enUrl) {
  const post = blogPosts.find(p => p.slug === slug);
  const languages = {};
  if (!post || !post.enOnly) languages.pl = plUrl;
  if (!post || !post.plOnly) languages.en = enUrl;
  Object.assign(languages, hreflangDe(slug));
  // x-default = wersja polska (rynek domyslny, URL bez prefiksu);
  // angielska tylko gdy polskiej nie ma (posty enOnly).
  languages['x-default'] = languages.pl || languages.en;
  return languages;
}

/**
 * Data pierwszej publikacji wpisu w danym jezyku (18.11.2026, decyzja C9): z historii repozytorium.
 * `date` = pierwsza publikacja (klucz sortowania), `datePl` / `dateEn` tylko gdy wersja jezykowa
 * wyszla pozniej. Jedno zrodlo dla widocznej daty na stronie, JSON-LD datePublished i kart bloga
 * (displayDate*); ta sama data stoi w lib/lastmod.json w polu `pierwszy`.
 * Zwraca { iso, label } albo null dla slugu spoza listy.
 */
export function articleDates(slug, locale) {
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return null;
  const en = locale === 'en';
  return {
    iso: (en ? post.dateEn : post.datePl) || post.date,
    label: en ? post.displayDateEn : post.displayDatePl,
  };
}
