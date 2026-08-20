import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import plMessages from '../../messages/pl.json';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch {
    messages = plMessages;
  }

  return {
    locale,
    messages,
    onError(error) {
      if (process.env.NODE_ENV !== 'production') {
        console.warn('next-intl error:', error);
      }
    },
    getMessageFallback({ namespace, key }) {
      try {
        const path = [namespace, key].filter(Boolean).join('.');
        let val: any = plMessages;
        for (const k of path.split('.')) {
          if (val && typeof val === 'object' && k in val) {
            val = val[k];
          } else {
            return key;
          }
        }
        return typeof val === 'string' ? val : key;
      } catch {
        return key;
      }
    }
  };
});
