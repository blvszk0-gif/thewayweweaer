'use client';

import React, { useState, useRef } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Bell, ShoppingBag, Trash2, ArrowRight, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const wishlistItemsData = [
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

const WishlistProductCard = ({ item, onRemove, onNotify }: { item: any, onRemove: (id: string) => void, onNotify: (id: string) => void }) => {
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

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-white/20 group flex flex-col relative"
    >
      <div className="aspect-[4/5] relative overflow-hidden bg-black/5">
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory h-full no-scrollbar"
        >
          {item.images.map((img: string, idx: number) => (
            <div key={idx} className="min-w-full h-full snap-center">
              <img src={img} alt={item.name} className={`w-full h-full object-cover grayscale transition-all duration-700 ${item.inStock ? 'group-hover:grayscale-0' : 'blur-sm grayscale'}`} />
              <img src={img} alt={item.name} className={`w-full h-full object-cover grayscale transition-all duration-700 ${item.inStock ? 'group-hover:grayscale-0' : 'blur-sm'}`} />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {item.images.length > 1 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
              className="absolute right-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10"
            >
              <ChevronRight size={16} />
            </button>
          </>
        )}

        {/* Action Button - Trash (NOT BLURRED) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-30">
        <div className="absolute top-6 right-6 flex flex-col gap-2 z-20">
          <button
            onClick={() => onRemove(item.id)}
            className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors shadow-xl"
          >
            <Trash2 size={18} />
          </button>
        </div>

        {!item.inStock && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none z-10">
             <span className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">Brak w magazynie</span>
          </div>
        )}

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1 z-10">
          {item.images.map((_: any, i: number) => (
            <div key={i} className={`w-1 h-1 rounded-full transition-all ${currentImg === i ? 'bg-white scale-125' : 'bg-white/30'}`} />
          ))}
        </div>
      </div>

      <div className="p-8 flex-1 flex flex-col">
         <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">{item.category}</p>
         <Link href={`/product/${item.id}`} className="hover:opacity-60 transition-opacity">
          <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4 leading-none">{item.name}</h3>
         </Link>
         <div className="flex justify-between items-center mb-8">
           <span className="text-lg font-black">{item.price} PLN</span>
         </div>

         <div className="space-y-3 mt-auto">
           {item.inStock ? (
             <button className="w-full bg-white text-black border border-black/10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg group/btn">
               <ShoppingBag size={14} className="group-hover/btn:scale-110 transition-transform" /> Dodaj do koszyka
             </button>
           ) : (
             <button
              onClick={() => onNotify(item.id)}
              className="w-full bg-white text-black border border-black/10 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all shadow-lg"
             >
               {item.isNotified ? (
                 <>Powiadomimy Cię o zapasie</>
               ) : (
                 <><Bell size={14} /> Powiadom o zapasie</>
               )}
             </button>
           )}
           <button className="w-full bg-black/5 text-black/40 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all">
              <Bell size={14} /> Powiadom o promocji
           </button>
         </div>
      </div>
    </motion.div>
  );
};

export default function WishlistPage() {
  const [items, setItems] = useState(wishlistItemsData);
  const [filter, setFilter] = useState('Wszystko');
  const [emailPrompt, setEmailPrompt] = useState<string | null>(null);
  const [notifiedItems, setNotifiedItems] = useState<string[]>([]);
  const [isLoggedIn] = useState(false); // Mock

  const filteredItems = filter === 'Wszystko'
    ? items
    : items.filter(i => i.category === filter);

  const handleNotify = (id: string) => {
    if (isLoggedIn) {
      setNotifiedItems([...notifiedItems, id]);
    } else {
      setEmailPrompt(id);
    }
  };

  const removeItem = (id: string) => {
    setItems(items.filter(i => i.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#dcdcdc] font-abel shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Twoja Wishlista</h1>
            <p className="text-black/48 font-bold uppercase tracking-[0.3em] text-xs mt-4">Przedmioty, które skradły Twoje serce</p>
          </div>
          <div className="flex items-center gap-4">
             <div className="flex bg-white/50 backdrop-blur rounded-full p-1 border border-black/5">
                {['Wszystko', 'Bluzy', 'Koszulki'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilter(cat)}
                    className={`px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${filter === cat ? 'bg-black text-white shadow-xl' : 'text-black/40 hover:text-black'}`}
                  >
                    {cat}
                  </button>
                ))}
             </div>
             <div className="text-[10px] font-black uppercase tracking-widest opacity-30">
               {filteredItems.length} Przedmioty
             </div>
          </div>
        </div>

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <WishlistProductCard
                key={item.id}
                item={{...item, isNotified: notifiedItems.includes(item.id)}}
                onRemove={removeItem}
                onNotify={handleNotify}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[50px] p-24 text-center shadow-2xl">
             <div className="w-24 h-24 bg-black/5 rounded-full flex items-center justify-center mx-auto mb-8">
               <Heart size={40} className="opacity-20" />
             </div>
             <h2 className="text-3xl font-black uppercase tracking-tighter italic mb-4">Pusto tu...</h2>
             <p className="text-black/48 font-bold uppercase tracking-widest text-xs mb-12">Twoja wishlista czeka na pierwsze dropy.</p>
             <Link href="/shop/wszystko" className="inline-flex items-center gap-4 bg-black text-white px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-black/80 transition-all">
               Odkryj dropy <ArrowRight size={20} />
             </Link>
          </div>
        )}
      </div>

      <Footer />

      <AnimatePresence>
        {emailPrompt && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEmailPrompt(null)} className="absolute inset-0 bg-black/60 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white rounded-[40px] p-12 max-w-md w-full shadow-2xl text-center">
              <button onClick={() => setEmailPrompt(null)} className="absolute top-8 right-8 text-black/20 hover:text-black"><X size={24} /></button>
              <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8"><Bell size={32} /></div>
              <h3 className="text-2xl font-black uppercase tracking-tighter italic mb-4">Daj nam znać</h3>
              <p className="text-[10px] font-bold uppercase opacity-40 tracking-widest leading-relaxed mb-8">Zostaw swój e-mail, a wyślemy Ci powiadomienie gdy tylko produkt wróci na stan.</p>
              <input type="email" placeholder="TWOJA@POCZTA.COM" className="w-full bg-black/5 border border-black/10 rounded-2xl px-6 py-4 font-black uppercase text-xs mb-4 focus:outline-none focus:border-black" />
              <button
                onClick={() => { setNotifiedItems([...notifiedItems, emailPrompt]); setEmailPrompt(null); }}
                className="w-full bg-black text-white py-5 rounded-full font-black uppercase tracking-widest text-xs shadow-xl"
              >
                Powiadom mnie
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </main>
  );
}
