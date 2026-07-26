import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Pricing() {
  return (
    <section className="pricing" id="cennik">
      <div className="container">
        <Reveal className="section-header">
          <div className="section-tag">Cennik Usług</div>
          <h2>Przejrzyste pakiety bez ukrytych kosztów</h2>
          <p>Wybierz elastyczną subskrypcję miesięczną lub skorzystaj z pakietu z darmową stroną internetową.</p>
        </Reveal>

        <RevealStagger className="pricing-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
          {/* Package 1 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>SEO Standard</h3>
              <p className="pricing-desc">Elastyczny pakiet pozycjonowania i optymalizacji dla rozwijających się firm.</p>
              <div className="pricing-price">
                <div className="price-label">Subskrypcja miesięczna</div>
                <div className="price-amount">1 900 zł <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>netto / mies.</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Kompleksowy audyt SEO i analiza konkurencji</li>
              <li>Podstawowa optymalizacja techniczna strony</li>
              <li>Optymalizacja Wizytówki Google (Profil Firmy)</li>
              <li>Comiesięczny raport pozycji i ruchu</li>
              <li>Możliwość rezygnacji w każdej chwili</li>
            </ul>
            <a href="#kontakt" className="btn btn-secondary">Wybierz pakiet</a>
          </RevealItem>

          {/* Package 2 */}
          <RevealItem className="pricing-card">
            <div className="pricing-header">
              <h3>SEO Premium</h3>
              <p className="pricing-desc">Maksymalny wzrost widoczności i pozycji w Google dla wymagających branż.</p>
              <div className="pricing-price">
                <div className="price-label">Subskrypcja miesięczna</div>
                <div className="price-amount">2 500 zł <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>netto / mies.</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li>Pełne pozycjonowanie techniczne i treściowe</li>
              <li>Wzmocniony profil mobilny (wzrost CTR z telefonów)</li>
              <li>Prowadzenie Wizytówki Google (walka o TOP 3 Map)</li>
              <li>Strategia link buildingu i rozbudowa artykułów</li>
              <li>Możliwość rezygnacji w każdej chwili</li>
            </ul>
            <a href="#kontakt" className="btn btn-secondary">Wybierz pakiet</a>
          </RevealItem>

          {/* Package 3 (Featured Booster Pack) */}
          <RevealItem className="pricing-card featured">
            <div className="pricing-header">
              <h3>Booster Pack</h3>
              <p className="pricing-desc">Strona internetowa za DARMO + pełna obsługa SEO i opieka techniczna.</p>
              <div className="pricing-price">
                <div className="price-label" style={{ color: 'var(--color-cta)', fontWeight: '700' }}>Umowa min. 3 miesiące</div>
                <div className="price-amount">2 500 zł <span style={{ fontSize: '1rem', color: 'var(--color-text-muted)', fontWeight: 'normal' }}>netto / mies.</span></div>
              </div>
            </div>
            <ul className="pricing-features">
              <li><strong style={{ color: 'var(--color-growth)' }}>NOWA STRONA WWW ZA 0 ZŁ W PAKIECIE</strong></li>
              <li>Indywidualny projekt graficzny UX/UI (RWD)</li>
              <li>Pełne pozycjonowanie SEO i audyt konkurencji</li>
              <li>Optymalizacja i publikacje w Wizytówce Google</li>
              <li>Certyfikat SSL, serwer i opieka techniczna</li>
              <li>Brak jakichkolwiek dodatkowych ukrytych opłat</li>
            </ul>
            <a href="#kontakt" className="btn btn-primary">Zamów Booster Pack</a>
          </RevealItem>
        </RevealStagger>

        <Reveal className="pricing-note">
          <strong>Subskrypcja czy Booster Pack?</strong> W pakietach SEO Standard (1 900 zł netto) oraz SEO Premium (2 500 zł netto) korzystasz z <strong>miesięcznej subskrypcji z opcją rezygnacji w dowolnym momencie</strong>. Wybierając pakiet <strong>Booster Pack</strong> (2 500 zł netto przy umowie na min. 3 miesiące), otrzymujesz <strong>nową, w pełni responsywną stronę internetową całkowicie za darmo</strong>!
        </Reveal>
      </div>
    </section>
  );
}
