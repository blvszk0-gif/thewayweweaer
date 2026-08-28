'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/shop/ProductCard';

type Product = {
    id: string;
    handle: string;
    title: string;
    featuredImage: { url: string } | null;
    priceRange: { minVariantPrice: { amount: string } };
    variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
};

function SearchResults() {
    const searchParams = useSearchParams();
    const q = searchParams.get('q') || '';
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        if (!q) {
            setProducts([]);
            setLoading(false);
            return;
        }
        setLoading(true);
        setError(false);
        fetch(`/api/shopify/search?q=${encodeURIComponent(q)}&mode=full`)
            .then(async (res) => { if (!res.ok) throw new Error(); return res.json() as Promise<{ products: Product[] }>; })
            .then((data) => setProducts(data.products))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [q]);

    return (
        <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio">
            <Header />
            <div className="pt-32 pb-20 container mx-auto px-6">
                <header className="mb-16">
                    <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/45 mb-2">
                        Project: TWWW // Subject:
                    </p>
                    <h1 className="text-6xl font-black uppercase tracking-tighter italic">
                        {q ? `„${q}"` : 'Szukaj'}
                    </h1>
                    {!loading && !error && q && (
                        <p className="mt-4 text-sm font-black uppercase tracking-widest opacity-40">
                            {products.length} {products.length === 1 ? 'wynik' : 'wyników'}
                        </p>
                    )}
                </header>

                {loading && <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Szukam…</p>}
                {error && <p className="text-center py-20 font-black uppercase tracking-widest text-red-500">Nie udało się wyszukać. Spróbuj ponownie.</p>}
                {!loading && !error && !q && <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Wpisz szukaną frazę.</p>}
                {!loading && !error && q && products.length === 0 && (
                    <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">
                        Brak wyników dla „{q}". Spróbuj innej frazy.
                    </p>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map((product) => {
                        const variant = product.variants.nodes[0];
                        return (
                            <ProductCard
                                key={product.id}
                                id={product.handle}
                                variantId={variant?.id}
                                name={product.title}
                                price={Number(product.priceRange.minVariantPrice.amount)}
                                image={product.featuredImage?.url || ''}
                                category=""
                                isAvailable={variant?.availableForSale ?? false}
                            />
                        );
                    })}
                </div>
            </div>
            <Footer />
        </main>
    );
}

export default function SearchPage() {
    return (
        <Suspense
            fallback={
                <main className="min-h-screen bg-[color:var(--surface)]">
                    <Header />
                    <p className="pt-40 text-center font-black uppercase tracking-widest opacity-50">Ładowanie…</p>
                </main>
            }
        >
            <SearchResults />
        </Suspense>
    );
}