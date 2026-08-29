'use client';
import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

type Field = { key: string; value: string | null; references: { nodes: Array<{ image?: { url: string; altText: string | null } | null }> } | null };
type LookbookEntry = { id: string; handle: string; fields: Field[] };

const value = (entry: LookbookEntry, key: string) => entry.fields.find((f) => f.key === key)?.value || '';
const coverImage = (entry: LookbookEntry) => entry.fields.find((f) => f.key === 'images')?.references?.nodes[0]?.image ?? null;

export default function LookbookPage() {
  const [entries, setEntries] = useState<LookbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch('/api/shopify/metaobjects?type=lookbook')
      .then(async (res) => { if (!res.ok) throw new Error(); return res.json() as Promise<{ metaobjects: LookbookEntry[] }>; })
      .then((data) => setEntries(data.metaobjects))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio">
      <Header />
      <section className="container mx-auto px-6 pt-36 pb-24">
        <p className="font-black uppercase tracking-[.35em] opacity-40">The Way We Wear</p>
        <h1 className="mt-3 text-6xl font-black uppercase italic tracking-tighter">Lookbook</h1>

        {loading && <p className="py-20 opacity-50">Ładowanie lookbooka…</p>}
        {error && <p className="py-20 text-red-500">Nie udało się pobrać lookbooka.</p>}
        {!loading && !error && entries.length === 0 && <p className="py-20 opacity-50">Brak jeszcze żadnej edycji.</p>}

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
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
                      alt={cover.altText ?? value(entry, 'title')}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="p-6">
                  <p className="text-xs uppercase tracking-widest opacity-40">{value(entry, 'season')}</p>
                  <h2 className="mt-1 text-2xl font-black uppercase italic">{value(entry, 'title')}</h2>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
      <Footer />
    </main>
  );
}