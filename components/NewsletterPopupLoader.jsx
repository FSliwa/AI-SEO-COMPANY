'use client';

// Lekki loader popupu z lead magnetem (12.11.2026). Montowany raz w app/[locale]/layout.js, POZA
// <main>: na serwerze i do chwili wyzwolenia renderuje null, więc HTML stron (a z nim odcisk do
// lastmod, scripts/sitemap/odcisk.mjs) się nie zmienia. Kod popupu (components/NewsletterPopup.jsx)
// ładuje się dynamicznym importem dopiero w czasie bezczynności po 10 s albo przy wyzwoleniu,
// więc nie wpływa na LCP ani CLS (okno i pasek są position: fixed / top layer).
//
// Reguły (oferty i strony: lib/popupOferty.js):
// - desktop: exit intent (kursor wychodzi górą okna) albo przewinięcie 60% na wpisach bloga;
// - telefon (< 768 px albo ekran dotykowy bez myszy): wysuwany pasek po 55% przewinięcia, tylko
//   na wpisach bloga;
// - nigdy, gdy ktoś pisze w formularzu albo ma otwarte inne okno (menu nagłówka);
// - nigdy w pierwszych 10 s odsłony, nigdy przy widocznym banerze cookies (ani oknie preferencji),
//   nigdy na stronie 404/noindex; najwyżej raz na odsłonę;
// - po zamknięciu przerwa 14 dni, po wysłaniu formularza nigdy więcej (localStorage, lib/popupOferty.js).

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MIN_CZAS_NA_STRONIE_MS, PROG_TELEFONU_PX, ofertaDlaSciezki, powodWstrzymania } from '@/lib/popupOferty';

const banerWidoczny = () => Boolean(document.querySelector('.cookie-banner') || document.getElementById('cookie-prefs-title'));
const stronaBezIndeksu = () => Boolean(document.querySelector('meta[name="robots"][content*="noindex"]'));
// Weryfikacja 12.11.2026: nie przerywamy komuś, kto coś robi - pisze w formularzu (np. ChecklistForm
// na porównaniach, formularz kontaktu) albo ma otwarte inne okno (menu w nagłówku: role=dialog
// aria-modal, aria-hidden=false gdy otwarte). Wyzwalacz spróbuje ponownie przy następnym zdarzeniu.
function uzytkownikZajety() {
  const a = document.activeElement;
  if (a && (a.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(a.tagName))) return true;
  return Boolean(document.querySelector('dialog[open], [aria-modal="true"]:not([aria-hidden="true"])'));
}

function przewiniecie() {
  const el = document.documentElement;
  const zakres = el.scrollHeight - window.innerHeight;
  return zakres > 0 ? window.scrollY / zakres : 0;
}

export default function NewsletterPopupLoader() {
  const sciezka = usePathname();
  const [popup, setPopup] = useState(null);

  useEffect(() => {
    const oferta = ofertaDlaSciezki(window.location.pathname);
    if (!oferta || powodWstrzymania()) return undefined;
    const mysz = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    // Weryfikacja 12.11.2026: telefon = wąski ekran ALBO urządzenie bez myszy. Wcześniej telefon
    // poziomo (np. 844x390) i tablet dotykowy >= 768 px dostawały modalne okno po 60% przewinięcia,
    // a na 390 px wysokości okno zajmowało cały ekran. Urządzenia dotykowe dostają teraz zawsze pasek.
    const telefon = window.matchMedia(`(max-width: ${PROG_TELEFONU_PX - 1}px)`).matches || !mysz;
    const { exit, scroll, telefon: progTelefonu } = oferta.wyzwalacze;
    const progScrolla = telefon ? progTelefonu : scroll;
    const zExitem = !telefon && exit && mysz;
    if (!zExitem && !progScrolla) return undefined;

    const start = Date.now();
    let aktywny = true;
    let pokazano = false;
    let modul = null;
    let idle = null;
    const zaladuj = () => (modul ??= import('./NewsletterPopup'));

    const pokaz = (powod) => {
      if (!aktywny || pokazano) return;
      if (Date.now() - start < MIN_CZAS_NA_STRONIE_MS) return;
      if (banerWidoczny() || stronaBezIndeksu() || uzytkownikZajety() || powodWstrzymania()) return;
      pokazano = true;
      sprzatnij();
      zaladuj()
        .then((m) => {
          if (aktywny) setPopup({ sciezka, Komponent: m.default, oferta, tryb: telefon ? 'telefon' : 'okno', powod });
        })
        .catch(() => {});
    };

    // Kursor opuszcza dokument (relatedTarget null) przy górnej krawędzi. Próg 20 px zamiast <= 0:
    // przy szybkim ruchu Safari i Firefox potrafią podać ostatnią pozycję jeszcze w oknie.
    const naWyjscie = (e) => {
      if (!e.relatedTarget && e.clientY < 20) pokaz('exit');
    };
    let ramka = 0;
    const naScroll = () => {
      if (ramka) return;
      ramka = window.requestAnimationFrame(() => {
        ramka = 0;
        if (przewiniecie() >= progScrolla) pokaz('scroll');
      });
    };
    // Po 10 s: rozgrzej moduł w czasie bezczynności i sprawdź próg (ktoś mógł przewinąć wcześniej).
    // Ten sam test po decyzji w banerze cookies (baner blokował pokazanie).
    const sprawdzScroll = () => {
      if (progScrolla && przewiniecie() >= progScrolla) pokaz('scroll');
    };
    // Baner znika chwilę po zdarzeniu zgody (stan Reacta), więc sprawdzamy z opóźnieniem.
    let poZgodzie = 0;
    const naZgode = () => {
      window.clearTimeout(poZgodzie);
      poZgodzie = window.setTimeout(sprawdzScroll, 800);
    };
    const zegar = window.setTimeout(() => {
      const rozgrzej = () => zaladuj().catch(() => {});
      idle = 'requestIdleCallback' in window ? window.requestIdleCallback(rozgrzej, { timeout: 5000 }) : window.setTimeout(rozgrzej, 1500);
      sprawdzScroll();
    }, MIN_CZAS_NA_STRONIE_MS);

    function sprzatnij() {
      document.removeEventListener('mouseout', naWyjscie);
      window.removeEventListener('scroll', naScroll);
      window.removeEventListener('aiseo:consent', naZgode);
      window.clearTimeout(poZgodzie);
      if (ramka) window.cancelAnimationFrame(ramka);
    }

    if (zExitem) document.addEventListener('mouseout', naWyjscie);
    if (progScrolla) {
      window.addEventListener('scroll', naScroll, { passive: true });
      window.addEventListener('aiseo:consent', naZgode);
    }
    return () => {
      aktywny = false;
      sprzatnij();
      window.clearTimeout(zegar);
      if (idle != null) ('cancelIdleCallback' in window ? window.cancelIdleCallback(idle) : window.clearTimeout(idle));
    };
  }, [sciezka]);

  // Popup należy do odsłony, na której się pojawił: po nawigacji klienta znika bez zapisu decyzji.
  if (!popup || popup.sciezka !== sciezka) return null;
  const { Komponent, oferta, tryb, powod } = popup;
  return <Komponent oferta={oferta} tryb={tryb} powod={powod} onKoniec={() => setPopup(null)} />;
}
