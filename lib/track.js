// Jedno wejście dla zdarzeń niestandardowych GA4 / Google Ads. Bez gtag
// (blokada skryptów, SSR) nic się nie dzieje. gtag rozsyła każde zdarzenie do
// obu właściwości GA4 i do tagu Ads, bo wszystkie trzy są skonfigurowane
// w app/[locale]/layout.js.
export function track(name, params = {}) {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  window.gtag('event', name, params);
}

// Zdarzenie DOM, którym przyciski „Wybierz" w cenniku przekazują pakiet do
// formularza kontaktowego (components/AnalyticsEvents.jsx -> Contact.jsx).
export const PRESELECT_PLAN_EVENT = 'aiseo:preselect-plan';
