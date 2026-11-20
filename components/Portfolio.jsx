'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from './ScrollReveal';
import Realizacje from './Realizacje';
import { SERIE_GSC, METRYKI_GSC, GSC_WYGENEROWANO } from '@/lib/realizacjeGsc';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';

// Film z realizacji ASE-BOT w naglowku sekcji (ladowany leniwie, opis przy wideoSrc nizej).
const WIDEO_PORTFOLIO = '/projects/ase-bot-demo.mp4';

const realizedWebsites = [
  {
    id: 1,
    brandName: 'MADAME THAI',
    brandLogo: (
      <span style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '1.2rem', color: 'var(--w-tusz)', whiteSpace: 'nowrap' }}>
        MADAME THAI
      </span>
    ),
    url: 'https://mada-me-thai-brown.vercel.app/',
    category: 'web',
    metric: 'START & SKALOWANIE',
    metricSubtitle: 'Zbudowanie i rozwinięcie sprzedaży w nowo otwartej lokalizacji restauracji.',
    gradient: 'linear-gradient(135deg, #818CF8, #38BDF8, #C084FC)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.35) 40%, rgba(255, 255, 255, 1) 75%)',
    layout: 'center',
    rightVisual: 'single-large',
    largeImage: '/projects/madame-thai-restaurant-website.webp',
    imgAlt: 'Strona internetowa restauracji Madame Thai - projekt agencji SEO i marketingowej z Warszawy',
    imgAltEn: 'Madame Thai restaurant website - the homepage we designed and built for their Warsaw location',
    imgTitle: 'Projekt strony dla restauracji Madame Thai',
    imgTitleEn: 'Madame Thai restaurant - website project',
    largeImageMobile: '/images/madame-thai-mobile.webp',
    details: `Część I - Nowa strona internetowa: Fundament, na którym pracuje cały marketing.
- Indywidualny projekt graficzny (UX/UI) dopasowany do identyfikacji wizualnej: Buduje zaufanie od pierwszych sekund i w przemyślany sposób prowadzi klienta do telefonu lub rezerwacji.
- Responsywna wersja strony (RWD): Poprawne działanie na telefonach i tabletach - eliminacja utraconych zapytań od klientów mobilnych.
- Integracja narzędzi: Formularz kontaktowy, Google Analytics, linki social media, integracja z Hotres.
- Stała opieka techniczna: Certyfikat bezpieczeństwa SSL, bieżące aktualizacje i brak przestojów w cenie.`
  },
  {
    id: 2,
    brandName: 'STANIAX',
    brandLogo: (
      <span style={{ fontFamily: "var(--font-geist), system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.4rem', color: 'var(--w-tusz)', whiteSpace: 'nowrap' }}>
        STANIAX
      </span>
    ),
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metric: '152 kliknięcia',
    metricSubtitle: '152 clicks and 6.34k impressions in 92 days, from zero visibility.',
    gradient: 'linear-gradient(135deg, #818CF8, #60A5FA, #34D399)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(56, 189, 248, 0.45) 0%, rgba(52, 211, 153, 0.35) 40%, rgba(255, 255, 255, 1) 75%)',
    layout: 'right-side',
    rightVisual: 'desktop',
    desktopCard: {
      tag: 'B2B INDUSTRY & SEO',
      title: 'METALIZACJA PRÓŻNIOWA & LAKIEROWANIE UV',
      subtitle: 'Skalowanie biznesu B2B na rynki zagraniczne (Niemcy, USA) dzięki nowej architekturze informacji i SEO.',
      image: '/projects/staniax-b2b-industrial-website.webp',
      btnText: 'View Case Study'
    },
    imgAlt: 'Strona B2B dla Staniax - pozycjonowanie stron i optymalizacja SEO w branży przemysłowej',
    imgAltEn: 'Staniax B2B industrial website - the product pages we rebuilt for their German and US markets',
    imgTitle: 'Pozycjonowanie stron dla Staniax - wyniki agencji marketingowej',
    imgTitleEn: 'Staniax - B2B website rebuild and search visibility results',
    details: `Case Study 1 - Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 152 kliknięcia i 6,34 tys. wyświetleń w 92 dni (22.05-21.08.2026), w tym ok. 1,1 tys. wyświetleń w pierwszym miesiącu (Google Search Console).
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych - przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    brandName: 'ASE-BOT',
    brandLogo: (
      <span style={{ fontFamily: "var(--font-geist), sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1.3rem', color: 'var(--w-tusz)', whiteSpace: 'nowrap' }}>
        ASE-BOT
      </span>
    ),
    url: 'https://ase-bot.live/',
    category: 'seo',
    metric: '7,71 tys. wyświetleń',
    metricSubtitle: 'Own project: 7.71k Google impressions in 92 days',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A855F7)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.35) 40%, rgba(255, 255, 255, 1) 75%)',
    layout: 'center-reverse',
    rightVisual: 'desktop',
    largeImage: '/projects/aisas-fintech-platform.webp',
    desktopCard: {
      tag: 'FINTECH & GLOBAL SEO',
      title: 'AI FUTURES TRADING PLATFORM',
      subtitle: 'Own project: 7.71k Google impressions in 92 days in a competitive US niche.',
      image: '/projects/aisas-fintech-platform.webp',
      btnText: 'View Case Study'
    },
    imgAlt: 'Platforma fintech z AI - pozycjonowanie stron na rynku zagranicznym',
    imgAltEn: 'AISAS fintech platform - the dashboard interface we designed for the US market launch',
    imgTitle: 'Pozycjonowanie stron dla platformy fintech - wyniki',
    imgTitleEn: 'AISAS fintech platform - design and organic growth results',
    details: `Projekt własny - konkurencyjny rynek zagraniczny (ase-bot.live):
- 7,71 tys. wyświetleń w 92 dni (22.05-21.08.2026) od startu domeny bez historii; po szczycie w lipcu tygodniowe wyświetlenia spadły, a kliknięć jest niewiele (28 w całym okresie; Google Search Console).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 - krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

/* Dziesiec kafelkow: zrzuty pierwszego ekranu stron klientow i wlasnej
   strony agencji (szerokosc 1200 px, wysokosci 520-970 px zaleznie od
   zrzutu). Dane z Search Console sa wyzej jako wykresy kart „Wybrane
   realizacje”, dlatego paneli GSC (kiedys 5 kafli) w scianie juz nie ma;
   pliki public/projects/gsc/*.webp zostaja jako wejscie skryptu
   scripts/wykresy-gsc.py. Zrzuty 19.11.2026 (dziesiec kafli; kafel Babushkina Academy dolozony 19.11.2026 po zgodzie klienta): 1440x900 CSS px, DPR 2, krop
   i skalowanie do 1200 px (Figma; kafel Babushkina: PIL, ta sama skala), WebP ok. 70-90 KB. Nazwa pliku to klucz
   kafla w stosyDlaKolumn - przy kazdej zmianie pliku zmien tez klucz tam. */
const MOSAIC = [
  { src: '/projects/mosaic/elkat-a-v2.webp', w: 1200, h: 970, domena: 'elkatelektro.com', metaPl: 'KATALOG B2B', metaEn: 'B2B CATALOGUE',
    alt: 'Sekcja hero katalogu komponentów elektrycznych Elkat Power', altEn: 'Hero section of the Elkat Power electrical components catalogue' },
  { src: '/projects/mosaic/mad-a-v2.webp', w: 1200, h: 840, domena: 'madamethai.pl', gsc: 'madamethai',
    alt: 'Sekcja hero strony głównej restauracji Madame Thai', altEn: 'Hero section of the Madame Thai restaurant homepage' },
  { src: '/projects/mosaic/own-hero-pl4.webp', srcEn: '/projects/mosaic/own-hero-en4.webp', w: 1200, h: 752, domena: 'ai-seo-company.pl', metaPl: 'ARCHITEKTURA SEO', metaEn: 'SEO ARCHITECTURE',
    alt: 'Sekcja hero strony AI SEO COMPANY - napis SEO w scenie 3D', altEn: 'Hero section of the AI SEO COMPANY website - 3D SEO scene' },
  { src: '/projects/mosaic/ase-a-v4.webp', w: 1200, h: 640, domena: 'ase-bot.live', gsc: 'ase-bot',
    alt: 'Pełna sekcja hero platformy AISAS (ASE-BOT) - AI trading i analiza rynków, angielski nagłówek o analizie rynków kontraktów terminowych i ilustracja satelity',
    altEn: 'Hero section of the AISAS (ASE-BOT) trading platform homepage - “Advanced AI trading & quant market analysis for futures markets” headline with a satellite illustration' },
  { src: '/projects/mosaic/tql-a-v2.webp', srcEn: '/projects/mosaic/tql-a-en-v2.webp', w: 1200, h: 840, domena: 'tql.pl', gsc: 'tql',
    alt: 'Sekcja hero strony głównej TQL - wdrożenia norm ISO, nagłówek o wdrażaniu systemów ISO i przygotowaniu do certyfikacji oraz liczby klientów',
    altEn: 'Hero section of the TQL ISO implementation homepage - ISO management system implementation and certification headline with client figures' },
  { src: '/projects/mosaic/sta-a-v4.webp', srcEn: '/projects/mosaic/sta-a-en3.webp', w: 1200, h: 800, domena: 'staniax.pl', gsc: 'staniax',
    alt: 'Sekcja „Kim jesteśmy" strony Staniax - metalizacja próżniowa, 25 lat doświadczenia', altEn: 'About section of the Staniax vacuum metallization website' },
  { src: '/projects/mosaic/own-blog-pl8.webp', srcEn: '/projects/mosaic/own-blog-en7.webp', w: 1200, h: 840, domena: 'ai-seo-company.pl/blog', metaPl: 'BAZA WIEDZY', metaEn: 'KNOWLEDGE HUB',
    alt: 'Blog AI SEO COMPANY - artykuły o SEO i web designie, lista najnowszych artykułów', altEn: 'AI SEO COMPANY blog - articles on SEO and web design, list of the latest articles' },
  { src: '/projects/mosaic/fix-a-v2.webp', w: 1200, h: 520, domena: 'stefbud.com', gsc: 'stefbud',
    alt: 'Sekcja hero strony producenta świetlików dachowych Stef-Bud', altEn: 'Hero section of the Stef-Bud skylight manufacturer website' },
  { src: '/projects/mosaic/frazy-a.webp', w: 1200, h: 783, domena: 'Frazy Studio', metaPl: 'E-COMMERCE UX', metaEn: 'E-COMMERCE UX',
    alt: 'Podstrona Frazy Studio - biała bluza oversize z nadrukiem samuraja w masce Noh, na tle rzeźbionej zieleni',
    altEn: 'Frazy Studio page - an off-white oversized hoodie with a samurai Noh mask print against sculpted greenery' },
  { src: '/projects/mosaic/andrianna-a.webp', w: 1200, h: 750, domena: 'Babushkina Academy', metaPl: 'PROJEKT WWW', metaEn: 'WEB DESIGN',
    alt: 'Sekcja hero strony Babushkina Academy - makijaż permanentny i szkolenia PMU w Warszawie, nagłówek „Beauty with precision” i portret kobiety',
    altEn: 'Hero section of the Babushkina Academy website - permanent makeup and PMU training in Warsaw, “Beauty with precision” headline and a portrait of a woman' }
];

/* Uklady stosow dla 2, 3, 4 i 5 kolumn. Stosy sa wyrownane do DOLU
   (align-items: end), wiec rozne wysokosci stosow daja poszarpana gorna
   krawedz, a kontener ja przycina (jak u Ghosta). Klucz = nazwa pliku bez
   rozszerzenia (klucz kafla z wariantem srcEn to nazwa pliku wersji PL).

   Uklad liczony 19.11.2026 przeszukaniem wszystkich podzialow 10 kafli
   (wysokosc stosu = suma h/w kafli + przerwy ok. 0,06 szerokosci kolumny),
   bez stosu z jednym kaflem, kolejnosc kolumn naprzemienna (nizszy/wyzszy):
   5 kolumn: 2 / 2 / 2 / 2 / 2 kafle, 1,30 / 1,43 / 1,29 / 1,41 / 1,31 (rozrzut 9%)
   4 kolumny: 2 / 3 / 2 / 3 kafle, 1,57 / 1,91 / 1,46 / 1,87 (rozrzut 23%:
              minimum dla 10 kafli w 4 kolumnach bez samotnego kafla)
   3 kolumny: 3 / 4 / 3 kafle, 2,21 / 2,47 / 2,19 (rozrzut 12%)
   2 kolumny: 5 / 5 kafli, 3,46 / 3,46 (rozrzut 0%)
   Pojedynczy kafel nie tworzy stosu w zadnym wariancie.

   UWAGA - pulapka, ktora juz raz zadziala: uklady NIE czytaja tablicy MOSAIC
   tylko te sztywne listy kluczy. Kafel dopisany do MOSAIC, a nie do listy,
   znikalby z danego wariantu (przy 5 kolumnach: na ekranach >= 1280 px).
   Dlatego kafel, ktorego nie ma na zadnej liscie, trafia na koniec
   najkrotszego stosu (stosyDlaKolumn nic juz nie gubi), a klucz z listy,
   ktorego nie ma w MOSAIC, jest pomijany przez filter(Boolean). Mimo to
   trzymaj listy zgodne z MOSAIC: nowy kafel dopisz do wszystkich czterech. */
const UKLADY_STOSOW = {
  5: [
    ['elkat-a-v2', 'fix-a-v2'],
    ['tql-a-v2', 'sta-a-v4'],
    ['mad-a-v2', 'ase-a-v4'],
    ['own-blog-pl8', 'frazy-a'],
    ['own-hero-pl4', 'andrianna-a'],
  ],
  4: [
    ['elkat-a-v2', 'mad-a-v2'],
    ['own-hero-pl4', 'ase-a-v4', 'andrianna-a'],
    ['tql-a-v2', 'own-blog-pl8'],
    ['sta-a-v4', 'fix-a-v2', 'frazy-a'],
  ],
  3: [
    ['elkat-a-v2', 'frazy-a', 'andrianna-a'],
    ['own-hero-pl4', 'ase-a-v4', 'own-blog-pl8', 'fix-a-v2'],
    ['mad-a-v2', 'tql-a-v2', 'sta-a-v4'],
  ],
  2: [
    ['elkat-a-v2', 'mad-a-v2', 'own-hero-pl4', 'fix-a-v2', 'frazy-a'],
    ['ase-a-v4', 'tql-a-v2', 'sta-a-v4', 'own-blog-pl8', 'andrianna-a'],
  ],
};

function stosyDlaKolumn(cols) {
  const byKey = Object.fromEntries(MOSAIC.map((t) => [t.src.split('/').pop().replace('.webp', ''), t]));
  const stacks = UKLADY_STOSOW[cols].map((stack) => stack.map((k) => byKey[k]).filter(Boolean));
  const uzyte = new Set(stacks.flat());
  const wys = (stack) => stack.reduce((suma, t) => suma + t.h / t.w, 0);
  MOSAIC.filter((t) => !uzyte.has(t)).forEach((t) => {
    stacks.reduce((min, stack) => (wys(stack) < wys(min) ? stack : min)).push(t);
  });
  return stacks;
}

/* Sciana w HTML z serwera od razu w kazdym wariancie (05.10.2026).
   Bylo: useState(4) + useEffect z window.innerWidth, wiec serwer zawsze
   renderowal 4 kolumny, a po hydracji JS przestawial je na 5 (>= 1280 px)
   albo 2 (< 640 px). Zmierzone: sciana 925 -> 575 px przy 1440 i
   259 -> 888 px przy 390, wszystko pod portfolio skakalo o -350 / +576 px.
   Wejscie z kotwica /#kontakt (i #cennik, #blog, #wyniki, /en#contact)
   konczylo przewijanie wg ukladu z serwera: przy 1440 naglowek wyceny
   226 px nad oknem; to samo przy przejsciu Linkiem ze stopki podstrony.
   Teraz kazdy wariant jest liczony raz na poziomie modulu (ten sam wynik na
   serwerze i w przegladarce), a widoczny jest dokladnie jeden - wybiera go
   @media w STYL_PORTFOLIO, wiec pierwsza klatka ma juz koncowa liczbe
   kolumn i nic sie nie przelicza po hydracji ani przy resize.
   Wybrane zamiast rezerwacji wysokosci w CSS (wzor z proporcji kafli trzeba
   by przeliczac przy kazdej zmianie MOSAIC, a stale 575/888 px ucinaly
   sciane przy 1920 i 430) i zamiast ponownego przewiniecia w JS (lata
   skutek, nie przyczyne, i zalezy od kolejnosci zdarzen). Koszt: 45
   dodatkowych <img> z display: none - loading="lazy" nie pobiera ich, bo
   ukryty element nie ma pudelka, a ten sam adres i tak bylby z cache;
   display: none zdejmuje je tez z drzewa dostepnosci. Progi @media to te
   same co dawniej w JS (window.innerWidth i @media licza szerokosc okna
   razem z paskiem przewijania). */
const WARIANTY_SCIANY = [2, 3, 4, 5].map((cols) => ({ cols, columns: stosyDlaKolumn(cols) }));

/* Arkusz komponentu: wybor wariantu sciany i przycisk pauzy filmu.
   href + precedence = React 19 przenosi <style> do <head> (takze w HTML
   z serwera), wiec reguly dzialaja od pierwszej klatki. Selektory z
   [data-kolumny] maja wyzsza specyficznosc niz .portfolio-mosaic
   { display: grid } w globals.css, kolejnosc arkuszy nie ma znaczenia.
   Przycisk filmu: wypelnienie rgba(0,0,0,.6) na ciemnych klatkach filmu
   ma tylko 1,0-2,1:1, dlatego biala obwodka (6,1-14,9:1 wobec zmierzonego
   tla rogu); biala ikona na wypelnieniu 16,2-21:1. Globalny obrys fokusu
   #185FA5 ginie na ciemnym filmie - tu bialy obrys z granatowa obwodka,
   widoczny i na filmie, i na jasnym tle sekcji. */
const STYL_PORTFOLIO = `
.portfolio-mosaic[data-kolumny]{display:none}
@media (max-width:639.98px){.portfolio-mosaic[data-kolumny="2"]{display:grid}}
@media (min-width:640px) and (max-width:1023.98px){.portfolio-mosaic[data-kolumny="3"]{display:grid}}
@media (min-width:1024px) and (max-width:1279.98px){.portfolio-mosaic[data-kolumny="4"]{display:grid}}
@media (min-width:1280px){.portfolio-mosaic[data-kolumny="5"]{display:grid}}
.portfolio-video-toggle{position:absolute;right:12px;bottom:12px;width:44px;height:44px;display:grid;place-items:center;padding:0;border-radius:50%;border:2px solid rgba(255,255,255,.85);background:rgba(0,0,0,.6);color:#fff;cursor:pointer;transition:background .2s ease}
.portfolio-video-toggle:hover{background:rgba(0,0,0,.78)}
.portfolio-video-toggle:focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 5px var(--w-tusz)}
`;

export default function Portfolio() {
  const [activeModal, setActiveModal] = useState(null);
  const lang = useLocale();

  // Dane GSC dla kart i wykresu (jedno zapytanie). Start: dane wkompilowane (SSR, bez rozjazdu hydratacji).
  const [gsc, setGsc] = useState({ serie: SERIE_GSC, metryki: METRYKI_GSC, wygenerowano: GSC_WYGENEROWANO });
  useEffect(() => {
    let aktywny = true;
    fetch('/api/realizacje-gsc')
      .then((r) => r.json())
      .then((d) => { if (aktywny && d?.ok && d.serie && d.metryki) setGsc({ serie: d.serie, metryki: d.metryki, wygenerowano: d.wygenerowano || null }); })
      .catch(() => {});
    return () => { aktywny = false; };
  }, []);

  /* Ghost renderuje pięć sztywnych stosów w DOM i wyrównuje je do DOŁU
     (align-items: end). Że mają różną wysokość, górna krawędź ściany jest
     poszarpana, a kontener ją przycina - to jest cały efekt. CSS multi-column
     tego nie odtworzy, bo z definicji wyrównuje kolumny, więc stosy dla
     każdej liczby kolumn są gotowe w WARIANTY_SCIANY, a wybiera je @media. */

  /* Film ASE-BOT: pauza i prefers-reduced-motion (05.10.2026).
     Pomiar na :3106/:3107 (/ i /en, 1440 i 390): film 44 s startowal sam,
     zapetlal sie, nie mial kontrolek ani przycisku, klik w film go nie
     zatrzymywal, a przy reduce gral tak samo (t 2,48 -> 5,48 s w 3 s) -
     WCAG 2.2.2. Przy reduce pause() przed pierwszym odtworzeniem kasuje
     tez oczekujacy autoplay (flaga "can autoplay" w specyfikacji HTML).
     setVideoPaused(v.paused) jest potrzebne, bo pause() na filmie, ktory
     jeszcze nie wystartowal (poza kadrem), nie wysyla zdarzenia pause, a
     zdarzenie play sprzed hydracji React tez przegapil. Dalej stan idzie
     wylacznie za zdarzeniami filmu (onPlay/onPause), nie za kliknieciem. */
  const videoRef = useRef(null);
  const [videoPaused, setVideoPaused] = useState(false);

  /* 4.11.2026 (audyt techniczny planu z filmu): film 1 983 867 B schodzil w calosci
     przy kazdym wejsciu na / i /en (PSI mobile i desktop: transfer 1 984 634 B, 206),
     bo autoPlay ignoruje preload="metadata", a sekcja lezy kilka ekranow nizej.
     Zrodlo dostaje dopiero, gdy sekcja jest 600 px od kadru; do tego czasu plakat.
     5.11.2026 (PLAN-v2 rozdz. 7, TS4; TS-04 po weryfikacji: lataka T4 bez T3 - rozgrzewajacy
     fetch sceny w Hero.jsx zostaje). Build weryfikacyjny, Playwright 1440x900 z WebGL bez
     ctx.route: 0 zapytan mp4 przed przewinieciem, 6 234 257 B w 15 s (bylo ok. 8,2 MB).
     Przegladarka bez IntersectionObserver dostaje film od razu, ale w timerze, a nie
     synchronicznie w efekcie (regula react-hooks/set-state-in-effect). */
  const [wideoSrc, setWideoSrc] = useState(null);
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (!('IntersectionObserver' in window)) {
      const t = setTimeout(() => setWideoSrc(WIDEO_PORTFOLIO), 0);
      return () => clearTimeout(t);
    }
    const io = new IntersectionObserver((entries) => {
      if (!entries.some((e) => e.isIntersecting)) return;
      io.disconnect();
      setWideoSrc(WIDEO_PORTFOLIO);
    }, { rootMargin: '600px 0px' });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !wideoSrc) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Weryfikacja etapu 5 (14.10.2026): film stal na t=0 i pokazywal plakat
      // z innego projektu (Chrome) albo czarny kadr (WebKit). Kadr z 20. sekundy
      // pokazuje panel ASE-BOT; preload auto jest potrzebny w WebKit.
      v.pause();
      v.preload = 'auto';
      v.currentTime = 20;
    }
    setVideoPaused(v.paused);
  }, [wideoSrc]);

  const przelaczWideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      const odtwarzanie = v.play();
      if (odtwarzanie && typeof odtwarzanie.catch === 'function') odtwarzanie.catch(() => {});
    } else {
      v.pause();
    }
  };

  /* Karty „Wybrane realizacje”. Wszystkie dane pobierane na żywo z Google Search Console
     klientów agencji (lib/realizacjeGsc.js oraz /api/realizacje-gsc):
     STANIAX, MADAME THAI, TQL, ASE-BOT i STEF-BUD (bez elkatelektro.com). */
  const logo = (nazwa) => realizedWebsites.find((w) => w.brandName === nazwa)?.brandLogo;
  const logoTql = (
    <span style={{ fontFamily: 'var(--font-geist), sans-serif', fontWeight: 800, letterSpacing: '0.06em', fontSize: '1.3rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
      TQL
    </span>
  );
  const logoStefbud = (
    <span style={{ fontFamily: 'var(--font-geist), sans-serif', fontWeight: 800, letterSpacing: '0.04em', fontSize: '1.25rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
      STEF-BUD
    </span>
  );
  const pl = lang === 'pl';
  const cta = (kotwica) => (pl ? (
    /* Zwykłe <a>: pełne przejście respektuje scroll-margin-top nagłówka artykułu
       (przy Link z płynnym przewinięciem nagłówek klienta chował się pod paskiem). */
    <a href={`/blog/wyniki-wdrozen-seo-2026#${kotwica}`} className="portfolio-client-cta" data-cta="portfolio_client_results">
      Zobacz dane z Search Console →
    </a>
  ) : (
    <a href={hash('kontakt', lang)} className="portfolio-client-cta" data-cta="portfolio_client">
      Ask for the Search Console data →
    </a>
  ));
  /* 20.11.2026: liczby, okres i data w kartach liczone z tych samych danych GSC co wykres
     (/api/realizacje-gsc, zapas: lib/realizacjeGsc.js). Wcześniej były wpisane na sztywno,
     więc po każdej synchronizacji różniły się od panelu GSC. Format jak w panelu GSC:
     wyświetlenia w skrócie (3 cyfry znaczące, np. 4,6 tys.), kliknięcia dokładnie. */
  const skrot = (n) => {
    if (n < 1000) return String(n);
    const k = n / 1000;
    const zaokr = k >= 100 ? String(Math.round(k)) : k >= 10 ? k.toFixed(1) : k.toFixed(2);
    const czysty = zaokr.replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
    return pl ? `${czysty.replace('.', ',')}\u00A0tys.` : `${czysty}K`;
  };
  const dokl = (n) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, pl ? '\u00A0' : ',');
  const dzien = (iso, rok) => {
    const [y, m, d] = iso.split('-');
    if (pl) return rok ? `${d}.${m}.${y}` : `${d}.${m}`;
    const mies = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][Number(m) - 1];
    return rok ? `${d} ${mies} ${y}` : `${d} ${mies}`;
  };
  const aktualizacja = gsc.wygenerowano ? dzien(gsc.wygenerowano.slice(0, 10), true) : null;
  const zrodloGsc = pl
    ? `Źródło: Google Search Console${aktualizacja ? `, aktualizacja ${aktualizacja}` : ''}`
    : `Source: Google Search Console${aktualizacja ? `, updated ${aktualizacja}` : ''}`;
  const karta = (id, seria, nazwa, logoEl, tag, skrotKat, opisPl, opisEn) => {
    const m = gsc.metryki?.[seria] || METRYKI_GSC[seria];
    const kl = dokl(m.totalClicks);
    const wy = skrot(m.totalImpr);
    const dni = m.days;
    return {
      id,
      nazwa,
      logo: logoEl,
      tag,
      skrot: skrotKat,
      opis: pl ? opisPl(kl, wy) : opisEn(kl, wy, dni),
      seria,
      metryki: pl
        ? [[wy, `wyświetleń w Google w ${dni} dni`], [kl, `kliknięć z wyszukiwarki w ${dni} dni`]]
        : [[wy, `Google impressions in ${dni} days`], [kl, `clicks from search in ${dni} days`]],
      okres: pl
        ? `Okres: ${dni} dni, ${dzien(m.startDate)}-${dzien(m.endDate, true)}`
        : `Period: ${dni} days, ${dzien(m.startDate)}-${dzien(m.endDate, true)}`,
      zrodlo: zrodloGsc,
      cta: cta(id),
    };
  };
  const pozycje = [
    karta('staniax', 'staniax', 'STANIAX', logo('STANIAX'), pl ? 'SEO / STRONA WWW' : 'SEO / WEBSITE', pl ? 'B2B Przemysł' : 'B2B Industry',
      (kl, wy) => `Z zerowej widoczności do ${kl} kliknięć i ${wy} wyświetleń w Google (Search Console).`,
      (kl, wy, d) => `From zero visibility to ${kl} clicks and ${wy} Google impressions in ${d} days (Search Console).`),
    karta('madame-thai', 'madamethai', 'MADAME THAI', logo('MADAME THAI'), pl ? 'SEO LOKALNE / STRONA WWW' : 'LOCAL SEO / WEBSITE', pl ? 'Gastronomia' : 'Hospitality',
      (kl, wy) => `Zbudowanie i rozwinięcie sprzedaży w nowo otwartej lokalizacji restauracji: ${kl} kliknięć i ${wy} wyświetleń w Google (Search Console).`,
      (kl, wy, d) => `Building and scaling digital sales for the newly opened restaurant location: ${kl} clicks and ${wy} Google impressions in ${d} days (Search Console).`),
    karta('tql', 'tql', 'TQL', logoTql, pl ? 'SEO / STRONA WWW' : 'SEO / WEBSITE', 'ISO',
      (kl, wy) => `Firma wdrażająca normy ISO: dynamiczny wzrost do ${kl} kliknięć i ${wy} wyświetleń w Google (Search Console).`,
      (kl, wy, d) => `ISO standards consultancy: rapid growth to ${kl} clicks and ${wy} Google impressions in ${d} days (Search Console).`),
    karta('ase-bot', 'ase-bot', 'ASE-BOT', logo('ASE-BOT'), pl ? 'PROJEKT WŁASNY / SEO' : 'OWN PROJECT / SEO', 'SaaS / AI',
      (kl, wy) => `Nasz własny projekt AI: ${wy} wyświetleń w Google i stałe pozyskiwanie analityków rynkowych (Search Console).`,
      (kl, wy, d) => `Our own AI project: ${wy} Google impressions in ${d} days and steady organic discovery (Search Console).`),
    karta('stefbud', 'stefbud', 'STEF-BUD', logoStefbud, pl ? 'PRODUKCJA / STRONA WWW I SEO' : 'MANUFACTURING / WEB & SEO', pl ? 'Budownictwo B2B' : 'B2B Construction',
      (kl, wy) => `Producent świetlików dachowych i pasm świetlnych: ${kl} kliknięć i ${wy} wyświetleń na kluczowe zapytania B2B (Search Console).`,
      (kl, wy) => `Rooflight and skylight manufacturer: ${kl} clicks and ${wy} Google impressions on key B2B searches (Search Console).`),
  ];

  return (
    <section className="portfolio" id="portfolio" style={{ background: 'var(--w-papier-2)', padding: '7rem 0 5rem' }}>
      <style href="portfolio-sciana-wideo" precedence="default">{STYL_PORTFOLIO}</style>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Nagłówek w układzie Ghosta: mały eyebrow w kolorze akcentu, duży
            nagłówek do lewej, akapit pod nim w wąskiej kolumnie. Treść bez
            zmian - zmienia się tylko wyrównanie, skala i kolumna. */}
        {/* Uklad jak w sekcji Ghosta nad ich sciana kafelkow: po lewej blok
            tekstu (eyebrow, duzy naglowek z kursywa, akapit, link), po prawej
            duzy wizual. U nich jest to panel ustawien z podgladem publikacji,
            u nas realizacja klienta - ta sama rola: pokazac produkt, zanim
            zacznie sie sciana miniatur. */}
        <Reveal className="portfolio-head">
          <div className="portfolio-head-text">
            <div className="portfolio-eyebrow">{lang === 'pl' ? 'NASZE WYNIKI' : 'OUR RESULTS'}</div>
            <h2 className="portfolio-title">
              {lang === 'pl' ? <>Odkryj <em>nowości</em> naszych klientów</> : <>Explore <em>what’s new</em> for our clients</>}
            </h2>
            <p className="portfolio-lede">
              {lang === 'pl'
                ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów. Każdy kafelek to prawdziwy zrzut strony zaprojektowanej przez nasz zespół, a dane z Google Search Console (kliknięcia, wyświetlenia i pozycje) pokazują wykresy powyżej. Tak wygląda pozycjonowanie stron: raportujemy zapytania i widoczność z Twoich kont, w stałym abonamencie z jawnym celem TOP 3. Zapytania i dziennik prac widzisz codziennie, pozycje co tydzień.'
                : 'Explore analytics-backed growth metrics across our client case studies. Every tile is a real screenshot of a website designed by our team, and the Google Search Console data (clicks, impressions and positions) is shown as charts above. This is how SEO looks with us: we report enquiries and visibility from your own accounts, on a fixed subscription with an explicit TOP 3 goal. You see enquiries and the work log every day, and positions every week.'}
            </p>
            <Link className="portfolio-more" href="/pozycjonowanie-stron-internetowych">
              {lang === 'pl' ? 'Zobacz zakres współpracy' : 'See how we work'} →
            </Link>
          </div>
          <div className="portfolio-head-visual">
            {/* Film z realizacji ASE-BOT (39,5 MB MP4 skompresowany do 1,9 MB,
                1280 px, bez audio). Wyciszony autoplay w petli - bez kontrolek
                przegladarki, jak wizual w sekcji Ghosta, ale z wlasnym
                przyciskiem pauzy (WCAG 2.2.2, opis przy videoRef). */}
            {/* Ramka ma dokladnie szerokosc filmu (ta sama formula co
                .portfolio-head-visual video w globals.css), bo wrapper jest
                position: static i szerszy od filmu: przy 1440x600 film ma
                619 px w kolumnie 736 px, a przycisk liczony od wrappera
                wypadal poza film (x 1336-1380 przy krawedzi filmu 1333). */}
            <div style={{ position: 'relative', width: 'min(100%, calc(58vh * 16 / 9))', marginInline: 'auto' }}>
              <video
                ref={videoRef}
                src={wideoSrc ?? undefined}
                poster="/projects/mosaic/feature.webp"
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                onPlay={() => setVideoPaused(false)}
                onPause={() => setVideoPaused(true)}
                onClick={przelaczWideo}
                style={{ cursor: 'pointer' }}
                aria-label={lang === 'pl' ? 'Prezentacja platformy tradingowej ASE-BOT zaprojektowanej przez AI SEO COMPANY' : 'Showcase of the ASE-BOT trading platform designed by AI SEO COMPANY'}
              />
              {/* Przelacznik wg wzorca ARIA: etykieta stala, stan niesie
                  aria-pressed (wcisniety = film wstrzymany). Zmienna etykieta
                  razem z aria-pressed dawalaby czytnikowi sprzeczny komunikat
                  ("Odtworz wideo, wcisniety"). Ikona zmienia sie wizualnie. */}
              <button
                type="button"
                className="portfolio-video-toggle"
                onClick={przelaczWideo}
                aria-pressed={videoPaused}
                aria-label={lang === 'pl' ? 'Wstrzymaj wideo' : 'Pause video'}
              >
                {videoPaused ? (
                  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                    <path d="M7 4.5v15l12.5-7.5z" />
                  </svg>
                ) : (
                  <svg aria-hidden="true" focusable="false" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M6 4h4v16H6zM14 4h4v16h-4z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </Reveal>
      </div>

      {/* Wybrane realizacje w ukladzie makiety (os klientow + karta z wykresem
          Search Console). Pas na pelna szerokosc, bo za nim sa mgliste gory
          z makiety (app/wyglad.css, .realizacje-pas). */}
      <div className="realizacje-pas" data-petla="">
        <div className="container">
          <div className="portfolio-eyebrow realizacje-etykieta">
            <span className="asterisk" aria-hidden="true">✳</span> {lang === 'pl' ? 'WYBRANE REALIZACJE' : 'SELECTED CASE STUDIES'}
          </div>
          <Realizacje pozycje={pozycje} daneGsc={gsc.serie} lang={lang} etykieta={lang === 'pl' ? 'Wybrane realizacje' : 'Selected case studies'} />
        </div>
      </div>

      {/* The wall. One column layout, natural aspect ratios, equal gutters -
          the mechanics of ghost.org's theme gallery, measured rather than
          guessed (5 columns x 386px, 16px gap, images at their own heights).
          CSS multi-column does the balancing, so the column count can change
          per breakpoint without re-chunking the array in JS.

          It replaces the carousel, but nothing it used to say is gone: the
          headline metric and its sentence are in the strip underneath, and the
          full case studies still open in the same modal - now from a tile. */}
      <div style={{ position: 'relative', width: '100%', padding: 0 }}>
        {/* Cztery warianty sciany (2/3/4/5 kolumn), widoczny jeden - wybiera
            @media w STYL_PORTFOLIO (opis przy WARIANTY_SCIANY). */}
        {WARIANTY_SCIANY.map(({ cols, columns }) => (
        <div className="portfolio-mosaic" data-kolumny={cols} key={cols} style={{ ['--mosaic-cols']: cols }}>
          {columns.map((column, ci) => (
          <div className="portfolio-mosaic-col" key={ci}>
          {column.map((tile) => {
            const mTile = tile.gsc ? (gsc.metryki?.[tile.gsc] || METRYKI_GSC[tile.gsc]) : null;
            const okresTile = mTile
              ? `${dzien(mTile.startDate)}-${dzien(mTile.endDate, true)}`
              : (pl ? tile.metaPl : tile.metaEn);
            const statusTile = mTile ? 'Live GSC API' : 'Live';
            return (
              /* Sam obrazek: kafelek nic nie robi po kliknieciu. Case studies
                 otwiera pasek klientow pod sciana, wiec tresc nie znika. */
              <figure className="portfolio-mosaic-tile" key={tile.src}>
                <span className="portfolio-okno-nagl" aria-hidden="true">
                  <span className="portfolio-okno-info">
                    <span className="portfolio-okno-domena" data-t={tile.domena} />
                    <span className="portfolio-okno-uk" data-t="/" />
                    <span className="portfolio-okno-okres" data-t={okresTile} />
                  </span>
                  <span className={`portfolio-okno-live${mTile ? ' portfolio-okno-live--gsc' : ''}`}>
                    <span className="portfolio-okno-kropka" />
                    <span className="portfolio-okno-status" data-t={statusTile} />
                  </span>
                </span>
                {/* eslint-disable-next-line @next/next/no-img-element -- gotowe kafelki WebP 1200 px bez drugiej kompresji */}
                <img
                  src={lang === 'en' && tile.srcEn ? tile.srcEn : tile.src}
                  alt={lang === 'pl' ? tile.alt : tile.altEn}
                  width={tile.w}
                  height={tile.h}
                  loading="lazy"
                  decoding="async"
                />
              </figure>
            );
          })}
          </div>
          ))}
        </div>
        ))}

        {/* 9.11.2026: pasek klientow (logo, zdanie, link do danych) przeniesiony
            do kart „Wybrane realizacje” nad sciana - te same zdania i linki,
            plus wykres z panelu GSC kazdego klienta. */}
      </div>


      {/* Case Study Detail Modal (unchanged logic, just styled dark) */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ background: '#111', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
            <span className="modal-close" onClick={() => setActiveModal(null)} style={{ color: '#FFF' }}>&times;</span>
            <div style={{ fontSize: '1.5rem', fontWeight: 700, margin: '1rem 0' }}>{activeModal.brandName}</div>
            <p style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: '600' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                {activeModal.url} <span className="ico-ne" aria-hidden="true">↗</span>
              </a>
            </p>
            <div style={{ fontSize: '3.5rem', fontWeight: '700', background: activeModal.gradient, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', marginBottom: '1.5rem', lineHeight: 1 }}>
              {activeModal.metric}
            </div>
            <div style={{ color: '#A1A1AA', fontSize: '1rem', lineHeight: '1.8', whiteSpace: 'pre-line', marginBottom: '2rem', background: 'rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '16px' }}>
              {activeModal.details}
            </div>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" className="btn btn-secondary" style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', borderColor: 'transparent' }}>
                Odwiedź witrynę na żywo <span className="ico-ne" aria-hidden="true">↗</span>
              </a>
              <a href={hash('kontakt', lang)} className="btn btn-primary" onClick={() => setActiveModal(null)}>
                Zamów stronę / SEO dla swojej firmy
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
