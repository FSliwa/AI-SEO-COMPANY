export async function generateMetadata({ params }) {
  const { locale } = await params;
  return {
  title: 'Polityka Cookies | AI SEO COMPANY',
  description: 'Informacje o plikach cookies i sposobach ich wykorzystania na stronie agencji AI SEO COMPANY.',
  alternates: {
    canonical: `/${locale}/cookies`,
  },
};
}

import CookiesContent from './CookiesContent';

export default function CookiesPage() {
  return <CookiesContent />;
}
