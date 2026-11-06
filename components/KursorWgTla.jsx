'use client';

import { useEffect } from 'react';

/*
 * Kursor czarny albo bialy zaleznie od tla pod nim (7.11.2026).
 *
 * Statyczne reguly CSS (.cursor-light w globals.css) zgadywaly kolor po
 * sekcji, a po przebudowie wedlug makiety wiele sekcji ma tlo z grafiki:
 * jasne chmury nad ciemnymi gorami, ciemna antena na jasnym niebie, jasne
 * karty na granacie. Tu mierzymy jasnosc tego, co faktycznie lezy pod
 * strzalka, i ustawiamy <html data-kursor-tlo="jasne|ciemne">; reguly
 * w app/wyglad.css podmieniaja wtedy grot i raczke na czarne albo biale.
 *
 * Skad jasnosc (od elementu pod kursorem w gore drzewa):
 *  1. <img> - piksel obrazka (z uwzglednieniem object-fit/object-position),
 *  2. element z data-kursor="obraz" - piksel jego obrazka tla (pierwsza
 *     warstwa url(), background-size "100% auto" albo "cover") albo
 *     <img data-kursor-zrodlo> w srodku; przezroczysty piksel -> wartosc
 *     z data-kursor-przezroczyste ("jasne"/"ciemne"), poza obrazkiem ->
 *     kolor tla elementu,
 *  3. data-kursor="jasne"/"ciemne" - wymuszenie,
 *  4. pierwszy nieprzezroczysty background-color.
 * <video> traktujemy jako ciemne (filmy realizacji sa ciemne).
 *
 * Koszt: jedno elementFromPoint na klatke rAF przy ruchu myszy, obrazki
 * skalowane raz do 160 px szerokosci (pamiec podreczna). Tylko precyzyjny
 * wskaznik - na dotyku komponent nic nie robi. Bez JS dzialaja dotychczasowe
 * reguly .cursor-light.
 */

const SZER = 160;

function jasnoscRgb(r, g, b) {
  const lin = (c) => {
    const s = c / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
}

function kolor(str) {
  const m = /rgba?\(([^)]+)\)/.exec(str || '');
  if (!m) return null;
  const p = m[1].split(/[\s,/]+/).filter(Boolean).map(parseFloat);
  return { L: jasnoscRgb(p[0], p[1], p[2]), a: p.length > 3 ? p[3] : 1 };
}

const pamiec = new Map();

function mapaObrazka(src) {
  if (pamiec.has(src)) return pamiec.get(src);
  pamiec.set(src, null);
  const img = new Image();
  img.decoding = 'async';
  img.onload = () => {
    try {
      const w = SZER;
      const h = Math.max(1, Math.round((img.naturalHeight / img.naturalWidth) * w));
      const c = document.createElement('canvas');
      c.width = w;
      c.height = h;
      const ctx = c.getContext('2d', { willReadFrequently: true });
      ctx.drawImage(img, 0, 0, w, h);
      const d = ctx.getImageData(0, 0, w, h).data;
      const L = new Float32Array(w * h);
      const A = new Uint8Array(w * h);
      for (let i = 0; i < w * h; i++) {
        L[i] = jasnoscRgb(d[i * 4], d[i * 4 + 1], d[i * 4 + 2]);
        A[i] = d[i * 4 + 3];
      }
      pamiec.set(src, { w, h, L, A, nw: img.naturalWidth, nh: img.naturalHeight });
    } catch (e) {
      pamiec.set(src, false);
    }
  };
  img.onerror = () => pamiec.set(src, false);
  img.src = src;
  return null;
}

// Probka 3x3 wokol punktu (u, v) w ulamkach 0..1 obrazka.
function probka(mapa, u, v) {
  if (u < 0 || u > 1 || v < 0 || v > 1) return { poza: true };
  let s = 0, a = 0, n = 0;
  const cx = Math.round(u * (mapa.w - 1)), cy = Math.round(v * (mapa.h - 1));
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const x = Math.min(mapa.w - 1, Math.max(0, cx + dx));
      const y = Math.min(mapa.h - 1, Math.max(0, cy + dy));
      s += mapa.L[y * mapa.w + x];
      a += mapa.A[y * mapa.w + x];
      n++;
    }
  }
  return { L: s / n, a: a / n / 255 };
}

function procentLubPx(wartosc, wolne) {
  const v = (wartosc || '0%').trim().split(/\s+/).pop();
  if (v.endsWith('%')) return (parseFloat(v) / 100) * wolne;
  return parseFloat(v) || 0;
}

// Prostokat narysowanego obrazka w ukladzie strony.
function prostokatObrazka(box, nw, nh, rozmiar, posX, posY) {
  let w, h;
  const r = (rozmiar || 'auto').trim();
  if (r === 'cover' || r === 'contain') {
    const s = r === 'cover' ? Math.max(box.width / nw, box.height / nh) : Math.min(box.width / nw, box.height / nh);
    w = nw * s;
    h = nh * s;
  } else if (r === 'fill') {
    w = box.width;
    h = box.height;
  } else {
    const [rw, rh = 'auto'] = r.split(/\s+/);
    w = rw === 'auto' ? nw : rw.endsWith('%') ? (parseFloat(rw) / 100) * box.width : parseFloat(rw);
    h = rh === 'auto' ? (w / nw) * nh : rh.endsWith('%') ? (parseFloat(rh) / 100) * box.height : parseFloat(rh);
    if (rw === 'auto' && rh !== 'auto') w = (h / nh) * nw;
  }
  return { x: box.left + procentLubPx(posX, box.width - w), y: box.top + procentLubPx(posY, box.height - h), w, h };
}

const LADOWANIE = { ladowanie: true };

function jasnoscImg(img, x, y) {
  const src = img.currentSrc || img.src;
  if (!src) return null;
  const mapa = mapaObrazka(src);
  if (mapa === null) return LADOWANIE;
  if (!mapa) return null;
  const cs = getComputedStyle(img);
  const box = img.getBoundingClientRect();
  const [px = '50%', py = '50%'] = (cs.objectPosition || '50% 50%').split(/\s+/);
  const fit = cs.objectFit === 'none' ? 'auto' : cs.objectFit === 'scale-down' ? 'contain' : cs.objectFit;
  const p = prostokatObrazka(box, mapa.nw, mapa.nh, fit, px, py);
  return probka(mapa, (x - p.x) / p.w, (y - p.y) / p.h);
}

function jasnoscTlaElementu(el, x, y) {
  const cs = getComputedStyle(el);
  const url = /url\("?([^")]+)"?\)/.exec(cs.backgroundImage || '');
  if (!url) return null;
  const mapa = mapaObrazka(url[1]);
  if (mapa === null) return LADOWANIE;
  if (!mapa) return null;
  const pierwsza = (s) => (s || '').split(',')[0].trim();
  const p = prostokatObrazka(el.getBoundingClientRect(), mapa.nw, mapa.nh, pierwsza(cs.backgroundSize), pierwsza(cs.backgroundPositionX), pierwsza(cs.backgroundPositionY));
  return probka(mapa, (x - p.x) / p.w, (y - p.y) / p.h);
}

const WYMUSZ = { jasne: 0.9, ciemne: 0.02 };

function jasnoscPod(x, y) {
  let el = document.elementFromPoint(x, y);
  for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
    if (n.tagName === 'VIDEO') return 0.05;
    if (n.tagName === 'IMG') {
      const r = jasnoscImg(n, x, y);
      if (r && r.ladowanie) return null;
      if (r && !r.poza && r.a > 0.5) return r.L;
    }
    const tryb = n.dataset ? n.dataset.kursor : undefined;
    if (tryb && WYMUSZ[tryb] !== undefined) return WYMUSZ[tryb];
    if (tryb === 'obraz') {
      const zrodlo = n.querySelector('img[data-kursor-zrodlo]');
      const r = zrodlo ? jasnoscImg(zrodlo, x, y) : jasnoscTlaElementu(n, x, y);
      // Mapa obrazka jeszcze sie wczytuje: nie zgadujemy, pomiar zostanie powtorzony.
      if (r && r.ladowanie) return null;
      if (r && !r.poza) {
        if (r.a > 0.5) return r.L;
        const przez = n.dataset.kursorPrzezroczyste;
        if (przez && WYMUSZ[przez] !== undefined) return WYMUSZ[przez];
      }
    }
    const k = kolor(getComputedStyle(n).backgroundColor);
    if (k && k.a > 0.5) return k.L;
  }
  return 0.9;
}

export default function KursorWgTla() {
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return undefined;
    const root = document.documentElement;
    let stan = 'jasne';
    let ramka = 0;
    let px = -1, py = -1;
    root.dataset.kursorTlo = stan;

    let ponow = 0;
    const zmierz = () => {
      ramka = 0;
      if (px < 0) return;
      // Srodek grotu (32 px, czubek w 1,1) - tam lezy wiekszosc pikseli kursora.
      const a = jasnoscPod(px + 7, py + 10);
      const b = jasnoscPod(px + 3, py + 4);
      if (a === null || b === null) {
        clearTimeout(ponow);
        ponow = setTimeout(() => { if (!ramka) ramka = requestAnimationFrame(zmierz); }, 120);
        return;
      }
      const L = (a + b) / 2;
      // Histereza: bez migania na granicy dwoch tel.
      const nowy = stan === 'jasne' ? (L < 0.17 ? 'ciemne' : 'jasne') : (L > 0.24 ? 'jasne' : 'ciemne');
      if (nowy !== stan) {
        stan = nowy;
        root.dataset.kursorTlo = stan;
      }
    };
    const ruch = (e) => {
      if (e.pointerType && e.pointerType !== 'mouse') return;
      px = e.clientX;
      py = e.clientY;
      if (!ramka) ramka = requestAnimationFrame(zmierz);
    };
    // Przewijanie przesuwa tlo pod nieruchoma mysza.
    const przewiniecie = () => { if (!ramka) ramka = requestAnimationFrame(zmierz); };
    // Mapy jasnosci grafik tla wczytujemy zawczasu (te pliki i tak sa juz
    // pobrane przez CSS), zeby pierwszy ruch nad grafika nie czekal.
    const rozgrzej = () => {
      document.querySelectorAll('[data-kursor="obraz"]').forEach((el) => {
        const zrodlo = el.querySelector('img[data-kursor-zrodlo]');
        if (zrodlo) { if (zrodlo.currentSrc || zrodlo.src) mapaObrazka(zrodlo.currentSrc || zrodlo.src); return; }
        const url = /url\("?([^")]+)"?\)/.exec(getComputedStyle(el).backgroundImage || '');
        if (url) mapaObrazka(url[1]);
      });
    };
    const bezczynnosc = 'requestIdleCallback' in window ? window.requestIdleCallback(rozgrzej, { timeout: 2500 }) : window.setTimeout(rozgrzej, 1200);
    window.addEventListener('pointermove', ruch, { passive: true });
    window.addEventListener('scroll', przewiniecie, { passive: true });
    return () => {
      window.removeEventListener('pointermove', ruch);
      window.removeEventListener('scroll', przewiniecie);
      if (ramka) cancelAnimationFrame(ramka);
      clearTimeout(ponow);
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(bezczynnosc); else clearTimeout(bezczynnosc);
      delete root.dataset.kursorTlo;
    };
  }, []);
  return null;
}
