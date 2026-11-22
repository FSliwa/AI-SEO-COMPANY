'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { tr } from '@/lib/shellDe';
import { maWersjeDe, STRONY_DE } from '@/lib/stronyDe';
import NextLink from 'next/link';
import { Link, usePathname, useRouter, getPathname } from '@/i18n/routing';
import { hash, homeHash, sectionId, przejdzDoSekcji } from '@/lib/anchors';
import { tylkoPl, celPrzelacznikaEn } from '@/lib/plOnly';
import { blogPosts, isPostAvailableIn } from '@/lib/blogPosts';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { track } from '@/lib/track';
import { GODZINY_TEKST } from '@/lib/godziny';
import { BIURO, SIEDZIBA, ETYKIETY, REJESTR, adresLinia } from '@/lib/firma';

// A3b/BL-02 (PLAN-v2 6.17): tylko te strony nie mają sekcji kontaktu; tam CTA prowadzi wprost na formularz strony głównej.
// Wszystkie trasy /narzedzia i /narzedzia/* poza /narzedzia/raport-seo (SzablonRaport renderuje <Contact />) nie mają formularza.
const bezFormularza = (s) => s === '/regulamin' || s === '/cookies' || s === '/impressum' || s === '/narzedzia' || (typeof s === 'string' && s.startsWith('/narzedzia/') && s !== '/narzedzia/raport-seo');

export default function Footer() {
  const lang = useLocale();
  const navT = useTranslations('nav');
  const t = useTranslations('footer');
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  // Jak w Header.jsx: na trasach dynamicznych pathname to szablon ('/narzedzia/[slug]').
  const sciezka = pathname && pathname.includes('[')
    ? pathname.replace(/\[(?:\.\.\.)?([^\]]+)\]/g, (_, klucz) => {
      const v = params?.[klucz];
      return Array.isArray(v) ? v.join('/') : String(v ?? '');
    })
    : pathname;
  const stopkaRef = useRef(null);
  // Link w stopce tylko do strony, która istnieje w tym języku (tylko-PL: lib/plOnly.js) i jest
  // opublikowana (lib/publikacja.js); inaczej null = brak pozycji (bez linku do 404).
  // DE: tylko strony z niemieckim odpowiednikiem (lib/stronyDe.js); naDe() dla stałych pozycji.
  const deTylko = lang === 'de' && (STRONY_DE[sciezka]?.tylkoDe === true || !STRONY_DE[sciezka]);
  const naDe = (href) => lang !== 'de' || maWersjeDe(href);
  const hrefStopki = (href) => (lang === 'de' ? (maWersjeDe(href) ? href : null) : ((lang === 'pl' || !tylkoPl(href)) ? hrefJesliOpublikowana(href) : null));
  const hrefSprawdzarki = hrefStopki('/sprawdz-widocznosc-w-ai');
  const hrefZmianyAgencji = hrefStopki('/zmiana-agencji-seo');
  const hrefPorownan = hrefStopki('/porownania');
  const hrefNarzedzi = hrefStopki('/narzedzia');
  const hrefWizytowki = hrefStopki('/pozycjonowanie-wizytowki-google');
  const hrefCopywritingu = hrefStopki('/copywriting-seo');
  const hrefLinkBuildingu = hrefStopki('/link-building');
  const hrefWordpress = hrefStopki('/pozycjonowanie-wordpress');
  const hrefWebflow = hrefStopki('/pozycjonowanie-webflow');
  const hrefMazowsze = hrefStopki('/pozycjonowanie-stron-mazowsze');
  const drugiJezyk = lang === 'pl' ? 'en' : 'pl';

  // Plywajacy przycisk na telefonie i tablecie pokazuje sie dopiero po
  // przewinieciu pierwszego ekranu: stojac od poczatku w prawym dolnym rogu
  // zaslanial H1 hero (360x640, 375x667) i naglowki podstron. Sama widocznosc
  // jest w CSS (@media max-width: 900px) - tu tylko klasa po przekroczeniu
  // progu. Bez JS przycisk przywraca blok <noscript> nizej, a na szerokich
  // oknach regula w ogole nie obowiazuje.
  const [poPierwszymEkranie, setPoPierwszymEkranie] = useState(false);
  useEffect(() => {
    const sprawdz = () => setPoPierwszymEkranie(window.scrollY > window.innerHeight * 0.6);
    sprawdz();
    window.addEventListener('scroll', sprawdz, { passive: true });
    window.addEventListener('resize', sprawdz);
    return () => {
      window.removeEventListener('scroll', sprawdz);
      window.removeEventListener('resize', sprawdz);
    };
  }, []);

  // Plywajacy przycisk stal nad formularzem kontaktu w trakcie wypelniania
  // (05.10.2026). Pomiar co 2 px przez caly formularz: przy 390 nachodzil na
  // kontrolki w 287 z 809 pozycji (przycisk wysylki, pola, lista - do
  // 131x44 px) i przechwytywal stukniecie w prawa czesc przycisku wysylki;
  // przy 1440 zaslanial 25 px kontrolek. Gdy sekcja kontaktu, do ktorej
  // prowadzi, albo stopka pod nia jest na ekranie, przycisk dostaje klase
  // is-nad-formularzem i chowa sie w CSS (na kazdej szerokosci; z fokusem
  // zostaje widoczny). Na stronach bez formularza nic sie nie zmienia.
  // pathname w zaleznosciach: przy nawigacji bez przeladowania obserwator
  // szuka sekcji na nowej stronie.
  //
  // 22.10.2026: przycisk chowa sie tez, gdy na ekranie jest sekcja cennika
  // albo inne wezwanie do formularza lub telefonu w tresci (hero landingu,
  // "Wybierz" w kartach pakietow, CTA artykulu). Zrzuty 390x844 z produkcji:
  // stal na opisie karty "SEO Standard" na /cennik-pozycjonowania. Dubel nic
  // nie wnosi, gdy wlasciwy przycisk jest w widoku. Naglowek, menu i baner
  // zgody sa pomijane - sa na ekranie zawsze, wiec przycisk nie pokazalby
  // sie nigdy.
  const [nadFormularzem, setNadFormularzem] = useState(false);
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return;
    const kontakt = document.getElementById(sectionId('kontakt', lang));
    const cennik = document.getElementById(sectionId('cennik', lang));
    const ctaWTresci = Array.from(
      document.querySelectorAll('a[href*="#kontakt"], a[href*="#contact"], a[href^="tel:"]')
    ).filter((a) => !a.classList.contains('kota-floating-cta') && !a.closest('header, nav, footer, .cookie-banner'));
    // W02 (18.11): przycisk nie zaslania miniatur portfolio, wynikow, cennika ani paska kalkulatora
    const sekcjeTresci = Array.from(document.querySelectorAll('.portfolio, .results, .pricing, .kalk-akcja'));
    const cele = [kontakt, cennik, stopkaRef.current, ...ctaWTresci, ...sekcjeTresci].filter(Boolean);
    if (!cele.length) return;
    const widoczne = new Set();
    const obserwator = new IntersectionObserver((wpisy) => {
      for (const wpis of wpisy) {
        if (wpis.isIntersecting) widoczne.add(wpis.target);
        else widoczne.delete(wpis.target);
      }
      setNadFormularzem(widoczne.size > 0);
    }, { threshold: 0 });
    cele.forEach((cel) => obserwator.observe(cel));
    return () => {
      obserwator.disconnect();
      setNadFormularzem(false);
    };
  }, [lang, pathname]);

  return (
    <>
      {/* KOTA Sticky / Floating Action Pill Button (Bottom Right) */}
      <noscript>
        <style>{`.kota-floating-cta{opacity:1!important;visibility:visible!important;transform:none!important;pointer-events:auto!important}`}</style>
      </noscript>
      {/* onClick: na stronach bez sekcji kontaktu (regulamin, cookies)
          przycisk zmienial tylko adres na #kontakt - teraz przenosi na strone
          glowna do formularza (05.10.2026). 5.11.2026 (A3b/BL-02): na tych
          stronach takze href prowadzi wprost do formularza strony glownej. */}
      <a
        href={bezFormularza(sciezka) ? (lang === 'de' ? '/de#kontakt' : lang === 'pl' ? '/#kontakt' : '/en#contact') : hash('kontakt', lang)}
        onClick={(e) => przejdzDoSekcji(e, 'kontakt', lang, router)}
        className={`kota-floating-cta${poPierwszymEkranie ? ' is-visible' : ''}${nadFormularzem ? ' is-nad-formularzem' : ''}`}
        data-cta="floating"
      >
        {tr(lang, 'Wyceń projekt →', 'Start your project →')}
      </a>

      <footer className="footer" ref={stopkaRef}>
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link href="/" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
                AI SEO COMPANY
              </Link>
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: 'rgba(255,255,255,0.72)' }}>
                {t('desc')}
              </p>
              <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginTop: '1rem', lineHeight: '1.5' }}>
                <p style={{ margin: 0 }}><strong>AI SEO COMPANY</strong> {tr(lang, 'to marka należąca do:', 'is a brand of:')}</p>
                {/* Art. 300(5) KSH: a prosta spółka akcyjna must state its firm,
                    registered office and address, the registry court and KRS
                    number, NIP, and the amount of share capital (kapitał akcyjny). */}
                <p style={{ margin: 0 }}>AI SIGNALS COMPANY Prosta Spółka Akcyjna</p>
                <p style={{ margin: 0 }}>{ETYKIETY.siedziba[lang]}: {adresLinia(SIEDZIBA, lang)}</p>
                <p style={{ margin: 0 }}>
                  {lang === 'de'
                    ? 'Amtsgericht für die Hauptstadt Warschau, XII. Wirtschaftsabteilung des KRS'
                    : (REJESTR.sad[lang] || REJESTR.sad.en)}
                </p>
                <p style={{ margin: 0 }}>KRS: {REJESTR.krs} · NIP: {REJESTR.nip} · REGON: {REJESTR.regon}</p>
                <p style={{ margin: 0 }}>
                  {lang === 'de' ? 'Aktienkapital:' : tr(lang, 'Kapitał akcyjny:', 'Share capital:')}{' '}
                  {REJESTR.kapital[lang] || REJESTR.kapital.en}
                </p>
                <p style={{ margin: 0 }}>{tr(lang, 'Godziny otwarcia:', 'Opening hours:')} {GODZINY_TEKST[lang]}</p>
              </div>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{tr(lang, 'Nawigacja', 'Navigation')}</p>
              <ul className="footer-links">
                <li><Link href="/o-nas">{tr(lang, 'O nas (E-E-A-T)', 'About Us')}</Link></li>
                <li><Link href="/pozycjonowanie-stron-internetowych">{tr(lang, 'Pozycjonowanie stron', 'SEO Services')}</Link></li>
                <li><Link href="/audyt-seo">{tr(lang, 'Audyt SEO', 'SEO Audit')}</Link></li>
                <li><Link href="/cennik-pozycjonowania">{navT('pricing')}</Link></li>
                {naDe('/blog') && <li><Link href="/blog">{lang === 'pl' ? 'Blog SEO' : 'SEO Blog'}</Link></li>}
                {/* 4.11.2026 (etap 0 planu z filmu): /panel-klienta, sprawdzarka i poradnik
                    o zmianie agencji mialy 1-2 linki wewnetrzne. Sprawdzarka i poradnik
                    istnieja tylko po polsku (EN = 404), wiec w EN ich nie linkujemy.
                    5.11.2026: lista stron tylko-PL z lib/plOnly.js, nowe strony PLAN-v2
                    (Porownania 6.1, Narzedzia 6.9) dopiero po publikacji (lib/publikacja.js). */}
                {naDe('/panel-klienta') && <li><Link href="/panel-klienta">{tr(lang, 'Panel klienta', 'Client Portal')}</Link></li>}
                {hrefSprawdzarki && <li><Link href={hrefSprawdzarki}>{tr(lang, 'Sprawdź widoczność w AI', 'AI visibility check')}</Link></li>}
                {hrefZmianyAgencji && <li><Link href={hrefZmianyAgencji}>{tr(lang, 'Zmiana agencji SEO', 'Switching SEO agencies')}</Link></li>}
                {hrefPorownan && <li><Link href={hrefPorownan}>{tr(lang, 'Porównania', 'Comparisons')}</Link></li>}
                {hrefNarzedzi && <li><Link href={hrefNarzedzi}>{tr(lang, 'Narzędzia', 'Free tools')}</Link></li>}
                {/* T1b (SA-05): stały link do drugiej wersji językowej - sekcja EN osiągalna z linków.
                    next/link z gotowym adresem ('/' albo '/en'): Link z next-intl z propem locale
                    dawał '/pl' (308). */}
                {lang === 'de' ? (() => {
                  const postDe = blogPosts.find((p) => p.slug === sciezka);
                  const celPl = deTylko ? '/' : (postDe ? (isPostAvailableIn(postDe, 'pl') ? sciezka : '/blog') : sciezka);
                  const celEn = deTylko ? '/' : (postDe ? (isPostAvailableIn(postDe, 'en') ? sciezka : '/blog') : (tylkoPl(sciezka) ? celPrzelacznikaEn(sciezka) : sciezka));
                  return (
                    <>
                      <li>
                        <NextLink href={getPathname({ href: celPl, locale: 'pl' })} hrefLang="pl" lang="pl" prefetch={false} onClick={() => track('language_switch', { from: lang, to: 'pl', page_path: pathname })}>Wersja polska</NextLink>
                      </li>
                      <li>
                        <NextLink href={getPathname({ href: celEn, locale: 'en' })} hrefLang="en" lang="en" prefetch={false} onClick={() => track('language_switch', { from: lang, to: 'en', page_path: pathname })}>English version</NextLink>
                      </li>
                    </>
                  );
                })() : (
                <li>
                  <NextLink
                    href={getPathname({ href: '/', locale: drugiJezyk })}
                    hrefLang={drugiJezyk}
                    lang={drugiJezyk}
                    prefetch={false}
                    onClick={() => track('language_switch', { from: lang, to: drugiJezyk, page_path: pathname })}
                  >
                    {tr(lang, 'English version', 'Wersja polska')}
                  </NextLink>
                </li>
                )}
                {/* Wersja niemiecka: link tylko na stronach z niemieckim odpowiednikiem (lib/stronyDe.js), do tego odpowiednika
                    (jak wpis DE w przełączniku języka w nagłówku); pozostałe strony PL/EN bez zmian. */}
                {lang !== 'de' && maWersjeDe(sciezka) && (
                  <li>
                    <NextLink href={getPathname({ href: sciezka, locale: 'de' })} hrefLang="de" lang="de" prefetch={false} onClick={() => track('language_switch', { from: lang, to: 'de', page_path: pathname })}>Deutsche Version</NextLink>
                  </li>
                )}
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'de' ? 'SEO Leistungen' : tr(lang, 'Usługi SEO', 'SEO Services')}</p>
              <ul className="footer-links">
                <li><Link href="/pozycjonowanie-stron-internetowych">{tr(lang, 'Pozycjonowanie stron WWW', 'Website SEO')}</Link></li>
                <li><Link href="/audyt-seo">{tr(lang, 'Audyt SEO i analiza', 'SEO Audit & Analysis')}</Link></li>
                {naDe('/projektowanie-stron-internetowych') && <li><Link href="/projektowanie-stron-internetowych">{tr(lang, 'Projektowanie stron WWW', 'Web Design')}</Link></li>}
                {naDe('/seo-lokalne-warszawa') && <li><Link href="/seo-lokalne-warszawa">{tr(lang, 'SEO Lokalne Warszawa', 'Local SEO Warsaw')}</Link></li>}
                {/* L1 (PLAN-v2 6.6): tylko PL i dopiero po publikacji partii 2. */}
                {hrefWizytowki && <li><Link href={hrefWizytowki}>{tr(lang, 'Pozycjonowanie wizytówki Google', 'Google Business Profile')}</Link></li>}
                {hrefCopywritingu && <li><Link href={hrefCopywritingu}>{tr(lang, 'Copywriting SEO', 'SEO Copywriting')}</Link></li>}
                {hrefLinkBuildingu && <li><Link href={hrefLinkBuildingu}>{tr(lang, 'Link building', 'Link Building')}</Link></li>}
                {hrefWordpress && <li><Link href={hrefWordpress}>{tr(lang, 'Pozycjonowanie WordPress', 'WordPress SEO')}</Link></li>}
                {hrefWebflow && <li><Link href={hrefWebflow}>{tr(lang, 'Pozycjonowanie Webflow', 'Webflow SEO')}</Link></li>}
                {hrefMazowsze && <li><Link href={hrefMazowsze}>{tr(lang, 'Pozycjonowanie Mazowsze', 'Local SEO Mazovia')}</Link></li>}
                <li><Link href="/pozycjonowanie-w-ai">{tr(lang, 'Pozycjonowanie w AI', 'AI Search Optimization')}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{tr(lang, 'Kontakt', 'Contact')}</p>
              <ul className="footer-links">
                <li><a href="tel:+48518815055" data-cta="footer">{lang === 'de' ? '+48 518 815 055' : '518 815 055'}</a></li>
                <li><a href="mailto:kontakt@ai-seo-company.pl" data-cta="footer">kontakt@ai-seo-company.pl</a></li>
                <li>{ETYKIETY.biuro[lang]}: {adresLinia(BIURO, lang)}</li>
                <li><Link href={homeHash('kontakt', lang)} data-cta="footer">{tr(lang, 'Formularz Wyceny', 'Get Proposal Form')}</Link></li>
                <li><Link href="/cookies">{tr(lang, 'Polityka Prywatności', 'Privacy Policy')}</Link></li>
                <li><Link href="/regulamin">{tr(lang, 'Regulamin', 'Terms of Service')}</Link></li>
                {lang === 'de' && <li><Link href="/impressum">Impressum</Link></li>}
                {/* 22.10.2026: stale wejscie do ustawien zgody. Plywajaca
                    pigulka "Zgoda" jest na telefonie i tablecie ukryta (zaslaniala
                    cene na landingu Ads i przycisk wysylki formularza), wiec
                    zmiana albo wycofanie zgody musi byc dostepne gdzie indziej
                    - na kazdej stronie, tak samo latwo jak jej udzielenie. */}
                <li>
                  <button
                    type="button"
                    className="footer-link-btn"
                    onClick={() => window.dispatchEvent(new CustomEvent('aiseo:ustawienia-zgody'))}
                  >
                    {tr(lang, 'Ustawienia cookies', 'Cookie settings')}
                  </button>
                </li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>{t('rights')}</p>
          </div>
        </div>
      </footer>
    </>
  );
}
