'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Reveal } from './ScrollReveal';

export default function Results() {
  const { lang } = useLanguage();

  return (
    <section className="results" id="wyniki">
      <div className="container">
        <Reveal className="results-content">
          <div className="results-text">
            <h2>{lang === 'pl' ? 'Chcesz osiągnąć podobne wyniki?' : 'Want to achieve similar results?'}</h2>
            <p>{lang === 'pl' ? 'Zamów bezpłatną analizę SEO i potencjału Twojej obecnej marki już teraz.' : 'Claim your free SEO audit and brand potential analysis now.'}</p>
          </div>
          <a href="#kontakt" className="btn btn-primary" style={{ background: '#FFFFFF', color: '#0F172A', fontWeight: '700', boxShadow: 'none' }}>
            {lang === 'pl' ? 'Zamów bezpłatny audyt' : 'Get Free Audit'}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
