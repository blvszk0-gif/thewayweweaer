'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';

export default function UnboxingPage() {
  const tEditorial = useTranslations('editorial');

  return (
    <main className="min-h-screen font-antonio overflow-hidden">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-40">
        <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[60px] p-16 md:p-32 text-center relative group border border-[color:var(--border)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05)_0%,transparent_50%)]" />
           <div className="absolute top-0 left-0 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full -translate-x-1/2 -translate-y-1/2" />
           <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full translate-x-1/2 translate-y-1/2" />

           <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-[30px] flex items-center justify-center mx-auto mb-12 shadow-2xl rotate-3"
              >
                <Camera size={48} />
              </motion.div>

              <h1 className="text-5xl md:text-9xl font-black italic uppercase mb-8 tracking-tighter leading-none">{tEditorial('pokaż_swój_styl')}</h1>

              <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase opacity-40 mb-16 max-w-3xl mx-auto leading-relaxed italic">
                {tEditorial('nagraj_unboxing_swojej_paczki_twww_wrzuć')}
              </p>

              <div className="flex flex-wrap justify-center gap-12 text-[15px] font-black uppercase tracking-[0.5em] opacity-20 mb-20">
                 <span className="hover:opacity-100 transition-opacity cursor-default">#THEWAYWEWEAR</span>
                 <span className="hover:opacity-100 transition-opacity cursor-default">#TWWW</span>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
