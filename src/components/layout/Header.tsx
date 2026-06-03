'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, User, ChevronDown, ChevronRight, Globe } from 'lucide-react';

const menuItems = [
  { name: 'Nowości', href: '/shop' },
  { name: 'Promocje', href: '/shop' },
  { name: 'Stała oferta', href: '/shop' },
  {
    name: 'Bluzy',
    href: '/shop',
    dropdown: [
      { name: 'Bluzy z kapturem', href: '/shop?cat=hoodie-zip' },
      { name: 'Bluzy bez kaptura', href: '/shop?cat=hoodie' }
    ],
    image: 'https://placehold.co/200x200?text=Bluzy'
  },
  { name: 'Koszulki', href: '/shop' },
  { name: 'Kubki', href: '/shop' },
  {
    name: 'Akcesoria',
    href: '/shop',
    dropdown: [
      { name: 'Czapki', href: '/shop', sub: [
        { name: 'Z daszkiem', href: '/shop' },
        { name: 'Zimowe', href: '/shop' }
      ]},
      { name: 'Biżuteria', href: '/shop' }
    ],
    image: 'https://placehold.co/200x200?text=Akcesoria'
  },
  { name: 'O mnie', href: '/o-mnie' },
  { name: 'FAQ', href: '/faq' },
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
            <span className="font-black text-xl tracking-tighter">The Way WE Wear</span>
          </Link>

          {/* Nav */}
          <nav className="hidden lg:flex items-center space-x-6">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative group h-16 flex items-center"
                onMouseEnter={() => setActiveMenu(item.name)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link href={item.href} className="text-sm font-medium hover:text-gray-300 transition-colors">
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
            <Link href="/cart" className="hover:text-gray-300 transition-colors">
              <ShoppingBag size={20} />
            </Link>
            <div className="relative group">
               <User size={20} className="cursor-pointer hover:text-gray-300" />
               <div className="absolute right-0 top-full mt-2 w-48 bg-[#383e42] border border-white/10 rounded-xl overflow-hidden opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all shadow-2xl">
                 <Link href="/login" className="block px-4 py-3 text-sm hover:bg-white/5">Moje konto / Logowanie</Link>
                 <Link href="/orders" className="block px-4 py-3 text-sm hover:bg-white/5">Status zamówień</Link>
                 <Link href="/game" className="block px-4 py-3 text-sm hover:bg-white/5">Minigra</Link>
                 <Link href="/coupons" className="block px-4 py-3 text-sm hover:bg-white/5">Moje kupony</Link>
               </div>
            </div>
            <div className="flex items-center gap-1 text-xs font-bold border border-white/20 rounded-md px-2 py-1">
              <Globe size={12} />
              <span>PL/ENG</span>
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
                  <img
                    src={menuItems.find(i => i.name === activeMenu)?.image}
                    alt={activeMenu}
                    className="w-full aspect-square object-cover rounded-2xl"
                  />
                  <h3 className="mt-4 font-black text-2xl uppercase">{activeMenu}</h3>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-12">
                  {menuItems.find(i => i.name === activeMenu)?.dropdown?.map((sub) => (
                    <div key={sub.name}>
                      <Link href={sub.href} className="text-xl font-bold hover:text-white/70 flex items-center gap-2">
                        {sub.name} <ChevronRight size={16} />
                      </Link>
                      {sub.sub && (
                        <div className="mt-4 space-y-2 flex flex-col">
                          {sub.sub.map(s => (
                            <Link key={s.name} href={s.href} className="text-gray-400 hover:text-white transition-colors">{s.name}</Link>
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
