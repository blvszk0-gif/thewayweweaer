'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { RefreshCcw, ShieldAlert } from 'lucide-react';

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <Header />
      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center lg:text-left">
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
           <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Polityka Zwrotów</h1>
        </header>

        <div className="max-w-3xl mx-auto">
           <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="p-12 rounded-[50px] bg-[color:var(--surface)] border border-[color:var(--border)] shadow-2xl"
           >
              <div className="w-16 h-16 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                 <RefreshCcw size={32} />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">Warunki Zwrotu</h2>
              <p className="text-[18px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                 Przysługuje Ci prawo do zwrotu towaru w terminie 14 dni od momentu otrzymania przesyłki bez podania przyczyny. Towar nie może nosić śladów użytkowania, musi posiadać oryginalne metki i pozostać w pełnym komplecie.
              </p>
           </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
