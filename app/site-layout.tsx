import localFont from 'next/font/local';
import Script from 'next/script';
import type { ReactNode } from 'react';
import { LanguageProvider } from '@/lib/i18n/context';
import { SUPPORTED_LOCALES, type Locale } from '@/lib/i18n/types';
import { translations } from '@/lib/i18n/translations';
import { structuredData } from '@/lib/seo/site';
import './globals.css';

const geist = localFont({ src: '../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2', variable:'--font-geist-sans', display:'swap', weight:'100 900' });
export function SiteLayout({children, locale}:{children:ReactNode;locale:Locale}) {
  const dictionary=translations[locale];
  const config=SUPPORTED_LOCALES.find(item => item.code===locale)!;
  return <html lang={locale} dir={config.dir}><body className={geist.variable}>
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-QXG89MTCNR"
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-QXG89MTCNR');
      `}
    </Script>

    <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(structuredData(locale,dictionary)).replace(/</g,'\\u003c')}} />
    <LanguageProvider locale={locale} dictionary={dictionary}>{children}</LanguageProvider>
</body></html>;
}
