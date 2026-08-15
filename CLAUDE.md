# AI SEO COMPANY — notatki projektowe

Next.js 16 (App Router) + next-intl. Dwa języki: **pl** (domyślny, bez prefiksu w URL)
i **en** (prefiks `/en`). Adresy `/pl/*` nie istnieją — przekierowują 307.

## Checklist publikacji artykułu

Każdy nowy artykuł dokłada dziś ~6 pozycji do crawla Seobility, jeśli pominąć te
punkty. Przechodzić **przed commitem**, nie po.

- [ ] **Tytuł bez sufiksu `| AI SEO COMPANY`** — zjada 17 znaków i wypycha tytuł
      ponad limit 580 px. Docelowo 50–60 znaków.
- [ ] **Meta description ≤ ~150 znaków** (limit 1000 px). Unikalna.
- [ ] **Jeden H1**, hierarchia H2/H3 bez przeskoków (H1 → H3 to błąd).
- [ ] **`<strong>` tylko do wyróżnień znaczeniowych.** Ta sama etykieta pogrubiona
      kilka razy („Pro tip:", „Porada profesjonalisty:") liczy się jako błąd —
      pogrubiać pierwsze wystąpienie, resztę zostawić zwykłym tekstem. Nigdy całe
      zdanie (> 80 znaków).
- [ ] **Alty obrazów opisują obraz**, nie frazy kluczowe. Nazwy plików też.
- [ ] **Wpis w `lib/blogPosts.js`** z `plOnly`/`enOnly`, jeśli artykuł istnieje
      tylko w jednym języku. Bez tego pusta wersja trafia do sitemapy jako strona
      bez treści.
- [ ] **Linki wewnętrzne**: do huba + 2–4 stron powiązanych, w obie strony.
- [ ] **Autor, data, źródła** przy twierdzeniach z liczbami.
- [ ] `npm run build` przechodzi.

## Czego świadomie nie „naprawiamy" w Seobility

Narzędzie zgłasza pozycje, które po sprawdzeniu okazują się jego artefaktami.
Przed reakcją na flagę — zweryfikować u źródła.

- **„Wolne strony"** — Seobility mierzy zimny start funkcji serwerless. Pomiar
  sekwencyjny (3 próby) daje 0,45–0,82 s TTFB. Serwer jest sprawny.
- **„Martwe linki zewnętrzne"** — `g2.com` (403), `ntpm.pl` (Cloudflare),
  `business.adobe.com` (Akamai) blokują crawlery, a odpowiadają 200 dla
  przeglądarki. Nie podmieniać na podstawie tej flagi.
- **„Słowa z H1 poza treścią"** — w większości niedopasowanie form fleksyjnych
  („kroku" przy istniejącym „krok"). Dopisywanie odmian to optymalizacja pod
  narzędzie.
- **Powtarzalne bloki tekstu** — boks autora, CTA i zajawki w kafelkach. Playbook
  wyłącza tę kategorię (5.5, „poza nawigacją/stopką").
- **„Too many headings"** na artykułach 4000+ słów ze spisem treści — kryterium
  playbooka dla długich tekstów jest spełnione.

## Czego nie wolno dopisywać dla punktów

Checker nagradza rzeczy, za które Google obniża widoczność. Punkty brakujące
frazom pod progiem siedzą dziś dokładnie w tej triadzie:

- fraza w `<strong>` bez znaczenia semantycznego,
- fraza w alcie obrazu zamiast opisu obrazu,
- fraza w nazwie pliku obrazu.

To jest wzorzec wyczyszczony z serwisu w `56e08ce`. Nie przywracać.
Nie dopisywać też dat „zaktualizowano" bez realnej aktualizacji treści.

## Model punktacji Keyword Checkera (wyliczony z pomiarów)

**Meta 22% · HTML 66% · Other 12%.** „Other" to obecność słów frazy w nazwie
domeny i w URL-u — dla fraz bez słów `ai`/`seo`/`company` wynosi 0 i wtedy sufit
frazy to **88 punktów**, niezależnie od treści. Checker przyznaje też punkty
cząstkowe za pojedyncze słowa frazy w tytule, nie tylko za przyległy ciąg — to
dlatego skrócenie tytułu potrafi obniżyć całą rodzinę fraz naraz (`a0d9b63` →
korekta w `7880d23`).

## Rytm pracy

Po każdym wdrożeniu: crawl ręczny w Seobility (limit ~1 dziennie) i porównanie
delty „Problems found". Wzrost tydzień do tygodnia to zwykle regresja po deployu.
