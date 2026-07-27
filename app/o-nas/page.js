'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import AboutMission from '@/components/about/AboutMission';
import AboutMethodology from '@/components/about/AboutMethodology';
import AboutTeam from '@/components/about/AboutTeam';
import AboutValues from '@/components/about/AboutValues';

export default function ONasPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <AboutMission />
        <AboutMethodology />
        <AboutTeam />
        <AboutValues />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
