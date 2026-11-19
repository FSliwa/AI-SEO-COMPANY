// Początek własnego pliku /llms.txt do sekcji „llms.txt example” na /en/tools/llms-txt-generator
// (partia 2, p2-llms, 18.11.2026). Czytamy dokładnie to, co zwraca route app/llms.txt/route.js
// (ten sam kod, bez ręcznej kopii), więc przykład nie rozjedzie się z żywym plikiem po wdrożeniu.
// Tylko do użycia w komponentach serwerowych (strona jest statyczna: tekst powstaje przy buildzie).
import { GET } from '@/app/llms.txt/route';

/**
 * Pierwsze linie pliku, obcięte na granicy sekcji (przed pustą linią), maks. `maks` linii.
 * @returns {Promise<{ tekst: string, linii: number, lacznie: number }>}
 */
export async function poczatekLlmsTxt(maks = 35) {
  const calosc = (await GET().text()).replace(/\n$/, '');
  const linie = calosc.split('\n');
  let koniec = Math.min(maks, linie.length);
  if (koniec < linie.length) {
    // Cofnij do ostatniej pustej linii w oknie, żeby nie urywać sekcji w połowie.
    while (koniec > 0 && linie[koniec] !== '') koniec -= 1;
    if (koniec === 0) koniec = Math.min(maks, linie.length);
  }
  const wycinek = linie.slice(0, koniec);
  return { tekst: wycinek.join('\n'), linii: wycinek.length, lacznie: linie.length };
}
