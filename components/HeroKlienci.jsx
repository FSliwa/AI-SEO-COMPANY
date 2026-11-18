'use client';

import { motion } from 'framer-motion';
import { useLocale } from 'next-intl';
import Image from 'next/image';

/**
 * Pasek klientow pod hero (makieta Desktop - 2): cztery loga w jednym szarym
 * odcieniu na pasie mgly, ktory otwiera pasmo gor oferty. Stoi w normalnym
 * przeplywie na gorze .gory-oferta (app/[locale]/page.js), wiec odstepy od
 * hero i od sekcji "Nasze uslugi" licza sie z paddingow (app/wyglad.css,
 * "Pasek klientow"), a nie z pozycji bezwzglednych.
 * Kolejnosc z makiety: Madame Thai, TQL (potwierdzone przez wlasciciela
 * 12.11.2026), AI Signals (ASE-BOT), Staniax. Loga: /images/klienci/.
 * Nie sa linkami - nazwy w tym miejscu tez nimi nie byly. Szeroki uklad:
 * jeden rzad; telefon (< 768 px): siatka 2x2; tablet w pionie bez paska.
 */
export default function HeroKlienci() {
  const lang = useLocale();
  return (
    <div className="gory-klienci">
      <motion.ul
        className="hero-klienci"
        aria-label={lang === 'en' ? 'Our clients' : 'Nasi klienci'}
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <li className="hero-klient hero-klient--mt">
          <Image unoptimized src="/images/klienci/madame-thai.webp" alt="Madame Thai" width={720} height={67} />
        </li>
        <li className="hero-klient hero-klient--tql">
          <Image unoptimized src="/images/klienci/tql.webp" alt="TQL" width={244} height={101} />
        </li>
        <li className="hero-klient hero-klient--ai">
          <Image unoptimized src="/images/klienci/ai-signals.svg" alt="ASE-BOT (AI Signals)" width={224} height={47} style={{ height: 'auto' }} />
        </li>
        <li className="hero-klient hero-klient--st">
          <Image unoptimized src="/images/klienci/staniax.webp" alt="Staniax" width={720} height={129} />
        </li>
      </motion.ul>
    </div>
  );
}
