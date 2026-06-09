'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { motion } from 'framer-motion';
import { ShoppingBag, Heart } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const colors = ['Czarny', 'Biały', 'Szary'];
const sizes = ['S', 'M', 'L', 'XL'];

// Mock data generator
const generateProducts = (category: string) => {
  return Array.from({ length: 100 }).map((_, i) => ({
    id: `${category}-${i + 1}`,
    name: `${category ? category.toString().toUpperCase() : 'PRODUKT'} "${i % 2 === 0 ? 'SQUAD' : 'LORE'}" V${(i % 5) + 1}`,
    price: `${249 + (i % 3) * 50} PLN`,
    img: `https://placehold.co/600x800/000000/FFFFFF?text=${category ? category.toString().toUpperCase() : 'PRODUKT'}+${i + 1}`,
    color: colors[i % 3],
    size: sizes[i % 4],
  }));
};

export default function CategoryPage() {
  const params = useParams();
  const category = params?.category as string;
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [limit, setLimit] = useState(12);

  const allProducts = useMemo(() => generateProducts(category), [category]);

  const filteredProducts = useMemo(() => {
    return allProducts.filter(p => {
      const colorMatch = !selectedColor || p.color === selectedColor;
      const sizeMatch = !selectedSize || p.size === selectedSize;
      return colorMatch && sizeMatch;
    });
  }, [allProducts, selectedColor, selectedSize]);

  const displayedProducts = filteredProducts.slice(0, limit);

  return (
    <main className="min-h-screen bg-black text-white pt-24 pb-24">
      <Header />

      <div className="container mx-auto px-6">
        <header className="mb-12">
           <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/30 mb-2 font-sans">Katalog 2026 // Category</p>
           <h1 className="text-6xl font-black uppercase tracking-tighter italic">{category}</h1>
        </header>

        {/* Filters */}
        <div className="flex flex-wrap gap-8 mb-12 border-y border-white/10 py-6">
           {/* Color Filter */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Kolor</span>
              <div className="flex gap-2">
                 {colors.map(c => (
                   <button
                    key={c}
                    onClick={() => setSelectedColor(selectedColor === c ? null : c)}
                    className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${selectedColor === c ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white'}`}
                   >
                     {c}
                   </button>
                 ))}
              </div>
           </div>

           {/* Size Filter */}
           <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/50">Rozmiar</span>
              <div className="flex gap-2">
                 {sizes.map(s => (
                   <button
                    key={s}
                    onClick={() => setSelectedSize(selectedSize === s ? null : s)}
                    className={`w-10 h-10 rounded-full text-xs font-bold border flex items-center justify-center transition-all ${selectedSize === s ? 'bg-white text-black border-white' : 'border-white/20 hover:border-white'}`}
                   >
                     {s}
                   </button>
                 ))}
              </div>
           </div>

           <button
             onClick={() => { setSelectedColor(null); setSelectedSize(null); }}
             className="ml-auto text-[10px] font-bold uppercase tracking-widest hover:underline opacity-50 hover:opacity-100"
           >
             Wyczyść filtry
           </button>
        </div>

        {/* Grid: Stradivarius Style (4 per row) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12 mb-24">
           {displayedProducts.map((p, i) => (
             <motion.div
               key={p.id}
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: (i % 12) * 0.05 }}
             >
               <Card className="group cursor-pointer border-none bg-transparent">
                  <div className="aspect-[3/4] relative overflow-hidden rounded-3xl bg-white/5 grayscale group-hover:grayscale-0 transition-all duration-700">
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />

                    {/* Quick Add Overlay */}
                    <div className="absolute inset-x-0 bottom-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-center">
                       <div className="flex gap-2">
                          <button className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"><Heart size={18} /></button>
                          <button className="bg-white text-black p-3 rounded-full hover:scale-110 transition-transform"><ShoppingBag size={18} /></button>
                       </div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Quick View</span>
                    </div>
                  </div>
                  <div className="mt-6 flex justify-between items-start">
                    <div>
                       <h3 className="text-sm font-black uppercase tracking-tighter mb-1">{p.name}</h3>
                       <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.color} // {p.size}</p>
                    </div>
                    <span className="font-black text-sm tracking-tighter">{p.price}</span>
                  </div>
               </Card>
             </motion.div>
           ))}
        </div>

        {/* Load More */}
        {limit < filteredProducts.length && (
           <div className="flex flex-col items-center gap-6">
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.4em]">Wyświetlasz {displayedProducts.length} z {filteredProducts.length} artykułów</p>
              <div className="flex gap-4">
                 <button
                  onClick={() => setLimit(prev => prev + 12)}
                  className="px-12 py-4 border border-white rounded-full font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all"
                 >
                   Pokaż więcej
                 </button>
                 <button
                  onClick={() => setLimit(100)}
                  className="px-8 py-4 border border-white/20 rounded-full font-black uppercase tracking-widest text-[10px] hover:border-white transition-all text-white/60 hover:text-white"
                 >
                   Pokaż 100
                 </button>
              </div>
           </div>
        )}
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
