export default function Footer() {
  return (
    <>
      {/* KOTA Sticky / Floating Action Pill Button (Bottom Right) */}
      <a href="#kontakt" className="kota-floating-cta">
        Start your project →
      </a>

      <footer className="footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <a href="#" className="logo" style={{ color: '#FFFFFF', marginBottom: '1rem' }}>
                AI SEO COMPANY
              </a>
              <p style={{ fontSize: '0.9rem', maxWidth: '320px', color: '#94A3B8' }}>
                Butikowa agencja brandingu, web designu i optymalizacji SEO. Tworzymy marki i serwisy w Next.js, które przyciągają klientów.
              </p>
            </div>
            <div className="footer-col">
              <h4>Nawigacja</h4>
              <ul className="footer-links">
                <li><a href="#uslugi">Usługi</a></li>
                <li><a href="#portfolio">Portfolio</a></li>
                <li><a href="#cennik">Cennik</a></li>
                <li><a href="#proces">Proces</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Usługi</h4>
              <ul className="footer-links">
                <li><a href="#uslugi">Strona WWW za 0 zł</a></li>
                <li><a href="#cennik">SEO Standard (1 900 zł netto)</a></li>
                <li><a href="#cennik">SEO Premium (2 500 zł netto)</a></li>
                <li><a href="#cennik">Booster Pack (2 500 zł netto)</a></li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Kontakt</h4>
              <ul className="footer-links">
                <li><a href="mailto:kontakt@ase-bot.live">kontakt@ase-bot.live</a></li>
                <li><a href="#kontakt">Formularz Wyceny</a></li>
                <li><a href="#">Warszawa, Polska</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <p>© 2026 AI SEO COMPANY. Wszelkie prawa zastrzeżone. Inspired by VIS & KOTA.</p>
          </div>
        </div>
      </footer>
    </>
  );
}
