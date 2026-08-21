import { NextResponse } from 'next/server';
import { getShopPolicies } from '@/lib/shopify';

export async function GET() {
  try {
    const policies = await getShopPolicies();
    return NextResponse.json({ policies });
  } catch (error) {
    console.error('Shopify Policies Proxy error:', error);
    return NextResponse.json({ error: 'Błąd pobierania polityk sklepu.' }, { status: 500 });
  }
}
