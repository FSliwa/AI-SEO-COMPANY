'use client';

// Panel kafli z narzędziami w hero (19.11.2026, hero v8). Klient dokłada tylko ruch i sterowanie:
// całą treść (siedem linków, teksty, małe kafle) renderuje serwer i przychodzi tu jako `children`.
//
// Tryby (od szerokości okna i ustawienia ograniczonego ruchu):
//  - 'drift'     >= 1200 px: pionowy dryf kafli (WAAPI, tylko transform) z pętlą na kopii listy,
//                pauza na hover, fokus z klawiatury, przycisk, ukrytą kartę i poza ekranem;
//                przeciąganie myszą z przyciąganiem, strzałki, Home/End, przyciski; kółko na żądanie;
//  - 'statyczny' >= 1200 px i prefers-reduced-motion: zwykła przewijana lista, nic się nie rusza;
//  - 'pas'       < 1200 px: poziomy pas scroll-snap (przesunięcie palcem, strzałki, przyciski).
// Kółko myszy NIE jest przechwytywane domyślnie (brak słuchacza wheel); tryb „Kółko: kafle” dopina go
// dopiero po kliknięciu, z budżetem 1,5 kafla na gest, potem strona przewija się dalej (brak pułapki).
// Kopia listy do pętli jest tworzona w DOM po hydracji (aria-hidden, inert, bez linków), więc HTML z serwera
// ma każdy tekst tylko raz. Łączniki (przerywane linie z miękkimi narożnikami) liczy się z układu.

import { useEffect, useRef, useState } from 'react';
import { LITERY_D, LITERY_TRANSFORM } from './HeroLiteryDane';

const PREDKOSC = 24; // px/s: stała prędkość, jak pas chmur
const SVG_NS = 'http://www.w3.org/2000/svg';

function bezier(x1, y1, x2, y2) {
  const cx = (t) => 3 * x1 * t * (1 - t) * (1 - t) + 3 * x2 * t * t * (1 - t) + t * t * t;
  const cy = (t) => 3 * y1 * t * (1 - t) * (1 - t) + 3 * y2 * t * t * (1 - t) + t * t * t;
  return (x) => {
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 24; i++) {
      const v = cx(t);
      if (Math.abs(v - x) < 1e-4) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return cy(t);
  };
}
const ease = bezier(0.16, 1, 0.3, 1);
const mod = (a, n) => ((a % n) + n) % n;
const kafle = (z) => [...z.querySelectorAll(':scope > ul > li')];

export default function HeroNarzedzia({ n, ui, children }) {
  const panelRef = useRef(null);
  const oknoRef = useRef(null);
  const torRef = useRef(null);
  const sterRef = useRef(null);
  const [tryb, setTryb] = useState('');
  const [wstrzymany, setWstrzymany] = useState(false);
  const [kolko, setKolko] = useState(false);
  const [nr, setNr] = useState(1);
  // Mosty z komponentu do efektu (efekt ma własny stan ruchu w domknięciu).
  const api = useRef({});

  useEffect(() => {
    const sec = panelRef.current, win = oknoRef.current, tor = torRef.current, ster = sterRef.current;
    if (!sec || !win || !tor) return undefined;
    const mqDesk = window.matchMedia('(min-width: 1200px)');
    const mqRM = window.matchMedia('(prefers-reduced-motion: reduce)');
    let anim = null, L = 0, D = 0, snaps = [], z1 = null, z2 = null;
    let reasons = {}, idleT = 0, tw = 0, mode = '', ro = null, cnt = 0, io = null;
    let lastY = window.scrollY, budget = 0, lastW = 0, wheelEndT = 0, drag = null, suppress = false, wheelOn = false;
    const onScroll = () => { lastY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    const has = () => Object.values(reasons).some(Boolean);

    /* ---------- łączniki: w torze, jadą z kafelkami ---------- */
    function drawConnectors(z) {
      const svg = z.querySelector('svg.hn-lacz');
      if (!svg) return;
      const lis = kafle(z), W = z.clientWidth, H = z.clientHeight, ds = [];
      svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const R = (li) => ({ x: li.offsetLeft, y: li.offsetTop, w: li.offsetWidth, h: li.offsetHeight });
      // Promień narożnika: 28 px (pierwszy) i 16-20 px (przy grocie), przycinany do długości odcinków.
      const rad = (maks, pion, poz1, poz2) => Math.max(6, Math.min(maks, pion / 2, poz1 - 2, poz2 - 2));
      for (let i = 0; i < lis.length - 1; i++) {
        const a = R(lis[i]), b = R(lis[i + 1]);
        const y0 = a.y + Math.round(a.h * 0.4), y1 = b.y + Math.round(b.h * 0.4); // wyjście i wejście na 40% wysokości kafla
        if (i % 2 === 0) { // kafel po lewej -> następny po prawej
          const x0 = a.x + a.w, xr = W - 12, x1 = b.x + b.w + 6;
          const r1 = rad(28, y1 - y0, xr - x0, 999), r2 = rad(18, y1 - y0, 999, xr - x1);
          ds.push(`M${x0} ${y0}H${xr - r1}A${r1} ${r1} 0 0 1 ${xr} ${y0 + r1}V${y1 - r2}A${r2} ${r2} 0 0 1 ${xr - r2} ${y1}H${x1}`);
        } else { // kafel po prawej -> następny po lewej
          const xl = 12, x0b = a.x, x1b = b.x - 6;
          const r3 = rad(28, y1 - y0, x0b - xl, 999), r4 = rad(18, y1 - y0, 999, x1b - xl);
          ds.push(`M${x0b} ${y0}H${xl + r3}A${r3} ${r3} 0 0 0 ${xl} ${y0 + r3}V${y1 - r4}A${r4} ${r4} 0 0 0 ${xl + r4} ${y1}H${x1b}`);
        }
      }
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      // Najpierw jasny obrys pod kreskami, potem przerywana linia z grotem.
      ds.forEach((d) => { const o = document.createElementNS(SVG_NS, 'path'); o.setAttribute('d', d); o.setAttribute('class', 'o'); svg.appendChild(o); });
      ds.forEach((d) => { const p = document.createElementNS(SVG_NS, 'path'); p.setAttribute('d', d); p.setAttribute('marker-end', 'url(#hn-grot)'); svg.appendChild(p); });
    }

    /* ---------- pomiar i tor ---------- */
    function measure() {
      z1 = tor.querySelector('.hn-zestaw');
      z2 = tor.querySelectorAll('.hn-zestaw')[1] || null;
      snaps = kafle(z1).map((li) => z1.offsetTop + li.offsetTop - 16);
      if (z2) {
        const ratio = anim ? mod(Number(anim.currentTime), D || 1) / (D || 1) : 0;
        L = z2.offsetTop - z1.offsetTop; D = (L / PREDKOSC) * 1000;
        if (anim) {
          anim.effect.setKeyframes([{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(0,${-L}px,0)` }]);
          anim.effect.updateTiming({ duration: D });
          anim.currentTime = ratio * D;
        }
      }
      drawConnectors(z1);
      if (z2) drawConnectors(z2);
    }
    const posNow = () => (anim ? (mod(Number(anim.currentTime), D) / D) * L : win.scrollTop);
    const setPos = (p) => { anim.currentTime = (mod(p, L) / L) * D; };
    function nearestIdx(p) {
      let best = 0, bd = 1e9;
      for (let i = 0; i < n; i++) {
        const dd = Math.min(Math.abs(snaps[i] - p), Math.abs(snaps[i] + L - p));
        if (dd < bd) { bd = dd; best = i; }
      }
      return best;
    }
    const snapAbs = (idx) => Math.floor(idx / n) * L + snaps[mod(idx, n)];
    function applyPlay() {
      if (!anim) return;
      const run = !has();
      if (run && anim.playState !== 'running') anim.play();
      if (!run && anim.playState === 'running') anim.pause();
      setWstrzymany(Boolean(reasons.btn));
    }
    function setIdle(ms) {
      clearTimeout(idleT); reasons.idle = true; applyPlay();
      idleT = setTimeout(() => { reasons.idle = false; applyPlay(); }, ms);
    }
    function endGesture() { reasons.drag = false; reasons.wheel = false; reasons.tween = false; win.classList.remove('drag'); setIdle(3000); }
    function tweenTo(target, dur = 480) {
      cancelAnimationFrame(tw);
      const p0 = posNow(), t0 = performance.now();
      reasons.tween = true; applyPlay();
      (function f(t) {
        const k = Math.min(1, (t - t0) / dur);
        setPos(p0 + (target - p0) * ease(k)); updateCount();
        if (k < 1) tw = requestAnimationFrame(f); else endGesture();
      })(t0);
    }
    function move(d) {
      if (anim) { tweenTo(snapAbs(nearestIdx(posNow()) + d)); return; }
      if (mode === 'pas') {
        const s = (win.querySelector('li').offsetWidth + 16) * d;
        win.scrollBy({ left: s, behavior: mqRM.matches ? 'auto' : 'smooth' });
        return;
      }
      const li = kafle(win.querySelector('.hn-zestaw')), st = win.scrollTop;
      let cur = 0;
      for (let i = 0; i < li.length; i++) if (li[i].offsetTop - 16 <= st + 8) cur = i;
      win.scrollTo({ top: li[Math.max(0, Math.min(n - 1, cur + d))].offsetTop - 16, behavior: 'auto' });
    }
    function toEdge(first) {
      if (anim) { const cur = nearestIdx(posNow()); tweenTo(snapAbs(first ? Math.floor(cur / n) * n : Math.floor(cur / n) * n + n - 1)); }
      else if (mode === 'pas') win.scrollTo({ left: first ? 0 : 1e6 });
      else win.scrollTo({ top: first ? 0 : 1e6 });
    }
    function updateCount() {
      let i = 0;
      if (anim) i = nearestIdx(posNow());
      else if (mode === 'pas') { const w = win.querySelector('li').offsetWidth + 16; i = Math.round(win.scrollLeft / w); }
      else { const st = win.scrollTop, li = kafle(win.querySelector('.hn-zestaw')); for (let k = 0; k < li.length; k++) if (li[k].offsetTop - 16 <= st + 40) i = k; }
      setNr(Math.max(0, Math.min(n - 1, i)) + 1);
    }

    /* ---------- tryby ---------- */
    function teardown() {
      cancelAnimationFrame(tw); clearTimeout(idleT); clearTimeout(wheelEndT);
      if (anim) { anim.cancel(); anim = null; }
      tor.querySelectorAll('.hn-zestaw').forEach((z, i) => { if (i > 0) z.remove(); });
      reasons = {}; clearInterval(cnt); if (io) io.disconnect(); if (ro) ro.disconnect();
      win.classList.remove('drift', 'statyczny', 'drag'); win.scrollTop = 0; win.scrollLeft = 0;
    }
    function setup() {
      teardown();
      const desk = mqDesk.matches, rm = mqRM.matches;
      mode = !desk ? 'pas' : (rm ? 'statyczny' : 'drift');
      sec.setAttribute('data-tryb', mode);
      setTryb(mode);
      if (mode === 'statyczny') win.classList.add('statyczny');
      z1 = tor.querySelector('.hn-zestaw');
      if (mode === 'drift') {
        const c = z1.cloneNode(true);
        c.setAttribute('aria-hidden', 'true'); c.inert = true;
        c.querySelectorAll('[id]').forEach((e) => e.removeAttribute('id'));
        c.querySelectorAll('[aria-describedby],[aria-label]').forEach((e) => { e.removeAttribute('aria-describedby'); e.removeAttribute('aria-label'); });
        c.querySelectorAll('a').forEach((a) => { a.removeAttribute('href'); a.tabIndex = -1; });
        c.querySelectorAll('li').forEach((li) => { li.style.animation = 'none'; });
        tor.appendChild(c);
        win.classList.add('drift');
        measure();
        anim = tor.animate([{ transform: 'translate3d(0,0,0)' }, { transform: `translate3d(0,${-L}px,0)` }], { duration: D, iterations: Infinity, easing: 'linear' });
        reasons.start = true; applyPlay();
        setTimeout(() => { reasons.start = false; applyPlay(); }, 1200);
        io = new IntersectionObserver((es) => { reasons.off = !es[0].isIntersecting; applyPlay(); }, { threshold: 0.1 }); io.observe(win);
        ro = new ResizeObserver(() => measure()); ro.observe(z1);
        cnt = setInterval(updateCount, 250);
      } else {
        measure();
        ro = new ResizeObserver(() => measure()); ro.observe(z1);
        cnt = setInterval(updateCount, 250);
        if (mode === 'statyczny') win.addEventListener('scroll', updateCount, { passive: true });
      }
      updateCount();
      window.__heroNarzedzia = { tryb: mode, get anim() { return anim; }, poz: posNow, L: () => L, n, powody: () => JSON.parse(JSON.stringify(reasons)) };
    }

    api.current = {
      prev: () => move(-1), next: () => move(1),
      pauza: () => { reasons.btn = !reasons.btn; applyPlay(); },
      kolko: (wl) => { wheelOn = wl; if (wl) sec.addEventListener('wheel', naKolko, { passive: false }); else sec.removeEventListener('wheel', naKolko); },
    };

    /* ---------- klawiatura (na regionie, tylko gdy fokus w oknie kafli) ---------- */
    function naKlawisz(e) {
      if (!win.contains(e.target)) return;
      const k = e.key;
      if (mode === 'pas') {
        if (k === 'ArrowLeft') { e.preventDefault(); move(-1); } else if (k === 'ArrowRight') { e.preventDefault(); move(1); }
        return;
      }
      if (k === 'ArrowUp') { e.preventDefault(); move(-1); }
      else if (k === 'ArrowDown') { e.preventDefault(); move(1); }
      else if (k === 'Home') { e.preventDefault(); toEdge(true); }
      else if (k === 'End') { e.preventDefault(); toEdge(false); }
    }
    sec.addEventListener('keydown', naKlawisz);

    /* ---------- pauza: hover, fokus ---------- */
    const naWejscie = (e) => { if (e.pointerType === 'mouse') { reasons.hover = true; applyPlay(); } };
    const naWyjscie = (e) => { if (e.pointerType === 'mouse') { reasons.hover = false; setIdle(1500); } };
    sec.addEventListener('pointerenter', naWejscie);
    sec.addEventListener('pointerleave', naWyjscie);
    function naFokus(e) {
      if (e.target.matches && e.target.matches(':focus-visible')) { reasons.focus = true; applyPlay(); } // pauza tylko przy fokusie z klawiatury
      const li = e.target.closest && e.target.closest('li');
      if (li && !anim && win.contains(li)) { // pas i tryb statyczny: kafel w pełni w oknie
        const q = li.getBoundingClientRect(), o = win.getBoundingClientRect();
        if (mode === 'pas' && (q.left < o.left + 8 || q.right > o.right - 8)) win.scrollTo({ left: li.offsetLeft - (parseFloat(getComputedStyle(win).scrollPaddingLeft) || 16), behavior: 'auto' });
        if (mode === 'statyczny' && (q.top < o.top + 8 || q.bottom > o.bottom - 8)) win.scrollTo({ top: li.offsetTop - 16, behavior: 'auto' });
      }
      if (anim && li && tor.contains(li) && li.closest('.hn-zestaw') === z1) {
        cancelAnimationFrame(tw);
        const y = z1.offsetTop + li.offsetTop, h = li.offsetHeight, rel = y - posNow();
        if (rel < 24 || rel + h > win.clientHeight - 24) setPos(Math.max(0, y - 24));
        updateCount();
        // Fokus na kaflu poza oknem (overflow: clip) potrafi przewinąć stronę: gdy okno było widoczne, wróć.
        const dy = window.scrollY - lastY, wr = win.getBoundingClientRect();
        if (dy !== 0 && wr.top + dy < innerHeight && wr.bottom + dy > 0) window.scrollTo(0, lastY);
      }
    }
    sec.addEventListener('focusin', naFokus);
    const naUtrate = (e) => { if (!sec.contains(e.relatedTarget)) { reasons.focus = false; setIdle(1500); } };
    sec.addEventListener('focusout', naUtrate);
    const naWidocznosc = () => { reasons.hidden = document.hidden; applyPlay(); };
    document.addEventListener('visibilitychange', naWidocznosc);

    /* ---------- przeciąganie myszą lub piórem (dotyk przewija stronę) ---------- */
    const naDol = (e) => {
      if (!anim || e.pointerType === 'touch' || e.button !== 0) return;
      if (ster && ster.contains(e.target)) return;
      drag = { y: e.clientY, p0: posNow(), on: false, s: [[performance.now(), e.clientY]] };
    };
    const naRuch = (e) => {
      if (!drag) return;
      const dy = e.clientY - drag.y;
      if (!drag.on && Math.abs(dy) > 6) {
        drag.on = true; sec.setPointerCapture(e.pointerId); win.classList.add('drag');
        cancelAnimationFrame(tw); reasons.drag = true; applyPlay();
      }
      if (drag.on) { setPos(drag.p0 - dy); drag.s.push([performance.now(), e.clientY]); if (drag.s.length > 6) drag.s.shift(); updateCount(); }
    };
    function naKoniec() {
      if (!drag) return;
      if (drag.on) {
        suppress = true; setTimeout(() => { suppress = false; }, 0);
        const a = drag.s[0], b = drag.s[drag.s.length - 1], v = (b[0] - a[0]) > 0 ? (b[1] - a[1]) / (b[0] - a[0]) : 0; // px/ms
        const target = posNow() - v * 240, idx = nearestIdx(mod(target, L)), base = Math.floor(target / L) * L;
        const cand = base + snaps[idx];
        tweenTo([cand, cand + L, cand - L].sort((p, q) => Math.abs(p - target) - Math.abs(q - target))[0]);
      }
      drag = null;
    }
    const naKlik = (e) => { if (suppress) { e.preventDefault(); e.stopPropagation(); } };
    sec.addEventListener('pointerdown', naDol);
    sec.addEventListener('pointermove', naRuch);
    sec.addEventListener('pointerup', naKoniec);
    sec.addEventListener('pointercancel', naKoniec);
    sec.addEventListener('click', naKlik, true);

    /* ---------- kółko: tylko po włączeniu przyciskiem, budżet 1,5 kafla na gest ---------- */
    function naKolko(e) {
      if (!anim || !wheelOn || e.ctrlKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      const now = performance.now();
      if (now - lastW > 600) budget = 1.5 * (snaps[1] - snaps[0]);
      lastW = now; clearTimeout(wheelEndT);
      wheelEndT = setTimeout(() => { if (reasons.wheel) tweenTo(snapAbs(nearestIdx(posNow()))); }, 600);
      if (budget <= 0) return; // budżet wyczerpany: zdarzenie idzie do strony (brak pułapki)
      const dy = e.deltaY * (e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? win.clientHeight : 1);
      e.preventDefault();
      const use = Math.min(Math.abs(dy), budget); budget -= use;
      cancelAnimationFrame(tw); reasons.wheel = true; reasons.tween = false; applyPlay();
      setPos(posNow() + (dy < 0 ? -use : use)); updateCount();
    }

    const naZmiane = () => { wheelOn = false; setKolko(false); sec.removeEventListener('wheel', naKolko); setup(); };
    mqDesk.addEventListener('change', naZmiane);
    mqRM.addEventListener('change', naZmiane);
    setup();

    return () => {
      teardown();
      window.removeEventListener('scroll', onScroll);
      sec.removeEventListener('wheel', naKolko);
      win.removeEventListener('scroll', updateCount);
      sec.removeEventListener('keydown', naKlawisz);
      sec.removeEventListener('pointerenter', naWejscie);
      sec.removeEventListener('pointerleave', naWyjscie);
      sec.removeEventListener('focusin', naFokus);
      sec.removeEventListener('focusout', naUtrate);
      sec.removeEventListener('pointerdown', naDol);
      sec.removeEventListener('pointermove', naRuch);
      sec.removeEventListener('pointerup', naKoniec);
      sec.removeEventListener('pointercancel', naKoniec);
      sec.removeEventListener('click', naKlik, true);
      document.removeEventListener('visibilitychange', naWidocznosc);
      mqDesk.removeEventListener('change', naZmiane);
      mqRM.removeEventListener('change', naZmiane);
      delete window.__heroNarzedzia;
    };
  }, [n]);

  const przelaczKolko = () => { const v = !kolko; setKolko(v); api.current.kolko && api.current.kolko(v); };
  const drift = tryb === 'drift';

  return (
    <section ref={panelRef} className="hn-panel" id="narzedzia" aria-label={ui.etykieta} data-kursor="jasne">
      {/* Granatowy napis SEO (--w-noc) za kaflami: dekoracja, tylko od 1200 px. Inline SVG, bo kursor wg tła
          trafia wtedy w prawdziwy kształt liter, a nie w prostokąt (data-kursor="ciemne"). */}
      <svg className="hn-seo" viewBox="0 0 956 324" aria-hidden="true" focusable="false" data-kursor="ciemne">
        <path fill="#0A1337" transform={LITERY_TRANSFORM} d={LITERY_D} />
      </svg>
      <h2 className="sr-only">{ui.h2}</h2>
      <div ref={oknoRef} className="hn-okno" id="hn-okno">
        <div ref={torRef} className="hn-tor">
          <div className="hn-zestaw">
            {children}
            <svg className="hn-lacz" aria-hidden="true" focusable="false" />
          </div>
        </div>
      </div>
      {/* Pasek sterowania POD oknem kafli (nic go nie zasłania). Bez JS i przed hydracją ukryty. */}
      <div ref={sterRef} className="hn-pasek" hidden={!tryb}>
        <button type="button" className="pg" aria-pressed={wstrzymany} aria-controls="hn-okno" hidden={!drift} onClick={() => api.current.pauza && api.current.pauza()}>
          <svg className="pause" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1h3v10H2zM7 1h3v10H7z" /></svg>
          <svg className="play" viewBox="0 0 12 12" aria-hidden="true"><path d="M2 1l9 5-9 5z" /></svg>
          <span className="tx">{wstrzymany ? ui.wznow : ui.wstrzymaj}</span>
        </button>
        <button type="button" className="ib" aria-controls="hn-okno" aria-label={ui.poprzedni} onClick={() => api.current.prev && api.current.prev()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={tryb === 'pas' ? 'm15 6-6 6 6 6' : 'm6 15 6-6 6 6'} /></svg>
        </button>
        <button type="button" className="ib" aria-controls="hn-okno" aria-label={ui.nastepny} onClick={() => api.current.next && api.current.next()}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d={tryb === 'pas' ? 'm9 6 6 6-6 6' : 'm6 9 6 6 6-6'} /></svg>
        </button>
        <span className="lic" aria-hidden="true">{nr} {ui.z} {n}</span>
        <button type="button" className="kw" aria-pressed={kolko} hidden={!drift} onClick={przelaczKolko}>{kolko ? ui.kolkoKafle : ui.kolkoStrona}</button>
      </div>
      {/* Grot łączników (jasny obrys pod pomarańczowym), wspólny dla wszystkich ścieżek. */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <defs>
          <marker id="hn-grot" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="9" markerHeight="9" orient="auto">
            <path d="M2 1.5 8 5 2 8.5" fill="none" stroke="#FFFCF8" strokeOpacity=".92" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M2 1.5 8 5 2 8.5" fill="none" stroke="#BE461F" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>
      </svg>
    </section>
  );
}
