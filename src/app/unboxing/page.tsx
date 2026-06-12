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
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="text-center max-w-4xl mx-auto mb-24">
           <span className="text-[13px] font-black tracking-[0.5em] text-[color:var(--foreground)]/20 uppercase mb-4 block">ADHD Premium Experience</span>
           <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic mb-8">Doświadczenie Unboxingu</h1>
           <p className="text-xl md:text-2xl font-bold opacity-40 uppercase leading-relaxed italic">To nie jest zwykła paczka. To bilet wstępu do naszego Squadu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-32">
           <div className="aspect-square bg-[color:var(--surface-muted)] rounded-[40px] overflow-hidden flex items-center justify-center relative group border border-[color:var(--border)]">
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--foreground)]/50 to-transparent z-10" />
              <div className="relative z-20 text-center text-[color:var(--surface)] px-12">
                 <h2 className="text-4xl font-black italic mb-4">SZTUKA PAKOWANIA</h2>
                 <p className="text-base font-bold uppercase tracking-[0.2em] opacity-60">Każda sztuka jest traktowana jak artefakt.</p>
              </div>
              <div className="absolute inset-0 bg-[url('https://placehold.co/800x800/000000/FFFFFF?text=PREMIUM+BOX')] bg-cover opacity-20 group-hover:scale-110 transition-transform duration-1000" />
           </div>

           <div className="flex flex-col justify-center gap-8">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-6 items-start p-6 rounded-3xl hover:bg-[color:var(--surface-muted)] transition-all"
                  >
                    <div className="w-12 h-12 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-2xl flex items-center justify-center shrink-0">
                       <Icon size={24} />
                    </div>
                    <div>
                       <h3 className="text-xl font-black italic uppercase tracking-tighter mb-2">{step.title}</h3>
                       <p className="text-[13px] font-bold uppercase tracking-widest leading-loose opacity-40">{step.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
           </div>
        </div>

        <div className="bg-[color:var(--surface)] text-[color:var(--foreground)] rounded-[50px] p-16 md:p-24 text-center overflow-hidden relative group border border-[color:var(--border)]">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
           <div className="relative z-10">
              <Camera size={48} className="mx-auto mb-8 text-[color:var(--foreground)]/30" />
              <h2 className="text-4xl md:text-7xl font-black italic uppercase mb-8">Pokaż swój loot</h2>
              <p className="text-[18px] md:text-base font-bold tracking-[0.3em] uppercase opacity-40 mb-12 max-w-2xl mx-auto leading-relaxed">
                Nagraj unboxing, wrzuć na TikToka lub Instagrama z oznaczeniem #TWWW i zgarnij dodatkowe żetony do Koła Fortuny przy następnym dropie.
              </p>
              <div className="flex flex-wrap justify-center gap-8 text-[13px] font-black uppercase tracking-[0.4em] opacity-30">
                 <span>#THEWAYWEWEAR</span>
                 <span>#SQUAD</span>
                 <span>#UNBOXING</span>
                 <span>#GEEKPREMIUM</span>
              </div>
           </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
