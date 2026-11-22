'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { zachowaniePrzewijania } from '@/lib/ruch';

function CountUpMetric({ value }) {
  const [displayValue, setDisplayValue] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    if (typeof value !== 'string' || value.includes('/')) return undefined;
    const match = value.match(/([\+]*)([0-9\.]+)(.*)/);
    if (!match) return undefined;
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

  if (typeof value === 'string' && value.includes('/')) {
    return <span>{value}</span>;
  }

  return <span ref={ref}>{displayValue}</span>;
}

export default function WhyUs({ isMainContent = false }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [najechane, setNajechane] = useState(false);
  const lang = useLocale();
  const t3 = (pl, en, de) => (lang === 'de' ? de : lang === 'pl' ? pl : en);

  // Ogranicz ruch (05.10.2026): pomiar przy prefers-reduced-motion: reduce
  // pokazal przejscie slajdu co ok. 5,1 s mimo ustawienia - interwal nie
  // sprawdzal preferencji. Startowy stan zostaje true (tak renderuje serwer,
  // bez rozjazdu hydratacji), a efekt po zamontowaniu wylacza autoodtwarzanie
  // i reaguje tez na zmiane ustawienia w trakcie wizyty. Przycisk "Wznow"
  // nadal pozwala wlaczyc je swiadomie.
  useEffect(() => {
    if (!window.matchMedia) return;
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Jednorazowe wylaczenie autoodtwarzania po zamontowaniu: stan startowy musi byc true (zgodnosc z SSR).
    // eslint-disable-next-line react-hooks/set-state-in-effect
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
  const wrapperProps = isMainContent ? {} : { 'data-nosnippet': 'true', 'aria-label': t3('Dlaczego my', 'Why us', 'Warum wir') };

  const whyUsCards = [
    {
      id: 1,
      // 29.10.2026 (D3): karty z liczbami bez zrodla (81%, +80%, +23%, +310%) zastapione
      // panelem klienta i danymi z Google Search Console z wpisu "Wyniki wdrozen SEO 2026".
      kickerNum: '01',
      kickerKat: t3('ARCHITEKTURA', 'ARCHITECTURE', 'ARCHITEKTUR'),
      mikro: lang === 'de'
        ? ['SLA-Garantie: 99,9%', 'Reaktionszeit: <15 Min.']
        : lang === 'pl'
          ? ['Gwarancja SLA: 99,9%', 'Czas reakcji: <15 min']
          : ['SLA Guarantee: 99.9%', 'Response: <15 min'],
      tag: t3('PANEL KLIENTA', 'CLIENT PORTAL', 'KUNDENPORTAL'),
      metric: '24/7',
      title: t3('Wyniki widoczne codziennie', 'Results you can see every day', 'Ergebnisse täglich im Blick'),
      description: t3(
        'Każdy klient dostaje panel z danymi z Google Search Console, zapytaniami z formularza i telefonu, dziennikiem naszych prac i opisem każdej zmiany kodu strony. Widzisz wzrost zapytań i to, za co płacisz, zanim przyjdzie raport miesięczny.',
        'Partnering with a professional SEO company and marketing agency is a critical step for growth. Every client gets a 24/7 portal with Google Search Console data, form and phone enquiries, a log of our work and a plain-language summary of every change to the site.',
        'Jeder Kunde erhält ab dem ersten Tag ein 24/7-Kundenportal mit echten Daten aus der Google Search Console, Anfragen per Formular und Telefon, unserem Arbeitsprotokoll mit Datum und verständlichen Beschreibungen jeder Code-Änderung (Oberfläche auf Polnisch und Englisch).'
      ),
      bgVisual: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 2,
      kickerNum: '02',
      kickerKat: t3('TRANSPARENTNOŚĆ', 'TRANSPARENCY', 'TRANSPARENZ'),
      mikro: lang === 'de'
        ? ['Quelle: Search Console', 'Messung: Täglich']
        : lang === 'pl'
          ? ['Źródło: Search Console', 'Pomiar: Codzienny']
          : ['Source: Search Console', 'Tracking: Daily'],
      tag: t3('SEO LOKALNE', 'LOCAL SEO', 'LOKALES SEO'),
      metric: '187',
      title: t3('Wzrost widoczności lokalnej restauracji', 'Local visibility growth for a restaurant', 'Lokales Sichtbarkeitswachstum für ein Restaurant'),
      description: t3(
        'Madame Thai, nowa strona lokalnej restauracji: 187 kliknięć i 10,1 tys. wyświetleń w Google w 26 dni (27.07-21.08.2026, Google Search Console). W gastronomii wzrost napędzają zapytania lokalne i Mapy.',
        'Most search engine optimisation companies stop at rankings and leave identity to somebody else; we treat the two as one project. Madame Thai, a new website for a local restaurant: 187 clicks and 10.1k Google impressions in 26 days (27 Jul-21 Aug 2026, Google Search Console).',
        'Madame Thai, neue Website eines lokalen Restaurants: 187 Klicks und 10.100 Impressionen in Google innerhalb von 26 Tagen (27.07.-21.08.2026, Google Search Console). Lokale Suchanfragen und Google Maps treiben die Sichtbarkeit vom Start weg.'
      ),
      bgVisual: 'linear-gradient(135deg, rgba(56, 189, 248, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 3,
      kickerNum: '03',
      kickerKat: t3('TECHNOLOGIA', 'TECHNOLOGY', 'TECHNOLOGIE'),
      mikro: lang === 'de'
        ? ['Strategie: B2B-Cluster', 'Daten: GSC Live']
        : lang === 'pl'
          ? ['Strategia: Klastry B2B', 'Dane: GSC Live']
          : ['Strategy: B2B Clusters', 'Data: GSC Live'],
      tag: t3('B2B OD ZERA', 'B2B FROM ZERO', 'B2B VON NULL'),
      metric: '152',
      title: t3('Wzrost widoczności producenta B2B', 'Visibility growth for a B2B manufacturer', 'Sichtbarkeitsaufbau für einen B2B-Hersteller'),
      description: t3(
        'Staniax, producent z branży metalizacji próżniowej: od zerowej widoczności do 152 kliknięć i 6,34 tys. wyświetleń w 92 dni (22.05-21.08.2026); tygodniowe wyświetlenia wzrosły ze 103 do ok. 750 przy 10-15 kliknięciach tygodniowo. Wzrost widoczności przyszedł z treści odpowiadających na pytania klientów przemysłowych, a nie z ogólnych fraz, na które młoda domena nie ma szans.',
        'Merely being online is not enough. Unlike traditional SEO firms, we provide SEO for companies that combines advanced optimization with conversion psychology. Staniax, a vacuum metallising manufacturer: from zero visibility to 152 clicks and 6.34k impressions in 92 days (22 May-21 Aug 2026), with weekly impressions rising from 103 to about 750 at roughly 10-15 clicks a week.',
        'Staniax, B2B-Hersteller für Vakuummetallisierung: von null Sichtbarkeit auf 152 Klicks und 6.340 Impressionen in 92 Tagen (22.05.-21.08.2026); die wöchentlichen Impressionen stiegen von 103 auf rund 750 bei 10-15 Klicks pro Woche.'
      ),
      bgVisual: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 4,
      kickerNum: '04',
      kickerKat: t3('INTENCJA ZAKUPOWA', 'BUYER INTENT', 'KAUFINTENTION'),
      mikro: lang === 'de'
        ? ['Erste Positionen: 18 Tage', 'Indexierung: IndexNow']
        : lang === 'pl'
          ? ['Pierwsze pozycje: 18 dni', 'Indeksacja: IndexNow']
          : ['First rankings: 18 days', 'Indexing: IndexNow'],
      tag: t3('NOWA DOMENA', 'NEW DOMAIN', 'NEUE DOMAIN'),
      metric: t3('18 dni', '18 days', '18 Tage'),
      title: t3('Dynamiczny wzrost widoczności nowej strony', 'Dynamic visibility growth for a new domain', 'Schnelle Indexierung einer neuen Domain'),
      description: t3(
        'TQL, świeżo uruchomiona strona firmy wdrażającej normy ISO: pierwsze 296 wyświetleń i średnia pozycja 34,6 w pierwszych 18 dniach od startu (5-22.08.2026). Optymalizujemy intencjonalne frazy komercyjne, dostarczając klientów z Google gotowych do zakupu.',
        'We meticulously optimize for high-intent commercial keywords. As one of the top SEO optimization companies, we drive qualified buyers directly from Google. TQL, a freshly launched ISO consultancy website: its first 296 impressions and an average position of 34.6 in the first 18 days after launch (5-22 Aug 2026).',
        'TQL, neu gestartete Website einer ISO-Beratung: die ersten 296 Impressionen und eine durchschnittliche Position von 34,6 bereits in den ersten 18 Tagen nach dem Start (05.-22.08.2026) dank klarer kaufnaher Themenstruktur.'
      ),
      bgVisual: 'linear-gradient(135deg, rgba(34, 197, 94, 0.08), rgba(245, 245, 247, 0.4))'
    },
    {
      id: 5,
      kickerNum: '05',
      kickerKat: t3('INFRASTRUKTURA', 'INFRASTRUCTURE', 'INFRASTRUKTUR'),
      mikro: lang === 'de'
        ? ['INP ≤ 200 ms · CLS ≤ 0,1', 'Uptime: 99,99%']
        : lang === 'pl'
          ? ['INP ≤ 200 ms · CLS ≤ 0,1', 'Uptime: 99,99%']
          : ['INP ≤ 200 ms · CLS ≤ 0.1', 'Uptime: 99.99%'],
      tag: t3('WYDAJNOŚĆ I UX', 'PERFORMANCE & UX', 'PERFORMANCE & UX'),
      metric: lang === 'en' ? 'LCP ≤ 2.5 s' : 'LCP ≤ 2,5 s',
      title: t3('Błyskawiczna wydajność i ocena Google', 'Lightning performance & Google score', 'Schnelle Ladezeiten & Core Web Vitals'),
      description: t3(
        'Eliminujemy opóźnienia, dostarczając strony ładujące się w ułamku sekundy, co obniża wskaźnik odrzuceń do minimum. Celujemy w progi Google dla dobrego wyniku: LCP do 2,5 s, INP do 200 ms, CLS do 0,1 (dane polowe). Nasze strony ofertowe uzyskały w teście laboratoryjnym Lighthouse na telefonie z 19.11.2026 (mediana z trzech pomiarów) 81-94/100; do oceny służą dane polowe, Lighthouse do debugowania.',
        'Page speed is where businesses and search engine optimization agencies lose most rankings, so we treat it as a core deliverable: we eliminate frustrating loading delays, serving split-second optimized web pages that drastically reduce bounce rates. Our advanced caching strategies and streamlined code architectures help your site meet the Core Web Vitals thresholds: LCP up to 2.5 s, INP up to 200 ms, CLS up to 0.1 (field data). Lab test with Lighthouse on a phone, 19 November 2026 (median of three runs): 81-94/100 on our own pages; field data is used for assessment and Lighthouse for debugging.',
        'Wir optimieren konsequent auf die offiziellen Google-Schwellenwerte: LCP bis 2,5 s, INP bis 200 ms, CLS bis 0,1 (Felddaten). Im mobilen Lighthouse-Labortest vom 19.11.2026 (Median aus drei Läufen) erreichten unsere Angebotsseiten 81-94/100 Punkte.'
      ),
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
  const liczbaKartWhyUs = whyUsCards.length;
  useEffect(() => {
    if (!isAutoplay || najechane) return;
    const interval = setInterval(() => {
      const nextIndex = (activeIndex + 1) % liczbaKartWhyUs;
      scrollTo(nextIndex);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoplay, najechane, activeIndex, liczbaKartWhyUs]);

  return (
    <Wrapper className="why-us" id="why-us" data-kursor="obraz" data-petla="" style={{ background: 'var(--w-papier-2)', padding: '7rem 0', color: 'var(--w-tusz)' }} onFocus={zatrzymajPrzyFokusie} {...wrapperProps}>
      {/* 7.11.2026: mgla nad gorami w swicie (dekoracja, app/wyglad.css). */}
      <div className="mgla-dryf" aria-hidden="true"><span /></div>
      <div className="container">
        
        {/* Top Header Row with Apple-style Navigation Arrows */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem', flexWrap: 'wrap', gap: '2rem' }}>
          <Reveal className="section-header" style={{ maxWidth: '720px', margin: 0 }}>
            <div className="section-tag" style={{ color: 'var(--color-primary)', marginBottom: '1rem', fontWeight: 600 }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t3('DLACZEGO MY', 'WHY US', 'WARUM WIR')}
            </div>
            <h2 style={{ fontSize: 'clamp(2.2rem, 4.5vw, 3.8rem)', fontWeight: 500, letterSpacing: '-0.04em', lineHeight: 1.08, color: 'var(--w-tusz)', marginBottom: '1rem' }}>
              {t3(
                'Twój projekt, strony i skuteczne pozycjonowanie - agencja marketingowa nastawiona na wyniki',
                'An SEO and marketing agency for companies that measure pipeline, not rankings',
                'Messbare Sichtbarkeit in Google und KI-Systemen - belegt durch echte Projektdaten'
              )}
            </h2>
            {lang === 'en' && (
              <h2 style={{ fontSize: '1.2rem', color: 'var(--w-tusz-2)', fontWeight: 500, lineHeight: 1.6, margin: '0 0 1rem 0' }}>
                Selected B2B projects delivered end to end - strategy, build and search visibility.
              </h2>
            )}
            <p style={{ fontSize: '1.2rem', color: 'var(--w-tusz-2)', fontWeight: 500, lineHeight: 1.6, margin: 0 }}>
              {t3(
                'Tworzymy rozwiązania poparte twardymi danymi analitycznymi i psychologią podejmowania decyzji zakupowych. Agencja SEO Warszawa to nasz adres, nie slogan - jako agencja marketingowa prowadzimy projekt, strony i pozycjonowanie w jednym zespole.',
                'We craft digital solutions backed by hard analytics and buyer psychology. Whether you call us an SEO firm or a search engine optimization agency, our job is the same: measurable pipeline growth.',
                'Wir verbinden technisches SEO, Datenanalyse und Kaufpsychologie in einem festen Team - mit nachprüfbaren Zahlen aus der Google Search Console statt unverbindlicher Versprechen.'
              )}
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
                background: 'var(--w-papier-2)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === 0 ? 'default' : 'pointer',
                opacity: activeIndex === 0 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label={t3('Poprzedni slajd', 'Previous slide', 'Vorherige Karte')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
                background: 'var(--w-papier-2)',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: activeIndex === whyUsCards.length - 1 ? 'default' : 'pointer',
                opacity: activeIndex === whyUsCards.length - 1 ? 0.4 : 1,
                transition: 'all 0.2s ease'
              }}
              aria-label={t3('Następny slajd', 'Next slide', 'Nächste Karte')}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
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
            paddingLeft: 'calc((100vw - min(var(--container-width) - 48px, 100vw - 48px)) / 2)',
            paddingRight: 'calc((100vw - min(var(--container-width) - 48px, 100vw - 48px)) / 2)',
            scrollPaddingLeft: 'calc((100vw - min(var(--container-width) - 48px, 100vw - 48px)) / 2)'
          }}
        >
          <style jsx>{`
            #whyus-carousel::-webkit-scrollbar { display: none; }
          `}</style>
          
          {whyUsCards.map((item) => (
            <RevealItem 
              key={item.id} 
              className="whyus-card-item"
              style={{
                flex: '0 0 min(84vw, 400px)',
                scrollSnapAlign: 'center',
                background: 'var(--w-karta)',
                borderRadius: '24px',
                padding: '1.75rem 1.75rem 1.65rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: 'auto',
                boxShadow: 'none',
                border: '1px solid var(--w-linia)',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Compact Left-Aligned Metric Box (--w-papier-2, rx 16px) */}
              <div style={{ 
                width: '100%', 
                flexShrink: 0,
                borderRadius: '16px', 
                background: 'var(--w-papier-2)', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center', 
                alignItems: 'flex-start',
                gap: '6px',
                position: 'relative',
                overflow: 'hidden',
                padding: '16px 20px',
                border: '1px solid var(--w-linia)'
              }}>
                <div style={{ fontFamily: 'var(--w-mono)', fontSize: '0.72rem', fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--w-pomarancz-tekst)', textAlign: 'left', whiteSpace: 'normal' }}>
                  {item.tag}
                </div>
                {/* 18.11.2026 (plynnosc): puls liczby to animacja CSS (app/plynnosc.css), nie petla
                    framer-motion - ta zapisywala style inline w kazdej klatce na kazdej karcie, takze
                    poza ekranem (2000 zapisow na jedno przewiniecie strony). Wyglad i tempo bez zmian. */}
                <div
                  className="whyus-metric-puls"
                  style={{ fontSize: 'clamp(2.25rem, 3.4vw, 3rem)', fontWeight: 600, color: 'var(--w-pomarancz-gleboki)', lineHeight: 1.05, letterSpacing: '-0.045em', whiteSpace: 'nowrap', textAlign: 'left', fontVariantNumeric: 'tabular-nums' }}
                >
                  <CountUpMetric value={item.metric} />
                </div>
              </div>

              {/* Bottom Text Area + airSlate kicker & micro-metrics bar */}
              <div style={{ marginTop: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div className="whyus-kicker">
                    <span className="whyus-kicker-nr">{item.kickerNum}</span>
                    <span className="whyus-kicker-ukosnik" aria-hidden="true">/</span>
                    <span className="whyus-kicker-kat">{item.kickerKat}</span>
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--w-tusz)', lineHeight: 1.25, letterSpacing: '-0.025em', marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.94rem', color: 'var(--color-text-main)', fontWeight: 400, lineHeight: 1.55, margin: 0 }}>
                    {item.description}
                  </p>
                </div>
                <div className="whyus-mikro-pasek">
                  {item.mikro.map((m) => (
                    <span key={m} className="whyus-mikro-el">{m}</span>
                  ))}
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Bottom Pagination & Play Controls (1:1 Apple Proportions from Screenshot) */}
        <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
          {/* Dots Pill Container */}
          <div style={{ display: 'flex', gap: '12px', padding: '12px 24px', background: 'transparent', border: '1px solid var(--w-linia)', borderRadius: '30px', alignItems: 'center' }}>
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
                  backgroundColor: activeIndex === idx ? '#1E1E1E' : 'rgba(30,30,30,0.28)',
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
                aria-label={t3(`Przejdź do slajdu ${idx + 1}`, `Go to slide ${idx + 1}`, `Zu Karte ${idx + 1} wechseln`)}
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
              background: 'transparent', border: '1.5px solid var(--w-tusz)', color: 'var(--w-tusz)', 
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
              ? t3('Zatrzymaj przewijanie', 'Pause', 'Karussell anhalten')
              : t3('Wznów przewijanie', 'Play', 'Karussell fortsetzen')}
          >
            {isAutoplay ? (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '2px' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            )}
          </button>
        </Reveal>

      </div>
    </Wrapper>
  );
}
