'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingBag, Heart, Moon, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HaftWizard } from '../shop/HaftWizard';
import { LoginForm } from '../auth/LoginForm';

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedKolekcje, setExpandedKolekcje] = useState(false);
  const [isHaftModalOpen, setIsHaftModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

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

  useEffect(() => {
    const storedTheme = typeof window !== 'undefined' ? localStorage.getItem('twww-theme') : null;
    if (storedTheme) {
      setIsDarkTheme(storedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('theme-dark', isDarkTheme);
    localStorage.setItem('twww-theme', isDarkTheme ? 'dark' : 'light');
  }, [isDarkTheme]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 h-20 transition-transform duration-300 bg-[color:var(--surface)]/95 backdrop-blur-md border-b border-[color:var(--border)] ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="container mx-auto h-full px-4 md:px-6 flex items-center justify-between">
          {/* Left: Menu Trigger */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-haspopup="dialog"
            aria-label={isMenuOpen ? 'Zamknij menu' : 'Otwórz menu'}
            type="button"
            className="relative w-8 h-8 flex items-center justify-center group z-[80]"
          >
            <div className="relative w-6 h-6 flex flex-col justify-between">
              <span className="block h-0.5 w-full bg-[color:var(--foreground)] transition-all" />
              <span className="block h-0.5 w-full bg-[color:var(--foreground)] transition-all" />
              <span className="block h-0.5 w-full bg-[color:var(--foreground)] transition-all" />
            </div>
          </button>

          {/* Center: Logo */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center text-[color:var(--foreground)]">
             <span className="text-xl md:text-2xl font-black tracking-tighter block leading-none font-abel">The Way WE Wear</span>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex items-center rounded px-3 py-1.5 gap-2 text-[color:var(--foreground)] border border-[color:var(--border)]">
              <Search size={18} className="opacity-50" />
              <input type="text" placeholder="SZUKAJ..." className="bg-transparent border-none text-xs focus:outline-none w-24 xl:w-32 uppercase font-black text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50" />
            </div>
            <button onClick={() => setIsLoginModalOpen(true)} className="text-[color:var(--foreground)] outline-none"><User size={20} className="md:w-[22px] md:h-[22px]" /></button>
            <Link href="/wishlist" className="text-[color:var(--foreground)]"><Heart size={20} className="md:w-[22px] md:h-[22px]" /></Link>
            <Link href="/cart" className="relative text-[color:var(--foreground)]">
              <ShoppingBag size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="absolute -top-2 -right-2 bg-[color:var(--foreground)] text-[color:var(--surface)] text-[9px] md:text-[10px] font-black w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-abel">0</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsDarkTheme((prev) => !prev)}
              className="bg-[color:var(--surface-muted)] text-[color:var(--foreground)] w-8 h-8 rounded-full flex items-center justify-center hover:bg-[color:var(--surface)] transition-colors"
              aria-label={isDarkTheme ? 'Wyłącz tryb ciemny' : 'Włącz tryb ciemny'}
            >
              <Moon size={18} />
            </button>
          </div>
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
              className="fixed inset-0 bg-[color:var(--foreground)]/10 backdrop-blur-sm z-[60]"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-sm bg-[color:var(--surface)] z-[70] p-8 border-r border-[color:var(--border)] flex flex-col text-[color:var(--foreground)] shadow-2xl"
            >
              <div className="flex justify-between items-center mb-12">
                <span className="font-black text-xl tracking-tighter uppercase italic">The Way WE Wear</span>
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[color:var(--foreground)]/70 hover:text-[color:var(--foreground)] transition-colors"
                  aria-label="Zamknij menu"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex items-center rounded-xl px-4 py-3 gap-3 mb-8 bg-[color:var(--surface-muted)] border border-[color:var(--border)]">
                <Search size={20} className="opacity-50" />
                <input type="text" placeholder="SZUKAJ PRODUKTU..." className="bg-transparent border-none text-sm focus:outline-none flex-1 uppercase font-black text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50" />
              </div>

              <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter overflow-y-auto no-scrollbar font-abel text-[color:var(--foreground)]">
                <div className="text-xs text-[color:var(--foreground)] font-bold opacity-70 mb-2 font-abel">Project: TWWW // Subject:</div>

                <Link href="/shop/bluzy" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Bluzy</Link>
                <Link href="/shop/koszulki" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Koszulki</Link>
                <Link href="/shop/akcesoria" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Akcesoria</Link>
                <Link href="/catalog" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic">Katalog</Link>

                <div>
                   <button
                    onClick={() => setExpandedKolekcje(!expandedKolekcje)}
                    className="flex items-center gap-2 hover:pl-4 transition-all italic"
                   >
                     Kolekcje <ChevronRight size={24} className={`transition-transform ${expandedKolekcje ? 'rotate-90' : 'rotate-0'}`} />
                   </button>
                   <AnimatePresence>
                    {expandedKolekcje && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden flex flex-col gap-4 pl-6 pt-6 text-lg font-bold text-[color:var(--foreground)]/65"
                      >
                        <Link href="/shop/stare" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--foreground)] transition-colors">The Way WE Stare</Link>
                        <Link href="/shop/roll" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--foreground)] transition-colors">The Way WE Roll</Link>
                        <Link href="/shop/bloom" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--foreground)] transition-colors">The Way WE Bloom</Link>
                        <Link href="/shop/fly" onClick={() => setIsMenuOpen(false)} className="hover:text-[color:var(--foreground)] transition-colors">The Way WE Fly</Link>
                      </motion.div>
                    )}
                   </AnimatePresence>
                </div>

                <button
                  onClick={() => { setIsMenuOpen(false); setIsHaftModalOpen(true); }}
                  className="text-left hover:pl-4 transition-all italic uppercase font-black"
                >
                  Haft na zamówienie
                </button>
              </div>

              <div className="mt-auto pt-12 text-[10px] font-bold text-[color:var(--foreground)]/50 tracking-widest uppercase">
                © 2025 THE WAY WE WEAR
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <HaftWizard
        isOpen={isHaftModalOpen}
        onClose={() => setIsHaftModalOpen(false)}
      />

      {/* Login Modal */}
      <AnimatePresence>
        {isLoginModalOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsLoginModalOpen(false)}
              className="fixed inset-0 bg-[color:var(--foreground)]/15 backdrop-blur-md z-[100]"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-[101] p-4 pointer-events-none"
            >
              <div className="w-full max-w-md pointer-events-auto relative">
                <button
                  onClick={() => setIsLoginModalOpen(false)}
                  className="absolute -top-12 right-0 text-[color:var(--foreground)]/40 hover:text-[color:var(--foreground)] transition-colors"
                >
                  <X size={32} />
                </button>
                <LoginForm />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
