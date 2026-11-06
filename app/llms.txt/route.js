import { routing } from '@/i18n/routing';
import { blogPosts } from '@/lib/blogPosts';
import { BASE_URL } from '@/lib/sitemapEntries';
import { czyOpublikowana, opublikowaneSciezki, wpisPublikacji } from '@/lib/publikacja';

// /llms.txt generowany z danych serwisu (T0.5, PLAN-v2 7; AV-05, AV-15 z korektą, AV-19, SA-12,
// CB-09). Integracja 5.11.2026: zastępuje public/llms.txt (plik usunięty), żeby nowe strony
// z lib/publikacja.js trafiały do pliku same w dniu publikacji, a nieopublikowane nigdy.
// Treść stron istniejących = dotychczasowy public/llms.txt z poprawkami:
// - zdanie encji (6.24, AV-05) = description #organization w app/[locale]/layout.js i 1. akapit /o-nas,
// - nagłówek „Pozycjonowanie w AI (GEO – Generative Engine Optimization)” (AV-15, AV-19),
// - dopisek o pomiarze AI w SEO Premium albo za dopłatą 490 zł (AV-15),
// - sekcja „Profile firmy poza stroną” (Clutch, Sortlist = sameAs w layout.js),
// - bez biblioteki artykułów (SA-12: /blog/biblioteka = 308 na /blog).
// Artykuły: z lib/blogPosts.js (tytuł i opis karty, adres z i18n/routing.js), więc odświeżony
// title artykułu zmienia się tu razem z kartą bloga. Nowe strony: tytul + opis z lib/publikacja.js.
// Licznik pobrań per UA (T0.5 w planie) pominięty: wymaga trwałego magazynu (CB-09).
// Kryterium: curl /llms.txt zawiera wszystkie URL-e z sitemapy i żadnego nieopublikowanego;
// Content-Type text/plain (AV-15: text/plain albo text/markdown).
export const dynamic = 'force-static';

const url = (sciezka) => `${BASE_URL}${sciezka === '/' ? '/' : sciezka}`;
const pozycja = (tytul, sciezka, opis) => `- [${tytul}](${url(sciezka)})${opis ? `: ${opis}` : ''}`;

// Strony nowe (rejestr publikacji) w sekcji według prefiksu; każda tylko raz.
function nowePodPrefiksem(prefiks, wypisane) {
  return opublikowaneSciezki(prefiks)
    .filter((s) => !wypisane.has(s))
    .map((s) => {
      wypisane.add(s);
      const w = wpisPublikacji(s);
      return pozycja(w.tytul || s, s, w.opis);
    });
}

function artykuly(wypisane) {
  const linie = [];
  for (const post of blogPosts) {
    const trasa = routing.pathnames[post.slug];
    const pl = (trasa && trasa.pl) || post.slug;
    const en = `/en${(trasa && trasa.en) || post.slug}`;
    // Wpis z rejestru publikacji (np. B1) dodany do blogPosts przed swoją partią: pomijamy (jak sitemapa).
    if (!czyOpublikowana(pl)) continue;
    if (!post.enOnly && post.titlePl) {
      linie.push(pozycja(post.titlePl, pl, post.descPl));
      wypisane.add(pl);
    }
    if (!post.plOnly && post.titleEn) {
      linie.push(pozycja(post.titleEn, en, post.descEn));
    }
  }
  // Artykuły z rejestru publikacji bez wpisu w blogPosts (np. B1 w podglądzie partii).
  return linie.concat(nowePodPrefiksem('/blog/', wypisane));
}

function trescLlms() {
  const wypisane = new Set();
  const porownania = nowePodPrefiksem('/porownania', wypisane);
  const geo = nowePodPrefiksem('/pozycjonowanie-w-ai/', wypisane);
  const wizytowka = nowePodPrefiksem('/pozycjonowanie-wizytowki-google', wypisane);
  const narzedzia = nowePodPrefiksem('/narzedzia', wypisane);
  const listaArtykulow = artykuly(wypisane);
  // Pozostałe nowe strony spoza powyższych prefiksów (np. /raporty-ai po zbudowaniu).
  const inne = nowePodPrefiksem('', wypisane);

  const sekcje = [
    `# AI SEO COMPANY

> AI SEO COMPANY to agencja SEO i pozycjonowania w AI (GEO) z Warszawy dla małych i średnich firm: pozycjonowanie stron i wizytówek Google, audyty SEO, strony w Next.js oraz, w SEO Premium, cotygodniowy pomiar widoczności w ChatGPT, Perplexity, Gemini i przeglądach AI Google. Każdy klient ma panel klienta 24/7, umowę miesięczną i jawny cennik od 1 900 zł netto miesięcznie.
> Serwis dwujęzyczny: polski pod adresami bez prefiksu, angielski pod /en.`,

    `## Fakty o firmie

- Nazwa handlowa: AI SEO COMPANY
- Podmiot prawny: AI SIGNALS COMPANY Prosta Spółka Akcyjna
- KRS: 0001239983 · NIP: 5253090237 · REGON: 544761611
- Adres: ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa, Polska
- Kontakt: kontakt@ai-seo-company.pl · +48 518 815 055
- Obszar działania: Warszawa i cała Polska; obsługa w języku polskim i angielskim
- Model rozliczenia: abonament miesięczny, od 1 900 zł netto (SEO Standard: 20 fraz, 2 treści, 2 linki miesięcznie; SEO Premium 2 500 zł: 50 fraz, 4 treści, 4 linki, pomiar widoczności w AI)
- Umowa: miesięczna, wypowiedzenie e-mailem albo w panelu klienta, bez opłat aktywacyjnych i za wyjście; treści i zdobyte linki zostają u klienta; konta Google są na koncie klienta`,

    `## Profile firmy poza stroną

- [Clutch](https://clutch.co/profile/ai-signals-company-prosta-sp-ka-akcyjna): profil agencji w katalogu Clutch.
- [Sortlist](https://www.sortlist.co.uk/agency/ai-signals-company): profil agencji w katalogu Sortlist.`,

    `## Panel klienta

- [Panel klienta (opis)](${url('/panel-klienta')}) · [Client portal (EN)](${url('/en/client-portal')})
- [Demo panelu bez logowania](https://panel.ai-seo-company.pl/demo): fikcyjna firma „Stolarnia Demo” na danych przykładowych.
- Co widzi klient: zapytania od klientów z GA4 i koszt jednego zapytania, kliknięcia i pozycje fraz z Google Search Console, dziennik działań agencji, streszczenia zmian na stronie (z historii kodu), sprawy do akceptacji, cotygodniowy pomiar widoczności w ChatGPT, Perplexity, Gemini i przeglądach AI w Google (w SEO Premium albo z dopłatą 490 zł netto/mies.), siatka pozycji w Mapach Google 7×7, lista zdobytych linków ze sprawdzaniem co tydzień, alerty o spadkach, wiadomości do opiekuna z czasem odpowiedzi, faktury, wypowiedzenie i zmiana pakietu.
- Dane klienta: eksport CSV i JSON, REST API i serwer MCP z tokenem tylko do odczytu ([spis API](https://panel.ai-seo-company.pl/api/v1)).`,

    [
      '## Pozycjonowanie w AI (GEO – Generative Engine Optimization)',
      '',
      `- [Pozycjonowanie w AI](${url('/pozycjonowanie-w-ai')}) · [AI search optimization (EN)](${url('/en/ai-search-optimization')}): audyt widoczności w AI 990 zł netto (zaliczany na pierwszy miesiąc abonamentu); GEO w SEO Premium, do SEO Standard dopłata 490 zł netto miesięcznie; wyniki co tydzień w panelu klienta.`,
      ...geo,
      `- [Sprawdzarka widoczności w AI](${url('/sprawdz-widocznosc-w-ai')}): bezpłatne narzędzie po polsku. Zadaje ChatGPT (z wyszukiwaniem w sieci ustawionym na miasto firmy) i Gemini trzy pytania klientów z danej branży i miasta i pokazuje, czy wymieniają firmę oraz z jakich źródeł korzystają. Limit 3 firmy na adres IP na dobę.`,
    ].join('\n'),

    porownania.length ? ['## Porównania', '', ...porownania].join('\n') : null,

    `## Zmiana agencji

- [Zmiana agencji SEO bez kar i utraty pozycji](${url('/zmiana-agencji-seo')}): poradnik, checklista 32 punktów (konta Google, domena, treści, linki, dane) i bezpłatny przegląd po poprzedniej agencji (30 min).`,

    [
      '## Usługi',
      '',
      `- [Pozycjonowanie stron internetowych](${url('/pozycjonowanie-stron-internetowych')}): Kompleksowe pozycjonowanie dla firm B2B: optymalizacja techniczna, treść, link building i raportowanie.`,
      `- [Search engine optimization](${url('/en/seo-services')}): Full-service SEO for B2B companies: technical optimisation, content, link building and reporting.`,
      `- [Audyt SEO](${url('/audyt-seo')}): Audyt techniczny i treściowy: indeksacja, Core Web Vitals, struktura nagłówków, frazy kluczowe, UX.`,
      `- [SEO audit](${url('/en/seo-audit')}): Technical and content audit: indexing, Core Web Vitals, heading structure, keyword research, UX.`,
      `- [Cennik pozycjonowania stron](${url('/cennik-pozycjonowania')}): Pakiety SEO Standard (1 900 zł) i SEO Premium (2 500 zł netto miesięcznie) z limitami, Booster Pack z nową stroną, audyt SEO od 1 490 zł, strona www od 5 900 zł netto.`,
      `- [SEO pricing](${url('/en/seo-pricing')}): Standard and Premium subscription packages, billed monthly.`,
      `- [SEO lokalne w Warszawie](${url('/seo-lokalne-warszawa')}): Wizytówka Google, spójność NAP, opinie i widoczność w Mapach Google.`,
      `- [Local SEO in Warsaw](${url('/en/local-seo-warsaw')}): Google Business Profile, NAP consistency, reviews and Google Maps visibility.`,
      ...wizytowka,
      `- [Projektowanie stron internetowych](${url('/projektowanie-stron-internetowych')}): Projekt i wdrożenie strony: UX/UI, wersja mobilna, optymalizacja pod konwersję.`,
      `- [Web design](${url('/en/web-design')}): Design and build: UX/UI, responsive layouts, conversion optimisation.`,
      ...inne,
    ].join('\n'),

    narzedzia.length ? ['## Narzędzia i szablony', '', ...narzedzia].join('\n') : null,

    `## Strony główne i listingi

- [Strona główna (PL)](${url('/')}): oferta, realizacje, cennik, kontakt.
- [Homepage (EN)](${url('/en')}): services, case studies, pricing, contact.
- [Blog (PL)](${url('/blog')}) · [Blog (EN)](${url('/en/blog')}): poradniki SEO, analityki i web designu.
- [O nas (PL)](${url('/o-nas')}) · [About us (EN)](${url('/en/about-us')}): zespół i autor publikacji.`,

    ['## Artykuły', '', ...listaArtykulow].join('\n'),

    `## Dokumenty

- [Regulamin](${url('/regulamin')}) · [Terms of service](${url('/en/terms')})
- [Polityka prywatności i cookies](${url('/cookies')}) · [Privacy and cookies](${url('/en/cookies')})`,
  ];

  return `${sekcje.filter(Boolean).join('\n\n')}\n`;
}

export function GET() {
  return new Response(trescLlms(), {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
