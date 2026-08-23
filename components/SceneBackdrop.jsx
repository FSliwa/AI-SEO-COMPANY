'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import SceneErrorBoundary from './SceneErrorBoundary';

/**
 * A Spline scene used as a section background.
 *
 * Timing is the whole point of this component. These scenes animate off a
 * "Start" event set to Once — decoded from the .splinecode, the results scene
 * has 239 of them, the last on a 7000ms delay. The event fires when the canvas
 * initialises and never fires again, so *when the canvas mounts* decides
 * whether anyone sees the animation. Mount it a viewport early, as this used
 * to, and the entire timeline plays out below the fold; the visitor arrives to
 * the finished state and reports that nothing happens.
 *
 * Hence two observers rather than one. The far one only warms caches — it pulls
 * the runtime module and the scene file without touching WebGL, which is the
 * expensive part and the part that would otherwise delay the animation if
 * everything waited until arrival. The near one mounts the canvas as the
 * section reaches the fold, so the Start event fires in front of the reader.
 *
 * Motion at this scale is decoration, so under prefers-reduced-motion nothing
 * is fetched at all — better than fetching it and holding it still. Decorative
 * also means hidden from assistive technology; pointer events are handled in
 * CSS, where they are enabled only for real cursors.
 */
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SceneBackdrop({ scene, className = '' }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    const warm = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        warm.disconnect();
        // Both are best-effort: a failure here costs a slower start, nothing more.
        import('@splinetool/react-spline').catch(() => {});
        fetch(scene, { mode: 'cors' }).catch(() => {});
      },
      { rootMargin: '150% 0px' }
    );

    const reveal = new IntersectionObserver(
      entries => {
        if (!entries.some(entry => entry.isIntersecting)) return;
        reveal.disconnect();
        setMounted(true);
      },
      { rootMargin: '5% 0px' }
    );

    warm.observe(el);
    reveal.observe(el);

    return () => {
      warm.disconnect();
      reveal.disconnect();
    };
  }, [scene]);

  return (
    <div ref={ref} className={`scene-backdrop ${className}`.trim()} aria-hidden="true">
      {mounted && (
        <SceneErrorBoundary>
          <Spline scene={scene} />
        </SceneErrorBoundary>
      )}
    </div>
  );
}
