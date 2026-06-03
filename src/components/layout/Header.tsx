'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, ChevronDown, ChevronRight, Globe, Search } from 'lucide-react';

const menuItems = [
  { name: 'Nowości', href: '/shop' },
  {
    name: 'Katalog',
    href: '/shop',
    dropdown: [
      { name: 'Bluzy', href: '/shop?cat=hoodie', sub: [
        { name: 'Oversize', href: '/shop' },
        { name: 'Basic', href: '/shop' },
        { name: 'Slim', href: '/shop' },
        { name: 'KIDS', href: '/shop' }
      ]},
      { name: 'Inne', href: '/shop', sub: [
        { name: 'Koszulki', href: '/shop' },
        { name: 'Spodnie', href: '/shop' },
        { name: 'Akcesoria', href: '/shop' }
      ]}
    ],
    image: 'https://placehold.co/200x200?text=Katalog'
  },
  {
    name: 'Kolekcje',
    href: '/shop',
    dropdown: [
      { name: 'Personalizacja', href: '/shop', sub: [
        { name: 'Haft ze zdjęcia 📷', href: '/shop' },
        { name: 'Własny napis 🔤', href: '/shop' },
        { name: 'Linia konturowa (Outline) ✏️', href: '/shop' }
      ]},
      { name: 'Tematyczne', href: '/shop', sub: [
        { name: 'Matching Squad 💑', href: '/shop' },
        { name: 'Rzymska data 📅', href: '/shop' },
        { name: 'Znaki zodiaku ♒', href: '/shop' }
      ]}
    ],
    image: 'https://placehold.co/200x200?text=Kolekcje'
  },
  { name: 'FAQ', href: '/faq' },
  { name: 'O Nas', href: '/o-mnie' },
  { name: 'Kontakt', href: 'mailto:zamowieniathewaywewear@gmail.com' },
];

export const Header = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -80 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[#383e42]/80 backdrop-blur-md border-b border-white/10"
      >
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="font-black text-xl tracking-tighter uppercase">The Way WE Wear</span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group h-16 flex items-center"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href={item.href} className="text-xs font-black uppercase tracking-widest hover:text-gray-400 transition-colors">
                  {item.name}
                </Link>
                {item.dropdown && (
                  <ChevronDown size={12} className="ml-1 opacity-50 group-hover:rotate-180 transition-transform" />
                )}
              </div>
            ))}
          </nav>

          {/* Right Menu */}
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex items-center bg-white/5 border border-white/10 rounded-full px-4 py-1.5 gap-2">
              <Search size={14} className="text-gray-500" />
              <input type="text" placeholder="SZUKAJ..." className="bg-transparent border-none text-[10px] font-bold focus:outline-none w-24 uppercase" />
            </div>
            <Link href="/cart" className="hover:text-gray-400 transition-colors relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-black w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link>
            <div className="relative group">
               <User size={20} className="cursor-pointer hover:text-gray-400" />
               <div className="absolute right-0 top-full mt-2 w-56 bg-[#383e42] border border-white/10 rounded-2xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all shadow-2xl p-2">
                 <Link href="/login" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 rounded-xl">Zaloguj się</Link>
                 <Link href="/orders" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 rounded-xl">Status zamówień</Link>
                 <Link href="/coupons" className="block px-4 py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 rounded-xl">Twoje kupony</Link>
               </div>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] font-black border border-white/20 rounded-md px-2 py-1 uppercase">
              <Globe size={12} />
              <span>PL</span>
            </div>
          </div>
        </div>

        {/* Mega Menu Animation (Samsung style) */}
        <AnimatePresence>
          {activeMenu && menuItems.find(i => i.name === activeMenu)?.dropdown && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              onMouseEnter={() => setActiveMenu(activeMenu)}
              onMouseLeave={() => setActiveMenu(null)}
              className="absolute top-16 left-0 right-0 bg-[#383e42] border-b border-white/10 overflow-hidden shadow-2xl"
            >
              <div className="container mx-auto px-6 py-12 flex gap-24">
                <div className="w-1/4">
                  <div className="aspect-square bg-black/20 rounded-2xl overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer">
                    <img
                      src={menuItems.find(i => i.name === activeMenu)?.image}
                      alt={activeMenu}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="mt-6 font-black text-2xl uppercase tracking-tighter italic">{activeMenu}</h3>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-12 pt-4">
                  {menuItems.find(i => i.name === activeMenu)?.dropdown?.map((sub) => (
                    <div key={sub.name}>
                      <Link href={sub.href} className="text-sm font-black tracking-widest uppercase hover:text-gray-400 flex items-center gap-2 mb-6">
                        {sub.name} <ChevronRight size={14} />
                      </Link>
                      {sub.sub && (
                        <div className="space-y-3 flex flex-col">
                          {sub.sub.map(s => (
                            <Link key={s.name} href={s.href} className="text-xs font-bold text-gray-500 uppercase tracking-widest hover:text-white transition-colors">{s.name}</Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
};
