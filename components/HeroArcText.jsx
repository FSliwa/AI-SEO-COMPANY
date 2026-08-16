'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * A paragraph whose lines sit on arcs instead of on straight baselines.
 *
 * Why SVG and not CSS: there is no way to bend a line of text in CSS. The two
 * things that look like it both fail — a float with shape-outside only moves
 * where lines start, which reads as a stepped margin, and perspective/rotateX
 * tips the whole block into a trapezoid. Text actually following a curve means
 * <textPath>, and that means SVG.
 *
 * The curve is measured, not invented. Reading the scene's framebuffer back,
 * the lettering's top edge sits flat at y=274 across the middle and falls away
 * to 341 at the left shoulder and 339 at the right — a shallow dome. So each
 * line is a quadratic with its midpoint `rise` above its ends, which keeps a
 * roughly even gap to the letters underneath.
 *
 * <textPath> does not wrap, so the wrapping is done here: the text is measured
 * with the element's own computed font through a canvas and greedily broken to
 * the container's width, then re-broken whenever that width changes. Fixed line
 * breaks would overflow the moment the column resized — and this column is sized
 * in vh, so it changes with the window's height as well as its width.
 *
 * Words are never split, and the text is real SVG <text>, which is indexable.
 * The straight <p> is what the server renders; this only replaces it on wide
 * screens, client-side, so the markup a crawler reads is the plain paragraph and
 * the copy is never duplicated.
 */
// Horizontal run the shoulder is spread over, in px. The letterform's own
// shoulder takes about 76px; the text gets a little more so the bend reads as a
// curve in a 16px face rather than a kink.
const CURVE_RUN = 130;

export default function HeroArcText({ text, className = '', rise = 22 }) {
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
      const font = `${cs.fontStyle} ${cs.fontWeight} ${fontSize}px ${cs.fontFamily}`;

      const ctx = (measure.ctx ||= document.createElement('canvas').getContext('2d'));
      ctx.font = font;

      // Greedy wrap. The arc is longer than its chord, but only by a fraction of
      // a percent at this sagitta, so the flat measurement is close enough and
      // the last word never spills.
      const words = text.split(/\s+/).filter(Boolean);
      const lines = [];
      let current = '';
      for (const word of words) {
        const next = current ? `${current} ${word}` : word;
        if (ctx.measureText(next).width > width && current) {
          lines.push(current);
          current = word;
        } else {
          current = next;
        }
      }
      if (current) lines.push(current);

      setLayout({ width, lines, lineHeight, fontSize });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    return () => observer.disconnect();
  }, [text]);

  // Only the last line's descender is reserved below its baseline, not a whole
  // extra line — a full line-height there pushed the paragraph off the lettering.
  // The last line's left end sits `rise` below its baseline now, so the box has
  // to carry that as well as the descender.
  const height = layout
    ? rise + layout.fontSize * 1.3 + (layout.lines.length - 1) * layout.lineHeight + rise
    : 0;

  return (
    <div ref={hostRef} className={className}>
      {layout && (
        <svg
          width={layout.width}
          height={height}
          viewBox={`0 0 ${layout.width} ${height}`}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {layout.lines.map((_, i) => {
              const y = rise + layout.fontSize + i * layout.lineHeight;

              // Only the left end of each line bends; the rest of the line runs
              // straight. The shape is taken from the letterform underneath —
              // reading the scene's framebuffer, the "S" holds a flat top at
              // y=274 from x=277 rightwards and its shoulder falls to y=341 by
              // x=201. So roughly 76px of horizontal run carries the whole drop,
              // and the text mirrors that: a shoulder over the first CURVE_RUN
              // pixels, flat from there on.
              //
              // The drop grows down the paragraph, nothing on the first line and
              // full on the last. That is what turns the block's left edge into
              // one arc rather than four identical hooks — and the last line,
              // the one actually next to the lettering, is the one that follows
              // it most closely.
              const last = Math.max(1, layout.lines.length - 1);
              const drop = rise * (i / last);
              const run = Math.min(CURVE_RUN, layout.width * 0.28);
              return (
                <path
                  key={i}
                  id={`hero-arc-${i}`}
                  d={
                    `M 0 ${y + drop} ` +
                    `Q ${run * 0.5} ${y + drop} ${run} ${y} ` +
                    `L ${layout.width} ${y}`
                  }
                  fill="none"
                />
              );
            })}
          </defs>
          {layout.lines.map((line, i) => (
            <text key={i} className="hero-en-arc-line">
              {/* Left-aligned, like every other block in this hero. Centring the
                  lines also parked a short final line in the middle of its arc,
                  where the curve is highest, which opened a 30px gap to the
                  lettering instead of the 8px the layout is built around. */}
              <textPath href={`#hero-arc-${i}`} startOffset="0%" textAnchor="start">
                {line}
              </textPath>
            </text>
          ))}
        </svg>
      )}
    </div>
  );
}
