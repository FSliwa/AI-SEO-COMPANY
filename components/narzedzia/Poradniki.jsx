// Blok „Poradniki do tego narzędzia” (S1-poprawki Z-03, agent wspolne, 12.11.2026). Stoi przed
// PozostaleNarzedzia. Bez hooków i importów serwerowych: działa w komponentach serwerowych i klienckich.
//   <Poradniki narzedzie="/narzedzia/audyt-seo" locale="pl" />          lista z lib/narzedzia/poradniki.js
//   <Poradniki pozycje={[{ href, pl: [tytuł, opis], en: [tytuł, opis] }]} locale="en" />
// Pozycje nieopublikowane (lib/publikacja.js) znikają; na EN znikają pozycje bez `en` albo bez wersji EN.
// Link przez <Link> z kluczem PL (tłumaczy się sam, bez 308).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { hrefWJezyku } from '@/lib/linkiEn';
import { PORADNIKI } from '@/lib/narzedzia/poradniki';
import st from './narzedzia.module.css';
import * as s from './styl';

export default function Poradniki({ narzedzie, pozycje, locale = 'pl', tytul, id }) {
  const en = locale === 'en';
  const lista = (pozycje ?? PORADNIKI[narzedzie] ?? []).filter((p) => {
    if (!hrefJesliOpublikowana(p.href)) return false;
    if (en) return Boolean(p.en) && hrefWJezyku(p.href, 'en') !== null;
    return Boolean(p.pl);
  });
  if (!lista.length) return null;
  const idSekcji = id ?? (en ? 'guides' : 'poradniki');
  return (
    <section aria-labelledby={idSekcji} className={st.sekcja} style={s.sekcja}>
      <h2 id={idSekcji} style={s.h2}>{tytul ?? (en ? 'Guides for this tool' : 'Poradniki do tego narzędzia')}</h2>
      <ul className={st.poradniki}>
        {lista.map((p) => {
          const [t, opis] = en ? p.en : p.pl;
          return (
            <li key={p.href}>
              <Link href={p.href} style={s.podkreslenie}>{t}</Link>
              {opis ? <>: {opis}</> : null}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
