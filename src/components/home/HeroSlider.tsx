'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Heart, ShoppingBag } from 'lucide-react';
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const { addToCart, isCartLoading, addToWishlist, isInWishlist, removeFromWishlist } = useStore();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const prevSlide = () => setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);

  // Nawigacja klawiaturą i Escape, gdy lightbox jest otwarty
  useEffect(() => {
    if (!lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxOpen(false);
      if (e.key === 'ArrowLeft') prevSlide();
      if (e.key === 'ArrowRight') nextSlide();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, slides.length]);

  const slide = slides[current];
  const wishlistId = slide.product?.id ?? slide.id;
  const isLiked = isInWishlist(wishlistId);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!slide.product) return;
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

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (slide.product?.variantId) {
      await addToCart({ merchandiseId: slide.product.variantId, quantity: 1 });
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
              <motion.button
                key={slide.id}
                type="button"
                onClick={() => setLightboxOpen(true)}
                aria-label="Powiększ zdjęcie"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 w-full h-full cursor-zoom-in"
              >
                <img
                  src={slide.image.url}
                  alt={slide.caption ?? collectionTitle}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                />
              </motion.button>
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
              {slide.product.variantId && (
                <button
                  onClick={handleAddToCart}
                  disabled={isCartLoading || !slide.product.availableForSale}
                  className="p-3 sm:p-5 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border border-[color:var(--border)] backdrop-blur-md bg-[color:var(--foreground)] text-[color:var(--surface)] disabled:opacity-30"
                  aria-label="Dodaj do koszyka"
                >
                  <ShoppingBag size={20} className="sm:w-6 sm:h-6" strokeWidth={2} />
                </button>
              )}
            </div>
          )}

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-30 hidden sm:flex text-black bg-white/20 hover:bg-white/40">
            <ChevronLeft size={32} strokeWidth={1} />
          </button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 transition-all p-2 rounded-full backdrop-blur-md border border-white/10 z-30 hidden sm:flex text-black bg-white/20 hover:bg-white/40">
            <ChevronRight size={32} strokeWidth={1} />
          </button>

          <div className="absolute top-4 left-4 sm:top-auto sm:bottom-10 sm:left-10 transition-all duration-500 p-3 sm:p-6 rounded-2xl sm:rounded-[2rem] backdrop-blur-xl border border-white/10 z-20 bg-white/40 text-black shadow-[0_0_50px_rgba(255,255,255,0.3)]">
            {slide.product ? (
              <Link
                href={`/product/${slide.product.handle}`}
                className="text-xs sm:text-lg md:text-2xl font-black uppercase tracking-tighter italic leading-tight break-words font-antonio hover:underline"
              >
                {slide.caption}
              </Link>
            ) : (
              <h3 className="text-xs sm:text-lg md:text-2xl font-black uppercase tracking-tighter italic leading-tight break-words font-antonio">
                {slide.caption}
              </h3>
            )}
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

      {lightboxOpen && slide.image && (
        <div
          className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Podgląd zdjęcia"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            type="button"
            onClick={() => setLightboxOpen(false)}
            aria-label="Zamknij podgląd"
            className="absolute top-5 right-5 z-20 w-12 h-12 rounded-full bg-white/90 text-black text-2xl flex items-center justify-center hover:bg-white transition"
          >
            ×
          </button>

          <div className="absolute top-6 left-6 z-20 text-white font-black tracking-widest">
            {current + 1} / {slides.length}
          </div>

          {slides.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Poprzednie zdjęcie"
                onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 text-black hover:bg-white transition"
              >
                <ChevronLeft size={28} />
              </button>
              <button
                type="button"
                aria-label="Następne zdjęcie"
                onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-white/80 text-black hover:bg-white transition"
              >
                <ChevronRight size={28} />
              </button>
            </>
          )}

          <img
            src={slide.image.url}
            alt={slide.caption ?? collectionTitle}
            className="max-w-full max-h-[85vh] object-contain select-none"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
};