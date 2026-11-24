// „Inne darmowe narzędzia” (S1-poprawki Z-02, agent wspolne, 12.11.2026): pełna siatka WSZYSTKICH
// darmowych narzędzi (audyt, widoczność w AI, kalkulator, makieta, generator llms.txt, autorytet domeny)
// i link do huba. Wyjęte z UkladAplikacji.jsx bez importów serwerowych, więc działa też w komponentach
// klienckich (AiCheckerClient.jsx) i w GeneratorLlmsTxt.jsx. Nieopublikowane cele (lib/publikacja.js)
// i bieżąca strona (prop bez) znikają same; sprawdzarka AI tylko przy SPRAWDZARKA_DZIALA.
// Liczby w opisach ze stałych lib/narzedziaLiczby.js (Z-00), bez nazw konkurentów.

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana, SPRAWDZARKA_DZIALA } from '@/lib/publikacja';
import { AUDYT, AUTORYTET, GENERATOR, MAKIETA, listaSilnikow } from '@/lib/narzedziaLiczby';
import Ikona, { ikonaNarzedzia } from './Ikony';
import st from './narzedzia.module.css';
import * as s from './styl';

/** Rodzic okruszków każdej strony narzędzia: „Strona główna › Narzędzia › …” (Breadcrumbs prop parent). */
export const RODZIC_HUBA = { href: '/narzedzia', pl: 'Narzędzia', en: 'Tools' };

/** Kolejność = kolejność na stronach. href to klucz PL (Link sam tłumaczy na adres EN). */
export const NARZEDZIA = [
  { href: '/narzedzia/audyt-seo', pl: ['Darmowy audyt SEO', `ocena 1-100 i lista błędów dla do ${AUDYT.stron} podstron`], en: ['Free SEO audit', `a 1-100 score and a list of errors for up to ${AUDYT.stron} pages`] },
  { href: '/sprawdz-widocznosc-w-ai', pl: ['Sprawdzarka AI visibility', `czy ${listaSilnikow('pl')} wymieniają Twoją firmę`], en: ['AI visibility check', `whether ${listaSilnikow('en')} name your business`] },
  { href: '/narzedzia/kalkulator-strat-seo', pl: ['Kalkulator strat bez SEO', 'ile zysku miesięcznie tracisz bez TOP 3 w Google i poleceń w AI'], en: ['SEO loss calculator', 'the monthly profit you lose without a Google top 3 position and AI recommendations'] },
  { href: '/narzedzia/makieta-redesignu', pl: ['Makieta strony internetowej', `nowa strona główna z AI w ${MAKIETA.minut} minuty, z Twoich treści`], en: ['Website redesign mockup', `a new AI homepage design in ${MAKIETA.minut} minutes, built from your content`] },
  { href: '/narzedzia/generator-llms-txt', pl: ['Generator llms.txt', `plik llms.txt z mapy strony i test dostępu ${GENERATOR.botowAi} botów AI i Bingbot`], en: ['llms.txt generator', `an llms.txt file from your sitemap and an access test for ${GENERATOR.botowAi} AI bots and Bingbot`] },
  { href: '/narzedzia/autorytet-domeny', pl: ['Autorytet domeny', `wynik 0-100 z grafu linków Common Crawl i porównanie z maksymalnie ${AUTORYTET.konkurentow} konkurentami`], en: ['Domain authority checker', `a 0-100 score from the Common Crawl link graph, compared with up to ${AUTORYTET.konkurentow} competitors`] },
  { href: '/narzedzia/tester-robotow-ai-robots-txt', pl: ['Tester robotów AI i robots.txt', 'test 15 botów AI w robots.txt i na żywo po HTTP, wykrywanie blokad WAF 403 i parzystość SSR'], en: ['AI crawler & robots.txt checker', 'test 15 AI crawlers in robots.txt and live HTTP, spot 403 WAF blocks and check SSR parity'] },
  { href: '/narzedzia/test-core-web-vitals-porownanie', pl: ['Porównywarka Core Web Vitals', 'dane Chrome UX Report z 28 dni (LCP, INP, CLS), rentgen wtyczek CMS i pojedynek z konkurentem'], en: ['Core Web Vitals comparison', '28-day Chrome UX Report field metrics (LCP, INP, CLS), CMS bloat X-ray and competitor showdown'] },
  { href: '/narzedzia/sprawdz-cytowalnosc-strony-ai', pl: ['Audytor cytowalności GEO', '6 kryteriów RAG dla bloków H2/H3, symulacja wycinka w AI Overviews i porównanie z konkurentem'], en: ['GEO citability checker', '6 RAG criteria across H2/H3 chunks, AI Overview snippet preview and rival comparison'] },
  { href: '/narzedzia/sprawdz-przekierowania-hreflang', pl: ['Inspektor przekierowań 301 i hreflang', '4 warianty http/www, łańcuchy skoków, canonical, zwrotność hreflang i gotowe reguły serwera'], en: ['301 redirect & hreflang checker', '4 HTTP/www host variants, hop chains, canonical alignment, reciprocal hreflang and server rules'] },
  { href: '/narzedzia/generator-indexnow-test-bing-chatgpt', pl: ['Generator IndexNow i test Bing', 'klucz IndexNow (.txt + GitHub Actions), dostęp Bingbot i OAI-SearchBot oraz entropia lastmod'], en: ['IndexNow generator & Bing test', 'IndexNow key (.txt + GitHub Action), Bingbot & OAI-SearchBot access and lastmod entropy'] },
  { href: '/narzedzia/walidator-grafu-encji-json-ld', pl: ['Walidator grafu encji JSON-LD', 'wizualizacja @graph w SVG, kotwice @id, NIP/KRS/VAT-UE, sameAs i połączony szablon schema'], en: ['Entity graph JSON-LD validator', 'interactive SVG @graph map, @id links, VAT/Tax IDs, sameAs profiles and unified JSON-LD'] },
  { href: '/narzedzia/audyt-lokalnego-seo-wizytowki', pl: ['Skaner NAP i generator QR opinii', 'spójność NAP między HTML a LocalBusiness JSON-LD, kalkulator opinii 5★ i wektorowy kod QR'], en: ['Local SEO NAP & review QR tool', 'HTML vs LocalBusiness JSON-LD NAP consistency, 5-star review calculator and vector QR code'] },
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
    <section aria-labelledby={id} className={st.sekcja} style={s.sekcja}>
      <h2 id={id} className={st.h2} style={{ ...s.h2, marginBottom: '1.25rem' }}>{tytul ?? (en ? 'More free tools' : 'Inne darmowe narzędzia')}</h2>
      <ul className={st.siatka}>
        {linki.map((n) => (
          <li key={n.href}>
            <Link href={n.href} className={st.kafel}>
              <span className={st.kafelIkona}><Ikona nazwa={ikonaNarzedzia(n.href)} /></span>
              <span className={st.kafelNazwa}>{n.nazwa}</span>
              <span className={st.kafelOpis}>{n.opis}</span>
            </Link>
          </li>
        ))}
        {hub && (
          <li>
            <Link href={hub} className={`${st.kafel} ${st.kafelHub}`}>
              <span className={st.kafelIkona}><Ikona nazwa="szablon" /></span>
              <span className={st.kafelNazwa}>{en ? 'All free SEO tools and AI tools' : 'Wszystkie darmowe narzędzia i szablony'}</span>
              <span className={st.kafelOpis}>{en ? 'the full list, with SEO templates to download' : 'pełna lista razem z szablonami SEO do pobrania'}</span>
            </Link>
          </li>
        )}
      </ul>
    </section>
  );
}
