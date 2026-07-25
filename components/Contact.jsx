'use client';

import { useState } from 'react';

export default function Contact() {
  const [selectedBudget, setSelectedBudget] = useState('Booster Pack (2 500 zł netto)');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section className="contact" id="kontakt">
      <div className="container">
        <div className="contact-box">
          <div className="contact-info">
            <div className="section-tag">Kontakt</div>
            <h2>Masz projekt na oku? Wyceńmy go!</h2>
            <p>Wypełnij krótki formularz, a powrócimy do Ciebie z wstępną darmową analizą i propozycją w ciągu 24h.</p>
            
            <ul className="company-details">
              <li><strong>Adres:</strong> ul. Złota 44, 00-120 Warszawa</li>
              <li><strong>E-mail:</strong> kontakt@ase-bot.live</li>
              <li><strong>NIP:</strong> 5252819201</li>
              <li><strong>Czas odpowiedzi:</strong> Zazwyczaj &lt; 2 godziny</li>
            </ul>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            {formSubmitted && (
              <div style={{ background: '#EFF8E6', color: '#639922', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600' }}>
                ✓ Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą w ciągu 2 godzin.
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="name">Imię i Nazwisko / Firma</label>
              <input type="text" id="name" className="form-input" placeholder="Jan Kowalski" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">Adres E-mail</label>
              <input type="email" id="email" className="form-input" placeholder="jan@firma.pl" required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">Interesujący pakiet</label>
              <select id="service" className="form-select" required>
                <option value="">Wybierz pakiet...</option>
                <option value="standard">SEO Standard (1 900 zł netto/mies.)</option>
                <option value="premium">SEO Premium (2 500 zł netto/mies.)</option>
                <option value="booster">Booster Pack (2 500 zł netto — Strona za 0 zł)</option>
                <option value="custom">Indywidualny zakres działania</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Wybór pakietu</label>
              <div className="budget-pills">
                {['SEO Standard (1 900 zł)', 'SEO Premium (2 500 zł)', 'Booster Pack (Strona 0 zł)'].map((budget, i) => (
                  <div
                    key={i}
                    className={`budget-pill ${selectedBudget === budget ? 'selected' : ''}`}
                    onClick={() => setSelectedBudget(budget)}
                  >
                    {budget}
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Opis projektu i oczekiwań</label>
              <textarea id="message" className="form-textarea" rows="4" placeholder="Opisz w kilku słowach swoje cele, obecną stronę oraz wymagany termin..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Wyślij zapytanie o wycenę
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
