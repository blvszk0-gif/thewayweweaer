import { notFound } from "next/navigation";
import Image from "next/image";
import { getJournalArticle } from "@/lib/shopify/journal";

const BLOG_HANDLE = "journal"; // TODO: musi być zgodny z page.tsx wyżej

export const revalidate = 60;

export default async function JournalArticlePage({
  params,
}: {
  params: { locale: string; handle: string };
}) {
  const article = await getJournalArticle({
    blogHandle: BLOG_HANDLE,
    articleHandle: params.handle,
  });

  if (!article) {
    notFound();
  }

  return (
    <article className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-xs uppercase tracking-wide text-neutral-500">
        {new Date(article.publishedAt).toLocaleDateString(params.locale)}
        {article.authorName ? ` · ${article.authorName}` : ""}
      </p>
      <h1 className="mt-2 text-3xl font-semibold">{article.title}</h1>

      {article.image && (
        <div className="relative my-8 aspect-[16/9] overflow-hidden">
          <Image
            src={article.image.url}
            alt={article.image.altText ?? article.title}
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
      )}

      <div
        className="prose prose-neutral max-w-none"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />
    </article>
  );
}