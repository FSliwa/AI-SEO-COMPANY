// Strona aplikacji: Autorytet domeny (/narzedzia/autorytet-domeny, /en/tools/domain-authority-checker). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).
// 12.11.2026 (S1-poprawki Z-D1 + decyzja właściciela): porównanie z maks. 3 konkurentami za darmo, bez e-maila;
// e-mail = raport z planem działania. Treść: DR i DR4 (Ahrefs), DR vs DA vs Authority Score, jak czytać wynik
// na tle konkurentów, jak podnieść autorytet (playbook SEO §6 i §7.2), ograniczenia (tylko DR, bez liczby
// domen linkujących). Strona dalej nieopublikowana do czasu klucza AHREFS_API_KEY (lib/publikacja.js).
// Fakty o DR: help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr i ahrefs.com/blog/domain-rating-dr4/
// (wpis z 5.11.2026; oba 200 w curl 11.11.2026). Pomiar DR3/DR4 naszej domeny: analiza A4 §2 (11.11.2026).
// Authority Score Semrush i DA Moz: opisy ze stron tych narzędzi (analiza A2 §4.2, 11.11.2026).

import { Link } from '@/i18n/routing';
import { AUTORYTET } from '@/lib/narzedziaLiczby';
import { Uklad, Sekcja, PozostaleNarzedzia, Poradniki, CoDostajesz, ZrzutWyniku } from './UkladAplikacji';
import * as s from './styl';
import AutorytetClient from './AutorytetClient';

const AHREFS_DR = 'https://help.ahrefs.com/en/articles/1409408-what-is-domain-rating-dr';
const AHREFS_DR4 = 'https://ahrefs.com/blog/domain-rating-dr4/';
const zewn = { target: '_blank', rel: 'noopener', style: s.podkreslenie };

// Z-07: zrzut przykładowego wyniku z trybu demonstracyjnego (12.11.2026, bez ręcznych poprawek; wynik
// i porównanie z 3 konkurentami, bez formularza raportu). Domeny example.com/.net/.org i konkurent.example
// (zarezerwowane do przykładów, RFC 2606) i ich wartości DR są przykładowe, a nie danymi Ahrefs; podpis mówi
// to wprost. Po pierwszym przebiegu na kluczu AHREFS_API_KEY można podmienić na prawdziwy wynik naszej domeny.
const ZRZUT = {
  pl: { src: '/images/narzedzia/przyklady/autorytet-domeny-przykladowy-wynik.webp', width: 1200, height: 990 },
  en: { src: '/images/narzedzia/przyklady/domain-authority-checker-example-result.webp', width: 1200, height: 990 },
};
const schemaZrzutu = (z) => ({ url: z.src, width: z.width, height: z.height });

// Z-03: Autorytet nie ma listy w lib/narzedzia/poradniki.js, więc pozycje podajemy tutaj (tytuły z lib/blogPosts.js).
const PORADNIKI_AUTORYTETU = [
  { href: '/blog/link-building-b2b-dla-marketerow-strategie-i-checklista', pl: ['Linkowanie B2B: strategie link buildingu i checklista', 'jak zdobywać linki w B2B i co sprawdzić przed publikacją'], en: ['B2B Link Building for Marketers: Strategies and Checklist', 'how to earn links in B2B and what to check before you publish'] },
  { href: '/blog/analiza-konkurencji-seo-przewodnik', pl: ['Analiza konkurencji SEO: przewodnik z przykładem 17 agencji', 'jak wybrać konkurentów do porównania i co u nich sprawdzić'], en: ['SEO Competitor Analysis: A Step-by-Step Guide', 'how to pick the competitors to compare and what to check'] },
  { href: '/pozycjonowanie-w-ai/chatgpt', pl: ['Pozycjonowanie w ChatGPT: skąd bierze firmy, które poleca', 'wzmianki o marce, które budują autorytet, liczą się też w odpowiedziach AI'], en: ['ChatGPT optimization: where ChatGPT finds the companies it recommends', 'brand mentions that build authority also count in AI answers'] },
];

// --- Autorytet domeny ----------------------------------------------------------------------------

const FAQ_AUTORYTETU = [
  { id: 'dr-a-da', question: 'Czym różni się DR od DA?', answer: 'Domain Rating (DR) to metryka Ahrefs, a Domain Authority (DA) metryka Moz. Obie oceniają siłę domeny w skali do 100, ale liczą się z różnych baz linków i według innych wzorów, więc ta sama domena ma inny DR i inny DA. Porównuj domeny w jednej metryce.' },
  { id: 'jaki-dr-jest-dobry', question: 'Jaki DR jest dobry?', answer: 'Zależy od konkurencji. W lokalnych usługach często wystarcza niewielki DR, bo konkurenci też mają mało linków, a w ogólnopolskich frazach e-commerce konkurenci mają zwykle dużo więcej. Dobry DR to taki, który nie odstaje od firm z pierwszej dziesiątki Google na Twoje frazy. Dlatego porównanie z maksymalnie trzema konkurentami jest w narzędziu za darmo.' },
  { id: 'porownanie-bez-emaila', question: 'Czy porównanie z konkurencją wymaga e-maila?', answer: 'Nie. DR Twojej domeny i porównanie z maksymalnie trzema konkurentami widzisz od razu, bez rejestracji i bez e-maila. E-mail jest potrzebny tylko wtedy, gdy chcesz dostać raport z planem działania.' },
  { id: 'jak-podniesc-dr', question: 'Jak podnieść Domain Rating?', answer: 'Zdobywając linki z serwisów, które same są mocne i powiązane z Twoją branżą: publikacje w mediach branżowych oparte na własnych danych, materiały, które inni chętnie cytują, wzmianki o firmie zamienione w linki i odzyskane linki do usuniętych podstron. Kupowanie masowych linków podnosi DR na chwilę i grozi karą Google.' },
  { id: 'dlaczego-dr-spadl', question: 'Dlaczego mój DR jest niższy niż w innym narzędziu albo niż miesiąc temu?', answer: 'Najczęściej z powodu DR4. Od 1 grudnia 2026 Ahrefs pokazuje nową wersję DR, która mocniej obniża domeny z linkami ze spamu, a starsze zestawienia i część narzędzi mogą jeszcze pokazywać poprzednią wersję. Drugi powód to utracone linki: gdy serwis usunie link do Ciebie albo zniknie, DR spada. DA Moz i Authority Score Semrush liczy się inaczej, więc ich wyniki nie są porównywalne z DR.' },
  { id: 'czy-dr-wplywa-na-pozycje', question: 'Czy DR wpływa na pozycje w Google?', answer: 'Google nie używa DR. To miara Ahrefs, która dobrze oddaje siłę linków prowadzących do domeny, a linki są jednym z czynników rankingu Google. DR jest więc wskaźnikiem, a nie przyczyną pozycji.' },
  { id: 'ile-domen', question: 'Ile domen mogę sprawdzić?', answer: `Do ${AUTORYTET.limitIp} domen dziennie z jednego adresu IP. Każda domena liczy się osobno: sprawdzenie własnej domeny z trzema konkurentami to cztery domeny. Pod wynikiem pokazujemy, ile sprawdzeń zostało na dziś.` },
  { id: 'czy-zapisujecie-wyniki', question: 'Czy zapisujecie wyniki?', answer: 'Wynik zapisujemy w naszym panelu, żeby liczyć dzienny limit i móc wysłać raport, o który poprosisz. Nie publikujemy go i nie budujemy z niego rankingów domen.' },
  { id: 'dr-a-widocznosc-w-ai', question: 'Czy DR ma znaczenie dla widoczności w AI?', answer: 'Modele AI nie używają DR. Te same działania, które podnoszą DR, czyli publikacje w mediach branżowych i wzmianki o marce, zwiększają jednak szansę, że ChatGPT czy Gemini wymienią Twoją firmę. Czy już to robią, sprawdzisz w naszym darmowym narzędziu do widoczności w AI.' },
];

export function AutorytetStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AutorytetEn />;
  return (
    <Uklad
      slug="autorytet-domeny"
      tag="Darmowe narzędzie"
      schema={{
        name: 'Sprawdzanie autorytetu domeny (Domain Rating)',
        description: 'Bezpłatne sprawdzenie Domain Rating (DR) z bazy Ahrefs: siła profilu linków domeny w skali 0-100 i porównanie z maksymalnie trzema konkurentami bez e-maila.',
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.pl),
        featureList: ['Domain Rating (DR) w skali 0-100 z bazy Ahrefs, wersja DR4', `Porównanie z maksymalnie ${AUTORYTET.konkurentow} konkurentami bez e-maila`, 'Opis poziomu i różnicy do najmocniejszego konkurenta', 'Raport z planem działania e-mailem', `Do ${AUTORYTET.limitIp} domen dziennie bez rejestracji`],
      }}
      lead="Domain Rating (DR) Twojej domeny w skali 0-100 i porównanie z maksymalnie trzema konkurentami w jednym kroku. Za darmo, bez rejestracji i bez e-maila."
      narzedzie={<AutorytetClient />}
      odpowiedz="Autorytet domeny to ocena siły profilu linków prowadzących do strony, w skali od 0 do 100. Narzędzie pokazuje Domain Rating (DR) z bazy Ahrefs, czyli najpopularniejszy odpowiednik Domain Authority (DA) z Moz. DR Twojej domeny i porównanie z maksymalnie trzema konkurentami widzisz od razu i za darmo, a e-mailem możesz dostać raport z planem działania."
      faq={FAQ_AUTORYTETU}
      tytulFaq="Pytania o autorytet domeny"
    >
      <CoDostajesz
        odRazu={[
          'Domain Rating (DR) Twojej domeny w skali 0-100, w nowej wersji DR4',
          'Porównanie z maksymalnie trzema konkurentami na jednym wykresie',
          'Poziom autorytetu i co on oznacza w praktyce',
          'Różnicę do najmocniejszego konkurenta i to, jak ją czytać',
          'Licznik sprawdzeń na dziś i link do wyniku do skopiowania',
        ]}
        poEmailu={[
          'Raport z wynikiem, porównaniem i datą sprawdzenia',
          'Plan działania w kolejności: od czego zacząć zdobywanie linków przy Twoim DR',
          'Jakich linków unikać, żeby nie ryzykować kary Google',
        ]}
        przypis="E-mail niczego nie odblokowuje na stronie: cały wynik widzisz bez niego. Każda wartość DR jest podpisana: Domain Rating by Ahrefs."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.pl}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Sprawdzanie autorytetu domeny: przykładowy wynik Domain Rating z porównaniem z trzema konkurentami na wykresie słupkowym"
            podpis="Przykładowy wynik na danych demonstracyjnych: domeny example.com, example.net, example.org i konkurent.example oraz ich wartości DR są przykładowe, a nie danymi Ahrefs dla prawdziwych stron. Wynik i porównanie z konkurentami widzisz bez e-maila; e-mailem wysyłamy raport z planem działania. Zrzut z 12.11.2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="co-to-jest-dr" tytul="Co to jest Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating to metryka Ahrefs, która porównuje profil linków danej domeny z profilami wszystkich domen w bazie Ahrefs. Liczą się unikalne domeny, które linkują do strony, i ich własna siła, a nie sama liczba linków. Wynik to liczba od 0 do 100.</p>
        <h3 style={s.h3}>Jak Ahrefs liczy DR</h3>
        <ol style={s.lista}>
          <li>Liczy unikalne domeny, z których do Twojej strony prowadzi co najmniej jeden link dofollow.</li>
          <li>Bierze pod uwagę DR tych domen: link z mocnego serwisu waży więcej niż ze słabego.</li>
          <li>Uwzględnia, do ilu domen linkuje każdy z tych serwisów: im więcej stron dostaje od niego linki, tym mniej przypada na każdą.</li>
          <li>Przelicza wynik na skalę 0-100. Skala jest logarytmiczna: przejście z DR 20 na 30 jest łatwiejsze niż z 60 na 70.</li>
        </ol>
        <p style={s.akapit}>DR nie uwzględnia ruchu, wieku domeny ani jakości treści. To wyłącznie miara profilu linków. Źródło: <a href={AHREFS_DR} {...zewn}>Ahrefs Help, „What is Domain Rating (DR)”</a>.</p>
        <h3 style={s.h3}>DR4: nowa wersja od 1 grudnia 2026</h3>
        <p style={s.akapit}>Od 1 grudnia 2026 Ahrefs pokazuje DR w nowej wersji (DR4), która mocniej obniża domeny z linkami ze spamu. Wynik może być więc niższy niż w starszych zestawieniach i narzędziach. W DR4 subdomeny, np. blog.firma.pl, mają własny DR, więc wpisz domenę, pod którą działa Twoja strona. Źródło: <a href={AHREFS_DR4} {...zewn}>Ahrefs, wpis o Domain Rating 4 z 5.11.2026</a>.</p>
        <p style={s.akapit}>Jak duża bywa ta zmiana, widać na naszej domenie: według danych Ahrefs z 11.11.2026 ai-seo-company.pl miała DR 54 w starej wersji i 19 w DR4. Dwie inne domeny z naszych pomiarów spadły z 53 do 0.</p>
        <p style={s.akapit}>Przy wyniku podajemy źródło wartości: Domain Rating by Ahrefs. Nie zapisujemy jej w żadnym rankingu.</p>
      </Sekcja>

      <Sekcja id="dr-da-authority-score" tytul="DR, DA i Authority Score: czym się różnią">
        <p style={s.akapit}>Trzy najpopularniejsze miary autorytetu domeny mają podobną skalę, ale liczą co innego:</p>
        <ul style={s.lista}>
          <li><strong>Domain Rating (DR), Ahrefs, 0-100:</strong> tylko linki, czyli domeny linkujące i ich siła. Od DR4 mocniej obniża domeny oznaczone jako spam.</li>
          <li><strong>Domain Authority (DA), Moz, 1-100:</strong> model uczenia maszynowego oparty głównie na danych o linkach, który przewiduje, jak domena wypada w wynikach Google. Ryzyko spamu Moz pokazuje osobno, jako Spam Score.</li>
          <li><strong>Authority Score (AS), Semrush, 0-100:</strong> łączy osiem sygnałów w trzech grupach: moc linków, ruch organiczny i sygnały spamu.</li>
        </ul>
        <p style={s.akapit}>Żadnej z tych miar nie używa Google. Ta sama domena ma w nich różne wyniki, bo każdy dostawca ma własną bazę linków i własny wzór. Porównuj więc domeny w jednej metryce, a przy kolejnych pomiarach trzymaj się tej samej. Nasze narzędzie podaje DR, bo Ahrefs udostępnia go za darmo, pod warunkiem podpisania każdej wartości.</p>
      </Sekcja>

      <Sekcja id="jak-czytac-wynik" tytul="Jak czytać wynik na tle konkurencji">
        <p style={s.akapit}>Sama liczba niewiele mówi. DR 25 może być mocnym wynikiem dla gabinetu w średnim mieście i słabym dla sklepu, który walczy o ogólnopolskie frazy. Dlatego narzędzie od razu porównuje Cię z maksymalnie trzema konkurentami, bez e-maila.</p>
        <h3 style={s.h3}>Kogo wpisać jako konkurenta</h3>
        <p style={s.akapit}>Firmy, które są w pierwszej dziesiątce Google na Twoje najważniejsze frazy, a nie największe marki z branży. Wpisz frazę, po której klienci Cię szukają, i weź domeny z pierwszych wyników, pomijając portale i katalogi. Jeśli konkurujesz lokalnie, porównuj się z firmami z tego samego miasta.</p>
        <h3 style={s.h3}>Poziomy DR w wyniku</h3>
        <ul style={s.lista}>
          <li><strong>0-9, bardzo niski:</strong> typowy dla nowych stron.</li>
          <li><strong>10-29, niski:</strong> zwykle wystarcza na frazy lokalne i niszowe.</li>
          <li><strong>30-49, średni:</strong> solidny profil linków.</li>
          <li><strong>50-69, wysoki:</strong> mocny profil linków.</li>
          <li><strong>70-100, bardzo wysoki:</strong> poziom dużych serwisów i marek.</li>
        </ul>
        <p style={s.przypis}>To nasza umowna skala do opisu wyniku, nie podział Ahrefs. Ustaliliśmy ją przed przejściem na DR4, więc traktuj ją orientacyjnie: rozstrzyga porównanie z konkurentami.</p>
        <h3 style={s.h3}>Jak opisujemy różnicę do najmocniejszego konkurenta</h3>
        <ul style={s.lista}>
          <li><strong>Masz najwyższy DR:</strong> pod względem linków te firmy Cię nie wyprzedzają. Przewagę budujesz treścią i linkami do stron, które mają sprzedawać.</li>
          <li><strong>Do 5 pkt różnicy:</strong> o pozycjach częściej decydują treść i dopasowanie strony do pytania niż sam profil linków.</li>
          <li><strong>Od 5 do 20 pkt:</strong> wyraźna przewaga konkurenta w linkach. Potrzebujesz linków z serwisów branżowych i mediów, nie tylko lepszej treści.</li>
          <li><strong>Ponad 20 pkt:</strong> skala jest logarytmiczna, więc to praca na miesiące. Zacznij od fraz, na które konkurent nie ma mocnych podstron.</li>
        </ul>
        <p style={s.przypis}>Progi 5 i 20 pkt też są nasze i orientacyjne. To punkt startu do decyzji o linkach, nie prognoza pozycji.</p>
      </Sekcja>

      <Sekcja id="jak-podniesc-autorytet-domeny" tytul="Jak podnieść autorytet domeny">
        <p style={s.akapit}>Kolejność poniżej pochodzi z naszego playbooka SEO, według którego pracujemy z klientami: od działań, które dają najwięcej przy najmniejszym ryzyku.</p>
        <h3 style={s.h3}>Taktyki w kolejności opłacalności</h3>
        <ol style={s.lista}>
          <li><strong>Digital PR na własnych danych.</strong> Raport, badanie albo zestawienie z danych firmy, zaproponowane mediom branżowym i ogólnym. Daje linki najwyższej jakości i wzmianki o marce, które liczą się też w odpowiedziach AI.</li>
          <li><strong>Materiały, do których linkuje się samo.</strong> Kalkulatory, narzędzia, zestawienia i szablony zdobywają linki bez wysyłania próśb.</li>
          <li><strong>Wzmianki bez linku.</strong> Znajdź strony, które piszą o Twojej firmie, ale nie linkują, i poproś o link. To najskuteczniejsza prośba w całym outreachu.</li>
          <li><strong>Odzyskiwanie linków.</strong> Linki, które prowadzą do stron z błędem 404, np. po zmianie strony, przekieruj na właściwe adresy albo poproś o poprawkę.</li>
          <li><strong>Publikacje gościnne i partnerstwa, ale wybiórczo.</strong> Tylko w serwisach, które mają prawdziwy ruch z Twojego tematu.</li>
        </ol>
        <p style={s.akapit}>Firmy lokalne mają dodatkowe źródła linków: sponsoring, lokalne media, organizacje branżowe i partnerów biznesowych. Profil firmy w Google i katalogi z identyczną nazwą, adresem i telefonem budują podstawę, choć same linki z nich są słabe.</p>
        <h3 style={s.h3}>Jak ocenić link, zanim go zdobędziesz</h3>
        <ul style={s.lista}>
          <li>Serwis ma ruch z Google na frazy z Twojej branży.</li>
          <li>Jest tematycznie powiązany z tym, co robisz.</li>
          <li>Link stoi w treści artykułu, a nie w stopce czy pasku bocznym.</li>
          <li>Serwis nie jest katalogiem, który sprzedaje linki każdemu.</li>
        </ul>
        <p style={s.akapit}>Unikaj zapleczy (PBN), masowych wymian i systemów wymiany linków oraz komentarzy na forach w dużej skali. Ryzyko kary jest realne, a wartość takich linków bliska zeru. Wysoki DR serwisu, który sprzedaje publikacje, też niczego nie gwarantuje: sprawdź go tutaj w DR4 i zobacz, czy ma prawdziwy ruch.</p>
        <h3 style={s.h3}>Co mierzyć</h3>
        <ul style={s.lista}>
          <li>Liczbę domen linkujących do stron, które mają sprzedawać, a nie do całego serwisu.</li>
          <li>Wzmianki o marce i liczbę wyszukiwań jej nazwy: to dobre przybliżenie autorytetu.</li>
          <li>Ruch z pozyskanych publikacji.</li>
        </ul>
        <p style={s.akapit}>DR sprawdzaj co kwartał, z tą samą listą konkurentów. Zmiany pojawiają się z opóźnieniem, bo Ahrefs musi najpierw znaleźć nowe linki.</p>
      </Sekcja>

      <Sekcja id="jak-uzyc-dr" tytul="Do czego użyć wyniku">
        <ul style={s.lista}>
          <li>Porównaj swój DR z firmami, które są w TOP 10 na Twoje najważniejsze frazy. Duża różnica oznacza, że sama treść może nie wystarczyć.</li>
          <li>Sprawdzaj DR co kwartał. Spadek zwykle oznacza utracone linki, np. po zamknięciu serwisu partnera.</li>
          <li>Przy wyborze miejsc na publikacje sprawdzaj DR serwisu: link z mocnej, powiązanej tematycznie strony jest wart więcej niż dziesiątki słabych.</li>
          <li>Po migracji strony albo zmianie domeny porównaj DR z wynikiem sprzed zmiany. Spadek to sygnał, że część linków prowadzi do nieistniejących adresów.</li>
        </ul>
      </Sekcja>

      <Sekcja id="czego-nie-pokazuje" tytul="Czego to narzędzie nie pokazuje">
        <ul style={s.lista}>
          <li><strong>Tylko DR.</strong> Darmowe dane Ahrefs, z których korzystamy, zawierają wyłącznie Domain Rating. Nie pokazujemy liczby linków, domen linkujących, udziału linków dofollow ani listy linków i nie zgadujemy tych liczb.</li>
          <li><strong>Domena, nie podstrona.</strong> DR opisuje całą domenę. O pozycji konkretnej podstrony decydują też linki do niej i jej treść.</li>
          <li><strong>Wskaźnik, nie przyczyna.</strong> Google nie używa DR. To miara Ahrefs, która dobrze oddaje siłę linków.</li>
          <li><strong>Stan z dnia sprawdzenia.</strong> Ahrefs aktualizuje DR na bieżąco, więc za miesiąc wynik może być inny.</li>
          <li><strong>Limit.</strong> Do {AUTORYTET.limitIp} domen dziennie z jednego adresu IP. Każdy konkurent liczy się jako jedna domena.</li>
        </ul>
        <p style={s.akapit}>Pełny profil linków, czyli kto do Ciebie linkuje, które linki są ryzykowne i czego brakuje względem konkurentów, analizujemy w ramach <Link href="/pozycjonowanie-stron-internetowych" style={s.podkreslenie}>pozycjonowania stron</Link>. Technikę i treść własnej strony sprawdzisz w <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>darmowym audycie SEO</Link>.</p>
      </Sekcja>

      <Poradniki pozycje={PORADNIKI_AUTORYTETU} />
      <PozostaleNarzedzia bez="/narzedzia/autorytet-domeny" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_AUTORYTETU_EN = [
  { id: 'dr-vs-da', question: 'How does DR differ from DA?', answer: 'Domain Rating (DR) is an Ahrefs metric and Domain Authority (DA) is a Moz metric. Both rate the strength of a domain on a scale up to 100, but they are calculated from different link databases with different formulas, so the same domain has a different DR and a different DA. Compare domains using one metric.' },
  { id: 'what-is-a-good-dr', question: 'What is a good DR?', answer: 'It depends on your competitors. For local services a low DR is often enough because competitors have few links too, while for nationwide e-commerce keywords competitors usually have much more. A good DR is one that does not fall behind the companies in Google’s top 10 for your keywords. That is why the comparison with up to three competitors is free in this tool.' },
  { id: 'comparison-without-email', question: 'Does the competitor comparison require an email?', answer: 'No. You see your domain’s DR and the comparison with up to three competitors right away, with no sign-up and no email. You only need an email if you want the report with an action plan.' },
  { id: 'how-to-raise-domain-rating', question: 'How do I raise Domain Rating?', answer: 'By earning links from sites that are strong themselves and related to your industry: trade media coverage based on your own data, resources that others like to cite, mentions of your company turned into links, and recovered links to deleted pages. Buying links in bulk raises DR for a moment and risks a Google penalty.' },
  { id: 'why-is-my-dr-lower', question: 'Why is my DR lower than in another tool or than last month?', answer: 'Most often because of DR4. From 1 December 2026 Ahrefs shows a new version of DR, which lowers domains with spam links much more, while older reports and some tools may still show the previous version. The second reason is lost links: when a site removes its link to you or disappears, DR drops. Moz’s DA and Semrush’s Authority Score are calculated differently, so their results are not comparable with DR.' },
  { id: 'does-dr-affect-google-rankings', question: 'Does DR affect Google rankings?', answer: 'Google does not use DR. It is an Ahrefs measure that reflects well the strength of the links pointing to a domain, and links are one of Google’s ranking factors. So DR is an indicator, not the cause of a ranking.' },
  { id: 'how-many-domains', question: 'How many domains can I check?', answer: `Up to ${AUTORYTET.limitIp} domains per day from one IP address. Each domain counts separately: checking your own domain with three competitors uses four. Below the result we show how many checks you have left today.` },
  { id: 'do-you-store-results', question: 'Do you store the results?', answer: 'We store the result in our panel to count the daily limit and to send the report you ask for. We do not publish it and we do not build domain rankings from it.' },
  { id: 'dr-and-ai-visibility', question: 'Does DR matter for AI visibility?', answer: 'AI models do not use DR. But the same work that raises DR, coverage in trade media and brand mentions, makes it more likely that ChatGPT or Gemini will name your business. You can check whether they already do with our free AI visibility tool.' },
];

function AutorytetEn() {
  return (
    <Uklad
      locale="en"
      slug="autorytet-domeny"
      tag="Free tool"
      schema={{
        name: 'Domain authority checker (Domain Rating)',
        description: 'A free check of Domain Rating (DR) from the Ahrefs database: the strength of a domain’s link profile on a 0-100 scale, with a comparison against up to three competitors and no email needed.',
        category: 'BusinessApplication',
        screenshot: schemaZrzutu(ZRZUT.en),
        featureList: ['Domain Rating (DR) on a 0-100 scale from the Ahrefs database, DR4 version', `A comparison with up to ${AUTORYTET.konkurentow} competitors, no email needed`, 'A description of your level and your gap to the strongest competitor', 'A report with an action plan by email', `Up to ${AUTORYTET.limitIp} domains per day, no sign-up`],
      }}
      lead="Your domain’s Domain Rating (DR) on a 0-100 scale and a comparison with up to three competitors in one step. Free, with no sign-up and no email."
      narzedzie={<AutorytetClient />}
      odpowiedz="Domain authority is a rating of the strength of the link profile pointing to a website, on a scale from 0 to 100. The tool shows Domain Rating (DR) from the Ahrefs database, the most popular counterpart of Moz’s Domain Authority (DA). You see your domain’s DR and the comparison with up to three competitors right away and for free, and you can get a report with an action plan by email."
      faq={FAQ_AUTORYTETU_EN}
      tytulFaq="Questions about domain authority"
    >
      <CoDostajesz
        locale="en"
        odRazu={[
          'Your domain’s Domain Rating (DR) on a 0-100 scale, in the new DR4 version',
          'A comparison with up to three competitors on one chart',
          'Your authority level and what it means in practice',
          'Your gap to the strongest competitor and how to read it',
          'A counter of today’s checks and a link to the result you can copy',
        ]}
        poEmailu={[
          'A report with the result, the comparison and the check date',
          'An action plan in order: where to start earning links at your DR',
          'Which links to avoid so that you do not risk a Google penalty',
        ]}
        przypis="The email does not unlock anything on the page: you see the whole result without it. Every DR value is credited: Domain Rating by Ahrefs."
      >
        <div style={{ maxWidth: '640px', margin: '1.5rem auto 0' }}>
          <ZrzutWyniku
            {...ZRZUT.en}
            sizes="(max-width: 700px) 100vw, 640px"
            alt="Domain authority checker: an example Domain Rating result compared with three competitors on a bar chart"
            podpis="An example result using demo data: the domains example.com, example.net, example.org and competitor.example and their DR values are illustrative, not Ahrefs data for real websites. You see the result and the competitor comparison without an email; by email we send a report with an action plan. Screenshot from November 12, 2026."
          />
        </div>
      </CoDostajesz>

      <Sekcja id="what-is-domain-rating" tytul="What is Domain Rating (DR)">
        <p style={s.akapit}>Domain Rating is an Ahrefs metric that compares a domain’s link profile with the profiles of all domains in the Ahrefs database. What counts is the unique domains linking to a site and their own strength, not the raw number of links. The result is a number from 0 to 100.</p>
        <h3 style={s.h3}>How Ahrefs calculates DR</h3>
        <ol style={s.lista}>
          <li>It counts the unique domains with at least one dofollow link to your site.</li>
          <li>It takes the DR of those domains into account: a link from a strong site weighs more than one from a weak site.</li>
          <li>It considers how many domains each of those sites links to: the more sites get links from it, the less each one receives.</li>
          <li>It converts the result to a 0-100 scale. The scale is logarithmic: moving from DR 20 to 30 is easier than from 60 to 70.</li>
        </ol>
        <p style={s.akapit}>DR does not take traffic, domain age or content quality into account. It measures the link profile only. Source: <a href={AHREFS_DR} {...zewn}>Ahrefs Help, “What is Domain Rating (DR)”</a>.</p>
        <h3 style={s.h3}>DR4: the new version from 1 December 2026</h3>
        <p style={s.akapit}>From 1 December 2026 Ahrefs shows DR in a new version (DR4), which lowers domains with spam links much more. The result may therefore be lower than in older reports and tools. In DR4 subdomains such as blog.company.com get their own DR, so enter the domain your website runs on. Source: <a href={AHREFS_DR4} {...zewn}>Ahrefs, the Domain Rating 4 post of 5 November 2026</a>.</p>
        <p style={s.akapit}>Our own domain shows how big the change can be: according to Ahrefs data from 11 November 2026, ai-seo-company.pl had DR 54 in the old version and 19 in DR4. Two other domains we measured fell from 53 to 0.</p>
        <p style={s.akapit}>Next to the result we name the source of the value: Domain Rating by Ahrefs. We do not store it in any ranking.</p>
      </Sekcja>

      <Sekcja id="dr-da-authority-score" tytul="DR, DA and Authority Score: how they differ">
        <p style={s.akapit}>The three most popular domain authority metrics use a similar scale but measure different things:</p>
        <ul style={s.lista}>
          <li><strong>Domain Rating (DR), Ahrefs, 0-100:</strong> links only, that is linking domains and their strength. From DR4 it lowers domains labelled as spam much more.</li>
          <li><strong>Domain Authority (DA), Moz, 1-100:</strong> a machine learning model based mainly on link data that predicts how a domain performs in Google results. Moz shows spam risk separately, as Spam Score.</li>
          <li><strong>Authority Score (AS), Semrush, 0-100:</strong> combines eight signals in three groups: link power, organic traffic and spam signals.</li>
        </ul>
        <p style={s.akapit}>Google uses none of these metrics. The same domain gets different results in each, because every provider has its own link database and its own formula. So compare domains using one metric and stick to it in later checks. Our tool shows DR because Ahrefs offers it for free, provided every value is credited.</p>
      </Sekcja>

      <Sekcja id="how-to-read-the-result" tytul="How to read the result against competitors">
        <p style={s.akapit}>The number alone says little. DR 25 can be a strong result for a clinic in a mid-sized city and a weak one for a shop competing for nationwide keywords. That is why the tool compares you with up to three competitors right away, with no email.</p>
        <h3 style={s.h3}>Who to enter as a competitor</h3>
        <p style={s.akapit}>The companies in Google’s top 10 for your most important keywords, not the biggest brands in your industry. Search for the phrase customers use to find you and take the domains from the first results, skipping portals and directories. If you compete locally, compare yourself with companies in the same city.</p>
        <h3 style={s.h3}>DR levels in the result</h3>
        <ul style={s.lista}>
          <li><strong>0-9, very low:</strong> typical of new websites.</li>
          <li><strong>10-29, low:</strong> usually enough for local and niche keywords.</li>
          <li><strong>30-49, medium:</strong> a solid link profile.</li>
          <li><strong>50-69, high:</strong> a strong link profile.</li>
          <li><strong>70-100, very high:</strong> the level of large websites and brands.</li>
        </ul>
        <p style={s.przypis}>This is our own scale for describing the result, not an Ahrefs classification. We set it before the switch to DR4, so treat it as a guide: the comparison with competitors is what decides.</p>
        <h3 style={s.h3}>How we describe your gap to the strongest competitor</h3>
        <ul style={s.lista}>
          <li><strong>You have the highest DR:</strong> on links these companies are not ahead of you. You build an edge with content and with links to the pages that sell.</li>
          <li><strong>A gap of up to 5 points:</strong> content and how well a page matches the question decide rankings more often than the link profile.</li>
          <li><strong>5 to 20 points:</strong> a clear advantage in links for the competitor. You need links from industry sites and media, not only better content.</li>
          <li><strong>More than 20 points:</strong> the scale is logarithmic, so this takes months. Start with keywords for which the competitor has no strong pages.</li>
        </ul>
        <p style={s.przypis}>The 5 and 20 point thresholds are also ours and approximate. They are a starting point for decisions about links, not a ranking forecast.</p>
      </Sekcja>

      <Sekcja id="how-to-increase-domain-authority" tytul="How to increase domain authority">
        <p style={s.akapit}>The order below comes from our SEO playbook, which we follow with clients: from the actions that bring the most at the lowest risk.</p>
        <h3 style={s.h3}>Tactics in order of return</h3>
        <ol style={s.lista}>
          <li><strong>Digital PR based on your own data.</strong> A report, study or ranking from company data, offered to trade and general media. It brings the highest quality links and brand mentions, which also count in AI answers.</li>
          <li><strong>Resources that earn links on their own.</strong> Calculators, tools, benchmarks and templates earn links without outreach.</li>
          <li><strong>Unlinked mentions.</strong> Find pages that mention your company without linking to it and ask for a link. It is the most effective request in all outreach.</li>
          <li><strong>Link recovery.</strong> Redirect links that point to 404 pages, for example after a redesign, to the right addresses, or ask for a correction.</li>
          <li><strong>Guest posts and partnerships, but selectively.</strong> Only on sites with real traffic on your topic.</li>
        </ol>
        <p style={s.akapit}>Local businesses have extra link sources: sponsorships, local media, trade organisations and business partners. A Google Business Profile and directories with an identical name, address and phone number build the base, although the links from them are weak.</p>
        <h3 style={s.h3}>How to judge a link before you get it</h3>
        <ul style={s.lista}>
          <li>The site gets Google traffic for keywords from your industry.</li>
          <li>It is related to what you do.</li>
          <li>The link sits in the body of an article, not in the footer or sidebar.</li>
          <li>The site is not a directory that sells links to anyone.</li>
        </ul>
        <p style={s.akapit}>Avoid link networks (PBN), mass link exchanges and link exchange systems, and forum comments at scale. The risk of a penalty is real and the value of such links is close to zero. A high DR on a site that sells posts guarantees nothing either: check it here in DR4 and see whether it has real traffic.</p>
        <h3 style={s.h3}>What to measure</h3>
        <ul style={s.lista}>
          <li>The number of domains linking to the pages that sell, not to the whole site.</li>
          <li>Brand mentions and searches for your company name: a good proxy for authority.</li>
          <li>Traffic from the publications you earned.</li>
        </ul>
        <p style={s.akapit}>Check DR every quarter with the same list of competitors. Changes show up with a delay, because Ahrefs first has to find the new links.</p>
      </Sekcja>

      <Sekcja id="how-to-use-the-result" tytul="How to use the result">
        <ul style={s.lista}>
          <li>Compare your DR with companies that rank in the top 10 for your most important keywords. A big gap means content alone may not be enough.</li>
          <li>Check DR every quarter. A drop usually means lost links, for example after a partner’s site shuts down.</li>
          <li>When choosing places to publish, check the site’s DR: a link from a strong, thematically related site is worth more than dozens of weak ones.</li>
          <li>After a website migration or a domain change, compare DR with the result from before. A drop signals that some links point to addresses that no longer exist.</li>
        </ul>
      </Sekcja>

      <Sekcja id="what-the-tool-does-not-show" tytul="What this tool does not show">
        <ul style={s.lista}>
          <li><strong>DR only.</strong> The free Ahrefs data we use contains Domain Rating only. We do not show the number of links, linking domains, the share of dofollow links or a list of links, and we do not guess these numbers.</li>
          <li><strong>A domain, not a page.</strong> DR describes the whole domain. The ranking of a specific page also depends on the links to it and its content.</li>
          <li><strong>An indicator, not a cause.</strong> Google does not use DR. It is an Ahrefs measure that reflects the strength of links well.</li>
          <li><strong>The state on the day of the check.</strong> Ahrefs updates DR continuously, so the result may be different in a month.</li>
          <li><strong>A limit.</strong> Up to {AUTORYTET.limitIp} domains per day from one IP address. Each competitor counts as one domain.</li>
        </ul>
        <p style={s.akapit}>We analyse the full link profile, that is who links to you, which links are risky and what you lack compared with competitors, as part of our <Link href="/pozycjonowanie-stron-internetowych" style={s.podkreslenie}>SEO services</Link>. You can check the technical side and content of your own website in the <Link href="/narzedzia/audyt-seo" style={s.podkreslenie}>free SEO audit</Link>.</p>
      </Sekcja>

      <Poradniki pozycje={PORADNIKI_AUTORYTETU} locale="en" />
      <PozostaleNarzedzia bez="/narzedzia/autorytet-domeny" locale="en" />
    </Uklad>
  );
}
