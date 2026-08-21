'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Bell, Trash2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useStore } from '@/context/StoreContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  image?: string;
  inStock: boolean;
  category: string;
}

const wishlistItemsData: WishlistItem[] = [];

export default function WishlistPage() {
  const tCartWishlist = useTranslations('cart_wishlist');
  const { wishlist, removeFromWishlist, addToCart } = useStore();
  const [items, setItems] = useState(wishlistItemsData);
  const [filter] = useState('Wszystko');
  const [emailPrompt, setEmailPrompt] = useState<{ id: string, type: 'stock' | 'promo' } | null>(null);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [userEmail] = useState('twoj@poczta.com');
  const [newsletterEmail, setNewsletterEmail] = useState(userEmail);
  const [newsletterSaved, setNewsletterSaved] = useState(false);
  const [notifiedItems, setNotifiedItems] = useState<string[]>([]);
  const [promoNotifiedItems, setPromoNotifiedItems] = useState<string[]>([]);

  const allItems = React.useMemo(() => {
    const storeItems: WishlistItem[] = wishlist.map(wi => {
      return {
        ...wi,
        images: [wi.image],
        inStock: true,
      };
    });
    const merged = [...storeItems];
    wishlistItemsData.forEach(mock => {
      if (!merged.find(m => m.id === mock.id)) {
        merged.push(mock);
      }
    });
    return merged;
  }, [wishlist]);

  const filteredItems = filter === 'Wszystko'
    ? allItems
    : allItems.filter(i => i.category === filter);

  const removeItem = (id: string) => {
    removeFromWishlist(id);
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic text-[color:var(--foreground)]">{tCartWishlist('twoja_wishlista')}</h1>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="max-w-4xl space-y-8">
            {filteredItems.map((item) => (
              <div key={item.id} className="flex gap-6 pb-8 border-b border-[color:var(--border)]">
                 <div className="w-24 md:w-32 aspect-[3/4] bg-[color:var(--surface-muted)] rounded-xl overflow-hidden shadow-lg">
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />
                 </div>
                 <div className="flex-1 flex flex-col justify-between py-2">
                    <div>
                       <div className="flex justify-between items-start mb-2">
                          <Link href={`/product/${item.id}`}>
                             <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter leading-tight hover:opacity-60 transition-opacity">{item.name}</h3>
                          </Link>
                          <button onClick={() => removeItem(item.id)} className="text-[color:var(--foreground)]/40 hover:text-red-500 transition-colors">
                             <Trash2 size={24} />
                          </button>
                       </div>
                       <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/50">{item.category}</p>
                    </div>
                    <div className="flex justify-end gap-4">
                       <button
                        onClick={() => addToCart({ name: item.name, price: item.price, image: item.images[0], quantity: 1 })}
                        className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-8 py-3 rounded-full font-black uppercase tracking-widest text-[13px] hover:scale-105 transition-all shadow-xl"
                       >
                          {tCartWishlist('do_koszyka')}
                       </button>
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
               <Link href="/subjects" className="inline-flex items-center justify-center gap-4 bg-[color:var(--foreground)] text-[color:var(--surface)] px-12 py-6 rounded-full font-black uppercase tracking-[0.3em] text-[18px] hover:scale-[1.05] transition-all shadow-2xl">
                 {tCartWishlist('wróć_do_sklepu')}
               </Link>
             </div>
          </div>
        )}
      </div>

      <Footer />

      <AnimatePresence>
        {emailPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEmailPrompt(null)} className="absolute inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[40px] p-12 max-w-md w-full shadow-2xl border border-[color:var(--border)] text-center">
              <button onClick={() => setEmailPrompt(null)} className="absolute top-8 right-8 text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)]"><X size={24} /></button>
              <div className="w-16 h-16 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center mx-auto mb-8"><Bell size={32} /></div>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Daj nam znać</h3>
              <p className="text-[17px] font-bold uppercase opacity-40 tracking-widest leading-relaxed mb-8">
                {emailPrompt.type === 'stock'
                  ? tCartWishlist('powiadomimy_cię_o_zapasie')
                  : tCartWishlist('powiadomimy_cię_o_promocji')}
              </p>
              <input type="email" placeholder="TWOJA@POCZTA.COM" className="w-full bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl px-6 py-4 font-black uppercase text-base mb-4 focus:outline-none focus:border-[color:var(--foreground)] text-[color:var(--foreground)]" />
              <button
                onClick={() => {
                  if (emailPrompt.type === 'stock') setNotifiedItems([...notifiedItems, emailPrompt.id]);
                  else setPromoNotifiedItems([...promoNotifiedItems, emailPrompt.id]);
                  setEmailPrompt(null);
                }}
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-base shadow-xl"
              >
                Powiadom mnie
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newsletterModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setNewsletterModalOpen(false)} className="absolute inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[40px] p-12 max-w-md w-full shadow-2xl border border-[color:var(--border)] text-center">
              <button onClick={() => setNewsletterModalOpen(false)} className="absolute top-8 right-8 text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)]"><X size={24} /></button>
              <div className="w-16 h-16 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center mx-auto mb-8"><Heart size={32} /></div>
              <h3 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Zapisz się do Newslettera</h3>
              <p className="text-[17px] font-bold uppercase opacity-40 tracking-widest leading-relaxed mb-8">Potwierdź adres e-mail lub wprowadź inny, aby otrzymywać informacje o nowych dropach.</p>
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="w-full bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl px-6 py-4 font-black uppercase text-base mb-4 focus:outline-none focus:border-[color:var(--foreground)] text-[color:var(--surface)]"
              />
              <button
                onClick={() => {
                  setNewsletterSaved(true);
                  setNewsletterModalOpen(false);
                }}
                className="w-full bg-[color:var(--foreground)] text-[color:var(--surface)] py-5 rounded-full font-black uppercase tracking-widest text-base shadow-xl"
              >
                Potwierdź e-mail
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {newsletterSaved && !newsletterModalOpen && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] px-6 py-4 bg-[color:var(--surface)] rounded-full shadow-2xl border border-[color:var(--border)] text-[color:var(--foreground)] text-[18px] font-black uppercase tracking-[0.2em]">
            Zapisano do newslettera: {newsletterEmail}
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
