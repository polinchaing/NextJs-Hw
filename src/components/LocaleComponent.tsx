'use client'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import Image from "next/image";
import KhmerFlag from '../../public/icons/cambodia-flag.png'
import EnglishFlag from '../../public/icons/england.png'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Fixed: Corrected flag assignments and added emojis as fallback
const LocaleSwitches = {
    en: { 
        label: 'English', 
        flag: EnglishFlag, // Fixed: English should have English flag
        code: 'EN',
        emoji: '🇺🇸'
    },
    km: { 
        label: 'ខ្មែរ', 
        flag: KhmerFlag, // Fixed: Khmer should have Cambodia flag
        code: 'KM',
        emoji: '🇰🇭'
    }
} as const;

type LocaleKeyType = keyof typeof LocaleSwitches;

interface LocaleSwitcherProps {
  currentLocale?: LocaleKeyType;
  variant?: 'dropdown' | 'buttons' | 'compact';
}

export default function LocaleSwitcher({ 
  currentLocale = 'en',
  variant = 'dropdown'
}: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  
  // Extract the current locale from pathname
  const pathSegments = pathname.split('/');
  const detectedLocale = (pathSegments[1] === 'en' || pathSegments[1] === 'km') 
    ? pathSegments[1] as LocaleKeyType 
    : currentLocale;

  function switchLocale(locale: LocaleKeyType) {
    if (locale === detectedLocale) return;
    
    startTransition(() => {
      // Remove current locale from path and add new one
      const pathWithoutLocale = pathname.replace(/^\/[^\/]+/, '') || '/';
      const newPath = `/${locale}${pathWithoutLocale}`;
      
      router.push(newPath);
    });
  }

  if (variant === 'buttons') {
    return (
      <div className="flex gap-2">
        {Object.entries(LocaleSwitches).map(([key, { label, flag, code}]) => (
          <Button
            key={key}
            onClick={() => switchLocale(key as LocaleKeyType)}
            disabled={isPending || key === detectedLocale}
            variant={key === detectedLocale ? "default" : "outline"}
            size="sm"
            className={`gap-2 font-medium px-4 transition-all duration-200 ${
              key === detectedLocale
                ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                : "hover:bg-gray-100"
            }`}
          >
            {/* Fixed: Use Image component for flag display */}
            <Image 
              src={flag} 
              alt={`${label} flag`} 
              width={20} 
              height={15} 
              className="rounded-sm"
            />
            <span className="hidden sm:inline">{label}</span>
            <span className="sm:hidden">{code}</span>
            {key === detectedLocale && <Check className="w-4 h-4" />}
          </Button>
        ))}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="flex gap-1">
        {Object.entries(LocaleSwitches).map(([key, {  code, emoji }]) => (
          <Button
            key={key}
            onClick={() => switchLocale(key as LocaleKeyType)}
            disabled={isPending}
            variant="ghost"
            size="sm"
            className={`gap-1 h-8 px-2 transition-colors ${
              key === detectedLocale 
                ? "bg-white/20 text-white" 
                : "text-white/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            {/* Fixed: Use emoji for compact variant */}
            <span className="text-sm">{emoji}</span>
            <span className="text-xs font-medium">{code}</span>
          </Button>
        ))}
      </div>
    );
  }

  // Dropdown variant (default)
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm"
          className="gap-2 min-w-[120px] bg-white/10 border-white/20 text-white hover:bg-white/20"
          disabled={isPending}
        >
          <Globe className="w-4 h-4" />
          {/* Fixed: Use emoji instead of flag object */}
          <span className="text-base">{LocaleSwitches[detectedLocale].emoji}</span>
          <span className="hidden sm:inline text-sm">
            {LocaleSwitches[detectedLocale].label}
          </span>
          <span className="sm:hidden text-xs">
            {LocaleSwitches[detectedLocale].code}
          </span>
          <ChevronDown className="w-4 h-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Object.entries(LocaleSwitches).map(([key, { label, flag, code, emoji }]) => (
          <DropdownMenuItem
            key={key}
            onClick={() => switchLocale(key as LocaleKeyType)}
            disabled={isPending}
            className="flex items-center gap-3 cursor-pointer"
          >
            {/* Fixed: Proper flag display with Image component */}
            <div className="flex items-center gap-2">
              <span className="text-base">{emoji}</span>
              <Image 
                src={flag} 
                alt={`${label} flag`} 
                width={20} 
                height={15} 
                className="rounded-sm"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-medium">{label}</span>
              <span className="text-xs text-muted-foreground">{code}</span>
            </div>
            {key === detectedLocale && (
              <Check className="w-4 h-4 ml-auto text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}