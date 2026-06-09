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
