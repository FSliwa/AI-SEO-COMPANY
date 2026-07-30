'use client';

import React, { useState } from 'react';

import { useTranslations, useLocale } from 'next-intl';
import { blogPosts } from '@/lib/blogPosts';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import Link from 'next/link';

export default function BlogGrid() {
  const lang = useLocale();
  const [expandedMissionCard, setExpandedMissionCard] = useState(null);

  const missionCards = [
    {
      id: 'edukacja',
      tagPl: 'EDUKACJA', tagEn: 'EDUCATION',
      titlePl: 'Wiedza, która napędza Twój zysk w internecie.', titleEn: 'Knowledge that drives your online profit.',
      textPl: 'Blog AI SEO COMPANY to miejsce, w którym na bieżąco analizujemy rynek marketingu internetowego. Dzielimy się sprawdzonymi metodami, innowacyjnymi strategiami biznesowymi oraz narzędziami ułatwiającymi codzienną pracę z pozycjonowaniem stron.',
      textEn: 'The AI SEO COMPANY Blog is a place where we continuously analyze the digital marketing market. We share proven methods, innovative business strategies, and tools that facilitate daily work with website positioning.',
      image: '/images/unsplash-1552581234-26160f608093.jpg'
    },
    {
      id: 'metodologia',
      tagPl: 'METODOLOGIA', tagEn: 'METHODOLOGY',
      titlePl: 'Twarde dane i testy A/B', titleEn: 'Hard data and A/B tests',
      textPl: 'Każdy opublikowany przez nas wpis jest wynikiem głębokiej analizy danych, licznych testów A/B i wielomiesięcznych kampanii w wysoce konkurencyjnych niszach, co sprawia, że nasze wnioski opierają się na twardych, rynkowych realiach.',
      textEn: 'Every post we publish is the result of deep data analysis, numerous A/B tests, and multi-month campaigns in highly competitive niches, meaning our conclusions are based on hard, market realities.',
      image: '/images/unsplash-1561070791-2526d30994b5.jpg'
    },
    {
      id: 'zakres',
      tagPl: 'ZAKRES WIEDZY', tagEn: 'SCOPE OF KNOWLEDGE',
      titlePl: 'Kompleksowe podejście', titleEn: 'Comprehensive approach',
      textPl: 'Odkrywamy kulisy działania algorytmów AI i tłumaczymy trudne zjawiska technologiczne przystępnym językiem. Oprócz artykułów związanych stricte z SEO, poruszamy zagadnienia UX, CRO oraz copywritingu sprzedażowego.',
      textEn: 'We reveal the behind-the-scenes workings of AI algorithms and explain complex technological phenomena. In addition to articles strictly related to SEO, we tackle topics of UX, CRO, and sales copywriting.',
      image: '/images/unsplash-1585314062340-f1a5a7c9328d.jpg'
    },
    {
      id: 'rezultaty',
      tagPl: 'REZULTATY', tagEn: 'RESULTS',
      titlePl: 'Bądź o krok przed konkurencją', titleEn: 'Stay one step ahead',
      textPl: 'Nie czekaj dłużej, zacznij aplikować nasze rozwiązania i patrz, jak rosną Twoje słupki w Google Analytics oraz Google Search Console. Bądź konsekwentny, cierpliwy i metodyczny, a z naszą pomocą z pewnością osiągniesz zaplanowane cele biznesowe i wizerunkowe, wyprzedzając konkurencję o lata świetlne.',
      textEn: 'Do not wait any longer, start applying our solutions today and watch your metrics grow in Google Analytics and GSC. Be consistent, patient, and methodical, and with our help you will certainly achieve your planned business and image goals, leaving your competition light years behind.',
      image: '/images/unsplash-1608501821300-4f99e58bba77.jpg'
    }
  ];

  const extraQualityTextPl = 'Jakość i wiarygodność: Każdy udostępniony materiał jest pieczołowicie sprawdzany. Ucząc się z naszych bezpłatnych zasobów, dajesz swojej stronie szansę na zdobycie rzeszy lojalnych odbiorców, którzy ufają Twojej marce tak samo mocno, jak Google ufa Twojej domenie.';
  const extraQualityTextEn = 'Quality and credibility: Every piece of material is meticulously checked. By learning from our free resources, you give your website a chance to gain loyal audiences who trust your brand just as strongly as Google trusts your domain.';


  // Sort all posts by date (newest first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));

  // Display only 4 posts (1 hero + 3 grid) on the main blog page
  const displayPosts = sortedPosts.slice(0, 4);

  // The newest post is the hero
  const heroPost = displayPosts[0];
  // The rest are standard grid items
  const gridPosts = displayPosts.slice(1);

  const getPostData = (p) => ({
    date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
    tag: lang === 'pl' ? p.tagPl : p.tagEn,
    title: lang === 'pl' ? p.titlePl : p.titleEn,
    slug: p.slug,
    image: p.image,
    heroImage: p.heroImage || p.image,
  });

  if (!heroPost) return null;
  const heroData = getPostData(heroPost);

  return (
    <section className="blog-grid" style={{ padding: '4rem 0', backgroundColor: '#F5F5F7' }}>
      <div className="container" style={{ margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'left', padding: '1rem 0 2rem 0' }}>
            <h1 style={{ 
              fontSize: 'clamp(3rem, 5vw, 4.5rem)', 
              fontWeight: 700, 
              color: '#1D1D1F', 
              marginBottom: '0',
              letterSpacing: '-0.02em'
            }}>
              {lang === 'pl' ? 'Najnowsze Artykuły' : 'Latest Articles'}
            </h1>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <Link href={`/${lang}${heroData.slug}`} style={{ textDecoration: 'none' }}>
            <div className="hero-card" style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              backgroundColor: '#FFFFFF', 
              borderRadius: '24px', 
              overflow: 'hidden',
              marginBottom: '2rem', textAlign: 'left',
              boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              cursor: 'pointer'
            }}>
              {/* Desktop: side-by-side, Mobile: stack */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', width: '100%' }}>
                
                <div style={{ 
                  height: '100%', 
                  minHeight: '350px',
                  backgroundImage: `url(${heroData.heroImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />
                
                <div style={{ 
                  padding: 'clamp(2rem, 5vw, 4rem)', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'center' 
                }}>
                  <span style={{ 
                    fontSize: '0.75rem', 
                    fontWeight: 600, 
                    color: '#86868B', 
                    textTransform: 'uppercase', 
                    letterSpacing: '0.05em',
                    marginBottom: '1rem',
                    display: 'block'
                  }}>
                    {heroData.tag}
                  </span>
                  <h3 style={{ 
                    fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', 
                    fontWeight: 700, 
                    color: '#1D1D1F', 
                    lineHeight: 1.1,
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    {heroData.title}
                  </h3>
                  <span style={{ 
                    fontSize: '0.9rem', 
                    color: '#86868B',
                    fontWeight: 500
                  }}>
                    {heroData.date}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </Reveal>

        <RevealStagger style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '2rem' 
        }}>
          {gridPosts.map((post, idx) => {
            const data = getPostData(post);
            return (
              <RevealItem key={idx}>
                <Link href={`/${lang}${data.slug}`} style={{ textDecoration: 'none' }}>
                  <div className="grid-card" style={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    height: '100%', 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '24px', 
                    overflow: 'hidden',
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                    cursor: 'pointer'
                  }}>
                    <div style={{ 
                      height: '240px', 
                      backgroundImage: `url(${data.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }} />
                    
                    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                      <span style={{ 
                        fontSize: '0.7rem', 
                        fontWeight: 600, 
                        color: '#86868B', 
                        textTransform: 'uppercase', 
                        letterSpacing: '0.05em',
                        marginBottom: '1rem'
                      }}>
                        {data.tag}
                      </span>
                      <h3 style={{ 
                        fontSize: '1.25rem', 
                        fontWeight: 700, 
                        color: '#1D1D1F', 
                        lineHeight: 1.3,
                        marginBottom: '1.5rem',
                        letterSpacing: '-0.01em',
                        flexGrow: 1
                      }}>
                        {data.title}
                      </h3>
                      <span style={{ 
                        fontSize: '0.85rem', 
                        color: '#86868B',
                        fontWeight: 500
                      }}>
                        {data.date}
                      </span>
                    </div>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealStagger>
        
        <RevealItem style={{ display: 'flex', justifyContent: 'center', marginTop: '4rem' }}>
          <Link href={`/${lang}/blog/biblioteka`} style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: '#1D1D1F', 
            color: '#FFFFFF', 
            padding: '1.2rem 2.5rem', 
            borderRadius: '999px', 
            fontSize: '1.1rem', 
            fontWeight: 600, 
            textDecoration: 'none', 
            transition: 'all 0.3s ease' 
          }}>
            {lang === 'pl' ? 'Pełna biblioteka artykułów' : 'Full article library'}
          </Link>
        </RevealItem>
      </div>

      <style jsx>{`
        .hero-card:hover, .grid-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.08) !important;
        }
      `}</style>
    
      <div className="container" style={{ paddingBottom: '2rem', paddingTop: '4rem' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: '#1D1D1F', letterSpacing: '-0.02em' }}>
              {lang === 'pl' ? 'Misja AI SEO COMPANY' : 'AI SEO COMPANY Mission'}
            </h2>
          </div>
        </Reveal>
        
        <RevealStagger style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '2rem', 
          marginBottom: '4rem' 
        }}>
          {missionCards.map((card, idx) => {
            const isLast = idx === missionCards.length - 1;
            return (
              <RevealItem key={card.id} style={isLast ? { gridColumn: '1 / -1' } : {}}>
                <div 
                  className="grid-card" 
                  onClick={() => setExpandedMissionCard(card)}
                  style={{ 
                    display: 'flex', flexDirection: 'column', height: '100%', 
                    backgroundColor: '#FFFFFF', borderRadius: '24px', 
                    padding: isLast ? 'clamp(2.5rem, 5vw, 4rem)' : '2.5rem', 
                    boxShadow: '0 4px 24px rgba(0,0,0,0.04)', 
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease', 
                    cursor: 'pointer',
                    alignItems: isLast ? 'center' : 'flex-start',
                    textAlign: isLast ? 'center' : 'left'
                  }}
                >
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>
                    {lang === 'pl' ? card.tagPl : card.tagEn}
                  </span>
                  <h3 style={{ 
                    fontSize: isLast ? 'clamp(1.75rem, 4vw, 2.5rem)' : '1.4rem', 
                    fontWeight: 700, color: '#1D1D1F', marginBottom: '1rem', 
                    lineHeight: isLast ? 1.15 : 1.25, letterSpacing: '-0.02em',
                    maxWidth: isLast ? '800px' : 'none'
                  }}>
                    {lang === 'pl' ? card.titlePl : card.titleEn}
                  </h3>
                  <p style={{ color: '#6E6E73', fontSize: isLast ? '1.1rem' : '1rem', lineHeight: isLast ? 1.7 : 1.6, maxWidth: isLast ? '850px' : 'none' }}>
                    {lang === 'pl' ? card.textPl : card.textEn}
                  </p>
                  
                  <div style={{ flexGrow: 1 }} />
                  <div style={{ 
                    width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#F5F5F7', 
                    display: 'flex', alignItems: 'center', justifyContent: 'center', 
                    marginTop: '1.5rem', alignSelf: isLast ? 'center' : 'flex-end',
                    transition: 'background-color 0.2s ease'
                  }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </div>
                </div>
              </RevealItem>
            );
          })}
        </RevealStagger>

        {expandedMissionCard && (
          <div style={{ 
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 2147483647, 
            display: 'flex', alignItems: 'center', justifyContent: 'center', 
            padding: '1rem', backdropFilter: 'blur(10px)' 
          }} onClick={() => setExpandedMissionCard(null)}>
            <div style={{ 
              backgroundColor: '#FFFFFF', borderRadius: '24px', 
              padding: 'clamp(2rem, 5vw, 4rem)', width: '100%', maxWidth: '800px', 
              maxHeight: '90vh', overflowY: 'auto', position: 'relative',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)'
            }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setExpandedMissionCard(null)} 
                style={{ 
                  position: 'absolute', top: '1.5rem', right: '1.5rem', 
                  width: '36px', height: '36px', borderRadius: '50%', 
                  backgroundColor: '#F5F5F7', border: 'none', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center', 
                  cursor: 'pointer', zIndex: 2 
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#1D1D1F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
              {expandedMissionCard.image && (
                <div style={{
                  width: '100%',
                  height: 'clamp(200px, 40vh, 350px)',
                  backgroundImage: `url(${expandedMissionCard.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  borderRadius: '16px',
                  marginBottom: '2rem',
                  marginTop: '1rem'
                }} />
              )}
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '1rem', display: 'block' }}>
                {lang === 'pl' ? expandedMissionCard.tagPl : expandedMissionCard.tagEn}
              </span>
              <h3 style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.15, letterSpacing: '-0.02em' }}>
                {lang === 'pl' ? expandedMissionCard.titlePl : expandedMissionCard.titleEn}
              </h3>
              <p style={{ color: '#1D1D1F', fontSize: '1.15rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                {lang === 'pl' ? expandedMissionCard.textPl : expandedMissionCard.textEn}
              </p>
              <div style={{ height: '1px', backgroundColor: '#E5E5EA', margin: '2rem 0' }} />
              <p style={{ color: '#6E6E73', fontSize: '1.05rem', lineHeight: 1.7 }}>
                {lang === 'pl' ? extraQualityTextPl : extraQualityTextEn}
              </p>
            </div>
          </div>
        )}

        {/* Intro text moved to the bottom */}
        <Reveal>
          <div style={{ textAlign: 'center', paddingTop: '2rem', paddingBottom: '2rem' }}>
            <p style={{
              fontSize: '1.1rem',
              color: '#86868B',
              maxWidth: '900px',
              margin: '0 auto',
              lineHeight: 1.7,
              fontWeight: 500
            }}>
              {lang === 'pl' 
                ? 'Nasz Blog to praktyczny Poradnik, stworzony przez ekspertów AI SEO COMPANY. Przeczytaj nasze Najnowsze Artykuły o SEO i Web Designie. Publikujemy tutaj sprawdzone strategie pozyskiwania ruchu organicznego, analizujemy najnowsze aktualizacje algorytmów Google oraz dzielimy się wiedzą z zakresu budowy konwertujących interfejsów B2B. Zrozumienie mechanizmów wyszukiwarki pozwala nie tylko na zwiększenie widoczności, ale przede wszystkim na budowanie długofalowej przewagi konkurencyjnej w internecie.'
                : 'Our Blog is a practical SEO and Web Design Guide, created by AI SEO COMPANY experts. Read our latest articles on optimization. We publish proven organic traffic strategies, analyze Google algorithm updates, and share knowledge on building converting B2B interfaces. Understanding search engine mechanisms allows not only to increase visibility, but above all to build a long-term competitive advantage online.'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
