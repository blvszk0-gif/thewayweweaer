import { NextRequest, NextResponse } from 'next/server';
import { storefrontFetch } from '@/lib/shopify/server';
import * as Sentry from '@sentry/nextjs';

interface SearchProduct {
    id: string;
    handle: string;
    title: string;
    featuredImage: { url: string; altText: string | null } | null;
    priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
    variants: { nodes: Array<{ id: string; availableForSale: boolean }> };
}

const PRODUCT_FIELDS = `
  id handle title
  featuredImage { url altText }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 1) { nodes { id availableForSale } }
`;

export async function GET(request: NextRequest) {
    const q = request.nextUrl.searchParams.get('q')?.trim();
    const mode = request.nextUrl.searchParams.get('mode') || 'suggest';

    if (!q) {
        return NextResponse.json({ products: [] });
    }

    try {
        if (mode === 'full') {
            const result = await storefrontFetch<{ search: { nodes: SearchProduct[] } }>(
                `query FullSearch($q: String!) {
          search(query: $q, types: [PRODUCT], first: 24) {
            nodes {
              ... on Product { ${PRODUCT_FIELDS} }
            }
          }
        }`,
                { q }
            );
            return NextResponse.json({ products: result.search.nodes });
        }

        const result = await storefrontFetch<{ predictiveSearch: { products: SearchProduct[] } }>(
            `query PredictiveSearch($q: String!) {
        predictiveSearch(query: $q, limit: 6, types: [PRODUCT]) {
          products { ${PRODUCT_FIELDS} }
        }
      }`,
            { q }
        );
        return NextResponse.json({ products: result.predictiveSearch.products });
    } catch (error) {
        console.error('Search error', error);
        Sentry.captureException(error);
        return NextResponse.json({ error: 'Wyszukiwanie nieudane.' }, { status: 502 });
    }
}