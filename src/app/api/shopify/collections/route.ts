import { NextResponse } from 'next/server';
import { storefrontFetch } from '@/lib/shopify/server';

export async function GET() {
  try {
    const data = await storefrontFetch<{ collections: { nodes: Array<{ id: string; handle: string; title: string; image: { url: string; altText: string | null } | null; description: string }> } }>(
      `query Collections { collections(first: 100, sortKey: UPDATED_AT, reverse: true) { nodes { id handle title description image { url altText } } } }`,
    );
    return NextResponse.json({ collections: data.collections.nodes });
  } catch {
    return NextResponse.json({ error: 'Unable to retrieve collections.' }, { status: 502 });
  }
}
