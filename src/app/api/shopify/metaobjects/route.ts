import { NextResponse } from 'next/server';
import { getMetaobjects } from '@/lib/shopify';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const type = searchParams.get('type') || 'lookbook';

    const metaobjects = await getMetaobjects(type);
    return NextResponse.json({ metaobjects });
  } catch (error) {
    console.error('Shopify Metaobjects Proxy error:', error);
    return NextResponse.json({ error: 'Błąd pobierania metaobiektów.' }, { status: 500 });
  }
}
