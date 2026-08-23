'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
type Field = { key: string; value: string | null }; type Entry = { handle: string; fields: Field[] }; const value = (entry: Entry, key: string) => entry.fields.find((field) => field.key === key)?.value || '';
export default function EditorialPage() { const { handle } = useParams<{ handle: string }>(); const [entry, setEntry] = useState<Entry | null>(null); useEffect(() => { fetch('/api/shopify/metaobjects?type=editorial_page').then((response) => response.json()).then((data: { metaobjects?: Entry[] }) => setEntry(data.metaobjects?.find((item) => item.handle === handle) || null)); }, [handle]); return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><article className="container max-w-3xl mx-auto px-6 pt-36 pb-24">{!entry && <p className="opacity-50">Ładowanie strony…</p>}{entry && <><h1 className="text-5xl font-black uppercase italic">{value(entry, 'title')}</h1><div className="mt-10 prose prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: value(entry, 'body') }} /></>}</article><Footer /></main>; }
