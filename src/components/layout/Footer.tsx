'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-[color:var(--surface-muted)] text-[color:var(--foreground)] py-24 border-t border-[color:var(--border)] font-abel">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        {/* Help */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Pomoc</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
            <li><Link href="/moje-konto" className="hover:text-[color:var(--foreground)] transition-colors">Moje konto</Link></li>
            <li><Link href="/moje-zakupy" className="hover:text-[color:var(--foreground)] transition-colors">Moje zakupy</Link></li>
            <li><Link href="/zwroty" className="hover:text-[color:var(--foreground)] transition-colors">Zwroty</Link></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Polityka</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/polityka-prywatnosci" className="hover:text-[color:var(--foreground)] transition-colors">Polityka prywatności</Link></li>
            <li><Link href="/warunki-zakupow" className="hover:text-[color:var(--foreground)] transition-colors">Warunki zakupów</Link></li>
            <li><Link href="/dane-osobowe" className="hover:text-[color:var(--foreground)] transition-colors">Ochrona danych osobowych</Link></li>
            <li><Link href="/cookies" className="hover:text-[color:var(--foreground)] transition-colors">Pliki cookie</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">O nas</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-[color:var(--foreground)]/50 uppercase tracking-widest">
            <li><Link href="/historia" className="hover:text-[color:var(--foreground)] transition-colors">Nasza historia</Link></li>
            <li><Link href="/unboxing" className="hover:text-[color:var(--foreground)] transition-colors">Unboxing</Link></li>
            <li><Link href="/karta-podarunkowa" className="hover:text-[color:var(--foreground)] transition-colors">Karta podarunkowa</Link></li>
            <li><Link href="/sledz-nas" className="hover:text-[color:var(--foreground)] transition-colors">Śledź nas</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Konto</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-[color:var(--foreground)]/70 uppercase tracking-widest">
            <li><Link href="/newsletter" className="hover:text-[color:var(--foreground)] transition-colors">Newsletter</Link></li>
            <li><Link href="/usun-konto" className="hover:text-[color:var(--foreground)] transition-colors">Usuń swoje konto</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-[color:var(--border)] flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-[color:var(--foreground)]/30 tracking-[0.4em] uppercase">
        <p>© 2025 THE WAY WE WEAR. ALL RIGHTS RESERVED.</p>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex flex-wrap items-center gap-3 text-[color:var(--foreground)]/80 uppercase tracking-[0.4em] text-[10px]">
            <span>Zmień język na:</span>
            <button className="px-3 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)]/80 hover:text-[color:var(--foreground)] transition-colors">PL 🇵🇱</button>
            <button className="px-3 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)]/80 hover:text-[color:var(--foreground)] transition-colors">ENG 🇬🇧</button>
            <button className="px-3 py-2 rounded-full border border-[color:var(--border)] text-[color:var(--foreground)]/80 hover:text-[color:var(--foreground)] transition-colors">UKR 🇺🇦</button>
          </div>
        </div>
      </div>
    </footer>
  );
};
