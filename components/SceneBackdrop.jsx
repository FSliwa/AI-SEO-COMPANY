'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

/**
 * A Spline scene used as a section background.
 *
 * Two gates before anything downloads. The Spline runtime is around 1.5 MB of
 * JavaScript, which is far too much to spend on a section most visitors never
 * reach, so the scene is only mounted once the section is within a screen of
 * the viewport. And motion at this scale is decoration: if the visitor has
 * asked their system for less of it, the right answer is not to fetch the
 * runtime at all rather than to fetch it and hold it still.
 *
 * Decorative by definition — it carries nothing the surrounding copy does not —
 * so it is hidden from assistive technology and cannot take pointer events,
 * which matters here because a call-to-action sits on top of it.
 */
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

export default function SceneBackdrop({ scene, className = '' }) {
  const ref = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = ref.current;
    if (!el) return;

    // A full viewport of runway, so the scene has painted by the time the
    // section is actually looked at instead of popping in under the reader.
    const observer = new IntersectionObserver(
      entries => {
        if (entries.some(entry => entry.isIntersecting)) {
          setMounted(true);
          observer.disconnect();
        }
      },
      { rootMargin: '100% 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`scene-backdrop ${className}`.trim()} aria-hidden="true">
      {mounted && <Spline scene={scene} />}
    </div>
  );
}
