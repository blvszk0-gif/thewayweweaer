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

const COLUMNS = 4;

function EmptySlot() {
  return (
    <div className="flex flex-col h-full">
      <div className="aspect-[3/4] bg-[color:var(--surface-muted)]/40" />
      <div className="p-6 flex-1 flex items-center justify-center">
        <span className="text-xs font-black uppercase tracking-widest opacity-20">Wkrótce</span>
      </div>
    </div>
  );
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

  const totalCells = Math.max(COLUMNS, Math.ceil(products.length / COLUMNS) * COLUMNS);
  const emptyCount = totalCells - products.length;

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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 border-t border-l border-[color:var(--border)]">
        {products.map((product) => {
          const variant = product.variants.nodes.find((v) => v.availableForSale) || product.variants.nodes[0];
          return (
            <div key={product.id} className="border-r border-b border-[color:var(--border)]">
              <ProductCard
                variant="flush"
                id={product.handle}
                variantId={variant?.id}
                name={product.title}
                price={Number(product.priceRange.minVariantPrice.amount)}
                image={product.featuredImage?.url || ''}
                category={collectionHandle}
                isAvailable={variant?.availableForSale ?? false}
              />
            </div>
          );
        })}
        {Array.from({ length: emptyCount }).map((_, i) => (
          <div key={`empty-${i}`} className="border-r border-b border-[color:var(--border)]">
            <EmptySlot />
          </div>
        ))}
      </div>
    </section>
  );
}
