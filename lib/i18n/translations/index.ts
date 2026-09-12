import type { Locale, Translations } from '../types';
import { en } from './en';
import { ar } from './ar';
import { es } from './es';
import { ru } from './ru';
import { fr } from './fr';
import { pt } from './pt';
import { de } from './de';
import { ja } from './ja';
import { ko } from './ko';
import { vi } from './vi';

export const translations: Record<Locale, Translations> = {
  en,
  ar,
  es,
  ru,
  fr,
  pt,
  de,
  ja,
  ko,
  vi,
};

export { en, ar, es, ru, fr, pt, de, ja, ko, vi };
