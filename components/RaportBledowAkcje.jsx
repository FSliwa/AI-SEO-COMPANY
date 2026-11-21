'use client';

import { useState } from 'react';
import { track } from '@/lib/track';
import st from '@/components/narzedzia/narzedzia.module.css';

export default function RaportBledowAkcje({ en = false, reguly = [], cytat = '', plikNazwa = 'raport-bledow-seo.csv' }) {
  const [skopiowano, setSkopiowano] = useState(false);

  function pobierzCsv() {
    const naglowek = en
      ? 'rule_id,category,severity,scope,domains_affected,share_percent,rule_title\n'
      : 'id_reguly,kategoria,waga,zakres,domen_z_problemem,odsetek_procent,tytul_reguly\n';
    const wiersze = reguly.map((r) => {
      const tytul = String(en ? r.tytulEn : r.tytulPl).replace(/"/g, '""');
      return `${r.id},${r.kategoria},${r.waga},${r.zakres},${r.domenZProblemem},${r.odsetek},"${tytul}"`;
    });
    const blob = new Blob([naglowek + wiersze.join('\n') + '\n'], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = plikNazwa;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    track('raport_bledow_csv', { lang: en ? 'en' : 'pl' });
  }

  async function kopiujCytat() {
    if (!cytat) return;
    try {
      await navigator.clipboard.writeText(cytat);
      setSkopiowano(true);
      setTimeout(() => setSkopiowano(false), 3000);
      track('raport_bledow_cytat', { lang: en ? 'en' : 'pl' });
    } catch {
      // brak dostepu do schowka
    }
  }

  return (
    <div className={st.snippetKarta} style={{ marginTop: '1.25rem' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <strong style={{ fontSize: '0.95rem', color: 'var(--color-text-dark)' }}>
          {en ? 'For journalists and researchers: cite or download raw CSV' : 'Dla dziennikarzy i autorów: gotowy cytat i surowe dane CSV'}
        </strong>
        <div style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.5rem', alignItems: 'center' }}>
          <button type="button" className={st.przyciskKopiujLink} onClick={kopiujCytat} data-cta="raport_bledow_kopiuj_cytat">
            {en ? 'Copy citation with source' : 'Kopiuj cytat ze źródłem'}
          </button>
          <button type="button" className={st.przyciskUdostepnij} onClick={pobierzCsv} data-cta="raport_bledow_pobierz_csv">
            {en ? 'Download full CSV (49 rules)' : 'Pobierz pełne CSV (49 reguł)'}
          </button>
          {skopiowano && (
            <span className="r-stan--ok" role="status" aria-live="polite" style={{ color: '#047857', fontSize: '0.85rem', fontWeight: 600 }}>
              {en ? 'Citation copied' : 'Skopiowano cytat'}
            </span>
          )}
        </div>
      </div>
      {cytat ? <pre className={st.snippetKod}><code>{cytat}</code></pre> : null}
    </div>
  );
}
