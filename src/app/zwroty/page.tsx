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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
           <motion.div
            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="p-12 rounded-[50px] bg-[color:var(--surface-muted)] border border-[color:var(--border)] shadow-2xl"
           >
              <div className="w-16 h-16 bg-red-500 text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                 <ShieldAlert size={32} />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">Artykuły na zamówienie</h2>
              <p className="text-[18px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                 Artykuły z haftem na zamówienie są tworzone według Twojej indywidualnej specyfikacji. Zgodnie z art. 38 ust. 1 pkt 3 ustawy o prawach konsumenta, produkty personalizowane nie podlegają zwrotowi ani wymianie z tytułu rezygnacji. Prosimy o dokładne sprawdzenie przesłanego projektu oraz tabeli rozmiarów przed sfinalizowaniem zamówienia.
              </p>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="p-12 rounded-[50px] bg-[color:var(--surface)] border border-[color:var(--border)] shadow-2xl"
           >
              <div className="w-16 h-16 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-2xl flex items-center justify-center mb-8 shadow-xl">
                 <RefreshCcw size={32} />
              </div>
              <h2 className="text-4xl font-black uppercase italic tracking-tighter mb-8">Standardowe produkty</h2>
              <p className="text-[18px] font-bold uppercase tracking-widest leading-relaxed opacity-60">
                 W przypadku artykułów, które nie są wykonywane na indywidualne zamówienie, przysługuje Ci prawo do zwrotu w terminie 14 dni od momentu otrzymania przesyłki bez podania przyczyny. Towar nie może nosić śladów użytkowania i musi posiadać oryginalne metki.
              </p>
           </motion.div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
