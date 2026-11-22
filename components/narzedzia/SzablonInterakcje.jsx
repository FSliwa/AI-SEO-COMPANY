'use client';

// Progresywne ulepszenie stron szablonów (PL/EN/DE):
// 1. Przycisk „Kopiuj kod” / „Copy code” / „Code kopieren” na każdym bloku <pre> wewnątrz .szablon-tresc.
// 2. Na stronach checklist (slug zawiera „checklista” lub „checklist”): interaktywne pola wyboru w wierszach
//    tabeli albo punktach <li>☐ ...</li> z zapisem w localStorage (aisc_chk_<slug>) oraz przyklejony pasek
//    postępu z przyciskiem Reset. Zero zmian w HTML renderowanym na serwerze i zero CLS.

import { useEffect, useRef } from 'react';
import { track } from '@/lib/track';

const CSS = `
.sz .szablon-tresc pre {
  position: relative;
  margin: 0 0 1.25rem;
  padding: 2.55rem 1.15rem 1rem;
  border-radius: 14px;
  border: 1px solid rgba(15, 23, 42, 0.14);
  background: #141923;
  color: #f8fafc;
  overflow-x: auto;
  font-family: var(--w-mono, ui-monospace, SFMono-Regular, Menlo, monospace);
  font-size: 0.86rem;
  line-height: 1.55;
  tab-size: 2;
}
.sz .szablon-tresc pre code {
  background: transparent;
  padding: 0;
  border-radius: 0;
  color: inherit;
  font-size: inherit;
  white-space: pre;
}
.sz-pre-wrap {
  position: relative;
  margin: 0 0 1.25rem;
}
.sz-pre-wrap > pre {
  margin: 0 !important;
}
.sz-kopiuj-kod {
  position: absolute;
  top: 0.5rem;
  right: 0.6rem;
  z-index: 2;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.68rem;
  border-radius: 8px;
  border: 1px solid rgba(248, 250, 252, 0.22);
  background: rgba(30, 41, 59, 0.92);
  color: #f8fafc;
  font-family: inherit;
  font-size: 0.78rem;
  font-weight: 600;
  line-height: 1.3;
  cursor: pointer;
  transition: background-color 150ms ease, border-color 150ms ease;
}
.sz-kopiuj-kod:hover {
  background: rgba(51, 65, 85, 0.98);
  border-color: rgba(248, 250, 252, 0.42);
}
.sz-kopiuj-kod[data-ok="1"] {
  background: #047857;
  border-color: #10b981;
  color: #ffffff;
}
.sz-kopiuj-kod:focus-visible {
  outline: 2px solid var(--w-pomarancz, #d85a30);
  outline-offset: 2px;
}
.sz-chk-pasek {
  position: sticky;
  top: 74px;
  z-index: 4;
  margin: 0 0 0.9rem;
  padding: 0.65rem 0.95rem;
  border-radius: 14px;
  border: 1px solid var(--w-linia, rgba(15, 23, 42, 0.12));
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  box-shadow: 0 8px 24px rgba(10, 19, 55, 0.07);
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem 1rem;
}
.sz-chk-pasek__lewa {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1 1 220px;
  min-width: 0;
}
.sz-chk-pasek__tekst {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--color-text-dark, #0f172a);
  white-space: nowrap;
}
.sz-chk-pasek__tor {
  flex: 1 1 90px;
  max-width: 180px;
  height: 7px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.1);
  overflow: hidden;
}
.sz-chk-pasek__wyp {
  height: 100%;
  border-radius: 999px;
  background: var(--w-pomarancz, #d85a30);
  transition: width 180ms ease;
}
.sz-chk-reset {
  padding: 0.25rem 0.65rem;
  border-radius: 8px;
  border: 1px solid rgba(15, 23, 42, 0.16);
  background: #ffffff;
  color: var(--w-tusz-2, #475569);
  font: inherit;
  font-size: 0.8rem;
  font-weight: 600;
  cursor: pointer;
}
.sz-chk-reset:hover:not(:disabled) {
  border-color: var(--w-pomarancz, #d85a30);
  color: var(--color-text-dark, #0f172a);
}
.sz-chk-reset:disabled {
  opacity: 0.45;
  cursor: default;
}
.sz-chk-box {
  width: 1.05rem;
  height: 1.05rem;
  margin: 0 0.5rem 0 0;
  vertical-align: -0.16em;
  accent-color: var(--w-pomarancz, #d85a30);
  cursor: pointer;
}
.sz-chk-etykieta {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}
.sz-chk-etykieta .sz-chk-box {
  margin: 0;
}
.sz-chk-punkt {
  font-weight: 700;
}
li.sz-chk-zrobione {
  opacity: 0.68;
}
li.sz-chk-zrobione > strong:first-of-type,
li.sz-chk-zrobione > .sz-chk-punkt {
  text-decoration: line-through;
}
tr.sz-chk-zrobione td {
  background: rgba(16, 185, 129, 0.06);
  color: var(--w-tusz-2, #475569);
}
`;

async function kopiujDoSchowka(tekst) {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(tekst);
      return true;
    }
  } catch {
    // zapas ponizej
  }
  try {
    const t = document.createElement('textarea');
    t.value = tekst;
    t.setAttribute('readonly', '');
    t.style.position = 'fixed';
    t.style.opacity = '0';
    document.body.appendChild(t);
    t.select();
    const ok = document.execCommand('copy');
    t.remove();
    return ok;
  } catch {
    return false;
  }
}

function tekstPostepu(zrobione, wszystkie, locale) {
  const proc = wszystkie > 0 ? Math.round((zrobione / wszystkie) * 100) : 0;
  if (locale === 'de') return `${zrobione} von ${wszystkie} erledigt (${proc} %)`;
  if (locale === 'en') return `Completed ${zrobione} of ${wszystkie} (${proc}%)`;
  return `Ukończono ${zrobione} z ${wszystkie} punktów (${proc}%)`;
}

export default function SzablonInterakcje({ slug = '', locale = 'pl' }) {
  const kotwicaRef = useRef(null);

  useEffect(() => {
    const root = kotwicaRef.current?.closest('[data-sz-tresc]') ?? document.querySelector('[data-sz-tresc]');
    if (!root) return undefined;

    const de = locale === 'de';
    const en = locale === 'en';
    const etykietaKopiuj = de ? 'Code kopieren' : en ? 'Copy code' : 'Kopiuj kod';
    const etykietaSkopiowano = de ? '✓ Kopiert' : en ? '✓ Copied' : '✓ Skopiowano';
    const zegary = new Set();
    const sprzatanie = [];

    // 1. Przycisk kopiowania na każdym bloku <pre> wewnątrz .szablon-tresc
    const blokiPre = root.querySelectorAll('.szablon-tresc pre');
    blokiPre.forEach((pre) => {
      if (pre.parentElement?.classList.contains('sz-pre-wrap')) return;
      const opakowanie = document.createElement('div');
      opakowanie.className = 'sz-pre-wrap';
      pre.parentNode?.insertBefore(opakowanie, pre);
      opakowanie.appendChild(pre);

      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'sz-kopiuj-kod';
      btn.textContent = etykietaKopiuj;
      const onKlik = async () => {
        const zrodlo = pre.querySelector('code') || pre;
        const ok = await kopiujDoSchowka(zrodlo.textContent?.trim() || '');
        if (!ok) return;
        btn.textContent = etykietaSkopiowano;
        btn.setAttribute('data-ok', '1');
        track('szablon_kod_kopiuj', { szablon: slug, lang: locale });
        const t = setTimeout(() => {
          btn.textContent = etykietaKopiuj;
          btn.removeAttribute('data-ok');
          zegary.delete(t);
        }, 2200);
        zegary.add(t);
      };
      btn.addEventListener('click', onKlik);
      opakowanie.appendChild(btn);

      sprzatanie.push(() => {
        btn.removeEventListener('click', onKlik);
        btn.remove();
        if (opakowanie.parentNode) {
          opakowanie.parentNode.insertBefore(pre, opakowanie);
          opakowanie.remove();
        }
      });
    });

    // 2. Interaktywne pola ☐ we wszystkich szablonach i checklistach z zapisem w localStorage + pasek postępu
    const obszarPodgladu = root.querySelector('#podglad') || root;
    const maPolaDoOdznaczenia = Array.from(obszarPodgladu.querySelectorAll('.szablon-tresc li, .szablon-tresc tbody td')).some((el) => (el.textContent || '').includes('☐'));
    if (maPolaDoOdznaczenia) {
      const kluczStorage = `aisc_chk_${slug}`;
      let stanZapisany = {};
      try {
        const surowe = window.localStorage.getItem(kluczStorage);
        if (surowe) {
          const sparsowane = JSON.parse(surowe);
          if (sparsowane && typeof sparsowane === 'object') stanZapisany = sparsowane;
        }
      } catch {
        stanZapisany = {};
      }

      const zapisz = () => {
        try {
          if (Object.keys(stanZapisany).length === 0) window.localStorage.removeItem(kluczStorage);
          else window.localStorage.setItem(kluczStorage, JSON.stringify(stanZapisany));
        } catch {
          // brak dostepu do localStorage
        }
      };

      const pozycje = [];

      // Wariant A: punkty <li> zaczynające się od ☐
      obszarPodgladu.querySelectorAll('.szablon-tresc li').forEach((li) => {
        if (!/^\s*☐/.test(li.textContent || '')) return;
        const pierwszy = li.firstChild;
        const oryginalnyTekst = pierwszy && pierwszy.nodeType === Node.TEXT_NODE ? pierwszy.nodeValue : null;
        if (oryginalnyTekst !== null) {
          pierwszy.nodeValue = oryginalnyTekst.replace(/^\s*☐\s*/, '');
        }
        const box = document.createElement('input');
        box.type = 'checkbox';
        box.className = 'sz-chk-box';
        const opisAria = (li.querySelector('strong')?.textContent || li.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 100);
        if (opisAria) box.setAttribute('aria-label', opisAria);
        li.insertBefore(box, li.firstChild);
        pozycje.push({
          el: li,
          box,
          przywroc: () => {
            box.remove();
            li.classList.remove('sz-chk-zrobione');
            if (pierwszy && oryginalnyTekst !== null) pierwszy.nodeValue = oryginalnyTekst;
          },
        });
      });

      // Wariant B: wiersze tabeli <tbody><tr> z komórkami zawierającymi ☐ (obsługa również wielu kolumn ☐ w jednym wierszu)
      obszarPodgladu.querySelectorAll('.szablon-tresc tbody tr').forEach((tr) => {
        const komorki = Array.from(tr.cells || []);
        const komorkiStatusu = komorki.filter((td) => /^\s*☐\s*$/.test(td.textContent || '') || (td.textContent || '').includes('☐'));
        komorkiStatusu.forEach((komorkaStatusu, idxKom) => {
          const oryginalneHtml = komorkaStatusu.innerHTML;
          const etykieta = document.createElement('label');
          etykieta.className = 'sz-chk-etykieta';
          const box = document.createElement('input');
          box.type = 'checkbox';
          box.className = 'sz-chk-box';
          const opisWiersza = (komorki[0]?.textContent || komorki[1]?.textContent || tr.textContent || '').replace(/\s+/g, ' ').trim().slice(0, 90);
          if (opisWiersza) box.setAttribute('aria-label', komorkiStatusu.length > 1 ? `${opisWiersza} (${idxKom + 1})` : opisWiersza);
          const podpis = document.createElement('span');
          podpis.textContent = de ? 'Erledigt' : en ? 'Done' : 'Gotowe';
          etykieta.appendChild(box);
          etykieta.appendChild(podpis);
          komorkaStatusu.textContent = '';
          komorkaStatusu.appendChild(etykieta);
          const elPodswietlenia = komorkiStatusu.length === 1 ? tr : komorkaStatusu;
          pozycje.push({
            el: elPodswietlenia,
            box,
            przywroc: () => {
              elPodswietlenia.classList.remove('sz-chk-zrobione');
              komorkaStatusu.innerHTML = oryginalneHtml;
            },
          });
        });
      });

      if (pozycje.length > 0) {
        const pasek = document.createElement('div');
        pasek.className = 'sz-chk-pasek';

        const lewa = document.createElement('div');
        lewa.className = 'sz-chk-pasek__lewa';

        const licznikTekst = document.createElement('span');
        licznikTekst.className = 'sz-chk-pasek__tekst';
        licznikTekst.setAttribute('role', 'status');
        licznikTekst.setAttribute('aria-live', 'polite');

        const tor = document.createElement('div');
        tor.className = 'sz-chk-pasek__tor';
        tor.setAttribute('aria-hidden', 'true');
        const wyp = document.createElement('div');
        wyp.className = 'sz-chk-pasek__wyp';
        tor.appendChild(wyp);

        lewa.appendChild(licznikTekst);
        lewa.appendChild(tor);

        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'sz-chk-reset';
        resetBtn.textContent = de ? 'Zurücksetzen' : en ? 'Reset' : 'Wyczyść';

        pasek.appendChild(lewa);
        pasek.appendChild(resetBtn);

        const odswiezPasek = () => {
          const zrobione = pozycje.reduce((suma, p) => suma + (p.box.checked ? 1 : 0), 0);
          const proc = Math.round((zrobione / pozycje.length) * 100);
          licznikTekst.textContent = tekstPostepu(zrobione, pozycje.length, locale);
          wyp.style.width = `${proc}%`;
          resetBtn.disabled = zrobione === 0;
        };

        pozycje.forEach((p, idx) => {
          const klucz = String(idx);
          const zaznaczone = Boolean(stanZapisany[klucz]);
          p.box.checked = zaznaczone;
          p.el.classList.toggle('sz-chk-zrobione', zaznaczone);
          const onZmiana = () => {
            if (p.box.checked) stanZapisany[klucz] = true;
            else delete stanZapisany[klucz];
            p.el.classList.toggle('sz-chk-zrobione', p.box.checked);
            zapisz();
            odswiezPasek();
          };
          p.box.addEventListener('change', onZmiana);
          sprzatanie.push(() => p.box.removeEventListener('change', onZmiana));
        });

        const onReset = () => {
          stanZapisany = {};
          zapisz();
          pozycje.forEach((p) => {
            p.box.checked = false;
            p.el.classList.remove('sz-chk-zrobione');
          });
          odswiezPasek();
        };
        resetBtn.addEventListener('click', onReset);

        const slotPaska = root.querySelector('[data-sz-chk-slot]');
        if (slotPaska) {
          slotPaska.replaceChildren(pasek);
        } else {
          const celPaska = root.querySelector('#podglad .sz-panel') || pozycje[0].el.closest('.szablon-tresc');
          if (celPaska) celPaska.insertBefore(pasek, celPaska.firstChild);
        }
        odswiezPasek();

        sprzatanie.push(() => {
          resetBtn.removeEventListener('click', onReset);
          pasek.remove();
          pozycje.forEach((p) => p.przywroc());
        });
      }
    }

    return () => {
      zegary.forEach((t) => clearTimeout(t));
      zegary.clear();
      sprzatanie.forEach((fn) => fn());
    };
  }, [slug, locale]);

  return (
    <>
      <style>{CSS}</style>
      <span ref={kotwicaRef} hidden />
    </>
  );
}
