// Szablon: checklista E-E-A-T (11.11.2026). 36 punktów w pięciu obszarach (zaufanie, autorzy, treść,
// reputacja, dane strukturalne) + krok 0: ocena, czy temat jest YMYL. Fraza PL „e-e-a-t” (590, ten sam
// koszyk co „eeat” w Google Ads, nie sumować), EN „e-e-a-t checklist” (50) + „eeat seo” (590).
// Intencja: PL 8/8 poradników bez szablonu, więc fillable checklista = przewaga formatu (playbook 5.1 pkt 3,
// playbook 8 pkt 4: narzędzia zamiast definicji).
// Kanibalizacja: PLAN-v2 nr 110 EEAT-B (artykuł o E-E-A-T, backlog II kw. 2027) celuje w ten sam klaster.
// Ta strona przejmuje „e-e-a-t” / „eeat” / „e-e-a-t seo”; artykuł EEAT-B (jeśli powstanie) bierze inną
// intencję (np. „e-e-a-t a odpowiedzi AI”) i linkuje tutaj (INTEGRACJA.md).
// Ograniczenia treści (creating-helpful-content, odczyt 11.11.2026): zaufanie najważniejsze, E-E-A-T nie
// jest konkretnym czynnikiem rankingowym, oceniający nie wpływają na pozycje. Nie piszemy o „wadze”
// E-E-A-T ani nie obiecujemy cytowań w AI.
// PDF: public/pliki/checklista-e-e-a-t.pdf (PL) i e-e-a-t-checklist.pdf (EN), źródła HTML w
// scripts/szablony/pdf/ generuje skrypt z PUNKTY (jedno źródło listy dla strony i PDF).
// Panel: id 'checklista-eeat' (pole plik).

const PL_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Zaufanie',
    h3: 'A. Zaufanie: kto stoi za stroną (8 punktów)',
    opis: 'Co strona mówi o sobie: kto za nią odpowiada, jak się skontaktować, czy sprzedaż jest uczciwa i bezpieczna, czy twierdzenia mają dowody.',
    punkty: [
      ['A1', 'Strona „O nas” mówi, kto odpowiada za stronę: pełna nazwa firmy lub osoby, czym się zajmuje, gdzie działa i kto nią kieruje', 'Otwórz „O nas” oczami kogoś, kto nie zna firmy. Po minucie ma wiedzieć, kto stoi za treścią i ofertą.', 'wysoki', 'Wytyczne dla oceniających, 2.5.2'],
      ['A2', 'Kontakt jest łatwy do znalezienia z każdej strony: telefon, e-mail, adres albo obszar działania i dane firmy', 'Sprawdź stopkę i menu na stronie głównej, w artykule i na stronie usługi. Sam formularz to za mało przy usługach i sprzedaży.', 'wysoki', 'Wytyczne dla oceniających, 2.5.3'],
      ['A3', 'Jeśli strona przyjmuje zamówienia lub płatności, regulamin, zasady płatności, zwrotów i reklamacji oraz kontakt do obsługi klienta są jawne', 'Przejdź ścieżkę zamówienia do końca. Zapisz, gdzie klient znajdzie te informacje przed zapłatą. Strona bez sprzedaży: n/d.', 'wysoki', 'Wytyczne dla oceniających, 2.5.3 i 3.4'],
      ['A4', 'Strona jest bezpieczna: HTTPS bez ostrzeżeń, bez podejrzanych przekierowań, wymuszonych pobrań i reklam udających treść', 'Otwórz kilka stron w oknie prywatnym i na telefonie. HTTPS i przekierowanie z http:// sprawdzi też darmowy audyt SEO.', 'wysoki', 'Wytyczne dla oceniających, 3.4 (bezpieczeństwo)'],
      ['A5', 'Twierdzenia o firmie (liczba klientów, wyniki, nagrody, certyfikaty, „nr 1”) mają dowód: źródło, datę albo dokument', 'Wypisz wszystkie liczby i wyróżnienia ze strony głównej i „O nas”. Przy każdym zapisz, gdzie jest dowód. Brak dowodu: usuń albo doprecyzuj.', 'wysoki', 'Wytyczne dla oceniających, 3.3.1'],
      ['A6', 'Opinie, referencje i case studies na stronie pochodzą od prawdziwych klientów i da się je sprawdzić', 'Przy każdej opinii zapisz źródło: wizytówka, e-mail, zgoda klienta. Link do wizytówki Google pozwala czytelnikowi zobaczyć wszystkie opinie.', 'średni', 'Wytyczne dla oceniających, 3.3.2'],
      ['A7', 'Oferta mówi wprost, co klient dostaje: zakres, cena albo sposób wyceny, czas realizacji i warunki rezygnacji', 'Przeczytaj stronę usługi jak klient. Czy wiesz, ile zapłacisz albo od czego zależy cena i jak zakończyć współpracę?', 'średni', 'Nasza praktyka'],
      ['A8', 'Nazwa, adres, telefon i opis firmy są takie same na stronie, w wizytówce Google i w profilach firmy', 'Skopiuj dane z każdego miejsca do jednej tabeli i porównaj znak po znaku. Ten sam punkt jest w checkliście SEO (C4).', 'średni', 'Nasza praktyka'],
    ],
  },
  {
    id: 'B',
    nazwa: 'Autorzy i doświadczenie',
    h3: 'B. Autorzy i doświadczenie: kto stworzył treść (8 punktów)',
    opis: 'Kto napisał treść, czy to prawdziwa osoba, czy zna temat z pierwszej ręki i czy przy tematach YMYL ktoś z kwalifikacjami ją sprawdził.',
    punkty: [
      ['B1', 'Artykuły, poradniki i recenzje mają podpis autora tam, gdzie czytelnik zapyta „kto to napisał?”', 'Przejrzyj 10 treści z największym ruchem z Google. Stronę usługi może podpisać firma, poradnik ekspercki – konkretna osoba.', 'wysoki', 'Google: przydatne treści („Kto”)'],
      ['B2', 'Podpis prowadzi do strony autora: rola, czym się zajmuje, o czym pisze, kontakt albo profil zawodowy', 'Kliknij podpis. Jeśli nie jest linkiem albo prowadzi do pustej strony, punkt jest do poprawy.', 'wysoki', 'Google: przydatne treści („Kto”)'],
      ['B3', 'Autor jest prawdziwą osobą: bez zmyślonych nazwisk, zdjęć wygenerowanych przez AI i kwalifikacji, których nie ma', 'Porównaj biogram z profilem zawodowym autora. Google nazywa fabrykowanie profili autorów oszustwem, które czyni stronę niewiarygodną.', 'wysoki', 'Google: przydatne treści („Kto”)'],
      ['B4', 'Biogram podaje sprawdzalne fakty zamiast ogólników: stanowisko, zakres pracy, realizacje, a przy zawodzie regulowanym numer wpisu do rejestru', 'Podkreśl w biogramie zdania, których nie da się sprawdzić („pasjonat”, „ekspert z wieloletnim doświadczeniem”). Zamień je na fakty albo usuń.', 'średni', 'Wytyczne dla oceniających, 3.4'],
      ['B5', 'Treść pokazuje doświadczenie z pierwszej ręki: własne zdjęcia, zrzuty ekranu, dane, opis testu albo przykład z realizacji', 'Przy każdym poradniku zapisz, co w nim jest Wasze, a czego nie ma w innych wynikach. Brak takiego elementu to znak, że tekst streszcza innych.', 'wysoki', 'Google: przydatne treści; wytyczne, 3.4'],
      ['B6', 'Treści YMYL (zdrowie, finanse, bezpieczeństwo, sprawy obywatelskie) pisze albo sprawdza osoba z kwalifikacjami, a na stronie widać, kto i kiedy je sprawdził', 'Najpierw zrób krok 0. Przy temacie YMYL dopisz pod treścią np. „Sprawdził: [imię i nazwisko], [zawód], [data]”. Temat spoza YMYL: n/d.', 'wysoki', 'Wytyczne dla oceniających, 3.4.1'],
      ['B7', 'Jeśli AI istotnie pomogło stworzyć treść, a czytelnik mógłby zapytać „jak to powstało?”, strona to wyjaśnia, a AI nie jest podpisane jako autor', 'Zapisz zasadę redakcyjną: kto sprawdza fakty w tekstach pisanych z pomocą AI. Według Google podpis „AI” w miejscu autora to raczej nie najlepszy sposób, by to pokazać.', 'średni', 'Google: treści generowane przez AI (FAQ)'],
      ['B8', 'Strona trzyma się swoich tematów: treści dotyczą tego, czym firma się zajmuje i na czym znają się autorzy', 'Pogrupuj artykuły według tematów. Teksty spoza specjalizacji, pisane tylko pod ruch z Google, przekaż do przeglądu.', 'średni', 'Google: przydatne treści'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Treść',
    h3: 'C. Treść: dokładność, źródła i aktualność (8 punktów)',
    opis: 'Czy treść jest poprawna i ma źródła, czy daty mówią prawdę, czy tekst wnosi coś własnego i czy wiadomo, jak powstał.',
    punkty: [
      ['C1', 'Liczby, przepisy, zalecenia i cytaty mają źródło: link do dokumentu pierwotnego, a nie do streszczenia', 'Zaznacz w tekście każdą liczbę i każde „według…”. Przy każdym ma być link albo nazwa źródła z datą.', 'wysoki', 'Google: przydatne treści (pytania o wiedzę)'],
      ['C2', 'Treść nie ma błędów, które łatwo sprawdzić, a w tematach YMYL zgadza się z ustaleniami ekspertów', 'Daj tekst osobie z branży, która go nie pisała. Google sam radzi poprosić o ocenę zaufane osoby niezwiązane ze stroną.', 'wysoki', 'Google: przydatne treści (dokładność)'],
      ['C3', 'Strona pokazuje datę publikacji albo aktualizacji z etykietą („Opublikowano”, „Zaktualizowano”)', 'Sprawdź artykuły i strony z danymi, które się zmieniają: ceny, przepisy, stawki. Data bez etykiety jest niejasna.', 'średni', 'Google: daty w wynikach wyszukiwania'],
      ['C4', 'Data aktualizacji zmienia się tylko po istotnej zmianie treści', 'Porównaj datę „Zaktualizowano” z historią zmian w CMS. Zmiana samej daty, żeby strona wyglądała na świeżą, Google wymienia jako sygnał treści pisanej pod wyszukiwarkę.', 'średni', 'Google: przydatne treści'],
      ['C5', 'Treść wnosi coś własnego: dane, przykład, analizę albo wnioski z praktyki, a nie przepisuje innych źródeł', 'Porównaj tekst z trzema pierwszymi wynikami w Google. Wypisz, czego nie ma u nich, a jest u Ciebie. Pusta lista: do poprawy.', 'wysoki', 'Google: przydatne treści (oryginalność)'],
      ['C6', 'Tytuł i nagłówek H1 rzetelnie opisują treść: bez przesady, sensacji i obietnic, których tekst nie spełnia', 'Przeczytaj tytuł, a potem tekst. Czy tytuł obiecuje coś, czego w treści nie ma?', 'średni', 'Google: przydatne treści'],
      ['C7', 'Tam, gdzie to ważne, treść mówi, jak powstała: jak testowaliście, ile rzeczy sprawdziliście, skąd są dane i z jakiego okresu', 'Recenzje, rankingi, porównania i raporty z danymi muszą mieć opis metody. Zwykły poradnik: często n/d.', 'średni', 'Google: przydatne treści („Jak”)'],
      ['C8', 'Tekst jest staranny, bez literówek i błędów, a reklamy i wyskakujące okna nie zasłaniają głównej treści', 'Przeczytaj stronę na telefonie. Sprawdź, czy dojdziesz do treści bez zamykania okien.', 'średni', 'Google: przydatne treści; wytyczne, 2.4'],
    ],
  },
  {
    id: 'D',
    nazwa: 'Reputacja',
    h3: 'D. Reputacja: co mówią o Was inni (7 punktów)',
    opis: 'Co o firmie i autorach piszą niezależne źródła, jak wyglądają opinie i czy rekomendacje na stronie ujawniają konflikt interesów.',
    punkty: [
      ['D1', 'Wiesz, co o firmie piszą inni: wyniki dla [nazwa firmy -site:twojadomena.pl] i [nazwa firmy opinie -site:twojadomena.pl]', 'Wpisz oba zapytania w Google, przejrzyj dwie pierwsze strony wyników i zapisz ustalenia w tabeli reputacji na ostatniej stronie szablonu.', 'wysoki', 'Wytyczne dla oceniających, 3.3.3'],
      ['D2', 'Autorzy też mają ślad w sieci: publikacje, wystąpienia, profil zawodowy, wpis w rejestrze zawodowym', 'Wyszukaj [imię i nazwisko autora + temat]. Jeśli nic nie ma, zacznij od profilu zawodowego i podlinkuj go w biogramie.', 'średni', 'Wytyczne dla oceniających, 3.3.4'],
      ['D3', 'Wizytówka Google i serwisy z opiniami mają aktualne opinie, a firma na nie odpowiada, także na krytyczne', 'Panel wizytówki → opinie. Odpowiadaj rzeczowo i bez danych klienta. Pojedyncze negatywne opinie są normalne; liczy się ich treść.', 'średni', 'Wytyczne dla oceniających, 3.3.2'],
      ['D4', 'Firma nie kupuje opinii, nie daje za nie rabatów ani prezentów i nie publikuje ich z wielu kont', 'Sprawdź, jak firma prosi o opinie: e-maile, ulotki, kody rabatowe. Zasady Map Google zabraniają opinii płatnych i nagradzanych.', 'wysoki', 'Zasady treści w Mapach Google'],
      ['D5', 'Powtarzające się skargi zostały zbadane, a ich przyczyna naprawiona', 'Pogrupuj krytyczne opinie i wzmianki według tematu. Problem, który wraca, trzeba rozwiązać w firmie, nie w treści strony.', 'średni', 'Wytyczne dla oceniających, 3.3.2'],
      ['D6', 'Niezależne źródła wspominają firmę albo autorów: media branżowe, organizacje, katalogi, wydarzenia', 'Wypisz wzmianki z ostatnich 12 miesięcy. Artykuł sponsorowany i własne profile w mediach społecznościowych nie są niezależnym źródłem.', 'średni', 'Wytyczne dla oceniających, 3.3.1'],
      ['D7', 'Rekomendacje, rankingi i recenzje ujawniają konflikt interesów: własny produkt, link afiliacyjny, płatną współpracę', 'Sprawdź każdy tekst, który poleca produkt lub firmę. Informacja ma stać przy treści, a nie tylko w regulaminie.', 'wysoki', 'Wytyczne dla oceniających, 3.4'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Dane strukturalne',
    h3: 'E. Dane strukturalne: firma i autorzy opisani dla Google (5 punktów)',
    opis: 'Znaczniki JSON-LD, które pomagają Google połączyć treść z firmą i autorem. Mają opisywać to, co już widać na stronie.',
    punkty: [
      ['E1', 'Strona główna ma dane Organization albo LocalBusiness: nazwa, logo, adres, kontakt i sameAs z profilami firmy', 'Test wyników z elementami rozszerzonymi albo walidator schema.org. Darmowy audyt SEO sprawdzi, czy takie dane są na stronie.', 'średni', 'Google: dane Organization'],
      ['E2', 'Artykuły mają dane Article, w których każdy autor ma osobne pole author z typem Person i adresem url albo sameAs', 'Walidator schema.org na jednym artykule. Nazwisko w znacznikach ma być takie samo jak w podpisie.', 'średni', 'Google: dane Article'],
      ['E3', 'Strona autora ma dane ProfilePage, a autor jest jej głównym tematem (mainEntity)', 'Walidator na stronie autora. Przy jednym autorze wystarczy węzeł Person ze stałym @id na stronie „O nas”, na który wskazują artykuły.', 'niski', 'Google: dane ProfilePage'],
      ['E4', 'Daty datePublished i dateModified w danych zgadzają się z datami widocznymi na stronie', 'Porównaj JSON-LD z datą pod tytułem. Daty nie mogą być z przyszłości.', 'średni', 'Google: daty w wynikach wyszukiwania'],
      ['E5', 'Dane strukturalne opisują tylko to, co czytelnik widzi: żadnych ukrytych autorów, ocen ani opinii', 'Porównaj każdą właściwość JSON-LD z treścią strony. Fałszywe opinie w znacznikach Google wymienia jako niedozwolone.', 'wysoki', 'Google: ogólne wskazówki dotyczące danych strukturalnych'],
    ],
  },
];

const EN_OBSZARY = [
  {
    id: 'A',
    nazwa: 'Trust',
    h3: 'A. Trust: who is behind the site (8 checks)',
    opis: 'What the site says about itself: who is responsible for it, how to get in touch, whether selling is fair and safe, and whether claims are backed up.',
    punkty: [
      ['A1', 'The About page says who is responsible for the site: the full business or personal name, what you do, where you operate and who runs it', 'Read your About page as someone who has never heard of you. Within a minute they should know who is behind the content and the offer.', 'high', 'Rater guidelines, 2.5.2'],
      ['A2', 'Contact details are easy to find from every page: phone, email, address or service area, and company details', 'Check the footer and menu on the homepage, an article and a service page. A contact form alone isn’t enough for services or sales.', 'high', 'Rater guidelines, 2.5.3'],
      ['A3', 'If the site takes orders or payments, the terms, payment, returns and complaints policies and customer service contact are public', 'Go through the order path to the end. Note where a customer finds this information before paying. No online sales: N/A.', 'high', 'Rater guidelines, 2.5.3 and 3.4'],
      ['A4', 'The site is safe: HTTPS with no browser warnings, no suspicious redirects, forced downloads or ads posing as content', 'Open a few pages in a private window and on a phone. Our free SEO audit also checks HTTPS and the http:// redirect.', 'high', 'Rater guidelines, 3.4 (safety)'],
      ['A5', 'Claims about the business (number of clients, results, awards, certificates, “No. 1”) are backed by a source, a date or a document', 'List every number and award on your homepage and About page. Note where the proof is for each. No proof: remove it or make it specific.', 'high', 'Rater guidelines, 3.3.1'],
      ['A6', 'Reviews, testimonials and case studies on the site come from real customers and can be verified', 'Note the source of each testimonial: your Business Profile, an email, the client’s consent. A link to your Google Business Profile lets readers see every review.', 'medium', 'Rater guidelines, 3.3.2'],
      ['A7', 'The offer says plainly what the customer gets: scope, price or how it’s quoted, timing and how to cancel', 'Read a service page as a customer would. Do you know what you’ll pay, or what the price depends on, and how to end the contract?', 'medium', 'Our practice'],
      ['A8', 'Your business name, address, phone number and description match on your site, your Google Business Profile and your other profiles', 'Copy the details from each place into one table and compare them character by character. The same check is in the SEO checklist (C4).', 'medium', 'Our practice'],
    ],
  },
  {
    id: 'B',
    nazwa: 'Authors and experience',
    h3: 'B. Authors and experience: who created the content (8 checks)',
    opis: 'Who wrote the content, whether they’re a real person, whether they know the subject first-hand and whether a qualified person checked YMYL content.',
    punkty: [
      ['B1', 'Articles, guides and reviews carry an author byline wherever a reader might ask “who wrote this?”', 'Review your 10 pages with the most Google traffic. A service page can be credited to the company; an expert guide needs a named person.', 'high', 'Google: helpful content (“Who”)'],
      ['B2', 'The byline links to an author page: their role, what they do, what they write about, and contact details or a professional profile', 'Click the byline. If it isn’t a link or leads to an empty page, the check fails.', 'high', 'Google: helpful content (“Who”)'],
      ['B3', 'The author is a real person: no made-up names, AI-generated headshots or credentials they don’t hold', 'Compare the bio with the author’s professional profile. Google calls fabricated author profiles a form of deception that makes a page untrustworthy.', 'high', 'Google: helpful content (“Who”)'],
      ['B4', 'The bio gives verifiable facts instead of filler: job title, scope of work, projects, and a registration number for a regulated profession', 'Underline every sentence in the bio that can’t be checked (“passionate,” “expert with years of experience”). Replace it with facts or cut it.', 'medium', 'Rater guidelines, 3.4'],
      ['B5', 'The content shows first-hand experience: your own photos, screenshots, data, a description of a test or an example from real work', 'For each guide, note what in it is yours and missing from other results. If there’s nothing, the page is summarizing others.', 'high', 'Google: helpful content; guidelines, 3.4'],
      ['B6', 'YMYL content (health, finance, safety, civic matters) is written or reviewed by a qualified person, and the page shows who reviewed it and when', 'Do step 0 first. For a YMYL topic, add a line such as “Reviewed by [name], [profession], [date]” under the content. Not YMYL: N/A.', 'high', 'Rater guidelines, 3.4.1'],
      ['B7', 'If AI played a substantial part in creating the content and a reader might ask “how was this made?”, the page explains it, and AI isn’t credited as the author', 'Write down an editorial rule: who fact-checks AI-assisted content. Google says an AI author byline is probably not the best way to show it.', 'medium', 'Google: AI-generated content (FAQ)'],
      ['B8', 'The site sticks to its subjects: content covers what the business does and what its authors know', 'Group your articles by topic. Send anything outside your expertise, written only for search traffic, to review.', 'medium', 'Google: helpful content'],
    ],
  },
  {
    id: 'C',
    nazwa: 'Content',
    h3: 'C. Content: accuracy, sources and freshness (8 checks)',
    opis: 'Whether the content is accurate and sourced, whether dates tell the truth, whether the page adds something of its own and whether readers know how it was made.',
    punkty: [
      ['C1', 'Figures, regulations, recommendations and quotes have a source: a link to the original document, not to a summary', 'Highlight every number and every “according to…” in the text. Each needs a link or a named source with a date.', 'high', 'Google: helpful content (expertise questions)'],
      ['C2', 'The content has no easily verified errors, and on YMYL topics it matches established expert consensus', 'Ask someone in your field who didn’t write it to read it. Google itself suggests asking trusted people unaffiliated with your site.', 'high', 'Google: helpful content (accuracy)'],
      ['C3', 'The page shows a publication or update date with a label (“Published,” “Updated”)', 'Check articles and pages with data that changes: prices, rules, rates. A date without a label is unclear.', 'medium', 'Google: byline dates'],
      ['C4', 'The update date only changes when the content changes substantially', 'Compare the “Updated” date with the revision history in your CMS. Google lists changing dates just to look fresh as a sign of search-engine-first content.', 'medium', 'Google: helpful content'],
      ['C5', 'The content adds something of its own: data, an example, analysis or lessons from practice, rather than rewriting other sources', 'Compare the page with the top three Google results. List what you have that they don’t. An empty list fails the check.', 'high', 'Google: helpful content (originality)'],
      ['C6', 'The title and H1 describe the content accurately: no exaggeration, shock value or promises the text doesn’t keep', 'Read the title, then the text. Does the title promise something the page doesn’t deliver?', 'medium', 'Google: helpful content'],
      ['C7', 'Where it matters, the content says how it was made: how you tested, how many things you checked, where the data comes from and what period it covers', 'Reviews, rankings, comparisons and data reports need a method section. A general how-to guide: often N/A.', 'medium', 'Google: helpful content (“How”)'],
      ['C8', 'The writing is careful, with no typos or errors, and ads and pop-ups don’t cover the main content', 'Read the page on a phone. Check that you can reach the content without closing windows.', 'medium', 'Google: helpful content; guidelines, 2.4'],
    ],
  },
  {
    id: 'D',
    nazwa: 'Reputation',
    h3: 'D. Reputation: what others say about you (7 checks)',
    opis: 'What independent sources say about the business and its authors, what reviews look like and whether recommendations on the site disclose conflicts of interest.',
    punkty: [
      ['D1', 'You know what others say about the business: results for [business name -site:yourdomain.com] and [business name reviews -site:yourdomain.com]', 'Run both searches in Google, go through the first two pages of results and record your findings in the reputation table on the last page of the template.', 'high', 'Rater guidelines, 3.3.3'],
      ['D2', 'Authors have a footprint too: publications, talks, a professional profile, an entry in a professional register', 'Search for [author name + topic]. If nothing comes up, start with a professional profile and link to it from the bio.', 'medium', 'Rater guidelines, 3.3.4'],
      ['D3', 'Your Google Business Profile and review sites have recent reviews, and the business replies to them, critical ones included', 'Business Profile → Reviews. Reply factually and leave out customer details. A few negative reviews are normal; what they say matters.', 'medium', 'Rater guidelines, 3.3.2'],
      ['D4', 'The business doesn’t buy reviews, offer discounts or gifts for them, or post them from multiple accounts', 'Check how you ask for reviews: emails, flyers, discount codes. Google Maps policy bans paid and incentivized reviews.', 'high', 'Google Maps content policy'],
      ['D5', 'Recurring complaints have been looked into and the cause fixed', 'Group critical reviews and mentions by topic. A problem that keeps coming back has to be solved in the business, not in the copy.', 'medium', 'Rater guidelines, 3.3.2'],
      ['D6', 'Independent sources mention the business or its authors: trade media, organizations, directories, events', 'List mentions from the last 12 months. Sponsored articles and your own social media profiles are not independent sources.', 'medium', 'Rater guidelines, 3.3.1'],
      ['D7', 'Recommendations, rankings and reviews disclose conflicts of interest: your own product, an affiliate link, paid partnerships', 'Check every page that recommends a product or company. The disclosure belongs next to the content, not only in your terms.', 'high', 'Rater guidelines, 3.4'],
    ],
  },
  {
    id: 'E',
    nazwa: 'Structured data',
    h3: 'E. Structured data: your business and authors described for Google (5 checks)',
    opis: 'JSON-LD markup that helps Google connect content to your business and its authors. It should describe what’s already visible on the page.',
    punkty: [
      ['E1', 'The homepage has Organization or LocalBusiness markup: name, logo, address, contact details and sameAs links to your business profiles', 'Use the Rich Results Test or the schema.org validator. Our free SEO audit checks whether this markup exists.', 'medium', 'Google: Organization structured data'],
      ['E2', 'Articles have Article markup in which each author has a separate author field with the Person type and a url or sameAs', 'Run the schema.org validator on one article. The name in the markup must match the byline.', 'medium', 'Google: Article structured data'],
      ['E3', 'The author page has ProfilePage markup with the author as its main subject (mainEntity)', 'Run the validator on the author page. With a single author, a Person node with a stable @id on the About page, referenced by your articles, is enough.', 'low', 'Google: ProfilePage structured data'],
      ['E4', 'datePublished and dateModified in the markup match the dates visible on the page', 'Compare the JSON-LD with the date under the title. Dates must not be in the future.', 'medium', 'Google: byline dates'],
      ['E5', 'Structured data only describes what readers can see: no hidden authors, ratings or reviews', 'Compare every JSON-LD property with the page content. Google explicitly lists fake reviews in markup as not allowed.', 'high', 'Google: general structured data guidelines'],
    ],
  },
];

export const PUNKTY = { pl: PL_OBSZARY, en: EN_OBSZARY };

// Krok 0 (YMYL): pytania z wytycznych dla oceniających (2.3, wersja z 11.09.2025).
export const KROK0 = {
  pl: {
    h3: 'Krok 0. Czy temat strony jest YMYL?',
    pytania: [
      'Czy rozważna osoba szukałaby tu ekspertów albo bardzo zaufanych źródeł, bo nawet drobny błąd może zaszkodzić? Jeśli tak, temat jest prawdopodobnie YMYL.',
      'Czy większość ludzi zadowoliłaby się luźną rozmową o tym ze znajomymi? Jeśli tak, temat prawdopodobnie nie jest YMYL.',
    ],
    grupy: ['Zdrowie i bezpieczeństwo', 'Bezpieczeństwo finansowe', 'Państwo, sprawy obywatelskie i społeczeństwo', 'Inne tematy, które mogą szkodzić ludziom'],
    oceny: ['Wyraźnie YMYL', 'Może być YMYL', 'Nie YMYL'],
  },
  en: {
    h3: 'Step 0. Is the topic YMYL?',
    pytania: [
      'Would a careful person seek out experts or highly trusted sources here, because even minor inaccuracies could cause harm? If yes, the topic is likely YMYL.',
      'Would most people be content with casually asking their friends about it? If yes, the topic is likely not YMYL.',
    ],
    grupy: ['Health or safety', 'Financial security', 'Government, civics and society', 'Other topics that could hurt people'],
    oceny: ['Clear YMYL', 'May be YMYL', 'Not YMYL'],
  },
};

const ile = (obszary) => obszary.reduce((n, o) => n + o.punkty.length, 0);

function podgladHtml(obszary, en) {
  const k0 = KROK0[en ? 'en' : 'pl'];
  const jak = en ? 'How to check:' : 'Jak sprawdzić:';
  const prio = en ? 'Priority:' : 'Priorytet:';
  const baza = en ? 'Basis:' : 'Podstawa:';
  const krok0 = `<h3>${k0.h3}</h3><p>${en ? 'Answer two questions from Google’s rater guidelines for each group of pages (homepage, services, blog sections):' : 'Dla każdej grupy stron (strona główna, usługi, działy bloga) odpowiedz na dwa pytania z wytycznych Google dla oceniających:'}</p><ol>${k0.pytania.map((p) => `<li>${p}</li>`).join('')}</ol><p>${en ? 'YMYL groups:' : 'Grupy YMYL:'} ${k0.grupy.join('; ')}. ${en ? 'Rating for each group of pages:' : 'Ocena dla każdej grupy stron:'} ☐ ${k0.oceny.join(' ☐ ')}.</p>`;
  const obszaryHtml = obszary
    .map((o) => `<h3>${o.h3}</h3><p>${o.opis}</p><ul>${o.punkty
      .map(([nr, punkt, sposob, p, podstawa]) => `<li>☐ <strong>${nr}. ${punkt}.</strong> ${jak} ${sposob} <em>${prio} ${p}. ${baza} ${podstawa}.</em></li>`)
      .join('')}</ul>`)
    .join('');
  const koniec = en
    ? '<h3>Reputation research and action plan</h3><p>The last page of the PDF has two tables to fill in. In the reputation table, write each search you ran (for example [business name reviews -site:yourdomain.com]), the source you found, its tone (positive, neutral, negative) and what you will do about it. In the action plan, list every open check with the URL, the fix, the owner and the deadline, high priority first.</p>'
    : '<h3>Badanie reputacji i plan działań</h3><p>Na ostatniej stronie PDF są dwie tabele do wypełnienia. W tabeli reputacji wpisz każde zapytanie, które sprawdziłeś (np. [nazwa firmy opinie -site:twojadomena.pl]), znalezione źródło, jego wydźwięk (pozytywny, neutralny, negatywny) i to, co z nim zrobisz. W planie działań wpisz każdy otwarty punkt z adresem strony, poprawką, osobą i terminem, zaczynając od priorytetu wysokiego.</p>';
  return krok0 + obszaryHtml + koniec;
}

const ZRODLA = [
  ['https://developers.google.com/search/docs/fundamentals/creating-helpful-content', 'Google Search Central: tworzenie przydatnych, wiarygodnych treści (E-E-A-T, YMYL, „Kto, jak i po co”)', 'Google Search Central: Creating helpful, reliable, people-first content (E-E-A-T, YMYL, Who, How and Why)'],
  ['https://guidelines.raterhub.com/searchqualityevaluatorguidelines.pdf', 'Google: wytyczne dla oceniających jakość wyszukiwania (wersja z 11.09.2025; rozdz. 2.3, 2.5, 3.3, 3.4)', 'Google: Search Quality Evaluator Guidelines (11 Sep 2025 version; sections 2.3, 2.5, 3.3, 3.4)'],
  ['https://developers.google.com/search/blog/2022/12/google-raters-guidelines-e-e-a-t', 'Google Search Central Blog: E-A-T zyskuje dodatkowe E od doświadczenia (15.12.2022)', 'Google Search Central Blog: E-A-T gets an extra E for Experience (15 Dec 2022)'],
  ['https://developers.google.com/search/blog/2023/02/google-search-and-ai-content', 'Google Search Central Blog: wskazówki dotyczące treści generowanych przez AI (podpisy autorów, ujawnianie AI)', 'Google Search Central Blog: Google Search’s guidance about AI-generated content (bylines, AI disclosures)'],
  ['https://developers.google.com/search/docs/appearance/publication-dates', 'Google Search Central: daty publikacji w wynikach wyszukiwania', 'Google Search Central: Influencing byline dates in Google Search'],
  ['https://developers.google.com/search/docs/appearance/structured-data/article', 'Google Search Central: dane strukturalne Article (autorzy w znacznikach)', 'Google Search Central: Article structured data (author markup best practices)'],
  ['https://developers.google.com/search/docs/appearance/structured-data/profile-page', 'Google Search Central: dane strukturalne ProfilePage', 'Google Search Central: Profile page (ProfilePage) structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/organization', 'Google Search Central: dane strukturalne Organization', 'Google Search Central: Organization structured data'],
  ['https://developers.google.com/search/docs/appearance/structured-data/sd-policies', 'Google Search Central: ogólne wskazówki dotyczące danych strukturalnych', 'Google Search Central: General structured data guidelines'],
  ['https://developers.google.com/search/docs/appearance/ai-features', 'Google Search Central: funkcje AI w wyszukiwarce a Twoja strona', 'Google Search Central: AI features and your website'],
  ['https://developers.google.com/search/docs/essentials/spam-policies', 'Google Search Central: zasady dotyczące spamu (m.in. treści masowe)', 'Google Search Central: Spam policies for Google web search (including scaled content abuse)'],
  ['https://support.google.com/contributionpolicy/answer/7400114', 'Zasady treści w Mapach Google: zakaz płatnych i nagradzanych opinii', 'Maps user-generated content policy: fake engagement and incentivized reviews'],
];

export default {
  slug: 'checklista-e-e-a-t',
  sciezkaEn: '/tools/e-e-a-t-checklist',
  plik: 'checklista-eeat',
  opublikowano: null,
  updated: '2026-11-11',
  fraza: { pl: 'e-e-a-t', en: 'e-e-a-t checklist' },
  frazyDodatkowe: {
    pl: ['ymyl', 'e-e-a-t google', 'eat seo', 'google e-e-a-t', 'e-e-a-t seo'],
    en: ['eeat seo', 'e-e-a-t google', 'eeat guidelines', 'google quality rater guidelines'],
  },
  seo: {
    pl: {
      tytul: 'E-E-A-T: checklista 36 punktów i szablon PDF do pobrania',
      opis: 'E-E-A-T w praktyce: checklista 36 punktów o zaufaniu, autorach, treści, reputacji i YMYL. Ze sposobem sprawdzenia, przykładem i darmowym PDF.',
    },
    en: {
      tytul: 'E-E-A-T checklist: 36 checks + free PDF template (2026)',
      opis: 'A 36-point E-E-A-T checklist for trust, authors, content accuracy, reputation, YMYL and structured data, with how to check each item and a free PDF.',
    },
  },

  pl: {
    okruszek: 'Checklista E-E-A-T',
    tag: 'Szablon do pobrania',
    h1: 'Checklista E-E-A-T: 36 punktów, które pokażą, czy strona budzi zaufanie',
    lead: 'E-E-A-T to doświadczenie, wiedza ekspercka, autorytet i zaufanie: cechy, po których Google i czytelnicy rozpoznają wiarygodną treść. Najważniejsze jest zaufanie, a samo E-E-A-T nie jest konkretnym czynnikiem rankingowym. Nasza checklista ma 36 punktów w pięciu obszarach, każdy ze sposobem sprawdzenia i priorytetem. PDF wyślemy e-mailem.',
    karta: {
      nazwa: 'Checklista E-E-A-T (PDF)',
      opis: '36 punktów: zaufanie, autorzy, treść, reputacja i dane strukturalne. Z oceną tematu YMYL, tabelą reputacji i planem działań.',
      cta: 'Pobierz checklistę',
    },
    sekcje: [
      {
        id: 'czym-jest',
        h2: 'Czym jest Google E-E-A-T i do czego służy',
        html: [
          '<p>E-E-A-T to skrót od czterech angielskich słów: Experience (doświadczenie), Expertise (wiedza ekspercka), Authoritativeness (autorytet) i Trust (zaufanie). Tym pojęciem Google opisuje treści, którym ludzie mogą ufać. Pochodzi ono z wytycznych dla oceniających jakość wyników (Search Quality Rater Guidelines). W grudniu 2022 roku Google dodał do dawnego E-A-T literę E od doświadczenia, dlatego wciąż spotkasz frazy „E-A-T” i „EAT SEO”.</p>',
          '<p>W centrum E-E-A-T jest zaufanie. Pozostałe trzy elementy je wspierają, ale treść nie musi wykazywać wszystkich naraz: jeden tekst jest przydatny dzięki doświadczeniu autora, inny dzięki jego wiedzy. Wytyczne mówią to wprost: strona niewiarygodna ma niskie E-E-A-T bez względu na to, jak doświadczony albo ekspercki wydaje się jej autor.</p>',
          '<p>Zanim zaczniesz, zapamiętaj dwie rzeczy. Po pierwsze, Google pisze, że E-E-A-T samo w sobie nie jest konkretnym czynnikiem rankingowym. Jego systemy korzystają z mieszanki wielu sygnałów, które pomagają rozpoznać treści o cechach E-E-A-T, a w tematach YMYL przykładają do nich jeszcze większą wagę. Po drugie, oceniający jakość (quality raters) nie decydują o pozycjach stron. Ich oceny pomagają Google sprawdzić, czy zmiany w wyszukiwarce działają. Google porównuje to do kart z opiniami gości w restauracji.</p>',
          '<p>Dlatego ta checklista nie liczy „punktów E-E-A-T”, bo takich nie ma. Sprawdza, czy na stronie widać to, czego szuka człowiek, który ma Ci zaufać: kto stoi za firmą i za tekstem, skąd pochodzą informacje i co mówią o Was inni. To te same pytania, które Google zaleca zadać sobie przy ocenie własnych treści.</p>',
        ].join(''),
        tabela: {
          id: 'tabela-elementy',
          caption: 'E-E-A-T: cztery elementy, pytanie kontrolne i przykładowe dowody na stronie',
          columns: [
            { key: 'element', label: 'Element' },
            { key: 'znaczenie', label: 'Co oznacza' },
            { key: 'pytanie', label: 'Pytanie kontrolne' },
            { key: 'dowody', label: 'Co to pokazuje na stronie' },
          ],
          rows: [
            { element: 'Experience: doświadczenie', znaczenie: 'Autor zna temat z pierwszej ręki: używał produktu, wykonał usługę, był w miejscu, o którym pisze', pytanie: 'Czy autor robił to, o czym pisze?', dowody: 'Własne zdjęcia i zrzuty ekranu, opis testu, przykład z realizacji, wnioski z praktyki' },
            { element: 'Expertise: wiedza ekspercka', znaczenie: 'Autor ma wiedzę albo umiejętności potrzebne w danym temacie', pytanie: 'Czy autor ma kwalifikacje do tego tematu?', dowody: 'Biogram z faktami, uprawnienia zawodowe, poprawne i pełne wyjaśnienia' },
            { element: 'Authoritativeness: autorytet', znaczenie: 'Strona albo autor to źródło, do którego inni odsyłają w danym temacie', pytanie: 'Czy inni wskazują Was jako źródło?', dowody: 'Wzmianki w mediach branżowych, rekomendacje organizacji, cytowania i linki z serwisów branżowych' },
            { element: 'Trust: zaufanie', znaczenie: 'Strona jest dokładna, uczciwa, bezpieczna i rzetelna; to element najważniejszy', pytanie: 'Czy można polegać na tej stronie i tej firmie?', dowody: 'Jawne dane firmy i kontakt, źródła przy liczbach, prawdziwe opinie, bezpieczne płatności, ujawniony konflikt interesów' },
          ],
          przypis: 'Definicje za wytycznymi Google dla oceniających jakość (wersja z 11 września 2025 r., rozdział 3.4). Rodzaj i poziom potrzebnego zaufania zależy od strony: sklep potrzebuje bezpiecznych płatności i obsługi klienta, a strona o temacie YMYL – dokładności.',
        },
      },
      {
        id: 'obszary',
        h2: 'Checklista E-E-A-T: 36 punktów w pięciu obszarach',
        html: '<p>Punkty ułożyliśmy według trzech źródeł, z których korzystają oceniający: co strona mówi o sobie, co mówią o niej inni i co widać w samej treści. Do tego dochodzi obszar techniczny, czyli dane strukturalne, które pomagają Google połączyć treść z firmą i autorem.</p>',
        tabela: {
          id: 'tabela-obszary',
          caption: 'Checklista E-E-A-T: pięć obszarów i 36 punktów',
          columns: [
            { key: 'obszar', label: 'Obszar' },
            { key: 'punkty', label: 'Punkty' },
            { key: 'sprawdza', label: 'Co sprawdza' },
            { key: 'gdzie', label: 'Gdzie szukać' },
          ],
          rows: [
            { obszar: 'A. Zaufanie: kto stoi za stroną', punkty: '8', sprawdza: 'Strona „O nas”, kontakt, zasady sprzedaży, bezpieczeństwo, dowody twierdzeń, prawdziwe opinie, jasna oferta', gdzie: 'Strona główna, „O nas”, stopka, ścieżka zamówienia' },
            { obszar: 'B. Autorzy i doświadczenie', punkty: '8', sprawdza: 'Podpisy, strony autorów, prawdziwe profile, doświadczenie z pierwszej ręki, przegląd eksperta przy YMYL, treści z AI', gdzie: 'Artykuły, poradniki, recenzje, strony autorów' },
            { obszar: 'C. Treść: dokładność i źródła', punkty: '8', sprawdza: 'Źródła, poprawność, daty, oryginalność, rzetelne tytuły, opis metody', gdzie: 'Treści z największym ruchem z Google' },
            { obszar: 'D. Reputacja', punkty: '7', sprawdza: 'Co piszą inni, opinie, skargi, niezależne wzmianki, konflikt interesów', gdzie: 'Google (wyszukiwanie z wykluczeniem własnej domeny), wizytówka, media branżowe' },
            { obszar: 'E. Dane strukturalne', punkty: '5', sprawdza: 'Organization, Article z autorem, ProfilePage, zgodność dat, brak ukrytych treści w znacznikach', gdzie: 'Walidator schema.org, Test wyników z elementami rozszerzonymi' },
          ],
          przypis: 'W szablonie PDF przed obszarami jest krok 0: ocena, czy temat strony jest YMYL. Od niej zależy, które punkty idą na początek listy.',
        },
        htmlPo: '<p>Każdy punkt ma sposób sprawdzenia, priorytet i podstawę, czyli dokument Google, z którego wynika. Dwa punkty to nasza praktyka i tak je oznaczamy. Część pokrywa się z <a href="/narzedzia/checklista-seo">checklistą SEO</a> (spójne dane firmy, strona „O nas”, dane Organization), bo sygnały zaufania są też podstawą zwykłego SEO. Priorytet wysoki mają punkty, których brak podważa zaufanie albo łamie zasady Google; średni – te, które osłabiają ocenę; niski – porządkowe.</p>',
      },
      {
        id: 'ymyl',
        h2: 'YMYL: kiedy poprzeczka idzie w górę',
        html: [
          '<p>YMYL (Your Money or Your Life, czyli „Twoje pieniądze albo Twoje życie”) to tematy, w których błąd może poważnie zaszkodzić czyjemuś zdrowiu, stabilności finansowej albo bezpieczeństwu, a także dobru społeczeństwa. Wytyczne dzielą je na cztery grupy: zdrowie i bezpieczeństwo, bezpieczeństwo finansowe, państwo i sprawy obywatelskie oraz inne tematy, które mogą szkodzić ludziom.</p>',
          '<p>YMYL to skala, nie etykieta, a większość tematów YMYL nie jest. Przy wątpliwościach wytyczne podsuwają dwa pytania. Czy rozważna osoba szukałaby tu ekspertów albo bardzo zaufanych źródeł, bo nawet drobny błąd może zaszkodzić? I czy większość ludzi zadowoliłaby się luźną rozmową ze znajomymi? Twierdząca odpowiedź na pierwsze pytanie wskazuje YMYL, na drugie – raczej nie.</p>',
        ].join(''),
        tabela: {
          id: 'tabela-ymyl',
          caption: 'YMYL czy nie: przykłady tematów na podstawie wytycznych Google dla oceniających',
          columns: [
            { key: 'temat', label: 'Temat' },
            { key: 'ocena', label: 'Ocena' },
            { key: 'dlaczego', label: 'Dlaczego' },
            { key: 'checklista', label: 'Co to znaczy w checkliście' },
          ],
          rows: [
            { temat: 'Jak wypełnić formularz podatkowy', ocena: 'Wyraźnie YMYL (finanse)', dlaczego: 'Instrukcja powinna pochodzić od eksperta; błąd może kosztować pieniądze', checklista: 'Autor lub recenzent z kwalifikacjami (B6), źródła w przepisach (C1)' },
            { temat: 'Kiedy jechać na SOR', ocena: 'Wyraźnie YMYL (zdrowie)', dlaczego: 'Zła rada może poważnie zaszkodzić', checklista: 'Tylko eksperci; zgodność z wiedzą medyczną (C2)' },
            { temat: 'Opinie o usługach oszczędzania na emeryturę', ocena: 'YMYL, ale wystarczy doświadczenie', dlaczego: 'Relacje osób, które korzystały z usługi, są wartościowe', checklista: 'Doświadczenie z pierwszej ręki (B5), ujawniony konflikt interesów (D7)' },
            { temat: 'Jak często wymieniać szczoteczkę do zębów', ocena: 'Może być YMYL', dlaczego: 'Temat zdrowotny, ale drobna nieścisłość raczej nie zaszkodzi', checklista: 'Zwykłe punkty; B6 zwykle n/d' },
            { temat: 'Poradnik SEO dla firmy', ocena: 'Raczej nie YMYL; fragmenty o umowach – tak', dlaczego: 'Błąd kosztuje czas i ruch, ale zapisy umowy to już sprawa prawna i finansowa', checklista: 'Pełna lista; przy fragmentach o umowach przegląd prawnika (B6)' },
            { temat: 'Jak często prać dżinsy', ocena: 'Nie YMYL', dlaczego: 'Temat nie niesie ryzyka szkody', checklista: 'Wystarczy zaufanie do firmy i rzetelna treść' },
          ],
          przypis: 'Pięć przykładów pochodzi z wytycznych dla oceniających (rozdziały 2.3 i 3.4.1). Przykład z poradnikiem SEO to nasza ocena według tych samych pytań.',
        },
        htmlPo: '<p>Przy treściach YMYL dwa punkty idą na górę listy: B6 (kto napisał albo sprawdził tekst) i C2 (zgodność z ustaleniami ekspertów). Wytyczne rozróżniają przy tym doświadczenie i wiedzę. Osoba, która przeszła leczenie albo korzystała z usługi finansowej, może wiarygodnie opisać swoje przeżycia. Instrukcja wypełniania formularzy podatkowych albo porównanie metod leczenia to już informacje, które powinny pochodzić od ekspertów. Jeśli przegląd eksperta jeszcze się nie odbył, nie udawaj go: dopisz, że tekst nie jest poradą, i zaplanuj przegląd.</p>',
      },
      {
        id: 'jak-wypelnic',
        h2: 'Jak wypełnić checklistę E-E-A-T krok po kroku',
        html: [
          '<ol>',
          '<li><strong>Wybierz strony do przeglądu.</strong> Nie zaczynaj od całego serwisu. Weź stronę główną, „O nas”, kontakt, 3–5 stron usług i 10 treści z największym ruchem z Google (Search Console → Skuteczność → Strony).</li>',
          '<li><strong>Zrób krok 0: oceń YMYL.</strong> Dla każdej grupy stron zaznacz, czy temat jest wyraźnie YMYL, może być YMYL albo nie jest. To ustala kolejność punktów B6 i C2.</li>',
          '<li><strong>Przejdź obszary A–E.</strong> Przy każdym punkcie zaznacz status: OK, do poprawy albo n/d. Firma bez sprzedaży online? Punkt A3 dostaje n/d.</li>',
          '<li><strong>Zbadaj reputację.</strong> Wpisz w Google zapytania z punktu D1 i zapisz w tabeli na ostatniej stronie, co znalazłeś: źródło, wydźwięk i co z tym zrobisz.</li>',
          '<li><strong>Zapisuj dowody, nie wrażenia.</strong> W notatce wpisz adres i konkret, np. „/blog/vat-2026: brak podpisu, stawki bez źródła”. Ogólne „słabe E-E-A-T” nikomu nie pomoże.</li>',
          '<li><strong>Ułóż plan.</strong> Najpierw punkty z priorytetem wysokim, a przy treściach YMYL najpierw B6 i C2. Każdemu działaniu przypisz osobę i termin w tabeli planu.</li>',
          '<li><strong>Poproś o drugie spojrzenie.</strong> Google radzi, by treści ocenił też ktoś zaufany, ale niezwiązany ze stroną. Daj mu wypełnioną checklistę i poproś, by sprawdził pięć losowych punktów.</li>',
          '</ol>',
          '<p>Pełny przegląd rób raz na pół roku i przy dużych zmianach: nowy autor, nowa usługa, przebudowa strony, fala nowych opinii. Obszar D (reputacja) sprawdzaj co kwartał, bo opinie i wzmianki zmieniają się szybciej niż treść strony.</p>',
        ].join(''),
      },
      {
        id: 'przyklad',
        h2: 'Przykład: fragment wypełnionej checklisty',
        html: '<p>Poniżej fragment checklisty wypełnionej dla fikcyjnego biura rachunkowego z Krakowa, które prowadzi blog o podatkach dla małych firm. To temat YMYL (finanse), więc punkty o autorach i dokładności mają najwyższy priorytet. Dane są przykładowe. Chodzi o to, jak zapisywać status i notatki, żeby checklista od razu była planem pracy.</p>',
        tabela: {
          id: 'tabela-przyklad',
          caption: 'Przykład wypełnienia (fikcyjne biuro rachunkowe, dane przykładowe)',
          columns: [
            { key: 'nr', label: 'Nr' },
            { key: 'punkt', label: 'Punkt' },
            { key: 'status', label: 'Status' },
            { key: 'notatka', label: 'Notatka' },
            { key: 'kto', label: 'Kto i kiedy' },
          ],
          rows: [
            { nr: '0', punkt: 'Ocena YMYL', status: 'Wyraźnie YMYL', notatka: 'Blog o podatkach i składkach: błąd może kosztować klienta odsetki', kto: '–' },
            { nr: 'A1', punkt: 'Strona „O nas”', status: 'Do poprawy', notatka: 'Jest historia biura, brak nazwisk księgowych i informacji o ich uprawnieniach', kto: 'Właścicielka, w tym tygodniu' },
            { nr: 'A5', punkt: 'Dowody twierdzeń', status: 'Do poprawy', notatka: '„Ponad 300 zadowolonych klientów” bez daty i źródła', kto: 'Właścicielka, do końca miesiąca' },
            { nr: 'B1', punkt: 'Podpis autora', status: 'Do poprawy', notatka: '14 z 20 wpisów podpisanych „Redakcja”', kto: 'Redakcja, do końca miesiąca' },
            { nr: 'B3', punkt: 'Prawdziwy autor', status: 'OK', notatka: 'Autorzy to pracownicy biura, zdjęcia z sesji w biurze', kto: '–' },
            { nr: 'B6', punkt: 'Przegląd eksperta (YMYL)', status: 'Do poprawy', notatka: 'Teksty o VAT pisze asystentka; nigdzie nie widać, że sprawdza je doradca podatkowy', kto: 'Doradca podatkowy, od razu' },
            { nr: 'C1', punkt: 'Źródła', status: 'Do poprawy', notatka: 'Stawki i limity bez linków do przepisów i komunikatów urzędów', kto: 'Autorzy, przy aktualizacji tekstów' },
            { nr: 'C4', punkt: 'Data aktualizacji', status: 'Do poprawy', notatka: 'Daty zmienione hurtowo w styczniu, choć treść została bez zmian', kto: 'Webmaster, od razu' },
            { nr: 'D4', punkt: 'Opinie bez nagród', status: 'Do poprawy', notatka: 'Ulotka „opinia w Google = 10% rabatu”', kto: 'Właścicielka, od razu' },
            { nr: 'E2', punkt: 'Article z autorem', status: 'Do poprawy', notatka: 'Wtyczka wpisuje jako autora nazwę biura zamiast osoby z podpisu', kto: 'Webmaster, po B1' },
          ],
        },
        htmlPo: '<p>Najpierw idą punkty, które podważają zaufanie albo łamią zasady: rabat za opinię (D4), hurtowa zmiana dat (C4) i brak przeglądu eksperta przy tekstach o VAT (B6). Podpisy, strona „O nas” i źródła to praca na kilka tygodni. Dane strukturalne poprawia się na końcu, bo mają opisywać to, co już jest na stronie: najpierw prawdziwy podpis, potem znacznik autora.</p>',
      },
      {
        id: 'dowody',
        h2: 'Jak pokazać doświadczenie i wiedzę bez przesady',
        html: [
          '<p>Google proponuje trzy pytania do każdej treści: kto ją stworzył, jak powstała i po co. Dobrze podpowiadają, co dodać na stronie.</p>',
          '<ul>',
          '<li><strong>Kto.</strong> Podpis z imieniem i nazwiskiem tam, gdzie czytelnik go oczekuje, i link do strony autora. W biogramie fakty: rola w firmie, czym się zajmuje, przykłady prac, profil zawodowy. W zawodach regulowanych także numer wpisu, który da się sprawdzić w rejestrze.</li>',
          '<li><strong>Jak.</strong> Przy recenzjach, porównaniach i raportach opis metody: ile rzeczy sprawdziliście, w jaki sposób i z jakiego okresu są dane. Jeśli tekst powstał w dużej części z pomocą AI i czytelnik mógłby o to zapytać, napisz o tym i wyjaśnij, kto sprawdził fakty.</li>',
          '<li><strong>Po co.</strong> Google pisze, że to chyba najważniejsze z trzech pytań. Treść ma pomagać ludziom, którzy trafią na nią bezpośrednio, a nie tylko ściągać ruch z wyszukiwarki. Tekst o temacie, na którym firma się nie zna, napisany tylko dlatego, że fraza ma duży wolumen, nie przejdzie tego testu.</li>',
          '</ul>',
          '<p>Przykład z naszej strony: na <a href="/o-nas">stronie O nas</a> jest opis osoby, która prowadzi SEO klientów i pisze poradniki, a dane strukturalne Person mają stały identyfikator, na który wskazują artykuły. Wyniki pokazujemy jako dane z Search Console z opisem metody pomiaru, jak w <a href="/blog/wyniki-wdrozen-seo-2026">zestawieniu wyników pięciu wdrożeń SEO</a>, a nie jako ogólne zapewnienia.</p>',
          '<p>Dane strukturalne są dodatkiem, nie skrótem. Google zaleca, by w znacznikach Article każdy autor miał osobne pole z typem i adresem url albo sameAs, a stronę autora można oznaczyć jako ProfilePage. Znaczniki muszą jednak opisywać to, co czytelnik widzi. Autor dodany tylko w JSON-LD nic nie da, a fałszywe opinie w znacznikach Google wymienia jako niedozwolone.</p>',
        ].join(''),
      },
      {
        id: 'bledy',
        h2: 'Najczęstsze błędy w pracy nad E-E-A-T',
        html: [
          '<ul>',
          '<li><strong>Traktowanie E-E-A-T jak wskaźnika do podbicia.</strong> „E-E-A-T SEO” nie polega na dodaniu ramki z autorem. Google ocenia stronę wieloma sygnałami, a ramka bez prawdziwej wiedzy w treści niczego nie zmieni.</li>',
          '<li><strong>Wymyśleni eksperci.</strong> Zdjęcie z generatora AI, zmyślone nazwisko, tytuł, którego nikt nie nadał. Google nazywa to oszustwem, które czyni stronę niewiarygodną dla ludzi i dla jego systemów.</li>',
          '<li><strong>Odświeżanie samych dat.</strong> Zmianę daty bez istotnej zmiany treści Google wymienia jako znak treści pisanej pod wyszukiwarkę. Do tego wprowadza czytelnika w błąd.</li>',
          '<li><strong>Kupowanie i nagradzanie opinii.</strong> Rabat za opinię, opinie pisane przez pracowników albo z kilku kont jednej osoby łamią zasady Map Google, a takie opinie są usuwane. Jak prosić o opinie zgodnie z zasadami, opisujemy w poradniku <a href="/blog/jak-pozyskiwac-opinie-google-poradnik">opinie Google: jak je zdobywać i jak odpowiadać</a>.</li>',
          '<li><strong>Ukryty konflikt interesów.</strong> Ranking, w którym wygrywa własny produkt, albo recenzja z linkiem afiliacyjnym bez informacji o tym. Wytyczne każą traktować takie treści jako mniej wiarygodne.</li>',
          '<li><strong>Kopiowany biogram.</strong> Ten sam akapit „ekspert z wieloletnim doświadczeniem” pod każdym autorem nie mówi nic o żadnym z nich.</li>',
          '<li><strong>Teksty pisane pod liczbę słów.</strong> Google pisze, że nie ma preferowanej długości treści. Rozwlekanie tekstu pod limit to pisanie dla wyszukiwarki, a nie dla czytelnika.</li>',
          '<li><strong>Masowe teksty bez wartości.</strong> Tworzenie wielu stron głównie po to, by manipulować wynikami, bez pożytku dla czytelnika, Google nazywa nadużyciem treści masowych (scaled content abuse) – niezależnie od tego, czy pisze je człowiek, czy AI.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'kiedy-audyt',
        h2: 'Kiedy checklista nie wystarczy',
        html: [
          '<p>Checklistę przejdziesz sam w kilka godzin. Część punktów technicznych, takich jak HTTPS i dane strukturalne Organization, sprawdzi <a href="/narzedzia/audyt-seo">darmowy audyt SEO</a>. Resztę musi ocenić człowiek, bo E-E-A-T dotyczy tego, jak firma i treść wyglądają w oczach czytelnika.</p>',
          '<p>Pomoc z zewnątrz ma sens, gdy strona traci ruch po aktualizacji algorytmu, gdy publikujesz treści YMYL albo gdy lista problemów jest długa i trzeba ułożyć ją w plan. <a href="/audyt-seo">Audyt SEO</a> obejmuje technikę i Core Web Vitals, treści i semantykę oraz profil linków; jako osobna usługa kosztuje od 1 490 zł netto. Część poprawek, np. nowe treści z własnymi danymi i źródłami, mieści się w <a href="/pozycjonowanie-stron-internetowych">pozycjonowaniu stron</a>: pakiet Standard to do 20 fraz, 2 treści i 2 linki miesięcznie, od 1 900 zł netto.</p>',
          '<p>A odpowiedzi AI? Google pisze, że do przeglądów AI i trybu AI nie ma dodatkowych wymagań poza podstawami SEO. Nie obiecujemy, że praca nad E-E-A-T da cytowania w ChatGPT czy Gemini. Jeśli chcesz sprawdzić, czy modele wymieniają Twoją firmę, zobacz <a href="/pozycjonowanie-w-ai">pozycjonowanie w AI</a>: audyt widoczności w AI kosztuje 990 zł netto.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Podgląd szablonu: cała checklista E-E-A-T',
      opis: `Tak wygląda zawartość szablonu: krok 0 (YMYL), ${ile(PL_OBSZARY)} punktów w pięciu obszarach, tabela reputacji i plan działań. W PDF przy każdym punkcie są pola na status (OK, do poprawy, n/d) i notatki z osobą i terminem.`,
      html: podgladHtml(PL_OBSZARY, false),
    },
    formularz: {
      h2: 'Pobierz szablon PDF',
      opis: 'Wyślemy Ci checklistę E-E-A-T w PDF do wydruku: krok 0 z oceną YMYL, 36 punktów z polami na status i notatki, tabelę badania reputacji i plan działań.',
      etykieta: 'E-mail, na który wyślemy checklistę',
      przycisk: 'Wyślij checklistę (PDF)',
      przedmiot: 'checklistę E-E-A-T',
      komunikatOk: 'Wysłane. Sprawdź skrzynkę (także folder Oferty albo Spam): link do checklisty E-E-A-T w PDF przyjdzie w ciągu minuty.',
    },
    kroki: [
      { name: 'Wybierz strony do przeglądu', text: 'Weź stronę główną, „O nas”, kontakt, 3–5 stron usług i 10 treści z największym ruchem z Google według Search Console.' },
      { name: 'Oceń, czy temat jest YMYL', text: 'Dla każdej grupy stron odpowiedz na dwa pytania z kroku 0 i zaznacz: wyraźnie YMYL, może być YMYL albo nie YMYL.' },
      { name: 'Przejdź obszary A–E', text: 'Przy każdym z 36 punktów zaznacz status: OK, do poprawy albo n/d, i wpisz w notatce adres strony oraz konkretny problem.' },
      { name: 'Zbadaj reputację', text: 'Wpisz w Google nazwę firmy z wykluczeniem własnej domeny i zapisz w tabeli reputacji źródła, ich wydźwięk i planowane działania.' },
      { name: 'Ułóż plan działań', text: 'Zacznij od priorytetu wysokiego, a przy treściach YMYL od punktów B6 i C2. Każdemu działaniu przypisz osobę i termin.' },
      { name: 'Poproś o drugie spojrzenie', text: 'Daj wypełnioną checklistę zaufanej osobie spoza firmy i poproś o sprawdzenie pięciu losowych punktów. Pełny przegląd powtarzaj co pół roku.' },
    ],
    faq: [
      {
        question: 'Czy E-E-A-T to czynnik rankingowy?',
        answer: 'Nie w sensie jednego wskaźnika. Google pisze wprost, że E-E-A-T samo w sobie nie jest konkretnym czynnikiem rankingowym. Jego systemy korzystają z wielu sygnałów, które pomagają rozpoznać treści pokazujące doświadczenie, wiedzę, autorytet i zaufanie, a w tematach YMYL przykładają do nich jeszcze większą wagę. Dlatego nie da się „dodać E-E-A-T” jednym elementem, na przykład ramką z autorem. Liczy się to, czy cała strona zasługuje na zaufanie.',
      },
      {
        question: 'Czym jest YMYL i skąd mam wiedzieć, czy mój temat się kwalifikuje?',
        answer: 'YMYL to tematy, w których błąd może zaszkodzić zdrowiu, finansom lub bezpieczeństwu ludzi albo społeczeństwu, na przykład leczenie, podatki, inwestowanie czy zasady głosowania. Wytyczne Google radzą zadać dwa pytania: czy rozważna osoba szukałaby tu eksperta, bo nawet drobny błąd może zaszkodzić, i czy większość ludzi zadowoliłaby się radą znajomych. Pierwsze „tak” wskazuje YMYL. Większość tematów, na przykład pranie dżinsów, YMYL nie jest.',
      },
      {
        question: 'Czy oceniający jakość Google mogą obniżyć pozycję mojej strony?',
        answer: 'Nie. Według Google oceniający jakość (quality raters) nie mają wpływu na pozycje stron, a ich oceny nie są bezpośrednio używane w algorytmach rankingowych. Służą do sprawdzania, czy zmiany w wyszukiwarce działają. Wytyczne dla oceniających (Google quality rater guidelines) warto jednak przeczytać, bo dobrze opisują, po czym ludzie poznają wiarygodną stronę. Na nich oparliśmy dużą część tej checklisty.',
      },
      {
        question: 'Czy treści pisane z pomocą AI mają słabsze E-E-A-T?',
        answer: 'Nie z samego powodu użycia AI. Google pisze, że właściwe użycie AI lub automatyzacji nie łamie jego wytycznych, a problemem jest tworzenie treści głównie po to, by manipulować wynikami wyszukiwania. Liczy się efekt: czy tekst jest dokładny, wnosi coś własnego i czy ktoś z wiedzą go sprawdził. Gdy czytelnik mógłby zapytać „jak to powstało?”, warto to wyjaśnić. Podpis „AI” w miejscu autora Google uważa za raczej nie najlepszy sposób.',
      },
      {
        question: 'Czy praca nad E-E-A-T pomoże w przeglądach AI i w ChatGPT?',
        answer: 'Tego nie obiecujemy. Google pisze, że do przeglądów AI i trybu AI nie ma dodatkowych wymagań: obowiązują te same podstawy SEO co w zwykłych wynikach. ChatGPT, Perplexity i inne modele mają własne sposoby wybierania źródeł. Rzetelna, podpisana treść ze źródłami jest po prostu dobrą treścią, niezależnie od tego, kto ją czyta. Jeśli chcesz wiedzieć, czy modele wymieniają Twoją firmę, potrzebny jest osobny pomiar odpowiedzi AI.',
      },
      {
        question: 'Czy mała firma bez bloga potrzebuje stron autorów?',
        answer: 'Nie zawsze. Podpis autora jest potrzebny tam, gdzie czytelnik zapyta „kto to napisał?”, czyli przy poradnikach, artykułach i recenzjach. Stronę usługi czy cennik może podpisać firma. Wtedy ważniejsze są punkty z obszaru A: kto prowadzi firmę, jak się z nią skontaktować, prawdziwe opinie i jasna oferta. Punkty o autorach oznacz wtedy jako n/d i nie licz ich w wyniku.',
      },
    ],
    zrodla: ZRODLA.map(([url, nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/narzedzia/checklista-seo', tekst: 'Checklista SEO', opis: '50 punktów: technika, on-page, SEO lokalne, gotowość na AI i pomiar' },
      { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', tekst: 'Opinie Google: jak je zdobywać i jak odpowiadać', opis: 'proces zbierania opinii zgodny z zasadami i 6 wzorów odpowiedzi' },
      { href: '/audyt-seo', tekst: 'Audyt SEO strony', opis: 'technika, treści i profil linków z planem napraw, od 1 490 zł netto' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'Pozycjonowanie stron internetowych', opis: 'stała praca nad treścią, techniką i linkami, pakiet Standard od 1 900 zł netto' },
      { href: '/pozycjonowanie-w-ai', tekst: 'Pozycjonowanie w AI', opis: 'pomiar i działania w ChatGPT, Gemini, Perplexity i przeglądach AI Google' },
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Dane strukturalne: wzory JSON-LD', opis: '7 wzorów schema.org, m.in. Organization, Person i Article' },
    ],
    plikNazwa: 'Checklista E-E-A-T: 36 punktów kontrolnych (PDF)',
  },

  en: {
    okruszek: 'E-E-A-T checklist',
    tag: 'Free template',
    h1: 'E-E-A-T checklist: 36 checks to see whether your site earns trust',
    lead: 'An E-E-A-T checklist tests whether your site shows experience, expertise, authoritativeness and trust: the qualities Google and readers use to judge reliable content. Trust matters most, and E-E-A-T itself isn’t a specific ranking factor. Ours has 36 checks across five areas, each with a way to verify it and a priority. We’ll email you the PDF.',
    karta: {
      nazwa: 'E-E-A-T checklist (PDF)',
      opis: '36 checks across trust, authors, content, reputation and structured data, plus a YMYL assessment, a reputation table and an action plan.',
      cta: 'Get the checklist',
    },
    sekcje: [
      {
        id: 'what-it-is',
        h2: 'Google E-E-A-T: what it is and how Google uses it',
        html: [
          '<p>E-E-A-T stands for Experience, Expertise, Authoritativeness and Trust. It’s how Google describes content people can rely on, and the term comes from the Google quality rater guidelines (officially the Search Quality Evaluator Guidelines). In December 2022 Google added the first E, for experience, to what used to be E-A-T, which is why you still see “E-A-T” and “EAT SEO” around. Many people simply write EEAT, and “EEAT SEO” and “EEAT guidelines” all point to the same idea.</p>',
          '<p>Trust sits at the center of E-E-A-T. The other three support it, but content doesn’t have to show all of them at once: one page is useful because of the author’s experience, another because of their expertise. The guidelines are blunt about it: an untrustworthy page has low E-E-A-T no matter how experienced or expert its creator seems.</p>',
          '<p>Two things to know before you start. First, Google says E-E-A-T itself isn’t a specific ranking factor. Its systems use a mix of many signals that help identify content with good E-E-A-T, and for YMYL topics they give that content even more weight. Second, quality raters don’t decide rankings. Their ratings help Google check whether changes to Search are working, much like the feedback cards a restaurant gets from diners.</p>',
          '<p>So this checklist doesn’t score “E-E-A-T points,” because there are none. It checks whether your site shows what a person deciding whether to trust you looks for: who is behind the business and the content, where the information comes from and what others say about you. These are the same questions Google suggests asking when you assess your own content.</p>',
        ].join(''),
        tabela: {
          id: 'table-elements',
          caption: 'E-E-A-T: the four elements, a test question and evidence on the page',
          columns: [
            { key: 'element', label: 'Element' },
            { key: 'meaning', label: 'What it means' },
            { key: 'question', label: 'Test question' },
            { key: 'evidence', label: 'What shows it on the page' },
          ],
          rows: [
            { element: 'Experience', meaning: 'The creator knows the subject first-hand: used the product, delivered the service, visited the place', question: 'Has the author actually done what they write about?', evidence: 'Your own photos and screenshots, a description of a test, an example from real work, lessons from practice' },
            { element: 'Expertise', meaning: 'The creator has the knowledge or skill the topic requires', question: 'Is the author qualified for this topic?', evidence: 'A bio with facts, professional credentials, accurate and complete explanations' },
            { element: 'Authoritativeness', meaning: 'The site or creator is a go-to source others point to for the topic', question: 'Do others cite you as a source?', evidence: 'Mentions in trade media, recommendations from organizations, citations and links from industry sites' },
            { element: 'Trust', meaning: 'The page is accurate, honest, safe and reliable; this is the most important element', question: 'Can people rely on this page and this business?', evidence: 'Public company and contact details, sources for figures, genuine reviews, secure payments, disclosed conflicts of interest' },
          ],
          przypis: 'Definitions follow Google’s rater guidelines (11 September 2025 version, section 3.4). The type and amount of trust needed depends on the page: an online store needs secure payments and customer service, while a page on a YMYL topic needs accuracy.',
        },
      },
      {
        id: 'areas',
        h2: 'The E-E-A-T checklist: 36 checks in five areas',
        html: '<p>We grouped the checks around the three sources raters use: what the site says about itself, what others say about it and what’s visible in the content itself. On top of that comes a technical area, structured data, which helps Google connect your content to your business and its authors.</p>',
        tabela: {
          id: 'table-areas',
          caption: 'E-E-A-T checklist: five areas and 36 checks',
          columns: [
            { key: 'area', label: 'Area' },
            { key: 'checks', label: 'Checks' },
            { key: 'covers', label: 'What it covers' },
            { key: 'where', label: 'Where to look' },
          ],
          rows: [
            { area: 'A. Trust: who is behind the site', checks: '8', covers: 'About page, contact details, sales policies, safety, proof for claims, genuine reviews, a clear offer', where: 'Homepage, About page, footer, order path' },
            { area: 'B. Authors and experience', checks: '8', covers: 'Bylines, author pages, real profiles, first-hand experience, expert review for YMYL, AI-assisted content', where: 'Articles, guides, reviews, author pages' },
            { area: 'C. Content: accuracy and sources', checks: '8', covers: 'Sources, accuracy, dates, originality, honest titles, methodology', where: 'Your pages with the most Google traffic' },
            { area: 'D. Reputation', checks: '7', covers: 'What others say, reviews, complaints, independent mentions, conflicts of interest', where: 'Google (searches that exclude your own domain), Business Profile, trade media' },
            { area: 'E. Structured data', checks: '5', covers: 'Organization, Article with author, ProfilePage, matching dates, nothing hidden in markup', where: 'schema.org validator, Rich Results Test' },
          ],
          przypis: 'In the PDF template, step 0 comes before the areas: deciding whether the topic is YMYL. That decides which checks go to the top of your list.',
        },
        htmlPo: '<p>Every check in the E-E-A-T checklist has a way to verify it, a priority and a basis: the Google document it comes from. Two checks are our own practice, and they’re labeled that way. Some overlap with our <a href="/en/tools/seo-checklist">SEO checklist</a> (consistent business details, the About page, Organization markup), because trust signals are also the foundation of ordinary SEO. High priority marks checks whose failure undermines trust or breaks Google’s rules; medium marks those that weaken the assessment; low marks housekeeping.</p>',
      },
      {
        id: 'ymyl',
        h2: 'YMYL: when the bar goes up',
        html: [
          '<p>YMYL (Your Money or Your Life) covers topics where mistakes could significantly harm someone’s health, financial stability or safety, or the welfare of society. The guidelines group them into four types: health or safety, financial security, government, civics and society, and other topics that could hurt people.</p>',
          '<p>YMYL is a spectrum, not a label, and most topics aren’t YMYL at all. When in doubt, the guidelines suggest two questions. Would a careful person seek out experts or highly trusted sources, because even minor inaccuracies could cause harm? And would most people be content with casually asking their friends? A yes to the first points to YMYL; a yes to the second suggests it isn’t.</p>',
        ].join(''),
        tabela: {
          id: 'table-ymyl',
          caption: 'YMYL or not: example topics based on Google’s rater guidelines',
          columns: [
            { key: 'topic', label: 'Topic' },
            { key: 'rating', label: 'Rating' },
            { key: 'why', label: 'Why' },
            { key: 'checklist', label: 'What it means for the checklist' },
          ],
          rows: [
            { topic: 'How to fill out tax forms', rating: 'Clear YMYL (finance)', why: 'Instructions should come from experts; a mistake can cost money', checklist: 'A qualified author or reviewer (B6), sources in the regulations (C1)' },
            { topic: 'When to go to the emergency room', rating: 'Clear YMYL (health)', why: 'Bad advice could cause serious harm', checklist: 'Experts only; consistent with medical consensus (C2)' },
            { topic: 'Reviews of retirement savings services', rating: 'YMYL, but experience is enough', why: 'Accounts from people who used the service are valuable', checklist: 'First-hand experience (B5), disclosed conflicts of interest (D7)' },
            { topic: 'How often to replace a toothbrush', rating: 'May be YMYL', why: 'A health topic, but a small inaccuracy is unlikely to cause harm', checklist: 'Standard checks; B6 usually N/A' },
            { topic: 'An SEO guide for businesses', rating: 'Probably not YMYL; contract sections are', why: 'A mistake costs time and traffic, but contract terms are a legal and financial matter', checklist: 'Full list; a lawyer reviews the contract sections (B6)' },
            { topic: 'How often to wash jeans', rating: 'Not YMYL', why: 'The topic carries no real risk of harm', checklist: 'Trust in the business and accurate content are enough' },
          ],
          przypis: 'Five examples come from the rater guidelines (sections 2.3 and 3.4.1). The SEO guide example is our own call, using the same two questions.',
        },
        htmlPo: '<p>For YMYL content, two checks go to the top of the list: B6 (who wrote or reviewed the page) and C2 (consistency with expert consensus). The guidelines also separate experience from expertise. Someone who has been through a treatment or used a financial service can credibly share what it was like. Instructions for filling out tax forms or a comparison of treatment options, on the other hand, should come from experts. If an expert review hasn’t happened yet, don’t pretend it has: say the page isn’t professional advice and schedule the review.</p>',
      },
      {
        id: 'how-to-fill',
        h2: 'How to fill in the E-E-A-T checklist, step by step',
        html: [
          '<ol>',
          '<li><strong>Pick the pages to review.</strong> Don’t start with the whole site. Take the homepage, About, Contact, 3–5 service pages and your 10 pages with the most Google traffic (Search Console → Performance → Pages).</li>',
          '<li><strong>Do step 0: assess YMYL.</strong> For each group of pages, mark whether the topic is clear YMYL, may be YMYL or isn’t. That sets the order of checks B6 and C2.</li>',
          '<li><strong>Work through areas A–E.</strong> Mark every check OK, needs work or N/A. No online sales? Check A3 is N/A.</li>',
          '<li><strong>Research your reputation.</strong> Run the searches from check D1 and record what you found in the table on the last page: the source, its tone and what you’ll do about it.</li>',
          '<li><strong>Record evidence, not impressions.</strong> In the notes, write the URL and the specifics, for example “/blog/vat-2026: no byline, rates without a source.” A vague “weak E-E-A-T” helps nobody.</li>',
          '<li><strong>Build the plan.</strong> High priority first, and for YMYL content, B6 and C2 first. Give each action an owner and a deadline in the plan table.</li>',
          '<li><strong>Get a second opinion.</strong> Google suggests having content assessed by people you trust who aren’t affiliated with your site. Hand them the completed checklist and ask them to verify five random checks.</li>',
          '</ol>',
          '<p>Run a full review every six months and after big changes: a new author, a new service, a redesign, a wave of new reviews. Check area D (reputation) every quarter, because reviews and mentions change faster than your pages.</p>',
        ].join(''),
      },
      {
        id: 'example',
        h2: 'Example: part of a completed checklist',
        html: '<p>Here’s part of the checklist filled in for a fictional accounting firm in Kraków that runs a blog about taxes for small businesses. That’s a YMYL topic (finance), so the author and accuracy checks get top priority. The data is made up. The point is how to record status and notes so the checklist turns straight into a work plan.</p>',
        tabela: {
          id: 'table-example',
          caption: 'Example (fictional accounting firm, sample data)',
          columns: [
            { key: 'nr', label: 'No.' },
            { key: 'check', label: 'Check' },
            { key: 'status', label: 'Status' },
            { key: 'note', label: 'Note' },
            { key: 'who', label: 'Owner and deadline' },
          ],
          rows: [
            { nr: '0', check: 'YMYL assessment', status: 'Clear YMYL', note: 'Blog about taxes and social security contributions: a mistake can cost a client interest', who: '–' },
            { nr: 'A1', check: 'About page', status: 'Needs work', note: 'Company history is there, but no accountants’ names or qualifications', who: 'Owner, this week' },
            { nr: 'A5', check: 'Proof for claims', status: 'Needs work', note: '“Over 300 happy clients” with no date or source', who: 'Owner, by month end' },
            { nr: 'B1', check: 'Author byline', status: 'Needs work', note: '14 of 20 posts are credited to “Editorial team”', who: 'Editor, by month end' },
            { nr: 'B3', check: 'Real author', status: 'OK', note: 'Authors are staff; photos from an office shoot', who: '–' },
            { nr: 'B6', check: 'Expert review (YMYL)', status: 'Needs work', note: 'VAT articles are written by an assistant; nothing shows a tax adviser reviews them', who: 'Tax adviser, now' },
            { nr: 'C1', check: 'Sources', status: 'Needs work', note: 'Rates and thresholds with no links to regulations or official notices', who: 'Authors, at next update' },
            { nr: 'C4', check: 'Update date', status: 'Needs work', note: 'Dates changed in bulk in January although the content didn’t change', who: 'Webmaster, now' },
            { nr: 'D4', check: 'No incentivized reviews', status: 'Needs work', note: 'Flyer offering “10% off for a Google review”', who: 'Owner, now' },
            { nr: 'E2', check: 'Article author markup', status: 'Needs work', note: 'The plugin lists the firm as author instead of the person in the byline', who: 'Webmaster, after B1' },
          ],
        },
        htmlPo: '<p>Checks that undermine trust or break the rules come first: the discount for reviews (D4), the bulk date changes (C4) and the missing expert review on VAT articles (B6). Bylines, the About page and sources are a few weeks’ work. Structured data comes last, because it should describe what’s already on the page: a real byline first, then the author markup.</p>',
      },
      {
        id: 'evidence',
        h2: 'How to show experience and expertise without overselling',
        html: [
          '<p>Google suggests three questions for every piece of content: who created it, how it was made and why. They’re a good guide to what to add to your pages.</p>',
          '<ul>',
          '<li><strong>Who.</strong> A byline with a full name wherever readers expect one, linking to an author page. Put facts in the bio: role at the company, what they work on, examples of their work, a professional profile. For regulated professions, add a registration number readers can look up.</li>',
          '<li><strong>How.</strong> For reviews, comparisons and reports, describe the method: how many things you checked, how, and what period the data covers. If AI did much of the writing and a reader might ask about it, say so and explain who checked the facts.</li>',
          '<li><strong>Why.</strong> Google calls this perhaps the most important of the three. Content should help people who come to it directly, not just pull in search traffic. An article on a subject the business doesn’t know, written only because the keyword has volume, fails this test.</li>',
          '</ul>',
          '<p>An example from our own site: our <a href="/en/about-us">About page</a> describes the person who runs client SEO and writes our guides, and the Person markup has a stable identifier that our articles point to. We show results as Search Console data with the measurement window stated, as in the <a href="/en#portfolio">portfolio on our homepage</a>, rather than as general promises.</p>',
          '<p>Structured data is an add-on, not a shortcut. Google recommends giving each author a separate field in Article markup with a type and a url or sameAs, and author pages can be marked up as ProfilePage. But the markup must describe what readers can see. An author who exists only in JSON-LD achieves nothing, and Google lists fake reviews in markup as not allowed.</p>',
        ].join(''),
      },
      {
        id: 'mistakes',
        h2: 'Common E-E-A-T mistakes',
        html: [
          '<ul>',
          '<li><strong>Treating E-E-A-T as a metric to pump up.</strong> E-E-A-T SEO isn’t about adding an author box. Google assesses a page through many signals, and an author box without real knowledge in the content changes nothing.</li>',
          '<li><strong>Invented experts.</strong> An AI-generated headshot, a made-up name, a title nobody awarded. Google calls this deception that makes a page untrustworthy to people and to its systems.</li>',
          '<li><strong>Refreshing dates only.</strong> Google lists changing a date without substantially changing the content as a sign of search-engine-first content. It also misleads readers.</li>',
          '<li><strong>Buying or rewarding reviews.</strong> A discount for a review, reviews written by staff or posted from several accounts by one person break Google Maps policy, and those reviews get removed. Our guide on <a href="/en/blog/how-to-get-google-reviews">how to get Google reviews</a> covers asking for reviews within the rules.</li>',
          '<li><strong>Hidden conflicts of interest.</strong> A ranking your own product wins, or a review with affiliate links and no disclosure. The guidelines tell raters to treat such content as less trustworthy.</li>',
          '<li><strong>Copy-paste bios.</strong> The same “expert with years of experience” paragraph under every author says nothing about any of them.</li>',
          '<li><strong>Writing to a word count.</strong> Google says it has no preferred word count. Padding a page to hit a number is writing for a search engine, not a reader.</li>',
          '<li><strong>Mass-produced pages with no value.</strong> Generating many pages mainly to manipulate rankings, with little value for readers, is what Google’s spam policies call scaled content abuse, whether a person or AI wrote them.</li>',
          '</ul>',
        ].join(''),
      },
      {
        id: 'when-not-enough',
        h2: 'When a checklist isn’t enough',
        html: [
          '<p>You can work through this E-E-A-T checklist in a few hours. Our <a href="/en/tools/free-seo-audit">free SEO audit</a> covers some of the technical checks, such as HTTPS and Organization structured data. The rest needs a human, because E-E-A-T is about how your business and content look to a reader.</p>',
          '<p>Outside help makes sense when your site loses traffic after an algorithm update, when you publish YMYL content, or when the list of issues is long and needs turning into a plan. Our <a href="/en/seo-audit">SEO audit</a> covers technical SEO and Core Web Vitals, content and semantics, and your link profile; as a standalone service it starts at €350 net. Some fixes, such as new content with your own data and sources, fit into our <a href="/en/seo-services">SEO services</a>: the SEO Standard plan is €450 net per month for up to 20 keywords, 2 pieces of content and 2 links.</p>',
          '<p>What about AI answers? Google says there are no additional requirements to appear in AI Overviews or AI Mode beyond SEO fundamentals. We don’t promise that E-E-A-T work will get you cited in ChatGPT or Gemini. If you want to know whether AI models mention your business, see <a href="/en/ai-search-optimization">AI search optimization</a>: the AI visibility audit costs €235 net.</p>',
        ].join(''),
      },
    ],
    podglad: {
      h2: 'Template preview: the full E-E-A-T checklist',
      opis: `Here’s everything in the template: step 0 (YMYL), ${ile(EN_OBSZARY)} checks across five areas, a reputation table and an action plan. In the PDF, every check has fields for status (OK, needs work, N/A) and notes with an owner and deadline.`,
      html: podgladHtml(EN_OBSZARY, true),
    },
    formularz: {
      h2: 'Get the template (PDF)',
      opis: 'We’ll email you the E-E-A-T checklist as a printable PDF: step 0 with the YMYL assessment, 36 checks with status and note fields, a reputation research table and an action plan.',
      etykieta: 'Email address to send the checklist to',
      przycisk: 'Send me the checklist (PDF)',
      przedmiot: 'the E-E-A-T checklist',
      komunikatOk: 'Sent. Check your inbox (including the Promotions or Spam folder): the link to the E-E-A-T checklist PDF will arrive within a minute.',
    },
    kroki: [
      { name: 'Pick the pages to review', text: 'Take the homepage, About, Contact, 3–5 service pages and your 10 pages with the most Google traffic according to Search Console.' },
      { name: 'Decide whether the topic is YMYL', text: 'For each group of pages, answer the two questions in step 0 and mark it clear YMYL, may be YMYL or not YMYL.' },
      { name: 'Work through areas A–E', text: 'Mark each of the 36 checks OK, needs work or N/A, and note the URL and the specific problem.' },
      { name: 'Research your reputation', text: 'Search Google for your business name while excluding your own domain, and record the sources, their tone and your planned actions in the reputation table.' },
      { name: 'Build the action plan', text: 'Start with high priority, and for YMYL content with checks B6 and C2. Give each action an owner and a deadline.' },
      { name: 'Get a second opinion', text: 'Give the completed checklist to someone you trust outside the business and ask them to verify five random checks. Repeat the full review every six months.' },
    ],
    faq: [
      {
        question: 'Is E-E-A-T a ranking factor?',
        answer: 'Not as a single metric. Google says E-E-A-T itself isn’t a specific ranking factor. Its systems use many signals that help identify content showing experience, expertise, authoritativeness and trust, and for YMYL topics they give that content even more weight. That’s why you can’t “add E-E-A-T” with one element, such as an author box. What counts is whether the whole page deserves trust.',
      },
      {
        question: 'What is YMYL, and how do I know if my topic qualifies?',
        answer: 'YMYL covers topics where mistakes could harm people’s health, finances or safety, or society, such as medical treatment, taxes, investing or voting rules. Google’s rater guidelines suggest two questions: would a careful person seek out an expert here, because even minor inaccuracies could cause harm, and would most people be happy with advice from friends? A yes to the first points to YMYL. Most topics, like washing jeans, aren’t YMYL.',
      },
      {
        question: 'Can Google’s quality raters lower my rankings?',
        answer: 'No. According to Google, quality raters have no control over how pages rank, and their ratings aren’t used directly in ranking algorithms. They help Google check whether changes to Search are working. The Google quality rater guidelines are still worth reading, because they describe well how people recognize a trustworthy site. Much of this checklist is based on them.',
      },
      {
        question: 'Does AI-assisted content have weaker E-E-A-T?',
        answer: 'Not just because AI was used. Google says appropriate use of AI or automation isn’t against its guidelines; the problem is producing content mainly to manipulate search rankings. What matters is the result: whether the text is accurate, adds something of its own and was checked by someone who knows the subject. If readers might ask “how was this made?”, explain it. Google says an AI author byline is probably not the best way to do that.',
      },
      {
        question: 'Will E-E-A-T work help in AI Overviews and ChatGPT?',
        answer: 'We don’t promise that. Google says there are no additional requirements to appear in AI Overviews or AI Mode: the same SEO fundamentals apply as in regular results. ChatGPT, Perplexity and other models have their own ways of choosing sources. Accurate, signed content with sources is simply good content, whoever reads it. If you want to know whether AI models mention your business, you need to measure AI answers separately.',
      },
      {
        question: 'Does a small business without a blog need author pages?',
        answer: 'Not always. A byline matters wherever a reader might ask “who wrote this?”, which means guides, articles and reviews. A service page or price list can be credited to the business. In that case the checks in area A matter more: who runs the business, how to reach it, genuine reviews and a clear offer. Mark the author checks N/A and leave them out of your score.',
      },
    ],
    zrodla: ZRODLA.map(([url, , nazwa]) => ({ url, nazwa, data: '2026-11-11' })),
    powiazane: [
      { href: '/narzedzia/checklista-seo', tekst: 'SEO checklist', opis: '50 checks across technical basics, on-page, local SEO, AI readiness and measurement' },
      { href: '/blog/jak-pozyskiwac-opinie-google-poradnik', tekst: 'How to get Google reviews', opis: 'a review process that stays within the rules' },
      { href: '/audyt-seo', tekst: 'SEO audit', opis: 'technical SEO, content and links with a fix plan, from €350 net' },
      { href: '/pozycjonowanie-stron-internetowych', tekst: 'SEO services', opis: 'ongoing work on content, technical SEO and links, SEO Standard from €450 net a month' },
      { href: '/pozycjonowanie-w-ai', tekst: 'AI search optimization', opis: 'measurement and work in ChatGPT, Gemini, Perplexity and Google AI Overviews' },
      { href: '/narzedzia/dane-strukturalne-json-ld', tekst: 'Schema markup examples', opis: '7 JSON-LD templates, including Organization, Person and Article' },
    ],
    plikNazwa: 'E-E-A-T checklist: 36 checks (PDF)',
  },
};
