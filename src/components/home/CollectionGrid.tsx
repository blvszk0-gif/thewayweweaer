'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { ProductCard } from '@/components/shop/ProductCard';

type Product = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: { amount: string } };
  variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
};

interface CollectionGridProps {
  collectionHandle: string;
  collectionTitle: string;
}

export function CollectionGrid({ collectionHandle, collectionTitle }: CollectionGridProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/shopify/products?collection=${encodeURIComponent(collectionHandle)}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products ?? []))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, [collectionHandle]);

  if (loading || products.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-16">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">{collectionTitle}</h2>
        <Link
          href={`/shop/${collectionHandle}`}
          className="text-xs font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all"
        >
          Zobacz całą kolekcję →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => {
          const variant = product.variants.nodes.find((v) => v.availableForSale) || product.variants.nodes[0];
          return (
            <ProductCard
              key={product.id}
              id={product.handle}
              variantId={variant?.id}
              name={product.title}
              price={Number(product.priceRange.minVariantPrice.amount)}
              image={product.featuredImage?.url || ''}
              category={collectionHandle}
              isAvailable={variant?.availableForSale ?? false}
            />
          );
        })}
      </div>
    </section>
  );
}
