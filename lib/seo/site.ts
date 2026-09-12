import type { Metadata } from 'next';
import { SUPPORTED_LOCALES, type Locale, type Translations } from '@/lib/i18n/types';
import { localePath } from '@/lib/i18n/routing';
import { seoCopy } from './copy';

const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jingcaithread.com';
const parsedUrl = new URL(configuredUrl);
if (!['https:', 'http:'].includes(parsedUrl.protocol) || parsedUrl.pathname !== '/' || parsedUrl.search || parsedUrl.hash) throw new Error('NEXT_PUBLIC_SITE_URL must be an origin, e.g. https://jingcaithread.com');
export const SITE_URL = parsedUrl.origin;
export const INDEXABLE = process.env.SEO_INDEXABLE !== 'false';
export const absoluteUrl = (path: string) => new URL(path, SITE_URL).toString();
export const languageAlternates = Object.fromEntries([
  ...SUPPORTED_LOCALES.map(item => [item.code, absoluteUrl(localePath(item.code))]),
  ['x-default', absoluteUrl('/')],
]);
const ogLocales: Record<Locale, string> = { en:'en_US', ar:'ar_AR', es:'es_ES', ru:'ru_RU', fr:'fr_FR', pt:'pt_BR', de:'de_DE', ja:'ja_JP', ko:'ko_KR', vi:'vi_VN' };

export function pageMetadata(locale: Locale): Metadata {
  const { title, description } = seoCopy[locale];
  return {
    metadataBase: new URL(SITE_URL), title, description,
    applicationName: 'JINGCAI Thread',
    alternates: { canonical: absoluteUrl(localePath(locale)), languages: languageAlternates },
    robots: { index: INDEXABLE, follow: INDEXABLE, ...(INDEXABLE ? { googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 } } : {}) },
    openGraph: { type:'website', title, description, url:absoluteUrl(localePath(locale)), siteName:'JINGCAI Thread', locale:ogLocales[locale], alternateLocale:SUPPORTED_LOCALES.filter(item => item.code !== locale).map(item => ogLocales[item.code]), images:[{url:absoluteUrl('/images/hero.webp'), alt:'JINGCAI sewing thread collection'}] },
    twitter: { card:'summary_large_image', title, description, images:[absoluteUrl('/images/hero.webp')] },
    icons: { icon:'/favicon.svg' },
    ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google:process.env.GOOGLE_SITE_VERIFICATION } } : {}),
  };
}

export function structuredData(locale: Locale, dictionary: Translations) {
  const url = absoluteUrl(localePath(locale));
  const organization = absoluteUrl('/#organization');
  return {
    '@context':'https://schema.org',
    '@graph':[
      { '@type':'Organization', '@id':organization, name:'Pujiang Jingcai Thread Co., Ltd.', alternateName:'JINGCAI Thread', url:absoluteUrl('/'), foundingDate:'1995', logo:absoluteUrl('/favicon.svg'), sameAs:['https://www.facebook.com/isla.zhu','https://www.tiktok.com/@jingcai.thread'], contactPoint:{ '@type':'ContactPoint', telephone:'+86-182-0589-4588', contactType:'sales', availableLanguage:['English','Chinese'] } },
      { '@type':'WebSite', '@id':absoluteUrl('/#website'), url:absoluteUrl('/'), name:'JINGCAI Thread', publisher:{'@id':organization}, inLanguage:SUPPORTED_LOCALES.map(item => item.code) },
      { '@type':'WebPage', '@id':url+'#webpage', url, name:seoCopy[locale].title, description:seoCopy[locale].description, inLanguage:locale, isPartOf:{'@id':absoluteUrl('/#website')}, about:{'@id':organization} },
      { '@type':'FAQPage', '@id':url+'#faq', inLanguage:locale, isPartOf:{'@id':url+'#webpage'}, mainEntity:dictionary.faq.items.map(item => ({'@type':'Question', name:item.q, acceptedAnswer:{'@type':'Answer',text:item.a}})) },
    ],
  };
}
