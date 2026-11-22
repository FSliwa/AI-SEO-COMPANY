# AI SEO COMPANY — Zasady Ciągłego Uczenia się (Obsidian + Skills + Graphify)

Ten plik obowiązuje bezwarunkowo przy **każdej wiadomości użytkownika** w tym repozytorium (`ai-seo-strona` oraz powiązanym backendzie `/Users/filipsliwa/Projekty/panel-klienta-ai-seo`).

## 0. Żelazna Zasada Potrójnej Weryfikacji (Triple-Check 3x przed podaniem wniosku lub błędu)

Zanim podasz użytkownikowi **jakikolwiek wniosek z kodu, diagnozę błędu, numer linii, regresję lub rekomendację**, MUSISZ zweryfikować go **trzykrotnie (3 niezależne kroki)**. Nigdy nie przepisuj wniosków subagentów (`research`, `self`, `browser`) bez samodzielnego sprawdzenia źródła:

1. **Weryfikacja 1 - Dosłowny odczyt kodu (`read_file`)**: Otwórz wskazany plik i przeczytaj zarówno miejsce deklaracji stanu/zmiennej, jak i dokładne miejsce jej użycia w JSX/TS/CSS (np. nie zakładaj, że `<input>` jest kontrolowany tylko dlatego, że wyżej istnieje `useState` - przeczytaj sam znacznik `<input>`).
2. **Weryfikacja 2 - Ścieżka wykonania i kaskada międzyplikowa**: Prześledź cały przepływ danych lub kaskadę CSS (frontend <-> backend API, flagi bramki w `lib/publikacja.js`, reguły nadrzędne w `wyglad.css`, stany warunkowe `=== 0` / `null`).
3. **Weryfikacja 3 - Próba falsyfikacji / dowód empiryczny**: Spróbuj aktywnie obalić swój wniosek (sprawdź zachowanie w DOM na żywo, wynik testu lub przypadek brzegowy). Jeśli którakolwiek z 3 weryfikacji nie potwierdza błędu - **odrzuć go i nie wpisuj do raportu ani odpowiedzi**.

## 1. Obowiązkowa pętla uczenia się po KAŻDEJ wiadomości (Post-Turn Learning Loop)

Po zrealizowaniu każdego zadania lub odpowiedzi dla użytkownika MUSISZ wykonać poniższe 3 kroki zanim zakończysz pracę (lub tuż po weryfikacji wdrożenia):

1. **Zapisz wnioski i analizę błędów w vaulcie Obsidian (`graphify-out/obsidian/00-Wnioski-i-Bledy/`):**
   - Dopisz nową notatkę sesyjną `RRRR-MM-DD-GGMM-<temat>.md` oraz zaktualizuj mapę treści (MOC) `graphify-out/obsidian/00-Wnioski-i-Bledy/00-Indeks-Wnioskow-i-Bledow.md`.
   - Używaj linków `[[NazwaPlikuLubFunkcji]]` zgodnych z węzłami `graphify` (np. `[[PanelShowcase.jsx]]`, `[[KalkulatorClientDe.jsx]]`, `[[wydanie.mjs]]`, `[[wyglad.css]]`), aby notatki łączyły się z grafem `2 500+` węzłów kodu.
   - Każda notatka musi zawierać: **Co zrobiono**, **Jakie błędy/regresje wykryto (własne lub zastane)**, **Przyczynę źródłową (Root Cause)** oraz **Regułę zapobiegawczą na przyszłość**.
2. **Zaktualizuj lub utwórz Skill (`.agents/skills/<nazwa>/SKILL.md` oraz globalny `~/.gemini/config/skills/`):**
   - Jeśli napotkałeś nowy błąd, regresję UI/CLS, pułapkę Next.js / `next-intl` / `wydanie.mjs`, false-positive w narzędziach SEO lub korektę od użytkownika — **natychmiast dopisz regułę i krok walidacyjny do odpowiedniego pliku `SKILL.md`** w `.agents/skills/` (lub utwórz nowy wyspecjalizowany skill). Nie powtarzaj tego samego błędu w kolejnych wiadomościach.
3. **Aktualizuj graf wiedzy `graphify` przy zmianach architektury i plików:**
   - Przed złożonymi pytaniami o architekturę, linkowanie wewnętrzne lub zależności odpytuj graf (`$(cat graphify-out/.graphify_python) -m graphify query "..."`), a po dodaniu/usunięciu plików odśwież `graphify-out/graph.json` i eksport `graphify export obsidian` (skrypt zachowuje ręczne notatki w `00-Wnioski-i-Bledy/`).

## 2. Twarde niezmienniki techniczne projektu (Zero Regresji)

- **Zero długich myślników (`–` U+2013 oraz `—` U+2014)** w kodzie, tekstach i metadanych — używaj wyłącznie łącznika `-` (wymóg audytów i `kontrola-stronyDe.mjs`).
- **Ochrona fraz i brak kanibalizacji (`CLAUDE.md` + `seo/frazy-*.csv`):**
  - Tytuły `<title>` bez sufiksu `| AI SEO COMPANY` (limit `<= 60` znaków), `meta description <= 155` znaków, dokładnie jeden `<h1>`, hierarchia `H1 -> H2 -> H3` bez przeskoków.
  - Zero prefiksu `/pl/` w linkach wewnętrznych (domyślny język PL działa bez prefiksu).
  - Wszelkie linki zewnętrzne, `sameAs`, wizytówki i odznaki wskazują wyłącznie na `https://www.ai-seo-company.pl/...` (unikamy dwuskokowego przekierowania `http://ai-seo-company.pl` SA-16).
- **Weryfikacja przed i po wdrożeniu:**
  - `npx eslint --max-warnings=0` na zmienionych plikach JS/JSX.
  - `node scripts/kontrola-stronyDe.mjs --publikacja` oraz `npm run test:sitemap` przy zmianach routingu/metadanych.
  - `npm run wydanie` (wymaga czystego commita przed uruchomieniem; jeśli `lib/lastmod.json` się zmieni, zacommituj go przed `git push`).
  - **Test manualny w przeglądarce (`browser` subagent)** na desktopie (`1440x900`) i telefonie (`390x844`) potwierdzający `0` błędów konsoli, brak poziomego overflow i poprawne działanie interakcji.
