// „Inne darmowe narzędzia” (S1-poprawki Z-02, agent wspolne, 12.11.2026): pełna siatka WSZYSTKICH
// darmowych narzędzi (audyt, widoczność w AI, kalkulator, makieta, generator llms.txt, autorytet domeny)
// i link do huba. Wyjęte z UkladAplikacji.jsx bez importów serwerowych, więc działa też w komponentach
// klienckich (AiCheckerClient.jsx) i w GeneratorLlmsTxt.jsx. Nieopublikowane cele (lib/publikacja.js)
// i bieżąca strona (prop bez) znikają same; sprawdzarka AI tylko przy SPRAWDZARKA_DZIALA.
// Liczby w opisach ze stałych lib/narzedziaLiczby.js (Z-00), bez nazw konkurentów.

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana, SPRAWDZARKA_DZIALA } from '@/lib/publikacja';
import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, listaSilnikow } from '@/lib/narzedziaLiczby';
import st from './narzedzia.module.css';
import * as s from './styl';

/** Rodzic okruszków każdej strony narzędzia: „Strona główna › Narzędzia › …” (Breadcrumbs prop parent). */
export const RODZIC_HUBA = { href: '/narzedzia', pl: 'Narzędzia', en: 'Tools' };

/** Kolejność = kolejność na stronach. href to klucz PL (Link sam tłumaczy na adres EN). */
export const NARZEDZIA = [
  { href: '/narzedzia/audyt-seo', pl: ['Darmowy audyt SEO', `ocena 1-100 i lista błędów dla do ${AUDYT.stron} podstron`], en: ['Free SEO audit', `a 1-100 score and a list of errors for up to ${AUDYT.stron} pages`] },
  { href: '/sprawdz-widocznosc-w-ai', pl: ['Widoczność w AI', `czy ${listaSilnikow('pl')} wymieniają Twoją firmę`], en: ['AI visibility check', `whether ${listaSilnikow('en')} name your business`] },
  { href: '/narzedzia/kalkulator-strat-seo', pl: ['Kalkulator strat bez SEO', 'ile zysku miesięcznie tracisz bez TOP 3 w Google i poleceń w AI'], en: ['SEO loss calculator', 'the monthly profit you lose without a Google top 3 position and AI recommendations'] },
  { href: '/narzedzia/makieta-redesignu', pl: ['Makieta nowej strony', `nowa strona główna z AI w ${MAKIETA.minut} minuty, z Twoich treści`], en: ['Website redesign mockup', `a new AI homepage design in ${MAKIETA.minut} minutes, built from your content`] },
  { href: '/narzedzia/generator-llms-txt', pl: ['Generator llms.txt', `plik llms.txt z mapy strony i test dostępu ${GENERATOR.botow} botów AI`], en: ['llms.txt generator', `an llms.txt file from your sitemap and an access test for ${GENERATOR.botow} AI bots`] },
  { href: '/narzedzia/autorytet-domeny', pl: ['Autorytet domeny', `wynik 0-100 z grafu linków Common Crawl i porównanie z maksymalnie ${AUTORYTET.konkurentow} konkurentami`], en: ['Domain authority checker', `a 0-100 score from the Common Crawl link graph, compared with up to ${AUTORYTET.konkurentow} competitors`] },
];

function normalizujBez(bez) {
  if (!bez) return null;
  return bez.startsWith('/') ? bez : `/narzedzia/${bez}`; // zgodność wstecz: bez="audyt-seo"
}

/** Opublikowane narzędzia poza bieżącym: [{ href, nazwa, opis }] (do własnych układów, np. karty huba). */
export function linkiNarzedzi({ bez, locale = 'pl' } = {}) {
  const pomin = normalizujBez(bez);
  return NARZEDZIA
    .filter((n) => n.href !== pomin)
    .filter((n) => (n.href === '/sprawdz-widocznosc-w-ai' ? SPRAWDZARKA_DZIALA : true) && hrefJesliOpublikowana(n.href))
    .map((n) => { const [nazwa, opis] = locale === 'en' ? n.en : n.pl; return { href: n.href, nazwa, opis }; });
}

/**
 * <PozostaleNarzedzia bez="/narzedzia/audyt-seo" locale="pl" />
 * bez: ścieżka PL bieżącej strony (albo sam slug /narzedzia/<slug>, zgodność wstecz).
 * tytul: własny H2 (domyślnie „Inne darmowe narzędzia” / „More free tools”).
 */
export default function PozostaleNarzedzia({ bez, locale = 'pl', tytul }) {
  const en = locale === 'en';
  const hub = hrefJesliOpublikowana(RODZIC_HUBA.href);
  const linki = linkiNarzedzi({ bez, locale });
  if (!linki.length && !hub) return null;
  const id = en ? 'more-tools' : 'inne-narzedzia';
  return (
    <section aria-labelledby={id} className={`${st.sekcja} ${st.sekcjaKarta}`} style={{ ...s.sekcja, ...s.karta }}>
      <h2 id={id} style={{ ...s.h2, marginBottom: '1rem' }}>{tytul ?? (en ? 'More free tools' : 'Inne darmowe narzędzia')}</h2>
      <ul className={st.siatka}>
        {linki.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className={st.kafel}>
              <span className={st.kafelNazwa}>{n.nazwa}</span>
              <span className={st.kafelOpis}>{n.opis}</span>
            </Link>
          </li>
        ))}
        {hub && (
          <li>
            <Link href={hub} className={`${st.kafel} ${st.kafelHub}`}>
              <span className={st.kafelNazwa}>{en ? 'All free tools and templates' : 'Wszystkie darmowe narzędzia i szablony'}</span>
              <span className={st.kafelOpis}>{en ? 'the full list, with SEO templates to download' : 'pełna lista razem z szablonami SEO do pobrania'}</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
