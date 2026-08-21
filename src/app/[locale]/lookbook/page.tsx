'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ChevronLeft, ChevronRight, RefreshCcw } from 'lucide-react';
import { getMetaobjects } from '@/lib/shopify';

const DEFAULT_LOOKBOOKS = {
  twww: {
    name: 'TWWW // ORIGINAL',
    pages: [
      { title: 'THE WAY WE WEAR', content: 'SEASON 2026 // LOOKBOOK', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800' },
      { title: 'OVERSIZE CULTURE', content: 'STREETWEAR // PREMIUM // ATELIER', image: 'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=800' },
      { title: 'PREMIUM QUALITY', content: '80% BAWEŁNA CZESANA', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800' },
      { title: 'AUTORSKI HAFT', content: 'PRECYZJA // NASZA PASJA', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800' },
      { title: 'TWWW CLUB', content: 'DOŁĄCZ DO NASZEJ SPOŁECZNOŚCI', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800' },
      { title: 'TWWW // 2026', content: 'KONIEC KATALOGU', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  fly: {
    name: 'THE WAY WE FLY',
    pages: [
      { title: 'UP IN THE AIR', content: 'AERO // STREET // STYLE', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800' },
      { title: 'URBAN FLIGHT', content: 'COLLECTION // 2026', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800' },
      { title: 'SKY LIMIT', content: 'TWWW // FLY', image: 'https://images.unsplash.com/photo-1529139513466-a28e9448c61a?auto=format&fit=crop&q=80&w=800' },
    ]
  }
};

export default function CatalogPage() {
  const [activeBookKey, setActiveBookKey] = useState<string>('twww');
  const [lookbooks, setLookbooks] = useState<Record<string, { name: string; pages: Array<{ title: string; content: string; image: string }> }>>(DEFAULT_LOOKBOOKS);
  const [currentPage, setCurrentPage] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function loadMetaobjects() {
      const meta = await getMetaobjects('lookbook');
      if (meta && meta.length > 0) {
        const fetchedBooks: Record<string, any> = {};
        meta.forEach((m, idx) => {
          const titleField = m.fields.find(f => f.key === 'title')?.value || `Lookbook ${idx + 1}`;
          const seasonField = m.fields.find(f => f.key === 'season')?.value || '2026';
          const descField = m.fields.find(f => f.key === 'description')?.value || '';
          const imagesField = m.fields.find(f => f.key === 'images')?.value;

          let imgList: string[] = [
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1554412933-514a83d2f3c8?auto=format&fit=crop&q=80&w=800',
          ];

          if (imagesField) {
            try {
              const parsed = JSON.parse(imagesField);
              if (Array.isArray(parsed) && parsed.length > 0) imgList = parsed;
            } catch (e) {
              console.warn(e);
            }
          }

          fetchedBooks[m.handle || `book-${idx}`] = {
            name: `${titleField.toUpperCase()} // ${seasonField}`,
            pages: imgList.map((img, i) => ({
              title: `${titleField} - PAGE ${i + 1}`,
              content: descField || 'TWWW LOOKBOOK',
              image: img,
            })),
          };
        });

        setLookbooks(fetchedBooks);
        const keys = Object.keys(fetchedBooks);
        if (keys.length > 0) setActiveBookKey(keys[0]);
      }
    }

    loadMetaobjects();
  }, []);

  const bookData = lookbooks[activeBookKey] || DEFAULT_LOOKBOOKS.twww;

  const playFlipSound = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const next = () => {
    if (currentPage < bookData.pages.length - 1) {
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

  const reset = () => {
    playFlipSound();
    setCurrentPage(0);
  };

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio overflow-hidden">
      <Header />
      <audio
        ref={audioRef}
        src="https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3"
        preload="auto"
      />

      <div className="container mx-auto px-6 pt-40 pb-20 min-h-[80vh] flex flex-col items-center justify-center">
        {/* Selection */}
        <div className="flex gap-4 mb-16 bg-[color:var(--surface-muted)] p-2 rounded-full border border-[color:var(--border)] overflow-x-auto no-scrollbar max-w-full">
          {Object.entries(lookbooks).map(([key, book]) => (
            <button
              key={key}
              onClick={() => { setActiveBookKey(key); setCurrentPage(0); playFlipSound(); }}
              className={`px-8 py-3 rounded-full text-[13px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                activeBookKey === key ? 'bg-[color:var(--foreground)] text-[color:var(--surface)] shadow-xl' : 'opacity-40 hover:opacity-100'
              }`}
            >
              {book.name}
            </button>
          ))}
        </div>

        <div className="mb-8 text-center">
          <p className="text-[13px] font-black uppercase tracking-[0.5em] text-[color:var(--foreground)]/30 mb-2">Digital Lookbook // 2026</p>
          <h1 className="text-5xl font-black uppercase tracking-tighter italic">{bookData.name}</h1>
        </div>

        <div className="relative w-full max-w-5xl aspect-[16/10] perspective-[2000px]">
          {/* Book Container */}
          <div className="absolute inset-0 flex shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] rounded-[20px] overflow-hidden">
            {/* Left Side */}
            <div className="w-1/2 bg-[color:var(--surface)] border-r border-black/10 relative overflow-hidden flex items-center justify-center p-12">
              <AnimatePresence mode="wait">
                {currentPage > 0 && (
                  <motion.div
                    key={`${activeBookKey}-${currentPage}-left`}
                    initial={{ opacity: 0, x: -20, rotateY: -30 }}
                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                    exit={{ opacity: 0, x: 20, rotateY: 30 }}
                    className="relative z-10 text-center w-full origin-right"
                  >
                    <img src={bookData.pages[currentPage-1].image} className="w-full aspect-[4/5] object-cover grayscale mb-8 shadow-2xl rounded-lg" alt="" />
                    <h2 className="text-2xl font-black uppercase italic">{bookData.pages[currentPage-1].title}</h2>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right Side */}
            <div className="w-1/2 bg-[color:var(--surface)] relative overflow-hidden flex items-center justify-center p-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`${activeBookKey}-${currentPage}-right`}
                  initial={{ opacity: 0, x: 20, rotateY: 30 }}
                  animate={{ opacity: 1, x: 0, rotateY: 0 }}
                  exit={{ opacity: 0, x: -20, rotateY: -30 }}
                  transition={{ type: 'spring', damping: 20 }}
                  className="relative z-10 text-center w-full origin-left"
                >
                  <img src={bookData.pages[currentPage].image} className="w-full aspect-[4/5] object-cover grayscale mb-8 shadow-2xl rounded-lg" alt="" />
                  <h2 className="text-2xl font-black uppercase italic">{bookData.pages[currentPage].title}</h2>
                  <p className="text-base font-bold opacity-40 uppercase tracking-widest mt-4">{bookData.pages[currentPage].content}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Interactive Overlay */}
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
              <span className="text-base font-black uppercase tracking-widest">{currentPage + 1} / {bookData.pages.length}</span>
              <div className="w-32 h-1 bg-[color:var(--border)] rounded-full mt-2 overflow-hidden">
                <motion.div
                  className="h-full bg-[color:var(--foreground)]"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentPage + 1) / bookData.pages.length) * 100}%` }}
                />
              </div>
            </div>

            {currentPage === bookData.pages.length - 1 ? (
              <button
                onClick={reset}
                className="w-14 h-14 bg-green-500 text-white rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl animate-pulse"
              >
                <RefreshCcw size={24} />
              </button>
            ) : (
              <button
                onClick={next}
                className="w-14 h-14 bg-[color:var(--foreground)] text-[color:var(--surface)] rounded-full flex items-center justify-center transition-all hover:scale-110 active:scale-95 shadow-xl"
              >
                <ChevronRight size={24} />
              </button>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
