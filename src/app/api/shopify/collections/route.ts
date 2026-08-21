import { NextResponse } from 'next/server';
import { getCollections, getCollectionByHandle } from '@/lib/shopify';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const handle = searchParams.get('handle');

    if (handle) {
      const collection = await getCollectionByHandle(handle);
      return NextResponse.json({ collection });
    }

    const collections = await getCollections();
    return NextResponse.json({ collections });
  } catch (error) {
    console.error('Shopify Collections Proxy error:', error);
    return NextResponse.json({ error: 'Błąd pobierania kolekcji.' }, { status: 500 });
  }
}
