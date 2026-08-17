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
// Horizontal run each line's bend is spread over, in px.
const CURVE_RUN = 170;

// Total leftward sweep of the block's left edge, in px: the top line starts on
// the column edge and the lines below it slide progressively left, tracing one
// arc down towards the "S" — the direction the marked-up screenshot drew.
const EDGE_SWEEP = 44;

export default function HeroArcText({ text, className = '', rise = 14 }) {
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
          width={layout.width + EDGE_SWEEP}
          height={height}
          viewBox={`0 0 ${layout.width + EDGE_SWEEP} ${height}`}
          style={{ display: 'block', marginLeft: `-${EDGE_SWEEP}px` }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {layout.lines.map((_, i) => {
              const y = rise + layout.fontSize + i * layout.lineHeight;

              // One continuous sweep, not a repeated hook. Three earlier attempts
              // failed three different ways: identical shoulders on every line
              // read as four separate hooks; a drop that grew without moving the
              // line starts read as a rotated paragraph; stepped indents read as
              // a margin. What the marked-up screenshot drew is a single arc
              // running down-left towards the "S", so that is what this builds:
              //
              //   - the START of each line slides left, quadratically (t²), so
              //     the block's left edge is itself a curve accelerating towards
              //     the lettering, not a straight diagonal;
              //   - the TIP of each line dips below its baseline by rise*t, so
              //     the bend deepens as the lines approach the letters;
              //   - past the bend every line runs dead straight, so only the
              //     left side carries the shape.
              //
              // The svg is widened by EDGE_SWEEP and pulled left by the same
              // amount in CSS, so the top line still starts exactly on the
              // column edge, aligned with the promise line above it.
              const last = Math.max(1, layout.lines.length - 1);
              const t = i / last;
              const shift = EDGE_SWEEP * t * t;
              const drop = rise * t;
              const x0 = EDGE_SWEEP - shift;
              const run = Math.min(CURVE_RUN, layout.width * 0.3);
              return (
                <path
                  key={i}
                  id={`hero-arc-${i}`}
                  d={
                    `M ${x0} ${y + drop} ` +
                    `Q ${x0 + run * 0.5} ${y + drop} ${x0 + run} ${y} ` +
                    `L ${layout.width + EDGE_SWEEP} ${y}`
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
