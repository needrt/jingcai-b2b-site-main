import { notFound } from 'next/navigation';
import Home from '../home';
import { pageMetadata } from '@/lib/seo/site';
import { SUPPORTED_LOCALES } from '@/lib/i18n/types';
import { isLocale } from '@/lib/i18n/routing';
export const dynamicParams = false;
export function generateStaticParams() { return SUPPORTED_LOCALES.filter(item => item.code!=='en').map(item => ({locale:item.code})); }
export async function generateMetadata({params}:{params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if (!isLocale(locale) || locale==='en') notFound();
  return pageMetadata(locale);
}
export default function Page() { return <Home />; }
