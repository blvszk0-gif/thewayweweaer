import { NextResponse } from 'next/server';

/**
 * Temporary configuration check for Preview deployments. It intentionally
 * returns only booleans, never a credential value.
 */
export async function GET() {
  if (process.env.VERCEL_ENV === 'production') {
    return new NextResponse(null, { status: 404 });
  }

  return NextResponse.json({
    storeDomain: Boolean(process.env.SHOPIFY_STORE_DOMAIN),
    storefrontToken: Boolean(process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN),
    adminClientId: Boolean(process.env.SHOPIFY_ADMIN_CLIENT_ID),
    adminClientSecret: Boolean(process.env.SHOPIFY_ADMIN_CLIENT_SECRET),
    environment: process.env.VERCEL_ENV || 'local',
  });
}
