# DESIGN.md — AI SEO COMPANY (wygląd z makiety „Desktop - 2”, 6.11.2026)

Źródło: makieta `Desktop - 2.svg` (1440 × 7138). Fiolety makiety zastąpione
pomarańczem marki `#D85A30`, który był już na stronie. Treść, sekcje i podstrony
bez zmian — zmienia się tylko wygląd. Tokeny w `app/wyglad.css` (`:root`),
strony używają nazw, nie surowych wartości.

## Kolor

| Token | Wartość | Rola |
|---|---|---|
| `--w-papier` | `#FDF9F4` | tło strony (makieta: `#FDF9F4`) |
| `--w-papier-2` | `#F6EFE6` | tło drugorzędne, pola formularza |
| `--w-karta` | `#FFFCF8` | karty na papierze i na granacie |
| `--w-tusz` | `#1E1E1E` | tekst główny, nagłówki (15,9:1 na papierze) |
| `--w-tusz-2` | `#5E554D` | tekst drugorzędny (6,9:1 na papierze) |
| `--w-linia` | `rgba(30,30,30,.12)` | obramowania, separatory |
| `--w-noc` | `#0A1337` | ciemne sekcje: panel, cennik, kontakt (dół grafiki gór) |
| `--w-noc-2` | `#0B0E26` | stopka |
| `--w-pomarancz` | `#D85A30` | jedyny pomarańcz marki (jak `--color-cta` na produkcji): przyciski, etykiety, linki, liczby, ikony, kropki, linie |
| `--w-pomarancz-hover` | `#C24A22` | najechanie na przycisk główny (jak na produkcji) |
| `--w-pomarancz-tekst`, `--w-pomarancz-gleboki` | `#D85A30` | aliasy tego samego koloru (od 7.11.2026; wcześniej ciemniejsze odcienie) |
| `--w-brzoskwinia` | `#F3B79C` | tylko zaznaczenie tekstu i delikatne wypełnienia |
| `--w-brzoskwinia-tlo` | `#FBE6DA` | jasne wypełnienia: aktywna zakładka, wyróżniony przycisk (zastępuje `#EBDDF9`) |
| `--w-wzrost` | `#047857` | wyłącznie wzrost w danych |

Przycisk główny: tło `#D85A30`, biały tekst, najechanie `#C24A22` — tak jak na
produkcji (decyzja właściciela 7.11.2026). Uwaga: biały na `#D85A30` ma 3,9:1,
a mały tekst w `#D85A30` na papierze 3,7:1 (próg AA dla zwykłego tekstu to 4,5:1).
Na granacie `#D85A30` ma 4,7:1.

Mapowanie fioletów makiety: `#C3A4F0`, `#B085E5` → brzoskwinia / pomarańcz,
`#9E65E2`, `#8050BA` → pomarańcz, `#3317B1`, `#3C108C` → pomarańcz głęboki,
`#13173D` → noc. Grafiki makiety przebarwione skryptem: fiolet w jasnych partiach
→ ciepły odcień 20°, w cieniach → granat 228° (wariant „alpen”), linie → pomarańcz.

## Typografia

- **Geist** (nagłówki i tekst), **Geist Mono** (etykiety sekcji, numeracja).
  Oba z `next/font/google`, podzbiory `latin` + `latin-ext` (polskie znaki).
- Skala: etykieta 0,8125 rem mono, wersaliki, odstęp 0,14 em · tekst 1 rem /
  1,6 · lead 1,125 rem · H3 1,5 rem · H2 `clamp(2.4rem, 4.4vw, 4rem)` / 1,04 ·
  H1 `clamp(3rem, 6.6vw, 6rem)` / 0,98. Nagłówki 500, odstęp −0,04 em.
- Kropka akcentu po nagłówku sekcji (makieta: „Nasza oferta.”) jako
  dekoracyjny kwadrat `::after` — nie zmienia tekstu w DOM.

## Odstępy i kształt

- Siatka 8 px. Sekcja: `clamp(80px, 10vw, 144px)` góra/dół. Szerokość treści 1300 px.
- Promienie: 12 (pola), 28 (karty), 48 (duże panele FAQ/bloga), pełny (przyciski, pigułki).
- Cienie: brak na papierze (obramowanie zamiast cienia); na granacie jeden
  `0 30px 80px rgba(3,6,20,.45)` pod kartami.

## Komponenty

- **Przyciski**: główny (pomarańcz, ciemny tekst, strzałka ↗/→), drugorzędny
  (obrys 1,5 px tusz/brzoskwinia, przezroczysty), cichy (link z podkreśleniem).
  Fokus: obrys 3 px `--w-pomarancz-tekst` na papierze, `--w-brzoskwinia` na granacie.
- **Etykieta sekcji**: ✳ + tekst mono w pomarańczu.
- **Karty**: `--w-karta`, obramowanie `--w-linia`, promień 28. Karta
  wyróżniona (Booster Pack): obramowanie 1,5 px pomarańcz.
- **Nagłówek strony**: przezroczysty nad hero, ciemny tekst; po przewinięciu
  papier 90 % z rozmyciem.
- **FAQ i blog**: duży panel na papierze (promień 48) na granatowym tle,
  numeracja mono `01 | SEO`.

## Grafika

- Hero strony głównej: 1:1 z produkcji (robot, scena Spline 3D, Inter + Space
  Grotesk tylko w `.hero`) - decyzja właściciela 7.11.2026.
- Pod hero pas z anteną (`components/PasAnteny.jsx`): tło bez czaszy
  (`antena-tlo.webp`, góra przechodzi w czerń hero) i sama czasza
  (`antena-czasza.webp`) obracana w elewacji wokół łożyska (83,08 % / 57,31 %),
  fale z ogniska i pakiety danych po łukach. Dalej pasmo chmur i gór pod ofertą
  (`gory-oferta.webp`, przesunięte o wysokość pasa), przejście w noc (`gory-noc.webp`).
- Ilustracje kreskowe oferty (`oferta-*.webp`), antena kreskowa w kontakcie
  (`antena-linie.webp`), poziomice w cenniku i FAQ (`kontury-*.webp`).
- Ikony: obrysowe, 1,5 px, kolor akcentu. Bez emoji jako ikon.
- Scena Spline w hero zostaje (jak na produkcji); scena w sekcji wyników zdjęta.

## Kursor

Grot i rączka czarne albo białe zależnie od jasności tła pod kursorem
(`components/KursorWgTla.jsx`): kolor tła elementu, piksel obrazka tła
(`data-kursor="obraz"`) albo `<img>`. Ustawia `html[data-kursor-tlo]`.
Bez JS działają stare reguły `.cursor-light`.

## Ruch

Tokeny: `--w-ruch-ease` `cubic-bezier(0.16,1,0.3,1)`, `--w-ruch-krotki` 0,28 s,
`--w-ruch-sredni` 0,6 s, `--w-ruch-dlugi` 1,1 s. Wszystko tylko przy
`prefers-reduced-motion: no-preference`, tylko transform/translate/scale/opacity.

- Hero: linie H1, lead i akapit wjeżdżają od dołu (bez wygaszania — LCP),
  etykieta i przyciski z wygaszeniem, grafika lekko się przybliża, łuki sygnału
  rysują się, kropki pulsują, przerywany łuk „płynie”.
- Chmury: dwie warstwy `chmury.webp` (bezszwowa tekstura) dryfują w przeciwne
  strony nad pasem klientów, mgła w świcie nad „Dlaczego my”.
- Kafelki: najechanie podnosi karty, ilustracje oferty unoszą się, stos panelu
  oddycha (`translateZ`) i rozsuwa się po najechaniu, mozaika realizacji się
  powiększa.
- Wejścia przy przewijaniu: `animation-timeline: view()` z `@supports`
  (ulepszenie; framer-motion `Reveal` zostaje tam, gdzie był).
- Pętle stoją poza ekranem (`components/PetleWidoczne.jsx`, `data-petla`).
- Fale radiowe anteny w kontakcie, dryf poziomic w cenniku.

## Cennik

Etykieta kategorii mono nad nazwą pakietu (`✳ SEO`, `✳ WWW + SEO`, aria-hidden),
nagłówek karty wyśrodkowany, ikony obrysowe przy cechach (`li[data-ikona]`,
maski SVG w `app/wyglad.css`) zamiast znacznika.
