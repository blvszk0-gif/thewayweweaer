'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Link } from '@/i18n/routing';

type Article = { handle: string; title: string; excerpt: string | null; publishedAt: string; image: { url: string; altText: string | null } | null };
export default function JournalPage() {
  const [articles, setArticles] = useState<Article[]>([]); const [loading, setLoading] = useState(true); const [error, setError] = useState(false);
  useEffect(() => { fetch('/api/shopify/articles').then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ articles: Article[] }>; }).then((data) => setArticles(data.articles)).catch(() => setError(true)).finally(() => setLoading(false)); }, []);
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><section className="container mx-auto px-6 pt-36 pb-24"><p className="font-black uppercase tracking-[.35em] opacity-40">The Way We Wear</p><h1 className="mt-3 text-6xl font-black uppercase italic tracking-tighter">Journal</h1>{loading && <p className="py-20 font-black uppercase tracking-widest opacity-50">Ładowanie artykułów…</p>}{error && <p className="py-20 font-black uppercase tracking-widest text-red-500">Nie udało się pobrać artykułów.</p>}<div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-8">{articles.map((article) => <Link key={article.handle} href={`/journal/${article.handle}`} className="group border border-[color:var(--border)] rounded-3xl overflow-hidden"><div className="aspect-[4/3] bg-[color:var(--surface-muted)]">{article.image && <img src={article.image.url} alt={article.image.altText || article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />}</div><div className="p-6"><p className="text-xs font-black opacity-40">{new Date(article.publishedAt).toLocaleDateString('pl-PL')}</p><h2 className="mt-3 text-2xl font-black uppercase italic">{article.title}</h2>{article.excerpt && <p className="mt-3 opacity-60 line-clamp-3">{article.excerpt}</p>}</div></Link>)}</div>{!loading && !error && !articles.length && <p className="py-20 opacity-50">Brak opublikowanych artykułów.</p>}</section><Footer /></main>;
}
