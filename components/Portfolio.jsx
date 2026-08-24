'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '@/i18n/routing';

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

/* Siedem kafelkow w dwoch wysokosciach: cztery sekcje hero stron glownych
   klientow (1200x1080, wysoki wariant) i trzy prawdziwe zrzuty paneli
   Performance z Google Search Console (1600x726, niski wariant). Zadnych
   podstron i zadnych kart z liczbami - dowodem sa same panele. Kolejnosc
   jest ulozona tak, zeby przy czterech kolumnach panel GSC wypadal pod hero
   tej samej marki (Staniax, ASE-BOT). */
const MOSAIC = [
  { src: '/projects/mosaic/mad-a.webp', w: 1200, h: 1080, alt: 'Sekcja hero strony głównej restauracji Madame Thai', altEn: 'Hero section of the Madame Thai restaurant homepage' },
  { src: '/projects/mosaic/sta-a.webp', w: 1200, h: 1080, alt: 'Sekcja hero strony głównej Staniax — metalizacja próżniowa', altEn: 'Hero section of the Staniax vacuum metallization homepage' },
  { src: '/projects/mosaic/ase-a.webp', w: 1200, h: 1080, alt: 'Sekcja hero strony głównej platformy tradingowej ASE-BOT', altEn: 'Hero section of the ASE-BOT trading platform homepage' },
  { src: '/projects/mosaic/tql-a.webp', w: 1200, h: 1080, alt: 'Sekcja hero strony głównej TQL — wdrożenia norm ISO', altEn: 'Hero section of the TQL ISO implementation homepage' },
  { src: '/projects/gsc/ai-seo-company.webp', w: 1600, h: 726, alt: 'Panel Performance ai-seo-company.pl w Google Search Console: 2,77 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for ai-seo-company.pl: 2.77K impressions over 3 months' },
  { src: '/projects/gsc/staniax.webp', w: 1600, h: 726, alt: 'Panel Performance staniax.pl w Google Search Console: 152 kliknięcia i 6,34 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for staniax.pl: 152 clicks and 6.34K impressions over 3 months' },
  { src: '/projects/gsc/ase-bot.webp', w: 1600, h: 726, alt: 'Panel Performance ase-bot.live w Google Search Console: 7,71 tys. wyświetleń w 3 miesiące', altEn: 'Google Search Console performance panel for ase-bot.live: 7.71K impressions over 3 months' }
];

export default function Portfolio() {
  const [activeModal, setActiveModal] = useState(null);
  const lang = useLocale();

  /* Ghost renderuje pięć sztywnych stosów w DOM i wyrównuje je do DOŁU
     (align-items: end). Że mają różną wysokość, górna krawędź ściany jest
     poszarpana, a kontener ją przycina — to jest cały efekt. CSS multi-column
     tego nie odtworzy, bo z definicji wyrównuje kolumny, więc liczbę stosów
     trzeba znać w JS. */
  const [cols, setCols] = useState(4);

  useEffect(() => {
    const calc = () => {
      const w = window.innerWidth;
      // Maks. cztery stosy: przy siedmiu kafelkach piaty stalby pusty.
      setCols(w >= 1024 ? 4 : w >= 640 ? 3 : 2);
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  /* Prosty round-robin: przy czterech kolumnach hero laduje na gorze stosu,
     a panel GSC tej samej marki zaraz pod nim. Wyrownanie stosow do dolu
     (align-items: end) robi poszarpana gorna krawedz - jak u Ghosta. */
  const columns = (() => {
    const stacks = Array.from({ length: cols }, () => []);
    MOSAIC.forEach((tile, i) => stacks[i % cols].push(tile));
    return stacks;
  })();

  return (
    <section className="portfolio" id="portfolio" style={{ background: '#F5F5F7', padding: '7rem 0 5rem' }}>
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
              {lang === 'pl' ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów.' : 'Explore analytics-backed growth metrics across our client case studies.'}
            </p>
            <Link className="portfolio-more" href="/pozycjonowanie-stron-internetowych">
              {lang === 'pl' ? 'Zobacz zakres współpracy' : 'See how we work'} →
            </Link>
          </div>
          <div className="portfolio-head-visual">
            <img
              src="/projects/mosaic/feature.webp"
              alt={lang === 'pl' ? 'Strona internetowa restauracji Madame Thai zaprojektowana przez AI SEO COMPANY' : 'Madame Thai restaurant website designed by AI SEO COMPANY'}
              width={1600}
              height={889}
              loading="lazy"
              decoding="async"
            />
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
        <div className="portfolio-mosaic" style={{ ['--mosaic-cols']: cols }}>
          {columns.map((column, ci) => (
          <div className="portfolio-mosaic-col" key={ci}>
          {column.map((tile) => (
            /* Sam obrazek: kafelek nic nie robi po kliknieciu. Case studies
               otwiera pasek klientow pod sciana, wiec tresc nie znika. */
            <figure className="portfolio-mosaic-tile" key={tile.src}>
              <img
                src={tile.src}
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
                    : (lang === 'pl'
                        ? `${item.metric} wzrostu odwiedzin organicznych po 1 miesiącu.`
                        : `${item.metric} increase in organic visits after 1 month.`)}
                </p>
                <button type="button" className="portfolio-client-cta" onClick={() => setActiveModal(item)}>
                  {lang === 'pl' ? 'Zobacz case study' : 'View case study'} →
                </button>
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
              <a href="#kontakt" className="btn btn-primary" onClick={() => setActiveModal(null)}>
                Zamów stronę / SEO dla swojej firmy
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
