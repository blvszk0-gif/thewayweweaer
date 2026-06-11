'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Lock } from 'lucide-react';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio flex items-center justify-center p-6 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 max-w-2xl w-full bg-[color:var(--surface)]/90 backdrop-blur-xl p-12 md:p-20 rounded-[60px] shadow-2xl border border-[color:var(--border)] text-center"
      >
        <div className="w-24 h-24 bg-[color:var(--foreground)] rounded-full flex items-center justify-center mx-auto mb-12 shadow-2xl text-[color:var(--surface)]">
          <Lock size={40} />
        </div>

        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic mb-6 leading-none">
          The Way WE Wear<br />
          <span className="text-[color:var(--foreground)]/20">Is Preparing.</span>
        </h1>

        <p className="text-[10px] md:text-xs font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/40 mb-12 leading-relaxed px-12">
          Strona jest obecnie w trybie prywatnym. Przygotowujemy dla Was coś wyjątkowego. Premiera wkrótce.
        </p>

        <div className="flex flex-col items-center gap-6">
           <div className="w-full h-1 bg-[color:var(--foreground)]/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-[color:var(--foreground)]"
                initial={{ width: 0 }}
                animate={{ width: '70%' }}
                transition={{ duration: 2, ease: "circOut" }}
              />
           </div>
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-20">Squad Deployment: 70% Complete</p>
        </div>

        <div className="mt-20 pt-12 border-t border-[color:var(--border)]/20">
           <p className="text-[9px] font-black uppercase tracking-[0.2em] opacity-40">© 2025 THE WAY WE WEAR // SQUAD ONLY</p>
        </div>
      </motion.div>

      {/* Floating Elements for Premium Feel */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-20 w-32 h-32 bg-[color:var(--foreground)]/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-20 w-48 h-48 bg-[color:var(--foreground)]/10 rounded-full blur-3xl"
      />
    </main>
  );
}
