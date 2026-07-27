'use client';

import { useLanguage } from '@/lib/LanguageContext';
import { Reveal, RevealStagger, RevealItem } from '../ScrollReveal';

export default function AboutValues() {
  const { lang } = useLanguage();

  const valuesData = [
    {
      num: '01',
      title: lang === 'pl' ? 'Radykalna przejrzystość' : 'Radical Transparency',
      desc: lang === 'pl' 
        ? 'Żadnych ukrytych kosztów, żadnych niejasnych raportów. Naszym klientom dajemy pełen wgląd w to, co robimy, jak to robimy i dlaczego to robimy.'
        : 'No hidden costs, no vague reports. We give our clients full visibility into what we do, how we do it, and why we do it.'
    },
    {
      num: '02',
      title: lang === 'pl' ? 'Obsesja na punkcie detali' : 'Obsession with Details',
      desc: lang === 'pl' 
        ? 'Traktujemy każdy pixel, każdy nagłówek H1 i każdą linijkę kodu jako kluczowy element biznesu. Wierzymy, że suma perfekcyjnych detali tworzy produkt premium.'
        : 'We treat every pixel, every H1 tag, and every line of code as a critical business element. We believe the sum of perfect details creates a premium product.'
    },
    {
      num: '03',
      title: lang === 'pl' ? 'Zorientowanie na zysk' : 'Profit Oriented',
      desc: lang === 'pl' 
        ? 'Nie pozycjonujemy i nie projektujemy dla samych wykresów czy ładnego wyglądu. Naszym ostatecznym celem jest zawsze mierzalny wzrost Twoich przychodów.'
        : 'We don’t optimize or design just for pretty charts. Our ultimate goal is always the measurable growth of your revenue.'
    }
  ];

  return (
    <section className="services" id="about-values" style={{ background: '#F5F5F7', padding: '8rem 0' }}>
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {lang === 'pl' ? 'NASZE WARTOŚCI' : 'OUR VALUES'}
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4.5vw, 4rem)', color: '#1D1D1F', fontWeight: 700, letterSpacing: '-0.04em' }}>
            {lang === 'pl' ? 'Zasady, w oparciu o które budujemy sukces' : 'The principles upon which we build success'}
          </h2>
          <p style={{ fontSize: '1.25rem', color: '#6E6E73', fontWeight: 500 }}>
            {lang === 'pl' ? 'Nasz kodeks postępowania gwarantujący niezmiennie wysoką jakość usług.' : 'Our code of conduct guaranteeing consistently high-quality services.'}
          </p>
        </Reveal>

        {/* KOTA 3 Pillars Row */}
        <RevealStagger className="kota-pillars-row" delay={0.2}>
          {valuesData.map((pillar, idx) => (
            <RevealItem key={idx} style={{ display: 'flex', alignItems: 'center', flex: 1, gap: '1rem' }}>
              <div className="kota-pillar-card">
                <div className="kota-pillar-num">{pillar.num}</div>
                <h4>{pillar.title}</h4>
                <p>{pillar.desc}</p>
              </div>
              {idx < valuesData.length - 1 && <span className="kota-divider-x">✕</span>}
            </RevealItem>
          ))}
        </RevealStagger>

      </div>
    </section>
  );
}
