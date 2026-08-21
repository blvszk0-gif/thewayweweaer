import { NextResponse } from 'next/server';
import {
  getCart,
  createCart,
  addToCart,
  updateCartLines,
  removeCartLines
} from '@/lib/shopify';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, cartId, lines, lineIds } = body;

    if (action === 'get') {
      if (!cartId) return NextResponse.json({ cart: null });
      const cart = await getCart(cartId);
      return NextResponse.json({ cart });
    }

    if (action === 'create') {
      const cart = await createCart(lines || []);
      return NextResponse.json({ cart });
    }

    if (action === 'add') {
      if (!cartId) {
        const cart = await createCart(lines || []);
        return NextResponse.json({ cart });
      }
      const cart = await addToCart(cartId, lines || []);
      return NextResponse.json({ cart });
    }

    if (action === 'update') {
      if (!cartId) return NextResponse.json({ error: 'Missing cartId' }, { status: 400 });
      const cart = await updateCartLines(cartId, lines || []);
      return NextResponse.json({ cart });
    }

    if (action === 'remove') {
      if (!cartId) return NextResponse.json({ error: 'Missing cartId' }, { status: 400 });
      const cart = await removeCartLines(cartId, lineIds || []);
      return NextResponse.json({ cart });
    }

    return NextResponse.json({ error: 'Invalid cart action' }, { status: 400 });
  } catch (error) {
    console.error('Shopify Cart Proxy error:', error);
    return NextResponse.json({ error: 'Nie udało się połączyć z API koszyka Shopify.' }, { status: 500 });
  }
}
