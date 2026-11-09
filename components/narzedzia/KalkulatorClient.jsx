'use client';

// Kalkulator utraconego zysku przez brak SEO i widoczności w AI (/narzedzia/kalkulator-strat-seo).
// Liczy w przeglądarce (lib/kalkulatorStrat.js). Przed e-mailem: widełki miesięcznej straty.
// Po e-mailu: rozbicie Google / AI, utraceni klienci, skala roku i raport (panel liczy go ponownie).

import { useMemo, useState } from 'react';
import { useLocale } from 'next-intl';
import { track } from '@/lib/track';
import { ZALOZENIA, bladDanych, policzStraty } from '@/lib/kalkulatorStrat';
import BramkaEmail from './BramkaEmail';
import { Odblokowano, PasekDemo } from './Wspolne';

const zl = (n) => `${Math.round(n).toLocaleString('pl-PL')} zł`;
const zlEn = (n) => `PLN ${Math.round(n).toLocaleString('en-US')}`;
const liczbaPl = (v) => Number(String(v).replace(/\s/g, '').replace(',', '.'));
// EN: przecinek to separator tysięcy ("1,500"), kropka to ułamek.
const liczbaEn = (v) => Number(String(v).replace(/[\s,]/g, ''));

const POLA = [
  { k: 'wyszukiwania', etykieta: 'Ile razy miesięcznie klienci szukają Twoich usług w Google?', pomoc: 'Suma wyszukiwań głównych fraz, np. „stolarz Warszawa”. Sprawdzisz w Planerze słów kluczowych Google Ads.', przyklad: '2000', calkowita: true },
  { k: 'ruch', etykieta: 'Ile wejść z Google masz dziś miesięcznie?', pomoc: 'Google Search Console albo Analytics, ruch organiczny. Nie wiesz? Wpisz 0.', przyklad: '150', calkowita: true },
  { k: 'konwersja', etykieta: 'Ile % odwiedzających zostaje klientami?', pomoc: 'Zapytania lub zakupy podzielone przez wejścia, w procentach.', przyklad: '2', jednostka: '%' },
  { k: 'wartosc', etykieta: 'Średnia wartość klienta lub zamówienia', pomoc: 'Ile średnio płaci jeden klient (zamówienie albo współpraca).', przyklad: '1500', jednostka: 'zł' },
  { k: 'marza', etykieta: 'Marża', pomoc: 'Jaka część przychodu zostaje jako zysk. 100% = liczymy przychód.', przyklad: '40', jednostka: '%' },
];

const POLA_EN = [
  { k: 'wyszukiwania', etykieta: 'How many times a month do customers search for your services on Google?', pomoc: 'The total of searches for your main keywords, e.g. “carpenter Warsaw”. You can check it in Google Ads Keyword Planner.', przyklad: '2000' },
  { k: 'ruch', etykieta: 'How many visits from Google do you get per month today?', pomoc: 'From Google Search Console or Analytics, organic traffic. Not sure? Enter 0.', przyklad: '150' },
  { k: 'konwersja', etykieta: 'What % of visitors become customers?', pomoc: 'Enquiries or purchases divided by visits, as a percentage.', przyklad: '2', jednostka: '%' },
  { k: 'wartosc', etykieta: 'Average value of a customer or an order', pomoc: 'How much one customer pays on average (an order or an engagement).', przyklad: '1500', jednostka: 'PLN' },
  { k: 'marza', etykieta: 'Margin', pomoc: 'The share of revenue that stays as profit. 100% = we calculate revenue.', przyklad: '40', jednostka: '%' },
];

export default function KalkulatorClient() {
  const en = useLocale() === 'en';
  const lang = en ? 'en' : 'pl';
  const fmt = en ? zlEn : zl;
  const num = (n) => n.toLocaleString(en ? 'en-US' : 'pl-PL');
  const pola = en ? POLA_EN : POLA;
  const liczba = en ? liczbaEn : liczbaPl;
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
  }), [dane, liczba]);
  const blad = bladDanych(wejscie, lang);
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
        {pola.map((p) => (
          <div key={p.k} className="narz-kalk-pole">
            <label htmlFor={`k-${p.k}`} className="narz-etykieta">{p.etykieta}</label>
            <div className="narz-z-jednostka">
              <input id={`k-${p.k}`} name={p.k} value={dane[p.k]} onChange={zmien(p.k)} inputMode="decimal" placeholder={`${en ? 'e.g.' : 'np.'} ${p.przyklad}`} className="narz-pole" aria-describedby={`k-${p.k}-pomoc`} />
              {p.jednostka && <span aria-hidden="true">{p.jednostka}</span>}
            </div>
            <p id={`k-${p.k}-pomoc`} className="narz-mikro">{p.pomoc}</p>
          </div>
        ))}
        <div className="narz-kalk-pole">
          <label htmlFor="k-udzialAi" className="narz-etykieta">{en ? 'What share of customers ask AI instead of Google?' : 'Jaka część klientów pyta AI zamiast Google?'} <strong>{dane.udzialAi}%</strong></label>
          <input id="k-udzialAi" type="range" min="0" max="60" step="5" value={dane.udzialAi} onChange={zmien('udzialAi')} className="narz-suwak" />
          <p className="narz-mikro">{en ? `Default ${ZALOZENIA.udzialAiDomyslny}%: Gartner’s forecast of a drop in search volume to AI chatbots by 2026. Set your own value.` : `Domyślnie ${ZALOZENIA.udzialAiDomyslny}%: prognoza Gartnera spadku wyszukiwań przez czaty AI do 2026. Ustaw swoją wartość.`}</p>
        </div>
        <fieldset className="narz-kalk-pole">
          <legend className="narz-etykieta">{en ? 'Do ChatGPT, Gemini or Perplexity recommend your business today?' : 'Czy ChatGPT, Gemini albo Perplexity polecają dziś Twoją firmę?'}</legend>
          <div className="narz-wybor">
            {(en ? [['tak', 'Yes'], ['nie', 'No'], ['nie_wiem', 'Not sure']] : [['tak', 'Tak'], ['nie', 'Nie'], ['nie_wiem', 'Nie wiem']]).map(([v, t]) => (
              <label key={v}><input type="radio" name="widocznyWAi" value={v} checked={dane.widocznyWAi === v} onChange={zmien('widocznyWAi')} /> {t}</label>
            ))}
          </div>
        </fieldset>
        <div className="narz-kalk-akcja">
          <button type="submit" className="btn btn-primary" data-cta="narzedzie_kalkulator_licz">{en ? 'Calculate what I am losing' : 'Policz, ile tracę'}</button>
          {policzone && blad && <p role="alert" className="narz-blad">{blad}</p>}
        </div>
      </form>

      {policzone && r && (
        <div className="narz-wynik narz-kalk-wynik" aria-live="polite">
          <p className="narz-wynik-opis">{en ? 'Without a top 3 position on Google and without AI recommendations, you are losing an estimated' : 'Bez pozycji w TOP 3 Google i bez poleceń w AI tracisz szacunkowo'}</p>
          <p className="narz-kwota">{fmt(r.min.zysk)} {en ? 'to' : 'do'} {fmt(r.max.zysk)}</p>
          <p className="narz-wynik-opis">{en ? `in profit per month, or ${fmt(r.rocznieMin)} to ${fmt(r.rocznieMax)} per year. The range reflects differences between CTR studies (assumptions below).` : `zysku miesięcznie, czyli ${fmt(r.rocznieMin)} do ${fmt(r.rocznieMax)} rocznie. Widełki wynikają z różnic między badaniami CTR (założenia niżej).`}</p>

          {pelny && <Odblokowano newsletter={newsletter} />}
          {pelny ? (
            <div className="narz-rozbicie">
              <div><p className="narz-rozbicie-etykieta">{en ? 'No Google rankings' : 'Brak pozycji w Google'}</p><p className="narz-rozbicie-kwota">{fmt(r.min.zyskSeo)} {en ? 'to' : 'do'} {fmt(r.max.zyskSeo)}</p><p className="narz-mikro">{num(r.min.wizytySeo)} {en ? 'to' : 'do'} {num(r.max.wizytySeo)} {en ? 'visits per month' : 'wejść miesięcznie'}</p></div>
              <div><p className="narz-rozbicie-etykieta">{en ? 'No AI recommendations' : 'Brak poleceń w AI'}</p><p className="narz-rozbicie-kwota">{fmt(r.min.zyskAi)} {en ? 'to' : 'do'} {fmt(r.max.zyskAi)}</p><p className="narz-mikro">{num(r.min.wizytyAi)} {en ? 'to' : 'do'} {num(r.max.wizytyAi)} {en ? 'recommendations per month' : 'poleceń miesięcznie'}</p></div>
              <div><p className="narz-rozbicie-etykieta">{en ? 'Lost customers' : 'Utraceni klienci'}</p><p className="narz-rozbicie-kwota">{num(r.min.klienci)} {en ? 'to' : 'do'} {num(r.max.klienci)}</p><p className="narz-mikro">{en ? 'per month' : 'miesięcznie'}</p></div>
            </div>
          ) : (
            <div className="narz-zablokowane">
              <div className="narz-rozbicie narz-zamglone" aria-hidden="true">
                <div><p className="narz-rozbicie-etykieta">{en ? 'No Google rankings' : 'Brak pozycji w Google'}</p><p className="narz-rozbicie-kwota narz-atrapa">{en ? 'PLN 00,000' : '00 000 zł'}</p></div>
                <div><p className="narz-rozbicie-etykieta">{en ? 'No AI recommendations' : 'Brak poleceń w AI'}</p><p className="narz-rozbicie-kwota narz-atrapa">{en ? 'PLN 00,000' : '00 000 zł'}</p></div>
                <div><p className="narz-rozbicie-etykieta">{en ? 'Lost customers' : 'Utraceni klienci'}</p><p className="narz-rozbicie-kwota narz-atrapa">00</p></div>
              </div>
              <BramkaEmail
                narzedzie="kalkulator"
                dane={wejscie}
                naglowek={en ? 'See where this figure comes from' : 'Zobacz, skąd bierze się ta kwota'}
                opis={en ? 'We will split the loss between Google and AI, count the customers you lose and email you the breakdown.' : 'Rozbijemy stratę na Google i AI, policzymy utraconych klientów i wyślemy zestawienie e-mailem.'}
                korzysci={en ? ['How much you lose on Google and how much in AI', 'How many customers a month go to competitors', 'The yearly figure for your budget'] : ['Ile tracisz w Google, a ile w AI', 'Ilu klientów miesięcznie trafia do konkurencji', 'Wynik w skali roku do budżetu']}
                przycisk={en ? 'Show the breakdown' : 'Pokaż rozbicie'}
                onOdblokowano={(p, nl) => { setPelny(p); setNewsletter(nl); }}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
