// Daty lastmod sitemapy (wydzielone z lib/sitemapEntries.js 5.11.2026, fundament PLAN-v2).
// Czysty ESM bez importow: czyta go takze components/Byline.jsx (widoczna data aktualizacji
// = lastmod = dateModified), wiec import nie wciaga lib/blogPosts.js do bundla klienta.
// 5.11.2026: usuniete wpisy /blog/biblioteka i /en/blog/library (SA-12: strona scalona z /blog).
//
// 14.10.2026: lastmod = dzien (UTC) wdrozenia produkcyjnego z ostatnia istotna
// zmiana danej strony (GitHub Deployments, srodowisko Production). Wczesniej
// wszystkie strony statyczne mialy 2026-08-24, a artykuly date publikacji,
// choc tresc zmieniala sie 01.09-26.09; piec artykulow mialo lastmod sprzed
// powstania strony. Google uzywa lastmod tylko wtedy, gdy jest konsekwentnie
// i sprawdzalnie zgodny z prawda - dotyczy to calej sitemapy, nie wpisu.
//
// OBOWIAZEK: kazde wdrozenie, ktore zmienia tresc, linki, obrazy, dane
// strukturalne, title, description, canonical lub hreflang konkretnej strony,
// musi zaktualizowac jej wpis (data wdrozenia, nie commita). Nie licza sie:
// CSS, aria-label, atrybuty sledzenia oraz elementy wspolne calego serwisu
// (Header, Footer, baner, Organization/WebSite w layout, blok Contact).
// Klucz = pelny URL dokladnie jak w push() ('/' na koncu tylko dla strony
// glownej PL). Pol date w lib/blogPosts.js nie ruszac - zasilaja
// datePublished/dateModified i widoczna date.

export const LASTMOD = {
  // 5.11.2026, wydanie PLAN-v2 (Integracja): data 2026-11-06 jest ROBOCZA - poprawic na dzien
  // wdrozenia (wszystkie wpisy z ta data naraz, razem z published/updated w lib/porownania.js).
  // Obejmuje: dopiski PL na stronach chronionych i strone glowna (C2, AU1, PS1, LO1, HOME),
  // href portfolio i kafel Z1 na EN (BL6, Z1), puste alty dekoracyjne (ALT), oferty w JSON-LD
  // cennika, audytu i projektowania (SCH1), hub GEO PL i EN (A1, A1-EN), sprawdzarke (A3b, LW1),
  // /panel-klienta, /zmiana-agencji-seo, /o-nas, regulamin i cookies PL/EN (PK1, ZA1, EEAT1,
  // okruszki, ANK), /blog i /en/blog (title, usuniety przycisk biblioteki), wszystkie artykuly
  // (BlogCTA per klaster BC1 - precedens 2f04f61 - oraz odswiezenia tresci, title i meta),
  // nowe strony partii 1: hub porownan, P1, P2 (data = published/updated w lib/porownania.js).
  // Bez nowej daty: /en, /en/client-portal, /en/blog/canonical-tag-seo-guide-2026 i
  // /en/blog/local-seo-for-companies (wersje EN bez BlogCTA - HTML bez zmian wzgledem produkcji,
  // porownanie wszystkich 62 adresow z sitemapy 5.11.2026), strony nieopublikowane (wpis dopiero
  // w dniu ich publikacji) i zmiany wylacznie w elementach wspolnych (Header, Footer, Contact, layout).
  // Nowe wpisy tego wydania (pozostale adresy z lista wyzej maja date zmieniona w miejscu).
  'https://www.ai-seo-company.pl/porownania': '2026-11-06',
  'https://www.ai-seo-company.pl/porownania/pozycjonowanie-za-efekt-czy-abonament': '2026-11-06',
  'https://www.ai-seo-company.pl/porownania/seo-vs-geo': '2026-11-06',

  // 4.11.2026 (aktualizacja analizy konkurencji): liczby w realizacjach na stronie glownej
  // zgodne z danymi GSC (Staniax, ASE-BOT jako projekt wlasny), plakietka pakietu Booster
  // (Pricing na stronie glownej, cenniku, pozycjonowaniu, SEO lokalnym, projektowaniu),
  // nowe funkcje i porownanie na /panel-klienta, projekty wlasne we wpisie z wynikami
  // (te adresy maja nizej date 2026-11-04). Data = dzien wdrozenia; jesli sie przesunie, poprawic.
  // Etap 3 planu przewagi: poradnik /zmiana-agencji-seo (tylko PL) i link do niego w sekcji
  // "Uczciwa umowa" na cenniku i /panel-klienta (tylko wersja PL). Data = dzien wdrozenia;
  // jesli wdrozenie przesunie sie, poprawic.
  'https://www.ai-seo-company.pl/zmiana-agencji-seo': '2026-11-06',
  // Etap 2 planu przewagi: oferta GEO /pozycjonowanie-w-ai, sprawdzarka AI, widocznosc w AI
  // w pakietach (Pricing na stronie glownej, cenniku, pozycjonowaniu, SEO lokalnym, projektowaniu),
  // pytanie o cene GEO w FAQ cennika, nowa opcja w formularzu kontaktu. Data = dzien wdrozenia.
  // Etap 0 planu z filmu (ponizej): dane strukturalne Service+Offer na stronie GEO (PL i EN),
  // nowa tresc, FAQ, WebApplication i title sprawdzarki. Data = dzien wdrozenia; jesli sie
  // przesunie, poprawic (dotyczy tez wpisu mailchimp-vs-getresponse nizej).
  'https://www.ai-seo-company.pl/pozycjonowanie-w-ai': '2026-11-06',
  'https://www.ai-seo-company.pl/en/ai-search-optimization': '2026-11-06',
  'https://www.ai-seo-company.pl/sprawdz-widocznosc-w-ai': '2026-11-06',
  // 29.10.2026 (etap 1 planu przewagi): panel klienta w pakietach (Pricing na stronie
  // glownej, cenniku, pozycjonowaniu, SEO lokalnym i projektowaniu), nowa strona
  // /panel-klienta, sekcje "Uczciwa umowa" i "Cel TOP 3" na cenniku, dane GSC zamiast
  // statystyk bez zrodla na stronie glownej, jedna wersja celu TOP 3 w FAQ, ceny audytu
  // i strony. Data = dzien wdrozenia; jesli wdrozenie przesunie sie, poprawic.
  'https://www.ai-seo-company.pl/panel-klienta': '2026-11-06',
  'https://www.ai-seo-company.pl/en/client-portal': '2026-11-04',
  'https://www.ai-seo-company.pl/audyt-seo': '2026-11-06',
  'https://www.ai-seo-company.pl/en/seo-audit': '2026-11-06',
  'https://www.ai-seo-company.pl/seo-lokalne-warszawa': '2026-11-06',
  'https://www.ai-seo-company.pl/en/local-seo-warsaw': '2026-11-06',
  'https://www.ai-seo-company.pl/cennik-pozycjonowania': '2026-11-06',
  'https://www.ai-seo-company.pl/en/seo-pricing': '2026-11-06',
  'https://www.ai-seo-company.pl/en': '2026-11-04',

  // 23.10.2026 (to wdrozenie): title i description strony glownej PL
  // przywrocone do wersji sprzed 2f04f61 (frazy kluczowe wlasciciela).
  'https://www.ai-seo-company.pl/': '2026-11-06',

  // 22.10.2026 (f727335): H2 i przycisk hero na landingach SEO
  // i web designu (PL i EN). Pozostale zmiany wydania to naglowek, stopka,
  // baner zgody (elementy wspolne - nie licza sie) oraz twarde spacje w "24 h"
  // na /cennik-pozycjonowania i /audyt-seo (sama typografia, bez zmiany tresci).
  'https://www.ai-seo-company.pl/pozycjonowanie-stron-internetowych': '2026-11-06',
  'https://www.ai-seo-company.pl/en/seo-services': '2026-11-06',
  'https://www.ai-seo-company.pl/projektowanie-stron-internetowych': '2026-11-06',
  'https://www.ai-seo-company.pl/en/web-design': '2026-11-06',

  // 20.10.2026 (2f04f61): title i description strony glownej PL; blok
  // "Powiazane artykuly" z listy `related` w lib/blogPosts.js zmienia linki
  // kazdego artykulu z BlogCTA; nowe linki do /seo-lokalne-warszawa i
  // /audyt-seo w dwoch artykulach; link EN do polskiego poradnika GA4 zamiast
  // jego pustej kopii /en. Lista = adresy, ktorych HTML rozni sie od
  // produkcji (porownanie wszystkich 55 adresow z sitemapy). Pokrywa tez
  // zalegle pozycje z 18.10 (JSON-LD mailchimp, ceny EUR w how-much-...-pricing).
  'https://www.ai-seo-company.pl/blog/wyniki-wdrozen-seo-2026': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/storytelling-marki': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/brand-storytelling-patterns': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/audyt-techniczny-seo': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/technical-seo-audit-checklist': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/rodo-na-stronie-internetowej': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/analiza-luk-contentowych': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/content-gap-analysis': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/audyt-ux-strony': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/ux-audit-guide': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/seo-for-saas-startups-playbook': '2026-11-06',
  // Etap 0 planu z filmu: usuniety martwy link toolfit.io (404) w tresci i w zrodlach.
  'https://www.ai-seo-company.pl/blog/mailchimp-vs-getresponse': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/multi-location-seo-scale-local-visibility': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/konfiguracja-zdarzen-gtm-ga4-poradnik': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/best-marketing-attribution-tools-for-2026': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/vwo-vs-optimizely-porownanie': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/vwo-vs-optimizely-porownanie': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/analiza-konkurencji-seo-przewodnik': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/seo-competitor-analysis-step-by-step-guide': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/ile-kosztuje-strona-www-dla-firmy-ceny': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/how-much-does-a-business-website-cost-pricing': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/jak-pozyskiwac-opinie-google-poradnik': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/how-to-get-google-reviews': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/tag-kanoniczny-seo-jak-wdrozyc-w-2026': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/link-building-b2b-dla-marketerow-strategie-i-checklista': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/b2b-link-building-strategies-checklist': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/core-web-vitals-a-pozycje-google': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/core-web-vitals-google-rankings': '2026-11-06',
  'https://www.ai-seo-company.pl/blog/seo-lokalne-dla-firm-w-warszawie': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/local-seo-for-companies': '2026-10-20',
  'https://www.ai-seo-company.pl/blog/ile-kosztuje-seo-w-polsce-cennik-i-pakiety-2026': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/how-much-does-seo-cost-pricing-packages-2026': '2026-11-06',

  // e26f8bc (wdrozenie 18.10): nowa zapowiedz bloga i portfolio na stronie
  // glownej EN - lastmod nie zostal wtedy zaktualizowany.

  // e3c3d49 (26.09): podstrony EN (OUR WORK, EUR, Strategy & SEO) i
  // mainEntityOfPage/BreadcrumbList artykulu canonical-tag EN (pozostale
  // artykuly EN z tego wdrozenia maja pozniejsza zmiane - wyzej).
  'https://www.ai-seo-company.pl/en/about-us': '2026-11-06',
  'https://www.ai-seo-company.pl/en/blog/canonical-tag-seo-guide-2026': '2026-09-26',

  // 5277fe6, b6437fe, 10c3673 (24.09): cennik, hero i FAQ landingow
  // (artykuly, '/' i '/en' maja pozniejsza zmiane - wyzej).

  // 247bf6f (wdrozenie 22.09): akapit o gclid i aisc_attr w polityce cookies.
  'https://www.ai-seo-company.pl/cookies': '2026-11-06',
  'https://www.ai-seo-company.pl/en/cookies': '2026-11-06',

  // f926b0d z 38861a8 (02.09): meta description EN bloga.
  'https://www.ai-seo-company.pl/en/blog': '2026-11-06',

  // 4a12a78 (01.09): AboutAuthor, listy bloga.
  'https://www.ai-seo-company.pl/o-nas': '2026-11-06',
  'https://www.ai-seo-company.pl/blog': '2026-11-06',

  // a844ac6 (25.08): x-default regulaminu.
  'https://www.ai-seo-company.pl/regulamin': '2026-11-06',
  'https://www.ai-seo-company.pl/en/terms': '2026-11-06',
};
