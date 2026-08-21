import { NextRequest, NextResponse } from 'next/server';
import { StorefrontCart, storefrontFetch } from '@/lib/shopify/server';

const CART_FIELDS = `
  id
  checkoutUrl
  totalQuantity
  cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } }
  lines(first: 100) {
    nodes {
      id quantity
      merchandise {
        ... on ProductVariant {
          id title selectedOptions { name value }
          price { amount currencyCode }
          image { url altText }
          product { title handle featuredImage { url altText } }
        }
      }
    }
  }
`;

function jsonError(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

function cartErrors(errors: Array<{ message: string }> | undefined) {
  return errors?.map((error) => error.message).join(', ') || null;
}

export async function GET(request: NextRequest) {
  const cartId = request.nextUrl.searchParams.get('cartId');
  if (!cartId) return jsonError('Missing cart ID.');

  try {
    const result = await storefrontFetch<{ cart: StorefrontCart | null }>(`query GetCart($cartId: ID!) { cart(id: $cartId) { ${CART_FIELDS} } }`, { cartId });
    if (!result.cart) return jsonError('Cart not found.', 404);
    return NextResponse.json({ cart: result.cart });
  } catch {
    return jsonError('Unable to retrieve cart.', 502);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as { merchandiseId?: string; quantity?: number; cartId?: string };
    if (!body.merchandiseId) return jsonError('Missing product variant.');
    const quantity = Math.max(1, Math.min(99, Number(body.quantity) || 1));

    if (body.cartId) {
      const result = await storefrontFetch<{ cartLinesAdd: { cart: StorefrontCart | null; userErrors: Array<{ message: string }> } }>(
        `mutation CartLinesAdd($cartId: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
        { cartId: body.cartId, lines: [{ merchandiseId: body.merchandiseId, quantity }] },
      );
      const error = cartErrors(result.cartLinesAdd.userErrors);
      if (error || !result.cartLinesAdd.cart) return jsonError(error || 'Unable to update cart.');
      return NextResponse.json({ cart: result.cartLinesAdd.cart });
    }

    const result = await storefrontFetch<{ cartCreate: { cart: StorefrontCart | null; userErrors: Array<{ message: string }> } }>(
      `mutation CartCreate($input: CartInput) { cartCreate(input: $input) { cart { ${CART_FIELDS} } userErrors { message } } }`,
      { input: { lines: [{ merchandiseId: body.merchandiseId, quantity }] } },
    );
    const error = cartErrors(result.cartCreate.userErrors);
    if (error || !result.cartCreate.cart) return jsonError(error || 'Unable to create cart.');
    return NextResponse.json({ cart: result.cartCreate.cart }, { status: 201 });
  } catch {
    return jsonError('Unable to update cart.', 502);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json() as { cartId?: string; lineId?: string; quantity?: number };
    if (!body.cartId || !body.lineId || typeof body.quantity !== 'number') return jsonError('Invalid cart update.');
    const result = await storefrontFetch<{ cartLinesUpdate: { cart: StorefrontCart | null; userErrors: Array<{ message: string }> } }>(
      `mutation CartLinesUpdate($cartId: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $cartId, lines: $lines) { cart { ${CART_FIELDS} } userErrors { message } } }`,
      { cartId: body.cartId, lines: [{ id: body.lineId, quantity: Math.max(1, Math.min(99, body.quantity)) }] },
    );
    const error = cartErrors(result.cartLinesUpdate.userErrors);
    if (error || !result.cartLinesUpdate.cart) return jsonError(error || 'Unable to update cart.');
    return NextResponse.json({ cart: result.cartLinesUpdate.cart });
  } catch {
    return jsonError('Unable to update cart.', 502);
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json() as { cartId?: string; lineId?: string };
    if (!body.cartId || !body.lineId) return jsonError('Invalid cart update.');
    const result = await storefrontFetch<{ cartLinesRemove: { cart: StorefrontCart | null; userErrors: Array<{ message: string }> } }>(
      `mutation CartLinesRemove($cartId: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $cartId, lineIds: $lineIds) { cart { ${CART_FIELDS} } userErrors { message } } }`,
      { cartId: body.cartId, lineIds: [body.lineId] },
    );
    const error = cartErrors(result.cartLinesRemove.userErrors);
    if (error || !result.cartLinesRemove.cart) return jsonError(error || 'Unable to update cart.');
    return NextResponse.json({ cart: result.cartLinesRemove.cart });
  } catch {
    return jsonError('Unable to update cart.', 502);
  }
}
