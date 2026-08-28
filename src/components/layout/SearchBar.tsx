'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter, Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { Search, X } from 'lucide-react';

interface SuggestionProduct {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string; altText: string | null } | null;
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
}

export const SearchBar = ({ isHeader = false }) => {
  const tLegalSearch = useTranslations('legal_search');
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionProduct[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trimmed = query.trim();
    if (trimmed.length < 2) {
      setSuggestions([]);
      setIsOpen(false);
      return;
    }

    const timeout = setTimeout(() => {
      setLoading(true);
      fetch(`/api/shopify/search?q=${encodeURIComponent(trimmed)}`)
        .then((res) => res.json())
        .then((data) => {
          setSuggestions(data.products ?? []);
          setIsOpen(true);
        })
        .catch(() => setSuggestions([]))
        .finally(() => setLoading(false));
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const goToFullResults = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setIsOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    goToFullResults();
  };

  return (
    <div ref={containerRef} className={`relative ${isHeader ? 'w-full' : 'max-w-md mx-auto'}`}>
      <form onSubmit={handleSearch} className="flex items-center rounded-xl px-4 py-2 gap-2 border border-[color:var(--border)] w-full">
        <Search size={18} className="opacity-50" />
        <input
          type="text"
          placeholder={tLegalSearch('szukaj')}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          className="bg-transparent border-none text-base focus:outline-none flex-1 uppercase font-black text-[color:var(--foreground)] placeholder:text-[color:var(--foreground)]/50"
        />
        {query && (
          <button
            type="button"
            onClick={() => { setQuery(''); setSuggestions([]); setIsOpen(false); }}
            className="opacity-30 hover:opacity-100"
            aria-label="Wyczyść wyszukiwanie"
          >
            <X size={16} />
          </button>
        )}
      </form>

      {isOpen && (
        <div className="absolute left-0 right-0 mt-2 rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] shadow-2xl overflow-hidden z-50 max-h-[70vh] overflow-y-auto">
          {loading && (
            <p className="p-4 text-xs font-black uppercase tracking-widest opacity-50">Szukam…</p>
          )}
          {!loading && suggestions.length === 0 && (
            <p className="p-4 text-xs font-black uppercase tracking-widest opacity-50">Brak wyników.</p>
          )}
          {!loading && suggestions.map((product) => (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 p-3 hover:bg-[color:var(--surface-muted)] transition-colors border-b border-[color:var(--border)] last:border-b-0"
            >
              {product.featuredImage && (
                <img
                  src={product.featuredImage.url}
                  alt={product.featuredImage.altText ?? product.title}
                  className="w-12 h-12 object-cover rounded-lg"
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-black uppercase truncate">{product.title}</p>
                <p className="text-xs opacity-50">
                  {product.priceRange.minVariantPrice.amount} {product.priceRange.minVariantPrice.currencyCode}
                </p>
              </div>
            </Link>
          ))}
          {!loading && suggestions.length > 0 && (
            <button
              onClick={goToFullResults}
              className="w-full p-3 text-xs font-black uppercase tracking-widest text-center hover:bg-[color:var(--surface-muted)] transition-colors"
            >
              Zobacz wszystkie wyniki dla „{query}"
            </button>
          )}
        </div>
      )}
    </div>
  );
};