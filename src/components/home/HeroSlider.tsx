'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';

const collection = {
  name: "The Way WE Stare",
  items: [
    { id: 1, name: "Detal 1", img: "https://placehold.co/600x800/000000/FFFFFF?text=DETAL+1" },
    { id: 2, name: "Detal 2", img: "https://placehold.co/600x800/000000/FFFFFF?text=DETAL+2" },
    { id: 3, name: "Packshot", img: "https://placehold.co/600x800/000000/FFFFFF?text=PACKSHOT" },
    { id: 4, name: "Katalogowe", img: "https://placehold.co/600x800/000000/FFFFFF?text=KATALOGOWE" },
    { id: 5, name: "Metka 1", img: "https://placehold.co/600x800/000000/FFFFFF?text=METKA+SZYJA" },
    { id: 6, name: "Metka 2", img: "https://placehold.co/600x800/000000/FFFFFF?text=METKA+BOK" },
    { id: 7, name: "Katalog 2", img: "https://placehold.co/600x800/000000/FFFFFF?text=LOOKBOOK+1" },
    { id: 8, name: "Katalog 3", img: "https://placehold.co/600x800/000000/FFFFFF?text=LOOKBOOK+2" },
  ]
};

export const HeroSlider = () => {
  const [page, setPage] = useState(0);
  const itemsPerPage = 4;
  const totalPages = Math.ceil(collection.items.length / itemsPerPage);

  useEffect(() => {
    const timer = setInterval(() => {
      setPage((prev) => (prev + 1) % totalPages);
    }, 15000);
    return () => clearInterval(timer);
  }, [totalPages]);

  const currentItems = collection.items.slice(page * itemsPerPage, (page + 1) * itemsPerPage);

  return (
    <section className="relative w-full overflow-hidden bg-black pt-20 min-h-[90vh] flex flex-col">
      {/* Collection Label */}
      <div className="container mx-auto px-6 py-8">
        <Link href="/kolekcja/stare" className="group inline-flex flex-col">
          <span className="text-xs font-bold text-white/30 tracking-widest uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic underline decoration-1 underline-offset-8 decoration-white/20">
            {collection.name}
          </span>
        </Link>
      </div>

      <div className="flex-1 relative flex items-center group/slider">
        <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-4 h-full py-12">
          <AnimatePresence mode="popLayout">
            {currentItems.map((item, i) => (
              <motion.div
                key={`${page}-${item.id}`}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative aspect-[3/4] rounded-3xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 bg-white/5"
              >
                <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                   <p className="text-xs font-bold tracking-widest uppercase mb-4">{item.name}</p>
                   <div className="flex gap-2">
                      <button className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"><Heart size={16} /></button>
                      <button className="bg-white text-black p-2 rounded-full hover:scale-110 transition-transform"><ShoppingBag size={16} /></button>
                   </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Controls */}
        <button
          onClick={() => setPage((prev) => (prev - 1 + totalPages) % totalPages)}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
        >
          <ChevronLeft size={48} strokeWidth={1} />
        </button>
        <button
          onClick={() => setPage((prev) => (prev + 1) % totalPages)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
        >
          <ChevronRight size={48} strokeWidth={1} />
        </button>

        {/* Thumbnails / Indicators */}
        <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
           {Array.from({ length: totalPages }).map((_, i) => (
             <button
               key={i}
               onClick={() => setPage(i)}
               className={`w-2 h-2 rounded-full transition-all duration-500 ${page === i ? 'h-8 bg-white' : 'bg-white/20'}`}
             />
           ))}
        </div>
      </div>
    </section>
  );
};
