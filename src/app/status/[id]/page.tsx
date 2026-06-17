'use client';

import React, { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle2, MapPin, Search } from 'lucide-react';
import { useParams } from 'next/navigation';

const statusSteps = [
  {
    id: 'confirmed',
    label: 'ZAMÓWIENIE POTWIERDZONE',
    icon: CheckCircle2,
    animation: 'okejka',
    catDesc: 'Kot daje okejke (jak ten gif z rudym dzieciakiem)',
    catStyle: { x: 0, y: 0, scale: 1 }
  },
  {
    id: 'preparing',
    label: 'PRZYGOTOWANIE ZAMÓWIENIA',
    icon: Search,
    animation: 'kot_w_pudelku',
    catDesc: 'Kot wskakuje do pudełka',
    catStyle: { x: 0, y: 50, scale: 0.8 }
  },
  {
    id: 'sent',
    label: 'WYSYŁKA ZAMÓWIENIA',
    icon: Truck,
    animation: 'kot_okno',
    catDesc: 'Kot patrzy przez okno i czeka',
    catStyle: { x: -80, y: -20, scale: 1.1, rotate: -5 }
  },
  {
    id: 'delivered',
    label: 'ODEBRANO',
    icon: Package,
    animation: 'kot_biurko',
    catDesc: 'Kot wskakuje na biurko na którym jest komputer i monitor',
    catStyle: { x: 50, y: -40, scale: 0.9, rotate: 10 }
  },
];

export default function OrderStatusPage() {
  const params = useParams();
  const id = params.id as string;
  const [currentStatus, setCurrentStatus] = useState(1); // 1 = Preparing (Mock)

  useEffect(() => {
    // Simulating status fetch
    const timer = setTimeout(() => setCurrentStatus(1), 500);
    return () => clearTimeout(timer);
  }, [id]);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 max-w-4xl">
        <div className="bg-[color:var(--surface)]/95 backdrop-blur-md rounded-[50px] p-12 shadow-2xl relative overflow-hidden border border-[color:var(--border)]">

          <div className="flex justify-between items-start mb-16 relative z-10">
            <div>
              <p className="text-[17px] font-black uppercase tracking-[0.3em] text-[color:var(--foreground)]/30 mb-2">Order Tracking // ID: {id}</p>
              <h1 className="text-5xl font-black uppercase tracking-tighter italic">Status Twojej Paczki</h1>
            </div>
            <div className="bg-[color:var(--foreground)] text-[color:var(--surface)] px-6 py-2 rounded-full text-[17px] font-black uppercase tracking-widest">
              Live Update
            </div>
          </div>

          {/* Cat Animation Zone */}
          <div className="mb-20 aspect-video bg-[color:var(--surface-muted)] rounded-[40px] flex items-center justify-center relative overflow-hidden group border border-[color:var(--border)] shadow-inner">
             <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />

             <AnimatePresence mode="wait">
                <motion.div
                  key={currentStatus}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="relative z-10 text-center flex flex-col items-center"
                >
                   <div className="relative w-80 h-80 flex items-center justify-center">
                      {/* Pixelated Backdrop for Cat */}
                      <div className="absolute inset-0 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/10" />

                      <motion.div
                        className="relative z-10"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{
                           opacity: 1,
                           scale: statusSteps[currentStatus].catStyle.scale,
                           x: statusSteps[currentStatus].catStyle.x,
                           y: statusSteps[currentStatus].catStyle.y,
                           rotate: statusSteps[currentStatus].catStyle.rotate || 0
                        }}
                        transition={{ type: 'spring', damping: 12, stiffness: 90 }}
                      >
                        <img
                          src="/cat.jpg"
                          alt="Cat Status"
                          className="w-64 h-64 object-contain rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.5)] border-4 border-white/20 pixelated"
                          style={{ imageRendering: 'pixelated' }}
                        />

                        {/* Status Bubble */}
                        <motion.div
                           initial={{ opacity: 0, scale: 0 }}
                           animate={{ opacity: 1, scale: 1 }}
                           key={`bubble-${currentStatus}`}
                           className="absolute -top-12 -right-12 bg-white text-black p-4 rounded-3xl rounded-bl-none shadow-2xl min-w-[200px]"
                        >
                           <p className="text-[13px] font-black uppercase tracking-widest leading-tight">
                              {statusSteps[currentStatus].catDesc}
                           </p>
                        </motion.div>
                      </motion.div>
                   </div>
                   <p className="mt-8 text-2xl font-black italic uppercase tracking-tighter">{statusSteps[currentStatus].label}</p>
                </motion.div>
             </AnimatePresence>

             {/* Background Truck Animation */}
             <motion.img
               src="/truck_anim.png"
               className="absolute bottom-8 right-0 w-32 grayscale opacity-10"
               animate={{ x: [-200, 1000] }}
               transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
             />
          </div>

          {/* Stepper */}
          <div className="relative px-4">
            <div className="absolute top-6 left-12 right-12 h-1 bg-[color:var(--border)]" />
            <motion.div
              className="absolute top-6 left-12 h-1 bg-[color:var(--foreground)] origin-left"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: (currentStatus / (statusSteps.length - 1)) }}
              transition={{ duration: 1, ease: "circOut" }}
            />
            <div className="relative flex justify-between">
               {statusSteps.map((step, i) => (
                 <div key={step.id} className="flex flex-col items-center relative z-10">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 border-2 ${i <= currentStatus ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] border-[color:var(--foreground)] shadow-xl' : 'bg-[color:var(--surface)] text-[color:var(--foreground)]/40 border-[color:var(--border)]'}`}
                      animate={i === currentStatus ? { scale: [1, 1.2, 1] } : {}}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                       <step.icon size={20} />
                    </motion.div>
                    <p className={`mt-4 text-[17px] font-black uppercase tracking-widest text-center max-w-[100px] ${i <= currentStatus ? 'opacity-100' : 'opacity-20'}`}>
                      {step.label}
                    </p>
                 </div>
               ))}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-[color:var(--border)] flex flex-col md:flex-row gap-12">
             <div className="flex-1">
               <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                 <MapPin size={16} /> Adres Dostawy
               </h3>
               <p className="text-[18px] font-bold uppercase opacity-40 leading-relaxed">
                 Jan Kowalski<br />
                 ul. Gamingowa 13/37<br />
                 00-001 Warszawa, Polska
               </p>
             </div>
             <div className="flex-1">
               <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                 <Truck size={16} /> Metoda Dostawy
               </h3>
               <p className="text-[18px] font-bold uppercase opacity-40 leading-relaxed">
                 Kurier TWWW Squad (InPost)<br />
                 Przewidywana dostawa: Jutro
               </p>
             </div>
          </div>
        </div>

        <div className="mt-8 text-center">
           <button className="text-[17px] font-black uppercase tracking-widest opacity-30 hover:opacity-100 transition-opacity underline underline-offset-4">
             Potrzebujesz pomocy? Skontaktuj się ze Squadem
           </button>
        </div>
      </div>
      <Footer />
    </main>
  );
}
