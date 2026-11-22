'use client';

import { useLocale } from 'next-intl';
import { motion, useReducedMotion } from 'framer-motion';
import { Reveal } from './ScrollReveal';
import { sectionId, hash } from '@/lib/anchors';
import { AUDYT, AUTORYTET, WIDOCZNOSC } from '@/lib/narzedziaLiczby';
import './Results.css';

function SlowaWejscia({ tekst, className, opoznienie = 0, bezRuchu }) {
  const slowa = tekst.split(' ');
  if (bezRuchu) {
    return <span className={className}>{tekst}</span>;
  }
  return (
    <span className={className}>
      {slowa.map((sl, idx) => (
        <motion.span
          key={`${sl}-${idx}`}
          className="results-slowo"
          initial={{ opacity: 0, filter: 'blur(10px)', y: '0.34em' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.54, delay: opoznienie + idx * 0.055, ease: [0.22, 1, 0.36, 1] }}
        >
          {sl}
          {idx < slowa.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}

// Geometria globu 3D z ase-bot.live (analityka-glob-v7, 1315x1196, ge = 1196 / 1315 = 0.9095):
// Wzorzec z ase-bot.live (Home-HKIH42Hj.js):
//   ge = 1196/1315, na = 0.12, ee = 0.112, ia = 0.619, ra = 0.04, ae = 0.23
//   function la(a, s) { const t = (s.x - ra - a * ae) / ae * 100, i = s.y * ge - na; return { left: `${t}%`, bottom: `calc(var(--gw) * ${-i})` } }
// 4 korony/punkty wież z ase-bot.live:
//   01: { x: 0.100, y: 0.353 } -> left: 26.087%, bottom: calc(var(--gw) * -0.2011)
//   02: { x: 0.369, y: 0.229 } -> left: 43.043%, bottom: calc(var(--gw) * -0.0883)
//   03: { x: 0.500, y: 0.390 } -> left:  0.000%, bottom: calc(var(--gw) * -0.2347)
//   04: { x: 0.737, y: 0.266 } -> left:  3.043%, bottom: calc(var(--gw) * -0.1219)
const GE = 1196 / 1315;
const NA = 0.12;
const RA = 0.04;
const AE = 0.23;
const WIEZE = [
  { x: 0.100, y: 0.353, ryzyko: false },
  { x: 0.369, y: 0.229, ryzyko: false },
  { x: 0.500, y: 0.390, ryzyko: false },
  { x: 0.737, y: 0.266, ryzyko: true },
];
const PINY_KOLUMN = WIEZE.map((w, i) => ({
  left: `${(((w.x - RA - i * AE) / AE) * 100).toFixed(3)}%`,
  bottom: `calc(var(--gw) * ${(-(w.y * GE - NA)).toFixed(4)})`,
  ryzyko: w.ryzyko,
}));

export default function Results() {
  const lang = useLocale();
  const pl = lang === 'pl';
  const bezRuchu = useReducedMotion();
  const mlnDomen = pl ? '135 mln' : '135M';

  const filary = pl
    ? [
        {
          nr: '01',
          kicker: `CRAWLER ${AUDYT.regul} REGUŁ`,
          ikona: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4.2-4.2" /></>,
          tytul: `Crawler ${AUDYT.regul} reguł i CWV`,
          opis: 'Bada kody HTTP, indeksację, strukturę nagłówków oraz mobilny PageSpeed Insights na żywo.',
          ryzyko: false,
        },
        {
          nr: '02',
          kicker: `${WIDOCZNOSC.silnikow} SILNIKÓW AI`,
          ikona: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
          tytul: `${WIDOCZNOSC.silnikow} silników odpowiedzi AI`,
          opis: 'Odpytuje ChatGPT, Gemini, Perplexity, Claude i AI Overviews prawdziwymi pytaniami klientów.',
          ryzyko: false,
        },
        {
          nr: '03',
          kicker: `GRAF ${mlnDomen.toUpperCase()} DOMEN`,
          ikona: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
          tytul: `Graf ${mlnDomen} domen`,
          opis: `Wylicza autorytet linków 0-100 z publicznego grafu sieciowego i zestawia z ${AUTORYTET.konkurentow} konkurentami.`,
          ryzyko: false,
        },
        {
          nr: '04',
          kicker: 'DETEKCJA STRAT',
          ikona: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
          tytul: 'Detekcja blokad i strat',
          opis: 'Wskazuje zablokowane boty AI w robots.txt oraz miesięczny zysk uciekający poza TOP 3.',
          ryzyko: true,
        },
      ]
    : [
        {
          nr: '01',
          kicker: `${AUDYT.regul}-RULE CRAWLER`,
          ikona: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4.2-4.2" /></>,
          tytul: `${AUDYT.regul}-rule crawler & CWV`,
          opis: 'Inspects HTTP status codes, indexability, heading hierarchy and mobile PageSpeed Insights live.',
          ryzyko: false,
        },
        {
          nr: '02',
          kicker: `${WIDOCZNOSC.silnikow} AI ENGINES`,
          ikona: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8z" />,
          tytul: `${WIDOCZNOSC.silnikow} AI answer engines`,
          opis: 'Queries ChatGPT, Gemini, Perplexity, Claude and Google AI Overviews with real buyer prompts.',
          ryzyko: false,
        },
        {
          nr: '03',
          kicker: `${mlnDomen} DOMAIN GRAPH`,
          ikona: <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />,
          tytul: `${mlnDomen}-domain link graph`,
          opis: `Computes a 0-100 authority score from the public web graph against up to ${AUTORYTET.konkurentow} competitors.`,
          ryzyko: false,
        },
        {
          nr: '04',
          kicker: 'LOSS DETECTION',
          ikona: <><path d="m22 7-8.5 8.5-5-5L2 17" /><path d="M16 7h6v6" /></>,
          tytul: 'Bot blocks & revenue gap',
          opis: 'Flags AI crawlers blocked in robots.txt and estimates profit lost outside Google TOP 3.',
          ryzyko: true,
        },
      ];

  return (
    <section
      className="results results--kopula"
      id={sectionId('wyniki', lang)}
      data-kursor="obraz"
      data-kursor-przezroczyste="jasne"
      data-petla=""
    >
      {/* Nocne pasmo gór przechodzące w kobaltową atmosferę i eliptyczną kopułę (styl ase-bot.live) */}
      <div className="results-noc-kopula" aria-hidden="true">
        <div className="results-orbity" />
      </div>

      <div className="container" data-header-box="">
        <Reveal className="results-content results-cta-karta">
          <div className="results-text">
            <h2>{pl ? 'Chcesz osiągnąć podobne wyniki?' : 'Want to achieve similar results?'}</h2>
            <p>
              {pl
                ? 'Sprawdź, co blokuje Twoją stronę w Google: darmowy audyt SEO online w 49 regułach albo wycena pełnego audytu w 24 h.'
                : 'Find out what holds your site back: run the free online SEO audit (49 rules) or request a quote for a full audit within 24 h.'}
            </p>
          </div>
          <div className="results-cta-akcje">
            <a
              href={pl ? '/narzedzia/audyt-seo' : '/en/tools/free-seo-audit'}
              className="w-przycisk w-przycisk--glowny"
              data-cta="results_free_audit"
            >
              {pl ? 'Sprawdź stronę za darmo' : 'Run the free audit'}
            </a>
            <a href={hash('cennik', lang)} className="results-cta-ceny" data-cta="results_pricing">
              {pl ? 'Zobacz ceny pakietów' : 'See package prices'} <span aria-hidden="true">→</span>
            </a>
          </div>
        </Reveal>
      </div>

      {/* Monumentalny blok w stylu „Built for professional analysts” z globem 3D i 4 pionowymi wiązkami */}
      <div className="results-analityka" data-header-box="">
        <div className="results-analityka-nagl">
          <h3 className="results-analityka-h3">
            <SlowaWejscia
              tekst={pl ? 'Zbudowane pod twardą analitykę' : 'Built for technical precision'}
              className="results-h3-jasny"
              opoznienie={0}
              bezRuchu={bezRuchu}
            />
            <SlowaWejscia
              tekst={pl ? 'i widoczność w Google oraz AI' : 'and visibility in Google & AI'}
              className="results-h3-akcent"
              opoznienie={0.18}
              bezRuchu={bezRuchu}
            />
          </h3>
          <p className="results-analityka-opis">
            {pl
              ? 'Cztery warstwy diagnostyki zasilające nasze darmowe narzędzia oraz panel klienta 24/7'
              : 'Four diagnostic layers powering our free tools and the 24/7 client portal'}
          </p>
        </div>

        <div className="results-scena-globu">
          <ul className="results-filary">
            {filary.map((f, idx) => {
              const pin = PINY_KOLUMN[idx];
              return (
                <li
                  key={f.nr}
                  className={`results-filar${f.ryzyko ? ' results-filar--ryzyko' : ''}`}
                >
                  <motion.div
                    className="results-filar-tresc"
                    initial={bezRuchu ? false : { opacity: 0, filter: 'blur(8px)', y: 18 }}
                    whileInView={bezRuchu ? undefined : { opacity: 1, filter: 'blur(0px)', y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.52, delay: 0.08 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="results-filar-meta">
                      <span className="results-filar-nr">
                        <span className="results-nr-cyfra">{f.nr}</span>{' '}
                        <span className="results-nr-ukosnik">/</span>{' '}
                        <span className="results-nr-kat">{f.kicker}</span>
                      </span>
                      <span className="results-filar-ikona" aria-hidden="true">
                        <svg viewBox="0 0 24 24">{f.ikona}</svg>
                      </span>
                    </div>
                    <h4 className="results-filar-tytul">{f.tytul}</h4>
                    <p className="results-filar-opis">{f.opis}</p>
                  </motion.div>

                  {/* Pionowa wiązka laserowa spuszczona wprost z tej kolumny na koronę wieży 3D (desktop >= 1200 px) */}
                  <div className="results-filar-linia" aria-hidden="true">
                    <span
                      className={`results-pin${pin.ryzyko ? ' results-pin--ryzyko' : ''}`}
                      style={{
                        left: pin.left,
                        bottom: pin.bottom,
                      }}
                    >
                      <span className="results-pin-kropka" />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          {/* Monumentalny glob 3D z ase-bot.live (1315x1196) o naturalnych proporcjach wystający z kopuły na papier #FDF9F4 */}
          <div className="results-glob-wrap" aria-hidden="true">
            <picture>
              <source
                type="image/avif"
                srcSet="/images/wyglad/analityka-glob-v7-800.avif 800w, /images/wyglad/analityka-glob-v7.avif 1315w"
                sizes="(max-width: 768px) 98vw, 1360px"
              />
              <img
                className="results-glob-img"
                src="/images/wyglad/analityka-glob-v7.webp"
                srcSet="/images/wyglad/analityka-glob-v7-800.webp 800w, /images/wyglad/analityka-glob-v7.webp 1315w"
                sizes="(max-width: 768px) 98vw, 1360px"
                alt=""
                width={1315}
                height={1196}
                loading="lazy"
                decoding="async"
              />
            </picture>
          </div>
        </div>
      </div>
    </section>
  );
}
