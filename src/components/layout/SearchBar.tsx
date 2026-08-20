'use client';

import React, { useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

const searchRegistry = [
  { keywords: ['bluza', 'hoodie', 'sweatshirt', 'sweter', 'худі'], route: '/shop/bluzy' },
  { keywords: ['koszulka', 't-shirt', 'tee', 'tshirt', 'футболка'], route: '/shop/koszulki' },
  { keywords: ['akcesoria', 'dodatki', 'gadżety', 'sticker', 'czapka', 'accessories', 'аксесуари'], route: '/shop/akcesoria' },
  { keywords: ['lookbook', 'katalog', 'zdjęcia'], route: '/lookbook' },
  { keywords: ['stare', 'we stare'], route: '/shop/stare' },
  { keywords: ['roll', 'we roll'], route: '/shop/roll' },
  { keywords: ['bloom', 'we bloom'], route: '/shop/bloom' },
  { keywords: ['fly', 'we fly'], route: '/shop/fly' },
  { keywords: ['konto', 'profil', 'login', 'rejestracja', 'account'], route: '/account' },
  { keywords: ['koszyk', 'cart', 'zakupy'], route: '/cart' },
  { keywords: ['wishlist', 'lista życzeń', 'serce'], route: '/wishlist' },
  { keywords: ['kontakt', 'pomoc', 'support', 'reklamacja', 'help'], route: '/blog' },
];

export const SearchBar = ({ isHeader = false }) => {
  const tLegalSearch = useTranslations('legal_search');
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
        placeholder={tLegalSearch('szukaj')}
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
