'use client';

import React, { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Ticket, Gift, Sparkles, RefreshCcw } from 'lucide-react';

const prizes = [
  { label: 'Darmowa dostawa', color: '#000000' },
  { label: 'Kod -10%', color: '#1a1a1a' },
  { label: 'Wlepki Squad', color: '#333333' },
  { label: 'Kod Valorant', color: '#000000' },
  { label: 'Darmowa koszulka', color: '#1a1a1a' },
  { label: 'Kod Fortnite', color: '#333333' },
];

export default function SuccessPage() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [wonPrize, setWonPrize] = useState<string | null>(null);

  const spin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    const extraSpins = 5 + Math.floor(Math.random() * 5);
    const randomStop = Math.floor(Math.random() * 360);
    const newRotation = rotation + (extraSpins * 360) + randomStop;

    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      // Normalized rotation within 0-359
      const normalizedRotation = newRotation % 360;
      // Pointer is at -90 degrees relative to wheel starting point (top)
      // Index = floor((360 - normalized) / segment_size)
      const sliceSize = 360 / prizes.length;
      const prizeIndex = Math.floor((360 - normalizedRotation) / sliceSize) % prizes.length;
      setWonPrize(prizes[prizeIndex].label);
    }, 4000);
  };

  return (
    <main className="min-h-screen bg-[#dcdcdc] font-abel overflow-hidden">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <div className="text-center mb-16">
          <div className="w-20 h-20 bg-black text-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl">
            <Check size={40} />
          </div>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">Dzięki za drop!</h1>
          <p className="text-black/48 font-bold uppercase tracking-[0.3em] text-xs mt-4">Twoje zamówienie #TWWW-0001 jest już w bazie.</p>
        </div>

        <div className="bg-white rounded-[50px] p-12 md:p-20 shadow-2xl border border-white/20 relative overflow-hidden">
           <div className="absolute top-0 right-0 p-8 opacity-5">
             <Gift size={200} />
           </div>

           <div className="relative z-10 text-center mb-16">
             <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">Koło Fortuny Squadu</h2>
             <p className="text-[10px] font-black uppercase tracking-widest opacity-30">Masz 1 żeton. Każdy los wygrywa!</p>
           </div>

           <div className="flex flex-col items-center gap-12">
             <div className="relative w-80 h-80 md:w-96 md:h-96">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-8 h-10 bg-black clip-path-triangle" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }} />

                <motion.div
                  className="w-full h-full rounded-full border-[10px] border-black shadow-2xl relative overflow-hidden"
                  animate={{ rotate: rotation }}
                  transition={{ duration: 4, ease: [0.1, 0, 0, 1] }}
                >
                  {prizes.map((prize, i) => (
                    <div
                      key={i}
                      className="absolute top-0 left-0 w-full h-full origin-center"
                      style={{
                        transform: `rotate(${i * 60}deg)`,
                        backgroundColor: prize.color,
                        clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 93.3% 25%)',
                        width: '100%',
                        height: '100%'
                      }}
                    >
                      <span
                        className="absolute top-16 left-1/2 -translate-x-1/2 -rotate-[60deg] text-white font-black uppercase text-[10px] tracking-widest text-center max-w-[60px]"
                        style={{ transform: 'translateX(-50%) rotate(30deg)', top: '15%', left: '75%' }}
                      >
                        {prize.label}
                      </span>
                    </div>
                  ))}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl z-10 border-4 border-black">
                       <Ticket size={24} />
                    </div>
                  </div>
                </motion.div>
             </div>

             <AnimatePresence>
               {wonPrize ? (
                 <motion.div
                   initial={{ opacity: 0, scale: 0.5 }}
                   animate={{ opacity: 1, scale: 1 }}
                   className="text-center space-y-6"
                 >
                   <div className="inline-flex items-center gap-4 bg-black text-white px-10 py-5 rounded-full font-black uppercase tracking-widest shadow-2xl animate-bounce">
                     <Sparkles size={24} /> WYGRANA: {wonPrize}
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Kod wysłaliśmy na Twój e-mail!</p>
                 </motion.div>
               ) : (
                 <button
                  onClick={spin}
                  disabled={isSpinning}
                  className={`group relative bg-black text-white px-16 py-6 rounded-full font-black uppercase tracking-[0.3em] shadow-2xl transition-all ${isSpinning ? 'opacity-50 cursor-not-allowed' : 'hover:scale-105 active:scale-95'}`}
                 >
                   {isSpinning ? <RefreshCcw className="animate-spin mx-auto" /> : 'ZAKRĘĆ KOŁEM'}
                 </button>
               )}
             </AnimatePresence>
           </div>
        </div>

        <div className="mt-12 text-center">
          <button className="text-[10px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity underline underline-offset-4">
            Wróć do bazy produktów
          </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
