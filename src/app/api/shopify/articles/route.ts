import { NextRequest, NextResponse } from 'next/server';
import { storefrontFetch } from '@/lib/shopify/server';

export async function GET(request: NextRequest) {
  const handle = request.nextUrl.searchParams.get('handle');
  const blogHandle = process.env.SHOPIFY_BLOG_HANDLE || 'journal';
  try {
    if (handle) {
      const data = await storefrontFetch<{ blog: { articleByHandle: { handle: string; title: string; contentHtml: string; excerpt: string | null; publishedAt: string; image: { url: string; altText: string | null } | null; seo: { title: string | null; description: string | null } } | null } | null }>(`query Article($blog: String!, $handle: String!) { blog(handle: $blog) { articleByHandle(handle: $handle) { handle title contentHtml excerpt publishedAt image { url altText } seo { title description } } } }`, { blog: blogHandle, handle });
      if (!data.blog?.articleByHandle) return NextResponse.json({ error: 'Article not found.' }, { status: 404 });
      return NextResponse.json({ article: data.blog.articleByHandle });
    }
    const data = await storefrontFetch<{ blog: { articles: { nodes: Array<{ handle: string; title: string; excerpt: string | null; publishedAt: string; image: { url: string; altText: string | null } | null }> } } | null }>(`query Articles($handle: String!) { blog(handle: $handle) { articles(first: 100, reverse: true) { nodes { handle title excerpt publishedAt image { url altText } } } } }`, { handle: blogHandle });
    return NextResponse.json({ articles: data.blog?.articles.nodes || [] });
  } catch { return NextResponse.json({ error: 'Unable to retrieve articles.' }, { status: 502 }); }
}
