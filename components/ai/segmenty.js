// Pomocnicze funkcje treści spoke'ów AI (lib/pytaniaAi.js; 5.11.2026, PLAN-v2 6.0, 6.5, 6.7).
// Bez JSX i bez hooków: używają ich komponenty serwerowe (SpokeAiLayout, SpokeAiTresc)
// i testy w node. Format segmentów opisuje nagłówek lib/pytaniaAi.js.
//
// Reguła 6.0: link do celu, który jeszcze nie zwraca 200, renderujemy jako zwykły tekst.
// - strony z rejestru publikacji: hrefJesliOpublikowana() z lib/publikacja.js,
// - sprawdzarka: dopiero po T0.2 (SPRAWDZARKA_DZIALA w lib/pytaniaAi.js),
// - fragment z warunkiem (np. zdanie o generatorze llms.txt) znika w całości.

import { hrefJesliOpublikowana, czyOpublikowana } from '@/lib/publikacja';
import { hash } from '@/lib/anchors';
import { SPRAWDZARKA, SPRAWDZARKA_DZIALA } from '@/lib/pytaniaAi';

function jestSprawdzarka(href) {
  if (typeof href !== 'string') return false;
  const s = href.split('#')[0].split('?')[0].replace(/\/+$/, '');
  return s === SPRAWDZARKA;
}

/** Czy fragment z warunkiem ma się pokazać: cel istnieje (publikacja albo T0.2). Brak warunku = tak. */
export function spelniony(warunek) {
  if (!warunek) return true;
  if (jestSprawdzarka(warunek)) return SPRAWDZARKA_DZIALA;
  return czyOpublikowana(warunek);
}

/**
 * Docelowy href linku albo null (= zwykły tekst bez <a>).
 * { href, kotwica } -> kotwica z lib/anchors.js (np. 'ileKosztuje' -> '#ile-kosztuje');
 * { href, kotwicaId } -> dosłowne id na stronie docelowej (np. 'ac-metryki').
 */
export function celLinku({ href, kotwica, kotwicaId }) {
  if (typeof href !== 'string' || !href) return null;
  if (href.startsWith('#') || /^https?:\/\//.test(href)) return href;
  let pelny = href;
  if (kotwica) pelny = `${href}${hash(kotwica, 'pl')}`;
  else if (kotwicaId) pelny = `${href}#${kotwicaId}`;
  if (jestSprawdzarka(href)) return SPRAWDZARKA_DZIALA ? pelny : null;
  return hrefJesliOpublikowana(pelny);
}

/** Tekst segmentów bez znaczników (testy, liczenie słów, kontrola zdań wspólnych). */
export function tekstSegmentow(segs = []) {
  return segs
    .map((s) => {
      if (typeof s === 'string') return s;
      if (s && s.tresc) return spelniony(s.warunek) ? tekstSegmentow(s.tresc) : '';
      if (s && s.a) return s.a;
      return '';
    })
    .join('');
}

const ESC = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const esc = (t) => String(t).replace(/[&<>"]/g, (c) => ESC[c]);

/**
 * Segmenty jako HTML dla AppleFaq (odpowiedź idzie przez dangerouslySetInnerHTML i do JSON-LD
 * FAQPage - ta sama treść). Link warunkowy bez celu = sam tekst.
 */
export function htmlSegmentow(segs = []) {
  return segs
    .map((s) => {
      if (typeof s === 'string') return esc(s);
      if (s && s.tresc) return spelniony(s.warunek) ? htmlSegmentow(s.tresc) : '';
      if (s && s.a) {
        const cel = celLinku(s);
        return cel ? `<a href="${esc(cel)}">${esc(s.a)}</a>` : esc(s.a);
      }
      return '';
    })
    .join('');
}

/** FAQ wpisu w kształcie AppleFaq: stałe id (kotwice #pytanie) i odpowiedź jako HTML. */
export function faqDoAppleFaq(faq = []) {
  return faq.map((f) => ({ id: f.id, question: f.question, answer: htmlSegmentow(f.answer) }));
}
