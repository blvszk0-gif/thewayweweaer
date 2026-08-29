'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart, CreditCard } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { useStore } from '@/context/StoreContext';
import { BackInStockForm } from '@/components/shop/BackInStockForm';

interface ProductCardProps {
  id: string;
  variantId?: string;
  name: string;
  price: number;
  image: string;
  category: string;
  isAvailable?: boolean;
}

export const ProductCard = ({ id, variantId, name, price, image, category, isAvailable = true }: ProductCardProps) => {
  const tCartWishlist = useTranslations('cart_wishlist');
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist, isCartLoading } = useStore();
  const liked = isInWishlist(id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (liked) {
      removeFromWishlist(id);
    } else {
      addToWishlist({ id, name, price, image, category });
    }
  };

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (variantId) {
      await addToCart({ merchandiseId: variantId, quantity: 1 });
    }
  };

  return (
    <div className="group flex flex-col bg-[color:var(--surface)] rounded-3xl overflow-hidden border border-[color:var(--border)] hover:shadow-2xl transition-all duration-500 font-antonio">
      <Link href={`/product/${id}`} className="relative aspect-[3/4] overflow-hidden bg-[color:var(--surface-muted)]">
        <motion.img
          src={image}
          alt={name}
          whileHover={{ scale: 1.05 }}
          className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
        />
        {!isAvailable && (
          <div className="absolute top-4 left-4 bg-black/80 text-white text-xs font-black uppercase tracking-widest px-3 py-2 rounded-full backdrop-blur-md">
            Towar niedostępny
          </div>
        )}
        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity">
          <button
            onClick={handleWishlist}
            className={`backdrop-blur-md p-3 rounded-full transition-all shadow-xl ${liked ? 'bg-red-500 text-white' : 'bg-white/80 text-black hover:bg-black hover:text-white'}`}
          >
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </button>
        </div>
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/product/${id}`}>
          <h3 className="text-lg font-black uppercase tracking-widest mb-1 opacity-40">Project: TWWW</h3>
          <p className="text-xl font-black uppercase tracking-tighter mb-4 italic leading-tight text-[color:var(--foreground)]">{name}</p>
          <p className="text-2xl font-black text-[color:var(--foreground)]">{price} PLN</p>
        </Link>

        <div className="mt-auto space-y-4 pt-6">
          {isAvailable ? (
            <button
              onClick={handleAddToCart}
              disabled={!variantId || isCartLoading}
              className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-4 rounded-full font-black uppercase tracking-widest text-lg flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-lg disabled:opacity-30"
            >
              <ShoppingBag size={20} /> {isCartLoading ? '...' : tCartWishlist('dodaj_do_koszyka')}
            </button>
          ) : variantId ? (
            <BackInStockForm variantId={variantId} />
          ) : (
            <p className="text-center text-xs font-black uppercase tracking-widest opacity-40 py-4">
              Towar niedostępny
            </p>
          )}

          <div className="flex items-center justify-center gap-4 opacity-20 py-2 text-[color:var(--foreground)]">
            <CreditCard size={16} />
            <span className="text-[17px] font-black italic">BLIK</span>
            <span className="text-[17px] font-black italic">VISA</span>
            <span className="text-[17px] font-black italic">APPLE PAY</span>
          </div>
        </div>
      </div>
    </div>
  );
};