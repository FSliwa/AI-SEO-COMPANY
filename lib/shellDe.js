// Teksty powłoki serwisu (nagłówek, stopka, formularz, baner zgody) po niemiecku. Czysty ESM bez
// importów. Komponenty dotąd miały pary 'PL' / 'EN' w jednej linii (lang === 'pl' ? 'PL' : 'EN');
// teraz wołają tr(lang, pl, en): dla 'pl' i 'en' zwraca dokładnie ten sam tekst co wcześniej (HTML
// PL/EN bez zmian), dla 'de' szuka angielskiego tekstu w słowniku DE_PO_ANGIELSKU. Brak wpisu =
// tekst EN (widoczne w podglądzie, wychwytuje to scripts/kontrola-shell-de.mjs).
// Terminologia: /Users/filipsliwa/Projekty/ai-seo-prace/de/de-fundament/GLOSSAR.md.

export const DE_PO_ANGIELSKU = {
  // Header
  'AI SEO COMPANY homepage': 'Startseite von AI SEO COMPANY',
  'Client portal demo': 'Demo des Kundenportals',
  'Site language': 'Sprache der Website',
  'Log in to the client portal': 'Im Kundenportal anmelden',
  'Log in': 'Anmelden',
  'Open menu': 'Menü öffnen',
  'Close menu': 'Menü schließen',
  'Main menu': 'Hauptmenü',
  'SEO Audit': 'SEO Audit',
  'SEO Services': 'B2B SEO',
  'Local SEO': 'Lokales SEO',
  'Google Business Profile': 'Google Unternehmensprofil',
  'AI Search': 'Generative Engine Optimization',
  'AI Visibility Check': 'KI-Sichtbarkeit prüfen',
  'Free Tools': 'Kostenlose Tools',
  'Web Design': 'Webdesign',
  'About Us': 'Über uns',
  'Contact': 'Kontakt',
  'Free Quote': 'Kostenloses Angebot',
  'Client Portal': 'Kundenportal',
  'Portal login': 'Anmeldung zum Portal',
  'Email Us': 'Schreiben Sie uns',
  'Call us': 'Rufen Sie uns an',
  // Footer
  'Start your project →': 'Projekt anfragen →',
  'is a brand of:': 'ist eine Marke von:',
  'District Court for the Capital City of Warsaw': 'Registergericht: Amtsgericht für die Hauptstadt Warschau',
  'Navigation': 'Navigation',
  'AI visibility check': 'KI-Sichtbarkeit prüfen',
  'Switching SEO agencies': 'SEO Agentur wechseln',
  'Comparisons': 'Vergleiche',
  'Free tools': 'Kostenlose Tools',
  'Website SEO': 'B2B SEO',
  'WordPress SEO': 'WordPress SEO Agentur',
  'Webflow SEO': 'Webflow SEO Agentur',
  'SEO Audit & Analysis': 'SEO Audit und Analyse',
  'Local SEO Warsaw': 'Lokales SEO in Warschau',
  'Local SEO Mazovia': 'Lokales SEO Masowien',
  'AI Search Optimization': 'Generative Engine Optimization',
  'Get Proposal Form': 'Anfrageformular',
  'Privacy Policy': 'Datenschutzerklärung',
  'Terms of Service': 'AGB',
  'Cookie settings': 'Cookie-Einstellungen',
  // Cookie banner
  'Close': 'Schließen',
  'Always Active': 'Immer aktiv',
  // Contact
  'Please fill in this field.': 'Bitte füllen Sie dieses Feld aus.',
  'Please enter a valid email address.': 'Bitte geben Sie eine gültige E-Mail-Adresse ein.',
  'Please select one of the options.': 'Bitte wählen Sie eine der Optionen aus.',
  'Address:': 'Adresse:',
  'Phone:': 'Telefon:',
  'Opening hours:': 'Öffnungszeiten:',
  'Response Time:': 'Antwortzeit:',
  'Within 24 h on business days, usually sooner': 'Innerhalb von 24 Stunden an Werktagen, meist schneller',
  '✓ Thank you! Your request has been received. We reply within 24 h on business days, usually sooner.': '✓ Vielen Dank! Ihre Anfrage ist bei uns eingegangen. Wir antworten innerhalb von 24 Stunden an Werktagen, meist schneller.',
  'An error occurred: ': 'Es ist ein Fehler aufgetreten: ',
  'John Smith': 'Max Mustermann',
  'john@company.com': 'max@unternehmen.de',
  'Select plan (optional)': 'Paket wählen (optional)',
  'SEO Standard (€450 net/mo)': 'SEO Standard (450 € netto/Monat)',
  'SEO Premium (€590 net/mo)': 'SEO Premium (590 € netto/Monat)',
  'Booster Pack (€590 net - Free Website)': 'Booster Pack (590 € netto, Website inklusive)',
  'Custom Project': 'Individueller Leistungsumfang',
  'AI visibility audit (€235 net)': 'KI-Sichtbarkeit Audit (235 € netto)',
  'Free review after your previous agency (30 min)': 'Kostenloser Check nach Ihrer bisherigen Agentur (30 Min.)',
  'How did you hear about us? (optional)': 'Wie sind Sie auf uns aufmerksam geworden? (optional)',
  'Select (optional)': 'Bitte wählen (optional)',
  'Optional: your website URL, goals and timeline...': 'Optional: Adresse Ihrer Website, Ziele und Zeitrahmen ...',
  'Sending...': 'Wird gesendet ...',
  'We reply within 24 h on business days. No sales rep - you hear from the person doing the SEO.': 'Wir antworten innerhalb von 24 Stunden an Werktagen. Ohne Vertriebsmitarbeiter: Es antwortet die Person, die das SEO umsetzt.',
  'ChatGPT or another AI chat': 'ChatGPT oder ein anderer KI-Chat',
  'Google Maps': 'Google Maps',
  'Google Search': 'Google Suche',
  'Recommendation': 'Empfehlung',
  'Other': 'Sonstiges',
  // Breadcrumbs
  'Home': 'Startseite',
  'Breadcrumb': 'Brotkrumennavigation',
};

/** Tekst w danym języku: 'de' -> słownik (po angielskim tekście), 'pl' -> pl, reszta -> en. */
export function tr(lang, pl, en) {
  if (lang === 'de') return DE_PO_ANGIELSKU[en] ?? en;
  return lang === 'pl' ? pl : en;
}
