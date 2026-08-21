import { ShopifyCart, ShopifyCollection, ShopifyProduct, ShopifyMetaobject, ShopifyArticle, ShopifyShopPolicy, ShopifyMenu } from './types';

const domain = process.env.SHOPIFY_STORE_DOMAIN || '';
const storefrontAccessToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN || '';
const privateStorefrontAccessToken = process.env.SHOPIFY_PRIVATE_STOREFRONT_ACCESS_TOKEN || '';
const adminAccessToken = process.env.SHOPIFY_ADMIN_ACCESS_TOKEN || '';
const apiVersion = process.env.SHOPIFY_API_VERSION || '2026-07';

const endpoint = domain ? `https://${domain.replace(/^https?:\/\//, '')}/api/${apiVersion}/graphql.json` : '';
const adminEndpoint = domain ? `https://${domain.replace(/^https?:\/\//, '')}/admin/api/${apiVersion}/graphql.json` : '';

export async function storefrontFetch<T>({
  query,
  variables,
  cache = 'force-cache',
  tags
}: {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
  tags?: string[];
}): Promise<{ data?: T; errors?: any }> {
  if (!endpoint || (!storefrontAccessToken && !privateStorefrontAccessToken)) {
    console.warn('Shopify Storefront credentials missing or incomplete.');
    return { data: undefined };
  }

  const isServer = typeof window === 'undefined';
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (isServer && privateStorefrontAccessToken) {
    headers['Shopify-Storefront-Private-Token'] = privateStorefrontAccessToken;
  } else if (storefrontAccessToken) {
    headers['X-Shopify-Storefront-Access-Token'] = storefrontAccessToken;
  }

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers,
      body: JSON.stringify({ query, variables }),
      cache,
      ...(tags ? { next: { tags } } : {}),
    });

    const json = await res.json();
    if (json.errors) {
      console.error('Shopify Storefront API errors:', json.errors);
    }
    return json;
  } catch (error) {
    console.error('Shopify fetch exception:', error);
    return { data: undefined };
  }
}

export async function adminFetch<T>({
  query,
  variables
}: {
  query: string;
  variables?: Record<string, any>;
}): Promise<{ data?: T; errors?: any }> {
  if (!adminEndpoint || !adminAccessToken) {
    console.warn('Shopify Admin credentials missing or incomplete.');
    return { data: undefined };
  }

  try {
    const res = await fetch(adminEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Access-Token': adminAccessToken,
      },
      body: JSON.stringify({ query, variables }),
      cache: 'no-store',
    });

    return await res.json();
  } catch (error) {
    console.error('Shopify Admin fetch exception:', error);
    return { data: undefined };
  }
}
