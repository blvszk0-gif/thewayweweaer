'use client';

import React, { useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Button } from '@/components/ui/Button';

const prizes = [
  { text: 'DARMOWA DOSTAWA', color: '#8b5cf6' },
  { text: 'RABAT -10%', color: '#ec4899' },
  { text: 'WLEPKI GRATIS', color: '#f59e0b' },
  { text: 'KOD DO VALORANT', color: '#10b981' },
  { text: 'RABAT -20%', color: '#3b82f6' },
  { text: 'GADŻET 3D', color: '#ef4444' },
];

export const WheelOfFortune: React.FC = () => {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const controls = useAnimation();

  const spin = async () => {
    if (spinning) return;
    setSpinning(true);

    const randomDegree = 1800 + Math.floor(Math.random() * 360);

    await controls.start({
      rotate: randomDegree,
      transition: { duration: 5, ease: [0.45, 0.05, 0.55, 0.95] }
    });

    const finalDegree = randomDegree % 360;
    const prizeIndex = Math.floor(((360 - finalDegree + 30) % 360) / 60);
    setResult(prizes[prizeIndex].text);
    setSpinning(false);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-64 h-64 md:w-80 md:h-80 mb-8">
        {/* Pointer */}
        <div className="absolute top-[-20px] left-1/2 -translate-x-1/2 z-20 text-3xl">▼</div>

        <motion.div
          animate={controls}
          className="w-full h-full rounded-full border-8 border-gray-800 overflow-hidden relative shadow-[0_0_50px_rgba(168,85,247,0.3)]"
        >
          {prizes.map((prize, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-full origin-center"
              style={{
                transform: `rotate(${i * 60}deg)`,
                backgroundColor: prize.color,
                clipPath: 'polygon(50% 50%, 50% 0, 100% 0, 100% 50%)'
              }}
            >
              <span className="absolute top-1/4 left-3/4 -translate-x-1/2 -translate-y-1/2 -rotate-45 font-bold text-[10px] md:text-xs text-white text-center w-20 leading-tight">
                {prize.text}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {!result ? (
        <Button onClick={spin} disabled={spinning} size="lg">
          {spinning ? 'LOSOWANIE...' : 'ZAKRĘĆ KOŁEM'}
        </Button>
      ) : (
        <div className="text-center animate-bounce">
          <p className="text-sm text-gray-400 mb-1">WYGRAŁEŚ:</p>
          <p className="text-2xl font-black text-[var(--primary,theme(colors.purple.500))]">{result}</p>
          <p className="text-xs text-gray-500 mt-4">Twój bonus został dopisany do zamówienia!</p>
        </div>
      )}
    </div>
  );
};
