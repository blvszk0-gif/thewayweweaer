'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { useStore } from '@/context/StoreContext';
import type { LookbookSlide } from '@/lib/shopify/lookbook';

interface HeroSliderProps {
  collectionTitle: string;
  collectionHandle: string;
  slides: LookbookSlide[];
}

export const HeroSlider = ({ collectionTitle, collectionHandle, slides }: HeroSliderProps) => {
  const [current, setCurrent] = useState(0);
  const { addToWishlist, isInWishlist, removeFromWishlist } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  const slide = slides[current];
  const wishlistId = slide.product?.id ?? slide.id;
  const isLiked = isInWishlist(wishlistId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!slide.product) return; // slajd bez przypiętego produktu - nic do polubienia
    if (isLiked) {
      removeFromWishlist(wishlistId);
    } else {
      addToWishlist({
        id: wishlistId,
        name: slide.product.title,
        price: slide.product.price,
        image: slide.image?.url ?? '',
        category: slide.product.category ?? '',
      });
    }
  };

  return (
    <section className="relative w-full overflow-hidden bg-[color:var(--surface)] pt-24 pb-12 font-antonio">
      <div className="container mx-auto px-6 mb-8">
        <Link href={`/shop/${collectionHandle}`} className="group inline-flex flex-col">
          <span className="text-[13px] font-black text-[color:var(--foreground)]/30 tracking-[0.3em] uppercase mb-1">Project: TWWW // Subject:</span>
          <span className="text-3xl md:text-5xl font-black uppercase tracking-tighter group-hover:pl-4 transition-all duration-500 italic font-antonio text-[color:var(--foreground)]">
            {collectionTitle}
          </span>
        </Link>
      </div>
      <div className="container mx-auto px-6 flex flex-col lg:flex-row gap-8 items-center max-w-6xl">
        <div className="relative w-full max-w-6xl mx-auto overflow-hidden rounded-3xl bg-[color:var(--surface-muted)] aspect-video sm:aspect-video lg:flex-1 group/slider shadow-2xl border border-[color:var(--border)]">
          <AnimatePresence mode="wait">
            {slide.image && (
              <motion.img
                key={slide.id}
                src={slide.image.url}
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            )}
          </AnimatePresence>

          {slide.product && (
            <div className="absolute top-4 right-4 sm:top-8 sm:right-8 flex flex-col gap-3 opacity-0 group-hover/slider:opacity-100 transition-all duration-500 z-30 lg:flex md:flex">
              <button
                onClick={handleWishlist}
                className="p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-md bg-[color:var(--foreground)] text-[color:var(--surface)]"
              >
                <Heart size={20} className="sm:w-6 sm:h-6" strokeWidth={2} fill={isLiked ? "currentColor" : "none"} />
              </button>
            </div>
          )}

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-30 hidden sm:flex text-black bg-white/20 hover:bg-white/40">
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-30 hidden sm:flex text-black bg-white/20 hover:bg-white/40">
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          <div className="absolute top-4 left-4 sm:top-auto sm:bottom-10 sm:left-10 transition-all duration-500 p-3 sm:p-6 rounded-2xl sm:rounded-[2rem] backdrop-blur-xl border border-white/10 z-10 bg-white/40 text-black shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            <p className="text-[10px] sm:text-[13px] font-black uppercase tracking-[0.4em] mb-1 sm:mb-2 text-black/40">
              Slide 0{current + 1} / 0{slides.length}
            </p>
            <h3 className="text-xs sm:text-lg md:text-2xl font-black uppercase tracking-tighter italic leading-tight break-words font-antonio">
              {slide.caption}
            </h3>
          </div>
        </div>

        <div className="w-full lg:w-24 flex lg:flex-col gap-3 overflow-x-auto lg:overflow-y-auto no-scrollbar py-2">
          {slides.map((item, i) => (
            <button
              key={item.id}
              onClick={() => setCurrent(i)}
              className={`relative flex-shrink-0 w-20 lg:w-full aspect-video lg:aspect-[16/9] rounded-xl overflow-hidden transition-all duration-500 border-2 ${current === i ? 'border-[color:var(--foreground)] scale-105 shadow-xl' : 'border-transparent opacity-30 hover:opacity-100'}`}
            >
              {item.image && <img src={item.image.url} alt={item.caption ?? ''} className="w-full h-full object-cover grayscale" />}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};