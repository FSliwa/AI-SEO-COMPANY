// Texte der Seite /de/ueber-uns. Firmendaten und Aussagen wie auf /o-nas (components/about/*, Footer.jsx, layout.js).
import { PREISE } from './uslugiGemeinsam.js';
import { eur } from '../formatDe.js';

export const ENTITAET = `AI SEO COMPANY ist eine SEO Agentur und Agentur für Generative Engine Optimization (GEO) aus Warschau für kleine und mittlere Unternehmen: SEO für Websites und Google Unternehmensprofile, SEO Audits, Websites mit Next.js und - in SEO Premium - eine wöchentliche Messung der Sichtbarkeit in ChatGPT, Perplexity, Gemini und den KI-Antworten von Google. Jeder Kunde erhält ein Kundenportal rund um die Uhr, einen Monatsvertrag und transparente Preise ab ${eur(PREISE.standard, 'de')} netto pro Monat.`;

export const GRUNDSAETZE = [
  { kicker: 'KI UND DATEN', titel: 'Strategie auf Basis harter Daten', text: 'Wir raten nicht. Wir nutzen fortgeschrittene Analytik und KI-Algorithmen für präzises SEO und eine saubere Inhaltsarchitektur, damit jede Entscheidung durch Daten gedeckt ist.' },
  { kicker: 'DESIGN', titel: 'Konsequent klare, minimalistische Gestaltung', text: 'Gutes Design schafft Vertrauen und erleichtert die Entscheidung. Wir gestalten klare, minimalistische Oberflächen, die sich schnell erfassen lassen.' },
  { kicker: 'CRO UND CONVERSION', titel: 'Conversion-Optimierung', text: 'Traffic ist nur der Anfang. Unsere Projekte sind von Grund auf so angelegt, dass aus anonymen Besuchern zahlende, treue Kunden werden.' },
  { kicker: 'PARTNERSCHAFT', titel: 'Wir behandeln Ihr Geschäft wie unser eigenes', text: 'Wir sind nicht nur Auftragnehmer, sondern werden zur Verlängerung Ihres Teams. Wir setzen uns mit Ihrem Geschäftsmodell auseinander, um gemeinsam langfristigen Erfolg aufzubauen.' },
  { kicker: 'INNOVATION', titel: 'Wir ruhen uns nicht aus', text: 'Technologie und Algorithmen ändern sich täglich. Deshalb lernen wir laufend und passen unsere Arbeitsweise an, sobald sich etwas ändert.' },
];

export const METHODE = [
  { kicker: 'SCHRITT 1', titel: 'Architektur und Design', text: 'UX/UI-Gestaltung und ein solides technisches Fundament.' },
  { kicker: 'SCHRITT 2', titel: 'Fortgeschrittenes SEO', text: 'Aufbau der Inhaltsstruktur, technisches SEO und organisches Wachstum.' },
  { kicker: 'SCHRITT 3', titel: 'Conversion', text: 'Aus organischem Traffic werden echte, zahlende Kunden.' },
];

export const TEAM = [
  { kicker: 'TECH UND ARCHITEKTUR', titel: 'Schnelle Websites und sauberer Code', text: 'Das Entwicklungsteam setzt moderne Lösungen auf Basis von Next.js und Serverless-Architektur um. Im Lighthouse-Test vom 24.09.2026 erreichten wir mobil 98-99 von 100 Punkten.', plakette: 'Lighthouse mobil 98-99/100 (24.09.2026)', rolle: 'Performance • Skalierbarkeit • Next.js' },
  { kicker: 'STRATEGIE UND SEO', titel: 'Datenbasierte Sichtbarkeit', text: 'Wir verfolgen Änderungen in den Suchmaschinen und in der Dokumentation von Google. Wir stützen uns auf präzises Keyword-Mapping und sauberen Linkaufbau, um die organische Sichtbarkeit Ihres Unternehmens aufzubauen.', plakette: 'Ziel: Top 3', rolle: 'Analytik • Linkaufbau • KI' },
  { kicker: 'KREATIVES UND UX', titel: 'Gestaltung, die verkauft', text: 'Unser Kreativteam verbindet klare, minimalistische Ästhetik mit Erkenntnissen der Konsumentenpsychologie. Jede Oberfläche soll nicht nur gut aussehen, sondern den Kunden zum Warenkorb oder zum Kontaktformular führen.', plakette: 'ROI im Fokus', rolle: 'Designsystem • Branding • Conversion' },
];

export const WERTE = [
  { titel: 'Transparenz', text: 'Keine versteckten Kosten, keine vagen Berichte. Unsere Kunden erhalten vollen Einblick in das, was wir tun, wie wir es tun und warum.' },
  { titel: 'Liebe zum Detail', text: 'Jedes Pixel, jede H1-Überschrift und jede Zeile Code behandeln wir als wichtigen Teil des Geschäfts. Die Summe sauber ausgeführter Details macht den Unterschied.' },
  { titel: 'Fokus auf Ihren Umsatz', text: 'Wir optimieren nicht für schöne Diagramme. Unser Ziel ist immer das messbare Wachstum Ihres Umsatzes.' },
];
