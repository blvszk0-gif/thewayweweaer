import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";
import { getJournalArticle } from "@/lib/shopify/journal";

const BLOG_HANDLE = "journal";

export const revalidate = 60;

export default async function JournalArticlePage({
  params,
}: {
  params: Promise<{ locale: string; handle: string }>;
}) {
  const { locale, handle } = await params;

  const article = await getJournalArticle({
    blogHandle: BLOG_HANDLE,
    articleHandle: handle,
  });

  if (!article) {
    notFound();
  }

  const dateLocale = locale === "pl" ? pl : enUS;

  return (
    <main className="mx-auto max-w-xl px-4 py-16">
      <article className="overflow-hidden rounded-md border border-neutral-200">
        {article.image && (
          <div className="relative aspect-square w-full bg-neutral-100">
            <Image
              src={article.image.url}
              alt={article.image.altText ?? article.title}
              fill
              sizes="(min-width: 640px) 576px, 100vw"
              className="object-contain"
              priority
            />
          </div>
        )}

        <div className="bg-neutral-950 px-6 py-6 text-white">
          <p className="text-xs uppercase tracking-wide text-neutral-400">
            {format(new Date(article.publishedAt), "d MMMM yyyy", {
              locale: dateLocale,
            })}
            {article.authorName ? ` · ${article.authorName}` : ""}
          </p>
          <h1 className="mt-2 text-lg font-medium">{article.title}</h1>
          {article.excerpt && (
            <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-200">
              {article.excerpt}
            </p>
          )}
        </div>
      </article>
    </main>
  );
}