'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The hero paragraph, with its left edge wrapping around the "S" below it.
 *
 * Chosen from a side-by-side of four candidates (variant D): the lines stay
 * perfectly horizontal, but each one starts a little further right than the one
 * above it, quadratically — so the block's left edge is a concave curve that
 * wraps around the round letterform underneath, the way text wraps a circular
 * float. Nothing is bent along a path any more; earlier attempts that bent the
 * line ends read as a slump or a rotation, never as a curve.
 *
 * The wrap has to know about the curve: the bottom lines are shorter, and how
 * much shorter depends on how many lines there are, which depends on the wrap.
 * So it iterates — wrap flat to get a line count, compute the per-line insets,
 * re-wrap with them, repeat until the count settles (in practice one pass).
 *
 * Text is measured with the element's own computed font through a canvas and
 * re-broken whenever the container resizes; the column is sized in vh, so it
 * moves with window height as well as width. Words are never split.
 *
 * SEO: the server renders the straight <p>; this replaces it client-side above
 * 901px only, so the crawler reads the plain paragraph and the copy is never
 * duplicated. The SVG text here is real text regardless.
 */

// How far right the bottom line's start is pushed, in px. The insets between
// follow t-squared, so the edge accelerates into the letter like a circle.
const WRAP = 80;

export default function HeroArcText({ text, className = '' }) {
  const hostRef = useRef(null);
  const [layout, setLayout] = useState(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const measure = () => {
      const width = host.clientWidth;
      if (!width) return;

      const cs = getComputedStyle(host);
      const fontSize = parseFloat(cs.fontSize) || 16;
      const lineHeight = parseFloat(cs.lineHeight) || fontSize * 1.6;
      ctxRef.font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;

      const words = text.split(/\s+/).filter(Boolean);
      const inset = (li, count) => {
        const last = Math.max(1, count - 1);
        const t = Math.min(li, last) / last;
        return WRAP * t * t;
      };
      const wrapWith = maxOf => {
        const lines = [];
        let current = '';
        for (const word of words) {
          const next = current ? `${current} ${word}` : word;
          if (ctxRef.measureText(next).width > maxOf(lines.length) && current) {
            lines.push(current);
            current = word;
          } else {
            current = next;
          }
        }
        if (current) lines.push(current);
        return lines;
      };

      // First pass flat for a line count, then re-wrap with the curve's insets
      // until the count stops changing.
      let count = wrapWith(() => width).length;
      let lines = null;
      for (let pass = 0; pass < 3; pass++) {
        lines = wrapWith(li => width - inset(li, count));
        if (lines.length === count) break;
        count = lines.length;
      }

      setLayout({ width, lines, lineHeight, fontSize });
    };

    const ctxRef = document.createElement('canvas').getContext('2d');
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
          width={layout.width}
          height={height}
          viewBox={`0 0 ${layout.width} ${height}`}
          style={{ display: 'block' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          {layout.lines.map((line, i) => {
            const last = Math.max(1, layout.lines.length - 1);
            const t = Math.min(i, last) / last;
            return (
              <text
                key={i}
                className="hero-en-arc-line"
                x={WRAP * t * t}
                y={layout.fontSize + i * layout.lineHeight}
              >
                {line}
              </text>
            );
          })}
        </svg>
      )}
    </div>
  );
}
