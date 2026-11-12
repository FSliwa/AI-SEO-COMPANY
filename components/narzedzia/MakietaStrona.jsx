// Strona aplikacji: Makieta redesignu (/narzedzia/makieta-redesignu, /en/tools/website-redesign-mockup). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
// 12.11.2026 (S1-poprawki, sekcja 4 zmiany.md): lead i „Krótka odpowiedź” (Z-M3), Co dostajesz (Z-M2),
// przykład wyniku (Z-M5, na razie tylko tryb demo, opisany wprost), 3 kroki i zasady treści (Z-M4),
// Co dalej (Z-M6), FAQ 8 (Z-M7), ograniczenia, jak ocenić makietę, źródła, poradniki i inne narzędzia.
// Fakty o działaniu: panel-fix/lib/narzedzia/makieta.ts (dane strony :38-65, zrzut :68-79, prompt :80-105,
// podgląd do 2. sekcji :161-167), limit 2/IP (wspolne.ts LIMITY), link 60 dni (cron tool_runs).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { MAKIETA, cena } from '@/lib/narzedziaLiczby';
import Zrodla from '@/components/Zrodla';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import MakietaClient from './MakietaClient';

const SCIEZKA = '/narzedzia/makieta-redesignu';
const AUDYT = '/narzedzia/audyt-seo';
const projektowanie = () => hrefJesliOpublikowana('/projektowanie-stron-internetowych') ?? '/projektowanie-stron-internetowych';
const BRIEF = hrefJesliOpublikowana('/narzedzia/brief-strony-internetowej');
const minuty = MAKIETA.minut.replace('-', ' do ');

// Z-M5: przykład wyniku. Prawdziwej pary „przed i po” jeszcze nie mamy (link do makiety staniax.pl z 11.11
// nie zachował się, a lokalnie nie ma klucza Anthropic), więc pokazujemy zrzuty z trybu demonstracyjnego
// narzędzia i piszemy to wprost. Gdy właściciel strony zgodzi się na publikację, dopisać tu parę ze
// zrzutami bez poprawek: { przed, po, domena, branza, data } (szablon podpisu w zmiany.md Z-M5).
// Bez zrzutu demo na telefonie: HTML trybu demo (lib/narzedziaDemo.js) nie ma media queries i na 390 px
// wygląda gorzej niż prawdziwa makieta (prompt wymaga wersji 360-1440 px), więc wprowadzałby w błąd.
const DEMO = {
  pl: {
    komputer: { src: '/images/narzedzia/makieta/demo-wynik-komputer.webp', width: 1200, height: 1919 },
  },
  en: {
    komputer: { src: '/images/narzedzia/makieta/demo-wynik-komputer-en.webp', width: 1200, height: 1919 },
  },
};
const DATA_ZRZUTOW = { pl: '12.11.2026', en: 'November 12, 2026' };

const ZRODLA = [
  { url: 'https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes', nazwa: 'Google Search Central: Site moves with URL changes (przekierowania 301 przy zmianie adresów)', nazwaEn: 'Google Search Central: Site moves with URL changes (301 redirects when URLs change)', data: '2026-11-12' },
  { url: 'https://developers.google.com/search/docs/crawling-indexing/mobile/mobile-sites-mobile-first-indexing', nazwa: 'Google Search Central: Mobile-first indexing best practices (Google ocenia wersję na telefon)', nazwaEn: 'Google Search Central: Mobile-first indexing best practices (Google uses the mobile version)', data: '2026-11-12' },
  { url: 'https://www.w3.org/TR/WCAG22/#contrast-minimum', nazwa: 'W3C: WCAG 2.2, kryterium 1.4.3 Contrast (Minimum), próg 4,5:1', nazwaEn: 'W3C: WCAG 2.2, success criterion 1.4.3 Contrast (Minimum), the 4.5:1 threshold', data: '2026-11-12' },
];

const siatkaPrzykladu = { display: 'grid', gap: '1.5rem', marginTop: '1.25rem' };
const cta = { marginTop: '1.25rem', textAlign: 'center' };

// --- Makieta redesignu ------------------------------------------------------------------------

const FAQ_MAKIETY = [
  { id: 'jak-powstaje-makieta', question: 'Jak powstaje makieta?', answer: 'Pobieramy Twoją stronę główną, wyciągamy z niej treści (nazwę, nagłówki, menu, opisy usług, kontakt i kolory) i robimy zrzut obecnego wyglądu. Model AI Claude projektuje z tego nowy układ strony głównej. Nie wymyśla liczb, opinii, nagród ani cen: używa tylko treści z Twojej strony.' },
  { id: 'czy-moge-uzyc-makiety', question: 'Czy mogę wdrożyć makietę?', answer: 'Makieta to propozycja wyglądu, a nie gotowa strona. Pokazuje kierunek: układ sekcji, hierarchię i kolory. Przed wdrożeniem trzeba ją dopasować do marki i zdjęć oraz zadbać o SEO: adresy, nagłówki, szybkość i dane strukturalne.' },
  { id: 'czy-makieta-jest-bezpieczna', question: 'Czy makieta zmienia coś na mojej stronie?', answer: 'Nie. Tylko czytamy publiczną stronę główną, tak jak przeglądarka. Makieta jest osobnym plikiem bez skryptów, wyświetlanym w zamkniętej ramce, a pełna wersja jest dostępna pod linkiem z maila przez 60 dni.' },
  { id: 'czy-zaszkodzi-seo', question: 'Czy nowa strona według makiety zaszkodzi SEO?', answer: 'Sama makieta niczego nie zmienia na Twojej stronie. Ryzyko pojawia się przy wdrożeniu nowego wyglądu: zmienione adresy, usunięte treści i wolniejsze ładowanie. Dlatego przy wdrożeniu trzeba zachować adresy albo ustawić przekierowania 301, przenieść treści i sprawdzić szybkość, zanim nowa strona zastąpi starą.' },
  { id: 'czy-ai-zmienia-tresc', question: 'Czy AI zmienia treść mojej strony?', answer: 'Model skraca i porządkuje teksty z Twojej strony, ale nie dopisuje liczb, opinii, nagród, cen ani nazw klientów. Teksty do wdrożenia i tak warto przejrzeć, bo makieta pokazuje kierunek, a nie gotową treść.' },
  { id: 'czy-potrzebne-konto', question: 'Czy muszę zakładać konto albo podawać kartę?', answer: `Nie. Pierwszy ekran makiety widzisz bez rejestracji. Do całej makiety potrzebny jest tylko adres e-mail, na który wysyłamy link. Limit to ${MAKIETA.limitIp} makiety dziennie z jednego adresu IP.` },
  { id: 'co-ma-sie-poprawic', question: 'Co wpisać w polu „Co ma się poprawić?”', answer: 'Cel, który ma spełniać nowa strona, np. więcej telefonów od klientów, nowocześniejszy wygląd albo czytelniejsza oferta. Model bierze go pod uwagę przy układzie sekcji i wezwaniach do kontaktu. Pole jest opcjonalne.' },
  { id: 'ile-kosztuje-nowa-strona', question: 'Ile kosztuje nowa strona według makiety?', answer: `Zależy od liczby podstron, integracji i treści. Stronę firmową w Next.js budujemy od ${cena('strona')} netto, a wycenę przygotujemy w 24 godziny w dni robocze. Zakres opisujemy na stronie <a href="/projektowanie-stron-internetowych">projektowania stron internetowych</a>.` },
];

export function MakietaStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <MakietaEn />;
  const demo = DEMO.pl;
  return (
    <Uklad
      slug="makieta-redesignu"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Makieta redesignu strony z AI',
        description: 'Bezpłatny generator makiety: z adresu obecnej strony tworzy propozycję nowego wyglądu strony głównej na komputer i telefon, z treści firmy.',
        category: 'DesignApplication',
        featureList: ['Propozycja nowej strony głównej', 'Wersja na komputer i telefon', 'Tylko treści z Twojej strony'],
        screenshot: { url: demo.komputer.src, width: demo.komputer.width, height: demo.komputer.height },
      }}
      lead={`Wpisz adres strony, a w ${minuty} minut AI zaprojektuje z jej treści nową stronę główną na komputer i telefon. Pierwszy ekran zobaczysz od razu, bez konta.`}
      narzedzie={<MakietaClient />}
      odpowiedz="Makieta redesignu to propozycja nowej strony głównej przygotowana przez model AI z treści, które już masz na stronie: nazwy, nagłówków, menu, opisów usług, danych kontaktowych i kolorów. Pokazuje układ sekcji, typografię, kolory i wersję na telefon. To kierunek do rozmowy z wykonawcą, a nie gotowa strona: pierwszy ekran widzisz od razu, całą makietę po podaniu e-maila."
      faq={FAQ_MAKIETY}
      tytulFaq="Pytania o makietę redesignu"
    >
      <CoDostajesz
        locale="pl"
        tytulOdRazu="Od razu, bez konta"
        odRazu={[
          'Zrzut Twojej obecnej strony głównej (gdy usługa zrzutów odpowie w 30 sekund).',
          'Obok pierwszy ekran nowej strony: nagłówek z menu i sekcja powitalna.',
          'Bez rejestracji, karty i instalacji.',
        ]}
        poEmailu={[
          'Całą makietę: 4 do 6 sekcji z Twoich treści i stopkę.',
          'Podgląd na komputerze i na telefonie.',
          'Link do makiety ważny 60 dni, który możesz pokazać wspólnikowi albo wykonawcy.',
        ]}
        przypis="Co z tym zrobić: potraktuj makietę jak kierunek do rozmowy, czyli układ sekcji, hierarchię i kolory. Zdjęcia, teksty i SEO dopracowuje się przy wdrożeniu."
      />

      <Sekcja id="przyklad" tytul="Przykład: jak wygląda wynik">
        <p style={s.akapit}>Tak wygląda ekran wyniku na komputerze: pierwszy ekran nowej strony, a pod nim bramka do całej makiety. W prawdziwym wyniku obok stoi jeszcze zrzut Twojej obecnej strony (gdy usługa zrzutów odpowie); tryb demonstracyjny go nie robi. Zrzut pochodzi z trybu demonstracyjnego narzędzia: firma „Przykład Sp. z o.o.” i jej teksty są przykładowe, a nie wynikiem dla prawdziwej strony. Zrzut jest bez ręcznych poprawek. Prawdziwe pary „przed i po” pokażemy tu tylko za zgodą właścicieli tych stron.</p>
        <div style={siatkaPrzykladu}>
          <ZrzutWyniku
            {...demo.komputer}
            alt="Makieta redesignu strony w trybie demo: pierwszy ekran nowej strony głównej na komputerze i bramka do całej makiety"
            podpis={`Ekran wyniku na komputerze: pierwszy ekran nowej strony od razu, reszta po podaniu e-maila. Tryb demo, zrzut z ${DATA_ZRZUTOW.pl}.`}
          />
        </div>
      </Sekcja>

      <Sekcja id="jak-powstaje" tytul="Jak powstaje makieta: 3 kroki">
        <ol style={s.lista}>
          <li><strong>Czytamy Twoją stronę główną.</strong> Pobieramy nazwę, nagłówki, menu, opisy usług, dane kontaktowe i kolory marki i robimy zrzut obecnego wyglądu.</li>
          <li><strong>AI projektuje nowy układ.</strong> Model Claude układa nagłówek z menu i pierwszy ekran, potem 4 do 6 sekcji z Twoich treści (np. usługi, dlaczego my, proces, obszar działania, kontakt) i stopkę, w wersji na komputer i telefon.</li>
          <li><strong>Porównujesz.</strong> Pierwszy ekran nowej strony pokazujemy obok obecnej od razu. Całą makietę i link ważny 60 dni dostajesz po podaniu e-maila.</li>
        </ol>
        <p style={s.akapit}>Cały proces trwa zwykle {minuty} minut. W tym czasie zostaw kartę otwartą: postęp widać pod przyciskiem.</p>
      </Sekcja>

      <Sekcja id="zasady-tresci" tytul="Twoje treści, bez wymyślonych danych">
        <p style={s.akapit}>Model może skracać i porządkować Twoje teksty, ale nie wymyśla liczb, lat doświadczenia, opinii klientów, nagród, certyfikatów, cen, nazw klientów ani statystyk. Gdy czegoś na stronie brakuje, pomija ten element zamiast go zmyślać. Makieta jest plikiem bez skryptów i formularzy, wyświetlanym w zamkniętej ramce, a my tylko czytamy publiczną stronę główną, tak jak przeglądarka.</p>
        <p style={s.akapit}>Jedno ograniczenie: gdy strona pokazuje tekst dopiero po uruchomieniu JavaScriptu, model dostaje mniej treści i makieta wychodzi uboższa. Sprawdzisz to w <Link href={AUDYT} style={s.podkreslenie}>darmowym audycie SEO</Link> (reguła „Treść niewidoczna bez JavaScriptu”).</p>
      </Sekcja>

      <Sekcja id="kiedy-redesign" tytul="Kiedy warto zmienić wygląd strony">
        <ul style={s.lista}>
          <li>Strona źle wygląda na telefonie albo trzeba ją powiększać palcami.</li>
          <li>Klient w pierwszym ekranie nie widzi, co robisz, dla kogo i jak się z Tobą skontaktować.</li>
          <li>Strona ładuje się wolno, a audyt pokazuje niską wydajność na telefonie.</li>
          <li>Wygląd odstaje od konkurencji i od tego, jak firma pracuje dziś.</li>
        </ul>
        <p style={s.akapit}>Makieta pomaga zobaczyć kierunek, zanim wydasz pieniądze. Wersja na telefon ma znaczenie także dla SEO: Google ocenia stronę głównie w wersji mobilnej.</p>
      </Sekcja>

      <Sekcja id="jak-ocenic" tytul="Jak ocenić makietę: 5 pytań">
        <ol style={s.lista}>
          <li><strong>Czy w pierwszym ekranie widać, co robisz, dla kogo i gdzie?</strong> Jeśli nie, brakuje tego zdania także na obecnej stronie: dopisz je, zanim zaczniesz wdrożenie.</li>
          <li><strong>Czy przycisk kontaktu i telefon są widoczne bez przewijania, także na telefonie?</strong> Przełącz podgląd na telefon i sprawdź pierwszy ekran.</li>
          <li><strong>Czy sekcje odpowiadają na pytania klientów?</strong> Co oferujesz, jak wygląda współpraca, gdzie działasz i jak się umówić.</li>
          <li><strong>Czego brakuje, bo nie ma tego na obecnej stronie?</strong> Realizacje, zdjęcia, opinie, ceny: model ich nie dopisze, więc to lista treści do przygotowania.</li>
          <li><strong>Czy kolory i typografia pasują do marki?</strong> Zapisz, co zostaje, a co zmienić. To gotowy fragment briefu dla wykonawcy.</li>
        </ol>
      </Sekcja>

      <Sekcja id="ograniczenia" tytul="Czego makieta nie zrobi">
        <ul style={s.lista}>
          <li>Projektuje tylko stronę główną, bez podstron oferty, kontaktu czy bloga.</li>
          <li>Nie tworzy zdjęć: używa logo i obrazu udostępniania z Twojej strony, a resztę zastępuje kolorem i prostymi ikonami.</li>
          <li>Model dostaje do 6 000 znaków tekstu ze strony głównej. Dłuższy tekst jest ucinany, więc treści z dolnej części strony mogą się nie zmieścić.</li>
          <li>To statyczny plik HTML: bez edytora i eksportu do WordPressa czy Figmy. Zmiany wprowadza się przy wdrożeniu.</li>
          <li>Polska wersja narzędzia pisze makietę po polsku. Każde uruchomienie daje trochę inną propozycję; limit to {MAKIETA.limitIp} makiety dziennie z jednego adresu IP.</li>
          <li>Zrzut obecnej strony robi zewnętrzna usługa. Gdy nie odpowie, model pracuje na samych treściach i nie zobaczysz porównania obok siebie.</li>
        </ul>
      </Sekcja>

      <Sekcja id="makieta-a-projekt" tytul="Makieta z AI a projekt od projektanta">
        <ul style={s.lista}>
          <li><strong>Czas:</strong> makieta powstaje w {minuty} minut. Projekt od projektanta wymaga briefu, rozmowy i kilku rund poprawek.</li>
          <li><strong>Treść:</strong> makieta używa tylko tego, co już jest na Twojej stronie. Projektant może zaproponować nowe teksty, zdjęcia i strukturę podstron.</li>
          <li><strong>Zakres:</strong> makieta to jedna strona główna. Projekt obejmuje też podstrony, elementy powtarzalne i zasady wyglądu marki.</li>
          <li><strong>Kiedy co:</strong> makieta pomaga zdecydować, czy i w którą stronę zmieniać wygląd. Projekt jest potrzebny, gdy ta decyzja już zapadła.</li>
        </ul>
      </Sekcja>

      <Sekcja id="co-dalej" tytul="Co dalej z makietą">
        <ul style={s.lista}>
          <li><strong>Wdrożenie u nas:</strong> stronę firmową w Next.js budujemy od {cena('strona')} netto, z SEO, szybkością i przekierowaniami ze starych adresów. Wycenę dostajesz w 24 godziny w dni robocze. <Link href={projektowanie()} style={s.podkreslenie}>Zobacz, jak pracujemy przy projektowaniu stron internetowych</Link>.</li>
          <li><strong>Wdrożenie z innym wykonawcą:</strong> link z maila działa 60 dni, więc możesz pokazać makietę programiście albo agencji.</li>
          <li><strong>Sam kierunek:</strong> użyj makiety jako punktu wyjścia do {BRIEF ? <Link href={BRIEF} style={s.podkreslenie}>briefu strony</Link> : 'briefu'}: zapisz, które sekcje zostają, czego brakuje i jakie zdjęcia trzeba przygotować.</li>
        </ul>
        <div style={cta}>
          <Link href={projektowanie()} className="btn btn-primary" data-cta="makieta_wycena">Wyceń wdrożenie makiety</Link>
        </div>
      </Sekcja>

      <Zrodla zrodla={ZRODLA} id="zrodla-makiety" />
      <Poradniki narzedzie={SCIEZKA} />
      <PozostaleNarzedzia bez={SCIEZKA} />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_MAKIETY_EN = [
  { id: 'how-is-the-mockup-made', question: 'How is the mockup made?', answer: 'We fetch your homepage, extract its content (name, headings, menu, service descriptions, contact details and colors) and take a screenshot of how it looks now. The Claude AI model designs a new homepage layout from that. It does not invent numbers, reviews, awards or prices: it only uses content from your website.' },
  { id: 'can-i-use-the-mockup', question: 'Can I put the mockup live?', answer: 'The mockup is a proposal for the look, not a finished website. It shows a direction: the section layout, hierarchy and colors. Before launch it has to be adapted to your brand and photos, and you need to take care of SEO: URLs, headings, speed and structured data.' },
  { id: 'is-the-mockup-safe', question: 'Does the mockup change anything on my website?', answer: 'No. We only read the public homepage, the way a browser does. The mockup is a separate file with no scripts, shown in a sandboxed frame, and the full version is available through the link in the email for 60 days.' },
  { id: 'will-it-hurt-seo', question: 'Will a new website based on the mockup hurt my SEO?', answer: 'The mockup itself changes nothing on your website. The risk comes when you launch the new design: changed URLs, removed content and slower loading. That is why the build has to keep your URLs or set up 301 redirects, carry over the content and check the speed before the new site replaces the old one.' },
  { id: 'does-ai-change-my-content', question: 'Does the AI change my content?', answer: 'The model shortens and reorganises the copy from your website, but it does not add numbers, reviews, awards, prices or client names. It is still worth reviewing the copy before launch, because the mockup shows a direction, not finished content.' },
  { id: 'do-i-need-an-account', question: 'Do I need an account or a credit card?', answer: `No. You see the first screen of the mockup without signing up. For the whole mockup you only need an email address, to which we send the link. The limit is ${MAKIETA.limitIp} mockups per day from one IP address.` },
  { id: 'what-language', question: 'What language is the mockup in?', answer: 'The same language as your website: a Polish website gets a Polish mockup and an English website an English one.' },
  { id: 'how-much-does-a-new-website-cost', question: 'How much does a new website based on the mockup cost?', answer: `It depends on the number of pages, integrations and content. We build a Next.js company website from ${cena('strona', 'en')} net and prepare a quote within 24 hours on business days. The scope is described on our <a href="/en/web-design">web design</a> page.` },
];

function MakietaEn() {
  const demo = DEMO.en;
  const minutyEn = MAKIETA.minut.replace('-', ' to ');
  return (
    <Uklad
      locale="en"
      slug="makieta-redesignu"
      tag="Free tool"
      schema={{
        name: 'AI website redesign mockup',
        description: 'A free mockup generator: from the address of your current website it creates a proposal for a new homepage design on desktop and mobile, built from your business’s content.',
        category: 'DesignApplication',
        featureList: ['A new homepage proposal', 'Desktop and mobile version', 'Only content from your website'],
        screenshot: { url: demo.komputer.src, width: demo.komputer.width, height: demo.komputer.height },
      }}
      lead={`Free website redesign mockup: enter your website address and in ${minutyEn} minutes AI designs a new homepage for desktop and mobile from your content. No account needed.`}
      narzedzie={<MakietaClient />}
      odpowiedz="A redesign mockup is a proposal for a new homepage that an AI model builds from the content already on your website: your name, headings, menu, service descriptions, contact details and colors. It shows the section layout, typography, colors and a mobile version. It is a direction to discuss with a developer, not a finished website: you see the first screen right away and the whole mockup after you enter your email."
      faq={FAQ_MAKIETY_EN}
      tytulFaq="Questions about the redesign mockup"
    >
      <CoDostajesz
        locale="en"
        tytulOdRazu="Right away, with no account"
        odRazu={[
          'A screenshot of your current homepage (when the screenshot service responds within 30 seconds).',
          'Next to it, the first screen of the new page: the header with the menu and the hero section.',
          'No signup, card or installation.',
        ]}
        poEmailu={[
          'The whole mockup: 4 to 6 sections built from your content plus a footer.',
          'A desktop and mobile preview.',
          'A link to the mockup valid for 60 days that you can show to a partner or a developer.',
        ]}
        przypis="What to do with it: treat the mockup as a direction to discuss, that is the section layout, hierarchy and colors. Photos, copy and SEO are finished during the build."
      />

      <Sekcja id="example" tytul="Example: what the result looks like">
        <p style={s.akapit}>This is the result screen on desktop: the first screen of the new page and, below it, the gate to the whole mockup. In a real result a screenshot of your current page stands next to it (when the screenshot service responds); demo mode does not take one. The screenshot comes from the tool’s demo mode: the company “Example Ltd.” and its copy are samples, not a result for a real website. The screenshot is unedited. We will show real before-and-after pairs here only with the website owners’ consent.</p>
        <div style={siatkaPrzykladu}>
          <ZrzutWyniku
            {...demo.komputer}
            alt="Website redesign mockup in demo mode: the first screen of the new homepage on desktop and the gate to the whole mockup"
            podpis={`The result screen on desktop: the first screen of the new page right away, the rest after you enter your email. Demo mode, screenshot from ${DATA_ZRZUTOW.en}.`}
          />
        </div>
      </Sekcja>

      <Sekcja id="how-it-works" tytul="How the mockup is made: 3 steps">
        <ol style={s.lista}>
          <li><strong>We read your homepage.</strong> We take your name, headings, menu, service descriptions, contact details and brand colors, and capture a screenshot of the current design.</li>
          <li><strong>AI designs a new layout.</strong> The Claude model builds a header with the menu and a first screen, then 4 to 6 sections from your content (e.g. services, why us, process, service area, contact) and a footer, for desktop and mobile.</li>
          <li><strong>You compare.</strong> We show the first screen of the new page next to your current one right away. You get the whole mockup and a link valid for 60 days after you enter your email.</li>
        </ol>
        <p style={s.akapit}>The whole process usually takes {minutyEn} minutes. Keep the tab open in the meantime: the progress shows under the button.</p>
      </Sekcja>

      <Sekcja id="content-rules" tytul="Your content, no invented data">
        <p style={s.akapit}>The model may shorten and reorganise your copy, but it does not invent numbers, years of experience, customer reviews, awards, certifications, prices, client names or statistics. If something is missing from your website, it leaves that element out instead of making it up. The mockup is a file with no scripts or forms, shown in a sandboxed frame, and we only read your public homepage, the way a browser does.</p>
        <p style={s.akapit}>One limit: if your website shows its text only after JavaScript runs, the model gets less content and the mockup comes out thinner. You can check this in the <Link href={AUDYT} style={s.podkreslenie}>free SEO audit</Link> (the “Content invisible without JavaScript” rule).</p>
      </Sekcja>

      <Sekcja id="when-to-redesign" tytul="When it is worth changing how your website looks">
        <ul style={s.lista}>
          <li>The site looks bad on a phone or has to be zoomed with your fingers.</li>
          <li>On the first screen a customer cannot see what you do, who for and how to contact you.</li>
          <li>The site loads slowly and an audit shows low mobile performance.</li>
          <li>The look lags behind your competitors and behind how the business works today.</li>
        </ul>
        <p style={s.akapit}>A mockup helps you see a direction before you spend money. The mobile version matters for SEO too: Google evaluates your website mainly in its mobile version.</p>
      </Sekcja>

      <Sekcja id="how-to-review" tytul="How to review the mockup: 5 questions">
        <ol style={s.lista}>
          <li><strong>Does the first screen show what you do, who for and where?</strong> If not, that sentence is missing from your current website too: add it before the build starts.</li>
          <li><strong>Are the contact button and phone number visible without scrolling, on mobile too?</strong> Switch the preview to mobile and check the first screen.</li>
          <li><strong>Do the sections answer customers’ questions?</strong> What you offer, how working together looks, where you operate and how to book.</li>
          <li><strong>What is missing because it is not on your current website?</strong> Projects, photos, reviews, prices: the model will not add them, so this is your list of content to prepare.</li>
          <li><strong>Do the colors and typography fit your brand?</strong> Note what stays and what should change. That is a ready part of the brief for your developer.</li>
        </ol>
      </Sekcja>

      <Sekcja id="limits" tytul="What the mockup will not do">
        <ul style={s.lista}>
          <li>It designs the homepage only, without the service, contact or blog pages.</li>
          <li>It does not create photos: it uses the logo and the sharing image from your website and replaces the rest with color and simple icons.</li>
          <li>The model gets up to 6,000 characters of text from your homepage. Longer text is cut off, so content from the lower part of the page may not make it in.</li>
          <li>It is a static HTML file: no editor and no export to WordPress or Figma. Changes are made during the build.</li>
          <li>The mockup is written in the language of your website. Every run gives a slightly different proposal; the limit is {MAKIETA.limitIp} mockups per day from one IP address.</li>
          <li>The screenshot of your current website comes from an external service. If it does not respond, the model works from your content only and you will not see a side-by-side comparison.</li>
        </ul>
      </Sekcja>

      <Sekcja id="mockup-vs-designer" tytul="AI mockup vs a designer’s project">
        <ul style={s.lista}>
          <li><strong>Time:</strong> the mockup is ready in {minutyEn} minutes. A designer’s project needs a brief, a conversation and a few rounds of changes.</li>
          <li><strong>Content:</strong> the mockup uses only what is already on your website. A designer can propose new copy, photos and a new page structure.</li>
          <li><strong>Scope:</strong> the mockup is one homepage. A project also covers the subpages, reusable components and brand design rules.</li>
          <li><strong>When to use which:</strong> the mockup helps you decide whether and in which direction to change the design. A project is what you need once that decision is made.</li>
        </ul>
      </Sekcja>

      <Sekcja id="next-steps" tytul="What to do with the mockup next">
        <ul style={s.lista}>
          <li><strong>Build it with us:</strong> we build a Next.js company website from {cena('strona', 'en')} net, with SEO, speed and redirects from your old URLs. You get a quote within 24 hours on business days. <Link href={projektowanie()} style={s.podkreslenie}>See how we approach web design</Link>.</li>
          <li><strong>Build it with someone else:</strong> the link in the email works for 60 days, so you can show the mockup to a developer or an agency.</li>
          <li><strong>Use it as a direction:</strong> treat the mockup as the starting point of a {BRIEF ? <Link href={BRIEF} style={s.podkreslenie}>website brief</Link> : 'brief'}: note which sections stay, what is missing and which photos you need.</li>
        </ul>
        <div style={cta}>
          <Link href={projektowanie()} className="btn btn-primary" data-cta="makieta_wycena">Get a quote for the mockup</Link>
        </div>
      </Sekcja>

      <Zrodla zrodla={ZRODLA.map((z) => ({ ...z, nazwa: z.nazwaEn }))} id="mockup-sources" en />
      <Poradniki narzedzie={SCIEZKA} locale="en" />
      <PozostaleNarzedzia bez={SCIEZKA} locale="en" />
    </Uklad>
  );
}
