'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';

export default function BlogPage() {
  const tEditorial = useTranslations('editorial');

  const articles = [
    {
      title: tEditorial('jak_to_się_zaczęło'),
      date: '12 STYCZNIA 2026',
      excerpt: tEditorial('od_pierwszej_maszyny_do_szycia_w_garażu'),
      img: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: tEditorial('nasza_misja'),
      date: '05 LUTEGO 2026',
      excerpt: tEditorial('dlaczego_we_w_naszej_nazwie_jest_tak_waż'),
      img: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=800'
    },
    {
      title: tEditorial('jakość_premium'),
      date: '20 MARCA 2026',
      excerpt: tEditorial('detale_które_robią_różnicę_przewodnik_po'),
      img: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800'
    }
  ];

  return (
    <main className="min-h-screen font-antonio">
      <Header />

      <div className="container mx-auto px-4 pt-40 pb-40 max-w-2xl">
        <div className="mb-20 text-center">
          <h1 className="text-6xl md:text-7xl font-black uppercase tracking-tighter italic mb-4">{tEditorial('nasza_historia')}</h1>
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
               <div className="p-6 flex items-center gap-4 border-b border-[color:var(--border)]">
                  <div className="w-10 h-10 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center font-black text-xs italic">WE</div>
                  <div>
                    <p className="text-sm font-black uppercase tracking-widest">TheWayWEWear</p>
                    <p className="text-[10px] font-bold opacity-30 uppercase tracking-widest">{art.date}</p>
                  </div>
               </div>

               <div className="aspect-square bg-[color:var(--surface-muted)] overflow-hidden">
                  <img src={art.img} className="w-full h-full object-cover grayscale" alt="" />
               </div>

               <div className="p-8 space-y-4">
                  <h2 className="text-2xl font-black uppercase italic tracking-tighter">{art.title}</h2>
                  <p className="text-[17px] font-bold opacity-60 uppercase leading-relaxed tracking-wide">
                    <span className="text-[color:var(--foreground)] opacity-100 mr-2">thewaywewear</span>
                    {art.excerpt}
                  </p>
                  <div className="flex gap-4 text-[13px] font-black uppercase tracking-widest opacity-20 mt-6">
                    <span>#TWWW</span>
                    <span>#CLUB</span>
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
