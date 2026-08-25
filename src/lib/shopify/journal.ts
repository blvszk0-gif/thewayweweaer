import { storefrontFetch } from "./storefront";

export interface JournalArticle {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  contentHtml: string;
  authorName: string | null;
  image: {
    url: string;
    altText: string | null;
    width: number;
    height: number;
  } | null;
}

const ARTICLE_FIELDS = `
  id
  handle
  title
  excerpt
  publishedAt
  contentHtml
  image {
    url
    altText
    width
    height
  }
  authorV2 {
    name
  }
  displayAuthor: metafield(namespace: "custom", key: "display_author") {
    value
  }
`;

export async function getJournalArticles(params: {
  blogHandle: string;
  first?: number;
}) {
  const { blogHandle, first = 12 } = params;

  const query = `
    query JournalArticles($blogHandle: String!, $first: Int!) {
      blog(handle: $blogHandle) {
        title
        articles(first: $first, sortKey: PUBLISHED_AT, reverse: true) {
          nodes {
            ${ARTICLE_FIELDS}
          }
        }
      }
    }
  `;

  const data = await storefrontFetch<{
    blog: { title: string; articles: { nodes: RawArticle[] } } | null;
  }>(query, { blogHandle, first });

  if (!data.blog) {
    return { title: null as string | null, articles: [] as JournalArticle[] };
  }

  return {
    title: data.blog.title,
    articles: data.blog.articles.nodes.map(mapArticle),
  };
}

export async function getJournalArticle(params: {
  blogHandle: string;
  articleHandle: string;
}) {
  const { blogHandle, articleHandle } = params;

  const query = `
    query JournalArticle($blogHandle: String!, $articleHandle: String!) {
      blog(handle: $blogHandle) {
        articleByHandle(handle: $articleHandle) {
          ${ARTICLE_FIELDS}
        }
      }
    }
  `;

  const data = await storefrontFetch<{
    blog: { articleByHandle: RawArticle | null } | null;
  }>(query, { blogHandle, articleHandle });

  const raw = data.blog?.articleByHandle;
  return raw ? mapArticle(raw) : null;
}

// --- helpers ---

interface RawArticle {
  id: string;
  handle: string;
  title: string;
  excerpt: string | null;
  publishedAt: string;
  contentHtml: string;
  image: JournalArticle["image"];
  authorV2: { name: string } | null;
  displayAuthor: { value: string } | null;
}

function mapArticle(raw: RawArticle): JournalArticle {
  return {
    id: raw.id,
    handle: raw.handle,
    title: raw.title,
    excerpt: raw.excerpt,
    publishedAt: raw.publishedAt,
    contentHtml: raw.contentHtml,
    image: raw.image,
    authorName: raw.displayAuthor?.value ?? raw.authorV2?.name ?? null,
  };
}