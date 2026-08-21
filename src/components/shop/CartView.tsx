'use client';

import React from 'react';
import { ShoppingBag, ChevronRight, Truck, Trash2 } from 'lucide-react';
import { useStore } from '@/context/StoreContext';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';

export const CartView = () => {
  const { cart, removeFromCart, updateQuantity, proceedToCheckout, isLoadingCart } = useStore();
  const tCart = useTranslations('cart');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-[color:var(--surface)] py-32 container mx-auto px-6 font-antonio">
      <div className="flex flex-col lg:flex-row gap-16">
        {/* Items List */}
        <div className="flex-1">
          <div className="flex items-center gap-4 mb-12">
            <ShoppingBag size={32} />
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Twój Koszyk</h1>
          </div>

          {cart.length === 0 ? (
            <div className="space-y-6 border-t border-[color:var(--border)] pt-12 text-center">
              <p className="text-2xl font-black uppercase tracking-tight opacity-50">Twój koszyk jest pusty</p>
              <Link
                href="/shop/all"
                className="inline-block bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:opacity-90 transition-all"
              >
                Przeglądaj kolekcje
              </Link>
            </div>
          ) : (
            <div className="space-y-8 border-t border-[color:var(--border)] pt-8">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-6 items-center">
                  <div className="w-24 h-32 bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl overflow-hidden grayscale">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-black uppercase tracking-tighter text-xl">{item.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={isLoadingCart}
                        className="text-red-500 hover:text-red-600 transition-colors p-1"
                        title="Usuń"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    {item.size && (
                      <p className="text-[color:var(--foreground)]/50 text-base font-bold uppercase tracking-widest mt-1">
                        Rozmiar: {item.size} {item.color ? `| Kolor: ${item.color}` : ''}
                      </p>
                    )}
                    <div className="mt-4 flex justify-between items-end">
                      <div className="flex border border-[color:var(--border)] rounded-full px-4 py-1 gap-4 items-center">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          disabled={isLoadingCart || item.quantity <= 1}
                          className="opacity-50 hover:opacity-100 font-bold"
                        >
                          -
                        </button>
                        <span className="font-bold text-[18px]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={isLoadingCart}
                          className="opacity-50 hover:opacity-100 font-bold"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-black text-xl tracking-tighter">
                        {(item.price * item.quantity).toFixed(2)} PLN
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Summary & Checkout */}
        <div className="w-full lg:w-96 space-y-8">
          <div className="bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-3xl p-8 space-y-6">
            <h2 className="text-2xl font-black uppercase tracking-tighter italic">Podsumowanie</h2>

            <div className="space-y-3 border-b border-[color:var(--border)] pb-6">
              <div className="flex justify-between text-[18px] font-bold uppercase tracking-widest text-[color:var(--foreground)]/50">
                <span>Artykuły</span>
                <span className="text-[color:var(--foreground)]">{subtotal.toFixed(2)} PLN</span>
              </div>
              <div className="flex justify-between text-[18px] font-bold uppercase tracking-widest text-[color:var(--foreground)]/50">
                <span>Dostawa</span>
                <span className="text-[color:var(--foreground)] font-black italic">
                  {subtotal >= 500 || subtotal === 0 ? 'DARMOWA' : 'OBLICZANA W CHECKOUT'}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-end">
              <span className="text-base font-bold text-[color:var(--foreground)]/30 uppercase tracking-[0.2em]">Suma całkowita</span>
              <span className="text-4xl font-black tracking-tighter underline underline-offset-8">
                {subtotal.toFixed(2)} PLN
              </span>
            </div>

            <button
              onClick={proceedToCheckout}
              disabled={cart.length === 0 || isLoadingCart}
              className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all flex items-center justify-center gap-3"
            >
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
