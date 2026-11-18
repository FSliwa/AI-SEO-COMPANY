'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';

// Zdarzenia GA4, których nie da się zebrać pomiarem rozszerzonym: wszystkie CTA
// prowadzą kotwicą do tej samej sekcji kontaktowej (bez page_view), a linki
// tel:/mailto: nie są dla GA4 „wychodzące". Jeden nasłuch na dokumencie zamiast
// onClick w dziesięciu komponentach – dzięki temu nowy przycisk jest mierzony
// automatycznie, a data-cta tylko nadaje mu czytelną nazwę.
//
// Zdarzenia:
//   cta_click            {cta_location, cta_text, page_path}  (+ link_url dla BlogCTA klastra)
//   pricing_plan_click   {plan, cta_location, page_path}  + ustawia pakiet w formularzu
//   phone_click          {link_location, link_url, page_path}
//   page_view            {page_location (origin + pathname, bez query), page_title}  (tylko nawigacja kliencka)
//   email_click          {link_location, link_url, page_path}
//   view_contact_section {section_id, page_path}   (raz na odsłonę strony)
//   view_pricing         {section_id, page_path}   (raz na odsłonę strony)
//   outbound_click / panel_click {link_domain, link_url (bez query), cta_location, page_path}

const CONTACT_IDS = ['kontakt', 'contact'];
const PRICING_IDS = ['cennik', 'pricing'];

function locationOf(el) {
  const tagged = el.closest('[data-cta]');
  if (tagged && tagged.dataset.cta) return tagged.dataset.cta;
  const landmark = el.closest('section[id], aside[id], footer, header, nav');
  if (landmark && landmark.id) return landmark.id;
  if (landmark) return landmark.tagName.toLowerCase();
  if (el.closest('article')) return 'article';
  return 'unknown';
}

export default function AnalyticsEvents() {
  const pathname = usePathname();

  // 18.11.2026 (audyt B1, para do przełączenia konta): jedno page_view na zmianę trasy po stronie klienta.
  // Pierwsze wejście pomija: początkowe page_view wysyła gtag('config') z layoutu. Zależność tylko od
  // pathname, więc history.replaceState z samym ?query (narzędzia: zapiszParametry) niczego nie wysyła.
  // Adres bez query (origin + pathname); tytuł z document.title po chwili, bo Next podmienia go po commicie.
  const poprzedniaSciezka = useRef(null);
  useEffect(() => {
    if (poprzedniaSciezka.current === null) {
      poprzedniaSciezka.current = pathname;
      return undefined;
    }
    if (poprzedniaSciezka.current === pathname) return undefined;
    poprzedniaSciezka.current = pathname;
    const t = setTimeout(() => {
      track('page_view', {
        page_location: `${window.location.origin}${window.location.pathname}`,
        page_title: document.title,
      });
    }, 100);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    const onClick = (e) => {
      const target = e.target;
      const a = target && typeof target.closest === 'function' ? target.closest('a[href]') : null;
      if (!a) return;
      const href = a.getAttribute('href') || '';
      const pagePath = window.location.pathname;
      const location = locationOf(a);

      if (href.startsWith('tel:')) {
        track('phone_click', { link_location: location, link_url: href, page_path: pagePath });
        return;
      }
      if (href.startsWith('mailto:')) {
        track('email_click', { link_location: location, link_url: href, page_path: pagePath });
        return;
      }

      // 18.11.2026 (audyt S-38, S-39): linki wychodzące i do panelu klienta. Bez doklejania parametrów
      // do linków (pomiar nie zmienia linków SEO); link_url bez query. Wewnętrzne adresy absolutne
      // (ten sam host) idą dalej.
      if (/^https?:\/\//.test(href)) {
        let u = null;
        try { u = new URL(href); } catch { u = null; }
        if (u && u.host !== window.location.host) {
          track(u.host === 'panel.ai-seo-company.pl' ? 'panel_click' : 'outbound_click', {
            link_domain: u.host,
            link_url: href.split('?')[0],
            cta_location: location,
            page_path: pagePath,
          });
          return;
        }
      }

      const text = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);

      // BC1 (5.11.2026, CS-04 z korektą): BlogCTA klastra linkuje do strony usługi
      // (data-cta="blog_cta_<klaster>"), a nie do #kontakt, więc warunek kotwicy kontaktu
      // niżej zgubiłby to kliknięcie. Linki wewnętrzne z tym znacznikiem mierzymy tutaj,
      // z link_url (cel zależy od bramki publikacji, np. hub GEO -> A5). Przycisk bez
      // klastra (data-cta="blog_cta_kontakt", href="#kontakt") idzie dalej starą ścieżką.
      if (href.startsWith('/') && a.closest('[data-cta^="blog_cta_"]')) {
        track('cta_click', { cta_location: location, cta_text: text, page_path: pagePath, link_url: href });
        return;
      }

      const hashIndex = href.indexOf('#');
      const fragment = hashIndex >= 0 ? href.slice(hashIndex + 1) : '';
      if (!CONTACT_IDS.includes(fragment)) return;

      const plan = a.dataset.plan;
      if (plan) {
        track('pricing_plan_click', { plan, cta_location: location, page_path: pagePath });
        window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
        return;
      }
      track('cta_click', { cta_location: location, cta_text: text, page_path: pagePath });
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined' || typeof IntersectionObserver === 'undefined') return undefined;
    const sent = new Set();
    let observer = null;

    // Sekcje renderują się chwilę po zmianie trasy; krótkie opóźnienie zamiast
    // MutationObservera wystarcza, bo obie są statyczne w drzewie strony.
    const timer = setTimeout(() => {
      const targets = [];
      for (const id of CONTACT_IDS) {
        const el = document.getElementById(id);
        if (el) targets.push([el, 'view_contact_section']);
      }
      for (const id of PRICING_IDS) {
        const el = document.getElementById(id);
        if (el) targets.push([el, 'view_pricing']);
      }
      if (!targets.length) return;

      const eventFor = new Map(targets);
      observer = new IntersectionObserver((entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const name = eventFor.get(entry.target);
          if (!name || sent.has(name)) continue;
          sent.add(name);
          track(name, { section_id: entry.target.id, page_path: window.location.pathname });
          observer.unobserve(entry.target);
        }
      }, { threshold: 0.25 });
      targets.forEach(([el]) => observer.observe(el));
    }, 600);

    return () => {
      clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  return null;
}
