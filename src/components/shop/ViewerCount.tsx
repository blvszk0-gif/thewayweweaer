'use client';

import { useEffect, useState } from 'react';
import { Eye } from 'lucide-react';

function seededBase(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return 3 + (hash % 13); // 3-15
}

function personsPhrase(n: number): string {
  if (n === 1) return 'osoba ogląda';
  const lastDigit = n % 10;
  const lastTwo = n % 100;
  if (lastDigit >= 2 && lastDigit <= 4 && !(lastTwo >= 12 && lastTwo <= 14)) return 'osoby oglądają';
  return 'osób ogląda';
}

interface ViewerCountProps {
  productId: string;
}

export function ViewerCount({ productId }: ViewerCountProps) {
  const [count, setCount] = useState(() => seededBase(productId));

  useEffect(() => {
    setCount(seededBase(productId));

    let cancelled = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      timeoutId = setTimeout(() => {
        if (cancelled) return;
        setCount((prev) => {
          const delta = Math.random() < 0.5 ? -1 : 1;
          return Math.min(19, Math.max(2, prev + delta));
        });
        tick();
      }, 25000 + Math.random() * 15000);
    };
    tick();

    return () => {
      cancelled = true;
      clearTimeout(timeoutId);
    };
  }, [productId]);

  return (
    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-[color:var(--foreground)]/60 bg-[color:var(--surface-muted)] px-4 py-2 rounded-full">
      <Eye size={14} />
      <span>{count} {personsPhrase(count)} ten produkt</span>
    </div>
  );
}
