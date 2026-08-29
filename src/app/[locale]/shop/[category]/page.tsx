'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { DividedProductGrid } from '@/components/shop/DividedProductGrid';

type Product = { id: string; handle: string; title: string; featuredImage: { url: string } | null; priceRange: { minVariantPrice: { amount: string } }; variants: { nodes: Array<{ id: string; availableForSale: boolean; selectedOptions: Array<{ name: string; value: string }> }> } };

export default function CategoryPage() {
  const params = useParams<{ category: string }>();
  const category = params.category;
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState(category);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [activeSize, setActiveSize] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true); setError(false);
    fetch(`/api/shopify/products?collection=${encodeURIComponent(category)}`)
      .then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ collection: { title: string }; products: Product[] }>; })
      .then((data) => { setTitle(data.collection.title); setProducts(data.products); })
      .catch(() => { setError(true); setProducts([]); })
      .finally(() => setLoading(false));
  }, [category]);

  const colors = useMemo(() => Array.from(new Set(products.flatMap((product) => product.variants.nodes.flatMap((variant) => variant.selectedOptions.filter((option) => /color|kolor/i.test(option.name)).map((option) => option.value))))), [products]);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.variants.nodes.flatMap((variant) => variant.selectedOptions.filter((option) => /size|rozmiar/i.test(option.name)).map((option) => option.value))))), [products]);
  const filtered = products.filter((product) => product.variants.nodes.some((variant) => (!activeColor || variant.selectedOptions.some((option) => /color|kolor/i.test(option.name) && option.value === activeColor)) && (!activeSize || variant.selectedOptions.some((option) => /size|rozmiar/i.test(option.name) && option.value === activeSize))));

  return <main className="min-h-screen text-[color:var(--foreground)] font-antonio"><Header />
    <div className="pt-32 pb-20 container mx-auto px-6">
      <header className="mb-16"><p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/45 mb-2">Project: TWWW // Subject:</p><h1 className="text-6xl font-black uppercase tracking-tighter italic">{title}</h1></header>
      <div className="flex flex-wrap justify-between items-center gap-6 py-6 border-y border-[color:var(--border)] mb-12">
        <div className="flex gap-8">
          <label className="font-black uppercase tracking-widest text-sm">Kolor <select aria-label="Kolor" value={activeColor || ''} onChange={(event) => setActiveColor(event.target.value || null)} className="ml-2 bg-transparent"><option value="">Wszystkie</option>{colors.map((color) => <option key={color}>{color}</option>)}</select></label>
          <label className="font-black uppercase tracking-widest text-sm">Rozmiar <select aria-label="Rozmiar" value={activeSize || ''} onChange={(event) => setActiveSize(event.target.value || null)} className="ml-2 bg-transparent"><option value="">Wszystkie</option>{sizes.map((size) => <option key={size}>{size}</option>)}</select></label>
        </div><p className="text-[17px] font-black uppercase tracking-widest text-[color:var(--foreground)]/30">{filtered.length} produktów</p>
      </div>
      {loading && <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Ładowanie kolekcji…</p>}
      {error && <p className="text-center py-20 font-black uppercase tracking-widest text-red-500">Nie udało się pobrać kolekcji. Spróbuj ponownie później.</p>}
      {!loading && !error && filtered.length === 0 && <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Brak produktów w tej kolekcji.</p>}
      {!loading && !error && filtered.length > 0 && <DividedProductGrid products={filtered} category={category} />}
    </div><Footer />
  </main>;
}
