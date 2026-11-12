// Szablon: checklista wizytówki Google (11.11.2026). Jak założyć, zweryfikować i uzupełnić Profil Firmy
// w Google: 40 punktów w sześciu obszarach (przygotowanie, założenie i weryfikacja, uzupełnienie profilu,
// opinie i posty, spójność NAP i strona, pomiar) + karta danych firmy (wzorzec NAP) w PDF.
// Kanibalizacja (nowe-tematy, temat 1): w title/H1/H2 NIE używamy „pozycjonowanie/optymalizacja wizytówki
// google” (strona usługi /pozycjonowanie-wizytowki-google, w tym jej H2 „Jak pozycjonować wizytówkę Google
// samodzielnie: 8 kroków”), „seo lokalne” ani „pozycjonowanie lokalne” (chroniona /seo-lokalne-warszawa),
// a w EN „google business profile optimization” (strona EN usługi). Ta strona celuje w intencję „jak założyć”.
// Ogólna checklista SEO (/narzedzia/checklista-seo, obszar C) ma 9 punktów o wizytówce i linkujemy do niej.
// PDF: public/pliki/checklista-wizytowki-google.pdf (PL) i local-seo-checklist.pdf (EN); źródła HTML
// w scripts/szablony/pdf/ generuje skrypt z PUNKTY (eksport nazwany) = jedno źródło listy dla strony i PDF.
// Reguły Google w tekście: tylko z Pomocy Profilu Firmy i Search Central z listy ZRODLA (odczyt 11.11.2026).
// Liczby własne: test ChatGPT 4–5.11.2026 (59 z 62 linków do Map) jak na /pozycjonowanie-wizytowki-google;
// cena SEO Standard od 1 900 zł / €450 netto jak na stronie usługi. Odpowiedź na opinię w 48 h i posty
// 2× w miesiącu = nasz standard (playbook 7.2), w tekście oznaczony jako standard, nie wymóg Google.

const PL_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Przygotowanie',
    h3: 'A. Przygotowanie: dane i konto, zanim założysz profil (8 punktów)',
    opis: 'Decyzje, które trudno zmienić po weryfikacji: czy firma się kwalifikuje, na czyim koncie będzie profil, jaka nazwa, jaki typ firmy i jaka kategoria.',
    punkty: [
      ['A1', 'Firma może mieć Profil Firmy: obsługuje klientów w lokalu w godzinach pracy albo dojeżdża do nich', 'Sklep tylko internetowy, wirtualne biuro i skrytka pocztowa się nie kwalifikują. Biuro w coworkingu tylko z szyldem, obsługą klientów i pracownikami firmy na miejscu w godzinach pracy.', 'wysoki'],
      ['A2', 'Profil będzie należał do konta Google firmy, a nie do prywatnego konta pracownika ani agencji', 'Załóż konto Google na firmowy adres e-mail (nie musi to być Gmail). Agencji albo freelancerowi dasz później rolę menedżera.', 'wysoki'],
      ['A3', 'Sprawdzone, czy wizytówka firmy już nie istnieje', 'Wyszukaj nazwę firmy i miejscowość w Mapach Google. Profil niezweryfikowany: „Zgłoś prawo do tej firmy”. Zweryfikowany przez kogoś innego: poproś o prawa własności (obecny właściciel ma 3 dni na odpowiedź). Nie zakładaj drugiego profilu.', 'wysoki'],
      ['A4', 'Nazwa firmy jest ustalona dokładnie tak, jak na szyldzie, stronie i fakturach', 'Bez fraz, miasta, haseł reklamowych, godzin i numeru telefonu. Formę prawną (np. sp. z o.o.) dopisz tylko wtedy, gdy stale używasz jej na szyldzie i w dokumentach.', 'wysoki'],
      ['A5', 'Wybrany typ firmy: lokal z widocznym adresem, obszar działania z ukrytym adresem albo firma hybrydowa', 'Hydraulik pracujący z domu ukrywa adres i ustawia obszar działania. Adres pokazuje tylko firma, która przyjmuje pod nim klientów i ma tam stałe oznaczenie z nazwą.', 'wysoki'],
      ['A6', 'Zapisany jeden wzorzec NAP: nazwa, adres i telefon w jednej wersji do użycia wszędzie', 'Wypełnij kartę danych firmy w szablonie. Telefon pod kontrolą firmy, w miarę możliwości lokalny zamiast centralnej infolinii, nigdy numer o podwyższonej opłacie.', 'wysoki'],
      ['A7', 'Kategoria główna wybrana po sprawdzeniu firm z pakietu lokalnego, a dodatkowe tylko dla usług, które naprawdę świadczysz', 'Kategoria ma kończyć zdanie „Ta firma JEST…”, a nie „ta firma MA…”. Wpisz w Mapach swoją najważniejszą usługę i zapisz kategorie trzech pierwszych firm. Kategorii ma być jak najmniej.', 'wysoki'],
      ['A8', 'Strona firmy jest dodana i zweryfikowana w Google Search Console', 'Google podaje, że to jeden z przypadków, w których profil bywa weryfikowany od razu. Search Console przyda się też do pomiaru ruchu z wyszukiwarki.', 'niski'],
    ],
  },
  {
    id: 'B',
    nazwa: 'Założenie i weryfikacja',
    h3: 'B. Założenie i weryfikacja profilu (7 punktów)',
    opis: 'Dodanie firmy albo przejęcie istniejącego profilu i weryfikacja metodą, którą wskaże Google. Bez weryfikacji nie edytujesz danych i nie odpowiadasz na opinie.',
    punkty: [
      ['B1', 'Profil dodany przez business.google.com/add albo przejęty przyciskiem „Zgłoś prawo do tej firmy” w Mapach', 'Dodanie firmy i zgłoszenie praw jest bezpłatne. Google nie pobiera za to żadnej opłaty.', 'wysoki'],
      ['B2', 'Adres i pinezka na mapie wskazują właściwy budynek, a numer lokalu jest w drugiej linii adresu', 'Sprawdź pinezkę w widoku satelitarnym, zanim wybierzesz metodę weryfikacji. Po przeprowadzce profil trzeba zweryfikować ponownie.', 'wysoki'],
      ['B3', 'Metoda weryfikacji wybrana z tych, które pokazuje profil, i przygotowana z wyprzedzeniem', 'Metody wybiera Google i nie da się ich zmienić: telefon lub SMS, e-mail, rozmowa wideo na żywo, nagranie wideo albo pocztówka. Jeśli możesz, wybierz wideo: Google je zaleca. Czasem trzeba przejść więcej niż jedną metodę.', 'wysoki'],
      ['B4', 'Do weryfikacji wideo przygotowane dowody: oznaczenie firmy z zewnątrz, ulica, sprzęt i dostęp do części dla personelu', 'Rozmowa wideo na żywo działa tylko w godzinach otwarcia, a Ty musisz być w firmie. Pokaż szyld albo tablicę z nazwą ulicy, sprzęt z logo lub narzędzia i na przykład otwarcie drzwi kluczem.', 'średni'],
      ['B5', 'Przy pocztówce nic w profilu się nie zmienia, dopóki nie wpiszesz kodu', 'Nie edytuj nazwy, adresu ani kategorii i nie zamawiaj nowego kodu: stary przestanie działać. Większość pocztówek dociera w 14 dni, a kod (5 cyfr) wygasa po 30 dniach.', 'wysoki'],
      ['B6', 'Kod weryfikacyjny znasz tylko Ty', 'Google nigdy nie prosi o kod. Nie podawaj go nikomu, także agencji, która prowadzi profil. Przy weryfikacji telefonicznej odbierz połączenie sam: automatyczna centrala (IVR) nie odbierze kodu.', 'średni'],
      ['B7', 'Weryfikacja potwierdzona e-mailem, a profil ma drugiego właściciela albo menedżera', 'Ocena Google trwa do 5 dni roboczych. Dodaj drugie konto firmowe jako właściciela, a agencję jako menedżera. Nowa osoba przez 7 dni nie może m.in. usuwać innych użytkowników ani zostać głównym właścicielem.', 'średni'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Uzupełnienie profilu',
    h3: 'C. Uzupełnienie profilu po weryfikacji (8 punktów)',
    opis: 'Pola, które klient widzi w Mapach i w wyszukiwarce. Google podaje, że firmy z pełnymi i aktualnymi informacjami częściej pojawiają się w wynikach lokalnych.',
    punkty: [
      ['C1', 'Opis firmy mówi, co robisz, dla kogo, gdzie i od kiedy (do 750 znaków)', 'Bez linków, cen, promocji i list fraz. Pisz dla klienta, który widzi firmę pierwszy raz.', 'średni'],
      ['C2', 'Godziny otwarcia są prawdziwe, a święta i dni wolne mają godziny specjalne', 'Firma, która działa tylko po umówieniu, nie podaje godzin. Godziny specjalne ustaw przed każdym długim weekendem i świętami.', 'wysoki'],
      ['C3', 'Telefon i strona www prowadzą do tej firmy: numer pod jej kontrolą i jej własna strona z adresem https://', 'Bez przekierowań na stronę albo numer innej firmy. Możesz dodać do 2 dodatkowych numerów. Googlebot nie może być zablokowany na stronie.', 'wysoki'],
      ['C4', 'Obszar działania ustawiony z miast lub kodów pocztowych, które naprawdę obsługujesz', 'Do 20 obszarów, w granicach około 2 godzin jazdy od siedziby. Promienia w kilometrach nie da się już ustawić. Dotyczy firm z dojazdem i hybrydowych, lokal bez dojazdu oznacza n/d.', 'średni'],
      ['C5', 'Lista usług (albo menu, albo produkty) jest pełna i każda pozycja ma krótki opis', 'Każda usługa, którą świadczysz, osobno: co robisz, dla kogo i gdzie. Pełne i szczegółowe informacje pomagają Google dopasować profil do zapytań.', 'średni'],
      ['C6', 'Zdjęcia: logo, zdjęcie główne, wejście z zewnątrz, wnętrze, zespół i realizacje', 'JPG lub PNG, od 10 KB do 5 MB, zalecane 720 × 720 px (minimum 250 × 250), ostre i bez mocnych filtrów. Film do 30 s i 75 MB. Zdjęcia są widoczne dopiero po weryfikacji.', 'średni'],
      ['C7', 'Atrybuty i dane dodatkowe uzupełnione: dostępność, parking, płatności, data otwarcia, profile społecznościowe', 'Atrybuty zaznaczaj tylko zgodnie z prawdą. Datę otwarcia wpisujesz jako miesiąc i rok. Do każdej platformy społecznościowej dodasz jeden link.', 'niski'],
      ['C8', 'Profil jest tak kompletny jak wizytówki trzech pierwszych firm w Mapach', 'Porównaj liczbę zdjęć, opinii i usług oraz wypełnione pola z profilami z pakietu lokalnego dla Twojej głównej usługi.', 'niski'],
    ],
  },
  {
    id: 'D',
    nazwa: 'Opinie i posty',
    h3: 'D. Opinie i posty: stały proces zamiast akcji (6 punktów)',
    opis: 'Opinie i odpowiedzi to część rozpoznawalności firmy. Posty i nowe zdjęcia pokazują klientom, że profil jest prowadzony.',
    punkty: [
      ['D1', 'Link albo kod QR do prośby o opinię jest gotowy i wysyłany po każdej usłudze', 'Link wygenerujesz w profilu. Wyślij go e-mailem albo SMS-em w dniu zakończenia usługi albo wydrukuj kod QR na paragonie lub fakturze.', 'wysoki'],
      ['D2', 'O opinię prosisz wszystkich klientów, bez nagród i bez podpowiadania treści', 'Zasady Map Google zakazują rabatów i prezentów za opinie, proszenia tylko zadowolonych klientów, nacisku na miejscu i limitów opinii dla pracowników.', 'wysoki'],
      ['D3', 'Na każdą opinię jest odpowiedź w ciągu 48 godzin, także na krytyczną', 'Krótko, rzeczowo, bez promocji i bez danych klienta. Odpowiadać możesz dopiero po weryfikacji profilu. 48 godzin to nasz standard pracy, nie wymóg Google.', 'średni'],
      ['D4', 'Opinie, które łamią zasady, są zgłaszane do Google, a nie „negocjowane” z autorem', 'Zgłoś opinię w profilu. Prośba o zmianę albo usunięcie opinii w zamian za rabat to też zachęta, której zasady zakazują.', 'niski'],
      ['D5', 'Posty (aktualności, oferty, wydarzenia) pojawiają się co najmniej dwa razy w miesiącu', 'Nowa usługa, realizacja, oferta sezonowa, zmiana godzin. Każdy post z przyciskiem i linkiem do właściwej podstrony. Posty starsze niż 6 miesięcy trafiają do archiwum, chyba że mają zakres dat.', 'średni'],
      ['D6', 'Nowe zdjęcia dodajesz co miesiąc', 'Realizacje, zmiany sezonowe, nowe osoby w zespole. Najnowsze zdjęcia pokazują się w profilu jako pierwsze.', 'niski'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Spójność NAP i strona',
    h3: 'E. Spójność NAP i strona firmy (6 punktów)',
    opis: 'Nazwa, adres i telefon mają brzmieć tak samo w profilu, na stronie i w katalogach. Do tego obszaru służy tabela miejsc na ostatniej stronie szablonu.',
    punkty: [
      ['E1', 'NAP na stronie (stopka i kontakt) jest zapisany tekstem i identyczny jak w profilu', 'Spróbuj zaznaczyć adres myszką: jeśli się nie da, jest obrazkiem. Porównaj znak po znaku: „ul.”, numer lokalu, kod pocztowy, format telefonu.', 'wysoki'],
      ['E2', 'Strona kontaktu ma adres, mapę, dojazd i godziny, a przy kilku lokalizacjach każda ma własną podstronę', 'Podstrona lokalizacji z własną treścią: zespół, realizacje, dojazd. Ten sam tekst z podmienioną nazwą miasta nie działa.', 'średni'],
      ['E3', 'Link do strony w profilu prowadzi na właściwą podstronę i ma parametry UTM', 'Na przykład ?utm_source=google&utm_medium=organic&utm_campaign=gbp: w GA4 odróżnisz wtedy wejścia z wizytówki od zwykłych wyników. Przy kilku lokalizacjach link do strony danej lokalizacji.', 'niski'],
      ['E4', 'Dane strukturalne LocalBusiness w JSON-LD mają ten sam NAP i godziny co profil', 'Sprawdź je w Teście wyników z elementami rozszerzonymi. Dane mają opisywać to, co widać na stronie.', 'niski'],
      ['E5', 'Katalogi firm, inne mapy i profile społecznościowe mają ten sam NAP', 'Sprawdź m.in. Facebook, Bing Places, Apple Business Connect oraz katalogi ogólne i branżowe. Każde miejsce wpisz do tabeli NAP w szablonie.', 'średni'],
      ['E6', 'Po zmianie adresu, telefonu albo nazwy wszystkie miejsca są poprawione w jednym terminie', 'Zacznij od profilu (przeprowadzka wymaga ponownej weryfikacji), potem strona, na końcu katalogi. Zapisz datę każdej poprawki.', 'średni'],
    ],
  },
  {
    id: 'F',
    nazwa: 'Pomiar',
    h3: 'F. Pomiar i przegląd profilu (5 punktów)',
    opis: 'Bez zapisanych liczb nie wiesz, czy praca nad profilem coś daje. Do tego obszaru służy dziennik miesięczny w szablonie.',
    punkty: [
      ['F1', 'Raz w miesiącu zapisujesz statystyki profilu: wyświetlenia, połączenia, prośby o trasę i kliknięcia w witrynę', 'Profil → Skuteczność. Wpisz liczby do dziennika w szablonie i porównuj miesiąc do miesiąca.', 'średni'],
      ['F2', 'Pozycję w Mapach sprawdzasz dla 3–5 fraz z kilku miejsc, nie tylko z biura', 'Wynik zależy od odległości szukającego, więc jedno sprawdzenie przy biurze pokazuje lepszy obraz niż rzeczywisty. Zapisuj frazę, miejsce i datę.', 'średni'],
      ['F3', 'Zmiany od Google i od użytkowników są przeglądane i zatwierdzane albo poprawiane', 'Sprawdzaj w profilu aktualizacje od Google i informacje, które Google zebrał, także z automatycznych połączeń i SMS-ów na numer firmy.', 'średni'],
      ['F4', 'Raz w miesiącu sprawdzasz, czy ChatGPT, Gemini i Perplexity polecają firmę na pytania klientów', 'Zadaj te same 3–5 pytań, na przykład „polecisz hydraulika na Mokotowie?”. Zapisz, czy firma jest wymieniona i dokąd prowadzą linki.', 'średni'],
      ['F5', 'Profil przechodzi pełny przegląd co kwartał i przed każdą zmianą w firmie', 'Godziny, usługi, zdjęcia, właściciele i menedżerowie. Usuń dostęp osobom, które już nie pracują z firmą.', 'średni'],
    ],
  },
];

const EN_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Preparation',
    h3: 'A. Preparation: details and account before you create the profile (8 checks)',
    opis: 'Decisions that are hard to change after verification: whether your business is eligible, whose account owns the profile, the name, the business type and the category.',
    punkty: [
      ['A1', 'Your business is eligible: it serves customers in person at its premises during stated hours or travels to them', 'Online-only stores, virtual offices and PO boxes don’t qualify. A co-working office qualifies only with signage, customer service and your own staff on site during business hours.', 'high'],
      ['A2', 'The profile will belong to your company’s Google Account, not to an employee’s personal account or your agency’s', 'Create a Google Account with your company email address (it doesn’t have to be Gmail). Give your agency or freelancer manager access later.', 'high'],
      ['A3', 'You’ve checked that no profile for your business already exists', 'Search Google Maps for your business name and city. Unverified profile: select “Claim this business.” Verified by someone else: request ownership (the current owner has 3 days to respond). Don’t create a second profile.', 'high'],
      ['A4', 'Your business name is exactly what appears on your signage, website and invoices', 'No keywords, city names, taglines, hours or phone numbers. Add a legal suffix (like Ltd or LLC) only if you consistently use it on signage and documents.', 'high'],
      ['A5', 'You’ve chosen your business type: storefront with a visible address, service-area business with a hidden address, or hybrid', 'A plumber working from home hides the address and sets a service area. Show an address only if you serve customers there and have permanent signage with your name.', 'high'],
      ['A6', 'You’ve written down one master version of your NAP (name, address, phone) to use everywhere', 'Fill in the business details sheet in the template. Use a phone number your business controls, a local number rather than a central call center where possible, and never a premium-rate number.', 'high'],
      ['A7', 'You’ve picked a primary category after checking the businesses in the local pack, and secondary categories only for services you actually provide', 'The category should complete the sentence “This business IS a…”, not “This business HAS a…”. Search Maps for your main service and note the categories of the top 3 businesses. Use as few categories as possible.', 'high'],
      ['A8', 'Your website is added and verified in Google Search Console', 'Google says this is one of the cases in which a profile can be verified instantly. You’ll also need Search Console to track search traffic.', 'low'],
    ],
  },
  {
    id: 'B',
    nazwa: 'Create and verify',
    h3: 'B. Create and verify the profile (7 checks)',
    opis: 'Adding your business or claiming an existing profile, then verifying it with the method Google offers. Without verification you can’t edit your details or reply to reviews.',
    punkty: [
      ['B1', 'The profile is added at business.google.com/add or claimed with “Claim this business” in Google Maps', 'Adding or claiming a profile is free. Google doesn’t charge for it.', 'high'],
      ['B2', 'The address and map pin point to the right building, with the suite or unit number on address line 2', 'Check the pin in satellite view before you choose a verification method. If you move, you’ll have to verify the profile again.', 'high'],
      ['B3', 'You’ve chosen a verification method from the ones your profile offers and prepared for it in advance', 'Google sets the methods and you can’t change them: phone or text, email, live video call, video recording or postcard. If you can, choose video: Google recommends it. Sometimes you need more than one method.', 'high'],
      ['B4', 'For video verification, you have proof ready: exterior signage, the street, equipment and access to staff-only areas', 'Live video calls are only available during your business hours, and you must be at the business. Show your sign or a street sign, branded equipment or tools and, for example, unlocking the door with your key.', 'medium'],
      ['B5', 'While you wait for a postcard, nothing in the profile changes until you enter the code', 'Don’t edit the name, address or category, and don’t request a new code: the old one stops working. Most postcards arrive within 14 days, and the 5-digit code expires after 30 days.', 'high'],
      ['B6', 'Only you know the verification code', 'Google never asks for your code. Don’t share it with anyone, including the agency that manages your profile. For phone verification, answer the call yourself: automated phone systems (IVR) can’t receive the code.', 'medium'],
      ['B7', 'Verification is confirmed by email, and the profile has a second owner or a manager', 'Google’s review takes up to 5 business days. Add a second company account as an owner and your agency as a manager. For the first 7 days, a new user can’t, for example, remove other users or become the primary owner.', 'medium'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Complete the profile',
    h3: 'C. Complete the profile after verification (8 checks)',
    opis: 'The fields customers see in Google Maps and Search. Google says businesses with complete and accurate information are more likely to show up in local results.',
    punkty: [
      ['C1', 'The business description says what you do, for whom, where and since when (up to 750 characters)', 'No links, prices, promotions or keyword lists. Write for a customer who is seeing your business for the first time.', 'medium'],
      ['C2', 'Opening hours are accurate, and holidays and days off have special hours', 'Businesses that work by appointment only shouldn’t list hours. Set special hours before every long weekend and public holiday.', 'high'],
      ['C3', 'The phone number and website lead to this business: a number it controls and its own website with an https:// address', 'No redirects to another business’s page or number. You can add up to 2 additional numbers. Googlebot must not be blocked on your site.', 'high'],
      ['C4', 'The service area lists the cities or postcodes you actually serve', 'Up to 20 areas, within about 2 hours’ drive of your base. You can no longer set a radius in miles or kilometers. Applies to service-area and hybrid businesses; a storefront that doesn’t visit customers marks N/A.', 'medium'],
      ['C5', 'Your services (or menu, or products) are complete, and each item has a short description', 'List every service you provide separately: what you do, for whom and where. Complete, detailed information helps Google match your profile to searches.', 'medium'],
      ['C6', 'Photos: logo, cover photo, exterior with the entrance, interior, team and completed work', 'JPG or PNG, 10 KB to 5 MB, 720 × 720 px recommended (250 × 250 minimum), in focus and without heavy filters. Videos up to 30 s and 75 MB. Photos only appear after verification.', 'medium'],
      ['C7', 'Attributes and extra details are filled in: accessibility, parking, payments, opening date, social media links', 'Only tick attributes that are true. Enter the opening date as month and year. You can add one link per social platform.', 'low'],
      ['C8', 'Your profile is as complete as the profiles of the top 3 businesses in Google Maps', 'Compare the number of photos, reviews and services and the fields filled in with the profiles in the local pack for your main service.', 'low'],
    ],
  },
  {
    id: 'D',
    nazwa: 'Reviews and posts',
    h3: 'D. Reviews and posts: a routine, not a campaign (6 checks)',
    opis: 'Reviews and replies are part of how well-known your business is. Posts and new photos show customers that someone looks after the profile.',
    punkty: [
      ['D1', 'A review link or QR code is ready and sent after every job', 'Create the link in your profile. Email or text it on the day the job is done, or print the QR code on receipts or invoices.', 'high'],
      ['D2', 'You ask every customer for a review, with no rewards and no suggested wording', 'Google Maps policies prohibit discounts or gifts for reviews, asking only happy customers, pressuring people on the premises and review quotas for staff.', 'high'],
      ['D3', 'Every review gets a reply within 48 hours, including critical ones', 'Keep it short and factual, with no promotions and no customer details. You can only reply once the profile is verified. 48 hours is our working standard, not a Google requirement.', 'medium'],
      ['D4', 'Reviews that break the rules are reported to Google, not “negotiated” with the author', 'Flag the review in your profile. Asking for a review to be changed or removed in exchange for a discount is also an incentive the policy prohibits.', 'low'],
      ['D5', 'Posts (updates, offers, events) go up at least twice a month', 'A new service, a completed job, a seasonal offer, a change in hours. Each post has a button linking to the right page. Posts older than 6 months are archived unless they have a date range.', 'medium'],
      ['D6', 'You add new photos every month', 'Completed jobs, seasonal changes, new team members. Your newest photos show first in your profile.', 'low'],
    ],
  },
  {
    id: 'E',
    nazwa: 'NAP consistency and website',
    h3: 'E. NAP consistency and your website (6 checks)',
    opis: 'Your name, address and phone number should read the same in your profile, on your website and in directories. Use the listings table on the last page of the template.',
    punkty: [
      ['E1', 'The NAP on your website (footer and contact page) is in text and identical to the profile', 'Try selecting the address with your mouse: if you can’t, it’s an image. Compare character by character: abbreviations, unit number, postcode, phone format.', 'high'],
      ['E2', 'The contact page has the address, a map, directions and hours, and each location has its own page', 'A location page needs its own content: team, completed work, directions. The same text with the city name swapped doesn’t work.', 'medium'],
      ['E3', 'The website link in your profile goes to the right page and carries UTM parameters', 'For example ?utm_source=google&utm_medium=organic&utm_campaign=gbp, so GA4 can tell profile visits apart from regular search results. With several locations, link to each location’s page.', 'low'],
      ['E4', 'LocalBusiness structured data in JSON-LD uses the same NAP and hours as the profile', 'Check it with the Rich Results Test. Structured data must describe what is visible on the page.', 'low'],
      ['E5', 'Directories, other map apps and social profiles show the same NAP', 'Check Facebook, Bing Places, Apple Business Connect, and general and industry directories. Add each one to the NAP table in the template.', 'medium'],
      ['E6', 'After a change of address, phone number or name, every listing is updated within one deadline', 'Start with the profile (a move means verifying again), then your website, then directories. Write down the date of each fix.', 'medium'],
    ],
  },
  {
    id: 'F',
    nazwa: 'Tracking',
    h3: 'F. Tracking and profile reviews (5 checks)',
    opis: 'Without recorded numbers you can’t tell whether work on the profile pays off. Use the monthly log in the template.',
    punkty: [
      ['F1', 'Once a month you record your profile performance: views, calls, direction requests and website clicks', 'Profile → Performance. Write the numbers in the template log and compare month to month.', 'medium'],
      ['F2', 'You check your Google Maps ranking for 3–5 keywords from several locations, not just your office', 'Results depend on how far away the searcher is, so a single check next to your office looks better than reality. Note the keyword, location and date.', 'medium'],
      ['F3', 'Changes from Google and from users are reviewed and accepted or corrected', 'Check your profile for Google updates and for information Google has collected, including from automated calls and texts to your business number.', 'medium'],
      ['F4', 'Once a month you check whether ChatGPT, Gemini and Perplexity recommend your business for customer questions', 'Ask the same 3–5 questions, such as “can you recommend a plumber in Mokotów?”. Note whether your business is named and where the links lead.', 'medium'],
      ['F5', 'The profile gets a full review every quarter and before any change in the business', 'Hours, services, photos, owners and managers. Remove access for people who no longer work with the business.', 'medium'],
    ],
  },
];

export const PUNKTY = { pl: PL_OBSZARY, en: EN_OBSZARY };

const ile = (obszary) => obszary.reduce((n, o) => n + o.punkty.length, 0);

function podgladHtml(obszary, en) {
  const jak = en ? 'How to check:' : 'Jak sprawdzić:';
  const prio = en ? 'Priority:' : 'Priorytet:';
  return obszary
    .map((o) => `<h3>${o.h3}</h3><ul>${o.punkty
      .map(([nr, punkt, sposob, p]) => `<li>☐ <strong>${nr}. ${punkt}.</strong> ${jak} ${sposob} <em>${prio} ${p}.</em></li>`)
      .join('')}</ul>`)
    .join('');
}

// [url, nazwa PL, nazwa EN] - wszystkie odczytane 11.11.2026 (kopie: prace-2026-11-11/.../zrodla).
const ZRODLA = [
  ['https://support.google.com/business/answer/2911778', 'Pomoc Profilu Firmy w Google: dodawanie profilu firmy i zgłaszanie do niego praw', 'Google Business Profile Help: Add or claim your Business Profile'],
  ['https://support.google.com/business/answer/4566671', 'Pomoc Profilu Firmy w Google: prośba o prawa własności do profilu firmy', 'Google Business Profile Help: Request ownership of a Business Profile'],
  ['https://support.google.com/business/answer/7107242', 'Pomoc Profilu Firmy w Google: weryfikacja firmy w Google', 'Google Business Profile Help: Verify your business on Google'],
  ['https://support.google.com/business/answer/3038177', 'Pomoc Profilu Firmy w Google: wytyczne dotyczące przedstawiania firmy w Google', 'Google Business Profile Help: Guidelines for representing your business on Google'],
  ['https://support.google.com/business/answer/3039617', 'Pomoc Profilu Firmy w Google: edytowanie profilu firmy (kategorie, opis, telefony)', 'Google Business Profile Help: Edit your Business Profile (categories, description, phone numbers)'],
  ['https://support.google.com/business/answer/9157481', 'Pomoc Profilu Firmy w Google: obsługiwane obszary firm z dojazdem i hybrydowych', 'Google Business Profile Help: Manage your service areas for service-area and hybrid businesses'],
  ['https://support.google.com/business/answer/6103862', 'Pomoc Profilu Firmy w Google: zdjęcia i filmy w profilu firmy', 'Google Business Profile Help: Manage your Business Profile photos and videos'],
  ['https://support.google.com/business/answer/3403100', 'Pomoc Profilu Firmy w Google: właściciele i menedżerowie profilu', 'Google Business Profile Help: Manage your Business Profile owners and managers'],
  ['https://support.google.com/business/answer/7662907', 'Pomoc Profilu Firmy w Google: wpisy (posty) w profilu firmy', 'Google Business Profile Help: Create and manage posts on your Business Profile'],
  ['https://support.google.com/business/answer/3474050', 'Pomoc Profilu Firmy w Google: zarządzanie opiniami klientów', 'Google Business Profile Help: Manage customer reviews'],
  ['https://support.google.com/business/answer/3474122', 'Pomoc Profilu Firmy w Google: jak zdobywać więcej opinii', 'Google Business Profile Help: Tips to get more reviews'],
  ['https://support.google.com/business/answer/7091', 'Pomoc Profilu Firmy w Google: poprawianie pozycji w lokalnych wynikach wyszukiwania', 'Google Business Profile Help: Tips to improve your local ranking on Google'],
  ['https://support.google.com/contributionpolicy/answer/7400114', 'Zasady treści w Mapach Google: fałszywe, nagradzane i wybiórczo zbierane opinie', 'Google Maps user-generated content policy: fake, incentivized and selectively solicited reviews'],
  ['https://developers.google.com/search/docs/appearance/ai-features', 'Google Search Central: funkcje AI w wyszukiwarce a Twoja strona (aktualny Profil Firmy)', 'Google Search Central: AI features and your website (up-to-date Business Profile)'],
  ['https://developers.google.com/search/docs/appearance/structured-data/local-business', 'Google Search Central: dane strukturalne LocalBusiness', 'Google Search Central: Local business (LocalBusiness) structured data'],
];

export default {
  slug: 'checklista-wizytowki-google',
  sciezkaEn: '/tools/local-seo-checklist',
  plik: 'wizytowka-google',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'jak założyć wizytówkę google', en: 'local seo checklist' },
  frazyDodatkowe: {
    // „pozycjonowanie/optymalizacja wizytówki google” = /pozycjonowanie-wizytowki-google (nie tu).
    pl: ['jak zrobić wizytówkę google', 'wizytówka google jak zrobić', 'jak dodać firmę do google', 'wizytówka google jak założyć', 'weryfikacja wizytówki google', 'audyt wizytówki google'],
    // „google business profile optimization” = /en/google-business-profile-optimization (nie w title/H1/H2).
    en: ['how to set up google business profile', 'nap consistency', 'google business profile optimization checklist', 'google business profile checklist', 'local seo checklist pdf'],
  },
  seo: {
    pl: {
      tytul: 'Jak założyć wizytówkę Google: checklista krok po kroku (PDF)',
      opis: 'Jak założyć wizytówkę Google i przejść weryfikację: checklista 40 punktów, karta danych NAP, przykład wypełnienia i darmowy szablon PDF do druku.',
    },
    en: {
      tytul: 'Local SEO checklist: Google Business Profile setup (PDF)',
      opis: 'A 40-point local SEO checklist: set up and verify your Google Business Profile, fix NAP consistency, run reviews and track results. Free PDF.',
    },
  },

  pl: {
    okruszek: 'Checklista wizytówki Google',
    tag: 'Szablon do pobrania',
    h1: 'Jak założyć wizytówkę Google: checklista w 40 punktach',
    lead: 'Jak założyć wizytówkę Google: wejdź na business.google.com/add, wpisz prawdziwą nazwę firmy, kategorię główną, adres albo obszar działania i telefon, a potem zweryfikuj firmę metodą, którą zaproponuje Google. Ocena trwa do 5 dni roboczych. Nasza checklista ma 40 punktów, od przygotowania danych po opinie i pomiar, a szablon PDF wyślemy e-mailem.',
    karta: {
      nazwa: 'Checklista wizytówki Google (PDF)',
      opis: '40 punktów: przygotowanie, założenie i weryfikacja, uzupełnienie profilu, opinie i posty, spójność NAP i pomiar. Z kartą danych firmy.',
      cta: 'Pobierz checklistę',
    },
    sekcje: [
      {
        id: 'jak-zalozyc',
        h2: 'Jak założyć wizytówkę Google krok po kroku',
        html: [
          '<p>Wizytówka Google to potoczna nazwa Profilu Firmy w Google, dawniej Google Moja Firma. Chodzi o ten sam profil: nazwę, adres, godziny, zdjęcia i opinie, które klient widzi w Mapach i obok wyników wyszukiwania. Dodanie firmy jest bezpłatne. Najdłużej trwa weryfikacja, zwłaszcza gdy Google wyśle kod pocztą.</p>',
          '<ol>',
          '<li><strong>Sprawdź, czy profil już istnieje.</strong> Wpisz nazwę firmy i miejscowość w Mapach Google. Profil mógł dodać ktoś z użytkowników Map albo były wspólnik. Jeśli jest niezweryfikowany, kliknij „Zgłoś prawo do tej firmy”. Jeśli zweryfikował go ktoś inny, poproś o prawa własności: obecny właściciel ma 3 dni na odpowiedź.</li>',
          '<li><strong>Zaloguj się na konto Google firmy.</strong> Najlepiej założone na firmowy adres e-mail, a nie na prywatny adres pracownika. Kto zweryfikuje firmę, ten zostaje właścicielem profilu.</li>',
          '<li><strong>Wejdź na business.google.com/add</strong> i kliknij „Dodaj swoją firmę do Google”. Dalej prowadzą instrukcje na ekranie.</li>',
          '<li><strong>Wpisz nazwę firmy</strong> dokładnie tak, jak na szyldzie i fakturach. Bez miasta, usług i haseł reklamowych.</li>',
          '<li><strong>Wybierz kategorię główną.</strong> Kategoria odpowiada na pytanie, czym firma jest. Kategorie dodatkowe dodasz później w edycji profilu.</li>',
          '<li><strong>Zdecyduj o adresie.</strong> Jeśli przyjmujesz klientów w lokalu, podaj adres i sprawdź pinezkę na mapie. Jeśli dojeżdżasz do klientów, ukryj adres i wybierz obszar działania.</li>',
          '<li><strong>Dodaj telefon i stronę www.</strong> Numer, który odbiera firma, i adres strony tej firmy.</li>',
          '<li><strong>Zweryfikuj firmę</strong> metodą, którą zaproponuje Google. Metody i pułapki opisujemy niżej.</li>',
          '</ol>',
          '<p>Po weryfikacji przychodzi e-mail z potwierdzeniem i dopiero wtedy profil jest w pełni Twój: możesz odpowiadać na opinie, a dodane zdjęcia stają się widoczne. Pozostałe pola, czyli opis, godziny specjalne, usługi, zdjęcia i atrybuty, uzupełniasz według części C checklisty.</p>',
          '<p>Szablon PDF ma tę samą kolejność, bo odpowiada na pytanie, jak założyć wizytówkę Google bez poprawek po fakcie. Część A to przygotowanie danych, zanim cokolwiek klikniesz. Część B to założenie i weryfikacja. Części C–F to praca po weryfikacji: uzupełnienie profilu, opinie i posty, spójność danych w sieci i pomiar.</p>',
        ].join(''),
      },
      {
        id: 'kto-moze',
        h2: 'Kto może mieć wizytówkę Google, a kto nie',
        html: '<p>Google przyjmuje dwa rodzaje firm: takie, które mają lokal odwiedzany przez klientów, i takie, które dojeżdżają do klientów. Firma bez kontaktu z klientem na miejscu ani u klienta, na przykład sklep tylko internetowy, tego warunku nie spełnia. Nie kwalifikuje się też wirtualne biuro, czyli wynajęty adres do korespondencji, pod którym nikt z firmy nie pracuje, ani skrytka pocztowa.</p>',
        tabela: {
          id: 'tabela-typy-firm',
          caption: 'Typy firm w Profilu Firmy w Google według wytycznych Google (odczyt 11.11.2026)',
          columns: [
            { key: 'typ', label: 'Typ firmy' },
            { key: 'przyklad', label: 'Przykład' },
            { key: 'adres', label: 'Adres w profilu' },
            { key: 'obszar', label: 'Obszar działania' },
            { key: 'warunek', label: 'Warunek' },
          ],
          rows: [
            { typ: 'Lokal', przyklad: 'Gabinet, salon, sklep stacjonarny, kawiarnia', adres: 'Widoczny', obszar: 'Nie ustawiasz', warunek: 'Stałe oznaczenie z nazwą firmy pod adresem, obsługa klientów w podanych godzinach' },
            { typ: 'Firma z dojazdem', przyklad: 'Hydraulik, firma sprzątająca, elektryk pracujący z domu', adres: 'Ukryty', obszar: 'Do 20 obszarów, do ok. 2 godzin jazdy', warunek: 'Jeden profil na cały obsługiwany obszar' },
            { typ: 'Firma hybrydowa', przyklad: 'Warsztat z pomocą drogową, restauracja z dowozem', adres: 'Widoczny', obszar: 'Tak', warunek: 'Lokal z pracownikami, który przyjmuje klientów w podanych godzinach' },
            { typ: 'Biuro w coworkingu', przyklad: 'Kancelaria, biuro rachunkowe', adres: 'Widoczny', obszar: 'Zależnie od działalności', warunek: 'Szyld, obsługa klientów i pracownicy firmy na miejscu w godzinach pracy' },
            { typ: 'Nie kwalifikuje się', przyklad: 'Sklep tylko internetowy, wirtualne biuro, skrytka pocztowa', adres: '–', obszar: '–', warunek: 'Brak kontaktu z klientem w lokalu albo u klienta' },
          ],
          przypis: 'Źródło: Pomoc Profilu Firmy w Google, wytyczne dotyczące przedstawiania firmy i obsługiwane obszary (lista źródeł na końcu strony).',
        },
        htmlPo: '<p>Osobny profil może mieć każda lokalizacja z własnym zespołem. Firma z dojazdem i kilkoma oddziałami, z których każdy ma własny obszar i własnych pracowników, może mieć profil dla każdego oddziału. Lekarz, prawnik czy agent nieruchomości, który przyjmuje klientów osobiście, może mieć własny profil obok profilu firmy. Dwa profile tej samej firmy pod jednym adresem to natomiast problem: Google wymaga jednego profilu na firmę, a duplikaty utrudniają wyświetlanie informacji w Mapach i wyszukiwarce.</p>',
      },
      {
        id: 'weryfikacja',
        h2: 'Weryfikacja wizytówki Google: metody, czas i najczęstsze problemy',
        html: [
          '<p>Weryfikacja potwierdza, że masz prawo reprezentować firmę. Bez niej nie edytujesz nazwy ani godzin, nie odpowiadasz na opinie, a dodane zdjęcia nie są widoczne. Google pisze też, że zweryfikowana firma częściej pojawia się w wynikach wyszukiwania.</p>',
          '<p>Metodę wybiera Google na podstawie rodzaju działalności, informacji publicznych, regionu i godzin otwarcia. Nie da się jej zmienić, a czasem trzeba przejść więcej niż jedną.</p>',
        ].join(''),
        tabela: {
          id: 'tabela-weryfikacja',
          caption: 'Metody weryfikacji Profilu Firmy w Google (odczyt 11.11.2026)',
          columns: [
            { key: 'metoda', label: 'Metoda' },
            { key: 'jak', label: 'Jak działa' },
            { key: 'uwaga', label: 'Na co uważać' },
          ],
          rows: [
            { metoda: 'Telefon lub SMS', jak: 'Kod przychodzi połączeniem albo SMS-em na numer firmy, a Ty wpisujesz go w profilu', uwaga: 'Odbierz osobiście: automatyczna centrala (IVR) nie odbierze kodu' },
            { metoda: 'E-mail', jak: 'Wykonujesz kroki z wiadomości wysłanej na adres widoczny na ekranie weryfikacji', uwaga: 'Musisz mieć dostęp do tego adresu' },
            { metoda: 'Rozmowa wideo na żywo', jak: 'Łączysz się z konsultantem Google i pokazujesz firmę kamerą', uwaga: 'Tylko w godzinach otwarcia i tylko z miejsca prowadzenia firmy' },
            { metoda: 'Nagranie wideo', jak: 'Nagrywasz film z lokalizacją, sprzętem i dowodem, że zarządzasz firmą', uwaga: 'Google zaleca tę metodę, jeśli jest dostępna. Odrzucone nagranie profil zgłosi powiadomieniem z instrukcją' },
            { metoda: 'Pocztówka', jak: 'Google wysyła pocztą 5-cyfrowy kod na adres firmy', uwaga: 'Większość kodów dociera w 14 dni, kod wygasa po 30 dniach. Do tego czasu nie zmieniaj nazwy, adresu ani kategorii' },
          ],
          przypis: 'Źródło: Pomoc Profilu Firmy w Google, „Zweryfikuj swoją firmę w Google”. Dostępność metod zależy od firmy i regionu.',
        },
        htmlPo: [
          '<p>Po przejściu kroków Google ocenia informacje do 5 dni roboczych, w rzadkich przypadkach dłużej. Czasem weryfikacja jest natychmiastowa, na przykład gdy strona firmy jest już zweryfikowana w Google Search Console. Dlatego w części A checklisty jest punkt o Search Console: przyda się i przy weryfikacji, i do pomiaru ruchu.</p>',
          '<p>Jeśli po zakończeniu procesu w profilu znowu widać przycisk weryfikacji, Google nie zweryfikował firmy w pełni. Spróbuj ponownie albo inną dostępną metodą. Prośba o dodatkowe informacje pojawia się zwykle po zmianie danych firmy, więc najprostsza profilaktyka to nie zmieniać nazwy, adresu i kategorii w trakcie weryfikacji. Kod trzymaj dla siebie: Google nigdy o niego nie prosi, a pomoc Google odradza podawanie go nawet osobom, które zarządzają profilem.</p>',
        ].join(''),
      },
      {
        id: 'co-uzupelnic',
        h2: 'Co uzupełnić po weryfikacji: pola profilu i limity Google',
        html: '<p>Pomoc Google mówi wprost: firmy z pełnymi i aktualnymi informacjami częściej pojawiają się w wynikach lokalnych. Każde pole ma jednak swoje zasady, a za część błędów, na przykład dopiski w nazwie, Google może zawiesić profil. Tabela zbiera limity i reguły, które warto znać przed edycją.</p>',
        tabela: {
          id: 'tabela-pola',
          caption: 'Pola Profilu Firmy w Google: zasady i limity (odczyt 11.11.2026)',
          columns: [
            { key: 'pole', label: 'Pole' },
            { key: 'zasada', label: 'Zasada' },
            { key: 'limit', label: 'Limit albo wymóg' },
          ],
          rows: [
            { pole: 'Nazwa', zasada: 'Prawdziwa nazwa z szyldu, strony i dokumentów', limit: 'Bez haseł, lokalizacji, usług, godzin i telefonu. Zmiana nazwy może wymagać ponownej weryfikacji' },
            { pole: 'Kategorie', zasada: '„Ta firma JEST…”, jak najmniej i jak najdokładniej', limit: 'Kategoria główna i do 9 dodatkowych' },
            { pole: 'Opis', zasada: 'Co oferujesz, co Cię wyróżnia, od kiedy działasz', limit: 'Do 750 znaków, bez linków, HTML, cen i promocji' },
            { pole: 'Godziny', zasada: 'Godziny obsługi klientów, godziny specjalne na święta', limit: 'Firmy działające tylko po umówieniu nie podają godzin' },
            { pole: 'Telefon', zasada: 'Numer pod kontrolą firmy, najlepiej lokalny', limit: 'Główny i do 2 dodatkowych, bez faksu i numerów o podwyższonej opłacie' },
            { pole: 'Strona www', zasada: 'Strona tej firmy albo tej lokalizacji', limit: 'Pełny adres z http:// lub https://, Googlebot nie może być zablokowany' },
            { pole: 'Obszar działania', zasada: 'Miasta, kody pocztowe lub inne obszary', limit: 'Do 20 obszarów, do ok. 2 godzin jazdy, bez promienia' },
            { pole: 'Zdjęcia', zasada: 'Ostre, dobrze oświetlone, bez mocnych filtrów', limit: 'JPG lub PNG, 10 KB–5 MB, zalecane 720 × 720 px, minimum 250 × 250 px' },
            { pole: 'Filmy', zasada: 'Lokal, zespół, realizacje', limit: 'Do 30 s, do 75 MB, 720p lub więcej' },
            { pole: 'Posty', zasada: 'Aktualności, oferty i wydarzenia z przyciskiem i linkiem', limit: 'Bez zakresu dat trafiają do archiwum po 6 miesiącach' },
            { pole: 'Profile społecznościowe', zasada: 'Facebook, Instagram, LinkedIn, Pinterest, TikTok, X, YouTube', limit: 'Jeden link na platformę, funkcja dostępna w wybranych regionach' },
          ],
          przypis: 'Źródła: Pomoc Profilu Firmy w Google (wytyczne, edycja profilu, obsługiwane obszary, zdjęcia, posty). Limity mogą się zmienić, więc przed edycją sprawdź komunikat w panelu.',
        },
        htmlPo: [
          '<p>Dwa pola zasługują na więcej uwagi. Kategoria główna według Google ma opisywać firmę jako całość, a nie listę usług: gabinet fizjoterapii wybiera kategorię opisującą gabinet, a nie osobne kategorie dla każdego zabiegu. Google sam dolicza kategorie ogólniejsze, więc nie trzeba ich dodawać. To, czego kategoria nie obejmuje, opisuje lista usług z krótkimi opisami.</p>',
          '<p>Opis firmy piszesz dla klienta. Google odrzuca opisy z linkami, cenami i promocjami, a opis zbudowany z fraz źle się czyta. Dobry opis w trzech, czterech zdaniach mówi, co robisz, dla kogo, w jakim obszarze i od kiedy.</p>',
        ].join(''),
      },
      {
        id: 'nap',
        h2: 'Spójność NAP: jedna wersja danych firmy w całej sieci',
        html: [
          '<p>NAP to skrót od angielskich słów name, address, phone, czyli nazwa, adres i telefon firmy. Spójny NAP oznacza, że te trzy dane brzmią tak samo w profilu Google, na stronie firmy, w katalogach, na Facebooku i w innych mapach. Google opisuje rozpoznawalność firmy między innymi liczbą witryn z linkami do firmy i liczbą opinii. Różne wersje adresu albo stary numer telefonu utrudniają połączenie wzmianek z jedną firmą, a klientowi dają nieaktualny kontakt.</p>',
          '<p>Najczęstsze różnice są drobne: „ul.” i „ulica”, numer lokalu po ukośniku albo w osobnej linii, kod pocztowy z inną miejscowością, telefon z prefiksem +48 albo bez. Porównanie znak po znaku wyłapuje też poważniejsze problemy: stary adres po przeprowadzce albo numer, którego firma już nie używa.</p>',
          '<p>Dlatego w szablonie PDF jest karta danych firmy. Wpisujesz w niej jedną, wzorcową wersję nazwy, adresu, telefonu, strony, kategorii i godzin. Na ostatniej stronie jest tabela miejsc: profil Google, stopka i strona kontaktu, dane strukturalne, Facebook, Bing Places, Apple Business Connect oraz katalogi ogólne i branżowe. Przy każdym miejscu zaznaczasz, czy nazwa, adres i telefon zgadzają się ze wzorcem.</p>',
          '<ul>',
          '<li><strong>Zacznij od własnych miejsc:</strong> profil Google i strona firmy. Te poprawisz od razu.</li>',
          '<li><strong>Potem duże katalogi i mapy</strong>, w których masz konto albo możesz przejąć wpis.</li>',
          '<li><strong>Na końcu wpisy, których nie kontrolujesz:</strong> zgłoś poprawkę przez formularz serwisu.</li>',
          '<li><strong>Zapisz datę każdej poprawki</strong>, żeby przy kolejnej zmianie danych nie zaczynać od zera.</li>',
          '</ul>',
          '<p>Dane strukturalne LocalBusiness na stronie są opcjonalne. Jeśli je masz, nazwa, adres, telefon i godziny powinny zgadzać się z profilem, a Google zaznacza, że dane strukturalne mają opisywać treść widoczną na stronie. Ogólne punkty o NAP, stronie kontaktu i danych strukturalnych są też w <a href="/narzedzia/checklista-seo">checkliście SEO</a> (obszar C). Ta lista idzie dalej: od zakładania profilu po pomiar.</p>',
        ].join(''),
      },
      {
        id: 'przyklad',
        h2: 'Przykład: fragment wypełnionej checklisty',
        html: '<p>Poniżej fragment checklisty wypełnionej dla fikcyjnej firmy hydraulicznej, która działa z mieszkania właściciela i dojeżdża do klientów w kilku dzielnicach Warszawy. Dane są przykładowe. Chodzi o to, jak zapisywać status i notatki, żeby lista od razu była planem pracy.</p>',
        tabela: {
          id: 'tabela-przyklad',
          caption: 'Przykład wypełnienia (fikcyjna firma, dane przykładowe)',
          columns: [
            { key: 'nr', label: 'Nr' },
            { key: 'punkt', label: 'Punkt' },
            { key: 'status', label: 'Status' },
            { key: 'notatka', label: 'Notatka' },
            { key: 'kto', label: 'Kto i kiedy' },
          ],
          rows: [
            { nr: 'A1', punkt: 'Firma kwalifikuje się do profilu', status: 'OK', notatka: 'Dojazd do klientów, brak lokalu', kto: '–' },
            { nr: 'A3', punkt: 'Sprawdzone istniejące profile', status: 'Do poprawy', notatka: 'W Mapach jest stary profil zweryfikowany przez byłego wspólnika', kto: 'Właściciel: prośba o prawa własności, w tym tygodniu' },
            { nr: 'A4', punkt: 'Nazwa jak na fakturach', status: 'Do poprawy', notatka: 'W projekcie nazwy dopisano „hydraulik 24h Warszawa”', kto: 'Właściciel, przed założeniem' },
            { nr: 'A5', punkt: 'Typ firmy i adres', status: 'OK', notatka: 'Firma z dojazdem, adres ukryty', kto: '–' },
            { nr: 'B3', punkt: 'Metoda weryfikacji', status: 'OK', notatka: 'Google proponuje nagranie wideo: auto z logo, narzędzia, dokumenty firmy', kto: 'Właściciel, w sobotę' },
            { nr: 'C2', punkt: 'Prawdziwe godziny', status: 'Do poprawy', notatka: 'Ustawione całą dobę, a zlecenia przyjmowane są w godzinach 7–20', kto: 'Właściciel, od razu' },
            { nr: 'C4', punkt: 'Obszar działania', status: 'Do poprawy', notatka: 'Został promień 50 km ze starej wersji panelu. Ustawić 6 dzielnic i 2 gminy', kto: 'Właściciel, w tym tygodniu' },
            { nr: 'E5', punkt: 'NAP w katalogach', status: 'Do poprawy', notatka: 'Dwa katalogi mają stary numer telefonu', kto: 'Asystentka, do końca miesiąca' },
            { nr: 'F2', punkt: 'Pozycja w Mapach z kilku miejsc', status: 'Do poprawy', notatka: 'Sprawdzana tylko z domu właściciela', kto: 'Właściciel, co miesiąc' },
          ],
        },
        htmlPo: '<p>Najpierw idą punkty, które blokują założenie: stary profil i nazwa (A3, A4). Dopóki nie są zamknięte, nie ma sensu wybierać metody weryfikacji, bo zmiana nazwy w trakcie mogłaby ją przerwać. Potem godziny i obszar działania, na końcu katalogi i pomiar. Punkt o promieniu pokazuje, po co jest kolumna notatek: sam znak „do poprawy” nie powie, co dokładnie zmienić.</p>',
      },
      {
        id: 'bledy',
        h2: 'Najczęstsze błędy przy zakładaniu wizytówki Google',
        html: [
          '<ul>',
          '<li><strong>Frazy i miasto w nazwie.</strong> „Hydraulik 24h Warszawa” zamiast nazwy z faktury. Wytyczne Google nie pozwalają na dopiski w nazwie, a za ich złamanie grozi zawieszenie profilu.</li>',
          '<li><strong>Drugi profil zamiast przejęcia starego.</strong> Duplikat myli klientów i utrudnia Google pokazanie właściwych danych. Najpierw zgłoś prawo do istniejącego profilu albo poproś o prawa własności.</li>',
          '<li><strong>Profil na koncie agencji albo pracownika.</strong> Kiedy współpraca się kończy, firma zostaje bez dostępu. Właścicielem ma być konto firmy, a agencja dostaje rolę menedżera, która nie pozwala dodawać ani usuwać użytkowników.</li>',
          '<li><strong>Wirtualne biuro albo adres, pod którym nikogo nie ma.</strong> Takie lokalizacje się nie kwalifikują. Firma bez lokalu ukrywa adres i podaje obszar działania.</li>',
          '<li><strong>Zmiany w trakcie weryfikacji pocztówką.</strong> Edycja nazwy, adresu albo kategorii i zamówienie nowego kodu unieważniają kod, który jest już w drodze.</li>',
          '<li><strong>Kategorie „na wszelki wypadek”.</strong> Google zaleca jak najmniej kategorii, możliwie dokładnych. Kategoria to rodzaj firmy, a nie lista usług.</li>',
          '<li><strong>Opinie za rabat albo tylko od zadowolonych.</strong> Zasady Map Google zakazują nagradzania opinii i wybiórczego proszenia o nie, a takie opinie Google usuwa.</li>',
          '<li><strong>Przeprowadzka bez ponownej weryfikacji i bez poprawy katalogów.</strong> Nowy adres w profilu wymaga ponownej weryfikacji, a stary adres zostaje w sieci, dopóki go nie poprawisz.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'co-dalej',
        h2: 'Po założeniu: wizytówka w Mapach i w odpowiedziach AI',
        html: [
          '<p>Założony i zweryfikowany profil to dopiero start. Google opisuje trzy czynniki, od których zależą wyniki lokalne: trafność, czyli jak profil pasuje do zapytania, odległość od szukającego i rozpoznawalność, czyli jak znana jest firma, między innymi po liczbie opinii i witryn z linkami do niej. Na odległość nie masz wpływu. Na trafność wpływasz kompletnym profilem, a na rozpoznawalność opiniami, wzmiankami i stroną firmy. Wyższego miejsca nie da się kupić: Google podaje, że za pozycję w wynikach lokalnych nie można zapłacić.</p>',
          '<p>Wizytówka liczy się też poza Mapami. W naszym teście z 4–5 listopada 2026 (model gpt-4.1-mini z wyszukiwaniem, 10 próśb o polecenie firmy) 59 z 62 linków w odpowiedziach ChatGPT prowadziło do Map Google. Google z kolei wymienia aktualne informacje w Profilu Firmy wśród rzeczy, o które warto zadbać pod kątem przeglądów AI i trybu AI. Więcej o teście piszemy na stronie o <a href="/pozycjonowanie-w-ai/chatgpt">pozycjonowaniu w ChatGPT</a>, a to, czy AI poleca Twoją firmę, sprawdzisz w <a href="/sprawdz-widocznosc-w-ai">darmowym teście widoczności w AI</a>.</p>',
          '<p>Jak prosić o opinie i jak odpowiadać na krytyczne, opisujemy w poradniku <a href="/blog/jak-pozyskiwac-opinie-google-poradnik">jak pozyskiwać opinie Google</a>, z wzorami odpowiedzi. Szerszy obraz pracy nad widocznością firmy w okolicy daje artykuł <a href="/blog/seo-lokalne-dla-firm-w-warszawie">SEO lokalne dla firm w Warszawie</a>.</p>',
          '<p>Jeśli wolisz oddać prowadzenie profilu, zobacz <a href="/pozycjonowanie-wizytowki-google">pozycjonowanie wizytówki Google</a>: kategorie, opinie, posty i pomiar pozycji z 49 punktów wokół adresu. Wizytówkę prowadzimy razem ze stroną firmy w pakiecie SEO Standard od 1 900 zł netto miesięcznie, z umową miesięczną. Firmom z Warszawy, które chcą połączyć wizytówkę ze stroną i treściami o okolicy, proponujemy <a href="/seo-lokalne-warszawa">SEO lokalne w Warszawie</a>.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Podgląd szablonu: cała checklista wizytówki Google',
      opis: `Tak wygląda zawartość szablonu: ${ile(PL_OBSZARY)} punktów w sześciu obszarach. W PDF przy każdym punkcie są pola na status (OK, do poprawy, n/d) i notatki, a do tego karta danych firmy, tabela spójności NAP i dziennik miesięczny.`,
      html: podgladHtml(PL_OBSZARY, false),
    },
    formularz: {
      h2: 'Pobierz szablon PDF',
      opis: 'Wyślemy Ci checklistę wizytówki Google w PDF do wydruku: 40 punktów z polami na status i notatki, kartę danych firmy (wzorzec NAP), tabelę spójności NAP i dziennik miesięczny.',
      etykieta: 'E-mail, na który wyślemy checklistę',
      przycisk: 'Wyślij checklistę (PDF)',
      przedmiot: 'checklistę wizytówki Google',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do checklisty wizytówki Google w PDF przyjdzie w ciągu minuty.',
    },
    kroki: [
      { name: 'Przygotuj dane firmy', text: 'Wypełnij kartę danych firmy w szablonie: nazwa jak na szyldzie, adres albo obszar działania, telefon, strona, kategoria główna i godziny. To wzorzec NAP do wszystkich kolejnych kroków.' },
      { name: 'Sprawdź, czy profil już istnieje', text: 'Wyszukaj nazwę firmy i miejscowość w Mapach Google. Niezweryfikowany profil przejmij przyciskiem „Zgłoś prawo do tej firmy”, a o zweryfikowany poproś obecnego właściciela.' },
      { name: 'Dodaj firmę do Google', text: 'Zaloguj się na konto Google firmy, wejdź na business.google.com/add i przejdź formularz: nazwa, kategoria główna, adres albo obszar działania, telefon i strona www.' },
      { name: 'Zweryfikuj firmę', text: 'Wybierz jedną z metod, które pokaże profil: telefon, SMS, e-mail, wideo albo pocztówkę. Do czasu weryfikacji nie zmieniaj nazwy, adresu ani kategorii. Ocena Google trwa do 5 dni roboczych.' },
      { name: 'Uzupełnij profil', text: 'Po weryfikacji dodaj opis do 750 znaków, godziny specjalne, usługi z opisami, zdjęcia, atrybuty i drugiego właściciela albo menedżera.' },
      { name: 'Uruchom opinie i posty', text: 'Wygeneruj link albo kod QR do prośby o opinię i wysyłaj go po każdej usłudze. Odpowiadaj na każdą opinię i publikuj posty co najmniej dwa razy w miesiącu.' },
      { name: 'Ujednolić NAP w sieci', text: 'Porównaj nazwę, adres i telefon na stronie, w katalogach, na Facebooku, w Bing Places i Apple Business Connect ze wzorcem z karty danych i popraw różnice.' },
      { name: 'Mierz co miesiąc', text: 'Zapisuj w dzienniku statystyki profilu, pozycję w Mapach z kilku miejsc i to, czy asystenci AI polecają firmę. Pełny przegląd profilu rób co kwartał.' },
    ],
    faq: [
      {
        question: 'Ile kosztuje założenie wizytówki Google?',
        answer: 'Nic. Google nie pobiera opłaty za dodanie firmy ani za zgłoszenie praw do istniejącego profilu. Płacisz tylko wtedy, gdy zlecasz założenie albo prowadzenie profilu agencji lub freelancerowi. Za pozycję w Mapach też nie da się zapłacić: według Google na wyniki lokalne wpływają trafność, odległość i rozpoznawalność firmy, a nie opłaty.',
      },
      {
        question: 'Ile trwa weryfikacja wizytówki Google?',
        answer: 'Po wykonaniu kroków weryfikacji Google sprawdza informacje do 5 dni roboczych, czasem dłużej. Przy pocztówce dochodzi czas dostawy: większość kodów przychodzi w ciągu 14 dni, a kod jest ważny 30 dni. Bywa też szybciej, na przykład gdy strona firmy jest już zweryfikowana w Google Search Console. Wtedy Google może zweryfikować profil od razu.',
      },
      {
        question: 'Czy można założyć wizytówkę Google bez adresu?',
        answer: 'Tak, jeśli dojeżdżasz do klientów i nie przyjmujesz ich u siebie. Taka firma ukrywa adres w profilu i ustawia obszar działania: do 20 miast, kodów pocztowych lub innych obszarów, w granicach około 2 godzin jazdy od siedziby. Adres i tak podajesz przy zakładaniu, bo Google potrzebuje go do weryfikacji, ale klienci go nie zobaczą.',
      },
      {
        question: 'Jak dodać firmę do Google, jeśli wizytówka już istnieje?',
        answer: 'Znajdź profil w Mapach Google. Jeśli nie jest zweryfikowany, wybierz „Zgłoś prawo do tej firmy” i przejdź weryfikację. Jeśli zweryfikował go ktoś inny, na business.google.com/add wpisz nazwę i adres firmy, a potem poproś o dostęp. Obecny właściciel ma 3 dni na odpowiedź. Jeśli milczy, czasem możesz przejąć profil przez link z e-maila z potwierdzeniem prośby.',
      },
      {
        question: 'Czy mogę dopisać miasto albo usługę do nazwy wizytówki?',
        answer: 'Nie. Nazwa w profilu ma być taka, jak na szyldzie, stronie i dokumentach firmy. Wytyczne Google wymieniają wprost, czego nie wolno dopisywać: hasła reklamowe, lokalizację, usługi, godziny i numer telefonu. Grozi za to zawieszenie profilu. Miasto pokazuje adres albo obszar działania, a usługi opisują kategorie i lista usług.',
      },
      {
        question: 'Czy agencja może założyć wizytówkę na swoim koncie?',
        answer: 'Może, ale nie powinna. Właścicielem profilu powinno być konto Google Twojej firmy, a agencja dostaje rolę menedżera. Menedżer edytuje dane, odpowiada na opinie i publikuje posty, ale nie dodaje ani nie usuwa użytkowników i nie usuwa profilu. Gdy współpraca się kończy, po prostu odbierasz mu dostęp i nie musisz odzyskiwać własnej wizytówki.',
      },
    ],
    zrodla: ZRODLA.map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Pozycjonowanie wizytówki Google', opis: 'kategorie, opinie, posty i pomiar pozycji z 49 punktów w Mapach' },
      { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', tekst: 'Jak pozyskiwać opinie Google', opis: 'proces prośby o opinię po usłudze i wzory odpowiedzi' },
      { href: '/narzedzia/checklista-seo', tekst: 'Checklista SEO', opis: '50 punktów dla całej strony: technika, on-page, wizytówka, AI i pomiar' },
      { href: '/sprawdz-widocznosc-w-ai', tekst: 'Sprawdź widoczność w AI', opis: 'czy ChatGPT, Gemini i Perplexity polecają Twoją firmę' },
      { href: '/seo-lokalne-warszawa', tekst: 'SEO lokalne w Warszawie', opis: 'wizytówka, strona i treści o okolicy w jednej usłudze' },
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Dane strukturalne: wzory JSON-LD', opis: 'wzór LocalBusiness z tymi samymi danymi NAP co w wizytówce' },
    ],
    plikNazwa: 'Checklista wizytówki Google: 40 punktów (PDF)',
  },

  en: {
    okruszek: 'Local SEO checklist',
    tag: 'Free template',
    h1: 'Local SEO checklist: set up and verify your Google Business Profile',
    lead: 'This local SEO checklist shows how to set up a Google Business Profile: go to business.google.com/add, enter your real business name, primary category, address or service area and phone number, then verify with the method Google offers. Review takes up to 5 business days. The list has 40 checks, from preparation to reviews and tracking; we’ll email you the PDF.',
    karta: {
      nazwa: 'Local SEO checklist (PDF)',
      opis: '40 checks: preparation, setup and verification, profile details, reviews and posts, NAP consistency and tracking. With a business details sheet.',
      cta: 'Get the checklist',
    },
    sekcje: [
      {
        id: 'jak-zalozyc',
        h2: 'How to set up a Google Business Profile step by step',
        html: [
          '<p>Google Business Profile, formerly Google My Business, is the listing customers see in Google Maps and next to search results: your name, address, hours, photos and reviews. Adding your business is free. Verification takes the longest, especially when Google sends the code by post.</p>',
          '<ol>',
          '<li><strong>Check whether a profile already exists.</strong> Search Google Maps for your business name and city. A Maps user or a former partner may have added it. If it’s unverified, select “Claim this business.” If someone else has verified it, request ownership: the current owner has 3 days to respond.</li>',
          '<li><strong>Sign in to your company’s Google Account.</strong> Ideally one set up with a company email address, not an employee’s personal one. Whoever verifies the business becomes the profile owner.</li>',
          '<li><strong>Go to business.google.com/add</strong> and select “Add your business to Google.” Then follow the on-screen instructions.</li>',
          '<li><strong>Enter your business name</strong> exactly as it appears on your sign and invoices. No city, services or taglines.</li>',
          '<li><strong>Choose a primary category.</strong> The category answers the question of what your business is. You can add secondary categories later when you edit the profile.</li>',
          '<li><strong>Decide on your address.</strong> If customers visit you, enter the address and check the map pin. If you travel to customers, hide the address and choose a service area.</li>',
          '<li><strong>Add your phone number and website.</strong> A number your business answers and your business’s own website.</li>',
          '<li><strong>Verify the business</strong> with the method Google offers. We cover the methods and pitfalls below.</li>',
          '</ol>',
          '<p>Once verified, you get a confirmation email, and only then is the profile fully yours: you can reply to reviews, and the photos you added become visible. You fill in the remaining fields (description, special hours, services, photos and attributes) using part C of the checklist.</p>',
          '<p>The PDF version of this local SEO checklist follows the same order. Part A covers preparing your details before you click anything. Part B covers setup and verification. Parts C to F cover the work after verification: completing the profile, reviews and posts, consistent details across the web, and tracking.</p>',
        ].join(''),
      },
      {
        id: 'kto-moze',
        h2: 'Who can have a Google Business Profile, and who can’t',
        html: '<p>Google accepts two kinds of businesses: those with premises that customers visit and those that travel to customers. A business with no in-person contact with customers, such as an online-only store, doesn’t meet that condition. Neither does a virtual office, meaning a rented mailing address where none of your staff work, or a PO box.</p>',
        tabela: {
          id: 'tabela-typy-firm',
          caption: 'Business types in Google Business Profile, based on Google’s guidelines (read on 11 Nov 2026)',
          columns: [
            { key: 'typ', label: 'Business type' },
            { key: 'przyklad', label: 'Example' },
            { key: 'adres', label: 'Address on profile' },
            { key: 'obszar', label: 'Service area' },
            { key: 'warunek', label: 'Condition' },
          ],
          rows: [
            { typ: 'Storefront', przyklad: 'Clinic, salon, shop, café', adres: 'Shown', obszar: 'Not set', warunek: 'Permanent signage with your business name at the address, customers served during stated hours' },
            { typ: 'Service-area business', przyklad: 'Plumber, cleaning company, electrician working from home', adres: 'Hidden', obszar: 'Up to 20 areas, within about 2 hours’ drive', warunek: 'One profile for the whole area you serve' },
            { typ: 'Hybrid business', przyklad: 'Garage with roadside assistance, restaurant with delivery', adres: 'Shown', obszar: 'Yes', warunek: 'Staffed premises that serve customers during stated hours' },
            { typ: 'Co-working office', przyklad: 'Law firm, accounting office', adres: 'Shown', obszar: 'Depends on the business', warunek: 'Signage, customer service and your own staff on site during business hours' },
            { typ: 'Not eligible', przyklad: 'Online-only store, virtual office, PO box', adres: '–', obszar: '–', warunek: 'No in-person contact with customers at the premises or at their location' },
          ],
          przypis: 'Source: Google Business Profile Help, guidelines for representing your business and service areas (full list of sources at the end of the page).',
        },
        htmlPo: '<p>Each location with its own team can have its own profile. A service-area business with several branches, each with its own area and staff, can have a profile for each branch. A doctor, lawyer or real estate agent who sees clients in person can have their own profile alongside the company’s. Two profiles for the same business at one address, however, are a problem: Google allows one profile per business, and duplicates make it harder to show the right information in Maps and Search.</p>',
      },
      {
        id: 'weryfikacja',
        h2: 'Google Business Profile verification: methods, timing and common problems',
        html: [
          '<p>Verification confirms that you’re authorized to represent the business. Without it you can’t edit your name or hours or reply to reviews, and the photos you add stay hidden. Google also says a verified business is more likely to show up in search results.</p>',
          '<p>Google chooses the method based on your business type, public information, region and opening hours. You can’t change it, and sometimes you need to complete more than one.</p>',
        ].join(''),
        tabela: {
          id: 'tabela-weryfikacja',
          caption: 'Google Business Profile verification methods (read on 11 Nov 2026)',
          columns: [
            { key: 'metoda', label: 'Method' },
            { key: 'jak', label: 'How it works' },
            { key: 'uwaga', label: 'Watch out for' },
          ],
          rows: [
            { metoda: 'Phone or text', jak: 'The code arrives by call or text message to your business number, and you enter it in the profile', uwaga: 'Answer in person: automated phone systems (IVR) can’t receive the code' },
            { metoda: 'Email', jak: 'You follow the steps in a message sent to the address shown on the verification screen', uwaga: 'You need access to that address' },
            { metoda: 'Live video call', jak: 'You connect with a Google support representative and show your business on camera', uwaga: 'Only during your business hours and only from your business location' },
            { metoda: 'Video recording', jak: 'You record a video showing your location, equipment and proof that you manage the business', uwaga: 'Google recommends this method when it’s available. If the video is rejected, the profile shows a notification with instructions' },
            { metoda: 'Postcard', jak: 'Google mails a 5-digit code to your business address', uwaga: 'Most codes arrive within 14 days, and the code expires after 30 days. Until then, don’t change the name, address or category' },
          ],
          przypis: 'Source: Google Business Profile Help, “Verify your business on Google.” The methods available depend on your business and region.',
        },
        htmlPo: [
          '<p>After you complete the steps, Google reviews your information for up to 5 business days, and occasionally longer. Sometimes verification is instant, for example when your website is already verified in Google Search Console. That’s why part A of the checklist includes a Search Console check: it helps with verification and with tracking traffic.</p>',
          '<p>If the verification button reappears on your profile after you finish, Google couldn’t fully verify the business. Try again or use another available method. A request for more information usually follows a change to your business details, so the simplest prevention is not to change your name, address or category during verification. Keep the code to yourself: Google never asks for it, and Google’s help pages advise against sharing it even with people who manage your profile.</p>',
        ].join(''),
      },
      {
        id: 'co-uzupelnic',
        h2: 'What to fill in after verification: profile fields and Google’s limits',
        html: '<p>Google’s help pages say it plainly: businesses with complete and accurate information are more likely to show up in local results. Each field has its own rules, though, and some mistakes, such as extra words in the business name, can get a profile suspended. The table sums up the limits and rules worth knowing before you edit. If you were looking for a Google Business Profile optimization checklist, parts C and D of the template cover the profile itself.</p>',
        tabela: {
          id: 'tabela-pola',
          caption: 'Google Business Profile fields: rules and limits (read on 11 Nov 2026)',
          columns: [
            { key: 'pole', label: 'Field' },
            { key: 'zasada', label: 'Rule' },
            { key: 'limit', label: 'Limit or requirement' },
          ],
          rows: [
            { pole: 'Name', zasada: 'Your real-world name from signage, website and documents', limit: 'No taglines, locations, services, hours or phone numbers. A name change may require verifying again' },
            { pole: 'Categories', zasada: '“This business IS a…”, as few and as specific as possible', limit: 'One primary category and up to 9 more' },
            { pole: 'Description', zasada: 'What you offer, what makes you different, how long you’ve been in business', limit: 'Up to 750 characters, no links, HTML, prices or promotions' },
            { pole: 'Hours', zasada: 'Customer-facing hours, special hours for holidays', limit: 'Appointment-only businesses shouldn’t list hours' },
            { pole: 'Phone', zasada: 'A number your business controls, ideally local', limit: 'Primary plus up to 2 more, no fax or premium-rate numbers' },
            { pole: 'Website', zasada: 'The website of this business or this location', limit: 'Full URL with http:// or https://, Googlebot must not be blocked' },
            { pole: 'Service area', zasada: 'Cities, postcodes or other areas', limit: 'Up to 20 areas, within about 2 hours’ drive, no radius' },
            { pole: 'Photos', zasada: 'In focus, well lit, no heavy filters', limit: 'JPG or PNG, 10 KB–5 MB, 720 × 720 px recommended, 250 × 250 px minimum' },
            { pole: 'Videos', zasada: 'Premises, team, completed work', limit: 'Up to 30 s, up to 75 MB, 720p or higher' },
            { pole: 'Posts', zasada: 'Updates, offers and events with a button and a link', limit: 'Without a date range, archived after 6 months' },
            { pole: 'Social profiles', zasada: 'Facebook, Instagram, LinkedIn, Pinterest, TikTok, X, YouTube', limit: 'One link per platform, available in selected regions' },
          ],
          przypis: 'Sources: Google Business Profile Help (guidelines, editing your profile, service areas, photos, posts). Limits can change, so check the message in your profile before editing.',
        },
        htmlPo: [
          '<p>Two fields deserve extra attention. Google says the primary category should describe your business as a whole, not list your services: a physiotherapy clinic picks a category that describes the clinic, not a separate category for each treatment. Google adds broader categories on its own, so you don’t need to add them. Whatever your categories don’t cover, your list of services with short descriptions does.</p>',
          '<p>Write the business description for customers. Google rejects descriptions with links, prices and promotions, and a description built from keywords reads badly. A good description says in three or four sentences what you do, for whom, in which area and since when.</p>',
        ].join(''),
      },
      {
        id: 'nap',
        h2: 'NAP consistency: one version of your business details everywhere',
        html: [
          '<p>NAP stands for name, address and phone number. NAP consistency means those three details read exactly the same in your Google profile, on your website, in directories, on Facebook and in other map apps. Google describes a business’s prominence partly through the number of websites that link to it and the number of reviews it has. Different versions of your address or an old phone number make it harder to tie those mentions to one business, and they give customers outdated contact details.</p>',
          '<p>Most differences are small: “St” versus “Street,” the unit number before or after the street, a postcode with a different town, a phone number with or without the country code. A character-by-character comparison also catches the bigger problems: an old address after a move, or a number the business no longer uses.</p>',
          '<p>That’s why the PDF template includes a business details sheet. You write one master version of your name, address, phone number, website, categories and hours. The last page has a listings table: your Google profile, website footer and contact page, structured data, Facebook, Bing Places, Apple Business Connect, and general and industry directories. For each listing, you tick whether the name, address and phone number match the master version.</p>',
          '<ul>',
          '<li><strong>Start with the places you control:</strong> your Google profile and your website. You can fix those straight away.</li>',
          '<li><strong>Then the big directories and map apps</strong> where you have an account or can claim the listing.</li>',
          '<li><strong>Finally, listings you don’t control:</strong> submit a correction through the site’s form.</li>',
          '<li><strong>Write down the date of each fix</strong> so the next change of details doesn’t start from scratch.</li>',
          '</ul>',
          '<p>LocalBusiness structured data on your website is optional. If you use it, the name, address, phone number and hours should match your profile, and Google notes that structured data must describe content visible on the page. General checks for NAP, the contact page and structured data are also in our <a href="/en/tools/seo-checklist">SEO checklist</a> (area C). This checklist goes further, from creating the profile to tracking it. Businesses with several locations will find more in our guide to <a href="/en/blog/multi-location-seo-scale-local-visibility">multi-location SEO</a>.</p>',
        ].join(''),
      },
      {
        id: 'przyklad',
        h2: 'Example: part of a completed checklist',
        html: '<p>Below is part of the checklist filled in for a fictional plumbing business that runs from the owner’s flat and travels to customers in several districts of Warsaw. The data is made up. The point is to show how to record status and notes so the list becomes a work plan right away.</p>',
        tabela: {
          id: 'tabela-przyklad',
          caption: 'Completed example (fictional business, sample data)',
          columns: [
            { key: 'nr', label: 'No.' },
            { key: 'punkt', label: 'Check' },
            { key: 'status', label: 'Status' },
            { key: 'notatka', label: 'Note' },
            { key: 'kto', label: 'Who and when' },
          ],
          rows: [
            { nr: 'A1', punkt: 'Business is eligible', status: 'OK', notatka: 'Travels to customers, no premises', kto: '–' },
            { nr: 'A3', punkt: 'Existing profiles checked', status: 'To fix', notatka: 'An old profile verified by a former partner is on Maps', kto: 'Owner: ownership request, this week' },
            { nr: 'A4', punkt: 'Name as on invoices', status: 'To fix', notatka: 'The draft name adds “24h plumber Warsaw”', kto: 'Owner, before setup' },
            { nr: 'A5', punkt: 'Business type and address', status: 'OK', notatka: 'Service-area business, address hidden', kto: '–' },
            { nr: 'B3', punkt: 'Verification method', status: 'OK', notatka: 'Google offers a video recording: branded van, tools, business documents', kto: 'Owner, on Saturday' },
            { nr: 'C2', punkt: 'Accurate hours', status: 'To fix', notatka: 'Set to open 24 hours, but jobs are taken from 7 am to 8 pm', kto: 'Owner, now' },
            { nr: 'C4', punkt: 'Service area', status: 'To fix', notatka: 'A 50 km radius is left over from the old version of the profile. Set 6 districts and 2 towns', kto: 'Owner, this week' },
            { nr: 'E5', punkt: 'NAP in directories', status: 'To fix', notatka: 'Two directories show the old phone number', kto: 'Assistant, by month end' },
            { nr: 'F2', punkt: 'Maps ranking from several locations', status: 'To fix', notatka: 'Only checked from the owner’s home', kto: 'Owner, monthly' },
          ],
        },
        htmlPo: '<p>The checks that block setup come first: the old profile and the name (A3, A4). Until they’re closed, there’s no point choosing a verification method, because changing the name midway could interrupt it. Then come hours and the service area, and finally directories and tracking. The radius check shows why the notes column matters: “to fix” on its own doesn’t say what exactly needs changing.</p>',
      },
      {
        id: 'bledy',
        h2: 'Common mistakes when setting up a Business Profile',
        html: [
          '<ul>',
          '<li><strong>Keywords and a city in the name.</strong> “24h Plumber Warsaw” instead of the name on your invoices. Google’s guidelines don’t allow extra words in the name, and breaking them can get your profile suspended.</li>',
          '<li><strong>A second profile instead of claiming the old one.</strong> Duplicates confuse customers and make it harder for Google to show the right details. Claim the existing profile or request ownership first.</li>',
          '<li><strong>A profile on an agency’s or employee’s account.</strong> When the relationship ends, the business loses access. The owner should be your company account, and the agency gets manager access, which can’t add or remove users.</li>',
          '<li><strong>A virtual office or an address where nobody works.</strong> These locations aren’t eligible. A business without premises hides its address and sets a service area.</li>',
          '<li><strong>Changes during postcard verification.</strong> Editing the name, address or category, or requesting a new code, invalidates the code already in the mail.</li>',
          '<li><strong>Categories added “just in case.”</strong> Google recommends as few categories as possible, as specific as possible. A category is the type of business, not a list of services.</li>',
          '<li><strong>Reviews for a discount, or only from happy customers.</strong> Google Maps policies prohibit rewarding reviews and asking for them selectively, and Google removes such reviews.</li>',
          '<li><strong>Moving without verifying again or fixing directories.</strong> A new address in the profile requires verifying again, and the old address stays online until you correct it.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'co-dalej',
        h2: 'After setup: Google Maps and AI answers',
        html: [
          '<p>A created and verified profile is only the start. Google describes three factors behind local results: relevance (how well the profile matches the search), distance from the searcher, and prominence (how well-known the business is, partly based on its reviews and the websites that link to it). You can’t influence distance. You improve relevance with a complete profile, and prominence with reviews, mentions and your website. You can’t buy a better position either: Google says there’s no way to pay for a higher local ranking.</p>',
          '<p>Your profile matters beyond Maps. In our test on 4–5 November 2026 (gpt-4.1-mini with web search, 10 requests to recommend a business), 59 of 62 links in ChatGPT’s answers led to Google Maps. Google, for its part, lists keeping your Business Profile information up to date among the things to check for AI Overviews and AI Mode. We describe the test on our page about <a href="/en/ai-search-optimization/chatgpt">ChatGPT optimization</a>, and you can see whether AI assistants recommend your business with our <a href="/en/ai-visibility-check">free AI visibility check</a>.</p>',
          '<p>How to ask for reviews and how to reply to critical ones is covered in our guide on <a href="/en/blog/how-to-get-google-reviews">how to get Google reviews</a>. For the wider picture of being visible to nearby customers, read <a href="/en/blog/local-seo-for-companies">local SEO for businesses</a>.</p>',
          '<p>If you’d rather hand over the profile, see our <a href="/en/google-business-profile-optimization">Google Business Profile optimization</a> service: categories, reviews, posts and ranking measured from 49 points around your address. We manage the profile together with your website in the SEO Standard package from €450 net per month, on a monthly contract. For businesses in Warsaw that want to combine the profile with their website and local content, there’s <a href="/en/local-seo-warsaw">local SEO in Warsaw</a>.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Template preview: the full local SEO checklist',
      opis: `This is what the template contains: ${ile(EN_OBSZARY)} checks in six areas. In the PDF, every check has boxes for status (OK, to fix, N/A) and space for notes, plus a business details sheet, a NAP consistency table and a monthly log.`,
      html: podgladHtml(EN_OBSZARY, true),
    },
    formularz: {
      h2: 'Get the PDF template',
      opis: 'We’ll email you the local SEO checklist as a printable PDF: 40 checks with status boxes and notes, a business details sheet (your master NAP), a NAP consistency table and a monthly log.',
      etykieta: 'Email address to send the checklist to',
      przycisk: 'Send me the checklist (PDF)',
      przedmiot: 'the local SEO checklist',
      komunikatOk: 'Sent. Check your inbox (and the Promotions or Spam folder): the link to the local SEO checklist PDF will arrive within a minute.',
    },
    kroki: [
      { name: 'Prepare your business details', text: 'Fill in the business details sheet in the template: name as on your sign, address or service area, phone number, website, primary category and hours. This is your master NAP for every next step.' },
      { name: 'Check whether a profile already exists', text: 'Search Google Maps for your business name and city. Claim an unverified profile with “Claim this business,” and request a verified one from its current owner.' },
      { name: 'Add your business to Google', text: 'Sign in to your company’s Google Account, go to business.google.com/add and complete the form: name, primary category, address or service area, phone number and website.' },
      { name: 'Verify the business', text: 'Choose one of the methods your profile shows: phone, text, email, video or postcard. Don’t change the name, address or category until you’re verified. Google’s review takes up to 5 business days.' },
      { name: 'Complete the profile', text: 'After verification, add a description of up to 750 characters, special hours, services with descriptions, photos, attributes and a second owner or a manager.' },
      { name: 'Start reviews and posts', text: 'Create a review link or QR code and send it after every job. Reply to every review and publish posts at least twice a month.' },
      { name: 'Make your NAP consistent', text: 'Compare the name, address and phone number on your website, in directories, on Facebook, in Bing Places and in Apple Business Connect with your master details, and fix any differences.' },
      { name: 'Track it every month', text: 'Record your profile performance, your Maps ranking from several locations and whether AI assistants recommend you in the log. Review the whole profile every quarter.' },
    ],
    faq: [
      {
        question: 'How much does it cost to create a Google Business Profile?',
        answer: 'Nothing. Google doesn’t charge for adding a business or claiming an existing profile. You only pay if you hire an agency or freelancer to set up or manage it. You can’t pay for a better Maps ranking either: according to Google, local results depend on relevance, distance and prominence, not on payments.',
      },
      {
        question: 'How long does Google Business Profile verification take?',
        answer: 'After you complete the verification steps, Google reviews your information for up to 5 business days, sometimes longer. With a postcard, add delivery time: most codes arrive within 14 days, and the code is valid for 30 days. It can be faster, for example when your website is already verified in Google Search Console, in which case Google may verify the profile instantly.',
      },
      {
        question: 'Can I create a Google Business Profile without showing an address?',
        answer: 'Yes, if you travel to customers and don’t serve them at your premises. Such a business hides its address and sets a service area: up to 20 cities, postcodes or other areas, within about 2 hours’ drive of its base. You still enter an address during setup because Google needs it for verification, but customers won’t see it.',
      },
      {
        question: 'What if a profile for my business already exists?',
        answer: 'Find it in Google Maps. If it’s unverified, select “Claim this business” and complete verification. If someone else has verified it, go to business.google.com/add, enter your business name and address, then request access. The current owner has 3 days to respond. If they don’t, you may be able to claim the profile through the link in your request confirmation email.',
      },
      {
        question: 'Can I add my city or services to the business name?',
        answer: 'No. The name on your profile must match your signage, website and business documents. Google’s guidelines spell out what you can’t add: taglines, locations, services, hours and phone numbers. Doing so can get your profile suspended. Your address or service area shows the city, and your categories and service list describe what you do.',
      },
      {
        question: 'Should my agency set up the profile on its own account?',
        answer: 'It can, but it shouldn’t. Your company’s Google Account should own the profile, and the agency should get manager access. A manager can edit details, reply to reviews and publish posts, but can’t add or remove users or delete the profile. When the relationship ends, you simply remove their access instead of trying to recover your own listing.',
      },
    ],
    zrodla: ZRODLA.map(([url, , nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Google Business Profile management', opis: 'categories, reviews, posts and ranking measured on a 49-point map grid' },
      { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', tekst: 'How to get Google reviews', opis: 'a review request process after every job' },
      { href: '/narzedzia/checklista-seo', tekst: 'SEO checklist', opis: '50 checks for your whole website: technical, on-page, local, AI readiness and tracking' },
      { href: '/sprawdz-widocznosc-w-ai', tekst: 'AI visibility check', opis: 'see whether ChatGPT, Gemini and Perplexity recommend your business' },
      { href: '/seo-lokalne-warszawa', tekst: 'Local SEO in Warsaw', opis: 'your profile, website and local content in one service' },
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Schema markup examples', opis: 'a LocalBusiness template with the same NAP data as your profile' },
    ],
    plikNazwa: 'Local SEO checklist: 40 checks (PDF)',
  },
};
