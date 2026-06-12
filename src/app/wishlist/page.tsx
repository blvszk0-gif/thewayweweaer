'use client';

import React, { useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Bell, ShoppingBag, Trash2, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  images: string[];
  image?: string; // Compatibility with store
  inStock: boolean;
  category: string;
  isNotified?: boolean;
  isPromoNotified?: boolean;
}

const wishlistItemsData: WishlistItem[] = [
  {
    id: 'twww-hoodie-01',
    name: 'OVERSIZE HOODIE // THE WAY WE STARE',
    price: 299,
    images: [
      'https://placehold.co/400x500/000000/FFFFFF?text=HOODIE+1',
      'https://placehold.co/400x500/111111/FFFFFF?text=HOODIE+2',
      'https://placehold.co/400x500/222222/FFFFFF?text=HOODIE+3'
    ],
    inStock: true,
    category: 'Bluzy'
  },
  {
    id: 'twww-tee-02',
    name: 'LIMITLESS TEE // BLACK SQUAD',
    price: 149,
    images: [
      'https://placehold.co/400x500/000000/FFFFFF?text=TEE+2',
      'https://placehold.co/400x500/111111/FFFFFF?text=TEE+ALT'
    ],
    inStock: false,
    category: 'Koszulki'
  }
];

const WishlistProductCard = ({ item, onRemove, onNotify, onNotifyPromo }: { item: WishlistItem, onRemove: (id: string) => void, onNotify: (id: string) => void, onNotifyPromo: (id: string) => void }) => {
  const { addToCart } = useStore();
  const [currentImg, setCurrentImg] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      setCurrentImg(index);
    }
  };

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.images[0],
      quantity: 1
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className="bg-[color:var(--surface)] rounded-[40px] overflow-hidden shadow-2xl border border-[color:var(--border)] group flex flex-col relative"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-[color:var(--surface-muted)]">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
        >
          {item.images.map((img: string, idx: number) => (
            <div key={idx} className="min-w-full h-full snap-center">
              <img src={img} alt={item.name} className={`w-full h-full object-cover grayscale transition-all duration-700 ${item.inStock ? 'group-hover:grayscale-0' : 'blur-sm'}`} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {item.images.length > 1 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[color:var(--surface-muted)]/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 text-[color:var(--foreground)]"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[color:var(--surface-muted)]/80 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 text-[color:var(--foreground)]"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Action Button - Trash (NOT BLURRED) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-30">
          <button
            onClick={() => onRemove(item.id)}
            className="w-10 h-10 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center hover:brightness-90 transition-all shadow-xl"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {!item.inStock && (
          <div className="absolute inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-10">
             <span className="bg-[color:var(--surface)] text-[color:var(--foreground)] px-6 py-2 rounded-full text-[17px] font-black uppercase tracking-widest shadow-xl">Brak w magazynie</span>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {item.images.map((_: any, i: number) => (
            <div key={i} className={`w-1 h-1 rounded-full transition-all ${currentImg === i ? 'bg-[color:var(--foreground)] scale-125' : 'bg-[color:var(--foreground)]/30'}`} />
          ))}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
         <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/40 mb-2">{item.category}</p>
         <Link href={`/product/${item.id}`} className="hover:opacity-60 transition-opacity">
          <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4 leading-none text-[color:var(--foreground)]">{item.name}</h3>
         </Link>
         <div className="flex justify-between items-center mb-8">
           <span className="text-xl font-black text-[color:var(--foreground)]">{item.price} PLN</span>
         </div>

         <div className="space-y-3 mt-auto">
           {item.inStock ? (
             <button
              onClick={handleAddToCart}
              className="w-full bg-[color:var(--surface-muted)] text-[color:var(--foreground)] border border-[color:var(--border)] py-4 rounded-full font-black uppercase tracking-widest text-[17px] flex items-center justify-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all shadow-lg group/btn"
             >
               <ShoppingBag size={18} className="group-hover/btn:scale-110 transition-transform" /> Dodaj do koszyka
             </button>
           ) : (
             <button
              onClick={() => onNotify(item.id)}
              className="w-full bg-[color:var(--surface-muted)] text-[color:var(--foreground)] border border-[color:var(--border)] py-4 rounded-full font-black uppercase tracking-widest text-[17px] flex items-center justify-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all shadow-lg"
             >
               {item.isNotified ? (
                 <>Powiadomimy Cię o zapasie</>
               ) : (
                 <><Bell size={18} /> Powiadom o zapasie</>
               )}
             </button>
           )}
           <button
            onClick={() => onNotifyPromo(item.id)}
            className="w-full bg-[color:var(--surface-muted)] text-[color:var(--foreground)]/60 py-4 rounded-full font-black uppercase tracking-widest text-[17px] flex items-center justify-center gap-2 hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all border border-transparent hover:border-[color:var(--border)]"
           >
              {item.isPromoNotified ? (
                <>Powiadomimy Cię o promocji</>
              ) : (
                <><Bell size={18} /> Powiadom o promocji</>
              )}
           </button>
         </div>
      </div>
    </motion.div>
  );
};

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useStore();
  const [items, setItems] = useState(wishlistItemsData);
  const [filter, setFilter] = useState('Wszystko');
  const [emailPrompt, setEmailPrompt] = useState<{ id: string, type: 'stock' | 'promo' } | null>(null);
  const [newsletterModalOpen, setNewsletterModalOpen] = useState(false);
  const [userEmail] = useState('twoj@poczta.com');
  const [newsletterEmail, setNewsletterEmail] = useState(userEmail);
  const [newsletterSaved, setNewsletterSaved] = useState(false);
  const [notifiedItems, setNotifiedItems] = useState<string[]>([]);
  const [promoNotifiedItems, setPromoNotifiedItems] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem('twww-auth');
    setIsLoggedIn(!!saved);
  }, []);

  // Merge store wishlist with local mock items for richer display in this demo
  const allItems = React.useMemo(() => {
    const storeItems: WishlistItem[] = wishlist.map(wi => {
      return {
        ...wi,
        images: [wi.image],
        inStock: true,
      };
    });
    // Remove duplicates by ID
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

  const handleNotify = (id: string) => {
    if (isLoggedIn) {
      setNotifiedItems([...notifiedItems, id]);
    } else {
      setEmailPrompt({ id, type: 'stock' });
    }
  };

  const handleNotifyPromo = (id: string) => {
    if (isLoggedIn) {
      setPromoNotifiedItems([...promoNotifiedItems, id]);
    } else {
      setEmailPrompt({ id, type: 'promo' });
    }
  };

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
            <h1 className="text-6xl font-black uppercase tracking-tighter italic text-[color:var(--foreground)]">Twoja Wishlista</h1>
            <p className="text-[color:var(--foreground)]/70 font-bold uppercase tracking-[0.3em] text-base mt-4">Przedmioty, które skradły Twoje serce</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
             <div className="flex flex-wrap justify-center gap-2 bg-[color:var(--surface-muted)]/70 backdrop-blur rounded-full p-1 border border-[color:var(--border)]">
                {['Wszystko', 'Bluzy', 'Koszulki'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-5 py-2 rounded-full text-[17px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] shadow-xl' : 'text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)]'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <div className="text-[17px] font-black uppercase tracking-widest opacity-30">
               {filteredItems.length} Przedmioty
             </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                item={{
                  ...item,
                  isNotified: notifiedItems.includes(item.id),
                  isPromoNotified: promoNotifiedItems.includes(item.id)
                }}
                onRemove={removeItem}
                onNotify={handleNotify}
                onNotifyPromo={handleNotifyPromo}
              />
            ))}
          </div>
        ) : (
          <div className="bg-[color:var(--surface)] rounded-[50px] p-12 text-center shadow-2xl border border-[color:var(--border)]">
             <div className="w-24 h-24 bg-[color:var(--surface-muted)] rounded-full flex items-center justify-center mx-auto mb-8">
               <Heart size={40} className="opacity-20" />
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Pusto tu...</h2>

             <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
               <Link href="/shop/bluzy" className="inline-flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-4 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)]/80 transition-all">Sprawdź nasze Bluzy</Link>
               <Link href="/shop/koszulki" className="inline-flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-4 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)]/80 transition-all">Sprawdź nasze Koszulki</Link>
               <Link href="/shop/akcesoria" className="inline-flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-4 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)]/80 transition-all">Sprawdź nasze Akcesoria</Link>
               <Link href="/catalog" className="inline-flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-4 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)]/80 transition-all">Sprawdź nasz Katalog</Link>
             </div>
             <button
               onClick={() => setNewsletterModalOpen(true)}
               className="mt-2 inline-flex items-center justify-center gap-2 bg-[color:var(--foreground)] text-[color:var(--surface)] px-6 py-4 rounded-full font-black uppercase tracking-[0.2em] hover:bg-[color:var(--foreground)]/80 transition-all"
             >
               Zapisz się do Newslettera
             </button>
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
                  ? 'Zostaw swój e-mail, a wyślemy Ci powiadomienie gdy tylko produkt wróci na stan.'
                  : 'Zostaw swój e-mail, a damy Ci znać gdy tylko ten produkt trafi na promocję.'}
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
                className="w-full bg-[color:var(--surface-muted)] border border-[color:var(--border)] rounded-2xl px-6 py-4 font-black uppercase text-base mb-4 focus:outline-none focus:border-[color:var(--foreground)] text-[color:var(--foreground)]"
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
