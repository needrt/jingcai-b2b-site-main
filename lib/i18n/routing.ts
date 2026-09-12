import { SUPPORTED_LOCALES, type Locale } from './types';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && SUPPORTED_LOCALES.some(item => item.code === value);
}
export function localePath(locale: Locale) { return locale === 'en' ? '/' : `/${locale}/`; }
