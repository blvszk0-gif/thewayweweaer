'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';

interface DisplayTile {
  id: string;
  title: string;
  image: string | null;
  link: string;
}

interface TileField {
  key: string;
  value: string | null;
  reference: { image?: { url: string; altText: string | null } | null } | null;
}
interface TileEntry { id: string; fields: TileField[]; }

function tileValue(entry: TileEntry, key: string): string {
  return entry.fields.find((f) => f.key === key)?.value ?? '';
}
function tileImage(entry: TileEntry): string | null {
  return entry.fields.find((f) => f.key === 'zdjecie')?.reference?.image?.url ?? null;
}

interface CollectionApi {
  id: string;
  handle: string;
  title: string;
  image: { url: string; altText: string | null } | null;
}

function SubjectsContent() {
  const searchParams = useSearchParams();
  const isCollections = searchParams.get('view') === 'collections';

  const [tiles, setTiles] = useState<DisplayTile[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    if (isCollections) {
      fetch('/api/shopify/collections')
        .then((res) => res.json())
        .then((data: { collections: CollectionApi[] }) => {
          setTiles(
            (data.collections ?? []).map((c) => ({
              id: c.id,
              title: c.title,
              image: c.image?.url ?? null,
              link: `/shop/${c.handle}`,
            }))
          );
        })
        .catch(() => setTiles([]))
        .finally(() => setLoading(false));
    } else {
      fetch('/api/shopify/metaobjects?type=kafelek_nawigacji')
        .then((res) => res.json())
        .then((data: { metaobjects: TileEntry[] }) => {
          const sorted = [...(data.metaobjects ?? [])].sort(
            (a, b) => (Number(tileValue(a, 'kolejnosc')) || 0) - (Number(tileValue(b, 'kolejnosc')) || 0)
          );
          setTiles(
            sorted.map((entry) => ({
              id: entry.id,
              title: tileValue(entry, 'tytul'),
              image: tileImage(entry),
              link: tileValue(entry, 'link') || '#',
            }))
          );
        })
        .catch(() => setTiles([]))
        .finally(() => setLoading(false));
    }
  }, [isCollections]);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] bg-repeat" />
      <Header />

      <div className="container mx-auto px-6 pt-40 pb-20 relative z-10">
        <header className="mb-20 text-center lg:text-left relative">
          {isCollections && (
            <Link href="/subjects" className="absolute -top-12 left-0 text-[13px] font-black uppercase tracking-widest border border-[color:var(--border)] px-4 py-2 rounded-full hover:bg-[color:var(--surface-muted)] transition-all">
              ← Wróć
            </Link>
          )}
          <p className="text-[17px] font-black uppercase tracking-[0.4em] text-[color:var(--foreground)]/30 mb-4">Project: TWWW // Subject:</p>
          <h1 className="text-7xl font-black uppercase tracking-tighter italic leading-none">Kolekcje</h1>
        </header>

        {loading && <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Ładowanie…</p>}
        {!loading && tiles.length === 0 && (
          <p className="text-center py-20 font-black uppercase tracking-widest opacity-50">Brak treści do wyświetlenia.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tiles.map((item, i) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative aspect-square overflow-hidden rounded-[50px] border border-[color:var(--border)] shadow-2xl hover:scale-[1.02] transition-all duration-700"
            >
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.1 }}>
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors">
                  <span className="text-4xl font-black uppercase tracking-tighter italic text-white drop-shadow-2xl text-center px-4">
                    {item.title}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      <Footer />
    </main>
  );
}

export default function SubjectsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[color:var(--surface)]" />}>
      <SubjectsContent />
    </Suspense>
  );
}