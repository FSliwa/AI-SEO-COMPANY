// „Weitere kostenlose Tools”: wydzielone z UkladDe.jsx bez importów serwerowych,
// dzięki czemu działa zarówno w komponentach serwerowych (UkladDe), jak i klienckich (KiSichtbarkeitPruefenDe.jsx).

import Ikona, { ikonaNarzedzia } from '@/components/narzedzia/Ikony';
import { Link as IntlLink } from '@/i18n/routing';
import { maWersjeDe } from '@/lib/stronyDe';
import { AUDYT, AUTORYTET, GENERATOR } from '@/lib/narzedziaLiczby';
import { KARTY_DE } from '@/lib/narzedzia.de';
import st from '@/components/narzedzia/narzedzia.module.css';
import * as s from '@/components/narzedzia/styl';

export function WeitereToolsDe({ bez }) {
  const L = {
    audytStron: AUDYT.stron,
    botow: GENERATOR.botow,
    botowAi: GENERATOR.botowAi,
    konkurentow: AUTORYTET.konkurentow,
    silniki: 'ChatGPT, Gemini, Perplexity, Claude und AI Overviews',
  };
  const karty = Object.entries(KARTY_DE).filter(([href]) => href !== bez && maWersjeDe(href));
  const maHub = maWersjeDe('/narzedzia');
  if (!karty.length && !maHub) return null;
  return (
    <section aria-labelledby="weitere-tools" className={st.sekcja} style={s.sekcja}>
      <h2 id="weitere-tools" className={st.h2} style={{ ...s.h2, marginBottom: '1.25rem' }}>Weitere kostenlose Tools</h2>
      <ul className={st.siatka}>
        {karty.map(([href, k]) => (
          <li key={href}>
            <IntlLink href={href} className={st.kafel}>
              <span className={st.kafelIkona}><Ikona nazwa={ikonaNarzedzia(href)} /></span>
              <span className={st.kafelNazwa}>{k.nazwa}</span>
              <span className={st.kafelOpis}>{k.opis(L)}</span>
            </IntlLink>
          </li>
        ))}
        {maHub && (
          <li>
            <IntlLink href="/narzedzia" className={`${st.kafel} ${st.kafelHub}`}>
              <span className={st.kafelIkona}><Ikona nazwa="szablon" /></span>
              <span className={st.kafelNazwa}>Alle kostenlosen SEO- und KI-Tools</span>
              <span className={st.kafelOpis}>vollständige Übersicht inklusive herunterladbarer SEO-Vorlagen</span>
            </IntlLink>
          </li>
        )}
      </ul>
    </section>
  );
}

export default WeitereToolsDe;
