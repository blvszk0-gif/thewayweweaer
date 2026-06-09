'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Heart, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedKolekcje, setExpandedKolekcje] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-transform duration-300 bg-black border-b border-white/10 ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto h-full px-6 flex items-center justify-between">
          {/* Left: Actions */}
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center border border-white/20 rounded px-3 py-1.5 gap-2">
              <Search size={18} className="opacity-50" />
              <input type="text" placeholder="SZUKAJ..." className="bg-transparent border-none text-xs focus:outline-none w-32 uppercase font-black" />
            </div>
            <Link href="/login"><User size={22} /></Link>
            <Link href="/wishlist"><Heart size={22} /></Link>
            <Link href="/cart" className="relative">
              <ShoppingBag size={22} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
          </div>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center">
             <span className="text-2xl font-black tracking-tighter block leading-none">The Way WE Wear</span>
          </Link>

          {/* Right: Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="flex flex-col gap-1.5 w-6 group"
          >
            <div className="h-0.5 w-full bg-white transition-all"></div>
            <div className="h-0.5 w-full bg-white transition-all"></div>
          </button>
        </div>
      </header>

      {/* Sidebar Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-black z-[70] p-8 border-l border-white/10 flex flex-col"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-black text-xl tracking-tighter uppercase italic">The Way WE Wear</span>
                <button onClick={() => setIsMenuOpen(false)} className="relative w-8 h-8 flex items-center justify-center">
                  <motion.div className="absolute w-full h-0.5 bg-white rotate-45" />
                  <motion.div className="absolute w-full h-0.5 bg-white -rotate-45" />
                </button>
              </div>

              <div className="flex items-center bg-white/5 rounded-xl px-4 py-3 gap-3 mb-8">
                <Search size={20} className="opacity-50" />
                <input type="text" placeholder="SZUKAJ PRODUKTU..." className="bg-transparent border-none text-sm focus:outline-none flex-1 uppercase font-black" />
              </div>

              <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter overflow-y-auto no-scrollbar">
                <div className="text-xs text-white/30 font-bold mb-2">Project: TWWW // Subject:</div>

                <Link href="/shop/bluzy" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Bluzy</Link>
                <Link href="/shop/koszulki" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Koszulki</Link>
                <Link href="/shop/akcesoria" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Akcesoria</Link>

                <div>
                   <button
                    onClick={() => setExpandedKolekcje(!expandedKolekcje)}
                    className="flex items-center gap-2 hover:pl-4 transition-all italic"
                   >
                     Kolekcje <ChevronRight size={24} className={`transition-transform ${expandedKolekcje ? 'rotate-90' : ''}`} />
                   </button>
                   <AnimatePresence>
                    {expandedKolekcje && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-4 pl-6 pt-6 text-lg font-bold text-white/60"
                      >
                        <Link href="/shop/stare" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">The Way WE Stare</Link>
                        <Link href="/shop/roll" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">The Way WE Roll</Link>
                        <Link href="/shop/bloom" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">The Way WE Bloom</Link>
                        <Link href="/shop/fly" onClick={() => setIsMenuOpen(false)} className="hover:text-white transition-colors">The Way WE Fly</Link>
                      </motion.div>
                    )}
                   </AnimatePresence>
                </div>
              </div>

              <div className="mt-auto pt-12 text-[10px] font-bold text-white/20 tracking-widest uppercase">
                © 2025 THE WAY WE WEAR
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
