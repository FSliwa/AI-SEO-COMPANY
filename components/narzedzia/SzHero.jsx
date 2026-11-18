// Hero stron szablonów (12.11.2026): etykieta, H1, dowolne dzieci (byline, odpowiedź, przycisk)
// po lewej i makieta dokumentu z pierwszej strony PDF po prawej (dekoracja, aria-hidden).
// Obraz: public/images/narzedzia/szablony/<slug>-<pl|en>.webp (600x850, render 1. strony PDF).
import Image from 'next/image';
import './szablony.css';

export default function SzHero({ tag, h1, slug, locale = 'pl', children }) {
  const src = `/images/narzedzia/szablony/${slug}-${locale === 'en' || locale === 'de' ? locale : 'pl'}.webp`;
  return (
    <section className="sz-hero" data-petla="">
      <div className="sz-tlo" aria-hidden="true" />
      <div className="sz-hero__siatka">
        <div className="sz-hero__tekst">
          <div className="section-tag sz-tag">
            <span className="asterisk">✳</span> {tag}
          </div>
          <h1 className="sz-h1">{h1}</h1>
          {children}
        </div>
        <div className="sz-podglad" aria-hidden="true">
          <span className="sz-podglad__siatka" />
          <span className="sz-arkusz sz-arkusz--tyl2" />
          <span className="sz-arkusz sz-arkusz--tyl" />
          <span className="sz-arkusz sz-arkusz--przod">
            <Image src={src} alt="" width={600} height={850} sizes="(min-width: 1100px) 400px, 62vw" />
          </span>
        </div>
      </div>
    </section>
  );
}
