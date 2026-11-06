'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import NextLink from 'next/link';
import { Link, usePathname, useRouter, getPathname } from '@/i18n/routing';
import { hash, homeHash, sectionId, przejdzDoSekcji } from '@/lib/anchors';
import { tylkoPl } from '@/lib/plOnly';
import { hrefJesliOpublikowana } from '@/lib/publikacja';
import { track } from '@/lib/track';

// A3b/BL-02 (PLAN-v2 6.17): tylko te strony nie mają sekcji kontaktu; tam CTA prowadzi wprost na formularz strony głównej.
// pathname z next-intl to klucz routingu, więc /en/terms i /en/cookies też pasują.
// Integracja 5.11.2026: także hub narzędzi i N1 (partia 3; celowo bez <Contact />, grupa narzedzia
// pkt 8) - porównanie ze `sciezka` (szablon z wstawionym slugiem), bo pathname to '/narzedzia/[slug]'.
const BEZ_FORMULARZA = ['/regulamin', '/cookies', '/narzedzia', '/narzedzia/generator-llms-txt'];

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
  const hrefStopki = (href) => ((lang === 'pl' || !tylkoPl(href)) ? hrefJesliOpublikowana(href) : null);
  const hrefSprawdzarki = hrefStopki('/sprawdz-widocznosc-w-ai');
  const hrefZmianyAgencji = hrefStopki('/zmiana-agencji-seo');
  const hrefPorownan = hrefStopki('/porownania');
  const hrefNarzedzi = hrefStopki('/narzedzia');
  const hrefWizytowki = hrefStopki('/pozycjonowanie-wizytowki-google');
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
    const cele = [kontakt, cennik, stopkaRef.current, ...ctaWTresci].filter(Boolean);
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
        href={BEZ_FORMULARZA.includes(sciezka) ? (lang === 'pl' ? '/#kontakt' : '/en#contact') : hash('kontakt', lang)}
        onClick={(e) => przejdzDoSekcji(e, 'kontakt', lang, router)}
        className={`kota-floating-cta${poPierwszymEkranie ? ' is-visible' : ''}${nadFormularzem ? ' is-nad-formularzem' : ''}`}
        data-cta="floating"
      >
        {lang === 'pl' ? 'Wyceń projekt →' : 'Start your project →'}
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
                <p style={{ margin: 0 }}><strong>AI SEO COMPANY</strong> {lang === 'pl' ? 'to marka należąca do:' : 'is a brand of:'}</p>
                {/* Art. 300(5) KSH: a prosta spółka akcyjna must state its firm,
                    registered office and address, the registry court and KRS
                    number, NIP, and the amount of share capital (kapitał akcyjny). */}
                <p style={{ margin: 0 }}>AI SIGNALS COMPANY Prosta Spółka Akcyjna</p>
                <p style={{ margin: 0 }}>ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa</p>
                <p style={{ margin: 0 }}>
                  {lang === 'pl' ? 'Sąd Rejonowy dla m.st. Warszawy w Warszawie' : 'District Court for the Capital City of Warsaw'}
                </p>
                <p style={{ margin: 0 }}>KRS: 0001239983</p>
                <p style={{ margin: 0 }}>NIP: 5253090237</p>
                <p style={{ margin: 0 }}>REGON: 544761611</p>
              </div>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Nawigacja' : 'Navigation'}</p>
              <ul className="footer-links">
                <li><Link href="/o-nas">{lang === 'pl' ? 'O nas (E-E-A-T)' : 'About Us'}</Link></li>
                <li><Link href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron' : 'SEO Services'}</Link></li>
                <li><Link href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO' : 'SEO Audit'}</Link></li>
                <li><Link href="/cennik-pozycjonowania">{navT('pricing')}</Link></li>
                <li><Link href="/blog">{lang === 'en' ? 'SEO Blog' : 'Blog SEO'}</Link></li>
                {/* 4.11.2026 (etap 0 planu z filmu): /panel-klienta, sprawdzarka i poradnik
                    o zmianie agencji mialy 1-2 linki wewnetrzne. Sprawdzarka i poradnik
                    istnieja tylko po polsku (EN = 404), wiec w EN ich nie linkujemy.
                    5.11.2026: lista stron tylko-PL z lib/plOnly.js, nowe strony PLAN-v2
                    (Porownania 6.1, Narzedzia 6.9) dopiero po publikacji (lib/publikacja.js). */}
                <li><Link href="/panel-klienta">{lang === 'pl' ? 'Panel klienta' : 'Client Portal'}</Link></li>
                {hrefSprawdzarki && <li><Link href={hrefSprawdzarki}>Sprawdź widoczność w AI</Link></li>}
                {hrefZmianyAgencji && <li><Link href={hrefZmianyAgencji}>Zmiana agencji SEO</Link></li>}
                {hrefPorownan && <li><Link href={hrefPorownan}>Porównania</Link></li>}
                {hrefNarzedzi && <li><Link href={hrefNarzedzi}>Narzędzia</Link></li>}
                {/* T1b (SA-05): stały link do drugiej wersji językowej - sekcja EN osiągalna z linków.
                    next/link z gotowym adresem ('/' albo '/en'): Link z next-intl z propem locale
                    dawał '/pl' (308). */}
                <li>
                  <NextLink
                    href={getPathname({ href: '/', locale: drugiJezyk })}
                    hrefLang={drugiJezyk}
                    lang={drugiJezyk}
                    prefetch={false}
                    onClick={() => track('language_switch', { from: lang, to: drugiJezyk, page_path: pathname })}
                  >
                    {lang === 'pl' ? 'English version' : 'Wersja polska'}
                  </NextLink>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Usługi SEO' : 'SEO Services'}</p>
              <ul className="footer-links">
                <li><Link href="/pozycjonowanie-stron-internetowych">{lang === 'pl' ? 'Pozycjonowanie stron WWW' : 'Website SEO'}</Link></li>
                <li><Link href="/audyt-seo">{lang === 'pl' ? 'Audyt SEO i analiza' : 'SEO Audit & Analysis'}</Link></li>
                <li><Link href="/projektowanie-stron-internetowych">{lang === 'pl' ? 'Projektowanie stron WWW' : 'Web Design'}</Link></li>
                <li><Link href="/seo-lokalne-warszawa">{lang === 'pl' ? 'SEO Lokalne Warszawa' : 'Local SEO Warsaw'}</Link></li>
                {/* L1 (PLAN-v2 6.6): tylko PL i dopiero po publikacji partii 2. */}
                {hrefWizytowki && <li><Link href={hrefWizytowki}>Pozycjonowanie wizytówki Google</Link></li>}
                <li><Link href="/pozycjonowanie-w-ai">{lang === 'pl' ? 'Pozycjonowanie w AI' : 'AI Search Optimization'}</Link></li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-heading">{lang === 'pl' ? 'Kontakt' : 'Contact'}</p>
              <ul className="footer-links">
                <li><a href="tel:+48518815055" data-cta="footer">518 815 055</a></li>
                <li><a href="mailto:kontakt@ai-seo-company.pl" data-cta="footer">kontakt@ai-seo-company.pl</a></li>
                <li><Link href={homeHash('kontakt', lang)} data-cta="footer">{lang === 'pl' ? 'Formularz Wyceny' : 'Get Proposal Form'}</Link></li>
                <li><Link href="/cookies">{lang === 'pl' ? 'Polityka Prywatności' : 'Privacy Policy'}</Link></li>
                <li><Link href="/regulamin">{lang === 'pl' ? 'Regulamin' : 'Terms of Service'}</Link></li>
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
                    {lang === 'pl' ? 'Ustawienia cookies' : 'Cookie settings'}
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
