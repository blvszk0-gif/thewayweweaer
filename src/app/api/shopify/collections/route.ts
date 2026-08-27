import { NextResponse } from "next/server";
import { storefrontFetch } from "@/lib/shopify/storefront";

export const revalidate = 300;

export async function GET() {
  const query = `
    query NavCollections {
      collections(first: 20, sortKey: TITLE) {
        nodes { id handle title }
      }
    }
  `;
  const data = await storefrontFetch<{ collections: { nodes: { id: string; handle: string; title: string }[] } }>(query);
  return NextResponse.json({ collections: data.collections.nodes });
}