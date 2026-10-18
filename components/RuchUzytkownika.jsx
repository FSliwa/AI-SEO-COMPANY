'use client';

import { MotionConfig } from 'framer-motion';

/**
 * prefers-reduced-motion dla wszystkich komponentow framer-motion naraz
 * (05.10.2026). Wejscia sekcji (<Reveal>, <RevealItem>), pulsujace liczby w
 * karuzeli "Dlaczego my" i rzad partnerow w hero nie sprawdzaly ustawienia
 * "ogranicz ruch" i jechaly z przesunieciem 14-30 px takze przy nim.
 * reducedMotion="user": przy wlaczonym ograniczeniu ruchu framer-motion
 * pomija animacje transformacji (przesuniecie, skala), a zostawia zmiany
 * przezroczystosci. Bez tego ustawienia nic sie nie zmienia.
 */
export default function RuchUzytkownika({ children }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
