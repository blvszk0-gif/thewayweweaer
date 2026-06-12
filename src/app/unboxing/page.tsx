'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Package, Gift, Heart, Camera, Sparkles } from 'lucide-react';

export default function UnboxingPage() {
  const steps = [
    { title: 'Personalizowany Karton', desc: 'Sygnowany logiem TWWW, usztywniony, by chronić to, co najcenniejsze.', icon: Package },
    { title: 'Papier z Motywem', desc: 'W zależności od wybranej kolekcji i motywu, papier do pakowania nawiązuje do danego uniwersum.', icon: Sparkles },
    { title: 'Rzemieślnicza Krówka', desc: 'Coś słodkiego na start Twojej nowej przygody.', icon: Heart },
    { title: 'Gadżet z Druku 3D', desc: 'Unikalna figurka lub akcesorium dopasowane do Twojego zakupu.', icon: Gift },
  ];

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio overflow-hidden">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-40">
        <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[60px] p-16 md:p-32 text-center relative group border border-[color:var(--border)] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,0,0,0.05)_0%,transparent_50%)]" />
           <div className="absolute -top-12 -left-12 w-48 h-48 bg-blue-500/10 blur-[100px] rounded-full" />
           <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-purple-500/10 blur-[100px] rounded-full" />

           <div className="relative z-10">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-24 h-24 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-[30px] flex items-center justify-center mx-auto mb-12 shadow-2xl rotate-3"
              >
                <Camera size={48} />
              </motion.div>

              <h1 className="text-5xl md:text-9xl font-black italic uppercase mb-8 tracking-tighter leading-none">Pokaż swój loot</h1>

              <p className="text-xl md:text-2xl font-bold tracking-[0.2em] uppercase opacity-40 mb-16 max-w-3xl mx-auto leading-relaxed italic">
                Nagraj unboxing swojej paczki <span className="text-[color:var(--foreground)] opacity-100">TWWW</span>, wrzuć na TikToka lub Instagrama z oznaczeniem <span className="underline underline-offset-8">#TWWW</span> i zgarnij dodatkowe żetony do Koła Fortuny przy następnym dropie.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 max-w-5xl mx-auto">
                 {steps.slice(0, 3).map((step, i) => {
                    const Icon = step.icon;
                    return (
                      <div key={i} className="p-8 rounded-[40px] bg-[color:var(--surface-muted)] border border-[color:var(--border)] hover:scale-[1.02] transition-transform">
                         <Icon size={32} className="mx-auto mb-4 opacity-20" />
                         <h3 className="text-lg font-black uppercase italic mb-2 tracking-tighter">{step.title}</h3>
                         <p className="text-[11px] font-bold uppercase tracking-widest opacity-40">{step.desc}</p>
                      </div>
                    );
                 })}
              </div>

              <div className="flex flex-wrap justify-center gap-12 text-[15px] font-black uppercase tracking-[0.5em] opacity-20">
                 <span className="hover:opacity-100 transition-opacity cursor-default">#THEWAYWEWEAR</span>
                 <span className="hover:opacity-100 transition-opacity cursor-default">#SQUAD</span>
                 <span className="hover:opacity-100 transition-opacity cursor-default">#UNBOXING</span>
                 <span className="hover:opacity-100 transition-opacity cursor-default">#GEEKPREMIUM</span>
              </div>
           </div>
        </div>

        <div className="mt-20 text-center">
            <p className="text-[13px] font-black uppercase tracking-[0.5em] opacity-20 mb-8">Nasz Standard Pakowania</p>
            <div className="flex justify-center items-center gap-12 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
               <Package size={40} />
               <Sparkles size={40} />
               <Heart size={40} />
               <Gift size={40} />
            </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
