// Strona aplikacji: Audyt SEO (/narzedzia/audyt-seo, /en/tools/free-seo-audit). Wydzielona ze StronyAplikacji.jsx 11.11.2026.
// Komponent serwerowy; interaktywna część w *Client.jsx, wspólny układ w UkladAplikacji.jsx.
// Liczby w treści: tylko z działania narzędzia (limity, zakres) albo ze źródeł z datą odczytu.
// Wersja EN: osobny komponent na dole pliku (te same fakty po angielsku).

import { Link } from '@/i18n/routing';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { Uklad, Sekcja, PozostaleNarzedzia } from './UkladAplikacji';
import * as s from './styl';
import AudytSeoClient from './AudytSeoClient';

// --- Audyt SEO --------------------------------------------------------------------------------

const FAQ_AUDYTU = [
  { id: 'audyt-seo-za-darmo', question: 'Czy darmowy audyt SEO jest naprawdę bezpłatny?', answer: 'Tak. Ocenę, kategorie i trzy najważniejsze problemy widzisz od razu, bez rejestracji. Pełną listę problemów z adresami podstron pokazujemy po podaniu e-maila, na który wysyłamy też raport. Zapis na newsletter jest osobny i dobrowolny.' },
  { id: 'jak-liczona-ocena', question: 'Jak liczycie ocenę SEO od 1 do 100?', answer: 'Każda reguła ma wagę w punktach, a każdy niespełniony warunek odejmuje punkty od swojej kategorii (kary się sumują, nie uśredniamy ich). Przy regułach dotyczących podstron już jedna podstrona z problemem kosztuje 40% kary, a reszta rośnie z odsetkiem podstron. Reguły całej witryny, np. soft 404 albo waga strony, odejmują pełną karę. Ocena to 35% kategorii technicznej, 30% treści, 20% wydajności (w tym wynik PageSpeed Insights na telefonie) i 15% gotowości na AI.' },
  { id: 'audyt-a-pelny-audyt', question: 'Czym różni się darmowy audyt od płatnego audytu SEO?', answer: 'Darmowy audyt sprawdza automatycznie do 25 podstron i ponad 40 reguł. Płatny audyt SEO obejmuje całą stronę, frazy, konkurencję, profil linków i dane z Search Console, a jego wynikiem jest plan zmian z priorytetami i wyceną.' },
  { id: 'czy-audyt-obciaza-strone', question: 'Czy audyt obciąża moją stronę?', answer: 'Nie. Pobieramy do 25 podstron, po kilka naraz, z przedstawiającym się robotem AISEOCompanyAudit. To mniej niż jedna wizyta wyszukiwarki. Nie wysyłamy formularzy i nie logujemy się.' },
];

export function AudytSeoStrona({ locale = 'pl' } = {}) {
  if (locale === 'en') return <AudytSeoEn />;
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  return (
    <Uklad
      slug="audyt-seo"
      tag="Darmowe narzędzie"
      schema={{ name: 'Darmowy audyt SEO strony', description: 'Bezpłatny audyt SEO: sprawdza do 25 podstron, robots.txt, mapę strony, szybkość w PageSpeed Insights i gotowość na AI, wystawia ocenę 1-100 i listę błędów z instrukcją naprawy.', category: 'BusinessApplication' }}
      odpowiedz="Darmowy audyt SEO sprawdza do 25 podstron Twojej strony: kody odpowiedzi, przekierowania, tytuły, opisy, nagłówki, treść, obrazy, dane strukturalne, robots.txt, mapę strony, szybkość na telefonie i dostęp botów AI. Wynik to ocena od 1 do 100 w czterech kategoriach i lista problemów z instrukcją naprawy."
      faq={FAQ_AUDYTU}
      tytulFaq="Pytania o darmowy audyt SEO"
    >
      <AudytSeoClient />
      <Sekcja id="co-sprawdza-audyt" tytul="Co sprawdza darmowy audyt SEO">
        <ul style={s.lista}>
          <li><strong>Technika:</strong> HTTPS i przekierowania, wersje z www i bez, błędy 4xx i 5xx, łańcuchy przekierowań, adresy kanoniczne, noindex, atrybut lang, meta viewport, zepsute linki wewnętrzne, soft 404 (czy nieistniejący adres zwraca kod 404), hreflang przy kilku wersjach językowych, robots.txt i mapa strony.</li>
          <li><strong>Treść:</strong> tytuły i opisy meta (brak, długość, duplikaty), nagłówki H1, ilość tekstu, teksty alternatywne obrazów i znaczniki Open Graph.</li>
          <li><strong>Wydajność:</strong> wynik Lighthouse na telefonie z Google PageSpeed Insights, LCP i CLS (z danych prawdziwych użytkowników, jeśli strona je ma), waga strony głównej z listą największych plików, obrazy do optymalizacji (format, wymiary, kompresja), obrazy bez width i height, czas odpowiedzi serwera i rozmiar HTML.</li>
          <li><strong>Gotowość na AI:</strong> czy tekst jest w HTML bez uruchamiania JavaScriptu (boty AI go nie uruchamiają), czy robots.txt wpuszcza boty GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot i Google-Extended, dane strukturalne firmy (Organization albo LocalBusiness) i plik llms.txt{llms ? <> (wygenerujesz go w <Link href={llms} style={s.podkreslenie}>generatorze llms.txt</Link>)</> : null}.</li>
        </ul>
      </Sekcja>
      <Sekcja id="jak-czytac-ocene" tytul="Jak czytać ocenę">
        <p style={s.akapit}>Ocena 80 i więcej oznacza, że podstawy są w porządku i warto skupić się na treści i linkach. Od 50 do 79 są problemy, które realnie ograniczają widoczność: zacznij od błędów, potem ostrzeżeń. Poniżej 50 strona ma braki techniczne, przez które Google może jej nie indeksować albo pokazywać gorzej niż konkurencję.</p>
        <p style={s.akapit}>Ocena nie jest pozycją w Google. Pokazuje, jak dużo przeszkód stoi stronie na drodze. O pozycji decydują też treść, linki i konkurencja, które sprawdzamy w <Link href={audyt} style={s.podkreslenie}>pełnym audycie SEO</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="audyt-seo" />
    </Uklad>
  );
}

// =============================== Wersja EN ===============================

const FAQ_AUDYTU_EN = [
  { id: 'is-the-free-seo-audit-really-free', question: 'Is the free SEO audit really free?', answer: 'Yes. You see the score, the categories and the three most important problems right away, with no sign-up. We show the full list of problems with page URLs after you give an email address, which we also send the report to. Signing up for the newsletter is separate and voluntary.' },
  { id: 'how-is-the-score-calculated', question: 'How do you calculate the SEO score from 1 to 100?', answer: 'Each rule has a weight in points, and every failed check subtracts points from its category (penalties add up; we do not average them). For page-level rules a single affected page already costs 40% of the penalty, and the rest grows with the share of pages. Site-wide rules, such as soft 404 or page weight, subtract the full penalty. The score is 35% the technical category, 30% content, 20% performance (including the mobile PageSpeed Insights result) and 15% AI readiness.' },
  { id: 'free-audit-vs-paid-audit', question: 'How does the free audit differ from a paid SEO audit?', answer: 'The free audit automatically checks up to 25 pages and over 40 rules. A paid SEO audit covers the whole website, keywords, competitors, the link profile and Search Console data, and its result is a plan of changes with priorities and a quote.' },
  { id: 'does-the-audit-load-my-website', question: 'Does the audit put a load on my website?', answer: 'No. We fetch up to 25 pages, a few at a time, with a self-identifying robot called AISEOCompanyAudit. That is less than a single visit from a search engine. We do not submit forms and we do not log in.' },
];

function AudytSeoEn() {
  const audyt = hrefJesliOpublikowana('/audyt-seo') ?? '/audyt-seo';
  const llms = hrefJesliOpublikowana('/narzedzia/generator-llms-txt');
  return (
    <Uklad
      locale="en"
      slug="audyt-seo"
      tag="Free tool"
      schema={{ name: 'Free website SEO audit', description: 'A free SEO audit: it checks up to 25 pages, robots.txt, the sitemap, speed in PageSpeed Insights and AI readiness, then gives a 1-100 score and a list of errors with fix instructions.', category: 'BusinessApplication' }}
      odpowiedz="The free SEO audit checks up to 25 pages of your website: response codes, redirects, titles, descriptions, headings, content, images, structured data, robots.txt, the sitemap, mobile speed and AI bot access. The result is a score from 1 to 100 across four categories and a list of problems with fix instructions."
      faq={FAQ_AUDYTU_EN}
      tytulFaq="Questions about the free SEO audit"
    >
      <AudytSeoClient />
      <Sekcja id="what-the-audit-checks" tytul="What the free SEO audit checks">
        <ul style={s.lista}>
          <li><strong>Technical:</strong> HTTPS and redirects, www and non-www versions, 4xx and 5xx errors, redirect chains, canonical URLs, noindex, the lang attribute, the meta viewport tag, broken internal links, soft 404 (whether a non-existent address returns 404), hreflang on multilingual sites, robots.txt and the sitemap.</li>
          <li><strong>Content:</strong> titles and meta descriptions (missing, length, duplicates), H1 headings, amount of text, image alt text and Open Graph tags.</li>
          <li><strong>Performance:</strong> the mobile Lighthouse score from Google PageSpeed Insights, LCP and CLS (from real-user data, if the site has it), home page weight with a list of the largest files, images to optimise (format, size, compression), images without width and height, server response time and HTML size.</li>
          <li><strong>AI readiness:</strong> whether the text is in the HTML without running JavaScript (AI bots do not run it), whether robots.txt lets in the GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot and Google-Extended bots, your company structured data (Organization or LocalBusiness) and an llms.txt file{llms ? <> (you can create one in the <Link href={llms} style={s.podkreslenie}>llms.txt generator</Link>)</> : null}.</li>
        </ul>
      </Sekcja>
      <Sekcja id="how-to-read-the-score" tytul="How to read the score">
        <p style={s.akapit}>A score of 80 or more means the basics are fine and it is worth focusing on content and links. From 50 to 79 there are problems that genuinely limit visibility: start with errors, then warnings. Below 50 the site has technical gaps that may stop Google from indexing it or make it show worse than your competitors.</p>
        <p style={s.akapit}>The score is not a Google ranking. It shows how many obstacles stand in your site’s way. Rankings also depend on content, links and competitors, which we check in a <Link href={audyt} style={s.podkreslenie}>full SEO audit</Link>.</p>
      </Sekcja>
      <PozostaleNarzedzia bez="audyt-seo" locale="en" />
    </Uklad>
  );
}
