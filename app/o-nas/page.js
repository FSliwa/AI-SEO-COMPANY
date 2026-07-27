'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import WhyUs from '@/components/WhyUs';
import Portfolio from '@/components/Portfolio';

export default function ONasPage() {
  return (
    <>
      <Header />
      <main className="subpage-main" style={{ paddingTop: '100px', backgroundColor: 'var(--color-bg-surface)', color: 'var(--color-text-main)', minHeight: '100vh', overflowX: 'hidden' }}>
        <WhyUs />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
