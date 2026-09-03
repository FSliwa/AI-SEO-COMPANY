'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';

// Zdarzenia GA4, których nie da się zebrać pomiarem rozszerzonym: wszystkie CTA
// prowadzą kotwicą do tej samej sekcji kontaktowej (bez page_view), a linki
// tel:/mailto: nie są dla GA4 „wychodzące". Jeden nasłuch na dokumencie zamiast
// onClick w dziesięciu komponentach — dzięki temu nowy przycisk jest mierzony
// automatycznie, a data-cta tylko nadaje mu czytelną nazwę.
//
// Zdarzenia:
//   cta_click            {cta_location, cta_text, page_path}
//   pricing_plan_click   {plan, cta_location, page_path}  + ustawia pakiet w formularzu
//   phone_click          {link_location, link_url, page_path}
//   email_click          {link_location, link_url, page_path}
//   view_contact_section {section_id, page_path}   (raz na odsłonę strony)
//   view_pricing         {section_id, page_path}   (raz na odsłonę strony)

const CONTACT_IDS = ['kontakt', 'contact'];
const PRICING_IDS = ['cennik', 'pricing'];

function locationOf(el) {
  const tagged = el.closest('[data-cta]');
  if (tagged && tagged.dataset.cta) return tagged.dataset.cta;
  const landmark = el.closest('section[id], aside[id], footer, header, nav');
  if (landmark && landmark.id) return landmark.id;
  if (landmark) return landmark.tagName.toLowerCase();
  return 'unknown';
}

export default function AnalyticsEvents() {
  const pathname = usePathname();

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

      const hashIndex = href.indexOf('#');
      const fragment = hashIndex >= 0 ? href.slice(hashIndex + 1) : '';
      if (!CONTACT_IDS.includes(fragment)) return;

      const plan = a.dataset.plan;
      if (plan) {
        track('pricing_plan_click', { plan, cta_location: location, page_path: pagePath });
        window.dispatchEvent(new CustomEvent(PRESELECT_PLAN_EVENT, { detail: plan }));
        return;
      }
      const text = (a.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 60);
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
