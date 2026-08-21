import { NextResponse } from 'next/server';
import { getProducts, getProductByHandle } from '@/lib/shopify';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');
    const query = searchParams.get('query') || undefined;

    if (handle) {
      const product = await getProductByHandle(handle);
      return NextResponse.json({ product });
    }

    const products = await getProducts({ query });
    return NextResponse.json({ products });
  } catch (error) {
    console.error('Shopify Products Proxy error:', error);
    return NextResponse.json({ error: 'Błąd pobierania produktów.' }, { status: 500 });
  }
}
