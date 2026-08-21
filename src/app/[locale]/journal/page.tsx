'use client';

import React, { useEffect, useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getBlogArticles, ShopifyArticle } from '@/lib/shopify';
import { Link } from '@/i18n/routing';
import { Loader2, ArrowRight } from 'lucide-react';

export default function JournalPage() {
  const [articles, setArticles] = useState<ShopifyArticle[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      setIsLoading(true);
      const data = await getBlogArticles('news');
      setArticles(data);
      setIsLoading(false);
    }
    fetchArticles();
  }, []);

  return (
    <main className="min-h-screen bg-[color:var(--surface)] font-antonio text-[color:var(--foreground)]">
      <Header />

      <div className="container mx-auto px-6 pt-32 pb-24">
        <header className="mb-16">
          <p className="text-[17px] font-black uppercase tracking-[0.4em] opacity-40 mb-2">The Way WE Wear // Journal</p>
          <h1 className="text-6xl font-black uppercase tracking-tighter italic">Artykuły & Historie</h1>
        </header>

        {isLoading ? (
          <div className="py-24 flex items-center justify-center gap-3">
            <Loader2 className="animate-spin" size={32} />
            <span className="font-black uppercase tracking-widest text-lg">Ładowanie artykułów...</span>
          </div>
        ) : articles.length === 0 ? (
          <div className="py-20 text-center space-y-4">
            <p className="text-2xl font-black uppercase tracking-tight opacity-50">Brak opublikowanych artykułów w Shopify</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.map((article) => (
              <Link
                key={article.id}
                href={`/journal/${article.handle}`}
                className="group border border-[color:var(--border)] rounded-3xl overflow-hidden bg-[color:var(--surface-muted)] transition-all hover:border-[color:var(--foreground)]"
              >
                {article.image && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image.url}
                      alt={article.title}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-8 space-y-4">
                  <p className="text-xs font-black uppercase tracking-widest opacity-40">
                    {new Date(article.publishedAt).toLocaleDateString('pl-PL')}
                  </p>
                  <h2 className="text-2xl font-black uppercase tracking-tight group-hover:underline">
                    {article.title}
                  </h2>
                  {article.excerpt && (
                    <p className="text-sm font-bold uppercase tracking-wider opacity-60 line-clamp-3">
                      {article.excerpt}
                    </p>
                  )}
                  <div className="pt-4 flex items-center gap-2 font-black uppercase text-xs tracking-widest">
                    <span>Czytaj więcej</span> <ArrowRight size={14} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
