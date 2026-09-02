'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '@/i18n/routing';
import { sectionId } from '@/lib/anchors';

export default function Contact({ isMainContent = false }) {
  const [selectedBudget, setSelectedBudget] = useState('Booster Pack');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const lang = useLocale();
  const t = useTranslations('contact');

  const Wrapper = isMainContent ? 'section' : 'aside';
  const wrapperProps = isMainContent ? {} : { 'data-nosnippet': 'true', 'aria-label': 'Kontakt' };

  // Native constraint-validation bubbles follow the browser UI language, not the
  // page, so a Polish browser showed "Wypełnij to pole" on the English form.
  // Supplying our own message per locale overrides that.
  const validationMessages = {
    required: lang === 'pl' ? 'Wypełnij to pole.' : 'Please fill in this field.',
    email: lang === 'pl' ? 'Podaj poprawny adres e-mail.' : 'Please enter a valid email address.',
    select: lang === 'pl' ? 'Wybierz jedną z opcji.' : 'Please select one of the options.'
  };

  const handleInvalid = (e) => {
    const el = e.target;
    if (el.validity.typeMismatch) el.setCustomValidity(validationMessages.email);
    else if (el.tagName === 'SELECT') el.setCustomValidity(validationMessages.select);
    else el.setCustomValidity(validationMessages.required);
  };

  // Clear the override so the field can validate normally on the next attempt.
  const handleInput = (e) => e.target.setCustomValidity('');

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
        throw new Error(result.error || 'Wystąpił błąd podczas wysyłania.');
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

      e.target.reset(); // Clear the form
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (err) {
      setErrorMessage(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Wrapper className="contact" id={sectionId('kontakt', lang)} {...wrapperProps}>
      <div className="container">
        <RevealStagger className="contact-box">
          <RevealItem className="contact-info">
            <div className="section-tag" style={{ color: 'var(--color-primary)' }}>
              <span className="asterisk" style={{ color: 'var(--color-primary)' }}>✳</span> {t('tag')}
            </div>
            <h2>{t('title')}</h2>
            <p>{t('subtitle')}</p>
            
            <ul className="company-details">
              <li><span style={{ fontWeight: 'bold' }}>{lang === 'pl' ? 'Adres:' : 'Address:'}</span> ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa</li>
              <li><span style={{ fontWeight: 'bold' }}>{lang === 'pl' ? 'Telefon:' : 'Phone:'}</span> <a href="tel:+48518815055" style={{ color: 'inherit', textDecoration: 'underline' }}>518 815 055</a></li>
              <li><span style={{ fontWeight: 'bold' }}>E-mail:</span> <a href="mailto:kontakt@ai-seo-company.pl" style={{ color: 'inherit', textDecoration: 'underline' }}>kontakt@ai-seo-company.pl</a></li>
              <li><span style={{ fontWeight: 'bold' }}>NIP:</span> 5253090237</li>
              <li><span style={{ fontWeight: 'bold' }}>{lang === 'pl' ? 'Czas odpowiedzi:' : 'Response Time:'}</span> {lang === 'pl' ? 'Zazwyczaj < 2 godziny' : 'Usually < 2 hours'}</li>
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
              <input type="text" id="name" name="name" className="form-input" placeholder={lang === 'pl' ? 'Jan Kowalski' : 'John Smith'} required onInvalid={handleInvalid} onInput={handleInput} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="email">{t('emailLabel')}</label>
              <input type="email" id="email" name="email" className="form-input" placeholder={lang === 'pl' ? 'jan@firma.pl' : 'john@company.com'} required onInvalid={handleInvalid} onInput={handleInput} />
            </div>

            <div className="form-group">
              <label className="form-label" htmlFor="service">{t('serviceLabel')}</label>
              <select id="service" name="service" className="form-select" required onInvalid={handleInvalid} onInput={handleInput}>
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
                onInvalid={handleInvalid}
                onInput={handleInput}
              ></textarea>
            </div>

            {/* Art. 13 GDPR information duty: the form collects personal data,
                so the notice has to appear where the data is entered, not only
                in a policy the user may never open. */}
            <p style={{ fontSize: '0.8rem', lineHeight: 1.5, color: '#6E6E73', margin: '0 0 1rem 0' }}>
              {lang === 'pl' ? (
                <>
                  Administratorem Twoich danych jest AI SEO COMPANY, ul. Grzybowska 12/14 lok. B-3, 00-132 Warszawa.
                  Dane z formularza przetwarzamy wyłącznie po to, żeby odpowiedzieć na Twoje zapytanie.
                  Przysługuje Ci dostęp do danych, ich sprostowanie, usunięcie oraz sprzeciw wobec przetwarzania.
                  Szczegóły znajdziesz w <Link href="/cookies" style={{ textDecoration: 'underline' }}>polityce prywatności</Link>.
                </>
              ) : (
                <>
                  The controller of your data is AI SEO COMPANY, ul. Grzybowska 12/14 lok. B-3, 00-132 Warsaw, Poland.
                  Data from this form is processed solely to answer your enquiry.
                  You have the right to access, rectify and erase your data, and to object to processing.
                  Details are in our <Link href="/cookies" style={{ textDecoration: 'underline' }}>privacy policy</Link>.
                </>
              )}
            </p>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', opacity: isSubmitting ? 0.7 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }} disabled={isSubmitting}>
              {isSubmitting ? (lang === 'pl' ? 'Wysyłanie...' : 'Sending...') : t('btnSend')}
            </button>
            </form>
          </RevealItem>
        </RevealStagger>
      </div>
    </Wrapper>
  );
}
