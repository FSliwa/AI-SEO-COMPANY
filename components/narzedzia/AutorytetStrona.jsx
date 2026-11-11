// Strona aplikacji: Autorytet domeny (/narzedzia/autorytet-domeny, /en/tools/domain-authority-checker). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).

import { Uklad, Sekcja, PozostaleNarzedzia } from './UkladAplikacji';
import * as s from './styl';
import AutorytetClient from './AutorytetClient';

// --- Autorytet domeny ----------------------------------------------------------------------------

const FAQ_AUTORYTETU = [
  { id: 'dr-a-da', question: 'Czym różni się DR od DA?', answer: 'Domain Rating (DR) to metryka Ahrefs, a Domain Authority (DA) metryka Moz. Obie oceniają siłę profilu linków w skali 0-100 i obie są logarytmiczne, ale liczą się z różnych baz linków, więc ta sama domena ma inny DR i inny DA. Porównuj domeny w jednej metryce.' },
  { id: 'jaki-dr-jest-dobry', question: 'Jaki DR jest dobry?', answer: 'Zależy od konkurencji. W lokalnych usługach często wystarcza DR kilkanaście, w ogólnopolskich frazach e-commerce konkurenci mają zwykle dużo więcej. Dlatego narzędzie pozwala porównać się z konkurentami, a nie z abstrakcyjnym progiem.' },
  { id: 'jak-podniesc-dr', question: 'Jak podnieść Domain Rating?', answer: 'Zdobywając linki z serwisów, które same mają wysoki DR i są powiązane z Twoją branżą: media branżowe, partnerzy, katalogi z moderacją, badania i treści, które inni chętnie cytują. Kupowanie masowych linków podnosi DR na chwilę i grozi karą Google.' },
  { id: 'czy-dr-wplywa-na-pozycje', question: 'Czy DR wpływa na pozycje w Google?', answer: 'Google nie używa DR. To miara Ahrefs, która dobrze oddaje siłę linków prowadzących do domeny, a linki są jednym z czynników rankingu Google. DR jest więc wskaźnikiem, a nie przyczyną pozycji.' },
];

export function AutorytetStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AutorytetEn />;
  return (
    <Uklad
      slug="autorytet-domeny"
      tag="Darmowe narzędzie"
      schema={{ name: 'Sprawdzanie autorytetu domeny (Domain Rating)', description: 'Bezpłatne sprawdzenie Domain Rating (DR) z bazy Ahrefs: siła profilu linków domeny w skali 0-100 i porównanie z konkurentami.', category: 'BusinessApplication' }}
      odpowiedz="Autorytet domeny to ocena siły profilu linków prowadzących do strony, w skali od 0 do 100. Narzędzie pokazuje Domain Rating (DR) z bazy Ahrefs, czyli najpopularniejszy odpowiednik Domain Authority (DA) z Moz. Wynik dostajesz od razu i za darmo, a po podaniu e-maila porównasz się z maksymalnie trzema konkurentami."
      faq={FAQ_AUTORYTETU}
      tytulFaq="Pytania o autorytet domeny"
    >
      <AutorytetClient />
      <Sekcja id="co-to-jest-dr" tytul="Co to jest Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating to metryka Ahrefs, która porównuje profil linków danej domeny z profilami wszystkich domen w bazie Ahrefs. Liczy się liczba unikalnych domen linkujących i ich własny DR, a nie sama liczba linków. Skala jest logarytmiczna: przejście z DR 20 na 30 jest łatwiejsze niż z 60 na 70.</p>
        <p style={s.akapit}>Wartość pochodzi z darmowego interfejsu Ahrefs i jest podpisana zgodnie z licencją: Domain Rating by Ahrefs. Nie zapisujemy jej w żadnym rankingu.</p>
        <p style={s.akapit}>Pokazujemy DR w nowej wersji (DR4), na którą Ahrefs przechodzi 1 grudnia 2026. DR4 mocniej obniża domeny, do których prowadzą linki ze spamu, więc wynik może być niższy niż w starszych zestawieniach i narzędziach.</p>
      </Sekcja>
      <Sekcja id="jak-uzyc-dr" tytul="Jak użyć wyniku">
        <ul style={s.lista}>
          <li>Porównaj swój DR z firmami, które są w TOP 10 na Twoje najważniejsze frazy. Duża różnica oznacza, że sama treść może nie wystarczyć.</li>
          <li>Sprawdzaj DR co kwartał. Spadek zwykle oznacza utracone linki, np. po zamknięciu serwisu partnera.</li>
          <li>Przy wyborze miejsc na publikacje sprawdzaj DR serwisu: link z mocnej, powiązanej tematycznie strony jest wart więcej niż dziesiątki słabych.</li>
        </ul>
      </Sekcja>
      <PozostaleNarzedzia bez="autorytet-domeny" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_AUTORYTETU_EN = [
  { id: 'dr-vs-da', question: 'How does DR differ from DA?', answer: 'Domain Rating (DR) is an Ahrefs metric and Domain Authority (DA) is a Moz metric. Both rate the strength of a link profile on a 0-100 scale and both are logarithmic, but they are calculated from different link databases, so the same domain has a different DR and a different DA. Compare domains using one metric.' },
  { id: 'what-is-a-good-dr', question: 'What is a good DR?', answer: 'It depends on your competitors. For local services a DR in the low teens is often enough; for nationwide e-commerce keywords in Poland, competitors usually have much more. That is why the tool lets you compare yourself with competitors rather than with an abstract threshold.' },
  { id: 'how-to-raise-domain-rating', question: 'How do I raise Domain Rating?', answer: 'By earning links from sites that have a high DR themselves and are related to your industry: trade media, partners, moderated directories, and research and content that others like to cite. Buying links in bulk raises DR for a moment and risks a Google penalty.' },
  { id: 'does-dr-affect-google-rankings', question: 'Does DR affect Google rankings?', answer: 'Google does not use DR. It is an Ahrefs measure that reflects well the strength of the links pointing to a domain, and links are one of Google’s ranking factors. So DR is an indicator, not the cause of a ranking.' },
];

function AutorytetEn() {
  return (
    <Uklad
      locale="en"
      slug="autorytet-domeny"
      tag="Free tool"
      schema={{ name: 'Domain authority checker (Domain Rating)', description: 'A free check of Domain Rating (DR) from the Ahrefs database: the strength of a domain’s link profile on a 0-100 scale, with a comparison against competitors.', category: 'BusinessApplication' }}
      odpowiedz="Domain authority is a rating of the strength of the link profile pointing to a website, on a scale from 0 to 100. The tool shows Domain Rating (DR) from the Ahrefs database, the most popular counterpart of Moz’s Domain Authority (DA). You get the result right away and for free, and after you give an email address you can compare yourself with up to three competitors."
      faq={FAQ_AUTORYTETU_EN}
      tytulFaq="Questions about domain authority"
    >
      <AutorytetClient />
      <Sekcja id="what-is-domain-rating" tytul="What is Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating is an Ahrefs metric that compares a domain’s link profile with the profiles of all domains in the Ahrefs database. What counts is the number of unique linking domains and their own DR, not the raw number of links. The scale is logarithmic: moving from DR 20 to 30 is easier than from 60 to 70.</p>
        <p style={s.akapit}>The value comes from the free Ahrefs interface and is credited as the license requires: Domain Rating by Ahrefs. We do not store it in any ranking.</p>
        <p style={s.akapit}>We show the new version of DR (DR4), which Ahrefs switches to on 1 December 2026. DR4 lowers domains with spam links much more, so the result may be lower than in older reports and tools.</p>
      </Sekcja>
      <Sekcja id="how-to-use-the-result" tytul="How to use the result">
        <ul style={s.lista}>
          <li>Compare your DR with companies that rank in the top 10 for your most important keywords. A big gap means content alone may not be enough.</li>
          <li>Check DR every quarter. A drop usually means lost links, for example after a partner’s site shuts down.</li>
          <li>When choosing places to publish, check the site’s DR: a link from a strong, thematically related site is worth more than dozens of weak ones.</li>
        </ul>
      </Sekcja>
      <PozostaleNarzedzia bez="autorytet-domeny" locale="en" />
    </Uklad>
  );
}
