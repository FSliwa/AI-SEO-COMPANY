// Strona aplikacji: Kalkulator strat (/narzedzia/kalkulator-strat-seo, /en/tools/seo-loss-calculator). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { hrefAudytuAi } from '@/lib/narzedzia';
import { Uklad, Sekcja, PozostaleNarzedzia } from './UkladAplikacji';
import * as s from './styl';
import KalkulatorClient from './KalkulatorClient';
import { ZALOZENIA } from '@/lib/kalkulatorStrat';

// --- Kalkulator --------------------------------------------------------------------------------

const FAQ_KALKULATORA = [
  { id: 'skad-widelki', question: 'Skąd widełki zamiast jednej kwoty?', answer: 'Badania CTR mocno się różnią: według First Page Sage pierwsza pozycja w Google zbiera 39,8% kliknięć, według badania GrowthSRC z 2025 roku 19%. Liczymy oba warianty, żeby nie zawyżać wyniku i nie obiecywać jednej liczby.' },
  { id: 'skad-dane-o-ai', question: 'Skąd dane o wpływie AI?', answer: 'Wpływ przeglądów AI w Google bierzemy z badania Pew Research Center (marzec 2025): przy podsumowaniu AI użytkownicy klikali w wynik w 8% wizyt, bez niego w 15%, a podsumowanie pojawiło się przy 18% wyszukiwań. Udział pytań zadawanych asystentom AI ustawiasz sam; domyślne 25% to prognoza Gartnera.' },
  { id: 'czy-wynik-to-gwarancja', question: 'Czy wynik to gwarancja zysku po pozycjonowaniu?', answer: 'Nie. To szacunek potencjału przy pozycjach w TOP 3 i obecności w odpowiedziach AI, policzony z Twoich danych. Ile z niego da się odzyskać, zależy od konkurencji, budżetu i jakości strony.' },
  { id: 'gdzie-sprawdzic-wyszukiwania', question: 'Skąd wziąć liczbę wyszukiwań?', answer: 'Z Planera słów kluczowych Google Ads (bezpłatny po założeniu konta) albo z narzędzi SEO. Zsumuj miesięczne wyszukiwania kilku głównych fraz, np. „usługa + miasto”. Ruch z Google sprawdzisz w Google Search Console.' },
];

export function KalkulatorStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <KalkulatorEn />;
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  return (
    <Uklad
      slug="kalkulator-strat-seo"
      tag="Darmowy kalkulator"
      schema={{ name: 'Kalkulator strat bez SEO i widoczności w AI', description: 'Bezpłatny kalkulator: szacuje, ile zysku miesięcznie traci firma bez pozycji w TOP 3 Google i bez poleceń w odpowiedziach AI, na podstawie jej danych i badań CTR.', category: 'FinanceApplication' }}
      odpowiedz="Kalkulator szacuje, ile zysku miesięcznie trafia do konkurencji, gdy Twojej firmy nie ma w TOP 3 Google i w odpowiedziach ChatGPT czy Gemini. Liczy z Twoich danych: liczby wyszukiwań, obecnego ruchu, konwersji, wartości klienta i marży, oraz z jawnych założeń z badań CTR i wpływu przeglądów AI. Wynik podaje w widełkach."
      faq={FAQ_KALKULATORA}
      tytulFaq="Pytania o kalkulator strat"
    >
      <KalkulatorClient />
      <Sekcja id="jak-liczymy" tytul="Jak liczymy stratę">
        <ol style={s.lista}>
          <li><strong>Potencjał w Google:</strong> wyszukiwania pomniejszone o część, która trafia do asystentów AI, razy średni CTR pozycji 1-3: {(Math.round(ZALOZENIA.ctrTop3.ostrozny * 1000) / 10).toLocaleString('pl-PL')}% w wariancie ostrożnym i {(Math.round(ZALOZENIA.ctrTop3.optymistyczny * 1000) / 10).toLocaleString('pl-PL')}% w optymistycznym.</li>
          <li><strong>Przeglądy AI w Google:</strong> przy {Math.round(ZALOZENIA.aio.udzialWyszukiwan * 100)}% wyszukiwań kliknięcia spadają z {Math.round(ZALOZENIA.aio.ctrBez * 100)}% do {Math.round(ZALOZENIA.aio.ctrZ * 100)}% wizyt, więc obniżamy CTR proporcjonalnie.</li>
          <li><strong>Strata w Google</strong> to potencjał minus Twój obecny ruch z Google (nie mniej niż zero).</li>
          <li><strong>Strata w AI:</strong> część pytań zadawanych asystentom AI razy ten sam CTR, jeśli modele nie polecają dziś Twojej firmy.</li>
          <li><strong>Zysk:</strong> utracone wizyty razy konwersja, wartość klienta i marża.</li>
        </ol>
        <p style={s.akapit}>Chcesz wiedzieć, ile kosztuje odzyskanie tego ruchu? Ceny pakietów są w <Link href={cennik} style={s.podkreslenie}>cenniku pozycjonowania</Link>, a widoczność w AI sprawdzisz w <Link href={hrefAudytuAi()} style={s.podkreslenie}>audycie widoczności w AI</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="kalkulator-strat-seo" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_KALKULATORA_EN = [
  { id: 'why-a-range', question: 'Why a range instead of a single amount?', answer: 'CTR studies differ a lot: according to First Page Sage the first position in Google gets 39.8% of clicks, while according to a 2025 GrowthSRC study it gets 19%. We calculate both variants so we do not inflate the result or promise a single number.' },
  { id: 'where-does-the-ai-data-come-from', question: 'Where does the data on the impact of AI come from?', answer: 'We take the impact of Google AI Overviews from a Pew Research Center study (March 2025): with an AI summary users clicked a result in 8% of visits, without one in 15%, and a summary appeared for 18% of searches. You set the share of questions asked to AI assistants yourself; the default 25% is a Gartner forecast.' },
  { id: 'is-the-result-a-profit-guarantee', question: 'Is the result a guarantee of profit after SEO?', answer: 'No. It is an estimate of potential at top 3 positions and presence in AI answers, calculated from your data. How much of it you can recover depends on competition, budget and the quality of your website.' },
  { id: 'where-to-find-search-volume', question: 'Where do I get the number of searches?', answer: 'From Google Ads Keyword Planner (free once you have an account) or from SEO tools. Add up the monthly searches of a few main keywords, for example “service + city”. You can check your Google traffic in Google Search Console.' },
];

function KalkulatorEn() {
  const cennik = hrefJesliOpublikowana('/cennik-pozycjonowania') ?? '/cennik-pozycjonowania';
  return (
    <Uklad
      locale="en"
      slug="kalkulator-strat-seo"
      tag="Free calculator"
      schema={{ name: 'Calculator: profit lost without SEO and AI visibility', description: 'A free calculator that estimates how much profit a business loses each month without top 3 Google positions and without recommendations in AI answers, based on its data and CTR studies.', category: 'FinanceApplication' }}
      odpowiedz="The calculator estimates how much profit goes to competitors each month when your business is not in Google’s top 3 or in ChatGPT and Gemini answers. It uses your data: the number of searches, current traffic, conversion rate, customer value and margin, plus open assumptions from CTR studies and the impact of AI Overviews. The result is given as a range."
      faq={FAQ_KALKULATORA_EN}
      tytulFaq="Questions about the loss calculator"
    >
      <KalkulatorClient />
      <Sekcja id="how-we-calculate" tytul="How we calculate the loss">
        <ol style={s.lista}>
          <li><strong>Potential in Google:</strong> searches minus the share that goes to AI assistants, times the average CTR of positions 1-3: {(Math.round(ZALOZENIA.ctrTop3.ostrozny * 1000) / 10).toLocaleString('en-US')}% in the cautious variant and {(Math.round(ZALOZENIA.ctrTop3.optymistyczny * 1000) / 10).toLocaleString('en-US')}% in the optimistic one.</li>
          <li><strong>Google AI Overviews:</strong> for {Math.round(ZALOZENIA.aio.udzialWyszukiwan * 100)}% of searches, clicks fall from {Math.round(ZALOZENIA.aio.ctrBez * 100)}% to {Math.round(ZALOZENIA.aio.ctrZ * 100)}% of visits, so we lower CTR proportionally.</li>
          <li><strong>Loss in Google</strong> is the potential minus your current Google traffic (never less than zero).</li>
          <li><strong>Loss in AI:</strong> the share of questions asked to AI assistants times the same CTR, if the models do not recommend your business today.</li>
          <li><strong>Profit:</strong> lost visits times conversion rate, customer value and margin.</li>
        </ol>
        <p style={s.akapit}>Want to know what it costs to win that traffic back? Package prices are in the <Link href={cennik} style={s.podkreslenie}>SEO pricing</Link>, and you can check your AI visibility in the <Link href={hrefAudytuAi()} style={s.podkreslenie}>AI visibility audit</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="kalkulator-strat-seo" locale="en" />
    </Uklad>
  );
}
