'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ShoppingBag, ArrowRight, Trash2, Plus, Minus } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useStore } from '@/context/StoreContext';

export default function CartPage() {
  const tCartWishlist = useTranslations('cart_wishlist');
  const { cart, removeFromCart, updateQuantity, checkout, cartError, isCartLoading } = useStore();
  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-20">

          {/* Cart List */}
          <div className="flex-1">
            <h1 className="text-5xl font-black uppercase tracking-tighter italic mb-12">{tCartWishlist('twój_koszyk')}</h1>

            {cart.length > 0 ? (
              <div className="space-y-8">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.size}-${item.color}`} className="flex gap-6 pb-8 border-b border-[color:var(--border)]">
                    <div className="w-24 md:w-32 aspect-[3/4] bg-[color:var(--surface-muted)] rounded-xl overflow-hidden shadow-lg">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between py-2">
                      <div>
                        <div className="flex justify-between items-start mb-2">
                           <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight max-w-[200px] md:max-w-none">{item.name}</h3>
                           <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-[color:var(--foreground)]/40 hover:text-red-500 transition-colors"
                           >
                             <Trash2 size={24} />
                           </button>
                        </div>
                        <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/50">
                          {item.size && `${tCartWishlist('rozmiar')}: ${item.size}`} {item.color && `// ${tCartWishlist('kolor')}: ${item.color}`}
                        </p>
                      </div>
                      <div className="flex justify-between items-end">
                         <div className="flex items-center border border-[color:var(--border)] rounded-lg px-3 py-2 gap-6 bg-[color:var(--surface-muted)] shadow-inner">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="opacity-40 hover:opacity-100 transition-opacity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="text-[22px] font-black w-4 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="opacity-40 hover:opacity-100 transition-opacity"
                            >
                              <Plus size={20} />
                            </button>
                         </div>
                         <span className="text-2xl font-black">{item.price * item.quantity} {item.currencyCode}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-[color:var(--surface-muted)] rounded-[40px] border border-dashed border-[color:var(--border)]">
                 <ShoppingBag size={48} className="mx-auto mb-6 opacity-10" />
                 <p className="text-xl font-black uppercase tracking-tighter opacity-40 italic">{tCartWishlist('koszyk_jest_pusty')}</p>
                 <Link href="/subjects" className="inline-block mt-8 border-b-2 border-[color:var(--foreground)] pb-1 font-black uppercase tracking-widest text-base hover:pb-2 transition-all">{tCartWishlist('wróć_do_sklepu')}</Link>
              </div>
            )}

          </div>

          {/* Summary */}
          <div className="lg:w-[400px]">
            <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] p-10 rounded-[40px] sticky top-32 border border-[color:var(--border)] shadow-2xl">
               <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-10">{tCartWishlist('podsumowanie')}</h2>

               <div className="space-y-6 mb-10 text-[22px] font-bold uppercase tracking-widest">
                  <div className="flex justify-between">
                     <span className="opacity-40">{tCartWishlist('wartość_produktów')}</span>
                     <span>{total} PLN</span>
                  </div>
                  <div className="flex justify-between">
                     <span className="opacity-40">{tCartWishlist('dostawa')}</span>
                     <span className="opacity-60">{tCartWishlist('gratis')}</span>
                  </div>
                  <div className="pt-6 border-t border-[color:var(--border)] flex justify-between text-3xl font-black italic tracking-tighter">
                     <span>{tCartWishlist('razem')}</span>
                     <span>{total} PLN</span>
                  </div>
               </div>

               <button
                disabled={cart.length === 0}
                onClick={checkout}
                className={`w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-6 rounded-full font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 hover:opacity-90 transition-all shadow-2xl mb-8 disabled:opacity-20 disabled:cursor-not-allowed text-[22px]`}
               >
                 {isCartLoading ? '...' : tCartWishlist('przejdź_do_płatności')} <ArrowRight size={24} />
               </button>

               {cartError && <p role="alert" className="text-sm text-red-500 font-bold text-center">{cartError}</p>}

               <div className="space-y-4">
                  <p className="text-[17px] font-black uppercase tracking-widest opacity-30 text-center">{tCartWishlist('zamówienie_zostanie_sfinalizowane_w_nast')}</p>
               </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
