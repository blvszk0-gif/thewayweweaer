import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PixelBackdropProps {
  children: React.ReactNode;
  showScanlines?: boolean;
  statusLabel?: string;
  onPetCat?: () => void;
}

interface FloatingHeart {
  id: number;
  x: number;
  y: number;
}

export const PixelBackdrop: React.FC<PixelBackdropProps> = ({
  children,
  showScanlines = false,
  statusLabel,
  onPetCat
}) => {
  const [hearts, setHearts] = useState<FloatingHeart[]>([]);
  const [isPurring, setIsPurring] = useState(false);

  const handleStageClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newHeart: FloatingHeart = {
      id: Date.now() + Math.random(),
      x,
      y,
    };

    setHearts((prev) => [...prev.slice(-8), newHeart]);

    setIsPurring(true);
    setTimeout(() => setIsPurring(false), 1200);

    if (onPetCat) {
      onPetCat();
    }
  };

  return (
    <div
      id="pixel-stage-container"
      onClick={handleStageClick}
      className="relative w-full max-w-[540px] aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-900/80 cursor-pointer select-none group"
      style={{
        background: 'linear-gradient(180deg, #62c3f0 0%, #8ed3ea 28%, #d8cfbc 58%, #f2a672 82%, #e58245 100%)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.45), inset 0 0 0 2px rgba(255, 255, 255, 0.15)'
      }}
      title="Kliknij w kotka, aby go pogłaskać! ✨"
    >
      {/* Background Pixel Grid Pattern */}
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#000 1px, transparent 1px)',
          backgroundSize: '16px 16px'
        }}
      />

      {/* Main Animation Component Slot */}
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>

      {/* Floating Purr Hearts upon clicking */}
      <AnimatePresence>
        {hearts.map((h) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 1, scale: 0.5, x: h.x - 14, y: h.y - 14 }}
            animate={{
              opacity: 0,
              scale: 1.4,
              y: h.y - 80 - Math.random() * 40,
              x: h.x - 14 + (Math.random() - 0.5) * 30
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute z-30 pointer-events-none text-2xl font-bold"
          >
            💛
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Purring bubble notification */}
      <AnimatePresence>
        {isPurring && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-30 bg-slate-900/90 backdrop-blur-sm text-amber-300 text-xs font-mono px-3 py-1.5 rounded-full border border-amber-400/40 shadow-lg flex items-center gap-1.5 pointer-events-none"
          >
            <span>*mrrr... purrr*</span>
            <span className="text-pink-400">✨🐾</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Retro Scanline Overlay (Optional) */}
      {showScanlines && (
        <div
          className="absolute inset-0 pointer-events-none z-20 opacity-20"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(0,0,0,0.5) 0px, rgba(0,0,0,0.5) 2px, transparent 2px, transparent 4px)',
          }}
        />
      )}

      {/* Subtitle / Interaction hint */}
      <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between pointer-events-none">
        {statusLabel && (
          <div className="bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg border border-white/10 text-[10px] font-bold tracking-wider text-slate-200 uppercase font-mono shadow-md flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <span>{statusLabel}</span>
          </div>
        )}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/70 backdrop-blur-md px-2 py-0.5 rounded text-[10px] text-amber-200/90 font-mono">
          🐾 Kliknij, by pogłaskać
        </div>
      </div>
    </div>
  );
};
