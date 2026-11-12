// Zrzut przykładowego wyniku narzędzia (S1-poprawki Z-07, agent wspolne, 12.11.2026). <figure> z next/image:
// stałe width/height (bez CLS), WebP/AVIF z optymalizatora Next, lazy pod pierwszym ekranem (domyślnie),
// podpis w <figcaption>. Plik źródłowy: public/narzedzia/<narzędzie>-wynik.webp, szerokość 1200 px, ≤ 150 KB,
// wynik dla ai-seo-company.pl (nasza domena), bez ręcznych poprawek; data w podpisie = data przebiegu.
//   <ZrzutWyniku src="/narzedzia/audyt-seo-wynik.webp" width={1200} height={900} alt="…" podpis="Wynik audytu naszej strony z 12.11.2026." />
// Ten sam obraz do schema: <Uklad schema={{ …, screenshot: { url: src, width, height } }} /> (WebAppSchema).
import Image from 'next/image';
import st from './narzedzia.module.css';
import * as s from './styl';

export default function ZrzutWyniku({ src, alt, width, height, podpis, priorytet = false, sizes = '(max-width: 900px) 100vw, 860px' }) {
  if (!src || !width || !height) return null;
  return (
    <figure className={st.zrzut}>
      <Image src={src} alt={alt} width={width} height={height} sizes={sizes} loading={priorytet ? 'eager' : 'lazy'} {...(priorytet ? { fetchPriority: 'high' } : {})} />
      {podpis ? <figcaption style={s.podpis}>{podpis}</figcaption> : null}
    </figure>
  );
}
