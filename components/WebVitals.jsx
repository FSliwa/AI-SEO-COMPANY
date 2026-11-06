'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { pageType } from '@/lib/track';

// 5.11.2026 (PLAN-v2 rozdz. 7, RUM; TS-01 po weryfikacji, lataka T2 w wersji poprawionej):
// Core Web Vitals z danych polowych (playbook 4.3). CrUX nie ma danych dla
// www.ai-seo-company.pl od okna 27.09-24.10.2026 (API 5.11: 404 „chrome ux report data not
// found”), wiec CWV zbieramy sami w GA4. Jedno zdarzenie na metryke, tylko LCP, INP, CLS, FCP
// i TTFB.
//
// Celowo window.gtag z send_to, a NIE track() z lib/track.js: track() idzie do wszystkich
// konfiguracji z layoutu (GA4 547365077, GA4 552660385 i Google Ads), czyli do 5 zdarzen x 3 cele
// na odslone. web_vitals ma trafic tylko do wlasciwosci 547365077 (G-WVVRW8FP30).
// CLS mnozymy x1000 i zaokraglamy, bo metryka niestandardowa GA4 ma byc liczba calkowita.
// W GA4 547365077 (Filip): wymiary zdarzenia metric_name, metric_rating, metric_nav i dana
// niestandardowa metric_value; ocena dopiero po 28 dniach (>= 100 zdarzen LCP z page_type home
// i usluga), wczesniej raportowac „brak danych polowych”. Przy domyslnej zgodzie EOG
// (analytics_storage 'denied') w eksploracjach sa tylko sesje ze zgoda.
const METRYKI = new Set(['LCP', 'INP', 'CLS', 'FCP', 'TTFB']);
const GA4_RUM = 'G-WVVRW8FP30';

// Funkcja poza komponentem: stala referencja, wiec hook nie rejestruje obserwatorow od nowa.
function wyslij(m) {
  if (!METRYKI.has(m.name)) return;
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return;
  // Ta sama bramka co config w layoucie: podglady *.vercel.app i localhost nie wysylaja danych
  // do produkcyjnej wlasciwosci. Nie zakladamy, ze brak config zatrzyma zdarzenie z jawnym
  // send_to, wiec sprawdzamy flage z layoutu wprost.
  if (window.__aiscTracking === false) return;
  window.gtag('event', 'web_vitals', {
    metric_name: m.name,
    metric_value: Math.round(m.name === 'CLS' ? m.value * 1000 : m.value),
    metric_rating: m.rating,
    metric_id: m.id,
    metric_nav: m.navigationType,
    page_type: pageType(window.location.pathname),
    non_interaction: true,
    send_to: GA4_RUM,
  });
}

export default function WebVitals() {
  useReportWebVitals(wyslij);
  return null;
}
