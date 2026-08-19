import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CatOrderConfirmed: React.FC = () => {
  const [frame, setFrame] = useState(0);
  const [showCheckEffect, setShowCheckEffect] = useState(false);

  useEffect(() => {
    // Animation loop timer
    const interval = setInterval(() => {
      setFrame((prev) => {
        const next = (prev + 1) % 8;
        if (next === 2 || next === 6) {

          setShowCheckEffect(true);
          setTimeout(() => setShowCheckEffect(false), 900);
        }
        return next;
      });
    }, 450);

    return () => clearInterval(interval);
  }, []);

  // Frame details:
  // 0, 1: Writing on clipboard, looking down intently
  // 2, 3: Finishing checkmark, smiling & looking up at user with happy eyes
  // 4, 5: Winking / proud cheerful nod with ear twitch
  // 6, 7: Writing next line and wagging tail
  const isSmiling = frame >= 2 && frame <= 5;
  const isWinking = frame === 4 || frame === 5;
  const penOffset = frame % 2 === 0 ? 0 : 2;
  const tailSwing = (frame % 4 < 2) ? -3 : 4;
  const earTwitch = frame === 3 ? -2 : 0;
  const bodyBob = frame % 2 === 0 ? 0 : 1;

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Sparkles / Checked Notification Float */}
      {showCheckEffect && (
        <motion.div
          initial={{ opacity: 0, y: 15, scale: 0.7 }}
          animate={{ opacity: 1, y: -25, scale: 1.1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'backOut' }}
          className="absolute top-12 z-20 flex items-center gap-2 bg-emerald-500/90 text-white font-mono font-bold text-xs px-3 py-1.5 rounded-full shadow-lg border border-emerald-300"
        >
          <span className="text-sm">✓</span>
          <span>ZATWIERDZONE!</span>
          <span className="text-yellow-300">✨</span>
        </motion.div>
      )}

      {/* Main Pixel Art Cat SVG */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        <defs>
          <filter id="pixel-glow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="0" floodColor="#1e1915" floodOpacity="0.4" />
          </filter>
        </defs>

        {/* --- TAIL (Behind cat on the right, animated wagging) --- */}
        <g transform={`translate(${22 + tailSwing * 0.3}, ${16}) rotate(${tailSwing * 2} 24 24)`}>
          {/* Tail Outline */}
          <rect x="0" y="2" width="4" height="7" fill="#262322" />
          <rect x="2" y="0" width="3" height="3" fill="#262322" />

          {/* Tail Orange fur */}
          <rect x="1" y="4" width="2" height="4" fill="#e58e49" />
          <rect x="1" y="4" width="1" height="4" fill="#f4aa65" />

          {/* Tail White tip */}
          <rect x="1" y="1" width="2" height="3" fill="#ffffff" />
          <rect x="1" y="3" width="2" height="1" fill="#e2ded7" />
        </g>

        {/* --- CAT BODY & HEAD GROUP --- */}
        <g transform={`translate(0, ${bodyBob * 0.5})`}>
          {/* === OUTLINE === */}
          {/* Left Ear Outline */}
          <rect x="7" y="5" width="4" height="6" fill="#262322" />
          <rect x="8" y="4" width="2" height="2" fill="#262322" />
          {/* Right Ear Outline */}
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

          {/* === FUR COLOR FILLING === */}
          {/* Left Ear Base & Inner Pink */}
          <rect x="8" y="6" width="2" height="4" fill="#e58e49" />
          <rect x="8" y="6" width="2" height="3" fill="#f29898" transform={`translate(0, ${earTwitch})`} />
          {/* Right Ear Base & Inner Pink */}
          <rect x="22" y="6" width="2" height="4" fill="#e58e49" />
          <rect x="22" y="6" width="2" height="3" fill="#f29898" />

          {/* Head Base Fur (Orange) */}
          <rect x="7" y="8" width="18" height="11" fill="#e58e49" />
          {/* Head Highlight (top lighter orange) */}
          <rect x="9" y="8" width="14" height="2" fill="#f4aa65" />
          <rect x="7" y="9" width="2" height="7" fill="#f4aa65" />
          {/* Head Shadow (right side darker orange) */}
          <rect x="23" y="10" width="2" height="8" fill="#d97a29" />

          {/* White Face Patch (Muzzle & Forehead Center) */}
          <rect x="14" y="11" width="4" height="4" fill="#ffffff" />
          <rect x="11" y="14" width="10" height="5" fill="#ffffff" />
          <rect x="11" y="17" width="10" height="2" fill="#e8e4dc" />

          {/* Cheek Whiskers */}
          <rect x="8" y="14" width="3" height="1" fill="#262322" />
          <rect x="8" y="16" width="3" height="1" fill="#262322" />
          <rect x="21" y="14" width="3" height="1" fill="#262322" />
          <rect x="21" y="16" width="3" height="1" fill="#262322" />

          {/* Pink Cheeks Blush (when smiling) */}
          {isSmiling && (
            <>
              <rect x="8" y="17" width="2" height="1" fill="#ffb6b6" />
              <rect x="22" y="17" width="2" height="1" fill="#ffb6b6" />
            </>
          )}

          {/* === EYES === */}
          {isWinking ? (
            <>
              {/* Left Eye: Happy Arc Wink `^` */}
              <rect x="11" y="12" width="2" height="1" fill="#262322" />
              <rect x="10" y="13" width="1" height="1" fill="#262322" />
              <rect x="13" y="13" width="1" height="1" fill="#262322" />

              {/* Right Eye: Open with shine */}
              <rect x="19" y="12" width="2" height="3" fill="#262322" />
              <rect x="19" y="12" width="1" height="1" fill="#ffffff" />
            </>
          ) : isSmiling ? (
            <>
              {/* Both Eyes: Smiling Happy Curves `^ ^` */}
              <rect x="11" y="12" width="2" height="1" fill="#262322" />
              <rect x="10" y="13" width="1" height="1" fill="#262322" />
              <rect x="13" y="13" width="1" height="1" fill="#262322" />

              <rect x="19" y="12" width="2" height="1" fill="#262322" />
              <rect x="18" y="13" width="1" height="1" fill="#262322" />
              <rect x="21" y="13" width="1" height="1" fill="#262322" />
            </>
          ) : (
            <>
              {/* Eyes: Normal focused looking down at the clipboard */}
              <rect x="11" y="12" width="2" height="3" fill="#262322" />
              <rect x="11" y="12" width="1" height="1" fill="#ffffff" />

              <rect x="19" y="12" width="2" height="3" fill="#262322" />
              <rect x="19" y="12" width="1" height="1" fill="#ffffff" />
            </>
          )}

          {/* Pink Nose */}
          <rect x="15" y="14" width="2" height="1" fill="#ea7b7b" />

          {/* Cute Cat 'w' Mouth */}
          <rect x="14" y="15" width="1" height="1" fill="#262322" />
          <rect x="17" y="15" width="1" height="1" fill="#262322" />
          <rect x="15" y="16" width="2" height="1" fill="#262322" />

          {/* Body Base (Orange sides, White belly) */}
          <rect x="8" y="20" width="16" height="7" fill="#e58e49" />
          <rect x="11" y="20" width="10" height="7" fill="#ffffff" />
          <rect x="11" y="25" width="10" height="2" fill="#e8e4dc" />
          <rect x="8" y="21" width="3" height="6" fill="#f4aa65" />
          <rect x="21" y="21" width="3" height="6" fill="#d97a29" />
        </g>

        {/* --- WOODEN CLIPBOARD WITH ORDER SHEET (Held in front) --- */}
        <g transform="translate(0, 0)">
          {/* Clipboard Board Shadow & Outline */}
          <rect x="8" y="20" width="16" height="9" fill="#262322" />
          {/* Clipboard Board Wood Tone */}
          <rect x="9" y="21" width="14" height="7" fill="#a06030" />
          <rect x="10" y="21" width="12" height="7" fill="#b8723c" />

          {/* White Paper Page on Clipboard */}
          <rect x="10" y="22" width="12" height="6" fill="#f8fafc" />
          <rect x="10" y="26" width="12" height="2" fill="#e2e8f0" />

          {/* Top Metal Clip */}
          <rect x="13" y="19" width="6" height="2" fill="#262322" />
          <rect x="14" y="19" width="4" height="2" fill="#94a3b8" />
          <rect x="15" y="20" width="2" height="1" fill="#f1f5f9" />

          {/* Checklist lines on paper */}
          <rect x="12" y="23" width="4" height="1" fill="#334155" />
          <rect x="17" y="23" width="3" height="1" fill="#10b981" />

          <rect x="12" y="25" width="5" height="1" fill="#334155" />
          <rect x="18" y="25" width="2" height="1" fill="#10b981" />

          {/* Little green checkmarks on paper */}
          <rect x="11" y="23" width="1" height="1" fill="#10b981" />
          <rect x="11" y="25" width="1" height="1" fill="#10b981" />

          {/* Left Paws holding the clipboard */}
          <rect x="7" y="22" width="3" height="3" fill="#262322" />
          <rect x="8" y="23" width="2" height="2" fill="#ffffff" />
          <rect x="8" y="24" width="2" height="1" fill="#e8e4dc" />

          {/* Right Paw holding pen / marker */}
          <g transform={`translate(${penOffset * 0.4}, ${penOffset * 0.3})`}>
            {/* Paw holding pen */}
            <rect x="22" y="21" width="3" height="3" fill="#262322" />
            <rect x="22" y="22" width="2" height="2" fill="#ffffff" />

            {/* Stylus / Marker Pen */}
            <rect x="20" y="20" width="4" height="2" fill="#262322" />
            <rect x="20" y="21" width="3" height="1" fill="#10b981" />
            {/* Pen tip pointing at paper */}
            <rect x="19" y="22" width="2" height="1" fill="#262322" />
            <rect x="19" y="22" width="1" height="1" fill="#34d399" />
          </g>
        </g>

        {/* Tiny golden verified stamp on board */}
        <g transform="translate(16, 24)">
          <rect x="0" y="0" width="5" height="3" fill="#f59e0b" opacity="0.9" />
          <rect x="1" y="1" width="3" height="1" fill="#fef3c7" />
        </g>
      </svg>

      {/* Floating Pixel Particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            y: [0, -10, 0],
            opacity: [0.4, 0.9, 0.4],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-8 text-amber-300 text-xs font-mono font-bold"
        >
          ✦
        </motion.div>
        <motion.div
          animate={{
            y: [0, -14, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          className="absolute top-1/3 right-10 text-emerald-400 text-xs font-mono font-bold"
        >
          ✓
        </motion.div>
      </div>
    </div>
  );
};
