'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ContactWizard } from './ContactWizard';
import { NewsletterWizard } from './NewsletterWizard';

export const Footer = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isNewsletterWizardOpen, setIsNewsletterWizardOpen] = useState(false);

  return (
    <footer className="bg-[color:var(--surface-muted)] text-[color:var(--foreground)] py-24 border-t border-[color:var(--border)] font-antonio">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        {/* Help */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">Pomoc</h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
            <li><Link href="/account" className="hover:text-[color:var(--foreground)] transition-colors">Moje konto</Link></li>
            <li><Link href="/account?tab=orders" className="hover:text-[color:var(--foreground)] transition-colors">Moje zakupy</Link></li>
            <li><Link href="/zwroty" className="hover:text-[color:var(--foreground)] transition-colors">Zwroty</Link></li>
            <li><button onClick={() => setIsContactOpen(true)} className="hover:text-[color:var(--foreground)] transition-colors text-left uppercase">Wyślij zapytanie lub zgłoszenie</button></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">Polityka</h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/polityka-prywatnosci" className="hover:text-[color:var(--foreground)] transition-colors">Polityka prywatności</Link></li>
            <li><Link href="/warunki-zakupow" className="hover:text-[color:var(--foreground)] transition-colors">Warunki zakupów</Link></li>
            <li><Link href="/dane-osobowe" className="hover:text-[color:var(--foreground)] transition-colors">Ochrona danych osobowych</Link></li>
            <li><Link href="/cookies" className="hover:text-[color:var(--foreground)] transition-colors">Pliki cookie</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">O nas</h4>
          <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/blog" className="hover:text-[color:var(--foreground)] transition-colors">Nasza historia</Link></li>
            <li><Link href="/unboxing" className="hover:text-[color:var(--foreground)] transition-colors">Unboxing</Link></li>
            <li><Link href="/karta-podarunkowa" className="hover:text-[color:var(--foreground)] transition-colors">Karta podarunkowa</Link></li>
            <li><Link href="/sledz-nas" className="hover:text-[color:var(--foreground)] transition-colors">Śledź nas</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-antonio">Konto</h4>
          <div className="flex flex-col gap-6">
            <div className="space-y-4">
              <p className="text-[11px] font-black uppercase tracking-[0.3em] opacity-30 italic">Bądź częścią TWWW Club:</p>
              <button
                onClick={() => setIsNewsletterWizardOpen(true)}
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-4 rounded-xl font-black uppercase tracking-[0.3em] text-[12px] shadow-lg hover:scale-[1.02] transition-transform"
              >
                Zapisz się do Newslettera
              </button>
            </div>
            <ul className="flex flex-col gap-4 text-[18px] font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
              <li><Link href="/usun-konto" className="hover:text-[color:var(--foreground)] transition-colors text-[14px]">Usuń swoje konto</Link></li>
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
            <span>Zmień język na:</span>
            <button className="px-4 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)] font-black flex items-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all">PL <span className="text-xl">🇵🇱</span></button>
            <button className="px-4 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)] font-black flex items-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all">ENG <span className="text-xl">🇬🇧</span></button>
            <button className="px-4 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)] font-black flex items-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all">UKR <span className="text-xl">🇺🇦</span></button>
          </div>
        </div>
      </div>
    </footer>
  );
};
