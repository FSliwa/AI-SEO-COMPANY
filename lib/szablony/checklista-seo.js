// Szablon: checklista SEO (11.11.2026). Ogólna lista kontrolna SEO, jeden obszar na stronę PDF:
// podstawy techniczne, on-page, SEO lokalne, gotowość na AI, pomiar (50 punktów z priorytetem).
// Kanibalizacja: głęboki audyt techniczny to /blog/audyt-techniczny-seo (EN technical-seo-audit-checklist);
// ta strona jest ogólna i linkuje do poradnika po szczegóły.
// PDF: public/pliki/checklista-seo.pdf (PL) i seo-checklist.pdf (EN), źródła HTML w scripts/szablony/pdf/.
// PUNKTY (eksport nazwany) = jedno źródło listy dla podglądu na stronie i dla PDF.
// Reguły Google i botów AI w tekście: tylko z dokumentacji z listy zrodla (odczyt 11.11.2026).

const PL_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Podstawy techniczne',
    h3: 'A. Podstawy techniczne SEO (10 punktów)',
    punkty: [
      ['A1', 'Strona działa na HTTPS, a adresy z http:// przekierowują na https://', 'Wpisz adres strony z http:// i sprawdź, czy przeglądarka przechodzi na https:// bez ostrzeżeń.', 'wysoki'],
      ['A2', 'Działa jedna wersja domeny (z www albo bez), a druga przekierowuje na nią jednym przekierowaniem', 'Otwórz obie wersje adresu. Obie mają kończyć się na tej samej stronie, bez łańcucha przekierowań.', 'wysoki'],
      ['A3', 'Plik robots.txt nie blokuje stron, które mają być w Google', 'Otwórz twojadomena.pl/robots.txt. Szukaj „Disallow: /” i reguł dla katalogów z ofertą lub blogiem.', 'wysoki'],
      ['A4', 'Ważne strony nie mają znacznika noindex', 'Search Console → Sprawdzenie adresu URL dla strony głównej i stron usług: indeksowanie ma być dozwolone.', 'wysoki'],
      ['A5', 'Mapa witryny XML zawiera tylko kanoniczne adresy, które działają, i jest wpisana do robots.txt', 'Otwórz sitemap.xml i robots.txt (linia „Sitemap:”). Usuń z mapy przekierowania, błędy 404 i strony z noindex.', 'średni'],
      ['A6', 'Każda strona ma tag canonical wskazujący na siebie albo na właściwą wersję', 'Podejrzyj źródło strony (<code>rel="canonical"</code>) albo uruchom darmowy audyt SEO.', 'średni'],
      ['A7', 'Linki wewnętrzne nie prowadzą do stron 404 ani przez przekierowania', 'Crawler albo raport Strony w Search Console. Popraw link u źródła, a nie tylko przekierowanie.', 'średni'],
      ['A8', 'Strona jest wygodna na telefonie: bez poziomego przewijania, z czytelnym tekstem i dużymi przyciskami', 'Otwórz stronę główną, stronę usługi i kontakt na telefonie. Wyślij formularz od początku do końca.', 'wysoki'],
      ['A9', 'Core Web Vitals w normie: LCP do 2,5 s, INP poniżej 200 ms, CLS poniżej 0,1', 'Search Console → Podstawowe wskaźniki internetowe (dane od użytkowników). Lighthouse służy do szukania przyczyn.', 'średni'],
      ['A10', 'Adresy URL są krótkie i czytelne: słowa zamiast losowych identyfikatorów', 'Przejrzyj adresy w mapie witryny. Nie zmieniaj działających adresów bez przekierowań 301.', 'niski'],
    ],
  },
  {
    id: 'B',
    nazwa: 'On-page',
    h3: 'B. SEO on-page: title, description, nagłówki, treść, linki, obrazy (14 punktów)',
    punkty: [
      ['B1', 'Każda strona ma własny title, który opisuje jej treść', 'Crawler albo darmowy audyt: posortuj tytuły, znajdź duplikaty i braki.', 'wysoki'],
      ['B2', 'Title zaczyna się od najważniejszej informacji, nie powtarza słów, a nazwa marki stoi na końcu', 'Sprawdź swój wynik w Google. Google skraca tytuł do szerokości ekranu, więc fraza nie może być na końcu długiego tytułu.', 'średni'],
      ['B3', 'Ważne strony mają unikalny meta description, który streszcza treść i zachęca do kliknięcia', 'Crawler: znajdź puste i powtórzone opisy. Google czasem pokazuje inny fragment strony, więc opis to podpowiedź.', 'średni'],
      ['B4', 'Strona ma jeden nagłówek H1, który mówi, o czym jest, i zawiera frazę główną', 'Wtyczka SEO do przeglądarki albo źródło strony: policz znaczniki h1.', 'wysoki'],
      ['B5', 'Nagłówki H2 i H3 dzielą treść na sekcje, które odpowiadają na pytania klientów', 'Przeczytaj same nagłówki. Czy wystarczą, żeby zrozumieć, co jest na stronie?', 'średni'],
      ['B6', 'Treść odpowiada na intencję frazy: przy usłudze zakres, cena i proces, przy pytaniu konkretna odpowiedź', 'Wpisz frazę w Google i porównaj typ stron z pierwszej dziesiątki ze swoją stroną.', 'wysoki'],
      ['B7', 'Pierwszy akapit odpowiada na główne pytanie wprost i zawiera frazę główną', 'Przeczytaj tylko pierwszy akapit. Czy klient wie już, co oferujesz i gdzie?', 'średni'],
      ['B8', 'Dwie strony nie walczą o tę samą frazę (kanibalizacja)', 'Search Console → Skuteczność → filtr zapytania → karta Strony. Kilka adresów przy jednej frazie to sygnał do decyzji.', 'średni'],
      ['B9', 'Treść jest aktualna: ceny, nazwy usług, dane kontaktowe i daty', 'Przejrzyj strony usług i cennik. Przy artykułach pokaż datę aktualizacji.', 'średni'],
      ['B10', 'Każda ważna strona ma linki wewnętrzne z innych stron (menu, treść, stopka)', 'Crawler: znajdź strony bez linków przychodzących. Dodaj link z tematycznie bliskiej strony.', 'wysoki'],
      ['B11', 'Tekst linków opisuje stronę docelową („audyt SEO strony”, a nie „kliknij tutaj”)', 'Przejrzyj linki w treści najważniejszych stron.', 'średni'],
      ['B12', 'Obrazy mają opisowy tekst alternatywny (alt) dopasowany do strony, bez upychania fraz', 'Crawler: obrazy bez alt. Opisz obraz tak, jak opisałbyś go osobie, która go nie widzi.', 'średni'],
      ['B13', 'Pliki obrazów mają opisowe nazwy, nowoczesny format (WebP lub AVIF) i ustawione wymiary', 'Sprawdź nazwy plików w bibliotece mediów i raport Lighthouse.', 'niski'],
      ['B14', 'Widać, kto stoi za stroną: nazwa firmy, kontakt, autor treści eksperckich', 'Sprawdź stopkę, stronę „O nas” i podpisy artykułów.', 'średni'],
    ],
  },
  {
    id: 'C',
    nazwa: 'SEO lokalne',
    h3: 'C. SEO lokalne: wizytówka Google i NAP (9 punktów)',
    punkty: [
      ['C1', 'Firma ma zweryfikowany Profil Firmy w Google, jeden na lokalizację', 'Wyszukaj nazwę firmy w Google i w Mapach. Zgłoś duplikaty do usunięcia lub scalenia.', 'wysoki'],
      ['C2', 'Nazwa w wizytówce to prawdziwa nazwa firmy, bez dopisanych fraz, miasta i haseł', 'Porównaj nazwę z szyldem, fakturą i stroną.', 'wysoki'],
      ['C3', 'Kategoria główna opisuje, czym firma jest, a kategorii dodatkowych jest jak najmniej', 'Panel wizytówki → kategorie. Kategoria to rodzaj firmy, a nie lista usług.', 'wysoki'],
      ['C4', 'NAP (nazwa, adres, telefon) jest identyczny na stronie, w wizytówce i w katalogach firm', 'Wpisz NAP z każdego miejsca do jednej tabeli i porównaj znak po znaku.', 'wysoki'],
      ['C5', 'Firma, która nie przyjmuje klientów pod adresem, ukrywa adres i ustawia obszar działania', 'Panel wizytówki → lokalizacja i obszar działalności.', 'średni'],
      ['C6', 'Godziny otwarcia są aktualne, a święta mają godziny specjalne', 'Sprawdź wizytówkę przed każdym długim weekendem i świętami.', 'średni'],
      ['C7', 'Strona ma podstronę kontaktu z NAP zapisanym tekstem (nie obrazkiem), mapą i dojazdem', 'Spróbuj zaznaczyć adres myszką: jeśli się nie da, jest obrazkiem. Przy kilku lokalizacjach: osobna strona dla każdej.', 'średni'],
      ['C8', 'Opinie spływają na bieżąco, a każda ma odpowiedź firmy', 'Panel wizytówki → opinie. Odpowiadaj także na krytyczne, rzeczowo i bez danych klienta.', 'średni'],
      ['C9', 'Wizytówka ma aktualne zdjęcia miejsca, zespołu lub realizacji i uzupełnioną listę usług', 'Porównaj ją z wizytówkami firm z pierwszej trójki w Mapach.', 'niski'],
    ],
  },
  {
    id: 'D',
    nazwa: 'Gotowość na AI',
    h3: 'D. Gotowość na AI: boty, dane strukturalne, llms.txt (8 punktów)',
    punkty: [
      ['D1', 'robots.txt wpuszcza boty wyszukiwarek AI: OAI-SearchBot (ChatGPT), PerplexityBot, Claude-SearchBot', 'Otwórz robots.txt. Szukaj tych nazw oraz reguły „User-agent: *” z „Disallow: /”.', 'wysoki'],
      ['D2', 'Decyzja o botach treningowych (GPTBot, ClaudeBot, Google-Extended) jest świadoma i zapisana', 'Zapisz w szablonie, czy je wpuszczasz. Blokada Google-Extended nie wpływa na wyniki wyszukiwania Google.', 'średni'],
      ['D3', 'Zapora sieciowa (WAF) albo CDN nie blokuje botów, które wpuszcza robots.txt', 'Sprawdź ustawienia ochrony przed botami u dostawcy hostingu lub CDN i logi serwera.', 'średni'],
      ['D4', 'Najważniejsze treści (oferta, ceny, kontakt) są w HTML, a nie tylko na grafikach lub w plikach PDF', 'Zaznacz tekst na stronie i podejrzyj źródło. Tekst zapisany tylko na grafice trudno odczytać każdemu robotowi.', 'średni'],
      ['D5', 'Dane strukturalne Organization lub LocalBusiness w JSON-LD są zgodne z tym, co widać na stronie', 'Test wyników z elementami rozszerzonymi albo walidator schema.org. Nazwa, adres i telefon jak w wizytówce.', 'średni'],
      ['D6', 'Strona „O nas” podaje jasne fakty: czym się zajmujecie, gdzie i dla kogo', 'Przeczytaj ją oczami kogoś, kto nie zna firmy. Opis firmy ma brzmieć tak samo w wizytówce i w profilach.', 'średni'],
      ['D7', 'Odpowiedzi na typowe pytania klientów (cena, czas, przebieg) są na stronie w krótkich, samodzielnych akapitach', 'Wypisz pytania, które klienci zadają przez telefon. Czy każde ma odpowiedź na stronie?', 'średni'],
      ['D8', 'Opcjonalnie: plik llms.txt w katalogu głównym z opisem firmy i linkami do najważniejszych stron', 'Otwórz twojadomena.pl/llms.txt. Google nie wymaga go do przeglądów AI, więc zrób go po punktach wyżej.', 'niski'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Pomiar',
    h3: 'E. Pomiar: Search Console i GA4 (9 punktów)',
    punkty: [
      ['E1', 'Search Console obejmuje całą domenę, a właścicielem jest konto firmy', 'Search Console → Ustawienia → Użytkownicy i uprawnienia. Agencja może mieć dostęp, ale nie jako jedyny właściciel.', 'wysoki'],
      ['E2', 'Mapa witryny jest przesłana w raporcie Mapy witryn i nie ma błędów przetwarzania', 'Search Console → Mapy witryn: status „Sukces” i liczba wykrytych adresów.', 'średni'],
      ['E3', 'Raport Strony jest przejrzany: ważne strony są zaindeksowane, a powody wykluczeń zrozumiałe', 'Search Console → Strony. Zacznij od stron usług i kontaktu.', 'wysoki'],
      ['E4', 'GA4 działa na wszystkich stronach jednym tagiem, a usługa należy do firmy', 'Podgląd w Google Tag Assistant albo raport Czas rzeczywisty w GA4.', 'wysoki'],
      ['E5', 'Zdarzenia kluczowe w GA4 mierzą działania klientów: formularz, kliknięcie w telefon i w e-mail', 'GA4 → Administracja → Zdarzenia kluczowe. Wyślij testowy formularz i sprawdź, czy zdarzenie się pojawia.', 'wysoki'],
      ['E6', 'GA4 jest połączone z Search Console', 'GA4 → Administracja → Połączenia z usługami → Search Console.', 'niski'],
      ['E7', 'Lista fraz do śledzenia jest uzgodniona i zapisana, a pozycje mierzysz co miesiąc tą samą metodą', 'Zapisz frazy, lokalizację i urządzenie pomiaru. Zmiana metody psuje porównania.', 'średni'],
      ['E8', 'Stały zestaw pytań klientów sprawdzasz co miesiąc w ChatGPT, Gemini, Perplexity i przeglądach AI Google', 'Zapisz pytania i wynik: czy firma jest wymieniona i które źródła są cytowane.', 'średni'],
      ['E9', 'Stan wyjściowy jest zapisany przed zmianami, a wyniki porównujesz rok do roku', 'Zapisz datę, kliknięcia bez zapytań o markę i liczbę zapytań od klientów z GA4.', 'wysoki'],
    ],
  },
];

const EN_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Technical basics',
    h3: 'A. Technical SEO checklist: the basics (10 checks)',
    punkty: [
      ['A1', 'The site runs on HTTPS, and http:// URLs redirect to https://', 'Type your address with http:// and confirm the browser lands on https:// with no warning.', 'high'],
      ['A2', 'Only one version of the domain resolves (www or non-www), and the other redirects to it in a single hop', 'Open both versions. They should end on the same page without a redirect chain.', 'high'],
      ['A3', 'robots.txt does not block pages you want in Google', 'Open yourdomain.com/robots.txt. Look for "Disallow: /" and for rules covering your service or blog folders.', 'high'],
      ['A4', 'Important pages carry no noindex tag', 'Search Console → URL Inspection on the homepage and service pages: indexing should be allowed.', 'high'],
      ['A5', 'The XML sitemap lists only canonical URLs that work, and robots.txt points to it', 'Open sitemap.xml and robots.txt (the "Sitemap:" line). Remove redirects, 404s and noindexed pages from the sitemap.', 'medium'],
      ['A6', 'Every page has a canonical tag pointing to itself or to the preferred version', 'View the page source (<code>rel="canonical"</code>) or run the free SEO audit.', 'medium'],
      ['A7', 'Internal links don’t point to 404 pages or pass through redirects', 'Use a crawler or the Pages report in Search Console. Fix the link at the source, not just the redirect.', 'medium'],
      ['A8', 'The site is easy to use on a phone: no sideways scrolling, readable text, buttons that are easy to tap', 'Open the homepage, a service page and the contact page on a phone. Submit the form end to end.', 'high'],
      ['A9', 'Core Web Vitals pass: LCP within 2.5 s, INP under 200 ms, CLS under 0.1', 'Search Console → Core Web Vitals (real-user data). Use Lighthouse to find the causes.', 'medium'],
      ['A10', 'URLs are short and readable: words instead of random IDs', 'Scan the URLs in your sitemap. Never change working URLs without 301 redirects.', 'low'],
    ],
  },
  {
    id: 'B',
    nazwa: 'On-page',
    h3: 'B. On-page SEO checklist: titles, descriptions, headings, content, links, images (14 checks)',
    punkty: [
      ['B1', 'Every page has its own title that describes its content', 'Run a crawler or the free audit, sort the titles, and find duplicates and blanks.', 'high'],
      ['B2', 'Titles lead with the most important information, don’t repeat words, and put the brand at the end', 'Check your listing in Google. Titles get truncated to fit the screen, so the key phrase can’t sit at the end of a long title.', 'medium'],
      ['B3', 'Key pages have a unique meta description that sums up the page and earns the click', 'Crawler: find empty and duplicate descriptions. Google sometimes shows a different snippet, so treat yours as a suggestion.', 'medium'],
      ['B4', 'Each page has one H1 that says what the page is about and includes the primary keyword', 'Use an SEO browser extension or view the source and count the h1 tags.', 'high'],
      ['B5', 'H2 and H3 headings split the content into sections that answer customer questions', 'Read the headings alone. Do they tell you what the page covers?', 'medium'],
      ['B6', 'The content matches search intent: scope, price and process for a service, a direct answer for a question', 'Search the keyword and compare the kind of pages in the top 10 with yours.', 'high'],
      ['B7', 'The first paragraph answers the main question directly and includes the primary keyword', 'Read only the first paragraph. Does a customer already know what you offer and where?', 'medium'],
      ['B8', 'No two pages compete for the same keyword (cannibalization)', 'Search Console → Performance → filter by query → Pages tab. Several URLs on one query call for a decision.', 'medium'],
      ['B9', 'Content is current: prices, service names, contact details and dates', 'Review service pages and pricing. Show an “updated” date on articles.', 'medium'],
      ['B10', 'Every important page gets internal links from other pages (menu, body copy, footer)', 'Crawler: find pages with no incoming links. Add a link from a closely related page.', 'high'],
      ['B11', 'Link text describes the target page (“technical SEO audit,” not “click here”)', 'Review the links in the body copy of your key pages.', 'medium'],
      ['B12', 'Images have descriptive alt text that fits the page, with no keyword stuffing', 'Crawler: images without alt. Describe the image the way you would to someone who can’t see it.', 'medium'],
      ['B13', 'Image files have descriptive names, a modern format (WebP or AVIF) and set dimensions', 'Check file names in your media library and the Lighthouse report.', 'low'],
      ['B14', 'It’s clear who is behind the site: company name, contact details, author of expert content', 'Check the footer, the About page and article bylines.', 'medium'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Local SEO',
    h3: 'C. Local SEO: Google Business Profile and NAP (9 checks)',
    punkty: [
      ['C1', 'The business has a verified Google Business Profile, one per location', 'Search your business name in Google and Maps. Report duplicates for removal or merging.', 'high'],
      ['C2', 'The profile name is your real-world business name, with no added keywords, city or tagline', 'Compare it with your signage, invoices and website.', 'high'],
      ['C3', 'The primary category says what the business is, and additional categories are kept to a minimum', 'Profile dashboard → categories. A category is a type of business, not a list of services.', 'high'],
      ['C4', 'NAP (name, address, phone) is identical on your site, your profile and business directories', 'Copy the NAP from each place into one table and compare it character by character.', 'high'],
      ['C5', 'A business that doesn’t serve customers at its address hides the address and sets a service area', 'Profile dashboard → location and service area.', 'medium'],
      ['C6', 'Opening hours are current, and holidays have special hours', 'Check the profile before every long weekend and public holiday.', 'medium'],
      ['C7', 'The site has a contact page with the NAP as text (not an image), a map and directions', 'Try to select the address with your mouse. If you can’t, it’s an image. Several locations: one page each.', 'medium'],
      ['C8', 'Reviews come in steadily, and each one gets a reply from the business', 'Profile dashboard → reviews. Reply to critical reviews too, factually and without customer details.', 'medium'],
      ['C9', 'The profile has current photos of the premises, team or work, and a complete list of services', 'Compare it with the profiles you see in the top three map results.', 'low'],
    ],
  },
  {
    id: 'D',
    nazwa: 'AI readiness',
    h3: 'D. AI readiness: bots, structured data, llms.txt (8 checks)',
    punkty: [
      ['D1', 'robots.txt lets AI search bots in: OAI-SearchBot (ChatGPT), PerplexityBot, Claude-SearchBot', 'Open robots.txt. Look for these names and for a "User-agent: *" group with "Disallow: /".', 'high'],
      ['D2', 'Your decision on training bots (GPTBot, ClaudeBot, Google-Extended) is deliberate and written down', 'Note in the template whether you allow them. Blocking Google-Extended does not affect Google Search.', 'medium'],
      ['D3', 'Your firewall (WAF) or CDN doesn’t block the bots that robots.txt allows', 'Check the bot protection settings at your host or CDN, and your server logs.', 'medium'],
      ['D4', 'Key content (offer, prices, contact) is in the HTML, not only in images or PDF files', 'Select the text on the page and view the source. Text that exists only in a graphic is hard for any crawler to read.', 'medium'],
      ['D5', 'Organization or LocalBusiness structured data in JSON-LD matches what’s visible on the page', 'Rich Results Test or the schema.org validator. Name, address and phone as in your profile.', 'medium'],
      ['D6', 'The About page states clear facts: what you do, where and for whom', 'Read it as someone who has never heard of you. Your company description should read the same on your profile and social accounts.', 'medium'],
      ['D7', 'Answers to common customer questions (price, timing, process) are on the site in short, self-contained paragraphs', 'List the questions customers ask on the phone. Does each one have an answer on the site?', 'medium'],
      ['D8', 'Optional: an llms.txt file at the site root with a company summary and links to key pages', 'Open yourdomain.com/llms.txt. Google doesn’t require it for AI Overviews, so do it after the checks above.', 'low'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Measurement',
    h3: 'E. Measurement: Search Console and GA4 (9 checks)',
    punkty: [
      ['E1', 'Search Console covers the whole domain, and a company account is the owner', 'Search Console → Settings → Users and permissions. Your agency can have access, but not as the only owner.', 'high'],
      ['E2', 'The sitemap is submitted in the Sitemaps report and shows no processing errors', 'Search Console → Sitemaps: status “Success” and the number of discovered URLs.', 'medium'],
      ['E3', 'The Pages report has been reviewed: key pages are indexed and exclusion reasons are understood', 'Search Console → Pages. Start with service and contact pages.', 'high'],
      ['E4', 'GA4 runs on every page through a single tag, and the company owns the property', 'Google Tag Assistant preview or the Realtime report in GA4.', 'high'],
      ['E5', 'GA4 key events track customer actions: form submissions, phone clicks and email clicks', 'GA4 → Admin → Key events. Submit a test form and check that the event shows up.', 'high'],
      ['E6', 'GA4 is linked to Search Console', 'GA4 → Admin → Product links → Search Console links.', 'low'],
      ['E7', 'The keyword list you track is agreed and written down, and you measure rankings the same way every month', 'Record keywords, location and device. Changing the method breaks comparisons.', 'medium'],
      ['E8', 'A fixed set of customer questions is checked monthly in ChatGPT, Gemini, Perplexity and Google AI Overviews', 'Record the questions and the outcome: is your business named, and which sources are cited?', 'medium'],
      ['E9', 'A baseline is recorded before any changes, and results are compared year over year', 'Record the date, non-brand clicks and customer inquiries from GA4.', 'high'],
    ],
  },
];

/** Lista punktów dla PDF (scripts/szablony/pdf) i podglądu. */
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

const ZRODLA = [
  ['https://developers.google.com/search/docs/appearance/title-link', 'Google Search Central: linki tytułowe w wynikach wyszukiwania', 'Google Search Central: Influencing your title links'],
  ['https://developers.google.com/search/docs/appearance/snippet', 'Google Search Central: fragmenty i meta description', 'Google Search Central: Control your snippets in search results'],
  ['https://developers.google.com/search/docs/appearance/google-images', 'Google Search Central: sprawdzone metody dotyczące obrazów', 'Google Search Central: Google Images SEO best practices'],
  ['https://developers.google.com/search/docs/fundamentals/seo-starter-guide', 'Google Search Central: przewodnik dla początkujących SEO', 'Google Search Central: SEO Starter Guide'],
  ['https://developers.google.com/search/docs/appearance/core-web-vitals', 'Google Search Central: Core Web Vitals', 'Google Search Central: Understanding Core Web Vitals'],
  ['https://developers.google.com/search/docs/crawling-indexing/robots/intro', 'Google Search Central: wprowadzenie do robots.txt', 'Google Search Central: Introduction to robots.txt'],
  ['https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap', 'Google Search Central: tworzenie i przesyłanie mapy witryny', 'Google Search Central: Build and submit a sitemap'],
  ['https://developers.google.com/search/docs/appearance/structured-data/sd-policies', 'Google Search Central: ogólne wskazówki dotyczące danych strukturalnych', 'Google Search Central: General structured data guidelines'],
  ['https://developers.google.com/search/docs/appearance/structured-data/local-business', 'Google Search Central: dane strukturalne LocalBusiness', 'Google Search Central: Local business (LocalBusiness) structured data'],
  ['https://developers.google.com/search/docs/appearance/ai-features', 'Google Search Central: funkcje AI w wyszukiwarce a Twoja strona', 'Google Search Central: AI features and your website'],
  ['https://developers.google.com/search/docs/crawling-indexing/google-common-crawlers', 'Google Search Central: roboty Google (Google-Extended)', 'Google Search Central: Google’s common crawlers (Google-Extended)'],
  ['https://support.google.com/business/answer/3038177', 'Pomoc Profilu Firmy w Google: wytyczne dotyczące przedstawiania firmy', 'Google Business Profile Help: Guidelines for representing your business'],
  ['https://support.google.com/analytics/answer/13965727', 'Pomoc Google Analytics: zdarzenia kluczowe', 'Google Analytics Help: About key events'],
  ['https://developers.openai.com/api/docs/bots', 'OpenAI: roboty OpenAI (OAI-SearchBot, GPTBot, ChatGPT-User)', 'OpenAI: Overview of OpenAI crawlers'],
  ['https://docs.perplexity.ai/guides/bots', 'Perplexity: roboty Perplexity (PerplexityBot, Perplexity-User)', 'Perplexity: Perplexity crawlers'],
  ['https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler', 'Anthropic: roboty ClaudeBot, Claude-SearchBot i Claude-User', 'Anthropic: Does Anthropic crawl data from the web, and how can site owners block the crawler?'],
  ['https://llmstxt.org/', 'llmstxt.org: propozycja pliku llms.txt', 'llmstxt.org: The /llms.txt file proposal'],
];

export default {
  slug: 'checklista-seo',
  sciezkaEn: '/tools/seo-checklist',
  plik: 'checklista-seo',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'checklista seo', en: 'seo checklist' },
  frazyDodatkowe: {
    pl: ['audyt seo checklista', 'lista kontrolna seo'],
    en: ['on page seo checklist', 'technical seo checklist', 'seo audit checklist'],
  },
  seo: {
    pl: {
      tytul: 'Checklista SEO: 50 punktów kontrolnych + szablon PDF',
      opis: 'Checklista SEO w 50 punktach: technika, on-page, SEO lokalne, gotowość na AI i pomiar. Z priorytetami, przykładem wypełnienia i darmowym PDF.',
    },
    en: {
      tytul: 'SEO checklist: 50 checks + free PDF template (2026)',
      opis: 'A 50-point SEO checklist for technical basics, on-page SEO, local SEO, AI readiness and measurement, with priorities, an example and a free PDF.',
    },
  },

  pl: {
    okruszek: 'Checklista SEO',
    tag: 'Szablon do pobrania',
    h1: 'Checklista SEO 2026: 50 punktów, które sprawdzisz sam',
    lead: 'Checklista SEO to lista punktów kontrolnych, które pokazują, czy strona ma podstawy potrzebne do widoczności w Google i w odpowiedziach AI. Nasza ma 50 punktów w pięciu obszarach: technika, on-page, SEO lokalne, gotowość na AI i pomiar. Każdy ma priorytet i sposób sprawdzenia. Całą listę zobaczysz niżej, a szablon PDF wyślemy e-mailem.',
    karta: {
      nazwa: 'Checklista SEO (PDF)',
      opis: '50 punktów w pięciu obszarach: technika, on-page, SEO lokalne, gotowość na AI i pomiar. Każdy z priorytetem i sposobem sprawdzenia.',
      cta: 'Pobierz checklistę',
    },
    sekcje: [
      {
        id: 'czym-jest',
        h2: 'Czym jest checklista SEO i kiedy ją wypełnić',
        html: [
          '<p>Checklista SEO to lista konkretnych punktów, które da się sprawdzić i odhaczyć: tak albo nie, bez interpretacji. Nie zastępuje strategii ani pracy nad treścią. Pokazuje za to, czy strona ma fundamenty, bez których pozycjonowanie nie ruszy: czy Google ją widzi, czy rozumie, o czym jest, czy firma jest spójnie opisana w Mapach i czy w ogóle mierzysz, ile zapytań przynosi wyszukiwarka.</p>',
          '<p>Ta lista jest ogólna. Obejmuje pięć obszarów, a każdy z nich zajmuje osobną stronę szablonu PDF. Jeśli potrzebujesz głębszej analizy technicznej – logów serwera, renderowania, budżetu indeksowania albo migracji – sięgnij po nasz <a href="/blog/audyt-techniczny-seo">poradnik audytu technicznego SEO</a>.</p>',
          '<p>Kiedy z niej skorzystać:</p>',
          '<ul>',
          '<li><strong>przed startem nowej strony</strong> albo po przebudowie, zanim nowa wersja trafi do Google;</li>',
          '<li><strong>raz na kwartał</strong> jako przegląd stanu strony;</li>',
          '<li><strong>po większej zmianie</strong>: nowy CMS, nowe adresy stron, nowe usługi, przeprowadzka firmy;</li>',
          '<li><strong>przed rozmową z agencją</strong>, żeby wiedzieć, o co pytać i co sprawdzać w raportach.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'obszary',
        h2: 'Lista kontrolna SEO w pięciu obszarach',
        html: '<p>Punkty są pogrupowane tak, jak zwykle wygląda praca nad stroną: od tego, czy Google w ogóle może ją odczytać, przez treść i wizytówkę, po pomiar efektów.</p>',
        tabela: {
          id: 'tabela-obszary',
          caption: 'Checklista SEO: pięć obszarów i 50 punktów kontrolnych',
          columns: [
            { key: 'obszar', label: 'Obszar' },
            { key: 'punkty', label: 'Punkty' },
            { key: 'sprawdza', label: 'Co sprawdza' },
            { key: 'narzedzia', label: 'Czego potrzebujesz' },
          ],
          rows: [
            { obszar: 'A. Podstawy techniczne', punkty: '10', sprawdza: 'Czy Google może wejść na stronę, zaindeksować ją i wygodnie wyświetlić na telefonie', narzedzia: 'robots.txt, Search Console, crawler' },
            { obszar: 'B. On-page', punkty: '14', sprawdza: 'Title, meta description, nagłówki, treść, linki wewnętrzne, obrazy', narzedzia: 'Crawler, przeglądarka, Search Console' },
            { obszar: 'C. SEO lokalne', punkty: '9', sprawdza: 'Profil Firmy w Google, spójność NAP, opinie, strona kontaktu', narzedzia: 'Panel wizytówki, Mapy Google' },
            { obszar: 'D. Gotowość na AI', punkty: '8', sprawdza: 'Dostęp botów AI, treść w HTML, dane strukturalne, llms.txt', narzedzia: 'robots.txt, walidator schema.org' },
            { obszar: 'E. Pomiar', punkty: '9', sprawdza: 'Search Console, zdarzenia kluczowe w GA4, frazy i pytania do AI', narzedzia: 'Search Console, GA4' },
          ],
          przypis: 'W szablonie PDF każdy obszar to osobna strona z polami na status, notatki, osobę odpowiedzialną i termin.',
        },
        htmlPo: '<p>Kolejność nie jest przypadkowa. Najpierw technika, bo poprawki treści nic nie dadzą, jeśli strona ma noindex albo robots.txt ją blokuje. Pomiar jest na końcu listy, ale warto go ustawić na samym początku pracy: bez stanu wyjściowego nie pokażesz, co dały zmiany.</p>',
      },
      {
        id: 'jak-wypelnic',
        h2: 'Audyt SEO z checklistą: jak wypełnić szablon krok po kroku',
        html: [
          '<ol>',
          '<li><strong>Zapisz stan wyjściowy.</strong> Zanim cokolwiek zmienisz, zapisz datę i podstawowe dane z Search Console i GA4: kliknięcia bez zapytań o markę i liczbę zapytań od klientów.</li>',
          '<li><strong>Zbierz dostępy.</strong> Potrzebujesz Search Console, GA4, panelu wizytówki Google, CMS i pliku robots.txt. Jeśli czegoś brakuje, to pierwszy wynik checklisty.</li>',
          '<li><strong>Przejdź obszary po kolei.</strong> Przy każdym punkcie zaznacz status: OK, do poprawy albo n/d (nie dotyczy).</li>',
          '<li><strong>Opisz, co jest nie tak.</strong> W notatce wpisz adres i problem, na przykład „/kontakt: brak H1”. Sam znak „do poprawy” nic nie mówi osobie, która będzie to naprawiać.</li>',
          '<li><strong>Ułóż kolejność według priorytetu.</strong> Najpierw punkty z priorytetem wysokim. Każdemu przypisz osobę i termin.</li>',
          '<li><strong>Sprawdź ponownie po wdrożeniu.</strong> Przejdź jeszcze raz przez punkty oznaczone do poprawy. Całość powtarzaj co kwartał.</li>',
          '</ol>',
          '<p>Na pierwszej stronie PDF jest tabela podsumowania: przy każdym obszarze wpisujesz liczbę punktów OK, do poprawy i nie dotyczy. Po kolejnym przeglądzie od razu widać, czy lista się skraca.</p>',
        ].join(''),
      },
      {
        id: 'priorytety',
        h2: 'Jak czytać priorytety: wysoki, średni, niski',
        html: '<p>Priorytet mówi, co zrobić najpierw. Zależy od tego, jak bardzo dany problem blokuje widoczność albo pomiar, a nie od tego, ile pracy wymaga poprawka.</p>',
        tabela: {
          id: 'tabela-priorytety',
          caption: 'Priorytety w checkliście SEO',
          columns: [
            { key: 'priorytet', label: 'Priorytet' },
            { key: 'znaczenie', label: 'Co oznacza' },
            { key: 'przyklady', label: 'Przykłady z listy' },
            { key: 'kiedy', label: 'Kiedy wdrożyć' },
          ],
          rows: [
            { priorytet: 'Wysoki', znaczenie: 'Blokuje widoczność w Google, w Mapach albo pomiar. Bez tego reszta pracy nie przyniesie efektu.', przyklady: 'Noindex na stronie usługi, brak wizytówki, brak zdarzeń kluczowych w GA4', kiedy: 'Od razu, w pierwszej kolejności' },
            { priorytet: 'Średni', znaczenie: 'Ogranicza wyniki, ale strona działa i jest widoczna.', przyklady: 'Powtórzone opisy meta, obrazy bez alt, nieaktualne godziny otwarcia', kiedy: 'W ramach bieżących prac, w kolejnych tygodniach' },
            { priorytet: 'Niski', znaczenie: 'Porządkuje i dopracowuje szczegóły.', przyklady: 'Nazwy plików obrazów, llms.txt, połączenie GA4 z Search Console', kiedy: 'Przy okazji innych zmian' },
          ],
        },
        htmlPo: '<p>Priorytet to punkt wyjścia, nie dogmat. Dla firmy lokalnej spójny NAP i wizytówka ważą więcej niż dla sklepu, który wysyła towar w całym kraju. Jeśli punkt nie dotyczy Twojej firmy, oznacz go „n/d” i nie licz go w wyniku.</p>',
      },
      {
        id: 'przyklad',
        h2: 'Przykład: fragment wypełnionej checklisty',
        html: '<p>Poniżej fragment checklisty wypełnionej dla fikcyjnej firmy: gabinetu fizjoterapii z jedną lokalizacją w Warszawie. Dane są przykładowe. Chodzi o to, jak zapisywać status i notatki, żeby lista od razu była planem pracy.</p>',
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
            { nr: 'A3', punkt: 'robots.txt nie blokuje ważnych stron', status: 'OK', notatka: 'Zablokowany tylko katalog panelu pacjenta, celowo', kto: '–' },
            { nr: 'A4', punkt: 'Brak noindex na ważnych stronach', status: 'Do poprawy', notatka: 'Cennik ma noindex, który został po wersji testowej', kto: 'Webmaster, w tym tygodniu' },
            { nr: 'B1', punkt: 'Własny title na każdej stronie', status: 'Do poprawy', notatka: 'Wszystkie strony zabiegów mają ten sam tytuł „Usługi”', kto: 'Właścicielka, do końca miesiąca' },
            { nr: 'B10', punkt: 'Linki wewnętrzne do ważnych stron', status: 'Do poprawy', notatka: 'Strona o rehabilitacji kolana nie ma linku z menu ani z innych stron', kto: 'Webmaster, do końca miesiąca' },
            { nr: 'C2', punkt: 'Prawdziwa nazwa w wizytówce', status: 'Do poprawy', notatka: 'W nazwie dopisano „fizjoterapia Mokotów”', kto: 'Właścicielka, od razu' },
            { nr: 'C4', punkt: 'Spójny NAP', status: 'Do poprawy', notatka: 'Stary numer telefonu w katalogach firm', kto: 'Recepcja, w tym tygodniu' },
            { nr: 'D1', punkt: 'Boty wyszukiwarek AI wpuszczone', status: 'OK', notatka: 'Brak reguł blokujących', kto: '–' },
            { nr: 'D8', punkt: 'Plik llms.txt', status: 'N/d na razie', notatka: 'Wracamy po zamknięciu punktów z priorytetem wysokim', kto: '–' },
            { nr: 'E5', punkt: 'Zdarzenia kluczowe w GA4', status: 'Do poprawy', notatka: 'Formularz rezerwacji nie wysyła zdarzenia', kto: 'Webmaster, w tym tygodniu' },
          ],
        },
        htmlPo: '<p>Z tego fragmentu od razu widać kolejność: najpierw noindex na cenniku, nazwa wizytówki, NAP i zdarzenie w GA4, bo mają priorytet wysoki. Potem tytuły i linki wewnętrzne. Notatka z adresem strony i osobą odpowiedzialną zamienia checklistę w listę zadań.</p>',
      },
      {
        id: 'gotowosc-na-ai',
        h2: 'Gotowość na AI: co sprawdzić, a co może poczekać',
        html: '<p>Część punktów dotyczy widoczności w ChatGPT, Perplexity, Claude i przeglądach AI Google. Zacznij od dostępu botów. Firmy AI rozróżniają boty, które budują wyszukiwarkę, od botów, które zbierają treści do trenowania modeli. Blokada jednego nie oznacza blokady drugiego.</p>',
        tabela: {
          id: 'tabela-boty-ai',
          caption: 'Boty AI w robots.txt: do czego służą według dokumentacji firm (odczyt 11.11.2026)',
          columns: [
            { key: 'bot', label: 'Bot' },
            { key: 'firma', label: 'Firma' },
            { key: 'zadanie', label: 'Do czego służy' },
            { key: 'blokada', label: 'Co daje blokada' },
          ],
          rows: [
            { bot: 'OAI-SearchBot', firma: 'OpenAI', zadanie: 'Pokazuje strony w wyszukiwaniu ChatGPT', blokada: 'Strona nie pojawi się w odpowiedziach wyszukiwania ChatGPT (może zostać link nawigacyjny)' },
            { bot: 'GPTBot', firma: 'OpenAI', zadanie: 'Zbiera treści, które mogą posłużyć do trenowania modeli', blokada: 'Sygnał, że treści nie mają być używane do trenowania' },
            { bot: 'PerplexityBot', firma: 'Perplexity', zadanie: 'Pokazuje i linkuje strony w wynikach Perplexity; według firmy nie służy do trenowania modeli', blokada: 'Mniejsza szansa na obecność w wynikach Perplexity' },
            { bot: 'Claude-SearchBot', firma: 'Anthropic', zadanie: 'Indeksuje treści na potrzeby wyszukiwania w Claude', blokada: 'Może zmniejszyć widoczność w odpowiedziach z wyszukiwania' },
            { bot: 'ClaudeBot', firma: 'Anthropic', zadanie: 'Zbiera treści, które mogą posłużyć do trenowania modeli', blokada: 'Przyszłe treści strony nie trafią do zbiorów treningowych' },
            { bot: 'Google-Extended', firma: 'Google', zadanie: 'Token w robots.txt: trenowanie modeli Gemini i ugruntowanie odpowiedzi w aplikacjach Gemini', blokada: 'Według Google nie wpływa na obecność ani na pozycje w wyszukiwarce Google' },
          ],
          przypis: 'Źródła: dokumentacja OpenAI, Perplexity, Anthropic i Google (lista na końcu strony). Boty uruchamiane na prośbę użytkownika (ChatGPT-User, Perplexity-User) według tych firm mogą nie stosować się do reguł robots.txt.',
        },
        htmlPo: [
          '<p>Przeglądy AI w Google działają inaczej. Google pisze wprost, że do pojawienia się w przeglądach AI i w trybie AI nie ma dodatkowych wymagań: strona musi być zaindeksowana i mieć możliwość wyświetlenia w wynikach z fragmentem. Nie trzeba tworzyć specjalnych plików ani dodatkowych danych strukturalnych. Dlatego w checkliście punkty techniczne i on-page są ważniejsze niż llms.txt.</p>',
          '<p>Plik llms.txt to propozycja standardu opisana na llmstxt.org: plik w formacie Markdown z nazwą strony, krótkim opisem i listą linków do najważniejszych treści. Może pomóc narzędziom AI i agentom szybciej zrozumieć serwis, ale traktuj go jako dodatek. Jeśli chcesz go mieć, przygotujesz go w naszym <a href="/narzedzia/generator-llms-txt">generatorze llms.txt</a>, który przy okazji sprawdza, czy boty AI mają dostęp do strony.</p>',
          '<p>Dane strukturalne to osobna sprawa. Google zaleca format JSON-LD i zastrzega, że znaczniki mają opisywać treść widoczną dla czytelnika. Schemat Organization albo LocalBusiness z tą samą nazwą, adresem i telefonem co w wizytówce porządkuje informacje o firmie dla każdej wyszukiwarki.</p>',
        ].join(''),
      },
      {
        id: 'bledy',
        h2: 'Najczęstsze błędy przy odhaczaniu listy',
        html: [
          '<ul>',
          '<li><strong>Ukrywanie stron przez robots.txt.</strong> Reguła Disallow zatrzymuje robota, ale nie usuwa adresu z wyników: Google może go zaindeksować, jeśli prowadzą do niego linki. Żeby strony nie było w Google, użyj noindex i nie blokuj jej jednocześnie w robots.txt, bo robot nie zobaczy wtedy znacznika.</li>',
          '<li><strong>Blokada wszystkich botów AI jednym ruchem.</strong> Reguła dla „User-agent: *” albo lista skopiowana z forum często wycina też boty wyszukiwarek AI, choć chodziło tylko o trenowanie modeli.</li>',
          '<li><strong>Upychanie fraz.</strong> W tytule, w tekście alternatywnym obrazów i w nazwie wizytówki. Google odradza powtarzanie tych samych słów w tytule i wypełnianie alt frazami, a nazwa wizytówki ma być prawdziwą nazwą firmy.</li>',
          '<li><strong>Odhaczanie bez notatek.</strong> Status „do poprawy” bez adresu strony i opisu problemu oznacza, że ktoś będzie musiał zrobić tę samą analizę drugi raz.</li>',
          '<li><strong>Wszystko naraz.</strong> Pięćdziesiąt punktów robionych w losowej kolejności to dużo pracy i mało efektu. Najpierw priorytet wysoki.</li>',
          '<li><strong>Mierzenie samych pozycji.</strong> Pozycje rosną, a telefon milczy? Bez zdarzeń kluczowych w GA4 nie wiesz, czy SEO przynosi klientów.</li>',
          '<li><strong>Jednorazowe sprawdzenie.</strong> Strona się zmienia: nowa wtyczka, nowy szablon, nowa podstrona. Lista ma sens, gdy wracasz do niej regularnie.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'kiedy-audyt',
        h2: 'Kiedy checklista nie wystarczy',
        html: [
          '<p>Checklistę przejdziesz sam, jeśli masz dostęp do Search Console, GA4 i panelu wizytówki. Część punktów technicznych i on-page sprawdzi za Ciebie <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a>: do 25 podstron, ocena od 1 do 100 i lista błędów z instrukcją naprawy.</p>',
          '<p>Zewnętrzne spojrzenie ma sens, gdy ruch spada bez widocznej przyczyny, przed migracją albo przebudową strony, przy dużym serwisie lub sklepie i wtedy, gdy lista problemów jest gotowa, ale nikt nie ułoży jej w plan dla dewelopera. Wtedy zamów <a href="/audyt-seo">audyt SEO strony</a> – kosztuje od 1 490 zł netto. Jeśli chcesz przede wszystkim wiedzieć, czy ChatGPT i Gemini polecają Twoją firmę, osobną usługą jest audyt widoczności w AI za 990 zł netto.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Podgląd szablonu: cała checklista SEO',
      opis: `Tak wygląda zawartość szablonu: ${ile(PL_OBSZARY)} punktów w pięciu obszarach. W PDF każdy obszar jest na osobnej stronie, a przy każdym punkcie są pola na status (OK, do poprawy, n/d), notatki, osobę i termin.`,
      html: podgladHtml(PL_OBSZARY, false),
    },
    formularz: {
      h2: 'Pobierz szablon PDF',
      opis: 'Wyślemy Ci checklistę SEO w PDF do wydruku: jeden obszar na stronę, z polami na status, notatki, osobę odpowiedzialną i termin, oraz tabelą podsumowania na pierwszej stronie.',
      etykieta: 'E-mail, na który wyślemy checklistę',
      przycisk: 'Wyślij checklistę (PDF)',
      przedmiot: 'checklistę SEO',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do checklisty SEO w PDF przyjdzie w ciągu minuty.',
    },
    kroki: [
      { name: 'Zapisz stan wyjściowy', text: 'Zanim cokolwiek zmienisz, zapisz datę oraz kliknięcia bez zapytań o markę z Search Console i liczbę zapytań od klientów z GA4.' },
      { name: 'Zbierz dostępy', text: 'Przygotuj dostęp do Search Console, GA4, panelu wizytówki Google, CMS i pliku robots.txt. Brak dostępu to pierwszy punkt do poprawy.' },
      { name: 'Przejdź obszary po kolei', text: 'Zacznij od podstaw technicznych, potem on-page, SEO lokalne, gotowość na AI i pomiar. Przy każdym punkcie zaznacz: OK, do poprawy albo n/d.' },
      { name: 'Opisz problemy', text: 'W notatce wpisz adres strony i konkretny problem, na przykład „/kontakt: brak H1”, żeby osoba wdrażająca nie musiała powtarzać analizy.' },
      { name: 'Ułóż kolejność według priorytetu', text: 'Najpierw punkty z priorytetem wysokim, potem średnim i niskim. Każdemu przypisz osobę odpowiedzialną i termin.' },
      { name: 'Sprawdź ponownie', text: 'Po wdrożeniu przejdź jeszcze raz przez punkty do poprawy i uzupełnij tabelę podsumowania. Całą checklistę powtarzaj co kwartał i po każdej większej zmianie strony.' },
    ],
    faq: [
      {
        question: 'Czym checklista SEO różni się od audytu SEO?',
        answer: 'Checklista SEO to lista punktów, które sprawdzasz samodzielnie i odhaczasz: tak albo nie. Audyt SEO to analiza, w której specjalista sprawdza te punkty głębiej, szuka przyczyn problemów, porównuje stronę z konkurencją i układa plan napraw z priorytetami. Checklista dobrze sprawdza się jako regularny przegląd i przygotowanie do audytu, ale nie zastąpi go przy spadkach ruchu, migracji albo dużym serwisie.',
      },
      {
        question: 'Jak często wracać do checklisty?',
        answer: 'Pełną listę warto przejść raz na kwartał i dodatkowo po każdej większej zmianie: nowym szablonie, zmianie CMS, nowych adresach stron, przeprowadzce firmy albo zmianie numeru telefonu. Punkty z obszaru pomiaru sprawdzaj co miesiąc, bo błąd w GA4 łatwo przeoczyć, a danych, których narzędzie nie zebrało, nie da się później odtworzyć.',
      },
      {
        question: 'Czy plik llms.txt jest potrzebny, żeby pojawić się w przeglądach AI Google?',
        answer: 'Nie. Google pisze w dokumentacji, że do pojawienia się w przeglądach AI i w trybie AI nie trzeba tworzyć specjalnych plików, dodatkowych znaczników ani danych strukturalnych. Strona musi być zaindeksowana i mieć możliwość wyświetlenia z fragmentem. Dlatego llms.txt ma w checkliście niski priorytet. Może pomóc innym narzędziom AI i agentom, ale zrób go po punktach technicznych i on-page.',
      },
      {
        question: 'Czy mogę zablokować boty AI i nadal być widoczny w Google?',
        answer: 'Tak, ale trzeba rozróżnić boty. Według Google blokada tokenu Google-Extended nie wpływa na obecność ani na pozycje w wyszukiwarce. Blokada OAI-SearchBot sprawi jednak, że strona nie pojawi się w odpowiedziach wyszukiwania ChatGPT. Rozsądny kompromis to wpuszczenie botów wyszukiwarek AI i świadoma, zapisana decyzja o botach treningowych, takich jak GPTBot czy ClaudeBot.',
      },
      {
        question: 'Czy ta checklista nadaje się do sklepu internetowego?',
        answer: 'Jako baza tak: podstawy techniczne, on-page i pomiar dotyczą każdej strony. Sklep ma jednak problemy, których ogólna lista nie obejmuje: filtry i sortowanie, które tworzą ogromną liczbę adresów, produkty wycofane z oferty, dane strukturalne produktów i budżet indeksowania. Do tego potrzebna jest głębsza analiza opisana w poradniku audytu technicznego albo zewnętrzny audyt SEO.',
      },
      {
        question: 'Czy muszę spełnić wszystkie 50 punktów?',
        answer: 'Nie. Część punktów nie dotyczy każdej firmy: firma bez lokalu dla klientów ukrywa adres w wizytówce, a strona bez bloga nie pokazuje dat artykułów. Takie punkty oznacz „n/d” i nie licz ich w wyniku. Ważniejsze od kompletu jest to, żeby zamknąć wszystkie punkty z priorytetem wysokim, zanim zajmiesz się dopracowaniem szczegółów.',
      },
    ],
    zrodla: ZRODLA.map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/blog/technical-seo-audit-checklist', tekst: 'Audyt techniczny SEO: poradnik krok po kroku', opis: 'progi, narzędzia i kolejność napraw, gdy potrzebujesz głębszej analizy technicznej' },
      { href: '/narzedzia/audyt-seo', tekst: 'Darmowy audyt SEO', opis: 'ocena od 1 do 100 i lista błędów dla do 25 podstron' },
      { href: '/narzedzia/generator-llms-txt', tekst: 'Generator llms.txt', opis: 'plik llms.txt i test dostępu botów AI do strony' },
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Pozycjonowanie wizytówki Google', opis: 'kategorie, opinie i pomiar pozycji z 49 punktów w Mapach' },
      { href: '/audyt-seo', tekst: 'Audyt SEO strony', opis: 'pełna analiza z planem napraw, od 1 490 zł netto' },
    ],
    plikNazwa: 'Checklista SEO: 50 punktów kontrolnych (PDF)',
  },

  en: {
    okruszek: 'SEO checklist',
    tag: 'Free template',
    h1: 'SEO checklist for 2026: 50 checks you can run yourself',
    lead: 'An SEO checklist is a list of yes-or-no checks that shows whether your website has the basics it needs to show up in Google and in AI answers. Ours has 50 checks across five areas: technical basics, on-page SEO, local SEO, AI readiness and measurement. Each check has a priority and a way to verify it.',
    karta: {
      nazwa: 'SEO checklist (PDF)',
      opis: '50 checks across technical basics, on-page SEO, local SEO, AI readiness and measurement, each with a priority and a way to verify it.',
      cta: 'Get the checklist',
    },
    sekcje: [
      {
        id: 'what-it-is',
        h2: 'What an SEO checklist is and when to use it',
        html: [
          '<p>An SEO checklist is a list of specific checks you can verify and tick off: yes or no, no interpretation needed. It won’t replace a strategy or the work on your content. What it does show is whether your site has the foundations SEO depends on: can Google see it, does Google understand what it’s about, is your business described consistently on Maps, and are you measuring how many inquiries search actually brings in?</p>',
          '<p>This checklist is deliberately general. It covers five areas, and each one fills its own page in the PDF template. If you need a deeper technical review – server logs, rendering, crawl budget or a migration – read our <a href="/en/blog/technical-seo-audit-checklist">technical SEO audit checklist</a>.</p>',
          '<p>When to use it:</p>',
          '<ul>',
          '<li><strong>before a new site goes live</strong> or after a redesign, before Google picks up the new version;</li>',
          '<li><strong>once a quarter</strong> as a health check;</li>',
          '<li><strong>after a major change</strong>: a new CMS, new URLs, new services, a move to a new address;</li>',
          '<li><strong>before you talk to an agency</strong>, so you know what to ask and what to look for in their reports.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'areas',
        h2: 'Five areas, 50 checks: what this SEO checklist covers',
        html: '<p>The checks follow the order in which work on a site usually happens: first whether Google can read the site at all, then content and your business profile, and finally how you measure results.</p>',
        tabela: {
          id: 'table-areas',
          caption: 'SEO checklist: five areas and 50 checks',
          columns: [
            { key: 'area', label: 'Area' },
            { key: 'checks', label: 'Checks' },
            { key: 'covers', label: 'What it covers' },
            { key: 'tools', label: 'What you need' },
          ],
          rows: [
            { area: 'A. Technical basics', checks: '10', covers: 'Whether Google can reach your pages, index them and display them well on a phone', tools: 'robots.txt, Search Console, a crawler' },
            { area: 'B. On-page', checks: '14', covers: 'Titles, meta descriptions, headings, content, internal links, images', tools: 'A crawler, your browser, Search Console' },
            { area: 'C. Local SEO', checks: '9', covers: 'Google Business Profile, NAP consistency, reviews, the contact page', tools: 'Your profile dashboard, Google Maps' },
            { area: 'D. AI readiness', checks: '8', covers: 'AI bot access, content in HTML, structured data, llms.txt', tools: 'robots.txt, the schema.org validator' },
            { area: 'E. Measurement', checks: '9', covers: 'Search Console, GA4 key events, tracked keywords and AI questions', tools: 'Search Console, GA4' },
          ],
          przypis: 'In the PDF template, each area is a separate page with fields for status, notes, owner and deadline.',
        },
        htmlPo: '<p>The order matters. Technical basics come first, because content fixes do nothing while a page carries noindex or robots.txt blocks it. Measurement is last on the list, but set it up at the very start: without a baseline you can’t show what your changes achieved.</p>',
      },
      {
        id: 'how-to',
        h2: 'How to use it as an SEO audit checklist, step by step',
        html: [
          '<ol>',
          '<li><strong>Record a baseline.</strong> Before you change anything, write down the date and the basics from Search Console and GA4: non-brand clicks and the number of customer inquiries.</li>',
          '<li><strong>Collect access.</strong> You’ll need Search Console, GA4, your Google Business Profile, your CMS and your robots.txt file. Anything missing is your first finding.</li>',
          '<li><strong>Work through the areas in order.</strong> Mark each check OK, needs work, or N/A (not applicable).</li>',
          '<li><strong>Describe what’s wrong.</strong> In the notes, write the URL and the problem, for example “/contact: no H1.” A bare “needs work” tells the person fixing it nothing.</li>',
          '<li><strong>Sort by priority.</strong> High-priority checks go first. Give each one an owner and a deadline.</li>',
          '<li><strong>Recheck after the fixes.</strong> Go back over the checks marked “needs work.” Repeat the whole list every quarter.</li>',
          '</ol>',
          '<p>Page one of the PDF has a summary table: for each area you enter how many checks are OK, need work or don’t apply. After the next review you can see at a glance whether the list is getting shorter.</p>',
        ].join(''),
      },
      {
        id: 'priorities',
        h2: 'How to read the priorities: high, medium, low',
        html: '<p>The priority tells you what to do first. It reflects how much a problem blocks visibility or measurement, not how much work the fix takes.</p>',
        tabela: {
          id: 'table-priorities',
          caption: 'Priorities in the SEO checklist',
          columns: [
            { key: 'priority', label: 'Priority' },
            { key: 'meaning', label: 'What it means' },
            { key: 'examples', label: 'Examples from the list' },
            { key: 'when', label: 'When to fix' },
          ],
          rows: [
            { priority: 'High', meaning: 'Blocks visibility in Google or Maps, or blocks measurement. Without it, the rest of the work won’t pay off.', examples: 'Noindex on a service page, no business profile, no key events in GA4', when: 'Right away, first in line' },
            { priority: 'Medium', meaning: 'Holds results back, but the site works and is visible.', examples: 'Duplicate meta descriptions, images without alt text, outdated opening hours', when: 'As part of ongoing work over the next few weeks' },
            { priority: 'Low', meaning: 'Tidies up and polishes the details.', examples: 'Image file names, llms.txt, linking GA4 to Search Console', when: 'Alongside other changes' },
          ],
        },
        htmlPo: '<p>Treat the priority as a starting point, not a rule. For a local business, a consistent NAP and a solid Google Business Profile matter more than they do for an online store that ships nationwide. If a check doesn’t apply to you, mark it N/A and leave it out of your score.</p>',
      },
      {
        id: 'example',
        h2: 'Worked example: part of a filled-in checklist',
        html: '<p>Here’s part of a checklist filled in for a fictional business: a physical therapy clinic with one location in Warsaw. The details are made up. The point is to show how to record status and notes so the list turns straight into a work plan.</p>',
        tabela: {
          id: 'table-example',
          caption: 'Worked example (fictional business, sample data)',
          columns: [
            { key: 'nr', label: 'No.' },
            { key: 'check', label: 'Check' },
            { key: 'status', label: 'Status' },
            { key: 'note', label: 'Note' },
            { key: 'owner', label: 'Owner and deadline' },
          ],
          rows: [
            { nr: 'A3', check: 'robots.txt doesn’t block key pages', status: 'OK', note: 'Only the patient portal folder is blocked, on purpose', owner: '–' },
            { nr: 'A4', check: 'No noindex on key pages', status: 'Needs work', note: 'The pricing page still has a noindex left over from staging', owner: 'Web developer, this week' },
            { nr: 'B1', check: 'A unique title on every page', status: 'Needs work', note: 'Every treatment page has the same title, “Services”', owner: 'Owner, by month end' },
            { nr: 'B10', check: 'Internal links to key pages', status: 'Needs work', note: 'The knee rehab page has no link from the menu or other pages', owner: 'Web developer, by month end' },
            { nr: 'C2', check: 'Real business name on the profile', status: 'Needs work', note: 'Someone added “physical therapy Mokotów” to the name', owner: 'Owner, right away' },
            { nr: 'C4', check: 'Consistent NAP', status: 'Needs work', note: 'Old phone number in business directories', owner: 'Front desk, this week' },
            { nr: 'D1', check: 'AI search bots allowed', status: 'OK', note: 'No blocking rules', owner: '–' },
            { nr: 'D8', check: 'llms.txt file', status: 'N/A for now', note: 'Revisit once the high-priority checks are closed', owner: '–' },
            { nr: 'E5', check: 'GA4 key events', status: 'Needs work', note: 'The booking form doesn’t send an event', owner: 'Web developer, this week' },
          ],
        },
        htmlPo: '<p>The order is obvious from this excerpt: the noindex on the pricing page, the profile name, the NAP and the GA4 event come first because they’re high priority. Titles and internal links follow. A note with the URL and an owner is what turns a checklist into a task list.</p>',
      },
      {
        id: 'ai-readiness',
        h2: 'AI readiness: what to check and what can wait',
        html: '<p>Some checks cover visibility in ChatGPT, Perplexity, Claude and Google AI Overviews. Start with bot access. AI companies separate the bots that power their search features from the bots that collect content for model training. Blocking one doesn’t block the other.</p>',
        tabela: {
          id: 'table-ai-bots',
          caption: 'AI bots in robots.txt: what they do, per each company’s documentation (accessed November 11, 2026)',
          columns: [
            { key: 'bot', label: 'Bot' },
            { key: 'company', label: 'Company' },
            { key: 'purpose', label: 'What it does' },
            { key: 'blocking', label: 'What blocking it does' },
          ],
          rows: [
            { bot: 'OAI-SearchBot', company: 'OpenAI', purpose: 'Surfaces websites in ChatGPT search', blocking: 'Your site won’t appear in ChatGPT search answers (a navigational link may still show)' },
            { bot: 'GPTBot', company: 'OpenAI', purpose: 'Collects content that may be used to train models', blocking: 'Signals that your content shouldn’t be used for training' },
            { bot: 'PerplexityBot', company: 'Perplexity', purpose: 'Surfaces and links websites in Perplexity results; the company says it isn’t used for model training', blocking: 'Less chance of appearing in Perplexity results' },
            { bot: 'Claude-SearchBot', company: 'Anthropic', purpose: 'Indexes content for search in Claude', blocking: 'May reduce your visibility in search-based answers' },
            { bot: 'ClaudeBot', company: 'Anthropic', purpose: 'Collects content that may be used to train models', blocking: 'Your future content is excluded from training data' },
            { bot: 'Google-Extended', company: 'Google', purpose: 'A robots.txt token covering Gemini model training and grounding in Gemini Apps', blocking: 'According to Google, no effect on inclusion or ranking in Google Search' },
          ],
          przypis: 'Sources: OpenAI, Perplexity, Anthropic and Google documentation (listed at the end of this page). According to these companies, bots triggered by a user’s request (ChatGPT-User, Perplexity-User) may not follow robots.txt rules.',
        },
        htmlPo: [
          '<p>Google AI Overviews work differently. Google states plainly that there are no additional requirements to appear in AI Overviews or AI Mode: a page has to be indexed and eligible to show in Search with a snippet. You don’t need special files or extra structured data. That’s why the technical and on-page checks on this list matter more than llms.txt.</p>',
          '<p>llms.txt is a proposed standard described at llmstxt.org: a Markdown file with your site name, a short summary and a list of links to your most important content. It may help AI tools and agents understand your site faster, but treat it as an extra. If you want one, our <a href="/en/tools/llms-txt-generator">llms.txt generator</a> builds it and checks whether AI bots can reach your site.</p>',
          '<p>Structured data is a separate question. Google recommends JSON-LD and requires markup to describe content that readers can actually see. An Organization or LocalBusiness schema with the same name, address and phone number as your business profile keeps your company details consistent for every search engine.</p>',
        ].join(''),
      },
      {
        id: 'mistakes',
        h2: 'Common mistakes when working through an SEO checklist',
        html: [
          '<ul>',
          '<li><strong>Hiding pages with robots.txt.</strong> A Disallow rule stops the crawler but doesn’t remove the URL from results: Google can still index it if other pages link to it. To keep a page out of Google, use noindex and don’t block the page in robots.txt at the same time, or the crawler will never see the tag.</li>',
          '<li><strong>Blocking every AI bot in one go.</strong> A rule for “User-agent: *” or a list copied from a forum often shuts out AI search bots too, when the goal was only to opt out of model training.</li>',
          '<li><strong>Keyword stuffing.</strong> In titles, in image alt text and in your business profile name. Google advises against repeating the same words in a title and against filling alt attributes with keywords, and your profile name has to be your real business name.</li>',
          '<li><strong>Ticking boxes without notes.</strong> “Needs work” with no URL and no description means someone has to redo the same analysis later.</li>',
          '<li><strong>Doing everything at once.</strong> Fifty checks tackled in random order means a lot of work and little impact. High priority first.</li>',
          '<li><strong>Tracking rankings only.</strong> Rankings up, phone silent? Without GA4 key events you don’t know whether SEO brings in customers.</li>',
          '<li><strong>Checking once.</strong> Sites change: a new plugin, a new theme, a new page. The list only works if you come back to it regularly.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'when-not-enough',
        h2: 'When a checklist isn’t enough',
        html: [
          '<p>You can run this checklist yourself if you have access to Search Console, GA4 and your business profile. Our <a href="/en/tools/free-seo-audit">free SEO audit</a> covers part of the technical and on-page checks for you: up to 25 pages, a score from 1 to 100 and a list of errors with instructions for each fix.</p>',
          '<p>An outside review makes sense when traffic drops for no visible reason, before a migration or redesign, for a large site or online store, and when you have a list of problems but nobody to turn it into a plan for your developer. That’s when to order a full <a href="/en/seo-audit">SEO audit</a>, starting at €350 net. If your main question is whether ChatGPT and Gemini recommend your business, our AI visibility audit is a separate service at €235 net.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Template preview: the full SEO checklist',
      opis: `Here’s everything in the template: ${ile(EN_OBSZARY)} checks across five areas. In the PDF, each area has its own page, and every check has fields for status (OK, needs work, N/A), notes, owner and deadline.`,
      html: podgladHtml(EN_OBSZARY, true),
    },
    formularz: {
      h2: 'Get the template (PDF)',
      opis: 'We’ll email you the SEO checklist as a printable PDF: one area per page, with fields for status, notes, owner and deadline, plus a summary table on page one.',
      etykieta: 'Email address to send the checklist to',
      przycisk: 'Send me the checklist (PDF)',
      przedmiot: 'the SEO checklist template',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the SEO checklist PDF will arrive within a minute.',
    },
    kroki: [
      { name: 'Record a baseline', text: 'Before you change anything, write down the date, non-brand clicks from Search Console and the number of customer inquiries from GA4.' },
      { name: 'Collect access', text: 'Get access to Search Console, GA4, your Google Business Profile, your CMS and your robots.txt file. Missing access is your first finding.' },
      { name: 'Work through the areas in order', text: 'Start with technical basics, then on-page, local SEO, AI readiness and measurement. Mark each check OK, needs work or N/A.' },
      { name: 'Describe the problems', text: 'In the notes, write the URL and the specific problem, for example “/contact: no H1,” so whoever fixes it doesn’t have to repeat the analysis.' },
      { name: 'Sort by priority', text: 'High-priority checks first, then medium and low. Give each one an owner and a deadline.' },
      { name: 'Recheck', text: 'After the fixes, go back over the checks marked “needs work” and update the summary table. Repeat the full checklist every quarter and after any major change to the site.' },
    ],
    faq: [
      {
        question: 'What’s the difference between an SEO checklist and an SEO audit?',
        answer: 'A checklist is a list of checks you run yourself and tick off: yes or no. An SEO audit is an analysis in which a specialist goes deeper on those checks, finds the causes of problems, compares your site with competitors and builds a prioritized fix plan. A checklist works well as a regular health check and as preparation for an audit, but it won’t replace one after a traffic drop, during a migration or on a large site.',
      },
      {
        question: 'How often should I go through the checklist?',
        answer: 'Run the full list once a quarter and after every major change: a new theme, a new CMS, new URLs, a move to a new address or a new phone number. Check the measurement items monthly, because a broken GA4 setup is easy to miss, and data your tools never collected can’t be recovered later.',
      },
      {
        question: 'Do I need an llms.txt file to appear in Google AI Overviews?',
        answer: 'No. Google’s documentation says you don’t need to create special files, extra markup or structured data to appear in AI Overviews or AI Mode. A page has to be indexed and eligible to show in Search with a snippet. That’s why llms.txt is low priority on this checklist. It may help other AI tools and agents, but do it after the technical and on-page checks.',
      },
      {
        question: 'Can I block AI bots and still show up in Google?',
        answer: 'Yes, but you need to tell the bots apart. According to Google, blocking the Google-Extended token has no effect on inclusion or ranking in Google Search. Blocking OAI-SearchBot, on the other hand, keeps your site out of ChatGPT search answers. A sensible middle ground is to allow AI search bots and make a deliberate, written decision about training bots such as GPTBot and ClaudeBot.',
      },
      {
        question: 'Does this checklist work for an online store?',
        answer: 'As a foundation, yes: technical basics, on-page and measurement apply to every site. Online stores have problems a general list doesn’t cover, though: filters and sorting that generate huge numbers of URLs, discontinued products, product structured data and crawl budget. For those you need the deeper review described in our technical SEO audit checklist, or a professional SEO audit.',
      },
      {
        question: 'Do I have to pass all 50 checks?',
        answer: 'No. Some checks don’t apply to every business: a company that doesn’t serve customers at its address hides it on its profile, and a site without a blog has no article dates to show. Mark those N/A and leave them out of your score. What matters more than a perfect score is closing every high-priority check before you move on to polishing the details.',
      },
    ],
    zrodla: ZRODLA.map(([url, , nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/blog/technical-seo-audit-checklist', tekst: 'Technical SEO audit checklist', opis: 'thresholds, tools and fix order when you need a deeper technical review' },
      { href: '/narzedzia/audyt-seo', tekst: 'Free SEO audit', opis: 'a 1-100 score and a list of errors for up to 25 pages' },
      { href: '/narzedzia/generator-llms-txt', tekst: 'llms.txt generator', opis: 'build llms.txt and test whether AI bots can reach your site' },
      { href: '/pozycjonowanie-wizytowki-google', tekst: 'Google Business Profile optimization', opis: 'categories, reviews and rankings measured on a 49-point map grid' },
      { href: '/audyt-seo', tekst: 'SEO audit', opis: 'a full analysis with a fix plan, from €350 net' },
    ],
    plikNazwa: 'SEO checklist: 50 checks (PDF)',
  },
};
