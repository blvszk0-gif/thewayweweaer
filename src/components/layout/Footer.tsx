'use client';

import React from 'react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="bg-black text-white py-24 border-t border-white/5 font-abel">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8">
        {/* Help */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Pomoc</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-white/50 uppercase tracking-widest">
            <li><Link href="/moje-konto" className="hover:text-white transition-colors">Moje konto</Link></li>
            <li><Link href="/moje-zakupy" className="hover:text-white transition-colors">Moje zakupy</Link></li>
            <li><Link href="/zwroty" className="hover:text-white transition-colors">Zwroty</Link></li>
          </ul>
        </div>

        {/* Policy */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Polityka</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-white/50 uppercase tracking-widest">
            <li><Link href="/polityka-prywatnosci" className="hover:text-white transition-colors">Polityka prywatności</Link></li>
            <li><Link href="/warunki-zakupow" className="hover:text-white transition-colors">Warunki zakupów</Link></li>
            <li><Link href="/dane-osobowe" className="hover:text-white transition-colors">Ochrona danych osobowych</Link></li>
            <li><Link href="/cookies" className="hover:text-white transition-colors">Pliki cookie</Link></li>
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">O nas</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-white/50 uppercase tracking-widest">
            <li><Link href="/historia" className="hover:text-white transition-colors">Nasza historia</Link></li>
            <li><Link href="/unboxing" className="hover:text-white transition-colors">Unboxing</Link></li>
            <li><Link href="/karta-podarunkowa" className="hover:text-white transition-colors">Karta podarunkowa</Link></li>
            <li><Link href="/sledz-nas" className="hover:text-white transition-colors">Śledź nas</Link></li>
          </ul>
        </div>

        {/* Account */}
        <div>
          <h4 className="text-lg font-black uppercase tracking-tighter mb-8 italic underline decoration-1 underline-offset-4 font-abel">Konto</h4>
          <ul className="flex flex-col gap-4 text-sm font-bold text-white/50 uppercase tracking-widest">
            <li><Link href="/newsletter" className="hover:text-white transition-colors">Newsletter</Link></li>
            <li><Link href="/usun-konto" className="hover:text-white transition-colors">Usuń swoje konto</Link></li>
          </ul>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-white/20 tracking-[0.4em] uppercase">
        <p>© 2025 THE WAY WE WEAR. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
           <span>VISA</span>
           <span>MASTERCARD</span>
           <span>BLIK</span>
           <span>APPLE PAY</span>
        </div>
      </div>
    </footer>
  );
};
