'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const collection = {
  name: "The Way WE Stare",
  items: [
    { id: 1, name: "Detal haftu 1", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+1" },
    { id: 2, name: "Detal haftu 2", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+2" },
    { id: 3, name: "Packshot Produktu", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=PACKSHOT+PRODUKTU" },
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

  return (
    <section className="relative w-full overflow-hidden bg-black pt-20 min-h-screen flex flex-col">
      {/* Collection Label */}
      <div className="container mx-auto px-6 py-8">
        <Link href="/shop/stare" className="group inline-flex flex-col">
          <span className="text-xs font-bold text-white/30 tracking-widest uppercase mb-1 font-sans">Project: TWWW // Subject:</span>
          <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic underline decoration-1 underline-offset-8 decoration-white/20">
            {collection.name}
          </span>
        </Link>
      </div>

      <div className="flex-1 container mx-auto px-6 flex flex-col lg:flex-row gap-8 pb-20 items-center">
        {/* Main Slider Image */}
        <div className="relative w-full lg:flex-1 aspect-[3/4] rounded-3xl overflow-hidden group/slider bg-white/5">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={collection.items[current].img}
              alt={collection.items[current].name}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover grayscale"
            />
          </AnimatePresence>

          {/* Quick Actions Overlay */}
          <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover/slider:opacity-100 transition-opacity duration-500">
             <button className="bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
               <Heart size={24} strokeWidth={2} />
             </button>
             <button className="bg-white text-black p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center">
               <ShoppingBag size={24} strokeWidth={2} />
             </button>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => setCurrent((prev) => (prev - 1 + collection.items.length) % collection.items.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
          >
            <ChevronLeft size={48} strokeWidth={1} />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % collection.items.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors p-2"
          >
            <ChevronRight size={48} strokeWidth={1} />
          </button>

          {/* Label */}
          <div className="absolute bottom-8 left-8">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/50 mb-1">Image {current + 1} of {collection.items.length}</p>
             <h3 className="text-xl font-bold uppercase tracking-tighter">{collection.items[current].name}</h3>
          </div>
        </div>

        {/* Thumbnails on the Right */}
        <div className="w-full lg:w-32 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2">
           {collection.items.map((item, i) => (
             <button
               key={item.id}
               onClick={() => setCurrent(i)}
               className={`relative flex-shrink-0 w-20 lg:w-full aspect-[3/4] rounded-xl overflow-hidden transition-all duration-300 border-2 ${current === i ? 'border-white scale-105' : 'border-transparent opacity-40 hover:opacity-100'}`}
             >
               <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};
