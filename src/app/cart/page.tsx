'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShoppingBag, ArrowRight, Trash2, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const cartItems = [
  { id: 1, name: 'OVERSIZE HOODIE // THE WAY WE STARE', price: 299, size: 'L', color: 'Pitch Black', img: 'https://placehold.co/400x500/000000/FFFFFF?text=HOODIE' },
];

export default function CartPage() {
  const total = cartItems.reduce((acc, item) => acc + item.price, 0);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-abel">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Cart List */}
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-12">Twój Koszyk</h1>

            {cartItems.length > 0 ? (
              <div className="space-y-8">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 pb-8 border-b border-[color:var(--border)]">
                    <div className="w-24 md:w-32 aspect-[3/4] bg-[color:var(--surface-muted)] rounded-xl overflow-hidden">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter leading-tight max-w-[200px] md:max-w-none">{item.name}</h3>
                           <button className="text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)] transition-colors">
                             <Trash2 size={20} />
                           </button>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-[color:var(--foreground)]/50">Rozmiar: {item.size} // Kolor: {item.color}</p>
                      </div>
                      <div className="flex justify-between items-end">
                         <div className="flex items-center border border-[color:var(--border)] rounded-lg px-3 py-1 gap-4">
                            <button className="text-lg font-black">-</button>
                            <span className="text-sm font-black">1</span>
                            <button className="text-lg font-black">+</button>
                         </div>
                         <span className="text-xl font-black">{item.price} PLN</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                 <ShoppingBag size={48} className="mx-auto mb-6 opacity-10" />
                 <p className="text-xl font-black uppercase tracking-tighter opacity-40 italic">Koszyk jest pusty</p>
                 <Link href="/shop/nowosci" className="inline-block mt-8 border-b-2 border-[color:var(--foreground)] pb-1 font-black uppercase tracking-widest text-xs hover:pb-2 transition-all">Wróć do sklepu</Link>
              </div>
            )}

            <div className="mt-12 p-8 bg-[color:var(--surface-muted)] rounded-[30px] border border-[color:var(--border)]">
               <h4 className="text-xs font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                 <ShieldCheck size={16} /> Gwarancja Squadu
               </h4>
               <p className="text-[10px] font-bold uppercase leading-relaxed opacity-50">
                 Wszystkie nasze ubrania są szyte i haftowane w Polsce. Masz 14 dni na zwrot, jeśli produkt nie spełni Twoich oczekiwań. Unboxing to nasza świętość - każda paczka to unikalne doświadczenie.
               </p>
            </div>
          </div>

          {/* Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] p-10 rounded-[40px] sticky top-32 border border-[color:var(--border)]">
               <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-10">Podsumowanie</h2>

               <div className="space-y-6 mb-10 text-sm font-bold uppercase tracking-widest">
                  <div className="flex justify-between">
                     <span className="opacity-40">Wartość produktów</span>
                     <span>{total} PLN</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="opacity-40">Dostawa</span>
                     <span className="opacity-60">Gratis</span>
                  </div>
                  <div className="pt-6 border-t border-[color:var(--border)] flex justify-between text-2xl font-black italic tracking-tighter">
                     <span>Razem</span>
                     <span>{total} PLN</span>
                  </div>
               </div>

               <button className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:bg-[color:var(--foreground)]/90 transition-all shadow-2xl mb-8">
                 Przejdź do płatności <ArrowRight size={20} />
               </button>

               <div className="space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-30 text-center">Zamówienie zostanie finalizowane w następnym kroku.</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
