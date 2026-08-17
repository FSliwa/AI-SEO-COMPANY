'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The hero paragraph, wrapping around the top of the "S" — to the approved
 * spec: the wrap runs along the top edge of the lettering and descends, in the
 * letter's own trail, no further than the height of the S's first bend.
 *
 * Geometry, all derived from the section height (the camera scales the scene
 * with it): the S's top-left corner is a quarter-arc of radius r ~ 5.56% of the
 * section height, tangent to both the letter's flat top and its left edge, and
 * the left edge is flush with the text column. So there is one shared centre C,
 * sitting r to the right of the column and r below the letter top — and every
 * line's curved portion is a CONCENTRIC arc around C. Concentric spacing is
 * what keeps the lines a constant line-height apart along the whole bend, and
 * it makes the innermost arc run parallel to the letter's own shoulder — the
 * text literally follows the S.
 *
 * Each line is flat and level from C's vertical to the right edge, and bends
 * down-left along its arc before that. The sweep fades quadratically up the
 * paragraph: the last line takes the full bend (capped at THETA_CAP so the
 * descent stops at the first-bend height and the tip stays readable), the
 * first line is dead straight. Glyphs rotate along the tangent — that is what
 * textPath is for; a curving baseline cannot be done in CSS.
 *
 * The wrap must know the curve: bent lines carry more text (the arc is longer
 * than its chord), and how much depends on the line count, which depends on
 * the wrap — so it iterates until the count settles.
 *
 * SEO: the server renders the straight <p>; this replaces it client-side above
 * 901px only. No per-letter spans, no duplicated copy.
 */

// Corner radius as a fraction of the section height (measured: 50px at 900).
const R_FRAC = 0.0556;
// Baseline of the last line sits this far above the letter top (measured).
const BASE_ABOVE_TOP = 12;
// Sweep of the last line, degrees. 90 would run the tip fully vertical at the
// first-bend height; 66 keeps the curl obvious while the first word stays
// comfortably readable — the tidier reading of the approved spec.
const THETA_CAP = 66;

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

      const hero = host.closest('.hero');
      const heroH = hero ? hero.clientHeight : window.innerHeight;
      const r = R_FRAC * heroH;

      const words = text.split(/\s+/).filter(Boolean);

      // Only the LAST line curls — the one actually meeting the S — and every
      // other line is dead straight, flush with the column. Two earlier drafts
      // bent the middle lines too (faded sweeps, then tips pinned with growing
      // dips) and both read as untidy: rotated glyphs in the middle of a
      // paragraph look like a rendering fault, not a design. One clean curl on
      // the closing line reads as intent.
      const sweep = (li, count) => {
        const last = Math.max(1, count - 1);
        return Math.min(li, last) === last && count > 1
          ? THETA_CAP * Math.PI / 180
          : 0;
      };

      // Extra capacity a bent line gains over a flat one: arc length minus the
      // chord's horizontal extent.
      const extra = (li, count) => {
        const last = Math.max(1, count - 1);
        const theta = sweep(li, count);
        const R = r + BASE_ABOVE_TOP + (last - Math.min(li, last)) * lineHeight;
        return R * theta - R * Math.sin(theta);
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
        lines = wrapWith(li => width + extra(li, count));
        if (lines.length === count) break;
        count = lines.length;
      }

      setLayout({ width, lines, lineHeight, fontSize, r, sweep });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    const hero = host.closest('.hero');
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, [text]);

  const height = layout
    ? layout.fontSize * 1.3 + (layout.lines.length - 1) * layout.lineHeight
    : 0;

  return (
    <div ref={hostRef} className={className}>
      {layout && (
        <svg
          width={layout.width}
          height={height}
          viewBox={`0 0 ${layout.width} ${height}`}
          style={{ display: 'block', overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {layout.lines.map((_, i) => {
              const n = layout.lines.length;
              const y = layout.fontSize + i * layout.lineHeight;

              // Shared centre: r right of the column, and below the last
              // baseline by (r + BASE_ABOVE_TOP). Radii are concentric.
              const yLast = layout.fontSize + (n - 1) * layout.lineHeight;
              const cx = layout.r;
              const cy = yLast + layout.r + BASE_ABOVE_TOP;
              const R = cy - y;

              const theta = layout.sweep(i, n);
              if (theta < 0.01) {
                return (
                  <path key={i} id={`hero-arc-${i}`} d={`M 0 ${y} L ${layout.width} ${y}`} fill="none" />
                );
              }
              const tipX = cx - R * Math.sin(theta);
              const tipY = cy - R * Math.cos(theta);
              return (
                <path
                  key={i}
                  id={`hero-arc-${i}`}
                  d={
                    `M ${tipX.toFixed(1)} ${tipY.toFixed(1)} ` +
                    `A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${cx.toFixed(1)} ${y} ` +
                    `L ${layout.width} ${y}`
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
