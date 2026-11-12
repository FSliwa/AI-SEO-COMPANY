// Poradniki do stron darmowych narzędzi (S1-poprawki Z-03, agent wspolne, 12.11.2026). Czysty ESM.
// Tytuły = obecne tytuły artykułów (lib/blogPosts.js, lib/publikacja.js, lib/stronyEn.js); opis po kropce
// to jedno zdanie bez liczb spoza artykułu („7 kroków” i „8 kryteriów” z meta tych stron).
// href to klucz PL routingu: <Link> renderuje właściwy adres (np. /blog/technical-seo-audit-checklist ->
// /blog/audyt-techniczny-seo, i18n/routing.js:109). Gołe <a> dałoby 308, więc tylko przez komponent Poradniki.
// Pozycja bez `en` albo bez wersji EN (hrefWJezyku === null) nie pokazuje się na stronie EN.

const AUDYT_TECHNICZNY = { href: '/blog/technical-seo-audit-checklist', pl: ['Audyt techniczny SEO: checklista z progami i arkusz', 'progi dla każdego punktu, żeby wiedzieć, co naprawić najpierw'], en: ['Technical SEO Audit Checklist for Digital Marketers', 'thresholds for each check, so you know what to fix first'] };
const CHATGPT = { href: '/pozycjonowanie-w-ai/chatgpt', pl: ['Pozycjonowanie w ChatGPT: skąd bierze firmy, które poleca', '7 kroków, żeby model wymieniał Twoją'], en: ['ChatGPT optimization: where ChatGPT finds the companies it recommends', '7 steps to get named'] };
const SEO_VS_GEO = { href: '/porownania/seo-vs-geo', pl: ['SEO vs GEO: czym się różnią i od czego zacząć', 'porównanie w 8 kryteriach'], en: ['SEO vs GEO: how they differ and where to start', 'a comparison across 8 criteria'] };

export const PORADNIKI = {
  '/narzedzia/audyt-seo': [
    AUDYT_TECHNICZNY,
    { href: '/blog/core-web-vitals-a-pozycje-google', pl: ['Core Web Vitals a pozycje w Google', 'jak LCP, INP i CLS wpływają na ranking i jak je poprawić'], en: ['Why responsiveness & Core Web Vitals are key to top Google rankings', 'how LCP, INP and CLS affect rankings'] },
    { href: '/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026', pl: ['Rel canonical: link kanoniczny i adres kanoniczny w praktyce', 'jak naprawić duplikaty, które pokazuje audyt'], en: ['SEO Canonical Tag: what it is and how to implement it in 2026', 'how to fix the duplicates the audit finds'] },
  ],
  '/sprawdz-widocznosc-w-ai': [
    CHATGPT,
    SEO_VS_GEO,
    { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', pl: ['Opinie Google: jak je zdobywać i jak odpowiadać (wzory)', 'opinie to jedno ze źródeł, z których korzystają modele'], en: ['How to effectively get Google reviews? Guide', 'how to ask for reviews and reply to them'] },
  ],
  '/narzedzia/kalkulator-strat-seo': [
    { href: '/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026', pl: ['Ile kosztuje SEO w 2026? Ceny agencji i od czego zależą', 'porównaj stratę z kalkulatora z ceną pakietu'], en: ['How much does SEO cost in Poland? Pricing and packages 2026', 'compare the calculated loss with a package price'] },
    { href: '/blog/wyniki-wdrozen-seo-2026', pl: ['Case study SEO: wyniki pięciu wdrożeń w 2026', 'kliknięcia i pozycje z Google Search Console'] },
    { href: '/blog/analiza-konkurencji-seo-przewodnik', pl: ['Analiza konkurencji SEO: przewodnik z przykładem', 'jak sprawdzić, kto zabiera Twoje kliknięcia'], en: ['SEO Competitor Analysis: A Step-by-Step Guide', 'find out who takes your clicks'] },
  ],
  '/narzedzia/makieta-redesignu': [
    { href: '/blog/ile-kosztuje-strona-www-dla-firmy-ceny', pl: ['Ile kosztuje strona internetowa dla firmy? Ceny 2026', 'od czego zależy cena wdrożenia makiety'], en: ['How much does a business website cost? Pricing', 'what drives the price of building the mockup'] },
    { href: '/blog/audyt-ux-strony', pl: ['Audyt UX strony pod konwersję: przewodnik', 'co poprawić, zanim zmienisz wygląd'], en: ['Website UX Audit for Conversion: A Practical Guide', 'what to fix before you change the design'] },
    { href: '/narzedzia/brief-strony-internetowej', pl: ['Brief strony internetowej: wzór z częścią SEO', 'szybsza wycena nowej strony'], en: ['Website brief template with an SEO section', 'a faster quote for a new website'] },
  ],
  '/narzedzia/generator-llms-txt': [CHATGPT, SEO_VS_GEO, AUDYT_TECHNICZNY],
  // Autorytet domeny: Z-03 nie podaje listy (strona nieopublikowana); przekaż własne pozycje propem pozycje.
};
