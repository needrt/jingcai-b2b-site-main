'use client';

import { Globe2, ChevronDown, Check } from 'lucide-react';
import { useI18n, localePath } from '@/lib/i18n';
import { DirectionProvider } from '@/components/ui/direction';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuGroup, DropdownMenuItem } from '@/components/ui/dropdown-menu';

export function LanguageSwitcher({className=''}:{className?:string}) {
  const {locale,locales,currentConfig,t}=useI18n();
  return <DirectionProvider direction="ltr"><DropdownMenu>
    <DropdownMenuTrigger className={`language-trigger ${className}`} aria-label={t.header.langSelectLabel}>
      <Globe2 size={16} aria-hidden="true" /><bdi lang={locale}>{currentConfig.nativeName}</bdi><ChevronDown size={12} aria-hidden="true" />
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end" sideOffset={10} className="language-panel" dir="ltr"><DropdownMenuGroup>
      <DropdownMenuLabel className="language-panel-label"><bdi>{t.header.langSelectLabel}</bdi></DropdownMenuLabel>
      {locales.map(item => <DropdownMenuItem key={item.code} className="language-option" data-checked={item.code===locale ? '' : undefined} render={<a href={localePath(item.code)} hrefLang={item.code} aria-current={item.code===locale ? 'page' : undefined} />}>
        <bdi lang={item.code}>{item.nativeName}</bdi>{item.code===locale && <Check size={15} style={{position:'absolute',right:8}} aria-hidden="true" />}
      </DropdownMenuItem>)}
    </DropdownMenuGroup></DropdownMenuContent>
  </DropdownMenu></DirectionProvider>;
}
