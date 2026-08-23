import 'server-only';

import { createHash, randomBytes } from 'crypto';

type OpenIdConfiguration = { authorization_endpoint: string; token_endpoint: string; end_session_endpoint?: string; graphql_api?: string };

function shopDomain() {
  const domain = process.env.SHOPIFY_STORE_DOMAIN?.replace(/^https?:\/\//, '').replace(/\/$/, '');
  if (!domain) throw new Error('Missing SHOPIFY_STORE_DOMAIN.');
  return domain;
}

export async function customerOpenIdConfiguration(): Promise<OpenIdConfiguration> {
  const response = await fetch(`https://${shopDomain()}/.well-known/openid-configuration`, { cache: 'no-store' });
  if (!response.ok) throw new Error('Unable to load Shopify Customer Account configuration.');
  return response.json() as Promise<OpenIdConfiguration>;
}

export function generatePkce() {
  const verifier = randomBytes(48).toString('base64url');
  return { verifier, challenge: createHash('sha256').update(verifier).digest('base64url'), state: randomBytes(24).toString('base64url') };
}

export function customerClientId() {
  const clientId = process.env.SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID;
  if (!clientId) throw new Error('Missing SHOPIFY_CUSTOMER_ACCOUNT_CLIENT_ID.');
  return clientId;
}

export async function customerApiFetch<T>(accessToken: string, query: string, variables?: Record<string, unknown>): Promise<T> {
  const configuration = await customerOpenIdConfiguration();
  if (!configuration.graphql_api) throw new Error('Shopify Customer Account GraphQL endpoint is unavailable.');
  const response = await fetch(configuration.graphql_api, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}` },
    body: JSON.stringify({ query, variables }),
    cache: 'no-store',
  });
  const body = await response.json() as { data?: T; errors?: Array<{ message: string }> };
  if (!response.ok || body.errors?.length || !body.data) throw new Error(body.errors?.map((error) => error.message).join(', ') || 'Customer Account API request failed.');
  return body.data;
}

export const CUSTOMER_TOKEN_COOKIE = 'twww_customer_access_token';
export const PKCE_COOKIE = 'twww_customer_pkce';
export const RETURN_TO_COOKIE = 'twww_customer_return_to';
