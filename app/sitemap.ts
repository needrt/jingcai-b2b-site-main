import type { MetadataRoute } from 'next';
import { SUPPORTED_LOCALES } from '@/lib/i18n/types';
import { localePath } from '@/lib/i18n/routing';
import { absoluteUrl, languageAlternates } from '@/lib/seo/site';
export const dynamic = 'force-static';
export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.map(item => ({url:absoluteUrl(localePath(item.code)),alternates:{languages:languageAlternates}}));
}
