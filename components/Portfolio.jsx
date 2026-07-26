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
    rightVisual: 'phones',
    screens: [
      {
        title: 'Authentic Thai',
        subtitle: 'Restaurant Experience',
        tag: 'GASTRONOMY',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-18px)'
      },
      {
        title: 'Seamless Booking',
        subtitle: 'High Conversion UI',
        tag: 'UX/UI DESIGN',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(16px)',
        highlight: true
      },
      {
        title: 'Brand Strategy',
        subtitle: 'Digital Transformation',
        tag: 'WEB DEV',
        image: 'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=600&q=80',
        transform: 'translateY(-6px)'
      }
    ],
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
    rightVisual: 'desktop',
    desktopCard: {
      tag: 'B2B INDUSTRY & SEO',
      title: 'METALIZACJA PRÓŻNIOWA & LAKIEROWANIE UV',
      subtitle: 'Skalowanie biznesu B2B na rynki zagraniczne (Niemcy, USA) dzięki nowej architekturze informacji i SEO.',
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
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
    const scrollPosition = container.scrollLeft;
    const itemWidth = container.clientWidth;
    const newIndex = Math.round(scrollPosition / itemWidth);
    if (newIndex !== activeIndex) {
      setActiveIndex(newIndex);
    }
  };

  const scrollTo = (index) => {
    const container = document.getElementById('apple-carousel');
    if (container) {
      container.scrollTo({
        left: index * container.clientWidth,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="portfolio" id="portfolio" style={{ background: '#FFFFFF', padding: '8rem 0' }}>
      <div className="container" style={{ maxWidth: '1440px' }}>
        
        {/* Top Header Row */}
        <Reveal className="section-header center" style={{ marginBottom: '4rem', maxWidth: '840px', marginInline: 'auto' }}>
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> OUR RESULTS
          </div>
          <h2 style={{ color: '#111111', fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', fontWeight: 700, letterSpacing: '-0.04em', margin: '1rem 0' }}>
            {lang === 'pl' ? 'Explore what’s new for our clients.' : 'Explore what’s new for our clients.'}
          </h2>
          <p style={{ color: '#555555', fontSize: '1.25rem', fontWeight: 500 }}>
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
                {/* Animated glowing orb/mesh */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.25, 1], 
                    opacity: [0.15, 0.35, 0.15],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{ 
                    duration: 8, 
                    ease: 'easeInOut', 
                    repeat: Infinity,
                    repeatType: 'reverse'
                  }}
                  style={{ 
                    position: 'absolute', 
                    top: '-10%', 
                    left: '-10%', 
                    right: '-10%', 
                    bottom: '-10%', 
                    background: item.meshBg, 
                    filter: 'blur(80px)', 
                    pointerEvents: 'none',
                    zIndex: 0
                  }} 
                />
                
                <div style={{ zIndex: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '3rem', height: '100%' }}>
                  
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
                        background: item.gradient,
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
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
                  <div style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <div style={{ position: 'relative', width: '100%', height: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                       {item.rightVisual === 'desktop' ? (
                          <div style={{ width: '100%', maxWidth: '650px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 30px 60px rgba(0,0,0,0.6)', border: '1px solid rgba(255,255,255,0.1)' }}>
                            <img src={item.desktopCard.image} alt="Desktop preview" style={{ width: '100%', display: 'block' }} />
                          </div>
                       ) : (
                          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
                             {item.screens.map((screen, idx) => (
                               <div key={idx} style={{ 
                                 width: '180px', 
                                 height: '360px', 
                                 borderRadius: '28px', 
                                 overflow: 'hidden', 
                                 boxShadow: '0 20px 50px rgba(0,0,0,0.6)', 
                                 border: '6px solid #222',
                                 transform: screen.transform
                               }}>
                                 <img src={screen.image} alt={screen.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                               </div>
                             ))}
                          </div>
                       )}
                    </div>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealStagger>
          
          {/* Pagination Dots (Apple Style) */}
          <Reveal delay={0.4} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '12px', padding: '12px 16px', background: 'rgba(0,0,0,0.05)', borderRadius: '30px', alignItems: 'center' }}>
              {realizedWebsites.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => scrollTo(idx)}
                  style={{
                    width: activeIndex === idx ? '40px' : '10px',
                    height: '10px',
                    borderRadius: '5px',
                    background: activeIndex === idx ? '#111111' : '#D2D2D7', // Dark Apple grey for active, light for inactive
                    border: 'none',
                    padding: 0,
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
                    boxShadow: activeIndex === idx ? '0 1px 2px rgba(0,0,0,0.2)' : 'inset 0 1px 2px rgba(0,0,0,0.1)'
                  }}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
              
              {/* Fake Apple Pause/Play icon */}
              <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', marginLeft: '4px' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="#333333" stroke="none">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              </button>
            </div>
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
