'use client';

// Przypięty pasek „Wyceń projekt / Zadzwoń” na telefonie (19.11.2026, analiza konwersji).
// Pływający przycisk z Footer.jsx chowa się nad realizacjami, wynikami i cennikiem (żeby nie zasłaniać
// miniatur), więc na telefonie przez większość strony głównej nie było widać żadnego wezwania.
// Pasek:
//  - tylko do 767 px (CSS), tylko na stronie głównej (montowany w app/[locale]/page.js);
//  - pojawia się po minięciu hero i chowa, gdy widać formularz kontaktu albo stopkę;
//  - na tych szerokościach zastępuje pływającą pigułkę (CSS: body:has(.pasek-cta) .kota-floating-cta);
//  - kliknięcia mierzy AnalyticsEvents: cta_click (sticky_mobile_quote) i phone_click (sticky_mobile_call).

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { hash, sectionId } from '@/lib/anchors';
import './PasekCtaMobile.css';

const TEL = '+48518815055';

export default function PasekCtaMobile() {
  const lang = useLocale();
  const [poHero, setPoHero] = useState(false);
  const [nadKontaktem, setNadKontaktem] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const hero = document.getElementById('hero');
    const kontakt = document.getElementById(sectionId('kontakt', lang));
    const stopka = document.querySelector('footer.footer');
    const obserwatory = [];

    if (hero) {
      const o = new IntersectionObserver(([w]) => setPoHero(!w.isIntersecting && w.boundingClientRect.top < 0), { threshold: 0 });
      o.observe(hero);
      obserwatory.push(o);
    }
    const cele = [kontakt, stopka].filter(Boolean);
    if (cele.length) {
      const widoczne = new Set();
      const o = new IntersectionObserver((wpisy) => {
        for (const w of wpisy) {
          if (w.isIntersecting) widoczne.add(w.target);
          else widoczne.delete(w.target);
        }
        setNadKontaktem(widoczne.size > 0);
      }, { threshold: 0.08 });
      cele.forEach((c) => o.observe(c));
      obserwatory.push(o);
    }
    return () => obserwatory.forEach((o) => o.disconnect());
  }, [lang]);

  const widoczny = poHero && !nadKontaktem;
  const t = (pl, en, de) => (lang === 'de' ? de : lang === 'en' ? en : pl);

  return (
    <div className={`pasek-cta${widoczny ? ' is-widoczny' : ''}`} aria-hidden={widoczny ? undefined : 'true'}>
      <a
        href={hash('kontakt', lang)}
        className="pasek-cta-btn pasek-cta-btn--glowny"
        data-cta="sticky_mobile_quote"
        tabIndex={widoczny ? undefined : -1}
      >
        {t('Wyceń projekt', 'Get a quote', 'Angebot anfragen')} <span aria-hidden="true">→</span>
      </a>
      <a
        href={`tel:${TEL}`}
        className="pasek-cta-btn pasek-cta-btn--tel"
        data-cta="sticky_mobile_call"
        tabIndex={widoczny ? undefined : -1}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z" />
        </svg>
        {t('Zadzwoń', 'Call us', 'Anrufen')}
      </a>
    </div>
  );
}
