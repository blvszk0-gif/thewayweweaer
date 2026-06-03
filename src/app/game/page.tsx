import React from 'react';
import { WheelOfFortune } from '@/components/shop/WheelOfFortune';

export default function GamePage() {
  return (
    <div className="container mx-auto px-6 py-24 text-center">
      <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">Strefa Gracza</h1>
      <p className="text-gray-400 mb-12">Zakręć kołem i zgarnij nagrody od The Way WE Wear!</p>
      <div className="max-w-2xl mx-auto bg-white/5 p-8 rounded-3xl border border-white/10">
        <WheelOfFortune />
      </div>
    </div>
  );
}
