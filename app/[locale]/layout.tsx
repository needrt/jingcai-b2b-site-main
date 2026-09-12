import { notFound } from 'next/navigation';
import { SiteLayout } from '../site-layout';
import { isLocale } from '@/lib/i18n/routing';
import type { ReactNode } from 'react';
export default async function LocalizedLayout({children,params}:{children:ReactNode;params:Promise<{locale:string}>}) {
  const {locale}=await params;
  if (!isLocale(locale) || locale==='en') notFound();
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
