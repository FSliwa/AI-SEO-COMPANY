// Poradniki do stron darmowych narzędzi (S1-poprawki Z-03, rozszerzone na 13 narzędzi 25.11.2026). Czysty ESM.
// Tytuły = obecne tytuły artykułów (lib/blogPosts.js, lib/publikacja.js, lib/stronyEn.js); opis po kropce
// to jedno zdanie bez liczb spoza artykułu.
// href to klucz PL routingu: <Link> renderuje właściwy adres (np. /blog/technical-seo-audit-checklist ->
// /blog/audyt-techniczny-seo, i18n/routing.js:109). Gołe <a> dałoby 308, więc tylko przez komponent Poradniki.
// Pozycja bez `en` albo bez wersji EN (hrefWJezyku === null) nie pokazuje się na stronie EN; pozycja enOnly bez `pl` nie pokazuje się na PL.

const AUDYT_TECHNICZNY = { href: '/blog/technical-seo-audit-checklist', pl: ['Audyt techniczny SEO: checklista z progami i arkusz', 'progi dla każdego punktu, żeby wiedzieć, co naprawić najpierw'], en: ['Technical SEO Audit Checklist for Digital Marketers', 'thresholds for each check, so you know what to fix first'] };
const CHATGPT = { href: '/pozycjonowanie-w-ai/chatgpt', pl: ['Pozycjonowanie w ChatGPT: skąd bierze firmy, które poleca', '7 kroków, żeby model wymieniał Twoją'], en: ['ChatGPT optimization: where ChatGPT finds the companies it recommends', '7 steps to get named'] };
const SEO_VS_GEO = { href: '/porownania/seo-vs-geo', pl: ['SEO vs GEO: czym się różnią i od czego zacząć', 'porównanie w 8 kryteriach'], en: ['SEO vs GEO: how they differ and where to start', 'a comparison across 8 criteria'] };
const CWV = { href: '/blog/core-web-vitals-a-pozycje-google', pl: ['Core Web Vitals a pozycje w Google', 'jak LCP, INP i CLS wpływają na ranking i jak je poprawić'], en: ['Why responsiveness & Core Web Vitals are key to top Google rankings', 'how LCP, INP and CLS affect rankings'] };
const CANONICAL = { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', pl: ['Rel canonical: link kanoniczny i adres kanoniczny w praktyce', 'jak naprawić duplikaty i sprawdzić wybór Google'], en: ['SEO Canonical Tag - what is it, how it works and how to implement it in 2026', 'how to prevent duplicate URLs and verify Google canonicals'] };
const KONKURENCJA = { href: '/blog/analiza-konkurencji-seo-przewodnik', pl: ['Analiza konkurencji SEO: przewodnik z przykładem 17 agencji', 'jak sprawdzić, kto zabiera Twoje kliknięcia'], en: ['SEO Competitor Analysis: A Step-by-Step Guide', 'how to compare rivals across Google, speed and backlinks'] };
const OPINIE = { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', pl: ['Opinie Google: jak je zdobywać i jak odpowiadać (wzory)', 'opinie to jedno ze źródeł, z których korzystają modele i Mapy'], en: ['How to effectively get Google reviews? Guide', 'how to build a steady review workflow and reply templates'] };
const LINKOWANIE_B2B = { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', pl: ['Linkowanie B2B: strategie link buildingu i checklista', 'jak zdobywać redakcyjne wzmianki i linki'], en: ['B2B Link Building for Marketers: Strategies and Checklist', 'how to earn editorial mentions and authority links'] };
const UX_AUDYT = { href: '/blog/audyt-ux-strony', pl: ['Audyt UX strony pod konwersję: przewodnik', 'co poprawić na stronie, zanim zmienisz jej wygląd'], en: ['Website UX Audit for Conversion: A Practical Guide', 'funnel, form and usability checks before a redesign'] };
const WZOR_RAPORTU = { href: '/narzedzia/raport-seo', pl: ['Raport SEO: co powinien zawierać? Wzór miesięczny w PDF', 'jak łączyć dane z GSC, GA4 i AI w jednym podsumowaniu'], en: ['SEO report template: what should an SEO report include?', 'how to combine GSC, GA4 and AI visibility metrics in one report'] };
const SAAS_PLAYBOOK_EN = { href: '/blog/seo-for-saas-startups-playbook', en: ['SEO for SaaS Startups: Product-Led Playbook 2026', 'BOFU pages, technical architecture and programmatic scale'] };
const ATTRIBUTION_EN = { href: '/blog/best-marketing-attribution-tools-for-2026', en: ['Best Marketing Attribution Tools for 2026: Full Buyer Guide', 'how to connect organic search and AI traffic to revenue'] };
const MULTI_LOCATION_EN = { href: '/blog/multi-location-seo-scale-local-visibility', en: ['Multi-Location SEO: Scale Local Visibility in 2026', 'domain structure, GBP management and local landing pages'] };
const BING_PL = { href: '/blog/bing-webmaster-tools-indexnow-chatgpt', pl: ['Bing Webmaster Tools i IndexNow: konfiguracja krok po kroku', 'jak zgłosić stronę do Binga i przyspieszyć cytowania w ChatGPT'] };

export const PORADNIKI = {
  '/narzedzia/audyt-seo': [
    AUDYT_TECHNICZNY,
    CWV,
    CANONICAL,
    WZOR_RAPORTU,
  ],
  '/sprawdz-widocznosc-w-ai': [
    CHATGPT,
    SEO_VS_GEO,
    OPINIE,
    SAAS_PLAYBOOK_EN,
  ],
  '/narzedzia/kalkulator-strat-seo': [
    { href: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', pl: ['Ile kosztuje SEO w 2026? Ceny agencji i od czego zależą', 'porównaj stratę z kalkulatora z ceną pakietu'], en: ['How much does SEO cost in Poland? Pricing and packages 2026', 'compare the calculated loss with a package price'] },
    { href: '/blog/wyniki-wdrozen-seo-2026', pl: ['Case study SEO: wyniki pięciu wdrożeń w 2026', 'kliknięcia i pozycje z Google Search Console'] },
    KONKURENCJA,
    ATTRIBUTION_EN,
    WZOR_RAPORTU,
  ],
  '/narzedzia/makieta-redesignu': [
    { href: '/blog/ile-kosztuje-strona-www-dla-firmy-ceny', pl: ['Ile kosztuje strona internetowa dla firmy? Ceny 2026', 'od czego zależy cena wdrożenia makiety'], en: ['How much does a business website cost? Pricing', 'what drives the price of building the mockup'] },
    UX_AUDYT,
    { href: '/narzedzia/brief-strony-internetowej', pl: ['Brief strony internetowej: wzór z częścią SEO', 'szybsza wycena nowej strony'], en: ['Website brief template with an SEO section', 'a faster quote for a new website'] },
  ],
  '/narzedzia/generator-llms-txt': [CHATGPT, SEO_VS_GEO, AUDYT_TECHNICZNY, SAAS_PLAYBOOK_EN],
  '/narzedzia/tester-robotow-ai-robots-txt': [CHATGPT, AUDYT_TECHNICZNY, SEO_VS_GEO, BING_PL],
  '/narzedzia/test-core-web-vitals-porownanie': [CWV, UX_AUDYT, KONKURENCJA, SAAS_PLAYBOOK_EN],
  '/narzedzia/sprawdz-cytowalnosc-strony-ai': [CHATGPT, SEO_VS_GEO, KONKURENCJA, ATTRIBUTION_EN],
  '/narzedzia/sprawdz-przekierowania-hreflang': [CANONICAL, AUDYT_TECHNICZNY, MULTI_LOCATION_EN],
  '/narzedzia/generator-indexnow-test-bing-chatgpt': [BING_PL, CHATGPT, CANONICAL, AUDYT_TECHNICZNY],
  '/narzedzia/walidator-grafu-encji-json-ld': [LINKOWANIE_B2B, CHATGPT, AUDYT_TECHNICZNY, ATTRIBUTION_EN],
  '/narzedzia/audyt-lokalnego-seo-wizytowki': [OPINIE, MULTI_LOCATION_EN, { href: '/blog/seo-lokalne-dla-firm-w-warszawie', pl: ['SEO lokalne dla firm w Warszawie: wizytówka i frazy dzielnicowe', 'jak połączyć wizytówkę Google z podstronami dzielnic'], en: ['Local SEO for companies: Google Business Profile and local keywords', 'how to align your GBP profile with local landing pages'] }],
};
