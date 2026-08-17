'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The hero paragraph, wrapping around the top of the "S" below it.
 *
 * The spec, in the user's words: "napis ma sie owijac wokol gornej czesci S".
 * The "S" sits under the paragraph's left end, and its top-left corner is a
 * rounded shoulder falling away down-left — measured off the framebuffer, about
 * 52px of horizontal run carries a 46px drop at 1440x900. The space above that
 * shoulder, left of the letter's flat top, is empty; that pocket is what the
 * text wraps into.
 *
 * So the left END of each line extends left of the column and bends DOWN into
 * the pocket, tracing the shoulder's radius — deepest on the last line, which
 * sits against the letter, fading to nothing by the first. The right-hand part
 * of every line stays perfectly straight and level. This needs <textPath>:
 * a baseline that curves is not something CSS can do.
 *
 * The dip drops below the svg's own box, into the section's empty margin — the
 * svg is overflow:visible, and the flat baselines keep their measured 8px gap
 * to the letter's flat top.
 *
 * The wrap must know the curve: the bottom lines are LONGER (they gain the
 * left extension), and how much longer depends on the line count, which
 * depends on the wrap. It iterates until the count settles.
 *
 * SEO: the server renders the straight <p>; this replaces it client-side above
 * 901px only, so a crawler reads the plain paragraph and the copy is never
 * duplicated.
 */

// Shape of the wrap, in px at the reference type size. E_MAX: how far left of
// the column the last line's tip reaches. D_MAX: how far below its baseline the
// tip dips. RUN: the horizontal distance over which the dip rises back to flat
// — past x0+RUN every line is dead level.
const E_MAX = 70;
const D_MAX = 30;
const RUN = 130;

export default function HeroArcText({ text, className = '' }) {
  const hostRef = useRef(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const ctx = document.createElement('canvas').getContext('2d');

    const measure = () => {
      const width = host.clientWidth;
      if (!width) return;

      const cs = getComputedStyle(host);
      const fontSize = parseFloat(cs.fontSize) || 16;
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.6;
      ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;

      const words = text.split(/\s+/).filter(Boolean);
      const ext = (li, count) => {
        const last = Math.max(1, count - 1);
        const t = Math.min(li, last) / last;
        return E_MAX * t * t;
      };
      const wrapWith = maxOf => {
        const lines = [];
        let current = '';
        for (const word of words) {
          const next = current ? `${current} ${word}` : word;
          if (ctx.measureText(next).width > maxOf(lines.length) && current) {
            lines.push(current);
            current = word;
          } else {
            current = next;
          }
        }
        if (current) lines.push(current);
        return lines;
      };

      let count = wrapWith(() => width).length;
      let lines = null;
      for (let pass = 0; pass < 3; pass++) {
        lines = wrapWith(li => width + ext(li, count));
        if (lines.length === count) break;
        count = lines.length;
      }

      setLayout({ width, lines, lineHeight, fontSize });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [text]);

  const height = layout
    ? layout.fontSize * 1.3 + (layout.lines.length - 1) * layout.lineHeight
    : 0;

  return (
    <div ref={hostRef} className={className}>
      {layout && (
        <svg
          width={layout.width + E_MAX}
          height={height}
          viewBox={`0 0 ${layout.width + E_MAX} ${height}`}
          style={{ display: 'block', marginLeft: `-${E_MAX}px`, overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {layout.lines.map((_, i) => {
              const last = Math.max(1, layout.lines.length - 1);
              const t = Math.min(i, last) / last;
              const e = E_MAX * t * t;
              const d = D_MAX * t * t;
              const y = layout.fontSize + i * layout.lineHeight;
              const x0 = E_MAX - e;
              // Control point level with the flat baseline: the end tangent is
              // horizontal (the curve merges into the level line with no kink)
              // and the start tangent points steeply up out of the pocket, the
              // way the letter's own shoulder does.
              return (
                <path
                  key={i}
                  id={`hero-arc-${i}`}
                  d={
                    `M ${x0} ${y + d} ` +
                    `Q ${x0 + RUN / 2} ${y} ${x0 + RUN} ${y} ` +
                    `L ${layout.width + E_MAX} ${y}`
                  }
                  fill="none"
                />
              );
            })}
          </defs>
          {layout.lines.map((line, i) => (
            <text key={i} className="hero-en-arc-line">
              <textPath href={`#hero-arc-${i}`}>{line}</textPath>
            </text>
          ))}
        </svg>
      )}
    </div>
  );
}
