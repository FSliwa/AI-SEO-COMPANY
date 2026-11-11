// S1 /narzedzia/raport-seo (PLAN-v2 6.11; brief S1; CB-07, CB-08, CB-17; 5.11.2026).
// Komponent serwerowy. Partia 3 (W9) z dodatkowym warunkiem: endpoint /api/wzor-raportu w repo
// panelu (osobna zgoda) - do tego czasu strona zostaje za bramką lib/publikacja.js.
// - title (55), meta (135), H1 (51), Krótka odpowiedź (54 słowa) z 6.11,
// - ramka „Szukasz darmowego raportu SEO…” -> /audyt-seo; sprawdzarka bez <a> do T0.2 (CB-07),
//   /audyt-seo nie oferuje darmowego audytu, więc ramka mówi „to audyt, cena na stronie audytu”,
// - 5 sekcji z zał. E playbooka (5 × H3), tabela 6 metryk, przykład z demo panelu (dane
//   przykładowe), 6 czerwonych flag, formularz wzoru PDF (ChecklistForm, plan 'wzor_raportu_seo',
//   kategoria 'Template'; generate_lead dostaje page_type 'szablon' z lib/track.js),
// 9.11.2026: prop locale ('pl' domyślnie | 'en'); wersja EN to osobna funkcja RaportEn (PL bez zmian).
// - schema: Article + hasPart DigitalDocument (bez url: PDF idzie e-mailem i nie jest plikiem
//   publicznym) + FAQPage (AppleFaq) + BreadcrumbList przez /narzedzia (Breadcrumbs z parent).

import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';
import Byline from '@/components/Byline';
import AnswerBox from '@/components/AnswerBox';
import CompareTable from '@/components/CompareTable';
import ChecklistForm from '@/components/ChecklistForm';
import ArticleSchema from '@/components/ArticleSchema';
import AppleFaq from '@/components/service/AppleFaq';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import { hash } from '@/lib/anchors';
import { LASTMOD } from '@/lib/lastmod';
import { PANEL_DEMO_URL } from '@/lib/panel';
import { hrefJesliOpublikowana, wpisPublikacji } from '@/lib/publikacja';
import { BASE, ENDPOINT_WZORU_RAPORTU, RODZIC_OKRUSZKOW, faqRaportu, hrefSprawdzarki, stronaNarzedzia } from '@/lib/narzedzia';
import { STRONY_NARZEDZI_EN, faqRaportuEn } from '@/lib/narzedziaGeneratorRaport.en';
import { wpisEn } from '@/lib/stronyEn';
import * as s from './styl';

const SCIEZKA = '/narzedzia/raport-seo';

const RAPORT_A_AUDYT = [
  { cecha: 'Na jakie pytanie odpowiada', raport: 'Co dało pozycjonowanie w tym miesiącu i co dalej', audyt: 'Co jest nie tak ze stroną i co poprawić' },
  { cecha: 'Jak często', raport: 'Regularnie, zwykle co miesiąc', audyt: 'Jednorazowo: na starcie albo po przebudowie strony' },
  { cecha: 'Co jest w środku', raport: 'Wynik, przyczyny zmian, wykonane prace, plan, ryzyka', audyt: 'Błędy techniczne, treści, linki, konkurencja' },
  { cecha: 'Wynik', raport: 'Ocena pracy agencji', audyt: 'Lista zmian z priorytetami' },
];

// Tabela z briefu S1 (gotowa, CB-17).
const METRYKI = [
  { metryka: 'Zapytania z Google (formularz, telefon, e-mail) i koszt jednego zapytania', zrodlo: 'GA4 (zdarzenia kluczowe), faktury', jak: 'Główny wynik miesiąca', pulapka: 'Bez skonfigurowanych zdarzeń kluczowych tej liczby nie ma' },
  { metryka: 'Kliknięcia i wyświetlenia bez zapytań o markę', zrodlo: 'Google Search Console', jak: 'Trend rok do roku', pulapka: 'Zapytania o markę zawyżają wynik' },
  { metryka: 'Pozycje fraz z uzgodnionej listy', zrodlo: 'Search Console albo tracker pozycji', jak: 'Udział fraz w TOP 3 i TOP 10', pulapka: 'Średnia pozycja myli przy dużej liczbie fraz' },
  { metryka: 'Pozycja wizytówki w Mapach', zrodlo: 'Pomiar z 49 punktów (siatka 7×7)', jak: 'Odsetek punktów w TOP 3', pulapka: 'Jeden pomiar z biura to przypadek' },
  { metryka: 'Widoczność w ChatGPT i przeglądach AI', zrodlo: 'Stały zestaw pytań klientów co tydzień', jak: 'Odsetek odpowiedzi z nazwą firmy', pulapka: 'Jedno pytanie nic nie dowodzi' },
  { metryka: 'Zdobyte linki', zrodlo: 'Lista z adresem, datą i stanem', jak: 'Czy link nadal jest na stronie', pulapka: 'Liczba linków bez ich jakości' },
];

const FLAGI = [
  ['Brak liczby zapytań od klientów', 'Raport mówi o ruchu i pozycjach, ale nie o tym, ilu klientów się zgłosiło. Bez zdarzeń kluczowych w GA4 nikt nie wie, czy pozycjonowanie zarabia.'],
  ['Pozycje bez listy fraz uzgodnionej na starcie', 'Agencja pokazuje frazy, na które strona już jest wysoko, a nie te, które ustaliliście. Z takich fraz łatwo zbudować wzrost bez znaczenia dla sprzedaży.'],
  ['„Widoczność” bez definicji i źródła', 'Wykresu widoczności bez nazwy narzędzia, metody i listy fraz nie sprawdzisz ani nie porównasz z poprzednim okresem.'],
  ['Brak listy wykonanych prac z datami', 'Jeśli nie wiesz, co zrobiono i kiedy, nie powiążesz zmiany wyniku z pracą agencji ani z niczym innym.'],
  ['Brak porównania rok do roku', 'Wzrost miesiąc do miesiąca w sezonie to często kalendarz, a nie efekt pozycjonowania.'],
  ['Dane tylko w PDF', 'Raport nie zastąpi dostępu do Search Console i Analytics na Twoim koncie. Bez niego po zakończeniu umowy zostajesz bez historii danych.'],
];

const obraz = { width: '100%', height: 'auto', display: 'block', borderRadius: '20px', boxShadow: '0 24px 60px rgba(15, 23, 42, 0.14)' };

export default function SzablonRaport({ locale = 'pl' }) {
  if (locale === 'en') return <RaportEn />;
  const strona = stronaNarzedzia('raport-seo');
  const wpis = wpisPublikacji(SCIEZKA);
  const sprawdzarka = hrefSprawdzarki();
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');
  const kontakt = hash('kontakt', 'pl');
  const dataZmiany = LASTMOD[`${BASE}${SCIEZKA}`];

  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={strona.okruszek} parent={RODZIC_OKRUSZKOW} />
      <ArticleSchema
        type="Article"
        breadcrumb={null}
        url={SCIEZKA}
        title={strona.h1}
        description={wpis?.opis}
        datePublished={strona.opublikowano ?? dataZmiany}
        dateModified={dataZmiany}
        imageUrl="/images/panel/raporty.webp"
        extra={{
          hasPart: {
            '@type': 'DigitalDocument',
            name: 'Wzór miesięcznego raportu SEO (PDF)',
            encodingFormat: 'application/pdf',
            isAccessibleForFree: true,
          },
        }}
      />

      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Poradnik i wzór PDF
            </div>
            <h1 style={s.h1}>{strona.h1}</h1>
          </Reveal>
          <Byline sciezka={SCIEZKA} style={{ textAlign: 'center' }} />
          <AnswerBox>
            Miesięczny raport SEO powinien zaczynać się od wyniku biznesowego, czyli liczby zapytań od klientów i ich kosztu, a dopiero potem pokazywać kliknięcia, pozycje i wykonane prace. Dobry raport mieści syntezę na jednej stronie: wynik względem celu, 3–5 przyczyn z dowodami, plan na kolejny miesiąc i ryzyka. Szczegółowe dane trzymaj w panelu albo dashboardzie.
          </AnswerBox>

          <aside aria-label="Darmowa ocena strony" style={{ ...s.karta, padding: 'clamp(1.1rem, 3vw, 1.5rem)', background: '#FFF7F2', boxShadow: 'none', border: '1px solid rgba(216, 90, 48, 0.25)' }}>
            <p style={{ ...s.akapit, fontWeight: 700, color: 'var(--color-text-dark)', margin: '0 0 0.4rem' }}>Szukasz darmowego raportu SEO swojej strony?</p>
            <p style={{ ...s.akapit, margin: 0 }}>
              Ocena samej strony to audyt, a nie raport. Raport pokazuje efekty pracy agencji w danym miesiącu, a audyt jednorazowo diagnozuje stronę i kończy się listą poprawek. Co obejmuje i ile kosztuje, piszemy na stronie{' '}
              <Link href="/audyt-seo" style={s.podkreslenie}>audyt SEO</Link>.
              {sprawdzarka ? (
                <>
                  {' '}Za darmo możesz od razu{' '}
                  <Link href={sprawdzarka} style={s.podkreslenie}>sprawdzić widoczność firmy w ChatGPT</Link>.
                </>
              ) : null}
            </p>
          </aside>

          <section aria-labelledby="raport-a-audyt" style={s.sekcja}>
            <h2 id="raport-a-audyt" style={s.h2}>Raport SEO a audyt SEO: dwa różne dokumenty</h2>
            <p style={s.akapit}>
              Raport i audyt mylą się nawet w ofertach agencji, choć odpowiadają na inne pytania. Raport SEO powstaje regularnie przez cały czas współpracy i pokazuje, ile przyszło zapytań, skąd wzięły się zmiany i co zespół zrobi w kolejnym miesiącu. Audyt to diagnoza wykonywana raz, na starcie albo po dużej zmianie, np. przebudowie serwisu.
            </p>
            <CompareTable
              id="tabela-raport-audyt"
              caption="Raport SEO i audyt SEO w czterech punktach"
              columns={[
                { key: 'cecha', label: 'Cecha' },
                { key: 'raport', label: 'Raport SEO' },
                { key: 'audyt', label: 'Audyt SEO' },
              ]}
              rows={RAPORT_A_AUDYT.map((r) => ({ ...r, id: r.cecha }))}
            />
            <p style={s.akapit}>
              Dobry raport odwołuje się do audytu: pokazuje, które poprawki z listy już wdrożono i co dały. Jeśli co miesiąc dostajesz tę samą listę błędów, to nie jest raport z pracy, tylko powtarzany audyt.
            </p>
            <p style={s.akapit}>
              Oba dokumenty się uzupełniają. Audyt na starcie daje listę zadań na pierwsze miesiące, a kolejne raporty pokazują, jak ta lista się skraca i co to zmienia w ruchu i zapytaniach. Bez audytu agencja nie ma planu, z którym raport mógłby się porównać.
            </p>
          </section>

          <section aria-labelledby="piec-sekcji" style={s.sekcja}>
            <h2 id="piec-sekcji" style={s.h2}>5 sekcji dobrego raportu miesięcznego</h2>
            <p style={s.akapit}>
              Układ pochodzi ze struktury raportu miesięcznego z naszego playbooka SEO. Pierwsza strona to synteza, a wykresy i tabele fraz idą do załącznika albo panelu. Podobnie jest zbudowany komentarz miesięczny w naszym panelu klienta (przykład niżej).
            </p>

            <h3 id="sekcja-wynik" style={s.h3}>1. Wynik względem celu</h3>
            <p style={s.akapit}>
              Raport zaczyna się od liczby, na której zależy firmie: zwykle zapytań od klientów z wyników organicznych (formularz, telefon, e-mail) i kosztu jednego zapytania. Obok stoi cel na miesiąc i ten sam miesiąc rok wcześniej. Porównanie rok do roku odsiewa sezonowość: słabszy grudzień nie oznacza spadku, jeśli jest lepszy od zeszłorocznego. Wystarczą trzy zdania: jaki był wynik, jak wypada względem celu i w którą stronę idzie trend. Jeśli firma nie mierzy zapytań, pierwszy raport powinien to wskazać jako ryzyko i zaproponować konfigurację zdarzeń kluczowych w GA4.
            </p>

            <h3 id="sekcja-przyczyny" style={s.h3}>2. Co wpłynęło na wynik</h3>
            <p style={s.akapit}>
              Tu agencja podaje 3–5 przyczyn zmian, każdą z dowodem. Dowodem jest zrzut z Google Search Console z zaznaczoną datą, data wdrożenia zmiany na stronie albo aktualizacja algorytmu potwierdzona przez Google. Zdanie „pozycje wzrosły dzięki optymalizacji” bez daty i adresu strony niczego nie wyjaśnia. Dobra przyczyna mówi, co się zmieniło, kiedy i na których podstronach, np. „nowa sekcja z cenami na stronie usługi, wdrożona w połowie miesiąca; od tego dnia rosną kliknięcia z fraz o cenę”.
            </p>

            <h3 id="sekcja-prace" style={s.h3}>3. Wykonane prace i ich efekt</h3>
            <p style={s.akapit}>
              Lista prac z datami: nowe treści, poprawki techniczne, zdobyte linki, zmiany w wizytówce Google. Przy każdej pozycji warto wskazać podstronę, której dotyczy, i to, czy widać już efekt. Same nazwy zadań, np. „optymalizacja on-page”, nie wystarczą: z raportu ma wynikać, co dokładnie zmieniono. Jeśli rozliczasz się za godziny, raport powinien je podawać. Na takie informacje nie trzeba czekać do końca miesiąca: u nas{' '}
              <Link href="/panel-klienta" style={s.podkreslenie}>raport i dane w panelu klienta</Link>{' '}
              są dostępne codziennie, razem z dziennikiem prac.
            </p>

            <h3 id="sekcja-plan" style={s.h3}>4. Plan na kolejny miesiąc</h3>
            <p style={s.akapit}>
              Trzy najważniejsze zadania na następny miesiąc, wybrane z listy wszystkich zaplanowanych prac. Przy każdym: czego dotyczy, jaki efekt ma dać i po czym go poznasz. Plan z jednym punktem „dalsza optymalizacja” nie daje Ci nic do sprawdzenia. Dobry plan pozwala w kolejnym raporcie porównać zapowiedzi z wykonaniem.
            </p>

            <h3 id="sekcja-ryzyka" style={s.h3}>5. Ryzyka i potrzeby</h3>
            <p style={s.akapit}>
              Rzeczy, które mogą zatrzymać wyniki, i to, czego agencja potrzebuje od Ciebie: dostęp do strony albo programisty, akceptacja treści, budżet na artykuły, odpowiedzi na pytania o ofertę. Tu trafiają też zmiany poza kontrolą agencji, np. nowy konkurent w Mapach. Sekcja ryzyk chroni obie strony, bo problem zgłoszony w raporcie nikogo nie zaskoczy za trzy miesiące.
            </p>
          </section>

          <section aria-labelledby="metryki" style={s.sekcja}>
            <h2 id="metryki" style={s.h2}>Jakie metryki pokazać i skąd je wziąć</h2>
            <p style={s.akapit}>
              Każda liczba w raporcie powinna mieć źródło, które możesz otworzyć sam, najlepiej na koncie założonym na Twój adres e-mail. Tabela zbiera sześć metryk, które pozwalają ocenić pozycjonowanie, i pułapki, przez które wynik łatwo pokazać lepszym, niż jest.
            </p>
            <CompareTable
              id="tabela-metryk"
              caption="Metryki miesięcznego raportu SEO"
              columns={[
                { key: 'metryka', label: 'Metryka' },
                { key: 'zrodlo', label: 'Źródło' },
                { key: 'jak', label: 'Jak czytać' },
                { key: 'pulapka', label: 'Pułapka' },
              ]}
              rows={METRYKI.map((m) => ({ ...m, id: m.metryka }))}
            />
            <p style={s.akapit}>
              Zapytania o markę odfiltrujesz w raporcie Skuteczność w Search Console: dodaj filtr zapytań, które nie zawierają nazwy firmy i jej wariantów, także tych z literówkami. Ruch z marki rośnie razem z rozpoznawalnością, reklamą i poleceniami, więc mówi niewiele o pracy nad pozycjonowaniem.
            </p>
            <p style={s.akapit}>
              Listę fraz do śledzenia warto ustalić przed startem. Powinny się na niej znaleźć frazy, którymi klienci szukają Twoich usług, a nie tylko te, na które strona już jest widoczna. Każdą zmianę listy w trakcie współpracy raport powinien odnotować.
            </p>
            <p style={s.akapit}>
              Metryki z Map i z odpowiedzi AI rzadko trafiają do raportów agencji, a dotyczą miejsc, w których klienci też szukają firm. Klient widzi inne wyniki w Mapach Google zależnie od tego, gdzie stoi, dlatego pozycję wizytówki mierzy się w siatce punktów wokół adresu firmy, a nie z jednego miejsca. Odpowiedzi ChatGPT zmieniają się z dnia na dzień, więc widoczność w AI mierzy się stałym zestawem pytań zadawanych regularnie. Jak to robimy, opisujemy na stronie{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>pozycjonowanie w AI</Link> : 'pozycjonowanie w AI'}.
            </p>
          </section>

          <section aria-labelledby="przyklad-z-panelu" style={s.sekcja}>
            <h2 id="przyklad-z-panelu" style={s.h2}>Przykład: tak wygląda raport w panelu klienta</h2>
            <p style={s.akapit}>
              Dwa ekrany z demo naszego panelu klienta, na danych przykładowych fikcyjnej firmy „Stolarnia Demo”. Na przeglądzie miesiąca komentarz opiekuna ma trzy części: co się stało, dlaczego i co dalej, czyli sekcje 1, 2 i 4 wzoru. Kafelki pod komentarzem pokazują wynik względem celu: zapytania od klientów z podziałem na formularz, telefon i e-mail, kliknięcia z Google, frazy w TOP 3 i średnią pozycję. Pierwsza liczba to zapytania od klientów, a nie pozycje czy ruch: tak samo powinien zaczynać się każdy raport.
            </p>
            <figure style={{ margin: '0 0 2rem' }}>
              <Image
                src="/images/panel/przeglad.webp"
                alt="Przegląd miesiąca w demo panelu klienta: komentarz opiekuna w trzech częściach i kafelki z zapytaniami od klientów, kliknięciami z Google, frazami w TOP 3 i średnią pozycją"
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 860px"
                style={obraz}
              />
              <figcaption style={s.przypis}>Przegląd miesiąca w panelu klienta. Dane przykładowe.</figcaption>
            </figure>
            <p style={s.akapit}>
              W zakładce Raporty leżą raporty miesięczne w PDF i audyt startowy. PDF powtarza to, co widać w panelu, i dochodzi do niego komentarz zespołu. Raport nie jest więc jedynym miejscem z danymi: liczby sprawdzisz w każdej chwili, bez czekania na koniec miesiąca.
            </p>
            <figure style={{ margin: '0 0 1.5rem' }}>
              <Image
                src="/images/panel/raporty.webp"
                alt="Zakładka Raporty w demo panelu klienta: lista raportów miesięcznych PDF z liczbą zapytań i kliknięć oraz audyt startowy, każdy z przyciskiem pobrania"
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 860px"
                style={obraz}
              />
              <figcaption style={s.przypis}>Lista raportów PDF w panelu klienta. Dane przykładowe.</figcaption>
            </figure>
            <p style={s.akapit}>
              <a href={PANEL_DEMO_URL} style={s.podkreslenie} data-cta="raport_demo">Otwórz demo panelu bez logowania</a> i przejdź do zakładek Przegląd i Raporty.
            </p>
          </section>

          <section aria-labelledby="czerwone-flagi" style={s.sekcja}>
            <h2 id="czerwone-flagi" style={s.h2}>Czerwone flagi w raportach agencji SEO</h2>
            <p style={s.akapit}>
              Sześć sygnałów, że raport ukrywa brak wyników albo brak pracy. Jeden to powód do pytań. Kilka naraz to powód do rozmowy o zmianie agencji. Część z nich wynika z wygody, a nie ze złej woli: łatwiej przesłać eksport z narzędzia niż napisać komentarz. Zacznij więc od rozmowy i poproś o raport według wzoru, który znajdziesz niżej.
            </p>
            <ol style={s.lista}>
              {FLAGI.map(([tytul, opis]) => (
                <li key={tytul}><strong style={{ color: 'var(--color-text-dark)' }}>{tytul}.</strong> {opis}</li>
              ))}
            </ol>
            <p style={s.akapit}>
              Rozpoznajesz kilka z nich u siebie? Przeczytaj,{' '}
              <Link href="/zmiana-agencji-seo" style={s.podkreslenie}>jak zmienić agencję SEO bez utraty pozycji</Link>, i zabierz dane, zanim wypowiesz umowę. Możesz też umówić bezpłatny przegląd po poprzedniej agencji (30 minut online).
            </p>
            <a href={kontakt} data-plan="przeglad-agencji" className="btn btn-secondary" data-cta="raport_przeglad">Umów bezpłatny przegląd</a>
          </section>

          <section id="wzor" aria-labelledby="pobierz-wzor" style={{ ...s.sekcja, ...s.karta, scrollMarginTop: '110px' }}>
            <h2 id="pobierz-wzor" style={s.h2}>Pobierz wzór raportu SEO (PDF)</h2>
            <p style={s.akapit}>
              Wzór ma pięć sekcji opisanych wyżej i tabelę metryk do uzupełnienia danymi z Search Console i Analytics. Wydrukuj go albo wyślij agencji jako listę tego, czego oczekujesz w comiesięcznym raporcie. Przed podpisaniem umowy zapytaj, które sekcje wzoru znajdziesz w raportach agencji. Po kilku miesiącach współpracy porównaj otrzymane raporty ze wzorem: brakujące sekcje to dobre pytania na najbliższe spotkanie.
            </p>
            <ChecklistForm
              endpoint={ENDPOINT_WZORU_RAPORTU}
              plik="wzor-raportu-seo"
              plan="wzor_raportu_seo"
              kategoria="Template"
              idPrefiks="wr"
              etykieta="E-mail, na który wyślemy wzór raportu"
              przycisk="Wyślij wzór raportu PDF"
              komunikatOk="Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do wzoru raportu przyjdzie w ciągu minuty."
              przedmiot="wzór raportu SEO"
              cta="wzor_raportu_submit"
            />
          </section>
        </div>
      </section>

      <AppleFaq faqData={faqRaportu()} title="Pytania o raport SEO" sectionId="pytania" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}

const SCIEZKA_EN = '/en/tools/seo-report-template';

const RAPORT_A_AUDYT_EN = [
  { cecha: 'Question it answers', raport: 'What SEO delivered this month and what comes next', audyt: 'What is wrong with the website and what to fix' },
  { cecha: 'How often', raport: 'Regularly, usually every month', audyt: 'Once: at the start or after a site rebuild' },
  { cecha: 'What is inside', raport: 'Result, causes of change, work done, plan, risks', audyt: 'Technical errors, content, links, competitors' },
  { cecha: 'Outcome', raport: 'An assessment of the agency\'s work', audyt: 'A prioritized list of changes' },
];

const METRYKI_EN = [
  { metryka: 'Enquiries from Google (form, phone, email) and the cost of one enquiry', zrodlo: 'GA4 (key events), invoices', jak: 'The main result of the month', pulapka: 'Without key events configured, this number does not exist' },
  { metryka: 'Clicks and impressions excluding brand queries', zrodlo: 'Google Search Console', jak: 'Year-over-year trend', pulapka: 'Brand queries inflate the result' },
  { metryka: 'Positions of keywords from the agreed list', zrodlo: 'Search Console or a rank tracker', jak: 'Share of keywords in the TOP 3 and TOP 10', pulapka: 'The average position misleads with a large number of keywords' },
  { metryka: 'Business Profile position in Maps', zrodlo: 'Measurement from 49 points (7×7 grid)', jak: 'Percentage of points in the TOP 3', pulapka: 'A single measurement from the office is a coincidence' },
  { metryka: 'Visibility in ChatGPT and AI Overviews', zrodlo: 'A fixed set of customer questions, weekly', jak: 'Percentage of answers that name the company', pulapka: 'A single question proves nothing' },
  { metryka: 'Links acquired', zrodlo: 'A list with the URL, date and status', jak: 'Whether the link is still on the page', pulapka: 'A link count without link quality' },
];

const FLAGI_EN = [
  ['No number of customer enquiries', 'The report talks about traffic and positions, but not about how many customers got in touch. Without key events in GA4, nobody knows whether SEO pays off.'],
  ['Positions without a keyword list agreed at the start', 'The agency shows keywords where the site already ranks high, not the ones you agreed on. It is easy to build growth from such keywords that means nothing for sales.'],
  ['"Visibility" with no definition or source', 'You cannot verify a visibility chart without the name of the tool, the method and the keyword list, or compare it with the previous period.'],
  ['No list of work done, with dates', 'If you do not know what was done and when, you cannot link a change in results to the agency\'s work or to anything else.'],
  ['No year-over-year comparison', 'Month-over-month growth in season is often just the calendar, not the effect of SEO.'],
  ['Data only in a PDF', 'A report is no substitute for access to Search Console and Analytics on your own account. Without it, you are left with no data history when the contract ends.'],
];

function RaportEn() {
  const strona = stronaNarzedzia('raport-seo');
  const meta = STRONY_NARZEDZI_EN['raport-seo'];
  const wpis = wpisEn('/narzedzia/raport-seo');
  const sprawdzarka = hrefSprawdzarki();
  const hubGeo = hrefJesliOpublikowana('/pozycjonowanie-w-ai');
  const kontakt = hash('kontakt', 'en');
  const dataZmiany = LASTMOD[`${BASE}${SCIEZKA}`];

  return (
    <main style={s.main}>
      <Header />
      <Breadcrumbs pl={strona.okruszek} en={meta.okruszek} parent={RODZIC_OKRUSZKOW} />
      <ArticleSchema
        type="Article"
        locale="en"
        breadcrumb={null}
        url={SCIEZKA_EN}
        title={meta.h1}
        description={wpis?.opis}
        datePublished={strona.opublikowano ?? dataZmiany}
        dateModified={dataZmiany}
        imageUrl="/images/panel/raporty.webp"
        extra={{
          hasPart: {
            '@type': 'DigitalDocument',
            name: 'Monthly SEO report template (PDF)',
            encodingFormat: 'application/pdf',
            isAccessibleForFree: true,
          },
        }}
      />

      <section style={s.hero}>
        <div className="container" style={s.kontener}>
          <Reveal className="section-header" style={{ textAlign: 'center', margin: '0 auto 1rem' }}>
            <div className="section-tag" style={s.tag}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> Guide and PDF template
            </div>
            <h1 style={s.h1}>{meta.h1}</h1>
          </Reveal>
          <Byline sciezka={SCIEZKA} takzeEn data={dataZmiany} style={{ textAlign: 'center' }} />
          <AnswerBox etykieta="Short answer">
            A monthly SEO report should start with the business result, that is the number of customer enquiries and their cost, and only then show clicks, positions and work done. A good report fits a summary on one page: the result against the goal, 3–5 causes with evidence, a plan for the next month and the risks. Keep the detailed data in a portal or dashboard.
          </AnswerBox>

          <aside aria-label="Free website assessment" style={{ ...s.karta, padding: 'clamp(1.1rem, 3vw, 1.5rem)', background: '#FFF7F2', boxShadow: 'none', border: '1px solid rgba(216, 90, 48, 0.25)' }}>
            <p style={{ ...s.akapit, fontWeight: 700, color: 'var(--color-text-dark)', margin: '0 0 0.4rem' }}>Looking for a free SEO report on your website?</p>
            <p style={{ ...s.akapit, margin: 0 }}>
              Assessing the site itself is an audit, not a report. A report shows the effects of an agency&apos;s work in a given month, while an audit is a one-time diagnosis of the site that ends with a list of fixes. What it covers and how much it costs is described on the{' '}
              <Link href="/audyt-seo" style={s.podkreslenie}>SEO audit</Link> page.
              {sprawdzarka ? (
                <>
                  {' '}You can also{' '}
                  <Link href={sprawdzarka} style={s.podkreslenie}>check your company&apos;s visibility in ChatGPT</Link> for free right away.
                </>
              ) : null}
            </p>
          </aside>

          <section aria-labelledby="raport-a-audyt" style={s.sekcja}>
            <h2 id="raport-a-audyt" style={s.h2}>SEO report vs. SEO audit: two different documents</h2>
            <p style={s.akapit}>
              The report and the audit get mixed up even in agency offers, although they answer different questions. An SEO report is produced regularly throughout the cooperation and shows how many enquiries came in, where the changes came from and what the team will do next month. An audit is a diagnosis done once, at the start or after a major change such as a site rebuild.
            </p>
            <CompareTable
              id="tabela-raport-audyt"
              caption="SEO report and SEO audit in four points"
              columns={[
                { key: 'cecha', label: 'Feature' },
                { key: 'raport', label: 'SEO report' },
                { key: 'audyt', label: 'SEO audit' },
              ]}
              rows={RAPORT_A_AUDYT_EN.map((r) => ({ ...r, id: r.cecha }))}
            />
            <p style={s.akapit}>
              A good report refers back to the audit: it shows which fixes from the list have already been implemented and what they achieved. If you get the same list of errors every month, that is not a report on work done, just a repeated audit.
            </p>
            <p style={s.akapit}>
              The two documents complement each other. An audit at the start gives a task list for the first months, and subsequent reports show how that list shrinks and what it changes in traffic and enquiries. Without an audit, the agency has no plan to compare the report against.
            </p>
          </section>

          <section aria-labelledby="piec-sekcji" style={s.sekcja}>
            <h2 id="piec-sekcji" style={s.h2}>5 sections of a good monthly report</h2>
            <p style={s.akapit}>
              The layout comes from the monthly report structure in our SEO playbook. The first page is the summary, while charts and keyword tables go into an appendix or the portal. The monthly comment in our client portal is built the same way (example below).
            </p>

            <h3 id="sekcja-wynik" style={s.h3}>1. Result against the goal</h3>
            <p style={s.akapit}>
              The report starts with the number the company cares about: usually enquiries from customers coming from organic results (form, phone, email) and the cost of one enquiry. Next to it sit the monthly goal and the same month a year earlier. A year-over-year comparison filters out seasonality: a weaker December is not a decline if it beats last year&apos;s. Three sentences are enough: what the result was, how it compares with the goal and which way the trend is going. If the company does not measure enquiries, the first report should flag that as a risk and propose setting up key events in GA4.
            </p>

            <h3 id="sekcja-przyczyny" style={s.h3}>2. What influenced the result</h3>
            <p style={s.akapit}>
              This is where the agency gives 3–5 causes of the changes, each with evidence. Evidence is a Google Search Console screenshot with the date marked, the date a change went live on the site, or an algorithm update confirmed by Google. The sentence “positions rose thanks to optimization” with no date and no page address explains nothing. A good cause says what changed, when and on which pages, for example “a new pricing section on the service page, deployed mid-month; clicks on price-related keywords have been rising since that day”.
            </p>

            <h3 id="sekcja-prace" style={s.h3}>3. Work done and its effect</h3>
            <p style={s.akapit}>
              A list of work with dates: new content, technical fixes, links acquired, changes to the Google Business Profile. For each item it is worth naming the page it concerns and whether the effect is already visible. Task names alone, such as “on-page optimization”, are not enough: the report should make clear what exactly was changed. If you pay by the hour, the report should state the hours. You do not have to wait until the end of the month for this kind of information: with us, the{' '}
              <Link href="/panel-klienta" style={s.podkreslenie}>report and data in the client portal</Link>{' '}
              are available daily, together with a work log.
            </p>

            <h3 id="sekcja-plan" style={s.h3}>4. Plan for the next month</h3>
            <p style={s.akapit}>
              The three most important tasks for next month, chosen from the list of all planned work. For each one: what it concerns, what effect it should have and how you will know. A plan with a single item, “further optimization”, gives you nothing to check. A good plan lets you compare what was announced with what was delivered in the next report.
            </p>

            <h3 id="sekcja-ryzyka" style={s.h3}>5. Risks and needs</h3>
            <p style={s.akapit}>
              Things that could stall results, and what the agency needs from you: access to the site or a developer, content approval, a budget for articles, answers to questions about your offer. Changes outside the agency&apos;s control also go here, such as a new competitor in Maps. A risk section protects both sides, because a problem flagged in a report will not surprise anyone three months later.
            </p>
          </section>

          <section aria-labelledby="metryki" style={s.sekcja}>
            <h2 id="metryki" style={s.h2}>Which metrics to show and where to get them</h2>
            <p style={s.akapit}>
              Every number in a report should have a source you can open yourself, ideally on an account registered to your email address. The table collects six metrics that let you judge SEO, along with the traps that make it easy to present a result as better than it is.
            </p>
            <CompareTable
              id="tabela-metryk"
              caption="Metrics of a monthly SEO report"
              columns={[
                { key: 'metryka', label: 'Metric' },
                { key: 'zrodlo', label: 'Source' },
                { key: 'jak', label: 'How to read it' },
                { key: 'pulapka', label: 'Trap' },
              ]}
              rows={METRYKI_EN.map((m) => ({ ...m, id: m.metryka }))}
            />
            <p style={s.akapit}>
              You can filter out brand queries in the Performance report in Search Console: add a query filter that excludes the company name and its variants, including misspelled ones. Brand traffic grows with recognition, advertising and word of mouth, so it says little about the SEO work.
            </p>
            <p style={s.akapit}>
              It is worth agreeing the list of keywords to track before you start. It should include the phrases customers use to look for your services, not only the ones the site is already visible for. The report should note every change to the list during the cooperation.
            </p>
            <p style={s.akapit}>
              Metrics from Maps and from AI answers rarely make it into agency reports, yet they cover places where customers also look for companies. A customer sees different results in Google Maps depending on where they stand, so a Business Profile position is measured on a grid of points around the company address, not from a single spot. ChatGPT answers change from day to day, so AI visibility is measured with a fixed set of questions asked regularly. We describe how we do it on the{' '}
              {hubGeo ? <Link href={hubGeo} style={s.podkreslenie}>AI search optimization</Link> : 'AI search optimization'} page.
            </p>
          </section>

          <section aria-labelledby="przyklad-z-panelu" style={s.sekcja}>
            <h2 id="przyklad-z-panelu" style={s.h2}>Example: what a report looks like in the client portal</h2>
            <p style={s.akapit}>
              Two screens from the demo of our client portal, using sample data for a fictional company, &quot;Stolarnia Demo&quot;. On the monthly overview, the account manager&apos;s comment has three parts: what happened, why and what next, which are sections 1, 2 and 4 of the template. The tiles under the comment show the result against the goal: enquiries from customers split into form, phone and email, clicks from Google, keywords in the TOP 3 and the average position. The first number is customer enquiries, not positions or traffic: every report should start that way.
            </p>
            <figure style={{ margin: '0 0 2rem' }}>
              <Image
                src="/images/panel/przeglad.webp"
                alt="Monthly overview in the client portal demo: the account manager's comment in three parts and tiles with customer enquiries, clicks from Google, keywords in the TOP 3 and the average position"
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 860px"
                style={obraz}
              />
              <figcaption style={s.przypis}>Monthly overview in the client portal. Sample data; the demo interface is in Polish.</figcaption>
            </figure>
            <p style={s.akapit}>
              The Reports tab holds the monthly PDF reports and the starting audit. The PDF repeats what you see in the portal and adds the team&apos;s comment. So the report is not the only place with data: you can check the numbers at any time, without waiting for the end of the month.
            </p>
            <figure style={{ margin: '0 0 1.5rem' }}>
              <Image
                src="/images/panel/raporty.webp"
                alt="Reports tab in the client portal demo: a list of monthly PDF reports with the number of enquiries and clicks, plus the starting audit, each with a download button"
                width={1600}
                height={1025}
                sizes="(max-width: 900px) 100vw, 860px"
                style={obraz}
              />
              <figcaption style={s.przypis}>List of PDF reports in the client portal. Sample data; the demo interface is in Polish.</figcaption>
            </figure>
            <p style={s.akapit}>
              <a href={PANEL_DEMO_URL} style={s.podkreslenie} data-cta="raport_demo">Open the portal demo without logging in</a> and go to the Overview and Reports tabs.
            </p>
          </section>

          <section aria-labelledby="czerwone-flagi" style={s.sekcja}>
            <h2 id="czerwone-flagi" style={s.h2}>Red flags in SEO agency reports</h2>
            <p style={s.akapit}>
              Six signs that a report is hiding a lack of results or a lack of work. One is a reason to ask questions. Several at once are a reason to talk about changing agency. Some of them come from convenience rather than bad intent: it is easier to send an export from a tool than to write a commentary. So start with a conversation and ask for a report based on the template you will find below.
            </p>
            <ol style={s.lista}>
              {FLAGI_EN.map(([tytul, opis]) => (
                <li key={tytul}><strong style={{ color: 'var(--color-text-dark)' }}>{tytul}.</strong> {opis}</li>
              ))}
            </ol>
            <p style={s.akapit}>
              Do you recognize several of them in your own reports? Read{' '}
              <Link href="/zmiana-agencji-seo" style={s.podkreslenie}>how to switch SEO agency without losing rankings</Link>, and take your data with you before you terminate the contract. You can also book a free review after your previous agency (30 minutes online).
            </p>
            <a href={kontakt} data-plan="przeglad-agencji" className="btn btn-secondary" data-cta="raport_przeglad">Book a free review</a>
          </section>

          <section id="wzor" aria-labelledby="pobierz-wzor" style={{ ...s.sekcja, ...s.karta, scrollMarginTop: '110px' }}>
            <h2 id="pobierz-wzor" style={s.h2}>Download an SEO report template (PDF)</h2>
            <p style={s.akapit}>
              The template has the five sections described above and a metrics table to fill in with data from Search Console and Analytics. Print it or send it to an agency as a list of what you expect in the monthly report. Before signing a contract, ask which sections of the template you will find in the agency&apos;s reports. After a few months of cooperation, compare the reports you have received with the template: missing sections make good questions for your next meeting.
            </p>
            <ChecklistForm
              endpoint={ENDPOINT_WZORU_RAPORTU}
              plik="wzor-raportu-seo"
              plan="wzor_raportu_seo"
              kategoria="Template"
              idPrefiks="wr"
              etykieta="Email address to send the report template to"
              przycisk="Send the PDF report template"
              komunikatOk="Sent. Check your inbox (including the Promotions or Spam folder): the link to the report template will arrive within a minute."
              przedmiot="an SEO report template"
              cta="wzor_raportu_submit"
            />
          </section>
        </div>
      </section>

      <AppleFaq faqData={faqRaportuEn()} title="Questions about the SEO report" sectionId="pytania" />
      <Contact isMainContent />
      <Footer />
    </main>
  );
}
