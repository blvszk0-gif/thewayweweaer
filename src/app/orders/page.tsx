import React from 'react';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  return (
    <div className="container mx-auto px-6 py-24">
      <h1 className="text-4xl font-black mb-8 uppercase tracking-tighter">Twoje Zamówienia</h1>
      <div className="bg-white/5 p-12 rounded-3xl border border-white/10 text-center">
        <Package size={48} className="mx-auto mb-4 opacity-20" />
        <p className="text-gray-400">Nie masz jeszcze żadnych zamówień.</p>
      </div>
    </div>
  );
}
