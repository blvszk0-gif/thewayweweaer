'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/shop/ProductCard';

interface RecommendedProduct {
    id: string;
    handle: string;
    title: string;
    featuredImage: { url: string } | null;
    priceRange: { minVariantPrice: { amount: string } };
    variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
}

export function RecommendedProducts({ productId }: { productId: string }) {
    const [products, setProducts] = useState<RecommendedProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/shopify/recommendations?productId=${encodeURIComponent(productId)}`)
            .then((res) => res.json())
            .then((data) => setProducts(data.products ?? []))
            .catch(() => setProducts([]))
            .finally(() => setLoading(false));
    }, [productId]);

    if (loading || products.length === 0) return null;

    return (
        <section className="container mx-auto px-6 py-24">
            <h2 className="mb-10 text-3xl font-black uppercase italic tracking-tighter text-[color:var(--foreground)]">
                Może Ci się spodobać
            </h2>
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
        </section>
    );
}