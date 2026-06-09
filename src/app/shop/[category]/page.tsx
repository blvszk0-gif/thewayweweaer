'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BackToTop } from '@/components/ui/BackToTop';
import { ProductCard } from '@/components/shop/ProductCard';
import { Filter, ChevronDown, LayoutGrid, List } from 'lucide-react';
import pb from '@/lib/pocketbase';

const mockProducts = [
  { id: '1', name: 'OVERSIZE HOODIE // STARE', price: 299, image: 'https://placehold.co/600x800/000000/FFFFFF?text=HOODIE+1' },
  { id: '2', name: 'GRAFIC T-SHIRT // ROLL', price: 149, image: 'https://placehold.co/600x800/000000/FFFFFF?text=TEE+1' },
  { id: '3', name: 'CARGO PANTS // BLOOM', price: 349, image: 'https://placehold.co/600x800/000000/FFFFFF?text=PANTS+1' },
  { id: '4', name: 'SQUAD CAP // FLY', price: 99, image: 'https://placehold.co/600x800/000000/FFFFFF?text=CAP+1' },
  { id: '5', name: 'OVERSIZE HOODIE // ROLL', price: 299, image: 'https://placehold.co/600x800/000000/FFFFFF?text=HOODIE+2' },
  { id: '6', name: 'GRAFIC T-SHIRT // STARE', price: 149, image: 'https://placehold.co/600x800/000000/FFFFFF?text=TEE+2' },
  { id: '7', name: 'CARGO PANTS // FLY', price: 349, image: 'https://placehold.co/600x800/000000/FFFFFF?text=PANTS+2' },
  { id: '8', name: 'SQUAD CAP // BLOOM', price: 99, image: 'https://placehold.co/600x800/000000/FFFFFF?text=CAP+2' },
];

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [displayCount, setDisplayCount] = useState(8);
  const [products, setProducts] = useState(mockProducts);

  React.useEffect(() => {
    async function fetchProducts() {
      try {
        const records = await pb.collection('products').getList(1, 50, {
          filter: `category = "${category}"`,
        });
        if (records.items.length > 0) {
          setProducts(records.items.map(item => ({
            id: item.id,
            name: item.name,
            price: item.price,
            image: pb.files.getUrl(item, item.image)
          })));
        }
      } catch (err) {
        console.log('PocketBase not reachable, using mocks');
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <main className="min-h-screen font-abel">
      <Header />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-16">
           <p className="text-[10px] font-black uppercase tracking-[0.4em] text-black/30 mb-2">Project: TWWW // Subject:</p>
           <h1 className="text-6xl font-black uppercase tracking-tighter italic font-abel">{category}</h1>
        </header>

        {/* Filters Bar */}
        <div className="flex flex-wrap justify-between items-center gap-6 py-6 border-y border-black/10 mb-12">
           <div className="flex gap-8">
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                <Filter size={14} /> Filtry
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                Kolor <ChevronDown size={14} />
              </button>
              <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity">
                Rozmiar <ChevronDown size={14} />
              </button>
           </div>

           <div className="flex items-center gap-6">
              <p className="text-[10px] font-black uppercase tracking-widest text-black/30">
                Wyświetlono {Math.min(displayCount, mockProducts.length)} z {mockProducts.length} produktów
              </p>
              <div className="flex gap-2">
                 <LayoutGrid size={18} className="opacity-100" />
                 <List size={18} className="opacity-20" />
              </div>
           </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {products.slice(0, displayCount).map((p) => (
             <ProductCard key={p.id} {...p} />
           ))}
        </div>

        {displayCount < products.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setDisplayCount(prev => prev + 4)}
              className="px-12 py-5 border-2 border-black rounded-full font-black uppercase tracking-widest text-xs hover:bg-black hover:text-white transition-all"
            >
              Załaduj więcej
            </button>
          </div>
        )}
      </div>

      <BackToTop />
      <Footer />
    </main>
  );
}
