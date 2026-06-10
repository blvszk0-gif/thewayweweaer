'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const collection = {
  name: "The Way WE Stare",
  items: [
    { id: 1, name: "Detal haftu 1", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+1", dark: true },
    { id: 2, name: "Detal haftu 2", img: "https://placehold.co/1200x1600/FFFFFF/000000?text=DETAL+HAFTU+2", dark: false },
    { id: 3, name: "Packshot Produktu", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=PACKSHOT+PRODUKTU", dark: true },
    { id: 4, name: "Metka Szyja", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=METKA+SZYJA" },
    { id: 5, name: "Metka Bok", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=METKA+BOK" },
  ]
};

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collection.items.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + collection.items.length) % collection.items.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % collection.items.length);

  return (
    <section className="relative w-full overflow-hidden bg-black/5 pt-24 pb-12 font-abel">
      <div className="container mx-auto px-6 mb-8">
        <Link href="/shop/stare" className="group inline-flex flex-col">
          <span className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic font-abel">
            {collection.name}
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 items-center max-w-6xl">
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl bg-[#d1d1d1] aspect-video sm:aspect-video lg:flex-1">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={collection.items[current].img}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </AnimatePresence>

          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
             <button className="bg-white/90 text-black p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-black/5 backdrop-blur-sm">
               <Heart size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
             </button>
             <button className="bg-white/90 text-black p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-black/5 backdrop-blur-sm">
               <ShoppingBag size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
             </button>
          </div>

          {/* Navigation Controls */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors p-2"
          >
            <ChevronLeft size={32} sm-size={64} className="w-8 h-8 sm:w-16 sm:h-16" strokeWidth={1} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors p-2"
          >
            <ChevronRight size={32} sm-size={64} className="w-8 h-8 sm:w-16 sm:h-16" strokeWidth={1} />
          </button>

          {/* Caption */}
          <div className={`absolute bottom-6 left-6 sm:bottom-10 sm:left-10 transition-colors duration-1000 ${collection.items[current].dark ? 'text-white' : 'text-black'}`}>
             <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-1 ${collection.items[current].dark ? 'text-white/40' : 'text-black/40'}`}>Slide 0{current + 1} / 0{collection.items.length}</p>
             <h3 className="text-xl sm:text-2xl font-black uppercase tracking-tighter italic font-abel">{collection.items[current].name}</h3>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="w-full lg:w-24 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2">
           {collection.items.map((item, i) => (
             <button
               key={item.id}
               onClick={() => setCurrent(i)}
               className={`relative flex-shrink-0 w-20 lg:w-full aspect-video lg:aspect-[16/9] rounded-xl overflow-hidden transition-all duration-500 border-2 ${current === i ? 'border-black scale-105 shadow-xl' : 'border-transparent opacity-30 hover:opacity-100'}`}
             >
               <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};
