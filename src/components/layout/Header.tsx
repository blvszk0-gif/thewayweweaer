'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { User, ShoppingBag, Heart, Moon, ChevronRight, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { HaftWizard } from '../shop/HaftWizard';
import { LoginForm } from '../auth/LoginForm';
import { useStore } from '@/context/StoreContext';
import { SearchBar } from './SearchBar';

export const Header = () => {
  const { cart, wishlist } = useStore();
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedKolekcje, setExpandedKolekcje] = useState(false);
  const [isHaftModalOpen, setIsHaftModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      const saved = localStorage.getItem('twww-auth');
      setIsLoggedIn(!!saved);
    };
    checkLogin();
    window.addEventListener('storage', checkLogin);
    return () => window.removeEventListener('storage', checkLogin);
  }, []);

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
            className="relative w-10 h-10 flex items-center justify-center group z-[80]"
          >
            <div className="relative w-6 h-3 flex flex-col justify-between overflow-hidden">
              <motion.span
                animate={isMenuOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-[color:var(--foreground)] origin-center transition-all"
              />
              <motion.span
                animate={isMenuOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                className="block h-0.5 w-full bg-[color:var(--foreground)] origin-center transition-all"
              />
            </div>
          </button>

          {/* Center: Logo with background for contrast */}
          <Link href="/" className="absolute left-1/2 -translate-x-1/2 text-center flex items-center justify-center group z-[80]">
             <div className="bg-white/80 backdrop-blur-sm p-2 rounded-xl border border-black/5 group-hover:scale-105 transition-transform">
               <img src="/logo.png" alt="TWWW Logo" className="h-6 md:h-8 w-auto object-contain" />
             </div>
          </Link>

          {/* Right: Actions */}
          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden lg:flex w-48 xl:w-64">
              <SearchBar isHeader={true} />
            </div>
            <Link
              href={isLoggedIn ? "/account" : "#"}
              onClick={(e) => { if (!isLoggedIn) { e.preventDefault(); setIsLoginModalOpen(true); } }}
              className="text-[color:var(--foreground)] outline-none"
            >
              <User size={20} className="md:w-[22px] md:h-[22px]" />
            </Link>
            <Link href="/wishlist" className="relative text-[color:var(--foreground)]">
              <Heart size={20} className="md:w-[22px] md:h-[22px]" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[12px] md:text-[13px] font-black w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-antonio animate-pulse">
                  {wishlist.length}
                </span>
              )}
            </Link>
            <Link href="/cart" className="relative text-[color:var(--foreground)]">
              <ShoppingBag size={20} className="md:w-[22px] md:h-[22px]" />
              <span className="absolute -top-2 -right-2 bg-[color:var(--foreground)] text-[color:var(--surface)] text-[12px] md:text-[13px] font-black w-3.5 h-3.5 md:w-4 md:h-4 rounded-full flex items-center justify-center font-antonio">
                {cart.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
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

              <div className="mb-8">
                <SearchBar isHeader={false} />
              </div>

              <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter overflow-y-auto no-scrollbar font-antonio text-[color:var(--foreground)]">
                <div className="text-base text-[color:var(--foreground)] font-bold opacity-70 mb-2 font-antonio">Project: TWWW // Subject:</div>

                <Link href="/shop/bluzy" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic uppercase">Bluzy</Link>
                <Link href="/shop/koszulki" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic uppercase">Koszulki</Link>
                <Link href="/shop/akcesoria" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic uppercase">Akcesoria</Link>
                <Link href="/lookbook" onClick={() => setIsMenuOpen(false)} className="hover:pl-4 transition-all italic uppercase">Lookbook</Link>

                <div>
                   <button
                    onClick={() => setExpandedKolekcje(!expandedKolekcje)}
                    className="flex items-center gap-2 hover:pl-4 transition-all italic uppercase font-black"
                   >
                     KOLEKCJE <ChevronRight size={24} className={`transition-transform ${expandedKolekcje ? 'rotate-90' : 'rotate-0'}`} />
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
                  HAFT NA ZAMÓWIENIE
                </button>
              </div>

              <div className="mt-auto pt-12 text-[13px] font-bold text-[color:var(--foreground)]/50 tracking-widest uppercase">
                © 2026 THE WAY WE WEAR
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
