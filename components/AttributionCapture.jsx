'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { captureAttribution, syncCookieFromSession } from '@/lib/attribution';

// Zapisuje gclid/gbraid/wbraid i utm_* z adresu wejścia (lib/attribution.js).
// Montowany raz w layoucie; odpala się przy każdej zmianie ścieżki, bo
// parametry z reklamy mogą trafić także na podstronę wewnętrzną.
// CookiesBanner wysyła 'aiseo:consent' po zapisie zgody — wtedy dane sesji
// przechodzą do ciasteczka 90-dniowego (tylko przy zgodzie marketingowej).
export default function AttributionCapture() {
  const pathname = usePathname();

  useEffect(() => { captureAttribution(); }, [pathname]);

  useEffect(() => {
    const onConsent = () => syncCookieFromSession();
    window.addEventListener('aiseo:consent', onConsent);
    return () => window.removeEventListener('aiseo:consent', onConsent);
  }, []);

  return null;
}
