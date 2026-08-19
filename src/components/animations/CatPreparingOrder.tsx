import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CatPreparingOrder: React.FC = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Fast sewing loop
    const interval = setInterval(() => {
      setStep((prev) => {
        const next = (prev + 1) % 12;
        if (next % 3 === 0) {

        }
        return next;
      });
    }, 180);

    return () => clearInterval(interval);
  }, []);

  // Needle punches down on even steps
  const needleDown = step % 2 === 1;
  const spoolSpin = (step % 4) * 90;
  const fabricOffset = (step % 6) * 0.5;
  const headBob = step % 4 < 2 ? 0 : 0.8;
  const tailWag = step % 6 < 3 ? -2 : 3;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Atelier Crafting Badge */}
      <div className="absolute top-6 z-20 flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-amber-500/30 text-amber-200 text-[11px] font-mono px-3 py-1 rounded-full shadow-lg">
        <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
        <span>PRACOWNIA KRAWIECKA TWWW</span>
        <span className="text-xs">🧵</span>
      </div>

      {/* Main Pixel Art Sewing Scene */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* --- WORKBENCH TABLE SURFACE --- */}
        <g transform="translate(0, 24)">
          {/* Table top outline & surface */}
          <rect x="1" y="0" width="30" height="8" fill="#262322" />
          <rect x="2" y="1" width="28" height="2" fill="#784421" />
          <rect x="2" y="3" width="28" height="4" fill="#583015" />
          {/* Measuring tape on table */}
          <rect x="2" y="2" width="8" height="1" fill="#facc15" />
          <rect x="3" y="2" width="1" height="1" fill="#262322" />
          <rect x="5" y="2" width="1" height="1" fill="#262322" />
          <rect x="7" y="2" width="1" height="1" fill="#262322" />
          {/* Pincushion with pins */}
          <rect x="25" y="0" width="4" height="3" fill="#262322" />
          <rect x="26" y="1" width="2" height="2" fill="#e11d48" />
          <rect x="26" y="0" width="1" height="1" fill="#38bdf8" />
          <rect x="27" y="0" width="1" height="1" fill="#facc15" />
        </g>

        {/* --- TAIL (Behind chair/cat) --- */}
        <g transform={`translate(${24 + tailWag * 0.2}, 16) rotate(${tailWag * 3} 24 24)`}>
          <rect x="0" y="2" width="3" height="6" fill="#262322" />
          <rect x="1" y="3" width="1" height="4" fill="#e58e49" />
          <rect x="1" y="1" width="2" height="2" fill="#ffffff" />
        </g>

        {/* --- CAT (Seated on the right, sewing) --- */}
        <g transform={`translate(8, ${headBob})`}>
          {/* Left Ear */}
          <rect x="5" y="5" width="4" height="5" fill="#262322" />
          <rect x="6" y="6" width="2" height="3" fill="#e58e49" />
          <rect x="6" y="6" width="1" height="2" fill="#f29898" />

          {/* Right Ear */}
          <rect x="16" y="5" width="4" height="5" fill="#262322" />
          <rect x="17" y="6" width="2" height="3" fill="#e58e49" />
          <rect x="17" y="6" width="1" height="2" fill="#f29898" />

          {/* Head Outline & Orange Fur */}
          <rect x="5" y="8" width="15" height="10" fill="#262322" />
          <rect x="6" y="9" width="13" height="8" fill="#e58e49" />
          <rect x="7" y="9" width="11" height="2" fill="#f4aa65" />

          {/* White Face Patch & Muzzle */}
          <rect x="8" y="11" width="9" height="6" fill="#ffffff" />
          <rect x="9" y="15" width="7" height="2" fill="#e8e4dc" />

          {/* Whiskers */}
          <rect x="5" y="13" width="2" height="1" fill="#262322" />
          <rect x="18" y="13" width="2" height="1" fill="#262322" />

          {/* Eyes (Focused artisan look / with cute tailor glasses) */}
          <rect x="8" y="12" width="3" height="3" fill="#262322" />
          <rect x="9" y="12" width="2" height="2" fill="#0f172a" />
          <rect x="9" y="12" width="1" height="1" fill="#ffffff" />

          <rect x="14" y="12" width="3" height="3" fill="#262322" />
          <rect x="14" y="12" width="2" height="2" fill="#0f172a" />
          <rect x="14" y="12" width="1" height="1" fill="#ffffff" />

          {/* Retro Round Wire Glasses frame */}
          <rect x="7" y="11" width="5" height="1" fill="#d97706" />
          <rect x="13" y="11" width="5" height="1" fill="#d97706" />
          <rect x="12" y="12" width="1" height="1" fill="#d97706" />

          {/* Nose & Mouth */}
          <rect x="12" y="14" width="1" height="1" fill="#ea7b7b" />
          <rect x="11" y="15" width="3" height="1" fill="#262322" />

          {/* Cat Body */}
          <rect x="6" y="17" width="13" height="7" fill="#262322" />
          <rect x="7" y="18" width="11" height="6" fill="#e58e49" />
          <rect x="9" y="18" width="7" height="6" fill="#ffffff" />

          {/* Paws guiding the hoodie under needle */}
          <g transform={`translate(${-fabricOffset * 0.3}, 0)`}>
            {/* Left Paw */}
            <rect x="2" y="21" width="4" height="3" fill="#262322" />
            <rect x="3" y="22" width="2" height="2" fill="#ffffff" />

            {/* Right Paw */}
            <rect x="7" y="21" width="4" height="3" fill="#262322" />
            <rect x="8" y="22" width="2" height="2" fill="#ffffff" />
          </g>
        </g>

        {/* --- HOODIE FABRIC BEING SEWN (Washed black/anthracite streetwear hoodie) --- */}
        <g transform={`translate(${4 - fabricOffset}, 21)`}>
          {/* Main hoodie body */}
          <rect x="0" y="0" width="14" height="4" fill="#262322" />
          <rect x="1" y="1" width="12" height="3" fill="#334155" />
          <rect x="2" y="1" width="10" height="1" fill="#475569" />

          {/* Mini Hood / Collar detail */}
          <rect x="1" y="-1" width="4" height="2" fill="#1e293b" />

          {/* TWWW Label Tag (Woven cream tag) */}
          <rect x="10" y="1" width="3" height="2" fill="#f8fafc" />
          <rect x="11" y="1" width="1" height="1" fill="#e11d48" />

          {/* Fresh white stitches line */}
          <rect x="3" y="2" width="1" height="1" fill="#ffffff" />
          <rect x="5" y="2" width="1" height="1" fill="#ffffff" />
          <rect x="7" y="2" width="1" height="1" fill="#ffffff" />
        </g>

        {/* --- INDUSTRIAL SEWING MACHINE --- */}
        <g transform="translate(4, 11)">
          {/* Machine Body Outline */}
          <rect x="0" y="2" width="11" height="11" fill="#262322" />
          <rect x="1" y="3" width="9" height="3" fill="#1e293b" />
          <rect x="1" y="3" width="9" height="1" fill="#475569" />

          {/* Machine Vertical Arm */}
          <rect x="1" y="5" width="4" height="7" fill="#1e293b" />
          <rect x="1" y="5" width="1" height="7" fill="#334155" />

          {/* Machine Head / Overhang */}
          <rect x="5" y="4" width="5" height="3" fill="#1e293b" />

          {/* Top Thread Spool Holder */}
          <rect x="2" y="0" width="1" height="2" fill="#94a3b8" />
          {/* Spinning Spool of thread */}
          <g transform={`rotate(${spoolSpin} 2.5 1)`}>
            <rect x="1" y="0" width="3" height="2" fill="#f59e0b" />
            <rect x="2" y="0" width="1" height="2" fill="#fef08a" />
          </g>

          {/* Thread Line to needle */}
          <rect x="4" y="2" width="4" height="1" fill="#fef08a" />
          <rect x="8" y="3" width="1" height="4" fill="#fef08a" />

          {/* Chrome Needle Bar & Presser Foot */}
          <rect x="8" y="7" width="1" height="5" fill="#262322" />
          <rect x="8" y={needleDown ? 8 : 7} width="1" height="4" fill="#cbd5e1" />
          {/* Needle Tip punching fabric */}
          <rect x="8" y={needleDown ? 11 : 9} width="1" height="2" fill="#ffffff" />

          {/* Spark at needle impact */}
          {needleDown && (
            <g transform="translate(7, 10)">
              <rect x="0" y="0" width="1" height="1" fill="#fef08a" />
              <rect x="2" y="0" width="1" height="1" fill="#fef08a" />
            </g>
          )}

          {/* Machine Bed / Base Plate */}
          <rect x="0" y="11" width="11" height="2" fill="#262322" />
          <rect x="1" y="11" width="9" height="1" fill="#64748b" />
          <rect x="6" y="11" width="3" height="1" fill="#e2e8f0" />
        </g>
      </svg>

      {/* Flying Crafting Thread / Stitch Particles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            x: [0, 20, 40],
            y: [0, -15, -30],
            opacity: [0, 0.8, 0],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          className="absolute top-1/2 left-1/3 text-amber-300 font-mono text-xs font-bold"
        >
          - - -
        </motion.div>
        <motion.div
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.3, 0.7, 0.3],
          }}
          transition={{ duration: 1.2, repeat: Infinity }}
          className="absolute bottom-1/3 right-8 text-pink-300 text-xs"
        >
          ✨
        </motion.div>
      </div>
    </div>
  );
};
