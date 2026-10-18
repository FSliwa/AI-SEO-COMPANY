'use client';

import { useState, useEffect, useRef } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';

const realizedWebsites = [
  {
    id: 1,
    brandName: 'MADAME THAI',
    brandLogo: (
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 400, letterSpacing: '0.15em', fontSize: '1.2rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
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
    imgAlt: 'Strona internetowa restauracji Madame Thai — projekt agencji SEO i marketingowej z Warszawy',
    imgAltEn: 'Madame Thai restaurant website — the homepage we designed and built for their Warsaw location',
    imgTitle: 'Projekt strony dla restauracji Madame Thai',
    imgTitleEn: 'Madame Thai restaurant — website project',
    largeImageMobile: '/images/madame-thai-mobile.webp',
    details: `Część I — Nowa strona internetowa: Fundament, na którym pracuje cały marketing.
- Indywidualny projekt graficzny (UX/UI) dopasowany do identyfikacji wizualnej: Buduje zaufanie od pierwszych sekund i w przemyślany sposób prowadzi klienta do telefonu lub rezerwacji.
- Responsywna wersja strony (RWD): Poprawne działanie na telefonach i tabletach — eliminacja utraconych zapytań od klientów mobilnych.
- Integracja narzędzi: Formularz kontaktowy, Google Analytics, linki social media, integracja z Hotres.
- Stała opieka techniczna: Certyfikat bezpieczeństwa SSL, bieżące aktualizacje i brak przestojów w cenie.`
  },
  {
    id: 2,
    brandName: 'STANIAX',
    brandLogo: (
      <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 700, letterSpacing: '-0.02em', fontSize: '1.4rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
        STANIAX
      </span>
    ),
    url: 'https://www.staniax.pl/',
    category: 'seo',
    metric: '2.8k+',
    metricSubtitle: 'organic search impressions from zero visibility.',
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
    imgAlt: 'Strona B2B dla Staniax — pozycjonowanie stron i optymalizacja SEO w branży przemysłowej',
    imgAltEn: 'Staniax B2B industrial website — the product pages we rebuilt for their German and US markets',
    imgTitle: 'Pozycjonowanie stron dla Staniax — wyniki agencji marketingowej',
    imgTitleEn: 'Staniax — B2B website rebuild and search visibility results',
    details: `Case Study 1 — Skalowanie widoczności od zera i optymalizacja konwersji:
- Start od zerowej widoczności → 2,8 tys. wyświetleń i gwałtowny skokowy wzrost do ok. 100 wyświetleń dziennie.
- Zlokalizowanie kluczowych fraz usługowych: „metalizowanie próżniowe” (pozycja 17,38) oraz „metalizacja próżniowa” (pozycja 19,61).
- Wyższy współczynnik klikalności CTR na urządzeniach mobilnych — przygotowanie i wdrożenie wersji wielojęzycznych (/de i /en pod Niemcy i USA).`
  },
  {
    id: 3,
    brandName: 'ASE-BOT',
    brandLogo: (
      <span style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, letterSpacing: '0.1em', fontSize: '1.3rem', color: '#0F172A', whiteSpace: 'nowrap' }}>
        ASE-BOT
      </span>
    ),
    url: 'https://ase-bot.live/',
    category: 'seo',
    metric: '+8 113.8%',
    metricSubtitle: 'Organic Google Search Growth',
    gradient: 'linear-gradient(135deg, #60A5FA, #38BDF8, #A855F7)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.35) 40%, rgba(255, 255, 255, 1) 75%)',
    layout: 'center-reverse',
    rightVisual: 'desktop',
    largeImage: '/projects/aisas-fintech-platform.webp',
    desktopCard: {
      tag: 'FINTECH & GLOBAL SEO',
      title: 'AI FUTURES TRADING PLATFORM',
      subtitle: '+8 113.8% Google Search Growth in hyper-competitive US market.',
      image: '/projects/aisas-fintech-platform.webp',
      btnText: 'View Case Study'
    },
    imgAlt: 'Platforma fintech z AI — pozycjonowanie stron na rynku zagranicznym',
    imgAltEn: 'AISAS fintech platform — the dashboard interface we designed for the US market launch',
    imgTitle: 'Pozycjonowanie stron dla platformy fintech — wyniki',
    imgTitleEn: 'AISAS fintech platform — design and organic growth results',
    details: `Case Study 2 — Hiperkonkurencyjny rynek zagraniczny (ase-bot.live):
- Skok od 0 do 4,8 tys. wyświetleń w kwartale (+8 113,8%) i wzrost w ostatnich 28 dniach o 244,7% (do 500 wyświetleń dziennie).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 — krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

/* Dziesiec kafelkow w dwoch wysokosciach: szesc sekcji hero stron glownych
   klientow (1200x700, proporcja 1.71:1 jak dominujace kafle u Ghosta) i cztery prawdziwe zrzuty paneli
   Performance z Google Search Console (1600x726, niski wariant). Zadnych
   podstron i zadnych kart z liczbami - dowodem sa same panele. Kolejnosc
   dobrana pod cztery kolumny: panel GSC laduje bezposrednio pod hero tej
   samej marki (Staniax, Madame Thai, ASE-BOT), a stosy wychodza poszarpane
   jak u Ghosta (1.8 / 2.25 / 1.35 / 1.8 szerokosci kolumny). */
const MOSAIC = [
  /* 15 kafli: osiem stron klientow + hero i blog wlasnej strony agencji
     (zrzuty w OBU jezykach - srcEn przelacza wariant wg locale) + piec
     prawdziwych paneli GSC. Tablica zasila obie wersje jezykowe naraz,
     wiec nowy kafel wystarczy dopisac raz. */
{ src: '/projects/mosaic/elkat-a-v2.webp', w: 1200, h: 970, alt: 'Sekcja hero katalogu komponentów elektrycznych Elkat Power', altEn: 'Hero section of the Elkat Power electrical components catalogue' },
{ src: '/projects/mosaic/mad-a-v2.webp', w: 1200, h: 840, alt: 'Sekcja hero strony głównej restauracji Madame Thai', altEn: 'Hero section of the Madame Thai restaurant homepage' },
{ src: '/projects/mosaic/own-hero-pl4.webp', srcEn: '/projects/mosaic/own-hero-en4.webp', w: 1200, h: 752,
    alt: 'Sekcja hero strony AI SEO COMPANY — napis SEO w scenie 3D', altEn: 'Hero section of the AI SEO COMPANY website — 3D SEO scene' },
{ src: '/projects/mosaic/ase-a-v2.webp', w: 1200, h: 700, alt: 'Pełna sekcja hero platformy tradingowej ASE-BOT — AI trading i analiza rynków', altEn: 'Hero section of the ASE-BOT trading platform homepage' },
{ src: '/projects/mosaic/tql-a.webp', w: 1200, h: 840, alt: 'Sekcja hero strony głównej TQL — wdrożenia norm ISO', altEn: 'Hero section of the TQL ISO implementation homepage' , srcEn: '/projects/mosaic/tql-a-en.webp' },
{ src: '/projects/mosaic/sta-blog-pl4.webp', w: 1200, h: 844,
    alt: 'Karty artykułów bazy wiedzy Staniax — metalizacja próżniowa i regeneracja odbłyśników', altEn: 'Staniax knowledge base — articles on vacuum metallization' },
{ src: '/projects/mosaic/sta-a-v4.webp', w: 1200, h: 800, alt: 'Sekcja „Kim jesteśmy" strony Staniax — metalizacja próżniowa, 25 lat doświadczenia', altEn: 'About section of the Staniax vacuum metallization website' , srcEn: '/projects/mosaic/sta-a-en3.webp' },
{ src: '/projects/mosaic/own-blog-pl7.webp', srcEn: '/projects/mosaic/own-blog-en6.webp', w: 1200, h: 840,
    alt: 'Blog AI SEO COMPANY — artykuły o SEO i web designie', altEn: 'AI SEO COMPANY blog — articles on SEO and web design' },
{ src: '/projects/mosaic/fix-a-v2.webp', w: 1200, h: 520, alt: 'Sekcja hero strony producenta świetlików dachowych Stef-Bud', altEn: 'Hero section of the Stef-Bud skylight manufacturer website' },
{ src: '/projects/mosaic/frazy-a.webp', w: 1200, h: 783,
    alt: 'Podstrona Frazy Studio — biała bluza oversize z nadrukiem samuraja w masce Noh, na tle rzeźbionej zieleni',
    altEn: 'Frazy Studio page — an off-white oversized hoodie with a samurai Noh mask print against sculpted greenery' },
{ src: '/projects/gsc/staniax.webp', w: 1600, h: 726, alt: 'Panel Performance staniax.pl w Google Search Console: 152 kliknięcia i 6,34 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for staniax.pl: 152 clicks and 6.34K impressions over 3 months' },
{ src: '/projects/gsc/madamethai.webp', w: 1600, h: 726,
    alt: 'Panel Performance madamethai.pl w Google Search Console: 187 kliknięć i 10,1 tys. wyświetleń w 3 miesiące',
    altEn: 'Google Search Console performance panel for madamethai.pl: 187 clicks and 10.1K impressions over 3 months' },
{ src: '/projects/gsc/tql.webp', w: 1600, h: 726, alt: 'Panel Performance tql.pl w Google Search Console: 296 wyświetleń, pozycja 34,6 w 28 dni', altEn: 'Google Search Console performance panel for tql.pl: 296 impressions, position 34.6 over 28 days' },
{ src: '/projects/gsc/ai-seo-company.webp', w: 1600, h: 726, alt: 'Panel Performance ai-seo-company.pl w Google Search Console: 2,77 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for ai-seo-company.pl: 2.77K impressions over 3 months' },
{ src: '/projects/gsc/ase-bot.webp', w: 1600, h: 726, alt: 'Panel Performance ase-bot.live w Google Search Console: 7,71 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for ase-bot.live: 7.71K impressions over 3 months' }
];

/* Uklad zmierzony ze zrzutu sciany ghost.org: piec stosow wyrownanych do
   dolu, o roznej wysokosci, przez co gorna krawedz jest poszarpana.
   Kazda marka stoi nad swoim panelem GSC (Madame Thai, ASE-BOT, Staniax),
   panele zamykaja kolumny od dolu.

   UWAGA - to jest pulapka, ktora juz raz zadziala: uklad piecio-kolumnowy
   NIE czyta tablicy MOSAIC, tylko te sztywna liste kluczy. Dopisanie kafla
   do MOSAIC bez dopisania go TUTAJ konczy sie tym, ze kafel jest w
   wariantach 2/3/4 kolumn, ale nie ma go w wariancie 5 kolumn, czyli znika
   na kazdym ekranie >= 1280 px. Klucz to nazwa pliku bez rozszerzenia.
   `filter(Boolean)` chroni przed literowka w kluczu - wtedy kafel po prostu
   nie wejdzie, zamiast wywalic render.

   Wysokosci stosow w jednostkach szerokosci kolumny (suma h/w kafli):
   1.82 / 1.81 / 1.78 / 1.47 / 1.96. Kafel Frazy trafil do drugiej kolumny,
   bo bez niego miala 1.15 i odstawala od reszty.
   Ponizej 1280px round-robin: hero najpierw, GSC na koncu. */
function stosyDlaKolumn(cols) {
  if (cols === 5) {
    const byKey = Object.fromEntries(MOSAIC.map((t) => [t.src.split('/').pop().replace('.webp', ''), t]));
    return [
      ['sta-a-v4', 'sta-blog-pl4', 'staniax'],
      ['frazy-a', 'mad-a-v2', 'madamethai'],
      ['own-hero-pl4', 'own-blog-pl7', 'ai-seo-company'],
      ['ase-a-v2', 'fix-a-v2', 'ase-bot'],
      ['elkat-a-v2', 'tql-a', 'tql'],
    ].map((stack) => stack.map((k) => byKey[k])).map((stack) => stack.filter(Boolean));
  }
  const stacks = Array.from({ length: cols }, () => []);
  MOSAIC.forEach((tile, i) => stacks[i % cols].push(tile));
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
.portfolio-video-toggle:focus-visible{outline:3px solid #fff;outline-offset:2px;box-shadow:0 0 0 5px #0F172A}
`;

export default function Portfolio() {
  const [activeModal, setActiveModal] = useState(null);
  const lang = useLocale();

  /* Ghost renderuje pięć sztywnych stosów w DOM i wyrównuje je do DOŁU
     (align-items: end). Że mają różną wysokość, górna krawędź ściany jest
     poszarpana, a kontener ją przycina — to jest cały efekt. CSS multi-column
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

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      // Weryfikacja etapu 5 (14.10.2026): film stal na t=0 i pokazywal plakat
      // z innego projektu (Chrome) albo czarny kadr (WebKit). Kadr z 20. sekundy
      // pokazuje panel ASE-BOT; preload auto jest potrzebny w WebKit.
      v.pause();
      v.preload = 'auto';
      v.currentTime = 20;
    }
    setVideoPaused(v.paused);
  }, []);

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

  return (
    <section className="portfolio" id="portfolio" style={{ background: '#F5F5F7', padding: '7rem 0 5rem' }}>
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
                ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów. Każdy kafelek to prawdziwy zrzut: strona zaprojektowana przez nasz zespół albo panel Google Search Console z kliknięciami, wyświetleniami i pozycjami. Tak wygląda pozycjonowanie stron rozliczane z realnych efektów, nie z obietnic.'
                : 'Explore analytics-backed growth metrics across our client case studies. Every tile is a real screenshot: a website designed by our team or a Google Search Console panel with clicks, impressions and positions. This is SEO measured by real outcomes, not promises.'}
            </p>
            <Link className="portfolio-more" href="/pozycjonowanie-stron-internetowych">
              {lang === 'pl' ? 'Zobacz zakres współpracy' : 'See how we work'} →
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
                src="/projects/ase-bot-demo.mp4"
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

      {/* The wall. One column layout, natural aspect ratios, equal gutters —
          the mechanics of ghost.org's theme gallery, measured rather than
          guessed (5 columns x 386px, 16px gap, images at their own heights).
          CSS multi-column does the balancing, so the column count can change
          per breakpoint without re-chunking the array in JS.

          It replaces the carousel, but nothing it used to say is gone: the
          headline metric and its sentence are in the strip underneath, and the
          full case studies still open in the same modal — now from a tile. */}
      <div style={{ position: 'relative', width: '100%', padding: '0 0 3rem' }}>
        {/* Cztery warianty sciany (2/3/4/5 kolumn), widoczny jeden - wybiera
            @media w STYL_PORTFOLIO (opis przy WARIANTY_SCIANY). */}
        {WARIANTY_SCIANY.map(({ cols, columns }) => (
        <div className="portfolio-mosaic" data-kolumny={cols} key={cols} style={{ ['--mosaic-cols']: cols }}>
          {columns.map((column, ci) => (
          <div className="portfolio-mosaic-col" key={ci}>
          {column.map((tile) => (
            /* Sam obrazek: kafelek nic nie robi po kliknieciu. Case studies
               otwiera pasek klientow pod sciana, wiec tresc nie znika. */
            <figure className="portfolio-mosaic-tile" key={tile.src}>
              <img
                src={lang === 'en' && tile.srcEn ? tile.srcEn : tile.src}
                alt={lang === 'pl' ? tile.alt : tile.altEn}
                width={tile.w}
                height={tile.h}
                loading="lazy"
                decoding="async"
              />
            </figure>
          ))}
          </div>
          ))}
        </div>
        ))}

        {/* Every line the carousel cards showed, kept visible instead of hidden
            behind a hover state. */}
        <div className="container" style={{ maxWidth: '1440px' }}>
          <RevealStagger className="portfolio-clients">
            {realizedWebsites.map((item) => (
              <RevealItem key={item.id} className="portfolio-client">
                <span className="portfolio-client-logo">{item.brandLogo}</span>
                <p className="portfolio-client-note">
                  {item.id === 1
                    ? (lang === 'pl'
                        ? 'Zbudowanie i rozwinięcie sprzedaży w nowo otwartej lokalizacji restauracji.'
                        : 'Building and scaling digital sales for the newly opened restaurant location.')
                    : item.id === 2
                    ? (lang === 'pl'
                        ? `${item.metric} wzrostu odwiedzin organicznych po 1 miesiącu od startu z zerowej widoczności.`
                        : `${item.metric} increase in organic visits after the first month, starting from zero visibility.`)
                    : (lang === 'pl'
                        ? `${item.metric} wzrostu odwiedzin organicznych po 1 miesiącu.`
                        : `${item.metric} increase in organic visits after 1 month.`)}
                </p>
                {/* Kierunek od klienta: zadnych modali - CTA prowadzi wprost
                    do formularza kontaktowego na dole strony. */}
                <a href={hash('kontakt', lang)} className="portfolio-client-cta" data-cta="portfolio_client">
                  {lang === 'pl' ? 'Napisz, aby zobaczyć wyniki' : 'Get in touch to see the results'} →
                </a>
              </RevealItem>
            ))}
          </RevealStagger>
        </div>
      </div>


      {/* Case Study Detail Modal (unchanged logic, just styled dark) */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ background: '#111', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
            <span className="modal-close" onClick={() => setActiveModal(null)} style={{ color: '#FFF' }}>&times;</span>
            <div style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 700 }} style={{ fontSize: "1.5rem", fontWeight: 700, margin: "1rem 0" }}>{activeModal.brandName}</div>
            <p style={{ fontSize: '1rem', color: 'var(--color-primary)', marginBottom: '1.5rem', fontWeight: '600' }}>
              <a href={activeModal.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'underline' }}>
                {activeModal.url} ↗
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
                Odwiedź witrynę na żywo ↗
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
