import { NextResponse } from 'next/server';
import { StorefrontProduct, storefrontFetch } from '@/lib/shopify/server';

const PRODUCT_FIELDS = `
  id handle title description availableForSale productType
  featuredImage { url altText }
  images(first: 20) { nodes { url altText } }
  priceRange { minVariantPrice { amount currencyCode } }
  variants(first: 100) {
    nodes { id title availableForSale price { amount currencyCode } image { url altText } selectedOptions { name value } }
  }
`;

export async function GET(_: Request, context: { params: Promise<{ handle: string }> }) {
  const { handle } = await context.params;
  try {
    const result = await storefrontFetch<{ product: StorefrontProduct | null }>(
      `query Product($handle: String!) { product(handle: $handle) { ${PRODUCT_FIELDS} } }`,
      { handle },
    );
    if (!result.product) return NextResponse.json({ error: 'Product not found.' }, { status: 404 });
    return NextResponse.json({ product: result.product });
  } catch {
    return NextResponse.json({ error: 'Unable to retrieve product.' }, { status: 502 });
  }
}
