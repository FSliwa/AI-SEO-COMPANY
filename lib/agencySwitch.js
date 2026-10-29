// Treść poradnika „Zmiana agencji SEO” (zadanie 3.2 planu przewagi). Ta sama lista zasila
// stronę /zmiana-agencji-seo i checklistę PDF (public/pliki/checklista-zmiana-agencji-seo.pdf,
// generowaną z tej listy). Liczba punktów jest w e-mailu z checklistą (panel, lib/email.ts):
// zmieniasz liczbę punktów, popraw też tamten tekst i wygeneruj PDF od nowa.

export const CHECKLIST = [
  {
    title: 'Konta Google',
    items: [
      'Google Search Console: jesteś właścicielem zweryfikowanym, a nie tylko użytkownikiem.',
      'Google Analytics 4: masz rolę administratora na koncie i w usłudze.',
      'Google Tag Manager: masz uprawnienia administratora konta i publikowania w kontenerze.',
      'Profil Firmy w Google (wizytówka): jesteś głównym właścicielem.',
      'Google Ads: konto ma Twoje dane płatności i Twój dostęp administratora. Po zakończeniu odłącz je od konta menedżera agencji.',
      'Google Merchant Center (jeśli masz sklep): jesteś administratorem.',
      'Konta są założone na adres firmy, a nie na prywatny adres pracownika agencji.',
      'Masz spisaną listę osób z dostępem do każdego konta (po zakończeniu je usuniesz).',
    ],
  },
  {
    title: 'Domena i strona',
    items: [
      'Domena jest zarejestrowana na Twoją firmę i masz login do panelu rejestratora.',
      'Masz dostęp do hostingu i do ustawień DNS.',
      'Masz konto administratora w systemie strony (np. WordPress), nie tylko redaktora.',
      'Masz aktualną kopię zapasową strony i bazy danych.',
      'Kod strony, jeśli robiła ją agencja, jest w Twoim repozytorium albo masz jego kopię.',
      'Przekierowania 301 ze starych adresów są spisane i zostają na serwerze.',
      'Pliki robots.txt i sitemap.xml leżą na Twoim serwerze i nikt ich nie zmienia przy odejściu agencji.',
    ],
  },
  {
    title: 'Treści',
    items: [
      'Umowa przenosi na Ciebie autorskie prawa majątkowe do tekstów, zdjęć i grafik (sprawdź pola eksploatacji).',
      'Masz listę artykułów i podstron przygotowanych przez agencję: adres i data publikacji.',
      'Wiesz, na jakich portalach są artykuły gościnne i sponsorowane i czy zostaną po zakończeniu umowy.',
      'Teksty, zdjęcia i grafiki są na Twoim serwerze, a nie na serwerze agencji.',
      'Opisy z wizytówki Google i katalogów firm masz zapisane u siebie.',
    ],
  },
  {
    title: 'Linki',
    items: [
      'Masz pełną listę zdobytych linków: strona z linkiem, adres docelowy, data.',
      'Wiesz, które linki są stałe (artykuły, katalogi, partnerzy), a które wynajmowane z zaplecza agencji.',
      'Umowa nie przewiduje usunięcia linków po jej zakończeniu.',
      'Sprawdziłeś ręcznie 10 losowych linków z listy: nadal są na stronach.',
      'Masz eksport linków z Search Console (raport „Linki”) z dnia przed zakończeniem współpracy.',
      'Wiesz, czy agencja wysyłała do Google plik z odrzuconymi linkami (disavow), i masz jego kopię.',
    ],
  },
  {
    title: 'Dane i raporty',
    items: [
      'Masz pobrane raporty miesięczne z całej współpracy.',
      'Masz listę fraz kluczowych z historią pozycji (eksport z narzędzia agencji).',
      'Masz zapisany eksport danych z Search Console (16 miesięcy) i GA4.',
      'Masz listę wdrożonych zmian i zaplanowanych prac.',
      'Masz spisaną konfigurację konwersji w GA4 i Google Ads: które zdarzenia liczą się jako zapytania.',
      'Po zakończeniu usunąłeś dostępy agencji ze wszystkich kont i zmieniłeś hasła.',
    ],
  },
];

export const CHECKLIST_COUNT = CHECKLIST.reduce((n, g) => n + g.items.length, 0);

export const CONTRACT_CHECKS = [
  { title: 'Okres wypowiedzenia', text: 'Ile trwa i od kiedy biegnie: od dnia doręczenia czy od końca miesiąca. Jeden dzień spóźnienia potrafi przedłużyć umowę o cały okres.' },
  { title: 'Automatyczne przedłużenie', text: 'Czy umowa na czas określony przedłuża się sama i do kiedy trzeba ją wypowiedzieć, żeby tak się nie stało.' },
  { title: 'Opłaty przy wyjściu', text: 'Kary umowne, opłata za wcześniejsze rozwiązanie, rozliczenie rabatu za długi okres. Policz koszt przed decyzją.' },
  { title: 'Prawa do treści', text: 'Czy teksty, zdjęcia i grafiki przechodzą na Ciebie, a jeśli tak, to od kiedy (często dopiero po zapłacie ostatniej faktury).' },
  { title: 'Linki po zakończeniu', text: 'Czy linki są Twoje, czy wynajmowane. Linki z zaplecza agencji zwykle znikają razem z umową, a z nimi część pozycji.' },
];

export const STEPS = [
  { title: 'Przejmij konta, zanim wyślesz wypowiedzenie', text: 'Sprawdź właściciela w Search Console, GA4, Tag Managerze, wizytówce i Google Ads. Po wypowiedzeniu agencja nie ma już powodu, żeby się spieszyć.' },
  { title: 'Pobierz dane i raporty', text: 'Raporty, lista fraz z historią pozycji, lista linków, eksport Search Console i GA4. To Twoja historia: bez niej nowa agencja zaczyna od zera.' },
  { title: 'Wyślij wypowiedzenie w formie z umowy', text: 'Jeśli umowa wymaga formy pisemnej, wyślij list polecony; jeśli dopuszcza e-mail, zachowaj potwierdzenie doręczenia. Zapisz datę, od której liczy się okres.' },
  { title: 'Pilnuj strony w okresie wypowiedzenia', text: 'Nikt nie powinien usuwać przekierowań, tagów analityki, treści ani zmieniać ustawień strony. Zrób zrzut najważniejszych ustawień na początku tego okresu.' },
  { title: 'Zamknij dostępy po zakończeniu', text: 'Usuń użytkowników agencji ze wszystkich kont, odłącz konto Ads od jej konta menedżera, zmień hasła do hostingu i systemu strony.' },
  { title: 'Obserwuj wyniki przez 8 tygodni', text: 'Porównuj kliknięcia i pozycje w Search Console tydzień do tygodnia. Nagły spadek po zakończeniu umowy zwykle ma jedną przyczynę: zniknęły linki albo coś zmieniono na stronie.' },
];

export const FAQ = [
  {
    question: 'Czy po zmianie agencji SEO spadną pozycje?',
    answer: 'Nie muszą. Spadek po zmianie agencji ma zwykle konkretną przyczynę: znikają wynajmowane linki, usunięto treści albo przekierowania, zmieniono coś na stronie. Jeśli konta, treści i linki zostają u Ciebie, a strona się nie zmienia, pozycje nie mają powodu spadać.',
  },
  {
    question: 'Kiedy wysłać wypowiedzenie umowy z agencją SEO?',
    answer: 'Po przejęciu kont i pobraniu danych, ale z zapasem przed terminem z umowy. Wysyłasz je w formie, której wymaga umowa, i zachowujesz potwierdzenie doręczenia.',
  },
  {
    question: 'Czy agencja może zatrzymać moje konta Google?',
    answer: 'Jeśli założyła je na siebie, w praktyce tak, dopóki nie przekaże uprawnień. Dlatego właściciela Search Console, GA4 i wizytówki sprawdź przed wypowiedzeniem. Google ma procedurę przejęcia wizytówki, ale trwa ona i nie zawsze się udaje.',
  },
  {
    question: 'Czy jako jednoosobowa firma mam prawa konsumenta?',
    answer: 'Częściowo może tak być. Od 2021 roku przedsiębiorca prowadzący jednoosobową działalność, dla którego umowa nie ma charakteru zawodowego, korzysta z części ochrony konsumenckiej, m.in. przed niedozwolonymi postanowieniami umownymi. To zależy od umowy i wpisu w CEIDG, więc w razie wątpliwości zapytaj prawnika.',
  },
  {
    question: 'Co sprawdzacie w bezpłatnym przeglądzie po poprzedniej agencji?',
    answer: 'Kto jest właścicielem kont Google, jakie masz linki i treści, co zostanie po zakończeniu umowy i jak wyglądają kliknięcia i pozycje w Search Console. Rozmowa trwa 30 minut, online. Nie oceniamy umowy prawnie i nic nie sprzedajemy w trakcie.',
  },
];
