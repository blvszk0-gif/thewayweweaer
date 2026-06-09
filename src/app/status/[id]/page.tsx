'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle, Monitor, Box, Layout } from 'lucide-react';

const STATUSES = [
  { id: 'CONFIRMED', label: 'ZAMÓWIENIE POTWIERDZONE', icon: CheckCircle },
  { id: 'PREPARING', label: 'PRZYGOTOWANIE ZAMÓWIENIA', icon: Monitor },
  { id: 'PACKING', label: 'PAKOWANIE', icon: Box },
  { id: 'SHIPPED', label: 'WYSŁANO', icon: Truck },
];

const CatAnimation = ({ status }: { status: string }) => {
  // Pixelated Cat Component (Visual representation)
  // Animation descriptions:
  // CONFIRMED -> kot daje okejke (gif style)
  // PREPARING -> kot wskakuje na biurko na którym jest komputer i monitor
  // PACKING -> kot wskakuje do pudełka
  // SHIPPED -> kot patrzy przez okno i czeka

  const getAnimation = () => {
    switch(status) {
      case 'CONFIRMED':
        return (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="text-8xl">👍</div>
            <div className="w-32 h-32 bg-orange-400 rounded-2xl border-4 border-black relative overflow-hidden flex items-center justify-center">
               <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center font-black text-4xl">🐱</div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Kot daje okejke!</p>
          </motion.div>
        );
      case 'PREPARING':
        return (
          <motion.div
            initial={{ x: -100, y: 50, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
               <Monitor size={100} strokeWidth={1} />
               <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute -top-4 -right-4 text-4xl"
               >
                 🐱
               </motion.div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Kot wskoczył na biurko!</p>
          </motion.div>
        );
      case 'PACKING':
        return (
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
               <Box size={100} strokeWidth={1} />
               <motion.div
                animate={{ scale: [1, 0.9, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="absolute inset-0 flex items-center justify-center text-4xl"
               >
                 🐱
               </motion.div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Kot wskoczył do pudełka!</p>
          </motion.div>
        );
      case 'SHIPPED':
        return (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
               <div className="w-32 h-32 border-4 border-black rounded-xl flex items-center justify-center relative bg-blue-50">
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-yellow-400" /> {/* Sun */}
                  <div className="text-4xl">🐱</div>
               </div>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-black/40">Kot patrzy przez okno...</p>
          </motion.div>
        );
      default: return null;
    }
  };

  return (
    <div className="h-64 flex items-center justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={status}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          {getAnimation()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function OrderStatusPage() {
  const [activeStep, setActiveStep] = useState(0);

  // Simulation for demo
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STATUSES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="min-h-screen bg-white font-abel">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <div className="text-center mb-16">
          <span className="text-[10px] font-black tracking-[0.5em] text-black/20 uppercase mb-4 block">Order Tracking // ID: #TWWW-7721</span>
          <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter italic font-abel">Status Twojego zamówienia</h1>
        </div>

        <CatAnimation status={STATUSES[activeStep].id} />

        <div className="mt-20">
          <div className="relative">
             {/* Progress Line */}
             <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 -translate-y-1/2" />
             <motion.div
              className="absolute top-1/2 left-0 h-0.5 bg-black -translate-y-1/2"
              initial={{ width: '0%' }}
              animate={{ width: `${(activeStep / (STATUSES.length - 1)) * 100}%` }}
              transition={{ duration: 1, ease: "easeInOut" }}
             />

             <div className="relative flex justify-between">
                {STATUSES.map((status, i) => {
                  const Icon = status.icon;
                  return (
                    <div key={status.id} className="flex flex-col items-center">
                       <motion.div
                        animate={{
                          scale: i <= activeStep ? 1.2 : 1,
                          backgroundColor: i <= activeStep ? '#000' : '#fff',
                          color: i <= activeStep ? '#fff' : '#000'
                        }}
                        className={`w-12 h-12 rounded-full border-2 border-black flex items-center justify-center z-10 transition-colors`}
                       >
                         <Icon size={20} />
                       </motion.div>
                       <div className={`mt-6 text-[8px] font-black uppercase tracking-tighter text-center max-w-[80px] transition-opacity ${i <= activeStep ? 'opacity-100' : 'opacity-20'}`}>
                         {status.label}
                       </div>
                    </div>
                  );
                })}
             </div>
          </div>
        </div>

        <div className="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-black/5 p-8 rounded-[30px] border border-black/5">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 italic">Szczegóły dostawy</h3>
              <div className="space-y-4 text-xs font-bold uppercase">
                 <div className="flex justify-between">
                    <span className="opacity-40">Kurier</span>
                    <span>InPost Paczkomat</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="opacity-40">Nr paczki</span>
                    <span className="underline italic">62881122334455</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="opacity-40">Przewidywana data</span>
                    <span>Jutro, 12:00 - 15:00</span>
                 </div>
              </div>
           </div>

           <div className="bg-black/5 p-8 rounded-[30px] border border-black/5">
              <h3 className="text-xs font-black uppercase tracking-widest mb-6 italic">Twoja paczka</h3>
              <div className="space-y-4 text-xs font-bold uppercase">
                 <div className="flex justify-between">
                    <span className="opacity-40">Przedmioty</span>
                    <span>1x OVERSIZE HOODIE</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="opacity-40">Box Theme</span>
                    <span>THE WAY WE STARE (ANIME)</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="opacity-40">Unboxing Gadget</span>
                    <span>3D PRINTED KATANA STAND</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="mt-12 text-center">
           <p className="text-[10px] font-black uppercase tracking-widest text-black/20 italic">
             Przygotuj telefon, żeby nagrać unboxing i zgarnąć dodatkowe żetony do Koła Fortuny!
           </p>
        </div>
      </div>

      <Footer />
    </main>
  );
}
