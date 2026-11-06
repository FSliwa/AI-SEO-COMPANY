import PanelPageClient from '@/components/PanelPageClient';

export async function generateMetadata({ params }) {
  const { locale } = await params;
  // 5.11.2026 (PLAN-v2 6.22, PK1; OP-11 po weryfikacji): title PL bez Title Case i bez frazy
  // strony głównej na początku („agencja seo” należy do /, strażnik fraz) - 52 zn.; meta PL
  // zgodna z treścią strony: zapytania i dziennik prac codziennie, pozycje fraz co tydzień
  // (PanelPageClient: „tydzień po tygodniu”), AI tylko w SEO Premium, więc nie w meta - 129 zn.
  // EN bez zmian.
  return {
    title: locale === 'en' ? 'Client Portal: SEO Results and Our Work 24/7' : 'Panel klienta agencji SEO: wyniki i prace na bieżąco',
    description: locale === 'en'
      ? 'The AI SEO COMPANY client portal: Google data, enquiries, a work log and site changes every day. Open the demo without logging in.'
      : 'Panel klienta SEO: zapytania i dziennik prac codziennie, pozycje fraz co tydzień, raporty PDF i linki. Zobacz demo bez logowania.',
    alternates: {
      canonical: locale === 'en' ? 'https://www.ai-seo-company.pl/en/client-portal' : 'https://www.ai-seo-company.pl/panel-klienta',
      languages: {
        'pl': 'https://www.ai-seo-company.pl/panel-klienta',
        'x-default': 'https://www.ai-seo-company.pl/panel-klienta',
        'en': 'https://www.ai-seo-company.pl/en/client-portal'
      }
    },
  };
}

export default function PanelKlientaPage() {
  return <PanelPageClient />;
}
