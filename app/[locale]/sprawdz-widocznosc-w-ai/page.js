import AiCheckerClient from '@/components/AiCheckerClient';
import { wpisEn } from '@/lib/stronyEn';

// Sprawdzarka zadaje pytania firmom z Polski. Od 9.11.2026 ma wersję EN (/en/ai-visibility-check,
// tytuł i opis z lib/stronyEn.js), z hreflang w obie strony.
const SCIEZKA = '/sprawdz-widocznosc-w-ai';
const BASE = 'https://www.ai-seo-company.pl';
const URL_PL = `${BASE}${SCIEZKA}`;

export async function generateMetadata({ params }) {
  const { locale } = await params;
  const en = wpisEn(SCIEZKA);
  const urlEn = `${BASE}/en${en.en}`;
  const languages = { pl: URL_PL, en: urlEn, 'x-default': URL_PL };
  if (locale === 'en') {
    return {
      title: en.tytul,
      description: en.opis,
      alternates: { canonical: urlEn, languages },
      // openGraph strony zastępuje cały openGraph layoutu, więc og:image i siteName podajemy tu jak w layoucie.
      openGraph: {
        title: en.tytul,
        description: en.opis,
        url: urlEn,
        type: 'website',
        locale: 'en_US',
        siteName: 'AI SEO COMPANY',
        images: [{ url: `${BASE}/og-image.jpg`, width: 1024, height: 1024, alt: 'AI SEO COMPANY | Agencja SEO Warszawa' }],
      },
    };
  }
  return {
    // 4.11.2026: title pod „widoczność w ai” (90/mies., w VII.2026 590); H1 bez zmian.
    title: 'Widoczność w AI: sprawdź, czy ChatGPT poleca Twoją firmę',
    // 9.11.2026: audyt w 5 silnikach AI (WidocznoscAiClient).
    description: 'Bezpłatna sprawdzarka widoczności w AI: pytania Twoich klientów zadajemy ChatGPT, Gemini, Perplexity, Claude i Google i pokazujemy, czy wymieniają Twoją firmę.',
    alternates: { canonical: URL_PL, languages },
  };
}

export default async function SprawdzWidocznoscPage() {
  return <AiCheckerClient />;
}
