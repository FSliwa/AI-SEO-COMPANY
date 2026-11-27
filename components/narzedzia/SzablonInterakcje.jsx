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
.sz-chk-akcje {
  display: inline-flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
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
.sz-chk-opcja {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  margin-right: 0.65rem;
  cursor: pointer;
  font-weight: 500;
}
.sz-chk-opcja .sz-chk-box {
  margin: 0;
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

    // 2. Interaktywne pola ☐ we wszystkich szablonach i checklistach z zapisem w localStorage per jezyk + pasek postepu + eksport CSV
    const obszarPodgladu = root.querySelector('#podglad') || root;
    const maPolaDoOdznaczenia = Array.from(obszarPodgladu.querySelectorAll('.szablon-tresc li, .szablon-tresc tbody td')).some((el) => (el.textContent || '').includes('☐'));
    if (maPolaDoOdznaczenia) {
      const kluczStorage = `aisc_chk_${locale}_${slug}`;
      const kluczStary = `aisc_chk_${slug}`;
      let stanZapisany = {};
      try {
        const surowe = window.localStorage.getItem(kluczStorage) ?? (locale === 'pl' ? window.localStorage.getItem(kluczStary) : null);
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
      let licznikGrup = 0;

      // Zamienia kazdy znak ☐ wewnatrz wezlow tekstowych elementu na interaktywne pole wyboru, zachowujac 100% otaczajacego tekstu
      const zamienWewnatrzWezla = (kontener, bazowaAria, grupaId, elPodswietlenia) => {
        const zbierzTekstowe = (wezel, lista = []) => {
          wezel.childNodes.forEach((dz) => {
            if (dz.nodeType === Node.TEXT_NODE && (dz.nodeValue || '').includes('☐')) lista.push(dz);
            else if (dz.nodeType === Node.ELEMENT_NODE && dz.tagName !== 'SCRIPT' && dz.tagName !== 'STYLE') zbierzTekstowe(dz, lista);
          });
          return lista;
        };
        const wezlyTekstowe = zbierzTekstowe(kontener);
        const utworzone = [];
        wezlyTekstowe.forEach((wezel) => {
          const czesci = (wezel.nodeValue || '').split('☐');
          if (czesci.length < 2) return;
          const frag = document.createDocumentFragment();
          if (czesci[0]) frag.appendChild(document.createTextNode(czesci[0]));
          for (let i = 1; i < czesci.length; i += 1) {
            const surowyPo = czesci[i];
            const dopasowanie = /^\s*([^☐,;|\n]{1,60})/.exec(surowyPo);
            const tekstOpcji = dopasowanie ? dopasowanie[1].trim() : '';
            const resztaPo = dopasowanie ? surowyPo.slice(dopasowanie[0].length) : surowyPo;

            const etykieta = document.createElement('label');
            etykieta.className = 'sz-chk-opcja';
            const box = document.createElement('input');
            box.type = 'checkbox';
            box.className = 'sz-chk-box';
            const aria = [bazowaAria, tekstOpcji].filter(Boolean).join(' - ').slice(0, 120);
            if (aria) box.setAttribute('aria-label', aria);
            etykieta.appendChild(box);
            if (tekstOpcji) {
              const span = document.createElement('span');
              span.textContent = tekstOpcji;
              etykieta.appendChild(span);
            }
            frag.appendChild(etykieta);
            if (resztaPo) frag.appendChild(document.createTextNode(resztaPo));
            utworzone.push({ box, opisEksportu: aria || bazowaAria });
          }
          wezel.parentNode?.replaceChild(frag, wezel);
        });
        return utworzone.map((u) => ({
          el: elPodswietlenia,
          box: u.box,
          grupaId,
          opisEksportu: u.opisEksportu,
        }));
      };

      // Wariant A: punkty <li> zawierajace ☐ (zarowno na poczatku punktu, jak i wieloopcyjne w srodku zdania)
      obszarPodgladu.querySelectorAll('.szablon-tresc li').forEach((li) => {
        const tekstLi = li.textContent || '';
        if (!tekstLi.includes('☐')) return;
        const ileSymboli = (tekstLi.match(/☐/g) || []).length;
        const grupaId = `li_${(licznikGrup += 1)}`;
        if (/^\s*☐/.test(tekstLi) && ileSymboli === 1) {
          const pierwszy = li.firstChild;
          const oryginalnyTekst = pierwszy && pierwszy.nodeType === Node.TEXT_NODE ? pierwszy.nodeValue : null;
          if (oryginalnyTekst !== null) {
            pierwszy.nodeValue = oryginalnyTekst.replace(/^\s*☐\s*/, '');
          }
          const box = document.createElement('input');
          box.type = 'checkbox';
          box.className = 'sz-chk-box';
          const opisPelny = (li.textContent || '').replace(/\s+/g, ' ').trim();
          const opisAria = (li.querySelector('strong')?.textContent || opisPelny).replace(/\s+/g, ' ').trim().slice(0, 100);
          if (opisAria) box.setAttribute('aria-label', opisAria);
          li.insertBefore(box, li.firstChild);
          pozycje.push({
            el: li,
            box,
            grupaId,
            opisEksportu: opisPelny.slice(0, 180),
            przywroc: () => {
              box.remove();
              li.classList.remove('sz-chk-zrobione');
              if (pierwszy && oryginalnyTekst !== null) pierwszy.nodeValue = oryginalnyTekst;
            },
          });
        } else {
          const oryginalneHtmlLi = li.innerHTML;
          const opisBazowy = tekstLi.split('☐')[0].replace(/[:\s]+$/, '').trim().slice(0, 80);
          const dodane = zamienWewnatrzWezla(li, opisBazowy, grupaId, null);
          dodane.forEach((d, idx) => {
            pozycje.push({
              ...d,
              przywroc: idx === 0 ? () => { li.innerHTML = oryginalneHtmlLi; } : () => {},
            });
          });
        }
      });

      // Wariant B: wiersze tabeli <tbody><tr> z komorkami zawierajacymi ☐
      obszarPodgladu.querySelectorAll('.szablon-tresc tbody tr').forEach((tr) => {
        const komorki = Array.from(tr.cells || []);
        const komorkiStatusu = komorki.filter((td) => (td.textContent || '').includes('☐'));
        if (komorkiStatusu.length === 0) return;
        const grupaWiersza = `tr_${(licznikGrup += 1)}`;
        const naglowkiKolumn = Array.from(tr.closest('table')?.querySelectorAll('thead th') || []).map((th) => (th.textContent || '').trim());
        const opisWiersza = (komorki[0]?.textContent || komorki[1]?.textContent || tr.textContent || '')
          .replace(/☐/g, '')
          .replace(/\s+/g, ' ')
          .trim()
          .slice(0, 110);

        komorkiStatusu.forEach((komorkaStatusu, idxKom) => {
          const oryginalneHtml = komorkaStatusu.innerHTML;
          const czystyTekstKomorki = (komorkaStatusu.textContent || '').trim();
          const indeksWTr = komorki.indexOf(komorkaStatusu);
          const nazwaKolumny = indeksWTr >= 0 && naglowkiKolumn[indeksWTr] ? naglowkiKolumn[indeksWTr] : '';

          // Tylko gdy komorka zawiera wylacznie sam symbol ☐, wstawiamy zwarta etykiete Gotowe / Done / Erledigt
          if (/^\s*☐\s*$/.test(czystyTekstKomorki)) {
            const etykieta = document.createElement('label');
            etykieta.className = 'sz-chk-etykieta';
            const box = document.createElement('input');
            box.type = 'checkbox';
            box.className = 'sz-chk-box';
            const aria = komorkiStatusu.length > 1
              ? [opisWiersza, nazwaKolumny || `#${idxKom + 1}`].filter(Boolean).join(' - ')
              : opisWiersza;
            if (aria) box.setAttribute('aria-label', aria);
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
              grupaId: grupaWiersza,
              opisEksportu: aria || opisWiersza,
              przywroc: () => {
                elPodswietlenia.classList.remove('sz-chk-zrobione');
                komorkaStatusu.innerHTML = oryginalneHtml;
              },
            });
          } else {
            // Komorka ma etykiety przy polach ☐ (np. „☐ OK ☐ Offen ☐ n. z.” albo „☐ Search Console ☐ GA4”) - zachowujemy caly tekst!
            const dodane = zamienWewnatrzWezla(komorkaStatusu, [opisWiersza, nazwaKolumny].filter(Boolean).join(' · '), grupaWiersza, null);
            dodane.forEach((d, idx) => {
              pozycje.push({
                ...d,
                przywroc: idx === 0 ? () => { komorkaStatusu.innerHTML = oryginalneHtml; } : () => {},
              });
            });
          }
        });
      });

      if (pozycje.length > 0) {
        const grupyMapa = new Map();
        pozycje.forEach((p) => {
          const lista = grupyMapa.get(p.grupaId) || [];
          lista.push(p);
          grupyMapa.set(p.grupaId, lista);
        });
        const lacznieJednostek = grupyMapa.size;

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

        const akcje = document.createElement('div');
        akcje.className = 'sz-chk-akcje';

        const eksportBtn = document.createElement('button');
        eksportBtn.type = 'button';
        eksportBtn.className = 'sz-chk-reset';
        eksportBtn.textContent = de ? 'Exportieren (.csv)' : en ? 'Export (.csv)' : 'Eksportuj (.csv)';

        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.className = 'sz-chk-reset';
        resetBtn.textContent = de ? 'Zurücksetzen' : en ? 'Reset' : 'Wyczyść';

        akcje.appendChild(eksportBtn);
        akcje.appendChild(resetBtn);

        pasek.appendChild(lewa);
        pasek.appendChild(akcje);

        const odswiezPasek = () => {
          let zrobioneJednostki = 0;
          grupyMapa.forEach((lista) => {
            if (lista.some((p) => p.box.checked)) zrobioneJednostki += 1;
          });
          const cokolwiekZaznaczone = pozycje.some((p) => p.box.checked);
          const proc = lacznieJednostek > 0 ? Math.round((zrobioneJednostki / lacznieJednostek) * 100) : 0;
          licznikTekst.textContent = tekstPostepu(zrobioneJednostki, lacznieJednostek, locale);
          wyp.style.width = `${proc}%`;
          resetBtn.disabled = !cokolwiekZaznaczone;
        };

        pozycje.forEach((p, idx) => {
          const klucz = String(idx);
          const zaznaczone = Boolean(stanZapisany[klucz]);
          p.box.checked = zaznaczone;
          if (p.el) p.el.classList.toggle('sz-chk-zrobione', zaznaczone);
          const onZmiana = () => {
            if (p.box.checked) stanZapisany[klucz] = true;
            else delete stanZapisany[klucz];
            if (p.el) p.el.classList.toggle('sz-chk-zrobione', p.box.checked);
            zapisz();
            odswiezPasek();
          };
          p.box.addEventListener('change', onZmiana);
          sprzatanie.push(() => p.box.removeEventListener('change', onZmiana));
        });

        const onEksport = () => {
          const escCsv = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
          const naglowek = de
            ? ['Nr.', 'Prüfpunkt / Option', 'Status']
            : en
              ? ['No.', 'Checklist item / option', 'Status']
              : ['Lp.', 'Punkt kontrolny / opcja', 'Status'];
          const wierszeCsv = [
            naglowek.map(escCsv).join(','),
            ...pozycje.map((p, idx) => [
              idx + 1,
              p.opisEksportu || `#${idx + 1}`,
              p.box.checked ? (de ? 'Erledigt' : en ? 'Done' : 'Gotowe') : (de ? 'Offen' : en ? 'Open' : 'Do zrobienia'),
            ].map(escCsv).join(',')),
          ];
          const blob = new Blob([`\uFEFF${wierszeCsv.join('\r\n')}\r\n`], { type: 'text/csv;charset=utf-8' });
          const urlBlob = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = urlBlob;
          a.download = `${slug || 'checklista'}-${locale}.csv`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          setTimeout(() => URL.revokeObjectURL(urlBlob), 1000);
          track('szablon_checklista_csv', { szablon: slug, lang: locale });
        };

        const onReset = () => {
          stanZapisany = {};
          zapisz();
          pozycje.forEach((p) => {
            p.box.checked = false;
            if (p.el) p.el.classList.remove('sz-chk-zrobione');
          });
          odswiezPasek();
        };
        eksportBtn.addEventListener('click', onEksport);
        resetBtn.addEventListener('click', onReset);

        const slotPaska = root.querySelector('[data-sz-chk-slot]');
        if (slotPaska) {
          slotPaska.replaceChildren(pasek);
        } else {
          const celPaska = root.querySelector('#podglad .sz-panel') || pozycje[0].box.closest('.szablon-tresc');
          if (celPaska) celPaska.insertBefore(pasek, celPaska.firstChild);
        }
        odswiezPasek();

        sprzatanie.push(() => {
          eksportBtn.removeEventListener('click', onEksport);
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
