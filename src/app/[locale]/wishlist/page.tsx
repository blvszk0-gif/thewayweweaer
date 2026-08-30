'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useStore } from '@/context/StoreContext';
import { BackInStockForm } from '@/components/shop/BackInStockForm';

export default function WishlistPage() {
  const tCartWishlist = useTranslations('cart_wishlist');
  const { wishlist, removeFromWishlist, addToCart, isCartLoading } = useStore();

  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic text-[color:var(--foreground)]">{tCartWishlist('twoja_wishlista')}</h1>
          </div>
        </div>

        {wishlist.length > 0 ? (
          <div className="max-w-4xl space-y-8">
            {wishlist.map((item) => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-[color:var(--border)]">
                 <Link href={`/product/${item.id}`} className="w-24 md:w-32 aspect-[3/4] bg-[color:var(--surface-muted)] rounded-xl overflow-hidden shadow-lg block">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                 </Link>
                 <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                       <div className="flex justify-between items-start mb-2">
                          <Link href={`/product/${item.id}`}>
                             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight hover:opacity-60 transition-opacity">{item.name}</h3>
                          </Link>
                          <button onClick={() => removeFromWishlist(item.id)} className="text-[color:var(--foreground)]/40 hover:text-red-500 transition-colors">
                             <Trash2 size={24} />
                          </button>
                       </div>
                       <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/50">{item.category}</p>
                    </div>
                    <div className="flex justify-end">
                       {item.availableForSale && item.variantId ? (
                         <button
                          onClick={() => addToCart({ merchandiseId: item.variantId, quantity: 1 })}
                          disabled={isCartLoading}
                          className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-3 rounded-full font-black uppercase tracking-widest text-[13px] hover:scale-105 transition-all shadow-xl disabled:opacity-30 flex items-center gap-2"
                         >
                            <ShoppingBag size={16} /> {tCartWishlist('do_koszyka')}
                         </button>
                       ) : item.variantId ? (
                         <div className="w-full max-w-sm">
                           <BackInStockForm variantId={item.variantId} />
                         </div>
                       ) : (
                         <p className="text-xs font-black uppercase tracking-widest opacity-40">Towar niedostępny</p>
                       )}
                    </div>
                 </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-[color:var(--surface)] rounded-[50px] p-12 text-center shadow-2xl border border-[color:var(--border)]">
             <div className="w-24 h-24 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto mb-8">
               <Heart size={40} className="opacity-20" />
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">{tCartWishlist('pusto_tu')}</h2>

             <div className="flex justify-center mb-8">
               <Link href="/" className="inline-flex items-center justify-center gap-4 bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[18px] hover:scale-[1.05] transition-all shadow-2xl">
                 {tCartWishlist('wróć_do_sklepu')}
               </Link>
             </div>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
