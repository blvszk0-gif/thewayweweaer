'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Truck, CheckCircle2, MapPin, Search } from 'lucide-react';
import { useParams } from 'next/navigation';
import { CatOrderConfirmed } from '@/components/animations/CatOrderConfirmed';
import { CatPreparingOrder } from '@/components/animations/CatPreparingOrder';
import { CatShippingOrder } from '@/components/animations/CatShippingOrder';
import { CatDelivered } from '@/components/animations/CatDelivered';
import { PixelBackdrop } from '@/components/animations/PixelBackdrop';

const statusSteps = [
  {
    id: 'confirmed',
    label: 'ZAMÓWIENIE POTWIERDZONE',
    icon: CheckCircle2,
    component: CatOrderConfirmed,
  },
  {
    id: 'preparing',
    label: 'PRZYGOTOWANIE ZAMÓWIENIA',
    icon: Search,
    component: CatPreparingOrder,
  },
  {
    id: 'sent',
    label: 'WYSYŁKA ZAMÓWIENIA',
    icon: Truck,
    component: CatShippingOrder,
  },
  {
    id: 'delivered',
    label: 'ODEBRANO',
    icon: Package,
    component: CatDelivered,
  },
];

export default function OrderStatusPage() {
  const tAccount = useTranslations('account');
  const params = useParams();
  const id = params.id as string;
  const [currentStatus, setCurrentStatus] = useState(1);

  useEffect(() => {
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

          <div className="mb-20 flex flex-col items-center justify-center relative">
             <PixelBackdrop statusLabel={statusSteps[currentStatus].label}>
               <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStatus}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                    className="relative z-10 w-full h-full flex items-center justify-center"
                  >
                     {React.createElement(statusSteps[currentStatus].component)}
                  </motion.div>
               </AnimatePresence>
             </PixelBackdrop>
             <p className="mt-6 text-2xl font-black italic uppercase tracking-tighter text-center">{statusSteps[currentStatus].label}</p>
          </div>

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
                 <button key={step.id} onClick={() => setCurrentStatus(i)} className="flex flex-col items-center relative z-10 cursor-pointer">
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
                 </button>
               ))}
            </div>
          </div>

          <div className="mt-20 pt-12 border-t border-[color:var(--border)] flex flex-col md:flex-row gap-12">
             <div className="flex-1">
               <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                 <MapPin size={16} /> {tAccount('adres_dostawy')}
               </h3>
               <p className="text-[18px] font-bold uppercase opacity-40 leading-relaxed">
                 Jan Kowalski<br />
                 ul. Modowa 13/37<br />
                 00-001 Warszawa, Polska
               </p>
             </div>
             <div className="flex-1">
               <h3 className="text-base font-black uppercase tracking-widest mb-6 italic flex items-center gap-2">
                 <Truck size={16} /> {tAccount('preferowana_metoda_dostawy')}
               </h3>
               <p className="text-[18px] font-bold uppercase opacity-40 leading-relaxed">
                 Kurier TWWW (InPost)
               </p>
             </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
