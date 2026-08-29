'use client';

import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';
import { DividedProductGrid } from '@/components/shop/DividedProductGrid';

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
        <Link href={`/shop/${collectionHandle}`} className="group">
          <h2 className="text-4xl font-black uppercase italic tracking-tighter group-hover:pl-2 transition-all duration-500">
            {collectionTitle}
          </h2>
        </Link>
        <Link
          href={`/shop/${collectionHandle}`}
          className="text-xs font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all"
        >
          Zobacz całą kolekcję →
        </Link>
      </div>
      <DividedProductGrid products={products} category={collectionHandle} />
    </section>
  );
}
