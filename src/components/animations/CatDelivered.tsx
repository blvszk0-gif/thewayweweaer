import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

export const CatDelivered: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Initial delivery celebration

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#f59e0b', '#10b981', '#38bdf8', '#f43f5e', '#ffffff']
      });
    } catch {
      // ignore
    }

    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 8);
    }, 380);

    return () => clearInterval(interval);
  }, []);

  // Frame kinematics
  // 0, 1: Cat offering parcel forward
  // 2, 3: Customer receives package, parcel transfers slightly to right
  // 4, 5: Cat does happy celebration jump / paws up with hearts
  // 6, 7: Happy nod & smile
  const isCelebration = frame >= 4 && frame <= 6;
  const parcelShiftX = frame >= 2 ? 1.5 : 0;
  const parcelLiftY = frame >= 2 ? -1 : 0;
  const catJumpY = isCelebration ? -1.5 : 0;
  const tailHappyWag = frame % 2 === 0 ? 3 : -2;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Delivered Success Pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="absolute top-6 z-20 flex items-center gap-1.5 bg-emerald-600/90 text-white text-[11px] font-mono font-bold px-3.5 py-1 rounded-full shadow-xl border border-emerald-400/50 backdrop-blur-md"
      >
        <span className="text-sm">✓</span>
        <span>PACZKA ODEBRANA / DORĘCZONA</span>
        <span>🎉</span>
      </motion.div>

      {/* Main Pixel Art Side-Profile Scene SVG */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* --- FLOOR GROUND --- */}
        <g transform="translate(0, 26)">
          <rect x="0" y="0" width="32" height="6" fill="#262322" />
          <rect x="0" y="1" width="32" height="5" fill="#475569" />
          <rect x="0" y="1" width="32" height="1" fill="#64748b" />
          {/* Welcome doormat */}
          <rect x="10" y="1" width="12" height="2" fill="#78350f" />
          <rect x="11" y="2" width="10" height="1" fill="#92400e" />
        </g>

        {/* --- SIDE PROFILE GINGER CAT (Standing on left) --- */}
        <g transform={`translate(4, ${catJumpY})`}>
          {/* === TAIL (Curling up excitedly on the far left) === */}
          <g transform={`translate(${tailHappyWag * 0.3}, 0) rotate(${tailHappyWag * 4} 1 18)`}>
            <rect x="0" y="14" width="3" height="8" fill="#262322" />
            <rect x="1" y="15" width="1" height="6" fill="#e58e49" />
            <rect x="0" y="12" width="3" height="3" fill="#262322" />
            <rect x="1" y="13" width="2" height="2" fill="#ffffff" />
          </g>

          {/* === CAT BODY (Side Profile) === */}
          {/* Back & Hind legs */}
          <rect x="2" y="16" width="7" height="10" fill="#262322" />
          <rect x="3" y="17" width="5" height="8" fill="#e58e49" />
          <rect x="3" y="17" width="1" height="7" fill="#f4aa65" />

          {/* White Chest & Belly (Facing right) */}
          <rect x="6" y="17" width="3" height="8" fill="#ffffff" />
          <rect x="6" y="23" width="3" height="2" fill="#e8e4dc" />

          {/* Cat Paws / Feet at bottom */}
          <rect x="3" y="24" width="6" height="3" fill="#262322" />
          <rect x="4" y="25" width="4" height="2" fill="#ffffff" />

          {/* === CAT HEAD (Side profile facing right) === */}
          {/* Ears */}
          <rect x="2" y="7" width="3" height="4" fill="#262322" />
          <rect x="3" y="8" width="1" height="2" fill="#f29898" />

          <rect x="5" y="6" width="3" height="4" fill="#262322" />
          <rect x="6" y="7" width="1" height="2" fill="#f29898" />

          {/* Head Outline & Orange Base */}
          <rect x="2" y="9" width="9" height="8" fill="#262322" />
          <rect x="3" y="10" width="7" height="6" fill="#e58e49" />
          <rect x="3" y="10" width="2" height="5" fill="#f4aa65" />

          {/* White Muzzle & Snout poking forward right */}
          <rect x="7" y="11" width="4" height="5" fill="#262322" />
          <rect x="7" y="12" width="3" height="4" fill="#ffffff" />

          {/* Whiskers */}
          <rect x="9" y="13" width="3" height="1" fill="#262322" />

          {/* Pink Nose & Smile */}
          <rect x="10" y="12" width="1" height="1" fill="#ea7b7b" />
          {isCelebration ? (
            /* Open happy cat mouth */
            <rect x="9" y="14" width="2" height="2" fill="#e11d48" />
          ) : (
            <rect x="9" y="14" width="2" height="1" fill="#262322" />
          )}

          {/* Eye (Happy closed curve `^` or joyful open spark) */}
          {isCelebration ? (
            <g transform="translate(6, 11)">
              <rect x="0" y="1" width="2" height="1" fill="#262322" />
              <rect x="0" y="0" width="1" height="1" fill="#262322" />
              <rect x="2" y="0" width="1" height="1" fill="#262322" />
            </g>
          ) : (
            <g transform="translate(6, 11)">
              <rect x="0" y="0" width="2" height="2" fill="#262322" />
              <rect x="0" y="0" width="1" height="1" fill="#ffffff" />
            </g>
          )}

          {/* Blush on cheek */}
          <rect x="5" y="14" width="2" height="1" fill="#ffb6b6" />

          {/* Cat Arms & Paws extending parcel or raised in celebration */}
          {isCelebration ? (
            /* Paws up celebration `\o/` */
            <g transform="translate(7, 13)">
              <rect x="0" y="-1" width="3" height="5" fill="#262322" />
              <rect x="1" y="0" width="2" height="3" fill="#ffffff" />
            </g>
          ) : (
            /* Paws holding box towards customer */
            <g transform="translate(8, 17)">
              <rect x="0" y="0" width="4" height="3" fill="#262322" />
              <rect x="1" y="1" width="3" height="2" fill="#ffffff" />
            </g>
          )}
        </g>

        {/* --- KRAFT PARCEL BOX BEING HANDED OVER --- */}
        <g transform={`translate(${15 + parcelShiftX}, ${15 + parcelLiftY})`}>
          {/* Parcel Box Outline */}
          <rect x="0" y="0" width="8" height="7" fill="#262322" />
          {/* Kraft Cardboard Texture */}
          <rect x="1" y="1" width="6" height="5" fill="#d97706" />
          <rect x="1" y="1" width="6" height="1" fill="#f59e0b" />
          <rect x="1" y="2" width="6" height="4" fill="#b45309" />

          {/* "TWWW" White Security Tape Stripe */}
          <rect x="3" y="1" width="2" height="5" fill="#f8fafc" />
          <rect x="3" y="2" width="2" height="1" fill="#e11d48" /> {/* Red Fragile / Brand Mark */}

          {/* Miniature barcode sticker */}
          <rect x="5" y="3" width="2" height="2" fill="#ffffff" />
          <rect x="5" y="4" width="1" height="1" fill="#262322" />
        </g>

        {/* --- CUSTOMER (Receiving hands & stylish jacket on right) --- */}
        <g transform="translate(23, 13)">
          {/* Customer Jacket / Sleeve (Dark Olive / Washed Grey streetwear) */}
          <rect x="4" y="0" width="5" height="12" fill="#262322" />
          <rect x="5" y="1" width="4" height="10" fill="#3f3f46" />
          <rect x="5" y="2" width="4" height="2" fill="#52525b" />

          {/* Ribbed Wrist Cuff */}
          <rect x="3" y="3" width="3" height="4" fill="#262322" />
          <rect x="4" y="4" width="2" height="2" fill="#18181b" />

          {/* Customer Hands reaching under / around parcel */}
          <g transform={`translate(${parcelShiftX > 0 ? -2 : -1}, 3)`}>
            <rect x="0" y="1" width="4" height="3" fill="#262322" />
            <rect x="0" y="2" width="3" height="2" fill="#fed7aa" />
            <rect x="1" y="1" width="2" height="1" fill="#fdba74" />
          </g>
        </g>

        {/* --- CELEBRATORY SPARKS & HEARTS --- */}
        <g transform="translate(14, 6)">
          {/* Big Yellow Heart */}
          <rect x="2" y="1" width="4" height="3" fill="#eab308" />
          <rect x="1" y="0" width="2" height="2" fill="#facc15" />
          <rect x="5" y="0" width="2" height="2" fill="#facc15" />
          <rect x="3" y="4" width="2" height="1" fill="#ca8a04" />

          {/* Sparkles */}
          <rect x="-4" y="3" width="1" height="1" fill="#38bdf8" />
          <rect x="-3" y="4" width="1" height="1" fill="#38bdf8" />
          <rect x="9" y="2" width="1" height="1" fill="#f43f5e" />
          <rect x="10" y="3" width="1" height="1" fill="#f43f5e" />
        </g>
      </svg>

      {/* Floating Sparkles and Hearts */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            y: [0, -20],
            opacity: [1, 0],
            scale: [0.8, 1.4],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeOut' }}
          className="absolute top-1/4 left-1/3 text-lg"
        >
          💛
        </motion.div>
        <motion.div
          animate={{
            y: [0, -25],
            opacity: [1, 0],
            scale: [0.6, 1.2],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
          className="absolute top-1/3 right-1/4 text-emerald-400 font-mono text-sm"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
};
