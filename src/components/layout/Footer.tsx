'use client';

import React from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';

export const Footer = () => {
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const handleLanguageChange = (targetLocale: 'pl' | 'en' | 'uk') => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <footer className="bg-[color:var(--surface-muted)] text-[color:var(--foreground)] py-24 border-t border-[color:var(--border)] font-antonio">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8">
        {/* Policy */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">
            {tNav('polityka')}
          </h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/zwroty" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('zwroty')}</Link></li>
            <li><Link href="/polityka-prywatnosci" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('polityka_prywatności')}</Link></li>
            <li><Link href="/warunki-zakupow" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('warunki_zakupów')}</Link></li>
            <li><Link href="/dane-osobowe" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('ochrona_danych_osobowych')}</Link></li>
            <li><Link href="/cookies" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('pliki_cookie')}</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">
            {tNav('o_nas')}
          </h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/journal" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('nasza_historia')}</Link></li>
            <li><Link href="/unboxing" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('unboxing')}</Link></li>
            <li><Link href="/karta-podarunkowa" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('karta_podarunkowa')}</Link></li>
            <li><Link href="/sledz-nas" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('śledź_nas')}</Link></li>
          </ul>
        </div>

      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-[color:var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] font-bold text-[color:var(--foreground)]/30 tracking-[0.4em] uppercase">
        <p>© 2026 THE WAY WE WEAR. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[color:var(--foreground)]/80 uppercase tracking-[0.4em] text-[13px]">
            <span>{tNav('zmień_język_na')}</span>
            <button
              type="button"
              onClick={() => handleLanguageChange('pl')}
              aria-pressed={locale === 'pl'}
              aria-current={locale === 'pl' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${locale === 'pl' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
                }`}
            >
              PL <span className="fi fi-pl rounded-sm" style={{ width: '1.3em', height: '1.3em' }} />
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              aria-pressed={locale === 'en'}
              aria-current={locale === 'en' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${locale === 'en' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
                }`}
            >
              ENG <span className="fi fi-gb rounded-sm" style={{ width: '1.3em', height: '1.3em' }} />
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('uk')}
              aria-pressed={locale === 'uk'}
              aria-current={locale === 'uk' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${locale === 'uk' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
                }`}
            >
              UKR <span className="fi fi-ua rounded-sm" style={{ width: '1.3em', height: '1.3em' }} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
