'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
type Field = { key: string; value: string | null }; type Entry = { id: string; fields: Field[] }; const value = (entry: Entry, key: string) => entry.fields.find((field) => field.key === key)?.value || '';
export default function FaqPage() { const [entries, setEntries] = useState<Entry[]>([]); useEffect(() => { fetch('/api/shopify/metaobjects?type=faq').then((response) => response.json()).then((data: { metaobjects?: Entry[] }) => setEntries(data.metaobjects || [])); }, []); return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><section className="container max-w-4xl mx-auto px-6 pt-36 pb-24"><h1 className="text-6xl font-black uppercase italic">FAQ</h1><div className="mt-12 space-y-4">{entries.map((entry) => <details key={entry.id} className="border border-[color:var(--border)] rounded-2xl p-6"><summary className="font-black uppercase cursor-pointer">{value(entry, 'question')}</summary><div className="mt-5 opacity-70" dangerouslySetInnerHTML={{ __html: value(entry, 'odpowiedz') }} /></details>)}</div>{!entries.length && <p className="py-20 opacity-50">Dodaj pytania w Shopify → Content → Metaobjects → faq.</p>}</section><Footer /></main>; }
