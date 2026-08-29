'use client';

import { ProductCard } from '@/components/shop/ProductCard';

type GridProduct = {
  id: string;
  handle: string;
  title: string;
  featuredImage: { url: string } | null;
  priceRange: { minVariantPrice: { amount: string } };
  variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
};

interface DividedProductGridProps {
  products: GridProduct[];
  category: string;
  columns?: number;
}

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

export function DividedProductGrid({ products, category, columns = 4 }: DividedProductGridProps) {
  const totalCells = Math.max(columns, Math.ceil(products.length / columns) * columns);
  const emptyCount = totalCells - products.length;

  return (
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
              category={category}
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
  );
}
