import {getRequestConfig} from 'next-intl/server';
import {notFound} from 'next/navigation';

const locales = ['pl', 'en'];

export default getRequestConfig(async ({requestLocale}) => {
  let locale = await requestLocale;
  
  if (!locales.includes(locale)) notFound();

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
