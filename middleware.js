import createMiddleware from 'next-intl/middleware';
 
export default createMiddleware({
  // A list of all locales that are supported
  locales: ['pl', 'en'],
 
  // Used when no locale matches
  defaultLocale: 'pl',
  
  // If you don't want the default locale to show in the URL, you can set it to 'as-needed' or 'always'
  localePrefix: 'always'
});
 
export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(pl|en)/:path*']
};
