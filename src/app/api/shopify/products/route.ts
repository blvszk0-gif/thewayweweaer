import { NextRequest, NextResponse } from 'next/server';
import { StorefrontProduct, storefrontFetch } from '@/lib/shopify/server';

const PRODUCT_FIELDS = `
  id handle title description availableForSale
  featuredImage { url altText }
  images(first: 20) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 100) {
    nodes { id title availableForSale price { amount currencyCode } image { url altText } selectedOptions { name value } }
  }
`;

export async function GET(request: NextRequest) {
  const collection = request.nextUrl.searchParams.get('collection');
  try {
    if (collection) {
      const result = await storefrontFetch<{ collection: { title: string; handle: string; products: { nodes: StorefrontProduct[] } } | null }>(
        `query CollectionProducts($handle: String!) { collection(handle: $handle) { title handle products(first: 100, sortKey: COLLECTION_DEFAULT) { nodes { ${PRODUCT_FIELDS} } } } }`,
        { handle: collection },
      );
      if (!result.collection) return NextResponse.json({ error: 'Collection not found.' }, { status: 404 });
      return NextResponse.json({ collection: { title: result.collection.title, handle: result.collection.handle }, products: result.collection.products.nodes });
    }

    const result = await storefrontFetch<{ products: { nodes: StorefrontProduct[] } }>(
      `query Products { products(first: 100, sortKey: CREATED_AT, reverse: true) { nodes { ${PRODUCT_FIELDS} } } }`,
    );
    return NextResponse.json({ products: result.products.nodes });
  } catch {
    return NextResponse.json({ error: 'Unable to retrieve products.' }, { status: 502 });
  }
}
