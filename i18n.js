import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

import {DE_AKTYWNE} from './lib/stronyDe';

const locales = DE_AKTYWNE ? ['pl', 'en', 'de'] : ['pl', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locales.includes(locale)) notFound();

  const messages = (await import(`./messages/${locale}.json`)).default;
  // DE: tekst sekcji strony głównej leży w osobnym pliku grupy de-uslugi (bez edycji wspólnego de.json).
  if (locale === 'de') {
    const home = (await import('./messages/de.home.json')).default;
    return { locale, messages: { ...messages, ...home } };
  }
  return {
    locale,
    messages
  };
});
