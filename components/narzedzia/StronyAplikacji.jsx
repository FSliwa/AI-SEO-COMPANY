// Strony czterech darmowych aplikacji pod /narzedzia/<slug>. Od 11.11.2026 każda strona ma własny plik
// (AudytSeoStrona.jsx, AutorytetStrona.jsx, KalkulatorStrona.jsx, MakietaStrona.jsx), a wspólny układ
// jest w UkladAplikacji.jsx. Ten plik zostaje jako punkt importu dla app/[locale]/narzedzia/[slug]/page.js.
export { AudytSeoStrona } from './AudytSeoStrona';
export { AutorytetStrona } from './AutorytetStrona';
export { KalkulatorStrona } from './KalkulatorStrona';
export { MakietaStrona } from './MakietaStrona';
export { ZRODLA_KALKULATORA } from '@/lib/kalkulatorStrat';
