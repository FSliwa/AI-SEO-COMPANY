'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

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

/* One tile per real screenshot of a client site, captured at 1440x950 (desktop)
   and 390x900 (mobile) and cropped above each site's cookie banner. Heights
   differ on purpose: in a column layout that difference IS the mosaic. Order
   interleaves the three brands so no column shows the same site twice.

   Three tiles are not screenshots: where a client had two views of the same
   template (and the wall started repeating itself) the tile shows that
   client's real Search Console numbers instead — clicks, impressions, CTR and
   average position over the last 90 days, read on 23.08.2026. Proof beats
   another picture of the same page. */
const MOSAIC = [
  { src: '/projects/mosaic/madame-1.webp', clientId: 1, w: 1200, h: 542, alt: 'Strona główna restauracji Madame Thai — sekcja powitalna z rezerwacją stolika', altEn: 'Madame Thai restaurant homepage — hero section with table booking' },
  { src: '/projects/mosaic/staniax-1.webp', clientId: 2, w: 1200, h: 792, alt: 'Galeria realizacji metalizacji próżniowej na stronie B2B Staniax', altEn: 'Vacuum metallization project gallery on the Staniax B2B site' },
  { src: '/projects/mosaic/asebot-1.webp', clientId: 3, w: 1200, h: 667, alt: 'Sekcja materiałów i dokumentacji na platformie ASE-BOT', altEn: 'Resources and documentation section of the ASE-BOT platform' },
  { src: '/projects/mosaic/madame-m.webp', clientId: 1, w: 468, h: 372, alt: 'Widok mobilny strony restauracji Madame Thai', altEn: 'Madame Thai restaurant site on a phone' },
  { src: '/projects/mosaic/staniax-2.webp', clientId: 2, w: 1200, h: 542, alt: 'Baza wiedzy i aktualności na stronie B2B Staniax', altEn: 'Knowledge base and news section on the Staniax B2B site' },
  { src: '/projects/mosaic/asebot-2.webp', clientId: 3, w: 1200, h: 542, alt: 'Porównanie narzędzi tradingowych AI na platformie ASE-BOT', altEn: 'AI trading tools comparison on the ASE-BOT platform' },
  { src: '/projects/mosaic/madame-2.webp', clientId: 1, w: 1200, h: 500, alt: 'Formularz rezerwacji stolika na stronie restauracji Madame Thai', altEn: 'Table booking form on the Madame Thai restaurant site' },
  { src: '/projects/mosaic/staniax-m.webp', clientId: 2, w: 468, h: 372, alt: 'Widok mobilny strony B2B Staniax', altEn: 'Staniax B2B site on a phone' },
  { kind: 'gsc', key: 'gsc-3', clientId: 3, clicks: '28', impressions: '7,66 tys.', impressionsEn: '7.66K', ctr: '0,4%', ctrEn: '0.4%', position: '28,9', positionEn: '28.9' },
  { kind: 'gsc', key: 'gsc-1', clientId: 1, clicks: '175', impressions: '9,5 tys.', impressionsEn: '9.5K', ctr: '1,8%', ctrEn: '1.8%', position: '5,7', positionEn: '5.7' },
  { kind: 'gsc', key: 'gsc-2', clientId: 2, clicks: '153', impressions: '6,24 tys.', impressionsEn: '6.24K', ctr: '2,5%', ctrEn: '2.5%', position: '10,3', positionEn: '10.3' },
  { src: '/projects/mosaic/asebot-m.webp', clientId: 3, w: 468, h: 372, alt: 'Widok mobilny platformy ASE-BOT', altEn: 'ASE-BOT platform on a phone' },
  { src: '/projects/mosaic/tql-1.webp', href: 'https://www.tql.pl/pl/uslugi', brand: 'TQL', w: 1200, h: 667, alt: 'Katalog wdrożeń norm ISO na stronie TQL', altEn: 'Catalogue of ISO implementations on the TQL site' },
  { src: '/projects/mosaic/tql-2.webp', href: 'https://www.tql.pl/pl/cennik', brand: 'TQL', w: 1200, h: 542, alt: 'Cennik wdrożeń ISO na stronie TQL', altEn: 'ISO implementation pricing on the TQL site' },
  { src: '/projects/mosaic/tql-3.webp', href: 'https://www.tql.pl/pl/o-mnie', brand: 'TQL', w: 1200, h: 583, alt: 'Strona audytora wiodącego ISO w serwisie TQL', altEn: 'Lead ISO auditor page on the TQL site' },
  { src: '/projects/mosaic/tql-m.webp', href: 'https://www.tql.pl/pl', brand: 'TQL', w: 468, h: 372, alt: 'Widok mobilny strony TQL', altEn: 'TQL site on a phone' }
];

export default function Portfolio() {
  const [activeModal, setActiveModal] = useState(null);
  const lang = useLocale();

  return (
    <section className="portfolio" id="portfolio" style={{ background: '#F5F5F7', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Top Header Row */}
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'NASZE WYNIKI' : 'OUR RESULTS'}
          </div>
          <h2 style={{ color: '#1D1D1F', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', margin: '1rem 0' }}>
            {lang === 'pl' ? 'Odkryj nowości naszych klientów' : 'Explore what’s new for our clients'}
          </h2>
          <p style={{ color: '#6E6E73', fontSize: '1.25rem', fontWeight: 500 }}>
            {lang === 'pl' ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów.' : 'Explore analytics-backed growth metrics across our client case studies.'}
          </p>
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
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', background: '#0B1220', padding: '3.5rem 0 3rem' }}>
        <div className="portfolio-mosaic">
          {MOSAIC.map((tile) => {
            const item = realizedWebsites.find((p) => p.id === tile.clientId);

            /* Tiles for a site we have no case study written for open the live
               site instead of a modal. Rather that than invent a case study. */
            if (tile.href) {
              return (
                <a
                  key={tile.src}
                  className="portfolio-mosaic-tile"
                  href={tile.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={tile.src}
                    alt={lang === 'pl' ? tile.alt : tile.altEn}
                    width={tile.w}
                    height={tile.h}
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="portfolio-mosaic-overlay">
                    <span className="portfolio-mosaic-brand">{tile.brand}</span>
                    <span className="portfolio-mosaic-metric">
                      {lang === 'pl' ? 'zobacz stronę ↗' : 'view site ↗'}
                    </span>
                  </span>
                </a>
              );
            }

            if (tile.kind === 'gsc') {
              return (
                <button
                  key={tile.key}
                  type="button"
                  className="portfolio-mosaic-tile portfolio-gsc"
                  onClick={() => setActiveModal(item)}
                  aria-label={`${item.brandName} — ${lang === 'pl' ? 'wyniki w Google Search Console, zobacz case study' : 'Google Search Console results, view case study'}`}
                >
                  <span className="portfolio-gsc-source">Google Search Console · {lang === 'pl' ? '90 dni' : '90 days'}</span>
                  <span className="portfolio-gsc-brand">{item.brandName}</span>
                  <span className="portfolio-gsc-grid">
                    <span>
                      <b>{tile.clicks}</b>
                      {lang === 'pl' ? 'kliknięcia' : 'clicks'}
                    </span>
                    <span>
                      <b>{lang === 'pl' ? tile.impressions : tile.impressionsEn}</b>
                      {lang === 'pl' ? 'wyświetleń' : 'impressions'}
                    </span>
                    <span>
                      <b>{lang === 'pl' ? tile.ctr : tile.ctrEn}</b>
                      CTR
                    </span>
                    <span className="portfolio-gsc-hero">
                      <b>{lang === 'pl' ? tile.position : tile.positionEn}</b>
                      {lang === 'pl' ? 'średnia pozycja' : 'average position'}
                    </span>
                  </span>
                </button>
              );
            }

            return (
              <button
                key={tile.src}
                type="button"
                className="portfolio-mosaic-tile"
                onClick={() => setActiveModal(item)}
                aria-label={`${item.brandName} — ${lang === 'pl' ? 'zobacz case study' : 'view case study'}`}
              >
                <img
                  src={tile.src}
                  alt={lang === 'pl' ? tile.alt : tile.altEn}
                  width={tile.w}
                  height={tile.h}
                  loading="lazy"
                  decoding="async"
                />
                <span className="portfolio-mosaic-overlay">
                  <span className="portfolio-mosaic-brand">{item.brandName}</span>
                  <span className="portfolio-mosaic-metric">{item.metric}</span>
                </span>
              </button>
            );
          })}
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
