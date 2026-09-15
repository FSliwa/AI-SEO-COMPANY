'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Reveal, RevealStagger, RevealItem } from './ScrollReveal';
import { Link } from '@/i18n/routing';
import { sectionId } from '@/lib/anchors';
import { track, PRESELECT_PLAN_EVENT } from '@/lib/track';

// Wartość konwersji przekazywana do Google Ads, żeby licytacja odróżniała
// zapytanie o Premium od łowcy okazji. To miesięczna wartość kontraktu (USD,
// przeliczona z cen widocznych na stronie EN) — jeśli chcesz licytować pod
// realną wartość oczekiwaną, przemnóż te liczby przez własny współczynnik
// domknięcia sprzedaży.
const LEAD_VALUE_USD = {
  standard: 490,
  premium: 640,
  booster: 640,
  custom: 640,
};
const DEFAULT_LEAD_VALUE_USD = 490;

// Kliknięcia w telefon i e-mail mierzy components/AnalyticsEvents.jsx (jeden
// nasłuch dla całej strony), tu zostają tylko zdarzenia samego formularza.

export default function Contact({ isMainContent = false }) {
  const [selectedBudget, setSelectedBudget] = useState('Booster Pack');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [service, setService] = useState('');
  const lang = useLocale();
  const t = useTranslations('contact');

  // Przyciski „Wybierz" w cenniku prowadzą kotwicą do formularza; wcześniej
  // wybrany pakiet ginął po drodze i użytkownik musiał wskazać go drugi raz.
  // Zdarzenie pricing_plan_click wysyła AnalyticsEvents, tu tylko odbiór.
  useEffect(() => {
    const onPreselect = (e) => { if (e && e.detail) setService(e.detail); };
    window.addEventListener(PRESELECT_PLAN_EVENT, onPreselect);
    return () => window.removeEventListener(PRESELECT_PLAN_EVENT, onPreselect);
  }, []);

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
    // Które pole zatrzymuje wysyłkę — diagnostyka tarcia na stronie docelowej.
    track('form_validation_error', {
      field: el.id || el.name || el.tagName.toLowerCase(),
      reason: el.validity.typeMismatch ? 'type_mismatch' : 'required',
    });
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
        // Konwersje rozszerzone: gtag haszuje adres po stronie przeglądarki,
        // surowy e-mail nie opuszcza urządzenia. Dane trafiają do wszystkich
        // skonfigurowanych tagów (GA4 + Google Ads) i podnoszą dopasowanie
        // konwersji tam, gdzie pliki cookie są ucięte (Safari, iOS). Wymaga
        // włączonego "User-provided data collection" w GA4 oraz
        // allow_enhanced_conversions w konfiguracji tagu Ads (layout.js).
        // Musi być PRZED generate_lead: `set` dotyczy tylko kolejnych trafień,
        // więc ustawione po zdarzeniu nie dopięłoby e-maila do konwersji,
        // którą Google Ads importuje z GA4.
        window.gtag('set', 'user_data', { email: data.email });

        // Zalecane parametry GA4 dla generate_lead (currency + value) – dzięki
        // nim import do Google Ads może licytować pod wartość, nie pod sztukę.
        window.gtag('event', 'generate_lead', {
          event_category: 'Contact',
          event_label: data.service || 'General Lead',
          plan: data.service || 'none',
          currency: 'USD',
          value: LEAD_VALUE_USD[data.service] ?? DEFAULT_LEAD_VALUE_USD,
        });

        // Tagowa konwersja Google Ads. Milczy, dopóki nie ma etykiety akcji —
        // konwersja form_submit jest importowana z GA4, więc etykieta jest
        // potrzebna tylko przy osobnej akcji tagowej.
        const adsId = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || 'AW-18426058950';
        const adsLabel = process.env.NEXT_PUBLIC_GOOGLE_ADS_LEAD_LABEL;
        if (adsId && adsLabel) {
          window.gtag('event', 'conversion', {
            send_to: `${adsId}/${adsLabel}`,
            value: LEAD_VALUE_USD[data.service] ?? DEFAULT_LEAD_VALUE_USD,
            currency: 'USD',
          });
        }
      }

      e.target.reset(); // Clear the form
      setService('');
      setTimeout(() => setFormSubmitted(false), 8000);
    } catch (err) {
      setErrorMessage(err.message);
      // Pomiar rozszerzony GA4 liczy form_submit przed odpowiedzią API, więc bez
      // tego zdarzenia awaria wysyłki wygląda w raportach jak porzucenie formularza.
      track('form_error', {
        error_message: String((err && err.message) || err).slice(0, 100),
        plan: service || 'none',
      });
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
              <li><span style={{ fontWeight: 'bold' }}>{lang === 'pl' ? 'Telefon:' : 'Phone:'}</span> <a href="tel:+48518815055" data-cta="contact" style={{ color: 'inherit', textDecoration: 'underline' }}>518 815 055</a></li>
              <li><span style={{ fontWeight: 'bold' }}>E-mail:</span> <a href="mailto:kontakt@ai-seo-company.pl" data-cta="contact" style={{ color: 'inherit', textDecoration: 'underline' }}>kontakt@ai-seo-company.pl</a></li>
              <li><span style={{ fontWeight: 'bold' }}>NIP:</span> 5253090237</li>
              <li><span style={{ fontWeight: 'bold' }}>{lang === 'pl' ? 'Czas odpowiedzi:' : 'Response Time:'}</span> {lang === 'pl' ? 'Zazwyczaj < 2 godziny w godz. 9–18' : 'Usually within 2 hours (9 am–6 pm CET), otherwise next business morning'}</li>
            </ul>
          </RevealItem>

          <RevealItem>
            <form className="contact-form" onSubmit={handleSubmit}>
            {formSubmitted && (
              <div style={{ background: '#EFF8E6', color: '#639922', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem', fontWeight: '600' }}>
                {lang === 'pl' ? '✓ Dziękujemy! Twoje zapytanie zostało wysłane. Odpowiemy w ciągu 2 godzin w godzinach pracy (9–18).' : '✓ Thank you! Your request has been received. We reply within 2 hours during business hours (9 am–6 pm CET), otherwise the next business morning.'}
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
              <select id="service" name="service" className="form-select" value={service} onInvalid={handleInvalid} onInput={handleInput} onChange={(e) => { setService(e.target.value); if (e.target.value) track('select_plan', { plan: e.target.value }); }}>
                <option value="">{lang === 'pl' ? 'Wybierz pakiet (opcjonalnie)' : 'Select plan (optional)'}</option>
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
                placeholder={lang === 'pl' ? 'Opcjonalnie: adres strony, cele i termin...' : 'Optional: your website URL, goals and timeline...'}
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
