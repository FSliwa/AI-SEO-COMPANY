// S1 /narzedzia/raport-seo (PLAN-v2 6.11; brief S1; CB-07, CB-08, CB-17; 5.11.2026).
// Komponent serwerowy. Partia 3 (W9) z dodatkowym warunkiem: endpoint /api/wzor-raportu w repo
// panelu (osobna zgoda) - do tego czasu strona zostaje za bramką lib/publikacja.js.
// - title (55), meta (135), H1 (51), Krótka odpowiedź (54 słowa) z 6.11,
// - ramka „Szukasz darmowego raportu SEO…” -> /audyt-seo; sprawdzarka bez <a> do T0.2 (CB-07),
//   /audyt-seo nie oferuje darmowego audytu, więc ramka mówi „to audyt, cena na stronie audytu”,
// - 5 sekcji z zał. E playbooka (5 × H3), tabela 6 metryk, przykład z demo panelu (dane
//   przykładowe), 6 czerwonych flag, formularz wzoru PDF (ChecklistForm, plan 'wzor_raportu_seo',
//   kategoria 'Template'; generate_lead dostaje page_type 'szablon' z lib/track.js),
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

export default function SzablonRaport() {
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
