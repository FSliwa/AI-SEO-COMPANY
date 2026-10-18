// Zachowanie przewijania zgodne z ustawieniem "ogranicz ruch" (05.10.2026).
// Jawne behavior: 'smooth' w scrollIntoView/scrollBy ma pierwszenstwo przed
// CSS scroll-behavior, wiec sam blok @media (prefers-reduced-motion) w
// globals.css nie wylaczal plynnego przewijania w spisie tresci, linku do
// kontaktu w naglowku i karuzelach. Ta funkcja zwraca 'auto' (skok), gdy
// uzytkownik prosi o ograniczenie ruchu, a 'smooth' w pozostalych przypadkach.
export function zachowaniePrzewijania() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'smooth';
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';
}
