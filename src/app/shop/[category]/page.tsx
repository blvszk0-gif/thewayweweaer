'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import pb from '@/lib/pocketbase';

const mockProducts = [
  { id: '1', name: 'OVERSIZE HOODIE // STARE', price: 299, image: 'https://placehold.co/600x800/000000/FFFFFF?text=HOODIE+1', colors: ['CZARNY', 'SZARY'], sizes: ['M', 'L', 'XL'] },
  { id: '2', name: 'GRAFIC T-SHIRT // ROLL', price: 149, image: 'https://placehold.co/600x800/000000/FFFFFF?text=TEE+1', colors: ['BIAŁY'], sizes: ['S', 'M'] },
  { id: '3', name: 'CARGO PANTS // BLOOM', price: 349, image: 'https://placehold.co/600x800/000000/FFFFFF?text=PANTS+1', colors: ['CZARNY'], sizes: ['L', 'XL'] },
  { id: '4', name: 'SQUAD CAP // FLY', price: 99, image: 'https://placehold.co/600x800/000000/FFFFFF?text=CAP+1', colors: ['CZARNY', 'BIAŁY'], sizes: ['XXL'] },
  { id: '5', name: 'OVERSIZE HOODIE // ROLL', price: 299, image: 'https://placehold.co/600x800/000000/FFFFFF?text=HOODIE+2', colors: ['RÓŻOWY'], sizes: ['XS', 'S'] },
  { id: '6', name: 'GRAFIC T-SHIRT // STARE', price: 149, image: 'https://placehold.co/600x800/000000/FFFFFF?text=TEE+2', colors: ['SZARY'], sizes: ['M', 'L'] },
  { id: '7', name: 'CARGO PANTS // FLY', price: 349, image: 'https://placehold.co/600x800/000000/FFFFFF?text=PANTS+2', colors: ['CZARNY'], sizes: ['S', 'M', 'L'] },
  { id: '8', name: 'SQUAD CAP // BLOOM', price: 99, image: 'https://placehold.co/600x800/000000/FFFFFF?text=CAP+2', colors: ['BIAŁY'], sizes: ['M'] },
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [displayCount, setDisplayCount] = useState(8);
  const [products, setProducts] = useState(mockProducts);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const records = await pb.collection('products').getList(1, 50, {
          filter: `category = "${category}"`,
        });
        if (records.items.length > 0) {
          const mapped = records.items.map(item => ({
            id: item.id,
            name: item.name,
            price: Number(item.price),
            image: pb.files.getUrl(item, item.image || (item.images && item.images[0])),
            category: item.category,
            colors: item.colors || [], // Mock or real colors
            sizes: item.sizes || ['S', 'M', 'L', 'XL']
          }));
          setProducts(mapped);
          setFilteredProducts(mapped);
        }
      } catch {
        console.log('PocketBase not reachable, using mocks');
      }
    }
    fetchProducts();
  }, [category]);

  useEffect(() => {
    let result = products;
    if (activeColor) {
      result = result.filter(p => (p as any).colors?.includes(activeColor));
    }
    if (activeSize) {
      result = result.filter(p => (p as any).sizes?.includes(activeSize));
    }
    setFilteredProducts(result);
  }, [activeColor, activeSize, products]);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio">
      <Header />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-16">
           <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/45 mb-2">Project: TWWW // Subject:</p>
           <h1 className="text-6xl font-black uppercase tracking-tighter italic">{category}</h1>
        </header>

        {/* Filters Bar */}
        <div className="flex flex-wrap justify-between items-center gap-6 py-6 border-y border-[color:var(--border)] mb-12">
           <div className="flex gap-8">
              <div className="group relative">
                <button className={`flex items-center gap-2 text-[17px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity ${activeColor ? 'text-[color:var(--foreground)]' : ''}`}>
                  Kolor: {activeColor || 'WSZYSTKIE'} <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                   {['CZARNY', 'BIAŁY', 'SZARY', 'RÓŻOWY'].map(c => (
                     <button key={c} onClick={() => setActiveColor(activeColor === c ? null : c)} className={`w-full px-6 py-3 text-left font-black text-[13px] uppercase hover:bg-[color:var(--surface-muted)] transition-colors ${activeColor === c ? 'bg-[color:var(--surface-muted)]' : ''}`}>{c}</button>
                   ))}
                   <button onClick={() => setActiveColor(null)} className="w-full px-6 py-3 text-left font-black text-[13px] uppercase text-red-500 border-t border-[color:var(--border)]">Resetuj</button>
                </div>
              </div>

              <div className="group relative">
                <button className={`flex items-center gap-2 text-[17px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity ${activeSize ? 'text-[color:var(--foreground)]' : ''}`}>
                  Rozmiar: {activeSize || 'WSZYSTKIE'} <ChevronDown size={14} />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                   {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map(s => (
                     <button key={s} onClick={() => setActiveSize(activeSize === s ? null : s)} className={`w-full px-6 py-3 text-left font-black text-[13px] uppercase hover:bg-[color:var(--surface-muted)] transition-colors ${activeSize === s ? 'bg-[color:var(--surface-muted)]' : ''}`}>{s}</button>
                   ))}
                   <button onClick={() => setActiveSize(null)} className="w-full px-6 py-3 text-left font-black text-[13px] uppercase text-red-500 border-t border-[color:var(--border)]">Resetuj</button>
                </div>
              </div>
           </div>

           <div className="flex items-center gap-6">
              <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/30">
                Wyświetlono {Math.min(displayCount, filteredProducts.length)} z {filteredProducts.length} produktów
              </p>
           </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {filteredProducts.slice(0, displayCount).map((p) => (
             <ProductCard key={p.id} {...p} category={category} />
           ))}
        </div>

        {displayCount < filteredProducts.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 4)}
              className="px-12 py-5 border-2 border-[color:var(--border)] rounded-full font-black uppercase tracking-widest text-lg text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all"
            >
              Załaduj więcej
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
