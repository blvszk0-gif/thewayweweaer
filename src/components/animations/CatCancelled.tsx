import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CatCancelled: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 8);
    }, 700);
    return () => clearInterval(interval);
  }, []);

  // Slow, droopy idle loop — no happy beats, just a tired sigh every few frames.
  const isSighing = frame === 3 || frame === 4;
  const bodyBob = frame % 4 < 2 ? 0 : 1;
  const tailDroop = frame % 4 < 2 ? 0 : 1;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Cancelled Status Pill */}
      <motion.div
        initial={{ opacity: 0, y: 15, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="absolute top-12 z-20 flex items-center gap-2 bg-slate-600/90 text-white font-mono font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-slate-400/40"
      >
        <span className="text-sm">✕</span>
        <span>ANULOWANE</span>
      </motion.div>

      {/* Main Pixel Art Cat SVG — same rig as the confirmed cat, recoloured grey and sad */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl select-none opacity-90"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* --- TAIL (drooping low, static) --- */}
        <g transform={`translate(22, ${16 + tailDroop})`}>
          <rect x="0" y="2" width="4" height="7" fill="#262322" />
          <rect x="2" y="0" width="3" height="3" fill="#262322" />
          <rect x="1" y="4" width="2" height="4" fill="#8d8981" />
          <rect x="1" y="4" width="1" height="4" fill="#a3a099" />
          <rect x="1" y="1" width="2" height="3" fill="#d8d4cc" />
          <rect x="1" y="3" width="2" height="1" fill="#c3bfb6" />
        </g>

        {/* --- CAT BODY & HEAD GROUP --- */}
        <g transform={`translate(0, ${1 + bodyBob * 0.5})`}>
          {/* === OUTLINE === */}
          {/* Ears */}
          <rect x="7" y="5" width="4" height="6" fill="#262322" />
          <rect x="8" y="4" width="2" height="2" fill="#262322" />
          <rect x="21" y="5" width="4" height="6" fill="#262322" />
          <rect x="22" y="4" width="2" height="2" fill="#262322" />
          {/* Head Top Outline */}
          <rect x="10" y="7" width="12" height="2" fill="#262322" />
          {/* Head Cheeks Outline */}
          <rect x="5" y="11" width="2" height="9" fill="#262322" />
          <rect x="25" y="11" width="2" height="9" fill="#262322" />
          {/* Chin Outline */}
          <rect x="7" y="19" width="18" height="2" fill="#262322" />
          {/* Body Bottom Outline */}
          <rect x="6" y="20" width="2" height="7" fill="#262322" />
          <rect x="24" y="20" width="2" height="7" fill="#262322" />
          <rect x="7" y="27" width="18" height="2" fill="#262322" />

          {/* === FUR COLOUR FILLING (greyed out) === */}
          <rect x="8" y="6" width="2" height="4" fill="#8d8981" />
          <rect x="8" y="6" width="2" height="3" fill="#b7bcc4" />
          <rect x="22" y="6" width="2" height="4" fill="#8d8981" />
          <rect x="22" y="6" width="2" height="3" fill="#b7bcc4" />

          {/* Head Base Fur (Grey) */}
          <rect x="7" y="8" width="18" height="11" fill="#918d85" />
          <rect x="9" y="8" width="14" height="2" fill="#a3a099" />
          <rect x="7" y="9" width="2" height="7" fill="#a3a099" />
          <rect x="23" y="10" width="2" height="8" fill="#6f6b64" />

          {/* Dull White Face Patch */}
          <rect x="14" y="11" width="4" height="4" fill="#e2ded7" />
          <rect x="11" y="14" width="10" height="5" fill="#e2ded7" />
          <rect x="11" y="17" width="10" height="2" fill="#cac6bd" />

          {/* Cheek Whiskers */}
          <rect x="8" y="14" width="3" height="1" fill="#262322" />
          <rect x="8" y="16" width="3" height="1" fill="#262322" />
          <rect x="21" y="14" width="3" height="1" fill="#262322" />
          <rect x="21" y="16" width="3" height="1" fill="#262322" />

          {/* === EYES: sad, drooping outer corners, no bright shine === */}
          <rect x="11" y="12" width="2" height="3" fill="#262322" />
          <rect x="10" y="14" width="1" height="1" fill="#262322" />

          <rect x="19" y="12" width="2" height="3" fill="#262322" />
          <rect x="21" y="14" width="1" height="1" fill="#262322" />

          {/* Single teardrop, only during the sigh beat */}
          {isSighing && (
            <motion.rect
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              x="11" y="15" width="1" height="2" fill="#7dd3fc"
            />
          )}

          {/* Grey Nose */}
          <rect x="15" y="14" width="2" height="1" fill="#a8a4a0" />

          {/* Frown mouth (peak at top, corners droop down) */}
          <rect x="15" y="15" width="2" height="1" fill="#262322" />
          <rect x="14" y="16" width="1" height="1" fill="#262322" />
          <rect x="17" y="16" width="1" height="1" fill="#262322" />

          {/* Body Base (grey sides, dull belly) */}
          <rect x="8" y="20" width="16" height="7" fill="#918d85" />
          <rect x="11" y="20" width="10" height="7" fill="#e2ded7" />
          <rect x="11" y="25" width="10" height="2" fill="#cac6bd" />
          <rect x="8" y="21" width="3" height="6" fill="#a3a099" />
          <rect x="21" y="21" width="3" height="6" fill="#6f6b64" />
        </g>

        {/* --- CLIPBOARD WITH CANCELLED SLIP (held limply) --- */}
        <g transform="translate(0, 1)">
          <rect x="8" y="20" width="16" height="9" fill="#262322" />
          <rect x="9" y="21" width="14" height="7" fill="#736357" />
          <rect x="10" y="21" width="12" height="7" fill="#87766a" />

          <rect x="10" y="22" width="12" height="6" fill="#e9e6e0" />
          <rect x="10" y="26" width="12" height="2" fill="#cac6bd" />

          <rect x="13" y="19" width="6" height="2" fill="#262322" />
          <rect x="14" y="19" width="4" height="2" fill="#94a3b8" />
          <rect x="15" y="20" width="2" height="1" fill="#f1f5f9" />

          {/* Red cancelled cross-outs instead of green checklist */}
          <rect x="12" y="23" width="4" height="1" fill="#94a3b8" />
          <rect x="17" y="23" width="3" height="1" fill="#ef4444" />
          <rect x="12" y="25" width="5" height="1" fill="#94a3b8" />
          <rect x="18" y="25" width="2" height="1" fill="#ef4444" />
          <rect x="11" y="23" width="1" height="1" fill="#ef4444" />
          <rect x="11" y="25" width="1" height="1" fill="#ef4444" />

          {/* Left Paw resting on clipboard */}
          <rect x="7" y="22" width="3" height="3" fill="#262322" />
          <rect x="8" y="23" width="2" height="2" fill="#e2ded7" />

          {/* Right Paw hanging limply, no pen */}
          <rect x="22" y="22" width="3" height="3" fill="#262322" />
          <rect x="22" y="23" width="2" height="2" fill="#e2ded7" />
        </g>
      </svg>
    </div>
  );
};
