import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CatShippingOrder: React.FC = () => {
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    // Fast drive loop for wheels and road
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % 16);
    }, 110);

    return () => clearInterval(interval);
  }, []);

  const vanBounce = frame % 4 === 0 ? 0.6 : (frame % 4 === 2 ? -0.4 : 0);
  const wheelRotate = (frame % 4) * 90;
  const roadOffset = (frame % 8) * 4; // Rapid road dash
  const treeOffset1 = (frame * 2.5) % 64;
  const treeOffset2 = ((frame * 2.5) + 32) % 64;
  const cloudOffset = (frame * 0.8) % 64;
  const earFlutter = frame % 2 === 0 ? -1 : 1;

  const handleHonk = (e: React.MouseEvent) => {
    e.stopPropagation();

  };

  return (
    <div className="relative w-full h-full flex items-center justify-center p-4">
      {/* Courier Route Indicator */}
      <div className="absolute top-6 z-20 flex items-center justify-between w-4/5 max-w-[340px] bg-slate-900/85 backdrop-blur-md border border-cyan-500/30 text-cyan-200 text-[11px] font-mono px-3 py-1 rounded-full shadow-lg">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>W TRASIE DO PACZKOMATU</span>
        </div>
        <button
          onClick={handleHonk}
          className="bg-cyan-500/20 hover:bg-cyan-500/40 text-cyan-300 px-2 py-0.5 rounded text-[10px] font-bold transition-colors cursor-pointer border border-cyan-400/30 flex items-center gap-1"
          title="Naciśnij klakson!"
        >
          <span>BEEP</span>
          <span>📢</span>
        </button>
      </div>

      {/* Main Pixel Art Van Scene SVG */}
      <svg
        viewBox="0 0 32 32"
        className="w-full h-full max-w-[420px] max-h-[420px] drop-shadow-xl select-none"
        style={{
          imageRendering: 'pixelated',
          shapeRendering: 'crispEdges',
        }}
      >
        {/* --- SKY PARALLAX (Clouds) --- */}
        <g transform={`translate(${-cloudOffset}, 0)`}>
          {/* Cloud 1 */}
          <rect x="8" y="4" width="8" height="2" fill="#ffffff" opacity="0.6" />
          <rect x="10" y="3" width="5" height="3" fill="#ffffff" opacity="0.7" />

          {/* Cloud 2 */}
          <rect x="40" y="5" width="7" height="2" fill="#ffffff" opacity="0.5" />
          <rect x="42" y="4" width="4" height="2" fill="#ffffff" opacity="0.6" />
        </g>

        {/* --- BACKGROUND SCENERY (Pixel Trees & Streetlamps scrolling) --- */}
        <g transform="translate(0, 16)">
          {/* Tree 1 */}
          <g transform={`translate(${32 - treeOffset1}, 0)`}>
            {/* Tree Trunk */}
            <rect x="2" y="3" width="2" height="5" fill="#451a03" />
            {/* Tree Foliage */}
            <rect x="0" y="0" width="6" height="4" fill="#15803d" />
            <rect x="1" y="-2" width="4" height="3" fill="#16a34a" />
            <rect x="2" y="-3" width="2" height="2" fill="#22c55e" />
          </g>

          {/* Tree 2 */}
          <g transform={`translate(${32 - treeOffset2}, 0)`}>
            <rect x="2" y="4" width="2" height="4" fill="#451a03" />
            <rect x="0" y="1" width="6" height="4" fill="#047857" />
            <rect x="1" y="-1" width="4" height="3" fill="#10b981" />
          </g>
        </g>

        {/* --- ROAD SURFACE & DASHED LANE LINES --- */}
        <g transform="translate(0, 24)">
          {/* Road Asphalt */}
          <rect x="0" y="0" width="32" height="8" fill="#262322" />
          <rect x="0" y="1" width="32" height="7" fill="#1e293b" />
          <rect x="0" y="1" width="32" height="1" fill="#334155" />

          {/* Scrolling Dashed Road Markings */}
          <g transform={`translate(${-roadOffset}, 0)`}>
            <rect x="0" y="4" width="6" height="1" fill="#f8fafc" />
            <rect x="10" y="4" width="6" height="1" fill="#f8fafc" />
            <rect x="20" y="4" width="6" height="1" fill="#f8fafc" />
            <rect x="30" y="4" width="6" height="1" fill="#f8fafc" />
            <rect x="40" y="4" width="6" height="1" fill="#f8fafc" />
            <rect x="50" y="4" width="6" height="1" fill="#f8fafc" />
          </g>
        </g>

        {/* --- EXHAUST SMOKE PUFFS (Behind van) --- */}
        <g transform={`translate(2, ${21 + vanBounce})`}>
          {frame % 4 === 0 && (
            <>
              <rect x="-3" y="1" width="2" height="2" fill="#94a3b8" opacity="0.6" />
              <rect x="-6" y="0" width="3" height="2" fill="#cbd5e1" opacity="0.3" />
            </>
          )}
          {frame % 4 === 2 && (
            <>
              <rect x="-2" y="2" width="2" height="2" fill="#cbd5e1" opacity="0.8" />
              <rect x="-5" y="1" width="2" height="2" fill="#e2e8f0" opacity="0.4" />
            </>
          )}
        </g>

        {/* --- DELIVERY VAN (With Cat inside driver cabin) --- */}
        <g transform={`translate(4, ${11 + vanBounce})`}>
          {/* === VAN CHASSIS & BODY OUTLINE === */}
          {/* Van Outline */}
          <rect x="0" y="2" width="23" height="11" fill="#262322" />
          <rect x="18" y="4" width="5" height="9" fill="#262322" />
          <rect x="22" y="6" width="2" height="7" fill="#262322" />

          {/* Van Main Body (Warm Cream / Off-White Streetwear Fleet) */}
          <rect x="1" y="3" width="16" height="9" fill="#f8fafc" />
          <rect x="17" y="5" width="5" height="7" fill="#f8fafc" />
          <rect x="22" y="7" width="1" height="5" fill="#f8fafc" />

          {/* Van Lower Trim (Matte Slate) */}
          <rect x="1" y="10" width="22" height="2" fill="#334155" />
          <rect x="1" y="11" width="22" height="1" fill="#1e293b" />

          {/* Front Bumper & Headlight */}
          <rect x="22" y="8" width="2" height="2" fill="#facc15" />
          <rect x="23" y="9" width="1" height="1" fill="#ffffff" />
          <rect x="22" y="10" width="2" height="2" fill="#0f172a" />

          {/* Tail light */}
          <rect x="0" y="7" width="1" height="3" fill="#ef4444" />

          {/* Rear Cargo Window with Parcels */}
          <rect x="2" y="4" width="8" height="5" fill="#1e293b" />
          {/* Parcel Boxes in back */}
          <rect x="3" y="5" width="4" height="3" fill="#b45309" />
          <rect x="3" y="6" width="4" height="1" fill="#f59e0b" />
          <rect x="5" y="7" width="4" height="2" fill="#92400e" />

          {/* "TWWW" Brand Side Panel Decal */}
          <rect x="11" y="4" width="5" height="5" fill="#0f172a" />
          <rect x="12" y="5" width="3" height="1" fill="#ffffff" />
          <rect x="13" y="6" width="1" height="2" fill="#ffffff" />
          <rect x="12" y="8" width="3" height="1" fill="#f59e0b" />

          {/* --- DRIVER CABIN WINDOW & CAT DRIVER --- */}
          <rect x="17" y="4" width="5" height="5" fill="#38bdf8" opacity="0.3" />
          <rect x="17" y="4" width="5" height="5" fill="#1e293b" />

          {/* CAT HEAD & EARS IN CABIN */}
          <g transform={`translate(16, ${-1})`}>
            {/* Left Ear flutter */}
            <rect x="1" y={2 + earFlutter} width="2" height="2" fill="#262322" />
            <rect x="1" y={2 + earFlutter} width="1" height="1" fill="#f29898" />

            {/* Right Ear */}
            <rect x="4" y="2" width="2" height="2" fill="#262322" />
            <rect x="4" y="2" width="1" height="1" fill="#f29898" />

            {/* Cat Head Orange Fur */}
            <rect x="1" y="4" width="5" height="4" fill="#e58e49" />
            <rect x="2" y="4" width="3" height="1" fill="#f4aa65" />

            {/* Cat White Face & Muzzle */}
            <rect x="3" y="5" width="3" height="3" fill="#ffffff" />
            <rect x="4" y="6" width="1" height="1" fill="#ea7b7b" /> {/* nose */}

            {/* Cat Eye (Looking focused ahead on the road) */}
            <rect x="4" y="5" width="1" height="1" fill="#0f172a" />

            {/* Cat White Paws on Steering Wheel */}
            <rect x="4" y="8" width="2" height="2" fill="#ffffff" />

            {/* Black Steering Wheel */}
            <rect x="5" y="7" width="1" height="3" fill="#262322" />
            <rect x="6" y="6" width="1" height="2" fill="#262322" />
          </g>

          {/* Side Mirror */}
          <rect x="21" y="6" width="2" height="2" fill="#262322" />
          <rect x="22" y="6" width="1" height="1" fill="#94a3b8" />

          {/* --- WHEELS WITH SPINNING ANIMATION --- */}
          {/* Rear Wheel */}
          <g transform="translate(4, 11)">
            {/* Wheel Arch cutout */}
            <rect x="-1" y="-1" width="5" height="3" fill="#262322" />
            {/* Tire */}
            <rect x="0" y="0" width="4" height="4" fill="#0f172a" />
            {/* Rim Spinning */}
            <g transform={`rotate(${wheelRotate} 2 2)`}>
              <rect x="1" y="1" width="2" height="2" fill="#cbd5e1" />
              <rect x="1" y="1" width="1" height="1" fill="#475569" />
              <rect x="2" y="2" width="1" height="1" fill="#475569" />
            </g>
          </g>

          {/* Front Wheel */}
          <g transform="translate(17, 11)">
            {/* Wheel Arch cutout */}
            <rect x="-1" y="-1" width="5" height="3" fill="#262322" />
            {/* Tire */}
            <rect x="0" y="0" width="4" height="4" fill="#0f172a" />
            {/* Rim Spinning */}
            <g transform={`rotate(${wheelRotate} 2 2)`}>
              <rect x="1" y="1" width="2" height="2" fill="#cbd5e1" />
              <rect x="1" y="1" width="1" height="1" fill="#475569" />
              <rect x="2" y="2" width="1" height="1" fill="#475569" />
            </g>
          </g>
        </g>
      </svg>

      {/* Wind & Speed motion streaks */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{ x: [80, -80], opacity: [0.8, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
          className="absolute top-1/2 right-12 w-12 h-0.5 bg-cyan-300/60 rounded"
        />
        <motion.div
          animate={{ x: [100, -80], opacity: [0.6, 0] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: 'linear', delay: 0.2 }}
          className="absolute top-2/3 right-4 w-8 h-0.5 bg-amber-300/50 rounded"
        />
      </div>
    </div>
  );
};
