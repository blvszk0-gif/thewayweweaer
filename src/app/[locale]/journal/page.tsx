import Link from "next/link";
import Image from "next/image";
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
    <main className="mx-auto max-w-5xl px-4 py-16">
      <h1 className="mb-10 text-3xl font-semibold">Journal</h1>

      {articles.length === 0 && (
        <p className="text-neutral-500">Brak wpisów.</p>
      )}

      <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link
            key={article.id}
            href={`/${locale}/journal/${article.handle}`}
            className="group block"
          >
            {article.image && (
              <div className="relative mb-4 aspect-[4/5] overflow-hidden bg-neutral-100">
                <Image
                  src={article.image.url}
                  alt={article.image.altText ?? article.title}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
            )}
            <p className="text-xs uppercase tracking-wide text-neutral-500">
              {new Date(article.publishedAt).toLocaleDateString(locale)}
            </p>
            <h2 className="mt-1 text-lg font-medium">{article.title}</h2>
            {article.excerpt && (
              <p className="mt-2 line-clamp-2 text-sm text-neutral-600">
                {article.excerpt}
              </p>
            )}
          </Link>
        ))}
      </div>
    </main>
  );
}