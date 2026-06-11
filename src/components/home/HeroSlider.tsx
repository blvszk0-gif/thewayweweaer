'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/context/StoreContext';

const collection = {
  name: "The Way WE Stare",
  items: [
    { id: 'twww-hoodie-01', name: "Detal haftu 1", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=DETAL+HAFTU+1", dark: true, price: 299, category: 'Bluzy' },
    { id: 'twww-hoodie-02', name: "Detal haftu 2", img: "https://placehold.co/1200x1600/FFFFFF/000000?text=DETAL+HAFTU+2", dark: false, price: 299, category: 'Bluzy' },
    { id: 'twww-hoodie-03', name: "Packshot Produktu", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=PACKSHOT+PRODUKTU", dark: true, price: 299, category: 'Bluzy' },
    { id: 'twww-hoodie-04', name: "Metka Szyja", img: "https://placehold.co/1200x1600/000000/FFFFFF?text=METKA+SZYJA", dark: true, price: 299, category: 'Bluzy' },
    { id: 'twww-hoodie-05', name: "Metka Bok", img: "https://placehold.co/1200x1600/FFFFFF/000000?text=METKA+BOK", dark: false, price: 299, category: 'Bluzy' },
  ]
};

export const HeroSlider = () => {
  const [current, setCurrent] = useState(0);
  const { addToCart, addToWishlist, isInWishlist, removeFromWishlist } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % collection.items.length);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + collection.items.length) % collection.items.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % collection.items.length);

  const slide = collection.items[current];
  const isLiked = isInWishlist(slide.id);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isLiked) {
      removeFromWishlist(slide.id);
    } else {
      addToWishlist({
        id: slide.id,
        name: slide.name,
        price: slide.price,
        image: slide.img,
        category: slide.category
      });
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      id: slide.id,
      name: slide.name,
      price: slide.price,
      image: slide.img,
      quantity: 1
    });
  };

  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--surface)] pt-24 pb-12 font-antonio">
      <div className="container mx-auto px-6 mb-8">
        <Link href="/shop/stare" className="group inline-flex flex-col">
          <span className="text-[10px] font-black text-[color:var(--foreground)]/30 tracking-[0.3em] uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic font-antonio text-[color:var(--foreground)]">
  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--surface)] pt-24 pb-12 font-abel">
      <div className="container mx-auto px-6 mb-8">
        <Link href="/shop/stare" className="group inline-flex flex-col">
          <span className="text-[10px] font-black text-[color:var(--foreground)]/45 tracking-[0.3em] uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic font-abel text-[color:var(--foreground)]">
            {collection.name}
          </span>
        </Link>
      </div>

      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 items-center max-w-6xl">
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl bg-[color:var(--surface-muted)] aspect-video sm:aspect-video lg:flex-1 group/slider shadow-2xl border border-[color:var(--border)]">
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl bg-[color:var(--surface-muted)] aspect-video sm:aspect-video lg:flex-1 group/slider shadow-[0_30px_80px_-30px_rgba(0,0,0,0.45)]">
          <AnimatePresence mode="wait">
            <motion.img
              key={current}
              src={slide.img}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
            />
          </AnimatePresence>

          {/* Action Buttons Overlay - White bg in Dark, Black bg in Light */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-500 z-20">
             <button
              onClick={handleWishlist}
              className={`p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-sm bg-[color:var(--foreground)] text-[color:var(--surface)]`}
             >
               <Heart size={20} className="sm:w-6 sm:h-6" strokeWidth={2} fill={isLiked ? "currentColor" : "none"} />
             </button>
             <button
              onClick={handleAddToCart}
              className={`p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-sm bg-[color:var(--foreground)] text-[color:var(--surface)]`}
             >
          {/* Action Buttons Overlay */}
          <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-500">
             <button className="bg-[color:var(--surface)]/90 text-[color:var(--foreground)] p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-sm">
               <Heart size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
             </button>
             <button className="bg-[color:var(--surface)]/90 text-[color:var(--foreground)] p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-sm">
               <ShoppingBag size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
             </button>
          </div>

          {/* Navigation Controls - Forced Contrast */}
          <button
            onClick={prevSlide}
            className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-20 ${slide.dark ? 'text-white bg-black/20 hover:bg-black/40' : 'text-black bg-white/20 hover:bg-white/40'}`}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[color:var(--foreground)]/50 hover:text-[color:var(--foreground)] transition-colors p-2"
          >
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button
            onClick={nextSlide}
            className={`absolute right-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-20 ${slide.dark ? 'text-white bg-black/20 hover:bg-black/40' : 'text-black bg-white/20 hover:bg-white/40'}`}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[color:var(--foreground)]/50 hover:text-[color:var(--foreground)] transition-colors p-2"
          >
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          {/* Caption with forced contrast based on SLIDE color, independent of theme */}
          <div className={`absolute bottom-6 left-6 sm:bottom-10 sm:left-10 transition-all duration-500 p-6 rounded-[2rem] backdrop-blur-xl border border-white/10 z-10 ${slide.dark ? 'bg-black/40 text-white shadow-[0_0_50px_rgba(0,0,0,0.3)]' : 'bg-white/40 text-black shadow-[0_0_50px_rgba(255,255,255,0.3)]'}`}>
             <p className={`text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${slide.dark ? 'text-white/40' : 'text-black/40'}`}>Slide 0{current + 1} / 0{collection.items.length}</p>
             <h3 className="text-base sm:text-lg md:text-2xl font-black uppercase tracking-tighter italic leading-tight break-words font-antonio">{slide.name}</h3>
          {/* Caption with dynamic contrast */}
          <div className="absolute bottom-6 left-6 sm:bottom-10 sm:left-10 text-[color:var(--foreground)] transition-colors duration-500 p-4 rounded-xl bg-[color:var(--surface)]/90 max-w-[80%] sm:max-w-[60%]">
             <p className="text-[8px] sm:text-[10px] font-black uppercase tracking-[0.4em] mb-1 text-[color:var(--foreground)]/40">Slide 0{current + 1} / 0{collection.items.length}</p>
             <h3 className="text-base sm:text-lg md:text-2xl font-black uppercase tracking-tighter italic leading-tight break-words font-abel text-[color:var(--foreground)]">{collection.items[current].name}</h3>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="w-full lg:w-24 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2">
           {collection.items.map((item, i) => (
             <button
               key={item.id}
               onClick={() => setCurrent(i)}
               className={`relative flex-shrink-0 w-20 lg:w-full aspect-video lg:aspect-[16/9] rounded-xl overflow-hidden transition-all duration-500 border-2 ${current === i ? 'border-[color:var(--foreground)] scale-105 shadow-xl' : 'border-transparent opacity-30 hover:opacity-100'}`}
             >
               <img src={item.img} alt={item.name} className="w-full h-full object-cover grayscale" />
             </button>
           ))}
        </div>
      </div>
    </section>
  );
};
