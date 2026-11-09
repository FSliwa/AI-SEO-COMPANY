'use client';

// Kalkulator utraconego zysku przez brak SEO i widoczności w AI (/narzedzia/kalkulator-strat-seo).
// Liczy w przeglądarce (lib/kalkulatorStrat.js). Przed e-mailem: widełki miesięcznej straty.
// Po e-mailu: rozbicie Google / AI, utraceni klienci, skala roku i raport (panel liczy go ponownie).

import { useMemo, useState } from 'react';
import { track } from '@/lib/track';
import { ZALOZENIA, bladDanych, policzStraty } from '@/lib/kalkulatorStrat';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo } from './Wspolne';

const zl = (n) => `${Math.round(n).toLocaleString('pl-PL')} zł`;
const liczba = (v) => Number(String(v).replace(/\s/g, '').replace(',', '.'));

const POLA = [
  { k: 'wyszukiwania', etykieta: 'Ile razy miesięcznie klienci szukają Twoich usług w Google?', pomoc: 'Suma wyszukiwań głównych fraz, np. „stolarz Warszawa”. Sprawdzisz w Planerze słów kluczowych Google Ads.', przyklad: '2000', calkowita: true },
  { k: 'ruch', etykieta: 'Ile wejść z Google masz dziś miesięcznie?', pomoc: 'Google Search Console albo Analytics, ruch organiczny. Nie wiesz? Wpisz 0.', przyklad: '150', calkowita: true },
  { k: 'konwersja', etykieta: 'Ile % odwiedzających zostaje klientami?', pomoc: 'Zapytania lub zakupy podzielone przez wejścia, w procentach.', przyklad: '2', jednostka: '%' },
  { k: 'wartosc', etykieta: 'Średnia wartość klienta lub zamówienia', pomoc: 'Ile średnio płaci jeden klient (zamówienie albo współpraca).', przyklad: '1500', jednostka: 'zł' },
  { k: 'marza', etykieta: 'Marża', pomoc: 'Jaka część przychodu zostaje jako zysk. 100% = liczymy przychód.', przyklad: '40', jednostka: '%' },
];

export default function KalkulatorClient() {
  const [dane, setDane] = useState({ wyszukiwania: '', ruch: '', konwersja: '', wartosc: '', marza: '', udzialAi: String(ZALOZENIA.udzialAiDomyslny), widocznyWAi: 'nie_wiem' });
  const [policzone, setPoliczone] = useState(false);
  const [pelny, setPelny] = useState(null);
  const [newsletter, setNewsletter] = useState(null);

  const wejscie = useMemo(() => ({
    wyszukiwania: Math.round(liczba(dane.wyszukiwania)),
    ruch: Math.round(liczba(dane.ruch || 0)),
    konwersja: liczba(dane.konwersja),
    wartosc: liczba(dane.wartosc),
    marza: liczba(dane.marza),
    udzialAi: liczba(dane.udzialAi),
    widocznyWAi: dane.widocznyWAi,
  }), [dane]);
  const blad = bladDanych(wejscie);
  const wynik = !blad ? policzStraty(wejscie) : null;

  const zmien = (k) => (e) => {
    setDane((d) => ({ ...d, [k]: e.target.value }));
    setPelny(null);
  };

  function licz(e) {
    e.preventDefault();
    if (blad) return;
    setPoliczone(true);
    track('narzedzie_wynik', { narzedzie: 'kalkulator', wynik: wynik.min.zysk });
  }

  const r = pelny ?? wynik;
  return (
    <div className="narz-app" id="narzedzie">
      <PasekDemo />
      <form className="narz-formularz narz-kalkulator" onSubmit={licz} noValidate>
        {POLA.map((p) => (
          <div key={p.k} className="narz-kalk-pole">
            <label htmlFor={`k-${p.k}`} className="narz-etykieta">{p.etykieta}</label>
            <div className="narz-z-jednostka">
              <input id={`k-${p.k}`} name={p.k} value={dane[p.k]} onChange={zmien(p.k)} inputMode="decimal" placeholder={`np. ${p.przyklad}`} className="narz-pole" aria-describedby={`k-${p.k}-pomoc`} />
              {p.jednostka && <span aria-hidden="true">{p.jednostka}</span>}
            </div>
            <p id={`k-${p.k}-pomoc`} className="narz-mikro">{p.pomoc}</p>
          </div>
        ))}
        <div className="narz-kalk-pole">
          <label htmlFor="k-udzialAi" className="narz-etykieta">Jaka część klientów pyta AI zamiast Google? <strong>{dane.udzialAi}%</strong></label>
          <input id="k-udzialAi" type="range" min="0" max="60" step="5" value={dane.udzialAi} onChange={zmien('udzialAi')} className="narz-suwak" />
          <p className="narz-mikro">Domyślnie {ZALOZENIA.udzialAiDomyslny}%: prognoza Gartnera spadku wyszukiwań przez czaty AI do 2026. Ustaw swoją wartość.</p>
        </div>
        <fieldset className="narz-kalk-pole">
          <legend className="narz-etykieta">Czy ChatGPT, Gemini albo Perplexity polecają dziś Twoją firmę?</legend>
          <div className="narz-wybor">
            {[['tak', 'Tak'], ['nie', 'Nie'], ['nie_wiem', 'Nie wiem']].map(([v, t]) => (
              <label key={v}><input type="radio" name="widocznyWAi" value={v} checked={dane.widocznyWAi === v} onChange={zmien('widocznyWAi')} /> {t}</label>
            ))}
          </div>
        </fieldset>
        <div className="narz-kalk-akcja">
          <button type="submit" className="btn btn-primary" data-cta="narzedzie_kalkulator_licz">Policz, ile tracę</button>
          {policzone && blad && <p role="alert" className="narz-blad">{blad}</p>}
        </div>
      </form>

      {policzone && r && (
        <div className="narz-wynik narz-kalk-wynik" aria-live="polite">
          <p className="narz-wynik-opis">Bez pozycji w TOP 3 Google i bez poleceń w AI tracisz szacunkowo</p>
          <p className="narz-kwota">{zl(r.min.zysk)} do {zl(r.max.zysk)}</p>
          <p className="narz-wynik-opis">zysku miesięcznie, czyli {zl(r.rocznieMin)} do {zl(r.rocznieMax)} rocznie. Widełki wynikają z różnic między badaniami CTR (założenia niżej).</p>

          {pelny && <Odblokowano newsletter={newsletter} />}
          {pelny ? (
            <div className="narz-rozbicie">
              <div><p className="narz-rozbicie-etykieta">Brak pozycji w Google</p><p className="narz-rozbicie-kwota">{zl(r.min.zyskSeo)} do {zl(r.max.zyskSeo)}</p><p className="narz-mikro">{r.min.wizytySeo.toLocaleString('pl-PL')} do {r.max.wizytySeo.toLocaleString('pl-PL')} wejść miesięcznie</p></div>
              <div><p className="narz-rozbicie-etykieta">Brak poleceń w AI</p><p className="narz-rozbicie-kwota">{zl(r.min.zyskAi)} do {zl(r.max.zyskAi)}</p><p className="narz-mikro">{r.min.wizytyAi.toLocaleString('pl-PL')} do {r.max.wizytyAi.toLocaleString('pl-PL')} poleceń miesięcznie</p></div>
              <div><p className="narz-rozbicie-etykieta">Utraceni klienci</p><p className="narz-rozbicie-kwota">{r.min.klienci.toLocaleString('pl-PL')} do {r.max.klienci.toLocaleString('pl-PL')}</p><p className="narz-mikro">miesięcznie</p></div>
            </div>
          ) : (
            <div className="narz-zablokowane">
              <div className="narz-rozbicie narz-zamglone" aria-hidden="true">
                <div><p className="narz-rozbicie-etykieta">Brak pozycji w Google</p><p className="narz-rozbicie-kwota narz-atrapa">00 000 zł</p></div>
                <div><p className="narz-rozbicie-etykieta">Brak poleceń w AI</p><p className="narz-rozbicie-kwota narz-atrapa">00 000 zł</p></div>
                <div><p className="narz-rozbicie-etykieta">Utraceni klienci</p><p className="narz-rozbicie-kwota narz-atrapa">00</p></div>
              </div>
              <BramkaEmail
                narzedzie="kalkulator"
                dane={wejscie}
                naglowek="Zobacz, skąd bierze się ta kwota"
                opis="Rozbijemy stratę na Google i AI, policzymy utraconych klientów i wyślemy zestawienie e-mailem."
                korzysci={['Ile tracisz w Google, a ile w AI', 'Ilu klientów miesięcznie trafia do konkurencji', 'Wynik w skali roku do budżetu']}
                przycisk="Pokaż rozbicie"
                onOdblokowano={(p, nl) => { setPelny(p); setNewsletter(nl); }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
