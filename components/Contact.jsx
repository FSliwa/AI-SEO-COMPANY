'use client';

import { useState } from 'react';
import { useLanguage } from '@/lib/LanguageContext';
import { translations } from '@/lib/translations';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Contact() {
  const [selectedBudget, setSelectedBudget] = useState('Booster Pack');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { lang } = useLanguage();
  const t = translations[lang].contact;

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => setFormSubmitted(false), 5000);
  };

  return (
    <section className="contact" id="kontakt">
      <div className="container">
        <RevealStagger className="contact-box">
          <RevealItem className="contact-info">
            <div className="section-tag">{t.tag}</div>
            <h2>{t.title}</h2>
            <p>{t.subtitle}</p>
            
            <ul className="company-details">
              <li><strong>{lang === 'pl' ? 'Adres:' : 'Address:'}</strong> ul. Złota 44, 00-120 Warszawa</li>
              <li><strong>E-mail:</strong> kontakt@aiseocompany.com</li>
              <li><strong>NIP:</strong> 5252819201</li>
              <li><strong>{lang === 'pl' ? 'Czas odpowiedzi:' : 'Response Time:'}</strong> {lang === 'pl' ? 'Zazwyczaj < 2 godziny' : 'Usually < 2 hours'}</li>
            </ul>
          </RevealItem>

          <RevealItem>
            <form className="contact-form" onSubmit={handleSubmit}>
            {formSubmitted && (
              <div style={{ background: '#EFF8E6', color: '#639922', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600' }}>
                {lang === 'pl' ? '✓ Dziękujemy! Twoje zapytanie zostało wysłane. Skontaktujemy się z Tobą w ciągu 2 godzin.' : '✓ Thank you! Your request has been received. We will contact you within 2 hours.'}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="name">{t.nameLabel}</label>
              <input type="text" id="name" className="form-input" placeholder={lang === 'pl' ? 'Jan Kowalski' : 'John Smith'} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">{t.emailLabel}</label>
              <input type="email" id="email" className="form-input" placeholder={lang === 'pl' ? 'jan@firma.pl' : 'john@company.com'} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">{t.serviceLabel}</label>
              <select id="service" className="form-select" required>
                <option value="">{lang === 'pl' ? 'Wybierz pakiet...' : 'Select plan...'}</option>
                <option value="standard">{lang === 'pl' ? 'SEO Standard (1 900 zł netto/mies.)' : 'SEO Standard (€450 net/mo)'}</option>
                <option value="premium">{lang === 'pl' ? 'SEO Premium (2 500 zł netto/mies.)' : 'SEO Premium (€590 net/mo)'}</option>
                <option value="booster">{lang === 'pl' ? 'Booster Pack (2 500 zł netto — Strona za 0 zł)' : 'Booster Pack (€590 net — Free Website)'}</option>
                <option value="custom">{lang === 'pl' ? 'Indywidualny zakres działania' : 'Custom Project'}</option>
              </select>
            </div>

            <div className="form-group">
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="message">Opis projektu i oczekiwań</label>
              <textarea id="message" className="form-textarea" rows="4" placeholder="Opisz w kilku słowach swoje cele, obecną stronę oraz wymagany termin..." required></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
              Wyślij zapytanie o wycenę
            </button>
            </form>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
