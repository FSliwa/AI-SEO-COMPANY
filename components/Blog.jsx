'use client';

import { useTranslations, useLocale } from 'next-intl';
import { postsForLocale } from '@/lib/blogPosts';
import { Link } from '@/i18n/routing';
import { Reveal } from './ScrollReveal';

/**
 * Indeks redakcyjny zamiast osi czasu.
 *
 * Os czasu (kregoslup + naprzemienne strony + pigulki dat) kodowala nastepstwo:
 * "najpierw to, potem tamto". Tresc to `sort(po dacie).slice(0, 3)`, czyli lista
 * rankingowa, nie opowiesc - struktura obiecywala zwiazek, ktorego nie ma.
 * Kosztowala tez 1735 px wysokosci na trzy zajawki przy oknie 1280x800.
 *
 * Teraz: trzy wiersze rozdzielone wloskowymi liniami, CALY wiersz jest linkiem
 * (jeden duzy cel dotykowy zamiast przycisku 135x44 schowanego w karcie).
 * Pomaranczowa kreska stoi tylko przy najnowszym wpisie - to jedyny akcent
 * w sekcji.
 *
 * Czas czytania jest LICZONY z realnej objetosci artykulu (pomiar tekstu na
 * produkcji / 200 slow na minute), nie oszacowany - pola readMinPl/readMinEn
 * w lib/blogPosts.js. Wpis bez tego pola po prostu go nie pokazuje, wiec
 * dodanie artykulu bez pomiaru niczego nie psuje.
 */
/**
 * Polska odmiana rzeczownika po liczebniku. 1 -> wpis, 2-4 -> wpisy,
 * 5-21 i koncowki 0/1/5-9 -> wpisow. Wyjatek na nastkach: 12, 13, 14 ida
 * do "wpisow", mimo ze koncza sie na 2-4.
 */
function wpisy(n) {
  if (n === 1) return 'wpis';
  const dziesiatki = n % 100;
  const jednosci = n % 10;
  if (jednosci >= 2 && jednosci <= 4 && !(dziesiatki >= 12 && dziesiatki <= 14)) return 'wpisy';
  return 'wpisów';
}

export default function Blog() {
  const lang = useLocale();
  const t = useTranslations('blog');

  const wszystkie = postsForLocale(lang);
  const posts = [...wszystkie]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)
    .map((p) => ({
      date: lang === 'pl' ? p.displayDatePl : p.displayDateEn,
      title: lang === 'pl' ? p.titlePl : p.titleEn,
      desc: lang === 'pl' ? p.descPl : p.descEn,
      czas: lang === 'pl' ? p.readMinPl : p.readMinEn,
      slug: p.slug
    }));

  return (
    <section className="blog" id="blog">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
            <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
          </div>
          <h2>{t('title')}</h2>
          <p>{t('subtitle')}</p>
        </Reveal>

        {/* Jeden Reveal na calosc, nie stagger na kazdy wiersz: osobne wejscia
            na kazdym elemencie listy to najczestszy wzorzec generowanych stron
            i rozbijaja czytanie indeksu na trzy osobne zdarzenia. */}
        <Reveal className="blog-index" delay={0.15}>
          {posts.map((post, idx) => (
            <Link
              key={post.slug}
              href={post.slug}
              className={`blog-index-row${idx === 0 ? ' blog-index-row--latest' : ''}`}
            >
              {/* Tytul wpisu to <h3> pod <h2> sekcji - tak jak na produkcji.
                  Pierwsza wersja indeksu zamienila go na <span>, co zabralo
                  stronie glownej trzy naglowki (przeglad 05.10.2026). <a> moze
                  zawierac tresc blokowa, wiec caly wiersz zostaje jednym linkiem. */}
              <div className="blog-index-main">
                <h3 className="blog-index-title">{post.title}</h3>
                <span className="blog-index-standfirst">{post.desc}</span>
              </div>
              <span className="blog-index-meta">
                {post.czas ? (
                  <span className="blog-index-time">
                    {post.czas} min
                    <span className="sr-only"> {lang === 'pl' ? 'czytania' : 'read'}</span>
                  </span>
                ) : null}
                <span className="blog-index-date">{post.date}</span>
              </span>
            </Link>
          ))}
        </Reveal>

        <div className="blog-index-footer">
          <Link href="/blog" className="btn btn-primary">
            {lang === 'pl'
              ? `Zobacz wszystkie ${wszystkie.length} ${wpisy(wszystkie.length)}`
              : `See all ${wszystkie.length} article${wszystkie.length === 1 ? '' : 's'}`}
          </Link>
        </div>
      </div>
    </section>
  );
}
