'use client';

import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { User, Package, Gift, Settings, LogOut, ChevronRight, Star } from 'lucide-react';

const mockUser = {
  name: 'Kamil Gamer',
  email: 'kamil@squad.pl',
  memberSince: 'Marzec 2026',
  points: 1337,
  tier: 'Squad Veteran'
};

const mockOrders = [
  { id: 'TWWW-0042', date: '10 Cze 2026', total: 299, status: 'Dostarczono', items: 1 },
  { id: 'TWWW-0012', date: '12 Maj 2026', total: 448, status: 'Dostarczono', items: 2 },
];

export default function AccountPage() {
  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio shadow-[inset_0_0_100px_rgba(0,0,0,0.1)]">
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar */}
          <div className="lg:w-80 space-y-4">
             <div className="bg-[color:var(--surface-muted)] p-8 rounded-[40px] border border-[color:var(--border)] shadow-xl text-center">
                <div className="w-24 h-24 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center mx-auto mb-6 text-3xl font-black">
                   KG
                </div>
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">{mockUser.name}</h2>
                <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-1">{mockUser.tier}</p>
             </div>

             <div className="bg-[color:var(--surface)] p-4 rounded-[30px] border border-[color:var(--border)] space-y-2">
                {[
                  { icon: User, label: 'Profil' },
                  { icon: Package, label: 'Zamówienia' },
                  { icon: Gift, label: 'Nagrody' },
                  { icon: Settings, label: 'Ustawienia' },
                ].map((item, i) => (
                  <button key={i} className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-[color:var(--surface-muted)] transition-all group">
                     <div className="flex items-center gap-4">
                        <item.icon size={20} className="opacity-40 group-hover:opacity-100" />
                        <span className="font-black uppercase tracking-widest text-xs">{item.label}</span>
                     </div>
                     <ChevronRight size={16} className="opacity-0 group-hover:opacity-40" />
                  </button>
                ))}
                <button className="w-full flex items-center gap-4 p-4 rounded-2xl hover:bg-red-500/10 text-red-500 transition-all mt-4">
                   <LogOut size={20} />
                   <span className="font-black uppercase tracking-widest text-xs">Wyloguj</span>
                </button>
             </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 space-y-8">
             {/* Stats Cards */}
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-black text-white p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:scale-110 transition-transform duration-1000">
                      <Star size={120} />
                   </div>
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 mb-2">Twoje Punkty</p>
                   <h3 className="text-6xl font-black italic tracking-tighter">{mockUser.points}</h3>
                   <button className="mt-8 text-[10px] font-black uppercase tracking-widest border border-white/20 px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all">
                      Wymień na nagrody
                   </button>
                </div>
                <div className="bg-[color:var(--surface-muted)] p-10 rounded-[40px] border border-[color:var(--border)] shadow-xl">
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/40 mb-2">Członek od</p>
                   <h3 className="text-4xl font-black italic tracking-tighter text-[color:var(--foreground)]">{mockUser.memberSince}</h3>
                   <div className="mt-8 h-2 bg-[color:var(--foreground)]/5 rounded-full overflow-hidden">
                      <div className="h-full bg-[color:var(--foreground)] w-[75%]" />
                   </div>
                   <p className="mt-4 text-[8px] font-bold uppercase opacity-30 tracking-widest text-right">Następny poziom za 663 pkt</p>
                </div>
             </div>

             {/* Recent Orders */}
             <div className="bg-[color:var(--surface)] p-10 rounded-[40px] border border-[color:var(--border)] shadow-xl">
                <h3 className="text-3xl font-black uppercase italic tracking-tighter mb-10">Ostatnie Zamówienia</h3>
                <div className="space-y-6">
                   {mockOrders.map((order) => (
                     <div key={order.id} className="flex flex-col md:flex-row md:items-center justify-between p-6 rounded-3xl bg-[color:var(--surface-muted)] border border-[color:var(--border)] gap-4">
                        <div className="space-y-1">
                           <p className="font-black uppercase tracking-tighter italic text-lg">{order.id}</p>
                           <p className="text-[10px] font-bold opacity-40 uppercase tracking-widest">{order.date} // {order.items} Przedmioty</p>
                        </div>
                        <div className="flex items-center gap-8">
                           <div className="text-right">
                              <p className="text-xl font-black">{order.total} PLN</p>
                              <p className="text-[8px] font-bold text-green-500 uppercase tracking-widest">{order.status}</p>
                           </div>
                           <button className="w-12 h-12 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center hover:scale-110 transition-transform shadow-lg">
                              <ChevronRight size={20} />
                           </button>
                        </div>
                     </div>
                   ))}
                </div>
                <button className="w-full mt-10 py-6 border-2 border-dashed border-[color:var(--border)] rounded-full font-black uppercase tracking-widest text-xs opacity-40 hover:opacity-100 hover:border-[color:var(--foreground)] transition-all">
                   Zobacz całą historię
                </button>
             </div>
          </div>

        </div>
      </div>

      <Footer />
    </main>
  );
}
