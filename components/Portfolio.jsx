'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
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
    metric: '104.9%',
    metricSubtitle: 'increase in organic visits after 1 month.',
    gradient: 'linear-gradient(135deg, #818CF8, #38BDF8, #C084FC)',
    meshBg: 'radial-gradient(circle at 85% 50%, rgba(168, 85, 247, 0.45) 0%, rgba(56, 189, 248, 0.35) 40%, rgba(255, 255, 255, 1) 75%)',
    layout: 'center',
    rightVisual: 'single-large',
    largeImage: '/projects/madame-thai-full.png',
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
      image: '/projects/staniax.png',
      btnText: 'View Case Study'
    },
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
    rightVisual: 'phones',
    screens: [
      {
        title: 'AI Futures Trading',
        subtitle: 'Global Market Leader',
        tag: 'FINTECH',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-22px)'
      },
      {
        title: 'Unlock 4.8k impressions',
        subtitle: 'per quarter from zero',
        tag: 'SEO GROWTH',
        image: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(12px)',
        highlight: true
      },
      {
        title: 'Global CTR 4.62%',
        subtitle: 'On commercial keywords',
        tag: 'CONVERSION',
        image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-12px)'
      }
    ],
    details: `Case Study 2 — Hiperkonkurencyjny rynek zagraniczny (ase-bot.live):
- Skok od 0 do 4,8 tys. wyświetleń w kwartale (+8 113,8%) i wzrost w ostatnich 28 dniach o 244,7% (do 500 wyświetleń dziennie).
- Pozycjonowanie na trudne frazy komercywne: „ai futures trading” (pozycja 24 — krok od TOP 20), „best futures trading platforms” (pozycja 61).
- 2 tys. wyświetleń z USA. Strona główna osiąga CTR 4.62%. Link building i rozbudowa artykułów eksperckich pod rynek globalny.`
  }
];

export default function Portfolio() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeModal, setActiveModal] = useState(null);
  const { lang } = useLanguage();

  const handleScroll = (e) => {
    const container = e.target;
    const cards = container.querySelectorAll('.apple-card');
    if (!cards.length) return;

    const containerCenter = container.scrollLeft + container.clientWidth / 2;
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(containerCenter - cardCenter);
      if (distance < minDistance) {
        minDistance = distance;
        closestIndex = idx;
      }
    });

    if (closestIndex !== activeIndex) {
      setActiveIndex(closestIndex);
    }
  };

  const scrollTo = (index) => {
    const container = document.getElementById('apple-carousel');
    if (container) {
      const cards = container.querySelectorAll('.apple-card');
      if (cards[index]) {
        const targetScrollLeft = cards[index].offsetLeft - (container.clientWidth - cards[index].offsetWidth) / 2;
        container.scrollTo({
          left: targetScrollLeft,
          behavior: 'smooth'
        });
      }
    }
  };

  return (
    <section className="portfolio" id="portfolio" style={{ background: '#F5F5F7', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Top Header Row */}
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> OUR RESULTS
          </div>
          <h2 style={{ color: '#1D1D1F', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', margin: '1rem 0' }}>
            {lang === 'pl' ? 'Explore what’s new for our clients.' : 'Explore what’s new for our clients.'}
          </h2>
          <p style={{ color: '#6E6E73', fontSize: '1.25rem', fontWeight: 500 }}>
            {lang === 'pl' ? 'Zobacz wskaźniki wzrostu poparte twardymi danymi analitycznymi klientów.' : 'Analytics-backed growth metrics across our client case studies.'}
          </p>
        </Reveal>
      </div>

      {/* Apple-style Carousel (Full Screen Width) */}
      <div style={{ position: 'relative', width: '100vw', marginLeft: 'calc(-50vw + 50%)', overflow: 'hidden' }}>
        <RevealStagger 
            id="apple-carousel"
            onScroll={handleScroll}
            style={{ 
              display: 'flex', 
              overflowX: 'auto', 
              scrollSnapType: 'x mandatory', 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none', 
              gap: '1.5rem',
              paddingBottom: '2rem',
              paddingLeft: 'calc(50vw - min(42.5vw, 600px))',
              paddingRight: 'calc(50vw - min(42.5vw, 600px))',
              scrollPaddingLeft: 'calc(50vw - min(42.5vw, 600px))' // Centers the cards perfectly
            }}
          >
            <style jsx>{`
              #apple-carousel::-webkit-scrollbar { display: none; }
            `}</style>
            
            {realizedWebsites.map((item, index) => (
              <RevealItem 
                key={item.id} 
                className="apple-card"
                style={{
                  flex: '0 0 min(85vw, 1200px)', // Max width 1200px or 85% of screen
                  scrollSnapAlign: 'center',
                  background: '#000000', 
                  borderRadius: '36px',
                  padding: '4rem 3.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  minHeight: '600px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                
                {item.layout === 'center' ? (
                  <div style={{ zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', height: '100%', position: 'relative', width: '100%' }}>
                    {/* Top Header Text (Centered above screenshot, no button) */}
                    <div style={{ maxWidth: '680px', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '0.5rem', zIndex: 2 }}>
                      <div style={{ marginBottom: '1.25rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                      <div style={{ fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', fontWeight: 700, color: '#FFFFFF', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: '0' }}>
                        {item.metric} {item.metricSubtitle}
                      </div>
                    </div>

                    {/* Centered 80% Width Image anchored FLUSH to bottom edge during pulse animation */}
                    <motion.div 
                      animate={{ scaleY: [1, 1.03, 1] }}
                      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                      style={{ 
                        width: '80%', 
                        height: '320px', 
                        position: 'absolute',
                        bottom: '-4.1rem', // Flush with bottom card boundary
                        left: '10%',
                        transformOrigin: 'bottom center', // Ensures bottom ALWAYS stays flush with card bottom
                        borderTopLeftRadius: '24px', 
                        borderTopRightRadius: '24px', 
                        overflow: 'hidden', 
                        boxShadow: '0 -20px 60px rgba(0,0,0,0.9)', 
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderBottom: 'none',
                        zIndex: 1
                      }}
                    >
                      <img 
                        src={item.largeImage} 
                        alt={item.brandName} 
                        style={{ 
                          width: '100%', 
                          marginTop: '-75px', // Crops out browser Chrome/tabs UI at the top
                          height: 'calc(100% + 75px)', 
                          objectFit: 'cover', 
                          objectPosition: 'top' 
                        }} 
                      />
                    </motion.div>
                  </div>
                ) : item.layout === 'right-side' ? (
                  <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', width: '100%', position: 'relative' }}>
                    {/* Left Content (Staniax: Clean Headline filling space, no bullets, no button) */}
                    <div style={{ flex: '0 0 50%', maxWidth: '540px', display: 'flex', flexDirection: 'column', justifyContent: 'center', zIndex: 2 }}>
                      <div style={{ marginBottom: '1.5rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                      
                      {/* Large Headline filling space like Madame Thai */}
                      <div style={{ 
                        fontSize: 'clamp(2.5rem, 4.2vw, 3.8rem)', 
                        fontWeight: 700, 
                        color: '#FFFFFF', 
                        letterSpacing: '-0.035em', 
                        lineHeight: 1.15 
                      }}>
                        2.8k+ organic search impressions from zero visibility.
                      </div>
                    </div>

                    {/* Image coming out from the right side with 90% height and 58% width of card */}
                    <motion.div 
                      animate={{ x: [0, 8, 0] }}
                      transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                      style={{ 
                        position: 'absolute',
                        right: '-1.5rem', 
                        top: '5%',
                        height: '90%', 
                        width: '58%',
                        borderTopLeftRadius: '24px',
                        borderBottomLeftRadius: '24px',
                        overflow: 'hidden',
                        boxShadow: '-20px 0 50px rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.18)',
                        borderRight: 'none',
                        zIndex: 1
                      }}
                    >
                      <img src={item.desktopCard.image} alt={item.brandName} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'left center' }} />
                    </motion.div>
                  </div>
                ) : (
                  <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem', height: '100%', width: '100%' }}>
                    
                    {/* Left Content */}
                    <div style={{ flex: '1 1 400px', maxWidth: '500px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                      <div style={{ marginBottom: '2rem', filter: 'brightness(0) invert(1)', opacity: 0.9 }}>
                        {item.brandLogo}
                      </div>
                      
                      <div style={{ marginBottom: '3rem' }}>
                        <div style={{ 
                          fontSize: 'clamp(4.5rem, 8vw, 7rem)', 
                          fontWeight: 700, 
                          lineHeight: 1, 
                          letterSpacing: '-0.04em',
                          color: '#FFFFFF', // Pure white, no gradient
                          marginBottom: '1rem'
                        }}>
                          {item.metric}
                        </div>
                        <div style={{ fontSize: '1.25rem', color: '#A1A1AA', fontWeight: 500, lineHeight: 1.6 }}>
                          {item.metricSubtitle}
                        </div>
                      </div>
                      
                      <div>
                        <button
                          className="btn btn-secondary"
                          style={{ background: 'rgba(255,255,255,0.1)', color: '#FFF', borderColor: 'transparent', padding: '0.8rem 2rem', borderRadius: '50px' }}
                          onClick={() => setActiveModal(item)}
                        >
                          View Case Study
                        </button>
                      </div>
                    </div>
                    
                    {/* Right Visual (Mockups) */}
                    <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', position: 'relative' }}>
                      <motion.div 
                        animate={{ y: [0, -15, 0] }}
                        transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                        style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                         {item.rightVisual === 'desktop' ? (
                            <div style={{ width: '100%', maxWidth: '650px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                              <img src={item.desktopCard.image} alt="Desktop preview" style={{ width: '100%', display: 'block' }} />
                            </div>
                         ) : (
                            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                               {item.screens.map((screen, idx) => (
                                 <motion.div 
                                   key={idx} 
                                   animate={{ y: [0, idx % 2 === 0 ? 10 : -10, 0] }}
                                   transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: idx * 0.5 }}
                                   style={{ 
                                     width: '180px', 
                                     height: '360px', 
                                     borderRadius: '28px', 
                                     overflow: 'hidden', 
                                     boxShadow: '0 20px 50px rgba(0,0,0,0.6)', 
                                     border: '6px solid #222',
                                     transform: screen.transform
                                   }}
                                 >
                                   <img src={screen.image} alt={screen.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                 </motion.div>
                               ))}
                            </div>
                         )}
                      </motion.div>
                    </div>
                  </div>
                )}
              </RevealItem>
            ))}
          </RevealStagger>
          
          {/* Pagination Controls (1:1 Apple Proportional Size) */}
          <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px', marginTop: '2.5rem' }}>
            {/* Dots Pill Container */}
            <div style={{ display: 'flex', gap: '10px', padding: '10px 20px', background: '#E8E8ED', borderRadius: '30px', alignItems: 'center' }}>
              {realizedWebsites.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  style={{
                    width: activeIndex === idx ? '36px' : '6px',
                    height: '6px',
                    borderRadius: activeIndex === idx ? '3px' : '50%',
                    background: activeIndex === idx ? '#1D1D1F' : '#86868B',
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Standalone Apple Play Icon Circle Button matching Pill Height (32px) */}
            <button 
              onClick={() => scrollTo((activeIndex + 1) % realizedWebsites.length)}
              style={{ 
                background: '#E8E8ED', 
                border: 'none', 
                borderRadius: '50%', 
                width: '32px', 
                height: '32px', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                padding: '0',
                transition: 'background 0.2s ease'
              }}
              aria-label="Next slide"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="#1D1D1F" stroke="none" style={{ marginLeft: '1px' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </Reveal>

        </div>

      {/* Case Study Detail Modal (unchanged logic, just styled dark) */}
      {activeModal && (
        <div className="modal-overlay" onClick={() => setActiveModal(null)} style={{ background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(12px)' }}>
          <div className="modal-container" onClick={e => e.stopPropagation()} style={{ background: '#111', color: '#FFF', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '24px' }}>
            <span className="modal-close" onClick={() => setActiveModal(null)} style={{ color: '#FFF' }}>&times;</span>
            <h3 style={{ fontSize: '2rem', marginBottom: '0.25rem', fontWeight: 700 }}>{activeModal.brandName}</h3>
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
