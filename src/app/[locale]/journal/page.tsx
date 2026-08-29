import Link from "next/link";
import Image from "next/image";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { getJournalArticles } from "@/lib/shopify/journal";

const BLOG_HANDLE = "journal";

export const revalidate = 60;

export default async function JournalPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { articles } = await getJournalArticles({ blogHandle: BLOG_HANDLE });

  return (
    <main className="min-h-screen text-[color:var(--foreground)] font-antonio">
      <Header />

      <section className="container mx-auto px-6 pt-36 pb-24">
        <p className="font-black uppercase tracking-[.35em] opacity-40">
          Project: TWWW
        </p>
        <h1 className="mt-3 text-6xl font-black uppercase italic tracking-tighter">
          Journal
        </h1>

        {articles.length === 0 && (
          <p className="py-20 font-black uppercase tracking-widest opacity-50">
            Brak wpisów.
          </p>
        )}

        <div className="mt-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/journal/${article.handle}`}
              className="group block"
            >
              {article.image && (
                <div className="relative mb-4 aspect-[4/5] overflow-hidden rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface-muted)]">
                  <Image
                    src={article.image.url}
                    alt={article.image.altText ?? article.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              )}
              <p className="text-xs uppercase tracking-widest opacity-40">
                {new Date(article.publishedAt).toLocaleDateString(locale)}
              </p>
              <h2 className="mt-1 text-2xl font-black uppercase italic">
                {article.title}
              </h2>
              {article.excerpt && (
                <p className="mt-2 line-clamp-2 opacity-50">
                  {article.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}