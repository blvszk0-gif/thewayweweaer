'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Book, History, Users, Heart } from 'lucide-react';

const articles = [
  {
    title: 'JAK TO SIĘ ZACZĘŁO?',
    date: '12 STYCZNIA 2026',
    excerpt: 'OD PIERWSZEJ MASZYNY DO SZYCIA W GARAŻU DO BUDOWANIA NAJWIĘKSZEJ SPOŁECZNOŚCI STREETWEAROWEJ W POLSCE.',
    img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'MISJA SQUADU',
    date: '05 LUTEGO 2026',
    excerpt: 'DLACZEGO "WE" W NASZEJ NAZWIE JEST TAK WAŻNE? O BUDOWANIU RELACJI I WSPÓLNYCH PASJACH.',
    img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'
  },
  {
    title: 'JAKOŚĆ PREMIUM',
    date: '20 MARCA 2026',
    excerpt: 'DETALE, KTÓRE ROBIĄ RÓŻNICĘ. PRZEWODNIK PO NASZYCH MATERIAŁACH I TECHNIKACH HAFTU.',
    img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
  }
];

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio">
      <Header />

      <div className="container mx-auto px-4 pt-40 pb-40 max-w-2xl">
        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">Nasza Historia</h1>
          <p className="text-base font-bold opacity-30 uppercase tracking-[0.3em]">The Way WE Wear // Feed</p>
        </div>

        <div className="space-y-24">
          {articles.map((art, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-[color:var(--surface)] border border-[color:var(--border)] rounded-3xl overflow-hidden shadow-2xl"
            >
               {/* Post Header */}
               <div className="p-6 flex items-center gap-4 border-b border-[color:var(--border)]">
                  <div className="w-10 h-10 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center font-black text-xs italic">WE</div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">TheWayWEWear</p>
                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{art.date}</p>
                  </div>
               </div>

               {/* Post Image */}
               <div className="aspect-square bg-[color:var(--surface-muted)] overflow-hidden">
                  <img src={art.img} className="w-full h-full object-cover grayscale" alt="" />
               </div>

               {/* Post Content */}
               <div className="p-8 space-y-4">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">{art.title}</h2>
                  <p className="text-[17px] font-bold opacity-60 uppercase leading-relaxed tracking-wide">
                    <span className="text-[color:var(--foreground)] opacity-100 mr-2">thewaywewear</span>
                    {art.excerpt}
                  </p>
                  <div className="flex gap-4 text-[13px] font-black uppercase tracking-widest opacity-20 mt-6">
                    <span>#TWWW</span>
                    <span>#SQUAD</span>
                    <span>#PREMIUM</span>
                  </div>
               </div>
            </motion.article>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}
