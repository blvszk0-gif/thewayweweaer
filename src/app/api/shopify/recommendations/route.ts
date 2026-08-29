import { NextRequest, NextResponse } from 'next/server';
import { storefrontFetch } from '@/lib/shopify/server';

interface RecommendedProduct {
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
    const productId = request.nextUrl.searchParams.get('productId');

    if (!productId) {
        return NextResponse.json({ error: 'Brak productId.' }, { status: 400 });
    }

    try {
        const result = await storefrontFetch<{ productRecommendations: RecommendedProduct[] | null }>(
            `query Recommendations($productId: ID!) {
        productRecommendations(productId: $productId, intent: RELATED) {
          ${PRODUCT_FIELDS}
        }
      }`,
            { productId }
        );
        return NextResponse.json({ products: result.productRecommendations ?? [] });
    } catch (error) {
        console.error('Recommendations error', error);
        return NextResponse.json({ error: 'Nie udało się pobrać rekomendacji.' }, { status: 502 });
    }
}