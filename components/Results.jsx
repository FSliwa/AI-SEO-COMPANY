'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Reveal } from './ScrollReveal';
import SceneBackdrop from './SceneBackdrop';
import { sectionId } from '@/lib/anchors';
import { hash } from '@/lib/anchors';

export default function Results() {
  const lang = useLocale();

  return (
    <section className="results" id={sectionId('wyniki', lang)}>
      {/* The scene carries its own near-black background baked into the file, so
          it can only live on a dark surface — this band is the one place on the
          page that already is one. It occupies the right side and is faded out
          towards the copy rather than cut, so nothing has to match the colour
          inside the .splinecode. */}
      <SceneBackdrop
        className="results-scene"
        scene="https://prod.spline.design/ZTZnzIExDn2uMvQW/scene.splinecode"
      />

      <div className="container">
        <Reveal className="results-content">
          <div className="results-text">
            <h2>{lang === 'pl' ? 'Chcesz osiągnąć podobne wyniki?' : 'Want to achieve similar results?'}</h2>
            <p>{lang === 'pl' ? 'Zamów bezpłatną analizę SEO i potencjału Twojej obecnej marki już teraz.' : 'Claim your free SEO audit and brand potential analysis now.'}</p>
          </div>
          <a href={hash('kontakt', lang)} className="btn btn-primary" data-cta="results_free_audit" style={{ background: '#FFFFFF', color: '#0F172A', fontWeight: '700', boxShadow: 'none' }}>
            {lang === 'pl' ? 'Zamów bezpłatny audyt' : 'Get Free Audit'}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
