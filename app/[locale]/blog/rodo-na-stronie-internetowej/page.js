import { articleLanguages, articleRobots } from '@/lib/blogPosts';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
    title: 'RODO na stronie internetowej: co musisz mieć',
    description: 'Polityka prywatności, baner cookies i umowy powierzenia — co wdrożyć na stronie w 2026 roku, po wejściu w życie Prawa komunikacji elektronicznej.',
    alternates: {
      // Polish-only piece: the English canonical would have to point at a page
      // that does not exist, so both locales resolve to the Polish URL and the
      // /en rendering is noindexed by articleRobots below.
      canonical: 'https://www.ai-seo-company.pl/blog/rodo-na-stronie-internetowej',
      languages: articleLanguages('/blog/rodo-na-stronie-internetowej', 'https://www.ai-seo-company.pl/blog/rodo-na-stronie-internetowej', 'https://www.ai-seo-company.pl/blog/rodo-na-stronie-internetowej')
    },
    robots: articleRobots('/blog/rodo-na-stronie-internetowej', locale),
  };
}

import Header from '@/components/Header';
import ArticleSchema from '@/components/ArticleSchema';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import { Reveal } from '@/components/ScrollReveal';
import { Link } from '@/i18n/routing';
import ArticleTOC from '@/components/ArticleTOC';
import BlogCTA from '@/components/BlogCTA';

const EXT = { color: 'var(--color-primary)', textDecoration: 'underline' };

export default async function ArticleRodoNaStronieInternetowej({ params }) {
  const { locale } = await params;

  const tocItems = [
    { id: 'co-musi-zawierac-polityka-prywatnosci-zgodna-z-rodo', title: 'Co musi zawierać polityka prywatności zgodna z RODO' },
    { id: 'jak-pokazac-informacje-bez-zasypywania-uzytkownika-tekstem', title: 'Jak pokazać informacje bez zasypywania użytkownika tekstem' },
    { id: 'ktore-pliki-cookies-wymagaja-zgody', title: 'Które pliki cookies wymagają zgody' },
    { id: 'skad-biora-sie-te-obowiazki-trzy-porzadki-prawne', title: 'Skąd biorą się te obowiązki: trzy porządki prawne' },
    { id: 'co-zmienilo-prawo-komunikacji-elektronicznej', title: 'Co zmieniło Prawo komunikacji elektronicznej' },
    { id: 'kto-jeszcze-przetwarza-dane-z-twojej-strony', title: 'Kto jeszcze przetwarza dane z Twojej strony' },
    { id: 'wzory-klauzul-punkt-wyjscia-do-rozmowy-z-prawnikiem', title: 'Wzory klauzul — punkt wyjścia do rozmowy z prawnikiem' },
    { id: 'najczestsze-bledy-techniczne-ktore-znajdujemy-w-audytach', title: 'Najczęstsze błędy techniczne, które znajdujemy w audytach' },
    { id: 'jak-ai-seo-company-wspiera-wdrozenie', title: 'Jak AI SEO COMPANY wspiera wdrożenie' },
    { id: 'najczesciej-zadawane-pytania', title: 'Najczęściej zadawane pytania' },
    { id: 'zrodla', title: 'Źródła' }
  ];

  return (
    <main style={{ backgroundColor: '#FFFFFF', color: '#1D1D1F', minHeight: '100vh', overflowX: 'hidden' }}>
      <Header />
      <ArticleSchema
        slug="/blog/rodo-na-stronie-internetowej"
        locale={locale}
        url="/blog/rodo-na-stronie-internetowej"
        datePublished="2026-08-16"
      />

      <article style={{ paddingTop: '160px', paddingBottom: '120px' }}>
        <div className="container" style={{ maxWidth: '720px', margin: '0 auto', padding: '0 2rem' }}>
          <Reveal>
            <div style={{ marginBottom: '1.5rem', textAlign: 'left' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#86868B', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.5rem' }}>
                Compliance Stron Internetowych
              </span>
              <span style={{ fontSize: '0.9rem', color: '#86868B', fontWeight: 500 }}>
                16 Sierpnia 2026
              </span>
            </div>
            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 700, color: '#1D1D1F', marginBottom: '2rem', lineHeight: 1.1, letterSpacing: '-0.02em', textAlign: 'left' }}>
              RODO na stronie internetowej: co musisz mieć i jak to wdrożyć
            </h1>
            <div style={{ borderBottom: '1px solid #E5E5EA', marginBottom: '3rem' }}></div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="article-content">
              {/* The disclaimer is the first thing on the page on purpose: this is
                  legal (YMYL) territory written by an SEO team, and the reader has
                  to know that before the first recommendation, not after it. */}
              <div style={{ padding: '1.25rem 1.5rem', border: '1px solid #E5E5EA', borderLeft: '4px solid var(--color-cta)', borderRadius: '10px', background: '#F9F9FB', marginBottom: '2rem' }}>
                <p style={{ margin: 0, fontSize: '0.95rem', lineHeight: 1.6, color: '#4B5563' }}>
                  <strong>Zastrzeżenie.</strong> Ten artykuł napisał zespół SEO, nie prawnik. Opisujemy stan przepisów i to, na co zwracamy uwagę przy audytach technicznych stron — ale nie jesteśmy kancelarią i nie świadczymy usług prawnych. Treść dokumentów i ocenę podstaw prawnych dla Twojej firmy powierz radcy prawnemu lub adwokatowi. Stan prawny: sierpień 2026; przy każdej rewizji sprawdzaj, czy przywołane przepisy nadal obowiązują.
                </p>
              </div>

              <p className="lead">
                Prawie każda strona internetowa w Polsce musi spełniać obowiązek informacyjny RODO i mieć poprawnie skonfigurowaną obsługę cookies. Nie ma znaczenia, czy prowadzisz blog firmowy, sklep internetowy czy stronę wizytówkę. Jeśli zbierasz jakiekolwiek dane — adres e-mail z formularza, identyfikatory z narzędzi analitycznych, numer telefonu z zapisu na newsletter — jesteś administratorem danych i masz konkretne obowiązki.
              </p>

              <p>Pytanie, jak wdrożyć RODO na stronie, sprowadza się w praktyce do czterech rzeczy — i to od nich zacznij:</p>

              <ul>
                <li><strong>Pełna polityka prywatności</strong> oparta na art. 13 i 14 RODO, dostępna z każdej podstrony, najczęściej linkiem w stopce.</li>
                <li><strong>Krótka notka informacyjna</strong> przy każdym formularzu, w koszyku i przy zapisie do newslettera.</li>
                <li><strong>Baner cookies</strong>, który blokuje skrypty analityczne i marketingowe do momentu uzyskania zgody, z realną opcją odrzucenia.</li>
                <li><strong>Umowy powierzenia przetwarzania (DPA)</strong> z hostingiem, dostawcą CRM i każdym podwykonawcą, który dotyka danych Twoich użytkowników.</li>
              </ul>

              <p>Dalsze sekcje rozpisują każdy z tych punktów: co wchodzi do polityki, jak zbudować baner zgodny z przepisami i gdzie najczęściej rozjeżdża się dokument z rzeczywistym działaniem strony.</p>

              <div style={{ borderTop: '1px solid #E5E5EA', marginTop: '2rem', marginBottom: '2rem' }}></div>

              <h2 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '1rem' }}>Kluczowe wnioski</h2>

              <p>Obowiązki RODO w sieci sprowadzają się do trzech rzeczy naraz: pełnej polityki prywatności zgodnej z art. 13 i 14, poprawnie skonfigurowanego banera cookies oraz podpisanych umów powierzenia z każdym podwykonawcą przetwarzającym dane.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Punkt</th>
                      <th>Szczegóły</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Trzy porządki prawne</td><td>RODO to rozporządzenie unijne, cookies regulują przepisy o komunikacji elektronicznej, a UODO powołuje polska ustawa z 2018 r.</td></tr>
                    <tr><td>Model warstwowy</td><td>Krótka notka przy formularzu, pełna polityka w stopce dostępna z każdej podstrony.</td></tr>
                    <tr><td>Blokada skryptów</td><td>Cookies analityczne i marketingowe ładują się tylko po aktywnej zgodzie, nigdy wcześniej.</td></tr>
                    <tr><td>Sprawdź podstawę prawną cookies</td><td>Prawo telekomunikacyjne straciło moc 10 listopada 2024. Dokumenty powołujące się na art. 173 PT wymagają aktualizacji.</td></tr>
                    <tr><td>Aktualizacja polityki</td><td>Każda nowa integracja — CRM, pixel, narzędzie analityczne — wymaga korekty listy podmiotów w polityce.</td></tr>
                    <tr><td>Umowy powierzenia</td><td>DPA podpisane z hostingiem, CRM i agencjami marketingowymi, nie deklaracja ustna.</td></tr>
                  </tbody>
                </table>
              </div>

              <ArticleTOC items={tocItems} />

              <h2 id="co-musi-zawierac-polityka-prywatnosci-zgodna-z-rodo">Co musi zawierać polityka prywatności zgodna z RODO</h2>

              <p>Polityka prywatności RODO nie jest dokumentem uznaniowym. Art. 13 i 14 RODO wyliczają konkretne informacje, które trzeba podać, a <a href="https://www.parp.gov.pl/component/content/article/71109:polityka-prywatnosci-na-stronach-internetowych-jak-wlasciwie-spelnic-obowiazek-informacyjny" target="_blank" rel="noopener noreferrer" style={EXT}>poradnik PARP o obowiązku informacyjnym</a> wskazuje pominięcie choćby jednego punktu jako typowy błąd.</p>

              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      <th>Element</th>
                      <th>Co dokładnie wpisać</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Tożsamość administratora</td><td>Pełna nazwa firmy, adres, dane kontaktowe</td></tr>
                    <tr><td>Kontakt do IOD</td><td>Jeśli powołano inspektora ochrony danych — jego dane kontaktowe</td></tr>
                    <tr><td>Cele przetwarzania</td><td>Np. realizacja zamówienia, wysyłka newslettera, analiza ruchu</td></tr>
                    <tr><td>Podstawa prawna</td><td>Zgoda, umowa, obowiązek prawny lub prawnie uzasadniony interes</td></tr>
                    <tr><td>Odbiorcy danych</td><td>Kategorie podmiotów, którym dane są przekazywane</td></tr>
                    <tr><td>Okres przechowywania</td><td>Konkretny czas dla każdego celu osobno, nie zbiorcze „do ustania celu"</td></tr>
                    <tr><td>Prawa osób</td><td>Dostęp, sprostowanie, usunięcie, przenoszenie, sprzeciw</td></tr>
                    <tr><td>Transfer poza EOG</td><td>Informacja i podstawa przekazania — dotyczy m.in. Google Analytics</td></tr>
                    <tr><td>Prawo skargi do UODO</td><td>Wskazanie Prezesa UODO jako organu nadzorczego — obowiązek z art. 77 RODO, organ powołany polską ustawą z 2018 r.</td></tr>
                  </tbody>
                </table>
              </div>

              <p>Okresy przechowywania to punkt, w którym najłatwiej rozpoznać dokument pisany z szablonu. Zapis „do czasu ustania celu przetwarzania" nie mówi nic i nie spełnia wymogu. Rzetelna polityka podaje osobną wartość dla każdego celu: ile trzymacie korespondencję, która nie skończyła się umową, jak długo dokumentację księgową, ile żyją cookies analityczne. Jeśli nie potraficie podać liczby, prawdopodobnie nie wiecie, co się z danymi dzieje — i to jest właściwy moment, żeby to ustalić.</p>

              <p>Transfer poza EOG dotyczy więcej firm, niż się wydaje. Jeśli używasz Google Analytics, dane trafiają do Stanów Zjednoczonych, więc polityka musi to wskazać i podać podstawę przekazania — najczęściej decyzję Komisji Europejskiej o odpowiednim stopniu ochrony albo standardowe klauzule umowne. Samo wymienienie narzędzia bez informacji o transferze to luka, którą łatwo przeoczyć, bo narzędzie „działa po polsku".</p>

              <p>Polityka prywatności na stronie nie musi być jednym blokiem tekstu. Kluczowe informacje — kto zbiera dane i po co — trafiają bezpośrednio pod formularz, a pełny wykaz odbiorców i okresów przechowywania zostaje w rozbudowanej polityce.</p>

              <p>Polityka cookies na stronie i polityka prywatności to dwa odrębne dokumenty — dlaczego, wyjaśniam w sekcji o trzech porządkach prawnych. Wiele stron łączy je w jeden tekst, co utrudnia użytkownikowi znalezienie informacji, a przy kontroli oznacza, że jeden dokument musi spełniać wymagania dwóch aktów naraz.</p>

              <p>Pisz prostym językiem. Nagłówki, krótkie akapity i format pytanie–odpowiedź działają lepiej niż ściana prawniczego tekstu, którego nikt nie przeczyta.</p>

              <h2 id="jak-pokazac-informacje-bez-zasypywania-uzytkownika-tekstem">Jak pokazać informacje bez zasypywania użytkownika tekstem</h2>

              <p>Klauzula informacyjna nie musi być ścianą tekstu. Najlepiej sprawdza się model warstwowy: pierwsza warstwa to krótka notka tam, gdzie użytkownik podaje dane, druga to pełna polityka prywatności pod linkiem. Ten sposób prezentacji jest powszechnie uznawany za praktyczny sposób realizacji obowiązku informacyjnego, bo nie zmusza nikogo do przeczytania trzech stron tekstu przed wysłaniem zapytania.</p>

              <p>Krótkie notki umieszczasz w konkretnych miejscach:</p>

              <ul>
                <li>formularz kontaktowy,</li>
                <li>koszyk i podsumowanie zamówienia w sklepie,</li>
                <li>zapis na newsletter,</li>
                <li>formularz komentarzy pod artykułem.</li>
              </ul>

              <p>Treść notki powinna zmieścić się w dwóch, trzech zdaniach: administrator, cel przetwarzania i link do pełnej polityki. Nie próbuj wcisnąć w to miejsce wszystkich informacji z art. 13.</p>

              <p><strong>Porada profesjonalisty:</strong> <em>Pisz notkę tak, jakbyś wyjaśniał to znajomemu: „Twoje dane zbieramy, żeby odpowiedzieć na zapytanie. Administratorem jest [nazwa firmy]. Szczegóły w polityce prywatności." Jeśli notka brzmi jak fragment ustawy, przepisz ją.</em></p>

              <h2 id="ktore-pliki-cookies-wymagaja-zgody">Które pliki cookies wymagają zgody</h2>

              <p>Informacje o cookies, które podajesz użytkownikowi, muszą rozróżniać dwie kategorie o zupełnie innej logice prawnej. Pliki niezbędne do działania strony — sesyjne, koszyk zakupowy, mechanizmy bezpieczeństwa — działają bez pytania o zgodę. Cookies analityczne i marketingowe, w tym narzędzia remarketingowe i pixele reklamowe, wymagają aktywnej zgody <strong>przed</strong> uruchomieniem skryptu, a nie po nim.</p>

              <p>To rozróżnienie decyduje o konstrukcji banera. Musi on zawierać:</p>

              <ul>
                <li>realny przycisk odrzucenia, równie widoczny jak przycisk akceptacji,</li>
                <li>opcję „tylko niezbędne" bez konieczności przechodzenia przez ustawienia szczegółowe,</li>
                <li>mechanizm wycofania zgody w każdej chwili — przycisk preferencji widoczny na stronie, a nie odesłanie do ustawień przeglądarki,</li>
                <li>zapis dowodu udzielenia zgody: data, zakres, wersja banera.</li>
              </ul>

              <p>Technicznie oznacza to, że skrypty analityczne i marketingowe muszą być blokowane w kodzie do momentu kliknięcia. Domyślnie zaznaczone checkboxy przy zgodach marketingowych są wadliwe — zgoda wyrażona przez pole zaznaczone z góry nie spełnia wymogu jednoznacznej, potwierdzającej czynności z art. 4 pkt 11 RODO.</p>

              <p>Odesłanie do ustawień przeglądarki wymaga osobnego komentarza, bo ustawa i orzecznictwo mówią tu co innego. <strong>Art. 399 ust. 2 PKE formalnie dopuszcza</strong> wyrażenie zgody przez ustawienia oprogramowania w urządzeniu końcowym — ten zapis przeszedł do nowej ustawy z art. 173 Prawa telekomunikacyjnego bez zmian. Problem w tym, że TSUE w wyroku z 1 października 2019 r. uznał za nieważną zgodę wyrażoną przez domyślnie zaznaczone okienko, a przeglądarki domyślnie cookies akceptują. Opieranie się wyłącznie na ustawieniach przeglądarki jest więc rozwiązaniem ryzykownym: przewidzianym w ustawie, ale trudnym do obrony wobec standardu zgody z RODO. Mechanizmem, który realnie działa, jest przycisk preferencji na stronie — odesłanie do przeglądarki może być co najwyżej informacją dodatkową.</p>

              <p>Gotowy baner sam z siebie niczego nie załatwia, jeśli skrypt i tak ładuje się przed kliknięciem. To najczęstszy problem, jaki widzimy przy audytach: dokument mówi jedno, kod robi drugie.</p>

              <p>Porada profesjonalisty: <em>Otwórz stronę w trybie incognito, włącz narzędzia deweloperskie, zakładka Network, i odśwież. Jeśli żądania do domen analitycznych albo reklamowych lecą przed kliknięciem „akceptuj", masz problem techniczny — i to on, a nie treść polityki, będzie widoczny przy kontroli.</em></p>

              <p>Jeśli korzystasz z Google Analytics 4, warto wiedzieć, że <strong>anonimizacja adresów IP jest w nim domyślna i nie da się jej wyłączyć ani skonfigurować</strong>. Parametr <code>anonymize_ip</code> pochodził z Universal Analytics, wyłączonego w 2023 roku — instrukcje każące go dodać są nieaktualne. Nie zwalnia to jednak z obowiązku zgody: GA4 nadal zapisuje identyfikatory w urządzeniu użytkownika, więc skrypt musi być blokowany do momentu jej udzielenia.</p>

              <h2 id="skad-biora-sie-te-obowiazki-trzy-porzadki-prawne">Skąd biorą się te obowiązki: trzy porządki prawne</h2>

              <p>Zanim przejdziemy do zmian z 2024 roku, warto rozdzielić trzy źródła, bo mieszanie ich jest przyczyną większości nieporozumień.</p>

              <p><strong>RODO to prawo unijne, nie polskie.</strong> Pełna nazwa: rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679. „RODO" to wyłącznie polski skrótowiec. Kluczowe jest to, że jest to <strong>rozporządzenie, a nie dyrektywa</strong> — obowiązuje bezpośrednio we wszystkich państwach członkowskich od 25 maja 2018 r., bez przepisywania do prawa krajowego. Dlatego w polityce prywatności powołujesz się na art. 13 czy art. 6 RODO wprost, tak samo jakby to był przepis polskiej ustawy.</p>

              <p><strong>Ustawa z 10 maja 2018 r. o ochronie danych osobowych to polskie uzupełnienie</strong>, nie powtórzenie RODO. Rozporządzenie unijne zostawia państwom członkowskim pewien margines i to właśnie ta ustawa go wypełnia: <strong>powołuje Prezesa Urzędu Ochrony Danych Osobowych</strong>, określa tryb postępowania przed nim, zasady kontroli i wysokość kar dla podmiotów publicznych. Jeśli w polityce prywatności piszesz o prawie do skargi do UODO — a musisz, wymaga tego art. 77 RODO — to organ, do którego odsyłasz, istnieje na mocy tej ustawy, nie samego rozporządzenia.</p>

              <p><strong>Cookies mają jeszcze inne źródło.</strong> Wymóg zgody na przechowywanie informacji w urządzeniu użytkownika pochodzi z dyrektywy 2002/58/WE, zwanej ePrivacy, wdrożonej w Polsce Prawem komunikacji elektronicznej. Dyrektywa, w odróżnieniu od rozporządzenia, wymaga transpozycji — stąd polski przepis, a nie bezpośrednie stosowanie. To jest właśnie powód, dla którego polityka cookies i polityka prywatności to dwa odrębne dokumenty: mają różne podstawy w dwóch różnych aktach.</p>

              <p>Praktyczny wniosek: <strong>RODO odpowiada na pytanie „co robisz z danymi osobowymi", PKE na pytanie „czy wolno ci coś zapisać w cudzym urządzeniu", a polska ustawa z 2018 r. na pytanie „kto to kontroluje i jak wygląda skarga"</strong>. Dokument, który miesza te trzy porządki albo powołuje się tylko na jeden, będzie niekompletny niezależnie od tego, jak dobrze jest napisany.</p>

              <h2 id="co-zmienilo-prawo-komunikacji-elektronicznej">Co zmieniło Prawo komunikacji elektronicznej</h2>

              <p>To najczęściej pomijana zmiana w dokumentach, które widzimy na stronach klientów.</p>

              <p><strong>Ustawa z 12 lipca 2024 r. – Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221) weszła w życie 10 listopada 2024 r. i zastąpiła Prawo telekomunikacyjne oraz część przepisów ustawy o świadczeniu usług drogą elektroniczną.</strong> Polityki prywatności i regulaminy newslettera powołujące się na przepisy uchylonej ustawy odsyłają dziś do stanu prawnego, który nie obowiązuje.</p>

              <p>Dwie rzeczy warte sprawdzenia w Twoich dokumentach:</p>

              <ul>
                <li><strong>Cookies.</strong> Podstawę stanowi dziś <strong>art. 399 PKE</strong> o przechowywaniu informacji w urządzeniu końcowym, a nie art. 173 Prawa telekomunikacyjnego. Sam standard zgody nie zmienił się istotnie — zmieniło się źródło, na które trzeba się powołać.</li>
                <li><strong>Zgody marketingowe.</strong> Art. 398 PKE zastąpił art. 172 Prawa telekomunikacyjnego i art. 10 ustawy o świadczeniu usług drogą elektroniczną. Wymaga uprzedniej zgody na przesyłanie informacji handlowej drogą elektroniczną, <strong>także w relacjach B2B</strong>. Przeważa interpretacja, zgodnie z którą zgoda powinna wskazywać konkretny kanał — e-mail, SMS, telefon — a nie być ogólnym przyzwoleniem na kontakt marketingowy; to jednak kwestia do potwierdzenia z prawnikiem przy konstruowaniu własnych klauzul.</li>
              </ul>

              <p>Test zajmuje minutę: otwórz swoją politykę prywatności, politykę cookies i regulamin newslettera, wciśnij Ctrl+F i wyszukaj frazy „Prawo telekomunikacyjne", „art. 173" oraz „świadczeniu usług drogą elektroniczną". Każde trafienie oznacza odwołanie do przepisu, który nie obowiązuje — i pozycję na liście dla prawnika.</p>

              <h2 id="kto-jeszcze-przetwarza-dane-z-twojej-strony">Kto jeszcze przetwarza dane z Twojej strony</h2>

              <p>Jako administrator danych odpowiadasz również za to, komu je powierzasz. Twoja strona rzadko działa w izolacji: hosting, dostawca poczty transakcyjnej, operator płatności, CRM, agencja marketingowa i narzędzia analityczne przetwarzają dane Twoich użytkowników w Twoim imieniu.</p>

              <p>Z każdym z nich potrzebujesz umowy powierzenia. Taka umowa zwykle obejmuje:</p>

              <ol>
                <li>Zakres i cel powierzonych operacji przetwarzania.</li>
                <li>Wymagane środki techniczne i organizacyjne zabezpieczające dane.</li>
                <li>Warunki dalszego podpowierzenia, na przykład gdy hosting korzysta z podwykonawcy.</li>
                <li>Terminy usunięcia lub zwrotu danych po zakończeniu współpracy.</li>
                <li>Zasady odpowiedzialności w przypadku naruszenia.</li>
              </ol>

              <p>W polityce prywatności nie musisz podawać nazw handlowych każdego dostawcy — wystarczą kategorie: dostawca hostingu, system CRM, agencja marketingowa. Aktualizacja jest jednak konieczna przy każdej zmianie narzędzia; dodanie nowego pixela bez korekty listy podmiotów to jeden z częstszych rozjazdów między dokumentem a rzeczywistością.</p>

              <ul>
                <li>Przeglądaj listę podwykonawców co kwartał, nie raz na rok.</li>
                <li>Każda nowa integracja wymaga aktualizacji polityki i, jeśli to możliwe, podpisania DPA przed uruchomieniem.</li>
              </ul>

              <h2 id="wzory-klauzul-punkt-wyjscia-do-rozmowy-z-prawnikiem">Wzory klauzul — punkt wyjścia do rozmowy z prawnikiem</h2>

              <p>Poniższe brzmienia pokazują, jak taka notka może wyglądać. <strong>Nie są gotowym dokumentem do wklejenia bez weryfikacji</strong> — podstawa prawna zależy od tego, co realnie robisz z danymi, a tego nie da się rozstrzygnąć wzorem.</p>

              <h3>Notka przy formularzu kontaktowym</h3>

              <p style={{ fontStyle: 'italic', color: '#4B5563' }}>„Administratorem Twoich danych osobowych jest [nazwa firmy, adres]. Dane przetwarzamy w celu odpowiedzi na Twoje zapytanie. Szczegóły, w tym podstawę prawną i okres przechowywania, znajdziesz w polityce prywatności [link]."</p>

              <p>Podstawa prawna bywa tu różna: przy zapytaniu ofertowym prowadzącym do umowy zwykle art. 6 ust. 1 lit. b RODO, przy zwykłym kontakcie — lit. f. Wybór ma znaczenie, bo od niego zależy zakres praw użytkownika. To pytanie do prawnika, nie do szablonu.</p>

              <h3>Zgoda na newsletter</h3>

              <p style={{ fontStyle: 'italic', color: '#4B5563' }}>„Wyrażam zgodę na otrzymywanie newslettera na podany adres e-mail od [nazwa firmy]. Zgodę mogę wycofać w każdej chwili, klikając link w każdej wiadomości."</p>

              <p>Zgoda na przetwarzanie danych w celach marketingowych powinna wskazywać kanał. Jeśli planujesz też SMS albo kontakt telefoniczny, potrzebujesz osobnych zgód — art. 398 PKE nie dopuszcza jednego ogólnego przyzwolenia na wszystkie kanały naraz.</p>

              <h3>Skrót polityki cookies</h3>

              <p style={{ fontStyle: 'italic', color: '#4B5563' }}>„Strona używa plików cookies niezbędnych do jej działania oraz, po Twojej zgodzie, cookies analitycznych i marketingowych. Szczegóły i możliwość zmiany ustawień znajdziesz w polityce cookies [link]."</p>

              <p>Porada profesjonalisty: <em>Rozdziel zgody zamiast łączyć je w jeden checkbox. Osobno newsletter, osobno SMS, osobno przekazanie danych partnerom, jeśli to robisz. Jeden checkbox „zgadzam się na wszystko" jest wygodny we wdrożeniu i bezużyteczny przy kontroli.</em></p>

              <h2 id="najczestsze-bledy-techniczne-ktore-znajdujemy-w-audytach">Najczęstsze błędy techniczne, które znajdujemy w audytach</h2>

              <p>Trzy rzeczy powtarzają się niezależnie od branży i wielkości serwisu.</p>

              <p><strong>Skrypty przed zgodą.</strong> Baner stoi, wygląda poprawnie, a Google Analytics i pixel reklamowy ładują się przy pierwszym wejściu. Zwykle dlatego, że baner podpięto jako nakładkę wizualną, bez integracji z menedżerem tagów.</p>

              <p><strong>Brak DPA z hostingiem.</strong> Najbardziej oczywisty podmiot przetwarzający, a umowa najczęściej nie istnieje albo jest schowana w regulaminie, którego nikt nie podpisywał osobno.</p>

              <p><strong>Polityka nieaktualizowana po zmianie narzędzi.</strong> Dokument wymienia trzy podmioty, a w kodzie strony działa siedem skryptów zewnętrznych. To rozjazd widoczny w minutę i trudny do wytłumaczenia.</p>

              <h2 id="jak-ai-seo-company-wspiera-wdrozenie">Jak AI SEO COMPANY wspiera wdrożenie</h2>

              <p>Rozdzielamy dwie rzeczy, które często są mylone: <strong>warstwę techniczną i warstwę prawną</strong>.</p>

              <p>Po naszej stronie jest to, co da się zmierzyć w kodzie: inwentarz skryptów zewnętrznych działających na domenie. Powstaje przy okazji <Link href="/audyt-seo">audytu SEO</Link>, bo te same dane służą ocenie wydajności i poprawności pomiaru. Jeśli rozszerzysz zakres o warstwę zgód, sprawdzamy dodatkowo, które skrypty startują przed kliknięciem w banerze, i porządkujemy ich ładowanie w menedżerze tagów. Wykracza to poza zakres audytu opisany na stronie usługi, więc ustalamy je osobno przed startem.</p>

              <p><strong>Treść polityki prywatności, ocena podstaw prawnych i umowy powierzenia to zakres prawnika.</strong> Nie przygotowujemy dokumentów prawnych, nie doradzamy w wyborze podstawy przetwarzania i nie sprzedajemy „wdrożenia RODO" jako produktu. Nie mamy też stałej współpracy z żadną kancelarią, więc wybór prawnika domyślnie należy do Ciebie, a nasz raport trafia do niego jako materiał wejściowy. Jeśli jednak wolisz nie szukać go samodzielnie, po wcześniejszym uzgodnieniu możemy <strong>podnająć kancelarię i koordynować całość prac</strong> — od przekazania raportu, przez zbieranie pytań po obu stronach, po pilnowanie terminów, żeby część techniczna i prawna nie rozjechały się w czasie. Rozliczamy to osobno od audytu i ustalamy przed startem. To nadal koordynacja, nie doradztwo prawne: za treść dokumentów odpowiada kancelaria, nie my.</p>

              <p>Sens tego podziału jest praktyczny: prawnik pracuje na liście faktycznie działających narzędzi zamiast na opisie z pamięci, a Ty nie płacisz za politykę, która i tak rozjedzie się z kodem.</p>

              <p>Jeśli chcesz zacząć od diagnozy, zamów bezpłatną analizę SEO i potencjału obecnej marki — na zapytanie odpowiadamy zwykle w mniej niż dwie godziny, wstępną propozycję przygotowujemy w ciągu doby. Formularz znajdziesz na <Link href="/#kontakt">stronie głównej</Link>.</p>

              <h2 id="najczesciej-zadawane-pytania">Najczęściej zadawane pytania</h2>

              <h3>Czy RODO to prawo polskie czy unijne?</h3>
              <p>Unijne. RODO to rozporządzenie (UE) 2016/679, stosowane bezpośrednio we wszystkich państwach członkowskich od 25 maja 2018 r. Polska ustawa z 10 maja 2018 r. o ochronie danych osobowych go nie zastępuje — uzupełnia go tam, gdzie rozporządzenie zostawia margines, i powołuje Prezesa UODO jako organ nadzorczy.</p>

              <h3>Czy każda strona internetowa musi mieć politykę prywatności?</h3>
              <p>Jeśli zbierasz jakiekolwiek dane osobowe — formularz, newsletter, narzędzia analityczne — potrzebujesz polityki zgodnej z art. 13 i 14 RODO, niezależnie od wielkości firmy.</p>

              <h3>Czy muszę mieć zgodę na wszystkie cookies?</h3>
              <p>Nie. Pliki niezbędne do działania strony nie wymagają zgody. Zgoda jest wymagana dla cookies analitycznych i marketingowych, i musi być udzielona przed uruchomieniem skryptu.</p>

              <h3>Czy potrzebuję inspektora ochrony danych?</h3>
              <p>Powołanie IOD jest obowiązkowe w określonych przypadkach, na przykład przy przetwarzaniu na dużą skalę danych szczególnych kategorii. Większość małych i średnich firm nie musi go powoływać, ale powinna wskazać kontakt w sprawach ochrony danych. Warto napisać wprost, że inspektora nie powołano — brak takiej informacji czytelnik odbiera jako pominięcie, a nie jako świadomą decyzję.</p>

              <h3>Jak często trzeba aktualizować politykę prywatności?</h3>
              <p>Za każdym razem, gdy zmieniasz narzędzia analityczne, marketingowe lub dostawców przetwarzających dane. Osobno warto przejrzeć dokumenty powstałe przed listopadem 2024 pod kątem odwołań do Prawa telekomunikacyjnego.</p>

              <h3>Czy szablon polityki cookies wystarczy do zgodności?</h3>
              <p>Sam tekst nie wystarczy. Trzeba jeszcze technicznie zablokować skrypty do momentu zgody i zapisywać dowód jej udzielenia — inaczej dokument opisuje stronę, która działa inaczej.</p>

              <h3>Czy zgoda na newsletter wystarczy do wysyłki SMS-ów?</h3>
              <p>Przeważa stanowisko, że nie — art. 398 PKE odnosi się do konkretnego kanału komunikacji, więc zgoda na e-mail nie powinna być traktowana jako obejmująca SMS-y ani kontakt telefoniczny. Konstrukcję własnych zgód potwierdź z prawnikiem.</p>

              <h2 id="zrodla">Źródła</h2>

              <p><strong>Akty prawne</strong></p>

              <ul>
                <li>Rozporządzenie Parlamentu Europejskiego i Rady (UE) 2016/679 (RODO) — art. 4 pkt 11, art. 6, art. 13 i 14, art. 77 (prawo skargi); stosowane bezpośrednio od 25 maja 2018 r.</li>
                <li>Ustawa z 10 maja 2018 r. o ochronie danych osobowych (Dz.U. 2018 poz. 1000 ze zm.) — powołanie Prezesa UODO, tryb postępowania i kontroli</li>
                <li>Dyrektywa 2002/58/WE (ePrivacy) — źródło wymogu zgody na przechowywanie informacji w urządzeniu końcowym, wdrożona w Polsce Prawem komunikacji elektronicznej</li>
                <li>Ustawa z 12 lipca 2024 r. – Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221), w mocy od 10 listopada 2024 r. — art. 398 (zgody marketingowe), art. 399 (przechowywanie informacji w urządzeniu końcowym)</li>
                <li>Wyrok Trybunału Sprawiedliwości UE z 1 października 2019 r. w sprawie C-673/17 (Planet49) — zgoda wyrażona przez domyślnie zaznaczone okienko jest nieważna</li>
                <li><a href="https://uodo.gov.pl" target="_blank" rel="noopener noreferrer" style={EXT}>Urząd Ochrony Danych Osobowych</a> — poradniki i decyzje organu nadzorczego</li>
              </ul>

              <p><strong>Opracowania</strong></p>

              <ul>
                <li><a href="https://www.parp.gov.pl/component/content/article/71109:polityka-prywatnosci-na-stronach-internetowych-jak-wlasciwie-spelnic-obowiazek-informacyjny" target="_blank" rel="noopener noreferrer" style={EXT}>Polityka prywatności na stronach internetowych — poradnik PARP</a></li>
                <li><a href="https://grantthornton.pl/publikacja/prawo-komunikacji-elektronicznej-a-ochrona-danych-osobowych/" target="_blank" rel="noopener noreferrer" style={EXT}>Prawo komunikacji elektronicznej a ochrona danych osobowych — Grant Thornton</a></li>
                <li><a href="https://www.prawo.pl/biznes/prawo-komunikacji-elektronicznej-zgoda-na-dzialania-marketingowe,534839.html" target="_blank" rel="noopener noreferrer" style={EXT}>Prawo komunikacji elektronicznej: zgoda na działania marketingowe — Prawo.pl</a></li>
                <li><a href="https://www.gov.pl/web/cyfryzacja/polityka-dotyczaca-cookies" target="_blank" rel="noopener noreferrer" style={EXT}>Polityka dotycząca cookies — gov.pl</a>, przykład komunikacji prostym językiem</li>
              </ul>

              <p style={{ fontStyle: 'italic', color: '#86868B' }}>Ostatnia weryfikacja: sierpień 2026.</p>

              <h2>Powiązane</h2>

              <ul>
                <li><Link href="/blog/konfiguracja-zdarzen-gtm-ga4-poradnik">Konfiguracja zdarzeń GA4 w Google Tag Managerze</Link> — jak podpiąć blokadę skryptów do menedżera tagów</li>
                <li><Link href="/blog/ile-kosztuje-strona-www-dla-firmy-ceny">Ile kosztuje strona www dla firmy: ceny i co zawierają</Link></li>
                <li><Link href="/projektowanie-stron-internetowych">Projektowanie stron internetowych</Link> — zakres współpracy przy budowie serwisu</li>
              </ul>

              <BlogCTA
                locale={locale}
                currentSlug="/blog/rodo-na-stronie-internetowej"
                customCtaTitlePl="Chcesz wiedzieć, które skrypty startują na Twojej stronie przed zgodą?"
                customCtaTextPl="Inwentaryzujemy skrypty zewnętrzne i pokazujemy, co ładuje się przed kliknięciem w banerze. Raport trafia do Twojego prawnika jako materiał wejściowy."
              />
            </div>
          </Reveal>
        </div>
      </article>

      <Contact />
      <Footer />
    </main>
  );
}
