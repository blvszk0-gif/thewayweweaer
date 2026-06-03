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
        <h1 className="text-4xl font-black mb-2">STATUS ZAMÓWIENIA</h1>
        <p className="text-gray-500 font-mono">#{id.slice(-8).toUpperCase()}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        <div className="space-y-8">
          <Card className="relative overflow-hidden min-h-[300px] flex items-center justify-center">
            <CatAnimation status={status} />
          </Card>

          <div className="flex justify-between items-center px-4">
            <StatusIcon icon={<CheckCircle />} label="Potwierdzone" active={status === 'confirmed'} completed={['packing', 'shipped', 'delivered'].includes(status)} />
            <StatusIcon icon={<Package />} label="Pakowanie" active={status === 'packing'} completed={['shipped', 'delivered'].includes(status)} />
            <StatusIcon icon={<Truck />} label="Wysłane" active={status === 'shipped'} completed={['delivered'].includes(status)} />
            <StatusIcon icon={<Home />} label="Odebrane" active={status === 'delivered'} completed={false} />
          </div>

          <div className="bg-gray-900/50 p-6 rounded-3xl border border-gray-800">
            <h3 className="font-bold mb-4 flex items-center gap-2">
              <Truck size={18} className="text-purple-500" />
              Śledzenie kuriera
            </h3>
            <div className="relative h-2 bg-gray-800 rounded-full overflow-hidden">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500"
                initial={{ width: '0%' }}
                animate={{
                  width: status === 'confirmed' ? '10%' :
                         status === 'packing' ? '40%' :
                         status === 'shipped' ? '80%' : '100%'
                }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {status === 'shipped' ? 'Kurier w drodze do Ciebie!' : 'Przygotowujemy Twoją paczkę premium.'}
            </p>
          </div>
        </div>

        <div>
          {isNew ? (
            <Card className="text-center py-12">
              <h2 className="text-2xl font-black mb-6">GRATULACJE!</h2>
              <p className="text-gray-400 mb-8">Jako nowy członek squadu masz jeden darmowy los w naszym Kole Fortuny.</p>
              <WheelOfFortune />
            </Card>
          ) : (
            <Card>
              <h2 className="text-xl font-bold mb-6">Szczegóły zamówienia</h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-gray-800 rounded-xl overflow-hidden">
                     <img src="https://via.placeholder.com/100" alt="product" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold">Hoodie "LORE" V1</p>
                    <p className="text-xs text-gray-500">Rozmiar: M</p>
                  </div>
                  <p className="ml-auto font-bold">299 PLN</p>
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
    <div className={`p-3 rounded-full transition-colors ${active ? 'bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.5)]' : completed ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-600'}`}>
      {React.cloneElement(icon, { size: 20 })}
    </div>
    <span className={`text-[10px] font-bold uppercase tracking-tighter ${active ? 'text-white' : 'text-gray-600'}`}>{label}</span>
  </div>
);

const CatAnimation = ({ status }: { status: OrderStatus }) => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <AnimatePresence mode="wait">
        {status === 'confirmed' && (
          <motion.div
            key="confirmed"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="flex flex-col items-center"
          >
            {/* Pixel Cat OK Placeholder */}
            <div className="w-32 h-32 bg-orange-400 rounded-2xl relative mb-4 flex items-center justify-center text-4xl">
              🐱👍
              <div className="absolute -top-2 -right-2 bg-white text-black text-[8px] font-bold px-2 py-1 rounded-full uppercase">VIP</div>
            </div>
            <p className="font-black text-xl">KOT DAJE OKEJKĘ!</p>
            <p className="text-gray-500 text-sm">Zamówienie potwierdzone</p>
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
            {/* Pixel Cat in Box Placeholder */}
            <div className="w-32 h-20 bg-amber-900 rounded-b-xl relative mb-4">
               <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-20 h-20 bg-orange-400 rounded-full flex items-center justify-center text-3xl">🐱</div>
               <div className="absolute top-0 left-0 w-full h-4 bg-amber-800 flex justify-around">
                  <div className="w-1/3 h-full border-r border-amber-950"></div>
                  <div className="w-1/3 h-full border-r border-amber-950"></div>
               </div>
            </div>
            <p className="font-black text-xl">KOT W PUDEŁKU</p>
            <p className="text-gray-500 text-sm">Pakujemy Twoje skarby</p>
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
            {/* Pixel Cat at Window Placeholder */}
            <div className="w-40 h-32 border-4 border-gray-700 rounded-lg relative mb-4 overflow-hidden bg-sky-900">
               <div className="absolute bottom-0 right-4 w-16 h-20 bg-orange-400 rounded-t-full flex items-center justify-center text-2xl">🐱</div>
               <div className="absolute top-4 left-4 w-8 h-8 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            <p className="font-black text-xl">KOT WYGLĄDA OKNEM</p>
            <p className="text-gray-500 text-sm">Paczka jest w drodze</p>
          </motion.div>
        )}

        {status === 'delivered' && (
          <motion.div
            key="delivered"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            {/* Pixel Cat on Desk Placeholder */}
            <div className="w-48 h-2 bg-gray-700 mb-8 relative">
               <div className="absolute -top-16 left-8 w-16 h-16 bg-orange-400 rounded-lg flex items-center justify-center text-2xl">🐱</div>
               <div className="absolute -top-20 right-8 w-12 h-12 bg-black rounded border border-gray-600 flex items-center justify-center">
                  <div className="w-8 h-6 bg-blue-500/20 rounded-sm"></div>
               </div>
            </div>
            <p className="font-black text-xl">KOT NA BIURKU</p>
            <p className="text-gray-500 text-sm">Zlecenie wykonane, miłego noszenia!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
