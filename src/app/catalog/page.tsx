'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, BookOpen } from 'lucide-react';

const PAGES = [
  { id: 1, title: 'THE WAY WE WEAR', content: 'SEASON 2026 // LOOKBOOK', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
  { id: 2, title: 'OVERSIZE CULTURE', content: 'STREETWEAR // GAMING // GEEK', image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=800' },
  { id: 3, title: 'PREMIUM QUALITY', content: '80% BAWEŁNA CZESANA', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800' },
  { id: 4, title: 'CUSTOM EMBROIDERY', content: 'TWOJA GRAFIKA // NASZA PASJA', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800' },
  { id: 5, title: 'SQUAD ONLY', content: 'DOŁĄCZ DO NAS NA DISCORDZIE', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' },
  { id: 6, title: 'TWWW // 2026', content: 'KONIEC KATALOGU', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
];

export default function CatalogPage() {
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {}); // Catch if browser blocks autoplay
    }
  };

  const next = () => {
    if (currentPage < PAGES.length - 1) {
      playFlipSound();
      setCurrentPage(prev => prev + 1);
    }
  };

  const prev = () => {
    if (currentPage > 0) {
      playFlipSound();
      setCurrentPage(prev => prev - 1);
    }
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio overflow-hidden">
    <main className="min-h-screen bg-[color:var(--surface)] font-abel overflow-hidden">
      <Header />
      <audio ref={audioRef} src="https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3" />

      <div className="container mx-auto px-6 pt-40 pb-20 min-h-[80vh] flex flex-col items-center justify-center">
        <div className="mb-8 text-center">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[color:var(--foreground)]/30 mb-2">Digital Lookbook // 2026</p>
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[color:var(--foreground)]/30 mb-2">Digital Lookbook // 2025</p>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">Katalog TWWW</h1>
        </div>

        <div className="relative w-full max-w-5xl aspect-[16/10] perspective-2000">
           {/* Book Container */}
           <div className="absolute inset-0 flex">
              {/* Left Side (Static) */}
              <div className="w-1/2 bg-[color:var(--surface)] border-r border-[color:var(--border)] shadow-2xl relative overflow-hidden flex items-center justify-center p-12">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                 {currentPage > 0 && (
                   <div className="relative z-10 text-center">
                      <img src={PAGES[currentPage-1].image} className="w-full h-64 object-cover grayscale mb-8 shadow-xl" alt="" />
                      <h2 className="text-2xl font-black uppercase italic">{PAGES[currentPage-1].title}</h2>
                   </div>
                 )}
              </div>

              {/* Right Side (Static) */}
              <div className="w-1/2 bg-[color:var(--surface)] shadow-2xl relative overflow-hidden flex items-center justify-center p-12">
                 <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
                 <div className="relative z-10 text-center">
                    <img src={PAGES[currentPage].image} className="w-full h-64 object-cover grayscale mb-8 shadow-xl" alt="" />
                    <h2 className="text-2xl font-black uppercase italic">{PAGES[currentPage].title}</h2>
                    <p className="text-xs font-bold opacity-40 uppercase tracking-widest mt-4">{PAGES[currentPage].content}</p>
                 </div>
              </div>
           </div>

           {/* Interactive Overlay for flipping */}
           <div className="absolute inset-0 flex z-20 pointer-events-none">
              <div className="w-1/2 h-full cursor-pointer pointer-events-auto" onClick={prev} />
              <div className="w-1/2 h-full cursor-pointer pointer-events-auto" onClick={next} />
           </div>

           {/* Controls */}
           <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-12 z-30">
              <button
                onClick={prev}
                disabled={currentPage === 0}
                className="w-14 h-14 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center disabled:opacity-20 transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="flex flex-col items-center">
                <span className="text-xs font-black uppercase tracking-widest">{currentPage + 1} / {PAGES.length}</span>
                <div className="w-32 h-1 bg-[color:var(--border)] rounded-full mt-2 overflow-hidden">
                   <motion.div
                    className="h-full bg-[color:var(--foreground)]"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentPage + 1) / PAGES.length) * 100}%` }}
                   />
                </div>
              </div>
              <button
                onClick={next}
                disabled={currentPage === PAGES.length - 1}
                className="w-14 h-14 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center disabled:opacity-20 transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronRight size={24} />
              </button>
           </div>
        </div>

        <div className="mt-40 max-w-2xl text-center">
           <BookOpen size={32} className="mx-auto mb-6 opacity-20" />
           <p className="text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed">
             Ten katalog jest wyrazem naszej pasji do minimalizmu i nowoczesności. Każda strona to kolejna historia, którą chcemy z Tobą dzielić. Przewracaj strony, aby odkryć nasz świat.
           </p>
        </div>
      </div>
      <Footer />
    </main>
  );
}
