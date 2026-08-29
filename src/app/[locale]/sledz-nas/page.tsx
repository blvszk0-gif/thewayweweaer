'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type Field = { key: string; value: string | null }; type Social = { id: string; fields: Field[] };
const value = (entry: Social, key: string) => entry.fields.find((field) => field.key === key)?.value || '';
export default function FollowUsPage() {
  const [socials, setSocials] = useState<Social[]>([]); const [loading, setLoading] = useState(true);
  useEffect(() => { fetch('/api/shopify/metaobjects?type=social_link').then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ metaobjects: Social[] }>; }).then((data) => setSocials(data.metaobjects)).finally(() => setLoading(false)); }, []);
  return <main className="min-h-screen text-[color:var(--foreground)] font-antonio"><Header /><section className="container mx-auto px-6 pt-40 pb-24"><header className="text-center"><p className="font-black uppercase tracking-[.4em] opacity-30">Project: TWWW</p><h1 className="mt-3 text-6xl font-black uppercase italic">Śledź nas</h1></header>{loading && <p className="py-20 text-center opacity-50">Ładowanie…</p>}<div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">{socials.map((social) => <a key={social.id} href={value(social, 'url')} target="_blank" rel="noopener noreferrer" className="aspect-square rounded-[40px] border border-[color:var(--border)] grid place-items-center hover:bg-[color:var(--foreground)] hover:text-[color:var(--surface)] transition-colors"><span className="text-3xl font-black uppercase italic">{value(social, 'platform')}</span></a>)}</div>{!loading && !socials.length && <p className="py-20 text-center opacity-50">Dodaj linki w Shopify → Content → Metaobjects → social_link.</p>}</section><Footer /></main>;
}
