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
| `--w-pomarancz` | `#D85A30` | akcent marki: przyciski, kropki, ikony, linie wykresów, duże liczby |
| `--w-pomarancz-hover` | `#E8794F` | najechanie na przycisk główny (jaśniej, kontrast tekstu rośnie) |
| `--w-pomarancz-tekst` | `#B8441E` | mały tekst w kolorze akcentu na papierze: etykiety, linki (5,1:1) |
| `--w-pomarancz-gleboki` | `#9C3A17` | liczby i numeracja na papierze (zastępuje `#3317B1`) |
| `--w-brzoskwinia` | `#F3B79C` | akcent na granacie: etykiety, ikony, obrysy (zastępuje `#C3A4F0`) |
| `--w-brzoskwinia-tlo` | `#FBE6DA` | jasne wypełnienia: aktywna zakładka, wyróżniony przycisk (zastępuje `#EBDDF9`) |
| `--w-wzrost` | `#047857` | wyłącznie wzrost w danych |

Przycisk główny: tło `--w-pomarancz`, tekst `#14110F` (4,9:1). Biały tekst na
`#D85A30` ma 3,9:1 i nie przechodzi AA, dlatego makietowy „ciemny tekst na
jasnym akcencie” zostaje.

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

- Hero: antena na szczycie (`/images/wyglad/hero-antena.webp`), pasmo chmur
  i gór pod ofertą (`gory-oferta.webp`), przejście w noc (`gory-noc.webp`).
- Ilustracje kreskowe oferty (`oferta-*.webp`), antena kreskowa w kontakcie
  (`antena-linie.webp`), poziomice w cenniku i FAQ (`kontury-*.webp`).
- Ikony: obrysowe, 1,5 px, kolor akcentu. Bez emoji jako ikon.
- Sceny Spline zniknęły ze strony głównej (dekoracja, 4,9 MB + runtime);
  komponenty zostają w repo.
