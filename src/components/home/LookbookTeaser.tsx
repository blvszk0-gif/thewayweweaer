'use client';
import { useEffect, useState } from 'react';
import { Link } from '@/i18n/routing';

interface Field { key: string; value: string | null; references: { nodes: Array<{ image?: { url: string; altText: string | null } | null }> } | null; }
interface LookbookEntry { id: string; handle: string; fields: Field[]; }

function fieldValue(entry: LookbookEntry, key: string): string {
  return entry.fields.find((f) => f.key === key)?.value ?? '';
}
function coverImage(entry: LookbookEntry) {
  return entry.fields.find((f) => f.key === 'images')?.references?.nodes[0]?.image ?? null;
}

export function LookbookTeaser() {
  const [entries, setEntries] = useState<LookbookEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/shopify/metaobjects?type=lookbook')
      .then((res) => res.json())
      .then((data) => setEntries((data.metaobjects ?? []).slice(0, 3)))
      .catch(() => setEntries([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading || entries.length === 0) return null;

  return (
    <section className="container mx-auto px-6 py-24">
      <div className="flex items-end justify-between mb-10">
        <h2 className="text-4xl font-black uppercase italic tracking-tighter">Lookbook</h2>
        <Link href="/lookbook" className="text-xs font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all">
          Zobacz wszystkie →
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {entries.map((entry) => {
          const cover = coverImage(entry);
          return (
            <Link
              key={entry.id}
              href={`/lookbook/${entry.handle}`}
              className="group block rounded-3xl overflow-hidden border border-[color:var(--border)] bg-[color:var(--surface-muted)] shadow-xl"
            >
              <div className="relative aspect-[3/4] overflow-hidden">
                {cover && (
                  <img
                    src={cover.url}
                    alt={cover.altText ?? fieldValue(entry, 'title')}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="p-5">
                <p className="text-xs uppercase tracking-widest opacity-40">{fieldValue(entry, 'season')}</p>
                <h3 className="mt-1 text-xl font-black uppercase italic">{fieldValue(entry, 'title')}</h3>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
