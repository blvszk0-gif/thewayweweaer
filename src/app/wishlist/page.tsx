'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Heart, Bell, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const wishlistItems = [
  {
    id: 'twww-hoodie-01',
    name: 'OVERSIZE HOODIE // THE WAY WE STARE',
    price: 299,
    image: 'https://placehold.co/400x500/000000/FFFFFF?text=HOODIE+1',
    inStock: true,
    category: 'Bluzy'
  },
  {
    id: 'twww-tee-02',
    name: 'LIMITLESS TEE // BLACK SQUAD',
    price: 149,
    image: 'https://placehold.co/400x500/000000/FFFFFF?text=TEE+2',
    inStock: false,
    category: 'Koszulki'
  }
];

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-[#dcdcdc] font-abel shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h1 className="text-6xl font-black uppercase tracking-tighter italic">Twoja Wishlista</h1>
            <p className="text-black/48 font-bold uppercase tracking-[0.3em] text-xs mt-4">Przedmioty, które skradły Twoje serce</p>
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest opacity-30">
            {wishlistItems.length} Przedmioty
          </div>
        </div>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wishlistItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ y: -10 }}
                className="bg-white rounded-[40px] overflow-hidden shadow-2xl border border-white/20 group"
              >
                <div className="aspect-[4/5] relative overflow-hidden bg-black/5">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" />

                  <div className="absolute top-6 right-6 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {!item.inStock && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center">
                       <span className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest">Brak w magazynie</span>
                    </div>
                  )}
                </div>

                <div className="p-8">
                   <p className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">{item.category}</p>
                   <h3 className="text-xl font-black uppercase tracking-tighter italic mb-4">{item.name}</h3>
                   <div className="flex justify-between items-center mb-8">
                     <span className="text-lg font-black">{item.price} PLN</span>
                   </div>

                   <div className="space-y-3">
                     {item.inStock ? (
                       <button className="w-full bg-black text-white py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black/80 transition-all">
                         <ShoppingBag size={14} /> Dodaj do koszyka
                       </button>
                     ) : (
                       <button className="w-full border border-black text-black py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black hover:text-white transition-all">
                         <Bell size={14} /> Powiadom o zapasie
                       </button>
                     )}
                     <button className="w-full bg-black/5 text-black/40 py-4 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 hover:bg-black/10 hover:text-black transition-all">
                        <Bell size={14} /> Powiadom o promocji
                     </button>
                   </div>
                </div>
              </motion.div>
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
    </main>
  );
}
