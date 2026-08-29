'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

type Collection = { id: string; handle: string; title: string; description: string; image: { url: string; altText: string | null } | null };

export default function ShopPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => { fetch('/api/shopify/collections').then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ collections: Collection[] }>; }).then((data) => setCollections(data.collections)).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  return <main className="min-h-screen text-[color:var(--foreground)] font-antonio"><Header /><section className="container mx-auto px-6 pt-36 pb-24"><p className="font-black uppercase tracking-[.35em] opacity-40">Project: TWWW</p><h1 className="mt-3 text-6xl font-black uppercase italic tracking-tighter">Kolekcje</h1>{loading && <p className="py-20 font-black uppercase tracking-widest opacity-50">Ładowanie kolekcji…</p>}{error && <p className="py-20 font-black uppercase tracking-widest text-red-500">Nie udało się pobrać kolekcji.</p>}<div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">{collections.map((collection) => <Link key={collection.id} href={`/shop/${collection.handle}`} className="group rounded-3xl overflow-hidden border border-[color:var(--border)]"><div className="aspect-[4/5] bg-[color:var(--surface-muted)]">{collection.image && <img src={collection.image.url} alt={collection.image.altText || collection.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />}</div><div className="p-6"><h2 className="text-2xl font-black uppercase italic">{collection.title}</h2>{collection.description && <p className="mt-2 opacity-50 line-clamp-2">{collection.description}</p>}</div></Link>)}</div>{!loading && !error && !collections.length && <p className="py-20 opacity-50">Brak opublikowanych kolekcji.</p>}</section><Footer /></main>;
}
