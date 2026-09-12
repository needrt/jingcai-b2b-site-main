import { SiteLayout } from '../site-layout';
import type { ReactNode } from 'react';
export default function EnglishLayout({children}:{children:ReactNode}) { return <SiteLayout locale="en">{children}</SiteLayout>; }
