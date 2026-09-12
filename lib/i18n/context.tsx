'use client';

import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react';
import { type Locale, type Direction, type LocaleConfig, type Translations, SUPPORTED_LOCALES } from './types';
import { isLocale, localePath } from './routing';
import { DirectionProvider } from '@/components/ui/direction';

interface I18nContextValue {
  locale: Locale;
  dir: Direction;
  t: Translations;
  locales: LocaleConfig[];
  currentConfig: LocaleConfig;
}
const I18nContext = createContext<I18nContextValue | null>(null);

export function LanguageProvider({ children, locale, dictionary }: { children: ReactNode; locale: Locale; dictionary: Translations }) {
  // Retain explicit legacy language links. URL paths are now the source of truth;
  // browser language and storage never replace server-rendered content after hydration.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const legacy = params.get('lang') || params.get('locale');
    if (isLocale(legacy) && legacy !== locale) window.location.replace(localePath(legacy) + window.location.hash);
  }, [locale]);
  const value = useMemo(() => {
    const currentConfig = SUPPORTED_LOCALES.find(item => item.code === locale)!;
    return { locale, dir: currentConfig.dir, t: dictionary, locales: SUPPORTED_LOCALES, currentConfig };
  }, [locale, dictionary]);
  return <I18nContext.Provider value={value}><DirectionProvider direction={value.dir}>{children}</DirectionProvider></I18nContext.Provider>;
}
export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within a LanguageProvider');
  return context;
}
