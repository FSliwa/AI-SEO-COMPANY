'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';

export default function Results() {
  const lang = useLocale();

  return (
    <section className="results" id={sectionId('wyniki', lang)} data-kursor="obraz" data-kursor-przezroczyste="jasne">
      {/* 6.11.2026 (wyglad z makiety): scena Spline z prod.spline.design zdjeta -
          pas jest teraz przejsciem gor w noc (tlo w app/wyglad.css), a scena byla
          dekoracja. Komponent SceneBackdrop zostaje w repo. */}

      <div className="container">
        <Reveal className="results-content">
          <div className="results-text">
            <h2>{lang === 'pl' ? 'Chcesz osiągnąć podobne wyniki?' : 'Want to achieve similar results?'}</h2>
            <p>{lang === 'pl' ? 'Sprawdź, co blokuje Twoją stronę w Google: darmowy audyt SEO online w 49 regułach albo wycena pełnego audytu w 24 h.' : 'Find out what holds your site back: run the free online SEO audit (49 rules) or request a quote for a full audit within 24 h.'}</p>
          </div>
          <a href={lang === 'pl' ? '/narzedzia/audyt-seo' : '/en/tools/free-seo-audit'} className="w-przycisk w-przycisk--glowny" data-cta="results_free_audit">
            {lang === 'pl' ? 'Sprawdź stronę za darmo' : 'Run the free audit'}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
