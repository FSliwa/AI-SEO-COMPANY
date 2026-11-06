'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from './ScrollReveal';
import { sectionId } from '@/lib/anchors';
import { hash } from '@/lib/anchors';

export default function Results() {
  const lang = useLocale();

  return (
    <section className="results" id={sectionId('wyniki', lang)}>
      {/* 6.11.2026 (wyglad z makiety): scena Spline z prod.spline.design zdjeta -
          pas jest teraz przejsciem gor w noc (tlo w app/wyglad.css), a scena byla
          dekoracja. Komponent SceneBackdrop zostaje w repo. */}

      <div className="container">
        <Reveal className="results-content">
          <div className="results-text">
            <h2>{lang === 'pl' ? 'Chcesz osiągnąć podobne wyniki?' : 'Want to achieve similar results?'}</h2>
            <p>{lang === 'pl' ? 'Zamów bezpłatną analizę SEO i potencjału Twojej obecnej marki już teraz.' : 'Claim your free SEO audit and brand potential analysis now.'}</p>
          </div>
          <a href={hash('kontakt', lang)} className="w-przycisk w-przycisk--glowny" data-cta="results_free_audit">
            {lang === 'pl' ? 'Zamów bezpłatny audyt' : 'Get Free Audit'}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
