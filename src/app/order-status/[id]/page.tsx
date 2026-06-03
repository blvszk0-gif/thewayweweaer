'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { Card } from '@/components/ui/Card';
import { WheelOfFortune } from '@/components/shop/WheelOfFortune';
import { motion, AnimatePresence } from 'framer-motion';
import { Truck, Package, Home, CheckCircle } from 'lucide-react';

type OrderStatus = 'confirmed' | 'packing' | 'shipped' | 'delivered';

export default function OrderStatusPage() {
  const params = useParams();
  const id = typeof params?.id === 'string' ? params.id : '';
  const searchParams = useSearchParams();
  const isNew = searchParams.get('new') === 'true';
  const [status, setStatus] = useState<OrderStatus>('confirmed');

  // Simulation for demo purposes
  useEffect(() => {
    if (!isNew) {
      const statuses: OrderStatus[] = ['confirmed', 'packing', 'shipped', 'delivered'];
      const timer = setInterval(() => {
        setStatus(prev => {
          const currentIndex = statuses.indexOf(prev);
          return statuses[(currentIndex + 1) % statuses.length];
        });
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [isNew]);

  return (
    <div className="container mx-auto px-6 py-24 max-w-4xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-black mb-2 uppercase tracking-tighter">STATUS ZAMÓWIENIA</h1>
        <p className="text-gray-400 font-mono">#{id.slice(-8).toUpperCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <Card className="relative overflow-hidden min-h-[400px] flex items-center justify-center bg-[#2d3236]">
            <CatAnimation status={status} />
          </Card>

          <div className="flex justify-between items-center px-4">
            <StatusIcon icon={<CheckCircle />} label="Potwierdzone" active={status === 'confirmed'} completed={['packing', 'shipped', 'delivered'].includes(status)} />
            <StatusIcon icon={<Package />} label="Pakowanie" active={status === 'packing'} completed={['shipped', 'delivered'].includes(status)} />
            <StatusIcon icon={<Truck />} label="Wysłane" active={status === 'shipped'} completed={['delivered'].includes(status)} />
            <StatusIcon icon={<Home />} label="Odebrane" active={status === 'delivered'} completed={false} />
          </div>

          <div className="bg-[#2d3236] p-6 rounded-3xl border border-white/10">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Truck size={18} className="text-white/60" />
              Śledzenie kuriera
            </h3>
            <div className="relative h-12 bg-white/5 rounded-2xl overflow-hidden flex items-center px-4">
              <motion.div
                className="absolute top-0 left-0 h-full bg-white/10"
                initial={{ width: '0%' }}
                animate={{
                  width: status === 'confirmed' ? '10%' :
                         status === 'packing' ? '40%' :
                         status === 'shipped' ? '80%' : '100%'
                }}
              />
              <motion.div
                animate={{
                  x: status === 'confirmed' ? 0 :
                     status === 'packing' ? 150 :
                     status === 'shipped' ? 350 : 500
                }}
                className="relative z-10"
              >
                <img src="/truck_anim.png" alt="Truck" className="h-8 w-auto" />
              </motion.div>
            </div>
            <p className="text-xs text-gray-400 mt-4">
              {status === 'shipped' ? 'Kurier w drodze do Ciebie!' : 'Przygotowujemy Twoją paczkę premium.'}
            </p>
          </div>
        </div>

        <div>
          {isNew ? (
            <Card className="text-center py-12 bg-[#2d3236]">
              <h2 className="text-3xl font-black mb-6 uppercase tracking-tighter">GRATULACJE!</h2>
              <p className="text-gray-400 mb-8">Jako nowy członek squadu masz jeden darmowy los w naszym Kole Fortuny.</p>
              <WheelOfFortune />
            </Card>
          ) : (
            <Card className="bg-[#2d3236]">
              <h2 className="text-xl font-bold mb-6 uppercase tracking-tighter">Szczegóły zamówienia</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-white/5 rounded-xl overflow-hidden">
                     <img src="https://via.placeholder.com/100" alt="product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold uppercase">Oversize Hoodie "SQUAD"</p>
                    <p className="text-xs text-gray-400">Rozmiar: M</p>
                  </div>
                  <p className="ml-auto font-black">349 PLN</p>
                </div>
              </div>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}

const StatusIcon = ({ icon, label, active, completed }: { icon: any, label: string, active: boolean, completed: boolean }) => (
  <div className="flex flex-col items-center gap-2">
    <div className={`p-3 rounded-full transition-all duration-500 ${active ? 'bg-white text-[#383e42] shadow-[0_0_30px_rgba(255,255,255,0.3)] scale-110' : completed ? 'bg-white/20 text-white' : 'bg-white/5 text-white/20'}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className={`text-[10px] font-black uppercase tracking-widest ${active ? 'text-white' : 'text-gray-500'}`}>{label}</span>
  </div>
);

const CatAnimation = ({ status }: { status: OrderStatus }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {status === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6">
              <img src="/cat.jpg" alt="Cat OK" className="w-48 h-48 rounded-3xl object-cover shadow-2xl" />
              <div className="absolute -top-4 -right-4 bg-white text-black text-xs font-black px-4 py-2 rounded-full uppercase shadow-xl">VIP</div>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1.5 }}
                className="absolute -bottom-4 -left-4 text-4xl"
              >👍</motion.div>
            </div>
            <p className="font-black text-2xl uppercase tracking-tighter">KOT DAJE OKEJKĘ!</p>
            <p className="text-gray-400 text-sm">Zamówienie potwierdzone</p>
          </motion.div>
        )}

        {status === 'packing' && (
          <motion.div
            key="packing"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-6 group">
              <div className="w-48 h-24 bg-amber-900/50 rounded-b-3xl relative overflow-hidden border-t-8 border-amber-800">
                <motion.div
                  animate={{ y: [0, -20, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="absolute -top-12 left-1/2 -translate-x-1/2"
                >
                   <img src="/cat.jpg" alt="Cat in box" className="w-24 h-24 rounded-full object-cover border-4 border-[#2d3236]" />
                </motion.div>
              </div>
            </div>
            <p className="font-black text-2xl uppercase tracking-tighter">KOT W PUDEŁKU</p>
            <p className="text-gray-400 text-sm">Pakujemy Twoje skarby</p>
          </motion.div>
        )}

        {status === 'shipped' && (
          <motion.div
            key="shipped"
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className="flex flex-col items-center"
          >
            <div className="w-64 h-48 border-8 border-white/5 rounded-3xl relative mb-6 overflow-hidden bg-sky-900/20 backdrop-blur-md">
               <motion.div
                 animate={{ x: [0, 5, 0] }}
                 transition={{ repeat: Infinity, duration: 4 }}
                 className="absolute bottom-0 right-4"
               >
                 <img src="/cat.jpg" alt="Cat at window" className="w-32 h-32 rounded-t-3xl object-cover" />
               </motion.div>
               <div className="absolute top-4 left-4 w-12 h-12 bg-white/10 rounded-full animate-pulse shadow-[0_0_50px_rgba(255,255,255,0.2)]"></div>
            </div>
            <p className="font-black text-2xl uppercase tracking-tighter">KOT WYGLĄDA OKNEM</p>
            <p className="text-gray-400 text-sm">Paczka jest w drodze</p>
          </motion.div>
        )}

        {status === 'delivered' && (
          <motion.div
            key="delivered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-12">
               <div className="w-64 h-4 bg-white/5 rounded-full relative">
                  <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: -64, opacity: 1 }}
                    className="absolute left-8"
                  >
                    <img src="/cat.jpg" alt="Cat on desk" className="w-32 h-32 rounded-3xl object-cover shadow-2xl border-4 border-white/20" />
                  </motion.div>
                  <div className="absolute -top-16 right-8 w-16 h-12 bg-black rounded border border-white/10 flex items-center justify-center">
                     <div className="w-10 h-8 bg-white/10 rounded-sm"></div>
                  </div>
               </div>
            </div>
            <p className="font-black text-2xl uppercase tracking-tighter">KOT NA BIURKU</p>
            <p className="text-gray-400 text-sm">Zlecenie wykonane, miłego noszenia!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
