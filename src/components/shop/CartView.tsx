'use client';

import React from 'react';
import { ShoppingBag, ChevronRight, Truck, MapPin, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const CartView = () => {
  return (
    <div className="bg-[color:var(--surface)] py-32 container mx-auto px-6">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Items List */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-12">
            <ShoppingBag size={32} />
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Twój Koszyk</h1>
          </div>

          <div className="space-y-8 border-t border-[color:var(--border)] pt-8">
            <div className="flex gap-6 items-center">
              <div className="w-24 h-32 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl overflow-hidden grayscale">
                <img src="https://placehold.co/400x500/000000/FFFFFF?text=SQUAD+V1" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1">
                <h3 className="font-black uppercase tracking-tighter text-xl">Oversize Hoodie "SQUAD" V1</h3>
                <p className="text-[color:var(--foreground)]/30 text-base font-bold uppercase tracking-widest mt-1">Rozmiar: M</p>
                <div className="mt-4 flex justify-between items-end">
                   <div className="flex border border-[color:var(--border)] rounded-full px-4 py-1 gap-4 items-center">
                      <button className="opacity-50 hover:opacity-100">-</button>
                      <span className="font-bold text-[18px]">1</span>
                      <button className="opacity-50 hover:opacity-100">+</button>
                   </div>
                   <span className="font-black text-xl tracking-tighter">349 PLN</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Summary & Checkout */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Podsumowanie</h2>

<div className="space-y-3 border-b border-[color:var(--border)] pb-6">
              <div className="flex justify-between text-[18px] font-bold uppercase tracking-widest text-[color:var(--foreground)]/50">
                <span>Artykuły</span>
                <span className="text-[color:var(--foreground)]">349 PLN</span>
              </div>
              <div className="flex justify-between text-[18px] font-bold uppercase tracking-widest text-[color:var(--foreground)]/50">
                <span>Dostawa</span>
                <span className="text-[color:var(--foreground)] font-black italic">+ CENA DOSTAWY</span>
              </div>
            </div>

            <div className="flex justify-between items-end">
               <span className="text-base font-bold text-[color:var(--foreground)]/30 uppercase tracking-[0.2em]">Suma całkowita</span>
               <span className="text-4xl font-black tracking-tighter underline underline-offset-8">349 PLN</span>
            </div>

            <button className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest hover:bg-[color:var(--foreground)]/90 transition-all flex items-center justify-center gap-3">
              REALIZUJ ZAKUP <ChevronRight size={18} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
             <div className="flex items-center gap-4 bg-[color:var(--surface-muted)] p-6 rounded-2xl border border-[color:var(--border)]">
                <Truck size={24} className="opacity-30" />
                <span className="text-[13px] font-bold uppercase tracking-[0.2em] text-[color:var(--foreground)]/50 leading-relaxed">
                  Darmowa dostawa przy zamówieniach <br /> powyżej 500 PLN.
                </span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
