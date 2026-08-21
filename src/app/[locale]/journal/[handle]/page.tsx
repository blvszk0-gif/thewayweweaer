'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getArticleByHandle, ShopifyArticle } from '@/lib/shopify';
import { Link } from '@/i18n/routing';
import { Loader2, ArrowLeft } from 'lucide-react';

export default function ArticlePage() {
  const params = useParams();
  const handle = params.handle as string;

  const [article, setArticle] = useState<ShopifyArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticle() {
      setIsLoading(true);
      const data = await getArticleByHandle(handle, 'news');
      setArticle(data);
      setIsLoading(false);
    }
    fetchArticle();
  }, [handle]);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio text-[color:var(--foreground)]">
      <Header />

      <div className="container mx-auto px-6 pt-32 pb-24 max-w-4xl">
        <Link
          href="/journal"
          className="inline-flex items-center gap-2 text-[13px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity mb-8"
        >
          <ArrowLeft size={16} /> Wróć do artykułów
        </Link>

        {isLoading ? (
          <div className="py-24 flex items-center justify-center gap-3">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-black uppercase tracking-widest text-lg">Ładowanie artykułu...</span>
          </div>
        ) : !article ? (
          <div className="py-20 text-center space-y-4">
            <h1 className="text-4xl font-black uppercase tracking-tighter italic">Artykuł nie został znaleziony</h1>
          </div>
        ) : (
          <article className="space-y-8">
            <header className="space-y-4 border-b border-[color:var(--border)] pb-8">
              <p className="text-xs font-black uppercase tracking-widest opacity-40">
                {new Date(article.publishedAt).toLocaleDateString('pl-PL')} {article.authorV2 ? `| Autor: ${article.authorV2.name}` : ''}
              </p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic leading-tight">
                {article.title}
              </h1>
            </header>

            {article.image && (
              <div className="aspect-[16/9] rounded-3xl overflow-hidden border border-[color:var(--border)]">
                <img src={article.image.url} alt={article.title} className="w-full h-full object-cover grayscale" />
              </div>
            )}

            <div
              className="prose prose-invert max-w-none font-bold uppercase text-base leading-relaxed tracking-wider opacity-80"
              dangerouslySetInnerHTML={{ __html: article.contentHtml }}
            />
          </article>
        )}
      </div>

      <Footer />
    </main>
  );
}
