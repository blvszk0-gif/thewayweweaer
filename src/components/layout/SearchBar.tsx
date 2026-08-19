'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const searchRegistry = [
  { keywords: ['bluza', 'hoodie', 'sweatshirt', 'sweter'], route: '/shop/bluzy' },
  { keywords: ['koszulka', 't-shirt', 'tee', 'tshirt'], route: '/shop/koszulki' },
  { keywords: ['akcesoria', 'dodatki', 'gadżety', 'sticker', 'czapka'], route: '/shop/akcesoria' },
  { keywords: ['lookbook', 'katalog', 'zdjęcia'], route: '/lookbook' },
  { keywords: ['stare', 'stare', 'we stare'], route: '/shop/stare' },
  { keywords: ['roll', 'roll', 'we roll'], route: '/shop/roll' },
  { keywords: ['bloom', 'bloom', 'we bloom'], route: '/shop/bloom' },
  { keywords: ['fly', 'fly', 'we fly'], route: '/shop/fly' },
  { keywords: ['konto', 'profil', 'login', 'rejestracja'], route: '/account' },
  { keywords: ['koszyk', 'cart', 'zakupy'], route: '/cart' },
  { keywords: ['wishlist', 'lista życzeń', 'serce'], route: '/wishlist' },
  { keywords: ['kontakt', 'pomoc', 'support', 'reklamacja'], route: '/blog' }, // Updated route will be wizard
];

export const SearchBar = ({ isHeader = false }) => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanQuery = query.toLowerCase().trim();
    if (!cleanQuery) return;

    const match = searchRegistry.find(entry =>
      entry.keywords.some(k => cleanQuery.includes(k) || k.includes(cleanQuery))
    );

    if (match) {
      router.push(match.route);
    } else {
      router.push(`/shop/bluzy?q=${encodeURIComponent(query)}`);
    }
    setQuery('');
  };

  return (
    <form onSubmit={handleSearch} className={`flex items-center rounded-xl px-4 py-2 gap-2 border border-[color:var(--border)] ${isHeader ? 'w-full' : 'max-w-md mx-auto'}`}>
      <Search size={18} className="opacity-50" />
      <input
        type="text"
        placeholder="SZUKAJ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="bg-transparent border-none text-base focus:outline-none flex-1 uppercase font-black text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50"
      />
      {query && (
        <button type="button" onClick={() => setQuery('')} className="opacity-30 hover:opacity-100">
          <X size={16} />
        </button>
      )}
    </form>
  );
};
