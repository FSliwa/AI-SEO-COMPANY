'use client';

import React, { useState } from 'react';
import { Reveal } from '@/components/ScrollReveal';

const faqData = {
  pl: [
    {
      q: 'Jak często publikujecie Najnowsze Artykuły?',
      a: 'Nasz Blog SEO i Web Design jest aktualizowany regularnie. Publikujemy nowe poradniki, strategie oraz analizy minimum raz w tygodniu, abyś zawsze miał dostęp do najświeższej i przetestowanej wiedzy rynkowej wprost z pierwszej ręki.'
    },
    {
      q: 'Czy ten Poradnik SEO jest w pełni darmowy?',
      a: 'Tak, wszystkie nasze obszerne poradniki, innowacyjne check-listy i case studies z zakresu pozycjonowania organicznego i optymalizacji konwersji (UX/CRO) są udostępniane całkowicie bezpłatnie naszym czytelnikom.'
    },
    {
      q: 'Dla kogo przeznaczone są te wpisy o e-marketingu?',
      a: 'Tworzymy merytoryczne treści zarówno dla początkujących, jak i wysoce zaawansowanych marketerów. Nasz blog to gigantyczne kompendium eksperckiej wiedzy na temat B2B, skalowania biznesu i projektowania wizualnego.'
    }
  ],
  en: [
    {
      q: 'How often do you publish Latest Articles?',
      a: 'Our SEO and Web Design Blog is updated regularly. We publish new guides, strategies, and analyses at least once a week to ensure you always have access to the freshest and proven market knowledge.'
    },
    {
      q: 'Is this comprehensive SEO Guide entirely free?',
      a: 'Yes, all our extensive guides, innovative checklists, and case studies concerning organic positioning and conversion optimization (UX/CRO) are provided entirely free of charge to our readers.'
    },
    {
      q: 'Who are these digital marketing posts intended for?',
      a: 'We create substantial content for both beginners and highly advanced marketers. Our blog is a massive compendium of expert knowledge on B2B marketing, business scaling, and visual design.'
    }
  ]
};

export default function BlogFAQ({ lang }) {
  const [openIdx, setOpenIdx] = useState(null);
  const data = faqData[lang] || faqData['pl'];

  return (
    <section style={{ backgroundColor: '#F5F5F7', padding: '6rem 0' }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <Reveal>
          <h2 style={{ 
            fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', 
            fontWeight: 700, 
            color: '#1D1D1F', 
            marginBottom: '3rem', 
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            {lang === 'pl' ? 'Najczęściej zadawane pytania' : 'Frequently Asked Questions'}
          </h2>
        </Reveal>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {data.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <Reveal key={idx} delay={0.1 * idx}>
                <div 
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  style={{ 
                    backgroundColor: '#FFFFFF', 
                    borderRadius: '16px', 
                    padding: '1.5rem 2rem', 
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: isOpen ? '0 10px 30px rgba(0,0,0,0.05)' : '0 2px 10px rgba(0,0,0,0.02)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#1D1D1F', margin: 0 }}>
                      {item.q}
                    </h3>
                    <span style={{ fontSize: '1.5rem', color: '#86868B', lineHeight: 1, fontWeight: 300 }}>
                      {isOpen ? '−' : '+'}
                    </span>
                  </div>
                  {isOpen && (
                    <div style={{ marginTop: '1rem', color: '#86868B', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {item.a}
                    </div>
                  )}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
