'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type Field = { key: string; value: string | null; reference: { image?: { url: string; altText: string | null } | null } | null; references: { nodes: Array<{ image?: { url: string; altText: string | null } | null }> } | null };
type Lookbook = { id: string; handle: string; fields: Field[] };
const value = (entry: Lookbook, key: string) => entry.fields.find((field) => field.key === key)?.value || '';
const images = (entry: Lookbook) => entry.fields.find((field) => field.key === 'images')?.references?.nodes.map((node) => node.image).filter(Boolean) || [];
export default function LookbookPage() {
  const [entries, setEntries] = useState<Lookbook[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(false);
  useEffect(() => { fetch('/api/shopify/metaobjects?type=lookbook').then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ metaobjects: Lookbook[] }>; }).then((data) => setEntries(data.metaobjects)).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><section className="container mx-auto px-6 pt-36 pb-24"><p className="font-black uppercase tracking-[.35em] opacity-40">The Way We Wear</p><h1 className="mt-3 text-6xl font-black uppercase italic tracking-tighter">Lookbook</h1>{loading && <p className="py-20 opacity-50">Ładowanie lookbooka…</p>}{error && <p className="py-20 text-red-500">Nie udało się pobrać lookbooka.</p>}<div className="mt-12 space-y-20">{entries.map((entry) => <article key={entry.id}><h2 className="text-3xl font-black uppercase italic">{value(entry, 'title')}</h2>{value(entry, 'season') && <p className="mt-2 opacity-40 uppercase tracking-widest">{value(entry, 'season')}</p>}{value(entry, 'description') && <p className="mt-5 max-w-2xl opacity-70">{value(entry, 'description')}</p>}<div className="mt-7 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">{images(entry).map((image, index) => image && <img key={index} src={image.url} alt={image.altText || value(entry, 'title')} className="w-full aspect-[3/4] object-cover rounded-2xl" />)}</div></article>)}</div></section><Footer /></main>;
}
