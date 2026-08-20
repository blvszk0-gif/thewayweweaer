'use client';

import React, { useState } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/routing';
import { useTranslations, useLocale } from 'next-intl';
import { ContactWizard } from './ContactWizard';
import { NewsletterWizard } from './NewsletterWizard';

export const Footer = () => {
  const tNav = useTranslations('nav');
  const tHome = useTranslations('home');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNewsletterWizardOpen, setIsNewsletterWizardOpen] = useState(false);

  const handleLanguageChange = (targetLocale: 'pl' | 'en' | 'uk') => {
    document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000`;
    router.replace(pathname, { locale: targetLocale });
  };

  return (
    <footer className="bg-[color:var(--surface-muted)] text-[color:var(--foreground)] py-24 border-t border-[color:var(--border)] font-antonio">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        {/* Help */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">
            {tNav('pomoc')}
          </h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
            <li><Link href="/account" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('moje_konto')}</Link></li>
            <li><Link href="/account?tab=orders" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('moje_zakupy')}</Link></li>
            <li><Link href="/zwroty" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('zwroty')}</Link></li>
            <li>
              <button onClick={() => setIsContactOpen(true)} className="hover:text-[color:var(--foreground)] transition-colors text-left uppercase">
                {tNav('wyślij_zapytanie_lub_zgłoszenie')}
              </button>
            </li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">
            {tNav('polityka')}
          </h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
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
            <li><Link href="/blog" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('nasza_historia')}</Link></li>
            <li><Link href="/unboxing" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('unboxing')}</Link></li>
            <li><Link href="/karta-podarunkowa" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('karta_podarunkowa')}</Link></li>
            <li><Link href="/sledz-nas" className="hover:text-[color:var(--foreground)] transition-colors">{tNav('śledź_nas')}</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">
            {tNav('konto')}
          </h4>
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 italic">{tNav('bądź_częścią_twww_club')}</p>
              <button
                onClick={() => setIsNewsletterWizardOpen(true)}
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[12px] shadow-lg hover:scale-[1.02] transition-transform"
              >
                {tNav('zapisz_się_do_newslettera')}
              </button>
            </div>
            <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
              <li><Link href="/usun-konto" className="hover:text-[color:var(--foreground)] transition-colors text-[14px]">{tNav('usuń_swoje_konto')}</Link></li>
            </ul>
          </div>
        </div>
      </div>

      <ContactWizard isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      <NewsletterWizard isOpen={isNewsletterWizardOpen} onClose={() => setIsNewsletterWizardOpen(false)} />

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
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${
                locale === 'pl' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
              }`}
            >
              PL <span className="text-xl">🇵🇱</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('en')}
              aria-pressed={locale === 'en'}
              aria-current={locale === 'en' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${
                locale === 'en' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
              }`}
            >
              ENG <span className="text-xl">🇬🇧</span>
            </button>
            <button
              type="button"
              onClick={() => handleLanguageChange('uk')}
              aria-pressed={locale === 'uk'}
              aria-current={locale === 'uk' ? 'true' : undefined}
              className={`px-4 py-2 rounded-full border border-[color:var(--border)] font-black flex items-center gap-2 transition-all ${
                locale === 'uk' ? 'bg-[color:var(--foreground)] text-[color:var(--surface)]' : 'text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)]'
              }`}
            >
              UKR <span className="text-xl">🇺🇦</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
