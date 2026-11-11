// Strona aplikacji: Makieta redesignu (/narzedzia/makieta-redesignu, /en/tools/website-redesign-mockup). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { Uklad, Sekcja, PozostaleNarzedzia } from './UkladAplikacji';
import * as s from './styl';
import MakietaClient from './MakietaClient';

// --- Makieta redesignu ------------------------------------------------------------------------

const FAQ_MAKIETY = [
  { id: 'jak-powstaje-makieta', question: 'Jak powstaje makieta?', answer: 'Pobieramy Twoją stronę główną, wyciągamy z niej treści (nazwę, nagłówki, menu, opisy usług, kontakt i kolory) i robimy zrzut obecnego wyglądu. Model AI Claude projektuje z tego nowy układ strony głównej. Nie wymyśla liczb, opinii, nagród ani cen: używa tylko treści z Twojej strony.' },
  { id: 'czy-moge-uzyc-makiety', question: 'Czy mogę wdrożyć makietę?', answer: 'Makieta to propozycja wyglądu, a nie gotowa strona. Pokazuje kierunek: układ sekcji, hierarchię i kolory. Przed wdrożeniem trzeba ją dopasować do marki i zdjęć oraz zadbać o SEO: adresy, nagłówki, szybkość i dane strukturalne.' },
  { id: 'czy-makieta-jest-bezpieczna', question: 'Czy makieta zmienia coś na mojej stronie?', answer: 'Nie. Tylko czytamy publiczną stronę główną, tak jak przeglądarka. Makieta jest osobnym plikiem bez skryptów, wyświetlanym w zamkniętej ramce, a pełna wersja jest dostępna pod linkiem z maila przez 60 dni.' },
  { id: 'ile-kosztuje-nowa-strona', question: 'Ile kosztuje nowa strona według makiety?', answer: 'Zależy od liczby podstron, integracji i treści. Zakres i ceny projektowania stron opisujemy na stronie projektowania, a wycenę przygotujemy po krótkiej rozmowie.' },
];

export function MakietaStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <MakietaEn />;
  const projektowanie = hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
  return (
    <Uklad
      slug="makieta-redesignu"
      tag="Darmowe narzędzie"
      schema={{ name: 'Makieta redesignu strony z AI', description: 'Bezpłatny generator makiety: z adresu obecnej strony tworzy propozycję nowego wyglądu strony głównej na komputer i telefon, z treści firmy.', category: 'DesignApplication' }}
      odpowiedz="Wpisz adres swojej strony, a w 1 do 3 minut zobaczysz propozycję nowej strony głównej: układ sekcji, typografię, kolory i wersję na telefon, zbudowane z treści, które już masz. Pierwszy ekran pokazujemy od razu, całą makietę po podaniu e-maila."
      faq={FAQ_MAKIETY}
      tytulFaq="Pytania o makietę redesignu"
    >
      <MakietaClient />
      <Sekcja id="kiedy-redesign" tytul="Kiedy warto zmienić wygląd strony">
        <ul style={s.lista}>
          <li>Strona źle wygląda na telefonie albo trzeba ją powiększać palcami.</li>
          <li>Klient w pierwszym ekranie nie widzi, co robisz, dla kogo i jak się z Tobą skontaktować.</li>
          <li>Strona ładuje się wolno, a audyt pokazuje niską wydajność na telefonie.</li>
          <li>Wygląd odstaje od konkurencji i od tego, jak firma pracuje dziś.</li>
        </ul>
        <p style={s.akapit}>Makieta pomaga zobaczyć kierunek, zanim wydasz pieniądze. Gdy chcesz go wdrożyć, zobacz, jak pracujemy przy <Link href={projektowanie} style={s.podkreslenie}>projektowaniu stron internetowych</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="makieta-redesignu" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_MAKIETY_EN = [
  { id: 'how-is-the-mockup-made', question: 'How is the mockup made?', answer: 'We fetch your homepage, extract its content (name, headings, menu, service descriptions, contact details and colors) and take a screenshot of how it looks now. The Claude AI model designs a new homepage layout from that. It does not invent numbers, reviews, awards or prices: it only uses content from your website.' },
  { id: 'can-i-use-the-mockup', question: 'Can I put the mockup live?', answer: 'The mockup is a proposal for the look, not a finished website. It shows a direction: the section layout, hierarchy and colors. Before launch it has to be adapted to your brand and photos, and you need to take care of SEO: URLs, headings, speed and structured data.' },
  { id: 'is-the-mockup-safe', question: 'Does the mockup change anything on my website?', answer: 'No. We only read the public homepage, the way a browser does. The mockup is a separate file with no scripts, shown in a sandboxed frame, and the full version is available through the link in the email for 60 days.' },
  { id: 'how-much-does-a-new-website-cost', question: 'How much does a new website based on the mockup cost?', answer: 'It depends on the number of pages, integrations and content. We describe the scope and prices of web design on the web design page, and we prepare a quote after a short conversation.' },
];

function MakietaEn() {
  const projektowanie = hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
  return (
    <Uklad
      locale="en"
      slug="makieta-redesignu"
      tag="Free tool"
      schema={{ name: 'AI website redesign mockup', description: 'A free mockup generator: from the address of your current website it creates a proposal for a new homepage design on desktop and mobile, built from your business’s content.', category: 'DesignApplication' }}
      odpowiedz="Free website redesign mockup: enter your website address and in 1 to 3 minutes you will see a proposal for a new homepage: the section layout, typography, colors and a mobile version, built from the content you already have. We show the first screen right away and the whole mockup after you give an email address."
      faq={FAQ_MAKIETY_EN}
      tytulFaq="Questions about the redesign mockup"
    >
      <MakietaClient />
      <Sekcja id="when-to-redesign" tytul="When it is worth changing how your website looks">
        <ul style={s.lista}>
          <li>The site looks bad on a phone or has to be zoomed with your fingers.</li>
          <li>On the first screen a customer cannot see what you do, who for and how to contact you.</li>
          <li>The site loads slowly and an audit shows low mobile performance.</li>
          <li>The look lags behind your competitors and behind how the business works today.</li>
        </ul>
        <p style={s.akapit}>A mockup helps you see a direction before you spend money. When you want to put it live, see how we work on <Link href={projektowanie} style={s.podkreslenie}>web design</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="makieta-redesignu" locale="en" />
    </Uklad>
  );
}
