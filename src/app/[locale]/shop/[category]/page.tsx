'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';
import { ChevronDown, Loader2 } from 'lucide-react';
import { getCollectionByHandle, getProducts, getCollections, ShopifyProduct, ShopifyCollection } from '@/lib/shopify';

export default function CategoryPage() {
  const tCatalogPdp = useTranslations('catalog_pdp');
  const params = useParams();
  const categoryHandle = (params.category as string) || 'all';

  const [isLoading, setIsLoading] = useState(true);
  const [collection, setCollection] = useState<ShopifyCollection | null>(null);
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ShopifyProduct[]>([]);
  const [displayCount, setDisplayCount] = useState(8);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      if (categoryHandle === 'all') {
        const allProducts = await getProducts({ first: 50 });
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        setCollection({
          id: 'all',
          handle: 'all',
          title: 'Wszystkie Kolekcje',
          description: 'Przeglądaj pełny asortyment The Way WE Wear',
          products: { edges: allProducts.map((p) => ({ node: p })) },
        });
      } else {
        const col = await getCollectionByHandle(categoryHandle);
        if (col) {
          setCollection(col);
          const colProds = col.products.edges.map((e) => e.node);
          setProducts(colProds);
          setFilteredProducts(colProds);
        } else {
          // Fallback if handle is not found
          const allProducts = await getProducts({ first: 50 });
          setProducts(allProducts);
          setFilteredProducts(allProducts);
          setCollection({
            id: categoryHandle,
            handle: categoryHandle,
            title: categoryHandle.replace(/-/g, ' ').toUpperCase(),
            description: '',
            products: { edges: allProducts.map((p) => ({ node: p })) },
          });
        }
      }
      setIsLoading(false);
    }

    loadData();
  }, [categoryHandle]);

  useEffect(() => {
    let result = products;
    if (activeColor) {
      result = result.filter((p) =>
        p.variants.edges.some((e) =>
          e.node.selectedOptions.some(
            (opt) => opt.name.toLowerCase() === 'color' || opt.name.toLowerCase() === 'kolor'
              ? opt.value.toLowerCase() === activeColor.toLowerCase()
              : false
          )
        )
      );
    }
    if (activeSize) {
      result = result.filter((p) =>
        p.variants.edges.some((e) =>
          e.node.selectedOptions.some(
            (opt) => opt.name.toLowerCase() === 'size' || opt.name.toLowerCase() === 'rozmiar'
              ? opt.value.toLowerCase() === activeSize.toLowerCase()
              : false
          )
        )
      );
    }
    setFilteredProducts(result);
  }, [activeColor, activeSize, products]);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio">
      <Header />

      <div className="pt-32 pb-20 container mx-auto px-6">
        <header className="mb-16">
          <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/45 mb-2">
            {tCatalogPdp('projekt_twww_temat')}
          </p>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">
            {collection?.title || categoryHandle.replace(/-/g, ' ')}
          </h1>
          {collection?.description && (
            <p className="mt-4 text-[17px] font-bold uppercase opacity-60 max-w-2xl">
              {collection.description}
            </p>
          )}
        </header>

        {/* Filters Bar */}
        <div className="flex flex-wrap justify-between items-center gap-6 py-6 border-y border-[color:var(--border)] mb-12">
          <div className="flex gap-8">
            <div className="group relative">
              <button
                className={`flex items-center gap-2 text-[17px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity ${
                  activeColor ? 'text-[color:var(--foreground)]' : ''
                }`}
              >
                Kolor: {activeColor || 'WSZYSTKIE'} <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                {['CZARNY', 'BIAŁY', 'SZARY', 'RÓŻOWY'].map((c) => (
                  <button
                    key={c}
                    onClick={() => setActiveColor(activeColor === c ? null : c)}
                    className={`w-full px-6 py-3 text-left font-black text-[13px] uppercase hover:bg-[color:var(--surface-muted)] transition-colors ${
                      activeColor === c ? 'bg-[color:var(--surface-muted)]' : ''
                    }`}
                  >
                    {c}
                  </button>
                ))}
                <button
                  onClick={() => setActiveColor(null)}
                  className="w-full px-6 py-3 text-left font-black text-[13px] uppercase text-red-500 border-t border-[color:var(--border)]"
                >
                  Resetuj
                </button>
              </div>
            </div>

            <div className="group relative">
              <button
                className={`flex items-center gap-2 text-[17px] font-black uppercase tracking-widest hover:opacity-50 transition-opacity ${
                  activeSize ? 'text-[color:var(--foreground)]' : ''
                }`}
              >
                Rozmiar: {activeSize || 'WSZYSTKIE'} <ChevronDown size={14} />
              </button>
              <div className="absolute top-full left-0 mt-2 w-48 bg-[color:var(--surface)] border border-[color:var(--border)] rounded-xl shadow-2xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-20 overflow-hidden">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((s) => (
                  <button
                    key={s}
                    onClick={() => setActiveSize(activeSize === s ? null : s)}
                    className={`w-full px-6 py-3 text-left font-black text-[13px] uppercase hover:bg-[color:var(--surface-muted)] transition-colors ${
                      activeSize === s ? 'bg-[color:var(--surface-muted)]' : ''
                    }`}
                  >
                    {s}
                  </button>
                ))}
                <button
                  onClick={() => setActiveSize(null)}
                  className="w-full px-6 py-3 text-left font-black text-[13px] uppercase text-red-500 border-t border-[color:var(--border)]"
                >
                  Resetuj
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/30">
              {tCatalogPdp('wyświetlono_count_z_total_produktów', {
                count: Math.min(displayCount, filteredProducts.length),
                total: filteredProducts.length,
              })}
            </p>
          </div>
        </div>

        {/* Product Grid / Loading / Empty State */}
        {isLoading ? (
          <div className="py-24 flex items-center justify-center gap-3">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-black uppercase tracking-widest text-lg">Ładowanie kolekcji...</span>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-24 text-center space-y-4">
            <p className="text-2xl font-black uppercase tracking-tight opacity-50">Brak produktów w tej kolekcji</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredProducts.slice(0, displayCount).map((p) => {
              const mainPrice = parseFloat(p.priceRange.minVariantPrice.amount);
              const imgUrl = p.featuredImage?.url || 'https://placehold.co/600x800/000000/FFFFFF?text=TWWW';

              return (
                <ProductCard
                  key={p.id}
                  id={p.handle}
                  name={p.title}
                  price={mainPrice}
                  image={imgUrl}
                  category={categoryHandle}
                />
              );
            })}
          </div>
        )}

        {displayCount < filteredProducts.length && (
          <div className="mt-20 flex justify-center">
            <button
              onClick={() => setDisplayCount((prev) => prev + 4)}
              className="px-12 py-5 border-2 border-[color:var(--border)] rounded-full font-black uppercase tracking-widest text-lg text-[color:var(--foreground)] hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-all"
            >
              {tCatalogPdp('załaduj_więcej')}
            </button>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
