import 'server-only';

type GraphQLError = { message: string };

type GraphQLResponse<T> = {
  data?: T;
  errors?: GraphQLError[];
};

const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07';

let adminAccessToken: string | null = null;
let adminAccessTokenExpiresAt = 0;

function storeDomain() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain) throw new Error('Shopify is not configured. Missing SHOPIFY_STORE_DOMAIN.');
  return domain;
}

function storefrontToken() {
  const token = process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN || process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!token) throw new Error('Shopify is not configured. Missing Storefront API token.');
  return token;
}

export async function storefrontFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(`https://${storeDomain()}/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': storefrontToken(),
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const body = (await response.json()) as GraphQLResponse<T>;
  if (!response.ok || body.errors?.length || !body.data) {
    throw new Error(body.errors?.map((error) => error.message).join(', ') || 'Shopify Storefront API request failed.');
  }
  return body.data;
}

export async function adminFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const token = await getAdminAccessToken();

  const response = await fetch(`https://${storeDomain()}/admin/api/${apiVersion}/graphql.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': token,
    },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });

  const body = (await response.json()) as GraphQLResponse<T>;
  if (!response.ok || body.errors?.length || !body.data) {
    throw new Error(body.errors?.map((error) => error.message).join(', ') || 'Shopify Admin API request failed.');
  }
  return body.data;
}

/**
 * Dev Dashboard apps use OAuth client credentials rather than a permanent token
 * copied from Shopify Admin. Cache the short-lived token per server instance and
 * renew it one minute before expiry.
 */
async function getAdminAccessToken() {
  if (adminAccessToken && Date.now() < adminAccessTokenExpiresAt - 60_000) {
    return adminAccessToken;
  }

  const clientId = process.env.SHOPIFY_ADMIN_CLIENT_ID;
  const clientSecret = process.env.SHOPIFY_ADMIN_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    throw new Error('Shopify newsletter is not configured. Missing SHOPIFY_ADMIN_CLIENT_ID or SHOPIFY_ADMIN_CLIENT_SECRET.');
  }

  const response = await fetch(`https://${storeDomain()}/admin/oauth/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
    cache: 'no-store',
  });
  const body = (await response.json()) as { access_token?: string; expires_in?: number };
  if (!response.ok || !body.access_token) {
    throw new Error('Shopify Admin API token request failed. Ensure the Dev Dashboard app is installed on this store.');
  }

  adminAccessToken = body.access_token;
  adminAccessTokenExpiresAt = Date.now() + (body.expires_in || 86_399) * 1000;
  return adminAccessToken;
}

export type StorefrontProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  featuredImage: { url: string; altText: string | null } | null;
  images: { nodes: Array<{ url: string; altText: string | null }> };
  priceRange: { minVariantPrice: { amount: string; currencyCode: string } };
  variants: { nodes: Array<{ id: string; title: string; availableForSale: boolean; price: { amount: string; currencyCode: string }; image: { url: string; altText: string | null } | null; selectedOptions: Array<{ name: string; value: string }> }> };
  availableForSale: boolean;
};

export type StorefrontCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: { subtotalAmount: { amount: string; currencyCode: string }; totalAmount: { amount: string; currencyCode: string } };
  lines: { nodes: Array<{ id: string; quantity: number; merchandise: { id: string; title: string; selectedOptions: Array<{ name: string; value: string }>; product: { title: string; handle: string; featuredImage: { url: string; altText: string | null } | null }; price: { amount: string; currencyCode: string }; image: { url: string; altText: string | null } | null } }> };
};
