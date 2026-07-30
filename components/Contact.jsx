'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';

export default function Contact() {
  const [selectedBudget, setSelectedBudget] = useState('Booster Pack');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const lang = useLocale();
  const t = useTranslations('contact');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setFormSubmitted(false);

    try {
      const formData = new FormData(e.target);
      const data = {
        name: formData.get('name'),
        email: formData.get('email'),
        service: formData.get('service'),
        message: formData.get('message'),
      };

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result('error') || 'Wystąpił błąd podczas wysyłania.');
      }

      setFormSubmitted(true);
      
      // GA4 Event Tracking
      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: data.service || 'General Lead',
          value: 1,
        });
      }

      e.target('reset')(); // Clear the form
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="contact" id="kontakt">
      <div className="container">
        <RevealStagger className="contact-box">
          <RevealItem className="contact-info">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
            </div>
            <h2>{t('title')}</h2>
            <p>{t('subtitle')}</p>
            
            <ul className="company-details">
              <li><strong>{lang === 'pl' ? 'Adres:' : 'Address:'}</strong> ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa</li>
              <li><strong>E-mail:</strong> <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'inherit', textDecoration: 'underline' }}>kontakt@ai-seo-company.pl</a></li>
              <li><strong>NIP:</strong> 5253090237</li>
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
            
            {errorMessage && (
              <div style={{ background: '#FEE2E2', color: '#DC2626', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600' }}>
                {lang === 'pl' ? 'Wystąpił błąd: ' : 'An error occurred: '} {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label className="form-label" htmlFor="name">{t('nameLabel')}</label>
              <input type="text" id="name" name="name" className="form-input" placeholder={lang === 'pl' ? 'Jan Kowalski' : 'John Smith'} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">{t('emailLabel')}</label>
              <input type="email" id="email" name="email" className="form-input" placeholder={lang === 'pl' ? 'jan@firma.pl' : 'john@company.com'} required />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">{t('serviceLabel')}</label>
              <select id="service" name="service" className="form-select" required>
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
              <label className="form-label" htmlFor="message">{t('msgLabel')}</label>
              <textarea 
                id="message" 
                name="message" 
                className="form-textarea" 
                rows="4" 
                placeholder={lang === 'pl' ? 'Opisz w kilku słowach swoje cele, obecną stronę oraz wymagany termin...' : 'Briefly describe your goals, current website, and required timeline...'} 
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }} disabled={isSubmitting}>
              {isSubmitting ? (lang === 'pl' ? 'Wysyłanie...' : 'Sending...') : t('btnSend')}
            </button>
            </form>
          </RevealItem>
        </RevealStagger>
      </div>
    </section>
  );
}
