# Sitemapa, daty lastmod i IndexNow

Od 11.11.2026 daty stron nie są wpisywane ręcznie. Liczy je `npm run wydanie` z odcisku treści
lokalnego buildu porównanego z produkcją. Sitemapa powstaje przy buildzie z rejestrów treści,
a IndexNow dostaje zmienione adresy z crona Vercel następnego ranka po wdrożeniu.

## Procedura wydania (push na main)

1. Gałąź scalona z aktualnym `origin/main`, wszystkie zmiany zacommitowane (skrypt to sprawdza).
2. **W dniu pusha** uruchom:

   ```sh
   npm run wydanie
   ```

   Skrypt robi `npm run build`, startuje `next start` na wolnym porcie, sprawdza sitemapę
   i strony (lista kontroli niżej), pobiera HTML wszystkich adresów z sitemapy produkcji, liczy
   odciski i zapisuje nowe daty w `lib/lastmod.json`. Potem robi drugi build i sprawdza, że
   nowe daty nie zmieniły żadnego odcisku (punkt stały). Trwa około 10-20 s.
3. Przejrzyj wynik w konsoli i `git diff lib/lastmod.json`: `+` nowy adres, `~` zmieniony
   (w nawiasie części odcisku, np. `[tekst,linki]`), `-` usunięty z sitemapy, `!` korekta daty.
4. Commit samego pliku, np. `git commit -m "lastmod: wydanie 2026-11-12" lib/lastmod.json`.
5. Push na main, po zgodzie na wdrożenie. Vercel buduje przez `npm run build`, które zapisuje
   w kodzie stempel buildu (`NEXT_PUBLIC_ZBUDOWANO`).
6. Cron Vercel `/api/cron/indexnow` (codziennie 06:15 UTC, czyli 7:15 zimą i 8:15 latem)
   zgłasza `_wydanie.zmienione` i `_wydanie.usuniete` do IndexNow (Bing, Yandex, Seznam, Naver)
   w ciągu 26 h od buildu. Nic nie trzeba robić ręcznie. Zgłoszenie od razu, bez czekania:
   `node scripts/indexnow.mjs --wydanie --wyslij`.
7. W Google Search Console „Sprawdź URL → Poproś o zindeksowanie” dla najważniejszych nowych
   adresów (limit około 10 dziennie). Google nie ma odpowiednika IndexNow, czyta sitemapę sam.

Jeśli push przesunie się na inny dzień niż `npm run wydanie`, uruchom wydanie ponownie w dniu
pusha: daty zmienionych adresów przesuną się na ten dzień (bazą jest produkcja, która jeszcze się
nie zmieniła). Drugie uruchomienie tego samego dnia bez zmian w kodzie daje identyczny plik.

**Kontrola bez zapisu** (przegląd PR, przed pushem): `npm run lastmod:sprawdz`. Kod wyjścia 1, gdy
`lib/lastmod.json` różni się od tego, co policzyłoby wydanie, albo gdy kontrola sitemapy znajdzie
błąd. Opcjonalny hook przed pushem na main (włączenie raz w repo):

```sh
git config core.hooksPath scripts/sitemap/hooks
```

Na Vercel kontroli nie uruchamiamy: build nie ma historii git ani dostępu do porównania z produkcją.

## Pliki

| Plik | Rola |
|---|---|
| `lib/lastmod.json` | Jedyne źródło dat: `adresy` (`lastmod`, `tresc`, `pierwszy`) i `_wydanie` (data, zmienione, usunięte). Generowany, commitowany, nie edytować ręcznie. |
| `lib/lastmod.js` | Odczyt: `LASTMOD` (url → lastmod, zgodność wstecz), `datyStrony()`, `dataTresci()`, `pierwszaPublikacja()`, `WYDANIE`. |
| `lib/sitemapEntries.js` | Lista adresów sitemapy z rejestrów (artykuły, `i18n/routing.js`, `lib/publikacja.js`, slugi z `lib/porownania.js`, `lib/pytaniaAi.js`, `STRONY_NARZEDZI`), segmenty, daty. |
| `app/sitemap.xml/route.js`, `app/sitemaps/sitemap.js` | Indeks `/sitemap.xml` i segmenty `/sitemaps/sitemap/<segment>.xml`, statyczne przy buildzie. |
| `scripts/sitemap/wydanie.mjs` | `npm run wydanie` i `npm run lastmod:sprawdz`. |
| `scripts/sitemap/odcisk.mjs` | Odcisk treści strony z HTML-a (czysta funkcja). |
| `scripts/sitemap/daty.mjs` | Reguły dat (czyste funkcje), zapis `lib/lastmod.json`. |
| `scripts/sitemap/waliduj.mjs` | Walidacja sitemap: reguły protokołu sitemaps.org i schemat XSD (`xsd/`, przez `xmllint`). `npm run sitemap:waliduj [-- origin]`. |
| `scripts/sitemap/indexnow-klient.mjs` | Klucz IndexNow, decyzja crona (`planZgloszenia`), wysyłka (`zglos`). |
| `app/api/cron/indexnow/route.js` | Trasa crona. |
| `vercel.json` | Harmonogram crona. |
| `scripts/indexnow.mjs` | Zgłoszenia ręczne (`--wydanie`, `--lastmod RRRR-MM-DD`, lista adresów; `--wyslij`). |
| `scripts/sitemap/migracja.mjs` | Jednorazowe przeniesienie dawnego obiektu `LASTMOD` do `lib/lastmod.json` (11.11.2026). |
| `scripts/sitemap/*.test.mjs` | Testy `npm run test:sitemap` (bez sieci i bez buildu). |
| `scripts/sitemap/hooks/pre-push` | Opcjonalny hook z kontrolą przed pushem na main. |

## Jak liczone są daty

**Odcisk strony** (`odcisk.mjs`) liczony z HTML-a serwowanego przez `next start`, czyli z tym samym
middleware i przekierowaniami co na Vercel. Sprawdzone 11.11.2026: odcisk lokalnego buildu jest
równy odciskowi produkcji dla 87/87 adresów, a na historii wdrożeń (4.11, 6.11, 11.11) odtwarza
daty ustalone wcześniej ręcznie.

| Część | Zawartość | Do `lastmod` | Do `tresc` |
|---|---|---|---|
| `glowa` | title, meta description, canonical, meta robots, hreflang | tak | tylko title |
| `ld` | JSON-LD strony bez pól dat, bez bloku `WebSite` z layoutu i bez bloków `data-lastmod="pomin"` | tak | nie |
| `tekst` | tekst `<main>` bez elementów wspólnych i podpisu z datą, typografia znormalizowana | tak | tak |
| `linki` | `href` z `<main>` (po tych samych wycięciach) | tak | nie |
| `obrazy` | `src` + `alt` obrazów z opisem; dekoracyjne (`alt=""`) się nie liczą | tak | nie |

Nie liczą się: elementy wspólne (`header#header`, `div#menu-glowne`, `footer.footer`, `.contact`,
wszystko z atrybutem `data-lastmod="pomin"`), podpis z datą (`p.byline`), pola dat w JSON-LD,
skrypty, style, CSS i typografia (myślniki, cudzysłowy, wielokropek, twarde spacje).
Nowy komponent wspólny w `<main>` (baner, pasek) musi dostać `data-lastmod="pomin"`, inaczej jego
zmiana da nową datę wszystkim stronom (zatrzyma to bezpiecznik 40%). To samo każdy element, który
wyświetla datę z `lib/lastmod.json`: bez tego powstaje pętla data → HTML → odcisk → data
(wyłapuje ją kontrola punktu stałego).

**Daty** (`daty.mjs`), `dzis` = data w strefie Europe/Warsaw:

- adres nowy w sitemapie (nie ma go w sitemapie produkcji): `lastmod = tresc = pierwszy = dzis`;
- odcisk `h` różny od produkcji: `lastmod = dzis`; jeśli różni się też `ht` (tytuł lub tekst),
  także `tresc = dzis`, inaczej `tresc` zostaje (np. sama zmiana linku w bloku CTA);
- odcisk równy produkcji: daty bez zmian. Wyjątek: data nowsza niż lastmod produkcji bez zmiany
  treści wraca do daty produkcji (blokada sztucznego odświeżania dat);
- adres usunięty z sitemapy: znika z `adresy`, trafia do `_wydanie.usuniete` (IndexNow). Lokalnie
  musi dawać 308 do adresu z sitemapy albo 404/410;
- zawsze `tresc <= lastmod`.

`lastmod` idzie do sitemapy i IndexNow. `tresc` jest przeznaczona dla podpisu „aktualizacja”
i JSON-LD `dateModified` (Google liczy linki i dane strukturalne do lastmod, ale widoczna data po
samej podmianie linku byłaby sztucznym odświeżeniem). Dziś konsumenci dat (`Byline`,
`dateModified` w artykułach) nadal czytają `LASTMOD`; przejście na `dataTresci()` to osobna zmiana.

**Bezpiecznik:** ponad 40% zmienionych adresów zatrzymuje wydanie (typowo aktualizacja Next lub
React zmieniła znaczniki, a nie treść). Skrypt pokazuje 5 przykładów. Kontynuacja tylko świadomie:
`npm run wydanie -- --potwierdzam-masowa-zmiane`.

## Kontrole sitemapy (każde wydanie i `--sprawdz`)

- XML indeksu i każdego segmentu zgodny z protokołem sitemaps.org 0.9 i schematem XSD;
  `lastmod` w indeksie = najnowszy `lastmod` segmentu;
- każdy adres z sitemapy: 200 bez przekierowania, canonical na siebie, bez noindex, `lang`
  zgodny z językiem adresu;
- hreflang: odwołanie do siebie, `x-default`, cele w sitemapie, deklaracje zwrotne;
- **pokrycie:** każda trasa z `.next/prerender-manifest.json`, która daje indeksowalne 200
  z canonical na siebie, musi być w sitemapie (łapie np. folder artykułu bez wpisu w
  `lib/blogPosts.js`);
- linki wewnętrzne z `<main>`: żaden nie prowadzi do 3xx, 4xx ani 5xx;
- bez `NEXT_PUBLIC_PODGLAD_PARTII` (podgląd opublikowałby strony za bramką).

**Nowe strony trafiają do sitemapy same:** artykuł z `lib/blogPosts.js`, trasa z
`i18n/routing.js`, opublikowany wpis `lib/publikacja.js` (z wersją EN z `lib/stronyEn.js`) oraz
każdy slug z rejestrów tras `[slug]`: `lib/porownania.js`, `lib/pytaniaAi.js`, `STRONY_NARZEDZI`
w `lib/narzedzia.js` (w tym szablony z `lib/szablony/index.js`). To ta sama lista slugów, z której
`generateStaticParams` buduje strony. Bramka `czyOpublikowana()` działa tak samo jak dla stron.

## Cron IndexNow

`vercel.json`: `/api/cron/indexnow`, `15 6 * * *` (raz dziennie, mieści się w planie Hobby; tam
wywołanie może przyjść w dowolnej minucie tej godziny). Trasa nie ma stanu:

1. Autoryzacja: z `CRON_SECRET` wymagany nagłówek `Authorization: Bearer <CRON_SECRET>` (Vercel
   dokleja go sam), bez sekretu wystarczy `user-agent` `vercel-cron/*` (słabsza ochrona, najgorszy
   skutek to powtórne zgłoszenie tej samej listy).
2. Tylko `VERCEL_ENV=production`; na podglądach i lokalnie nic nie wysyła.
3. Zgłasza tylko w ciągu 26 h od buildu (24 h + rozrzut crona + zapas): co najmniej jedno
   zgłoszenie po każdym wdrożeniu z nowymi datami, najwyżej dwa.
4. Nie zgłasza, gdy build jest o ponad dzień późniejszy niż `_wydanie.data` (wdrożenie bez nowego
   wydania, np. sam CSS) ani gdy wydanie nie zmieniło adresów.
5. Najwyżej 100 adresów na wywołanie. Odpowiedź JSON trafia do logów Vercel (`[indexnow]`).

Test ręczny bez wysyłki: `curl -H "Authorization: Bearer $CRON_SECRET" https://www.ai-seo-company.pl/api/cron/indexnow?sucho=1`
(bez sekretu: `curl -A vercel-cron/1.0 ...`). Bez stempla buildu (np. gdyby Vercel budował
`next build` zamiast `npm run build`) okno liczy się od dnia wydania: dziś lub wczoraj.

**Klucze:** automat nie potrzebuje kluczy API. IndexNow używa publicznego pliku klucza
`public/4741be50b9cf74fd0720fcdf60f9e624.txt`. Opcjonalnie w Vercel → Settings → Environment
Variables: `CRON_SECRET` (losowy ciąg, środowisko Production).

## Opcje `wydanie.mjs`

`--sprawdz`, `--sucho` (bez zapisu), `--bez-builda` (istniejący `.next`), `--bez-punktu-stalego`,
`--bez-git` (tylko kopie i testy), `--baza <origin>` (domyślnie produkcja), `--dzis RRRR-MM-DD`,
`--port <n>`, `--raport <plik.json>`, `--potwierdzam-masowa-zmiane`, `--pomin-kontrole` (tylko
w awarii, opisać w commicie). Kody wyjścia: 0 OK, 1 błędy kontroli lub nieaktualny plik,
2 warunki wstępne, 3 bezpiecznik.

## Migracja 11.11.2026

`scripts/sitemap/migracja.mjs` przeniósł 87 dat z dawnego obiektu `LASTMOD` (`lib/lastmod.js`
z commita d57d57a) do `lib/lastmod.json`. Żadna data nie przesunęła się do przodu. Poprawka
z audytu sitemapy 11.11.2026 (odcisk trzech wdrożeń): 15 adresów EN miało lastmod 11.11 tylko
przez zmianę menu w nagłówku, więc wróciły do realnej ostatniej zmiany (13 artykułów
`/en/blog/*` → 2026-11-06, `/en/blog/canonical-tag-seo-guide-2026` → 2026-09-26,
`/en/client-portal` → 2026-11-04). `tresc` = data z podpisu albo JSON-LD `dateModified`, jeśli
wcześniejsza (27 adresów), `pierwszy` = JSON-LD `datePublished` (47 adresów).

Adresy gałęzi `narzedzia-aplikacje` bez daty na produkcji (14 nowych szablonów i raport SEO) nie
mają wpisu, więc do pierwszego `npm run wydanie` sitemapa podaje je bez `<lastmod>` (wcześniej
dostawały 2026-08-24, datę sprzed powstania stron).

## Historia dat sprzed automatu (z komentarzy dawnego `lib/lastmod.js`)

- 24.08.2026: wszystkie strony statyczne miały jedną datę audytu (2026-08-24), artykuły datę publikacji.
- 14.10.2026: lastmod = dzień wdrożenia produkcyjnego z ostatnią istotną zmianą strony (GitHub
  Deployments). Pięć artykułów miało wcześniej lastmod sprzed powstania strony.
- 20.10 (2f04f61), 22.10 (f727335), 23.10, 29.10, 4.11, 5-6.11 (PLAN-v2), 11.11.2026 (wydanie
  narzędzi i wersji EN): daty ustawiane ręcznie listą adresów, których HTML różnił się od produkcji
  (porównania skryptami `en-skrypty/porownaj_prod.py`). Elementy wspólne (Header, Footer, baner,
  Contact, JSON-LD layoutu) nigdy się nie liczyły.
- 11.11.2026: automat (ten katalog). Ręczna lista okazała się zawodna: 15 z 87 dat było za nowych.
