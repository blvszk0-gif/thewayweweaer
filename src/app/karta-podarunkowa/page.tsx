'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';

const cards = [
  { amount: '50', label: '50 PLN', image: 'https://images.unsplash.com/photo-1549463512-20510427382d?auto=format&fit=crop&q=80&w=800' },
  { amount: '100', label: '100 PLN', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=800' },
  { amount: '150', label: '150 PLN', image: 'https://images.unsplash.com/photo-1543333309-8cdcd4fef673?auto=format&fit=crop&q=80&w=800' },
  { amount: '300', label: '300 PLN', image: 'https://images.unsplash.com/photo-1549463512-20510427382d?auto=format&fit=crop&q=80&w=800' },
  { amount: '400', label: '400 PLN', image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=800' },
];

export default function GiftCardPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <Header />
      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center">
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
           <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Karta Podarunkowa</h1>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
           {cards.map((card, i) => (
             <div
               key={card.amount}
               className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700 cursor-pointer"
             >
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                  <img src={card.image} alt={card.label} className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors p-8">
                     <Gift size={48} className="text-white mb-4 opacity-50 group-hover:opacity-100 transition-all" />
                     <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl">{card.label}</span>
                     <button className="mt-8 bg-white text-black px-8 py-3 rounded-full font-black uppercase tracking-widest text-[13px] opacity-0 group-hover:opacity-100 transition-all">Wybierz</button>
                  </div>
                </motion.div>
             </div>
           ))}
        </div>
      </div>
      <Footer />
    </main>
  );
}
