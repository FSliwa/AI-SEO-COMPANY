'use client';

import { useId, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '../i18n/routing';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { track } from '@/lib/track';
import { MAPA_SIATKA_7X7, PANEL_TRESC } from '@/lib/panelShowcaseDane';

const IKONY_BENTO = [
  <svg key="a" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 6-7" /><path d="M16 7h4v4" /></svg>,
  <svg key="b" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 3l9 5-9 5-9-5 9-5z" /><path d="M3 13l9 5 9-5" /></svg>,
  <svg key="c" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M8 12.5l2.5 2.5L16 9.5" /></svg>,
];

export default function PanelShowcase({ locale: propLocale }) {
  const ctxLocale = useLocale();
  const rawLocale = propLocale || ctxLocale;
  const lang = rawLocale === 'de' ? 'de' : rawLocale === 'en' ? 'en' : 'pl';
  const t = PANEL_TRESC[lang];

  const uid = useId();
  const tabRefs = useRef([]);
  const [aktywnaZakladka, setAktywnaZakladka] = useState('przeglad');
  const [indeksZakresu, setIndeksZakresu] = useState(0);
  const [zatwierdzoneDemo, setZatwierdzoneDemo] = useState({});

  const zmienZakladke = (id, fokusIdx = null) => {
    setAktywnaZakladka(id);
    track('panel_showcase_tab', { tab: id, lang });
    if (fokusIdx !== null && tabRefs.current[fokusIdx]) {
      tabRefs.current[fokusIdx].focus();
    }
  };

  const obsluzKlawiszeZakladek = (e, idx) => {
    const ile = t.zakladki.length;
    let nowy = null;
    if (e.key === 'ArrowRight') nowy = (idx + 1) % ile;
    else if (e.key === 'ArrowLeft') nowy = (idx - 1 + ile) % ile;
    else if (e.key === 'Home') nowy = 0;
    else if (e.key === 'End') nowy = ile - 1;
    if (nowy !== null) {
      e.preventDefault();
      zmienZakladke(t.zakladki[nowy].id, nowy);
    }
  };

  const przelaczAkceptacjeDemo = (id) => {
    setZatwierdzoneDemo((prev) => ({ ...prev, [id]: !prev[id] }));
    track('panel_showcase_approve_demo', { item: id, lang });
  };

  const aktywnyZakres = t.przeglad.zakresy[indeksZakresu] || t.przeglad.zakresy[0];
  const oczekujaceLiczba = Math.max(
    0,
    t.akceptacje.elementy.filter((el) => !zatwierdzoneDemo[el.id]).length
  );

  return (
    <section
      className="panel-showcase cursor-light w-ciemne"
      data-petla=""
      id={t.idSekcji}
    >
      <div className="panel-poziomice-blask" aria-hidden="true">
        <span className="panel-blask panel-blask--prawy" />
        <span className="panel-blask panel-blask--lewy" />
      </div>

      <div className="container panel-scena-kontener">
        <Reveal className="section-header panel-naglowek-sceny">
          <div className="panel-naglowek-lewa">
            <div className="section-tag panel-tag-pigulka">
              <span className="panel-kropka-zywa" aria-hidden="true" />
              <span className="asterisk">✳</span> {t.tag}
            </div>
            <h2>{t.h2}</h2>
            <p>{t.lead}</p>
          </div>

          <div className="panel-naglowek-prawa">
            <div className="panel-akcje">
              <a
                href={PANEL_DEMO_URL}
                className="w-przycisk w-przycisk--glowny"
                data-cta="home_panel_demo"
              >
                {t.ctaDemo} <span aria-hidden="true">-&gt;</span>
              </a>
              <Link
                href="/panel-klienta"
                className="w-przycisk w-przycisk--obrys"
                data-cta="home_panel_page"
              >
                {t.ctaStrona}
              </Link>
            </div>
            <p className="panel-zaufanie">{t.zaufanie}</p>
          </div>
        </Reveal>

        {/* Pasek interaktywnych zakladek rozdzialow (role="tablist") */}
        <div
          className="panel-zakladki"
          role="tablist"
          aria-label={t.ariaZakladki}
        >
          {t.zakladki.map((z, idx) => {
            const czyAktywna = aktywnaZakladka === z.id;
            const licznikPokaz = z.id === 'akceptacje' ? String(oczekujaceLiczba) : z.licznik;
            return (
              <button
                key={z.id}
                ref={(el) => { tabRefs.current[idx] = el; }}
                type="button"
                role="tab"
                id={`${uid}-tab-${z.id}`}
                aria-selected={czyAktywna}
                aria-controls={`${uid}-panel-${z.id}`}
                tabIndex={czyAktywna ? 0 : -1}
                className={`panel-zakladka${czyAktywna ? ' is-active' : ''}`}
                onClick={() => zmienZakladke(z.id)}
                onKeyDown={(e) => obsluzKlawiszeZakladek(e, idx)}
              >
                <span className="panel-zakladka-nr">{z.nr}</span>
                <span className="panel-zakladka-pelna">{z.etykieta}</span>
                <span className="panel-zakladka-krotka">{z.krotka}</span>
                {licznikPokaz && Number(licznikPokaz) > 0 && (
                  <span className="panel-zakladka-licznik">{licznikPokaz}</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Glowna scena kokpitu 1:1 (wektorowy interfejs bez znieksztalcen izometrycznych) */}
        <div className="panel-kokpit">
          <div className="panel-kokpit-pasek">
            <div className="panel-kokpit-pasek-lewa">
              <span className="panel-okno-kropki" aria-hidden="true"><i /><i /><i /></span>
              <span className="panel-kokpit-url">{t.topbarUrl}</span>
            </div>
            <div className="panel-kokpit-pasek-prawa">
              <span className="panel-telemetria panel-telemetria--ok">
                <i aria-hidden="true" />
                {t.topbarSync}
              </span>
              <span className="panel-telemetria panel-telemetria--api">
                {t.topbarApi}
              </span>
            </div>
          </div>

          <div className="panel-kokpit-cialo">
            <aside className="panel-kokpit-bok" aria-label={t.klientNazwa}>
              <div className="panel-klient-wizytowka">
                <p className="panel-klient-nazwa">{t.klientNazwa}</p>
                <p className="panel-klient-domena">{t.klientDomena}</p>
                <p className="panel-klient-pakiet">{t.klientPakiet}</p>
              </div>

              <div className="panel-naw-lista">
                {t.nawigacjaBoczna.map((el, idx) => {
                  const czyWybrany = idx === 0
                    ? aktywnaZakladka === 'przeglad'
                    : (
                      (idx === 3 && aktywnaZakladka === 'zmiany')
                      || (idx === 4 && aktywnaZakladka === 'akceptacje')
                      || (idx === 5 && aktywnaZakladka === 'ai-mapy')
                    );
                  const odznakaTekst = el.pilne ? String(oczekujaceLiczba) : el.odznaka;
                  return (
                    <button
                      key={el.etykieta}
                      type="button"
                      className={`panel-naw-pozycja${czyWybrany ? ' is-active' : ''}`}
                      onClick={() => zmienZakladke(el.cel)}
                    >
                      <span>{el.etykieta}</span>
                      {odznakaTekst && (
                        <span className={`panel-naw-odznaka${el.pilne && oczekujaceLiczba > 0 ? ' is-pilne' : ''}`}>
                          {odznakaTekst}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div
              className="panel-kokpit-obszar"
              role="tabpanel"
              id={`${uid}-panel-${aktywnaZakladka}`}
              aria-labelledby={`${uid}-tab-${aktywnaZakladka}`}
            >
              {aktywnaZakladka === 'przeglad' && (
                <div className="panel-widok">
                  <div className="panel-widok-naglowek">
                    <div>
                      <p className="panel-widok-nadtytul">{t.przeglad.nadtytul}</p>
                      <p className="panel-widok-tytul">{aktywnyZakres.tytul}</p>
                    </div>
                    <div className="panel-zakres-przelacznik" role="group" aria-label={t.ariaZakres}>
                      {t.przeglad.zakresy.map((zr, zrIdx) => (
                        <button
                          key={zr.id}
                          type="button"
                          aria-pressed={indeksZakresu === zrIdx}
                          className={`panel-zakres-przycisk${indeksZakresu === zrIdx ? ' is-active' : ''}`}
                          onClick={() => setIndeksZakresu(zrIdx)}
                        >
                          {zr.etykieta}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="panel-kpi-siatka">
                    {aktywnyZakres.kpi.map((k) => (
                      <div
                        key={k.nazwa}
                        className={`panel-kpi-karta${k.wyrozniona ? ' is-primary' : ''}`}
                      >
                        <p className="panel-kpi-etykieta">{k.nazwa}</p>
                        <div className="panel-kpi-wiersz">
                          <span className="panel-kpi-liczba">{k.wartosc}</span>
                          <span className="panel-kpi-delta">{k.delta}</span>
                        </div>
                        {typeof k.postep === 'number' && (
                          <div className="panel-kpi-pasek" aria-hidden="true">
                            <span style={{ width: `${Math.min(100, k.postep)}%` }} />
                          </div>
                        )}
                        <p className="panel-kpi-cel">{k.cel}</p>
                        <p className="panel-kpi-podpis">{k.podpis}</p>
                      </div>
                    ))}
                  </div>

                  <div className="panel-wykres-karta">
                    <div className="panel-wykres-naglowek">
                      <p className="panel-wykres-tytul">{t.przeglad.wykresTytul}</p>
                      <div className="panel-wykres-legenda">
                        <span className="panel-legenda-punkt">
                          <i className="is-zielony" aria-hidden="true" />
                          {t.przeglad.legenda1}
                        </span>
                        <span className="panel-legenda-punkt">
                          <i className="is-pomarancz" aria-hidden="true" />
                          {t.przeglad.legenda2}
                        </span>
                      </div>
                    </div>

                    <div className="panel-wykres-pineski">
                      <span className="panel-pineska panel-pineska--pomarancz">
                        <i aria-hidden="true" />
                        {t.przeglad.pin1}
                      </span>
                      <span className="panel-pineska panel-pineska--zielona">
                        <i aria-hidden="true" />
                        {t.przeglad.pin2}
                      </span>
                    </div>

                    <div className="panel-wykres-svg-ramka">
                      <svg
                        width="936"
                        height="176"
                        viewBox="0 0 936 176"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="panel-wykres-svg"
                        aria-hidden="true"
                      >
                        <defs>
                          <linearGradient id={`${uid}-grad`} x1="0" y1="24" x2="0" y2="164" gradientUnits="userSpaceOnUse">
                            <stop stopColor="#34D399" stopOpacity="0.30" />
                            <stop offset="0.65" stopColor="#D85A30" stopOpacity="0.10" />
                            <stop offset="1" stopColor="#09102B" stopOpacity="0" />
                          </linearGradient>
                        </defs>
                        <line x1="0" y1="42" x2="936" y2="42" stroke="#FFFFFF" strokeOpacity="0.07" strokeDasharray="4 4" />
                        <line x1="0" y1="88" x2="936" y2="88" stroke="#FFFFFF" strokeOpacity="0.07" strokeDasharray="4 4" />
                        <line x1="0" y1="134" x2="936" y2="134" stroke="#FFFFFF" strokeOpacity="0.07" strokeDasharray="4 4" />
                        <line x1="0" y1="164" x2="936" y2="164" stroke="#FFFFFF" strokeOpacity="0.12" />
                        <path
                          d="M12 148 C 95 144, 150 136, 230 126 C 305 116, 345 100, 412 94 C 485 86, 545 72, 624 60 C 705 46, 790 34, 924 24 L 924 164 L 12 164 Z"
                          fill={`url(#${uid}-grad)`}
                        />
                        <path
                          d="M12 148 C 95 144, 150 136, 230 126 C 305 116, 345 100, 412 94 C 485 86, 545 72, 624 60 C 705 46, 790 34, 924 24"
                          stroke="#34D399"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <line x1="330" y1="44" x2="330" y2="164" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="330" cy="105" r="7" fill="#D85A30" stroke="#FFFFFF" strokeWidth="2" />
                        <line x1="650" y1="36" x2="650" y2="164" stroke="#D85A30" strokeWidth="1.5" strokeDasharray="3 3" />
                        <circle cx="650" cy="56" r="7" fill="#D85A30" stroke="#FFFFFF" strokeWidth="2" />
                        <circle cx="924" cy="24" r="6" fill="#34D399" stroke="#FFFFFF" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>

                  <div className="panel-notatka-siatka">
                    {t.przeglad.notatka.map((n) => (
                      <div key={n.etykieta} className="panel-notatka-kolumna">
                        <p className="panel-notatka-etykieta">{n.etykieta}</p>
                        <p className="panel-notatka-tekst">{n.tekst}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {aktywnaZakladka === 'zmiany' && (
                <div className="panel-widok">
                  <div>
                    <p className="panel-widok-nadtytul">{t.zmiany.nadtytul}</p>
                    <p className="panel-widok-tytul">{t.zmiany.tytul}</p>
                  </div>

                  <div className="panel-lista-kart">
                    {t.zmiany.wpisy.map((w) => (
                      <div key={w.meta} className="panel-wpis-ciemny">
                        <p className="panel-wpis-meta">{w.meta}</p>
                        <p className="panel-wpis-tytul">{w.tytul}</p>
                        <p className="panel-wpis-opis">{w.opis}</p>
                      </div>
                    ))}
                  </div>

                  <p className="panel-widok-stopka">{t.zmiany.stopka}</p>
                </div>
              )}

              {aktywnaZakladka === 'akceptacje' && (
                <div className="panel-widok">
                  <div>
                    <p className="panel-widok-nadtytul">{t.akceptacje.nadtytul}</p>
                    <p className="panel-widok-tytul">{t.akceptacje.tytul}</p>
                  </div>

                  <div className="panel-lista-kart">
                    {t.akceptacje.elementy.map((el) => {
                      const czyZatwierdzone = Boolean(zatwierdzoneDemo[el.id]);
                      return (
                        <div key={el.id} className="panel-wpis-kremowy">
                          <p className="panel-wpis-kremowy-meta">{el.meta}</p>
                          <p className="panel-wpis-kremowy-tytul">{el.tytul}</p>
                          <p className="panel-wpis-kremowy-opis">{el.opis}</p>
                          <div className="panel-wpis-akcje">
                            {czyZatwierdzone ? (
                              <>
                                <span className="panel-zatwierdzono-odznaka">
                                  <i aria-hidden="true" />
                                  {t.akceptacje.zatwierdzonoEtykieta}
                                </span>
                                <button
                                  type="button"
                                  className="panel-btn-jasny"
                                  onClick={() => przelaczAkceptacjeDemo(el.id)}
                                >
                                  {t.akceptacje.cofnijEtykieta}
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="panel-btn-akceptuj"
                                  onClick={() => przelaczAkceptacjeDemo(el.id)}
                                >
                                  {el.btnOk}
                                </button>
                                <a href={PANEL_DEMO_URL} className="panel-btn-jasny">
                                  {el.btnZmiana}
                                </a>
                              </>
                            )}
                          </div>
                        </div>
                      );
                    })}

                    <div className="panel-wpis-ciemny">
                      <p className="panel-wpis-meta">{t.akceptacje.historiaMeta}</p>
                      <p className="panel-wpis-tytul">{t.akceptacje.historiaTytul}</p>
                      <p className="panel-wpis-opis">{t.akceptacje.historiaOpis}</p>
                    </div>
                  </div>

                  <p className="panel-widok-stopka">{t.akceptacje.stopka}</p>
                </div>
              )}

              {aktywnaZakladka === 'ai-mapy' && (
                <div className="panel-widok">
                  <div>
                    <p className="panel-widok-nadtytul">{t.aiMapy.nadtytul}</p>
                    <p className="panel-widok-tytul">{t.aiMapy.tytul}</p>
                  </div>

                  <div className="panel-ai-mapy-uklad">
                    <div className="panel-ai-kolumna">
                      <p className="panel-podsekcja-tytul">{t.aiMapy.silnikiTytul}</p>
                      <div className="panel-silniki-lista">
                        {t.aiMapy.silniki.map((s) => (
                          <div key={s.nazwa} className="panel-silnik-wiersz">
                            <div className="panel-silnik-nagl">
                              <span className="panel-silnik-nazwa">{s.nazwa}</span>
                              <span className="panel-silnik-proc">{s.proc}%</span>
                            </div>
                            <div className="panel-kpi-pasek" aria-hidden="true">
                              <span className="is-szmaragd" style={{ width: `${s.proc}%` }} />
                            </div>
                            <p className="panel-silnik-szczegol">{s.szczegol}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="panel-mapy-kolumna">
                      <div className="panel-mapy-nagl">
                        <p className="panel-podsekcja-tytul">{t.aiMapy.mapyTytul}</p>
                        <div className="panel-mapy-legenda">
                          <span className="panel-legenda-punkt">
                            <i className="is-zielony" aria-hidden="true" />
                            {t.aiMapy.legendaTop3}
                          </span>
                          <span className="panel-legenda-punkt">
                            <i className="is-pomarancz" aria-hidden="true" />
                            {t.aiMapy.legendaSrodek}
                          </span>
                        </div>
                      </div>

                      <div className="panel-siatka-7x7" aria-hidden="true">
                        {MAPA_SIATKA_7X7.flatMap((wiersz, rIdx) =>
                          wiersz.map((poz, cIdx) => (
                            <span
                              key={`${rIdx}-${cIdx}`}
                              className={`panel-punkt-mapy${poz <= 3 ? ' is-top3' : ' is-mid'}`}
                            >
                              {poz}
                            </span>
                          ))
                        )}
                      </div>

                      <p className="panel-mapy-podpis">{t.aiMapy.mapyPodpis}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* 3 karty Bento Micro-UI (zachowuja 100% naglowkow H3 i opisow dla SEO) */}
        <RevealStagger className="panel-bento-siatka">
          {t.bento.map((it, i) => (
            <RevealItem key={it.title} className="panel-bento-karta">
              <div className="panel-bento-gora">
                <div className="panel-bento-wiersz-ikony">
                  <span className="panel-cecha-ikona">{IKONY_BENTO[i]}</span>
                  <span className={`panel-bento-odznaka${i === 0 ? ' is-szmaragd' : ''}`}>
                    {it.odznaka}
                  </span>
                </div>
                <h3>{it.title}</h3>
                <p>{it.text}</p>
              </div>

              {it.typ === 'sla' && (
                <div className="panel-mikro-ciemne" aria-hidden="true">
                  {it.wiersze.map((w, wIdx) => (
                    <div key={w} className="panel-mikro-sla-wiersz">
                      <i className={wIdx === 2 ? 'is-pomarancz' : 'is-zielony'} />
                      <span>{w}</span>
                    </div>
                  ))}
                </div>
              )}

              {it.typ === 'commit' && (
                <div className="panel-mikro-ciemne" aria-hidden="true">
                  <p className="panel-mikro-commit-meta">{it.commitMeta}</p>
                  <p className="panel-mikro-commit-tytul">{it.commitTytul}</p>
                  <ul className="panel-mikro-commit-lista">
                    {it.commitPunkty.map((pkt) => (
                      <li key={pkt}>{pkt}</li>
                    ))}
                  </ul>
                </div>
              )}

              {it.typ === 'akceptacja' && (
                <div className="panel-mikro-kremowe" aria-hidden="true">
                  <p className="panel-mikro-kremowe-tytul">{it.kartaTytul}</p>
                  <p className="panel-mikro-kremowe-meta">{it.kartaMeta}</p>
                  <div className="panel-mikro-kremowe-przyciski">
                    <span className="panel-mikro-pigulka-glowna">{it.kartaOk}</span>
                    <span className="panel-mikro-pigulka-jasna">{it.kartaZmiana}</span>
                  </div>
                </div>
              )}
            </RevealItem>
          ))}
        </RevealStagger>
      </div>
    </section>
  );
}
