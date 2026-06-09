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
    <section className="relative w-full overflow-hidden bg-black/5 pt-32 pb-20 font-montserrat">
      <div className="container mx-auto px-6 mb-12">
        <Link href="/shop/stare" className="group inline-flex flex-col">
          <span className="text-[10px] font-black text-black/30 tracking-[0.3em] uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-4xl md:text-7xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic font-abel">
            {collection.name}
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 items-center">
        <div className="relative w-full lg:flex-1 aspect-[3/4] rounded-[40px] overflow-hidden group/slider shadow-2xl bg-white">
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

          <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover/slider:opacity-100 transition-all duration-500 translate-x-4 group-hover/slider:translate-x-0">
             <button className="bg-white text-black p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-black/5">
               <Heart size={24} strokeWidth={2} />
             </button>
             <button className="bg-white text-black p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-black/5">
               <ShoppingBag size={24} strokeWidth={2} />
             </button>
          </div>

          <button
            onClick={() => setCurrent((prev) => (prev - 1 + collection.items.length) % collection.items.length)}
            className="absolute left-6 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors p-2"
          >
            <ChevronLeft size={64} strokeWidth={1} />
          </button>
          <button
            onClick={() => setCurrent((prev) => (prev + 1) % collection.items.length)}
            className="absolute right-6 top-1/2 -translate-y-1/2 text-black/20 hover:text-black transition-colors p-2"
          >
            <ChevronRight size={64} strokeWidth={1} />
          </button>

          <div className="absolute bottom-10 left-10">
             <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">Slide 0{current + 1} / 0{collection.items.length}</p>
             <h3 className="text-2xl font-black uppercase tracking-tighter italic font-abel">{collection.items[current].name}</h3>
          </div>
        </div>

        {/* Thumbnails on the Right */}
        <div className="w-full lg:w-32 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2">
           {collection.items.map((item, i) => (
             <button
               key={item.id}
               onClick={() => setCurrent(i)}
               className={`relative flex-shrink-0 w-24 lg:w-full aspect-[3/4] rounded-2xl overflow-hidden transition-all duration-500 border-2 ${current === i ? 'border-black scale-105 shadow-xl' : 'border-transparent opacity-30 hover:opacity-100'}`}
             >
               <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};
