'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

type Article = { title: string; contentHtml: string; publishedAt: string; image: { url: string; altText: string | null } | null };
export default function ArticlePage() {
  const { handle } = useParams<{ handle: string }>(); const [article, setArticle] = useState<Article | null>(null); const [error, setError] = useState(false);
  useEffect(() => { fetch(`/api/shopify/articles?handle=${encodeURIComponent(handle)}`).then(async (response) => { if (!response.ok) throw new Error(); return response.json() as Promise<{ article: Article }>; }).then((data) => setArticle(data.article)).catch(() => setError(true)); }, [handle]);
  return <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio"><Header /><article className="container max-w-3xl mx-auto px-6 pt-36 pb-24">{!article && !error && <p>Ładowanie…</p>}{error && <p className="text-red-500">Nie znaleziono artykułu.</p>}{article && <><p className="font-black opacity-40">{new Date(article.publishedAt).toLocaleDateString('pl-PL')}</p><h1 className="mt-4 text-5xl font-black uppercase italic">{article.title}</h1>{article.image && <img src={article.image.url} alt={article.image.altText || article.title} className="mt-10 rounded-3xl w-full" />}<div className="prose prose-invert max-w-none mt-10" dangerouslySetInnerHTML={{ __html: article.contentHtml }} /></>}</article><Footer /></main>;
}
