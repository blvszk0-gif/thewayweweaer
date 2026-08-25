import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { pl, enUS } from "date-fns/locale";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    <main className="min-h-screen bg-[color:var(--surface)] text-[color:var(--foreground)] font-antonio">
      <Header />

      <section className="container mx-auto max-w-xl px-6 pt-36 pb-24">
        <article className="overflow-hidden rounded-3xl border border-[color:var(--border)]">
          {article.image && (
            <div className="relative aspect-square w-full bg-[color:var(--surface-muted)]">
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
            <p className="text-xs uppercase tracking-widest text-neutral-400">
              {format(new Date(article.publishedAt), "d MMMM yyyy", {
                locale: dateLocale,
              })}
              {article.authorName ? ` · ${article.authorName}` : ""}
            </p>
            <h1 className="mt-2 text-lg font-black uppercase italic">
              {article.title}
            </h1>
            {article.excerpt && (
              <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-neutral-200">
                {article.excerpt}
              </p>
            )}
          </div>
        </article>
      </section>

      <Footer />
    </main>
  );
}