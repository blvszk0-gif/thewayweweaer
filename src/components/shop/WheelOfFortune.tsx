'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

const prizes = [
  'DARMOWA DOSTAWA',
  'WLEPKI GRATIS',
  'KOD -10%',
  'GADŻET 3D',
  'KOD -20%',
  'LIMITOWANA KRÓWKA',
  'DARMOWA DOSTAWA',
  'WLEPKI GRATIS'
];

export const WheelOfFortune = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    // Simulate spin
    setTimeout(() => {
      setSpinning(false);
      setResult(prizes[Math.floor(Math.random() * prizes.length)]);
    }, 2000);
  };

  return (
    <div className="flex flex-col items-center gap-8 py-12">
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <motion.div
          animate={spinning ? { rotate: 360 * 5 + Math.random() * 360 } : {}}
          transition={{ duration: 2, ease: "easeOut" }}
          className="w-full h-full rounded-full border-8 border-white/10 relative overflow-hidden bg-gray-900"
        >
          {prizes.map((p, i) => (
            <div
              key={i}
              className="absolute top-0 left-1/2 w-1 h-1/2 bg-white/20 origin-bottom"
              style={{ transform: `translateX(-50%) rotate(${i * (360 / prizes.length)}deg)` }}
            />
          ))}
        </motion.div>

        <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-white z-10" />
      </div>

      <div className="text-center">
        {result ? (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
          >
            <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">WYGRANA:</p>
            <p className="text-2xl font-black text-white">{result}</p>
          </motion.div>
        ) : (
          <button
            onClick={spin}
            disabled={spinning}
            className="bg-white text-[#383e42] px-12 py-4 rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all disabled:opacity-50"
          >
            {spinning ? 'LOSOWANIE...' : 'ZAKRĘĆ KOŁEM!'}
          </button>
        )}
      </div>
    </div>
  );
};
