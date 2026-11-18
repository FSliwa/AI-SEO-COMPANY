# Frazy kluczowe PL / EN / DE dla ai-seo-company.pl (stan 18.11.2026)

Plik do repo. Decyzja właściciela z 18.11.2026: dodać wersję niemiecką (/de) i zbadać frazy osobno dla PL, EN, DE metodą airSlate (autosugestie Google → strona na każde narzędzie, szablon, funkcję, miasto, „X vs Y” i pytanie). Wszystkie liczby poniżej to dane z tego badania; **szacunki są oznaczone** („szac.”), brak danych oznaczony „brak danych”.

## 1. Metoda i źródła

1. **Inwentarz serwisu (produkcja, 18.11.2026):** 119 URL z `/sitemap.xml` pobrane curl-em jako HTML serwerowy (bez JS), po 1 żądaniu na URL. Dla każdego: title, H1, meta description, canonical, hreflang, liczba słów, linki wewnętrzne z kotwicami. Plik: `inwentarz.csv` (strona) i `inwentarz-frazy.csv` (fraza × strona).
2. **Frazy przypisane do stron:** lista strażnika fraz (`narzedzia/kontrola-fraz.py`, 10 URL), pola `fraza` szablonów (`lib/szablony/*.js`, PL i EN), `frazy.csv` z planu (381 fraz PL, wolumeny z 04.11.2026), tytuły z `lib/stronyEn.js`/`lib/publikacja.js`; dla reszty fraza wyznaczona z title/H1 i potwierdzona danymi (tabela w RAPORT.md).
3. **Autosugestie Google:** `suggestqueries.google.com`, seedy = usługi, narzędzia, 15 szablonów, wzorce porównań, pytania, lokalizacje; seed + litery a–z (12 seedów głównych) i seed + 10 modyfikatorów (pozostałe), odstęp 0,35 s, cache JSON. PL (hl=pl, gl=pl): 874 zapytań, 810 unikalnych podpowiedzi (224 zapytań z jakąkolwiek podpowiedzią); EN (hl=en, gl=us): 874 / 3242 / 496; DE (hl=de, gl=de): 873 / 1248 / 238. Wiele długich modyfikatorów nie zwraca podpowiedzi (Google podpowiada tylko zapytania z wystarczającym popytem).
4. **Wolumeny, CPC, konkurencja:** DataForSEO `keywords_data/google_ads/search_volume/live` (Google Ads Keyword Planner). Lokalizacje: PL 2616 (pl); US 2840 i GB 2826 (en); DE 2276, AT 2040, CH 2756 (de). Kandydatów: PL 1922, EN 4059, DE 2055; z wolumenem > 0: PL 770, EN 2235, DE 829 (uwaga: DE zawiera 48 fraz dodatkowych z drugiej partii pod mapę DE, tylko kraj DE). **Wolumeny Keyword Plannera są zaokrąglone i grupują bliskie warianty** (np. „seo audit website/site/of website” = 440), więc suma wariantów zawyża; w tabelach podaję głowę klastra i szacunek klastra = głowa + 40% pozostałych unikalnych wartości (szac.).
5. **SERP:** 15 najsilniejszych klastrów na język (PL, EN, DE) + 2 frazy testowe „rynek PL” dla DE = 47 zapytań, `serp/google/organic/live/advanced` (desktop, lokalizacja kraju jak wyżej), 1 migawka 18.11.2026. Domeny w odpowiedzi DataForSEO przychodzą jako przekierowania google.com/goto, więc oceniam typ strony po **tytułach** wyników, nie po domenach.
6. **Klastrowanie:** reguły leksykalne na zbiorze fraz z wolumenem (taksonomia: 45 reguł PL, 36 EN, 29 DE, w tym klastry per szablon), potem weryfikacja intencji i typu strony na SERP-ach dla 47 klastrów. To **nie jest** klastrowanie po pokryciu TOP 10 (playbook 3.1 pkt 3: ≥ 40–50% wspólnych wyników); pełne SERP-owe klastrowanie wymaga ok. 1 zapytania na frazę (koszt rzędu 2 USD na 1000 fraz) i jest rekomendowane przed budową każdej NOWEJ strony.
7. **Koszty DataForSEO:** 122 wywołań, **2.53 USD** z limitu 3,00 USD (log: `koszty.csv`; 1 nieudane wywołanie 0 USD, 1 powtórka partii PL 0,09 USD po odrzuceniu znaków specjalnych).
8. **ICE** = Impact × Confidence × Ease / 10 (0–100). Impact (1–10) z logarytmu szacowanego popytu klastra: 10 → 1, 100 → 3,5, 1000 → 6, 10000 → 8,5. Confidence i Ease to oceny redakcji (1–10): Confidence maleje dla głowy rynku, fraz ogólnych i fraz bez zgodnej intencji; Ease maleje dla stron wymagających unikalnych danych lub prawnika. To nie są wartości z planu v2 (inna skala), tylko ranking tego badania.

Guardrails stosowane do wyników: 1 klaster = 1 URL; programmatic tylko przy realnym popycie i unikalnych danych; brak stron miejskich z podmienioną nazwą miasta (playbook 5.4, 7.2); badanie osobno per rynek, bez tłumaczenia 1:1 (playbook 4.5); frazy ze strażnika nie mogą stracić obecności.

## 2. Tabele fraz (klastry, wg szacowanego popytu)

Kolumny jak w prośbie: fraza | wolumen | intencja | URL | status. Pełna lista fraz: `frazy-pl.csv`, `frazy-en.csv`, `frazy-de.csv`.

### 2.1 Polska (PL, język pl)

| fraza główna | wolumen/mies. (kraje) | szac. klastra | intencja | URL | status | ICE |
|---|---|---:|---|---|---|---:|
| opinie google | PL12100 | 12100 | nawigacyjna/informacyjna | /blog/jak-pozyskiwac-opinie-google-poradnik | istniejąca | 16.2 |
| wizytówka google | PL9900 | 11136 | mieszana | /pozycjonowanie-wizytowki-google | istniejąca | 31.5 |
| pozycjonowanie stron | PL5400 | 7760 | komercyjna | /pozycjonowanie-stron-internetowych | istniejąca | 44.8 |
| tworzenie stron internetowych | PL4400 | 5984 | komercyjna | /projektowanie-stron-internetowych | istniejąca | 32.0 |
| agencja marketingowa | PL3600 | 5560 | komercyjna | / | istniejąca | 32.0 |
| seo co to | PL2900 | 3300 | informacyjna | /blog/co-to-jest-seo | nowa | 12.6 |
| google ai mode | PL2400 | 3164 | informacyjna | /blog/google-ai-mode-jak-sie-pojawic | nowa | 21.0 |
| ai overview | PL1600 | 3004 | komercyjna | /pozycjonowanie-w-ai | istniejąca | 39.2 |
| zapytanie ofertowe | PL2900 | 2900 | informacyjna | /narzedzia/zapytanie-ofertowe-seo | istniejąca | 12.6 |
| bing webmaster tools | PL2400 | 2484 | informacyjna | /blog/bing-webmaster-tools-indexnow-chatgpt | nowa | 24.5 |
| audyt seo | PL1600 | 2012 | komercyjna | /audyt-seo | istniejąca | 33.6 |
| cennik pozycjonowania | PL880 | 1580 | komercyjna | /cennik-pozycjonowania | istniejąca | 33.6 |
| pozycjonowanie sklepu internetowego | PL720 | 1092 | komercyjna | /pozycjonowanie-sklepu-internetowego | nowa | 12.0 |
| ile kosztuje strona internetowa | PL1000 | 1068 | komercyjna | /blog/ile-kosztuje-strona-www-dla-firmy-ceny | istniejąca | 24.0 |
| pozycjonowanie lokalne | PL720 | 1040 | komercyjna | /seo-lokalne-warszawa | istniejąca | 28.8 |
| narzędzia seo | PL590 | 958 | narzędzie | /narzedzia | istniejąca | 24.0 |
| freelancer seo | PL880 | 920 | komercyjna | /porownania/agencja-seo-czy-freelancer | nowa | 21.6 |
| copywriting seo | PL880 | 896 | komercyjna | /copywriting-seo | nowa | 12.0 |
| link building | PL720 | 872 | mieszana | /pozycjonowanie-w-ai-link-building | nowa | 12.0 |
| blog seo | PL720 | 720 | informacyjna | /blog | istniejąca | 10.8 |
| schema org | PL480 | 652 | informacyjna | /narzedzia/dane-strukturalne-json-ld | istniejąca | 27.0 |
| llms.txt | PL590 | 642 | nawigacyjna/narzędzie | /narzedzia/generator-llms-txt | istniejąca | 37.8 |
| marketing b2b | PL390 | 462 | informacyjna | /blog | istniejąca | 10.5 |
| audyt ux | PL390 | 406 | informacyjna | /blog/audyt-ux-strony | istniejąca | 18.0 |
| ranking agencji seo | PL260 | 392 | komercyjna | /porownania/ranking-agencji-seo | nowa | 12.5 |
| analiza konkurencji | PL320 | 348 | informacyjna | /blog/analiza-konkurencji-seo-przewodnik | istniejąca | 22.5 |
| content plan | PL320 | 324 | informacyjna/narzędzie | /narzedzia/content-plan | istniejąca | 27.0 |
| pozycjonowanie w chatgpt | PL170 | 274 | komercyjna | /pozycjonowanie-w-ai/chatgpt | istniejąca | 24.0 |
| pozycjonowanie stron w niemczech | PL170 | 226 | komercyjna | /pozycjonowanie-stron-w-niemczech | nowa | 8.0 |
| pozycjonowanie dla firm | PL110 | 198 | komercyjna | /seo-dla-branz | nowa | 6.4 |
| raport seo | PL170 | 182 | informacyjna | /narzedzia/raport-seo | istniejąca | 14.4 |
| strategia seo | PL170 | 170 | informacyjna | /narzedzia/szablon-strategii-seo | istniejąca | 14.4 |
| pozycjonowanie za efekt | PL140 | 160 | komercyjna | /porownania/pozycjonowanie-za-efekt-czy-abonament | istniejąca | 14.4 |
| linkowanie wewnętrzne | PL140 | 156 | informacyjna | /narzedzia/linkowanie-wewnetrzne | istniejąca | 18.0 |
| pakiety seo | PL90 | 154 | mieszana | /blog | istniejąca | 12.8 |
| ai visibility | PL110 | 126 | narzędzie | /sprawdz-widocznosc-w-ai | istniejąca | 21.6 |

Frazy pominięte (nie budujemy stron):

- **_miasta**: 124 fraz, głowa „pozycjonowanie stron toruń” (PL1900). strony miejskie = doorway bez lokalnych danych (playbook 7.2)
- **_szum**: 60 fraz, głowa „ai mode” (PL18100). marki, szum, poza ofertą
- **_inne**: 49 fraz, głowa „core web vitals” (PL880). nieprzypisane

Miasta (top): pozycjonowanie stron toruń (1900), pozycjonowanie stron poznań (880), pozycjonowanie poznań (720), pozycjonowanie stron katowice (720), pozycjonowanie kraków (590), pozycjonowanie stron kraków (590), pozycjonowanie stron wrocław (590), pozycjonowanie stron łódź (590). Decyzja: poza Warszawą żadnych stron miejskich (doorway, brak lokalnych danych); wyjątek do rozważenia = jedna strona regionalna Mazowsze z danymi klientów, jeśli GSC pokaże zapytania regionalne.

### 2.2 Anglojęzyczny (EN, wolumeny US + GB)

| fraza główna | wolumen/mies. (kraje) | szac. klastra | intencja | URL | status | ICE |
|---|---|---:|---|---|---|---:|
| seo services | US40500/GB2400 | 97836 | komercyjna | /en + /en/seo-services | istniejąca | 16.0 |
| local seo | US8100/GB1000 | 22208 | komercyjna | /en/local-seo-warsaw | istniejąca | 21.6 |
| ai seo | US6600/GB1600 | 19804 | komercyjna/informacyjna | /en/ai-search-optimization | istniejąca | 36.0 |
| web design agency | US12100/GB2400 | 18264 | komercyjna | /en/web-design | istniejąca | 14.4 |
| domain authority checker | US9900/GB5400 | 16896 | narzędzie | /en/tools/domain-authority-checker | istniejąca | 40.5 |
| seo audit | US2900/GB1000 | 7612 | komercyjna | /en/seo-audit | istniejąca | 25.6 |
| llms.txt | US3600/GB1000 | 5440 | narzędzie | /en/tools/llms-txt-generator | istniejąca | 50.4 |
| link building services | US1900/GB2400 | 4896 | komercyjna | /en/link-building-services | nowa | 12.0 |
| free seo audit | US1300/GB480 | 4844 | narzędzie | /en/tools/free-seo-audit | istniejąca | 28.8 |
| content calendar template | US2400/GB480 | 4320 | informacyjna | /en/tools/content-calendar-template | istniejąca | 43.2 |
| seo cost | US2400/GB480 | 4304 | komercyjna | /en/seo-pricing | istniejąca | 36.0 |
| seo vs geo | US1900/GB390 | 2578 | informacyjna | /en/comparisons/seo-vs-geo | istniejąca | 37.8 |
| ai visibility | US1000/GB210 | 2418 | komercyjna | /en/ai-visibility-check | istniejąca | 33.6 |
| competitor analysis template | US1000/GB390 | 2406 | informacyjna | /en/tools/competitor-analysis-template | istniejąca | 31.5 |
| b2b seo agency | US880/GB320 | 1892 | komercyjna | /en/blog/seo-for-saas-startups-playbook | istniejąca | 28.0 |
| seo vs sem | US1600/GB90 | 1810 | informacyjna | /en/comparisons/seo-vs-google-ads | istniejąca | 31.5 |
| ecommerce seo agency | US880/GB720 | 1700 | komercyjna | /en/ecommerce-seo-agency | nowa | 8.4 |
| seo report example | US590/GB170 | 1532 | informacyjna | /en/tools/seo-report-template | istniejąca | 27.0 |
| what is schema markup | US880/GB210 | 1142 | informacyjna | /en/tools/schema-markup-examples | istniejąca | 27.0 |
| seo checklist | US720/GB140 | 1092 | informacyjna | /en/tools/seo-checklist | istniejąca | 27.0 |
| ai visibility audit | US320/GB50 | 1002 | komercyjna | /en/ai-search-optimization/ai-visibility-audit | istniejąca | 24.0 |
| how long does seo take to work | US390/GB90 | 796 | informacyjna | /en/blog/how-long-does-seo-take | nowa | 14.4 |
| is google ads worth it | US210/GB70 | 752 | mieszana | /en/blog | istniejąca | 19.2 |
| what is seo strategy | US480/GB110 | 742 | informacyjna | /en/tools/seo-strategy-template | istniejąca | 27.0 |
| what is keyword research | US210/GB50 | 380 | informacyjna | /en/blog | istniejąca | 9.0 |
| poland seo | US110/GB140 | 346 | komercyjna | /en | istniejąca | 24.0 |
| content brief template | US170/GB20 | 306 | informacyjna | /en/tools/content-brief-template | istniejąca | 22.5 |
| internal linking strategy | US140/GB40 | 288 | informacyjna | /en/tools/internal-linking-template | istniejąca | 22.5 |
| seo roi calculator | US210/GB40 | 282 | narzędzie | /en/tools/seo-loss-calculator | istniejąca | 22.5 |
| best seo agency for saas companies | US110/GB10 | 272 | komercyjna | /en/comparisons/how-to-choose-an-seo-agency | istniejąca | 13.5 |
| website migration checklist | US140/GB40 | 236 | informacyjna | /en/tools/website-migration-checklist | istniejąca | 18.0 |
| content audit template | US90/GB30 | 164 | informacyjna | /en/tools/content-audit-template | istniejąca | 18.0 |
| keyword research template | US110/GB30 | 164 | informacyjna | /en/tools/keyword-research-template | istniejąca | 18.0 |
| seo rfp | US20/GB30 | 54 | informacyjna | /en/tools/seo-rfp-template | istniejąca | 13.5 |

Frazy pominięte:

- **_miasta**: 241 fraz, głowa „search engine optimization services near me” (US40500/GB2900). strony miejskie = doorway bez lokalnych danych (playbook 7.2)
- **_szum**: 131 fraz, głowa „seotools” (US165000/GB5400). marki, szum, poza ofertą
- **_inne**: 153 fraz, głowa „core web vitals” (US2400/GB1000). nieprzypisane

Miasta i kraje (top): search engine optimization services near me (43400), seo agency near me (43400), seo firms near me (43400), seo services near me (43400), seo near me (19700), search engine optimization companies near me (18980), seo company near me (18980), local seo near me (8690). Decyzja: bez stron „seo agency <miasto>”; EN to rynek wsparcia dla firm zagranicznych w Polsce (`poland seo` 250 US+GB).

### 2.3 Niemiecki (DE, wolumeny DE + AT + CH)

| fraza główna | wolumen/mies. (kraje) | szac. klastra | intencja | URL | status | ICE |
|---|---|---:|---|---|---|---:|
| google unternehmensprofil | DE12100/AT0/CH0 | 13448 | komercyjna | /de/google-unternehmensprofil-optimieren | nowa (wersja DE) | 16.2 |
| seo agentur | DE3600/AT590/CH590 | 6484 | komercyjna | /de | nowa (wersja DE) | 9.6 |
| geo agentur | DE1300/AT880/CH70 | 4766 | komercyjna | /de/ki-suchoptimierung | nowa (wersja DE) | 19.2 |
| webdesign agentur | DE2900/AT390/CH480 | 4422 | komercyjna | /de/webdesign | nowa (wersja DE) | 9.6 |
| llms.txt | DE1600/AT210/CH210 | 2184 | narzędzie | /de/tools/llms-txt-generator | nowa (wersja DE) | 44.1 |
| domain authority checker | DE1300/AT0/CH0 | 1308 | narzędzie | /de/tools/domain-autoritaet-pruefen | nowa (wersja DE) | 27.0 |
| keyword recherche | DE1300/AT0/CH0 | 1300 | informacyjna | /de/tools/keyword-recherche-vorlage | nowa (wersja DE) | 16.2 |
| seo audit | DE590/AT50/CH140 | 1004 | komercyjna | /de/seo-audit | nowa (wersja DE) | 19.2 |
| e-e-a-t | DE1000/AT0/CH0 | 1000 | informacyjna | /de/tools/e-e-a-t-checkliste | nowa (wersja DE) | 27.0 |
| seo analyse kostenlos | DE170/AT10/CH10 | 650 | narzędzie | /de/tools/kostenloser-seo-audit | nowa (wersja DE) | 27.0 |
| seo kosten | DE170/AT10/CH20 | 492 | komercyjna | /de/seo-kosten | nowa (wersja DE) | 24.0 |
| schema markup | DE480/AT0/CH0 | 480 | informacyjna | /de/tools/schema-markup-beispiele | nowa (wersja DE) | 22.5 |
| redaktionsplan vorlage | DE170/AT20/CH20 | 390 | informacyjna | /de/tools/redaktionsplan-vorlage | nowa (wersja DE) | 27.0 |
| seo für onlineshop | DE170/AT10/CH10 | 278 | komercyjna | /de/seo-fuer-onlineshops | nowa (wersja DE) | 6.0 |
| interne verlinkung | DE110/AT10/CH10 | 214 | informacyjna | /de/tools/interne-verlinkung-vorlage | nowa (wersja DE) | 18.0 |
| seo vs sea | DE170/AT0/CH0 | 186 | komercyjna | /de/vergleiche/seo-oder-google-ads | nowa (wersja DE) | 21.6 |
| seo polen | DE110/AT10/CH10 | 158 | komercyjna | /de/seo-agentur-polen | nowa (wersja DE) | 14.4 |
| wie lange dauert seo | DE90/AT10/CH10 | 138 | informacyjna | /de/blog/wie-lange-dauert-seo | nowa (wersja DE) | 9.6 |
| ki seo tools | DE30/AT10/CH10 | 94 | informacyjna | /de/blog/ki-fuer-seo | nowa (wersja DE) | 7.2 |
| seo vs geo vs aeo | DE20/AT10/CH10 | 60 | informacyjna | /de/vergleiche/seo-vs-geo | nowa (wersja DE) | 14.4 |
| konkurrenzanalyse seo | DE50/AT0/CH0 | 54 | informacyjna | /de/tools/konkurrenzanalyse-vorlage | nowa (wersja DE) | 13.5 |
| seo strategie erstellen | DE40/AT0/CH0 | 52 | informacyjna | /de/tools/seo-strategie-vorlage | nowa (wersja DE) | 13.5 |
| beste seo agentur schweiz | DE10/AT0/CH30 | 52 | komercyjna | /de/vergleiche/seo-agentur-auswaehlen | nowa (wersja DE) | 7.2 |
| seo maßnahmen checkliste | DE10/AT10/CH10 | 30 | informacyjna | /de/tools/seo-checkliste | nowa (wersja DE) | 9.0 |

Frazy pominięte:

- **_miasta**: 137 fraz, głowa „seo agentur münchen” (DE2400/AT210/CH10). strony miejskie = doorway bez lokalnych danych (playbook 7.2)
- **_szum**: 29 fraz, głowa „seo ji hoon” (DE880/AT90/CH90). marki, szum, poza ofertą
- **_inne**: 14 fraz, głowa „core web vitals” (DE1000/AT0/CH0). nieprzypisane

Miasta (top): seo agentur münchen (2620), seo agentur wien (1820), webdesign agentur berlin (900), webdesign agentur wien (900), seo agentur düsseldorf (740), seo agentur stuttgart (740), seo agentur hamburg (610), geo agentur münchen (570). Decyzja: bez stron „seo agentur <Stadt>” (agencja bez adresu w DACH = doorway i brak szans wobec lokalnych agencji z Local Pack).


## 3. Macierz stron w stylu airSlate (wzorzec → popyt → dane → decyzja)

Szac. popyt = suma szacunków klastrów (wolumeny Keyword Plannera, zaokrąglone). „Istniejących/nowych” liczone po klastrach, nie po stronach.


| wzorzec | język | klastrów | szac. popyt/mies. | istniejących stron | nowych stron | decyzja |
|---|---|---:|---:|---:|---:|---|
| narzędzie | PL | 4 | 3738 | 4 | 0 | GO: własne narzędzia = unikalne dane, popyt realny (llms.txt, domain authority). |
| narzędzie | EN | 6 | 30882 | 6 | 0 | jak PL |
| narzędzie | DE | 3 | 4142 | 0 | 3 | jak PL |
| szablon | PL | 12 | 5154 | 12 | 0 | GO dla 14 szablonów; nowe tylko z popytem (patrz klastry). Jeden szablon = jeden URL. |
| szablon | EN | 12 | 12446 | 12 | 0 | jak PL |
| szablon | DE | 8 | 3520 | 0 | 8 | jak PL |
| porównanie X vs Y | PL | 5 | 1640 | 3 | 2 | GO selektywnie: tylko pary z danymi własnymi (17 agencji, koszty); bez masowych „alternatywy dla X”. |
| porównanie X vs Y | EN | 3 | 4660 | 3 | 0 | jak PL |
| porównanie X vs Y | DE | 3 | 298 | 0 | 3 | jak PL |
| pytanie / poradnik | PL | 14 | 38352 | 9 | 5 | GO: odpowiedź w 1. akapicie + dane własne; TOFU definicyjne (co to SEO) NIE. |
| pytanie / poradnik | EN | 7 | 37944 | 6 | 1 | jak PL |
| pytanie / poradnik | DE | 4 | 14172 | 0 | 4 | jak PL |
| usługa lokalna (+ 124 fraz miejskich: 24250/mies. łącznie) | PL | 1 | 1040 | 1 | 0 | STOP dla miast: tylko Warszawa (1 strona z lokalnymi danymi); reszta = doorway (playbook 7.2). |
| usługa lokalna (+ 241 fraz miejskich: 343410/mies. łącznie) | EN | 0 | 0 | 0 | 0 | jak PL |
| usługa lokalna (+ 137 fraz miejskich: 23960/mies. łącznie) | DE | 0 | 0 | 0 | 0 | jak PL |
| usługa / hub / funkcja | PL | 8 | 24098 | 5 | 3 | GO dla huba GEO i cennika; głowa rynku (agencja/seo agentur/seo company) tylko wzmacniać. |
| usługa / hub / funkcja | EN | 6 | 142846 | 4 | 2 | jak PL |
| usługa / hub / funkcja | DE | 6 | 17112 | 0 | 6 | jak PL |


Wzorce programmatic, które przechodzą test „popyt + unikalne dane + racja bytu bez Google”:
- **Narzędzia własne** (6 + raport): popyt realny w EN i DE (llms.txt 4600 US+GB, 2020 DACH; domain authority checker 15300 US+GB, 1300 DE; free seo audit klaster 4844 szac.). Dane unikalne: generator, Common Crawl, audyt.
- **Szablony do pobrania** (15): popyt niski per szablon (PL 140–320, EN 1390–4320, DE 110–210), ale tani w utrzymaniu; jeden URL na szablon, wariantów („excel”, „google sheets”) NIE rozbijamy na osobne strony.
- **Porównania** („X vs Y”): popyt mały (PL „seo vs geo” 90, EN „seo vs geo” 2290, DE „seo vs geo” 390/550); wartość BOFU i cytowalność w AI; tylko z danymi własnymi.
- **Pytania** („ile kosztuje”, „jak długo”): jedna strona na pytanie, odpowiedź w 1. akapicie; cennik już istnieje w PL i EN.
- **Miasta:** NIE (patrz sekcja 2: PL 130 fraz miejskich, EN 241, DE 137; łączny popyt wysoki, ale konkurencja = lokalne agencje, a my nie mamy lokalnych danych poza Warszawą).
- **Branże/vertical** („seo dla lekarzy”, „ecommerce seo agency”): popyt PL 40–90, EN 1600 (ecommerce); tylko z realizacjami (case study) w branży; bez nich = doorway.

## 4. Weryfikacja SERP (47 zapytań, 18.11.2026, jedna migawka)

Uwaga: SERP ocenia typ strony po tytułach; AI Overview obecne w 46 z 47 zapytań (stąd nacisk na odpowiedź w pierwszym akapicie i dane własne).

### PL

| fraza | dominujący typ wyników (tytuły) | AI Overview | PAA | wniosek |
|---|---|---|---|---|
| pozycjonowanie stron | usługa/agencja (usługa/agencja 7, poradnik/pytanie 3) | tak | tak | strona usługi/agencji; wygrywają lokalne agencje |
| ai overview | poradnik/pytanie (poradnik/pytanie 5, inne 4) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| llms.txt | inne (inne 7, porównanie 1) | tak | nie | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| cennik pozycjonowania | poradnik/pytanie (poradnik/pytanie 7, usługa/agencja 1) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| audyt seo | poradnik/pytanie (poradnik/pytanie 7, inne 2) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| agencja marketingowa | usługa/agencja (usługa/agencja 4, poradnik/pytanie 4) | tak | tak | strona usługi/agencji; wygrywają lokalne agencje |
| tworzenie stron internetowych | poradnik/pytanie (poradnik/pytanie 6, inne 3) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| wizytówka google | poradnik/pytanie (poradnik/pytanie 3, inne 2) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| pozycjonowanie lokalne | inne (inne 4, poradnik/pytanie 3) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| content plan | inne (inne 5, poradnik/pytanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| schema org | inne (inne 5, poradnik/pytanie 2) | tak | nie | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| bing webmaster tools | narzędzie/szablon (narzędzie/szablon 9) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| narzędzia seo | narzędzie/szablon (narzędzie/szablon 9) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| pozycjonowanie w chatgpt | poradnik/pytanie (poradnik/pytanie 5, inne 1) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| ile kosztuje strona internetowa | poradnik/pytanie (poradnik/pytanie 8, inne 1) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |

### EN

| fraza | dominujący typ wyników (tytuły) | AI Overview | PAA | wniosek |
|---|---|---|---|---|
| llms.txt | inne (inne 5, poradnik/pytanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| content calendar template | inne (inne 5, narzędzie/szablon 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| domain authority checker | narzędzie/szablon (narzędzie/szablon 9) | tak | nie | narzędzie lub szablon = właściwy typ strony |
| seo vs geo | porównanie (porównanie 5, inne 3) | tak | tak | porównanie X vs Y |
| ai seo | narzędzie/szablon (narzędzie/szablon 4, poradnik/pytanie 3) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| seo pricing | poradnik/pytanie (poradnik/pytanie 8, inne 1) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| ai visibility | inne (inne 5, narzędzie/szablon 4) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| what is schema markup | poradnik/pytanie (poradnik/pytanie 6, inne 2) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| competitor analysis template | narzędzie/szablon (narzędzie/szablon 4, inne 3) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| seo vs sem | inne (inne 4, porównanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| free seo audit | narzędzie/szablon (narzędzie/szablon 9) | tak | nie | narzędzie lub szablon = właściwy typ strony |
| b2b seo agency | zestawienie (zestawienie 7, inne 1) | nie | nie | zestawienia „best/top”: wejście przez listy zewnętrzne |
| seo audit | narzędzie/szablon (narzędzie/szablon 6, poradnik/pytanie 3) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| ai visibility audit | inne (inne 4, narzędzie/szablon 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| poland seo | inne (inne 6, usługa/agencja 1) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |

### DE

| fraza | dominujący typ wyników (tytuły) | AI Overview | PAA | wniosek |
|---|---|---|---|---|
| llms.txt | inne (inne 5, poradnik/pytanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| geo agentur | usługa/agencja (usługa/agencja 6, inne 3) | tak | tak | strona usługi/agencji; wygrywają lokalne agencje |
| seo audit site | narzędzie/szablon (narzędzie/szablon 7, inne 1) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| redaktionsplan vorlage | narzędzie/szablon (narzędzie/szablon 7, inne 1) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| seo kosten | poradnik/pytanie (poradnik/pytanie 9) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| seo audit | inne (inne 5, narzędzie/szablon 3) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| interne verlinkung | inne (inne 6, poradnik/pytanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| seo polen | inne (inne 6, zestawienie 1) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| seo vs geo vs aeo | inne (inne 5, poradnik/pytanie 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| local seo | inne (inne 6, usługa/agencja 2) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |
| seo vs google ads | porównanie (porównanie 6, inne 2) | tak | tak | porównanie X vs Y |
| seo agentur | usługa/agencja (usługa/agencja 9) | tak | tak | strona usługi/agencji; wygrywają lokalne agencje |
| webdesign agentur | usługa/agencja (usługa/agencja 6, zestawienie 3) | tak | tak | strona usługi/agencji; wygrywają lokalne agencje |
| wie lange dauert seo | poradnik/pytanie (poradnik/pytanie 8) | tak | tak | poradnik/pytanie: pisać odpowiedź w pierwszym akapicie |
| ki seo tools | narzędzie/szablon (narzędzie/szablon 8, inne 1) | tak | tak | narzędzie lub szablon = właściwy typ strony |
| polnische seo agentur | usługa/agencja (usługa/agencja 3, inne 3) | tak | nie | strona usługi/agencji; wygrywają lokalne agencje |
| website für polnischen markt | inne (inne 8, porównanie 1) | tak | tak | mieszany/niejednoznaczny (sprawdzić ręcznie) |


Wnioski z SERP, ważne dla decyzji:
- „seo polen” (DE) zwraca strony po polsku i angielsku („SEO in Poland”, polskie agencje), a „polnische seo agentur” zwraca agencję w Dortmundzie obsługującą Polonię w Niemczech; „website für polnischen markt” zwraca portal Polonia Market. **Ramka „firmy z DACH wchodzące na rynek polski” nie ma mierzalnego popytu w Keyword Plannerze** (seo polen 130 DE+AT+CH, seo agentur polen 10–20, pozostałe bez danych) i nie ma jasnej intencji w SERP.
- „llms.txt” ma SERP wielojęzyczny (w PL/EN/DE wiodą strony japońskie, specyfikacja i dokumentacje): narzędzie z dobrym H1 w danym języku ma realną szansę na top 10.
- „content plan” (PL) zwraca strony indonezyjskie, a „geo agentur” (DE) lokalne agencje z Local Pack: SERP-y wielojęzyczne/niejednoznaczne wymagają ręcznego przeglądu przed budową.


## 5. Top 30 rekomendacji (wg ICE, wszystkie języki)

| # | język | działanie | fraza (wolumen) | URL | ICE |
|---:|---|---|---|---|---:|
| 1 | DE | Utworzyć wersję DE /de/tools/llms-txt-generator (narzędzie); fraza w DE: „llms.txt”. | llms.txt (DE1600/AT210/CH210; klaster szac. 2184) | /de/tools/llms-txt-generator | 44.1 |
| 2 | PL | Popraw: poza H1, 0 linków wewn. z kotwicą=fraza. | ai overview (PL1600; klaster szac. 3004) | /pozycjonowanie-w-ai | 39.2 |
| 3 | EN | Popraw: poza H1. | seo cost (US2400/GB480; klaster szac. 4304) | /en/seo-pricing | 36.0 |
| 4 | EN | Popraw: poza H1. | ai visibility (US1000/GB210; klaster szac. 2418) | /en/ai-visibility-check | 33.6 |
| 5 | PL | Popraw: fraza główna poza title, 0 linków wewn. z kotwicą=fraza. | cennik pozycjonowania (PL880; klaster szac. 1580) | /cennik-pozycjonowania | 33.6 |
| 6 | PL | Popraw: fraza główna poza title, poza H1, poza pierwszymi 100 słowami, 0 linków wewn. z kotwicą=fraza, 0× w treści. | tworzenie stron internetowych (PL4400; klaster szac. 5984) | /projektowanie-stron-internetowych | 32.0 |
| 7 | EN | Popraw: fraza główna poza title, poza H1, poza pierwszymi 100 słowami, 0 linków wewn. z kotwicą=fraza. | seo vs sem (US1600/GB90; klaster szac. 1810) | /en/comparisons/seo-vs-google-ads | 31.5 |
| 8 | DE | Utworzyć wersję DE /de/tools/domain-autoritaet-pruefen (narzędzie); fraza w DE: „domain authority checker”. | domain authority checker (DE1300/AT0/CH0; klaster szac. 1308) | /de/tools/domain-autoritaet-pruefen | 27.0 |
| 9 | DE | Utworzyć wersję DE /de/tools/e-e-a-t-checkliste (szablon); fraza w DE: „e-e-a-t”. | e-e-a-t (DE1000/AT0/CH0; klaster szac. 1000) | /de/tools/e-e-a-t-checkliste | 27.0 |
| 10 | DE | Utworzyć wersję DE /de/tools/kostenloser-seo-audit (narzędzie); fraza w DE: „seo analyse kostenlos”. | seo analyse kostenlos (DE170/AT10/CH10; klaster szac. 650) | /de/tools/kostenloser-seo-audit | 27.0 |
| 11 | DE | Utworzyć wersję DE /de/tools/redaktionsplan-vorlage (szablon); fraza w DE: „redaktionsplan vorlage”. | redaktionsplan vorlage (DE170/AT20/CH20; klaster szac. 390) | /de/tools/redaktionsplan-vorlage | 27.0 |
| 12 | EN | Popraw: fraza główna poza title, 0 linków wewn. z kotwicą=fraza. | seo audit (US2900/GB1000; klaster szac. 7612) | /en/seo-audit | 25.6 |
| 13 | PL | Utworzyć /blog/bing-webmaster-tools-indexnow-chatgpt (poradnik; wzorzec: pytanie/how-to). Unikalne dane: zrzuty konfiguracji własnej witryny | bing webmaster tools (PL2400; klaster szac. 2484) | /blog/bing-webmaster-tools-indexnow-chatgpt | 24.5 |
| 14 | PL | Popraw: poza H1. | ile kosztuje strona internetowa (PL1000; klaster szac. 1068) | /blog/ile-kosztuje-strona-www-dla-firmy-ceny | 24.0 |
| 15 | PL | Popraw: poza H1. | narzędzia seo (PL590; klaster szac. 958) | /narzedzia | 24.0 |
| 16 | DE | Utworzyć wersję DE /de/seo-kosten (poradnik); fraza w DE: „seo kosten”. | seo kosten (DE170/AT10/CH20; klaster szac. 492) | /de/seo-kosten | 24.0 |
| 17 | EN | Popraw: poza H1. | poland seo (US110/GB140; klaster szac. 346) | /en | 24.0 |
| 18 | DE | Utworzyć wersję DE /de/tools/schema-markup-beispiele (szablon); fraza w DE: „schema markup”. | schema markup (DE480/AT0/CH0; klaster szac. 480) | /de/tools/schema-markup-beispiele | 22.5 |
| 19 | EN | Popraw: 0 linków wewn. z kotwicą=fraza. | internal linking strategy (US140/GB40; klaster szac. 288) | /en/tools/internal-linking-template | 22.5 |
| 20 | PL | Utworzyć /porownania/agencja-seo-czy-freelancer (porównanie; wzorzec: X vs Y). Unikalne dane: koszty i godziny: model własny | freelancer seo (PL880; klaster szac. 920) | /porownania/agencja-seo-czy-freelancer | 21.6 |
| 21 | DE | Utworzyć wersję DE /de/vergleiche/seo-oder-google-ads (porównanie); fraza w DE: „seo vs sea”. | seo vs sea (DE170/AT0/CH0; klaster szac. 186) | /de/vergleiche/seo-oder-google-ads | 21.6 |
| 22 | PL | Popraw: fraza główna poza title, poza H1, poza pierwszymi 100 słowami, 0 linków wewn. z kotwicą=fraza, 0× w treści. | ai visibility (PL110; klaster szac. 126) | /sprawdz-widocznosc-w-ai | 21.6 |
| 23 | PL | Utworzyć /blog/google-ai-mode-jak-sie-pojawic (poradnik; wzorzec: pytanie/trend). Unikalne dane: własne testy cytowań w AI Mode | google ai mode (PL2400; klaster szac. 3164) | /blog/google-ai-mode-jak-sie-pojawic | 21.0 |
| 24 | DE | Utworzyć wersję DE /de/ki-suchoptimierung (hub GEO DE) (usługa/hub); fraza w DE: „geo agentur”. | geo agentur (DE1300/AT880/CH70; klaster szac. 4766) | /de/ki-suchoptimierung | 19.2 |
| 25 | DE | Utworzyć wersję DE /de/seo-audit (usługa); fraza w DE: „seo audit”. | seo audit (DE590/AT50/CH140; klaster szac. 1004) | /de/seo-audit | 19.2 |
| 26 | DE | Utworzyć wersję DE /de/tools/interne-verlinkung-vorlage (szablon); fraza w DE: „interne verlinkung”. | interne verlinkung (DE110/AT10/CH10; klaster szac. 214) | /de/tools/interne-verlinkung-vorlage | 18.0 |
| 27 | PL | Popraw: 0 linków wewn. z kotwicą=fraza. | linkowanie wewnętrzne (PL140; klaster szac. 156) | /narzedzia/linkowanie-wewnetrzne | 18.0 |
| 28 | PL | Popraw: 0 linków wewn. z kotwicą=fraza. | jak dobrać słowa kluczowe (PL110; klaster szac. 126) | /narzedzia/dobor-slow-kluczowych | 18.0 |
| 29 | PL | Popraw: 0 linków wewn. z kotwicą=fraza. | migracja strony (PL70; klaster szac. 102) | /narzedzia/checklista-migracji-strony | 18.0 |
| 30 | DE | Utworzyć wersję DE /de/google-unternehmensprofil-optimieren (usługa/poradnik); fraza w DE: „google unternehmensprofil”. | google unternehmensprofil (DE12100/AT0/CH0; klaster szac. 13448) | /de/google-unternehmensprofil-optimieren | 16.2 |

Lista nie zawiera działań bez popytu w danych ani stron miejskich. Poniżej uzupełnienia spoza rankingu ICE:
- **Wersja DE** (wymaga prac w repo: `i18n/routing.js` locales `de`, rejestr `lib/stronyDe.js` wzorem `stronyEn.js`, hreflang `de` + `x-default`, sitemapa DE, wersja `llms.txt` DE; treść pisze i sprawdza native speaker; strony prawne DE: Impressum, Datenschutz wg DSGVO, AGB sprawdza prawnik). Mapa 64 wierszy w `mapa-de.csv`: start = 17 stron, faza 2 = 24, później = 14, pominąć = 9.
- **Jeden URL na klaster:** nie tworzyć drugiej strony na cennik (DE: `seo-kosten`, nie artykuł obok), na audyt, na ChatGPT.
- **Przed budową NOWEJ strony** zrobić klastrowanie SERP (≥ 40% wspólnego TOP 10) dla jej fraz głównych.
