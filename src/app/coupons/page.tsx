import React from 'react';
import { Ticket } from 'lucide-react';

export default function CouponsPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Twoje Kupony</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/5 p-8 rounded-3xl border border-white/10 flex items-center gap-6">
          <div className="p-4 bg-white text-[#383e42] rounded-2xl">
            <Ticket size={32} />
          </div>
          <div>
            <h3 className="font-bold text-xl uppercase">KOD: START</h3>
            <p className="text-gray-400 text-sm">Darmowa dostawa na pierwsze zamówienie.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
