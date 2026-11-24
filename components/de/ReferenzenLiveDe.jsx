'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { RevealStagger, RevealItem } from '@/components/ScrollReveal';

function formatIntDe(n) {
  return new Intl.NumberFormat('de-DE').format(Math.round(n));
}

function formatImprDe(n) {
  if (n >= 1000) {
    const tsd = n / 1000;
    const digits = tsd >= 10 ? 1 : 2;
    return `${new Intl.NumberFormat('de-DE', { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(tsd)} Tsd.`;
  }
  return formatIntDe(n);
}

function formatDatumDe(iso, mitJahr = false) {
  if (!iso || typeof iso !== 'string') return '';
  const [y, m, d] = iso.split('-');
  if (!y || !m || !d) return iso;
  return mitJahr ? `${d}.${m}.${y}` : `${d}.${m}.`;
}

function liveKarte(r, m) {
  if (!m) return r;
  const zeitraum = m.startDate && m.endDate ? `${formatDatumDe(m.startDate)}-${formatDatumDe(m.endDate, true)}` : r.zeitraum;
  const pos = typeof m.position === 'number' && m.position > 0
    ? new Intl.NumberFormat('de-DE', { minimumFractionDigits: 1, maximumFractionDigits: 1 }).format(m.position)
    : null;
  const tage = m.days || 92;

  if (r.modus === 'impr') {
    return {
      ...r,
      zahl: `${formatImprDe(m.totalImpr)} Impressionen`,
      text: `${formatImprDe(m.totalImpr)} Impressionen und ${formatIntDe(m.totalClicks)} Klicks innerhalb von ${tage} Tagen in einer stark umkämpften internationalen Fintech-Nische.`,
      zeitraum,
    };
  }
  return {
    ...r,
    zahl: `${formatIntDe(m.totalClicks)} Klicks`,
    text: `${formatIntDe(m.totalClicks)} Klicks und ${formatImprDe(m.totalImpr)} Impressionen${pos ? ` bei durchschnittlicher Position ${pos}` : ''} in Google innerhalb von ${tage} Tagen.`,
    zeitraum,
  };
}

export default function ReferenzenLiveDe({ liste }) {
  const [metryki, setMetryki] = useState(null);
  const [liveAktiv, setLiveAktiv] = useState(false);

  useEffect(() => {
    let aktiv = true;
    fetch('/api/realizacje-gsc')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (!aktiv || !data?.ok || !data?.metryki) return;
        setMetryki(data.metryki);
        setLiveAktiv(data.zrodlo === 'gsc-na-zywo');
      })
      .catch(() => {});
    return () => {
      aktiv = false;
    };
  }, []);

  return (
    <RevealStagger style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: '1.25rem' }}>
      {liste.map((basis) => {
        const r = metryki && basis.gscKey ? liveKarte(basis, metryki[basis.gscKey]) : basis;
        return (
          <RevealItem key={r.id} className="w-tafla-szklo" style={{ borderRadius: 'var(--w-promien-karta)', padding: '1.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', minHeight: '36px' }}>
              <Image unoptimized src={r.logo} alt={r.name} width={r.logoW} height={r.logoH} style={{ height: 'auto', width: 'auto', maxHeight: '34px', maxWidth: '160px', objectFit: 'contain' }} />
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.72rem', fontFamily: 'var(--w-mono)', fontWeight: 500, color: 'var(--w-tusz-2)', whiteSpace: 'nowrap' }}>
                <span style={{ width: '7px', height: '7px', borderRadius: '999px', background: liveAktiv ? '#16a34a' : '#64748b', display: 'inline-block' }} aria-hidden="true" />
                GSC API
              </span>
            </div>
            <div style={{ fontSize: '0.85rem', color: 'var(--w-tusz-2)' }}>{r.art}</div>
            <div style={{ fontSize: '1.7rem', fontWeight: 600, color: 'var(--color-text-dark)', letterSpacing: '-0.02em' }}>{r.zahl}</div>
            <p lang="de" style={{ margin: 0, fontSize: '1rem', lineHeight: 1.55, color: 'var(--color-text-main)', flexGrow: 1 }}>{r.text}</p>
            <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--w-tusz-2)' }}>Zeitraum: {r.zeitraum}. Quelle: {r.quelle}</p>
          </RevealItem>
        );
      })}
    </RevealStagger>
  );
}
