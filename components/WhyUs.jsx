'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { zachowaniePrzewijania } from '@/lib/ruch';

function CountUpMetric({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    const match = value.match(/([\+]*)([0-9\.]+)(.*)/);
    if (!match) return;
    const prefix = match[1] || '';
    const targetNum = parseFloat(match[2]);
    const suffix = match[3] || '';

    const duration = 1200;
    let startTime = null;

    const animateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentVal = Math.floor(easeProgress * targetNum);

      setDisplayValue(`${prefix}${currentVal}${suffix}`);

      if (progress < 1) {
        requestAnimationFrame(animateCount);
      } else {
        setDisplayValue(value);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          requestAnimationFrame(animateCount);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function WhyUs({ isMainContent = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [najechane, setNajechane] = useState(false);
  const lang = useLocale();

  // Ogranicz ruch (05.10.2026): pomiar przy prefers-reduced-motion: reduce
  // pokazal przejscie slajdu co ok. 5,1 s mimo ustawienia - interwal nie
  // sprawdzal preferencji. Startowy stan zostaje true (tak renderuje serwer,
  // bez rozjazdu hydratacji), a efekt po zamontowaniu wylacza autoodtwarzanie
  // i reaguje tez na zmiane ustawienia w trakcie wizyty. Przycisk "Wznow"
  // nadal pozwala wlaczyc je swiadomie.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.matches) setIsAutoplay(false);
    const naZmiane = (e) => { if (e.matches) setIsAutoplay(false); };
    mq.addEventListener('change', naZmiane);
    return () => mq.removeEventListener('change', naZmiane);
  }, []);

  // Fokus klawiatury w sekcji (strzalki, kropki, sam kontener przewijania)
  // trwale zatrzymuje rotacje, jak we wzorcu Carousel z WAI-ARIA APG - wznawia
  // ja tylko przycisk. Pomiar 05.10.2026: fokus na kropce nie zatrzymywal
  // przewijania. Klik mysza tez ustawia fokus w Chrome, ale bez :focus-visible,
  // wiec go pomijamy - mysz obsluguje wstrzymanie przy najechaniu.
  const zatrzymajPrzyFokusie = (e) => {
    if (e.target.closest('[data-autoplay-toggle]')) return;
    let zKlawiatury = true;
    try { zKlawiatury = e.target.matches(':focus-visible'); } catch { /* brak :focus-visible - traktujemy jak klawiature */ }
    if (zKlawiatury) setIsAutoplay(false);
  };

  const Wrapper = isMainContent ? 'section' : 'aside';
  const wrapperProps = isMainContent ? {} : { 'data-nosnippet': 'true', 'aria-label': lang === 'pl' ? 'Dlaczego my' : 'Why us' };

  const whyUsCards = [
    {
      id: 1,
      // 29.10.2026 (D3): karty z liczbami bez zrodla (81%, +80%, +23%, +310%) zastapione
      // panelem klienta i danymi z Google Search Console z wpisu "Wyniki wdrozen SEO 2026".
      tag: lang === 'pl' ? 'PANEL KLIENTA' : 'CLIENT PORTAL',
      metric: '24/7',
      title: lang === 'pl' ? 'Wyniki widoczne codziennie' : 'Results you can see every day',
      description: lang === 'pl' 
        ? 'Każdy klient dostaje panel z danymi z Google Search Console, zapytaniami z formularza i telefonu, dziennikiem naszych prac i opisem każdej zmiany kodu strony. Widzisz wzrost zapytań i to, za co płacisz, zanim przyjdzie raport miesięczny.'
        : 'Partnering with a professional SEO company and marketing agency is a critical step for growth. Every client gets a 24/7 portal with Google Search Console data, form and phone enquiries, a log of our work and a plain-language summary of every change to the site.',
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      tag: lang === 'pl' ? 'SEO LOKALNE' : 'LOCAL SEO',
      metric: '187',
      title: lang === 'pl' ? 'Wzrost widoczności lokalnej restauracji' : 'Local visibility growth for a restaurant',
      description: lang === 'pl'
        ? 'Madame Thai, nowa strona lokalnej restauracji: 187 kliknięć i 10,1 tys. wyświetleń w Google w trzy miesiące (Google Search Console, stan na sierpień 2026). W gastronomii wzrost napędzają zapytania lokalne i Mapy.'
        : 'Most search engine optimisation companies stop at rankings and leave identity to somebody else; we treat the two as one project. Madame Thai, a new website for a local restaurant: 187 clicks and 10.1k Google impressions in three months (Google Search Console, as of August 2026).',
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      tag: lang === 'pl' ? 'B2B OD ZERA' : 'B2B FROM ZERO',
      metric: '152',
      title: lang === 'pl' ? 'Wzrost ruchu producenta B2B' : 'Traffic growth for a B2B manufacturer',
      description: lang === 'pl'
        ? 'Staniax, producent z branży metalizacji próżniowej: od zerowej widoczności do 152 kliknięć i 6,34 tys. wyświetleń w trzy miesiące. Wzrost przyszedł z treści odpowiadających na pytania klientów przemysłowych, a nie z ogólnych fraz, na które młoda domena nie ma szans.'
        : 'Merely being online is not enough. Unlike traditional SEO firms, we provide SEO for companies that combines advanced optimization with conversion psychology. Staniax, a vacuum metallising manufacturer: from zero visibility to 152 clicks and 6.34k impressions in three months.',
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      tag: lang === 'pl' ? 'NOWA DOMENA' : 'NEW DOMAIN',
      metric: lang === 'pl' ? '28 dni' : '28 days',
      title: lang === 'pl' ? 'Dynamiczny wzrost widoczności nowej strony' : 'Dynamic visibility growth for a new domain',
      description: lang === 'pl'
        ? 'TQL, świeżo uruchomiona strona firmy wdrażającej normy ISO: pierwsze 296 wyświetleń i średnia pozycja 34,6 w 28 dni od startu. Optymalizujemy intencjonalne frazy komercyjne, dostarczając klientów z Google gotowych do zakupu.'
        : 'We meticulously optimize for high-intent commercial keywords. As one of the top SEO optimization companies, we drive qualified buyers directly from Google. TQL, a freshly launched ISO consultancy website: its first 296 impressions and an average position of 34.6 within 28 days of launch.',
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      tag: lang === 'pl' ? 'WYDAJNOŚĆ I UX' : 'PERFORMANCE & UX',
      metric: '99/100',
      title: lang === 'pl' ? 'Błyskawiczna wydajność i ocena Google' : 'Lightning performance & Google score',
      description: lang === 'pl'
        ? 'Eliminujemy opóźnienia, dostarczając strony ładujące się w ułamku sekundy, co obniża wskaźnik odrzuceń do minimum. Nasze strony ofertowe mają 98–99/100 w Lighthouse na telefonie (pomiar z 24.09.2026).'
        : 'Page speed is where businesses and search engine optimization agencies lose most rankings, so we treat it as a core deliverable: we eliminate frustrating loading delays, serving split-second optimized web pages that drastically reduce bounce rates. Our advanced caching strategies and streamlined code architectures ensure your site passes all Core Web Vitals with flying colors. Our own service pages score 98–99/100 in mobile Lighthouse (measured on 24 September 2026).',
      bgVisual: 'linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(245, 245, 247, 0.4))'
    }
  ];

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.whyus-card-item');
    if (!cards || !cards.length) return;

    // Fix for large padding: if scrolled to the very left edge, always select the first item
    if (container.scrollLeft <= 20) {
      setActiveIndex(0);
      return;
    }

    // If scrolled to the very right edge, always select the last item
    // Adding 20px tolerance for sub-pixel rendering differences
    if (Math.ceil(container.scrollLeft + container.clientWidth) >= container.scrollWidth - 20) {
      setActiveIndex(whyUsCards.length - 1);
      return;
    }

    const containerRect = container.getBoundingClientRect();
    const containerCenterX = containerRect.left + containerRect.width / 2;

    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardRect = card.getBoundingClientRect();
      const cardCenterX = cardRect.left + cardRect.width / 2;
      const distance = Math.abs(containerCenterX - cardCenterX);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    setActiveIndex(closestIndex);
  };

  const scrollTo = (index) => {
    const container = document.getElementById('whyus-carousel');
    if (container) {
      const cards = container.querySelectorAll('.whyus-card-item');
      if (cards[index]) {
        const containerRect = container.getBoundingClientRect();
        const cardRect = cards[index].getBoundingClientRect();
        const scrollOffset = cardRect.left - containerRect.left + container.scrollLeft - (containerRect.width - cardRect.width) / 2;
        container.scrollTo({
          left: scrollOffset,
          behavior: zachowaniePrzewijania()
        });
        setActiveIndex(index);
      }
    }
  };

  const scrollPrev = () => {
    const prevIndex = Math.max(0, activeIndex - 1);
    scrollTo(prevIndex);
  };

  const scrollNext = () => {
    const nextIndex = Math.min(whyUsCards.length - 1, activeIndex + 1);
    scrollTo(nextIndex);
  };

  // Najechanie mysza wstrzymuje przewijanie tylko na czas najechania (pomiar
  // 05.10.2026: przy :hover slajdy dalej przesuwaly sie co 5 s).
  useEffect(() => {
    if (!isAutoplay || najechane) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % whyUsCards.length;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, najechane, activeIndex]);

  return (
    <Wrapper className="why-us" id="why-us" style={{ background: '#F5F5F7', padding: '7rem 0', color: '#1D1D1F' }} onFocus={zatrzymajPrzyFokusie} {...wrapperProps}>
      <div className="container" style={{ maxWidth: '1280px' }}>
        
        {/* Top Header Row with Apple-style Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <Reveal className="section-header" style={{ maxWidth: '720px', margin: 0 }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'DLACZEGO MY' : 'WHY US'}
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 700, letterSpacing: '-0.04em', lineHeight: 1.15, color: '#1D1D1F', marginBottom: '1rem' }}>
              {lang === 'pl' ? 'Twój projekt, strony i skuteczne pozycjonowanie – agencja marketingowa nastawiona na wyniki' : 'An SEO and marketing agency for companies that measure pipeline, not rankings'}
            </h2>
            {lang === 'en' && (
              <h2 style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                Selected B2B projects delivered end to end — strategy, build and search visibility.
              </h2>
            )}
            <p style={{ fontSize: '1.2rem', color: '#6E6E73', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
              {lang === 'pl' ? 'Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych. Agencja SEO Warszawa to nasz adres, nie slogan — jako agencja marketingowa prowadzimy projekt, strony i pozycjonowanie w jednym zespole.' : 'We craft digital solutions backed by hard analytics and buyer psychology. Whether you call us an SEO firm or a search engine optimization agency, our job is the same: measurable pipeline growth.'}
            </p>
          </Reveal>

          {/* Top Right Apple Circular Arrow Buttons (from Apple Screenshot) */}
          <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
            <button 
              onClick={scrollPrev}
              disabled={activeIndex === 0}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                opacity: activeIndex === 0 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label={lang === 'pl' ? 'Poprzedni slajd' : 'Previous slide'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button 
              onClick={scrollNext}
              disabled={activeIndex === whyUsCards.length - 1}
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#E8E8ED',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === whyUsCards.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === whyUsCards.length - 1 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label={lang === 'pl' ? 'Następny slajd' : 'Next slide'}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Apple Productivity Carousel (Full Screen Width, aligned flush with container above) */}
      {/* Najechanie liczymy na tym divie, a nie na #whyus-carousel: obejmuje
          karty, kropki i przycisk pauzy, wiec przewijanie nie rusza sie spod
          kursora w drodze do kropki (05.10.2026). */}
      <div
        style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}
        onMouseEnter={() => setNajechane(true)}
        onMouseLeave={() => setNajechane(false)}
      >
        <RevealStagger 
          id="whyus-carousel"
          onScroll={handleScroll}
          style={{ 
            display: 'flex', 
            alignItems: 'stretch',
            overflowX: 'auto', 
            scrollSnapType: 'x mandatory', 
            scrollbarWidth: 'none', 
            msOverflowStyle: 'none', 
            gap: '1.5rem',
            paddingBottom: '2rem',
            paddingLeft: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)',
            paddingRight: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)',
            scrollPaddingLeft: 'calc((100vw - min(1280px, 100vw - 4rem)) / 2)'
          }}
        >
          <style jsx>{`
            #whyus-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {whyUsCards.map((item, idx) => (
            <RevealItem 
              key={item.id} 
              className="whyus-card-item"
              style={{
                flex: idx === 0 ? '0 0 min(85vw, 580px)' : '0 0 min(75vw, 420px)', // Card 1 is wider like Apple screenshot!
                scrollSnapAlign: 'center',
                background: '#FFFFFF', // Pure white card background
                borderRadius: '28px',
                padding: '2.5rem 2.25rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
                minHeight: '480px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.03)',
                border: '1px solid rgba(0,0,0,0.05)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Top Graphic / Stat Visual Area */}
              <div style={{ 
                width: '100%', 
                height: '210px', 
                flexShrink: 0,
                borderRadius: '20px', 
                background: item.bgVisual, 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                padding: '1.25rem var(--whyus-tag-pad, 1rem)',
                border: '1px solid rgba(0,0,0,0.03)'
              }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-primary)', marginBottom: '0.75rem', textAlign: 'center', whiteSpace: 'normal' }}>
                  {item.tag}
                </div>
                <motion.div 
                  animate={{ scale: [1, 1.03, 1] }}
                  transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity }}
                  style={{ fontSize: 'clamp(4rem, 6.5vw, 6rem)', fontWeight: 800, color: '#1D1D1F', lineHeight: 1.1, letterSpacing: '-0.03em', whiteSpace: 'nowrap', textAlign: 'center' }}
                >
                  <CountUpMetric value={item.metric} />
                </motion.div>
              </div>

              {/* Bottom Text Area matching Apple's formatting */}
              <div style={{ marginTop: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
                <h3 style={{ fontSize: '1.18rem', fontWeight: 700, color: '#1D1D1F', lineHeight: 1.35, marginBottom: '0.5rem' }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#424245', fontWeight: 400, lineHeight: 1.55, margin: 0 }}>
                  {item.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Bottom Pagination & Play Controls (1:1 Apple Proportions from Screenshot) */}
        <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
          {/* Dots Pill Container */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
            {/* Kropka ma 8 px wysokosci i tyle ma zostac - to jest ten wyglad.
                Obszar dotyku powieksza pseudoelement .whyus-dot::after do 44 px
                (prog ze skilla viewports). Nie padding: button ma animowana
                szerokosc 8->36 px, a padding wszedlby do tej samej skrzynki
                i rozjechal animacje. */}
            {whyUsCards.map((_, idx) => (
              <motion.button
                key={idx}
                className="whyus-dot"
                layout
                initial={false}
                onClick={() => scrollTo(idx)}
                animate={{
                  width: activeIndex === idx ? '36px' : '8px',
                  backgroundColor: activeIndex === idx ? '#1D1D1F' : '#B0B0B5',
                  borderRadius: activeIndex === idx ? '8px' : '50%'
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 30
                }}
                style={{
                  height: '8px',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer'
                }}
                aria-label={lang === 'pl' ? `Przejdź do slajdu ${idx + 1}` : `Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Standalone Circular Play/Pause Button (44px) */}
          {/* Etykieta zmienia sie ze stanem, dlatego bez aria-pressed: APG nie
              pozwala laczyc obu (czytnik uslyszalby "Wznow przewijanie,
              wcisniety"). data-autoplay-toggle wylacza ten przycisk z
              zatrzymania przy fokusie, inaczej nie daloby sie nim wznowic
              rotacji z klawiatury (05.10.2026). */}
          <button
            data-autoplay-toggle=""
            onClick={() => setIsAutoplay(!isAutoplay)}
            style={{ 
              background: '#E8E8ED', 
              border: 'none', 
              borderRadius: '50%', 
              width: '44px', 
              height: '44px', 
              cursor: 'pointer', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              padding: '0',
              transition: 'background 0.2s ease, transform 0.2s ease'
            }}
            aria-label={isAutoplay
              ? (lang === 'pl' ? 'Zatrzymaj przewijanie' : 'Pause')
              : (lang === 'pl' ? 'Wznów przewijanie' : 'Play')}
          >
            {isAutoplay ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none" style={{ marginLeft: '2px' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </Reveal>

      </div>
    </Wrapper>
  );
}
