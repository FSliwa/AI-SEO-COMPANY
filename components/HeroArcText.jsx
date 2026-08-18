'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * The hero paragraph, wrapping around the top of the "S" below it.
 *
 * Every line curves — concentric arcs around the S's corner circle, whose
 * radius is ~5.56% of the section height and whose centre sits r right of the
 * column and r below the letter top. Concentric spacing keeps the lines a
 * constant leading apart along the bend, and the innermost arc runs parallel
 * to the letter's own shoulder.
 *
 * Sweep per line: every line except the last takes exactly the sweep that
 * lands its tip on the column edge (sin theta = r / R), which grows naturally
 * towards the letter as the radii shrink — the first line included, with the
 * gentlest bend of the set; the last line takes the full capped sweep and
 * curls down the shoulder, stopping above the S's first bend.
 *
 * The type follows the curvature: the more a line bends, the larger and more
 * tracked-out its glyphs — scale and letter-spacing are both driven by the
 * line's sweep as a fraction of the cap, so the paragraph accelerates towards
 * the letterform. Leading scales with each line's own size, and the arc radii
 * are recomputed from those positions, so the geometry stays concentric.
 *
 * Wrapping, measuring and the curve all feed each other — bent lines carry
 * more text (arc vs chord), scaled lines carry less, and the count moves the
 * radii — so the layout iterates until the line count settles.
 *
 * SEO: the server renders the straight <p>; this replaces it client-side above
 * 901px only. No per-letter spans, no duplicated copy.
 */

// Corner radius as a fraction of the section height (measured: 50px at 900).
const R_FRAC = 0.0556;
// Baseline of the last line sits this far above the letter top (measured).
const BASE_ABOVE_TOP = 12;
// Sweep of the last line, degrees.
const THETA_CAP = 66;
// Glyph scale gain on the last line; the ramp between lines is linear in the
// line index. It was tied to each line's sweep first, and because the middle
// sweeps are nearly equal the sizes ran 15.1 / 16.5 / 16.8 / 17.3 / 19.7 —
// three near-identical steps and a jump, which reads as an accident. A linear
// ramp is an even crescendo, which reads as intent.
const SCALE_GAIN = 0.3;
// Letter-spacing on the last line, as a fraction of its font size. 0.09 was
// visibly airy against the lines above; 0.055 tracks out without gapping.
const TRACK_GAIN = 0.055;
// Text brightness ramp, first line to last. One flat dim white made the large
// lines look soft; brightening with size keeps every line crisp and gives the
// crescendo a second axis.
const FILL_FROM = 0.62;
const FILL_TO = 0.92;
// Key phrases rendered in the scene's own orange, as a gradient tspan. Matched
// case-insensitively inside a single wrapped line; a phrase the wrap happens to
// split across lines simply stays white on that viewport - deterministic and
// harmless. SEO-safe by construction: the server serves the plain <p>, this
// SVG exists only client-side.
const ACCENT = {
  pl: ['zaawansowane SEO', 'pozycjonowanie stron', 'agencja SEO'],
  en: ['advanced SEO', 'brand strategy']
};

// Split one line into plain/accent segments for tspan rendering.
function accentSegments(line, phrases) {
  const low = line.toLowerCase();
  const hits = [];
  for (const ph of phrases) {
    const i = low.indexOf(ph.toLowerCase());
    if (i >= 0) hits.push([i, i + ph.length]);
  }
  if (!hits.length) return [{ t: line, hot: false }];
  hits.sort((a, b) => a[0] - b[0]);
  const seg = [];
  let pos = 0;
  for (const [a, b] of hits) {
    if (a < pos) continue;
    if (a > pos) seg.push({ t: line.slice(pos, a), hot: false });
    seg.push({ t: line.slice(a, b), hot: true });
    pos = b;
  }
  if (pos < line.length) seg.push({ t: line.slice(pos), hot: false });
  return seg;
}

export default function HeroArcText({ text, className = '', lang = 'pl' }) {
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
      const fontOf = px => `${cs.fontStyle} ${cs.fontWeight} ${px}px ${cs.fontFamily}`;

      const hero = host.closest('.hero');
      const heroH = hero ? hero.clientHeight : window.innerHeight;
      const r = R_FRAC * heroH;
      const cap = THETA_CAP * Math.PI / 180;

      const words = text.split(/\s+/).filter(Boolean);

      // Geometry for a given line count. Scales depend on sweeps, sweeps on
      // radii, radii on baselines, baselines on scales — two passes settle it.
      const geometry = count => {
        const last = Math.max(1, count - 1);
        let scales = Array(count).fill(1);
        let thetas = Array(count).fill(0);
        let ys = [];
        for (let pass = 0; pass < 3; pass++) {
          ys = [];
          let y = 0;
          for (let i = 0; i < count; i++) {
            y += (i === 0 ? fontSize * scales[0] : lineHeight * scales[i]);
            ys.push(y);
          }
          const cy = ys[last] + r + BASE_ABOVE_TOP;
          thetas = ys.map((yy, i) => {
            if (count < 2) return 0;
            if (i === last) return cap;
            // Tip pinned to the column edge (sin theta = r / R): the first line
            // has the largest radius, so it gets the gentlest bend of the set —
            // the cascade now starts from the very top instead of from line two.
            return Math.asin(Math.min(1, r / (cy - yy)));
          });
          scales = ys.map((_, i) => 1 + SCALE_GAIN * (last ? i / last : 0));
        }
        return { ys, thetas, scales, cy: ys[last] + r + BASE_ABOVE_TOP };
      };

      const wrapWith = geo => {
        const lines = [];
        let current = '';
        const capacity = li => {
          const i = Math.min(li, geo.thetas.length - 1);
          const R = geo.cy - geo.ys[i];
          const th = geo.thetas[i];
          return width + (R * th - R * Math.sin(th));
        };
        const applyFont = li => {
          const i = Math.min(li, geo.scales.length - 1);
          const last = Math.max(1, geo.scales.length - 1);
          const px = fontSize * geo.scales[i];
          ctx.font = fontOf(px);
          try { ctx.letterSpacing = `${(TRACK_GAIN * px * (i / last)).toFixed(2)}px`; } catch (e) {}
        };
        for (const word of words) {
          applyFont(lines.length);
          const next = current ? `${current} ${word}` : word;
          if (ctx.measureText(next).width > capacity(lines.length) && current) {
            lines.push(current);
            current = word;
          } else {
            current = next;
          }
        }
        if (current) lines.push(current);
        return lines;
      };

      ctx.font = fontOf(fontSize);
      let count = wrapWith(geometry(4)).length;
      let lines = null;
      let geo = null;
      for (let pass = 0; pass < 4; pass++) {
        geo = geometry(count);
        lines = wrapWith(geo);
        if (lines.length === count) break;
        count = lines.length;
      }

      // The wrap can oscillate between two counts when a break lands exactly on
      // a word boundary — the loop then exits with geometry built for the OTHER
      // count, the last two lines sharing a clamped scale and the svg height
      // indexing past the array. The final rebuild pins the geometry to the
      // lines actually rendered; the capacity mismatch it leaves is a fraction
      // of one word and only ever makes a line end slightly early.
      if (lines.length !== geo.ys.length) {
        geo = geometry(lines.length);
      }

      setLayout({ width, lines, fontSize, geo, cap });
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(host);
    const hero = host.closest('.hero');
    if (hero) observer.observe(hero);
    return () => observer.disconnect();
  }, [text]);

  const lastIdx = layout ? Math.min(layout.lines.length, layout.geo.ys.length) - 1 : 0;
  const height = layout
    ? layout.geo.ys[lastIdx] + layout.fontSize * layout.geo.scales[lastIdx] * 0.35
    : 0;

  return (
    <div ref={hostRef} className={className}>
      {layout && (
        <svg
          width={layout.width}
          height={Math.ceil(height)}
          viewBox={`0 0 ${layout.width} ${Math.ceil(height)}`}
          style={{ display: 'block', overflow: 'visible' }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* The scene's orange, lifted towards its highlight at the right
                end - the direction the lettering's own lighting runs. */}
            <linearGradient id="hero-arc-accent" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#D85A30" />
              <stop offset="1" stopColor="#FF8A65" />
            </linearGradient>
            {layout.lines.map((_, i) => {
              const { ys, thetas, cy } = layout.geo;
              const y = ys[Math.min(i, ys.length - 1)];
              const R = cy - y;
              const theta = thetas[Math.min(i, thetas.length - 1)];
              const cx = cy - ys[ys.length - 1] - BASE_ABOVE_TOP + 0; // == r
              if (theta < 0.01) {
                return (
                  <path key={i} id={`hero-arc-${i}`} d={`M 0 ${y.toFixed(1)} L ${layout.width} ${y.toFixed(1)}`} fill="none" />
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
                    `A ${R.toFixed(1)} ${R.toFixed(1)} 0 0 1 ${cx.toFixed(1)} ${y.toFixed(1)} ` +
                    `L ${layout.width} ${y.toFixed(1)}`
                  }
                  fill="none"
                />
              );
            })}
          </defs>
          {layout.lines.map((line, i) => {
            const idx = Math.min(i, layout.geo.scales.length - 1);
            const last = Math.max(1, layout.geo.scales.length - 1);
            const t = idx / last;
            const scale = layout.geo.scales[idx];
            const track = TRACK_GAIN * layout.fontSize * scale * t;
            const fill = FILL_FROM + (FILL_TO - FILL_FROM) * t;
            // Glow ramps with the crescendo; the two lines nearest the lettering
            // additionally breathe (the --hot class carries the pulse).
            const glowR = (5 + 9 * t).toFixed(1);
            const glowA = (0.12 + 0.26 * t).toFixed(2);
            const segments = accentSegments(line, ACCENT[lang] || ACCENT.pl);
            return (
              <text
                key={i}
                className={`hero-en-arc-line${i >= layout.lines.length - 2 ? ' hero-en-arc-line--hot' : ''}`}
                style={{
                  fontSize: `${(layout.fontSize * scale).toFixed(2)}px`,
                  ['--track']: `${track.toFixed(2)}px`,
                  ['--line-i']: i,
                  fill: `rgba(255, 255, 255, ${fill.toFixed(2)})`,
                  filter: `drop-shadow(0 0 ${glowR}px rgba(216, 90, 48, ${glowA}))`
                }}
              >
                <textPath href={`#hero-arc-${i}`}>
                  {segments.map((sg, k) =>
                    sg.hot
                      ? <tspan key={k} fill="url(#hero-arc-accent)">{sg.t}</tspan>
                      : <tspan key={k}>{sg.t}</tspan>
                  )}
                </textPath>
              </text>
            );
          })}
        </svg>
      )}
    </div>
  );
}
